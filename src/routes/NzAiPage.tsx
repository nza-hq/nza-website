import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductPage } from '../components/product/ProductPage'
import { ProductComingSoon } from './ProductComingSoon'
import { nzaiConfig } from '../data/products/nzaiConfig'

/**
 * /nz-ai - held back as "coming soon". The `?preview=1` flag renders the full
 * ProductPage so Chris can test the real page on his own devices before launch.
 * The preview is unlisted, not secret: nothing on the site links to it, and
 * while it is showing the page sets `noindex, nofollow` so search engines skip
 * it. Plain /nz-ai, the nav and the products screen are unchanged.
 *
 * The launch brief deletes this flag and renders `<ProductPage config={nzaiConfig} />`
 * unconditionally.
 */
export function NzAiPage() {
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

  if (preview) return <ProductPage config={nzaiConfig} />
  return <ProductComingSoon name="NZ:AI" micro="/NZ:AI" />
}
