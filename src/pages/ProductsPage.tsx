import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts, getMainCategories, searchProducts } from '../api/products'
import type { Product } from '../types/product'
import { ProductGrid } from '../components/products/ProductGrid'
import { SearchBar } from '../components/products/SearchBar'
import { SectionHeading } from '../components/ui/SectionHeading'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [mainCategories, setMainCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const selectedCategory = searchParams.get('category') ?? ''
  const selectedSubcategory = searchParams.get('subcategory') ?? ''

  useEffect(() => {
    Promise.all([getProducts(), getMainCategories()])
      .then(([allProducts, categories]) => {
        setProducts(allProducts)
        setMainCategories(categories)
      })
      .catch(() => {
        setProducts([])
        setMainCategories([])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const query = search.trim()
    if (!query) return

    const timeout = setTimeout(async () => {
      setLoading(true)
      try {
        const results = await searchProducts(query)
        setProducts(results)
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  const filteredProducts = useMemo(() => {
    let list = products

    if (selectedCategory) {
      list = list.filter(
        (product) => product.pri_category.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }

    if (selectedSubcategory) {
      list = list.filter((product) => product.category.toLowerCase() === selectedSubcategory.toLowerCase())
    }

    return list
  }, [products, selectedCategory, selectedSubcategory])

  function handleCategoryChange(category: string) {
    const next = new URLSearchParams(searchParams)
    if (category) {
      next.set('category', category)
    } else {
      next.delete('category')
    }
    next.delete('subcategory')
    setSearchParams(next)
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    const next = new URLSearchParams(searchParams)
    if (value.trim()) {
      next.set('q', value)
    } else {
      next.delete('q')
      getProducts()
        .then(setProducts)
        .catch(() => setProducts([]))
    }
    setSearchParams(next)
  }

  return (
    <div className="bg-surface">
      <div className="border-b border-border bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Product Catalog"
            title="Browse our full range"
            description="Search and filter electrical and mechanical products. Contact us on WhatsApp for pricing and availability."
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-charcoal">Categories</h2>
            <ul className="space-y-1 border border-border bg-white">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryChange('')}
                  className={`w-full px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-surface ${
                    !selectedCategory ? 'bg-brand/10 text-brand' : 'text-charcoal'
                  }`}
                >
                  All Products
                </button>
              </li>
              {mainCategories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-surface ${
                      selectedCategory === category ? 'bg-brand/10 font-semibold text-brand' : 'text-muted'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <SearchBar value={search} onChange={handleSearchChange} />

            <p className="mt-4 text-sm text-muted">
              {loading
                ? 'Loading products...'
                : `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} found`}
            </p>

            <div className="mt-8">
              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-80 animate-pulse border border-border bg-white" />
                  ))}
                </div>
              ) : (
                <ProductGrid
                  products={filteredProducts}
                  emptyMessage="No products match your search. Try a different term or browse all categories."
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
