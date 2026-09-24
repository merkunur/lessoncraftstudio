---
name: project-writing-frame-starter-fix
description: "2026-09-21 — the printable sentence starters sat with their caps on the dashed midline (rulingBlock 0.78·glyphH) and Measure It! objects were clipped/re-registered by flex-shrink; fixed at the factories with measured font metrics + rendered-geometry gates, 142 live decks republished in place across 11 locales"
metadata: 
  node_type: memory
  type: project
  originSessionId: 2dcc2aad-6731-4f5c-a4aa-7a701acec105
  modified: 2026-09-20T22:40:58.379Z
---

# Writing-frame starters + G2-235 ruler fix (2026-09-21) — DONE at origin; EDGE needs the operator's purge

## ROUND 2 (same day, operator: "still not aligned. It is not a detail") — two causes, both measured
1. **The edge served the OLD PDFs.** The operator downloads the printable PDF; nginx served every deck PDF `max-age=2592000` under a version-stable URL, so Cloudflare kept v1 (`last-modified 20:03, HIT, Age 7990`) while origin had v2 (`22:38`). Every past `--updates-manifest` republish had the same hole. Fix `scripts/publish-cli/patch-nginx-deck-asset-cache.py` (applied 23:17Z; `Cache-Control max-age=3600` + `Cloudflare-CDN-Cache-Control max-age=300`; idempotent, 3 poisons). Already-cached objects need ONE dashboard **Purge Everything** (no CF API token on the box) — asked of the operator. ⭐ **A republish is live only when the EDGE serves it: check `cf-cache-status` + `last-modified` THROUGH Cloudflare, and read the PDF (the Read tool renders PDFs), not the deck.html preview.** I verified round 1 at origin + the HTML preview and called it live — wrong.
2. **A third code path: `syllableLane` (G1-306 Word Families + G1-333 blends).** Baloo 2 at `0.9·glyphH`, `yBase−1` → x-height at 79 % of the band. I had READ its render in round 1 and called it "close enough" — a frame model is measured, never eyeballed. Fixed via `starterFontPx({font:'baloo2-700'})` (measured x-height 0.500); the gate now measures EVERY `<text>` inside a writing-row svg (poison P5), `MUST_HAVE` += G1-306. Only **en** prints a rime (other locales' lanes are empty; fr's changed JPEG was 0 differing pixels) → 2 en decks republished (`syllable-reading-g1306/-g1333` → v2). Drift record `starterfix2-expected-drift.txt` (6 en coords; each record = the delta since the previous capture). ⚠ The gate's invented `0.75·frame` ascender floor failed a CORRECT Baloo rime by 0.00004 px → replaced by the font property "ascender clears the x band"; spec-level refusals (es/pt/it/fi d1 pools) are skipped, LANE refusals fail. Commits `00e2686b` · `1ac1f714` · `11ee91a7` · `fc3372a8`.
3. Operator ruling: small letters exactly in the midline band (x-height = x band; caps ~82 % of the top line) — kept.

# Round 1 record (2026-09-20/21)

Operator screenshots 2026-09-20: "letters haven't been aligned with the writing frame" (K-335 because · G2-278/299 One day, / I can see · G2-341 The hedgehog is) + "images are cut off" (G2-235 Measure It! d3). Plan file `C:\Users\rkgen\.claude\plans\in-some-of-the-lazy-allen.md`. Commits `602d45a7` (starters + gate) · `90e50c39` (G2-235 + poison) · `2169db27` (republish tooling, pin waves, drift record, README recipe step 12). Republished in place: **142 decks** (13 per locale, fr 12 — its K-335 `because` is a recorded null) via `scripts/publish-cli/starterfix-republish.sh` (divfix clone) — every slug v1 → v2, audit clean, hreflang re-injected wave-scoped.

## What was wrong (measured)
- `templates/components-b2.js rulingBlock`: starter = Nunito 700 at `0.78·glyphH`, `y = yBase − 2`. The frame (`writingRow xHeight:true`) is ruled on the STROKE-font metrics (x band = 40/70 of top→base); Nunito's cap (0.7188 em) at that size lands EXACTLY on the dashed midline. K-327's words are stroke paths on the same geometry → right by construction, which is why the operator saw both. `factLane` (G2-318 base) had the same shape as a flex-centred 20 px span.
- `types/g2/G2-235`: column-flex stage, 4 rows at d3 → the `overflow:hidden` art band and the ruler svg flex-SHRANK; with the default `xMidYMid meet` the ruler scaled 0.52 and its 0 tick moved 134 px right of the unmoved picture. ⭐ **The d1/d2 decks were ALSO wrong** (7 % shrink, picture 12 px = 0.3 unit before 0) — the poison "control" accused them and the measurement was real. `verify()` read only inline `style.left` + `data-lcs-*`, never `getBoundingClientRect`.

