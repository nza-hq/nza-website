import type { CSSProperties } from 'react'

/**
 * The three SVG visualisations inside the "How we work" phase blocks.
 * All shapes now use `currentColor` so the parent's `color` decides
 * what they paint with - on the new coral page they read as white;
 * on a navy ground they'd read as cream. Only the PARTNER overlap
 * carries its own hard colour (navy at 30%) so it stays a distinct
 * accent regardless of the surrounding palette.
 *
 * Animations fire when the parent .how-we-work-page hits .is-revealed
 * AND each block's own --reveal-delay has elapsed.
 *
 *   DECODE   25 dots start scattered off their grid positions, then
 *            drift in from all directions and lock into a clean 5x5
 *            grid - "the unknown, pieced together into structure."
 *            Each dot is a <g> wrapper (transform: translate) with the
 *            circle at its FINAL grid cell inside; the wrapper animates
 *            from a per-dot scatter offset back to (0,0) so the circle
 *            lands exactly on its cell. Same technique as the landing
 *            hero's three-beat converge. Staggered so the grid assembles
 *            in a flowing cascade rather than snapping all at once.
 *   BUILD    all 25 outlined circles appear, perimeter 16 fill in, then
 *            the square path traces clockwise around the perimeter.
 *   PARTNER  two squares fly in from opposite corners with overshoot,
 *            settle, then the navy overlap fades in.
 */

const GRID_X = [25, 62.5, 100, 137.5, 175]
const GRID_Y = [25, 62.5, 100, 137.5, 175]

/* Deterministic scatter offset for dot `idx` - the vector the dot
   travels FROM as it assembles into the grid. Golden-angle spread so
   the 25 dots arrive from evenly-distributed directions (no clustering),
   with a distance that varies per index so they don't all travel the
   same length. Stable across renders - purely a function of the index. */
function scatterOffset(idx: number): { dx: number; dy: number } {
  const angle = idx * 2.399963 // golden angle in radians (~137.5deg)
  const distance = 34 + ((idx * 53) % 66) // 34-100 user units
  return {
    dx: Math.cos(angle) * distance,
    dy: Math.sin(angle) * distance,
  }
}

export function DecodeVisual() {
  const dots: Array<{ cx: number; cy: number }> = []
  for (const cy of GRID_Y) {
    for (const cx of GRID_X) {
      dots.push({ cx, cy })
    }
  }
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {dots.map((d, idx) => {
        const { dx, dy } = scatterOffset(idx)
        return (
          <g
            key={idx}
            className="decode-dot"
            style={
              {
                '--dot-index': idx,
                '--from-x': `${dx}px`,
                '--from-y': `${dy}px`,
              } as CSSProperties
            }
          >
            <circle cx={d.cx} cy={d.cy} r="7" fill="currentColor" />
          </g>
        )
      })}
    </svg>
  )
}

/* Clockwise position (0-15) of a perimeter cell, starting at the top-left
   corner and following the same path the build square's line draws:
   top edge L->R, right edge T->B, bottom edge R->L, left edge B->T. Used
   to stagger each perimeter circle's fill so it lights up as the line
   reaches it, rather than all at once. */
function perimeterClockwiseIndex(xi: number, yi: number): number {
  if (yi === 0) return xi // top edge: 0-4
  if (xi === 4) return 4 + yi // right edge: 5-8
  if (yi === 4) return 8 + (4 - xi) // bottom edge: 9-12
  return 16 - yi // left edge (xi === 0, yi 1-3): 13-15
}

/* Order (0-8) the 9 inner cells (xi,yi in 1..3) appear in: a clockwise
   spiral from the inner top-left, ending at the centre - echoing the
   clockwise perimeter, then filling inward. */
function innerSpiralIndex(xi: number, yi: number): number {
  if (yi === 1) return xi - 1 // top: (1,1)=0 (2,1)=1 (3,1)=2
  if (xi === 3) return yi + 1 // right: (3,2)=3 (3,3)=4
  if (yi === 3) return 5 + (2 - xi) // bottom R->L: (2,3)=5 (1,3)=6
  if (xi === 1) return 7 // left: (1,2)=7
  return 8 // centre (2,2)
}

