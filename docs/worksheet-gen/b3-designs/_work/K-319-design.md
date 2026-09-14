# K-319 `emotions`: page + layout design (Designer A composition / Designer B child, 2026-09-14)

Read: `_STUDIO-BRIEF`, `_SUBSTRATE`, README cross-type rulings (722 body floor), `_PANEL-FINDINGS §11`, `_work/K-319-pedagogy.md` (the contract), `G1-307-opposites.md`, `G1-308-read-and-do.md`, `page/page.css`, `components-b2.js`, `components.js`, `card-grid.js`, `science-category-sort.js`, `lit-vocab-match.js`, `resolve.js`. OPENED: the six faces + every scene object (present balloon medal teddy_bear thunderstorm bed pillow pajamas moon syringe). **(m)** = puppeteer with the shell's woff2 (scratch `k319-measure.js`, `k319-mono-72.png`). *est.* = engineer measures. No em-dashes.

## 1 Page concept (base)

**"Feelings: Match the Face to the Word."** Six big yellow faces down the left on white tiles, six feeling words down the right on cream tiles in a different order, a coral dot each side; the child draws one pencil line per face. No numbers, no bank, no scene. The picture is read first (K reads pictures before words); the word is the only text decoded (L.K.5). Faces = `emotions/<noun>` webp; words = the panel's citation literals in `data/b3/emotions.js` (never the vocab at render).

## 2 Layout (d2 at the 722 px body floor)

`.ws-page` 703x945, `padding 0 14` -> inner 675 (`page.css:16-26`). Body 722 with 3-line title + 3-line instruction, 814 with one-line chrome. Every stack fits 722; slack is absorbed by `space-around` (base), `minmax` rows (F4) or `flex:1` (F5).

```
.ws-match padding 6 30 -> inner 615 x 710            x: 30 ...................... 645
+----------------+                            +----------------------------+
|  [ face 80 ]   |o ------------------------ o|         surprised          |  item 108
| white 160x108  |                            | cream 260x108, Baloo 2 700 28
+----------------+                            +----------------------------+
      gap 12 (min; grows at 814)      6 x 108 + 5 x 12 = 708 <= 710
left col x 30..190 · right col x 355..615 · dot centres x 210 / 335 (26 px outside the tiles, page.css:388) · line span 125
```
- Left: `.ws-match-item ws-match-item--plain` 160x108 (WHITE: yellow on cream loses contrast, the reverse of K-225), `.ws-icon` 80 centred, `data-lcs-face="<id>"`, dot `--right`. 80 >= 72 (brief) >= 56 (`_tokens.js:68`).
- Right: `.ws-match-item` 260x108 cream, word Baloo 2 700 **28** (line 32), `padding 0 16`, `data-lcs-word="<id>"`. Widest of all 66 words = es `sorprendido` **145.8** (m) <= 228; de `überrascht` 130.7, it `arrabbiato` 129.1, da `overrasket` 127.5, fi `surullinen` 121.4, da `ked af det` 118.2 (one line). The pedagogy's 170 estimate was high.
- No numerals, no printed rings: the child's line is the only mark.
- **d1:** 4 pairs -> itemH floor((722 - 12 - 36)/4) = 168, face 100 in a 180 tile, word 30, pool `happy sad angry tired` (no O-mouth faces). **d3:** 6 pairs, face 72, word 26, left column also shuffled (not a distinct move; recorded).

## 3 Ladder (config keys; guards key on these, never the level index)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| pairs / pool | 4 / `[happy,sad,angry,tired]` | 6 / all `matchable` | 6 / all |
| picPx / tileL / tileR | 100 / 180 / 260 | 80 / 160 / 260 | 72 / 160 / 260 |
| wordPx / itemH at 722 | 30 / 168 | 28 / 108 | 26 / 108 |
| shuffleLeft | false | false | true |

## 4 Answer-hiding + uniqueness

