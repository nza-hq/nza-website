import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { ORGANIZATION_JSONLD, SEO_PAGES, SITE_NAME, SITE_URL } from './src/seo/pages'

/**
 * Make the built app stylesheet non-render-blocking.
 *
 * Vite injects the main CSS as a render-blocking `<link rel="stylesheet">` in
 * <head>. On a COLD load the browser paints nothing at all - not even the
 * inline cream ground set in index.html - until that ~117 KB file arrives, so
 * a first-time mobile visitor stares at a blank white screen for seconds. (It
 * only "works" on a machine where the CSS is already cached.)
 *
 * This rewrites that link into a high-priority preload that swaps to a real
 * stylesheet on load, so the cream ground paints IMMEDIATELY while the CSS
 * downloads behind it. `main.tsx` gates React's mount on this stylesheet being
 * applied (via the id below), so nothing ever renders unstyled. A <noscript>
 * keeps it working with JS disabled.
 *
 * Dev is untouched: Vite serves CSS through the module graph there (no
 * /assets/ link), so the regex simply doesn't match.
 */
function nonBlockingAppCss(): Plugin {
  return {
    name: 'non-blocking-app-css',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        // 1. App CSS -> non-render-blocking preload (see above).
        html = html.replace(
          /<link rel="stylesheet"([^>]*href="\/assets\/[^"]+\.css"[^>]*)>/,
          (_m, attrs) =>
            `<link rel="preload" as="style"${attrs} id="app-css" ` +
            `onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet"${attrs}></noscript>`,
        )

        // 2. Move the entry module <script> out of <head> to the end of
        //    <body>. In <head>, iOS Safari can hold the FIRST PAINT for the
        //    head's module script, so a cold visitor saw a blank white
        //    screen instead of the inline cream ground while the JS
        //    downloaded. At the end of <body> the browser paints first, then
        //    runs the (still-deferred) script. The modulepreload hint stays
        //    in <head> so the download still starts early.
        const entry = html.match(
          /<script type="module"[^>]*src="\/assets\/[^"]+\.js"[^>]*><\/script>/,
        )
        if (entry) {
          html = html.replace(entry[0], '')
          html = html.replace('</body>', `  ${entry[0]}\n  </body>`)
        }
        return html
      },
    },
  }
}

/**
 * Per-route search metadata (Nov 2026).
 *
 * The site is a single-page app, so before this every URL served the same
 * index.html: one title, one description, og:url pointing at the homepage,
 * and robots.txt / sitemap.xml falling through the SPA rewrite to the
 * homepage HTML. Google saw /nz-ai as a copy of /.
 *
 * After the build, this writes one HTML file per route from
 * src/seo/pages.ts (dist/nz-ai.html etc., served at /nz-ai by Vercel's
 * cleanUrls - real files win over the rewrite), each with its own title,
 * description, canonical, robots and share tags, plus the Organization
 * JSON-LD. It also writes robots.txt and sitemap.xml. The body is still
 * the client-rendered app; Google renders JS, and full pre-rendering of
 * body content is a separate, larger change.
 */
function escapeAttr(v: string) {
  return v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function seoPages(): Plugin {
  let outDir = 'dist'
  return {
    name: 'seo-pages',
    apply: 'build',
    configResolved(c) {
      outDir = resolve(c.root, c.build.outDir)
    },
    closeBundle() {
      const base = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const jsonLd = JSON.stringify(ORGANIZATION_JSONLD).replace(/</g, '\\u003c')

      for (const page of SEO_PAGES) {
        const url = `${SITE_URL}${page.path === '/' ? '/' : page.path}`
        const t = escapeAttr(page.title)
        const d = escapeAttr(page.description)
        const swap = (html: string, re: RegExp, tag: string) => {
          if (!re.test(html)) throw new Error(`seo-pages: tag not found ${re}`)
          return html.replace(re, tag)
        }
        let html = base
        html = swap(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`)
        html = swap(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${d}" />`)
        html = swap(html, /<meta property="og:site_name"[^>]*>/, `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`)
        html = swap(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
        html = swap(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}" />`)
        html = swap(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${d}" />`)
        html = swap(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${t}" />`)
        html = swap(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${d}" />`)
        html = html.replace(
          '</head>',
          `  <link rel="canonical" href="${url}" />\n` +
            `    <meta name="robots" content="${page.index ? 'index, follow' : 'noindex, follow'}" />\n` +
            `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`,
        )
        const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`
        writeFileSync(resolve(outDir, file), html)
      }

      const indexed = SEO_PAGES.filter((p) => p.index)
      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          indexed
            .map((p) => `  <url><loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc></url>`)
            .join('\n') +
          '\n</urlset>\n',
      )
      writeFileSync(
        resolve(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), nonBlockingAppCss(), seoPages()],
})
