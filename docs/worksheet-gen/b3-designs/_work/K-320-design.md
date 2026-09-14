# K-320 `ordinal-numbers` : design (studio A+B, 2026-09-14)

(m = measured in the repo.) Body budget **722** (README ruling); page inner 675; `.ws-lane` with inline `padding:10px 12px` -> inner **647** (G1-308, m). `apps['ordinal-numbers']` ABSENT from `topics-taxonomy.json` (grep = 0, m): register `{default_subject:'math', default_age_range:'5-7', exercise_type_axis_key:'ordinal-numbers'}` + slug/name x11. Level keys from `LEVEL_KEYS` (`gen-b2var-landings.js:112-124`, m).

**Boundary.** K-320 owns the ordinal NOTATION and WORD over a line-up with a marked start. G1-308 F3 ("First, Second, Between") owns ordinal cues inside a READ sentence; K-064..067 own position words; number-charts own cardinal sequences. Nothing here prints an imperative sentence on the apparatus; nothing there prints `3.` / `3rd`.

## 1 Page concept (base, K)

Three cream line-up panels, one under the other. Each panel: a coral **start flag + arrow** above, seven white picture tiles in a row, a dotted mark band below, then TWO instruction chips `[ 3. ][mark icon]`. The child starts at the flag, counts to the chip's ordinal and makes the mark the icon shows (ring / cross the tile, tick in the band). Tiles carry no word or numeral; the chips are the only text, so the apparatus is identical in all 11 locales except the notation glyph. Mark set on colour art = **circle, cross, tick** (G1-308 ruling: colour art cannot be coloured); `colour` is legal ONLY on a BW theme (`themeAxis:{applicable:true, minNouns:10}`; a wave decision, no face rides on it).

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
- Grid `repeat(3, minmax(196px,1fr)); gap 12`; each panel `flex-column; justify-content:space-between`, so slack (110 at 722) opens between strip and chip row, never in the tiles.
- Tiles: 7 x 84 + 6 x 8 = 636 <= 647, centred; white, r 10, border 2 creamDeep, `.ws-icon` **72** (K floor 56, `_tokens.js:68`); no rotation, caption, size or opacity difference.
- Arrow row: G1-308 `startArrow` at `flagScale 1.5` (pennant 15x21 coral, pole 2 px ink, rule 3 px, solid head 12 px): direction survives mono print by SHAPE.
- Chip row: two `ordinalChip` pills, gap 24, centred: white pill h 44, padding 0 14, Baloo 2 700 **28** teal notation (widest `10th`/`10:e` ~ 62 px) + `markIcon` 32, gap 8 -> ~130 px each.
- d1: 5 tiles 100 / pic 84 / gap 12 = 548, panel 212. d3: 10 tiles 62 / pic **56** / gap 3 = 647 (the K floor exactly; engineer confirms legible at 14.8 mm), panel 174.
- G1 faces write in a 44 px `answerBox` under each tile (section 7b); the band is dropped there.

## 3 Ladder (resolved config keys; guards key on these)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| strips / n / tile / pic / gap | 3 / 5 / 100 / 84 / 12 | 3 / 7 / 84 / 72 / 8 | 3 / 10 / 62 / 56 / 3 |
| ordinals sampled from | 1..5 | 1..7 | 1..10 |
| chips per strip / actions | 2 / circle cross | 2 / circle cross tick | 2 / circle cross tick |
| page ordinal rule | 6 chips over 5 values: no value 3x, includes 1 and 5 | 6 pairwise distinct, includes 1 and one of {6,7} | 6 pairwise distinct, includes 1 and 10 |
| chipPx / pill h | 30 / 48 | 28 / 44 | 26 / 44 |

"last" / "second-to-last" at d3 = the chips `10.` / `9.`; the WORDS are on no face (`last` beside `10.` = two right answers). Recorded, not built.

## 4 Answer-hiding + uniqueness

