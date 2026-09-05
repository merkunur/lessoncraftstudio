# 017 — Teen Pairs

## Identity
- Slug: `teen-pairs`
- Subject / topic: Mathematics / teen numbers (11-19) as one ten and some ones
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P12. Everything below adds to those; nothing overrides them.

## Learning
- Objective: Pairs each teen numeral (11-19) on a visible board with the picture that shows one ten-rod and the matching number of one-cubes, including pictures where the cubes are not drawn to the right of the rod.
- Prerequisites: Reads numerals to 20; counts to 9; has met a ten as one object (game 016 or a ten-frame). Reads nothing else.
- Curriculum links: F-108 (teens: "eleventeen", 16 as 61; de/nl/da invert tens and ones in the number word — "sechzehn"), F-102 (order reversal 12↔21; "12 always paired with 1 rod + 2 ones"), F-50 (base-ten blocks are an evidence-backed representation), F-21, F-31 row "Place value tens/ones (teens)" — conservative 7-8, earliest 5 → 6-8 (US 1.NBT.B.2b "the numbers from 11 to 19 are composed of a ten and one, two … nine ones"; England Y1 "identify one more/less … tens and ones"; Germany Klasse 1 "Zahlen bis 20 als Zehner und Einer"; France CP "dizaine et unités"; Netherlands groep 3 "tientallen"; Spain 1º; Brazil EF01MA07; Sweden åk 1; Finland grade 1).
- Common misconceptions (F-108, F-102), each with this game's response:
  1. **Reading the picture by counting every block as one (1 rod + 6 cubes = "7").** Response: a wrong pair that involves a picture makes that picture count itself the place-value way: the rod pulses with an `ART.countBadge` "10", then each cube gets its badge 11, 12, … up to the true value (`ANIM.badgeIn`, 250 ms apart, `tone("tap", k)`), before the two tiles nudge apart. The rod is never counted as "1".
  2. **Digits treated as independent (16 read as "6 and 1", pairing 16 with 1 rod + 1 cube + something).** Response: the self-count above always ends on the picture's true value; on L3 boards the cubes are drawn LEFT of the rod or ABOVE it, so a child cannot read the picture left-to-right as digits — the rod must be found and counted as ten first. For the de/nl/da number words the visual layout tens-then-ones is the anchor, never the word order.
  3. **Near-neighbour confusion (pairing 15 with the 16 picture — losing count of the cubes).** Response: L2 boards hold adjacent teens (14, 15, 16, 17, 19), so the near miss is possible; the self-count shows exactly one cube too many or too few; after the same tile has been in two wrong pairs its true partner gains a soft outline (`ART.hintRing`).
  4. **Tapping two numerals (or two pictures) as a "pair".** Response: both nudge apart with no self-count (there is nothing to count); the tiles stay enabled. Tapping the same tile twice de-selects it (no error).

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title "Teen Pairs"): the otter (`ART.otter`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Board 1 (L1: 4 pairs, 8 tiles).** The rail shows 2 dots (§6 — one per board; two boards per session at 6-8, a third when the child reaches L3). Zones A and B are merged into one 4 × 2 grid of tiles (`ART.tile`, 100 × 100, gap 20) centred at (360, 300): columns x = 180 / 300 / 420 / 540, rows y = 240 / 360. Four tiles are numerals (11, 13, 15, 18 at 44 px); four are pictures: each shows `ART.rod` (14 × 70) at the tile's left and `ART.cube`s (14 × 14) in a column of up to five at x + 10 and a second column at x + 28 (canonical layout). The layout is shuffled. The otter stands at (70, 300). No caption.
3. **Pairing.** Tap a tile: it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (numeral 13 with the 1-rod-3-cubes picture):** both tiles glide 20 px toward each other (`ANIM.join`), `tone("correct")`; the picture counts itself once (rod "10", cubes 11, 12, 13 with rising tones) and the numeral tile `ANIM.pop`s on the last badge; both lock: alpha 0.6 with `ART.link` (a short `structure` bar) drawn between their facing edges; the otter `ANIM.clap`. The self-count on a CORRECT pair is what makes the pair teach (the structure is shown every time, F-43).
   - **Not a pair (numeral + wrong picture, or picture + wrong numeral):** the picture counts itself (rod "10", cubes 11 … n) so the child sees its true value, then both `ANIM.nudge`, `tone("nudge")`, both de-select. If the FIRST-tapped tile has now been in two wrong pairs, its partner gains `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Two numerals or two pictures:** both nudge, `tone("nudge")`, both de-select, no self-count.
   - **Same tile twice:** de-select, `tone("tap")`.
4. **Board complete** (all pairs locked): `GameCore.showPraise(scene, key)` with the next praise key; the rail dot fills; `ANIM.boardOut` (all tiles rise and fade); the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-3.** L2: 5 pairs (10 tiles, 5 × 2 grid: x = 152 / 256 / 360 / 464 / 568, tiles 96 × 96), adjacent teens, canonical pictures. L3: 5 pairs, pictures in non-canonical layouts (cubes left of the rod, or cubes in a row above a horizontal rod), teens chosen so that two pictures differ by one cube.
6. **Finish**: Finish scene per §10. Zone A: `t("all_done")` at (360, 110), 52 px, `THEME.colour.structure`; the otter (360, 210) `ANIM.celebrate`. Zone B: every pair made this session as a chip (`ART.pairChip`, 96 × 40) showing the numeral and, beside it, a tiny rod + cubes (`ART.miniRod`, `ART.miniCube`) in rows of five from y = 350 (x = 360 − 2 × 108 + i × 108, next row y + 52) — the visual record; optional `t("question_x_of_y")` with n = pairs made without a wrong pair at (360, 470). Zone C: `makeButton play_again` at (250, 510), `makeButton menu` at (470, 510). `GameCore.tone("finish")` once. `GameCore.reportHeight()`.

One session ≈ 5-6 minutes (2-3 boards, 4-5 pairs each, each pair's self-count ≈ 2 s).

## Art registry
```js
const ART = {
  otter:     { kind: "emoji", value: "🦦", size: 80, fallback: "🐻" },   // Unicode 12 otter; bear fallback for old platforms
  tile:      { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // numeral tiles: 44 px display ink
  rod:       { kind: "shape", shape: "rect", w: 14, h: 70, fill: "structure", stroke: "bg", strokeWidth: 1 },   // ten notches drawn as 9 hairlines across it (line token) 7 px apart
  cube:      { kind: "shape", shape: "rect", w: 14, h: 14, fill: "accent", stroke: "bg", strokeWidth: 1 },
  countBadge:{ kind: "shape", shape: "roundRect", w: 30, h: 18, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 4 },   // numeral 12 px display structure, beside a rod/cube
  link:      { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  hintRing:  { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:  { kind: "shape", shape: "roundRect", w: 96, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },   // numeral 20 px display ink at its left
  miniRod:   { kind: "shape", shape: "rect", w: 5, h: 24, fill: "structure" },
  miniCube:  { kind: "shape", shape: "rect", w: 5, h: 5, fill: "accent" },
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Rods and cubes are shapes (colour AND size AND notches distinguish a rod from a cube — never colour alone); the art upgrade may replace them with SVG blocks and nothing else changes.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each tile of a correct pair moves 20 px toward the other (x, y set at call)" },
  badgeIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges on a picture during a self-count, 250 ms apart (from alpha 0, scale 0.5); badges fade after 900 ms via fadeOut" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "count badges after a self-count" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "numeral tile on the last badge of a correct pair" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a non-pair" },
  clap:      { scaleX: 0.9, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "otter on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish otter" }
};
```
No flashing: `showMe` cycles at 1 Hz; badges appear once per self-count.

## Screen layout
Stage 720 × 560, `Scale.FIT`, everything fixed.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                 ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │  otter     [ 13 ]   [|:: ]   [ 18 ]   [|.  ]   row y=240      │
      │  (70,300)                                                    │  zones A+B
      │            [|::.]   [ 11 ]   [|::::]  [ 15 ]   row y=360      │
      │            x=180    x=300    x=420    x=540   (100×100)      │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `|` = a rod, `.` / `:` = cubes. 5-pair boards use x = 152 / 256 / 360 / 464 / 568 with 96 × 96 tiles. Picture layouts inside a tile (relative to its centre): **canonical** — rod at (−28, 0), cubes in a column at x = +10 (y = −28, −14, 0, 14, 28 for cubes 1-5) and a second column at x = +28 (cubes 6-9); **cubes-left** (L3) — cubes at x = −28 / −10, rod at (+22, 0); **cubes-above** (L3) — the rod horizontal (70 × 14) at (0, +24), cubes in a row at y = −20 (x = −28 + i × 14 for cubes 1-5) and a second row at y = −36 (cubes 6-9).

## Visual specification
- Background: `THEME.colour.bg`.
- Rail: one `ART.dotEmpty` per board (2 or 3) at y = 28, 22 px apart, centred; swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` with `ART.tile` tokens; numeral tiles carry the numeral at 44 px `THEME.font.display` `THEME.colour.ink`; picture tiles carry `ART.rod` + `ART.cube`s drawn at the layout positions above (the tile's `label` is empty; the blocks are added to its container). Selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the two tiles' facing edges.
- `ART.countBadge` beside a rod (at rod centre + (0, −44)) and beside each cube (cube centre + (18, 0) for columns, (0, −14) for rows) during a self-count, numeral 12 px `THEME.font.display` `THEME.colour.structure`.
- `ART.hintRing` behind a tile; `ART.otter` at (70, 300).
- Tap floors: 96-100 ≥ 56; gaps ≥ 8 at 5 columns (pitch 104, tiles 96), 20 otherwise.
- Tab order: reading order of the grid (row 1 left to right, then row 2).
- `?embed=1`: the picker is not created; nothing else changes.

## Content
Language-neutral: numerals and block pictures only. `LOCALE_DATA` not needed. Number words never appear (they are exactly the locale-bound surface F-108 warns about).

Boards as sets of teen values (each value = one numeral tile + one picture tile of 1 rod + (value − 10) cubes):
- **L1** (4 pairs, well-separated teens, canonical pictures; pick one board at random): {11, 13, 15, 18} · {12, 14, 17, 19} · {11, 14, 16, 19} · {12, 15, 17, 18}
- **L2** (5 pairs, adjacent teens, canonical pictures): {14, 15, 16, 17, 19} · {11, 12, 13, 15, 16} · {13, 14, 16, 17, 18} · {12, 13, 15, 18, 19}
- **L3** (5 pairs, non-canonical picture layouts — each board lists the layout per value; two values always differ by one cube): {12 cubes-left, 13 cubes-above, 16 cubes-left, 17 cubes-above, 19 cubes-left} · {11 cubes-above, 14 cubes-left, 15 cubes-above, 18 cubes-left, 19 cubes-above} · {13 cubes-left, 14 cubes-above, 16 cubes-above, 17 cubes-left, 18 cubes-above}

Tile layout shuffled per board; the two tiles of one pair are never horizontally adjacent in the same row on a fresh board. A session never repeats a board.

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 14 pairs at most).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, the picture's self-count (rod "10", cubes 11 … n with rising tones), `ANIM.pop` on the numeral, tiles lock with `ART.link`, otter `ANIM.clap`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer (per anticipated mistake):
  - **Numeral paired with a near-neighbour picture** (lost count of cubes) or **any numeral + wrong picture** (counting the rod as one / digits read independently): the picture counts itself (rod "10", then the cubes) so its true value is shown, then both nudge, `tone("nudge")`, both de-select. The board is never reset.
  - **Two numerals or two pictures**: both nudge, no self-count.
  - **The same tile in two wrong pairs**: its true partner gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is shown). A board always completes (success is certain).
- Finish condition: the session's boards complete → Finish scene. No losing state exists; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("question_x_of_y")` (finish screen only), `t("all_done")`, `t("play_again")`, `t("menu")`, praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific strings (`STRINGS.en`, read via `S(key)`):
  - `title` = "Teen Pairs"
  - No words appear on the play screen.

## Sound
`GameCore.tone` only (§11): `tone("tap")` on select / de-select; `tone("tap", 10)` when a rod's "10" badge appears and `tone("tap", k)` for each cube badge k = 11 … n (the pitch jumps for the ten, then climbs one step per cube — the structure is audible, F-213); `tone("correct")` on a pair; `tone("nudge")` on a non-pair (mellow, never a buzzer); `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "All done!", "Play again", "Menu" and the praise pops; the play screen has no words.
- [ ] Works at narrow width: in a 400-px-wide iframe a 5 × 2 board is fully visible with separate tiles and the blocks inside picture tiles are distinguishable.
- [ ] Keyboard operable: arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair.
- [ ] Never auto-starts: the start screen shows until Start is tapped.
- [ ] No losing state: any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a tile.
- [ ] All tiles are face up at all times; nothing has to be remembered.
- [ ] Pairing 13 with the 1-rod-3-cubes picture makes the picture count "10, 11, 12, 13" with badges before the two tiles lock with a bar between them.
- [ ] Pairing 15 with the 1-rod-6-cubes picture counts the picture to 16 and then nudges both apart.
- [ ] Tapping two numerals nudges both apart without any counting.
- [ ] At the third level some pictures have the cubes to the left of the rod or above a horizontal rod, and pairing still works.
- [ ] A board with 0-1 mistakes is followed by a bigger board with closer teens; a board with 3+ mistakes by a smaller one.
- [ ] The finish screen lists every pair made as numeral + tiny blocks and shows no score beyond the optional "n of total".
- [ ] If the otter emoji is missing on the device a bear appears instead.
- [ ] With `?sound=off` nothing is audible; with sound on, the rod's "10" is a jump in pitch and each cube a small step.
