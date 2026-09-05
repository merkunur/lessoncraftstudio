# 033 — Fact-Family House

## Identity
- Slug: `fact-family-house`
- Subject / topic: Mathematics / fact families — the four related facts of three numbers (3, 4, 7 → 3 + 4 = 7, 4 + 3 = 7, 7 − 3 = 4, 7 − 4 = 3)
- Age band: `6-8`
- Interaction pattern: `P2` — tap to place (tap a numeral in the bank, then tap a slot in an equation frame)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2 (judged per placement group: a frame is judged the moment its three slots are full). Sibling games: 004 (bonds to 10), 009/032 (the equals sign as balance).

## Learning
- Objective: Builds all four facts of a fact family (two additions, two subtractions) by placing the family's three numerals into four equation frames so that every frame is true and no fact is repeated.
- Prerequisites: Adds and subtracts within 10 with objects; reads numerals to 20 and the symbols + − =; has met a part-part-whole picture.
- Curriculum links: F-1 (addition/subtraction within 20 — the most universal topics), F-21, F-31 rows "Number bonds to 10 / part-whole" and "+/− facts to 20" — conservative 7-8 → 6-8 (US 1.OA.B.3-4 "apply properties … understand subtraction as an unknown-addend problem"; England Y1-2 "inverse relationship"; Germany Klasse 1-2 "Umkehraufgaben, Tauschaufgaben"; France CP-CE1 "familles d'opérations"; Netherlands groep 3-4 "splitsen, omkeren"; Spain 1º ciclo; Brazil EF02MA06; Sweden åk 1-3 "sambandet addition–subtraktion"; Finland grade 1-2).
- Common misconceptions (F-104, F-106, F-107), each with this game's response:
  1. **The largest number placed as a part ("3 + 7 = 4").** Response: the frame shows each placed number as a row of dots beneath the slots (`ART.dotRow`), the two rows gather into one (`ANIM.gather`) and the true total appears in `ART.trueTotal` ("10") beside the "= 4" slot for 900 ms; then the frame's copies glide back to the bank. From L3 the roof shows the three numbers in a row (not apex-and-base), so identifying the whole is part of the task.
  2. **Not linking 3 + 4 to 4 + 3 (placing the same addition twice).** Response: a frame that repeats a locked fact does not lock: it `ANIM.nudge`s, the locked twin frame `ANIM.pulse`s, and the frame clears. On a second identical repeat the two addends visibly swap places in the frame (`ANIM.swap`) and it locks as the other fact — solved-with-help (the swap IS the commutativity, shown not told).
  3. **Smaller-from-larger in subtraction ("4 − 7 = 3", F-106).** Response: the frame shows 4 dots under the first slot; 7 try to lift away but only 4 can (`ANIM.rise` on the 4 dots), then 3 hollow `ART.ghostDot`s appear and nudge — the take is impossible; the frame clears. Nothing is called wrong; the material refuses.
  4. **Operational "=" — reading a frame left to right as "do the sum" and putting the whole first in an addition frame ("7 + 3 = 4").** Response: the dot rows gather (7 + 3 → 10) and `ART.trueTotal` shows 10 beside the 4; the frame clears. (7 = 3 + 4 is not a frame shape here; the frames are fixed `_ + _ = _` and `_ − _ = _`.)
  5. **Subtracting to the wrong part ("7 − 3 = 3").** Response: 7 dots, 3 rise away, the remaining 4 pulse as a group and `ART.trueTotal` shows "4" beside the last slot; the frame clears.

