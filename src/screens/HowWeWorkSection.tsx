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
 * Whole section sits on a saturated coral ground - "very clearly
 * different" from the navy hero above and the cream products section
 * below.
 *
 * Layout (screens-2-3 brief, Sept 2026): a FULL-WIDTH VERTICAL
 * SEQUENCE, not a two-column grid. The screen 2 phases are SEQUENTIAL
 * (Decode -> Build -> Partner, one path in order), so they read as a
 * stack, not a triptych.
 *
 *   OPENING  one held sentence occupying the first viewport of the
 *            coral panel, vertically centred, left-aligned to the
 *            1280/48 nav frame. White display type on coral.
 *
 *   SEQUENCE three full-width phase rows scroll below the opening
 *            line. Each row is text left (heading + body, capped at a
 *            680px measure) and its SVG visual right (110px desktop).
 *            A hairline separator draws left-to-right above each row.
 *
 * Curved top edge (Impilo-style transition): the section keeps its
 * 32px top-corner radius. The parallax entry is unchanged - the hero
 * is position: sticky inside .hero-coral-stack (WebsitePage) so the
 * coral panel rises UP over it. The only change here is that the coral
 * panel is now taller than one viewport, because the sequence scrolls
 * below the held opening line.
 *
 * Reveal: the opening line uses MaskReveal (its own IntersectionObserver).
 * Each phase row reveals when IT scrolls into view - a per-block
 * IntersectionObserver adds .is-revealed, which fires that row's
 * separator draw, content rise, and SVG animation. This gives the
 * SEQUENTIAL "one animation at a time, as you reach it" reveal the
 * vertical layout needs (the previous timed cascade played all three
 * while everything was pinned in one view).
 *
 * Mobile (<600) stacks each row: visual above the heading, then body.
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
  /* Per-block scroll reveal. Each phase row flips to .is-revealed when
     it scrolls into view, firing that row's separator draw + content
     rise + SVG animation. Because the rows are stacked full-width and
     scrolled through, this gives a natural SEQUENTIAL reveal - one
     animation at a time, as the user reaches each row - replacing the
     old section-level timed cascade that played all three at once while
     the two-column grid was pinned. */
  const blockRefs = useRef<Array<HTMLElement | null>>([null, null, null])
  const [blocksRevealed, setBlocksRevealed] = useState<boolean[]>([
    false,
    false,
    false,
  ])

  useEffect(() => {
    const els = blockRefs.current.filter(
      (el): el is HTMLElement => el !== null,
    )
    if (els.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = blockRefs.current.indexOf(entry.target as HTMLElement)
          if (idx < 0) continue
          setBlocksRevealed((curr) => {
            if (curr[idx]) return curr
            const next = curr.slice()
            next[idx] = true
            return next
          })
          obs.unobserve(entry.target)
        }
      },
      /* 0.35 - the row is about a third on screen before its animation
         fires, so the user is looking at it as it plays. */
      { threshold: 0.35 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      className="how-we-work-page"
      id="how-we-work"
      data-screen-label="How we work"
    >
      {/* OPENING - one held sentence, first viewport of the coral panel. */}
      <div className="how-we-work-page-opening">
        {/* Opening line carries the whole "who + how" per the
            screens-2-3 brief. Plain white display type, left-aligned to
            the 1280/48 nav frame, vertically centred in the viewport
            (brief decision 2). */}
        <MaskReveal as="p" className="how-we-work-page-para" delay={0}>
          Specialists in buildings, energy and climate, with one way of
          working: alongside your team, in tools you own.
        </MaskReveal>
      </div>

      {/* SEQUENCE - three full-width phase rows scroll below the opening
          line. Text left, visual right; sequential, never a triptych. */}
      <div className="how-we-work-page-sequence">
        {PHASES.map((phase, i) => (
          <article
            key={phase.id}
            ref={(el) => {
              blockRefs.current[i] = el
            }}
            className={
              'how-we-work-phase-block' +
              (blocksRevealed[i] ? ' is-revealed' : '')
            }
          >
            <div className="how-we-work-phase-text">
              <h3 className="how-we-work-phase-heading">
                <span className="how-we-work-phase-number">
                  {phase.number}
                </span>{' '}
                <span className="how-we-work-phase-name">{phase.name}</span>
              </h3>
              <p className="how-we-work-phase-body">{phase.body}</p>
            </div>
            <div className="how-we-work-phase-visual" aria-hidden="true">
              {VISUALS[phase.id]}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
