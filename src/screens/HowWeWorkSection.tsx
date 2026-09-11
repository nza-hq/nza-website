import { useEffect, useRef, useState } from 'react'
import { MaskReveal } from '../components/MaskReveal'

/**
 * "How we work" - HOT CORAL landing screen 2.
 *
 * Layout (Chris, Sept 2026 - reverts the screens-2-3 vertical sequence):
 * a FULL-SCREEN LOCKED two-column panel. The section pins to the viewport
 * (below the nav) so it "locks into full screen" like the "Where it
 * starts" section, then releases as you scroll past.
 *
 *   LEFT   the specialist statement, large white display type.
 *   RIGHT  three phases - Decode / Build / Partner - as a compact list.
 *          Each is just its number + name + an animated "+" at rest; the
 *          paragraph REVEALS on hover (desktop), tap (touch, via the
 *          is-open click state), or keyboard focus. The "+" idly wiggles
 *          to signal "hover me", and rotates into an "x" once open.
 *
 * The parallax entry is unchanged: the hero is position: sticky inside
 * .hero-coral-stack (WebsitePage) and this coral panel rises UP over it.
 *
 * (The old per-phase SVG visuals - DecodeVisual etc. in HowWeWorkVisuals
 * - are not rendered in this layout. Kept in the codebase in case the
 * little graphics come back inside the reveal.)
 */

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
  /* Section-level reveal drives a light staggered entrance on the phase
     list (CSS keys off .is-revealed + each block's --phase-index). */
  const [revealed, setRevealed] = useState(false)
  /* Click-open state for touch + keyboard - hover handles desktop
     pointers in CSS. Null = all collapsed; only one open at a time. */
  const [openId, setOpenId] = useState<PhaseId | null>(null)

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
          for the section's scroll runway, then releases. */}
      <div className="how-we-work-page-pin">
        <div className="how-we-work-page-grid">
          {/* LEFT - the specialist statement. */}
          <div className="how-we-work-page-left">
            <MaskReveal as="p" className="how-we-work-page-para" delay={0}>
              We are specialists in buildings, energy, and climate, with one
              way of working alongside your team in the tools you own.
            </MaskReveal>
          </div>

          {/* RIGHT - Decode / Build / Partner, paragraphs reveal on hover. */}
          <div className="how-we-work-page-right">
            {PHASES.map((phase, i) => {
              const isOpen = openId === phase.id
              return (
                <article
                  key={phase.id}
                  className={
                    'how-we-work-phase-block' + (isOpen ? ' is-open' : '')
                  }
                  style={
                    { '--phase-index': i } as React.CSSProperties
                  }
                >
                  <button
                    type="button"
                    className="how-we-work-phase-head"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenId((curr) => (curr === phase.id ? null : phase.id))
                    }
                  >
                    <span className="how-we-work-phase-number">
                      {phase.number}
                    </span>
                    <span className="how-we-work-phase-name">{phase.name}</span>
                    <span className="how-we-work-phase-plus" aria-hidden="true" />
                  </button>
                  {/* Reveal - grid-rows 0fr -> 1fr for a smooth height
                      animation; inner clips so the body slides open. */}
                  <div className="how-we-work-phase-reveal">
                    <div className="how-we-work-phase-reveal-inner">
                      <p className="how-we-work-phase-body">{phase.body}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
