# 046 — Number Pattern Gaps

## Identity
- Slug: `number-pattern-gaps`
- Subject / topic: Mathematics / number sequences with a constant step (2, 3, 5, 10; ascending and descending) — finding the missing term
- Age band: `6-8`
- Interaction pattern: `P11` — keypad entry (two-digit answers; physical keyboard digits also work)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P11 (6-8: one- or two-digit answers only; display drawn ON the prompt object).

## Learning
- Objective: Fills the missing term of a five-term number sequence with a constant step by finding the step from the given terms and typing the term.
- Prerequisites: Reads and writes numerals to 100; counts on and back in ones; has met skip-counting trails (game 041).
- Curriculum links: F-1 (skip counting / number sequences), F-21 ("skip counting / number sequences" in all twelve systems), F-31 row "Skip counting 2/5/10" — conservative 7-8, earliest 6 → 6-8 (US 2.NBT.A.2 / 2.OA.C.3 patterns; England Y2 "count in steps of 2, 3, and 5 from 0, and in tens from any number, forward and backward"; Germany Klasse 2 "Zahlenfolgen fortsetzen"; France CE1 "suites de nombres de 2 en 2, 5 en 5, 10 en 10"; Netherlands groep 4 "tellen met sprongen, terugtellen"; Spain 1º ciclo "series ascendentes y descendentes"; Brazil EF02MA09 "sequências numéricas recursivas"; Sweden åk 1-3 "talföljder"; Finland grade 1-2 "lukujonot eteen- ja taaksepäin").
- Common misconceptions (F-109, F-116), each with this game's response:
  1. **Reading the gap as "the next counting number" (4, 7, 10, _, 16 → types 11).** Response: the jump strip under the cards enacts the rule — equal arcs labelled "+3" draw between the given neighbours (`ART.jumpArc` + `ART.jumpLabel`, `ANIM.arcIn`, `tone("tap", k)`), then the child's 11 is placed in the gap and the two arcs around it draw in coral with their ACTUAL sizes (`ART.jumpArcWrong` "+1" and "+5"). Unequal jumps are seen, not announced.
  2. **Using a nearby wrong step (types 12 — a +2 habit).** Response: the same strip: "+3, +3, +2, +4". The strip fades and the display clears for attempt 2.
  3. **Over-generalising "5s end in 0 or 5" (2, 7, _, 17, 22 → types 15).** Response: "+5, +8, +2, +5" — the 5s rule off a multiple keeps the ones digit alternating 2/7, and the coral arcs show the break.
  4. **Reading a descending sequence as ascending (50, _, 30, 20, 10 → types 60).** Response: every arc carries its sign; the given arcs read "−10, −10, −10" and the coral pair reads "+10, −30". L3 also puts the gap at the FIRST position so the child must step backward from the second term.
  5. **Copying a neighbour (types 10 again).** Response: "+3, +0, +6".
  6. **Digit order in two-digit numbers (13 typed as 31 — F-102 transcoding).** Response: the display shows digits as they are typed, left to right, on a two-cell display (`ART.digitCell` tens | ones) so the tens position is visibly first; a wrong-order entry is treated as any other wrong answer (the arcs show "+21, −15"), never as a special error.

