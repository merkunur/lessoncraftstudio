# G1-399 `sink-or-float` : DESIGN A ("The Lab Notebook: one tub, two moments")

Designer A (science-education, lab-notebook / investigation sheets). Read: `_ROLE-DESIGN.md`, `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md` (lock row 4 + sink-or-float faces), `_work/_selection-pedagogy.md` §5 + the opened-picture table, `types/g1/G1-204-sink-float.js`, `data/science/sink-vs-float.json`, `primitives/bin.js` (px-geometry precedent), `primitives/_tokens.js`, `templates/components-b3/{read-and-do,logic-puzzles,ordinal-numbers}.js`, `templates/components-b4/{odd-and-even,question-words}.js`, `../b5-designs/G1-376-plants.md` (format), render `out/b5-sweep/en/G1-376-null-d2-en.png` (house look). (m) = measured this session by read-only node or by OPENING the picture (contact sheet `scratchpad/G1-399-sheet1.png`, 24 pictures). *est.* = engineer measures in the real render (`render/one.js`, shell woff2 from `file://`). No em-dashes.

**Boundary.** NOT G1-204 `science-sort` (m: `makeScienceCategorySort`, slug `sink-or-float`, a strip of 12 pictures over two WORD bins, "draw a line to the group"): no face here ever puts pictures over two bins, draws a line to a group, or is titled "Sink or Float?" / its 10 native twins; the base slug is `sink-or-float-experiment` (en) and every title carries an experiment / predict word. NOT G1-364 / G2-348 recycling "what it is made of" (material naming; no face here asks the material's NAME). NOT K-211 hot/cold, K-214 natural/man-made (sorts). NOT K-032..040 `size-compare` (F2 asks which FLOATS, never which is bigger; the size is the given, not the answer). NOT G3-345 thermometer, G1-146/147 graphing (the tally strip is two boxes, no graph). NOT read-and-do G1-341 true/false (F4's claims are about ONE science idea, with evidence pictures, not instructions to carry out). This family owns the INQUIRY: prediction beside result, the "heavy sinks" misconception, shape vs material, the written record. **Visual signature:** a column of small drawn glass TUBS, each either with a coral token bobbing ON the wavy waterline (ripples) or resting on the gravel FLOOR (bubbles); a teacher across the room reads "water test, guess vs result", never "two bins".

## 1 Page concept (base)

**"The Lab Notebook: one tub, two moments."** The page is a scientist's record table. Each row = one object (library picture, 56 px, panel label under it). Beside it two pairs of wordless TUB ICONS: the white "I think" column (thought-bubble head glyph) and the creamDeep "It did" column (water-drop head glyph). In each pair the left tub shows FLOATS (token on the waterline, ripples), the right shows SINKS (token on the floor, bubbles). The child circles one tub BEFORE the test and one tub AFTER dropping the real object into a tub of water; a last narrow column with a drawn "=" glyph gets a tick when guess and result agree. Above the table ONE focal key band teaches the two icons once, with the locale's two verbs (the ONLY place the words float/sink appear); below it a wordless tally strip (float tub + box, sink tub + box) closes the record the way a real lab notebook does ("how many floated?"). Why top quality: one apparatus repeated (the tub) so the page is calm and learnable; the prediction and the result are physically side by side, which is the whole teaching point (prediction is not a right/wrong answer, the result is what the water says); icons read with no reading and in greyscale (position, not colour, carries the meaning); pencil-first (circle, tick, write two numerals); nothing is pre-filled.

Why this beats a plain table with the words "float / sink" in every cell: 12 repeated words in de "schwimmt / geht unter" or fi "kelluu / uppoaa" would fill the page with text a G1 reader must decode 24 times; the icon is decoded once from the key.

## 2 Layout (d2, 722 body; every stack checked at 677)

Root = `<div data-ws-content data-lcs-sof="base">` grid rows `84px 12px 34px minmax(438px,1fr) 12px 66px`.

