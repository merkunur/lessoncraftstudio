# K-320 `ordinal-numbers` : design (studio A+B, 2026-09-14)

Everything named below was read in the repo (m = measured). Body budget **722** (README ruling). `.ws-page` 703x945, `padding 0 14` -> inner 675; `.ws-lane` with inline `padding:10px 12px` -> inner **647** (G1-308, m). `apps['ordinal-numbers']` ABSENT from `topics-taxonomy.json` (grep = 0, m): register `{default_subject:'math', default_age_range:'5-7', exercise_type_axis_key:'ordinal-numbers'}` + slug/name x11. Level keys from `LEVEL_KEYS` (`gen-b2var-landings.js:112-124`, m).

**Boundary.** K-320 owns the ordinal NOTATION and WORD over a line-up with a marked start. G1-308 F3 ("First, Second, Between") owns ordinal cues inside a READ sentence; K-064..067 own position words; number-charts own cardinal sequences. Nothing here prints an imperative sentence on the apparatus; nothing there prints `3.` / `3rd`.

## 1 Page concept (base, K)

Three cream line-up panels, one under the other. Each panel: a coral **start flag + arrow** above, seven white picture tiles in a row, a dotted mark band below, then TWO instruction chips `[ 3. ][mark icon]`. The child starts at the flag, counts along to the ordinal on the chip and makes the mark the icon shows (ring the tile / cross the tile / tick in the band). No word, no numeral on the tiles; the chips are the only text on the page, so the apparatus is identical in all 11 locales except the notation glyph. Mark set on colour art = **circle, cross, tick** (G1-308 ruling: colour art cannot be coloured); `colour` is a legal `markIcon` kind ONLY when the instance theme is a BW theme (`themeAxis:{applicable:true, minNouns:10, needsBwSibling:false}`; the wave decides whether to fan BW themes for the base; no face rides on it).

## 2 Layout (d2, 722 body)

```
x 14 ............................................................. x 689 (inner 675)
+------------------------------ panel .ws-lane 675 x 196 ---------------------------+
| |>=========================================================>          arrow row 20 |
| [ pic ][ pic ][ pic ][ pic ][ pic ][ pic ][ pic ]     7 tiles 84, pic 72, gap 8    |
|    .      .      .      .      .      .      .        mark band 22                 |
|        ( 3.  (o) )          ( 6.  (x) )               chip row 44                  |
+-----------------------------------------------------------------------------------+
                          gap 12   (x3 panels: 3 x 196 + 24 = 612; slack 110)
```
- Grid: `.ws-body > div` with `display:grid; grid-template-rows:repeat(3, minmax(196px,1fr)); gap:12px`. Each panel is `flex-column; justify-content:space-between` so the slack (110 at 722, 202 at 814) opens BETWEEN the strip and the chip row, never stretching tiles.
- Tiles: 7 x 84 + 6 x 8 = 636 <= 647, centred. Tile white, r 10, border 2 creamDeep, `.ws-icon` **72** (K floor 56, `_tokens.js:68`). No rotation, no caption, no size or opacity difference between tiles.
- Arrow row: G1-308 `startArrow` at `flagScale 1.5` (flag 15x21 coral, pole 2 px ink, rule 3 px coral to the far edge, head 12 px solid). The head is a filled triangle and the flag a filled pennant so direction survives mono print by SHAPE.
- Chip row: two `ordinalChip` + `markIcon` pairs, gap 24, centred: `[ 3. (o) ]` = white pill h 44, padding 0 14, Baloo 2 700 **28** teal notation (widest `10th`/`10:e` ~ 62 px), icon 32 x 32 at gap 8 -> pill ~ 130 px. Two pills = 284 px.
- d1 (5 tiles): tile 100 / pic 84 / gap 12 = 548; panel 212. d3 (10 tiles): tile 62 / pic **56** / gap 3 = 647 (at the K floor, exactly; the engineer confirms 56 legible at 14.8 mm); panel 174.
- G1 faces write in a 44 px `answerBox` under each tile (section 7b); the band is dropped there.

