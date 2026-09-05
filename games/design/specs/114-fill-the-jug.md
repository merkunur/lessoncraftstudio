# 114 — Fill the Jug

## Identity
- Slug: `fill-the-jug`
- Subject / topic: Mathematics / capacity — filling a container to a marked level by counting cupfuls (empty, half, full; a wider jug needs more cups)
- Age band: `5-6`
- Interaction pattern: `P9` — set a value (+/− stepper form, the only P9 form allowed at 5-6) with a Check
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P9 (stepper). Content is language-neutral (a jug, a line, cups; no units, no numerals); no `LOCALE_DATA`. The play screen carries three words.

## Learning
- Objective: Pours cupfuls into a jug one tap at a time until the water level meets a marked target line exactly (not below, not above), and sees that the same line height needs more cups in a wider jug.
- Prerequisites: Can tap a tile; understands "more" and "less" of a liquid. No reading, no counting required (the cup marks under the jug can be compared by length).
- Curriculum links: F-114 (unit iteration; "bigger unit → bigger number" and its capacity twin "wider container → more cups"; response = units laid one by one, the gap shown), F-103 (bigger object = more: the wide jug at L3 makes width and count separate quantities), F-21 ("mass/capacity introduced" in all 12 systems), F-31 row "Mass / capacity" — conservative 7-8, earliest 6; levelled 5-6 because the task is comparison and iteration with an informal unit, never a standard unit (US K.MD.A.1-2 "describe measurable attributes … directly compare"; England Reception ELG / Y1 "compare, describe and solve practical problems for capacity and volume (full/empty, more than, less than, half, half full, quarter)"; Germany Klasse 1 "Rauminhalte vergleichen"; France GS "comparer des contenances"; Netherlands groep 1-2 "inhoud: vol/leeg/half"; Spain Infantil "lleno/vacío"; Brazil EI03ET01 "capacidade"; Sweden förskoleklass "jämförelser av volym"; Finland esiopetus).
- Common misconceptions (F-114, F-103, F-101), each with this game's response:
  1. **Stopping when it "looks about right" (one cup short of the line, or one over).** Response: on Check the exact difference is enacted — below the line, hollow cup ghosts (`ART.cupGhost`) stack in the gap between the water and the line, one per missing cup (`ANIM.ghostIn`); above the line, the water above the line is banded in `ART.overBand` and the extra cup marks under the jug pulse. The child sees how many cups the error is and adjusts.
  2. **Keeps pouring past the top (overfilling the container).** Response: the jug refuses (F-61): a + tap at capacity produces `ART.splash` at the rim (`ANIM.splash`) and the level does not change; no message, no sound but the splash's own `tone("tap")`.
  3. **Same line height = same number of cups, whatever the jug (width ignored).** Response: L3 uses a WIDE jug in which each cupful raises the level less; a line at the same visual height as an L2 line needs more cups; the cup marks under the jug (`ART.cupMark`, one per cup poured) make the count visible, and on Check the marks count themselves with rising tones so "9 cups" and "6 cups" are heard as well as seen.
  4. **Counting taps, not cups (rapid double taps during a pour).** Response: the stepper tiles disable for the 220 ms of each pour, so every accepted tap is exactly one cup, one cup mark and one rising tone (one-to-one enforced by the object, F-101).
  5. **Pouring out too far (the − tile at empty).** Response: nothing happens (refused, no message).

