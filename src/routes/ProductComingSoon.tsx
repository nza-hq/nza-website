import { useContextClass } from '../hooks/useContextClass'

/**
 * Placeholder shown at /pablo, /nz-ai and /decoded while those product pages
 * are held back (Chris). The full pages (ProductPage + their configs) stay in
 * the codebase - restore the real render in the route components when they
 * launch. Same cream stub chrome as /about and /clients.
 */
export function ProductComingSoon({ name, micro }: { name: string; micro: string }) {
  useContextClass('context-cream')

  return (
    <main className="stub-page stub-page--cream">
      <div className="stub-page-inner">
        <p className="stub-page-micro">{micro}</p>
        <h1 className="stub-page-headline">{name} - coming soon.</h1>
      </div>
    </main>
  )
}
