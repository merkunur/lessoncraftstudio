# G1-399 `sink-or-float` : DESIGN B ("Twin tanks: guess, then splash")

Designer B, 2026-09-23. Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (LOCK row 4 + faces), `_work/_selection-pedagogy.md` §5 + the opened float/sink table, `types/g1/G1-204-sink-float.js` + `data/science/sink-vs-float.json`, `primitives/plant-figure.js` + `_tokens.js`, `templates/components-b3/{read-and-do,rhyming-words,ordinal-numbers}.js`, `templates/components-b2.js`, `../b5-designs/G1-376-plants.md` (convention), render `out/b5-sweep/en/G1-376-null-d2-en.png`. (m) = measured by me (node over `cache/manifest.json`, or opened). **Pictures: I OPENED all 26 I name** (contact sheets `scratchpad/G1-399-float.png`, `G1-399-sink.png`, 1536x1536 each). *est.* = engineer measures with the shell woff2 from `file://` (`render/one.js`). No em-dashes.

## Boundary

This family is NOT G1-204 `science-sort` (slug `sink-or-float`: 12 pictures in a strip over two WORD bins, "draw a line to the group", m `types/g1/G1-204-sink-float.js`); no face here has word bins, a line-to-bin, or a strip-over-bins layout, and no title reuses "Sink or Float?" or its natives (LOCK). NOT recycling G1-364 / G2-348 (what it is made of, odd one out by material), NOT K-032..040 comparing-sizes (heavier / biggest: size is judged there, here size is the DECOY), NOT read-and-do G1-341 (read-and-check true/false over a scene; F4 here judges science CLAIMS against an evidence shelf), NOT G1-203 science-sequence, NOT G3-385 water cycle (water-cycle.js is not used). **It owns the INQUIRY: a prediction set beside a result, the "heavy sinks" misconception broken by size, shape vs material, and the written record.** **Visual signature:** every object meets TWO small drawn glass tanks side by side ("I think" / "It did"), each with a dark wavy waterline and a pebbled floor; the child colours a ring AT THE WATERLINE (floats) or ON THE FLOOR (sinks). Across the room a teacher reads "rows of little aquariums", which no page in the catalogue has. The meaning is POSITION, so it reads with no words and in greyscale.

## 1 Page concept (base)

**"Guess, then splash."** A prediction must feel like a bet the child wants to check. So the base is not a table of words: each object gets a picture tile, then a GUESS tank (thought-bubble glyph) and a TEST tank (splash glyph). The child colours the ring where they bet the object will end up; after the class tub test they colour where it really went. A fourth column holds an outline star headed "Surprise?": the child colours it when the two tanks disagree. That star IS the misconception moment made visible: the big log that floats and the tiny key that sinks light up the stars, and the teacher can read the whole class's misconceptions off the star column from across the room. A legend strip on top shows the two marks once (a drawn neutral pebble-blob bobbing at the waterline = floats; the same blob on the floor = sinks), each with ONE word. Quality: one focal apparatus repeated (the twin tanks), generous row height, pencil-only marks, no answer anywhere (the result is physical).

## 2 Layout (d2, 722 body; every stack also checked at 677)

Lane: full `.ws-page` inner **675** (no `.ws-lane` wrapper; `[data-ws-content]` on the root grid). Root grid rows `72px 8px 30px repeat(6, minmax(86px,1fr))`, row gap 6.

