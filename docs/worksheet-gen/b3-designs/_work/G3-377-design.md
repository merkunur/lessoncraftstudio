# G3-377 `division-with-remainder` : DESIGN (Designer A composition + Designer B child-read, 2026-09-14)

Every file, class, option and px below was read in the repo (`_SUBSTRATE.md`, `page/page.css`, `templates/components*.js`, `types/_shared/{array-tasks,column-arithmetic,number-line-tasks}.js`, `types/g3/G3-369`, `qa/lints.js`). Renders looked at: `out/batchQ/G3-309-animals-d2-en.png`, `out/batchQ/G3-302-fruits-d2-en.png` (its 29-icon ring pile OVERFLOWS the card: the defect this design budgets against), `out/b2-sweep/G3-370-fruits-d2-en.png`, `out/dev/G1-213-animals-d2-en.png`. *est.* = engineer measures.

## 1 Page concept (base)

"Look at the boxes, count the leftovers, write the division in OUR notation." Four generous cards. Each holds a picture pile already sorted into q equal white boxes (teal-soft rim) of d themed pictures plus a coral dashed LEFTOVER ZONE with the r pictures that did not fit. Under the pile: the locale's notation with dividend and divisor printed and two dashed coral boxes for quotient and remainder (en `23 ÷ 4 = [ ] R [ ]`, de `23 : 4 = [ ] R [ ]`, fr `23 = 4 × [ ] + [ ]`, es/pt/it the casita/chave/in-colonna frame). The picture is the scaffold, the notation is the teaching point; q and r numerals are never printed. Distinct from G3-309 (exact sharing, `÷` only) and G3-310 (hops to zero, exact).

Identity: `G3-377` / key `division-with-remainder` / band G3 x11 (faces `G3-378+ TBD by the emitter`); `default_subject:'math'`, `default_age_range:'8-10'`, `assetClass:'icon-placement'`, `themeAxis:{applicable:true, minNouns:4, excludeBw:true}` (the `array-tasks` shape); nouns via `entriesFor(theme, loc)` filtered `countable` (a pile is counted, never named: no agreement anywhere). CCSS honesty: the en landing names **4.NBT.B.6** (Grade 4 in the US, panel finding) under the `grade-3` level key with a one-sentence caveat; strand row `'Number & Operations in Base Ten'` (`frontend/lib/seo/strand-names.ts:86`, all 11 present). Key ABSENT from `topics-taxonomy.json` (measured); register per README step 2.

## 2 Layout, d2, 722 body

**The count that decides everything.** `.ws-page` inner 675 (`page.css:25`), `cardGrid` gap 14, `.ws-card` padding 12 + border 2 (`page.css:126-137`). Picture floor G3 = 36 (`_tokens.js density.G23`). A box of 5 pictures at 36 (3+2 rows, gap 3, pad 4, border 2) is 126 x 87; six cells (5 boxes + leftover) need 258 x 273 in two columns or 390 x 180 in three. A 2x3 card grid gives an inner 302 x 203 at 722: neither fits, and a casita frame (88 tall, section 5) never fits beside 273. A 2x2 grid gives 302 x 326: 273 + 6 + 88 = 367 still fails. **So the brief's "6 or 8 cards, divisors 2-5, n <= 29" is refused on the numbers**: the base ships **4 cards, divisors 2-4, n <= 23, q <= 5, r >= 1, pictures 40 px**, the largest configuration in which every locale's notation fits under a picture that agrees with it (section 8 keeps the n <= 29 range as the wide alternative).

