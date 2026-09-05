# 122 — Tally Marks

## Identity
- Slug: `tally-marks`
- Subject / topic: Mathematics / data — reading tally marks in groups of five (the diagonal fifth stroke closes a group) plus single strokes
- Age band: `6-8`
- Interaction pattern: `P3` — tap to count (tap each tally cluster once; full clusters count five at a time, the open cluster counts by ones; then a P1 numeral choice states the total)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P3. Content is language-neutral (strokes and numerals); no `LOCALE_DATA`. The tally convention shown is four uprights closed by one diagonal (F-118); no other tally style appears.

## Learning
- Objective: Counts a tally by tapping each closed five-cluster (5, 10, 15 …) and then each stroke of the open cluster (16, 17 …), and taps the numeral that states the total.
- Prerequisites: Counts in fives to 20 (game 040) and on in ones from any number (game 016 is the closest relative — tens then ones); reads numerals to 24.
- Curriculum links: F-1 (data/graphs in 5 of 15 sources; skip counting in 5), F-21 ("tables, pictograms and bar charts" — tally charts are the data-collection form in 11 of 12 systems), F-31 row "Pictogram / bar chart" — conservative 7-8, earliest 6 → 6-8 (US 1.MD.C.4 / 2.MD.D.10 "organize, represent and interpret data"; England Y2 "interpret and construct simple pictograms, tally charts, block diagrams"; Germany Klasse 2 "Strichlisten"; France CE1 "relevés, tableaux"; Netherlands groep 4 "turven"; Spain 1º ciclo "recogida de datos"; Brazil EF02MA22; Sweden åk 1-3 "tabeller"; Finland grade 2 "tukkimiehen kirjanpito"). F-109 (skip counting tied to groups, then switching to ones) is the counting model.
- Common misconceptions (F-109, F-118), each with this game's response:
  1. **Counts the diagonal as a sixth stroke ("that's 6 in a bunch").** Response: a closed cluster is ONE tile that counts five on one tap; if the child then states a total that is five plus one per cluster, the replay counts a cluster stroke by stroke — the four uprights badge 1, 2, 3, 4 (`ART.strokeBadge`) and the diagonal lights with a "5" drawn on it (`ART.gateBadge`, `ANIM.lastBadge`): the gate IS the fifth stroke.
  2. **Ignores the gate — counts four per cluster.** Response: the same stroke-by-stroke replay; a total that is four per cluster (plus singles) is offered as a distractor at L2 and L3 so the error is caught and enacted rather than left silent.
  3. **Rote fives chant carried into the singles ("5, 10, 15, 20" for three clusters and two strokes).** Response: the open cluster is dimmed until every closed cluster is counted, and its strokes badge one at a time with a SQUARE one-badge (`ART.oneBadge`) instead of the round five-badge (`ART.fiveBadge`), each with a single rising `tone("tap", k)` — the switch from fives to ones is visible in the badge shape and audible in the step size. A total rounded to a five is a distractor at L3.
  4. **Loses place in the fives (taps three clusters and says 20 or 10).** Response: every counted cluster keeps its badge (5, 10, 15) so the running total is always on the board; the last badge is enlarged (`ANIM.lastBadge`) and the same numeral appears large above the board (`ART.totalNumeral`) for 900 ms before the numeral tiles enable — "the last number said is how many" (F-101 cardinality, applied to groups).
  5. **A cluster of four open strokes read as five because it looks like a bunch.** Response: at L3 the open cluster can hold exactly four strokes with NO diagonal; tapping it counts by ones (16, 17, 18, 19), never five, so the gate is shown to be what makes five.

