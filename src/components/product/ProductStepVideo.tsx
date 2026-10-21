import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

/**
 * ProductStepVideo - the video visual type for a product step, used by
 * NZ:AI's showcase items (nzai-showcase brief). Sits in the same slot
 * the SVG `ProductIllustration` uses - the shared pinned frame on
 * desktop and the inline block on mobile - so the scrollytelling
 * mechanics (active-index cross-fade, sticky frame) are untouched.
 *
 * Playback (per brief Part 2):
 *   - Plays ONCE from the start when its step becomes active. Not a loop.
 *   - Pauses when the step goes inactive.
 *   - On re-entry, restarts from frame 0.
 *   - After it ends, the final frame persists - it is NOT reset to the
 *     poster (video elements naturally hold the last painted frame).
 *   - muted + playsInline so browsers allow the programmatic play();
 *     no audio track ships in the first place.
 *
 * prefers-reduced-motion: never autoplay. Render the poster as a plain
 * static <img> instead of a <video>, so nothing moves and no footage
 * is fetched.
 */

export type StepVideo = {
  /** /videos/... path to the H.264 MP4. */
  mp4: string
  /** /videos/... path to the VP9 WebM. */
  webm: string
  /** First-frame JPEG shown before playback and while paused. */
  poster: string
  /** Accessible description of what the clip shows. */
  alt: string
}

export function ProductStepVideo({
  video,
  isActive,
}: {
  video: StepVideo
  isActive: boolean
}) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (reducedMotion) return
    const v = ref.current
    if (!v) return
    if (isActive) {
      // Seek to the top immediately so the clip's FIRST frame is on screen, then
      // hold it for a short settle before playing. The step only becomes active
      // once it is centred in the viewport, so this guarantees the opening frames
      // are visible before motion starts - the story reads from frame 0 (Chris).
      try {
        v.currentTime = 0
      } catch {
        /* currentTime can throw before metadata loads - harmless. */
      }
      const id = window.setTimeout(() => {
        const played = v.play()
        // Autoplay of a muted, inline video is allowed, but guard the promise so
        // a rejection (e.g. mid-load interruption) never throws.
        if (played && typeof played.catch === 'function') {
          played.catch(() => {})
        }
      }, 280)
      return () => window.clearTimeout(id)
    }
    v.pause()
  }, [isActive, reducedMotion])

  // Reduced motion: static poster image, no <video>, no footage fetch.
  // Wrapped in the rounded, overflow-clipped frame so a static poster rounds
  // the same way the video does.
  if (reducedMotion) {
    return (
      <div className="product-step-video-frame">
        <img
          className="product-step-video"
          src={video.poster}
          alt={video.alt}
        />
      </div>
    )
  }

  // The <video> sits inside a rounded, overflow:hidden frame and slightly
  // over-fills it (scale in CSS). That clips away the 1px element-edge seam a
  // rounded, object-fit video otherwise leaves at the bottom/right - invisible
  // on the dark clips but a black hairline on the light map clip (Chris).
  return (
    <div className="product-step-video-frame">
      <video
        ref={ref}
        className="product-step-video"
        muted
        playsInline
        preload="metadata"
        poster={video.poster}
        aria-label={video.alt}
      >
        {/* WebM (VP9) first - smaller; browsers that can't decode it
            (e.g. Safari) fall through to the H.264 MP4. */}
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
    </div>
  )
}
