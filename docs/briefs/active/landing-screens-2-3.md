# Brief — Landing page: screens 2 and 3 restructure

**Repo:** `nza-hq/nza-website`
**Mode:** Product (full ceremony per the NZA Development Bible)
**Author:** Claude Chat, 11 September 2026
**Authorised by:** Chris Scott
**Revision:** R01

---

## BEFORE DOING ANYTHING

Work through this list in order. Do not write code until every box is ticked.

- [ ] Read this brief in full. Confirm receipt by quoting its title and first paragraph back.
- [ ] Read `CLAUDE.md` in the repo root.
- [ ] Read `STATUS.md` — note the last completed chunk and its SHA.
- [ ] Run session-start reconciliation: `ls docs/briefs/active/` · `cat docs/briefs/current.md` · `tail -30 STATUS.md` · `git log --oneline -20`. If `active/` holds a different brief or `current.md` claims one, STOP and surface it before any work.
- [ ] Confirm a clean working tree (`git status`) and that `origin` is in sync (`git fetch && git status`).
- [ ] Read the three files this brief touches before editing any of them:
  - `src/screens/HowWeWorkSection.tsx`
  - `src/screens/ProductsScreen.tsx`
  - `src/styles/landing.css` (the `.how-we-work-*` block, roughly lines 780–1200)
- [ ] Land this brief on disk at `docs/briefs/active/landing-screens-2-3.md` as Part 1's first commit.

---

## Goal

The landing page is four screens: hero → coral "how we work" → cream "our solutions" → navy "get in touch". Screen 2 is carrying four separate ideas and one of its sentences duplicates screen 3's intro almost word for word. This brief reduces screen 2 to two ideas, rewrites both screens' copy, and restructures screen 2's layout from a two-column grid into a full-width vertical sequence.

The outcome: screen 2 owns the partnership story and tells it as a progression; screen 3 stops restating that story and becomes a short handoff into the three solution cards.

---

## Why this — intent, not just instructions

Read this section before touching the Parts. If anything in the Parts is ambiguous, resolve it in the direction this section points.

**Screen 2 was doing too much.** It asserted who NZA is, what NZA does, that there is a process, and what the process is — four ideas on one panel. The new copy carries two: an opening line, and the three phases.

**One sentence was duplicated across consecutive screens.** Screen 2 said "build the tools your people need to act on it". Screen 3's intro said "building the tools that let your own people see it, own it, and act on it". Ten seconds apart. Screen 2's version is cut; screen 3's intro is replaced entirely.

**Screen 2's three phases are SEQUENTIAL. Screen 3's three cards are PARALLEL.** This is the reasoning behind the layout change and it matters more than any other decision here. Decode leads to Build leads to Partner — one path, in order. PABLO / NZ:AI / decodED are three alternatives — you pick your way in. A three-across grid reads as "choose one of these", which is right for screen 3 and wrong for screen 2. A vertical stack reads as "this, then this, then this", which is right for screen 2.

So screen 2 becomes a full-width vertical sequence and screen 3 keeps its triptych. The two screens look different because they mean different things — not merely to avoid visual repetition.

**There is also a hard constraint.** `.how-we-work-page-right` is capped at `max-width: 460px` and the current phase bodies run 12–16 words. The new bodies run roughly 38 words each. Three of those stacked in a 460px column, set against a single short sentence in the left column, would be badly unbalanced. The existing two-column layout only worked because the copy was very short. It cannot survive the new copy.

**The click-to-expand idea was considered and rejected.** An earlier plan hid the phase bodies behind a click. Chris dropped it: the copy is short enough to sit on the page, and hiding it would orphan the three visual animations, which were built to be seen. If the section reads heavy once live, the fix is cutting the third sentence from each phase — NOT adding an interaction.

**The coral panel's parallax entry is a set piece and stays.** The hero is `position: sticky` inside `.hero-coral-stack` so the coral panel rises over it. That behaviour is untouched. The only change is that the coral panel becomes taller than one viewport, because the sequence scrolls below the held opening line.

