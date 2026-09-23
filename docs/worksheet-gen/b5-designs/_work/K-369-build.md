# K-369 `road-safety` — base build record (2026-09-23)

Contract: `K-369-road-safety.md` §2 (base) + §5 (data + gates), under `_BUILD-BRIEF.md`. Nothing shared was edited, and nothing was added to git.

## Files (all type-scoped)
| file | what |
|---|---|
| `scripts/worksheet-gen/types/k/K-369-road-safety.js` | the base spec: "Road Safety: Traffic Lights, Stop or Go" (K, themeless, no unitAxis, `exerciseType:'road-safety'`, `assetClass:'geometry'`) |
| `scripts/worksheet-gen/templates/components-b5/road-safety.js` | `streetStrip`, `forkGrid`, `signPost` (the face components lightStreet / crossingCard / meaningItem / letterCard / classBin / quizRow are Phase E and are not exported yet) |
| `scripts/worksheet-gen/primitives/traffic-light.js` | NEW: car light (3 round lamps) and pedestrian light (2 or 3 rounded-square lamps); Vienna and MUTCD pedestrian styles; the colour-free RAYS; `fill:'none'` for F1 |
| `scripts/worksheet-gen/primitives/road-sign.js` | NEW: octagon · triUp · triDown · circle (rim / red no-entry / blue mandatory) · square · diamond · pentagon · plateCircle; the closed glyph set; optional post |
| `scripts/worksheet-gen/primitives/road-pictogram.js` | NEW: walker (standing · walking · hand · back · back-look-left/right · back-walk), car (waiting / driving, faces right, teal), streetBand, crossingFrame (F2) |
| `scripts/worksheet-gen/data/b5/road-safety.js` | `ROAD_SAFETY.en` (complete US MUTCD block) + `COMMON` (roles, the per-convention class table, confusables, lightRule, step kinds) + `geometryKey()` |
| `scripts/worksheet-gen/qa/verify-b5-road-safety.js` | the family gate; exports `validateBank` (validator rules 1-12), `fixture`, `REG` |
| `scripts/worksheet-gen/qa/verify-b5-traffic-light.js` · `verify-b5-road-sign.js` · `verify-b5-road-pictogram.js` | the three primitive gates (they measure emitted markup + the render) |
| `scripts/worksheet-gen/qa/b5-road-safety-harness.js` | shared by those three gates: loads fonts over file://, rasterises SVG for luma, writes contact sheets |

## Gate output (last full run)
- `verify-b5-traffic-light.js`: **PASS, 3027 assertions, 8/8 poisons killed.** Greyscale probe (Rec. 601, rasterised), lit vs unlit: car red 159 · green 144 · amber codeOrange 127 · **amber codeYellow 89 (recorded exception, gated >= 85)** · ped Vienna stop 159 / go 129 · ped MUTCD hand 127 / dark-field walker 201.
- `verify-b5-road-sign.js`: **PASS, 3252 assertions, 8/8 poisons killed.** Greyscale (a): rim-white vs blue disc 53 %, vs red no-entry 41 %, rim-YELLOW vs blue 33 % (all >= 25). (b): white vs yellow field 35 % (>= 20).
- `verify-b5-road-pictogram.js`: **PASS, 167 assertions, 4/4 poisons killed**; the walking silhouette is 1.37 x the standing one in width.
- `verify-b5-road-safety.js`: **PASS, 509 assertions, 25/25 poisons killed.** The run covers validateBank on en; data poisons P1-P15, each killed for its OWN rule, with the en bank plus de/sv/nl/es/pt TEST fixtures as controls; d1/d2/d3; a 20-seed d2 sweep, all rendered; 3 chromes plus a long-chrome case; the greyscale proof; and render poisons PR1, PR5 (stays GREEN), PR6, PR7, PR9, PR10, PR11, PR12 (de refuses), PR13 (pedLight unset refuses) and PR14 (sparse, poisoned both ways).
- Seed sweep: stop per reading position is 13 11 8 6 13 9 out of 20, so none is over 70 %. On 20/20 pages the answers are 3 stop and 3 go, both columns are mixed and each actor answers both ways. The shipped d2 order is SGGSSG.
- Chromes: 814 → a 1-line title and 1-line instruction, body 811. 3+3 lines → body 710; the design estimated 722, but the fonts measure 710. The 5-line stress title gives body 667, which is 10 px below the 677 fi budget. Every case is clean, and the rows stretch so the stage fills the body.
- `node i18n/build-en.js` → 664 types, title lint clean. **`node tools/b3-baseline.js --check --quick` → `checked build 3664 + enum 277 in 26s: 0 drifted (0 expected), 0 missing` / `PASS`.**

## Greyscale proof (nothing is answerable by colour alone)
The gate replaces EVERY code colour on the page with one grey (inkSoft) and re-verifies. It derives the same answers, because each answer comes from the ray group, the lamp's rank in y order and the glyph pose, never from a fill. The stamp swap in PR5 changes `data-lcs-on` and leaves the rays; the gate stays green, which proves it never reads the stamp. The two actors are also told apart without colour: 3 round lamps against 2 square lamps, and the pedestrian head sits at least 40 px below the car head in the same row.

