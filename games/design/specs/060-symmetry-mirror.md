# 060 — Symmetry Mirror

## Identity
- Slug: `symmetry-mirror`
- Subject / topic: Mathematics / line symmetry — completing the mirror half of a figure on a grid across a vertical line
- Age band: `8-9`
- Interaction pattern: `P6` — build on a grid (tap cells to fill the mirror half; Check)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6. Content is language-neutral (grid cells and a mirror line); no `LOCALE_DATA`.

## Learning
- Objective: Completes the reflection of a half-figure across a vertical mirror line on a cell grid so that every filled cell has a matching cell the same distance from the line on the other side, and checks it.
- Prerequisites: Fills and un-fills grid cells by tapping (games 003/055); counts cells along a row.
- Curriculum links: F-115 (2D shapes — sides lit one by one; the reflected-cell feedback is the symmetry analogue: each wrong cell reflects back across the line), F-31 row "Symmetry" — conservative 8-9, earliest 6, 9 of 12 systems → 8-9 (US 4.G.A.3 "recognize a line of symmetry … identify line-symmetric figures" prepared at grade 3; England Y2-3 "line of symmetry in a vertical line" (Y2) and "symmetry in 2-D shapes" (Y3-4); Germany Klasse 3 "Achsensymmetrie / Spiegeln"; France CE2 "symétrie axiale sur quadrillage"; Netherlands groep 5 "spiegelen"; Spain 2º ciclo "simetría"; Brazil EF03MA — figuras simétricas; Sweden åk 3 "symmetri"; Denmark 2.-3. klasse "spejling" (F-39 — spejling at 8); Norway 3. trinn "symmetri"; Finland grade 3 "peilaus").
- Common misconceptions (F-115, F-101), each with this game's response:
  1. **Translation instead of reflection (copying the half across so the figure repeats rather than flips).** Response: on Check every wrong filled cell "reflects back": it glides across the line to its mirror position (`ANIM.reflect`), where it sits over an EMPTY cell on the given side — showing it has no partner — then glides back and un-fills (`ANIM.rise`). A translated copy has its cells far from the line where the original's are near, so most of them reflect back onto empty cells at once: the child sees the whole copy fail to find partners.
  2. **Distance from the line ignored (the mirror cell put one column too close or too far).** Response: the same reflection glide lands the wrong cell exactly one column off its would-be partner; then the partner's given cell pulses (`ART.needCell`) and a dashed **mirror thread** (`ART.thread`) draws from that given cell horizontally across the line to the cell where its reflection belongs — the distance is enacted as a horizontal line of equal length on both sides.
  3. **Rows shifted (the reflection placed a row up or down).** Response: the thread is always horizontal, so a cell placed in the wrong row sees the thread pass above or below it; its reflection glide lands beside the given cell's row, not on it.
  4. **Cells adjacent to the line handled wrongly (a cell touching the line "reflects onto itself" or is skipped).** Response: L1 figures always include cells touching the line; on Check a missing line-adjacent cell gets a very short thread (one cell each side) so the child sees the mirror is the LINE, not the first column.
  5. **Not checking symmetry as a whole (some cells right, some missing, the child stops).** Response: missing cells are shown as `ART.needCell` outlines with their threads on the second wrong Check; the figure is never accepted until every given cell has its partner and no extra cell remains; the show-me step fills the missing cells one by one along their threads.

