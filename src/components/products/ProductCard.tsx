import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { getProductImage, stripHtml } from '../../utils/html'
import { whatsappUrl } from '../../config/site'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const description = stripHtml(product.small_description || product.description)
  const image = getProductImage(product.images)

  return (
    <article className="group flex flex-col border border-border bg-surface transition-colors hover:border-brand">
      <Link to={`/products/${product.id}`} className="block overflow-hidden bg-white">
        <div className="flex aspect-square items-center justify-center p-6">
          <img
            src={image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-150 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">
          {product.pri_category}
        </p>
        <Link to={`/products/${product.id}`}>
          <h3 className="mt-2 line-clamp-2 text-base font-bold text-charcoal transition-colors group-hover:text-brand">
            {product.name}
          </h3>
        </Link>
        {description && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{description}</p>
        )}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            to={`/products/${product.id}`}
            className="inline-flex flex-1 items-center justify-center border border-border bg-white px-4 py-2 text-xs font-semibold text-charcoal transition-colors hover:border-brand hover:text-brand"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl(`Hello, I'm interested in ${product.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center bg-brand px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Inquire
          </a>
        </div>
      </div>
    </article>
  )
}
