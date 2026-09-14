# G2-319 `logic-puzzles` : DESIGN (studio A+B, 2026-09-14)

Read: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, README "Cross-type rulings" (body 722, `coordinate.mode` never null, the font trap), `_PANEL-FINDINGS.md` 19, `_work/G2-319-pedagogy.md` (faces, gender-free frames with the picture inline, fi name-case literals, constructive solver, `SETS.distinct` allowlists ADOPTED; on LAYOUT this file rules, section 8 lists the divergences). Siblings: `G1-310`, `G1-308` (`instructionList`, inline pictures, `truthChips`), `G1-307`. Looked at `out/batchN/G1-158-animals-d2-en.png`, `out/b2-sweep/G2-274-vehicles-d2-en.png`, `G2-279-null-d2-en.png` (lettered grid + mini demo). Code: `page/page.css` (`.ws-page` padding 0 14 -> inner **675**; `.ws-tile`, `.ws-answerbox`, `.ws-pill`), `components.js answerBox:105`, `components-b2.js pillChoice:226`, `primitives/_svg.js`, `primitives/coord-grid.js` (white cells, 1 px `grid` lines, teal 2.5 frame), `types/g1/G1-158` (`data-lcs-cell` + hidden solution, brute-force uniqueness in verify), `types/_shared/picture-equation.js crossoutGroup:27` (coral X path `M7 7l26 26M33 7L7 33`, stroke 5 / viewBox 40, image opacity .85). (m) = measured today with the shell's woff2 loaded from `file://` (`document.fonts`: Baloo 2 700 + Nunito 800 loaded; scratch `g2319-measure.js`, `g2319-widths.tsv`); *est.* = engineer re-measures in `render/one.js`.

**Measured (m).** Longest name per locale, Baloo 2 700 22: it `Francesco` 100.3, es `Valentina` 94.9, no `Theodor` 83.7, da 72.9, fr 72.2, pt 69.0, en/de/nl 60.6, fi 57.1, sv 57.4; Nunito 800 16: `Francesco` 75.0. Clue sentences, Nunito 800 18 + one 32 px inline picture, 9-char name: en neg 253 / holderNot 309 / either 233 / cross 248 · de holderNot 318 / either 249 · fr holderNot 366 / either 214 · fi holderNot 285 / cross 234 / either 248 · es holderNot 283 · pt 275. **Only `holderNot` exceeds 260.** Truth words, Baloo 2 700 20 with 6/18 padding: pt `verdadeiro` 134.5 + `falso` 81.5 (pair 216), es 210.5, nl `niet waar` 120.5.

## 1 Page concept (base)

Two **case files** per page. Each case is a band: the three clues at left as numbered sentence rows (the picture stands in for every noun, so no locale prints a noun), the **elimination grid** at right (name tiles down, pictures across, nine white pencil cells), and under both an **answer strip** where the child circles each child's picture. A wordless `markKey` strip at the top shows the two marks and the crossing rule. White page, white cells, teal frames; coral only for the "not" X, the key and the F3 pictogram. The child crosses, ticks, circles: three visible acts per case, no writing, no drawing.

## 2 Layout + px grid (d2, base F0)

Inner width **675**; body budgeted at **722**; slack goes to the band gap, never the grid.

