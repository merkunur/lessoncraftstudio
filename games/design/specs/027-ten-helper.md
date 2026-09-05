# 027 — Ten Helper

## Identity
- Slug: `ten-helper`
- Subject / topic: Mathematics / the make-ten strategy for addition crossing ten: split the second addend so the first part fills the ten-frame (8 + 5 = 8 + 2 + 3 = 10 + 3)
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (the split card whose first part fills the frame)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P1. Content is language-neutral (numerals, symbols, counters); no `LOCALE_DATA`.

## Learning
- Objective: For a + b with a in 6-9 and a + b in 11-18, chooses the split of b whose first part is exactly 10 − a, and watches that part fill the ten-frame so the sum reads as 10 + the rest.
- Prerequisites: Knows the bonds to 10 (games 004, 023); reads a ten-frame at a glance (game 003); reads numerals to 20.
- Curriculum links: F-1 (addition within 20 in 14 of 15 sources), F-105 ("introduce doubles/make-ten anchors"), F-104 (each bond in all forms on one ten-frame), F-50 (ten-frames are an evidence-backed representation), F-21, F-31 row "+/− facts to 20" — conservative 7-8, earliest 6 → 6-8 (US 1.OA.C.6 "making ten (e.g., 8 + 6 = 8 + 2 + 4 = 10 + 4 = 14)"; England Y1-2 "add … using known facts, bridging ten"; Germany Klasse 1 "Zehnerübergang — Schrittweise rechnen"; France CP "passage de la dizaine"; Netherlands groep 3 "optellen over het tiental (rijgen)"; Spain 1º ciclo; Brazil EF01MA06; Sweden åk 1 "tiotalsövergång"; Finland grade 1-2 "kymmenylitys").
- Common misconceptions (F-105, F-104, F-101), each with this game's response:
  1. **Splitting the second addend at random ("5 is 1 and 4") without reference to the ten.** Response: a wrong card is ENACTED, not marked: its first part's counters glide into the frame; for 1 + 4 with 8 in the frame one cell stays empty and pulses as `ART.gapCell` ("not full yet"); the counters return and the child chooses again. The frame decides, not a verdict.
  2. **Over-filling (choosing 4 + 1 for 8 + 5: the first part is bigger than the gap).** Response: four counters set off toward the frame; two land in the two empty cells and the other two find no cell — they hover at the frame's edge as `ART.spill` (drawn outside the frame, alpha 0.7) and bounce back with `ANIM.spillBack`; the frame shows full with two outside — "too many for the gap".
  3. **Not seeing 8 + 2 + 3 as the same sum as 8 + 5 (the rewritten expression looks like a different problem).** Response: after the correct card the equation rewrites in three visible stages on one line (`ART.eqText` "8 + 5" → "8 + 2 + 3" → "10 + 3" → "13"), each stage arriving with `ANIM.rewrite` while the counters stay where they are — the same counters, regrouped.
  4. **Counting all the counters from 1 after the frame fills.** Response: when the frame fills, `ART.tenTag` "10" appears ON the frame as a single label with `ANIM.pop` (the ten is read, not counted), and the leftover counters get `ART.countBadge` 11, 12, 13 one at a time — counting on from ten.
  5. **Treating the first addend as the one to split (splitting the 8).** Response: the frame already holds the first addend as fixed counters (`ART.counterFixed`, drawn with a square glyph); only the loose counters (`ART.counterLoose`, round) move; at L3 items are written with the loose part FIRST ("5 + 8": the 8 is still in the frame) and the equation swaps (`ANIM.swap`) to "8 + 5" before the cards enable — the frame's number is the one to fill to ten.

