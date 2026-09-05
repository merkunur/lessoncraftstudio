# 132 — Order Three

## Identity
- Slug: `order-three-numbers`
- Subject / topic: Mathematics / ordering three two-digit numbers from smallest to largest (tens first, then ones)
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (per-tap judgement onto a three-slot rail)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P4. Content is language-neutral (numerals, rods, cubes); no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Taps three two-digit numbers in order from smallest to largest, deciding by the tens first and by the ones only when the tens are equal.
- Prerequisites: Reads two-digit numerals to 99; knows a rod is ten ones (games 016-019); compares two two-digit numbers (game 131).
- Curriculum links: F-1 (compare/order numbers in 9 of 15 sources; ordering is on the UK 5-7 map, F-4), F-21 ("comparing/ordering quantities", "place value tens/ones" in all twelve systems), F-108, F-31 row "Count to 100; number line to 100" — conservative 7-8 → 6-8 (US 1.NBT.B.3 / 2.NBT.A.4; England Y2 "compare and order numbers from 0 up to 100"; Germany Klasse 2 "Zahlen bis 100 ordnen"; France CE1 "ranger des nombres"; Netherlands groep 4 "getallen tot 100 ordenen"; Spain 1º ciclo "ordenación"; Brazil EF02MA01; Sweden åk 1-3; Finland grades 1-2 "lukujen järjestäminen").
- Common misconceptions (F-103, F-108), each with this game's response:
  1. **Ordering by the ones digit, or by the biggest single digit anywhere in the number (39 placed after 51 because 9 > 5).** Response: a tile tapped out of turn nudges and stays, and the number line under the rail (`ART.numberLine`, 0-100 with a tick every ten) shows where the tapped number and the true next number sit (`ART.marker` glides to each position — `ANIM.markerGlide`); the tens ticks between them light (`ART.tenTick` pulses) so the tens gap is visible; the tapped number's rods and the true next number's rods line up side by side above the line with `ART.tensBadge`s (tens compare first).
  2. **Reading a number reversed (63 as 36 — F-108; de/nl/da spoken order).** Response: every tile shows the numeral AND its rods-and-cubes (`ART.rod`, `ART.cube`) so the size is readable from the blocks; L3 includes reversed-digit pairs (36 and 63 on one board) and the enactment compares rods first.
  3. **Same tens, ordered by look ("52, 57 — they start the same, either order").** Response: when the tens are equal the enactment goes to the ones: the two numbers' cubes pair off in two rows with `ART.pairLine`s and the unmatched cubes pulse with `ART.onesBadge`s; the number line zooms to the ten (the line re-labels its ticks 50, 51 … 60 — `ART.zoomLabel`) and the two markers sit one tick apart.
  4. **Bigger-looking = more: a tile with many cubes (48) taken as more than one with more rods and few cubes (61).** Response: L2 boards always contain such a pair; the rods-first enactment answers it.
  5. **Rail confusion (putting the largest first, "biggest wins").** Response: the rail's three slots carry position glyphs `ART.slotNum` 1, 2, 3 and a small-to-big size cue (`ART.sizeCue`: a short bar under slot 1, a medium bar under slot 2, a long bar under slot 3); the first correct tap is always the smallest, so the rail teaches the direction from the first item.

