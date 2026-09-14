# G2-319 `logic-puzzles` : EDITOR-CRITIC record (2026-09-14)

Inputs: `_work/G2-319-pedagogy.md` + `_work/G2-319-design.md`; output `G2-319-logic-puzzles.md`. Doctrine applied: measured buildability beats preference; the brief's rules beat both. (m) = re-measured today (node over the taxonomy / landings / `sentences.js`; puppeteer through `page/shell.js buildPage` from `file://` with the shell's woff2 loaded; the pedagogy's solver scripts re-run plus `g2319-f1.js`). No em-dashes.

## 1 Contradictions + resolutions

| # | pedagogy | design | ruling | why |
|---|---|---|---|---|
| 1 | cell 60 / header 60 / name Nunito 16 in 96 | cell 60 / header 64 / Baloo 2 700 22 in 124 | **design** | `Francesco` 100.3 (m) needs > 96; fits 104 inner at 22; `LP[loc].namePx` = data fallback, verify asserts <= 104 |
| 2 | child draws or writes the answer (`answerBox` 64x44) | child CIRCLES in an `answerBank` strip | **design** | drawing / spelling is ungradeable across 11 languages and a motor task; `answer:'box'` kept as a data fallback |
| 3 | answer row on every face | none on F2 / F4 | **design** | 4 x 255 = 1020 > 675; the grid is the answer at G3 |
| 4 | F4 clues in one column beside the L-grid, 720 of 722 | two columns above a 484 x 424 L-grid | **design** | measured stack 588 (d2) / 661 (d3) vs 2 px slack |
| 5 | F5 `pillChoice` true/false words | `glyphChip` ✓/✗ | **design** | pt pair 216 (m: `verdadeiro` 98.5 + `falso` 45.5 + padding) leaves 91 px of a 351 column for a sentence with a picture; words live in title + instruction |
| 6 | legend under the instruction | `markKey` strip at the top of the body | **design** | the instruction strip is shell chrome; nothing fits under it |
| 7 | "Se, jolla on [36], ei ole Väinö" *est.* 308 | fr `holderNot` 366 | **re-measured**: fi 247, fr **347** with the longest REAL fr name (`Nathan`; no fr name has 9 chars) | two-line reserve confirmed (56.3 row, m); fr keeps the shape; `maxHolderNot:2` only on F2 (column 277 wraps it in 6 locales); no quota needed at 3x3 (317) |
| 8 | F1 d2 `clues:[3,3]`, `pos` allowed, re-roll "*est.* < 30 %" | same | **corrected**: `clues:[2,3]`, seed one `either` first | a `pos` collapses a 3x3 to 2 necessary clues in 69 % of puzzles; `[3,3]` + either was satisfiable 27 % (m, 20,000) |
| 9 | F2 d3 "neg + either + holderNot, 6 clues forced" | `+holderNot maxHolderNot:2 clues:[6,6]` | **corrected**: `kinds:[neg,holderNot] clues:[6,6]` | with `either` the necessary count is 4-6 (6 in < 1 %); neg-only is exactly 6 (m) |
| 10 | F4 d3 "4 clues, 0 pos, >= 2 cross" | same | **corrected**: `clues:[6,6]` | neg-only two-attribute is always 6 (8 in 0.2 %); a 4-clue neg-only set cannot be unique (m) |
| 11 | F4 d2 "5-6 clues", re-roll ~40 % | 5-6 | **corrected**: `clues:[4,6]`, re-roll ~7 % (no `pc` clue) | 4-clue cases are 40 % of the measured distribution and are legitimate puzzles |
| 12 | F2 d2 re-roll ~21 % | (silent) | **0 %** | accepting 4-6 covers 100 % of the distribution |
| 13 | (silent) | F5 composer caps <= 3 two-line statements per grid | **withdrawn** | two-line row = 56.3 not 66 (m): worst 5 x 56.3 + 24 = 306 per band, stack 680 <= 722 without a cap; verify keeps `row <= 66`, band <= 310 |
| 14 | (silent) | F5 text column 225 | **223** | 351 - 26 - 8 - 8 - 40 - 6 - 40 |
| 15 | clue line 40 | line box <= 36 | **32 / 56.3** (m, one / two lines with a 32 px inline picture) | rows `minmax(32,auto)`; every stack recomputed with these |
| 16 | (silent) | "`.ws-tile` styling reused" | **not reused** | the tile is SVG (`roundedRect` + `label`); `.ws-tile` is Nunito 800, padding 0 12, box-shadow (`page.css:395-399`, m) |
| 17 | `assetClass:'icon-placement'` | (silent) | **kept** | `'visual-logic'` is the six sibling types' class (m); `assetClass` is only a wave filter (`enumerate.js:50-54`) |
| 18 | sv slug `logikpussel-med-ledtradar` | (silent) | **`logikpussel`** (free, m), `klurigheter` also free | shorter head; the panel picks |
| 19 | `holderNot` / `crossNot` listed as clue KINDS | same | **solver kinds are `neg` with an inverted frame** (`k:'neg', f:'holderNot'`) | both files implied it; neither said it; the d-level maths depends on it |
| 20 | "sudoku app: 100 landings" and "vs G3-351 / G3-353" | same | 100 confirmed (m); **the printable visual-logic types have 0 landings in `en.json`** (m) | those pairs are deck-page-only; the gate measures against `sudoku` + the six faces |

