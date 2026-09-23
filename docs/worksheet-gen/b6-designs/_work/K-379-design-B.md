# K-379 `story-sequencing` : DESIGN B ("One stage, one change")

Designer B (picture-book art direction + early-literacy game design). Written 2026-09-23 from `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (lock row 1), `_work/_selection-pedagogy.md` §2, `_work/_selection-seo-germanic.md` §2. Looked at: `out/b5-sweep/en/K-374-null-d2-en.png` (4 crossing cards, write 1-4), `G1-377-null-d2-en.png` (life-stage lenses), `K-370-null-d2-en.png` (family busts), `out/nt20-sweep/K-240-fruits-d2-en.png` (cut strip ergonomics). Read: `primitives/road-pictogram.js`, `life-stage.js`, `family-figure.js`, `_svg.js`, `_tokens.js`; `templates/components-b3/picture-word-cards.js` (`scissorsGlyph`, `cutLines`, `cardSheet`, `STRIP_H 30`, `CUT_STROKE 2.5`, `CUT_DASH '8 6'`); `ordinal-numbers.js:151 blankNumeralBox`; `components-b2.js:76 rulingBlock`, `:228 wordBank`; `components-b4/question-words.js:296 starterLines`; `components-b3/read-and-do.js:124 drawBox`; `types/k/K-240-cut-and-paste.js`. Opened: `winter/snowman@3x.webp` (one finished snowman: hat, scarf, mittens; no build states), `toys/blocks@3x.webp` (five shaded blocks, one pose). Both confirm the pedagogy ruling: the library draws one state per noun, so this family uses NO library picture anywhere.

---

## Boundary

This page is NOT: **G1-203** science-sequence or any **G1-377 / G1-388..390 / G2-365/366 / G3-393** life cycle (growth, hatching, biology); **K-374** "Crossing the Road Safely: the Steps" or healthy-habits F2/F3 hand-washing / brushing (a PROCEDURE, not a story); **K-240 / K-264** cut-and-paste SORTING (`cutting-practice`: glue by CATEGORY; F2 here glues by TIME and never says "sort"); **K-320** ordinal-numbers (first / second / third as ordinal words; F2 here uses the three narrative words first / next / last and never "second" or "third"); **K-319** feelings (no face, no emotion anywhere); **G2-254** reading-comprehension (text stories; here the picture is the story); **G2-278 / G2-299 / G2-300** picture-writing (one picture, open writing; F6 here is four ordered panels with temporal starters); **G1-308 / G1-338..342** read-and-do; days-and-months ordering. **This family owns narrative order from drawn pictures**: a small everyday story that visibly changes, its temporal words, the prediction of the next event, story structure, and the retelling. **Visual signature: "one stage, one change."** Every story is played on a fixed little STAGE (a table, a floor with a rug, a garden, a desk) that is drawn byte-identical in all its panels in pale, outline-free tones; the only thing that moves between panels is the one bold, teal-outlined PROP. A five-year-old who cannot read justifies the order by pointing at the only thing that is different.

## 1 Page concept (base)

**"Two little theatres."** Two cream story cards stacked on the page, each carrying one four-panel story, scrambled, with a dashed coral numeral box under every panel. From across the room a teacher sees two tidy rows of four small illustrated scenes that clearly belong together (same table, same window, same rug), and inside each row one object that grows, fills, lights up or disappears. That is the art-director's move: **hold the set, move the actor.** In picture books the reader follows change only when the frame holds still (the same room in every spread of a "page-turn" joke); a panel set whose backgrounds wander makes the child compare everything, a panel set whose background is frozen makes the child compare one thing. The set is drawn in fills only (tealSoft / creamDeep / white, `grid` 1.5 px hairlines, no outline heavier than 1.5 px); the prop is drawn with the house's 3 px teal outline and carries the page's only coral. In greyscale the set drops to a pale ground and the prop stays a dark-outlined figure, so the "what changed" contrast survives a mono printer by construction (outline weight, not hue).

Top quality because: one focal apparatus per card (the four panels), generous gaps, big panels (146 px, 2.6 x the K 56 floor), pencil-first (write 1-4), no words on the page beyond chrome, and every story passes a machine-checked "one legal order" rule (§4).

## 2 Layout (d2, 722 body)

Worst-case chrome: 3-line title + 3-line instruction = body 722; every stack below is designed to **677** (the 4-line fi title) and absorbs slack with `justify-content:space-evenly` in a flex column (the cards never stretch; the gaps grow).

```
body 675 wide (page inner; no lane), flex column, space-evenly
 16  top clearance (story badge overhangs the card by 15)
