# nt10-E — final landing touch-up (one agent per locale)

The worksheets are now FINAL (commit `c1e0fff6`): two generator rounds + two native data rounds changed pages after
your locale's landing was last revised. Your job is a consistency pass, not a rewrite.

Inputs: `scripts/worksheet-gen/i18n/.landing-b5-<loc>.json` (your landing file), the final renders
`scripts/worksheet-gen/out/b5-sweep/<loc>/<ID>-null-d2-<loc>.png`, the face table `scripts/worksheet-gen/out/b5-faces.<loc>.json`
(the printed title + instruction per id), and the rules in `docs/worksheet-gen/b5-landing-brief.md`.

Changes that affect every locale (check the landings that describe them):
- K-374 crossing steps: FOUR cards — stop at the kerb · look left · look right · walk when the road is clear; "1 to 4".
- K-375: traced words are numbered to match the people; the grandfather has a beard/moustache.
- K-370: the older sibling is drawn taller. K-369: stop/go sides vary per street.
- K-368 tag order, G1-388 / G1-389 / G2-365 strip and bank orders, G2-360 sign order, G1-396 row patterns, G2-371
  answers (≤2 of 6 each) — never describe an ORDER; describe what is there.
- G1-383: five riddles; square riddles never offer "rectangle"; rectangle riddles offer "square".
- G3-392: the plant inset has no roots. G1-395: the tired face has "zzz"; the "big" picture is a whale.
- G2-369: the instruction now says the orange point marks north. Mars has a polar cap.
- fr only: typography at render (no-break spaces) — keep plain spaces in title/meta/slug/h1/eyebrow/strand.
Plus your locale's own round-2 data changes: compare each landing's quoted words, counts and titles with the current face
table + render.

For EVERY landing: open its PNG; fix any sentence, number or quoted word that no longer matches; if the page's printed
title changed, align h1/title/meta to it (keep the slug unless it is now wrong — a slug change is a new URL, so avoid it
unless the old slug names something the page no longer is). Remove any landing whose id is now refused. Replace the
`findings` array with what is STILL wrong on the final renders (empty list = say so in one entry).
Run `node scripts/seo-landing/gen-b5-landings.js <loc> scripts/worksheet-gen/i18n/.landing-b5-<loc>.json --dry-run`
until `dry-run ok`. Scratch under `scratchpad/<loc>-landing/`. Edit no other repo file; no git.
Hand back (≤120 words): the dry-run line, how many landings changed, and the remaining findings.
