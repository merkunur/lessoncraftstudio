# G2-359 `word-parts`: DESIGN B, "The Word Tree" (2026-09-23)

Designer B. Read: `_ROLE-DESIGN`, `_STUDIO-BRIEF`, `_SUBSTRATE` (+ DELTA), `_PANEL-FINDINGS` (row 10 + the synonyms/word-parts ruling), `_work/G2-359-pedagogy.md` (the contract: Boundary, faces, bank shape, validator 1-14, poisons P1-P13), `templates/components-b2.js` (`wordBank` :228, `rulingBlock` :76, `pillChoice` :244), `templates/components-b3/spelling-rules.js` (`ruleBins` :202, `ruleBox` :220), `templates/components-b3/compound-words.js` (export list), `templates/components-b4/cloze.js` (`gapBox` :132 with `GAP_MIN 150 / GAP_MAX 300 / GAP_H_MIN 36`, `pillEstimate` :113 = `32 + 0.57·px·chars + 10`, `gapBank` :256 refuses a third row), `templates/layouts/card-grid.js`, `primitives/trace-path.js writingRow` :681, `page/page.css` (`.ws-bank` :416, `.ws-bankword` :417, `.ws-pill` :422, `.ws-card` :126), `data/b4/pronouns.js` (portrait keys + `depicted`). Renders LOOKED at: `out/b3-sweep/en/G2-316` (compound picture+picture rows), `G2-330` (split in letter cells), `G2-333` (Word Web: bracket hub), `G2-320` (antonym prefix rows), `G2-328` (plural rule rows). Every live neighbour is a column of full-width numbered row-cards; this design deliberately is not. Pictures OPENED by me (contact sheets `scratchpad/G2-359-B-pics.png`, `G2-359-B-pics2.png`): weather/sun (smiling sun) · weather/cloud (a PINK cloud) · weather/raindrop (one drop) · weather/snowflake · weather/rainbow · summer/sand (a sand pile with red specks: weak, not used) · spring/flower (red flower) · spring/garden (flower bed) · spring/grass · ocean life/fish · At the Supermarket/bread (loaf) · At the Supermarket/milk (bottle) · classroom/book · body parts/tooth · body parts/hand (open palm) · music/drum · vehicles/boat (small ship) · occupations/baker (m, bread) · teacher (f, clipboard) · singer (m, mic + guitar) · musician (m, guitar) · gardener (m, spade + plants) · farmer (m, pitchfork) · photographer (m, big camera) · waitress (f, cup) · athlete (f, RUNNER) · ballerina (f, dancer) · cashier (f, till) · tailor (f, sewing machine). *est.* = the engineer measures with the Baloo 2 / Nunito woff2 from `file://` (`render/one.js`). No em-dashes.

## Boundary

NOT `compound-words` G2-316 + G2-329..333 (no "picture + picture = word" row, no letter-cell split of ONE word, no Word Web / Wortstern / Ordstjerne hub with a bracket, no es/fr/it/pt "stem + given suffix" row, no diminutive/augmentative); NOT `opposites` G2-320 (no negating prefix anywhere, no ↔ arrow, no "write the opposite"); NOT `spelling-rules` G2-315/324..328 (no rule banner of graphemes, no plural spelling, and NOT its `ruleBins` two-bin page, which is exactly the "family houses" layout this design rejects); NOT `verb-forms` G2-317 family (no inflection, no base-form face); NOT `cloze` G1-350 family (F5 gaps are chosen by word class inside ONE family, never a free story gap); NOT `rhyming-words` / `syllable-reading` (no rime family). Titles never say en "word families", pt "família silábica", es "familias de palabras", fr "mots de la même famille" (pedagogy §A). **Visual signature: THE WORD TREE.** A family is a tree: its ROOT WORD sits on a white plate down in the soil among drawn roots, the trunk rises from it, and the family members are written on white boards inside one big scalloped crown. Two trees stand side by side in one garden, so a teacher reads "two families" from across the room before reading a word. The same garden vocabulary carries all six faces: a picture in a seed pot with three leaves on its stem (F1), a twig of three leaves whose root is missing in the soil (F2), garden tags that hold the prefixes (F3), a word leaf that grows a person (F4), one small tree whose four leaves are the word bank for four sentences (F5). ⚠ Near-neighbour to watch (critic): `plants` G1-376 draws a real plant with roots in a see-through soil box (`primitives/plant-figure.js`). The word tree is a stylised crown of writing boards with NO leaves, flowers, stem parts or cut-away; its soil is a flat band carrying a word plate. The two must not share a primitive or a silhouette; the critic compares the two renders side by side.

