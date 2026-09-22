import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { MaskReveal } from '../components/MaskReveal'

/**
 * Products section - cream slot in the homepage flow that breaks the
 * navy of the hero + Get in touch above and below.
 *
 * Layout (per Chris's revisions):
 *   - Centred heading "Our solutions" at the hero-headline size in
 *     Stolzl Book coral. Body intro below in Stolzl Thin.
 *   - Three product logos in a triptych using the full frame width.
 *     At rest each logo renders as a NAVY SILHOUETTE so all three
 *     read uniform (per Chris - the bright PABLO gradient otherwise
 *     overpowers the muted teal + green of the other two).
 *   - Each card has fixed height pre-reserved so the section DOESN'T
 *     grow on hover; reveal content fades in over that reserved space.
 *
 * Interaction:
 *   - Hover OR click a card to activate.
 *   - The bounding box draws in via two halves - one clockwise from
 *     top centre, one anticlockwise - meeting at the bottom centre.
 *   - Border colour is product-specific (PABLO orange, NZ:AI teal,
 *     decodED green) via the --accent CSS var.
 *   - The logo silhouette fades to its original full-colour version.
 *   - Reveal content fades in - the explanation paragraph (Inter, left
 *     aligned) and the Explore link / "Coming soon" status.
 *   - Clicking the LOGO does NOT navigate. Only the Explore link
 *     routes through.
 *
 * Card hierarchy (homepage copy brief, Sept 2026): logo -> descriptor
 * -> explanation -> link/status. The DESCRIPTOR sits under the logo and
 * is always visible, so a visitor understands each offer before opening
 * the card; only the explanation and the link/status are revealed. The
 * former question line is gone.
 */

type ProductId = 'pablo' | 'nzai' | 'decoded'

type Product = {
  id: ProductId
  name: string
  href: string
  /** True once the product's detail page is finished and meant to be
      public - swaps the non-interactive "Coming soon" status for the
      Explore link. All three pages are still held (ProductComingSoon). */
  ready: boolean
  logoSrc: string
  alt: string
  descriptor: string
  body: string
}

/* Order per Chris (September 2026): NZ:AI / PABLO / decodED - NZ:AI is
   the general case, the other two are specialisations of it. Copy is
   the approved homepage brief, verbatim. */
const PRODUCTS: Product[] = [
  {
    id: 'nzai',
    name: 'NZ:AI',
    href: '/nz-ai',
    ready: false,
    /* Homepage products section is back on cream (Chris reverted v2
       chunk C). Use the dark-text variant so the wordmark reads on
       the cream surface. White-text variant stays in use on the
       actual /nz-ai product page where the canvas is dark navy. */
    logoSrc: '/assets/logos/nzai-logo-dark.svg',
    alt: 'NZ:AI',
    descriptor: 'Specialist support. Tools built around you.',
    body:
      'Bring buildings, energy and climate expertise into your team. We work alongside you to shape strategy, make sense of your data and build software that helps more people take part in delivering it.',
  },
  {
    id: 'pablo',
    name: 'PABLO',
    href: '/pablo',
    ready: false,
    logoSrc: '/assets/logos/pablo-logo.svg',
    alt: 'PABLO',
    descriptor: 'Understand your energy. Plan your investment.',
    body:
      'Understand how you use and buy energy, where you could save and how your costs might change. Test different strategies, from energy procurement to solar and batteries, and see what makes sense for your organisation before you commit.',
  },
  {
    id: 'decoded',
    name: 'decodED',
    href: '/decoded',
    ready: false,
    logoSrc: '/assets/logos/decoded-logo.svg',
    alt: 'decodED',
    descriptor: 'Climate action for education.',
    body:
      'Build a meaningful climate action plan for your nursery, school, college or university. A free tool to help you understand where to start and plan what comes next.',
  },
]

const LEAVE_GRACE_MS = 150

