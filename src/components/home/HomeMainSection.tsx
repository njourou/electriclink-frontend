import { useState } from 'react'
import { Hero } from './Hero'
import { CategorySidebar } from './CategorySidebar'
import { HelpCards } from './HelpCards'
import { siteConfig } from '../../config/site'

const panel =
  'min-h-0 overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]'

export function HomeMainSection() {
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(true)

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-3 py-4 md:px-4 md:py-5">
        {/* Desktop: three equal-height columns */}
        <div className="hidden h-[320px] grid-cols-[210px_minmax(0,1fr)_210px] gap-4 lg:grid lg:h-[340px] lg:grid-cols-[230px_minmax(0,1fr)_230px]">
          <div className={panel}>
            <CategorySidebar />
          </div>
          <div className={`relative min-w-0 ${panel}`}>
            <Hero />
          </div>
          <div className="min-h-0">
            <HelpCards />
          </div>
        </div>

        {/* Tablet */}
        <div className="hidden h-[300px] grid-cols-[180px_minmax(0,1fr)] gap-4 md:grid lg:hidden">
          <div className={panel}>
            <CategorySidebar />
          </div>
          <div className={`relative min-w-0 ${panel}`}>
            <Hero />
          </div>
        </div>
        <div className="mt-4 hidden h-[120px] md:block lg:hidden">
          <HelpCards />
        </div>

        {/* Mobile */}
        <div className="space-y-4 md:hidden">
          <div className={`relative h-[200px] ${panel}`}>
            <Hero />
          </div>
          <div className={panel}>
            <button
              type="button"
              className="flex w-full items-center justify-between border-b border-border px-3 py-2 text-left"
              onClick={() => setMobileCategoriesOpen((open) => !open)}
              aria-expanded={mobileCategoriesOpen}
              aria-controls="mobile-categories-panel"
            >
              <span className="text-xs font-bold text-charcoal">Categories</span>
              <span className="text-base leading-none text-charcoal">
                {mobileCategoriesOpen ? '−' : '+'}
              </span>
            </button>
            {mobileCategoriesOpen ? (
              <div id="mobile-categories-panel">
                <CategorySidebar showTitle={false} horizontal />
              </div>
            ) : null}
          </div>
          <div className="h-[140px]">
            <HelpCards />
          </div>
        </div>

        <p
          id="about"
          className="scroll-mt-24 pt-4 text-center text-sm font-semibold text-tagline md:text-base"
        >
          {siteConfig.subtitle}
        </p>
      </div>
    </section>
  )
}