## How it plays
1. **Start screen**: title "Ten Helper", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1: 9 + 4)**: rail of 12 dots (§6); `t("question_x_of_y")` at (360, 48). Zone A: the equation (`ART.eqText`, 40 px) "9 + 4 = ?" at (360, 84). Below it, the ten-frame (`ART.frameCell` 2 × 5, cells 56 × 56, pitch 60) centred at (260, 175): row 1 cells x = 140 … 380 at y = 145, row 2 at y = 205; nine cells hold `ART.counterFixed` (top row left → right, then bottom row — F-48). To the right, the loose counters: 4 × `ART.counterLoose` at (520, 175) in one row (pitch 40; two rows of ≤ 5 at y = 155 / 195 when b > 5) inside `ART.looseTray`. The owl sits at (60, 175). Zone B: three split cards (`ART.card`, 180 × 72) at y = 380, x = 170 / 360 / 550: "1 + 3", "2 + 2", "3 + 1" shuffled (24 px). Zone C: praise pops. Caption `S("fillTen")` ("Fill the ten") at (360, 296), 24 px `THEME.colour.inkSoft`.
3. **Choosing**: the child taps a card.
   - **Correct ("1 + 3")**: `ANIM.pop`, `tone("correct")`; the card glides (`ANIM.glide`) to sit under the equation as `ART.cardLocked` at (360, 122); the first part's counter (1) glides (`ANIM.glide`, 120 ms apart for each counter) from the tray into the empty frame cell; the frame becomes full → `ART.tenTag` "10" `ANIM.pop`s over the frame's centre and `tone("tap", 10)`; the remaining loose counters (3) get `ART.countBadge` 11, 12, 13 in turn (300 ms apart, `tone("tap", k)`); the equation rewrites: "9 + 1 + 3" → "10 + 3" → "13" (`ANIM.rewrite` per stage, 600 ms apart); praise pop (rotation); the owl `ANIM.blink` (scaleY squash); rail dot fills; after 900 ms the next item builds (`ANIM.appear`). First-try correct.
   - **Wrong — first part too small ("2 + 2" here is too big; in 9 + 4 the too-small case does not exist, see Content; example 8 + 5 with "1 + 4")**: `ANIM.nudge`, `tone("nudge")`, the card de-selects; the first part's counters glide into the frame; the still-empty cell(s) `ANIM.pulse` as `ART.gapCell` (900 ms); the counters glide back to the tray; the equation stays "8 + 5 = ?". Attempt 2.
   - **Wrong — first part too big ("2 + 2" for 9 + 4)**: nudge + tone; the two counters set off; one fills the cell, the other stops outside the frame's right edge as `ART.spill` and `ANIM.spillBack`s to the tray after 600 ms, the first following it; the frame reads full-with-one-outside for that moment. Attempt 2.
   - **Second wrong**: the enactment again, then the correct card gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it plays the correct sequence as solved-with-help (no praise pop).
