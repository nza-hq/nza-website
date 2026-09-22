# Mobile load diagnosis

**Audit:** mobile load — 15s to interactive, preloader logo animation not running (R01, Claude Chat, 21 Sep 2026)
**Investigator:** Co-Work (Claude Code)
**Tier:** 2 — diagnosis. **Read-only. No code changed in this pass.**
**Repo state:** `main` @ `60cd1e7`, clean tree. No active brief.

---

## TL;DR

- The 15s is **cumulative, not a gating bug.** There is no `document.fonts.ready` gate,
  no `animationend` gate, and no ~15000ms timeout anywhere in the preloader. The only
  preloader timer is a **4500ms** auto-dismiss.
- The delay is dominated by **render-critical payload** (268 KB JS + 182 KB CSS, both
  render/parse-blocking) plus a **render-blocking third-party Google Fonts `@import` with
  no preconnect**, and then the **4.5s preloader** stacked on top if the user does not touch.
- The missing logo-fill on mobile is an **independent** fault with **two** code-supported
  candidate causes — iOS "Reduce Motion", or a load-timing/touch-dismiss race — and cannot
  be separated without Chris's actual handset. **Reduce Motion is the 10-second first check.**
- **Not determined here:** throttled-mobile Lighthouse numbers (LCP/TBT/FCP/TTI) and the
  per-phase ms timeline. The tooling in this environment cannot throttle CPU/network or
  emulate a mobile viewport (same limitation R01 hit; unchanged). See "Could not determine".

---

## Verdicts on H1–H4

### H1 — Preloader dismissal gated on `document.fonts.ready` → **KILLED**

The preloader dismisses on a fixed timer plus user input, not on fonts.

- `src/components/LandingPreloader.tsx:40` — `const AUTO_DISMISS_MS = 4500`
- `src/components/LandingPreloader.tsx:118` — `const autoTimer = window.setTimeout(dismiss, AUTO_DISMISS_MS)`
- `src/components/LandingPreloader.tsx:102–106` — dismiss also bound to `wheel`, `touchstart`,
  `touchmove`, `keydown`.
- `dismiss()` (`LandingPreloader.tsx:83–94`) sets `is-dismissed`, flips the singleton and
  emits the event. It **awaits nothing**.

The 3 `document.fonts` references the audit counted in the bundle are **not** in the
preloader — they are in an unrelated width-measuring component:

- `src/components/SlotMachineWord.tsx:145–146` —
  `if (document.fonts && document.fonts.ready) { document.fonts.ready.then(measureAll) }`

Nothing on the preloader's critical path waits on `document.fonts`.

### H2 — Fill animation fails → `animationend` never fires → ~15s fallback → **KILLED**

There is **no `animationend` listener** anywhere in the preloader (grep of `src/`:
`animationend` = 0 matches). Dismissal is not animation-driven at all. The only timers in
the component are:

- the **4500ms** auto-dismiss (`LandingPreloader.tsx:118`), and
- a `requestAnimationFrame` percentage counter (`LandingPreloader.tsx:123–133`) that only
  drives the `000%→100%` text and self-cancels at 100% or on dismiss.

**No timeout of ~15000ms exists.** The reported 15s is not produced by any single timer.

### H3 — The site is simply too heavy → **CONFIRMED as a contributor** (magnitude not measured here)

Render-critical payload, from the **actual current build** (`npm run build`, this session):

| Asset | Encoded | Gzip | Blocking? |
|---|---|---|---|
| `index-*.js` (landing is eager — see below) | **273 KB** | **86 KB** | parse/exec-blocking |
| `index-*.css` (all 8 stylesheets bundled) | **182 KB** | **31 KB** | render-blocking |
| Stolzl OTFs fetched above the fold | ~**220 KB** (4 × ~55 KB) | n/a | `font-display: swap` (non-blocking for text) |
| Google Fonts `@import` (Inter/DM Serif/JetBrains) | third-party | n/a | **render-blocking, serial** — see H5 |

