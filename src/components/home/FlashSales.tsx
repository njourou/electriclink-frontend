import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../api/products'
import type { Product } from '../../types/product'
import { getProductImage } from '../../utils/html'

function pickRandomProducts(products: Product[], count: number): Product[] {
  const withImages = products.filter((product) => product.images?.trim())
  const pool = withImages.length >= count ? withImages : products
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function FlashSales() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then((all) => setProducts(pickRandomProducts(all, 15)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bg-surface py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-3 md:px-4">
        <h2 className="mb-4 text-xl font-bold text-charcoal md:text-2xl">Flash Sales</h2>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="h-64 animate-pulse rounded bg-white" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group overflow-hidden rounded bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative flex aspect-square items-center justify-center bg-white p-4">
                  <span className="absolute right-0 top-0 z-10 bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    In Stock Now
                  </span>
                  <img
                    src={getProductImage(product.images)}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-150 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="border-t border-border px-3 py-2.5">
                  <h3 className="truncate text-sm font-bold text-charcoal group-hover:text-accent">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
