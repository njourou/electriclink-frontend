import { Link } from 'react-router-dom'
import { whatsappUrl } from '../../config/site'

const cardShadow = 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]'

export function HelpCards() {
  return (
    <aside className="grid h-full min-h-0 grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
      <Link
        to="/#contact"
        className={`flex min-h-0 flex-col justify-center rounded-lg bg-accent px-4 py-3 text-white transition-colors hover:bg-accent-light ${cardShadow}`}
      >
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 8v4M12 16h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <h3 className="text-sm font-bold leading-tight">Help Center</h3>
        <p className="mt-1 text-xs leading-snug text-white/90">
          Our agents are always ready to help.
        </p>
      </Link>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex min-h-0 flex-col justify-center rounded-lg bg-brand px-4 py-3 text-white transition-colors hover:bg-brand-dark ${cardShadow}`}
      >
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 12h13M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <h3 className="text-sm font-bold leading-tight">After Sales Services</h3>
        <p className="mt-1 text-xs leading-snug text-white/90">Support beyond your purchase.</p>
      </a>
    </aside>
  )
}
