# K-379 `story-sequencing`: pedagogy + content design (2026-09-23)

Read: `_ROLE-PEDAGOGY`, `_STUDIO-BRIEF`, `_SUBSTRATE` (+ DELTA), `_PANEL-FINDINGS` (row 1 + faces + rulings 4, 6, 7), the `story-sequencing` sections of `_work/_selection-{pedagogy,seo-germanic,seo-romance,seo-nordic}.md`, `types/_shared/science-sequence.js` (build + verify), `types/k/K-374-crossing-the-road-safely-steps.js`, `types/g1/G1-340-read-and-do-first-second-between.js`, `primitives/road-pictogram.js` (header), `primitives/family-figure.js` (header), `primitives/_tokens.js`, `templates/components-b2.js rulingBlock/starterFontPx`, `templates/components-b3/ordinal-numbers.js blankNumeralBox/wordChipRow`, `scripts/seo-landing/gen-b5-landings.js LEVEL_KEYS`, `frontend/config/topics-taxonomy.json`. (m) = measured read-only this session; *est.* = the engineer measures in a real render. No em-dashes.

**Boundary (load-bearing).** The catalogue already owns the ORDER move on four surfaces, each with non-narrative content: **G1-203 chicken life cycle** + every animal-life-cycles / plants face (science: growth, hatching; `science-sequence` rail name "Sequencing & Life Cycles / Reihenfolge & Lebenszyklen / Secuencias y ciclos de vida / Ordningsföljd och livscykler", m) · **K-374 "Crossing the Road Safely: the Steps"** (a safety PROCEDURE, 4 cards write 1-4, m) and the future healthy-habits hand-washing / brushing faces (hygiene PROCEDURES) · **days-and-months** ordering (calendar) · **read-and-do G1-340** (ordinal POSITIONS in a row, m) · **reading-comprehension G2-254** (+5, TEXT stories) · **picture-writing G2-278/299/300** (write to ONE picture; rail "Skriv till bilden / Schreiben zum Bild / Produção de texto com imagem", m) · **patterns** (pt "Sequências lógicas", it "Sequenze e ritmi", m). The base shares the write-1-to-N MOVE with G1-203 and K-374, so the family is separated by CONTENT and QUERY, never by mechanics: **story-sequencing owns NARRATIVE order read from pictures** (an everyday event with a beginning, a middle and an end, often a small mishap and its repair), the temporal words, predicting the next event from a visible cause, story structure (beginning/middle/end) and oral/written RETELLING. It never shows growth, hatching, melting, weather cycles, cooking by heat, a hygiene or safety routine, a craft instruction sheet, a holiday (Halloween, Thanksgiving, Christmas, Easter), a face or an emotion. `story-sequencing` is ABSENT from `apps` and `axes['exercise-type']` (m); no theme slug contains a story word (m).

## A. Identity

| field | value |
|---|---|
| key / bands | `story-sequencing` / base **K-379 K**; F2 **K** (`K-381+ TBD by the emitter`); F3 F4 F5 **G1** (`G1-400+ TBD`); F6 **G2** (`G2-378+ TBD`). `default_subject: letters` (lock), `default_age_range: 5-7`, `assetClass: geometry`, `exerciseType: story-sequencing`. |
| theme axis | **OFF** on all six faces: `themeAxis:{applicable:false}`, `coordinate.theme:''`. The STORY is the content axis, chosen by the seed from a curated bank; it is not a theme. |
| `unitAxis` | not applicable. |
| art | **0 library pictures.** Every panel is drawn by the NEW palette-only `primitives/story-panel.js` from `data/b6/stories.js` (one art source per page, ruling 4). The "library badge on the writing faces" idea is REJECTED (it would mix art sources on one page). The only reused drawing: the faceless `walker` glyph of `road-pictogram.js` (`glyphGroup`, poses `walking` / `standing`, m) for one story. |
| the one rule | **The answer is the panel's `rank`, and a rank is legal only because every consecutive pair of panels strictly INCREASES at least one IRREVERSIBLE state variable and decreases none** (bites, cuts, tears, crumbs, painted/drawn marks, tracks, footprints, holes, a stamp stuck, a puncture, a patch). Direction never comes from a change a child can undo with their hands (stacking, inserting, placing, moving, filling, pouring, opening, inflating, lighting, blowing out, folding). The validator PROVES the chain on the bank's `state` vectors; a story that needs a reversible step to order is refused at build time, never fixed with wording. Quality test: a non-reader justifies the order by pointing at what CHANGED. |
| CCSS (en, honest) | base **RL.K.2** related (ordering a wordless story supports the retell; the retell is teacher-led) · F2 **W.K.3** (events in the order they occurred) · F3 **RL.1.7** (use illustrations and details to describe events) · F4 **W.1.3** (recount appropriately sequenced events; the child supplies the middle event) · F5 **RL.1.7 + RF.1.4a** (read with purpose, match text to picture) · F6 **W.2.3** (narrative; temporal words to signal event order). No G2 code on a G1 face (RL.2.5 belongs to G2, so F4 does not claim it). |

| loc | genre head (panels) | school year K / G1 / G2 | national strand (framework NAME) | CCSS |
|---|---|---|---|---|
| en | **Story Sequencing** (A; "story sequencing worksheets for kindergarten pdf", "first next then last worksheets kindergarten" WINNABLE) | kindergarten / grade 1 / grade 2 | Reading Literature + Writing | as above |
| de | **Bildergeschichte** / **Bildergeschichte ordnen** (A / B+) | Vorschule / 1. Klasse / 2. Klasse | Lehrplan Deutsch: Sprechen und Zuhören; Texte verfassen | none |
| es (MX) | **Secuencias temporales** / **secuencias de cuentos** / **secuencia de imágenes** (A-) | preescolar / primer grado / segundo grado | SEP/NEM campo formativo Lenguajes | none |
| pt (BR) | **Sequência de fatos** / **sequência de imagens** (B+; "sequência lógica" BLOCKED by 293 live pattern titles, m in selection) | educação infantil / 1º ano / 2º ano | BNCC: EI "Escuta, fala, pensamento e imaginação"; EF Língua Portuguesa (oralidade, produção de textos) | none |
| fr | **Images séquentielles** / **remettre une histoire dans l'ordre** (A) | maternelle (GS) / CP / CE1 | programmes: Mobiliser le langage (maternelle); Français cycle 2 (langage oral, écriture) | none |
| it | **Storie in sequenza** / **sequenze temporali** (A-) | infanzia / classe prima / classe seconda | Indicazioni nazionali: Italiano (ascolto e parlato, scrittura) | none |
| nl | **Verhaal op volgorde** (provisional; dead as seeded, re-probe) | kleuters / groep 3 / groep 4 | SLO kerndoelen Nederlands (mondelinge taalvaardigheid, stellen) | none |
| sv | **Bildserie** (C+) | förskoleklass / åk 1 / åk 2 | Lgr22 svenska (tala, lyssna och samtala; skriva) [NSR] | none |
| da | **Billedserie** (C) | børnehaveklasse / 1. klasse / 2. klasse | Fælles Mål dansk (fremstilling; kommunikation) [NSR] | none |
| no | **Bildeserie** (C) | 1. trinn / 2. trinn / 3. trinn | LK20 norsk (muntlig kommunikasjon; skriftlig tekstskaping) [NSR] | none |
| fi | **Kuvasarja** / **kuvakertomus** (B-) | esikoulu / 1. luokka / 2. luokka | OPS 2014 äidinkieli ja kirjallisuus (vuorovaikutustilanteissa toimiminen; tekstien tuottaminen) [NSR] | none |