## 1 Page concept (base)

From across the room: **two trees in a garden**, each with a big pale-green crown full of empty white boards, a short trunk, and a plate in the soil holding one word with its picture (`sun` with the smiling sun, `hand` with the open palm). Above the garden, a band of loose word chips like leaves blown off the trees. The child reads each chip, finds the tree whose root word is inside it (sunny, sunshine, sunlight, sunset, sunrise | handy, handful, handbag, handshake, handwriting), and writes it on a board of that tree.

Why a tree and not two labelled houses (the argued choice):
1. **The metaphor is literal in the curriculum language of every locale.** The answer lives in the ROOTS: en root word, de Wortstamm (Stamm = trunk) and Wurzel, es/pt raíz / radical, fr radical (from radix), it radice, nl stam, sv/da/no ordstam(me), fi kantasana (kanta = stock, base). The drawing teaches the word the teacher is about to say. The panel may label nothing: the plate in the soil IS the label.
2. **It is the classroom's own diagram.** A "word family tree" (de Wortfamilienbaum, fr arbre à mots) is a familiar wall poster for this topic (panel to confirm per locale; this is a design argument, not a search claim).
3. **It is a self-check the child can see.** Each crown has exactly `boardsPerTree` boards, equal to the members that belong to it. A mis-sorted word leaves one tree full with a word still in hand and the other tree with an empty board.
4. **It is unlike every live G2 language page**, all of which are 6-8 stacked row-cards (G2-316/320/328/330/333 looked at). Two tall columns are a different page from across the room.

Top quality: one focal apparatus (the garden, ~70 % of the body), generous cream around it, calm palette (tealSoft crown, white boards, creamDeep trunk and soil, teal line), pencil-first (10 handwriting boards at glyphH 26), no decoration that is not part of the tree.

## 2 Layout (d2, 722 body)

Lane 639 (default padding). Body = CSS grid `grid-template-rows: auto minmax(12px,1fr) 440px minmax(0px,1fr)`, stamped `data-ws-content` on the garden.

```
+------------------------------------------- lane 639 -------------------------------------------+
| WORD BANK  wordBank({words:10, wordPx:17})  .ws-bank, 2 rows en (106 est.), 3 rows de/fi (150 est.) |
| (sunset)(handy)(sunlight)(handbag)(sunny)(handshake)(sunrise)(handful)(sunshine)(handwriting)    |
+-------------------------------------------------------------------------------------------------+
   gap minmax(12px, 1fr)
+------------ tree A: 309 x 440 ------------+ 21 +------------ tree B: 309 x 440 ------------+
|  ^^^^^^^ scallops y 0..22 ^^^^^^^         |    |  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^         |
| (  CROWN tealSoft, teal 2.5, y 0..350   ) |    | (                                      )  |
| (  [ board 1  273 x 54 : ruling 249 ] y34 )|    | ( [ board 1 ] ... 5 boards              ) |
| (  [ board 2 ]                        y96 )|    | (                                      )  |
| (  [ board 3 ]                       y158 )|    | (                                      )  |
| (  [ board 4 ]                       y220 )|    | (                                      )  |
| (  [ board 5 ]                 y282..336  )|    | (                                      )  |
|                 |trunk| y 350..372         |    |                 |trunk|                   |
|  ~~~~ SOIL creamDeep y 372..440 ~~~~~~~~  |    |  ~~~~ SOIL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~   |
|   roots  [ (sun pic 40) sun ] plate 191x50|    |   roots  [ (hand pic 40) hand ]           |
+-------------------------------------------+    +-------------------------------------------+
   gap minmax(0px, 1fr)
```

**Height:** bank worst 150 (3 rows: 3 × 38 chip + 2 × 10 gap + 16 padding) + 12 + 440 = **602 ≤ 677 (fi 4-line) ≤ 722** ✓; en (2 rows, 106) = 558, slack 164 split by the two `1fr` gaps (garden sits slightly below centre). **Width:** 309 + 21 + 309 = **639** ✓.

