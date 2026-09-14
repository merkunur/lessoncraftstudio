# K-322 `seasons`: page design (studio A+B, 2026-09-14)

Read: brief, `_SUBSTRATE.md`, README rulings, `_PANEL-FINDINGS §18`, `_work/K-322-pedagogy.md` (the contract), the K-319 / K-321 / G1-307 / G1-308 FINAL files, `page.css`, `components*.js`, `card-grid.js`, `_svg.js`, `trace-path.js`, `science-category-sort.js`, `_tokens.js`. Looked at `out/dev/K-240-fruits-d2-en.png`, `out/b2-sweep/K-287-fruits-d2-en.png`, and a 28-picture contact sheet (4 icon pictures + 24 markers) at 184 px colour and 88 px greyscale (scratch `k322-sheet.png` / `k322-mono.png`, sharp over `cache/themes-512`). (m) = measured; *est.* = engineer re-measures in the real pipeline (README font trap: every px width here is a blank-page lower bound plus 6 %). No em-dashes.

## 1 Page concept (base)

"Four Seasons Sort", the sandwich. Four season SIGNS stand in a row across the middle: white cards, teal frame, a language-free SVG icon over the season name. Four pictures sit above and four below on cream tiles, each with one coral dot on the edge facing the signs; the child draws one pencil line per picture from its dot to its sign. Nothing else is printed. Two pencil decisions: (a) the sign has NO dashed open top (a bucket opening upward makes the lower row's lines arrive at its base): it is a rounded sign, solid teal all round, icon + name block centred VERTICALLY, so lines from above and below land symmetrically; (b) a tile stands over its own sign at most once per row.

Icons are pure SVG (`seasonIcon`, §5): a glyph cannot be a sortable item (the leak is structurally impossible), it is token-palette, and it stays legible at 40 px in mono by SILHOUETTE, where the picture snowflake and sun both blur into pale radial marks (`k322-mono.png`, read).

## 2 Layout, d2, body 722 (inner 675: `.ws-page` padding 14, m)

```
y 0     [tile 112]      [tile 112]      [tile 112]      [tile 112]     top row, dot on BOTTOM edge
                o               o               o               o
y 112   ................ line zone 169 (215 at 814) ...............
y 281   +--------+  25  +--------+  25  +--------+  25  +--------+
        |   *    |      |   *    |      |   *    |      |   *    |    seasonBin 150 x 160
        | Winter |      |Frühling|      | Sommer |      | Herbst |    icon 40 + 6 + name 22 (line 28) centred
        +--------+      +--------+      +--------+      +--------+
y 441   ................ line zone 169 ..............................
                o               o               o               o
y 610   [tile 112]      [tile 112]      [tile 112]      [tile 112]     bottom row, dot on TOP edge
y 722
```
- Bins at x 0 / 175 / 350 / 525 (4 x 150 + 3 x 25 = 675). Tiles centred on the bin centres 75 / 250 / 425 / 600: a row = 4 x 112, gaps 63, `margin 0 19px`.
- `markerTile` 112 x 112: cream `#FBF3E4`, border 2 creamDeep, r 14; `.ws-icon` 88 centred, NO rotation (a tilted snowman is falling); coral dot 12 with a 2 px white ring (the `sci-dot` idiom) centred on the bin-facing edge, protruding 7 px. Stamps `data-lcs-item="<theme>/<noun>"` `data-lcs-season`.
- `seasonBin` 150 x 160: `T.white`, border 3 `T.teal`, r 16; `seasonIcon({px:40})` + 6 + name Baloo 2 700 **22** `T.teal` nowrap; 43 px free above and below; coral dot 12 on the top-edge and bottom-edge centres (targets); `data-lcs-bin`. Widths at 22 *est.* (10.6 px/glyph, K-321 m): `Primavera` / `Printemps` 95, `Frühling` 85, `efterår` 74; +6 % = 101 <= inner 144 minus 16 padding = 128.
- Stage `<div class="ws-seasonstage" data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;min-height:0;padding:2px 0">` = row, bins, row. Fixed 112 + 160 + 112 = 384; the zones absorb the slack ((722 - 384) / 2 = 169; 215 at 814). Scoped CSS inline; `page.css` untouched; `[data-ws-content]` satisfies the blank lint.
- Longest line: column 1 to bin 4 = dx 525 x dy 169; lines cross lines, never a picture or a sign.

**d1 / d3.** d1: 4 items, rows 2 + 2, tiles 124 (icon 100), 120 px gaps. d3: 12 items, rows 6 + 6, tiles 84 (icon 64 >= K 56), 6 x 84 + 5 x 20 = 604, no column alignment; `writeNames:true` swaps the name for `writingRow({w:126, h:52, glyphH:40, xHeight:true})` under the icon (bin 150 x 190; 84 + 190 + 84 = 358, zones 182). The pedagogy's third row is dropped (it would sit in the lower row's line path).

