# 179 — Thousand Line

## Identity
- Slug: `number-to-1000-line`
- Subject / topic: Mathematics / placing three-digit numbers on a 0-1000 number line marked in hundreds (and, at the top level, in tens inside the zoomed hundred)
- Age band: `8-9`
- Interaction pattern: `P9` — set a value (tap the segment of the line where the number lies; drag of the marker also accepted; Check)
- Estimated build size: ~500 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P9 (tap-the-tick form with a Check; every control has a discrete tap alternative). The tappable units are the ten SEGMENTS between hundred ticks (a three-digit number that is not a multiple of 100 never sits ON a tick), so "nearest tick" in the catalogue row means "the hundred just below" — the start of the segment the child taps. Content is language-neutral (numerals only).

## Learning
- Objective: Reads a three-digit number and taps the hundred-segment of a 0-1000 line in which it lies (346 → between 300 and 400), then at the top level the ten-segment inside the zoomed hundred (340 – 350), and checks it.
- Prerequisites: Reads three-digit numerals; knows 100, 200 … 1000 in order (games 038, 041); has placed numbers on a 0-100 line (game 177 territory).
- Curriculum links: F-108 (place value — digits as independent numbers; zero placeholder ignored; syntactic transcoding; de/nl/da inverted tens and ones), F-31 row "Numbers to 1000; +/− 3-digit" — conservative 8-9, earliest 6-7 → 8-9 (US 2.NBT.A.1 / 2.MD.B.6 "represent whole numbers … on a number line diagram"; England Y3 "identify, represent and estimate numbers … number line to 1000"; Germany Klasse 3 "Zahlenraum bis 1000, Zahlenstrahl"; France CE2 "placer des nombres sur une droite graduée"; Netherlands groep 5 "getallenlijn tot 1000"; Spain 2º ciclo; Brazil EF03MA01; Sweden åk 3; Denmark 3. klasse "tal op til 1000"; Norway 3. trinn; Finland grade 3), F-21, F-114 (ticks counted instead of intervals).
- Common misconceptions (F-108, F-114, F-103), each with this game's response:
  1. **Digits as independent numbers — 346 placed in the 400s or the 600s because of the 4 or the 6.** Response: `ART.digitHi` outlines the HUNDREDS digit on the target card while three small hundred-squares (`ART.miniHundred`) appear under it; then the line zooms into the hundred the child chose (`ANIM.zoomIn`) — the number is NOT there: `ART.ghostNumeral` "346" slides in at the zoomed line's left edge with `ART.offArrow` pointing further left ("it lies before 400"); zoom out; the marker stays where the child left it.
  2. **Counting ticks instead of intervals — 300 … 399 placed in the segment after the THIRD tick counted from 1 (i.e. 200 – 300) (F-114).** Response: the hundred tags count themselves 100, 200, 300 from the left (`ANIM.grow` on each `ART.hundredTag`, `tone("tap", k)`), then the zoom into the chosen hundred with the ghost numeral off its edge.
  3. **"398 is nearly 400, so it goes in the 400s" (F-103 rounding confused with placing).** Response: the zoom into 400 – 500 shows the ghost "398" just off the LEFT edge, one small step before the 400 tag, which `ANIM.pulse`s; at L3 the ten-segment stage makes the same point inside the hundred (398 sits in 390 – 400).
  4. **Transcoding — 306 read as 36, placed in 0 – 100; 105 placed by "one hundred and five" logic in the 100s but at the ten-segment "150" (L3).** Response: the zoom into 0 – 100 shows the ghost "306" off the RIGHT edge with the arrow pointing right; at L3 the ten-segment cue shows the tens ticks 100, 110 … and the ghost at 105 between 100 and 110.
  5. **Inverted tens and ones (de/nl/da: "dreihundertsechsundvierzig" → 364 → ten-segment 360 – 370 at L3).** Response: the ten-stage cue: `ART.digitHi` moves to the TENS digit of the target and the zoomed hundred shows the ghost at 346 inside 340 – 350; the layout hundreds-tens-ones is the anchor, never the word.

