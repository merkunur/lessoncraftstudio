# 134 — Five-Frame Flash

## Identity
- Slug: `five-frame-flash`
- Subject / topic: Mathematics / quantities 1-5 on a five-frame, held in mind after a brief look (subitising on a structured frame)
- Age band: `5-6`
- Interaction pattern: `P6` — build on a grid (a 1 × 5 frame; cells toggle; Check compares)
- Estimated build size: ~420 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P6. Content is language-neutral (counters and frames); no `LOCALE_DATA`. Nothing is spoken; the play screen carries no words. `[deliberate: five-frame precedes ten-frame; smaller range than game 003]`

## Learning
- Objective: Sees a five-frame holding 1-5 counters for a short moment, then builds the same quantity on an empty five-frame from memory and checks it.
- Prerequisites: Counts to 5; has tapped objects one at a time (game 001). No reading; no numerals are needed (the target is a picture, not a number).
- Curriculum links: F-1 (subitising in 13 of 15 sources), F-4 (subitising and the ten frame on the UK reception map), F-50 (frames are an evidence-backed manipulative), F-21, F-31 row "Count to 10-20, one-to-one, subitise to 5" — conservative 6, earliest 4 → 5-6 (US K.CC.B.4-5; England Reception ELG "subitise (recognise quantities without counting) up to 5"; Germany Klasse 1 "Zahlbilder im Fünferfeld"; France GS "reconnaissance globale de petites quantités"; Netherlands groep 1-2 "getalbeelden tot 5"; Spain Infantil; Brazil EI03ET07; Sweden förskoleklass "talbilder 0-5"; Finland esiopetus).
- Common misconceptions (F-101, F-50), each with this game's response:
  1. **Building one too many or one too few (the look was too short to count and the child guesses).** Response: on Check the cover lifts (`ANIM.coverUp`) and the two frames sit one above the other; matching cells link with `ART.pairLine`s; a missing cell in the child's frame gets `ART.needCell` pulsing where the flashed counter is; an extra cell's counter `ANIM.rise`s away. The difference is shown cell by cell — never "wrong".
  2. **Trying to count the flashed dots one by one and running out of time (the frame is meant to be seen as a shape: 3 is "two and one", 5 is "the full row").** Response: the flashed frame always fills from the left in the standard order (F-48/F-50), so every quantity has one fixed shape; L1 shows it for 1500 ms (long enough to count), L2 1000 ms, L3 700 ms (shape only) — the support fades as the child succeeds (F-46). After the first wrong Check the frame re-shows for 1500 ms whatever the level (the second look is the hint).
  3. **Scattered filling (cells tapped anywhere so the quantity is hard to read back).** Response: cells toggle freely (P6), but on Check the child's counters first pack to the left (`ANIM.pack`, each counter glides to the leftmost free cell) before the comparison, so 1-0-1-0-1 becomes 1-1-1-0-0 and reads as three; the child sees their own build take the standard shape.
  4. **Five seen as "a lot" and every big flash built as 5 (or 4).** Response: 4 and 5 both appear at every level, and the reveal of 4 shows the ONE empty cell at the right with `ART.emptyMark` (a small hollow ring) — "four is five with one missing" — so 4 and 5 become distinguishable by the gap.
  5. **Tapping a filled cell again expecting a second counter.** Response: a filled cell holds one counter; tapping it empties it (toggle); nothing else happens.