```
y 0    KEY BAND  .ws-lane 639 x 84 (default padding; inner 639)                                   [data-lcs-sof-key]
       +-----------------------------------------+   +-----------------------------------------+
       | waterTank(state:'float', 76 x 60)  word |   | waterTank(state:'sink', 76 x 60)   word |
       |  Baloo 2 700 20, ink, max 200 *est.*    |   |  Baloo 2 700 20                         |
       +------------- 300 --------------+  39 gap  +--------------- 300 -------------------+
y 96   HEAD ROW 675 x 34   [30 #][10][pic 120][10][thought glyph 22 + "I think" Baloo 700 17][10][drop glyph 22 + "It did"][10][= glyph 28]
y 130  TABLE .ws-card (cream, border 2 creamDeep, radius 16), 6 rows minmax(72px,1fr), row rule 1.5 grid
       | 30 | 120                | 200 (white)                   | 200 (creamDeep band)          | 80            |
       | n  | pic 56 + label     | chip[tank float] 16 chip[tank sink] | chip[tank float] 16 chip[tank sink] | tickbox 44 |
       |    | Nunito 800 13 x2ln | chip 80 x 64, white, border grid 1.5, radius 12; tank 68 x 54 inside   |       dashed coral |
y 580  TALLY STRIP .ws-lane 639 x 66 (centred group, no words)
       [waterTank float 60x48][8][blankNumeralBox 56x44]   gap 48   [waterTank sink 60x48][8][blankNumeralBox 56x44]
```
Widths: 30 + 120 + 200 + 200 + 80 = 630 + 4 col gaps x 10 = **670 <= 675** (m arithmetic). Answer cells: 2 chips x 80 + 16 gap = 176 + 12 padding x 2 = 200. Heights at the minimum: 84 + 12 + 34 + 6 x 73 (72 + 1.5 rule, rounded) + 12 + 66 = **646 <= 677 <= 722**; slack goes to the rows (`1fr`). Object picture 56 >= G1 floor 44; tub icon 68 x 54 >= 44; chips 80 x 64 are the circling targets (a pencil ring 90 px wide fits the 200 cell). Label line: max 2 lines of 13 px Nunito 800 in 116 px (clamp; the validator measures and FAILS a 3rd line; longest proposed labels de "Tannenzapfen", fi "Lyijykynä", pt "Tesoura" *est.* <= 96 px). Head words at 17 px in 168 px (after the 22 px glyph + 10 gap): longest proposals de "Ich vermute" / "Ergebnis", pt "Eu acho" / "Aconteceu", fi "Arvaan" / "Tulos" *est.* <= 110 px.

## 3 Ladder (base)

| key | d1 | d2 (ships) | d3 |
|---|---|---|---|
| `rows` | 4 | **6** | 8 |
| `rowMinH / picPx / tankW x tankH` | 96 / 64 / 76x60 | **72 / 56 / 68x54** | 56 / 44 / 56x44 |
| `floatCount / sinkCount` | 2 / 2 | **3 / 3** | 4 / 4 |
| `surprise` (>=1 big floater from `BIG_FLOAT` and >=1 small sinker from `SMALL_SINK`) | true | **true** | true (2 + 2) |
| `sameCol` (the "=" tick column) | false | **true** | true |
| `tally` | false | **true** | true |

d1 and d3 are scaffold levels of the same move (not shipped, no copy describes them). A guard keys on `rows`/`tally`, never on the level index.

**Composer.** `pool = BASE_POOL` (§5 data). Draw `floatCount` floaters + `sinkCount` sinkers with the `surprise` rule, then `rng.shuffle` the rows, re-drawn while (a) the first 3 rows share one outcome, (b) outcomes strictly alternate, or (c) all floaters precede all sinkers or vice versa. Locale-neutral seed; only the labels + key words + heads change.

## 4 Answer-hiding + uniqueness (per face)