## How it plays
1. **Start screen**: title "Thousand Line", the owl (`ART.owl`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: 346)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the target card (`ART.targetCard`, 160 × 110) at (360, 130) with `ART.bigNumeral` "346" (56 px); the owl at (110, 140). Zone B: the line — `ART.lineBar` from x = 40 to x = 680 at y = 380 with eleven hundred ticks (`ART.tick`) at x = 40 + 64 × i and their tags (`ART.hundredTag`: 0, 100, … 1000, 16 px) at y = 412; between consecutive ticks a segment tile (`ART.segTile`, 52 × 56, `makeTile`, a faint band) centred at x = 72 + 64 × i, y = 380 — ten segments; no marker yet. Zone C: Check (`makeButton ok`) at (360, 510), disabled until a segment is chosen. Caption `S("whereIsIt")` ("Where does it go?") at (360, 290), 22 px `THEME.colour.inkSoft`.
3. **Placing**: tap a segment → the marker (`ART.marker`, a coral triangle pointing down onto the line) glides (`ANIM.glide`) to that segment's midpoint and the segment's band shows the selected look; `tone("tap", i)` (i = the segment index). Dragging the marker moves it live along y = 380 and snaps to the nearest segment midpoint on release (`ANIM.snap`). Nothing is judged while placing. Check enables at the first placement.
4. **Check**: the child taps OK.
   - **Correct (L1/L2 — the 300 – 400 segment)**: the marker locks (`ART.markerLocked`, `ANIM.pop`), `tone("correct")`; the **confirm zoom**: the line container scales horizontally about the segment (`ANIM.zoomIn`, ×10 so 300 – 400 spans x = 40 … 680), the ten tens ticks (`ART.tenTick`) and their tags (`ART.tenTag` 300, 310 … 400) appear, and a fine marker (`ART.fineMarker`) drops at the number's exact position (`ANIM.drop`, `tone("tap", 6)`); hold 900 ms; zoom back (`ANIM.zoomOut`) keeping the locked marker; praise pop (next key in rotation; first-try items only); the owl `ANIM.nod`s; rail dot fills; next item after 900 ms (the line clears, `ANIM.appear` on the new card).
   - **Correct at L3 (hundred stage)**: the marker locks and the line zooms in — and STAYS zoomed: the ten segments now stand for 300 – 310 … 390 – 400 (the same ten `ART.segTile`s, re-labelled by the ten tags) and the caption changes to `S("nowTheTens")` ("Now the tens"); the child taps the ten-segment (340 – 350) and checks again. Correct → `ART.fineMarker` locks at 346 inside it, `tone("correct")`, praise, zoom out with both markers; item done. Wrong → the ten-stage cue (Rules) and attempt 2 within the stage.
   - **Wrong (hundred stage)**: `tone("nudge")`; the marker stays where the child left it (P9); the enacted cue for the error class (Rules): `ART.digitHi` on the target's hundreds digit with `ART.miniHundred` squares, and/or the hundred tags counting up; then the line zooms into the CHILD'S segment (`ANIM.zoomIn`), its tens ticks appear, and `ART.ghostNumeral` slides in from the edge the number lies beyond (`ANIM.slideGhost`) with `ART.offArrow` pointing onward; if the number lies within 10 of that segment's edge (398 vs 400) the edge tag `ANIM.pulse`s; hold 1.2 s; zoom out. Check re-enables when the marker moves. Attempt 2.
   - **Second wrong Check**: the cue again, then the correct segment gains the show-me ring (`ART.showRing`, `ANIM.showMe`) and the marker glides there by itself (`ANIM.glide`, 800 ms); OK completes the stage as solved-with-help (no praise pop).
