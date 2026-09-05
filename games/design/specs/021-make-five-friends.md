# 021 — Make Five Friends

## Identity
- Slug: `make-five-friends`
- Subject / topic: Mathematics / number bonds to 5 (pairs of parts that make 5, shown as dots and as numerals)
- Age band: `5-6`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Content is language-neutral (dots and numerals 0-5); no `LOCALE_DATA`.

## Learning
- Objective: On a visible board of dot-tiles and numeral-tiles valued 0-5, taps two tiles whose values together make exactly 5, and sees the pair fill a five-frame.
- Prerequisites: Counts a set of up to 5 objects (game 001); recognises the numerals 0-5 well enough to pick them out (game 002). No reading.
- Curriculum links: F-4 (part-part-whole and number bonds in the UK reception core), F-1 (number bonds to 10 in 8 of 15 sources; bonds to 5 are their first rung), F-21 (number composition to 10 in all twelve systems), F-31 row "Number bonds to 10 / part-whole" — conservative 7, earliest 4; bonds to 5 are the 5-6 entry point (England Reception ELG "automatically recall number bonds up to 5"; US K.OA.A.3 "decompose numbers less than or equal to 10"; Germany Klasse 1 "Zahlzerlegungen bis 5 / bis 10"; France GS "décomposer les nombres jusqu'à 5"; Netherlands groep 2-3 "splitsen van 5"; Sweden förskoleklass "talkamrater till 5"; Finland esiopetus "lukujen 1-5 hajottaminen").
- Common misconceptions (F-104, F-101), each with this game's response:
  1. **Adding the two most visible numbers whatever the whole ("3 and 4 — friends!").** Response: a non-pair never locks. Both tiles `ANIM.nudge` apart and the five-frame in zone A enacts the sum: the first tile's dots fill the frame from the left, the second tile's dots follow, and whatever does not fit sits outside the frame as `ART.spillDot` (for 3 + 4: two dots hang off the right end) — the child sees "too many for 5", not a verdict. For a pair under 5 (1 + 2) the empty cells stay hollow and pulse (`ANIM.pulse` on `ART.gapCell`).
  2. **Reading a numeral tile and a dot tile as different kinds of thing (a 2-numeral cannot go with 3 dots).** Response: every board mixes dot tiles and numeral tiles, and the pair test is on VALUE (never on look); when a mixed pair locks, the numeral tile's value is drawn as dots inside the five-frame beside the dot tile's dots (`ART.frameDotA` / `ART.frameDotB`), so 2 (numeral) and 3 dots visibly make the same five.
  3. **Not knowing that 5 + 0 is a bond (zero "is nothing, so it can't be a friend").** Response: 0 and 5 appear only at L3, as a numeral 0 tile and an EMPTY dot tile (`ART.emptyDots` — a hollow five-row with no dots); pairing them fills the five-frame from the 5 alone and the frame shows "5 + 0" in the equation strip; pairing 5 with anything else spills.
  4. **Counting the dot tile wrongly (a 4-dot tile read as 3).** Response: dots on tiles are laid in the fixed five-frame row order (a single row of up to five positions, filled left to right) so a 4-dot tile always has one empty position at the right; on a non-pair, each tile's dots are re-counted with `ART.countBadge` (250 ms apart, `tone("tap", k)`) before the nudge.
  5. **Tapping the same tile twice expecting something to happen.** Response: the second tap de-selects it; `tone("tap")` only, no error.