- **base (open).** The prediction is the child's; the result is physical. No tub is pre-circled, no row is tinted by outcome, the tally boxes are empty `blankNumeralBox({answer:''})` (never `answerBox`). The known outcome rides ONLY as `data-lcs-expect="float|sink"` on each row for the gate (balance + surprise rule), never visible. `verify()` asserts structure, not answers: each row has exactly 2 chips per column in the fixed order float|sink (`data-lcs-tank-state`), the "=" box empty, 3 + 3 expects, the surprise rule, no row text other than the label, every picture `(theme,noun)` in `BASE_POOL` with `picOpened:true`. A teacher reads a wrong RESULT circle at a glance: every "It did" circle must match the water; with the stamped expects the teacher key is the classroom tub, not the page.
- **F2 (closed).** Exactly one floater per card; the child circles a PICTURE. `verify()`: per card one `data-lcs-expect="float"` + one `"sink"`, the floater's rendered height >= 1.6 x the sinker's (measured on the `<img>` box), floater side L/R = 2/2 over the 4 cards and not L R L R / R L R L; no card shows a tank with a token (the header icon is the float key only).
- **F3 (closed rows + open box).** Each shape row: circle float or sink chip. Ball / sausage / cube = sink, boat / bowl = float (`data-lcs-expect` from `FORMS[form].outcome`, a code constant, not per-locale). `verify()`: forms set === d.forms, each form once, float rows never adjacent at positions 1-2 only (re-draw while the two floaters are rows 1-2 or 4-5), every form's clay area within 0.80..1.25 x the lump's (measured by `clayForm` return `areaPx`), draw box empty.
- **F4 (closed).** Each claim: circle the check or the cross (`glyphChip` yes/no, m `logic-puzzles.js:93`). `verify()`: 6 claims, 3 `truth:true` + 3 `false`, not alternating, no two identical claim ids, every claim literal === `claims[loc][id]`, evidence picture set per claim === the bank's.
- **F5 (open, K).** Two empty tanks. No verify beyond layout (`data-lcs-open`).
- **F6 (open).** Question choice box empty, lines empty, draw tank empty (`state:'empty'`). No verify beyond layout + both question ids from the bank.

## 5 Primitives / components

**Reused (exact).** `blankNumeralBox({w,h})` (`templates/components-b3/ordinal-numbers.js:151`, m: always stamps `data-lcs-answer`, empty unless passed) for tally + F6 counts · `glyphChip({kind:'yes'|'no', px})` (`templates/components-b3/logic-puzzles.js:93`, m; drawn check/cross via `primitives/logic-grid.js markGlyph`, no font glyph) for F4 · `drawBox({w,h})` (`templates/components-b3/read-and-do.js:124`, m: white, dashed coral 2.5, r 12) for F3 "your boat" · `rulingBlock({rows,w,h,glyphH,starters})` (`templates/components-b2.js`) for F6 lines, starters sized from `primitives/font-metrics.json` (`verify-ruling-starters.js` discovers them) · `cardGrid({cards,cols,rows})` (`templates/layouts/card-grid.js`) for F2 · `fileUri(theme, noun)` directly for FIXED bank pairs (never `pictureFor`, which rng-picks across themes: `boat` is in `toys` AND `beach`, m `data/science/sink-vs-float.json` uses `beach/boat`) · `svgRoot el line circle roundedRect esc` (`primitives/_svg.js`) · tokens only · `bank(name, loc)` via `lib/b6-common.js` over `data/b6/`.

**NOT used.** `makeScienceCategorySort` / `.sci-bin` / `data/science/sink-vs-float.json` (the G1-204 fence; its items are not re-opened data, e.g. the plastic spoon) · `bin.js` (a waste bin, wrong object) · `balance.js` (weights, see §8) · `answerBox` (stamps `data-lcs-answer="undefined"` without an answer) · `truthChips` (word pills yes/no: F4 uses the drawn check/cross, wordless) · vocab singulars as LABELS at render (see §6 traps) · `pictureFor`.

