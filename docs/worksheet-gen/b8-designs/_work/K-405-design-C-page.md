# K-405 `maze-puzzles` DESIGNER C: PAGE, SCREEN AND KEY (2026-10-11)

Inputs read: `_STUDIO-BRIEF.md`, `_SUBSTRATE.md`, `_PANEL-FINDINGS.md`, `_ROLES.md`, `_work/K-405-pedagogy.md` (F19 = running-total maze within 100; label faces on looped graphs, P1), `_work/K-405-design-A-scenes.md`, `_work/K-405-lead-notes.md` (letterforms from `data/tracing/letter-strokes.js`; written boxes are paper-only, the screen checks the route), `page/page.css`, `page/shell.js`, `emit/interactive-runtime.js` (state colours, `.lcs-btn`, celebration card), `../b7-designs/METHOD-find-the-differences.md` §1 §9 §10, prototypes `%TEMP%\hm\proto\o4.png`, `s5.png`, `trace-runtime.html`, b7 renders `out/b7-sweep/de/K-395-null-d2-de{,.screen}.png`. Samples opened: 172004, 172053, 173307, 173421, 175900, 175921, 180050. `_work/K-405-design-B-topology.md` did not exist when this was written: every topology number below that B owns is quoted from the pedagogy file and marked "(B)".

Measured / quoted facts this file builds on:
- Page inner 675 px; body 766 px at ordinary chrome, **733 px at the tallest shipped chrome** (2-line title + 3-line instruction, b7 `qa/b7-body-measure.js`).
- House state colours in `interactive-runtime.js`: right `#2E9E5B`, wrong `#D64545`, focus `#4E5FE8`, buttons `.lcs-btn` teal `#146B5E`, min-height 48 css px; celebration card `#lcs-celebration` exists; existing chrome strings `runtimeCheckAnswers`, `runtimeTryAgain`, `runtimeYouDidIt`, `runtimeAllCorrect`, `runtimePrintMyWorksheet`.
- The screen runtime scales the page crop (~735 page px) to the viewport: at 360 css px 1 page px = 0.49 css px, so 44 css px = 90 page px (b7 robot finding).
- The prototype runtime draws ink in a `viewBox="0 0 100 100" preserveAspectRatio="none"` SVG with `stroke-width 1.1`: the stroke is ANISOTROPIC (wider horizontally on a tall stage). Fixed below.
- Samples: every one is a single full-bleed picture; markers are a red entry arrow (173307, 173421), the words START / FINISH (180050), or numbered discs (175900). None has a legend strip or an answer box.

---

## 1 The page system (one system, four templates)

### 1.1 Stack budget
- Fixed stack **716 px** on every face (620 ≤ 716 ≤ 740). 716 / 733 = 97.7 % at the tallest chrome (17 px slack for a fr/fi instruction that wraps one line more than en); 716 / 766 = 93.5 % at ordinary chrome. Both ≥ 85 % (`qa/b7-page-use.js`).
- Width 675 = `.ws-page` inner. Nothing is wider than 675.
- A title that needs 3 lines overflows: the panel shortens it (b7 rule). The 2-line title + 3-line instruction is the design case.

### 1.2 The scene frame (every face)
- One SVG, `viewBox 0 0 675 H` (H per template), rounded rect radius 18, its background painted edge to edge, stroke 3 px teal `#146B5E` (house frame; b7 frames are 3 px dark). Face 20 (B&W): stroke 3 px ink `#3A3530`.
- **Maze field** = frame inset 16 px each side: 643 × (H − 32). Corridors, stones and islands live in the field; only the hero, the goal and their markers may overlap the 16 px rim (sprite overlap of the frame ≤ 40 %, scene file §0.4).
- Clip: everything inside the frame is clipped to the rounded rect (`clipPath`), except the start disc and the goal flag, which are drawn on top unclipped so a corner mouth never halves a marker (b7 trap: a key ring clipped by the panel).

### 1.3 Templates
```
T1 FULL SCENE (faces 1 2 3 4 5 7 11 12 14 15 16 17 19 20)
y=0   +---------------------------------------------------+  675 wide
      | frame 675 x 716 (field 643 x 684 at inset 16)      |
      |  [start disc + hero]  ... corridors ...  [goal+flag]|
y=716 +---------------------------------------------------+
stack = 716

T2 SCENE + STRIP (faces 6 9 10 18)
y=0   +---------------------------------------------------+
      | frame 675 x 640 (field 643 x 608)                  |
y=640 +---------------------------------------------------+
      gap 12
y=652 +---------------------------------------------------+
      | strip 675 x 64 (cream #FBF3E4, 2 px #F0E4CB, r 14) |
y=716 +---------------------------------------------------+
stack = 640 + 12 + 64 = 716

T3 MULTI-ROUTE (faces 7 8): T1 frame, starts in a row along one edge, goals in a row along
   the opposite edge, all INSIDE the frame (no strip; 8 carries its boxes in the goal row)
T4 HOP GRID (face 13): T1 frame, hex grid centred in the field, hero + goal outside the grid
```
Why the strip is at the BOTTOM: the child reads the instruction, then the picture, and the legend is consulted while drawing (eye returns to it); a top strip would push the start mouth (often top or left) further from the instruction. The strip never holds a word.