## 3 Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| perBin / items | 1 / 4 | 2 / 8 | 3 / 12 |
| rows top + bottom | 2 + 2 | 4 + 4 | 6 + 6 |
| tile / iconPx | 124 / 100 | 112 / 88 | 84 / 64 |
| maxAlignedPerRow | 1 | 1 | off |
| writeNames / binH | false / 160 | false / 160 | true / 190 |

Guards key on `perBin` `writeNames` `maxAlignedPerRow`, never the level index.

## 4 Answer-hiding + uniqueness

- **Truth = the pool table** (`data/b3/seasons.js`, pedagogy §D): each `(theme, noun)` in exactly one pool. Tiles carry the season only as `data-lcs-season`; no tile prints a word; bins print icon + name; bins are empty; all tiles cream (no colour hint).
- **Base shuffle:** both rows `rng.shuffle` until (a) neither row is a rotation of `cycle`, (b) no row single-season, (c) <= `maxAlignedPerRow` tiles per row over their own bin, (d) no noun twice. `verify(page)`: 4 `[data-lcs-bin]` = `cycle` in order; every item season in that set; each season receives exactly `perBin`; (a)-(d) re-derived from DOM order; tiles >= 56; `img.complete && naturalWidth > 0`; no localized B&W marker in `src`. Node gate: every item's season === the bank's pool; none in `k207`.
- **F1:** 3 markers = distinct nouns of ONE season; choice row = the 4 glyph tiles in `cycle` order on every card (`data-lcs-choice`); card `data-lcs-answer`; d2 answers = a permutation of the 4 seasons.
- **F2:** `data-lcs-slot` clockwise = `cycle` rotated with `cycleStart` at N; exactly `given` filled; bank = the other 3 keys, order != clockwise; unique by construction.
- **F3:** exactly one intruder per row; majority season has >= 3 pooled items in the locale; odd index not constant; d2 majorities = the 4 seasons.
- **F4:** tile `data-lcs-month="<0-11>"` `data-lcs-season` === `SEASONS[loc].monthSeason[i]`; 3 per season at d2; legend = 4 distinct `codeColors`.
- **F5:** open-ended; one empty `[data-lcs-open]` per card is a lint, no verify.

## 5 Primitives / components

**Reused (exact):** `cardGrid({cards, cols, rows})` (`card-grid.js:7`; card 330, padding 12 + border 2, stage `padding 6 4` -> inner 294, K-319 m) · `.ws-card .ws-card-badge .ws-card-stage .ws-lane .ws-icon` · `writingRow` (`trace-path.js:681`) · `answerBox` (`components.js:105`, F4 d3) · `svgRoot roundedRect circle line label` (`_svg.js`) · `fileUri` · tokens `T.teal T.coral T.coralSoft T.tealSoft T.creamDeep T.white T.ink T.grid`, `codeColors.codeBlue codeGreen codeYellow codeOrange`, `F.display F.body` · `data/color-words.js` · `data/b2/calendar.js NAMES[loc].monthNames` · G1-308 `drawBox` (pt-BR F5). **NOT used:** `makeScienceCategorySort` (69 px items wrap at 8, 42 px at 12) · `.ws-bin` (dashed open top, max-width 260) · `colorLegend` (no icon slot) · `pillChoice` · `iconRows` (rotation) · `matchColumns`.

**NEW in `templates/components-b3.js`** (scoped inline CSS):
- `seasonIcon({season, px=40, badge=false})` -> `svgRoot` viewBox 64, `data-lcs-icon`, `aria-hidden`; `badge` adds a `T.white` disc r 30. Stroke `T.teal`, round caps:
  - winter: six arms (32,32) to r 27 every 60 degrees, stroke 3.5; two 7-unit branch ticks per arm at r 17, +-55 degrees, stroke 3; centre dot r 3 `T.coral`. Mono: an open star of thin lines.
  - spring: five petal ellipses rx 8 ry 12 at r 12 from (32,24) every 72 degrees, fill `T.coralSoft` stroke `T.coral` 2.5; centre r 6 `T.coral`; stem (32,36)-(32,60) stroke 3.5; leaf ellipse rx 9 ry 5 at (23,50) rotated -35, fill `T.tealSoft`. Mono: round cluster on a stem.
  - summer: disc r 13 fill `T.coral`, no stroke; eight rays r 18 to r 27 every 45 degrees, stroke 3.5. Mono: the only solid disc, with spokes.
  - autumn: five-lobe maple path, tips (32,6) (10,20) (54,20) (16,46) (48,46), notches at r 14, base (32,50); fill `T.coralSoft` stroke 2; midrib + two side veins stroke 2; stem (32,50)-(32,62) stroke 3.5. Mono: a pale lobed shape with dark interior lines.