- Strip root `<div class="ws-lane" data-ws-content data-lcs-strip data-lcs-order="cat,dog,pig,..." data-lcs-start="left|right" data-lcs-n="7">`; tiles `data-lcs-idx data-lcs-noun`. Order = `rng.shuffle(sampleEntries(rng, entriesFor(theme,loc), n))`: **every noun once per strip**; strips may share nouns.
- Chip `<span data-lcs-chip data-lcs-ordinal="3" data-lcs-action="circle|cross|tick|colour" data-lcs-target="<idx>">` (the NUMBER, never the notation string, so verify is locale-neutral); `data-lcs-notation` carries the literal for the node-side bank check.
- `verify(page)`: per strip `target === (start === 'left' ? k-1 : n-k)`, `1 <= k <= n`, the two chips differ in k AND action, targets disjoint; per page the section 3 rule; no tile carries text, numeral or `alt`; `img.complete && naturalWidth > 0`; no B&W marker in any path (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`) unless `data-lcs-bw="1"`, and `colour` only then. Node-side: every `data-lcs-notation` equals `ORDINALS[loc].notation[k-1]` (poison: a hand-edited `3rd` -> FAIL).
- The reversal face stamps `data-lcs-start="right"`; the same formula fails a strip built left and stamped right (poison both ways).
- Faces b/d/f: `answerBox({answer:k})` stamps `data-lcs-answer` only; `label` empty (`components.js:105`, m), nothing prints.

## 5 Primitives / components

**Reused.** `pictureStrip` from G1-308 (`components-b3.js`) with ADDITIVE options, defaults byte-identical: `start:'left'|'right'` (mirrors the arrow row only), `flagScale:1|1.5`, `under:'band'|'box'|'none'` (`box` = `answerBox({w:tile-16,h:44,answer:k})` under every tile). One strip for both types; **no second strip**. Also `matchColumns` (G1-307 F1), `answerBox`, `.ws-lane .ws-pill .ws-icon .ws-match*` (`page.css:401/422/178/354`), `svgRoot roundedRect circle line el esc`, `entriesFor sampleEntries fileUri`, tokens `T.teal T.coral T.ink T.inkSoft T.grid T.white T.creamDeep`, `F.display`. NOT used: `numberStrip`/`countBadge` (a numeral by a tile leaks the index), `chipRow`, `iconRows` (rotation), `wordTiles`, `pillChoice`, `calendar.js ordinal()` at render.

**NEW in `components-b3.js`.**
- `ordinalChip({n, notation, px=28, icon})` -> `.ws-pill` inline `height:44px;padding:0 14px;gap:8px;color:T.teal` with the notation text and an optional `markIcon`; stamps section 4.
- `markIcon({kind})` 32x32 SVG: a grey mini tile 18x18 (`T.grid`) with the mark ON it: `circle` teal ring r 13 · `cross` coral X · `tick` teal check UNDER the tile (band zone) · `colour` coral-filled tile; all 3 px. The icon shows WHERE the pencil goes; that is the whole legend.
- `positionDots({n, k, dot=10, gap=6})`: a 6 px flag + n grey circles, the k-th coral (face c); restates the notation, leaks nothing.
- `finishLine({h})` 16 px two-column chequer (teal / white, 8 px squares); `raceLane({noun, x, laneW, laneH, pic})`: dashed inkSoft trail from 0 to the runner at x, stamps `data-lcs-x`.

## 6 Locale slot structure

`data/b3/ordinals.js` (the `apply-b2-locale` pattern), per locale `{notation:[10], words:[10], instruction, genderPolicy}`. **Notation is a literal table, not a pattern**: `calendar.js ordinal()` (m) returns `plain` for es/pt/it and a bare number for fr n > 1 (right for DATES, wrong here), and its `sv` style gives `1:e` where Swedish writes **1:a, 2:a, 3:e**. Expected literals (panel-authored): en `1st 2nd 3rd 4th..10th` · de/da/no/fi `1. .. 10.` · nl `1e .. 10e` · sv `1:a 2:a 3:e .. 10:e` · fr `1er 2e .. 10e` · es/pt `1º .. 10º` · it `1º .. 10º`. Baloo 2 coverage of U+00BA / U+00AA: **UNKNOWN, engineer measures** (fallback: a superscript `o`).
- **Gender.** The chip names a POSITION (es/pt `3º`, "lugar"), never agreeing with the picture noun: `genderPolicy:'position'`. A panel may set `'noun'` for face b, then the expected literal takes the strip noun's vocab gender (`entriesFor` returns `gender`, m). Data decision, one lookup.
- **Words** (face c) = citation form (de `erste`, fr `premier`, es `primero`, pt `primeiro`, it `primo`, nl `eerste`, sv `första`, da/no `første`, fi `ensimmäinen`); no noun is printed beside a word, so nothing agrees. Widest est. fi `ensimmäinen` <= 11 chars, fits 228 px at Baloo 26.
- **Instruction** = one literal per face per locale (`i18n/strings.<loc>.json`). en base: "Start at the flag. Find the picture for each ordinal number and make the mark shown." (84). RTL: none.

## 7 Five variation faces (base = a)

All five are CODE faces (a knob stamped only when set; base byte-identical); five distinct resolved d2 configs.

**b : Write the Ordinal Under Each Picture (G1, `G1-311+ TBD`, CODE `layout:'write'`).** Query face: "write" / "schreiben" / "escribe" / "skriv" / "kirjoita". `pictureStrip({under:'box'})`: 2 strips of **6** tiles 92 / pic 76 / gap 10 (602), box 76x44 under each; panel 182; 2 x 182 + 12 = 376 (`minmax(182px,1fr)`). 12 writes = the G1 items cap (`[6,12]`), so d2 shows 1..6 over two different line-ups. d1: 1 strip of 5 (tile 100); d3: 2 strips of 8 (16, over the window, recorded). Verify: box k = position from the flag, no box labelled.

**c : Match the Notation to the Word (G1, CODE `layout:'match'`, THEMELESS: `themeAxis:{applicable:false}`, landing `coordinate.theme:''`).** Query face: "ordinal number words" / "Ordnungszahlen Wörter" / "palabras ordinales" / "ordningstal ord". `matchColumns`: left `.ws-match-item--plain` 220 x itemH `[ordinalChip 32, no icon][positionDots n=8]`; right `.ws-match-item` 260 cream, word Baloo 2 700 26, deranged (`lit-vocab-match.js:44` idiom). d2 = 1..8, itemH = floor((722 - 12 - 84) / 8) = **78**; d1 = 1..5 (itemH 130); d3 = 1..10 (itemH 60, `dots:false`, the abstraction step). Verify: bijection, derangement, right text === `words[k-1]`, dots k === chip k.

**d : Which Position? Write the Ordinal (G1, CODE `layout:'query'`).** Query face: "which position" / "an welcher Stelle" / "en qué lugar" / "på vilken plats". 3 panels: strip 8 tiles 76 / pic 64 / gap 5 (643) + a query row of TWO cells `[pic 56 on white 68][arrow 24][answerBox 64x44]`, gap 40; panel 192; 3 x 192 + 24 = 600. A query = the CLONE of one strip picture (same file, once in its strip); the two queries differ; the six answers are not all equal; verify re-derives k from `data-lcs-order`. d1 2 panels of 5, 1 query; d3 3 panels of 10, 2 queries.

**e : Start From the Other Side (K, `K-325+ TBD`, CODE `start`).** Query face: "from the right" / "von rechts" / "desde la derecha" / "från höger". Base geometry; d2 `startMix:true` -> strips 1 and 3 `start:'right'` (flag at the right edge, arrow pointing left), strip 2 left, so the child must READ the flag every time (the reference point is the move); d1 all right; d3 mixed + 10 tiles. Verify: both start values present at d2/d3, all `right` at d1.

**f : Race to the Finish (G1, CODE `layout:'race'`, theme filter `movers`).** Query face: "race" / "Wettrennen" / "carrera" / "course" / "tävling". 6 white lanes h 96, gap 8 (616): `[raceLane 551][finishLine 16][answerBox 64x44]`, gaps 8. Six distinct nouns at x from a 6-slot grid over 60..500, +-12 jitter, separation >= 44; the dashed trail is the "arrow length"; nearest the finish = 1st. Stamps `data-lcs-x`, `data-lcs-rank`; verify: a permutation of 1..6 consistent with descending x, separations, distinct nouns. Theme filter `movers` = animals · zoo animals · farm animals · pets · forest creatures · birds · birds 2 · insects and bugs · dinosaurs · reptiles · vehicles · Things That Fly · ocean life; other themes REFUSED by data, recorded. Art facing is unknown: the trail carries direction. d1 5 lanes; d3 8 lanes h 82, pic 56.

Why these five: b/c/d each add ONE notation step (write it, read its word, derive it from a picture); e moves the reference point, the panel's load-bearing cue; f is the only face where the ordinal is DERIVED from a position, the 1st/2nd/3rd-place context. f is the first to cut (13 of 50 themes).

## 8 Two alternatives + recommendation

- **Alt A: one strip per instruction** (6 strips of 5). Rejected: tiles fall to 56 (6 x 116 = 696) and every strip restarts at 1, so no strip reaches the 6th or 7th.
- **Alt B: written instructions** instead of chips. Rejected: authored sentences x11, es/pt/fr/it agreement with an unknown noun, and it is G1-308 F3's page.
- **Recommendation:** the base as drawn (3 strips x 2 chips), `flagScale 1.5`, mark set circle/cross/tick, faces b c d e f.

## 9 Risks, mitigations, print check

- **Mono print**: no meaning rides on colour; the target is found by counting. The coral flag prints ~55 % grey but is a filled pennant on an ink pole with a solid head; the engineer prints one d2 page greyscale and confirms it reads at 21 px.
- **Start flag unmistakable**: 1.5x the G1-308 size, always ABOVE the first tile, the whole row mirrored on reversal. A ring on the first tile was rejected (it reads as "circle the 1st").
- **`º` glyph** absent from Baloo 2: superscript `o` fallback (section 6). **sv 1:a/2:a**: literal table. **es/pt gender**: `genderPolicy` (section 6).
- **Colour on colour art**: `colour` refused unless the theme is BW (verify asserts).
- **Two right answers**: impossible by construction (one noun once per strip; chips distinct; race x separated).
- **Density**: K pic 72 (d3 56 = floor); G1 pic >= 56; stacks 612 / 376 / 722 / 600 / 612 / 616 <= 722; smallest text Baloo 26. Every strip root and lane stamps `[data-ws-content]` (`qa/lints.js:32`, m).
- **Hub**: 6 faces x 11 = 66 rows (base + e at K; b c d f at G1; c themeless); f's theme refusals lower the expectation explicitly; gate `scripts/verify-hub-type-rows.js`.

## 10 Summary

1. Base = 3 line-ups of 7 pictures with a 1.5x coral start flag + arrow, 2 chips each (`3.` + a mark icon); language-free apparatus, K.
2. `pictureStrip` is REUSED from G1-308 with additive `start / flagScale / under` options; new = `ordinalChip`, `markIcon`, `positionDots`, `finishLine`, `raceLane`.
3. Notation and words are 10-literal tables per locale in `data/b3/ordinals.js` (`calendar.js ordinal()` is wrong for fr/es/pt/it/sv ordinals); chips stamp the NUMBER, verify re-derives the tile from `data-lcs-order` + `data-lcs-start`.
4. Faces: b write notation (G1) · c notation-word match (G1, themeless) · d which position (G1) · e start from the right (K) · f race finish order (G1, mover themes only).
5. Open for the engineer: Baloo 2 `º` coverage, d3 K pic 56 at the floor, one greyscale print of the flag.