```
 markKey  675 x 36   [✓][✗]  .........................  [2x2 mini demo: one ✓, three ✗]
                                   gap 12
 +-- band 1 (data-ws-content) 675 x 300 --------------------------------------------+
 | (1) Mia does not have [pic].             |  [   124   ][ 60 ][ 60 ][ 60 ]  hdr 64 |
 | (2) Ben has [pic] or [pic].              |  | Mia     |    |    |    |   row 60  |
 | (3) The child with [pic] is not Leo.     |  | Ben     |    |    |    |   row 60  |
 |   clue column 351, rows minmax(54,auto)  |  | Leo     |    |    |    |   row 60  |
 |                                     gap 20   grid 304 x 244                       |
 |  answer strip 675 x 48: [Mia (p)(p)(p)]  [Ben (p)(p)(p)]  [Leo (p)(p)(p)] 3 x 219 |
 +----------------------------------------------------------------------------------+
                                   gap 20
 +-- band 2  675 x 300  (other names, other pictures) -------------------------------+
```
- **Stack** 36 + 12 + 300 + 20 + 300 = **668 <= 722** (slack 54; at 814 the bands stay 300, the gap grows).
- **Grid** `logicGrid({cell:60, headW:124, hdrH:64})`: 124 + 3x60 = **304** wide, 64 + 3x60 = **244** high. Row header = name tile (white, teal 2 px, r 10, Baloo 2 700 **22** ink, padding 0 10, 104 wide inside the 124 column: `Francesco` 100.3 leaves 2 px a side, engineer confirms in the pipeline). Column header = picture **56** centred in a 60 x 64 cell, no box. Body: white + 1.5 px `grid` interior lines + teal 2.5 px frame r 6; cells `data-lcs-cell="p:r:c"` EMPTY; 60 px = 15.9 mm for a pencil ✓/✗ (G23 floor 36).
- **Clue column** 351 = 675 - 304 - 20; row = `[badge 26 teal circle, Baloo 700 15 white][8][text Nunito 800 18, lh 1.35]` -> text **317**. Inline picture 32 (`vertical-align:middle; margin:0 3px`). Every d2 shape <= 253 (m) -> one line; `holderNot` (d3/F1) reaches 366 in fr -> two lines. Row `minmax(54,auto)`; two lines with pictures on both ~66; worst 3 x 66 = 198 <= 244, so the clues never set the band height at 3x3.
- **Answer strip** `answerBank({pic:36})`: 3 chips of (675 - 16)/3 = **219** x 48; chip = pad 6 | name Nunito 800 16 (<= 75 m) | 8 | three pictures 36 gap 4 (116) | pad 6 = **211 <= 219** in it, roomy elsewhere. Pictures in COLUMN order (every row shows all three: no leak). The child circles one per name; 36 = the G2 floor, 9.5 mm.
- **Why circle, not draw or write (Designer B):** drawing a hamster or spelling `watermelon` turns a reasoning page into an art or spelling task and is ungradeable across 11 languages; the grid's ✓ is the deduction, the circle is the "so Mia has the DOG" moment, readable in mono at a glance. F2/F4 (G3) drop the strip: there the grid IS the answer, as in every published Logical.
- **markKey** 675 x 36, right-aligned, `aria-hidden`, no `data-lcs-*`: `[chip 28 white r 8: teal ✓][6][chip 28: coral ✗][16][mini 2x2 grid 34 x 34, cells 16, one ✓ + three ✗]` = "a ✓ crosses its row and column" without a word (the G2-279 demo precedent).
- **d1** 2 clues per case (`pos` + `neg`), cell **66**, header picture 60, grid 322 x 262, clue column 333, stack 704. **d3** cell 60, `neg` + `holderNot` (two-line rows expected), 668.

**F2 4x4 (G3) at 722.** `logicGrid({cell:60, headW:104, hdrH:64})`, name tiles Baloo 2 700 **18** (`Francesco` *est.* 82 in a 100 tile), header pictures 52: grid 104 + 240 = **344** wide, 64 + 240 = **304** high; clue column 311, text **277**; d2 kinds `neg` + `either` only, every shape <= 253 (m) -> 6 x 36 = 216 <= 304; **no answer strip**. Stack 36 + 12 + 304 + 20 + 304 = **676** (slack 46). d3 adds `holderNot` capped at **2 per case** (composer quota): 4 x 36 + 2 x 66 = 276 <= 304. Fallbacks in order: (1) `hdrH` 60 + pictures 48 -> 668; (2) cell 56 -> grid 328 x 288, stack 644; (3) drop `markKey` -> -48. Never a third case; never a 16-picture bank (4 x 255 = 1020 > 675; two rows = +136 per band -> 856).

