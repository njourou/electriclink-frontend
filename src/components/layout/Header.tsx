import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getProducts } from '../../api/products'
import { siteConfig } from '../../config/site'
import { AssistantPopup } from '../assistant/AssistantPopup'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/assistant', label: 'AI Assistant' },
  { to: '/about', label: 'About Us' },
  { to: '/service-center', label: 'Service Center' },
  { to: '/contact', label: 'Contact Us' },
]

type ProductMenuGroup = {
  main: string
  subcategories: string[]
}

export function Header() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [productMenu, setProductMenu] = useState<ProductMenuGroup[]>([])
  const [productsMenuOpen, setProductsMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [mobileExpandedMain, setMobileExpandedMain] = useState<Record<string, boolean>>({})

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    getProducts()
      .then((products) => {
        const map = new Map<string, Set<string>>()
        for (const product of products) {
          const main = product.pri_category?.trim()
          const sub = product.category?.trim()
          if (!main) continue
          if (!map.has(main)) map.set(main, new Set())
          if (sub) map.get(main)?.add(sub)
        }

        const groups = [...map.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([main, subs]) => ({
            main,
            subcategories: [...subs].sort((a, b) => a.localeCompare(b)),
          }))

        setProductMenu(groups)
      })
      .catch(() => setProductMenu([]))
  }, [])

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = searchQuery.trim()
    if (query) {
      navigate(`/products?q=${encodeURIComponent(query)}`)
    } else {
      navigate('/products')
    }
    setMenuOpen(false)
  }

  function openMainCategory(main: string) {
    navigate(`/products?category=${encodeURIComponent(main)}`)
    setProductsMenuOpen(false)
    setMobileProductsOpen(false)
    setMenuOpen(false)
  }

  function openSubcategory(main: string, subcategory: string) {
    navigate(
      `/products?category=${encodeURIComponent(main)}&subcategory=${encodeURIComponent(subcategory)}`,
    )
    setProductsMenuOpen(false)
    setMobileProductsOpen(false)
    setMenuOpen(false)
  }

  function toggleMobileMain(main: string) {
    setMobileExpandedMain((prev) => ({ ...prev, [main]: !prev[main] }))
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-3 md:px-4">
          <Link to="/" className="flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
            <img src={siteConfig.logo} alt={siteConfig.name} className="h-12 w-auto object-contain" />
          </Link>

          <form onSubmit={handleSearch} className="hidden min-w-0 flex-1 md:block">
            <div className="mx-auto flex h-10 max-w-2xl overflow-hidden rounded border border-border">
              <label htmlFor="header-search" className="sr-only">
                Search products
              </label>
              <input
                id="header-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products, brands and categories"
                className="min-w-0 flex-1 px-3 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-full w-12 shrink-0 items-center justify-center bg-accent text-white transition-colors hover:bg-accent-light"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </form>

          {/* ELIA — sales assistant popup, next to search */}
          <AssistantPopup />

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <Link
              to="/contact"
              className="flex flex-col items-center gap-0.5 text-[11px] font-semibold text-charcoal transition-colors hover:text-accent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 8v4M12 16h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              Help
            </Link>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center text-charcoal md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav className="hidden bg-brand md:block" aria-label="Primary navigation">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-8 px-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold text-white transition-opacity hover:opacity-80 ${
                  isActive ? 'underline underline-offset-4' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setProductsMenuOpen(true)}
            onMouseLeave={() => setProductsMenuOpen(false)}
          >
            <button
              type="button"
              className="text-sm font-semibold text-white transition-opacity hover:opacity-80"
              onClick={() => setProductsMenuOpen((v) => !v)}
            >
              Products
            </button>

            {productsMenuOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-[min(92vw,840px)] -translate-x-1/2 rounded-lg border border-border bg-white p-4 text-charcoal shadow-xl">
                <div className="grid max-h-[65vh] grid-cols-2 gap-4 overflow-auto lg:grid-cols-3">
                  {productMenu.map((group) => (
                    <div key={group.main} className="rounded border border-border/70 p-3">
                      <button
                        type="button"
                        className="mb-2 text-left text-sm font-bold text-brand hover:text-accent"
                        onClick={() => openMainCategory(group.main)}
                      >
                        {group.main}
                      </button>
                      <ul className="space-y-1">
                        {group.subcategories.slice(0, 10).map((sub) => (
                          <li key={sub}>
                            <button
                              type="button"
                              className="text-left text-xs text-muted hover:text-accent"
                              onClick={() => openSubcategory(group.main, sub)}
                            >
                              {sub}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-b border-border bg-white px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="mb-4 flex h-10 overflow-hidden rounded border border-border">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search products, brands and categories"
              className="min-w-0 flex-1 px-3 text-sm focus:outline-none"
            />
            <button type="submit" className="bg-accent px-4 text-white" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </form>

          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-semibold text-charcoal"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              className="flex items-center justify-between text-left text-sm font-semibold text-charcoal"
              onClick={() => setMobileProductsOpen((v) => !v)}
              aria-expanded={mobileProductsOpen}
            >
              Products
              <span className="text-muted">{mobileProductsOpen ? '-' : '+'}</span>
            </button>

            {mobileProductsOpen && (
              <div className="max-h-72 overflow-auto rounded border border-border bg-surface p-2">
                {productMenu.map((group) => (
                  <div key={group.main} className="border-b border-border py-1 last:border-b-0">
                    <button
                      type="button"
                      className="w-full text-left text-sm font-semibold text-brand"
                      onClick={() => toggleMobileMain(group.main)}
                    >
                      {group.main}
                    </button>
                    <div className="mt-1 flex gap-2">
                      <button
                        type="button"
                        className="text-[11px] text-accent"
                        onClick={() => openMainCategory(group.main)}
                      >
                        View all
                      </button>
                    </div>
                    {mobileExpandedMain[group.main] && (
                      <ul className="mt-1 space-y-1 pl-3">
                        {group.subcategories.slice(0, 8).map((sub) => (
                          <li key={sub}>
                            <button
                              type="button"
                              className="text-left text-xs text-muted"
                              onClick={() => openSubcategory(group.main, sub)}
                            >
                              {sub}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
