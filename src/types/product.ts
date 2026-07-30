export interface Product {
  id: string
  pri_category: string
  category: string
  name: string
  small_description: string
  description: string
  images: string
}

export interface MainCategory {
  pri_category: string
  pri_description: string
  pri_image: string
}

export interface CategoriesResponse {
  categories: string[]
  main_categories: string[]
}
