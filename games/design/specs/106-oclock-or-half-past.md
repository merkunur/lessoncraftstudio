# 106 — O'clock or Half Past

## Identity
- Slug: `oclock-or-half-past`
- Subject / topic: Mathematics / distinguishing an o'clock time from a half-past time by the minute hand's position (up to 12 / down to 6)
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the clock, then tap a bin)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Time rule (F-113): hands differ in length AND shape AND colour; on error the HOUR HAND'S SECTOR SHADES. Locale rule (F-113, F-211): the bins are labelled by mini-clock icons (minute hand up / minute hand down) — never by a word, because "half seven" means 6:30 in de/nl/sv/da/no/fi and 7:30 in en; no spoken idiom exists anywhere in this game. There is no digital readout either: the sort is purely about the minute hand's position.

## Learning
- Objective: Sorts clock faces into the "minute hand at 12" bin or the "minute hand at 6" bin, reading the LONG hand's position, even when the short hand sits between numerals.
- Prerequisites: Recognises a clock face; can tell the two hands apart when shown (game 105). No reading, no numerals beyond seeing them on the dial.
- Curriculum links: F-1 (telling time in 8 of 15 sources), F-28 (whole and half hours: EN 5, US/DE/FR/NL/ES 6, NO/BR 7, SE/DK/FI 7-8, IT ≤ 8 — every system by 8; F-113 "o'clock/quarters easier than half past"), F-21, F-31 row "Calendar days/months; clock to hour/half" — conservative 7-8, earliest 5 → 6-8 (US 1.MD.B.3 "hours and half-hours"; England Y1 "tell the time to the hour and half past the hour"; Germany Klasse 1/2 "volle und halbe Stunden"; France CE1 "heures et demi-heures"; Netherlands groep 4 "hele en halve uren"; Spain 1º ciclo; Brazil EF02MA19; Sweden åk 1-3 "hel- och halvtimme"; Denmark; Norway 2. trinn; Finland 1-2). F-10.
- Common misconceptions (F-113), each with this game's response:
  1. **Reading the hour hand only — at 7:30 the short hand is "nearly at 8", so the child sorts it as an o'clock ("it's 8 o'clock, nearly").** Response: on the wrong bin the clock returns and the LONG hand pulses (`ANIM.handPulse`); then `ART.minuteArc` sweeps from 12 clockwise to the minute hand (`ANIM.sweep`) — a half circle for half past; the hour sector shades (`ART.hourSector`, "still in 7's hour"). The minute hand decides; the shading shows why the short hand is between numerals.
  2. **Hands swapped at 6:00 — the short hand at 6 is read as the long hand at 6 ("half past").** Response: the clock returns; the long hand (at 12) pulses and `ART.arcZero` (a dot at 12) appears with no sweep; the hour sector from 6 to 7 shades — "the long one is up".
  3. **Minute hand's numeral read as the time ("the big hand is on 6, so 6 o'clock").** Response: the sweep from 12 to 6 shows half the dial covered; L2 includes 6:00 AND 6:30 on the same run so "6" cannot decide.
  4. **The hour hand between numerals is "broken" or "pointing at nothing", so the child hesitates and guesses.** Response: every half-past face shows the short hand exactly midway between two numerals; the shaded sector on error names the hour it is still in; L3 removes the numerals except 12 and 6 so the minute hand's up/down position is the only thing to read.
  5. **Sorting by what the face looks like as a whole ("busy" faces go left).** Response: bins are labelled by a mini clock whose only difference is the long hand (up / down); the dial, numerals and hour hand on the two icons are identical; bin sides are fixed within a level.

