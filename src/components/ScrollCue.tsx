import { useEffect, useRef, useState } from 'react'
import { preloaderState, PRELOADER_DISMISSED_EVENT } from '../lib/preloaderState'

/**
 * "Scroll" cue at the foot of the landing hero - the second half of the
 * false-floor fix (the first is the hero sitting 48px short of the
 * viewport so the coral page's crest peeks in; see .landing-screen).
 *
 * A full-viewport hero reads as the whole page (NN/g's "illusion of
 * completeness"), so the hero carries one quiet signifier: a mono
 * "Scroll" microlabel over a 1px line with a short bright segment that
 * runs down it on a loop. The convention on editorial sites - it says
 * "there's more" without a bouncing arrow.
 *
 * Behaviour:
 *   - Appears once the cream preloader has cleared (same gate as the
 *     hero MaskReveals), then a beat after the headline has landed.
 *   - Retires for the rest of the visit on the first real scroll - the
 *     user has found the scroll, the cue has done its job. "Real" =
 *     wheel / touch / scroll keys, or the page moving more than a few
 *     px from where it sat when the cue appeared. Not absolute scrollY:
 *     on phone the mandatory snap parks the page at the hero's top,
 *     past the nav's 56px flow slot, so scrollY is 56 at rest and an
 *     absolute check retired the cue before it ever showed.
 *   - Reduced motion: no running segment, static line.
 * Hero only - repeating it on every page would read as a gimmick.
 */
const HIDE_AFTER_SCROLL_PX = 24

export function ScrollCue() {
  const [shown, setShown] = useState(false)
  const [gone, setGone] = useState(false)
  // Where the page sat when the cue appeared - movement is measured from here.
  const restY = useRef(0)

  useEffect(() => {
    if (preloaderState.dismissed) {
      setShown(true)
      return
    }
    const onDismiss = () => setShown(true)
    window.addEventListener(PRELOADER_DISMISSED_EVENT, onDismiss)
    const fallback = window.setTimeout(onDismiss, 6000)
    return () => {
      window.removeEventListener(PRELOADER_DISMISSED_EVENT, onDismiss)
      window.clearTimeout(fallback)
    }
  }, [])

  useEffect(() => {
    if (!shown || gone) return
    restY.current = window.scrollY
    const retire = () => setGone(true)
    const onScroll = () => {
      if (Math.abs(window.scrollY - restY.current) > HIDE_AFTER_SCROLL_PX) retire()
    }
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'Space', ' ', 'End'].includes(e.key)) retire()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', retire, { passive: true })
    window.addEventListener('touchmove', retire, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', retire)
      window.removeEventListener('touchmove', retire)
      window.removeEventListener('keydown', onKey)
    }
  }, [shown, gone])

  return (
    <div
      className={'scroll-cue' + (shown && !gone ? ' is-shown' : '')}
      aria-hidden="true"
    >
      <span className="scroll-cue-label">Scroll</span>
      <span className="scroll-cue-line" />
    </div>
  )
}