```
y 0   LEGEND strip 675 x 72 (white card, border 2 teal, radius 16, padding 8 16)
      [waterTank legend 'float' 112x56][word pill 'floats' Baloo 700 18]   (gap 48)   [waterTank legend 'sink' 112x56][word pill 'sinks']
y 80  COLUMN HEADS 30 high, same column grid as the rows:
      [pic col 100: empty] [guess 160: thinkGlyph 22 + head.guess Nunito 800 15] [test 160: splashGlyph 22 + head.test] [star 64: head.surprise 13]
y 110 6 ROWS, each 638 wide centred (18.5 px left/right), cols 100 | 18 | 160 | 18 | 160 | 18 | 64 = 538 + 100 centring slack *est.*
      +-- pic tile 100x86 --+    +-- GUESS tank 160x80 --+    +-- TEST tank 160x80 --+    +- star -+
      | white, border 1.5   |    |  ~~~~(o)~~~~ waterline|    |  ~~~~(o)~~~~          |    |  (*)   |
      | grid, radius 12     |    |  water tealSoft       |    |                       |    | 40 px  |
      | picture 60 px       |    |       (o) floor ring  |    |       (o)             |    | outline|
      | label 14 px below   |    |  ..pebbled floor..    |    |  ..pebbled floor..    |    |        |
      +---------------------+    +-----------------------+    +-----------------------+    +--------+
```
Height at 677: 72 + 8 + 30 + 6 x 86 + 5 x 6 = **656 <= 677 <= 722** (m arithmetic); at 722 the `1fr` rows grow to 93.5 (slack 66 absorbed). Width: 100 + 3 x 18 + 160 + 160 + 64 = **538 <= 675**, the row is `justify-content:center` so the 137 px slack becomes side margins (calm, not stretched). Legend: 112 + 8 + pill *est.* 110 (de "schwimmt oben") x 2 + 48 gap = 508 <= 643 card inner. Floors (G1 44/26/6-12): picture **60 >= 44**, tank 160x80, rings 26 px diameter (a pencil fill target, not an icon), star 40, item count 6 (m in band).

## 3 Ladder

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `items` | 4 (2 float, 2 sink) | **6 (3 float, 3 sink)** | 8 (4, 4) |
| `pool` | TRIVIAL + SURPRISE | **SURPRISE only** (log ball pinecone candle apple orange spoon pencil sponge / key nail seashell potato rock hammer scissors) | SURPRISE + `classroom/scissors` |
| `mustInclude` | none | **>=1 big floater (log, ball, pinecone) AND >=1 small sinker (key, nail, seashell)** | same |
| `surpriseStar` | false | **true** | true |
| `labels` | true | **true** | true |
| `rowMin` | 118 | **86** | 64 (pic 48, tank 120x60) |

TRIVIAL (d1 only): `toys/boat`, `miscellaneous/leaf`, `easter/feather`. d1 and d3 are scaffold levels, not faces; no copy describes them.

## 4 Answer-hiding + uniqueness

Base is an OPEN record (the prediction is the child's; the result is physical; printable decks ship no key), so no `verify()` of answers, only structure: every row stamps `data-lcs-item="<vocabKey>" data-lcs-truth="float|sink"` (from the bank; never rendered), each tank `data-lcs-tank="guess|test"` with its two rings `data-lcs-slot="top|floor"`; verify asserts: item count and 3/3 split === config; mustInclude honoured; no `<text>`/text node inside a tank; both rings of every tank identical in size and stroke (no pre-filled or emphasised ring); the float/sink order is not the sorted order and has no run of 3 identical truths (so a teacher's copy never implies a pattern); every picture key in the OPENED allow-list (`picOpened:true`). What the child marks: a coloured ring per tank + a coloured star. What the teacher sees: a TEST tank that disagrees with the teacher's tub is visibly wrong at a glance (ring height), and a star coloured on a row whose two tanks agree is a mis-read of the task.

## 5 Primitives / components

**Reused (exact).** `fileUri(theme, noun)` (`lib/b2-common.js:7`, re-exported from `image-cache/resolve.js`) · `truthChips({yes,no,px})` (`components-b3/read-and-do.js:119`) on F4 · `drawBox({w,h})` (`read-and-do.js:124`) on F6 · `rulingBlock({rows,w,h,glyphH,starters})` (`components-b2.js:76`) on F6 · `blankNumeralBox({w,h})` (`components-b3/ordinal-numbers.js:151`) on F6 Q2 · `primitives/unit-cubes.js` (the cube F6 Q2 loads) · `svgRoot el circle label esc` (`primitives/_svg.js`) · `lib/b6-common.js bank()` · `.ws-card .ws-pill .ws-blankbox`.