**Tree geometry** (one SVG per tree, viewBox `0 0 309 440`, see §5 `primitives/word-tree.js`): crown = scalloped path, x 4..305, top edge 7 semicircular arcs r 21.5 (301 / 7 = 43 each) with arc tops at y 0 and the straight crown body from y 22 down to y 350, bottom corners r 36; fill tealSoft, stroke teal 2.5. Boards: 5 at y 34, 96, 158, 220, 282 (pitch 62 = 54 + gap 8), each x 18..291 (273 × 54), r 12, fill white, stroke teal 1.5; inside each a `writingRow({w:249, h:50, glyphH:26, xHeight:true})` at x 30, y board + 2 (nested `<svg x y>`). Trunk: path from (139,350)-(170,350) straight to y 364 then flaring to (127,372)-(182,372); fill creamDeep, stroke teal 2.5. Soil: rect x 0..309, y 372..440, r 14, fill creamDeep; top edge a teal 2 line y 372. Roots: 4 teal 2.5 cubic curves from the trunk base (x 141, 149, 160, 168 at y 372) out to (38,418), (84,436), (225,436), (271,418), drawn BEFORE the plate so they pass behind it. Root plate (HTML overlay, absolute, `data-lcs-rootplate`): x 59..250 (191 × 50), y 382..432, white, teal 2.5, r 14; picture 40 × 40 at x+8, then the root word Baloo 2 700 24 T.ink centred in the remaining 135 px (max 9 chars *est.* at ~12.5 px/char; plate without picture: 175 px, 13 chars).

**Floors (G2):** writing glyphH 26 ≥ 24 ✓ · min element 36: boards 54, chips 38 ✓ · items 10 ∈ [8,16] ✓ · smallest text: bank 17 px ✓ (9 px floor). Worst chrome (3-line title + 3-line instruction) = the 722 budget above; nothing depends on the chrome.

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| mode | `base` | `base` | `base` |
| trees | 2 | 2 | 3 |
| boardsPerTree (= members per family on the page) | 3 | 5 | 4 |
| treeW × treeH | 309 × 316 | 309 × 440 | 201 × 378 *est.* (boards 185, ruling 165: en only comfortable) |
| boardH / glyphH | 58 / 28 | 54 / 26 | 50 / 24 |
| rootPic | true | true when BOTH families on the page carry an opened `root.pic`, else false on BOTH (never one plate with and one without) | false |
| memberKinds | `['derived']` | `['derived','prefixed','compound']` | all |
| bankOrder | shuffled | shuffled, no 3 consecutive same-family chips | shuffled |
| bankPx | 18 | 17 | 17 |

d2 is the best page: two families (the whole idea in one glance), 5 boards each (10 answers, mid-band), pictures on both plates so a G2 reader who stalls on a word can still find "sun" in it.

## 4 Answer-hiding + uniqueness

