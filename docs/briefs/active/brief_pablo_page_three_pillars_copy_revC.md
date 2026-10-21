# Brief — PABLO page: rewrite the five "how PABLO works" sections · revC

**Repo:** `nza-website` (Product mode) · **Base branch:** `preview/all-products` (the PABLO page is held on `main`; the real page lives here) · **Work branch:** `chris/pablo-page-three-pillars`, in its own git worktree · **PR target:** `preview/all-products`, NOT `main` · **Tier:** cosmetic/copy (Tier 1–2) · **Author:** Claude Chat, 21 Oct 2026 · **Authorised by:** Chris

**Design note (canonical):** Notion → Products → PABLO → *PABLO web page & launch — copy deck & storyboard (Rev B)*. If this brief and the note disagree, the note wins.

> **revC supersedes revB (14 Oct) and revA in full.** All five sections' copy has changed; coral verb now on 01, 04 and 05. Process rules from revB are unchanged (base branch, worktree, no STATUS on branch). revB may or may not have been executed — BEFORE step 2 reconciles that.

---

## BEFORE DOING ANYTHING
1. Confirm receipt: quote this brief's title and the Goal paragraph back.
2. **Reconcile revB state.** Run `git fetch` and `git branch -a`, then report which applies:
   - **(a) revB never started** — no `chris/pablo-page-three-pillars` branch exists. Proceed from step 3.
   - **(b) revB branch exists, PR open or unmerged** — check out that branch in its worktree (`git worktree list`). Replace the revB brief file in `docs/briefs/active/` with this one in Part 1 (`git rm` the revB file in the same commit). Apply the revC copy on top. Same PR.
   - **(c) revB merged to `preview/all-products`** — create a fresh worktree/branch from `origin/preview/all-products` as in step 4, with branch name `chris/pablo-page-copy-revC`. Treat as a follow-on.
   Report (a)/(b)/(c) **before any edit**.
3. Read `CLAUDE.md`, `STATUS.md`, `docs/briefs/current.md`, `ls docs/briefs/active/`. Other active briefs (`launch-day`, `fonts-adobe`, or later ones) running in parallel are expected and authorised. Detect OS/shell (PowerShell on Windows, zsh on Mac).
4. If no worktree exists yet: `git worktree add ../nza-website-pablo-copy -b chris/pablo-page-three-pillars origin/preview/all-products`. Work only in that folder. Chris's uncommitted files in the main folder are his — leave them.
5. Land this file at `docs/briefs/active/brief_pablo_page_three_pillars_copy_revC.md` as Part 1's first commit.
6. Locate the PABLO page component and the config that drives the five numbered sections under "Let's show you how PABLO works" (expected: `src/data/products/pabloConfig.tsx` or equivalent, by analogy with `nzaiConfig.tsx`). Report the file path(s) and how headline / highlight-verb / body are stored **before editing**.

## Goal
The five "how PABLO works" sections tell the page's story. The agreed narrative is: rebuild your bill → your load shape → your grid connection → optimise your energy strategy → understand the value over time. This brief replaces the copy of those five sections with the canonical Rev B text so the page tells that story in plain language for a lay reader. Charts and layout are untouched.

## Why this / design decisions already agreed
- The page is written to the person who pays the bill. Every sentence was tested with Chris for a lay reader; the copy is final and is not to be improved.
- **The graphic does the talking.** Copy never describes the chart (no "over a year", no "half-hour by half-hour").
- Supply arrangement is told inside 01 ("what your supplier adds on top"), not as its own section. It stays a beat in the launch video.
- Escalation-above-CPI is an idea inside 05 ("how that changes as the world around it does"), not a section.
- 03 states demand projection as a PABLO capability ("where your demand is heading"). Chris's ruling, 21 Oct — it is roadmap, and he has chosen to state it.
- 04 lists the levers (solar, storage, load shifting, peak shaving, capacity reduction, flexibility services) and stops. The visual (solar + battery, dumb vs smart dispatch) carries the mechanism.
- Coral highlight verb on **01 Rebuild**, **04 Optimise**, **05 Understand**. 02 and 03 are plain headlines. Do not invent verbs for 02/03.
- CTAs ("Book a demo" / "Request Demo") are unchanged. The "Decode my bill" offer is still open with Chris.
- Spaced hyphens (" - "), never em dashes, in rendered copy — matches the site rule.

## Scope
**IN:** headline text (including which word is coral-highlighted) and body copy for sections 01–05 under "Let's show you how PABLO works". Nothing else.
**OUT:** hero, WHY PABLO, closer, CTAs, any chart, any data, layout, animation, styling, section count, section order, routing, STATUS.md, current.md.