- **Base.** Tiles carry the feeling ID, never the text; the word text exists once. Right order = `rng.shuffle` until no fixed point (`lit-vocab-match.js:44`). `verify(page)`: left ids ⊆ the six accepted; right ids a permutation of left; `right[i] !== left[i]`; word texts distinct; 4 <= pairs <= 8; `img.complete && naturalWidth > 0`; no B&W marker in any `src` (`BW|SW|BN|NB|ZW|SH|PB|MV|SV`); icons >= 72. Node gate `tools/gate-emotions-data.js`: every `[data-lcs-word]` text === `EMOTIONS[loc].feelings[id].word` (poison: `wütend` -> `Wütend` FAILS).
- **F1.** Card `data-lcs-scene="pillow-moon" data-lcs-answer="tired"`, tiles `data-lcs-choice`. `SCENES[id].feeling` is the single truth: exactly one tile equals it; no tile ∈ `alsoPlausible` (present: surprised, excited); tiles distinct; the correct index takes >= 2 of 3 positions; no object twice. **One answer per card with only three cue-able feelings:** cards are independent; the page rule >= 3 distinct correct feelings, each <= ceil(cards/3) = 2, makes d2 = 2 happy + 2 scared + 2 tired, so "ring happy everywhere" fails. Decoys may be any other accepted face minus `alsoPlausible` (sad/angry/surprised are honest wrong answers, never a second right one). A sv/fi `syringe` veto leaves scared one scene -> 5 cards (2+1+2), still >= 4.
- **F4.** Lane `data-lcs-target`, tiles `data-lcs-choice`; exactly one tile === target; d2 distractors ∉ `confusable[target]`; index takes all 3 positions.
- **F3.** Factory verify + every `[data-sci-item]` bin === the bank valence (poison: `tired` in `bad`).
- **F2 / F5** open-ended: no `verify()`, lints only; `data-lcs-word` / `data-lcs-blankface` for the key note.

## 5 Components

**Reused.** `.ws-match .ws-match-col .ws-match-item(--plain) .ws-match-dot(--left/--right)` (`page.css:354-389`) · `cardGrid({cards,cols,rows})` (F1 even counts, F2) · `.ws-card .ws-card-badge .ws-card-stage .ws-lane .ws-icon` · `rulingBlock({rows,w,h,glyphH,starters,gap})` (`components-b2.js:58`; starter Nunito 700 at 0.78 x glyphH, `inkSoft`) · `makeScienceCategorySort` (F3, `exerciseType:'emotions'`, labels from `data.bins[].label.<loc>`) · `matchColumns({left,right,itemH,colW})` (G1-307 §2, `components-b3.js`, absent (m); `colW` becomes `{left:160,right:260}`, each side its own stamp) · `fileUri` (`resolve.js:35`; resolves `toys/teddy_bear` although `vocabKey:null`, so scene objects are asserted by `fileUri`, never `labelSafeNouns`) · tokens `T.teal T.coral T.ink T.inkSoft T.white T.creamDeep`, `F.display F.body`. NOT used: `pillChoice` (text pills, no per-item stamp), `wordBank` (doubles the answer), `answerBox`, `iconRows` (rotation tilts an expression), `displayWord`.

