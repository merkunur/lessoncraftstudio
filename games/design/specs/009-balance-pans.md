# 009 — Balance Pans

## Identity
- Slug: `balance-pans`
- Subject / topic: Mathematics / the equals sign as "the same amount on both sides" (relational equality within 20)
- Age band: `6-8`
- Interaction pattern: `P9` — set a value (+/− stepper) with a Check
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P9 (stepper form).

## Learning
- Objective: Makes a two-pan scale balance by setting the one missing number so that the two sides have the same total, in equations written in standard AND non-standard forms (3 + 4 = _ + 5; 7 = _ + 2; _ + 3 = 4 + 3).
- Prerequisites: Adds within 10 with objects; reads numerals to 20.
- Curriculum links: F-107 (the operational "=" persists to grade 4 and predicts algebra difficulty — McNeil), F-21, F-31 row "Equals sign as balance" — conservative 7-9, earliest 6 → 6-8 (US 1.OA.D.7 "understand the meaning of the equal sign"; England Y1-2 "= sign … equivalence"; Germany Klasse 1-2 "Gleichungen"; France CP-CE1 "égalité"; Netherlands groep 3-4; Spain 1º ciclo "= ≠"; Brazil EF03MA11; Sweden åk 1-3 "likhetstecknets betydelse"; Norway 2. trinn "= ≠").
- Common misconceptions (F-107), each with this game's response:
  1. **Operational view: "=" means "the answer comes next" — for 3 + 4 = _ + 5 the child sets 7.** Response: with 7 on the right the pan holds 12 and the beam tips visibly toward it (`ANIM.tip`, angle proportional to the difference), with both totals shown on the pans (`ART.panTotal` 7 vs 12). Nothing is said; the tilt is the feedback. The child steps the number until the beam levels.
  2. **Add-all: 3 + 4 = _ + 5 → 12.** Response: same tilt, larger (12 + 5 = 17 vs 7); the difference is visible as the beam's angle and the totals.
  3. **Rejecting non-standard forms (7 = _ + 2 "is backwards").** Response: L1 already includes forms with the operation on the right and a bare number on the left; the pans make the form irrelevant — each side is just a pan with things in it.
  4. **Counting the weights wrongly (misreading the visual).** Response: every number on a pan is shown BOTH as a numeral and as that many weight blocks (`ART.weight`, stacked in fives), so the total is countable; on Check, if unbalanced, the weights on each side count themselves (`ART.countBadge`) before the totals show.

## How it plays
1. **Start screen**: title "Balance Pans", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1: 3 + 4 = _ + 5)**: rail of 10 dots (§6). Zone A: a pan balance — the post (`ART.post`) at (360, 240), the beam (`ART.beam`, 520 × 12) pivoting at (360, 150), the left pan (`ART.pan`) hanging at (160, 220) and the right pan at (560, 220). Each pan shows its contents: numerals in `ART.numCard`s (3 and 4 on the left, the blank card `ART.blankCard` and 5 on the right), and beneath the cards the weights (`ART.weight` 18 × 18 blocks, stacked in columns of five, one column per number, `structure` fill). The blank card shows the current value (starts at 0 and shows "0"; its weights column is empty). Under the beam the equation in words-free form (`ART.eqText`): "3 + 4 = ▢ + 5" at (360, 300) with the box drawn as `ART.blankCard` mini. Zone B: the stepper — a big minus tile (`ART.stepTile` with `ART.minus`) at (260, 400), the value display (`ART.valueCard`, 96 × 96, shows the current blank value at 48 px) at (360, 400), a big plus tile (`ART.stepTile` with `ART.plus`) at (460, 400). Zone C: Check (`makeButton ok`) at (360, 510), enabled from the start.
3. **Setting**: tap + or −; the value display changes (range 0-20, clamped; `tone("tap", v)` so the pitch tracks the value), the blank card on the pan updates, and its weights column gains/loses a block (`ANIM.blockIn` / `ANIM.blockOut`). The beam does NOT move while setting (the scale is "held" until Check — otherwise the child could search by watching the beam without thinking; this is the predict-then-reveal discipline of F-40/F-46).
4. **Check**: tap OK. The beam releases:
   - **Balanced**: `ANIM.level` (beam settles to 0° with a small overshoot), `tone("correct")`, praise pop, `ART.eqText` fills the box ("3 + 4 = 2 + 5"), both `ART.panTotal`s show "7" and "7", the owl `ANIM.nod`; rail dot; next item after 900 ms.
   - **Unbalanced**: the weights on each pan count themselves (badges 1..n, `tone("tap", k)`, 120 ms apart, left then right), both `ART.panTotal`s appear, then the beam tips (`ANIM.tip`) toward the heavier side by min(30°, 4° × difference); `tone("nudge")`. The beam stays tipped while the child steps; it re-levels only on the next Check. Attempt 2.
   - **Second unbalanced Check**: the same, then the value display gains the show-me ring (`ART.showRing`, `ANIM.showMe`) and the correct value flashes in the blank card once per second (`ANIM.hintFlash` — alpha of `ART.hintValue`, ≤ 1 Hz, no strobe) until the child sets it and checks; solved-with-help.
