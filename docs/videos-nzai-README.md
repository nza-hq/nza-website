# NZ:AI showcase videos — recording spec

The `/nz-ai` page's four showcase items each play a short video of a real tool
in the pinned frame. **The files in `public/videos/nzai/` are placeholders**
(grey label cards) so the layout is verifiable before real footage exists —
replace them with real recordings at the **exact same filenames**.

## Asset spec (all four recordings)

| Property | Value |
|---|---|
| Aspect ratio | 1:1 (square) |
| Source resolution | 1080 × 1080 |
| Duration | 6–10 seconds |
| Format | MP4 (H.264) **and** WebM (VP9) |
| Audio | None — strip the track entirely |
| File size | Under 1.5 MB per file per format |
| Final frame | Must be a meaningful still — it persists after playback |

Square is not arbitrary: the desktop frame is ~487×490px (sticky, 76vh, 60px
inset) and the mobile slot is `aspect-ratio: 1/1`. Square is the only ratio
that fits both without letterboxing.

## Filenames (exact — `nzaiConfig.tsx` references these)

```
public/videos/nzai/01-energy-map.mp4        + .webm   + -poster.jpg
public/videos/nzai/02-carbon-traced.mp4     + .webm   + -poster.jpg
public/videos/nzai/03-risk-mapped.mp4       + .webm   + -poster.jpg
public/videos/nzai/04-options-tested.mp4    + .webm   + -poster.jpg
public/videos/nzai/05-ask-your-data.mp4     + .webm   + -poster.jpg
```

Posters are the first frame, JPEG, 1080×1080, under 200KB.

## Shot list

- **01 Energy map** (source: Hartpury Estate Explorer, brief S01). Site map → select
  substation A → the buildings it serves light up → a monthly cost chart opens beside
  them → select substation B → the highlight and chart swap. Final frame: B's buildings
  lit, chart open.
- **02 Carbon traced** (source: IVG carbon inventory). Bars rise by scope → swivel into
  a donut → flow into a Sankey → zoom into one site → one supplier with its spend → its
  trajectory. Final frame: the supplier view with trajectory.
- **03 Risk mapped** (source: invented site, built on the decodED risk-register work).
  Pins drop as observations are recorded → buildings take red / amber / green ratings →
  one opens its risk-register entry. Final frame: the rated site with one entry open.
- **04 Options tested** (source: forked strategy playground). The business-as-usual line
  climbs → measures switch on and sliders move → the line bends onto the science-based
  target → the chosen measures slide up as an action list with owners' initials. Stacked
  layout, chart on top. Final frame: on target, with the action list.
- **05 Ask your data** (source: Hartpury Estate Explorer, brief S01). The question "Which
  buildings have floor plans and a meter?" types itself → a short working state → the
  matching buildings glow and the rest dim → a small card opens beside each → the answer
  line "Floor plans and a meter: {n} buildings". The answer is produced by an agent
  reading the record and checked by a test; the panel only replays it.

> Clips are recordings of real NZA tools in a showcase mode (1080×1080, chrome hidden,
> larger type, figures illegible), driven by a scripted Playwright run and encoded with
> ffmpeg. They are produced in each tool's own repo, not here. Drop finished files in at
> the exact names above; no code change is needed.

## Anonymisation — mandatory before any recording ships

- No client logos, names, or identifying branding anywhere in frame.
- No third-party framework marks (including GRESB's).
- Show the interface working; never a real client's numbers.
- Real data only, never invented figures. Every £, kWh, m² and count is illegible in
  frame, except clip 05's answer count.
- No aerial or satellite imagery until its licence is confirmed for marketing use.
- Never show gaps or missing data. Frames show what is held.
- 04: use generic measure names and changed numbers. No office names.
- 03: entirely invented.

## Regenerating the placeholders

The current placeholders are a 1080×1080 mid-grey (#4A4A4A) card with the item
number + title, generated with .NET `System.Drawing` (poster) + ffmpeg (looping
the poster to an 8s silent clip). To regenerate after editing a label, encode a
1080×1080 source frame `<base>-poster.jpg`, then:

```bash
ffmpeg -loop 1 -i <base>-poster.jpg -t 8 -r 30 -c:v libx264  -pix_fmt yuv420p -an -movflags +faststart -y <base>.mp4
ffmpeg -loop 1 -i <base>-poster.jpg -t 8 -r 30 -c:v libvpx-vp9 -pix_fmt yuv420p -b:v 0 -crf 42 -an -y <base>.webm
```

Real footage just drops in at the same names — no code change needed.