## Principles
- Copy only. If a change requires touching chart props, data arrays or layout, stop and escalate.
- Paste the canonical copy character-for-character. Divergence, however small, is a stop-and-ask.
- No STATUS.md or current.md edits on the branch — STATUS updates at merge.

## The copy (canonical — paste exactly)

**Section heading:** `Let's show you how PABLO works` *(unchanged)*

**01. [Rebuild] your bill** — coral on "Rebuild"
All PABLO needs is your load data and a copy of your bill. From those two inputs it rebuilds your bill from first principles - wholesale, network charges, levies, and what your supplier adds on top - so you can see exactly what you're paying for, and exactly where the savings are.

**02. Your load shape** — plain headline
It's not just how much electricity you use - it's when. The same unit costs more at five on a winter evening than at three in the morning, because the market, the network and the levies all charge more when demand is high. PABLO lays those prices over your usage, so you can see which hours are quietly costing you the most.

**03. Your grid connection** — plain headline
Every site has an agreed limit on how much power it can draw from the grid, and you pay for that limit whether you use it or not. Most sites never get close. PABLO shows your agreed capacity against what you actually draw, what the unused headroom costs you, and where your demand is heading - so you can right-size your connection with confidence.

**04. [Optimise] your energy strategy** — coral on "Optimise"
Once you understand the true cost of your electricity, you can start to optimise against it. Solar, storage, load shifting, peak shaving, capacity reduction, flexibility services - PABLO models them against your real building and shows you how they work together, so you can find the solution that's right for you.

**05. [Understand] the value over time** — coral on "Understand"
An energy strategy plays out over decades, and almost everything in it moves - energy prices, network charges, equipment that wears and gets replaced. PABLO builds the whole-life picture: what business as usual really costs, what each option saves, and how that changes as the world around it does. Test the assumptions, see how the case responds, and move forward with confidence.

## Parts
**Part 1 — Land the brief.** Commit this file to `docs/briefs/active/`. In case (b), `git rm` the revB brief file in the same commit. `docs: land brief pablo-page copy revC (supersedes revB)`. Done: only revC in active/ for this work.

**Part 2 — Replace the five sections' copy.** Edit headline, highlight verb and body for 01–05 to the canonical copy above. No other file changes. `copy(pablo): rewrite how-it-works sections to Rev B copy deck`. Done: `git diff --stat` shows only the file(s) identified in BEFORE step 6; diff is text-only.

**Part 3 — Browser verification.** Run the dev server in the worktree on a port that does not clash with the main folder. Open `/pablo`. Screenshot each of the five sections at desktop (1440) and phone (375) widths. Push. Open (or update) the PR against `preview/all-products` with the screenshots and the follow-on note below in the description.

## Verification (falsifiable)
- The five headlines read exactly: `Rebuild your bill` · `Your load shape` · `Your grid connection` · `Optimise your energy strategy` · `Understand the value over time`.
- Coral highlight is on exactly `Rebuild`, `Optimise`, `Understand`, and on no word in 02 or 03.
- Body copy matches the canonical text character-for-character (diff against this brief). Hyphens are spaced hyphens; zero em dashes in the five bodies.
- Every chart that rendered before renders after, in the same position — before/after screenshot pair per section.
- No console errors on page load.
- Hero, WHY PABLO, closer and both CTAs are absent from the diff.
- Phone width (375px): no text overflow or clipped headings in the five sections.

## What MUST NOT happen
- No chart, data, layout, animation or style edits.
- No changes to CTAs or link targets.
- No `npm install`, no package-lock changes.
- No PR against `main`; no merge anywhere — Chris reviews on the preview and merges.
- No STATUS.md or current.md edits on the branch.
- No "improving" the copy.

## When to escalate / stop
- revB state is none of (a)/(b)/(c), or the revB branch has edits beyond the five sections.
- The copy is not cleanly separable from chart or layout code.
- The page has more or fewer than five sections, or the heading text differs from the one quoted.
- The config cannot express a plain headline (no highlight verb) for 02/03 without a template change.
- Any verification item fails.

## Independent review
Cosmetic copy change: Claude Code browser verification + Chris's walkthrough on the PR preview. No fresh-eyes code review.

## Close
After Chris merges the PR: `git mv` brief to `docs/briefs/archive/…_COMPLETED.md`, STATUS.md close-out, repoint `current.md`, single push, `git worktree remove` the worktree.

## Known follow-on (NOT in this brief — record in the PR description)
- **03** chart is the component projection; the section wants agreed-capacity-vs-actual-peak.
- **04** target clip is solar + battery on the load, dumb vs smart dispatch (the webinar sequence); current intervention-modelling chart is acceptable until showcase clips exist.
- CTA decision ("Decode my bill") pending with Chris.