## How it plays
1. **Start screen**: title "O'clock or Half Past", the rabbit (`ART.rabbit`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3:00)**: rail of 12 dots (§6; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`). Zone A: a large clock (`makeTile` 180 × 180, transparent, at (360, 158)) drawing `ART.face` (r 80), 12 × `ART.tickMajor` at radius 70, `ART.numeral` at 12 / 3 / 6 / 9 (radius 58) on L1-L2 faces, `ART.hourHand` rotated to (h mod 12) × 30° + m × 0.5°, `ART.minuteHand` rotated to m × 6°, `ART.pin`. The rabbit sits at (110, 170). Zone B: two bins (`ART.bin`, 200 × 130) at y = 380, x = 230 / 490: the left bin's icon is `ART.iconUp` (a mini face with the long hand to 12) and the right's `ART.iconDown` (the same mini face with the long hand to 6); under each icon a count sub-label (`ART.binCount`). Caption `S("whichBin")` ("Which bin?") at (360, 296), 24 px `THEME.colour.inkSoft`.
3. **Sorting**: tap the clock (it lifts: `ANIM.lift`, `tone("tap")`), then tap a bin; a small copy of the face (`ART.faceMini`, r 22, with both hands) glides (`ANIM.glide`) into the bin.
   - **Correct bin**: `tone("correct")`; the bin `ANIM.pop`, its count +1, and the mini face stays in the bin's tray row (up to 6 visible per bin, 26 px apart, then they stack a second row); praise pop every third correct item and the twelfth; rail dot fills; the next clock's hands turn to their new positions (`ANIM.handsTurn`, 400 ms) after 500 ms.
   - **Wrong bin**: the mini copy glides back and vanishes, `tone("nudge")`; then the CUE on the big clock (Rules): the long hand pulses (`ANIM.handPulse`), `ART.minuteArc` sweeps from 12 to the long hand (`ANIM.sweep` — 180° for a half-past face; for an o'clock face `ART.arcZero` simply appears at 12), and `ART.hourSector` shades the 30° wedge from the short hand's hour to the next numeral (`ANIM.sectorIn`) for 1000 ms; then all cue shapes fade. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin's icon gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the clock there completes the item as solved-with-help.
   - **Tapping a bin with nothing selected**: the bin's icon `ANIM.pop` (preview); nothing else.
4. **Items 2-12**: per Content and Rules. L1 clear cases with numerals at 12/3/6/9; L2 the hard cases (6:30 with both hands low, 12:30, 5:30 and 11:30 with the short hand close to the next numeral, and 6:00 alongside 6:30); L3 faces showing only 12 and 6.
5. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 200) `ANIM.celebrate`; the summary = the two bins at y = 400 (x = 230 / 490, 200 × 110) each holding its row of mini faces — every clock sorted, in its bin; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  rabbit:      { kind: "emoji", value: "🐰", size: 80 },
  face:        { kind: "shape", shape: "circle", r: 80, fill: "surface", stroke: "structure", strokeWidth: 4 },
  tickMajor:   { kind: "shape", shape: "rect", w: 4, h: 12, fill: "ink" },              // 12, at radius 70, rotated to each hour
  numeral:     { kind: "text",  value: "", size: 20, font: "display", color: "ink" },    // "12","3","6","9" at radius 58; L3: "12" and "6" only
  hourHand:    { kind: "shape", shape: "roundRect", w: 14, h: 46, fill: "structure", radius: 7 },   // SHORT, WIDE, ROUNDED, TEAL; pivot at bottom centre
  minuteHand:  { kind: "shape", shape: "polygon", points: [[-4,0],[4,0],[4,-56],[0,-70],[-4,-56]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },   // LONG, THIN, POINTED, CORAL
  pin:         { kind: "shape", shape: "circle", r: 6, fill: "ink" },
  hourSector:  { kind: "shape", shape: "arc", r: 74, fill: "accent" },                    // 30° wedge from the hour hand's hour to the next numeral, alpha 0.25
  minuteArc:   { kind: "shape", shape: "arc", r: 62, stroke: "accent", strokeWidth: 6 },  // from 12 clockwise to the minute hand
  arcZero:     { kind: "shape", shape: "circle", r: 7, fill: "accent" },                  // at the 12 position when the minute hand is at 12
  faceMini:    { kind: "shape", shape: "circle", r: 22, fill: "surface", stroke: "structure", strokeWidth: 2 },   // with hourHand/minuteHand drawn at scale 0.3
  bin:         { kind: "shape", shape: "roundRect", w: 200, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconUp:      { kind: "shape", shape: "circle", r: 26, fill: "surface", stroke: "ink", strokeWidth: 3 },   // mini dial; long hand drawn to 12, short hand to 3 (a neutral pose)
  iconDown:    { kind: "shape", shape: "circle", r: 26, fill: "surface", stroke: "ink", strokeWidth: 3 },   // same dial; long hand drawn to 6, short hand midway between 3 and 4
  iconHour:    { kind: "shape", shape: "roundRect", w: 6, h: 14, fill: "structure", radius: 3 },
  iconMinute:  { kind: "shape", shape: "polygon", points: [[-2,0],[2,0],[2,-18],[0,-24],[-2,-18]], fill: "accent", stroke: "inkOnAccent", strokeWidth: 1 },
  binCount:    { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  showRing:    { kind: "shape", shape: "roundRect", w: 212, h: 142, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Hands are drawn pointing to 12 with the pivot at the dial centre and rotated clockwise: hour hand = (h mod 12) × 30° + m × 0.5° (so 7:30 → 225°, midway between 7 and 8); minute hand = m × 6° (0° or 180° here). The two bin icons are identical except for the long hand's direction (and the short hand's small shift), so the bins are told apart by geometry and position, never colour.

## Animation registry
```js
const ANIM = {
  lift:       { y: "-=8", scale: 1.04, duration: 120, ease: "Sine.Out", trigger: "clock selected" },
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "mini face to the bin / back (x,y at call)" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin on a correct sort; icon preview" },
  handsTurn:  { duration: 400, ease: "Sine.InOut", trigger: "both hands rotate to the next item's angles (angle set at call; always clockwise, adding 360 when needed)" },
  handPulse:  { scaleX: 1.6, duration: 250, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the minute hand after a wrong bin (widens and returns)" },
  sweep:      { alpha: 1, duration: 600, ease: "Sine.InOut", trigger: "minuteArc drawn progressively from 12 to the minute hand (end angle tweens; alpha from 0)" },
  sectorIn:   { alpha: 0.25, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1000, trigger: "hourSector wedge (from alpha 0), then fades" },
  cueOut:     { alpha: 0, duration: 250, ease: "Sine.In", trigger: "minuteArc / arcZero after the hold" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "arcZero; new bin icons on a level change (from alpha 0, scale 0.6)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  hop:        { y: "-=10", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "rabbit on each correct sort" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "5 of 12" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                        ╭────────╮                             │
      │   rabbit (110,170)    │  12    │   ART.face (360,158) r=80    │  zone A
      │                       │9  ·  3 │   hands from the centre      │
      │                        ╰───6───╯                              │
260   ├──────────────────────────────────────────────────────────────┤
      │                     "Which bin?" (360,296)                    │
      │      ┌──────────────┐            ┌──────────────┐  bins y=380 │  zone B
      │      │ (mini, up) 0 │            │(mini, down) 0│  x=230/490  │
      │      └──────────────┘            └──────────────┘  (200×130)  │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.rabbit` (110, 170). The big clock: `makeTile` 180 × 180 (fill and stroke passed as `THEME.colour.bg` so the tile is invisible) at (360, 158) with `ART.face`, ticks, numerals, `ART.hourHand`, `ART.minuteHand`, `ART.pin` as children; `ART.hourSector`, `ART.minuteArc`, `ART.arcZero` drawn on the face during a cue only.
- Bins: `makeTile` 200 × 130 (`ART.bin` tokens) at (230, 380) and (490, 380); the icon (`ART.iconUp` / `ART.iconDown` with `ART.iconHour` and `ART.iconMinute` inside) centred at (0, −22); `ART.binCount` at (0, +44); sorted `ART.faceMini` copies in a row along y = +14 from x = −78, 26 px apart (a second row 24 px lower after 6). Bin sides are fixed within a level (left = up, right = down at L1; swapped at L2; up-left again at L3), announced by `ANIM.appear` on the icons at a level change.
- `ART.showRing` around the correct bin. Caption at (360, 296), 24 px `THEME.font.body` `THEME.colour.inkSoft`.
- Tap floors: clock tile 180, bins 200 × 130 (≥ 56). Gap 60. Tab order: clock, left bin, right bin.

## Content
Language-neutral (clock faces and two icons; the caption is the only string). Items = time → bin (up = minute hand at 12; down = minute hand at 6). Faces at L1-L2 show numerals 12 / 3 / 6 / 9; L3 faces show only 12 and 6.

- **L1** (clear cases): 3:00 → up · 7:30 → down · 12:00 → up · 4:30 → down · 9:00 → up · 1:30 → down · 6:00 → up · 10:30 → down
- **L2** (hard cases; 6:00 and 6:30 both present): 6:30 → down · 12:30 → down · 6:00 → up · 5:30 → down · 11:30 → down · 12:00 → up · 8:30 → down · 2:00 → up · 3:30 → down
- **L3** (faces with 12 and 6 only): 7:30 → down · 9:30 → down · 4:00 → up · 11:30 → down · 1:30 → down · 10:00 → up · 6:30 → down · 5:30 → down · 8:00 → up

Play list: 12 items per Rules, shuffled within level; never more than 3 of the same bin in a row (redraw if the shuffle would); no time repeats within a session except when a level's pool is exhausted (then reshuffle). The hands always turn clockwise between items.

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct sorts → next level (cap L3).
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1); at a level change the bin icons re-appear (sides per Visual specification).
- What happens on a correct answer: mini face into the bin, `tone("correct")`, bin `ANIM.pop`, count +1, rabbit `ANIM.hop`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every third correct item and on the twelfth, rail dot, hands `ANIM.handsTurn` to the next time after 500 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Half-past face sorted as o'clock because the short hand is "nearly at the next number" (hour-hand-only reading): mini face returns, `tone("nudge")`; the long hand pulses, the minute arc sweeps 12 → 6 (half the dial), the hour sector shades from the hour the short hand has left toward the next numeral.
  - 6:00 sorted as half past (hands swapped): mini returns, tone; the long hand pulses at 12 with `ART.arcZero` (no sweep), the hour sector shades 6 → 7.
  - Any half-past face sorted by the long hand's numeral ("6 means 6 o'clock"): the same sweep cue — half the dial covered.
  - Any o'clock face sorted as half past: mini returns, tone; long hand pulses, `ART.arcZero` at 12, sector shades from the hour to the next numeral.
  - Bin tapped with nothing selected: preview pop only; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state; no clock of any kind except the one being read.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "O'clock or Half Past"; `whichBin` = "Which bin?". The bins carry NO text (the half-hour idiom trap, F-113); the title is chrome only.

## Sound
`tone("tap")` on selecting the clock; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 6)` as the minute arc completes its sweep; `tone("finish")` once. Silent under `?sound=off`. No time is spoken.

## Testing checklist
- [ ] Works in all 11 languages (Question 5 of 12, All done, Play again, Menu, praise change; the bins show no words in any language).
- [ ] Works at narrow width (400-px iframe: the big clock and both bins fully visible).
- [ ] Keyboard operable (Tab: clock, left bin, right bin; Enter selects / drops).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] The short hand is a wide rounded teal bar and the long hand a thin pointed coral arrow; on 7:30 the short hand sits exactly midway between 7 and 8.
- [ ] Putting 7:30 in the "up" bin makes the long hand pulse, a coral arc sweep from 12 round to 6, and a shaded wedge appear between 7 and 8.
- [ ] Putting 6:00 in the "down" bin makes the long hand pulse with a dot at 12 and a wedge between 6 and 7; no arc sweeps.
- [ ] At the second level 6:00 and 6:30 both appear and are sorted to different bins.
- [ ] At the third level the face shows only 12 and 6.
- [ ] Between items the hands turn clockwise to the new time; they never jump.
- [ ] Bin icons differ only by the long hand's direction; bin counts rise only on correct sorts.
- [ ] Three first-try sorts in a row bring the hard cases; a wrong bin brings clear cases back.
- [ ] The finish screen shows the two bins with their rows of mini clocks and no score.
- [ ] With `?sound=off` nothing is audible.