## How it plays
1. **Start screen**: title "Make Five Friends", the bee (`ART.bee`) at (360, 200), Start, picker. Nothing moves.
2. **Board 1 (L1: 3 pairs, 6 tiles)**: the rail shows 2 dots (§6 — one per board; two boards per session at 5-6, three when the child climbs fast). Zone A: a five-frame (`ART.frameCell` × 5 in a row, cells 56 × 56, pitch 60, centred at (360, 130), so cells at x = 240 / 300 / 360 / 420 / 480) with the bee at (110, 130) beside it; under the frame, `ART.eqText` (empty until a pair locks) at (360, 190). Zone B: a 3 × 2 grid of tiles (`ART.tile`, 100 × 100, gap 20): columns x = 240 / 360 / 480, rows y = 290 / 410. The six tiles this board: dots-1, dots-4, dots-2, numeral 3, numeral 2, dots-3, shuffled. No caption, no words.
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (values total 5)**: `tone("correct")`; the five-frame fills: the first tile's value as `ART.frameDotA` (one per cell from the left, 120 ms apart, `tone("tap", k)`), then the second tile's value as `ART.frameDotB` (a different glyph — hollow with a thick `accent` ring, so the two parts differ by SHAPE, not colour alone); `ART.eqText` shows "a + b = 5" (numerals and symbols only); both tiles glide 20 px toward each other (`ANIM.join`), lock at alpha 0.6 with `ART.link` drawn between them; the bee `ANIM.buzz`. After 900 ms the frame empties (`ANIM.fadeOut` on the frame dots) ready for the next pair; the equation strip keeps the last equation until the next pair.
   - **Not a pair**: the enacted sum first — first tile's dots fill the frame, second tile's dots follow; a total over 5 spills (`ART.spillDot` beyond x = 480 at pitch 60, capped at 5 spill dots), a total under 5 leaves hollow cells that `ANIM.pulse`; `tone("nudge")`; both tiles `ANIM.nudge` and de-select; the frame clears after 900 ms. If the FIRST-tapped tile has now been in two non-pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until paired. The board never resets.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all three pairs locked → praise pop (rotation, §9), the rail dot fills, `ANIM.boardOut` (tiles rise and fade), the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-N**: L1 = 3 pairs from values 1-4 (dots and numerals mixed); L2 = 4 pairs (8 tiles, 4 × 2 grid: x = 180 / 300 / 420 / 540, rows y = 290 / 410) with two numeral-numeral pairs; L3 = 5 pairs (10 tiles, 5 × 2 grid: x = 152 / 256 / 360 / 464 / 568, tiles 96 × 96) including the 0 numeral and the empty dot tile.
6. **Finish**: `t("all_done")` (360, 110); the bee (360, 210) `ANIM.celebrate`; the summary = every pair made this session as small five-frames (`ART.miniFrame`, 90 × 22, filled with its a `ART.miniDotA` and b `ART.miniDotB`) in rows of six from y = 340, pitch 110 × 40 — the visual record of the bonds, no score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes (2-3 boards, 6-12 pairs).

## Art registry
```js
const ART = {
  bee:        { kind: "emoji", value: "🐝", size: 80 },
  tile:       { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // numeral label 52 px display ink, or a dot row
  tileDot:    { kind: "shape", shape: "circle", r: 7, fill: "structure" },        // dots on a dot tile: one row, pitch 16, positions from the left of five slots
  tileSlot:   { kind: "shape", shape: "circle", r: 7, stroke: "line", strokeWidth: 1 },   // the empty positions of the five-slot row on a dot tile
  emptyDots:  { kind: "shape", shape: "roundRect", w: 84, h: 22, stroke: "line", strokeWidth: 2, radius: 6 },   // the 0-value dot tile: a hollow row, no dots (L3)
  frameCell:  { kind: "shape", shape: "rect", w: 56, h: 56, fill: "surface", stroke: "structure", strokeWidth: 3 },
  frameDotA:  { kind: "shape", shape: "circle", r: 18, fill: "structure" },
  frameDotB:  { kind: "shape", shape: "circle", r: 18, fill: "surface", stroke: "accent", strokeWidth: 6 },
  gapCell:    { kind: "shape", shape: "rect", w: 56, h: 56, stroke: "accent", strokeWidth: 3 },   // drawn over an unfilled frame cell during an under-5 hint
  spillDot:   { kind: "shape", shape: "circle", r: 18, fill: "accent" },          // dots that do not fit: drawn right of the frame at 60 px pitch, alpha 0.7
  countBadge: { kind: "shape", shape: "circle", r: 12, fill: "structure" },       // numeral on it 16 px display, color bg; re-count on a tile's dots
  eqText:     { kind: "text",  value: "", size: 32, font: "display", color: "structure" },
  link:       { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  hintRing:   { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniFrame:  { kind: "shape", shape: "roundRect", w: 90, h: 22, fill: "surface", stroke: "structure", strokeWidth: 1, radius: 4 },
  miniDotA:   { kind: "shape", shape: "circle", r: 6, fill: "structure" },
  miniDotB:   { kind: "shape", shape: "circle", r: 6, fill: "surface", stroke: "accent", strokeWidth: 3 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
A dot tile draws five `ART.tileSlot` positions in one row at y = 0 (x = −32, −16, 0, 16, 32) and overlays `ART.tileDot` on the first v of them; a numeral tile draws the numeral only. The 0-value dot tile draws `ART.emptyDots` alone.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each tile of a locked pair moves 20 px toward the other (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a non-pair" },
  fillDot:   { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "each frame dot arriving (from alpha 0, scale 0.5), 120 ms apart" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "gapCell on an under-5 attempt" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "frame dots, spill dots and gap cells clearing after 900 ms" },
  buzz:      { angle: 8, duration: 90, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "bee on each locked pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bee" }
};
```
No flashing: `showMe` cycles at 1 Hz; `buzz` runs 4 half-cycles in 360 ms once per pair.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                      ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  bee (110,130)   [ ][ ][ ][ ][ ]  five-frame y=130, x=240..480 │  zone A
      │                     "2 + 3 = 5"  eqText (360,190)             │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ •••• ]    [  3  ]    [ •• ]      row y=290           │
      │                                                              │  zone B
      │        [  2  ]     [ ••• ]    [ • ]       row y=410           │
      │        x=240       x=360      x=480       (100×100)          │
