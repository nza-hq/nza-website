/**
 * "Lab" switches for testing the mobile first paint bit by bit ON A REAL
 * PHONE, without a redeploy per experiment.
 *
 * Background (22 Sep 2026): the mobile cold-load blank screen was the
 * cream preloader failing to paint under the blurred blob layers + nav
 * backdrop-filter. The fix on touch devices (see isTouchDevice in
 * preloaderState.ts): preloader skipped, blobs reduced to a static
 * gradient (no blur, no motion), nav blur off. Chris wants the full
 * desktop animation back on iPhone if the phone can take it, so each
 * piece can be re-enabled from the URL to find the one that breaks it:
 *
 *   https://netzeroadvisory.uk/?lab=preloader
 *       cream preloader sequence on (static gradient blobs, no nav blur)
 *   https://netzeroadvisory.uk/?lab=preloader,blobmotion
 *       + the blobs drift (still no blur filter)
 *   https://netzeroadvisory.uk/?lab=preloader,blobs
 *       + the full desktop blob field (blur filter + motion)
 *   https://netzeroadvisory.uk/?lab=all
 *       everything exactly as desktop (preloader + blobs + nav blur)
 *
 * Flags: preloader | blobmotion | blobs | navblur | all
 * Each flag also lands as a `lab-<flag>` class on <html> so CSS can key
 * off it (landing.css, site-nav.css). No effect on desktop, where all of
 * this is on anyway. Harmless if left in: no flag, no change.
 */
const FLAGS = ['preloader', 'blobmotion', 'blobs', 'navblur', 'all'] as const
export type LabFlag = (typeof FLAGS)[number]

const active: Set<string> = (() => {
  if (typeof window === 'undefined') return new Set()
  const raw = new URLSearchParams(window.location.search).get('lab') ?? ''
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter((s) => (FLAGS as readonly string[]).includes(s)),
  )
})()

export function labHas(flag: LabFlag): boolean {
  return active.has(flag) || active.has('all')
}

/** Mirror the active flags onto <html> as lab-* classes for the CSS side. */
export function applyLabClasses(): void {
  if (typeof document === 'undefined' || active.size === 0) return
  const root = document.documentElement
  for (const flag of FLAGS) {
    if (labHas(flag)) root.classList.add(`lab-${flag}`)
  }
}
