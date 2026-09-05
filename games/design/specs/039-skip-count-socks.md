# 039 — Skip-Count Socks

## Identity
- Slug: `skip-count-socks`
- Subject / topic: Mathematics / counting in 2s by pairs (2, 4, 6 … 20)
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (each pair once), with a P1 numeral choice to state the total
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3 (tap each GROUP for skip counting). Sibling games: 001 (tap-to-count by ones), 040 (counting in 5s).

## Learning
- Objective: Counts pairs of socks in twos by tapping each pair exactly once, reading the running total on each pair, and taps the numeral that says how many socks there are.
- Prerequisites: Counts to 20 by ones; recognises numerals to 20; knows that a pair is two.
- Curriculum links: F-21 (skip counting / number sequences), F-31 row "Skip counting 2/5/10" — conservative 7-8, earliest 6 → 6-8 (US 2.NBT.A.2 "skip-count by 5s, 10s, and 100s" with 2s in 1st-grade practice; England Y1 "count in multiples of twos, fives and tens"; Germany Klasse 1-2 "in Zweierschritten zählen"; France CP-CE1 "compter de 2 en 2"; Netherlands groep 3-4 "tellen met sprongen van 2"; Spain 1º ciclo; Brazil EF01MA01; Sweden åk 1-3 "talföljder"; Finland grade 1-2).
- Common misconceptions (F-109, F-101), each with this game's response:
  1. **Rote chant not tied to the groups ("2, 4, 6 …" said while tapping socks singly, or answering with the number of PAIRS).** Response: the answer tiles always include the number of pairs; choosing it replays the count with each pair first OPENED — its two socks get small `ART.sockDot`s 1, 2 (then 3, 4 …) counted singly with tones — before the pair's badge (`ART.countBadge` 2, 4 …) lands on it. The chant word is welded to two objects.
  2. **Losing place / slipping into ones (answering total ± 1).** Response: each tapped pair greys and shows its running total on itself (`ART.countBadge`), so the sequence the child sees is always 2, 4, 6 …; a ± 1 answer replays the count by pairs, the last badge grows (`ANIM.lastBadge`) and `ART.totalNumeral` pulses.
  3. **Cannot start from a non-multiple.** Response: L3 pegs ONE single sock first (`ART.singleTile`); tapping it says 1, and the pairs then count 3, 5, 7 … — the pattern is "add two", not "say the even numbers".
  4. **Over-generalising "counting in twos ends in an even number" (F-109).** Response: at L3 the distractor set includes total + 1 (the even neighbour of an odd total); the replay shows the single sock's badge "1" and the odd chain.
  5. **One-to-one failure — double-tapping a pair or skipping one (F-101).** Response: a counted pair ignores further taps; if the child taps a numeral while pairs remain bright they are not enabled — the tiles unlock only when every pair is counted; after 6 s without a tap the uncounted pairs pulse (an inactivity cue, never a clock).

## How it plays
1. **Start screen**: title "Skip-Count Socks", the cat (`ART.cat`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3 pairs)**: rail of 10 dots (§6). Zone A: a washing line (`ART.rope`) across zone A at y = 120 (and a second at y = 210 when there are two rows), with the cat and its basket (`ART.cat` at (90, 170), `ART.basket` at (90, 232)); three pair tiles (`ART.pairTile`, 96 × 72, transparent-looking) hang from pegs (`ART.peg`) at y = 150, x = 250 / 360 / 470 (pitch 110, centred: first x = 360 − (n − 1) × 55); each pair tile shows two `ART.sock`s at (−20, 0) and (+20, 0). Zone B: three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 390, x = 240 / 360 / 480 — 6, 3, 7 shuffled — DISABLED until every pair is counted. Caption `S("countInTwos")` ("Count in 2s") at (360, 300), 26 px `THEME.colour.inkSoft`.
3. **Counting**: tap a pair: `tone("tap", 2k)` (k = pairs counted so far, so the pitch climbs two steps per pair, F-213), `ANIM.pop`, the tile takes the counted look (`ART.pairCounted` tokens) and `ART.countBadge` with the running total (2, 4, 6) appears at its top-right; the tile stays bright and ignores further taps. When the last pair is tapped its badge plays `ANIM.lastBadge` and `ART.totalNumeral` (52 px) appears at (360, 76) with `ANIM.appear`; 900 ms later the numeral tiles enable.
4. **Answering**: tap a numeral tile.
   - **Correct (6)**: `ANIM.pop`, `tone("correct")`, praise pop; the pairs glide one after another (`ANIM.glide`, 120 ms apart) into the basket and vanish; the cat `ANIM.purr` (a small scale wobble); rail dot fills; next item after 700 ms (new pairs `ANIM.appear`).
   - **Wrong, the number of pairs (3)**: `ANIM.nudge`, `tone("nudge")`; the replay OPENS each pair: `ART.sockDot`s 1, 2 on the first pair's socks (`tone("tap", 1)`, `tone("tap", 2)`), then its badge "2"; then 3, 4 → "4"; then 5, 6 → "6"; the last badge grows and the total pulses. Attempt 2.
   - **Wrong, total ± 1 or other**: nudge + tone; the replay by pairs (badges 2, 4, 6 re-land 350 ms apart with tones), last badge grows, total pulses. Attempt 2.
   - **Second wrong**: the replay again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (socks still go to the basket; no praise pop).