## How it plays
1. **Start screen**: title "Five-Frame Flash", the rabbit (`ART.rabbit`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 3)**: rail of 8 dots (§6; no numeric progress). Zone A: the flash frame — five `ART.cell`s (80 × 80, gap 8) in a row centred at (360, 150): cell centres x = 184, 272, 360, 448, 536; its counters `ART.counter` (r 28) fill from the left — 3 counters in cells 1-3. The rabbit sits at (90, 150) beside it. The whole flash frame is covered by `ART.cover` (a 456 × 96 teal card with `ART.eye` on it) EXCEPT during the flash: on item start the cover is up (`ANIM.coverUp`), the frame shows for 1500 ms, then the cover drops (`ANIM.coverDown`). Zone B: the build frame — five `makeTile` cells (`ART.cell`, 80 × 80) at y = 372, same x positions, all empty. Zone C: Check (`makeButton ok`) at (360, 510), disabled until at least one cell is filled; a look-again tile (`ART.lookTile`, 80 × 80, with `ART.eye`) at (620, 372) beside the build frame.
3. **Building**: the child taps a build cell → a counter appears (`ANIM.appear`, `tone("tap", k)` with k = filled count); tapping a filled cell removes its counter (`ANIM.rise`, `tone("tap", k)` at the new count). Check enables at the first counter. The look-again tile re-shows the flash frame for 1500 ms once per item (`ANIM.coverUp`, then `ANIM.coverDown`); it then dims (`setEnabled(false)`) for the rest of the item; using it makes the item count as helped (F-65), never as an error.
4. **Check**: tap OK.
   - The child's counters pack left (`ANIM.pack`, 120 ms apart) so the build frame shows the standard shape; then the cover lifts (`ANIM.coverUp`) and stays up: both frames are visible one above the other.
   - **Same quantity**: `ART.pairLine`s draw between matching cells top-to-bottom, one by one (200 ms apart, `tone("tap", k)`); the flash frame's counters `ANIM.pop` together; `tone("correct")`; praise pop (rotation); the rabbit `ANIM.hop`; the rail dot fills; after 800 ms both frames clear (`ANIM.rise` on all counters), the cover drops, and the next item flashes.
   - **Too few (2 built for 3)**: pair lines draw for the two matches; the third flash counter has no partner: `ART.needCell` pulses on the child's empty cell 3 (`ANIM.pulse`); `tone("nudge")`; the cover drops after 1500 ms; Check disables until the build frame changes. Attempt 2 — the child fixes the frame and checks again.
   - **Too many (4 built for 3)**: pair lines for three; the child's fourth counter `ANIM.rise`s away with `tone("tap", 3)` (descending) and `ART.emptyMark` appears in the flash frame's empty cell 4 for 900 ms; the cover drops; the item is NOT complete — the child checks again (attempt 2; the frame now holds 3).
   - **Second wrong Check**: the cover lifts and STAYS up (the flash frame stays visible), `ART.needCell` marks every cell that differs, and OK gains the show-me ring (`ART.showRing`, `ANIM.showMe`); when the child's frame matches and OK is tapped the item completes as solved-with-help (no praise pop).
