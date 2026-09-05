# 108 — Five-Minute Ring

## Identity
- Slug: `five-minute-ring`
- Subject / topic: Mathematics / reading a clock to five minutes by counting the minute ring in fives from 12
- Age band: `8-9`
- Interaction pattern: `P3` — tap to count (the ring marks, in order from 12), then a P1 choice of the digital time
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3. Time rule (F-113): hands differ in length AND shape AND colour; the hour sector shades on a wrong hour. Locale rule (F-113, F-211): nothing is spoken and no idiom is rendered; the answer is a digital numeral "h:mm" (12-hour, no am/pm, language-neutral; the 24-hour display some locales use for afternoons is out of scope — a clock face has no afternoon). Skip counting in fives is the mechanism (F-109): the ring is counted, never guessed.

## Learning
- Objective: Counts the minute ring in fives from 12 to the minute hand by tapping each mark in turn (5, 10, 15 …), then taps the digital time that matches, keeping the hour from the short hand.
- Prerequisites: Skip counts in fives to 60 (game 040 territory); reads o'clock and half-past times (105, 106). No reading beyond one caption.
- Curriculum links: F-1 (telling time in 8 of 15 sources), F-28 (quarter/5-minute: EN 6, US/FR/NL/DE 7 — the second clock tier), F-109 (skip counting; "rote chant not tied to groups" — here each chant word is a tapped mark), F-31 row "Clock quarter/5-min/minute" — conservative 8 → 8-9 (US 2.MD.C.7 "to the nearest five minutes"; England Y2 "five minutes"; Germany Klasse 2/3 "Minuten"; France CE2; Netherlands groep 5 "minuten"; Spain 2º/3º; Brazil EF03MA23; Nordic/IT local practice). F-113 (minute hand read as the numeral is the target error; level order ends at 5-minute).
- Common misconceptions (F-113, F-109), each with this game's response:
  1. **The minute hand's numeral read as the minutes ("big hand on 2 → 2 past").** Response: the count IS the cue — tapping mark 1 shows "5", mark 2 shows "10" (`ART.countBadge`); the digital tiles include h:02 as a distractor; if it is tapped after a count that ended on 10, the badges replay in turn (`ANIM.replay`) and the "10" badge pulses beside the dial's "2".
  2. **Hour hand read as the nearest numeral — at 6:40 the short hand is near 7, so 7:40.** Response: the tapped tile nudges and `ART.hourSector` shades the wedge from 6 to 7 with the "6" pulsing (`ANIM.numeralPulse`): the short hand has not reached 7.
  3. **Counting in ones, or losing the count (5, 10, 15, 25).** Response: the child cannot skip a mark: taps must go round in order (a later mark refuses with `ANIM.nudge`), each mark shows its running total ON the mark, and a rising tone accompanies each (F-109 "each chant word lights a group").
  4. **Starting the count at 1 on the first mark (mark 1 = "1", so the hand on 7 = "7 minutes").** Response: the first badge always reads "5"; the marks carry no numerals of their own until tapped, so there is no "1" to read.
  5. **Hands swapped — the long hand's mark read as the hour (7:05 read as 1:35).** Response: L3 tiles include the swapped-hands time; tapping it dims the long hand (`ANIM.dimHand`) and shades the hour sector — the hour comes from the short hand.

