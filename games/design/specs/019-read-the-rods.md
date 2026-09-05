# 019 — Read the Rods

## Identity
- Slug: `read-the-rods`
- Subject / topic: Mathematics / reading a two-digit number from base-ten blocks (rods and cubes in a mixed arrangement)
- Age band: `6-8`
- Interaction pattern: `P11` — keypad entry (two-digit answers; physical keyboard digits also work)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P11. Everything below adds to those; nothing overrides them.

## Learning
- Objective: Types the two-digit number shown by a set of ten-rods and one-cubes, even when the blocks are mixed up rather than sorted tens-then-ones, and even when there are ten or more cubes.
- Prerequisites: Reads and types numerals to 99; knows a rod is ten ones (games 016-018).
- Curriculum links: F-108 (digits as independent numbers; zero placeholder; de/nl/da inverted number words), F-102 (order reversal 12↔21, syntactic transcoding), F-50 (base-ten blocks), F-21, F-31 row "Place value tens/ones" — conservative 7-8 → 6-8 (US 1.NBT.B.2 / 2.NBT.A.1; England Y2 "recognise the place value of each digit"; Germany Klasse 2 "Stellenwerte"; France CE1 "dizaines et unités"; Netherlands groep 4; Spain 1º ciclo; Brazil EF02MA04; Sweden åk 1-3 "positionssystemet"; Finland grades 1-2).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **Reading the blocks left to right as digits (a cube, then two rods, then a cube → "121" or "12").** Response: the wrong answer makes the blocks SORT themselves — every rod glides to the rod area at the left and every cube to the cube area at the right (`ANIM.sortGlide`, one block at a time, 120 ms apart) — and then count themselves 10, 20 then 21, 22 with badges; the display clears with `ANIM.nudge`. The mixed arrangement is the point of L2+: the child must find the tens wherever they are.
  2. **Counting every block as one (2 rods + 3 cubes → "5").** Response: the same sort-and-count; the rods' badges read 10, 20 — a rod is never "1". The rod also carries its ten notches so the ten is visible.
  3. **Zero placeholder dropped (4 rods, no cubes → "4").** Response: L3 includes rod-only sets; the count ends at "40" and an empty dashed cube area (`ART.emptyOnes`) is outlined with a "0" badge inside it (`ART.countBadge` "0") before the display clears.
  4. **Ten or more cubes not regrouped (3 rods + 12 cubes → "312").** Response: the display accepts up to three digits so the error CAN be made; on the wrong answer the twelve cubes bundle — ten of them glide together into a new rod (`ANIM.bundle`) — then the sorted set counts 10, 20, 30, 40, 41, 42.
  5. **Digit order reversed when typing (types 23 for 32 — F-102, and de/nl/da word order "zweiunddreißig").** Response: the sorted count writes 10, 20, 30 on the rods and 31, 32 on the cubes in that order, and on the third attempt the answer builds itself on the display digit by digit — the tens digit appears first, over the rods, then the ones digit over the cubes (`ANIM.digitIn`) — so the typing order matches the block order.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Read the Rods"): the mouse (`ART.mouse`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 2 rods + 3 cubes, sorted).** The Play scene builds: the dot rail of 12 hollow dots at y = 28 (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the block board (`ART.board`, 400 × 190) centred at (240, 160): at L1 the rods stand at the left (`ART.rod` 16 × 80 at x = 90 + i × 26, y = 160) and the cubes sit at the right (`ART.cube` 18 × 18 at x = 300 + (j mod 5) × 24, y = 130 + floor(j / 5) × 24); the mouse at (60, 240) peeks at the board. To the right, the display card (`ART.card`, 200 × 84) at (560, 130) with `ART.display` (52 px) empty; under it the caption `S("whatNumber")` ("What number is this?") at (560, 200), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` width 200. Zone B: the keypad — nine keys (`ART.key`, 60 × 60) in a 3 × 3 grid at x = 292 / 360 / 428, y = 296 / 364 / 432, labelled 1-9 in phone order (1 2 3 on the top row); a fourth row at y = 500: backspace (`ART.key` with `ART.backGlyph`) at (292, 500) and 0 at (360, 500). Zone C: OK (`makeButton ok`) at (560, 500), disabled until the display holds at least one digit.
