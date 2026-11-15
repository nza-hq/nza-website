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

- **01 Your school, built in 3D.** Finham Park School (136963), live. Type the name, pick it, zoom
  in, "Yes, build it", the build sped up, then the finished twin held for the last 2.5 s.
- **02 Your carbon, counted.** Finham Primary School (142700), a small site, live. The emissions
  table with a short scroll, the flow chart (Sankey) with Travel picked, then To 2050 by theme.
- **03 Your climate risks, mapped.** Eton College (110158), live, detail card hidden. Heavy rain on
  the site, the Thames floodplain in the 1 km view, then Heat, Hot ground, Wildfire and Cold in turn.
- **04 Your nature, found.** Chelmer Valley High School (137260), live, 2D. The 1 km ring with the
  wildlife records popping in, the ring out to 3 km and again, then Connecting nature.
- **05 Your plan, made.** Finham Park, local main, an invented plan (21 actions, 9 people and groups).
  Overview, Carbon, All actions as list, board and timeline, then People.
- **06 Your story, told.** Finham Park, live. "From the planet to your school": the globe, the world's
  renewables, the UK in figures and at night, Coventry, then down to the school's buildings.

Dress at capture time only (big legible type, no personal names in any owner field); the app
itself is untouched. The 10 Nov Bristol Grammar School screen recording in the nza-decoded repo
(`docs/media/2026-11-10-bristol-grammar-walkthrough/`) is a reference for the shots, not a source.

## Regenerating the placeholders

Poster from Python PIL (cream #EDE7D6, number in #E8743C, title in #0F5D43), then:

```
ffmpeg -loop 1 -i <base>-poster.jpg -t 4 -r 30 -c:v libx264 -pix_fmt yuv420p -an -movflags +faststart -y <base>.mp4
ffmpeg -loop 1 -i <base>-poster.jpg -t 4 -r 30 -c:v libvpx-vp9 -pix_fmt yuv420p -b:v 0 -crf 42 -an -y <base>.webm
```