4. **Items 2-12**: per Content/Rules. L1 first addend 9 (gap 1), L2 first addend 8 (gap 2), L3 first addends 7 and 6 (gaps 3-4) with the loose part written first in half the items (swap shown).
5. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate` on a full mini ten-frame (`ART.miniFrame` at (360, 260) holding ten `ART.miniDot`s in a 5 × 2 grid, pitch 20 × 20); the summary = the twelve sums as chips (`ART.eqChip`, 150 × 36, "8 + 5 = 13") in three rows of four from y = 320 (pitch 165 × 44), first-try chips with `ART.dotFull` at their left, helped ones with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes (12 items, one tap each plus a 3-4 s enactment).

## Art registry
```js
const ART = {
  owl:          { kind: "emoji", value: "🦉", size: 64 },
  eqText:       { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  frameCell:    { kind: "shape", shape: "rect", w: 56, h: 56, fill: "surface", stroke: "structure", strokeWidth: 3 },
  counterFixed: { kind: "shape", shape: "circle", r: 20, fill: "structure" },        // the first addend, already in the frame; carries fixedMark
  fixedMark:    { kind: "shape", shape: "rect", w: 10, h: 10, fill: "bg" },            // square glyph on a fixed counter
  counterLoose: { kind: "shape", shape: "circle", r: 20, fill: "accent", stroke: "structure", strokeWidth: 2 },   // the second addend; round, no glyph
  looseTray:    { kind: "shape", shape: "roundRect", w: 220, h: 100, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  gapCell:      { kind: "shape", shape: "rect", w: 56, h: 56, stroke: "accent", strokeWidth: 4 },   // over an empty cell during the too-small hint
  spill:        { kind: "shape", shape: "circle", r: 20, fill: "accent" },              // a counter with nowhere to go, alpha 0.7, just outside the frame's right edge
  tenTag:       { kind: "text",  value: "10", size: 44, font: "display", color: "bg" },   // on tenBadge over the full frame
  tenBadge:     { kind: "shape", shape: "roundRect", w: 84, h: 56, fill: "structure", radius: 12 },
  countBadge:   { kind: "shape", shape: "circle", r: 13, fill: "structure" },           // numeral 15 px display, color bg; on each leftover counter
  card:         { kind: "shape", shape: "roundRect", w: 180, h: 72, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // label 24 px display ink
  cardLocked:   { kind: "shape", shape: "roundRect", w: 140, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },
  showRing:     { kind: "shape", shape: "roundRect", w: 192, h: 84, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniFrame:    { kind: "shape", shape: "rect", w: 100, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // finish: ten small filled cells drawn as a 5 × 2 grid of miniDot
  miniDot:      { kind: "shape", shape: "circle", r: 6, fill: "structure" },
  eqChip:       { kind: "shape", shape: "roundRect", w: 150, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Loose counter positions in the tray (centre (520, 175)): b ≤ 5 → one row at y = 175, x = 520 − (b − 1) × 20 + i × 40; b = 6-9 → row 1 holds 5 at y = 155, row 2 the rest at y = 195, each row centred by the same formula.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct card; tenTag arriving" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong card" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "a counter from the tray to a frame cell and back; the chosen card to its locked place (x,y set at call)" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "gapCell on a too-small split" },
  spillBack: { x: "+=0", duration: 320, ease: "Back.In", trigger: "a spilled counter returning to its tray position (x,y set at call), after a 600 ms hold outside the frame" },
  badgeIn:   { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "each countBadge on a leftover counter (from alpha 0, scale 0.5), 300 ms apart" },
  rewrite:   { alpha: 1, y: 84, duration: 250, ease: "Sine.Out", trigger: "each new stage of eqText arriving from y = 72, alpha 0 (the old stage fades in a parallel 150 ms tween)" },
  swap:      { x: "+=90", duration: 300, ease: "Sine.InOut", trigger: "L3: the two addends in eqText exchange places (the other moves −=90)" },
  blink:     { scaleY: 0.85, duration: 100, ease: "Sine.InOut", yoyo: true, trigger: "owl on a correct answer" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new item's frame, tray and cards (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct card (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]       ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    "8 + 5 = ?"  eqText (360,84)               │
      │                    [ 2 + 3 ] cardLocked (360,122) after choice│  zone A
      │  owl   ┌──┬──┬──┬──┬──┐        ┌ looseTray (520,175) ┐        │
      │ (60,175)│■ │■ │■ │■ │■ │ y=145  │  ● ● ● ● ●          │        │
      │        ├──┼──┼──┼──┼──┤        └────────────────────┘        │
      │        │■ │■ │■ │  │  │ y=205   cells x=140..380, pitch 60    │
      │        └──┴──┴──┴──┴──┘  frame (260,175)                      │
260   ├──────────────────────────────────────────────────────────────┤
      │                    "Fill the ten" (360,296)                  │
      │   [ 2 + 3 ]        [ 1 + 4 ]        [ 4 + 1 ]   cards y=380   │  zone B
      │    x=170            x=360            x=550     (180×72)      │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop centred)                         │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
`ART.tenBadge` + `ART.tenTag` appear centred on the frame at (260, 175) when it fills; `ART.spill` counters hover at x = 410, y = 175 (pitch 44 for a second one). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`.
- `ART.eqText` (360, 84); `ART.cardLocked` (360, 122) with the chosen split in 22 px `THEME.colour.ink`, visible only after the correct card.
- Ten-frame: 10 × `ART.frameCell` at x = 140 + i × 60 (i = 0…4), y = 145 (row 1) and 205 (row 2); `ART.counterFixed` + `ART.fixedMark` in the first a cells (top row left → right, then bottom row); the cells are not tappable.
- `ART.looseTray` centred (520, 175) with `ART.counterLoose`s per the layout note; `ART.gapCell` over empty cells during a too-small hint; `ART.spill` outside the frame's right edge; `ART.tenBadge` + `ART.tenTag` at (260, 175) once full; `ART.countBadge` at each leftover counter (+0, −24).
- Cards: `makeTile` 180 × 72 (`ART.card`), label 24 px `THEME.font.display` `THEME.colour.ink` (numerals only); `ART.showRing` behind the correct card.
- Caption `S("fillTen")` at (360, 296), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600.
- `ART.owl` at (60, 175) during play. During any enactment (≈ 1.5-4 s) the cards are `setEnabled(false)`; they re-enable when it ends (after a wrong card) or the next item builds.
- Tap floors: cards 180 × 72 ≥ 56; card gaps 10 (pitch 190) — acceptable at the 6-8 floor. Tab order: cards left to right. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items as (a + b; cards) where the correct card is (10 − a) + (b − (10 − a)) and the two distractors are other splits of b with both parts ≥ 1 — one with a smaller first part and one with a larger, where both exist. Card slots shuffled; the correct slot never repeats twice running (§13).
- **L1** (a = 9, gap 1; a too-small split does not exist, so both distractors over-fill): (9 + 4; 1 + 3, 2 + 2, 3 + 1) · (9 + 5; 1 + 4, 2 + 3, 3 + 2) · (9 + 6; 1 + 5, 2 + 4, 4 + 2) · (9 + 7; 1 + 6, 3 + 4, 2 + 5) · (9 + 8; 1 + 7, 2 + 6, 4 + 4) · (9 + 9; 1 + 8, 4 + 5, 2 + 7)
- **L2** (a = 8, gap 2; one under-fill and one over-fill distractor): (8 + 5; 2 + 3, 1 + 4, 4 + 1) · (8 + 4; 2 + 2, 1 + 3, 3 + 1) · (8 + 6; 2 + 4, 1 + 5, 3 + 3) · (8 + 7; 2 + 5, 1 + 6, 4 + 3) · (8 + 8; 2 + 6, 1 + 7, 3 + 5) · (8 + 9; 2 + 7, 1 + 8, 4 + 5)
- **L3** (a = 7 or 6, gaps 3-4; the loose part written FIRST in the marked items — the equation swaps before the cards enable): (7 + 5; 3 + 2, 2 + 3, 4 + 1) · (5 + 7 swap; 3 + 2, 1 + 4, 4 + 1) · (7 + 6; 3 + 3, 2 + 4, 4 + 2) · (6 + 5; 4 + 1, 3 + 2, 2 + 3) · (8 + 6 swap written 6 + 8; 2 + 4, 1 + 5, 3 + 3) · (7 + 8; 3 + 5, 2 + 6, 5 + 3) · (6 + 7; 4 + 3, 3 + 4, 5 + 2) · (9 + 7 swap written 7 + 9; 1 + 6, 2 + 5, 3 + 4)

Play list of 12 per Rules; no item repeats within a session; a level's pool is reshuffled if exhausted.

Worked example: (9 + 4) first-try · (9 + 5) first-try → L2 · (8 + 5) taps "1 + 4" → one cell pulses, counter returns → taps "2 + 3" (helped) → L1 · (9 + 6) first-try · (9 + 7) first-try → L2 · (8 + 4) · (8 + 6) first-try → L3 · (5 + 7) swaps to "7 + 5", first-try · (7 + 6) taps "4 + 2" → one counter spills → "3 + 3" (helped) → L2 · (8 + 7) · (8 + 8) · (8 + 9) → Finish: 12 chips, 10 with filled dots.

## Rules
- Item count: 12.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: any wrong card on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the card locks under the equation, the first part's counters fill the frame, `ART.tenTag` pops with `tone("tap", 10)`, the leftovers are badged 11 … sum, the equation rewrites in three stages, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], owl `ANIM.blink`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - First part too small (a random split that leaves a gap): nudge + `tone("nudge")`; the counters enter, the empty cell(s) pulse, the counters return; attempt 2.
  - First part too big (over-fills the gap): nudge + tone; the gap fills and the surplus hovers outside the frame, then everything returns; attempt 2.
  - Splitting the framed number (L3 swap items — tapping a card whose first part would fit the SMALLER addend's gap): handled by the same two enactments, because the frame holds the larger addend and the card is judged against its gap.
- Retry behaviour: attempt 1 unaided → attempt 2 after the enactment → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Ten Helper"; `fillTen` = "Fill the ten".

## Sound
`tone("tap")` on a card tap; `tone("tap", k)` as each counter lands in a cell (k = a + 1 … 10, the pitch climbs to ten); `tone("tap", 10)` with the ten tag; `tone("tap", k)` on each leftover badge (11 … sum); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings and "Fill the ten" change; cards are numerals).
- [ ] Works at narrow width (400-px iframe: the frame, the tray, the owl and three cards fully visible).
- [ ] Keyboard operable (Tab cycles the three cards; Enter picks; the frame and counters are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (wrong cards never end the session; the show-me ring always completes the item).
- [ ] The first addend's counters sit in the frame with a square mark; the second addend's are round in the tray.
- [ ] Tapping "2 + 3" for 8 + 5 moves two counters into the empty cells, shows a "10" badge on the frame, numbers the other three 11, 12, 13 and rewrites the sum as "8 + 2 + 3", "10 + 3", "13".
- [ ] Tapping "1 + 4" for 8 + 5 moves one counter in, pulses the last empty cell, and returns the counter.
- [ ] Tapping "4 + 1" for 8 + 5 fills the frame and leaves two counters hovering outside it before they return.
- [ ] At the third level "5 + 7" visibly swaps to "7 + 5" and the 7 is the number in the frame.
- [ ] Two first-try corrects in a row bring wider gaps to fill; a wrong card brings a smaller gap next.
- [ ] The finish screen lists the twelve sums with a filled dot for first-try ones and a hollow dot for helped ones; no score.
- [ ] With `?sound=off` nothing is audible; with sound on, the counters entering the frame climb in pitch to the ten.
