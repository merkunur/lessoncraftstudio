# 036 — Count Back Across Ten

## Identity
- Slug: `count-back-crossing-ten`
- Subject / topic: Mathematics / two-digit subtraction on a number line crossing a ten (42 − 17 = 42 − 10 − 2 − 5)
- Age band: `8-9`
- Interaction pattern: `P7` — trace a path (with the tap-each-waypoint fallback), then a P1 tap to name the difference
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P7. Sibling games: 008 (counting on), 034 (the next ten), 035 (tens-then-ones on the hundred square).

## Learning
- Objective: Subtracts a two-digit number that crosses a ten by hopping back ten, then back to the ten, then the rest along a number line, and names the landing number as the difference.
- Prerequisites: Counts back within a decade; knows "10 less" as one hop; bonds to 10 (game 004) and the complement to the next ten (game 034).
- Curriculum links: F-21 (+/− within 100 by mental strategies), F-31 row "+/− within 100, mental" — conservative 7-9 → 8-9 (US 2.NBT.B.5 "subtract within 100 using strategies based on place value"; England Y2-3 "subtract … two-digit numbers"; Germany Klasse 2 "Subtraktion mit Zehnerübergang, Rechenstrich"; France CE1-CE2 "soustraction … droite graduée"; Netherlands groep 4 "aftrekken over het tiental, lege getallenlijn"; Spain 1º ciclo; Brazil EF02MA06; Sweden åk 1-3 "tiotalsövergång"; Finland grade 2-3).
- Common misconceptions (F-106, F-108), each with this game's response:
  1. **Smaller-from-larger (42 − 17 → "4 − 1 = 3, 7 − 2 = 5" → 35; Brown & Burton).** Response: there is no waypoint at 35 — a finger passing over it lands nowhere (refused by construction, F-61); the answer tiles include 35, and choosing it draws `ART.ghostMark` on the 35 tick, replays the three hops to 25, and then draws `ART.diffArc` from 35 back to 25 labelled `ART.diffLabel` "10" — the bug's answer is exactly one ten too big, and the ten is shown, not explained.
  2. **Counting back off-by-one (the start counted as the first step: "42, 41, 40 …").** Response: hop 1 is always the whole "−10" so the ones counting starts from a round ten; on a result ± 1 answer the last hop replays with `ART.unitBadge`s 1 … n on each unit tick, and badge 1 (on the ten minus one) pulses — the first count lands one below the ten, not on it.
  3. **Not using the ten as a landmark (hopping 42 → 25 in one guess or unit by unit).** Response: the three waypoints (`ART.padWay`) stand at start − 10, the ten, and the result; only the next one is armed; the hop chips (`ART.hopChip` "−10", "−2", "−5") fix the route at L1, merge into "−10, −7" at L2 (the "−7" splits into "−2 done, −5 left" when the ten is reached, `ANIM.chipSplit`) and into a single "−17" at L3 — the decomposition becomes the child's own (F-46).
  4. **Take-away only, no idea of the size of the jump (F-106).** Response: each hop draws as an arc (`ART.hopArc`) whose width IS the amount, with the amount written on it (`ART.arcLabel`); after landing the three arcs stay visible so the child sees 10 + 2 + 5 = 17 as three widths that together span 42 → 25.
  5. **Language interference (de/nl/da inverted number words).** Response: numerals only, tens-then-ones layout of the line; no number words are shown.

