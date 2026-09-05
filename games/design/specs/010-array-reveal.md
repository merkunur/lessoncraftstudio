# 010 — Array Reveal

## Identity
- Slug: `array-reveal`
- Subject / topic: Mathematics / multiplication facts to 10 × 10, verified on an array
- Age band: `8-9`
- Interaction pattern: `P10` — predict then reveal
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P10.

## Learning
- Objective: States the product of a × b (a, b ≤ 10) before seeing it, then confirms it by watching the array reveal row by row with a running total.
- Prerequisites: Understands multiplication as equal groups / rows (game 047/048 territory); skip counts in 2s, 5s, 10s; reads numerals to 100.
- Curriculum links: F-2 (times tables are the strongest popularity signal on the web), F-26 (tables to 10 are an 8-9 objective everywhere they are required: IT by 8, US/EN/DE/NL 8, BR 2-5,10, ES builds 8-10, FI 1-5,10 by 8, Nordics "methods" only), F-110, F-31 row "Tables to 10 retrieval" → 8-9 (US 3.OA.C.7; England Y3-4 tables; Germany Klasse 2-3 Einmaleins; France CE1-CE2 tables; Netherlands groep 4-5 tafels; Italy classe terza tabelline; Brazil 2º-3º; Spain 3º).
- Common misconceptions (F-110, F-109), each with this game's response:
  1. **Groups vs group-size confused (3 × 4 read as 4 rows of 3 — harmless for the product but wrong for the model).** Response: the array is always revealed as a ROWS of b: the first factor is the number of rows (shown as a row icon `ART.rowIcon` beside "3"), the second the row length (`ART.dotsIcon` beside "4"); after the reveal a one-tap "turn" (`ART.turnTile`) rotates the array to show b rows of a with the same total (`ANIM.turn`) — commutativity is one tap away, never assumed.
  2. **Skip-count drift (counting 4, 8, 12, 15).** Response: the reveal shows the running total on each row as it opens (`ART.rowTotal` 4, 8, 12); a child who predicted 15 sees the third row land on 12 with the "+4" step shown (`ART.stepLabel`) — the error is located, not just marked.
  3. **Near-fact errors (3 × 4 = 14, 6 × 7 = 48 — neighbouring products).** Response: distractor tiles are always neighbouring products or facts from the adjacent table (a × (b ± 1), (a ± 1) × b), so a near-fact guess is possible and, on the reveal, the child sees exactly one row too many or too few (`ART.ghostRow` — a dashed extra row for a × (b + 1) predictions; a missing-row highlight for a × (b − 1)).
  4. **"Multiplication always makes bigger" / × 1 and × 0.** Response: L3 includes × 1 (one row) and × 0 (the shutter opens on an empty grid, total 0) items so the model covers the edge cases.
  5. **Speed-anxiety with tables (F-45).** Response: there is no clock; a prediction can be reconsidered before Check by tapping another tile; the reveal is the same warm animation whether or not the prediction was right.

## How it plays
1. **Start screen**: title "Array Reveal", the raccoon (`ART.raccoon`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3 × 4)**: rail of 12 dots (§6; this band may show `t("question_x_of_y")` — it does, at (360, 48), 18 px `THEME.colour.inkSoft`). Zone A: the fact (`ART.factText`, 44 px) at (360, 96): "3 × 4" with `ART.rowIcon` (three horizontal bars) left of the 3 and `ART.dotsIcon` (four dots) right of the 4; below it the shuttered array (`ART.shutter`, a `structure` rounded rectangle 360 × 150 with a handle glyph) centred at (360, 200) hiding a 3 × 4 grid of `ART.dot`s (cell pitch 34). Zone B: three product tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480: 12, 8, 16 shuffled (b − 1 and b + 1 rows). Zone C: Check (`makeButton ok`) at (360, 510), disabled until a tile is selected. Caption: none.
3. **Predicting**: tap a tile → it selects (`api.setSelected`, `ANIM.lift`); tapping another switches; Check enables.
4. **Check → Reveal**: the shutter slides up (`ANIM.shutterUp`, 400 ms) uncovering the array; then the rows light one by one from the top (`ANIM.rowOn` per row, 350 ms apart) with `ART.rowTotal` at each row's right (4, 8, 12) and `ART.stepLabel` "+4" appearing between rows; `tone("tap", k)` per row. When the last row lights, the total (`ART.totalText`, 56 px) appears at (360, 300) with `ANIM.appear`.
   - **Prediction correct**: the selected tile `ANIM.pop`s, `tone("correct")`, praise pop; the fact completes (`ART.factText` "3 × 4 = 12"); `ART.turnTile` appears at (600, 200) (the child may tap it to rotate the array; optional; it re-plays the row totals as 3, 6, 9, 12 and shows "4 × 3 = 12"); rail dot fills; after 900 ms (or after the turn, if used) the next item builds. This item is first-try correct.
   - **Prediction a × (b + 1) (one row too many)**: after the reveal, `ART.ghostRow` (a dashed empty row) appears under the array and its dots draw hollow (`ANIM.ghostIn`) with the label "+4?" and then fades, showing that the fourth row does not exist; `tone("nudge")`; the correct tile is now the only enabled tile? — NO: all three tiles stay enabled and the child taps again (attempt 2) so the retrieval is re-performed with the array visible.
   - **Prediction a × (b − 1) (one row short)**: after the reveal, the last row `ANIM.pulse`s with its `ART.rowTotal`; `tone("nudge")`; attempt 2 with the array visible.
   - **Other wrong prediction**: the running totals stay visible; the total text pulses; attempt 2.
   - **Attempt 2 correct**: `tone("correct")`, no praise pop, fact completes, rail dot; counts as solved-with-help (the array was visible).
   - **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Re-queue** (F-41): an item answered wrong first-try re-enters the play list after 2 intervening items (with a fresh distractor set), then, if wrong again, near the end ("last look"). The item count stays 12; re-queued items replace the last unplayed items of the same level.
