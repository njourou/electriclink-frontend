import { SectionHeading } from '../ui/SectionHeading'

const trustPoints = [
  {
    title: 'Wide Product Range',
    description:
      'Electrical supplies, mechanical parts, tools, and accessories — all from one reliable source.',
    icon: (
      <path
        d="M4 7h16M4 12h10M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    ),
  },
  {
    title: 'Readily Available Stock',
    description:
      'Products kept in stock for fast fulfilment — no long waits for the supplies your project needs.',
    icon: (
      <path
        d="M6 6h12v12H6zM9 9h6M9 12h6M9 15h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    ),
  },
  {
    title: 'Quality Assured',
    description:
      'Partner brands and products selected for durability, safety standards, and long-term performance.',
    icon: (
      <path
        d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Responsive Service',
    description:
      'Reach our team quickly via WhatsApp or phone for quotes, availability checks, and expert guidance.',
    icon: (
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    ),
  },
]

export function WhyChooseUs() {
  return (
    <section className="border-b border-border bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built for professionals who need reliability"
          description="Electric Link Pan Africa Limited serves contractors, facilities teams, and businesses that depend on consistent supply and quality."
          align="center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <article
              key={point.title}
              className="flex items-start gap-4 rounded-md bg-brand p-6 text-white"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {point.icon}
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{point.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
