# Brief — Fonts: move Stolzl to Adobe Fonts, drop to three weights

**Repo:** `nza-hq/nza-website`
**Mode:** Product
**Author:** Claude Chat, 21 September 2026
**Authorised by:** Chris Scott
**Revision:** R02 — supersedes R01, which is **withdrawn**. Do not run R01; its weight table is wrong.

---

## Execution note (Co-Work, 21 Sep 2026)

Both hard blocks cleared before starting:
- **Block 1 (mobile-load-fix):** load work landed this session (CSS code-split 182→117 KB;
  Google Fonts `@import` moved to a preconnected async `<link>`). Chris confirmed on device that
  the ~15s mobile load is resolved and the preloader feel is good (4.5s preloader left unchanged).
- **Block 2 (Adobe embed):** supplied by Chris — kit `tpk0png`, Web Project "NZA Website".
  Kit CSS defines family `stolzl` (matches the existing `"Stolzl"` case-insensitively).

**Deviation agreed with Chris:** the kit ships **6 weights** (100, 200, 300, 400, 500, 700), not
the 3 specified. Chris chose to proceed with the 6-weight kit rather than trim it. The Stolzl weight
remap still runs as designed (100→300, 450→400, 600→500, 700→500), so only 300/400/500 are ever
used and downloaded; the extra declared weights are never served.

---

## Changelog — what R02 fixes

R01 was validated against the source by Claude Code before landing, and three defects were found.
Two were reported by Claude Code; the third is one Claude Chat self-reported on review.

| # | Defect in R01 | Fix |
|---|---|---|
| 1 | **"Two named `bold` declarations to audit" — they do not exist.** Claude Chat's measurement counted a regex alternation of `bold\|normal\|lighter\|bolder` and got 2, then reported the result as two `bold`. They were almost certainly `normal`. Claude Code found **zero** `font-weight: bold` anywhere. | Claim removed. Part 4 no longer sends anyone hunting for something that isn't there. |
| 2 | **"Remap all four `600` occurrences to 500" was family-blind.** Inter 600 **is** legitimately backed — the Google import fetches it. Blanket remapping would silently restyle Inter text. | **Every remap is now gated on classifying the rule's `font-family` first.** Only Stolzl weights remap. Inter stays untouched. |
| 3 | **The weight table covered only the main CSS bundle.** Claude Chat measured `index-*.css` fetched from the live site — that is the eager landing bundle. It does **not** include the lazy route chunks (ExpertisePage, ProductPage and friends), which ship their own CSS. This is why R01 reported "700: 0 uses" while Claude Code found a numeric `700` at `going-further-section.css:139`. | The table below is **explicitly scoped as incomplete**, and Part 4 now requires a full sweep of `src/styles/` and inline component weights, not a confirmation of this table. |

**The lesson, recorded:** a built bundle is evidence about one entry point, not about the codebase.
Claude Code reading source beat Claude Chat reading shipped CSS. Worth a Lessons entry.

---

## Goal

Stop self-hosting Stolzl, serve three weights from Adobe Fonts via a Web Project embed, and remove
roughly 220 KB of OTF from the site. Resolves a licence problem and cuts font payload together.

---

## Why this — intent, not just instructions

**The six `.otf` files in `public/fonts/` are outside Adobe's licence.** Chris obtained Stolzl via
his Adobe Express subscription. Adobe's terms: *"Adobe doesn't offer the ability to host fonts
locally"*, fonts must be added *"by the embed code provided"*, and *"any other method of displaying
the font on your website isn't allowed."*

**The fix costs nothing.** Stolzl is available for web use on Adobe Fonts — its page states *"To use
this font on your website, use the following CSS: `font-family: stolzl`"*. A foundry licence from
InHouse Type (£76.92/year for three weights) was priced and deliberately deferred; it buys
self-hosting and marginally better performance, not legality.

**Three weights, because the usage supports it.** Measured across the **main CSS bundle only**:

