# 120 — Bar Chart Reader

## Identity
- Slug: `bar-chart-reader`
- Subject / topic: Mathematics / data — reading a value off a bar chart against gridlines and typing it (one bar; then a bar that is not the tallest; then the total of two named bars)
- Age band: `6-8`
- Interaction pattern: `P11` — keypad entry (one- or two-digit answers; physical keyboard digits also work)
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P11 (the shape of 019 with a chart in place of the blocks). Data rule (F-118): gridlines and integer axis labels are ALWAYS drawn — the child never estimates a bar tip; every bar is a whole number of 20-px rows; all bars share one fill token so no bar is marked out by colour; category icons are the same size under every bar. Level order follows F-118: read one bar (L1) → read the asked bar among taller and shorter neighbours (L2, the compare step: "the asked one, not the biggest") → the total of two bars (L3). Content is language-neutral (bars, gridlines, numerals, animal icons); no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Finds the bar the question ring points at, reads its top against the gridlines and axis labels, and types that number (at the third level, the total of the two ringed bars).
- Prerequisites: Reads and types numerals to 20; counts a column of cells (game 003); has read a one-to-one pictograph (game 119). Reads the short caption or the ringed icon alone.
- Curriculum links: F-1 (data/graphs in 5 of 15 sources), F-21 ("tables, pictograms and bar charts" in 11 of 12 systems — Norway at 10), F-31 row "Pictogram / bar chart" — conservative 7-8, earliest 6 → 6-8 (US 1.MD.C.4 "ask and answer questions about the total number of data points, how many in each category" / 2.MD.D.10 "draw a … bar graph … solve simple put-together … problems using information presented in a bar graph" — the L3 total verbatim; England Y2 "interpret and construct simple … block diagrams … ask and answer questions about totalling"; Germany Klasse 2 "Säulendiagramme lesen"; France CE1 "lire un diagramme en barres"; Netherlands groep 4 "staafdiagram aflezen"; Spain 1º ciclo "gráficos de barras"; Brazil EF02MA22 "gráficos de colunas"; Sweden åk 1-3 "enkla tabeller och diagram"; Denmark 2. klasse "søjlediagram"; Finland grade 2 "pylväsdiagrammi"). F-101 (counting rows), F-105 (counting on for the total), F-102 (digit order when typing two digits).
- Common misconceptions (F-118, F-101, F-105, F-102), each with this game's response:
  1. **Bar tip misread by one (reads the gridline below the tip, or counts the tip's own line as an extra row).** Response: a wrong answer of n ± 1 makes the asked bar **count its rows** from the base — each 20-px row lights in turn with `ART.rowBadge` 1, 2, 3 … (`tone("tap", k)`), the last badge grows (`ANIM.lastBadge`) — and `ART.tipLine` is drawn across the chart at the bar's top while the matching axis label (`ART.axisLabel`) pulses (`ANIM.pulse`); the count and the label agree in front of the child.
  2. **Reads the wrong bar — the tallest, or the neighbour of the asked one ("graph-as-picture": the biggest is the answer).** Response: from L2 the asked bar is never the tallest; a wrong answer equal to another bar's height dims every other bar (`ANIM.dimOthers`), pulses the question ring on the asked icon (`ART.askRing`, `ANIM.pulse`) and shades the asked bar (`ART.barShade`) before its rows count.
  3. **Types the number of bars or of icons ("4") instead of a height.** Response: the same enacted row-count on the asked bar; the display clears with `ANIM.nudge`; nothing on the chart ever has the number of bars written on it.
  4. **L3 total answered with one bar's height, or with the difference (F-105: not counting ON).** Response: the two ringed bars count their rows in sequence — bar A's rows 1 … a, then bar B's rows continue a + 1 … a + b (the count does not restart) — and `ART.sumStrip` (a + b cells drawn end to end beside the chart) shows the total as one length; `ART.plusMark` sits between the two rings.
  5. **Two-digit answer typed in reverse (12 as 21 — F-102; de/nl/da word order).** Response: on the third attempt the answer builds itself on the display digit by digit while the sum strip shows a ten-row and the remaining cells (`ART.tenRow` + cells); the child re-types it.

## How it plays
1. **Start screen**: title "Bar Chart Reader", the koala (`ART.koala`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: three bars — dog 4, cat 6, rabbit 2; asked: cat)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A/B left: the chart — `ART.axisY` from (120, 96) to (120, 300) and `ART.axisX` from (120, 300) to (420, 300); eleven `ART.gridLine`s at y = 300 − 20 u for u = 0 … 10, each with `ART.axisLabel` ("0" … "10") right-aligned at x = 104; three bars (`ART.bar`, 56 wide) rising from the base line at x = 180 / 270 / 360 with heights 20 × value (dog 80, cat 120, rabbit 40); under each bar its category icon at y = 328 (`ART.dog` / `ART.cat` / `ART.rabbit`, 36 px); the ASKED icon (cat) sits inside `ART.askRing` with `ART.questionMark` beside it at (270, 362). The koala at (60, 240) looks at the chart. Zone B left-bottom: the caption `S("howTall")` ("How many?") at (170, 388), 22 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 220; the display card (`ART.card`, 180 × 72) at (170, 440) with `ART.display` (44 px) empty. Zone A/B right: the keypad — nine keys (`ART.key`, 60 × 60) in a 3 × 3 grid at x = 536 / 604 / 672, y = 130 / 198 / 266, labelled 1-9 in phone order; a fourth row at y = 334: backspace (`ART.key` with `ART.backGlyph`) at (536, 334) and 0 at (604, 334). Zone C: OK (`makeButton ok`) at (420, 440), disabled until the display holds a digit.
3. **Typing**: the child taps digits; each appears on `ART.display` (`ANIM.digitIn`), `tone("tap")`; up to two digits are accepted (a third tap is ignored). Backspace removes the last digit. Physical keys 0-9, Backspace and Enter do the same. OK enables at the first digit.
4. **Check**: the child taps OK (or Enter).
   - **Correct (6)**: the display `ANIM.pop`s, `tone("correct")`; the asked bar counts its rows once anyway (`ART.rowBadge` 1 … 6, rising tones) and `ART.tipLine` appears at its top with the axis label "6" pulsing — the reading is modelled on every success (F-43); `GameCore.showPraise` (next key in rotation); the koala `ANIM.nod`; the rail dot fills; after 900 ms the next item builds (`ANIM.grow`: bars rise from the base) with an empty display.
   - **Wrong, 5 or 7 (tip misread)**: `tone("nudge")`; the display clears with `ANIM.nudge`; the asked bar counts its rows with the tip line and the pulsing label; the badges stay visible; OK disables until a digit is typed. Attempt 2.
   - **Wrong, another bar's height (4 or 2)**: nudge; the other bars dim (`ANIM.dimOthers`), the ask ring pulses, the asked bar shades (`ART.barShade`), then its rows count. Attempt 2.
   - **Wrong, anything else (3, 10, 12 …)**: nudge; the asked bar's rows count with the tip line. Attempt 2.
   - **Wrong again (attempt 2)**: the same enactment; then the show-me: the correct answer builds itself on the display digit by digit (`ANIM.digitIn`, tens digit first while `ART.tenRow` pulses in the sum strip if the answer is ≥ 10, then the ones digit), stays 1200 ms and clears; the child re-types it and taps OK, which now carries the show-me ring (`ART.showRing`, `ANIM.showMe`); solved-with-help (no praise pop). A still-wrong re-type rebuilds the answer again until it is entered.
5. **Re-queue** (F-41): an item answered wrong first-try re-enters after 2 intervening items with its bar ORDER shuffled; the item count stays 12 (it replaces the last unplayed item of the same level).
6. **Items 2-12**: per Content/Rules. L1 = three bars, values ≤ 6, any bar asked; L2 = four bars (x = 165 / 235 / 305 / 375, 48 wide), values ≤ 10, the asked bar never the tallest and never the shortest; L3 = four bars, TWO ringed icons with `ART.plusMark` between them, the caption `S("howManyTogether")` ("How many together?"), answers 7-19.
7. **Finish**: `t("all_done")` (360, 110); the koala (360, 200) `ANIM.celebrate`; the summary = twelve mini charts (`ART.miniChart`, 48 × 40: the item's bars at 3 px per unit with the read bar(s) drawn in `structure` and the others in `line`, the answer numeral above in 16 px `THEME.colour.structure`) in two rows of six from y = 330 (x = 135 + i × 90), first-try items with `ART.dotFull` at their left, helped items `ART.dotEmpty` — what was read unaided, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  koala:        { kind: "emoji", value: "🐨", size: 72 },
  dog:          { kind: "emoji", value: "🐶", size: 36 },
  cat:          { kind: "emoji", value: "🐱", size: 36 },
  rabbit:       { kind: "emoji", value: "🐰", size: 36 },
  fish:         { kind: "emoji", value: "🐟", size: 36 },
  bird:         { kind: "emoji", value: "🐦", size: 36 },
  turtle:       { kind: "emoji", value: "🐢", size: 36 },
  axisY:        { kind: "shape", shape: "rect", w: 3, h: 204, fill: "ink" },
  axisX:        { kind: "shape", shape: "rect", w: 300, h: 3, fill: "ink" },
  gridLine:     { kind: "shape", shape: "rect", w: 300, h: 1, fill: "line" },
  axisLabel:    { kind: "text",  value: "", size: 16, font: "display", color: "inkSoft" },   // "0".."10"
  bar:          { kind: "shape", shape: "rect", w: 56, h: 120, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // h = 20 × value, origin at its bottom edge; w 48 for four-bar charts
  barShade:     { kind: "shape", shape: "rect", w: 56, h: 120, fill: "accent" },     // drawn over the asked bar at alpha 0.25 during the wrong-bar cue
  askRing:      { kind: "shape", shape: "circle", r: 26, stroke: "accent", strokeWidth: 4 },
  questionMark: { kind: "text",  value: "?", size: 26, font: "display", color: "accent" },
  plusMark:     { kind: "text",  value: "+", size: 28, font: "display", color: "structure" },
  rowBadge:     { kind: "shape", shape: "circle", r: 9, fill: "bg" },                // numeral 11 px structure at each 20-px row's centre
  tipLine:      { kind: "shape", shape: "rect", w: 300, h: 3, fill: "accent" },      // across the chart at the asked bar's top; dashed via lineDash [8,6]
  sumStrip:     { kind: "shape", shape: "rect", w: 14, h: 14, fill: "accent", stroke: "bg", strokeWidth: 1 },   // one cell per counted row, laid end to end beside the chart (L3)
  tenRow:       { kind: "shape", shape: "rect", w: 140, h: 14, fill: "structure", stroke: "bg", strokeWidth: 1 },   // ten cells bundled; nine hairline notches
  card:         { kind: "shape", shape: "roundRect", w: 180, h: 72, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },
  display:      { kind: "text",  value: "", size: 44, font: "display", color: "ink" },
  key:          { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // digit 28 px display ink
  backGlyph:    { kind: "text",  value: "⌫", size: 28, font: "display", color: "structure" },
  showRing:     { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  miniChart:    { kind: "shape", shape: "rect", w: 48, h: 40, stroke: "line", strokeWidth: 1 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Every bar uses the same fill; the asked bar is marked by the RING on its icon (and the shade during a cue), never by colour alone. Icons are all 36 px.

## Animation registry
```js
const ANIM = {
  digitIn:   { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "a digit appears on the display (from alpha 0, scale 0.6); also the show-me digits" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "display on a wrong answer (then its text is cleared)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "display on a correct answer" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "row badges in turn from the base, 180 ms apart (from alpha 0, scale 0.5)" },
  lastBadge: { scale: 1.5, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last row badge of the asked bar (or of the second bar at L3)" },
  pulse:     { scale: 1.3, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the matching axis label; the ask ring; tenRow during the show-me" },
  dimOthers: { alpha: 0.3, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "every bar except the asked one(s) during the wrong-bar cue" },
  shadeIn:   { alpha: 0.25, duration: 250, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "barShade over the asked bar (from alpha 0)" },
  tipIn:     { alpha: 1, scaleX: 1, duration: 300, ease: "Sine.Out", trigger: "tipLine grows across the chart from the axis (scaleX from 0, origin at its left end)" },
  cellIn:    { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "each sumStrip cell as its row is counted (from alpha 0, scale 0.5)" },
  grow:      { scaleY: 1, duration: 400, ease: "Sine.Out", trigger: "new item's bars rise from the base line (scaleY from 0, origin at the bar's bottom), 80 ms apart" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "badges, tip line and strip between items" },
  nod:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "koala on a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around OK during the show-me (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish koala" }
};
```
No flashing: `showMe` at 1 Hz; `pulse` three half-cycles; the row count is one sequence; bars never toggle visibility.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ 10┤                                    [1] [2] [3]  y=130    │
      │  8┤        ▐█▌                          [4] [5] [6]  y=198    │  zone A
      │  6┤        ▐█▌  gridlines every 20 px   [7] [8] [9]  y=266    │
      │  4┤  ▐█▌   ▐█▌                          [BK][0]     y=334    │
      │  2┤  ▐█▌   ▐█▌   ▐█▌                    x=536/604/672 (60×60)│
      │  0└──┴─────┴─────┴────── axisX y=300, x=120..420             │
      │ koala  dog  (cat)? rabbit  icons y=328; ring on the asked one │  zone B
      │ (60,240) x=180 x=270 x=360                                    │
      │     "How many?" (170,388)                                    │
      │     [   6    ] card (170,440)      [   OK   ] (420,440)      │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(Bars in the diagram are drawn as blocks; BK = backspace.) Four-bar charts use x = 165 / 235 / 305 / 375 with 48-px bars; the L3 sum strip is laid horizontally along y = 96 from x = 130 rightward (14 px per cell, up to 19 cells = 266 px, ending before x = 400), above the chart's top gridline. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Chart: `ART.axisY` centred (120, 198); `ART.axisX` centred (270, 300); `ART.gridLine`s centred (270, 300 − 20 u), u = 0 … 10, with `ART.axisLabel` at (104, 300 − 20 u); bars `ART.bar` with their bottom edge on y = 300 at the x positions above (`h` = 20 × value; `w` 56 for three bars, 48 for four); icons at y = 328; `ART.askRing` around the asked icon(s) with `ART.questionMark` at (icon x + 30, 362); at L3 `ART.plusMark` midway between the two ringed icons at y = 362.
- Cues: `ART.rowBadge` at the asked bar's centre x, y = 300 − 20 (k − 0.5) for row k; `ART.tipLine` centred (270, bar top); `ART.barShade` over the asked bar; `ART.sumStrip` cells along y = 96 from x = 130 (pitch 14) at L3, with `ART.tenRow` replacing the first ten cells during the show-me.
- `ART.koala` at (60, 240). Caption at (170, 388). `ART.card` at (170, 440) with `ART.display` centred (right-aligned within a 140-px box so digits fill from the left as typed).
- Keypad: 11 × `makeTile` 60 × 60 with `ART.key` tokens; digit labels 28 px `THEME.font.display` `THEME.colour.ink`; the backspace tile's label is `ART.backGlyph`. Gaps 8 (pitch 68) — accepted for a keypad whose neighbouring keys are equivalent-risk targets; every key is ≥ 56.
- OK: `makeButton ok` at (420, 440), alpha 0.5 while disabled; `ART.showRing` around it during the show-me.
- Tab order: keys 1-9 in reading order, backspace, 0, then OK. Physical keyboard: `keydown` for 0-9, Backspace, Enter (PATTERNS P11). Bars and icons are not focusable.

## Content
Language-neutral except the two captions (game-specific strings). Category words map to ART keys: dog `ART.dog`, cat `ART.cat`, rabbit `ART.rabbit`, fish `ART.fish`, bird `ART.bird`, turtle `ART.turtle`. An item = (bars as category: value, in display order; asked; answer). Bars are displayed in the order written.
- **L1** (three bars, values ≤ 6; any bar asked): (dog 4, cat 6, rabbit 2; cat; 6) · (fish 3, bird 5, turtle 1; fish; 3) · (rabbit 6, dog 2, cat 4; dog; 2) · (bird 2, turtle 5, fish 4; turtle; 5) · (cat 5, rabbit 3, dog 6; rabbit; 3) · (turtle 4, fish 1, bird 3; bird; 3)
- **L2** (four bars, values ≤ 10; the asked bar is neither the tallest nor the shortest): (dog 7, cat 4, rabbit 9, fish 2; dog; 7) · (bird 3, turtle 8, cat 6, dog 10; cat; 6) · (fish 5, rabbit 9, bird 7, turtle 1; bird; 7) · (cat 8, dog 3, turtle 5, fish 10; turtle; 5) · (rabbit 4, bird 9, dog 6, cat 2; rabbit; 4) · (turtle 10, fish 6, cat 8, bird 3; fish; 6) · (dog 5, rabbit 2, fish 8, turtle 9; fish; 8)
- **L3** (four bars; two ringed; answer = their total, 7-19): (dog 4, cat 6, rabbit 3, fish 8; dog + cat; 10) · (bird 7, turtle 5, cat 2, dog 9; bird + turtle; 12) · (fish 6, rabbit 8, bird 4, turtle 3; rabbit + bird; 12) · (cat 9, dog 7, turtle 6, fish 2; cat + turtle; 15) · (rabbit 5, bird 3, dog 8, cat 10; rabbit + bird; 8) · (turtle 9, fish 10, cat 4, bird 6; fish + turtle; 19) · (dog 6, rabbit 7, fish 5, bird 2; rabbit + fish; 12) · (cat 3, turtle 4, dog 10, rabbit 6; cat + turtle; 7)

Play list: 12 items with re-queue (How it plays §5); start at L1; shuffle within the level without repeats; level changes per Rules; if a pool is exhausted it is reused reshuffled with the bar order re-dealt. Two consecutive items never share an answer.

Worked example: item 1 (cat 6) types 6 → the cat bar counts 1 … 6, the tip line lands on "6", praise · item 2 (fish 3) first-try → L2 · item 3 (dog 7 among 4, 9, 2) types 9 → nudge; the other bars dim, the ring pulses, the dog bar shades and counts 1 … 7; types 7 (helped) → L1 · items 4-5 first-try → L2 · items 6-7 first-try → L3 · item 8 (dog 4 + cat 6) types 6 → nudge; the dog bar counts 1 … 4 and the cat bar continues 5 … 10 while ten strip cells appear; types 10 (helped) → L2 · item 3 returns at position 10 with its bars re-dealt and is solved first-try · items 11-12 first-try → Finish shows twelve mini charts.

## Rules
- Item count: 12 (including re-queued repeats, which replace unplayed items).
- Difficulty progression: after 2 consecutive first-try correct answers, the next item comes from the next level up (cap L3). "First-try correct" = the first OK was correct.
- Adaptation: a wrong answer on an item, or wrong first-try on 2 consecutive items, moves the NEXT item one level down (floor L1). The current item is never abandoned; a missed item re-queues after 2 items.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no key tapped, the ask ring `ANIM.pulse`s once; repeats every 8 s. Nothing about time is displayed; nothing ends.
- What happens on a correct answer: `ANIM.pop` on the display, `tone("correct")`, the asked bar(s) count their rows once (badges, rising tones, the tip line, the pulsing label), praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], koala `ANIM.nod`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - **Tip misread by one (5 or 7 for 6)**: `tone("nudge")`, display clears with `ANIM.nudge`; the asked bar counts its rows from the base, `ART.tipLine` grows across at its top and the axis label pulses.
  - **Another bar's height typed (the tallest or a neighbour)**: the other bars `ANIM.dimOthers`, the ask ring pulses, `ART.barShade` covers the asked bar, then its rows count.
  - **The number of bars or icons typed (3 or 4)**: the asked bar counts its rows with the tip line; nothing on the chart shows the number of bars.
  - **L3: one bar's height or the difference typed**: the first ringed bar counts 1 … a, the second continues a + 1 … a + b, and `ART.sumStrip` cells appear one per counted row beside the chart.
  - **Digits reversed (21 for 12)**: the row count; on attempt 3 the answer builds tens digit first while `ART.tenRow` pulses in the strip, then the ones digit.
  - **A third digit typed**: ignored (no error, no sound).
- Retry behaviour: attempt 1 unaided → attempt 2 with the counted, badged bar in view → attempt 3 the answer builds itself and the child re-types it with the ringed OK; solved-with-help. No attempt 4 (a still-wrong re-type just rebuilds the answer again until it is entered).
- Finish condition: 12 items solved → Finish scene. No losing state; the only exits are Finish or Menu.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Bar Chart Reader"; `howTall` = "How many?"; `howManyTogether` = "How many together?". No animal is ever named in text.

## Sound
`GameCore.tone` only (§11): `tone("tap")` on each key; `tone("tap", k)` per row badge during a count (pitch climbs with the bar; at L3 the second bar continues the climb — F-213); `tone("correct")` on a correct answer; `tone("nudge")` on a wrong answer; `tone("finish")` once. Silent under `?sound=off`; no audio files. No sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, OK, "Question 3 of 12", "All done!", "Play again", "Menu" and the praise pops; the two captions change once translations are loaded; the chart shows no words in any language.
- [ ] Works at narrow width: in a 400-px-wide iframe the axis with its labels, all bars and icons, the display card, all eleven keys and OK are visible and separate.
- [ ] Keyboard operable: Tab walks the keys then OK; Enter taps; physical digit keys type, Backspace deletes, Enter checks.
- [ ] Never auto-starts.
- [ ] No losing state: wrong answers never end the session; after two wrong answers the correct number builds itself on the display and re-typing it completes the item.
- [ ] Every chart shows gridlines at every whole number with a label 0-10 on the axis; every bar top sits exactly on a gridline.
- [ ] The asked bar's icon sits inside a coral ring with "?"; all bars are the same colour.
- [ ] Typing one more than the bar's height makes the bar count its rows from the bottom with badges, a dashed line grows across at its top and the matching axis label pulses.
- [ ] At the second level typing the tallest bar's height dims the other bars, pulses the ring and shades the asked bar before it counts.
- [ ] At the third level two icons are ringed with "+" between them; typing one bar's height makes the first bar count 1 … a and the second continue a + 1 … a + b while a strip of cells grows above the chart.
- [ ] A correct answer still makes the asked bar count its rows before the next item.
- [ ] A missed item comes back two items later with its bars in a different order.
- [ ] Two first-try corrects in a row bring four-bar charts, then two-bar totals; two misses in a row bring three-bar charts.
- [ ] The finish screen lists twelve mini charts with their answers, a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
