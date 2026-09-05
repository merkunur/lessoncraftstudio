# 041 — Skip Trail

## Identity
- Slug: `skip-trail-hundred`
- Subject / topic: Mathematics / skip counting in 2s, 3s, 5s and 10s on a hundred square, from any start (including off-multiple starts)
- Age band: `6-8`
- Interaction pattern: `P6` — build on a grid (per-tap judgement variant: each tap either extends the trail or is refused with the jump enacted)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6 (hundred-square skip-count trail). This game judges every tap at once instead of on a Check tile (P6 allows the spec to say which); a trail is a sequence, and a wrong cell must be caught before the next one is chosen, exactly as P4's per-tap default.

## Learning
- Objective: Continues a skip-count trail on a hundred square by tapping the next four cells in the sequence, when the trail starts on a multiple AND when it starts off a multiple (3, 5, 7 …).
- Prerequisites: Reads numerals to 100; knows the hundred square's reading order (left to right, then down a row); can count on in ones.
- Curriculum links: F-1 (skip counting in 5 of 15 sources; number sequences), F-21 ("skip counting / number sequences" in all twelve systems), F-31 row "Skip counting 2/5/10" — conservative 7-8, earliest 6 → 6-8 (US 2.NBT.A.2 "count within 1000; skip-count by 5s, 10s, and 100s"; England Y1 "count in multiples of twos, fives and tens" / Y2 "count in steps of 2, 3, and 5 from 0, and in tens from any number"; Germany Klasse 1-2 "Zahlenfolgen, Hundertertafel"; France CP-CE1 "suites de nombres"; Netherlands groep 3-4 "tellen met sprongen"; Spain 1º ciclo "series numéricas"; Brazil EF02MA09; Sweden åk 1-3 "talföljder"; Finland grade 1-2 "lukujonot").
- Common misconceptions (F-109, F-108), each with this game's response:
  1. **Rote chant not tied to position ("2, 4, 6, 8 …" recited but the child taps 7 or 9 after 6).** Response: the wrong cell nudges and empties; then the jump is ENACTED from the last lit cell — `ART.hopMark` counters step across the next cells one by one in reading order (1, 2 for a +2 trail; 1 … 5 for +5) with a rising `tone("tap", k)`, the last mark lands on the correct cell and grows (`ANIM.lastMark`), then all marks fade. The child sees the size of one jump laid on the square, not a verdict.
  2. **Losing the sequence / mixing sequences (taps 10 after 3, 5, 7 — a 5s or 10s habit inside a 2s trail).** Response: the same enacted jump, and on the second wrong tap on the same target the trail's own jumps are labelled: `ART.jumpTag` "+2" appears between every pair of already-lit cells (`ANIM.appear`, 200 ms apart), so the rule is read off the trail itself.
  3. **Cannot start from a non-multiple (3, 5, 7 → taps 8 or 10, "the next number in the 2s").** Response: L2 and L3 trails start off a multiple; the enacted +2 from 7 lands on 9 with the hop marks, and the jump tags show "+2, +2" between 3-5-7. The chant is never the route; the position on the square is.
  4. **"Counting in 10s stays in the same column" not seen — taps 34 or 44 after 4, 14, 24 (the place-value structure of the square, F-108).** Response: on +10 trails the enacted jump is `ART.columnGlow` — a translucent bar dropped over the last lit cell and the cell directly beneath it, with `ART.downArrow` on the target: down one row is +10, the ones digit stays. The column is the hint; no words.
  5. **Over-generalising "5s end in 0 or 5" to an off-multiple 5s trail (13, 18, 23 → taps 25).** Response: the enacted +5 hop marks from 23 land on 28; the second wrong tap adds the "+5" jump tags between 13-18-23 whose ones digits alternate 3 and 8.

