# Asset worklist — story "pips-picnic" (placeholder art is LIVE; replace at will)

Player + packer contract: docs/storybook/authoring-guide.md §Assets.
Deliver PNGs per the layout below, run pack-atlas.js (or TexturePacker,
PixiJS exporter, WebP, max 2048, trim), drop the outputs into
`/var/www/lcs-media/mini-tools/stories/pips-picnic/` — zero code changes.

## Character: pip (guide) — source canvas 512×640, feet at bottom-center
| Frame | File | Notes |
|---|---|---|
| Neutral pose | cast/pip/pose_neutral.png | REQUIRED |
| Talk pose | cast/pip/pose_talk.png | REQUIRED (narrator) |
| Happy pose | cast/pip/pose_happy.png | success beats |
| Point pose | cast/pip/pose_point.png | prompt beats |
| Idle loop | cast/pip/idle_0001..0006.png | 6-8fps gentle bob |
| Celebrate clip | cast/pip/clip_celebrate_0001..0024.png | 12fps, ~2s, returns to happy |

## Scenes — 1600×1000 opaque PNG (packed to WebP q80, ≤200KB target each)
| Page | File | Content brief |
|---|---|---|
| 1 | scenes/page-01.png | sunny meadow, morning |
| 2 | scenes/page-02.png | picnic blanket close-up |
| 3 | scenes/page-03.png | stream with stepping stones |
| 4 | scenes/page-04.png | golden-hour meadow, sunset |

## Narration — one mp3 per line per locale (EN first)
Files: audio/<locale>/<lineId>.mp3 — the line IDs + exact copy are in
mini tools/stories/pips-picnic/strings.json (keys p0N-l0N + success lines).
Record via ElevenLabs per the platform's narration flow; drop under
/var/www/lcs-media/mini-tools/stories/pips-picnic/audio/en/… . Missing files
fall back to browser TTS automatically — ship art first, audio second.
