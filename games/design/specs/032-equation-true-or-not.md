# 032 — True or Not

## Identity
- Slug: `equation-true-or-not`
- Subject / topic: Mathematics / judging equations true or false in non-standard forms (7 = 3 + 4, 3 + 4 = 4 + 3, 3 + 4 = 7 + 1)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (a balanced-scale tile or a tipped-scale tile), then the scale enacts the truth
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1 (with the P10 reveal as the feedback shape). Sibling game: 009 (the same pan balance, there set by the child; here judged by the child).

## Learning
- Objective: Decides whether a written equation is true by judging whether its two sides have the same total, and taps the balanced-scale tile for true or the tipped-scale tile for not true, before the scale shows it.
- Prerequisites: Adds within 10 with objects; reads numerals to 20 and the symbols + − =.
- Curriculum links: F-107 (the operational "=" persists to grade 4 and predicts algebra difficulty — McNeil), F-21, F-31 row "Equals sign as balance" — conservative 7-9, earliest 6 → 6-8 (US 1.OA.D.7 "determine if equations involving addition and subtraction are true or false"; England Y1-2 "equivalence"; Germany Klasse 1-2 "Gleichungen … wahr/falsch"; France CP-CE1 "égalité"; Netherlands groep 3-4; Spain 1º ciclo "= ≠"; Brazil EF03MA11; Sweden åk 1-3 "likhetstecknets betydelse"; Norway 2. trinn "= ≠").
- Common misconceptions (F-107), each with this game's response:
  1. **Rejecting a reversed form ("7 = 3 + 4 is backwards, so it is false").** Response: the child taps the tipped tile; the reveal counts 7 weights on the left pan and 3 + 4 on the right, both totals show "7" and the beam settles level (`ANIM.level`); then the equation text flips its sides to "3 + 4 = 7" and back (`ANIM.flipSides`) — the same balance, written either way. The item re-queues later in its mirrored form (F-41).
  2. **Rejecting a both-sides form ("3 + 4 = 4 + 3 — there is no answer, so it is false").** Response: the reveal levels; then the two weight columns on the left pan swap places (`ANIM.swapColumns`) so they stand in the same order as the right pan — the same blocks, same total.
  3. **Answer-then-ignore ("3 + 4 = 7 + 1 is true because 3 + 4 = 7").** Response: the child taps the balanced tile; the reveal tips the beam to the right; the ignored "+ 1" card and its single weight gain a pulsing outline (`ART.extraGlow`, `ANIM.pulse`) — the part that was skipped is pointed at, not named.
  4. **"8 = 8 is not a sum, so it cannot be true."** Response: the reveal counts 8 and 8 and levels; L1 includes two such items so the child meets them early.
  5. **Miscounting a side (5 + 2 = 8 judged true).** Response: every number on a pan is drawn as a numeral AND that many weight blocks stacked in fives (`ART.weight`), and on the reveal each pan counts itself (`ART.countBadge` 1..n) before the totals show — the count is located, not asserted.

## How it plays
1. **Start screen**: title "True or Not", the turtle (`ART.turtle`) at (360, 200), Start, picker.
2. **Item 1 (L1: 7 = 3 + 4)**: rail of 10 dots (§6). Zone A: the equation (`ART.eqText`, 40 px) at (360, 84): "7 = 3 + 4". Below it the pan balance: `ART.post` at (360, 236), `ART.beam` (520 × 12) held level at pivot (360, 150) by `ART.latch` (a small `structure` bar across the beam at the pivot — the scale is locked until the child decides), `ART.chain`s down 70 px to `ART.pan`s at (160, 220) and (560, 220). The left pan shows `ART.numCard` "7" with 7 `ART.weight` blocks below it (a column of five and a column of two); the right pan shows `ART.numCard` "3", `ART.opText` "+", `ART.numCard` "4", with 3 and 4 weights beneath their cards. Zone B: two answer tiles (`ART.answerTile`, 120 × 96) at y = 390, x = 280 and 440 in a shuffled order: the balanced tile (`ART.iconBeam` level over `ART.iconPost`, with `ART.iconPan` at each end, and `ART.eqSign` "=" beneath) and the tipped tile (the same icon rotated 15°, `ART.neqSign` "≠" beneath). Zone C: empty until a reveal.
3. **Deciding**: the child taps a tile. Both tiles lock (`setEnabled(false)`), the tapped one keeps the selected look, `tone("tap")`.
4. **Reveal** (always, right or wrong): `ART.latch` slides away (`ANIM.unlatch`); the left pan's weights count themselves (badges 1..n, 120 ms apart, `tone("tap", k)`), then the right pan's; `ART.panTotal` appears under each pan; the beam `ANIM.level`s (equal) or `ANIM.tip`s toward the heavier side by min(30°, 4° × difference).
   - **Prediction matches**: the tapped tile `ANIM.pop`s, `tone("correct")`, praise pop; the turtle `ANIM.nod`; rail dot fills; next item after 900 ms (`ANIM.appear` on the new pans).
   - **Prediction wrong**: the tapped tile `ANIM.nudge`s and de-selects, `tone("nudge")`; the misconception cue plays on the revealed scale (Learning 1-3); then both tiles re-enable with the scale still showing its truth — attempt 2. A correct tap now completes the item as solved-with-help (`tone("correct")`, no praise pop).
   - **Attempt 2 wrong**: the matching tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Re-queue** (F-41): an item judged wrong first-try re-enters after 2 intervening items in its MIRRORED form (sides swapped: "7 = 3 + 4" returns as "3 + 4 = 7"; a both-sides form returns with the sides swapped), replacing the last unplayed item of the same level; the count stays 10.
