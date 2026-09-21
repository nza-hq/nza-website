import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Order matters: tailwind preflight first, then design tokens, then bespoke
// page CSS. Bespoke CSS wins over preflight where they overlap.
// Only the CSS the landing (/) actually needs is imported here, so it is
// the sole render-blocking stylesheet on first paint. Subpage CSS
// (pablo/nz-ai/product-page, ~128 KB uncompressed) is imported inside the
// lazy route components instead, so it ships in those chunks and no longer
// blocks the landing's first paint on mobile. See docs/audit/mobile-load-diagnosis.md.
import './styles/tailwind.css'
import './styles/colors_and_type.css'
import './styles/nza-website.css'
import './styles/landing.css'
import './styles/site-nav.css'

import App from './App.tsx'

// Remove the static index.html splash the moment the bundle has
// finished loading + we're about to mount React. If the splash is
// absent (e.g. dev mode or already removed), this is a no-op.
const splash = document.getElementById('initial-splash')
if (splash && splash.parentNode) {
  splash.parentNode.removeChild(splash)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