**F4 L-grid (G3).** `lGrid({cell:60, headW:124})` = 124 + 180 + 180 = **484** wide, 64 + 180 + 180 = **424** high, centred (names x pets | names x colours; colours x pets below left; bottom right empty). Clues ABOVE in **two columns** of 329 (text 295): 5-6 clues -> 3 rows x 36 = 108 (`cross` 248 / 234 fit one line; d3 `holderNot` <= 2 -> <= 138). No answer strip. Stack 36 + 12 + 138 + 12 + 424 = **622** (slack 100). Fallback cell 56 -> 598.

**F3 picture clues (G1, floors 44/26).** Grid as base (pictures 56, cells 60 >= 44); clue block = 3 `pictureClue` rows 56 high (name tile 16 + picture 48 in a 56 ring); `answerBank({stack:true, pic:44})`: name above three 44 px pictures = 152 x 72, three chips 488 wide; band 244 + 8 + 72 = 324; stack 36 + 12 + 648 + 20 = **716** (slack 6). Fallback: `markKey({compact:true})` 24 -> 704; drop it -> 680. A single-line 44 px bank (3 x 247 = 741) does not fit: rejected.

**F5 true or false (G2).** Solved grid 304 x 244 at left; statements column 351, row `[badge 26][8][text 18][8][glyphChip ✓ 40][6][glyphChip ✗ 40]` -> text **225**; most statements wrap (en 253), rows `minmax(46,auto)` <= 66. Worst 5 x 66 = 330 -> stack 728 > 722: the composer caps **<= 3 two-line statements per grid** (verify asserts `row.clientHeight <= 66`, band <= 300) -> 290 per band, stack **668**; typical (en/de/nl one-liners) ~560.

## 3 Ladder (resolved config; guards on keys, never the level index)

| face | d1 | d2 (ships) | d3 |
|---|---|---|---|
| F0 `size:3` | `clues:[2,2] kinds:[pos,neg]`, cell 66 | `clues:[3,3] kinds:[neg]`, cell 60 | `kinds:[neg,holderNot]` |
| F1 | `kinds:[either,neg]` | `minEither:1 maxPos:1 kinds:[either,pos,neg,holderNot]` | `kinds:[either,holderNot]` |
| F2 `size:4` | `clues:[6,6] kinds:[neg]` | `clues:[4,6] kinds:[neg,either]` | `+holderNot maxHolderNot:2 clues:[6,6]` |
| F3 `mode:'picture'` | 2 picture clues (`pos`+`neg`) | 3, `maxPos:1` | 3 `neg` |
| F4 `mode:'two-attr'` | 6, `maxPos:2` | 5-6, `maxPos:2 minCross:1` | 4, `maxPos:0 minCross:2` |
| F5 `mode:'read'` | 2 x 4 `has/hasNot` | 2 x 5 `+holderIs`, true in [2,3] | `+either` |

## 4 Answer-hiding + uniqueness