- Landing is **eager**, so its JS is in the 273 KB `index` bundle:
  `src/App.tsx:3` `import { WebsitePage }` (not `lazy`), vs `App.tsx:21–44` where every other
  route is `lazy()`. Code-splitting is already in place for non-landing routes; the landing
  itself is not split.
- The heavy lazy chunks (`ExpertisePage` 171 KB, `ProductPage` 466 KB) are **not** on the
  landing critical path — correctly deferred.
- No `<link rel="preload">` / `preconnect` in `index.html` (confirmed — grep of head = 0).

On a mid-tier phone over mobile data, parsing/executing ~270 KB of JS and fetching+parsing
182 KB of render-blocking CSS before first meaningful paint is a plausible multi-second cost.
**But magnitude is unconfirmed** — no throttled Lighthouse was runnable here (see end).

### H4 — The two splash layers run in series → **CONFIRMED**

They are strictly sequential, and only the second one contains the logo-fill:

1. `#initial-splash` — static, in `index.html:68–88`, inline `<style>` `index.html:23–64`.
   Bobbing dots (`splash-bob`, `index.html:54`) and an 84px mark. **No logo-fill here.**
2. `main.tsx:21–24` removes `#initial-splash` **the instant the JS bundle executes**
   (synchronous, before React renders).
3. `.landing-preloader` (React) then mounts and runs **its own** 2.2s fill
   (`landing.css:135`) plus up to **4.5s** auto-dismiss (`LandingPreloader.tsx:118`), with a
   `transform 1.1s, opacity 0.85s 0.2s` zoom-out (`landing.css:64` region).

So the user sees: `#initial-splash` **for the entire HTML→CSS→JS download+parse window**,
then the React preloader for up to 4.5s on top. The logo-fill only becomes possible in
step 3 — i.e. only after the bundle has finished loading.

---

## New finding

### H5 — Render-blocking third-party Google Fonts `@import`, no preconnect → **CONFIRMED**

- `src/styles/colors_and_type.css:5` —
  `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=DM+Serif+Display:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap');`

This sits at the **top of the bundled CSS** and creates a serial critical-path chain on a
cold mobile connection:

`HTML → 182 KB index CSS (download+parse) → @import discovered → DNS+TLS+fetch to
fonts.googleapis.com (no preconnect) → Google CSS → font files from fonts.gstatic.com`

It also **explains the audit's "62 @font-face" count**: the source has only **6** local
`@font-face` (the 6 Stolzl OTFs, `colors_and_type.css:23–58`). The remaining ~56 come from
the Google Fonts stylesheet, which expands Inter (6 weights × several unicode subsets) + DM
Serif (2) + JetBrains Mono (2) into dozens of `@font-face` rules. DM Serif Display is the
italic-emphasis face (the brand fingerprint, above the fold), so this third-party round-trip
is on the critical path for the hero. Text itself is not blocked (`display=swap`), but the
`@import` request is render-blocking and third-party.

---

## Animation verdict (independent of the 15s)

The fill is **not disabled on mobile by any width/pointer branch**, and the technique is
iOS-safe:

- `landing.css:132–139` — `.landing-mark-fill` animates `clip-path: inset(100% 0 0 0)` →
  `inset(0 0 0 0)` over 2200ms. `clip-path: inset()` is well-supported on iOS Safari. No
  `mask`, no `background-clip`, no animated SVG attribute. No `display:none`, no `matchMedia`
  width gate, no `pointer:coarse` gate.

Two code-supported candidate causes remain, and **the code cannot decide between them**:

**Cause A — iOS "Reduce Motion" is enabled on the phone.**
`landing.css:528–532` — under `@media (prefers-reduced-motion: reduce)`, `.landing-mark-fill`
gets `animation: none; clip-path: inset(0 0 0 0)` — i.e. the mark appears **instantly full,
no fill**. This matches the exact symptom ("fills on desktop, not on mobile") deterministically
*if* the phone has Reduce Motion on and the desktop does not — a very common asymmetry.
**This is the cleanest single explanation of the desktop-yes/mobile-no split.**