## How it plays
1. **Start screen**: title "Order Three", the tortoise (`ART.tortoise`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 27, 51, 84)**: rail of 10 dots (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the ordered rail — three empty slots (`ART.slot`, 150 × 110, dashed) at (170, 150), (360, 150), (550, 150), each with `ART.slotNum` "1" / "2" / "3" in its top-left corner and `ART.sizeCue` (bar lengths 30 / 60 / 90) beneath it at y = 215; under the rail the number line `ART.numberLine` from x = 90 to x = 630 at y = 245 with `ART.tenTick`s every 54 px (0, 10, …, 100) and `ART.tickLabel`s "0", "50", "100" only (18 px); the tortoise at (60, 100). Zone B: three number tiles (`ART.numTile`, 150 × 110) at y = 370, x = 170 / 360 / 550, in a shuffled order: each shows its numeral (48 px) in the top half and its rods and cubes beneath (rods 12 × 44 pitch 16 from tile x − 55; cubes 14 × 14 pitch 16 to the right of the rods, up to 5 per row, second row 16 px higher). Zone C: nothing (per-tap judgement; no Check). Caption `S("smallFirst")` ("Smallest first") at (360, 290), 24 px `THEME.colour.inkSoft`.
3. **Tapping in order**: the child taps a tile.
   - **Correct next (27 first)**: `tone("correct")` at a rising step (`tone("correct")` for slot 1, then `tone("tap", 4)` and `tone("tap", 8)` for slots 2 and 3 — the pitch climbs with the order), the tile glides (`ANIM.glide`) into the next free slot and takes the slot's look (`ART.slotFilled`), its `ART.marker` drops onto the number line at its position (`ANIM.markerDrop`); the tortoise `ANIM.plod` (a small forward nudge). Tapping a rail tile returns it to the tray (undo, `ANIM.glide` back, its marker lifts) — allowed only for the LAST placed tile.
   - **Out of turn (51 or 84 tapped first)**: `ANIM.nudge` on the tile, `tone("nudge")`; the tile stays in the tray; the enactment: `ART.marker`s glide onto the number line for the tapped number and the true next number (`ANIM.markerGlide`), the `ART.tenTick`s between them pulse, and the two numbers' rods line up above the line (left = true next, right = tapped) with `ART.tensBadge`s (`ANIM.rodsAlign`); after 1200 ms the rods glide home (`ANIM.rodsHome`). If the tens are equal, the ones step follows (cubes pair, `ART.pairLine`, unmatched cubes pulse with `ART.onesBadge`s, the line zooms to the ten with `ART.zoomLabel`s). The item counts as retried.
   - **Second out-of-turn tap on the same slot**: the enactment replays and the true next tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`) until it is tapped; that tap completes the slot as solved-with-help.
4. **Rail full**: the three markers on the number line light together (`ANIM.pulse`), the sentence `ART.sentence` "27 < 51 < 84" appears at (360, 290) replacing the caption, praise pop (rotation) if no out-of-turn tap happened, the rail dot fills; after 900 ms the rail clears and the next tray `ANIM.appear`s.
5. **Re-queue** (F-41): an item with any out-of-turn tap re-enters the play list after 2 intervening items with its tray re-shuffled, then, if missed again, near the end ("last look"). The item count stays 10; re-queued items replace the last unplayed items of the same level.
6. **Items 2-10**: per Content/Rules. L1 all tens differ by ≥ 2; L2 tens differ by 1 and include a many-cubes-but-smaller number; L3 boards with two numbers sharing tens (ones decide) and reversed-digit pairs.
7. **Finish**: `t("all_done")` (360, 110); the tortoise (360, 200) `ANIM.celebrate`; the summary = the ten ordered triples as chips (`ART.tripleChip`, 130 × 36, label "27 51 84" 16 px) in two rows of five from y = 340, clean items with `ART.dotFull` at their left and retried items with `ART.dotEmpty` — a record, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes (10 items × 25-40 s).

## Art registry
```js
const ART = {
  tortoise:   { kind: "emoji", value: "🐢", size: 72 },
  slot:       { kind: "shape", shape: "roundRect", w: 150, h: 110, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 14 },   // dashed look: lineDash [8,6]
  slotFilled: { kind: "shape", shape: "roundRect", w: 150, h: 110, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  slotNum:    { kind: "text",  value: "", size: 18, font: "display", color: "inkSoft" },
  sizeCue:    { kind: "shape", shape: "rect", w: 90, h: 6, fill: "structureSoft", stroke: "structure", strokeWidth: 1 },   // width 30 / 60 / 90 per slot
  numTile:    { kind: "shape", shape: "roundRect", w: 150, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // numeral 48 px display ink
  rod:        { kind: "shape", shape: "rect", w: 12, h: 44, fill: "structure", stroke: "bg", strokeWidth: 1 },   // nine hairline notches (line token) 4 px apart
  cube:       { kind: "shape", shape: "rect", w: 14, h: 14, fill: "accent", stroke: "bg", strokeWidth: 1 },
  numberLine: { kind: "shape", shape: "rect", w: 540, h: 4, fill: "structure" },
  tenTick:    { kind: "shape", shape: "rect", w: 3, h: 16, fill: "structure" },
  tickLabel:  { kind: "text",  value: "", size: 18, font: "body", color: "inkSoft" },
  zoomLabel:  { kind: "text",  value: "", size: 16, font: "body", color: "structure" },
  marker:     { kind: "shape", shape: "polygon", points: [[-10,-22],[10,-22],[0,0]], fill: "accent", stroke: "structure", strokeWidth: 2 },   // numeral 14 px above it
  tensBadge:  { kind: "shape", shape: "roundRect", w: 44, h: 24, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 6 },   // numeral 15 px display structure
  onesBadge:  { kind: "shape", shape: "roundRect", w: 30, h: 24, fill: "bg", stroke: "accent", strokeWidth: 2, radius: 6 },      // numeral 15 px display ink
  pairLine:   { kind: "shape", shape: "line", w: 2, stroke: "structure", strokeWidth: 3 },   // vertical, length 26, between matched cubes
  sentence:   { kind: "text",  value: "", size: 30, font: "display", color: "structure" },
  showRing:   { kind: "shape", shape: "roundRect", w: 162, h: 122, stroke: "structure", strokeWidth: 4, radius: 18 },
  tripleChip: { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Rods and cubes differ by size AND shape AND notches, never by colour alone. A number with 0 ones shows one dashed empty cube outline (`ART.cube` stroke only, alpha 0.4).

## Animation registry
```js
const ANIM = {
  glide:       { duration: 260, ease: "Sine.InOut", trigger: "tile into the next free slot / back to the tray (x, y set at call)" },
  nudge:       { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tile tapped out of turn" },
  markerDrop:  { y: "+=0", alpha: 1, scale: 1, duration: 220, ease: "Bounce.Out", trigger: "marker lands on the number line under a placed number (from y −30, alpha 0)" },
  markerGlide: { duration: 400, ease: "Sine.InOut", trigger: "hint markers slide along the line to the tapped and the true-next positions (x set at call)" },
  rodsAlign:   { duration: 300, ease: "Sine.InOut", trigger: "the two numbers' rods to two columns above the line (x, y set at call), 60 ms apart" },
  cubesAlign:  { duration: 300, ease: "Sine.InOut", trigger: "the two numbers' cubes to two rows above the line (tens equal), 60 ms apart" },
  rodsHome:    { duration: 300, ease: "Sine.InOut", trigger: "blocks glide back into their tiles" },
  pulse:       { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "ten ticks between two markers; unmatched cubes; the three markers when the rail completes" },
  badgeIn:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "tens/ones badges (from alpha 0, scale 0.5)" },
  plod:        { x: "+=6", duration: 150, ease: "Sine.InOut", yoyo: true, trigger: "tortoise on each correct placement" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "sentence; new tray (from alpha 0, scale 0.6)" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the true-next tile (from alpha 0.2)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish tortoise" }
};
```
No flashing: `showMe` cycles at 1 Hz; pulses are ≤ 3 cycles.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ tortoise  ┌1─────────┐    ┌2─────────┐    ┌3─────────┐        │
      │ (60,100)  │          │    │          │    │          │  slots │  zone A
      │           └──────────┘    └──────────┘    └──────────┘ y=150  │
      │              ▬ (170,215)     ▬▬ (360,215)    ▬▬▬ (550,215)     │
      │   0 ─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬ 100   number line y=245, x=90..630   │
260   ├──────────────────────────────────────────────────────────────┤
      │              "Smallest first" / "27 < 51 < 84" (360,290)     │
      │   ┌──────────┐    ┌──────────┐    ┌──────────┐               │
      │   │    51    │    │    84    │    │    27    │   tiles y=370  │  zone B
      │   │ ||||| .  │    │ |||||||| ::│   │ || :::.  │   150×110     │
      │   └──────────┘    └──────────┘    └──────────┘               │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `|` = a rod, `.` / `:` = cubes, `▬` = the size cue bar. During a hint the two rod columns stand at x = 320 and x = 400 with bases at y = 235 (above the line); cube rows at y = 200 and y = 226 from x = 300. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Slots: `makeTile` 150 × 110 with `ART.slot` tokens at (170, 150), (360, 150), (550, 150); `ART.slotNum` at slot (−60, −40); `ART.sizeCue` centred under each slot at y = 215 with width 30 / 60 / 90. A filled slot swaps to `ART.slotFilled` and shows the placed number's numeral and blocks.
- `ART.numberLine` centred (360, 245); `ART.tenTick` at x = 90 + k × 54 (k = 0..10); `ART.tickLabel` "0" at (90, 268), "50" at (360, 268), "100" at (630, 268); `ART.marker` at x = 90 + n × 5.4 for the number n, tip on the line, with its numeral 14 px above it; `ART.zoomLabel`s replace the tick labels during a same-tens hint (the line temporarily spans one ten: ticks re-labelled t, t+1 … t+10).
- Tiles: `makeTile` 150 × 110 with `ART.numTile` tokens at y = 370, x = 170 / 360 / 550; numeral 48 px `THEME.font.display` `THEME.colour.ink` at tile (0, −28); rods and cubes at tile (−55 …, +28) per How it plays.
- Hint elements: `ART.tensBadge` above each rod column; `ART.onesBadge` at the right end of each cube row; `ART.pairLine`s between matched cubes; `ART.showRing` behind the true-next tile.
- Caption `S("smallFirst")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), `wordWrap` 600; `ART.sentence` replaces it when the rail is full.
- `ART.tortoise` at (60, 100). Tap floors 150 × 110 ≥ 56; gaps 40.
- Tab order: the three tray tiles left to right, then the three slots (for undo of the last placed). During a hint (≈ 1.5-2.5 s) all tiles are `setEnabled(false)`. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (the three numbers in ascending order); the tray order is shuffled per item and never equals the ascending order.
- **L1** (tens differ by ≥ 2): (27, 51, 84) · (13, 46, 72) · (35, 68, 90) · (21, 59, 97) · (18, 43, 76) · (32, 65, 88)
- **L2** (tens differ by 1; the smaller number has more cubes): (48, 61, 73) · (39, 52, 64) · (29, 38, 47) · (57, 68, 79) · (19, 26, 35) · (44, 58, 63)
- **L3** (same tens for two of the three; reversed-digit pairs; a zero-ones number): (52, 57, 75) · (36, 63, 66) · (41, 47, 74) · (80, 86, 68) → listed ascending as (68, 80, 86) · (29, 92, 99) · (34, 43, 40) → listed ascending as (34, 40, 43) · (15, 51, 55) · (70, 77, 79)

Play list of 10 per Rules with re-queue (How it plays §5); no item repeats except by re-queue; two consecutive items never share a number.

Worked example: item 1 (27, 51, 84) taps 27, 51, 84 cleanly · item 2 (13, 46, 72) clean → L2 · item 3 (48, 61, 73) taps 61 first (more rods, fewer cubes — reads 48 as more) → markers at 48 and 61, ticks 50 and 60 pulse, rods 4 vs 6 with badges "40" / "60"; then 48, 61, 73 (retried) · item 4 (39, 52, 64) clean · item 5 (29, 38, 47) clean → L3 · item 6 = re-queued (48, 61, 73) clean · items 7-10 at L3 with (52, 57, 75) retried once (57 tapped before 52 → same-tens ones hint) → Finish shows ten chips, 8 with filled dots.

## Rules
- Item count: 10 (re-queued items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive clean items (no out-of-turn tap) → next level (cap L3).
- Adaptation: an out-of-turn tap on 2 consecutive items → next item one level down (floor L1). A single retried item re-queues (after 2 items, then a last look) without changing level.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no tap, the smallest remaining tile `ANIM.pulse`s once; repeats every 8 s. Nothing about time is shown; nothing ends.
- What happens on a correct answer: per placement `tone("correct")` / rising `tone("tap", k)`, `ANIM.glide` into the slot, marker drops, tortoise `ANIM.plod`; on the third placement the markers pulse, `ART.sentence` shows, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (clean items only), rail dot, next tray after 900 ms.
- What happens on a wrong answer:
  - Ones-first / bigger-looking-number tapped out of turn (tens differ): `ANIM.nudge`, `tone("nudge")`, markers for the tapped and the true-next number, the ten-ticks between them pulse, rods align with tens badges; the tile stays in the tray.
  - Same-tens number tapped out of turn: the tens step shows equal badges, then the ones step pairs the cubes with badges and the line zooms to that ten.
  - Largest tapped first ("biggest wins"): the same marker hint; additionally `ART.sizeCue` under slot 1 pulses.
  - Second out-of-turn tap for the same slot: the hint replays and the true-next tile gets the show-me ring; tapping it fills the slot as solved-with-help.
- Retry behaviour: attempt 1 unaided → attempt 2 after the number-line + rods hint → attempt 3 show-me ring on the true-next tile; solved-with-help; the item re-queues later. No attempt 4. Undo of the last placed tile is free.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Order Three"; `smallFirst` = "Smallest first".

## Sound
`tone("correct")` on the first correct placement, `tone("tap", 4)` and `tone("tap", 8)` on the second and third (the pitch climbs with the order, F-213); `tone("nudge")` on an out-of-turn tap; `tone("tap", k)` per rod as the hint columns align; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings and "Smallest first" change; numerals and blocks do not).
- [ ] Works at narrow width (400-px iframe: three slots, the number line and three tiles visible and separate).
- [ ] Keyboard operable (Tab / arrows move between the tray tiles and the slots; Enter places or undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of out-of-turn taps still fills the rail; the ringed tile always completes the slot).
- [ ] Every tile shows its numeral and the matching rods and cubes (51 = five rods and one cube).
- [ ] Tapping the smallest number moves it to slot 1 and drops a marker on the number line at its place; tapping a larger one first makes it wiggle and stay.
- [ ] Tapping 61 before 48 shows markers at 48 and 61, pulses the 50 and 60 ticks, and lines up 4 rods beside 6 rods with "40" and "60" badges.
- [ ] Tapping 57 before 52 shows equal "50" badges, then pairs the cubes and badges "2" and "7" while the line re-labels 50 … 60.
- [ ] Tapping the last placed tile in the rail returns it to the tray; earlier rail tiles cannot be taken back.
- [ ] A retried item comes back two items later with its tiles re-shuffled.
- [ ] Two clean items in a row bring the harder level; two retried items in a row bring the easier one.
- [ ] The finish screen shows ten ordered triples with a filled dot for clean ones and a hollow dot for retried ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