## How it plays
1. **Start screen**: title "Fact-Family House", the squirrel (`ART.squirrel`) at (360, 200), Start, picker.
2. **Item 1 (L1: family 3, 4, 7)**: rail of 10 dots (§6). Zone A: the roof (`ART.roof`, a triangle 320 wide, 130 tall) centred at (360, 140); `ART.roofCard` "7" at the apex (360, 110); `ART.roofCard` "3" and "4" at the base corners (280, 175) and (440, 175); the squirrel at (100, 170). Zone B: the house body — four equation frames (`ART.frame`, 300 × 72) at (190, 300), (530, 300), (190, 400), (530, 400). Each frame holds three empty slots (`ART.slot`, 56 × 56, dashed) at frame x −100, 0, +100 with `ART.opText` between the first two ("+" in the top two frames, "−" in the bottom two) at x −50 and `ART.eqGlyph` "=" at x +50. Zone C: the numeral bank — three `ART.bankTile`s (64 × 64) at (250, 512), (360, 512), (470, 512) showing 3, 4, 7 (shuffled order). Caption: none.
3. **Placing**: tap a bank tile — it lifts (`api.setSelected(true)`, `ANIM.lift`) and stays in the bank (the bank is a source of copies); tap a slot — a copy (`ART.chip`) glides (`ANIM.glide`) from the bank into the slot, `tone("tap", n)` (pitch = the numeral). Tap a filled slot: its chip glides back to the bank and vanishes (undo). A full slot refuses an arriving chip (`ANIM.nudge`, no message). Tapping another bank tile before a slot switches the selection.
4. **A frame fills** (three chips): 500 ms later the frame judges itself:
   - **True and new**: the frame locks — fill turns `THEME.colour.structureSoft`, stroke thickens, `ANIM.pop`, `tone("correct")`, its slots disable, `ART.lockMark` (a small filled circle) appears at the frame's right edge.
   - **False**: the enacted hint for the error (Learning 1, 3, 4, 5) plays on the frame's `ART.dotRow`s, `tone("nudge")`, then the chips glide back and the frame is empty again. This counts as one wrong attempt on that frame.
   - **True but a repeat of a locked frame**: `ANIM.nudge` on the frame, `ANIM.pulse` on the twin, chips glide back. One wrong attempt.
   - **Third wrong attempt on one frame**: show-me — the frame fills itself (chips glide in from the bank 300 ms apart with tones) with a not-yet-used true fact and locks; solved-with-help.
