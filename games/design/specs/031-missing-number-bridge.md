# 031 — Missing-Number Bridge

## Identity
- Slug: `missing-number-bridge`
- Subject / topic: Mathematics / missing addend a + _ = c within 20 (the unknown as "how many more")
- Age band: `6-8`
- Interaction pattern: `P9` — set a value (+/− stepper) with a Check
- Estimated build size: ~480 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P9 (stepper form). Sibling games: 004 (bridge closes only at exactly 10), 009 (stepper + Check discipline).

## Learning
- Objective: Sets the missing addend in a + _ = c (c ≤ 20) with a stepper so that the planks laid from a reach the far bank at c exactly — neither a hole nor an overhang.
- Prerequisites: Counts on from a number within 20; reads numerals to 20; has met "make 10" (game 004).
- Curriculum links: F-1 (addition within 20 in 14 of 15 sources), F-21, F-31 row "+/− facts to 20" — conservative 7-8, earliest 6 → 6-8 (US 1.OA.D.8 "determine the unknown whole number in an addition equation"; England Y1-2 "missing number problems"; Germany Klasse 1-2 "Ergänzen"; France CP-CE1 "compléments"; Netherlands groep 3-4 "aanvullen tot"; Spain 1º ciclo; Brazil EF01MA08; Sweden åk 1-3; Finland grade 1-2).
- Common misconceptions (F-104, F-107, F-105), each with this game's response:
  1. **Adding the two known numbers whatever the diagram (7 + _ = 12 → sets 19).** Response: on Check the 19 new planks are laid one by one past the far bank; after three overhang planks the rest pile up on the bank (`ART.plankOver` stacked, `ANIM.pile`) so the size of the excess is visible; the equation reads "7 + 19 = 26" in `THEME.colour.inkSoft` under the bridge. Nothing is said; the pile is the feedback.
  2. **Operational "=" — the unknown is "the answer", so the child sets c (12).** Response: the same overhang, twelve planks past the bank; the total "7 + 12 = 19" shows. The child steps down and checks again.
  3. **Off-by-one from counting on badly (starting AT a: "7, 8, 9, 10, 11" → sets 4 for 5, or counting the far bank as a plank → 6).** Response: one plank short leaves exactly one hollow plank outline (`ART.holePlank`) between the last plank and the bank; one too many puts one plank on the bank. On the second wrong Check the laid planks count themselves (badges 1..a, `tone("tap", k)`) and the first NEW plank's badge (a + 1) pulses — "the next plank is a + 1, not a".
  4. **Count-all: counting the laid planks again from 1 as part of the answer.** Response: every laid plank already carries its numeral 1..a (`ART.plankLaid`), and the new planks continue a + 1 … a + b as they land, so the child sees that the a planks are already counted; the tray shows only the NEW planks (`ART.trayPlank`) as the value is stepped.

