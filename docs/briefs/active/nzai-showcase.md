# Brief — NZ:AI page restructure: from process to proof

**Repo:** `nza-hq/nza-website`
**Mode:** Product (full ceremony per the NZA Development Bible)
**Author:** Claude Chat, 11 September 2026
**Authorised by:** Chris Scott
**Revision:** R01

---

## BEFORE DOING ANYTHING

- [ ] Read this brief in full. Confirm receipt by quoting its title and first paragraph back.
- [ ] Read `CLAUDE.md` and `STATUS.md`.
- [ ] Run session-start reconciliation: `ls docs/briefs/active/` · `cat docs/briefs/current.md` · `tail -30 STATUS.md` · `git log --oneline -20`. If `active/` holds a different brief, STOP and surface it.
- [ ] Confirm clean tree and `origin` in sync.
- [ ] Read these files before editing any of them:
  - `src/data/products/nzaiConfig.tsx`
  - `src/components/product/ProductStepsSection.tsx`
  - `src/components/product/ProductIllustrations.tsx`
  - `src/styles/product-page.css` (the `.product-steps-*` block, roughly lines 800–1010)
- [ ] **Check whether the landing screens 2–3 brief has been completed.** If it is still in `docs/briefs/active/`, finish that one first — this brief assumes it is done.
- [ ] Land this brief at `docs/briefs/active/nzai-showcase.md` as Part 1's first commit.

---

## Goal

The NZ:AI page currently explains a three-stage process — Decode, Build, Partner. That same process now lives on the landing page, told better and more briefly. Meanwhile the page that is supposed to prove NZA can build things shows nothing it has built.

This brief replaces the three process stages with four showcase items, each carrying a short video of a real tool. The page stops explaining and starts showing.

---

## Why this — intent, not just instructions

**The page had a structural asymmetry.** PABLO and decodED both put their product in the steps slot — five steps showing what the software does. NZ:AI put methodology there. So the page never showed anything, and no amount of copy could fix that.

**The three stages are not being deleted from the site, only from this page.** Decode / Build / Partner is now the landing page's screen 2, at ~38 words per phase. Keeping a 50–60 word version here as well means a visitor who arrives via the homepage reads the same three beats twice in slightly different words. The manifesto retains a single-sentence trace of the arc so someone landing directly on `/nz-ai` still gets the shape.

**The four items are ordered to widen the frame at each step:** one document → one dataset → one estate → many years. Each makes the previous look small. Item 04 lands on duration, which hands into the closer's partnership argument.

**Living reports leads deliberately, despite being the least spectacular visual.** Everyone has a report and everyone's is dead, so it is the item with the widest recognition. Its video has to work harder than the others — it must show the report being *used*, not read, and end on the PDF export.

**There is no sign-off or summary section between the showcase and the closer.** An earlier draft had one; it was cut. Four visibly different tools make the bespoke argument themselves, and PABLO and decodED both go straight from steps to closer. Do not add a summary band.

**Show the interface, never the insight.** Every video shows a tool working. None shows a real client's numbers. This is a commercial constraint, not an aesthetic one.

---

## Scope

### IN

- `/nz-ai` hero: new tagline and one-liner.
- `/nz-ai` manifesto: new body. Headline unchanged.
- `/nz-ai` transition line: new leading text.
- **Replace three process steps with four showcase items**, each backed by a video.
- Video support in `ProductStepsSection` — a new visual type alongside the existing SVG illustrations.
- Placeholder assets so the section is fully verifiable before any real video exists.
- `/nz-ai` closer: new headline and body. Case studies unchanged.
- `STATUS.md` after every Part.

### OUT — do not touch

