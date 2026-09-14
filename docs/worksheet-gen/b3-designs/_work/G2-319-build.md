# G2-319 `logic-puzzles` : BASE build record (2026-09-14)

Built from `G2-319-logic-puzzles.md` §2 + §5 under `_BUILD-BRIEF.md`, `_SUBSTRATE.md` and the README cross-type rulings. Base face only (Phase 1); the five faces of §3 are NOT emitted, but the additive knobs the base must already carry are in place and probed (`size:4` renders 4×4 with no strip through the base path; `logicGrid({mode:'solved'})` for F5; `notMark` for F3; the `cross` / `crossNot` / `truth` frames authored in the EN bank; `_buildWith(bank, cfg, {theme, locale}, ctx, sets)` as the injection seam). Nothing shared was edited (`git status` shows only untracked new files under `scripts/worksheet-gen`); nothing was committed.

## Files (all type-scoped, all new)

| file | what |
|---|---|
| `scripts/worksheet-gen/types/g2/G2-319-logic-puzzles.js` | the spec: `{id:'G2-319', slug:'logic-puzzles', gradeBand:'G2', assetClass:'icon-placement', exerciseType:'logic-puzzles', themeAxis:{applicable:true, minNouns:6, excludeBw:true}, unitAxis:{applicable:false}, difficulty:{1,2,3}, i18n.en, build(), _buildWith(), verify(), _solver}` |
| `scripts/worksheet-gen/primitives/logic-grid.js` | NEW primitive (design §2): `logicGrid` · `markKey` · `notMark` · `tickPath` / `crossPath` |
| `scripts/worksheet-gen/templates/components-b3/logic-puzzles.js` | `clueRow` · `answerBank` (namespace merge verified: 77 exports, no duplicate name; `pictureClue` / `glyphChip` / `lGrid` are face components, Phase 2, unexported) |
| `scripts/worksheet-gen/data/b3/logic-puzzles.js` | `LOGIC_PUZZLES.en` (head, 8 names, frames ×6 kinds ≥ 2 each, truth ×5, strings ×6) + `SETS` (7 allowlists, 29 confusable pairs, the fan set) + `validateBank` (§5 rules 1-7). `data/` is gitignored: the reviewer force-adds. |
| `scripts/worksheet-gen/qa/verify-b3-logic-puzzles.js` | the §5 gate (sections A / C / D below) |

## What the base page is

Two case files. Each = `<section data-ws-content data-lcs-puzzle="p">`: a two-column grid (clue column | elimination grid, gap 20) and the answer strip under both. Clue column = `clueRow` × N (`[badge 26 teal circle Baloo 2 700 15 white][8][text Nunito 800 18, lh 1.35]`), rows `minmax(36px, auto)`, gap 4; the PICTURE stands in for every noun as an inline `<img class="ws-icon" data-lcs-pic="j">` 36 px (`vertical-align:middle; margin 0 3px`, no right margin before punctuation). Grid = `logicGrid`: white ground, teal 2.5 px r 6 frame, 1.5 px `grid` interior lines, name tiles down the header column (white r 10 teal 2, Baloo 2 700 22 ink, `data-lcs-row`, inner 104), pictures 56 across the header row (real `<img data-lcs-col>` laid over the SVG cells), nine EMPTY `<rect fill="none" data-lcs-cell="p:r:c">`. Answer strip = `answerBank`: three cream chips 219 × 48 (`[pad 6][name Nunito 800 16][8][three pictures 36, gap 4]`), pictures in COLUMN order, `data-lcs-answer-slot="r"` only. `markKey` (675 × 36, right-aligned, `aria-hidden`, class `ws-logic-markkey`, no `data-lcs-*`) at the top of the body. Slack goes to the band gaps (`justify-content:space-evenly`), never the grid.