5. **Items 2-8**: per Content/Rules. L1 quantities 1-5 shown 1500 ms; L2 1-5 shown 1000 ms; L3 shown 700 ms. Every level contains both 4 and 5.
6. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 200) `ANIM.celebrate`; the summary = eight small five-frames (`ART.miniFrame`, 60 × 14, cells 12 × 12) in a row at y = 400 (x = 360 − 3.5 × 76 + i × 76) showing each built quantity as filled squares — no score; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  rabbit:    { kind: "emoji", value: "🐰", size: 80 },
  eye:       { kind: "emoji", value: "👀", size: 40 },
  cell:      { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },
  counter:   { kind: "shape", shape: "circle", r: 28, fill: "structure" },
  cover:     { kind: "shape", shape: "roundRect", w: 456, h: 96, fill: "structure", radius: 14 },     // carries ART.eye at its centre
  pairLine:  { kind: "shape", shape: "line", w: 2, stroke: "structure", strokeWidth: 3 },             // vertical, from a flash cell's bottom to the build cell's top (length 134)
  needCell:  { kind: "shape", shape: "roundRect", w: 84, h: 84, stroke: "accent", strokeWidth: 4, radius: 12 },
  emptyMark: { kind: "shape", shape: "circle", r: 14, stroke: "accent", strokeWidth: 3 },             // the hollow ring in an empty flash cell
  lookTile:  { kind: "shape", shape: "roundRect", w: 80, h: 80, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },   // label ART.eye
  showRing:  { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  miniFrame: { kind: "shape", shape: "rect", w: 60, h: 14, stroke: "line", strokeWidth: 1 },         // finish summary; filled cells drawn as 10 × 10 structure squares
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The frame's outer border is a `THEME.colour.structure` 3 px rectangle 456 × 96 drawn behind each row of cells. Filled state = `ART.counter` (a solid disc) — a shape, not a colour change, so state is never colour-only.

## Animation registry
```js
const ANIM = {
  coverUp:   { y: "-=110", alpha: 0, duration: 250, ease: "Sine.In", trigger: "cover lifts off the flash frame (item start, look-again, Check)" },
  coverDown: { y: "+=110", alpha: 1, duration: 250, ease: "Sine.Out", trigger: "cover drops after the flash (1500 / 1000 / 700 ms) and after a wrong Check" },
  appear:    { alpha: 1, scale: 1, duration: 160, ease: "Back.Out", trigger: "a counter placed; the flash frame's counters (from alpha 0, scale 0.6)" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "a counter removed (undo, too-many correction, frame clear)" },
  pack:      { duration: 220, ease: "Sine.InOut", trigger: "each build counter glides to the leftmost free cell, 120 ms apart (x set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "flash counters on a matching Check" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "needCell outline on a missing cell" },
  hop:       { y: "-=18", duration: 140, ease: "Sine.Out", yoyo: true, trigger: "rabbit on a match" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around OK during show-me (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```
No flashing: the flash is ONE show and ONE hide per look (never a blink); `showMe` cycles at 1 Hz.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                 ○ ○ ○ ○ ○ ○ ○ ○  rail y=28              │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  rabbit     ┌────┬────┬────┬────┬────┐  flash frame y=150     │
      │  (90,150)   │ ●  │ ●  │ ●  │    │    │  (covered between looks)│  zone A
      │             └────┴────┴────┴────┴────┘  x=184..536, 80×80     │
      │             ▓▓▓▓▓▓▓▓▓▓ cover (360,150) ▓▓▓▓▓▓▓▓▓▓             │
260   ├──────────────────────────────────────────────────────────────┤
      │             ┌────┬────┬────┬────┬────┐  build frame y=372     │
      │             │    │    │    │    │    │  (tiles)   [look] (620,372)│  zone B
      │             └────┴────┴────┴────┴────┘                        │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ]  (360,510)                      │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. During a comparison the pair lines run from y = 190 to y = 332 between matching cells.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`. No numeric progress (5-6 band).
- Flash frame: 5 × `ART.cell` (not tappable) at y = 150, x = 184 / 272 / 360 / 448 / 536, with `ART.counter`s in cells 1..n; `ART.cover` centred (360, 150) with `ART.eye` centred on it; the cover is above the frame in depth order.
- Build frame: 5 × `makeTile` 80 × 80 with `ART.cell` tokens at y = 372, same x; a filled cell draws `ART.counter` centred on it.
- `ART.lookTile` (`makeTile` 80 × 80 with `ART.eye` as its label) at (620, 372); alpha 0.5 when used up.
- `ART.needCell` over a build cell; `ART.emptyMark` in an empty flash cell; `ART.pairLine`s between matched cells; `ART.showRing` around OK.
- Check `makeButton` `ok` at (360, 510); alpha 0.5 while disabled.
- `ART.rabbit` at (90, 150). Tap floors 80 ≥ 80 (5-6); gaps 8 inside the frame (a mis-tap on the neighbour cell is a toggle the child can see and undo), 76 to the look tile.
- Keyboard: Left / Right arrows move between build cells, Enter toggles; Tab reaches the look tile and OK; Enter activates. During a flash, a pack or a comparison (≤ 2.5 s) the build cells and OK are `setEnabled(false)`. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items = the flashed quantity; every level holds 4 and 5.
- **L1** (shown 1500 ms): 3 · 2 · 5 · 4 · 1
- **L2** (shown 1000 ms): 4 · 2 · 5 · 3 · 4 · 1 · 5
- **L3** (shown 700 ms): 5 · 3 · 4 · 2 · 5 · 4 · 3

Play list of 8 per Rules; the same quantity never comes twice running; 4 and 5 each appear at least once in every session.

Worked example: item 1 (L1: 3) builds 3, Check → three pair lines, match · item 2 (L1: 5) builds 5 → match → L2 · item 3 (L2: 4) builds 5 → pair lines for four, the fifth counter rises away and the empty ring shows in flash cell 5; Check again → match (helped) → L1 · item 4 (L1: 2) match · item 5 (L1: 4) uses look-again, builds 4 → match (helped) · item 6 (L1: 1) match · item 7 (L1: 5) match → L2 · item 8 (L2: 3) match → Finish shows eight mini frames 3, 5, 4, 2, 4, 1, 5, 3.

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive first-Check matches without look-again → next level (cap L3).
- Adaptation: a wrong Check, or a helped item on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: pack, cover up, pair lines cell by cell with rising tones, `ANIM.pop` on the flash counters, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rabbit `ANIM.hop`, rail dot, frames clear, next flash after 800 ms.
- What happens on a wrong answer:
  - Too few (short look / guessed low): pair lines for the matches, `ART.needCell` pulses on the missing cells, `tone("nudge")`, cover drops after 1500 ms (the second look), Check disabled until the frame changes.
  - Too many (guessed high / 4 built as 5): pair lines, the extra counters rise away with descending tones, `ART.emptyMark` in the flash frame's empty cell, cover drops; Check again.
  - Scattered cells: not an error — the pack shows the standard shape before the comparison.
  - Second wrong Check: the cover stays up, every differing cell is marked, OK carries the show-me ring; matching the frame and tapping OK completes the item as solved-with-help.
- Retry behaviour: attempt 1 → attempt 2 after the enacted comparison (with a second look) → attempt 3 with the flash frame left visible and the ringed OK; solved-with-help. No attempt 4. Look-again is free once per item (the item counts as helped).
- Finish condition: 8 items. No losing state; no clock of any kind — the flash duration is a fixed display time, never a race.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Five-Frame Flash". No words on the play screen.

## Sound
`tone("tap", k)` on each counter placed / removed (k = current count) and per pair line during a comparison; `tone("tap")` on look-again; `tone("correct")` on a match; `tone("nudge")` on a mismatch; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (OK, All done, Play again, Menu and praise change; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: both frames, the look tile and OK visible and tappable).
- [ ] Keyboard operable (Left / Right move between build cells, Enter toggles; Tab reaches the look tile and OK).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; with the flash frame left visible, matching it and tapping OK always completes the item).
- [ ] At item start the top frame is uncovered for a short moment and then covered; the counters always fill from the left.
- [ ] Tapping an empty build cell places one counter; tapping it again removes it; OK is dimmed while the build frame is empty.
- [ ] The look tile shows the top frame once more, then dims for the rest of the item.
- [ ] On OK a scattered build (cells 1, 3, 5) packs to the left before the top frame is uncovered.
- [ ] Building 2 for a flash of 3 draws two linking lines and a pulsing coral outline on the third build cell; the cover then returns.
- [ ] Building 5 for a flash of 4 draws four lines, floats the fifth counter away and shows a hollow ring in the top frame's empty cell.
- [ ] Two clean matches in a row make the next flash shorter; a wrong Check makes it longer again.
- [ ] The finish screen shows eight tiny frames matching the built quantities and no score.
- [ ] With `?sound=off` nothing is audible.