5. **Family complete** (four frames locked): `tone("correct")` again, praise pop, the roof `ANIM.settle` (drops 6 px and back) and the squirrel `ANIM.hop`; the rail dot fills; after 900 ms the frames clear and the next family's roof appears (`ANIM.appear`). First-try = all four frames locked with no false frame and no repeat.
6. **Items 2-10**: per Content/Rules. L1 wholes ≤ 10 with apex-and-base roof; L2 wholes 11-20 with a ten as one part; L3 wholes 11-20 crossing ten AND the roof shows its three numbers in a row (`ART.roofCard`s at (270, 150), (360, 150), (450, 150)), so the child must pick out the whole.
7. **Finish**: `t("all_done")` (360, 110); the squirrel (360, 200) `ANIM.celebrate`; the summary = ten little houses (`ART.miniHouse`, 56 × 48) in a row at y = 400 (x = 360 − 4.5 × 64 + i × 64), each labelled beneath with its family "3·4·7" in 14 px `THEME.colour.inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  squirrel:  { kind: "emoji", value: "🐿️", size: 80, fallback: "🐭" },
  roof:      { kind: "shape", shape: "polygon", points: [[-160,65],[160,65],[0,-65]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  roofCard:  { kind: "shape", shape: "roundRect", w: 60, h: 60, fill: "surface", stroke: "structure", strokeWidth: 2, radius: 12 },   // numeral 32 px display ink
  frame:     { kind: "shape", shape: "roundRect", w: 300, h: 72, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },        // locked: fill structureSoft, stroke structure 3 px
  slot:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 10 },        // dashed (lineDash [6,5]) while empty
  chip:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },  // numeral 30 px display ink
  opText:    { kind: "text",  value: "", size: 30, font: "display", color: "inkSoft" },     // "+" or "−"
  eqGlyph:   { kind: "text",  value: "=", size: 30, font: "display", color: "inkSoft" },
  bankTile:  { kind: "shape", shape: "roundRect", w: 64, h: 64, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },        // numeral 34 px display ink
  dotRow:    { kind: "shape", shape: "circle", r: 5, fill: "structure" },        // one per unit, 12 px apart, under a slot
  ghostDot:  { kind: "shape", shape: "circle", r: 5, stroke: "accent", strokeWidth: 2 },
  trueTotal: { kind: "text",  value: "", size: 28, font: "display", color: "accent" },
  lockMark:  { kind: "shape", shape: "circle", r: 7, fill: "structure" },
  miniHouse: { kind: "shape", shape: "polygon", points: [[-28,24],[28,24],[28,0],[0,-24],[-28,0]], fill: "structureSoft", stroke: "structure", strokeWidth: 1 },
  dotEmpty:  { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:   { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "bank tile selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "chip from bank to slot / back to bank (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement; repeated fact; ghost dots" },
  pop:       { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "frame locks" },
  gather:    { duration: 400, ease: "Sine.InOut", trigger: "two dot rows slide together into one row under the '=' slot (x,y set at call)" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "subtracted dots lift away, 80 ms apart" },
  pulse:     { scale: 1.08, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "twin locked frame; remaining dot group" },
  swap:      { x: "+=200", duration: 400, ease: "Sine.InOut", trigger: "show-me for a repeat: first-slot chip moves to the second slot while the other moves −=200" },
  settle:    { y: "+=6", duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "roof when the family completes" },
  hop:       { y: "-=24", duration: 160, ease: "Sine.Out", yoyo: true, trigger: "squirrel when the family completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new roof cards and bank (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish squirrel" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                        ╱ [7] ╲   apex (360,110)               │
      │ squirrel(100,170)    ╱         ╲   roof (360,140)             │  zone A
      │                    [3]  ─────  [4]   base (280,175) (440,175) │
260   ├──────────────────────────────────────────────────────────────┤
      │  [ _ + _ = _ ] (190,300)        [ _ + _ = _ ] (530,300)       │  zone B
      │  [ _ − _ = _ ] (190,400)        [ _ − _ = _ ] (530,400)       │
      │   slots at frame x −100 / 0 / +100, 56×56; dots below         │
480   ├──────────────────────────────────────────────────────────────┤
      │            [ 3 ]      [ 4 ]      [ 7 ]   bank y=512 (64×64)   │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Frames span x 40-340 and 380-680. Dot rows sit at frame y + 46, just inside the frame's lower edge.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.squirrel` at (100, 170). `ART.roof` centred (360, 140); `ART.roofCard`s at (360, 110), (280, 175), (440, 175) (L1-L2) or in a row at y = 150, x = 270 / 360 / 450 (L3), numerals 32 px `THEME.font.display` `THEME.colour.ink`.
- Frames: `ART.frame` × 4 at the centres above; each slot a `makeTile` 56 × 56 with `ART.slot` tokens (dashed while empty); `ART.opText` at frame x −50 and `ART.eqGlyph` at frame x +50, y = frame y. A locked frame redraws with `THEME.colour.structureSoft` fill and a 3-px `THEME.colour.structure` stroke plus `ART.lockMark` at frame x +138.
- Chips: `ART.chip` with the numeral 30 px; `ART.dotRow` dots under a slot at frame y + 46 (12 px apart, centred under the slot; a row of more than 7 wraps to a second line 12 px lower); `ART.ghostDot`s continue a row; `ART.trueTotal` at frame x +140, frame y − 30.
- Bank: `makeTile` 64 × 64 (`ART.bankTile`) at (250, 512), (360, 512), (470, 512), numerals 34 px.
- Tab order: bank tiles left to right, then the twelve slots in reading order (frame 1 slots, frame 2, frame 3, frame 4). Enter on a bank tile selects; Enter on a slot places / returns.
- Tap floors 56 (slots) / 64 (bank) ≥ 56; slot pitch 100 → 44 px gaps; bank pitch 110 → 46 px gaps.

