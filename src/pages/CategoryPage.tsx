import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMainCategoriesWithDescriptions, getProductsByMainCategory } from '../api/products'
import type { MainCategory, Product } from '../types/product'
import { categoryFromSlug, stripHtml } from '../utils/html'
import { ProductGrid } from '../components/products/ProductGrid'
import { Button } from '../components/ui/Button'

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const categoryName = slug ? categoryFromSlug(slug) : ''
  const [category, setCategory] = useState<MainCategory | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!categoryName) return

    Promise.all([
      getMainCategoriesWithDescriptions(),
      getProductsByMainCategory(categoryName),
    ])
      .then(([categories, categoryProducts]) => {
        setCategory(
          categories.find(
            (item) => item.pri_category.toLowerCase() === categoryName.toLowerCase(),
          ) ?? null,
        )
        setProducts(categoryProducts)
      })
      .catch(() => {
        setCategory(null)
        setProducts([])
      })
      .finally(() => setLoading(false))
  }, [categoryName])

  return (
    <div className="bg-surface">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
          <nav className="text-sm text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/#categories" className="hover:text-brand">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{categoryName}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
                {categoryName}
              </h1>
              {category && (
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
                  {stripHtml(category.pri_description)}
                </p>
              )}
            </div>
            {category?.pri_image && (
              <div className="flex h-44 items-center justify-center border border-border bg-surface p-6">
                <img
                  src={category.pri_image}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="skeleton-shimmer h-80 border border-border" />
            ))}
          </div>
        ) : (
          <>
            <p className="mb-8 text-sm text-muted">
              {products.length} product{products.length === 1 ? '' : 's'} in this category
            </p>
            <ProductGrid
              products={products}
              emptyMessage="No products found in this category."
            />
          </>
        )}

        <div className="mt-12">
          <Button to="/products" variant="outline">
            Browse All Products
          </Button>
        </div>
      </div>
    </div>
  )
}