### 1.4 Start and goal markers (language-free apparatus, no START / FINISH words)
| marker | paper (d2) | why |
|---|---|---|
| start disc | teal `#146B5E` disc Ø 44 (PreK face 2: Ø 56), white play-triangle 18 px pointing INTO the corridor mouth along the first chain's tangent; centred on the route's start node at the mouth | a 44 px target where the pencil starts; the triangle says "go this way" without a word; it IS the screen's first tip |
| start sprite | the hero, `h` per scene file, placed outside the mouth, its nearest edge ≥ 6 px from the disc | the story frame (brief Rule 4) |
| goal flag | pole 3 × 46 px `#8A8276`, coral `#F2784B` pennant 30 × 22 px, planted on the goal node; a dashed coral ring Ø 52 (2.5 px, 6 on / 4 off) round the goal node | a flag means "here" in every culture; the ring is the target the child's line must reach |
| goal sprite | per scene file, beside the flag, outside the field where possible | |
| multi-start (7, 8) | start discs carry a white Baloo 2 numeral 1..k (26 px) instead of the triangle; goals carry a flag each, unnumbered | numbers name the routes for the teacher and the key; they do not give the answer (goal order is a derangement, pedagogy F7/F8) |
| face 20 (B&W) | disc and pennant drawn as 2.5 px ink OUTLINES (colourable), triangle outline | the whole page is a colouring page |
| face 11 (dark sky) | start disc gets a 3 px white halo | contrast on `#6E7CB8` |

Placement rules (gate assertions): disc and flag never overlap a corridor other than their own mouth chain; disc-to-hero clearance ≥ 6 px; flag pennant fully inside the page box; the first 40 px of the route from the disc is not shared with any dead end (the child must not choose before leaving the disc).

### 1.5 Label stones (faces 11 12 14 15 16 17 19; pictures on face 18)
| face | shape | size (page px) | glyph | font / source | count at d2 |
|---|---|---|---|---|---|
| 11 ABC caps | disc | Ø 56 | cap height 30 | `letter-strokes.js` `textGlyphs`, solid round-capped stroke 4.5 px ink `#3A3530` | route 21/26/27/29 + decoys 0.6× (en 26 + 16 = 42) |
| 12 abc lower | disc | Ø 56 | x-height 22, ascender 30 | same (single-storey a, g); fr: `LCS Cursive fr-moderne` 34 px | as 11 |
| 14 1..20 | disc | Ø 56 | 30 | Baloo 2 700 | 20 + 12 = 32 |
| 15 by 5s | pill | 64 × 48 | 26 | Baloo 2 700 | 20 + 12 = 32 |
| 16 make 10 | pill | 96 × 52 | 28 | Baloo 2 700, `+` with thin spaces | 10 + 12 = 22 |
| 17 subtract | pill | 104 × 52 | 28 | Baloo 2 700, minus U+2212 | 10 + 12 = 22 |
| 19 ops | pill 68 × 44 + total circle Ø 38 dashed | 26 / blank | Baloo 2 700 | route 6 ops + decoys ~8 (B) |
| 18 sounds | card disc | Ø 72, picture 56 inside | none | library picture on cream `#FFF9EF` disc | route 8-10 + 14 decoys |

Stone paint: fill `#FFFFFF`, edge 2.5 px teal `#146B5E`; route and decoy stones IDENTICAL in every attribute (gate: one style object). Stones sit centred on the corridor centreline and may overhang the lane (lane 44 vs stone 56: 6 px each side), so the stone reads as a stepping stone, like the samples' letters in the lane.
Placement (gate): stone centre ≥ 0.6 × stone width from any junction node (a stone never hides the fork); after a route junction, every leaving branch carries its first stone within 1.5 stone widths of the junction (the child reads the next label AT the decision, pedagogy P1); stone-to-stone clearance ≥ 8 px; route chain spacing ≥ 72 px centre to centre (Ø 56 + 16); stones never rotated (upright glyphs: d/p trap, pedagogy F12).
Fill density check, face 11 (largest): 29 + 17 = 46 discs × π × 28² = 113,300 px² over the field 643 × 684 = 439,800 px² = 25.8 % (*est.* fits; B confirms the 29-node route geometry).

