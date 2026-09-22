/**
 * "Lab" switches for testing the mobile first paint bit by bit ON A REAL
 * PHONE, without a redeploy per experiment.
 *
 * Background (22 Sep 2026): the mobile cold-load blank screen was the
 * cream preloader failing to paint under the blurred blob layers + nav
 * backdrop-filter. The fix on touch devices: blobs reduced to a static
 * gradient (no blur, no motion), nav blur off. The preloader itself
 * tested clean on Chris's iPhone once those were cheap, so it runs
 * everywhere again; the remaining switches re-enable the heavy layers
 * from the URL to find out what else the phone can take:
 *
 *   https://netzeroadvisory.uk/?lab=blobmotion
 *       the blobs drift (still no blur filter)
 *   https://netzeroadvisory.uk/?lab=blobs
 *       the full desktop blob field (blur filter + motion)
 *   https://netzeroadvisory.uk/?lab=all
 *       everything exactly as desktop (blobs + nav blur)
 *
 * Flags: blobmotion | blobs | navblur | all
 * Each flag also lands as a `lab-<flag>` class on <html> so CSS can key
 * off it (landing.css, site-nav.css). No effect on desktop, where all of
 * this is on anyway. Harmless if left in: no flag, no change.
 */
const FLAGS = ['blobmotion', 'blobs', 'navblur', 'all'] as const
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