Faces confirmed as genuine moves (each distinct in resolved d2 config: kinds / clues / size / mode), honest in all 11 (every locale has a gender-free `neg / pos / either / holderNot / cross` shape with the picture inline; F3 needs only names): F0 3x3 negatives G2 · F1 clue kinds G2 · F2 4x4 G3 · F3 picture-only G1 · F4 two attributes G3 · F5 true/false G2. Theme axis ON with the curated allowlist; `minNouns:6` is a coarse cache pre-filter (`enumerate.js:79` counts cache nouns, m), the real gate is `SETS.distinct[theme].length >= 6` in the validator + `themeOverrides`. `coordinate.mode` per face: `base | clue-kinds | 4x4 | picture | two-attr | true-false`.

## 2 Claims removed or downgraded as unverified

- Pedagogy "fi holderNot *est.* 34 chars x 8 + 36 = 308": measured 247; removed.
- Pedagogy "F1 re-roll *est.* < 30 %": measured 73 % under its own config; replaced by the corrected config (~38 %).
- Pedagogy "F4 propagation 0.2 % refuse": 0.2 % is the neg-only row; 0 % with `pos` at d2 (m); stated per level.
- Design "worst 3 x 66 = 198" / "5 x 66 = 330": the 66 was a cap, not a measurement; rows are 56.3; kept only as the verify ceiling.
- Design "d2 shapes <= 253 (m)" was measured with a 9-char name in every locale; re-measured with each bank's longest name (fr 256.6 `cross`, no 240.5 `either`); the one-line conclusion stands.
- Both files' "Logicals are a Klasse 2-4 staple" and the C-tier demand lines stay as PANEL claims (`_PANEL-FINDINGS.md` 19), not measurements.
- Non-cannibalisation numbers are *est.*; the gate measures.

## 3 Numbers re-measured (shell fonts, `file://`)

| what | pedagogy / design | measured |
|---|---|---|
| longest name Baloo 2 700 22 / 18 / Nunito 800 16 | `Francesco` 100.3 / *est.* 82 / 75 | 100.3 / 82.1 / 75.0; es `Valentina` 94.9 / 77.7 / 72.5; no `Theodor` 83.7 / 68.5 / 64.5; nl `Julia` 45.3 |
| clue shapes, Nunito 800 18 + 32 px picture, longest bank name | `holderNot` fr 366, de 318, others <= 260 | fr 347.3 · de 289.1 · no 286.5 · da 283.0 · es 282.6 · en 280.4 · sv 261.2 · nl 258.1 · pt 251.3 · fi 247.2 · it 242.4; `cross` <= 256.6; `either` <= 240.5; `neg` <= 224.4 |
| line box with inline picture | 40 / <= 36 | 32 (one line) · 56.3 (two lines) |
| truth words Baloo 2 700 20 (bare) | pt pair 216 with 6/18 padding | pt 98.5 + 45.5 (+ 36 each = 216 ✓); es 93 + 45.5; nl 44.9 + 84.5 |
| body under 3-line title + long instruction | 722 (README) | 733 with a 99 px title + 46 px (2-line, 157 chars) instruction on de: 722 stands as the floor |
| slugs x11 + alternates | "free" | all 11 proposed free across every axis x locale; `logikpussel`, `klurigheter`, `logic-puzzles`, `logigrammen` free; `logikraetsel` COLLIDES (`visual-logic`) |
| names bank | 8 per locale, no gender field | confirmed x11 (`sentences.js` keys `nounCase endSpace names colorWords nounForms fixLabels frames`) |
| `strand-names.ts` | no reasoning row | 14 rows, none; `localizeStrand` returns an unknown strand verbatim |
| solver: 3x3 neg / neg+pos<=1 / neg+either | 3 · 2 (76 %) 3 (24 %) · 3 | 3 (100 %) · 2 (77 %) 3 (23 %) · 3 (100 %) |
| 4x4 neg / neg+either / neg+pos<=1 | 6 · 4 (79) 5 (21) 6 (<1) · (silent) | 6 (100 %) · 4 (79) 5 (20) 6 (<1) · 4 (65) 6 (35) |
| two-attr neg+pos<=2 / neg-only | 4 (40) 5 (44) 6 (16); prop 99.8-100 % | 4 (40) 5 (44) 6 (16) 8 (<0.1), prop 100 %, cross 93 % · 6 (99.8) 8 (0.2), prop 99.8 % |
| F1 d2 `[3,3]` + pos + either | *est.* < 30 % re-roll | 27.3 % satisfiable; corrected config either-present 62 % |
| allowlist nouns cached + vocab x11 | "authored by opening pictures" | pets 9/9, fruits 9/9, colors 6/6 resolve in all 11 via `entriesFor` (m); toys / vehicles / farm / zoo lists not yet written |

