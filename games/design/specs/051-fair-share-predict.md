# 051 — Fair Share

## Identity
- Slug: `fair-share-predict`
- Subject / topic: Mathematics / division as equal sharing (share N objects among K plates — how many on each?)
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (a P1 numeral tap commits the prediction; the deal enacts it)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P10. Content is language-neutral (objects, plates and numerals); no `LOCALE_DATA`.

## Learning
- Objective: Predicts how many objects each of K plates will get when N objects are shared equally, by tapping the numeral, then watches the one-by-one deal confirm it.
- Prerequisites: Counts to 24; recognises numerals to 12; has made equal groups with objects (game 047 territory). No division symbol is shown or needed.
- Curriculum links: F-111 (sharing is the first division model — share-among-N at 5-8 before how-many-groups at 8-9), F-21 (division as sharing/grouping AS A CONCEPT by 8-9 in all twelve systems), F-31 row "Division as sharing/grouping; facts" — conservative 8-9, earliest 6; this game takes the SHARING concept only, with no symbol and no facts, which places its lower edge at 6-8 (US 3.OA.A.2 concept, prepared by 2.OA.C.4 equal groups; England Y1-2 "share … equally"; Germany Klasse 2 "Aufteilen/Verteilen"; France CE1 "partager équitablement"; Netherlands groep 4 "eerlijk verdelen"; Spain 1º ciclo "reparto"; Brazil EF02MA08; Sweden åk 1-3 "delning"; Norway 2. trinn "dele likt"; Finland grade 2 "jakaminen").
- Common misconceptions (F-111, F-101), each with this game's response:
  1. **Giving the divisor as the answer ("3 plates, so 3 each").** Response: K is always one of the three tiles. When the child predicts K, the deal runs and each plate ends with the true count (`ART.plateBadge`); then the prediction is tested against the bowl: K × K cherries are outlined on the plates (`ART.ghostCherry`) and the surplus cherries that would be needed — or the ones that would be left in the bowl — glow for 900 ms. The child sees that "3 each" does not use up 12.
  2. **Unequal sharing tolerated (predicting a number that does not divide evenly, e.g. 5 for 12 among 3).** Response: the deal always proceeds round-robin, one cherry to each plate in turn, so every plate visibly gets the same. After the deal, a 5-prediction is enacted: five ghost outlines per plate appear and the 3 missing cherries hang hollow beside the empty bowl (`ART.ghostCherry` with `ANIM.ghostIn`) — a fair share of 5 each needs 15, and there were 12.
  3. **Predicting the whole (12) or the number on one plate after an unfinished deal (off-by-one).** Response: the deal counts every cherry with `tone("tap", k)` and shows a running count on each plate; the last round lands with the plate badges pulsing together (`ANIM.pulse`), and the bowl empties visibly (`ART.bowlEmpty`). A 12-prediction leaves nothing to enact but the empty bowl beside three plates of 4: the numeral 4 (`ART.eachTag`) appears over the plates.
  4. **Counting the cherries again from one after each round (count-all).** Response: each plate carries its own running count badge that grows by one per round, so the child watches 1, 2, 3, 4 build on every plate at once instead of recounting a heap.
  5. **Guessing fast to trigger the animation (F-45).** Response: no clock; a prediction can be changed before Check; the deal is the same warm animation whether the prediction was right or wrong; a wrong item re-queues later (F-41) with the same N and K but the plates in a different order.

