# 119 — Pictograph Reader

## Identity
- Slug: `pictograph-reader`
- Subject / topic: Mathematics / data — reading a one-to-one pictograph: which row has the most (or fewest), and how many are in a row
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (tap the row asked for; at the third level tap the numeral)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P1 (rows are the tiles, as in 111). Data rule (F-118): the pictograph is strictly ONE-TO-ONE (one icon = one thing; no key, no scaled symbols — scaled keys are 8-9 content and out of scope here); every row's icons sit on the same column grid so a row's length IS its count; gridlines (`ART.colGuide`) and the column numerals (`ART.colNumeral` 1 … 8) are always on. Level order follows F-118: read one row's size relative to the others (L1 most) → compare closely (L2 most/fewest with differences of one) → total of one row (L3 how many). Content is language-neutral (fruit icons and numerals); no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Reads a three-row one-to-one pictograph and taps the row with the most (or the fewest) icons, and at the third level taps the numeral that says how many one row holds.
- Prerequisites: Counts a row of up to 8 objects (game 001); compares two rows by matching (game 013); reads numerals to 8. Reads the short caption or reads the icon prompt alone.
- Curriculum links: F-1 (data/graphs in 5 of 15 sources), F-21 ("tables, pictograms and bar charts" in 11 of 12 systems — Norway at 10), F-31 row "Pictogram / bar chart" — conservative 7-8, earliest 6 → 6-8 (US 1.MD.C.4 "organize, represent, and interpret data with up to three categories; ask and answer questions about the total number … how many in each category, and how many more or less" / 2.MD.D.10 "picture graph … with single-unit scale"; England Y2 "interpret and construct simple pictograms … ask and answer simple questions by counting the number of objects in each category"; Germany Klasse 1-2 "Daten in Strichlisten und Diagrammen"; France CP-CE1 "lire un tableau, un diagramme"; Netherlands groep 3-4 "eenvoudige grafieken lezen"; Spain 1º ciclo "pictogramas"; Brazil EF01MA21 / EF02MA22 "gráficos de colunas e pictóricos"; Sweden åk 1-3 "enkla tabeller och diagram"; Denmark 1.-2. klasse "simple diagrammer"; Finland grades 1-2 "yksinkertaiset diagrammit"). F-103 (comparing by number, not by look).
- Common misconceptions (F-118, F-103, F-101), each with this game's response:
  1. **Graph-as-picture — taps the row of the favourite fruit, or the first row, instead of the longest.** Response: the tapped row nudges; then every row **counts itself** left to right (`ART.countBadge` 1, 2, 3 … on each icon, `tone("tap", k)`, 120 ms apart, row after row) and each row's total appears at its end (`ART.rowTotal`); the largest total pulses (`ANIM.pulse`) and `ART.mostGlyph` in the prompt pulses with it. The answer is counted out, never stated.
  2. **"Fewest" read as "most" (freezes on the word or answers the longest row).** Response: at L2 the prompt icon changes from `ART.mostGlyph` (three bars with a ring on the tallest) to `ART.fewestGlyph` (a ring on the shortest), the caption changes, and on a wrong tap the self-count ends with the SMALLEST total pulsing; the glyph, not the word, carries the question for a child who reads slowly.
  3. **Comparing by look when rows differ by one (a row that "looks the same" — F-103).** Response: at L2 rows differ by exactly one; the column grid makes the extra icon visible as one column further right, and the self-count on error badges the extra icon last (`ANIM.lastBadge`) so the difference of one is seen.
  4. **Off-by-one when counting a row (L3 "how many" answered with count ± 1 — F-101).** Response: L3's three numeral tiles are n − 1, n, n + 1; a wrong tap makes ONLY the asked row count itself, its last badge grows (`ANIM.lastBadge`) and `ART.rowTotal` appears at the row's end; the column numeral under the last icon pulses — count and column agree.
  5. **Tapping an icon instead of a row (expecting to count by tapping).** Response: rows are whole tiles (600 × 64); a tap anywhere on a row selects the row; icons are not separately tappable, so no tap is wasted.

