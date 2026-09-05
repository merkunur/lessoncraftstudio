# 034 — Next Ten Gap

## Identity
- Slug: `next-ten-gap`
- Subject / topic: Mathematics / the complement to the next ten from a two-digit number (47 + 3 = 50)
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (a P1 tap commits the prediction; the counters then hop to the ten)
- Estimated build size: ~450 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P10. Sibling games: 004 (bonds to 10), 008 (counting on along a line), 003 (the ten-frame).

## Learning
- Objective: Given a two-digit number on a number line, predicts how many more are needed to reach the next ten by tapping the numeral among three, then watches the counters hop there and the ten-frame of ones fill.
- Prerequisites: Bonds to 10; reads two-digit numerals; counts on within a decade.
- Curriculum links: F-21 (place value tens/ones; +/− within 100 by mental strategies), F-31 rows "Place value tens/ones" and "+/− within 100, mental" — conservative 7-8 → 6-8 (US 1.NBT.C.4 / 2.NBT.B.5 "make a ten"; England Y2 "add … using … bridging to 10"; Germany Klasse 2 "Ergänzen zum nächsten Zehner"; France CE1 "compléments à la dizaine supérieure"; Netherlands groep 4 "aanvullen tot het tiental"; Spain 1º ciclo; Brazil EF02MA05; Sweden åk 1-3 "tiotalsövergång"; Finland grade 2).
- Common misconceptions (F-105, F-108, F-104), each with this game's response:
  1. **Digits as independent numbers — answering with the ones digit itself ("47 … 7").** Response: a ghost trail (`ART.ghostHop`, dashed arcs) draws 7 hops from 47: it passes the ten flag at 50 (the flag wiggles as it is passed, `ANIM.flagWave`) and lands on 54 with `ART.ghostMark`; then the true three hops play and the ten-frame of ones fills its last three cells. The excess is seen, not named.
  2. **Off-by-one from counting on starting AT the number ("47, 48, 49, 50 — four").** Response: the ghost trail of 4 hops lands on 51, one past the flag; in the true replay the first hop's badge (`ART.hopBadge` "1" over 48) pulses (`ANIM.pulse`) — hop 1 lands on 48, not on 47.
  3. **Not seeing the ones as "7 of a ten" (no bond link).** Response: from L1 the ones digit is drawn as a ten-frame (`ART.onesCell` 2 × 5) beside tens rods (`ART.rod` × 4) under the numeral — 7 filled cells, 3 empty ones; at L1 the frame is visible while predicting (a cue), from L2 it appears only in the reveal (cue fading, F-46), so the retrieval is unaided but the structure is always the explanation.
  4. **Language interference — de/nl/da say the ones first ("siebenundvierzig"), and 47 is confused with 74.** Response: number words are never shown; the numeral sits above a tens-then-ones layout (rods left, ones frame right), so the visual order is the same in every locale (F-108).
  5. **Naming the wrong ten as "next" (going back to 40).** Response: the line shows the whole decade 40-50 with the rabbit on 47 and the flag on 50 only; the ghost and true hops always move right, so "back to 40" has no representation and cannot be chosen — L3 hides the flag's label so the child must know that 50 is next.

