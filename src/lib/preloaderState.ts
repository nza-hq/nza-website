/**
 * Singleton signal for the landing preloader's dismissal state.
 *
 * MaskReveal instances on the LandingHero opt into "wait for the
 * preloader to clear before revealing" via the `waitForPreloader`
 * prop. They check `preloaderState.dismissed` synchronously on mount
 * (in case the preloader has already dismissed - e.g., when the user
 * returns to / after visiting /pablo or /nz-ai), and listen for the
 * `nza:preloader-dismissed` window event in case it hasn't yet.
 *
 * The LandingPreloader component is responsible for two things:
 *   1. Resetting `preloaderState.dismissed = false` on mount, so a
 *      fresh visit to / re-enables the wait.
 *   2. Setting `preloaderState.dismissed = true` AND dispatching the
 *      `nza:preloader-dismissed` window event when it dismisses
 *      (either via the auto-timeout or a manual scroll/touch/key).
 *
 * Putting this in a module-level singleton (rather than React context)
 * keeps the API trivial - any component can import and read the flag
 * or listen for the event without prop-drilling.
 */
export const preloaderState = {
  dismissed: false,
}

export const PRELOADER_DISMISSED_EVENT = 'nza:preloader-dismissed'

/**
 * Module-level "has the preloader already shown this page-load" flag.
 *
 * Lives in JS memory, so:
 *   - On first land at /, value is false -> preloader runs
 *   - Navigate to /pablo and back to /, value is true -> preloader
 *     skips and the hero appears immediately
 *   - Any browser refresh (soft F5 or hard Ctrl+F5) reloads the JS
 *     bundle, resets value to false -> preloader runs again
 *
 * This matches Chris's intent: "we don't want to see it again when
 * navigating around; hard refresh is the only thing that should
 * cause that." (Either flavour of refresh works, since both reload
 * the JS bundle.)
 *
 * The preloader writes via markPreloaderHasRunThisLoad() at dismiss
 * time; LandingPreloader reads via hasPreloaderRunThisLoad() during
 * render to decide whether to render or short-circuit.
 */
/**
 * Touch-device detection for the "no cream preloader on phones / iPads"
 * rule. This is the JS twin of the CSS query used in landing.css and
 * site-nav.css (`@media (hover: none), (pointer: coarse)`) - keep the
 * three in sync.
 *
 * Why the preloader is skipped on touch devices (September 2026): the
 * cold-load "blank white screen for 5-15s, then the site opens" that
 * Chris, his partner and Ben all hit on iPhone AND Android Chrome, and
 * the iPad "blank until I touched it", were the cream preloader itself.
 * On a phone GPU the preloader's blurred blob layers plus the hero's
 * stalled the compositor, so the mark / counter / wordmark never drew:
 * all the user saw was a plain cream sheet (reads as "blank white"),
 * which only left when the 4.5s auto-timer eventually fired late or a
 * touchstart called dismiss(). Rather than a lighter preloader, touch
 * devices go straight from the static index.html splash to the hero -
 * an option Chris offered more than once. Desktop keeps the full
 * sequence. See docs/audit/mobile-load-diagnosis.md.
 *
 * Read synchronously (not via useMediaQuery) so the value is fixed for
 * the whole preloader lifetime; it cannot flip mid-sequence.
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    return false
  }
  return window.matchMedia('(hover: none), (pointer: coarse)').matches
}

let preloaderHasRunThisLoad = false
export function hasPreloaderRunThisLoad(): boolean {
  return preloaderHasRunThisLoad
}
export function markPreloaderHasRunThisLoad(): void {
  preloaderHasRunThisLoad = true
}