3. **Typing.** The child taps digits: each appears on `ART.display` (`ANIM.digitIn`), `tone("tap")`; up to three digits are accepted (a fourth tap is ignored). Backspace removes the last digit. Physical keys 0-9, Backspace and Enter do the same. OK enables at the first digit.
4. **Check.** The child taps OK (or Enter).
   - **Correct (23):** the display `ANIM.pop`s, `tone("correct")`; the blocks count themselves once anyway (rods 10, 20 with `ART.countBadge`s, then cubes 21, 22, 23, rising tones) so the structure is shown on every success (F-43); `GameCore.showPraise(scene, key)` with the next praise key; the mouse `ANIM.squeak`; the rail dot fills; after 900 ms the next item builds (`ANIM.appear`) with an empty display.
   - **Wrong (e.g. 32 or 5 or 312):** `tone("nudge")`; the display clears with `ANIM.nudge`; the enacted hint plays — bundling if cubes ≥ 10 (`ANIM.bundle`), then the sort (`ANIM.sortGlide`), then the self-count with badges (the badges stay visible); OK disables until a digit is typed. Attempt 2 with the sorted, counted blocks in view.
   - **Wrong again (attempt 2):** the same enactment; then the show-me: the correct answer builds itself on the display digit by digit (`ANIM.digitIn`, tens digit first while the rods pulse, ones digit second while the cubes pulse), stays 1200 ms, and clears; the child re-types it and taps OK, which now carries the show-me ring (`ART.showRing`, `ANIM.showMe`); the item completes as solved-with-help (no praise pop). If the re-typed answer is still wrong, the answer builds itself again and waits (no attempt counting beyond this; the item completes on the next correct entry).