## How it plays
1. **Start screen**: title "Tally Marks", the squirrel (`ART.squirrel`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: one closed cluster + 3 singles = 8)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: a tally board (`ART.board`, 560 × 170) centred at (360, 170); on it the clusters as tiles (`makeTile` 96 × 96, `ART.clusterTile` tokens — transparent body) in a row at y = 170, first x = 360 − (N − 1) × 54 (pitch 108, N = number of clusters): a closed cluster (four `ART.stroke` uprights 16 px apart with `ART.gate` drawn diagonally across them) and an open cluster (three `ART.stroke` uprights, no gate). The squirrel sits at (80, 190) holding an acorn (`ART.acorn` at (118, 214)). The open cluster is `setEnabled(false)` (alpha 0.5) until every closed cluster has been tapped. Zone B: caption `S("howMany")` ("How many?") at (360, 340), 24 px `THEME.colour.inkSoft`; three numeral tiles (`ART.numeralTile`, 96 × 96) at y = 420, x = 240 / 360 / 480 labelled 8, 6, 9 shuffled, all `setEnabled(false)` until the count is complete.
3. **Counting the closed clusters**: the child taps the closed cluster. `ANIM.pop`; the cluster's strokes turn `THEME.colour.structure` (`ART.strokeLit` / `ART.gateLit` replace the stroke and gate drawings); a round `ART.fiveBadge` with "5" appears at the tile's top-right (`ANIM.appear`) and `tone("tap", 5)` plays; the tile disables for tapping but stays at full alpha (the badge is its state). With two or three closed clusters each tap adds five: 5, 10, 15, the tones climbing five semitones per cluster. When the last closed cluster is counted the open cluster enables (alpha 1).
4. **Counting the open cluster**: one tap on the open cluster starts its stroke count: its strokes light one at a time, 250 ms apart, each gaining a square `ART.oneBadge` with the running numeral (6, 7, 8) and `tone("tap", k)` rising one semitone per stroke; the last badge plays `ANIM.lastBadge` and `ART.totalNumeral` "8" appears above the board at (360, 76) with `ANIM.appear`. After 900 ms the numeral tiles enable. (An item with no singles skips this step: the last five-badge is the last badge.)
5. **Answering**: the child taps a numeral tile.
   - **Correct (8)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation), the acorn glides (`ANIM.glide`) onto the board and the squirrel `ANIM.hop`; the rail dot fills; after 800 ms the board clears (`ANIM.fadeOut`) and the next item's clusters `ANIM.appear`.
   - **Wrong — 9 (gate counted as a sixth stroke) or 6/7 (gate ignored / four per cluster)**: `ANIM.nudge`, `tone("nudge")`, the tile de-selects and stays enabled; then the **stroke replay** on each closed cluster in order: badges clear, the four uprights re-light one by one with `ART.strokeBadge` 1, 2, 3, 4 (`tone("tap", k)`), then the diagonal lights with `ART.gateBadge` "5" (`ANIM.lastBadge`); then the open cluster's strokes re-badge 6, 7, 8 and `ART.totalNumeral` pulses (`ANIM.pulse`). ≈ 2.5 s, tiles disabled meanwhile. Attempt 2.
   - **Wrong — a total rounded to a five (10 for 8)**: nudge, tone, then the replay with the square one-badges on the singles emphasised (`ANIM.pulse` on each one-badge in turn after the replay). Attempt 2.
   - **Wrong on attempt 2**: the replay again and the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (no praise pop; the acorn still lands).