## How it plays
1. **Start screen**: title "Fair Share", the bear (`ART.bear`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 6 cherries among 2 plates)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the bowl (`ART.bowl`, 220 × 70) centred at (360, 100) holding 6 cherries (`ART.cherry`, 36 px) in a row at y = 92 (pitch 30, centred); the bear at (80, 180) beside the table; the plates — 2 × `ART.plate` (96 × 96) at y = 205, x = 306 and 414 (pitch 108, centred per §7.1) — each with an empty `ART.plateBadge` slot above its rim. Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 380, x = 240 / 360 / 480 showing 3, 2, 6 shuffled (the answer, the divisor, the whole). Zone C: Check (`makeButton ok`) at (360, 510), disabled until a tile is selected. Caption `S("eachPlate")` ("How many on each plate?") at (360, 290), 24 px `THEME.colour.inkSoft`, `wordWrap` 600.
3. **Predicting**: tap a tile → `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`; tapping another switches; Check enables.
4. **Check → the deal**: the tiles and Check disable; cherries leave the bowl one at a time, round-robin — cherry 1 glides (`ANIM.deal`) to plate 1, cherry 2 to plate 2, cherry 3 back to plate 1 … — 260 ms apart, `tone("tap", k)` on the k-th cherry; on each landing the receiving plate's `ART.plateBadge` shows its running count (1, then 2, then 3) with `ANIM.badgeIn`. Cherries settle on a plate in a small cluster (positions in Visual specification). When the bowl is empty it swaps to `ART.bowlEmpty`; the plate badges `ANIM.pulse` together and `ART.eachTag` ("3", 40 px) appears at (360, 150) with `ANIM.appear`.
   - **Prediction correct (3)**: the selected tile `ANIM.pop`s, `tone("correct")`, praise pop (`GameCore.showPraise`, next key in rotation); `ART.eachTag` stays; rail dot fills; after 900 ms the next item builds (plates clear with `ANIM.rise`, new cherries `ANIM.appear` in the bowl). First-try correct.
   - **Prediction = divisor (2)**: after the deal, each plate shows 2 outlined cherries (`ART.ghostCherry`) over its first 2 cherries and the plate's third cherry glows `ART.glowRing` for 900 ms — "2 each would leave these"; the extra cherries then `ANIM.ghostIn` fade; `tone("nudge")`. All tiles re-enable; attempt 2 with the deal visible.
   - **Prediction too big (6 — the whole, or answer + 1)**: after the deal, ghost outlines fill each plate up to the predicted number (6 hollow outlines per plate in a second row) and the hollow ones that no cherry fills — 3 per plate — pulse once and fade; `tone("nudge")`; attempt 2.
   - **Prediction too small (answer − 1)**: after the deal, the last round's cherries (one per plate) glow `ART.glowRing`: they exist, so the share is one more than predicted; `tone("nudge")`; attempt 2.
   - **Attempt 2 correct**: `tone("correct")`, `ART.eachTag` pulses, rail dot; no praise pop; solved-with-help.
   - **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Re-queue** (F-41): an item wrong on the first prediction re-enters the play list after 2 intervening items with the same N and K (tile order reshuffled), then, if wrong again, near the end. The item count stays 10; re-queued items replace the last unplayed items of the same level.
6. **Items 2-10**: per Content/Rules. L1 shares 4-12 among 2-3 plates; L2 shares 8-20 among 2-5 plates; L3 shares 12-24 among 3-6 plates with the cherries in the bowl laid in two rows so the count cannot be read from length, and the distractor set includes answer ± 1.
7. **Finish**: `t("all_done")` (360, 110); the bear (360, 200) `ANIM.celebrate` beside a heaped plate (`ART.plate` at (450, 210) with three `ART.cherry` on it); the summary = the ten completed shares as chips (`ART.shareChip`, 120 × 36, text "12 → 4, 4, 4" built as N + " → " + the per-plate count repeated K times joined by ", " — numerals and symbols only) in two rows of five from y = 330, first-try items with `ART.dotFull` at their left and helped items with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6 minutes (the deal takes 1.5-6 s per item).

