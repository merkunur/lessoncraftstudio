# 053 — Leftovers

## Identity
- Slug: `leftovers`
- Subject / topic: Mathematics / division with remainders — how many are left over when N is shared equally among K
- Age band: `8-9`
- Interaction pattern: `P10` — predict then reveal (a P1 numeral tap commits the remainder prediction; the deal enacts it and the leftovers glow)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P10. Content is language-neutral (counters, plates, numerals, the symbols ÷ × + =); no `LOCALE_DATA`.

## Learning
- Objective: Predicts how many objects will be left over when N objects are shared equally among K plates, by tapping the remainder numeral, then verifies it by watching the deal stop with the leftovers still in the bowl.
- Prerequisites: Shares a set equally among plates (games 051/052); counts to 35; reads numerals to 35; knows that a deal goes one-to-each in rounds.
- Curriculum links: F-111 ("remainders ignored" — leftovers stay visible at level 3 of the division progression; sharing before grouping), F-21, F-31 row "Division as sharing/grouping; facts" — conservative 8-9 → 8-9 (US 3.OA.A.2 / 4.OA.A.3 "interpret remainders" — the concept of a leftover is prepared at grade 3; England Y3-4 "division … with remainders"; Germany Klasse 2-3 "Division mit Rest" at 7 in Bavaria (F-34); France CE2 "division euclidienne, reste"; Netherlands groep 5 "delen met rest"; Spain 2º ciclo "división con resto"; Brazil EF04MA06 prepared by EF03MA08; Sweden åk 3 "rest"; Norway 3. trinn; Finland grade 3 "jakojäännös").
- Common misconceptions (F-111, F-101), each with this game's response:
  1. **Remainders ignored ("14 among 4 — 3 each, done").** Response: the deal stops the moment a full round cannot be completed, and the counters still in the bowl light up (`ART.leftGlow`, `ANIM.glowOn`) with a count badge on each (1, 2 …) while the bowl itself gains the remainder numeral (`ART.restTag`). A 0-prediction on a remainder item is answered by the glowing counters being counted out loud in tones — there they are.
  2. **Giving the quotient as the remainder ("3" for 14 among 4).** Response: the quotient is a tile at every level; when it is chosen, after the deal each plate's badge (`ART.plateBadge` = 3) pulses in turn and then the bowl's leftovers pulse separately — the plates hold 3 EACH; the bowl holds 2. The two numbers are enacted in two places.
  3. **Trying one more round ("a remainder of 4 for 4 plates — give each one more").** Response: when the predicted remainder is ≥ K the reveal enacts a ghost round: K ghost counters (`ART.ghostCounter`) glide from the bowl to the plates and then spring back (`ANIM.springBack`) because there are only r < K real counters to send — a leftover is always smaller than the number of plates.
  4. **Off-by-one remainders (miscounting the last round).** Response: the deal counts every counter with `tone("tap", k)` and shows the running count on each plate; the last complete round lands with the plate badges pulsing together, and then the leftovers are badged 1 … r individually. On an off-by-one prediction the leftover badges pulse and `ART.equation` builds beneath the plates ("14 = 4 × 3 + 2") so the arithmetic is visible.
  5. **Guessing fast to trigger the animation (F-45).** Response: no clock; a prediction can be changed before Check; the deal is the same warm animation either way; a missed item re-queues later as its neighbour (N + 1 with the same K) so the remainder pattern is seen to shift by one (F-41).

