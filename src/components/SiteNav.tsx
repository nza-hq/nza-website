import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NzaLogoWide, NzaLogoMark } from './svg/NzaLogoWide'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { ContactMenu } from './ContactMenu'

/**
 * Site-wide sticky navigation. Renders on every page above the route
 * content. Reads body.context-* classes (added by useContextClass per
 * page) to adapt its background tint, logo colour, and CTA variant.
 *
 * Chunks so far:
 *   2 - shell + sticky + layout
 *   3 - logo recolour per context
 *   4 - dropdowns (Our solutions + About us)
 *   5 - CTA variants per context
 *   6 - mobile menu (this chunk)
 *
 * Mobile rules (per brief Section 6):
 *   - The mark itself is the menu trigger (no separate hamburger)
 *   - When open the mark turns coral; tap again to close
 *   - Menu overlay slides down from top, full screen below nav
 *   - Flat layout - all sections expanded inline, no nested dropdowns
 *
 * Brief: docs/briefs/nza-navigation-brief.md
 */


type OpenMenu = 'products' | 'about' | null

const CLOSE_GRACE_MS = 150

export function SiteNav() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const closeTimerRef = useRef<number | null>(null)
  const location = useLocation()

  function cancelCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  function openDropdown(menu: OpenMenu) {
    cancelCloseTimer()
    setOpenMenu(menu)
  }

  function scheduleClose() {
    cancelCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null)
      closeTimerRef.current = null
    }, CLOSE_GRACE_MS)
  }

  // Escape closes both desktop dropdowns AND the mobile overlay.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        cancelCloseTimer()
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close mobile menu when the route changes (link tap).
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Body scroll lock while mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  // Cleanup any pending close timer on unmount.
  useEffect(() => () => cancelCloseTimer(), [])

  return (
    <>
      <nav className="site-nav" aria-label="Site">
        <div className="site-nav-inner">
          {isMobile ? (
            <button
              type="button"
              className={
                'site-nav-mobile-trigger' +
                (mobileOpen ? ' is-open' : '')
              }
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <NzaLogoMark />
            </button>
          ) : (
            <Link
              className="site-nav-logo"
              to="/"
              aria-label="Net Zero Advisory - home"
            >
              <NzaLogoWide />
            </Link>
          )}

          <div className="site-nav-right">
            <ul className="site-nav-items">
              <li
                className="site-nav-item"
                onMouseEnter={() => openDropdown('products')}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className="site-nav-trigger"
                  aria-haspopup="menu"
                  aria-expanded={openMenu === 'products'}
                  onClick={() =>
                    setOpenMenu((m) =>
                      m === 'products' ? null : 'products',
                    )
                  }
                >
                  Our solutions
                  <span className="site-nav-chevron" aria-hidden="true" />
                </button>
                {/* Dropdown order (Chris): NZ:AI / PABLO / decodED. The
                    internal key `openMenu === 'products'` stays for code
                    clarity - only the visible order changes.
                    Coming soon (Chris, Sept 2026): the product pages are
                    held, so - like About us - the three are shown but not
                    clickable. They were Links to /nz-ai, /pablo, /decoded;
                    restore those when the pages go live. */}
                {openMenu === 'products' && (
                  <div className="site-nav-dropdown site-nav-dropdown--soon" role="menu">
                    <span className="site-nav-dropdown-soon">Coming soon</span>
                    <span className="site-nav-dropdown-item site-nav-dropdown-item--soon" aria-disabled="true">
                      <span
                        className="site-nav-dropdown-swatch site-nav-dropdown-swatch--nzai"
                        aria-hidden="true"
                      />
                      NZ:AI
                    </span>
                    <span className="site-nav-dropdown-item site-nav-dropdown-item--soon" aria-disabled="true">
                      <span
                        className="site-nav-dropdown-swatch site-nav-dropdown-swatch--pablo"
                        aria-hidden="true"
                      />
                      PABLO
                    </span>
                    <span className="site-nav-dropdown-item site-nav-dropdown-item--soon" aria-disabled="true">
                      <span
                        className="site-nav-dropdown-swatch site-nav-dropdown-swatch--decoded"
                        aria-hidden="true"
                      />
                      decodED
                    </span>
                  </div>
                )}
              </li>

              <li
                className="site-nav-item"
                onMouseEnter={() => openDropdown('about')}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className="site-nav-trigger"
                  aria-haspopup="menu"
                  aria-expanded={openMenu === 'about'}
                  onClick={() =>
                    setOpenMenu((m) => (m === 'about' ? null : 'about'))
                  }
                >
                  About us
                  <span className="site-nav-chevron" aria-hidden="true" />
                </button>
                {/* About us: pages are on the way but not live yet (Chris) -
                    show them so people see what's coming, but none are
                    clickable. "Who we work with" folded in here too. */}
                {openMenu === 'about' && (
                  <div className="site-nav-dropdown site-nav-dropdown--soon" role="menu">
                    <span className="site-nav-dropdown-soon">Coming soon</span>
                    <span className="site-nav-dropdown-item site-nav-dropdown-item--soon" aria-disabled="true">
                      Our approach
                    </span>
                    <span className="site-nav-dropdown-item site-nav-dropdown-item--soon" aria-disabled="true">
                      Our expertise
                    </span>
                    <span className="site-nav-dropdown-item site-nav-dropdown-item--soon" aria-disabled="true">
                      Who we are
                    </span>
                    <span className="site-nav-dropdown-item site-nav-dropdown-item--soon" aria-disabled="true">
                      Who we work with
                    </span>
                  </div>
                )}
              </li>
            </ul>

            <ContactMenu variant="nav" />
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - rendered as a sibling of the nav so it
          can slide down beneath the nav bar without z-stacking issues.
          Only rendered when isMobile so desktop doesn't pay for the
          listeners. */}
      {isMobile && mobileOpen && <MobileMenuOverlay onClose={() => setMobileOpen(false)} />}
    </>
  )
}

