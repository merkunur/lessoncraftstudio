# 035 — Hundred-Square Add

## Identity
- Slug: `hundred-square-add`
- Subject / topic: Mathematics / two-digit addition by tens-then-ones moves on a hundred square (47 + 25: two moves down, then five moves right)
- Age band: `8-9`
- Interaction pattern: `P7` — trace a path (with the tap-each-waypoint fallback), then a P1 tap to name the sum
- Estimated build size: ~560 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` (this spec declares a taller stage, 720 × 640, per §2). Pattern contract: `catalogue/PATTERNS.md` P7. Sibling games: 008 (counting on along a line), 034 (the next ten).

## Learning
- Objective: Adds a two-digit number to a two-digit number on a hundred square by tracing the tens as moves straight down (+10 each) and then the ones as moves to the right (+1 each, wrapping to the next row), and names the landing cell as the sum.
- Prerequisites: Reads the hundred square (rows of ten); knows that a cell directly below is 10 more; adds ones within a decade.
- Curriculum links: F-21 (+/− within 100 by mental strategies; place value tens/ones), F-31 row "+/− within 100, mental" — conservative 7-9 → 8-9 (US 2.NBT.B.5 "add within 100 using strategies based on place value"; England Y2-3 "add … two-digit numbers … using concrete objects and pictorial representations"; Germany Klasse 2 "Hundertertafel, Addition im Zahlenraum bis 100"; France CE1-CE2 "addition … tableau des nombres"; Netherlands groep 4-5 "honderdveld, rijgen"; Spain 1º ciclo; Brazil EF02MA06; Sweden åk 1-3 "hundrarutan"; Finland grade 2-3).
- Common misconceptions (F-108, F-105, F-109), each with this game's response:
  1. **Tens and ones treated as separate numbers — adding the ones first, or moving right for a ten.** Response: the move strip (`ART.tensChip` "+10" × tens, then `ART.onesChip` "+1" × ones) fixes the order; while a "+10" chip is still open, touching the cell to the RIGHT of the current cell is refused with `ANIM.nudge` and the cell BELOW shows `ART.plusTenLabel` "+10" pulsing for 800 ms — the tens move is enacted where it belongs. Touching the cell below during the ones phase shows `ART.plusOneLabel` "+1" on the right cell in the same way.
  2. **Dropping the carry (47 + 25 = 62: 7 + 5 = 12, the ten forgotten).** Response: the answer tiles always include sum − 10; choosing it replays the path with hop badges and pauses on the row wrap (70 → 71, `ART.wrapArrow`), where `ART.plusOneLabel` pulses — the extra ten was crossed by walking, not by a rule.
  3. **Counting on from the wrong place (starting AT 47: "47, 48, …" so the ones land one short, or one past).** Response: the answer tiles include sum ± 1; choosing one replays the ones moves with `ART.hopBadge` 1 … n and pulses the badge on the first ones cell — hop 1 is the cell after 47.
  4. **Losing place on a long path (F-109).** Response: each completed move fills its chip in the strip (`ART.tensChip` / `ART.onesChip` turn solid), so how many moves remain is always visible; after 2 s without a touch the next correct cell pulses softly (`ANIM.pulse` on `ART.cellNext`) — the P7 idle cue, never a clock.
  5. **Reading the square as a list, not a grid (not seeing "below = +10").** Response: at L1 the whole path is pre-lit (`ART.cellWay`); at L2 only the idle pulse guides; at L3 nothing is pre-lit — the support fades as the structure becomes the child's own (F-46).

## How it plays
1. **Start screen**: title "Hundred-Square Add", the bee (`ART.bee`) at (360, 240), Start, picker.
2. **Item 1 (L1: 23 + 12)**: rail of 12 dots (§6) plus `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A (56-110): the equation (`ART.eqText`, 36 px) "23 + 12 = ?" centred at (140, 84); the move strip from x = 270 at y = 84: one `ART.tensChip` "+10" then two `ART.onesChip` "+1" (chip pitch = width + 4), all hollow. The grid (116-476): a 6-row window of the hundred square — rows w … w + 5 where w = clamp(startRow − 1, 1, 5) (here rows 1-6, cells 1-60) — 10 columns × 6 rows of `ART.cell` (56 × 56, pitch 60; column k centre x = 90 + 60 k, row j centre y = 146 + 60 j), each showing its number (20 px). Cell 23 is drawn as `ART.cellStart` with the bee perched at its top-right. At L1 the path cells 33, 34, 35 are `ART.cellWay`. Zone C (480-640): three answer tiles (`ART.numeralTile`, 96 × 96) at y = 560, x = 240 / 360 / 480 — 35, 25, 36 shuffled — DISABLED until the path is complete.
3. **Tracing**: the child drags a finger from 23 downward (or taps the waypoint cells in order — the fallback, always available). When the pointer enters the armed cell (23 + 10 = 33) the bee flies there (`ANIM.fly`), the cell becomes `ART.cellDone` with `ART.hopBadge` 1, the first chip fills (`ANIM.chipFill`), `tone("tap", 1)`. The armed cell is now 34 (ones phase: right); then 35. Entering any other cell does nothing (P7: only the next waypoint is armed), except the two taught refusals in Learning 1. When the ones move starts from a cell ending in 0 the armed cell is the first cell of the next row and `ART.wrapArrow` draws from the row end to it.
4. **Landing**: after the last move the landing cell becomes `ART.cellLand` and its number `ANIM.landGrow`s; the answer tiles enable (`ANIM.appear`). Tap a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop, `ART.eqText` completes "23 + 12 = 35", the bee `ANIM.buzz`; rail dot fills; next item after 800 ms (grid window rebuilds with `ANIM.appear`).
   - **Wrong, sum − 10 (dropped a ten)**: `ANIM.nudge`, `tone("nudge")`; the path replays from the start with badges, pausing 600 ms on each "+10" move with `ART.plusTenLabel` pulsing (and on the wrap when there is one); ends on the landing cell. Attempt 2.
   - **Wrong, sum ± 1**: nudge + tone; the ones moves replay with badges; the badge on the first ones cell pulses. Attempt 2.
   - **Second wrong**: the replay again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); solved-with-help.
