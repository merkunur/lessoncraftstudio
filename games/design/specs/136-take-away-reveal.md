# 136 — Take-Away Reveal

## Identity
- Slug: `take-away-reveal`
- Subject / topic: Mathematics / subtraction within 20 crossing ten (take away to ten, then take the rest)
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (a P1 numeral tap commits the prediction; the double ten-frame enacts the take-away in two steps)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P10. Content is language-neutral (counters, frames, numerals); no `LOCALE_DATA`. Nothing is spoken.

## Learning
- Objective: Predicts the result of a subtraction such as 14 − 6 by tapping a numeral, then watches the double ten-frame take away in two steps — down to ten first, then the rest — and reads the result off the frame.
- Prerequisites: Bonds to 10 (games 004, 021-023); subtraction within 10 with objects; reads numerals to 20; knows a full ten-frame is 10 (games 003, 135).
- Curriculum links: F-1 (subtraction within 20 in 12 of 15 sources), F-21 ("+/− facts to 20" in all twelve systems), F-31 row "+/− facts to 20" — conservative 7-8 → 6-8 (US 1.OA.C.6 "decomposing a number leading to a ten (13 − 4 = 13 − 3 − 1 = 10 − 1 = 9)"; England Y1-2 "subtraction facts within 20"; Germany Klasse 1 "Zehnerübergang bei der Subtraktion"; France CP "soustraction avec passage de la dizaine"; Netherlands groep 3-4 "aftrekken over het tiental"; Spain 1º ciclo; Brazil EF01MA08; Sweden åk 1-3 "subtraktion med tiotalsövergång"; Finland grades 1-2 "vähennyslasku, kymmenylitys").
- Common misconceptions (F-106, F-105), each with this game's response:
  1. **Counting back off by one (14 − 6: "14, 13, 12, 11, 10, 9" — six words, lands on 9).** Response: the answer − 1 and answer + 1 are always tiles; on an off-by-one prediction the reveal plays, and then the FIRST step replays on its own: the four counters that left frame B lift again and drop out one by one with badges 13, 12, 11, 10 (`ART.stepBadge`), the readout `ART.readout` holds at "10" and pulses, and the step label `ART.stepLabel` "− 4" sits beside it — the step to ten is the place a count-back goes wrong, so it is the place the hint looks.
  2. **Smaller-from-larger (14 − 6 → "4 − 6 can't, so 6 − 4 = 2 … 12").** Response: 12 (the bug's result) is a tile at every level where it differs from the other tiles; on that prediction the reveal shows that after the ones are gone (step one, to 10) the take-away CONTINUES into the full ten — two counters leave frame A (`ANIM.leave`) with badges 9, 8 — and `ART.tenBreak` (a dashed outline around the two gaps in frame A) marks where the ten was broken into. The frame refuses to stop at 12; nothing is said.
  3. **Take-away seen as one undifferentiated count (no structure — the child counts every counter back, loses place).** Response: the reveal is always TWO visible steps with a pause between them: step one removes exactly the counters outside the full ten (frame B empties, the readout shows 10), step two removes the rest from frame A; `ART.stepLabel`s "− 4" and "− 2" appear beside the readout and the equation line `ART.eqText` builds "14 − 4 = 10, 10 − 2 = 8" beneath. The structure is shown on every reveal, right or wrong (F-43).
  4. **Adding instead (14 + 6 = 20) or answering the subtrahend (6).** Response: at L3 the sum or the subtrahend replaces the bug tile where the bug result coincides with another tile; the reveal answers both — counters only ever leave.
  5. **Reading the frame result as "the counters that left" instead of "the counters that stay".** Response: after the reveal the remaining counters `ANIM.pop` together and the readout shows their count; the counters that left are drawn faded outside the frames in a "gone" tray (`ART.goneTray`) so both quantities are visible and distinct.

## How it plays
1. **Start screen**: title "Take-Away Reveal", the otter (`ART.otter`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 14 − 6)**: rail of 10 dots (§6) with `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the double ten-frame — frame A centred (200, 130) and frame B centred (440, 130), each 2 rows × 5 cells of `ART.cell` (36 × 36, pitch 40; 200 × 80 per frame) with a 3 px `THEME.colour.structure` border; 14 `ART.counter`s fill frame A completely and frame B's top row with 4 (standard order). Under the frames the readout `ART.readout` "14" (48 px) at (320, 205) and the problem `ART.problem` "14 − 6 = ?" (36 px) at (320, 245); the "?" is `ART.qBox`. The otter at (60, 200); the gone tray `ART.goneTray` (a 120 × 150 recessed well) at (620, 150), empty. Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480: 8, 9, 12 shuffled (the answer, answer + 1, the smaller-from-larger result). Zone C: Check (`makeButton ok`) at (360, 510), disabled until a tile is selected. No caption (the problem line is the prompt).
3. **Predicting**: tap a tile → it selects (`api.setSelected`, `ANIM.lift`, `tone("tap")`); tapping another switches; Check enables. The frames do not change while predicting (F-40).
4. **Check → Reveal** (the same two steps whatever the prediction):
   - **Step one (to ten)**: the counters in frame B leave one by one from the right (`ANIM.leave` — each glides into the gone tray and fades to alpha 0.45), each departure badged on the readout: `ART.readout` counts 13, 12, 11, 10 (`tone("tap", k)` descending), `ART.stepLabel` "− 4" appears at (420, 205) with `ANIM.appear`; pause 500 ms with the readout at "10" and `ART.tenPulse` (frame A's border) pulsing once — the ten is reached.
   - **Step two (the rest)**: the remaining 2 to take leave frame A from its bottom-right (`ANIM.leave`), the readout counts 9, 8; `ART.stepLabel` "− 2" appears under "− 4"; `ART.eqText` "14 − 4 = 10, 10 − 2 = 8" appears at (320, 275); the 8 counters still in frame A `ANIM.pop` together and `ART.qBox` fills with "8".
   - **Prediction correct (8)**: the selected tile `ANIM.pop`s, `tone("correct")`, praise pop (rotation); the otter `ANIM.clap`; the rail dot fills; after 900 ms the next item builds (`ANIM.appear`; the gone tray empties). First-try correct.
   - **Prediction answer ± 1 (9 or 7)**: `tone("nudge")` after the reveal; step one replays alone: the four gone counters lift back into frame B and leave again with `ART.stepBadge`s 13, 12, 11, 10 on each departing counter, the readout pulses at "10" (`ANIM.pulse`); then the tiles re-enable and the child taps again with the result frame in view (attempt 2).
   - **Prediction = the smaller-from-larger result (12)**: after the reveal, `ART.tenBreak` draws around the two emptied cells in frame A (`ANIM.ghostIn`) and step two replays alone (the two counters lift back and leave again with badges 9, 8); `tone("nudge")`; attempt 2.
   - **Prediction = the sum or the subtrahend**: after the reveal the readout and the remaining counters pulse; `tone("nudge")`; attempt 2.
   - **Attempt 2 correct**: `tone("correct")`, rail dot, no praise pop; solved-with-help (the result was visible).
   - **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Re-queue** (F-41): an item wrong on the first prediction re-enters the play list after 2 intervening items with the same minuend and a subtrahend one different (14 − 6 → 14 − 5), then, if wrong again, near the end ("last look"). The item count stays 10; re-queued items replace the last unplayed items of the same level.
6. **Items 2-10**: per Content/Rules. L1 minuends 11-14, subtrahends 3-6; L2 minuends 15-18, subtrahends 6-9; L3 minuends 11-13 with subtrahends 7-9 (a long second step) plus items that land exactly on ten (13 − 3: step two is empty and `ART.stepLabel` shows "− 0").
7. **Finish**: `t("all_done")` (360, 110); the otter (360, 200) `ANIM.celebrate`; the summary = the ten completed subtractions as chips (`ART.eqChip`, 130 × 36, label "14 − 6 = 8" 16 px) in two rows of five from y = 340, first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty` — a record, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes (10 items × 30-40 s; the reveal takes ≈ 3 s).

## Art registry
```js
const ART = {
  otter:       { kind: "emoji", value: "🦦", size: 72, fallback: "🐻" },   // Unicode 12 otter; fallback bear (Unicode 6) for older devices
  cell:        { kind: "shape", shape: "roundRect", w: 36, h: 36, fill: "surface", stroke: "line", strokeWidth: 2, radius: 6 },
  counter:     { kind: "shape", shape: "circle", r: 14, fill: "structure" },
  tenPulse:    { kind: "shape", shape: "rect", w: 208, h: 88, stroke: "structure", strokeWidth: 4 },            // frame A's border copy, pulsed when ten is reached
  tenBreak:    { kind: "shape", shape: "roundRect", w: 84, h: 44, stroke: "accent", strokeWidth: 3, radius: 8 },   // dashed (lineDash [6,5]) around the cells emptied in frame A
  goneTray:    { kind: "shape", shape: "roundRect", w: 120, h: 150, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },   // holds the removed counters at alpha 0.45, 5 per row, pitch 22
  readout:     { kind: "text",  value: "", size: 48, font: "display", color: "structure" },
  stepLabel:   { kind: "text",  value: "", size: 26, font: "display", color: "inkSoft" },
  stepBadge:   { kind: "shape", shape: "circle", r: 11, fill: "bg" },                                             // numeral 12 px display structure, on a departing counter during a replay
  problem:     { kind: "text",  value: "", size: 36, font: "display", color: "ink" },
  qBox:        { kind: "shape", shape: "roundRect", w: 44, h: 44, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 8 },   // dashed while empty; holds the result 28 px inkOnAccent
  eqText:      { kind: "text",  value: "", size: 22, font: "body", color: "inkSoft" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px display ink
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:      { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Counters that stay (solid, in the frame) and counters that left (faded, in the gone tray) differ by place AND opacity, never by colour alone. The frames fill in the standard order (F-48/F-50) and empty in the reverse order.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "prediction tile selected" },
  leave:     { duration: 320, ease: "Sine.In", trigger: "a counter glides from its cell to its slot in the gone tray and fades to alpha 0.45 (x, y set at call); 300 ms apart" },
  returnIn:  { duration: 260, ease: "Sine.Out", trigger: "a gone counter glides back to its cell at alpha 1 before a step replays (x, y set at call)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "step labels, equation text, new item (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile; the remaining counters at the end of the reveal" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "readout at 10 after an off-by-one; readout and remaining counters after a sum/subtrahend prediction" },
  tenReach:  { alpha: 1, scale: 1.04, duration: 250, ease: "Sine.InOut", yoyo: true, trigger: "tenPulse border when the readout reaches 10 (from alpha 0)" },
  ghostIn:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "tenBreak outline after a smaller-from-larger prediction (from alpha 0), then fades" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "step badges on departing counters during a replay (from alpha 0, scale 0.5)" },
  clap:      { scaleX: 0.85, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "otter on a correct prediction" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish otter" }
};
```
No flashing: `showMe` cycles at 1 Hz; pulses are ≤ 3 cycles; the reveal is one-shot.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │      ┌●─●─●─●─●┐     ┌●─●─●─●─○┐        ┌────────┐            │
      │      │●│●│●│●│●│     │○│○│○│○│○│        │ gone   │ (620,150)  │  zone A
      │      └─────────┘     └─────────┘        │ tray   │            │
      │   frame A (200,130)  frame B (440,130)  └────────┘            │
      │  otter     14  (320,205)   − 4 (420,205)                      │
      │  (60,200)  14 − 6 = ▢ (320,245)   "14 − 4 = 10, 10 − 2 = 8" (320,275)│
260   ├──────────────────────────────────────────────────────────────┤
      │        [ 9 ]        [ 8 ]        [ 12 ]   y=380 (96×96)      │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: `●` = a counter, `○` = an empty cell. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- Frame A cells at x = 120 + c × 40 (c = 0..4), y = 110 / 150; frame B cells at x = 360 + c × 40, same rows; each frame's border a 3 px `THEME.colour.structure` rectangle 204 × 84; `ART.counter` centred in a filled cell; `ART.tenPulse` over frame A's border; `ART.tenBreak` around the emptied frame A cells (the two rightmost of the bottom row for a step of 2; sized 44 × 44 per cell, merged as one box for adjacent cells).
- `ART.goneTray` at (620, 150) with the removed counters at alpha 0.45 in rows of 5 (pitch 22) from its top-left (+14, +18).
- `ART.readout` at (320, 205); `ART.stepLabel`s at (420, 205) and (420, 235); `ART.problem` at (320, 245) with `ART.qBox` in place of the "?"; `ART.eqText` at (320, 275), `wordWrap` 420, one line.
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`; `ART.showRing` behind the correct tile. Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- `ART.otter` at (60, 200). Tap floors 96 / 220 × 72 ≥ 56; gaps ≥ 24.
- During the reveal and any replay (≈ 3-4 s) the tiles are `setEnabled(false)` and Check is disabled; they re-enable when it ends. Tab order: the three tiles left to right, then OK. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (minuend − subtrahend = answer; tiles). Tiles always hold the answer; the second tile is answer + 1 (the count-back slip) or answer − 1 where noted; the third is the smaller-from-larger result (10 + (subtrahend − ones)) unless it collides with another tile, in which case the sum is used. The correct tile's slot is shuffled and never repeats twice running (§13).
- **L1** (minuends 11-14): (14 − 6 = 8; 8, 9, 12) · (12 − 5 = 7; 7, 8, 13) · (13 − 4 = 9; 9, 10, 11) · (11 − 3 = 8; 8, 9, 12) · (12 − 4 = 8; 8, 9, 12) · (13 − 6 = 7; 7, 8, 13)
- **L2** (minuends 15-18): (15 − 7 = 8; 8, 9, 12) · (16 − 9 = 7; 7, 8, 13) · (17 − 8 = 9; 9, 10, 11) · (18 − 9 = 9; 9, 8, 10) · (15 − 8 = 7; 7, 6, 13) · (16 − 7 = 9; 9, 10, 11) · (17 − 9 = 8; 8, 9, 12)
- **L3** (long second steps; exact-ten items): (11 − 8 = 3; 3, 4, 17) · (12 − 7 = 5; 5, 6, 15) · (13 − 9 = 4; 4, 5, 16) · (13 − 3 = 10; 10, 9, 16) · (11 − 9 = 2; 2, 3, 18) · (12 − 8 = 4; 4, 5, 16) · (14 − 4 = 10; 10, 11, 18)

Play list of 10 per Rules with re-queue (How it plays §5: 14 − 6 re-queues as 14 − 5 with tiles 9, 10, 11); no item repeats except by re-queue; two consecutive items never share a minuend.

Worked example: item 1 (14 − 6) predicts 8 → reveal 13 … 10, pause, 9, 8 · item 2 (12 − 5) predicts 7 → L2 · item 3 (15 − 7) predicts 9 → reveal, then step one replays with badges 14 … 10 and the readout pulses at 10; taps 8 (helped) → L1 · item 4 (13 − 4) predicts 9 · item 5 (11 − 3) predicts 8 → L2 · item 6 = re-queued (15 − 6) predicts 9 first try · items 7-10 at L2-L3 with (13 − 3) landing on ten → Finish shows ten chips, 8 with filled dots.

## Rules
- Item count: 10 (re-queued items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first prediction on 2 consecutive items → next item one level down (floor L1). A single miss re-queues a neighbour item (after 2 items, then a last look) without changing level.
- What happens on a correct answer: the two-step reveal with the readout counting down, `ANIM.pop` on the tile and the remaining counters, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), the equation line completes, otter `ANIM.clap`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Answer ± 1 (count-back slip): reveal, then step one replays alone with a badge on each departing counter and the readout pulsing at 10; attempt 2.
  - The smaller-from-larger result (12 for 14 − 6): reveal, then the dashed outline around the cells emptied in frame A and step two replays alone; attempt 2.
  - The sum or the subtrahend: reveal, the readout and the remaining counters pulse; attempt 2.
  - Attempt 2 wrong: the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with the result frame in view after the replay → attempt 3 show-me; solved-with-help; a neighbour item re-queues later. No attempt 4.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Take-Away Reveal". The play screen shows only numerals, symbols and frames; the equation line is built from numerals and "−", "=", ",".

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` per departing counter with k DESCENDING (14 → 8 mapped to steps 7 … 1, so the pitch falls as counters leave — F-213); `tone("tap", 4)` held once when the readout reaches 10; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise change; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: both frames, the gone tray, the readout, three tiles and OK visible).
- [ ] Keyboard operable (Tab across the three tiles and OK; Enter selects / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong predictions never end the session; the show-me ring always completes the item).
- [ ] OK is dimmed until a tile is selected; no counter moves before OK.
- [ ] After OK for 14 − 6, four counters leave the second frame one by one while the readout counts 13, 12, 11, 10 and "− 4" appears; after a pause two counters leave the first frame with 9, 8 and "− 2".
- [ ] The removed counters sit faded in the tray on the right; the remaining eight stay solid in the frame.
- [ ] Predicting 9 for 14 − 6 replays the first step with numbered badges and pulses the readout at 10.
- [ ] Predicting 12 for 14 − 6 draws a dashed coral box around the two emptied cells of the first frame and replays the second step.
- [ ] For 13 − 3 the readout stops at 10 and the second step shows "− 0" with no counter leaving the first frame.
- [ ] A missed item comes back two items later with the subtrahend one different.
- [ ] Two first-try corrects in a row bring bigger minuends; two misses in a row bring smaller ones.
- [ ] The finish screen lists ten subtractions with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
