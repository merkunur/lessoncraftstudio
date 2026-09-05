# 029 — How Many More

## Identity
- Slug: `how-many-more`
- Subject / topic: Mathematics / subtraction as difference (comparison) within 20 — how many more in one row than the other, found by pairing
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (tap an animal in one row, then its partner in the other row; a pairing line joins them)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2. Content is language-neutral (two kinds of animal, numerals); no `LOCALE_DATA`.

## Learning
- Objective: Pairs the animals of two rows one-to-one with tap-tap lines until the shorter row is used up, then taps the numeral for how many in the longer row are left unpaired — the difference.
- Prerequisites: Counts to 20 with one-to-one correspondence; reads numerals to 20; has met take-away subtraction (game 028).
- Curriculum links: F-1 (subtraction within 20 in 12 of 15 sources), F-106 ("take-away only, no difference/comparison model" — this game IS the comparison model, kept separate from take-away), F-103 (pairing lines defeat length bias), F-21, F-31 row "+/− facts to 20" — conservative 7-8, earliest 6 → 6-8 (US 1.OA.A.1 "comparing, with unknowns" / K.CC.C.6; England Y1-2 "find the difference"; Germany Klasse 1 "Unterschied bestimmen"; France CP "combien de plus"; Netherlands groep 3-4 "verschil bepalen"; Spain 1º ciclo "cuántos más"; Brazil EF01MA08 "comparar"; Sweden åk 1 "skillnad"; Finland grade 1-2 "erotus").
- Common misconceptions (F-106, F-103, F-101), each with this game's response:
  1. **Answering with the count of the longer row ("there are 7 ducks — 7 more").** Response: the longer row's count is always a distractor tile; on that tap the paired animals dim (`ANIM.dimPaired`) and ONLY the unpaired ones count themselves (`ART.countBadge` 1 … d, `tone("tap", k)`), ending with `ART.diffTag` (the difference, 48 px) beside the row — the answer is the leftover, not the row.
  2. **Judging "more" by the row's length rather than its count (F-103).** Response: from L2 the rows can start at different x offsets and at L3 the SHORTER row is spaced wider (pitch 84 instead of 60) so it looks longer; the pairing lines are the only reliable route, and the re-count is of unpaired animals, not of length.
  3. **Adding the two rows ("7 and 4 — 11").** Response: the sum is a distractor at L2-L3; the same enacted re-count of unpaired animals answers it, and `ART.eqText` shows "7 − 4 = 3" for 900 ms — the difference as a subtraction sentence.
  4. **Pairing within a row or pairing one animal twice.** Response: tapping two animals in the same row is refused — the second springs back with `ANIM.nudge`, no message (F-61); an animal already in a pair is dimmed and a tap on it UN-pairs it (undo), so double-pairing is impossible by construction.
  5. **Off-by-one in counting the unpaired.** Response: the difference ± 1 are distractors at L3; the re-count badges each unpaired animal exactly once in row order and the last badge `ANIM.lastBadge`s.

## How it plays
1. **Start screen**: title "How Many More", the duck (`ART.duck`) at (360, 200), Start, picker.
2. **Item 1 (L1: 4 ducks, 3 frogs)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48). Zone A: the top row — 4 ducks (`ART.duck` as the label of 56 × 56 `makeTile`s, pitch 60) at y = 120, left-aligned from x = 120 (x = 120, 180, 240, 300); the bottom row — 3 frogs (`ART.frog` tiles) at y = 210, same x positions; a row label icon at the left of each row (`ART.rowIconDuck` at (70, 120), `ART.rowIconFrog` at (70, 210)) — the same animal, smaller. Between the rows the pairing lines will be drawn (`ART.pairLine`). At the right, `ART.diffTag` (empty) at (640, 165). Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 400, x = 240 / 360 / 480: 1, 4, 3 shuffled (difference, longer row, shorter row), DISABLED until the pairing is complete. Caption `S("pairThem")` ("Pair them up") at (360, 296), 24 px `THEME.colour.inkSoft`.
3. **Pairing**: tap a duck (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap a frog: `ART.pairLine` draws from the duck's bottom to the frog's top (`ANIM.lineDraw`), both animals take the paired look (alpha 0.6 + `ART.pairDot` at each end of the line), `tone("tap", k)` for the k-th pair. The order may be frog-first then duck; any duck may pair with any frog (lines may cross). Tapping a paired animal removes its line and un-pairs both (undo). Tapping a second animal in the same row as the selected one: the selection switches to it (P2 switch), no line. When every animal of the shorter row is paired: the unpaired animals in the longer row `ANIM.pulse` once together, the numeral tiles enable, the caption changes to `S("howManyMore")` ("How many more?").
4. **Answering**: tap a tile.
   - **Correct (1)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation); `ART.diffTag` "1" appears with `ANIM.appear` and `ART.eqText` "4 − 3 = 1" at (360, 262); the unpaired duck `ANIM.waddle`s; rail dot fills; after 800 ms the next item builds (`ANIM.appear` on the new rows).
   - **Wrong — the longer row's count (4)**: `ANIM.nudge`, `tone("nudge")`, tile de-selects; the paired animals `ANIM.dimPaired` (alpha 0.25); the unpaired count themselves with `ART.countBadge` 1 … d (300 ms apart, `tone("tap", k)`), the last badge `ANIM.lastBadge`s, `ART.diffTag` shows d for 900 ms; then badges and tag fade (`ANIM.fadeOut`) and the paired animals return to alpha 0.6. Attempt 2.
   - **Wrong — the shorter row's count, the sum, or an off-by-one**: nudge + tone; the same re-count; `ART.eqText` shows the completed sentence for 900 ms. Attempt 2.
   - **Second wrong**: the re-count again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 rows ≤ 6 with the ducks on top and the longer row, difference 1-2; L2 rows ≤ 10, either row may be longer, rows start at different x offsets, difference 1-5; L3 rows ≤ 10 with the SHORTER row spaced wider (pitch 84) so it looks longer, distractors include the difference ± 1.