**NEW `primitives/water-tank.js`** (pure SVG, px geometry from (w,h), NO viewBox scaling, the `bin.js` rule, so a 56 px icon and a 300 px frame keep a readable stroke):
`waterTank({ w=68, h=54, state='float'|'sink'|'empty', waterAt=0.34, strokePx=3, data={} }) -> { svg, w, h, waterY, floorY, tokenBox }`
| part (`<g data-lcs-tank-part=...>`) | geometry (px) |
|---|---|
| `wall` | open-top glass: path `M 0.08w 0.10h L 0.08w 0.90h Q 0.08w 0.96h 0.14w 0.96h L 0.86w 0.96h Q 0.92w 0.96h 0.92w 0.90h L 0.92w 0.10h`; rim lips `0.03w..0.08w` and `0.92w..0.97w` at y 0.10h; stroke teal `sw = max(2, strokePx*w/120)`, round caps/joins; fill none |
| `water` | clip to the wall interior, rect from `waterY = waterAt*h` to 0.96h, fill tealSoft (drawn BEFORE the wall) |
| `waterline` | 3-hump wave across 0.08w..0.92w at waterY, amplitude 0.022h (>= 1 px), stroke teal `max(1.5, sw*0.6)` |
| `floor` | gravel band 0.86h..0.96h fill creamDeep, 3 dots r `max(1,0.018w)` grid at x 0.25/0.5/0.75 w, y 0.91h |
| `token` (float/sink only) | disc `r = 0.11w` (>= 4 px), fill coral, stroke teal `max(1.5, sw*0.6)`. float: centre (0.5w, waterY) i.e. HALF above the line; sink: centre (0.5w, 0.86h - r) resting on the gravel |
| `ripple` (float) | 2 arcs each side at waterY: x from 0.5w +/- (r + 0.04w) to +/- (r + 0.13w), stroke teal 1.5, drawn above the water |
| `bubble` (sink) | 3 rings r 0.025w / 0.035w / 0.03w (>= 1.5 px) at (0.52w, cy - r - 0.05h), (0.45w, cy - r - 0.12h), (0.56w, cy - r - 0.19h), stroke teal 1.5, no fill; asserted each bubble bottom > waterY + 1 |
Stamps: root `data-lcs-tank data-lcs-tank-state="<state>"`. Throws: `state` outside the 3, `w < 44` or `h < 36`, `waterAt` outside 0.25..0.45. Sizes on record: chip 68x54 (base d2), key 76x60, tally 60x48, K frame 300x430 (`waterAt 0.30`), F6 draw 250x170. **Greyscale rule:** float vs sink is carried by the token's POSITION + ripples vs bubbles (strokes), never by hue; coral token on tealSoft water prints ~30 % apart in grey *est.* (engineer prints a mono proof). Node gate `qa/verify-b6-water-tank.js`: renders the 3 states at 44x36 / 68x54 / 300x430, asserts token centre within 0.5 px of waterY (float) and token bottom within 0.5 px of 0.86h (sink), every bubble below the waterline, every stroke >= 1.5 px, only token hexes; poison: a float token moved 3 px down must FAIL.