```
+------------- card 330 x 354 (inner 302 x 326) -------------+  +---- card 2 ----+
|[1]  +--- box 95 ---+ +--- box 95 ---+ +--- box 95 ---+     |  |                |
|     | (40)(40)      | | (40)(40)     | | (40)(40)     |     |  |                |
|     | (40)(40)      | | (40)(40)     | | (40)(40)     |     |  |   same shape   |
|     +--------------+ +--------------+ +--------------+     |  |                |
|     +--- box 95 ---+ +--- box 95 ---+ +- LEFTOVER ---+     |  |                |
|     | (40)(40)      | | (40)(40)     | : (40)(40)     :     |  |                |
|     | (40)(40)      | | (40)(40)     | : (40)         :     |  |                |
|     +--------------+ +--------------+ +- - - - - - - +     |  |                |
|                 cell grid 297 x 196                         |  |                |
|         23  :  4  =  [q 44x40]  R  [r 44x40]     zone 88   |  |                |
+------------------------------------------------------------+  +----------------+
   row 2: cards 3 and 4 identical.  2 cols x 2 rows, gap 14.
```
- **Cards.** `cardGrid({cards, cols:2, rows:2})` (`templates/layouts/card-grid.js:7`): card (722 - 14) / 2 = **354** -> inner **302 x 326** (372 at 814; rows `minmax(0,1fr)` absorb slack). Stage = `.ws-card-stage` inline `flex-direction:column;gap:6px;padding:4px 0` (the `array-tasks` share-bins idiom, `:137`).
- **Cell grid** = NEW `remainderGroups` (section 5): 6 cells **95 x 95** in 3 cols x 2 rows, gap 6 -> **297 x 196** (<= 302). A cell = `.ws-groupbox` (`page.css:439`, white, teal-soft rim, r 10) with inline `padding:4px;gap:3px;border-width:2px;width:95px;height:95px`; pictures `.ws-icon` **40** (>= 36) in a 2x2 flow, `data-lcs-g="1"`. Boxes fill cells 1..q; the **leftover zone** = cell q+1 as `.ws-groupbox--empty` (`page.css:443`, dashed coral 2.5) holding r pictures; later cells are NOT rendered (grid geometry fixed, so boxes are one size on every card). Boxes carry no numeral (a printed "4" restates d).
- **Notation zone** 302 x **88** on every card in every locale (the tallest form, casita, sets it; inline forms centre in it). Inline: numerals Baloo 2 700 26 ink (`data-lcs-num`), operator Baloo 2 700 24 teal, `=` inkSoft, remainder word Nunito 800 18 ink, two answer boxes **44 x 40** white with **dashed coral** 2.5 (`remBox`, section 5; `.ws-answerbox` alone dashes grid `#C8BFAE`, `page.css:225`). Widths *est.* (Baloo digit ~14.3 at 26): en 256, "rest" locales 256, fi ", jää" 258, fr product 236, all <= 302 on one line; `divisionLine` wraps at `=` into two 40-px lines past 296 (88 = 40 + 8 + 40).
- **Stack at 722:** 196 + 6 + 88 = 290 <= 326 (slack 36; 82 at 814). Palette: cream, creamDeep, white, teal, tealSoft, coral, ink, inkSoft, grid. Smallest text 16 (it "r" label) vs the 9 px lint.
- **d1** = same geometry, `{divisors:[2,3], nMax:13}` (a 3-picture box is 2+1 in the same 95 cell). **d3** = wide layout `{cards:3, cols:1, rows:3, divisors:[2..6], nMax:35, allowExact:1, iconPx:36}`: card (722 - 28) / 3 = 231 -> inner 647 x 203; cell grid 3 cols x 2 rows of **126 x 87** (pictures 36, 3+3 / 3+2 flow) = 390 x 180 left; notation zone 241 x 203 right (casita 200 fits; inline stacks two lines). One card is exact (r = 0): the leftover zone is EMPTY and the child writes 0, d3 only.

## 3 Ladder (resolved config; guards key on `divisors`/`nMax`, never the level index)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| cards / cols / rows | 4 / 2 / 2 | 4 / 2 / 2 | 3 / 1 / 3 (wide) |
| divisors / nMax / qMax | [2,3] / 13 / 5 | [2,3,4] / 23 / 5 | [2..6] / 35 / 5 |
| r | 1..d-1 | 1..d-1 | 0..d-1, exactly 1 card r = 0 |
| iconPx / cell | 40 / 95 | 40 / 95 | 36 / 126 x 87 |
| per page | 4 distinct (n,d); r not constant | same + one r = d-1 and one r = 1 | same + one exact |

Composer: pick d, q in 1..5 (q >= 2 on three of four cards), r, n = q d + r; reject n > nMax, duplicate (n,d), four equal r or four equal q; 200 tries then throw (refusal, never padding). Numbers are locale-neutral; only the template changes.

## 4 Answer-hiding + uniqueness

