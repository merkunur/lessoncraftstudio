# 030 — Count-Back Cliff

## Identity
- Slug: `count-back-cliff`
- Subject / topic: Mathematics / subtraction within 20 by counting back from the minuend on a number line, not counting the starting number
- Age band: `6-8`
- Interaction pattern: `P7` — trace a path (with the tap-each-waypoint fallback)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P7. Content is language-neutral (numerals, symbols); no `LOCALE_DATA`.

## Learning
- Objective: Solves a − b (a ≤ 20, b ≤ 6) by starting AT a and hopping exactly b ledges to the LEFT along a numbered line, then reading the landing number as the difference.
- Prerequisites: Counts back from 20; recognises numerals to 20; has hopped forward on a number line (game 008) and taken away with objects (game 028).
- Curriculum links: F-1 (subtraction within 20 in 12 of 15 sources), F-106 ("counting-back off-by-one (8 − 3: 8, 7, 6)" — the misconception this game exists to fix; "number line where the start is not a jump"), F-105, F-21, F-31 row "+/− facts to 20" — conservative 7-8, earliest 6 → 6-8 (US 1.OA.C.5 "relate counting to subtraction (counting back)" / 1.OA.C.6; England Y1-2 "subtract within 20 … count back"; Germany Klasse 1-2 "Subtraktion am Zahlenstrahl, rückwärts zählen"; France CP "reculer sur la droite numérique"; Netherlands groep 3 "terugtellen op de getallenlijn"; Spain 1º ciclo; Brazil EF01MA08; Sweden åk 1 "räkna bakåt"; Finland grade 1-2).
- Common misconceptions (F-106, F-105, F-101), each with this game's response:
  1. **Counting the starting number as the first count-back ("8, 7, 6" for 8 − 3 → 6).** Response: the goat is already standing on a and that ledge carries no hop marker; hop 1 is the FIRST ledge to the left, and each reached ledge shows the hop number as a badge (`ART.hopBadge` 1, 2, 3 …) distinct from the ledge's number label. a − b + 1 is always an answer distractor; tapping it replays the hops with badges and the hop-1 badge on ledge a − 1 `ANIM.pulse`s — "the 8 is where you stand; the first hop lands on 7".
  2. **Not knowing when to stop (hopping past b, or stopping short).** Response: the path accepts exactly b hops — the (b + 1)-th ledge is drawn but is not a waypoint and refuses (`ART.ledgeDim`); `ART.hopStrip` (b hollow circles filling one per hop) shows how many hops remain; the answer tiles stay disabled until the b-th hop.
  3. **Counting forward instead of back (hopping right).** Response: the ledges to the RIGHT of a are `ART.ledgeDim` and never waypoints; a pointer moving right does nothing (refused by construction, F-61); the cliff drops away to the LEFT (`ART.cliffFace` beyond the lowest ledge) so "down and left" is the visible direction.
  4. **Smaller-from-larger reflex (reading 12 − 5 as "5 − 2 and 10").** Response: a whole-number line makes the bug impossible to enact — there is only one goat and it hops b times from a; at L2 the hops cross 10 (12 − 5 lands on 7) and the ten's ledge (`ART.ledgeTen`) is marked with a thicker outline so the crossing is seen, never a digit-by-digit trick.
  5. **Reading the landing ledge wrongly (a − b − 1).** Response: a − b − 1 is the other distractor; on that tap the replay ends with the landing ledge's label `ANIM.landGrow`-ing and `ART.eqText` completing.

