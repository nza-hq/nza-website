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
import { applyLabClasses } from './lib/lab'

// ?lab=... switches (see lib/lab.ts) - must land on <html> before the
// first render so the CSS overrides are in force for the first paint.
applyLabClasses()

function boot() {
  // Belt and braces: if the app stylesheet is still a <link rel="preload">
  // here (its onload never fired - a known gap on some mobile browsers, e.g.
  // older iOS Safari), flip it to a real stylesheet ourselves. Otherwise the
  // CSS would never apply and React would mount into an unstyled page, which
  // on the cream ground reads as "blank". Harmless if onload already did it.
  const css = document.getElementById('app-css') as HTMLLinkElement | null
  if (css && css.rel !== 'stylesheet') css.rel = 'stylesheet'
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

// The built app stylesheet is loaded non-render-blocking (see the
// non-blocking-app-css plugin in vite.config.ts) so the cream ground set in
// index.html paints immediately on a cold load instead of a blank white
// screen. But React must NOT mount until that CSS is applied, or the app
// (including the cream preloader) would flash unstyled for a beat. Gate the
// mount on the stylesheet being ready - the cream ground stays up meanwhile -
// with a timeout as a safety net so a stuck stylesheet can never strand us
// there. In dev there is no #app-css link, and if the CSS is already applied
// we boot straight away.
const appCss = document.getElementById('app-css') as HTMLLinkElement | null
if (appCss && appCss.rel !== 'stylesheet' && !appCss.sheet) {
  let started = false
  const start = () => {
    if (started) return
    started = true
    // One frame for the just-applied stylesheet to take effect before render.
    requestAnimationFrame(boot)
  }
  appCss.addEventListener('load', start, { once: true })
  window.setTimeout(start, 4000)
} else {
  boot()
}