## How it plays
1. **Start screen**: title "Missing-Number Bridge", the goat (`ART.goat`) at (360, 200), Start, picker.
2. **Item 1 (L1: 7 + _ = 10)**: rail of 10 dots (§6). Zone A: the near bank (`ART.bank`) at (60, 200) with the goat on it at (60, 120); the river (`ART.water`) from x = 100 to x = 660 at y = 200; the far bank (`ART.bank`) centred at (xFar + 40, 200) where **xFar = 100 + 26 × c** (here 360); a signpost (`ART.signpost`) at (xFar + 40, 110) showing `ART.targetNum` "10". On the water, the laid planks: 7 × `ART.plankLaid` (24 × 40, pitch 26) with plank i centred at x = 87 + 26 i, y = 180, each carrying its numeral 1..7 (12 px `THEME.font.display` `THEME.colour.bg`). The gap between plank 7 and the bank is open water. Under the bridge the equation (`ART.eqText`, 36 px) "7 + ▢ = 10" at (360, 290), the box drawn as a mini `ART.valueCard` (28 × 28). Zone B: the stepper — `ART.stepTile` with `ART.minus` at (260, 400), `ART.valueCard` (96 × 96, the current value 48 px, starts at 0) at (360, 400), `ART.stepTile` with `ART.plus` at (460, 400); the plank tray at (560, 400): the value's worth of `ART.trayPlank` bars stacked in two columns of ten (x = 548 / 574, from y = 440 upward, 10 px per bar). Zone C: Check (`makeButton ok`) at (360, 510), enabled from the start (a 0 Check is a legitimate, informative try).
3. **Setting**: tap + or −: the value changes (range 0-20, clamped), `tone("tap", v)` (pitch tracks the value), a tray bar appears (`ANIM.barIn`) or leaves (`ANIM.barOut`), and the box in `ART.eqText` shows the value. **The bridge does not change while stepping** — planks lay only on Check (predict-then-check, F-40/F-46; otherwise the child could search by watching the water close).
4. **Check**: tap OK. The tray bars glide one by one (`ANIM.lay`, 120 ms apart) onto the water as `ART.plankNew` at positions a + 1 … a + b, each landing with `tone("tap", a + j)` and showing its numeral.
   - **Exact (a + b = c)**: the last plank lands flush with the bank; `ANIM.settleBridge` (the whole plank row bounces once), `tone("correct")`, praise pop; `ART.eqText` completes "7 + 3 = 10"; the goat walks across (`ANIM.walk`, x → xFar + 40); rail dot fills; next item after 900 ms (`ANIM.appear` on the new river).
   - **Too few**: after the last plank, c − a − b hollow outlines (`ART.holePlank`) draw in the remaining water (`ANIM.holeIn`, 100 ms apart); the total "7 + 2 = 9" shows in `THEME.colour.inkSoft`; `tone("nudge")`; the goat walks to the last plank and peers (`ANIM.peer`). The planks stay laid while the child steps; the next Check clears and re-lays. Attempt 2.
   - **Too many**: planks beyond c land on the bank as `ART.plankOver` (up to three side by side, further ones pile on the third with `ANIM.pile`, offset −12 px each); the total shows; `tone("nudge")`; the goat peers at the pile. Attempt 2.
   - **Second wrong Check**: the same enactment, then the hint: the laid planks count themselves (badges `ART.countBadge` 1..a, 150 ms apart, `tone("tap", k)`), the first new plank's badge pulses (`ANIM.pulse`); then the value card gains the show-me ring (`ART.showRing`, `ANIM.showMe`) and the correct value blinks in the box of `ART.eqText` (`ART.hintValue`, `ANIM.hintFlash`, 1 Hz) until the child sets it and checks; solved-with-help (no praise pop; the goat still crosses).
5. **Items 2-10**: per Content/Rules. L1 c ≤ 10 and b ≤ 4; L2 c 11-20 without crossing ten (a ≥ 10); L3 crossing ten (a < 10 < c) with b up to 9.
6. **Finish**: `t("all_done")` (360, 110); the goat (360, 200) `ANIM.celebrate`; the summary = ten mini bridges (`ART.miniBridge`, 56 × 12) in a row at y = 400 (x = 360 − 4.5 × 64 + i × 64), each labelled beneath with its equation "7+3=10" in 14 px `THEME.colour.inkSoft`; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 6-7 minutes.

