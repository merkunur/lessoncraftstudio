# 121 — Compare Two Bars

## Identity
- Slug: `compare-two-bars`
- Subject / topic: Mathematics / data — comparing two bars on a bar chart ("how many more?" as a difference read against gridlines)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three numeral tiles; tap the difference)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (bars, gridlines, integer labels, category icons, numerals); no `LOCALE_DATA`. Gridlines and integer axis labels are ALWAYS drawn (F-118) — the game never asks the child to estimate a bar tip.

## Learning
- Objective: Reads two labelled bars against the gridlines and taps the numeral that says how many more (or, at the third level, how many fewer) one category has than the other.
- Prerequisites: Reads numerals to 10; can count a row of cells; has met "how many more" with matching lines (game 029 is the natural predecessor). Reads the two-word caption or ignores it — the ringed icon carries the question.
- Curriculum links: F-1 (data/graphs in 5 of 15 sources), F-21 ("tables, pictograms and bar charts" in 11 of 12 systems), F-31 row "Pictogram / bar chart" — conservative 7-8, earliest 6 → 6-8 (US 1.MD.C.4 "ask and answer questions about … how many more or less are in one category than in another" / 2.MD.D.10; England Y2 "ask and answer questions about totalling and comparing categorical data"; Germany Klasse 2 "Daten in Diagrammen"; France CE1 "lire un diagramme en barres"; Netherlands groep 4 "staafdiagram aflezen"; Spain 1º ciclo "gráficos de barras"; Brazil EF02MA22; Sweden åk 1-3 "enkla tabeller och diagram"; Finland grade 2 "pylväsdiagrammi"). F-106 (the difference/comparison model of subtraction, not take-away) is the model this game enacts: the shorter bar is laid over the taller one and the rows that stick out are counted.
- Common misconceptions (F-118, F-106), each with this game's response:
  1. **Reads one bar and answers with its height ("apples: 6") instead of comparing two.** Response: the tapped tile nudges; then the **overlay** — a translucent band the height of the SHORTER bar is drawn over the taller bar from the base (`ART.matchBand`), and the rows above the band light one at a time (`ART.diffRow`) with a numeral badge 1, 2, 3 … (`ART.countBadge`, `tone("tap", k)`); the last badge grows (`ANIM.lastBadge`). The difference is counted in front of the child, not stated.
  2. **Bar-tip misread by one (counts the gridline the tip sits on as an extra row, or stops one short).** Response: gridlines and integer labels are always on; on an off-by-one tap the accent tip line (`ART.tipLine`) is drawn across the chart at each bar's top and the matching axis label is pulsed (`ART.tipLabel`, `ANIM.pulse`) for 800 ms before the overlay plays, so the child re-reads each tip against its label.
  3. **Adds the two bars ("6 and 4, that's 10") — the wrong operation for "more".** Response: L2 and L3 offer the sum as a distractor; tapping it shows both tip labels, then the overlay: the band shows the part the two bars SHARE and the lit rows are the extra — the sum never appears on the chart.
  4. **"Fewer" read as "more" (answers the taller bar's height, or freezes on the word).** Response: at L3 the question ring (`ART.askRing`) sits on the SHORTER category's icon and the caption changes to `S("howManyFewer")`; the overlay is identical (the band is still the shorter bar's height, the lit rows are still the extra), because the difference is the same number whichever way it is asked — the child sees that "more" and "fewer" name one gap.
  5. **Graph-as-picture: compares the icons under the bars instead of the bars.** Response: the two category icons are the same size and the bars are the same colour; only height differs. Nothing about an icon ever hints at its bar.

## How it plays
1. **Start screen**: title "Compare Two Bars", the hedgehog (`ART.hedgehog`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: apples 5, pears 3; "How many more?" asked about apples)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A holds the chart: the axis (`ART.axisY`) from (220, 90) to (220, 300) and the base line (`ART.axisX`) from (220, 300) to (520, 300); eleven gridlines (`ART.gridLine`) at y = 300 − 20u for u = 0 … 10, each with its integer label (`ART.axisLabel`, "0" … "10") right-aligned at x = 204; two bars (`ART.bar`, 72 wide) rising from the base line: bar A centred at x = 310, height 20 × 5 = 100; bar B centred at x = 430, height 60. Under each bar its category icon at y = 328: `ART.apple` under A, `ART.pear` under B. The hedgehog sits at (90, 210) with a speech bubble (`ART.bubble`) at (90, 110) holding a copy of the ASKED icon (`ART.apple`, 40 px) inside the question ring (`ART.askRing`) with `ART.questionMark` to its right. Zone B: caption `S("howManyMore")` ("How many more?") at (360, 362), 24 px `THEME.colour.inkSoft`; three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 430, x = 240 / 360 / 480, labelled 2, 5, 8 in a shuffled order. Zone C: empty (praise pops appear centred).
3. **Answering**: the child taps a tile.
   - **Correct (2)**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; the overlay plays as confirmation (band over bar A, two rows light with badges 1, 2; the last badge grows), `ART.diffText` "2" appears at (620, 190) beside the chart (`ANIM.appear`); `GameCore.showPraise` with the next key in rotation; the hedgehog `ANIM.nod`; the rail dot fills; after 900 ms the chart clears (`ANIM.fadeOut` on bars, band, rows) and the next item's bars grow from the base (`ANIM.grow`).
   - **Wrong — 5 (the taller bar's height)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; then the overlay (band + counted rows) for 1.6 s while all tiles are `setEnabled(false)`; tiles re-enable. Attempt 2.
   - **Wrong — 8 (the sum)**: nudge + tone; both tip labels pulse with the tip lines for 800 ms, then the overlay. Attempt 2.
   - **Wrong — off by one (a 1 or 3 tile when the difference is 2)**: nudge + tone; tip lines + pulsing labels, then the overlay. Attempt 2.
   - **Wrong on attempt 2**: the cue again, and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (overlay and rail dot, no praise pop).
4. **Items 2-10**: per Content/Rules. L1 values to 6, differences 1-3, the taller bar always asked; L2 values to 10, differences 1-5, the sum offered as a distractor; L3 "How many fewer?" — the ring on the shorter icon, distractors include the shorter bar's height and the sum.
5. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 200) `ANIM.celebrate`; the summary = ten mini charts (`ART.miniChart`, 48 × 40: two little bars drawn to scale 4 px per unit with the difference numeral above, 16 px `THEME.colour.structure`) in two rows of five from y = 330 (x = 160 + i × 100), in play order; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  hedgehog:     { kind: "emoji", value: "🦔", size: 88 },
  apple:        { kind: "emoji", value: "🍎", size: 40 },
  pear:         { kind: "emoji", value: "🍐", size: 40 },
  banana:       { kind: "emoji", value: "🍌", size: 40 },
  grapes:       { kind: "emoji", value: "🍇", size: 40 },
  strawberry:   { kind: "emoji", value: "🍓", size: 40 },
  cherry:       { kind: "emoji", value: "🍒", size: 40 },
  carrot:       { kind: "emoji", value: "🥕", size: 40 },
  broccoli:     { kind: "emoji", value: "🥦", size: 40 },
  bubble:       { kind: "shape", shape: "roundRect", w: 150, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  askRing:      { kind: "shape", shape: "circle", r: 30, stroke: "accent", strokeWidth: 4 },
  questionMark: { kind: "text",  value: "?", size: 40, font: "display", color: "structure" },
  axisY:        { kind: "shape", shape: "line", w: 3, stroke: "ink", strokeWidth: 3 },           // (220,90)-(220,300)
  axisX:        { kind: "shape", shape: "line", w: 3, stroke: "ink", strokeWidth: 3 },           // (220,300)-(520,300)
  gridLine:     { kind: "shape", shape: "line", w: 1, stroke: "line", strokeWidth: 1 },          // x 220-520 at each unit; drawn ALWAYS
  axisLabel:    { kind: "text",  value: "", size: 16, font: "body", color: "inkSoft" },          // "0".."10" at x=204, right-aligned
  bar:          { kind: "shape", shape: "rect", w: 72, h: 20, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },   // h = 20 × value, anchored at the base line
  matchBand:    { kind: "shape", shape: "rect", w: 72, h: 20, fill: "structure" },              // drawn at 30% alpha over the taller bar; h = 20 × shorter value
  diffRow:      { kind: "shape", shape: "rect", w: 72, h: 20, fill: "accent", stroke: "accent", strokeWidth: 2 },   // one lit row of the difference, 45% alpha fill
  countBadge:   { kind: "shape", shape: "circle", r: 13, fill: "accent" },                      // numeral 16 px display inkOnAccent on it
  tipLine:      { kind: "shape", shape: "line", w: 300, stroke: "accent", strokeWidth: 3 },      // across x 220-520 at a bar's top
  tipLabel:     { kind: "text",  value: "", size: 18, font: "display", color: "accent" },        // the value, drawn over the axis label at the tip
  diffText:     { kind: "text",  value: "", size: 44, font: "display", color: "structure" },     // the difference beside the chart after a correct tap
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px display ink
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniChart:    { kind: "shape", shape: "roundRect", w: 48, h: 40, fill: "surface", stroke: "line", strokeWidth: 1, radius: 6 },    // finish summary; two bars of 14 px width at 4 px/unit inside
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Bars are the same colour whatever the item; the icon under each bar is its only label (§12 — meaning never by colour).

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  grow:      { scaleY: 1, duration: 500, ease: "Sine.Out", trigger: "each bar of a new item rises from the base line (from scaleY 0, origin at the bottom); bar B starts 150 ms after bar A" },
  lightRow:  { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "one diffRow lighting (from alpha 0); rows 300 ms apart" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last count badge of the overlay" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "tip labels during the tip cue" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "diffText; matchBand (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "bars, band, rows, badges, tip lines at the end of an item or a cue" },
  nod:       { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hedgehog after a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```
No flashing: `showMe` at 1 Hz; rows light once each.

## Screen layout
Stage 720 × 560, fixed layout, FIT scaling.

```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28 · "Question 1 of 10" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  bubble (90,110) [ (icon) ? ]      10 ┤─────────────────────  │
      │                                     8 ┤─────────────────────  │
      │  hedgehog (90,210)                  6 ┤─────────────────────  │  zone A
      │                                     4 ┤───┌────┐─────────────  │  chart: axis x=220,
      │                                     2 ┤───│ A  │───┌────┐────  │  base y=300,
      │                                     0 ┴───┴────┴───┴────┴────  │  bars x=310 / 430
      │                                          (icon)    (icon)  y=328 │
340   ├──────────────────────────────────────────────────────────────┤
      │              "How many more?" (360,362)                       │
      │        [ 2 ]      [ 5 ]      [ 8 ]   tiles y=430, x=240/360/480 │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Zone A is extended to y = 340 for the chart (the icons under the bars sit at y = 328); zone B starts at 340. `ART.diffText` sits at (620, 190).

## Visual specification
- Background `THEME.colour.bg`. Rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22), swapped for `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Chart: `ART.axisY` (220, 90)-(220, 300); `ART.axisX` (220, 300)-(520, 300); `ART.gridLine` × 11 from x = 220 to 520 at y = 300 − 20u; `ART.axisLabel` × 11 at x = 204 (right-aligned) for u = 0 … 10 — all drawn on every item, never hidden.
- Bars: `ART.bar` at x = 310 (bar A) and x = 430 (bar B), each with height 20 × value, bottom edge on the base line. Category icons at (310, 328) and (430, 328) from the item's two ART keys.
- Hedgehog `ART.hedgehog` (90, 210); `ART.bubble` (90, 110) containing the asked icon at (70, 110) inside `ART.askRing` and `ART.questionMark` at (122, 110).
- Overlay: `ART.matchBand` over the taller bar (same x, height 20 × shorter value, from the base) at 30 % alpha; `ART.diffRow` × d stacked above the band (row k at y = 300 − 20 × (shorter + k) + 10), each with `ART.countBadge` at its centre holding k (16 px `THEME.font.display`, `THEME.colour.inkOnAccent`).
- Tip cue: `ART.tipLine` at y = 300 − 20 × value for each bar; `ART.tipLabel` over the matching axis label.
- Caption `S("howManyMore")` / `S("howManyFewer")` at (360, 362), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` width 600, two lines max.
- Numeral tiles: `makeTile` 96 × 96 with `ART.numeralTile` tokens, label 44 px `THEME.font.display` `THEME.colour.ink`; gaps 24 (≥ 12); `ART.showRing` behind the correct tile on attempt 3.
- Tab order: the three tiles left to right. Under `?embed=1` the picker is not created. During any cue (≤ 2.4 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral. Item = (category A icon key, value A; category B icon key, value B; asked = the category in the ring; question = more | fewer; the three tiles = correct + two distractors, shuffled). Values ≤ 10, both bars ≥ 1, bars never equal.

- **L1** (values to 6; difference 1-3; "more", the taller bar asked; distractors = the taller bar's height and an off-by-one):
  1. (`ART.apple` 5; `ART.pear` 3; asked apple; more; tiles 2, 5, 3)
  2. (`ART.banana` 4; `ART.grapes` 1; asked banana; more; tiles 3, 4, 2)
  3. (`ART.strawberry` 2; `ART.cherry` 6; asked cherry; more; tiles 4, 6, 5)
  4. (`ART.carrot` 6; `ART.broccoli` 4; asked carrot; more; tiles 2, 6, 1)
  5. (`ART.pear` 3; `ART.apple` 5; asked apple; more; tiles 2, 5, 1)
- **L2** (values to 10; difference 1-5; "more"; distractors = the taller bar's height and the SUM):
  6. (`ART.apple` 8; `ART.banana` 5; asked apple; more; tiles 3, 8, 13)
  7. (`ART.grapes` 4; `ART.strawberry` 9; asked strawberry; more; tiles 5, 9, 13)
  8. (`ART.cherry` 7; `ART.carrot` 6; asked cherry; more; tiles 1, 7, 13)
  9. (`ART.broccoli` 10; `ART.pear` 6; asked broccoli; more; tiles 4, 10, 16)
  10. (`ART.banana` 3; `ART.grapes` 7; asked grapes; more; tiles 4, 7, 10)
  11. (`ART.apple` 9; `ART.cherry` 4; asked apple; more; tiles 5, 9, 4)
- **L3** ("fewer" — the SHORTER bar is ringed; distractors = the shorter bar's height and the sum or an off-by-one):
  12. (`ART.pear` 3; `ART.apple` 8; asked pear; fewer; tiles 5, 3, 11)
  13. (`ART.strawberry` 6; `ART.banana` 2; asked banana; fewer; tiles 4, 2, 8)
  14. (`ART.carrot` 5; `ART.grapes` 10; asked carrot; fewer; tiles 5, 4, 15)
  15. (`ART.broccoli` 7; `ART.cherry` 9; asked broccoli; fewer; tiles 2, 7, 3)
  16. (`ART.apple` 1; `ART.pear` 6; asked apple; fewer; tiles 5, 1, 7)
  17. (`ART.banana` 8; `ART.strawberry` 4; asked strawberry; fewer; tiles 4, 8, 12)

Play list of 10 per Rules; within a level items are taken in a shuffled order without repeats; if a pool is exhausted it is reshuffled. Tile positions shuffled per item; the correct tile never sits in the same slot twice running (§13). Bar A is always the left bar.

Worked example: item 1 first-try · item 2 first-try → L2 · item 6 (8 vs 5) taps 13 → both tip labels pulse, the band covers 5 rows of the apple bar and rows 6-8 light as 1, 2, 3; then taps 3 (helped) → L1 · item 3 first-try · item 4 first-try → L2 · items 7-9 first-try → L3 · item 12 (pear 3, apple 8, "How many fewer?") first-try 5 · Finish shows ten mini charts.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the overlay as confirmation, `ART.diffText`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], hedgehog `ANIM.nod`, rail dot, next item after 900 ms with `ANIM.grow`.
- What happens on a wrong answer (per anticipated mistake):
  - The taller bar's height tapped (reads one bar): `ANIM.nudge`, `tone("nudge")`, then the overlay — `ART.matchBand` over the taller bar and the difference rows lit one by one with badges and rising tones.
  - The sum tapped (adds instead of compares): nudge, tone, the tip lines with both `ART.tipLabel`s pulsing for 800 ms, then the overlay.
  - Off-by-one tapped (bar tip misread): nudge, tone, the tip lines and labels pulse, then the overlay.
  - The shorter bar's height tapped at L3 (reads "fewer" as the small bar's value): nudge, tone, then the overlay — identical to "more", so the child sees the same gap.
- Retry behaviour: attempt 1 unaided → attempt 2 after the cue → attempt 3 with the show-me ring; the ringed tile completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Compare Two Bars"; `howManyMore` = "How many more?"; `howManyFewer` = "How many fewer?".

## Sound
`tone("correct")` on the correct tile; `tone("nudge")` on a wrong tile; `tone("tap", k)` as the k-th difference row lights (pitch climbs with the difference); `tone("finish")` once. Silent under `?sound=off`; no audio files. The lit rows carry the meaning; sound never does alone.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu, praise change with the picker; the caption once translated).
- [ ] Works at narrow width (400-px iframe: the whole chart with all eleven labels, both icons and the three tiles visible).
- [ ] Keyboard operable (Tab cycles the three numeral tiles; Enter picks; the chart is not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (10 wrong taps in a row still reach All done via the show-me ring).
- [ ] Gridlines and the integer labels 0-10 are visible on every item, including during the overlay.
- [ ] Tapping the taller bar's height (e.g. 5 for 5 vs 3) draws a translucent band over the taller bar and lights two rows above it with badges 1 and 2.
- [ ] Tapping the sum at level 2 pulses both bars' tip labels before the overlay.
- [ ] At level 3 the ring sits on the shorter bar's icon and the caption reads "How many fewer?"; the correct answer is still the gap between the bars.
- [ ] Both bars are always the same colour; only the icons and heights differ.
- [ ] Two first-try corrects in a row bring taller bars and a sum distractor; a wrong tap brings smaller bars next.
- [ ] The finish screen shows ten mini two-bar charts with their differences and no score.
- [ ] With `?sound=off` nothing is audible.
