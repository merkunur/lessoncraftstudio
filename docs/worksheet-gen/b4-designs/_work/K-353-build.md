# K-353 `tangram` : EN BASE build record (2026-09-21)

Built from `docs/worksheet-gen/b4-designs/K-353-tangram.md` (§2 base page, §5 data + gates; §3 read for the additive `mode` knob) under `_BUILD-BRIEF.md`, `_SUBSTRATE.md` and the README cross-type rulings. Exemplars imitated: `types/k/K-324-picture-word-cards.js` (materials sheet, `scissorsGlyph` from the b3 barrel) and `types/g2/G2-319-logic-puzzles.js` (a spec owning a NEW primitive + a node gate). Every number below was measured in the real pipeline (`render/one.js`, file:// fonts) or by node over the real bank. No em-dashes.

## 1 What was built (type-scoped; nothing shared edited)

| file | role |
|---|---|
| `scripts/worksheet-gen/types/k/K-353-tangram.js` | the spec: `exerciseType:'tangram'`, `themeAxis:{applicable:false}`, `unitAxis:{applicable:false}`, d1/d2/d3 per the ladder, `build()` reads ONLY `bank('tangram', loc)` (strings) + `data/b4/tangram-figures.js`; `_buildWith(bankLoc, cfg)` = the gate's poison seam; the additive `mode` knob (a face mode REFUSES on the base until its render path lands; an unknown mode refuses); `verify(page)` is STRUCTURAL and re-derives the seven tans from the `data-lcs-tan` polygon points in-page (class areas, no overlap via an inline convex clipper, they tile the S x S square), the figures from their stamps, the legend rows, the scissors, the stack order and the 56 px edge floor |
| `scripts/worksheet-gen/primitives/tangram.js` | NEW primitive: `TANS` in the design's local coordinates, `placeUnit`, `silhouette` (the edge-cancellation tracer incl. the largest-turn pinch rule), `analyze` (the loader's derivation: bbox, area, silhouette, `symmetryGroup`, `chiral`, `outlineKind`, `counts`, faults = rules 1-6), `transformTiling` (rot/flip RE-DERIVED per tan from the transformed point set; mirrors toggle `flip` on P), `symmetryGroup`, `triangulate` + `areaInside` + `pointInLoop` (the CONCAVE-capable containment), `countTilings` (the lattice tiler), `placeTans`, `tangramFigure` (modes template / solution / outline / silhouette / hole), `canonicalPose` / `tanGlyph` / `tanChip` / `tanLegend`. Token colours only |
| `scripts/worksheet-gen/data/b4/tangram-figures.js` | the locale-neutral bank exactly as §5 lists it (decimal form, `h = Math.SQRT2/4`, `SMALLSQ` / `H` half-assemblies, `pick`): FIGURES (10), MINIS (9), MINI_REFUSED (2 controls), MINI_CANDIDATES (1, see §2.1), SUBS (10), SUBS_EXCLUDED (4), SET, BASE_POOL, F1_POOL2/3, F2/F3/F4/F5 pools, F4_REFUSED, SYMMETRY_TABLE; validated AT LOAD (a malformed row throws); `figure / mini / sub / poolFor / tilingsOf` helpers; `mini()` derives `unique` lazily via the tiler (memoised) and REFUSES a non-unique key. `module.exports = { TANGRAM_FIGURES }`. gitignored: `git add -f` |
| `scripts/worksheet-gen/data/b4/tangram.js` | `{ TANGRAM: { en: { strings } } }`: the 6 title/instruction pairs keyed `'K-353'` + the five face MODES (compose, silhouette, missing, match, count), the shape `validate-b4-draft.js` expects under `banks.tangram` |
| `scripts/worksheet-gen/templates/components-b4/tangram.js` | the 7 NEW components §2 names: `templateBlock`, `figureRow` (consumed by the base) + `composeCard`, `shadowCard`, `missingCard`, `matchRow`, `countCard` (the faces' consumers, built on the primitive, unconsumed until Phase 2) |
| `scripts/worksheet-gen/tools/gate-tangram-figures.js` | the node data gate: rules 1-12 with its OWN geometry (never the bank's memoised derivations), the concave-capable tiler with the design's controls, exit 1 on any failure or silent poison; `check(bank)` exported for the qa gate |
| `scripts/worksheet-gen/qa/verify-b4-tangram.js` | the render gate through `render/render-instance.js`: data + strings validation, d1/d2/d3 + the 733 / 710 / 700 / 677 chrome probes (vacuity-guarded by measured body height + line counts), the seed sweep, the gate's OWN in-page audit with MEASURED floors, every drawing RE-DERIVED from the bank in node, 39 poisons incl. four ban-too-wide controls; `--quick` |
| `docs/worksheet-gen/b4-designs/_work/K-353-build.md` | this record |

`node i18n/build-en.js` passes (`build-en: 603 types -> i18n/strings.en.json (title lint clean)`; K-353 is now in `strings.en.json`, a tracked file the reviewer commits).

`node tools/b3-baseline.js --check --quick`:
```
checked build 3412 + enum 255 in 16s: 0 drifted (0 expected), 0 missing
PASS
```

## 2 Deviations from the design file (each with the measurement)

### 2.1 `l-from-2s-q` is UNIQUE (1 tiling), not 2 (design §3 F1 REFUSED list, §5 rule-7 poison)
The design refused the large triangle from Q+S+S because the scratch lattice tiler (`K-353-unique.js`) reported 2. Re-measured with the same enumerator (`K-353-lq-probe.js`): its two "solutions" are the SAME diamond keyed `0.50000,-0.00000` and `0.50000,0.00000` (a −0 `toFixed` artefact). Geometrically an axis-aligned square on the base cannot fit the triangle at all (its top corners at x 0.323 / 0.677 lie outside the triangle's width 0.354..0.646 at y 0.354), so the diamond off the apex is the only placement and the tiling is unique. The build's tiler snaps |v| < 5e-6 before keying and reports 1 (the exhaustive dense search reported 1 too, before the extreme-point pruning). Consequence: the §5 poison "P4 `l-from-2s-q` must report 2" is UNSATISFIABLE and was replaced by the honest controls `sq-from-2s` = 2 and `rect-m-2s` = 2 (both behaved) plus the concave controls `cat-head` = 1 and `rabbit-head` = 4 (the scratch's convex clipper returned 0 on both). The entry lives in `MINI_CANDIDATES` (proven unique, in NO pool: the gate pins it at 1 as a regression guard on the −0 trap); admitting it to F1 (its outline is 219 x 111 at S 216, fits a card) is a face-build / panel decision, not a data edit.

### 2.2 The root stroke pad is 2.5 px per side (the design's "+3" was an estimate)
`svgRoot` is sized bbox x S + 2 x sp with sp = stroke/2 + 1 = 2.5 (the 3 px stroke is centred on the edge, +1 px air), so a figure is bbox x S + 5, not + 3. Measured at S 216: square 221 x 221 (design 216), tree / arrow 311 x 311 (design 312), boat 311 x 374 (375), cat 275 x 330 (273 x 327), rectangle 311 x 158 (312 x 156); the template block is 347 x 251 (strip 30 + 221); the legend glyph roots are 68 x 36 (L), 50 x 27 (M), 36 x 20 (S), 27 x 27 (Q), 52 x 20 (P), rows 36 high, gap 6 = 204. Base stack d2/d3 = 251 + 16 + 374 (boat) = **641** (design 637) <= 677 (slack 36) and <= 722. Everything fits; the faces inherit the same pad unless they declare `pad` (see §5 item 1).

### 2.3 d1 declares `gap: 12` and `bodyMin: 700` (the four-line title alone)
Design: d1 = 30 + 378 + 16 + 273 = 697 <= 722. Measured with the pad: 30 + 383 + 16 + 273 = **702**, which overflows the 700 body of the four-line fi title by 2 px (footer-overlap lint, caught by the gate's `fi4title` probe on the first run). Fix: a `gap` config knob (default 16; the guard keys on it, 8..24) with d1 at 12 → 30 + 383 + 12 + 273 = **698** <= 700. d1 stays the 100 mm sheet (378 px = 100.01 mm); it is not shipped, and under the 677 combination it is REPORTED by the gate (measured: footer overlap by 21 px), not asserted, the G2-319 d1 precedent.

### 2.4 The seed sweep asserts VARIETY, not pairwise distinctness
5 pool figures → 20 ordered pairs; 20 seeds make a birthday collision certain, so "no two seeds identical" fails a correct rng (measured on the first run: seeds 2 / 4 / 5 drew the same pair). The gate asserts >= half the seeds distinct pairs AND every pool figure drawn AND never the square (measured, 20 seeds: d2 12 distinct ordered pairs of 20 possible, d3 13; every pool figure drawn at both levels). The `--quick` sweep is 12 seeds (6 missed `arrow` by chance, P = 4.7 %).

### 2.5 A shadow's shortest EDGE is not the floor
My first gate asserted the silhouette path's shortest edge >= 56 on d3 and failed the boat (44.7 px: an outline segment between two seam junctions, 0.207 units). The floor law is the smallest TAN edge (0.3536 S) / the scale, so the assertion was a wrong instrument. Replaced by the stronger check: every drawing (template polygons, solution polygons + outline path, silhouette path) is RE-DERIVED from the bank in node at the stamped scale and must equal the stored placement within 0.02 px (the html prints 2 decimals). Poisoned by "figure A stamped with figure B's key" and "one tan nudged 3 px".

### 2.6 `rabbit` fits the base row (the design said it does not) but stays out of the pool
rabbit at S 216 = 221 x 384; the row budget under 677 is (675 − 24)/2 = 325 wide x 677 − 267 = 410 tall, so it fits; the design excluded it by arithmetic that did not hold (30 + 216 + 16 + 381 = 643 <= 677 by its own numbers too). The pool is data (`BASE_POOL`, 5 entries, rabbit absent: it "reads weakly", critic OPEN 2), so nothing changes on the page; the poison that expected rabbit to be refused was replaced by `triangle` (437 wide, refused: "do not fit two-up").

### 2.7 A locale bank exists (`data/b4/tangram.js`)
The design (§1, critic §2) said no per-locale bank exists for this type; the caller's brief and `tools/validate-b4-draft.js` (`banks.tangram` required unless the family is fully refused) want one. Built as the strings-only block; `build()` reads it through `lib/b4-common.js bank()` so a locale without a block is a REFUSAL (measured: `measure([K-353], 'de')` reports the refusal; the panels' apply step fills the 10 blocks). Nothing on the page reads a string.

### 2.8 The tiler is exact-cover with the extreme-point rule (speed, not semantics)
The scratch's dense recursion took 35 s on `pent-l-s-p` (4,484 S candidates x 500 P). The gate's tiler enumerates the same lattice ((a + b√2)/8, |b| <= 12, 8 rotations, P flip; anchors = lattice points inside or on the loop) but places the next tan at the lowest-left uncovered point (an extreme point of the uncovered region is a VERTEX of the tan covering it), so each tiling is generated once: all 9 minis + 3 controls in 2.2 s (was 49 s), same counts on every case measured both ways. Search depth guarded (5e6).

### 2.9 `es "ficha"` ban shape
"fichas de tangram" has two words between; the ban is `ficha(s)` within three words of `tangram` either way (control: "piezas de tangram" passes; a `ficha` TITLE is already a worksheet-word fault).

## 3 Gate output

`node tools/gate-tangram-figures.js`:
```
tangram-figures: 10 figures · 9 minis (m-from-2s:1 p-from-2s:1 trap-m-s:1 bigtri-2l:1 trap-l-m:1 para-2l:1 trap-q-2s:1 kite-l-q-s:1 pent-l-s-p:1) · 10 subs · 0 failures · poison 13/13 · 4.4s
```
(P1 S1 twice · P2 overlap · P3 corner touch · P4 sq-from-2s in the F1 pool · P5 square in F4 · P12 half-h in F5 · P13 a full figure in F5 · P16 area 15/16 · P6' symmetry row edited · P7' flipped M · P11' missing key · P12' a label · P10' an F2 pool of two: all KILLED.) Symmetry groups derived === the design's table for all 10 figures. Pools at 722 / 677: base 5 / 5, compose 8 / 8, silhouette 5 / 4 (cat drops at 677), missing 5 / 4 (with `pad: 1.5`, see §4.3), match 3 (tree arrow rectangle; cat see §4.3), count 8 / 8.

`node qa/verify-b4-tangram.js --quick` (12 seeds): **PASS (1622 assertions, 39/39 poisons killed)**; the full run (20 seeds) is `out/dev/k353-gate-full.log` (see the summary line appended in §3.1). Renders per chrome (body measured): default 733 · LONG 733 · WORST 710 · FI4 700 · COMBO 677, d1/d2/d3 all clean (d1 under COMBO reported: footer overlap, not shipped).

### 3.1 Full-run summary (20 seeds)
```
[C] d2 sweep over 20 seeds: 12 distinct pairs, figures seen cat/rectangle/boat/tree/arrow
[C] d3 sweep over 20 seeds: 13 distinct pairs, figures seen arrow/rectangle/cat/boat/tree
PASS (2294 assertions, 39/39 poisons killed)
```

## 4 PNGs for the reviewer

- `scripts/worksheet-gen/out/dev/K-353-null-d1-en.png` (100 mm sheet + one rectangle)
- `scripts/worksheet-gen/out/dev/K-353-null-d2-en.png` (cat + rectangle, seams)
- `scripts/worksheet-gen/out/dev/K-353-null-d3-en.png` (arrow + rectangle shadows)
- `scripts/worksheet-gen/out/dev/k353-gate/K-353-d2-en-combo677.png` (the 677 fi chrome)
- `scripts/worksheet-gen/out/dev/k353-gate/K-353-d2-en-seed2.png` (rectangle + boat, the tallest figure)

Looked at (Read): the cut-out square reads as one square cut on seven straight lines, the legend reads without a word (L twice the S), cat / rectangle / arrow / boat / tree read as the design's figures; the slack sits between the two blocks. Nothing cut off, nothing sparse inside a block, nothing under 56 px.

## 5 Open items for the faces / panels

1. **F3 / F4 root pad.** The design's card arithmetic used +3 (pad 1.5). With the default pad 2.5: F3 `tree` at S 128 = 186.02 > 186 (the 302 − 12 − 104 column), and F4 `cat` at S 102 = 158 > 156 (box inner). Both faces must draw with `tangramFigure({..., pad: 1.5})` (built: `placeTans` / `tangramFigure` accept `pad`) or lose those figures; `poolFor` takes `cfg.pad`. `matchRow` already passes `pad: 1.5`.
2. **`l-from-2s-q` (§2.1)** is proven unique; the F1 panel/build may admit it (a K.G.B.6 example the design wanted) by moving it from `MINI_CANDIDATES` to `MINIS` + `F1_POOL3` and dropping the candidate pin in the gate.
3. **Face render paths** (compose / silhouette / missing / match / count) are NOT built; `_buildWith` refuses a `mode` config with a Phase-2 message (poisoned). The components exist; their verify branches, composers and the design's face poisons (P5-P11, P15, P17-P19, R1, R3) land with the faces.
4. **Print check** (child scissors, mono laser, 100 %): not performed here (no printer); the d1 sheet is 378 px = 100.01 mm by the page box arithmetic, the d2 set 57.15 mm, small edge 20.2 mm.
5. **Locale blocks** `data/b4/tangram.js` de..fi come from the panels via `apply-b4-locale.js`; `validateStrings(block, loc)` in the qa gate carries the §5 bans x11 (answers phrase, true-size phrase, es ficha, sv grupp, printable word, worksheet word, free claim) and can be run on a draft block.
6. **Taxonomy / hub**: `apps.tangram` + `axes['exercise-type'].tangram` were registered in Phase 0.1 (`register-b4-taxonomy.js`); the landing/hub side (`coordinate.mode:'base'`, `theme:''`) is the wave step, not this build.

## Reviewer note (2026-09-21, Phase 1 commit)
Base render read: correct and calm. The EN base title wraps to 3 lines (legal; the stacks were measured under the 3-line chrome, 641 <= 677). The panels' titles should target <= 2 lines where the genre head allows (a title-length note for the Phase 4 brief); the en title is kept as the measured worst case.
