import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig, whatsappUrl } from '../../config/site'

export function Footer() {
  const [submitted, setSubmitted] = useState(false)

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <footer className="border-t border-border bg-charcoal text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 md:px-6 lg:px-8">
        <div>
          <img src={siteConfig.logo} alt="" className="mb-4 h-10 w-auto brightness-0 invert" />
          <p className="text-sm leading-relaxed text-white/70">{siteConfig.description}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Contact</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>{siteConfig.address.line1}</li>
            <li>{siteConfig.address.line2}</li>
            {siteConfig.phone.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/service-center" className="hover:text-white">
                Service Center
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white">
                Product Catalog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp Inquiry
              </a>
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            {Object.entries(siteConfig.social).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-white/20 text-xs font-bold uppercase transition-colors hover:border-white hover:bg-white/10"
                aria-label={name}
              >
                {name[0]}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Newsletter</h3>
          <p className="mb-4 text-sm text-white/70">
            Get product updates and industry news delivered to your inbox.
          </p>
          {submitted ? (
            <p className="text-sm font-semibold text-white">Thank you for subscribing.</p>
          ) : (
            <form onSubmit={handleNewsletter} className="space-y-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@company.com"
                className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center text-xs text-white/50 md:flex-row md:justify-between md:text-left md:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Nairobi, Kenya — Electrical &amp; Mechanical Supplies</p>
        </div>
      </div>
    </footer>
  )
}