6. **Finish**: `t("all_done")` (360, 110); a duck and a frog side by side at (320, 200) and (400, 200) joined by an `ART.pairLine` `ANIM.celebrate` together; the summary = the ten completed sentences as chips (`ART.eqChip`, 130 × 36, "7 − 4 = 3") in two rows of five from y = 330 (pitch 140), first-try chips with `ART.dotFull` at their left, helped ones with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  duck:        { kind: "emoji", value: "🦆", size: 44 },          // label of a 56×56 makeTile
  frog:        { kind: "emoji", value: "🐸", size: 44 },          // label of a 56×56 makeTile
  rowIconDuck: { kind: "emoji", value: "🦆", size: 28 },
  rowIconFrog: { kind: "emoji", value: "🐸", size: 28 },
  animalTile:  { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 1, radius: 12 },
  pairLine:    { kind: "shape", shape: "line", w: 90, stroke: "structure", strokeWidth: 5 },   // endpoints set at call: (duck x, 148) to (frog x, 182)
  pairDot:     { kind: "shape", shape: "circle", r: 6, fill: "structure" },
  countBadge:  { kind: "shape", shape: "circle", r: 13, fill: "accent" },     // numeral 16 px display, color inkOnAccent
  diffTag:     { kind: "text",  value: "", size: 48, font: "display", color: "structure" },
  eqText:      { kind: "text",  value: "", size: 30, font: "display", color: "structure" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:      { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Row layout: the top row at y = 120, the bottom row at y = 210; the k-th animal of a row at x = x0 + (k − 1) × pitch, where x0 = 120 and pitch = 60 by default (ten animals span x = 120 … 660, inside the 16-px margin); L2 offsets x0 by +30 or +60 on one row; L3 uses pitch 84 on the SHORTER row (≤ 7 animals: 120 … 624).

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "animal selected as a pair source" },
  lineDraw:  { scaleY: 1, duration: 200, ease: "Sine.Out", trigger: "a pairLine growing from its top end (from scaleY 0, origin at the top)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the unpaired animals together when pairing completes" },
  dimPaired: { alpha: 0.25, duration: 200, ease: "Sine.Out", trigger: "paired animals and lines at the start of a re-count (back to 0.6 after)" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countBadge on an unpaired animal (from alpha 0, scale 0.5)" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last unpaired animal's badge" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  waddle:    { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the unpaired animals on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "diffTag, eqText; new rows (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "re-count badges and diffTag clearing after 900 ms" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish duck and frog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ (d)  [D] [D] [D] [D] [D] [D] [D]           row 1 y=120       │
      │       |   |   |   |                        pairLines         │  zone A
      │ (f)  [F] [F] [F] [F]                       row 2 y=210  "3"  │
      │      x=120, pitch 60                       diffTag (640,165) │
      │                  "7 − 4 = 3"  eqText (360,262)               │
260   ├──────────────────────────────────────────────────────────────┤
      │           "Pair them up" / "How many more?" (360,296)        │
      │        [ 3 ]        [ 7 ]        [ 4 ]   y=400                │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop centred)                         │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
`D` / `F` = duck / frog tiles; `(d)` / `(f)` = the row icons at x = 70. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`.
- Animals: `makeTile` 56 × 56 with `ART.animalTile` tokens and `ART.duck` / `ART.frog` as label (through the draw helper) at the row positions; selected = library selected look + `ANIM.lift`; paired = alpha 0.6 with `ART.pairDot` at the line ends; `ART.rowIconDuck` / `ART.rowIconFrog` at (70, 120) / (70, 210).
- `ART.pairLine` from (duckX, 148) to (frogX, 182); lines may cross.
- `ART.countBadge` at an unpaired animal's (+20, −20) with the numeral in `THEME.colour.inkOnAccent`, 16 px; `ART.diffTag` at (640, 165); `ART.eqText` at (360, 262).
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`, disabled (alpha 0.5) until pairing completes; `ART.showRing` behind the correct tile.
- Caption `S("pairThem")` then `S("howManyMore")` at (360, 296), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600.
- Tap floors: animals 56 (6-8 floor) with pitch 60 → 4 px visual gap; to keep ≥ 12 px between hit areas the tile hit rectangle is 48 × 56 (drawn 56, hit 48). Tiles 96, gaps 24.
- During a re-count (≈ 1.5-3 s) the tiles are `setEnabled(false)`; they re-enable when it ends.
- Tab order: row 1 left → right, row 2 left → right, then the three tiles; Enter selects / pairs / picks. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (top row count, bottom row count; tiles), the longer row named by the counts; tiles = difference, longer count, shorter count at L1-L2 (the sum replaces the shorter count in the marked L2 items), difference, difference ± 1 at L3. Tile slots shuffled; the correct slot never repeats twice running (§13).
- **L1** (ducks on top and longer; rows ≤ 6; difference 1-2): (4, 3; 1, 4, 3) · (5, 3; 2, 5, 3) · (6, 4; 2, 6, 4) · (3, 2; 1, 3, 2) · (5, 4; 1, 5, 4) · (6, 5; 1, 6, 5)
- **L2** (either row longer; rows ≤ 10; one row offset by +30 or +60 px; difference 1-5): (7, 4; 3, 7, 4) · (5, 8; 3, 8, 5) · (9, 5; 4, 9, 14 sum) · (6, 10; 4, 10, 6) · (8, 3; 5, 8, 11 sum) · (4, 9; 5, 9, 4) · (10, 7; 3, 10, 17 sum) · (7, 9; 2, 9, 7)
- **L3** (the shorter row at pitch 84 so it looks longer; difference ± 1 distractors): (9, 6; 3, 2, 4) · (5, 10; 5, 4, 6) · (10, 6; 4, 3, 5) · (7, 10; 3, 2, 4) · (8, 5; 3, 4, 2) · (6, 9; 3, 2, 4) · (10, 8; 2, 1, 3) · (4, 7; 3, 2, 4)

Play list of 10 per Rules; no item repeats within a session; a level's pool is reshuffled if exhausted.

Worked example: (4, 3) pairs three, taps 1 first-try · (5, 3) first-try → L2 · (7, 4) taps 7 → paired dim, three unpaired badged 1-3, "3" shows → taps 3 (helped) → L1 · (6, 4) first-try · (3, 2) first-try → L2 · (5, 8) frogs longer, first-try · (9, 5) first-try → L3 · (9, 6) frogs spaced wide, pairs six, taps 3 first-try · (5, 10) taps 4 → re-count → 5 (helped) → L2 · (6, 10) first-try → Finish: 10 chips, 8 with filled dots.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tile on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- Stuck rule (an inactivity cue only, never a clock): if 6 s pass with the shorter row not fully paired and no tap, the first unpaired animal of the shorter row `ANIM.pulse`s once; repeats every 6 s of inactivity.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], `ART.diffTag` and the sentence appear, the unpaired animals `ANIM.waddle`, rail dot, next item after 800 ms.
- What happens on a wrong answer:
  - The longer row's count (answered the row, not the leftover): nudge + `tone("nudge")`; the paired animals dim and the unpaired count themselves, ending on the difference tag.
  - The shorter row's count, the sum, or the difference ± 1: nudge + tone; the same re-count, with the completed sentence shown for 900 ms.
  - Two taps in the same row: not an attempt — the selection switches to the second animal.
  - A paired animal tapped: un-pairs (undo), not an attempt.
- Retry behaviour: attempt 1 unaided → attempt 2 after the re-count → attempt 3 with the show-me ring; solved-with-help. No attempt 4. An item completed after any wrong tile is not first-try.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "How Many More"; `pairThem` = "Pair them up"; `howManyMore` = "How many more?".

## Sound
`tone("tap")` on selecting an animal; `tone("tap", k)` on the k-th pairing line and on the k-th badge of a re-count; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings and both captions change; the rows are pictures).
- [ ] Works at narrow width (400-px iframe: two rows of ten animals, the row icons, the difference tag and three tiles fully visible).
- [ ] Keyboard operable (Tab walks row 1 then row 2 then the tiles; Enter selects an animal, Enter on an animal in the other row pairs them; Enter on a paired animal un-pairs).
- [ ] Never auto-starts.
- [ ] No losing state (wrong tiles never end the session; the show-me ring always completes the item).
- [ ] Tapping a duck then a frog draws a line between them and dims both; tapping a dimmed animal removes its line.
- [ ] Tapping two ducks in a row switches the selection and draws nothing.
- [ ] Numeral tiles are dimmed until every animal of the shorter row has a line.
- [ ] Tapping 7 for 7 ducks and 4 frogs dims the paired animals and numbers the three unpaired ducks 1, 2, 3 with a big 3 at the right.
- [ ] At the second level the frog row can be the longer one; at the third level the shorter row is spread wider and still has fewer animals.
- [ ] Two first-try corrects in a row bring longer rows; a wrong tile brings shorter ones.
- [ ] The finish screen lists the ten sentences with a filled dot for first-try ones and a hollow dot for helped ones; no score.
- [ ] With `?sound=off` nothing is audible.
