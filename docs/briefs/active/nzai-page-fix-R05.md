# Brief: NZ:AI page fix-up after R03 (clip 05 question, video README, phone check)

**Repo:** `nza-hq/nza-website`
**Mode:** Small fix (standard ceremony, compressed)
**Author:** Claude Chat, 13 October 2026
**Authorised by:** Chris Scott
**Revision:** R05. This supersedes R04, which was never run, so withdraw it. It corrects what brief R03 left on `origin/main` at `288ba2c`.
**Design note (canonical):** Notion → Products → NZ:AI → "NZ:AI web page — copy deck & storyboard (Rev D)"

---

## BEFORE DOING ANYTHING

- [ ] Read this brief in full. Confirm receipt by quoting its title.
- [ ] Detect the shell. On Windows use PowerShell syntax.
- [ ] Read `CLAUDE.md` and the last 40 lines of `STATUS.md`. Run `git log --oneline -6`.
- [ ] Confirm `origin/main` is at `288ba2c` or later, and that the tree is clean.
- [ ] **Run `git stash list`.** The R03 session stashed local changes before pulling. Report every entry, with what it contains (`git stash show -p stash@{n} --stat`). **Don't drop, pop or apply any stash.** Chris decides what happens to them.
- [ ] Land this brief at `docs/briefs/active/nzai-page-fix-R05.md`.

---

## Goal

Brief R03 shipped the new NZ:AI copy, but a check of `288ba2c` found three problems.

1. **Step 05 asks a question no client tool can answer.** The page says "which buildings have both meter and occupancy data", but the Hartpury record holds no occupancy data. The real clip (recorded under brief S01 in the Hartpury repo) asks **"Which buildings have floor plans and a meter?"** The page must say the same thing.
2. **`docs/videos-nzai-README.md` was not updated.** STATUS says it was, but it still lists `01-living-reports` and the old shot list. Anyone recording a clip would read the wrong spec.
3. **The phone layout was not actually checked.** The R03 session cut verification short. The manifesto is now six paragraphs, so the 393×705 layout needs a real look.

---

## Why this matters

The page's promise in clip 05 is "ask your data and get a true answer". If the example question can't be answered from the data, the claim is false. The README is what the people recording the clips work from, so it must match the config exactly. A STATUS entry that claims work which wasn't done is worse than one that admits a gap, so correct it plainly.

---

## Scope

**IN:**
- step 05 `body` and `alt` in `src/data/products/nzaiConfig.tsx`
- three sections of `docs/videos-nzai-README.md`
- a real phone and desktop check of the manifesto and steps
- a STATUS correction
- archiving the brief

**OUT:**
- any other copy
- templates, CSS and components
- `NzAiPage.tsx`, the nav and the `ready` flags (the page stays hidden)
- the placeholder videos
- anything else in the stash

---

## Parts

### Part 1: clip 05 copy
**File:** `src/data/products/nzaiConfig.tsx`, step `05` only.

- `body` →
  `Ask a question in plain English, such as which buildings have floor plans and a meter, and the answer appears on the map from your own record. Your own AI can read it too.`
- `video.alt` →
  `A plain-English question typed over an estate map, with the buildings that have floor plans and a meter highlighted and a small chart beside each`

**Commit:** `nz-ai: clip 05 asks a question the data can answer (brief R05 part 1)`

**Done when:** `grep -n "occupancy" src/data/products/nzaiConfig.tsx` returns nothing, and `tsc` is clean.

### Part 2: video README
**File:** `docs/videos-nzai-README.md`. Replace exactly these three sections. Leave the rest, including "Asset spec" and "Regenerating the placeholders", unchanged.

**Section "Filenames"**: replace the code block with:
```
public/videos/nzai/01-energy-map.mp4        + .webm   + -poster.jpg
public/videos/nzai/02-carbon-traced.mp4     + .webm   + -poster.jpg
public/videos/nzai/03-risk-mapped.mp4       + .webm   + -poster.jpg
public/videos/nzai/04-options-tested.mp4    + .webm   + -poster.jpg
public/videos/nzai/05-ask-your-data.mp4     + .webm   + -poster.jpg
```

