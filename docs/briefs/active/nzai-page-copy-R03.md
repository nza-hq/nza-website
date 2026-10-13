# Brief — NZ:AI page: Rev C copy and showcase re-plan

**Repo:** `nza-hq/nza-website`
**Mode:** Product (standard ceremony per the NZA Development Bible)
**Author:** Claude Chat, 13 October 2026
**Authorised by:** Chris Scott
**Revision:** R03 (supersedes R02, withdrawn 13 Oct before use; R01 `nzai-showcase_COMPLETED.md` is archived)
**Design note (canonical):** Notion → Products → NZ:AI → "NZ:AI web page — copy deck & storyboard (Rev C)"

---

## BEFORE DOING ANYTHING

- [ ] Read this brief in full. Confirm receipt by quoting its title and the first paragraph of **Goal** back.
- [ ] Detect the OS and shell. Use PowerShell syntax on Windows, bash/zsh on Mac. Never assume bash.
- [ ] Read `CLAUDE.md` and `STATUS.md`.
- [ ] Run session-start reconciliation: list `docs/briefs/active/`, read `docs/briefs/current.md`, read the last 30 lines of `STATUS.md`, `git log --oneline -20`. `active/` currently holds `launch-day.md` and `fonts-adobe.md`. If it holds anything else, STOP and surface it.
- [ ] Confirm a clean working tree and that `main` is in sync with `origin/main`.
- [ ] Read the design note in Notion (link above) if you have access. If you don't, this brief carries every word of copy you need. The brief is sovereign.
- [ ] Read these files before editing any of them:
  - `src/data/products/nzaiConfig.tsx`
  - `src/components/product/ProductPage.tsx` (the `ProductPageConfig` type and the closer render)
  - `src/components/product/ManifestoBlock.tsx` (body accepts `string | ReactNode`)
  - `src/styles/manifesto-block.css` (`.manifesto-block-body p + p` spacing already exists)
  - `src/routes/NzAiPage.tsx`
  - `docs/videos-nzai-README.md`
- [ ] Land this brief at `docs/briefs/active/nzai-page-copy-R03.md` and point `docs/briefs/current.md` at it, as Part 1's first change.

---

## Goal

The `/nz-ai` page is built but hidden ("coming soon"). Its copy predates a positioning reset agreed with Chris between 6 and 13 October 2026. It still says "Climate action is an *inside* job.", shows four showcase items built around EOC-era tools, and closes on three named client case studies that are now on hold.

This brief replaces the page's copy with the Rev C copy deck and re-plans the showcase around five new clips. It points the video slots at new filenames, with placeholders until the real recordings exist. It also hides the case studies. The page **stays hidden** after this brief. Going live is a separate, deliberate switch once the real clips exist.

---

## Why this — intent, not just instructions

**The visitor is a newcomer.** They may not know what NZA is or what "net zero" means. Every line has to make sense to someone with no sustainability background. If a line you're asked to render seems to need context, render it verbatim and flag it. Don't add explanatory copy.

**The selling point, in one breath:** most organisations know they need to act on energy costs, carbon and climate risk, but can't see where they stand or where to start. NZA builds software around the organisation that makes it clear, and brings the expertise to act on it. Every slot below serves that sentence.

**The client's people are the heroes.** NZA equips them, and only acts as the sustainability function itself where there's no one to do it. That's why Embed reads "so they can lead the change themselves".

**Decode / Build / Embed is repeated here on purpose.** The homepage introduces the three stages. This page is the whole sell for NZ:AI, so the stages come back as three short lines in the manifesto. The names must match the homepage exactly: Decode, Build, Embed (not "Partner").

**The showcase answers five questions.** Each one is a question an organisation couldn't answer before:
- what feeds what, and what does it cost?
- where do our emissions come from?
- what could go wrong, and where?
- what gets us to net zero?
- can I just ask my data?

Each clip is a different kind of movement: a map with a chart, a zoom and morph, a map with pins, sliders with a line, and a typed question answered on a map. Order matters, and 05 is the finale. Don't reorder.

**AI is mentioned in exactly two places, on purpose:** the last manifesto line and clip 05. NZA's agent already queries client records today, and clients can point their own AI at the same record. That is the forward-looking reason the structured record matters. Don't add AI mentions anywhere else.

