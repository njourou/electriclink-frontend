import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CategoryPage } from './pages/CategoryPage'
import { AboutPage } from './pages/AboutPage'
import { ServiceCenterPage } from './pages/ServiceCenterPage'
import { ContactPage } from './pages/ContactPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:id', element: <ProductDetailPage /> },
      { path: '/categories/:slug', element: <CategoryPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/service-center', element: <ServiceCenterPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