### 1.6 Strips (T2 faces), 675 × 64, cream `#FBF3E4`, border 2 px `#F0E4CB`, radius 14, content centred, gap 18
| face | strip content (left to right) |
|---|---|
| 6 shortest way | a street-block glyph (2 rounded squares 22 px `#BFDB98` joined by a 10 px grey road `#E4E2DE` with 3 tick marks) · `=` Baloo 2 30 px teal · answer box 56 × 56 `.ws-answerbox` (2 px dashed `#C8BFAE`, r 10) |
| 9 collect | the item picture 52 px (on a white disc Ø 56) · numeral "4" Baloo 2 30 px teal · 4 tick circles Ø 30, 2.5 px teal, spaced 10 (the child ticks one per item picked up: self-monitoring of the subgoals) |
| 10 avoid | each obstacle kind once (walrus 52 px; thin-ice hole drawn 48 × 28) inside a "not" ring: coral circle Ø 60, 4 px, diagonal bar 4 px top-left to bottom-right OVER the picture at 70 % opacity so the picture stays nameable |
| 18 first sound | the hero card (lion picture 56 on a cream disc Ø 64, edge 3 px teal) · a mouth-and-sound glyph (3 nested arcs 4 px teal, 28 px) · letter chip 56 × 56 white, teal edge, carrying the locale's "L l" in `letter-strokes` (caps 26 / lower 20) |

Face 18 letter chip: the cards carry no text, so the chip cannot be matched against them; it supports the sound without replacing it. The panel may drop it per locale (a recorded choice, not a refusal).

### 1.7 Answer boxes (paper only; the screen hides them, lead note 7)
| face | box | where | count |
|---|---|---|---|
| 6 | 56 × 56 dashed (G1 element floor 44, numeral 26 written by the child) | strip | 1 |
| 8 | 48 × 48 dashed white, numeral written | directly under each goal (kite), centre-aligned, 8 px gap | 4 |
| 19 | total circles Ø 38, 2 px dashed teal | beside each op pill, 6 px gap, on the side away from the corridor | 1 per op stone |
All carry `data-lcs-paper-only` so the screen render drops them and the key fills them in coral.

### 1.8 Fonts and floors (substrate floors applied)
- Baloo 2 700 for numerals and stone text; letters via `letter-strokes.js` (lead note 3); Nunito only in the shell chrome. No text on the apparatus below 22 px; nothing below 9 px anywhere.
- Band floors (element / glyph): K 56 / 30; G1 44 / 26; G2 36 / 22. Every stone, disc, box and strip glyph above meets its face's band floor (table 1.5, 1.7).
- Lane floors (pedagogy P3): PreK 72, K 44, G1 36, G2 32 page px. Library art on islands 44-80 px; anything the child must recognise ≥ 56 px.

### 1.9 Print legibility (greyscale + ink)
Rules the engineer gates on the rendered PNG (grey = luminance L in 0..1):
1. Corridor fill L ≥ 0.88 (pencil graphite stays visible).
2. Corridor fill vs the field background: ΔL ≥ 0.10.
3. Corridor edge stroke vs corridor fill: ΔL ≥ 0.25 (a mono laser print shows the walls).
4. Mean ink of the body, mean(1 − L) over the frame: ≤ 0.30 (*est.* target; b7 line art is ~0.08; the samples are ~0.25-0.35 *est.*). Measured per face, the face fails above 0.30.
5. Stone glyph contrast: ink `#3A3530` on white, L 0.22 vs 1.0, always passes.
Faces at risk (from scene file hexes, *est.* L): face 3 field `#6FAF66` (L ≈ 0.60) → use the scene file's lift `#86BE77`; face 11 sky `#3E4C86` (L ≈ 0.31) → print-tone `#6E7CB8` / `#8794C6` (the scene file's fallback) is the SHIPPED value, never the dark one; face 1 corridor edge `#D7B977` vs fill `#FFF5DC` ΔL ≈ 0.22 (< 0.25) → edge `#C8A45C` (*est.*; engineer measures and darkens by 6 % steps until ΔL ≥ 0.25); face 10 field `#CFE3EF` vs white fill ΔL ≈ 0.11 (passes rule 2 by a hair; the edge `#8FB3CB` carries it).

---

## 2 The twenty faces at d2

Common: stack 716; template per row; lane W and route numbers from the pedagogy file (B owns the final topology). "Field" = the drawable area after the 16 px inset.

