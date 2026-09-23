# G1-376 `plants`: base build record (2026-09-23)

Contract: `G1-376-plants.md` §2 (base page) and §5 (data and gates). The faces are Phase 2 and are not built here.

## What was built
| file | what |
|---|---|
| `scripts/worksheet-gen/primitives/plant-figure.js` | NEW primitive. Exports `plantFigure` (the tall plant in a see-through soil box, 6 part groups, tags on threads, rings), `plantStage` (the 6 growth stages, plus `potted`), `flowerSection` (the cut-away flower with `FLOWER_ANCHORS`), `plantPartIcon`, plus `ANCHORS`, `TAG_SLOTS`, `FLOWER_ANCHORS`, `MIN_H` (180), `SOIL_Y` (440). Tokens only. The outline is 3 px at every size (units = 3/scale). Coral appears only on tags. |
| `scripts/worksheet-gen/qa/verify-plant-figure.js` | NEW node gate. It parses the geometry back out of the EMITTED svg (paths with M/L/Q/C/A, rotated ellipses and rects) and checks it against the tables. It runs all 16 anchor combinations at h 600 and h 570. Checks: point-in-shape for every anchor, the soil rule, no thread crossings, no thread over a foreign tag, tags at least 32 px apart and inside the viewBox, px anchors, palette, coral only on tags, stroke widths, the §2 minimum sizes, pod vs N1, pebbles vs roots. It also covers flowerSection, plantStage and plantPartIcon. 6 poisons plus a control. |
| `scripts/worksheet-gen/templates/components-b5/plants.js` | `plantTagStage`, `plantLabelCard` (+ `plantLabelCardHeight`), `plantBank`. The face components (`needUnit`, `cycleRing`, `cycleStrip`, `eatCard`, `jobCard`, `flowerStage`) are deferred to Phase 2. |
| `scripts/worksheet-gen/types/g1/G1-376-parts-of-a-plant.js` | Base spec. themeAxis off, no unitAxis. `_buildWith` is the poison seam. The composer and ladder follow §2. `verify(page)` re-derives from stamps plus rendered geometry and runs a node cross-check of the bank literals. |
| `scripts/worksheet-gen/data/b5/plants.js` | `PLANTS.en` (the locale block per §5) and `PLANTS_NEUTRAL` (PARTS, NEEDS, NEED_PICS, NON_NEEDS 12, NON_NEED_FORBIDDEN, EAT 16 with `allow`, EAT_BLOCKED, STAGES, JOB_PARTS). The first export is the locale map, as `lib/b5-common.js bankModule` expects. `data/` is gitignored, so it must be force-added. |
| `scripts/worksheet-gen/qa/verify-b5-plants.js` | Family gate. Exports `validateBank(block, loc)` (§5 rules 1-3, 5, 7-12) and `validateNeutral(N)` (rules 4-6). |

No shared file was edited. `node i18n/build-en.js` regenerated `i18n/strings.en.json` (as instructed). Its output: 661 types, title lint clean.

## Gate output
- `node qa/verify-plant-figure.js`: **PASS (8873 assertions, 6/6 poisons killed)**. The poisons are PA (seed ring in the pod window), PB (root above the soil), PC (stem thread crosses the seed thread), PD (off-palette), PE (coral petal) and PF (fruit ring on a seed). Control: 0 findings.
- `node qa/verify-b5-plants.js` (full, 20-seed sweep): **PASS (140 assertions, 19/19 poisons killed)** (after the SPARSE fix below).
  - All 14 data poisons fail: P1-P14.
  - Base render poisons: PR7 (y-sorted numbering, via the gate-only `forceNumbers` seam), PR8 (thread 20 px off its anchor), PR9 (root anchor above the soil), PR13 (two-row bank at the fi chrome).
  - The de control draft reports 0 findings.
  - Node sweep over 400 seeds: 0 y-sorted numberings, 0 bank tells, all 16/16 anchor combinations drawn, and the draw is locale-neutral.
  - An unauthored `sv` locale REFUSES.
  - The 20 d2 renders are all distinct and all verify-clean.
