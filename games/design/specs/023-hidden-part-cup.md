# 023 — Hidden Part Cup

## Identity
- Slug: `hidden-part-cup`
- Subject / topic: Mathematics / the missing part of a bond within 10 (whole known, one part visible, the other hidden)
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (a P1 numeral tap commits the prediction; the cup lifts to reveal)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P10. Content is language-neutral (counters and numerals); no `LOCALE_DATA`.

## Learning
- Objective: Given the whole (a numeral) and the visible part (counters), states how many counters are hidden under the cup by tapping the numeral, then watches the cup lift and the hidden counters count themselves out.
- Prerequisites: Counts to 10; reads numerals to 10; has built bonds with both parts visible (games 004, 021, 022).
- Curriculum links: F-21 (number composition to 10 / part-whole in all twelve systems), F-1 (number bonds to 10 in 8 of 15 sources), F-40 (retrieval before showing — the prediction is the retrieval event), F-31 row "Number bonds to 10 / part-whole" — conservative 7, earliest 4 → 6-8 (US K.OA.A.4 "for any number from 1 to 9, find the number that makes 10"; 1.OA.D.8 "determine the unknown whole number"; England Y1 "number bonds … related subtraction facts"; Germany Klasse 1 "Ergänzen bis 10"; France CP "compléments à 10"; Netherlands groep 3 "aanvullen tot 10"; Spain 1º ciclo; Brazil EF01MA08; Sweden åk 1; Finland grade 1).
- Common misconceptions (F-104, F-106, F-101), each with this game's response:
  1. **Adding the two numbers on screen (whole 8, 3 visible → "11").** Response: the whole + visible sum is always one of the three tiles at L2-L3; choosing it is answered by the reveal itself — the cup lifts and only 5 counters are under it, counted out one by one with `ART.countBadge` 1…5, and the part-whole bar (`ART.wholeBar` "8" over the two part boxes) shows that the cup's counters and the visible ones TOGETHER make the bar, so 11 could never fit (the bar has room for 8 and the surplus would hang off it — `ART.overflowDot`s are drawn for 900 ms to show the 3 extra that the wrong prediction implied).
  2. **Answering with the visible part ("3 — I can see 3").** Response: the visible-part numeral is a tile at every level; on that prediction the reveal counts the hidden counters and then the visible ones get `ART.countBadge`s too in a second colour of glyph (`ART.countBadgeB`, ringed), ending with the two part numerals side by side under the bar: "5 and 3" (`ART.partText`) — the visible part was already known; the question was the OTHER part.
  3. **Off-by-one from counting on badly ("8 … 4, 5, 6, 7 — that's 4").** Response: the count-out under the cup starts from the visible part: the visible counters are counted first (3), then each hidden counter continues the count 4, 5, 6, 7, 8 with `tone("tap", k)` so the child hears the count-on reach the whole; the hidden counters' badges show 4…8 in the reveal and the hidden-part numeral "5" appears above the cup's place (`ART.hiddenTag`).
  4. **Treating the whole as a part (tapping 8).** Response: at L1 the whole is a distractor; the reveal shows the bar with its 8 already full when the two parts sit under it — the cup cannot hold the whole 8 when 3 are outside; the count-out lands on 8 as the LAST counter, and `ART.hiddenTag` shows 5.
  5. **Retrieval anxiety — guessing fast to get the reveal (F-45).** Response: no clock; a prediction can be changed before Check; the reveal is the same warm lift whether the prediction was right or wrong; a wrong prediction re-queues a mirrored item later (F-41).