## How it plays
1. **Start screen**: title "Leftovers", the raccoon (`ART.raccoon`) at (360, 200), Start, picker.
2. **Item 1 (L1: 7 among 2)**: rail of 12 dots (§6); `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the bowl (`ART.bowl`, 260 × 76) centred at (360, 100) holding 7 counters (`ART.counter`, r 12) in one row at y = 100 (pitch 30, centred); the numeral "7" (`ART.bowlNumeral`) at the bowl's left rim (250, 68); the raccoon at (80, 180); 2 plates (`ART.plate`, r 48) at y = 205, x = 306 / 414, each with an empty `ART.plateBadge` slot above its rim; beneath the plates the equation line (`ART.equation`) at (360, 262), empty until the reveal. Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480 showing 1, 0, 3 shuffled (the remainder, zero, the quotient). Zone C: Check (`makeButton ok`) at (360, 510), disabled until a tile is selected. Caption `S("leftOver")` ("How many will be left over?") at (360, 296), 22 px `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Predicting**: tap a tile → `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`; tapping another switches; Check enables.
4. **Check → the deal**: tiles and Check disable; counters leave the bowl one at a time, round-robin — counter 1 to plate 1, counter 2 to plate 2, counter 3 to plate 1 … — 220 ms apart, `tone("tap", k)`; each landing updates the receiving plate's `ART.plateBadge` with `ANIM.badgeIn`. When the counters remaining in the bowl are fewer than K, the deal STOPS: the plate badges `ANIM.pulse` together, then the leftover counters gain `ART.leftGlow` rings one by one (`ANIM.glowOn`, 300 ms apart, `tone("tap", k)` continuing the pitch climb) with a small badge 1 … r on each (`ART.leftBadge`), and `ART.restTag` (the remainder numeral, 40 px) appears on the bowl's right rim at (470, 68) with `ANIM.appear`; `ART.equation` builds under the plates: "7 = 2 × 3 + 1" (numerals and symbols only, 28 px). For a remainder-0 item the bowl simply empties (`ART.bowlEmpty`) and `ART.restTag` shows "0".
   - **Prediction correct (1)**: the selected tile `ANIM.pop`s, `tone("correct")`, praise pop (next key in rotation); rail dot fills; after 900 ms the next item builds (plates clear with `ANIM.rise`, new counters `ANIM.appear`). First-try correct.
   - **Prediction = quotient (3)**: after the deal, each plate's badge pulses in turn (left to right, 200 ms apart), then the leftover rings pulse; `tone("nudge")`; tiles re-enable; attempt 2 with the dealt state visible.
   - **Prediction = 0 on a remainder item**: after the deal, the leftover counters are re-badged 1 … r with tones once more, slower (400 ms apart), and `ART.restTag` pulses; `tone("nudge")`; attempt 2.
   - **Prediction ≥ K**: after the deal, K `ART.ghostCounter`s glide from the bowl toward the plates (`ANIM.deal`) and spring back (`ANIM.springBack`) — a full round cannot be made from r counters; `tone("nudge")`; attempt 2.
   - **Prediction off by one (r ± 1)**: after the deal, the leftover badges pulse and the equation's last number pulses; `tone("nudge")`; attempt 2.
   - **Attempt 2 correct**: `tone("correct")`, `ART.restTag` pulses, rail dot; no praise pop; solved-with-help.
   - **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Re-queue** (F-41): an item missed on the first prediction re-enters after 2 intervening items as its NEIGHBOUR (N + 1, same K; if N + 1 exceeds the level's ceiling, N − 1), then, if missed again, near the end. The item count stays 12; re-queued items replace the last unplayed items of the same level.
6. **Items 2-12**: per Content/Rules. L1: K = 2-3, N ≤ 15, remainders 0-2, tiles = remainder, 0 or quotient, and one other; L2: K = 3-5, N ≤ 25, tiles = remainder, quotient, K; L3: K = 4-6, N ≤ 35 with the bowl counters in three rows, tiles = remainder, remainder ± 1, K, four tiles.
7. **Finish**: `t("all_done")` (360, 110); the raccoon (360, 200) `ANIM.celebrate` beside a bowl with two glowing counters (`ART.bowl` at (470, 210) with 2 `ART.counter`s and `ART.leftGlow`); the summary = the twelve equations as chips (`ART.eqChip`, 150 × 34, text like "14 = 4 × 3 + 2") in three rows of four from y = 320, first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 7 minutes (the deal takes up to 35 × 220 ms ≈ 8 s on the largest L3 items).

## Art registry
```js
const ART = {
  raccoon:      { kind: "emoji", value: "🦝", size: 80, fallback: "🐻" },   // Unicode 11 raccoon; bear fallback
  bowl:         { kind: "shape", shape: "roundRect", w: 260, h: 76, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 26 },
  bowlEmpty:    { kind: "shape", shape: "roundRect", w: 260, h: 76, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 26 },
  bowlNumeral:  { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  counter:      { kind: "shape", shape: "circle", r: 12, fill: "accent", stroke: "structure", strokeWidth: 2 },
  ghostCounter: { kind: "shape", shape: "circle", r: 12, stroke: "accent", strokeWidth: 3 },   // hollow: a counter that would be needed for one more round
  leftGlow:     { kind: "shape", shape: "circle", r: 19, stroke: "accent", strokeWidth: 4 },   // ring around a leftover counter in the bowl
  leftBadge:    { kind: "shape", shape: "circle", r: 9, fill: "structure" },      // 1..r on each leftover: 12 px display, color bg, at (+12, −14)
  plate:        { kind: "shape", shape: "circle", r: 48, fill: "surface", stroke: "structure", strokeWidth: 3 },
  plateBadge:   { kind: "shape", shape: "circle", r: 14, fill: "structure" },      // running count 18 px display, color bg, at the plate's (0, −58)
  restTag:      { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  equation:     { kind: "text",  value: "", size: 28, font: "display", color: "structure" },
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:       { kind: "shape", shape: "roundRect", w: 150, h: 34, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },   // text 14 px display ink
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Bowl layout: up to 12 counters in one row (pitch 20 at r 12 → 240 wide), 13-24 in two rows (y = 88 / y = 112, pitch 20), 25-35 in three rows (y = 82 / 100 / 118, pitch 20); each row centred, row 1 holds ceil(N / rows). Plate slots: up to 4 counters at (−14,−12) (14,−12) (−14,14) (14,14); 5-8 in a ring of radius 26 filled clockwise from top; 9 at the centre. Four tiles at L3 sit at x = 168 / 296 / 424 / 552 (pitch 128).

## Animation registry
```js
const ANIM = {
  lift:       { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "prediction tile selected" },
  deal:       { duration: 220, ease: "Sine.InOut", trigger: "one counter from the bowl to its plate slot (x,y at call); ghost counters toward the plates in the ≥K enact" },
  springBack: { duration: 260, ease: "Back.Out", trigger: "ghost counters returning to the bowl (x,y = bowl origin at call), then they fade" },
  badgeIn:    { scale: 1.3, duration: 120, ease: "Back.Out", yoyo: true, trigger: "a plate badge when its count changes" },
  glowOn:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "each leftGlow ring and leftBadge (from alpha 0, scale 0.6), 300 ms apart" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "restTag; equation; new counters in the bowl (from alpha 0, scale 0.6)" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  pulse:      { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "plate badges when the deal stops; leftover rings / restTag / the equation's last numeral on a wrong prediction" },
  rise:       { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "counters and badges clearing from the plates between items" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish raccoon" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │        7  ( o o o o o o o )  1   bowl (360,100); restTag (470,68)│
      │ raccoon (80,180)                                              │  zone A
      │              (  )    (  )    plates y=205, pitch 108          │
      │              "7 = 2 × 3 + 1"  equation (360,262)              │
260   ├──────────────────────────────────────────────────────────────┤
      │           "How many will be left over?" (360,296)            │
      │        [ 1 ]        [ 0 ]        [ 3 ]   y=380                │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Plates: K plates centred on x = 360 at pitch 108 (first x = 360 − (K − 1) × 54); the raccoon moves to (60, 100) when K ≥ 5. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.bowl` centred (360, 100) (→ `ART.bowlEmpty` on a remainder-0 deal); `ART.bowlNumeral` at (250, 68); `ART.restTag` at (470, 68); counters per the bowl layout; `ART.leftGlow` rings and `ART.leftBadge`s on the leftovers.
- `ART.plate`s at y = 205 with `ART.plateBadge` at (0, −58), count in `THEME.colour.bg` 18 px `THEME.font.display`; `ART.equation` at (360, 262).
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`; three tiles at x = 240 / 360 / 480, four at L3 per the layout note; `ART.showRing` behind the correct tile. Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- Caption `S("leftOver")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 296), two lines max.
- `ART.raccoon` at (80, 180) (or (60, 100) for K ≥ 5). Tap floors 96 ≥ 56; gaps ≥ 24 (32 at four tiles).
- During the deal the tiles and Check are disabled; they re-enable when the leftover badges have all appeared.
- Tab order: tiles left to right, then OK.

## Content
Language-neutral. Items as (N among K; quotient; remainder; tiles). Tiles always include the remainder; the correct tile's slot is shuffled per item and never repeats twice running (§13).
- **L1** (K = 2-3, N ≤ 15; tiles = remainder, and two of {0, quotient, 1}): (7 among 2; 3; 1; 1, 0, 3) · (8 among 3; 2; 2; 2, 0, 1) · (10 among 3; 3; 1; 1, 0, 3) · (9 among 2; 4; 1; 1, 0, 4) · (12 among 3; 4; 0; 0, 1, 4) · (11 among 2; 5; 1; 1, 0, 5) · (14 among 3; 4; 2; 2, 0, 4) · (15 among 2; 7; 1; 1, 0, 7)
- **L2** (K = 3-5, N ≤ 25; tiles = remainder, quotient, K): (14 among 4; 3; 2; 2, 3, 4) · (17 among 5; 3; 2; 2, 3, 5) · (19 among 4; 4; 3; 3, 4, 5) · (22 among 5; 4; 2; 2, 4, 5) · (20 among 3; 6; 2; 2, 6, 3) · (23 among 4; 5; 3; 3, 5, 4) · (25 among 5; 5; 0; 0, 5, 4) · (16 among 3; 5; 1; 1, 5, 3) · (21 among 4; 5; 1; 1, 5, 4)
- **L3** (K = 4-6, N ≤ 35, three-row bowl, four tiles = remainder, remainder − 1, remainder + 1, K): (27 among 6; 4; 3; 3, 2, 4, 6) · (29 among 4; 7; 1; 1, 0, 2, 4) · (33 among 5; 6; 3; 3, 2, 4, 5) · (31 among 6; 5; 1; 1, 0, 2, 6) · (35 among 4; 8; 3; 3, 2, 4, 4) · (34 among 5; 6; 4; 4, 3, 5, 6) · (30 among 6; 5; 0; 0, 1, 6, 5) · (26 among 4; 6; 2; 2, 1, 3, 4)

For (19 among 4) the tile K = 4 equals the quotient, so 5 is listed in its place; for (35 among 4) the remainder + 1 equals K, so K is shown once and the fourth tile is 2; for (30 among 6) remainder − 1 is impossible, so 6 and 5 stand in. Play list of 12 per Rules with re-queue (neighbours: e.g. (14 among 4) re-queues as (15 among 4; 3; 3)); no item repeats except by re-queue.

Worked example: item 1 (7 among 2) first-try · item 2 (12 among 3) first-try → L2 · item 3 (14 among 4) predicts 3 (the quotient) → plate badges pulse in turn, then the two leftovers; then 2 (helped) · item 4 (17 among 5) first-try · item 5 (19 among 4) first-try → L3 · item 6 = re-queued (15 among 4) first-try · items 7-12 L3 with one miss → Finish shows 12 chips, 10 with filled dots.

## Rules
- Item count: 12 (re-queued neighbours replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first prediction on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the neighbour item without changing level.
- What happens on a correct answer: the deal runs round-robin with rising tones, stops short of an incomplete round, the leftovers glow and are badged, the equation builds, `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - The quotient (per-plate count given as the remainder): deal, then plate badges pulse in turn, then the leftover rings pulse; `tone("nudge")`; attempt 2 with the dealt state visible.
  - Zero on a remainder item (remainder ignored): deal, then the leftovers are re-badged 1 … r slowly with tones and `ART.restTag` pulses; attempt 2.
  - A number ≥ K (one more round wanted): deal, then K ghost counters set off for the plates and spring back into the bowl; attempt 2.
  - r ± 1 (miscounted the last round): deal, then the leftover badges and the equation's last numeral pulse; attempt 2.
  - Attempt 2 wrong: the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with the dealt plates and glowing leftovers visible → attempt 3 show-me; solved-with-help; the neighbour item re-queues later. No attempt 4.
- Finish condition: 12 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Leftovers"; `leftOver` = "How many will be left over?". The equation and chips are numerals and the symbols = × + only.

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` on the k-th counter dealt AND continuing on each leftover as it is badged (the pitch climb reaches N at the last leftover, so the whole set is heard); `tone("correct")`, `tone("nudge")`, `tone("finish")` once. Silent under `?sound=off`; no audio files.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 12", All done, Play again, Menu, praise change; the caption once translated; the equation is symbols).
- [ ] Works at narrow width (400-px iframe: the bowl with up to 35 counters, six plates, four tiles and OK visible and separate).
- [ ] Keyboard operable (Tab across the tiles and OK; Enter selects / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong predictions never end the session; the show-me ring always completes the item).
- [ ] OK is dimmed until a tile is selected; no counter leaves the bowl before OK.
- [ ] For 7 among 2 the deal places three counters on each plate and stops with one counter glowing in the bowl, badged "1", and the line "7 = 2 × 3 + 1" appears.
- [ ] For 12 among 3 the bowl empties completely and the tag shows 0.
- [ ] Predicting the quotient makes each plate's badge pulse in turn before the leftovers pulse.
- [ ] Predicting 4 for 14 among 4 sends four hollow counters toward the plates that spring back into the bowl.
- [ ] A missed item comes back two items later with one more counter and the same plates, and again near the end.
- [ ] At the third level the bowl shows three rows and there are four tiles.
- [ ] The finish screen lists twelve equations with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible; with sound on, the deal plays one rising note per counter including the leftovers.
