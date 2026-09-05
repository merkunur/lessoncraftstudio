# 020 — Hundred-Square Trail

## Identity
- Slug: `hundred-square-trail`
- Subject / topic: Mathematics / place on the hundred square: 1 more, 1 less, 10 more, 10 less
- Age band: `6-8`
- Interaction pattern: `P6` — build on a grid (the hundred square is the grid; each item is one tap that selects the target cell, judged per tap; the trail of reached cells is what the child builds)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14 (this spec declares a taller stage, 720 × 720, per §2). Pattern contract: `catalogue/PATTERNS.md` P6 ("hundred-square skip-count trails"). One stated variation: a cell is selected, not toggled — the selected cell becomes the trail's next step. Everything else follows P6.

## Learning
- Objective: Finds and taps the cell on a hundred square that is 1 more, 1 less, 10 more or 10 less than the lit cell, including moves that cross a row boundary.
- Prerequisites: Reads numerals to 100; counts by tens (game 016). No reading beyond numerals and a plus/minus sign.
- Curriculum links: F-108 (digits as independent numbers; zero placeholder), F-109 (skip counting by tens tied to structure — "hundred-square trail" is the named response), F-21 ("+/− within 100 by mental strategies" and "number line to 100" in all twelve systems), F-31 rows "Count to 100; number line to 100" (conservative 7-8) and "+/− within 100, mental" (7-9) → 6-8 (US 1.NBT.C.5 "given a two-digit number, mentally find 10 more or 10 less"; England Y1-2 "count in tens", "10 more and 10 less"; Germany Klasse 2 "Hunderterfeld, Nachbarzehner"; France CE1 "tableau des nombres"; Netherlands groep 4 "honderdveld"; Spain 1º ciclo; Brazil EF02MA05; Sweden åk 1-3; Finland grades 1-2).
- Common misconceptions (F-108, F-109), each with this game's response:
  1. **+10 done as +1 (tapping the cell to the right instead of the cell below).** Response: the tapped cell nudges; the hint enacts the move — a column band (`ART.colBand`) lights the start cell's column and a row-marker (`ART.stepMark`) slides from the start cell down one row (`ANIM.slideDown`) to the correct cell, which is then outlined; the numerals in that column read 34, 44, 54 so "one row down = ten more" is seen, not said.
  2. **Changing the wrong digit (34 + 1 → 44; 34 − 10 → 33).** Response: for ±1 the row band (`ART.rowBand`) lights and the marker slides one cell sideways; for ±10 the column band lights and the marker slides one row; the band shows which digit changes because the other digit stays constant along it.
  3. **Row-boundary confusion (39 + 1: "the next cell is off the edge"; 40 − 1: looking at 30).** Response: L3 includes boundary moves; for +1 from a cell ending in 9 the marker slides to the row's end, then wraps to the start of the next row (`ANIM.slideWrap`: right, then down-and-left) and the two cells 39 and 40 both outline; for −1 from a cell ending in 0 the reverse.
  4. **Digit-order reading of the target (looking for 43 when 34 is lit — de/nl/da word order).** Response: the start cell is always LIT on the square (the child never has to find it), and the operation icon carries the sign and the size (`ART.opTen` / `ART.opOne` with "+"/"−"), so the only thing to find is the neighbour of a cell that is already highlighted.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Hundred-Square Trail"): the snail (`ART.snail`) at (360, 260) above the title, Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 34 + 1).** The Play scene builds on the 720 × 720 stage: the dot rail of 12 hollow dots at y = 28 (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. The prompt row at y = 88: `ART.startNumeral` "34" (40 px) at (280, 88); the operation icon at (360, 88) — `ART.opOne` (a single small square) with `ART.opText` "+ 1" beside it; the answer box (`ART.targetBox`, 72 × 56) at (450, 88) showing `ART.targetText` "?". The hundred square: 100 cells (`ART.cell`, 56 × 56, pitch 60) in 10 rows: cell n (1-100) at column c = (n − 1) mod 10, row r = floor((n − 1) / 10), centre x = 90 + c × 60, y = 136 + r × 60; each cell shows its numeral (20 px). The cell 34 is lit (`ART.cellLit` look) with the snail (`ART.snail`, 36 px) drawn on it. No caption.