## How it plays
1. **Start screen**: title "Number Pattern Gaps", the fox (`ART.fox`) at (360, 200), Start, picker.
2. **Item 1 (L1: 2, 4, 6, _, 10)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: five term cards (`ART.termCard`, 100 × 64) at y = 120, x = 120 / 240 / 360 / 480 / 600, each showing its number in 36 px; the missing term is `ART.gapCard` (coral outline, cream fill) holding the two-cell display (`ART.digitCell` × 2, side by side, each 36 × 48) that shows the typed digits in 40 px. Below the cards, the jump strip: `ART.lineBar` from x = 90 to 630 at y = 200 with an `ART.tick` under each card; arcs are drawn only during feedback. The fox sits at (48, 160). Zone B: the keypad — row 1 keys 1 2 3 4 5 at y = 300, row 2 keys 6 7 8 9 0 at y = 380 (`ART.key`, 64 × 64, x = 208 / 284 / 360 / 436 / 512). Zone C: the backspace key (`ART.key` with `ART.backGlyph`) at (250, 512) and Check (`makeButton ok`) at (450, 512), disabled until at least one digit is typed.
3. **Typing**: tap a digit → it appears in the next display cell (`ANIM.digitIn`, `tone("tap")`); a third digit is refused (`ANIM.nudge` on the display, no sound); backspace removes the last digit; physical keys 0-9, Backspace and Enter do the same. Check enables at one digit.
4. **Check**: tap OK (or Enter).
   - **Correct**: the gap card becomes a solid `ART.termCard` with the number (`ANIM.pop`), the jump strip draws all four arcs in teal with their labels (`ANIM.arcIn`, 200 ms apart, `tone("tap", k)`), `tone("correct")`, praise pop (rotation), the fox `ANIM.flick` (a tail-wag angle wobble), the rail dot fills; after 900 ms the cards clear (`ANIM.rise`) and the next sequence `ANIM.appear`s.
   - **Wrong**: `tone("nudge")`; the arcs between GIVEN neighbours draw in teal with their labels; then the child's number is placed in the gap and the arc(s) touching the gap draw in coral (`ART.jumpArcWrong`, `ART.jumpLabelWrong`) with the actual differences (signed); after 1800 ms the coral arcs fade (`ANIM.fadeOut`) and the display clears with `ANIM.nudge`; the teal arcs stay for the rest of the item (the rule is now visible). Attempt 2.
   - **Second wrong**: the same enactment. Attempt 3.
   - **Third wrong**: the show-me — the correct number builds itself digit by digit in the display (`ANIM.digitIn`, 400 ms apart, `tone("tap", k)`), holds 1200 ms, then clears; the child re-types it and taps OK; the item completes as solved-with-help (no praise pop). If the re-typed number is wrong again the show-me repeats (no limit; success is certain).