5. **Items 2-10**: per Content/Rules. L1 the blank is on the right, sums ≤ 10; L2 the blank moves to either side and bare-number forms appear (7 = _ + 2); L3 both sides have two addends and sums to 20 (_ + 6 = 9 + 4), including subtraction on one side at the last two items (10 − 3 = _ + 2).
6. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the summary = ten mini balances (`ART.miniScale`, 56 × 30) in a row at y = 400, each level, labelled with its equation in 14 px beneath; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  owl:        { kind: "emoji", value: "🦉", size: 80 },
  post:       { kind: "shape", shape: "polygon", points: [[-30,90],[30,90],[6,-90],[-6,-90]], fill: "structure" },
  beam:       { kind: "shape", shape: "rect", w: 520, h: 12, fill: "structure" },
  chain:      { kind: "shape", shape: "line", w: 2, stroke: "inkSoft", strokeWidth: 3 },      // from beam end down to the pan, length 70
  pan:        { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 16 },
  numCard:    { kind: "shape", shape: "roundRect", w: 52, h: 52, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },  // numeral 28 px
  blankCard:  { kind: "shape", shape: "roundRect", w: 52, h: 52, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 10 },              // the unknown; value 28 px inkOnAccent
  weight:     { kind: "shape", shape: "rect", w: 18, h: 18, fill: "structure", stroke: "bg", strokeWidth: 1 },
  panTotal:   { kind: "text",  value: "", size: 26, font: "display", color: "inkSoft" },
  eqText:     { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  stepTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  minus:      { kind: "text",  value: "−", size: 56, font: "display", color: "structure" },
  plus:       { kind: "text",  value: "+", size: 56, font: "display", color: "structure" },
  valueCard:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 14 },   // value 48 px inkOnAccent
  hintValue:  { kind: "text",  value: "", size: 28, font: "display", color: "accent" },
  countBadge: { kind: "shape", shape: "circle", r: 10, fill: "bg" },   // numeral 12 px structure, on each weight during self-count
  showRing:   { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniScale:  { kind: "shape", shape: "rect", w: 56, h: 4, fill: "structure" },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  blockIn:   { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "a weight added to the blank's column (from alpha 0, scale 0.5)" },
  blockOut:  { alpha: 0, scale: 0.5, duration: 120, ease: "Sine.In", trigger: "a weight removed" },
  tip:       { duration: 500, ease: "Sine.InOut", trigger: "beam angle to ±min(30, 4×difference) degrees; pans and chains follow (y offset = sin(angle)×260); left heavier = negative angle" },
  level:     { angle: 0, duration: 500, ease: "Back.Out", trigger: "beam returns to level on a balanced Check" },
  nod:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "owl on balanced" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "value card on balanced" },
  hintFlash: { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintValue in the blank card after two unbalanced checks (from alpha 0); 1 Hz" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the value card (from alpha 0.2)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new pan contents (from alpha 0, scale 0.6)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │              ═════════════╪═════════════  beam y=150, pivot (360,150)│
      │        │                  │                  │   chains        │  zone A
      │   ┌────┴────┐        (post)        ┌────┴────┐               │
      │   │ [3] [4] │  pan L (160,220)     │ [_] [5] │ pan R (560,220)│
      │   │ ▮▮▮ ▮▮▮▮│  weights             │     ▮▮▮▮▮│               │
      │   └─────────┘                      └─────────┘  owl (640,110) │
      │              "3 + 4 = ▢ + 5"  (360,300)                       │
260   ├──────────────────────────────────────────────────────────────┤
      │         [ − ]        [ 0 ]        [ + ]   y=400               │  zone B
      │        x=260        x=360        x=460   (96×96)              │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The beam, chains and pans are one container rotated about the pivot by `ANIM.tip`/`ANIM.level` (pans counter-rotate so they stay upright).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.post` at (360, 240); `ART.beam` centred (360, 150) in a container with `ART.chain`s from (100, 150) and (620, 150) down 70 px to the pans; `ART.pan`s centred (160, 220) and (560, 220), each with its cards in a row at y − 30 (52 px cards, 12 px gap, centred) and its weights below (columns of five `ART.weight` per number, 4 px gaps, starting at y + 10, columns 26 px apart, centred under the cards). `ART.panTotal` under each pan at y + 76 (hidden until a Check).
- `ART.eqText` at (360, 300) with the unknown drawn as a mini `ART.blankCard` (28 × 28) inline.
- Stepper: `makeTile` 96 × 96 (`ART.stepTile`) with `ART.minus` / `ART.plus` labels at x = 260 / 460, y = 400; `ART.valueCard` at (360, 400) with the value at 48 px `THEME.font.display` `THEME.colour.inkOnAccent`; `ART.hintValue` centred on the blank card during show-me; `ART.showRing` around the value card.
- `ART.owl` at (640, 110). Check `makeButton` `ok` (360, 510).
- Keyboard: arrows Left/Right change the value by one (P9 rule), Enter checks; Tab also reaches − / + / OK.
- Tap floors 96 ≥ 56; gaps 4 (stepper tiles are 100 apart with 96 width — 4 px; acceptable because a mis-tap onto the display does nothing).

## Content
Language-neutral. Items as (left side = right side; the blank marked _; the answer):
- **L1** (blank on the right, sums ≤ 10): 3 + 4 = _ + 5 (2) · 2 + 6 = _ + 3 (5) · 5 + 3 = 4 + _ (4) · 6 + 2 = _ + 7 (1) · 4 + 4 = 6 + _ (2) · 7 + 1 = _ + 5 (3)
- **L2** (blank on either side; bare-number forms; sums ≤ 12): 7 = _ + 2 (5) · _ + 3 = 4 + 3 (4) · 9 = 6 + _ (3) · 5 + _ = 8 + 2 (5) · 10 = _ + 4 (6) · _ + 6 = 11 (5) · 8 + 3 = _ + 9 (2) · 12 = 7 + _ (5)
- **L3** (two addends both sides, sums ≤ 20; last two with a subtraction): _ + 6 = 9 + 4 (7) · 8 + 7 = _ + 9 (6) · 11 + _ = 6 + 9 (4) · 13 + 5 = 9 + _ (9) · _ + 8 = 12 + 6 (10) · 9 + 9 = _ + 11 (7) · 10 − 3 = _ + 2 (5) · 15 − 6 = 4 + _ (5)

Play list of 10 per Rules; no repeats; the blank starts at 0 every item.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-Check balances → next level (cap L3).
- Adaptation: an unbalanced Check, or unbalanced first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: `ANIM.level`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], equation completes, totals shown equal, owl `ANIM.nod`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Operational "=" (the blank set to the left total, e.g. 7): self-count of both pans, totals 7 vs 12, beam tips 20° to the right; `tone("nudge")`.
  - Add-all (12): totals 7 vs 17, beam tips 30° (capped).
  - Off-by-one (3 for 2): totals 7 vs 8, beam tips 4° — small tilt shows a small difference.
  - Any other value: the same mechanism; the angle is the information.
- Retry behaviour: attempt 1 → attempt 2 after the tilt → attempt 3 with the show-me ring and the flashing correct value; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Balance Pans". The play screen shows only numerals and symbols.

## Sound
`tone("tap", v)` on each step (pitch follows the value 0-20); `tone("correct")` on balance; `tone("nudge")` on a tilt; `tone("tap", k)` per weight during the self-count; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, All done, Play again, Menu, praise change; the equation is symbols).
- [ ] Works at narrow width (400-px iframe: both pans, the stepper and OK visible; the tipped beam never leaves the stage).
- [ ] Keyboard operable (Left/Right arrows change the value; Tab reaches −, +, OK; Enter activates).
- [ ] Never auto-starts.
- [ ] No losing state (any number of unbalanced Checks still ends in a balanced item via the flashing hint).
- [ ] The beam does not move while stepping; it moves only after OK.
- [ ] Setting 7 in "3 + 4 = _ + 5" and checking tips the beam to the right and shows 7 and 12 under the pans.
- [ ] Setting 2 and checking levels the beam and completes the equation as "3 + 4 = 2 + 5".
- [ ] Each number on a pan has the same number of weight blocks under it, stacked in fives.
- [ ] Forms like "7 = _ + 2" appear at the second level and "10 − 3 = _ + 2" at the third.
- [ ] The value clamps at 0 and 20 and never shows a negative number.
- [ ] After two unbalanced Checks the correct value blinks gently in the blank card once per second.
- [ ] The finish screen shows ten level mini-scales and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, + raises the pitch and − lowers it.