export function ProductsScreen() {
  const [active, setActive] = useState<ProductId | null>(null)
  const leaveTimerRef = useRef<number | null>(null)

  // Per-card random draw-origin so the bounding box doesn't always
  // start tracing from exactly top-centre - feels more organic
  // (Chris: "could we just offset it slightly... a random percentage
  // ... so it feels a bit more organic"). Computed once on mount so
  // the same card always uses the same origin within a session, but
  // refreshing the page reshuffles. Range 30-70% of the top edge.
  const drawOriginsX = useMemo(
    () => PRODUCTS.map(() => 30 + Math.random() * 40),
    [],
  )

  function cancelLeaveTimer() {
    if (leaveTimerRef.current !== null) {
      window.clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
  }
  function activate(id: ProductId) {
    cancelLeaveTimer()
    setActive(id)
  }
  function deactivate() {
    cancelLeaveTimer()
    setActive(null)
  }
  function scheduleDeactivate() {
    cancelLeaveTimer()
    leaveTimerRef.current = window.setTimeout(() => {
      setActive(null)
      leaveTimerRef.current = null
    }, LEAVE_GRACE_MS)
  }

  // Click-OFF handler: tapping anywhere that isn't inside an open
  // product card closes the open card. Bound to document so it
  // catches taps on the section background, the page chrome, etc.
  // Especially important for the mobile accordion (no hover state
  // there - the only way to close an expanded card is to click off).
  useEffect(() => {
    if (active === null) return
    function onDocClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target) return
      if (target.closest('.product-card')) return
      cancelLeaveTimer()
      setActive(null)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [active])

  // Phone safety net: the section is sized to fit one screen with a card
  // open (the other two compact via CSS), but on a short phone it can
  // still overflow the viewport. Once the accordion has opened, bring
  // the open card into view - 'nearest' is a no-op when it already fits,
  // and the snap engine allows it because the section is then taller
  // than the viewport (an oversized snap area may rest anywhere).
  useEffect(() => {
    if (active === null) return
    if (!window.matchMedia('(max-width: 599px)').matches) return
    const timer = window.setTimeout(() => {
      const el = document.querySelector<HTMLElement>(
        `.product-card[data-id="${active}"]`,
      )
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }, 480)
    return () => window.clearTimeout(timer)
  }, [active])

  return (
    <section
      className="screen canvas-paper products-section in-view"
      id="solutions"
      data-screen-label="Solutions"
    >
      {/* PIN WRAPPER - same scrollytelling pattern as the coral
          "How we work" section. Outer .products-section is now a
          250vh scroll runway; this inner .products-section-pin is
          position: sticky; top: 0; height: 100vh so the cream
          products view LOCKS to the viewport for ~150vh of scroll.
          User scrolls in, the pin engages, they get the consistent
          "land on the white" moment, then keep scrolling to leave it.
          Mobile drops the pin entirely - just content-tall. */}
      <div className="products-section-pin">
      <div className="frame">
        <div className="products-intro-block">
          <MaskReveal as="h2" className="products-heading" delay={0}>
            NZA in <em>practice</em>
          </MaskReveal>
        </div>

        <div className="products-triptych">
          {PRODUCTS.map((p, i) => {
            const isActive = active === p.id
            return (
              <MaskReveal
                as="div"
                key={p.id}
                className="products-triptych-cell"
                delay={500 + i * 300}
              >
                <div
                  className={
                    'product-card' + (isActive ? ' is-active' : '')
                  }
                  data-id={p.id}
                  style={
                    {
                      '--draw-origin-x': `${drawOriginsX[i]}%`,
                    } as CSSProperties
                  }
                  onMouseEnter={() => activate(p.id)}
                  onMouseLeave={scheduleDeactivate}
                >
                  {/* Bounding box - two halves, each drawing from top
                      centre. .product-card-box-half--left animates
                      anticlockwise; --right animates clockwise; they
                      meet at the bottom centre. */}
                  <span
                    className="product-card-box-half product-card-box-half--left"
                    aria-hidden="true"
                  />
                  <span
                    className="product-card-box-half product-card-box-half--right"
                    aria-hidden="true"
                  />

                  {/* EXPAND / CLOSE TOGGLE - the "you can open this" cue
                      Chris asked for (the bare card was too minimalist to
                      read as interactive). Ring + plus in the top corner;
                      the plus turns 45deg into a cross while the card is
                      open. No text label (Chris: not needed). 44px target. */}
                  <button
                    type="button"
                    className="product-card-toggle"
                    onClick={() => (isActive ? deactivate() : activate(p.id))}
                    aria-expanded={isActive}
                    aria-label={
                      isActive
                        ? `Close ${p.name} details`
                        : `Expand ${p.name} details`
                    }
                  >
                    <span className="product-card-toggle-ring" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  {/* LOGO - silhouette at rest (navy via mask-image),
                      original colours when active. Crossfade between
                      the two layers. Button wrapper toggles activation
                      without navigating. */}
                  <button
                    type="button"
                    className="product-card-logo-button"
                    onClick={() => activate(p.id)}
                    aria-expanded={isActive}
                    aria-label={
                      isActive
                        ? `Hide ${p.name} details`
                        : `Show ${p.name} details`
                    }
                  >
                    <span className="product-card-logo-stack">
                      <span
                        className="product-card-logo-silhouette"
                        style={{
                          WebkitMaskImage: `url('${p.logoSrc}')`,
                          maskImage: `url('${p.logoSrc}')`,
                        }}
                        aria-hidden="true"
                      />
                      <img
                        src={p.logoSrc}
                        alt={p.alt}
                        className="product-card-logo"
                      />
                    </span>
                  </button>

                  {/* DESCRIPTOR - always visible, stays put on expansion. */}
                  <p className="product-card-descriptor">{p.descriptor}</p>

                  {/* Reveal panel - takes layout space always (so the
                      card height is fixed), but opacity:0 at rest so
                      it's invisible until activation. The inner
                      wrapper is required on mobile for the
                      grid-template-rows 0fr -> 1fr accordion trick to
                      animate smoothly (interpolating max-height
                      alone caused the jittery height stretch Chris
                      flagged). Desktop ignores the wrapper - the
                      reveal is opacity-only there. */}
                  <div
                    className="product-card-reveal"
                    aria-hidden={!isActive}
                  >
                    <div className="product-card-reveal-inner">
                    <p className="product-card-body">{p.body}</p>
                    {p.ready ? (
                      /* tabIndex -1 while collapsed: the desktop reveal is
                         hidden by opacity only, so the link must not be
                         reachable by keyboard until the card is open. */
                      <Link
                        to={p.href}
                        className="product-card-explore"
                        tabIndex={isActive ? 0 : -1}
                      >
                        Explore {p.name}
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      /* Non-interactive status while the detail page is held. */
                      <span className="product-card-explore product-card-explore--soon">
                        Coming soon
                      </span>
                    )}
                    </div>{/* end .product-card-reveal-inner */}
                  </div>
                </div>
              </MaskReveal>
            )
          })}
        </div>
      </div>
      </div>{/* end .products-section-pin */}
    </section>
  )
}
