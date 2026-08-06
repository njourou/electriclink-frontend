import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { getAssistantReply, type AssistantMessage } from '../../api/assistant'
import { getProductImage, stripHtml } from '../../utils/html'
import type { Product } from '../../types/product'

function greetingForNow(): string {
  // Always use Nairobi (EAT, UTC+3) time — the company is based in Kenya,
  // regardless of the visitor's device timezone.
  let hour = 12
  let day = 0
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Nairobi',
      hour: 'numeric',
      hourCycle: 'h23',
      weekday: 'short',
    }).formatToParts(new Date())
    hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 12)
    const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
    day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday)
  } catch {
    // fall back to device time if Intl fails
    hour = new Date().getHours()
    day = new Date().getDay()
  }
  const isWeekend = day === 0 || day === 6

  const greetings: Record<string, string> = {
    morning:
      "Good morning! ☀️ We've got some great products in today — from LED lighting to ceiling fans. What are you looking for?",
    afternoon:
      "Good afternoon! 👋 Great day to shop — we have everything from switches to generators in stock. What do you need?",
    evening:
      "Good evening! 🌙 Still shopping? We've got quality electrical products ready for you. What can I help you find?",
    weekend:
      "Happy weekend! 🎉 Great products, ready for you — lights, fans, cables and more. What are you after?",
  }

  const key = isWeekend ? 'weekend' : hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  return greetings[key]
}

const INITIAL_MESSAGE: AssistantMessage = {
  role: 'assistant',
  content: `Hi, I'm Elia 👋 your sales assistant at ElectricLink. ${greetingForNow()}`,
}

const STORAGE_KEY = 'elia-dismissed'

export function AssistantPopup() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<AssistantMessage[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-open on every visit, unless the user dismissed it before
  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const timer = setTimeout(() => setOpen(true), 800)
        return () => clearTimeout(timer)
      }
    } catch {
      // localStorage unavailable — don't auto-open
    }
  }, [])

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
    setOpen(false)
  }

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = input.trim()
    if (!query || loading) return

    const nextMessages: AssistantMessage[] = [...messages, { role: 'user', content: query }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const reply = await getAssistantReply(query, nextMessages)
      setMessages((prev) => [...prev, reply])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I hit a snag. Try me again in a moment.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Trigger button — sits next to the search bar */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex shrink-0 items-center gap-1.5 rounded bg-brand px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
        aria-label={open ? 'Close Elia chat' : 'Chat with Elia'}
        aria-expanded={open}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 5h16v11H9l-5 4V5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="hidden sm:inline">Elia</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/30 p-0 sm:items-center sm:p-6" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-label="Chat with Elia"
            className="flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-xl bg-white shadow-2xl sm:h-[600px] sm:rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-brand px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-base font-bold text-white">
                E
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">Elia</p>
                <p className="text-[10px] text-white/70">{loading ? 'typing…' : 'ElectricLink sales assistant'}</p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="flex h-8 w-8 items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface p-4" aria-live="polite">
              {messages.map((message, index) => (
                <ChatBubble key={index} message={message} />
              ))}
              {loading && (
                <div className="flex items-center gap-2 pl-1 text-xs text-muted">
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border border-brand border-t-transparent" />
                  Elia is typing…
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border bg-white p-3">
              <label htmlFor="elia-input" className="sr-only">
                Ask Elia
              </label>
              <input
                id="elia-input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="e.g. do you have LED spotlights?"
                className="min-w-0 flex-1 rounded border border-border px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function ChatBubble({ message }: { message: AssistantMessage }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-lg rounded-tr-none bg-accent px-3.5 py-2 text-sm text-white">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="max-w-[90%] rounded-lg rounded-tl-none border border-border bg-white px-3.5 py-2 text-sm leading-relaxed text-charcoal">
        {message.content.split(/(\*[^*]+\*)/g).map((part, i) =>
          part.startsWith('*') && part.endsWith('*') ? (
            <em key={i}>{part.slice(1, -1)}</em>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </div>
      {message.products && message.products.length > 0 && (
        <div className="w-full space-y-2">
          {message.products.map((product) => (
            <ProductLink key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProductLink({ product }: { product: Product }) {
  const description = stripHtml(product.small_description || product.description)
  const image = getProductImage(product.images)

  return (
    <Link
      to={`/products/${product.id}`}
      className="flex gap-2.5 rounded border border-border bg-white p-2.5 transition-colors hover:border-brand"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-surface">
        <img src={image} alt={product.name} className="max-h-full max-w-full object-contain" loading="lazy" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-brand">{product.pri_category}</p>
        <h4 className="line-clamp-2 text-xs font-bold text-charcoal">{product.name}</h4>
        {description && <p className="mt-0.5 line-clamp-1 text-[11px] text-muted">{description}</p>}
      </div>
    </Link>
  )
}
