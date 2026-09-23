# G1-379 `maps` — the five faces (nt10-E Phase E, 2026-09-23)

Contract: `G1-379-maps.md` §3 + §5; rules `_FACE-BRIEF.md`. All five are **CODE** faces on ONE additive knob `layout` (`types/g1/G1-379-map-skills.js`): `_buildWith` dispatches `d.layout` to `_buildFace` before any base guard, and `verify()` dispatches on the root's `data-lcs-layout` to `_verifyFace`. The base path is untouched (baseline PASS below). Rows: `tools/b5var-rows/maps.js` → `node tools/gen-b5var-specs.js`. Nothing git-added.

## Files touched (family only)
| file | change |
|---|---|
| `types/g1/G1-379-map-skills.js` | face composers (`_composeTopView`, `_composeRoses`, `_numbering`, `_composeContinents`, `_composeAtlas`, `_composeDirections`), `_buildFace`, `_verifyFace` (DOM facts in the page, rules in node against the neutral `MAPS` + the bank); gate-only seams `forceModels/forceRight/forceRoses/forceBank/forceIndex/forceRows` (the gate asserts no shipped row carries one) |
| `templates/components-b5/maps.js` | `mpGap` (capped flexible band), `viewGlyph`, `viewHeads`, `viewPair`, `roseCard`, `roseRow`, `worldMapCard`, `nameBank`, `nameLane`, `laneRow`, `atlasRow`, `directionRow` |
| `primitives/compass-rose.js` | root `overflow:visible` (the side boxes sit on the viewBox edge; half their stroke was clipped — seen on the F2 render). Only this family consumes it. |
| `data/b5/maps.js` | F2 en title changed to "North, East, South, West: Finish the Rose" (no "compass" in any title) |
| `qa/verify-b5-maps.js` | en `compass` added to the rule-10 word ban; per-face apparatus bans (rule 9); the de control draft's titles no longer embed the layout key; section 6 calls the face gate |
| `qa/b5-maps-faces.js` (NEW) | the face gate (strings, node sweeps + tells, renders, poisons) |
| `tools/b5var-rows/maps.js` (NEW) | the five rows |

## The spacing mechanism (every face)
Blocks are separated by `mpGap`: `flex:1 1 0; min-height 6-8; max-height 36`. The page's slack is shared by the bands up to 36 px each (SPARSE cap 40) and only what is left falls below the last block. `verify()` asserts every band ≤ 40 px, no overlap and nothing under the footer. The gate asserts **FILL** (last block ≥ 85 % of the 814 body) and the fit at 677.

## F1 · K-377 `maps-birds-eye-view` · CODE `layout:'top-view'` · band K
- **Child:** draws a line from each side view (cream card standing on a ground line) to the same thing's top view (white map tile). The wordless heads are an eye looking right plus an arrow, and an eye looking down plus an arrow.
- **Config:**
  - `pairs 5`, `classMix [2,2,1]`, `box 84`, items 116 × 104, tiles 104 × 104, `rowH 104`.
  - Derangement, never reversed, never a constant offset.
- **verify:**
  - Columns = stamps.
  - One set of models, class limits and never-together pairs.
  - Order rules.
  - Each view ≥ 56 px, items ≥ 100.
  - No `<text>`, no stray line, a ground line on every side view.
  - The ±1 px ink rule is checked per EDGE on a 4× raster (tree ±6 units × s).
