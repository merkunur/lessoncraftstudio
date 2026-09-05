# 025 — Doubles Mirror

## Identity
- Slug: `doubles-mirror`
- Subject / topic: Mathematics / doubles from 1 + 1 to 10 + 10 as a known fact, verified on a mirrored dot set
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (a P1 numeral tap commits the prediction; the mirror reveals the reflection)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P10. Content is language-neutral (dots and numerals); no `LOCALE_DATA`.

## Learning
- Objective: Sees n dots (1-10) on one side of a mirror line, predicts the double 2n by tapping a numeral before the reflection appears, then watches the reflection appear and the total count up from n to 2n.
- Prerequisites: Counts to 20; reads numerals to 20; adds within 10 with objects.
- Curriculum links: F-1 (addition within 20 in 14 of 15 sources), F-105 ("introduce doubles/make-ten anchors" as the strategies that replace counting), F-21, F-31 row "+/− facts to 20" — conservative 7-8, earliest 6 → 6-8 (US 1.OA.C.6 "using … doubles"; England Y1-2 "doubles and halves"; Germany Klasse 1 "Verdoppeln und Halbieren"; France CP "doubles et moitiés"; Netherlands groep 3 "verdubbelen"; Spain 1º ciclo "el doble"; Brazil EF02MA05 "dobro"; Sweden åk 1 "dubbelt och hälften"; Finland grade 1-2 "kaksinkertainen").
- Common misconceptions (F-105, F-101), each with this game's response:
  1. **Adding one instead of doubling ("double 6 is 7" — the child adds a unit).** Response: n + 1 is a distractor tile from L1; on that prediction the reveal counts the reflection one dot at a time from n + 1 to 2n (`ART.countBadge`, `tone("tap", k)`), so the child sees that the reflection holds n more, not one more; the count strip (`ART.countStrip`) shows the running total ending on 2n with the "+ n" step label (`ART.stepLabel`).
  2. **Counting all from 1 after the reveal.** Response: the counter starts AT n (`ART.totalText` shows "6" before the reflection appears, with `ART.knownTag` "6" already on the left set) and counts on 7, 8 … 12 as each reflected dot appears; counting from 1 is never modelled.
  3. **Off-by-one totals from a mis-count (double 7 = 13 or 15).** Response: 2n − 1 and 2n + 1 are distractors at L2-L3; the reveal's running total lands exactly on 2n with the last reflected dot `ANIM.pulse`-ing; the left set and the reflection are drawn in the SAME ten-frame-style two-row layout so their equality is visible (F-105: regular layouts).
  4. **Not linking the double to its addition sentence (knows "double 4" but not 4 + 4).** Response: after the reveal the addition sentence appears under the mirror (`ART.eqText` "4 + 4 = 8") while the total "8" stands on `ART.totalText`, so the double and its sum sentence are on screen together; the finish chips record "4 + 4 = 8". No multiplication form is shown (that is 8-9 content).
  5. **Guessing to see the reflection (F-45).** Response: no clock; a prediction can be changed before Check; the reveal is identical in warmth whether right or wrong; a miss re-queues the same n later (F-41).

## How it plays
1. **Start screen**: title "Doubles Mirror", the swan (`ART.swan`) at (360, 200), Start, picker.
2. **Item 1 (L1: n = 3)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48). Zone A: a pond — the mirror line (`ART.mirrorLine`, a vertical `structure` bar) at x = 360 from y = 70 to y = 250; on its LEFT, the known set: 3 dots (`ART.dot`, r 16) in the two-row frame layout (Content) centred at (250, 160) inside `ART.setFrame`; on its RIGHT, an identical frame outline (`ART.setFrame` at (470, 160)) covered by `ART.water` (a translucent `structureSoft` rectangle at alpha 0.9 — the "surface" that hides the reflection); the swan floats at (250, 90) above the known set, and `ART.knownTag` "3" sits at (250, 236) under it. `ART.totalText` at (360, 262) shows "3" (the running total starts at n). Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480: 6, 4, 5 shuffled (2n, n + 1, 2n − 1). Zone C: Check (`makeButton ok`) at (360, 510), disabled until a tile is selected. Caption `S("doubleIt")` ("Double it") at (360, 300), 24 px `THEME.colour.inkSoft`.
3. **Predicting**: tap a tile → it selects (`api.setSelected`, `ANIM.lift`, `tone("tap")`); tapping another switches; Check enables.
4. **Check → Reveal**: `ART.water` fades (`ANIM.waterClear`, 400 ms) and the reflection dots appear one at a time in mirrored positions (`ANIM.reflectIn`, 300 ms apart), each with `ART.countBadge` n + 1, n + 2 … and `tone("tap", k)`; `ART.totalText` counts up in step (4, 5, 6); the last reflected dot `ANIM.pulse`s; `ART.stepLabel` "+ 3" shows beside the total; the swan's reflection (`ART.swanMirror`, the swan drawn flipped horizontally at (470, 90)) appears with `ANIM.appear`.
   - **Prediction correct**: the selected tile `ANIM.pop`s, `tone("correct")`, praise pop; `ART.eqText` "3 + 3 = 6" appears at (360, 300) replacing the caption for 900 ms; rail dot fills; next item builds (water covers the right frame again with `ANIM.waterCover`). First-try correct.
   - **Prediction n + 1 (added one)**: after the reveal, the reflection's badges re-light in turn once more and the step label "+ 3" `ANIM.pulse`s; `tone("nudge")`; the tiles stay enabled — attempt 2 with the reflection visible.
   - **Prediction 2n ± 1 or other**: after the reveal, the last badge and the total pulse; `tone("nudge")`; attempt 2.
   - **Attempt 2 correct**: `tone("correct")`, equation shows, rail dot; no praise pop; solved-with-help.
   - **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Re-queue** (F-41): an item missed on the first prediction re-enters after 2 intervening items (fresh distractor slots), then near the end if missed again; count stays 10.