## 3 Ladder (resolved config keys; guards key on these)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| strips / n / tile / pic / gap | 3 / 5 / 100 / 84 / 12 | 3 / 7 / 84 / 72 / 8 | 3 / 10 / 62 / 56 / 3 |
| ordinals sampled from | 1..5 | 1..7 | 1..10 |
| chips per strip / actions | 2 / circle cross | 2 / circle cross tick | 2 / circle cross tick |
| page ordinal rule | 6 chips over 5 values: no value 3x, includes 1 and 5 | 6 pairwise distinct, includes 1 and one of {6,7} | 6 pairwise distinct, includes 1 and 10 |
| chipPx / pill h | 30 / 48 | 28 / 44 | 26 / 44 |

"last" / "second-to-last" at d3 = the chips `10.` and `9.` (a notation IS the position); the WORDS last / second-to-last are not on any face (a `last` word beside `10.` would give two right answers). Recorded, not built.

## 4 Answer-hiding + uniqueness

- Strip root `<div class="ws-lane" data-ws-content data-lcs-strip data-lcs-order="cat,dog,pig,..." data-lcs-start="left|right" data-lcs-n="7" data-lcs-theme>`; tiles `data-lcs-idx="0..n-1" data-lcs-noun`. Order = `rng.shuffle(sampleEntries(rng, entriesFor(theme,loc), n))`: **every noun once per strip** (`new Set(order).size === n`); strips may share nouns.
- Chip `<span data-lcs-chip data-lcs-ordinal="3" data-lcs-action="circle|cross|tick|colour" data-lcs-target="<idx>">` (the NUMBER, never the notation string, so verify is locale-neutral); `data-lcs-notation` carries the literal for the node-side bank check.
- `verify(page)`: per strip `target === (start === 'left' ? k-1 : n-k)`, `1 <= k <= n`, the two chips have distinct k AND distinct action, targets disjoint; per page the ordinal rule of section 3; no tile carries text, `img`, a numeral or an `alt`; every `img.complete && naturalWidth > 0`; no B&W marker in any path (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`) unless `data-lcs-bw="1"`, and `colour` only when it is; exactly one `[data-lcs-start]` value per strip. Node-side: every `data-lcs-notation` equals `ORDINALS[loc].notation[k-1]` (poison: a hand-edited `3rd` -> FAIL).
- Reversal face stamps `data-lcs-start="right"`; verify's formula is the same line, so a strip built left and stamped right FAILS (poison-tested both ways).
- Faces b/d/f: `answerBox({w,h,answer:k})` stamps `data-lcs-answer` only; `label` stays empty (`components.js:105`, m) so nothing prints.

## 5 Primitives / components

**Reused (exact).** `pictureStrip` from G1-308 (`templates/components-b3.js`, the batch creates it) with ADDITIVE options, defaults byte-identical to G1-308: `start:'left'|'right'` (mirrors the arrow row: flag at the right edge, head pointing left, tiles unchanged), `flagScale:1|1.5`, `under:'band'|'box'|'none'` (`box` = `answerBox({w:tile-16,h:44,answer:k})` under every tile, k from the flag), `tile pic gap` (already options). One strip primitive for both types; **no second strip**. Also `matchColumns({left,right,itemH,colW})` (G1-307 F1), `answerBox`, `.ws-lane .ws-pill .ws-icon .ws-match*` (`page.css:401/422/178/354-422`), `svgRoot roundedRect circle line el esc` (`primitives/_svg.js`), `entriesFor sampleEntries fileUri`, tokens `T.teal T.coral T.ink T.inkSoft T.grid T.white T.creamDeep`, `F.display`. NOT used: `numberStrip`/`countBadge` (a numeral by a tile leaks the index), `chipRow` (choice semantics), `iconRows` (rotation), `wordTiles`, `pillChoice` (no per-item stamp), `calendar.js ordinal()` at render (see section 6).

**NEW in `components-b3.js`.**
- `ordinalChip({n, notation, px=28, icon})` -> `.ws-pill` inline `height:44px;padding:0 14px;gap:8px;color:T.teal` with the notation text and an optional `markIcon`; stamps section 4.
- `markIcon({kind})` 32x32 SVG, `aria-hidden`: a grey mini tile 18x18 r 4 (`T.grid`) with the mark drawn ON it: `circle` = teal ring r 13, 3 px; `cross` = coral X corner to corner, 3 px; `tick` = teal check UNDER the tile (the band zone), 3 px; `colour` = a crayon-filled tile (`T.coral` 60 %). The icon shows WHERE the pencil goes (tile vs band), which is the whole legend.
- `positionDots({n, k, dot=10, gap=6})` SVG: a 6 px flag + n grey circles, the k-th filled coral (face c, d1/d2 only). Restates the notation; leaks nothing.
- `finishLine({h})` 16 px wide 2-column chequer (teal / white, 8 px squares) with a 2 px teal frame; `raceLane({noun, x, laneW, laneH, pic})` (face f): dashed inkSoft trail from x 0 to the runner, the runner `.ws-icon` at x, stamps `data-lcs-x`.

## 6 Locale slot structure

`data/b3/ordinals.js` (generated from `i18n/.draft-b3-<loc>.json` by the `apply-b2-locale` pattern), per locale: `{notation:[10 literals], words:[10 literals], instruction, genderPolicy}`. **Notation is a literal table, not a pattern**: `calendar.js ordinal()` (m) returns `plain` for es/pt/it and `1er` then a bare number for fr (right for DATES, wrong here), and its `sv` style gives `1:e` where Swedish writes **1:a, 2:a, 3:e**; a table costs 10 strings and can never be wrong by construction. Expected literals (the panel authors and may correct): en `1st 2nd 3rd 4th..10th` · de/da/no/fi `1. .. 10.` · nl `1e .. 10e` · sv `1:a 2:a 3:e .. 10:e` · fr `1er 2e .. 10e` · es/pt `1º .. 10º` · it `1º .. 10º`. `calendar.js ordinal()` is used only as a validate-time cross-check where its style matches (en, dot, nl). Baloo 2 coverage of U+00BA / U+00AA: **UNKNOWN, engineer measures** (fallback: render `º` as a superscript `o` in `F.display` if the glyph is missing).
- **Gender.** The chip names a POSITION, so es/pt use the masculine (`el 3º`, "lugar/puesto"), never agreeing with the picture noun; `genderPolicy:'position'`. A panel may set `genderPolicy:'noun'` for face b (write under each picture), in which case the box's expected literal takes the strip noun's vocab gender (`entriesFor` returns `gender`, m) and verify accepts only that form. Data decision, no code fork beyond one lookup.
- **Words** (face c) = citation form: de `erste .. zehnte` (panel: with or without article), fr `premier`, es `primero`, pt `primeiro`, it `primo`, nl `eerste`, sv `första`, da/no `første`, fi `ensimmäinen`; no noun is ever printed beside a word, so nothing agrees. Widest est. fi `ensimmäinen`/`kahdeksas`, de `siebte`: <= 11 chars, fits 228 px at Baloo 26.
- **Instruction** = one literal per face per locale (`i18n/strings.<loc>.json`); the only sentence on the page. en base: "Start at the flag. Find the picture for each ordinal number and make the mark shown." (84 chars). RTL: none.

## 7 Five variation faces (base = a)

All five keep the base byte-identical (a `layout` knob, stamped only when set). `gate-variation-distinct` sees five distinct resolved d2 configs.

**b : Write the Ordinal Under Each Picture (G1, `G1-311+ TBD`, CODE `layout:'write'`).** Query face: "write" / "schreiben" / "escribe" / "skriv" / "kirjoita". `pictureStrip({under:'box'})`: 2 strips of **6** tiles 92 / pic 76 / gap 10 (602 <= 647), box 76x44 dashed under each; panel 10 + 20 + 92 + 6 + 44 + 10 = 182; 2 x 182 + 12 = 376 (rows `minmax(182px,1fr)`, slack opens inside the panels). 12 writes = the G1 items cap (`[6,12]`, `_tokens.js:69`), so d2 shows 1..6 twice over two different line-ups; strip 2 may `start:'right'` in this face only when `mixStart:true` (d3). d1: 1 strip of 5 (tile 100); d3: 2 strips of 8 (16 writes, over the window, recorded, not shipped). Verify: box k = position from the flag, every box present, no box labelled.

**c : Match the Notation to the Word (G1, CODE `layout:'match'`, THEMELESS: `themeAxis:{applicable:false}`, landing `coordinate.theme:''`).** Query face: "ordinal number words" / "Ordnungszahlen Wörter" / "palabras ordinales" / "ordningstal ord". `matchColumns`: left `.ws-match-item--plain` 220 x itemH: `[ordinalChip 32 px, no icon][positionDots n=8]`; right `.ws-match-item` 260 x itemH cream word Baloo 2 700 26, deranged (no fixed point, `lit-vocab-match.js:44` idiom), coral dots. d2 = all of 1..8: itemH = floor((722 - 12 - 7 x 12) / 8) = **78**; d1 = 1..5 (itemH 130, dots on); d3 = 1..10 (itemH 60, `dots:false`, the abstraction step). Stamps `data-lcs-ordinal` both sides; verify: bijection, derangement, right text === `words[k-1]`, dots k === chip k. A themeless spec emits one instance per (level, locale).

**d : Which Position? Write the Ordinal (G1, CODE `layout:'query'`).** Query face: "which position" / "an welcher Stelle" / "en qué lugar" / "på vilken plats". 3 panels: strip 8 tiles 76 / pic 64 / gap 5 (643) + a query row of TWO cells `[pic 56 on white 68][arrow 24][answerBox 64x44]`, gap 40, centred; panel 10 + 20 + 76 + 8 + 68 + 10 = 192; 3 x 192 + 24 = 600. Each query noun is the CLONE of one strip picture (same file), occurs once in its strip; the two queries differ; the six answers are not all equal. Verify re-derives k from `data-lcs-order`. d1 2 panels of 5 + 1 query each (K-legible, still banded G1 for the writing); d3 3 panels of 10 + 2 queries.

**e : Start From the Other Side (K, `K-325+ TBD`, CODE `start`).** Query face: "from the right" / "von rechts" / "desde la derecha" / "från höger". Identical geometry to the base; d2 `startMix:true` -> strips 1 and 3 `start:'right'` (flag at the right edge, arrow pointing left), strip 2 left, so the child must READ the flag on every strip (the reference point is the move); d1 all three right (the pure reversal rung); d3 mixed + 10 tiles. Verify: at least one `right` and one `left` strip at d2/d3, all `right` at d1; targets by the section 4 formula.

**f : Race to the Finish (G1, CODE `layout:'race'`, theme filter `movers`).** Query face: "race" / "Wettrennen" / "carrera" / "course" / "tävling". 6 white lanes h 96, gap 8 (616): `[raceLane track 551][finishLine 16][answerBox 64x44]` (gap 8). Runners = 6 distinct nouns at x values from a 6-slot grid over 60..500 with +-12 jitter, min separation 44 px; the dashed trail from lane start to the runner is the "arrow length" cue; nearest the finish = 1st. Stamps `data-lcs-x`, `data-lcs-rank`; verify: ranks are a permutation of 1..6 consistent with descending x, separations >= 44, six distinct nouns. Theme filter `movers` = animals · zoo animals · farm animals · pets · forest creatures · birds · birds 2 · insects and bugs · dinosaurs · reptiles · vehicles · Things That Fly · ocean life (a fruit does not race); other themes are REFUSED for this face by data (`themeAxis.filter`), recorded per wave. Facing of the art is unknown per picture: the trail carries direction, so a left-facing runner is still ranked by x. d1 5 lanes; d3 8 lanes h 82, pic 56.

Why these five: b/c/d each add ONE notation step (write it, read its word, derive it from a picture); e changes the reference point, the load-bearing cue named by the panel; f is the only face where the ordinal is DERIVED from a measured position, the classic 1st/2nd/3rd-place context. f is the first to cut if the wave needs a sixth data-neutral face, because it is theme-restricted (13 of 50 themes).

## 8 Two alternatives + recommendation

- **Alt A: one strip per instruction** (6 strips of 5, one chip each). Rejected: tiles fall to 56 with 6 x 116 = 696 and every strip is a fresh count from 1, so the child never meets the 6th and 7th positions on one strip.
- **Alt B: written instructions** ("Circle the third one.") instead of chips. Rejected: 11 authored sentences per page, es/pt/fr/it agreement with an unknown picture noun, and it is G1-308 F3's page. The chip + mark icon keeps the base language-free and K.
- **Recommendation:** the base as drawn (3 strips x 2 chips), `flagScale 1.5`, mark set circle/cross/tick, faces b c d e f.

## 9 Risks, mitigations, print check

- **Colour tile on mono print**: no meaning rides on colour anywhere; the target is found by counting. The coral flag prints ~55 % grey but is a filled pennant on a 2 px ink pole with a solid arrowhead; the engineer prints one d2 page in greyscale and confirms the flag reads at 21 px.
- **Start flag unmistakable**: flag + pole + 3 px rule + 12 px head, 1.5x the G1-308 size, always ABOVE the first tile; on reversal faces the whole row mirrors. A ring or dot on the first tile was rejected (it reads as "circle the 1st").
- **`º` glyph** absent from Baloo 2: superscript `o` fallback (section 6). **sv 1:a/2:a**: literal table. **es/pt gender**: `genderPolicy` (section 6).
- **Colour on colour art**: `colour` refused unless the theme is BW (verify asserts).
- **Two right answers**: impossible by construction (one noun once per strip; chips distinct; race x separated).
- **Density**: K pic 72 (d3 56 = floor); G1 pic >= 56; every stack <= 722 (612 / 376 / 722 / 600 / 612 / 616); no text under 9 px (smallest = Baloo 26 words). QA content: the strip root and every lane stamp `[data-ws-content]` (`qa/lints.js:32`, m).
- **Hub**: 6 faces x 11 locales = 66 rows under `ordinal-numbers` (base + e at K, b c d f at G1; c themeless); refusals (f on non-mover themes) lower the expectation explicitly; gate `scripts/verify-hub-type-rows.js`.

## 10 Summary

1. Base = 3 line-ups of 7 pictures with a 1.5x coral start flag + arrow, 2 chips each (`3.` + a mark icon); language-free apparatus, K.
2. `pictureStrip` is REUSED from G1-308 with additive `start / flagScale / under` options; new = `ordinalChip`, `markIcon`, `positionDots`, `finishLine`, `raceLane`.
3. Notation and words are 10-literal tables per locale in `data/b3/ordinals.js` (`calendar.js ordinal()` is wrong for fr/es/pt/it/sv ordinals); chips stamp the NUMBER, verify re-derives the tile from `data-lcs-order` + `data-lcs-start`.
4. Faces: b write notation (G1) · c notation-word match (G1, themeless) · d which position (G1) · e start from the right (K) · f race finish order (G1, mover themes only).
5. Open for the engineer: Baloo 2 `º` coverage, d3 K pic 56 at the floor, one greyscale print of the flag.