5. **Items 2-12**: per Content/Rules. L1 = steps +2, +5, +10 from multiples, gap in position 4 or 5; L2 = steps +2, +3, +5 from off-multiples, gap in positions 2-4; L3 = descending sequences, gaps in position 1 or 2, decade crossings.
6. **Finish**: `t("all_done")` (360, 110); the fox (360, 210) `ANIM.celebrate`; the summary = the twelve completed sequences as `ART.seqChip`s (200 × 32, the five numbers in 16 px) in three rows of four (y = 330, 374, 418; x = 130 + i × 154), first-try ones with a filled `ART.dotFull` at the left, helped ones with a hollow `ART.dotEmpty`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  fox:            { kind: "emoji", value: "🦊", size: 64 },
  termCard:       { kind: "shape", shape: "roundRect", w: 100, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },      // number 36 px display ink
  gapCard:        { kind: "shape", shape: "roundRect", w: 100, h: 64, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 12 },
  digitCell:      { kind: "shape", shape: "roundRect", w: 36, h: 48, fill: "surface", stroke: "line", strokeWidth: 1, radius: 6 },       // two, at x −20 / +20 inside the gap card; digit 40 px display ink
  lineBar:        { kind: "shape", shape: "rect", w: 540, h: 4, fill: "line" },
  tick:           { kind: "shape", shape: "rect", w: 4, h: 16, fill: "inkSoft" },
  jumpArc:        { kind: "shape", shape: "arc", r: 60, stroke: "structure", strokeWidth: 4 },     // a half-circle arc from one tick to the next (r = 60 for the 120 px pitch), drawn above the bar
  jumpArcWrong:   { kind: "shape", shape: "arc", r: 60, stroke: "accent", strokeWidth: 4 },        // dashed: lineDash [8,6]
  jumpLabel:      { kind: "text",  value: "", size: 20, font: "display", color: "structure" },     // "+3" / "−10" at the arc's top
  jumpLabelWrong: { kind: "text",  value: "", size: 20, font: "display", color: "accent" },
  key:            { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },       // digit 32 px display ink
  backGlyph:      { kind: "text",  value: "⌫", size: 30, font: "display", color: "structure" },
  showRing:       { kind: "shape", shape: "roundRect", w: 232, h: 84, stroke: "structure", strokeWidth: 4, radius: 22 },
  seqChip:        { kind: "shape", shape: "roundRect", w: 200, h: 32, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:       { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:        { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  digitIn:   { alpha: 1, scale: 1, duration: 140, ease: "Back.Out", trigger: "a digit typed / built in the display (from alpha 0, scale 0.6)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "display on a refused third digit; display clearing after a wrong Check" },
  arcIn:     { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each jump arc and its label, 200 ms apart, left to right (from alpha 0)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "coral arcs 1800 ms after a wrong Check" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the gap card on a correct Check" },
  flick:     { angle: 8, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "fox on a correct Check" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "cards and arcs clearing before the next item" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new cards (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around OK while a show-me answer is to be re-typed (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish fox" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "3 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ (fox)  [ 4 ]   [ 7 ]   [ 10 ]   [ _|_ ]   [ 16 ]   cards y=120 │  zone A
      │ (48,160) x=120  240     360      480       600     (100×64)   │
      │          ╭──+3──╮╭──+3──╮╭──?──╮╭──?──╮  arcs (feedback only)   │
      │        ──┴──────┴───────┴──────┴──────┴──  bar y=200, ticks     │
260   ├──────────────────────────────────────────────────────────────┤
      │         [1]   [2]   [3]   [4]   [5]     y=300                 │
      │         [6]   [7]   [8]   [9]   [0]     y=380  (64×64)        │  zone B
      │         x=208  284   360   436   512                          │
480   ├──────────────────────────────────────────────────────────────┤
      │          [⌫] (250,512)         [   OK   ] (450,512)           │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Arcs span tick to tick (pitch 120) as half-circles of radius 60 above the bar, labels at the arc's top (y = 140 − 6 → drawn at y = 134; cards sit above at y = 120 so the arc tops tuck just under the cards: the arc is drawn with its centre on the bar and only its upper half, radius 60, reaching y = 140; the label at y = 156 in the gap between the arc peak and the bar). The builder draws the arc as `graphics.arc(cx, 200, 60, Math.PI, 0)` with a stroke; no fill.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.fox` at (48, 160). Cards `ART.termCard` at y = 120 with the number 36 px `THEME.font.display` `THEME.colour.ink`; the gap = `ART.gapCard` at the same slot holding two `ART.digitCell`s at (x − 20, 120) and (x + 20, 120); typed digits 40 px `THEME.font.display` `THEME.colour.ink`. A one-digit answer occupies the LEFT cell only (the child types "8", not "08"); the right cell stays empty.
- `ART.lineBar` centred (360, 200); `ART.tick`s at each card x, y = 200; arcs and labels as in Screen layout.
- Keypad: ten `makeTile` 64 × 64 with `ART.key` tokens, digit 32 px `THEME.font.display` `THEME.colour.ink`; backspace `makeTile` 64 × 64 with `ART.backGlyph`; Check `makeButton` `ok` at (450, 512), alpha 0.5 while disabled; `ART.showRing` around it.
- Tap floors 64 ≥ 56; gaps 12. Keyboard: Tab order = keys 1 … 0, backspace, OK; physical digit keys, Backspace and Enter are listened to on `keydown`.

## Content
Language-neutral (numerals and signs; the arc labels are "+n" / "−n").

Items as (the five terms with the gap _; the answer). Every term is 0-100.
- **L1** (ascending from a multiple; steps +2, +5, +10; gap in position 4 or 5): (2, 4, 6, _, 10; 8) · (5, 10, 15, 20, _; 25) · (10, 20, 30, _, 50; 40) · (4, 6, 8, 10, _; 12) · (15, 20, 25, _, 35; 30) · (20, 30, 40, 50, _; 60)
- **L2** (ascending from an off-multiple; steps +2, +3, +5; gap in positions 2-4): (3, 5, _, 9, 11; 7) · (4, 7, 10, _, 16; 13) · (2, 7, _, 17, 22; 12) · (1, _, 7, 10, 13; 4) · (13, 15, 17, _, 21; 19) · (6, 9, _, 15, 18; 12) · (11, _, 21, 26, 31; 16)
- **L3** (descending; steps −2, −3, −5, −10; gaps in position 1 or 2; decade crossings; two ascending items with the gap first): (_, 27, 24, 21, 18; 30) · (50, _, 30, 20, 10; 40) · (_, 35, 30, 25, 20; 40) · (_, 16, 19, 22, 25; 13) · (48, 45, _, 39, 36; 42) · (_, 62, 52, 42, 32; 72) · (29, 27, 25, _, 21; 23) · (_, 23, 28, 33, 38; 18)

Play list of 12 per Rules with re-queue: an item answered wrong at first Check re-enters after 2 intervening items (F-41), replacing the last unplayed item of the same level; shuffle within level, levels in order; two consecutive items never share the same step size.

## Rules
- Item count: 12 (re-queued repeats replace unplayed items).
- Difficulty progression: 2 consecutive first-Check correct → next level (cap L3).
- Adaptation: a wrong Check, or non-first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: gap card `ANIM.pop`, all four arcs in teal with `tone("tap", k)`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], fox `ANIM.flick`, rail dot, next item after 900 ms.
- What happens on a wrong answer (each begins with `tone("nudge")`; teal arcs between given neighbours draw first and stay; the display clears after the coral arcs fade):
  - Next counting number (11 for 4, 7, 10, _, 16): coral arcs "+1" and "+5" around the gap.
  - Wrong step (12): coral "+2" and "+4".
  - "Ends in 0 or 5" (15 for 2, 7, _, 17, 22): coral "+8" and "+2".
  - Descending read as ascending (60 for 50, _, 30, 20, 10): coral "+10" and "−30".
  - Copied a neighbour (10): coral "+0" and "+6".
  - Reversed digits (31 for 13): coral arcs with the actual differences; no special message.
  - Third digit typed: refused with a nudge; not an attempt.
- Retry behaviour: attempt 1 → attempt 2 after the arcs → attempt 3 after the arcs again → the show-me (the answer builds itself on the display, then the child re-types it with OK ringed); solved-with-help; the item re-queues later. No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Number Pattern Gaps". The play screen carries only numerals and signs.

## Sound
`tone("tap")` on each key; `tone("tap", k)` per arc drawn (k = 1 … 4, pitch rises along the sequence) and per digit built in the show-me; `tone("correct")` on a correct Check; `tone("nudge")` on a wrong Check; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, Question x of y, All done, Play again, Menu and praise change with the picker; the play screen is numerals).
- [ ] Works at narrow width (400-px iframe: five cards, the strip, ten keys, backspace and OK visible and separate).
- [ ] Keyboard operable (physical 0-9 type, Backspace deletes, Enter checks; Tab walks the keys, backspace and OK).
- [ ] Never auto-starts.
- [ ] No losing state (wrong Checks never end the session; the answer builds itself and re-typing it completes the item).
- [ ] Typing shows digits left to right in the gap card; a third digit is refused with a wiggle; backspace removes the last digit.
- [ ] OK is dimmed until a digit is typed.
- [ ] Checking 11 for 4, 7, 10, _, 16 draws teal "+3" arcs between the given cards, then dashed coral "+1" and "+5" arcs around the gap, which fade while the teal ones stay.
- [ ] Checking 13 turns the gap card solid and draws four teal "+3" arcs with rising notes.
- [ ] A descending sequence shows "−10" labels; a gap in the first position accepts the number before the second term.
- [ ] A third wrong Check makes the answer appear digit by digit in the gap, then clear; typing it and checking completes the item.
- [ ] A missed sequence comes back two items later.
- [ ] Two first-Check corrects in a row bring off-multiple or descending sequences; a wrong Check brings a multiple-start sequence next.
- [ ] The finish screen lists the twelve sequences as chips with filled or hollow dots; no score, no time.
- [ ] With `?sound=off` nothing is audible.
