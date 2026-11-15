# decodED showcase videos - recording spec

The `/decoded` page's six steps each play a short clip of the real decodED app in the
pinned frame, on a decodED-green panel.

**Status:** all six re-recorded overnight 15 Nov 2026 to Linzie's brief, each on the school that shows
its point best. Pro was a stand-in in the recording browser only; every call to Supabase was blocked, so
no account was written. The plan in 05 is invented. 01-04 replaced files that had already shipped, so
`decodedConfig.tsx` asks for them with `?v=2`; bump it again on the next re-record. The recording rig
(Playwright, then ffmpeg) lives outside this repo, in `nza-hq/_clips/decoded-rig/` on Chris's PC
(`rec2.mjs`, `cut2.sh`, `segs.sh`, `makeplan.mts`).

## Asset spec (same as NZ:AI)

| Property | Value |
|---|---|
| Aspect ratio | 1:1 (square) |
| Source resolution | 1080 x 1080 |
| Duration | 6-10 seconds (up to ~12 s where the story needs it) |
| Format | MP4 (H.264) **and** WebM (VP9) |
| Audio | None - strip the track entirely |
| File size | Under 1.5 MB per file per format |
| Final frame | A meaningful still - it persists after playback |
| Poster | First frame, JPEG, 1080 x 1080, under 200 KB |
| Colour range | **Limited (tv)**, `yuv420p`, BT.709. Never full range (`pc` / `yuvj420p`): Intel hardware VP9 decoders refuse full-range VP9 and the clip freezes on its first frame (Linzie's Windows PC, 15 Nov 2026). Encode with `-vf scale=in_range=pc:out_range=tv,format=yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709`; check with `ffprobe -show_entries stream=color_range`. |

## Filenames

```
public/videos/decoded/01-twin-built.mp4       + .webm + -poster.jpg
public/videos/decoded/02-carbon-counted.mp4   + .webm + -poster.jpg
public/videos/decoded/03-risks-mapped.mp4     + .webm + -poster.jpg
public/videos/decoded/04-nature-found.mp4     + .webm + -poster.jpg
public/videos/decoded/05-plan-made.mp4        + .webm + -poster.jpg
public/videos/decoded/06-story-classroom.mp4  + .webm + -poster.jpg
```

## Shot list (15 Nov 2026)

- **01 Your school, built in 3D.** Finham Park School (136963), live, real speed (re-recorded 15 Nov
  evening, `?v=5`). Type the name, pick it, the fly-in at the app's own pace (about 2 s of street-map
  loading cut), the site boundary drawn, "Yes, build it", the green and grey land-cover wash, the tip into
  3D with buildings and trees rising, then the finished twin with Orbit on.
- **02 Your carbon, counted.** Finham Primary School (142700), a small site, live. The emissions
  table with a short scroll, the flow chart (Sankey) with Travel picked, then To 2050 by theme.
- **03 Your climate risks, mapped.** Eton College (110158), live, 3D only (`?v=6`). Orbit on throughout,
  passport closed: Rivers and sea on and off, Heat on and off, then Wildfire on to the end. One
  real-time take, no cuts.
- **04 Your nature, found.** Brockenhurst College, New Forest (130690), live, 2D ( picked over
  Hartpury and Stowe for the most wildlife; `?v=6` adds the chart). The 1 km ring with the wildlife
  records popping in and the species chart open, Birds picked (orange), the ring out to 3 km, then
  Connecting nature (its load cut).
- **05 Your plan, made.** Finham Park, local main, an invented plan (21 actions, 9 people and groups).
  Overview, Carbon, All actions as list, board and timeline, then People.
- **06 Your story, told.** St Peter's School, York (121724), live (`?v=5`; Westminster was tried but its
  city card shows a missing temperature). "From the planet to your school": the globe, the world's
  renewables, the UK in figures and at night, York, then down to the school's buildings.

Dress at capture time only (big legible type, no personal names in any owner field); the app
itself is untouched. The 10 Nov Bristol Grammar School screen recording in the nza-decoded repo
(`docs/media/2026-11-10-bristol-grammar-walkthrough/`) is a reference for the shots, not a source.

## Regenerating the placeholders

Poster from Python PIL (cream #EDE7D6, number in #E8743C, title in #0F5D43), then:

```
ffmpeg -loop 1 -i <base>-poster.jpg -t 4 -r 30 -c:v libx264 -pix_fmt yuv420p -an -movflags +faststart -y <base>.mp4
ffmpeg -loop 1 -i <base>-poster.jpg -t 4 -r 30 -c:v libvpx-vp9 -pix_fmt yuv420p -b:v 0 -crf 42 -an -y <base>.webm
```
