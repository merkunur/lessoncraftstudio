# K-319 `feelings` — the FIVE variation faces (Phase 2, 2026-09-14)

Built from `K-319-emotions.md` §3 (read with the 2026-09-14 key ruling: family key `feelings`, picture dir still `emotions`) under `_FACE-BRIEF.md`, on the base substrate of `_work/K-319-build.md`. Ids from `_records/b3var-id-allocation.json`. Nothing shared was edited (`git status`: only the family's files); nothing committed.

## Files (all family-scoped)
| file | what |
|---|---|
| `scripts/worksheet-gen/tools/b3var-rows/feelings.js` | NEW — 4 rows (K-331 K-332 K-334 K-335) + `HANDWRITTEN` K-333 (`base:'K-319'`); the only file the emitter reads |
| `scripts/worksheet-gen/types/k/K-319-feelings.js` | the additive `layout` knob: `_buildWith` dispatches to `_buildFace` ONLY when the resolved config carries `layout` (the base's three configs do not → the base path is byte-identical, baseline PASS); `_buildScene / _buildDraw / _buildChoice / _buildCheckin`; `verify()` branches on the root stamp `data-lcs-layout` (never `data-lcs-face`, per the base record's item 3) |
| `scripts/worksheet-gen/templates/components-b3/feelings.js` | the base's 3 exports byte-untouched; NEW `feelingChoiceTile feelingChoiceRow feelingSceneRow feelingSceneCard feelingSceneGrid feelingBlankFace feelingDrawCard feelingChoiceLane feelingChoicePage feelingCheckIn` |
| `scripts/worksheet-gen/types/k/K-33{1,2,4,5}-feelings-*.js` | emitted by `node tools/gen-b3var-specs.js` |
| `scripts/worksheet-gen/types/k/K-333-feelings-feels-good-or-feels-bad.js` | HANDWRITTEN `makeScienceCategorySort` instance (factory untouched) |
| `scripts/worksheet-gen/data/b3/feelings.js` | EN bank: `strings['K-331'..'K-335']` (title/instruction per face, the apply- slots), the optional `checkin.labelPx` documented |
| `scripts/worksheet-gen/qa/verify-b3-feelings.js` | the gate grows: sections 5-7 (face renders ×3 chromes + node cross-checks + the veto odd-grid control + face sweep + 10 poisons); bank rule 6 now covers the six string blocks + `labelPx` |
| `docs/worksheet-gen/b3-designs/_work/K-319-faces.md` | this record |

## The five faces

### K-331 — How Do You Feel? Circle the Face — CODE `layout:'scene'` (F1)
- **Row:** `{...base.d2, layout:'scene', cards:6, choices:3, minFeelings:3, maxPerFeeling:2, objPx:88, tilePx:84, facePx:72}`.
- **Child:** looks at a pictured situation (1-2 cue objects on nothing, no text on the card), thinks how she would feel, rings one of three white square face tiles. 2×3 `.ws-cardgrid`; d2 = 2 happy + 2 scared + 2 tired ("ring happy everywhere" fails); decoys = accepted faces minus the feeling minus `alsoPlausible`; the correct tile takes ≥ 2 distinct positions; no object twice (the sampler offers an OBJECT-DISJOINT run per feeling, so `pillow-moon` and `pajamas-moon` never share a page — a seed can never refuse on that); capacity < `cards` (a veto) shrinks the page, an odd count centres the last card (`feelingSceneGrid`: `grid-column:1/-1; justify-self:center; width:(100%-14)/2`), < 4 cards or < 3 feelings REFUSES.
- **Stamps:** root `data-lcs-layout="scene" data-lcs-cards/choices/minfeelings/maxper`; card `data-lcs-scene="<id>" data-lcs-answer="<feeling>" data-lcs-correct="<i>"`; tiles `data-lcs-choice`; cues `data-lcs-scene-obj="<theme>/<noun>"`.
- **verify():** cards 4..8 = stamp; answers accepted; every card prints NO text; 1-2 objects, none on two cards, picture stem === stamp; tiles distinct, exactly one === answer, `data-lcs-correct` points at it, ≥ 2 positions; no feeling > maxPer; ≥ minFeelings; every picture colour-dir, ≥ 72, no alt. **Node gate:** answer === bank scene feeling, objects === bank objects, no tile ∈ `alsoPlausible` (P3), no vetoed scene.
- **Poisons owned:** P3 (present + surprised → node), P4 (happy ×4 → verify), PX (one position), PO (moon twice), PS (two feelings). **Control:** veto `['syringe']` → 5 cards (2+1+2), fifth card at x 186…517 (centred), verify 0 lints 0, also under the 4-line fi chrome.
- **PNG:** `scripts/worksheet-gen/out/dev/K-331-null-d2-en.png` (gate: `K-331-gate-d2-en{,-longchrome-de,-longchrome-fi}.png`, `K-331-gate-d2-en-veto-syringe.png`). Read: bed / medal / pajamas+moon / present / thunderstorm / syringe; tiles 84, faces 72, objects 88; lowest ink 887 (en) / 900 (fi 700) vs footer 921; no clipping; every decoy legal (medal never offers surprised, thunderstorm never surprised, syringe never sad).

### K-332 — Draw the Feeling Face — CODE `layout:'draw'` (F2, OPEN-ENDED)
- **Row:** `{...base.d2, layout:'draw', cards:4, pool:['happy','sad','angry','scared'], wordPx:30, d:220}`.
- **Child:** reads the feeling word (Baloo 2 700 30, teal, PRINTED — the stimulus) and draws the face in an empty 220 px teal circle (58 mm). 2×2 grid, shuffled order per seed (14 distinct over 20 seeds).
- **verify() = structure only:** 4..6 cards = stamp; one printed word per card, accepted id, distinct ids AND texts, not clipped; exactly one EMPTY `[data-lcs-blankface]` ≥ 140 per card (one child only — the circle); NO `<img>` (a model face is d1 copy, not this face). No grade.
- **Poison owned:** PM (a 56 px model face printed beside the word).
- **PNG:** `out/dev/K-332-null-d2-en.png`. Read: scared / angry / happy / sad, circles 220 centred, lowest ink 855 (en) / 883 (fi) vs 921.

### K-333 — Feels Good or Feels Bad? Sort the Faces — HANDWRITTEN factory instance (F3)
- **Spec:** `makeScienceCategorySort({id:'K-333', slug:'feelings-feels-good-or-feels-bad', gradeBand:'K', exerciseType:'feelings', data:{bins:[good,bad], items: 9 locale-neutral `{theme:'emotions', noun, bin}`}, difficulty:{1:{perBin:2}, 2:{perBin:3}, 3:{perBin:3}}})`, then `build` wrapped (0 factory lines): `b3-common.bank('feelings', loc)` — an unauthored locale REFUSES instead of the factory's silent `label.en` fallback — passes `ctx.binLabels = bank.bins.{good,bad}.label` (which the factory's `labelFor` prefers) and refuses `perBin > 3`; `verify` = the factory's + the valence check from the picture stem (GOOD/BAD lists inline), the one-row strip, the 78 px floor, no text on the strip, bins `good,bad`, distinct labels.
- **Child:** draws a line from each of six shuffled faces (3 good of {happy merry content excited} × 3 bad of {sad angry scared capricious disgusted}) to "Feels good" / "Feels bad". Faces refused for WORDS enter here where their valence is unmistakable (base record: all opened).
- **Node gate:** the spec's `ITEMS` literal ≡ the bank's `valence` set (a drift either way fails), every strip face filed under its bank valence, labels === bank.
- **Poisons owned:** P5 (`tired` filed under bad → verify "no unmistakable valence" + node), P13 (`perBin:4` → the spec guard; a page built past it → verify "the strip wraps: 2 rows", 8 faces at 69 px).
- **PNG:** `out/dev/K-333-null-d2-en.png`. Read: strip scared happy merry disgusted content sad in ONE row (78 px faces, boxes 100), bins at the bottom with pills. The large empty middle is the factory's own `space-between` line-drawing space (every K-201-class sheet ships it) — not a defect of this face, recorded.

