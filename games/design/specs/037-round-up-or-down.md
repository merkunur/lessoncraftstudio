# 037 — Round Up or Down

## Identity
- Slug: `round-up-or-down`
- Subject / topic: Mathematics / rounding two-digit numbers to the nearest ten (47 → 50, 43 → 40, 45 → 50, 96 → 100)
- Age band: `8-9`
- Interaction pattern: `P8` — sort into bins (tap the number card, then tap a bin)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Sibling games: 005 (the sort-into-bins shape), 034 (distance to the next ten).

## Learning
- Objective: Sorts each two-digit number into the "rounds down" bin or the "rounds up" bin, where each bin is labelled with the ten it rounds to, and so names the nearest ten.
- Prerequisites: Reads two-digit numerals; knows the tens 10 … 100 in order; can say how far a number is from a ten (game 034).
- Curriculum links: F-21 (place value; number sense within 100), F-31 rows "Place value tens/ones" and "+/− within 100, mental" — conservative 7-9 → 8-9 (US 3.NBT.A.1 "round whole numbers to the nearest 10"; England Y4 (Y3 practice) "round any number to the nearest 10"; Germany Klasse 3 "Runden auf Zehner"; France CE2 "arrondir à la dizaine"; Netherlands groep 5 "afronden op tientallen"; Spain 2º ciclo; Brazil EF03MA02 "aproximações"; Sweden åk 1-3 "överslagsräkning"; Finland grade 3 "pyöristäminen").
- Common misconceptions (F-108, F-21), each with this game's response:
  1. **Rounding by the tens digit ("47 — 4 is small, so it rounds down to 40").** Response: the card glides back to the belt, and the mini number line (`ART.miniLine`, ten ticks from 40 to 50) appears under it with the number marked (`ART.marker` on 47) and two arcs (`ART.distArc`) to the two tens labelled with their lengths (`ART.distLabel` "7" and "3"); the shorter arc's label pops; then the up-hill bin's icon pulses. Distance, not digit.
  2. **A five rounds down ("45 is in the middle, so 40").** Response: the arcs show 5 and 5 — equal; the up-hill bin carries the tie rule as a small `ART.fiveRule` badge ("5" with a tiny up-slope) which pulses; the number goes up. L1 has no fives; L2 introduces them once the distance idea is in place.
  3. **"Rounding down makes it smaller, rounding up makes it bigger" — so a number near its lower ten is sent up "to make it bigger", or the ten itself is misnamed (47 → "40, up").** Response: the bin labels ARE the tens (`ART.binTen` "40" on the down-hill bin, "50" on the up-hill bin), set per item, so the choice of bin is the naming of the ten; on landing the card's numeral morphs into that ten (`ANIM.morph` — "47" becomes "50" with a pop), so the child sees the number become its rounded value.
  4. **Not crossing the hundred (96 → 90, or "there is no ten above 96").** Response: L3 includes 91-99 with the up-hill bin labelled "100"; the mini line runs 90 … 100 on error, and the arcs show 6 and 4.
  5. **Speed over sense (F-45 — rounding is a fluency topic where drills push guessing).** Response: no clock; every card waits; the belt moves only when the child moves it; wrong bins refuse gently and show the line.

Multiples of ten (40, 50 …) are excluded from the stream — they are not rounded and would need a third "stays" bin, which would blur the two-way decision.

