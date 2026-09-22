import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), nonBlockingAppCss()],
})
