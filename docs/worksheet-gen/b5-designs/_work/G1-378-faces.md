# G1-378 `earth-and-space`: the five variation faces (Phase E, 2026-09-23)

Contract: `../G1-378-earth-and-space.md` §3 and §5. All five are **CODE** faces on ONE additive knob, `layout`, read by `types/g1/G1-378-sun-earth-and-moon.js` (`_buildFace` / `_verifyFace`). When `layout` is undefined the base runs unchanged, byte for byte (`node tools/b3-baseline.js --check --quick` PASS). Rows are in `tools/b5var-rows/earth-and-space.js`, and the specs are emitted by `node tools/gen-b5var-specs.js`. Each face root stamps `data-lcs-layout` and keeps `data-lcs-type="G1-378"`.

## Files touched (type-scoped only)
| file | change |
|---|---|
| `types/g1/G1-378-sun-earth-and-moon.js` | a `layout` config now goes to `_buildFace` (the base still refuses an unknown layout). `verify()` sends face pages to `_verifyFace`. F3 reads `data/science/day-vs-night.json` for its chip labels, as design §5 allows |
| `templates/components-b5/earth-and-space.js` | adds `lin`, `faceRoot`, `growCue`, `moonRail`, `phaseBank`, `phaseCard`, `dayNightModel`, `pinTable`, `planetBankCard`, `fanGeometry`, `orbitFan`, `sizeBank`, `sizeGlyph`, `sizeBins` |
| `primitives/sky-bodies.js` | three ADDITIVE options, each off by default: `sunEdge({rayDeg, asPath})` and `earthTop({spin:'ring'})`. The primitive gate still PASSes, 88/88, 7/7 |
| `data/b5/earth-and-space.js` | adds `PLANET_ALPHA`, each locale's alphabetical order of the planet ids (gitignored: force-add) |
| `qa/verify-b5-earth-and-space.js` | adds rule 6b plus poison P13. The old "face config refused" poison became an unknown-layout refusal, plus a check that the base carries no `data-lcs-layout`. Adds the call to section 5 |
| `qa/b5-earth-and-space-faces.js` | NEW: section 5 of the gate |
| `qa/verify-moon-phase.js` | exports `expFracIn` (additive) |
| `tools/b5var-rows/earth-and-space.js` | NEW; emits `types/g1/G1-391-…`, `types/g2/G2-367-…`, `types/g2/G2-368-…`, `types/g3/G3-394-…`, `types/g3/G3-395-…` |

## Sizing: how every face fills the page and keeps its floors
The face root is `container-type:size`. Each drawing size is `lin(a,b)`: `a` at the 677 body, `b` at the 811 body, clamped. The emitted SVG keeps its own width and height attributes, which are what the gate rasterises; CSS changes only the size it is displayed at. So the geometry never varies with the chrome, and the floors hold at 677. The gate measures FILL and SPARSE at the default chrome and at 722 and 677 (A4, as the base gate does). A frame counts only by its edges in the SPARSE measurement.

## Faces
**G1-391 Moon Phases in Order**, CODE `layout:'moon-phases-in-order'` (G1)
- **What the child does:** two rails, "grow" (phases 0-4) and "shrink" (4,5,6,7,0), each with a wedge-and-arrow cue. The child writes 1-5 in the empty boxes under 5 shuffled moons. Moon size 112-120, boxes 56-64 × 52-60.
- **Tells:** the composer re-draws until neither rail's answers are sorted or reversed and the two rails differ.
- **Checks in `verify()`:** rank re-derived from (1-cos)/2 per rail; stamp within ±0.001; the lit side for the hemisphere of the locale (S iff pt); boxes are `ws-blankbox`, empty and ≥ the box size; no moon in the cue.
- **Checks in the gate:** every moon rasterised in en and pt, lit fraction within ±0.001 of the model (measured max error 0.0000), pt waxing moons lit LEFT.
- **Poisons:** PR3, PR4, PR13, PR1f (pt drawn N), PL (stamp), PM (terminator), PS, PO, PF, PA1.
- **Render:** `out/dev/G1-391-null-d2-en.png`. Body 799, fill 94 %.
- **Deviation:** the cue's arrow points left→right on both rails and only the wedge is mirrored for "shrink". Mirroring the whole cue would reverse the reading direction.

**G2-367 Name the Moon Phases**, CODE `layout:'moon-phase-names'` (G2)
- **What the child does:** a bank of the 4 phase names, then a 2×4 grid of cards, each a moon (96-108) in a square beside 2 writing lines (168 × 52, glyphH 24).
- **Tells:** no phase is repeated next to itself or directly above itself. The directly-above rule is my addition: the first render stacked identical moons in columns. The bank order is not cards 1-4 and not their reverse.
- **Checks in `verify()`:** the multiset {0,2,4,6}×2; bank literals === `phaseNames`, all different, on ONE row.
- **Poisons:** PR5, PT2, PS, PO, PF. Fill 100 %.
- **Render:** `G2-367-null-d2-en.png`.