**NOT used.** `makeScienceCategorySort` / `.sci-bin` / `data/science/sink-vs-float.json` (the G1-204 fence; its bank also carries the PLASTIC `kitchen tools/spoon` as sink) · `choiceRing` (dashed grid ring round a picture: F2 would inherit a size tell from ring size, see F2) · `answerBox` (stamps `undefined`) · `balance.js` (weight is not verifiable for the pairs: a small rock vs an apple could go either way) · `water-cycle.js` · `pictureFor` (rng across themes) · any living animal, container, `toys/balloon` (OPENED: a helium balloon on a string; it "floats" in AIR, a two-meaning picture), `toys/blocks` (OPENED: 5 painted cubes, material unreadable, several objects), `around the house/bathtub` / `camping/lake` (scene art; the tank is drawn), `beach/bucket`, `around the house/sink` (a basin: the word collides with the verb in en).

**NEW `primitives/water-tank.js`** (pure SVG on tokens; Node-testable; `qa/verify-water-tank.js` measures the render). Exports `waterTank`, `SLOT`, `WATERLINE_Y`, `FLOOR_Y`, `MIN_W`.
`waterTank({ w=160, kind='mini'|'legend'|'big', slots=true, blob=null /* 'top'|'floor' legend only */, spots=0 /* big: dashed drawing spots per zone */, id }) -> { svg, width, height, scale, slots:{top:{cx,cy,r}, floor:{cx,cy,r}} (px) }`
| part | geometry, viewBox `0 0 200 100` (mini/legend; `big` = `0 0 600 400`, same proportions x3 horizontally, see F5) |
|---|---|
| glass | rounded rect x 3 y 3 w 194 h 94 rx 10, fill white, stroke teal **3 px at every size** (user units = 3/scale, the body-figure rule) |
| water | path from the waterline down to the floor: `M 4.5 34 Q 20 30 36 34 T 68 34 T 100 34 T 132 34 T 164 34 T 195.5 34 L 195.5 82 L 4.5 82 Z`, fill tealSoft; air above stays white |
| waterline | the same wave (3 crests, amplitude 4) as an open path, stroke **teal 2 px** (the dark line is the greyscale signal, not the fill) |
| floor | rect x 4.5 y 82 w 191 h 13.5 fill creamDeep; 5 pebbles ellipse rx 4 ry 2.6 stroke grid 1.5 no fill at x 22 58 142 170 184, y 89 |
| slots (`slots:true`) | `top` circle (100, 34) r 16 = HALF above the waterline ("bobbing"); `floor` circle (100, 65) r 16 (bottom tangent y 81, resting on the floor); both fill white, stroke **coral 2.5 px dashed 5 4**; identical by construction |
| legend blob | `blob:'top'|'floor'`: slots off, a teal-filled pebble shape `M -14 0 Q -12 -10 0 -11 Q 13 -10 14 0 Q 12 9 0 10 Q -13 9 -14 0 Z` translated to the slot centre (half submerged at top) |
| sides | glass side glint white 3 px (182,12)-(182,26) (inside the air zone only) |
`MIN_W = 112` (throws below: rings < 18 px). `big`: glass 594x394, waterline y 150 (37.5 %), floor y 340..391, pebbles x 9, `spots` = N dashed coral rounded rects 120x92 per zone: top spots centred ON the waterline, floor spots resting on y 340. No text in any tank; no hex outside tokens; coral appears ONLY in slots/spots.

**NEW `primitives/clay-form.js`** (the SAME lump in every form; `qa/verify-clay-form.js`). `clayForm({ form:'ball'|'boat', w=120, id }) -> {svg,width,height,meta:{form, areaUnits}}`, viewBox `0 0 160 120`.
| form | geometry (units) |
|---|---|
| clay (all forms) | fill **coralSoft**, stroke teal 3 px, round joins; 3 thumbprint dimples = arcs stroke grid 1.5 (identical three marks on every form: "the same lump") |
| `ball` | circle (80, 70) r 34 (area 3632) |
| `boat` | hull `M 18 56 L 142 56 Q 134 98 80 100 Q 26 98 18 56 Z`; the HOLLOW = ellipse (80, 58) rx 56 ry 7 fill **cream** (the air the boat holds; the one part that explains why it floats) with teal 1.5 rim |
| gate | the boat's filled-clay area (hull minus hollow, sampled on a 0.5-unit grid) within **+-15 % of the ball's 3632**, so the two read as one amount of clay; `pancake` NOT exported (flat clay sinks slowly, excluded by the pedagogy) |

