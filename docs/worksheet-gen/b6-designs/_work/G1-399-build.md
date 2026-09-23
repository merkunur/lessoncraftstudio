# G1-399 `sink-or-float` — BASE build record (2026-09-23)

Contract: `G1-399-sink-or-float.md` §2 (base) + §5 (data + gates) + the two NEW primitives (`water-tank`, and `clay-form` from §3 F2). Faces were NOT emitted. Nothing shared was edited. The one exception is `i18n/strings.en.json`, which `node i18n/build-en.js` (required by the brief) regenerated from all 722 specs; the title lint is clean. Nothing was added with git.

## Files (all new)
| file | what |
|---|---|
| `scripts/worksheet-gen/primitives/water-tank.js` | `waterTank({w,h,mode,spots,waterAt,id})`: modes rings / legend-float / legend-sink / empty / spots; px geometry with no viewBox scaling; `MIN_W 112`, `MIN_H 56`; rings need h ≥ 57 |
| `scripts/worksheet-gen/primitives/clay-form.js` | `clayForm({form:'lump'|'ball'|'boat', w})`: viewBox 160×120; strokes converted so they render at 3 / 1.5 px; pancake, bowl and sheet throw |
| `scripts/worksheet-gen/qa/verify-b6-water-tank.js` | node gate on the EMITTED markup: 6 sizes × 5 modes, the throws, 6 poisons |
| `scripts/worksheet-gen/qa/verify-b6-clay-form.js` | node gate: areas re-measured from the markup by 0.5 u grid sampling, same clay, dimples, table line, open hollow, 4 poisons |
| `scripts/worksheet-gen/qa/render-b6-sink-or-float-art.js` | art proof sheet (not a gate): every mode and form at its smallest and largest size, colour and greyscale |
| `scripts/worksheet-gen/templates/components-b6/sink-or-float.js` | `sfThinkGlyph sfSplashGlyph sfStar sfLegend sfColumns sfHeads sfPicTile sfBetRow`. The barrel auto-discovers it, so no registration line was needed |
| `scripts/worksheet-gen/data/b6/sink-or-float.js` | `SINK_OR_FLOAT` (the locale map, EN block) + `SINK_OR_FLOAT_NEUTRAL` (CLAIMS 21 (the jewellery ring removed, see Lead review round 1), EXCLUDED, PAIRS P1-P5/Q1-Q5, SHAPES, TF ×17 with per-object claims, QUESTIONS, LEVEL_BY_LOC, LABEL_TRAPS). `data/` is gitignored, so it needs `git add -f` |
| `scripts/worksheet-gen/types/g1/G1-399-sink-or-float.js` | the spec: slug `sink-or-float-experiment`, `_buildWith` poison seam, a `layout` knob that throws until Phase E, and `verify()` (page plus a node cross-check against the CLAIM table and the bank) |
| `scripts/worksheet-gen/qa/verify-b6-sink-or-float.js` | family gate; exports `validateBank(block, loc)` + `validateNeutral` (`tools/b6-probe-child.js` already calls `validateBank`) |

## Pictures opened (builder, 2026-09-23)
I opened all 22 CLAIM pictures on a contact sheet (`scratchpad/G1-399-claims.png`). Each one is what its noun says: football, log round, pumpkin, red apple, lemon, banana, maple leaf, feather, pine cone, pencil, toy boat, ship, whole orange with the peel on, grey rock, nail, gold ring with a gem, PINK key, claw hammer, brass bolt, pliers, scissors, potato.
- The key is kept base-only, as the design rules.
- EN labels are panel-style literals: `pine cone`, `toy boat`; all others use the noun.

## Deviations from the design (each measured)
1. **EN instruction says "Color", not "Colour".** The catalogue's EN is US: 32 specs use "Color", 3 use "Colour". Text: *"Color a ring in the first tank before the test, a ring in the second tank after it, and the star if you were surprised."* (119 chars).
2. **d1 has the star, a 200×100 tank and 130 px rows** (design: no star, 190×95, 118).
   - The page has ONE instruction, and it names the star. A star-less d1 would be the nt10-E "instruction names apparatus not drawn" defect.
   - The design sizes leave the page 80 % full.
   - Even with the change, d1 reaches only 82 % FILL at the 814 chrome. d1 is never shipped.