Ladder as built (resolved config; every guard keys on these, never the level):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| size / cases | 3 / 2 | 3 / 2 | 3 / 2 |
| clues / kinds / quotas | [2,3] / pos, neg / maxPos 1 | [3,3] / neg | [3,3] / neg, holderNot / **minHolderNot 1** (deviation 3) |
| cell / headW / hdrH / namePx / picPx | **64** / 124 / 64 / 22 / 56 | 60 / 124 / 64 / 22 / 56 | 60 / 124 / 64 / 22 / 56 |
| inlinePic / bankPic / answer | 36 / 36 / circle | 36 / 36 / circle | 36 / 36 / circle |
| grid (px) | 316 × 256 | 304 × 244 | 304 × 244 |
| band / stack (px) | 312 / **692** | 300 / **668** | 300 / **668** |
| measured distribution (200 seeds × 2 cases, node over the real bank) | 2 clues 76 % · 3 clues 24 % (the design measured 77 / 23); a pos clue in 76 % of cases | exactly 3, all neg | exactly 3; kinds neg 44 % · holderNot 56 % |

Generation (`composeCase`): a random solution (never the identity), the quota kinds seeded first (`minEither` / `minHolderNot`), TRUE clues of the allowed kinds added at random (quota caps honoured, duplicate constraints skipped) until the exhaustive count over the 6 permutations is 1, every redundant clue stripped in random order, then the case is re-rolled unless the count is within `clues`, every quota holds, every frame kind is in `kinds`, and row/column single-open propagation reaches the full solution. Names (6 of 8) and pictures (6 of the allowlist) are sampled once per page and split 3 / 3; a split with a `confusable` pair inside a case re-samples (60 page attempts, 400 case attempts, then REFUSE). Every allowlisted picture of the theme resolves (`entriesFor` vocab singular = the alt, `fileUri` = the file) BEFORE any draw — a dead picture refuses the whole page. Refusals (throw): a theme without an allowlist · an allowlist < 6 · a locale without a bank block · < 6 names · an empty frame array for a configured kind · `cross`/`crossNot` or `mode` on the base · `answer:'box'` · a cell or picture below the G2 floor 36 · `theme:null`.

Answer hiding: nothing prints a solution. Page root `[data-ws-content data-lcs-type="G2-319" data-lcs-face="base" data-lcs-theme data-lcs-cfg]`; case root `data-lcs-puzzle data-lcs-size data-lcs-kinds data-lcs-names="2,5,7" data-lcs-pics="dog,cat,rabbit" data-lcs-nouns data-lcs-forms='[{nom,ade?}]' data-lcs-clues='[{k,f,a,v}]' data-lcs-solution="2,0,1"` (indices only; `holderNot` stamps `k:'neg', f:'holderNot'`; `either` stamps `v:[p,q]`). `verify(page)` (browser, stamps only, its own solver, `SETS` passed in): exactly one permutation satisfies the clues and equals the stamp; every clue necessary; propagation-solvable; not the identity; kinds within `cfg.kinds`, count within `cfg.clues`, quotas honoured; every clue is TRUE for the stamp; every rendered clue carries the stamped name literal (`ade` where the form has one, `nom` in `holderNot`) and its `<img>` srcs equal the header pictures of the stamped columns; header files start with the stamped noun; pictures in `SETS.distinct[theme]`, no `confusable` pair; names + pictures disjoint across the cases; cells empty (no child, text, class, mark); tile text = the stamped name, `getComputedTextLength() ≤ 104`; strip chips unmarked, no `data-lcs-answer`, pictures in column order; rows ≤ 66, clue column ≤ grid height, nothing below the footer, bands ≤ 675; no `data-lcs-answer` anywhere; no ground truth outside a case root.

## Pictures opened (every candidate, contact sheets `out/dev/G2-319-pictures-<theme>.png`: 110 px colour + 36 px greyscale)