- **Poisons:** PR5 cup + bucket, AT1 constant offset, SP1, FL1. PR6 is killed by verify-top-side-view.
- **PNG:** `scripts/worksheet-gen/out/dev/K-377-null-d2-en.png` (+ `-grey.png`).
- **Deviation — box 84 (the design's), not a larger box.**
  - At 92 the house's ink edges differed by 1.25 px per edge. The top view's outline stroke scales with the model; the side view's does not. The ±1 rule is gated at 84, so the box stays at 84.
  - A geometry bbox (my first measure) misread the cup's open stroked handle (3.6 px). A nested svg's `getBoundingClientRect` is its INK, not its box, so the raster uses `getScreenCTM`.
- **Read:**
  - Every model reads in colour and in greyscale.
  - The chair's side view (backrest over the seat, legs) reads as a chair from the front. The cup handle is still a heavy "D". Both are open items the base already recorded.

## F2 · G2-369 `maps-north-east-south-west` · CODE `layout:'compass-rose'` · band G2
- **Child:** each of six roses shows one letter; the child writes the other three. Three roses are upright (coral N marker) and three are turned (no marker).
- **Config:**
  - `rotations [0,0,0,90,180,270]`, upright roses give E / S / W, turned roses give N + two of E / S / W.
  - `cols 2`, `px 198`, cards 312 × 214.
- **verify:**
  - Every box's direction is re-derived from its rendered position and `data-lcs-rot`, and its letter must equal `dirLetters[dir]` (node cross-check).
  - Exactly one given letter per rose.
  - The marker iff upright.
  - Rotation multiset, the four directions covered, never periodic, the given-box position never constant, the upright roses never one line.
  - Box ≥ 36, letter ≥ 22.
- **Poisons:** PR7 turned rose with the marker, PR8 upright right box carries S, AT2 upright in one column, SP2, FL2.
- **Deviation — 2 columns × 3 rows, not 3 × 2.**
  - At 3 × 2 with px 196 the stack is 460 of an 814 body: 57 %, a FILL defect.
  - At 2 × 3 with px 198 it fills 88 % at 814 and fits 667 (the measured fi four-line body).
  - px 204 overflowed the fi body by 13 px.
  - The rule "upright never one row" becomes "never one column and never one row".
- **Tell (structural):** the top box is given on 11 % of roses, against 29-30 % for the others, because upright roses never give N (the marker already shows it). That is not an answer tell; the gate asserts only that every position occurs. I had first invented a 12 % floor, and it failed a correct face.
- **Title:** no "compass" (treasure-hunt owns that query); the instruction keeps "compass rose" (rule 9 requires the rose word).

## F3 · G2-370 `maps-label-the-continents` · CODE `layout:'continents'` · band G2
- **Child:** writes each numbered continent's name on its numbered lane, using the word bank.
- **Map:** 635 wide inside a 2 px frame (639).
- **Numbering:** one seed permutation of the 7 REGIONS; a member's rank is its first region's rank. A merged member shows its numeral on both masses.
- **Bank order:** never the numeral order, its reverse, or the locale's alphabetical order.
- **Lane height:** adapts to the set so the stack reaches ≥ 85 % at 814. The bank's row count is estimated from the names (8.9 px a grapheme + 30, measured on the en chips).
- **verify:**
  - Numerals = stamps; each member's numeral count = its regions.
  - Each disc is at the GATED anchor (`WORLD_MAP.anchors`) and on land.
  - Leader dots on target; Antarctica drawn iff it is in the set; land is one white fill.
  - Lane *n*'s hidden answer = member *n*; the bank = the set's names (node cross-check); the order rules; lanes empty and ≥ 44.
- **Poisons:** PR11 disc on water, PR13 bank = numeral order, AT3 alphabetical bank, SP3, FL3.
- **Deviation — region membership.** The data's rings carry one region per RING, so Afro-Eurasia is labelled `asia`. The face therefore checks the gated anchor position plus on-land. verify-world-map's flood (section 0) remains the region proof.

## F4 · G3-396 `maps-continents-and-oceans` · CODE `layout:'continents-oceans'` · band G3
- **Child:** finds each continent and ocean and writes its map number in the atlas-index box beside its name.
- **Map:** the Pacific twin discs; the Arctic, Southern and Antarctica sit in the corner voids with leaders.
- **Numbering:** over continents ∪ oceans, never land-then-sea or sea-then-land.
- **Index order:** no run of 3 of one kind, never the numeral order, never alphabetical.
- **Index layout:** 3 columns, 56 px rows at en. A set of ≤ 8 entries (5 + 3) takes 2 wider columns so its rows do not stretch to about 104 px.
- **verify:**
  - Ocean discs off land by ≥ 6 px (a ring of 24 points at r 21 px).
  - Pacific 2 discs; Arctic and Southern through leaders.
  - Index answers = numbers; names = the bank; boxes empty and 44 × 40; names 17 px on ≤ 2 lines.
- **Poisons:** PR12 Arctic disc in the band without its leader, PR14 land-then-sea, AT4 numeral-order index, SP4, FL4.

## F5 · G2-371 `maps-directions-on-a-map` · CODE `layout:'directions-on-map'` · band G2
- **Child:** finds the framed start picture on the island, looks the way the word says, and circles the one of three chips that lies that way.
- **Island:** 533 px, no footpath, no north arrow; a reference rose at 96 px sits outside the plate.
- **Places:** the 7 places at 40 px on the committed `s40w533/none` slots, ≥ 72 px apart.
- **Single answer by construction:** exactly one chip within 30° of the direction, both others ≥ 90° off (one ≥ 135° when the layout allows). 6 distinct starts, all 4 directions, tree + bush never both chips, the correct position never constant or periodic.
- **verify:** bearings are recomputed from the RENDERED symbol centres; the words and rose letters are node-cross-checked against the bank; no `<text>` on the plate.
- **Poisons:** PR15 a wrong chip planted 41° off, PR16 a reused start, AT5 correct chip always first, SP5, FL5.
- **Measured:** 400 of 400 seeds build, 0 rule breaks.

## Gates added to verify-b5-maps
- Rule 10 widened with the en `compass` (P11b).
- Per-face apparatus bans: AP1-AP5, one per face, each must fire. The en sources are the controls and are clean.
- Every face refuses a bank that lists its layout in `refuse`, and an unauthored locale (sv) refuses.
- Locale-neutral: the de synthetic bank draws the same F1 / F2 / F5 page and the same F3 / F4 numbering (400 seeds each, 0 differences).

**Two extreme set shapes are rendered clean, fitted at 677 and filled at 814:** 5 members with a merged America and no Antarctica (3 oceans), and 6 members with Antarctica.

## Per-locale refusals visible now
None designed, and none forced by the bank shape: the continent / ocean COUNTS are data (5-7 members, 3-5 oceans) and both extreme shapes render.

**One open risk for the panels:** a continent name so long that the bank's row estimate is off by one row. It would cost FILL only, never overflow; the 677 fit is gated.

## Open items for the panels
- Author `continentSet` / `oceanSet` / `setSource`, `dirWords` / `dirLetters`, and every `strings[layout]`.
- Add `instructionBans` per face for their locale (rule 9: F1 map / write; F2 map / line / circle; F3 circle / number; F4 line / circle; F5 write / line / step / square / left / right).
- The en source is theirs to audit, including "Oceania" vs "Australia" and "Cardinal Directions" wording.
- F3 / F4 re-draw the bank / index order against the locale's OWN alphabetical order. This is the only locale-dependent draw, and it happens only when the shuffle collides with alphabetical order.
- Art to re-read at print size: the chair's side view and the cup handle (from the base record).

## Results
- `node qa/verify-b5-maps.js` (full) → **PASS (344 assertions, 52/52 poisons killed)**; `--quick` also PASS. Renders: K-377 fill 93 % at 814 · G2-369 88 % · G2-370 99 % · G3-396 87 % · G2-371 100 %; all fit 700 (de) and 667 (fi); 20/20 distinct sweep pages per face.
- `node tools/gate-variation-distinct.js --batch=b5 --diffs=2 --family=maps` → `every variation differs from the deck its base publishes and from its siblings` (15 pairs).
- `node i18n/build-en.js` → 708 types, title lint clean.
- `node tools/b3-baseline.js --check --quick` → `checked build 3840 + enum 277 in 27s: 0 drifted (0 expected), 0 missing` / **PASS**.
- PNGs (colour + grey, all READ): `scripts/worksheet-gen/out/dev/{K-377,G2-369,G2-370,G3-396,G2-371}-null-d2-en.png` and `-grey.png`. Set-shape renders: `out/dev/G1-379-set-*.png`.
