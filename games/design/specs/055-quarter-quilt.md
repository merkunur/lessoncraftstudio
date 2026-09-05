# 055 — Quarter Quilt

## Identity
- Slug: `quarter-quilt`
- Subject / topic: Mathematics / quarters of a shape — one quarter and three quarters as one or three of FOUR equal parts
- Age band: `6-8`
- Interaction pattern: `P6` — build on a grid (tap patches to shade them; Check)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P6. Content is language-neutral (shapes, patches, a pie icon); no `LOCALE_DATA`. No fraction notation is written anywhere (F-27: quarters as equal parts, no symbols, at 6-8).

## Learning
- Objective: Shades exactly one quarter (or three quarters) of a quilt square that is divided into equal parts, whatever the number and shape of the patches, and checks it.
- Prerequisites: Knows a half as two equal parts (game 054); counts to 16; can toggle a cell by tapping (game 003 territory).
- Curriculum links: F-112 (thirds/fifths hard, "the whole changes but parts compared" — the response is to keep the whole fixed and vary its partition; equal-parts check by overlay), F-27 (halves/quarters of shapes at 5-8 across the systems; no notation before 8-9 in DE/NL/FI/IT/NO), F-21, F-31 row "Halves/quarters as equal parts (no notation)" — conservative 7-8, earliest 5 → 6-8 (US 1.G.A.3 / 2.G.A.3 "partition … into two, three, or four equal shares, describe the shares using the words halves, thirds, … fourths"; England Y1-2 "recognise, find, name and write fractions 1/4 … of a shape" — the writing is left out here; Germany Klasse 2 "Viertel" informal; France CE1 "quart"; Netherlands groep 4 "kwart"; Spain 1º ciclo "cuarto"; Brazil EF02MA — "quarta parte"; Sweden åk 1-3 "fjärdedel"; Finland grade 2 informal).
- Common misconceptions (F-112), each with this game's response:
  1. **A quarter is "one patch", whatever the quilt ("one square = one quarter").** Response: L2 quilts have 8 patches and L3 quilts have 16, so one quarter is 2 or 4 patches. On Check with too few shaded, the quilt shows its four quarters as outlines (`ART.quarterFrame`, four equal groups) with badges 1-4 (`ART.quarterBadge`); the shaded patches glide together (`ANIM.gather`) into one quarter frame and the frame that is not yet full pulses — a quarter is a quarter OF THE WHOLE, not one patch.
  2. **Unequal parts accepted as quarters (shading any 4 of 16 patches scattered, or 3 patches of a 2 × 2).** Response: the quilt's quarters are FIXED equal groups; the count is what is checked, but the feedback always draws the four equal frames and lays the shaded patches onto one frame so the child sees "this much is one quarter". Scattered shading that adds up to the right count is accepted (it IS a quarter of the area) and the frames show it re-gathered.
  3. **Three quarters read as "three patches".** Response: on a 3-quarter item with only 3 of 8 shaded, Check gathers the shaded patches into quarter frames (1½ frames fill) and the two empty frames that still need shading pulse; the count badge on the prompt pie (`ART.pieIcon` with 3 of 4 sectors filled) pulses in time.
  4. **Quarters must be squares (a triangular quarter "isn't a quarter").** Response: L3 includes a quilt cut by its two diagonals into four equal triangles; the frames overlay shows the triangles turning (`ANIM.turnOnto`) onto one another and matching exactly — four equal parts, whatever their shape.
  5. **Over-shading and not checking (5 of 16 for a quarter).** Response: on Check with too many shaded, the quilt self-counts the shaded patches with `ART.countBadge`s, then the extra patches un-shade with `ANIM.nudge` and `ANIM.rise` on their fill, leaving exactly the right amount — but the item is not complete: the pie icon pulses and the child must Check again (the correction is shown, not done for the child).