| Weight | Uses (main bundle) | Decision |
|---|---|---|
| 100 Thin | 2 | Drop — remap to 300 **if Stolzl** |
| 300 Light | 32 | **Keep** |
| 400 Book | 44 | **Keep** |
| 450 Regular | 0 | Drop — declared, never used |
| 500 Medium | 70 | **Keep** |
| 600 | 4 | **Classify each.** No Stolzl 600 face exists — those are already synthesised. Inter 600 is backed and stays. |
| 700 Bold | 0 in main bundle — **but ≥1 in route CSS** | Classify. The known one (`going-further-section.css:139`, `.pablo-mark`) is **Inter** → leave alone. |

> ⚠️ **This table is incomplete and is a starting point, not a specification.** It reflects the
> eager landing bundle. Lazy route stylesheets were never measured. **Part 4 requires an
> independent full sweep** — do not treat agreement with this table as success, and do not treat
> disagreement as an error. The source is the truth.

**The risk to manage is faux weights.** If a rule asks for a weight with no face, the browser
fabricates one — smeared fake bold, stretched fake thin. No error, just slightly wrong everywhere,
unnoticed for a month. Every dropped Stolzl weight must be explicitly remapped.

**The mirror risk is over-correcting.** Inter has 600 and 700 available through the Google import.
Remapping those would change rendering for no reason. **Family first, weight second.**

---

## ⛔ Two hard blocks

### Block 1 — `mobile-load-fix` (R01) must land first

**As of 21 Sep 2026, 20:50, `mobile-load-fix` has not been run.** Only the read-only diagnosis
(`docs/audit/mobile-load-diagnosis.md`) exists. Claude Code was correct to stop on this.

The sequencing stands and is not a formality: both briefs change perceived load, and the font swap's
PSI effect cannot be separated from a 4.5 s preloader change landing at the same time.
`mobile-load-fix` is also the larger win. **Run it first, verify it, then come back here.**

### Block 2 — the Adobe embed code

**Chris does this — it is an account action.** About two minutes:

1. **fonts.adobe.com**, search **Stolzl** (already activated on the account).
2. Click the **`</>`** button on the family.
3. **Create a new Web Project**, name it **`netzeroadvisory.uk`**.
4. Select **only Light (300), Book (400), Medium (500)**. Deselect everything else. If Adobe's
   naming differs, **match by weight number, not name**.
5. Copy the `<link>` embed **and** note the family name Adobe gives (expected: `stolzl`).
6. Paste both into the session.

There are **no Web Projects** on the account today — this will be the first.

**No placeholders. No invented project IDs. No copying one from documentation.**

---

## Design decisions already agreed

1. Adobe Fonts Web Project embed. Not self-hosting, not a foundry purchase — for now.
2. Three weights: 300, 400, 500.
3. Stolzl 100 → 300. Stolzl 600 → 500. Stolzl 450 and 700 removed. **Non-Stolzl weights untouched.**
4. The six `.otf` files are deleted, not orphaned.
5. Google Fonts (`Inter`, `DM Serif Display`, `JetBrains Mono`) stays. Separate origin, separate brief.
6. No branch. `CLAUDE.md`: stay on `main`.

---

## Scope

### IN
- Adobe Fonts embed + `use.typekit.net` preconnect in `index.html`.
- Remove six local Stolzl `@font-face` blocks from `src/styles/colors_and_type.css`.
- Delete `public/fonts/stolzl_*.otf` (6 files).
- **Full weight sweep across all of `src/styles/` and inline component weights**, remapping only
  Stolzl-family rules.
- `STATUS.md`.

### OUT — do not touch
- The Google Fonts `@import` and its three families.
- **Any weight on a non-Stolzl family.** Inter 600/700 are backed and correct.
- Colour, spacing or size tokens. **Weights only.**
- `package.json`, `package-lock.json`. No `npm install`.
- The preloader — that is `mobile-load-fix`.
- Purchases of any kind.

---

## Principles

1. **Family first, weight second.** Never remap a weight without establishing which family the rule
   resolves to. Inherited `font-family` counts — check the cascade, not just the rule.
2. **Never leave a Stolzl weight unbacked.** Synthesis is a silent visual regression.
3. **Never remap a weight that is backed.** Over-correction is the same class of error in reverse.
4. **The brief's table is a hint, not a spec.** Sweep the source; report what you find, including
   disagreements with this document.
5. Delete the files — an unreferenced licensed OTF in a public directory is still served and still
   an exposure.

---

## Part 1 — Land the brief

