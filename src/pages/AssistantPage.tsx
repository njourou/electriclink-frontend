import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { getAssistantReply, suggestPrompts, type AssistantMessage } from '../api/assistant'
import { getProductImage, stripHtml } from '../utils/html'
import type { Product } from '../types/product'

const INITIAL_MESSAGE: AssistantMessage = {
  role: 'assistant',
  content:
    "Hello! 👋 I'm the **ElectricLink assistant**. I can help you find products in our catalogue — lights, fans, switches, cables and more. Try *'search ceiling fans'* or *'do you have LED spotlights?'*",
}

export function AssistantPage() {
  const [messages, setMessages] = useState<AssistantMessage[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [prompts, setPrompts] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    suggestPrompts().then(setPrompts).catch(() => {})
  }, [])

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
        {
          role: 'assistant',
          content: 'Sorry, something went wrong while searching. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function usePrompt(prompt: string) {
    setInput(prompt)
    void (async () => {
      const nextMessages: AssistantMessage[] = [...messages, { role: 'user', content: prompt }]
      setMessages(nextMessages)
      setLoading(true)
      try {
        const reply = await getAssistantReply(prompt, nextMessages)
        setMessages((prev) => [...prev, reply])
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Sorry, something went wrong while searching. Please try again.' },
        ])
      } finally {
        setLoading(false)
      }
    })()
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-brand">AI Product Assistant</h1>
        <p className="mt-2 text-sm text-muted">
          Ask about anything in our catalogue — I only answer about ElectricLink products.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex h-[60vh] flex-col gap-4 overflow-y-auto rounded-lg border border-border bg-surface p-4"
        aria-live="polite"
      >
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="inline-block h-3 w-3 animate-spin rounded-full border border-brand border-t-transparent" />
            Searching catalogue…
          </div>
        )}
      </div>

      {messages.length <= 1 && prompts.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => usePrompt(prompt)}
              className="rounded-full border border-brand/30 bg-white px-3 py-1.5 text-xs text-brand transition-colors hover:bg-brand hover:text-white"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <label htmlFor="assistant-input" className="sr-only">
          Ask the assistant
        </label>
        <input
          id="assistant-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. search LED spotlights…"
          className="min-w-0 flex-1 rounded border border-border px-4 py-2.5 text-sm focus:border-brand focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="shrink-0 rounded bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Ask
        </button>
      </form>
      <p className="mt-3 text-center text-[11px] text-muted">
        ⚡ I only answer questions about ElectricLink products.
      </p>
    </main>
  )
}

function MessageBubble({ message }: { message: AssistantMessage }) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-lg rounded-tr-none bg-accent px-4 py-2.5 text-sm text-white">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="max-w-[90%] rounded-lg rounded-tl-none border border-border bg-white px-4 py-2.5 text-sm leading-relaxed text-charcoal [&_strong]:font-semibold">
        {message.content.split(/(\*[^*]+\*)/g).map((part, i) =>
          part.startsWith('*') && part.endsWith('*') ? (
            <em key={i}>{part.slice(1, -1)}</em>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </div>
      {message.products && message.products.length > 0 && (
        <div className="grid w-full gap-3 sm:grid-cols-2">
          {message.products.map((product) => (
            <AssistantProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

function AssistantProductCard({ product }: { product: Product }) {
  const description = stripHtml(product.small_description || product.description)
  const image = getProductImage(product.images)

  return (
    <Link
      to={`/products/${product.id}`}
      className="flex gap-3 rounded border border-border bg-white p-3 transition-colors hover:border-brand"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-surface">
        <img src={image} alt={product.name} className="max-h-full max-w-full object-contain" loading="lazy" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-brand">{product.pri_category}</p>
        <h4 className="line-clamp-2 text-sm font-bold text-charcoal">{product.name}</h4>
        {description && <p className="mt-0.5 line-clamp-1 text-xs text-muted">{description}</p>}
      </div>
    </Link>
  )
}