- The PABLO and decodED pages, and their configs. They keep SVG illustrations.
- `ProductIllustrations.tsx` — existing concepts stay exactly as they are. PABLO and decodED depend on them.
- The scrollytelling mechanics: pinned frame, cross-fade timings, the 150vh step runway, the 800ms/600ms visual-vs-text offset. These were tuned in `docs/briefs/nza-scrollytelling-pacing-brief.md`. Do not retune.
- The manifesto headline "Climate action is an *inside* job." Unchanged — it finally has evidence beneath it.
- The three case studies in the closer (EOC, Royal Wimbledon, Molson). Unchanged.
- The hero screens carousel (`nzai-map.png` etc). Out of scope for this brief.
- `colors_and_type.css`, `nza-website.css`.
- The landing page. Separate brief.

---

## Design decisions already agreed

Resolved. Do not reopen.

1. **Keep the existing pinned-frame scrollytelling pattern.** One sticky frame on the right, visuals cross-fading as each step becomes active. Do NOT build alternating left/right rows — that would break the pinned frame and diverge from the sibling pages.
2. **Four items, not three.**
3. **Order is fixed:** Living reports → Live carbon inventory → Estate intelligence → Performance tracking.
4. **Videos are square, 1:1.** See the asset spec below.
5. **Play once when the step becomes active, then hold the final frame.** Not a continuous loop.
6. **No sign-off or summary section.**
7. **Case studies stay where they are, unchanged.**
8. **Build with placeholders first.** The layout must be verifiable before real footage exists.

---

## Asset specification — video

Derived from the real frame dimensions; these are not arbitrary.

**Why square.** The desktop frame (`.product-steps-frame-col`) is sticky at `height: 76vh` with the illustration inset 60px. At a 1440×900 viewport the usable area is approximately **487 × 490px** — effectively square. The mobile inline slot (`.product-step-inline-illustration`) is `aspect-ratio: 1 / 1` exactly. Square is the only ratio that fits both without letterboxing.

**Spec for all four recordings:**

| Property | Value |
|---|---|
| Aspect ratio | 1:1 (square) |
| Source resolution | 1080 × 1080 |
| Duration | 6–10 seconds |
| Format | MP4 (H.264) **and** WebM (VP9) |
| Audio | None — strip the track entirely |
| File size | Under 1.5 MB per file per format |
| Final frame | Must be a meaningful still — it persists after playback |

**Filenames** (exact — the config references these):

```
public/videos/nzai/01-living-reports.mp4   + .webm
public/videos/nzai/02-carbon-inventory.mp4 + .webm
public/videos/nzai/03-estate-intelligence.mp4 + .webm
public/videos/nzai/04-performance-tracking.mp4 + .webm
```

**Poster frames** (first frame, JPEG, 1080×1080, under 200KB):

```
public/videos/nzai/01-living-reports-poster.jpg
public/videos/nzai/02-carbon-inventory-poster.jpg
public/videos/nzai/03-estate-intelligence-poster.jpg
public/videos/nzai/04-performance-tracking-poster.jpg
```

**Shot list — for Chris's recording, not for Claude Code to build:**

- **01 Living reports** — a report scrolling; a chart responds to an input change; a section expands to reveal detail; ends on the PDF export animating out. Show it being *used*, not read.
- **02 Live carbon inventory** — bars load by scope; one highlights; morphs into a flowing Sankey; a click expands a branch; drills to supplier level.
- **03 Estate intelligence** — UK map with site pins; zoom to one site; 2D estate plan; click a building; interior spaces with data attached.
- **04 Performance tracking** — score bars climb across years; an action list populates; names assign to actions; a target line is met.

**Anonymisation — mandatory before any recording ships:**