**NEW `templates/components-b6/sink-or-float.js`** (prefix `sf`): `sfLegend({floats,sinks})` · `sfThinkGlyph()` (3 ascending circles r 3/5/9 teal 2, a thought bubble) · `sfSplashGlyph()` (drop + 2 splash arcs, teal 2) · `sfStar({size=40})` (5-point outline star teal 2.5 fill white, `data-lcs-star`) · `sfPicTile({theme,noun,label,px})` (asserts `picOpened` in the bank) · `sfBetRow(item,{guess,test,star})` · `sfPairRow(pair,{side})` (F2) · `sfClayStrip()` (F3) · `sfClaimRow(claim)` (F4) · `sfEvidenceShelf(items)` (F4) · `sfInquiry(q)` (F6). Data `data/b6/sink-or-float.js` + `data/b6/locales/sink-or-float.<loc>.json`.

**Bank (opened, m).** FLOAT: `toys/ball` (football) · `camping/log` (a cut log) · `camping/pinecone` · `christmas/candle` (wax pillar) · `fruits/apple` · `fruits/orange` (whole, peel on) · `around the house/spoon` (WOODEN, red handle) · `classroom/pencil` (wood) · `kitchen tools/sponge` (dry yellow block; landing says "dry") · trivial d1: `toys/boat`, `miscellaneous/leaf` (maple), `easter/feather`. SINK: `beach/rock` · `around the house/key` (⚠ drawn PINK: panel checks it still reads as a metal key; if two of eleven panels read "toy key", swap to `tools/nail`) · `tools/nail` (steel spike) · `beach/seashell` · `vegetables/potato` · `tools/hammer` · `classroom/scissors` (steel blades, blue plastic handles; d3 only). EXCLUDED after opening: `kitchen tools/fork` (green plastic handle, mixed), `toys/balloon`, `toys/blocks`. All have a vocabKey (m, manifest).

## 6 Locale slot structure

| slot | surface | font | budget (+40 % de/fi/pt reserved) |
|---|---|---|---|
| `word.floats` / `word.sinks` (legend pills; F5 zone tags; F3 none) | panel literal (de may pick "schwimmt oben" / "geht unter": "schwimmen" also = swim) | Baloo 2 700 18 | pill 150 *est.* max ~16 chars |
| `head.guess` / `head.test` / `head.surprise` | column heads | Nunito 800 15 / 13 | 160 / 160 / 64 (surprise may wrap 2 lines at 13 px: "Überraschung?" 13 chars *est.* 88 px -> 2 lines) |
| picture label | vocab SINGULAR, lower-cased except de/`KEEP_CASE` | Nunito 800 14 | 96 px; longest en "pinecone", de "Tannenzapfen" 12 chars *est.* 72 px |
| claims (F4) | 6 whole panel literals | Nunito 800 17 | 2 lines x 404 px |
| questions (F6) | 2 whole panel literals | Nunito 800 16 | 2 lines x 560 |
| `truth.yes/no` (F4) | panel literals (true/false, richtig/falsch, vrai/faux, V/F never letters only) | Nunito 800 18 | chip 44 high, pad 18 |
Font floor 13 px everywhere (>= 9). The code substitutes whole literals and never inflects; no frame agrees with a picture noun (labels stand alone). fi: nominative labels only.

## 7 Five variation faces

**F2 `heavy or light?` (G1, `G1-400+ TBD by the emitter`, CODE: `mode:'pairs'`).** Visual delta: no guess/test tanks; **5 full-width "dock" rows** 638 x 112: two picture cards standing on a teal 3 px dock line over a 638 x 30 water band (`waterTank` strip, waterline only), with a small teal "or" disc between them. The child circles the one that FLOATS. d2 = the 4 LOCK pairs (`camping/log`>`around the house/key`, `toys/ball`>`tools/nail`, `fruits/apple`>`beach/rock`, `christmas/candle`>`beach/seashell`), floater drawn **96 px**, sinker **56 px** (ratio 1.7, both >= 44), PLUS one **control row** `fruits/apple` vs `vegetables/potato` both **76 px** (apple floats, potato sinks; if apple is already used, `fruits/orange` vs `vegetables/potato`). The control row is my answer to the obvious tell: without it "circle the bigger one" solves the page, which is the same bad rule in reverse; with it the child has to think about the object. Height 5 x 112 + 4 x 10 = **600 <= 677**. Floater side balanced by rng: 3/2 or 2/3, no run of 3, never strictly alternating. verify: the circled-target stamp `data-lcs-floats` is on exactly one card per row, the floater's rendered height >= 1.6 x the sinker's on the 4 lock rows and equal on the control row, side constraint. Query face: "heavy or light sink or float" / de "schwer oder leicht schwimmt".

