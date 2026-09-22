# STATUS.md

## In progress

**Homepage approved copy + card hierarchy (copy brief, 22 Sep 2026, Co-Work / Fable) - SHIPPED.**
Brief supplied inline by Chris (approved copy, verbatim). Hero untouched (three rotating phrases verified).
- Section 2: new intro "We’re specialists in buildings, energy and climate. We help you make sense of
  complex data and build the tools to decide what comes next." (subject words keep the Stolzl Medium
  lift) + "Our approach: Decode. Build. Embed." (lead-in Light white, cadence coral). "Every project is
  founded..." removed. New Decode / Build / Embed bodies. **One deliberate deviation flagged to Chris:**
  the brief's em dash in Build ("possible—a") is rendered as the site's spaced hyphen per his standing
  "replace all em dashes with hyphens" rule.
- Section 3 cards: hierarchy logo → descriptor (always visible; Chris then asked for the old question
  line's face back: `--font-italic` serif upright, clamp(18-22px) / 16px phone, navy at rest, product
  accent when open) → explanation
  (Inter 13px, left aligned, revealed) → status. Question layer deleted (`.product-card-question` gone).
  `Product.ready` flag: false for all three (pages still ProductComingSoon) → non-interactive "Coming
  soon"; flip to true to get `Explore {name} →` as a `Link` (tabIndex -1 while collapsed). Desktop card
  min-height 420 → 480 (PABLO paragraph is the longest; 45px slack). Phone: logo slot 64, card padding
  24/12, compact (non-open) cards 40px logo + 12px descriptor; measured 553 closed / 573 open in a 613
  budget at 393x705.
- Section 4: two approved paragraphs (`.get-in-touch-body--lead` for the first), CTA "Get in touch →"
  and contacts untouched. Phone closer rhythm tightened (was 740px vs 705 viewport).
- Verified (pane, 1280x800 + 393x705): copy verbatim in DOM, descriptors visible at rest, reveal hidden
  at rest and shown on click/keyboard (`aria-expanded`), descriptor position identical open/closed, no
  horizontal overflow, tsc + build clean. Hover not exercisable in the backgrounded pane; handler unchanged.