## How it plays
1. **Start screen**: title "Symmetry Mirror", the butterfly (`ART.butterfly`) at (360, 200), Start, picker.
2. **Item 1 (L1: a 4-cell figure)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A (upper part): the target reminder — `ART.butterfly` small (48 px) at (110, 120) beside `ART.mirrorIcon` (a mini grid with a vertical line and a two-cell reflected pair) at (170, 120); the caption `S("finishMirror")` ("Finish the mirror picture") at (360, 96), 22 px `THEME.colour.inkSoft`, `wordWrap` 600. The grid: 8 columns × 5 rows of `ART.cell` (56 × 56, gap 4, pitch 60), centred at (360, 330): column centres x = 150, 210, 270, 330 | 390, 450, 510, 570; row centres y = 210, 270, 330, 390, 450; the mirror line `ART.mirrorLine` (a thick `structure` vertical bar with a dashed centre) at x = 360 from y = 176 to y = 484 with `ART.mirrorCap`s (small triangles) at both ends. The GIVEN half sits on the left: its cells are pre-filled (`ART.givenFill` + `ART.givenDot`) and locked (not tiles). The right half's 20 cells are `makeTile`s the child toggles. Zone C: Check (`makeButton ok`) at (360, 510), disabled until at least one right-hand cell is filled.
3. **Filling**: tap an empty right-hand cell → `ART.fill` + `ART.fillDot` appear (`ANIM.appear`, `tone("tap", k)`, k = filled count); tap a filled cell → it un-fills (`ANIM.rise`, `tone("tap", k)` at the new count). Any order. Check enables at the first fill.
4. **Check**: tap OK. The game compares the right half to the reflection of the left half.
   - **Correct**: every filled cell and its partner pulse together in pairs from the line outward (`ANIM.pairPop`, 120 ms per pair, `tone("tap", k)`); the whole figure's outline draws (`ART.figureOutline`); `tone("correct")`; praise pop (next key in rotation); the butterfly at (110, 120) `ANIM.flutter`; rail dot fills; after 900 ms the grid clears (`ANIM.rise` on all fills) and the next figure appears (`ANIM.appear`). First-try correct.
   - **Wrong — extra cells (filled cells with no partner)**: each extra cell glides across the line to its mirror position (`ANIM.reflect`, 400 ms, one at a time, 200 ms apart), rests 400 ms over the empty given-side cell, glides back and un-fills (`ANIM.rise`); `tone("nudge")` once at the start. Then, if cells are also missing, each missing cell's partner pulses (`ART.needCell` on the given cell) and a `ART.thread` draws from it across the line to the missing cell (`ANIM.threadDraw`), 300 ms apart; the threads and outlines fade after 1500 ms. Check disables until the child changes the grid. Attempt 2.
   - **Wrong — missing cells only**: the threads as above; attempt 2.
   - **Second wrong Check**: the same enactment, then the show-me step — the missing cells fill themselves one by one along their threads (`ANIM.appear`, `tone("tap", k)`), any remaining extra cells reflect back and un-fill, and OK gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping OK completes the item as solved-with-help (no praise pop).