6. **Items 2-12**: per Content/Rules. L1 tables 2, 5, 10 and squares to 5 × 5; L2 tables 3, 4, 6; L3 tables 7, 8, 9 plus × 1 and × 0 edge items; tables are interleaved within a level (F-41).
7. **Finish**: `t("all_done")` (360, 110); the raccoon (360, 200) `ANIM.celebrate`; the summary = the twelve facts as chips (`ART.factChip`, 120 × 36) in three rows of four from y = 320, first-try facts with a filled `ART.dotFull` at their left and helped facts with a hollow `ART.dotEmpty` — a record of what was retrieved unaided, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  raccoon:     { kind: "emoji", value: "🦝", size: 80, fallback: "🐻" },   // Unicode 11 raccoon; fallback bear for very old devices
  factText:    { kind: "text",  value: "", size: 44, font: "display", color: "structure" },
  rowIcon:     { kind: "shape", shape: "rect", w: 26, h: 4, fill: "inkSoft" },        // three stacked bars, 6 px apart, left of the first factor
  dotsIcon:    { kind: "shape", shape: "circle", r: 3, fill: "inkSoft" },             // a row of dots, 8 px apart, right of the second factor (count = second factor, max 10)
  shutter:     { kind: "shape", shape: "roundRect", w: 372, h: 162, fill: "structure", radius: 14 },
  shutterGrip: { kind: "shape", shape: "roundRect", w: 60, h: 8, fill: "bg", radius: 4 },
  gridBack:    { kind: "shape", shape: "roundRect", w: 372, h: 162, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  dot:         { kind: "shape", shape: "circle", r: 12, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // lit = fill structure
  ghostRow:    { kind: "shape", shape: "roundRect", w: 340, h: 30, stroke: "accent", strokeWidth: 2, radius: 8 },   // dashed (lineDash [6,6]); holds a row of ghostDots
  ghostDot:    { kind: "shape", shape: "circle", r: 12, stroke: "accent", strokeWidth: 2 },
  rowTotal:    { kind: "text",  value: "", size: 22, font: "display", color: "structure" },
  stepLabel:   { kind: "text",  value: "", size: 16, font: "body", color: "inkSoft" },
  totalText:   { kind: "text",  value: "", size: 56, font: "display", color: "structure" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 40 px
  turnTile:    { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },   // label ↻ from ART.turnGlyph
  turnGlyph:   { kind: "text",  value: "↻", size: 36, font: "display", color: "structure" },
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  factChip:    { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The array grid is sized per item: cell pitch 34 px, so a 10 × 10 array is 340 × 340 — larger than zone A. Rule: for a × b with a > 4 rows the grid shrinks its pitch to fit 150 px tall (pitch = min(34, 150 / a)); dots scale with pitch (r = pitch × 0.35). Ten columns at pitch 34 = 340 px wide, fits the 372 grid.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "prediction tile selected" },
  shutterUp: { y: "-=170", alpha: 0, duration: 400, ease: "Sine.In", trigger: "shutter on Check" },
  rowOn:     { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each row's dots switch to the lit fill (from the unlit look) 350 ms apart" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "total text; new item (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  ghostIn:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "ghost row for a one-row-too-many prediction (from alpha 0), then fades" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "last row / total text on a wrong prediction" },
  turn:      { angle: 90, duration: 500, ease: "Sine.InOut", trigger: "array container rotates a quarter turn on the turn tile; row totals re-play after" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish raccoon" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                 ≡ 3  ×  4 ••••   (360,96)                     │
      │            ┌─────────────────────────────┐                    │  zone A
      │            │   ART.shutter (360,200)     │  ↻ (600,200)        │
      │            │   ▬ grip                    │  after reveal       │
      │            └─────────────────────────────┘                    │
      │                     "12" (360,300) after reveal               │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ 8 ]        [ 12 ]        [ 16 ]   y=380              │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
The revealed grid occupies the shutter's rectangle: rows from y = 200 − (a − 1) × pitch / 2 downward; `ART.rowTotal` at x = 560 beside each row; `ART.stepLabel` between rows at x = 560. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.factText` at (360, 96) with `ART.rowIcon` ×3 stacked at x = 260 and `ART.dotsIcon` row starting x = 420 (count = second factor).
- `ART.gridBack` and the dot grid centred (360, 200) beneath `ART.shutter` (with `ART.shutterGrip` at its bottom centre); `ART.ghostDot`s form the ghost row.
- `ART.totalText` (360, 300). Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), label 40 px. `ART.turnTile` (`makeTile` 64 × 64 with `ART.turnGlyph`) at (600, 200), visible only after a reveal. `ART.showRing` behind the correct tile. Check `makeButton` `ok` at (360, 510).
- `ART.raccoon` at (80, 200) during play. Tap floors 96 / 64 ≥ 56.

## Content
Language-neutral. Items as (a × b; distractors) where distractors = a × (b − 1) and a × (b + 1) unless that leaves a duplicate or exceeds 100, in which case (a ± 1) × b is used:
- **L1** (tables 2, 5, 10; squares to 5): 3 × 2 · 2 × 5 · 4 × 10 · 5 × 5 · 6 × 2 · 3 × 5 · 7 × 10 · 4 × 4 · 8 × 2 · 9 × 5 · 3 × 3 · 6 × 10
- **L2** (tables 3, 4, 6; interleaved): 3 × 4 · 6 × 3 · 4 × 6 · 7 × 3 · 5 × 4 · 8 × 6 · 9 × 3 · 6 × 4 · 7 × 6 · 8 × 4 · 9 × 6 · 4 × 3
- **L3** (tables 7, 8, 9 + edge items × 1 and × 0): 6 × 7 · 8 × 8 · 7 × 9 · 9 × 8 · 4 × 7 · 6 × 9 · 8 × 7 · 7 × 7 · 9 × 9 · 5 × 8 · 6 × 1 · 4 × 0

Play list of 12 per Rules with re-queue (How it plays §5); no item repeats except by re-queue; correct slot never repeats twice running.

## Rules
- Item count: 12 (including re-queued repeats, which replace unplayed items).
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first prediction on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the item (after 2 items, then last look) without changing level.
- What happens on a correct answer: reveal with running totals, `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (every correct first-try item), fact completes, turn tile offered, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - a × (b + 1) (one row too many): reveal, then the ghost row draws and fades; `tone("nudge")`; attempt 2 with the array visible.
  - a × (b − 1) (one row short): reveal, the last row pulses with its total; attempt 2.
  - Neighbouring-table product ((a ± 1) × b) or any other: reveal; the total pulses; attempt 2.
  - Attempt 2 wrong: the show-me ring; solved-with-help.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with the array visible → attempt 3 show-me; solved-with-help; the item re-queues later. No attempt 4.
- Finish condition: 12 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Array Reveal". Facts are numerals and symbols.

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` per revealed row; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 12", All done, Play again, Menu, praise change).
- [ ] Works at narrow width (400-px iframe: the fact, the shutter, three tiles and OK visible; a 9 × 9 array still fits inside the shutter area).
- [ ] Keyboard operable (Tab across tiles, the turn tile and OK; Enter selects / checks / turns).
- [ ] Never auto-starts.
- [ ] No losing state (wrong predictions never end the session; the show-me ring always completes the item).
- [ ] OK is dimmed until a product tile is selected; the array stays hidden until OK.
- [ ] After OK the shutter slides away and rows light one by one with running totals and "+b" steps.
- [ ] Predicting 16 for 3 × 4 shows a dashed extra row that fades; predicting 8 pulses the third row and its 12.
- [ ] Tapping the ↻ tile after a reveal turns the array and re-plays the totals as 3, 6, 9, 12 with "4 × 3 = 12".
- [ ] A missed fact comes back two items later and again near the end.
- [ ] "4 × 0" reveals an empty grid with total 0; "6 × 1" reveals one row.
- [ ] Three first-try corrects in a row move to harder tables; two misses in a row move to easier ones.
- [ ] The finish screen lists the twelve facts with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