Save to `docs/briefs/active/fonts-adobe.md`; repoint `docs/briefs/current.md`.

**Commit:** `docs: land fonts-adobe brief R02`
**Done when:** brief on disk, `current.md` repointed, **both blocks cleared** — `mobile-load-fix`
landed and verified, and the embed code in hand. If either is outstanding, stop and say which.

---

## Part 2 — Add the Adobe embed

1. In `index.html` `<head>`, add Adobe's `<link>` exactly as supplied, **before** the bundled
   stylesheet link.
2. Immediately above it: `<link rel="preconnect" href="https://use.typekit.net" crossorigin />`.

**Files:** `index.html`, `STATUS.md`
**Commit:** `feat: adobe fonts web project embed for stolzl`
**Done when:** embed verbatim, preconnect above it, build clean.

---

## Part 3 — Remove the local faces and delete the files

1. Delete all six Stolzl `@font-face` blocks from `src/styles/colors_and_type.css`.
2. Confirm the family name resolves against Adobe's. CSS family matching is case-insensitive, so
   `Stolzl` matches Adobe's `stolzl` — **do not "tidy" the casing, it is not a bug.**
3. `git rm` the six files from `public/fonts/`.
4. `grep -rn "stolzl_" src/ public/ index.html` returns **zero**.

**Files:** `src/styles/colors_and_type.css`, `public/fonts/*` (deleted), `STATUS.md`
**Commit:** `chore: remove self-hosted stolzl otf files`
**Done when:** no Stolzl `@font-face` remains, six files gone, grep clean.

---

## Part 4 — Full weight sweep and remap

**Do not start from this brief's table. Build your own.**

1. **Enumerate every weight declaration** across `src/styles/**` and any inline/JSX weights — not
   just the main bundle. Include lazy route stylesheets.
2. **For each one, establish the resolved `font-family`**, following inheritance where the rule
   does not set it directly.
3. **Produce a table**: file, line, weight, resolved family, action (remap / leave / n/a).
4. **Remap only Stolzl rules:** 100 → 300, 600 → 500, 450 → 400, 700 → 500.
5. **Leave every non-Stolzl rule alone.** Inter 600 and 700 are backed by the Google import.
   `going-further-section.css:139` (`.pablo-mark`) is known to be Inter — verify and leave it.
6. **Report any disagreement with this brief's table.** The brief was built from the shipped bundle
   and is known incomplete. Your sweep supersedes it.

**Files:** `src/styles/*`, components with inline weights, `STATUS.md`
**Commit:** `fix: remap stolzl weights to the three licensed faces`
**Done when:** the table exists in the commit body or audit doc, every Stolzl weight has a face,
and no non-Stolzl rule was altered.

---

## Part 5 — Verify

1. `npm run build` clean.
2. Deploy preview.
3. **Network panel, filter `typekit`:** CSS and fonts from `use.typekit.net`. **Zero requests for
   `stolzl_*.otf`.**
4. **No synthesised weights.** DevTools → Elements → Computed → Rendered Fonts on a heading, body
   text, a nav item, **and one element on a lazy route** (Expertise or Product). Each shows Stolzl
   at the requested weight. Screenshot each.
5. **Inter unchanged.** Check one Inter element still renders at its original weight.
6. Total font bytes before vs after. Expect a large drop from ~220 KB.
7. **PSI mobile on the preview**, compared against the **post-`mobile-load-fix`** figures — not the
   original 81 baseline.
8. Visual check at 1440 and 390: headings, body, nav, hero, and one lazy route page.

**Files:** `docs/audit/fonts-adobe-results.md`, `STATUS.md`
**Commit:** `docs: adobe fonts verification`
**Done when:** Adobe serving confirmed, zero OTF requests, no faux weights on eager or lazy routes,
Inter unchanged, before/after numbers recorded.

---

## Independent review trigger

**Yes.** A faux-weight regression is invisible at a glance and permanent once shipped, and R01
already proved this brief's own audit could be wrong. Claude Chat checks the Part 4 table, the
Rendered Fonts evidence and the before/after screenshots before close.

---

## Rollback

`git revert` the range. The OTF files and local `@font-face` blocks return from history. The site
renders as today — including the licence problem, which is why rollback is a last resort.