## How it plays
1. **Start screen**: title "Five-Minute Ring", the tortoise (`ART.tortoise`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3:10)**: stage 720 × 640 (Screen layout). Rail of 12 dots (§6; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`). The clock at (360, 232): `ART.face` (r 92), 12 × `ART.tickMajor` at radius 82, `ART.numeral` at every hour (radius 68) on L1-L2 faces (only "12" on L3), `ART.hourHand` at (h mod 12) × 30° + m × 0.5°, `ART.minuteHand` at m × 6°, `ART.pin`. Around the dial, OUTSIDE it, the ring: 12 marks (`makeTile` 56 × 56, transparent, labelled `ART.markDot`) at radius 138 at the angles of 1 … 12 (mark k at angle k × 30° clockwise from 12); the tortoise at (80, 232). Below, three digital tiles (`ART.timeTile`, 124 × 80) at y = 470, x = 220 / 360 / 500 (four at L3: x = 150 / 290 / 430 / 570), **disabled** until the count reaches the minute hand. Caption `S("countFives")` ("Count in fives") at (360, 396), 22 px `THEME.colour.inkSoft`.
3. **Counting**: the child taps mark 1 (the mark at "1"). It plays `tone("tap", 1)`, `ANIM.pop`, and a `ART.countBadge` with "5" appears on the mark; the mark's dot fills (`ART.markDone`). Then mark 2 → "10" with `tone("tap", 2)`, and so on round the ring.
   - **Tapping a later mark first** (skipping): the mark `ANIM.nudge`s, `tone("nudge")`, nothing else; the next expected mark pulses (`ANIM.pulse`) after 1 s of no tap.
   - **Tapping an already counted mark**: nothing happens (one-to-one, enforced by the mark).
   - **Tapping the mark under the minute hand** (the last one): its badge plays `ANIM.lastBadge`, `ART.totalBadge` ("10") appears at (360, 130) above the dial with `ANIM.appear`, the remaining marks dim to alpha 0.4, and after 600 ms the digital tiles enable.
4. **Answering**: the child taps a digital tile.
   - **Correct (3:10)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); the time is copied onto the readout (`ART.readout` at (360, 330)) with `ANIM.appear`; the tortoise `ANIM.nod`; rail dot fills; after 800 ms the badges clear, the marks reset, the hands turn clockwise (`ANIM.handsTurn`) and new tiles appear.
   - **Wrong — minute as numeral (3:02)**: `ANIM.nudge`, `tone("nudge")`; the replay: badges hide, then re-appear in order 5, 10 … with `tone("tap", k)` (`ANIM.replay`, 300 ms apart), the last badge `ANIM.lastBadge`, `ART.totalBadge` pulses. Attempt 2.
   - **Wrong — nearest-numeral hour (4:10)**: nudge, tone; `ART.hourSector` shades 3 → 4 (`ANIM.sectorIn`) with the "3" numeral pulsing. Attempt 2.
   - **Wrong — swapped hands (L3)**: nudge, tone; the long hand dims (`ANIM.dimHand`) while the sector shades. Attempt 2.
   - **Second wrong**: the matching cue again, then the show-me ring (`ART.showRing`, `ANIM.showMe`) on the correct tile; tapping it completes the item as solved-with-help.
5. **Items 2-12**: per Content and Rules. L1 minutes 5-30 (the short hand in the first half of its hour); L2 minutes 35-55 (the short hand close to the NEXT numeral — the nearest-numeral trap); L3 faces with only "12" marked, minutes with a leading zero (7:05) and the swapped-hands tile.
6. **Finish**: `t("all_done")` (360, 110); the tortoise (360, 210) `ANIM.celebrate`; the summary = the twelve times as chips (`ART.timeChip`, 100 × 36, a `ART.faceChip` with hands beside the digital text) in two rows of six from y = 360 (x = 360 − 2.5 × 108 + i × 108), rows 48 apart; first-try chips with `ART.dotFull` at the left, helped with `ART.dotEmpty`; `play_again` (250, 590), `menu` (470, 590); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  tortoise:    { kind: "emoji", value: "🐢", size: 80 },
  face:        { kind: "shape", shape: "circle", r: 92, fill: "surface", stroke: "structure", strokeWidth: 4 },
  tickMajor:   { kind: "shape", shape: "rect", w: 4, h: 12, fill: "ink" },                // 12, radius 82
  numeral:     { kind: "text",  value: "", size: 20, font: "display", color: "ink" },      // 1-12 at radius 68 (L1-L2); "12" only (L3)
  hourHand:    { kind: "shape", shape: "roundRect", w: 14, h: 50, fill: "structure", radius: 7 },   // SHORT, WIDE, ROUNDED, TEAL
  minuteHand:  { kind: "shape", shape: "polygon", points: [[-4,0],[4,0],[4,-66],[0,-80],[-4,-66]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // LONG, THIN, POINTED, CORAL
  pin:         { kind: "shape", shape: "circle", r: 6, fill: "ink" },
  hourSector:  { kind: "shape", shape: "arc", r: 86, fill: "accent" },                     // 30° wedge h → h+1, alpha 0.25
  markDot:     { kind: "shape", shape: "circle", r: 9, fill: "surface", stroke: "structure", strokeWidth: 3 },   // an uncounted ring mark (label of the 56×56 mark tile)
  markDone:    { kind: "shape", shape: "circle", r: 9, fill: "structure" },                // a counted mark
  countBadge:  { kind: "shape", shape: "circle", r: 16, fill: "structure" },              // "5","10",… on it, 16 px display, color bg
  totalBadge:  { kind: "text",  value: "", size: 40, font: "display", color: "structure" },   // the count's last number, above the dial
  readout:     { kind: "shape", shape: "roundRect", w: 110, h: 36, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 8 },   // solved digital text, 24 px display ink
  timeTile:    { kind: "shape", shape: "roundRect", w: 124, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // label 32 px display ink
  showRing:    { kind: "shape", shape: "roundRect", w: 136, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },
  timeChip:    { kind: "shape", shape: "roundRect", w: 100, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  faceChip:    { kind: "shape", shape: "circle", r: 14, fill: "surface", stroke: "structure", strokeWidth: 2 },   // hands at scale 0.25
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Ring geometry: mark k (k = 1 … 12) is centred at (360 + 138 × sin(k × 30°), 232 − 138 × cos(k × 30°)); neighbouring marks are 71 px apart centre to centre, so 56-px tiles leave a 15-px gap (≥ 12, §3). Hands: pivot at the dial centre, drawn to 12, rotated clockwise; three differences (length 50/80, shape bar/arrow, colour teal/coral).

## Animation registry
```js
const ANIM = {
  pop:          { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a mark counted; correct tile" },
  nudge:        { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a mark tapped out of order; wrong tile" },
  pulse:        { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the next expected mark after an out-of-order tap or 6 s idle" },
  lastBadge:    { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the badge on the mark under the minute hand" },
  appear:       { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "totalBadge; readout text; new tiles (from alpha 0, scale 0.6)" },
  replay:       { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countBadge re-appears in order, 300 ms apart (from alpha 0, scale 0.5)" },
  sectorIn:     { alpha: 0.25, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "hourSector wedge (from alpha 0), then fades" },
  numeralPulse: { scale: 1.4, duration: 250, ease: "Back.Out", yoyo: true, repeat: 1, trigger: "the hour's numeral during the sector cue (L1-L2); on L3 the hour hand itself pulses" },
  dimHand:      { alpha: 0.3, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "minute hand during the swapped-hands cue" },
  dimMarks:     { alpha: 0.4, duration: 200, ease: "Sine.Out", trigger: "uncounted marks after the count reaches the minute hand" },
  handsTurn:    { duration: 500, ease: "Sine.InOut", trigger: "both hands rotate clockwise to the next item (angles at call, +360 when needed)" },
  nod:          { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tortoise on correct" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish tortoise" }
};
```

## Screen layout
Stage **720 × 640** (BUILD-CONVENTIONS §2 allows up to 720 × 720; the `height` in the Phaser config is 640 and nothing else changes). Zone C sits at 560-640.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "1 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                     ( mark 12 at (360,94) )                   │
      │              ( mark 11 )   "10" total (360,130)  ( mark 1 )   │
      │ tortoise  ( mark 10 )   ╭── ART.face (360,232) ──╮ ( mark 2 ) │  zone A
      │ (80,232)  ( mark 9 )    │  12 1 2 3 … r=92     │  ( mark 3 )  │  (56-360)
      │              ( mark 8 ) ╰──────────────────────╯ ( mark 4 )   │
      │                   ( mark 7 ) ( mark 6 ) ( mark 5 )            │
      │                      [ readout (360,330) ]                    │
370   ├──────────────────────────────────────────────────────────────┤
      │                    "Count in fives" (360,396)                 │
      │        [ 3:10 ]        [ 3:02 ]        [ 4:10 ]   y=470       │  zone B
      │        x=220           x=360           x=500     (124×80)     │
560   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
640   └──────────────────────────────────────────────────────────────┘
```
Four-tile items (L3) use x = 150 / 290 / 430 / 570. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.tortoise` (80, 232). Clock at (360, 232): `ART.face`, `ART.tickMajor` × 12, `ART.numeral`s, `ART.hourHand`, `ART.minuteHand`, `ART.pin`; `ART.hourSector` alpha 0 until a cue.
- Ring marks: 12 × `makeTile` 56 × 56 (fill and stroke passed as `THEME.colour.bg` so the tile is invisible) at the ring positions, each labelled `ART.markDot`; a counted mark swaps its label to `ART.markDone` and draws `ART.countBadge` at (0, −26) (toward the outside of the ring) with the running total in 16 px `THEME.font.display` `THEME.colour.bg`.
- `ART.totalBadge` at (360, 130); `ART.readout` at (360, 330), empty until solved.
- Digital tiles: `makeTile` 124 × 80 (`ART.timeTile` tokens), label 32 px; disabled (alpha 0.5) until the count completes; `ART.showRing` behind the correct tile.
- Caption at (360, 396), 22 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tap floors: marks 56 (gap 15), tiles 124 × 80 (gap 16). Tab order: marks 1 → 12 clockwise, then the digital tiles left to right.

## Content
Language-neutral (clock faces and digital numerals; one caption string). Items = (time; distractor tiles). Distractor types: **minuteNum** = h:0k where k = the minute hand's dial numeral (3:10 → 3:02); **nearest** = (h+1):mm (the hour read as the nearest numeral); **swapped** = the hands read the other way round (7:05 → 1:35; only when the result is a valid 5-minute time with hour 1-12).

- **L1** (minutes 5-30; three tiles: correct, minuteNum, nearest; full numerals): 3:10 (3:02, 4:10) · 7:25 (7:05, 8:25) · 1:05 (1:01, 2:05) · 10:20 (10:04, 11:20) · 4:15 (4:03, 5:15) · 8:30 (8:06, 9:30)
- **L2** (minutes 35-55, the short hand near the next numeral; three tiles): 2:50 (2:10, 3:50) · 6:40 (6:08, 7:40) · 9:55 (9:11, 10:55) · 11:35 (11:07, 12:35) · 5:45 (5:09, 6:45) · 1:50 (1:10, 2:50)
- **L3** (faces with "12" only; four tiles: correct, minuteNum, nearest, swapped): 7:05 (7:01, 8:05, 1:35) · 3:55 (3:11, 4:55, 11:15) · 12:20 (12:04, 1:20, 4:00) · 10:40 (10:08, 11:40, 8:50) · 6:10 (6:02, 7:10, 2:30) · 4:35 (4:07, 5:35, 7:20)

Note on L1 item 1:05: its minuteNum tile is "1:01" (mark 1 read as one minute). Note on L2 item 2:50: its minuteNum tile "2:10" is also a valid time — that is the trap (mark 10 read as ten minutes).

Play list: 12 items per Rules, shuffled within level; no time repeats; tile order shuffled per item; the correct slot never repeats twice running; hands turn clockwise between items.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). "First-try" = the correct tile was the first tile tapped (out-of-order mark taps during the count do not count against it — they are refused, not judged).
- Adaptation: a wrong tile, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- Idle cue (never a clock): after 6 s without a tap during the count, the next expected mark `ANIM.pulse`s once; repeats every 6 s of inactivity. Nothing is displayed about time; nothing ends.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try correct item, the time copied to `ART.readout`, tortoise `ANIM.nod`, rail dot, hands turn after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Minute hand's numeral as minutes (h:0k): `ANIM.nudge` + `tone("nudge")`; the badge replay round the ring with rising tones, last badge `ANIM.lastBadge`, total pulses.
  - Nearest-numeral hour ((h+1):mm): nudge + tone; `ART.hourSector` shades h → h+1, the "h" numeral pulses (on L3 the hour hand itself pulses).
  - Swapped hands (L3): nudge + tone; the long hand dims while the sector shades.
  - A later mark tapped during the count: nudge + tone; the next expected mark pulses. Not an attempt.
  - Second wrong tile: the matching cue again + the show-me ring; solved-with-help.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring. No attempt 4.
- Finish condition: 12 items. No losing state; no clock of any kind except the one being read.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Five-Minute Ring"; `countFives` = "Count in fives".

## Sound
`tone("tap", k)` on the k-th counted mark (pitch climbs round the ring — one note per group of five, F-109, F-213); `tone("nudge")` on an out-of-order mark or a wrong tile; `tone("correct")`; `tone("finish")` once. Silent under `?sound=off`. No time is spoken.

## Testing checklist
- [ ] Works in all 11 languages (Question 1 of 12, All done, Play again, Menu, praise change; "Count in fives" changes once translated).
- [ ] Works at narrow width (400-px iframe: the whole ring, the clock and the tiles fully visible on the 640-tall stage).
- [ ] Keyboard operable (Tab walks the marks clockwise then the tiles; Enter counts / picks; Enter on a counted mark does nothing).
- [ ] Never auto-starts.
- [ ] No losing state (wrong tiles never end the session; the show-me ring always completes the item).
- [ ] The first tapped mark shows "5", never "1"; each next mark shows 5 more.
- [ ] Tapping a mark further round before the earlier ones nudges it and nothing is counted; tapping a counted mark does nothing.
- [ ] The digital tiles stay dimmed until the mark under the long hand is tapped; then the total appears above the dial.
- [ ] Tapping 3:02 for a 3:10 face replays the badges 5, 10 with rising notes and pulses the 10.
- [ ] Tapping 7:40 for a 6:40 face shades a wedge between 6 and 7 and pulses the 6.
- [ ] At the third level the face shows only "12", times read "7:05", and a swapped-hands tile such as 1:35 dims the long hand when tapped.
- [ ] After a correct tap the time shows in the readout and the hands turn clockwise to the next time.
- [ ] Three first-try corrects in a row bring times past the half hour; a wrong tile brings earlier minutes back.
- [ ] The finish screen lists the twelve times with small faces, filled dots for first-try, hollow for helped, and no score.
- [ ] With `?sound=off` nothing is audible.
