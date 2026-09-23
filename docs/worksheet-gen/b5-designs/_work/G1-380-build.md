# G1-380 `digraphs`: base build record (2026-09-23)

Contract: `G1-380-digraphs.md` §2 (base, the Sound Abacus) and §5 (data and gates). Faces F1-F5 are Phase 2 and are not built.

## What was built
| file | what |
|---|---|
| `scripts/worksheet-gen/tools/measure-team-beads.js` | NEW. Measures Baloo 2 700 advance widths (per em) for 41 letter teams in Chromium, using the shell woff2 over file://. It follows the measure-font-metrics.js pattern, refuses to write if the font did not load, and has a `--check` mode for drift. |
| `scripts/worksheet-gen/primitives/team-bead.widths.json` | Output of the tool above. At 26 px it matches the design's (m B) figures exactly: sh 27.5, ch 27.6, th 25.2, sch 40.3, eau 42.9. |
| `scripts/worksheet-gen/primitives/team-bead.js` | NEW primitive `teamBead` (§2 geometry). Modes: given, choice, blank. One `<text>` per bead, always in ink. The baseline is computed from font-metrics.json `baloo2-700`. textW comes from the widths table; a missing team throws. It carries every throw §2 lists (plus: a given bead without text, lines on a non-blank bead). |
| `scripts/worksheet-gen/qa/verify-team-bead.js` | NEW render-measuring gate for the primitive (see "Gate output"). |
| `scripts/worksheet-gen/templates/components-b5/digraphs.js` | `soundAbacus`, `abacusHeight`, `abacusWireZoneW`, `abacusColumnX`, `ABACUS_LANE_W`. The face components (teamHouses, beadBank, gapWordRow, beadWord, socketCard, sentenceLane) are deferred to Phase 2. |
| `scripts/worksheet-gen/types/g1/G1-380-digraphs.js` | Base spec (slug `digraphs`). Theme axis off, no unitAxis. The ladder is d1/d2/d3. `_buildWith` is the poison seam (`forceCols` is used only by the gate). `verify(page)` re-derives every answer from the stamps and measures the render. The rule predicates are exported as `TYPE._helpers` (itemFitsPage, orderTell, countVectors). |
| `scripts/worksheet-gen/data/b5/digraphs.js` | `DIGRAPHS.en` and `DIGRAPHS_NEUTRAL`. `data/` is gitignored, so it must be force-added. |
| `scripts/worksheet-gen/qa/verify-b5-digraphs.js` | Family gate. It exports `validateBank(block, loc)` (§5 rules 1-13), `ownedFor` and `positionOf`. |

**Contents of `DIGRAPHS.en`:**
- Items with signed `seg` and `snd`: sh 14, ch 10, th 8. After stem de-duplication that is 14, 8 and 7.
- A closed `phonemes` list and 9 `falsePairs`.
- `sets`: exemplar sh ch th, k sh ch, position sh ch th.
- 6 F5 sentences (target sh, 2-3 hits each, every 3-sentence window totals 7).
- 29 `rejectedPics`, each with a reason.
- Strings for base plus the five face modes (keyed by mode until ids are allocated).

**Contents of `DIGRAPHS_NEUTRAL`:** `REFUSED_LOCALES` (es it sv da no), `SHIPPING_LOCALES`, `REJECTED_PICS_ALL` (the six design-wide rejections), `FACE_REFUSALS` (`pt: ['position']`) and `BEADS`.

**Pictures.** I opened every candidate picture on three contact sheets (`%TEMP%\claude\…\scratchpad\G1-380-open-{sh,ch,th}.png`). I confirmed the design's four rejections (cherry and peach both read as apples, chimney is a fireplace, mouth reads as "lips") and rejected 23 more:
- Said with another word: shelf reads as a bench (a ch word), flashlight is "torch" (a ch word), couch is "sofa", thunderstorm is "storm", earth is "world", earthworm is "worm", radish looks like a beet.
- Too ambiguous: shampoo, shoulder, chin, cheeks, cheetah, chess, chipmunk, spinach, cheesecake, finch, coach, athlete, theater, smoothie, stethoscope, milkshake.

No shared file was edited. `node i18n/build-en.js` regenerated `strings.en.json`: 668 types, title lint clean.

## Gate output
- **`node qa/verify-team-bead.js --sheet`: PASS** (341 assertions, 4/4 poisons killed).
  - It measures 332 beads: every team at K 150×90/56, key 92×52/32, row 76×44/26 and card 70×40/26, in all three modes.
  - Checks: rendered advance equals the table width ±0.5; text centred ±0.5; metric box centred ±1; ink at least 2 px inside the ring; capsule geometry; mode colours; ink letters; blank writing lines and stubs; 9 node throws.
  - Poisons: a stale widths table, a typed-in ascender, coral letters, and a solid teal blank.