**Cause B — load-timing + touch-dismiss race.**
On a slow connection the React preloader mounts late (the user has been watching
`#initial-splash` dots, not the fill, for most of the wait). The dismiss listeners include
`touchstart` **and** `touchmove` (`LandingPreloader.tsx:104–105`, added "for mobile
robustness"). The first touch or scroll gesture calls `dismiss()` immediately, which applies
`is-dismissed` and starts the zoom-out — **cutting the 2.2s fill almost as soon as it starts**.
On desktop the bundle loads fast and nothing is touching, so the fill plays in full.

**Distinguishing test (needs the handset):** check iOS Settings → Accessibility → Motion →
Reduce Motion. If ON → Cause A, and the fill is being skipped *by design*. If OFF → Cause B
(timing/touch) is the likely path.

---

## Root cause

**The 15s has no single root cause — it is cumulative.** In descending likely contribution:

1. Render-critical payload: **273 KB JS + 182 KB CSS**, both blocking, parsed/executed on a
   mobile CPU before the hero can paint (H3).
2. A **render-blocking, third-party, un-preconnected Google Fonts `@import`** inserted at the
   head of that CSS (H5).
3. The **4.5s preloader auto-dismiss** stacked on top of the above, if the user does not touch
   to skip it (H4 + `LandingPreloader.tsx:118`).

There is no font-ready gate (H1) and no 15s fallback timer (H2).

The **missing logo-fill is a separate fault** — most likely iOS Reduce Motion
(`landing.css:528`), alternatively the touch-dismiss race (`LandingPreloader.tsx:104–105`).

---

## Recommended fix path (ordered by impact-per-effort — NOT authorised here)

Each estimate is directional; confirm with the measurement step first.

1. **Preconnect to the font origins** — add
   `<link rel="preconnect" href="https://fonts.googleapis.com">` and
   `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` to `index.html`.
   Removes the cold DNS+TLS from the serial chain. *Effort: trivial. Saving: a full
   third-party handshake off the critical path (~hundreds of ms on mobile).*

2. **Self-host Inter / DM Serif / JetBrains as subsetted `woff2`; drop the `@import`.**
   Kills the third-party render-blocking request entirely and cuts bytes (woff2 ≈ 40–50%
   smaller than otf; latin subset only). *Effort: medium. Saving: one render-blocking
   request + meaningful font bytes.*

3. **Convert the 6 Stolzl `.otf` → `woff2`** (format-only re-encode of the licensed local
   files) and **`<link rel="preload">` the 2–3 above-the-fold weights** so they fetch in
   parallel with CSS rather than after it. *Effort: low–medium. Saving: ~40–50% of the
   ~220 KB font payload + earlier fetch start (currently 112 ms, i.e. post-CSS).*
   Note CLAUDE.md: `public/fonts/` OTFs are licensed assets — re-encoding to woff2 is a
   format change; confirm licence terms permit it before doing so.

4. **Reduce or remove the 4.5s preloader auto-dismiss** (or dismiss as soon as the hero has
   painted). Removes up to 4.5s of forced wait once the payload fixes land. *Effort: trivial.
   Saving: up to 4.5s of perceived wait. Do this after 1–3 so it is not masking the payload.*

5. **Profile and trim the 273 KB eager landing JS** with a bundle visualizer — establish how
   much is React 19 + router baseline vs landing-specific code, and whether anything
   above-the-fold (e.g. `SlotMachineWord`) can defer. *Effort: higher; measure before cutting.*

6. **Defer/again-check the client-logo SVGs** (138 KB, incl. a 59 KB
   `cardiff-metropolitan-university.svg`). They are below the fold (clients carousel); ensure
   they are not eagerly fetched on first paint. *Effort: low. Saving: bytes off the initial
   fetch if any are currently eager.*

**Animation (separate, once cause known):**
- If **Cause A (Reduce Motion)**: decide policy — honouring the setting is arguably correct;
  if the fill must always play, it would need to opt out of the reduced-motion branch
  (`landing.css:528`), which trades off against the accessibility intent.
- If **Cause B (race)**: delay the touch/scroll dismiss until the fill has had a beat, or run
  the fill inside `#initial-splash` so it is visible during the real load window rather than
  only after React mounts.

---

## Could not determine (explicit)

- **Throttled-mobile Lighthouse (LCP, TBT, FCP, TTI, critical request chain).** The browser
  tooling in this environment cannot throttle CPU or network, and mobile-viewport emulation is
  unreliable here (the same limitation R01 documented; unchanged this session). H3's magnitude
  is therefore reasoned from payload facts, not measured. **This is the number that decides
  whether H3 is the whole story — run it on WebPageTest (mobile/4G profile) or Lighthouse
  mobile against `https://netzeroadvisory.uk`, or on Chris's handset.**
- **The per-phase ms timeline** (`#initial-splash` removed · React mounted · `fonts.ready` ·
  `is-dismissed` · preloader off-screen · first interaction). Same tooling limit. The *order*
  is established from code (above); the *durations* need a throttled profile on a real device.
- **Which animation cause (A or B) is active on Chris's specific phone.** Needs the handset —
  check Reduce Motion first.

---

## Escalation note

Per the audit's escalation triggers: the 15s could **not** be reproduced on a throttled mobile
profile in this environment, so — as instructed — this reports the code-level causes plainly
rather than inventing a measured number. No fallback timeout near 15000ms exists (checked and
reported). The remaining unknown (H3 magnitude, and A-vs-B for the animation) needs a real
handset / throttled run, which is the authorised next step before any fix.

---

## Addendum (22 Sep 2026) — H6: the blank sheet is the cream preloader itself

After fixes 1, 2 (Adobe + Google via preload), 4 (non-blocking app CSS, script at body end,
static splash) and 6 (CSS code-split) had landed, the fault persisted **only on phones**
(Chris's iPhone, private tab included; his partner's iPhone; Ben's phone in both Safari and
Chrome) while laptops were fine, and the iPad went "blank until I touched it". That pattern -
engine-agnostic, phone-only, cleared by a touch - is not a payload problem.

**H6 — CONFIRMED by code reading, pending on-device confirmation.** Sequence on a phone:

1. Static `#initial-splash` paints (the "tiny logo" Chris sees).
2. React mounts and removes the splash; `LandingPreloader` renders a **full-viewport cream
   sheet** (`--paper`, reads as "blank white" on a phone).
3. The preloader carries 4 `.landing-blob` layers and the hero beneath it up to 9 more: each a
   480px box with `filter: blur(110px)` + `will-change: transform`, animated forever, plus the
   sticky nav's full-width `backdrop-filter: blur(12px) saturate(170%)`. On a phone GPU this
   stalls the compositor, so the mark fill, counter and wordmark never paint. The user sees
   plain cream.
4. The sheet leaves only when the 4.5s auto-timer fires (late - the main thread is jammed by
   the same layers) or a `touchstart` / `touchmove` calls `dismiss()`
   (`LandingPreloader.tsx:104-105`) - exactly the iPad "until I touched it".

**Fix shipped (touch devices only, `(hover: none), (pointer: coarse)`):**
- `LandingPreloader` skipped entirely via `isTouchDevice()` (`src/lib/preloaderState.ts`); the
  hero shows the moment React mounts. Desktop keeps the full sequence.
- `.landing-blob { display: none }` (`landing.css`).
- `.site-nav { backdrop-filter: none }` (`site-nav.css`).
- Belt and braces: `main.tsx boot()` flips `#app-css` to `rel=stylesheet` itself if the preload
  `onload` never fired.

Verified in the browser pane under touch emulation: no `.landing-preloader` in the DOM, hero
headline at opacity 1 with all six `MaskReveal`s fired, body scroll not locked, no console
errors; under desktop: preloader present with scroll lock, blobs and nav blur unchanged.
Bundle at this point: 87 KB gzip JS, 21 KB gzip CSS, routes lazy - so the "compress / lazy
load" suggestion from Ben was already in place and not the cause.

**If it still blanks on a phone after this**, the remaining animated layers on the mobile
first paint are `SlotMachineWord` / `CharacterMorph` in the hero and the client carousel's
`will-change: transform` track. Gate them with the same touch-device rule.
