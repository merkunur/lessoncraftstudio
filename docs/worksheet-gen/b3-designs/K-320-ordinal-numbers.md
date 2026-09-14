# K-320 `ordinal-numbers` (K/G1) : FINAL design (editor merge, 2026-09-14)

Merged from `_work/K-320-pedagogy.md` + `_work/K-320-design.md`. Every file, primitive, class and option below was read in the repo (record: `_work/K-320-critic.md`). (m) = re-measured 2026-09-14 by node (`data/b2/calendar.js`, `lib/b2-common.js entriesFor`, `topics-taxonomy.json`) or puppeteer with the shell's woff2 (scratch `k320-glyph.js`, `k320-words.js`). *est.* = the engineer measures. No em-dashes.

**Boundary (load-bearing).** The child reads or writes an ordinal NUMERAL (`3rd` / `3.` / `3e` / `3:e` / `3.º`) against a LINE-UP of DISTINCT pictures whose start and direction a coral flag marks. K-064..067 (`types/_shared/position-words.js`: on-under / left-right / rows / inside-outside, m) own RELATIONS where the arrangement is the answer; G1-308 F3 owns the ordinal WORD inside a read imperative over a MIXED strip with repeats; G2-277 owns date ordinals (`ordinal(C.ordinalStyle, qDate)`, `G2-277:91,94`, m); K-019..023 own CARDINAL strips. No face here prints a relation word, a noun sentence, a date or a cardinal strip; no tile ever carries a numeral.

## 1 Identity