- Renders:
  - d1, d2 and d3 `en`: verify and lints clean. Body 799, plant 592.
  - de long chrome: body 710.
  - fi 4-line+ chrome: body 667.
  - The widest bank ("Wurzeln Stängel Blatt Blüte Frucht Samen") fits in one row, 675 px wide.
- `node tools/b3-baseline.js --check --quick`: `checked build 3652 + enum 277 in 22s: 0 drifted (0 expected), 0 missing` / **PASS**.

## SPARSE fix (coordinator review, 2026-09-23)
- **Defect.** The stage row was `minmax(figureH,1fr)` with the content centred, which left a ~150 px blank band between the bank and the flower at the 814 chrome.
- **Fix.** The root grid is now TOP-ANCHORED: `grid-template-rows: auto <figureH>px; align-content: start`.
  - The gap from the bank to the first drawn element is 22 px (the bank margin of 10 plus the flower's 12-unit top). The page's slack falls below the stage.
  - The label card stays centred on the plant, with its top near the flower and its bottom near the soil box.
- **New assertion** in `qa/verify-b5-plants.js`: the blank band from the bank's bottom to the first drawn element (plant parts, tags, card) must be **≤ 40 px**. Checked on d1, d2, the sweep, the de 722 chrome, the fi 667 chrome and the widest-bank case; every one measures 22 px.
- **Poisoned both ways:**
  - Poison PS (the pre-review centred stage) is KILLED with "SPARSE — N px blank band".
  - Control: the shipped d2 measures 22 px ≤ 40.

## Deviations (each measured)
1. **Plant drawn at h 592, not 600.** The ruled 677 floor is not what the page actually leaves. Measured: a long fi title plus a 2-3-line instruction leaves a body of **667 px**. At that height the design stack (59 + 10 + 600 = 669) crossed the footer by 3 px (gate FAIL, footer lint). At 592 the stack is 661. Every px-sized mark (tags r15, numerals 18, rings r8, strokes) is unchanged; scale is 0.987 and the seed is 13.8 px. The grid row is `<figureH>px`, top-anchored (see the SPARSE fix).
2. **Sepals.** The table puts them at "L16 W9 from (160,86) at 120/60°". There they sit entirely under petals 2 and 3 (which reach y 106) and never show. They are drawn in the petal gaps at 108° and 252° instead (radius 12 to 50, W 11), so they peek out between the petals.
3. **Pod window** is a rotated rounded rect along the pod axis (y 262..332, 20 wide) instead of a horizontal clip, so its rim follows the pod.
4. **Glints** are mirrored to the upper-RIGHT corner of the box. The root-B thread (y 476) ran straight through the second left glint.
5. **Root-B tag slot is (21,476), not (24,476).** At x 24 the disc touched the soil-box wall.
6. **Potted soil ellipse** is creamDeep with a 1.5 teal rim (the design gives no fill).
7. **Pod length** is 124.8 units (caliper along the axis) against the §2 "~118", which is 5.7 % off. The gate tolerance is 12 %. The drawing follows the capsule geometry, (110,250)→(98,344) with r 15.
8. **Row badges** are 40 px, below the G1 44 floor. They are labels, not write targets; the write targets are the 205×64 boxes.
9. **Face strings are keyed by layout** (`needs cycle eat jobs flower`) because the face ids are not yet allocated (K-371+, G1-381+, G2-360+, G3-392+). Rule 12 checks base plus the 5 layouts. The emitter should re-key them.
10. **Rule 10 in non-en locales.** The instruction bans exist only for EN. Each panel draft should supply `instructionBans.<face>` (word lists). The validator applies them when present.

## PNGs for the reviewer
- Pages:
  - `scripts/worksheet-gen/out/dev/G1-376-null-d{1,2,3}-en.png`
  - `G1-376-null-d2-en-grey.png` (mono check)
- Gate renders: `out/dev/G1-376-gate/G1-376-gate-d2-longchrome-{de,fi}.png`, `...-widest-bank-fi-chrome.png`, `...-sweep-*.png`, `...-poison-PR*.png`
- Primitive sheet (colour and greyscale): `out/dev/G1-376-prim.png` and `G1-376-prim-grey.png`. It shows two tag variants at h 600, the h 180 flowering inset with the dashed ring, 6 stages at w 116, 3 potted stages, the flower section with 5 tags, and 12 part icons at 32 and 64. `G1-376-prim-plant600.png` is a crop.
- What I checked when reading them:
  - In mono, the tags read mid-grey with white numerals, and the seeds and anthers are the darkest marks.
  - The roots read as inside the glass.
  - The pod reads as an opened pea pod on a stalk.
  - The seed ring encloses one seed.
  - The fruit ring sits on the solid pod tip.

## Open items for the faces and panels
- Build the face components and the `layout` branches (F1-F5), plus face render poisons PR1-PR6 and PR10-PR12.
- `plantPartIcon`: the `fruit` icon (a closed pod) reads like a pill at 32 px, and the `stem` leaf stubs in `grid` are faint. Revisit when F3 chips are built.
- `plantStage fruiting` at w 116: the pod slightly overlaps the upper-right leaf. Read the F2 cards at print size.
- The panels author `partWords` / `flowerWords` / `jobs` / `partStems` / `forbidden` / `instructionBans` / strings ×10. The EN strings are a source to audit. Note that en `partWords.root` is the plural "roots" (§4) and `jobs.flower` uses US "colors".
- `FORBIDDEN_FLOOR` in the gate seeds §4's wrong-register lists (de Blume/Stengel/Stamm/Obst, es/pt fruta, it frutta, nl fruit, the Nordic definite forms). Panels extend it through `forbidden`.

## Base FILL pass (2026-09-23)
- **Defect.** The stage row was a fixed `592px`, so at the one-line en chrome (body 799) the soil box ended at ~82 % of the body with a pale band below (`_FACE-BRIEF.md` FILL: ≥ 85 % at 814, inside the body at 677).
- **Fix (base path only; faces byte-identical).** The base now draws the plant with `plantFillStage` (drawn at its 592 minimum, svg meet/top-anchored) in a grid row `minmax(figureH, figureMax)`: d1/d2 `figureMax` 680 (under the bank), d3 712 (the 380 px stage's width limit, 380 × 600/320). A new guard refuses a `figureMax` outside `[figureH, 712.5]`. Anchors are stamped in viewBox units (`data-lcs-anchors-u` + `data-lcs-vb`, plus `data-lcs-figure-max`); `verify()` maps rings, threads and the soil line through the svg's CTM and asserts the drawn plant is in `[figureH, figureMax]` and inside its stage. The card stays centred on the stage row.
- **Measured (ink = part groups + tags + soil box + card + bank):** d1/d2 **92.7 %** (was ~82 %), d3 **87.9 %** (width-bound), de 722 fixture 98.8 %, fi 667 fixture 98.8 % — inside the body, footer clear; SPARSE gap bank → plant 22-24 px.
- **Gate** (`qa/verify-b5-plants.js`): base FILL asserted on d1/d2/d3 (`fill:'one'`, ≥ 85 %) and "never past the body" on every render. Poisoned both ways: FL-d2 / FL-d3 (the row frozen at 592 → "FILL — the content ends at …") KILLED; FG (row forced to 640 at the fi 667 chrome → overflow / footer) KILLED; the control prints 92.7 %. PS now freezes the row and spreads it with `space-between` (the old centred-row poison no longer opens a band once the plant grows). Full gate **PASS (302 assertions, 43/43 poisons killed)**.
- Baseline: drift only on `G1-376|nothm|d1|d2|d3|en`; no face id drifts. Read: d1/d2/d3 en, the de and fi long chromes.