**NEW `primitives/clay-form.js`** (side view, px geometry from (w,h); "same clay" = identical fill + stroke + texture on every form):
`clayForm({ form='lump'|'ball'|'sausage'|'cube'|'boat'|'bowl', w=96, h=72, data={} }) -> { svg, w, h, areaPx }`
- Clay style: fill coralSoft, outline coral 3 px (the only use of coral as an outline in this family; in greyscale a mid-grey line round a near-white body), 3 thumbprint arcs coral 1.5 (radius 0.06w, placed inside the fill), a `grid` 1.5 "table" line at y 0.96h from 0.05w to 0.95w (every form rests on it; NO water is ever drawn under a clay form, so no form shows its answer).
- `lump`: smooth closed 8-point blob inside x 0.26..0.74w, y 0.46..0.96h (fixed control points, rng-free).
- `ball`: circle r 0.24w (capped by 0.45h), bottom on the table line.
- `sausage`: stadium x 0.10..0.90w, height 0.22h, bottom on the table.
- `cube`: front square side 0.38w, bottom-centred; top face = parallelogram offset (+0.12w, -0.10h), same fill, 1.5 px inner edge.
- `boat`: canoe profile, open top: outer path (0.05w, 0.52h) Q (0.5w, 1.14h) (0.95w, 0.52h); inner path offset by wall `t = 0.07h`, ends raised to 0.44h; closed as ONE wall shape (the hollow shows as cream inside).
- `bowl`: bottom half-ring centred (0.5w, 0.50h), outer r 0.40w, inner r 0.33w, flat foot 0.16w wide on the table.
- `areaPx` = the clay area (path area; hollow excluded). **Rule:** each form's `areaPx` within 0.80..1.25 x `lump`'s at the same (w,h), so the page never implies "less clay" (the boat is BIGGER in outline, same clay: the physics). Throws below w 64. Node gate `qa/verify-b6-clay-form.js`: area ratios, the boat/bowl hollow is open at the top (no closing segment across it), texture arcs inside the fill; poison: a boat with a lid segment must FAIL.

**NEW `templates/components-b6/sink-or-float.js`** (behind `templates/components-b6.js`; every export prefixed `sof`, the barrel refuses duplicates): `sofKeyBand({words})` · `sofHeadRow({heads})` · `sofTankChip({state, w, h})` (the 80x64 white circling chip, `data-lcs-chip-state`) · `sofRecordRow({n, pic, label, expect})` · `sofRecordTable({rows})` · `sofTally()` · `sofSizePairCard({float, sink, floatPx, sinkPx, floatSide})` (F2) · `sofShapeRow({n, form})` (F3) · `sofClaimRow({n, claim, pics})` (F4) · `sofDrawTanks({words})` (F5) · `sofNotebookSection({n, glyph, head, inner})` + `sofQuestionCard({qid, text, pics})` (F6) · head glyphs `sofThoughtGlyph`, `sofDropGlyph`, `sofEqualsGlyph` (drawn SVG; `=` is ASCII but drawn to avoid font dependence at 28 px).

