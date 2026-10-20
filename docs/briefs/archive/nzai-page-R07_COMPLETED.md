# Brief R07: NZ:AI page to Rev E, real clips in, private preview

**Repo:** `nza-hq/nza-website`
**Mode:** Product (copy, assets, one small route change). Standard ceremony.
**Author:** Claude (Chris's session), 19 October 2026
**Authorised by:** Chris Scott
**Revision:** R07. **Supersedes R06, which was never run; withdraw it.** It carries R06's copy and README work unchanged, and adds three things:
- the real clips 02–05
- a relabelled placeholder for clip 01
- a `?preview=1` view, so Chris can test the page on his own devices while it stays hidden

**Design note (canonical):** Notion → Products → NZ:AI → "NZ:AI web page — copy deck & storyboard (Rev E)"
**Run after:** IVG brief **S05** has closed, because it produces clips 02 and 03. If S05 hasn't closed, stop at the BEFORE checklist.

---

## BEFORE DOING ANYTHING

- [ ] Read this brief in full. Confirm receipt by quoting its title.
- [ ] Detect the shell. This runs on Chris's Windows machine, so use PowerShell syntax.
- [ ] Read `CLAUDE.md`, the last 40 lines of `STATUS.md` and `docs/briefs/current.md`. Run `git log --oneline -6`.
- [ ] Read `src/data/products/nzaiConfig.tsx`, `src/routes/NzAiPage.tsx`, `src/routes/ProductComingSoon.tsx` and `docs/videos-nzai-README.md` in full.
- [ ] Confirm the tree is clean and `origin/main` is at `5004409` or later. If `main` has moved and touched any file named in this brief, **stop** (see Escalate).
- [ ] **Find the twelve source clip files and confirm each one exists.** Paste a listing with sizes into the report.

  | Clip | Source folder (Chris's machine) |
  |---|---|
  | 02 `02-carbon-traced.{mp4,webm,-poster.jpg}` | `showcase\out\` of the IVG worktree S05 ran in. S05's final report prints the path; most likely `C:\Users\ChrisScott\Dev\nza-hq\ivg-esg-tool\showcase\out\` |
  | 03 `03-risk-mapped.{mp4,webm,-poster.jpg}` | same as 02 |
  | 04 `04-options-tested.{mp4,webm,-poster.jpg}` | `C:\Users\ChrisScott\Dev\nza-hq\_clips\` (re-encoded 19 Oct from the EOC showcase branch @ `2574267`, S04 Rev C) |
  | 05 `05-ask-your-data.{mp4,webm,-poster.jpg}` | `C:\Users\ChrisScott\Dev\nza-hq\hartpury-showcase\showcase\out\` (Hartpury S01) |

  For 02 and 03, check that the files' modified time is **after** S05's close commit. The 15 Oct S02/S03 takes are the old storyboard and must not be used. If anything is missing or older, **stop** and say which.

- [ ] Land this brief at `docs/briefs/active/nzai-page-R07.md` as the first commit: `docs: land brief R07 (NZ:AI Rev E, real clips, preview)`.

---

## Goal

Get the hidden `/nz-ai` page into the state Chris can test end to end:
- the Rev E copy
- four real showcase clips
- an honest placeholder for clip 01, which is waiting on the Hartpury code rework
- a private preview URL (`/nz-ai?preview=1`) that renders the full page on any device, while plain `/nz-ai`, the nav and the products screen still say "coming soon"

## Why this matters (intent)

Chris hasn't yet seen the page working with real footage. The clips were recorded in three different repos, and nobody has watched them in the real sticky frame, on a phone, on a slow connection, or next to the copy.

This brief makes that test possible **without launching**. Launch stays a separate, deliberate switch: un-hide, nav, `ready` flags, the Hartpury heads-up, the React warnings. That is a later brief.

The copy is the end of a long, line-by-line process with Chris. Every clip body follows one pattern:
1. set the scene for a newcomer;
2. say what NZA does *with the client's team*;
3. say what the client can act on.

**Paste it exactly.** Don't improve it, shorten it or fix punctuation. If a string looks wrong, escalate.

---

## Scope

**IN**
- `src/data/products/nzaiConfig.tsx`: the copy, per Part 1. Unchanged from R06.
- `docs/videos-nzai-README.md`: per Part 2. R06's changes, plus the placeholder wording.
- `public/videos/nzai/`:
  - replace the 02–05 files with the real clips;
  - regenerate the 01 placeholder with its Rev E label.
- `src/routes/NzAiPage.tsx`: the `?preview=1` gate, per Part 4.
- Verification, STATUS, archive, push.

**OUT**
- Hero, transition (`letsShow`) and closer copy. Leave them byte for byte.
- Any video path in the config. Filenames are unchanged.
- The nav, `ProductsScreen`'s `ready: false` and any link to `/nz-ai`. **Nothing on the site may link to the preview.**
- Templates, CSS and components, including the React `stroke-linecap` / `stroke-linejoin` warnings. Those belong to the launch brief.
- Re-encoding or editing any real clip. Copy the files byte for byte.
- Hero laptop screenshots.

---

## Design decisions already agreed (do not reopen)

1. **Copy is Rev E**, exactly as in Part 1:
   - the manifesto is one plain-string paragraph;
   - AI is mentioned in step 05 only;
   - in step 02 the highlighted verb is two words, `act on`, and that is intended;
   - "we" is sanctioned on `/nz-ai` only;
   - spaced hyphens, never em dashes, in rendered copy;
   - no emoji.
2. **Clip 01 stays a placeholder** until the Hartpury rework settles (Chris, 19 Oct). The placeholder is the existing grey-card style, relabelled. It must read as a placeholder, not pretend to be footage.
3. **The preview is a query flag on the existing route, not a new route or a branch deploy.**
   - CLAUDE.md says "stay on `main`", so a Vercel branch preview is out.
   - A flag on the existing route works on Chris's phone with no setup, and the launch brief deletes it in one line.
   - Trade-off, accepted: the URL is unlisted, not secret. Anyone who guesses `?preview=1` sees the page. Mitigations:
     - nothing links to it;
     - the preview sets `noindex, nofollow`;
     - Chris holds the Hartpury heads-up before he shares it with anyone.
4. **Real clips are copied byte for byte.** Their honesty and anonymisation were verified in their own repos (S01, S04, S05). This brief checks that they are the right files and meet the spec. It doesn't re-judge their content.

---

## Principles / constraints

- Strings are pasted verbatim. `git diff` touches only the lines named in each Part.
- No `npm install`, no lockfile changes, no new dependency. The `noindex` tag is set with a plain `useEffect` on `document.head`, not a library.
- Delete old code before writing new. When replacing a component, search for references to the old name and remove them in the same commit (CLAUDE.md).
- Never force-push or `git reset --hard`.

---

## Parts

### Part 1: config copy to Rev E

**File:** `src/data/products/nzaiConfig.tsx`

**a) Header comment.** Replace the block comment above `export const nzaiConfig` with:

```
/**
 * NZ:AI product page config - copy deck Rev E (brief R07, 19 Oct 2026).
 *
 * Message: NZ:AI turns what an organisation knows (its data and its people)
 * into intelligence it can act on. Each step body sets the scene for a
 * newcomer, says what NZA does with the client's team, then what the client
 * can act on. The five clips are examples of that method.
 * Filenames are unchanged from R03. Case studies are held pending client
 * sign-off. Page stays "coming soon".
 *
 * First-person "we" is sanctioned on /nz-ai per CLAUDE.md.
 * AI is mentioned in exactly one place: step 05.
 */
```

**b) `manifesto.body`.** Replace the whole JSX fragment with this single string:

> Energy costs, carbon and climate risk are hard to see and harder to act on. NZ:AI brings what your organisation knows, from its data and its people, into one connected record. We learn how you work, build the tools you need around it, and stay alongside your team as they lead the change.

Leave `microLabel`, `headline` and `accentColor` unchanged.

**c) Steps.** Set exactly these values. Keep `number` and the `mp4`/`webm`/`poster` paths as they are.

**Step 01**
- `headlinePrefix`: `Your energy, `
- `highlightedVerb`: `decoded`
- `headlineSuffix`: `.`
- `body`: Most organisations see their energy as one meter and one bill. We help you put the right meters and sensors in place and bring it all into one record, so you can see what drives your demand and costs, and what to change.
- `alt`: A site energy network drawn as a flow diagram, from the incoming supply through substations to buildings, then one building's half-hourly profile with out-of-hours use shaded.

**Step 02**
- `headlinePrefix`: `Carbon data you can `
- `highlightedVerb`: `act on`
- `headlineSuffix`: `.`
- `body`: A carbon footprint is usually a single number in a report. We build yours as a record you can explore, down to any site, vehicle or supplier, with the spend, commitments and data quality behind it, so you know where to act.
- `alt`: A carbon inventory table opening into bars by scope, category and supplier, ending on one supplier's card showing its spend, target status and data quality.

**Step 03**
- `headlinePrefix`: `Climate risk, made `
- `highlightedVerb`: `local`
- `headlineSuffix`: `.`
- `body`: Climate change will affect every organisation differently. We work with your team to understand the risks to your sites, people, services and supply chain, combining future climate data with what you know, so you can plan how to adapt.
- `alt`: A site plan beside a climate risk chart. As the decades pass the risk rises, then the buildings nearest the woodland light up for wildfire, with notes from the site team, beside a projection of high fire-danger days to 2080.

**Step 04**
- `headlinePrefix`: `Every option, `
- `highlightedVerb`: `tested`
- `headlineSuffix`: `.`
- `body`: There is no single route to net zero. We model your emissions pathway with your team, so you can test each measure, adjust it and see straight away which levers make the biggest difference.
- `alt`: A carbon trajectory chart where four measures are switched on and adjusted one by one, bending the plan line down from red to green until it meets the net zero pathway.

**Step 05**
- `headlinePrefix`: `Put your data to `
- `highlightedVerb`: `work`
- `headlineSuffix`: `.`
- `body`: Most of what an organisation knows sits in spreadsheets, inboxes and people's heads. We bring it into one record you can ask questions of in plain English, or open up to your own AI.
- `alt`: **unchanged** (it already reads "…with the buildings that have floor plans and a meter highlighted and a small chart beside each").

**Commit:** `nz-ai: copy deck Rev E - one-paragraph manifesto, five step rewrites (brief R07 part 1)`

**Done when (paste the output of each into the report):**
- `npx tsc --noEmit` is clean.
- `grep -n "AI" src/data/products/nzaiConfig.tsx | grep -v "NZ:AI"` returns exactly two lines: the header comment's "AI is mentioned in exactly one place" line and the step 05 body.
- `grep -n "Decode\|Embed\|once only affordable\|Ask, and it\|Where your energy\|Every tonne\|Risk, '" src/data/products/nzaiConfig.tsx` returns nothing.
- `grep -c "—" src/data/products/nzaiConfig.tsx` returns `0`. No em dash anywhere in the file.
- `git diff HEAD~1 --stat` lists only `nzaiConfig.tsx`.

### Part 2: video README to Rev E

**File:** `docs/videos-nzai-README.md`. Change only what is listed here. "Asset spec" (the table), "Filenames" and "Regenerating the placeholders" stay as they are, except for the two wording fixes in step 1.

1. **Wording fixes.**
   - Intro: also replace "**The files in `public/videos/nzai/` are placeholders** (grey label cards) so the layout is verifiable before real footage exists — replace them with real recordings at the **exact same filenames**." with "Clips 02–05 in `public/videos/nzai/` are real recordings. **Clip 01 is a labelled placeholder card** until its recording exists; it drops in at the exact same filename." (match the existing line breaks; the sentence may wrap).
   - Intro: "The `/nz-ai` page's four showcase items" → "The `/nz-ai` page's five showcase items".
   - Asset spec heading: "## Asset spec (all four recordings)" → "## Asset spec (all five recordings)".
   - In the Duration row, append: `(up to ~12 s where the story needs it)`.

2. **"Shot list".** Replace the five bullets (keep the method paragraph beneath them) with:

- **01 Your energy, decoded** (source: Hartpury, the live `EnergyFlow` view; brief to follow). One supply bar ("the bill") → it opens into incomer → substations → buildings, band widths by energy → the biggest path lights up to one building with its own meter → that building's half-hourly profile, out-of-hours shaded, with chips for its other supplies. Figures illegible. Final frame: the profile beside the lit path. *Until it is recorded, the file at this name is a labelled placeholder card (see "Regenerating the placeholders").*
- **02 Carbon data you can act on** (source: IVG carbon inventory, briefs S02 + S05). Statement table → bar by scope → Scope 3 by category → Purchased goods by supplier → one supplier becomes a card: total spend, science-based target status, supplier-specific factors, and one bar of its spend split by invoice. Final frame: the card.
- **03 Climate risk, made local** (source: IVG climate-risk data for one real site, unnamed; briefs S03 + S05). Site plan with the risk spider → 2030s, 2050s, 2080s: the spider grows and the buildings warm → wildfire selected: the buildings nearest the woodland light up, with notes from the site team → a chart of high fire-danger days a year to the 2080s, one line per emissions scenario. Final frame: the chart beside the highlighted buildings.
- **04 Every option, tested** (source: the EOC strategy playground, brief S04; done). Four measures switch on and adjust one by one; the plan line bends from red through amber to green onto the net zero pathway. Final frame: on the pathway.
- **05 Put your data to work** (source: Hartpury Estate Explorer, brief S01; done). The question "Which buildings have floor plans and a meter?" types itself → a short working state → the matching buildings glow and the rest dim → a small card opens beside each → the answer line "Floor plans and a meter: {n} buildings". The answer is produced by an agent reading the record and checked by a test; the panel only replays it.

3. **"Anonymisation".** Replace the whole bullet list with:

- No client logos, names, marks, URLs or identifying branding anywhere in frame.
- No third-party framework marks (including GRESB's).
- Real data only, never invented figures, except where a clip's design note records an element as illustrative (02's supplier flags; 03's woodland outline).
- Never show gaps or missing data. Frames show what is held.
- No aerial or satellite imagery, and no third-party drawings, until their licence is confirmed for marketing use.
- 01 and 05 (Hartpury): every £, kWh, m² and count illegible, except clip 05's answer count.
- 02 (IVG): tonnes and spend nudged per row, suppliers lettered, sites numbered.
- 03 (IVG): real site geometry and climate data allowed; the site is never named.
- 04 (EOC): real figures allowed; the client is never named and offices are not named.

**Commit:** `docs: video README to copy deck Rev E (brief R07 part 2)`

**Done when (paste the outputs):**
- `grep -n "four" docs/videos-nzai-README.md` returns nothing.
- `grep -n "entirely invented\|never a real client's numbers\|Ask, and it\|Every tonne\|Risk mapped" docs/videos-nzai-README.md` returns nothing.
- The "Filenames" code block is byte-identical to before. Check with `git diff HEAD~1 -- docs/videos-nzai-README.md`: no hunk touches it.


### Part 3: real clips 02–05 in, clip 01 placeholder relabelled

**Files:** `public/videos/nzai/*`. Exactly fifteen files, no others.

1. **Copy the twelve real files** (02–05, three each) from the source folders in the BEFORE checklist into `public/videos/nzai/`, overwriting the placeholders. Copy them byte for byte, then compare the SHA-256 of source and destination.
2. **Regenerate the clip 01 placeholder** using the method in the README's "Regenerating the placeholders" section (a .NET `System.Drawing` poster, then ffmpeg).
   - The card is 1080×1080, mid-grey `#4A4A4A`, with three centred lines in white:
     - `01`
     - `Your energy, decoded`
     - `Recording to follow` (smaller)
   - Encode an 8 s silent loop to `01-energy-map.mp4` and `.webm`, with the poster at `01-energy-map-poster.jpg`.
   - Keep the generator script out of the repo, or in `scripts/` only if one already exists there. Say which.
3. Check every file against the spec with `ffprobe`. Pass when all of these are true; paste the table into the report:
   - 1080×1080;
   - H.264 for MP4, VP9 for WebM;
   - **no audio stream**;
   - duration ≤ 12.0 s;
   - each video file < 1.5 MB, each poster < 200 KB.

**Commit:** `nz-ai: real clips 02-05 in, clip 01 placeholder relabelled for Rev E (brief R07 part 3)`

**Done when:**
- the twelve SHA-256 pairs match;
- the ffprobe table passes;
- `git diff HEAD~1 --stat` lists only the fifteen video files.

### Part 4: private preview at `/nz-ai?preview=1`

**File:** `src/routes/NzAiPage.tsx` only.

- If the query string has `preview=1`, render `<ProductPage config={nzaiConfig} />`. Otherwise render the existing `<ProductComingSoon name="NZ:AI" micro="/NZ:AI" />`, unchanged.
- While previewing, add `<meta name="robots" content="noindex, nofollow">` to `document.head`, and remove it on unmount.
- Replace the file's comment with one that says:
  - what the flag is;
  - that it's for Chris's pre-launch testing;
  - that nothing may link to it;
  - that the launch brief deletes the flag and renders `ProductPage` unconditionally.

**Commit:** `nz-ai: unlisted ?preview=1 view for pre-launch testing, noindex (brief R07 part 4)`

**Done when:**
- `npx tsc --noEmit` is clean;
- `grep -rn "preview=1" src` returns only `NzAiPage.tsx`;
- `grep -rn "nz-ai?preview" src public` returns nothing.

### Part 5: verification, STATUS, close

1. Run `npm run dev`. Using the DevicePreview widget, take screenshots at:
   - **393×705:**
     - `/nz-ai` (Coming Soon)
     - `/nz-ai?preview=1`: the manifesto, whole section
     - steps 01, 02 and 05, each with its video frame
   - **1280×800**, all on `/nz-ai?preview=1`:
     - the manifesto
     - each of the five steps, with its video frame visible
2. Pass when all of these are true:
   - **(a)** Plain `/nz-ai` shows Coming Soon. The nav and the products screen are unchanged.
   - **(b)** At 393×705 the manifesto paragraph is fully visible. It isn't clipped and doesn't overlap the next section.
   - **(c)** Step 02's headline renders "act on" in the teal step-verb colour as one span, with a normal space before it and the full stop after it. Inspect the DOM.
   - **(d)** All five step bodies render verbatim at 1280×800. Check the DOM text against this brief.
   - **(e)** Each of steps 02–05 plays its real clip: the frame shows footage, not a grey card. Step 01 shows the "Your energy, decoded / Recording to follow" card.
     - Network tab: one video request per visible step, status 200, the WebM chosen where the browser supports it.
     - After playback, the frame holds on the clip's last frame.
   - **(f)** On `?preview=1`, `document.querySelector('meta[name=robots]').content` is `noindex, nofollow`. On plain `/nz-ai` there is no such tag.
   - **(g)** The console has no new errors. List the known `stroke-linecap` warnings; don't fix them.
   - **(h)** `npm run build` is clean.
3. Add an R07 entry to `STATUS.md`:
   - what changed and the commit hashes;
   - results (a)–(h);
   - the clip source table with the SHA-256 values;
   - "Page hidden; preview at /nz-ai?preview=1 for Chris; launch brief removes the flag".
4. `git mv docs/briefs/active/nzai-page-R07.md docs/briefs/archive/nzai-page-R07_COMPLETED.md`.
5. Update `docs/briefs/current.md`:
   - R07 goes under "Just shipped";
   - R05 moves to "Previously";
   - leave the launch-day and fonts lines unchanged;
   - add one line: "R06 withdrawn, superseded by R07, never run".
6. Push once with `git push origin main`, and confirm the output shows `main -> main`.
7. **After Vercel deploys,** open `/nz-ai?preview=1` on the production domain and confirm the clips play there too. Screenshot one step.

**Commit:** `nz-ai: brief R07 verified (phone + desktop + production preview), STATUS, archived`

---

## Verification (summary, all falsifiable)

| Check | Pass |
|---|---|
| `tsc --noEmit`, `npm run build` | clean |
| AI mentions (Part 1 grep) | exactly two lines |
| Retired-strings greps (Parts 1, 2) | no output |
| Em dash in config | 0 |
| 12 clip hashes, source = destination | all match |
| ffprobe table (15 files) | all within spec, no audio |
| Plain `/nz-ai` | Coming Soon |
| `?preview=1` | full page, `noindex` set |
| Steps 02–05 | real footage plays and holds last frame |
| Step 01 | relabelled placeholder card |
| Manifesto at 393×705 | fully visible (screenshot) |
| Production preview after deploy | clips play (screenshot) |

## What MUST NOT happen

- Linking to the preview from anywhere, or changing the nav, `ready` flags or `ProductsScreen`.
- Rendering the full page at plain `/nz-ai`.
- Using the 15 Oct S02/S03 takes, or any clip that fails the spec.
- Re-encoding, trimming or editing a real clip.
- Editing any string not listed, or "improving" a listed one.
- Touching templates, CSS or components.
- `npm install`, or committing a lockfile.
- Marking a check passed without its screenshot or command output.
- Force-pushing or `git reset --hard`.

## When to escalate / stop

- S05 hasn't closed, or any source clip is missing, older than expected, or fails the spec. Name the file.
- `origin/main` has moved past `5004409` and touched any file in scope.
- (b) fails: the manifesto doesn't fit on a phone. Report it with the screenshot; don't change CSS or the copy.
- (c) fails: the two-word verb renders badly. Report it with a DOM snippet; don't change `ProductPage.tsx`.
- (e) fails on production but passes locally (for example, a video 404s or plays with the wrong MIME type). Report it with the network entry; don't change `vercel.json`.
- Any string in this brief looks like a typo. Ask; don't fix it.

## Independent review

Standard tier: Claude Code's browser verification and screenshots. **Then Chris tests `?preview=1` himself, on his phone and laptop.** That is the point of this brief.

## Final report

- commit hashes (land, Parts 1–4, close)
- the source clip listing and the SHA-256 table
- the ffprobe table
- grep outputs from Parts 1, 2 and 4
- results (a)–(h), each with its screenshot or output
- the production preview screenshot
- the confirmation line `main -> main`