- `markerTile({theme, noun, key, px=88, tile=112, dot:'bottom'|'top'|'none'})` · `seasonBin({key, name, w=150, h=160, iconPx=40, namePx=22, writeLane=false})` · `seasonSortStage({top, bins, bottom})` (§2).
- `markerRow({items, px=88, gap=14})`: bare `.ws-icon`s, no tile, `data-lcs-marker`.
- `seasonChoiceRow({keys, px=56, tile=68, gap=6})`: white squares r 10, border 2 creamDeep (the K-319 `faceTile` idiom, 6 px ring reserve), one `seasonIcon` each, `data-lcs-choice`.
- `oddRow({items, px, tile, gap})`: a `.ws-lane` (inline `padding:10px 16px`, inner 639) with a badge and N `markerTile`s, `dot:'none'`.
- `seasonLegend({entries:[{key, name, color, colorWord}]})`: `flex-wrap`, gap 10 x 28; entry = `seasonIcon` 32 + name Baloo 2 700 18 + swatch 22 r 5 (`codeColors[color]`, stroke `T.ink` 1) + the colour WORD Nunito 800 17; `data-lcs-legend` `data-lcs-color`.
- `monthTile({index, name, season, w=200, h=88, mode:'circle'|'write'})`: cream tile r 12, name Baloo 2 700 22 left (`padding 0 16`), right a 36 px empty circle stroke `T.grid` 2, or `answerBox({w:120, h:40})`.
- `modelBank({keys, px=56, tile=100, gap=24})`: white tiles 100 x 96, `seasonIcon` 56 + name 16, `data-lcs-model`.

**NEW primitives:** `primitives/season-wheel.js seasonWheel({d=440, slots:[{key, given}]})`: ring stroke 4 radius d/2 - 60; four slot circles d 110 centred ON the ring at N E S W; given = fill `T.tealSoft` stroke 3, `seasonIcon` 56 + name Baloo 2 700 18; empty = `T.white`, dashed `T.coral` 2.5 (the `.ws-blankbox` idiom), nothing inside; four clockwise arc arrows on the ring (+18 to +72 degrees of each quadrant, head 10); `data-lcs-slot`, `data-lcs-given`. `primitives/bare-tree.js bareTree({w=260, h=250})`: trunk rounded rect 22 wide y 130-250 stroke 3 fill white, six tapering quadratic branches, ground line y 246 `T.grid` 1.5; `data-lcs-open`.

## 6 Locale slot structure

- Season names = literals `SEASONS[loc].names[key]`, printed VERBATIM on bins, wheel slots, legend, F5 headers: de / en Capital; es pt it fr nl sv da no fi lowercase; sv/no `vår` `vinter` and da `forår` INDEFINITE on pills, never `våren` `hösten` `efteråret`; fi NOMINATIVE on pills. Validator: `/^[\p{L}' ]+$/u`, <= 12 glyphs, width at 22 <= 128 rendered.
- No frame receives a season word: instructions and F5 d3 captions are whole sentences per locale (fi `talvella` written out; sv/no never open a sentence with bare `vår`).
- F4: `NAMES[loc].monthNames` in calendar order, casing as stored; colour words `COLOR_WORDS[loc]` from `data/color-words.js` (blue green yellow orange x11, m), as stored.
- pt-BR switch: `model:'temperate-south'` flips `monthSeason` and swaps pools by `override` (pedagogy §C); `faces.tree.figure:'frame'` renders `drawBox({w:260, h:250})` on F5. Icons stay the same four glyphs x11 (a sign, not a marker); `SEASONS[loc].icons` remains a data knob for a per-locale swap to Alt C pictures.
- RTL: none.

## 7 Variation layout deltas (CODE faces: `layout` knob + `verify()` branch; base byte-identical)

