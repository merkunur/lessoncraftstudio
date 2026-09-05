# 008 — Frog Hops

## Identity
- Slug: `frog-hops`
- Subject / topic: Mathematics / addition within 20 by counting on from the first addend on a number line
- Age band: `6-8`
- Interaction pattern: `P7` — trace a path (with the tap-each-waypoint fallback)
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P7.

## Learning
- Objective: Solves a + b (a ≥ b, sums to 20) by starting AT a and hopping exactly b times to the right along a numbered line, then reading the landing number as the sum.
- Prerequisites: Counts to 20; recognises numerals to 20; can add within 5 with objects.
- Curriculum links: F-1 (addition within 20 in 14 of 15 sources — the single most universal topic), F-21, F-31 row "+/− facts to 20" — conservative 7-8, earliest 6 → 6-8 (US 1.OA.C.5 "relate counting to addition (counting on)" / 1.OA.C.6; England Y1-2 "add within 20"; Germany Klasse 1-2 "Addition im Zahlenraum bis 20"; France CP "addition … nombres jusqu'à 20" with the "droite numérique"; Netherlands groep 3 "optellen tot 20, getallenlijn"; Spain 1º ciclo; Brazil EF01MA06; Sweden åk 1; Finland grade 1-2).
- Common misconceptions (F-105, F-106), each with this game's response:
  1. **Count-all: starting from 1 instead of from a.** Response: the frog is already sitting on a and the pads below a are absent — the line starts at a − 2 so there is nothing to count from 1; the first waypoint is a + 1. Counting from 1 is structurally impossible.
  2. **Off-by-one: counting the starting pad as the first hop ("4, 5, 6" for 4 + 3 = 6).** Response: the start pad carries no hop marker; hop 1 is the FIRST pad to the right, and each reached pad shows the hop number as a badge (`ART.hopBadge` 1, 2, 3 …) distinct from the pad's number label. If the child taps the answer tile a + b − 1, the game replays the hops with badges and stops on the correct pad, pulsing "hop 1 is the next pad" (`ART.hopBadge` on a + 1 does `ANIM.pulse`).
  3. **Not knowing when to stop (hops past b).** Response: the path only accepts b hops — the (b + 1)-th pad is not a waypoint and refuses (`ART.pad` there is drawn but dimmed); the hop counter badge shows how many hops remain in a small strip (`ART.hopStrip`: b hollow circles filling one per hop).
  4. **Choosing the smaller addend to start from (3 + 9 counted from 3).** Response: L3 presents some items with the larger number second ("3 + 9"); the frog always starts on the LARGER addend (the game places it), and the prompt shows the swap animation (`ART.eqText` "3 + 9" → "9 + 3", `ANIM.swap`) before the hops — commutativity used as a strategy, shown not explained.

