/**
 * Search metadata for every route - the single source of truth.
 *
 * Read in two places:
 *   1. Build time (vite.config.ts, `seoPages` plugin) - writes one static
 *      HTML file per route with its own <title>, description, canonical and
 *      robots tags, plus robots.txt and sitemap.xml. Crawlers see these
 *      without running JS.
 *   2. Run time (src/components/SeoHead.tsx) - keeps document.title and the
 *      description in step on client-side navigation.
 *
 * Naming rule (Chris, 12 Nov 2026): the public name is "NZA" paired with
 * "Net Zero Advisory". NZA Consultancy Ltd is the legal name only.
 *
 * `index: false` keeps a page out of Google (noindex) and out of the
 * sitemap. Use it for stubs and "coming soon" pages; flip it to true the
 * day the page launches.
 */
export type SeoPage = {
  path: string
  title: string
  description: string
  index: boolean
}

export const SITE_URL = 'https://netzeroadvisory.uk'
export const SITE_NAME = 'NZA · Net Zero Advisory'

export const SEO_PAGES: SeoPage[] = [
  {
    path: '/',
    title: 'NZA | Net Zero Advisory - buildings, energy and climate',
    description:
      'NZA (Net Zero Advisory) is a Bristol-based consultancy specialising in buildings, energy and climate, working alongside client teams to build tailored, intuitive tools.',
    index: true,
  },
  {
    path: '/nz-ai',
    title: 'NZ:AI (NZAI) - advisory and intelligence | NZA Net Zero Advisory',
    description:
      'NZ:AI is the NZA partnership for energy, carbon and climate risk: advisory, intelligence and tailored tools built around each organisation and its own data.',
    index: true,
  },
  {
    path: '/expertise',
    title: 'Expertise | NZA Net Zero Advisory',
    description:
      'NZA expertise in energy, carbon and climate across buildings, estates and organisations.',
    index: true,
  },
  {
    path: '/approach',
    title: 'Approach | NZA Net Zero Advisory',
    description:
      'How NZA works with client teams on energy, carbon and climate, from the first data review through to decisions and action.',
    index: true,
  },
  // Stubs and coming-soon pages: reachable, but kept out of search until real.
  { path: '/pablo', title: 'PABLO | NZA Net Zero Advisory', description: 'PABLO, an energy analytics platform from NZA. Coming soon.', index: false },
  { path: '/decoded', title: 'decodED | NZA Net Zero Advisory', description: 'decodED, from NZA. Coming soon.', index: false },
  { path: '/about', title: 'About | NZA Net Zero Advisory', description: 'About NZA (Net Zero Advisory).', index: false },
  { path: '/clients', title: 'Clients | NZA Net Zero Advisory', description: 'Organisations NZA works with.', index: false },
  { path: '/contact', title: 'Contact | NZA Net Zero Advisory', description: 'Contact NZA (Net Zero Advisory).', index: false },
  { path: '/privacy', title: 'Privacy | NZA Net Zero Advisory', description: 'NZA privacy notice.', index: false },
]

export function seoFor(pathname: string): SeoPage | undefined {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return SEO_PAGES.find((p) => p.path === clean)
}

/** Organisation structured data (schema.org) - tells Google the names are one entity. */
export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NZA',
  alternateName: ['Net Zero Advisory', 'NZA Consultancy Ltd'],
  legalName: 'NZA Consultancy Ltd',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/logos/nza-logo.svg`,
  description:
    'Bristol-based consultancy specialising in buildings, energy and climate.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bristol',
    addressCountry: 'GB',
  },
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'Companies House',
    value: '14478434',
  },
  sameAs: ['https://www.linkedin.com/company/netzeroadvisory/'],
}
