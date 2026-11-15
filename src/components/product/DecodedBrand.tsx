/**
 * decodED brand marks. Linzie, 15 Nov 2026: only two places carry them;
 * everywhere else decodED is plain body text.
 *
 * - <DecodedWord /> sets the name in the logo's own two colours, used only in
 *   the manifesto ("Good data, in the right hands").
 * - <DecodedLogoInline /> drops the real logo into the "Let's show you how
 *   decodED works" headline, sitting on the text's baseline with its
 *   lowercase letters the height of the type around it (see
 *   .brand-logo-inline in product-page.css).
 */
export function DecodedWord() {
  return (
    <span className="brand-word">
      decod<span className="brand-word-ed">ED</span>
    </span>
  )
}

export function DecodedLogoInline() {
  return (
    <img
      className="brand-logo-inline"
      src="/assets/logos/decoded-logo-tight.svg"
      alt="decodED"
      draggable={false}
    />
  )
}