## How it plays
1. **Start screen**: title "Fill the Jug", the otter (`ART.otter`) at (360, 200), Start button, language picker (hidden under `?embed=1`).
2. **Item 1 (L1: narrow jug, line at 6 cups = full)**: rail of 8 dots at y = 28 (§6; no numbers for this band). Zone A: the jug (`ART.jugBody`, outer 150 × 200, inner fill area 120 × 180 spanning y = 70 … 250) centred at (360, 160) with its spout/handle (`ART.jugHandle`) on the right; the target line (`ART.targetLine`, a dashed accent line across the inner width) at the target height — here y = 70, the very top of the fill area — with `ART.lineArrow` (a small accent triangle) pointing at it from the left, outside the jug at x = 270. The water (`ART.water`) is a rectangle rising from the jug's bottom (y = 250) whose height = cups poured × 30 px; it starts at 0 (empty). The otter sits at (140, 200) holding the cup (`ART.cup`, drawn at (200, 200)). Under the jug at y = 262 the cup marks row (`ART.cupMark`, small cup glyphs 18 px apart, one per cup poured, centred under the jug) — empty now. Zone B: the prompt at (360, 296): `ART.targetIcon` (a mini jug with a dashed line and an arrow — the same picture as the big prompt) beside `S("toTheLine")` ("To the line") at 28 px `THEME.font.display` `THEME.colour.structure`; below it the stepper: the − tile (`makeTile` 96 × 96, `ART.stepTile` tokens, label `ART.cupOut` — a tipped cup pouring out) at (240, 400) and the + tile (`ART.cupIn` — an upright full cup) at (480, 400). Zone C: Check (`makeButton ok`) at (360, 510), enabled from the start.
3. **Pouring**: tap + → the cup at the otter's paw tips (`ANIM.cupTip`), the water rises one cup (`ANIM.pour`: the water's height tweens +30 over 220 ms), a cup mark appears under the jug (`ANIM.markIn`), `tone("tap", k)` for the k-th cup (pitch climbs with the level, F-213). Tap − → the water drops one cup (`ANIM.pour` reversed), the last cup mark fades (`ANIM.markOut`), `tone("tap", k − 1)`. At capacity, + makes `ART.splash` at the rim (`ANIM.splash`) and nothing else; at empty, − does nothing. During a pour both tiles are `setEnabled(false)`.
4. **Check**: tap OK.
   - **Level meets the line**: the target line glows (`ANIM.lineGlow`: the dashed line's alpha and scale pulse once), the water surface settles (`ANIM.settle` on the water: a small scale-y wobble), `tone("correct")`; the cup marks count themselves once (each `ANIM.markPop` in turn with `tone("tap", k)`) so the count is modelled; `GameCore.showPraise` (next key in rotation); the otter `ANIM.cheer` (angle wobble); rail dot fills; after 900 ms the next item builds (the jug empties with `ANIM.drain`, the new line `ANIM.appear`s). First-try correct.
   - **Below the line**: `tone("nudge")`; `ART.cupGhost`s stack in the gap between the water surface and the line, one per missing cup (`ANIM.ghostIn`, 200 ms apart, bottom first), and stay; the otter `ANIM.peer` (leans toward the jug). The child pours more and checks again. Attempt 2.
   - **Above the line**: `tone("nudge")`; the water above the line is overlaid by `ART.overBand` (accent, 35 % alpha) and the extra cup marks under the jug `ANIM.pulse`; the otter `ANIM.peer`. The child pours out and checks again. Attempt 2.
   - **Second wrong Check**: the cue again, then the show-me: the stepper tile that moves the level toward the line (+ when below, − when above) gains the show-me ring (`ART.showRing`, `ANIM.showMe`); the ring moves to OK when the level meets the line; checking then completes the item as solved-with-help (no praise pop; the marks still count themselves).
5. **Items 2-8**: per Content/Rules. L1: the narrow jug, lines at full (6 cups) and at 1 cup (near-empty), so the two extremes are met first; L2: the narrow jug, lines at 2, 3 (half), 4, 5 cups; L3: the WIDE jug (`ART.wideJug`, inner 180 × 180, 9 cups of 20 px), lines at 3, 6 and 9 cups (the L3 "full" line is at the same height as the L1 "full" line but needs 9 cups).
6. **Finish**: `t("all_done")` (360, 110); the otter (360, 200) `ANIM.celebrate`; the summary = the eight jugs drawn small (`ART.miniJug`, 30 × 40, or 44 × 40 for the wide jug) in a row at y = 400 (x = 360 − 3.5 × 80 + i × 80), each filled (`ART.miniWater`) exactly to its line — a row of jugs filled right, not a score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5 minutes (8 items × 25-45 s).

## Art registry
```js
const ART = {
  otter:      { kind: "emoji", value: "🦦", size: 80, fallback: "🐻" },   // Unicode 11 otter; bear fallback for old devices
  jugBody:    { kind: "shape", shape: "roundRect", w: 150, h: 200, fill: "surface", stroke: "structure", strokeWidth: 4, radius: 16 },   // narrow jug; inner fill area 120 × 180
  wideJug:    { kind: "shape", shape: "roundRect", w: 210, h: 200, fill: "surface", stroke: "structure", strokeWidth: 4, radius: 16 },   // wide jug; inner fill area 180 × 180
  jugHandle:  { kind: "shape", shape: "arc", r: 34, stroke: "structure", strokeWidth: 6 },        // half-ring on the jug's right side, from −90° to 90°
  water:      { kind: "shape", shape: "rect", w: 120, h: 30, fill: "structureSoft" },             // h = cups × 30 (narrow) or cups × 20 (wide); w = inner width; a 3-px structure line along its top edge
  targetLine: { kind: "shape", shape: "line", w: 120, stroke: "accent", strokeWidth: 3 },          // dashed (lineDash [8,6]); w = inner width
  lineArrow:  { kind: "shape", shape: "polygon", points: [[-12,-9],[12,0],[-12,9]], fill: "accent" },
  cup:        { kind: "shape", shape: "roundRect", w: 36, h: 40, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 6 },   // the otter's cup; a structureSoft inner rect shows it full
  cupMark:    { kind: "shape", shape: "roundRect", w: 14, h: 16, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 3 },
  cupGhost:   { kind: "shape", shape: "roundRect", w: 36, h: 26, stroke: "accent", strokeWidth: 2, radius: 4 },   // dashed; one per missing cup, stacked in the gap (h = 26 narrow / 16 wide)
  overBand:   { kind: "shape", shape: "rect", w: 120, h: 30, fill: "accent" },                   // 35 % alpha over the water above the line; h = excess × cup height
  splash:     { kind: "shape", shape: "circle", r: 8, fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // three of these arc up from the rim
  targetIcon: { kind: "shape", shape: "roundRect", w: 26, h: 34, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 5 },   // mini jug with a 2-px dashed accent line across its middle and a 6-px accent triangle at its left
  stepTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  cupIn:      { kind: "shape", shape: "roundRect", w: 40, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 6 },   // upright full cup + a 20-px structure arrow pointing down beneath it
  cupOut:     { kind: "shape", shape: "roundRect", w: 40, h: 44, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 6 },         // the same cup rotated 40° with a 20-px structure arrow pointing up beside it
  showRing:   { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniJug:    { kind: "shape", shape: "roundRect", w: 30, h: 40, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 5 },
  miniWater:  { kind: "shape", shape: "rect", w: 26, h: 20, fill: "structureSoft" },             // h = level fraction × 36
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No other emoji or shape parameters appear anywhere in the game. The two stepper glyphs differ by orientation AND by the arrow's direction, never by colour alone; the target line differs from the water's top edge by dash pattern AND colour.

## Animation registry
```js
const ANIM = {
  pour:      { duration: 220, ease: "Sine.Out", trigger: "water rect height +/− one cup (height and y set at call so the bottom stays fixed)" },
  cupTip:    { angle: -50, duration: 110, ease: "Sine.InOut", yoyo: true, trigger: "the otter's cup tips on each + tap" },
  markIn:    { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "a cup mark appears under the jug (from alpha 0, scale 0.5)" },
  markOut:   { alpha: 0, scale: 0.5, duration: 150, ease: "Sine.In", trigger: "the last cup mark removed on a − tap" },
  markPop:   { scale: 1.3, duration: 120, ease: "Back.Out", yoyo: true, trigger: "cup marks in turn during the self-count, 200 ms apart" },
  splash:    { y: "-=30", alpha: 0, duration: 300, ease: "Sine.Out", trigger: "three splash drops rising from the rim on a + tap at capacity (x offsets −20, 0, +20)" },
  lineGlow:  { scaleY: 2.5, alpha: 1, duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "target line on a correct Check (from alpha 0.8)" },
  settle:    { scaleY: 0.96, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "water surface wobble on a correct Check" },
  ghostIn:   { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "each missing-cup ghost in the gap, 200 ms apart, bottom first (from alpha 0, scale 0.6)" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "extra cup marks when the level is above the line; the prompt icon after 8 s idle" },
  peer:      { angle: 12, duration: 200, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "otter leans toward the jug on a wrong Check" },
  cheer:     { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "otter on a correct Check" },
  drain:     { scaleY: 0, duration: 300, ease: "Sine.In", trigger: "water empties between items (origin at the bottom)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new target line and arrow; new jug at L3 (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "ghosts, over band and cup marks when the next item builds" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the helpful stepper tile, then around OK (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish otter" }
};
```
No flashing: `showMe` at 1 Hz; `lineGlow` plays once.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    ┌────────┐                                │
      │            > ‑ ‑ ‑ │‑ ‑ ‑ ‑ │ target line (dashed) + arrow   │  zone A
      │  otter (140,200)   │        │) handle                        │
      │      cup (200,200) │~~water~│  jug (360,160), fill 120×180   │
      │                    └────────┘                                │
      │                    u u u u  cup marks y=262                   │
260   ├──────────────────────────────────────────────────────────────┤
      │            [icon] To the line  (360,296)                     │
      │        [ − cup ]              [ + cup ]   y=400, 96×96        │  zone B
      │        (240,400)              (480,400)                      │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The wide jug (L3) is centred at the same point; its inner area spans x = 270 … 450. Cup marks for 9 cups span 162 px, still under the jug.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22) → `ART.dotFull`. No numerals anywhere on the play screen.
- Jug: `ART.jugBody` (L1-L2) or `ART.wideJug` (L3) centred (360, 160), `ART.jugHandle` at the jug's right edge; the inner fill area's bottom is y = 250 and its top y = 70. `ART.water` anchored at the bottom (origin 0.5, 1) at (360, 250), height = cups × cupHeight (30 narrow, 20 wide). `ART.targetLine` across the inner width at y = 250 − target × cupHeight, `ART.lineArrow` at (270, same y) for the narrow jug and (240, same y) for the wide jug, pointing right.
- `ART.otter` at (140, 200); `ART.cup` at (200, 200). `ART.cupMark`s at y = 262, x = 360 − (n − 1) × 9 + i × 18 for n cups poured.
- Cue shapes: `ART.cupGhost`s stacked from the water surface upward, centred x = 360, heights = cupHeight − 4; `ART.overBand` from the line down to the water surface, alpha 0.35; `ART.splash` drops from (360, 70).
- Prompt: `ART.targetIcon` at (290, 296) and `S("toTheLine")` centred at (390, 296), 28 px `THEME.font.display` `THEME.colour.structure`, `wordWrap` 240, max two lines.
- Stepper: `makeTile` 96 × 96 (`ART.stepTile`) at (240, 400) with `ART.cupOut`, and at (480, 400) with `ART.cupIn`; `ART.showRing` around whichever is ringed, or around OK (ring 232 × 84 is drawn by scaling `ART.showRing` in x — set at call). Check `makeButton ok` at (360, 510).
- Keyboard: Right arrow / Up arrow = + cup, Left / Down = − cup (P9 rule), Enter checks; Tab also reaches −, +, OK. Tap floors 96 ≥ 80; gap 144.
- Under `?embed=1` the picker is not created; nothing else changes.

## Content
Language-neutral. An item = (jug; target in cups; the line's height in px above the jug's bottom). Narrow jug: cup = 30 px, capacity 6; wide jug: cup = 20 px, capacity 9.
- **L1** (narrow; the extremes): (narrow; 6 = full; 180) · (narrow; 1; 30) · (narrow; 6; 180) · (narrow; 1; 30)
- **L2** (narrow; middle levels): (narrow; 3 = half; 90) · (narrow; 2; 60) · (narrow; 4; 120) · (narrow; 5; 150) · (narrow; 3; 90)
- **L3** (wide; same line heights as L1/L2 but more cups): (wide; 9 = full; 180) · (wide; 3; 60) · (wide; 6; 120) · (wide; 9; 180)

Play list: 8 items; start at L1; shuffled within the level without repeats (the duplicated L1 entries are there so a child who stays at L1 meets each extreme twice); level changes per Rules; if a pool is exhausted it is reshuffled. Two consecutive items never share a target. Every item starts with an empty jug.

Worked example: item 1 (narrow, full) pours 6 cups, checks → the line glows, the six marks pop in turn; praise · item 2 (narrow, 1 cup) first-try → L2 · item 3 (narrow, 3) pours 2, checks → one dashed ghost cup sits between the water and the line; pours 1 more, checks → correct (helped) → L1 · item 4 (narrow, full) pours 7 → the seventh cup splashes at the rim and the level stays; checks → first-try · item 5 (narrow, 1) first-try → L2 · item 6 (narrow, 4) first-try · item 7 (narrow, 5) first-try → L3 · item 8 (wide, full) pours 6 (as for the narrow jug), checks → three ghost cups in the gap; pours 3 more; correct (helped) → Finish shows eight small jugs filled to their lines, the last one wider.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-Check correct items → next item from the next level up (cap L3).
- Adaptation: a wrong Check on an item, or wrong first-Check on 2 consecutive items → next item one level down (floor L1). The current item is never abandoned.
- Stuck rule (an inactivity cue, never a clock): if 8 s pass with no tap, `ART.targetIcon` in the prompt `ANIM.pulse`s once and the + tile `ANIM.pulse`s once (this also demonstrates the mechanic on item 1); repeats every 8 s. Nothing about time is shown; nothing ends.
- What happens on a correct answer: `ANIM.lineGlow`, `ANIM.settle`, `tone("correct")`, the cup marks count themselves with `ANIM.markPop` and rising tones, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], otter `ANIM.cheer`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Level below the line (stopped when it looked right / lost count): `tone("nudge")`; one dashed `ART.cupGhost` per missing cup stacks in the gap and stays; otter `ANIM.peer`; the child pours more and checks again.
  - Level above the line (kept pouring): `tone("nudge")`; `ART.overBand` over the excess, the extra cup marks pulse; otter `ANIM.peer`; the child pours out and checks again.
  - + at capacity: refused with `ART.splash`; no attempt is counted.
  - − at empty: nothing happens; no attempt is counted.
  - Wide jug filled with the narrow jug's count (6 for a full wide jug): the below-the-line cue shows three ghost cups — the width lesson is enacted, not explained.
- Retry behaviour: attempt 1 → attempt 2 after the ghosts / over band → attempt 3 with the show-me ring on the helpful stepper tile and then on OK; checking at the line completes the item as solved-with-help. No attempt 4 (the ring simply stays until the level meets the line).
- Finish condition: 8 items. No losing state; no clock of any kind.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Fill the Jug"; `toTheLine` = "To the line" (three words, paired with `ART.targetIcon`). No other text on the play screen.

## Sound
`tone("tap", k)` on the k-th cup poured (pitch climbs with the level, F-213) and `tone("tap", k − 1)` on a cup poured out; `tone("tap")` on a splash; `tone("correct")` on a correct Check with `tone("tap", k)` per cup mark in the self-count; `tone("nudge")` on a wrong Check; `tone("finish")` once. Silent under `?sound=off`; no audio files. The ghosts and the band carry the meaning; sound never does alone.

## Testing checklist
- [ ] Works in all 11 languages (OK, All done, Play again, Menu and praise change with the picker; "To the line" once translated).
- [ ] Works at narrow width (400-px iframe: the jug, the arrow, the otter, both stepper tiles and OK visible; the wide jug does not overlap the otter).
- [ ] Keyboard operable (Right/Up pours a cup, Left/Down pours one out, Enter checks; Tab reaches −, +, OK).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong Checks still ends at the line via the ringed tile and ringed OK).
- [ ] Each + tap raises the water by exactly one cup, adds one cup mark under the jug and plays a higher note than the last.
- [ ] Tapping + when the jug is full makes a splash at the rim and the water does not rise.
- [ ] Checking one cup below the line shows one dashed ghost cup between the water and the line; checking one above tints the extra water coral and pulses the extra mark.
- [ ] Checking exactly at the line makes the line glow and the cup marks pop one by one.
- [ ] At the third level the jug is wider, a full jug takes 9 cups, and a line at the middle takes 6.
- [ ] Two first-Check corrects in a row bring middle levels, then the wide jug; a wrong Check brings the extremes again.
- [ ] No numeral, unit or score appears anywhere in the game.
- [ ] The finish screen shows eight small jugs each filled to its line and no score.
- [ ] With `?sound=off` nothing is audible.
