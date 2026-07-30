import { fetchJson } from './client'
import type { CategoriesResponse, MainCategory, Product } from '../types/product'

export function getProducts() {
  return fetchJson<Product[]>('/products')
}

export function getProductById(id: string) {
  return fetchJson<Product>(`/product/${id}`)
}

export function getCategories() {
  return fetchJson<CategoriesResponse>('/categories')
}

export function getMainCategories() {
  return fetchJson<string[]>('/maincategories')
}

export function getMainCategoriesWithDescriptions() {
  return fetchJson<MainCategory[]>('/maincategories/descriptions')
}

export function getProductsByCategory(category: string) {
  return fetchJson<Product[]>(`/products/category/${encodeURIComponent(category)}`)
}

export function searchProducts(query: string) {
  return fetchJson<Product[]>(`/products/search?query=${encodeURIComponent(query)}`)
}

export async function getFeaturedProducts(limit = 8) {
  const products = await getProducts()
  return products.slice(0, limit)
}

export async function getProductsByMainCategory(mainCategory: string) {
  const products = await getProducts()
  return products.filter(
    (product) => product.pri_category.toLowerCase() === mainCategory.toLowerCase(),
  )
}