6. **Items 2-10**: per Content/Rules. L1 one closed cluster + 0-4 singles (5-9); L2 two or three closed clusters + singles (10-19); L3 three or four closed clusters + singles to 24, including open clusters of exactly four.
7. **Finish**: `t("all_done")` (360, 110); the squirrel (360, 200) `ANIM.celebrate`; the summary = the ten totals as mini tally chips (`ART.tallyChip`, 60 × 44, showing the tally in miniature at 60 % scale with the numeral beneath in 16 px `THEME.colour.structure`) in two rows of five from y = 330 (x = 160 + i × 100); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  squirrel:     { kind: "emoji", value: "🐿️", size: 88 },
  acorn:        { kind: "emoji", value: "🌰", size: 36 },
  board:        { kind: "shape", shape: "roundRect", w: 560, h: 170, fill: "surface", stroke: "line", strokeWidth: 2, radius: 18 },
  clusterTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "surface", strokeWidth: 0, radius: 12 },   // invisible tile body; selected look = structure 3 px outline
  stroke:       { kind: "shape", shape: "line", w: 5, stroke: "ink", strokeWidth: 5 },            // upright, length 64; four per closed cluster, 16 px apart (x offsets −24, −8, 8, 24)
  strokeLit:    { kind: "shape", shape: "line", w: 5, stroke: "structure", strokeWidth: 5 },      // a counted upright
  gate:         { kind: "shape", shape: "line", w: 5, stroke: "ink", strokeWidth: 5 },            // diagonal from (−34, 28) to (34, −28) across the four uprights
  gateLit:      { kind: "shape", shape: "line", w: 5, stroke: "structure", strokeWidth: 5 },
  fiveBadge:    { kind: "shape", shape: "circle", r: 16, fill: "structure" },                    // running five-total on it, 18 px display, color bg
  oneBadge:     { kind: "shape", shape: "roundRect", w: 30, h: 30, fill: "accent", radius: 6 },  // running one-total on it, 16 px display, color inkOnAccent
  strokeBadge:  { kind: "shape", shape: "circle", r: 11, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // 1-4 on the uprights during the replay, 13 px display ink
  gateBadge:    { kind: "shape", shape: "circle", r: 14, fill: "structure" },                    // "5" on the diagonal during the replay, 16 px display bg
  totalNumeral: { kind: "text",  value: "", size: 52, font: "display", color: "structure" },
  numeralTile:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px display ink
  showRing:     { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  tallyChip:    { kind: "shape", shape: "roundRect", w: 60, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
A closed cluster is always four uprights plus one diagonal; an open cluster is 1-4 uprights and never a diagonal. No other mark appears on the board.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "cluster tapped; correct numeral" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong numeral" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "badges, total numeral, new clusters (from alpha 0, scale 0.6)" },
  lastBadge: { scale: 1.4, duration: 220, ease: "Back.Out", yoyo: true, trigger: "the final badge of a count or replay; the gate badge" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "total numeral after a replay; one-badges in the rounded-total cue" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "board contents between items; replay badges" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "acorn to the board after a correct answer (x,y set at call)" },
  hop:       { y: "-=14", duration: 140, ease: "Sine.Out", yoyo: true, trigger: "squirrel on a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "show-me ring (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish squirrel" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28 · "Question 1 of 10" │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    ART.totalNumeral (360,76)                  │
      │  squirrel   ┌───────────── board (360,170) ─────────────┐     │  zone A
      │  (80,190)   │   [ ||||/ ]      [ |||  ]                 │     │  clusters y=170,
      │   acorn     │    x=306          x=414   (96×96 tiles)   │     │  pitch 108
      │             └──────────────────────────────────────────┘     │
260   ├──────────────────────────────────────────────────────────────┤
      │                    "How many?" (360,340)                      │
      │        [ 8 ]      [ 6 ]      [ 9 ]   tiles y=420, x=240/360/480 │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. With five clusters the row runs x = 144 … 576 (pitch 108), inside the board.

## Visual specification
- Background `THEME.colour.bg`. Rail per §6 (10 × `ART.dotEmpty`, x = 261 + i × 22, y = 28 → `ART.dotFull`); `t("question_x_of_y")` at (360, 48).
- `ART.board` centred (360, 170). Cluster tiles: `makeTile` 96 × 96 with `ART.clusterTile` tokens, centred at y = 170, x = 360 − (N − 1) × 54 + i × 108; closed clusters drawn first (left), the open cluster last (right). Inside a closed cluster: four `ART.stroke` uprights of length 64 at x offsets −24, −8, 8, 24 and `ART.gate` from (−34, 28) to (34, −28); inside an open cluster: n uprights at the same offsets (n = 1 … 4). Counted: `ART.strokeLit` / `ART.gateLit`. Badges: `ART.fiveBadge` at tile (+34, −34); `ART.oneBadge` at each stroke's top (x offset, −44); replay `ART.strokeBadge` at each upright's mid-point and `ART.gateBadge` at the gate's centre.
- `ART.squirrel` (80, 190); `ART.acorn` (118, 214); `ART.totalNumeral` (360, 76).
- Caption `S("howMany")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 340), `wordWrap` 600.
- Numeral tiles: `makeTile` 96 × 96 with `ART.numeralTile` tokens, label 44 px `THEME.font.display` `THEME.colour.ink`; disabled (alpha 0.5) until the count completes; `ART.showRing` behind the correct one on attempt 3.
- Tap floors: clusters 96, tiles 96 (≥ 56); gaps 12. Tab order: clusters left to right, then the numeral tiles. The open cluster is unreachable (disabled) until all closed clusters are counted; a counted cluster ignores further taps.

## Content
Language-neutral. Item = (closed clusters C; open strokes s; total = 5C + s; the three tiles = total + two distractors, shuffled). Distractor codes: G6 = 6 per cluster + s (gate counted extra), G4 = 4 per cluster + s (gate ignored), R5 = the total rounded to the nearest five that is not the total, ±1 = an off-by-one.

- **L1** (one closed cluster, 0-4 singles):
  1. (1; 3; 8; tiles 8, 9 G6, 7 G4)
  2. (1; 0; 5; tiles 5, 6 G6, 4 G4)
  3. (1; 2; 7; tiles 7, 8 G6, 6 G4)
  4. (1; 4; 9; tiles 9, 10 G6, 8 G4)
  5. (1; 1; 6; tiles 6, 7 G6, 5 ±1)
- **L2** (two or three closed clusters, singles; the gate distractors both ways):
  6. (2; 0; 10; tiles 10, 12 G6, 8 G4)
  7. (2; 3; 13; tiles 13, 15 G6, 11 G4)
  8. (3; 0; 15; tiles 15, 18 G6, 12 G4)
  9. (2; 4; 14; tiles 14, 16 G6, 15 R5)
  10. (3; 2; 17; tiles 17, 20 G6, 15 R5)
  11. (3; 1; 16; tiles 16, 19 G6, 13 G4)
- **L3** (three or four closed clusters; open clusters of exactly four appear; totals to 24):
  12. (3; 4; 19; tiles 19, 20 R5, 22 G6)
  13. (4; 0; 20; tiles 20, 24 G6, 16 G4)
  14. (4; 3; 23; tiles 23, 25 R5, 27 G6)
  15. (3; 3; 18; tiles 18, 20 R5, 21 G6)
  16. (4; 4; 24; tiles 24, 25 R5, 20 G4)
  17. (4; 1; 21; tiles 21, 20 R5, 25 G6)

Play list of 10 per Rules; shuffled within a level without repeats, reshuffled if exhausted. Tile positions shuffled per item; the correct tile never in the same slot twice running (§13). Cluster tap order among the closed clusters is free (any order gives 5, 10, 15 …); the open cluster always comes last.

Worked example: item 1 (8) counted 5 then 6, 7, 8 → taps 8 first-try · item 2 (5) first-try → L2 · item 7 (13) taps 15 → the replay badges 1-2-3-4 on the uprights and "5" on each gate, then 11, 12, 13 on the singles; taps 13 (helped) → L1 · items 3, 4 first-try → L2 · items 8, 9 first-try → L3 · item 13 (four closed clusters, 20) first-try · item 14 (23) first-try · Finish shows ten tally chips.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3). "First-try" = the correct numeral was the first numeral tapped.
- Adaptation: any wrong numeral tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- Stuck rule (inactivity cue only, never a clock): 6 s with an uncounted enabled cluster and no tap → that cluster plays `ANIM.pop` once; repeats every 6 s of inactivity.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], acorn `ANIM.glide` to the board, squirrel `ANIM.hop`, rail dot, next item after 800 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Total + one per cluster tapped (gate counted as a sixth stroke): `ANIM.nudge`, `tone("nudge")`, then the stroke replay — uprights 1, 2, 3, 4 and the gate badged "5" on every closed cluster, then the singles re-badged and the total pulsed.
  - Total − one per cluster tapped (gate ignored): the same stroke replay.
  - Rounded-to-five total tapped (fives chant carried into the singles): nudge, tone, the replay, then each square one-badge on the singles pulses in turn.
  - Off-by-one tapped (lost place): nudge, tone, the replay with the total pulsed.
  - A counted cluster tapped again: nothing happens (one-to-one is enforced by the tile).
  - The open cluster tapped before the closed ones: nothing happens (it is disabled and dimmed).
- Retry behaviour: attempt 1 unaided → attempt 2 after the replay → attempt 3 with the show-me ring; the ringed tile completes the item as solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Tally Marks"; `howMany` = "How many?".

## Sound
`tone("tap", 5k)` on the k-th closed cluster (pitch climbs five semitones per cluster — the step size is audible); `tone("tap", 5C + j)` on the j-th single stroke (one semitone per stroke); `tone("correct")` on the correct numeral; `tone("nudge")` on a wrong numeral; `tone("finish")` once. Silent under `?sound=off`; no audio files. Badges carry the count; sound never does alone.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu, praise; the caption once translated).
- [ ] Works at narrow width (400-px iframe: the board with five clusters and the three tiles visible; clusters remain separate targets).
- [ ] Keyboard operable (Tab walks the clusters left to right then the numeral tiles; Enter counts / picks; a counted cluster ignores Enter).
- [ ] Never auto-starts.
- [ ] No losing state (10 wrong numeral taps in a row still reach All done via the show-me ring).
- [ ] Tapping a closed cluster shows a round badge with 5 (then 10, 15 …); tapping it again does nothing.
- [ ] The open cluster is dimmed until every closed cluster is counted, then counts its strokes one by one with square badges.
- [ ] The numeral tiles stay dimmed until the count is complete and a big total has appeared above the board.
- [ ] Tapping the total plus one per cluster (e.g. 15 for two clusters and three strokes) replays each cluster as 1, 2, 3, 4 on the uprights and 5 on the diagonal.
- [ ] At level 3 an open cluster of exactly four strokes with no diagonal counts 1, 2, 3, 4 by ones, never five.
- [ ] Two first-try corrects in a row bring more clusters; a wrong tap brings fewer next.
- [ ] The finish screen shows ten miniature tallies with their totals and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each closed cluster is a clearly higher note than the last and singles rise in small steps.
