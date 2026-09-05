# 016 — Tens Then Ones

## Identity
- Slug: `tens-then-ones-count`
- Subject / topic: Mathematics / counting a set of full tens plus loose ones to 100 (tens first, then ones)
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (tap each ten-box, then each loose egg; a P1 numeral choice states the total)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P3 (skip-counting variant: "tap each GROUP"). Everything below adds to those; nothing overrides them.

## Learning
- Objective: Counts a set made of full boxes of ten eggs and loose eggs by tapping the boxes first (10, 20, 30) and then the loose eggs (31, 32), and taps the numeral that names the total.
- Prerequisites: Counts to 20 by ones; knows that a box holds ten (the box shows "10" and its ten eggs). Reads two-digit numerals.
- Curriculum links: F-109 (skip counting by tens tied to groups, not a rote chant), F-108 (place value: tens as bundled rods; de/nl/da word-order interference), F-21 ("place value tens/ones" and "skip counting" in all twelve systems), F-31 rows "Count to 100" (conservative 7-8) and "Place value tens/ones" (7-8) → 6-8 (US 1.NBT.B.2 "10 can be thought of as a bundle of ten ones"; England Y1-2 "count in tens", "tens and ones"; Germany Klasse 1-2 "Bündeln zu Zehnern"; France CP "dizaines et unités"; Netherlands groep 3-4 "tientallen en eenheden"; Spain 1º ciclo; Brazil EF01MA07; Sweden åk 1-3 "positionssystemet"; Finland grades 1-2 "kymmenjärjestelmä").
- Common misconceptions (F-109, F-108, F-101), each with this game's response:
  1. **Counting the boxes as ones ("1, 2, 3 boxes, then 4, 5" → total 5).** Response: tapping a box writes its running value ON it (`ART.countBadge` "10", "20", "30") and the big running numeral (`ART.runningNumeral`) shows the same; the pitch of `tone("tap", k)` climbs by the number of tens. The count is always in tens for boxes — the object enforces it.
  2. **Switching to ones too early or mixing the sequences (10, 20, 21, 22 while a box is still uncounted).** Response: a loose egg tapped while any box is uncounted is refused — the egg does not count, `ANIM.nudge` on it, and the uncounted boxes `ANIM.pulse`. Tens are always finished before ones; the rule is enacted, not stated.
  3. **Digits treated as independent (3 boxes and 2 eggs tapped as "23").** Response: the total tiles always include the digit-swapped numeral; choosing it triggers the replay: the boxes light in turn with 10, 20, 30 under a `S("tens")` tag (`ART.groupTag`), then the eggs with 31, 32 under a `S("ones")` tag, the last numeral pulses and the big total shows — the tens-then-ones structure is shown in the layout, never by word order (F-108: German "zweiunddreißig" says the ones first).
  4. **One-to-one failure — tapping the same egg twice or skipping one.** Response: a counted box or egg is greyed and locked; a second tap does nothing; the total tiles stay disabled until every box and egg is counted, so a skipped egg leaves the tiles dim and the bright egg pulses on the inactivity cue.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Tens Then Ones"): the hen (`ART.hen`) at (360, 200) above the title, Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 2 boxes + 3 eggs = 23).** The Play scene builds: the dot rail of 10 hollow dots at y = 28 (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the hen at (70, 150); two ten-boxes (`ART.box` 80 × 60 tiles, each showing ten `ART.eggDot`s in two rows of five and the lid label `ART.boxLabel` "10") in a row at y = 130, centred (x = 316, 404; pitch 88); the running numeral (`ART.runningNumeral`, 48 px) at (640, 130), empty until the first tap. Zone B: three loose eggs (`ART.egg` on 56 × 56 `ART.eggTile`s) at y = 300, centred (x = 296, 360, 424; pitch 64); three total tiles (`ART.numeralTile`, 96 × 96) at y = 420, x = 240 / 360 / 480 labelled 23, 32, 13 in a shuffled order, **disabled** (alpha 0.5) until everything is counted. Caption `S("howMany")` ("How many eggs?") at (360, 240), 24 px `THEME.font.body` `THEME.colour.inkSoft`.
