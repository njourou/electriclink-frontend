import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig, whatsappUrl } from '../config/site'

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function LocationCard({
  title,
  phone,
  phoneTel,
  address,
  mapEmbed,
}: {
  title: string
  phone: string
  phoneTel: string
  address: string
  mapEmbed: string
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="p-4 md:p-5">
        <h2 className="mb-3 text-base font-bold uppercase tracking-wide text-accent">{title}</h2>
        <ul className="space-y-2.5 text-sm text-charcoal">
          <li className="flex items-center gap-2.5">
            <span className="text-accent">
              <PhoneIcon />
            </span>
            <a href={`tel:${phoneTel}`} className="hover:text-accent">
              {phone}
            </a>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 text-accent">
              <PinIcon />
            </span>
            <span>{address}</span>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="text-accent">
              <MailIcon />
            </span>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
              {siteConfig.email}
            </a>
          </li>
        </ul>
      </div>
      <iframe
        title={`${title} map`}
        src={mapEmbed}
        className="h-[240px] w-full border-0 md:h-[280px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = `Hello, my name is ${form.name}. Email: ${form.email}. Message: ${form.message}`
    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer')
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-3 py-8 md:px-4 md:py-10">
        <nav className="mb-5 text-xs text-white/60" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Contact Us</span>
        </nav>

        <h1 className="mb-8 text-center text-3xl font-bold text-accent md:mb-10 md:text-4xl">
          Contact Us
        </h1>

        <div className="mb-8 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <LocationCard {...siteConfig.showroom} />
            <LocationCard {...siteConfig.serviceCenter} />
          </div>

          <div className="overflow-hidden rounded-lg bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            <iframe
              title="Electric Link main location map"
              src={siteConfig.showroom.mapEmbed}
              className="h-full min-h-[520px] w-full border-0 md:min-h-[640px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-lg bg-white/10 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            <h2 className="mb-4 text-lg font-bold text-accent">Contact Form</h2>
            {sent ? (
              <p className="text-sm text-white/90">
                Thanks — WhatsApp should open with your message. We will get back to you shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold text-white/80">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded border border-white/25 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold text-white/80">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded border border-white/25 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold text-white/80">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full rounded border border-white/25 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-light"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="overflow-hidden rounded-lg bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            <img
              src="https://electriclink.co.ke/assets/sliders/4.jpg"
              alt="Electric Link showroom and products"
              className="h-full min-h-[280px] w-full object-cover md:min-h-[360px]"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white"
          >
            Prefer WhatsApp? Chat now
          </a>
        </div>
      </div>
    </div>
  )
}