## How it plays
1. **Start screen**: title "Count Back Across Ten", the kangaroo (`ART.kangaroo`) at (360, 200), Start, picker.
2. **Item 1 (L1: 42 − 17)**: rail of 12 dots (§6) plus `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the equation (`ART.eqText`, 36 px) "42 − 17 = ?" at (140, 84); the hop chips from x = 290, y = 84: `ART.hopChip` "−10", "−2", "−5" (pitch 60), hollow. The number line: `ART.lineBar` at y = 250 spanning units lo = result − 2 (23) to hi = start + 2 (44) at 28 px per unit (unit u at x = 40 + 28 (u − lo)); `ART.tick` on every unit with `ART.tickLabel` (14 px) under every tick at L1; the kangaroo stands on 42 (above the line, y = 214). Three waypoint pads (`ART.padWay`, 56 × 56) on stems (`ART.stem`): pad 1 above the line at 32 (y = 190), pad 2 below at 30 (y = 310), pad 3 above at 25 (y = 190); at L1 each pad shows its order number (`ART.padOrder` 1, 2, 3) and is otherwise blank — the landing number appears only when reached. Zone B: three answer tiles (`ART.numeralTile`, 96 × 96) at y = 420, x = 240 / 360 / 480: 25, 35, 24 shuffled, DISABLED until the path is complete. Zone C: empty.
3. **Hopping**: the child drags from the kangaroo leftward (or taps the pads in order — the fallback). When the pointer reaches pad 1 the kangaroo hops there (`ANIM.hop`), the pad shows "32" (`ART.padNum`), `ART.hopArc` draws from 42 to 32 with `ART.arcLabel` "−10", the first chip fills (`ANIM.chipFill`), `tone("tap", 1)`. Then pad 2 (30, "−2"), then pad 3 (25, "−5"). Reaching a pad out of order does nothing; after 2 s without a touch the next pad pulses (`ANIM.pulse`) — the P7 idle cue.
4. **Landing**: pad 3's number grows (`ANIM.landGrow`), the answer tiles enable (`ANIM.appear`). Tap a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop, `ART.eqText` completes "42 − 17 = 25", the kangaroo `ANIM.bounce`; rail dot fills; next item after 800 ms (line rebuilds with `ANIM.appear`).
   - **Wrong, result + 10 (smaller-from-larger)**: `ANIM.nudge`, `tone("nudge")`; `ART.ghostMark` on the 35 tick; the hops replay with arcs; `ART.diffArc` from 35 to 25 with `ART.diffLabel` "10" pulses. Attempt 2.
   - **Wrong, result ± 1**: nudge + tone; the last hop replays unit by unit with `ART.unitBadge`s, badge 1 pulsing. Attempt 2.
   - **Second wrong**: the replay again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); solved-with-help.
5. **Items 2-12**: per Content/Rules. L1 three chips, every tick labelled, pads numbered; L2 chips "−10" and "−7" (splitting at the ten), only the tens and the start labelled, pads unnumbered; L3 one chip "−17", labels as L2, pads blank.
6. **Finish**: `t("all_done")` (360, 110); the kangaroo (360, 200) `ANIM.celebrate`; the summary = the twelve differences as chips (`ART.eqChip`, 140 × 36, 18 px) in three rows of four from y = 320, first-try items with `ART.dotFull` at their left and helped ones with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  kangaroo:    { kind: "emoji", value: "🦘", size: 48, fallback: "🐸" },   // Unicode 11 → frog fallback
  eqText:      { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  hopChip:     { kind: "shape", shape: "roundRect", w: 56, h: 32, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 8 },   // "−10" etc. 16 px; filled: fill structure, text bg
  lineBar:     { kind: "shape", shape: "rect", w: 644, h: 4, fill: "line" },
  tick:        { kind: "shape", shape: "rect", w: 3, h: 16, fill: "inkSoft" },
  tickTen:     { kind: "shape", shape: "rect", w: 4, h: 26, fill: "structure" },      // every multiple of ten
  tickLabel:   { kind: "text",  value: "", size: 14, font: "body", color: "inkSoft" },
  stem:        { kind: "shape", shape: "line", w: 2, stroke: "line", strokeWidth: 2 },     // pad to its tick, length 32
  padWay:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 28 },
  padDone:     { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structure", stroke: "structure", strokeWidth: 2, radius: 28 },
  padOrder:    { kind: "text",  value: "", size: 16, font: "body", color: "inkSoft" },     // L1 order number, pad top-right
  padNum:      { kind: "text",  value: "", size: 22, font: "display", color: "bg" },       // landing number once reached
  hopArc:      { kind: "shape", shape: "arc", r: 40, stroke: "structure", strokeWidth: 4 },   // half-arc above the line from tick to tick; r set at runtime to half the hop width
  arcLabel:    { kind: "text",  value: "", size: 18, font: "display", color: "structure" },
  unitBadge:   { kind: "shape", shape: "circle", r: 9, fill: "accent" },     // count number 12 px inkOnAccent on a unit tick during a replay
  ghostMark:   { kind: "shape", shape: "circle", r: 12, stroke: "accent", strokeWidth: 3 },
  diffArc:     { kind: "shape", shape: "arc", r: 140, stroke: "accent", strokeWidth: 3 },      // dashed (lineDash [6,4]) below the line from result + 10 to result
  diffLabel:   { kind: "text",  value: "10", size: 22, font: "display", color: "accent" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 40 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:      { kind: "shape", shape: "roundRect", w: 140, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  hop:       { y: "-=50", duration: 160, ease: "Sine.Out", yoyo: true, trigger: "kangaroo arc for one hop; x tweens to the pad's tick in a parallel 320 ms Sine.InOut tween" },
  arcDraw:   { alpha: 1, duration: 300, ease: "Sine.Out", trigger: "a hopArc and its label appear (from alpha 0) as the hop lands" },
  chipFill:  { scale: 1.15, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a hop chip turns solid" },
  chipSplit: { x: "+=30", duration: 260, ease: "Sine.InOut", trigger: "L2/L3: a merged chip slides right to make room and a filled part-chip appears at its old place (appear)" },
  landGrow:  { scale: 1.3, duration: 200, ease: "Back.Out", trigger: "landing pad number after the last hop" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "next pad after 2 s idle; unit badge 1 in an off-by-one replay; diffLabel in a +10 replay" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  bounce:    { scaleY: 0.8, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "kangaroo on correct" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new line and pads; answer tiles enabling; split chips (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish kangaroo" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ rail y=28; "3 of 12" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ "42 − 17 = ?" (140,84)     [−10][−2][−5]  chips from x=290    │
      │                 (25)3            (32)1        K on 42  y=190   │  zone A
      │                  │                │            │              │
      │ ─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─  line y=250, 23…44│
      │                        │  (30)2  pad below y=310             │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ 25 ]        [ 35 ]        [ 24 ]   tiles y=420       │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(K = `ART.kangaroo`; pads alternate above / below the line so that adjacent landings never overlap.) Unit u at x = 40 + 28 (u − lo); the span hi − lo ≤ 23 units (644 px) by construction of Content. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.eqText` at (140, 84), `wordWrap` width 240; `ART.hopChip`s from x = 290 at pitch 60, y = 84; a made hop redraws its chip with `THEME.colour.structure` fill and `THEME.colour.bg` text.