- Case root `<section data-ws-content data-lcs-puzzle="p" data-lcs-size="3" data-lcs-kinds="neg" data-lcs-names="2,5,7" data-lcs-pics="dog,cat,rabbit" data-lcs-clues='[{"k":"neg","a":0,"v":2},…]' data-lcs-solution="2,0,1">` (indices only; F4 `data-lcs-solution="np:…;nc:…"`; F5 `data-lcs-solved`). `[data-lcs-cell]` carry no text, `<img>`, path or class; answer chips `[data-lcs-answer-slot="r"]` carry the three `<img>`, no ring, no `data-lcs-answer`; F2/F4 have no answer element.
- **verify()** (browser, stamps only): enumerate all permutations (6 / 24 / 36): **exactly one** satisfies every stamped clue and equals the stamp; **every clue necessary** (drop any -> >= 2 survivors); the **propagation solver** (row/column single-open; F4 + the copy rule) reaches the full solution, else FAIL; each rendered clue contains the stamped name literal (fi `ade` form in `neg|pos|either`, `nom` in `holderNot`) and its `<img src>` file names equal the stamped indices; pictures in `SETS.distinct[theme]`, no `confusable` pair; names distinct; no name or picture shared by the two cases; kinds within `d.kinds`, count within `d.clues`, quotas honoured; layout: clue rows `clientHeight <= 66`, clue column `scrollHeight` <= grid height (F0-F2) or the two-column block <= 138 (F4); band bottom above the footer.
- **F3:** no text node in the clue block; each row = one name tile + one `pictureClue` with `data-lcs-not="1"` (X) or `data-lcs-has="1"` (ring), <= 1 `has`; answer chips list exactly the case's 3 pictures per name, unmarked.
- **F5:** `[data-lcs-mark="1|0"]` form a valid permutation equal to `data-lcs-solved`; each `data-lcs-truth` re-evaluates on it; true count in [2,3]; `nobody` <= 1; no two statements equal; glyph chips carry no fill, ring or `data-lcs-answer`.
- Poisons P1-P12 of the pedagogy stand; add **P13** a cell with a child element ("mark printed"), **P14** an answer chip with `data-lcs-answer`, **P15** an F2 render with a 7th clue row.

## 5 Primitives / components

**Reused as is:** `_svg.js` (`svgRoot roundedRect line circle label el esc`), `answerBox` (the `answer:'box'` fallback only), `.ws-tile` styling (name tiles), `.ws-icon`, tokens `T.teal T.coral T.coralSoft T.ink T.inkSoft T.grid T.white T.cream T.creamDeep`, `F.display F.body`, `entriesFor fileUri` (alt = vocab singular), the coral-X path of `crossoutGroup` (copied; that function lays out a whole group). **Not used:** `cardGrid` (bands, not cards), `pillChoice`/`truthChips` (section 8), `codeList`, `wordTiles`, `numberStrip`, `sceneStage`, `iconRows`, `symGrid`/`coordGrid` (letters or numbers on the axes would be a second reading system).

**NEW `primitives/logic-grid.js`** (SVG on tokens):
- `logicGrid({rows:[{label}], cols:[{src, alt}], cell=60, headW=124, hdrH=64, namePx=22, picPx=56, mode:'blank'|'solved', solved?, puzzle})` -> `{svg, width, height}`. Row headers `roundedRect` white r 10 stroke teal 2 + `label` Baloo 700 `namePx` (`data-lcs-name="i"`); column headers `<image>` `picPx` centred (`data-lcs-pic="j"`); body white + `grid` 1.5 lines + teal 2.5 frame r 6; cells `rect` fill none `data-lcs-cell`. `solved`: teal ✓ (`M14 31l9 9 21-22`, stroke 4, round caps) / coral ✗ (`M14 14l32 32M46 14L14 46`) at 40 % of the cell, `data-lcs-mark`.
- `lGrid({names, pics, colors, cell=60, headW=124})`: three grid bodies sharing one header column, stamped `data-lcs-grid="np|nc|pc"`; the bottom-right quadrant is empty page.
- `markKey({compact=false})` (section 2); `notMark(px)` = the coral X scaled to `px`.

**NEW in `templates/components-b3.js`** (HTML):
- `clueRow({n, html})` -> `[badge][text]`, `data-lcs-clue="i"`; `html` from `fillSlots` with `{pic}` -> `<img class="ws-icon" src alt style="width:32px;height:32px;vertical-align:middle;margin:0 3px" data-lcs-pic="j">`.
- `pictureClue({name, src, not})` -> `[name tile Nunito 800 16][8][ring 56: circle r 26 stroke 2.5 (coral if not, teal if has) + picture 48 (opacity .85 if not) + notMark(56) if not]`, `data-lcs-not|has`.
- `answerBank({rows:[{name, pics}], pic=36, stack=false})`: the chip strip; `stack:true` = name above pictures (F3).
- `glyphChip({kind:'yes'|'no', px=40})`: white circle, teal 2 px border, teal ✓ or coral ✗ inside, `data-lcs-glyph`; the child circles one.