## How it plays
1. **Start screen**: title "Next Ten Gap", the rabbit (`ART.rabbit`) at (360, 200), Start, picker.
2. **Item 1 (L1: 47)**: rail of 10 dots (§6). Zone A: the numeral (`ART.numText`, 56 px) "47" at (360, 84); beneath it at y = 132 the base-ten sketch: 4 `ART.rod`s (x = 268 + 18 i) and the ones ten-frame (10 × `ART.onesCell`, 24 px cells in 2 rows of 5, centred at (420, 132)) with 7 cells filled (`ART.onesFill`) and 3 empty — visible at L1. The number line: `ART.lineBar` at y = 220 from x = 120 to x = 600 with 11 `ART.tick`s at 48-px pitch for 40 … 50, each labelled beneath (`ART.tickLabel`, 16 px; L1 every tick, L2 only 40, 47, 50, L3 only 47); the rabbit sits on the 47 tick (x = 456); the ten flag (`ART.tenFlag` pole with `ART.flagNum` "50") stands on the 50 tick (x = 600). Zone B: three tiles (`ART.numeralTile`, 96 × 96) at y = 390, x = 240 / 360 / 480: 3, 7, 2 shuffled. Zone C: `ART.plusLabel` appears here on the reveal. Caption: none.
3. **Predicting**: tap a tile — it selects (`api.setSelected`, `ANIM.pop`), `tone("tap")`, all three lock, and the reveal begins at once.
4. **Reveal**:
   - **Correct**: a counter (`ART.counter`) appears on the rabbit's tick and hops (`ANIM.hop`) 48, 49, 50 — each hop leaves `ART.hopBadge` 1, 2, 3 above its tick, plays `tone("tap", k)`, and fills the next empty ones cell (`ANIM.cellIn`; at L2/L3 the sketch first appears with `ANIM.appear`); at 50 the flag waves (`ANIM.flagWave`), `ART.flagNum` shows "50" if hidden, and `ART.plusLabel` "+3" appears at (360, 500); `tone("correct")`, praise pop, `ART.eqText` "47 + 3 = 50" at (360, 300); the rabbit hops to the flag (`ANIM.rabbitHop`); rail dot; next item after 900 ms.
   - **Wrong (prediction p)**: `tone("nudge")`; the ghost trail draws p dashed hops from 47 (`ART.ghostHop`, 150 ms apart) ending on `ART.ghostMark` at 47 + p (or, when 47 + p > 50, the flag waves as the ghost passes it); then the true hops play as above with the misconception cue (Learning 1-2); `ART.eqText` shows "47 + 3 = 50". The tiles re-enable — attempt 2, with the truth visible; a correct tap completes the item as solved-with-help (no praise pop).
   - **Attempt 2 wrong**: the correct tile gains the show-me ring (`ART.showRing`, `ANIM.showMe`); tapping it completes the item as solved-with-help.
