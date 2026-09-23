# G2-358 `synonyms` - DESIGN A ("Linked Words": the joined-rings page)

Designer A, 2026-09-23. Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (rank 9, "never and antonyms", de head Wortfeld), the synonyms sections of the four `_work/_selection-*.md`, `_work/G2-358-pedagogy.md` (faces, fences, bank schema, validator: ALL kept; this file designs the page, it does not re-open the pedagogy). LOOKED at `out/b3-sweep/en/` G1-307, G1-336, G1-337, K-351 and `out/b4-sweep/en/` G1-367; read `templates/components-b3/opposites.js`, `templates/layouts/card-grid.js`, `page/page.css` (`.ws-card` 126, `.ws-card-badge` 139, `.ws-achip` 406, `.ws-bankword` 417, `.ws-match-dot` 381), `components-b4/cloze.js` (`gapBox` 132, `gapRow` 176, `derange` 243, `gapBank` 256), `components-b3/ordinal-numbers.js blankNumeralBox` 151, `components-b2.js rulingBlock` 76, `../b4-designs/G1-350-cloze.md` §2.

**Measurements.** (m) = measured 2026-09-23 with the shell woff2 (`assets/fonts/fonts.css`) from a `file://` page in puppeteer (both faces confirmed `loaded`; my Schmetterling reads 163.8 at Baloo 700 20 / pad 16 and 152.4 at Nunito 800 18 / pad 14, identical to the G1-350 file, so the rig agrees with the shipped one). Script `%TEMP%/.../scratchpad/G2-358-A-measure.js`. Widths at a size I did not render are linear scalings of a measured size and marked *est.* Pictures: OPENED on contact sheets `scratchpad/G2-358-A-pics.png` + `G2-358-A-pics2.png` (170 px tiles, white-flattened).

## Boundary

This page is NOT `opposites` (G1-307, K-351, G1-335, G1-336, G1-337, G2-320), whose visual signature is the teal double-headed arrow `oppositeArrow` (`opposites.js:54`) meaning "these point APART", full-width stacked cream lanes with a word + three `.ws-pill` chips (G1-337), and three-line writing rows; not `cloze` (G1-350, G1-366..368, G2-349/350: a picture + a sentence around a dashed coral box, noun gap); not `word-classes` (G2-275/285-287, G1-293/300: noun/verb/adjective bins); not `compound-words` G2-316 family (two word parts + a join, "word web"); not `feelings` K-319 family (one face, one word). **Visual signature of `synonyms`: the SAME-LINK, two interlocking teal rings meaning "these are JOINED".** Opposites point apart; synonyms hold on. The ring appears on every face (the card band, the half-rings on the match tags, the plot sign), always teal, never an arrow, never a "=" or "≈" (math glyphs; `≈` is outside every font subset). Every face is laid out differently from its nearest neighbour: base = 2 x 4 twin cards (G1-337 = 6 full-width lanes), F2 = half-ring tags (K-351 = coral dots), F4 = speech-bubble bank with the head word struck (G1-367 = two chips per row, cloze = dashed rectangle bank).

## 1 Page concept (base)

**"Linked Words: 8 twin cards."** From across the room: eight identical cream cards in two columns, each topped by a pale-teal band carrying the two joined rings and ONE big word, with four white word tags in a neat 2 x 2 square underneath. The child reads the band word and circles the one tag that means the same. That is the whole page: one focal apparatus repeated, no pictures, no lines, no bank, generous gaps (14 px between cards, 14 x 10 px between tags so a pencil loop never touches a neighbour).

Why it is top quality:
- **The band is the question, the square is the answer space.** A 7-8-year-old sees the target word is different in kind (bigger, on colour, with the ring mark) from the four candidates (smaller, white, all alike).
- **Uniform tag widths.** All four tags on a card are the same width (the grid cell), so a long word never stands out as "the special one" (length leak, the reason `choiceGap` pills are content-sized and ours are not).
- **The 2 x 2 square solves the long-word problem.** The pedagogy's one-row lane (plate 150 + 4 chips at 11 chars) was *est.* 646 > 639; a 2 x 2 cell is 144 px wide and holds a 13-glyph de word at Baloo 18 (Schmetterling-class, *est.* 114 of 123 px text room). No per-locale font fallback needed.
- **Exact answer balance you can see is fair:** each of the 4 tag positions holds the answer exactly twice on the page.

