# 064 — Letter Path

## Identity
- Slug: `letter-path`
- Subject / topic: Literacy / letter formation — tracing uppercase PRINT letters through their stroke waypoints in the conventional order and direction
- Age band: `5-6`
- Interaction pattern: `P7` — trace a path (drag through waypoints; the tap-each-waypoint fallback is always on)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P7 (waypoint order enforced by construction: only the NEXT waypoint is armed; a later waypoint touched first does nothing; after 2 s idle the next waypoint pulses). Locale note: PRINT capitals only (F-25 — cursive regimes differ and are out of scope for v1); all eleven languages share the 26 basic capitals, so the letter set is language-neutral; letters with diacritics (Ä, Ø, Ñ …) are out of scope for this game. No word, no sound: the letter is the whole content.

## Learning
- Objective: Traces an uppercase print letter by reaching its stroke waypoints in the conventional order and direction (top to bottom, left to right), lifting between strokes where the letter has more than one.
- Prerequisites: Can drag a finger or tap large targets in order (game 001 taps; any P7 game). No letter names required — the finished letter is shown as the model.
- Curriculum links: F-22 (letter formation is part of the letter-knowledge core taught explicitly at 5-7 in all twelve systems), F-25 (print forms only; every system's first formation work is print except France, whose GS pre-writing still uses capitals), F-31 row "Upper/lowercase link; letter formation (print)" — conservative 6-7, earliest 4 → 5-6 (US L.K.1.a "print many upper- and lowercase letters"; England Reception "form capital letters correctly"; Germany Klasse 1 Druckschrift; France GS "capitales d'imprimerie"; Spain Infantil grafomotricidad; Brazil EF01LP04; Netherlands groep 3 letters schrijven; Sweden förskoleklass "forma bokstäver"; Finland esiopetus "kirjainten piirtäminen"). Demand: F-1 (letter recognition/formation in 9 of 15 sources).
- Common misconceptions (F-121, F-102), each with this game's response:
  1. **Mirror reversal (N, S, Z, J drawn backwards; the whole letter flipped) — developmentally normal to ~7 (F-121).** Response: a reversal cannot be produced — the path is fixed and only the next waypoint accepts a touch, so a stroke drawn in the mirrored direction simply does not draw. The guide stroke (`ART.guide`) shows the true shape underneath from the start. Touching the wrong END of a stroke first does nothing; after 2 s the correct start (`ART.wayDot` numbered 1) pulses (`ANIM.pulse`).
  2. **Starting at the bottom and drawing upward (bottom-up verticals), or drawing bars right-to-left.** Response: every vertical's waypoint 1 is at the TOP and every horizontal's waypoints run left→right; waypoint 1 carries the `ART.startFlag` (a small coral triangle) so the start is visible before the first touch; the first item of a session demonstrates itself once (`ANIM.demo`: a `ART.demoDot` travels the guide from waypoint 1 to the last) and then waits.
  3. **Not lifting between strokes (dragging from the end of the vertical straight into the top bar of T or E — the "one continuous scribble").** Response: the path between strokes is not a guide; when a stroke completes, the next stroke's waypoint 1 appears with the start flag and the pointer must be released (`pointerup`) before it can be reached (the game arms the next stroke only after pointerup); a drag that continues does nothing until released.
  4. **Wrong stroke order that still produces the shape (E drawn as three bars then the stem).** Response: the order is the conventional one in Content and is enforced by the numbered waypoints; nothing is marked wrong — the "wrong-order" touch is refused silently (F-61) and the pulse shows where to go.
  5. **Skipping a waypoint on a long stroke (drag jumps from 1 to 3).** Response: only the next waypoint is tested, so the path draws no further than the last waypoint reached; the child sees the gap and the next dot pulses after 2 s.

## How it plays
1. **Start screen**: title "Letter Path", the snail (`ART.snail`) at (360, 200), Start, picker.
2. **Item 1 (L1: L)**: rail of 8 dots (§6). Zone A left: the model letter (`ART.modelLetter`, "L", 72 px, `inkSoft`) on a small card (`ART.modelCard`) at (110, 160) — what the letter will look like. Centre: the letter box, a 260 × 320 area with its top-left corner at stage (230, 90) (it spans zones A and B; the letter is the whole task). In it: the faint guide (`ART.guide`, an `inkSoft`-coloured line at alpha 0.25, 14 px wide) drawn through every guide point of every stroke; the waypoints of stroke 1 as `makeTile` 80 × 80 (transparent fill) each showing `ART.wayDot` (r 20, `surface` fill, `structure` stroke) with its number (`ART.wayNumeral`); waypoint 1 also carries `ART.startFlag` at its top-left. Right: the snail at (610, 160). On the very first item the demo plays once (`ANIM.demo`), then the game waits.
3. **Tracing**: the child puts a finger on waypoint 1 and drags along the guide (or taps waypoint 1, then 2 …). When the pointer enters the next waypoint's 80 × 80 tile, that waypoint `ANIM.pop`s, fills (`ART.wayDone`), `tone("tap", k)` plays, and the path (`ART.trail`, `structure`, 16 px) draws itself along the guide points from the previous waypoint to this one (`ANIM.draw` — a tween of the drawn fraction 0→1 over 180 ms). Guide points after the last waypoint of a stroke (a tail) draw automatically when that last waypoint is reached. Reaching a later waypoint first does nothing. After 2 s without progress the next waypoint `ANIM.pulse`s; after 6 s `ART.demoDot` travels from the current waypoint to the next (show-me).
4. **Between strokes**: when the last waypoint of a stroke is reached, the stroke's trail `ANIM.set` (a brief glow: alpha 1 → 0.85 → 1) and, once the pointer is released, the next stroke's waypoints appear (`ANIM.appear`) with the start flag on its waypoint 1. A drag that never lifts cannot reach them (misconception 3).
5. **Letter complete**: the last waypoint of the last stroke reached → the whole trail `ANIM.set`, `tone("correct")`, praise pop (rotation, every second letter and on the eighth), the snail `ANIM.crawl` (x +24 and back), the model card's letter changes from `inkSoft` to `structure` (`ART.modelDone`), the rail dot fills; next letter after 700 ms.
6. **Items 2-8**: per Content/Rules. L1 straight-line letters (L, T, I, H, E, F), L2 diagonals (V, A, N, M, Z, K, X, W), L3 curves (C, O, U, D, P, J).
7. **Finish**: `t("all_done")` (360, 110); the snail (360, 200) `ANIM.celebrate`; the summary = the eight traced letters in a row at y = 380 as `ART.doneLetter` (56 px, `structure`) on `ART.doneChip` (72 × 72) — the letters formed this session; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  snail:       { kind: "emoji", value: "🐌", size: 80 },
  modelCard:   { kind: "shape", shape: "roundRect", w: 120, h: 130, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  modelLetter: { kind: "text",  value: "", size: 72, font: "display", color: "inkSoft" },
  modelDone:   { kind: "text",  value: "", size: 72, font: "display", color: "structure" },
  guide:       { kind: "shape", shape: "line", w: 14, stroke: "inkSoft", strokeWidth: 14 },      // drawn at alpha 0.25 through all guide points
  trail:       { kind: "shape", shape: "line", w: 16, stroke: "structure", strokeWidth: 16 },     // the child's completed path, round caps
  wayDot:      { kind: "shape", shape: "circle", r: 20, fill: "surface", stroke: "structure", strokeWidth: 3 },
  wayDone:     { kind: "shape", shape: "circle", r: 20, fill: "structure", stroke: "structure", strokeWidth: 3 },
  wayNumeral:  { kind: "text",  value: "", size: 22, font: "display", color: "ink" },          // color bg once done
  startFlag:   { kind: "shape", shape: "polygon", points: [[0,-14],[14,0],[0,14]], fill: "accent" },   // a small coral arrow beside waypoint 1
  demoDot:     { kind: "shape", shape: "circle", r: 12, fill: "accent" },
  doneChip:    { kind: "shape", shape: "roundRect", w: 72, h: 72, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },
  doneLetter:  { kind: "text",  value: "", size: 56, font: "display", color: "structure" },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The guide and trail are `Graphics` polylines through the Content guide points (round line caps and joins); curves are polylines through 8-13 points — smooth enough at 14-16 px width. The art upgrade may replace `guide` with an SVG path per letter; nothing else changes.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.2, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a waypoint reached" },
  draw:      { duration: 180, ease: "Sine.Out", trigger: "the trail's drawn fraction from 0 to 1 between two waypoints (a tween on a plain object {t:0}, redrawing the Graphics each update)" },
  set:       { alpha: 0.85, duration: 150, ease: "Sine.InOut", yoyo: true, trigger: "a completed stroke / the whole letter" },
  pulse:     { scale: 1.25, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the next waypoint after 2 s idle" },
  demo:      { duration: 1400, ease: "Sine.InOut", trigger: "demoDot travels the whole guide of the first letter (a tween on {t:0→1} sampling the guide by arc length); also 6 s idle show-me from the current waypoint to the next (duration 600)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "next stroke's waypoints; new letter (from alpha 0, scale 0.6)" },
  crawl:     { x: "+=24", duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "snail on a completed letter" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish snail" }
};
```
No `nudge` in this game: a wrong touch is refused silently (F-61), never wiggled.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
 90   │  ┌ model ┐        ┌── letter box 260×320 ──┐                  │
      │  │   L   │        │ (1)                    │     snail        │  zone A
      │  │(110,160)       │  |  guide + waypoints  │    (610,160)     │
      │  └───────┘        │  |                     │                  │
260   │                   │ (2)────────────(3)     │                  │
      │                   │                        │                  │  zone B
410   │                   └────────────────────────┘                  │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Letter box top-left at stage (230, 90); a box coordinate (x, y) is stage (230 + x, 90 + y). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` (x = 283 + i × 22, y = 28) → `ART.dotFull`.
- `ART.modelCard` centred (110, 160) with `ART.modelLetter` centred on it (swapped for `ART.modelDone` when the letter completes); `ART.snail` at (610, 160).
- Guide: one `Graphics` drawing `ART.guide` (alpha 0.25) through every stroke's guide points; the trail: a second `Graphics` drawing `ART.trail` up to the drawn fraction.
- Waypoints: `makeTile` 80 × 80 with fill and stroke `THEME.colour.bg` (invisible tile) containing `ART.wayDot` + `ART.wayNumeral`; done = `ART.wayDone` with the numeral in `THEME.colour.bg`; `ART.startFlag` at waypoint 1's (−34, −34); waypoints of a not-yet-active stroke are not created until the previous stroke completes. Every two waypoints of one stroke are ≥ 90 px apart (Content guarantees this) so 80-px tiles never overlap; a later waypoint may share a position with a completed one (a new stroke starting where an earlier one started) — the dot re-numbers when it becomes the next.
- Pointer handling: `pointerdown` inside the next waypoint's tile arms tracing; on `pointermove` while down only the next waypoint's tile rectangle is tested; `pointerup` ends the drag (progress is kept; the next stroke is armed only after a pointerup). Tapping the next waypoint directly always works (P7 fallback).
- Tab order: the active stroke's waypoints in order; Enter reaches the next one only.

## Content
Language-neutral: the 26 print capitals are shared by all eleven languages (diacritic letters out of scope). Coordinates are box units (0-260 × 0-320). Each letter = strokes in order; each stroke = its guide points in order; waypoints are the guide points marked with a trailing # (their order is the tap order); unmarked points are guide-only. A guide tail after a stroke's last waypoint draws automatically when that waypoint is reached.

- **L1 — straight lines**
  - L: s1 (60,20)# → (60,300)# → (220,300)#
  - T: s1 (30,20)# → (230,20)# ; s2 (130,20)# → (130,300)#
  - I: s1 (130,20)# → (130,160)# → (130,300)#
  - H: s1 (50,20)# → (50,300)# ; s2 (210,20)# → (210,300)# ; s3 (50,160)# → (210,160)#
  - E: s1 (60,20)# → (60,300)# → (220,300)# ; s2 (60,20)# → (220,20)# ; s3 (60,160)# → (200,160)#
  - F: s1 (60,20)# → (60,300)# ; s2 (60,20)# → (220,20)# ; s3 (60,160)# → (190,160)#
- **L2 — diagonals**
  - V: s1 (40,20)# → (130,300)# → (220,20)#
  - A: s1 (130,20)# → (40,300)# ; s2 (130,20)# → (220,300)# ; s3 (80,190)# → (180,190)#
  - N: s1 (50,20)# → (50,300)# ; s2 (50,20)# → (210,300)# ; s3 (210,300)# → (210,20)#
  - M: s1 (40,300)# → (40,20)# → (130,200)# → (220,20)# → (220,300)#
  - Z: s1 (40,20)# → (220,20)# → (40,300)# → (220,300)#
  - K: s1 (60,20)# → (60,300)# ; s2 (210,20)# → (60,170)# ; s3 (60,170)# → (210,300)#
  - X: s1 (40,20)# → (220,300)# ; s2 (220,20)# → (40,300)#
  - W: s1 (30,20)# → (80,300)# → (130,110)# → (180,300)# → (230,20)#
- **L3 — curves** (polyline guides; # marks a waypoint)
  - C: s1 (230,60)# → (170,20) → (100,20) → (40,70) → (15,160)# → (40,250) → (100,300) → (170,300) → (230,260)#
  - O: s1 (130,20)# → (60,40) → (15,110) → (15,160)# → (15,210) → (60,280) → (130,300)# → (200,280) → (245,210) → (245,160)# → (245,110) → (200,40) → (130,20)#
  - U: s1 (40,20)# → (40,200) → (60,260) → (130,300)# → (200,260) → (220,200) → (220,20)#
  - D: s1 (60,20)# → (60,300)# ; s2 (60,20)# → (150,20) → (210,60) → (240,160)# → (210,260) → (150,300) → (60,300)#
  - P: s1 (60,20)# → (60,300)# ; s2 (60,20)# → (150,20) → (210,50) → (230,100)# → (210,150) → (150,180) → (60,180)#
  - J: s1 (170,20)# → (170,220)# → (150,280) → (110,300) → (70,280) → (50,230)#

Waypoint spacing check (minimum distance between any two waypoints of the same stroke): L1 ≥ 100, L2 ≥ 90 (W: 30→80 / 300→110 pairs are 197 apart; M 40,20→130,200 is 201), L3 ≥ 105 (O's top and left waypoints are 181 apart). The model card shows the letter in `THEME.font.display`; the guide is the geometric print form above, which differs from Baloo 2 in weight but not in stroke order.

Play list: 8 items; start at L1; levels per Rules; no letter repeats within a session. The first item of every session plays `ANIM.demo` once (F-42: a new mechanic demonstrates itself once, then fades).

## Rules
- Item count: 8.
- Difficulty progression: 2 consecutive letters completed with no refused touch and no idle pulse → next level (cap L3).
- Adaptation: a letter that needed the 6 s show-me (`ART.demoDot`) on any waypoint, or refused touches on 2 consecutive letters → next letter one level down (floor L1).
- What happens on a correct answer (a waypoint reached / a letter completed): waypoint `ANIM.pop` + `tone("tap", k)`; trail `ANIM.draw`; on the last waypoint `ANIM.set`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every second letter and the eighth, snail `ANIM.crawl`, model letter turns `structure`, rail dot fills, next letter after 700 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Touching a later waypoint or the far end of a stroke first (reversal / bottom-up start): refused silently, nothing draws; after 2 s the correct next waypoint `ANIM.pulse`s.
  - Dragging from a finished stroke straight into the next stroke without lifting: the next stroke's waypoints are not yet armed; nothing draws until `pointerup`; then they appear with the start flag.
  - Skipping a waypoint on a stroke: the trail stops at the last reached waypoint; the next one pulses after 2 s.
  - No progress for 6 s: show-me — `ART.demoDot` travels the guide from the current waypoint to the next (`ANIM.demo`, 600 ms); the item then counts as solved-with-help when completed.
- Retry behaviour: unlimited touches; the letter is never abandoned; a letter always completes (success is certain). No attempt limit is needed because a wrong touch is refused, not counted.
- Finish condition: 8 letters. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Letter Path". No words on the play screen; the letters and waypoint numerals are content.

## Sound
`tone("tap", k)` on the k-th waypoint of the letter (pitch rises along the letter); `tone("correct")` when the letter completes; `tone("tap")` when a new stroke's waypoints appear; `tone("finish")` once. Silent under `?sound=off`. No letter names or sounds are spoken (no audio files).

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; the letter set is the same 26 capitals in every language).
- [ ] Works at narrow width (400-px iframe: the model card, the whole letter box and the snail are visible; waypoints remain separate targets).
- [ ] Keyboard operable (Tab reaches only the next waypoint of the active stroke; Enter reaches it and draws the trail).
- [ ] Never auto-starts (the demo plays only after Start, on the first letter).
- [ ] No losing state (any number of refused touches still ends with every letter drawn; the travelling dot shows the way after 6 s).
- [ ] On L, dragging from the top dot down and then right draws the letter in teal; starting at the bottom dot draws nothing and the top dot pulses after 2 s.
- [ ] On T, after the top bar, the stem's dots appear only after the finger is lifted; a drag that never lifts cannot start the stem.
- [ ] On E, the three strokes appear one after another in the order stem-and-base, top bar, middle bar.
- [ ] On O, the path goes from the top around the LEFT side first; touching the right side first does nothing.
- [ ] The trail follows the curved guide on C, O, U, D, P and J, not straight lines between dots.
- [ ] Two clean letters in a row bring diagonal letters, then curved ones; a letter that needed the travelling dot brings an easier one next.
- [ ] The finish screen shows the eight letters traced this session and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each waypoint is a higher note than the previous.