## 6 Locale slot structure

- **Names** from `data/b2/sentences.js names[loc]` (8 per locale, m) via `LP[loc].names` (`{nom}`; fi `{nom, ade, gen}` literals `Aino/Ainolla/Ainon`, `Väinö/Väinöllä`, panel confirms harmony). A 3x3 page draws 6 of 8, a 4x4 page all 8 (sample-or-throw).
- **Frames** whole literals with exactly their slots: `neg/pos` `{name|nameAde} {pic}`; `either` + `{pic}` twice; `holderNot` `{pic} {name}`; `cross/crossNot` `{pic} {pic2}`; `truth` 5 kinds. `{pic}` may open the sentence (de `{pic} gehört nicht {name}.`). `lib/b3-instructions.js fillSlots` gains `{pic} {pic2} {nameAde}` (html-safe: the slot value is the `<img>` markup, the rest escaped). `LP[loc].picSep` (fr ` : `) lives in the frame text, not in code.
- **Nothing else is text:** the grid carries names and pictures only; the "not" pictogram, `markKey` and `glyphChip` are language-free; `i18n/strings.<loc>.json` carries 6 x `{title, instruction}`. Growth (de/fi/pt +30-40 %) lands only in clue rows (two-line reserve) and the instruction (3 lines = the 722 case). No pronoun, article or noun anywhere; the pedagogy's validator bans run on every frame.

## 7 Five variation faces (deltas from the base render)

- **F1 clue kinds (PARAM, G2):** same geometry; a `pos` row and an `either` row (two inline pictures) appear. Data only.
- **F2 4x4 (PARAM + `size` in render, G3, `G3-378+ TBD`):** grid 344 x 304, name tiles Baloo 18 in `headW` 104, pictures 52, 6 clue rows, no answer strip; 676. Verify: 16 cells per case, no `[data-lcs-answer-slot]`.
- **F3 picture clues (CODE, G1, `G1-311+ TBD`):** clue column = 3 `pictureClue` rows (✗ = coral ring + coral X over the picture; has = teal ring); answer strip stacked at 44; the instruction is the only sentence; 716 (compact key 704).
- **F4 two attributes (CODE, G3):** two clue columns above the 484 x 424 L-grid; `cross` rows carry a pet and a `colors` paint drop; no answer strip; 622.
- **F5 true or false (CODE, G2):** grid pre-solved (`mode:'solved'`), 5 statement rows with two `glyphChip`s; the child circles ✓ or ✗; no cells to mark; <= 668.

Hub: 6 landings per locale, `coordinate.mode` = `base | clue-kinds | 4x4 | picture | two-attr | true-false`, level key from the band table; `scripts/verify-hub-type-rows.js` expects 6 rows per key per locale; a refused face (empty frame array) lowers that expectation explicitly.

## 8 Alternatives + recommendation