## How it plays
1. **Start screen**: title "Quarter Quilt", the cat (`ART.cat`) at (360, 200), Start, picker.
2. **Item 1 (L1: one quarter of a 2 × 2 quilt)**: rail of 10 dots (§6). Zone A: the prompt — `ART.pieIcon` (a circle r 44 divided into 4 sectors by two lines, with 1 sector filled `structure`) at (360, 130); beside it, `ART.pieCount` ("1", 40 px) at (430, 130) — the number of quarters to shade; the cat at (110, 170) holding a needle (`ART.needle`) at (150, 150). Zone B: the quilt — a 2 × 2 grid of `ART.patch` tiles (96 × 96, gap 8) centred at (360, 372): cell centres x = 308 / 412, y = 320 / 424; a `THEME.colour.structure` 3 px frame (`ART.quiltFrame`) around the whole quilt. Zone C: Check (`makeButton ok`) at (360, 510), disabled until at least one patch is shaded. Caption `S("shadeQuarters")` ("Shade this many quarters") at (360, 210), 24 px `THEME.colour.inkSoft`, `wordWrap` 600 — the pie icon and the numeral carry the task for a non-reader.
3. **Shading**: tapping an empty patch fills it (`ART.patchFill` appears with `ANIM.appear`, `tone("tap", k)` where k = shaded count); tapping a shaded patch un-fills it (`ANIM.rise` on the fill, `tone("tap", k)` at the new count). Any patch, any order (the quilt is not a ten-frame; equal parts are the objective, not sequence). Check enables at the first shaded patch.
4. **Check**: tap OK.
   - **Correct (1 of 4 shaded)**: the quilt shows its four quarter frames (`ART.quarterFrame` ×4 with `ART.quarterBadge` 1-4, `ANIM.appear`, 150 ms apart, `tone("tap", k)`); the shaded patch's frame `ANIM.pop`s; the pie icon's filled sector and the shaded quarter `ANIM.pulse` together once; `tone("correct")`; praise pop (next key in rotation); the cat `ANIM.stitch` (a small up-down bob); rail dot fills; after 900 ms the quilt clears and the next item builds.
   - **Too few (0 is impossible — Check is disabled; e.g. 1 of 8 for one quarter at L2)**: the quarter frames appear with badges; the shaded patches glide (`ANIM.gather`) into the first frame (frame order: top-left, top-right, bottom-left, bottom-right; each frame holds the patches that belong to it); the frame(s) that should be full but are not gain `ART.needFrame` (accent outline) and `ANIM.pulse`; `tone("nudge")`; the frames fade after 1200 ms and the patches glide back to their cells; Check disables until the child changes the quilt. Attempt 2.
   - **Too many**: the shaded patches self-count (`ART.countBadge` 1 … k, `tone("tap", k)`), the frames appear, then the surplus patches (the last-shaded ones) `ANIM.nudge` and their fills `ANIM.rise` away one by one with descending tones until the count is right; `ART.pieIcon` pulses; the child must tap OK again. Attempt 2.
   - **Attempt 3** (a second wrong Check): the show-me step — the quilt shades the correct patches itself (one quarter frame at a time, `ANIM.appear` on each patch fill, tones rising), then OK gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping OK completes the item as solved-with-help (no praise pop).