## 4 OPEN items

1. **Slug + hub NAME per locale where `visual-logic` owns the head** (de Logikrätsel, sv Logiska pussel, no Logiske gåter, fi Looginen päättely): panels choose among the free forms (sv `logikpussel` / `klurigheter`; fi `paattelytehtavat`); the emitter asserts non-collision against every `axes.*.*.slug.<loc>` AND `name.<loc>` at registration.
2. **`SETS.distinct` for toys / vehicles / farm animals / zoo animals** (>= 6 pairwise-distinct pictures each, opened, no `confusable` pair) is an EN build-step task before the wave; a theme that cannot reach 6 is dropped from the fan, never padded.
3. **fi name case literals** (8 x `ade` + `gen`; vowel harmony Väinöllä / Eelillä / Helmillä) and the `{nameAde} {pic} {pic2}` slots in `lib/b3-instructions.js fillSlots` (the G1-308 module; absent, m).
4. **F3 at 716 of 722**: the de / fi / pt renders with a 3-line title + 150-char instruction decide `markKey({compact:true})` (704) or none (680).
5. **F3 band in de** (Bilder-Logicals Klasse 1 is a real head): G1 key proposed; the de panel may keep it or note K in copy.
6. `scripts/verify-hub-type-rows.js` absent (README item 2); a b3 ROWS list / wave file for `tools/gate-variation-distinct.js` (reads `gen-b2var-specs.js ROWS`, m).
7. **Meta lead vs tier truth** (README open item 1): the batch inherits the live `seo.words.free_printable`.
8. **Item-count ruling**: the item is the grid cell (F0 18 · F2 32 · F3 18 · F4 27 · F5 10); F2's 32 exceeds the G3 [8,16] card-density range; the emitter / lint accepts a single apparatus above the range as G1-158 (16 cells at G1) already does, else records it.
9. **Mono-print check** of 32 px inline / 36 px bank / 56 px header pictures per fan theme; any merging pair leaves the allowlist (data).
10. **Pipeline re-measure** of the name tile at 22 in 104 (it / es), the 4x4 tile at 18 in 84, and the F5 two-line rows on a de / fi / pt render (`render/one.js`, never a bare page).
11. **F4 `colors` allowlist**: the `colors` theme has 19 paint drops incl. near-hues (scarlet / crimson / turquoise / violet / peach / coral); the 6 chosen are pairwise distinct by name, the engineer opens the drops to confirm they are distinct in MONO print (a hue-only difference is invisible on a laser).

## 5 Verdict (a critical second-grade teacher)

The page teaches one honest thing, elimination from clues, and shows the child exactly where to put the pencil: cross in the grid, tick, circle in the strip; two cases of three clues is the right load for 7-9 and the marks key means I never explain ✓/✗ twice.
The four faces I would actually print are the base, the picture-clue page for my weakest readers, the 4x4 for the fast ones and true/false as a check that they can READ a grid; two-attribute is a G3 stretch that some of my class will love and most will need me for.
My reservations: 32 px pictures inline in a sentence are small for a child who confuses a pear and a lemon, so the allowlist and the mono print test are not optional, and the F1 fix (a positive clue makes the third clue redundant) shows the generator must be built from the measured solver, not from the prose.