## Art registry
```js
const ART = {
  bear:        { kind: "emoji", value: "🐻", size: 80 },
  cherry:      { kind: "emoji", value: "🍒", size: 36 },
  bowl:        { kind: "shape", shape: "roundRect", w: 220, h: 70, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 24 },
  bowlEmpty:   { kind: "shape", shape: "roundRect", w: 220, h: 70, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 24 },
  plate:       { kind: "shape", shape: "circle", r: 48, fill: "surface", stroke: "structure", strokeWidth: 3 },
  plateBadge:  { kind: "shape", shape: "circle", r: 14, fill: "structure" },      // running count on it: 18 px display, color bg; sits at the plate's (0, −58)
  eachTag:     { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  ghostCherry: { kind: "shape", shape: "circle", r: 14, stroke: "accent", strokeWidth: 3 },   // hollow outline standing for a predicted-but-absent cherry
  glowRing:    { kind: "shape", shape: "circle", r: 20, stroke: "accent", strokeWidth: 4 },   // drawn around a real cherry the prediction ignored
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  shareChip:   { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },   // chip text 14 px display ink
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Cherry positions on a plate (relative to the plate centre): up to 4 → (−14,−12) (14,−12) (−14,14) (14,14); 5-8 → a 3 × 3 ring minus the centre, pitch 22, filled clockwise from top-left; ghost outlines use the same slots and continue into a second ring of radius 34 when the predicted number exceeds 8. In the bowl: one row of up to 12 at pitch 30 (y = 92); 13-24 in two rows at y = 82 and y = 106, pitch 26, row 1 holds ceil(N/2).

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "prediction tile selected" },
  deal:      { duration: 260, ease: "Sine.InOut", trigger: "one cherry from the bowl to its plate slot (x,y set at call), the next cherry starts 260 ms later" },
  badgeIn:   { scale: 1.3, duration: 120, ease: "Back.Out", yoyo: true, trigger: "a plate badge when its count changes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "eachTag; new cherries in the bowl (from alpha 0, scale 0.6)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "all plate badges when the bowl empties; eachTag on attempt-2 correct" },
  ghostIn:   { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 900, trigger: "ghost outlines and glow rings for a wrong prediction (from alpha 0), then fade" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "cherries and badges clearing from the plates between items" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish bear" }
};
```
No flashing: `showMe` cycles at 1 Hz; the deal never moves more than one cherry at a time.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              ( o o o o o o )  ART.bowl (360,100)              │
      │  bear (80,180)      "3" eachTag (360,150) after the deal       │  zone A
      │              (  )    (  )    plates y=205, pitch 108          │
      │             badge above each plate at y=147                   │
260   ├──────────────────────────────────────────────────────────────┤
      │            "How many on each plate?" (360,290)               │
      │        [ 3 ]        [ 2 ]        [ 6 ]   y=380                │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Plates: K plates centred on x = 360 at pitch 108 (first x = 360 − (K − 1) × 54); 6 plates span x = 90..630 and the bear moves to (60, 100) when K ≥ 5 so nothing overlaps. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.bowl` centred (360, 100), swapped for `ART.bowlEmpty` when the last cherry leaves; `ART.cherry`s inside per the layout note; the cherries are plain draws (not tiles — nothing in zone A is tappable).
- `ART.plate`s at y = 205; `ART.plateBadge` at each plate's (0, −58) with the running count in `THEME.colour.bg` 18 px `THEME.font.display`; `ART.eachTag` at (360, 150).
- `ART.ghostCherry` outlines in the plate slots; `ART.glowRing` around real cherries; both drawn above the cherries.
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), numeral 44 px `THEME.font.display` `THEME.colour.ink`; `ART.showRing` behind the correct tile. Check `makeButton` `ok` at (360, 510), alpha 0.5 while disabled.
- Caption `S("eachPlate")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), two lines max.
- `ART.bear` at (80, 180) (or (60, 100) for K ≥ 5). Tap floors 96 / 220 × 72 ≥ 56; gaps ≥ 24.
- During the deal (up to 24 × 260 ms ≈ 6 s) tiles and Check are disabled; they re-enable when the deal ends.
- Tab order: the three tiles left to right, then OK.

## Content
Language-neutral. Items as (N among K; answer; tiles). Tiles always include the answer; the correct tile's slot is shuffled per item and never repeats twice running (§13).
- **L1** (2-3 plates, N ≤ 12; tiles = answer, K, N): (6 among 2; 3; 3, 2, 6) · (8 among 2; 4; 4, 2, 8) · (9 among 3; 3; 3, 9, 4) · (10 among 2; 5; 5, 2, 10) · (12 among 3; 4; 4, 3, 12) · (6 among 3; 2; 2, 3, 6) · (4 among 2; 2; 2, 4, 3)
- **L2** (2-5 plates, N ≤ 20; tiles = answer, K, answer + 1): (12 among 4; 3; 3, 4, 2) · (15 among 3; 5; 5, 3, 6) · (16 among 4; 4; 4, 3, 5) · (20 among 5; 4; 4, 5, 3) · (14 among 2; 7; 7, 2, 8) · (18 among 3; 6; 6, 3, 7) · (10 among 5; 2; 2, 5, 3) · (20 among 4; 5; 5, 4, 6)
- **L3** (3-6 plates, N ≤ 24, bowl in two rows; tiles = answer, answer − 1, answer + 1, with K replacing one of them when K ≠ answer ± 1 on every other item): (18 among 6; 3; 3, 2, 4) · (24 among 4; 6; 6, 5, 4) · (21 among 3; 7; 7, 6, 3) · (24 among 6; 4; 4, 3, 6) · (20 among 4; 5; 5, 4, 6) · (15 among 5; 3; 3, 5, 4) · (24 among 3; 8; 8, 7, 3) · (12 among 6; 2; 2, 3, 6)