## 2 Layout (d2, 722 body)

**Chrome.** Body 722 (three-line title + three-line instruction); 677 with a four-line fi title: every stack below is checked against BOTH. `.ws-page` inner 675. `cardGrid` (`layouts/card-grid.js`, `.ws-cardgrid` gap 14, `page.css:119`) with `grid-template-rows: repeat(4, minmax(158px, 1fr))`.

```
x 0                                  330.5 344.5                              675
y 0   +------------ card 1 ------------+  +------------ card 2 ------------+
      |[1]  (oo)  happy                |  |[2]  (oo)  quick                |   band: tealSoft, h 40, r 10
      |  band 302 x 40, pad-left 36    |  |                                |   pad 0 10 0 36 (badge 30 clears)
      |                                |  |                                |   gap 8
      | +- tag 144 -+ 14 +- tag 144 -+ |  | [ slow ]      [ fast ]         |   tags: white, 2.5 teal, r 12
      | |   sad     |    |   glad    | |  |                                |   h 36, Baloo 700 18, centred
      | +-----------+    +-----------+ |  |                                |   row gap 10
      | +-----------+    +-----------+ |  | [ loud ]      [ tired ]        |
      | |  angry    |    |  sleepy   | |  |                                |
      | +-----------+    +-----------+ |  |                                |
      +--------------------------------+  +--------------------------------+
y 158 (row gap 14)  ... cards 3..8, same ...
y 674 end at 4 x 158 + 3 x 14 = 674  (<= 677; at 722 each row opens to 170)
```

Arithmetic (card):
- Card outer width = (675 - 14) / 2 = **330.5**; `.ws-card` border 2 + padding 12 -> inner **302.5** (css math, matches the "card inner 302" measured in `../b4-designs/G1-350-cloze.md` NOT-used note).
- Card inner height = band 40 + gap 8 + tag 36 + row gap 10 + tag 36 = **130**; + padding 24 + border 4 = **158**. Four rows + 3 gaps of 14 = **674 <= 677 <= 722**. At 722 the rows are 170; the 12 px slack per card goes to `justify-content:space-evenly` inside the card (band and square separate slightly; tags never grow).
- Band: `display:flex; align-items:center; gap:8px; padding:0 10px 0 36px; height:40px; background:#DDEBE8; border-radius:10px`. Content = `sameLink` 30 x 18 + gap 8 + target word Baloo 2 700 **24** teal `#146B5E`. Room for the word = 302.5 - 46 - 38 = **218 px**. Widest measured targets at 24 (m): hämmästynyt 149.1 · Schmetterling 153.3 · wunderschön 147.6 · surpreendido 145.8 · kochend heiß 145.4. All fit with >= 64 px spare. `maxGlyphs` 13 (target and tags).
- Tag square: `display:grid; grid-template-columns:1fr 1fr; column-gap:14px; row-gap:10px`. Cell = (302.5 - 14) / 2 = **144.2**. Tag = `.ws-achip` + inline `width:100%; height:36px; border-radius:12px; padding:0 8px; font-size:18px` (Baloo 2 700, ink `#3A3530`, white, 2.5 teal border from `page.css:406`). Text room = 144.2 - 5 - 16 = **123 px**. Widest candidates at 18 (*est.*, scaled from the measured 19 px text widths): Schmetterling 114.1 · hämmästynyt 110.9 · wunderschön 109.8 · surpreendido 108.4 · kochend heiß 108.1 · erschrocken 101.6 · blitzschnell 96.3 · beobachtet 95.8 · marschiert 91.9. Everything <= 13 glyphs fits; a 14-glyph word is refused at build (§6), never shrunk.
- Floors (G2): tags 36 high (>= 36), text 18 (>= 16), target 24. The page has no numeral answer.

**Worst chrome.** 674 fits the fi 677 stack with 3 px to spare; there is no chrome in which this page overflows. verify() asserts the grid's bottom <= body bottom at both stacks (the lint does too).