- **Printed:** the two root words (given, on the plates) and the 10 members (given, in the bank). **Never printed:** which tree a member belongs to. The boards are empty rulings; nothing on a board, chip or crown encodes the family (no colour per tree, no numbering, no shape difference between trees: the two crowns are byte-identical SVG).
- **Child marks:** writes each bank word on a board; may cross the chip out in the bank (instruction does not ask it; optional).
- **Uniqueness:** the pedagogy validator (rules 2, 5): each member contains exactly one page stem, the two stems are not substrings of each other, so exactly one tree fits each chip. Board count = members per tree, so the assignment is forced.
- **Visibly wrong to the teacher:** a word on the wrong tree does not contain the plate's root word, and the plate sits directly under the same crown (one vertical glance). A child who mis-sorts runs out of boards on one tree and leaves one empty on the other.
- **Stamps:** body `data-lcs-face="base"`; each tree `data-lcs-tree="<famId>" data-lcs-stem="<stem>" data-lcs-boards="5"`; each board `data-lcs-board="<i>"` (NO family stamp beyond the tree's); each chip `data-lcs-bank-word` (from `wordBank`) + `data-lcs-family-of` (hidden stamp, pedagogy §B). verify() re-derives per pedagogy.
- **Extra rule I add (critic to adopt):** extend pedagogy validator 11 to ALL 11 locales for the base and F2: no printed member equals a `whole.word` of the same locale's `compound-words` bank (en `sunflower` IS a G2-316 answer row, looked at, so it is excluded from the sun family on this page).

## 5 Primitives / components

**Reused (exact names + file):**
- `wordBank({words, wordPx:17})` `templates/components-b2.js:228` (base bank).
- `writingRow({w,h,glyphH,xHeight:true})` `primitives/trace-path.js:681` (every board, F2 soil plate, F4 line).
- `rulingBlock({rows:1,w,h,glyphH})` `templates/components-b2.js:76` (F4 line).
- `cardGrid({cards, cols, rows})` `templates/layouts/card-grid.js` (F1 3×2, F4 2×4).
- `countBadge(n)` `templates/components-b2.js:261` (F2 row numbers).
- `gapBox({w, h:40})`, `derange(order, rng)`, `pillEstimate(word, px)` `templates/components-b4/cloze.js` (F5 gaps + bank order + width estimates).
- `svgRoot, roundedRect, label, esc` `primitives/_svg.js`; tokens `primitives/_tokens.js`.

**NOT used:** `ruleBins` (spelling-rules G2-324 bins; the houses layout is the visual this family must NOT resemble) · `compoundRow` / `compoundWebBlock` (G2-316/333 signature) · `pillChoice` (F1 needs pills threaded on a stem, not a centred flex row) · `gapBank` (it refuses >2 rows and lays pills in a banner; F5's bank lives IN a tree crown) · `answerBox` (stamps an answer) · the `plants` primitive `plant-figure.js` (a botanical plant is the wrong object and the wrong family).

**NEW primitive `primitives/word-tree.js`** (palette-only SVG; every function pure, returns `{svg, anchors}`; stamped `data-lcs-prim="word-tree"`):
- `crown({w, h, bumps})` scalloped canopy path: top edge `bumps` semicircles r = (w − 8) / (2·bumps) from x 4 to w − 4, arc tops at y 0, body y r..h, bottom corners r 36 (clamped to h/4); fill `tealSoft`, stroke `teal` 2.5. Anchors: `inner {x:18, y:r+12, w:w−36, h:h−r−26}`.
- `trunk({cx, yTop, yBase, w:31, flare:55})` path, fill `creamDeep`, stroke `teal` 2.5. Anchor `base {x: cx, y: yBase}`.
- `soil({w, y, h, roots:4})` rect r 14 fill `creamDeep` + top line `teal` 2 + `roots` cubic curves (stroke `teal` 2.5, no fill, round caps) from trunk-base x ± 4/13 to the four points given in §2, scaled by w/309. Anchor `plate {x: 0.19·w, y: y+10, w: 0.62·w, h: h−18}`.
- `wordTree({w=309, h=440, boards=5, boardH=54, boardGap=8, crownPad=12})` = crown + trunk + soil composed; returns `anchors.boards[i] = {x:18, y, w:w−36, h:boardH}` and `anchors.plate`. Throws if boards do not fit the crown inner box (`boards·boardH + (boards−1)·boardGap > inner.h`). Minimum w 185 (d3), minimum board 44 h.
- `pot({w:104, h:46, rim:12})` F1 seed pot: rim rect `(w+8) × rim` r 4, body trapezoid top w, bottom 0.73·w; fill `creamDeep`, stroke `teal` 2.5. Anchor `mouth {cx, y}` = rim top.
- `twig({w, n:3, chipW, gap})` F2 horizontal twig: teal 2.5 line at chip-bottom + 6 joining the n chip centres, then continuing right `w` px as a trunk bar (h 14, `creamDeep`, teal 2.5) ending in 3 teal root curls (r 6..10).
- `tag({w, h:48})` F3 garden tag: pentagon (point on the left, point depth 16), hole circle r 4 at (12, h/2) stroke teal 2, fill white, stroke teal 2.5.
- Verify (render-measured, the b4 primitive pattern): `qa/verify-word-tree.js` loads a render, asserts every `[data-lcs-board]` box ⊂ crown inner box, boards pairwise disjoint, the ruling inside each board, the plate ⊂ soil, plate text not clipped (scrollWidth ≤ clientWidth), crown fill = `#DDEBE8`, no off-token hex; poison: 6 boards in a 5-board crown must throw.

**NEW components `templates/components-b5/word-parts.js`** (behind `templates/components-b5.js`; names checked unique by the barrel):
- `treePair({trees:[{famId, stem, root:{word, src?}}], boardsPerTree, boardH, glyphH, w})` base garden: flex row gap 21, each tree = `div` position relative 309 × 440 with the `wordTree` svg + absolutely placed `rootPlate`.
- `rootPlate({word, src, w, h:50, wordPx:24, empty:false})` white teal-2.5 r-14 plate; `empty:true` (F2) holds a `writingRow` instead of a word.
- `seedCard({src, key, chips:[{word, key}], picPx:76})` F1: 3 `leafPill`s stacked (h 44, gap 10) centred on a teal 3 stem (x = card centre, from pot mouth up to the top pill), picture seated in the pot (picture bottom 18 px below the rim top; pot drawn AFTER the picture so the pot front covers the picture's base).
- `leafPill({word, key, h=44, px=20})` `.ws-pill` look (white, teal 2, Baloo 2 700) with a 10 × 6 teal leaf-tab on the stem side; stamps `data-lcs-word` only.
- `twigRow({n, chips:[{word}], plateW:161})` F2 row: badge 26 + 3 leaf chips + `twig` + empty `rootPlate` in a creamDeep soil block.
- `tagKey({prefixes:[{prefix, meaning}]})` F3 key banner: `.ws-scene-banner` of `tag`s, prefix Baloo 2 700 24 teal + meaning Nunito 700 16 ink.
- `graftRow({n, gloss, base, slotW})` F3 row: gloss left, then prefix slot (dashed coral, white) welded to the base leaf chip.
- `personLeafCard({src, key, depicted, base})` F4 card: portrait disc + base leaf chip + curved arrow + `rulingBlock`.
- `familyBlock({famId, root, bank:[4], sentences:[4], rng})` F5: small `wordTree` (w 210, 4 chip slots instead of boards) + 4 sentence lines with `gapBox`.

## 6 Locale slot structure

| surface | text | font | size | reserve |
|---|---|---|---|---|
| base bank chips | 10 member literals | Nunito 800 | 17 | wraps to a 3rd row (budgeted 150); chip est. 42 + 9.7·chars (`pillEstimate`), longest member ≤ 22 chars (validator, *est.* one chip must fit 619) |
| root plate | root word | Baloo 2 700 | 24 | 9 chars with picture / 13 without; longer root → `rootPic:false` for that page (data decision, never a smaller font) |
| boards | child's handwriting | pencil | glyphH 26 | ruling 249 px: ~17 handwritten letters at ~14 px (de "Sonnenuntergang" 15 fits) |
| F1 leaf pills | 1 member + 2 look-alikes | Baloo 2 700 | 20 | pill max 185 px: ~12 chars *est.*; fi "Maanviljelijä" (13) → panel shortens the pool (validator: F1 word ≤ 12 chars) |
| F2 leaf chips | 3 members | Nunito 800 | 17 | chip max 124: 10 chars; validator `F2 member ≤ 10 chars` (de Fahrkarte 9, Abfahrt 7) |
| F2 soil plate | child writes the root | pencil | glyphH 24 | 145 px: 9-10 letters |
| F3 tags | prefix + meaning | Baloo 2 700 24 / Nunito 700 16 | | tag 176 × 48; meaning ≤ 12 chars (de "= hinein", it "= di nuovo") |
| F3 gloss | the meaning sentence | Nunito 700 | 17 | 360 px × 2 lines = ~90 chars (pedagogy draft ≤ 40 en; +40 % = 56 ✓) |
| F3 base chip | base word | Baloo 2 700 | 22 | ≤ 12 chars |
| F4 base leaf | what the person does | Baloo 2 700 | 22 | ≤ 12 chars; F4 line 188 px handwriting (de "Kassiererin" 11 ✓) |
| F5 crown chips | 4 members, sentence-ready form | Nunito 800 | 17 | chip ≤ 190: 15 chars |
| F5 sentences | 4 frames with `{gap}` | Nunito 700 | 18 | 413 px column, ≤ 2 lines each at pitch 56 |
| instruction | one sentence | shell | | ≤ 150 chars, names only: word, tree, root word, line, pot, leaf, stem, soil, tag, box, sentence (whatever that face shows) |

Case: de nouns keep the capital in chips and plates (the plate shows "Sonne", the members "sonnig", "Sonnenschein"); the code never changes case. fi case forms in F5 are literals. No article is printed anywhere (nl de/het, sv/da/no definiteness never meet the page).

## 7 Five variation faces (b c d e f)

Ids and moves per pedagogy §B (F1 G1-381+, F2/F3 G2-360+, F4/F5 G3-392+; TBD by the emitter). All five are CODE faces (`mode` knob on `build()`, a verify branch each); none is a re-labelled d1/d3.

**(b) F1 `picture-family`, "The Seed Pots" (G1).** Visual delta: the garden becomes six potted seedlings. `cardGrid({cols:3, rows:2})`, card inner ~195 × 300 *est.* (675 body, gap 14): top 3 `leafPill`s (44 h, gap 10, Baloo 20) threaded on a teal stem, below them a `pot` (104 × 46 + rim 12) with the ROOT PICTURE (76 px) seated in it, the root word NOT printed. The child says the picture's name and circles the one leaf that grew from it. Stack 8 + 152 + 16 + 116 + 8 = 300; 2 rows + 14 = **614 ≤ 677** ✓. G1 floors: picture 76 ≥ 44, pill 44 h, text 20 ≥ 18 ✓. d2 `{cards:6, chips:3, picPx:76}`. Pictures (opened): sun, hand, book, fish, drum, tooth (en exemplar members sunny | handy | booklet | fisher | drummer | toothbrush, foils share ≥2 initial letters: sunk/summer, hang/happy, boot/boom, fist/fizz, drip/dream, touch/tool: panel signs). ⚠ Excluded as F1 roots: `raindrop` and `snowflake` (a child names the COMPOUND, so the root is ambiguous), `sand` (weak picture), `cloud` only if the panel accepts a PINK cloud as "cloud" (opened: it is pink). Verify hook: exactly one pill per card ∈ family(root); answer slot spread ≤ 3 of 6 per position; no visible text equals the root word. Query face: "word families/root words with pictures" (G1 grade of the owned es/fr heads).

**(c) F2 `root-word`, "The Missing Root" (G2).** Visual delta: eight sideways twigs, each with three leaf chips and an EMPTY root plate in a soil block at the right end. Row (h 64, gap 8): badge 26 · 3 chips (h 36, max 124, gap 8) = x 34..422 · `twig` trunk bar x 430..470 with root curls · soil block x 478..639 (161 × 56, creamDeep r 12) holding an empty `rootPlate` = `writingRow({w:145, h:48, glyphH:24})`. 8 × 64 + 7 × 8 = **568 ≤ 677** ✓. The child circles the shared letters in each chip (chip text 17 px Nunito 800 leaves room for a pencil ring inside a 36 px chip) and writes the root in the soil. d2 `{rows:8, members:3, circle:true}`. Verify hook: stem occurs in every chip, no chip equals the root, no plate prints text, `F2 member ≤ 10 chars`. Query face: "find the root word" / Wortstamm / palabra primitiva / kantasana.

**(d) F3 `prefix-key`, "The Grafting Tags" (G2).** Visual delta: a row of three garden TAGS (the key) over eight gloss rows where the child grafts a prefix onto a word. Key: `tagKey`, 3 tags 176 × 48, gap 14 = 556 in a 64 px banner (en "re- = again", "pre- = before", "mis- = wrongly"). Row (h 60, gap 8): gloss x 0..360 (Nunito 700 17, ≤ 2 lines) · prefix slot (dashed coral 2.5, white, h 44, **w = 30 + 14 × longest key prefix**: en 72, it "sotto" 100, sv "åter" 86) welded to the base chip (white, teal 2, radius only on the outer corners, Baloo 22), so the finished word appears written across slot + chip. 64 + 14 + 8 × 60 + 7 × 8 = **614 ≤ 722** ✓ (fi refused, so the 677 case does not arise). d2 `{keySize:3, rows:8, eachPrefixUsed:'>=2', writeWhole:false}`. ⚠ Deviation from the pedagogy draft (it asks for the whole new word on a line): here the child writes the PREFIX into the slot welded to the base, so the new word is built on the page without the child copying the base. This keeps the row one line high and makes the graft visible. It requires a new validator row `word === prefix + base` (literal concatenation) and REFUSES a row where the junction changes spelling (fr re + vowel → r-, "rentrer"): those rows are simply not drafted. If the critic prefers the whole-word production, flip `writeWhole:true` (adds a 188 px line after the chip, row h 60 unchanged at 639 − 360 − 100 − 12 = 167 px chip+line space: tight, *est.*, engineer measures). Verify hook: slot stamped `data-lcs-slot-for` (row id), answer = row prefix, crossCheck single fit, key ∩ `opposites.prefix.prefixes` = ∅. Query face: "prefix re- words 2nd grade" / Vorsilben / préfixes CE1.

**(e) F4 `who-does-it`, "Who Grows From the Word?" (G3).** Visual delta: eight portrait cards, each a round portrait disc beside a word leaf that curls down into a writing line. `cardGrid({cols:2, rows:4})`, card ~316 × 116: portrait disc d 96 (tealSoft fill, teal 2) with the picture contained at 84 px (≥ every `minPx` in `data/b4/pronouns.js`, max 56) · right column 188: base leaf chip (Baloo 22, h 38, "bake") · curved teal arrow 24 px · `rulingBlock({rows:1, w:188, h:50, glyphH:24})`. 4 × 116 + 3 × 12 = **500 ≤ 677** ✓. d2 `{cards:8, showSuffixHint:false}`. en exemplar portraits (all opened): baker (bake), teacher (teach), singer (sing), farmer (farm), gardener (garden), photographer (photograph), waitress? NO: its base "wait" → "waiter/waitress" is gendered in en and the depicted person is f; allowed only if the panel signs `answer.f = waitress`; the safer 8th is athlete → base "run", answer "runner" (the picture is a RUNNER, opened), and ballerina → "dance" → "dancer" as 9th spare. `singer` and `musician` never on one page. Verify hook: answer keyed on `depicted` from the pronouns bank, never vocab gender; the occupation word is not printed. Query face: "suffix -er: who does it?" / Nachsilbe -er / johtimet -ja -jä.

**(f) F5 `family-in-sentence`, "One Tree, Four Sentences" (G3).** Visual delta: two blocks, each a SMALL word tree on the left whose crown holds the four family words (the bank) and whose soil plate prints the root word (no picture), beside four sentences with gaps. Block 639 × 236: tree `wordTree({w:210, h:236, boards:4, boardH:32, boardGap:6})` with the 4 member chips (Nunito 800 17, ≤ 190 px) drawn in the board slots instead of rulings, trunk y 184..196, plate 170 × 40 y 196..236 (root word Baloo 22) · 16 px gap · sentence column 413 px: 4 lines at pitch 56, Nunito 700 18, `gapBox({w: max(150, pillEstimate(longest member, 18)), h:40})`. 2 × 236 + 20 = **492 ≤ 677** ✓. d2 `{blocks:2, perBlock:4}`; crown chip order = `derange` of sentence order. Verify hook: 4 distinct slots per block, each gap's answer unique, every crown word used once, sentence forms verbatim. Query face: "root words in sentences" / Wortfamilie Lückentext / famiglie di parole nelle frasi.

**Why these five (visual argument):** each face keeps the garden grammar (roots hold the base, leaves hold the family) but changes the ONE thing the child's pencil does: writes on boards (base), circles a leaf (F1), writes a root in the soil (F2), writes a prefix into a graft slot (F3), writes a grown person (F4), writes leaves into sentences (F5). Six pages, six distinct silhouettes (twin trees / 6 pots / 8 twigs / tags + 8 grafts / 8 portrait cards / 2 small trees + text), so the hub thumbnails never look like one page re-titled.
**First to cut:** F1. Its single answer rests on look-alike foils that each locale must sign as "not family" (the most fragile judgement in the set), picture naming is ambiguous for several of the few legible roots (raindrop, snowflake, pink cloud), and it is below the taught band in sv/da/no/fi.

**Hub contract (§ brief):** `apps['word-parts']` + `axes['exercise-type']['word-parts']` slug + name ×11; one landing per face per locale with `coordinate.type:'word-parts'`, `coordinate.mode` ∈ {`base`,`picture-family`,`root-word`,`prefix-key`,`who-does-it`,`family-in-sentence`}, `theme:''`, level from the band table, unique slug, `canonicalDeckSlug` = the published deck; committed + deployed. Gate `scripts/verify-hub-type-rows.js` expects 6 rows per locale minus the recorded refusals (fi F3, es F4, fr F4; at risk sv F3, da F4): **63** (61 if both at-risk refusals land).

## 8 Two alternatives + recommendation

1. **Family Houses** (two roofed bins, the pedagogy's own sketch: `ruleBins` + a 72 px roof tile). Rejected: it is visually the spelling-rules G2-324 bin page and the science `.sci-bin` pages (a label pill over a box of rulings), so the hub would show a fifth "two boxes with lines" thumbnail; a house says "category", not "shared root", and teaches no vocabulary.
2. **The Root Flower** (root word in a centre disc, members on petals around it). Rejected: it is the compound-words Word Web hub (G2-333, de Wortstern, da Ordstjerne: one word in the middle, many around), and petals cannot hold a 15-letter handwritten de/fi word at glyphH 24 (a petal ~110 px wide).
**Recommendation: The Word Tree.** It names the concept in every locale's own term (root, Stamm, raíz, radical, radice, stam, kanta), it is a genuinely new silhouette among the live G2 language pages, it builds its own self-check (board count), and it gives all six faces one coherent visual family without any face echoing a neighbour's layout.

## 9 Risks, mitigations, print check

- **Long locales.** The base bank is the only surface that can grow a row: budgeted at 3 rows (150). If a locale's draft exceeds 3 rows (`sum(pillEstimate) > 3 × 619`), the validator refuses that FAMILY PAIR (choose shorter members), never a 4th row, never a smaller font. Plates: root word > 9 chars → `rootPic:false` on both plates. F2 chips ≤ 10 chars, F1 pills ≤ 12, F5 chips ≤ 15: data guards in `validate-b5-draft.js`, so the refusal is a data decision.
- **fi 4-line title (677):** every face's stack is ≤ 614; base 602 is the tightest. ✓
- **Greyscale:** crown tealSoft (#DDEBE8) prints ~8 % grey, boards stay white with a teal outline, so writing areas are the whitest things on the page ✓. Coral appears only as the dashed F3 slot and F5 gap boxes (dashed = the pencil cue, legible without colour). Nothing is keyed to colour; the two crowns are identical. Soil creamDeep vs page cream is faint in greyscale: the teal soil line + roots carry the edge.
- **Pencil space:** handwriting boards 249 × 50 (glyphH 26) in the base; F2 plate 145; F4 line 188; all ≥ glyphH 24 G2 floor.
- **Plants collision:** the critic must lay K/G1 plants renders beside the base; if the silhouettes read as the same object, the fallback is to drop the trunk flare and roots (keep crown + plate) so the tree is a sign, not a plant.
- **Pictures:** every picture named here was opened (list at top). The pink cloud, sand pile and compound-named pictures are ruled out or flagged. Portraits come only from `data/b4/pronouns.js` with its `depicted` tag.
- **What lints catch:** overflow, footer intrusion, 9 px floor, off-token hex, blank page (`data-ws-content` on the garden/grid). **What `verify-word-tree.js` catches:** board outside crown, plate outside soil, plate text clipped, board overlap. **What only a human eye catches:** whether the tree reads as a tree at 50 % zoom, whether a seated picture looks "in the pot" or merely overlapping it, whether chip circling in F2 has room, whether a handwritten de/fi word fits a board. The critic reads the en/de/fi d2 renders of every face.

## 10 Summary

1. Concept: THE WORD TREE. Root word on a plate in the soil, family members written on boards in the crown; two trees side by side = two families.
2. Base d2: 10-chip bank over two 309 × 440 trees (5 boards, glyphH 26); stack 602 ≤ 677 ≤ 722, width 639.
3. New `primitives/word-tree.js` (crown, trunk, soil, pot, twig, tag) + `components-b5/word-parts.js`, with a render-measured verify.
4. Faces keep the garden grammar, change the pencil's act: seed pots (F1), missing root (F2), grafting tags (F3, prefix welded to base; critic may flip to whole word), word grows a person (F4), one tree four sentences (F5).
5. Refusals unchanged from pedagogy (fi F3, es F4, fr F4; at risk sv F3, da F4) → hub 63; first to cut F1.