5. **Re-queue** (F-41): an item wrong on its first Check re-enters after 2 intervening items (same number), then, if wrong again, near the end; the item count stays 12.
6. **A full worked session**: item 1 (346) ✓ · item 2 (520) ✓ → step up · item 3 (L2: 398) taps 400 – 500 ✗ → zoom into 400 – 500, ghost 398 just off the left edge, 400 pulses → 300 – 400 ✓ (retried) → step down · item 4 (L1: 175) ✓ · item 5 (730) ✓ → step up · item 6 = re-queued 398 ✓ · item 7 (L2: 306) taps 0 – 100 ✗ → ghost 306 off the right edge → 300 – 400 ✓ · item 8 (L2: 690) ✓ · item 9 (L2: 405) ✓ → step up · item 10 (L3: 872) 800 – 900 ✓ → zoom stays → 870 – 880 ✓ · item 11 (L3: 263) 200 – 300 ✓ → taps 230 – 240 ✗ (inverted tens: 236) → digitHi on the tens digit, ghost at 263 inside 260 – 270 → 260 – 270 ✓ · item 12 (L3: 705) ✓ ✓ → Finish.
7. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the summary = one 0-1000 line (`ART.lineBar` at y = 380, x = 40 … 680) with all twelve numbers as `ART.miniMarker`s at their exact positions, each labelled beneath in 13 px (labels alternate two rows, y = 404 / 422, to avoid overlap), first-try items with `ART.dotFull` beside the label and helped items with `ART.dotEmpty` — the line the child built; optional `t("question_x_of_y")` with n = first-try items at (360, 460); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  owl:          { kind: "emoji", value: "🦉", size: 80 },                          // Unicode 9
  targetCard:   { kind: "shape", shape: "roundRect", w: 160, h: 110, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  bigNumeral:   { kind: "text",  value: "", size: 56, font: "display", color: "ink" },
  digitHi:      { kind: "shape", shape: "roundRect", w: 38, h: 68, stroke: "accent", strokeWidth: 3, radius: 8 },       // around one digit of the target
  miniHundred:  { kind: "shape", shape: "rect", w: 22, h: 22, fill: "structure", stroke: "bg", strokeWidth: 1 },         // one per hundred, under the hundreds digit; a 3×3 hairline grid (line token) inside
  lineBar:      { kind: "shape", shape: "rect", w: 640, h: 6, fill: "structure" },
  tick:         { kind: "shape", shape: "rect", w: 4, h: 28, fill: "structure" },
  tenTick:      { kind: "shape", shape: "rect", w: 2, h: 18, fill: "inkSoft" },
  hundredTag:   { kind: "text",  value: "", size: 16, font: "display", color: "inkSoft" },
  tenTag:       { kind: "text",  value: "", size: 16, font: "display", color: "structure" },
  segTile:      { kind: "shape", shape: "roundRect", w: 52, h: 56, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 8 },   // selected: structureSoft fill + structure stroke 3 (library selected look)
  marker:       { kind: "shape", shape: "polygon", points: [[0,0],[-14,-26],[14,-26]], fill: "surface", stroke: "accent", strokeWidth: 4 },   // hollow while placing; point on the line
  markerLocked: { kind: "shape", shape: "polygon", points: [[0,0],[-14,-26],[14,-26]], fill: "accent", stroke: "structure", strokeWidth: 3 },
  fineMarker:   { kind: "shape", shape: "polygon", points: [[0,0],[-8,-16],[8,-16]], fill: "structure" },              // the exact position inside a zoomed hundred
  ghostNumeral: { kind: "text",  value: "", size: 30, font: "display", color: "accent" },                               // the target shown off the edge of a wrong zoom
  offArrow:     { kind: "shape", shape: "polygon", points: [[0,0],[-18,-10],[-18,10]], fill: "accent" },               // points the way the number lies; mirrored for the left edge
  miniMarker:   { kind: "shape", shape: "polygon", points: [[0,0],[-6,-12],[6,-12]], fill: "accent" },
  showRing:     { kind: "shape", shape: "roundRect", w: 64, h: 68, stroke: "structure", strokeWidth: 4, radius: 12 },
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No emoji newer than Unicode 12. Segment pitch 64 with 52-px tiles → 12 px gaps (§3 floor). Colour-blind safety: a chosen segment shows a thicker stroke and the marker sits on it; hundred ticks are taller than ten ticks; the arrow is a shape with a direction.

## Animation registry
```js
const ANIM = {
  glide:      { duration: 260, ease: "Sine.InOut", trigger: "marker to a tapped segment's midpoint; the show-me glide (800 ms override) (x set at call)" },
  snap:       { duration: 120, ease: "Sine.Out", trigger: "marker to the nearest segment midpoint on drag release (x set at call)" },
  pop:        { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "marker locking on a correct Check" },
  zoomIn:     { scaleX: 10, duration: 600, ease: "Sine.InOut", trigger: "line container scales horizontally about the chosen segment's midpoint so that hundred spans x = 40 … 680; tenTicks and tenTags appear at the end" },
  zoomOut:    { scaleX: 1, duration: 500, ease: "Sine.InOut", trigger: "line container returns; tenTicks, tenTags, ghost and arrow fade first" },
  drop:       { y: "+=0", alpha: 1, duration: 300, ease: "Bounce.Out", trigger: "fineMarker falls onto the zoomed line from 30 px above (from alpha 0)" },
  slideGhost: { x: "+=36", alpha: 1, duration: 350, ease: "Sine.Out", trigger: "ghostNumeral + offArrow slide in from the edge the number lies beyond (from alpha 0; −=36 for the right edge)" },
  grow:       { scale: 1.5, duration: 220, ease: "Back.Out", yoyo: true, trigger: "each hundredTag in the tick-count cue, 220 ms apart" },
  pulse:      { scale: 1.25, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the edge tag the number lies just beyond (398 vs 400)" },
  appear:     { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "miniHundreds under the card; new target card (from alpha 0, scale 0.6)" },
  fadeOut:    { alpha: 0, duration: 300, ease: "Sine.In", trigger: "digitHi, miniHundreds, zoom labels clearing" },
  nod:        { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "owl on a correct Check" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct segment (from alpha 0.2)" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```
The zoom is one smooth scale tween; the line container is masked to x = 30 … 690 so zoomed content never draws over the card or OK. Nothing blinks.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]      ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "1 of 12" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  owl (110,140)          ┌────────┐                           │
      │                         │  346   │  targetCard (360,130)      │  zone A
      │                         └────────┘  miniHundreds y=195        │