## Art registry
```js
const ART = {
  goat:       { kind: "emoji", value: "🐐", size: 72 },
  bank:       { kind: "shape", shape: "roundRect", w: 80, h: 120, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 14 },
  water:      { kind: "shape", shape: "rect", w: 560, h: 60, fill: "surface2" },
  signpost:   { kind: "shape", shape: "roundRect", w: 96, h: 72, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 12 },
  targetNum:  { kind: "text",  value: "", size: 44, font: "display", color: "structure" },
  plankLaid:  { kind: "shape", shape: "roundRect", w: 24, h: 40, fill: "structure", stroke: "bg", strokeWidth: 1, radius: 4 },      // numeral 12 px display, color bg
  plankNew:   { kind: "shape", shape: "roundRect", w: 24, h: 40, fill: "accent", stroke: "bg", strokeWidth: 1, radius: 4 },         // numeral 12 px display, color inkOnAccent
  plankOver:  { kind: "shape", shape: "roundRect", w: 24, h: 40, fill: "accent", stroke: "structure", strokeWidth: 2, radius: 4 },  // drawn on the far bank; 70% alpha
  holePlank:  { kind: "shape", shape: "roundRect", w: 24, h: 40, stroke: "accent", strokeWidth: 2, radius: 4 },                    // dashed (lineDash [4,4]), no fill
  trayPlank:  { kind: "shape", shape: "rect", w: 24, h: 8, fill: "accent", stroke: "bg", strokeWidth: 1 },
  eqText:     { kind: "text",  value: "", size: 36, font: "display", color: "structure" },
  stepTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  minus:      { kind: "text",  value: "−", size: 56, font: "display", color: "structure" },
  plus:       { kind: "text",  value: "+", size: 56, font: "display", color: "structure" },
  valueCard:  { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "bg", stroke: "accent", strokeWidth: 3, radius: 14 },       // value 48 px display inkOnAccent
  hintValue:  { kind: "text",  value: "", size: 28, font: "display", color: "accent" },
  countBadge: { kind: "shape", shape: "circle", r: 9, fill: "bg" },          // numeral 11 px structure, on a plank during the self-count
  showRing:   { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 18 },
  miniBridge: { kind: "shape", shape: "rect", w: 56, h: 12, fill: "structure" },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  barIn:        { alpha: 1, scale: 1, duration: 120, ease: "Back.Out", trigger: "a tray bar added on + (from alpha 0, scale 0.5)" },
  barOut:       { alpha: 0, scale: 0.5, duration: 120, ease: "Sine.In", trigger: "a tray bar removed on −" },
  lay:          { duration: 260, ease: "Sine.InOut", trigger: "a tray bar glides to its plank position on the water (x,y set at call), becomes plankNew on arrival" },
  holeIn:       { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "each holePlank outline (from alpha 0), 100 ms apart" },
  pile:         { y: "-=12", duration: 160, ease: "Back.Out", trigger: "fourth and later overhang planks stack upward on the third" },
  settleBridge: { y: "+=6", duration: 120, ease: "Sine.InOut", yoyo: true, trigger: "whole plank row on an exact fit" },
  walk:         { duration: 900, ease: "Sine.InOut", trigger: "goat x to the far bank (exact) or to the last plank (too few) / the pile (too many); x set at call" },
  peer:         { angle: 12, duration: 200, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "goat at a hole or a pile" },
  pulse:        { scale: 1.3, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "badge of plank a + 1 during the self-count" },
  hintFlash:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintValue in the equation box after two wrong Checks (from alpha 0); 1 Hz" },
  showMe:       { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the value card (from alpha 0.2)" },
  appear:       { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new river, banks and planks (from alpha 0, scale 0.6)" },
  celebrate:    { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish goat" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ goat(60,120)                        signpost "10" (xFar+40,110)│
      │ ┌bank┐ ▮▮▮▮▮▮▮ . . .                ┌bank┐                   │  zone A
      │ │ 60 │ planks y=180  (hole)         │xFar+40│                 │
      │ └────┘ ~~~~~~~~ water y=200 ~~~~~~~~└────┘                    │
260   ├──────────────────────────────────────────────────────────────┤
      │                  "7 + ▢ = 10"  (360,290)                      │
      │         [ − ]      [ 0 ]      [ + ]     ▯▯ tray (560,400)      │  zone B
      │        x=260      x=360      x=460      two columns of 10     │
480   ├──────────────────────────────────────────────────────────────┤
      │                    [   OK   ] (360,510)                       │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Plank i (1-based) centred at x = 87 + 26 i, y = 180. xFar = 100 + 26 c (c = 5 → 230; c = 20 → 620; the far bank's 80-px body then spans 620-700, inside the stage). Overhang planks continue the pitch onto the bank; the pile grows upward. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`.
- `ART.goat` at (60, 120) during play; `ART.bank` at (60, 200) and (xFar + 40, 200); `ART.water` centred (380, 200); `ART.signpost` at (xFar + 40, 110) with `ART.targetNum` centred on it.
- Planks: `ART.plankLaid` × a at the pitch above with numerals; on Check `ART.plankNew` × b land after them; `ART.holePlank` outlines fill the open water to xFar when short; `ART.plankOver` beyond xFar when long.
- `ART.eqText` at (360, 290) with the unknown as a 28 × 28 mini `ART.valueCard` inline; `ART.hintValue` centred on that box during show-me.
- Stepper: `makeTile` 96 × 96 (`ART.stepTile`) with `ART.minus` / `ART.plus` at x = 260 / 460, y = 400; `ART.valueCard` at (360, 400) with the value 48 px `THEME.font.display` `THEME.colour.inkOnAccent`; `ART.showRing` around it during show-me. Tray of `ART.trayPlank` at (560, 400).
- `ART.countBadge` on each plank during a self-count. Check `makeButton` `ok` (360, 510).
- Keyboard: Left/Right arrows change the value by one (P9), Enter checks; Tab also reaches −, +, OK.
- Tap floors 96 ≥ 56; the stepper tiles sit 100 px apart (4 px gap), acceptable because a mis-tap onto the value card does nothing.