## A.1 THE STORY BANK (`data/b6/stories.js`, locale-free; the most important deliverable)

**Panel box.** Unit viewBox **160 × 120** (4:3), teal outline 3 px at every size (user units = 3/scale, the body-figure rule), round joins, fills from the tokens (`cream creamDeep teal tealSoft coral coralSoft ink inkSoft white grid`) plus, where a story needs a hue the tokens lack, `codeYellow` (banana, cheese, sun) under a palette allow-list scoped to `[data-lcs-story-panel]` (the K-357 bin-lid precedent; open item F.1). **No text, no numerals, no faces (no eyes, mouths, brows) inside any panel.** Ground conventions: table band `creamDeep` y 96-120; grass `tealSoft` y 96-120; snow `white` y 92-120 with a teal top line; sand `creamDeep` y 90-120; pavement `grid` fill (top view). Every panel of a story shares setting, scale and object positions except what changes (a child compares like with like). `minDetail` = the smallest countable change element (bite scallop, crumb, footprint, hole) in unit space; the gate converts it to px.

**Legend per story:** `state` = the irreversible variables per panel (the validator's input); `sub3` / `sub4` = the ranked subsets used by 3- and 4-panel faces (always contain the first and the last panel); `f3Earlier` = the panel shown as F3's "already happened" distractor; `pools` = faces allowed; *second-order check* = why no other permutation is a coherent story; *child says* = the non-reader's justification.

1. **`apple` Apple snack** (4 panels; sub3 [1,3,4]; pools all; minDetail 7). Table band; white plate ellipse cx 80 cy 98 rx 46 ry 8.
   - P1 whole apple: coral circle cx 80 cy 66 r 26; ink stem (80,40)-(83,31); tealSoft leaf ellipse 12×6 at (91,36) rotated -20°.
   - P2 as P1 with ONE bite: a cream scallop (circle r 9) cut into the right edge at (104,62).
   - P3 THREE bites: scallops at (104,56), (104,74), (56,64); the apple reads half gone.
   - P4 core: hourglass (top cap 30 wide at y 42, waist 12 wide at y 66, bottom cap 26 wide at y 90), cream fill with a coral rim, stem + leaf kept.
   - state `{bites:[0,1,3,9]}`. Second-order check: bites cannot be undone; every other order decreases `bites`. Child says: "the apple gets eaten, then only the middle is left".

2. **`banana` Banana** (4; sub3 [1,3,4]; pools all; minDetail 6). Table band + plate as 1.
   - P1 whole banana: crescent 90 long lying on the plate (`codeYellow` fill), stalk tip ink.
   - P2 top third peeled: three peel strips folded down (petal shapes 26 long), cream flesh tip 22 long showing.
   - P3 flesh half gone: flesh stub 10 long with one bite scallop; the three strips hang lower (fully peeled to the base).
   - P4 empty peel lying open flat (four strips like a star), no flesh.
   - state `{peeled:[0,1,2,2], eaten:[0,0,1,2]}`. Check: a peel cannot go back on; flesh cannot return. Child says: "peel it, eat it, only the skin is left".

3. **`sandwich` Sandwich** (5; sub4 [1,2,3,5]; sub3 [1,3,5]; pools all; minDetail 5; the operator's example). Wooden board = creamDeep rounded rect 130×24 at y 84.
   - P1 two plain bread slices (rounded-top squares 42×40, white fill, creamDeep crust band 4) at x 30 and x 88; butter knife ink at the right (blade 26 long); small jar tealSoft with a coral lid at x 140.
   - P2 left slice covered by a coral spread layer (inset 5); the knife now lies on the board with a coral tip; right slice still plain.
   - P3 ONE closed sandwich at x 80, cut diagonally into two triangles with a 5-unit gap; the filling shows at the cut edges (a tealSoft lettuce wave + a `codeYellow` cheese edge); knife and jar unchanged.
   - P4 the two triangles; the right triangle has ONE bite scallop (r 8).
   - P5 only the left triangle remains (unbitten); where the right one was: 4 crumbs (ink dots r 2).
   - state `{spread:[0,1,1,1,1], cut:[0,0,1,1,1], bites:[0,0,0,1,1], crumbs:[0,0,0,0,4], halvesGone:[0,0,0,0,1]}`. Check: spread, cut, bite, crumbs are all irreversible; closing the sandwich happens INSIDE the P2→P3 step together with the cut (the cut carries the direction). Filling = lettuce + cheese only (no meat: neutral in all 11 countries). Child says: "bread, then butter, then the sandwich is cut, then bitten, then half is eaten".

4. **`cake` Birthday cake** (5; sub4 [1,2,3,4]; sub3 [1,2,4]; pools all; minDetail 4). Cake stand: white plate ellipse cx 80 cy 96 rx 50 ry 7 + stem 10×10 + foot.
   - P1 plain round cake, side view: rect 84×34 (x 38-122, y 60-94), coralSoft icing band on top with a scalloped lower edge; no candles.
   - P2 three candles (white rects 5×18 with teal outline) at x 62, 80, 98 on top, each with a coral teardrop flame (the birthday signal; universal per the brief).
   - P3 candles lying beside the stand (three white rects on the table), three small ink holes (r 2) on the icing where they stood; ONE slice gone: a notch 22 wide at the right end showing the inside (two cream/coralSoft layers); the slice stands on a small plate at x 140.
   - P4 half the cake left (x 38-80), cut face with layers, 3 crumbs on the stand; holes on the remaining half's top (1 hole).
   - P5 only crumbs on the stand (6 ink dots) + the three candles on the table.
   - state `{candleMarks:[0,1,1,1,1], slicesGone:[0,0,1,3,6], crumbs:[0,0,0,3,6]}`. **Blowing out is NOT a panel** (lit and blown-out are reversible states: a relit order would be legal); the flames only mark P2. Check: after P2 the candle holes stay, so P1 (no holes) cannot follow P2 or P3; slices and crumbs only rise. Child says: "cake, candles, then they cut it, then it's eaten".

5. **`drawing` Drawing a picture** (4; sub3 [1,3,4]; pools all; minDetail 3). Table band; white sheet 96×68 at x 32 y 22 (teal outline); coral crayon (rect 34×7 with a pointed tip) at the lower right.
   - P1 blank sheet.
   - P2 a house outline in ink 2 px: square 30×24 + triangle roof + door rect.
   - P3 P2 + a sun outline (circle r 8 + 6 ray lines, NO face) top right + a tree outline (circle r 9 on a trunk) left.
   - P4 all coloured: house coralSoft, roof coral, sun `codeYellow`, tree top tealSoft.
   - state `{lines:[0,5,14,14], fills:[0,0,0,4]}`. Check: pencil/crayon marks are not undone (no eraser drawn). Child says: "empty, then a house, then more, then coloured".

6. **`fence` Painting the fence** (4; sub3 [1,3,4]; pools all; minDetail 5). Grass band; fence of 6 vertical planks (14×50, pointed tops) x 25-135, y 46-96, two teal rails; paint pot (bucket 18×16 with a coral rim) + brush (ink handle, coral bristles) at bottom right.
   - P1 all planks white. P2 the 2 left planks coral. P3 4 planks coral. P4 all 6 coral + 3 coral drip dots on the grass.
   - state `{painted:[0,2,4,6], drips:[0,0,0,3]}`. Greyscale-safe: coral vs white differ in luminance and the COUNT carries it. Check: paint is not removed. Child says: "more and more boards get painted".

7. **`snowman` Building a snowman** (4; sub3 [1,3,4]; pools base/F2/F3/F4 only (no sentences); `climate:'snow'`, default `excludeLocales:['es','pt']`, panel may lift; minDetail 6). Snow ground (white, teal top line y 92); sky = page cream.
   - P1 small snowball r 8 at (40,84), no tracks.
   - P2 big ball r 20 at (104,72); behind it a bare-grass TRACK (tealSoft band 10 tall, rounded ends) from x 12 to x 84 at y 92-102.
   - P3 big ball + middle ball r 14 stacked at (104,40); a SECOND track (tealSoft band) x 12-70 at y 104-114.
   - P4 + head r 10 at (104,18), ink top hat 16×10 with brim on the head, coral carrot nose (triangle pointing right, 10 long), two ink stick arms from the middle ball, three ink buttons; a THIRD short track x 30-60 at y 96-100 (or at the right). **No eyes, no mouth** (no expression).
   - state `{tracks:[0,1,2,3], balls:[1,1,2,3]}`. Check: a rolled track leaves bare grass that cannot be re-snowed without new snowfall (not drawn), so every other order decreases `tracks`; the snowman is never shown melting (science). Child says: "small ball, big ball, two balls, the snowman is finished".

8. **`letter` A card for a friend** (4; sub3 [1,3,4]; pools all; minDetail 4). Table band (P1-P3), street pavement band `grid` (P4).
   - P1 blank white card 70×50 at x 45 y 36 + an ink pencil (rect 40×5, pointed tip) beside it.
   - P2 the card with a drawn flower (circle r 6 + 5 coralSoft petals + teal stem) and three wavy ink lines (writing marks, NO letters, language-neutral).
   - P3 a closed envelope 70×46 (white, teal V-flap lines) with a coral stamp 12×12 (zigzag perforated edge) top right; the card is not visible.
   - P4 a street mailbox: teal box 44×40 with a rounded top on a post 6×30, a dark slot line, a white envelope glyph on the front; the stamped envelope half inside the slot with two short motion lines above it (moving down).
   - state `{marks:[0,1,1,1], stamped:[0,0,1,1], posted:[0,0,0,1]}`. Mailbox colour is teal on purpose (yellow de/fr/sv, red da/no, blue en: no country colour). Check: a stamp stays stuck; a posted letter cannot be taken back out. Child says: "empty card, drawn card, envelope, mailbox".

9. **`present` A present** (3 panels ONLY; sub3 [1,2,3]; pools F2 + F4 only; minDetail 5). Table band.
   - P1 a closed white box 40×34 (teal outline) + a flat sheet of wrapping paper (coralSoft 60×44 with teal dots, uncreased) + a tape roll (ring).
   - P2 the box wrapped in the dotted paper, two white tape strips over the edges; the sheet is gone.
   - P3 four torn paper pieces (irregular coralSoft polygons with dots) on the table, the box open (lid tilted), a ball (circle with one teal stripe) beside it.
   - state `{wrapped:[0,1,1], torn:[0,0,1]}`. **No bow** (a bow comes off and on: reversible). Check: taped paper does not return to a flat uncut sheet; torn paper does not re-wrap. Child says: "paper, wrapped, opened".

10. **`paper-chain` Paper chain** (4; sub3 [1,2,4]; pools all; minDetail 4). Table band.
    - P1 one coralSoft sheet 70×50 + ink scissors (two loops, blades 20 long).
    - P2 five coralSoft strips 60×8 fanned on the table + scissors; no sheet.
    - P3 a chain of 2 interlocked links (ellipses 24×16, coralSoft fill, teal outline) + 3 strips left.
    - P4 a chain of 5 links hung in a gentle arc, 0 strips.
    - state `{cut:[0,1,1,1], links:[0,0,2,5]}`; conservation `links + strips = 5` from P2 on (the gate checks). Check: cut strips cannot rejoin a sheet; glued links only increase. Not a holiday (no tree, no lights). Child says: "paper, strips, a little chain, a long chain".

11. **`flat-tyre` The flat tyre** (3 panels ONLY; sub3 [1,2,3]; pools F2 + F4; minDetail 4). Road band `grid` y 100-120.
    - P1 bicycle side view (two wheels r 16, white fill, teal 3 px tyres, 4 spokes; teal frame triangle, saddle, handlebar) at x 30-92 with two motion lines behind the rear wheel (moving right); an ink nail (point up, head 6 wide) on the road at x 128.
    - P2 bike moved right (x 64-126); the front tyre FLAT at the bottom (a 20-wide chord + a bulge), the nail stuck in it.
    - P3 bike standing still (no motion lines); front tyre round again with a coral PATCH rect 8×6 on it; the nail lies on its side on the road at x 20; a small pump (teal cylinder + ink hose) leaning on the frame.
    - state `{punctured:[0,1,1], patched:[0,0,1]}`. Check: a patch stays; a puncture cannot happen before the nail is reached (motion lines fix the direction of travel). Child says: "riding, a nail, fixed".

12. **`beach-walk` Walk to the shell** (4; sub3 [1,3,4]; pools all; minDetail 5). Sand band creamDeep y 90-120; no sea drawn (waves would erase footprints).
    - P1 coral striped towel 30×12 at x 10-40 y 100; walker (`road-pictogram` `standing`, 44 units tall) on the towel; a coralSoft fan shell (6 ribs) at x 138 y 104; 0 footprints.
    - P2 walker `walking` at x 76; 4 footprints (ink ovals 4×6) zig-zag from the towel to the walker.
    - P3 walker `standing` beside the shell at x 124; 8 footprints.
    - P4 walker `standing` on the towel again; the shell ON the towel; 16 footprints (two trails, out and back); no shell at x 138.
    - state `{footprints:[0,4,8,16]}`. Check: footprints only accumulate (no sea); P1 and P4 share the walker position but differ in footprints AND shell, so start ≠ end. Child says: "on the towel, walking, at the shell, back with the shell".

13. **`collage-fish` Paper fish collage** (4; sub3 [1,3,4]; pools all; minDetail 4). Table band.
    - P1 two coloured sheets (coral 40×30, tealSoft 40×30) + a glue stick (white cylinder, coral cap) + a white base sheet 70×50 with a teal fish OUTLINE (oval body + triangle tail, **no eye**).
    - P2 the two sheets torn into 6 irregular pieces (3 coral, 3 tealSoft) lying on the table; base sheet unchanged.
    - P3 3 pieces glued inside the fish body (front half), 3 still loose.
    - P4 all 6 inside the fish, body and tail covered; 0 loose.
    - state `{torn:[0,1,1,1], glued:[0,0,3,6]}`; conservation `glued + loose = 6` from P2. Child says: "paper, torn, some glued, a whole fish".

14. **`hopscotch` Chalk hopscotch** (4; sub3 [1,2,4]; pools base/F2/F3/F4; minDetail 4). TOP view: pavement fills the panel (`grid`); white chalk stick at the lower right.
    - P1 empty pavement; chalk 22 long.
    - P2 2 squares drawn (white outline 16×16, stacked vertically at the bottom centre); chalk 18.
    - P3 4 squares (1, 1, then a pair side by side); chalk 14.
    - P4 the full court: 7 squares (1, 1, 2, 1, 2) + a semicircle on top; chalk 10. **No numbers in the squares** (numerals would compete with the answer numerals).
    - state `{squares:[0,2,4,7], chalkUsed:[0,1,2,3]}`. Child says: "more squares, the chalk gets shorter".

**Dropped (each fails the one rule; recorded so nobody re-proposes them):** block tower + ball (building is undoable; "blocks on the floor → tower → ball rolls in" is a second legal 3-panel story) · balloon (inflation is reversible; untie/deflate) · sandcastle (sand re-shapes) · juice glass / spill (refill makes full ↔ empty reversible) · getting dressed (several legal orders; also a routine) · pizza (a recipe-shaped procedure; sandwich covers the kitchen) · paper aeroplane / paper snowflake (fold/unfold reversible; instructions) · puddle jump (rain → puddle → dry = weather/evaporation science) · raking leaves (the scattered start = the scattered end) · tidying toys (tipping out reverses) · cake "blown out" panel (relighting) · ice cream / ice lolly (melting) · seed planting, egg hatching (biology) · pumpkin, Christmas tree, Easter egg (holidays) · a muddy dog + bath (start = end; animal face) · classic tales (Rotkäppchen, Caperucita: no tale art, tale versions differ by country, face/character reading).

**Pool counts (per locale, after the default snow exclusion):** 4-panel stories 12 (es/pt 11); 5-panel 2 (`sandwich`, `cake`); 3-panel-only 2 (`present`, `flat-tyre`); sentence pool (F5/F6) **8**: `apple banana sandwich cake fence letter paper-chain beach-walk` (no snow, no top view).

## B. The six faces

Shared: NEW `primitives/story-panel.js` (spec above + `storyPanel({storyId, rank, w}) → {svg, width, height, meta:{storyId, rank, state, minDetailPx}}`, stamps `data-lcs-story-panel data-lcs-story=<id> data-lcs-rank=<k>`; THROWS below the band floor); NEW `templates/components-b6/story-sequencing.js` (exports prefixed `ss`); reuse `blankNumeralBox` (answer `''`), `rulingBlock` + `starterFontPx` (measured starters), `.ws-match` two-column layout, `cardGrid`. Every stage stamps `data-ws-content`. **Scramble law (every scrambled face):** each story's shown order is a derangement of its ranks that is not the full reversal; two stories on one page never share a permutation; the slot holding rank 1 differs between the page's stories; pooled over 400 seeds no slot holds rank 1 more than 40 % (the nt10-E pooled-sample lesson: raise the sample, never the threshold). Band floors (panel width): **K ≥ 140 px, G1 ≥ 104 px, G2 ≥ 96 px**, and `minDetailPx ≥ 5` (*est.*, the primitive's gate measures).

### Base: Story Sequencing: Number the Pictures (K, K-379, PARAM ladder)
**Move:** ORDER a wordless story by what changes, and record the order with numerals.
**Child:** "Look at what changes in each picture. Write 1, 2, 3 and 4 in the boxes to put each story in order." (en 104)
**Params:** d1 `{mode:'base', stories:2, panels:3, order:'scrambled', answer:'numeral'}` · **d2 (ships) `{mode:'base', stories:2, panels:4, order:'scrambled', answer:'numeral', panelW:146, boxW:56}`** · d3 `{stories:1, panels:5, pool:'n5'}` (sandwich or cake; not shipped). Each story = one horizontal strip of 4 panels (4 × 146 + 3 × 18 = 638 ≤ 639 lane), a `blankNumeralBox` 56 × 56 under each; strips separated by 28 px; stack ≈ 2 × (110 + 12 + 56) + 28 = 384 of 722 (*est.*; rows `minmax(<min>, 1fr)` absorb slack).
**verify():** panels stamp `data-lcs-story`, `data-lcs-rank`; boxes `data-lcs-slot` with `data-lcs-answer=""` and no text node; the gate re-derives each box's answer = the rank of the panel above it and asserts: ranks per story = {1..n}, the scramble law, the two story ids differ and their `objects` are disjoint, every box empty.
**Refusals:** none (pool 12 / 11).
**Query face:** the bare genre head (+ "number the pictures"): "story sequencing worksheets for kindergarten", "Bildergeschichte ordnen", "secuencias temporales preescolar", "sequência de fatos educação infantil", "images séquentielles maternelle", "storie in sequenza infanzia", "verhaal op volgorde kleuters", "bildserie förskoleklass", "billedserie", "bildeserie", "kuvasarja esikoulu".

### F2: First, Next, Last (K, `K-381+ TBD`, CODE `answer:'chip'`)
**Move:** ORDER with the TEMPORAL WORDS instead of numerals: the child tags each panel with first / next / last.
**Child:** "Look at the three pictures of each story. Circle First, Next or Last under every picture." (en 90)
**Params:** d2 (ships; pinned for all levels) `{mode:'first-next-last', stories:2, panels:3, order:'scrambled', answer:'chip', words:3, panelW:190}`. Under each panel a row of the 3 locale chips (`words3`, fixed order, 15-16 px Nunito 800, chip h 36, nowrap in 190 px: longest row es "Primero · Después · Al final" ≈ 184 px *est.*). 2 × 3 = 6 items (K 4-8; 3 stories would be 9, over the ceiling). Stories from `sub3`. The landing says the adult reads the three words aloud first (pre-readers).
**verify():** chips `data-lcs-chip="1|2|3"` in DOM order 1-2-3 under every panel; answer chip = the panel's rank in the sub3 order; no chip carries a mark; scramble law with n = 3 (non-identity; across the two stories rank 1 sits in different slots; pooled ≤ 40 % per slot).
**Refusals:** none (every locale has a 3-word set, table C).
**Query face:** "first next then last" / "zuerst dann zum Schluss" / "primero después al final" / "primeiro depois por fim" / "d'abord ensuite enfin" / "prima dopo infine" (measured it verbatim) / "eerst dan daarna" / "först sedan till sist" / "først så til sidst" / "bildeserie 3 bilder" (no, measured) / "ensin sitten lopuksi".

### F3: What Happens Next? (G1, `G1-400+ TBD`, CODE `answer:'choice'`)
**Move:** PREDICT: the first three panels are given IN ORDER; the child chooses the fourth.
**Child:** "Look at the three pictures in order. Circle the picture that comes next in each story." (en 87)
**Params:** d2 `{mode:'what-happens-next', stories:3, panels:3, order:'given', answer:'choice', choices:3, distractors:['earlier','other'], panelW:104}`. Line 1: panels ranks 1-3 + a dashed empty frame "?" (4 × 104 + 3 × 12 = 452); line 2: three choice panels (104 each, centred, circle targets). 3 stories × (78 + 10 + 78 + 22) ≈ 564 of 722 (*est.*). Choices = the story's **true rank 4** · its **`f3Earlier` panel** (rank 1 at d2: provably impossible next, it would reverse an irreversible change; the child's reason is "that already happened") · the **last panel of another story whose `objects` are disjoint** and which is not on the page. Never a later state than rank 4 (a skip would be a second right answer), never a repeat of rank 3 ("nothing happens" is arguable). Pool: 4- and 5-panel stories (12 / 11; 5-panel stories use ranks 1-4 of sub4).
**verify():** ordered panels ranks 1,2,3 in DOM order; each choice stamps `data-lcs-story` + `data-lcs-rank`; the gate re-derives the one answer = the choice with the row's story and rank 4, asserts exactly one, asserts the earlier choice's state is strictly dominated by rank 3's, the other-story choice shares no object, and the correct choice's position is a Latin row across the three stories (each of the 3 positions once).
**Refusals:** none.
**Query face:** "what happens next worksheet", "Was passiert als Nächstes?", "¿qué pasa después?", "o que acontece depois", "que se passe-t-il ensuite", "che cosa succede dopo" (distinct from animal-life-cycles it "Che cosa viene dopo?", m in selection), "wat gebeurt er daarna", "vad händer sedan", "hvad sker der så", "hva skjer etterpå", "mitä tapahtuu seuraavaksi".

### F4: Beginning, Middle, End (G1, `G1-400+ TBD`, CODE `show:'ends'`)
**Move:** PRODUCE the missing middle: story structure made visible by three labelled frames.
**Child:** "Look at the beginning and the end of each story. Draw what happens in the middle." (en 83)
**Params:** d2 `{mode:'beginning-middle-end', stories:2, panels:3, order:'given', show:'ends', answer:'draw', labels:'bme', panelW:190}`. Per story a row of three frames: rank 1 · an EMPTY drawing frame the same size (`data-lcs-draw`) · the story's LAST rank; the three locale labels (`bme`) above the frames (16 px Baloo). 2 × (24 + 150) + 40 ≈ 388 of 722; frames may grow (open drawing, generous). Pool: all 14 (3-panel stories are ideal: their rank 2 is exactly one event).
**verify():** open-ended, no answer; the gate asserts the two shown panels are rank 1 and rank n of the same story, the middle frame is empty and ≥ the panel size, labels = the bank's `bme` literals in order.
**Refusals:** none.
**Query face:** "beginning middle end worksheet" (re-probe listed), "Anfang Mitte Schluss", "inicio desarrollo y final", "início meio e fim", "début milieu fin", "inizio svolgimento conclusione", "begin midden eind", "början mitten slutet", "begyndelse midte slutning", "alku keskikohta loppu".

### F5: Sequencing Sentences (G1, `G1-400+ TBD`, CODE `answer:'line'`)
**Move:** READ: the story is told in 4 short sentences IN ORDER (each starts with its temporal word); the pictures are SCRAMBLED; the child draws a line from each sentence to its picture.
**Child:** "Read the sentences of each story. Draw a line from every sentence to the picture it tells about." (en 99)
**Params:** d2 `{mode:'sequencing-sentences', stories:2, panels:4, order:'scrambled', answer:'line', sentences:true, openers:4, panelW:108}`. Per story a `.ws-match` block: panels column (4 × 108 × 81) left, sentences column (≈ 380 px, 16 px Nunito, ≤ 2 lines each) right, match dots between. 2 × (4 × 81 + 3 × 8) + 28 ≈ 724: **over budget at 81; ship panels 104 × 78 → ≈ 700** (*est.*; the engineer confirms with the fi and de sentences). Pool: sentence pool 8.
**Why the sentences, not the pictures, are in order:** with pictures in order and sentences scrambled, the opener alone ("First…" ↔ picture 1) gives every line: a position tell. Ordered sentences + scrambled pictures make the child read the CONTENT to find each picture; the openers teach, the content decides (openers 2 and 3 are synonyms in every locale, so they carry no rank).
**verify():** sentences stamp `data-lcs-rank` 1..4 in DOM order; panels stamp rank; the gate re-derives each sentence's picture = the panel with the same rank, asserts every sentence starts with `openers4[rank-1]`, contains its own `stateWords[rank-1]` literal and none of the other three, and the picture column obeys the scramble law.
**Refusals:** none (sentences are literals; no agreement with a picture noun).
**Query face:** "sequencing sentences", "Sätze den Bildern zuordnen", "une cada oración con su viñeta", "ligue as frases às cenas", "relie chaque phrase à son image", "collega le frasi alle vignette", "zinnen bij de plaatjes", "para ihop meningarna med bilderna", "sæt sætningerne til billederne", "koble setningene til bildene", "yhdistä lauseet kuviin".

### F6: Retell the Story with Starters (G2, `G2-378+ TBD`, CODE `answer:'write'`)
**Move:** WRITE the narrative: four panels IN ORDER, each with two school-line rows; row 1 begins with a printed starter; a small word bank ("Worthilfen") of the story's words sits above.
**Child:** "Look at the four pictures. Write what happens in each one. Start with the word on the line." (en 90)
**Params:** d2 `{mode:'retell-with-starters', stories:1, panels:4, order:'given', answer:'write', rows:2, starters:4, helpWords:true, panelW:130}`. Word bank (`wordBank`, 59 px + 10) · 4 blocks: panel 130 × 98 left + `rulingBlock({rows:2, w:490, h:48, glyphH:24, starters:{0:starters4[i]}})` right. Stack ≈ 69 + 4 × 110 + 3 × 16 = 557 of 722 (*est.*). Starters are sized by `starterFontPx` from the MEASURED metrics (discovered by `verify-ruling-starters.js` via `build()`). Pool: sentence pool 8 (help words authored for those).
**verify():** open-ended, no answer; the gate asserts ranks 1..4 in DOM order, each block's starter text = `starters4[rank-1]` verbatim, the bank = the story's `helpWords` (4-6), rows empty, starter px from the measured metrics.
**Refusals:** none.
**Query face:** the writing genre: "retell a story worksheet", **"Bildergeschichte schreiben mit Worthilfen"** (the de Klasse 2 lead), "secuencia de imágenes para crear cuentos", "produção de texto a partir de sequência de imagens" (never "com imagem": picture-writing owns it, m), "images séquentielles production d'écrit", "sequenze temporali per scrivere una storia", "vertel het verhaal na", "bildserie att skriva till" (never "skriv till bilden"), "billedserie skriv historien", "skriv til bildeserien", "kuvasarja tarinan kirjoittamiseen" (elative, never "kuvasta kirjoittaminen").

**Distinctness (resolved d2 configs):** base `{panels:4, order:scrambled, answer:numeral}` · F2 `{panels:3, answer:chip, words:3}` · F3 `{stories:3, order:given, answer:choice}` · F4 `{show:ends, answer:draw}` · F5 `{answer:line, sentences:true}` · F6 `{stories:1, answer:write, starters:4, helpWords:true}`: pairwise different on `answer` alone. Guards key on `d.answer` / `d.show`, never on the level index.

**Rejected non-moves.** Cut-and-glue cards (same ORDER move, a print format: say it in the base landing) · 6-panel CE1 / 3-step vs 4-step pages (a count, not a move) · colour-and-order (colouring adds no move) · Märchen / classic-tale sequencing (no tale art, versions differ by country) · an oral-retell face (no page difference from F4/F6; the landing prose covers it).

## C. Native rebuild ×11

**Temporal-word literals (panel confirms each; the code never builds or inflects them).** `words3` = F2 chips; `openers4` = F5 sentence openers (1st word of each sentence, punctuation included); `starters4` = F6 line starters; `bme` = F4 frame labels.

| loc | words3 (F2) | openers4 (F5) | starters4 (F6) | bme (F4) |
|---|---|---|---|---|
| en | First · Next · Last | First, · Next, · Then, · Last, | First, · Next, · Then, · Finally, | Beginning · Middle · End |
| de | Zuerst · Dann · Zum Schluss | Zuerst · Dann · Danach · Zum Schluss | Zuerst · Dann · Danach · Zum Schluss | Anfang · Mitte · Schluss |
| es | Primero · Después · Al final | Primero, · Después, · Luego, · Al final, | Primero, · Después, · Luego, · Al final, | Inicio · Desarrollo · Final (panel: "Principio · Medio · Final") |
| pt | Primeiro · Depois · Por fim | Primeiro, · Depois, · Em seguida, · Por fim, | same | Início · Meio · Fim |
| fr | D'abord · Ensuite · Enfin | D'abord, · Ensuite, · Puis, · Enfin, | same | Début · Milieu · Fin |
| it | Prima · Dopo · Infine (measured verbatim) | Prima · Poi · Dopo · Infine | Prima · Poi · Dopo · Infine | Inizio · Svolgimento · Conclusione (panel: "Parte centrale") |
| nl | Eerst · Dan · Tot slot | Eerst · Dan · Daarna · Tot slot | same | Begin · Midden · Eind |
| sv | Först · Sedan · Till sist | Först · Sedan · Efter det · Till sist | same | Början · Mitten · Slutet |
| da | Først · Så · Til sidst | Først · Så · Bagefter · Til sidst | same | Begyndelse · Midte · Slutning |
| no | Først · Så · Til slutt | Først · Så · Etterpå · Til slutt | same | Begynnelse · Midt · Slutt (panel: "Start") |
| fi | Ensin · Sitten · Lopuksi | Ensin · Sitten · Seuraavaksi · Lopuksi | same | Alku · Keskikohta · Loppu |

| loc | literals the panel authors (per locale) | slots / forms (where they exist) | refusal / re-target | traps |
|---|---|---|---|---|
| all | `words3` 3 · `openers4` 4 · `starters4` 4 · `bme` 3 · `strings` 12 (title + instruction ×6) · `sentences` 32 (8 stories × 4) · `stateWords` 32 · `helpWords` 32-48 (8 × 4-6) = **≈ 125-140 literals** | **no `objForms` needed**: story nouns are panel literals, the library vocab is not used (0 pictures). No `{name}` (stories carry no people except the faceless walker; sentences use object subjects or passives). | none per face; `snowman` excluded by default in es/pt (climate, a data decision) | sentences name the DISCRIMINATING state (count, "half", "only the core"), never a generic action that fits two panels |
| en | as above | none | none | F6 "Finally" (grade-2 register, measured "first next then finally … grade 2"), F5/F2 "Last" (K-1, measured "first next then last … kindergarten") |
| de | as above; `helpWords` with article (der Apfel, die Schale) | none | none | **V2:** every starter/opener is the prefield, so the finite verb comes next ("Zuerst ist der Apfel ganz."); "Zum Schluss" is one prefield unit; nouns capitalised; never "Reihenfolge" in a title |
| es (MX) | as above | none | snowman off | comma after each opener; "Después"/"Luego" are synonyms (content decides rank 2 vs 3); "ficha" never in a title; "secuencia" alone = maths in MX |
| pt (BR) | as above | none | snowman off | never "sequência lógica" in a title (patterns); "produção de texto com imagem" is picture-writing's; "Em seguida" is two words |
| fr | as above | none | none | elision "D'abord"; comma after openers; "Remettre dans l'ordre" alone is word-scramble's (m in selection) |
| it | as above | none | none | "Prima" as a sentence opener means "first" (natural in K-2); "Sequenze" alone = patterns/science-sequence |
| nl | as above | none | none | V2 ("Eerst is de appel heel."); de/het in helpWords (de appel, het papier); IJ capital pair if a word starts with ij; never bare "volgorde" |
| sv | as above; definite forms written out (äpplet, bananen, smörgåsen, tårtan, staketet, brevet) | none | none | V2 after "Efter det"; ⚠ `banan` (banana) is ALSO the definite of `bana` (track): the banana story's sentences must read unambiguously as fruit (the picture disambiguates; the panel confirms); never "i rätt ordning" as a title head |
| da | as above; definite forms (æblet, bananen, kagen, hegnet) | none | none | V2 ("Først er æblet helt."); "læg billederne i rækkefølge" is a live plants title (m in selection) |
| no | bokmål; definite forms (eplet, bananen, kaka/kaken: panel picks one register) | none | none | V2; "Etterpå" vs "Deretter" (panel); no Nordic +1 shift in levels |
| fi | as above | none | none | starters are adverbs and govern no case, so any child clause follows ✔; sentences write every case out ("Aidasta on maalattu kaksi lautaa": numeral + partitive singular); title case: nominative "kuvasarja", elative "kuvasarjasta" (F6), illative "järjestykseen" |

## D. Data + gates

```js
// data/b6/stories.js (locale-free)
module.exports = { stories: [{
  id: 'apple', setting: 'table', view: 'side', objects: ['apple', 'plate'],
  tags: ['eating'], climate: null, excludeLocales: [],
  panels: [ { rank: 1, state: { bites: 0 }, draw: [ /* primitive ops */ ] }, /* … */ ],
  sub3: [1, 3, 4], sub4: [1, 2, 3, 4], f3Earlier: 1, minDetail: 7,
  pools: ['base', 'first-next-last', 'what-happens-next', 'beginning-middle-end', 'sequencing-sentences', 'retell-with-starters'],
}], IRREVERSIBLE: ['bites','peeled','eaten','spread','cut','crumbs','halvesGone','candleMarks','slicesGone','lines','fills','painted','drips','tracks','marks','stamped','posted','wrapped','torn','links','glued','punctured','patched','footprints','squares','chalkUsed'],
  EXCLUDED_TAGS: ['growth','hatch','melt','weather-cycle','cooking-heat','hygiene','road-safety','procedure','halloween','thanksgiving','christmas','easter','face','emotion'] };

// data/b6/locales/story-sequencing.<loc>.json
{ "words3": [..3], "openers4": [..4], "starters4": [..4], "bme": [..3],
  "strings": { "<mode>": { "title": "", "instruction": "" } },   // x6, mirrored into i18n/strings.<loc>.json (parity gate)
  "stories": { "apple": { "sentences": [..4], "stateWords": [..4], "helpWords": [..4-6] } } }  // sentence pool only
```
Reuses nothing from `data/b3` (no picture nouns). The b5 lesson applies: a string lives in the bank AND `i18n/strings.<loc>.json`; `tools/check-b6-string-parity.js` must be 0.

**Validator rules (`tools/validate-b6-draft.js`, story-sequencing block):**
1. every panel `state` has the same keys; every key is in `IRREVERSIBLE`.
2. **strict chain:** for consecutive panels, no variable decreases and at least one strictly increases.
3. no two panels of one story have equal state vectors.
4. `sub3`/`sub4` are strictly increasing rank lists that start at 1 and end at the story's last rank; 3-panel-only stories have no `sub4`.
5. `f3Earlier` ∈ {1, 2} and < 3; present only for stories with ≥ 4 panels.
6. `tags` ∩ `EXCLUDED_TAGS` = ∅; no draw op of kind `eye|mouth|face|text|numeral`.
7. conservation where declared (`paper-chain`: links + strips = 5; `collage-fish`: glued + loose = 6).
8. story ids unique; `objects` non-empty; every story in ≥ 1 pool; each face pool ≥ 3 stories per locale after `excludeLocales`.
9. locale: `words3` 3 / `openers4` 4 / `starters4` 4 / `bme` 3 distinct non-empty literals; no `{…}` slot in any.
10. locale sentences: exactly `len(sub4)` per sentence-pool story; sentence k starts with `openers4[k]`; `stateWords[k]` is a substring of sentence k and of NO other sentence of that story.
11. `helpWords` 4-6 per sentence-pool story.
12. no visible "free / gratis / grátis / gratuit / gratuito / kostenlos / ilmainen / gratis" in any string (visible surfaces).
13. titles ≤ 70 chars, carry the locale's STORY word (per-locale regex list from `_PANEL-FINDINGS` row 1), never a bare order word (`Sequencing|Reihenfolge|volgorde|sequência lógica|Sequenze` alone).

**Poison cases (each must FAIL; the correct draft is the control and must PASS):**
1. `apple` P3 state `{bites:1}` (equals P2) → rule 3.
2. a `tower` story `{blocks:[1,3,5]}` (`blocks` not irreversible) → rule 1.
3. `sandwich` crumbs `[0,0,0,4,2]` → rule 2.
4. a story tagged `melt` → rule 6.
5. a `snowman` draw op `{kind:'eye'}` → rule 6.
6. `sub3:[2,3,4]` (does not start at 1) → rule 4.
7. `f3Earlier: 3` → rule 5.
8. de sentence 2 starting "Danach" (opener 3) → rule 10.
9. en `stateWords[1] = "bite"` while sentence 3 also contains "bites" → rule 10.
10. fi `words3` with a duplicated "Sitten" → rule 9.
11. a starter `"{first},"` → rule 9.
12. fr title "Remettre dans l'ordre" (no story word) → rule 13.
13. es instruction containing "gratis" → rule 12.
14. `paper-chain` P3 with 2 links + 2 strips → rule 7.

**`qa/verify-b6-story-sequencing.js` asserts on the render, per face × locale:** body ≤ 722 (the three-line title / three-line instruction stack) and no overflow; panel px width ≥ band floor (K 140 · G1 104 · G2 96) and `minDetailPx ≥ 5`; **no `<text>` inside any `[data-lcs-story-panel]`**; palette = tokens (+ `codeYellow` inside story panels only); every numeral box empty with `data-lcs-answer=""`; no chip / choice pre-marked, no match line drawn; the scramble law at 400 pooled seeds (rank-1 slot share ≤ 40 %; F3 correct-choice slot ≤ 40 %); one answer per closed item re-derived from `data-lcs-story` + `data-lcs-rank`; F5 opener + stateWord checks on the RENDERED text; F6 starters discovered by `verify-ruling-starters.js`. Plus `qa/verify-b6-story-panel.js` (primitive): renders every story × rank at the K and G2 floors, measures `minDetailPx` and the outline stroke, poison: a 5 px-wide panel must throw.

## E. SEO

Engine appends the worksheet word; no title carries it; no "free" anywhere visible. Proposed per-locale titles (panels finalise; ≤ 70; every one carries the story word):

| face | en | de | nl | es | pt | fr | it | sv | da | no | fi |
|---|---|---|---|---|---|---|---|---|---|---|---|
| base | Story Sequencing: Number the Pictures | Bildergeschichte ordnen: Bilder nummerieren | Verhaal op volgorde: plaatjes nummeren | Secuencias temporales de un cuento: numera las viñetas | Sequência de fatos: numere as cenas | Images séquentielles : remets l'histoire dans l'ordre | Storie in sequenza: numera le vignette | Bildserie: numrera bilderna | Billedserie: nummerér billederne | Bildeserie: nummerer bildene | Kuvasarja: numeroi kuvat järjestykseen |
| F2 | Story Sequencing: First, Next, Last | Bildergeschichte: zuerst, dann, zum Schluss | Verhaal op volgorde: eerst, dan, tot slot | Secuencia de un cuento: primero, después, al final | Sequência de fatos: primeiro, depois, por fim | Images séquentielles : d'abord, ensuite, enfin | Storie in sequenza: prima, dopo, infine | Bildserie med 3 bilder: först, sedan, till sist | Billedserie: først, så, til sidst | Bildeserie med 3 bilder: først, så, til slutt | Kuvasarja: ensin, sitten, lopuksi |
| F3 | Story Sequencing: What Happens Next? | Bildergeschichte: Was passiert als Nächstes? | Verhaal op volgorde: wat gebeurt er daarna? | Secuencia de un cuento: ¿qué pasa después? | Sequência de fatos: o que acontece depois? | Images séquentielles : que se passe-t-il ensuite ? | Storie in sequenza: che cosa succede dopo? | Bildserie: vad händer sedan? | Billedserie: hvad sker der så? | Bildeserie: hva skjer etterpå? | Kuvasarja: mitä tapahtuu seuraavaksi? |
| F4 | Beginning, Middle, End: Draw the Story's Middle | Bildergeschichte: Anfang, Mitte, Schluss | Verhaal: begin, midden en eind | Inicio, desarrollo y final de un cuento | Início, meio e fim da história | Début, milieu, fin d'une histoire | Storie in sequenza: inizio, svolgimento, conclusione | Bildserie: början, mitten och slutet | Billedserie: begyndelse, midte og slutning | Bildeserie: begynnelse, midt og slutt | Kuvasarja: alku, keskikohta ja loppu |
| F5 | Story Sequencing Sentences: Match the Pictures | Bildergeschichte: Sätze den Bildern zuordnen | Verhaal op volgorde: zinnen bij de plaatjes | Secuencia de un cuento: une las oraciones y las viñetas | Sequência de fatos: ligue as frases às cenas | Images séquentielles : relie les phrases aux images | Storie in sequenza: collega le frasi alle vignette | Bildserie: para ihop meningar och bilder | Billedserie: sæt sætninger til billederne | Bildeserie: koble setningene til bildene | Kuvasarja: yhdistä lauseet kuviin |
| F6 | Retell the Story: First, Next, Then, Finally | Bildergeschichte schreiben mit Worthilfen | Vertel het verhaal na bij de plaatjes | Secuencia de imágenes para escribir un cuento | Produção de texto a partir de sequência de imagens | Images séquentielles et production d'écrit | Sequenze temporali per scrivere una storia | Bildserie att skriva till | Billedserie: skriv historien | Skriv til bildeserien | Kuvasarja tarinan kirjoittamiseen |

Group patterns: **Germanic** `{HEAD}{: face element}` (de head = the feminine noun, F6 = the verb phrase "… schreiben mit Worthilfen"); **Romance** `{HEAD de un cuento / de fatos}{: face element}` (the story word is load-bearing: pt "fatos", es "cuento", fr "images séquentielles", it "storie"); **Nordic** `{Bildserie|Billedserie|Bildeserie}{: face element}` (sv/no "med 3 bilder" on F2 = the measured "bildeserie 3 bilder"); **fi** `Kuvasarja{: …}` with the case the phrase needs (F6 genitive-free "tarinan kirjoittamiseen").

**Meta MIDDLEs** (= the face's instruction; the MIDDLE is the longest candidate in 120-170 whole, per doctrine 8): base "Look at what changes in each picture. Write 1, 2, 3 and 4 in the boxes to put each story in order." · F2 "Look at the three pictures of each story. Circle First, Next or Last under every picture." · F3 "Look at the three pictures in order. Circle the picture that comes next in each story." · F4 "Look at the beginning and the end of each story. Draw what happens in the middle." · F5 "Read the sentences of each story. Draw a line from every sentence to the picture it tells about." · F6 "Look at the four pictures. Write what happens in each one. Start with the word on the line." No meta mentions an answer key (printable decks ship none).

**Coordinates:** `{type:'story-sequencing', mode, level: LEVEL_KEYS[loc][band], theme:''}` with mode/band: `base`/K · `first-next-last`/K · `what-happens-next`/G1 · `beginning-middle-end`/G1 · `sequencing-sentences`/G1 · `retell-with-starters`/G2 (level keys m: en kindergarten/grade-1/grade-2, de vorschule/1-klasse/2-klasse, es preescolar/primer-grado/segundo-grado, fr maternelle/cp/ce1, pt educacao-infantil/1o-ano/2o-ano, it infanzia/classe-prima/classe-seconda, nl kleuters/groep-3/groep-4, sv forskola/ak-1/ak-2, da boernehaveklasse/1-klasse/2-klasse, no 1-trinn/2-trinn/3-trinn, fi esikoulu/1-luokka/2-luokka).

**Non-cannibalisation (whole-landing word-3-gram Jaccard, *est.*):** base↔F2 0.20 (numerals vs temporal words; K both) · F2↔F6 0.15 (both temporal words; K chips vs G2 writing) · F3↔base 0.12 · F4↔F6 0.12 · F5↔F6 0.18 (both sentences; reading vs writing) · base↔K-374 0.06 (procedure vocabulary) · base↔G1-203 0.05 · F3↔animal-life-cycles "what comes next" 0.08 · F6↔picture-writing G2-278 0.10 · F2↔read-and-do G1-340 0.05 · F5↔reading-comprehension G2-254 0.08. Highest-risk pair = F5↔F6: keep F5 prose on READING + MATCHING, F6 on WRITING + word bank.

## F. Open questions + summary

**Engineer must measure:** (1) the palette allow-list for `codeYellow` inside `[data-lcs-story-panel]` (banana, cheese, sun) or a creamDeep substitute; (2) every story's `minDetailPx` at the K floor 140 px and G1 104 px (bite scallop, crumb, footprint, hole), and whether 104 × 78 F5 panels keep the sandwich crumbs ≥ 5 px; (3) the F2 chip rows at 15-16 px in all 11 locales inside 190 px (es and de longest); (4) F5 sentence wrap (≤ 2 lines in ≈ 380 px) for de and fi, and the F5 stack (≈ 700 *est.*); (5) the pooled scramble statistics at 400 seeds; (6) that the walker glyph embeds in the 160 × 120 panel at 44 units without the road-pictogram gate's min size throwing.

**Only a native panel can rule:** the snow exclusion in es-MX / pt-BR (lift or keep); es and it `bme` labels (SEP "inicio, desarrollo, cierre" vs child "principio, medio, final"; it "svolgimento" vs "parte centrale"); en F6 "Finally" vs "Last"; sv "Efter det" vs "Därefter", da "Bagefter" vs "Derefter", no "Etterpå" vs "Deretter"; sv `banan`/`bana` in the banana sentences; the de F6 title's honesty ("mit Worthilfen" = the word bank is present, so yes; panel confirms the Klasse 2 register); nl head after the re-probe ("verhaal op volgorde" vs "volgordeplaatjes"); mailbox legibility in each country (teal generic box); every sentence and stateWord (the "no sentence fits two pictures" read is human).

**Summary.** One rule carries the family: order = a strict chain of IRREVERSIBLE visible changes, proven by the validator on the bank's state vectors, so no story can have a second legal order (this is why tower, balloon, sandcastle, spill and the blown-out cake panel are dropped). 14 drawn stories (12 four-/five-panel, 2 three-panel), 0 library pictures, no faces, no text in panels. Six faces differ on `answer` (numeral · chip · choice · draw · line · write); F5 puts the SENTENCES in order and scrambles the pictures to remove the opener tell; F3 distractors are an already-happened panel (provably impossible) plus an unrelated story's ending. No refusals; es/pt default-exclude the snowman.