5. **Re-queue** (F-41): an item missed first-try returns after 2 intervening items as its MIRROR — the same ones digit in a different decade (47 → 27; the tens digit changes by +2, wrapping within 1-8 for L1-L2 and 5-9 for L3) — replacing the last unplayed item of the same level; the count stays 10.
6. **Items 2-10**: per Content/Rules. L1 gaps 1-4 with the ones frame visible while predicting; L2 gaps 5-9, frame only in the reveal; L3 any gap, decades 5-9 including 9x → 100, and the flag's label hidden ("?") until the reveal.
7. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 200) `ANIM.celebrate`; the summary = ten mini lines (`ART.miniLine`, 56 × 4) in a row at y = 400 (x = 360 − 4.5 × 64 + i × 64), each with a small `ART.tenFlag` at its right end and the item's "47+3" beneath in 14 px `THEME.colour.inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  rabbit:      { kind: "emoji", value: "🐇", size: 56 },
  numText:     { kind: "text",  value: "", size: 56, font: "display", color: "structure" },
  rod:         { kind: "shape", shape: "roundRect", w: 12, h: 44, fill: "structure", stroke: "bg", strokeWidth: 1, radius: 3 },
  onesCell:    { kind: "shape", shape: "rect", w: 24, h: 24, fill: "surface", stroke: "line", strokeWidth: 2 },
  onesFill:    { kind: "shape", shape: "circle", r: 8, fill: "structure" },          // inside a filled onesCell
  lineBar:     { kind: "shape", shape: "rect", w: 480, h: 4, fill: "line" },
  tick:        { kind: "shape", shape: "rect", w: 3, h: 18, fill: "inkSoft" },
  tickLabel:   { kind: "text",  value: "", size: 16, font: "body", color: "inkSoft" },
  tenFlag:     { kind: "shape", shape: "polygon", points: [[0,-70],[0,0],[4,0],[4,-70],[40,-58],[4,-46]], fill: "accent", stroke: "structure", strokeWidth: 2 },
  flagNum:     { kind: "text",  value: "", size: 22, font: "display", color: "inkOnAccent" },   // "50" or "?" on the flag
  counter:     { kind: "shape", shape: "circle", r: 12, fill: "structure", stroke: "bg", strokeWidth: 2 },
  hopBadge:    { kind: "shape", shape: "circle", r: 11, fill: "accent" },           // hop number 14 px display inkOnAccent, above the tick
  ghostHop:    { kind: "shape", shape: "arc", r: 24, stroke: "inkSoft", strokeWidth: 2 },   // dashed half-arc (lineDash [5,5]) from tick to tick
  ghostMark:   { kind: "shape", shape: "circle", r: 12, stroke: "inkSoft", strokeWidth: 2 },
  plusLabel:   { kind: "text",  value: "", size: 32, font: "display", color: "accent" },
  eqText:      { kind: "text",  value: "", size: 32, font: "display", color: "structure" },
  numeralTile: { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },   // numeral 44 px
  showRing:    { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniLine:    { kind: "shape", shape: "rect", w: 56, h: 4, fill: "structure" },
  dotEmpty:    { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:     { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "tile tapped" },
  hop:       { y: "-=36", duration: 130, ease: "Sine.Out", yoyo: true, trigger: "counter arc for one hop; x tweens to the next tick in a parallel 260 ms Sine.InOut tween" },
  cellIn:    { alpha: 1, scale: 1, duration: 150, ease: "Back.Out", trigger: "a ones cell fills in sync with a hop (from alpha 0, scale 0.4)" },
  flagWave:  { angle: 12, duration: 150, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "flag when reached or when the ghost passes it" },
  rabbitHop: { duration: 400, ease: "Sine.InOut", trigger: "rabbit x to the flag tick after a correct reveal (y −=30 then back in a parallel yoyo)" },
  ghostIn:   { alpha: 1, duration: 120, ease: "Sine.Out", trigger: "each ghost arc (from alpha 0), 150 ms apart" },
  pulse:     { scale: 1.3, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "hop badge 1 after an off-by-one prediction" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "wrong tile" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new line and tiles; the ones sketch at L2/L3 reveal (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring on the correct tile (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                      "47"  (360,84)                           │
      │              ▮▮▮▮  [•][•][•][•][•]   rods + ones frame y=132   │  zone A
      │                    [•][•][ ][ ][ ]                            │
      │   ─┬──┬──┬──┬──┬──┬──┬──R──┬──┬──F  line y=220, 40…50, pitch 48│
      │   40 41 42 43 44 45 46 47 48 49 50   labels y=244             │
260   ├──────────────────────────────────────────────────────────────┤
      │                 "47 + 3 = 50" (360,300) after reveal          │
      │        [ 3 ]        [ 7 ]        [ 2 ]   tiles y=390          │  zone B
480   ├──────────────────────────────────────────────────────────────┤
      │                     "+3" (360,500) after reveal               │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(R = `ART.rabbit` on the current tick; F in the diagram stands for `ART.tenFlag`.) Tick k of the decade (0-10) at x = 120 + 48 k. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.numText` at (360, 84). Sketch at y = 132: `ART.rod` × tens digit starting x = 268 (18 px pitch), the ones frame of `ART.onesCell`s centred (420, 132) (cells at 26 px pitch, two rows), filled cells carry `ART.onesFill`. Hidden until the reveal at L2/L3.
- `ART.lineBar` centred (360, 220); `ART.tick`s and `ART.tickLabel`s (y = 244) per level; `ART.rabbit` on the current tick at y = 190; `ART.tenFlag` with `ART.flagNum` on tick 10 (pole base at y = 220).
- Reveal art: `ART.counter` hopping along the line; `ART.hopBadge`s at tick x, y = 176; `ART.ghostHop` arcs between ticks at y = 200 and `ART.ghostMark` on the landing tick; `ART.eqText` at (360, 300); `ART.plusLabel` at (360, 500).
- Tiles: `makeTile` 96 × 96 (`ART.numeralTile`), label 44 px; `ART.showRing` behind the correct tile. Tab order: tiles left to right.
- Tap floors 96 ≥ 56; gaps 24.

## Content
Language-neutral (numerals only; no number words, per F-108). Items as (number; correct; distractors) where the distractors are the ones digit and the correct ± 1 (correct − 1 when ≥ 2, else + 1; when the ones digit is 5 both ± 1 are used):
- **L1** (gaps 1-4; decades 1-4; ones frame visible while predicting; all ticks labelled): 47 (3; 7, 2) · 18 (2; 8, 1) · 36 (4; 6, 3) · 29 (1; 9, 2) · 26 (4; 6, 3) · 38 (2; 8, 1) · 17 (3; 7, 2) · 49 (1; 9, 2)
- **L2** (gaps 5-9; decades 2-8; frame in the reveal only; labels 40, 47, 50 style): 41 (9; 1, 8) · 53 (7; 3, 6) · 62 (8; 2, 7) · 75 (5; 4, 6) · 84 (6; 4, 5) · 32 (8; 2, 7) · 55 (5; 4, 6) · 24 (6; 4, 5) · 73 (7; 3, 6) · 65 (5; 4, 6)
- **L3** (any gap; decades 5-9 including 9x → 100; flag label "?" until the reveal; only the number labelled): 91 (9; 1, 8) · 97 (3; 7, 2) · 58 (2; 8, 1) · 86 (4; 6, 3) · 93 (7; 3, 6) · 79 (1; 9, 2) · 64 (6; 4, 5) · 88 (2; 8, 1) · 95 (5; 4, 6) · 72 (8; 2, 7)

Play list of 10 per Rules with mirrored re-queue; tile positions shuffled per item; the correct slot never repeats twice running.

## Rules
- Item count: 10 (re-queued mirrors replace unplayed items of the same level).
- Difficulty progression: 2 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong first tap on 2 consecutive items → next item one level down (floor L1). A single miss re-queues its mirror after 2 items without changing level.
- What happens on a correct answer: hops with badges and rising tones, cells fill, flag waves, "+b" label, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], equation shown, rabbit hops to the flag, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - The ones digit (7 for 47): ghost trail of 7 hops passes the waving flag and marks 54; then the true hops; `tone("nudge")`; attempt 2.
  - Correct + 1 (counted the start): ghost lands one past the flag; in the replay hop badge 1 pulses on 48; attempt 2.
  - Correct − 1 (stopped short): ghost lands one before the flag; the last true hop's badge pulses; attempt 2.
  - Attempt 2 wrong: the show-me ring; solved-with-help.
- Retry behaviour: attempt 1 (prediction) → attempt 2 with the truth visible (solved-with-help) → attempt 3 show-me. No attempt 4. The mirrored re-queue follows any first-try miss.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Next Ten Gap". The play screen shows only numerals, "+", "=" and "?".

## Sound
`tone("tap")` on choosing a tile; `tone("tap", k)` on hop k (pitch rises with each hop); `tone("correct")` when the flag is reached after a correct prediction; `tone("nudge")` on a wrong prediction; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change; the play screen is numerals and symbols).
- [ ] Works at narrow width (400-px iframe: the numeral, the sketch, the whole decade line with the flag, and three tiles visible).
- [ ] Keyboard operable (Tab across the three tiles; Enter chooses and starts the reveal).
- [ ] Never auto-starts.
- [ ] No losing state (a wrong tile never ends the session; the revealed hops plus the show-me ring always complete the item).
- [ ] The rabbit sits on the number's tick and the flag on the next ten; the line shows exactly one decade.
- [ ] Tapping 3 for 47 makes a counter hop 48, 49, 50 with badges 1, 2, 3, fills three ones cells, waves the flag and shows "+3".
- [ ] Tapping 7 for 47 draws seven dashed hops that pass the flag and mark 54 before the true three hops play.
- [ ] At the first level the ones ten-frame is visible before tapping; at the second it appears only in the reveal; at the third the flag reads "?" until reached.
- [ ] "91" at the third level reaches a flag that reveals "100".
- [ ] A number missed at first try comes back two items later with a different tens digit and the same ones digit.
- [ ] Two first-try corrects in a row bring bigger gaps; two misses in a row bring smaller ones.
- [ ] The finish screen shows ten mini lines with flags and their "47+3" labels, no score.
- [ ] With `?sound=off` nothing is audible; with sound on, each hop is a higher note.
