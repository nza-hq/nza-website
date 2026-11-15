import { ProductPage } from '../components/product/ProductPage'
import { decodedConfig } from '../data/products/decodedConfig'

/**
 * /decoded - live (unlocked by Linzie, 15 Nov 2026). The `?preview=1` gate and
 * its `noindex, nofollow` tag were removed at launch, as for /nz-ai: the full
 * page renders for everyone and is linked from the nav and the homepage
 * "Our solutions" cards. `?preview=1` links still work (the flag is ignored).
 */
export function DecodedPage() {
  return <ProductPage config={decodedConfig} />
}