## How it plays
1. **Start screen**: title "Hidden Part Cup", the mouse (`ART.mouse`) at (360, 200), Start, picker.
2. **Item 1 (L1: whole 5, visible 2, hidden 3)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48). Zone A: the part-whole bar — `ART.wholeBar` (a 320 × 56 rounded bar) centred at (360, 96) with `ART.wholeText` "5" on it; beneath it two part boxes side by side: the visible box (`ART.partBox`, 150 × 90) at (275, 190) holding the 2 visible counters (`ART.counter`, r 18, pitch 44, one row, centred), and the cup box at (445, 190) where the cup (`ART.cup`, 150 × 90 `structure` rounded shape with `ART.cupHandle`) sits over the 3 hidden counters. The mouse peeks from behind the cup at (520, 150). Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480: 3, 2, 5 shuffled (the hidden part, the visible part, the whole). Zone C: Check (`makeButton ok`) at (360, 510), disabled until a tile is selected. Caption `S("underCup")` ("How many under the cup?") at (360, 290), 24 px `THEME.colour.inkSoft`.
3. **Predicting**: tap a tile → it selects (`api.setSelected`, `ANIM.lift`, `tone("tap")`); tapping another switches; Check enables.
4. **Check → Reveal**: the cup lifts (`ANIM.cupLift`: y −70, then hovers) and the mouse `ANIM.peek`; the count-out: first the visible counters get `ART.countBadge` 1…v (200 ms apart, `tone("tap", k)`), then each hidden counter gets `ART.countBadge` v + 1 … whole; `ART.hiddenTag` (the hidden count, 40 px) appears above the cup box with `ANIM.appear`; `ART.partText` "2 and 3" appears under the boxes at (360, 250).
   - **Prediction correct**: the selected tile `ANIM.pop`s, `tone("correct")`, praise pop; the equation `ART.eqText` "2 + 3 = 5" appears at (360, 250) replacing the part text; rail dot fills; after 900 ms the next item builds (the cup lowers over a new set with `ANIM.cupDrop`). First-try correct.
   - **Prediction = whole + visible (added them)**: after the count-out, `ART.overflowDot`s (prediction − hidden of them) draw beyond the bar's right end and fade (`ANIM.ghostIn`); `tone("nudge")`; the tiles stay enabled and the child taps again with everything visible (attempt 2).
   - **Prediction = visible part**: after the count-out, the visible counters get `ART.countBadgeB` (ringed) and the part text pulses (`ANIM.pulse`); `tone("nudge")`; attempt 2.
   - **Prediction = whole, or off-by-one**: after the count-out, `ART.hiddenTag` pulses; `tone("nudge")`; attempt 2.
   - **Attempt 2 correct**: `tone("correct")`, equation shows, rail dot; no praise pop; solved-with-help (the counters were visible).
   - **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Re-queue** (F-41): an item wrong on the first prediction re-enters the play list after 2 intervening items as its MIRROR (same whole, visible and hidden swapped), then, if wrong again, near the end ("last look"). The item count stays 10; re-queued items replace the last unplayed items of the same level.
