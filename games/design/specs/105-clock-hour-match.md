# 105 — Clock Hour Match

## Identity
- Slug: `clock-hour-match`
- Subject / topic: Mathematics / reading o'clock times on an analogue clock and pairing each face with its digital time
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all tiles visible; a board of clock faces and digital times)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Time rule (F-113): the two hands differ in LENGTH (short / long), SHAPE (rounded bar / pointed arrow) and COLOUR (teal / coral) — three cues, never one. Locale rule (F-113, F-211): no spoken time idiom is rendered anywhere; every time is a clock face or a digital numeral "h:00". Digital tiles use the 12-hour form 1:00-12:00 without am/pm, which is language-neutral (24-hour digital display is out of scope for this game; see game 108's note).

## Learning
- Objective: Pairs each analogue clock showing an o'clock time with the digital tile showing the same hour, reading the SHORT hand as the hour while the long hand points to 12.
- Prerequisites: Reads numerals 1-12; has seen a clock face. No reading of words.
- Curriculum links: F-1 (telling time in 8 of 15 sources), F-28 (whole hours: EN 5, US/DE/FR/NL/ES 6, NO/BR 7, SE/DK/FI 7-8, IT ≤ 8), F-21 (analogue clock to whole/half hours in the 12-system common core), F-31 row "Calendar days/months; clock to hour/half" — conservative 7-8, earliest 5 → 6-8 (US 1.MD.B.3 "tell and write time in hours"; England Y1 "tell the time to the hour"; Germany Klasse 1/2 "volle Stunden"; France CP/CE1 "lire l'heure"; Netherlands groep 3/4 "hele uren"; Spain 1º ciclo; Brazil EF02MA19; Sweden åk 1-3 "klockan"; Denmark; Norway 2. trinn; Finland 1-2 "kellonajat"). F-10 (the clock is a manipulative teachers project).
- Common misconceptions (F-113), each with this game's response:
  1. **Hands swapped — the LONG hand pointing at 12 is read as the hour, so every clock is "12 o'clock".** Response: on a wrong pair involving a 12:00 tile, the tapped clock enlarges in the inspector (`ART.bigFace` in zone A); its long hand dims (`ANIM.dimHand`) while the short hand stays bright and its hour sector shades (`ART.hourSector`) — "read this one".
  2. **Nearest-numeral / miscount on faces with only 12 marked (L3): the hour hand at 5 read as 4 or 6.** Response: the inspector counts the hour marks clockwise from 12 to the hand — a small numeral appears at each mark in turn (`ART.countNumeral`, `tone("tap", k)`) and the last one pulses.
  3. **Mirror hours confused (3 and 9, 2 and 10, 4 and 8) — the child reads the hand's height, not its direction round the dial.** Response: L2 boards hold a mirror pair together; the inspector draws the clockwise sweep from 12 to the hand (`ART.sweepArc`, `ANIM.sweep`) so 9 is seen as "further round" than 3.
  4. **Pairing two clocks (or two digital tiles) that "look the same".** Response: the pair predicate is clock ↔ digital only; two tiles of one kind nudge apart and every tile of the OTHER kind lifts briefly (`ANIM.kindLift`) — "one of each".
  5. **Tapping the same tile twice expecting a match.** Response: de-select, `tone("tap")`, no error.

## How it plays
1. **Start screen**: title "Clock Hour Match", the hedgehog (`ART.hedgehog`) at (360, 200), Start, picker.
2. **Board 1 (L1: 4 pairs, 8 tiles)**: the rail shows one dot per board (2 or 3, §6). Zone A (56-200): the hedgehog at (90, 130) and the empty inspector spot at (360, 130) (nothing drawn until a cue). Zones A/B merged below y = 200: a 4 × 2 grid of tiles (`ART.tile`, 100 × 100, gap 20) at columns x = 180 / 300 / 420 / 540 and rows y = 270 / 390. Four tiles are clock faces (`ART.faceSmall` with `ART.tickMajor` × 12, `ART.numeralSmall` at 12 / 3 / 6 / 9, `ART.hourHandSmall`, `ART.minuteHandSmall` pointing to 12, `ART.pin`) and four are digital tiles (`ART.digital`, "3:00" style), all shuffled. No caption.
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (a clock and the digital tile of its hour)**: both glide 16 px toward each other (`ANIM.join`), `tone("correct")`, then lock: alpha 0.6 with `ART.link` drawn between them; the hedgehog `ANIM.bounce`. Praise pop when the board completes.
   - **Not a pair, clock + digital (a reading error)**: both `ANIM.nudge`, `tone("nudge")`, both de-select; the CUE plays in the inspector for 1400 ms: the tapped clock's face is drawn large (`ART.bigFace` r 64 at (360, 130) with big hands `ART.hourHandBig` / `ART.minuteHandBig`) and the misconception hint for that error (Rules) plays on it; then the inspector clears. If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Not a pair, same kind (clock + clock or digital + digital)**: both nudge, `tone("nudge")`, de-select; every tile of the other kind does `ANIM.kindLift` once. Counts as a wrong pair for the hint rule.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut`, then the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-N**: L2 = 5 pairs (10 tiles, 5 × 2 grid: x = 152 / 256 / 360 / 464 / 568, tiles 96 × 96) including one mirror pair (3 and 9, 2 and 10, or 4 and 8); L3 = 5 pairs on faces with ONLY the 12 marked (`ART.numeralSmall` "12" and ticks), so the hour must be counted round. Session = 2 boards at L1 pace, 3 boards when the child reaches L3 by the end of board 2.
6. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 200) `ANIM.celebrate`; the summary = every pair made this session as a chip (`ART.pairChip`, 96 × 40: a 28-px face beside its digital text) in rows of five from y = 330 (x = 360 − 2 × 108 + i × 108), rows 52 apart — the times the child read; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  hedgehog:        { kind: "emoji", value: "🦔", size: 80 },
  tile:            { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  faceSmall:       { kind: "shape", shape: "circle", r: 40, fill: "surface", stroke: "structure", strokeWidth: 3 },
  tickMajor:       { kind: "shape", shape: "rect", w: 3, h: 8, fill: "ink" },            // 12 of them, at the hour positions, 34 px from the centre (small) / 56 px (big)
  numeralSmall:    { kind: "text",  value: "", size: 13, font: "display", color: "ink" },  // "12", "3", "6", "9" at radius 28 (L1-L2); only "12" at L3
  hourHandSmall:   { kind: "shape", shape: "roundRect", w: 7, h: 22, fill: "structure", radius: 3 },   // pivot at its bottom centre; SHORT, WIDE, ROUNDED, TEAL
  minuteHandSmall: { kind: "shape", shape: "polygon", points: [[-2,0],[2,0],[2,-26],[0,-34],[-2,-26]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // LONG, THIN, POINTED, CORAL
  pin:             { kind: "shape", shape: "circle", r: 3, fill: "ink" },
  digital:         { kind: "text",  value: "", size: 30, font: "display", color: "ink" },   // "3:00"
  bigFace:         { kind: "shape", shape: "circle", r: 64, fill: "surface", stroke: "structure", strokeWidth: 4 },
  numeralBig:      { kind: "text",  value: "", size: 18, font: "display", color: "ink" },
  hourHandBig:     { kind: "shape", shape: "roundRect", w: 11, h: 36, fill: "structure", radius: 5 },
  minuteHandBig:   { kind: "shape", shape: "polygon", points: [[-3,0],[3,0],[3,-44],[0,-56],[-3,-44]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },
  hourSector:      { kind: "shape", shape: "arc", r: 58, fill: "accent" },     // a 30° wedge from hour h to h+1, drawn at alpha 0.25 on bigFace
  sweepArc:        { kind: "shape", shape: "arc", r: 50, stroke: "accent", strokeWidth: 5 },   // from 12 clockwise to the hour hand's angle
  countNumeral:    { kind: "text",  value: "", size: 16, font: "display", color: "accent" },   // "1".."12" appearing at the hour marks in turn (L3 cue)
  link:            { kind: "shape", shape: "rect", w: 20, h: 6, fill: "structure" },
  hintRing:        { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:        { kind: "shape", shape: "roundRect", w: 96, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotEmpty:        { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:         { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Hand geometry: each hand is drawn pointing to 12 with its pivot at the face centre and rotated clockwise by its angle: hour hand angle = (h mod 12) × 30°; minute hand angle = 0° (always at 12 in this game). Three cues separate the hands: length (22 vs 34 small / 36 vs 56 big), shape (rounded bar vs pointed arrow), colour (`structure` vs `accent`).

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each tile of a correct pair moves 16 px toward the other (x,y at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  kindLift:  { y: "-=6", duration: 140, ease: "Sine.InOut", yoyo: true, trigger: "every tile of the other kind after a same-kind pair" },
  inspect:   { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "bigFace and its hands appear in zone A (from alpha 0, scale 0.6); reversed to clear" },
  dimHand:   { alpha: 0.3, duration: 250, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "big minute hand dims while the hour sector shades" },
  sectorIn:  { alpha: 0.25, duration: 250, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "hourSector wedge (from alpha 0)" },
  sweep:     { alpha: 1, duration: 600, ease: "Sine.InOut", trigger: "sweepArc drawn progressively from 12 clockwise to the hand (the arc's end angle tweens; alpha from 0)" },
  countIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countNumeral at an hour mark, 220 ms apart (from alpha 0, scale 0.5)" },
  lastPulse: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last countNumeral" },
  bounce:    { y: "-=10", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hedgehog on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                      ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  hedgehog (90,130)      ( inspector: ART.bigFace (360,130) )  │  zone A
200   ├──────────────────────────────────────────────────────────────┤
      │    [clock]     [ 3:00 ]     [clock]     [ 9:00 ]   row y=270  │
      │                                                              │  zone B
      │    [12:00]     [clock]      [ 6:00 ]    [clock]    row y=390  │
      │    x=180       x=300        x=420       x=540     (100×100)   │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Five-pair boards use x = 152 / 256 / 360 / 464 / 568 with 96 × 96 tiles (face r 38, hands scaled 0.95). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3) centred at y = 28, swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` with `ART.tile` tokens; a clock tile draws `ART.faceSmall` centred, 12 × `ART.tickMajor` at radius 34 rotated to their hour, `ART.numeralSmall` at 12 / 3 / 6 / 9 (radius 28) on L1-L2 boards and only "12" on L3 boards, `ART.hourHandSmall` rotated to the hour, `ART.minuteHandSmall` at 12, `ART.pin` on top; a digital tile draws `ART.digital` with the text "h:00".
- Selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the facing edges.
- Inspector: `ART.bigFace` at (360, 130) with 12 ticks at radius 56, `ART.numeralBig` at 12 / 3 / 6 / 9 (radius 46; only 12 on L3), `ART.hourHandBig` / `ART.minuteHandBig` / `ART.pin` (r 5 there); `ART.hourSector` as a wedge from the hour hand's angle to +30°; `ART.sweepArc` from 12 to the hand; `ART.countNumeral`s at radius 46.
- `ART.hintRing` behind a tile. `ART.hedgehog` (90, 130). Tap floors 96-100 ≥ 56; gaps ≥ 8 at five columns, 20 at four.
- Tab order: row-major across the grid (arrows move within the grid per P12).

## Content
Language-neutral (clock faces and digital numerals). A board = a set of hours; each hour yields one clock tile and one digital tile "h:00".

- **L1** (4 pairs, faces with 12 / 3 / 6 / 9 numerals, no mirror pairs on one board): (3, 6, 9, 12) · (1, 2, 6, 12) · (4, 7, 10, 12) · (2, 5, 8, 11)
- **L2** (5 pairs, one mirror pair per board): (3, 9, 6, 12, 5) · (2, 10, 1, 6, 7) · (4, 8, 12, 11, 3) · (1, 11, 2, 10, 6)
- **L3** (5 pairs, faces with only "12" marked, mirror pair included): (5, 7, 11, 1, 3) · (4, 8, 10, 2, 6) · (7, 9, 11, 5, 12) · (1, 11, 4, 8, 6)

Tile layout shuffled per board; a clock and its own digital tile are never horizontally adjacent in the same row on a fresh board. Boards are drawn without repeating a set within a session.

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 14 pairs at most ≈ 6 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, tiles lock with `ART.link`, hedgehog `ANIM.bounce`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer (per anticipated mistake):
  - Clock paired with 12:00 (or any digital) because the long hand points at 12 (hands swapped): both nudge, `tone("nudge")`; the inspector shows the clock large, the minute hand dims (`ANIM.dimHand`) and the hour sector shades (`ANIM.sectorIn`) for 900 ms.
  - Clock paired with the mirror hour (3 ↔ 9, 2 ↔ 10, 4 ↔ 8): both nudge, tone; the inspector shows the clock large with the clockwise sweep from 12 to the hand (`ANIM.sweep`).
  - Off-by-one hour on an L3 face (hand at 5 paired with 4:00 or 6:00): both nudge, tone; the inspector counts the marks from 12 to the hand with `ART.countNumeral`s (`ANIM.countIn`, `tone("tap", k)`), the last one `ANIM.lastPulse`.
  - Any other clock + digital mismatch: both nudge, tone; the inspector shows the clock large with the hour sector shaded.
  - Same-kind pair: both nudge, tone; the other kind's tiles `ANIM.kindLift`.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` until the pair is made (the show-me step for this pattern). The board never resets.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). A board always completes.
- Finish condition: the session's boards complete. No losing state, no clock of any kind other than the ones the child reads.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Clock Hour Match". No words on the play screen; digital times are numerals with a colon.

## Sound
`tone("tap")` on select / de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("tap", k)` per counted hour mark in the L3 cue; `tone("finish")` once. Silent under `?sound=off`. No time is ever spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; the board shows no words in any language).
- [ ] Works at narrow width (400-px iframe: a 5 × 2 board and the inspector area fully visible).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a tile).
- [ ] On every clock the short hand is a wide rounded teal bar and the long hand is a thin pointed coral arrow pointing at 12.
- [ ] Pairing a 3:00 clock with the 12:00 tile shows the clock large with the long hand faded and a shaded wedge after the short hand.
- [ ] Pairing a 9:00 clock with 3:00 shows the clock large with a coral arc sweeping from 12 round to the hand.
- [ ] On a third-level board the faces show only "12"; pairing a 5:00 clock with 4:00 shows numerals counting 1, 2, 3, 4, 5 round the big face.
- [ ] Tapping two clocks makes both nudge and every digital tile hop once.
- [ ] Tapping a tile twice de-selects it with no error.
- [ ] A board with 0-1 mistakes is followed by a bigger board with a mirror pair; a board with 3+ mistakes by a smaller one.
- [ ] The finish screen lists every pair as a small face beside its digital time and no score.
- [ ] With `?sound=off` nothing is audible.