6. **Items 2-10**: per Content/Rules. L1 one operation on one side (standard, reversed, and a = a); L2 operations on both sides (commuted pairs, shifted pairs, near-misses); L3 sums to 20 with a subtraction on one side and **three** tiles: balanced, tipped-left (left end down: the left side is heavier) and tipped-right — a false equation now needs the child to know WHICH side is heavier.
7. **Finish**: `t("all_done")` (360, 110); the turtle (360, 200) `ANIM.celebrate`; the summary = the ten equations as chips (`ART.eqChip`, 150 × 36, 16 px) in two rows of five from y = 330, each with a mini `ART.iconBeam` at its left drawn level or tipped as the scale ended, and a filled `ART.dotFull` for first-try items or a hollow `ART.dotEmpty` for helped ones; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  turtle:     { kind: "emoji", value: "🐢", size: 80 },
  eqText:     { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  post:       { kind: "shape", shape: "polygon", points: [[-30,86],[30,86],[6,-86],[-6,-86]], fill: "structure" },
  beam:       { kind: "shape", shape: "rect", w: 520, h: 12, fill: "structure" },
  latch:      { kind: "shape", shape: "roundRect", w: 24, h: 36, fill: "accent", stroke: "structure", strokeWidth: 2, radius: 6 },
  chain:      { kind: "shape", shape: "line", w: 2, stroke: "inkSoft", strokeWidth: 3 },      // from beam end down to the pan, length 70
  pan:        { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  numCard:    { kind: "shape", shape: "roundRect", w: 48, h: 48, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },  // numeral 26 px display ink
  opText:     { kind: "text",  value: "", size: 26, font: "display", color: "inkSoft" },      // "+" or "−" between cards
  weight:     { kind: "shape", shape: "rect", w: 16, h: 16, fill: "structure", stroke: "bg", strokeWidth: 1 },
  weightGone: { kind: "shape", shape: "rect", w: 16, h: 16, stroke: "inkSoft", strokeWidth: 1 },     // a subtracted weight after it lifts away
  panTotal:   { kind: "text",  value: "", size: 26, font: "display", color: "inkSoft" },
  countBadge: { kind: "shape", shape: "circle", r: 9, fill: "bg" },          // numeral 11 px structure, on each weight during the self-count
  extraGlow:  { kind: "shape", shape: "roundRect", w: 60, h: 92, stroke: "accent", strokeWidth: 3, radius: 10 },   // around a card + its weights
  answerTile: { kind: "shape", shape: "roundRect", w: 120, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconBeam:   { kind: "shape", shape: "rect", w: 56, h: 5, fill: "structure" },          // rotated 0 / −15 / +15 degrees inside a tile
  iconPost:   { kind: "shape", shape: "rect", w: 5, h: 22, fill: "structure" },
  iconPan:    { kind: "shape", shape: "circle", r: 7, stroke: "structure", strokeWidth: 2 },   // one at each beam end
  eqSign:     { kind: "text",  value: "=", size: 26, font: "display", color: "ink" },
  neqSign:    { kind: "text",  value: "≠", size: 26, font: "display", color: "ink" },
  showRing:   { kind: "shape", shape: "roundRect", w: 132, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  eqChip:     { kind: "shape", shape: "roundRect", w: 150, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  unlatch:     { y: "-=40", alpha: 0, duration: 300, ease: "Sine.In", trigger: "latch leaves the pivot when a tile is tapped" },
  level:       { angle: 0, duration: 500, ease: "Back.Out", trigger: "beam settles level when both totals are equal" },
  tip:         { duration: 500, ease: "Sine.InOut", trigger: "beam angle to ±min(30, 4 × difference) degrees; pans and chains follow (y offset = sin(angle) × 260); left heavier = negative angle" },
  flipSides:   { x: "+=400", duration: 400, ease: "Sine.InOut", yoyo: true, hold: 700, trigger: "misconception 1: the left side of eqText slides right while the right side slides left (−=400), holds, then returns" },
  swapColumns: { x: "+=26", duration: 300, ease: "Sine.InOut", trigger: "misconception 2: the two weight columns on the left pan exchange places (the other −=26)" },
  rise:        { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "a subtracted weight lifts away (L3), leaving weightGone" },
  pulse:       { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "extraGlow around the ignored card" },
  pop:         { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "matching tile" },
  nudge:       { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "non-matching tile" },
  nod:         { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "turtle on a match" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the matching tile (from alpha 0.2)" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new equation and pan contents (from alpha 0, scale 0.6)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish turtle" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    "7 = 3 + 4"  (360,84)                      │
      │              ═════════════╪═════════════ beam y=150, latch     │  zone A
      │        │                  │                  │  chains         │
      │   ┌────┴────┐          (post)          ┌────┴────┐            │
      │   │   [7]   │ pan L (160,220)          │ [3]+[4] │ pan R (560,220)│
      │   │ ▮▮▮▮▮ ▮▮│ weights                  │ ▮▮▮ ▮▮▮▮│            │
      │   └─────────┘                          └─────────┘ turtle (640,110)│
260   ├──────────────────────────────────────────────────────────────┤
      │            [ ═══  = ]          [ ═╱═  ≠ ]    tiles y=390        │  zone B
      │             x=280               x=440      (120×96)           │
      │        L3: [ = ] (240)  [ tipped-left ] (360)  [ tipped-right ] (480)│
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The beam, chains and pans are one container rotated about the pivot by `ANIM.tip` / `ANIM.level` (pans counter-rotate so they stay upright).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.eqText` at (360, 84). `ART.post` at (360, 236); `ART.beam` centred (360, 150) with `ART.latch` centred on the pivot; `ART.chain`s from (100, 150) and (620, 150) down 70 px; `ART.pan`s at (160, 220) and (560, 220). Cards (`ART.numCard`, `ART.opText`) in a row at pan y − 30 (48 px cards, 8 px gaps, centred); weights (`ART.weight`, columns of five per number, 3 px gaps, columns 22 px apart) from pan y + 8 downward, centred under each card. `ART.panTotal` at pan y + 76 (hidden until the reveal). `ART.extraGlow` around an ignored card and its weights; `ART.countBadge` on weights during the self-count; `ART.weightGone` where a subtracted weight was.
- Answer tiles: `makeTile` 120 × 96 (`ART.answerTile`) with the icon composed of `ART.iconBeam` (rotated 0°, −15° or +15°), `ART.iconPost` below its centre and `ART.iconPan` at each beam end, drawn at tile (0, −18); `ART.eqSign` or `ART.neqSign` at tile (0, +30). Two tiles at x = 280 / 440; three at x = 240 / 360 / 480; y = 390. `ART.showRing` behind the matching tile.
- `ART.turtle` at (640, 110) during play. Tab order: tiles left to right.
- Tap floors 120 × 96 ≥ 56; gaps ≥ 40 (two tiles) / 0 (three tiles at 120 px pitch — acceptable because each is a different icon and a mis-tap is simply a wrong choice that is revealed, never a hidden penalty).

## Content
Language-neutral (numerals and symbols). Items as (equation; truth; which tile matches at L3):
- **L1** (one operation on one side; standard, reversed, a = a; sums ≤ 10): 3 + 4 = 7 (true) · 7 = 3 + 4 (true) · 2 + 5 = 8 (false, right heavier) · 6 = 6 (true) · 9 = 4 + 4 (false, left heavier) · 5 + 3 = 8 (true) · 10 = 6 + 4 (true) · 4 + 2 = 7 (false, right heavier) · 8 = 8 (true) · 3 + 3 = 5 (false, left heavier)
- **L2** (operations on both sides; sums ≤ 12): 3 + 4 = 4 + 3 (true) · 5 + 2 = 2 + 5 (true) · 6 + 3 = 5 + 4 (true) · 3 + 4 = 7 + 1 (false, right heavier) · 8 + 2 = 9 + 2 (false, right heavier) · 4 + 6 = 5 + 5 (true) · 7 + 3 = 6 + 3 (false, left heavier) · 2 + 9 = 9 + 2 (true) · 5 + 5 = 4 + 5 (false, left heavier) · 6 + 4 = 10 + 0 (true)
- **L3** (sums to 20; a subtraction on one side; three tiles): 12 = 5 + 7 (true) · 9 + 6 = 8 + 8 (false, right heavier) · 14 − 4 = 6 + 4 (true) · 10 − 3 = 3 + 4 (true) · 8 + 7 = 9 + 5 (false, left heavier) · 15 = 9 + 5 (false, left heavier) · 13 + 4 = 4 + 13 (true) · 11 − 5 = 3 + 3 (true) · 7 + 9 = 8 + 9 (false, right heavier) · 20 = 12 + 8 (true)

A subtraction side (L3) is drawn as `ART.numCard` a, `ART.opText` "−", `ART.numCard` b with a weights under the first card; on the reveal the last b weights lift away (`ANIM.rise`, `tone("tap", k)` descending) leaving `ART.weightGone` outlines before the pan counts what remains.

Play list of 10 per Rules with mirrored re-queue; within a level true and false items alternate no more than two of a kind in a row; tile positions shuffled per item; the matching tile never sits in the same slot twice running.

## Rules
- Item count: 10 (re-queued mirrored items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try matches → next level (cap L3).
- Adaptation: a non-matching first tap on 2 consecutive items → next item one level down (floor L1). A single miss re-queues its mirror after 2 items without changing level.
- What happens on a correct answer: reveal (self-count, totals, beam settles), `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], turtle `ANIM.nod`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Reversed form judged tipped (7 = 3 + 4): reveal levels; `ANIM.flipSides` shows the sides exchanged and back; `tone("nudge")`; attempt 2.
  - Both-sides form judged tipped (3 + 4 = 4 + 3): reveal levels; `ANIM.swapColumns` on the left pan; attempt 2.
  - Answer-then-ignore judged balanced (3 + 4 = 7 + 1): reveal tips right; `ART.extraGlow` pulses around the "+ 1"; attempt 2.
  - a = a judged tipped: reveal counts both sides and levels; attempt 2.
  - Miscount (5 + 2 = 8 judged balanced): reveal tips; the self-count badges have already located the counts; attempt 2.
  - L3 wrong direction (tipped-left for a right-heavier scale): the beam's actual tip is the cue; the two `ART.panTotal`s pulse together (`ANIM.pulse`); attempt 2.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with the scale revealed (solved-with-help) → attempt 3 with the show-me ring. No attempt 4. The mirrored re-queue follows any first-try miss.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "True or Not". The play screen shows only numerals and the symbols + − = ≠.

## Sound
`tone("tap")` on choosing a tile; `tone("tap", k)` per weight during each pan's self-count (left pan then right); `tone("tap", k)` descending as subtracted weights lift away; `tone("correct")` on a match; `tone("nudge")` on a mismatch; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change; the play screen is symbols only).
- [ ] Works at narrow width (400-px iframe: both pans, the equation and the tiles visible; a tipped beam never leaves the stage).
- [ ] Keyboard operable (Tab across the two or three tiles; Enter chooses).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong tile never ends the session; the revealed scale plus the show-me ring always complete the item).
- [ ] The beam stays latched and level until a tile is tapped; only then do the pans count themselves and the beam move.
- [ ] For "7 = 3 + 4", tapping the tipped tile shows 7 and 7, a level beam, and the equation sliding into "3 + 4 = 7" and back.
- [ ] For "3 + 4 = 7 + 1", tapping the balanced tile tips the beam right and a coral outline pulses around the "+ 1" card and its weight.
- [ ] Every number on a pan has exactly that many weight blocks under it, stacked in fives.
- [ ] At the third level there are three tiles, a subtraction side lifts its subtracted weights away before counting, and a false equation needs the tile tipped toward the heavier side.
- [ ] An equation judged wrong at first try comes back two items later with its sides swapped.
- [ ] Two first-try matches in a row bring both-sides forms; two misses in a row bring one-sided forms.
- [ ] The finish screen shows ten equation chips with level or tipped mini scales and filled/hollow dots, no score, no time.
- [ ] With `?sound=off` nothing is audible.
