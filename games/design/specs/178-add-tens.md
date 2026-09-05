# 178 — Add Tens

## Identity
- Slug: `add-tens`
- Subject / topic: Mathematics / adding multiples of ten (30 + 40) with ten-rods only — count on in tens from the first addend, then read the total
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (tap the rod source, then tap the tray), judged on Check; the total is then read by a P1 tap
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2 (whole-arrangement judgement on a Check tile) with a P1 sub-step (three total tiles) once the rods are right. Rods ONLY — no one-cubes exist in this game; every quantity is a whole number of tens.

## Learning
- Objective: Adds two multiples of ten (30 + 40) by laying the second addend as ten-rods beside the first addend's rods, checking, and then tapping the total (70) from three tiles.
- Prerequisites: Knows a rod is ten ones and counts in tens to 100 (games 016, 018, 019); reads two-digit numerals.
- Curriculum links: F-108 (tens as bundled rods; digits as independent numbers; "counts rods as ones"), F-105 (count-all vs counting on — here counting on in tens from 30), F-50 (base-ten blocks are an evidence-backed manipulative), F-21 (+/− within 100 by mental strategies in all 12 systems), F-31 row "+/− within 100, mental" — conservative 7-9, earliest 6 → 6-8 (US 1.NBT.C.4 "add a two-digit number and a multiple of 10" / 1.NBT.C.6; England Y2 "add … a two-digit number and tens"; Germany Klasse 2 "Zehnerzahlen addieren"; France CE1 "additionner des dizaines entières"; Netherlands groep 4 "tientallen optellen"; Spain 1º ciclo; Brazil EF02MA06; Sweden åk 1-3; Denmark 1.-2. klasse; Norway 2. trinn; Finland grade 2).
- Common misconceptions (F-108, F-105), each with this game's response:
  1. **Counting the rods as ones: 3 rods + 4 rods → "7".** Response: the 7 tile is always one of the three total tiles; when tapped it nudges and the tray **counts itself in tens** — the first group lights as one block with `ART.countBadge` "30", then each placed rod adds a badge 40, 50, 60, 70 (`tone("tap", k)` rising) — and the total "70" appears under the tray (`ART.trayTotal`). Seven things that are each ten make seventy.
  2. **Count-all: starting again from 10 for the whole tray instead of counting on from 30 (F-105).** Response: the first addend is PRE-LAID and locked; on Check its rods light together under one badge "30" before the child's rods count 40, 50 … — the count begins at 30, never at 10.
  3. **Digits juxtaposed: 30 + 40 → "34" (or "43").** Response: the 34 tile is a distractor on half the items; when tapped, the two addend tags (`ART.addendTag` "30" and "40") slide together over the tray (`ANIM.meet`) and the self-count replays — the numbers are added as tens, not written side by side.
  4. **Wrong number of rods for the second addend (placing 3 rods for 40, or 5).** Response: on Check the second addend's tag `ANIM.pulse`s and ghost rods (`ART.ghostRod`) show exactly how many rods 40 is in the right-hand area; surplus rods pulse; the child fixes the tray and checks again (the object refuses to be counted until it is the right size — F-61).