**NEW in `templates/components-b3.js`** (scoped CSS inline, no `page.css` edit):
- `faceTile({noun, px=72, tile=84, key, label=null, labelPx=18})` -> `<span class="ws-facetile" data-lcs-choice>`: white SQUARE tile r 10, border 2 `creamDeep` (the G1-308 strip tile, not a round `.ws-achip`: a printed ring pre-empts the child's ring), `.ws-icon` `px` centred; with `label` 100x108 (face 72, Baloo 2 700 18 under, line 22).
- `faceChoiceRow({faces:[{noun,key}], px=72, tile=84, gap=12})` centred row of `faceTile`.
- `sceneRow({objects:[{theme,noun}], px=88, gap=12})`: 1-2 `.ws-icon` on nothing, `data-lcs-scene-obj`, no rotation.
- `sceneCard({sceneId, objects, faces, answer})` -> `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-ws-content data-lcs-scene data-lcs-answer>` + `sceneRow` + `faceChoiceRow`.
- `sceneGrid({cards})`: flex-wrap centred `.ws-card`s 330x231 gap 14, badges; ONLY for an odd count (the 5-card veto page centres its last card; `cardGrid` would leave a hole).
- `blankFace({d=220})`: SVG circle, `T.teal` stroke 3, no fill, no features, `data-lcs-blankface`.
- `checkInCard({today, faces, draw, because, helps=null, d=220})`: the F5 stack (§7).

## 6 Locale slot structure

- **Word = `feelings[id].word`**, the card citation form (masc. sg es/pt/it/fr, lowercase de, `lei seg` / `ked af det` literals, fi nominative). `wordF` STORED, printed nowhere (`enojado / enojada` is 2 x 95 px at 18, wider than any tile; recorded for a future girl-pictured page). Faces are ungendered balls: nothing agrees.
- **No noun beside an adjective anywhere.** Base/F4/F2: the word stands alone. F1: cards print NO text; the instruction says "how do YOU feel" (first person, ungendered x11). F3: bare adjective labels (`desagradable` **96.3** at 17 px (m) + 32 padding = 128 <= 210 bin). F5: citation words under their own faces (a face is not a noun).
- **F5 literals** `checkin.*`: `today` = a clause whose predicate IS the circled face ("Today I feel …" / "Heute fühle ich mich …" / "Hoy me siento …"; fi writes the idiom, `[NSR]`), `draw` ("Draw your face"), `because` = starter word (`weil` / `porque` / `koska`) or `null` (an empty line where a bare conjunction is wrong), d3 `helps`. The sentence never has an adjective slot; the face is the answer.
- Titles/instructions `strings['K-319']`, `F1..F5` per locale (pedagogy §E), <= 70 / <= 150, no worksheet-word.

## 7 Five variation layout deltas

All K. F1/F2/F4/F5 CODE (`layout` knob + `verify` branch, `data-lcs-face` only when declared, base byte-identical); F3 a factory instance. Card geometry: `cardGrid` gap 14, card w 330.5, padding 12 + border 2, stage padding 6 4 -> stage inner **294** wide.

**F1 scene -> circle the face (`layout:'scene'`).** `cardGrid({cols:2, rows:3})`: card h (722 - 28)/3 = 231 -> stage 294x191. `sceneRow` 88 + 10 + `faceChoiceRow` 84 = **182 <= 191** (265 at 814). Two objects 188 <= 294; three tiles 276 <= 294. Badges 1-6. d1 4 cards 2x2 (objects 110, 2 tiles 100 / face 88); d2 6 cards, 3 tiles; d3 2x4 fails the 72 rule (face 48), so **d3 = 6 cards, 4 tiles** at tile 68 / face 56 (the K floor), gap 8 = 296 vs 294: *est.* engineer trims tile padding 2 px, else 3 tiles + `sad` decoy rotation. Query face "how do you feel".

**F2 draw the face (`layout:'draw'`, open).** `cardGrid({cols:2, rows:2})`: card h 354 -> stage 294x314; word Baloo 2 700 30 (34) + 12 + `blankFace({d:220})` = **266 <= 314** (220 = 58 mm, a whole crayon face). d1 + a 56 px model face beside the word; d2 4 cards, pool `happy sad angry scared` (surprised/tired need brow control a K hand lacks); d3 6 cards 3x2 (stage 191: 34 + 8 + d 140). No verify.

**F3 good or bad sort (factory).** `makeScienceCategorySort({…, data:{bins:[good,bad], items: 9 faces}, difficulty:{1:{perBin:2}, 2:{perBin:3}, 3:{perBin:3}}})`. **perBin 3, not the pedagogy's 4:** the factory sizes items `min(78, floor(648/n) - 12)` (`:82`): 6 items -> **78 >= 72**; 8 -> 69, under the face rule, refused at every level. Strip 6 x 96 + 60 = 636 <= 648; 3 of 4 GOOD (happy merry content excited) + 3 of 5 BAD (sad angry scared capricious disgusted) per seed = the fan lever. Bins 210x185, 17 px labels. `.sci-sort` is `space-between`: strip high, bins at the foot, ~400 px lines (the K-235 look). d3 = bins labelled by a 40 px face (additive `labelHtml` knob; refused -> d3 = d2). Query face "good or bad feelings".

**F4 word -> which face (`layout:'choice'`).** `display:grid; grid-template-rows:repeat(6, minmax(112px,1fr)); gap:10px; flex:1 1 auto` = **722 at the floor**, 127-row at 814. Row = `.ws-lane` inline `padding:8px 16px` -> inner 92 x 639: `[word 220, Baloo 2 700 26, data-lcs-target][16][tiles centred: 3 x 84 + 24 = 276]`; `sorprendido` 135.3 at 26 (m) <= 220; tile 84 in 92. d1 4 rows (173, tile 100 / face 88, 2 tiles); d2 6 rows, 3 tiles, no confusable; d3 4 tiles (608 <= 639), confusables on. Query face "which face".

**F5 check-in (`layout:'checkin'`, open).** Vertical, gap 14:
```
.ws-lane 675x180 : today literal Baloo 2 700 26 (34) + 10 + six faceTile 100x108 (face 72, word 18): 600 + 40 = 640 <= 643
.ws-card 675x292 : draw literal 26 (34) + 10 + blankFace d 220           (flex:1 at 814)
.ws-lane 675x178 : rulingBlock({rows:2, w:643, h:72, glyphH:40, starters:{0:because}, gap:6})   glyphH 40 = K whole-word floor
180 + 14 + 292 + 14 + 178 = 678 <= 722
```
`sorprendido` at 18 = 93.7 *est.* in a 100 tile: the validator asserts the rendered label <= 94 or steps that locale to 17 px. d1 4 faces (tile 120 / face 88); d2 6; d3 + `helps` lane (34 + 8 + one ruling row 72 + 28 = 142), ruling cut to 1 row (106), circle 170 (card 242): **712 <= 722**. No verify. Query face "today".

**Hub visibility contract.** A face appears under `emotions` on `/[locale]/worksheets` IFF `apps.emotions` exists in `topics-taxonomy.json` (ABSENT per the pedagogy), `axes['exercise-type'].emotions` has slug + name x11 (pedagogy §A; all differ from the theme-axis slugs), one landing per face per locale with `coordinate.type === 'emotions'` verbatim + K level key + unique slug + `canonicalDeckSlug`, committed AND deployed. Gate `node scripts/verify-hub-type-rows.js --keys=emotions` (absent (m); write + poison-test first). Expected **66 rows**; a syringe veto changes a card count, never a row.

## 8 Two alternatives + recommendation

- **Alt A: six cards, face + three word pills to circle.** No elimination, but it is F4 turned round, and the en/nl head is "feelings MATCHING": the line scaffold comes first at K. Rejected as base.
- **Alt B: word left, face right (K-225 order).** K-225 decodes a word to find its object; here the face is the stimulus, so it stands on the reading side. One swapped column, not a face. Rejected.
- (Alt C cut-and-paste: the cutting family owns scissors, no verify shape, the page prints its bank. Rejected.)
- **Recommendation:** §2 as drawn; F1 on square tiles; F3 at perBin 3.

## 9 Risks, mitigations, print check

- **scared vs surprised on one d2 base page:** accepted faces per contract; a swap costs two lines, not the page; F4 d2 separates them, d1 base excludes both. No base mitigation by design; recorded.
- **Elimination at base:** the last line is free; that is the scaffold, F4 removes it.
- **Long words:** all 66 measured (m); columns hold the widest by >= 80 px; panel rewrites only shorten.
- **`teddy_bear` `vocabKey:null`:** validator rule 3 asserts `fileUri` on the COLOUR dir `toys` (never `toys bw` / `animals bw`, which also carry it).
- **F3 floor:** `verify-b3-emotions.js` asserts icons >= 72, which FAILS perBin 4; the build uses 3.
- **Palette:** cream, creamDeep, white, teal, coral, ink, inkSoft, grid; smallest text 17 px vs the 9 px lint.
- **Print check (what I saw, `k319-mono-72.png`: the six faces at 72 px greyscale beside colour).** All six stay distinct in mono: meaning rides on the dark line art (brows + mouth), not on yellow or blush. **happy vs sad at 72 px grey: unmistakable** (open toothed grin + raised cheeks vs a full downward arc with inner-raised brows). angry = V brows + the darkest ball (~10 % darker); tired = closed lids + small yawn; scared = gaping dark mouth with teeth + ringed eyes; surprised = small round O + lashes. The hardest mono pair is scared/surprised, the same as in colour: greyscale loses nothing new. Yellow prints ~35 % grey, coral dots ~55 %, 3 px teal circle ~60 %. present, thunderstorm, bed, pillow, pajamas, moon, medal, balloon all read as silhouettes. Engineer prints one d2 base + one F1 on mono laser and rings a face in HB over the white tile (6 px tile margin at 84/72 is the reserve for a visible ring).

## 10 Summary

1. Base = `matchColumns` at 722: six 80 px faces on white left, six shuffled citation words on cream right (Baloo 2 700 28; widest 145.8 in 260), coral dots, 125 px lines, no numerals.
2. Ladder d1 4 pairs / 100 / no O-mouth faces · d2 6 / 80 / all six · d3 6 / 72 / both columns shuffled (recorded, not a face).
3. Answers live only in `data-lcs-face`/`data-lcs-word` ids + the bank; F1 one `SCENES[id].feeling` per card, >= 3 feelings each <= 2 cards, decoys never `alsoPlausible`; F4 one tile === target, no confusables at d2.
4. New `components-b3.js`: `faceTile` (square, never round), `faceChoiceRow`, `sceneRow`, `sceneCard`, `sceneGrid` (odd counts), `blankFace`, `checkInCard`; F3 = `makeScienceCategorySort` at perBin 3 (78 px faces; 8 would be 69).
5. Words are gender-free citation literals never beside a noun; F5 carries `today` / `draw` / `because` / `helps` per locale; all six faces legible at 72 px greyscale (happy/sad unmistakable; scared/surprised the only near pair, in mono as in colour).