**Case studies are hidden, not deleted from history.** Chris has held public case studies until each client signs off. The card text is preserved in the Notion design note. Remove it from the config entirely (CLAUDE.md: delete old code, don't leave it commented out).

**"Intelligence you own" is deliberate.** Clients own their data, database and data rules. NZA owns the code, which the client can buy. Don't soften the tagline.

---

## Scope

### IN
- Hero: tagline, one-liner, CTA label and href.
- Manifesto: new headline and a multi-paragraph body (ReactNode).
- Transition ("letsShow") trailing text.
- Steps: five headlines and bodies (four replaced, one new); new video file paths and alt text.
- Placeholder video files renamed to the new filenames, plus one new placeholder for 05, with labels regenerated if ffmpeg is available.
- `docs/videos-nzai-README.md` updated: new filenames and new shot list.
- Closer: new subhead; CTA label and href; `caseStudies` removed.
- `STATUS.md`, `current.md`, brief archive.

### OUT
- **Making the page live.** `NzAiPage.tsx` stays as `ProductComingSoon`. Nav entries stay "Coming soon". `ProductsScreen` `ready` stays `false`.
- Hero laptop screenshots (`hero.screens`). They stay as they are; replaced in a later brief once the real stills exist.
- Recording real clips. That's separate per-tool briefs in other repos.
- Any template, CSS or component change. If the copy doesn't fit without one, escalate. Don't patch.
- PABLO and decodED pages and configs.
- Client logo files in `public/assets/clients/`. Don't touch them, even though the config no longer references three of them.

---

## Design decisions already agreed (do not reopen)

| # | Decision |
|---|---|
| D1 | Tagline: `Expertise you can act on. Intelligence you own.` |
| D2 | Primary CTA everywhere on this page: `Book a discovery call` → `/contact?product=nzai` (ContactPage already maps `nzai` to "NZ:AI"). Replaces the `info@` mailto, which may not be working. |
| D3 | Manifesto headline: `The tools to act, <em>built</em> around you.` The `<em>` takes the site's italic-emphasis treatment automatically. |
| D4 | Manifesto body = one problem paragraph + three stage lines (bold label + sentence) + one why-now line + one ask-your-data line. Six `<p>` elements. |
| D5 | Stage labels are `<strong>` text at the start of each line, followed by a space. No new class, no colour change. Inherit the manifesto's white body text. |
| D6 | Five steps, in this order: 01 energy map · 02 carbon traced · 03 risk mapped · 04 options tested · 05 ask your data. |
| D7 | Video filenames: `01-energy-map`, `02-carbon-traced`, `03-risk-mapped`, `04-options-tested`, `05-ask-your-data` (each `.mp4`, `.webm`, `-poster.jpg`) under `public/videos/nzai/`. |
| D8 | Closer keeps the headline `Start with a conversation.`; case studies removed; no `clientLogos` either (nothing renders below the subhead except the CTA). |
| D9 | Page stays hidden. |

---

## Principles / constraints

- **Copy is verbatim.** Use straight apostrophes, as the existing config does. No em dashes in rendered copy: the site uses spaced hyphens. The copy below has none, so keep it that way.
- First-person "we" is sanctioned on `/nz-ai` only (CLAUDE.md). It's used here on purpose.
- No emoji. Coral only for italic emphasis.
- AI appears in rendered copy in exactly two places: manifesto paragraph six and step 05. Don't add, remove or reword either.
- Never `npm install` from a Linux VM and push a lockfile. This brief needs no dependencies.
- Stay on `main`. One commit per Part. Push after each.

---

## Parts

### Part 1 — Land brief; hero, transition and closer copy

**Files:** `docs/briefs/active/nzai-page-copy-R03.md` (new), `docs/briefs/current.md`, `src/data/products/nzaiConfig.tsx`

**Steps**
1. Land this brief and update `current.md` to list it as active, alongside the existing entries.
2. In `nzaiConfig.hero`:
   - `tagline`: `Expertise you can act on. Intelligence you own.`
   - `oneLiner`: `Energy, carbon and climate intelligence, built around your organisation and run as your extended sustainability function.`
   - `ctaLabel`: `Book a discovery call`
   - `ctaHref`: `/contact?product=nzai`
   - `microLabel`, `name`, `logoSrc`, `screens`: **unchanged**.
3. In `nzaiConfig.letsShow`: `leadingText` stays `Let's show you`; `pillLabel` stays `Request Demo`; `pillHref` stays `/contact?product=nzai`; `trailingText`: `what we build`.
   - Note: the current `leadingText` is `Let's show you what`. Change it to `Let's show you` so the line reads "Let's show you [Request Demo] what we build".
4. In `nzaiConfig.closer`:
   - `headline` unchanged: `Start with a conversation.`
   - `subhead`: `Every partnership starts with a discovery call and a working session with your team. From there, we build what is needed first and keep building as your ambition grows.`
   - Delete the entire `caseStudies` array. Don't add `clientLogos`.
   - `ctaLabel`: `Book a discovery call`
   - `ctaHref`: `/contact?product=nzai`
   - Delete the `CLIENT_LOGO_BASE` constant if nothing else uses it.
5. Rewrite the file-header doc comment and the inline comments that describe the old copy, so they describe Rev C. Keep them short and point to this brief.

**Commit:** `nz-ai: Rev C hero, transition and closer copy; case studies held (brief R03 part 1)`

**Done when:**
- `tsc` passes.
- `grep -n "caseStudies\|CLIENT_LOGO_BASE\|mailto" src/data/products/nzaiConfig.tsx` returns nothing.

### Part 2 — Manifesto

**Files:** `src/data/products/nzaiConfig.tsx`

**Steps**
1. `manifesto.microLabel` unchanged: `WHY NZ:AI`.
2. `manifesto.headline`:
   ```tsx
   <>
     The tools to act, <em>built</em> around you.
   </>
   ```
3. `manifesto.body` becomes a fragment of six paragraphs:
   ```tsx
   <>
     <p>
       Energy costs, carbon and climate risk are hard to see and harder to act on. Most
       organisations don't know where to start. NZ:AI changes that.
     </p>
     <p>
       <strong>Decode.</strong> We learn how your organisation works and gather what it
       already knows.
     </p>
     <p>
       <strong>Build.</strong> We create bespoke software around your data: maps, models
       and live dashboards that show where you stand, what it costs and what to do next.
     </p>
     <p>
       <strong>Embed.</strong> We work alongside your people, so they can lead the change
       themselves.
     </p>
     <p>
       Software like this was once only affordable for the largest organisations. Now it
       can be built for yours.
     </p>
     <p>
       And because everything sits in one structured record, you can ask it questions in
       plain English, or point your own AI at it.
     </p>
   </>
   ```
4. `accentColor` unchanged.

**Commit:** `nz-ai: Rev C manifesto with Decode / Build / Embed (brief R03 part 2)`

**Done when:**
- It renders as six paragraphs with the existing `p + p` spacing.
- "built" carries the italic emphasis.
- The three labels are bold.
- It fits the manifesto section at 1280×800 and 393×705 without clipping (see Verification).

### Part 3 — Showcase steps and placeholder videos

**Files:** `src/data/products/nzaiConfig.tsx`, `public/videos/nzai/*`, `docs/videos-nzai-README.md`

**Steps**
1. Replace the four existing `steps` entries with the five below. Keep the field shape: `number`, `headlinePrefix`, `highlightedVerb`, `headlineSuffix`, `body`, `video{mp4, webm, poster, alt}`. Paths use `VIDEO_BASE`.

| number | headlinePrefix | highlightedVerb | headlineSuffix | body | video base | alt |
|---|---|---|---|---|---|---|
| 01 | `Where your energy ` | `goes` | `.` | `Most organisations can't say what feeds what, or what it costs. Here every supply, building and meter sits on one map, with the cost behind each a click away.` | `01-energy-map` | `A site map where selecting a supply point highlights the buildings it serves and opens a monthly cost chart` |
| 02 | `Every tonne, ` | `traced` | `.` | `Follow emissions from the total for the whole organisation down to one site, one supplier and the spend behind it, and see where the biggest reductions lie.` | `02-carbon-traced` | `A carbon inventory moving from bar chart to donut to Sankey, then drilling down to a single supplier` |
| 03 | `Risk, ` | `mapped` | `.` | `The people who know a site best record what they see: past flooding, exposed trees, loose items. Each building gets a clear rating and a place on the risk register.` | `03-risk-mapped` | `A site map where recorded observations give each building a red, amber or green climate risk rating` |
| 04 | `Every option, ` | `tested` | `.` | `Switch measures on, adjust their scale and watch the path to net zero respond. The chosen measures become actions, each with an owner.` | `04-options-tested` | `A net zero trajectory bending down to its target as measures are switched on, then listed as actions with owners` |
| 05 | `Ask, and it ` | `answers` | `.` | `Ask a question in plain English, such as which buildings have both meter and occupancy data, and the answer appears on the map from your own record. Your own AI can read it too.` | `05-ask-your-data` | `A plain-English question typed over an estate map, with the matching buildings highlighted and a small chart beside each` |

2. Rename the placeholder files with `git mv`, keeping the format, in this mapping:
   - `01-living-reports` → `01-energy-map`
   - `02-carbon-inventory` → `02-carbon-traced`
   - `03-estate-intelligence` → `03-risk-mapped`
   - `04-performance-tracking` → `04-options-tested`

   Do this for all three files per item: `.mp4`, `.webm` and `-poster.jpg`.

   Then create the 05 placeholder (`05-ask-your-data.mp4`, `.webm`, `-poster.jpg`):
   - **If ffmpeg is available,** generate it fresh, labelled "05 Ask your data", using the README commands.
   - **If not,** copy the 04 placeholder files to the 05 names (`cp`/`Copy-Item`, then `git add`) and note the stale label in STATUS.md.
3. **If ffmpeg is available on this machine**, regenerate each of the first four placeholders' labels to the new number and title, using the commands already in `docs/videos-nzai-README.md`. Use the same mid-grey `#4A4A4A` card at 1080×1080. **If ffmpeg isn't available**, keep the renamed files with their old labels. Add one line to STATUS.md saying the placeholder labels are stale. Don't install anything.
4. Update `docs/videos-nzai-README.md`:
   - **Filenames block:** use the new names.
   - **Shot list:** replace it with the five sequences below.
   - **Anonymisation:** keep the existing rules and add the per-clip rules below.
   - **Method note:** these clips are recordings of real NZA tools run in a "showcase mode" (1080×1080 viewport, chrome hidden, larger type, illustrative data), driven by a scripted Playwright run and encoded with ffmpeg. They're produced in each tool's own repo, not here.

   Shot list:
   - **01 Energy map:** site map → select supply point A → the buildings it serves highlight and supply lines pulse → a monthly cost bar chart slides out → select supply point B → highlight and chart swap. Final frame: B's buildings lit, cost chart open.
   - **02 Carbon traced:** bars rise by scope → swivel into a donut → flow into a Sankey → zoom into one site → one supplier with its spend → its trajectory. Final frame: the supplier view with trajectory.
   - **03 Risk mapped:** invented site map → pins drop as observations are recorded → buildings take red/amber/green ratings → one opens its risk-register entry. Final frame: the rated site with one entry open.
   - **04 Options tested:** business-as-usual line climbs → measures toggle on, sliders move → the line bends onto the science-based target → chosen measures slide up as an action list with owners' initials. Layout stacked vertically, chart on top. Final frame: trajectory on target with the action list.
   - **05 Ask your data:** estate map at rest → a question types itself into a panel ("Which buildings have meter and occupancy data?") → brief working state → matching buildings glow, the rest dim → a small sparkline card opens beside each match → a one-line answer appears. Final frame: highlighted buildings, their cards and the answer line. The answer must be genuinely produced by NZA's agent querying the record; the panel only displays it.

   Per-clip anonymisation:
   - **01:** real geometry is acceptable only after the imagery licence is confirmed for marketing use and the client is notified. Use illustrative figures.
   - **02:** no geometry. Use scaled figures and no site names.
   - **03:** entirely invented.
   - **04:** generic measure names, changed numbers, no office names.
   - **05:** same rules as 01 if it uses real geometry; otherwise invented.

**Commit:** `nz-ai: re-plan showcase around five new clips; placeholders renamed (brief R03 part 3)`

**Done when:**
- `grep -rn "living-reports\|carbon-inventory\|estate-intelligence\|performance-tracking" src docs/videos-nzai-README.md` returns nothing.
- All fifteen new files exist in `public/videos/nzai/`.
- No old-named files remain.

### Part 4 — Verify, record, close

**Files:** `STATUS.md`, `docs/briefs/current.md`, `docs/briefs/archive/nzai-page-copy-R03_COMPLETED.md`

**Steps**
1. Run the Verification section below.
2. Add a STATUS.md entry: "NZ:AI Rev C copy + showcase re-plan (brief R03): shipped, page still hidden." Include:
   - the verification results
   - any stale-placeholder note
   - the next step: "Real clips recorded in source-tool repos → drop in at the same filenames → separate launch brief flips `/nz-ai` live, restores nav links, sets `ready: true`, replaces hero screens."
3. Move the brief from `active/` to `archive/` as `nzai-page-copy-R03_COMPLETED.md`. Update `current.md`.

**Commit:** `nz-ai: brief R03 verified and archived`

**Push:** once, after this Part, if you haven't pushed per Part. Otherwise push as normal.

---

## Verification (non-negotiable)

The page is hidden, so verify it through a **temporary local preview**:
- Change `NzAiPage.tsx` to render `<ProductPage config={nzaiConfig} />`.
- Run `npm run dev` and do the checks.
- **Revert `NzAiPage.tsx` before committing.**
- `git diff HEAD --stat` at each commit must not list `NzAiPage.tsx`.

Browser checks at **1280×800** and **393×705** (use the DevicePreview widget for phone). Take a screenshot at each breakpoint for items 2, 3, 6 and 8, and attach them in the final report.

1. Hero tagline reads exactly `Expertise you can act on. Intelligence you own.`
2. The hero one-liner is verbatim. The CTA reads `Book a discovery call` and goes to `/contact?product=nzai`, where the subject shows NZ:AI.
3. The manifesto headline shows "built" in the italic-emphasis treatment.
4. The manifesto body has six paragraphs. Decode, Build and Embed are bold. No paragraph is clipped or overlaps the next section at either size.
5. Manifesto copy matches the brief character for character. Check apostrophes and colons.
6. The transition reads "Let's show you [Request Demo] what we build", with the pill in the middle.
7. The five steps render in order 01–05. Each verb (goes, traced, mapped, tested, answers) is in NZ:AI teal. The pinned frame advances through all five on desktop and each video plays inline on phone.
8. Each step's placeholder video loads from its new filename. DevTools Network shows no 404s for `/videos/nzai/`.
9. The closer shows the headline, the new subhead and the CTA, and **no** case-study cards or logos.
10. The closer CTA goes to `/contact?product=nzai`.
11. `prefers-reduced-motion: reduce` still short-circuits the animations to their final state.
12. The console is clean on load and while scrolling the full page.
13. After reverting the preview, `/nz-ai` still shows the Coming Soon screen.
14. The nav "Our solutions" entries are still "Coming soon".
15. `npm run build` produces a clean `dist/`. `tsc` is clean.

**Pass:** all 15 are true. **Fail:** any one is false. Fix it, or escalate under the rules below.

---

## What MUST NOT happen

- Committing `NzAiPage.tsx` changes, or making `/nz-ai` reachable as a full page.
- Restoring nav links or setting `ready: true` on any product card.
- Editing `ProductPage.tsx`, `ManifestoBlock.tsx`, `ProductStepsSection.tsx`, or any CSS file.
- Editing PABLO or decodED configs.
- Deleting or renaming anything in `public/assets/clients/`.
- Changing `hero.screens`.
- Paraphrasing, "improving" or extending any copy, adding any mention of AI beyond the two specified, or adding em dashes.
- Running `npm install`, or committing `package-lock.json`.
- Force-pushing or `git reset --hard`.

---

## When to escalate / stop

Stop and ping Chris, describing what you saw and the options, if:
- The manifesto body clips or overflows at either breakpoint without a CSS change. Don't shorten the copy yourself.
- The steps section doesn't handle a fifth step cleanly (layout, pinning or progress indicator breaks) without a component change.
- `ProductPageConfig` rejects the closer with `caseStudies` removed (type error), and the only fix is a template change.
- `ContactPage` doesn't map `?product=nzai` to NZ:AI.
- `docs/briefs/active/` contains anything other than `launch-day.md` and `fonts-adobe.md`.
- Any step needs a dependency, or a change outside the files listed in each Part.
- The same failure happens twice. Stop, flag it in the session output, and file it to the Lessons database as Proposed.

---

## Independent review

This brief is a copy and config change with no logic, money or data flow, so it falls in the **standard** tier: Claude Code's browser verification plus the screenshots. No fresh-eyes source review is required. Chris signs off from the screenshots.

---

## Final report (post in-session when done)

- Commits with hashes.
- The 15 verification items, each marked pass or fail.
- Screenshots: hero, manifesto, transition and closer, at both sizes.
- Whether the placeholder labels were regenerated or are stale.
- Confirmation that `NzAiPage.tsx`, the nav and the `ready` flags are untouched.
- Anything you'd flag for the launch brief.
