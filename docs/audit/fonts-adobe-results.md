# Adobe Fonts migration — verification results

**Brief:** `docs/briefs/active/fonts-adobe.md` (R02, Claude Chat, 21 Sep 2026)
**Executed:** Co-Work, 21 Sep 2026, `main`
**Status:** implementation complete; **pending independent review** (Claude Chat) before close.

---

## What shipped

Stolzl now serves from an Adobe Fonts Web Project (kit `tpk0png`, Web Project "NZA Website",
family `stolzl`), embedded as a preconnected `<link>` in `index.html`. The six self-hosted OTFs and
their `@font-face` blocks are deleted. Off-spec Stolzl weights were remapped to the licensed set;
non-Stolzl weights were left untouched.

Commits: `docs: land fonts-adobe brief R02` · `feat: adobe fonts web project embed for stolzl` ·
`chore: remove self-hosted stolzl otf files` · `fix: remap stolzl weights to the three licensed faces`.

---

## Verification (measured on the dev server serving the real Adobe `<link>`)

| Check | Result | Evidence |
|---|---|---|
| Adobe kit CSS loads | ✅ | `use.typekit.net/tpk0png.css` in resource timing |
| Stolzl font files served from Adobe | ✅ | `use.typekit.net/af/…` woff2 files (fvd n3/n4/n5) |
| **Zero requests for local `stolzl_*.otf`** | ✅ | resource timing for `/fonts/` and `stolzl_*.otf` both empty |
| `grep -rn "stolzl_" src/ public/ index.html` | ✅ zero | — |
| Six OTFs deleted from repo | ✅ | `git rm` of six files in the chore commit |
| Family name matches | ✅ | Adobe family `stolzl`; existing CSS `"Stolzl"` matches case-insensitively |
| 3 used weights available (no synthesis) | ✅ | `document.fonts.check('300/400/500 16px stolzl')` all `true` |
| Headline renders real Stolzl | ✅ | `.landing-hero-headline` → `Stolzl`, weight `300`, face loaded |
| Inter unchanged | ✅ | nav link still `Inter`; no Inter/DM Serif/JetBrains weight was touched |
| `npm run build` | ✅ clean | — |

### Weights actually loaded (from `document.fonts`)

`300`, `400`, `500` → **loaded** (used and downloaded).
`100`, `200`, `700` → **declared but not used**. Of these, Adobe's kit primer still prefetched the
**Thin (100)** face (16.9 KB) even though nothing renders at 100 (both former 100 rules were
remapped to 300). `200` and `700` were not fetched.

---

## Font payload — before vs after

| | Before (self-hosted) | After (Adobe) |
|---|---|---|
| Format | OTF | woff2 |
| Files fetched at runtime | 4 × OTF ≈ **220 KB** (per `mobile-load-diagnosis.md`) | CSS 0.8 KB + font files below |
| Used faces (300/400/500) | — | 18.4 + 18.8 + 18.8 = **56.0 KB** |
| Prefetched-but-unused (100) | — | 16.9 KB |
| **Total fetched** | **~220 KB** | **~72.9 KB** |
| On-disk in repo | 6 OTFs (~330 KB) removed | 0 |

Net: roughly a **67% cut** in runtime font bytes, plus the ~330 KB of OTF gone from the repo and the
Adobe licence issue resolved.

**Actionable note (6-weight kit):** the 16.9 KB Thin prefetch is the concrete cost of shipping the
kit with 6 weights (100/200/300/400/500/700) instead of 3. Trimming the "NZA Website" Web Project on
fonts.adobe.com to just **Light 300 / Book 400 / Medium 500** — same `tpk0png` link, ~30 seconds —
would drop that prefetch and leave only the 56 KB of used faces. Chris chose to proceed with 6; this
is the one measurable downside, and it is reversible any time without a code change.

---

## Not verified here — needs the deployed site / a real device

The harness browser can't throttle mobile or run Lighthouse, and the DevTools "Rendered Fonts" panel
and Network waterfall are only fully meaningful on the deployed build. The following are for Chris /
the reviewer on `netzeroadvisory.uk` once Vercel redeploys:

1. **PSI mobile**, recorded against the **post-`mobile-load-fix`** figures (not the original 81) —
   the brief's Part 5.7. The font change should be neutral-to-positive on PSI.
2. **DevTools → Rendered Fonts** screenshots on a heading, body, nav item, and one lazy-route
   (Expertise/Product) element, confirming Stolzl at the requested weight with no "synthetic" tag.
   (Computed-style + `document.fonts.check` evidence above is a strong proxy, but not the screenshot
   the brief asks for.)
3. **Visual pass at 1440 and 390** — headings, body, nav, hero, and one product page — confirming
   nothing reads heavier/thinner/blurrier than before.

---

## Sweep table (Part 4) — for the reviewer

Every off-spec weight declaration and its resolved family:

| file:line | selector | wt | resolved family | action |
|---|---|---|---|---|
| landing.css:2348 | `.product-card-promise` | 100 | Stolzl (`var(--font-display)`) | remap → 300 |
| site-nav.css:738 | `.contact-page-blurb` | 100 | Stolzl (`var(--font-display)`) | remap → 300 |
| landing.css:1652 | `.three-beat-label-name` | 600 | monospace (inherits `.three-beat-label`) | leave |
| nza-website.css:2035 | `.cap-expanded-lens p .lead` | 600 | Inter (`var(--font-body)`) | leave |
| nza-website.css:2254 | `.mobile-cap-modal-lens-text .lead` | 600 | Inter | leave |
| product-page.css:1590 | `.product-closer-case-cue-num` | 600 | monospace (computed) | leave |
| going-further-section.css:139 | `.pablo-mark` | 700 | Inter (inherits `.going-further-card-body`) | leave |

450: zero uses (existed only as the deleted `@font-face`). Inline JSX weights (DevicePreview 500;
PabloSection02/03/04 300) all in-spec. `font-weight: inherit` (1) left as-is.

**Disagreement with the brief's table:** the brief said remap all four `600`s. Three of the four are
**not Stolzl** (2 Inter, 1 mono in the main bundle; the 4th, on a lazy route, also mono). Only the
two `100`s were Stolzl-and-off-spec. Family-first classification — verified by `getComputedStyle` for
the two inherited cases — prevented silently restyling Inter and monospace text.