---

## Scope

### IN

- Screen 2 (`HowWeWorkSection`): new copy, layout restructure from two-column grid to full-width vertical sequence, phase visuals scaled up.
- Screen 3 (`ProductsScreen`): new heading, new intro, three new card promises, card order changed to NZ:AI → PABLO → decodED.
- `CLAUDE.md`: two factual corrections (see Part 1).
- `STATUS.md`: updated at the end of every Part.

### OUT — do not touch

- The hero (`HomeScreen`) and its rotating words. Unchanged.
- "Get in touch" (`GetInTouchScreen`). Unchanged.
- `/pablo`, `/nz-ai`, `/decoded` product pages. A separate brief covers the NZ:AI restructure.
- `/expertise`, `/approach`, `/about`, `/clients` routes and `SiteNav`. Unchanged.
- The parallax mechanics in `.hero-coral-stack` / `.how-we-work-page-pin`. Do not retune the lock beat or runway.
- The three phase SVG animations in `HowWeWorkVisuals.tsx` — their internal keyframes, timings and element structure. You may change only the rendered box size, via CSS.
- `src/styles/colors_and_type.css` and `src/styles/nza-website.css` — locked design system.
- The card hover/activation interaction in `ProductsScreen` (the two-half bounding-box draw, silhouette-to-colour fade, accent colours). Copy and order change; interaction does not.

---

## Design decisions already agreed

These are resolved. Do not reopen them or offer alternatives.

1. **Screen 2 layout is a full-width vertical sequence.** Not a triptych, not two columns.
2. **The opening line is held full-screen**, occupying roughly the first viewport of the coral panel, as the current left column does.
3. **The three phases scroll below it** as full-width rows: text left, visual right.
4. **Visual side stays consistent — always right.** Do not alternate. Alternating implies equal-weight showcase items; consistent implies an ordered sequence.
5. **Phase visuals scale from 60px to 110px** at desktop. They are SVG, so there is no quality cost.
6. **"Every engagement follows three phases" is deleted.** It announces a list instead of being one.
7. **Screen 3 keeps its three-across triptych** and its existing card interaction.
8. **Card order becomes NZ:AI → PABLO → decodED.** NZ:AI is the general case; the other two are specialisations of it.
9. **No click-to-expand anywhere in this brief.**

---

## Principles and constraints

- **Mobile-first.** Build the single-column layout first, layer the desktop arrangement on at `min-width: 600px`. Default new `@media` queries to `(max-width: 599px)`.
- **Existing breakpoint discipline.** The `.how-we-work-*` block currently breaks at `1023px`. Keep that boundary for this component rather than introducing a new one.
- **Italic emphasis pattern is untouchable.** Any `<em>` renders DM Serif Display italic in coral, 1.10–1.15em.
- **Copy is verbatim.** Every string in this brief is final and signed off. Do not reword, do not "improve", do not fix what looks like a missing Oxford comma. If a string appears wrong, escalate rather than edit.
- **Touch targets ≥44px on phone** for anything interactive.
- **`prefers-reduced-motion: reduce`** short-circuits all animation to its final state.
- **Delete before you write.** When a class or string is replaced, remove the old one in the same commit. Grep for references before you finish each Part.
- **No `npm install`.** If a dependency seems necessary, escalate — it almost certainly is not for this work.

---

## Part 1 — Land the brief and correct CLAUDE.md

**Steps**

1. Save this brief to `docs/briefs/active/landing-screens-2-3.md`.
2. Update `docs/briefs/current.md` to point at it.
3. In `CLAUDE.md`, make exactly two corrections:
   - The GitHub URL is stale. It reads `https://github.com/chrisscott06/nza-website`. The repo has moved to `https://github.com/nza-hq/nza-website`.
   - The opening description reads "Five-screen editorial single-page site (Home, Expertise, Approach, Products, Clients) plus a PABLO product page." That is stale on both counts. Replace with: "Four-screen editorial landing page (Home, How we work, Our solutions, Get in touch) plus product pages at /pablo, /nz-ai and /decoded. Expertise and Approach are off-flow routes reached from the nav."