## How it plays
1. **Start screen**: title "Add Tens", the beaver (`ART.beaver`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 30 + 40)**: rail of 10 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the equation `ART.eqText` "30 + 40 = ?" (40 px) at (360, 92); the tray (`ART.tray`, 520 × 130) centred at (400, 190) with a divider (`ART.divider`) at x = 400 splitting a LEFT area (the first addend) from a RIGHT area (the second); the left area already holds 3 rods (`ART.rod`, locked, at x = 180 + i × 24, y = 190) under `ART.addendTag` "30" at (280, 118); the right area is empty under `ART.addendTag` "40" at (520, 118); `ART.trayTotal` at (400, 262), hidden. The beaver sits at (70, 190). Zone B: the rod source (`ART.sourceTile`, 120 × 120, `makeTile`) at (140, 390) showing one `ART.rod` and `ART.rodLabel` "10"; three total tiles (`ART.numeralTile`, 96 × 96) at y = 390, x = 320 / 440 / 560, hidden until the rods are right. Zone C: Check (`makeButton ok`) at (360, 510), disabled until at least one rod is placed. Caption `S("layTheRods")` ("Lay the rods, then check") at (360, 300), 22 px `THEME.colour.inkSoft`.
3. **Placing**: tap the source (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap the tray: a rod glides (`ANIM.glide`) into the right area's next position (x = 430 + j × 24, y = 190, j = 0 … 8) with `tone("tap", 10 × (j + 1) mod 12)`; the source stays selected so each further tray tap places another rod. Tapping a rod in the right area removes it (glides back to the source and vanishes; later rods close up). Left-area rods are locked: tapping one does nothing. A tenth rod in the right area is refused (`ANIM.nudge`, no message). Check enables at the first placed rod.
4. **Check** (the child taps OK):
   - **Right count of rods (4)**: the **self-count** — the left rods light together (`ART.groupGlow`) with one `ART.countBadge` "30" (`tone("tap", 3)`), then each right rod gets a badge 40, 50, 60, 70 (250 ms apart, `tone("tap", k)`, k = 4 … 7), and `ART.trayTotal` shows "70"; then the three total tiles `ANIM.appear` (70, 7, 34 in shuffled order) and the caption changes to `S("whatIsTheTotal")` ("What is the total?"). The source and tray disable.
   - **Wrong count of rods**: `tone("nudge")`; the "40" tag `ANIM.pulse`s and four `ART.ghostRod`s appear at the four right-area positions (`ANIM.appear`) — placed rods sit on their ghosts, missing ghosts are empty, surplus rods (beyond the ghosts) `ANIM.nudge`; Check disables until the tray changes. Attempt 2 (of the placement phase).
   - **Second wrong placement Check**: the ghosts stay and OK gains the show-me ring (`ART.showRing`, `ANIM.showMe`); filling exactly the ghosts and checking continues the item as solved-with-help.
5. **Reading the total** (P1 step): the child taps a total tile.
   - **Correct (70)**: `ANIM.pop`, `tone("correct")`, praise pop (next key in rotation; first-try items only); `ART.eqText` completes "30 + 40 = 70"; the beaver `ANIM.nod`s; rail dot fills; next item after 900 ms (`ANIM.appear`, the tray rebuilt with the new first addend).
   - **Wrong (7)**: `ANIM.nudge`, `tone("nudge")`; the self-count replays with the badges 30, 40 … 70 and the rising tones, ending on `ART.trayTotal`. Attempt 2 (of the reading phase).
   - **Wrong (34 / 43 / off-by-ten)**: nudge + tone; `ANIM.meet` slides both addend tags to the tray's centre and back, then the self-count replays. Attempt 2.
   - **Second wrong tile**: the replay again, then the correct tile gains the show-me ring; solved-with-help.
6. **A full worked session**: item 1 (30 + 40) 4 rods ✓, 70 ✓ · item 2 (20 + 30) ✓, 50 ✓ → step up · item 3 (L2: 40 + 60) 6 rods ✓, taps 10 ✗ (rods as ones) → replay 40, 50 … 100 → 100 ✓ (retried) → step down · item 4 (L1: 50 + 20) ✓ 70 ✓ · item 5 (60 + 30) ✓ 90 ✓ → step up · item 6 (L2: 20 + 70) places 6 rods ✗ → tag pulses, seven ghosts show one empty → 7 rods ✓, 90 ✓ · item 7 (L2: 50 + 50) ✓ 100 ✓ · item 8 (L2: 10 + 80) ✓ 90 ✓ → step up · items 9-10 (L3: 60 + 50 → 110 ✓; 80 + 40 → 120 ✓) → Finish.
7. **Finish**: `t("all_done")` (360, 110); the beaver (360, 200) `ANIM.celebrate` beside a stack of rods (`ART.rod` × 5 at x = 430 + i × 12, y = 200); the summary = the ten equations as chips (`ART.eqChip`, 130 × 36) in two rows of five (y = 350 / 400, x = 100 + i × 130) with tiny rods beneath each (`ART.miniRod` × total ÷ 10) — the visual summary; optional `t("question_x_of_y")` with n = first-try items at (360, 460); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  beaver:      { kind: "emoji", value: "🦫", size: 80, fallback: "🐿️" },       // Unicode 13 → squirrel fallback
  eqText:      { kind: "text",  value: "", size: 40, font: "display", color: "structure" },
  tray:        { kind: "shape", shape: "roundRect", w: 520, h: 130, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 16 },
  divider:     { kind: "shape", shape: "line", w: 2, stroke: "line", strokeWidth: 2 },                         // vertical, 110 tall, at x = 400
  addendTag:   { kind: "shape", shape: "roundRect", w: 72, h: 36, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 8 },   // numeral 24 px display ink
  rod:         { kind: "shape", shape: "rect", w: 16, h: 80, fill: "structure", stroke: "bg", strokeWidth: 1 },   // nine hairline notches (line token) 8 px apart
  ghostRod:    { kind: "shape", shape: "rect", w: 16, h: 80, stroke: "structure", strokeWidth: 2 },              // dashed (lineDash [6,4])
  groupGlow:   { kind: "shape", shape: "roundRect", w: 100, h: 96, stroke: "accent", strokeWidth: 3, radius: 10 },   // around the locked first-addend group; width = rods × 24 + 28 at runtime
  sourceTile:  { kind: "shape", shape: "roundRect", w: 120, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  rodLabel:    { kind: "text",  value: "10", size: 28, font: "display", color: "structure" },
  countBadge:  { kind: "shape", shape: "roundRect", w: 40, h: 22, fill: "bg", stroke: "structure", strokeWidth: 1, radius: 4 },   // numeral 14 px display structure
  trayTotal:   { kind: "text",  value: "", size: 44, font: "display", color: "structure" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 40 px display ink
  showRing:    { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },   // around OK; scaled to 108 × 108 around a total tile
  eqChip:      { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  miniRod:     { kind: "shape", shape: "rect", w: 4, h: 18, fill: "structure" },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The rod shape is identical to game 018's so the manipulative looks the same across the catalogue (F-48 "mirror physical manipulatives exactly"). Locked rods and placed rods are the same glyph; the locked group is marked by its tag and, on Check, by `ART.groupGlow` — position, not colour, tells them apart.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "rod source selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "a rod from the source to its tray position / back (x, y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused tenth rod; surplus rods over the ghosts; a wrong total tile" },
  badgeIn:   { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "count badges in turn, 250 ms apart (from alpha 0, scale 0.5)" },
  glow:      { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "groupGlow around the first addend at the start of a self-count (from alpha 0)" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the second addend's tag on a wrong rod count" },
  meet:      { x: 400, duration: 300, ease: "Sine.InOut", yoyo: true, hold: 400, trigger: "both addend tags slide to the tray centre and back (juxtaposition error)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the correct total tile" },
  nod:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "beaver on a correct total" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "ghost rods; total tiles; new item (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "badges, glow and ghosts clearing" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around OK or the correct total tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish beaver" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "1 of 10" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                  "30 + 40 = ?"  (360,92)                      │
      │ beaver   ┌──────[30]──────────┬──────[40]──────────┐ tags y=118│  zone A
      │ (70,190) │  | | |  locked     │  (rods placed here)│ tray      │
      │          │  x=180+i×24        │  x=430+j×24        │ (400,190) │
      │          └────────────────────┴────────────────────┘ 520×130  │
      │                       total (400,262)                          │
260   ├──────────────────────────────────────────────────────────────┤
      │        "Lay the rods, then check" (360,300)                   │
      │   [ rod 10 ]        [ 70 ]    [ 7 ]    [ 34 ]   y=390          │  zone B
      │   (140,390)         x=320    x=440    x=560   (96×96, hidden)  │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Left-area rod positions: x = 180 + i × 24 (i = 0 … 8); right-area: x = 430 + j × 24 (j = 0 … 8); the divider at x = 400. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.eqText` at (360, 92). Tray: `makeTile(scene, 400, 190, 520, 130, …)` with `ART.tray` tokens and `ART.divider` at x = 400; `ART.addendTag`s at (280, 118) and (520, 118) with the addend numerals; locked rods `ART.rod` at the left positions (not tiles); placed rods `ART.rod` at the right positions, each a small `makeTile` hit area 24 × 80 (removal target; a missed tap lands on the tray and places a rod only if the source is selected — the child can remove the extra one).
- Source: `makeTile` 120 × 120 with `ART.sourceTile` tokens; `ART.rod` at (−20, 0), `ART.rodLabel` at (+24, 0); selection persists across tray taps.
- Self-count: `ART.groupGlow` around the left group; `ART.countBadge` above each rod (rod centre + (0, −52)); `ART.trayTotal` at (400, 262).
- Ghosts: `ART.ghostRod` at each right-area position up to the addend's rod count. `ART.showRing` around OK (232 × 84) or around a total tile (scaled 108 × 108).
- Total tiles: `makeTile` 96 × 96 with `ART.numeralTile` tokens, numeral 40 px `THEME.font.display` `THEME.colour.ink`; hidden and disabled until the rods are right.
- Check: `makeButton` `ok` at (360, 510), alpha 0.5 while disabled. Caption `S("layTheRods")` / `S("whatIsTheTotal")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 300), `wordWrap` 520, max 2 lines.
- `ART.beaver` at (70, 190).
- Tap floors: source 120, tray 520 × 130, total tiles 96, OK 220 × 72, rod hit areas 24 × 80 (removal targets, as in game 018). Gaps ≥ 24 between total tiles.
- Tab order: source, tray, placed rods in placement order, OK; after the self-count the three total tiles left to right.
- During a self-count (≈ 0.25 × rods + 1 s) and a replay, every tile is `setEnabled(false)`.

## Content
Language-neutral (numerals only; two caption strings). Each item = (a + b; total; the three total tiles). Distractor classes: **ones** = rods counted as ones (total ÷ 10); **juxta** = the tens digits written side by side (30 + 40 → 34); **±10** = the total plus or minus ten. Every item's tiles = the total, the ones distractor, and one of juxta / ±10 as listed.

- **L1** (sums ≤ 90, first addend the larger or equal): 30 + 40 (70; 7, 34) · 20 + 30 (50; 5, 60) · 50 + 20 (70; 7, 52) · 40 + 40 (80; 8, 70) · 60 + 30 (90; 9, 63) · 50 + 10 (60; 6, 70) · 70 + 20 (90; 9, 72) · 30 + 30 (60; 6, 50)
- **L2** (either order; sums up to exactly 100): 40 + 60 (100; 10, 46) · 20 + 70 (90; 9, 80) · 30 + 50 (80; 8, 35) · 50 + 50 (100; 10, 90) · 10 + 80 (90; 9, 18) · 60 + 40 (100; 10, 110) · 20 + 60 (80; 8, 26) · 70 + 30 (100; 10, 90)
- **L3** (sums beyond 100, up to 150; the tray holds up to 9 + 9 rods): 60 + 50 (110; 11, 65) · 80 + 40 (120; 12, 110) · 70 + 60 (130; 13, 76) · 90 + 30 (120; 12, 130) · 50 + 70 (120; 12, 57) · 80 + 70 (150; 15, 140) · 60 + 90 (150; 15, 69) · 90 + 60 (150; 15, 160)

Play list of 10 per Rules (shuffle within level; levels in order; no item repeats); tile order shuffled per item; the correct tile is never in the same slot twice running. The first addend is always pre-laid; the second is always the one the child builds, even when it is the larger (L2/L3) — counting on from the given group is the strategy being practised.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive items first-try on BOTH phases (first Check right, first total tile right) → next level (cap L3).
- Adaptation: a wrong Check or a wrong total tile, or non-first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: placement phase — the self-count (group badge, then rising badges) and the total tiles appear; reading phase — `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items only), the equation completes, beaver `ANIM.nod`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Wrong number of rods placed (too few / too many for the second addend): `tone("nudge")`, the addend tag `ANIM.pulse`s, ghost rods show the exact count, surplus rods nudge; Check disabled until the tray changes.
  - Total tile = rods counted as ones (7 for 70): `ANIM.nudge`, `tone("nudge")`, the self-count replays 30, 40 … 70 with rising tones and the total.
  - Total tile = juxtaposed digits (34) or ±10 (60 / 80): nudge + tone; `ANIM.meet` on the two addend tags, then the self-count replays.
  - A tenth rod in the right area: refused with `ANIM.nudge`, no message, not an attempt. Tapping a locked left rod: nothing.
- Retry behaviour: per phase — attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring (around OK with the ghosts, or around the correct total tile); solved-with-help. No attempt 4 in either phase.
- Finish condition: 10 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Add Tens"; `layTheRods` = "Lay the rods, then check"; `whatIsTheTotal` = "What is the total?".

## Sound
`tone("tap")` on selecting the source; `tone("tap", 10 × (j + 1) mod 12)` when a rod lands (a big step per rod); `tone("tap", 3)` for the first-addend group badge then `tone("tap", k)` per rising badge (k = the tens count) in a self-count; `tone("correct")` on the correct total; `tone("nudge")` on a wrong Check or tile; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 1 of 10", All done, Play again, Menu, praise; the two captions once translated; the equation is symbols).
- [ ] Works at narrow width (400-px iframe: the tray with up to 18 rods, the source, three total tiles and OK fully visible).
- [ ] Keyboard operable (Tab: source, tray, placed rods, OK; then the total tiles; Enter selects / places / removes / checks / picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks and wrong tiles never end the session; the ring always completes the item).
- [ ] The first addend's rods are already in the tray and cannot be removed; only right-area rods can be tapped away.
- [ ] Tapping the source then the tray four times places four rods in the right area; a tenth rod springs back.
- [ ] Checking with three rods for 40 pulses the "40" tag and shows four dashed ghost rods with one empty.
- [ ] Checking with the right rods lights the first group under one "30" badge, then badges 40, 50, 60, 70 with rising notes, then "70" appears and three total tiles appear.
- [ ] Tapping 7 replays the count in tens; tapping 34 slides the two tags together before the replay.
- [ ] At level 3 a sum such as 80 + 70 shows "150" and the tray holds fifteen rods.
- [ ] Two clean items in a row bring sums to 100 and then beyond; a mistake brings smaller sums next.
- [ ] The finish screen shows ten equation chips with tiny rods beneath and no score beyond the optional "n of 10".
- [ ] If the beaver emoji is missing on the device a squirrel appears instead.
- [ ] With `?sound=off` nothing is audible; with sound on, each rod landing is a bigger step than the tap tone.