Card stage stamps `data-lcs-n data-lcs-d data-lcs-q data-lcs-r data-lcs-face` (face only when declared); boxes `[data-lcs-group="k"]`, leftover `[data-lcs-leftover]`, pictures `data-lcs-g`; printed numerals `data-lcs-num`; answer boxes `remBox[data-lcs-answer][data-lcs-role="q|r"]` with EMPTY text. `verify(page)`: per card re-derive `q = floor(n/d)`, `r = n - q d`, assert stamps equal; `1 <= r < d` (`0 <= r` where `allowExact`); `[data-lcs-group]` count === q, each holding exactly d `img`; `[data-lcs-leftover] img` === r (picture and numbers AGREE by construction, the G3-302 lesson); `data-lcs-num` are n and d only; the two `remBox` answers are q and r with empty `textContent`; no numeral in any box; `img.complete && naturalWidth > 0`; no B&W marker in any path (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`); (n,d) distinct across cards. **Scatter face** stamps only `data-lcs-n data-lcs-d` and NO `[data-lcs-group]`: verify counts `img` === n and asserts no box exists. Node-side gate: every `[data-lcs-notation]` re-fills from `data/b3/division.js[loc].template` through `divisionLine`; poison: a hand-edited glyph FAILS.

## 5 Primitives + components: reused vs NEW

**Reused (exact).** `cardGrid({cards, cols, rows})` · `.ws-groupbox` / `.ws-groupbox--empty` (`page.css:439-443`) · `.ws-icon` · `.ws-pill` + `pillChoice({items, fontPx})` (`components-b2.js`, `data-lcs-pill`) · `iconScatter({theme, noun, n, w, h, iconPx, rng})` (`components.js:43`: jittered shuffled grid cells, no overlap; 23 at 40 in 302 x 196 -> 6 x 4 cells of 50 x 49 >= 40) · `.ws-blankbox` (`page.css:445`) for the free correction line · `svgRoot roundedRect line label el esc` (`primitives/_svg.js`) · `entriesFor countable sampleEntries fileUri` (`lib/b2-common.js`) · tokens `T.teal T.tealSoft T.coral T.ink T.inkSoft T.white T.grid`, `F.display F.body`. **NOT reused:** `equalGroups` (`share` = empty bins for an EXACT deal, `mul` boxes sized by count, `components-b2.js:185`), `groupRing`/share-bins (`÷` hard-coded, `array-tasks.js:136`), `answerBox` (grid dash), `numberLine` (face f rejected), `countBadge` (a numeral beside a pile leaks q).

**NEW in `templates/components-b3.js`** (absent, measured):
- `remainderGroups({n, d, iconSrc, iconPx=40, cell=95, cols=3, gap=6, perRow=2})` -> the cell grid (HTML, flex-wrap inside `.ws-groupbox`); `perRow` 2 at cell 95, 3 at cell 126; throws when `q > cols*2 - 1` or `d > perRow^2`, so d <= 4 at cell 95 and d <= 6 at 126 by construction, never a wrap-dependent overflow.
- `remBox({answer, role, w=44, h=40})` -> `<span class="ws-answerbox" style="border-color:#F2784B" data-lcs-answer data-lcs-role>`.
- `divisionLine({template, n, d, q, r, boxStyle, remWord, shown})` -> `<div data-lcs-notation data-lcs-style>`: tokenises the template; `{n}`/`{d}` -> printed numerals; `{q}`/`{r}` -> `remBox` (with `shown:{q,r}` a printed numeral in a solid grid-bordered box `data-lcs-shown-q/r`, error face); `× · : / ÷ +` -> operator span teal; `=` -> inkSoft; any other run -> word span Nunito 800 18. `inline` and `product` (fr) share this path; `casita` calls `casitaFrame` and keeps the template for the `aria-label` only.
- `casitaFrame({n, d, q, r, remWord, w=200, h=88, shown})` -> SVG: dividend `label` 26 at (40, 22); vertical `line` x 100, y 2..44, teal 3; horizontal `line` 100..196 at y 44; divisor `label` at (148, 22); q box `roundedRect` 44 x 36 dashed coral at (126, 48) `data-lcs-answer data-lcs-role=q`; r box at (18, 48) `role=r`; `remWord` (it `r`) as a 16-px Nunito label left of the r box; es/pt `remWord:''`. Quotient under the divisor, remainder under the dividend = the es galera, the pt-BR chave and the it colonna: one drawing, three names.
- `verdictPills({yes, no, fontPx=20})` -> `pillChoice` in fixed order yes | no, no glyph, `data-lcs-pill="yes|no"`.
The sv `/` and the fr `=` form need no glyph code: both are template characters through the operator span (G3-369's `DIV_SLASH`/`DIV_COLON` sets, `types/g3/G3-369:20-23`, are the precedent; here the glyph lives in DATA).

## 6 Locale slot structure (`data/b3/division.js`, generated from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js`)

