# G3-377 `division-with-remainder` : editor-critic record (2026-09-14)

Inputs: `_work/G3-377-pedagogy.md` (P) + `_work/G3-377-design.md` (D). Output: `../G3-377-division-with-remainder.md`. Doctrine applied: measured buildability beats preference; the brief's rules beat both. (m) = re-measured here; scratch `g3377-critic-measure.js` (puppeteer, the shell's woff2 via `page/shell.js` FONTS_CSS; node over `lib/b2-common.js` + `cache/manifest.json` + `topics-taxonomy.json`).

## 1 Contradictions + resolutions

| # | P said | D said | ruling | why |
|---|---|---|---|---|
| 1 | base = child RINGS groups of d on a rows-of-ten pile | base = pile PRE-SORTED into q boxes + a leftover zone; child writes | **P** | D's picture prints q (count the boxes) and r (count the zone): the brief's "answer never printed" in picture form, and the child's act collapses to reading. P's d1 "rings printed" scaffold is also dropped: d1 = smaller numbers on the same geometry (no scaffold code). |
| 2 | F1 = partitive deal into d boxes + leftover home | F1 = scatter + circle groups | **P** | D's F1 is F0's own act on d3's pile (a scaffold change, brief rule 1/2). Quotative vs partitive is a real distinction the child enacts differently and sv/no/de/it/pt NAME; two faces. |
| 3 | F5 = number-line hops back, child-drawn, stop above zero | F5 = "up to 35" = the d3 config + one exact card; number line REJECTED ("540 px in a 302 card = 23 px ticks") | **P's move, re-budgeted** | A range is the `unitAxis` fan (brief rule 2, the task's own instruction); one exact card is F3 diluted. D's rejection assumed 2-column cards; F5 is 1-column. At 1x3 (`numberLine` 560 -> 612 x 70, m) the real constraint is the hand-drawn hop: `d * 560 / lineEnd >= 36` (the G23 floor), a composer rule. P's "hop >= 24 px" was an invented threshold; replaced by the measured floor. |
| 4 | F2 = 12 rows 2x6 (inner 80); "casita 70 fits" | F2 = 10 rows 2x5 (inner 105) | **D** | A casita is 88 tall (D's own `casitaFrame` h 88; P never drew its 70). 88 > 80. 10 items sit in G23 [8,16]. |
| 5 | F3 = 10 rows 2x5, exact 5 | F3 = 8 rows 2x4, exact 4 | **D** | casita 88 + 8 + pills ~42 = 138 fits 142 (2x4), not 105 (2x5). |
| 6 | F4 = 2x4, 8 items, worked line + pills + full rewrite line | F4 = 2x3, 6 items, worked line + pills + a free `.ws-blankbox` | **neither; merged** | P's stack fails for casita at 2x4 (88 + 8 + 88); D's blank line is unverified (brief: one solution unless open-ended) and 6 < 8. Ruling: 2x4, 8 items, worked line (`shown`) + `ghost` boxes under the shown q / r (casita 80 + 8 + 44 = 132). Pills only at d3 (`clean:1`): at d2 every item is wrong, so a verdict is furniture. |
| 7 | F0 pile 1x4, notation 219 wide, "214 fits one line" | base 2x2, notation zone 302 x 88, widths *est.* 256 | **1x4 + a 2-line zone** | Measured (m): one line = en 203 / de 198 / it 196 / sv 212 / nl 213 / fi 219 / fr 228 (border-box boxes 44). Only en/de/it fit 219; P's 214 was true for en/de only; D's 256 was 20-30 high. Wrapping at `=` (line 1 = 79, line 2 <= 176) keeps ONE geometry in all 11. Zone height 88 = 2-line inline = casita: constant across locales as the task requires. |
| 8 | F1 `equalGroups({op:'share', iconPx:34, w:376})` + a leftover box "after the slots" | `equalGroups` NOT reused (D) | **D, plus a NEW `dealBoxes`** | (m) `equalGroups` (`components-b2.js:185-204`) emits its own slot row; a leftover home cannot join that row without editing a NEVER-edit file. 34 px is below the G23 floor 36. Strip = `iconRows` at 36 (396 x 76). |
| 9 | F2..F5 themeless (`theme:''`) | every face themed | **P** | A picture on a numbers row reads as a clue; 50 themes x one numbers page is churn; K-317 precedent. |
| 10 | F2 d2 divisors 2..5, n <= 50 | F2 divisors 2..9, n <= 50 | **unit + `qMax:10`** | Divisors come from the unit (one fan mechanism, README). A flat n <= 50 ships `49 ÷ 2 = 24 R1` (two-digit quotient = short division, Grade 4 / kort division): `qMax:10` keeps the tables. Copy says "inside the times tables", not "to 50". |
| 11 | stage default padding (130 tall) | stage inline `padding:4px 0` | **`padding:0`** (G1-310 precedent) | the stage = the card's inner box (647 x 142); every stack is stated against it. |
| 12 | `casitaFrame` in `primitives/division-box.js` (P) | in `components-b3.js` (D) | **D** | one file for the whole notation layer; the task names `divisionLine` + `casitaFrame` together. |
| 13 | F3 pills = `ws-pill` chips 20 px, own markup | `verdictPills` NEW | **reuse `pillChoice`** | (m) `components-b2.js pillChoice({items:[{key,label}], fontPx})` stamps `data-lcs-pill`; nothing new is needed. |
| 14 | de level `2-klasse` | de = `LEVEL_KEYS.de.G3` = `3-klasse` | **`2-klasse`, panel may key 3** | the demand head is "Klasse 2" (panel findings) + LehrplanPLUS; both keys are legal for the hub gate. |
| 15 | `coordinate.mode: null` on the base (P) | not stated | **`'base'`** | README ruling (`coordKey` = `type|mode|theme`, no level). |
| 16 | strand row cited as `strand-names.ts` NBT (P) / `:86` (D) | | both exist | (m) `'Number & Operations in Base Ten'` `:86-98` and `'Number and Operations in Base Ten'` `:100-112`, 11/11 each; the file cites `:100-112` (the G1-310 precedent). |

Face set shipped: F0 ring (quotative) · F1 share (partitive) · F2 practice · F3 exact · F4 error · F5 line. All CODE faces (`mode` knob). Ids `G3-378+ TBD by the emitter`.

## 2 Claims removed as unverified or false

- P measurement 2: "`G3-369`, `G1-243` also render `÷` in Swedish". FALSE (m): `G3-369:22-23` has `DIV_SLASH = {sv}` and renders `/`; `G1-243:9` carries `÷` in a comment only. The live defect is `array-tasks.js:141/151/159` (share-bins, group-rings, fact-family) + `number-line-tasks.js:95` (repeated-sub): G2-216 / G2-217 / G3-309 / G3-310 / G3-311 (and any other `makeArrayType` / `makeNumberLineTaskType` consumer with a division line). README open item 11 lists G3-369 wrongly.
- D: notation widths "*est.* en 256, fr 236" and "`divisionLine` wraps past 296". Replaced by (m) 196-228 single line.
- P: F0 notation "= 214 with boxes 44 x 44 … gaps 6" fits 219. True only for en / de / it (m); nl / sv / fi / fr overflow a single line.
- P: "casita 120 x 96" (F0) and "casita 2 lines + bracket = 70" (F2). No drawing behind either number; D's `casitaFrame` 200 x 88 is the only specified geometry and is adopted.
- P: F1 `iconPx:34`. Below the G23 floor 36 (`_tokens.js:70`, m).
- P: F5 verify "hop width >= 24 px". Invented; the floor is 36.
- D: "the brief's 6 or 8 cards, divisors 2-5, n <= 29" refused on numbers. The brief (`_PANEL-FINDINGS.md` 14) states no card count; D refuted a premise it had authored. Dropped.
- D: F5 "up to 35 = a different teaching move because of `allowExact:1`". A relabelled level with one F3 item; rule 2 says so.
- D: number line rejected on "23 px ticks in a 302 card". Wrong geometry (1-col cards); see 1.3.
- P: "F3 = 2x5 because pills 40 + 8 + 40 = 88 > 80". The binding constraint was the casita, not the pills; the conclusion (not 2x6) stands, the size (2x5) does not.
- Both: "`.ws-pill` 20 px pills = 40 tall". *est.* 42 (padding 6 x 24 + border 2, `page.css:422`, m); the engineer measures.

## 3 Numbers re-measured (which won)

| number | P | D | measured (m) | in the file |
|---|---|---|---|---|
| 1x4 card / inner | 170 / 142 x 647 | (2x2) 354 / 326 x 302 | (722 - 42)/4 = 170; inner 142 x 647 | 170 / 142 x 647 |
| F0 pile at 36, rows of ten, gap 6 | 414 x 120 | pictures 40 in 95 cells | 10 x 36 + 54 = 414; 3 x 36 + 12 = 120 | 414 x 120 |
| notation single line (border-box 44 boxes) | 214 | 256 | en 203 · de 198 · it 196 · sv 212 · nl 213 · fi 219 · fr 228 | 2-line at F0/F1 (79 / <= 176); 1-line elsewhere |
| zone height | 96 (casita 120 x 96) | 88 | 2 x 40 + 8 = 88 = casita 88 | 88, every face, every locale |
| digit width Baloo 2 700 26 | 30 for "13" | 14.3 / digit | "88" = 26, "100" = 39 (13 / digit) | 13 / digit |
| words Nunito 800 18 | 36 | | rest 28.7 · jaa 24 · reste 36.7 · resto 37.7 · R 13 · r. 10.8 | quoted |
| F2 cards | 2x6 = 108 / 80 | 2x5 = 133 / 105 | (722 - 56)/5 = 133.2; inner 105 | 2x5, 10 items |
| F3 / F4 cards | 2x5 (F3), 2x4 (F4) | 2x4 (F3), 2x3 (F4) | 2x4 inner 142: casita 88 + 8 + 42 = 138; F4 80 + 8 + 44 = 132 | 2x4 both |
| F5 line | width 380 (W 432, H 70), 4 lines | rejected | `H = 14 + 56 = 70`, `W = width + 52`: 560 -> 612; 1x3 inner 203: 70 + 8 + 88 = 166 | 1x3, width 560 |
| F5 hop floor | 24 px | | 36 (G23 minElement) -> `d * 560 / lineEnd >= 36` | composer rule |
| theme pool | 47 of 50 >= 6 countable in every locale | 50 | 47; below: colors 3, emotions 0, post office 5 | 47 |
| `apps[key]` / slugs x11 | absent | absent | 0 hits; 94 `apps` keys; all 11 slugs free of `exercise-type` collisions | register |
| bare head free | 0 en/de/sv title+h1 hits | | en "remainder" 0 · de "mit Rest" 0 · sv "med rest" 0 | free |
| `iconScatter` d3 | n <= 24 at 34 | 23 at 40 in 302 x 196 | n = 30 in 414 x 120: 11 x 3 cells 37.6 x 40 | d3 at 36 |
| `equalGroups` share | rows of ten + `data-lcs-slot` | not reused | strip gap 4, slot `(w - (b-1)*10)/b`, own row; no leftover slot possible | not reused; `dealBoxes` NEW |

## 4 OPEN items

1. **LIVE `÷` DEFECT in Swedish, sibling types (README item 11, corrected).** `types/_shared/array-tasks.js:141` (share-bins), `:151` (group-rings), `:159` (fact-family, renders `÷` for any non-`*` op) and `types/_shared/number-line-tasks.js:95` (repeated-sub) hard-code `OP('÷')`, so the published sv decks of G2-216 / G2-217 / G3-309 / G3-310 / G3-311 print a historic MINUS. G3-369 is NOT affected (`DIV_SLASH`). Fix = the G3-369 pattern (`loc === 'sv' ? '/' : '÷'`; `build()` receives `locale`) as its own small commit + `--updates-manifest` republish of the affected sv decks; **count them from the DB on Hetzner first** (not countable from the PC). This type guards only itself (P3).
2. **en level key.** No `grade-4` key exists (`LEVEL_KEYS`, `LEVELS` map, hub gate); the file keys `grade-3` with honest 4.NBT.B.6 prose. Adding `grade-4` is a route-map + hub decision outside this type; operator rules.
3. **Casita on the critical path for es / pt** (it optional): `casitaFrame` must render before any es / pt copy claims a level; `boxStyle:'inline'` is a legal fallback the panels will likely reject.
4. **de band** (`2-klasse` vs `3-klasse`) and **it band** (seconda in riga vs terza in colonna + `casita`) are panel calls; both keys legal for `verify-hub-type-rows.js`; the §7 expected rows do not change.
5. **F1 vs G3-309 similarity** (*est.* 0.35, the pair to measure first): if the gate reads higher, F1 copy leads with the leftover home ("the box that gets nothing"), never with sharing.
6. **F0 rings across a row break.** Classroom norm, but the operator has not seen it; if the render is disliked, d2 -> `layout:'scatter'` (config only).
7. **F3 pill height** *est.* 42 (138 of 142 at 2x4 with casita): engineer measures on an es / pt render; if > 46, `fontPx:18`, never a smaller card count.
8. **Item floor.** F0 / F1 ship 4 items and F5 3 (< the G23 `items [8,16]`); `qa/lints.js` does not assert it (m) and the house precedents are G3-309 = 4, G3-310 = 3, G3-370 = 2. Recorded, not hidden.
9. **`unitAxis` not built** (README item 3); the exemplar `2-5` ships; `{U}` tokens in titles stay unresolved until then.
10. **`scripts/verify-hub-type-rows.js` absent** (README item 2); expected 66 rows for this key.
11. **F2 copy "inside the times tables"** vs the panels' demand phrase "bis 50 / hasta 50": the numbers reach 54 at d = 5 (`qMax:10`); a panel that wants "bis 50" must accept `qMax:9` at d = 5 or drop the ceiling phrase. Data, not code.
12. **fr parentheses** in `{n} = ({d} × {q}) + {r}`, no "comma before rest", fi "jaa" vs "j.", de "R" vs "Rest", pt `remWord` for the chave: one form each, panel-authored; the validator enforces one template per locale, not which.

## 5 Quality verdict (a critical third-grade maths teacher)

The six pages are six different things a child DOES with a remainder, in my own notation, with nothing on the page giving away the count; the ring page and the share page are the two divisions I actually teach, and the error page targets the one mistake every class makes.
I would want to see the fi and fr pages before I believed the notation zone, and I would watch a child draw hops on the number line before I trusted the 36 px floor.
Nothing here is padding, nothing is a story dressed as a face, and the Swedish `÷` is banned by a gate rather than by a note.
