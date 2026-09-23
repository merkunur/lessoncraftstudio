# K-370 `family`: DESIGN B, "The Portrait Wall" (2026-09-23)

Designer B. Read: `_ROLE-DESIGN`, `_STUDIO-BRIEF`, `_SUBSTRATE` (+ DELTA), `_PANEL-FINDINGS` (row 3 + the family ruling), the `family` sections of the four `_selection-*.md`, `_work/K-370-pedagogy.md` (the contract: kinship model A.1, faces B, validator D.4), `primitives/body-figure.js` (header), `primitives/_tokens.js`, `templates/components-b3/ordinal-numbers.js` (`blankNumeralBox` = `.ws-blankbox`, default 68×44), `templates/components-b4/pronouns.js` (`namePlate` px ≥ 16, h 26), `templates/components-b2.js` (`wordBank`, `rulingBlock`). Renders LOOKED at: `out/b4-sweep/en/K-354-null-d2-en.png` (the neutral body figure: at h ~480 its head is ~90 px wide, but the figure spends ~75 % of its height on torso and legs), `G1-352-null-d2-en.png` + `G1-372-null-d2-en.png` (library portraits: every adult in a job costume, faces ~14-20 px wide at card size: the carrier the pedagogy rejected, and the reason I draw BUSTS). No library picture is named in this file, so no picture had to be opened (`data-lcs-pic` absent on every face). *est.* = engineer measures with Baloo 2 / Nunito woff2 loaded (`render/one.js`). No em-dashes.

## Boundary

