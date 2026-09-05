# 116 — Coin Equivalents

## Identity
- Slug: `coin-equivalents`
- Subject / topic: Mathematics / money — one coin is worth the same as a group of smaller coins (equal value with different coins), in the child's own currency
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all tiles visible; a board of single coins and coin groups)
- Estimated build size: ~540 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P12. Money rule (F-117, F-29, A-8, A-19, BUILD-CONVENTIONS §14): `LOCALE_DATA` declares the coin set for all eleven codes using REAL denominations only — en £ (1p 2p 5p 10p 20p 50p), de/fr/it/es/nl/fi € (1c 2c 5c 10c 20c 50c), pt R$ (5c 10c 25c 50c R$1), sv kr (1 2 5 10), da kr (1 2 5 10 20; the 50-øre coin is omitted because it is below the game's unit), no kr (1 5 10 20). The £1/£2 and €1/€2 coins exist but are not used (values above 50 units are outside this game's unroll). Coins are ART shapes: a circle with the value text, drawn at its REAL relative diameter, with the symbol from `LOCALE_DATA` — physical size is never a value cue, and the game exploits that (a 2p is bigger than a 5p; a €1 is smaller than a 50c). Every coin's value unrolls into unit cubes on error. Nothing is spoken.

## Learning
- Objective: Pairs each single coin on a visible board with the one group of smaller coins whose values add to the same amount, and sees both unrolled into unit cubes when they do not match.
- Prerequisites: Reads numerals to 50; adds within 20 (game 004/008); has met the ten-rod as ten ones (game 016). Reads no words.
- Curriculum links: F-1 (money in 9 of 15 sources), F-29 (currency taught 5-9 in EN, DE/FR/NL, ES, BR, IT — **SE, DK and NO do not require money before age 10 and FI has no national money strand at 7-8**; those locales still play with their real kr/€ coins, but the rows are not counted toward Nordic coverage per A-19), F-31 row "Money" — conservative 6-8 (8 of 12 systems), earliest 5 → 6-8 (US 2.MD.C.8 "solve word problems involving … coins"; England Y1 "recognise and know the value of different denominations of coins" / Y2 "find different combinations of coins that equal the same amounts of money" — the objective verbatim; Germany Klasse 1-2 "Geldbeträge legen und wechseln"; France CP-CE1 "la monnaie: échanges"; Netherlands groep 3-4 "geld: munten wisselen"; Spain 1º ciclo "monedas de euro"; Brazil EF01MA19 / EF02MA20 "equivalência de valores de moedas"; Italy classe 2 "l'euro"). F-117 (the money misconception set), F-108 (ten-rods for values above ten).
- Common misconceptions (F-117, F-103, F-108), each with this game's response:
  1. **Bigger coin = worth more (pairs the physically largest single coin with the largest group).** Response: coins are drawn at true relative size, so the board itself contradicts the rule (a 2p/2c coin is larger than a 5p/5c coin; a 20c is larger than a 10c but so is a 50c); on a wrong pair the inspector unrolls both sides into unit cubes (`ART.unitCube` / `ART.unitRod`) in two aligned rows — the shorter row shows hollow `ART.missingCell`s up to the longer, and the extra cubes of the longer row are outlined by `ART.overhang`. The cube rows, not the coin sizes, decide.
  2. **Coins counted as items ("2, 2, 1 — that's three"; a group of five 1s read as "5" but a group of two 5s read as "2").** Response: in the unroll each coin's cubes appear in its own cluster with the coin's label (`ART.cubeLabel`) above the cluster (`ANIM.clusterIn`, one cluster at a time, `tone("tap", k)`); the clusters then close up into one row and the total numeral (`ART.rowTotal`) appears at the row's end — a group's value is the length of its row, not its number of coins.
  3. **Cannot combine mixed coins (5 + 2 + 2 + 1 not summed; pairs 10 with "5 + 5" only).** Response: L1 boards use same-coin groups (5 + 5; 1 + 1); L2 introduces mixed groups; a wrong pair's unroll shows the mixed group's clusters closing into one row that is exactly as long as the single coin's row when they match — the add-up is enacted, never stated.
  4. **Value above ten read as ten cubes (20 = "two tens" not grasped — F-108).** Response: values above 10 unroll as ten-rods (`ART.unitRod`, ten notches) plus cubes, 10, 20 … counted with `ART.countBadge`s; so 20 and 50 are two and five rods, and the child sees why 20 ↔ 10 + 10.
  5. **Pairing two single coins or two groups "that look alike", or tapping the same tile twice.** Response: the pair predicate is single ↔ group only; two tiles of one kind nudge apart and every tile of the OTHER kind lifts briefly (`ANIM.kindLift`); the same tile twice de-selects with `tone("tap")`.