5. **Re-queue** (F-41): an item answered wrong first-try re-enters the play list after 2 intervening items with its blocks re-mixed; the item count stays 12 (the re-queued item replaces the last unplayed item of the same level).
6. **Items 2-12.** Built from the level pools in Content by the Rules. L1 blocks are sorted (rods left, cubes right); L2 and L3 blocks are mixed: the rods and cubes are dealt in a shuffled order into a two-row layout of 20 positions (row 1 y = 120, row 2 y = 205; x = 76 + p × 20, p = 0 … 19; a rod occupies one position and is drawn vertically; a cube one position) — so a rod may stand between two cubes.
7. **Finish** (after 12 items): Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the mouse at (360, 210) with `ANIM.celebrate`. Zone B: the twelve numbers as chips (`ART.numberChip`, 64 × 36) in two rows of six (y = 370 and y = 420; x = 360 − 2.5 × 72 + i × 72), each with tiny blocks beneath (`ART.miniRod` × tens, `ART.miniCube` × ones); first-try items carry `ART.dotFull` at their left, helped items `ART.dotEmpty` — a record of what was read unaided, not a score. Zone C: `makeButton play_again` at (250, 510), `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 6 minutes: 12 items × (type + Check + count ≈ 25-35 s).

## Art registry
```js
const ART = {
  mouse:      { kind: "emoji", value: "🐭", size: 72 },
  board:      { kind: "shape", shape: "roundRect", w: 400, h: 190, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  rod:        { kind: "shape", shape: "rect", w: 16, h: 80, fill: "structure", stroke: "bg", strokeWidth: 1 },    // nine hairline notches (line token) 8 px apart
  cube:       { kind: "shape", shape: "rect", w: 18, h: 18, fill: "accent", stroke: "bg", strokeWidth: 1 },
  emptyOnes:  { kind: "shape", shape: "roundRect", w: 110, h: 100, stroke: "accent", strokeWidth: 2, radius: 8 },   // dashed; the empty cube area for rod-only sets
  countBadge: { kind: "shape", shape: "roundRect", w: 34, h: 20, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 4 },   // numeral 13 px display structure
  card:       { kind: "shape", shape: "roundRect", w: 200, h: 84, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  display:    { kind: "text",  value: "", size: 52, font: "display", color: "ink" },
  key:        { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },  // digit 28 px display ink
  backGlyph:  { kind: "text",  value: "⌫", size: 28, font: "display", color: "structure" },
  showRing:   { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  numberChip: { kind: "shape", shape: "roundRect", w: 64, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  miniRod:    { kind: "shape", shape: "rect", w: 4, h: 18, fill: "structure" },
  miniCube:   { kind: "shape", shape: "rect", w: 4, h: 4, fill: "accent" },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Rods and cubes differ by size AND shape AND notches, never by colour alone. The art upgrade replaces the mouse and may replace the blocks; nothing else changes.

## Animation registry
```js
const ANIM = {
  digitIn:   { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "a digit appears on the display (from alpha 0, scale 0.6); also the show-me digits" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "display on a wrong answer (then its text is cleared)" },
  sortGlide: { duration: 220, ease: "Sine.InOut", trigger: "each block to its sorted position, 120 ms apart (x, y set at call): rods to x = 90 + i × 26, y = 160; cubes to x = 300 + (j mod 5) × 24, y = 130 + floor(j / 5) × 24" },
  bundle:    { duration: 500, ease: "Sine.InOut", trigger: "ten cubes glide to one point and are replaced by a rod (alpha swap over the last 100 ms)" },
  badgeIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges in turn, 250 ms apart (from alpha 0, scale 0.5)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "display on a correct answer" },
  pulse:     { scale: 1.12, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "rod group while the tens digit builds; cube group while the ones digit builds" },
  squeak:    { scaleY: 0.85, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "mouse on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new item's blocks (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around OK during show-me (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish mouse" }
};
```
No flashing: `showMe` cycles at 1 Hz; the show-me digits appear once each.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ ┌────────────────────────────────────┐    ┌───────────┐       │
      │ │ |  ::  |  .  |   ::   (mixed, L2+) │    │    23     │(560,130)│  zone A
      │ │ ART.board (240,160) 400×190        │    └───────────┘       │
      │ └────────────────────────────────────┘  "What number is this?"│
      │  mouse (60,240)                          (560,200)            │
260   ├──────────────────────────────────────────────────────────────┤
      │              [1] [2] [3]   y=296                              │
      │              [4] [5] [6]   y=364     keys 60×60               │  zone B
      │              [7] [8] [9]   y=432     x=292/360/428            │
480   ├──────────────────────────────────────────────────────────────┤
      │              [BK][0]       y=500            [   OK   ] (560,500)│  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `|` = a rod, `.` / `:` = cubes, BK = backspace. Mixed layout positions (L2/L3): 20 positions in two rows, x = 76 + p × 20 (p = 0 … 19), rows y = 120 and y = 205; a set of R rods and C cubes takes the first R + C positions of a shuffled order of the 20 (rods drawn vertically 16 × 80 centred on the position, cubes 18 × 18).

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: 12 × `ART.dotEmpty` at y = 28, 22 px apart, centred (x = 239 + i × 22); filled dots use `ART.dotFull`. `t("question_x_of_y")` at (360, 48).
- `ART.board` centred (240, 160); blocks `ART.rod` / `ART.cube` at the L1 sorted positions or the mixed positions; `ART.countBadge` above each rod (+ (0, −50)) and above each cube (+ (0, −16)) during a self-count; `ART.emptyOnes` centred (330, 155) with a "0" badge for rod-only sets.
- `ART.mouse` at (60, 240).
- `ART.card` at (560, 130) with `ART.display` centred (52 px `THEME.font.display` `THEME.colour.ink`, right-aligned within a 160-px box so digits fill from the left as typed); caption `S("whatNumber")` at (560, 200).
- Keypad: 11 × `makeTile` 60 × 60 with `ART.key` tokens; digit labels 28 px `THEME.font.display` `THEME.colour.ink`; the backspace tile's label is `ART.backGlyph`. Gaps 8 (pitch 68) — accepted for a keypad whose neighbouring keys are equivalent-risk targets, and every key is ≥ 56.
- OK: `makeButton ok` at (560, 500), alpha 0.5 while disabled; `ART.showRing` around it during show-me.
- Tab order: keys 1-9 in reading order, backspace, 0, then OK. Physical keyboard: `keydown` for 0-9, Backspace, Enter (BUILD-CONVENTIONS P11).
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral except one caption ("What number is this?"), a game-specific string. `LOCALE_DATA` not needed; number words never appear.

Items as (rods; cubes = answer; layout):
- **L1** (sorted layout; 1-4 rods, 1-5 cubes): (2; 3 = 23) · (1; 4 = 14) · (3; 1 = 31) · (4; 5 = 45) · (1; 2 = 12) · (3; 6 = 36)
- **L2** (mixed layout; 2-7 rods, 1-9 cubes): (2; 7 = 27) · (5; 2 = 52) · (6; 8 = 68) · (7; 3 = 73) · (4; 1 = 41) · (5; 9 = 59)
- **L3** (mixed layout; rod-only sets and sets with 10 or more cubes): (4; 0 = 40) · (3; 12 = 42) · (7; 0 = 70) · (2; 15 = 35) · (9; 0 = 90) · (5; 11 = 61)

Play list: 12 items with re-queue (How it plays §5); start at L1; shuffle within the level without repeats; level changes per Rules; if a pool is exhausted it is reused reshuffled with the blocks re-mixed. Two consecutive items never share an answer.

## Rules
- Item count: 12 (including re-queued repeats, which replace unplayed items).
- Difficulty progression: after 2 consecutive first-try correct answers, the next item comes from the next level up (cap L3). "First-try correct" = the first OK was correct.
- Adaptation: a wrong answer on an item, or wrong first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned; a missed item re-queues after 2 items.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no key tapped, the display card `ANIM.pulse`s once; repeats every 8 s. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: `ANIM.pop` on the display, `tone("correct")`, the blocks count themselves once (badges, rising tones), `showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation, mouse `ANIM.squeak`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Blocks read as digits in the order seen (121, 12 for a cube-rod-rod-cube set)**: `tone("nudge")`, display clears with `ANIM.nudge`; the blocks sort themselves (`ANIM.sortGlide`) and count 10, 20 then 21, 22 with badges that stay visible.
  - **Every block counted as one (5 for 2 rods + 3 cubes)**: the same sort-and-count; the rods' 10, 20 badges are the information.
  - **Zero dropped (4 for 4 rods)**: sort-and-count ends at 40; `ART.emptyOnes` appears with a "0" badge.
  - **Cubes not regrouped (312 for 3 rods + 12 cubes)**: ten cubes `ANIM.bundle` into a rod first, then sort-and-count 10, 20, 30, 40, 41, 42.
  - **Digits reversed (23 for 32)**: sort-and-count; on attempt 3 the answer builds tens digit first over the pulsing rods, then the ones digit over the pulsing cubes.
  - **A fourth digit typed**: ignored (no error, no sound).
- Retry behaviour: attempt 1 unaided → attempt 2 with the sorted, counted blocks in view → attempt 3 the answer builds itself and the child re-types it with the ringed OK; solved-with-help. No attempt 4 (a still-wrong re-type just rebuilds the answer again until it is entered).
- Finish condition: 12 items solved → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Read the Rods"
  - `whatNumber` = "What number is this?"

## Sound
`GameCore.tone` only (§11): `tone("tap")` on each key; `tone("tap", k)` per badge during a self-count (k = tens count for rods — a big step per rod — then one step per cube, F-213); `tone("tap", 10)` on a bundle; `tone("correct")` on a correct answer; `tone("nudge")` on a wrong answer (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, OK, "Question 3 of 12", "All done!", "Play again", "Menu" and the praise pops; "What number is this?" changes once translations are loaded.
- [ ] Works at narrow width: in a 400-px-wide iframe the board, the display card, all eleven keys and OK are visible and separate.
- [ ] Keyboard operable: Tab walks the keys then OK; Enter taps; physical digit keys type, Backspace deletes, Enter checks.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: wrong answers never end the session; after two wrong answers the correct number builds itself on the display and re-typing it completes the item.
- [ ] Typing 2 then 3 shows "23" on the display; backspace shows "2"; OK is dimmed while the display is empty.
- [ ] A correct answer still makes the blocks count themselves (10, 20, 21, 22, 23) before the next item.
- [ ] At the second level rods and cubes are mixed together on the board; a wrong answer makes every rod slide to the left and every cube to the right before they count.
- [ ] For a board with 3 rods and 12 cubes, typing 312 makes ten cubes join into a new rod, then the count reads 10, 20, 30, 40, 41, 42.
- [ ] For a board with only 4 rods, typing 4 shows a dashed empty area with a "0" badge after the count reaches 40.
- [ ] A missed item comes back two items later with its blocks re-mixed.
- [ ] Two first-try corrects in a row bring mixed boards, then boards with 10+ cubes; two misses in a row bring sorted boards.
- [ ] The finish screen lists twelve numbers with tiny blocks, a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
