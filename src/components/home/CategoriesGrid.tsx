import { useEffect, useRef, useState, type WheelEvent } from 'react'
import { Link } from 'react-router-dom'
import { getMainCategoriesWithDescriptions, getProducts } from '../../api/products'
import type { MainCategory } from '../../types/product'
import { categorySlug } from '../../utils/html'

export function CategoriesGrid() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [fallbackImages, setFallbackImages] = useState<Record<string, string>>({})
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMainCategoriesWithDescriptions()
      .then((mainCategories) => {
        setCategories(mainCategories)
      })
      .catch(() => {
        setCategories([])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (categories.length === 0) return

    getProducts()
      .then((products) => {
        const grouped: Record<string, string[]> = {}
        for (const product of products) {
          const key = product.pri_category.toLowerCase()
          const image = product.images?.trim()
          if (!key || !image) continue
          grouped[key] = grouped[key] ? [...grouped[key], image] : [image]
        }

        const generatedFallbacks: Record<string, string> = {}
        for (const category of categories) {
          const key = category.pri_category.toLowerCase()
          const images = grouped[key] || []
          if (images.length > 0) {
            generatedFallbacks[key] = images[Math.floor(Math.random() * images.length)]
          }
        }
        setFallbackImages(generatedFallbacks)
      })
      .catch(() => setFallbackImages({}))
  }, [categories])

  function scroll(direction: 'left' | 'right') {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    })
  }

  function handleHorizontalWheel(event: WheelEvent<HTMLDivElement>) {
    if (!scrollRef.current) return
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    scrollRef.current.scrollBy({ left: event.deltaY, behavior: 'smooth' })
  }

  return (
    <section id="categories" className="scroll-mt-24 bg-white py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-3 md:px-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-surface md:block"
            aria-label="Scroll categories left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton-shimmer h-64 w-56 shrink-0 rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="scrollbar-hide overflow-x-auto"
              onWheel={handleHorizontalWheel}
            >
              <div className="flex gap-4 md:gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.pri_category}
                    to={`/categories/${categorySlug(category.pri_category)}`}
                    className="group w-56 shrink-0 overflow-hidden rounded-lg border border-border bg-white transition-colors hover:border-accent md:w-64"
                  >
                    <div className="flex h-40 items-center justify-center bg-surface p-4">
                      {(() => {
                        const key = category.pri_category.toLowerCase()
                        const primary = category.pri_image?.trim()
                        const fallback = fallbackImages[key]
                        const src = brokenImages[key] || !primary ? fallback : primary
                        if (!src) {
                          return <div className="skeleton-shimmer h-full w-full rounded" />
                        }
                        return (
                      <img
                        src={src}
                        alt=""
                        className="max-h-full max-w-full object-contain transition-transform duration-150 group-hover:scale-105"
                        loading="lazy"
                        onError={() => setBrokenImages((prev) => ({ ...prev, [key]: true }))}
                      />
                        )
                      })()}
                    </div>
                    <div className="bg-accent p-4 text-white">
                      <h3 className="text-sm font-bold leading-snug">{category.pri_category}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-surface md:block"
            aria-label="Scroll categories right"
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