3. **Counting the tens.** The child taps a box: `tone("tap", 2 × k)` (k = boxes counted so far — the pitch climbs two semitones per ten); the box `ANIM.pop`s, greys (fill `structureSoft`, stroke `structure` 3 px), locks, and gets `ART.countBadge` "10" (then "20" on the second); `ART.runningNumeral` shows "10", then "20" (`ANIM.tick`). Tapping a loose egg now is refused: the egg `ANIM.nudge`s, `tone("nudge")`, the uncounted boxes `ANIM.pulse`.
4. **Counting the ones.** With all boxes counted, the child taps an egg: `tone("tap", 2 × boxes + k)`; the egg greys and locks with `ART.countBadge` "21", "22", "23"; the running numeral follows. After the last egg the last badge plays `ANIM.lastBadge` and the running numeral `ANIM.lastBadge`; the total tiles enable (`ANIM.appear`).
5. **Answering.** The child taps a total tile.
   - **Correct (23):** `ANIM.pop`, `tone("correct")`, `GameCore.showPraise(scene, key)` with the next praise key; the hen `ANIM.cluck`; the boxes and eggs `ANIM.glide` into the hen's crate (`ART.crate` at (70, 210)) one after another (80 ms apart) and vanish; the rail dot fills; after 800 ms the next item builds (`ANIM.appear`).
   - **Wrong (32 or 13):** `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; the **replay**: all badges hide; `ART.groupTag` `S("tens")` appears under the boxes and `S("ones")` under the eggs; the boxes re-light in turn (10, 20; 350 ms apart, tones), then the eggs (21, 22, 23); the last badge `ANIM.lastBadge`; the running numeral pulses. Attempt 2.
   - **Wrong again (attempt 2):** the same replay; the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
6. **Items 2-10.** Built from the level pools in Content by the Rules. Layouts: boxes ≤ 5 in one row at y = 130; 6-9 boxes in two rows (y = 100 and y = 168), the first row holding 5; eggs ≤ 9 in one row at y = 300 (pitch 64, centred). At L3 the boxes are placed in two rows with the SECOND row offset 44 px right, so the count cannot be read off the row length.
7. **Finish** (after 10 items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the hen at (360, 220) with `ANIM.celebrate`. Zone B: the ten totals as chips (`ART.totalChip`, 64 × 36, numeral 20 px) in a row at y = 400 (x = 360 − 4.5 × 70 + i × 70), each with a tiny "boxes | eggs" glyph pair beneath (`ART.miniBox` × tens, `ART.miniEgg` × ones at 6 px pitch) — the visual summary; optional `t("question_x_of_y")` with n = first-try items at (360, 460). Zone C: `makeButton play_again` at (250, 510), `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 6 minutes: 10 items × (5-18 taps + answer ≈ 30-40 s).

## Art registry
```js
const ART = {
  hen:            { kind: "emoji", value: "🐔", size: 96 },
  egg:            { kind: "emoji", value: "🥚", size: 40 },        // label of a 56×56 eggTile
  crate:          { kind: "emoji", value: "🧺", size: 56 },
  box:            { kind: "shape", shape: "roundRect", w: 80, h: 60, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 8 },
  boxLabel:       { kind: "text",  value: "10", size: 14, font: "display", color: "structure" },      // on the box's top edge (lid)
  eggDot:         { kind: "shape", shape: "ellipse", w: 10, h: 13, fill: "surface2", stroke: "line", strokeWidth: 1 },   // ten per box, 2 rows × 5, pitch 14 × 18
  eggTile:        { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },
  countBadge:     { kind: "shape", shape: "roundRect", w: 36, h: 22, fill: "structure", radius: 6 },  // numeral 14 px display bg, at the object's top-right
  runningNumeral: { kind: "text",  value: "", size: 48, font: "display", color: "structure" },
  groupTag:       { kind: "shape", shape: "roundRect", w: 96, h: 28, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 6 },   // label S("tens") / S("ones"), 16 px body ink
  numeralTile:    { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },            // numeral 40 px display ink
  showRing:       { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  totalChip:      { kind: "shape", shape: "roundRect", w: 64, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  miniBox:        { kind: "shape", shape: "rect", w: 6, h: 5, fill: "structure" },
  miniEgg:        { kind: "shape", shape: "circle", r: 2, fill: "inkSoft" },
  dotEmpty:       { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:        { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. The ten-box is drawn from `ART.box` + ten `ART.eggDot`s + `ART.boxLabel`; the art upgrade may replace the box with one SVG carton and nothing else changes.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "box or egg counted; correct total tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "egg tapped before all boxes; wrong total tile" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "uncounted boxes when an egg is tapped early; uncounted objects on the inactivity cue; running numeral on replay" },
  tick:      { scale: 1.15, duration: 100, ease: "Sine.Out", yoyo: true, trigger: "running numeral on each change" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "last badge and running numeral when the count completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "total tiles enabling; group tags; new item (from alpha 0, scale 0.6)" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "boxes and eggs into the crate (x, y set at call), 80 ms apart" },
  cluck:     { angle: 6, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hen on a correct total" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring behind the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hen" }
};
```
No flashing: `showMe` cycles at 1 Hz; `pulse` at ≤ 1.7 Hz.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ART.hen        [10 box] [10 box] [10 box]   y=130      "30"  │
      │  (70,150)       (row 2 at y=168 for 6-9 boxes, row 1 y=100) (640,130)│  zone A
      │  ART.crate      "How many eggs?" (360,240)                    │
      │  (70,210)                                                     │