## 3 Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `mode` | base | **base** | base |
| `cards` | 6 | **8** | 8 |
| `cols` x `rows` | 2 x 3 | **2 x 4** | 2 x 4 |
| `chips` | 3 | **4** | 4 |
| `chipGrid` | `1x3` (one row of three, cell 91.5, `maxGlyphs` 7) | **`2x2`** | `2x2` |
| `tiers` | [1] | **[1,2]** | [2] |
| `pos` | ['adj'] | **['adj','verb']** (one POS per card; all 4 tags share it) | ['adj','verb'] |
| `maxGlyphs` | 7 | **13** | 13 |
| `targetPx` / `chipPx` / `chipH` | 26 / 20 / 40 | **24 / 18 / 36** | 24 / 18 / 36 |
| `rowMin` | 200 | **158** | 158 |
| `slotBalance` | `exact` (each of 3 slots twice) | **`exact`** (each of 4 slots twice) | `exact` |

d1 stack 3 x 200 + 2 x 14 = 628. d3 = d2 with tier-2 groups only (less frequent words, same apparatus). The pedagogy's d3 `write:true` is NOT designed: a writing line per card costs 40 px x 4 rows = 834 > 722. Not shipped; no copy describes d1 / d3.

## 4 Answer-hiding + uniqueness

- The band shows the task word; the answer is one of four identically sized white tags. Nothing on the page marks it (no colour, no order, no length: tags are the cell width). The answer is stamped only: card `data-lcs-target="<groupId>:<word>"`, each tag `data-lcs-group="<groupId>"` + `data-lcs-slot="0..3"`.
- **Uniqueness** is the pedagogy's validator (exactly one tag shares the target's group; no antonym, `near`, prefix-antonym or shared group among tags). The DESIGN adds: slot counts exact (each slot = the answer on exactly 2 of 8 cards; `rng.shuffle([0,0,1,1,2,2,3,3])`), and never the same slot on 3 consecutive cards in reading order (1-2-3-4-5-6-7-8, row-major).
- **The child marks:** one pencil circle round one tag. **Wrong is visible:** a circled tag whose word does not mean the band word; with 8 cards on a 2 x 4 grid the teacher reads a card in one glance (band word + circled word, 20 mm apart).

## 5 Primitives / components

**Reused (exact).**
- `templates/layouts/card-grid.js cardGrid({cards, cols, rows, numbered})`: base, F1 (supplies `.ws-card` + `.ws-card-badge` 30 px teal corner).
- `page/page.css`: `.ws-card` (126), `.ws-card-badge` (139), `.ws-achip` (406; overridden inline per face), `.ws-bankword` / `.ws-bank` (416-417), `.ws-lane` (401), `.ws-blankbox` (445), `.ws-match .ws-match-col .ws-match-item .ws-match-item--plain` (354-379).
- `templates/components-b3/ordinal-numbers.js blankNumeralBox({w, h, answer:'', attrs})` (151): F3 rank boxes (stamps `data-lcs-answer=""`, never `undefined`).
- `templates/components-b4.js` (cloze): `gapBox({w, h, attrs})` (132) for the F4 gap; `derange(order, rng)` (243) for F2 right column, F3 printed orders, F4 bank; `gapBank` (256) guard logic (`pillEstimate`, two-row refusal) re-used inside `sayBubble`.
- `templates/components-b2.js`: `wordBank({words, wordPx:18})` (F4 bank pills, F5 word pile), `rulingBlock({rows, w, h, glyphH})` (76; F5 writing rows).
- `lib/b3-picture-index.js hasPicture` (validate time, F1), `lib/b2-common.js fileUri`, `lib/rng.js`, `lib/b3-instructions.js fillSlots` (F4 `{name}` only).

**NOT used (and why).**
- `oppositeArrow`, `oppositeChoiceRow`, `oppositeChipRow`, `oppositeMatch` (`components-b3/opposites.js`): the arrow is the opposites mark; reusing any of them makes the two families one look.
- `.ws-match-dot` (coral dots): K-351's signature; F2 replaces them with half-rings.
- `gapRow` (`cloze.js:176`): throws without a picture (`picPx < 44`), F4 has none; its inline-box geometry is cloned in `sayRow`.
- `choiceGap` / `.ws-pill` content-sized chips: length leak; our tags are cell-width.
- `answerBox` (stamps `data-lcs-answer="undefined"` without an answer), `writingRow` single rows on cards (height), `sceneStage`, `iconRows` (no pictures except F1).
- `thermometer.js` for F3: a thermometer means temperature (weather-symbols K-356 family) and would make every scale look like "hot"; F3 uses a neutral strength-step key.

