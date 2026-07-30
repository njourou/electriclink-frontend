import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Restore deep links after GitHub Pages / static-host 404 fallback
const spaRedirect = sessionStorage.getItem('spa-redirect')
if (spaRedirect) {
  sessionStorage.removeItem('spa-redirect')
  window.history.replaceState(null, '', spaRedirect)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
