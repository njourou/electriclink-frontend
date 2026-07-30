import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMainCategoriesWithDescriptions } from '../../api/products'
import type { MainCategory } from '../../types/product'
import { categorySlug } from '../../utils/html'
import { CategoryIcon } from './CategoryIcon'

export function CategorySidebar({
  showTitle = true,
  horizontal = false,
}: {
  showTitle?: boolean
  horizontal?: boolean
}) {
  const [categories, setCategories] = useState<MainCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMainCategoriesWithDescriptions()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <aside className="flex h-full min-h-0 flex-col">
      {showTitle ? (
        <div className="shrink-0 border-b border-border px-2.5 py-1.5">
          <h2 className="text-xs font-bold text-charcoal">Categories</h2>
        </div>
      ) : null}

      {loading ? (
        <ul className={horizontal ? 'flex gap-2 overflow-x-auto p-2' : 'min-h-0 flex-1 overflow-y-auto'}>
          {Array.from({ length: horizontal ? 6 : 9 }).map((_, index) => (
            <li
              key={index}
              className={
                horizontal
                  ? 'skeleton-shimmer h-8 w-28 shrink-0 rounded border border-border'
                  : 'skeleton-shimmer h-7 border-b border-border'
              }
            />
          ))}
        </ul>
      ) : (
        <ul
          className={
            horizontal
              ? 'scrollbar-hide flex gap-2 overflow-x-auto p-2'
              : 'min-h-0 flex-1 overflow-y-auto'
          }
        >
          {categories.map((category) => (
            <li
              key={category.pri_category}
              className={
                horizontal ? 'shrink-0' : 'border-b border-border last:border-b-0'
              }
            >
              <Link
                to={`/categories/${categorySlug(category.pri_category)}`}
                className={
                  horizontal
                    ? 'flex items-center gap-1.5 rounded border border-border bg-white px-2.5 py-1.5 text-[10px] font-semibold whitespace-nowrap text-charcoal transition-colors hover:border-accent hover:text-accent'
                    : 'flex items-center gap-2 px-2.5 py-1.5 text-[10px] font-semibold text-charcoal transition-colors hover:bg-surface hover:text-accent'
                }
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center text-charcoal">
                  <CategoryIcon name={category.pri_category} className="h-3.5 w-3.5" />
                </span>
                <span className="truncate leading-none">{category.pri_category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