| field | value |
|---|---|
| id / key / bands | `K-320` / `ordinal-numbers` / base **K**, F4 **K** (`K-325+ TBD by the emitter`); F1 F2 F3 F5 **G1** (`G1-311+ TBD`). `default_subject: math`, `default_age_range: 5-7`, `assetClass: icon-placement`, `exerciseType: ordinal-numbers`. `apps['ordinal-numbers']` + axis key ABSENT (m); register `{default_subject:'math', default_age_range:'5-7', exercise_type_axis_key:'ordinal-numbers'}` (shape of `apps['position-words']`, m) + slug/name x11; the 11 slugs grepped against every axis slug in every locale: **0 collisions** (m). |
| theme axis | ON: `{applicable:true, minNouns:10, excludeBw:true}`; pools = `entriesFor(theme, loc)` (`lib/b2-common.js:40`, applies `B2_EXCLUDE` `crane tank loader lego`, `:35`). Fan set, MIN over 11 locales (m): animals 37 · zoo animals 34 · farm animals 25 · pets 19 · vehicles **28** · toys **29** · dinosaurs 24 · birds 2 **38** · forest creatures 40 · fruits 28 (the pedagogy's 29/30/39 were en-only). `reptiles and Amphibians` 9 and `birds` 12 excluded. `unitAxis` not applicable (1-20 is a range; 20 x 44 + 19 x 4 = 956 > 647). |
| CCSS (en, honest) | no K-2 CCSS-M code names ordinals. All six faces = readiness: NO `educationalAlignment`; `teaches` = "Ordinal numbers (readiness)"; strand row `'Counting & Cardinality'` (`strand-names.ts:32-44`, all 11 present, m). Non-EN names the national framework. |
| notation source | `data/b3/ordinals.js`: an explicit per-locale 1..10 literal table (§5), NOT `calendar.js ordinal(style, n)` (a DATE style; m: es/pt/it `plain` -> `1 2 3`, fr -> `1er 2 3`). **sv is FIXED** (`d1acae96`; m: `ordinal('sv', n)` -> `1:a 2:a 3:e ... 10:e`, `21:a 22:a 31:a`); the pedagogy's "calendar sv prints 1:e" is stale. |
| glyphs | **Baloo 2 700 carries `º` U+00BA and `ª` U+00AA** (m: the shell's `baloo2-700-latin.woff2`, unicode-range `U+0000-00FF`; widths 11.0 / 9.9 px at 28 px vs 9.3 / 8.4 for the system fallback; `o` 16.2 vs 14.0 proves the face loaded). No superscript-o fallback. `°` U+00B0 BANNED. |

| loc | genre head | ASCII slug | level K / G1 (`LEVEL_KEYS`, m) | notation 1..10 (panel literals) | words 1..10 (citation) | national strand (panel confirms wording) |
|---|---|---|---|---|---|---|
| en | Ordinal Numbers | `ordinal-numbers` | `kindergarten` / `grade-1` | 1st 2nd 3rd 4th 5th 6th 7th 8th 9th 10th | first ... tenth | Counting & Cardinality (readiness) |
| de | Ordnungszahlen | `ordnungszahlen` | `vorschule` / `1-klasse` | 1. ... 10. | erste zweite dritte vierte fünfte sechste siebte achte neunte zehnte (panel may rule `der Erste`, `capital:true`) | Lehrplan Mathematik Kl. 1: Zahlen und Operationen |
| es (MX) | Números ordinales | `numeros-ordinales` | `preescolar` / `primer-grado` | 1.º ... 10.º or 1º ... 10º (dot ruled ONCE, all-or-none); f 1.ª ... | primero ... décimo / primera ... décima | SEP/NEM: Número, álgebra y variación |
| pt (BR) | Números ordinais | `numeros-ordinais` | `educacao-infantil` / `1o-ano` | 1º ... 10º (dot per panel); f 1ª ... | primeiro ... décimo / -a | BNCC EF01MA01 (número como indicador de ordem) |
| fr | Les nombres ordinaux | `nombres-ordinaux` | `maternelle` / `cp` | 1er 2e ... 10e (f `1re` only; NEVER `2ème`) | premier deuxième troisième quatrième cinquième sixième septième huitième neuvième dixième (`second` BANNED) | programmes cycle 2: nombres et calculs |
| it | Numeri ordinali | `numeri-ordinali` | `infanzia` / `classe-prima` | 1º ... 10º (no dot); f 1ª | primo ... decimo / -a | Indicazioni nazionali: Numeri |
| nl | Rangtelwoorden | `rangtelwoorden` | `kleuters` / `groep-3` | 1e ... 10e (BE `1ste 2de` in `alt`) | eerste tweede derde vierde vijfde zesde zevende achtste negende tiende | SLO kerndoel 26 |
| sv | Ordningstal | `ordningstal` | `forskola` / `ak-1` | **1:a 2:a** 3:e ... 10:e | första andra tredje fjärde femte sjätte sjunde åttonde nionde tionde | Lgr22 åk 1-3: taluppfattning [NSR] |
| da | Ordenstal | `ordenstal` | `boernehaveklasse` / `1-klasse` | 1. ... 10. | første anden tredje fjerde femte sjette syvende ottende niende tiende | Fælles Mål: tal [NSR] |
| no | Ordenstall | `ordenstall` | `1-trinn` / `2-trinn` | 1. ... 10. | første andre tredje fjerde femte sjette sjuende åttende niende tiende (`syvende` in `alt`) | LK20: tal og ordning [NSR] |
| fi | Järjestysluvut | `jarjestysluvut` | `esikoulu` / `1-luokka` | 1. ... 10. | ensimmäinen toinen kolmas neljäs viides kuudes seitsemäs kahdeksas yhdeksäs kymmenes | OPS 2014 vl 1-2: luvut ja laskutoimitukset [NSR] |

**Gender rule (locks the type).** An ordinal numeral or word NEVER stands in one phrase, tile or chip with a picture noun. Cue chips carry the numeral only; F2 words are citation labels in a bank row (masc. sg in es/pt/it/fr); F1/F3/F5 answers are POSITIONS: `genderPolicy:'position'` (es/pt `lugar` m, it `posto` m, fr `rang` m, so `3.º` / `3º` / `1er` is the one expected string per k). A panel may set `'noun'` for **F1 only** (§4).

## 2 The base page

**Concept.** "Ordinal Numbers: Find the Place." Three cream line-up panels. Each: a coral start flag + arrow above, SEVEN white picture tiles (all different nouns), a dotted mark band, then two cue chips `[ 3. (ring icon) ]  [ 6. (X icon) ]`. The child starts at the flag, counts to the chip's ordinal and makes the mark the icon shows: a pencil ring round the white tile or an X across it. Tiles carry no word or numeral; the chips are the only text, so the apparatus is identical in all 11 locales except the notation glyph. The pedagogy's 5-row / 1-chip / circle-only page (pic 64) was dropped: two chips per strip with DIFFERENT marks make every answer attributable, and 7 tiles reach the 6th/7th from one flag.

**Chrome budget (README ruling).** Body **722** with 3-line title + 3-line instruction, 814 with one-line chrome. `.ws-page` inner 675 (`page.css:16-26`, m). `.ws-lane` (`page.css:401`) with inline `padding:10px 12px` -> inner **647** (m: 675 - 24 - 4). Rows `minmax(<min>px, 1fr)`; slack opens inside each panel between strip and chip row (`justify-content:space-between`), never in the tiles.

**Layout d2**
```
+------------------------------ panel .ws-lane 675 x >= 198 ------------------------------+
| |>=======================================================>   arrow row 20 (flagScale 1.5)|
| [ pic ][ pic ][ pic ][ pic ][ pic ][ pic ][ pic ]     7 tiles 84, pic 72, gap 8 = 636    |
|    .      .      .      .      .      .      .        mark band 22                       |
|        ( 3.  [o] )          ( 6.  [x] )               chip row 44, chips ~131, gap 24    |
+----------------------------------------------------------------------------------------+
   grid repeat(3, minmax(198px,1fr)); gap 12   ->   3 x 198 + 24 = 618 <= 722 (slack 104)
```
- Panel min = 20 + 4 + 84 + 22 + 44 = 174 + padding 20 + border 4 = **198** (m; the design's 196 dropped the arrow gap). Tiles 7 x 84 + 6 x 8 = **636 <= 647**; white r 10 border 2 creamDeep, `.ws-icon` (`page.css:178`) **72** >= K floor 56 (`_tokens.js:68`); no rotation, caption, opacity or size difference. Band: `inkSoft` dot r 4 under each tile centre (the `tick` zone; unused at d2).
- Arrow row: G1-308 `startArrow` at `flagScale:1.5` (pennant 15x21 coral on a 2 px ink pole, 3 px rule, solid 12 px head, `aria-hidden`); direction survives mono print by SHAPE.
- Chip row: two `ordinalChip`s, ascending k, gap 24: `.ws-pill` (`page.css:422`) inline `height:44px;padding:0 14px;gap:8px`, notation Baloo 2 700 **30** teal (K `fontChoice:30`, `_tokens.js`) + `markIcon` 32. Widest notation at 28 (m): `10th` 54.7, `10:e` 49.5, `10.º` 44.2; at 30 *est.* 58.6 -> chip ~131.
- Marks on colour art: `circle` = a ring round the WHITE tile, `cross` = an X across it (G1-308 ruling: colour art is never coloured). `tick` (band) enters at d3; `colour` only on a BW theme (`data-lcs-bw="1"`, a wave decision, no face rides on it).

**Ladder** (resolved config keys; guards key on these, never the level index):

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| strips / n / tile / pic / gap | 3 / 5 / 100 / 84 / 12 (548; panel 214) | 3 / 7 / 84 / 72 / 8 (636; panel 198) | 3 / **8 / 76 / 64 / 5** (643; panel 190) |
| ordinals sampled from | 1..5 | 1..7 | 1..8 |
| chips per strip / action pool | 2 / circle cross | 2 / circle cross | 2 / circle cross tick |
| page ordinal rule | 6 chips over 5 values: none 3x; includes 1 and 5 | 6 pairwise distinct; includes 1 and one of {6, 7} | 6 pairwise distinct; includes 1 and 8 |
| chipPx / pill h / start | 30 / 48 / left | 30 / 44 / left | 28 / 44 / left |

**d3 ruling:** the design's 10 x 62 / pic 56 / gap 3 sits AT the K floor with a 3 px ring reserve; ruled DOWN to 8 x 76 / 64 / 5 (6 px tile margin + 5 px gap = the pencil-ring reserve). 9th/10th are not lost from the type: F1 writes them at G1 d3.

**Composer.** `rng.shuffle(sampleEntries(rng, entriesFor(theme, loc), n))` per strip (every noun once per strip; strips may share nouns); k values per the page rule; per strip the two chips differ in k AND action.

**Answer-hiding + uniqueness.** Root `<div class="ws-lane" data-ws-content data-lcs-strip data-lcs-order="cat,dog,pig,..." data-lcs-start="left|right" data-lcs-n="7">`; tiles `data-lcs-idx data-lcs-noun` (no `alt`, no text). Chip `<span data-lcs-chip data-lcs-ordinal="3" data-lcs-action="circle|cross|tick|colour" data-lcs-target="<idx>" data-lcs-notation="3.">` (the NUMBER drives verify; the literal feeds the bank check). `verify(page)`: per strip `target === (start === 'left' ? k - 1 : n - k)`, `1 <= k <= n`, chips differ in k and action, targets disjoint, order entries distinct; the ladder page rule; no tile text / numeral / `alt`; `img.complete && naturalWidth > 0`; no localized B&W marker (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`) unless `data-lcs-bw="1"`, and `colour` only then. Node gate (`page.evaluate` cannot require): every `data-lcs-notation === ORDINALS[loc].notation[k]` (poison: a hand-edited `3rd` on a de page FAILS). The formula FAILS a strip built left and stamped right (poison both ways).

**Reused (exact).** `pictureStrip` from G1-308 §2 (`templates/components-b3.js`, ABSENT today, m; owned by G1-308) with three ADDITIVE options, defaults byte-identical: `start:'left'|'right'` (mirrors the arrow row only), `flagScale:1|1.5`, `under:'band'|'box'|'none'` (`box` = `answerBox({w:tile-8, h:44, answer:k})` under every tile; item `given:'3.'` renders a solid white cell with the literal in `T.ink`). `answerBox` (`components.js:105`, m: `label` empty prints nothing; `.ws-answerbox` dashed `#C8BFAE`, Baloo 26, `page.css:220`). `.ws-lane .ws-pill .ws-achip .ws-icon .ws-answerbox`, `svgRoot roundedRect circle line el esc` (`primitives/_svg.js`), `entriesFor sampleEntries fileUri`, tokens `T.teal T.coral T.ink T.inkSoft T.grid T.white T.creamDeep`, `F.display`. **NOT used:** `numberStrip` / `countBadge` (a numeral by a tile leaks the index), `chipRow`, `iconRows` (rotation), `wordTiles`, `pillChoice`, `cardGrid`, `matchColumns`, `calendar.js ordinal()` or `image-vocabulary.js` at render.

**NEW in `templates/components-b3.js`** (scoped inline CSS): `lineUpPanel({strip, below, minH})` -> the `.ws-lane` wrapper (flex column, `space-between`, `data-ws-content`) · `ordinalChip({k, notation, px=30, icon})` · `markIcon({kind})` 32x32 SVG: a grey mini tile 18x18 (`T.grid`) with the mark ON it (`circle` teal ring r 13 · `cross` coral X · `tick` teal check under the tile · `colour` coral fill), 3 px: the icon shows WHERE the pencil goes, that is the whole legend · `wordChipRow({words:[{k, text}], px=22, gap=8})` -> `.ws-achip` h 44, `padding 0 12`, `data-lcs-word-k` · `queryCell({noun, k})` -> `[pic 56 on white 68 r 10][12][arrow 24][12][answerBox 72x44]` = 180, `data-lcs-query` · `finishLine({h})` 16 px two-column chequer (teal / white, 8 px squares) · `raceLane({noun, x, laneW=543, pic=64})` dashed `inkSoft` trail 0..x + the runner, `data-lcs-x`. `lib/b3-common.js ordinalFor(loc, k, gender='m')` (README names it; absent, m).

**Alternatives.** Alt A one strip per chip (6 x 5): tiles 56, no strip reaches a 6th; rejected. Alt B written instructions instead of chips: 11 authored sentences agreeing with an unknown noun, and it is G1-308 F3's page; rejected. Alt C the pedagogy's single-chip rows: 6 tiles, one mark, a wrong ring unattributable; rejected on the numbers.

**Risks -> mitigations.** Mono print: no meaning rides on colour; the flag is a filled pennant on an ink pole; engineer prints one d2 page greyscale and confirms the arrow reads at 21 px. A ring on tile 1 as start cue was rejected (reads "circle the 1st"). Two right answers: impossible by construction. **Palette:** cream, creamDeep, white, teal, coral, ink, inkSoft, grid. **Font floor:** smallest text 20 (fr/fi F2 chips) vs the 9 px lint (`qa/lints.js:86`). Every panel and lane stamps `[data-ws-content]` (`qa/lints.js:32`, m).

## 3 Faces 2-6

Base ladder + F4 are PARAM (`start` is a base config key read by `build()`, default `'left'`; no new code lands for F4); F1 F2 F3 F5 are CODE (`layout` knob + a `verify()` branch; `data-lcs-face` stamped only when declared; base byte-identical). Resolved d2 configs are pairwise distinct (`tools/gate-variation-distinct.js` reads the b2 wave + ROWS, m; a b3 list is required first, critic OPEN 1). Density: K faces pic 72, 6 asks in [4, 8]; G1 faces pic >= 60, items in [6, 12]; answer numerals Baloo 26 = the G1 floor.

### F1 : Write the Ordinal Numbers (G1, CODE `layout:'write'`)
**Move:** PRODUCE the notation in sequence; the suffix system (st/nd/rd/th, 1:a/2:a/3:e, º, e) is the learning. **Layout:** 3 panels, `pictureStrip({n:8, tile:76, pic:60, gap:5, under:'box', flagScale:1.5})` = 643; 8 boxes 68x44 (gap 5 = 579); per strip **4 GIVEN** (solid cell, the notation in ink = the pattern the child copies) + **4 blank** (dashed); position 1 never blank, never 4 blanks in a row; given sets differ across strips. Panel 20 + 4 + 76 + 6 + 44 = 150 + 24 = 174; 3 x 174 + 24 = **546 <= 722**. 12 blanks = the G1 cap; pic 60 >= 44. **Config** `{layout:'write', strips:3, n:8, tile:76, pic:60, gap:5, given:4, blank:4}`; d1 2 x 6 (tile 92, pic 76, 3 blanks); d3 2 x 10 (tile 60, pic 48, 6 blanks, 1st..10th). **Verify:** each blank `data-lcs-answer === ordinalFor(loc, idx + 1, g)`, each given text likewise; blanks per strip = `blank`; position 1 given; `g` = the strip noun's vocab gender only under `genderPolicy:'noun'`, else `'m'`. **Query face:** "write" / "schreiben" / "escribe del 1.º al 10.º" / "skriv" / "kirjoita".

### F2 : Ordinal Words: Draw a Line to the Picture (G1, CODE `layout:'words'`)
**Move:** DECODE the ordinal WORD and locate its picture: word -> position -> picture. The design's themeless notation-to-word column match with position dots was dropped: it removes the line-up (the type's boundary) and the dots restate the answer. **Layout:** 2 panels: `pictureStrip({n:8, tile:76, pic:60, gap:5, under:'none'})`, a line zone >= 60, then a `wordChipRow` of **5** chips in a shuffled order (never position order; >= 1 crossing pair); the child draws a line from each word UP to its picture. Panel 20 + 4 + 76 + 60 + 44 = 204 + 24 = 228; 2 x 228 + 12 = **468**; at 722 the line zone takes the slack. **Chip row (m, Baloo 2 700 22, padding 0 12, border 2.5, gap 8; worst 5-of-8):** en 506 · de 504 · es 563 · pt 562 · it 536 · nl 535 · sv 504 · da 522 · no 515 · **fr 667 OVER · fi 660 OVER** -> fr/fi at **20 px** (fr 622, fi 616 <= 647). The validator measures the worst row per locale and sets `wordPx`; never a glyph cap (`ensimmäinen` is 11 glyphs and stays). 10 lines in [6, 12]. **Config** `{layout:'words', blocks:2, n:8, words:5, wordPx:22|20}`; d1 2 x 6, 4 words; d3 2 x 10, 6 words. **Verify:** chip k <= n, distinct per block, text === `words[k].m`; target = tile k - 1; chips in a separate `data-lcs-bank` row, never inside a tile; chip order !== position order. **Query face:** "ordinal words" / "Ordnungszahlen als Wörter" / "palabras ordinales" / "rangtelwoorden lezen" / "ordningstal med ord".

### F3 : Which Place? Write the Ordinal Number (G1, CODE `layout:'where'`)
**Move:** the INVERSE of the base: a picture is shown, the child derives its place and writes the numeral. **Form ruling:** the language-free PICTURED query (design d): a 56 px CLONE of one strip picture, an arrow and a box; no frame, no noun, no agreement. The pedagogy's fixed-head-noun frame survives only as an OPTIONAL noun-free label (`where.label`, <= 30 chars, e.g. de "An welcher Stelle?", fi "Monesko?") printed ONCE per panel above the query row when the panel sets `where.printed:true` (default false). **Layout:** 3 panels: `pictureStrip({n:8, tile:76, pic:64, gap:5})` = 643, gap 12, TWO `queryCell`s (180 each, gap 40, centred). Panel 20 + 4 + 76 + 12 + 68 = 180 + 24 = 204; 3 x 204 + 24 = **636 <= 722**. Clone 56 >= 44; 6 writes = the G1 floor. **Config** `{layout:'where', panels:3, n:8, queries:2}`; d1 2 panels of 5, 1 query; d3 3 panels of 10 (tile 60, pic 48), one panel `start:'right'`. **Verify:** each query noun occurs exactly once in ITS strip; `data-lcs-answer === ordinalFor(loc, idx + 1)`; the two queries of a panel differ; the six answers not all equal; clone `src` identical to the strip tile. **Query face:** "which place" / "an welcher Stelle" / "en qué lugar" / "på vilken plats" / "monesko".

### F4 : Start From the Other Side (K, PARAM `start:'mixed'`)
**Move:** the REFERENCE POINT is the whole task: same chips, but on some strips the flag sits at the RIGHT edge with the arrow pointing left, so the child must read the flag before counting (de "von rechts / von links", nl "van rechts"). **Config** `{...base.difficulty[2], start:'mixed'}`: 3 strips, per seed at least one `right` and one `left` (6 legal patterns); geometry unchanged (618). d1 `start:'right'` on every strip (4 x 5); d3 mixed + 8 tiles. **Verify:** base rules + both `start` values present at d2/d3, all `right` at d1; target = `n - k` on right strips. **Query face:** "from the right" / "von rechts" / "desde la derecha" / "van rechts" / "från höger" / "oikealta".

### F5 : Who Wins the Race? (G1, CODE `layout:'race'`, themes `racers`)
**Move:** ORDER BY DISTANCE, not by left-right position: six runners on six lanes at different distances from a chequered finish line on the right; nearest = 1st. **Layout:** 6 white rows 675 x >= 96 (r 12, border 2 creamDeep, padding 0 12 -> inner 647), gap 8: `[raceLane 543][8][finishLine 16][8][answerBox 72x44]` = 647. Runner pic 64 at x from a 6-slot grid over 60..500 (step 88) +-12 jitter, separation >= 44 (the G1 floor; the pedagogy's 40 loses). 6 x 96 + 5 x 8 = **616 <= 722**; the pedagogy's 5 lanes fall BELOW the G1 floor of 6 and lose. **Themes** = `racers` = fan set minus fruits and toys: animals · zoo animals · farm animals · pets · vehicles · dinosaurs · birds 2 · forest creatures (the design's 13-theme `movers` held sub-floor and off-fan themes). A wave pinning a non-racer theme makes the spec THROW (refusal, recorded), so `themeOverrides` for this face names a racer. **Config** `{layout:'race', lanes:6, sep:44}`; d1 5 lanes, sep 80; d3 8 lanes h 82, pic 56. **Verify:** `data-lcs-x` pairwise >= 44; `data-lcs-answer` = rank by descending x via `ordinalFor`; one finish strip; nouns distinct. Art facing is NOT gated (no `facing` table, m; `image-cache/silhouette.js` is shape-only): the trail carries direction; the critic reads one race per racer theme; `facing:{noun:'left'}` is an additive mirror knob added only where needed. **Query face:** "race" / "Wettrennen" / "carrera" / "course" / "tävling" / "kilpailu".

**Rejected non-moves.** Theme swap · "colour the 3rd" on colour art (a `bwOnly` twin on the 9 cached BW themes = the same move on other art, a wave decision) · ordinals to 20th · calendar ordinals (G2-277) · "the second cat" over repeats (G1-308 F3) · left / right / between (K-064..067) · a podium with numbered steps (prints the answer) · `3` <-> `3rd` or notation-to-word column match (no line-up) · counting backwards (K-023) · "last" beside `10.` (two right answers) · d1/d3 relabelled.

## 4 Native rebuild plan x11

The panel authors 10 notation literals (+ `notationF`, `alt[]`), 10 words (+ `f`), `genderPolicy`, the optional `where.label`, six titles + instructions, and audits the EN as a SOURCE. **Instructions are noun-free** ("Start at the flag. Count to the number on the chip and make the mark it shows."); no `{noun}` or `{ordinal}` slot exists in this type; nothing on the apparatus inflects because no noun is printed.

| loc | notation literals (1..10) | words (+ f) | gender rule on the page | refusal | traps |
|---|---|---|---|---|---|
| en | 1st ... 10th | first..tenth | none | none | never `1th` |
| de | 1. ... 10. | erste..zehnte (`capital:true` for `der Erste`) | none; the dot IS the notation (never `4te`) | none | words invariant on the bank row |
| es (MX) | 1.º..10.º or 1º..10º (dot ONCE); `notationF` 1.ª..; `alt` `1.er` | primero..décimo / -a | `position` (`lugar` m) default; `noun` for F1 only (then `notationF` required) | none | `º` U+00BA never `°`; MX register in titles |
| pt (BR) | 1º..10º (dot per panel); `notationF` 1ª.. | primeiro..décimo / -a | as es (`lugar` m) | none | BR school print omits the dot |
| fr | 1er 2e ... 10e; `notationF` {1:'1re'} | premier deuxième..dixième / première | `position` only (`rang` m); `1re` printed nowhere | none | `2e` never `2ème`; `second` BANNED; NBSP before `?` in the label |
| it | 1º..10º (no dot); `notationF` 1ª.. | primo..decimo / -a | as es (`posto` m) | none | `º` not `°` |
| nl | 1e ... 10e; `alt` BE `1ste 2de 3de` | eerste..tiende | none | none | `derde` never `3de` on the page |
| sv | 1:a 2:a 3:e ... 10:e | första..tionde | none | none | **1:a / 2:a** (poison `1:e`); never `grupp`; no noun printed, no definite-form trap [NSR] |
| da | 1. ... 10. | første anden tredje..tiende | none | none | `anden` not `andre` [NSR] |
| no | 1. ... 10. | første andre..tiende (`syvende` in `alt`) | none | none | bokmål [NSR] |
| fi | 1. ... 10. | ensimmäinen..kymmenes (nominative) | none; `where.label` "Monesko?" is noun-free | none | the dot IS the notation; `kolmas` not `kolmannes`; F2 chips at 20 px (m) [NSR] |

Every panel OPENS every picture its fan theme keeps (the sv #35 `fruits/plum` = a red apple precedent) and one race render per racer theme (facing).

## 5 Data + gates

`data/b3/ordinals.js`, GENERATED from `i18n/.draft-b3-<loc>.json` by `tools/apply-b3-locale.js` after `tools/validate-b3-draft.js` (the `apply-b2-locale.js` / `validate-b2-draft.js` pattern, both exist, m; the b3 tools are absent; `data/` gitignored, `git add -f`):
```
ORDINALS[loc] = {
  notation:  { 1:'1.º', 2:'2.º', ..., 10:'10.º' },             // explicit table, never a pattern
  notationF: { 1:'1.ª', ..., 10:'10.ª' } | { 1:'1re' } | null,  // es pt it full; fr 1 only; else null
  alt:       { 1:['1.er'] } | {},                                // accepted alternates, printed nowhere
  words:     [{ k:1, m:'primero', f:'primera' }, ... k:10],      // f null where invariant
  capital:   false,                                              // de: true only for the nominalised form
  genderPolicy: 'position' | 'noun',                             // 'noun' affects F1 only
  where:     { label:'¿En qué lugar?', printed:false } | null,   // no slot, <= 30 chars
  wordPx:    22 | 20,                                            // set by the validator's measurement
  strings:   { 'K-320':{title,instruction}, F1..F5:{title,instruction} } }
```
`ordinalFor(loc, k, gender='m')` returns `notation[k]`, or `notationF[k]` when `gender === 'f'`; throws outside 1..10 or on a missing feminine. `calendar.js ordinal()` is never called by this type; the validator cross-checks it and reports every divergence (expected: es pt it `plain`, fr k > 1 bare; en dot nl sv agree, m).

**`tools/validate-b3-draft.js` (ordinals block; exit 1 on any):** (1) `notation` keys exactly 1..10, distinct, each contains `String(k)`, none contains U+00B0 or `ème`/`ième`; sv 1-2 end `:a`, 3-10 `:e`; nl end `e`; en end `st nd rd th` correctly; dot locales end `.`; es/pt/it contain U+00BA and are dot-consistent (all ten or none); `notationF` full in es/pt/it (U+00AA), `{1}` in fr, null elsewhere. (2) `words` 1..10, `/^\p{L}+$/u`, distinct, lowercase unless `capital:true`; `f` for all 10 in es/pt/it, k = 1 in fr, null elsewhere; fr `words[2].m === 'deuxième'`. (3) `genderPolicy:'noun'` only with a full `notationF`; fr and the seven non-inflecting locales `'position'`. (4) `where.label` no `{`, <= 30, ends `?`. (5) the rendered worst 5-of-8 chip row at 22 px <= 647, else `wordPx:20` re-measured <= 647 (m: fr 622, fi 616). (6) titles <= 70, no worksheet-word, unique in band; instructions <= 150, no `{noun}`, no relation word (on / under / left / right / between / inside in the locale). (7) every fan theme >= 10 entries via `entriesFor` (m: floor pets 19); `racers` ⊂ fan set. (8) the calendar cross-check: a divergence outside es/pt/it/fr is a FAIL.

**`qa/verify-b3-ordinal-numbers.js`:** renders face x 11 x fan themes at d2 under a 3-line title + a 150-char instruction (the 722 floor); `verify()` empty; `qa/lints.js` clean (overflow `:37-45`, footer `:50-66`, font `:86`); icons >= 72 on K faces, >= 60 on G1 strips, >= 56 on clones; chips and boxes 44 high; F2 row `scrollWidth <= clientWidth`; 20-seed sweep: base asked set covers 1..7, F4 both sides every seed, F2 chip order never equals position order, F3 answers not constant, F5 ranks not constant, F1 given sets differ across strips. **Poison (each must FAIL; the correct draft is the control):** P1 a strip `cat,dog,cat` · P2 `k:8` on a 7-tile strip · P3 `data-lcs-start` removed / no flag · P4 an F4 page with every flag left · P5 F5 two runners 30 px apart · P6 an F2 chip inside a tile · **P7 sv `1:e`** · **P8 es `3°` (U+00B0)** · P9 theme `zoo animals bw` · P10 two chips asking `3` on one page · P11 F1 position 1 blank · P12 an F3 query noun absent from its strip · P13 es mixing `1.º` and `2º` · P14 fr `words[2].m = 'second'` · P15 a strip built left, stamped right · P16 the old 760 stack under 3-line chrome (footer lint) · P17 fi F2 at 22 px (660 > 647). **Page reads:** `data/b3/ordinals.js[loc]`, `fileUri`, `entriesFor`; never `image-vocabulary.js`, `calendar.js` or `approved-words-*.json` at render.

## 6 SEO plan

| face | title pattern (Germanic / Romance / Nordic + fi) | meta MIDDLE (whole 120-170; the child's instruction) | coordinate |
|---|---|---|---|
| base | "Ordinal Numbers: Find the Place" · "Ordnungszahlen: Finde das Bild an seiner Stelle" / "Números ordinales: encuentra el lugar" / "Ordningstal: hitta rätt plats" · "Järjestysluvut: etsi oikea paikka" | Start at the flag, count to the number on the chip and mark the picture standing in that place | `{type:'ordinal-numbers', mode:'base', theme:<axis key>, level:<K key>}` |
| F1 | "Write the Ordinal Numbers 1st to 10th" · "Ordnungszahlen bis 10 schreiben" / "Escribe los números ordinales del 1.º al 10.º" / "Skriv ordningstalen 1:a till 10:e" · "Kirjoita järjestysluvut 1.-10." | Some places under the line are already written; write the missing ordinal numbers in the empty boxes | `mode:'write'`, G1 |
| F2 | "Ordinal Words: Draw a Line to the Picture" · "Ordnungszahlen als Wörter: verbinde Wort und Bild" / "Palabras ordinales: une la palabra con el dibujo" / "Ordningstal med ord: dra streck till bilden" · "Järjestysluvut sanoina: yhdistä sana ja kuva" | Read each ordinal word and draw a line to the picture that stands in that place in the line | `mode:'words'`, G1 |
| F3 | "Which Place? Write the Ordinal Number" · "An welcher Stelle? Schreibe die Ordnungszahl" / "¿En qué lugar está? Escribe el número ordinal" / "Vilken plats? Skriv ordningstalet" · "Monesko se on? Kirjoita järjestysluku" | Find each small picture in the line above it and write which place it is in, counting from the flag | `mode:'where'`, G1 |
| F4 | "Ordinal Numbers from the Right: Start at the Flag" · "Ordnungszahlen von rechts und links" / "Números ordinales desde la derecha" / "Ordningstal från höger" · "Järjestysluvut oikealta" | Look where the flag is first; some rows start on the right, then mark the picture in the place shown | `mode:'right'`, K |
| F5 | "Who Wins the Race? Write the Place" · "Wer gewinnt das Rennen? Ordnungszahlen" / "¿Quién gana la carrera? Escribe el lugar" / "Vem vinner loppet? Skriv placeringen" · "Kuka voittaa kilpailun? Kirjoita sija" | Look how close each runner is to the finish line and write 1st, 2nd, 3rd, 4th, 5th and 6th | `mode:'race'`, G1 |

`coordinate.mode` is ALWAYS the face's mode string (README ruling: `coordKey()` = `type|mode|theme`). Titles <= 70, no worksheet-word, unique per band. h1 = title; eyebrow = level label; strand row per §1 (framework NAME only). JSON-LD `LearningResource` with NO `educationalAlignment`. `topicMeta['ordinal-numbers']` (>= 50) + `skill-sentences.<loc>.json` via `tools/register-b3-en-content.js` (absent). Meta lead inherits `seo.words.free_printable` (README open item 1).

**Non-cannibalisation** (3-gram Jaccard, `scripts/seo-landing/gate.js` FAIL >= 0.80; *est.*):

| pair | what the copy says differently | est. |
|---|---|---|
| base vs F4 | left flag only vs "some rows start on the right; read the flag first" | 0.40 |
| base vs F1 / F2 / F3 | mark a picture vs write the notation / read a word / derive a place from a picture | 0.25 / 0.25 / 0.30 |
| F1 vs F3 · F5 vs F3 | a sequence under a line vs one place per pictured query · distance to a finish vs position in a line | 0.30 · 0.25 |
| any vs K-064..067 position words | relations (on / under / left / right), no order, no numeral | 0.10 |
| base / F2 vs G1-308 F3 | a numeral or word chip over DISTINCT pictures vs an ordinal word inside a read sentence over repeats | 0.15 |
| F1 / F3 vs G2-277 calendar | a line-up vs a month grid and dates | 0.10 |
| base / F1 vs K-019..023 strips | ordinal notation from a flag vs missing CARDINALS in a sequence | 0.12 |

Boundary sentence on every landing: "The child counts from the flag and reads or writes the ordinal NUMBER (3rd, 3., 3e, 3:e, 3.º); no position word, no date, no counting strip." On F2: "the ordinal WORD stands alone, never inside a sentence" (vs G1-308 F3).

## 7 Hub visibility contract

A face appears under `ordinal-numbers` on `/[locale]/worksheets` IFF all four hold (brief): (1) `apps['ordinal-numbers']` exists in `frontend/config/topics-taxonomy.json` (ABSENT, m; missing = rendered NOWHERE in the rail); (2) `axes['exercise-type']['ordinal-numbers']` has `slug` + `name` in all 11 locales (§1 slugs, 0 collisions, m); (3) exactly one landing per face per locale with `coordinate.type === 'ordinal-numbers'` verbatim, `mode` per §6, the level key of §1 (K for base + F4, G1 for F1 F2 F3 F5), the wave's theme axis key (F5's a racer), a unique slug, `canonicalDeckSlug` = the published deck; a REFUSED face has NO landing and the expectation is lowered explicitly, never padded; (4) the landing JSON committed AND deployed (per-process cache).

Gate: `node scripts/verify-hub-type-rows.js --keys=ordinal-numbers`. Script absent (m) (nearest siblings `scripts/verify-worksheets-hub-order.js`, `verify-worksheets-hub-render.js`; selection lives in `frontend/lib/worksheets-catalog.ts applyLandingFilters`); write + poison-test it (a short locale and a wrong `coordinate.type` must FAIL) before `apps['ordinal-numbers']` lands.

**Expected rows per locale:** 6 in every locale x 11 = **66**. No refusal is measured today: notation and words are panel literals in all 11, no picture noun is printed, every fan theme holds >= 19 safe nouns in every locale (m), and F5's only constraint is the pinned theme. Contingent reductions, each recorded in the draft before the wave: F5 where the wave pins a non-racer theme (est. 0 if `themeOverrides` reads the racer list); F2 where panel words exceed 647 at 20 px (est. 0: worst measured 622).
