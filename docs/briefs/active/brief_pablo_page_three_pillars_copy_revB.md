# Brief — PABLO page: rewrite the five "how PABLO works" sections to the three-pillar story · revB

**Repo:** `nza-website` (Product mode) · **Base branch:** `preview/all-products` (the PABLO page is held on `main`; the real page lives here) · **Work branch:** `chris/pablo-page-three-pillars`, in its own git worktree · **PR target:** `preview/all-products`, NOT `main` · **Tier:** cosmetic/copy (Tier 1–2) · **Author:** Claude Chat, 14 Oct 2026 · **Authorised by:** Chris

> **revB supersedes revA (14 Oct).** Changes: base branch and PR target set to `preview/all-products`; work runs in parallel with the active `launch-day` and `fonts-adobe` briefs (unrelated files) in its own worktree; no STATUS.md edit on the branch — STATUS updates at merge; headline styling rule added (coral verb on 01 and 05 only). If revA was landed in active/, replace it with this file.

---

## BEFORE DOING ANYTHING
1. Confirm receipt: quote this brief's title and the Goal paragraph back.
2. Read `CLAUDE.md`, `STATUS.md`, `docs/briefs/current.md`, `ls docs/briefs/active/`. `launch-day` and `fonts-adobe` being active is expected and authorised — this brief runs in parallel in its own worktree. Any *other* active brief: stop and surface.
3. Detect OS/shell before running anything (PowerShell on Windows, zsh on Mac).
4. `git fetch`. Create a worktree from `origin/preview/all-products`: `git worktree add ../nza-website-pablo-copy -b chris/pablo-page-three-pillars origin/preview/all-products`. Work only in that folder. Chris's uncommitted files in the main folder (`docs/videos-nzai-README.md`, `start-website.command`) are his — leave them untouched.
5. Land this file at `docs/briefs/active/brief_pablo_page_three_pillars_copy_revB.md` as Part 1's first commit.
6. Locate the PABLO page component and the data that drives the five numbered sections under the "Let's show you how PABLO works" heading. Report the file path(s) and how the copy is stored (JSX inline / array / content file) **before editing**.

## Goal
The PABLO page currently tells a feature-tour story (bill → demand → cost drivers → options → investment case). The agreed launch narrative is different: **your bill is set by three things — load shape, grid connection, supply arrangement — and only one of them is how much you use.** PABLO rebuilds the bill so you can see all three, then shows what you can do about it (the stack). This brief replaces the copy of the five sections so the page tells that story. Charts and layout are untouched.

## Why this / design decisions already agreed
- The three-pillar framing is the spine for the launch video, the landing page and the LinkedIn series — one story everywhere. It was agreed in the 2 Oct launch-plan conversation and used in the Batteries & Buildings webinar run book.
- Section 01 keeps the bill reconstruction as the lead — it is PABLO's most defensible capability and the existing breakdown chart already sits under it.
- Export headroom is part of **grid connection**, not a separate point.
- "The stack" (solar, storage, flexibility, market participation) is the payoff, not a fourth pillar. It and the financial case share the final section.
- The "Cost Gap" slice in the existing breakdown chart is the supplier's margin **plus the price of risk** — the copy in section 04 refers to it as such.
- The CTAs ("Book a demo" / "Request Demo") are **unchanged** in this brief. A separate decision on the offer (e.g. "Decode my bill") is pending with Chris.
- Audience: written to the person who pays the bill (owner / energy manager); advisors are addressed in the closing "Real estates. Real savings." block, which is untouched here.

## Scope
**IN:** the heading text, numbered-section titles and body copy for sections 01–05 under "Let's show you how PABLO works". Nothing else.
**OUT:** hero, WHY PABLO, closing block, CTAs, any chart, any data, layout, animation, styling, section count, section order, routing.

## Principles
- Copy only. If a change requires touching chart props, data arrays or layout, stop and escalate.
- Keep British English, en-dash style and sentence length consistent with the existing page (2–4 sentences per section).
- Body copy in plain text exactly as below — no rewording, no added adjectives.
- Headline styling: the coral highlight verb is used on 01 (`Rebuild`) and 05 (`Build`) only; 02–04 render as plain `headline` strings. Do not invent verbs for the pillar sections.

