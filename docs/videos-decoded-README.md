# decodED showcase videos - recording spec

The `/decoded` page's five steps each play a short clip of the real decodED app in the
pinned frame. All five are recorded on **Finham Park School, Coventry (URN 136963)**, so the
page tells one school's story (Linzie, 14 Nov 2026).

**Status:** all five are real recordings of the live site on Finham Park (14 Nov 2026), replacing
the placeholder cards. Pro was a stand-in in the browser only (no account written); the plan's people
are roles, not names. The recording rig (Playwright screencast frames, then ffmpeg) lives outside this
repo, in `nza-hq/_clips/decoded-rig/` on Chris's PC. If a clip is re-recorded at a filename that has
already shipped, add a `?v=` bump in `decodedConfig.tsx` (as `nzaiConfig.tsx` does).

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
public/videos/decoded/01-twin-built.mp4      + .webm + -poster.jpg
public/videos/decoded/02-carbon-counted.mp4  + .webm + -poster.jpg
public/videos/decoded/03-risks-mapped.mp4    + .webm + -poster.jpg
public/videos/decoded/04-nature-found.mp4    + .webm + -poster.jpg
public/videos/decoded/05-plan-shared.mp4     + .webm + -poster.jpg
```

## Shot list (all on Finham Park, signed in as Pro so nothing shows a lock)

- **01 Your school, built in 3D.** Landing: type "Finham Park", pick it, the map flies in,
  the wipe reveals the site, the buildings grow. End on one building tapped and its passport open.
- **02 Your carbon, counted.** Data, Carbon lens: the footprint grouped by topic, then To 2050
  drawing its line. End on the To 2050 chart.
- **03 Your climate risks, mapped.** Twin, Climate lens: the flood map washes over the site and
  the roads that flood nearby, then the risk list. End on the flood map with the list beside it.
- **04 Your nature, found.** Twin, Nature lens: habitats painted on the site, then the camera
  pulls out to nature nearby. End on the wider view.
- **05 Your plan, shared.** Plan: targets and "Where to start", then the actions board with
  owners and dates. End on the board.

Dress at capture time only (big legible type, no personal names in any owner field); the app
itself is untouched. The 10 Nov Bristol Grammar School screen recording in the nza-decoded repo
(`docs/media/2026-11-10-bristol-grammar-walkthrough/`) is a reference for the shots, not a source.

## Regenerating the placeholders

Poster from Python PIL (cream #EDE7D6, number in #E8743C, title in #0F5D43), then:

```
ffmpeg -loop 1 -i <base>-poster.jpg -t 4 -r 30 -c:v libx264 -pix_fmt yuv420p -an -movflags +faststart -y <base>.mp4
ffmpeg -loop 1 -i <base>-poster.jpg -t 4 -r 30 -c:v libvpx-vp9 -pix_fmt yuv420p -b:v 0 -crf 42 -an -y <base>.webm
```
