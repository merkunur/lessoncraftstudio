# G1-308 `read-and-do` : editor-critic record (2026-09-13)

Inputs: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` §9, `README.md` cross-type rulings, `G1-307-opposites.md` + `G2-316-compound-words.md` (contract shape), `_work/G1-308-pedagogy.md`, `_work/G1-308-design.md`. Verified in the repo: `templates/components.js`, `components-b2.js`, `layouts/card-grid.js`, `page/page.css`, `page/shell.js`, `primitives/_tokens.js`, `types/g1/G1-242-read-and-color.js`, `types/_shared/position-words.js`, `lib/sentence-bank.js`, `lib/b2-common.js`, `data/b2/sentences.js`, `data/b2/word-classes.js`, `data/b2/calendar.js`, `data/b2/articles.js`, `data/word-problems/frames.js`, `qa/lints.js`, `enumerate.js`, `tools/gate-variation-distinct.js`, `REFERENCE TRANSLATIONS/lcs-grammar.js` (md5-identical to `frontend/public/worksheet-generators/js/lcs-grammar.js`), `frontend/config/topics-taxonomy.json`, `frontend/lib/seo/strand-names.ts`, `frontend/content/seo-landing/en.json`, `scripts/seo-landing/gen-b2var-landings.js`, `scripts/seo-landing/sv-themes.js`. Scratch scripts (type-scoped, scratchpad only): `g1308-measure.js` (Nunito 800 widths, pill widths, body), `g1308-body.js` (body under long chrome), `g1308-title.js` (title/instruction wrap thresholds).

## 1 Contradictions + resolutions

| # | pedagogy said | design said | ruling + why |
|---|---|---|---|
| 1 | 6 `.ws-lane` rows x 4 pictures each (per-row mini-strips), h 118, icons 64 | ONE shared 8-tile strip + 6-row list | **Design wins (measured).** Per-row: 118 - 24 padding/border = 90 inner; sentence 24 + gap 6 leaves 60 -> pictures 44-48 (the G1 floor, not a generous page) and no two-line reserve. Shared strip keeps 64 px pictures, a reserve on every line, and the collision the pedagogy feared is removed by the disjoint-targets rule. Every cue/verb/bank/verify rule of the pedagogy kept. |
| 2 | body 760; d2 stack 748 | body 760; d2 stack 758 (slack 2-5) | **Both wrong.** Measured body: 814 (1-line title + 1-line instruction), 781 (2-line title), **722** (3-line title >= 48 chars + 3-line instruction >= ~125 chars). Both are legal per the brief, so the stack budgets 722: rows `minmax(86px,1fr)` in a flex-grown grid, 140 + 12 + 556 = 708. The design's 758 would collide with the footer under a long de/fi title + instruction (`qa/lints.js:50-66`). Poison P12 added. |
| 3 | Nunito 800 17 px, one line <= 70 chars | 18 px, *est.* 9.6-9.9 px/char, 60 chars "borderline" at 581 | **Measured: 7.4-8.1 px/char at 18 px** (17 px: 7.0-7.7). 70 chars fit one line in 585; the 96-char cap wraps to two at most. 18 px kept; the two-line reserve kept as reserve, not as the normal case. Text column 585 (design said 581), 519 with the write box (design said 525). |
| 4 | sentence font 17 at d2 | 18 | 18 (measured to fit). |
| 5 | F2 = 6 rows x 5 pictures | F2 = 5 rows of 114 | 5 rows `minmax(106,1fr)` (714 <= 722). Two-step sentences need the reserve more than a 6th row. |
| 6 | F3 ordinal k 2..4 | F3 `ordMax:6` | k 2..4 at d2 (a noun 6x on an 8-strip leaves two other tiles), 2..5 at d3. |
| 7 | `fillFrame` (`sentence-bank.js:20`) fills the frames | same | **Neither works.** `SLOT_RE = /\{(name\|n\|noun\|color)\}/g` (`lib/sentence-bank.js:16`) is closed to four names; `{obj}` passes through untouched and the `/\{/` validator would fire on every page. New `lib/b3-instructions.js fillSlots` with an explicit slot list. |
| 8 | bank carries `rendered[]` (every sentence written out by apply) | same | Dropped: two-noun cues (`line`, `between`) are N² per verb (~20k+ strings per locale). Sentences are filled at render; the node gate re-fills from the same bank + `fillSlots`, and the validator samples 500 filled sentences per (locale, theme, face). |
| 9 | de weak nouns "via `DE_DATIVE_SG` (41) else excluded from dative cues" | same | **Table is a cross-check, not a source.** Its 41 keys are vocab keys (`elephant lion bear …`); on the fan themes it covers animals 3, zoo 7, farm 1 (`Ochse`), fruits/vehicles/toys 0. A weak noun absent from it (`rabbit` = `Hase`, `dem Hasen`) cannot be checked by code, so `dat` is a reviewed panel literal for EVERY noun; the validator asserts equality only where the key is in the table. Poison P3 rewritten to a table noun (`elephant`). |
| 10 | da "does not need definite forms" | da `all`/`line`/`mark` want `def` | **Pedagogy's da row is wrong for four cues.** Danish `unique` is "hunden", `all` "æblerne", `line` "fra hunden", `mark` "ved hunden"; only ordinals are def-free ("den anden hund", no double definiteness). da joins sv/no: F1 only until `def` exists. |
| 11 | F4 chips = two `.ws-pill` 44 high | chip column 138 px | **138 is too narrow.** Measured pairs at Baloo 2 700 20 / padding 6 18: pt `verdadeiro` 142 + `falso` 87 + gap 10 = 239; es 233; da 222; nl 203. Column 250; statement column 363; F4 statement cap 80 chars. |
| 12 | F5 `drawBox` 240x96 | 300x150 | 300x140 (card inner 203 at the 722 floor: 49 + 8 + 140 = 197). |
| 13 | gap strip-to-list 14 | 14 | 12 (the 722 budget). |
| 14 | F4 head dead in en/nl/pt: "kept, weaker query" | same | Kept; the design now SAYS which head it takes there: the type's own head (en "following directions", nl "begrijpend lezen groep 3", pt "leia e faça") with "true or false" as the only distinguishing element. |
| 15 | `answerBox` = dashed coral | same | `.ws-answerbox` is dashed `#C8BFAE` (grid), Baloo 26 (`page.css:220-230`); `.ws-blankbox` is the dashed-coral one (`:445`). The brief's "dashed coral answerBox" is the brief's error; the design cites the measured CSS. |

## 2 Claims removed as unverified or wrong

- "`fillFrame` (`sentence-bank.js:20`): substitution only" as a reusable primitive for this type (its slot set excludes every slot this type uses).
- "body ≈ 760" as a design floor (measured 722 under legal chrome).
- The design's px/char estimate (9.6-9.9) and its "wrap is the reserve for a 60-char de line" framing.
- Pedagogy: "da does not need definite forms" (true for ordinals only).
- Pedagogy: "F4 in en/nl/pt: drop from those waves if the demand ledger rules so" (a ledger ruling is not in either file; the face ships, recorded as weaker).
- Pedagogy: "`FI_GENITIVES` 1,164" agrees with my key count (m); CLAUDE.md §14.3b says 1,166 (a different counting rule); the design cites the measured 1,164 with the line span `:599-1766`.
- Design: "F1 8 marks over 8 tiles, or 5 + 1" kept; "the pedagogy file feared two instructions on one picture" kept as the reason for the disjointness rule.
- The pedagogy's per-locale countable-noun table cells were re-measured and all agree (en 33/28/29/25/31/24 etc.); nothing struck.

## 3 Numbers re-measured (m)

| item | pedagogy | design | measured |
|---|---|---|---|
| `FI_GENITIVES` line / keys | `:599`, 1,164 | `:599` | **`:599-1766`, 1,164** (both copies of `lcs-grammar.js`, md5 `2abebd34…`) |
| `DE_DATIVE_SG` line / keys | `:1777`, 41 | `:1777`, 41 | **`:1777-1819`, 41**; `DE_DATIVE_PL` `:1827` (8) |
| fi partitive keys / per fan theme | 161; animals 37/37 fruits 28/28 toys 25/25 vehicles 28/28 zoo 27/34 farm 17/25 | same | **161; identical**; clothing 0/28, house 1/76, classroom 0/31, pets 9/19, vegetables 0/20, weather 0/11; `word-problems/frames.js fi.nounForms` = 65 keys, all already in the 161 |
| countable nouns, min over 11 (fan themes) | 33 / 20 / 20 / 17 / 29 / 20 | same | **same** (`entriesFor(t,loc).filter(countable)`; floors: animals en/de 33, fruits sv 20, vehicles de/it 20, toys de 17, zoo da/no 29, farm de 20) |
| sentences.js | 19-23 frames, `color` 3-5 + `simple` 15-19, names 8 | same | **same**; fr `endSpace:true`, de `nounCase:'keep'` |
| word-classes verbs | 28-32, no instruction verb | - | **28-32**; matches for circle/cross/underline/connect/mark = 0 in all 11 (hits are `draw/springen/dra/tegne`) |
| ordinal words | none in any bank | - | **none** (`calendar.js` keys `weekStart ordinalStyle dayNames dayAbbr dayPlural monthNames frames`) |
| `.ws-lane` / `.ws-pill` / `.ws-blankbox` / `.ws-icon` / `.ws-answerbox` | `:401`, `:422` | `:401`, `:422` | **`:401 / :422 / :445 / :178 / :220`** |
| `answerBox` / `cardGrid` / `countBadge` / `wordBank` | `components.js:105` | same | **`:105`; `card-grid.js:7`; `components-b2.js:243 / :210`** |
| density G1 | `_tokens.js:69` 44/26/[6,12] | same | **same** |
| `.ws-lane` inner width with padding 10 12 | - | 647 | **647** |
| text column / with write box | - | 581 / 525 | **585 / 519** |
| px/char Nunito 800 | 17 px one line <= 70 | 18 px 9.6-9.9 | **18 px 7.4-8.1; 17 px 7.0-7.7** |
| body height | 760 | 760 | **814 / 781 / 722** (title wraps at > ~24 chars, 3 lines at >= 48; instruction 2 lines at ~80, 3 at ~125) |
| F4 pill widths (Baloo 700 20) | - | 64 wide | **en 81/88 · de 103/98 · es 136/87 · pt 142/87 · fr 76/84 · it 81/87 · nl 86/107 · sv 81/97 · da 93/101/111 · fi 90/92 (totta/tarua), 94/98 (oikein/väärin)**; h 44 |
| fr / it vowel-initial share (fan themes) | UNKNOWN | UNKNOWN | **fr 8/37 · 3/26 · 5/28 · 2/25 · 6/31 · 5/25; it 8/34 · 3/23 · 5/20 · 5/20 · 8/30 · 6/24** |
| de weak nouns in `DE_DATIVE_SG` (fan themes) | - | - | **animals 3 (Elefant Leopard Waschbär) · zoo 7 · farm 1 (Ochse) · others 0** |
| taxonomy | `read-and-do` absent; `read-and-color` shape | same | **absent; `apps['read-and-color'] = {letters, 6-8, read-and-color}`**; `read-and-color` names carry the colour verb in all 11 |
| `LEVEL_KEYS` | `gen-b2var-landings.js:112-124` | same | **`:112-124`**, no = `2-trinn` |
| strand row | "Reading foundational skills" (name only) | - | **`strand-names.ts:113 'Reading: Foundational Skills'`, all 11 present**; `'Language'` (`:170`) lacks da/no |
| `gate-variation-distinct.js` inputs | - | - | **`waves/wave-b2-en.json` + `gen-b2var-specs.js ROWS` (`:31-36`)** |
| `verify-hub-type-rows.js`, `components-b3.js`, `apply-b3-locale.js`, `validate-b3-draft.js`, `register-b3-en-content.js` | absent | absent | **all absent**; `apply-b2-locale.js` / `validate-b2-draft.js` / `register-b2-taxonomy.js` exist |
| `sv-themes.js plDef` | engineer to check | - | **53 `plDef` literals = 50 THEME nouns (flaggor, accessoarer …), zero object nouns** |
| landing coordinate shape | - | - | **`{type, mode, theme, level}`**; 2,392 of 4,038 en landings carry a string `mode` (e.g. `cardinal-arrows`); `read-and-color-1st-grade` carries `theme:'fruits_bw'` |
| `enumerate.js` theme gates | - | - | **`excludeBw` `:72`, `minNouns` `:79`; `isBwTheme = /\bbw\b/i` on the cache dir name** |
| `qa/lints.js` | - | font floor 9 | **content selector `:32`, overflow `:37-45`, footer collision `:50-66`, font floor `:86`** |

## 4 OPEN items

**Engineer**
1. Write `lib/b3-instructions.js fillSlots` + the three `components-b3.js` parts (`pictureStrip`, `instructionList`, `truthChips`, `drawBox`); poison the filler with an unknown slot and an unfilled slot.
2. Render de + fi d2 with a 3-line title and a 150-char instruction and confirm 708 <= body; confirm rows grow (not the strip) when the body is 814.
3. Print one d2 page on mono laser + colour inkjet, mark all six verbs in HB, read at arm's length; if the X on the tile fails, flip `crossZone` to `band`.
4. Measure the 3-gram Jaccard of every face pair and every row of the non-cannibalisation table once copy exists (all values *est.*).
5. Confirm `fixed.between` with de `dat` / fi `gen` / Nordic `def` endpoints stays <= 96 chars in the longest fan-theme noun pair per locale (the validator's 500-sample rule catches it, but the panel wants to know before authoring).

**Panels**
6. sv / da / no: author `def` + `defPl` for the six fan themes (~150 literals each), every literal read (`bana`/`banan` class); decide whether F1's indefinite frames ("Ringa in en katt") are acceptable classroom language before `def` lands; decide whether F5 ("Rita två katter i rutan") may ship early.
7. de: `dat` for every fan-theme noun (the table covers 11 of ~150); `ankreuzen` vs `durchstreichen` glyph confirmation.
8. fr / it: store the elided definite literal (`l'éléphant`, `l'elefante`) or accept the measured drop of vowel-initial nouns from sg cues.
9. fi: confirm nominative total objects in every imperative frame ("Ympyröi toinen kissa."), the partitive after `montako`, and the genitive `välissä` frame; `[NSR-FLAG][fi]`.
10. All 11: the `mark` glyph (tick vs X), the `and` literal for F2, `truth` chip words and >= 8 statement frames, >= 4 draw frames; audit the EN source.
11. F1-at-K in en / sv / da / nl: a per-locale band call (design keeps G1 x11).

**Pipeline**
12. `tools/gate-variation-distinct.js` needs a b3 wave file + ROWS entry before it can see this type (it reads `wave-b2-en.json` + `gen-b2var-specs.js`).
13. `scripts/verify-hub-type-rows.js`: write + poison-test (short locale, wrong `coordinate.type`) before `apps['read-and-do']` lands; expected rows 51 on the design (sv/da/no = 1), ceiling 66.
14. K-320 `ordinal-numbers` design is unwritten: align so no K-320 face becomes "circle the second dog in a mixed row".
15. Strand: the type uses the `'Reading: Foundational Skills'` row (complete x11); nothing to add to `strand-names.ts` for this type.
16. `seo.words.free_printable` meta lead: the standing "tier truth" item, not this type's.

## 5 Quality verdict (a critical first-grade teacher)

The page is honest work: one row of pictures, six real sentences, six different things to do with a pencil, and the answer is never printed. Two things would make me put it back in the tray: an instruction I cannot fit on one calm line in German (the 96-char cap and the measured two-line reserve now stop that), and a Swedish sentence that says "a cat" where every teacher writes "the cat" (which is why sv/da/no wait for their definite forms instead of shipping a stilted page). If the X on the white tile reads on a grey photocopy, the base page is one I would hand out on a Monday.
