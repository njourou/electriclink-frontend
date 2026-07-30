import { Link } from 'react-router-dom'
import { siteConfig, whatsappUrl } from '../config/site'

export function ServiceCenterPage() {
  const { serviceCenter, email } = siteConfig

  return (
    <div className="bg-surface">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-5xl px-3 py-8 md:px-4 md:py-10">
          <nav className="mb-4 text-xs text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">Service Center</span>
          </nav>
          <h1 className="text-center text-2xl font-bold text-tagline md:text-3xl">Service Center</h1>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted">
            Trained technicians. Timely support. After-sales you can rely on.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-5 px-3 py-6 md:px-4 md:py-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="bg-accent px-4 py-3">
              <h2 className="text-sm font-bold text-white">How We Help</h2>
            </div>
            <div className="space-y-4 px-4 py-4 md:px-5">
              <p className="text-sm leading-relaxed text-muted">{serviceCenter.description}</p>
              <ul className="space-y-2 text-sm text-charcoal">
                <li className="flex gap-2">
                  <span className="font-bold text-accent">•</span>
                  Product installation &amp; commissioning support
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">•</span>
                  Repairs and maintenance for electrical &amp; mechanical items
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">•</span>
                  Warranty guidance and spare parts assistance
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-accent">•</span>
                  Technical advice for contractors and facilities teams
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`tel:${serviceCenter.phoneTel}`}
                  className="rounded-lg bg-accent px-4 py-2.5 text-xs font-bold text-white hover:bg-accent-light"
                >
                  Call {serviceCenter.phone}
                </a>
                <a
                  href={whatsappUrl('Hello, I need assistance from the Service Center.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border px-4 py-2.5 text-xs font-bold text-charcoal hover:border-accent hover:text-accent"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="bg-brand px-4 py-3">
              <h2 className="text-sm font-bold text-white">Visit / Contact</h2>
            </div>
            <div className="space-y-3 px-4 py-4 text-sm text-charcoal">
              <p>
                <span className="font-bold text-accent">Phone:</span>{' '}
                <a href={`tel:${serviceCenter.phoneTel}`} className="hover:text-accent">
                  {serviceCenter.phone}
                </a>
              </p>
              <p>
                <span className="font-bold text-accent">Email:</span>{' '}
                <a href={`mailto:${email}`} className="hover:text-accent">
                  {email}
                </a>
              </p>
              <p>
                <span className="font-bold text-accent">Location:</span> {serviceCenter.address}
              </p>
              <p className="text-xs text-muted">
                Mon – Fri: 8:00 AM – 5:00 PM · Sat: 8:00 AM – 1:00 PM
              </p>
            </div>
            <iframe
              title="Service Center map"
              src={serviceCenter.mapEmbed}
              className="h-[220px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </article>
        </div>
      </div>
    </div>
  )
}