6. **Items 2-10**: per Content/Rules. L1 wholes 5-6 with tiles {hidden, visible, whole}; L2 wholes 7-8 with tiles {hidden, visible, whole + visible}; L3 wholes 9-10 with tiles {hidden, hidden ± 1, whole + visible} and the visible counters laid in two rows so the count cannot be read from length.
7. **Finish**: `t("all_done")` (360, 110); the mouse (360, 200) `ANIM.celebrate` beside a lifted cup (`ART.cup` at (440, 210) with `ANIM.cupLift` applied once); the summary = the ten completed equations as chips (`ART.eqChip`, 130 × 36) in two rows of five from y = 330, first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty` — a record, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  mouse:        { kind: "emoji", value: "🐭", size: 72 },
  wholeBar:     { kind: "shape", shape: "roundRect", w: 320, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 14 },
  wholeText:    { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  partBox:      { kind: "shape", shape: "roundRect", w: 150, h: 90, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  counter:      { kind: "shape", shape: "circle", r: 18, fill: "accent", stroke: "structure", strokeWidth: 2 },
  cup:          { kind: "shape", shape: "roundRect", w: 150, h: 90, fill: "structure", radius: 14 },       // drawn over the hidden counters; bottom edge flat: radius applies to all corners for simplicity
  cupHandle:    { kind: "shape", shape: "arc", r: 26, stroke: "structure", strokeWidth: 10 },              // a half-ring at the cup's right edge (start 270°, end 90°)
  countBadge:   { kind: "shape", shape: "circle", r: 12, fill: "structure" },      // numeral 16 px display, color bg
  countBadgeB:  { kind: "shape", shape: "circle", r: 12, fill: "surface", stroke: "accent", strokeWidth: 4 },   // numeral 16 px display, color ink; the visible-part re-count
  hiddenTag:    { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  partText:     { kind: "text",  value: "", size: 26, font: "display", color: "inkSoft" },
  eqText:       { kind: "text",  value: "", size: 30, font: "display", color: "structure" },
  overflowDot:  { kind: "shape", shape: "circle", r: 12, stroke: "accent", strokeWidth: 3 },     // hollow dots hanging off the bar's right end, pitch 28
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:       { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Counter layout inside a part box: up to 5 in one row (pitch 30, centred at box y); 6-8 in two rows (y − 16 / y + 16, first row ceil(n/2)). The cup box holds the same layout beneath the cup.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "prediction tile selected" },
  cupLift:   { y: "-=70", duration: 400, ease: "Back.Out", trigger: "cup on Check (stays lifted until the item ends)" },
  cupDrop:   { y: "+=70", duration: 300, ease: "Sine.In", trigger: "cup lowering over the next item's hidden set" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countBadge / countBadgeB in the count-out (from alpha 0, scale 0.5), 200 ms apart" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "hiddenTag, partText, eqText; new item (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "hiddenTag or partText after a wrong prediction" },
  ghostIn:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "overflow dots for an added-them prediction (from alpha 0), then fade" },
  peek:      { angle: -10, duration: 150, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "mouse when the cup lifts" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish mouse" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              ┌────────── 5 ──────────┐  wholeBar (360,96)     │
      │              │ • •  (275,190) │ ▄▄▄▄▄▄ cup (445,190) │ mouse  │  zone A
      │              └ partBox ───────┴ cup box ────────────┘ (520,150)│
      │                   "2 and 3" / "2 + 3 = 5"  (360,250)          │
260   ├──────────────────────────────────────────────────────────────┤
      │           "How many under the cup?" (360,290)                │
      │        [ 3 ]        [ 2 ]        [ 5 ]   y=380                │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
`ART.hiddenTag` appears at (445, 128) (above the cup box, under the bar's right half) once the cup has lifted. Overflow dots draw from x = 536 rightward at y = 96. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`.
- `ART.wholeBar` centred (360, 96) with `ART.wholeText` centred on it.
- `ART.partBox` at (275, 190) (visible part) and (445, 190) (hidden part, under the cup); `ART.counter`s per the layout note; `ART.cup` centred (445, 190) with `ART.cupHandle` at (520, 190); the cup is drawn above the counters (depth order) so they are invisible until it lifts.
- `ART.countBadge` / `ART.countBadgeB` at each counter (+0, −22); `ART.hiddenTag` (445, 128); `ART.partText` / `ART.eqText` at (360, 250).
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`; `ART.showRing` behind the correct tile. Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- Caption `S("underCup")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), `wordWrap` 600, two lines max.
- `ART.mouse` at (520, 150) during play. Tap floors 96 / 220 × 72 ≥ 56; gaps ≥ 24.
- During the count-out (≈ 2-2.5 s) the tiles are `setEnabled(false)` and Check is disabled; they re-enable when it ends.
- Tab order: the three tiles left to right, then OK. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (whole; visible; hidden; tiles). Tiles always include the hidden part; the correct tile's slot is shuffled per item and never repeats twice running (§13).
- **L1** (wholes 5-6; tiles = hidden, visible, whole): (5; 2; 3; 3, 2, 5) · (5; 1; 4; 4, 1, 5) · (6; 3; 3; 3, 6, 2) · (6; 4; 2; 2, 4, 6) · (5; 4; 1; 1, 4, 5) · (6; 1; 5; 5, 1, 6)
- **L2** (wholes 7-8; tiles = hidden, visible, whole + visible): (7; 3; 4; 4, 3, 10) · (8; 3; 5; 5, 3, 11) · (7; 5; 2; 2, 5, 12) · (8; 6; 2; 2, 6, 14) · (7; 2; 5; 5, 2, 9) · (8; 4; 4; 4, 8, 12) · (8; 1; 7; 7, 1, 9)
- **L3** (wholes 9-10; visible counters in two rows; tiles = hidden, hidden ± 1, whole + visible): (9; 4; 5; 5, 4, 13) · (10; 3; 7; 7, 8, 13) · (10; 6; 4; 4, 3, 16) · (9; 7; 2; 2, 3, 16) · (10; 8; 2; 2, 1, 18) · (9; 2; 7; 7, 6, 11) · (10; 5; 5; 5, 4, 15)