260   ├──────────────────────────────────────────────────────────────┤
      │               "Where does it go?" (360,290)                  │
      │        ▼ marker (after a tap)                                │  zone B
      │ ┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼  line y=380, x=40..680       │
      │ 0 100 200 300 400 500 600 700 800 900 1000   tags y=412      │
      │  [seg][seg][seg][seg][seg][seg][seg][seg][seg][seg] 52×56    │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Segment i (0 … 9) spans x = 40 + 64 i … 104 + 64 i; its tile is centred at x = 72 + 64 i. While zoomed, the same ten tiles stand for the ten-segments of the chosen hundred. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.targetCard` at (360, 130) with `ART.bigNumeral` centred; `ART.digitHi` around the hundreds digit at (326, 130), the tens digit at (360, 130) or the ones digit at (394, 130); `ART.miniHundred`s in a row under the card from (330, 195), 26 px pitch.
- Line: a container at (360, 380) holding `ART.lineBar`, eleven `ART.tick`s, `ART.hundredTag`s at (x, 412); segment tiles `makeTile` 52 × 56 with `ART.segTile` tokens over the line; while zoomed, `ART.tenTick`s at the ten positions and `ART.tenTag`s replacing the hundred tags. The marker container is `setDraggable`; a `drag` moves it along y = 380 only; `dragend` snaps to the nearest segment midpoint (a tap without movement < 8 px on the marker is ignored).
- `ART.marker` with its point on the line at the chosen segment's midpoint; `ART.markerLocked` replaces it on a correct Check; `ART.fineMarker` at x = 40 + 0.64 × n in unzoomed space (n = the number), i.e. at its exact position inside the zoomed hundred; `ART.ghostNumeral` + `ART.offArrow` at the zoomed line's left edge (x = 60, arrow mirrored to point left) or right edge (x = 660, pointing right), y = 340.
- Check: `makeButton` `ok` at (360, 510), alpha 0.5 while disabled; `ART.showRing` around the correct segment tile during show-me.
- Caption `S("whereIsIt")` / `S("nowTheTens")` 22 px `THEME.font.body` `THEME.colour.inkSoft` at (360, 290), `wordWrap` 600, max 2 lines; hidden while a cue plays.
- `ART.owl` at (110, 140). Tap floors 52 × 56 (≥ 56 tall; the 52 width is accepted because segments are contiguous bands and a tap in the 12-px gap lands on the line and does nothing), OK 220 × 72. Keyboard: Left/Right arrows move the marker one segment (P9), Enter checks; Tab also walks the segment tiles then OK.
- During a cue (≈ 3 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral (numerals only; two caption strings). Each item = (number; correct hundred-segment; L3 also the correct ten-segment).

- **L1** (numbers well inside a hundred; hundred stage only): 346 (300–400) · 520 (500–600) · 175 (100–200) · 730 (700–800) · 460 (400–500) · 850 (800–900) · 240 (200–300) · 615 (600–700)
- **L2** (numbers within 10 of a hundred, zero tens or ones, 999; hundred stage only): 398 (300–400) · 405 (400–500) · 301 (300–400) · 690 (600–700) · 106 (100–200) · 999 (900–1000) · 550 (500–600) · 210 (200–300) · 807 (800–900) · 495 (400–500)
- **L3** (two stages: hundred, then the ten-segment inside it; includes inverted-digit and transcoding traps): 346 (300–400; 340–350) · 872 (800–900; 870–880) · 519 (500–600; 510–520) · 263 (200–300; 260–270) · 705 (700–800; 700–710) · 138 (100–200; 130–140) · 991 (900–1000; 990–1000) · 427 (400–500; 420–430) · 105 (100–200; 100–110) · 654 (600–700; 650–660)

Play list of 12 per Rules (shuffle within level; levels in order; re-queued items re-enter as themselves); no item repeats except by re-queue; the correct segment index never repeats twice running; the marker is absent at the start of every item.

## Rules
- Item count: 12 (re-queued items replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-Check correct items (both stages at L3) → next level (cap L3).
- Adaptation: a wrong first Check on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the item without changing level.
- What happens on a correct answer: marker locks with `ANIM.pop`, `tone("correct")`, the confirm zoom drops the fine marker at the exact position (at L3 the zoom stays for the ten stage), praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (first-try items), owl `ANIM.nod`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")`; the marker stays):
  - Wrong hundred by a non-hundreds digit (346 → 400s / 600s; digits independent): `ART.digitHi` on the hundreds digit + `ART.miniHundred` × 3, then the zoom into the chosen hundred with the ghost numeral off its edge and the arrow.
  - Wrong hundred by one (tick counting, 346 → 200–300): the hundred tags grow in turn 100, 200, 300 with rising tones, then the zoom with the ghost.
  - Nearly-a-hundred (398 → 400–500; 405 → 300–400): the zoom; the edge tag pulses; the ghost sits one small step beyond the edge.
  - Transcoding (306 → 0–100): the zoom into 0–100 with the ghost off the RIGHT edge, arrow pointing right.
  - Wrong ten-segment at L3 (inverted tens/ones, or nearest-ten rounding): `ART.digitHi` on the tens digit; the fine marker's ghost appears at the number's exact place inside the zoomed hundred with the correct ten-segment's tags pulsing; the child re-taps.