5. **Items 2-12**: per Content/Rules. L1 no carry, one or two tens moves, path pre-lit; L2 no carry, two or three tens, ones to 8, no pre-lit path; L3 the ones cross a ten (a row wrap), no guide.
6. **Finish**: `t("all_done")` (360, 110); the bee (360, 210) `ANIM.celebrate`; the summary = the twelve sums as chips (`ART.eqChip`, 140 × 36, 18 px) in three rows of four from y = 330, first-try items with `ART.dotFull` at their left and helped ones with `ART.dotEmpty`; optionally `t("question_x_of_y")` with solved-first-try over 12 at (360, 470); `play_again` (250, 590), `menu` (470, 590); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  bee:          { kind: "emoji", value: "🐝", size: 36 },
  eqText:       { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  tensChip:     { kind: "shape", shape: "roundRect", w: 44, h: 32, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 8 },   // "+10" 16 px; filled: fill structure, text bg
  onesChip:     { kind: "shape", shape: "roundRect", w: 32, h: 32, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 8 },   // "+1" 16 px; filled likewise
  cell:         { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },        // number 20 px display ink
  cellStart:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structure", stroke: "structure", strokeWidth: 2, radius: 8 },  // number in bg
  cellWay:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },  // L1 pre-lit path
  cellNext:     { kind: "shape", shape: "roundRect", w: 60, h: 60, stroke: "structure", strokeWidth: 3, radius: 10 },                   // idle pulse outline on the armed cell
  cellDone:     { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },
  cellLand:     { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "accent", stroke: "structure", strokeWidth: 3, radius: 8 },    // number 24 px in inkOnAccent
  hopBadge:     { kind: "shape", shape: "circle", r: 10, fill: "accent" },        // move number 13 px display inkOnAccent, cell top-left
  plusTenLabel: { kind: "text",  value: "+10", size: 18, font: "display", color: "accent" },
  plusOneLabel: { kind: "text",  value: "+1", size: 18, font: "display", color: "accent" },
  wrapArrow:    { kind: "shape", shape: "arc", r: 30, stroke: "structure", strokeWidth: 3 },   // drawn from the row's last cell round to the next row's first cell (dashed [6,4])
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },      // numeral 40 px
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:       { kind: "shape", shape: "roundRect", w: 140, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  fly:       { duration: 220, ease: "Sine.InOut", trigger: "bee to the reached cell (x,y set at call); y −=16 then back in a parallel yoyo" },
  chipFill:  { scale: 1.15, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a move chip turns solid" },
  landGrow:  { scale: 1.3, duration: 200, ease: "Back.Out", trigger: "landing cell number after the last move" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "cellNext after 2 s idle; plusTen/plusOne labels on a refusal or in a replay; first ones badge in an off-by-one replay" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused cell; wrong tile" },
  labelIn:   { alpha: 1, y: "-=10", duration: 200, ease: "Sine.Out", yoyo: true, hold: 400, trigger: "plusTen/plusOne label shows for 800 ms then fades (from alpha 0)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  buzz:      { angle: 10, duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "bee on correct" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new grid window; answer tiles enabling (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bee" }
};
```

## Screen layout
Stage **720 × 640** (§2 taller stage; `height: 640` in the Phaser config, nothing else changes). Fixed layout, FIT scaling.
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ rail y=28; "3 of 12" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ "23 + 12 = ?" (140,84)      [+10][+1][+1]  strip from x=270   │  zone A
110   ├──────────────────────────────────────────────────────────────┤
      │  [ 1][ 2][ 3][ 4][ 5][ 6][ 7][ 8][ 9][10]   row y=146          │
      │  [11][12][13][14][15][16][17][18][19][20]   y=206              │
      │  [21][22][23B][24]…                          y=266  B = bee     │  grid
      │  [31][32][33][34][35]…                      y=326  path        │
      │  [41]…                                       y=386              │
      │  [51]…                                       y=446              │
      │   column k centre x = 90 + 60k; cells 56×56, pitch 60          │
480   ├──────────────────────────────────────────────────────────────┤
      │        [ 35 ]        [ 25 ]        [ 36 ]   tiles y=560        │  zone C
640   └──────────────────────────────────────────────────────────────┘
```
Window rows w … w + 5 with w = clamp(startRow − 1, 1, 5); with second addends of at most 3 tens (+1 row for a carry) the landing row is always inside the window.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.eqText` at (140, 84), `wordWrap` width 240. Move strip from x = 270, y = 84: `ART.tensChip`s then `ART.onesChip`s, pitch width + 4; a made move redraws its chip with `THEME.colour.structure` fill and `THEME.colour.bg` text.
- Grid: 60 × `makeTile` 56 × 56 with `ART.cell` tokens (numbers 20 px `THEME.font.display` `THEME.colour.ink`); the start cell `ART.cellStart`; reached cells `ART.cellDone` with `ART.hopBadge` at cell (−20, −20); the armed cell carries `ART.cellNext` during the idle pulse; L1 path cells `ART.cellWay`; the landing cell `ART.cellLand`. `ART.wrapArrow` between a row's last cell and the next row's first. `ART.plusTenLabel` / `ART.plusOneLabel` centred on the cell they point at, 14 px above its centre.
- `ART.bee` perched at the current cell's (+18, −18).
- Drag handling: `pointerdown` on any cell arms the path (the start is fixed); on `pointermove` while down the armed cell's rectangle is tested; `pointerup` leaves the path where it is; tapping the armed cell directly always works (P7 fallback). Keyboard: Tab reaches the armed cell only (then the answer tiles once enabled), Enter makes the move.
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), label 40 px, at y = 560; `ART.showRing` behind the correct tile.
- Tap floors: cells 56 (8-9 floor) at 4-px gaps — acceptable because only the armed cell responds and a mis-tap onto a neighbour is refused; tiles 96.

## Content
Language-neutral (numerals and symbols). Items as (a + b; distractors = sum − 10 and sum + 1, or sum − 1 when sum + 1 would end in 0 — every item's window and path are determined by the rule above):
- **L1** (no carry; b has 1-2 tens; path pre-lit): 23 + 12 · 34 + 21 · 15 + 13 · 42 + 15 · 26 + 22 · 31 + 24 · 13 + 25 · 45 + 13 · 22 + 16 · 36 + 12 · 14 + 23 · 27 + 21
- **L2** (no carry; b has 2-3 tens; ones to 8; no pre-lit path, idle pulse only): 47 + 32 · 25 + 34 · 53 + 26 · 41 + 37 · 32 + 35 · 56 + 23 · 24 + 35 · 63 + 24 · 35 + 33 · 44 + 25 · 51 + 38 · 27 + 32
- **L3** (the ones cross a ten — one row wrap; b has 1-3 tens; no guide): 47 + 25 · 38 + 16 · 56 + 27 · 29 + 34 · 45 + 18 · 67 + 15 · 36 + 27 · 58 + 24 · 19 + 26 · 48 + 35 · 27 + 36 · 64 + 19

Play list of 12 per Rules; shuffled within level; no repeats; tile positions shuffled; the correct slot never repeats twice running.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try items → next level (cap L3). First-try = the correct tile tapped first AND fewer than 2 refused touches during the trace.
- Adaptation: a wrong tile, or a non-first-try item twice running → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], equation completes, bee `ANIM.buzz`, rail dot, next item after 800 ms.
- What happens on a wrong answer:
  - sum − 10 (a ten dropped / the carry forgotten): replay pausing on each "+10" with the label pulsing, and on the wrap at L3; `tone("nudge")`; attempt 2.
  - sum ± 1 (counted the start / stopped early): replay of the ones moves; the first ones badge pulses; attempt 2.
  - A right-neighbour touch during the tens phase: refused with `ANIM.nudge` and "+10" on the cell below (`ANIM.labelIn`); a below touch during the ones phase: refused with "+1" on the right cell. Two or more such refusals make the item non-first-try (F-65) but never end it.
  - Any other cell: refused silently.
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock (the 2-s idle pulse is a cue only).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Hundred-Square Add". The play screen shows only numerals, "+", "=" and "?".

## Sound
`tone("tap", k)` on move k (pitch rises along the path); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("Question 3 of 12", All done, Play again, Menu, praise change; the grid is numerals).
- [ ] Works at narrow width (400-px iframe: the equation, the strip, all six rows of the grid and the three tiles visible; the taller stage scales as one).
- [ ] Keyboard operable (Tab reaches the armed cell, then the answer tiles; Enter moves / picks).
- [ ] Never auto-starts.
- [ ] No losing state (refused touches and wrong tiles never end the session; the show-me ring always completes the item).
- [ ] For 47 + 25 the strip shows two "+10" chips then five "+1" chips, and each chip fills as its move is made.
- [ ] Touching 48 before the tens moves are done wiggles it and shows "+10" over 57; touching 67 during the ones phase shows "+1" over 68.
- [ ] Moving right from 70 wraps to 71 with a curved arrow drawn between them.
- [ ] Answer tiles are dimmed until the last move; the landing cell turns coral and its number grows.
- [ ] Tapping 62 for 47 + 25 replays the path and pauses on each "+10" and on the wrap.
- [ ] After 2 s without a touch the next correct cell pulses; at the first level the whole path is pre-shaded, at the third nothing is.
- [ ] Two first-try items in a row bring a carry; a wrong tile brings no-carry items next.
- [ ] The finish screen lists the twelve sums with filled or hollow dots and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each move is a higher note.