- No client logos, names, or identifying branding anywhere in frame.
- No third-party framework marks (including GRESB's).
- Item 04: shift the years and round the scores. A real trajectory in a known sector identifies the client even without a logo.
- Show the interface working; never a real client's numbers.

---

## Part 1 — Land the brief and scaffold placeholders

**Steps**

1. Save this brief to `docs/briefs/active/nzai-showcase.md`; repoint `current.md`.
2. Create `public/videos/nzai/`.
3. Generate eight placeholder assets at the exact filenames above — four MP4/WebM pairs and four poster JPEGs. A 1080×1080 solid mid-grey card, 8 seconds, with the item number and title rendered in the centre is sufficient. These exist purely so the layout can be built and verified; they will be replaced.
4. Add `docs/videos-nzai-README.md` recording the asset spec table and shot list from this brief, so whoever records the real footage has it without reading the brief.

**Files:** `docs/briefs/active/nzai-showcase.md`, `docs/briefs/current.md`, `public/videos/nzai/*`, `docs/videos-nzai-README.md`, `STATUS.md`

**Commit:** `chore: land nzai showcase brief, scaffold video placeholders`

**Done when:** all eight placeholder assets exist at the exact paths, and the README carries the spec.

---

## Part 2 — Video support in ProductStepsSection

The component currently renders `<ProductIllustration concept={step.illustrationConcept} />` in two places: the shared pinned frame (desktop) and the inline block (mobile). Add a video path alongside it without disturbing the SVG path.

**Steps**

1. Extend the step type so a step declares **either** `illustrationConcept` (existing, SVG) **or** a new `video` object:
   ```
   video: {
     mp4: string
     webm: string
     poster: string
     alt: string
   }
   ```
2. Create `src/components/product/ProductStepVideo.tsx`. It renders a `<video>` with `muted`, `playsInline`, `preload="metadata"`, the poster, and both sources. It does NOT loop.
3. Playback behaviour: when the step becomes active, play from the start. When it becomes inactive, pause. On re-entry, restart from the beginning. After playback ends, the final frame persists — do not reset to poster.
4. Under `prefers-reduced-motion: reduce`, never autoplay. Render the poster frame as a static image instead.
5. In `ProductStepsSection`, branch on which field the step declares. PABLO and decodED steps declare `illustrationConcept` and must follow the existing code path untouched.
6. Style the video to fill the frame's inset area: `width: 100%`, `height: 100%`, `object-fit: contain`, `border-radius` matching the existing illustration treatment.

**Files:** `src/components/product/ProductStepVideo.tsx`, `src/components/product/ProductStepsSection.tsx`, `src/styles/product-page.css`, `STATUS.md`

**Commit:** `feat: video visual type for product step sections`

**Done when:** `/pablo` and `/decoded` render exactly as before, and a step declaring a `video` renders a playing video in the pinned frame.

---

## Part 3 — NZ:AI copy above the showcase

All copy verbatim.

**Hero tagline** — replaces "Net zero, built as a partnership.":

> Intelligence you own.

**Hero one-liner** — replaces the current 58-word paragraph:

> Carbon and climate intelligence, built for your organisation and owned by it. Here's what that looks like.

**Manifesto body** — headline unchanged, body replaced:

> Real progress on net zero comes from the people inside your organisation — the ones with the relationships, the knowledge, and the context to act. They need the data in front of them, in a form they can use. NZ:AI puts it there. These are four of the tools we've built.

**Transition leading text** — replaces "Let's show you how":

> Let's show you what

so the line reads: *Let's show you what* **[Request Demo]** *we've built*. Update the trailing text accordingly — it currently reads "NZ:AI works" and must become "we've built".

**Steps**

1. Update the four strings in `nzaiConfig.tsx`.
2. Delete the AI-mention-budget comment block at the top of the steps array. It tracked mentions in copy that no longer exists.

**Files:** `src/data/products/nzaiConfig.tsx`, `STATUS.md`

**Commit:** `copy: nzai hero, manifesto and transition`

**Done when:** the new strings render and no stale budget comment remains.

---

## Part 4 — Replace three stages with four showcase items

**Delete** the existing three steps entirely — `decode`, `build`, `partner`, including their `iconName` and `illustrationConcept` fields.

**Replace with** these four. Each uses the existing `headlinePrefix` / `highlightedVerb` / `headlineSuffix` pattern so the verb picks up `.step-verb` accent colouring.

**01**
- number: `01`
- headlinePrefix: `Your report, `
- highlightedVerb: `alive`
- headlineSuffix: `.`
- body: `Most carbon reports are read once and filed. This one runs on live data, responds to the questions you ask it, and updates as the year goes on. When the board needs a document, it still prints to one.`
- video: `01-living-reports` set, alt `An interactive carbon report responding to input changes and exporting to PDF`

**02**
- number: `02`
- headlinePrefix: `Every tonne, `
- highlightedVerb: `traced`
- headlineSuffix: `.`
- body: `A full Scope 1, 2 and 3 inventory you can interrogate rather than read. Follow an emission from a headline figure down to the individual supplier behind it, and watch the picture change as your data improves.`
- video: `02-carbon-inventory` set, alt `A carbon inventory morphing from bar chart to Sankey diagram and drilling to supplier level`

**03**
- number: `03`
- headlinePrefix: `Your whole estate, `
- highlightedVerb: `in one place`
- headlineSuffix: `.`
- body: `Energy, water, waste, carbon and climate risk for every site you run, in a single view. Start with the portfolio, end up inside a single room — and everything your team knows about that room sits alongside it.`
- video: `03-estate-intelligence` set, alt `A map zooming from a national portfolio view into a single building's interior spaces`

**04**
- number: `04`
- headlinePrefix: `Progress you `
- highlightedVerb: `can see`
- headlineSuffix: `.`
- body: `Year-on-year performance against the frameworks you report into, with the actions that drive it assigned to the people responsible. The tool holds the record, so improvement is something you manage rather than reconstruct.`
- video: `04-performance-tracking` set, alt `Performance scores climbing year on year with actions assigned to team members`

**Steps**

1. Replace the steps array.
2. Confirm the frame handles four panels. PABLO and decodED already run four, so this should need no change — verify rather than assume.
3. Grep for `decode-connection-forming-network`, `build-morphing-platform-outputs` and `partner-compounding-rings`. If they are referenced only by NZ:AI, remove those concepts from `ProductIllustrations.tsx`. **If any other config references them, leave them alone.** Report which you found.

**Files:** `src/data/products/nzaiConfig.tsx`, possibly `src/components/product/ProductIllustrations.tsx`, `STATUS.md`

**Commit:** `feat: replace nzai process stages with four showcase items`

**Done when:** four items render in order, each cross-fading its video into the pinned frame.

---

## Part 5 — Closer

**Headline** — replaces "Let's work out if it's the right fit.":

> Start with a conversation.

**Body** — replaces the "Half an hour…" paragraph:

> Most organisations are sitting on better data than they realise. We decode it, build the tools that make it usable, and stay alongside your team as both improve.

Case studies unchanged — do not touch EOC, Royal Wimbledon or Molson.

**Files:** `src/data/products/nzaiConfig.tsx`, `STATUS.md`

**Commit:** `copy: nzai closer`

---

## Part 6 — Verification and close

1. Verify at 1440, 1280, 1024, 768, 600, 414, 375 px via DevicePreview.
2. Confirm PABLO and decodED are visually unchanged — this is a regression check on shared components, not a formality.
3. Throttle to Fast 3G in DevTools and confirm the page is usable while videos load.
4. `npm run build` clean.
5. `STATUS.md` updated; brief moved to `docs/briefs/archive/nzai-showcase_COMPLETED.md`; `current.md` repointed; close commit pushed.

**Commit:** `close: nzai showcase restructure complete`

---

## Verification — non-negotiable, falsifiable

**NZ:AI page**

- [ ] Hero tagline reads "Intelligence you own."
- [ ] Hero one-liner is 17 words. Count them.
- [ ] Manifesto headline still renders "inside" as DM Serif italic in coral.
- [ ] Transition reads "Let's show you what **[Request Demo]** we've built".
- [ ] Exactly four showcase items, in the order Living reports, Carbon inventory, Estate intelligence, Performance tracking.
- [ ] Each item's verb renders in the NZ:AI accent (`#0F9888`), not italic.
- [ ] Scrolling to item 01 starts its video from frame 0. Scrolling to 02 pauses 01 and starts 02. Scrolling back to 01 restarts it from frame 0. Confirm each transition individually.
- [ ] After a video finishes, its final frame persists. It does not loop and does not revert to the poster.
- [ ] No audio plays at any point.
- [ ] There is no sign-off or summary section between the showcase and the closer.
- [ ] Closer headline reads "Start with a conversation."
- [ ] Three case studies still expand on click: EOC, Royal Wimbledon, Molson.

**Regression — shared components**

- [ ] `/pablo`: five steps, SVG illustrations, cross-fades identical to before. Screenshot against the pre-change state.
- [ ] `/decoded`: five steps, SVG illustrations, unchanged. Screenshot.
- [ ] Neither page emits a console error relating to video.

**Responsive**

- [ ] At 1440px the pinned frame holds position through all four steps.
- [ ] At 414px the pinned frame is hidden and each step shows its own inline video in a 1:1 slot.
- [ ] No video overflows its container at any tested width.

**Motion and performance**

- [ ] `prefers-reduced-motion: reduce`: no video autoplays; poster frames render as static images.
- [ ] On Fast 3G the page is scrollable and readable while videos load; posters appear before footage.

---

## What MUST NOT happen

- Do not reword any copy in this brief.
- Do not build alternating left/right rows. The pinned frame is the pattern.
- Do not add a sign-off, summary or "what these have in common" section.
- Do not loop the videos.
- Do not add audio, or leave an audio track in a placeholder.
- Do not retune the scrollytelling pacing, the 150vh runway, or the 800/600ms offsets.
- Do not modify how PABLO or decodED render their steps.
- Do not remove any illustration concept that another config still references.
- Do not touch the manifesto headline, the hero carousel, or the three case studies.
- Do not put real client logos, names, or real figures in any placeholder.
- Do not run `npm install`. If video handling seems to need a library, it does not — use the native `<video>` element.
- Do not force-push or `git reset --hard`.

---

## When to escalate and stop

- The pinned frame cannot hold four video panels without a mechanics change.
- Adding the video path causes any visible change on `/pablo` or `/decoded`.
- Video autoplay is blocked by a browser even when muted and `playsInline`.
- Placeholder videos push the page past a usable load time, suggesting the 1.5MB budget is wrong — report the numbers rather than adjusting the spec.
- Any copy string appears wrong or contradicts the landing page.
- Three approaches tried on one problem.

---

## Independent review trigger

**Mandatory.** This brief modifies `ProductStepsSection`, which all three product pages share, and correctness on the two pages *not* being changed is invisible unless someone looks. Claude Chat reads the diff on GitHub against this brief's intent before merge, with particular attention to the branch between the SVG and video paths.

---

## Close

1. `STATUS.md`: completed Parts, final SHA, current state, next steps, known issues — including that placeholder videos are still in place.
2. Brief archived; `current.md` repointed; close commit pushed.
3. Final report: what was built, verification evidence with numbers, any divergence and why, anything worth proposing to the Lessons database.

---

## The spec-is-the-prompt test

This brief carries every final copy string verbatim, the exact asset spec derived from measured frame dimensions, exact filenames the config expects, the placeholder strategy that lets the work complete before footage exists, the reasoning behind keeping the pinned frame, and explicit regression criteria for the two pages not being changed.

If this conversation were deleted, the brief builds correctly on its own.

---

## Open question for Chris — not blocking

The new copy contains **zero substantive mentions of AI**. The old page had four; the brand name and the eyebrow ("NET ZERO ADVISORY + INTELLIGENCE") are now the only AI signals on the page.

That may be exactly right — the four tools demonstrate the capability rather than claiming it, and the previous copy was flagged for overuse. But it is a change worth making deliberately rather than by omission. If one mention is wanted, the natural home is the manifesto's third sentence.