```
DIVISION[loc] = { template:'{n} : {d} = {q} R {r}', boxStyle:'inline'|'product'|'casita', remWord:'R',
  words:{ exact:'geht auf', notExact:'Rest', right:'richtig', wrong:'falsch' },
  strings:{ 'G3-377':{title,instruction}, F1..F5:{title,instruction} } }
```
Instruction only; no frames, no nouns. Draft defaults for the panels to audit (the EN is a SOURCE TO AUDIT): en `{n} ÷ {d} = {q} R{r}` · de `{n} : {d} = {q} R {r}` · nl `{n} : {d} = {q} rest {r}` · fi `{n} : {d} = {q}, jää {r}` · sv `{n} / {d} = {q} rest {r}` · da/no `{n} : {d} = {q} rest {r}` · fr `{n} = {d} × {q} + {r}` (`product`) · es/pt `casita`, `remWord:''` · it `casita`, `remWord:'r'` (the it panel may re-target to inline `{n} : {d} = {q} r. {r}` as data). `validate-b3-draft.js`: each of `{n}{d}{q}{r}` exactly once; **sv template contains no `÷`** (historic minus, hard FAIL); no template carries a glyph outside `÷ : / × · = + ,`; `product` contains `×` or `·`; `casita` templates still carry all four slots; `boxStyle` in the enum; `words` non-empty, `right` != `wrong`; titles <= 70, no worksheet-word, unique in band; instruction <= 150. Level keys `LEVEL_KEYS[loc].G3` (`scripts/seo-landing/gen-b2var-landings.js:112-124`).

## 7 The five faces (layout deltas)

F2 F5 are PARAM (`{...base.difficulty[2], ...overrides}`); F1 F3 F4 are CODE (`mode` knob + verify branch, `data-lcs-face` stamped only when declared). `gate-variation-distinct.js` needs the b3 ROWS list (README step 4). No locale refuses a face (every face is number- or picture-only).

- **F1 Circle the Groups (CODE `mode:'scatter'`, motor).** Same 2x2 cards; the cell grid becomes a white stage 302 x 196 (r 12, border 2 creamDeep) with `iconScatter` n pictures at 40; the child rings groups of d and writes q and r in the same notation zone. `{mode:'scatter', divisors:[2,3,4], nMax:23}`; d1 nMax 13 / pictures 48 (5 x 3 cells of 60 x 65); d3 wide. Query face: "circle the groups" / "Gruppen einkreisen" / "encierra los grupos" / sv the panel's phrase (never «grupp» as a headline).
- **F2 Division Facts with Remainders (PARAM, number-only).** `{mode:'fluency', pictures:false, cards:10, cols:2, rows:5, divisors:[2..9], nMax:50}`: card (722 - 56) / 5 = 133 -> inner 302 x 105; one `divisionLine` per card (inline 40, casita 88 <= 105). Ten items within G23 [8,16]; every r in 1..d-1; (n,d) distinct; each divisor at most twice. The large range the brief put at d3 lives HERE. Query face: "no pictures, to 50" / "Division mit Rest bis 50" / "divisiones con residuo hasta 50" / "jakojäännös lukualue 50".
- **F3 Exact or Not? (CODE `mode:'exact'`).** 8 cards 2x4: card (722 - 42) / 4 = 170 -> inner 302 x 142. Row 1 `divisionLine` with r allowed 0; row 2 `verdictPills({yes: words.exact, no: words.notExact})` h 40. Casita 88 + 6 + 40 = 134 <= 142; inline 86. `{mode:'exact', cards:8, cols:2, rows:4, divisors:[2..6], nMax:36, exactPerPage:4}`; verify: 4 `data-lcs-r="0"` + 4 non-zero, pills glyph-free, fixed order. Query face: pt "divisão exata e não exata" (a real B head), de "mit und ohne Rest", nl "met en zonder rest", sv "går jämnt ut eller inte".
- **F4 Find the Mistake (CODE `mode:'error'`).** 6 cards 2x3, inner 302 x 203. Row 1 a WORKED line (`divisionLine` with `shown:{q,r}`); row 2 `verdictPills({yes: words.right, no: words.wrong})` 40; row 3 `.ws-blankbox` 262 x 44 "write it correctly" (open-ended, layout lints only). Casita 88 + 6 + 40 + 6 + 44 = 184 <= 203; inline 136. Error classes `data-lcs-error`: `rem-too-big` (shown q-1, r+d: `13 : 4 = 2 R 5`, the misconception the face exists for) · `wrong-product` (r < d but q d + r != n by 1-2) · `none`. `{mode:'error', cards:6, cols:2, rows:3, divisors:[2..6], nMax:36, wrongPerPage:3}`; verify recomputes every verdict, asserts 3 + 3 and shown r >= d on every `rem-too-big`. Query face: "find the mistake" / "Fehler finden" / "encuentra el error" / "trouve l'erreur" / "hitta felet" / "etsi virhe".
- **F5 Division with Remainder up to 35 (PARAM = the d3 config).** Wide layout, six-picture boxes, one exact case the child writes as 0: a different teaching move, not a relabel; its resolved d2 differs from the base on `cards cols rows divisors nMax allowExact iconPx`. Query face: "up to 35" / "bis 35" / "hasta 35" / "till 35". `allowExact:0` is a data change if a panel judges the exact case off-genre.

