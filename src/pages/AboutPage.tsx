import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'

export function AboutPage() {
  return (
    <div className="bg-surface">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-4xl px-3 py-8 md:px-4 md:py-10">
          <nav className="mb-4 text-xs text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">About Us</span>
          </nav>
          <h1 className="text-center text-2xl font-bold text-tagline md:text-3xl">About Us</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-5 px-3 py-6 md:px-4 md:py-8">
        <article className="overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="bg-tagline px-4 py-3">
            <h2 className="text-sm font-bold text-white md:text-base">{siteConfig.name}</h2>
          </div>
          <div className="px-4 py-4 md:px-5 md:py-5">
            <p className="text-sm leading-relaxed text-muted md:text-base">{siteConfig.about}</p>
          </div>
        </article>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="bg-tagline px-4 py-3">
              <h2 className="text-sm font-bold text-white">Our Mission</h2>
            </div>
            <div className="px-4 py-4">
              <p className="text-sm leading-relaxed text-muted">{siteConfig.mission}</p>
            </div>
          </article>

          <article className="overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="bg-tagline px-4 py-3">
              <h2 className="text-sm font-bold text-white">Our Vision</h2>
            </div>
            <div className="px-4 py-4">
              <p className="text-sm leading-relaxed text-muted">{siteConfig.vision}</p>
            </div>
          </article>
        </div>

        <p className="py-4 text-center text-base font-semibold text-tagline md:text-lg">
          {siteConfig.subtitle}
        </p>
      </div>
    </div>
  )
}
