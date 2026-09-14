# K-318 `sound-boxes` — BASE build record (2026-09-14)

Built from `K-318-sound-boxes.md` §2 + §5 under `_BUILD-BRIEF.md`, the README cross-type rulings and `_SUBSTRATE.md`. EN only (the ten non-EN blocks are the panels' Phase 2). Nothing shared was edited; nothing was committed.

## Files (all new, type-scoped)

| file | what |
|---|---|
| `scripts/worksheet-gen/types/k/K-318-sound-boxes.js` | the spec: `{id, slug:'sound-boxes', gradeBand:'K', exerciseType:'sound-boxes', themeAxis:{applicable:true, minNouns:8, excludeBw:true}, difficulty 1-3, i18n.en, build(), _buildWith(cfg, …) (the gate's seam), verify(page)}` |
| `scripts/worksheet-gen/templates/components-b3/sound-boxes.js` | `soundBoxes({chunks, box, gap, wide, dash, starter, printed, uniform})` · `hakDots({centers, width, filled})` · `soundLane({w, h})` — exactly the three NEW names of §2 (`syllableArcs` is G1-305's `primitives/syllable-arcs.js`, already on disk from that builder; Face 5 will `require` it) |
| `scripts/worksheet-gen/data/b3/sound-boxes.js` | `SOUND_BOXES.en` — 182 hand-authored grapheme rows (nested by the approved split), 31 `remergeAcrossSyllable` keys, 61 `exclude` keys with reasons, `exemplar:'animals'`, `dots:false` |
| `scripts/worksheet-gen/lib/sound-boxes.js` | `segment(vocabKey, cfg)` · `fitBox(...)` · `eligible({theme, loc, cfg, d, inner})` — the render-time segmentation door (bank only; never approved-words at render) |
| `scripts/worksheet-gen/qa/verify-b3-sound-boxes.js` | the gate (below) |
| `scripts/worksheet-gen/i18n/strings.en.json` | +4 lines: the `K-318` entry, inserted after `K-307` in the committed 1-space format (see "shared-file note") |

## What was built (§2)

2×3 cream cards; picture 104 over one dashed coral box per verified grapheme (48 px, gap 8, dash `6 5`, stroke 2.5, r 8, white fill); a multigraph box is `round(48×1.5)=72` with a teal tie arc under it; the word is never printed. Stamps on each `.ws-card-stage`: `data-lcs-word` (display form), `data-lcs-vocab`, `data-lcs-chunks="k|a|t"`, `data-lcs-face="base"`; the root carries `[data-ws-content]` + the resolved config (`data-lcs-cards/ming/maxg/maxwide/minwidecards/dots/inner/band`) so `verify()` re-derives everything from the page. Fit rule `box = min(box, floor((302 − gap(n−1) − 2) / (n + 0.5·wide)))`, refuse < 44 (a 5-grapheme word with 3 multigraphs is not eligible, as §2 resolves). Pool = `entriesFor(theme,'en')` → `displayWord` → `/^\p{L}+$/u` → bank row present and not excluded → `flat.join('') === word` (a mismatch THROWS: a data defect surfaces, never vanishes) → n in `minG..maxG`, wide ≤ `maxWide`, fit ≥ 44 → `distinctByWord`. d2 refuses a theme whose pool < 8 (`poolFloor`); every difficulty keeps `sampleEntries` (sample-or-throw). d3 requires ≥ 2 cards with a wide box (sampled from the wide sub-pool, then shuffled); d2 *wants* one (soft: never refuses a locale/theme with no multigraph words).

`verify(page)` (browser, no modules): cards == `d.cards`; boxes == chunks; `data-lcs-wide` == (chunk length ≥ 2); tie arcs == wide boxes; `chunks.join('') === word.toLocaleLowerCase(lang)`; n in range, wide ≤ max, wide cards ≥ min; exactly one picture, `naturalWidth > 0`, not squashed, ≥ 56 px in band K; no visible text on a card; no `<text>` inside the boxes; no duplicate word / noun; box row ≤ 302 and ≤ its stage; every box ≥ 44 px tall; the row inside its card (`.ws-card` is `overflow:hidden`, so a too-tall stack silently loses its bottom — the page-box lint cannot see it); dots == boxes when dots are on, absent otherwise.

## Deviations from the design file (each measured in the real render)

1. **Body height is 710 px, not 722 / 760.** Measured with `render-instance.js` under a 3-line title (99 px) + 3-line instruction (69 px): `.ws-body` 710; short chrome 799. Cards: rows 3 → 227 (stage 199), rows 4 → 167 (stage 139), rows 2 → 348. Every stack was re-budgeted to 710:
   - stage padding `6px 0` → **`4px 0`**; tie-arc allowance 10 → **8** (arc `M x+6,y+box+2.5 Q cx,y+box+9 …`, apex at box+5.5, inside box+10); hak-dot row 14 → **12 px** (`cy 6, r 5`).
   - **d3 picture 80 → 68.** A rows-4 stage holds 131 px under the worst chrome; a wide row is 54 px: 68 + 8 + 54 = 130. (G1 band floor 44; the K faces keep 104 / 160.)
   - **d2 with dots (nl) picture 104 → 96** (`picWithDots`): 96 + 8 + 12 + 8 + 58 = 182 ≤ 191. Without dots the picture stays 104 (170 ≤ 191). Proven by the gate's dots-under-long-chrome render.
2. **d1 picture 128 / box 52 / gap 10 → 160 / 60 / 12.** The design's d1 left a 2×2 card (inner 372 px) 57 % empty — visibly sparse; 160/60 fills 68 %. d1 is dev-only (waves ship d2).
3. **d2 `wantWide: 1`** (soft) added: the instruction names the tie arc once, so a d2 page shows at least one wide box when the pool has one. The design's `minWideCards 0` is kept as the hard rule.
4. **`syllableArcs` not defined here** — G1-305's `primitives/syllable-arcs.js` exists on disk (that design says "ONE primitive for both types"); defining it again would be a duplicate-export refusal in `components-b3.js`. Face 5 requires it from there.
5. **`lib/sound-boxes.js` reads the bank only.** The design's `segment()` copies `chunks` for de/nl/sv/no at render; the brief forbids approved-words at render, so `mode:'chunks'` locales must have their `chunks` (with `mergeDoubles` / `remergeAcrossSyllable` / overrides) PRE-RESOLVED into `bank` by `tools/apply-b3-locale.js`, and da's strict pool likewise. Open item for the Phase 2 tooling.
6. **EN `remergeAcrossSyllable` holds vocabKeys, not seams**, because EN's approved splits are rule-only (`rab-bit`, `roc-ket`, `seag-ull`, `bat-htub`) and a digraph straddles the seam in 31 words. The validator rule: a listed key must straddle (else "dead flag"); an unlisted key must match `split[s]` per row. Both directions poison-tested.
7. **EN grapheme conventions** (the design left the en whitelist open): consonant digraphs `sh ch th ck ng qu wh ph tch dge`; vowel teams `ee oo ea ai ay oa ou ow oi oy ie ei ey igh aw au`; r-controlled `ar or er ir ur`; doubled consonants one box (`ll ss tt …`); silent-e carrier `se / ce` only after a vowel team / r-vowel / consonant (`horse = h,or,se`, the design's own example; `fence = f,e,n,ce`); `x` one box. **Refused:** magic-e words (kite, whale, plate, gate, vase, hose, stove …), silent letters (comb, lamb, calf, knife), soft c/g (pencil, garage, giraffe), irregular vowels (oven, glove, shoe, iron, apron, penguin), > 8 boxes. 61 keys excluded with the reason grouped in the file.

## Measured EN pools (after segmentation; gate section B)

| theme | banked | d2 (3-5, ≤2 wide) | d1 (2-3, 0 wide) | d3 (4-5, ≥2 wide cards) |
|---|---|---|---|---|
| animals (exemplar) | 26 | **21** | 5 | 11 (5 wide) |
| around the house | 53 | **41** | 8 | 27 (23) |
| forest creatures | 30 | **22** | 3 → d1 refused | 13 (10) |
| toys | 21 | **18** | 0 → d1 refused | 13 (10) |
| zoo animals | 23 | **16** | 2 → d1 refused | 10 (4) |
| farm animals | 23 | **18** | 5 | 6 → d3 refused |
| vehicles | 17 | **13** | 3 → d1 refused | 7 → d3 refused |
| clothing | 27 | **19** | 2 → d1 refused | 15 (12) |

All eight §1 wave themes clear the d2 floor of 8 in EN (min vehicles 13). fruits / pets were not authored (refused for the whole type per §1). The d1 refusals come from the design's `maxWide 0` at d1 (EN 2-3-sound words are mostly digraph words: duck, fish, sheep …) — d1 is not shipped; recorded, not changed.

## Gate (`node qa/verify-b3-sound-boxes.js`, real pipeline)

Full run: **`K-318 gate: 2591 assertions, 0 failures, poisons 16/16 killed → PASS`** (quick: 1982 assertions, 16/16). Sections: A bank data (182 rows, 0 faults) · B pools + every picture on disk · C renders: 8 themes × d1-d3 (7 refusals recorded, 17 rendered), worst-legal chrome × d1-d3, 6 seeds at animals d2 (no two seeds share a word set), dots stack under long chrome; each render = lints clean + verify empty + measured floors (picture ≥ 56 K / 44 G1, box ≥ 44, row ≤ 302, inside its card) + stamps diffed against the gate's own re-derivation + non-vacuity. Poisons killed: P1 unapproved key · P2 `horse → hors` · P3 multigraph off the whitelist · P4 seam merged outside `remergeAcrossSyllable` · P5 dead remerge flag · P6 excluded-and-banked · P7 da `dog`/hund with `policy_managed:true` under the strict pool · P8 a 5-word pool renders instead of refusing · P9 chunks stamp ≠ word · P10 wide flag flipped · P11 the word printed on its card · P12 duplicate word · P13 a box removed · P14 boxes squashed below 44 · P15 row wider than the card · P16 blank page. The correct bank is the control (passes before the poisons run).

## Renders (looked at, every one)

- `scripts/worksheet-gen/out/dev/K-318-animals-d1-en.png` · `…-d2-en.png` · `…-d3-en.png` (exemplar, all three difficulties)
- `scripts/worksheet-gen/out/dev/K-318-around the house-d2-en.png` · `K-318-toys-d2-en.png` · `K-318-toys-d3-en.png` (second/third theme)
- gate sweep (105 files): `scripts/worksheet-gen/out/dev/k318-gate/` — incl. `K-318-animals-d3-en-longchrome.png` (the tightest stack) and `K-318-animals-d2-en-dots-longchrome.png` (the nl-style dot row)
Fixed from looking: the d1 sparseness (deviation 2); the d3 squash under long chrome (verify now fails a squashed row; deviation 1).

## `build-en` + baseline

- `node i18n/build-en.js` → `482 types, title lint clean` ("Sound Boxes" unique in band K; instruction 129 chars, no "worksheet", no "free").
- `node tools/b3-baseline.js --check --quick` → `checked build 2760 + enum 200 in 15s: 11 drifted (0 expected), 0 missing` → **build drift 0 across all 2760 coordinates**; the 11 drifts are `wave:wave-001..011` only. Those are the legacy `types:"all"` waves whose round-robin shifts with ANY new spec on disk (K-317 / G1-305 / G1-306 are on disk too); commit `aa9b16b0` skips them in the snapshot, but the on-disk `out/b3-baseline.json` (09:43) predates that skip and its `wave:wave-00N` keys collide with the `wave-00N-divfix-{a,b}` pin waves that share the id → the reviewer's `--capture` after the skip makes the line PASS. Verified with none of the K-318 files present: the same 11 enum drifts, 0 build drifts.

## Shared-file note (for the reviewer)

`i18n/strings.en.json` is contended: a sibling session ran `git checkout` on it at 10:41 (my K-318 entry vanished once) and another ran `build-en.js` (which rewrites the whole file in 2-space format, a 3,700-line diff). I re-inserted only the `K-318` entry in the committed 1-space format (4-line diff). `build-en.js` on the merged tree passes; if it is run for real, the whole file reformats — that is its existing behaviour, not a K-318 change.

## Open items for Phase 2 (faces / panels / tooling)

1. `tools/apply-b3-locale.js` + `tools/validate-b3-draft.js` (sound-boxes part): pre-resolve `chunks` → `bank` for de/nl/sv/no (with `mergeDoubles`, `remergeAcrossSyllable`, per-word overrides), da strict pool (`policy_managed` ABSENT only), and the per-locale multigraph whitelist the gate's `WHITELIST[loc]` reads (en is in the gate today).
2. `tools/gate-sound-boxes-data.js` per §5 = this gate's sections A/B run per locale × theme × face once the faces exist; the base gate already carries poisons 1-2-4(a)-5-7-8 of the §5 list; 3 (chunk-table membership), 4 (Strip/Tiers/Blend ranges) and 6 per face come with the faces.
3. Faces 2-6 as `build()` knobs: `countMode` (`soundLane` + `answerBox` with `data-lcs-answer`), `starter` (the `starter:{i:0,text}` option is implemented and untested on a page), `strip` (`uniform:6` implemented), `tiers` (G1-305's `syllableArcs`), `mode:'blend'` (`printed:true` implemented). The `_buildWith` seam stays the gate's door.
4. nl dots ride on `cfg.dots` (bank field), not `strings.<loc>.json` — the design named both; the bank is the single flag.
5. Hub: `apps.sound-boxes` + the taxonomy names, `verify-hub-type-rows.js` expectations (6 rows × 11) — the registrar step, after the faces.
6. Panels: the EN source above is the source to AUDIT (title "Sound Boxes", the instruction naming the tie arc once); da ships two themes at K unless widened; en d1 `maxWide 0` yields ≤ 5 words per theme — if d1 ever ships, a panel ruling on allowing one digraph at d1.