## Content
Language-neutral (numerals and symbols). Families as (part, part, whole):
- **L1** (whole ≤ 10; apex-and-base roof): (3, 4, 7) · (2, 5, 7) · (4, 6, 10) · (1, 8, 9) · (3, 5, 8) · (2, 4, 6) · (3, 7, 10) · (2, 6, 8)
- **L2** (whole 11-20 with a ten as one part; apex-and-base roof): (10, 3, 13) · (5, 10, 15) · (2, 11, 13) · (10, 7, 17) · (4, 10, 14) · (12, 6, 18) · (10, 9, 19) · (3, 12, 15)
- **L3** (whole 11-20 crossing ten; roof numbers in a ROW, shuffled, so the whole must be identified): (6, 8, 14) · (7, 9, 16) · (5, 7, 12) · (8, 9, 17) · (4, 9, 13) · (6, 7, 13) · (8, 3, 11) · (9, 6, 15)

No doubles (a, a, 2a) appear — a doubles family has only two distinct facts. The four accepted facts per family: a + b = c, b + a = c, c − a = b, c − b = a; each may lock once; the top frames accept only additions, the bottom frames only subtractions.

Play list of 10 per Rules; shuffled within level; no family repeats; bank order shuffled per family.

## Rules
- Item count: 10 families (4 frames each).
- Difficulty progression: 2 consecutive first-try families → next level (cap L3).
- Adaptation: any false or repeated frame in a family, or a non-first-try family twice running → next family one level down (floor L1).
- What happens on a correct answer: per frame — lock, `ANIM.pop`, `tone("correct")`; per family — praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], roof `ANIM.settle`, squirrel `ANIM.hop`, rail dot, next family after 900 ms.
- What happens on a wrong answer:
  - Whole used as a part (3 + 7 = 4): dot rows gather, `ART.trueTotal` "10" shows, `tone("nudge")`, frame clears.
  - Whole first in an addition frame (7 + 3 = 4): same as above.
  - Repeated fact (3 + 4 = 7 twice): frame nudges, twin pulses, frame clears; second repeat → `ANIM.swap` and the frame locks as the other fact (solved-with-help).
  - Smaller-from-larger (4 − 7 = 3): only 4 dots can rise, 3 ghost dots nudge, frame clears.
  - Wrong difference (7 − 3 = 3): 3 dots rise, the remaining 4 pulse, `ART.trueTotal` "4", frame clears.
  - A chip into a full slot: springs back, no message (not an attempt).
- Retry behaviour: per frame — attempt 1 → attempt 2 after the enacted hint → attempt 3 the frame fills itself and locks (solved-with-help). No attempt 4 on any frame. A family is never abandoned.
- Finish condition: 10 families complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Fact-Family House". The play screen shows only numerals and the symbols + − =.

## Sound
`tone("tap")` on selecting a bank tile; `tone("tap", n)` on placing a chip (pitch = the numeral, capped at 20); `tone("correct")` on a frame lock and again on family completion; `tone("nudge")` on a false or repeated frame; `tone("tap", k)` per dot during a gather or a rise; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change; the play screen is symbols only).
- [ ] Works at narrow width (400-px iframe: roof, four frames, twelve slots and the three bank tiles visible and separate).
- [ ] Keyboard operable (Tab: bank tiles, then slots in reading order; Enter selects / places / returns).
- [ ] Never auto-starts.
- [ ] No losing state (any number of false frames still ends with all four frames locked via the frame filling itself).
- [ ] Tapping a bank numeral then a slot puts a copy in the slot; the bank tile stays; tapping the placed copy returns it.
- [ ] A frame judges itself only when all three of its slots are full; "3 + 4 = 7" locks with a thicker outline and a dot mark.
- [ ] "3 + 7 = 4" shows the dots gathering into ten and a coral "10", then the frame empties.
- [ ] "4 − 7 = 3" lifts only four dots and shows three hollow dots that wiggle; the frame empties.
- [ ] Placing "3 + 4 = 7" in both addition frames makes the second one wiggle and the first pulse; a second try swaps the addends and locks it as "4 + 3 = 7".
- [ ] At the third level the roof shows its three numbers in a row and the largest is not always in the middle.
- [ ] Two first-try families in a row bring larger wholes; a false frame brings smaller ones next.
- [ ] The finish screen shows ten little houses labelled with their families and no score.
- [ ] If the squirrel emoji is missing on the device a mouse appears instead.
- [ ] With `?sound=off` nothing is audible.
