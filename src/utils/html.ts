export function stripHtml(html: string): string {
  if (!html) return ''
  const decoded = html.replace(/\\n/g, '\n').replace(/&nbsp;/g, ' ')
  const doc = new DOMParser().parseFromString(decoded, 'text/html')
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim()
}

export function getProductImage(images: string, fallback?: string): string {
  const trimmed = images?.trim()
  if (trimmed) return trimmed
  return fallback ?? siteConfigFallbackImage()
}

function siteConfigFallbackImage() {
  return 'https://v2website.electriclink.co.ke/wp-content/uploads/2024/05/logo-1.png'
}

export function categorySlug(name: string): string {
  return encodeURIComponent(name)
}

export function categoryFromSlug(slug: string): string {
  return decodeURIComponent(slug)
}
