# 111 — Measure Judge

## Identity
- Slug: `measure-judge`
- Subject / topic: Mathematics / measuring length with non-standard units — unit iteration without gaps, overlaps or a wrong start
- Age band: `6-8`
- Interaction pattern: `P1` — tap one of N (three cube rows under one object; tap the row that measures it correctly)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P1 (a judge-among-three game in the shape of 054). Content is language-neutral (objects drawn as shapes, cubes, numerals); no `LOCALE_DATA`. Metric only; no ruler and no cm appear — the unit is the cube (F-114: non-standard units at 6-8, cm later in game 112).

## Learning
- Objective: Picks, from three rows of cubes laid under the same object, the one row that measures it correctly (cubes edge to edge, starting at the object's end, stopping at the other end) and reads its count as the object's length in cubes.
- Prerequisites: Counts a row of up to 8 objects (game 001); reads numerals to 10. No reading needed; the caption is optional support.
- Curriculum links: F-114 (unit iteration with gaps/overlaps and the wrong-start error are THE length misconceptions; response = units snap edge to edge, a gap shows as a hole), F-21 ("length with non-standard then standard units" in all 12 systems), F-31 row "Length with units (cm/m)" — conservative 7-8, earliest 6 → 6-8, with the non-standard-unit step first (US 1.MD.A.2 "express the length … as a whole number of length units, by laying multiple copies … end to end … with no gaps or overlaps" — the objective verbatim; England Y1 "measure … using non-standard units"; Germany Klasse 1-2 "Längen mit selbstgewählten Einheiten messen"; France CP "comparer des longueurs … avec un étalon"; Netherlands groep 3-4 "meten met natuurlijke maten"; Spain 1º ciclo "unidades no convencionales"; Brazil EF01MA15 "unidades de medida não padronizadas"; Sweden åk 1-3 "jämförelser och uppskattningar av längd"; Finland grades 1-2 "mittaaminen").
- Common misconceptions (F-114, F-101), each with this game's response:
  1. **Gaps between units are fine ("the cubes reach the end, so it is 4").** Response: tapping a row with a gap makes the gap visible as a hole — `ART.holeMark` (a dashed accent square exactly one cube wide) drops into the gap (`ANIM.holeIn`), and the part of the object above the hole is underlined by the same mark, so the child sees a piece of the object that no cube measures. Nothing is said.
  2. **Overlapping units are fine ("more cubes means I measured carefully").** Response: tapping a row with an overlap makes the overlapping cube lift and stack on top of its neighbour (`ANIM.stackUp`) so the child sees two cubes covering one cube's worth of object; the row then holds one cube more than the object's length.
  3. **Starting away from the object's end (the row begins a little way in, or before the object).** Response: tapping a wrong-start row draws `ART.edgeMark` (a tall accent line) at the object's left end AND at the row's first cube; the empty band between them fills with `ART.holeMark`; at the other end the overhanging cube gets the same mark. The two lines that do not line up are the information.
  4. **Counting the last cube's number as the length even when the row stops short (stops at 3 of 4).** Response: tapping a short row shows `ART.edgeMark` at the object's right end and at the row's last cube, with `ART.holeMark` in the uncovered space — an unmeasured piece of object.
  5. **Reading the length off a row's overall span rather than its count.** Response: every distractor row spans (roughly) the same distance as the object, so span never identifies the right row; only the cube layout does. On a correct tap the cubes count themselves (`ART.countBadge` 1 … n, rising tones) and the length appears at the object's end, so the count is always modelled.

## How it plays
1. **Start screen**: title "Measure Judge", the inchworm (`ART.worm`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: a stick 4 cubes long; rows: correct, gap, short)**: rail of 10 dots at y = 28 (§6); `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the object — a stick (`ART.stick`, 160 × 28 for 4 cubes; the object's width is always length × 40 px) drawn with its left end at x = 200 on y = 150; the inchworm sits at (110, 150) looking at it; `ART.edgeMark`s are NOT shown yet. Above the object, the caption `S("whichRow")` ("Which row measures it?") at (360, 90), 24 px `THEME.font.body` `THEME.colour.inkSoft`, `wordWrap` 600. Below the object, three candidate rows in zone B, each a `makeTile` 600 × 56 with `ART.rowTile` tokens (invisible body; the selected look is the library outline) centred at (360, 300), (360, 372), (360, 444). Each row holds cubes (`ART.cube`, 40 × 40) laid on the row's centre line, positioned relative to the object's left end (x = 200):
   - the correct row: 4 cubes at x = 220, 260, 300, 340 (edge to edge from the object's left end to its right end at 360);
   - the gap row: 3 cubes at x = 220, 260, 340 (a 40-px hole between the second and third);
   - the short row: 3 cubes at x = 220, 260, 300 (stops 40 px before the object's end).
   Row order shuffled per item. Each row also carries `ART.rowHandle` (a small `structure` circle at x = 60) so the row reads as a tappable thing even where the cubes are far from its left edge.
3. **Answering**: the child taps a row.
   - **Correct**: `api.setSelected(true)`, `ANIM.pop`, `tone("correct")`; the row's cubes count themselves left to right (`ART.countBadge` with the numeral on each cube, 250 ms apart, `tone("tap", k)`); `ART.lengthLabel` shows "4" beside `S("cubes")` ("cubes") at the object's right end (x = object end + 40, y = 150) with `ANIM.appear`; `GameCore.showPraise` (next key in rotation); the inchworm `ANIM.inch` (a scale-x squash and release — it "inches" once); rail dot fills; after 900 ms the next item builds (`ANIM.appear` on the object and rows). First-try correct.
   - **Wrong, gap row**: `ANIM.nudge`, `tone("nudge")`, the row de-selects and stays enabled; `ART.holeMark` drops into the gap (`ANIM.holeIn`) and a second `ART.holeMark` outlines the piece of object directly above it; both stay 1200 ms then `ANIM.fadeOut`. All rows are `setEnabled(false)` during the cue and re-enable after. Attempt 2.
   - **Wrong, overlap row**: nudge + tone; the overlapping cube lifts and settles on top of its neighbour (`ANIM.stackUp`), stays 1200 ms, then glides back (`ANIM.stackDown`). Attempt 2.
   - **Wrong, wrong-start row**: nudge + tone; `ART.edgeMark` at the object's left end (x = 200) and at the row's first cube's left edge (x = 220); `ART.holeMark` in the band between them; `ART.edgeMark` at the object's right end and the overhanging cube's right edge; 1200 ms; fade. Attempt 2.
   - **Wrong, short row**: nudge + tone; `ART.edgeMark` at the object's right end and at the row's last cube's right edge; `ART.holeMark` in the uncovered space; 1200 ms; fade. Attempt 2.
   - **Wrong on attempt 2**: the cue again, and the correct row gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help (cubes still count themselves; no praise pop).
4. **Items 2-10**: per Content/Rules. L1 objects 3-5 cubes with obvious defects (gap of a whole cube; short by a cube); L2 objects 5-7 cubes with an overlap row and a wrong-start row; L3 objects 6-8 cubes with SUBTLE defects (a half-cube gap; a half-cube overlap; a start 20 px in) so the child has to look at every joint.
5. **Finish**: `t("all_done")` (360, 110); the inchworm (360, 200) `ANIM.celebrate`; the summary = the ten measured objects drawn small (`ART.miniObject`, height 10, width = length × 12) each with its length numeral at its right (16 px `THEME.colour.inkSoft`) in two columns of five from y = 300 (left column x from 140, right column x from 420, rows 32 px apart) — a list of true measurements, not a score; optionally `t("question_x_of_y", {n: first-try solved, total: 10})` at (360, 470); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  worm:        { kind: "emoji", value: "🐛", size: 72 },
  stick:       { kind: "shape", shape: "roundRect", w: 160, h: 28, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },   // w = length × 40, set per item
  pencilBody:  { kind: "shape", shape: "rect", w: 200, h: 28, fill: "surface2", stroke: "structure", strokeWidth: 3 },                     // pencil: body w = length × 40 − 28, plus the tip
  pencilTip:   { kind: "shape", shape: "polygon", points: [[0,-14],[28,0],[0,14]], fill: "surface", stroke: "structure", strokeWidth: 3 },   // 28 px tip at the right end; body + tip = length × 40
  ribbon:      { kind: "shape", shape: "rect", w: 240, h: 22, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },                // w = length × 40; a 2-px ink centre line drawn along it
  cube:        { kind: "shape", shape: "rect", w: 40, h: 40, fill: "surface", stroke: "structure", strokeWidth: 2 },                       // a 4-px inner square (structureSoft) marks it as a cube face
  rowTile:     { kind: "shape", shape: "roundRect", w: 600, h: 56, fill: "bg", stroke: "bg", strokeWidth: 0, radius: 12 },                  // invisible tile body; selected look = library outline
  rowHandle:   { kind: "shape", shape: "circle", r: 10, fill: "structure" },
  holeMark:    { kind: "shape", shape: "rect", w: 40, h: 40, stroke: "accent", strokeWidth: 3 },                                            // dashed (lineDash [6,4]); w set to the hole width at call
  edgeMark:    { kind: "shape", shape: "rect", w: 4, h: 64, fill: "accent" },
  countBadge:  { kind: "shape", shape: "circle", r: 12, fill: "structure" },                                                                // numeral 14 px display, color bg, on each cube
  lengthLabel: { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  showRing:    { kind: "shape", shape: "roundRect", w: 612, h: 68, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniObject:  { kind: "shape", shape: "rect", w: 48, h: 10, fill: "structureSoft", stroke: "structure", strokeWidth: 1 },                 // finish summary; w = length × 12
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. Objects are shapes, never emoji, so that their length is an exact multiple of 40 px. The three objects differ in shape AND fill token (stick / pencil / ribbon), never by colour alone.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the correct row tapped" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a wrong row tapped" },
  holeIn:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "holeMark / edgeMark appearing (from alpha 0, scale 0.6)" },
  stackUp:   { y: "-=40", duration: 300, ease: "Sine.InOut", trigger: "the overlapping cube rises onto its neighbour; x tweens to the neighbour's x in a parallel 300 ms tween" },
  stackDown: { duration: 300, ease: "Sine.InOut", trigger: "the lifted cube returns to its row position (x, y set at call)" },
  badgeIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges in turn, 250 ms apart (from alpha 0, scale 0.5)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "length label; new object and rows (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "marks after a cue" },
  inch:      { scaleX: 0.7, duration: 160, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "inchworm on a correct answer" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct row (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish inchworm" }
};
```
No flashing: `showMe` cycles at 1 Hz; every cue is one continuous motion.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │            "Which row measures it?" (360,90)                 │
      │  worm (110,150)  ▐════════ object ════════▌  "4 cubes"       │  zone A
      │                  x=200            x=200+len×40   label       │
260   ├──────────────────────────────────────────────────────────────┤
      │  ●   [■][■][■][■]              row tile (360,300) 600×56      │
      │  ●   [■][■]    [■]             row tile (360,372)             │  zone B
      │  ●   [■][■][■]                 row tile (360,444)             │
480   ├──────────────────────────────────────────────────────────────┤
      │                 (praise pop appears centred)                 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Objects of 8 cubes span x = 200 … 520, so the widest object and its label (to x ≈ 620) stay inside the stage. A wrong-start row overhangs to x = 540 at most.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- The object is drawn on y = 150 with its LEFT end at x = 200 and its width = length × 40: `ART.stick` (w set), or `ART.pencilBody` (w = length × 40 − 28) with `ART.pencilTip` at the right end, or `ART.ribbon` (w set). `ART.worm` at (110, 150).
- Rows: three `makeTile` 600 × 56 with `ART.rowTile` tokens at (360, 300), (360, 372), (360, 444); `ART.rowHandle` at each row's (60, y); cubes `ART.cube` centred on the row's y at the x positions in Content (cube x = 220 + 40 i for a correct row; each defect shifts cubes as listed).
- Cue marks: `ART.holeMark` centred on a hole (w = hole width, 20 or 40) on the row AND on the object above it; `ART.edgeMark` centred on an edge x, spanning from y − 32 to y + 32 of the row or the object; `ART.countBadge` at each cube's centre during a self-count with its numeral in `THEME.colour.bg` 14 px `THEME.font.display`.
- `ART.lengthLabel` at (object right end + 44, 150) followed by `S("cubes")` at 20 px `THEME.font.body` `THEME.colour.inkSoft` immediately to its right (`wordWrap` 120, two lines allowed for long translations).
- `ART.showRing` around the correct row. Caption `S("whichRow")` at (360, 90), max two lines.
- Tap floors: rows 600 × 56 ≥ 56; gaps between rows 16. Tab order: the three rows top to bottom (creation order). While a cue plays (≈ 1.5 s) all rows are `setEnabled(false)`.

## Content
Language-neutral. An item = (object; length in cubes; the three rows). Row types, with cube x positions relative to the object's left end L (cube width 40, positions are cube centres):
- `ok` — n cubes at L + 20 + 40 i, i = 0 … n − 1.
- `gap40` — n − 1 cubes: the first g cubes at L + 20 + 40 i, then a 40-px hole, then the rest continuing so the row ends at L + 40 n (g set per item, 1 ≤ g ≤ n − 2).
- `gap20` — n − 1 cubes with a 20-px hole after cube g and a 20-px hole after cube g + 1 (two half-cube holes); the row ends at L + 40 n.
- `overlap40` — n + 1 cubes where cube o + 1 is drawn at cube o's x + 20 (a half overlap) and cube o + 2 at cube o's x + 40 (a full overlap on the same x as the next slot); net: two cubes share one slot; the row ends at L + 40 n.
- `overlap20` — n + 1 cubes where cube o + 1 overlaps cube o by 20 px and every later cube shifts by −20; the last cube ends at L + 40 n − 20 (a subtle half overlap).
- `start20` — n cubes starting at L + 40 (20 px in); the last cube overhangs the object's end by 20 px.
- `start40` — n cubes starting at L + 60 (40 px in); overhang 40.
- `short` — n − 1 cubes at L + 20 + 40 i; ends one cube early.

Items:
- **L1** (3-5 cubes; obvious defects): (stick; 4; ok, gap40 g=2, short) · (pencil; 3; ok, gap40 g=1, short) · (ribbon; 5; ok, gap40 g=3, start40) · (stick; 5; ok, short, start40) · (pencil; 4; ok, gap40 g=1, start40)
- **L2** (5-7 cubes; overlap and wrong start): (ribbon; 6; ok, overlap40 o=3, start40) · (stick; 7; ok, gap40 g=4, overlap40 o=2) · (pencil; 5; ok, overlap40 o=1, start20) · (ribbon; 7; ok, start20, short) · (stick; 6; ok, overlap40 o=4, gap40 g=2)
- **L3** (6-8 cubes; subtle defects): (pencil; 8; ok, gap20 g=3, overlap20 o=5) · (ribbon; 7; ok, overlap20 o=2, start20) · (stick; 8; ok, gap20 g=5, start20) · (pencil; 6; ok, overlap20 o=3, gap20 g=1) · (ribbon; 8; ok, start20, overlap20 o=6)

Play list of 10 per Rules; no item repeats within a session; the correct row's position is shuffled per item and never the same slot twice running (§13). If a level pool is exhausted it is reshuffled.

Worked example: item 1 (stick 4) first-try · item 2 (pencil 3) first-try → L2 · item 3 (ribbon 6) taps the overlap row → a cube climbs onto its neighbour; then taps the correct row (helped) → L1 · item 4 (stick 5) first-try · item 5 (pencil 4) first-try → L2 · items 6-7 first-try → L3 · item 8 (pencil 8) taps the half-gap row → two thin dashed holes appear on the row and on the pencil above; then correct (helped) → L2 · items 9-10 first-try → Finish shows ten small objects with 4, 3, 6, 5, 4, 6, 7, 8, 7, 5 beside them.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next item from the next level up (cap L3).
- Adaptation: any wrong tap on an item, or wrong first-try on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, the cubes count themselves with `ART.countBadge`s and rising tones, `ART.lengthLabel` shows the count with `S("cubes")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], inchworm `ANIM.inch`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Gap row chosen (gaps are fine): `ANIM.nudge` + `tone("nudge")`; `ART.holeMark` in the gap and on the object above it for 1200 ms.
  - Overlap row chosen (more cubes = more careful): nudge + tone; the overlapping cube stacks onto its neighbour (`ANIM.stackUp`) for 1200 ms, then returns.
  - Wrong-start row chosen: nudge + tone; `ART.edgeMark`s at the object's ends and the row's ends, `ART.holeMark` in the offset band, 1200 ms.
  - Short row chosen: nudge + tone; `ART.edgeMark`s at the object's right end and the row's last cube, `ART.holeMark` in the uncovered piece, 1200 ms.
- Retry behaviour: attempt 1 unaided → attempt 2 after the cue → attempt 3 with the show-me ring on the correct row; the ringed row completes the item as solved-with-help. No attempt 4. An item completed after any wrong tap does not count as first-try.
- Finish condition: 10 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Measure Judge"; `whichRow` = "Which row measures it?"; `cubes` = "cubes".

## Sound
`tone("correct")` on the correct row; `tone("nudge")` on a wrong row; `tone("tap", k)` per cube during the self-count (pitch climbs with the length, F-213); `tone("tap")` when a stacked cube lands; `tone("finish")` once. Silent under `?sound=off`; no audio files. The marks carry the meaning; sound never does alone.

## Testing checklist
- [ ] Works in all 11 languages (Question x of y, All done, Play again, Menu, praise change with the picker; the caption and "cubes" once translated).
- [ ] Works at narrow width (400-px iframe: the object, the label and all three rows fully visible; an 8-cube object's label is not clipped).
- [ ] Keyboard operable (Tab cycles the three rows top to bottom; Enter picks; the object and the worm are not focusable).
- [ ] Never auto-starts.
- [ ] No losing state (10 wrong taps in a row still reach All done via the show-me ring).
- [ ] Tapping a row with a hole shows a dashed coral square in the hole and another on the object above it.
- [ ] Tapping a row with an overlap makes one cube climb onto the cube beside it, then climb back down.
- [ ] Tapping a row that starts inside the object shows two tall coral lines at the left that do not line up.
- [ ] Tapping the correct row makes its cubes count 1, 2, 3, 4 with rising notes and shows "4 cubes" at the object's end.
- [ ] At the third level the holes and overlaps are half a cube wide and still marked when tapped.
- [ ] Every row on one item spans roughly the object's length; the right row cannot be found by span alone.
- [ ] Two first-try corrects in a row bring longer objects and subtler rows; a wrong tap brings shorter ones.
- [ ] The finish screen lists ten small objects with their lengths and no score.
- [ ] With `?sound=off` nothing is audible.
