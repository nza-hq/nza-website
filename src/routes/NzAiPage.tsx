import { ProductPage } from '../components/product/ProductPage'
import { nzaiConfig } from '../data/products/nzaiConfig'

/**
 * /nz-ai - live (launched by Chris, 21 Oct 2026). The `?preview=1` gate and its
 * `noindex, nofollow` tag were removed at launch: the full page renders for
 * everyone and is linked from the nav and the homepage "Our solutions" cards.
 */
export function NzAiPage() {
  return <ProductPage config={nzaiConfig} />
}
