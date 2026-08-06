import type { Product } from '../types/product'

export interface AssistantMessage {
  role: 'user' | 'assistant'
  content: string
  products?: Product[]
}

interface AssistantReply {
  reply: string
  product_ids: string[]
  products: Product[]
}

async function postToAssistant(message: string, history: AssistantMessage[]): Promise<AssistantReply> {
  // Try the Vite-proxied endpoint, then the direct server URL
  const endpoints = ['/assistant-api/assistant', 'http://localhost:8787/assistant']
  let lastError: unknown

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: history.slice(-6).map(({ role, content }) => ({ role, content })),
        }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return (await response.json()) as AssistantReply
    } catch (err) {
      lastError = err
    }
  }

  throw lastError
}

export async function getAssistantReply(rawInput: string, history: AssistantMessage[] = []): Promise<AssistantMessage> {
  const input = rawInput.trim()

  if (!input) {
    return {
      role: 'assistant',
      content:
        "Hello! 👋 I'm the ElectricLink assistant. I can help you find products in our catalogue — try asking something like *'Do you have LED spotlights?'* or *'Show me ceiling fans'*.",
    }
  }

  try {
    const reply = await postToAssistant(input, history)
    return {
      role: 'assistant',
      content: reply.reply,
      products: reply.products && reply.products.length ? reply.products : undefined,
    }
  } catch {
    return {
      role: 'assistant',
      content:
        "I'm having a hard time connecting to my assistant engine right now. Please try again in a moment. ⚡ (You can still browse products from the Products page.)",
    }
  }
}

export async function suggestPrompts(): Promise<string[]> {
  return [
    'Show me ceiling fans',
    'Do you have LED spotlights?',
    'I need a circuit breaker',
    'Show me RR switches',
    'Do you sell cables?',
    'Show me Microlite products',
  ]
}