## How it plays
1. **Start screen**: title "Frog Hops", the frog (`ART.frog`) at (360, 200), Start, picker.
2. **Item 1 (L1: 4 + 3)**: rail of 10 dots (§6). Zone A: the equation (`ART.eqText`, 44 px) at (360, 100): "4 + 3 = ?"; the number line across zone A/B at y = 250: pads (`ART.pad`, 56 × 56 tiles, pitch 60) numbered from a − 2 to a + b + 2 (here 2 … 9), centred so that pad a sits at x = 300 (pads left of the frog are `ART.padDim`); the frog sits on pad 4. The pads a + 1 … a + b are the waypoints (`ART.padWay`: a `structure` outline); pads beyond are `ART.padDim`. Under the line, `ART.hopStrip` (b hollow circles at y = 300, 20 px apart) shows how many hops to make. Zone B: three answer tiles (`ART.numeralTile`, 96 × 96) at y = 400, x = 240 / 360 / 480 with the sum and two distractors, DISABLED until the hops are done. Caption: none.
3. **Hopping**: the child drags a finger from the frog rightward (or taps each waypoint in order — the fallback, always available). When the pointer reaches waypoint k (within the pad's 56 × 56 area) the frog hops there (`ANIM.hop`: y −40 then back over 260 ms while x tweens to the pad), the pad gets `ART.hopBadge` k, `ART.hopStrip` circle k fills, `tone("tap", k)`. Reaching a pad out of order (skipping) does nothing: the next waypoint only is armed (P7 construction). After the b-th hop the answer tiles enable and the landing pad's number label grows (`ANIM.landGrow`).
4. **Answering**: tap a tile.
   - **Correct**: `ANIM.pop`, `tone("correct")`, praise pop, the equation completes (`ART.eqText` "4 + 3 = 7"), the frog `ANIM.croak` (scale-y squash); rail dot fills; next item after 700 ms (line rebuilds with `ANIM.appear`).
   - **Wrong, a + b − 1 (off-by-one, counted the start)**: `ANIM.nudge`, `tone("nudge")`; the hops replay: the frog jumps back to a, then hops with badges while the badge on a + 1 pulses first; ends on a + b. Attempt 2.
   - **Wrong, a + b + 1 or other**: nudge + tone; the replay as above; the landing pad's label pulses. Attempt 2.
   - **Second wrong**: replay again, then the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 sums ≤ 10, b ≤ 3; L2 sums ≤ 20, b ≤ 5, crossing 10 allowed; L3 sums ≤ 20 with the larger number written second (swap shown) and b up to 6.
6. **Finish**: `t("all_done")` (360, 110); the frog on a big lily pad (`ART.lily` at (360, 236), `ART.frog` above it at (360, 210)) `ANIM.celebrate`; the summary = the ten completed equations in two rows of five (`ART.eqChip`, 120 × 36, 20 px text) from y = 340; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6 minutes.

## Art registry
```js
const ART = {
  frog:        { kind: "emoji", value: "🐸", size: 56 },
  lily:        { kind: "emoji", value: "🪷", size: 96, fallback: "🌸" },   // finish screen only; Unicode 14 → fallback
  eqText:      { kind: "text",  value: "", size: 44, font: "display", color: "structure" },
  pad:         { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 2, radius: 28 },      // number label 22 px display ink
  padWay:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 28 },
  padDim:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 28 },     // label inkSoft
  lineBar:     { kind: "shape", shape: "rect", w: 720, h: 4, fill: "line" },
  hopBadge:    { kind: "shape", shape: "circle", r: 12, fill: "accent" },     // hop number on it 16 px display, color inkOnAccent
  hopStrip:    { kind: "shape", shape: "circle", r: 8, stroke: "structure", strokeWidth: 2 },   // b of these; filled = fill structure
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },      // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  eqChip:      { kind: "shape", shape: "roundRect", w: 120, h: 36, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  hop:       { y: "-=40", duration: 130, ease: "Sine.Out", yoyo: true, trigger: "frog arc for one hop; x tweens to the pad in a parallel 260 ms Sine.InOut tween" },
  landGrow:  { scale: 1.3, duration: 200, ease: "Back.Out", trigger: "landing pad number label after the last hop" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct tile" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  pulse:     { scale: 1.2, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "hop-1 badge in an off-by-one replay; landing label in other replays" },
  croak:     { scaleY: 0.8, duration: 100, ease: "Sine.InOut", yoyo: true, trigger: "frog on correct" },
  swap:      { x: "+=80", duration: 300, ease: "Sine.InOut", trigger: "L3: the two addends in eqText exchange places (the other moves −=80)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new line and tiles (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish frog" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                    "4 + 3 = ?"  (360,100)                     │  zone A
      │  ─(2)─(3)─[4 F]─(5)─(6)─(7)─(8)─(9)─   line y=250, pitch 60  │
      │            ^frog on a   ^ ^ ^ waypoints   dim →              │
      │                 ○ ○ ○  hopStrip y=300                        │
260   ├──────────────────────────────────────────────────────────────┤
      │        [ 6 ]        [ 7 ]        [ 8 ]   tiles y=400          │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(F in the diagram stands for `ART.frog` sitting on pad a.) Pad x positions: pad a at x = 300; pad a + i at x = 300 + 60 i; pads a − 1, a − 2 at 240, 180. For a + b + 2 ≤ 20 the rightmost pad is at 300 + 60 (b + 2) ≤ 780 → when b + 2 > 7 (i.e. b = 6) the line shifts left so that pad a sits at x = 240. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.lineBar` at y = 250 spanning the stage; pads centred on it: `ART.pad` (start pad and the two before it use `ART.padDim` except the start pad, which is `ART.pad`), waypoints `ART.padWay`, pads after the target `ART.padDim`. Each waypoint pad is a `makeTile` 56 × 56 (6-8 floor) with a transparent-looking fill (tokens as above) so the keyboard/tap fallback works; non-waypoint pads are not tiles.
- `ART.frog` centred on the current pad, y offset −8.
- `ART.hopBadge` at each reached pad's top-right (+20, −20); `ART.hopStrip` circles at y = 300 centred under pad a's x.
- `ART.eqText` at (360, 100); answer tiles `makeTile` 96 × 96 (`ART.numeralTile`); `ART.showRing` behind the correct tile.
- Drag handling: `pointerdown` on the frog's pad arms the path; on `pointermove` while down, the next waypoint's rectangle is tested each frame; `pointerup` leaves the path where it is (the child can continue by dragging again or tapping). Tapping a waypoint directly always works (P7 fallback).
- Tap floors 56 (pads) / 96 (tiles); pitch 60 gives a 4 px gap between pads — acceptable because pads are reached in order and a mis-tap on the next pad IS the intended target; the two answer distractors are never adjacent numbers on the line.

## Content
Language-neutral. Items (a + b; distractors — always a + b − 1 and a + b + 1, or a + b − 1 and a + b + 2 when a + b + 1 > 20):
- **L1** (sums ≤ 10, b ≤ 3): 4 + 3 · 5 + 2 · 6 + 3 · 7 + 2 · 5 + 3 · 8 + 2 · 6 + 2 · 4 + 2
- **L2** (sums ≤ 20, b ≤ 5, may cross 10): 8 + 4 · 9 + 3 · 7 + 5 · 11 + 4 · 12 + 3 · 9 + 5 · 13 + 4 · 8 + 5 · 14 + 3 · 15 + 5
- **L3** (larger number written SECOND; the frog starts on the larger, the swap is shown; b ≤ 6): 3 + 9 · 4 + 12 · 5 + 8 · 6 + 11 · 2 + 15 · 4 + 9 · 6 + 13 · 5 + 14 · 3 + 16 · 6 + 12

Play list of 10 per Rules; no item repeats; distractor slots shuffled; correct slot never repeats twice running.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong tile, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], equation completes, frog `ANIM.croak`, rail dot, next item after 700 ms.
- What happens on a wrong answer:
  - a + b − 1 (counted the start pad as hop 1): nudge + tone; replay with the hop-1 badge pulsing on pad a + 1.
  - a + b + 1 / a + b + 2 (over-hopped or misread the landing): nudge + tone; replay; the landing label pulses.
  - Hop attempts beyond b or out of order: refused silently by construction (not an attempt).