**Landing scroll UX + card affordance (22 Sep 2026, Co-Work / Fable) - shipped, awaiting Chris's phone verdict.**
- **Phone swipe-to-next-page:** `html { scroll-snap-type: y mandatory }` at <=1023px (was proximity),
  all four landing screens are snap pages with `scroll-snap-stop: always`; hero parallax dropped on
  mobile (`#home` relative, not sticky - a sticky snap target fought the snap engine, which is why the
  coral page couldn't snap before); `scroll-padding-top: 0`; coral + products pins trimmed on phone;
  footer `scroll-snap-align: end`. Desktop untouched (parallax, pins, JS paging).
- **False-floor fix (research: NN/g "illusion of completeness"):** `.landing-screen` sits
  `--hero-peek: 48px` short of the viewport so the coral crest peeks in at rest (desktop also subtracts
  the 68px nav flow slot via `--hero-nav-slot`; hero-inner padding now `clamp(40px, 7vh, 96px)` so
  720-high laptops still get the peek). New `ScrollCue` ("Scroll" + running 1px line, hero only, shows
  after the preloader, retires on first wheel/touch/scroll relative to its rest position - absolute
  scrollY was wrong because the phone snap parks at 56).
- **Product cards:** ring-and-plus expand/close toggle button (Lucide-style, 44px target, "Expand" /
  "Close" microlabel on desktop, ring only on phone). `deactivate()` added to ProductsScreen.
- Pane limitation: scroll events + transitions don't run backgrounded, so the cue's fade-out and the
  toggle's colour/rotation are verified by rule, not by observation. **Chris to judge on device:** the
  swipe paging feel, the 48px crest peek, the cue, the card toggle.
- **Later the same evening:** curved edges showed a dark notch (body navy behind the corners) → each
  page now extends a `::after` strip of its own colour under the next page's curve, pages stacked
  z-index 1/2/3. Chris then retired the 48px crest peek on both PC and phone ("thin pink band ...
  because of the ratios") - `--hero-peek: 0px`, the Scroll cue carries the affordance alone - and
  dropped the toggle's "Expand"/"Close" text label (ring + plus only, 44px square target).
- **Chris on device: "all working really well, transitions working really well."** Follow-ups shipped:
  curved 32px/24px top edge on the products and get-in-touch pages to match the coral card; the static
  index.html splash (mark + "Net Zero Advisory") deleted - the HTML now just sets the cream ground and the
  React preloader is the single loading page (the mount gate on `#app-css` in `main.tsx` stays).
- **Fit-one-screen pass (Chris's iPhone screenshots, usable viewport ~705px with Safari's bars, NOT the
  812 the pane's "mobile" preset assumes - test phone layouts at 393x705):** coral page was 791px
  (statement 26px + 56px grid gap), products page 862px (a later `.product-card-logo-stack { height:
  120px }` phone rule silently beat the 96px accordion rule; plus an 18px flex gap on collapsed cards).
  Now: coral statement 22px, gap 24, visual 128, pin `min-height: 100svh` + flex-centred → 705/705 with
  588px of content centred. Products: logo slot 72, card gap 0, pin `min-height: 100svh` + `safe
  center` → 496px content closed. **One open, two compact:** `.products-triptych:has(.is-active)
  .product-card:not(.is-active)` shrinks the other cards to 80px (44px logo) so the open card's reveal
  fits the same screen (506-525px content) and the centring re-flows the stack; `scrollIntoView
  (nearest)` safety net in ProductsScreen for short phones / no `:has()`. Desktop verified unchanged.

**Mobile cold-load blank screen — diagnosis + fix shipped, AWAITING PHONE TEST (22 Sep 2026, Co-Work / Fable).**
Symptom (Chris, his partner, Ben — iPhone Safari, iPhone private tab, Android Chrome; laptops fine;
iPad "blank until I touched it"): tiny NZA splash, then a blank white sheet for 5-15s, then the site.
Diagnosis: the blank sheet **is the cream React preloader**. On a phone GPU the 14 `filter: blur(110px)`
blob layers (4 preloader + up to 9 hero) plus the nav's always-on `backdrop-filter` stall the
compositor, so the mark / counter / wordmark never paint; the sheet only leaves when the 4.5s
auto-timer fires (late, main thread jammed) or a `touchstart` calls `dismiss()` - hence "until I
touched it". Engine-agnostic, phone-only, matches every report. Fix (touch devices only, via
`(hover: none), (pointer: coarse)` in CSS and `isTouchDevice()` in `lib/preloaderState.ts`):
preloader skipped entirely (splash → hero), `.landing-blob` hidden, nav `backdrop-filter` off;
`main.tsx boot()` also flips `#app-css` to a real stylesheet itself if the preload `onload` never
fired. Desktop unchanged (verified: preloader + blobs + blur still there). Bundle is 87 KB gzip JS /
21 KB CSS with routes already lazy, so Ben's "compress + lazy-load" angle is already covered.
**Chris confirmed the fix loads on his iPhone.** Follow-ups shipped the same day: blobs are back on
touch as a **static gradient** (radial-gradient mask, no blur filter, no animation - Chris wants the
gradient, motion optional), and `src/lib/lab.ts` adds **`?lab=` switches** so Chris can re-enable each
suspect layer on his phone bit by bit and find the one that breaks it (goal: full desktop preloader
animation on iPhone if the phone can take it). No effect on desktop.
**Preloader is back on for every device** - Chris tested `?lab=preloader` on his iPhone: "works
perfectly", so the touch skip (and `isTouchDevice()`) is gone. The static-gradient blobs and the
no-nav-blur rule on touch stay; the blobs were the real cost. Blob mobile look reworked to match the
PC blur (bell-curve mask + `scale: 2.4`, coral restored). Remaining lab switches, optional:
`?lab=blobmotion` (blobs drift, no blur), `?lab=blobs` (full blur field), `?lab=all` (+ nav blur).
If Chris reports one of those clean on the iPhone it can become the touch default too.

**Launch day (R03) — mostly landed (22 Sep 2026, Co-Work). Analytics install + close pending Chris.**
Brief `docs/briefs/active/launch-day.md`.
- Share-card meta (OG + Twitter) in `index.html` — **one shared set, served on every route via the
  SPA rewrite; NOT per-route. Per-route cards need prerendering (future work). No canonical tag.**
- Brand assets from the locked tokens: `public/og-default.png` (1200×630, 46 KB; master
  `docs/assets/og-default.svg`), `public/favicon-32.png`, `public/apple-touch-icon.png` (solid navy,
  no alpha). Vite purple favicon gone. Title → "Net Zero Advisory - specialists in buildings,
  energy and climate".
- Footer: `/terms` + `/cookies` links removed; `/privacy` kept + a minimal `/privacy` placeholder
  route added (no policy content — drafted separately). `/about` + `/clients` nav links already gone
  (About us is "coming soon"); routes still live. Contact already `info@netzeroadvisory.uk`.
- **Analytics — DONE + verified live.** `@vercel/analytics` v2.0.1 (2.1.x was a bad guess - canary
  only) + `<Analytics />` at the app root. The agent ran `npm install` (it runs on Chris's Windows
  box, so the "no Linux-VM lockfile" rule's rationale did not apply) after the version fix, committed
  the lockfile, pushed. On the live site `/_vercel/insights/script.js` serves real JS (200,
  `application/javascript`, not the SPA HTML - the rewrite does NOT eat it) and the `/view` beacon
  fires. Chris confirms the dashboard shows the visit (agent can't reach the Vercel account).
- **Products held "coming soon" (Chris):** `/pablo`, `/nz-ai`, `/decoded` render a `ProductComingSoon`
  stub (full pages/configs kept for later); landing "NZA in practice" cards no longer link out
  ("Coming soon" label, no navigation).
- Launch-day brief is essentially complete; archive after the independent analytics review.

## Last completed chunk

**Fonts: Stolzl → Adobe Fonts (R02) — IMPLEMENTATION COMPLETE, pending review (21 Sep 2026, Co-Work).**
Brief `docs/briefs/active/fonts-adobe.md`; results `docs/audit/fonts-adobe-results.md`.
Stolzl now serves from an Adobe Web Project (kit `tpk0png`, family `stolzl`) via a
preconnected `<link>` in `index.html`; six self-hosted OTFs + `@font-face` blocks deleted;
two Stolzl `font-weight: 100` rules remapped to 300 (family-first sweep — the brief's
"remap all four 600s" was wrong, three of four are Inter/mono). Font bytes ~220 KB → ~73 KB.
Both blocks were cleared first: mobile-load-fix landed + verified on device; embed supplied.
**Not archived — awaiting Claude Chat review** (Rendered-Fonts screenshots + PSI on the
deployed site, per Part 5). Known note: the 6-weight kit makes Adobe prefetch the unused Thin
(100) face (16.9 KB); trimming the kit to 300/400/500 in Adobe would remove it (Chris's call).

**Also this session (mobile, shipped):** load fix (CSS code-split 182→117 KB; Google Fonts
`@import` → async `<link>`) — Chris confirmed the ~15s mobile load is resolved; iOS immersive
chrome + hero sized to `svh` so the client carousel clears Safari's bar; coral-page snap
removed (jittered against the sticky parallax) while `#solutions`/`#get-in-touch` still snap;
product cards tightened on phone; 7s per Decode/Build/Partner phase; Partner mark grows from
centre on desktop; new "How we work" statement + "Decode. Build. Partner." cadence line.

---

**Landing: screen 3 + sign-off copy (R01) — COMPLETE (13 Sep 2026, Co-Work).**
Brief archived at `docs/briefs/archive/screen3-signoff-copy_COMPLETED.md`.
Copy-only revision to landing screens 3 (ProductsScreen) and 4 (GetInTouchScreen).
Screen 2 (HowWeWorkSection) untouched, per brief.

- [x] **Part 1** — brief landed at `docs/briefs/active/screen3-signoff-copy.md`;
  `current.md` repointed.
- [x] **Part 2** — screen 3: heading `Where it starts` → `What we've built`; the
  `.products-intro` "Three ways in…" element deleted entirely (element, not just
  string); orphaned `.products-intro` CSS rule removed (`.products-intro-block`
  kept — still used). Card copy: NZ:AI question → "Want to do more with your
  data?" + longer partnership promise (kept long, per brief); PABLO + decodED
  promises rewritten. Card order NZ:AI/PABLO/decodED unchanged. Heading reveal
  delay left at 0 (no retiming needed once the intro reveal was gone).
- [x] **Part 3** — screen 4: headline `Let's talk.` → `Tell us what you'd build.`
  (italic coral emphasis moved talk→build); body replaced with the longer
  economic-argument copy; CTA "Get in touch" unchanged.
- [x] **Part 4** — verified at 375px: no horizontal overflow; get-in-touch inner
  block 715px inside an 812px viewport — full body + CTA + EMAIL/LINKEDIN/CALL
  row all fit, CTA not pushed off (screenshot captured). Grep clean: "Three ways
  in" and the "Where it starts" heading both gone; `products-intro` returns only
  the still-used `.products-intro-block`. Accents intact (NZ:AI teal, PABLO
  orange, decodED green→orange); Explore hrefs /nz-ai //pablo //decoded. Console
  clean; `npm run build` clean. Also updated two `.products-*` CSS comments that
  still named "Where it starts" → "What we've built" so grep stays clean.

**Follow-up tweaks (13 Sep 2026, Co-Work) — pushed:**
- Screen 2 Decode/Build/Partner body copy now Stolzl Light (was Inter), matching
  the homepage supporting-body voice.
- Screen 2 Partner graphic now uses the round NZA mark (circle + triangles) inlined
  with a cream fill, replacing the NZ:AI wordmark placeholder. Circular-icon note
  resolved.

## Previous chunk (was Last completed)

**NZ:AI showcase: from process to proof (R01) — COMPLETE (Sept 2026, Co-Work).**
Brief archived at `docs/briefs/archive/nzai-showcase_COMPLETED.md`.
Replaced /nz-ai's three process stages with four video-backed showcase items.

- [x] **Part 1** — brief landed; `current.md` repointed; `public/videos/nzai/`
  scaffolded with 8 placeholder videos (4× MP4 h264 + 4× WebM vp9, 1080²,
  8s, silent, 24–36KB each) + 4 poster JPEGs (grey label cards, <40KB), all
  at the exact brief filenames. `docs/videos-nzai-README.md` carries the spec
  + shot list + regen command. NOTE: ffmpeg was installed (Gyan.FFmpeg 9.0.1,
  winget) to encode these — placeholders are real, drop-in-replaceable files.
- [x] **Part 2** — `ProductStepVideo` added (muted/playsInline/preload=metadata,
  webm+mp4 sources, no loop; plays from 0 on active, pauses on inactive, holds
  final frame; reduced-motion renders the poster as a static `<img>`).
  `ProductStepsSection` branches via a `StepVisual` helper (video vs SVG); step
  type gains optional `video`, `illustrationConcept` now optional. Regression
  verified: /pablo + /decoded still render 5 SVG steps, 0 video elements, no
  new console errors.
- [x] **Part 3** — NZ:AI copy: hero tagline "Intelligence you own.", one-liner
  (17 words), manifesto body replaced (headline "inside" still italic coral),
  transition "Let's show you what … we've built". AI-budget comment removed.
  Net substantive AI mentions now zero (brand NZ:AI aside) — the brief's open
  question resolves to "no AI mention" by the new copy.
- [x] **Part 4** — three stages replaced with four video showcase items (Living
  reports / Live carbon inventory / Estate intelligence / Performance tracking),
  each with a `video` set + alt. Verbs render teal `#0F9888`, not italic; no
  icons (iconName now optional, number left-aligns via `--no-icon`). Videos load
  (readyState 4, 1080²) with webm-then-mp4 + poster. NOTE: the 3 concept names
  the brief listed (decode-connection-forming-network etc.) were referenced only
  by nzai and were never defined in ProductIllustrations — nothing to delete
  there. The actual NZ:AI illos (world-map-emission-dots, trajectory-chart-
  milestones, waterfall-cascade-chart, multi-year-tracking-chart) are orphaned
  (were already, pre-brief); left in place + reported (not brief-named).
- [x] **Part 5** — closer: "Start with a conversation." + new body. Three case
  studies (EOC, Royal Wimbledon, Molson) unchanged; no summary band added.
- [x] **Part 6** — verified @1440/1280/1024/768/600/414/375: pinned frame sticky
  + video fits (485px, no overflow) on desktop; frame hidden + inline 1:1 video
  (335² slot) at <1024; no horizontal scroll anywhere. Videos load (readyState
  4, 1080²). PABLO/decodED regression: 5 SVG steps each, 0 videos, no new
  console errors. Prod build clean; 12 assets ship to dist.

**Known issues / notes:**
- **Placeholder videos are in place** — grey label cards, not real footage.
  Chris records the real 8 files (spec + shot list in `docs/videos-nzai-README.md`)
  and drops them at the same paths; no code change needed.
- **ffmpeg installed** (Gyan.FFmpeg 9.0.1, winget, user scope) this session to
  encode the placeholders — approved by Chris. New shell needed for it on PATH.
- **Runtime playback not exercised in-harness**: the headless browser pane runs
  backgrounded, so Chromium pauses video-only media to save power (play() starts
  then aborts) and IntersectionObserver/animation don't composite. Playback
  logic is code-verified + files load (readyState 4); **Chris should eyeball the
  scroll→play→pause→restart behaviour via launch.bat**.
- **prefers-reduced-motion** renders the poster as a static `<img>` (code path
  verified; OS toggle not exercisable via the harness).
- Four orphaned NZ:AI illustration defs remain in `ProductIllustrations.tsx`
  (world-map-emission-dots, trajectory-chart-milestones, waterfall-cascade-chart,
  multi-year-tracking-chart) — dead before this brief, not brief-named, left for
  a future cleanup.
- **Independent review is MANDATORY** for this brief (shared `ProductStepsSection`)
  — Claude Chat to read the diff on GitHub before merge, focusing on the SVG↔video
  branch.

## Previous chunk

**Landing screens 2 & 3 restructure (R01) — COMPLETE (Sept 2026, Co-Work).**
Brief archived at `docs/briefs/archive/landing-screens-2-3_COMPLETED.md`.

- **Part 1** — brief landed, `current.md` created, CLAUDE.md stale facts fixed
  (repo URL → `nza-hq/nza-website`; five-screen → four-screen description).
- **Part 2** — screen 2 copy: single opening line replaces the two paragraphs +
  the deleted "three phases" tagline; three new phase bodies. `phases-intro`
  removed (JSX + CSS).
- **Part 3** — screen 2 is now a full-width vertical sequence: 100vh held
  opening line + three full-width phase rows (text left / visual right).
  Two-column grid + sticky pin removed; reveal switched to per-block
  IntersectionObserver (sequential, seen). `.hero-coral-stack` parallax entry
  untouched; landing is native scroll (no snap-paging in the live flow).
- **Part 4** — screen 3: heading "Where it starts", intro "Three ways in,
  depending on what you need first."; cards reordered NZ:AI / PABLO / decodED
  with new promises + NZ:AI question.
- **Part 5** — verified @1440/1280/1024/768/600/414/375: phase visuals
  110/110/110/72/72/64/64px; body left edge aligns pixel-exact to the nav logo
  at every width (frame padding mirrors the nav's 48→20px @767 breakpoint);
  row→stack at <600 (visual above heading); zero horizontal scroll; console
  clean; prod build clean. Reduced-motion holds final states (CSS-verified).

Divergences from the brief (all deliberate, flagged to Chris):
1. Phase bodies use first-person "we" (verbatim per brief) — contradicts the
   CLAUDE.md no-"we" rule, but matches copy already shipped in this section.
2. Reveal is a per-block IntersectionObserver, not the brief's stale
   `--reveal-delay` reference (that mechanism no longer existed).
3. Opening line renders plain white (brief decision 2) — dropped the old
   per-word coral highlight on buildings/energy/climate.
4. Frame padding tracks the nav's 767px breakpoint (48→20px) so logo alignment
   survives on tablet/phone; the component's 1023 boundary still governs layout.
5. CLAUDE.md Environment "Project folder" path is also stale
   (`Dev\nza-website` vs actual `Dev\nza-hq\nza-website`) — left as-is; the
   brief authorised only the two named corrections. Worth a follow-up.

## Previous chunk

**decodED + landing polish (July 2026, Co-Work session).** Five requests
from Chris:
1. **Landing "How we work" — Decode infographic reworked.** The 5×5
   Decode grid no longer just fades in; the 25 dots start scattered
   (golden-angle offsets) and drift in from all directions to assemble
   into the grid with a staggered, eased cascade.
   `HowWeWorkVisuals.tsx` (dots are now `<g>` wrappers) + `landing.css`
   (`decode-dot-assemble` keyframe).
2. **decodED manifesto emphasis → orange.** `<em>right hands</em>` (was
   just "right") now renders in decodED orange `#E8743C` instead of the
   site-default coral, scoped via `.manifesto-block--decoded ... em`.
   Italic + Times fingerprint preserved. `decodedConfig.tsx` +
   `manifesto-block.css`.
3. **Tooltip redesigned.** The "climate action plan" trigger is now a
   button that opens an on-brand popover (cream card, green text, orange
   gov.uk link) on hover OR click/tap — and no longer navigates itself;
   only the in-popover link goes to gov.uk. Closes on outside-click /
   Escape; works on touch. `Tooltip.tsx` + `tooltip.css` (new API:
   `label` prop replaces the child `<a>`).
4. **Manifesto full-screen lock.** The coloured manifesto block now
   holds static + fully visible for a 60vh beat (runway 200vh→260vh)
   before the existing cream/parallax handoff runs, so it reads as a
   deliberate "snap and hold" like the landing between-screen snap.
   `ManifestoBlock.tsx` (LOCK phase in the text-y JS) +
   `manifesto-block.css` + `product-page.css` comment. Applies to all
   three product pages. *Lock duration is tunable — flag from Chris:
   he was unsure of the exact feel; may push toward a harder snap.*
5. **Landing solutions reorder + copy.** Order is now PABLO / NZ:AI /
   decodED (was PABLO / decodED / NZ:AI); intro reworded away from
   "Three tools we've built…" to "Different challenges call for
   different answers…". `ProductsScreen.tsx`.

Typecheck + prod build clean. Verified in-DOM (computed styles) — live
animation/IO couldn't be screenshotted in the headless pane.

---

## Previous chunk

**Product page template — overnight build, 3 pages live.** New shared
`<ProductPage>` template populates `/pablo`, `/nz-ai`, `/decoded` from
per-product config objects. All five sections per brief
(`docs/briefs/nza-product-page-template-brief.md`). All 11 product
screenshots Chris dropped during the build are wired up and cycling.
Companion Impilo investigation brief at
`docs/briefs/nza-impilo-investigation-brief.md` — see
`docs/impilo-findings.md` for the upfront limitation (no Playwright
available, built using brief specs + standard scrollytelling patterns).

What landed:
- `src/components/product/ProductPage.tsx` — config-driven five-section
  template (hero, transition headline, "Let's show you" inline-pill
  section, four-step scrollytelling, closer)
- `src/components/product/BrowserFrame.tsx` — cycling product preview:
  4.5s hold, 600ms cross-fade, hover-pause, progress segments
  click-to-jump, graceful PNG fallback via onError
- `src/components/product/ProductStep.tsx` — coordinated arrival on
  scroll-in (single observer per row → all children stagger from
  shared `.is-revealed` class with their own transition-delays)
- `src/components/product/ProductIcons.tsx` + `ProductIllustrations.tsx`
  — 12 inline Tabler-style icons + 12 placeholder line-art SVGs (one
  per step concept)
- `src/data/products/{pablo,nzai,decoded}Config.ts` — locked copy +
  per-product palette per brief
- `src/routes/ContactPage.tsx` — stub for the Request Demo flow
  (reads `?product=` and adapts the mailto)
- `src/components/SiteFooter.tsx` — site-wide footer (brief said
  inherit from existing component, but none existed)
- `src/styles/product-page.css` — ~700 lines covering all five
  sections + decodED light variant overrides
- `docs/impilo-findings.md` + `docs/decisions-log.md` — investigation
  notes, limitations, and every place the implementation differs
  from the brief

Real screenshots wired up by end of build:
- PABLO (4): home, flow, financial, optimise
- NZ:AI (4): map, waterfall, data-quality, trajectory
- decodED (3): map, map-2 (3D buildings), dashboard

Commits on `origin/main` (see git log for full list — roughly 20
commits across the night, each at most one logical change so the
morning review is reversible chunk-by-chunk if anything is off).

Heads-up flags for the morning review:
1. **/pablo + /nz-ai were full bespoke pages before tonight.** This
   brief explicitly says they should be populated using the template,
   so I replaced them. Earlier in the session Chris said "leave them
   alone" for the nav rebuild — I went with the *new* brief since
   it supersedes. Old route components still in git history if
   reverting is wanted.
2. **No live Impilo Playwright inspection happened** (no headless
   browser available). Animation timings + scroll mechanics are best-
   effort matches to the brief's stated values. All timings live as
   CSS variables / named consts so a side-by-side compare can re-tune
   them in one place.
3. **Real step illustrations are placeholder line-art** per brief
   first-build allowance. Real artwork from Leo Morgan / dawn.design
   slots in by replacing the SVG paths in `ProductIllustrations.tsx`.

## Previously completed (next-most-recent)

**Site-wide navigation system — 8 chunks landed.** New `SiteNav` mounted above every route. Sticky header, context-adaptive logo recolour, glassmorphic dropdowns, per-context CTA variants, mobile mark-as-trigger menu, three stub pages so all nav links resolve. Brief at `docs/briefs/nza-navigation-brief.md`.

Commits on `origin/main`:
- `fb9f256` — chunk 1: foundation (`NzaLogoWide` + `NzaLogoMark` SVG components, `useContextClass` hook, brief stored)
- `3ed9bd5` — chunk 2: `SiteNav` shell mounted in App.tsx, sticky positioning + layout, context body class plumbing per page, old FloatingNav unwired from PABLO + NZ:AI
- `ff50d6f` — chunk 3: logo per-group recolour (mark/net/zero + advisory separately) wired to `body.context-*` classes — the "signature move"
- `61466f5` — chunk 4: dropdowns (Our products + About us), glassmorphic panels with hairline coral border, hover-open + 150ms grace close, Escape dismiss, gradient/teal/green swatches per product
- `aaf1f7a` — chunk 5: CTA per-context variants (outlined coral/violet/teal on dark, solid coral/orange on light)
- `78434f4` — chunk 6: mobile menu — `NzaLogoMark` swapped in as the trigger, full-screen overlay slides down, flat layout with section labels + product swatches, body-scroll-locked while open, route-change auto-closes
- `8da9e95` — chunk 7: stub pages (`/decoded` context-decoded, `/about` + `/clients` context-cream), old `FloatingNav.tsx` + `MobileNavMenu.tsx` deleted
- (this) — chunk 8: a11y + verification — visible focus rings on every interactive element (previously suppressed by `outline: none`), 36px min nav touch targets, 44px min mobile menu items, `prefers-reduced-motion` swept across base, dropdowns, mobile menu, logo recolour transitions

## Previously completed

**NZ:AI product page — 8 chunks landed.** New `/nz-ai` product page mirroring `/pablo` structurally. Eight sections per the brief at `docs/briefs/nz-ai-page-brief.md`, copy from v8 at `docs/briefs/nz-ai-copy-v8.md`.

Commits on `origin/main`:
- `615d68f` — chunk 1: route + shell + brief/copy stored in docs
- `72998a1` — chunk 2: hero + closing CTA
- `cfb07e6` — chunk 3: Sections 2 (Opportunity) + 3 (What It Is)
- `295ca27` — chunk 4: Section 4 (How It Works) with Discovery weighted
- `c1ef2c4` — chunks 5–7: What It Does + Who It's For + Why Now
- (this) — chunk 8: Products card rewire to `/nz-ai`, voice audit, verification

**Voice rewrite pass:** all v8 "we"/"us"/"our" instances rewritten to third-person; final audit (`grep -nwE "we|us|our"` excluding JSX comments) returns zero in user-facing copy. Two notable rewrites flagged:
- Closing CTA: rewritten to preserve "together" warmth without "we" — *"…to work out together whether a discovery sprint suits, or something else fits the situation better."*
- Quiet link to Clients: brief specified *"See who we work with →"* verbatim — rewrote to *"See NZA's clients →"* to keep the no-first-person rule.

**AI mention budget:** exactly three on the page — Discovery card *"AI accelerates the build"*, Stewardship card *"rate at which AI is changing what's possible"*, plus the brand name "NZ:AI" itself. No extras.

**Italic emphasis** rendered via the existing site convention (Times New Roman italic, coral) rather than the brief's DM Serif Display — keeps the typographic fingerprint consistent across the website. Words italicised per brief: *act on* (hero), *see* (S2), *your* (S3, instead of "you" since v8 has no standalone "you"), *you* (S4), *questions* (S5), *more* (S6), *caught up* (S7), *fit* (S8).

**Visual placeholders:** every section's visual is a navy card with a thin coral rule and a monospace label, aspect-ratio-matched to the final asset so layout doesn't shift on delivery — hero animation, before/after, configuration sequence (4 client frames with gradient-sampled border colours), three-phase diagram (inline SVG), three screenshot tiles for What It Does.

**Products card** on the home page rewired: NZ:AI card now `<Link to="/nz-ai">` (was `<a href="#">`). PABLO card was already wired.

**Out of scope (per brief):** final hero animation, demo screenshots, configuration sequence visuals, three-phase diagram production version, Calendly/contact form (CTA uses `mailto:chrisscott@thenza.co.uk` for launch), SEO meta, Open Graph cards. All scaffolded so visual delivery is a one-for-one swap.

## Previously completed

**Expertise: Molson-style zone panel + hoverable quadrants + type-scale plan** (`7109e33`).

Iteration on the Expertise interactive (built in `9691bba`) per Chris's review:

- Zone panel restyled to feel like a Molson Scope 3 callout — upright Stolzl Medium coral title (was DM Serif italic), body text dropped 13 to 11.25px, width trimmed 312 to 216px so the panel fits inside its zone slice. Background is now translucent cream (rgba 0.94) with backdrop-blur, so the illustration shows through faintly.
- Hoverable quadrants: new `.ghg-zone-hits` overlay layer adds four invisible buttons over each zone's x-slice. Hovering anywhere within a zone triggers the same panel reveal as the label button above. Z-stack: SVG (0) → glow (1) → hits (3) → panel (4).
- Right-column squeeze fix on Expertise: `#capabilities`-scoped overrides shrink the text column max-width 480 to 360, headline to `clamp(28px, 3vw, 42px)`, lede to `clamp(14.5px, 1vw, 16px)`. The diagram size is unchanged — just less weight on the right.
- Type-scale plan drafted at `docs/briefs/type-scale-recalibration-plan.md`. Two-tier proposal (Hero / Inner-screen). Home unchanged; Expertise / Approach / Products / Clients drop ~30% on headline + lede. Awaiting Chris sign-off before implementing.

## Previously completed

**Phone redesign — 4 commits.** Two-tier responsive system with the boundary at 600px. iPad and half-screen browsers ride the desktop layout; phones get a properly-designed experience.

Commits on `origin/main`:
- `3bcdaf4` — phone redesign 1/4: foundation. Breakpoint migration to 599px, `useMediaQuery` hook, `useSnapPaging.shouldSnap()` gate (mouse-primary only), `.screen` min-height removed at <600.
- `311e89a` — phone redesign 2/4: hamburger nav for <600px. `MobileNavMenu` portal-rendered overlay, `FloatingNav` viewport-switch.
- `b84b52f` — phone redesign 3/4: full-screen Approach modal. `MobileApproachModal` slide-up panel with header / coral icon disc / lead / body / 3 stacked lens sections; back button + Esc + swipe-down + backdrop tap close. `ApproachGrid` viewport-switch.
- (this) — phone redesign 4/4: docs.

Earlier work (preserved):
- 28+ commits since the initial scaffold. The full prototype is ported with 5 screens, GHG reveal, marque overlay, capability grid expand, clients carousel + popover, and the 8-section PABLO page.

## Current state

The site renders three coherent experiences:

| Viewport | Layout | Snap-paging | Approach detail | Nav |
|---|---|---|---|---|
| Desktop ≥600 + mouse | Full editorial multi-column | On | In-place expand | Pill |
| iPad / touch ≥600 | Full editorial multi-column | Off (touch) | In-place expand | Pill |
| Phone <600 | Single-column, content-tall sections | Off | MobileApproachModal | Hamburger → MobileNavMenu |

Two CSS breakpoints in active use: `(max-width: 599px)` for phone, `(max-width: 1023px)` for two documented exceptions (the marque overlay and the product cards 3-col).

`npm run build` green. Typecheck green.

## What's working

- **Routing** — `/` and `/pablo`. SPA rewrite for Vercel via `vercel.json`.
- **FloatingNav** — pill at ≥600 (logo + 5 link pills), hamburger at <600 (logo + 3-line button).
- **MobileNavMenu** — portal-rendered full-screen overlay, dark navy ground with backdrop-blur, 5 large editorial-type links. Esc / backdrop / link / × all close. Body scroll-locked while open. Reduced-motion respects.
- **Snap-paging** — mouse-primary desktop only via `shouldSnap()` (innerWidth ≥600 AND `(hover: hover)` AND `(pointer: fine)`).
- **Home / Expertise / Approach (closed) / Products / Clients** — all five screens render correctly across viewports. Phone sections are content-tall.
- **ApproachGrid** — desktop expands in-place; phone opens MobileApproachModal. Same state machine.
- **MobileApproachModal** — slide-up panel, sticky header with circular back button, coral icon disc, lead in DM Serif 24px, body, 3 lens sections stacked. Disrupt variant (card #6) goes navy. Swipe-down dismisses.
- **Clients carousel** — auto-rotates, hover-pauses on desktop. (Touch-pause + arrow hide on phone still pending — was deferred from this chunk.)
- **DevicePreview** — bottom-right floating phone-icon button (dev-only, tree-shaken from prod). Opens an iframe at preset device sizes for verification.

## Known gaps / things still to do

- **Carousel touch-pause + swipe** — deferred from the responsive plan; needed so phone users can pause auto-rotation by holding the carousel.
- **PABLO chart sections on phone** — currently still render but the hardcoded 1100×400 viewBox SVGs squash badly at phone widths. Plan calls for a "view on a larger screen" placeholder card on phone for the 4 chart-heavy sections (Decomposition, Test, Lifecycle, Breadth). Not yet implemented.
- **GHG diagram on phone** — currently still renders. Likely should be hidden or shown smaller; defer the call until eyes-on the phone hero+section.
- **Phone landscape special-casing** — sections are content-tall now, so should self-resolve. Eyeball after wider testing.
- **Touch targets** — popover close (Clients) and PABLO pause button still small. Bump to 44×44 next pass.
- **GhgProtocolDiagram.tsx** still carries `// @ts-nocheck` for the SVG2 `isolation` attribute. Rest of codebase passes strict typecheck.

## Next chunk (when Chris is back)

In rough priority order:
1. Carousel touch-pause / swipe support (mobile clients screen).
2. PABLO chart sections phone fallback card.
3. GHG diagram phone treatment decision.
4. Touch target audit (PABLO pause button, popover close).
5. Vercel deploy + custom domain wiring.

## Suggestions (not implemented)

- `.gitattributes` to silence the LF→CRLF commit warnings.
- GitHub Actions: `tsc --noEmit` + `vite build` on every PR.
- Once on Vercel, Lighthouse CI on preview URLs.
- Eventually refactor `pablo-charts.js` into typed ESM chart modules so future React PABLO components can import individual charts.
