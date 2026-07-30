interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search products by name or description…',
}: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <svg
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-border bg-white py-3 pl-11 pr-4 text-sm text-charcoal placeholder:text-muted focus:border-brand focus:outline-none"
      />
    </div>
  )
}
