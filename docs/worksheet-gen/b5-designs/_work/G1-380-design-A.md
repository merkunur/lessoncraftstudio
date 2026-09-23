# G1-380 `digraphs` - DESIGN A: "The Sound Bar" (team tile + team table)

Designer A, 2026-09-23. Inputs read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (#8), the four `_selection-*.md` digraph sections, `_work/G1-380-pedagogy.md` (the face set, inventories, refusals and bank shape are taken from it unchanged; this file designs how they LOOK). Renders LOOKED at: `out/b3-sweep/en/G1-311`, `G2-315`, `G1-333`, `K-318`. Code read: `components-b3/{spelling-rules,sound-boxes,letter-of-the-week}.js`, `primitives/syllable-arcs.js`, `primitives/_tokens.js`, `primitives/font-metrics.json`.

**Measured for this file** (scratch `%TEMP%/.../scratchpad/G1-380-measure.js`: puppeteer, the shell's own `assets/fonts/fonts.css` woff2 loaded from `file://`, loaded faces confirmed `Baloo 2 700`, `Nunito 800`; canvas `measureText`, px):

| text | Baloo 2 700 @28 | @40 | @56 |
|---|---|---|---|
| sh / ch / th | 29.6 / 29.8 / 27.1 | 42.3 / 42.5 / 38.7 | 59.2 / 59.5 / 54.2 |
| sch / eau | 43.4 / 46.2 | 62.0 / 66.0 | 86.7 / 92.3 |
| au ei / ou on oi | 31.0 22.8 / 32.3 32.3 23.8 | 44.3 32.6 / 46.1 46.1 34.0 | 62.0 45.6 / 64.5 64.6 47.6 |
| nh lh qu / oe ui eu | 32.3 23.9 32.2 / 31.4 23.7 31.2 | 46.1 34.1 46.0 / 44.8 33.8 44.6 | 64.5 47.7 64.5 / 62.7 47.4 62.5 |
| aa uu ää | 29.8 32.1 29.8 | 42.6 45.9 42.6 | 59.7 64.3 59.7 |
| wheelchair / Schmetterling / kyynärpää | 139.6 / 178.9 / 132.8 | | |

Nunito 800: the 52-char sentence "The fish and the sheep are on the ship with a brush." = 542 px @22, 591 px @24 (11.4 px/char @24). Baloo 2 700 vertical metrics from `font-metrics.json`: ascender 0.6719 em, descender 0.1875 em (ink span 0.859 em).

**Pictures OPENED** (contact sheet `scratchpad/G1-380-pics.png`, each `cache/themes/<theme>/<noun>@3x.webp`): `vehicles/ship` (a cargo steamer, reads "ship") · `pets/fish` (clear) · `around the house/brush` (a PAINT brush; reads "brush") · `furniture/chair` (clear) · `furniture/bench` (park bench, clear) · `body parts/thumb` (thumbs-up hand; reads "thumb") · `easter/feather` (clear) · `animals/sheep` (clear) · `clothing/shoe` (a loafer, reads "shoe") · `easter/chick` (clear) · `breakfast/cheese` (wedge, clear) · `body parts/tooth` (molar, clear) · `body parts/mouth` (open lips; a child may say "lips": NOT used). ⚠ `fruits/cherry` OPENED and **REJECTED**: a single round red fruit with a stalk that reads as an APPLE (the substrate's "the picture is the fact" class). The en example pages below use only the opened, accepted set; every non-en item is opened by its native panel (`picOpened:true`).

---

## Boundary

This page is NOT `letter-of-the-week` G1-311 (one team fixed, hunt the pictures, trace it), NOT `spelling-rules` G2-315/324-328 (two spellings of ONE sound; coral rule letters in spaced cells), NOT `syllable-reading` G1-306/330-334 (syllables, rimes and blends; the unit is printed in CORAL letters, syllables carry teal BOWLS), NOT `sound-boxes` K-318 (count every phoneme; a multigraph is a wide DASHED box with a curved teal tie). It owns discrimination ACROSS three different-sound letter teams (pedagogy Boundary 4). **Visual signature: the team never changes colour and never gets a bowl; it is set in ONE solid teal capsule (the "team tile") and carries a straight coral SOUND BAR underneath: one bar = one sound.** That is the UK "sound button / sound bar" notation (dot under a one-letter sound, bar under a digraph) made into a house mark. It is deliberately different from all three neighbours: coral letters (syllable-reading, spelling-rules) are colour-dependent and die on a B&W printer, a curved bowl already MEANS "syllable" on our pages (`syllable-arcs.js`), and a dashed box already means "write here". The bar is straight, solid, under the descender line, and survives greyscale because it is a SHAPE, not a hue.

## 1 Page concept (base "Which Letter Team?", d2)

**"The Team Table."** Across the room a teacher sees three big team tiles standing at the top of three columns like team captains (sh · ch · th, each with its coral bar), and under them a calm ladder of eight pictures, each row repeating the three teams as small quiet tiles in the SAME columns. The child says the picture, finds the team she hears, and circles that tile in the row. Why this beats a card grid: the three teams are the focal apparatus and appear large ONCE; the column alignment lets a teacher mark a whole page in one downward glance (a wrong circle is in the wrong column); the fixed column order is structural (the pedagogy's "chips in one fixed page order"), not a promise. Top quality comes from: one focal band (the captains), rows that grow to ~74 px, 105 px of air between neighbouring row tiles so a six-year-old's pencil circle never touches the next team, no printed words anywhere in the body, and the bars as the only coral on the page (the base has no writing, so no dashed boxes either).

## 2 Layout (d2, 722 body)

Lane: `.ws-lane` default padding, **inner 639** (no override). Every picture row is `minmax(64px, 1fr)` with a 4 px gap, so the 722 body grows rows to ~74 px and the fi four-line-title body (677) still fits at the floor.

```
body 722 (worst chrome: 3-line title + 3-line instruction)               639 wide
+--------------------------------------------------------------------------------+
| [head row, h 84]                                                               |
|  col A 132 (empty, cream)  | col 1 169        | col 2 169        | col 3 169     |
|                            |  (  s h  )       |  (  c h  )       |  (  t h  )    |  hero tiles 96-110 x 58
|                            |   ======         |   ======         |   ======      |  coral bar 4 px
+--------------------------------------------------------------------------------+  gap 12
| [1] [pic 56] | (sh) | (ch) | (th)    row strip h >= 64, cream, r 10            |
| [2] [pic 56] | (sh) | (ch) | (th)    gap 4                                     |
|  ... 8 rows                                                                    |
+--------------------------------------------------------------------------------+
```

Vertical at the floor: head 84 + gap 12 + 8 rows x 64 + 7 gaps x 4 = 84 + 12 + 512 + 28 = **636 <= 677 <= 722** (the 722 body grows each row to ~74 px; the fi 677 body to ~69). Horizontal per row: badge 28 + 8 + picture card 76 (picture 56-64, pad 6) + 20 = **132** (col A) + 3 x 169 = 507 -> **639**.

| element | size | floor check |
|---|---|---|
| hero tile (`teamTile` size 'hero') | font 40, h 58, w = max page text @40 + 44, min 96 (en 96, de sch 106, fr/pt/nl/fi 96) | G1 min element 44 ok |
| row tile (`teamTile` size 'row') | font 28, h 46, w = max page text @28 + 28, min 64 (en/fr/pt/nl/fi 64, de 72) | 46 >= 44; letters 28 >= 26 answer floor |
| picture | 56 x 56 at the row floor (grows with the row, max 64), in a 76-wide cream card | >= 44 |
| number badge | `.ws-card-badge` style, 28 | text 16 Baloo |
| row-tile air | (169 - 72) = 97 px min between de tiles, 105 en | a pencil circle ~20 px wider than the tile fits |

## 3 Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `rows` | 6 | **8** | 10 |
| `teams` | 2 (`sets.k`) | **3** (`sets.exemplar`) | 3 |
| `perTeam` | [3,3] | **[2,3]** | [3,4] |
| `rowH` (floor) | 84 | **64** | 52 (picture 46) |
| `heroPx` / `rowPx` | 40 / 28 | **40 / 28** | 40 / 28 |
| `maxRunSameColumn` | 2 | **2** | 2 |
| `requireFoilLetterInWord` | false | **false** | true (e.g. en `chess`-type: foil team's letters present) |
| `showWord` | false | **false** | false |

d3 vertical: 84 + 12 + 10 x 52 + 9 x 4 = 652 <= 677.

## 4 Answer-hiding + uniqueness

Nothing in the body is a word: the picture is the only prompt, the tiles are the only print. Every row repeats the same three tiles in the same order, so the tile a child circles is the whole answer and the page carries no hint of it (no size, colour or position difference between the answering tile and the foils; the capsule width is the per-page MAX so a short team cannot be told apart by width). Stamps per row: `data-lcs-key`, `data-lcs-seg` (panel-signed, `|`-joined), `data-lcs-teams` (page order); verify() re-derives the answer column = the unique page team that is an ELEMENT of `seg`, fails on 0 or >= 2, and fails if any other page team occurs as a letter substring of the word. Distribution: each team answers 2-3 of 8 rows; no column answers 3 rows in a row (`maxRunSameColumn:2`), measured in both directions (per row and per column). A wrong circle is visibly wrong to the teacher because the correct column is a straight vertical line on a checked page: any circle off that line is the error.

## 5 Primitives / components

**Reused (exact names + file).** `.ws-card-badge` (page.css) for row numbers · `.ws-card` / `.ws-card-stage` (page.css) for picture cards · `positionKey` (`templates/components-b3/letter-of-the-week.js`) for F4 · `gapWord` (`templates/components-b3/spelling-rules.js`, mode 'gap') for F2 · `blankNumeralBox` (`templates/components-b3/ordinal-numbers.js`) for F5 · `.ws-match`, `.ws-match-item`, `.ws-match-dot--left/--right` (page.css) for F3 and F1 · `lib/b3-picture-index.js` (themeless pictures).

**NOT used.** `soundBoxes` (K-318: its wide dashed box means "write the sound here" and its curved tie is K-318's mark; reusing it would make this family look like a sound-count page) · `syllableArcs` (a bowl means a SYLLABLE on our pages; a team under a bowl would teach that sh is a syllable) · `letterChips` (square grid-bordered single letters; a two-letter team in a square reads as two letters, and its 48 px square does not hold "sch" at a readable size: 43.4 px of ink @28 in a 48 px box) · `ruleBox` (the coral-chip banner is spelling-rules' signature; a coral FILLED chip also prints as solid grey and the letters vanish on B&W) · `primitives/bin.js` (a waste bin; F1's houses are not rubbish) · coral-coloured letters (syllable-reading / spelling-rules convention; colour-only signal).

**NEW `templates/components-b5/digraphs.js`** (behind the `components-b5.js` barrel):

1. `teamTile({ text, size:'hero'|'row'|'house', w, tone:'lead'|'quiet' })` -> inline SVG.
   - font px F: hero 40 · row 28 · house 56. Height `h = round(0.859*F + 22)`: row 46 · hero 56 -> **58** (rounded up to even) · house 70 -> **72**.
   - `w` is passed in by the caller = per-page max text width (measured table above is the engine's reference; the engine computes it with the same `measureText` path the renderer uses, or, since build() has no metrics, from a committed per-team width table `data/b5/digraphs-team-widths.json` generated by a measure tool on the real woff2, same idea as `font-metrics.json`) + padding (hero 44, row 28, house 48), min (hero 96, row 64, house 120).
   - viewBox `0 0 w h`. Capsule `rect x=1.25 y=1.25 width=w-2.5 height=h-2.5 rx=(h-2.5)/2`, fill `white`, stroke `teal` 2.5 (lead) / `grid` 2 (quiet).
   - Letters: ONE `<text>` (never one per letter: the team is one object), `text-anchor=middle`, x = w/2, baseline y = `6 + 0.6719*F` (hero 32.9, row 24.8, house 43.6), Baloo 2 700, fill `teal`, `letter-spacing:0`.
   - Sound bar: `line x1 = w/2 - textW/2 + 2  x2 = w/2 + textW/2 - 2`, y = baseline + 0.1875*F + 5 (below every descender: q in qu, g in ng, p in ph, pf), stroke `coral` 4 (lead) / `inkSoft` 3 (quiet), `stroke-linecap:round`. Minimum bar length 18 px (for "ei" @28: 22.8 - 4 = 18.8 ok).
   - Stamps: `data-lcs-team="<text>"`, `data-lcs-tile="hero|row|house"`, `data-lcs-bar="1"`. No answer stamp on a tile ever.
   - Floors asserted by the gate: row tile h >= 44, letters >= 26 px, bar >= 3 px stroke, bar length >= 18.
2. `teamTable({ teams, rows:[{src,key,seg}], rowH, colA=132 })` -> the base body (grid `132px repeat(3,169px)`), stamps `data-ws-content`, `data-lcs-teams`.
3. `teamGapWord({ word, gap:{from,len}, gapCells, cell=34, fontPx=30 })` -> wraps `gapWord(mode:'gap')` in `<div style="position:relative;height:cell+22">` and adds ONE absolutely positioned SVG sound bar under the gap box: left = `from*cell + 6`, width `gapCells*cell - 12`, top `cell + 14`, stroke `coral` 4. The bar sits under the box on EVERY row (it says "one sound goes here", never which one).
4. `teamWord({ word, seg, team, px=28 })` -> HTML `<span>` with the team's grapheme wrapped in `<span data-lcs-teamspan style="text-decoration:underline;text-decoration-color:#F2784B;text-decoration-thickness:4px;text-underline-offset:0.32em;text-decoration-skip-ink:none">`. CSS lays out the letters (no metrics at build); `skip-ink:none` keeps the bar whole under descenders. Colour is the coral token (lint-safe literal).
5. `teamHouse({ team, w=190, h })` -> a `.ws-groupbox` (white, teal 2.5, r 16) with a house-size `teamTile` centred 24 px below its top and an empty landing field below (F1).
6. `teamPositionCard({ src, key, seg, silent, pos, team, w=314, h })` -> own card (NOT a positionCard wrapper, which has no tile slot): picture 96 left; right column = row-size `teamTile` (lead tone) over three `positionKey` + dashed coral 44 px boxes (the positionCard box style copied verbatim: 2.5 dashed coral, r 10). Stamps as `positionCard` + `data-lcs-team`.

No new `primitives/` file: every drawing is a capsule, a line and text.

## 6 Locale slot structure

Text surfaces in the BODY: the team letters only (tiles, 1-3 letters, never localized words) on base, F1, F2 bank, F4; printed words on F2 (panel word, gap cells) and F3 (panel word); panel sentences on F5. Instruction + title are shell chrome (Nunito 800 / Baloo 2 700, shell sizes). Longest-locale reserve:
- tiles: widths are per-page and measured; the widest shipping team is de `sch` (hero 106, row 72); fr `eau` (66 @40) is excluded from every shipped set by `samesound` (au/eau/o) but still fits (hero 110) if a panel swaps it in.
- F2 words: <= 12 letters, cells 34 -> max 13 cells = 442 px (13 = a 12-letter word whose 2-letter team sits in a 3-cell gap) in a 469 px word column; cells are fixed-width, so no locale reserve is needed.
- F3 words: word column 240; widest measured de `Schmetterling` 178.9 @28 (+ 16 padding = 195 ok); rule: a word whose @28 width > 216 steps to 24 px; > 190 @24 is REFUSED from the pool (never shrinks below 24).
- F5 sentences: Nunito 800 24, line 48, text column 470 -> ~41 chars/line; cap 3 lines = 120 chars per sentence (en sentences are ~50-70 chars: 2 lines; de/fi +40 % still 3 lines).
- Font floor: no body text below 16 (badges); tile letters >= 28 at G1 rows, 40 hero, 56 house; nothing near 9 px.
- Nordic/fi specifics: fi tiles `aa uu ää` @28 29.8-32.1 px -> the 64 min width; `ä` renders from the Baloo 2 latin subset (U+00E4, loaded in the measurement).
- Capitals: tiles are always lower-case. de nouns keep their capital in F2/F3/F5 words: in F3 a word-initial team (`Schaukel`) carries the bar under `Sch`. In F2 a de word-initial team would make the child write a capital the lower-case bank does not show, so **de F2 never gaps a word-initial team** (config `gapInitialCapital:false`, a data filter on the pool, validator-checked); no capitalised bank tile is introduced.

## 7 Five variation faces

Face modes/ids per the pedagogy file; this section gives the visual delta. Every face stamps `data-ws-content`, keeps the team tile + sound bar, and registers under `coordinate.type:'digraphs'`.

**F1 "Sort by Letter Team" (K, `sort-two`, CODE): TWO TEAM HOUSES.** Delta: no row tiles, no table; a centre column of 6 pictures between two tall `teamHouse` panels, each crowned by ONE house-size tile (font 56, h 72, bar 4). The child draws a short horizontal line from each picture to the house whose team she hears (lines never cross the page: every picture has a `.ws-match-dot` on both sides). Numbers: houses 190 x full height, gaps 66, picture cards 120 wide (picture 72, K floor 56) -> 190 + 66 + 120 + 66 + 190 = **632 <= 639**; 6 cards x 88 + 5 x 12 = 588 <= 722 (rows `minmax(88px,1fr)`). Split 3/3, no 3 consecutive pictures of one house. Verify hook: `data-lcs-bin-of` per picture = the K-set team in `seg`; houses === `sets.k`; split 3/3 (poison 6/0 fails); house tile width equal on both sides. Query face: "+ kindergarten/Vorschule/maternelle/educação infantil/kleuters/esikoulu" + sort.

**F2 "Write the Missing Letter Team" (G1, `gap`, CODE): BANK + GAPPED WORDS WITH A BAR.** Delta: the captains move into a slim bank strip at the top (3 hero tiles in a white dashed-teal banner, h 76, NO coral chip banner), and each of 8 rows is badge + picture 60 + `teamGapWord` (letter cells 34, font 30, ONE dashed coral gap of `gapCells` = the longest bank team, coral bar under the gap). Numbers: bank 76 + gap 14 + 8 x 64 + 7 x 8 = **658 <= 722**; row width 28 + 10 + 60 + 16 + 442 = 556 <= 639. Gap box 68 x 42 (2-letter teams) / 102 x 42 (de 3-cell): 34 px per letter for a G1 pencil. Verify hook: every gap box has the identical cell count on the page; frame uniqueness for every other bank team; the gap letters never emitted. Query face: missing digraph / fehlende Buchstaben / complète avec le son / complete com o dígrafo / vul de klank in / puuttuva pitkä vokaali.

**F3 "Read and Match" (G1, `match`, CODE): BARRED WORDS TO PICTURES.** Delta: the direction flips from ear to eye: 6 printed words in the left `.ws-match` column, each set by `teamWord` so the team carries the SAME coral sound bar the tiles carry (letters stay ink: the bar, not colour, marks the team), 6 shuffled pictures right. Numbers: rows 6 x 96 + 5 x 12 = **636 <= 722**; left item 240 x 80, right item 112 x 80 (picture 72), column gap 200 incl. dots -> 240 + 200 + 112 = 552 <= 639. Two words per team; derangement (no word opposite its own picture). Verify hook: `data-lcs-pair` both sides, `data-lcs-teamspan` text === the team element of `seg`, one teamspan per word. Query face: read digraph words / Wörter mit sch lesen / lire des mots avec le son / leia palavras com dígrafos / lees en koppel / lue ja yhdistä.

**F4 "Where Is the Letter Team?" (G1, `position`, CODE; pt REFUSED): TILE OVER THREE POSITION BOXES.** Delta: a 2 x 4 grid of `teamPositionCard`s; each card shows its OWN team as a lead row tile (given, not the answer) over the three wordless `positionKey` pictograms and dashed boxes; the child colours one box. Numbers: cards 314 x 164, gap 11 wide / 12 high -> 2 x 314 + 11 = **639**; 4 x 164 + 3 x 12 = **692 <= 722** (rows `minmax(150px,1fr)`; fi's 677 body runs at 158). Card interior: 8 + picture 96 + 12 + right column 148 (3 x 44 + 2 x 8) + 8 + 4 border = 276 <= 314. Right column height 46 + 8 + 14 + 4 + 44 = 116 <= 148. Verify hook: `data-lcs-pos` re-derived from `seg` minus `silent`; each position used 2-3 times; the tile is on every card (poison: a card whose tile differs from its seg team fails). Query face: beginning, middle or end digraph / Wo hörst du sch? / où entends-tu le son / waar hoor je de klank / missä kohdassa.

**F5 "Letter Teams in Sentences" (G2, `text`, CODE): ONE TEAM, THREE SENTENCES.** Delta: text-first and one team only: a banner holding ONE house-size lead tile of the target team (72 high) and nothing else (no words in the banner), then three sentence cards (badge 28 | Nunito 800 24 text, `letter-spacing:0.02em` so a pencil circle fits around 2-3 letters | `blankNumeralBox` 56 x 56 at right). Numbers: banner 96 + gap 20 + 3 cards x 168 (3 lines x 48 + 24) + 2 x 18 = **656 <= 722** at the 3-line worst case; en 2-line cards 120 -> 116 + 360 + 36 = 512, the stack centres. Width 28 + 12 + 470 + 16 + 56 + padding 2 x 16 = 614 <= 639. Verify hook: per-sentence count = target elements of the signed token `seg`; 1-4 per sentence, 5-8 total; no numeral printed; the target team is NOT marked in the sentences (only the banner tile carries a bar). Query face: digraphs in sentences / sch in Sätzen / le son ou dans un texte / tweetekenklanken in zinnen / pitkät vokaalit lauseissa.

**Why these five:** they are the pedagogy's five moves (sort at K, write, read, locate, find in text), each a different act on the SAME visual unit, so a teacher recognises the family on every page from the tile + bar alone, while the body layouts are five different shapes (houses, rows with a bank, two-column match, card grid, text cards) and never the base table. **First to cut:** F4 position (already refused in pt, thin at "beginning" in fi, closest to K-326 at an estimated 0.20 similarity).

Hub contract (restated): `apps.digraphs` + `axes['exercise-type'].digraphs` slug+name x11; one landing per face per SHIPPING locale; expected rows en de fr nl fi = 6, pt = 5 (F4 refused), es it sv da no = 0 (whole-family refusal) -> **35**; gate `scripts/verify-hub-type-rows.js` reads the README matrix via `hub-expectations.json`.

## 8 Two alternatives + recommendation

- **Alt 1, the pedagogy's literal card grid** (8 `.ws-card`s in 2 x 4, picture + 3 chips each, the G2-315 look). Rejected: 24 identical chip groups scattered across 8 cards is the busiest option for the same content, the teams are never large, the page looks like a spelling-rules sibling from across the room, and checking needs a card-by-card read instead of one glance down a column.
- **Alt 2, the "linking arc" unit** (letters joined by a hand-holding arc above or below). Rejected: a curve under letters already means SYLLABLE on our pages (`syllable-arcs.js` bowls, G1-305 + K-318 tiers) and K-318 uses a curved tie under a box; an arc above collides with diacritics (fi `ää`, fr `oû`-type spellings in panel words) and the Baloo 2 ascender line.
- (Also considered: a "team train" with the team as a locomotive pulling picture wagons. Rejected: decoration that needs new drawing, does not print cleanly, and the train metaphor says nothing about ONE sound.)

**Recommendation: the Team Table with the capsule + straight sound bar.** It gives the family one mark that is honest to the concept (one bar = one sound, the notation many G1 teachers already use), is greyscale-proof by shape, works identically for 2- and 3-letter teams and for fi long vowels (the bar under `aa` = one long sound), and never collides with the syllable, blend or spelling-rule marks already on our pages.

## 9 Risks, mitigations, print check

- **Greyscale.** Coral `#F2784B` prints at ~59 % grey (luma 151), teal `#146B5E` at ~31 % (luma 80); the bar is a 4 px solid stroke under white capsule space, so it reads as a line even on a toner-saving printer. No meaning rides on hue alone: tile = shape, bar = shape, row tile vs hero = size + stroke.
- **Descenders.** qu / ng / ph / pf / de `g` words: the bar sits 5 px below the descender line in tiles; in F3 words `text-underline-offset:0.32em` + `skip-ink:none` (0.32 em > 0.1875 em descender). Human eye must confirm on a pt `qu` and de `pf` render.
- **Widths.** Per-page max tile width comes from a committed measured table, not from build-time guessing; a team missing from the table THROWS.
- **Overflow in long locales.** Body stacks have explicit sums above at the 722 worst case; F3 steps font / refuses too-long words; F5 caps sentences at 3 lines (the gate measures `scrollHeight` per card).
- **Pencil space.** Base circles: >= 97 px air between row tiles; F2 34 px per letter; F4 44 px boxes; F5 letter-spacing 0.02 em + 48 px line height.
- **Cut lines:** none (nothing is cut on any face).
- **9 px floor:** smallest text is the 16 px badge numeral.
- **QA lint catches:** overflow, footer intrusion, palette (coral/teal/grid/inkSoft/white only; the CSS underline colour is the coral token literal), font floor, blank page (`data-ws-content`). **Family gate must assert:** tile h >= 44 and letters >= 26 at G1 (>= 56/30 K houses), bar present on every tile and under every gap and team span, equal tile widths per page, one answer per row, column-run cap. **Only a human eye catches:** whether a picture is SAID with the intended word (the cherry-as-apple class: every picture opened), whether the bar reads as "under the team" and not "under the word" in F3 at 24 px, and native naturalness of F5 sentences.

## 10 Summary

1. Family mark: one solid teal capsule per letter team + a straight coral "sound bar" under it (one bar = one sound); no coral letters, no bowls, no dashed boxes on the unit itself.
2. Base = the Team Table: three big team "captains" at the top, eight picture rows beneath with the teams repeated in fixed columns; circle one; 682 / 722 px, 639 wide.
3. Faces keep the unit and change the body shape: F1 two team houses (K, lines), F2 bank + barred gap words, F3 barred words to pictures, F4 tile over position boxes, F5 one team in three sentences.
4. New code = one file `components-b5/digraphs.js` (teamTile, teamTable, teamGapWord, teamWord, teamHouse, teamPositionCard) + a measured team-width table; reuses gapWord, positionKey, blankNumeralBox, .ws-match.
5. Ships en de pt fr nl fi (fi long vowels), 35 hub rows; `fruits/cherry` rejected on opening (reads as an apple).
