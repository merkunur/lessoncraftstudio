# K-370 `family` — the five faces (Phase E, 2026-09-23)

Contract: `../K-370-family.md` §3 (lead ruling: closed faces draw ONE conventional invented family; F5 presumes no shape). Rows: `scripts/worksheet-gen/tools/b5var-rows/family.js` → `node tools/gen-b5var-specs.js`. All five are **CODE faces** on the base's ONE `mode` knob: `_buildWith` dispatches a face mode to `_buildFace` before the base path (base byte-identical; an unknown mode throws). `verify()` dispatches on the root's `data-lcs-mode` to `browserVerifyFace` (every answer re-derived from the kin graph + bank literals). Root stamps `data-lcs-mode` = `data-lcs-face` = the mode. Never git-added.

## Files touched (family-scoped only)
- `types/k/K-370-family.js` — face builders `faceGenerations / faceTraceWords / faceTreeClues / faceRiddles / faceTemplate`, `_buildFace`, `browserVerifyFace`, `_compose` gains a face-only `sideline` draw AFTER every base draw; poison seams `over.rows / over.empty / over.clueOrder / over.order`.
- `templates/components-b5/family.js` — NEW `genRail genPlacard traceRows nameBox famGivenPlate clueList riddleRow famEgoCard templateTree famNumberDisc`; `familyStage` gains additive `nodeW labelH rowGap plates overlay crownClamp` (base passes none).
- `primitives/family-tree.js` — additive: crown bottom includes `labelH` (0 on the base), `crownClamp` option (F2's 300 px stage).
- `primitives/frame-tree.js` — NEW (F5): curved tapered limbs, 9 hung mats + me mat on the trunk, leaf clusters, shelf in its own svg.
- `data/b5/family.js` — F4 instruction carries `repeatsNoteText` ("one word can fit more than one riddle"); field added.
- `qa/verify-b5-family.js` — `faceGate` + validator additions (rule 7 clause IFF repeatsNote; NBSP ban; rule 8 threshold re-measured to the built placard); PR7 rewritten (a face config builds the face; unknown mode throws).
- `tools/b5var-rows/family.js` — NEW.

## Faces
| id | mode / band | what the child does | knob (d2) | PNG |
|---|---|---|---|---|
| **G1-385** Family Generations: Oldest to Youngest | generations · G1 | writes 1/2/3 in each row of 3 kin words by generation; a picture legend (1 elder f+m, 2 adult f+m, 3 child f+m, one tint per frame), no figure beside any word | `rows 6, minSideline 4, maxPerSlot 3, legend [170,110] px 88, rowH 60→76, chipPx 20, box [52,48]` | `out/dev/G1-385-null-d2-en{,-grey}.png` |
| **K-375** Family Words: Trace and Write | trace-words · K | finds numbered person on a small tree (6 people, 4 badged, non-monotone), traces that person's kin word, writes it once alone | `badged 4, frame [80,96], stageW 300, laneW 321, trioH 72, glyphH 44, rowGap 16→40` | `out/dev/K-375-null-d2-en{,-grey}.png` |
| **G1-386** Family Tree: Read the Clues | tree-clues · G1 | tree of 7 (sideline aunt/uncle on the grandSide), 3 given plates, 4 empty incl. a same-(age,sex) pair; reads 4 clues, writes each name | `sideline, clues 4, frame [80,98], plate [130,44], rowGap 28, gap 14→40, clue 34→40` | `out/dev/G1-386-null-d2-en{,-grey}.png` |
| **G2-362** Family Relationships: Riddles | relation-riddles · G2 | ego frame + word bank (4 answers + 2 distractors); 8 two-step riddles, writes the kin word in the inline slot; no tree | `frame [96,116], slot [150,36], rowH 52→64, gap 12→40` | `out/dev/G2-362-null-d2-en{,-grey}.png` |
| **G1-387** Family Tree Template | tree-template · G1, OPEN | draws people who matter in 9 hung mats + 4 shelf mats, writes names; only printed word = meWord; no connector, no kin label | `shelf 4, gap 16→40` | `out/dev/G1-387-null-d2-en{,-grey}.png` |

Read by me (colour + greyscale): legend reads elder/adult/child with f+m pairs; tree faces keep the base skin; F5 reads as a tree (limbs, leaves, trunk flare) — first version read as a rack/ladder and was redrawn; no clipping, nothing under the footer.

## Gate — `qa/verify-b5-family.js` (full, with sweeps)
**`PASS (668 assertions, 52/52 poisons killed)`**. Per face at d2 en under 766 / 814 / 722 / 677 chromes: verify 0, lints 0, floors (K 56 / G1 44 / G2 36, busts ≥ 72, frames ≥ 80, text ≥ 16), SPARSE ≤ 40, **FILL** (≥ 85 % of the 814 body, inside at 677: F1 92.5 %, F2 86.8 %, F3 88.8 %, F4 89.4 %, F5 86.1 %), printed chrome === bank strings, apparatus-in-instruction (EN vocabulary × DOM presence). Sweeps ×12 per face: verify clean, pooled position tells ≤ 50 % (F1 pooled per slot×rank: worst 33/72), garment fill worn by both sexes.
Face poisons: F1 row in answer order · figure beside a word · legend frame of one sex · two fills in one legend frame · SPARSE both ways · **FILL both ways** · F2 lanes swapped · glyphH 30 · untraceable locale REFUSES · F3 no same-cell pair · f name on m plate · clues in reading order · F4 adjacent same answer · answer missing from bank · tree on the page · repeatsNote without clause · **PR6 connector between mats** · kin word on template · branch through a mat · APP1/APP2 instruction names absent apparatus · NBSP title.

`gate-variation-distinct --batch=b5 --diffs=2 --family=family`: **every variation differs from the deck its base publishes and from its siblings**. `i18n/build-en.js`: 688 types, title lint clean. `b3-baseline --check --quick`: **checked build 3760 + enum 277: 0 drifted (0 expected), 0 missing PASS**. Primitive gates: tree 54 / figure 341 PASS.

## Deviations from §3 (measured)
1. **FILL** (lead note): every face grows (flex spacers min→≤40, rows min→max) — fixed stacks ended at 72–83 % of an 814 body.
2. F1: legend 170×110 (busts 88) + rows 60→76 at chip 20 (design 150×96 / 52 / 18) — the design stack ended at 67 % of the body; rows sit on creamDeep row bands (row grouping beat column grouping). Rule 8 re-measured: single word ≤ 137 px at Nunito 800 20.
3. F2: trio 72, glyphH 44 (design 58 / 40) — for FILL; the 40 floor is still gated; disc Ø30 (tree primitive fixed); crown clamped into the 300 stage (`crownClamp`).
4. F3: stage 520 + list 136 as designed; clue rows grow 34→40.
5. F4: ego frame 96×116 (design 80×96); bank built inline (pills 40 tall, G2 floor), not `wordBank` (its pills measure < 36).
6. F5: tier y re-laid (design straight trunk-to-hook branches cross tier-2 mats); curved limbs + crown arch + low branch + twig; shelf mats 84 in their own svg (FILL gap).
7. F4 EN instruction carries the repeats clause (en repeats: MM=FM=grandma), gated.

## Refusals visible from the bank shape
None lowers the matrix: fr F2 drops `sœur` (œ untraceable) automatically and still has ≥ 4 traceable tree words; nl F1 excludes `neef/nicht` via validator; a locale whose tree words are all untraceable THROWS (poison F2-REF).

## Open items for the panels
- EN is a source to audit: F4 clause wording; F3 clue frames; F1 "oldest generation to the youngest".
- `repeatsNote`/`repeatsNoteText` per locale (sv/da false → no clause).
- F1 by construction never prints a row 1-2-3, so slot 1 is the oldest only ~20 % (pooled 46 % worst cell) — accepted, per-page cap ≤ 3/6 gated.
- Mono: the coral ego frame greys to mid-grey; the star + name plate carry the ego (base-wide).