4. Do not make any other CLAUDE.md edit in this Part.

**Files:** `docs/briefs/active/landing-screens-2-3.md`, `docs/briefs/current.md`, `CLAUDE.md`, `STATUS.md`

**Commit:** `docs: land landing screens 2-3 brief, correct stale CLAUDE.md facts`

**Done when:** the brief is on disk, `current.md` points at it, and CLAUDE.md names the correct repo and the correct screen count.

---

## Part 2 — Screen 2 copy

All copy below is final.

**Opening line** — replaces the current three elements (the "We are specialists…" line, the "We cut through the complexity…" line, and "Every engagement follows three phases."):

> Specialists in buildings, energy and climate, with one way of working: alongside your team, in tools you own.

**Phase 01 — Decode**

> We begin with what your organisation already holds — knowledge and data alike, much of it undocumented. We work alongside your team to uncover it, structure it, and establish what is solid enough to act on.

**Phase 02 — Build**

> What we build follows from what we find. The form varies; the principle does not. One place your information lives, open to everyone who needs it, and built to be added to rather than just read.

**Phase 03 — Partner**

> The tool is yours, along with the data and the method behind it. We stay to keep it valuable — refining it as your information improves, widening it as more of your organisation comes to rely on it.

**Steps**

1. Replace the copy in `HowWeWorkSection.tsx`.
2. Delete the phases-intro element entirely — both the JSX and the `.how-we-work-page-phases-intro` CSS rule, including its long explanatory comment block.
3. Keep phase names, numbering and the existing reveal-stagger mechanism.
4. Grep for `phases-intro` across `src/` and remove every reference.

**Files:** `src/screens/HowWeWorkSection.tsx`, `src/styles/landing.css`, `STATUS.md`

**Commit:** `copy: screen 2 opening line and three phase bodies`

**Done when:** the new strings render, no reference to the deleted intro remains anywhere in `src/`, and the dev server boots with a clean console.

---

## Part 3 — Screen 2 layout restructure

This is the substantial Part. Read the "Why this" section again before starting.

**Current structure**

`.how-we-work-page-grid` is `grid-template-columns: 1.05fr 1fr` with `gap: 96px` and `align-items: center`. The left column holds the paragraphs; the right column (`max-width: 460px`) holds the phases-intro plus three `.how-we-work-phase-block` elements, each itself a `1fr auto` grid with a 60px visual.

**Target structure**

- The two-column grid is removed. The section becomes a single full-width column.
- The opening line sits alone in the first viewport of the coral panel, vertically centred, at its current type scale (`clamp(26px, 2.8vw, 36px)`, `--font-display`, white).
- Below it, the three phase blocks stack as full-width rows.
- Each row: text left, visual right, using the existing `1fr auto` internal grid.
- Row content is constrained to the same `max-width: 1280px` / `padding: 0 48px` frame as the current grid, so the left edge of body text still aligns with the NZA logo in the nav. This alignment is deliberate and must survive.
- The hairline separator above each block (the `::before` pseudo-element that draws left-to-right) stays, and now spans the full row width. It reads more strongly at full width, which suits a sequence.
- Phase visuals: 110px at desktop, 72px below 1023px, 64px below 600px.
- Phase body type stays at its current size. Constrain the text column to `max-width: 680px` so a 38-word paragraph does not run to an uncomfortable measure at wide viewports.
- The coral panel is now taller than one viewport. Remove any height cap that would clip it, but do not alter the sticky-hero parallax wrapper.

**Phone (<600px)**

- Single column throughout.
- Visual sits ABOVE its phase heading, left-aligned, at 64px.
- Row order: visual, then `01 Decode`, then body.
- Hairline separators retained between rows.