## How it plays
1. **Start screen**: title "Skip Trail", the snail (`ART.snail`) at (360, 240), Start, picker.
2. **Item 1 (L1: +2 from 2 — lit 2, 4, 6; targets 8, 10, 12, 14)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. The jump chip (`ART.jumpChip` with `ART.jumpText` "+2") at (612, 28). The hundred square fills zones A + B: 10 × 10 cells (`ART.cell`, 56 × 56, gap 4) — column centres x = 90 + c × 60 (c = 0 … 9), row centres y = 96 + r × 60 (r = 0 … 9); each cell shows its numeral 1 … 100 (22 px `THEME.font.display`, `THEME.colour.ink`). The three given cells (2, 4, 6) are drawn as `ART.cellGiven` (teal wash, teal outline) with `ART.jumpTag` "+2" NOT yet shown; the snail sits on the last given cell (6) at its top-right corner (offset +18, −18), 36 px. Zone C (y 664-720): caption `S("tapNext")` ("Tap the next 4") at (360, 692), 22 px `THEME.colour.inkSoft`, and the step strip to its right: four `ART.stepEmpty` circles at x = 560, 582, 604, 626, y = 692, filling one per correct tap (`ART.stepFull`) — "how many more to tap" without a number.
3. **Tapping**: the child taps a cell. Every cell is a `makeTile`; given and lit cells are `setEnabled(false)`.
   - **Correct (8)**: the cell becomes `ART.cellLit` (`ANIM.light`: fill switches to `structure`, numeral to `bg`, a small pop), `tone("tap", k)` with k = 1 … 4 for the four targets so the pitch climbs along the trail, the snail `ANIM.crawl`s to the new cell (x/y set at call), a `ART.jumpTag` "+2" appears between the previous lit cell and this one (positioned at the midpoint of the two cell centres; for a +10 jump the tag sits between the two rows in the same column), and the next `ART.stepFull` fills. After the 4th correct tap: `tone("correct")`, praise pop (rotation), the snail `ANIM.wiggle`, the rail dot fills; after 800 ms the square resets (`ANIM.clearTrail`: lit and given cells fade back to `ART.cell` and the new item's given cells `ANIM.appear`).
   - **Wrong (e.g. 7 or 9 or 10)**: `ANIM.nudge` on the tapped cell, `tone("nudge")`, the cell returns to `ART.cell`; then the enacted jump from the last lit cell (see Rules — hop marks for +2/+3/+5, column glow for +10); all cells are `setEnabled(false)` during the enactment (≈ 1.6 s) and re-enable after it. The item is now "retried" (never first-try). Attempt 2 on this target.
   - **Second wrong tap on the same target**: the enacted jump again, then the jump tags along the whole given/lit trail (`ANIM.appear` each, 200 ms apart) stay visible for the rest of the item. Attempt 3.
   - **Third wrong tap on the same target**: the show-me — the correct cell gains `ART.showRing` (`ANIM.showMe`); tapping it lights it and the trail continues; the item is solved-with-help (no praise pop at the end; the rail dot still fills).
4. **Items 2-10**: per Content/Rules. The snail always starts on the last given cell. The jump chip changes per item. L3 introduces +3 and trails that cross a decade in the middle of a hop (37, 39, 41 → 43 … 49).
5. **Finish**: `t("all_done")` (360, 110); the snail (360, 220), 96 px, `ANIM.celebrate`; the summary = the ten trails as chips (`ART.trailChip`, 300 × 32) in two columns (x = 200 and x = 520) from y = 320, 44 px apart, each reading the seven numerals "2 4 6 8 10 12 14" in 18 px `THEME.font.display` `THEME.colour.ink` with a filled `ART.dotFull` at the chip's left for first-try trails and a hollow `ART.dotEmpty` for helped ones — a record of what was continued unaided, not a score; `play_again` (250, 660), `menu` (470, 660); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  snail:      { kind: "emoji", value: "🐌", size: 36 },
  cell:       { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },        // numeral 22 px display ink
  cellGiven:  { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },
  cellLit:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structure", stroke: "structure", strokeWidth: 3, radius: 8 },  // numeral 22 px display bg
  jumpChip:   { kind: "shape", shape: "roundRect", w: 88, h: 40, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  jumpText:   { kind: "text",  value: "", size: 26, font: "display", color: "structure" },        // "+2" / "+3" / "+5" / "+10"
  jumpTag:    { kind: "text",  value: "", size: 14, font: "display", color: "accent" },           // "+2" between two lit cells
  hopMark:    { kind: "shape", shape: "circle", r: 9, fill: "accent" },                          // numeral k 12 px display inkOnAccent on it
  columnGlow: { kind: "shape", shape: "roundRect", w: 56, h: 116, fill: "accent", radius: 8 },   // drawn at 25% alpha over two vertically adjacent cells
  downArrow:  { kind: "text",  value: "↓", size: 28, font: "display", color: "inkOnAccent" },
  stepEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "structure", strokeWidth: 2 },
  stepFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" },
  showRing:   { kind: "shape", shape: "roundRect", w: 68, h: 68, stroke: "structure", strokeWidth: 4, radius: 12 },
  trailChip:  { kind: "shape", shape: "roundRect", w: 300, h: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  light:      { scale: 1.1, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a correct cell switches to cellLit" },
  nudge:      { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong cell" },
  hopIn:      { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "each hopMark in turn, 220 ms apart (from alpha 0, scale 0.5)" },
  lastMark:   { scale: 1.5, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the hopMark that lands on the correct cell" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "hopMarks / columnGlow / downArrow 900 ms after the enactment" },
  glowIn:     { alpha: 0.25, duration: 200, ease: "Sine.Out", trigger: "columnGlow (from alpha 0); downArrow appears with it via appear" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "jumpTags; new given cells; downArrow (from alpha 0, scale 0.6)" },
  crawl:      { duration: 320, ease: "Sine.InOut", trigger: "snail to the newly lit cell's top-right corner (x,y set at call)" },
  wiggle:     { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "snail when a trail completes" },
  clearTrail: { alpha: 0, duration: 300, ease: "Sine.In", trigger: "lit/given overlays and tags fade before the next item builds" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on the correct cell (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish snail" }
};
```

## Screen layout
This game declares the taller stage **720 × 720** (BUILD-CONVENTIONS §2); the Phaser config `height` is 720 and nothing else changes.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28        [ +2 ] (612,28) │  zone T
      │                "3 of 10" (360,48)                             │
 56   ├──────────────────────────────────────────────────────────────┤
      │   1   2   3   4   5   6   7   8   9  10     row y=96          │
      │  11  12  13  14  15  16  17  18  19  20     row y=156         │
      │  21  22  …                                  …                 │  zones A+B
      │  …                                          row y=636         │  the hundred square
      │  x = 90 150 210 270 330 390 450 510 570 630  (cells 56×56)    │
664   ├──────────────────────────────────────────────────────────────┤
      │      "Tap the next 4" (360,692)         ○ ○ ○ ○ (560-626,692) │  zone C
720   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Given cells (`ART.cellGiven`) and lit cells (`ART.cellLit`) are overlays drawn on the same cell positions; `ART.jumpTag`s sit at the midpoint between two consecutive trail cells (for a +10 jump, at the midpoint between the two rows in that column; for a jump that wraps a row, at the right edge of the upper row's last cell, x = 660).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.jumpChip` at (612, 28) with `ART.jumpText` centred on it.
- Hundred square: 100 × `makeTile` 56 × 56 with `ART.cell` tokens (`fill: THEME.colour.surface`, `stroke: THEME.colour.line`), numeral 22 px `THEME.font.display` `THEME.colour.ink`; a given cell swaps to `ART.cellGiven`; a lit cell to `ART.cellLit` with the numeral in `THEME.colour.bg`. Rows 1-10 top to bottom, 1 at top-left, 100 at bottom-right.
- `ART.snail` at the top-right corner of the trail head (cell centre + (18, −18)).
- `ART.hopMark` centred on each stepped cell with its numeral k (12 px `THEME.font.display` `THEME.colour.inkOnAccent`); `ART.columnGlow` centred between the last lit cell and the cell below it (y = cell y + 30); `ART.downArrow` centred on the target cell during the glow.
- `ART.showRing` behind the correct cell. Zone C caption 22 px `THEME.font.body` `THEME.colour.inkSoft`; `ART.stepEmpty` / `ART.stepFull` at x = 560, 582, 604, 626, y = 692.
- Tap floors: cells 56 ≥ 56; gaps 4 px between cells — accepted because a mis-tap lands on a numbered cell whose refusal is enacted, never silent, and a 4-px gutter is the hundred square's own geometry (the same trade as P9 stepper tiles). Keyboard: arrows move the focus ring across the grid row-major, Enter taps (P6 rule).
- Under `?embed=1` the picker is not created; nothing else changes.

## Content
Language-neutral (numerals only; one caption string).

Each item = (jump; the three given cells; the four target cells in order). All values ≤ 100.
- **L1** (jump from a multiple; +2, +5, +10): (+2; 2, 4, 6; 8, 10, 12, 14) · (+10; 10, 20, 30; 40, 50, 60, 70) · (+5; 5, 10, 15; 20, 25, 30, 35) · (+2; 12, 14, 16; 18, 20, 22, 24) · (+10; 20, 30, 40; 50, 60, 70, 80) · (+5; 25, 30, 35; 40, 45, 50, 55)
- **L2** (off-multiple starts): (+2; 3, 5, 7; 9, 11, 13, 15) · (+5; 2, 7, 12; 17, 22, 27, 32) · (+10; 4, 14, 24; 34, 44, 54, 64) · (+2; 15, 17, 19; 21, 23, 25, 27) · (+5; 13, 18, 23; 28, 33, 38, 43) · (+10; 8, 18, 28; 38, 48, 58, 68)
- **L3** (+3 trails; decade crossings mid-trail; high +10 trails): (+3; 3, 6, 9; 12, 15, 18, 21) · (+3; 4, 7, 10; 13, 16, 19, 22) · (+10; 7, 17, 27; 37, 47, 57, 67) · (+5; 31, 36, 41; 46, 51, 56, 61) · (+2; 37, 39, 41; 43, 45, 47, 49) · (+3; 22, 25, 28; 31, 34, 37, 40) · (+10; 33, 43, 53; 63, 73, 83, 93)

Play list of 10 per Rules; shuffle within level, levels in order; no item repeats within a session; two consecutive items never share the same jump size when the level pool allows it.

The enacted jump for a wrong tap is the same for every wrong cell — it depends only on the trail's jump: +2 → 2 hop marks; +3 → 3; +5 → 5; +10 → the column glow (no hop marks). Hop marks walk the square's reading order, so a +5 from 17 marks 18, 19, 20, 21, 22 across the row break.

## Rules
- Item count: 10 (one item = one trail of four taps).
- Difficulty progression: 2 consecutive first-try trails (four correct taps, no wrong tap) → next item from the next level up (cap L3).
- Adaptation: a trail with 2 or more wrong taps, or a non-first-try trail on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: per tap — `ANIM.light`, `tone("tap", k)`, snail `ANIM.crawl`, a `ART.jumpTag` between the two cells, a `ART.stepFull`; on the 4th tap — `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (praise only for first-try trails; helped trails get `tone("correct")` and the rail dot without a pop), snail `ANIM.wiggle`, rail dot, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake; all begin with `ANIM.nudge` + `tone("nudge")` and the cell returning to `ART.cell`):
  - Next counting number (7 after 2, 4, 6) or any wrong cell on a +2 / +3 / +5 trail: the hop marks step from the last lit cell to the correct one, `tone("tap", k)` per mark, the last mark grows, all fade after 900 ms.
  - Mixed sequence (10 after 3, 5, 7): the same hop marks; on the 2nd wrong tap on this target the "+2" jump tags appear between all given/lit cells and stay.
  - Off-multiple start error (8 or 10 after 3, 5, 7): the same as above — the hop marks from 7 land on 9.
  - +10 trail, wrong column or wrong row (34 or 44 after 4, 14, 24): `ART.columnGlow` over 24 and 34 with `ART.downArrow` on 34, `ANIM.glowIn`, fades after 900 ms; 2nd wrong tap adds the "+10" tags.
  - "Ends in 0 or 5" (25 after 13, 18, 23): the +5 hop marks from 23 land on 28; 2nd wrong tap adds the "+5" tags.
- Retry behaviour: per target cell — attempt 1 unaided → attempt 2 after the enacted jump → attempt 3 after the jump tags → show-me ring on the correct cell; tapping it lights it and the trail continues; solved-with-help. No attempt 4. Cells are disabled during every enactment (≈ 1.6 s) so a tap cannot land mid-animation.
- Finish condition: 10 trails completed. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Skip Trail"; `tapNext` = "Tap the next 4". The jump chip and tags are numerals with a plus sign, never words.

## Sound
`tone("tap", k)` on the k-th correct cell of a trail (k = 1 … 4, pitch climbs with the trail — F-213); `tone("tap", k)` per hop mark during an enacted jump; `tone("nudge")` on a wrong cell; `tone("correct")` when a trail completes; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("Question 3 of 10", "Tap the next 4", All done, Play again, Menu and praise change with the picker; the square is numerals).
- [ ] Works at narrow width (400-px iframe: all 100 cells legible and tappable, the jump chip and caption visible; the stage is 720 × 720 and scales as one).
- [ ] Keyboard operable (arrow keys move the focus ring around the square; Enter taps the focused cell; given and lit cells are skipped).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong taps still ends in a completed trail via the show-me ring; nothing counts down).
- [ ] Three cells are teal-washed at the start of every item and the snail sits on the last one; tapping a given or lit cell does nothing.
- [ ] Tapping 8 after 2, 4, 6 lights it, moves the snail there, shows "+2" between 6 and 8, and fills one of the four circles at the bottom right.
- [ ] Tapping 7 after 2, 4, 6 wiggles the cell, then two coral counters step 7, 8 from the 6 with rising notes, the second one grows on 8, and they fade.
- [ ] On a +10 trail a wrong tap drops a coral column over the last lit cell and the cell below it, with an arrow on the target.
- [ ] A second wrong tap on the same target adds "+n" labels between every lit cell; a third puts a pulsing ring on the correct cell.
- [ ] A trail starting 3, 5, 7 accepts 9 and refuses 8 and 10; a trail 13, 18, 23 refuses 25 and accepts 28.
- [ ] A +5 enactment from 17 steps across the row break onto 18, 19, 20, 21, 22.
- [ ] Two first-try trails in a row bring an off-multiple start; a trail with two wrong taps brings a multiple-start trail next.
- [ ] The finish screen lists the ten trails as numeral chips with a filled dot for unaided trails and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
