# 107 — Quarter Past or To

## Identity
- Slug: `quarter-past-or-to`
- Subject / topic: Mathematics / reading quarter-hour times (h:15 and h:45) on an analogue clock, including the hour a "quarter to" belongs to
- Age band: `8-9`
- Interaction pattern: `P1` — tap one of N (three or four digital-time tiles)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Time rule (F-113): hands differ in length AND shape AND colour; on error the HOUR HAND'S SECTOR shades and the MINUTE RING (5, 10, 15 … 60) is revealed. Locale rule (F-113, F-211): no spoken idiom is rendered — "quarter past", "quarter to", "viertel vor", "kwart over" never appear; every answer is a digital numeral "h:15" / "h:45" (12-hour form, no am/pm, language-neutral). The title is chrome only.

## Learning
- Objective: Reads a clock showing a quarter-hour time and taps the digital tile that names it (h:15 or h:45), assigning a quarter-to time to the hour the short hand has NOT yet reached.
- Prerequisites: Reads o'clock and half-past times (games 105, 106); knows the minute hand points to 3 at quarter past and to 9 at quarter to (this game teaches the digital reading of those positions, not their names).
- Curriculum links: F-1 (telling time in 8 of 15 sources), F-28 (quarter/5-minute: EN 6, US/FR/NL/DE 7; SE/DK/NO/IT/FI hour-level only or unspecified → two clock tiers, this is tier 2), F-31 row "Clock quarter/5-min/minute" — conservative 8 (7 of 12) → 8-9 (US 2.MD.C.7 "tell and write time … to the nearest five minutes"; England Y2 "quarter past/to the hour"; Germany Klasse 2 "Viertelstunden"; France CE1/CE2 "quart d'heure"; Netherlands groep 4/5 "kwartieren"; Spain 2º/3º; Brazil EF03MA23; the Nordic systems and Italy treat this as 8+ or local practice). F-113 (level order o'clock → half → quarter → 5-minute).
- Common misconceptions (F-113), each with this game's response:
  1. **Hour hand read as the nearest numeral — at 3:45 the short hand is close to 4, so the child taps 4:45.** Response: the tapped tile nudges; on the clock the HOUR SECTOR shades the 30° wedge from 3 to 4 (`ART.hourSector`, `ANIM.sectorIn`) with the "3" numeral pulsing (`ANIM.numeralPulse`) — "still in 3's hour, on the way to 4"; the "4" stays plain.
  2. **Past / to mirrored — the minute hand at 9 read as quarter past (3:15 for a 3:45 face) or the hand at 3 read as quarter to.** Response: the MINUTE RING appears (`ART.ringNumeral` 5, 10 … 60 outside the dial, `ANIM.ringIn`) and `ART.minuteArc` sweeps clockwise from 12 to the long hand (`ANIM.sweep`) — a quarter circle ending at "15" or three quarters ending at "45"; the ring numeral at the hand `ANIM.lastPulse`s.
  3. **Minute hand's numeral read as the minutes ("big hand on 3 → 3 minutes past" → 3:03; "on 9" → 3:09).** Response: the ring reveal again — the "15" (or "45") on the ring appears right beside the dial's "3" (or "9") and pulses; the dial numeral dims to alpha 0.4 for the hold (`ANIM.dimNumeral`).
  4. **Hands swapped (the long hand taken as the hour).** Response: the hour sector cue plus the long hand dimming (`ANIM.dimHand`) — read the short one for the hour.
  5. **Position habit (always the left tile).** Response: the correct tile's slot is shuffled and never repeats twice running (§13); the show-me ring after two wrong taps.

## How it plays
1. **Start screen**: title "Quarter Past or To", the goat (`ART.goat`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3:15)**: rail of 12 dots (§6; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`). Zone A: the clock at (360, 158): `ART.face` (r 90), 12 × `ART.tickMajor` at radius 80, 48 × `ART.tickMinor` at radius 84 (L1-L2 faces), `ART.numeral` at every hour (radius 66) on L1-L2 faces and at 12 / 3 / 6 / 9 only on L3 faces, `ART.hourHand` rotated (h mod 12) × 30° + m × 0.5°, `ART.minuteHand` rotated m × 6°, `ART.pin`. The goat stands at (100, 170). Zone B: three tiles (`ART.timeTile`, 124 × 80) at y = 380, x = 220 / 360 / 500, labelled 3:15 / 3:45 / 3:03 in a shuffled order (four tiles at L2/L3: x = 150 / 290 / 430 / 570). Caption `S("whatTime")` ("What time is it?") at (360, 296), 22 px `THEME.colour.inkSoft`.
3. **Answering**: the child taps a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop (rotation), the digital text is copied onto the clock's readout strip (`ART.readout`, at (360, 250)) with `ANIM.appear`, the goat `ANIM.nod`; rail dot fills; after 800 ms the hands turn clockwise to the next item (`ANIM.handsTurn`) and new tiles `ANIM.appear`.
   - **Wrong — nearest-numeral hour (4:45 for 3:45)**: `ANIM.nudge`, `tone("nudge")`, tile de-selects; the hour-sector cue (misconception 1) for 1200 ms. Attempt 2.
   - **Wrong — mirror (3:15 for 3:45 or the reverse)**: nudge, tone; the ring + sweep cue (misconception 2). Attempt 2.
   - **Wrong — minute as numeral (3:03 / 3:09)**: nudge, tone; the ring cue with the dial numeral dimmed (misconception 3). Attempt 2.
   - **Wrong — any other tile**: nudge, tone; the ring + sweep cue AND the hour sector together. Attempt 2.
   - **Second wrong**: the matching cue again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (readout copies, no praise pop).
4. **Items 2-12**: per Content and Rules. L1 quarter-past faces with three tiles; L2 quarter-to faces with four tiles (the nearest-numeral distractor joins); L3 mixed, faces with only 12 / 3 / 6 / 9 and no minute ticks, four tiles.
5. **Finish**: `t("all_done")` (360, 110); the goat (360, 200) `ANIM.celebrate`; the summary = the twelve times read, as chips (`ART.timeChip`, 100 × 36) in two rows of six from y = 340 (x = 360 − 2.5 × 108 + i × 108), rows 48 apart, each chip a small face (`ART.faceChip`, r 14, with both hands) beside its digital text; first-try chips carry `ART.dotFull` at the left, helped ones `ART.dotEmpty` — a record, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  goat:        { kind: "emoji", value: "🐐", size: 80 },
  face:        { kind: "shape", shape: "circle", r: 90, fill: "surface", stroke: "structure", strokeWidth: 4 },
  tickMajor:   { kind: "shape", shape: "rect", w: 4, h: 12, fill: "ink" },                // 12, radius 80
  tickMinor:   { kind: "shape", shape: "rect", w: 2, h: 6, fill: "inkSoft" },             // 48, radius 84 (L1-L2 faces)
  numeral:     { kind: "text",  value: "", size: 20, font: "display", color: "ink" },      // 1-12 at radius 66 (L1-L2); 12/3/6/9 only (L3)
  hourHand:    { kind: "shape", shape: "roundRect", w: 14, h: 50, fill: "structure", radius: 7 },   // SHORT, WIDE, ROUNDED, TEAL
  minuteHand:  { kind: "shape", shape: "polygon", points: [[-4,0],[4,0],[4,-64],[0,-78],[-4,-64]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // LONG, THIN, POINTED, CORAL
  pin:         { kind: "shape", shape: "circle", r: 6, fill: "ink" },
  hourSector:  { kind: "shape", shape: "arc", r: 84, fill: "accent" },                     // 30° wedge from hour h to h+1, alpha 0.25
  ringNumeral: { kind: "text",  value: "", size: 16, font: "display", color: "accent" },   // "5","10",…,"60" at radius 108, outside the dial
  minuteArc:   { kind: "shape", shape: "arc", r: 100, stroke: "accent", strokeWidth: 6 },  // 12 clockwise to the minute hand
  readout:     { kind: "shape", shape: "roundRect", w: 110, h: 36, fill: "surface2", stroke: "structure", strokeWidth: 2, radius: 8 },   // holds the solved digital text, 24 px display ink
  timeTile:    { kind: "shape", shape: "roundRect", w: 124, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // label 32 px display ink
  showRing:    { kind: "shape", shape: "roundRect", w: 136, h: 92, stroke: "structure", strokeWidth: 4, radius: 16 },
  timeChip:    { kind: "shape", shape: "roundRect", w: 100, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  faceChip:    { kind: "shape", shape: "circle", r: 14, fill: "surface", stroke: "structure", strokeWidth: 2 },   // hands at scale 0.25
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Hands: drawn pointing to 12, pivot at the centre, rotated clockwise — hour hand (h mod 12) × 30° + m × 0.5° (3:45 → 112.5°, three quarters of the way from 3 to 4), minute hand m × 6° (90° or 270°). Three differences (length 50/78, shape bar/arrow, colour teal/coral) separate the hands.

## Animation registry
```js
const ANIM = {
  pop:          { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:        { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  sectorIn:     { alpha: 0.25, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "hourSector wedge (from alpha 0), then fades" },
  numeralPulse: { scale: 1.4, duration: 250, ease: "Back.Out", yoyo: true, repeat: 1, trigger: "the hour's numeral during the sector cue" },
  ringIn:       { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each ringNumeral 5→60 in turn, 60 ms apart (from alpha 0, scale 0.5)" },
  sweep:        { alpha: 1, duration: 700, ease: "Sine.InOut", trigger: "minuteArc drawn from 12 to the minute hand (end angle tweens; alpha from 0)" },
  lastPulse:    { scale: 1.5, duration: 250, ease: "Back.Out", yoyo: true, trigger: "the ring numeral at the minute hand" },
  dimNumeral:   { alpha: 0.4, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "the dial numeral the minute hand points at, during the minute-as-numeral cue" },
  dimHand:      { alpha: 0.3, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "minute hand during the hands-swapped cue" },
  cueOut:       { alpha: 0, duration: 250, ease: "Sine.In", trigger: "ring numerals and minuteArc after the hold" },
  handsTurn:    { duration: 500, ease: "Sine.InOut", trigger: "both hands rotate clockwise to the next item (angles set at call, +360 when needed)" },
  appear:       { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new tiles; readout text (from alpha 0, scale 0.6)" },
  nod:          { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "goat on correct" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish goat" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "2 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                      (ring 5..60 at r=108, on cue)            │
      │   goat (100,170)      ╭─── ART.face (360,158) r=90 ───╮       │  zone A
      │                       │ 12  1  2  3 … numerals r=66  │       │
      │                       ╰──────────────────────────────╯       │
      │                          [ readout (360,250) ]                │
260   ├──────────────────────────────────────────────────────────────┤
      │                    "What time is it?" (360,296)               │
      │        [ 3:15 ]        [ 3:45 ]        [ 3:03 ]   y=380       │  zone B
      │        x=220           x=360           x=500     (124×80)     │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Four-tile items use x = 150 / 290 / 430 / 570 (pitch 140, gap 16). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.goat` (100, 170). Clock at (360, 158): `ART.face`, ticks, `ART.numeral`s, `ART.hourHand`, `ART.minuteHand`, `ART.pin`; cue shapes `ART.hourSector`, `ART.ringNumeral` × 12 at radius 108 (at the angles of 1-12), `ART.minuteArc`, all alpha 0 until a cue. `ART.readout` at (360, 250), empty until solved.
- Tiles: `makeTile` 124 × 80 with `ART.timeTile` tokens, label 32 px `THEME.font.display` `THEME.colour.ink`; `ART.showRing` behind the correct tile.
- Caption at (360, 296), 22 px `THEME.font.body` `THEME.colour.inkSoft`, wordWrap 600.
- Tap floors 124 × 80 ≥ 56; gaps ≥ 16. Tab order: tiles left to right. All tiles `setEnabled(false)` during a cue (≈ 1.5 s).

## Content
Language-neutral (clock faces and digital numerals). Items = (time; distractor tiles). Distractor types: **mirror** = the same hour with the other quarter (h:15 ↔ h:45); **nearest** = the next hour with the same minutes ((h+1):45 — only meaningful for quarter-to faces); **minuteNum** = the minute hand's dial numeral as minutes (h:03 for quarter past, h:09 for quarter to); **wrongHour** = (h+1):15 (quarter-past faces at L3, a plain wrong-hour tile so every L3 item has four tiles).

- **L1** (quarter past; three tiles: correct, mirror, minuteNum; full numerals + minute ticks): 3:15 (3:45, 3:03) · 7:15 (7:45, 7:03) · 10:15 (10:45, 10:03) · 1:15 (1:45, 1:03) · 6:15 (6:45, 6:03) · 11:15 (11:45, 11:03)
- **L2** (quarter to; four tiles: correct, nearest, mirror, minuteNum): 3:45 (4:45, 3:15, 3:09) · 8:45 (9:45, 8:15, 8:09) · 12:45 (1:45, 12:15, 12:09) · 5:45 (6:45, 5:15, 5:09) · 9:45 (10:45, 9:15, 9:09) · 2:45 (3:45, 2:15, 2:09)
- **L3** (mixed; faces with 12 / 3 / 6 / 9 only, no minute ticks; four tiles): 4:45 (5:45, 4:15, 4:09) · 7:15 (7:45, 7:03, 8:15) · 11:45 (12:45, 11:15, 11:09) · 2:15 (2:45, 2:03, 3:15) · 6:45 (7:45, 6:15, 6:09) · 9:15 (9:45, 9:03, 10:15) · 1:45 (2:45, 1:15, 1:09) · 12:15 (12:45, 12:03, 1:15)

Play list: 12 items per Rules, shuffled within level; no time repeats within a session; tile order shuffled per item; the correct slot never repeats twice running. Hands always turn clockwise between items.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tap, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try correct item, the time copied to `ART.readout`, goat `ANIM.nod`, rail dot, hands turn to the next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Nearest-numeral hour ((h+1):45 tapped): `ANIM.nudge` + `tone("nudge")`; `ART.hourSector` shades h → h+1 with the "h" numeral pulsing (`ANIM.numeralPulse`), 1200 ms.
  - Mirror (h:15 for h:45 or the reverse): nudge + tone; the ring numerals appear 5 → 60 (`ANIM.ringIn`), `ART.minuteArc` sweeps from 12 to the hand, the ring numeral at the hand pulses.
  - Minute hand's numeral as minutes (h:03 / h:09): nudge + tone; ring + sweep with the dial numeral under the hand dimmed (`ANIM.dimNumeral`) while its ring numeral pulses.
  - Wrong-hour tile ((h+1):15) or hands-swapped reading: nudge + tone; hour sector cue with the minute hand dimmed (`ANIM.dimHand`).
  - Second wrong tap: the matching cue again + the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring. No attempt 4. An item solved after any wrong tap is not first-try.
- Finish condition: 12 items. No losing state; no clock of any kind except the one being read.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Quarter Past or To"; `whatTime` = "What time is it?". No idiom string exists; the tiles are numerals.

## Sound
`tone("tap")` on a tile tap; `tone("correct")` / `tone("nudge")`; `tone("tap", k)` per ring numeral as the ring appears (k = 1..12, pitch climbing round the dial); `tone("finish")` once. Silent under `?sound=off`. No time is spoken.

## Testing checklist
- [ ] Works in all 11 languages (Question 2 of 12, All done, Play again, Menu, praise change; "What time is it?" changes once translated; the tiles are numerals in every language).
- [ ] Works at narrow width (400-px iframe: the clock with its ring area and four tiles fully visible).
- [ ] Keyboard operable (Tab across the tiles; Enter picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong taps never end the session; the show-me ring always completes the item).
- [ ] The short hand is a wide rounded teal bar and the long hand a thin pointed coral arrow; at 3:45 the short hand sits three quarters of the way from 3 to 4.
- [ ] Tapping 4:45 for a 3:45 face shades a wedge between 3 and 4 and pulses the 3.
- [ ] Tapping 3:15 for a 3:45 face reveals 5, 10 … 60 round the outside and sweeps a coral arc from 12 round to 9, where "45" pulses.
- [ ] Tapping 3:03 for a 3:15 face dims the 3 on the dial while "15" pulses beside it.
- [ ] After a correct tap the time appears in the readout under the clock and the hands turn clockwise to the next time.
- [ ] At the third level the face shows only 12, 3, 6 and 9 and no minute ticks.
- [ ] The correct tile is never in the same position twice in a row.
- [ ] Three first-try corrects in a row move from quarter-past faces to quarter-to faces; a wrong tap moves back.
- [ ] The finish screen lists the twelve times with a small face each, filled dots for first-try items, hollow for helped, and no score.
- [ ] With `?sound=off` nothing is audible.