### K-334 — Which Face Shows the Feeling? — CODE `layout:'choice'` (F4)
- **Row:** `{...base.d2, layout:'choice', rows:6, choices:3, confusable:false, wordPx:26, wordW:220, tilePx:84, facePx:72, minRow:104}`.
- **Child:** reads one feeling word per lane and rings the ONE face of three that shows it — every row independent (no elimination; each of the six feelings is a target once). `confusable:false` keeps scared ↔ surprised out of one row (read from both sides); the correct tile takes all 3 positions over the page (enforced in build, 20/20 seeds).
- **Layout:** `display:grid; grid-template-rows:repeat(6, minmax(104px,1fr)); gap:10` — 6 × 104 + 50 = 674 ≤ 700; measured rows 121 (en 778) / 114 (de 733) / 108 (fi 700). Lane `padding:6px 16px` (inner 639): `[word 220][16][3 × 84 + 24 = 276 centred]`.
- **verify():** rows 4..6 = stamp, targets accepted + distinct, word printed + not clipped, tiles = choices, distinct, exactly one === target, `data-lcs-correct` agrees, positions = choices, no confusable distractor when `data-lcs-confusable="0"`, every tile inside its lane, pictures colour-dir / ≥ 72 / no alt.
- **Poison owned:** P9 (scared row offering surprised).
- **PNG:** `out/dev/K-334-null-d2-en.png` (+ `K-334-gate-d2-en-longchrome-fi.png`). Read: tired/angry/happy/scared/surprised/sad, positions 0 2 1 2 1 0, all words inside the 220 column, tiles 84.

