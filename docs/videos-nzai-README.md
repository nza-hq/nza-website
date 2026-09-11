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
public/videos/nzai/01-living-reports.mp4        + .webm   + -poster.jpg
public/videos/nzai/02-carbon-inventory.mp4      + .webm   + -poster.jpg
public/videos/nzai/03-estate-intelligence.mp4   + .webm   + -poster.jpg
public/videos/nzai/04-performance-tracking.mp4  + .webm   + -poster.jpg
```

Posters are the first frame, JPEG, 1080×1080, under 200KB.

## Shot list (for Chris's recording)

- **01 Living reports** — a report scrolling; a chart responds to an input
  change; a section expands to reveal detail; ends on the PDF export animating
  out. Show it being *used*, not read.
- **02 Live carbon inventory** — bars load by scope; one highlights; morphs
  into a flowing Sankey; a click expands a branch; drills to supplier level.
- **03 Estate intelligence** — UK map with site pins; zoom to one site; 2D
  estate plan; click a building; interior spaces with data attached.
- **04 Performance tracking** — score bars climb across years; an action list
  populates; names assign to actions; a target line is met.

## Anonymisation — mandatory before any recording ships

- No client logos, names, or identifying branding anywhere in frame.
- No third-party framework marks (including GRESB's).
- Item 04: shift the years and round the scores. A real trajectory in a known
  sector identifies the client even without a logo.
- Show the interface working; never a real client's numbers.

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