## How it plays
1. **Start screen**: title "Round Up or Down", the sheep (`ART.sheep`) at (360, 200), Start, picker.
2. **Card 1 (L1: 47)**: rail of 14 dots (§6) plus `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: the belt (`ART.belt`) across zone A at y = 160 with the sheep at its left end (80, 160); the first card (`ART.numCard`, 120 × 96, numeral 48 px) slides in from the right (`ANIM.slideIn`) to (360, 160) as a `makeTile`. Under the card at y = 236 the mini number line (`ART.miniLine`, 10 intervals, 30 px pitch, from x = 210 to 510) with `ART.tickLabel`s "40" and "50" at its ends and `ART.marker` on 47 — visible at L1 while the child decides; from L2 it appears only on an error. Zone B: two bins (`ART.bin`, 160 × 120) at y = 390, x = 220 and 500: the down-hill bin shows `ART.hillDown` (a slope falling to the right) above `ART.binTen` "40"; the up-hill bin shows `ART.hillUp` (a slope rising to the right) above `ART.binTen` "50"; from L2 the up-hill bin also carries `ART.fiveRule` at its top-right. Each bin has a count sub-label (`ART.binCount`, "0"). Bin sides are fixed (down-hill always left — lower ten on the left, like a number line). Caption: none.
3. **Sorting**: tap the card (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The card glides (`ANIM.glide`) into the bin.
   - **Correct bin**: the card's numeral morphs into the ten (`ANIM.morph`), the bin `ANIM.pop`s and its count goes up, `tone("correct")`; every third correct card (and the last) plays a praise pop; the rail dot fills; the next card slides in after 400 ms.
   - **Wrong bin**: the card glides back to the belt, `tone("nudge")`; the mini line appears (`ANIM.appear`) if hidden, `ART.marker` on the number, `ART.distArc`s to both tens with `ART.distLabel`s, the shorter arc's label `ANIM.pop`s (for a five, `ART.fiveRule` pulses instead); then the correct bin's icon `ANIM.pulse`s. Attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the card there completes the item as solved-with-help.
   - Tapping a bin with no card selected: its icon `ANIM.pop`s (a harmless preview); nothing else.
4. **Cards 2-14**: per Content/Rules. L1 ones digits 1-4 and 6-9, tens 1-8, mini line always visible; L2 adds fives, line only on error; L3 adds 91-99 (up-hill bin "100") and the near-ten cases 41/49 style.
5. **Finish**: `t("all_done")` (360, 110); the sheep (360, 200) `ANIM.celebrate`; the summary = the two bins at y = 400 (x = 220 / 500, 160 × 120) with their final counts, and above them the fourteen rounded results as chips (`ART.resultChip`, 72 × 30, "47→50" 14 px) in two rows of seven at y = 300 and 336; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  sheep:      { kind: "emoji", value: "🐑", size: 72 },
  belt:       { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  numCard:    { kind: "shape", shape: "roundRect", w: 120, h: 96, fill: "surface", stroke: "structure", strokeWidth: 3, radius: 14 },   // numeral 48 px display ink
  miniLine:   { kind: "shape", shape: "rect", w: 300, h: 4, fill: "line" },       // with 11 tick marks 30 px apart drawn from tick
  tick:       { kind: "shape", shape: "rect", w: 3, h: 14, fill: "inkSoft" },
  tickLabel:  { kind: "text",  value: "", size: 16, font: "body", color: "inkSoft" },
  marker:     { kind: "shape", shape: "circle", r: 9, fill: "accent", stroke: "structure", strokeWidth: 2 },
  distArc:    { kind: "shape", shape: "arc", r: 60, stroke: "structure", strokeWidth: 3 },   // half-arc above the line from the marker to a ten; r set at runtime to half the distance
  distLabel:  { kind: "text",  value: "", size: 20, font: "display", color: "structure" },
  bin:        { kind: "shape", shape: "roundRect", w: 160, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  hillDown:   { kind: "shape", shape: "polygon", points: [[-36,-14],[36,14],[-36,14]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  hillUp:     { kind: "shape", shape: "polygon", points: [[-36,14],[36,-14],[36,14]], fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  binTen:     { kind: "text",  value: "", size: 30, font: "display", color: "ink" },
  binCount:   { kind: "text",  value: "0", size: 18, font: "display", color: "inkSoft" },
  fiveRule:   { kind: "shape", shape: "circle", r: 16, fill: "accent", stroke: "structure", strokeWidth: 2 },   // "5" 16 px inkOnAccent with a 10-px up-slope line beneath the numeral
  showRing:   { kind: "shape", shape: "roundRect", w: 172, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  resultChip: { kind: "shape", shape: "roundRect", w: 72, h: 30, fill: "structureSoft", stroke: "structure", strokeWidth: 1, radius: 8 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new card from x = 760 to the belt centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "card selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "card to a bin / back to the belt (x,y at call)" },
  morph:     { scale: 1.2, duration: 160, ease: "Back.Out", yoyo: true, trigger: "card numeral changes to the ten as it lands in the correct bin" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a card; shorter-arc label; bin icon preview tap" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "mini line, marker and arcs on an error (from alpha 0, scale 0.6)" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "correct bin icon after the cue; fiveRule badge on a five" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish sheep" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]   ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ rail y=28; "3 of 14" y=48 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ sheep(80,160) ═══════════ belt y=160 ══════ [ 47 ] card (360,160)│  zone A
      │              40 ┼─┼─┼─┼─┼─┼─●─┼─┼─┼ 50   mini line y=236       │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌────────┐                      ┌────────┐               │
      │      │  ╲     │  down-hill (220,390) │     ╱ 5│ up-hill (500,390)│  zone B
      │      │   40   │                      │   50   │  (160×120)     │
      │      │   0    │                      │   0    │                │
      │      └────────┘                      └────────┘               │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. Bins never swap sides: lower ten left, higher ten right.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 14 × `ART.dotEmpty` (x = 217 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.sheep` (80, 160); `ART.belt` centred (390, 160). The card: `makeTile` 120 × 96 with `ART.numCard` tokens at (360, 160), numeral 48 px `THEME.font.display` `THEME.colour.ink`; selected look = lift + the tile's 3-px `THEME.colour.structure` outline.