1. **Clues full-width under the grid:** band 244 + 12 + 162 + 56 = 474, two bands 968 > 722; one case per page = 3 answers (below G2 [8,16]). Rejected on the numbers.
2. **Word chips for F5** (`truthChips`, the G1-308 precedent): pt pair 216 + gap 10 in a 351 column leaves 91 px for a sentence with a picture; statements under the grid cost 2 x 478. Rejected; `glyphChip` ✓/✗ is the grid's own vocabulary and language-free (`richtig/falsch`, `vrai/faux` live in title + instruction = the query face).
3. **Draw-or-write boxes** (`answerBox` 64 x 44 per name): fits (3 x 143 = 429) but ungradeable across 11 languages and a motor task; kept as the `answer:'box'` data fallback if a panel refuses circling (48 -> 44 high, no layout change).
4. **Divergences from the pedagogy (layout):** cell 60 / header 64 / name tiles Baloo 22 in 124 (was 60 / Nunito 16 / 96: `Francesco` needs 100); circle bank (was a draw/write box); F2 and F4 have no answer strip (16 pictures do not fit 675; the grid is the answer at G3); F4 clues in two columns above a 484 L-grid (was one column at 720 of 722); F5 glyph chips (was `pillChoice`); `markKey` strip (the instruction strip is shell chrome, no legend fits there).
**Recommendation:** base as section 2, faces as section 7.

## 9 Risks, mitigations, print check

- **722:** base/F1 668, F2 676, F3 716, F4 622, F5 <= 668. F3 is the tight one (slack 6): `markKey({compact:true})` first, dropping it second; the de/fi/pt renders with a 3-line title + 3-line instruction are the test; the footer lint (`qa/lints.js:50-66`) is the backstop.
- **Clue wrap:** d2 shapes <= 253 (one line), `holderNot` <= 366 (two lines) set the caps; `maxHolderNot:2` in 4x4; verify asserts `clientHeight <= 66` per row and column <= grid. Over the cap = the panel shortens the frame, never code.
- **Confusability at 32 px inline / 36 px bank (8.5 / 9.5 mm) in mono:** only `SETS.distinct[theme]` reaches the page (header picture 56); verify rejects `confusable` pairs; the engineer prints one d2 page per fan theme on a mono laser and any pair that merges leaves the allowlist (data, not layout).
- **Coral X in greyscale:** `#F2784B` prints ~55 % grey over an 85 %-opacity picture; the X is 6-7 px thick at 48-56 and the ring 2.5 px: shape carries the meaning. F5's ✓ and ✗ differ by shape; `markKey` and `glyphChip` likewise.
- **Pencil cells:** 60 px = 15.9 mm, white on `grid` 1.5 px lines (prints light; the teal frame and the headers define the cells regardless).
- **Palette:** cream, creamDeep, white, teal, coral, ink, inkSoft, grid; no new hex. Smallest text 15 >= 9. Every band stamps `[data-ws-content]`.
- **Engineer must measure in the pipeline:** name tiles 22 px in 104 (it/es); the 32 px inline image's line-box growth (assumed <= 36 per line); `Francesco` at Baloo 18 in the 4x4 tile; F3's 716.

## 10 Summary

1. Two case bands: numbered clue rows (Nunito 800 18, pictures inline 32, two-line reserve) beside a 304 x 244 elimination grid (name tiles Baloo 22 in 124, pictures 56, nine empty 60 px cells), an answer strip the child circles; a wordless `markKey`; 668 of 722.
2. NEW `primitives/logic-grid.js` (`logicGrid`, `lGrid`, `markKey`, `notMark`) + `components-b3.js` (`clueRow`, `pictureClue`, `answerBank`, `glyphChip`); `coordGrid`/`cardGrid`/`pillChoice` untouched.
3. Hidden `data-lcs-solution` + index-stamped clues; verify enumerates all permutations (exactly one, every clue necessary, elimination-reachable), cells and chips empty, F3 polarity stamps, F5 solved-grid truths, layout bounds.
4. Faces: F1 kinds (PARAM), F2 4x4 at 676 with no answer strip (G3), F3 picture clues with the coral-X pictogram at 716 (G1), F4 two-column clues over a 484 x 424 L-grid at 622 (G3), F5 solved grid + ✓/✗ glyph chips at <= 668 (G2).
5. Locale data = names (+ fi case literals), whole-literal frames with `{name} {pic} {pic2}`, six title/instruction pairs; no noun, article or pronoun is ever printed, so every clue is gender-free by construction.