5. **Items 2-10**: per Content/Rules. L1 2-5 pairs in one row; L2 6-8 pairs in two rows; L3 9-10 pairs in two rows, and items that start with a single sock (1, 3, 5 …).
6. **Finish**: `t("all_done")` (360, 110); the cat (360, 200) `ANIM.celebrate` beside a heaped basket (`ART.basket` at (360, 270) with three `ART.sock`s over it at (−24, −16), (0, −26), (24, −16)); the summary = the ten solved totals as 56 × 56 `ART.numeralTile` copies in a row at y = 400 (x = 360 − 4.5 × 68 + i × 68); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  cat:          { kind: "emoji", value: "🐱", size: 80 },
  sock:         { kind: "emoji", value: "🧦", size: 40 },
  basket:       { kind: "emoji", value: "🧺", size: 56 },
  rope:         { kind: "shape", shape: "rect", w: 560, h: 4, fill: "inkSoft" },
  peg:          { kind: "shape", shape: "roundRect", w: 10, h: 22, fill: "accent", radius: 3 },
  pairTile:     { kind: "shape", shape: "roundRect", w: 96, h: 72, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  pairCounted:  { kind: "shape", shape: "roundRect", w: 96, h: 72, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 12 },
  singleTile:   { kind: "shape", shape: "roundRect", w: 64, h: 72, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },      // one sock, L3 off-multiple start
  countBadge:   { kind: "shape", shape: "circle", r: 18, fill: "structure" },      // running total 22 px display, color bg
  sockDot:      { kind: "shape", shape: "circle", r: 10, fill: "accent" },         // single-count numeral 13 px inkOnAccent, on a sock during an opened replay
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
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "pair tapped; correct numeral" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong numeral" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the last pair's badge" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "uncounted pairs after 6 s idle; total numeral in a replay" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new pairs; total numeral; sock dots (from alpha 0, scale 0.6)" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "each pair to the basket (x,y set at call)" },
  purr:      { scale: 1.08, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "cat after the socks arrive" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring behind the correct numeral (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish cat" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    "6" total (360,76) after the count          │
      │  cat(90,170)  ────┬──────┬──────┬────  rope y=120, pegs        │  zone A
      │               [S S]  [S S]  [S S]      pairs y=150, pitch 110  │
      │  basket(90,232)   (second row: rope y=210, pairs y=240)        │
260   ├──────────────────────────────────────────────────────────────┤
      │              "Count in 2s" (360,300)                          │
      │        [ 6 ]        [ 3 ]        [ 7 ]   tiles y=390          │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(S S = the two `ART.sock`s on one `ART.pairTile`.) Pair layout: n ≤ 5 → one row at y = 150, first x = 360 − (n − 1) × 55; 6 ≤ n ≤ 10 → row 1 holds ceil(n/2) pairs at y = 150 (rope y = 120), row 2 the rest at y = 240 (rope y = 210), each row centred by the same formula. An L3 single sock takes the first position as a 64-px tile, and the pairs follow at the same pitch. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.cat` (90, 170); `ART.basket` (90, 232); `ART.rope` centred (400, 120) (and (400, 210) for two rows); an `ART.peg` at each tile's top centre on the rope.
- Pair tiles: `makeTile` 96 × 72 with `ART.pairTile` tokens; counted look via `api.setSelected(true)` with `selectedFill: THEME.colour.structureSoft`, `selectedStroke: THEME.colour.structure` (the `ART.pairCounted` tokens); the two `ART.sock`s drawn inside; `ART.countBadge` at tile (+36, −26) with the total in `THEME.colour.bg` 22 px `THEME.font.display`; `ART.sockDot` on each sock during an opened replay. `ART.singleTile` is a `makeTile` 64 × 72 with one `ART.sock`. Counted tiles are `setEnabled(false)` for tapping but keep full alpha (the badge is the state cue).
- Caption: `S("countInTwos")`, `THEME.font.body` 26 px, `THEME.colour.inkSoft`, (360, 300), `wordWrap` width 600.
- Numeral tiles: `makeTile` 96 × 96 (`ART.numeralTile`), label 44 px `THEME.font.display` `THEME.colour.ink`, alpha 0.5 while disabled; `ART.totalNumeral` at (360, 76); `ART.showRing` behind the correct tile.
- Tab order: pair tiles in row order, then the numeral tiles. Tap floors 96 × 72 / 64 × 72 / 96 (≥ 56); gaps ≥ 14.

## Content
Language-neutral (quantities and numerals; the caption is the one string). Items as (pairs [+ single]; total; distractors = the number of groups and total ± 1 (− for L1-L2 evens alternating with +; at L3 odd totals use total + 1)):
- **L1** (2-5 pairs, one row): (3; 6; 3, 7) · (2; 4; 2, 3) · (4; 8; 4, 7) · (5; 10; 5, 9) · (3; 6; 3, 5) · (4; 8; 4, 9)
- **L2** (6-8 pairs, two rows): (6; 12; 6, 11) · (7; 14; 7, 13) · (8; 16; 8, 15) · (6; 12; 6, 13) · (7; 14; 7, 15) · (8; 16; 8, 17)
- **L3** (9-10 pairs; and single-sock starts): (9; 18; 9, 17) · (10; 20; 10, 19) · (1 + 3; 7; 4, 8) · (1 + 5; 11; 6, 12) · (1 + 7; 15; 8, 16) · (1 + 4; 9; 5, 10) · (9; 18; 9, 19)

Play list of 10 per Rules; no repeats within a level; tile positions shuffled; the correct slot never repeats twice running.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong numeral, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- Stuck rule (inactivity cue only): after 6 s with uncounted pairs and no tap, the uncounted pairs `ANIM.pulse` once; repeats every 6 s of inactivity. Nothing ends, nothing is scored.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], pairs glide to the basket, cat `ANIM.purr`, rail dot, next item after 700 ms.
- What happens on a wrong answer:
  - The number of pairs (3 for 3 pairs): nudge + tone; opened replay — each pair's socks counted 1, 2 / 3, 4 / 5, 6 with dots, then the pair badges 2, 4, 6; last badge grows, total pulses.
  - Total ± 1 (slipped into ones): nudge + tone; replay by pairs with badges and tones; last badge grows, total pulses.
  - Total + 1 on an odd L3 total ("must be even"): nudge + tone; replay starting with the single sock's badge "1", then 3, 5, 7.
  - Double-tap on a counted pair: nothing happens (not an error).
  - Numeral tapped while pairs remain: cannot happen (tiles disabled).
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Skip-Count Socks"; `countInTwos` = "Count in 2s".

## Sound
`tone("tap", 2k)` on the k-th counted pair (two semitone steps per pair, so the pitch climbs with the total — F-213); `tone("tap", 1)` on the L3 single sock; `tone("tap", j)` per sock in an opened replay; `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change; "Count in 2s" changes once translated).
- [ ] Works at narrow width (400-px iframe: both rows of pairs, the cat, the basket and the three tiles visible and separate).
- [ ] Keyboard operable (Tab walks the pairs in row order, then the numerals; Enter counts a pair / picks; Enter on a counted pair does nothing).
- [ ] Never auto-starts.
- [ ] No losing state (wrong numerals never end the session; the show-me ring always completes the item).
- [ ] Tapping a pair shows 2 on it, the next 4, the next 6; tapping a counted pair again changes nothing.
- [ ] The numeral tiles stay dimmed until every pair is counted; the big total appears first.
- [ ] Tapping the number of pairs (3 for six socks) replays with each sock numbered 1-6 before the pair badges 2, 4, 6 land.
- [ ] Items with 6 or more pairs use two washing lines.
- [ ] At the third level some items start with a single sock and count 1, 3, 5 …; tapping the even neighbour replays the odd chain.
- [ ] Two first-try corrects in a row bring more pairs; a wrong numeral brings fewer next.
- [ ] The finish screen shows the ten solved totals in order and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each pair is a higher note than the last.