5. **Items 2-10**: per Content/Rules. L1: 3-4 given cells, all within two columns of the line, at least one touching it. L2: 5-7 given cells reaching the far columns, with a diagonal run. L3: 8-10 given cells, a figure with a hole, and on the last two L3 items the given half on the RIGHT (the child fills the left) so "mirror" is not "fill the right side".
6. **Finish**: `t("all_done")` (360, 110); the butterfly (360, 200) `ANIM.celebrate`; the summary = the ten completed figures drawn small (`ART.miniGrid`, 64 × 40, filled cells as 7 × 7 blocks with a 1-px mirror line) in two rows of five from y = 330, first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  butterfly:     { kind: "emoji", value: "🦋", size: 80 },
  mirrorIcon:    { kind: "shape", shape: "rect", w: 44, h: 28, stroke: "structure", strokeWidth: 2 },   // mini grid: a vertical structure line down its middle and two 10×10 structure squares mirrored across it
  cell:          { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 6 },
  givenFill:     { kind: "shape", shape: "roundRect", w: 46, h: 46, fill: "structure", radius: 5 },      // a locked given cell
  givenDot:      { kind: "shape", shape: "circle", r: 5, fill: "bg" },                                    // on every given cell
  fill:          { kind: "shape", shape: "roundRect", w: 46, h: 46, fill: "accent", radius: 5 },         // a cell the child filled
  fillDot:       { kind: "shape", shape: "rect", w: 10, h: 10, fill: "inkOnAccent" },                    // a small square on every child-filled cell (shape differs from the given dot: circle vs square, so the two halves are told apart without colour)
  mirrorLine:    { kind: "shape", shape: "rect", w: 6, h: 308, fill: "structure" },
  mirrorCap:     { kind: "shape", shape: "polygon", points: [[0,-10],[8,4],[-8,4]], fill: "structure" },  // at the line's top (pointing up) and bottom (rotated 180°)
  needCell:      { kind: "shape", shape: "roundRect", w: 60, h: 60, stroke: "accent", strokeWidth: 4, radius: 8 },   // outline on a given cell whose partner is missing
  thread:        { kind: "shape", shape: "line", w: 3, stroke: "accent", strokeWidth: 3 },               // dashed (lineDash [6,4]) horizontal line from a given cell across the mirror to its partner cell; length set at call
  figureOutline: { kind: "shape", shape: "polygon", points: [], stroke: "structure", strokeWidth: 4 },   // the completed figure's outer boundary, computed from the filled cells (union of cell edges)
  showRing:      { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  miniGrid:      { kind: "shape", shape: "rect", w: 64, h: 40, stroke: "line", strokeWidth: 1 },         // finish summary
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Cell addressing: columns are numbered by distance from the mirror line, 1-4 on each side (column 1 touches the line), rows 1-5 top to bottom. A given cell at (side L, column c, row r) has its partner at (side R, column c, row r). Given cells are drawn with `ART.givenFill` + `ART.givenDot` (teal, round dot); the child's cells with `ART.fill` + `ART.fillDot` (coral, square dot) — the two halves differ by shape as well as colour (§12).

## Animation registry
```js
const ANIM = {
  appear:     { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a fill placed; a new figure's given cells; show-me fills (from alpha 0, scale 0.6)" },
  rise:       { y: "-=24", alpha: 0, duration: 240, ease: "Sine.In", trigger: "a fill removed (undo, extra-cell correction, grid clear)" },
  reflect:    { duration: 400, ease: "Sine.InOut", trigger: "an extra cell's fill glides to its mirror position across the line (x set at call: 720 − x), rests 400 ms, then glides back (reverse) before rising away" },
  threadDraw: { scaleX: 1, duration: 300, ease: "Sine.Out", trigger: "a thread grows from the given cell across the line to the missing cell (from scaleX 0, origin at the given cell)" },
  pulse:      { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "needCell outlines on given cells whose partner is missing" },
  pairPop:    { scale: 1.1, duration: 120, ease: "Back.Out", yoyo: true, trigger: "a given cell and its partner together on a correct Check, pairs from the line outward" },
  flutter:    { scaleX: 0.8, duration: 90, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "butterfly on a correct Check (wings)" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "threads and needCell outlines after 1500 ms" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the Check button (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish butterfly" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            "Finish the mirror picture" (360,96)              │
      │ butterfly (110,120) [mirror icon] (170,120)  ▲ cap (360,176) │  zone A
      │   ┌───┬───┬───┬───╫───┬───┬───┬───┐  row 1 y=210              │
      │   │   │   │ ▓ │ ▓ ║   │   │   │   │  given half (left)        │
      │   ├───┼───┼───┼───╫───┼───┼───┼───┤  row 2 y=270              │
260   │   │   │ ▓ │ ▓ │   ║   │   │   │   │  mirror line x=360        │  (grid spans
      │   ├───┼───┼───┼───╫───┼───┼───┼───┤  row 3 y=330              │   zones A+B)
      │   │   │   │   │   ║   │   │   │   │  cells 56×56, pitch 60    │
      │   ├───┼───┼───┼───╫───┼───┼───┼───┤  row 4 y=390              │
      │   │   │   │   │   ║   │   │   │   │  cols x=150..330 | 390..570│
      │   ├───┼───┼───┼───╫───┼───┼───┼───┤  row 5 y=450              │
      │   │   │   │   │   ║   │   │   │   │            ▼ cap (360,484)│
      │   └───┴───┴───┴───╨───┴───┴───┴───┘                           │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
The grid deliberately spans zones A and B (a 5-row grid at the 8-9 tap floor needs 300 px); the prompt line stays at the top of zone A. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Caption `S("finishMirror")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 96), two lines max; `ART.butterfly` at 48 px at (110, 120); `ART.mirrorIcon` at (170, 120).
- Grid: 40 × `ART.cell` at the column/row centres above; the fillable half's cells are `makeTile` 56 × 56 with `ART.cell` tokens; the given half's cells are plain draws with `ART.givenFill` + `ART.givenDot` on the figure cells (locked, not focusable). `ART.mirrorLine` at (360, 330) with `ART.mirrorCap`s at (360, 176) and (360, 484).
- `ART.fill` + `ART.fillDot` on child-filled cells; `ART.needCell` on given cells during feedback; `ART.thread`s at the row's y from the given cell's centre to the partner cell's centre; `ART.figureOutline` on a correct Check.
- Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled; `ART.showRing` around it during show-me.
- Tap floors 56 (8-9 floor); gap 4 between cells is acceptable because nothing is judged until Check and a mis-tap is undone by one tap.
- Keyboard: arrows move between the fillable cells (row-major), Enter toggles; Tab reaches OK; Enter checks. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Figures as lists of given cells (column-from-line c, row r) on the given side; the answer is the same list mirrored. "Side" = which half is given (L unless stated).
- **L1** (3-4 cells, columns 1-2, one touching the line): [(1,2) (1,3) (2,3)] · [(1,1) (1,2) (2,2) (2,3)] · [(1,3) (2,3) (2,4)] · [(1,2) (2,2) (2,1) (1,4)]
- **L2** (5-7 cells, reaching columns 3-4, a diagonal run): [(1,3) (2,2) (3,1) (2,4) (3,5)] · [(1,1) (1,2) (2,2) (3,3) (4,4) (4,5)] · [(1,2) (2,2) (3,2) (3,3) (3,4) (2,5)] · [(1,4) (2,3) (3,2) (4,1) (1,5) (2,5) (3,5)] · [(2,1) (2,2) (1,3) (3,3) (4,3) (2,4)]
- **L3** (8-10 cells, a hole; the last two given on the RIGHT): [(1,1) (2,1) (3,1) (3,2) (3,3) (2,3) (1,3) (1,2) — hole at (2,2)] · [(1,1) (2,2) (3,3) (4,4) (4,3) (4,2) (3,1) (2,4) (1,5)] · [(2,1) (3,1) (4,2) (4,3) (4,4) (3,5) (2,5) (1,4) (1,2) (2,3)] · (side R) [(1,2) (2,1) (3,1) (3,2) (2,3) (3,4) (2,5) (1,5)] · (side R) [(1,1) (1,2) (1,3) (2,3) (3,3) (3,4) (3,5) (2,5) (4,1) (4,2)]