6. **Items 2-10**: per Content/Rules. L1 n = 1-5; L2 n = 5-8 (totals cross 10, two-row layout matters); L3 n = 8-10 plus items where the known set is on the RIGHT of the mirror (the reflection appears on the left) so the child does not rely on side.
7. **Finish**: `t("all_done")` (360, 110); the swan (300, 200) and its reflection (420, 200) `ANIM.celebrate` together on either side of a short `ART.mirrorLine`; the summary = the ten doubles as chips (`ART.eqChip`, 130 × 36, "3 + 3 = 6") in two rows of five from y = 330, first-try chips with `ART.dotFull` at their left, helped ones with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  swan:        { kind: "emoji", value: "🦢", size: 64, fallback: "🦆" },   // Unicode 10 swan; duck fallback for very old devices
  swanMirror:  { kind: "emoji", value: "🦢", size: 64, fallback: "🦆" },   // drawn with scaleX −1 and alpha 0.7 as the reflection
  mirrorLine:  { kind: "shape", shape: "rect", w: 6, h: 180, fill: "structure" },
  setFrame:    { kind: "shape", shape: "roundRect", w: 180, h: 84, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // holds up to 10 dots in two rows of five
  water:       { kind: "shape", shape: "roundRect", w: 184, h: 88, fill: "structureSoft", radius: 12 },   // alpha 0.9 over the reflection frame
  dot:         { kind: "shape", shape: "circle", r: 16, fill: "structure" },
  dotMirror:   { kind: "shape", shape: "circle", r: 16, fill: "surface", stroke: "structure", strokeWidth: 5 },   // the reflection's dots: hollow, so left and right differ by glyph
  knownTag:    { kind: "text",  value: "", size: 30, font: "display", color: "structure" },
  countBadge:  { kind: "shape", shape: "circle", r: 12, fill: "accent" },     // numeral 15 px display, color inkOnAccent
  totalText:   { kind: "text",  value: "", size: 48, font: "display", color: "structure" },
  stepLabel:   { kind: "text",  value: "", size: 20, font: "body", color: "inkSoft" },
  eqText:      { kind: "text",  value: "", size: 30, font: "display", color: "structure" },
  countStrip:  { kind: "shape", shape: "roundRect", w: 140, h: 44, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 10 },   // behind totalText
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:      { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Dot layout inside a set frame (frame centre (cx, cy)): two rows of five slots, row 1 at cy − 20, row 2 at cy + 20, slots at cx − 68 + i × 34 (i = 0…4); the known set fills row 1 left → right then row 2 (ten-frame order, F-48). The reflection fills the mirrored slots: slot i on the left maps to slot 4 − i on the right, in the same row, so the two sets are true mirror images.

## Animation registry
```js
const ANIM = {
  lift:       { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "prediction tile selected" },
  waterClear: { alpha: 0, duration: 400, ease: "Sine.In", trigger: "water over the reflection frame on Check" },
  waterCover: { alpha: 0.9, duration: 300, ease: "Sine.Out", trigger: "water returning for the next item" },
  reflectIn:  { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "each reflection dot (from alpha 0, scale 0.4), 300 ms apart, in the known set's fill order" },
  badgeIn:    { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countBadge with its dot (from alpha 0, scale 0.5)" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "swan reflection, eqText, new item (from alpha 0, scale 0.6)" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  pulse:      { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "last reflected dot; stepLabel (n + 1 error); totalText (other errors)" },
  glideSwan:  { y: "-=6", duration: 700, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "swan bobbing once when the reflection completes (not while the child thinks)" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish swan and reflection" }
};
```
No idle motion: the swan is still until the reveal completes (F-42).

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │        swan (250,90)        │        (swan reflection)       │
      │   ┌───────────────┐         │         ┌───────────────┐      │  zone A
      │   │ • • •         │ (250,160)│(470,160)│ ~~ water ~~    │      │
      │   │               │         │         │   (reflection) │      │
      │   └───────────────┘         │         └───────────────┘      │
      │        "3" knownTag (250,236)   mirrorLine x=360             │
      │                    [ 3 ] totalText (360,262)  "+ 3"          │
260   ├──────────────────────────────────────────────────────────────┤
      │                     "Double it" (360,300)                    │
      │        [ 4 ]        [ 6 ]        [ 5 ]   y=380                │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
At L3 "known on the right" items, the known set frame is at (470, 160) and the water covers (250, 160); `ART.knownTag` follows the known set. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`.
- `ART.mirrorLine` centred (360, 160); `ART.setFrame` at (250, 160) and (470, 160); `ART.dot`s in the known frame per the layout note; `ART.dotMirror`s in the reflection frame (hidden beneath `ART.water` until Check); `ART.swan` at (250, 90) (or (470, 90) for known-right items), `ART.swanMirror` at the mirrored x with scaleX −1, alpha 0.7, shown after the reveal.
- `ART.knownTag` under the known frame at (knownX, 236); `ART.countStrip` behind `ART.totalText` at (360, 262); `ART.stepLabel` at (440, 262); `ART.countBadge` at each reflected dot (+0, −22), numeral in `THEME.colour.inkOnAccent`.
- Caption `S("doubleIt")` at (360, 300), 24 px `THEME.font.body` `THEME.colour.inkSoft`; `ART.eqText` replaces it at (360, 300) after a correct reveal.
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px; `ART.showRing` behind the correct tile. Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- During the reveal (≈ n × 0.3 + 0.6 s, at most 3.6 s) tiles and Check are `setEnabled(false)`; they re-enable when it ends.
- Tap floors 96 / 220 × 72 ≥ 56; gaps 24. Tab order: three tiles, then OK. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (n; side; tiles), tiles shuffled; the correct slot never repeats twice running (§13).
- **L1** (n = 1-5, known on the left; tiles = 2n, n + 1, 2n − 1 — for n = 1: 2, 3, 4): (3; L; 6, 4, 5) · (2; L; 4, 3, 5) · (4; L; 8, 5, 7) · (1; L; 2, 3, 4) · (5; L; 10, 6, 9) · (4; L; 8, 5, 9)
- **L2** (n = 5-8, known on the left; tiles = 2n, 2n − 1, 2n + 1 with one n + 1 item): (6; L; 12, 11, 13) · (7; L; 14, 13, 15) · (5; L; 10, 9, 11) · (8; L; 16, 15, 17) · (6; L; 12, 7, 13) · (7; L; 14, 8, 15)
- **L3** (n = 8-10, known on the RIGHT for half the items; tiles = 2n, 2n − 1, 2n + 1 or n + 1): (9; L; 18, 17, 19) · (10; R; 20, 19, 18) · (8; R; 16, 9, 17) · (9; R; 18, 10, 19) · (10; L; 20, 11, 19) · (8; L; 16, 15, 17)

Play list of 10 per Rules with re-queue (How it plays §5); no item repeats except by re-queue.

Worked example: (3) first-try · (2) first-try → L2 · (6) predicts 7 → reveal, "+ 6" pulses, taps 12 (helped) · (7) first-try · (5) first-try → L3 · re-queued (6) first-try · (10; R) first-try · (8; R) predicts 15 → total pulses, taps 16 (helped) · (9; R) first-try · last look (8; R) first-try → Finish: 10 chips, 8 with filled dots.

## Rules
- Item count: 10 (re-queued repeats replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first prediction on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the item (after 2 items, then a last look) without changing level.
- What happens on a correct answer: reveal with the count-on from n, `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), `ART.eqText` "n + n = 2n", rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - n + 1 (added one instead of doubling): reveal; the reflection badges re-light once more and the "+ n" step label pulses; `tone("nudge")`; attempt 2 with the reflection visible.
  - 2n ± 1 (mis-count): reveal; the last reflected dot and the total pulse; `tone("nudge")`; attempt 2.
  - Attempt 2 wrong: the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with the reflection visible → attempt 3 show-me; solved-with-help; the item re-queues later. No attempt 4.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Doubles Mirror"; `doubleIt` = "Double it".

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` per reflected dot with k running from n + 1 to 2n (the pitch continues the known set's count); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise; "Double it" once translated).
- [ ] Works at narrow width (400-px iframe: both frames, the mirror line, the total strip, three tiles and OK visible).
- [ ] Keyboard operable (Tab across the three tiles and OK; Enter selects / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong predictions never end the session; the show-me ring always completes the item).
- [ ] OK is dimmed until a tile is selected; the reflection is hidden under the water until OK.
- [ ] After OK the water clears and the reflection dots appear one by one as mirror images with badges continuing from n + 1; the total counts up to 2n.
- [ ] The reflection's dots are hollow ringed and the known dots solid, so the two sets differ by more than side.
- [ ] Predicting 7 for 6 dots pulses the "+ 6" label after the reveal; predicting 13 pulses the total.
- [ ] A missed item comes back two items later and again near the end.
- [ ] At the third level some items show the known dots on the right and reveal the reflection on the left.
- [ ] Two first-try corrects in a row bring bigger sets; two misses in a row bring smaller ones.
- [ ] The finish screen lists the ten doubles with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible.