### K-335 — How Do I Feel Today? — CODE `layout:'checkin'` (F5, OPEN-ENDED)
- **Row:** `{...base.d2, layout:'checkin', faces:6, d:220, rows:2, facePx:72}`.
- **Child:** rings today's face among six labelled 100×108 tiles under the `today` literal ("Today I feel…"), draws her own face in the 220 circle under the `draw` literal, writes on two ruling rows (glyphH 40, the K whole-word floor) with the `because` starter. Stack lane 180 + 14 + card (flex:1, min 292) + 14 + lane 178 = 678 ≤ 700; measured lowest ink 907 vs 921 at every chrome.
- **verify() = structure only:** faces 4..6 = stamp, distinct accepted ids, picture stem === id, a label under each (distinct, not clipped in the 96 px inner width), today literal present with no `{` slot, draw literal, exactly one EMPTY blank face, ruling rows === stamp ≥ 1. No grade.
- **Node gate:** every label === bank word, today/draw === `bank.checkin`, every label ≤ its tile's inner width (96).
- **Poison owned:** PL (`surprisedsurprised` label → verify "clipped in its tile").
- **PNG:** `out/dev/K-335-null-d2-en.png` (+ `-longchrome-fi`). Read: six tiles with words (labels 50/29/47/54/78/39 px), circle, "because" row.

## Gate output
```
node scripts/worksheet-gen/qa/verify-b3-feelings.js
… (base sections 1-4 unchanged: d1/d2/d3 + de/fi chromes, 13 poisons)
render K-331 scene: verify 0 lints 0 body 778 px lowest 887 vs foot 921 cards 6 answers tired/happy/tired/happy/scared/scared positions 001200
render K-331 scene long chrome de: … body 733 … lowest 895      render … long chrome fi: … body 700 … lowest 900
render K-332 draw: verify 0 lints 0 body 811 px lowest 855 vs foot 921   (de 733 / 874 · fi 700 / 883)
render K-333 valence: verify 0 lints 0 body 766 px lowest 919 vs foot 921 strip scared=bad happy=good merry=good disgusted=bad content=good sad=bad   (de / fi same strip)
render K-334 choice: verify 0 lints 0 body 778 px lowest 902 vs foot 921 rows 6 × 121 px positions 021210   (de 114 px · fi 108 px)
render K-335 checkin: verify 0 lints 0 body 811 px lowest 907 vs foot 921 labels 50/29/47/54/78/39 px   (de / fi 907)
render K-331 veto control: cards 5 answers tired/happy/happy/scared/tired fifth card x 186…517; long chrome fi lowest 900 vs foot 921
sweep: 19 distinct derangements at d2, 20 distinct left orders at d3, 0 fixed points
sweep faces: F1 8 distinct scene sets, F2 14 distinct orders, F4 all 3 positions on every seed
poison: P1 bank/build · P2 · P6 · P7 · P8 bank/build · P10 guard/verify · P11 · P12 (+pin) · P14 · P15 · PF · PI guard/floor · PW verify/node ·
        P3 · P4 · PX · PO · PS · P5 verify/node · P13 guard/verify (8 faces, 2 rows) · P9 · PM · PL — all KILLED
PASS (1878 assertions, 23/23 poisons killed)          --quick: PASS (1754 assertions, 23/23 poisons killed, --quick: sweep skipped)
```
`node tools/gate-variation-distinct.js --batch=b3 --diffs=2 --family=feelings` → `[b3:feelings] compared 15 pairs over 5 faces against their bases + pairwise within family` / **`every variation differs from the deck its base publishes and from its siblings`**.
`node tools/b3-baseline.js --check --quick` → **`checked build 2968 + enum 211 in 22s: 0 drifted (0 expected), 0 missing` / `PASS`** (the base's d1/d2/d3 `bodyHtml` sha1 over 3 seeds also compared identical before/after every edit, scratch `k319-hash.js`).
`node i18n/build-en.js` → `518 types … (title lint clean)`; `git checkout -- i18n/strings.en.json` restored the committed file.

## Deviations from §3 (each with the measurement)
1. **Component names are type-scoped** (`feelingChoiceTile` for the design's `faceTile`, `feelingBlankFace` for `blankFace`, `feelingCheckIn` for `checkInCard`, `feelingSceneGrid` also serves F2). The base record (deviation 1) set the `feeling…` convention and the base already exports `feelingFaceTile` for its MATCH tile; a bare `blankFace` risks colliding with K-323 all-about-me's "Label the Face" work in the shared namespace loader, which refuses duplicates for every family at once.
2. **F4 rows `minmax(104px,1fr)`, not the design's 112.** 6 × 112 + 5 × 10 = 722 is exactly the README body and OVERFLOWS the measured 700 px body of a legal 4-line fi title (the base record's finding); 6 × 104 + 50 = 674 fits with lane padding 6 (inner 88 ≥ the 84 tile). Rows still measure 121 / 114 / 108 under en / de / fi chrome — the design's 112 is met everywhere but the 700 floor, where 108 holds.
3. **F5 label width = the tile's inner width 96, not "94".** Measured in the real fonts (scratch `k335-label-measure.js`, Baloo 2 700): es `sorprendido` = **100 px at 18** (the design's blank-page 93.7 under-measured, as its `sorprendido` 145.8 did on the base) and **94 at 17**; every other §4 panel word ≤ 92 at 18 (it `spaventato` 92, de `überrascht` 89, da/no `overrasket` 88, it `arrabbiato` 86, pt `assustado` 83, fi `surullinen` 82, nl `verdrietig` 81, da `ked af det` 81). So the **es panel must declare `checkin.labelPx: 17`** (the build reads it; the gate asserts every rendered label inside the 96 px inner width and names the fix); the label's `max-width` is `w − 4` (the true inner width) so 17 clears with 2 px, not 0.
4. **F1 `d1`/`d3` variants and F3 `d3` face-labelled bins are not built.** The emitter ships ONE config for all three levels (the waves publish d2 only), so the §3 d1 (4 cards / 2 tiles / 110 objects) and d3 (`sad` as an extra decoy — already in the d2 decoy pool) are unreachable rows; F3 d3 would need an additive `labelHtml` knob on the shared factory, which is out of scope (the design allowed "if refused d3 = d2").
5. **F3 items are a literal in the handwritten spec**, not read from the bank at require time: the factory computes `itemsByBin` at construction, and `data/b3/feelings.js` is gitignored — a require-time bank read would take down `loadAllTypes()` (every tool) in a checkout without the bank, where the base only fails at build. The gate asserts the literal ≡ the bank's valence set in both directions (P5), so the two cannot drift silently.
6. **The F1 sampler is object-disjoint by construction** (§3 lists "no object twice" only under verify). With `maxPerFeeling:2` and three tired scenes, two of which share `space/moon`, a plain sample would refuse ~1 seed in 3; the run per feeling skips a scene whose cue is already used.
7. **F5 faces are in bank order, not shuffled** — a check-in is a fixed palette, not a puzzle; the seed changes nothing on this page (one instance per locale anyway).
8. **F2 `verify()` exists as a structure check** (the brief: "open-ended faces: structure + lints only") — it grades nothing.