## How it plays
1. **Start screen**: title "Pictograph Reader", the bee (`ART.bee`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: apples 5, pears 2, bananas 3; "most")**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A top: the prompt — the bee at (80, 100) with a speech bubble (`ART.bubble`, 96 × 64) at (170, 96) holding `ART.mostGlyph`; the caption `S("whichMost")` ("Which row has the most?") at (430, 96), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 400, two lines. The pictograph below: a panel (`ART.chartPanel`, 620 × 250) at (360, 262); inside it three rows, each a `makeTile` 600 × 64 with `ART.rowTile` tokens (invisible body; the selected look is the library outline) centred at (360, 190), (360, 262), (360, 334); at each row's left a label box (`ART.labelBox`, 56 × 56) at x = 96 holding the category icon (`ART.apple` / `ART.pear` / `ART.banana`, 36 px); then the row's icons (the same category icon at 32 px) in cells centred at x = 160 + 44 (j − 1) for j = 1 … n; `ART.colGuide` (faint vertical lines) at x = 138 + 44 j for j = 0 … 8 spanning the three rows; `ART.colNumeral` "1" … "8" under the panel at y = 396 on each column's centre. Zone B: nothing at L1/L2 (the rows ARE the tiles); at L3 three numeral tiles at y = 440.
3. **Answering (L1/L2)**: the child taps a row.
   - **Correct (the apples row)**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; the chosen row counts itself as confirmation (`ART.countBadge` 1 … 5, `tone("tap", k)`, the last badge `ANIM.lastBadge`) and `ART.rowTotal` "5" appears at its end; `GameCore.showPraise` (next key in rotation); the bee `ANIM.buzz` (a small horizontal wiggle); the rail dot fills; after 900 ms the panel clears (`ANIM.fadeOut` on badges and totals) and the next item's icons `ANIM.appear` one row at a time.
   - **Wrong (another row)**: `ANIM.nudge`, `tone("nudge")`, the row de-selects and stays enabled; then the **full self-count**: every row counts itself in turn, totals appear at every row's end, the total the question asks for (largest / smallest) `ANIM.pulse`s together with the prompt glyph; ≈ 2.5 s, all rows `setEnabled(false)` meanwhile; badges and totals then fade. Attempt 2.
   - **Wrong on attempt 2**: the self-count again, and the correct row gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop).