- `ART.lineBar` centred (362, 250); `ART.tick` per unit, `ART.tickTen` on multiples of ten; `ART.tickLabel`s at y = 272 per level. Pads: `makeTile` 56 × 56 with `ART.padWay` tokens (reached: `ART.padDone` with `ART.padNum`), on `ART.stem`s to their ticks; `ART.padOrder` at pad (+20, −20) at L1. `ART.hopArc`s above the line (chord from tick to tick, apex 40 px up) with `ART.arcLabel` above the apex. `ART.unitBadge`s at y = 226 over unit ticks; `ART.ghostMark` on a tick; `ART.diffArc` below the line with `ART.diffLabel` under its apex.
- `ART.kangaroo` on the current tick at y = 214 (above the line).
- Drag handling: `pointerdown` on the kangaroo's tick arms the path; on `pointermove` while down the armed pad's rectangle is tested; `pointerup` leaves the path where it is; tapping the armed pad directly always works. Keyboard: Tab reaches the armed pad (then the answer tiles once enabled); Enter hops / picks.
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), label 40 px; `ART.showRing` behind the correct tile.
- Tap floors: pads 56 (8-9 floor); the above/below alternation keeps every pair of pads ≥ 56 px apart centre to centre; tiles 96.

## Content
Language-neutral (numerals and symbols). Items as (start − subtrahend; the three landings; distractors = result + 10 and result ± 1, minus when the result is even, plus when odd). Every item crosses exactly one ten (ones of the start < ones of the subtrahend), start 21-45, subtrahend 11-19, result ≥ 5.
- **L1** (chips −10, −a, −b; every tick labelled; pads numbered): 42 − 17 (32, 30, 25) · 33 − 15 (23, 20, 18) · 25 − 18 (15, 10, 7) · 41 − 13 (31, 30, 28) · 34 − 16 (24, 20, 18) · 23 − 14 (13, 10, 9) · 45 − 19 (35, 30, 26) · 32 − 15 (22, 20, 17) · 24 − 17 (14, 10, 7) · 43 − 18 (33, 30, 25) · 35 − 17 (25, 20, 18) · 44 − 15 (34, 30, 29)
- **L2** (chips −10 and −(a + b), splitting at the ten; tens and start labelled; pads unnumbered): 44 − 16 (34, 30, 28) · 31 − 14 (21, 20, 17) · 35 − 18 (25, 20, 17) · 42 − 15 (32, 30, 27) · 26 − 19 (16, 10, 7) · 33 − 17 (23, 20, 16) · 41 − 15 (31, 30, 26) · 37 − 19 (27, 20, 18) · 22 − 13 (12, 10, 9) · 45 − 17 (35, 30, 28) · 34 − 18 (24, 20, 16) · 43 − 14 (33, 30, 29)
- **L3** (one chip −(subtrahend); labels as L2; pads blank): 43 − 16 (33, 30, 27) · 32 − 18 (22, 20, 14) · 36 − 19 (26, 20, 17) · 41 − 17 (31, 30, 24) · 25 − 16 (15, 10, 9) · 34 − 15 (24, 20, 19) · 44 − 18 (34, 30, 26) · 31 − 15 (21, 20, 16) · 23 − 15 (13, 10, 8) · 42 − 14 (32, 30, 28) · 35 − 16 (25, 20, 19) · 45 − 18 (35, 30, 27)

