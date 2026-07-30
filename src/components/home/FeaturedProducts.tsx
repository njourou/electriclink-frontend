import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../../api/products'
import type { Product } from '../../types/product'
import { ProductCard } from '../products/ProductCard'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedProducts(8)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="border-b border-border bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Catalog Preview"
            title="Featured products"
            description="A selection from our catalog of electrical and mechanical supplies. Browse the full range or inquire via WhatsApp."
          />
          <Button to="/products" variant="outline" className="shrink-0 self-start md:self-auto">
            View All Products
          </Button>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse border border-border bg-surface" />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <p className="mt-12 text-center text-muted">
            Products are loading from our catalog.{' '}
            <Link to="/products" className="font-semibold text-brand hover:underline">
              Browse the catalog
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
