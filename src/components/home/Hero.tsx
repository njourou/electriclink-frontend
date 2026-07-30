import { useEffect, useState } from 'react'
import { siteConfig } from '../../config/site'

export function Hero() {
  const [active, setActive] = useState(0)
  const slides = siteConfig.heroSlides

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [slides.length])

  function goPrev() {
    setActive((current) => (current - 1 + slides.length) % slides.length)
  }

  function goNext() {
    setActive((current) => (current + 1) % slides.length)
  }

  return (
    <div className="absolute inset-0 bg-accent">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === active ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={index !== active}
        >
          {slide.layout === 'split' ? (
            <div className="flex h-full w-full bg-accent">
              <div className="flex w-[42%] shrink-0 items-start px-3 py-3 md:w-[40%] md:items-center md:px-5 md:py-4">
                <p className="max-h-full overflow-y-auto pr-1 text-[11px] leading-relaxed text-white md:overflow-visible md:text-sm">
                  {slide.description}
                </p>
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-center p-3 sm:p-4">
                <img
                  src={slide.image}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ) : (
            <>
              <img
                src={slide.image}
                alt=""
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <p className="max-w-xl text-center text-xs leading-relaxed text-white sm:text-sm md:text-base">
                  {slide.description}
                </p>
              </div>
            </>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
        aria-label="Previous slide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </svg>
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
        aria-label="Next slide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </svg>
      </button>

      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActive(index)}
            className={`h-1.5 w-1.5 rounded-full ${
              index === active ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