## Per-locale refusals visible from the bank shape (Phase 4 `hub-expectations.json`)
- **None lowers a row.** All six matchable faces/words exist in every locale's vocab (base record), so F2 (pool of 4), F4 (6 rows) and F5 (6 faces) are fillable in all 11; F3 is locale-neutral (bin labels are the only authoring); F1 keeps ≥ 3 feelings / ≥ 4 scenes even under the expected sv/fi **syringe veto** — which is GLOBAL (apply- propagates it to all 11), so F1 ships as **5 cards in every locale**, not 6 (verified by the gate's veto control). Expected rows stay **6 × 11 = 66**.
- **Authoring requirements that REFUSE if missing** (not row losses): every locale block needs `bins.good/bad.label`, `checkin.today/draw/because`, `strings['K-331'..'K-335']`; es additionally `checkin.labelPx: 17` (deviation 3). An unauthored block throws on every face (gate-asserted).
- **Width envelopes for the panels (measured):** F4 word column 220 at 26 (widest §4 word `sorprendido` ≈ 144); F2 word 294 at 30 (`spaventato` ≈ 153); F3 bin pill 210 (`desagradable` 128 per the design); F5 label 96 at 18 (see 3).

## Open items for the panels / Phase 4
- es: `checkin.labelPx: 17`. sv/fi: decide the syringe veto (global; F1 → 5 cards ×11).
- `today` literal must be a clause whose predicate is the ringed face (no adjective slot — P14); `draw` a plain imperative; `because` one word or null (a locale with no one-word "because" prints an unstarted row).
- Registration (`apps.feelings`, `axes['exercise-type'].feelings` ×11, landings per face with `coordinate.mode` = `scene | draw | valence | choice | checkin`, `hub-expectations` 66) is the batch's `register-b3-*` step, not this build.
- The F3 sheet's large empty middle is the shared factory's geometry; a family-level fix would be a factory knob (shared file) — flagged, not done.
