import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductIcon } from './ProductIcons'
import { ProductIllustration } from './ProductIllustrations'
import { ProductStepVideo, type StepVideo } from './ProductStepVideo'
import { useMediaQuery } from '../../hooks/useMediaQuery'

/**
 * The four-step "how it works" section, using Impilo's shared-frame
 * scrollytelling pattern.
 *
 * Mechanic:
 *   - LEFT column: four text blocks stacked, each ~100vh tall.
 *   - RIGHT column: ONE big frame, position: sticky for the section's
 *     entire scroll range. Inside the frame, four illustrations are
 *     absolutely stacked - only one is opacity:1 at a time.
 *   - As the user scrolls and one text block crosses the ~50% viewport
 *     midline, that step becomes "active" and its illustration
 *     cross-fades to the front in the shared frame. Frame chrome
 *     (border + bg) stays put for the whole journey.
 *
 * On mobile (<1024px) the sticky doesn't make sense - the layout
 * collapses to a single column where each text block is followed by
 * its own inline illustration block. The shared frame is hidden via
 * CSS.
 */

export type StepData = {
  number: string
  /** Optional line icon in the step meta row. PABLO/decodED set it;
   *  NZ:AI's showcase items omit it (the number stands alone). */
  iconName?: string
  /** New simple single-string headline (PABLO June 2026 redesign).
   *  When provided, renders directly without the prefix/verb/suffix
   *  highlight pattern. Other products still use the three-part split. */
  headline?: string
  headlinePrefix: string
  highlightedVerb: string
  headlineSuffix: string
  body: string
  /** SVG illustration concept (PABLO / decodED). A step declares EITHER
   *  this OR `video` - the visual slot renders whichever is present. */
  illustrationConcept?: string
  /** Video visual (NZ:AI showcase items). Takes precedence over
   *  illustrationConcept when both somehow exist. */
  video?: StepVideo
}

/* Shared renderer for a step's visual - video if the step declares one,
   otherwise its SVG illustration. Used in both the mobile inline slot
   and the desktop shared frame so the two stay in lockstep. */
function StepVisual({
  step,
  index,
  isActive,
}: {
  step: StepData
  index: number
  isActive: boolean
}) {
  if (step.video) {
    return <ProductStepVideo video={step.video} isActive={isActive} />
  }
  if (step.illustrationConcept) {
    return (
      <ProductIllustration concept={step.illustrationConcept} stepIndex={index} />
    )
  }
  return null
}

type Props = {
  steps: StepData[]
  /** Request Demo pill pinned at the top-right of the shared frame. */
  requestDemoHref: string
  requestDemoLabel: string
}

export function ProductStepsSection({
  steps,
  requestDemoHref,
  requestDemoLabel,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  /* Only ONE of the two visual slots is on screen at a time - the
     desktop shared frame (>=1024) or the mobile inline block (<=1023),
     mutually exclusive via CSS. Gate each slot's `isActive` by which is
     visible so only the on-screen video plays; the hidden (display:none)
     one never fires play() (wasteful, and hidden video is throttled).
     1023px matches the .product-steps-frame-col / inline CSS switch. */
  const isMobile = useMediaQuery('(max-width: 1023px)')

  // IntersectionObserver with a narrow active-band in the middle of
  // the viewport. rootMargin -45% top + -45% bottom shrinks the IO
  // root rect to a 10vh-tall band in the middle of the viewport; a
  // block is "active" when its bounding rect intersects that band.
  // Tightened from -40% (20vh band) per the scrollytelling pacing
  // brief (Knob 2): the wider band let two blocks intersect at
  // once during the handoff, causing both cards to appear "active"
  // for a moment. 10vh band makes the active-flip cleaner.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = textRefs.current.findIndex((el) => el === entry.target)
            if (index !== -1) setActiveIndex(index)
          }
        }
      },
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' },
    )
    textRefs.current.forEach((el) => {
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [steps.length])

  return (
    <div className="product-steps-grid">
      <div className="product-steps-text-col">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => {
              textRefs.current[i] = el
            }}
            className={
              'product-step-text-block' +
              (i === activeIndex ? ' is-active' : '')
            }
          >
            {/* Text content is sticky WITHIN its 100vh-tall block -
                so as the user scrolls, the text pins at top-22vh
                instead of just scrolling past. Combined with the
                shared sticky frame on the right, both columns are
                page-locked together during a step's scroll range,
                then both flip to the next step's content as the
                block boundary passes (Impilo's page-lock feel). */}
            <div className="product-step-text-sticky">
              {/* Impilo-style step header (PABLO June 2026 redesign):
                  ICON on the left, NUMBER on the right (justify-between),
                  a hairline rule below the meta row, then the headline.
                  Replaces the inline-stacked icon+number row the steps
                  used before. */}
              <div
                className={
                  'product-step-meta' +
                  (step.iconName ? '' : ' product-step-meta--no-icon')
                }
              >
                {step.iconName && (
                  <span className="product-step-icon" aria-hidden="true">
                    <ProductIcon name={step.iconName} />
                  </span>
                )}
                <span className="product-step-number">{step.number}.</span>
              </div>
              <div
                className="product-step-rule"
                aria-hidden="true"
              />
              <h3 className="product-step-headline">
                {/* When a step provides the new simple `headline` field
                    we render it directly; otherwise we fall back to the
                    legacy prefix + highlighted verb + suffix pattern
                    other products still use. */}
                {step.headline ? (
                  step.headline
                ) : (
                  <>
                    {step.headlinePrefix}
                    <span className="step-verb">{step.highlightedVerb}</span>
                    {step.headlineSuffix}
                  </>
                )}
              </h3>
              <p className="product-step-body">{step.body}</p>

              {/* Inline visual shown ONLY on mobile via CSS - the shared
                  sticky frame on desktop replaces this. Video or SVG per
                  the step; active when this is the active step so the
                  mobile inline video plays as the user reaches it. */}
              <div className="product-step-inline-illustration">
                <StepVisual
                  step={step}
                  index={i}
                  isActive={i === activeIndex && isMobile}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SHARED STICKY FRAME (desktop only via CSS).
          Holds all four illustrations absolutely stacked; one is
          opacity:1 at a time based on activeIndex. The Request Demo
          pill is pinned at the top-right INSIDE the frame, so it
          stays visible the whole time the section is in view (the
          frame is sticky for the full four-step scroll range). */}
      <div className="product-steps-frame-col">
        <div className="product-steps-frame">
          <Link
            to={requestDemoHref}
            className="product-steps-request-pill"
            aria-label={requestDemoLabel}
          >
            {requestDemoLabel}
            <span aria-hidden="true"> →</span>
          </Link>
          {steps.map((step, i) => (
            <div
              key={i}
              className={
                'product-steps-frame-illustration' +
                (i === activeIndex ? ' is-active' : '')
              }
              aria-hidden="true"
            >
              <StepVisual
                step={step}
                index={i}
                isActive={i === activeIndex && !isMobile}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
