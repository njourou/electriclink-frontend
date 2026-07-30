interface CategoryIconProps {
  name: string
  className?: string
}

export function CategoryIcon({ name, className = 'h-4 w-4' }: CategoryIconProps) {
  const props = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    'aria-hidden': true as const,
  }

  switch (name) {
    case 'RR LIGHTING':
      return (
        <svg {...props}>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="square" />
          <path d="M9 14a3 3 0 106 0c0-2-1.5-3-3-5-1.5 2-3 3-3 5z" />
        </svg>
      )
    case 'RR SWITCH GEAR':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M8 9h8M8 12h8M8 15h5" strokeLinecap="square" />
        </svg>
      )
    case 'RR FANS':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" strokeLinecap="square" />
        </svg>
      )
    case 'RR SWITCHES':
      return (
        <svg {...props}>
          <rect x="5" y="8" width="14" height="8" rx="1" />
          <path d="M9 12h6" strokeLinecap="square" />
          <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'MACHINERY ITEMS':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a4 4 0 00-5.4 5.4L5 15l4 4 3.3-4.3a4 4 0 005.4-5.4l-2.7-2.7z" strokeLinejoin="round" />
        </svg>
      )
    case 'MICROLITE':
      return (
        <svg {...props}>
          <rect x="7" y="4" width="10" height="16" rx="1.5" />
          <path d="M10 8h4M11 18h2" strokeLinecap="square" />
        </svg>
      )
    case 'INSTANT SHOWERS':
      return (
        <svg {...props}>
          <path d="M8 4h8v3H8zM12 7v3" strokeLinecap="square" />
          <path d="M9 12c0 2 1.5 3 3 5 1.5-2 3-3 3-5" />
          <path d="M8 18h8" strokeLinecap="square" />
        </svg>
      )
    case 'RR ELECTRICAL ACCESSORIES':
      return (
        <svg {...props}>
          <path d="M8 8h8v8H8zM12 8V5M10 5h4" strokeLinecap="square" />
          <path d="M10 16v3M14 16v3" strokeLinecap="square" />
        </svg>
      )
    case 'ACCESSORIES':
      return (
        <svg {...props}>
          <path d="M4 7h16v12H4zM4 11h16M9 7V5h6v2" strokeLinecap="square" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M8 12h8" strokeLinecap="square" />
        </svg>
      )
  }
}
