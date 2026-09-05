# 181 — Same Amount

## Identity
- Slug: `same-amount-pairs`
- Subject / topic: Mathematics / equal quantities in different arrangements (a spread row and a tight cluster can hold the same number)
- Age band: `5-6`
- Interaction pattern: `P12` — match pairs (all six tiles visible; memory is not the objective)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P12 (visible board, 3 pairs per board, sessions of 2-3 boards). Content is language-neutral (dot sets only); no `LOCALE_DATA`. Zero instruction text on the play screen: the prompt is the board itself and the ladybird's spots (`ART.ladybird`) — the first pair is discoverable by tapping (a tapped tile lifts; a second tap on another tile either locks or nudges). Nothing is spoken.

## Learning
- Objective: Pairs, on a visible board of six dot tiles, the two tiles that hold the same number of dots even though one is a long spread-out row and the other a tight cluster, judging by count and not by how much space the dots take.
- Prerequisites: Counts a set of up to 6 by pointing or by eye (games 001, 011). No reading; no numerals are needed (the numeral appears only on the finish chips).
- Curriculum links: F-101 (conservation of number — Piaget's length/spread bias: the same amount spread out "has more"), F-103 (length/area instead of number; bigger object = more), F-21 and F-31 row "Compare more/fewer/same" — conservative age 6, earliest 4 → 5-6 (US K.CC.C.6 "identify whether the number of objects in one group is greater than, less than, or equal to the number in another group"; England Reception ELG "compare quantities … same"; Germany Klasse 1 "gleich viele"; France GS "comparer des collections — autant que"; Netherlands groep 2 "evenveel"; Spain Infantil "igual que"; Brazil EI03ET07; Sweden förskoleklass "lika många"; Finland esiopetus "yhtä monta"). F-40 (cued recognition with immediate feedback), F-43 (enacted feedback — pairing lines, not a verdict), F-49 (tap only, ≥ 80 px tiles).
- Common misconceptions (F-101, F-103), each with this game's response:
  1. **Length bias — the long spread-out row "is more" than the tight cluster, so a 4-row is paired with a 5-cluster because both "look big".** Response: the two tapped tiles are joined dot-to-dot by pairing lines (`ART.pairLine`, one line per matched dot, drawn one at a time with `ANIM.lineDraw` and a rising `tone("tap", k)`); the dot in the cluster that gets no line is ringed (`ART.leftoverRing`, `ANIM.pulse`) — the row was not more, it was longer. Then the lines fade, both tiles nudge and de-select. From L2 the spread row always holds the SMALLER count of a near pair, so the length shortcut is wrong by construction.
  2. **Area / size bias — bigger dots "are more" (F-103 "bigger object = more").** Response: at L3 the dots of the smaller count are drawn LARGE (`ART.dotBig`, r 11) and the dots of the larger count small (`ART.dotSmall`, r 5); a pairing that follows dot size gets the same one-to-one lines and the leftover ring on the small-dot tile — size never changes the count.
  3. **Pairing by shape of arrangement (row with row, cluster with cluster) instead of by number.** Response: on every board a tile's true partner has the OTHER arrangement (row ↔ cluster), so two rows or two clusters are never a pair; a row-row tap draws the lines and rings the leftovers as above, and after the same tile has been in two wrong pairs its true partner gains a soft outline (`ART.hintRing`, `ANIM.showMe`) — the board never resets.
  4. **One-to-one failure while judging (counting a dot twice, or skipping one, in the cluster).** Response: the pairing lines are the count made visible — each dot gets exactly one line in a fixed order (row dots left to right; cluster dots in reading order), so a double-counted or skipped dot is exactly the one that ends up ringed or lineless.
  5. **Tapping the same tile twice expecting something to happen.** Response: the second tap de-selects it (`tone("tap")`, no error).

## How it plays
1. **Start screen**: title "Same Amount", the ladybird (`ART.ladybird`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Board 1 (L1: counts 2, 3, 4)**: the rail at y = 28 shows 2 hollow dots (§6 — one per board; two boards per session at 5-6, a third if the child reaches L3). Zones A and B are merged into one board: six tiles (`makeTile` 160 × 110 with `ART.tile` tokens) in a 3 × 2 grid — columns x = 180 / 360 / 540 (pitch 180, gap 20), rows y = 190 / 330 (pitch 140, gap 30). Each tile holds a dot set drawn from ART (`ART.dot`, r 8) either as a spread ROW (dots in one line, pitch 28, centred in the tile) or as a tight CLUSTER (the dice/ten-frame layouts in Content, pitch 18). The six tiles are: row-2, cluster-2, row-3, cluster-3, row-4, cluster-4, in a shuffled layout. The ladybird stands at (80, 260) at the left edge; its spots are the theme, nothing more. No caption, no words.
3. **Pairing**: the child taps a tile — it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). The child taps a second tile:
   - **Pair (same count, the other arrangement)**: the pairing lines draw one-to-one from the first tile's dots to the second tile's dots (`ANIM.lineDraw`, 180 ms apart, `tone("tap", k)`); when the last line lands with no dot left over, `tone("correct")`, both tiles glide 16 px toward each other (`ANIM.join`), dim to alpha 0.6 and lock with `ART.link` (a short bar) drawn between their facing edges; the lines stay on the board, faint (alpha 0.35), as the record of the match; the ladybird `ANIM.wiggle`s. No praise pop per pair.
   - **Not a pair**: the lines draw one-to-one as far as they go (min(a, b) lines), then every dot without a line on the bigger set is ringed (`ART.leftoverRing`, `ANIM.pulse`) for 900 ms; the lines and rings fade (`ANIM.fadeOut`), both tiles `ANIM.nudge`, `tone("nudge")`, both de-select and stay enabled. If the FIRST-tapped tile has now been in two wrong pairs, its true partner gains `ART.hintRing` (`ANIM.showMe`) until that pair is made.
   - **Same tile twice**: de-select, `tone("tap")`.
   - During a line cue (≤ 1.5 s) all tiles are `setEnabled(false)`; they re-enable when the cue ends.
4. **Board complete**: all three pairs locked → praise pop (`GameCore.showPraise`, next key in rotation), the rail dot fills, `ANIM.boardOut` (all tiles and lines rise and fade), then the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-3**: L1 counts 2, 3, 4 (pairs differ by 1 but the counts are small, spread rows at pitch 28); L2 counts 3, 4, 5 with the spread row ALWAYS the smaller count of each near pair (the 3-row is wider than the 4-cluster; the 4-row wider than the 5-cluster) and rows at pitch 32; L3 counts 4, 5, 6 with the same rule AND dot size inverted (the row dots large, the cluster dots small — `ART.dotBig` / `ART.dotSmall`) so both the length cue and the size cue point the wrong way. Session = 2 boards; a third board when the child reaches L3 by the end of board 2 (Rules).
6. **Finish**: `t("all_done")` (360, 110); the ladybird (360, 210) `ANIM.celebrate`; the summary = every pair made this session as `ART.pairChip`s (88 × 40) in a row at y = 380 (x = 360 − (n − 1) × 50 + i × 100, n = 6 or 9 chips in two rows of 6 and 3 when 9), each chip holding a tiny row and a tiny cluster of the same count (`ART.dotMini`, r 3, drawn as in Content at 40 % pitch) with `ART.equalMark` between them — the learning, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  ladybird:     { kind: "emoji", value: "🐞", size: 80 },
  tile:         { kind: "shape", shape: "roundRect", w: 160, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  dot:          { kind: "shape", shape: "circle", r: 8, fill: "structure" },           // L1-L2 dots, both arrangements
  dotBig:       { kind: "shape", shape: "circle", r: 11, fill: "structure" },          // L3: the dots of the SMALLER count (the spread row)
  dotSmall:     { kind: "shape", shape: "circle", r: 5, fill: "structure" },           // L3: the dots of the LARGER count (the cluster)
  pairLine:     { kind: "shape", shape: "line", w: 3, stroke: "accent", strokeWidth: 3 },   // one per matched dot, first tile's dot k to second tile's dot k
  leftoverRing: { kind: "shape", shape: "circle", r: 15, stroke: "accent", strokeWidth: 3 },  // around a dot that got no line
  link:         { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },      // between the facing edges of a locked pair
  hintRing:     { kind: "shape", shape: "roundRect", w: 172, h: 122, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:     { kind: "shape", shape: "roundRect", w: 88, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },
  dotMini:      { kind: "shape", shape: "circle", r: 3, fill: "structure" },           // finish chips only
  equalMark:    { kind: "text",  value: "=", size: 20, font: "display", color: "structure" },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Dot arrangements are built from `ART.dot` / `ART.dotBig` / `ART.dotSmall` at the offsets in Content; the art upgrade replaces the ladybird and nothing else changes. Colour never carries meaning: every dot is the same token; arrangement, line and ring geometry carry it.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.04, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  lineDraw:  { duration: 180, ease: "Sine.Out", trigger: "a pairing line's end point tweens from the first tile's dot k to the second tile's dot k (a Graphics line redrawn each frame from a tweened {x,y}); lines start 180 ms apart" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "leftoverRing(s) on the dots that got no line" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "lines and rings after a wrong pair" },
  join:      { duration: 220, ease: "Back.Out", trigger: "each tile of a correct pair moves 16 px toward the other (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  wiggle:    { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "ladybird on each correct pair" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true partner (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles and faint lines when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish ladybird" }
};
```
No flashing: `showMe` cycles at 1 Hz; `pulse` runs two half-cycles; every cue is one continuous motion.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                        ○ ○   rail y=28 (one per board) │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            ┌────────┐   ┌────────┐   ┌────────┐               │
      │  ladybird  │ • • •  │   │  • •   │   │• • • • │  row y=190    │
      │  (80,260)  └────────┘   │  • •   │   └────────┘  (160×110)    │  zones A+B
      │                         └────────┘                            │
      │            ┌────────┐   ┌────────┐   ┌────────┐               │
      │            │  •  •  │   │  • •   │   │ • •    │  row y=330    │
      │            │   •    │   └────────┘   └────────┘               │
      │            └────────┘  x=180        x=360        x=540        │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Pairing lines are drawn on one `Graphics` object ABOVE the tiles (so a line from a top-row tile to a bottom-row tile crosses the gap visibly). The grid spans x = 100 … 620, y = 135 … 385.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3), centred at y = 28, 22 px apart, swapped for `ART.dotFull` as boards complete.
- Tiles: `makeTile` 160 × 110 with `ART.tile` tokens; the dot set is a child container of the tile, centred; selected = library selected look (thicker `structure` stroke + `structureSoft` fill) + `ANIM.lift`; locked = alpha 0.6 + `setEnabled(false)` + `ART.link` drawn between the two locked tiles' facing edges (horizontal neighbours: the bar between their inner edges; vertical or diagonal partners: the bar at the midpoint of the segment between their centres).
- Dots: `ART.dot` (r 8) at L1-L2; at L3 `ART.dotBig` on the spread row and `ART.dotSmall` on the cluster. Row: dots at x = −(n − 1) × p / 2 + i × p, y = 0, with p = 28 (L1) or 32 (L2, L3). Cluster: the offsets in Content, pitch 18 (L1-L2) or 16 (L3).
- `ART.pairLine` from dot centre to dot centre; `ART.leftoverRing` centred on a lineless dot; `ART.hintRing` behind a tile.
- `ART.ladybird` at (80, 260). Tap floors: tiles 160 × 110 (≥ 80); gaps 20 horizontal, 30 vertical.
- Tab order / keyboard: arrows move across the 3 × 2 grid (row-major), Enter selects; a second Enter on another tile attempts the pair. Under `?embed=1` the picker is not created; nothing else changes.

## Content
Language-neutral. A board = three counts; each count appears twice — once as a spread row (R) and once as a tight cluster (C). Cluster offsets (relative to the tile centre, unit = the cluster pitch p): 2 → (−0.5, 0) (0.5, 0) · 3 → (−1, 0.5) (0, −0.5) (1, 0.5) · 4 → (−0.5, −0.5) (0.5, −0.5) (−0.5, 0.5) (0.5, 0.5) · 5 → the 4 above + (0, 0) · 6 → (−1, −0.5) (0, −0.5) (1, −0.5) (−1, 0.5) (0, 0.5) (1, 0.5). Row widths at pitch 32: 3 dots = 64 px, 4 = 96, 5 = 128 — always wider than the cluster of the next count up (4-cluster 18 px, 5-cluster 32 px, 6-cluster 64 px at p 16).
- **L1** (counts differ by 1, small; rows pitch 28, clusters pitch 18; no length trap needed — the counts are subitisable): board A = {2, 3, 4} · board B = {1, 2, 3} · board C = {3, 4, 2} (same set as A with a fresh shuffle)
- **L2** (rows pitch 32; the spread row is the SMALLER count of each adjacent pair by construction: 3R is wider than 4C, 4R wider than 5C): board A = {3, 4, 5} · board B = {2, 3, 4} · board C = {4, 5, 3}
- **L3** (rows pitch 32 with `ART.dotBig`; clusters pitch 16 with `ART.dotSmall`; length AND size point the wrong way): board A = {4, 5, 6} · board B = {3, 4, 5} · board C = {5, 6, 4}

Board layout rule: the six tiles are shuffled into the 3 × 2 grid with two constraints — the two tiles of one pair are never horizontally adjacent in the same row, and at least one pair spans the two rows (so a line cue crosses the gap on every board). A board set is not repeated within a session; if a level is revisited, its next unused board is used.

Worked example: board 1 (L1 {2, 3, 4}) — the child taps 3R then 3C → three lines, no leftover, locked; taps 4R then 2C → two lines, two ringed dots on 4R, nudge; taps 4R then 4C → locked; taps 2R then 2C → locked; board done with one wrong pair → L2. Board 2 (L2 {3, 4, 5}) — taps 4R then 5C (the row looked bigger) → four lines and one ringed dot in the cluster; taps 4R then 4C → locked; 3R–3C, 5R–5C → done with one wrong pair → L3. Board 3 (L3 {4, 5, 6}) — the big-dot 4R is paired with the small-dot 4C on the second try (the first try paired 4R with 5C: four lines, one ringed small dot); the rest first try → Finish shows nine chips.

## Rules
- Item count: one "item" = one board of 3 pairs; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 9 pairs ≈ 5 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); a board with exactly two wrong pairs → same level (its next unused board set).
- What happens on a correct answer: one-to-one lines draw with rising tones, `tone("correct")`, `ANIM.join`, tiles lock with `ART.link`, the lines stay faint, ladybird `ANIM.wiggle`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot fills.
- What happens on a wrong answer (per anticipated mistake):
  - Row paired with a bigger cluster (length bias): min(a, b) lines draw, the lineless cluster dot(s) get `ART.leftoverRing` pulsing 900 ms, then lines and rings fade, both tiles nudge, `tone("nudge")`, both de-select.
  - Big-dot tile paired with a bigger small-dot tile (size bias, L3): the same lines-and-rings cue; the ring sits on a SMALL dot, so "bigger dots" is visibly not "more".
  - Row paired with a row, or cluster with a cluster (pairing by arrangement): the same cue; if the counts happen to be equal this cannot occur (each count has exactly one row and one cluster), so there is always a leftover to ring.
  - The same tile in two wrong pairs: its true partner gains `ART.hintRing` (the show-me step for this pattern); the ring stays until that pair is made.
  - Same tile tapped twice: de-select, no cue.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its partner is ringed). A board always completes (success is certain, F-46). A board with any wrong pair does not count as clean.
- Finish condition: the session's boards complete (2 or 3). No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Same Amount". No words on the play screen; no numerals anywhere (the finish chips are dots and an equals sign).

## Sound
`tone("tap")` on select / de-select; `tone("tap", k)` when the k-th pairing line lands (the pitch climbs with the count — F-213 — so a 5-pair plays five rising notes); `tone("correct")` on a locked pair; `tone("nudge")` on a wrong pair (a soft note, never harsh); `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the lines and rings carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and the praise pops change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: all six tiles, the ladybird and the rail fully visible; lines between top and bottom tiles are not clipped).
- [ ] Keyboard operable (arrow keys move across the 3 × 2 grid, Enter selects; a second Enter on another tile attempts the pair; locked tiles are skipped).
- [ ] Never auto-starts (start screen until Start is tapped).
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; a hint ring appears on a tile's partner after it has been in two wrong pairs).
- [ ] All six tiles are face up at all times; nothing has to be remembered.
- [ ] Tapping a 3-row then a 3-cluster draws three lines, one dot to one dot, then the two tiles move together, dim and show a bar between them.
- [ ] Tapping a 4-row then a 5-cluster draws four lines and rings the one cluster dot that has no line, then both tiles wiggle apart and stay tappable.
- [ ] At the second level every spread row holds FEWER dots than the wider-looking cluster it sits near; at the third level the row's dots are bigger than the cluster's.
- [ ] Two rows (or two clusters) are never a pair; tapping two rows draws lines and rings the leftovers.
- [ ] Tapping the same tile twice de-selects it with no cue.
- [ ] A board with 0-1 mistakes is followed by a harder board (near counts, then big-vs-small dots); a board with 3+ mistakes by an easier one.
- [ ] The finish screen shows each pair as a chip with a tiny row, an equals sign and a tiny cluster — no score, no numerals.
- [ ] A locked pair is dimmed with a bar between the two tiles and cannot be tapped again; its faint lines stay until the board clears.
- [ ] No numeral, word or instruction appears on the play screen at any time.
- [ ] With `?sound=off` nothing is audible; with sound on, each line plays a higher note than the last.