3. **d3 has 7 rows (4 float / 3 sink) at 75 px** (design: 8 rows at 66).
   - The design's own 75 px tank does not fit a 66 px row.
   - 8 rows at the 24 px ring floor stack to 756 px, over the 677 limit.
   - d3 is never shipped.
4. **Picture column is 112 px, not 100.** fr "pomme de terre" at Nunito 800 14 px was measured CLIPPED in a 96 px label. At 112 it fits, as does de "Spielzeugboot". The row is 570 px wide (≤ 675).
5. **Gaps and legend padding changed.**
   - Legend padding is 6/16, not 8/16: 72 − 4 border − 16 padding leaves 52, and the tank is 56.
   - The legend-to-heads gap is 6, not 8 (one gap token).
   - d2 stack: 72 + 6 + 30 + 6 + 6×86 + 5×6 = **660 ≤ 677**. The design's own arithmetic said 656.
6. **Rows grow from `minmax(rowMin, tank+34)`.** The rows fill the body (FILL), capped so the blank band between two tanks stays ≤ 40 px (SPARSE). d2 fill: **98.4 % at the 814 chrome, 99.9 % at the 667 worst chrome**.
7. **water-tank art changes** (after reading the greyscale proof):
   - Wave amplitude is capped at 5 px. At 639×520 the design's 0.045h made a 23 px swell that swallowed the F4 spots.
   - Added an inkSoft 1.5 gravel-top line at floorY. creamDeep and tealSoft print as the SAME grey, so without the line the gravel band vanishes in mono.
   - Pebbles are stroked inkSoft, not grid; grid was invisible in greyscale.
8. **legend-sink blob position.** Its bottom sits on the floor ring's bottom (floorY − 1), so the legend teaches exactly the ring position. The design's centre (floorY − 0.12h) is 0.5 px off at 85 px and 2.3 px off at 520 px. Bubbles sit wholly below the wave troughs.
9. **Rings mode throws below h 57** (0.32h < 18 px). The 112×56 size is legend-only.
10. **Bank module shape.**
    - `lib/b6-common.js` takes the FIRST export as the locale map. So the exports are `SINK_OR_FLOAT` (locales) and `SINK_OR_FLOAT_NEUTRAL` (facts), the G1-376 precedent. The design's `SINK_OR_FLOAT` / `SINK_OR_FLOAT_LOC` naming was not used.
    - Labels live only in each locale block's `labels`, with no per-row label map. That keeps one source.
11. **`strings` holds only `G1-399`.** Face ids are not allocated yet (`_records/b6var-id-allocation.json` is absent). `validateBank` validates every id present and requires `G1-399`. Rule 10 (the full six-id set) will bind once the allocation exists.
12. **Face components are deferred to Phase E**: sfScaleCard, sfClayRow, sfTransferCard, sfEvidenceShelf, sfClaimRow, sfTub, sfQuestionCard, sfSection. They would be dead exports now.
13. **Extra EXCLUDED rows added for later faces**: orange slice, watermelon, knife, bowl, cup, bucket. These are containers, fruit slices and knives per the pedagogy §A; none is a CLAIM row.