- Retry behaviour: attempt 1 → attempt 2 after the replay → attempt 3 with the show-me ring; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Frog Hops". The equation is numerals and symbols only.

## Sound
`tone("tap", k)` on hop k (pitch rises with each hop); `tone("correct")`, `tone("nudge")`, `tone("finish")`. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (chrome strings change; the equation is symbols).
- [ ] Works at narrow width (400-px iframe: the whole line, frog and three tiles visible; with b = 6 the line is shifted left and still fits).
- [ ] Keyboard operable (Tab reaches the next waypoint pad only, then the answer tiles; Enter hops / picks).
- [ ] Never auto-starts.
- [ ] No losing state (wrong tiles never end the session; the show-me ring always completes the item).
- [ ] The frog starts ON the first addend; there are no pads numbered 1 to a − 3 to count from.
- [ ] Dragging right makes the frog hop pad by pad with hop badges 1, 2, 3; tapping the pads in order does the same.
- [ ] Touching a pad out of order does nothing; the (b + 1)-th pad never accepts a hop.
- [ ] Answer tiles are dimmed until all hops are made.
- [ ] Tapping the sum-minus-one replays the hops with the first hop's badge pulsing.
- [ ] At the third level "3 + 9" visibly swaps to "9 + 3" before the frog starts on 9.
- [ ] Two first-try corrects in a row bring bigger sums; a wrong tile brings smaller ones.
- [ ] The finish screen shows the ten completed equations and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each hop is a higher note.
