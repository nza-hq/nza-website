import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { WebsitePage } from './routes/WebsitePage'
import { SiteNav } from './components/SiteNav'
import { SiteFooter } from './components/SiteFooter'
import { DevicePreview } from './components/DevicePreview'

/**
 * Route-level code splitting (perf, Sept 2026).
 *
 * The landing page (`/`, WebsitePage) is imported eagerly so it paints as
 * fast as possible - it's the entry point and carries the preloader. Every
 * OTHER route is lazy-loaded, so the initial bundle the landing downloads no
 * longer includes the product pages and, crucially, recharts (PABLO's charts)
 * - which was roughly half of the old ~950KB single chunk and the main reason
 * the loading screen took 10-15s to appear on mobile.
 *
 * The route components are named exports, so each lazy import maps the named
 * export onto the `default` React.lazy expects.
 */
const ExpertisePage = lazy(() =>
  import('./routes/ExpertisePage').then((m) => ({ default: m.ExpertisePage })),
)
const ApproachPage = lazy(() =>
  import('./routes/ApproachPage').then((m) => ({ default: m.ApproachPage })),
)
const PabloPage = lazy(() =>
  import('./routes/PabloPage').then((m) => ({ default: m.PabloPage })),
)
const NzAiPage = lazy(() =>
  import('./routes/NzAiPage').then((m) => ({ default: m.NzAiPage })),
)
const DecodedPage = lazy(() =>
  import('./routes/DecodedPage').then((m) => ({ default: m.DecodedPage })),
)
const AboutPage = lazy(() =>
  import('./routes/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ClientsPage = lazy(() =>
  import('./routes/ClientsPage').then((m) => ({ default: m.ClientsPage })),
)
const ContactPage = lazy(() =>
  import('./routes/ContactPage').then((m) => ({ default: m.ContactPage })),
)

export default function App() {
  return (
    <>
      <SiteNav />
      {/* Suspense catches the lazy route chunks while they load. Fallback is
          null - navigation to a product page briefly shows the nav/footer
          shell, then the page paints once its chunk arrives. The landing
          itself is eager, so `/` never hits this fallback. */}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<WebsitePage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/approach" element={<ApproachPage />} />
          <Route path="/pablo" element={<PabloPage />} />
          <Route path="/nz-ai" element={<NzAiPage />} />
          <Route path="/decoded" element={<DecodedPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
      <SiteFooter />
      {/* Dev-only floating preview launcher; auto-removed in `npm run build`. */}
      <DevicePreview />
    </>
  )
}