480   ├──────────────────────────────────────────────────────────────┤
      │                  (praise pop centred)                        │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
4-pair boards: x = 180 / 300 / 420 / 540; 5-pair boards: x = 152 / 256 / 360 / 464 / 568 with 96 × 96 tiles. Rows y = 290 / 410 in every case. Spill dots draw at x = 540, 600, 660 … y = 130. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3) centred at y = 28, swapped for `ART.dotFull` as boards complete. No numeric score anywhere (5-6 band).
- Five-frame: 5 × `ART.frameCell` at y = 130, x = 240 + i × 60; `ART.frameDotA` / `ART.frameDotB` centred in cells as pairs are enacted; `ART.gapCell` over unfilled cells during an under-5 hint; `ART.spillDot` to the right of the frame.
- `ART.eqText` (360, 190), 32 px `THEME.font.display` `THEME.colour.structure`; symbols and numerals only.
- Tiles: `makeTile` with `ART.tile` tokens (100 × 100, or 96 × 96 on 5-pair boards); numeral tiles label 52 px `THEME.font.display` `THEME.colour.ink`; dot tiles draw `ART.tileSlot` × 5 + `ART.tileDot` × v; the 0 dot tile draws `ART.emptyDots`. Selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the two tiles' facing edges.
- `ART.countBadge` at each tile dot (+0, −18) during a re-count, numeral 16 px `THEME.colour.bg`.
- `ART.hintRing` behind a tile; `ART.bee` at (110, 130) during play, (360, 210) on Finish.
- While an enactment plays (≈ 1.2-2 s) all tiles are `setEnabled(false)` so taps during the animation are not attempts; they re-enable when it ends.
- Tap floors: tiles 96-100 ≥ 80 (5-6 floor); gaps ≥ 8 at 5 columns (pitch 104, tiles 96), ≥ 20 otherwise; frame cells are not tappable.
- Tab order: tiles in reading order (row 1 left → right, then row 2). Under `?embed=1` the picker is not created.

## Content
Language-neutral (dots and numerals 0-5). Each tile = (value, look) where look ∈ {dots, numeral}. Pair test: value + value = 5 (never on look, never on label text). Boards are fixed lists, shuffled in layout.

- **L1** (3 pairs, 6 tiles; values 1-4; at least one mixed pair):
  - Board A: (1, dots) (4, dots) · (2, dots) (3, numeral) · (2, numeral) (3, dots)
  - Board B: (4, numeral) (1, dots) · (3, dots) (2, dots) · (1, numeral) (4, dots)
  - Board C: (2, dots) (3, numeral) · (4, dots) (1, numeral) · (3, dots) (2, numeral)
- **L2** (4 pairs, 8 tiles; two numeral-numeral pairs, two mixed):
  - Board D: (1, numeral) (4, numeral) · (2, numeral) (3, numeral) · (1, dots) (4, numeral) · (3, dots) (2, numeral)
  - Board E: (3, numeral) (2, numeral) · (4, numeral) (1, numeral) · (2, dots) (3, numeral) · (4, dots) (1, dots)
  - Board F: (2, numeral) (3, numeral) · (1, numeral) (4, numeral) · (3, dots) (2, dots) · (1, dots) (4, numeral)
- **L3** (5 pairs, 10 tiles; includes 0 and 5):
  - Board G: (0, numeral) (5, dots) · (5, numeral) (0, dots) · (1, dots) (4, numeral) · (2, numeral) (3, dots) · (3, numeral) (2, dots)
  - Board H: (5, dots) (0, dots) · (0, numeral) (5, numeral) · (4, dots) (1, dots) · (2, dots) (3, numeral) · (1, numeral) (4, numeral)
  - Board I: (5, numeral) (0, dots) · (3, dots) (2, numeral) · (4, numeral) (1, numeral) · (0, numeral) (5, dots) · (2, dots) (3, dots)