**Steps**

1. Restructure the JSX in `HowWeWorkSection.tsx`: opening line and phase sequence become siblings, not grid columns.
2. Rewrite the `.how-we-work-*` layout rules in `landing.css`.
3. Delete `.how-we-work-page-grid`, `.how-we-work-page-left` and `.how-we-work-page-right` along with their media queries, once nothing references them. Grep first.
4. Preserve the reveal-stagger: each block's `--reveal-delay` and the 600ms visual-start offset are unchanged.
5. Verify the parallax entry still behaves — the hero must still be overlaid by the rising coral panel.

**Files:** `src/screens/HowWeWorkSection.tsx`, `src/styles/landing.css`, `STATUS.md`

**Commit:** `layout: screen 2 becomes a full-width vertical sequence`

**Done when:** the opening line holds the first viewport, three full-width rows scroll below it, visuals render at 110px desktop, no dead CSS remains, and the parallax entry is unchanged.

---

## Part 4 — Screen 3 copy and card order

**Heading** — replaces "Our solutions":

> Where it starts

**Intro** — replaces "Different challenges call for different answers. Each of these moves organisations forward on net zero — explore where you fit.":

> Three ways in, depending on what you need first.

**Cards** — reorder the `PRODUCTS` array in `ProductsScreen.tsx` to NZ:AI, PABLO, decodED, and set these promises. Questions for PABLO and decodED are unchanged.

**01 — NZ:AI**
- question: `Want net zero tools built around your organisation?`
- promise: `Built around your organisation, whatever shape the problem takes.`

**02 — PABLO**
- question: `Want to cut your electricity costs?` *(unchanged)*
- promise: `When the problem is energy: what it costs, and what to do about it.`

**03 — decodED**
- question: `Running climate action in education?` *(unchanged)*
- promise: `Built for education, and free for every institution.`

**Steps**

1. Update heading and intro strings.
2. Reorder the `PRODUCTS` array and update the three promises plus NZ:AI's question.
3. Update the stale code comment above `PRODUCTS` — it currently explains the July 2026 PABLO-first ordering. Replace with: "Order per Chris (September 2026): NZ:AI / PABLO / decodED — NZ:AI is the general case, the other two are specialisations of it."
4. Confirm `logoSrc`, `alt`, `href` and per-product accent colours still map to the correct product after reordering. The accent colours are PABLO orange, NZ:AI teal, decodED green — verify each card still draws its own colour and not its neighbour's.

**Files:** `src/screens/ProductsScreen.tsx`, `STATUS.md`

**Commit:** `copy: screen 3 heading, intro and card promises; reorder to NZ:AI first`

**Done when:** cards render in the new order, each with the correct logo, accent colour and destination link.

---

## Part 5 — Responsive verification and close

**Steps**

1. Verify at 1440, 1280, 1024, 768, 600, 414 and 375 px using the in-app DevicePreview widget.
2. Confirm `prefers-reduced-motion: reduce` renders every element in its final state with no animation.
3. `npm run build` produces a clean `dist/`.
4. Update `STATUS.md` with the completed brief, the final SHA, and what is next.
5. `git mv docs/briefs/active/landing-screens-2-3.md docs/briefs/archive/landing-screens-2-3_COMPLETED.md`, repoint `current.md`, push the close commit.

**Commit:** `close: landing screens 2-3 restructure complete`

---

## Verification — non-negotiable, falsifiable

Browser verification, with evidence. "Looks right" is not a result. Capture a screenshot for each visual criterion.

**Screen 2**