export function BuildVisual() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {GRID_Y.map((cy, yi) =>
        GRID_X.map((cx, xi) => {
          const isPerimeter = yi === 0 || yi === 4 || xi === 0 || xi === 4
          return (
            <circle
              key={`outline-${xi}-${yi}`}
              cx={cx}
              cy={cy}
              r="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              /* Perimeter outlines lead the sequence; the 9 inner dots
                 appear LAST (after the line), spiralling in clockwise via
                 --inner-order. */
              className={isPerimeter ? 'build-dot-outline' : 'build-dot-inner'}
              style={
                isPerimeter
                  ? undefined
                  : ({
                      '--inner-order': innerSpiralIndex(xi, yi),
                    } as CSSProperties)
              }
            />
          )
        }),
      )}
      {GRID_Y.map((cy, yi) =>
        GRID_X.map((cx, xi) => {
          const isPerimeter = yi === 0 || yi === 4 || xi === 0 || xi === 4
          if (!isPerimeter) return null
          return (
            <circle
              key={`fill-${xi}-${yi}`}
              cx={cx}
              cy={cy}
              r="7"
              fill="currentColor"
              className="build-dot-fill"
              style={
                {
                  '--fill-order': perimeterClockwiseIndex(xi, yi),
                } as CSSProperties
              }
            />
          )
        }),
      )}
      <path
        d="M 25 25 L 175 25 L 175 175 L 25 175 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="build-line"
      />
    </svg>
  )
}

export function PartnerVisual() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g className="partner-square partner-square--br">
        <rect
          x="65"
          y="65"
          width="115"
          height="115"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
      <g className="partner-square partner-square--tl">
        <rect
          x="20"
          y="20"
          width="115"
          height="115"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
      {/* Partner overlap - navy accent so it reads against the
          white squares regardless of surrounding palette. Was coral
          when the visual lived on a navy card; on the new coral
          page coral-on-coral would disappear. */}
      <rect
        x="65"
        y="65"
        width="70"
        height="70"
        fill="rgba(14, 17, 32, 0.35)"
        stroke="#0E1120"
        strokeWidth="1.5"
        className="partner-overlap"
      />
      {/* Round NZA mark - pops into the centre of the navy overlap once the
          square has formed ("NZA as your partner"). The circle+triangles
          mark (from nza-mark-thick-layered.svg) reads cleaner here than the
          wordmark did. Inlined as a nested <svg> so it can render cream on
          the navy square (an <image href> would show the black source), and
          so preserveAspectRatio handles the scale from the mark's own
          267-unit space. 46x46 centred on (100,100). */}
      {/* The animation (scale 0.5 -> 1) lives on this <g> wrapper, not on
          the nested <svg>. transform-box: fill-box on a nested <svg> is
          honoured by iOS Safari but NOT reliably by desktop Chrome, which
          resolved the scale origin to a corner - so the mark grew in from
          the bottom-right on PC while looking correct on mobile. A <g>'s
          fill-box (its content bounding box) is resolved consistently, so
          the mark now grows from its own centre on both. */}
      <g className="partner-logo">
        <svg
          x="77"
          y="77"
          width="46"
          height="46"
          viewBox="0 0 266.99 267"
          fill="#F7F4EF"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path d="M133.49,267C59.88,267,0,207.11,0,133.5S59.88,0,133.49,0s133.5,59.89,133.5,133.5-59.89,133.5-133.5,133.5ZM133.49,9.98c-68.11,0-123.52,55.41-123.52,123.52s55.41,123.52,123.52,123.52,123.52-55.41,123.52-123.52S201.6,9.98,133.5,9.98h0Z" />
          <path d="M196.16,151.02l-8.05-10-54.23-67.41c-.2-.25-.58-.25-.78,0l-54.23,67.41-8.05,10-36.7,45.61c-.26.33-.03.81.39.81h197.95c.42,0,.65-.49.39-.81l-36.7-45.61ZM55.39,187.44c-.42,0-.65-.49-.39-.81l28.65-35.61,8.05-10,41.4-51.46c.2-.25.58-.25.78,0l41.4,51.46,8.05,10,28.65,35.61c.26.33.03.81-.39.81H55.39Z" />
          <path d="M155.91,143.02h-12.84l-9.19-11.43c-.2-.25-.58-.25-.78,0l-9.19,11.43h-12.84l22.03-27.38c.2-.25.58-.25.78,0l22.03,27.38Z" />
          <path d="M133.1,29.19l-98.98,123.01c-.26.33-.03.81.39.81h197.95c.42,0,.65-.49.39-.81L133.88,29.19c-.2-.25-.58-.25-.78,0ZM55,142.21l78.1-97.06c.2-.25.58-.25.78,0l78.1,97.06c.26.33.03.81-.39.81H55.39c-.42,0-.65-.49-.39-.81Z" />
        </svg>
      </g>
    </svg>
  )
}