4. **Answering (L3: "how many?")**: the bubble holds the asked category's icon with `ART.questionMark`; the caption is `S("howMany")` ("How many?"); the three rows are NOT tappable; three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 440, x = 240 / 360 / 480 show n − 1, n, n + 1 shuffled. Correct → pop, tone, the asked row counts itself and shows its total, praise. Wrong → nudge, tone, ONLY the asked row counts itself, its last badge grows, the column numeral under its last icon pulses; attempt 2; then the show-me ring on the correct tile.
5. **Items 2-10**: per Content/Rules. L1 = "most" with differences of at least 2 between the longest row and the next; L2 = "most" or "fewest" with the two closest rows differing by exactly one; L3 = "how many" on a named row of 4-8 with rows that differ by one so the answer cannot be read from the row's rank.
6. **Finish**: `t("all_done")` (360, 110); the bee (360, 200) `ANIM.celebrate`; the summary = the ten answered rows drawn small (`ART.miniRow`, a 20-px category icon followed by n 8-px squares) in two columns of five from y = 300 (left column x from 150, right from 430, rows 30 apart) with each row's numeral at its right (16 px `THEME.colour.inkSoft`) — what the child read, not a score; optionally `t("question_x_of_y", {n: first-try solved, total: 10})` at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  bee:          { kind: "emoji", value: "🐝", size: 72 },
  apple:        { kind: "emoji", value: "🍎", size: 32 },
  pear:         { kind: "emoji", value: "🍐", size: 32 },
  banana:       { kind: "emoji", value: "🍌", size: 32 },
  grapes:       { kind: "emoji", value: "🍇", size: 32 },
  strawberry:   { kind: "emoji", value: "🍓", size: 32 },
  cherries:     { kind: "emoji", value: "🍒", size: 32 },
  bubble:       { kind: "shape", shape: "roundRect", w: 96, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  mostGlyph:    { kind: "shape", shape: "rect", w: 10, h: 28, fill: "structure" },      // drawn three times at heights 12 / 20 / 28, 6 px apart; a 3-px accent ring (r 10) around the top of the tallest
  fewestGlyph:  { kind: "shape", shape: "rect", w: 10, h: 28, fill: "structure" },      // the same three bars; the accent ring around the top of the SHORTEST
  questionMark: { kind: "text",  value: "?", size: 32, font: "display", color: "structure" },
  chartPanel:   { kind: "shape", shape: "roundRect", w: 620, h: 250, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  rowTile:      { kind: "shape", shape: "roundRect", w: 600, h: 64, fill: "surface", stroke: "surface", strokeWidth: 0, radius: 12 },   // invisible body; selected look = library outline
  labelBox:     { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },
  colGuide:     { kind: "shape", shape: "rect", w: 2, h: 220, fill: "line" },
  colNumeral:   { kind: "text",  value: "", size: 14, font: "display", color: "inkSoft" },   // "1".."8" under the columns
  countBadge:   { kind: "shape", shape: "circle", r: 12, fill: "structure" },              // numeral 14 px display, color bg, on an icon's top-right
  rowTotal:     { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:     { kind: "shape", shape: "roundRect", w: 612, h: 76, stroke: "structure", strokeWidth: 4, radius: 16 },   // 108 × 108 around a numeral tile at L3
  miniRow:      { kind: "shape", shape: "rect", w: 8, h: 8, fill: "structure" },           // finish summary squares
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. All six category icons are drawn at the same 32 px in the rows, so no row's icons are bigger than another's; the two prompt glyphs differ by WHERE the ring sits, never by colour.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.02, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the correct row tapped (small — the row is 600 px wide); 1.12 on a numeral tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong row or tile tapped" },
  badgeIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges in turn, 120 ms apart (from alpha 0, scale 0.5)" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last badge of a counted row" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the asked-for total, the prompt glyph, or a column numeral" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "rowTotal; new rows (from alpha 0, scale 0.6), rows 150 ms apart" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "badges and totals after a cue or between items" },
  buzz:      { x: "+=6", duration: 60, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "bee on a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct row or tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bee" }
};
```
No flashing: `showMe` at 1 Hz; `pulse` three half-cycles; `buzz` is four 60-ms half-cycles of a 6-px wiggle (position, not visibility).

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ bee(80,100) [▂▄█⃝] (170,96)   "Which row has the most?" (430,96)│  zone A
      │ ┌─ chartPanel (360,262) 620×250 ───────────────────────────┐ │
      │ │ [A]  A   A   A   A   A              row tile (360,190)      │ │
      │ │ [P]  P   P                          row tile (360,262)      │ │  zones A+B
      │ │ [B]  B   B   B                      row tile (360,334)      │ │
      │ └─────────────────────────────────────────────────────────────┘ │
      │   x=96   1   2   3   4   5   6   7   8   colNumerals y=396     │
      │        [ 4 ]      [ 5 ]      [ 6 ]   L3 tiles y=440           │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(A / P / B in the diagram stand for the apple / pear / banana ART icons — the bracketed one is the label box; icon cells are centred at x = 160 + 44 (j − 1).) Fixed layout, FIT scaling. The eighth column's cell centre is x = 468; `ART.rowTotal` sits at x = 560 on every row so totals align.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Prompt: `ART.bee` (80, 100); `ART.bubble` (170, 96) holding `ART.mostGlyph` / `ART.fewestGlyph` (L1/L2) or the asked category icon at 32 px with `ART.questionMark` to its right (L3); caption at (430, 96).
- Chart: `ART.chartPanel` (360, 262); `ART.colGuide`s at x = 138 + 44 j (j = 0 … 8) from y = 152 to y = 372; rows = three `makeTile` 600 × 64 with `ART.rowTile` tokens at y = 190 / 262 / 334 (`selectedStroke: THEME.colour.structure` 3 px); on each row `ART.labelBox` at x = 96 with the category icon at 36 px, then n icons at 32 px in the cells; `ART.colNumeral`s at y = 396; `ART.countBadge` at an icon's (+14, −14); `ART.rowTotal` at (560, row y).
- L3 tiles: `makeTile` 96 × 96 (`ART.numeralTile`) at (240 / 360 / 480, 440), numeral 44 px `THEME.font.display` `THEME.colour.ink`; the rows are `setEnabled(false)` and drawn without the selected affordance.
- `ART.showRing` around the correct row (612 × 76) or the correct tile (108 × 108).
- Tap floors: rows 600 × 64 ≥ 56 (gap 8 between rows — accepted for rows whose whole height is the target); tiles 96, gap 24. Tab order: rows top to bottom (L1/L2) or the three tiles left to right (L3). While a cue plays (≈ 2.5 s) all rows/tiles are `setEnabled(false)`.

## Content
Language-neutral (icons and numerals; the captions are game-specific strings). Category words map to ART keys: apple `ART.apple`, pear `ART.pear`, banana `ART.banana`, grapes `ART.grapes`, strawberry `ART.strawberry`, cherries `ART.cherries`. An item = (three rows as category: count, in display order; the question; the answer). Rows are displayed in the order written (never sorted by size).
- **L1** ("most"; the longest row beats the next by ≥ 2):
  (apple 5, pear 2, banana 3; most; apple) · (grapes 3, strawberry 6, cherries 1; most; strawberry) · (banana 2, apple 4, pear 7; most; pear) · (cherries 4, grapes 1, strawberry 2; most; cherries) · (pear 3, banana 6, apple 3; most; banana) · (strawberry 2, cherries 5, grapes 8; most; grapes)
- **L2** ("most" or "fewest"; the two closest rows differ by exactly 1):
  (apple 4, pear 5, banana 2; most; pear) · (grapes 3, strawberry 2, cherries 6; fewest; strawberry) · (banana 7, apple 6, pear 3; most; banana) · (cherries 2, grapes 5, strawberry 3; fewest; cherries) · (pear 8, banana 7, apple 4; most; pear) · (strawberry 4, cherries 5, grapes 3; fewest; grapes) · (apple 1, grapes 2, banana 6; fewest; apple) · (cherries 6, pear 7, strawberry 5; most; pear)
- **L3** ("how many" on one named row; the rows differ by one; tiles n − 1, n, n + 1):
  (apple 5, pear 6, banana 4; how many pear; 6) · (grapes 7, strawberry 6, cherries 8; how many grapes; 7) · (banana 4, apple 5, pear 3; how many banana; 4) · (cherries 6, grapes 5, strawberry 7; how many strawberry; 7) · (pear 8, banana 7, apple 6; how many apple; 6) · (strawberry 5, cherries 4, grapes 6; how many cherries; 4)

Play list of 10 per Rules; no item repeats within a session; the correct row / tile is never in the same position twice running (§13; for rows this means the answer row's index differs from the previous item's); if a level pool is exhausted it is reshuffled.

Worked example: item 1 (apple 5 / pear 2 / banana 3) taps apples → the row counts to 5, praise · item 2 (strawberry 6) first-try → L2 · item 3 (apple 4 / pear 5 / banana 2; most) taps apples → nudge; all three rows count themselves, "5" pulses with the glyph; then pears (helped) → L1 · items 4-5 first-try → L2 · item 6 (fewest; strawberry 2) first-try · item 7 (most; banana 7) first-try → L3 · item 8 (how many pear; 6) taps 5 → nudge; the pear row counts to 6, the last badge grows, the column "6" pulses; then 6 (helped) → L2 · items 9-10 first-try → Finish shows ten mini rows with their numerals.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next item from the next level up (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the chosen (or asked) row counts itself with badges and rising tones and shows its total, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], bee `ANIM.buzz`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - A row chosen by favourite / first position (graph-as-picture): `ANIM.nudge` + `tone("nudge")`; every row counts itself, totals appear, the largest total and the prompt glyph pulse.
  - The longest row tapped when "fewest" is asked: nudge + tone; the full self-count ends with the SMALLEST total and the fewest-glyph pulsing.
  - A row one shorter than the longest tapped (compared by look): nudge + tone; the full self-count; the extra icon of the longest row gets the last, grown badge.
  - n − 1 or n + 1 tapped at L3 (off-by-one): nudge + tone; only the asked row counts itself; its last badge grows and the column numeral under its last icon pulses.
- Retry behaviour: attempt 1 unaided → attempt 2 after the self-count → attempt 3 with the show-me ring on the correct row or tile; the ringed target completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 10 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Pictograph Reader"; `whichMost` = "Which row has the most?"; `whichFewest` = "Which row has the fewest?"; `howMany` = "How many?". No fruit is ever named in text.

## Sound
`tone("correct")` on the correct row or tile; `tone("nudge")` on a wrong one; `tone("tap", k)` per badged icon during a self-count (pitch climbs along the row, F-213; each row restarts from k = 1); `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the badges and totals carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu, praise change with the picker; the three captions once translated; the rows show no words in any language).
- [ ] Works at narrow width (400-px iframe: the prompt, the whole panel with eight columns and the numeral tiles fully visible).
- [ ] Keyboard operable (Tab cycles the three rows top to bottom, or the three numeral tiles at the third level; Enter picks; icons are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (10 wrong taps in a row still reach All done via the show-me ring).
- [ ] Every icon in every row is the same size and sits on the column grid; faint column lines and the numerals 1-8 are always visible.
- [ ] Tapping a row that is not the longest makes every row count itself with badges and rising notes, and the largest total pulses with the bubble glyph.
- [ ] At the second level the bubble shows a ring on the shortest bar for "fewest", and tapping the longest row ends the count with the smallest total pulsing.
- [ ] At the third level the bubble shows one fruit with "?", the rows cannot be tapped, and tapping a number one off makes only that row count itself with its column numeral pulsing.
- [ ] Rows are never displayed sorted by size; the longest row can be any of the three.
- [ ] Two first-try corrects in a row bring differences of one and then "how many" items; a wrong tap brings the obvious-difference items back.
- [ ] The finish screen shows ten small rows with their numerals and no score.
- [ ] With `?sound=off` nothing is audible.
