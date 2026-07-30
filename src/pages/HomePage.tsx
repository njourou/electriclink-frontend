import { HomeMainSection } from '../components/home/HomeMainSection'
import { CategoriesGrid } from '../components/home/CategoriesGrid'
import { FlashSales } from '../components/home/FlashSales'
import { PartnersSection } from '../components/home/PartnersSection'
import { ContactSection } from '../components/home/ContactSection'

export function HomePage() {
  return (
    <>
      <HomeMainSection />
      <CategoriesGrid />
      <FlashSales />
      <PartnersSection />
      <ContactSection />
    </>
  )
}