## The copy (canonical — paste exactly)

**Section heading:** `Let's show you how PABLO works` *(unchanged)*

**01. Rebuild your bill**
All PABLO needs is your half-hourly data and a copy of your bill. From those two inputs it rebuilds your bill from first principles - wholesale, network charges, levies, risk - so you can see what you're actually paying for, not just what you're being charged.

**02. Your load shape**
How much you use matters less than when. Your load shape sets what wholesale energy costs at the moment you buy it, when you're using the network and what it charges you for that, and how much you pay in peak-period levies. PABLO lays price, network and levy over a year of your demand so you can see which hours are costing you.

**03. Your grid connection**
Where you sit on the grid and the capacity you've agreed set a large, fixed part of your bill - and those charges are rising fastest. Most sites pay for capacity they never use. PABLO shows your agreed capacity against your real peak, what the headroom is costing you year on year, and how much you can export.

**04. Your supply arrangement**
Your contract decides how much of your bill you can see and how much you can influence. A fixed flat rate hides every component - and the premium you pay for the supplier carrying the risk. PABLO shows the gap between your contracted rate and the rebuilt bill, and what changes if you could see the charges underneath.

**05. Build the stack**
Once you can see all three, you can change them. Solar, storage, peak shaving, flexibility, market participation - layered on your real load, dispatched half-hour by half-hour, with the cost stack and the financial case responding as you go. Compare scenarios, see the payback, and recommend a strategy with confidence - or challenge one.

## Parts
**Part 1 — Land the brief.** Commit the brief file. `docs: land brief pablo-page three-pillars copy revB`. Done: file in active/ on the work branch.

**Part 2 — Replace the five sections' copy.** Edit titles and body for 01–05 to the canonical copy above. No other file changes. `copy(pablo): rewrite how-it-works sections to three-pillar narrative`. Done: `git diff --stat` shows only the file(s) identified in BEFORE step 6; diff contains text changes only.

**Part 3 — Browser verification.** Run the dev server in the worktree on a port that does not clash with the main folder. Open the PABLO page, screenshot each of the five sections at desktop and phone widths. Do NOT edit `STATUS.md` or `current.md` on the branch. Push. Open a PR against `preview/all-products` with the screenshots and the follow-on note below in the description.

## Verification (falsifiable)
- The five section titles read exactly: `Rebuild your bill` · `Your load shape` · `Your grid connection` · `Your supply arrangement` · `Build the stack`.
- Body copy matches the canonical text character-for-character (diff against this brief).
- Every chart that was on the page before renders after, in the same position — screenshot pair per section, before/after.
- No console errors on page load.
- Hero, WHY PABLO, closing block and both CTAs are byte-identical in the diff (i.e. absent from it).
- Phone width (375px): no text overflow or clipped headings in the five sections.

## What MUST NOT happen
- No chart, data, layout, animation or style edits.
- No changes to CTAs or link targets.
- No `npm install`, no package-lock changes.
- No PR against `main`, no merge anywhere — PR against `preview/all-products` only; Chris reviews and merges.
- No STATUS.md or current.md edits on the branch.
- No "improving" the copy. Divergence from the canonical text, however small, is a stop-and-ask.

## When to escalate / stop
- The copy is not cleanly separable from chart or layout code.
- The page has more or fewer than five sections, or the heading text differs from the one quoted.
- Any verification item above fails.

## Independent review
Cosmetic copy change: Claude Code browser verification + Chris's walkthrough on the PR preview. No fresh-eyes code review required.

## Close
After Chris merges the PR: `git mv` brief to `docs/briefs/archive/…_COMPLETED.md`, STATUS.md close-out, repoint `current.md`, single push, `git worktree remove ../nza-website-pablo-copy`.

## Known follow-on (NOT in this brief — flag in the PR description)
Two charts no longer match their section: **03 grid connection** wants an agreed-capacity-vs-actual-peak chart (it currently sits over the component projection), and **04 supply arrangement** wants a contracted-vs-rebuilt comparison (it currently sits over intervention modelling). Record in the PR description as a candidate follow-on brief; do not build.