Play list of 10 per Rules; within a level the pool is shuffled and not repeated until exhausted; the grid is always empty on the fillable side at the start of an item.

Worked example: item 1 [(1,2) (1,3) (2,3)] fills the three mirror cells, Check → pairs pop, outline draws, first-try · item 2 first-try → L2 · item 3 [(1,3) (2,2) (3,1) (2,4) (3,5)] copies the shape without flipping (fills (1,3) (2,2) (3,1) … as if translated: column 1 filled where column 3 belongs) → the extra cells glide across, land on empty given cells, return and un-fill; threads draw from (3,1) and (3,5) out to column 3 on the right; the child fills along the threads, Check (helped) · item 4 first-try · item 5 first-try → L3 · item 6 (the hole figure) leaves the hole empty, first-try · items 7-10 with one miss (the right-given item) → Finish shows ten mini figures, eight with filled dots.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong Check, or wrong first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: pairs pop from the line outward with rising tones, the figure outline draws, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], butterfly `ANIM.flutter`, rail dot, grid clears, next figure after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Translated copy or any extra cells (cells with no partner): each extra cell reflects across the line, rests over the empty cell it would need as a partner, returns and un-fills; `tone("nudge")`.
  - Wrong distance or wrong row (a cell one column or one row off): that cell reflects back and un-fills as above; the given cell whose partner is missing pulses and a horizontal thread draws across the line to the correct cell.
  - Missing cells only (stopped early / skipped a line-adjacent cell): the given cells without partners pulse and their threads draw (a one-cell thread each side for line-adjacent cells).
  - Second wrong Check: the enactment again, then the missing cells fill themselves along their threads and OK carries the show-me ring; solved-with-help.
- Retry behaviour: attempt 1 → attempt 2 after the reflect-back and threads → attempt 3 show-me; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Symmetry Mirror"; `finishMirror` = "Finish the mirror picture". No other text on the play screen.

## Sound
`tone("tap", k)` on each cell filled or un-filled (k = filled count, so undo sounds lower); `tone("tap", k)` per pair as the pairs pop on a correct Check; `tone("nudge")` once at the start of a wrong-Check enactment; `tone("correct")`, `tone("finish")` once. Silent under `?sound=off`; no audio files.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise change with the picker; the caption once translated).
- [ ] Works at narrow width (400-px iframe: all 40 cells, the mirror line and OK visible; adjacent cells remain separate targets).
- [ ] Keyboard operable (arrows move between the fillable cells, Enter fills/un-fills; Tab reaches OK; Enter checks; given cells are skipped).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the missing cells eventually fill themselves and OK completes the item).
- [ ] Given cells are teal with a round pale dot and cannot be tapped; the child's cells are coral with a small dark square.
- [ ] OK is dimmed until at least one cell is filled.
- [ ] Copying the given half straight across (without flipping) makes the wrong cells slide across the line, sit over empty cells, slide back and disappear.
- [ ] A cell placed one column too far sees a dashed horizontal thread drawn from the given cell across the line to the correct cell.
- [ ] A correct Check pops matching pairs outward from the line and draws the figure's outline.
- [ ] At the third level one figure has a hole, and on the last two items the given half is on the right and the child fills the left.
- [ ] Two first-try Checks in a row bring bigger figures reaching the far columns; a wrong Check brings smaller figures near the line.
- [ ] The finish screen shows ten small completed figures with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