- **`node qa/verify-b5-digraphs.js`: PASS** (89 assertions, 31/31 poisons killed, 20-seed sweep).
  - bank en: 0 findings.
  - All five refused locales throw. An unauthored `de` throws. A block that carries `refused` throws. A face mode throws until the faces are built.
  - Node sweep over 400 seeds: 0 column tells; each column answers 2-3 wires on every page; the largest per-wire-position column share is 38%; all 400 pages are distinct.
  - Renders: d1, d2 and d3 are clean with body 745. d2 at the de long chrome has body 677 and max row gap 6. d2 at the fi 5-line chrome has body 667 and max row gap 5. That is the real minimum body; the abacus minimum is 660 and it fits with 0 overflow.
  - Poisons killed:
    - P1-P19 (P14-P16 run against the data rules), P19b, P20 (base says "write"), P21 (G1-311 phrasing), P22 (bead noun), P23 (church: ch twice).
    - PR4 (a bead sized by team length) and PR5 (staircase).
    - PR-col (a bead 3 px off its column), PR-rail (a wire short of the rail), PR-word (a printed word) and PR-foil (a foil sound in snd).
    - PR-SPARSE, poisoned both ways: the uncapped d1 is killed, and the shipped d1 control measures a 40.0 px gap.
- **`node tools/b3-baseline.js --check --quick`:** `checked build 3680 + enum 277 in 20s: 0 drifted (0 expected), 0 missing` / **PASS**.

## Deviations (each measured or reasoned)
1. **No wire stubs in the base.** The row wire is a 2 px grid-colour div, and the key wire a 3 px teal div, each running rail to rail behind opaque beads. Visually this is identical, and the verify check that the wires end on the rails (±0.5) is exact.
2. **SPARSE row cap.** Rows use `minmax(rowMin, 1fr)` inside a frame whose flex-basis is capped at rowMax = cap + 36. This keeps the band between two caps at 40 px or less. On a short chrome at d1 the slack falls below the frame (see the control render). d2 at every measured chrome fills the body.
3. **d3 (never shipped).** The key row is 52 with a 44 px key bead at 88 wide / 30 px (design §2 d3 ruling), giving a minimum of 676. `requireFoilLetterInWord` is implemented, but it is **vacuous for en** because all three teams share "h", so every word holds a foil letter. The panels decide whether the rule means anything in their locale.
4. **church removed.** It holds ch twice, which fails §5 rule 3 ("exactly once") and would give F4 an ambiguous position. Poison P23 now pins this.
5. **`owned` derivation.** It is spelling-rules `cands` (length ≥ 2) plus syllable-reading `blends` plus the leading consonant cluster of each complexUnits unit. syllable-reading does not list fr `ch` as owned, and neither does spelling-rules. The fr panel must not add ch; the validator cannot catch it.
6. **Rules 6 and 10 are computed as the F2 gap-eligible pool** (at least 3 per team), not as per-item findings, because the design says F2/F3 "draw only from items passing" rule 6.
7. **Face strings are keyed by mode** (`sort-two gap match position text`) until `alloc-b5var-ids` allocates the ids.

## PNGs for the reviewer
- `scripts/worksheet-gen/out/dev/G1-380-null-d{1,2,3}-en.png`
- The gate renders are in `out/dev/G1-380-gate/`:
  - `G1-380-gate-d2-longchrome-{de,fi}.png`
  - `-sweep-*.png`
  - `-poison-*.png`
  - `-sparse-control.png`
- Primitive sheet: `out/dev/G1-380-team-bead.png` and `-grey.png`. Given and choice beads are clearly distinct in greyscale, and the dashed blank is legible.

I read d1, d2, d3, the fi 5-line chrome, the SPARSE control and poison, and the greyscale bead sheet. In every page the columns align under the key, no bead touches a neighbour, and every picture says its word.

## Open items (faces and panels)
- Build F1-F5 (the components and `mode` branches), plus render poisons PR1-PR3 and PR6-PR10.
- `summer/beach` is a beach scene with a palm tree, so a child could say "island". It is kept on the evidence of the render, but the en panel should confirm it or reject it. `zoo animals/sloth` needs the same panel check.
- The panels author per locale: `phonemes`, `seg`/`snd`/`silent`/`stem`, `falsePairs`, `sets`, sentences, 12 strings (10 for pt) and `rejectedPics`. The EN strings are a source to audit.
- Non-en instruction must-have/ban lists: `INSTR_EN` covers en only, so the panels should supply per-locale lists (the plants precedent).
- If a panel signs a team not in `TEAMS`, add it to `tools/measure-team-beads.js` and re-run it.
