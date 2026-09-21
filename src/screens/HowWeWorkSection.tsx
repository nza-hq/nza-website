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
      'We start by learning how your organisation works and where its data comes from. Some of it exists, some we gather. What matters is how it connects.',
  },
  {
    id: 'build',
    number: '02',
    name: 'Build',
    body:
      'Then we build the tool for the job — a digital twin, a dashboard, a way to test scenarios. Whatever the form, the whole organisation works from the same information.',
  },
  {
    /* id stays 'partner' - it wires the PartnerVisual graphic and all the
       .partner-* animation CSS. Only the display name changed to "Embed". */
    id: 'partner',
    number: '03',
    name: 'Embed',
    body:
      'From there we hand over what is built, but we stay part of your team — continually building together and advising as the sector changes.',
  },
]

/* Time each phase holds before auto-advancing (Chris: 4.5s). Kept in sync
   with the CSS --hww-interval that drives the tab progress bar. Within
   this window each graphic runs a lifecycle: it enters, holds, then plays
   an EXIT animation (EXIT_MS before the advance) so it's never just sat
   there static - the graphic leaves the way it came, roughly. */
const AUTO_ADVANCE_MS = 7000
/* Exit begins EXIT_MS before the advance. 1.7s gives each graphic's exit
   room to finish MOVING away before the phase switches (Chris: the exit
   was fading before it finished). */
const EXIT_MS = 1700
/* The right side (graphic + tabs + text) reveals this long after the
   section enters, so the left statement lands first AND the Decode
   assemble is actually seen - it plays into a visible figure rather than
   under an entrance fade. */
const RIGHT_REVEAL_DELAY_MS = 850

export function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  /* The active phase that has entered its EXIT animation (the last
     EXIT_MS of its window). -1 = nobody exiting. */
  const [exitingIndex, setExitingIndex] = useState(-1)
  /* Paused while the user hovers / keyboard-focuses the module, so the
     phase never advances out from under them mid-read. */
  const [paused, setPaused] = useState(false)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let revealTimer = 0
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            /* Hold the right side back briefly so the left arrives first
               and the graphic assembles into a visible figure. */
            revealTimer = window.setTimeout(
              () => setRevealed(true),
              RIGHT_REVEAL_DELAY_MS,
            )
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      window.clearTimeout(revealTimer)
    }
  }, [])

  /* Auto-advance while the section is in view, not paused, motion allowed.
     Keyed on activeIndex so a manual select / advance restarts the cycle.
     Two timers per phase:
       - EXIT timer  fires EXIT_MS before the advance and flips this phase
                     into its exit animation (setExitingIndex).
       - ADVANCE timer moves to the next phase (which enters fresh). */
  useEffect(() => {
    // Reset the exit state on any (re)start - a new active phase, a
    // resume from pause, or a manual select all begin fresh (enter -> hold).
    setExitingIndex(-1)
    if (!revealed || paused || reducedMotion) return
    const exitTimer = window.setTimeout(
      () => setExitingIndex(activeIndex),
      AUTO_ADVANCE_MS - EXIT_MS,
    )
    const advanceTimer = window.setTimeout(
      () => setActiveIndex((i) => (i + 1) % PHASES.length),
      AUTO_ADVANCE_MS,
    )
    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(advanceTimer)
    }
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
          {/* LEFT - the specialist statement, two sentences with a small
              vertical break between them. (Spans, not <p>, because
              MaskReveal wraps its children in a <span>.) */}
          <div className="how-we-work-page-left">
            <MaskReveal
              as="div"
              className="how-we-work-page-statement"
              delay={0}
            >
              <span className="how-we-work-page-para">
                We are specialists in buildings, energy and climate — and we
                work in partnership.
              </span>
              <span className="how-we-work-page-para">
                Every project is founded on the same three stages.
              </span>
              <span className="how-we-work-page-cadence">
                Decode. Build. Embed.
              </span>
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
                    (i === activeIndex ? ' is-active' : '') +
                    (i === exitingIndex ? ' is-exiting' : '')
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