**Rejected:** (f) number-line jumps back with a leftover (G3-310 owns hops-to-zero; a 540-wide line in a 302 card gives 23-px ticks; 1-col cards cost the picture); a theme swap; base d1 relabelled; a story face (word-problems family owns it).

## 8 Two alternatives + recommendation

- **Alt A: 3 wide cards at d2 (1x3, inner 647 x 203), divisors 2-5, n <= 29.** Cell grid 3x2 of 126 x 87 (pictures 36) = 390 x 180 left, notation 241 right; keeps the brief's range at 3 items (G3-370 ships 2, G3-309 4). Rejected for d2: 36-px pictures in 5-per-box packs read as texture, not groups (the G3-302 render), and three problems is thin for a G3 practice page; kept as the d3 / F5 geometry.
- **Alt B: 6 cards 2x3 with the notation in the sixth cell.** Inner 302 x 203 = one cell row of 95 + 40 inline: q <= 2, n <= 9 at d = 4, and casita cannot enter a 95 cell. Rejected on the numbers.
- **Recommendation:** the 2x2 base of section 2 (4 cards, 40-px pictures, one 88-px notation zone for all 11 notations), F2 carrying the big numbers, F5/d3 the wide range.

## 9 Risks, mitigations, print check

- **Casita vs inline parity.** One zone height (88) in every locale keeps the seed locale-neutral and the cell grid still; `qa/verify-b3-division.js` renders base + 5 faces x 11 locales x 6 fan themes at d2 under a 3-line title + 150-char instruction (the 722 floor): `qa/lints.js` clean (overflow `:37-45`, footer `:50-66`), every `remBox` >= 40 tall, every `.ws-icon` >= 36, `[data-lcs-notation]` `scrollWidth <= clientWidth`.
- **Box vs leftover in mono.** Teal-soft rim prints ~15 % grey, coral dash ~55 %: the leftover zone is separated by DASH + the cell gap, never by hue alone; the engineer prints one d2 page on a mono laser and confirms the dashed cell reads as "not a box" at arm's length; 23 pictures at 40 px stay individually countable (G3-302's 36-px packs do not).
- **Wrong pictures** (sv #35 precedent): the panel opens every fan-theme picture; verify asserts the file exists and no B&W marker.
- **Poison set** (each must FAIL; the correct draft is the control): P1 a box with d+1 pictures; P2 leftover r = d; P3 sv template with `÷`; P4 a printed "3" in the q box; P5 F3 page with 5 exact; P6 F4 `rem-too-big` card whose shown r < d; P7 fr template without `×`; P8 the 6-card stack under the 722 floor (footer lint); P9 F1 page carrying a `[data-lcs-group]`; P10 two cards with one (n,d); P11 `zoo animals bw`.
- **Hub contract:** `apps['division-with-remainder']` + slug/name x11 + exactly 6 landings per locale with `coordinate.type === 'division-with-remainder'`, level `LEVEL_KEYS[loc].G3`; gate `scripts/verify-hub-type-rows.js --keys=division-with-remainder` expects 6 x 11 = 66 rows.

## 10 Summary

1. Base = 4 cards (2x2): n <= 23 pictures at 40 px sorted into <= 5 teal boxes of d plus a coral dashed leftover zone, under it the locale's notation with dashed coral q and r boxes; the brief's 6-card / n <= 29 shape is refused on measured px (section 2).
2. ONE `divisionLine` renders all 11 notations from a stored `{n}{d}{q}{r}` template + `boxStyle` (`inline` | `product` fr | `casita` es/pt/it) + `remWord`; the sv `÷` ban is a validator rule, the fr `=` form is a template.
3. The notation zone is 88 px in every locale, so the seed stays locale-neutral and the picture never moves.
4. Faces: F1 scatter-and-circle (CODE) · F2 number-only fluency to 50 (PARAM, 10 items) · F3 exact or not (CODE, 4 + 4) · F4 find the mistake, r >= d (CODE) · F5 wide range to 35 with one exact case (PARAM = d3 config).
5. verify re-derives q, r from n, d on every card and asserts boxes and leftovers AGREE with them; q and r are never printed; NEW code = `remainderGroups`, `remBox`, `divisionLine`, `casitaFrame`, `verdictPills` in `components-b3.js`.