3. **Tapping.** The child taps a cell.
   - **Correct (35):** `tone("correct")`; the snail glides from 34 to 35 (`ANIM.glide`, 300 ms) leaving a trail segment (`ART.trail`, 6 px `structure` line from centre to centre) drawn with `ANIM.trailDraw`; the cell 35 takes the `ART.cellDone` look (soft fill) and 34 keeps a trail mark; `ART.targetText` shows "35" with `ANIM.pop`; `GameCore.showPraise(scene, key)` with the next praise key; the rail dot fills; after 900 ms the next item builds: the snail's cell (35) becomes the new lit start, and a new operation icon and "?" appear (`ANIM.appear`). The trail stays on the square for the whole session.
   - **Wrong (e.g. 44 for 34 + 1):** the tapped cell `ANIM.nudge`s, `tone("nudge")`; the enacted hint plays for the operation (Rules); the item stays. Attempt 2.
   - **Wrong again (attempt 2):** the same hint and the correct cell gains the show-me ring (`ART.glowRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop; the snail still moves and the trail still draws).
   - **Tapping the lit start cell or a trail cell:** nothing happens (not an error).
4. **Items 2-12.** Built by the operation rule in Content: each item's start is the cell the snail is on; the operation is drawn from the level's pool subject to the range rule, so the trail wanders across the square. L1 uses ±1 only (no boundary crossings); L2 uses ±10 only; L3 mixes all four and allows row-boundary ±1 moves.
5. **Finish** (after 12 items): Finish scene per §10 on the 720 × 720 stage. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the snail at (360, 220) with `ANIM.celebrate`. Zone B: the whole hundred square redrawn small (`ART.miniCell` 24 × 24, pitch 26, centred at (360, 440)) with the session's trail drawn on it (`ART.trail` at 3 px) and the twelve reached cells filled — the visual summary of the journey; optional `t("question_x_of_y")` with n = first-try items at (360, 600). Zone C: `makeButton play_again` at (250, 660), `makeButton menu` at (470, 660). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 5-6 minutes: 12 items × (one tap + hint/animation ≈ 20-30 s).

## Art registry
```js
const ART = {
  snail:        { kind: "emoji", value: "🐌", size: 36 },     // 96 px on the start and finish screens (size override at call)
  cell:         { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 1, radius: 8 },        // numeral 20 px body ink
  cellLit:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structure", stroke: "structure", strokeWidth: 2, radius: 8 },  // numeral 20 px display bg — the start cell
  cellDone:     { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },  // a reached cell
  trail:        { kind: "shape", shape: "line", w: 6, stroke: "structure", strokeWidth: 6 },
  rowBand:      { kind: "shape", shape: "roundRect", w: 600, h: 60, fill: "accent", radius: 8 },        // drawn at alpha 0.2 across the start cell's row during a ±1 hint
  colBand:      { kind: "shape", shape: "roundRect", w: 60, h: 600, fill: "accent", radius: 8 },        // alpha 0.2 down the start cell's column during a ±10 hint
  stepMark:     { kind: "shape", shape: "roundRect", w: 52, h: 52, stroke: "accent", strokeWidth: 4, radius: 8 },   // the sliding marker
  glowRing:     { kind: "shape", shape: "roundRect", w: 64, h: 64, stroke: "structure", strokeWidth: 4, radius: 10 },
  startNumeral: { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  opOne:        { kind: "shape", shape: "rect", w: 14, h: 14, fill: "accent", stroke: "bg", strokeWidth: 1 },    // a one-cube glyph
  opTen:        { kind: "shape", shape: "rect", w: 14, h: 56, fill: "structure", stroke: "bg", strokeWidth: 1 }, // a ten-rod glyph
  opText:       { kind: "text",  value: "", size: 32, font: "display", color: "ink" },                   // "+ 1", "− 1", "+ 10", "− 10"
  targetBox:    { kind: "shape", shape: "roundRect", w: 72, h: 56, fill: "surface", stroke: "accent", strokeWidth: 3, radius: 10 },
  targetText:   { kind: "text",  value: "?", size: 32, font: "display", color: "ink" },
  miniCell:     { kind: "shape", shape: "rect", w: 24, h: 24, fill: "surface", stroke: "line", strokeWidth: 1 },   // finish summary; reached cells fill structureSoft
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. The operation icon pairs a block glyph (rod = ten, cube = one) with the sign text, so the size of the move is never carried by the sign alone. The art upgrade replaces `ART.snail` and nothing else changes.

## Animation registry
```js
const ANIM = {
  glide:     { duration: 300, ease: "Sine.InOut", trigger: "snail from the start cell to the reached cell (x, y set at call)" },
  trailDraw: { duration: 300, ease: "Sine.Out", trigger: "the new trail segment's end point tweens from the start cell to the reached cell (Graphics redrawn each frame)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "target box when the answer fills in" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong cell" },
  bandIn:    { alpha: 0.2, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1400, trigger: "rowBand / colBand during a hint (from alpha 0), then fades" },
  slideSide: { duration: 400, ease: "Sine.InOut", trigger: "stepMark one cell left or right (x set at call) for ±1" },
  slideDown: { duration: 400, ease: "Sine.InOut", trigger: "stepMark one row down or up (y set at call) for ±10" },
  slideWrap: { duration: 400, ease: "Sine.InOut", trigger: "stepMark to the row's end (x), then a second tween to the next row's start (x, y) for a boundary ±1; the two cells outline in turn" },
  outline:   { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 800, trigger: "stepMark settles on the correct cell (from alpha 0.4), then fades" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new operation icon and target box (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "glowRing on the correct cell (from alpha 0.2); stopped when tapped" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "operation icon on the inactivity cue" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish snail" }
};
```
No flashing: `showMe` cycles at 1 Hz; bands and outlines appear once per hint.

## Screen layout
Stage **720 × 720** (per BUILD-CONVENTIONS §2 the Phaser config `height` becomes 720; nothing else changes), `Scale.FIT`, everything fixed.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]   ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            34 (280,88)   [cube] + 1 (360,88)   [ ? ] (450,88) │  prompt row
108   ├──────────────────────────────────────────────────────────────┤
      │   1   2   3   4   5   6   7   8   9  10   row 0  y=136        │
      │  11  12  13  14  15  16  17  18  19  20   row 1  y=196        │
      │  21  22  23  24  25  26  27  28  29  30   y=256               │
      │  31  32  33 [34] 35  36  37  38  39  40   y=316  (34 lit, snail)│  the square
      │  41  42  43  44  45  46  47  48  49  50   y=376               │
      │  51  ...                                  y=436               │
      │  61  ...                                  y=496               │
      │  71  ...                                  y=556               │
      │  81  ...                                  y=616               │
      │  91  92  93  94  95  96  97  98  99 100   row 9  y=676        │
      │  x = 90 + c×60  (90 … 630); cells 56×56, gap 4                │
720   └──────────────────────────────────────────────────────────────┘
```
The praise pop appears centred over the square (library default). There is no separate zone C; the prompt row (y = 88) is the fixed prompt area.

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 12 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 239 + i × 22); filled dots use `ART.dotFull`. `t("question_x_of_y")` at (360, 48).
- Prompt row: `ART.startNumeral` at (280, 88); the operation icon at (360, 88) = `ART.opOne` or `ART.opTen` centred at (330, 88) with `ART.opText` left-aligned from x = 346 (text "+ 1" / "− 1" / "+ 10" / "− 10"); `ART.targetBox` at (450, 88) with `ART.targetText` centred.
- Square: 100 × `makeTile` 56 × 56 with `ART.cell` tokens and the numeral (20 px `THEME.font.body` `THEME.colour.ink`); the start cell uses `ART.cellLit` tokens (numeral in `THEME.colour.bg`, `THEME.font.display`) with `ART.snail` (36 px) drawn at its centre offset (0, −4); reached cells use `ART.cellDone`; `ART.trail` segments drawn on one `Graphics` beneath the snail, above the cells.
- Hint shapes: `ART.rowBand` centred on the start row (x = 360) or `ART.colBand` centred on the start column (y = 406), at alpha 0.2; `ART.stepMark` starting on the start cell; `ART.glowRing` behind the correct cell.
- Tap floors: cells 56 × 56 (the 6-8 floor); gap 4 (pitch 60) — accepted for a hundred square, whose whole point is adjacency, with the correction that a mis-tap on a neighbour is judged like any other wrong cell and never ends the item.
- Keyboard: arrows move the focus ring across the grid (row-major), Enter taps (P6). Tab order: cells 1 to 100.
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral: numerals and the signs "+" / "−" only. `LOCALE_DATA` not needed.

The trail is continuous, so items are generated from operation pools rather than fixed pairs:
- **Start cell** (chosen at random at Play start from): 34 · 45 · 56 · 23 · 67
- **L1 pool** (±1, no row boundary): +1 · −1 · +1 · −1 (the pool is drawn with replacement; an operation is rejected and redrawn if the result would leave 1-100 or cross a row boundary — i.e. +1 is rejected on a cell ending in 0 and −1 on a cell ending in 1)
- **L2 pool** (±10): +10 · −10 · +10 · −10 (rejected and redrawn if the result would leave 1-100)
- **L3 pool** (all four, boundary crossings allowed): +1 · −1 · +10 · −10 · +1 · +10 (rejected only if the result would leave 1-100)
- **No immediate undo**: an operation that would return the snail to the cell it came from on the previous item is rejected and redrawn (so the trail never doubles back at once).
- The same operation is never drawn more than twice in a row.

Worked session (start 34): 34 +1 → 35 · 35 −1 → 34 is rejected (immediate undo) → +1 → 36 · L2: 36 +10 → 46 · 46 +10 → 56 · 56 −10 → 46 rejected → +10 → 66 · L3: 66 −1 → 65 · 65 +10 → 75 · 75 −10 → 65 rejected → +1 → 76 · 76 +10 → 86 · 86 +1 → 87 · 87 −10 → 77 · 77 +10 → 87 rejected → −1 → 76. Twelve moves, trail on the square.

Play list: 12 items generated in play; the level rises and falls per Rules; the pool is re-read at each item from the current level.

## Rules
- Item count: 12.
- Difficulty progression: after 2 consecutive first-try correct items, the next item's operation comes from the next level's pool (cap L3). "First-try correct" = the correct cell was the first cell tapped.
- Adaptation: a wrong tap on an item, or wrong first-try on 2 consecutive items, draws the NEXT item's operation from one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no tap, the operation icon `ANIM.pulse`s once and the start cell's band (row for ±1, column for ±10) plays `ANIM.bandIn` once; repeats every 8 s. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: `tone("correct")`, snail `ANIM.glide`, `ANIM.trailDraw`, the cell takes `ART.cellDone`, `ART.targetText` fills with `ANIM.pop`, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, rail dot fills, next item after 900 ms with the reached cell as the new start.
- What happens on a wrong answer (per anticipated mistake):
  - **+10 answered as +1 (or −10 as −1): the sideways neighbour tapped**: `ANIM.nudge`, `tone("nudge")`; `ART.colBand` lights the column (`ANIM.bandIn`), `ART.stepMark` slides one row (`ANIM.slideDown`) onto the correct cell and outlines it (`ANIM.outline`).
  - **+1 answered as +10 (or the other digit changed): the cell below tapped for +1**: `ART.rowBand` lights the row, `ART.stepMark` slides one cell sideways (`ANIM.slideSide`) onto the correct cell.
  - **Boundary move missed (39 + 1 → 30 or 38 tapped)**: `ART.rowBand` lights row 3 then row 4 in turn; `ART.stepMark` plays `ANIM.slideWrap` from 39 to the row's end and on to 40; 39 and 40 outline in turn.
  - **Any other cell (e.g. a digit-swapped 43 for 34 + 1)**: the hint for the item's operation plays as above; the band shows the line the answer must lie on.
  - **Tapping the lit start cell or a trail cell**: nothing happens (not an error).
- Retry behaviour: attempt 1 unaided → attempt 2 after the enacted slide → attempt 3 with the glow ring on the correct cell; tapping it completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 12 items solved → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Hundred-Square Trail"
  - No words appear on the play screen; the prompt is numerals, a block glyph and a sign.

## Sound
`GameCore.tone` only (§11): `tone("tap")` on any cell tap; `tone("correct")` on the correct cell; `tone("nudge")` on a wrong cell (mellow, never a buzzer); during a hint `tone("tap", 1)` when the marker slides one cell sideways and `tone("tap", 10)` when it slides one row (a small step for one, a big step for ten — the size of the move is audible, F-213); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "Question 3 of 12", "All done!", "Play again", "Menu" and the praise pops; the play screen has no words.
- [ ] Works at narrow width: in a 400-px-wide iframe the whole 720 × 720 stage is visible (taller than wide), every cell numeral is readable and the cells are separate targets.
- [ ] Keyboard operable: arrow keys move the focus ring across the square, Enter taps; the focus ring is visible on the current cell.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: wrong taps never end the session; the glow ring always completes the item and the trail always reaches twelve cells.
- [ ] The start cell is filled teal with the snail on it and its numeral matches the number in the prompt row.
- [ ] For "34 + 1", tapping 35 moves the snail there, draws a line from 34 to 35 and fills "35" into the box; 35 is then the next start.
- [ ] For "34 + 10", tapping 35 makes the column light up and a marker slide down from 34 to 44 before the second try.
- [ ] For "34 + 1", tapping 44 makes the row light up and the marker slide sideways to 35.
- [ ] At the third level a move like "39 + 1" appears and a wrong tap shows the marker run to the end of the row and on to 40.
- [ ] The operation is never the exact reverse of the previous move, and the snail never leaves the square.
- [ ] Two first-try corrects in a row bring ten-moves, then mixed moves; two misses bring one-moves.
- [ ] The finish screen shows a small hundred square with the session's trail drawn on it and no score beyond the optional "n of 12".
- [ ] With `?sound=off` nothing is audible; with sound on, a sideways hint plays a small step and a downward hint a big one.