**F3 `change the shape` (G2, `G2-378+ TBD`, CODE: `mode:'clay'`).** Visual delta: a **three-panel clay story strip** 638 x 250: `clayForm ball` -> arrow + a drawn thumb glyph -> `clayForm boat` -> arrow -> `clayForm ball` (pressed back), each form 120 wide over a mini `waterTank` 160x80 with its two rings; the child colours where each form goes. The third panel (back to a ball, it sinks again) is the reversibility that proves SHAPE, not material, decided. Below: a `waterTank big` 638 x 300 with NO slots and an empty waterline headed by `design.head` ("Draw your own clay boat on the water") as the open box. Height 250 + 12 + 26 + 300 = **588 <= 677**. verify: forms ball/boat/ball in that order, one shared `data-lcs-clay` id on all three (the "same lump" stamp), area gate from `clay-form.js`, no ring pre-filled. Query face: "make clay float" / de "Knetboot".

**F4 `true or false: why things float` (G2, `G2-379+ TBD`, CODE: `mode:'claims'`).** Visual delta: an **evidence shelf** strip 638 x 96 on top (four opened pictures + one clay pair glyph on a shelf line: log, key, ball, clay ball+boat), then **6 claim rows** 638 x 72: numbered teal badge 32 | claim 404 (2 lines, Nunito 800 17) | `truthChips` 170. Every row is uniform (badge, no picture), so the two FALSE general claims carry no presence tell; the shelf is the evidence all claims share. Claims = the 6 LOCK sentences as panel literals; order rng with 4T/2F, no run of 3, never T F T F. Height 96 + 12 + 6 x 72 + 5 x 8 = **580 <= 677**. verify: order constraint; each claim's truth from the bank; no chip pre-marked; "because it is light" appears in no TRUE literal (node lint per locale). Query face: "why do things float" / pt "por que flutua".

**F5 `draw what floats and sinks` (K, `K-381+ TBD`, CODE: `mode:'draw'`).** Visual delta: ONE `waterTank big` 638 x 480 (the class tub, not two frames: both outcomes in the same water is the truth a K child should see), with `spots:2`: two dashed coral spots 120 x 92 centred ON the waterline, two resting on the floor; a left-side tag pill `word.floats` with a teal leader to the waterline band and `word.sinks` to the floor; the legend blobs sit inside the tags so a pre-reader decodes them without the word. No second task below (K keeps one task); the remaining ~200 px is whitespace, the tank is vertically centred. Height 480 **<= 677**. K floors: spot 120 x 92 >= 56. No verify of content (open); layout lints only. Query face: fr "ce qui flotte, ce qui coule" / "draw what floats and sinks".

**F6 `sink or float investigation` (G2, `G2-380+ TBD`, CODE: `mode:'inquiry'`).** Visual delta: a **five-part lab sheet** in stacked cream cards, each with a drawn section glyph (question mark, thought bubble, mini tank, magnifier-free splash, star): (1) Question: 2 rows with a 32 px tick box + panel question literal ("Does an orange float with and without its peel?" with `fruits/orange` 52 px; "How many cubes can a clay boat carry?" with `clayForm boat` 64 + one `unit-cubes.js` cube 26) = 26 + 2 x 52 = 130; (2) I predict: `rulingBlock` 2 rows glyphH 24 = 26 + 2 x 44 = 114; (3) What happened: a `waterTank big` 300 x 150 (no slots) + a `blankNumeralBox` 68 x 44 captioned `result.count` = 26 + 150 = 176; (4) I learned: `rulingBlock` 2 rows = 114; total 534 + 4 x 12 = **582 <= 677**. Open (no verify of content). Query face: "sink or float investigation" / de "Forscherheft schwimmen sinken".

