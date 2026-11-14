import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductPage } from '../components/product/ProductPage'
import { ProductComingSoon } from './ProductComingSoon'
import { decodedConfig } from '../data/products/decodedConfig'

/**
 * /decoded - held back as "coming soon". The `?preview=1` flag renders the
 * full ProductPage so the page can be reviewed before launch (the same
 * unlisted preview /nz-ai and /pablo use). Nothing on the site links to it,
 * and while it is showing the page sets `noindex, nofollow`. Plain /decoded,
 * the nav and the products screen are unchanged.
 *
 * At launch, delete the flag and render `<ProductPage config={decodedConfig} />`
 * unconditionally.
 */
export function DecodedPage() {
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

  if (preview) return <ProductPage config={decodedConfig} />
  return <ProductComingSoon name="decodED" micro="/DECODED" />
}
