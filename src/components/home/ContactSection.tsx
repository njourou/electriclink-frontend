import { Link } from 'react-router-dom'
import { siteConfig, whatsappUrl } from '../../config/site'

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

function ContactCard({
  title,
  phone,
  phoneTel,
  address,
}: {
  title: string
  phone: string
  phoneTel: string
  address: string
}) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-accent">{title}</h3>
      <ul className="space-y-2.5 text-xs text-charcoal sm:text-sm">
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
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-surface py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-3 md:px-4">
        <div className="mb-5 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Get In Touch
          </p>
          <h2 className="text-xl font-bold text-charcoal md:text-2xl">Contact Us</h2>
          <p className="mx-auto mt-1.5 max-w-lg text-xs text-muted md:text-sm">
            Visit our showroom or service center — WhatsApp is the fastest way to reach us.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard {...siteConfig.showroom} />
              <ContactCard {...siteConfig.serviceCenter} />
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-accent-light"
              >
                Full Contact Page
              </Link>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-xs font-bold text-charcoal transition-colors hover:border-accent hover:text-accent"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="bg-brand px-4 py-2.5">
              <p className="text-xs font-bold text-white">Office Hours</p>
              <p className="text-[10px] text-white/75">
                Mon – Fri: 8:00 AM – 5:00 PM · Sat: 8:00 AM – 1:00 PM
              </p>
            </div>
            <iframe
              title="Electric Link Pan Africa location map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7977.655689646692!2d36.81303999203492!3d-1.2767090242132564!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f172db4e42347%3A0x458d8779cdfb818b!2sElectric%20Link%20PAN%20Africa%20Limited!5e0!3m2!1sen!2sus!4v1727781578437!5m2!1sen!2sus"
              className="h-[220px] w-full border-0 md:h-[260px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
