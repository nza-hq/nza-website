# NZ:AI showcase videos — recording spec

The `/nz-ai` page's five showcase items each play a short video of a real tool
in the pinned frame. Clips 02–05 in `public/videos/nzai/` are real recordings.
**Clip 01 is a labelled placeholder card** until its recording exists; it drops
in at the exact same filename.

## Asset spec (all five recordings)

| Property | Value |
|---|---|
| Aspect ratio | 1:1 (square) |
| Source resolution | 1080 × 1080 |
| Duration | 6–10 seconds (up to ~12 s where the story needs it) |
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

- **01 Your energy, decoded** (source: Hartpury, the live `EnergyFlow` view; brief to follow). One supply bar ("the bill") → it opens into incomer → substations → buildings, band widths by energy → the biggest path lights up to one building with its own meter → that building's half-hourly profile, out-of-hours shaded, with chips for its other supplies. Figures illegible. Final frame: the profile beside the lit path. *Until it is recorded, the file at this name is a labelled placeholder card (see "Regenerating the placeholders").*
- **02 Carbon data you can act on** (source: IVG carbon inventory, briefs S02 + S05). Statement table → bar by scope → Scope 3 by category → Purchased goods by supplier → one supplier becomes a card: total spend, science-based target status, supplier-specific factors, and one bar of its spend split by invoice. Final frame: the card.
- **03 Climate risk, made local** (source: IVG climate-risk data for one real site, unnamed; briefs S03 + S05). An illustrative building-level view: a site plan where most buildings read green and a few red → across the 2030s, 2050s and 2080s more warm to amber and red, and on the spider the wildfire icon reddens → wildfire selected: the homes nearest the woodland light up, the rest grey, with notes from the site team → a chart of high fire-danger days a year to the 2080s, one line per emissions scenario. Final frame: the chart beside the highlighted buildings. *Building-level risk is a designed illustration (the survey rates at site level and this site's wildfire stays moderate/low); the geometry and the fire-danger chart are real — see clip 03's design note D10 Rev F.*
- **04 Every option, tested** (source: the EOC strategy playground, brief S04; done). Four measures switch on and adjust one by one; the plan line bends from red through amber to green onto the net zero pathway. Final frame: on the pathway.
- **05 Put your data to work** (source: Hartpury Estate Explorer, Rev B — recorded in the NZ:AI clips cloud session from `hartpury-digital-twin` `showcase/nzai-website` @ `ab31b08`). Three questions type over the main campus one after another — fossil-fuel heating, condition survey, then energy use as growing rings — each glowing the matching buildings and giving a count the tool reads from its own record. The only legible figures are the two answer counts ("Fossil fuel heating: 30 buildings"; "Condition survey held: 28 buildings"). Final frame: the energy-use rings. Provenance + hashes in `docs/videos-nzai-manifest.md` (on branch `claude/cool-mendel-5hb538`).

> Clips are recordings of real NZA tools in a showcase mode (1080×1080, chrome hidden,
> larger type, figures illegible), driven by a scripted Playwright run and encoded with
> ffmpeg. They are produced in each tool's own repo, not here. Drop finished files in at
> the exact names above; no code change is needed.

## Anonymisation — mandatory before any recording ships

- No client logos, names, marks, URLs or identifying branding anywhere in frame.
- No third-party framework marks (including GRESB's).
- Real data only, never invented figures, except where a clip's design note records an element as illustrative (02's supplier flags; 03's woodland outline).
- Never show gaps or missing data. Frames show what is held.
- No aerial or satellite imagery, and no third-party drawings, until their licence is confirmed for marketing use.
- 01 and 05 (Hartpury): every £, kWh, m² and count illegible, except clip 05's answer count.
- 02 (IVG): tonnes and spend nudged per row, suppliers lettered, sites numbered.
- 03 (IVG): real site geometry and climate data allowed; the site is never named.
- 04 (EOC): real figures allowed; the client is never named and offices are not named.

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