260   ├──────────────────────────────────────────────────────────────┤
      │        (e) (e) (e) (e) (e)   loose eggs y=300 (56×56, pitch 64)│
      │       [ 23 ]     [ 32 ]     [ 13 ]   total tiles y=420        │  zone B
      │       x=240      x=360      x=480    (96×96)                  │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                  │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Box rows: n ≤ 5 → one row at y = 130, first x = 360 − (n − 1) × 44; 6-9 → row 1 five boxes at y = 100 (x = 184 + i × 88), row 2 the rest at y = 168 (x = 184 + i × 88; at L3 x = 228 + i × 88, offset right). Eggs: first x = 360 − (n − 1) × 32, pitch 64. `ART.groupTag`s at (360, 205) under the boxes and (360, 340) under the eggs during a replay.

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 10 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 261 + i × 22); filled dots use `ART.dotFull`. `t("question_x_of_y")` at (360, 48).
- `ART.hen` at (70, 150); `ART.crate` at (70, 210).
- Boxes: `makeTile` 80 × 60 with `ART.box` tokens; inside, ten `ART.eggDot`s (2 rows × 5, pitch 14 horizontally, 18 vertically, centred) and `ART.boxLabel` on the top edge; counted look = fill `THEME.colour.structureSoft`, stroke `THEME.colour.structure` 3 px, `ART.countBadge` at (+30, −24) with the running value in `THEME.colour.bg` 14 px `THEME.font.display`. The 80 × 60 tile meets the 56-px floor in both dimensions.
- Eggs: `makeTile` 56 × 56 with `ART.eggTile` tokens and `ART.egg` label; counted look as for boxes, badge at (+20, −20).
- `ART.runningNumeral` at (640, 130); `ART.groupTag`s with `S("tens")` / `S("ones")` centred as above.
- Total tiles: `makeTile` 96 × 96 with `ART.numeralTile` tokens, numeral 40 px `THEME.font.display` `THEME.colour.ink`; disabled = alpha 0.5.
- Caption `S("howMany")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 240), `wordWrap` width 400, max 2 lines.
- `ART.showRing` behind the correct tile. Gaps: box pitch 88 gives an 8-px gap and egg pitch 64 an 8-px gap; when n ≤ 5 the pitch is raised to 92 (boxes) / 68 (eggs) so gaps reach 12; for n > 5 the 8-px gap is accepted because adjacent eggs (or boxes) are equivalent targets and a mis-tap on the neighbour is also a correct count.
- Tab order: boxes in row order, then eggs left to right, then the total tiles.
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral except three short captions ("How many eggs?", "tens", "ones"), game-specific strings translated with the game. `LOCALE_DATA` not needed.

Items as (boxes; loose eggs = total; the two distractor totals — always the digit-swapped numeral and a ten-off numeral):
- **L1** (1-3 boxes, 0-3 eggs): (2; 3 = 23; 32, 13) · (3; 1 = 31; 13, 21) · (1; 2 = 12; 21, 22) · (2; 0 = 20; 2, 30) · (3; 3 = 33; 23, 43) · (1; 3 = 13; 31, 23)
- **L2** (2-5 boxes, 1-9 eggs): (4; 7 = 47; 74, 37) · (2; 5 = 25; 52, 35) · (5; 8 = 58; 85, 48) · (3; 6 = 36; 63, 26) · (4; 9 = 49; 94, 39) · (5; 4 = 54; 45, 44)
- **L3** (5-9 boxes in two offset rows, 1-9 eggs): (7; 3 = 73; 37, 63) · (8; 6 = 86; 68, 76) · (9; 5 = 95; 59, 85) · (6; 7 = 67; 76, 57) · (9; 2 = 92; 29, 82) · (7; 8 = 78; 87, 68)

Play list: 10 items; start at L1; shuffle within the level without repeats; level changes per Rules; if a pool is exhausted it is reused reshuffled. Distractor tile positions shuffled per item; the correct tile never sits in the same slot twice running (§13). Two consecutive items never share a total.

## Rules
- Item count: 10.
- Difficulty progression: after 2 consecutive first-try correct items, the next item comes from the next level up (cap L3). "First-try correct" = the correct total was the first total tapped and no egg was refused during the count.
- Adaptation: a wrong total tap or a refused egg on an item, or wrong first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 6 s pass with uncounted objects and no tap, the uncounted boxes (or, if all boxes are counted, the uncounted eggs) `ANIM.pulse` once; repeats every 6 s. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: `ANIM.pop` on the tile, `tone("correct")`, `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, hen `ANIM.cluck`, boxes and eggs glide into the crate, rail dot fills, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Digit-swapped total (32 for 23)** (digits independent / word-order interference): `ANIM.nudge`, `tone("nudge")`, the replay with `S("tens")` and `S("ones")` group tags — boxes re-light 10, 20 then eggs 21, 22, 23 — last badge `ANIM.lastBadge`, running numeral `ANIM.pulse`.
  - **Ten-off total (13 for 23)** (a box counted as one / a box skipped): the same replay; the boxes' badges 10, 20 are the information.
  - **Loose egg tapped before all boxes are counted** (mixing the sequences): the egg is refused with `ANIM.nudge` + `tone("nudge")`; the uncounted boxes `ANIM.pulse`; counts as one wrong attempt on the item.
  - **Double-tap on a counted object**: nothing happens (not an error).
  - **Total tile tapped before the count is complete**: impossible (disabled).
