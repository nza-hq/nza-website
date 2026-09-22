import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Make the built app stylesheet non-render-blocking.
 *
 * Vite injects the main CSS as a render-blocking `<link rel="stylesheet">` in
 * <head>. On a COLD load the browser paints nothing at all - not even the
 * inline #initial-splash - until that ~117 KB file arrives, so a first-time
 * mobile visitor stares at a blank white screen for seconds. (It only "works"
 * on a machine where the CSS is already cached.)
 *
 * This rewrites that link into a high-priority preload that swaps to a real
 * stylesheet on load, so the inline splash paints IMMEDIATELY while the CSS
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
        return html.replace(
          /<link rel="stylesheet"([^>]*href="\/assets\/[^"]+\.css"[^>]*)>/,
          (_m, attrs) =>
            `<link rel="preload" as="style"${attrs} id="app-css" ` +
            `onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet"${attrs}></noscript>`,
        )
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), nonBlockingAppCss()],
})