- Retry behaviour: per stage — attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring and the marker gliding there by itself; OK completes the stage as solved-with-help. No attempt 4. A first-Check miss re-queues the item.
- Finish condition: 12 items. No losing state; no clock (F-45).

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Thousand Line"; `whereIsIt` = "Where does it go?"; `nowTheTens` = "Now the tens". Tags are numerals.

## Sound
`tone("tap", i)` when the marker lands on segment i (pitch rises along the line); `tone("tap", k)` per growing hundred tag in the tick-count cue; `tone("tap", 6)` when the fine marker drops; `tone("correct")`, `tone("nudge")`, `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken — no number words in any language.

## Testing checklist
- [ ] Works in all 11 languages (OK, "Question 1 of 12", All done, Play again, Menu, praise; the captions once translated; every tag is a numeral).
- [ ] Works at narrow width (400-px iframe: the card, the whole line with eleven tags and ten separate segment bands, and OK visible).
- [ ] Keyboard operable (Left/Right arrows move the marker one segment; Tab walks the segments then OK; Enter places / checks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the marker eventually glides to the right segment and OK completes the item).
- [ ] No marker is on the line before the first tap; OK is dimmed until a segment is chosen.
- [ ] Dragging the marker and releasing between segments snaps it to the nearest segment's midpoint.
- [ ] Placing 346 in 400 – 500 outlines the 3 with three small hundred-squares, then zooms into 400 … 500 with "346" and an arrow just off the left edge.
- [ ] Placing 398 in 400 – 500 zooms in and the 400 tag pulses with the ghost one step before it.
- [ ] Placing 306 in 0 – 100 zooms in with the ghost and arrow off the right edge.
- [ ] A correct Check at levels 1-2 zooms into the hundred, drops a small marker at the exact spot, and zooms back out.
- [ ] At level 3 a correct hundred keeps the zoom and asks for the tens; 263 placed in 230 – 240 outlines the 6 and shows the ghost inside 260 – 270.
- [ ] A missed item comes back two items later and again near the end if missed again.
- [ ] The finish screen shows one line with all twelve numbers at their places and no score beyond the optional "n of 12".
- [ ] With `?sound=off` nothing is audible; with sound on, moving the marker rightward plays higher notes.