**NEW `templates/components-b5/synonyms.js`** (behind `templates/components-b5.js`; palette tokens only; every function throws on a missing required arg):

1. `sameLink({w=30, h=18})` -> inline SVG, `viewBox="0 0 30 18"`, `aria-hidden="true"`, `data-lcs-same-link="1"`. Two stadium rings: A = `rect x=1.5 y=3 w=17 h=12 rx=6`, B = `rect x=11.5 y=3 w=17 h=12 rx=6`, both `fill:none; stroke:#146B5E; stroke-width:3`. Over-under interlock: draw A, draw B, then redraw A's top-right arc segment `path d="M13 3 H 12.5 A6 6 0 0 1 18.5 9"` in teal 3 over B, and a 4 x 3 cream (`#DDEBE8` on bands, `#FBF3E4` on cream) gap rect under it at (12.5, 1.5) so the rings read as linked, not overlapped. Minimum size 24 x 14 (stroke stays 3). Greyscale: teal on tealSoft = dark on light.
2. `twinCard({target, groupId, tags:[{word, groupId}], answerSlot, targetPx=24, chipPx=18, chipH=36, grid:'2x2'|'1x3'})` -> card inner: band (`data-lcs-band`) + square (`data-lcs-square data-lcs-grid="2x2"`), tags `<span class="ws-achip" data-lcs-tag data-lcs-group data-lcs-slot>`; root `data-ws-content data-lcs-target`. Throws if `tags.length !== chips`, if `answerSlot` outside range, if any tag word > `maxGlyphs`.
3. `pictureTwinCard({pic:{src, theme, noun}, tags, answerSlots:[i,j], picPx=72, chipPx=19, chipH=44})` (F1): band = white rounded frame `height:80px` centred picture `.ws-icon` 72 + `sameLink` 30 x 18 top-right of the band (absolute, right 8 top 6); square 2 x 2 at `chipH 44`. Stamps `data-lcs-pic="<theme>/<noun>" data-lcs-answers="i,j"`.
4. `linkTag({word, side:'left'|'right', groupId, w=210, h=64, px=22})` (F2): `.ws-match-item` (left, cream) / `.ws-match-item--plain` (right, white) with a `halfRing` SVG instead of the dot: `viewBox="0 0 16 28"`, `path d="M2 3 A 11 11 0 0 1 2 25"` (right-facing arc for left tags; mirrored `scale(-1,1)` for right tags), stroke teal 3, fill none, positioned `right:-18px` / `left:-18px`, `top:50%`, `transform:translateY(-50%)`. A drawn line from ring to ring "closes the link". Stamps `data-lcs-match-left|right="<groupId>"`.
5. `strengthKey({w=280, h=56})` (F3, once per page): SVG `viewBox="0 0 280 56"`: three blocks `x=0|100|200, w=80`, bottoms at y 34, heights 12 / 22 / 34, radius 4, fills `#DDEBE8` / `#146B5E` at `fill-opacity:0.5` / `#146B5E`; under each block a numeral `1` `2` `3` (Baloo 2 700 18, `#3A3530`, centred, baseline y 54). `data-lcs-strength-key="1"`. The numerals are the fixed scale legend, identical on every page, never an item's answer.
6. `rampIcon({w=48, h=32})` (F3 row lead): same three blocks scaled (`x=0|17|34, w=14`, heights 11 / 21 / 32), no numerals. `aria-hidden`.
7. `shadeRow({n, scaleId, cells:[{word, rank}], cellW=185, tagPx=20, tagH=44, boxW=40, boxH=32})` (F3): `.ws-lane` inline `padding:6px 16px` (inner stays 639) grid `48px repeat(3, 1fr)`, column-gap 16 / 10; each cell = tag (`.ws-achip`, `height:44px; padding:0 14px; font-size:20px; border-radius:22px`) above `blankNumeralBox({w:40, h:32, attrs:'data-lcs-rank-box data-lcs-rank="<rank>"'})`, gap 6. Stamps `data-ws-content data-lcs-scale="<id>" data-lcs-order="2,0,1"`.
8. `sayBubble({head, words, rowOrder, rng, wordPx=18})` (F4): outer `div` `border:2.5px solid #146B5E; border-radius:18px; background:#FFFFFF; padding:10px 14px; position:relative; margin-bottom:26px` + a tail SVG `viewBox="0 0 24 16"` `path d="M0 0 L24 0 L4 16 Z"` fill white stroke teal 2.5 (stroke drawn on the two outer edges only), absolute `left:44px; bottom:-16px`. First item = the head tag: `<span data-lcs-head>` Baloo 2 700 20 `#8A8276` with `text-decoration: line-through 3px #F2784B`; then the bank pills via `wordBank`. Throws via the `gapBank` two-row estimate (never a third row). Stamps `data-lcs-bank-banner data-lcs-say-head="<head>"`.
9. `sayRow({n, sentenceId, text, answer, gapW, fontPx=18})` (F4): `.ws-lane` `padding:5px 16px`, grid `30px 1fr`, column-gap 12; badge = the read-and-do teal circle (cloned, 30 px); `<p data-lcs-sentence>` Nunito 800 18 / 1.3, `{gap}` exactly once, replaced by `gapBox({w:gapW, h:40, attrs:'data-lcs-answer="<answer>"'})` inline-block. Throws if `{gap}` count !== 1.
10. `fieldPlot({fieldId, head, rows=6, w=329, rowH=52, glyphH=28})` (F5): `div` cream, `border:2px solid #F0E4CB; border-radius:14px; padding:0 12px 12px; position:relative` topped by a `fence` SVG `viewBox="0 0 329 18"` (pickets: every 16 px a `path` pointed post 8 w x 14 h, stroke teal 2, fill `#FFFFFF`; one rail at y 11) and a sign tag (`height:40px; background:#DDEBE8; border-radius:10px; padding:0 14px`) holding `sameLink` + the head verb in the locale's quotes, Baloo 2 700 24 teal; then `rulingBlock({rows, w: w - 24 - 4, h: rowH, glyphH})`. Stamps `data-ws-content data-lcs-field="<fieldId>" data-lcs-lines="6"`.