Allowlists (`SETS.distinct`): **pets** dog cat rabbit fish parrot frog hamster turtle mouse (9, the design's) · **fruits** apple banana pear strawberry lemon watermelon pineapple cherry kiwi (9, the design's) · **toys** ball doll kite robot train dinosaur rocket blocks dice (9) · **vehicles** bus car train boat airplane tractor helicopter motorcycle bicycle rocket submarine (11) · **farm animals** cow pig sheep horse duck goat rabbit turkey rooster bee chicken (11) · **zoo animals** lion elephant giraffe zebra monkey tiger kangaroo panda hippopotamus camel rhinoceros bear koala (13) · **colors** red blue green yellow purple orange (6, F4 only). Every noun is cached with a vocab key and has a vocab entry in all 11 locales (`validateBank` rule 5, measured).

**Refused after opening** (the picture, not the word): pets goldfish (a fish) · gerbil (a hamster) · tortoise (a turtle) · chinchilla / ferret / gecko / iguana / lizard / cockatiel / finch (rodent-reptile-bird look-alikes at 36 px grey) · fruits plum (**a red apple**, the recorded trap) · lime (a lemon) · clementine / peach / nectarine / apricot / mango / orange / persimmon (round orange fruit, one grey shape) · blueberry / blackberry / raspberry / cranberry (berries, one shape) · avocado / coconut / fig / grapefruit / papaya / pomegranate (unfamiliar or one shape at 36 px) · toys balloon (a small ball on a string) · girl / baby (people) · lego (`B2_EXCLUDE` no) · chess / cards / domino / crayons / bucket / shovel / sandbox / slide / swing / skateboard / scooter / bicycle / car / boat / airplane / helicopter / truck (rectangles or the vehicles theme's) · vehicles truck / van / taxi / jeep (a car or a bus at 36 px) · sailboat / ship / ferry / yacht / canoe (a boat) · jet (an airplane) · crane (the BIRD in 8 locales, `B2_EXCLUDE`) · bulldozer / excavator / forklift (one silhouette) · skateboard · scooter (a motorcycle at 36 px) · subway (a train) · farm hen (= chicken) · goose (a duck) · donkey / foal (a horse) · calf / bull / ox (a cow) · lamb (a sheep) · chick / duckling (a duck) · llama / owl · cat / dog (the pets theme's) · zoo leopard / cheetah / jaguar (a tiger) · chimpanzee / gorilla / orangutan / lemur (a monkey) · gazelle / antelope / reindeer / moose (a deer) · bison · meerkat / otter / sloth / seal / wolf / fox / hyena / armadillo / bat (one grey silhouette each).