## How it plays
1. **Start screen**: title "Coin Equivalents", the squirrel (`ART.squirrel`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Board 1 (L1: 3 pairs, 6 tiles)**: the rail shows one dot per board (2 or 3, §6). Zone A (56-190) is the inspector: empty until a cue — `ART.inspectorPanel` (600 × 120) at (360, 122) appears only while a cue plays; the squirrel sits at (60, 122). Zones A/B below y = 190: a 3 × 2 grid of tiles (`ART.tile`, 150 × 110, gap 16) at columns x = 194 / 360 / 526 and rows y = 250 / 380. Three tiles are SINGLE coins (`ART.coinFace` at big scale, value text `ART.coinLabel`) and three are GROUP tiles (2-8 small `ART.coinFace`s in one or two rows, each with its label), shuffled. No caption.
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (a single coin and a group of the same total value)**: both glide 16 px toward each other (`ANIM.join`), `tone("correct")`, then lock: alpha 0.6 with `ART.link` drawn between them and the shared value (`ART.rowTotal`) shown on the link; the squirrel `ANIM.hop`. Praise pop when the board completes.
   - **Not a pair, single + group (a value error)**: both `ANIM.nudge`, `tone("nudge")`, both de-select; the CUE plays in the inspector for ≈ 2.4 s: `ART.inspectorPanel` `ANIM.appear`s; row 1 (y = 100) unrolls the single coin — its label at the left (`ART.cubeLabel`), then its value as rods and cubes from x = 150 (`ANIM.clusterIn`, `tone("tap", k)` per rod or cube, 120 ms apart); row 2 (y = 150) unrolls the group cluster by cluster with each coin's label above its cluster, then the clusters slide together (`ANIM.closeUp`); `ART.rowTotal` appears at the end of each row; the shorter row gains `ART.missingCell`s to the longer row's end and the longer row's extra part is outlined by `ART.overhang` (`ANIM.pulse`); after 900 ms the panel `ANIM.fadeOut`s. If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Not a pair, same kind (single + single or group + group)**: both nudge, `tone("nudge")`, de-select; every tile of the other kind does `ANIM.kindLift` once. Counts as a wrong pair for the hint rule.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut`, then the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-N**: L2 = 4 pairs (8 tiles, 4 × 2 grid: x = 111 / 277 / 443 / 609, tiles 150 × 110) with mixed groups; L3 = 4 pairs with values to 50 (rods in the unroll) and long mixed groups (up to 8 coins). Locales whose coin set has only three single coins with groups (sv, no) play 3-pair boards at every level (Content). Session = 2 boards at L1 pace, 3 boards when the child reaches L3 by the end of board 2.
6. **Finish**: `t("all_done")` (360, 110); the squirrel (360, 200) `ANIM.celebrate`; the summary = every pair made this session as a chip (`ART.pairChip`, 150 × 44: the single coin small at the left, "=" (`ART.equalMark`) and the group's coins small at the right) in rows of four from y = 330 (x = 111 + i × 166), rows 56 apart — the equivalences the child found, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  squirrel:       { kind: "emoji", value: "🐿️", size: 80 },
  tile:           { kind: "shape", shape: "roundRect", w: 150, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  coinFace:       { kind: "shape", shape: "circle", r: 24, fill: "surface2", stroke: "ink", strokeWidth: 2 },      // r set per coin: big scale r = mm (single tiles); small scale r = mm × 0.6 (groups); an inner ring stroke line at r − 4
  coinLabel:      { kind: "text",  value: "", size: 18, font: "display", color: "ink" },     // the coin's label from LOCALE_DATA ("2p", "20c", "R$1", "5 kr"); size 18 on big coins, 11 on small ones
  link:           { kind: "shape", shape: "rect", w: 20, h: 6, fill: "structure" },
  hintRing:       { kind: "shape", shape: "roundRect", w: 162, h: 122, stroke: "structure", strokeWidth: 4, radius: 18 },
  inspectorPanel: { kind: "shape", shape: "roundRect", w: 600, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  unitCube:       { kind: "shape", shape: "rect", w: 14, h: 14, fill: "accent", stroke: "bg", strokeWidth: 1 },
  unitRod:        { kind: "shape", shape: "rect", w: 44, h: 14, fill: "structure", stroke: "bg", strokeWidth: 1 },   // nine hairline notches (line token) 4.4 px apart = ten ones
  cubeLabel:      { kind: "text",  value: "", size: 12, font: "display", color: "inkSoft" },  // a coin's label above its cluster in the unroll
  countBadge:     { kind: "shape", shape: "circle", r: 9, fill: "bg" },                     // numeral 11 px structure on a rod ("10", "20" …)
  missingCell:    { kind: "shape", shape: "rect", w: 14, h: 14, stroke: "structure", strokeWidth: 2 },   // hollow; dashed via lineDash [3,3]
  overhang:       { kind: "shape", shape: "rect", w: 60, h: 22, stroke: "accent", strokeWidth: 3 },      // w set to the extra length at call
  rowTotal:       { kind: "text",  value: "", size: 22, font: "display", color: "structure" },
  equalMark:      { kind: "text",  value: "=", size: 22, font: "display", color: "structure" },
  pairChip:       { kind: "shape", shape: "roundRect", w: 150, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:       { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:        { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Coin geometry: every coin is `ART.coinFace` with its radius from the `mm` column of `LOCALE_DATA` (big scale: r = mm; small scale: r = mm × 0.6) and `ART.coinLabel` centred on it. All coins are circles in v1 (the seven-sided 20p/50p and the sv 1-kr hole are left to the art upgrade). Coins never differ by colour; the label is the only value cue. No other emoji or shape parameters appear anywhere in the game.

## Animation registry
```js
const ANIM = {
  lift:       { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:       { duration: 220, ease: "Back.Out", trigger: "each tile of a correct pair moves 16 px toward the other (x,y at call)" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  kindLift:   { y: "-=6", duration: 140, ease: "Sine.InOut", yoyo: true, trigger: "every tile of the other kind after a same-kind pair" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "inspector panel; new board (from alpha 0, scale 0.6)" },
  clusterIn:  { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "each rod or cube of the unroll, 120 ms apart (from alpha 0, scale 0.5)" },
  closeUp:    { duration: 300, ease: "Sine.InOut", trigger: "the group's clusters slide left to close the 8-px gaps between them (x set at call)" },
  pulse:      { scale: 1.08, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "overhang outline" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "inspector panel after a cue" },
  hop:        { y: "-=10", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "squirrel on each correct pair" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:   { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish squirrel" }
};
```
No flashing: `showMe` at 1 Hz; `pulse` three half-cycles; the unroll is one sequence.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                      ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ squirrel   ┌── inspector (360,122) 600×120, cue only ───────┐ │
      │ (60,122)   │ 10p  [rod        ]                      = 10   │ │  zone A
      │            │ 5p 5p [■■■■■][■■■■■]                    = 10   │ │
190   ├──────────────────────────────────────────────────────────────┤
      │    [ (10p) ]      [ (5p)(5p) ]      [ (2p) ]      row y=250  │
      │                                                              │  zone B
      │    [ (1p)(1p) ]   [ (5p) ]          [ (2p)(2p)(1p) ] row y=380│
      │     x=194          x=360             x=526       (150×110)   │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-pair boards use x = 111 / 277 / 443 / 609 (pitch 166) with the same 150 × 110 tiles. Fixed layout, FIT scaling. Unroll rows: labels from x = 90; rods/cubes from x = 150 rightward (rod pitch 48, cube pitch 16, 8-px gap between a group's clusters before close-up); the longest row (50 = five rods = 240 px; 100 c for pt = ten rods = 480 px) ends before x = 640.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3) centred at y = 28, swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` with `ART.tile` tokens. A single-coin tile draws one `ART.coinFace` at big scale centred with `ART.coinLabel` 18 px. A group tile draws its coins at small scale in one row (≤ 4 coins, pitch 34, centred) or two rows (5-8 coins, rows at −20 / +20, pitch 34), each with `ART.coinLabel` 11 px. Selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the facing edges with `ART.rowTotal` (the shared value, 22 px) on it.
- Inspector: `ART.inspectorPanel` at (360, 122); row 1 (single coin) at y = 100, row 2 (group) at y = 150; `ART.cubeLabel` at the row's x = 90 (row 1) or above each cluster (row 2, y − 14); `ART.unitRod` / `ART.unitCube` per the unroll rule (v ≥ 10 → floor(v / 10) rods then v mod 10 cubes; `ART.countBadge` "10", "20" … on each rod's centre); `ART.missingCell`s continue the shorter row; `ART.overhang` around the longer row's extra length; `ART.rowTotal` at each row's end + 20 px.
- `ART.hintRing` behind a tile. `ART.squirrel` (60, 122). Tap floors 150 × 110 ≥ 56; gaps 16. Tab order: row-major across the grid (arrows move within the grid per P12).

## Content
Money is locale-bound. `LOCALE_DATA[lang]` = `{ unit: <label suffix or prefix rule>, coins: [{ v, label, mm }], family }`. `v` is the value in the locale's small unit (p, c, kr; pt centavos); `mm` is the real diameter used for drawing. Nordic rows: [NSR-FLAG] native review of the labels.

| lang | currency | coins (v · label · mm) | family |
|---|---|---|---|
| en | £ (pence) | 1 · "1p" · 20 · 2 · "2p" · 26 · 5 · "5p" · 18 · 10 · "10p" · 24 · 20 · "20p" · 21 · 50 · "50p" · 27 | A |
| de fr it es nl fi | € (cent) | 1 · "1c" · 16 · 2 · "2c" · 19 · 5 · "5c" · 21 · 10 · "10c" · 20 · 20 · "20c" · 22 · 50 · "50c" · 24 | A |
| pt | R$ (centavos) | 5 · "5c" · 22 · 10 · "10c" · 20 · 25 · "25c" · 25 · 50 · "50c" · 23 · 100 · "R$1" · 27 | E |
| sv | kr | 1 · "1 kr" · 20 · 2 · "2 kr" · 22 · 5 · "5 kr" · 24 · 10 · "10 kr" · 21 — [NSR-FLAG] | B |
| da | kr | 1 · "1 kr" · 20 · 2 · "2 kr" · 25 · 5 · "5 kr" · 29 · 10 · "10 kr" · 23 · 20 · "20 kr" · 27 — [NSR-FLAG] (50 øre omitted) | D |
| no | kr | 1 · "1 kr" · 21 · 5 · "5 kr" · 26 · 10 · "10 kr" · 24 · 20 · "20 kr" · 28 — [NSR-FLAG] | C |

Boards are authored per coin FAMILY as "single ↔ group" pairs in unit values; the game renders the family of `GameCore.lang`. Within one board every single coin has a distinct value, so each group has exactly one partner.

**Family A** (en, €; 1 2 5 10 20 50):
- **L1** (3 pairs, same-coin groups): (2↔1+1 · 5↔1+1+1+1+1 · 10↔5+5) · (10↔2+2+2+2+2 · 2↔1+1 · 5↔2+2+1)
- **L2** (4 pairs, mixed groups): (10↔5+5 · 20↔10+10 · 5↔2+2+1 · 2↔1+1) · (10↔2+2+2+2+2 · 20↔5+5+5+5 · 5↔2+1+1+1 · 2↔1+1)
- **L3** (4 pairs, values to 50, long groups): (50↔20+20+10 · 20↔10+5+5 · 10↔5+2+2+1 · 5↔2+2+1) · (50↔20+10+10+10 · 20↔10+5+2+2+1 · 10↔2+2+2+2+1+1 · 2↔1+1) · (50↔10+10+10+10+10 · 20↔5+5+5+5 · 10↔5+5 · 5↔1+1+1+1+1)

**Family B** (sv; 1 2 5 10 — three single coins carry groups, so every board is 3 pairs):
- **L1**: (2↔1+1 · 5↔1+1+1+1+1 · 10↔5+5) · (10↔2+2+2+2+2 · 2↔1+1 · 5↔2+2+1)
- **L2**: (10↔5+2+2+1 · 5↔2+1+1+1 · 2↔1+1) · (10↔5+5 · 5↔2+2+1 · 2↔1+1)
- **L3**: (10↔2+2+2+2+1+1 · 5↔1+1+1+1+1 · 2↔1+1) · (10↔5+2+1+1+1 · 5↔2+2+1 · 2↔1+1)

**Family C** (no; 1 5 10 20 — three single coins carry groups; 3-pair boards):
- **L1**: (5↔1+1+1+1+1 · 10↔5+5 · 20↔10+10) · (20↔5+5+5+5 · 10↔5+5 · 5↔1+1+1+1+1)
- **L2**: (10↔5+1+1+1+1+1 · 20↔10+5+5 · 5↔1+1+1+1+1) · (20↔5+5+5+5 · 10↔5+5 · 5↔1+1+1+1+1)
- **L3**: (20↔10+5+1+1+1+1+1 · 10↔5+1+1+1+1+1 · 5↔1+1+1+1+1) · (20↔5+5+5+1+1+1+1+1 · 10↔5+5 · 5↔1+1+1+1+1)

**Family D** (da; 1 2 5 10 20):
- **L1**: (2↔1+1 · 5↔1+1+1+1+1 · 10↔5+5) · (10↔2+2+2+2+2 · 2↔1+1 · 5↔2+2+1)
- **L2**: (10↔5+5 · 20↔10+10 · 5↔2+2+1 · 2↔1+1) · (10↔2+2+2+2+2 · 20↔5+5+5+5 · 5↔2+1+1+1 · 2↔1+1)
- **L3**: (20↔10+5+5 · 10↔5+2+2+1 · 5↔2+2+1 · 2↔1+1) · (20↔10+5+2+2+1 · 10↔2+2+2+2+1+1 · 5↔1+1+1+1+1 · 2↔1+1) · (20↔5+5+5+5 · 10↔5+5 · 5↔2+1+1+1 · 2↔1+1)

**Family E** (pt; 5 10 25 50 100 — the unit is the centavo; 100 = the R$1 coin, ten rods):
- **L1**: (10↔5+5 · 50↔25+25 · 100↔50+50) · (25↔5+5+5+5+5 · 10↔5+5 · 50↔10+10+10+10+10)
- **L2**: (25↔10+10+5 · 50↔25+10+10+5 · 100↔50+25+25 · 10↔5+5) · (50↔10+10+10+10+10 · 25↔10+5+5+5 · 100↔50+50 · 10↔5+5)
- **L3**: (100↔50+25+10+10+5 · 50↔25+10+10+5 · 25↔10+5+5+5 · 10↔5+5) · (100↔25+25+25+25 · 50↔10+10+10+10+10 · 25↔10+10+5 · 10↔5+5) · (100↔50+25+25 · 50↔25+10+5+5+5 · 25↔5+5+5+5+5 · 10↔5+5)

Tile layout shuffled per board; a single coin and its own group are never horizontally adjacent in the same row on a fresh board. Boards are drawn without repeating a set within a session; if a level has fewer boards than needed it is reshuffled.

Worked example (en): board 1 (L1) pairs 10p ↔ 5p 5p, then taps 2p and 5p (two singles) → both nudge, the three group tiles hop; then 2p ↔ 1p 1p, 5p ↔ 1p×5 → praise, dot fills; board completed with one wrong pair → L2 · board 2 (L2) taps 20p then the 5p 5p group → the inspector unrolls "20p" as two rods (10, 20) and "5p 5p" as two five-cube clusters closing into one row of ten with hollow cells to 20 and the extra rod outlined; then 20p ↔ 10p 10p … board completed with two wrong pairs → same level · board 3 (L2) 0-1 wrong → Finish shows the pair chips.

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 12 pairs at most ≈ 6 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, tiles lock with `ART.link` carrying the shared value, squirrel `ANIM.hop`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer (per anticipated mistake):
  - Largest coin paired with the largest group (bigger coin = worth more): both nudge, `tone("nudge")`; the inspector unrolls both rows; hollow cells and the `ART.overhang` outline show the difference.
  - A group paired by its NUMBER of coins (2 + 2 + 1 taken as "3"): the same unroll — each coin's cluster is labelled and the clusters close into one row whose length is the value.
  - A mixed group not summed (pairs 10 with 5 + 5 only, refuses 5 + 2 + 2 + 1): the same unroll shows the mixed row closing to exactly ten cubes.
  - 20 or 50 paired with a ten-cube group (tens not seen): the single coin's row shows rods badged 10, 20 …; the group row stops short with hollow cells.
  - Same-kind pair: both nudge, tone; the other kind's tiles `ANIM.kindLift`.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` until the pair is made (the show-me step for this pattern). The board never resets.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). A board always completes.
- Finish condition: the session's boards complete. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Coin Equivalents". No words on the play screen; coin labels come from `LOCALE_DATA`, the "=" and totals are numerals.

## Sound
`tone("tap")` on select / de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("tap", k)` per rod or cube during an unroll (a rod steps the pitch by ten, a cube by one — F-213); `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the cube rows carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (with `?lang=en` coins read 1p … 50p; `?lang=de` 1c … 50c; `?lang=pt` 5c … R$1; `?lang=sv` 1 kr … 10 kr; `?lang=no` 1 kr, 5 kr, 10 kr, 20 kr; chrome strings change with the picker).
- [ ] Works at narrow width (400-px iframe: a 4 × 2 board and the inspector panel fully visible; the longest unroll row stays inside the panel).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a tile).
- [ ] The 2p/2c coin is drawn larger than the 5p/5c coin, and the 50p/50c larger than the 20p/20c; sizes match the mm column.
- [ ] Pairing 20 with a 5 + 5 group unrolls two rods badged 10, 20 in the top row and ten cubes with hollow cells to twenty in the bottom row, with the extra rod outlined.
- [ ] Pairing 10 with 5 + 2 + 2 + 1 locks the pair and shows "10" on the link.
- [ ] Tapping two single coins makes both nudge and every group tile hop once.
- [ ] With `?lang=sv` every board has three pairs and no coin above 10 kr; with `?lang=no` no 2-kr coin ever appears.
- [ ] With `?lang=pt` the R$1 coin unrolls into ten rods, and no decimal price is written anywhere.
- [ ] A board with 0-1 mistakes is followed by a board with mixed or longer groups; a board with 3+ mistakes by a smaller one.
- [ ] The finish screen lists every pair as a coin, "=", and its group, and no score.
- [ ] With `?sound=off` nothing is audible.