5. **Items 2-10**: per Content/Rules. L1: 2 × 2 quilts, one quarter or three quarters. L2: 2 × 4 quilts (8 patches, 80 × 80; a quarter = 2 patches, the frames are 2-patch columns) and 4 × 1 strip quilts (four strips, a quarter = 1 strip — the same fraction, a different shape). L3: 4 × 4 quilts (16 patches, 56 × 56, a quarter = 4 patches in a 2 × 2 block) and the diagonal quilt (four equal triangles as polygon tiles).
6. **Finish**: `t("all_done")` (360, 110); the cat (360, 200) `ANIM.celebrate`; the summary = the ten finished quilts drawn small (`ART.miniQuilt`, 48 × 48, with the shaded quarters as `structure` blocks) in two rows of five from y = 330 — a row of true quarters, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  cat:          { kind: "emoji", value: "🐱", size: 96 },
  needle:       { kind: "emoji", value: "🧵", size: 40 },
  pieIcon:      { kind: "shape", shape: "circle", r: 44, fill: "surface", stroke: "structure", strokeWidth: 3 },     // two structure 2-px lines through the centre (vertical + horizontal) divide it; filled sectors are drawn as arc wedges in structure
  pieWedge:     { kind: "shape", shape: "arc", r: 44, fill: "structure" },                                            // one 90° wedge; startDeg set per sector (270, 0, 90, 180 in order)
  pieCount:     { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  quiltFrame:   { kind: "shape", shape: "rect", w: 0, h: 0, stroke: "structure", strokeWidth: 3 },                    // w/h set per quilt: grid extent + 8
  patch:        { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },   // w/h per level: 96 (L1), 80 (L2), 56 (L3 4×4)
  patchTri:     { kind: "shape", shape: "polygon", points: [[0,0],[-110,-110],[110,-110]], fill: "surface", stroke: "line", strokeWidth: 2 },   // one diagonal-quilt triangle; rotated 0/90/180/270 per patch
  patchFill:    { kind: "shape", shape: "roundRect", w: 84, h: 84, fill: "structure", radius: 6 },                     // the shading, inset 6 px; sized to the patch; for patchTri the fill is the same polygon inset 6 px
  fillDot:      { kind: "shape", shape: "circle", r: 6, fill: "bg" },                                                  // drawn on every shaded patch so the state is not colour-only
  quarterFrame: { kind: "shape", shape: "rect", w: 0, h: 0, stroke: "structure", strokeWidth: 4 },                    // one of the four equal groups; w/h per quilt
  quarterBadge: { kind: "shape", shape: "circle", r: 12, fill: "structure" },                                          // 1-4, 14 px display, color bg, at the frame's top-left corner
  needFrame:    { kind: "shape", shape: "rect", w: 0, h: 0, stroke: "accent", strokeWidth: 4 },                       // a quarter frame that still needs shading
  countBadge:   { kind: "shape", shape: "circle", r: 14, fill: "bg" },                                                 // numeral 16 px display, color structure — on a shaded patch during a self-count
  showRing:     { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  miniQuilt:    { kind: "shape", shape: "rect", w: 48, h: 48, stroke: "line", strokeWidth: 1 },                       // finish summary; shaded quarters drawn as structure blocks
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Quilt geometries (all centred at (360, 372)): L1 2 × 2 of 96 px, gap 8 (extent 200 × 200); L2 2 × 4 of 80 px, gap 6 (extent 338 × 166 — 4 columns wide, 2 rows tall; a quarter = one column of 2 patches) and the 4 × 1 strip quilt (four strips 80 × 176, gap 6, side by side; a quarter = one strip); L3 4 × 4 of 56 px, gap 4 (extent 236 × 236; a quarter = a 2 × 2 block — the frames are the four blocks) and the diagonal quilt (one 220 × 220 square with both diagonals drawn; the four triangles are `ART.patchTri` tiles whose tap area is the triangle's bounding box clipped by hit-test to the polygon). Quarter frames are always the four EQUAL groups listed here; the check compares the shaded COUNT to the target (quarters × patches-per-quarter); which patches are shaded does not matter.

## Animation registry
```js
const ANIM = {
  appear:    { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a patch fill placed; quarter frames and badges; a new quilt (from alpha 0, scale 0.6)" },
  rise:      { y: "-=24", alpha: 0, duration: 240, ease: "Sine.In", trigger: "a patch fill removed (undo or too-many correction); quilt clearing" },
  gather:    { duration: 320, ease: "Sine.InOut", trigger: "shaded patch fills glide into the quarter frames in frame order (x,y set at call); reversed to return" },
  turnOnto:  { angle: "+=90", duration: 400, ease: "Sine.InOut", yoyo: true, hold: 500, trigger: "diagonal-quilt triangles rotate onto the shaded one (pivot at the quilt centre) and back" },
  pop:       { scale: 1.08, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the completed quarter frame(s) on a correct Check" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "needFrame outlines; the pie icon after a too-many correction; pie + quarter together on correct" },
  nudge:     { x: "+=8", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a surplus patch before its fill rises away" },
  stitch:    { y: "-=10", duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "cat on a correct Check" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the Check button (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish cat" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  cat (110,170)  needle (150,150)    (pie ◔) (360,130)  "1" (430,130) │  zone A
      │              "Shade this many quarters" (360,210)            │
260   ├──────────────────────────────────────────────────────────────┤
      │                    ┌────┬────┐   L1: 2×2 patches 96 px       │
      │                    │    │    │   centres x=308/412           │  zone B
      │                    ├────┼────┤            y=320/424          │
      │                    │    │    │   quilt centred (360,372)     │
      │                    └────┴────┘                               │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ]  (360,510)                      │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L2 2 × 4: columns x = 231 / 317 / 403 / 489, rows y = 329 / 415; L2 strips: x = 231 / 317 / 403 / 489 at y = 372; L3 4 × 4: x = 270 / 330 / 390 / 450, y = 282 / 342 / 402 / 462; L3 diagonal: the four triangles point in from the square's four sides, meeting at (360, 372). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.cat` (110, 170); `ART.needle` (150, 150); `ART.pieIcon` at (360, 130) with `ART.pieWedge`s for the filled sectors (1 or 3, filled clockwise from the top-right); `ART.pieCount` at (430, 130).
- Quilt: patches as `makeTile` with `ART.patch` (or `ART.patchTri`) tokens; a shaded patch draws `ART.patchFill` plus `ART.fillDot` at its centre (shape + colour, never colour alone); `ART.quiltFrame` around the whole quilt.
- `ART.quarterFrame` ×4 with `ART.quarterBadge`s during feedback; `ART.needFrame` over frames that still need shading; `ART.countBadge` on shaded patches during a self-count.
- Check: `makeButton` `ok` at (360, 510), alpha 0.5 while disabled; `ART.showRing` around it during show-me.
- Caption `S("shadeQuarters")` 24 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 210), two lines max.
- Tap floors: patches 96 / 80 / 56 (≥ 56, the 6-8 floor); diagonal triangles have a bounding box ≥ 110 × 110; gaps 4-8 between patches are acceptable because a mis-tap onto a neighbour is undone by one tap and nothing is judged until Check.
- Keyboard: arrows move between patches (row-major), Enter toggles; Tab reaches OK; Enter checks.

## Content
Language-neutral. Items as (quilt; quarters to shade; target patch count):
- **L1** (2 × 2): (2 × 2; 1; 1) · (2 × 2; 3; 3) · (2 × 2; 1; 1) · (2 × 2; 3; 3)
- **L2** (2 × 4 and strips): (2 × 4; 1; 2) · (strips; 1; 1) · (2 × 4; 3; 6) · (strips; 3; 3) · (2 × 4; 1; 2) · (strips; 3; 3)
- **L3** (4 × 4 and diagonal): (4 × 4; 1; 4) · (diagonal; 1; 1) · (4 × 4; 3; 12) · (diagonal; 3; 3) · (4 × 4; 1; 4) · (4 × 4; 3; 12)

Play list of 10 per Rules; within a level the pool is shuffled and not repeated until exhausted; consecutive items never share both quilt and quarter count. The pie icon always shows the quarters to shade; the quilt is always empty at the start of an item.

Worked example: item 1 (2 × 2; 1) first-try · item 2 (2 × 2; 3) first-try → L2 · item 3 (2 × 4; 1) shades 1 patch → the four column frames appear, the single fill gathers into frame 1 and the frame's empty half pulses; the child shades a second patch, Check (helped) · item 4 (strips; 1) first-try · item 5 (2 × 4; 3) first-try → L3 · item 6 (4 × 4; 1) shades 5 → self-count to 5, the fifth fill rises away, the pie pulses; Check again (helped) · items 7-10 with no misses → Finish shows ten small quilts.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong Check, or wrong first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: the four quarter frames appear with badges and rising tones, the shaded quarter(s) pop, pie and quarter pulse together, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], cat `ANIM.stitch`, rail dot, quilt clears, next item after 900 ms.
- What happens on a wrong answer:
  - Too few shaded (one patch = one quarter; three patches = three quarters): frames appear, the shaded fills gather into the frames, the frames still needing shading pulse in the accent outline, `tone("nudge")`; Check disabled until the quilt changes.
  - Too many shaded (over-shading): self-count with badges, surplus fills nudge and rise away with descending tones until the count is right, the pie icon pulses; the child must Check again.
  - Diagonal quilt, any wrong count: the same, and the triangles turn onto the shaded one and back (`ANIM.turnOnto`) so their equal size is seen.
- Retry behaviour: attempt 1 → attempt 2 after the enacted hint → attempt 3 the quilt shades itself and OK carries the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Quarter Quilt"; `shadeQuarters` = "Shade this many quarters". No fraction symbols anywhere.

## Sound
`tone("tap", k)` on each patch shaded or un-shaded (k = current shaded count, so undo sounds lower); `tone("tap", k)` per quarter frame as the four appear; `tone("correct")`, `tone("nudge")`, `tone("finish")` once. Silent under `?sound=off`; no audio files.

## Testing checklist
- [ ] Works in all 11 languages (OK, All done, Play again, Menu, praise change with the picker; the caption once translated).
- [ ] Works at narrow width (400-px iframe: the pie icon, the whole quilt including 4 × 4 and OK visible and tappable).
- [ ] Keyboard operable (arrows move between patches, Enter shades/un-shades; Tab reaches OK; Enter checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the quilt eventually shades itself and OK completes the item).
- [ ] Tapping any empty patch shades it (with a small pale dot on it); tapping it again un-shades it.
- [ ] OK is dimmed until at least one patch is shaded.
- [ ] On a 2 × 4 quilt shading one patch and checking shows four column frames numbered 1-4 with the half-empty frame pulsing in coral.
- [ ] Shading five patches of a 4 × 4 for one quarter makes the fifth fill float away with a falling note and the pie icon pulse; the item completes only after a second OK.
- [ ] On the diagonal quilt the four triangles turn onto one another during feedback and match.
- [ ] The pie icon shows one filled sector for "one quarter" items and three for "three quarters" items.
- [ ] Two first-try Checks in a row bring 8-patch quilts, then 16-patch and diagonal quilts; a wrong Check brings simpler quilts.
- [ ] The finish screen shows ten small quilts with their shaded quarters and no score.
- [ ] With `?sound=off` nothing is audible.