- `ART.miniLine` centred (360, 236) with `ART.tick`s at 30-px pitch and `ART.tickLabel`s at its ends (y = 256); `ART.marker` on the number's tick; `ART.distArc`s above the line to each end with `ART.distLabel` over each arc's apex.
- Bins: `makeTile` 160 × 120 (`ART.bin`) at (220, 390) and (500, 390): icon (`ART.hillDown` / `ART.hillUp`) at bin (0, −34), `ART.binTen` at (0, +6), `ART.binCount` at (0, +40); `ART.fiveRule` at bin (+62, −42) on the up-hill bin from L2. `ART.showRing` around the correct bin.
- Tab order: the card, then the two bins. Tap floors: card 120 × 96, bins 160 × 120 (≥ 56); bin gap 120.

## Content
Language-neutral (numerals only). Cards as (number → rounded; the bins that item shows):
- **L1** (ones 1-4 or 6-9; tens 1-8; mini line visible while deciding): 47 → 50 (40/50) · 23 → 20 (20/30) · 81 → 80 (80/90) · 38 → 40 (30/40) · 62 → 60 (60/70) · 74 → 70 (70/80) · 19 → 20 (10/20) · 56 → 60 (50/60) · 33 → 30 (30/40) · 68 → 70 (60/70) · 42 → 40 (40/50) · 87 → 90 (80/90) · 14 → 10 (10/20) · 76 → 80 (70/80)
- **L2** (fives added; line only on error; fiveRule badge shown): 45 → 50 (40/50) · 27 → 30 (20/30) · 65 → 70 (60/70) · 52 → 50 (50/60) · 35 → 40 (30/40) · 78 → 80 (70/80) · 15 → 20 (10/20) · 84 → 80 (80/90) · 75 → 80 (70/80) · 41 → 40 (40/50) · 25 → 30 (20/30) · 59 → 60 (50/60) · 63 → 60 (60/70) · 86 → 90 (80/90)
- **L3** (91-99 with the up-hill bin "100"; fives; near-ten cases): 95 → 100 (90/100) · 96 → 100 (90/100) · 49 → 50 (40/50) · 91 → 90 (90/100) · 85 → 90 (80/90) · 99 → 100 (90/100) · 31 → 30 (30/40) · 55 → 60 (50/60) · 64 → 60 (60/70) · 92 → 90 (90/100) · 15 → 20 (10/20) · 88 → 90 (80/90) · 51 → 50 (50/60) · 97 → 100 (90/100)

Play list of 14 per Rules; shuffled within level; no repeats; no more than three up-hill (or three down-hill) answers in a row.

## Rules
- Item count: 14.
- Difficulty progression: 3 consecutive first-try cards → next level (cap L3). (Three, not two: cards are quick, ~12 s each.)
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive cards → next card one level down (floor L1).
- What happens on a correct answer: card glides in, numeral morphs into the ten, bin `ANIM.pop`, count +1, `tone("correct")`; praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every third correct card and on the fourteenth; rail dot; next card after 400 ms.
- What happens on a wrong answer:
  - Rounded by the tens digit / wrong direction (47 → down): card returns; mini line with the marker and both distance arcs labelled 7 and 3, the 3 pops; the up-hill icon pulses; `tone("nudge")`.
  - A five sent down (45 → down): card returns; arcs 5 and 5; the fiveRule badge pulses; the up-hill icon pulses.
  - 9x sent down when it should reach 100 (96 → 90): card returns; the line 90 … 100 with arcs 6 and 4; the up-hill icon (labelled 100) pulses.
  - A number near its lower ten sent up (41 → 50): card returns; arcs 1 and 9; the down-hill icon pulses.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with the show-me ring on the correct bin; solved-with-help. No attempt 4.
- Finish condition: 14 cards. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Round Up or Down". The play screen shows only numerals; the bins are icons plus tens.

## Sound
`tone("tap")` on selecting the card; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", k)` twice during the cue (once per arc, pitch = the arc's length); `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages ("Question 3 of 14", All done, Play again, Menu, praise change; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: belt, card, mini line and both bins visible and separate).
- [ ] Keyboard operable (Tab: the card, then the two bins; Enter selects the card / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] Each card's bins show the two neighbouring tens (47 shows 40 and 50; 96 shows 90 and 100); the lower ten is always on the left.
- [ ] Putting 47 in the down-hill bin returns it and shows a marker on 47 with arcs labelled 7 and 3; the 3 pops and the up-hill icon pulses.
- [ ] Putting 47 in the up-hill bin morphs the card's numeral into 50 as it lands and the bin count rises.
- [ ] No fives appear at the first level; from the second level the up-hill bin carries a "5" badge, and 45 in the down-hill bin makes it pulse.
- [ ] At the first level the mini number line is visible before choosing; at the second and third it appears only after a wrong bin.
- [ ] No multiple of ten ever appears as a card.
- [ ] Three first-try cards in a row bring fives and nineties; a wrong bin brings simpler cards next.
- [ ] The finish screen shows the two bins with their counts and fourteen "47→50" chips, no score.
- [ ] With `?sound=off` nothing is audible.
