# 040 — Fives Hands

## Identity
- Slug: `fives-hands`
- Subject / topic: Mathematics / counting in 5s by groups of five fingers (5, 10, 15 … 50)
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (each hand once), with a P1 numeral choice to state the total
- Estimated build size: ~430 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (tap each GROUP for skip counting). Sibling games: 039 (counting in 2s by pairs — the same shape, different unit), 001 (counting by ones).

## Learning
- Objective: Counts groups of five by tapping each raised hand exactly once, reading the running total on each hand, and taps the numeral that says how many fingers there are in all.
- Prerequisites: Knows a hand has five fingers; counts to 50 by ones; recognises two-digit numerals.
- Curriculum links: F-21 (skip counting / number sequences), F-31 row "Skip counting 2/5/10" — conservative 7-8, earliest 6 → 6-8 (US 2.NBT.A.2 "skip-count by 5s"; England Y1 "count in multiples of … fives"; Germany Klasse 1-2 "in Fünferschritten zählen"; France CP-CE1 "compter de 5 en 5"; Netherlands groep 3-4 "tellen met sprongen van 5"; Spain 1º ciclo; Brazil EF01MA01; Sweden åk 1-3 "talföljder"; Finland grade 1-2).
- Common misconceptions (F-109, F-101), each with this game's response:
  1. **Rote chant not tied to the groups (answering with the number of HANDS, e.g. 4 for 20).** Response: the answer tiles always include the number of hands; choosing it replays the count with each hand first OPENED — five `ART.fingerDot`s appear on it counted 1-5 with tones — before the hand's badge (`ART.countBadge` 5, 10, 15, 20) lands. Every "five" is five fingers.
  2. **Losing place in the sequence (skipping a hand or counting one twice: 15 or 25 for 20).** Response: each tapped hand takes the counted look and shows its running total on itself, and a counted hand ignores further taps (one-to-one enforced by the object, F-101); a ± 5 answer replays the count by hands with badges, the last badge grows (`ANIM.lastBadge`) and `ART.totalNumeral` pulses.
  3. **Over-generalising "counting in fives ends in 0 or 5" (F-109).** Response: L3 adds a final PARTIAL hand — two fingers (`ART.handTwo`) or one (`ART.handOne`) — so the total ends in 2, 7, 1 or 6; the distractor set includes the next multiple of five; the replay shows the partial hand opened with only 2 (or 1) finger dots.
  4. **Cannot start from a non-multiple (F-109).** Response: at L3 the partial hand is placed FIRST in two items (2, 7, 12, 17 …), so the chain starts off the multiples; the badge on the first hand reads 2 and each full hand adds 5.
  5. **Mixing the 5s and 10s sequences (5, 10, 20 …).** Response: the badges are written by the game, not said by the child, so the sequence seen is always correct; a replay re-lands the badges 350 ms apart so the child can read the steps.

## How it plays
1. **Start screen**: title "Fives Hands", the octopus (`ART.octopus`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3 hands)**: rail of 10 dots (§6). Zone A: the octopus at (90, 170); three hand tiles (`ART.handTile`, 80 × 80) in a row at y = 160, x = 260 / 360 / 460 (pitch 100, centred: first x = 360 − (n − 1) × 50), each showing `ART.hand`. Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 390, x = 240 / 360 / 480 — 15, 3, 10 shuffled — DISABLED until every hand is counted. Caption `S("countInFives")` ("Count in 5s") at (360, 300), 26 px `THEME.colour.inkSoft`.
3. **Counting**: tap a hand: `tone("tap", k)` (k = hands counted so far; at L3 the partial hand plays `tone("tap", k)` too — the pitch climbs one step per group, F-213), `ANIM.pop`, the tile takes the counted look (`ART.handCounted` tokens) and `ART.countBadge` with the running total (5, 10, 15) appears at its top-right; the tile stays bright and ignores further taps. When the last hand is tapped its badge plays `ANIM.lastBadge` and `ART.totalNumeral` (52 px) appears at (360, 84) with `ANIM.appear`; 900 ms later the numeral tiles enable.
4. **Answering**: tap a numeral tile.
   - **Correct (15)**: `ANIM.pop`, `tone("correct")`, praise pop; the hands wave in turn (`ANIM.wave`, 100 ms apart) and the octopus `ANIM.wiggle`; rail dot fills; next item after 700 ms (new hands `ANIM.appear`).
   - **Wrong, the number of hands (3)**: `ANIM.nudge`, `tone("nudge")`; the replay OPENS each hand: five `ART.fingerDot`s 1-5 appear on it (`tone("tap", 1 … 5)`, 120 ms apart), then its badge "5"; then the next hand's dots and "10"; then "15"; the last badge grows and the total pulses. Attempt 2.
   - **Wrong, total ± 5 or other**: nudge + tone; the replay by hands (badges re-land 350 ms apart with tones), last badge grows, total pulses. Attempt 2.
   - **Second wrong**: the replay again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (hands still wave; no praise pop).
