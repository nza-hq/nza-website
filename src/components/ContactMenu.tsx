import { useEffect, useId, useRef, useState } from 'react'

/**
 * "Get in touch" chooser. Replaces the single mailto CTA with a small popover
 * offering Email / LinkedIn / Call (Chris) - so the button gives a choice
 * rather than jumping straight to email. Works on mobile (tap) and desktop
 * (click/keyboard); closes on outside tap, Escape, or picking an option.
 *
 * `variant` styles the trigger: 'nav' = the pill CTA in the header,
 * 'mobile' = the full-width CTA in the mobile overlay.
 */

const EMAIL = 'info@netzeroadvisory.uk'
const LINKEDIN = 'https://www.linkedin.com/company/netzeroadvisory/'
const PHONE = '07437 889836'
const EMAIL_HREF = `mailto:${EMAIL}?subject=NZA%20-%20Get%20in%20touch`
const TEL_HREF = `tel:${PHONE.replace(/\s+/g, '')}`

type Variant = 'nav' | 'mobile'

export function ContactMenu({
  variant = 'nav',
  onNavigate,
}: {
  variant?: Variant
  onNavigate?: () => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node | null
      if (rootRef.current && t && !rootRef.current.contains(t)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function pick() {
    setOpen(false)
    onNavigate?.()
  }

  return (
    <div
      className={'contact-menu contact-menu--' + variant}
      ref={rootRef}
    >
      <button
        type="button"
        className={
          variant === 'mobile'
            ? 'site-nav-cta site-nav-mobile-cta contact-menu-trigger'
            : 'site-nav-cta contact-menu-trigger'
        }
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        Get in touch
        <span className="contact-menu-caret" aria-hidden="true" />
      </button>

      {open && (
        <div className="contact-menu-pop" id={menuId} role="menu">
          <a
            className="contact-menu-item"
            role="menuitem"
            href={EMAIL_HREF}
            onClick={pick}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
              <path d="M3 7l9 7l9-7" />
            </svg>
            Email
          </a>
          <a
            className="contact-menu-item"
            role="menuitem"
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            onClick={pick}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8 11l0 5" />
              <path d="M8 8l0 .01" />
              <path d="M12 16l0 -5" />
              <path d="M16 16v-3a2 2 0 0 0 -4 0" />
            </svg>
            LinkedIn
          </a>
          <a
            className="contact-menu-item"
            role="menuitem"
            href={TEL_HREF}
            onClick={pick}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            </svg>
            Call
          </a>
        </div>
      )}
    </div>
  )
}