For (9 among 3) and (6 among 3) the divisor equals or neighbours the answer, so the third tile is listed explicitly. Play list of 10 per Rules with re-queue; no item repeats except by re-queue.

Worked example: item 1 (6 among 2) first-try · item 2 (12 among 3) first-try → L2 · item 3 (12 among 4) predicts 4 (the divisor) → ghost outlines, then 3 (helped) · item 4 (15 among 3) first-try · item 5 (16 among 4) first-try → L3 · item 6 = re-queued (12 among 4) first-try · items 7-10 L3 with one miss → Finish shows 10 chips, 8 with filled dots.

## Rules
- Item count: 10 (re-queued items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first prediction on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the item (after 2 items, then a last look) without changing level.
- What happens on a correct answer: the deal runs round-robin with rising tones and plate badges, `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), `ART.eachTag` shown, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - The divisor K (divisor-as-answer): deal, then K ghost outlines per plate and the plate's remaining cherries glow; `tone("nudge")`; attempt 2 with the plates visible.
  - The whole N or answer + 1 (too many): deal, then ghost outlines up to the predicted number per plate with the unfilled ones pulsing and fading; attempt 2.
  - Answer − 1 (too few / stopped a round early): deal, then the last round's cherries glow; attempt 2.
  - Attempt 2 wrong: the show-me ring on the correct tile; solved-with-help.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with the dealt plates visible → attempt 3 show-me; solved-with-help; the item re-queues later. No attempt 4.
- Finish condition: 10 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, read via `S(key)`): `title` = "Fair Share"; `eachPlate` = "How many on each plate?". The chips and tags are numerals and the arrow symbol only.

## Sound
`tone("tap")` on selecting a tile; `tone("tap", k)` on the k-th cherry dealt (the pitch climbs through the whole deal, so a child hears 12 notes for 12 cherries); `tone("correct")`, `tone("nudge")`, `tone("finish")` once. Silent under `?sound=off`; no audio files; nothing is carried by sound that the plate badges do not also show.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 3 of 10", All done, Play again, Menu, praise change with the picker; the caption once translated).
- [ ] Works at narrow width (400-px iframe: the bowl, up to six plates, three tiles and OK visible; no plate overlaps the bear).
- [ ] Keyboard operable (Tab across the three tiles and OK; Enter selects / checks; cherries and plates are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (wrong predictions never end the session; the show-me ring always completes the item).
- [ ] OK is dimmed until a tile is selected; nothing moves out of the bowl before OK.
- [ ] After OK the cherries leave one at a time, plate 1, plate 2, plate 3, plate 1 … and each plate's badge counts up as it receives.
- [ ] Predicting 4 for 12 among 4 shows four outlined cherries on each plate with the unfilled outline pulsing, then the outlines fade.
- [ ] Predicting 2 for 12 among 4 makes the last-dealt cherry on each plate glow.
- [ ] A missed item comes back two items later and again near the end.
- [ ] At the third level the bowl shows cherries in two rows and the tiles are the answer, one less and one more.
- [ ] Two first-try corrects in a row bring more plates or more cherries; two misses in a row bring fewer.
- [ ] The finish screen lists ten chips like "12 → 4, 4, 4" with a filled dot for first-try ones and a hollow dot for helped ones; no score, no time.
- [ ] With `?sound=off` nothing is audible; with sound on, the deal plays one rising note per cherry.