## Measurements
- **Clay areas (u²):** lump 3 462 (−4.7 %) · ball 3 634 · boat clay 3 391 (−6.7 %). The design's hull passed as written. My first attempt to deepen it was wrong, and I reverted it after measuring.
- **Rings at d2:** 27.2 px, identical attributes, centres 47.6 px apart. The top ring's centre is on the waterline and the floor ring's bottom is on the gravel. Stars 40 px, pictures 60 px, labels 14 px on one line, legend words 18 px.
- **Body heights:** 811 (the 814 chrome), 766 (the en 2+2 lines), 700 (the de 3-line fixture), 667 (the fi 4-line + 3-line worst legal chrome; this is the G1-376 fixture).
- **Node sweep, 400 seeds** (d2 float share per row position): 50.3 / 53.8 / 50.0 / 52.5 / 47.8 / 45.8 %. All are within 50 ± 5 in both directions, with 0 order-rule or mustInclude breaks, 0 locale-dependent draws and 400 distinct pages.
- **Shipped seed (epoch 1):** toyboat, ring, hammer, pumpkin, ball, pliers = FSSFFS.

## Gate output
```
node qa/verify-b6-sink-or-float.js         (full, 20-seed render sweep)
water-tank gate: PASS (500 assertions, 6/6 poisons killed)
clay-form gate: PASS (140 assertions, 4/4 poisons killed)
neutral: 0 findings (CLAIMS 22, PAIRS 10, TF 17) · bank en: 0 findings · base pool 11 float / 9 sink
render d1/d2/d3 verify 0 lints 0 · long chrome de (700) + fi (667) clean · widest de + fr words at the fi chrome clean
render sweep: 20 distinct verify-clean pages
PASS (142 assertions, 20/20 poisons killed)
```
- **Poisons killed:** P1-P14 (design §5), with de/fr/es control drafts all clean. Render poisons PR1 (pre-filled ring), PR5 (FFFSSS), PR10 (float word under a picture). FL (rows frozen: FILL fails at 814), FG (rows past the 677 body), SP (uncapped d1 rows: SPARSE).
- **water-tank poisons:** PT1 (top ring 4 px down), PT2 (dash differs), PT3 (rings intersect), PT4 (off-palette), PT5 (bubble in the air), PT6 (float blob sunk).
- **clay-form poisons:** PC1 (half-clay boat), PC2 (lid over the hollow), PC3 (different fill), PC4 (dimple in the hollow).
- **Face poisons deferred to Phase E:** PR2-PR4, PR6-PR9, PR11.

Baseline proof: `node tools/b3-baseline.js --check --quick` → `checked build 3896 + enum 299 in 23s: 0 drifted (0 expected), 0 missing` / **PASS**. `node i18n/build-en.js` → `722 types … (title lint clean)`.

## PNGs for the reviewer
- `scripts/worksheet-gen/out/dev/G1-399-null-d1-en.png` · `G1-399-null-d2-en.png` · `G1-399-null-d3-en.png` (`render/one.js`, all verify and lint clean)
- `scripts/worksheet-gen/out/dev/G1-399-null-d2-en-grey100.png`: d2 in greyscale at 100 % print size (1 css px). The rings read mid-grey dashed; the waterline, gravel line and star read.
- `scripts/worksheet-gen/out/dev/G1-399-art-colour.png` · `G1-399-art-grey.png`: every tank mode at 112×56 … 639×520 and every clay form at 72 / 120.
- `scripts/worksheet-gen/out/dev/G1-399-gate/G1-399-gate-widest-de.png` · `…-widest-fr.png` · `…-d2-longchrome-fi.png` · `…-d2-en-814.png`

## Open items for the faces and the panels
- **F4 (`spots:3`) cannot be built at 639:** three 150 px spots overlap there, and the primitive throws. F4 d3 needs a wider tub or smaller spots.
- **`instructionBans`** is keyed per face (`base` today). Each panel adds its locale's list and the face lists (F1/F3 ban colour; F2 carries both).
- **Every locale block must author** `labels` for every CLAIM it uses (the vocab traps are nail and rock), `forbidden`, `experimentWords`, `tf`, `report` and `questions`. A missing label silently shrinks the pool; the validator fails if d3 can no longer be filled.
- **The legend is the only float/sink text,** and `verify()` asserts each word appears exactly once. A panel must not reuse the float or sink word inside a head.
- **The `Surprise?` head sits in a 64 px column at 13 px.** It fits en and de ("Überrascht?"); a longer locale word will be caught by the head-collision check in `verify()`.