- **F1 which** (K): `cardGrid({cols:2, rows:2})`, stage 294 x 314: `markerRow` 3 x 88 + 28 = 292 wide; + 16 + `seasonChoiceRow` 4 x 68 + 18 = 290; stack 172, stage-centred; no text on cards. d1 2 choices (winter / summer), markers 2 x 100; d3 `rows:3`, stage 191: 78 + 12 + 68 = 158.
- **F2 wheel** (K): `seasonWheel({d:440})` + 24 + `modelBank` (348 x 96) = 560 <= 722. **Act = copy the sign** into each empty slot in cycle order. A line act was rejected on geometry: with three movable targets on a four-point ring, one empty slot always lies behind another slot or the given for every bank position (bottom row, side column, corners, in-hub triangle all checked). d1 `given:2` (N + S), bank 2; d3 `givenIcon:false`.
- **F3 odd** (K): `grid-template-rows:repeat(4, minmax(140px,1fr)); gap:10px; flex:1 1 auto` (590 floor, rows 173 at 722); `oddRow` 4 tiles 116 (icon 96) gap 24 = 536 <= 639; cross out the intruder. d1 3 tiles, icon 100; d3 5 x 5, icon 72, tile 92, rows minmax(112, 1fr).
- **F4 months** (G1): `seasonLegend` (wraps to 2 lines x11, ~80 tall *est.*) + 14 + `monthTile` grid 3 cols x 4 rows, tiles 200 x 88, gap 12 x 30 (660 x 388); total ~482 <= 722; `marraskuu` 105 + 36 + 48 = 189 <= 200 (K-321 m). A grid row is Jan-Mar, never one season (Dec-Feb straddles), so no row leaks. d1 4 tiles 300 x 120; d3 `mode:'write'`.
- **F5 tree** (K): `cardGrid({cols:2, rows:2})`: header `seasonIcon` 36 + name 20 (h 40) + 10 + `bareTree` 250 = 300 <= 314, cards in `cycle` order. d1 2 cards, tree 300; d3 `caption:true` adds `writingRow({w:260, h:52, glyphH:40})`, tree 200.

## 8 Alternatives + recommendation

- **Alt A: one 8-picture strip over four bottom bins** (the factory silhouette fixed at 8 x 76 = 608 + 63, icons 64). Crossing-free, every line into a bucket. Rejected: 64 px on a page with room for 88, a 400 px reach to the far bin, and it is the shape of K-207.
- **Alt B: `.ws-match` two columns** (8 tiles left at itemH 78, four tall bins right). Rejected: 8 rows of 64 px read as a ladder; four seasons stacked lose the side-by-side chart image.
- **Alt C: picture icons** (`winter/snowflake` `spring/flower` `weather/sun` `thanksgivinng/autumn`). Friendlier colour, but each needs a validator reservation, `flower` / `sun` are near-twins of `tulip` and the excluded `sun` marker, and in greyscale snowflake and sun both blur (`k322-mono.png`). Fallback only: swap `seasonIcon` for a 40 px `.ws-icon`; nothing else moves.
- **Recommendation:** the sandwich with SVG signs (§1-2); copy-the-sign on the wheel (§7).

## 9 Risks, mitigations, print check

- **Sandwich metaphor:** solid sign, label centred, target dots on both edges; instruction says "from the dot to the box". Engineer prints one d2 mono and draws the 8 lines in HB.
- **Alignment cue:** `maxAlignedPerRow:1` verified from DOM order; 20-seed sweep asserts no row over its own bins.
- **Widths:** all *est.*; the validator measures pills at 22 in `render/one.js`, FAIL above 128.
- **F2 copy act:** models are 56 px glyphs with names; graded by `data-lcs-slot` key, not likeness.
- **pt-BR snowflake:** a sign on a no-snow winter; the BR pool never shows snow; panel confirms or swaps via `SEASONS.pt.icons`.
- **Palette:** cream, creamDeep, white, teal, tealSoft, coral, coralSoft, ink, grid, + 4 `codeColors` on F4 only; smallest text 16 >= 9.
- **Print check, mono:** the four glyphs differ by silhouette class (open line-star / cluster on a stem / solid disc with spokes / pale lobed shape with veins); engineer renders them at 40 and 56 greyscale for the critic. The 24 markers at 88 greyscale all keep identity (`k322-mono.png`); `winter/ice` (a pond) is weakest, d3 only. **F4 greyscale:** blue / green / yellow / orange are `codeColors` >= 12 % apart in lightness (`_tokens.js:37-39`, m) and the colour WORD sits beside every swatch, so a mono copy still reads "blau"; the legend is the only place colour carries meaning on any face.

## 10 Summary

1. Base = a sandwich: four white season signs (SVG icon 40 + name 22, 150 x 160) across the middle, four 112 px picture tiles above and four below, 169 px line zones, one line per picture from a coral dot to a sign; slack absorbed 722 to 814.
2. Icons are token SVG glyphs (`seasonIcon`), never pictures: no icon can be a sortable item, all four survive greyscale.
3. Ladder 4 / 8 / 12 pictures at 100 / 88 / 64 px; d3 adds a 40 px write lane; guards key on `perBin` `writeNames` `maxAlignedPerRow`.
4. F1 circle one of four glyph tiles under three markers; F2 a 440 px wheel, one given, copy three model signs into the empty slots; F3 four lanes of four, cross out the intruder; F4 legend with colour WORDS + 12 month tiles in calendar order, pt-BR inverted; F5 four bare trees.
5. Answers live only in `data-lcs-season` / `data-lcs-slot` / `data-lcs-answer` stamps re-derived from the pool table; names, months and colour words are stored literals; nothing is inflected in code.
