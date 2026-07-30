import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById, getProducts } from '../api/products'
import type { Product } from '../types/product'
import { getProductImage, stripHtml } from '../utils/html'
import { Button } from '../components/ui/Button'
import { ProductGrid } from '../components/products/ProductGrid'
import { whatsappUrl } from '../config/site'

function pickRelatedProducts(current: Product, all: Product[], limit = 8): Product[] {
  const others = all.filter((p) => p.id !== current.id)
  const sameSub = others.filter(
    (p) => p.category.toLowerCase() === current.category.toLowerCase(),
  )
  const sameMain = others.filter(
    (p) =>
      p.pri_category.toLowerCase() === current.pri_category.toLowerCase() &&
      p.category.toLowerCase() !== current.category.toLowerCase(),
  )
  const combined = [...sameSub, ...sameMain]
  const seen = new Set<string>()
  return combined.filter((p) => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  }).slice(0, limit)
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [catalog, setCatalog] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(false)
    Promise.all([getProductById(id), getProducts()])
      .then(([detail, all]) => {
        setProduct(detail)
        setCatalog(all)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  const relatedProducts = useMemo(
    () => (product ? pickRelatedProducts(product, catalog) : []),
    [product, catalog],
  )

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid animate-pulse gap-10 lg:grid-cols-2">
          <div className="aspect-square border border-border bg-surface" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-surface" />
            <div className="h-4 w-full bg-surface" />
            <div className="h-4 w-5/6 bg-surface" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-charcoal">Product not found</h1>
        <p className="mt-4 text-muted">The product you are looking for may have been removed.</p>
        <Button to="/products" className="mt-8">
          Back to Products
        </Button>
      </div>
    )
  }

  const image = getProductImage(product.images)
  const summary = stripHtml(product.small_description || product.description)
  const hasHtmlDescription = Boolean(product.description?.trim())

  return (
    <div className="bg-surface">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
          <nav className="text-sm text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-brand">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex aspect-square items-center justify-center border border-border bg-white p-8">
            <img
              src={image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand">
              {product.pri_category} · {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
              {product.name}
            </h1>
            {summary && <p className="mt-6 text-base leading-relaxed text-muted">{summary}</p>}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href={whatsappUrl(`Hello, I'm interested in ${product.name}.`)}>
                Inquire on WhatsApp
              </Button>
              <Button to="/products" variant="outline">
                Back to Catalog
              </Button>
            </div>

            {hasHtmlDescription && (
              <div className="mt-12 border-t border-border pt-10">
                <h2 className="text-lg font-bold text-charcoal">Product Details</h2>
                <div
                  className="prose-product mt-4 text-sm leading-relaxed text-muted [&_li]:mb-1 [&_p]:mb-3 [&_table]:w-full [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_ul]:list-disc [&_ul]:pl-5"
                  dangerouslySetInnerHTML={{
                    __html: product.description.replace(/\\n/g, ''),
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="mb-8 text-xl font-bold text-charcoal md:text-2xl">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        ) : null}
      </div>
    </div>
  )
}