## Lead review round 1 (2026-09-23): two defects fixed

1. **Word clash.** The instruction says "Color a **ring**…" while one object on the page was labelled `ring` (the diamond ring). That ring is also a choking-size object no teacher drops in a tub.
   - **Removed** `accessories/ring` from CLAIMS in every locale and added it to EXCLUDED.
   - P4 and P5 were apple/ring and lemon/ring; they are now apple/nail and lemon/nail. The mass order still holds and still needs no measuring.
   - The base pool is now 11 float / 8 sink. The small sinkers are nail and key, so d3's two small sinkers can still be drawn.
   - **New rule 11**, keyed on the bank's own apparatus literals. Every locale block carries `apparatus: {ring, tank, star}` (en `ring` / `tank` / `star`). No picture label may equal or contain one of those words (lower-case substring). The base instruction must name the ring word and the tank word.
   - The rule is enforced in three places: `validateBank`, the builder (which refuses with "contains the apparatus word"), and the de/fr/es control drafts, which now carry their own apparatus words (Ring/Becken/Stern, anneau/bassin/étoile, anillo/tanque/estrella) and pass clean.
   - Poisons, all KILLED: **P15** `labels.nail = "nail ring"` · **P16** `labels.key = "ring"` · **P17** the builder refuses `labels.pencil = "pencil ring"` · **P18** `accessories/ring` put back into CLAIMS, caught as an EXCLUDED picture.
2. **The sink ring must rest ON the floor.**
   - **Measured before the fix:** the sink ring's bottom sat 1.0 px above the gravel line; the float ring's centre was 0.00 px off the waterline.
   - **Changed:** `water-tank.js` now puts the floor ring's bottom 1 px INTO the gravel line (`cy = floorY - r + 1`), and the legend-sink blob's bottom moved with it.
   - **Primitive gate, tightened:** the floor ring's bottom must be at most 2 px above and at most 1.5 px into the gravel line; the top ring must straddle the waterline, with its top above and its bottom below. New poisons: **PT7** floor ring lifted 4 px, **PT8** float ring fully under water. Both KILLED.
   - **Render assertion in `verify()`**, measured on the rendered geometry of every tank: the float ring's centre is within 1 px of the waterline's mean y, and the sink ring's bottom is within −2/+1.5 px of the gravel line. New render poisons: **PR12** sink ring lifted 6 px, **PR13** float ring 18 px down (fully under water). Both KILLED.

### Gate lines after the fix
```
water-tank gate: PASS (500 assertions, 8/8 poisons killed)
clay-form gate: PASS (140 assertions, 4/4 poisons killed)
node sweep 400 seeds: float share per row 51.0% 53.3% 48.8% 50.0% 52.0% 45.0% · rule breaks 0 · locale-dependent 0 · distinct 400
shipped seed (epoch 1): toyboat,pliers,scissors,pumpkin,key,ball = FSSFSF
render d1/d2/d3 + long chrome de (700) / fi (667) + widest de/fr: verify 0, lints 0 · render sweep 20 distinct verify-clean pages
control de/fr/es drafts: 0 findings
verify-b6-sink-or-float: PASS (142 assertions, 26/26 poisons killed)
b3-baseline --check --quick: 0 drifted (0 expected), 0 missing — PASS · build-en: 722 types (title lint clean)
```
**Note:** the row-6 float share is 45.0 % after this change, exactly at the ±5 edge. It passes, but a later pool change could tip it; watch it.

### Renders after the fix
All under `scripts/worksheet-gen/out/dev/`:
- `G1-399-null-d1-en.png`, `G1-399-null-d2-en.png`, `G1-399-null-d3-en.png` (all verify and lint clean)
- `G1-399-null-d2-en-grey100.png`
- `G1-399-art-colour.png`, `G1-399-art-grey.png`

I read the new d2: the sink ring now sits on the gravel line, the float ring straddles the waterline as in the legend, and no picture label is an apparatus word.
