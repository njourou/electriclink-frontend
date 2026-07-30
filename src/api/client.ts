const API_BASE = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '')

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path.startsWith('/') ? path : `/${path}`}`)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export { API_BASE, fetchJson }