NOT K-343 "All About My Family" (the child's own family, drawn and counted on ten-frames) and NOT K-323 "All About Me"; NOT `pronouns` G1-352 family (no he/she/they chips, no possessive the child chooses), NOT `picture-vocabulary` K-225 (no word↔library-picture match), NOT `comparing-sizes` K-032..040 (no order carried by figure height), NOT `question-words` (no wh-frames); no title echoes `fact-families` / en "Word Families" / pt "Família silábica" / es "Familias de palabras" / fr "Mots de la même famille". This type owns **kin terms as a relational system read off a GIVEN, INVENTED family**, the generation concept, and one open template. **Visual signature: a family PORTRAIT WALL.** Every person is a framed head-and-shoulders portrait (a new palette-only bust, never a full body, never a library picture) hung in three generation rows on a calm cream wall, joined by teal "hanging cords" (couple bar, descent line, sibling bar). Frames carry what a real portrait wall carries: a number disc on the corner (base, F2), a brass nameplate under the frame (F3), a coral star on the child the page is about. The open face (F5) turns the same frames into a **tree of frames**: empty frames hanging from the branches of a drawn tree, with no couple bars at all.

## 1 Page concept (base)

From across the room a teacher sees **a wall of family portraits**, the object every home, classroom "our families" board and photo album shares across all 11 markets, and under it a row of word **placards**, each with an empty numbered box. The child finds Mia (coral star, nameplate "Mia"), then for each placard word ("grandma", "dad", "brother") finds that person on the wall and writes the frame's number on the placard.

Why a wall of busts beats a tree of full bodies (the measured argument): at the K frame size the **face is ~36 px wide**; the same 96×116 cell holding a full figure in `body-figure.js` proportions (head 92 of 560 units) would give a face of ~19 px. Age and sex cues live on the HEAD (grey hair, glasses, beard, hair silhouette, baby proportions), so the bust doubles the legibility of exactly the cues the task needs, and removes the one cue the pedagogy forbids (height). Top quality: ONE focal apparatus (the wall, ~65 % of the body), generous cream margins, no decoration beyond the frames themselves, every answer written with a pencil into a dashed coral box, zero words on the wall except the ego's name.

## 2 Layout (d2, 722 body)

Lane 639 (default padding). Wall = one `div[data-ws-content][data-lcs-wall]` (cream `#FBF3E4` fill, 2 px `creamDeep` border, radius 16, inner padding 14) containing ONE svg from `primitives/family-tree.js familyWall()`. Frame K = 96 w × 116 h. d2 = 6 people (grandSide M shown; F mirrors).

```
+-------------------------------------------------- lane 639 -------------------------------------------------+
| WALL  (inner 611 × 452; box 639 × 480)                                                          pad 14    |
|            (1)[MM]--o--[MF](2)            row 1: y 0..116, frames centred x 182 / 318 (grand pair)        |
|                    |                      couple bar at y 58; descent from x 250                           |
|                    |                      row gap 36 (badge overhang 9 + sibling/descent 20 + 7)            |
|         (3)[ M ]------o------[ F ](4)     row 2: y 152..268, centres x 250 / 410, couple gap 64            |
|                       |                   descent from x 330                                               |
|                  +----+----+              sibling bar at row-3 top - 20                                    |
|           (*)[ego]      (5)[ Z ]          row 3: y 304..420, centres x 262 / 398                           |
|             [ Mia ]                      ego nameplate 26 h, 6 below the frame: y 426..452                 |
+-------------------------------------------------------------------------------------------------------------+
  gap minmax(18px, 1fr)
+--- placard 205 ---+ 12 +--- placard 205 ---+ 12 +--- placard 205 ---+     row A: 3 placards, h 56
| [ grandma ][ .. ] |    | [  dad    ][ .. ] |    | [ brother ][ .. ] |
+-------------------+    +-------------------+    +-------------------+
  gap 12
          +--- placard 205 ---+ 12 +--- placard 205 ---+                    row B: 2 placards, centred, h 56
          | [  mom    ][ .. ] |    | [ grandpa ][ .. ] |
          +-------------------+    +-------------------+
  gap minmax(0px, 1fr)
```

Height: wall 480 + gap 18 + placards (56 + 12 + 56 = 124) = **622 ≤ 722** (slack 100 absorbed by the two `1fr` gaps, split 60/40 above/below the placards). fi 4-line title (677): 622 ✓. Width: wall row 2 extent x 202..458 of 611 ✓; the extended shape (d3 / F3, aunt left of mom) spans x 82..458 ✓. Placard = chip (Nunito 800 20, h 56, max-w 133, radius round, white fill, 2 px `creamDeep` border) + gap 8 + `blankNumeralBox({w:56, h:56})` + inner padding 4: 133 + 8 + 56 + 8 = **205**; 3 × 205 + 2 × 12 = **639** ✓. The numeral written by the child is ~30 px in a 56 px box (K answer-numeral floor 30 ✓, min element 56 ✓). Number disc = teal circle r 15 (30 px), white Baloo 2 700 20, centred on the frame's TOP-LEFT corner inset (frame.x + 6, frame.y + 6): the bottom centre stays free for descent lines. Ego: coral 5-point star 24 px at the top-RIGHT corner (same inset), no number; `namePlate({text:name, px:18, h:26})` centred under the frame. Worst-case chrome (3-line title + 3-line instruction) budgeted above; nothing in this stack depends on the chrome.

Shape variants of the wall (bank, never hand-placed; geometry derived from paths): `one-mother` / `one-father`: row 2 holds one frame centred at x 330, the descent line leaves from the frame's bottom centre (+2 below the frame edge), **no empty partner slot, no stub**; `grandparent-home` (parents not drawn): the wall has TWO rows (grand pair, children), descent from the grand couple bar, wall height 480 → 344 and the freed 136 px goes to the `1fr` gaps; `extended`: aunt/uncle joins row 2 left of M, joined to M by the sibling bar hanging from the grand pair's descent, a cousin under the aunt.

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| shape | two-parent | two-parent / one-mother / one-father (seed; no shape > 50 % of a locale's decks) | two-parent / extended |
| people | 4 (M, F, ego, Z or B) | 6 (MM, MF or FM, FF by `grandSide`, M, F, ego, Z or B) | 7 (+ Zy or By) |
| rows | 2 | 3 | 3 |
| asked (placards) | 3 | 5 | 6 |
| placard layout | 3 in one row | 3 + 2 | 3 + 3 |
| frame | 104 × 126 | 96 × 116 | 88 × 106 (4 frames in row 3) |
| register | K | K | K |
| wall h (box) | 322 *est.* | 480 | 452 *est.* |

d2 is the best page: three generations (the concept), one grandparent pair so `grandma` has one referent in every locale (and the sv/da/no word follows the drawn side), 5 placards = a full, calm K page.

## 4 Answer-hiding + uniqueness

The wall carries NO kin word (the only text on it is the ego's name). The placard carries the word; the child writes a NUMBER, so the page shows the task (word + wall) and never the binding. Each placard stamps `data-lcs-kin="<wordKey>"`, its box `data-lcs-answer="<frame n>"`; each frame `data-lcs-person data-lcs-path data-lcs-sex data-lcs-age data-lcs-n`. Uniqueness = the pedagogy's rule 4 re-derived on the render: exactly one frame whose path maps to the placard's word. Numbers are assigned to frames in a seeded order that is NOT reading order (row-major numbering would put `grandma` at 1 on every page), asserted: the answer sequence down the placards is never 1..n ascending. A wrong answer is visibly wrong to the teacher: the number in the box names a frame, and the frame's face contradicts the word (a grey-haired portrait under "brother").

## 5 Primitives / components

**Reused.** `blankNumeralBox` (`templates/components-b3/ordinal-numbers.js`, placard boxes w 56 h 56; F1 w 48 h 44) · `namePlate` (`templates/components-b4/pronouns.js`, ego plate, F3 given names) · `strokeWordLane` + `schoolLines` (`primitives/trace-path.js`, F2) · `wordBank` (`components-b2.js`, F4) · `rulingBlock` (`components-b2.js`, F4 write lines, F5 name lines) · `articleChips` styling is NOT reused (placards are not choices).

**NOT used.** `body-figure.js` (a full neutral body: no sex cue by design, face too small at the wall size, and it would re-open the human-body look on a vocabulary page) · any library picture (occupations = job costumes; no older women exist; opened by the pedagogy and by me on the two pronoun renders) · `cardGrid` (a grid of cards has no relational lines) · `sceneStage` (ONE theme of objects; people are not objects here).

**NEW `primitives/family-figure.js`**: `familyPortrait({age:'baby'|'child'|'adult'|'elder', sex:'f'|'m', look:{hair, glasses:bool}, w, h, frame:'rect'|'oval'|'round'|'arch', empty:false, id}) → {svg, width, height}`. viewBox **0 0 100 124** (the MAT; the frame is drawn around it by the caller or `frame:` opt). Every stroke teal 3 px at every size (user units = 3/scale, the body-figure rule); detail lines 1.5 px `grid`. Fill cream for skin/clothes (no skin tone, inclusive by construction), mat `white`. Parts, each a `<g data-lcs-part>`:
- `shoulders` adult/elder: `M12 124 C12 100 30 90 50 90 C70 90 88 100 88 124 Z`; child: `M22 124 C22 104 34 96 50 96 C66 96 78 104 78 124 Z` + round collar arc `M40 97 Q50 106 60 97`; baby: a swaddle oval `ellipse cx50 cy112 rx26 ry18` fill `tealSoft`.
- `neck` adult/elder: rect x 44 y 72 w 12 h 20; child: x 45 y 78 w 10 h 20; baby: none.
- `head` adult/elder: ellipse cx 50 cy 50 rx 20 ry 23; child: cx 50 cy 56 rx 21 ry 22 (head:shoulder width ratio 42/56 vs adult 40/76: the proportion is the age cue); baby: circle cx 50 cy 62 r 25 (sits on the swaddle).
- `eyes` teal discs r 2.4 at (43, head.cy+1) / (57, head.cy+1); baby r 3.2. `mouth` smile arc stroke 2 `M44 cy+11 Q50 cy+15 56 cy+11`. Elders add two 1.5 px `grid` cheek arcs.
- `hair` (fill `ink #3A3530` for child/adult; **`grid #C8BFAE` for elder**, outlined teal 2): f = `long` (cap + two falls to y 92 behind the shoulders), `bun` (cap + circle r 9 at (50, head.top-4)), `ponytail` (cap + side tail to x 76 y 70); m = `short` (cap to head.cy-8), `curly` (scalloped cap, 7 bumps r 5), `beard` (short cap + jaw path from (31,cy+2) round to (69,cy+2), ink or grid, mouth gap kept); elder-m adds `fringe` (bald crown, grey side tufts). baby: f = one tuft circle r 4 at (50, 38) + a 6 px clip dot `tealSoft`; m = one curl stroke `M50 38 q6 -6 0 -10`. (A baby is only ever asked as the single baby word on a page; rule: never offer both baby-sister and baby-brother words.)
- `glasses` (optional, any age but baby): two circles r 7 stroke teal 2 at the eyes + bridge.
- **Six looks per (age, sex)**: 3 hair × glasses on/off; two same-cell people on one page never share a look (asserted).
- **Greyscale age cue**: elder hair `#C8BFAE` (luminance ~76 %) vs adult/child hair `#3A3530` (~21 %): distinct on a B&W printer without colour. **No props**: no cane, apron, tie, skirt, knitting, pipe, jewellery. **Min size**: mat width 56 px (throws below: the eye disc falls under 1.3 px).
- `empty:true` draws only the mat (F5, F3 does NOT use empty: F3 shows the faces).

**NEW `primitives/family-tree.js`**: `familyWall({persons, egoId, numbers:{id:n}, frameW, frameH, rowGap=36, width=611, plates:{id:{text|blank}}}) → {svg, width, height, frames:[{id,x,y,w,h}]}`. Derives rows from paths (row = generation), x from the rules in §2 (couples 64 apart edge-to-edge, siblings 40 apart, grand pair centred over its child, descent from the couple-bar midpoint), then draws: frame = outer rounded rect rx 10 teal 3 px + inner line inset 5 `grid` 1.5 (the "picture frame" double line), mat white, portrait inside; couple bar teal 3 px at frame mid-height between frame edges with a 5 px teal node dot at its midpoint (a nail, not a heart: no romance or marriage is asserted); descent line teal 3 px; sibling bar teal 3 px at child-row top − 20; number disc; ego star; optional plate slot under each frame (F3). Asserts: no frame overlaps, every connector clears every frame by ≥ 6 px, no text other than plates/numbers.

**NEW `primitives/frame-tree.js`** (F5): `frameTree({w=639, h=520, frames:9, meWord})`. A tree drawn teal 3 px on cream: trunk path from (292,520)-(348,520) narrowing to (304,300)-(336,300); three branch tiers as 8-10 px-wide tapered paths to hook points; NO canopy fill (a light `tealSoft` cloud behind each tier would grey-wash on print; outline only). Each frame hangs 10 px below a hook by a two-line cord (teal 1.5), frame shapes cycle `oval, rect, round, arch` for charm, each ≥ 96 × 96 drawing mat, with a writing plate under it. Hook points (px, tree-relative, mat centres): tier 1 (y 70): 120, 320, 520; tier 2 (y 230): 90, 230, 410, 550; tier 3 = the `me` frame on the trunk at (320, 400) + one free frame at 530, 400. Nothing on the tree implies couples or descent: branches are decoration, frames are independent.

**NEW `templates/components-b5/family.js`**: `placard({word, answer, fontPx=20, h=56, chipMax=133})` · `placardRows({items, perRow=3})` · `portraitWallStage(...)` (wraps `familyWall` in the `data-ws-content` wall box) · `genRail(...)` (F1 legend) · `traceRow(...)` (F2) · `clueList(...)` (F3) · `riddleRow(...)` (F4) · `templateTreeStage(...)` (F5).

## 6 Locale slot structure

| surface | font | size (floor) | longest-locale reserve |
|---|---|---|---|
| placard chip (base) | Nunito 800 | 20 (K floor 18; steps 20 → 18 only if the word exceeds 133 px *est.*) | K d2 words ≤ 9 chars in every locale (de Schwester, sv lillebror only at d3); chip 133 holds 10 chars at 20 px *est.* +40 % over en "grandma" (7) |
| ego nameplate / F3 given names | Nunito 800 | 18 (≥ 16) | names ≤ 6 chars (pronouns banks, m) |
| number disc / F1 legend numerals | Baloo 2 700 | 20 | locale-free |
| F1 row placards | Nunito 800 | 18, may wrap to 2 lines at a space (de "kleine / Schwester"), chip h 52 | 205 px placard |
| F2 trace lane | `strokeWordLane` glyphH 40 | measured metrics | word refused if > 290 px at glyphH 40 (render-measured) |
| F3 clues / F4 riddles | Nunito 700 | 18 (one line ≤ 70 chars; F4 may wrap to 2) | +40 % reserved by row min 44 → 52 |
| F5 `me` plate | Baloo 2 700 | 20 | me/ich/yo/eu/moi/io/ik/jag/mig/meg/minä ≤ 4 chars |

Baloo for numerals and the one display word (`me`); Nunito for every word the child reads. No text under 16 px anywhere on the page (9 px lint floor far away).

## 7 Five variation faces (b c d e f)

**b = F1 Generations: Oldest to Youngest (G1, CODE `mode:'generations'`).** **Visual delta: the wall is gone; a "picture rail" legend takes its place.** Top: `genRail` = a teal 3 px rail line across 639 with three hung frames, each 120 × 92 holding TWO small busts side by side (elder f + elder m / adult f + adult m / child f + child m, so no sex attaches to a numeral), a number disc 1 / 2 / 3 under each (legend height 92 + 16 cords + 30 disc = 138). Below: 6 rows × 3 placards (`placard` with chip Nunito 800 18 + `blankNumeralBox({w:48,h:44})`, G1 floors 44 / 26), row h 52, gap 12: 6 × 52 + 5 × 12 = 372. Stack 138 + 24 + 372 = **534** ✓ (slack to `1fr` gaps). NO bust beside any row word. Verify hook: word `data-lcs-gen`, box `data-lcs-answer` = rank; no row in answer order; ≥ 4 of 6 rows carry a sideline word. Query face: generations.

**c = F2 Family Words: Trace and Write (K, CODE `mode:'trace-words'`).** **Visual delta: a SMALL wall (frames 64 × 78, 3 rows, 5-6 people, 4 numbered) over four writing rails.** Wall box 294 + 20 pad = 314 *est.*; each row: number disc 36 + gap 10 + hollow `strokeWordLane` 290 + gap 12 + open copy line (`schoolLines`) 290 = 638; row min 72, 4 rows + 3 × 12 = 324; stack 314 + 16 + 324 = **654** (fi 677 ✓, 722 ✓). The trace model IS the answer by design (a trace face shows the word; the relation → word mapping is asserted instead). Verify hook: `kin[loc][person(badge).path] === lane word`; glyph coverage; starters from `font-metrics.json`. Query face: writing the family words.

**d = F3 Family Tree: Read the Clues (G1, CODE `mode:'tree-clues'`).** **Visual delta: every frame gets a brass NAMEPLATE; three are engraved (given), the rest are dashed coral write-in plates.** Frames 80 × 98 (G1 floor 44 ✓), plate 130 × 44 under each (6 below), row = 148, 3 rows + 2 × 28 + pad 20 = **520**; row 2 = aunt, M, F with plates 130 + 20 + 130 + 20 + 130 = 430 ✓ ≤ 611. Clues: `clueList`, 4 × one-line Nunito 700 18 rows of 34 with a small teal bullet = 136. Stack 520 + 14 + 136 = **670** (fi 677 ✓). No number discs on this face (the plate is the answer surface). Verify hook: plate `data-lcs-path` + `data-lcs-answer="<name>"`; name gender tag = frame sex; given names never in a clue. Query face: family tree (the dominant "complète l'arbre généalogique" intent).

**e = F4 Family Riddles: Who Is It? (G2, CODE `mode:'relation-riddles'`).** **Visual delta: no wall; ONE framed portrait of the ego (72 × 88, star, nameplate) sits at the left of the word bank like the "subject" of a museum label, and eight riddle placards run down the page.** Top band: portrait 72 + gap 16 + `wordBank` (10 words, wraps to 2 lines, ~100 h *est.*) in 551 px; band 120. Rows: riddle sentence Nunito 700 18 + an inline `rulingBlock` single line 170 × 40 at the gap (G2 floor 36 ✓), row min 44 (52 when de/pt wraps), 8 rows + 7 × 10 = 422 (486 worst). Stack 120 + 16 + 486 = **622** ✓. Verify hook: `kin[loc][riddle path] === answer`; answers pairwise distinct; no possessive/article agreeing with the answer before the gap (rule 11); no first person (rule 12). Query face: relationships / riddles.

**f = F5 Family Tree Template (G1, CODE `mode:'tree-template'`, OPEN, no verify()).** **Visual delta: the frames leave the wall and hang from a drawn TREE, empty.** `frameTree` 639 × 520: 9 empty mats (oval/rect/round/arch, ≥ 96 × 96 drawing space) each with a single `schoolLines` name line 130 × 40 under it; only the trunk frame carries a printed plate, `me` (Baloo 700 20). Below, a "more people" shelf: a teal 3 px shelf line with 4 small empty frames 72 × 72 standing on it, 104 h. Stack 520 + 16 + 104 = **640** ✓. No kin word printed, no couple bar, no descent line, no labelled row: any family, a child in care, one parent, two mothers, grandparents, step-siblings or friends fill the same frames. Gate (layout-only): ≥ 8 empty mats, no `kin[loc]` literal in the rendered text, instruction free of M/F literals. Query face: the template head ("family tree template", "Stammbaum Vorlage", "árvore genealógica para completar", "arbre généalogique vierge").

**Why these five:** each changes what the child DOES on the apparatus (order by meaning without faces; spell from a face; write names from clues; compose two relations with no picture; build one's own), and each owns a distinct query face (generations / words to trace / family tree + clues / relationships riddles / template). **First to cut:** c (F2 trace): it is the only face whose skill (tracing) the catalogue already owns elsewhere (word-tracing K-284 family), and its de/fi row pools are narrowest after the 290 px width refusal.

Hub contract (restated): `apps.family` + `axes['exercise-type'].family` slug + name ×11; exactly one landing per face per locale with `coordinate.type === 'family'`, `coordinate.theme:''`, `coordinate.mode` = the face's mode string (`base`, `generations`, `trace-words`, `tree-clues`, `relation-riddles`, `tree-template`); committed and deployed; gate `scripts/verify-hub-type-rows.js` expects 6 rows × 11 = 66, refusals 0 (pedagogy C).

## 8 Two alternatives + recommendation

**Alt 1: The Family House** (a cut-away house, one floor per generation, each person in a window). Warm and very K, and it makes "generation = floor" concrete. Rejected: floors assert that everyone LIVES TOGETHER, which is false for most extended families and quietly marks separated parents or grandparents-elsewhere as outside the family (the lead's ruling: never imply other shapes are wrong); windows cannot show which child belongs to which parent, so aunt vs mom and cousin vs sister become unreadable (F3 and F4 die); and a house is scene art the palette-only rule makes heavy (roof, walls, 7 windows).

**Alt 2: The Picnic Row** (the family sits along one picnic blanket, labels below). Friendly and cheap. Rejected: a single row has no relational lines, so the only cue left for "grandma" is grey hair and for "sister" is size: the page degrades into age/size reading (the `comparing-sizes` boundary) and aunt/cousin are unaskable.

**Recommendation: the Portrait Wall.** It keeps the pedigree's relational lines (everything the kinship model needs) while replacing boxes-and-full-figures with the object families actually hang; busts double face legibility at the same area; one frame primitive serves all six faces (number corner, nameplate, empty mat); and F5's tree of frames serves the "family tree template" search intent without drawing a single couple bar.

## 9 Risks, mitigations, print check

- **Sex/age legibility at small frames** (F2 64 px, F1 legend busts ~50 px): the gate renders each (age, sex, look) at its smallest shipping size and a 3-person read-test signs off (pedagogy D.5); MIN mat 56 px throws below. Elder cue is luminance (grey hair), not colour.
- **Long locales:** placard chip 133 px at 20 px holds ~10 chars *est.*; K d2 words are ≤ 9 in all 11 (Schwester, hermana, sorella, lillebror is d3 only); a word over 133 steps the chip to 18 px, never below. F1 chips wrap to two lines. F3 plates 130 px hold 6-char names at 18 px with ~55 px spare. fi 4-line title: every stack above ≤ 670.
- **Greyscale:** teal frames/cords/discs print dark; coral star is shape-distinct from the round discs; dashed coral answer boxes read as grey dashes; elder hair grid vs ink hair distinct; `tealSoft` only on the baby swaddle.
- **Pencil space:** placard boxes 56 × 56 (K), F1 48 × 44, F3 plates 130 × 44, F4 lines 170 × 40, F5 mats ≥ 96 × 96 + 130 × 40 name lines.
- **Connectors vs discs:** discs sit top-left, descent lines leave bottom-centre, sibling bars at row top − 20 with discs ending at row top − 9: `familyWall` asserts ≥ 6 px clearance; single-parent descent starts 2 px below the frame, never a stub where a partner "should" be.
- **No cut lines** on any face. **9 px floor**: smallest text 16 px.
- **QA lint catches:** overflow, footer intrusion, palette, font floor, blank page (`data-ws-content` on the wall). **Only the verify gate catches:** a kin word printed on the wall, non-unique referents, ascending answer order, frame overlap. **Only a human eye catches:** whether a bust reads as "grandma" vs "mom" and "girl" vs "boy" at 64 px, and whether the wall feels warm rather than clinical; budget one read-test per new look before the wave.

## 10 Summary

1. Concept: a PORTRAIT WALL of palette-only framed busts in three generation rows, joined by teal hanging cords; K child writes each frame's number on a word placard.
2. Busts, not full bodies: ~36 px faces at the K frame (vs ~19 px full-body), grey hair as a greyscale age cue, no props, no skin tone.
3. d2 stack 622 ≤ 722 (fi 677 ✓); placards 3 × 205 = 639; boxes 56 × 56.
4. Faces: F1 picture-rail legend + word rows · F2 small wall + trace rails · F3 frames with nameplates + clues · F4 ego portrait + riddles · F5 empty frames on a tree (no couple bars, any family).
5. New: `primitives/family-figure.js` (bust, viewBox 100×124), `primitives/family-tree.js` (`familyWall`), `primitives/frame-tree.js`, `templates/components-b5/family.js`.