For (6; 3; 3) and (8; 4; 4) and (10; 5; 5) the visible-part tile would equal the hidden part, so a different distractor is listed. Play list of 10 per Rules with re-queue (mirror items: e.g. (7; 3; 4) re-queues as (7; 4; 3; 3, 4, 11)); no item repeats except by re-queue.

Worked example: item 1 (5; 2; 3) first-try · item 2 (6; 3; 3) first-try → L2 · item 3 (7; 3; 4) predicts 10 → overflow dots, then 4 (helped) · item 4 (8; 3; 5) first-try · item 5 (7; 5; 2) first-try → L3 · item 6 = re-queued mirror (7; 4; 3) first-try · items 7-10 L3 with one miss → Finish shows 10 chips, 8 with filled dots.

## Rules
- Item count: 10 (re-queued mirrors replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first prediction on 2 consecutive items → next item one level down (floor L1). A single miss re-queues its mirror (after 2 items, then a last look) without changing level.
- What happens on a correct answer: reveal with the count-on from the visible part, `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), equation shown, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Whole + visible (added the two numbers): reveal, then overflow dots hang off the bar and fade; attempt 2 with the counters visible.
  - The visible part (answered what was already seen): reveal, then the visible counters are re-badged with the ringed glyph and the part text pulses; attempt 2.
  - The whole, or hidden ± 1 (count-on error): reveal, `ART.hiddenTag` pulses; attempt 2.
  - Attempt 2 wrong: the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with everything visible → attempt 3 show-me; solved-with-help; the item's mirror re-queues later. No attempt 4.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Hidden Part Cup"; `underCup` = "How many under the cup?"; `andWord` = "and" (used in `ART.partText` as "2 and 3" — built as `v + " " + S("andWord") + " " + h`; the translation step replaces the word, the numerals stay).

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` per counter in the count-out (the visible ones first, then the hidden ones continue the pitch climb to the whole); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise; the caption and "and" once translated).
- [ ] Works at narrow width (400-px iframe: the bar, both boxes, the cup, three tiles and OK visible).
- [ ] Keyboard operable (Tab across the three tiles and OK; Enter selects / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong predictions never end the session; the show-me ring always completes the item).
- [ ] OK is dimmed until a tile is selected; the counters under the cup cannot be seen before OK.
- [ ] After OK the cup lifts, the visible counters are numbered first and the hidden ones continue the numbering up to the whole.
- [ ] Predicting 10 for whole 7 / visible 3 shows three hollow dots hanging off the bar that then fade.
- [ ] Predicting the visible part re-badges the visible counters with ringed numbers and pulses "3 and 4".
- [ ] A missed item comes back two items later with the parts swapped, and again near the end.
- [ ] At the third level the visible counters sit in two rows and the tiles include the hidden count plus or minus one.
- [ ] Two first-try corrects in a row bring bigger wholes; two misses in a row bring smaller ones.
- [ ] The finish screen lists the ten equations with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