5. **Items 2-10**: per Content/Rules. L1 1-4 hands in one row; L2 5-8 hands in two rows; L3 8-10 hands in two rows with a partial hand last or first.
6. **Finish**: `t("all_done")` (360, 110); the octopus (360, 200) `ANIM.celebrate`; the summary = the ten solved totals as 56 × 56 `ART.numeralTile` copies in a row at y = 400 (x = 360 − 4.5 × 68 + i × 68); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  octopus:      { kind: "emoji", value: "🐙", size: 80 },
  hand:         { kind: "emoji", value: "🖐️", size: 56 },                       // five fingers
  handTwo:      { kind: "emoji", value: "✌️", size: 56 },                        // two fingers, L3 partial hand
  handOne:      { kind: "emoji", value: "☝️", size: 56 },                        // one finger, L3 partial hand
  handTile:     { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  handCounted:  { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 12 },
  countBadge:   { kind: "shape", shape: "circle", r: 18, fill: "structure" },      // running total 22 px display, color bg
  fingerDot:    { kind: "shape", shape: "circle", r: 8, fill: "accent" },          // single-count numeral 11 px inkOnAccent; five in an arc over the hand during an opened replay
  totalNumeral: { kind: "text",  value: "", size: 52, font: "display", color: "structure" },
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "hand tapped; correct numeral" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong numeral" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last hand's badge" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "uncounted hands after 6 s idle; total numeral in a replay" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new hands; total numeral; finger dots (from alpha 0, scale 0.6)" },
  wave:      { angle: 15, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "each hand in turn after a correct answer" },
  wiggle:    { angle: 8, duration: 100, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "octopus after a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring behind the correct numeral (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish octopus" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    "15" total (360,84) after the count         │
      │  octopus(90,170)   [ H ]  [ H ]  [ H ]   hands y=160, pitch 100│  zone A
      │                    (two rows: y=120 and y=210 for 5-10 hands) │
260   ├──────────────────────────────────────────────────────────────┤
      │              "Count in 5s" (360,300)                          │
      │        [ 15 ]       [ 3 ]        [ 10 ]   tiles y=390         │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(H = `ART.hand` on an `ART.handTile`.) Hand layout: n ≤ 4 → one row at y = 160, first x = 360 − (n − 1) × 50; 5 ≤ n ≤ 10 → row 1 holds ceil(n/2) hands at y = 120, row 2 the rest at y = 210, each row centred by the same formula (five per row at most: x = 160 + 100 i). At L3 the partial hand (`ART.handTwo` / `ART.handOne`) occupies the last position (or the first, in the off-multiple items) on a normal `ART.handTile`. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.octopus` at (90, 170).
- Hand tiles: `makeTile` 80 × 80 with `ART.handTile` tokens and `ART.hand` (or `ART.handTwo` / `ART.handOne`) as the label; counted look via `api.setSelected(true)` with `selectedFill: THEME.colour.structureSoft`, `selectedStroke: THEME.colour.structure` (the `ART.handCounted` tokens); `ART.countBadge` at tile (+28, −28) with the total in `THEME.colour.bg` 22 px `THEME.font.display`; `ART.fingerDot`s in an arc above the hand (x = −24, −12, 0, 12, 24; y = −30, −34, −36, −34, −30) during an opened replay. Counted tiles are `setEnabled(false)` for tapping but keep full alpha.
- Caption: `S("countInFives")`, `THEME.font.body` 26 px, `THEME.colour.inkSoft`, (360, 300), `wordWrap` width 600.
- Numeral tiles: `makeTile` 96 × 96 (`ART.numeralTile`), label 44 px `THEME.font.display` `THEME.colour.ink`, alpha 0.5 while disabled; `ART.totalNumeral` at (360, 84); `ART.showRing` behind the correct tile.
- Tab order: hand tiles in row order, then the numeral tiles. Tap floors 80 / 96 (≥ 56); gaps 20.

## Content
Language-neutral (quantities and numerals; the caption is the one string). Items as (hands [with a partial hand noted]; total; distractors = the number of hands and total ± 5 (− and + alternating), or at L3 with a partial hand: the number of hands and the next multiple of five):
- **L1** (1-4 hands, one row): (3; 15; 3, 10) · (2; 10; 2, 15) · (4; 20; 4, 15) · (1; 5; 1, 10) · (3; 15; 3, 20) · (4; 20; 4, 25)
- **L2** (5-8 hands, two rows): (5; 25; 5, 20) · (6; 30; 6, 35) · (7; 35; 7, 30) · (8; 40; 8, 45) · (6; 30; 6, 25) · (5; 25; 5, 30)
- **L3** (8-10 hands; partial hand last, or first in the off-multiple items): (9; 45; 9, 40) · (10; 50; 10, 45) · (4 + two fingers last; 22; 5, 25) · (6 + one finger last; 31; 7, 35) · (two fingers first + 3; 17; 4, 20) · (one finger first + 5; 26; 6, 30) · (8; 40; 8, 35)

Play list of 10 per Rules; no repeats within a level; tile positions shuffled; the correct slot never repeats twice running.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong numeral, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- Stuck rule (inactivity cue only): after 6 s with uncounted hands and no tap, the uncounted hands `ANIM.pulse` once; repeats every 6 s of inactivity. Nothing ends, nothing is scored.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], hands `ANIM.wave` in turn, octopus `ANIM.wiggle`, rail dot, next item after 700 ms.
- What happens on a wrong answer:
  - The number of hands (3 for 15): nudge + tone; opened replay — five finger dots counted 1-5 on each hand before its badge 5, 10, 15; last badge grows, total pulses.
  - Total ± 5 (a hand skipped or counted twice): nudge + tone; replay by hands with badges and tones; last badge grows, total pulses.
  - The next multiple of five on a partial-hand item (25 for 22): nudge + tone; replay ending on the partial hand opened with only its 2 (or 1) finger dots, badge 22.
  - Double-tap on a counted hand: nothing happens (not an error).
  - Numeral tapped while hands remain: cannot happen (tiles disabled).
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Fives Hands"; `countInFives` = "Count in 5s".

## Sound
`tone("tap", k)` on the k-th counted hand (pitch climbs one step per group — F-213); `tone("tap", j)` per finger dot in an opened replay; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change; "Count in 5s" changes once translated).
- [ ] Works at narrow width (400-px iframe: both rows of hands, the octopus and the three tiles visible and separate).
- [ ] Keyboard operable (Tab walks the hands in row order, then the numerals; Enter counts a hand / picks; Enter on a counted hand does nothing).
- [ ] Never auto-starts.
- [ ] No losing state (wrong numerals never end the session; the show-me ring always completes the item).
- [ ] Tapping a hand shows 5 on it, the next 10, the next 15; tapping a counted hand again changes nothing.
- [ ] The numeral tiles stay dimmed until every hand is counted; the big total appears first.
- [ ] Tapping the number of hands (3 for 15) replays with five dots counted on each hand before the badges 5, 10, 15 land.
- [ ] Items with 5 or more hands use two rows.
- [ ] At the third level an item ends (or starts) with a two-finger or one-finger hand, and its total does not end in 0 or 5.
- [ ] Two first-try corrects in a row bring more hands; a wrong numeral brings fewer next.
- [ ] The finish screen shows the ten solved totals in order and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each hand is a higher note than the last.
