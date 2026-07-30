import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  to?: string
  href?: string
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-light border border-accent focus-visible:ring-accent',
  secondary:
    'bg-brand text-white hover:bg-brand-dark border border-brand focus-visible:ring-brand',
  outline:
    'bg-transparent text-brand border border-brand hover:bg-brand hover:text-white focus-visible:ring-brand',
  ghost:
    'bg-transparent text-charcoal border border-border hover:border-charcoal focus-visible:ring-charcoal',
}

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

export function Button({
  variant = 'primary',
  to,
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
