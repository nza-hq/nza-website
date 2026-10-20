# NZ:AI clip 05 — manifest of the final render

Recorded from `nza-hq/hartpury-digital-twin`, branch `showcase/nzai-website`, commit `ab31b08`
(clip 05 Rev B: three questions typed over the main campus, fossil fuel heating · condition survey ·
energy use as growing rings; design note "Clip 05, Rev B" in that repo's
`docs/design-notes/showcase-nzai-clips.md`). Rendered 15 Oct 2026 by the rig in that branch's
`showcase/` (Playwright 1.63.0 capture, ffmpeg encode: mp4 crf 23, webm crf 40, poster q 4).
Committed here 20 Oct 2026 by the NZ:AI clips session on request of the website session; bytes are
the render, not a re-encode. Verify with `sha256sum` or `git hash-object` before copying.

| file | bytes | git sha1 | sha256 | spec |
|---|---|---|---|---|
| `05-ask-your-data.mp4` | 1,195,773 | `3aad8bb` | `b7939003eaab187afba4e4109ec630e5243bbcaf2f79daf3153702a7ed7a4ece` | h264 1080x1080 10.00 s, 1 stream (no audio) |
| `05-ask-your-data.webm` | 519,007 | `bbd3f20` | `afd3e7d7854ba6af446fd02ea778fadb344f867684218cadea6b22389166cf8a` | vp9 1080x1080 10.04 s, 1 stream (no audio) |
| `05-ask-your-data-poster.jpg` | 141,006 | `706ec76` | `6fd4ad7e85a940629fb364d812fcad41f159760bf26df3aa524c204b98b8da2c` | JPEG 1080x1080, the final frame (9.9 s in) |

The only legible figures in the clip are the two answer counts ("Fossil fuel heating: 30 buildings",
"Condition survey held: 28 buildings"); no client name, mark, office or figure appears in any frame
(frame audit at every step in the source repo's STATUS, "Clip 05 Rev B").

Clips 01-04 are not covered by this manifest: the website keeps its own versions of 02-04, and 01 is
the placeholder pending its re-planned recording.
