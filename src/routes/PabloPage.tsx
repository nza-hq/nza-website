import { ProductPage } from '../components/product/ProductPage'
import { pabloConfig } from '../data/products/pabloConfig'
import '../styles/pablo.css'

/**
 * /pablo - PABLO product page. Renders the shared product page template
 * with the PABLO config.
 *
 * Preview branch (Oct 2026): the full page is restored here so it can be
 * reviewed and edited. On `main` this route still renders
 * `<ProductComingSoon name="PABLO" micro="/PABLO" />` - the public hold
 * from commit 46be2b0. Merge this branch only when PABLO is meant to go live.
 *
 * Brief: docs/briefs/nza-product-page-template-brief.md
 * Config: src/data/products/pabloConfig.tsx
 */
export function PabloPage() {
  return <ProductPage config={pabloConfig} />
}