## The fix
- `tools/measure-font-metrics.js` → `primitives/font-metrics.json` (Chromium canvas TextMetrics at 1000 px; Nunito 700 x 0.500 / cap 0.7188 / asc 0.7188 / desc 0.1875; `--check`). `starterFontPx({h,glyphH})` = x band / xHeight (K-335 45.5 px, G2-341 32, G2-278 d2 27.5), `y = yBase`. factLane: `align-items:baseline` + the fullWidthRow svg's CSS height = its yBase (flex baseline of a replaced element = its bottom edge; `overflow:visible` keeps the rule's lower half). Ascenders reach 82 % of the top line — the honest compromise (small letters never cross the midline).
- G2-235: art band + ruler `flex:0 0 auto`, ruler `preserveAspectRatio="xMinYMin meet"` (an overrun now OVERFLOWS instead of re-registering), d3 `rows 4→3` (measured: 233 px per stage at 3 rows vs 164 at 4; band 105–120 + ruler 64 cannot fit four without shrinking the noun filter → other themes → other slugs), verify() measures the render (band height, ruler box, tick spacing, art left/right vs rendered ticks, children inside the card).

## Gates (pre-publish, browser — not in deploy.sh)
- `qa/verify-ruling-starters.js [--quick] [--poison]` — DISCOVERS its consumers by `build()` over every spec (22 coordinates / 9 types: K-335 d1-3, G1-309 d1, G2-278 d1-2, G2-299 d1-3, G2-318 d2, G2-339/340/341/342 d1-3), renders × 11 locales, measures rule vs baseline vs x/ascender ink; 544 starters / 242 renders PASS; poisons: old size (B+C fire), old y (A), old factLane (A+C), no-starter control refuses. ⚠ `data-lcs-starter` is ALSO K-330's stage stamp for a grapheme in a sound box — scope by `svg[data-lcs-prim="writing-row"] text[...]` / `[data-lcs-factlane] span[...]`, never the bare attribute. ⚠ The count check is per LOCALE source (fr K-335 = 0, Nordic G1-309 d1 = 4 rows), the non-vacuity is aggregate.
- `qa/verify-g2235-ruler-poison.js` — renders the pre-fix build out of git (`93a416b9`) under the current verify: d1 14 / d3 20 fails, current 0/0.
- `tools/b3-baseline.js` drift = exactly 250 (`docs/worksheet-gen/b3-designs/_records/starterfix-expected-drift.txt`); G2-318/339/340/341 are refusal keys on the baseline themes (animals/fruits) both before and after — invisible to the baseline, covered by the gates. Re-captured.

## Republish mechanics that worked
`tools/starterfix-regen.js` (pin waves `waves/wave-00N-starterfix-{a,b}.json` for the legacy d2 shapes/toys — the June round-robin now says fruits/vehicles; measurement/b2/b2var/b3/b3var waves with `--types=`; backs up originals to `out/staging/_starterfix/orig/<loc>`; asserts every live basename reproduced; `--evidence`: title/meta byte-equal, `generated_at` + noun instance differ, `variant:1` is a newer manifest field — `variant_id` unchanged) → scp to `/var/www/lcs-media/_staging/starterfix/<loc>/` → `starterfix-republish.sh <loc>` (probe collisions = the DB) → `--confirm`. ⚠ g2235 toys-d3 now passes QA (rows 3) in every locale = 11 NEVER-published decks; deliberately NOT inserted (a separate decision). ⚠ In `--evidence` mode read the live set from the BACKUP dir — the pool already holds the fresh ZIPs plus any newly-passing coordinate.

## Pre-existing, not mine
`emit/deck-html.test.js` sweep fails 11/11 locales on `unit-axis: unresolved token {U}{L}` (letter-of-the-week) — identical on the pre-change tree (`git stash` run); the sweep does not resolve the unitAxis exemplar.

## Follow-ups (recorded, not built)
- G2-235 lengths cluster at 3 units (`maxLen = floor(120·wf/(44·hf))` is 3 for most animals) → every object is 3 long on a 12 ruler; a real design weakness.
- The 11 g2235 toys-d3 decks that now pass — publish as new content or leave.
- `starterfix` staging on Hetzner removed after the run (server-disk rule); the pools on the PC keep the fresh + orig ZIPs.
