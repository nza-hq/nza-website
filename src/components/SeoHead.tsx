import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, seoFor } from '../seo/pages'

/**
 * Keeps <title>, meta description and canonical in step with the route on
 * client-side navigation. The first load already carries the right tags from
 * the per-route static HTML written at build time (see src/seo/pages.ts).
 * Rendered before the routes so a page that sets its own title (ContactPage)
 * still wins.
 */
export function SeoHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = seoFor(pathname)
    if (!page) return
    document.title = page.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', page.description)
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `${SITE_URL}${page.path === '/' ? '/' : page.path}`)
  }, [pathname])

  return null
}