+--------------------------------------------------------------- card A: 675 x 244 ---+
| (A) badge Ø30 teal, white Baloo 700 18, absolute top:-15 left:18                     |
| border 2 creamDeep, radius 16, background cream, padding 14 -> inner 643             |
|  +--146--+ 16 +--146--+ 16 +--146--+ 16 +--146--+     4x146 + 3x16 = 632 <= 643       |
|  | panel |    | panel |    | panel |    | panel |     storyPanel px 146, frame on     |
|  +-------+    +-------+    +-------+    +-------+                                     |
|     10           10           10           10                                         |
|   [ 64x56 ]    [ 64x56 ]    [ 64x56 ]    [ 64x56 ]   blankNumeralBox, centred        |
+---------------------------------------------------------------------------------------+
 36  gap (>= badge overhang 15 + 21)
+--------------------------------------------------------------- card B: 675 x 244 ---+
|  (B) ... identical geometry, the second story (different set kind, §4)               |
+---------------------------------------------------------------------------------------+
height: 16 + 244 + 36 + 244 = 540 <= 677 (137 px of slack at 677, 182 at 722)
card: 2 + 14 + 146 + 10 + 56 + 14 + 2 = 244
```

Panel 146 px (K floor 56: 2.6 x). Numeral box 64 x 56 holds a 30 px pencil numeral (K `fontChoice` 30) with 13 px air each side. The badge letters A / B are not language and not an answer; they let a teacher say "story B".

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `mode` | `'base'` | `'base'` | `'base'` |
| `stories` | 2 | 2 | 2 |
| `panels` | 3 (states 1, 3, last of a 4-state story) | 4 | 5 (only stories with a 5th state: cake, snowman, paper-chain; §5 bank `s5`) |
| `panelPx` | 170 | 146 | 120 (5 x 120 + 4 x 10 = 640 <= 643) |
| `gap` | 24 | 16 | 10 |
| `numeralBox` | 64 x 56 | 64 x 56 | 60 x 52 |
| `scramble` | not identity | derangement (no panel in its own slot) | derangement, and the first state never in slot 1 or 2 |
| `setKindsDistinct` | true | true | true |

d1 and d3 are harder/easier pages of the same move, not faces, and no copy describes them.

## 4 Answer-hiding + uniqueness

**Nothing on the page says which panel is first.** Panels carry no badge, no number, no arrow, no "change mark" (a highlight on the changed part would require knowing the order and leaks it). The child writes 1-4. A wrong answer is visibly wrong to the teacher because the correct order is always the one where the prop count/state rises (or falls) monotonically: a teacher reading "3 1 4 2" sees the balls go 3, 1 ... immediately.

**One legal order, by construction (the ⚠⚠ two-orders trap).** Every story in `data/b6/story-sequencing.js` declares:
- `key`: the monotone PART that orders it (`ball` count 1->2->3, `bite` count 0->1->2, `picketPainted` 0->2->4->5, `ring` count, `crease` count ...). The gate COUNTS the drawn `[data-part=<key>]` elements per panel in the emitted SVG and asserts strictly monotone along the story order; verify() re-derives the key order from the same count and compares it to the child-facing permutation stamp, never from `data-lcs-state`.
- `arrow`: the one IRREVERSIBLE transition every story must contain (a pop, a bite, a stamp, a collapse, smoke after lit candles, a sheet hung on the wall). A story whose reverse is a real everyday story (gift unwrapping, jigsaw taking-apart, kite landing, a balloon deflating back to flat) is DROPPED, never rescued by instruction text (pedagogy §E).
- `conservation`: objects never appear from nowhere: blocks not in the tower are in the toy box, paint not on the fence is in the pot, strips not yet rings are on the desk. This is what kills the "tidy-up backwards" reading.
- `orderSignedBy`: one human reviewer per story (all 24 permutations of 4 inspected; a story with any adjacent pair that could swap is dropped).

**Scramble tells (the nt10-D staircase lesson, measured on the shipped seed AND 40 seeds):** each story's printed order is a derangement of its true order; the two stories on a page never share the same permutation; over 40 seeds no slot holds state 1 more than 35 %; the shipped d2 seed is inspected (it is locale-neutral, so one bad order ships to all 11). **Set tell:** the two stories on a page use different set kinds (table vs floor ...), so the child never confuses which panels belong together, and the set never distinguishes panels within a story (it is byte-identical).

## 5 Primitives / components

**Reused (exact).** `primitives/_svg.js` (`svgRoot el roundedRect line circle esc`) · `primitives/_tokens.js` (`color` only; no `codeColors`) · `blankNumeralBox({w,h,answer:''})` (`templates/components-b3/ordinal-numbers.js:151`; always an EMPTY answer) · `scissorsGlyph`, `cardSheet`, `cutLines` (`templates/components-b3/picture-word-cards.js`, F2 cut strip; `STRIP_H 30`, `CUT_STROKE 2.5`, `CUT_DASH '8 6'`) · `drawBox` (`templates/components-b3/read-and-do.js:124`, F4) · `.ws-match` / `.ws-match-col` / `.ws-match-item--plain` / `.ws-match-dot` (`page/page.css:355-392`, F5) · `rulingBlock` (`components-b2.js:76`, starters sized by `starterFontPx` from `primitives/font-metrics.json`; F6) · `wordBank` (`components-b2.js:228`, F6) · `road-pictogram.js glyphGroup` is NOT needed (no person in the bank, below) · `rng.shuffle/sample/int`.

**NOT used.** Every library picture (`winter/snowman` and `toys/blocks` opened: one finished state each; mixing a glossy picture into a drawn story breaks "one art source", lock ruling 4; the pedagogy's "small title badge" on retell faces is also dropped: it would be the only glossy object on a flat page and teaches nothing). `family-figure.js` (a bust has a FACE and expression reading is out of scope; no story needs a person). `road-pictogram.js walker` (no pose for jumping, puddle story moved to reserve). `cardGrid` (its numbered badge per card is an order cue). `answerBox` (stamps `undefined`). `pillChoice` (F2 pills are glue labels, not choices).

**NEW `primitives/story-panel.js`** (pure SVG on the tokens, Node-testable; gate `qa/verify-b6-story-panel.js` measures the RENDER).

```
storyPanel({ story, state, px, frame = true, ghost = false, id })
  -> { svg, w: px, h: px, meta: { story, state, set, parts: {<part>: count}, focalBox } }