**Section "Shot list"**: rename the heading to `## Shot list` and replace the body with:
- **01 Energy map** (source: Hartpury Estate Explorer, brief S01). Site map → select substation A → the buildings it serves light up → a monthly cost chart opens beside them → select substation B → the highlight and chart swap. Final frame: B's buildings lit, chart open.
- **02 Carbon traced** (source: IVG carbon inventory). Bars rise by scope → swivel into a donut → flow into a Sankey → zoom into one site → one supplier with its spend → its trajectory. Final frame: the supplier view with trajectory.
- **03 Risk mapped** (source: invented site, built on the decodED risk-register work). Pins drop as observations are recorded → buildings take red / amber / green ratings → one opens its risk-register entry. Final frame: the rated site with one entry open.
- **04 Options tested** (source: forked strategy playground). The business-as-usual line climbs → measures switch on and sliders move → the line bends onto the science-based target → the chosen measures slide up as an action list with owners' initials. Stacked layout, chart on top. Final frame: on target, with the action list.
- **05 Ask your data** (source: Hartpury Estate Explorer, brief S01). The question "Which buildings have floor plans and a meter?" types itself → a short working state → the matching buildings glow and the rest dim → a small card opens beside each → the answer line "Floor plans and a meter: {n} buildings". The answer is produced by an agent reading the record and checked by a test; the panel only replays it.

**Method**: add this as a new paragraph under the shot list:
> Clips are recordings of real NZA tools in a showcase mode (1080×1080, chrome hidden, larger type, figures illegible), driven by a scripted Playwright run and encoded with ffmpeg. They are produced in each tool's own repo, not here. Drop finished files in at the exact names above; no code change is needed.

**Section "Anonymisation"**: keep the four existing bullets, but delete the old item-04 bullet about shifting years. Then add:
- Real data only, never invented figures. Every £, kWh, m² and count is illegible in frame, except clip 05's answer count.
- No aerial or satellite imagery until its licence is confirmed for marketing use.
- Never show gaps or missing data. Frames show what is held.
- 04: use generic measure names and changed numbers. No office names.
- 03: entirely invented.

**Commit:** `docs: video README matches the five clips (brief R05 part 2)`

**Done when:** `grep -n "living-reports\|carbon-inventory\|estate-intelligence\|performance-tracking" docs/videos-nzai-README.md` returns nothing, and all five new names are present.

### Part 3: real verification, correct STATUS, close
1. Temporarily render `<ProductPage config={nzaiConfig} />` in `NzAiPage.tsx`, then run `npm run dev`.
2. Use the DevicePreview widget for the phone sizes and take screenshots of:
   - **393×705:** manifesto (whole section, scrolled); steps 01 and 05
   - **1280×800:** manifesto; step 05
3. Pass when all of these are true:
   - **(a)** At 393×705 no manifesto paragraph is clipped, overlaps the next section, or needs scrolling inside a locked-height container.
   - **(b)** Step 05's body reads the new text verbatim, at both sizes.
   - **(c)** The transition reads "Let's show you what we build" as five-plus separate words with normal spacing. Inspect the DOM, not the extracted text.
   - **(d)** Console is clean.
   - **(e)** After reverting, `/nz-ai` shows Coming Soon, and `git diff HEAD --stat` doesn't list `NzAiPage.tsx`.
4. **Revert `NzAiPage.tsx`.**
5. Fix the STATUS.md R03 entry so it's accurate:
   - change the README line to "README NOT updated in R03; corrected in R05"
   - add "R03 ran in place of R04 (copy-only difference, fixed in R05)"
   - add "Phone verification completed in R05"
   - add the stash list from BEFORE DOING ANYTHING
6. Move this brief to `docs/briefs/archive/nzai-page-fix-R05_COMPLETED.md` and update `current.md`. Push.

**Commit:** `nz-ai: brief R05 verified (phone + desktop), STATUS corrected, archived`

---

## What MUST NOT happen
- Committing `NzAiPage.tsx` changes, or changing the nav or `ready` flags.
- Dropping, popping or applying any stash.
- Changing any copy besides step 05's body and alt.
- Editing templates, CSS or components. If (a) fails, **stop**.
- `npm install`, or committing a lockfile.
- Marking a check passed without its screenshot.

## When to escalate / stop
- (a) fails: the manifesto doesn't fit on phone. Report it with the screenshot. Don't shorten the copy or change CSS.
- The stash contains changes to `src/` or `public/` that look like unfinished work. Report them before continuing.
- `origin/main` has moved past `288ba2c` and touched `nzaiConfig.tsx` or the README.

## Independent review
Standard tier. Chris checks the four screenshots.

## Final report
- commit hashes
- the stash list
- results (a)–(e), each with its screenshot
- the `grep` outputs from Parts 1 and 2
