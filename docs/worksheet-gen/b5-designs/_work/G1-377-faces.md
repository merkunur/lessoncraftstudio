# G1-377 `animal-life-cycles` — the five faces (Phase E, 2026-09-23)

Contract: `../G1-377-animal-life-cycles.md` §3 + §5; brief `../_FACE-BRIEF.md` (incl. the lead's FILL ruling).
All five are **CODE** faces on the base's ONE additive `layout` knob (`types/g1/G1-377-butterfly-life-cycle.js`
`_buildFace` → `_facePond` / `_faceLabel` / `_faceSort` / `_faceCompare` / `_faceNext`; `_verifyFace`). The base
path is untouched (`d.layout` undefined → the old code; the base's own configs carry no `layout`).

## Files (type-scoped)
| file | change |
|---|---|
| `tools/b5var-rows/animal-life-cycles.js` | NEW — 5 rows; EN title + instruction read from the bank; G2/G3 rows carry `extra {gradeBand}` |
| `types/g1/G1-377-butterfly-life-cycle.js` | `layout` dispatch, 5 face builders, `_classTell`, `_verifyFace`, verify() dispatch (face root → `_verifyFace`) |
| `templates/components-b5/animal-life-cycles.js` | `lifePondRing lifeCutStrip lifeWordBank lifeLabelLoop lifeYoungStrip lifeAdultBins lifeCompareTable lifeNextRows` (+ `LIFE_LOOP_POS`, `LIFE_POND`); helpers `fluidLens`, `barArrow` |
| `data/b5/animal-life-cycles.js` | strings re-keyed layout → face id; `ALC.FACE_IDS`, `ALC.FACE_BAND`, `ALC.LOOKALIKE`; F5 instruction reworded (see F5) |
| `qa/verify-b5-animal-life-cycles.js` | face-id keyed rules 9-10, rule 13 (the chicken), section 6 (faces: node sweep, renders at 814 / d2 / 722 / 677, floors, FILL, SPARSE, poisons) |
| emitted | `types/g1/G1-389-frog-life-cycle-cut-and-paste.js`, `types/g1/G1-390-what-comes-next-butterfly-frog-and-ladybug.js`, `types/g2/G2-365-label-the-butterfly-life-cycle.js`, `types/g2/G2-366-metamorphosis-which-animal-will-it-become.js`, `types/g3/G3-393-butterfly-and-frog-life-cycles-compared.js`; `i18n/strings.en.json` regenerated |

## The faces
**F1 G1-389 `frog-cut-paste` (G1)** — five white lily pads round a pond (clockwise from the top); the frogspawn is drawn on pad 1; the child cuts 4 SQUARE tiles (scissors + dashed cut grid) and glues each on its empty dashed ghost. Coral arcs between pads, the last one `data-lcs-arrow="return"` back to pad 1. Owns: pads = biology order clockwise, anchor drawn / others EMPTY ghost ≥ cell + 12 inside its pad, strip = open stages each once, a DERANGEMENT of the pad order and not its reverse (8 legal orders, all 8 drawn in the sweep), cut lines + scissors, strip last and below every pad, return arc closes on pad 1, no text. Poisons PR5 (return arc removed → "cycle not closed"), PR6 (strip = pad order → derangement), PR6b (ghost printed on). PNG `scripts/worksheet-gen/out/dev/G1-389-null-d2-en.png`.
**F2 G2-365 `label` (G2)** — the butterfly loop printed complete, in order (TL egg → TR caterpillar → BR chrysalis → BL butterfly, 4 coral arrows, BL→TL = return); an empty school-ruled lane under each lens; a bank of the 4 stage words + the decoy "tadpole". Owns: lane ↔ lens bijection, lanes empty, loop in biological order read from the render, bank = the 4 stages + one stamped decoy, bank order ≠ loop / reverse, decoy neither first nor last, bank 18 px, ≤ 2 rows. Poisons PR14 (decoy first), PR14b (bank in loop order), PR16 (a lane pre-filled). PNG `out/dev/G2-365-null-d2-en.png`.
**F3 G2-366 `metamorphosis` (G2)** — 8 lettered young-stage lenses (A-H, reading order) over three bins crowned by the drawn adult butterfly / frog / ladybird; caps 2 / 4 / 2 empty boxes. Owns: cards ⊂ YOUNG, no SORT_EXCLUDE egg (build REFUSES too), letters A.. in reading order, cap = card count, bin `data-lcs-expect` = the letters of its animal, boxes empty; tells — not grouped, ≤ 1 adjacent same-animal pair, frog cards not all one parity. Poisons PR8 (butterfly.egg in cards → build refuses), PR8b (a rendered egg card → verify), PR9 (grouped). PNG `out/dev/G2-366-null-d2-en.png`.
**F4 G3-393 `compare` (G3)** — the one text face: 8 animal-free statements (mix both 2 / butterfly 3 / frog 3), two 40 px tick boxes under two adult lenses (no animal WORD heads a column). Owns: row truth === ALC.COMPARE, class multiset === mix, ticks under their head, empty, statements 17 px ≤ 2 lines; class-sequence tells (constant, grouped, run of 3, alternating stretch ≥ 6, staircase = ≥ 6 items stepping round the class cycle). Poisons PR10 (data, sixlegs truth), PR10b (render stamp), PR11 (both, butterfly, frog, both, butterfly, frog, … → staircase). PNG `out/dev/G3-393-null-d2-en.png`.
**F5 G1-390 `next` (G1)** — 6 rows (2 per animal, no two adjacent rows one animal): a prompt lens on a cream plinth, an arrow, three choice lenses of the SAME animal; 2 rows ask what follows an adult (butterfly → egg; frog or ladybird → spawn / egg). Owns: stamped answer === (i+1) mod n successor, prompt ∉ chips, chips one animal + distinct, the successor once, wrap count, per-animal rows, correct slot 2 / 2 / 2 not monotone, not a cyclic staircase. Poisons PR12 (prompt among chips), PR13 (larva after butterfly.adult → successor), PR13b (look-alike), PR17 (slots a staircase). PNG `out/dev/G1-390-null-d2-en.png`.
Family-wide poisons: PS-× 5 (SPARSE), FL-× 5 / FG-× 5 (FILL both ways), PI1-3 (apparatus in the instruction: F5 "write", F1 without "glue", F3 "number"), PC (the chicken in a title).

## Deviations from §3 (each measured)
1. **FILL (lead ruling, arrived mid-build) — F1, F2, F3 are elastic.** The design stacks (624 / 509 / 536 px) ended at 81 / 66 / 70 % of the 814 body. Now: F1's pond ring flex-grows 500 → 600 px and stretches only VERTICALLY (width 639 is spent): pond + ripples + arcs in one `preserveAspectRatio="none"` SVG with non-scaling strokes, every pad its own round SVG placed at `top: cy/500` of the ring. F2's loop is a size container (440 → 650 px): lens `clamp(130px, (100cqh − 180px)/2, 200px)`, the row gutter + vertical arrows take the rest (arrows became HTML bars so they stretch). F3: root is a size container; young lenses 100 → 128 px, the bin row 280 → 420 px (adult lens 132 → 164, boxes 52 → 64). F4/F5 already filled (grid rows `minmax(min, max)`). Measured content bottom at the 814 chrome (body 811): F1 722 (89.0 %), F2 720 (88.8 %), F3 720 (88.8 %), F4 736 (90.8 %), F5 736 (90.8 %); at the fi 677 chrome every face inside the body (667). New config keys: `ringMax`, `lensMax`, `loopMax`, `adultMax`, `boxMax`, `binsMax`; verify checks sizes as RANGES.
2. Component names prefixed `life…` (design: `pondRing`, `cutStrip`, …) — the merged components-b5 namespace refuses duplicates and `cutStrip` / `nextRow` / `compareTable` are generic enough for a sibling to claim.
3. F5: the froglet and the frog differ at 92 px only by size + a tail stub, so a row whose answer is one of them never shows the other (`ALC.LOOKALIKE`; verify + poison PR13b). Seen in my first render (legged → froglet, frog, tadpole: two frogs for one answer).
4. F5 instruction reworded to "Look at the first picture in each row and circle the one that comes right after it." — the original left "it." alone on line 2.
5. F4 rows cap at 72 px (design 58-64) so the table fills; F5 rows cap at 116.
6. F4 "staircase" / "alternating" are measured as STRETCHES (≥ 6 items), not whole-sequence periodicity: the design's own PR11 sequence (both, b, f, both, b, f, b, f) is not periodic end to end, and a whole-sequence rule let it through.
7. "20 seeds render distinct pages": F1 has exactly 8 legal pages (derangements minus the reverse), F2 66 in 300 seeds; the gate asserts all 8 F1 orders drawn and each F2 decoy slot ≥ 50/300 instead. The rendered sweep is 20 seeds × 5 faces verify-clean.
8. Lily-pad notch arc `A r r 0 1 1` (the base's measured form); notch faces the pond centre.
9. The FILL-elastic lenses scale CSS-wise from the size their strokes were set for (130 / 100 / 132), so outlines thicken by ≤ 1.54× at the cap — read in the renders, fine in colour and grey.

## Per-locale refusals visible from the bank shape
None forced by shape: every face reads only `stageWords.butterfly`, `decoy`, `statements` (F4 needs 2/3/3 after `drop`, rule 7 guarantees it), `spawnForm`. A panel that drops > 1 statement of a class refuses F4 in its locale (rule 7 then fails the draft). F1/F3/F5 carry no words on the body.

## Open items for the panels
- `strings[<face id>]` × 10 locales (title ≤ 70, instruction ≤ 150, one sentence, must/ban per face — rule 10; en MUST: F1 cut+glue, F2 write+cross, F3 letter, F4 tick, F5 circle). Panels may key `instructionBans` by face id or layout.
- `bannedAnimals` (optional) extends rule 13's chicken floor; the floor list per locale is in the gate (`CHICKEN_FLOOR`) — panels should confirm it.
- fr "œuf" in the F2 bank: confirm the Œ glyph in one fr render.
- F2's bank at 18 px must stay ≤ 2 rows (the gate measures it; de "Schmetterling" est. fits).

## Proof
- `node qa/verify-b5-animal-life-cycles.js`: **PASS (1417 assertions, 53/53 poisons killed)** (`--quick`: PASS 1316 / 53/53)
- `node tools/gate-variation-distinct.js --batch=b5 --diffs=2 --family=animal-life-cycles`: **every variation differs from the deck its base publishes and from its siblings**
- `node i18n/build-en.js`: `688 types … (title lint clean)`
- `node tools/b3-baseline.js --check --quick`: **`checked build 3760 + enum 277 in 21s: 0 drifted (0 expected), 0 missing` / `PASS`**
- Renders read by me: `out/dev/G1-377-faces-d2-en.png` (all five, en), `out/dev/G1-377-faces-longchrome-fi.png` (677), `out/dev/G1-377-faces-en-grey.png` (greyscale), `out/dev/G1-377-fill-one.png` (814 chrome, F1-F3), per-face gate PNGs under `out/dev/G1-377-gate/`. Frog stages read in order frogspawn → tadpole → tadpole with legs → froglet (small, stub) → frog; no clipping, nothing under the footer.

## Landing-panel round 1 fixes (2026-09-23)
- G1-389/G1-390/G2-366 froglet: the stub was hidden between the hind feet (panels en/es/it read froglet = small frog). `primitives/life-stage.js` stub now reaches Y+108·s, full outline + midline; `verify-life-stage.js` asserts it clears the lowest foot (node ≥ 10 units, render ≥ 4 px at 92); poison L1b (the old stub) KILLED.
- G2-366: caps 2/4/2 leaked the answer counts. New knob `boxesPerBin: 4` — every bin 4 boxes (12 for 8 cards); verify: every cap = boxesPerBin, caps equal across bins ("box-count tell"), cap ≥ the bin's cards; build throws below the largest group. Poisons PR9b (forceCaps 2/4/2), PR9c (boxesPerBin 3). EN instruction: "stage" (never "young animal"), says some boxes stay empty — PI4, PI5.
- G2-365: EN "Write the four stage names … then cross out the name that does not belong." (ban each/every/all name|word, PI6).
- G1-390: EN "… ; after the grown-up, the cycle starts again." (must "again", PI7).
- Locale strings needing a native rewrite (unchanged): all 10 non-EN locales × G2-366 (young animal → stage + some boxes stay empty), G2-365 (each name → the four stage names), G1-390 (add the cycle starts again).