## Deviations from the design, each measured
1. **Rays radiate from the lamp CENTRE.** Starting all three rays at the edge point made them meet in a 10 px arrowhead. On the first contact sheet it read as "an arrow pointing at the lamp". They now spread ±22 px, stay outside the housing and keep the same −30/0/+30 angles, length 10 and 2 px gap.
2. **Street band.** The design's ink-outlined 10 x 10 zebra bars printed a row of tick boxes. Flat white bars on the pale `grid` road then read as a dashed line. The road is now `ink` asphalt with white bars inset 2 px, which reads as a zebra, and the band is **12 px, not 10**. The stop line is a flat white bar.
3. **Rows stretch; they are not fixed.** The rows use `minmax(214px,1fr)` and the slack goes into the poles. Fixed rows with `space-evenly` left 40-55 px empty bands at the 778/814 chromes (sibling review). `verify()` now asserts that the largest empty band between consecutive drawn blocks, from the instruction to the footer, is no more than 40 px. It is checked at 814, 722-class and 677-class chromes, and PR14 poisons it both ways.
4. **Every row pairs one car with one pedestrian when both actors are present.** The design's height gate compares heads "in the same row". The composer's free 3+3 shuffle could produce a row of two pedestrians, which lost the cue and opened a 66 px band. d1 has no cars, so its pedestrian heads sit at the top on tall poles (`pedTop` 0).
5. **d1 geometry.** The strip is 300 px tall (minimum), the walker 130 px, and the cells 110/110/110 with no gaps, so the 108 px light fits.
6. **Nominal glyph boxes cross the triangle and diamond edges by construction.** Example: 0.46 s at 0.60 h in a triUp. So the node pass checks that the box CENTRE is inside the field. The render pass samples the DRAWN silhouette, with every outline point grown by half its stroke. That check caught `twoChildren` crossing a triUp edge, and the glyph was recomposed.
7. **Sign text is sized from a 0.6 em-per-character estimate.** The render gate then checks the measured length against the fit width. YIELD reaches 9 px only from s 64 upward, so an s-60 YIELD throws (poison RS4).
8. **Amber codeYellow: the lit/unlit greyscale gap is 89, not ≥ 100.** Amber is only lit at d3, and only where `amberMeans:'stop'`, so never in en. The rays are mandatory there. Flagged for the face and panel review.
9. `text` is allowed on glyph `bar`, because the en R5-1 no-entry sign prints DO NOT / ENTER. Validator rule 1 is "text only on glyph text **or bar**".

## PNGs for the reviewer (I read every one)
- Pages: `scripts/worksheet-gen/out/dev/K-369-null-d{1,2,3}-en.png`; gate renders are in `out/dev/K-369-gate/`: `K-369-d2-chrome-814.png`, `K-369-d2-chrome-722.png`, `K-369-d2-longchrome.png`, `K-369-d2-colour-stripped.png`.
- Primitives, colour and grey: `out/dev/K-369-traffic-light-sheet-{colour,grey}.png` (lampD 56 and 70), `K-369-road-sign-sheet-{colour,grey}.png` (the en MUTCD table at s 68 and 92), `K-369-road-pictogram-sheet-{colour,grey}.png`.

## Sibling-review items (lead note)
1. **SPARSE**: fixed as described in deviation 3. The empty-band ≤ 40 px assertion runs in every `verify()` and is poisoned both ways by PR14.
2. **Colour and sex**: no figure has a gendered look or colour. Every walker is an ink silhouette, the car is teal, and the only hues are the signal colours of lit lamps.
3. **Answer position per PAGE**: on 20/20 pages the answers split 3/3, both columns are mixed and each actor answers both ways; `verify()` asserts this on every page. Stop is always left and go always right, as the design specifies. Stop per reading position across the 20 pages is 13 11 8 6 13 9 out of 20, never over 70 %.

## Open items for the faces and panels
- Every non-EN block is absent, so the spec REFUSES those locales. pt stays blocked until its panel sets `pedLight.stop`.
- The Vienna / BR / MX blocks in the gate are TEST FIXTURES with illustrative codes; the native panels must sign the real tables.
- en `listenStep` is left null (US "stop, look and listen"); the F2 panel decides.
- `crossingFrame` (F2) is drawn but not yet reviewed as a page. Its figure is large against the frame, and `look-both` reuses the look-left figure. Revisit both in Phase E.
- Face poisons PR2, PR3, PR4 and PR8 belong to F1, F2, F5 and F4. The PR3 mirror class is already killed at the primitive (PP1).
- Validator rule 9 checks apparatus words for en only.

## Revision 1 (coordinator review, 2026-09-23): the instruction names only what is on the page
- **Defect:** the EN base instruction read "…circle what to do: stop or go." But the pedestrian cards offer the chips **wait / walk**, so the instruction was false for half the cards (studio rule 9).
- **Fix:** the new instruction is **"Look at the lamp that is on, then circle what to do."** (51 chars, one sentence). It is changed in both the bank (`strings.base`) and the spec (`i18n.en`), and it is true for both chip pairs and for d3, which has no chips. It still names only the lamp and the circling.
- **New gate, rule 9 in validateBank:** if the base instruction quotes any chip word (matched on letter boundaries), that word must be a chip on EVERY card type the base addresses (pedestrian and car). It is poisoned both ways:
  - **P16:** the old "stop or go" instruction is caught (stop is not a pedestrian chip).
  - **P17:** "circle wait or walk" is caught (wait is not a car chip).
  - The corrected en bank is the passing control.
- **Checks rerun:**
  - The chrome stress strings no longer quote chip words.
  - Re-rendered d1/d2/d3 and read them; the printed instruction is the new text on all three levels.
  - Family gate **PASS, 509 assertions, 27/27 poisons killed**. The three primitive gates PASS as before (8/8, 8/8, 4/4).
  - build-en is clean, and `b3-baseline --check --quick` gives **PASS, 0 drifted**.
- **Open for the SEO landing:** the §6 meta middle ("…circle what to do, stop or go, for people walking and for cars") describes both road users and is metadata, not sheet copy.