**Why these five:** each changes what the child DOES: bet-and-record (base), judge size vs floating (F2), manipulate shape (F3), reason in words (F4), draw a record (F5), write up an inquiry (F6), and each keeps the one drawn language (the tank) so the family reads as one product. **First to cut:** F4 (the only reading-heavy face; its evidence shelf partly repeats F2), then F5 in locales whose K band does not teach floating.

**Hub contract.** `apps['sink-or-float']` + `axes['exercise-type']['sink-or-float']` slug + name x11 (base slug NOT `sink-or-float`: en `sink-or-float-experiment`, natives from the SEO files); exactly one landing per face per locale, `coordinate.type === 'sink-or-float'`, `coordinate.theme:''`, `coordinate.mode` = the face mode (`base` / `pairs` / `clay` / `claims` / `draw` / `inquiry`), level key from the band table, committed + deployed; `scripts/verify-hub-type-rows.js` expects 6 per locale minus refusals (none designed; es-MX may re-target F4 claims wording, a data decision).

## 8 Two alternatives + recommendation

(a) **One big aquarium per page**: all six objects drawn above one wide tank, the child draws an arrow from each to the waterline or the floor. Rejected: arrows from six objects into one tank cross each other (unreadable for a teacher), there is no place for the prediction beside the result, and it drifts back toward G1-204's line-to-bin. (b) **Betting slips**: cut-out prediction tickets the child sticks on a class chart. Rejected: cut lines halve the pencil record, the page is useless after cutting, and "betting" is not a word a K-3 page should carry in eleven countries. **Chosen:** twin tanks, because the prediction and the result sit next to each other in the SAME picture language, so disagreement is visible without reading, the star column turns the misconception into a moment the child owns, and the tank primitive carries every face (F2 water band, F3 strip, F5 tub, F6 result).

## 9 Risks, mitigations, print check

- **Greyscale:** water tealSoft is L~91 %, near white; the boundary is carried by the 2 px teal WAVY waterline and the pebbled creamDeep floor, and the mark is POSITION, so a B&W print loses nothing. Coral dashed rings print mid-grey dashed: distinct from the solid teal glass. Clay coralSoft vs cream hollow: the hollow is outlined teal 1.5, so the air reads in mono.
- **Long locales:** only heads and the legend carry words; heads may wrap to 2 lines at 13-15 px inside a 30 px row at 13 px (engineer measures; if fi/de overflow, heads row becomes 40 and rowMin 84: 72+8+40+6x84+30 = 654, still <= 677).
- **Pencil space:** rings 26 px diameter, star 40, F6 writing rows glyphH 24 (G2 floor met).
- **Science traps:** no claim or chip says "light floats" as a reason; the key's pink paint and the fork are the two opened doubts (key flagged, fork excluded); `orange` appears only whole; the sponge is a dry sponge (landing wording).
- **Tells:** base truths not sorted and no run of 3; F2 control row defeats "circle the bigger"; F4 rows uniform.
- **Lint catches:** overflow, 9 px floor, palette, blank page. **Only a human eye catches:** whether the pink key reads as metal, whether a tank ring reads as "the object's place" to a six-year-old at 26 px, and whether the clay boat's hollow reads as air. No cut lines on any face.

## 10 Summary

1. Concept "Guess, then splash": each object meets a GUESS tank and a TEST tank; the child colours the ring at the waterline or on the floor; a "Surprise?" star marks every disagreement.
2. NEW `primitives/water-tank.js` (200x100 / 600x400, dark wavy waterline, pebbled floor, two identical dashed coral rings) carries all six faces; NEW `primitives/clay-form.js` (ball / boat, area-gated to +-15 %, the hollow drawn as cream air).
3. Base d2: 6 opened pictures (3 float, 3 sink, >=1 big floater + >=1 small sinker), 656 px at 677; meaning = position, reads without words and in greyscale.
4. Faces: F2 dock pairs with a same-size CONTROL row that kills the "pick the bigger" tell · F3 ball -> boat -> ball clay strip + design-a-boat tub · F4 evidence shelf + 6 uniform claim rows · F5 one class tub, K draw spots · F6 five-part lab sheet.
5. Opened and excluded: plastic spoon (G1-204's), fork (mixed), balloon (floats in air), blocks (material unreadable); the pink key is flagged for the panels.