Because several tiles can share a value (Board A holds two 2s and two 3s), any two tiles whose values total 5 lock — the predicate is on data, so (2, dots) + (3, numeral) and (2, numeral) + (3, dots) are both accepted, and so is (2, dots) + (3, dots). A board always has exactly as many pairs as listed regardless of which partners the child chooses (the value multiset is balanced by construction).

Board choice: one board per level per session, picked at random from that level's three boards; no board repeats within a session. Tile layout shuffled per board; the two tiles of one listed pair are never horizontally adjacent in the same row on a fresh board.

Worked example (a child fluent to 4): Board A (L1): pairs 1+4, 2+3 first-try, then taps 3 and 3 (spill of one dot), then 2+3 → board done with one non-pair → next board one level up. Board D (L2): four pairs with no non-pair → L3. Board G (L3): taps 5-dots with 1-dots (one spill), then 5-dots with 0-numeral → locks; the rest follow → three boards, Finish shows 12 mini five-frames.

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, ≤ 12 pairs, ≈ 5 minutes).
- Difficulty progression: a board completed with at most one non-pair → next board one level up (cap L3).
- Adaptation: a board with three or more non-pairs → next board one level down (floor L1); a board with exactly two non-pairs → same level, a different board.
- What happens on a correct answer (a pair): the five-frame fills with the two parts as two glyphs, `ART.eqText` shows "a + b = 5", `tone("correct")`, `ANIM.join`, tiles lock with `ART.link`, bee `ANIM.buzz`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer (a non-pair), per anticipated mistake:
  - Total over 5 (added two visible numbers): the frame fills and the excess spills outside as `ART.spillDot`; `tone("nudge")`; both tiles nudge and de-select.
  - Total under 5 (a part chosen too small): the frame fills partly and the empty cells pulse as `ART.gapCell`; `tone("nudge")`; both nudge and de-select.
  - A dot tile mis-counted (any non-pair involving a dot tile): before the fill, that tile's dots get `ART.countBadge` numerals in turn with `tone("tap", k)` so the value is shown.
  - 5 paired with a non-zero tile (zero not seen as a bond partner, L3): the spill enactment above; when the 0 tile is finally paired, the equation reads "5 + 0 = 5".
  - The same tile in two non-pairs: its true partner gains `ART.hintRing` (this pattern's show-me); the ring stays until the pair is made.
- Retry behaviour: unlimited within a board; support escalates per tile (two misses → its partner is ringed). A board always completes (success is certain, F-46); a pair made with a ring showing counts as helped, never as a first-try pair.
- Finish condition: the session's boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Make Five Friends". No words on the play screen; the equation strip is numerals and symbols.

## Sound
`tone("tap")` on select/de-select; `tone("tap", k)` on each frame dot as it fills and on each re-count badge (pitch climbs to 5); `tone("correct")` on a locked pair; `tone("nudge")` on a non-pair (after the enactment); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; no audio files.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu and the praise pops change; the board shows only dots and numerals).
- [ ] Works at narrow width (400-px iframe: the five-frame, the bee and a 5 × 2 board are fully visible with separate tiles).
- [ ] Keyboard operable (arrows/Tab move across the grid in reading order, Enter selects; Enter on a second tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of non-pairs still ends with every pair locked; hint rings appear after two misses on a tile).
- [ ] All tiles are face up at all times; nothing has to be remembered.
- [ ] Tapping 3-dots then the numeral 2 fills the five-frame with three solid dots and two ringed dots and shows "3 + 2 = 5".
- [ ] Tapping 3 and 4 fills the frame and leaves two coral dots hanging off its right end before the tiles nudge apart.
- [ ] Tapping 1 and 2 leaves two empty cells pulsing before the tiles nudge apart.
- [ ] A non-pair involving a dot tile numbers that tile's dots one by one first.
- [ ] Tapping a tile twice de-selects it with no error.
- [ ] At the third level a numeral 0 tile and an empty dot tile appear, and 5 with 0 locks with "5 + 0 = 5".
- [ ] A board with 0-1 mistakes is followed by a bigger board; a board with 3+ mistakes by a smaller one.
- [ ] The finish screen shows every pair as a little five-frame with two kinds of dot and no score.
- [ ] With `?sound=off` nothing is audible.
