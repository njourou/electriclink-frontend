import { useState } from 'react'
import { siteConfig } from '../../config/site'

export function PartnersSection() {
  const [index, setIndex] = useState(0)
  const visibleCount = 4
  const maxIndex = Math.max(0, siteConfig.partners.length - visibleCount)

  function goPrev() {
    setIndex((current) => Math.max(0, current - 1))
  }

  function goNext() {
    setIndex((current) => Math.min(maxIndex, current + 1))
  }

  return (
    <section className="border-t border-border bg-white py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-3 md:px-4">
        <h2 className="mb-4 text-center text-xl font-bold text-charcoal md:text-2xl">Our Partners</h2>

        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            className="absolute left-0 z-10 rounded-full bg-white p-2 shadow-md hover:bg-surface disabled:opacity-30"
            aria-label="Previous partners"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <div className="mx-10 overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${index * (100 / visibleCount + 2)}%)` }}
            >
              {siteConfig.partners.map((logo, logoIndex) => (
                <div
                  key={logoIndex}
                  className="flex h-24 w-36 shrink-0 items-center justify-center rounded-lg border border-border bg-surface p-4 md:h-28 md:w-44"
                >
                  <img
                    src={logo}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={index >= maxIndex}
            className="absolute right-0 z-10 rounded-full bg-white p-2 shadow-md hover:bg-surface disabled:opacity-30"
            aria-label="Next partners"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