**Confusable pairs ADDED** (`SETS.confusable`, never together in one case; the design's 14 pairs kept): apple/cherry · bicycle/motorcycle · boat/sailboat · bus/truck · car/taxi · car/jeep · duck/goose · chicken/hen · horse/donkey · sheep/goat · hippopotamus/rhinoceros · bear/koala · tiger/leopard · monkey/chimpanzee · ball/balloon. Rule 5 is implemented as "≥ 6 members after resolving every in-list confusable pair" (pets 9 − 1 = 8 · fruits 8 · toys 9 · vehicles 10 · farm 10 · zoo 11): the design's own pets list carries hamster AND mouse while listing them confusable, so a literal "no confusable pair in the allowlist" would fail the design's own data; the per-CASE rule is what verify enforces.

**`colors` measured (critic open item 11):** mean greyscale luma of the six drops red 88 · blue 109 · purple 119 · green 143 · orange 161 · yellow 182 (black 48, white 212 for scale). Red / blue / purple sit 10-20 luma steps apart with identical silhouettes: on a mono laser a hue-only difference is near-invisible. **OPEN for the F4 face** (its second attribute needs a shape or pattern signal, or a colour-word, or a ruling that F4 is colour-print-only). Not a base concern.

## Deviations from the design file (each measured)

1. **Inline clue pictures are 36 px, not 32.** The G2 element floor is 36 (`_tokens.js density.G23`, the brief's "G2-3 ≥ 36"); the critic's teacher also flagged 32 as small for a child who confuses a pear and a lemon. Measured consequence: one-line box 40 px, two-line 62.6 (design 32 / 56.3); every base clue shape stays one line in en (longest 3-line stack 3 × 40 + 8 = 128 ≤ 244). Rows are `minmax(36px, auto)`; the verify cap stays 66.
2. **d1 cell 64, not 66.** The design's 66 gives bands of 318 and a stack of 704; the measured worst legal chrome for a 4-LINE fi TITLE is body **700** (a 68-char legal fi title of long compounds wraps to four lines, 132 px; measured in the real pipeline on A4, scratch `g2319-chrome4.js`). 64 → grid 316 × 256, band 312, stack **692 ≤ 700**. The README's 722 and the 3-line chromes (733 / 710) are cleared at every level.
3. **d3 carries `minHolderNot:1`** (design: `kinds:[neg, holderNot]` only). Without a quota a d3 case is all-`neg` in 1/8 of the rolls and both cases in 1/64, i.e. a d2 page under a d3 label. The quota keys on the resolved config (verify + the gate assert it). The sweep proves both kinds appear.
4. **`logicGrid` returns `{html, width, height}`, not a bare svg.** The column-header pictures are real `<img class="ws-icon">` elements laid over the SVG header cells so `qa/lints.js` catches a broken file and the gate measures the ≥ 56 floor as an `<img>`; an SVG `<image>` is invisible to both. The apparatus itself (frame, lines, tiles, cells, marks) is pure SVG on the tokens.
5. **Frames: two shapes per kind in EN** (rule 1 demands ≥ 2; the design's §4 table gives one). Added: neg "{pic} does not belong to {name}." · pos "{pic} belongs to {name}." · either "Either {pic} or {pic} belongs to {name}." · holderNot "{name} is not the child with {pic}." · cross "Whoever has {pic} also has {pic2}." · crossNot "Whoever has {pic} does not have {pic2}.". The EN block is the panels' SOURCE TO AUDIT.
6. **Validator rule 1 "starts with a capital or {pic}"** is implemented as "starts with a capital, {pic}, {name} or {nameAde}" (a name is always capitalised; the design's own frames start with {name}); the digit check ignores slot names (`{pic2}`).
7. **`answer:'box'` is REFUSED, not built** (the design's draw-or-write data fallback). A panel that refuses circling gets a refusal at build, not a silent switch; building the box variant is a small Phase-2 add if any panel asks.
8. **`SETS.fan`** (the six wave themes) lives in the data module beside the allowlists so the gate renders every fan theme without a wave file.
9. **The theme's pictures never read `SETS` at render for the sibling faces' `colors`** — the base ignores `colors`; F4 reads it.
10. **`clueRow` / `answerBank` only** are exported (the design also names `pictureClue`, `glyphChip`, `lGrid`): face components, Phase 2 (the G1-309 / G1-310 precedent of not exporting dead names).

## Gate `qa/verify-b3-logic-puzzles.js`

Own ground truth (an independent in-page brute-force solver + propagation over the stamps; reads the bank + `SETS` directly; runs `validateBank`). **A** bank (rules 1-7; `strings['G2-319'] === spec.i18n.en`) · **C** real-pipeline renders: d1/d2/d3 on pets, d2 on the other 5 fan themes, `animals` + `null` refused, LONG chrome (733) × d1-3, WORST 3-line-instruction chrome (710) × d1-3, the 4-line fi title (700) × d1-3, the 4-line title + 3-line instruction (677) × d2-3 asserted and × d1 MEASURED + REPORTED, a seed sweep × d1-3; per render: lints clean, verify empty, the audit (solver / necessity / propagation / identity / disjointness / allowlist / confusable / kinds / counts / quotas / name literal / picture src / empty cells / unmarked strip in column order), floors measured (cells ≥ cfg ≥ 36, header 56, inline 36, strip 36, tile ≤ 104, name font ≥ 22, badge ≥ 26, rows ≤ 66), every band above the footer and ≤ 675, markKey present without ground truth, non-vacuity (0 cells = FAIL), chrome-probe vacuity (a probe that fails to wrap to its line count FAILS); sweep: no identity, no two seeds identical, every configured kind appears, no name / picture repeat on a page · **D** poisons.

Quick run (`--quick`, 6 seeds):
```
PASS (3779 assertions, 36/36 poisons killed)
```
Full run (20 seeds):
```
PASS (8345 assertions, 36/36 poisons killed)
```
(sweep: d1 20/20, d2 20/20, d3 20/20 distinct pages; kinds seen d1 neg/pos, d2 neg, d3 neg/holderNot.)

Poisons killed (36/36; the correct EN bank + d2 page is the control): **P1** A¬X, B¬Y, C¬Z (2 solutions) · **P2** A¬X with A has X (0 solutions) · **P3** a `{noun}` slot · **P4a** a printed ✓ in a cell · **P4b** a ring on an answer chip · **P5** a 4-clue 3×3 with a redundant clue · **P7** hamster + mouse in one case (confusable) · **P7b** fish + goldfish (goldfish off the allowlist) · **P9** fi "{name} ei ole {pic}" (nominative where the adessive is required; synthetic fi block) · **P10** the same name in both cases · **P11** es "El niño que tiene {pic} no es {name}." (synthetic es block) · **P13** a `[data-lcs-cell]` with a child · **P14** an answer chip carrying `data-lcs-answer` · **P15** a d1 case with two `pos` clues (maxPos 1) · the identity solution · a hand-edited name tile · a clue picture that is not the stamped column · a 12-char name (tile > 104) · a theme without an allowlist · an allowlist of 5 (build + bank check) · an allowlist with a BW marker · a locale without a block (de) · an `either` kind on a bank that refuses it · cell 30 · `answer:'box'` · a `cross` kind on the base · a `mode` on the base · the flat stack (bands `min-height:340` under 3-line chrome → footer lint) · a blank page · a bare-head title · a "sudoku" title · a visible free claim · one frame only for a kind · an `either` frame with one `{pic}` · seven names.
**Deferred (need face code): P6 (F4 case-splitting), P8 (F5 5 true of 5), P12 (F3 `<p>` clue), P15b (F2 7th clue row)** — printed as DEFERRED, never counted.

## Renders (looked at, every one; all lints + verify clean)

`scripts/worksheet-gen/out/dev/`:
- **`G2-319-pets-d2-en.png`** (the deliverable) · `G2-319-pets-d1-en.png` · `G2-319-pets-d3-en.png`
- `G2-319-fruits-d2-en.png` · `G2-319-toys-d2-en.png` · `G2-319-vehicles-d2-en.png` · `G2-319-farm animals-d2-en.png` · `G2-319-zoo animals-d2-en.png` (+ `G2-319-contact.png`)
- gate renders under `out/dev/g2319-gate/`: `G2-319-d{1,2,3}-en-longchrome.png` (733), `-worstchrome` (710), `-fi4title` (700), `-combo677` (677), the seed sweep, the poison pages
- `G2-319-faces-probe-4x4.png`: the additive `size:4` knob through the base path (`{...d2, size:4, clues:[4,6], kinds:['neg','either'], headW:104, namePx:18, picPx:52}`): 8 names, no strip, 4 + 4 clues, stack 676, lints + verify clean. Note for F2: at 36 px inline pictures the second `either` shape ("Either [pic] or [pic] belongs to Tom.") wraps to two lines in the 277 column (the design measured one line at 32 px) — 4 × 62.6 + 12 = 262 ≤ 304 still fits; F2's `maxHolderNot:2` reasoning applies to `either` too.
- picture contact sheets `G2-319-pictures-{pets,fruits,toys,vehicles,farm_animals,zoo_animals,colors}.png`

Fixes made from looking: the ✓ / ✗ marks were drawn from their top-left instead of their centre (the markKey chips showed the tick low-right) → `mark(x, y)` = the centre; a picture followed by a full stop rendered "[pic] ." → no right margin before punctuation; `data-lcs-clues` (the clue-column stamp) collided with the ground-truth attribute of the same name → the column is `data-lcs-cluecol`.

## Chrome measurements (real pipeline, A4 and Letter identical)

| chrome | title / instruction | body | d1 692 | d2/d3 668 |
|---|---|---|---|---|
| the shipped en strings | 2-line / 2-line | 766 | fits | fits |
| 3-line en title + 148-char instruction | 99 / 46 | **733** | fits | fits |
| 3-line de title + 3-line fi instruction | 99 / 69 | **710** | fits | fits |
| 4-line fi title (68 chars) + 2-line instruction | 132 / 46 | **700** | fits (slack 8) | fits |
| 4-line fi title + 3-line fi instruction | 132 / 69 | **677** | **overflows 15 px** (footer lint fires; the strip of case 2 reaches 936 vs the band at 921) | fits (slack 9) |

The 677 combination is the product of two individually-legal worst cases in one locale (fi). d1 is the only level that does not clear it; d2 (the shipping level) and d3 do. Options for the fi panel / reviewer: keep the fi title ≤ 3 lines (every 3-line title clears 710 at d1), or drop d1's cell to 60 (= d2 geometry, stack 668). Recorded, not silently changed. No 150-char logic-themed fi instruction reached three lines in 12 attempts (`g2319-chrome5..7.js`); the gate's 3-line instruction probe is the batch's proven G1-310 string, guarded by a vacuity assertion.

## `node i18n/build-en.js`

`build-en: 498 types -> strings.en.json (title lint clean)` — "Logic Grid Puzzles: Three Clues, One Answer" is unique in the G2 band; `strings.en.json` restored with `git checkout --`. `tools/b3-baseline.js --check` NOT run (nothing shared was touched: `git status` lists only the new type-scoped files).

## Open items for the faces / panels

1. **fi head vs the worksheet-word regex.** The batch validators (`tools/validate-b2-draft.js` / `validate-b2var-draft.js`) ban `tehtäv` in a title; the design's fi head "Päättelytehtävät" and F0 title "Päättelytehtävät: kolme vihjettä, yksi vastaus" contain it. `validateBank` here uses the narrower `tehtäväpaperi|tehtävämoniste` so the design's fi copy passes; whoever writes `tools/validate-b3-draft.js` must rule which regex the fi panel authors against (or the fi panel picks a `-tehtävät`-free head).
2. **`colors` in mono print** (above): F4's second attribute is invisible in greyscale; a design ruling is needed before F4 is built.
3. **The 677 chrome at d1** (above): fi title ≤ 3 lines, or d1 cell 60.
4. **F2 at 36 px inline pictures**: the second `either` shape wraps in the 277 column; budget F2's rows as 62.6 two-liners (4 × 62.6 + 12 = 262 ≤ 304) or cap `either` to the first shape there.
5. **Names ×11**: the bank's `names` are the 8 of `data/b2/sentences.js names[loc]`; the fi panel authors `ade` + `gen` literals (Ainolla / Ainon …, vowel harmony); every locale's longest name must measure ≤ 104 at Baloo 2 700 22 in the real render (verify + the gate assert it; it `Francesco` 100.3 was the design's tightest).
6. **`validateBank` refusal semantics**: an EMPTY frame array is a recorded refusal of that kind (F1 needs `either`, F4 `cross`, F5 `truth`), a missing key is a fault; `truth` refuses whole or not at all.
7. **`tools/apply-b3-locale.js` / `validate-b3-draft.js`** are the batch's shared tools (absent); the logic-puzzles block of the validator is `validateBank` here (exported, poison-tested both directions).
8. **Hub registration** (§7): `apps['logic-puzzles']` + `axes['exercise-type']['logic-puzzles']` slug/name ×11 are the batch's registration step, not this build; `validateBank` already refuses a head equal to the `visual-logic` / `sudoku` hub name of its locale when the taxonomy is on disk.
9. **`assetClass:'icon-placement'`** as designed (a wave filter); `minNouns:6` is the coarse cache pre-filter, the allowlist is the gate.
