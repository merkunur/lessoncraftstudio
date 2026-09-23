# G1-379 `maps`: base build record (2026-09-23)

Contract: `G1-379-maps.md` §2 (base page) and §5 (data and gates), plus every primitive the final names (so the faces are unblocked). Face specs are Phase 2 and are not emitted. No shared file edited; nothing git-added.

## What was built
| file | what |
|---|---|
| `scripts/worksheet-gen/types/g1/G1-379-map-skills.js` | Base spec "Read the Map Key". Theme axis off, no unitAxis, no library picture. `_compose` (locale-neutral draw) + `_buildWith` (poison seam; `forceCards` / `forceShowSymbol` are gate-only). `verify(page)` recounts every answer from the rendered map and runs a node cross-check of the printed words. |
| `templates/components-b5/maps.js` | `mapSheet`, `legendBand` (+`legendHeight`), `countStrip`, `northArrow`. The face components (viewColumns, viewGlyph, roseCard, worldMapCard, atlasIndex, directionRow) are Phase 2. |
| `primitives/map-symbol.js` + `qa/verify-map-symbols.js` | 8 top-view plan symbols, 44 viewBox, no text. |
| `primitives/island-map.js` + `data/b5/island.js` (ISLE_1) + `tools/build-island-slots.js` + `qa/verify-island-map.js` | The wordless island (centripetal Catmull-Rom coast, river, road, 2 footpaths, derived bridges, sea hatch, north arrow), committed slots for 44/615, 48/615 and 40/533. |
| `primitives/compass-rose.js` + `qa/verify-compass-rose.js` | F2/F5 rose; the letters are always the locale's own. |
| `primitives/top-side-view.js` + `qa/verify-top-side-view.js` | F1: one model, two orthographic views, one scale. The 10 TOPSIDE records are in `data/b5/maps.js`. |
| `primitives/world-map.js` + `tools/build-world-map.js` + generated `data/b5/world-map.js` (31.5 KB) + vendored `tools/vendor/ne_110m_land.geojson` + `qa/verify-world-map.js` | Natural Earth 1:110m land, **natural-earth-vector tag v5.1.2**, fetched once with node https. SHA-256 `9e0729ee253ca7d7…`. Natural Earth I projection, central meridian 11° E, seam at 169° W; Douglas-Peucker 0.8 px. The Caspian is a hole in this layer (measured), so no lakes file is vendored. |
| `data/b5/maps.js` | `MAPS_LOC.en` (the EN block, rules 1-12 clean) and `MAPS` (the neutral facts, TOPSIDE, REFUSED_PICS). |
| `qa/verify-b5-maps.js` | Family gate; exports `validateBank` / `validateNeutral`. |
| `qa/b5-maps-harness.js` | Type-scoped render harness (file:// fonts, rasteriser). |

## Gate output
- **`node qa/verify-b5-maps.js`** (full run): **PASS (110 assertions, 22/22 poisons killed).**
  - All 7 sub-gates pass. Each primitive gate killed every one of its poisons:
    - map-symbols: 194 assertions, 2/2 (PR3, PR4)
    - island-map: 1015 assertions, 3/3 (PR2, arrow on land, stale slots)
    - compass-rose: 271 assertions, 2/2 (PR7, PR8)
    - top-side-view: 242 assertions, 2/2 (PR6, a second scale)
    - world-map: 103 assertions, 5/5 (PR9, PR10, PR11, PR12, PR20)
  - Both tools pass `--check`.
  - Family-level poisons killed:
    - Data: P1-P13 (the de control draft reports 0 findings).
    - The F3 "number" ban, tested both ways: "Write the number…" fires; the en source "each numbered continent" passes.
    - Rule 8: a token wider than the card.
    - Render: PR1, PR2, PR17, PR18, PR19, plus PS (a 150 px band: **SPARSE**, control bands [0, 20]) and PT (card order equal to the key order).
- **Render (d2, and d3):**
  - verify and lints clean.
  - Body 799. Sheet 524, strip 120, bands between blocks 0 / 20 px, 135 px of slack **below** the cards (top-anchored).
  - At de 722: stack 664, body 700.
  - At fi 4-line: body **667** (not 677; the same measurement as G1-376). Stack 664, so there are **3 px to spare**.
  - d1: strip 172.
- **Answer-position tells, per page** (400 seeds per level; the seed has no locale):
  - Always 0 on every level: card order equal to key order, count-sorted card order, adjacent equal answers, capacity breaches, non-neutral draws.
  - Position of the largest answer:

    | level | positions |
    |---|---|
    | d1 | 27/30/28/**15** % |
    | d2 | 20/23/23/18/17 % |
    | d3 | 13/23/16/20/16/13 % |

    The one skew is that the last card at d1 is less often the largest. It comes from the no-sort rule and stays inside the gate's 8-40 % band.
  - Mean answer by position is within 0.6 of the overall mean.
  - The key-rank to card-rank correlation r is between −0.07 and 0.
- **World map, measured:**
  - True areas recovered by per-row inverse area scale (M km²):

    | region | measured | real |
    |---|---|---|
    | Asia | 43.6 | 44.6 |
    | Africa | 30.0 | 30.4 |
    | North America | 24.2 | 24.7 |
    | South America | 17.9 | 17.8 |
    | Europe | 10.0 | 10.2 |
    | Oceania | 8.9 | 8.5 |

  - Greenland is 7.2 % of Africa by true area (14.8 % on the page).
  - Europe bbox 122.8 px; New Zealand 14.3 px; Madagascar 27.5 px; Europe/Asia cut 74 px over land.
  - Hausdorff 0.90 px (source to drawn) and 0.22 px (drawn to source).
  - 25 land and 8 water checkpoints pass on the render.
  - Heights 327.6 / 279.7 px, as designed.
  - `mapOpened` is recorded against the geometry hash.
- `node i18n/build-en.js`: 668 types, title lint clean.
- **`node tools/b3-baseline.js --check --quick`: `checked build 3680 + enum 277 in 20s: 0 drifted (0 expected), 0 missing` / PASS.**

## Deviations (each measured)
1. **Symbol distinctness rule.**
   - The design's blanket "IoU ≤ 0.55 for every pair AND (Δlum ≥ 12 % OR IoU ≤ 0.35)" cannot be met by the design's own symbols. Every compact top view fills the same 44 box: house/pond 0.79, pond/tent 0.75, house/tree 0.76. Tree/bush is "same tone" by design (Δlum 1-3 %).
   - The gate now requires every pair to be distinct in greyscale by at least one of three: silhouette IoU ≤ 0.35, Δlum ≥ 12 %, or **ink-pattern IoU ≤ 0.35** (outline plus interior marks). The measured maximum is 0.27.
   - The near-miss pair tree/bush must also keep silhouette IoU ≤ 0.55. The bush circles were shrunk to (13.5,28) r 9.5, (30.5,28) r 9.5 and (22,18) r 9 to reach **0.524**; the design value was 0.587.
   - The tree crown is a union with a centre disc of r 15. The lobes alone leave a hole.
2. **Slot builder.**
   - Band clearance is now box-to-band ≥ 6.5 px. The design's 9 + 0.59 × symbol left 2.5 px, and its own gate rule is 6 px.
   - Pitch is symbol + 9 px.
   - Bridges keep ≥ 9 px measured from the drawn bridge box. The design's "30 units" measured 5.3-6.7 px.
   - Capacity at 44/615: none 22 · P1 18 · P2 19. The design had 29/23.
   - Effect: at d2, a page with a footpath places ≤ 14 symbols and a page without one ≤ 18. `placedMax` 16 stays; the composer enforces capacity ≥ placed + 4 on every page.
3. `countStrip` wraps `blankNumeralBox` in a row. Its `flex:0 0 64px` otherwise set the box's HEIGHT to 64 in the column card, which made the stack 680 and overflowed the fi 667 body. The gate now asserts exactly 64 × 48.
4. The reference rose uses 30-unit letters. The design's 26 units measured 12.5 px at px 96, under its own 14 px floor.
5. **World map.**
   - Every cut is extended into open water at both ends.
   - Checkpoint changes:
     - "Istanbul Europe side 28.98 E" falls in the Bosporus gap of the 1:110m layer: there is no land there, and the nearest land is Asian. The checkpoint is now Thrace (28.0 E, 41.2 N).
     - McMurdo (Ross Island) is below the layer's resolution and is replaced by Vostok Station.
     - Cape Horn, the Cape of Good Hope and Dakar are tips searched within 2 px.
   - The proportion rule is asserted on **true** (area-corrected) areas. On raw page pixels North America is larger than Africa, because Natural Earth I is not equal-area, so the design's order is false as stated.
   - The Hausdorff check compares only rings that are drawn: the design's 12 px² drop removes islands such as Vancouver and Timor.
6. Island d3 uses `COUNT_TRIES` of 6000. The d3 count draw is rare at about 1-2 % per try; 400 tries failed.
7. Face strings are keyed by layout (as in G1-376), because the face ids are not yet allocated.

## PNGs for the reviewer (all READ by me)
- Base pages: `scripts/worksheet-gen/out/dev/G1-379-null-d{1,2,3}-en.png`, `G1-379-null-d2-en-grey.png`.
- Gate renders: `out/dev/G1-379-gate/G1-379-gate-d2-longchrome-{de,fi}.png`, plus the sweep and poison renders.
- Primitive sheets (colour and grey):
  - `out/dev/G1-379-map-symbols-{colour,grey}.png` (40/44/48/96)
  - `G1-379-island-{colour,grey}.png` (full slots at 615 with P1, and at 533)
  - `G1-379-compass-rose-{colour,grey}.png` (en/de/fi, 4 rotations, reference 96)
  - `G1-379-top-side-view-{colour,grey}.png` (84 and 168)
  - `G1-379-world-map-{colour,grey}.png` (639 and 480, with the 7+5 set and the merged 5-member set)

## Open items for the faces and panels
- Build the face components and the `layout` branches (F1-F5), with face poisons PR5-PR8 and PR13-PR16.
- Art to re-read at F1 print size:
  - The **chair** side view (a backrest board on legs) reads weakly.
  - The cup handle renders as a solid C.
- Bottom slack is 135 px at the 814 chrome. The page is top-anchored per the SPARSE ruling; a reviewer may prefer larger cards.
- The panels author the full `MAPS_LOC` block. The en strings are a source to audit, and en uses "Oceania" rather than "Australia" (a panel question). Every non-en `instructionBans` list comes from the panels.
- `tools/validate-b5-draft.js` should call `validateBank` from `qa/verify-b5-maps.js`. Rule 8's render half is exported as a gate-internal `measureWords`.

## Base FILL pass (2026-09-23)
- **Defect.** Sheet 524 + gap 20 + strip 120 ended at ~83 % of the 799 px body, 135 px of slack below the cards (the open item above). The map itself cannot grow: its symbols must render exactly `symPx` to match the key.
- **Fix (base path only; faces byte-identical).** `countStrip` gained an optional `grow = { maxH }` (no `grow` = byte-identical; the strip is base-only): the strip becomes a size container `flex:1 1 <min>px; min-height:<min>; max-height:maxH`, the cards stretch, 70 % of the extra height `--mp-g` grows the numeral box (4:3, capped at the card's inner width) and the word band (`flex:1 1 44px`) takes the rest. Configs: d1 `stripMax 212` (min 172), d2/d3 184 (min 120). 200 was tried first and left an oversized empty word band; 184 keeps the word band ~80 px.
- **Measured:** d1 **94.6 %** (was ~90 %), d2 **91.1 %** (was ~83 %), d3 91.1 %; boxes d2 99×74, d1 101×76, d3 77×58 (6 narrow cards: capped at the inner width); de 722 fixture 100 % (strip fills, footer clear), fi 667 fixture 100 % with the boxes at 67×50 — never under 64×48.
- **Gate** (`qa/verify-b5-maps.js`): the exact-64×48 box assertion became "≥ 64×48 and never taller than 4:3"; base FILL asserted on d1/d2/d3 (≥ 85 %) and "inside the body" everywhere. Poisoned both ways: FL-d2 / FL-d3 (strip frozen at its minimum) KILLED; FG (strip forced to 200 at the fi chrome) KILLED; control 91.1 %; PS (a 150 px band) still KILLED. Full gate **PASS (385 assertions, 55/55 poisons killed)**.
- Baseline: drift only on `G1-379|nothm|d1|d2|d3|en`; no face id drifts. Read: d1/d2/d3 en, the de and fi long chromes.