No new `primitives/*.js` file: every drawing above is under 10 SVG nodes and lives in the component (the tangram / body-figure precedent applies to diagrams, not marks).

## 6 Locale slot structure

| surface | font | size | slot / reserve | rule |
|---|---|---|---|---|
| card band target | Baloo 2 700 | 24 | 218 px room; widest measured 153.3 (Schmetterling) | `maxGlyphs` 13; de nouns never appear (adj/verb only), so no capital issue; fi nominative citation |
| base tags | Baloo 2 700 | 18 | 123 px text room in a 144 px tag | 13 glyphs max (widest *est.* 114.1); +40 % reserve holds: an en 9-glyph word x 1.4 = 12.6 glyphs <= 13 |
| F1 tags | Baloo 2 700 | 19 | 144 px tag, 44 high, text room 123; widest at 19 (m): hämmästynyt 117.1 text | `maxGlyphs` 11 (G1 words are shorter; the gate refuses above) |
| F2 tags | Baloo 2 700 | 22 | 210 px tag, text room 178; Schmetterling at 22 *est.* 139 | 13 glyphs |
| F3 tags | Baloo 2 700 | 20 | 185 px cell, tag <= 185; widest measured 163.8 (Schmetterling), kochend heiß 157.2 | scale words 12 glyphs; a multi-word step (de "kochend heiß", fi "hirveän iso" 135.7) is ONE tag, allowed by the validator's space list |
| F4 bank pills | Nunito 800 | 18 | two-row bubble; widest measured: antwortet 118.3, flüstert 96.6, s'exclame 114.6, tarkkailee 117.2 | `gapBank` estimate refuses a third row |
| F4 sentence | Nunito 800 | 18 / 1.3 | 597 px line, 2 lines max (63.4 incl. the 40 box, per G1-350 m) | frame <= 60 chars; panel writes fi case forms whole |
| F4 head tag | Baloo 2 700 | 20 | inside the bubble | the head verb literal per locale (said / sagt / dice / diz / dit / dice / zegt / säger / siger / sier / sanoo), struck through |
| F5 pile pills | Nunito 800 | 18 | 2 rows | 12 glyphs |
| F5 plot sign | Baloo 2 700 | 24 | 250 px | head verb in quotes: en “go” · de „gehen“ · fr « aller » · es/pt/it “ir” / “andare” (panel) · nl ‘gaan’ · sv/da/no ”gå” · fi ”mennä” (panel confirms each quote style) |
| instruction | Nunito (chrome) | shell | <= 150 chars, one sentence | names only on-page apparatus: "word in the band" is NOT a word a child knows; the en base says "the big word" and "the word under it" (see §7 base) |