## Content
Language-neutral (numerals and symbols only; no number words are ever shown, so the de/nl/da inverted-word order of F-108 cannot interfere). Items as (a + _ = c; answer):
- **L1** (c ≤ 10, b ≤ 4): 7 + _ = 10 (3) · 5 + _ = 8 (3) · 6 + _ = 10 (4) · 8 + _ = 10 (2) · 4 + _ = 7 (3) · 3 + _ = 5 (2) · 9 + _ = 10 (1) · 6 + _ = 8 (2)
- **L2** (c 11-20, a ≥ 10 so no ten is crossed): 12 + _ = 15 (3) · 14 + _ = 20 (6) · 11 + _ = 15 (4) · 15 + _ = 19 (4) · 13 + _ = 20 (7) · 16 + _ = 18 (2) · 10 + _ = 17 (7) · 12 + _ = 19 (7)
- **L3** (a < 10 < c, crossing ten): 7 + _ = 13 (6) · 8 + _ = 15 (7) · 9 + _ = 16 (7) · 6 + _ = 14 (8) · 8 + _ = 17 (9) · 5 + _ = 13 (8) · 9 + _ = 18 (9) · 7 + _ = 16 (9)

Play list of 10 per Rules; shuffled within level; no repeats; the value starts at 0 on every item.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-Check exact fits → next level (cap L3).
- Adaptation: an inexact Check, or inexact first-Check on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: planks lay to the bank, `ANIM.settleBridge`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], equation completes, goat `ANIM.walk`, rail dot, next item after 900 ms.
- What happens on a wrong answer:
  - Too few (stopped short / off-by-one under): hollow plank outlines fill the remaining water, total shown in `THEME.colour.inkSoft`, goat peers at the hole; `tone("nudge")`.
  - Too many by one (counted the bank as a plank): one plank on the bank, total shown, goat peers.
  - Set to c (operational "=") or to a + c (added the knowns): three planks on the bank and a pile for the rest; total shown.
  - Set to 0 and checked: the full hole c − a in outlines — informative, counts as attempt 1.
- Retry behaviour: attempt 1 → attempt 2 after the enacted hole/pile → attempt 3 with the self-count (badge a + 1 pulses), the show-me ring and the blinking correct value; solved-with-help. No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("ok")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Missing-Number Bridge". The play screen shows only numerals and symbols.

## Sound
`tone("tap", v)` on each step (pitch follows the value 0-20); `tone("tap", a + j)` as plank a + j lands; `tone("tap", k)` per plank during the self-count; `tone("correct")` on an exact fit; `tone("nudge")` on a hole or a pile; `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (OK, All done, Play again, Menu, praise change; the equation is symbols).
- [ ] Works at narrow width (400-px iframe: both banks, the planks, the stepper, the tray and OK visible; a pile of overhang planks never leaves the stage).
- [ ] Keyboard operable (Left/Right arrows change the value; Tab reaches −, +, OK; Enter checks).
- [ ] Never auto-starts.
- [ ] No losing state (any number of inexact Checks still ends in an exact fit via the blinking hint).
- [ ] The laid planks are numbered 1..a and nothing on the water changes while stepping; planks lay only after OK.
- [ ] For 7 + _ = 10, checking 2 leaves one dashed hollow plank before the bank and shows "7 + 2 = 9"; checking 3 lands flush and the goat crosses.
- [ ] Checking 10 for 7 + _ = 10 puts three planks on the bank and a pile of the rest.
- [ ] After two inexact Checks the planks count themselves, the a + 1 badge pulses, and the correct value blinks in the equation box once per second.
- [ ] Items at the second level start from 10 or more and never cross a ten; third-level items start below 10 and end above it.
- [ ] The value clamps at 0 and 20; the tray never shows more than 20 bars.
- [ ] The finish screen shows ten mini bridges with their equations and no score.
- [ ] With `?sound=off` nothing is audible; with sound on, + raises the pitch and each landing plank is a higher note.