## How it plays
1. **Start screen**: title "Count-Back Cliff", the goat (`ART.goat`) at (360, 200), Start, picker.
2. **Item 1 (L1: 7 − 2)**: rail of 10 dots (§6); `t("question_x_of_y")` at (360, 48). Zone A: the equation (`ART.eqText`, 44 px) "7 − 2 = ?" at (360, 100); the ledge line across zone A/B at y = 250: ledges (`ART.ledge`, 56 × 56 tiles, pitch 60) numbered from a − b − 2 to a + 2 (here 3 … 9), centred: leftmost ledge at x = 360 − (b + 4) × 30 (b = 2 → 180), so ledge a sits at x = leftmost + (b + 2) × 60 (here 420); the goat stands on ledge 7. Ledges a − 1 … a − b are the waypoints (`ART.ledgeWay`, a `structure` outline); ledges below the target and above a are `ART.ledgeDim`; the ten's ledge (10, 20) uses `ART.ledgeTen` wherever it appears. Left of the lowest ledge, `ART.cliffFace` (a tall `surface2` rectangle) drops to y = 480. Under the line, `ART.hopStrip` (b hollow circles at y = 300, 20 px apart, centred under ledge a). Zone B: three answer tiles (`ART.numeralTile`, 96 × 96) at y = 400, x = 240 / 360 / 480 with the difference and two distractors, DISABLED until the hops are done. Caption: none (the goat, the strip and the dimmed ledges carry the task; 6-8 text budget spent on the equation).
3. **Hopping**: the child drags a finger from the goat LEFTward (or taps each waypoint in order — the fallback, always available). When the pointer reaches waypoint k (within the ledge's 56 × 56 area) the goat hops there (`ANIM.hop`: y −40 then back over 260 ms while x tweens to the ledge), the ledge gets `ART.hopBadge` k, `ART.hopStrip` circle k fills, `tone("tap", b + 1 − k)` (the pitch FALLS with each hop back). Reaching a ledge out of order does nothing: only the next waypoint is armed (P7 construction). After the b-th hop the answer tiles enable and the landing ledge's number label grows (`ANIM.landGrow`).
4. **Answering**: tap a tile.
   - **Correct (5)**: `ANIM.pop`, `tone("correct")`, praise pop (rotation), the equation completes (`ART.eqText` "7 − 2 = 5"), the goat `ANIM.bleat` (scale-y squash); rail dot fills; next item after 700 ms (the line rebuilds with `ANIM.appear`).
   - **Wrong, a − b + 1 (counted the start as hop 1)**: `ANIM.nudge`, `tone("nudge")`; the hops replay: the goat jumps back to a, then hops with badges while the badge on a − 1 pulses first; ends on a − b. Attempt 2.
   - **Wrong, a − b − 1 or other**: nudge + tone; the replay as above; the landing ledge's label pulses. Attempt 2.
   - **Second wrong**: replay again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 a ≤ 10, b ≤ 3; L2 a ≤ 20, b ≤ 5, crossing 10 (the ten's ledge marked); L3 b up to 6 with landings on 0 or 10 (the ground ledge `ART.ledgeGround` at 0 where the cliff meets the ground) and one item whose answer is 0.
6. **Finish**: `t("all_done")` (360, 110); the goat on the ground ledge (`ART.ledgeGround` at (360, 236), `ART.goat` above it at (360, 206)) `ANIM.celebrate`; the summary = the ten completed equations in two rows of five (`ART.eqChip`, 130 × 36, 20 px text) from y = 340 (pitch 140), first-try chips with `ART.dotFull` at their left, helped ones with `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  goat:        { kind: "emoji", value: "🐐", size: 52 },
  eqText:      { kind: "text",  value: "", size: 44, font: "display", color: "structure" },
  ledge:       { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 10 },       // number label 22 px display ink; the start ledge
  ledgeWay:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },
  ledgeDim:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 10 },      // label inkSoft
  ledgeTen:    { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 5, radius: 10 },   // the 10 / 20 ledge when it is a waypoint or the landing
  ledgeGround: { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structure", stroke: "structure", strokeWidth: 2, radius: 10 },   // ledge 0: label bg
  lineBar:     { kind: "shape", shape: "rect", w: 720, h: 4, fill: "line" },
  cliffFace:   { kind: "shape", shape: "rect", w: 40, h: 230, fill: "surface2" },     // left of the lowest ledge, from y = 250 down
  hopBadge:    { kind: "shape", shape: "circle", r: 12, fill: "accent" },     // hop number on it 16 px display, color inkOnAccent
  hopStrip:    { kind: "shape", shape: "circle", r: 8, stroke: "structure", strokeWidth: 2 },   // b of these; filled = fill structure
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },      // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:      { kind: "shape", shape: "roundRect", w: 130, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  hop:       { y: "-=40", duration: 130, ease: "Sine.Out", yoyo: true, trigger: "goat arc for one hop; x tweens to the ledge in a parallel 260 ms Sine.InOut tween" },
  landGrow:  { scale: 1.3, duration: 200, ease: "Back.Out", trigger: "landing ledge number label after the last hop" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "hop-1 badge in a counted-the-start replay; landing label in other replays; next waypoint after 2 s idle" },
  bleat:     { scaleY: 0.8, duration: 100, ease: "Sine.InOut", yoyo: true, trigger: "goat on correct" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new line and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish goat" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 10" y=48│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    "7 − 2 = ?"  (360,100)                     │  zone A
      │ ▌ ─(3)─(4)─(5)─(6)─[7 G]─(8)─(9)─   line y=250, pitch 60      │
      │ ▌ cliff  dim  ^  ^ waypoints ^start   dim →                  │
      │ ▌                    ○ ○  hopStrip y=300 (under ledge a)      │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ 4 ]        [ 5 ]        [ 6 ]   tiles y=400          │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(`G` stands for `ART.goat` standing on ledge a; `▌` is `ART.cliffFace`.) Ledge positions: b + 5 ledges from a − b − 2 to a + 2; leftmost at x = 360 − (b + 4) × 30, pitch 60 (b = 6 → 11 ledges from x = 60 to x = 660, inside the 16-px margin); ledge a − i at leftmost + (b + 2 − i) × 60. When a − b − 2 < 0 the line starts at 0 (fewer ledges on the left; the ground ledge is the last). Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`.
- `ART.lineBar` at y = 250 spanning the stage; ledges centred on it: the start ledge `ART.ledge`, waypoints `ART.ledgeWay`, all others `ART.ledgeDim`; `ART.ledgeTen` replaces the look of ledge 10 / 20 when it is a waypoint or the landing; `ART.ledgeGround` is ledge 0 (label in `THEME.colour.bg`). Each waypoint ledge is a `makeTile` 56 × 56 (6-8 floor) so the keyboard/tap fallback works; non-waypoint ledges are not tiles.
- `ART.cliffFace` at (leftmost − 50, 365) (left of the lowest ledge, from the line down to y = 480).
- `ART.goat` centred on the current ledge, y offset −8, facing left.
- `ART.hopBadge` at each reached ledge's top-left (−20, −20); `ART.hopStrip` circles at y = 300 centred under ledge a's x.
- `ART.eqText` at (360, 100); answer tiles `makeTile` 96 × 96 (`ART.numeralTile`); `ART.showRing` behind the correct tile.
- Drag handling: `pointerdown` on the goat's ledge arms the path; on `pointermove` while down, the next waypoint's rectangle is tested each frame; `pointerup` leaves the path where it is (the child can continue by dragging again or tapping). Tapping a waypoint directly always works (P7 fallback). After 2 s idle with hops remaining, the next waypoint `ANIM.pulse`s (an idle cue, never a clock).
- Tap floors 56 (ledges) / 96 (tiles); pitch 60 gives a 4 px gap between ledges — acceptable because ledges are reached in order and a mis-tap on the next ledge IS the intended target. The answer choices are tiles in zone B (24 px apart), never the ledges themselves.
- Tab order: the next waypoint only (P7), then the answer tiles. Under `?embed=1` the picker is not created.

## Content
Language-neutral. Items (a − b; distractors — always a − b + 1 and a − b − 1, or a − b + 1 and a − b + 2 when a − b − 1 < 0):
- **L1** (a ≤ 10, b ≤ 3): 7 − 2 · 8 − 3 · 9 − 2 · 6 − 3 · 10 − 3 · 8 − 2 · 9 − 3 · 5 − 2
- **L2** (a ≤ 20, b ≤ 5, crossing 10 in most items): 12 − 5 · 13 − 4 · 11 − 3 · 14 − 5 · 12 − 3 · 15 − 5 · 13 − 5 · 16 − 4 · 11 − 4 · 14 − 3
- **L3** (b up to 6; landings on 0 or 10; the line's left end can be the ground): 15 − 6 · 16 − 6 · 12 − 6 · 6 − 6 · 13 − 6 · 20 − 5 · 14 − 6 · 4 − 4 · 11 − 6 · 10 − 6

Play list of 10 per Rules; no item repeats; distractor slots shuffled; correct slot never repeats twice running (§13).

Worked example: (7 − 2) two hops, taps 5 first-try · (8 − 3) first-try → L2 · (12 − 5) five hops crossing the marked 10, taps 8 → replay with the hop-1 badge on 11 pulsing → taps 7 (helped) → L1 · (9 − 2) first-try · (6 − 3) first-try → L2 · (13 − 4) first-try · (11 − 3) first-try → L3 · (15 − 6) six hops, first-try · (6 − 6) hops down to the ground ledge 0, taps 0 first-try · (20 − 5) first-try → Finish: 10 chips, 9 with filled dots.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tile, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], equation completes, goat `ANIM.bleat`, rail dot, next item after 700 ms.
- What happens on a wrong answer:
  - a − b + 1 (counted the start ledge as hop 1): nudge + `tone("nudge")`; replay with the hop-1 badge pulsing on ledge a − 1.
  - a − b − 1 / a − b + 2 (over-hopped or misread the landing): nudge + tone; replay; the landing label pulses.
  - Hop attempts beyond b, out of order, or to the right: refused silently by construction (not an attempt).
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Count-Back Cliff". The equation is numerals and symbols only; no caption.

## Sound
`tone("tap", b + 1 − k)` on hop k (the pitch falls with each hop back, so the child hears the count going down); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; the equation is symbols).
- [ ] Works at narrow width (400-px iframe: the whole line, the goat, the cliff face and three tiles visible; with b = 6 eleven ledges still fit).
- [ ] Keyboard operable (Tab reaches the next waypoint ledge only, then the answer tiles; Enter hops / picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong tiles never end the session; the show-me ring always completes the item).
- [ ] The goat starts ON the minuend; that ledge never gets a hop badge.
- [ ] Dragging left makes the goat hop ledge by ledge with hop badges 1, 2, 3; tapping the ledges in order does the same; dragging right does nothing.
- [ ] Touching a ledge out of order does nothing; the (b + 1)-th ledge never accepts a hop.
- [ ] Answer tiles are dimmed until all hops are made.
- [ ] Tapping the difference-plus-one replays the hops with the first hop's badge pulsing.
- [ ] At the second level a hop across 10 lands on a ledge drawn with a thicker outline; at the third level "6 − 6" lands on the ground ledge 0.
- [ ] Two first-try corrects in a row bring bigger subtractions; a wrong tile brings smaller ones.
- [ ] The finish screen shows the ten completed equations with a filled dot for first-try ones and a hollow dot for helped ones; no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each hop is a lower note than the last.
