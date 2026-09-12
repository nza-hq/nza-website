import { useEffect, useRef, useState } from 'react'
import { MaskReveal } from '../components/MaskReveal'
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
 *   RIGHT  Decode / Build / Partner as HORIZONTAL TABS. Selecting one
 *          (hover, tap, or keyboard focus) reveals that phase's little
 *          graphic + paragraph in the shared panel BELOW the tabs, using
 *          the vertical space rather than pushing the layout down - so
 *          the whole thing stays on one locked screen (Chris: "I don't
 *          want to have to scroll that far"). Decode is selected by
 *          default. The panels share one grid cell, so switching is a
 *          crossfade with no reflow/jump.
 *
 * The per-phase graphic animates (e.g. Decode's dots assemble into a
 * grid) when its tab is active AND the section has been revealed.
 *
 * The section pins to the viewport (below the nav) so it "locks into
 * full screen", then releases. The parallax entry is unchanged - the
 * hero is position: sticky in .hero-coral-stack (WebsitePage) and this
 * coral panel rises UP over it.
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

export function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  /* Drives the entrance + gates the graphic animations so they play when
     the section is scrolled into view (not on mount). */
  const [revealed, setRevealed] = useState(false)
  /* Which phase tab is selected. Defaults to Decode (leftmost) so the
     panel always shows something. Hover / tap / focus switches it. */
  const [activeId, setActiveId] = useState<PhaseId>('decode')

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

          {/* RIGHT - centred vertical stack: the LARGE active-phase graphic
              front-and-centre at the top, the Decode/Build/Partner tabs in
              the middle, and the active phase's text below. Selecting a tab
              crossfades both the graphic and the text. */}
          <div className="how-we-work-page-right">
            {/* FIGURE - big graphic of the active phase (decorative). */}
            <div className="how-we-work-phase-figure">
              {PHASES.map((phase) => {
                const isActive = activeId === phase.id
                return (
                  <div
                    key={phase.id}
                    aria-hidden="true"
                    className={
                      'how-we-work-phase-panel' + (isActive ? ' is-active' : '')
                    }
                  >
                    <div className="how-we-work-phase-visual">
                      {VISUALS[phase.id]}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* TABS - Decode | Build | Partner, centred. */}
            <div
              className="how-we-work-phase-tabs"
              role="tablist"
              aria-label="Our three phases"
            >
              {PHASES.map((phase) => {
                const isActive = activeId === phase.id
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
                    onClick={() => setActiveId(phase.id)}
                    onMouseEnter={() => setActiveId(phase.id)}
                    onFocus={() => setActiveId(phase.id)}
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
              {PHASES.map((phase) => {
                const isActive = activeId === phase.id
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
