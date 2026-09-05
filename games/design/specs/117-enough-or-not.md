# 117 — Enough or Not

## Identity
- Slug: `enough-or-not`
- Subject / topic: Mathematics / money — is the total value of the coins in a purse enough to pay a price? (comparing a mixed-coin total to a price, in the child's own currency)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (a two-tile judge: enough / not enough)
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P1 (a judge in the shape of 054/111, with two tiles instead of three). Money rule (F-117, F-29, A-8, A-19, BUILD-CONVENTIONS §14): `LOCALE_DATA` declares the coin set for all eleven codes with REAL denominations only — en £ (1p 2p 5p 10p 20p 50p), de/fr/it/es/nl/fi € (1c 2c 5c 10c 20c 50c), pt R$ (5c 10c 25c 50c R$1), sv kr (1 2 5 10), da kr (1 2 5 10 20; 50 øre omitted as below the unit), no kr (1 5 10 20). Prices are whole small units (p / c / kr) — never a decimal (F-29: decimals not before 8-9); pt prices are whole centavos up to 100 and the R$1 coin is labelled "R$1". Coins are ART shapes (a circle with the value text at its real relative diameter) — size is never a value cue. Every coin unrolls into unit cubes against the price bar on every answer. Nothing is spoken.

## Learning
- Objective: Looks at the coins in a purse and a price tag and taps "enough" or "not enough", then sees the coins unroll into unit cubes laid against a price bar of the same scale.
- Prerequisites: Reads numerals to 50; adds within 20; has met "a coin's value is a row of cubes" (game 116 is the natural predecessor). Reads the two tile words, or reads the tile icons alone.
- Curriculum links: F-1 (money in 9 of 15 sources), F-29 (currency taught 5-9 in EN, DE/FR/NL, ES, BR, IT; **SE, DK and NO do not require money before age 10; FI has no national money strand at 7-8** — those locales play with their real kr/€ coins but the row is not counted toward Nordic coverage, A-19), F-31 row "Money" — conservative 6-8, earliest 5 → 6-8 (US 2.MD.C.8; England Y2 "solve simple problems in a practical context involving addition … of money"; Germany Klasse 1-2 "mit Geld rechnen: reicht das Geld?"; France CE1 "résoudre des problèmes … avec la monnaie"; Netherlands groep 4 "betalen met munten"; Spain 1º ciclo "problemas con monedas"; Brazil EF02MA20 "situações de compra"; Italy classe 2 "l'euro: problemi"). F-117 (money misconceptions), F-103 (comparing by look rather than by number), F-105 (counting on).
- Common misconceptions (F-117, F-103, F-105), each with this game's response:
  1. **Coins counted as items ("five coins — that's plenty for 8"; "only one coin — not enough for 18").** Response: the unroll lays each coin's value as cubes (`ART.unitCube`, rods `ART.unitRod` for tens) in one row under the price bar (`ART.priceBar`), coin by coin with its label above its cluster (`ANIM.clusterIn`); five 1-coins make a row of five that stops well short of an 8-bar; one 20-coin makes two rods that pass the 18-bar's end. The row's length against the bar is the answer.
  2. **Bigger coin = worth more (a purse with one big 2-unit coin judged enough for 5; a small 5-unit coin judged not enough for 4).** Response: coins are drawn at real size (the 2p/2c is larger than the 5p/5c), and the unroll shows the small coin's five cubes reaching past the four-bar; the coin picture is never the information, its cubes are.
  3. **Mixed coins not combined (reads the biggest coin only: "10 — not enough for 12" when the purse holds 10 + 2 + 1).** Response: the clusters close up (`ANIM.closeUp`) into one continuous row after appearing, and `ART.rowTotal` shows the sum at the row's end beside the price at the bar's end; the shortfall or surplus is drawn (`ART.missingCell`s up to the bar / `ART.surplus` outline past it).
  4. **Comparing by look — spread-out coins look like more; a tidy pile looks like less (F-103).** Response: from L2 the purse coins are scattered in a random arrangement inside the purse area so their layout carries no information; only the unroll's aligned row does.
  5. **"Exactly enough" judged as not enough (row ends level with the bar).** Response: L2 and L3 include exact totals; on the unroll the row's end meets the bar's end and `ART.equalMark` appears between them — level is enough.

## How it plays
1. **Start screen**: title "Enough or Not", the pig (`ART.pig`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: an apple priced 5; purse holds 2, 2, 1)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A left: the item for sale (`ART.apple`, 72 px) at (130, 130) on a shelf (`ART.shelf` at (130, 176)), with its price tag (`ART.tag`, 110 × 48) at (130, 218) showing the price text (`ART.priceText`: "5p" / "5c" / "5 kr" per `LOCALE_DATA[lang].label(v)`). Zone A right: the purse (`ART.purse`, 64 px) at (330, 110) and its coins (`ART.coinFace` small scale with `ART.coinLabel`) laid in a row at y = 160 from x = 400 (pitch 60; a second row at y = 216 for the 5th-8th coin). The pig sits at (640, 170). Zone B: the price bar `ART.priceBar` at y = 300 from x = 100 (length = price ÷ cellValue × 12 px; 5 → 60 px) with `ART.barEnd` (a tall tick) at its right end and `ART.priceText` beside it; below the bar, the cube row (empty until the unroll) at y = 326. Two judge tiles (`makeTile` 220 × 96 with `ART.judgeTile` tokens) at y = 420: LEFT `S("enough")` ("Enough") with `ART.iconEnough` (a coin row reaching a bar's end), RIGHT `S("notEnough")` ("Not enough") with `ART.iconShort` (a coin row stopping short); positions fixed (see Visual specification). Caption `S("canBuy")` ("Enough to buy it?") at (360, 270), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Answering**: the child taps a judge tile.
   - **Correct**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; the **unroll** plays as confirmation: each purse coin's cubes drop into the row under the bar in purse order (`ANIM.clusterIn`, `tone("tap", k)` per rod or cube, 100 ms apart; the coin's label above its cluster), the clusters close up, `ART.rowTotal` appears at the row's end; if the row reaches or passes `ART.barEnd`, `ART.equalMark` (exact) or `ART.surplus` (an outline round the part beyond the bar) appears; if it stops short, `ART.missingCell`s fill the gap to the bar's end. Then `GameCore.showPraise` (next key in rotation); the pig `ANIM.oink`; for "enough" the item glides into the purse (`ANIM.glide`); the rail dot fills; after 900 ms the next item builds (`ANIM.appear`). First-try correct.
   - **Wrong**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; the same unroll plays (≈ 2 s) while both tiles are `setEnabled(false)`, ending with the gap or surplus outlined and `ANIM.pulse` on it; the row stays visible. Tiles re-enable. Attempt 2.
   - **Wrong on attempt 2**: the unroll again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
4. **Items 2-10**: per Content/Rules. L1 = prices ≤ 10, small coins, totals at least 2 away from the price; L2 = prices ≤ 20, mixed coins with a ten, totals within 1-3 of the price and some exact; L3 = prices ≤ 50 (pt ≤ 100), the two traps (many small coins that are not enough; one big coin that is) and exact totals.
5. **Finish**: `t("all_done")` (360, 110); the pig (360, 200) `ANIM.celebrate`; the summary = the ten items as chips (`ART.itemChip`, 120 × 44) in two rows of five from y = 330 (x = 120 + i × 120), each showing the item's emoji small and, at its right, `ART.iconEnough` or `ART.iconShort` — the ten judgements, not a score; optionally `t("question_x_of_y", {n: first-try solved, total: 10})` at (360, 460); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  pig:         { kind: "emoji", value: "🐷", size: 80 },
  purse:       { kind: "emoji", value: "👛", size: 64 },
  apple:       { kind: "emoji", value: "🍎", size: 72 },
  balloon:     { kind: "emoji", value: "🎈", size: 72 },
  pencil:      { kind: "emoji", value: "✏️", size: 72 },
  biscuit:     { kind: "emoji", value: "🍪", size: 72 },
  crayon:      { kind: "emoji", value: "🖍️", size: 72 },
  ball:        { kind: "emoji", value: "⚽", size: 72 },
  car:         { kind: "emoji", value: "🚗", size: 72 },
  book:        { kind: "emoji", value: "📒", size: 72 },
  teddy:       { kind: "emoji", value: "🧸", size: 72 },
  gift:        { kind: "emoji", value: "🎁", size: 72 },
  banana:      { kind: "emoji", value: "🍌", size: 72 },
  shelf:       { kind: "shape", shape: "roundRect", w: 120, h: 10, fill: "structure", radius: 4 },
  tag:         { kind: "shape", shape: "roundRect", w: 110, h: 48, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 10 },   // a 2-px ink string drawn from its top-centre up 12 px
  priceText:   { kind: "text",  value: "", size: 26, font: "display", color: "ink" },   // "5p" / "5c" / "5 kr" / "R$1" per LOCALE_DATA
  coinFace:    { kind: "shape", shape: "circle", r: 14, fill: "surface2", stroke: "ink", strokeWidth: 2 },   // r = mm × 0.6 from LOCALE_DATA; inner ring stroke line at r − 3
  coinLabel:   { kind: "text",  value: "", size: 11, font: "display", color: "ink" },
  priceBar:    { kind: "shape", shape: "rect", w: 60, h: 14, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // w = price ÷ cellValue × 12
  barEnd:      { kind: "shape", shape: "rect", w: 4, h: 44, fill: "structure" },
  unitCube:    { kind: "shape", shape: "rect", w: 12, h: 12, fill: "accent", stroke: "bg", strokeWidth: 1 },
  unitRod:     { kind: "shape", shape: "rect", w: 120, h: 12, fill: "structure", stroke: "bg", strokeWidth: 1 },   // nine hairline notches 12 px apart = ten cubes
  cubeLabel:   { kind: "text",  value: "", size: 12, font: "display", color: "inkSoft" },
  missingCell: { kind: "shape", shape: "rect", w: 12, h: 12, stroke: "structure", strokeWidth: 2 },   // hollow; dashed via lineDash [3,3]
  surplus:     { kind: "shape", shape: "rect", w: 24, h: 20, stroke: "accent", strokeWidth: 3 },      // w set to the length beyond the bar
  equalMark:   { kind: "text",  value: "=", size: 24, font: "display", color: "structure" },
  rowTotal:    { kind: "text",  value: "", size: 22, font: "display", color: "structure" },
  judgeTile:   { kind: "shape", shape: "roundRect", w: 220, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // word 24 px display ink at (0,−22); icon at (0,+22)
  iconEnough:  { kind: "shape", shape: "rect", w: 48, h: 8, fill: "accent" },        // drawn under a 48-px structure bar with a 3-px tick at the right; the row reaches the tick
  iconShort:   { kind: "shape", shape: "rect", w: 30, h: 8, fill: "accent" },        // drawn under the same 48-px bar; the row stops 18 px short
  showRing:    { kind: "shape", shape: "roundRect", w: 232, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  itemChip:    { kind: "shape", shape: "roundRect", w: 120, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Coins are circles at real relative diameter with the label as the only value cue. The two judge icons differ by LENGTH against a tick, not by colour.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the correct judge tile tapped" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the wrong judge tile tapped" },
  clusterIn: { alpha: 1, y: "-=0", scale: 1, duration: 120, ease: "Back.Out", trigger: "each rod or cube of the unroll, 100 ms apart (from alpha 0, scale 0.5, y +16)" },
  closeUp:   { duration: 300, ease: "Sine.InOut", trigger: "the clusters slide left to close the 8-px gaps between coins (x set at call)" },
  pulse:     { scale: 1.08, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the missing cells or the surplus outline after a wrong tap" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "rowTotal / equalMark; new item (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "bar, row and coins between items" },
  glide:     { duration: 300, ease: "Sine.InOut", trigger: "the bought item glides to the purse on a correct 'enough' (x,y set at call)" },
  oink:      { scaleY: 0.85, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "pig on a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct judge tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish pig" }
};
```
No flashing: `showMe` at 1 Hz; `pulse` three half-cycles; the unroll is one sequence.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │   apple (130,130)   purse (330,110)  (2p) (2p) (1p)  y=160     │
      │   ═shelf═ (130,176)                  (coins from x=400)       │  zone A
      │   [ 5p ] tag (130,218)               pig (640,170)            │
260   ├──────────────────────────────────────────────────────────────┤
      │          "Enough to buy it?" (360,270)                       │
      │  ▐█████▌| 5p   price bar y=300 from x=100; tick at the end    │
      │  ■■ ■■ ■  ← cube row y=326 (after the unroll)                 │  zone B
      │   [ Enough  ▬▬▬| ]        [ Not enough ▬▬ | ]   y=420         │
      │      x=240                     x=480          (220×96)        │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Cell width 12 px; the longest bar (50 units for families A-D; 100 c ÷ 5 = 20 cells for pt) is 600 px at most for family A prices to 50 → bars above 40 cells use 10-px cells so the bar ends before x = 620 (the cube row uses the same cell width).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Item: the item's ART emoji at (130, 130); `ART.shelf` (130, 176); `ART.tag` (130, 218) with `ART.priceText` centred.
- Purse: `ART.purse` (330, 110); coins `ART.coinFace` (r = mm × 0.6) with `ART.coinLabel` at y = 160, x = 400 + i × 60 for i < 5 and y = 216, x = 400 + (i − 5) × 60 for i ≥ 5 at L1; from L2 the coin positions are a random permutation of eight spots — (400,150) (460,172) (520,146) (580,178) (430,214) (490,236) (550,212) (610,238) — so the arrangement carries no information.
- Price bar: `ART.priceBar` with its left end at x = 100, y = 300; `ART.barEnd` at the bar's right end; `ART.priceText` 20 px 16 px to the right of the tick. Cube row at y = 326 from x = 100: per coin, floor(v ÷ cellValue ÷ 10) `ART.unitRod`s then the remaining `ART.unitCube`s (pitch 12; rods 120 wide); `ART.cubeLabel` above each cluster (y = 312) until the close-up; `ART.rowTotal` 16 px right of the row's end; `ART.missingCell`s from the row's end to the tick; `ART.surplus` around the part beyond the tick; `ART.equalMark` at the tick when the row ends exactly there.
- Judge tiles: `makeTile` 220 × 96 with `ART.judgeTile` tokens at (240, 420) and (480, 420); the word (`S("enough")` / `S("notEnough")`, 24 px `THEME.font.display` `THEME.colour.ink`, fit-to-width) at the tile's (0, −22) and the icon (`ART.iconEnough` / `ART.iconShort`) at (0, +22). **Positions are fixed for the whole session** — a deliberate exception to §13's per-item shuffle: a two-way judge is read by its icon and its side, and shuffling a yes/no pair would make the child re-read the tiles every item; brute-force is guarded because a wrong tap always plays the unroll and the item never counts as first-try after it.
- `ART.showRing` behind the correct tile. `ART.pig` (640, 170). Caption `S("canBuy")` at (360, 270).
- Tap floors 220 × 96 ≥ 56; gap 20. Tab order: the two judge tiles left to right. While the unroll plays (≈ 2 s) both tiles are `setEnabled(false)`.

## Content
Money is locale-bound. `LOCALE_DATA[lang]` = `{ coins: [{ v, label, mm }], cellValue, label(v), family }`; `cellValue` = 1 for families A-D and 5 for pt (one cube = 5 centavos, so a 100-c price is 20 cells and the R$1 coin two rods). `label(v)` renders a price or coin value: en `v + "p"`; € `v + "c"`; pt `v + "c"` and `"R$1"` for 100; sv/da/no `v + " kr"`.

| lang | coins (v · label · mm) | family |
|---|---|---|
| en | 1 "1p" 20 · 2 "2p" 26 · 5 "5p" 18 · 10 "10p" 24 · 20 "20p" 21 · 50 "50p" 27 | A |
| de fr it es nl fi | 1 "1c" 16 · 2 "2c" 19 · 5 "5c" 21 · 10 "10c" 20 · 20 "20c" 22 · 50 "50c" 24 | A |
| pt | 5 "5c" 22 · 10 "10c" 20 · 25 "25c" 25 · 50 "50c" 23 · 100 "R$1" 27 | E |
| sv | 1 "1 kr" 20 · 2 "2 kr" 22 · 5 "5 kr" 24 · 10 "10 kr" 21 — [NSR-FLAG] native review | B |
| da | 1 "1 kr" 20 · 2 "2 kr" 25 · 5 "5 kr" 29 · 10 "10 kr" 23 · 20 "20 kr" 27 — [NSR-FLAG] native review | D |
| no | 1 "1 kr" 21 · 5 "5 kr" 26 · 10 "10 kr" 24 · 20 "20 kr" 28 — [NSR-FLAG] native review | C |

Items are authored per coin FAMILY as (item; price; purse coins → answer, purse total). The game renders the family of `GameCore.lang`. Item words map to ART keys: apple `ART.apple`, balloon `ART.balloon`, pencil `ART.pencil`, biscuit `ART.biscuit`, crayon `ART.crayon`, ball `ART.ball`, car `ART.car`, book `ART.book`, teddy `ART.teddy`, gift `ART.gift`, banana `ART.banana`.

**Family A** (en, €):
- **L1**: (apple; 5; 2,2,1 → enough, 5 exact) · (balloon; 7; 5,1 → not, 6) · (pencil; 4; 2,2,2 → enough, 6) · (biscuit; 8; 5,2,1 → enough, 8 exact) · (crayon; 6; 2,2 → not, 4) · (ball; 9; 5,5 → enough, 10)
- **L2**: (car; 12; 10,1 → not, 11) · (book; 15; 10,2,2,1 → enough, 15 exact) · (teddy; 18; 10,5,2 → not, 17) · (gift; 14; 10,5 → enough, 15) · (banana; 11; 5,5,2 → enough, 12) · (apple; 13; 5,5,2 → not, 12)
- **L3**: (ball; 8; 1,1,1,1,1 → not, 5) · (teddy; 18; 20 → enough, 20) · (car; 25; 10,10,2,2 → not, 24) · (book; 30; 20,5,5 → enough, 30 exact) · (gift; 40; 20,10,5,2,2 → not, 39) · (crayon; 6; 2,2,2,2,2 → enough, 10) · (biscuit; 45; 50 → enough, 50) · (balloon; 20; 5,5,5,2,2 → not, 19)

**Family B** (sv; no coin above 10):
- **L1**: as family A.
- **L2**: as family A.
- **L3**: (ball; 8; 1,1,1,1,1 → not, 5) · (teddy; 9; 10 → enough, 10) · (car; 15; 10,2,2 → not, 14) · (book; 17; 10,5,2 → enough, 17 exact) · (gift; 20; 10,5,2,2 → not, 19) · (crayon; 6; 2,2,2,2 → enough, 8) · (biscuit; 18; 10,10 → enough, 20) · (balloon; 12; 5,5,1 → not, 11)

**Family C** (no; 1 5 10 20):
- **L1**: (apple; 5; 1,1,1,1,1 → enough, 5 exact) · (balloon; 7; 5,1 → not, 6) · (pencil; 4; 5 → enough, 5) · (biscuit; 8; 5,1,1,1 → enough, 8 exact) · (crayon; 6; 1,1,1,1 → not, 4) · (ball; 9; 5,5 → enough, 10)
- **L2**: (car; 12; 10,1 → not, 11) · (book; 15; 10,5 → enough, 15 exact) · (teddy; 18; 10,5,1,1 → not, 17) · (gift; 14; 10,5 → enough, 15) · (banana; 11; 5,5,1,1 → enough, 12) · (apple; 13; 5,5,1,1 → not, 12)
- **L3**: (ball; 8; 1,1,1,1,1 → not, 5) · (teddy; 18; 20 → enough, 20) · (car; 25; 10,10,1,1,1,1 → not, 24) · (book; 30; 20,5,5 → enough, 30 exact) · (gift; 40; 20,10,5,1,1,1,1 → not, 39) · (crayon; 6; 5,5 → enough, 10) · (biscuit; 45; 20,20,5 → enough, 45 exact) · (balloon; 20; 5,5,5,1,1,1,1 → not, 19)

**Family D** (da; 1 2 5 10 20): L1 and L2 as family A; **L3**: (ball; 8; 1,1,1,1,1 → not, 5) · (teddy; 18; 20 → enough, 20) · (car; 25; 10,10,2,2 → not, 24) · (book; 30; 20,5,5 → enough, 30 exact) · (gift; 40; 20,10,5,2,2 → not, 39) · (crayon; 6; 2,2,2,2,2 → enough, 10) · (biscuit; 45; 20,20,10 → enough, 50) · (balloon; 20; 5,5,5,2,2 → not, 19)

**Family E** (pt; centavos, cube = 5 c):
- **L1**: (apple; 25; 10,10,5 → enough, 25 exact) · (balloon; 35; 25,5 → not, 30) · (pencil; 20; 10,10,10 → enough, 30) · (biscuit; 40; 25,10,5 → enough, 40 exact) · (crayon; 30; 10,10 → not, 20) · (ball; 45; 25,25 → enough, 50)
- **L2**: (car; 60; 50,5 → not, 55) · (book; 75; 50,10,10,5 → enough, 75 exact) · (teddy; 90; 50,25,10 → not, 85) · (gift; 70; 50,25 → enough, 75) · (banana; 55; 25,25,10 → enough, 60) · (apple; 65; 25,25,10 → not, 60)
- **L3**: (ball; 40; 5,5,5,5,5 → not, 25) · (teddy; 90; 100 → enough, 100) · (car; 95; 50,25,10,5 → not, 90) · (book; 100; 50,25,25 → enough, 100 exact) · (gift; 80; 50,10,10,5 → not, 75) · (crayon; 30; 10,10,10,10,10 → enough, 50) · (biscuit; 85; 50,25,10 → enough, 85 exact) · (balloon; 100; 25,25,25,10,10 → not, 95)

Play list of 10 per Rules; no item repeats within a session; within a level the play list alternates "enough" and "not" answers no more than two in a row of the same kind; if a pool is exhausted it is reshuffled.

Worked example (en): item 1 (apple 5; 2,2,1) taps Enough → the row 2, 2, 1 closes to five cubes ending at the tick with "=" · item 2 (balloon 7; 5,1) taps Enough → nudge; the row stops one cell short with a hollow cell pulsing; then Not enough (helped) → stays L1 · item 3 (pencil 4; 2,2,2) first-try · item 4 first-try → L2 · item 5 (car 12; 10,1) first-try Not enough · item 6 (book 15; 10,2,2,1) first-try → L3 · item 7 (ball 8; 1,1,1,1,1) taps Enough → the five cubes stop three short; then Not enough (helped) → L2 · items 8-10 first-try → Finish shows ten item chips with their icons.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next item from the next level up (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the unroll with rising tones, `ART.rowTotal` and `ART.equalMark` / `ART.surplus` / `ART.missingCell`s, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], pig `ANIM.oink`, the item glides to the purse on "enough", rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - "Enough" tapped for many small coins below the price (coins counted as items): `ANIM.nudge` + `tone("nudge")`; the unroll ends short of the tick and the hollow cells `ANIM.pulse`.
  - "Not enough" tapped for one big coin that covers the price (bigger/more coins = more): nudge + tone; the unroll shows rods passing the tick and `ART.surplus` pulses.
  - "Not enough" tapped when the mixed coins add to the price or above (biggest coin read alone): nudge + tone; the clusters close into one row that reaches the tick; `ART.equalMark` or `ART.surplus` pulses.
  - "Enough" tapped for a total one short (off-by-one / exact misjudged): nudge + tone; a single hollow cell pulses at the tick.
- Retry behaviour: attempt 1 unaided → attempt 2 after the unroll → attempt 3 with the show-me ring on the correct tile; the ringed tile completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 10 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Enough or Not"; `canBuy` = "Enough to buy it?"; `enough` = "Enough"; `notEnough` = "Not enough". Prices and coin labels come from `LOCALE_DATA`.

## Sound
`tone("correct")` on the correct tile; `tone("nudge")` on the wrong tile; `tone("tap", k)` per rod or cube in the unroll (a rod steps the pitch by ten, a cube by one — F-213); `tone("tap")` when the bought item lands in the purse; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the bar and the row carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (with `?lang=en` prices read 5p … 50p; `?lang=fr` 5c … 50c; `?lang=pt` 25c … R$1 with no decimal; `?lang=sv` 5 kr … 20 kr and no coin above 10 kr; chrome and the two tile words change with the picker).
- [ ] Works at narrow width (400-px iframe: the item, tag, purse, coins, bar and both tiles fully visible; the longest bar ends before the right edge).
- [ ] Keyboard operable (Tab cycles the two judge tiles; Enter picks; coins and the item are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (10 wrong taps in a row still reach All done via the show-me ring).
- [ ] Every answer, right or wrong, unrolls the coins into cubes under the price bar, coin by coin, with each coin's label above its cubes before they close up.
- [ ] Five 1-unit coins against a price of 8 stop three cells short and the three hollow cells pulse when "Enough" is tapped.
- [ ] One 20-unit coin against a price of 18 shows two rods passing the tick with the surplus outlined.
- [ ] A purse of 10 + 2 + 2 + 1 against 15 ends exactly at the tick and shows "=".
- [ ] The 2-unit coin is drawn larger than the 5-unit coin in every currency that has both.
- [ ] From the second level the purse coins are scattered, not in a neat row.
- [ ] "Enough" is always the left tile and "Not enough" the right tile, each with its bar icon.
- [ ] Two first-try corrects in a row bring bigger prices and mixed coins; a wrong tap brings smaller ones.
- [ ] The finish screen shows ten item chips with an enough/short icon and no score.
- [ ] With `?sound=off` nothing is audible.
