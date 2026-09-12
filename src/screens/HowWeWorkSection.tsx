import { useEffect, useRef, useState } from 'react'
import { MaskReveal } from '../components/MaskReveal'
import { useMediaQuery } from '../hooks/useMediaQuery'
import {
  DecodeVisual,
  BuildVisual,
  PartnerVisual,
} from '../components/svg/HowWeWorkVisuals'

/**
 * "How we work" - HOT CORAL landing screen 2.
 *
 * Layout (Chris, Sept 2026): a FULL-SCREEN LOCKED two-column panel.
 *
 *   LEFT   the specialist statement, large white display type.
 *   RIGHT  a centred vertical stack - the LARGE active-phase graphic
 *          front-and-centre at the top, the Decode/Build/Partner tabs in
 *          the middle, and the active phase's text below.
 *
 * The phases AUTO-ADVANCE (Decode -> Build -> Partner, cycling) on a
 * timer so the graphic + text are seen without any hover - important on
 * mobile. The auto-advance pauses while the user hovers or keyboard-
 * focuses the module, and a tap / hover / focus on a tab jumps straight
 * to it (and resets the timer). The active tab's underline doubles as a
 * progress bar counting down to the next advance. prefers-reduced-motion
 * disables the auto-advance (static; user taps to change).
 *
 * The section pins to the viewport (below the nav) so it "locks into full
 * screen", then releases. Parallax entry unchanged - the hero is sticky
 * in .hero-coral-stack (WebsitePage) and this coral panel rises over it.
 */

const VISUALS = {
  decode: <DecodeVisual />,
  build: <BuildVisual />,
  partner: <PartnerVisual />,
} as const

type PhaseId = 'decode' | 'build' | 'partner'

const PHASES: Array<{
  id: PhaseId
  number: string
  name: string
  body: string
}> = [
  {
    id: 'decode',
    number: '01',
    name: 'Decode',
    body:
      'We begin with what your organisation already holds — knowledge and data alike, much of it undocumented. We work alongside your team to uncover it, structure it, and establish what is solid enough to act on.',
  },
  {
    id: 'build',
    number: '02',
    name: 'Build',
    body:
      'What we build follows from what we find. The form varies; the principle does not. One place your information lives, open to everyone who needs it, and built to be added to rather than just read.',
  },
  {
    id: 'partner',
    number: '03',
    name: 'Partner',
    body:
      'The tool is yours, along with the data and the method behind it. We stay to keep it valuable — refining it as your information improves, widening it as more of your organisation comes to rely on it.',
  },
]

/* Time each phase holds before auto-advancing (Chris: 4.5s - snappier
   than the first 7s pass). The graphic's own animation lands within this,
   and the user can hover/focus to pause for a full read. Kept in sync
   with the CSS --hww-interval that drives the tab progress bar. */
const AUTO_ADVANCE_MS = 4500

export function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  /* Paused while the user hovers / keyboard-focuses the module, so the
     phase never advances out from under them mid-read. */
  const [paused, setPaused] = useState(false)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Auto-advance the phases while the section is in view, not paused, and
     motion is allowed. Keyed on activeIndex so a manual select resets the
     hold (setTimeout restarts), giving the chosen phase a full interval. */
  useEffect(() => {
    if (!revealed || paused || reducedMotion) return
    const id = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % PHASES.length)
    }, AUTO_ADVANCE_MS)
    return () => window.clearTimeout(id)
  }, [revealed, paused, reducedMotion, activeIndex])

  return (
    <section
      ref={sectionRef}
      className={'how-we-work-page' + (revealed ? ' is-revealed' : '')}
      id="how-we-work"
      data-screen-label="How we work"
    >
      {/* PIN - locks the two-column panel to the viewport (below the nav)
          for the section's runway, then releases. */}
      <div className="how-we-work-page-pin">
        <div className="how-we-work-page-grid">
          {/* LEFT - the specialist statement. */}
          <div className="how-we-work-page-left">
            <MaskReveal as="p" className="how-we-work-page-para" delay={0}>
              We are specialists in buildings, energy, and climate, with one
              way of working alongside your team and the tools you own.
            </MaskReveal>
          </div>

          {/* RIGHT - centred stack: big graphic (top), tabs (middle), text
              (below). Hovering / focusing pauses the auto-advance. */}
          <div
            className={
              'how-we-work-page-right' + (paused ? ' is-paused' : '')
            }
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                setPaused(false)
              }
            }}
          >
            {/* FIGURE - big graphic of the active phase (decorative). */}
            <div className="how-we-work-phase-figure">
              {PHASES.map((phase, i) => (
                <div
                  key={phase.id}
                  aria-hidden="true"
                  className={
                    'how-we-work-phase-panel' +
                    (i === activeIndex ? ' is-active' : '')
                  }
                >
                  <div className="how-we-work-phase-visual">
                    {VISUALS[phase.id]}
                  </div>
                </div>
              ))}
            </div>

            {/* TABS - Decode | Build | Partner, centred. */}
            <div
              className="how-we-work-phase-tabs"
              role="tablist"
              aria-label="Our three phases"
            >
              {PHASES.map((phase, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={phase.id}
                    type="button"
                    role="tab"
                    id={`hww-tab-${phase.id}`}
                    aria-selected={isActive}
                    aria-controls={`hww-copy-${phase.id}`}
                    className={
                      'how-we-work-phase-tab' + (isActive ? ' is-active' : '')
                    }
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    onFocus={() => setActiveIndex(i)}
                  >
                    <span className="how-we-work-phase-number">
                      {phase.number}
                    </span>
                    <span className="how-we-work-phase-name">{phase.name}</span>
                  </button>
                )
              })}
            </div>

            {/* COPY - active phase's text below the tabs. */}
            <div className="how-we-work-phase-copy">
              {PHASES.map((phase, i) => {
                const isActive = i === activeIndex
                return (
                  <p
                    key={phase.id}
                    id={`hww-copy-${phase.id}`}
                    role="tabpanel"
                    aria-labelledby={`hww-tab-${phase.id}`}
                    aria-hidden={!isActive}
                    className={
                      'how-we-work-phase-body' + (isActive ? ' is-active' : '')
                    }
                  >
                    {phase.body}
                  </p>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
