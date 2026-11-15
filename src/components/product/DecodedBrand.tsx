/**
 * decodED brand marks for running copy (Linzie, 15 Nov 2026: "anywhere we
 * use the word decodED, use the logo, or switch the colour at least").
 *
 * - <DecodedWord /> sets the name in the logo's own two colours ("decod" in
 *   deep green, "ED" in orange) so it reads as the brand inside a sentence.
 * - <DecodedLogoInline /> drops the real logo into a headline, sized to sit
 *   on the text's baseline with its letters the height of the type around it
 *   (see .brand-logo-inline in product-page.css).
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
