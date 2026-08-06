// ElectricLink AI Assistant server
// Proxies chat questions to the local LLM (localhost:20128) with the
// product catalog as context. Only answers about ElectricLink products.
import http from 'node:http'
import { readFile } from 'node:fs/promises'

const PORT = 8787
const BACKEND = 'https://backend.electriclink.co.ke/api'
const LLM_URL = 'http://localhost:20128/v1/chat/completions'
const LLM_MODEL = 'oc/deepseek-v4-flash-free'

let catalogCache = { products: [], index: '', ts: 0 }
const CACHE_TTL_MS = 5 * 60 * 1000

async function fetchCatalog(force = false) {
  const now = Date.now()
  if (!force && catalogCache.products.length > 0 && now - catalogCache.ts < CACHE_TTL_MS) {
    return catalogCache
  }
  const res = await fetch(`${BACKEND}/products`)
  if (!res.ok) throw new Error(`catalog fetch failed: ${res.status}`)
  const products = await res.json()
  // Compact index for the LLM context: id | name | subcategory | main category
  const index = products
    .map((p) => `${p.id} | ${p.name} | ${p.category || ''} | ${p.pri_category || ''}`)
    .join('\n')
  catalogCache = { products, index, ts: now }
  return catalogCache
}

function jsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

function send(res, status, obj) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(obj))
}

async function callLLM(messages, temperature = 0.4, maxTokens = 900) {
  const res = await fetch(LLM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  })
  if (!res.ok) throw new Error(`LLM error: ${res.status}`)
  // The local proxy may append streaming artifacts like "\ndata: [DONE]"
  const rawText = await res.text()
  const cleaned = rawText.replace(/data:\s*\[DONE\]\s*$/, '').trim()
  let data
  try {
    data = JSON.parse(cleaned)
  } catch {
    // last-resort: try to salvage the JSON object
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start !== -1 && end > start) data = JSON.parse(cleaned.slice(start, end + 1))
    else throw new Error('LLM returned unparseable response')
  }
  return data.choices?.[0]?.message?.content ?? ''
}

const SYSTEM_PROMPT = `You are Elia, the official AI sales assistant for ElectricLink Pan Africa Limited, a Kenyan supplier of electrical and mechanical products (lights, fans, switches, cables, meters, generators, etc.). You are a friendly, professional senior sales lady.

PERSONALITY & TONE:
- Senior sales agent: confident, warm, helpful, straight to the point.
- Keep replies SHORT and minimal (max ~50 words) — no long essays.
- When a product matches, you can share 1-2 useful details from the catalogue (type, features) but stay brief.
- Match the customer's language exactly: if they write English, reply in English; if they write Sheng/Swahili, reply in Sheng/Swahili.
- Use light, natural warmth — never robotic. Occasionally you may use a relevant emoji (max 1).

RULES (STRICT):
1. You ONLY help with ElectricLink products. You know ONLY the catalogue below — nothing else.
2. If the user asks about ANYTHING outside the catalogue or outside ElectricLink's business (weather, jokes, politics, sports, coding, recipes, general knowledge, other companies, etc.), refuse politely and briefly: say you can only help with ElectricLink products.
3. Greetings ("hi", "hello", "habari", "niaje") get a short friendly reply inviting them to ask about products.
4. When the user looks for a product, recommend the best matches from the catalogue. Use product ids in "product_ids". If no product matches, say so honestly and suggest a category or the Products page — with an empty product_ids array.
5. Questions about the company itself (location, showroom, service center, contacts, hours, about us) are IN SCOPE — answer them from COMPANY INFO below.

COMPANY INFO (ElectricLink Pan Africa Limited):
- About: Renowned Kenyan firm, ~90 employees, wide range of electrical and mechanical products under one roof, modern showrooms in Nairobi CBD and Industrial Area, in-house service center with trained technicians.
- Showroom address: DSM Place, Kijabe Street, City Centre, Nairobi, Kenya.
- Service Center: Behind DSM Place, Kijabe Street, Nairobi.
- Phones: 0722 552 969, 0720 133 691, 0771 727 972 (landlines: 020 682 4415, 020 682 4419).
- Email: sales@electriclink.co.ke
- WhatsApp: 0725 090 695
- Office hours: Mon–Fri 8:00 AM–5:00 PM, Sat 8:00 AM–1:00 PM.
- Mission: consistency in quality, availability, competitive pricing, exemplary service, integrity, continuous innovation.
- Main categories: RR FANS, RR LIGHTING, RR SWITCH GEAR, RR SWITCHES, RR ELECTRICAL ACCESSORIES, MICROLITE, MACHINERY ITEMS, INSTANT SHOWERS, ACCESSORIES.

CATALOGUE (id | name | subcategory | main category):
${'__CATALOG__'}

Output ONLY JSON with this exact shape:
{"reply": "your text here", "product_ids": ["1", "2"]}
Do not include markdown, code fences, or anything outside the JSON.`

function extractIds(raw) {
  const cleaned = raw.trim().replace(/^```(json)?|```$/g, '').trim()
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start === -1 || end === -1) return { reply: raw.slice(0, 500), product_ids: [] }
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1))
    return {
      reply: typeof parsed.reply === 'string' ? parsed.reply : raw.slice(0, 500),
      product_ids: Array.isArray(parsed.product_ids) ? parsed.product_ids : [],
    }
  } catch {
    return { reply: raw.slice(0, 500), product_ids: [] }
  }
}

async function handleAssistant(body) {
  const { message, history = [] } = body
  const userMessage = String(message || '').trim()
  if (!userMessage) {
    return { reply: 'Please type a message first.', product_ids: [] }
  }

  const { products, index } = await fetchCatalog()

  const historyMessages = (Array.isArray(history) ? history : [])
    .slice(-6)
    .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: String(m.content || '').slice(0, 500) }))

  const raw = await callLLM([
    { role: 'system', content: SYSTEM_PROMPT.replace('__CATALOG__', index) },
    ...historyMessages,
    { role: 'user', content: userMessage },
  ])

  const { reply, product_ids } = extractIds(raw)

  const byId = new Map(products.map((p) => [String(p.id), p]))
  const matched = (Array.isArray(product_ids) ? product_ids : [])
    .map((id) => byId.get(String(id)))
    .filter(Boolean)
    .slice(0, 8)

  return { reply, product_ids, products: matched }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      send(res, 204, {})
      return
    }

    if (req.method === 'GET' && req.url === '/health') {
      send(res, 200, { ok: true })
      return
    }

    if (req.method === 'GET' && req.url === '/catalog') {
      const { products } = await fetchCatalog()
      send(res, 200, { count: products.length })
      return
    }

    if (req.method === 'POST' && req.url === '/assistant') {
      const body = await jsonBody(req)
      const result = await handleAssistant(body)
      send(res, 200, result)
      return
    }

    send(res, 404, { error: 'Not found' })
  } catch (err) {
    send(res, 500, { error: String(err?.message || err) })
  }
})

// Warm the catalog on boot
fetchCatalog()
  .then(() => console.log(`[assistant] catalog ready: ${catalogCache.products.length} products`))
  .catch((e) => console.error('[assistant] catalog warm failed:', e.message))

server.listen(PORT, () => {
  console.log(`[assistant] ElectricLink assistant server on http://localhost:${PORT}`)
})