| # | face | tmpl | frame | field | lane W | start → goal (frame position) | labels / extras | strip / boxes |
|---|---|---|---|---|---|---|---|---|
| 1 | BASE hedgehog → apple tree | T1 | 675 × 716 | 643 × 684 | 44 | BL → TR | none | none |
| 2 | my first maze puppy → ball | T1 | 675 × 716 | 643 × 684 | 72 | L-mid → R-mid | start disc Ø 56; 2 dead ends | none |
| 3 | big maze orangutan → banana tree | T1 | 675 × 716 | 643 × 684 | 36 | BL → TR | none (56 nodes, B) | none |
| 4 | river boat → teddy on dock | T1 | 675 × 716 | 643 × 684 | 52 | TL → BR | dock 120 × 46 at the goal mouth | none |
| 5 | burrow ant → ant family | T1 | 675 × 716 | 643 × 684 (sky 10 % = top 68 px, grass line at y 84) | 40 | surface TL → deep chamber BR | 3 soil levels at y 84-292 / 292-500 / 500-700 *est.* | none |
| 6 | town, shortest way | T2 | 675 × 640 | 643 × 608 | 40 | L → R | block lattice 5 × 4 (B) | strip: block glyph = box |
| 7 | babies to mothers | T3 | 675 × 716 | 643 × 684 | 44 | 3 babies top row → 3 mothers bottom row | numbered discs 1-3 | none |
| 8 | tangled strings | T3 | 675 × 716 | 643 × 684 | strings 14 | 4 holders bottom → 4 kites top | numbered discs 1-4 | 4 boxes under the kites |
| 9 | collect, rabbit → bucket | T2 | 675 × 640 | 643 × 608 | 40 | BL → TR | 4 items on cycle edges, picture 52 on a white disc Ø 56 IN the corridor | strip: item · 4 · ○○○○ |
| 10 | avoid, polar bear → igloo | T2 | 675 × 640 | 643 × 608 | 40 | L → R | 2 walrus + 2 holes on corridors | strip: not-walrus, not-hole |
| 11 | ABC rocket → moon | T1 | 675 × 716 | 643 × 684 | 44 | BL → TC (scene file §21) | caps discs Ø 56 | none |
| 12 | abc clownfish → coral | T1 | 675 × 716 | 643 × 684 | 44 | TL → BR | lower discs Ø 56 | none |
| 13 | letter hop bear → honey | T4 | 675 × 716 | grid 520 × 437 centred at y 140-577 *est.* | n/a | bear BL beside the run's first cell, honey TR | 36 hex cells | none |
| 14 | number train → cabin | T1 | 675 × 716 | 643 × 684 | 44 | BL → TR | discs Ø 56, 1-20 | none |
| 15 | skip count balloon → rainbow | T1 | 675 × 716 | 643 × 684 | 32 (G2) | BC → TR (scene file §21) | pills 64 × 48 | none |
| 16 | make 10 giraffe → baobab | T1 | 675 × 716 | 643 × 684 | 36 | BL → TR | pills 96 × 52; rule badge "10" | none |
| 17 | subtract gingerbread → cake | T1 | 675 × 716 | 643 × 684 | 36 | BL → TR | pills 104 × 52; rule badge = target | none |
| 18 | first sound lion → basket | T2 | 675 × 640 | 643 × 608 | 44 | BL → TR | picture cards Ø 72 | strip: lion · sound · L l |
| 19 | running total bulldozer → dump truck | T1 | 675 × 716 | 643 × 684 | 32 (G2) | L → R | op pills 68 × 44 + total circles Ø 38; start badge "34", goal badge "60" | total circles (paper) |
| 20 | maze + colouring crab → sandcastle (B&W) | T1 | 675 × 716 | 643 × 684 | 56 | BL → TR | none, line only | none |

Scene-file reconciliation (for the critic): the scene file still describes face 19 as an arrow-code building site; the pedagogy file and lead note 1 replaced it with the running-total maze. The building-site scene, hero and goal stay; the teal arrows become op pills. Face 18's hero is the LION in all 11 locales (pedagogy, measured), not the scene file's per-locale pet rotation; the market square stays as the setting. Face 8 at d2 has FOUR strings (pedagogy d2 = 4 lines); the scene file's d3 extras (squirrel + balloon) move to d2, d3 needs a fifth holder + goal (scene file to supply).

### 2.1 Per-face layout detail (ASCII at d2; numbers are page px)