- [ ] The opening line occupies the first viewport of the coral panel with nothing else visible alongside it at 1440px.
- [ ] Exactly three phase rows below it, in the order Decode, Build, Partner.
- [ ] Each row's text left edge aligns pixel-exactly with the NZA logo's left edge in the nav above. Verify by overlaying or measuring — this is a specific, checkable alignment, not an impression.
- [ ] Phase visuals measure 110px at 1440px, 72px at 900px, 64px at 414px. Measure in DevTools; report the computed values.
- [ ] Phase body text never exceeds 680px measure at 1920px.
- [ ] Hairline separators draw left-to-right on reveal, one per row.
- [ ] The Decode 25-dot assembly, and the Build and Partner animations, all still run — and still run in sequence, not simultaneously.
- [ ] Parallax entry unchanged: the hero stays fixed while the coral panel rises over it.
- [ ] At 414px: single column, visual above heading, all three rows readable without horizontal scroll.

**Screen 3**

- [ ] Heading reads "Where it starts".
- [ ] Intro reads "Three ways in, depending on what you need first."
- [ ] Cards in order NZ:AI, PABLO, decodED.
- [ ] Hovering each card draws its own accent colour: NZ:AI teal, PABLO orange, decodED green. Check all three — a reorder is the classic way accent mapping silently breaks.
- [ ] Each card's Explore link routes to the correct path: `/nz-ai`, `/pablo`, `/decoded`.
- [ ] Section height does not change on hover.

**Global**

- [ ] Zero console errors or warnings on `npm run dev`.
- [ ] `npm run build` clean.
- [ ] No orphaned CSS: grep `how-we-work-page-grid`, `how-we-work-page-left`, `how-we-work-page-right`, `phases-intro` across `src/` — each returns zero results.

---

## What MUST NOT happen

- Do not reword any copy in this brief, for any reason.
- Do not reintroduce a click-to-expand, accordion or toggle on the phases.
- Do not make screen 2 a three-across grid at any breakpoint.
- Do not alternate the visual's side between rows.
- Do not edit `HowWeWorkVisuals.tsx` animation internals. Size changes go in CSS.
- Do not retune the parallax lock beat or scroll runway.
- Do not touch `colors_and_type.css` or `nza-website.css`.
- Do not touch any product page, or `SiteNav`, or the hero, or Get in touch.
- Do not run `npm install` or commit a lockfile.
- Do not force-push or `git reset --hard`.
- Do not expand scope. If something adjacent looks broken, report it — do not fix it.

---

## When to escalate and stop

Stop and ping Chris if:

- Session-start reconciliation shows a different brief in `active/` or claimed by `current.md`.
- Removing the two-column grid breaks the parallax entry and it is not restored within three attempts.
- The 1280px frame alignment cannot be preserved in the new structure.
- Reordering `PRODUCTS` breaks accent-colour or logo mapping in a way that is not a one-line fix.
- Any copy string in this brief appears factually wrong or contradicts something already on the site.
- The coral panel's new height interacts badly with snap-paging (`useSnapPaging.shouldSnap()`).
- Three approaches have been tried on any single problem. Report what was tried, what happened, and the options.

---

## Independent review trigger

This is a UI and copy brief, so browser verification plus Chris's walkthrough is the standard gate — no mandatory fresh-eyes review.

**One exception:** if Part 3 ends up touching the sticky/parallax wrapper rather than only the inner grid, that crosses into shared layout mechanics used by the hero. In that case, flag it at close and Claude Chat reads the diff on GitHub before merge.

---

## Close

1. `STATUS.md` updated: completed Part, SHA, current state, next Part, known issues.
2. Brief moved to `docs/briefs/archive/landing-screens-2-3_COMPLETED.md`.
3. `current.md` repointed.
4. Close commit pushed.
5. Final report to Chris: what was built, verification evidence with numbers, anything that diverged from this brief and why, and anything worth proposing to the Lessons database.

---

## The spec-is-the-prompt test

This brief carries: every final copy string verbatim · exact file paths and the line regions to edit · the current structure and the target structure · the reasoning behind the sequence-versus-set layout decision · explicit out-of-scope boundaries · falsifiable acceptance criteria.

If the conversation that produced it were deleted, this brief builds correctly on its own.