Rules: every tag word is a panel literal (citation form: adj masc. sg, verbs infinitive in base/F2/F5, 3sg or past in F4 per the `form` tag); code never inflects. 9 px floor: the smallest text on any face is the F3 key numeral 18 px and the chrome. de verbs lowercase; de adjectives lowercase; fi words carry no case in chips.

## 7 Five variation faces (b c d e f)

**Base instruction (en, 78 chars):** "Read the big word on each card. Circle the word under it that means the same." (names only the band word and the tags; `strings['G2-358']`.)

**(b) F1 `pictures` - Synonyms with Pictures (G1, CODE `mode:'pictures'`, id G1-3xx TBD by the emitter).** Delta: the band word becomes a PICTURE (72 px in a white 80 px frame, the ring mark in its corner) and the child circles TWO tags. 6 cards, `cardGrid` 2 x 3, rows `minmax(214px,1fr)`: card = frame 80 + gap 8 + 2 x 44 + row gap 10 = 186 + 28 = 214; 3 x 214 + 2 x 14 = **670 <= 677**. Tags Baloo 19, 44 high (G1 floor 44), cell 144. Pictures (OPENED, `G2-358-A-pics*.png`): `emotions/happy` grin, one tooth · `emotions/sad` frown · `emotions/angry` knitted brows, bared teeth · `emotions/tired` closed eyes, yawn · `emotions/scared` wide eyes, teeth · `emotions/surprised` round "O" mouth (never with scared on a page; also excited + merry are both big grins = never with happy) · for "fast": **`vehicles/race_car`** (an open-wheel racer, reads as speed; I prefer it over the pedagogy's `zoo animals/cheetah`, a sitting-still cub) · for "big": `zoo animals/elephant` (a cute sitting calf, NO scale cue) or `ocean life/whale` (reads large by concept) · for "small": `insects and bugs/ant` or `pets/mouse` (standing, one per page). Design rule: every picture renders at the same 72 px, so size groups are carried by the concept only; `maxConcept: 2` per page (4 faces + 2 concept pictures at d2). Verify hook: exactly 2 stamped answer tags per card, both of the picture's group; the 2 other tags from other cards' groups in the picture's `falseOf`; exclusivity lists enforced; `picOpened:true`. Query face: "synonyms with pictures" / "sinónimos con imágenes" / "synonymer med bilder". Instruction en (79): "Look at each picture. Circle the two words under it that tell about the picture."

**(c) F2 `pairs` - Match the Synonyms (G2, CODE `mode:'pairs'`).** Delta: no cards; two columns of six tags, each carrying a HALF-RING at its inner edge; the child draws a line from ring to ring, closing the link. Layout: `.ws-match` `padding:0 30px` (inner 615): left tags 210 x 64 cream, right tags 210 x 64 white, line zone 615 - 420 = **195** (half-rings at 18 px out, so ring-to-ring span 159). Six rows `justify-content:space-between` in a column of 6 x 64 + 5 x 28 = **524**, vertically centred in the body (both stacks). Word Baloo 700 22. Right column = `derange` of the left (no item at its partner's index; never the reverse). Verify hook: bijection by `data-lcs-group`; no two left items share a group; no antonym / `near` anywhere on the page; exactly 6 half-rings per column. Query face: "match synonyms" / "Synonyme zuordnen" / "une los sinónimos" / "relie les synonymes". Instruction en (84): "Draw a line from each word on the left to the word on the right that means the same."

**(d) F3 `shades` - Shades of Meaning (G1, CODE `mode:'shades'`).** Delta: the ring mark gives way to STRENGTH STEPS. One `strengthKey` (280 x 56, three rising blocks, pale -> mid -> dark teal, numerals 1 2 3 beneath) centred at the top; then 6 lanes, each: `rampIcon` 48 x 32 + three word tags in a deranged order, each over a 40 x 32 `blankNumeralBox`. Stack: key 56 + gap 10 + 6 x 96 + 5 x 6 = **672 <= 677** (lane = tag 44 + gap 6 + box 32 + padding 12 + border 2 = 96). Cell width (639 - 48 - 16 - 20) / 3 = 185. The printed order per row is never the stored order and never its exact reverse on more than 2 of 6 rows; each rank sits in each column 1..3 times (the pedagogy rule, now visible as: no column is "always the strongest"). Verify hook: `data-lcs-rank` per box vs the stored scale; column-rank distribution both directions; `strengthKey` present exactly once; rank numerals appear only in the key. Query face: "shades of meaning" / "Wörter nach Stärke ordnen" / "de menos a más". Instruction en (80): "Read the three words. Write 1, 2, 3 under them, from the weakest to the strongest." (1-2-3 matches the key the child sees.)

**(e) F4 `say` - Synonyms for "Said" (G2, CODE `mode:'say'`).** Delta: the apparatus is a SPEECH BUBBLE at the top holding the struck-through head word ("s̶a̶i̶d̶", coral strike) and six bank pills; below, six lanes of direct-speech sentences, each with one dashed coral gap box. Stack: bubble 2 rows x 40 + 8 + padding 20 + border 5 = 113 + tail 16 + margin 10 = **139**; 6 lanes x min 78 + 5 x 8 = **508**; total **647 <= 677** (at 722 the lanes open to 88). Gap box ONE width for the page = `clamp(round(1.6 x 10 x maxGlyphs + 24), 150, 300)` (the G1-350 formula: flüstert 8 -> 152, antwortet 9 -> 168, tarkkailee 10 -> 184). Sentence room 639 - 30 - 12 = 597. Verify hook: bank set === answers (d2), deranged vs row order; fit matrix is a permutation matrix; all gap widths equal; no bank word inside any sentence (`(?<!\p{L})w(?!\p{L})`, NFD); the struck head appears once and never as an answer. Query face: "synonyms for said" / **„Wortfeld sagen“** / "sinónimos de decir" / "remplacer le verbe dire". Instruction en (82): "Read each sentence. Write a word from the bubble in the box, instead of said."

**(f) F5 `fields` - Synonym Sort (G3, CODE `mode:'fields'`).** Delta: two FENCED WORD FIELDS side by side (a picket fence along the top of each, a sign with the ring mark and the head verb in quotes), each with 6 school-line rows; above them the ten words in a dashed pile. Stack: pile (`.ws-scene-banner.ws-bank`, 2 rows) **109** *est.* (G1-350 est.) + gap 12 + plot (fence 18 + sign 40 + gap 8 + `rulingBlock` 6 x (52 + 6) = 348 + padding 12 + border 4 = **430**) = **551 <= 677**; plots `minmax(430px,1fr)` absorb the rest. Plot width (675 - 16) / 2 = 329.5; ruling width 297; glyphH 28 (>= 24 G3). **Both fields always print 6 lines**, whatever the 4/6 or 5/5 split, so the line count never tells the child how many words go where. Verify hook: `data-lcs-field` per pile pill; each word in exactly one field; split within [4,6]; no run of >= 4 same-field pills in pile order; `data-lcs-lines="6"` on both plots; no word printed inside a plot. Query face: "synonym sort" / „Wortfelder gehen und sehen sortieren“ / "campo semántico" / "trier par champ lexical". Instruction en (84): "Read the ten words. Write each word in the field of the word it means almost the same as."

**Why these five.** Each changes what the child DOES (circle 2 from a picture; draw lines; order by strength; choose by context; sort into fields), each owns a query face the base does not (pictures / match / shades / said / sort), and each has a visibly different apparatus, so the six landings do not share a thumbnail. All five inherit the ring mark, so they read as one family.

**First to cut.** F1 `pictures`: it is the only face whose meaning rests on library art that was drawn for other purposes (uniform-size animals carry "big/small" by concept only; es-MX may lack a second word for sad and angry). If a locale cannot sign 8 pictured groups it is REFUSED there (a data decision, the face code is unchanged).

**Hub contract (restated).** `apps.synonyms` + `axes['exercise-type'].synonyms` slug + name in all 11 locales; exactly one landing per face per locale with `coordinate.type === 'synonyms'`, `mode` = `base|pictures|pairs|shades|say|fields`, `theme:''`, level key from the band table (base/F2/F4 G2, F1/F3 G1, F5 G3), unique slug, `canonicalDeckSlug` = the published deck; landing JSON committed + deployed. Gate `scripts/verify-hub-type-rows.js` expects 6 rows per locale minus recorded refusals (none certain at design; F1 conditional).

## 8 Two alternatives + recommendation

- **Alt 1 - "Synonym lanes": 8 full-width lanes, target plate left + 4 chips in a row (the pedagogy's sketch).** Rejected: from across the room it IS G1-337 (full-width cream lanes, a word, a row of chips; G1-337 has 6 lanes and 3 chips, the difference is invisible at arm's length), and its width is *est.* 646 > 639 at 11 chars, forcing a per-locale font drop exactly in de/fi/pt.
- **Alt 2 - "Puzzle halves": each item a jigsaw piece with the target, the child finds the matching half among four.** Rejected: two halves joining into one reads as "two parts make one word", which is compound-words' teaching point (G2-316 family, "+ join"); it also needs 8 complex SVG outlines and prints heavy.
- **Recommendation: "Linked Words" (this file).** One calm apparatus (band + 2 x 2 square) that fits every locale at a single font size with 3 px spare in the worst chrome, a family mark (the joined rings) that is the semantic inverse of the opposites arrow, and five faces whose apparatus each looks different while carrying the same mark.

## 9 Risks, mitigations, print check

- **Long words.** Mitigated by construction: 13-glyph cap with measured widths (§2, §6); a 14-glyph literal is refused at validation (`validate-b5-draft.js` rule 10, value per face 13 / 11 / 13 / 12 / 12), never shrunk. verify() asserts `scrollWidth <= clientWidth` on every tag, pill and plate at d2 in all 11 locales.
- **Greyscale.** The only colour-carried meanings: F3 key steps (tealSoft ~L92 / teal 50 % ~L65 / teal ~L40: three distinct greys, and the HEIGHT carries the order anyway); F4 coral strike (a line through a grey word is a strike in any ink). The ring mark is shape, not colour. Coral is used only for the F4 gap box outline (house idiom) and the strike.
- **Pencil space.** Base tags have 14 px column gap / 10 px row gap and 12 px card padding: a circle drawn 5 px outside the tag stays inside its cell. F2 line zone 159 px ring to ring. F3 boxes 40 x 32 (> G1 answer floor 26). F4 box >= 150 x 40. F5 rows glyphH 28.
- **Cut lines.** None; nothing on this family is cut.
- **9 px floor.** Smallest text 18 px (F3 key numerals, tags). No SVG text below 18.
- **Chrome.** Worst face 674 (base) <= 677; all faces checked at 677 and 722 above.
- **Lint vs human.** QA lint catches overflow, footer intrusion, off-palette hex, font floor, blank body (`[data-ws-content]` on every card / lane / plot / match root). The type gate catches: floors, tag clipping, slot balance, bijection / permutation, no answer printed, key-once. **Only a human eye catches:** whether the ring reads as "joined" at 30 px on a school laser printer (proof one page at 100 % on paper before the wave; the fallback is 36 x 22 with the same geometry scaled), whether a concept picture (elephant calf) actually says "big" to a child, and whether the struck "said" reads as "use another word" rather than "wrong" (the instruction carries it).
- **fi 677.** Every face fits; the base has 3 px margin, so the fi base title must stay <= 4 lines (it does at the drafted "Synonyymit: ympyröi sana, joka tarkoittaa samaa", one line).

## 10 Summary

- Concept "Linked Words": the family mark is two interlocking teal rings (JOINED), the inverse of the opposites arrow (APART).
- Base: 8 twin cards in 2 x 4, a tealSoft band with the ring + target (Baloo 24), a 2 x 2 square of uniform 144 px tags (Baloo 18); 674 px, fits the fi 677 chrome; answers balanced exactly 2 per slot.
- Faces: F1 picture band + circle two (G1, race_car for "fast"); F2 half-ring tags, draw a line to close the link; F3 strength key 1-2-3 + ramp rows + numeral boxes; F4 speech bubble with struck "said" + gap boxes; F5 two fenced word-field plots, 6 lines each whatever the split.
- New code: `templates/components-b5/synonyms.js` (10 small functions, no new primitive); reuses cardGrid, blankNumeralBox, gapBox, derange, wordBank, rulingBlock.
- First to cut: F1 (picture-carried meaning); human check: print the ring at 100 % before the wave.