Play list of 12 per Rules; shuffled within level; no repeats; tile positions shuffled; the correct slot never repeats twice running.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try items → next level (cap L3).
- Adaptation: a wrong tile, or a non-first-try item twice running → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], equation completes, kangaroo `ANIM.bounce`, rail dot, next item after 800 ms.
- What happens on a wrong answer:
  - result + 10 (smaller-from-larger): ghost mark on that tick, hops replay, the dashed arc from it back to the result with "10" pulsing; `tone("nudge")`; attempt 2.
  - result ± 1 (counting back off-by-one): the last hop replays unit by unit with badges, badge 1 pulsing; attempt 2.
  - A drag that passes over a non-pad tick (e.g. 35): nothing happens (refused by construction — not an attempt).
  - Attempt 2 wrong: the show-me ring; solved-with-help.
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring. No attempt 4.
- Finish condition: 12 items. No losing state, no clock (the 2-s idle pulse is a cue only).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Count Back Across Ten". The play screen shows only numerals, "−", "=" and "?".

## Sound
`tone("tap", k)` on hop k; `tone("tap", k)` descending per unit during an off-by-one replay; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("Question 3 of 12", All done, Play again, Menu, praise change; the line is numerals).
- [ ] Works at narrow width (400-px iframe: the equation, chips, the whole line with its three pads and the tiles visible).
- [ ] Keyboard operable (Tab reaches the next pad only, then the answer tiles; Enter hops / picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong tiles never end the session; the show-me ring always completes the item).
- [ ] For 42 − 17 the pads stand at 32 (above), 30 (below) and 25 (above), blank until reached; dragging left makes the kangaroo hop 42 → 32 → 30 → 25 with arcs labelled −10, −2, −5.
- [ ] Touching the 30 pad before the 32 pad does nothing; there is no pad at 35 and passing over it does nothing.
- [ ] Answer tiles are dimmed until the third hop lands; the landing number grows.
- [ ] Tapping 35 for 42 − 17 marks 35, replays the hops and draws a dashed arc from 35 to 25 labelled 10.
- [ ] Tapping 24 replays the last hop one unit at a time with badges 1 … 5.
- [ ] At the second level the "−7" chip splits into "−2" and "−5" when the kangaroo reaches 30; at the third level only "−17" is shown and the pads carry no numbers.
- [ ] After 2 s without a touch the next pad pulses.
- [ ] The finish screen lists the twelve differences with filled or hollow dots and no score.
- [ ] If the kangaroo emoji is missing on the device a frog appears instead.
- [ ] With `?sound=off` nothing is audible.