**G2-368 Why Do We Have Day and Night?**, CODE `layout:'day-and-night-model'` (G2)
- **What the child does:** a panel with the Sun cut by the edge (R 500 > Earth 150), three coral light arrows, and ONE white Earth (r 150, shown at 340-404 px) with 6 pins, 3 day and 3 night. Below it, a 2-column pin table with Day / Night chips (from K-208), unmarked.
- **Tells:** the day/night pattern by pin number is not DDDNNN, NNNDDD or alternating, and each table column holds both answers (the column rule is my addition).
- **Checks in `verify()`:** the answer is re-derived from the DRAWING (is the pin on the Sun's side?); pin angle ±5° against its stamp; pins ≥ 50 px apart; no night shading.
- **Checks in the gate:** the pins are re-measured on the pixels (`checkEarthTop`).
- **Poisons:** PR6, PR7, PS, PO, PF, PA2. Fill 92 %.
- **Deviations:**
  - The spin is now a 300° counter-clockwise ring. The primitive's under-pole arc, with the pole dot above it, read as a **smile** (a face).
  - The Sun is drawn as the visible part of the disc as a path, and its rays are re-aimed at the visible limb (base open item). A clipped circle of radius 500 kept a bounding box that ran off the page and failed `qa/lints` overflow.
  - The chips are 112 px, not 120. At 120 the table ran wider than the body.

**G3-394 Planets in Order from the Sun**, CODE `layout:'planets-in-order'` (G3)
- **What the child does:** 8 bank cards, each a glyph at one uniform size plus the name at 16 px. Below, the orbit fan: the Sun is a quarter disc in the corner, with 8 identical numbered discs (d 36) and one writing line each (glyphH 24). The arcs run down-left only.
- **Tells:** the bank is never the answer order, its reverse, or any locale's alphabetical order (`PLANET_ALPHA`).
- **Checks in `verify()`:** the answer order; discs byte-identical; x strictly increasing; no arc crosses a line; glyphs all one size; names not clipped; no planet drawing in the fan.
- **Checks in the gate:** the order is derived from the gate's OWN semi-major-axis table, and the slot answers must equal it; `checkSet` on the bank glyphs.
- **Poisons:** PO/PO2 (model), PR8, PR9, PR10, PX4, PK4, PS, PO, PF. Fill 89 %.
- **Deviations:**
  - The pitch is fixed at 56 with top 120, not [50,56] with top 140. CSS scales one geometry of 639×540 to 540-570 px.
  - The Sun keeps 3 visible rays at 25/45/65°. Of the design's 4 rays, 2 fell outside the panel.
  - The bank gap is 3 px and the cards have no padding. fi "Merkurius" and "Neptunus" clipped at 72 px of inner width; measured fixed.

**G3-395 Giant and Rocky Planets**, CODE `layout:'planet-sizes'` (G3)
- **What the child does:** a bank of 10 names, then 3 bins. Each bin has an abstract outline circle (large / small / crossed), its label, and **5** writing lines (h 80, glyphH 40).
- **Tells:** no 3 names of one class in a row; the Sun and Moon are not adjacent and not at both ends.
- **Checks in `verify()`:** class counts 4/4/2 from `SIZE_CLASS`; equal line counts in every bin; no planet drawing; no digit.
- **Checks in the gate:** `SIZE_CLASS` re-derived from the diameters.
- **Poisons:** PR11, PK5, PT5, PO2, PS, PO, PF. Fill 100 %.
- **Deviation:** **5 lines per bin (15), not 4 (12).** With 4 rows at the design's 64 px, the band between rows measured 51 px at the default chrome, over the 40 px limit. Equal counts per bin still print no 4/4/2.

## Refusals visible from the bank shape
None. Every face uses only literals every locale must author (`phaseNames`, `planets`, `notPlanet`, `classLabels`, K-208 day/night ×11). Hub expectation: 5 faces × 11 locales.

## Open items for the panels
- F4: the bank name must fit about 77 px at Nunito 800 16. `verify()` reports clipping per locale; fi "Merkurius" measured 76.
- F4: `PLANET_ALPHA` holds the standard exonyms. Rule 6b fails a draft whose names sort differently; update the table if so.
- F2: the 4 phase names must fit ONE bank row (rule 5 estimate plus the render check).
- F5: labels at most 2 lines in 186 px (Baloo 700 18).
- F3: the Earth is a plain white disc by design (no shading). A panel might ask whether children read it as Earth; the title and instruction carry that.
- Neptune's streak (base item) is still there.

## Lines
- Gate: `PASS (4222 assertions, 61/61 poisons killed)`. `--quick`: `PASS (1892 assertions, 61/61 poisons killed)` before P13's partner fixes.
- Distinctness: `every variation differs from the deck its base publishes and from its siblings`.
- Baseline: `checked build 3840 + enum 277 in 29s: 0 drifted (0 expected), 0 missing` / `PASS`.
- build-en: `708 types … (title lint clean)`.
- Renders read (colour and greyscale montage `out/dev/G1-378-faces-grey-montage.png`): nothing clipped, nothing under the footer. Moons are clear in greyscale (grey dark part, white lit part, teal rim). Pins show as grey discs. The glyphs stay distinct.
