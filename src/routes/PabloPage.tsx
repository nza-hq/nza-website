import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductPage } from '../components/product/ProductPage'
import { ProductComingSoon } from './ProductComingSoon'
import { pabloConfig } from '../data/products/pabloConfig'

/**
 * /pablo - held back as "coming soon". The `?preview=1` flag renders the full
 * ProductPage so Chris can review and tweak the real page before launch (the
 * same unlisted preview /nz-ai used). Nothing on the site links to it, and
 * while it is showing the page sets `noindex, nofollow`. Plain /pablo, the nav
 * and the products screen are unchanged.
 *
 * At launch, delete the flag and render `<ProductPage config={pabloConfig} />`
 * unconditionally.
 */
export function PabloPage() {
  const [params] = useSearchParams()
  const preview = params.get('preview') === '1'

  useEffect(() => {
    if (!preview) return
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [preview])

  if (preview) return <ProductPage config={pabloConfig} />
  return <ProductComingSoon name="PABLO" micro="/PABLO" />
}