**F1 BASE (T1).** Hedgehog 96 h at BL (x 20-110, y 600-700), start disc at the BL mouth (x ≈ 70, y ≈ 590). Apple tree 150 h at TR (x 520-660, y 10-160), flag at the TR mouth (x ≈ 560, y ≈ 150). Sky band top 18 % (y 0-129), far hill behind; the maze field occupies y ≈ 100-700 (*est.*: B's Poisson field + keep-out discs Ø 190 at the two sprites).
```
+-----------------------------------------------+  675 x 716
| sky                         [tree 150] F      |  F = flag + dashed ring at goal node
|   ~~~ far hill ~~~                    ||      |
|  (islands: mouse, ladybug, snail ...)  ||     |
|   corridors W 44, 30 nodes, route 11-15 (B)   |
| >o [hedgehog 96]                              |  o = start disc 44, > = triangle into mouth
+-----------------------------------------------+
```
**F2 (PreK, T1).** Lane 72, start disc Ø 56 left-mid (y 358), ball goal right-mid; 12 nodes (B) at a pitch ≈ 643/4 = 160 px, so the islands are big (cat, rabbit, cherry tree 130 px fit). Both dead ends within the first two junctions.
**F3 (G1, T1).** Lane 36; 56 nodes (B) at pitch ≈ 643/8 = 80 px *est.*; islands 44-60 px art only; canopy band top 14 % (y 0-100) outside the field's node region.
**F4 river (T1).** Corridor = water band W 52, edge `#73B7D3`; start disc on the water at the TL mouth (white triangle visible on the teal disc); dock 120 × 46 drawn at the BR mouth with the teddy ON it, the flag planted on the dock's end plank.
**F5 burrow (T1).** Sky 68 px, grass line y 84, three strata; start disc on the surface at the nest hole TL; goal in the deepest chamber BR (chamber ellipse 120 × 80 *est.*), flag inside the chamber. Dead-end chambers 80 × 56 *est.* hold one bug each.
**F6 town shortest (T2).**
```
+-----------------------------------------------+ 675 x 640
| >o tow truck  streets on a 5 x 4 block lattice |
|  [lawn][lawn][lawn][lawn][lawn]    car F       |  blocks ~110 x 120 *est.* (643-6x40)/5 = 80.6 wide
|  ...                                          |  (B sets the lattice; lane 40)
+-----------------------------------------------+
 gap 12
+-----------------------------------------------+ 675 x 64
|        [block glyph]  =  [ 56 x 56 box ]      |
+-----------------------------------------------+
```
Lawn block width at lane 40: (643 − 6 × 40) / 5 = 80.6 px; height (608 − 5 × 40) / 4 = 102 px (*est.*; B owns). House objects 56-70 px fit one per block.
**F7 babies (T3).**
```
+-----------------------------------------------+ 675 x 716
| fence rail                                    |
|  (1)chick     (2)calf      (3)lamb            |  starts at y 70, x 110 / 337 / 564 (pitch 227)
|   o            o            o                 |  numbered discs 44
|      three interleaved trees, lane 44 (B)     |
|   F            F            F                 |
| [hen]        [sheep]      [cow] (derangement) |  goals at y 640, paddock discs Ø 120
+-----------------------------------------------+
```
Sprites 72-80 px; babies visibly smaller (≤ 0.75 × mother height).
**F8 tangled (T3).**
```
+-----------------------------------------------+ 675 x 716
| [kite] [kite] [kite] [balloon]                |  goals y 20-90, pitch 168 (x 84 / 252 / 421 / 589)
| [box ] [box ] [box ] [box ]   48 x 48 dashed  |  y 100-148
|  strings 14 wide, 8-10 crossings, >= 50 deg   |  y 160-590 (B)
|  o1     o2     o3     o4                      |  start discs y 600
| rabbit  fox   raccoon squirrel                |  holders 72 h, y 620-700, on the hill band
+-----------------------------------------------+
```
Crossings drawn over/under: the upper string's fill continues, the lower string's outline breaks for 6 px either side (the reader sees which string passes on top; no crossing reads as a junction).
**F9 collect (T2).** Items are pictures 52 on white discs Ø 56 centred IN the corridor (same rules as stones 1.5); strip item = the same picture.
**F10 avoid (T2).** Walrus 64 × 44 *est.* lying ACROSS a corridor but never wider than lane + 24 (it must read as "in the way", not as a wall, pedagogy F10); thin-ice hole 48 × 28 on the corridor centreline.
**F11 / F12 / F14 (T1, K label).** Discs Ø 56 per 1.5. Face 11 sky print-toned (1.9). P6 length classes (21 / 26 / 27 / 29) are four graphs on one scene; the frame and markers do not move.
**F13 hop (T4).**
```
+-----------------------------------------------+ 675 x 716
| bee                                  [honey]F |  honey 70 at TR, flag beside the run's last cell
|        hex cells pointy-top, circumradius 46  |  cell width 80, row pitch 69
|        6 rows x 6 cols, offset rows +40       |  grid 6x80+40 = 520 wide, 5x69+92 = 437 tall
|        letter glyph 40 in each cell           |  centred: x 77-597, y 140-577 *est.*
| [bear 96] o (disc points at the run's        |
|            first cell, no letter on the disc) |
+-----------------------------------------------+
```
Cell fill `#FFF6D6`, edge 3 px `#E0B44E`; glyph 40 (`letter-strokes`, above the K 30 floor); comb silhouette behind. The disc points into the first run cell; the letter itself is IN the cell (the child must find H, so no disc label). G1 floor 44 per cell: 80 px width passes.
**F15 skip count (T1, G2).** Pills 64 × 48 (3-digit "100" at 26 px ≈ 45 px wide, *est.*); cloud road W 32 with puff circles.
**F16 / F17 (T1, G1).** Rule badge: teal disc Ø 56 with the target numeral 30 px white, 8 px from the start disc, opposite the corridor. It is printed ONCE (pedagogy F17); the instruction names it in words too.
**F18 sound (T2).** Cards Ø 72 on market-lane nodes; the hero's own card is in the strip only (never in the maze).
**F19 running total (T1, G2).**
```
+-----------------------------------------------+ 675 x 716
|        (islands: excavator, crane, mixer)     |
| (34)>o  [+10](  ) [-1](  ) ...  [+5](  )  F(60)|  start badge "34", goal badge "60": teal discs Ø 52, 26 px
|   op pills 68 x 44 + total circles 38 dashed  |  ~14 pills (B); lane 32
+-----------------------------------------------+
```
Total circle placed beside its pill on the island side; circles never touch another corridor (clearance 8). Minus is U+2212.
**F20 colouring (T1, B&W).** Corridor = two parallel ink lines (2.5 px, W 56 between them), rounded joins; interior blank; markers outlined (1.4). No fills anywhere on the print page.

---

## 3 The SCREEN (`trace-path`)

### 3.1 Render
- The screen page is a separate render of the same face (b7 convention, `*.screen.png`): the print instruction is replaced by the face's tap string (`i18n/interactive-instructions.json`, key `mz-<faceKey>`); `data-lcs-paper-only` elements (boxes, total circles) are removed; strips stay (the legend is needed).
- The ink layer is an SVG with `viewBox 0 0 675 H` and `preserveAspectRatio="xMidYMid meet"`, same box as the scene (fixes the prototype's anisotropic `0 0 100 100 none` stroke). Graph nodes and edge samples are emitted in page px, not %.

### 3.2 Snap rule (the designer's statement required by the brief)
**Snap radius, not corridor width:** grab radius around the active tip = max(44 css px, 90 page px); move projection considers ONLY the edges incident to the tip, within the same radius. Corridors stay at their pedagogical widths (32-72). Because projection is restricted to incident edges, two nearby corridors (clearance W + 17, B) can never steal the ink. Advance threshold 92 % of an edge (prototype, measured).

### 3.3 Ink and route colours
| item | colour | width (page px) | notes |
|---|---|---|---|
| single-route ink | `#2F5BD3` blue | max(12, 0.42 × W): F1 18, F2 30, F3 15, G2 faces 13 | not coral (the key's colour), not green/red (state colours), not teal (apparatus); opacity 0.9, round caps/joins |
| partial ink (along an unfinished edge) | same, opacity 0.55 | same | tells "keep pulling" |
| route 1..4 (faces 7, 8) | `#2F5BD3` blue · `#8E44C4` purple · `#D98E04` amber · `#5B3A1E` brown | 0.42 × W (face 8: 10) | no green / red (state colours); each start disc gets a 4 px ring of its route colour so the child sees which line is which |
| face 13 hop | blue line 10 px centre to centre + each stepped cell filled `#2F5BD3` at 18 % | | |
| face 20 | coral NOT used; blue 0.42 × 56 = 24 | | the child "colours the road" on paper; on screen the trace is the colour |

### 3.4 Start / goal highlights
- Active tip: dashed teal ring Ø 90 page px (2 px, 6/4) around the tip, so the child sees where to press; at load it pulses (scale 1.0 → 1.08, 1.2 s, infinite) on the start disc; the pulse stops on first contact. Multi-route: every un-started start disc pulses, in its route colour.
- Goal: the dashed coral ring of the print page is kept; when the tip reaches the goal node it becomes solid and fills `#F2784B` at 25 %.
- `prefers-reduced-motion: reduce`: no pulse, no glide; rings are static.

### 3.5 Toolbar (`.lcs-controls`, house `.lcs-btn` 48 css px high)
`[Check]` (`runtimeCheckAnswers`) · `[Go back]` ghost (`mzGoBack`: pops one node off the active route; disabled at the start) · `[Start again]` ghost (`runtimeTryAgain`, clears every route) · progress text slot (`#lcs-progress`, used for the per-route state on faces 7, 8). Retracing along the previous edge also undoes (prototype, measured).

### 3.6 What Check shows (never the answer)
Check is enabled once any route has left its start.
| situation | display | string |
|---|---|---|
| all routes reach their goals and the face rule holds | ink turns green `#2E9E5B`; the hero sprite GLIDES along the drawn route to the goal (1.6 s, ease-in-out; reduced motion: jump); 8 small star polygons burst from the goal (400 ms); then the house celebration card | `runtimeYouDidIt` |
| a route stops short of its goal | ink unchanged; red pulsing ring (`#D64545`, Ø 60) at that route's tip | `mzKeepGoing` ("Not there yet. Keep going!") |
| route reaches the goal but breaks the label rule (11 12 14 15 16 17 18 19) | the FIRST wrong stone on the route gets a red ring; ink after it turns red; ink before it stays blue (what the child got right stays) | `mzLookAtRing` ("Look at the red ring. Is that the right one?") |
| face 9: goal reached, item(s) missed | each missed item gets the runtime's `missed` style (dashed red ring) | `mzMissed` ("Some are still waiting for you.") |
| face 9 / 13: a road or stone used twice | the repeated stretch turns red | `mzTwice` ("Only once on each road.") |
| face 10: an obstacle passed | that obstacle gets a red ring | `mzAvoid` ("Oops! Find a way around it.") |
| face 6: goal reached, not the shortest | ink stays blue, goal ring turns amber | `mzShorter` ("You got there! Is there a shorter way?") |
| face 7 / 8: a route ends at another start's goal | that route's ink turns red | `mzWrongHome` ("Follow this one again.") |
A wrong Check leaves the child's ink in place (never erases work); the next pointer contact clears the red marks.

### 3.7 Keyboard and screen reader path
- The stage is not focusable; a **junction button row** under the stage is (`role="group"`, `aria-label` = `mzWaysHere`). At the active tip it shows one button per way forward (excluding the edge just walked), each labelled with an arrow glyph (8 compass glyphs ← ↖ ↑ ↗ → ↘ ↓ ↙ from the first 20 px of that edge) plus, on label faces, the next stone's label ("→ B", "↑ 3 + 7", a picture's vocab word on face 18). Pressing it walks the WHOLE chain to the next junction or dead end (a chain has no choices). Plus `[Go back]`.
- Multi-route faces: a route picker row first (`mzPathN` "Way 1".."Way 4", each with its hero's vocab name).
- `aria-live="polite"` announces after each step: `mzAt` ("{n} ways from here"), `mzDeadEnd` ("This way ends. Go back."), `mzAtGoal` ("You reached {goal}.").
- Focus outline `#4E5FE8` 4 px (house). All buttons ≥ 48 css px.
- The SVG ink layer is `aria-hidden`; the scene image carries the deck's alt text (b7 rich alt).

### 3.8 Strings needed (keys; ×11 locales, native-written, never templated)
- Per face tap instruction: `mz-<faceKey>` × 20 in `i18n/interactive-instructions.json` AND the bank block (b7 trap: two places; the parity gate checks both).
- New runtime chrome (`translations-shared`-style keys, all ×11): `mzGoBack`, `mzKeepGoing`, `mzLookAtRing`, `mzMissed`, `mzTwice`, `mzAvoid`, `mzShorter`, `mzWrongHome`, `mzWaysHere`, `mzPathN` ({n}), `mzAt` ({n}), `mzDeadEnd`, `mzAtGoal` ({goal}). 13 keys × 11 = 143 strings; `{goal}` / hero names come from `image-vocabulary.js` per locale, and fi/de panels write case-safe whole frames (e.g. fi avoids an inflected `{goal}` slot: "Perillä!" rather than a templated illative).
- Existing reused: `runtimeCheckAnswers`, `runtimeTryAgain`, `runtimeYouDidIt`, `runtimeAllCorrect`.

---

## 4 The KEY (`answer-key.pdf`)
The key is the print page with:
| face(s) | key mark |
|---|---|
| all single-route corridor faces (1-6, 9-12, 14-20) | route stroke coral `#F2784B`, width 0.45 × W (min 10), opacity 0.85, round caps, on the corridor centreline, from the start disc to the goal node, ending in a coral arrowhead 14 px |
| 11 12 14 15 16 17 18 19 (labels) | additionally every ROUTE stone gets a 3 px coral ring (Ø stone + 8); decoys untouched |
| 6 | box filled with the shortest length, Baloo 2 30 px coral |
| 7 | each route in its route colour (3.3), the start disc ring in the same colour |
| 8 | each string recoloured in its route colour along its full length; each box filled with the start number in that colour (30 px) |
| 9 | coral route + a coral ring round each collected item + strip tick circles filled coral |
| 10 | coral route; obstacles untouched |
| 13 | each run cell filled coral-soft `#FBE3D8` + a coral 8 px line centre to centre, the first and last cells ringed coral 3 px |
| 19 | coral route + each total circle filled with its running total in coral 22 px |
| 20 | the route's band (between its two ink lines) filled coral at 55 % (a crayon wash), edge ink unchanged |
Coral and the four route colours are distinguishable in greyscale only partly (amber L ≈ 0.62 vs coral 0.61): the key is a teacher's document printed in colour; numbered start discs + numbers in the boxes make faces 7/8 checkable in greyscale.

---

## 5 Two alternative page concepts considered

**Alt A: the poster page (the samples' own layout).** Scene bleeds to the page edge, no frame, START / FINISH words on the picture, the instruction overlaid on the sky. Rejected: (1) the house shell (title, name/date, instruction badge, footer) is fixed and every family shares it; (2) START / FINISH need 2 × 11 strings painted INTO art and a Nordic panel would ask for different lengths (`MÅL`, `Maali`); (3) full bleed on A4 and Letter at the 186 × 250 mm content box clips on most home printers; (4) the samples' own weakness: the red arrow and words are the only apparatus, and 175900 / 175921 have no start marker at all.

**Alt B: the workbook page (b7's ledger layout).** Scene 480 wide on the left, a 180 px side column for legend, answer boxes, a "1 · 2 · 3 steps" strip. Rejected: field width falls from 643 to ~448: at lane 44 a K maze loses ~30 % of its nodes (B's node pitch ≈ 80-110), and the 29-letter ABC route + 17 decoys at Ø 56 no longer fits (46 stones need ~25.8 % of 439,800 px²; 448 × 684 = 306,400 px² → 37 % *est.*, crowding below the 8 px stone clearance). Mazes are wide by nature; the side column steals the one dimension the maze needs.

**Chosen: the window page.** Full-width framed scene (643 px of field, the maximum the shell allows), language-free markers drawn as apparatus, and a bottom strip ONLY on the four faces whose rule needs a legend or a written answer. It keeps the house frame and chrome (consistent with b7), gives every lane its band floor with room for islands, and puts every legend at the eye's return point. One template change per face, so the engineer builds four layouts, not twenty.

---

## 6 Risks and the print check

| risk | consequence | guard |
|---|---|---|
| T2 faces lose 76 px of field | lane floors pressed on 6 9 10 18 | B sizes those graphs to 643 × 608; gate: lane ≥ band floor on the rendered page |
| fr/fi instruction wraps one more line than en | body < 733 | stack 716 leaves 17 px; `check-zips` footer-overlap QA is the gate (b7 trap: da's strip wrapped), never the en render |
| dark scenes (3, 11) | toner flood, pencil invisible on the field | 1.9 rules 1-4 gated per face; the toned hexes are the shipped values |
| stone overhang (56 on lane 44) touches a neighbour corridor | a stone reads as bridging two corridors | gate: stone outline ≥ 8 px from any non-own corridor outline |
| screen ink invisible on a phone | at 360 css px a 13 page px G2 ink line is 6.4 css px | min ink 12 page px; tip ring 90 page px; measured with the robot at 360 and 768 (b7 robot gate on the GENERATED decks, not the family gate) |
| decoy stones styled differently (font weight, size) | a style tell solves the label face | one style object; gate compares rendered bounding boxes of route vs decoy glyphs (± 2 px) |
| key route drawn on the wrong side of a stone | key looks off-route | key stroke follows the edge samples, the same polyline the screen snaps to |
| hero glide covers labels | celebration hides the answer stones (harmless after success, but) | glide sprite at 70 % size, drawn under the celebration card only after Check passes |

**Print check (per face, before publish):** (1) render the print page PNG and its greyscale; (2) rules 1.9.1-4 measured; (3) READ the PNG: start disc and flag visible, triangle points into the mouth, no marker clipped; (4) read the key beside it: the coral route runs inside the corridor end to end and every route stone is ringed; (5) print one face per template (T1 face 1, T2 face 9, T3 face 8, T4 face 13) on a mono laser at 100 % and check the walls, the stones and the boxes (operator or engineer; *not measured here*).

---

## 7 Summary
- One page system: stack 716 px (97.7 % of the 733 px tallest-chrome body), frame 675 wide, field 643 after a 16 px inset; four templates (full scene, scene + 64 px bottom strip, multi-route, hex hop grid).
- Language-free markers: teal start disc Ø 44 with a white triangle into the mouth (numbered on multi-route faces), coral flag + dashed ring at the goal; no START / FINISH words.
- Stones per band floors (K Ø 56 / 30, G1 pills 96-104 × 52 / 28, G2 64 × 48 and 68 × 44 / 26), identical for route and decoys, letters from `letter-strokes.js`.
- Strips only on faces 6 (block = box), 9 (item · 4 · tick circles), 10 (not-rings), 18 (lion · sound · L l); boxes on 6, 8, 19 are paper-only.
- Print: corridor L ≥ 0.88, ΔL ≥ 0.10 to field, wall ΔL ≥ 0.25, mean ink ≤ 0.30 *est.*; faces 3 and 11 ship toned.
- Screen: snap radius 90 page px on incident edges only, blue ink (route colours blue / purple / amber / brown), page-px viewBox, Check marks the first wrong thing without revealing the answer, hero glide + stars on success, junction button row for keyboard and screen readers, 13 new chrome keys + 20 tap strings ×11.
- Key: coral route 0.45 W with arrowhead, route stones ringed, boxes and totals filled, route colours on 7 / 8, coral wash on 20.