**Data `data/b6/sink-or-float.js`** (every picture `picOpened:true`, OPENED this session, m):
- `BASE_POOL` floaters: `toys/ball` (football, air inside) · `camping/log` (cut log, BIG_FLOAT) · `fruits/apple` · `fruits/orange` (whole, peel on, BIG_FLOAT) · `miscellaneous/leaf` (maple leaf) · `easter/feather` · `camping/pinecone` (BIG_FLOAT) · `classroom/pencil` (wood) · `toys/blocks` (stack of 5 wooden blocks, BIG_FLOAT; label plural) · `kitchen tools/sponge` (dry; landing says "dry") · `toys/boat` (toy boat). Sinkers: `beach/rock` · `tools/hammer` · `classroom/scissors` (steel blades) · `vegetables/potato` · `beach/seashell` (scallop, SMALL_SINK) · `tools/nail` (steel spike, SMALL_SINK) · `around the house/key` (SMALL_SINK, see flag).
- ⚠ Opened and EXCLUDED here beyond the pedagogy list: `christmas/candle` (m: drawn LIT, a flame in a water test is a wrong cue; the pedagogy accepted it) · `around the house/spoon` (m: wooden bowl but a red handle with a hanging hole, reads as plastic) · `kitchen tools/fork` (metal + green plastic handle) · `classroom/eraser` (rubber, result varies) · `kitchen tools/bowl` (container) · `around the house/bathtub` (a library bathtub is never used: the tub is the drawn primitive, one art source for the apparatus).
- ⚠ `around the house/key` (m) is drawn PINK with no metal shine; it may read as a toy key. Kept only in the base (open, the class tests a real key); NOT in F2's closed pairs. Panel may drop it.
- `F2_PAIRS` (floater drawn BIG / sinker drawn SMALL; replaces two of the pedagogy's four for the candle and key flags): `camping/log` vs `tools/hammer` · `toys/ball` vs `tools/nail` · `fruits/orange` vs `beach/rock` (rock drawn small = a stone) · `camping/pinecone` vs `beach/seashell`; reserve `fruits/apple` vs `around the house/key` (only if the panel accepts the key as metal).
- `FORMS` = `{ball:'sink', sausage:'sink', cube:'sink', boat:'float', bowl:'float'}` (code constant; pancake EXCLUDED per pedagogy).
- `data/b6/locales/sink-or-float.<loc>.json`: `words.{float,sink}` (key band) · `heads.{think,did}` · `labels.<vocabKey-or-id>` (whole literals, see §6) · `claims.<id>` · `f6.{q1,q2,heads[5],starter}` · `f5.{float,sink}` (may equal `words`).

## 6 Locale slot structure

| surface | font | size | slot | reserve |
|---|---|---|---|---|
| key-band verbs (the only float/sink words on base/F2/F3) | Baloo 2 700 | 20 | 200 px each *est.* | +40 %: de "geht unter", pt "afunda", fi "uppoaa" fit; a 2-line verb FAILS the validator |
| column heads | Baloo 2 700 | 17 | 168 px | de/fi/pt +40 % fits *est.* |
| object labels | Nunito 800 | 13 | 116 px, <= 2 lines | measured per locale |
| F4 claims | Nunito 800 | 18 | 639 - 26 badge - 60 pics - 2x44 chips - gaps = ~430 px, <= 2 lines | de/fi longest claim *est.* 2 lines at 55 chars |
| F6 section heads / questions | Baloo 2 700 18 / Nunito 800 16 | | 560 / 270 px | 2 lines max |
| F6 starters on writing rows | Nunito 800, sized from `font-metrics.json` | | | never a derived factor |
Floor 13 px on this family (above the 9 px lint). **Traps the slots are built for (m):** vocab singulars are WRONG as labels here: `nail` = fingernail in fi "Kynsi" and pt "Unha", `rock` = cliff in de "Felsen" and fi "Kallio", `sponge` fi "Sieni" also means mushroom. So `labels` are whole panel literals keyed by picture (de "Nagel", fi "naula", pt "prego", de "Stein", fi "kivi", fi "pesusieni" as proposals); the vocab is a draft only, never read at render. Labels are nouns in citation form, lower-case except de. Float/sink are VERB forms the panel chooses (de "schwimmt" means swim and float: panel may pick "schwimmt oben / geht unter"; nl "drijft / zinkt"; fi "kelluu / uppoaa"). No sentence ever agrees with a picture noun (claims name objects as panel literals inside the claim string). Instruction strings name only apparatus on the page ("tub", "=", "box").

## 7 Five variation faces

**F2 "Big and Small: Sink or Float Predictions" (G1, CODE `face:'size'`).** Visual delta: no table, no key band; a 2x2 `cardGrid` of 4 "shelf" cards (each 316 x 300 *est.*, cream, radius 16): a grid-colour shelf line at 78 % card height; the floater stands on it at 150 px tall, the sinker at 72 px (ratio 2.1, >= 1.6 gate), 40 px apart, bottoms aligned; top-left of each card a float-state `waterTank` 48x38 + a drawn "?" (the wordless question "which floats?"). The child circles one picture. Heights: 4 + 2 x 300 + 16 gap = 616 <= 677. Verify hook: one float per card, measured height ratio, floater side 2/2 and not alternating. Query face: "does heavy sink / big and small sink or float" (de "schwer oder leicht schwimmt", en "does heavier sink"). Instruction (en): "In each box, circle the thing that floats."

**F3 "Change the Shape: Clay Boat Experiment" (G2, CODE `face:'shape'`).** Visual delta: the clay primitive replaces pictures; 5 rows `[n 30][lump 72x54][arrow SVG 30][form 120x80][chip float][chip sink]` (row 88) in a card, then a 639 x 170 `drawBox` headed with a lump glyph ("your boat"). Heights: 5 x 88 + 16 + 170 + 12 = 638 <= 677. Verify: forms bijection, area ratios, floaters not both at the top or both at the bottom. Query: "Knetboot", "make clay float", "clay boat experiment". Instruction: "All shapes use the same clay. Circle the tub that shows what each shape does. Draw your own clay boat."

**F4 "Why Do Things Float? True or False" (G2, CODE `face:'claims'`).** Visual delta: text-led; 6 claim rows `[badge 26][evidence 1-2 pics 48 or a clay pair 48][claim 18 px][check 44][cross 44]`, row min 88, a thin tealSoft band behind every second row. Claims bank (panel literals, >= 10, 5 true + 5 false; d2 draws 3 + 3): "All heavy things sink." F (log) · "A big log floats." T (log) · "A small nail sinks." T (nail) · "Air inside a ball helps it float." T (ball) · "Light things always float." F (feather + nail) · "The same clay can sink or float." T (clay ball + boat) · "Big things always sink." F (orange) · "Small things always float." F (seashell) · "A wooden pencil floats." T · "Shape can change sink or float." T. Heights 6 x 88 + 5 x 10 = 578. Query: "why do things float", "por que flutua". Instruction: "Read each sentence. Circle the check if it is true. Circle the cross if it is false."

**F5 "Draw What Floats and Sinks" (K, CODE `face:'draw'`, open).** Visual delta: the whole body is two big empty tanks side by side, `waterTank({w:300, h:430, state:'empty', waterAt:0.30})`, each crowned by a 60x48 icon + the verb in Baloo 22; nothing else on the page. Heights 60 + 12 + 430 = 502, centred with margin (K whitespace). Verify: layout only. Query: "ce qui flotte ce qui coule maternelle", "draw sink or float kindergarten". Instruction: "Draw one thing that floats on top of the water. Draw one thing that sinks to the bottom."

**F6 "Sink or Float Investigation Write-Up" (G3 recommended; pedagogy says G2-G3, G2 already carries F3 + F4; CODE `face:'report'`, open).** Visual delta: a lab-notebook form of 5 numbered sections, each a teal badge + drawn glyph + Baloo head: (1) Question: two `sofQuestionCard`s 312 x 120 (`fruits/orange` + a small peeled-orange-free text "with and without its peel"; clay boat + 3 clay balls "how many clay balls can a clay boat carry?"), circle one; (2) I think: 2 ruling rows glyphH 26 h 52; (3) We used: pictogram row (tank icon, the two question objects, 2 empty 56 px draw boxes for "other things"); (4) What happened: `waterTank` empty 250x170 + 3 ruling rows beside it (w 360); (5) I learned: 2 rows, row 1 starts with the panel starter ("I learned that"). Heights 120 + 118 + 72 + 176 + 118 + 4 x 8 gaps = 636 <= 677 *est.* Verify: layout + both question ids. Query: "science experiment worksheet sink float", "Forscherheft schwimmen und sinken". Instruction: "Choose one question. Write what you think, test it, draw what happened and write what you learned."

**Why these five:** each changes what the child DOES (circle a picture by size / reason about shape with one material / judge a claim / draw / write a full report) and owns one query face (size misconception, Knetboot, "why", K drawing, investigation). Resolved configs all differ from base d2 (`face` key). **First to cut:** F4 (the most text; if a locale's claims cannot be made unambiguous, refuse it there rather than F2/F3). **Hub contract:** `apps['sink-or-float']` + `axes['exercise-type']['sink-or-float']` slug + name x11, one landing per face per locale (`coordinate.type === 'sink-or-float'`, `coordinate.mode` = `base|size|shape|claims|draw|report`, `coordinate.theme:''`), level keys from `LEVEL_KEYS` (m `scripts/seo-landing/gen-b3-landings.js:98`), committed + deployed; `scripts/verify-hub-type-rows.js` expects 6 rows per locale, no refusals expected. Ids: base G1-399; F2 G1-4xx, F3/F4 G2-37x, F5 K-38x, F6 G3-4xx (TBD by the emitter).

## 8 Two alternatives + recommendation

1. **"The Balance Lab"** (`primitives/balance.js`, m: two pans, tilt states): each pair on a scale tipping toward the heavier object, then circle the floater. Rejected: the page would ASSERT weights the pictures cannot guarantee (apple vs a small rock), and four pairs all tipping toward the floater teach a new wrong rule ("heavy floats"). Size is visible; weight is not.
2. **"Bath-time scene"**: one big bathtub (library `around the house/bathtub`, opened) with the objects scattered around; the child draws each into the water or onto the floor. Rejected: it is G1-204's two-way sort in a costume, placing objects prints the categories, and mixing a painted bathtub with a drawn waterline breaks one-art-source.
**Chosen: the Lab Notebook**, because it is the only concept where the prediction and the result sit side by side (the inquiry the lock names), it reuses ONE drawn icon for every answer on four faces (learn once, read everywhere, greyscale-proof), and it looks nothing like a two-bin line sort.

## 9 Risks, mitigations, print check

- **Long locales:** only three short word slots exist on the base (2 verbs, 2 heads) plus labels; each has a measured width and a 2-line FAIL. F4 claims and F6 heads carry the real length; both budgeted at 2 lines.
- **Greyscale:** meaning = position + stroke marks (ripples vs bubbles), never coral vs teal; the "It did" column's creamDeep band vs white stays visible in mono *est.* (engineer prints a mono proof of base + F3). Clay coralSoft + coral outline reads as a grey outline round a light body.
- **Pencil space:** chips 80x64 take a ring; tally boxes 56x44; F6 glyphH 26 >= G2-3 floor 24; F5 frames 300x430 for K drawing.
- **Science traps (human eye only):** a lit candle, a pink key, a plastic-looking spoon (all opened, handled above); "dry" sponge in copy; potato and seashell sink in TAP water (never salt); no "density" word below G3; never "because it is light" as a true claim.
- **Tells:** F2 floater side 2/2 non-alternating; F3 floaters not clustered; F4 3/3 non-alternating; base row outcomes shuffled with the run rules. These are gated; a landing-panel audit of the render is still required (nt10-E classes: position tell, two right answers, a picture named differently).
- **QA lint catches:** overflow, 9 px floor, palette, blank page (`data-ws-content`). **Only a human catches:** whether a picture reads as the material the answer assumes (key, spoon, sponge), and whether a locale's verb pair reads as float (de).
- No cut lines on any face.

## 10 Summary

1. Concept: a lab-notebook record where each object has a wordless "I think" tub pair beside an "It did" tub pair, plus an "=" tick and a wordless tally.
2. NEW `water-tank.js` (token on the waterline with ripples vs on the gravel floor with bubbles; px geometry, greyscale-safe) and `clay-form.js` (six same-clay side-view forms, equal-area rule, never drawn over water).
3. Faces: size pairs (big floater drawn 2.1x), clay shapes + design box, true/false claims with evidence pictures, K two empty tanks, a 5-section investigation write-up.
4. Opened-picture changes: candle (lit), spoon (plastic handle), fork excluded; key kept only in the open base; labels are panel literals because vocab `nail`/`rock`/`sponge` are wrong in fi/pt/de.
5. Nothing on any page prints an outcome; closed faces verify one floater per card, form outcomes, 3/3 claims, and every position-tell rule.