type MobileExpanded = 'products' | 'about' | null

function MobileMenuOverlay({ onClose }: { onClose: () => void }) {
  /* The two top-level dropdowns ("Our solutions", "About us") now
     accordion open / closed per Chris's request. Tapping a header
     toggles its section. Tapping "Who we work with" routes directly. */
  const [expanded, setExpanded] = useState<MobileExpanded>(null)

  function toggleSection(key: MobileExpanded) {
    setExpanded((curr) => (curr === key ? null : key))
  }

  return (
    <div className="site-nav-mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="site-nav-mobile-menu-inner">

        {/* ===== HOME (single link, no accordion) =====
            On mobile the NZA mark in the nav opens the menu rather
            than routing, so without this row the user has no way to
            get back to the homepage from inside a product / about
            page. Sits at the top so it's the easiest tap. */}
        <section className="site-nav-mobile-section">
          <Link
            to="/"
            className="site-nav-mobile-section-header site-nav-mobile-section-header--link"
            onClick={onClose}
          >
            <span>Home</span>
          </Link>
        </section>

        {/* ===== OUR SOLUTIONS ===== */}
        <section
          className={
            'site-nav-mobile-section site-nav-mobile-section--accordion' +
            (expanded === 'products' ? ' is-expanded' : '')
          }
        >
          <button
            type="button"
            className="site-nav-mobile-section-header"
            aria-expanded={expanded === 'products'}
            onClick={() => toggleSection('products')}
          >
            <span>Our solutions</span>
            <span className="site-nav-mobile-section-chevron" aria-hidden="true" />
          </button>
          {/* Mobile order matches desktop: NZ:AI / PABLO / decodED.
              Coming soon - shown but not clickable, like About us (Chris);
              were Links to /nz-ai, /pablo, /decoded. */}
          <div className="site-nav-mobile-section-body">
            <span className="site-nav-dropdown-soon">Coming soon</span>
            <span className="site-nav-mobile-link site-nav-mobile-link--soon" aria-disabled="true">
              <span
                className="site-nav-dropdown-swatch site-nav-dropdown-swatch--nzai"
                aria-hidden="true"
              />
              NZ:AI
            </span>
            <span className="site-nav-mobile-link site-nav-mobile-link--soon" aria-disabled="true">
              <span
                className="site-nav-dropdown-swatch site-nav-dropdown-swatch--pablo"
                aria-hidden="true"
              />
              PABLO
            </span>
            <span className="site-nav-mobile-link site-nav-mobile-link--soon" aria-disabled="true">
              <span
                className="site-nav-dropdown-swatch site-nav-dropdown-swatch--decoded"
                aria-hidden="true"
              />
              decodED
            </span>
          </div>
        </section>

        {/* ===== ABOUT US ===== */}
        <section
          className={
            'site-nav-mobile-section site-nav-mobile-section--accordion' +
            (expanded === 'about' ? ' is-expanded' : '')
          }
        >
          <button
            type="button"
            className="site-nav-mobile-section-header"
            aria-expanded={expanded === 'about'}
            onClick={() => toggleSection('about')}
          >
            <span>About us</span>
            <span className="site-nav-mobile-section-chevron" aria-hidden="true" />
          </button>
          {/* Coming soon - shown but not clickable (Chris). */}
          <div className="site-nav-mobile-section-body">
            <span className="site-nav-dropdown-soon">Coming soon</span>
            <span className="site-nav-mobile-link site-nav-mobile-link--soon" aria-disabled="true">Our approach</span>
            <span className="site-nav-mobile-link site-nav-mobile-link--soon" aria-disabled="true">Our expertise</span>
            <span className="site-nav-mobile-link site-nav-mobile-link--soon" aria-disabled="true">Who we are</span>
            <span className="site-nav-mobile-link site-nav-mobile-link--soon" aria-disabled="true">Who we work with</span>
          </div>
        </section>

        {/* CTA pinned at the bottom of the overlay, full-width. Chooser
            (Email / LinkedIn / Call); closing the overlay follows a pick. */}
        <ContactMenu variant="mobile" onNavigate={onClose} />
      </div>
    </div>
  )
}