- Retry behaviour: attempt 1 unaided → attempt 2 after the replay → attempt 3 with the show-me ring; tapping the ringed tile completes the item as solved-with-help. No attempt 4. An item completed after any wrong attempt does not count as first-try.
- Finish condition: 10 items solved → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Tens Then Ones"
  - `howMany` = "How many eggs?"
  - `tens` = "tens"
  - `ones` = "ones"

## Sound
`GameCore.tone` only (§11): `tone("tap", 2 × k)` on the k-th box (the pitch climbs two semitones per ten) and `tone("tap", 2 × boxes + k)` on the k-th loose egg (one semitone per one) — so the count is audible as big steps then small steps (F-213); `tone("correct")` on a correct total; `tone("nudge")` on a refused egg or a wrong total (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show (the badges and the running numeral carry the count).

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "Question 3 of 10", "All done!", "Play again", "Menu" and the praise pops; "How many eggs?", "tens" and "ones" change once translations are loaded.
- [ ] Works at narrow width: in a 400-px-wide iframe nine boxes in two rows, nine eggs and the three total tiles are visible and separate.
- [ ] Keyboard operable: Tab walks the boxes, then the eggs, then the total tiles; Enter counts / answers; Enter on a counted object does nothing.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: wrong totals never end the session; the show-me ring always completes the item.
- [ ] Tapping a box writes 10 on it (then 20, 30 on the next boxes) and the big numeral at the right shows the same.
- [ ] Tapping a loose egg while a box is still uncounted makes the egg wiggle and the uncounted boxes pulse; the egg is not counted.
- [ ] After the boxes, tapping eggs continues 31, 32, 33 and the total tiles light up only after the last egg.
- [ ] Tapping 32 for 3 boxes and 2 eggs replays the count with "tens" under the boxes and "ones" under the eggs.
- [ ] At the third level the boxes sit in two rows with the second row shifted right.
- [ ] Two first-try corrects in a row bring more boxes and eggs; a wrong total or a refused egg brings fewer next.
- [ ] The finish screen shows ten total chips with tiny box-and-egg glyphs beneath and no score beyond the optional "n of 10".
- [ ] With `?sound=off` nothing is audible; with sound on, box taps climb in big steps and egg taps in small steps.