setOnly({ set, anchor, px, opacity = 0.45 })   // F2 glue-frame "empty stage"
SETS, STORIES (re-exported from data/b6/story-sequencing.js), MIN_PX = 88
```

- **viewBox `0 0 120 120`**, square. **Ground line y 84** (every prop stands on it). **Focal box x 18..102, y 6..84**: every `[data-part]` of the prop lies inside it except parts listed in the story's `wallZone` (hung items, allowed x 8..112, y 8..60). **Set zone:** the whole box behind the prop.
- **Strokes are CONSTANT px** (the life-stage / body-figure rule; user units = px x 120 / size): prop OUTLINE `clamp(size/48, 2, 3)` px teal, round joins; prop DETAIL 1.5 px (size >= 110) else 1.2 px, teal or ink; SET lines `grid` 1.5 px (1.2 below 110). Gate: every rendered stroke inside `[data-lcs-set]` <= 1.5 px; every prop outline >= 2 px.
- **Palette split (gated):** set fills in {white, cream, creamDeep, tealSoft}, set strokes in {grid}; prop fills in {white, coralSoft, coral, tealSoft, teal, ink}, prop strokes in {teal, ink, inkSoft}. **`coral` appears only inside `[data-lcs-prop]`.** Luma (Rec. 601, from the tokens): white 255, creamDeep 234, coralSoft 233, tealSoft 231, grid 192, coral 151, inkSoft 131, teal 80, ink 54. Because every pale fill sits at 231-255, no state difference may rest on a pale-vs-pale fill change: a "painted / coloured / filled" state uses `teal` or `coral` (80 / 151), never coralSoft on white.
- **Frame (`frame:true`):** `rect 1.5..118.5, rx 10, fill white, stroke creamDeep 3 px` (the panel "paper"); off for cut tiles (the cut line is the frame).
- **Part ids:** root `<svg data-lcs-story-panel data-lcs-story=<id> data-lcs-set=<kind>>`; `<g data-lcs-set>` (byte-identical across a story's panels: gated by string equality after stripping `id` attributes); `<g data-lcs-prop data-lcs-state=<n>>` with every countable element carrying `data-part=<name>`. `data-lcs-state` exists for debugging only; verify() never reads it.
- **Legibility gate at the smallest shipped size (88 px, F3):** render each story's consecutive state pair at 88 px in greyscale; >= 2 % of the panel's pixels change by >= 48 luma, all inside the focal box (initial thresholds; the engineer calibrates them by poisoning: a state pair made identical must FAIL, the shipped pairs must PASS). THROWS below `MIN_PX 88`.

**The SETS (drawing vocabulary; unit coordinates).**

| set | wall / sky (y 0..84) | ground (y 84..120) | fixed details |
|---|---|---|---|
| `table` | white; window `rect 10,12 32x30` stroke grid 1.5, cross bars at x 26 / y 27, sill `rect 8,42 36x3` creamDeep | tabletop band `rect 0,84 120x14` creamDeep, top edge line grid 1.5; floor below white; two legs `rect 12,98 5x22`, `rect 103,98 5x22` creamDeep | none |
| `floor` | white; skirting line y 80 grid 1.5; a picture frame `rect 84,14 24x18` grid 1.5 | `rect 0,84 120x36` creamDeep; rug `ellipse 60,102 46x10` tealSoft | none |
| `outdoor` | white sky; one far hill `path M0,70 Q30,58 60,70 T120,66 V84 H0Z` fill cream, stroke grid 1.5 | `rect 0,84 120x36` tealSoft; grass tufts `path` 3 blades at x 10 and x 108, grid 1.5 | none |
| `desk` | white; pinboard `rect 70,10 40x28` cream stroke grid 1.5 with 2 pins `circle r1.5` grid | desk band `rect 0,84 120x12` creamDeep, edge grid 1.5; pencil pot `rect 98,68 12x16` tealSoft stroke grid 1.5 (behind any prop, x 98..110) | none |

A story may add ONE constant **anchor** to its set group (drawn in set style, pale): `plate` (`ellipse 60,84 34x5` white stroke grid 1.5), `board` (`ellipse 60,84 40x6` creamDeep), `toybox` (`rect 8,62 24x22` creamDeep stroke grid 1.5), `pump` (`rect 88,52 8x32` tealSoft + handle `rect 82,48 20x4` + hose `path M92,84 Q80,90 72,80` grid 1.5), `sandbox` (`rect 14,78 92x10` creamDeep stroke grid 1.5), `bin` (`path M96,66 H114 L112,84 H98Z` tealSoft stroke grid 1.5).

**The STORY BANK (`data/b6/story-sequencing.js`; 13 stories + 2 reserve; order key, arrow, per-state prop).** Prop outline teal 3 px unless noted; "blk" = a block `rect 14x14` fills cycling white / coralSoft / tealSoft.

| id | set + anchor | key / arrow | s1 | s2 | s3 | s4 | s5 (d3 only) |
|---|---|---|---|---|---|---|---|
| `snowman` | outdoor | `ball` 1->2->3 / hat+nose added | bottom ball `circle 60,66 r18` white | + mid `circle 60,37 r13` | + head `circle 60,17 r9` | + hat `rect 52,2 16x8` ink + brim `rect 49,9 22x2.5` ink, nose `polygon 60,17 70,19 60,21` coral, eyes 2 x `circle r1.6` ink (no mouth), arms 2 ink 2 px lines | + scarf `rect 50,26 20x5` coral + 2 buttons ink |
| `block-tower` | floor + toybox | `blk` in tower 1->3->5, box 4->2->0 / tower falls | 4 blk tops peeking in box, 1 blk on rug at 60 | box 2, tower 3 (x 53, y 42..84) | box 0, tower 5 (y 14..84), ball `circle 106,76 r7` coral + 3 motion lines ink 2 px pointing left | 5 blk on rug, rotations -20..+25, ball at x 34 | none |
| `balloon` | floor + pump | size r 0/9/18 / burst | limp balloon `path` crumpled teardrop 10x8 coral on hose tip | round `circle 66,70 r9` coral on hose tip | `circle 56,34 r18` coral, knot `polygon`, string ink 1.5 curve to rug | burst star 8 ink 2 px rays at 56,40, 3 coral shreds, string on rug | none |
| `sandcastle` | outdoor + sandbox | bucket full -> castle -> flag / castle standing | bucket `path` trapezoid 22x20 tealSoft, sand mound creamDeep on top, spade ink | bucket upside down on sand (same trapezoid, flipped, no mound) | castle `path` trapezoid + 3 crenels, **coral** fill (the pale-vs-pale rule), empty bucket on its side | + flag `line` ink 2 px + `polygon` triangle coral on top | none |
| `birthday-cake` | table + plate | candles 0->3 lit->smoke / blown out | cake `rect 34,56 52x28` white, icing wave band y 56..63 coralSoft | + 3 candles `rect 4x14` tealSoft at x 46,58,70 | + 3 flames `path` teardrop coral y 32..42 | flames gone + 3 smoke curls ink 2 px | smoke gone, front wedge missing, slice on a second small plate x 92..114 |
| `sandwich` | table + plate | layers 1->2->4 / bite | bread slab `rect 30,74 60x10` white, crust band coralSoft 3 | + spread `rect 32,70 56x4` coral | + cheese `rect 30,64 62x6` coralSoft with 3 white holes + top slab `rect 30,54 60x10` | same, bite notch `circle 84,54 r9` cut from top-right (clip) | none |
| `house-drawing` | desk | lines 0->1->3 / hung on the wall | blank sheet `rect 30,52 60x32` white, crayon `rect 92,78 22x5` coral | + square `rect 44,62 22x18` ink 1.5 on sheet | + roof `polygon` + door, ink 1.5 | sheet on pinboard wall (`wallZone`), 2 tape strips tealSoft, house filled **teal**, crayon stub 10 long on desk | none |
| `pizza` | table + board | toppings / cut + slice gone | dough `ellipse 60,74 34x12` white | + sauce `ellipse 60,74 28x9` coral | + 6 toppings `circle r2.5` ink + 3 `circle r3` white | 3 cut lines ink 1.5 through centre, one wedge removed (board visible) | none |
| `apple-snack` | table + plate + bin | `bite` 0->1->2 / core in bin | apple `path` coral, stem ink, leaf tealSoft | bite notch right (white flesh, teal outline) | both sides bitten, waist 10 wide | core in the bin (top 10 units peeking), plate empty | none |
| `paper-plane` | desk | `crease` 0->1->3 / flying | sheet `polygon` flat parallelogram white on desk | + 1 crease line ink 1.5, two corners folded (pentagon) | dart plane on desk, 3 creases | plane upper right (x 70..104, y 14..32) + dashed flight curve inkSoft 1.5 from desk edge | none |
| `birthday-card` | desk | marks / stamp | folded card `polygon` tent white | + heart `path` coral on card | card half inside envelope (white, flap V ink 1.5), heart visible | envelope closed + stamp `rect 10x12` coral + 3 address lines ink 1.5 | none |
| `fence-painting` | outdoor | `picketPainted` 0->2->4->5, pot level 3->2->1->0 / done | 5 pickets `path` (pointed top) white x 22..98, pot `rect 8,70 14x14` with paint band coral 3 levels, brush in pot | 2 pickets **teal**, pot level 2 | 4 teal, pot level 1 | 5 teal, pot empty, brush lying on ground | none |
| `paper-chain` | floor | `ring` 1->3->5, strips 6->4->2 / hung | 1 ring `ellipse r 6x8` coral + 6 strips stack coralSoft on rug | 3 linked rings + 4 strips | 5 rings + 2 strips | chain of 7 rings as a swag across the wall (`wallZone`), 0 strips | chain of 7 rings on the wall + a second chain of 3 rings started on the rug |
| reserve `bead-string` | table | `bead` 1->3->5 / clasp closed | ... | | | | |
| reserve `puddle` | outdoor | needs a jumping walker pose; NOT drawn until a pose exists | | | | | |

DROPPED (reverse is a real story): gift wrapping (unwrapping), jigsaw (taking apart), kite (landing), soap bubbles (needs a hand), juice glass, getting dressed, planting, melting (all four from the pedagogy file stay excluded).

**NEW `templates/components-b6/story-sequencing.js`** (behind `templates/components-b6.js`; every export prefixed `ss`, inline CSS, every stage stamps `data-ws-content`): `ssStoryCard({letter, panels, boxW, boxH, gap})` (base) · `ssGlueRow({letter, set, anchor, words})` + `ssCutStrip({tiles})` (F2, wraps `cardSheet`) · `ssNextRow({panels, choices})` (F3) · `ssBmeRow({first, last, labels})` (F4) · `ssSentenceMatch({panels, sentences})` (F5) · `ssRetellRow({n, panel, starter})` (F6) · `ssBadge({text})` (Ø30 teal disc, Baloo 700 18 white).

## 6 Locale slot structure

- **Base:** zero authored words on the body (badges A / B are the same in all 11). Title + instruction only; instruction e.g. en "Write 1, 2, 3 and 4 under the pictures to show what happens first, next and last." (98 chars; the +40 % fi/de reserve is 137, inside the ~150 one-sentence cap).
- **F2 pills:** three temporal words per locale (panel literals; pedagogy §D list): Baloo 2 700 **20**, pill h 38, teal 2 px ring, white; max pill width 164 (frame 114 + gap 50); longest candidates "zum Schluss", "tot slot", "til sidst", "lopuksi" at ~10.5 px/char = 116 *est.* (fits with 48 px reserve).
- **F4 pills:** beginning / middle / end (de Anfang / Mitte / Schluss, fi alku / keskikohta / loppu ...), same pill spec, width <= 164 over given panels, <= 228 over the draw frame.
- **F5 sentences:** Nunito 800 **18**, <= 3 lines at 301 px (~38 chars/line *est.* at 7.8 px/char) = 110 chars max per sentence, the opening temporal word in teal 800.
- **F6:** starters on the ruling rows sized by `starterFontPx` (measured metrics, never a factor), Nunito 700 inkSoft; word bank Nunito 800 17 via `wordBank` (4-6 words, de with article "die Kerze").
- Font floor: smallest text on any face = 17 px (bank words); nothing under 9 px is possible because the panels carry no text.

## 7 Five variation faces

Ids by content band (`tools/alloc-b6var-ids.js`): F2 **K-381**, F3 **G1-400**, F4 **G1-401**, F5 **G1-402**, F6 **G2-378** (TBD by the emitter; K-380 is healthy-habits' base). All five are **CODE** faces (`mode` knob on `build()` + a `verify()` branch, stamped only when declared; the base stays byte-identical).

**F2 : First, Next, Last: Cut and Paste (K, `mode:'first-next-last-cut'`).** The cut-and-paste face, made first-class (en "sequencing cut and paste worksheet", de "bildergeschichte ausschneiden und aufkleben", nl "volgordeplaatjes"). Two 3-state stories. Top: two glue rows, each = badge A / B + three empty glue frames 114 x 114 (dashed grid 2.5, r 12, the K-240 slop of +8 over the tile) with the three temporal-word pills centred above them (the words ARE the order; no numerals anywhere). Inside each empty frame, the story's bare STAGE (`setOnly`, opacity 0.45): an "empty stage waiting for its actor", identical in all three frames of a row (no order leak) and different between rows, so the child knows which row a tile belongs to by its set and decides WHERE in the row by the change. Bottom: one K-240-ergonomic cut strip (`cardSheet` cols 6 rows 1, w 636, h 106; scissors strip 30) of the six tiles (storyPanel px 98 on a 106 tile, `frame:false`), interleaved so no row's three tiles are adjacent and never in order. **Height:** glue row 38 + 10 + 114 = 162; 2 x 162 + 30 = 354; + 40 + 136 (strip) = **530 <= 677**. **Width:** frames 3 x 114 + 2 x 50 = 442 (+ badge 30 + 16) centred; strip 636 <= 675. **Config d2** `{mode:'first-next-last-cut', stories:2, panels:3, tile:106, frame:114, words:bank.fnl}`; d1 `{stories:1}`; d3 `{stories:3, strips:2}` (two strips; a harder cutting page, not a face). **Verify:** exactly 6 tiles, 3 per set kind; per row the words are `fnl[0..2]` left to right; every glue frame empty; strip order has no two same-story tiles in true order adjacent; tile key counts monotone per story; set kinds differ. **Why a change from the lock's "circle one of three chips under each of 9 panels":** that prints 27 word chips on a K page (the text load of a G2 page) and asks the child to circle the same three words nine times; the cut version prints each word ONCE per story as a target, keeps the same move (assign first / next / last to three pictures), owns the demanded cut-and-paste query and stays one physical, joyful K task. If the critic prefers the lock's circle version, `ssChipRow` is a 20-line fallback on the same config key. **Query face:** "first, next, last" + cut and paste.

**F3 : What Happens Next? (G1, `mode:'what-next'`).** Three story cards (border 2, pad 8). Tier 1: states 1-3 IN ORDER (px 88, gap 8) -> a 24 px ink arrow -> an empty dashed-coral "?" frame 88 x 88 with a Baloo 700 40 inkSoft "?" (a question mark is not language). Tier 2: three choice tiles 96 x 96 (white, creamDeep 2, r 12, storyPanel px 88) centred, gap 24; the child circles one. **Choices:** the story's s4 (correct) + a **regression foil** (the story's s1 or s2: "going backwards", wrong for a nameable reason) + an **object foil** (a state of ANOTHER story with the SAME set kind, so the set cannot be matched away and the child must follow the object). Stories with a unique set kind (`sandcastle` shares `outdoor` with snowman / fence, fine) all qualify; a story whose set kind has no sibling is flagged `f3:false`. **Height:** 2 + 8 + 88 + 8 + 96 + 8 + 2 = 212; 3 x 212 + 2 x 12 = **660 <= 677**. Width tier 1: 3 x 88 + 2 x 8 + 12 + 24 + 12 + 88 = 416. **Config d2** `{mode:'what-next', stories:3, shown:3, choices:3, foils:['regress','object']}`; d1 `{stories:2, choices:2}`; d3 `{shown:2}`. **Verify:** one choice's key count equals s4's; the correct slot is 0/1/2 once each per page (a permutation) and <= 40 % per slot over 40 seeds; the regression foil is never s3 (identical to the last shown panel reads as "nothing happens", a plausible answer); the object foil's set kind equals the row's. **Query face:** "what happens next" (+ picture story).

**F4 : Beginning, Middle and End (G1, `mode:'bme'`).** Two story rows: given s1 panel (px 164) left, a big white `drawBox` 228 x 228 (dashed coral 2.5, r 12) in the middle, the story's last state (px 164) right, each under a pill beginning / middle / end. The DELTA is scale: the empty middle is the biggest thing on the page, an invitation to draw. **Height:** 34 + 8 + 228 = 270; 2 x 270 + 40 = **580 <= 677**. **Width:** 164 + 24 + 228 + 24 + 164 = **604 <= 675**. Stories used: only those whose s1 and last state differ by >= 2 key steps (every bank story). **Config d2** `{mode:'bme', stories:2, given:[1,'last'], drawPx:228}`; d1 `{stories:1, drawPx:300}`; d3 `{stories:2, given:[1,'last'], drawPx:190, writeRow:true}` (a ruling row under each frame). Open page: no answer verify; the gate asserts the two given panels are the first and last of the same story, the draw box is empty and >= 200 px, the pills in reading order. **Query face:** "beginning middle end".

**F5 : Story Sequencing Sentences (G1, `mode:'sentences'`).** One story, `.ws-match`: LEFT four panels **scrambled** (px 128), RIGHT four short sentences **in story order**, each opening with its temporal word in teal (First / Then / Next / At the end, panel literals), dots +-26 on the facing edges; the child draws four lines. **Deliberate inversion of the lock's "panels in order, sentences scrambled":** with panels in order and sentences that each START with First / Then / Next / At the end, the child matches the order word to the position and never reads the content (a positional tell as strong as a printed number). Sentences in order read as a real mini-story top to bottom (the reading the face is for), the scrambled panels make the match a genuine picture-to-text check, and the answer stays unique. **Height:** 4 x 128 + 3 x 22 = **578 <= 677**. **Width:** `.ws-match` inner 615: left col 140 + line zone 150 + right col 325. **Config d2** `{mode:'sentences', stories:1, panels:4, panelPx:128, sentencePx:18}`; d1 `{panels:3}`; d3 `{stories:1, panels:5}`. **Verify:** 4 sentences, one per state (`sentenceOf[state]` from the locale bank); the left column is a derangement; no sentence contains another sentence's key noun only (panel check: no sentence fits two panels); sentence width <= 3 lines. Only stories with `f5Signed[loc]` (native sentences signed) are eligible; the pool per locale must reach >= 3 stories or the face is REFUSED for that locale. **Query face:** "sequencing sentences".

**F6 : Retell the Story with Sequence Words (G2, `mode:'retell'`).** The writing face and the de "Bildergeschichte mit Worthilfen" demand. Top: `wordBank` of 4-6 story words (de with article). Then four rows: panel px 124 with a small teal badge 1-4 (Ø24, white Baloo 16: here the order is GIVEN, the task is the retelling) + `rulingBlock({rows:2, w:535, h:58, glyphH:26, starters:{0:<starter k>}})`. **Height:** 59 + 10 + 4 x 124 + 3 x 14 = **607 <= 677**. **Width:** 124 + 16 + 535 = **675**. **Config d2** `{mode:'retell', stories:1, panels:4, rows:2, glyphH:26, bank:6}`; d1 `{rows:1, glyphH:32}`; d3 `{rows:3, starters:false}`. Open page: the gate asserts 4 starters distinct and in order, starter px from measured metrics (`verify-ruling-starters.js` discovers them via `build()`), glyphH >= 24, bank words <= 6 and each appears in the locale's `retellWords[story]`. **Query face:** "retell the story" / de "Bildergeschichte schreiben".

**Why these five.** They are the pedagogy lock's five moves (temporal words, prediction, structure, reading, writing), each with a visual delta a teacher sees in one glance: a cut strip, a "?" frame, a giant empty middle, a matching column, ruled lines. **First to cut:** F5 (it needs 4 authored sentences x >= 3 stories x 11 locales and is the only face that can fall below its pool; F6's words-and-starters data is smaller).

**Hub contract.** `apps['story-sequencing']` (subject `letters`) + `axes['exercise-type']['story-sequencing']` slug + name x11; one landing per face per locale with `coordinate.type === 'story-sequencing'`, `coordinate.mode` = the face mode string (base `'base'`), `coordinate.theme:''`, a band-table level key, a unique slug and `canonicalDeckSlug` = the published deck; committed + deployed. Gate `scripts/verify-hub-type-rows.js` expects 6 rows per locale minus recorded refusals (expected refusals: F5 only where the signed sentence pool < 3 stories; none planned).

## 8 Two alternatives + recommendation

1. **Cut-and-paste as the BASE** (a 1-2-3-4 glue strip per story + one cut strip of 8 tiles at the bottom). The strongest single K concept, but 8 tiles need two strips (interior cutting, against the K-240 ergonomics) or 76 px tiles, it excludes the no-scissors classroom, and the base owns the "number the pictures" head (SEO rail name "Story Sequencing: Number the Pictures"). Moved to F2, where 6 tiles fit one K-240 strip at 106 px.
2. **The clothesline**: panels hang on a drawn line with pegs, number on each peg. Charming, but a line drawn left to right reads as "already in order" (the eye takes printed order as story order) and the rope and pegs are a second art job on every panel. Rejected.

Chosen: the two theatre cards, because "hold the set, move the actor" makes the order visible to a non-reader, survives mono print through outline weight alone, and gives one primitive rule (`[data-lcs-set]` identical, `[data-lcs-prop]` changes) that the gate can check for every story the bank ever adds.

## 9 Risks, mitigations, print check

- **Two legal orders:** `key` monotone + `arrow` + `conservation` + a named human reviewer per story; a doubtful story is dropped (bank lists the drops).
- **Greyscale:** pale fills 231-255 are indistinguishable; every state change rests on outline presence, part count, or teal / coral / ink fills (80 / 151 / 54). The 88 px greyscale diff gate measures it. Coral vs teal on a B&W printer = 151 vs 80 luma: distinct, but no answer rests on that pair.
- **Small size:** MIN_PX 88 throws; F3 is the only face at 88; details (candle flames, bite notches) are >= 8 units = 5.9 px at 88 *est.*; the diff gate is the real check.
- **Pencil space:** base box 64 x 56 for a 30 px numeral; F6 glyphH 26 on 58 px rows.
- **Cut lines (F2):** `cardSheet` grid 2.5 dashed `8 6`, one long horizontal cut then five short vertical ones; tiles 106 (K-240 d2 104 precedent); glue frames 114 (+8 slop).
- **Long locales:** only F2/F4 pills, F5 sentences, F6 bank/starters carry words; each budgeted with the +40 % reserve above; F5 sentences hard-capped at 3 lines by the gate.
- **9 px floor:** no text inside panels, smallest text 17 px.
- **Lint catches:** overflow, footer intrusion, font floor, palette (off-token hex). **Only the type gate catches:** set byte-identity, prop / set stroke and palette split, key monotonicity, derangement and slot balance, F3 foil rules. **Only a human eye catches:** whether a drawn state is recognisably "a bite" or "smoke" to a five-year-old, charm, and the second-order check per story; the per-story `orderSignedBy` and the T2 render read are mandatory.

## 10 Summary

1. Concept "one stage, one change": each story's set is byte-identical and pale, only the teal-outlined prop changes, so a non-reader points at the difference.
2. Base: two theatre cards x 4 scrambled 146 px panels + numeral boxes, 540 / 677 px, derangement + 40-seed slot balance.
3. NEW `primitives/story-panel.js`: 120-unit square, ground y 84, focal box, 4 set kinds + 6 anchors, 13-story bank with monotone `key`, irreversible `arrow`, `conservation`, greyscale diff gate at 88 px.
4. Faces: F2 first-next-last as K cut-and-paste (empty-stage glue frames), F3 what-next with regression + same-set object foils, F4 giant draw-the-middle, F5 sentences in order vs panels scrambled (kills the order-word tell), F6 retell with word bank + measured starters.
5. No library picture, no face, no person; two deliberate departures from the lock (F2 cut instead of 27 chips, F5 inversion) argued in §7.
