# 167 — Healthy Plate

## Identity
- Slug: `healthy-plate`
- Subject / topic: Science / food groups and a balanced plate — one thing from each of four groups (fruit and vegetables, grains, protein foods, dairy) fills the plate; sweets are a small extra, not a group
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (select a food from the tray, then tap a plate section)
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P2. Science scope per F-218 / A-11: sorting foods by the group they belong to, shown by icons on the plate; no calories, no "good/bad food" verdicts, no nutrients. Culture rules: generic foods only (no brands, no national dishes — an apple, bread, rice, a fish, cheese), and every food is a plain emoji that names one thing.

## Learning
- Objective: Fills a plate with exactly one food from each of four food groups (fruit and vegetables, grains, protein foods, dairy) by matching each tray food to the plate section carrying its group icon, putting at most one sweet on the small treat dish and leaving any second sweet in the tray.
- Prerequisites: None beyond tapping. Each plate section carries one icon (a carrot, a wheat ear, an egg, a glass of milk), so nothing is read; a food placed in the wrong section simply glides back. Nothing is spoken.
- Curriculum links: F-23 (human body, health and everyday world knowledge in all 12 systems at 5-8: "healthy eating" appears in England Y2 science, Germany HSU Klasse 1-2 "gesunde Ernährung", France CP "alimentation", Spain Conocimiento del Medio 1º "alimentación saludable", Brazil EF01CI (hábitos de higiene e alimentação), Netherlands groep 3-4 "gezond eten", Sweden åk 1-3 "hälsa och mat", Finland ympäristöoppi 1-2 "terveelliset ruokatottumukset"; US Health/K-LS1-1 needs of animals including people), F-30, F-218, F-5 (no game supply for this topic).
- Common misconceptions (each with this game's response; the error classes are the enacted-feedback cases of F-43 / F-61 applied to this topic):
  1. **Sorting by colour or shape instead of by group (a tomato goes to the dairy section because it is round like the cheese; an orange to the grain section because it is the colour of bread).** Response: a wrong section glides the food back and the food's own group icon (`ART.groupBadge` holding the section icon it belongs with) appears on the tray tile for 1.2 s (`ANIM.badgeShow`) — "this one goes with the carrot"; on the second wrong placement of the round the correct section `ANIM.pulse`s.
  2. **"Cheese and butter are not milk" (dairy is only the glass of milk).** Response: the dairy icon is the glass of milk; cheese and butter are the only dairy TRAY foods, so every round makes the child link them to the milk icon; the badge cue shows the milk glass on the cheese.
  3. **"A sweet is a food group" — the sweet is placed on the plate.** Response: every plate section REFUSES a sweet (it springs back with `ANIM.nudge`, no message — F-61); the first time it happens the small treat dish `ANIM.pulse`s once — the place a sweet may go. A second sweet into the dish is refused the same way (one is the limit). Sweets are never called bad; they are simply not part of the plate.
  4. **Putting two foods of the same group on the plate (two fruits, no protein).** Response: a filled section refuses a second food (springs back), so "one from each" is enforced by the plate itself; at L3 the tray carries two foods of one group on purpose so the child must choose one and find the group that is still empty.

## How it plays
1. **Start screen**: title "Healthy Plate", the rabbit (`ART.rabbit`) at (360, 200), Start, picker.
2. **Round 1 (L1)**: rail of 8 dots (§6) at y = 28 — one per round. Zone A: the plate (`ART.plate`, r 112) centred at (300, 165), divided into four quarters by two `ART.divider` lines; each quarter shows its group icon at 34 px near the rim — `ART.iconVeg` (carrot) top-left at (232, 108), `ART.iconGrain` (wheat) top-right at (368, 108), `ART.iconProtein` (egg) bottom-left at (232, 222), `ART.iconDairy` (milk glass) bottom-right at (368, 222); each quarter is a slot (`makeTile` 100 × 100 with transparent fill) centred at (255, 120), (345, 120), (255, 210), (345, 210). The treat dish (`ART.treatDish`, r 44, dashed) at (540, 200) with a tiny `ART.dishMark` inside. The rabbit at (110, 200). Zone B: a tray of five tiles (`ART.trayTile`, 96 × 96) at y = 380, x = 120 / 240 / 360 / 480 / 600, holding `ART.apple`, `ART.bread`, `ART.chicken`, `ART.cheese`, `ART.candy` in shuffled order. No caption.
3. **Placing**: tap a tray food (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then tap a plate section or the treat dish; the food glides (`ANIM.glide`) there. Tapping a second tray food first switches the selection. Tapping a placed food returns it to the tray (undo, `tone("tap")`).
   - **A food into its own group's section**: `tone("correct")`; the food settles at the section centre at size 56 (`ANIM.settle`), the section icon dims to alpha 0.4 (still visible); the rabbit `ANIM.nod`s.
   - **A food into the wrong section**: it glides back to the tray, `tone("nudge")`, `ART.groupBadge` with the food's group icon `ANIM.badgeShow`s on the tile (Rules). One wrong action.
   - **A sweet onto any plate section**: refused — springs back (`ANIM.nudge`, no tone beyond `tone("tap")`); the first time in a round the treat dish `ANIM.pulse`s. One wrong action.
   - **A sweet onto the treat dish**: lands (`tone("tap", 4)`); allowed once per round. A second sweet onto the dish: refused (springs back, no cue). Not counted as a wrong action.
   - **A food into a filled section, or a food onto the treat dish**: refused (springs back), not counted.
4. **Round complete**: when all four sections hold a food — the plate `ANIM.pop`s, a `ART.plateRing` glows around it (`ANIM.glow`), `tone("correct")`, praise pop for a round with no wrong action, the rail dot fills; the next round's tray `ANIM.appear`s after 900 ms and the plate empties (`ANIM.rise` on the foods).
   - **Third wrong action in a round**: every unplaced non-sweet food in the tray gains the show-me ring (`ART.showRing`, `ANIM.showMe`) and its target section pulses in turn; placing them completes the round as solved-with-help.
5. **Rounds 2-8**: per Content/Rules. L1 five tiles (four foods + one sweet); L2 six tiles (four foods + two sweets — only one fits the dish); L3 six tiles (five foods, two of them from the same group, + one sweet).
6. **A full worked session**: round 1 (L1) apple → carrot section ✓ · candy → egg section ✗ (springs back; the treat dish pulses) · candy → dish (lands) · bread ✓ chicken ✓ cheese → carrot section ✗ (glides back; a milk-glass badge shows on the cheese) · cheese → milk section ✓ → plate complete (two wrong actions → same level) · round 2 (L1) ✓✓✓✓ · round 3 (L1) ✓✓✓✓ → step up · round 4 (L2: grapes, pretzel, fish, butter, cake, candy) cake → dish, candy → dish ✗ refused; four foods ✓ · round 5 (L2) ✓ · round 6 (L2) ✓ → step up · round 7 (L3: apple, broccoli, pasta, fish, cheese, chocolate) apple ✓, broccoli → carrot section refused (full), pasta ✓ fish ✓ cheese ✓ → complete · round 8 (L3) ✓ → Finish.
7. **Finish**: `t("all_done")` (360, 110); the rabbit (360, 190) `ANIM.celebrate`; the summary = eight small plates (`ART.miniPlate`, r 30) in two rows of four (y = 330 and 410; x = 180 + i × 120) each showing its four foods at size 16 in their quarters and, where one was placed, its sweet at size 12 beside it — the meals the child built; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  rabbit:     { kind: "emoji", value: "🐰", size: 72 },
  plate:      { kind: "shape", shape: "circle", r: 112, fill: "surface", stroke: "structure", strokeWidth: 4 },
  plateRing:  { kind: "shape", shape: "circle", r: 124, stroke: "accent", strokeWidth: 6 },              // alpha 0; ANIM.glow on round complete
  divider:    { kind: "shape", shape: "line", w: 216, stroke: "line", strokeWidth: 3 },                  // one horizontal, one vertical, through the plate centre
  treatDish:  { kind: "shape", shape: "circle", r: 44, fill: "surface2", stroke: "line", strokeWidth: 2 },   // dashed: lineDash [6,5]
  dishMark:   { kind: "shape", shape: "circle", r: 6, fill: "line" },                                    // a small dot at the dish centre when empty
  trayTile:   { kind: "shape", shape: "roundRect", w: 96, h: 96, fill: "surface", stroke: "line", strokeWidth: 2, radius: 12 },
  // group icons (on the plate; never tray foods)
  iconVeg:     { kind: "emoji", value: "🥕", size: 34 },
  iconGrain:   { kind: "emoji", value: "🌾", size: 34 },
  iconProtein: { kind: "emoji", value: "🥚", size: 34 },
  iconDairy:   { kind: "emoji", value: "🥛", size: 34 },
  // fruit and vegetables
  apple:      { kind: "emoji", value: "🍎", size: 60 },
  banana:     { kind: "emoji", value: "🍌", size: 60 },
  broccoli:   { kind: "emoji", value: "🥦", size: 60 },                                                    // Unicode 9
  strawberry: { kind: "emoji", value: "🍓", size: 60 },
  grapes:     { kind: "emoji", value: "🍇", size: 60 },
  tomato:     { kind: "emoji", value: "🍅", size: 60 },
  pear:       { kind: "emoji", value: "🍐", size: 60 },
  orange:     { kind: "emoji", value: "🍊", size: 60 },
  cucumber:   { kind: "emoji", value: "🥒", size: 60 },                                                    // Unicode 9
  watermelon: { kind: "emoji", value: "🍉", size: 60 },
  // grains
  bread:      { kind: "emoji", value: "🍞", size: 60 },
  rice:       { kind: "emoji", value: "🍚", size: 60 },
  pasta:      { kind: "emoji", value: "🍝", size: 60 },
  pretzel:    { kind: "emoji", value: "🥨", size: 60 },                                                    // Unicode 10
  baguette:   { kind: "emoji", value: "🥖", size: 60 },                                                    // Unicode 9
  croissant:  { kind: "emoji", value: "🥐", size: 60 },                                                    // Unicode 9
  // protein foods
  chicken:    { kind: "emoji", value: "🍗", size: 60 },
  fish:       { kind: "emoji", value: "🐟", size: 60 },
  meat:       { kind: "emoji", value: "🥩", size: 60 },                                                    // Unicode 10
  nuts:       { kind: "emoji", value: "🥜", size: 60 },                                                    // Unicode 8
  // dairy
  cheese:     { kind: "emoji", value: "🧀", size: 60 },                                                    // Unicode 8
  butter:     { kind: "emoji", value: "🧈", size: 60 },                                                    // Unicode 12
  // sweets (the treat dish only)
  candy:      { kind: "emoji", value: "🍬", size: 60 },
  lollipop:   { kind: "emoji", value: "🍭", size: 60 },
  doughnut:   { kind: "emoji", value: "🍩", size: 60 },
  cake:       { kind: "emoji", value: "🍰", size: 60 },
  cookie:     { kind: "emoji", value: "🍪", size: 60 },
  chocolate:  { kind: "emoji", value: "🍫", size: 60 },
  // cues and chrome
  groupBadge: { kind: "shape", shape: "circle", r: 24, fill: "bg", stroke: "structure", strokeWidth: 2 },   // holds the food's group icon at 26 px, at the tile's top-right
  showRing:   { kind: "shape", shape: "roundRect", w: 108, h: 108, stroke: "structure", strokeWidth: 4, radius: 16 },
  miniPlate:  { kind: "shape", shape: "circle", r: 30, fill: "surface", stroke: "structure", strokeWidth: 2 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names one plain food unambiguously in English (the key is the intended word); no brands, no dishes tied to one country. No glyph is newer than Unicode 12; no fallback needed. Colour-blind safety: the four sections are the same colour and differ by position and icon; the treat dish differs by its dashed stroke and its separate position; a filled section shows the food itself.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tray food selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "food to a section / dish / back to the tray (x,y set at call)" },
  settle:    { scale: 1.0, duration: 160, ease: "Back.Out", trigger: "food lands in its section (from scale 1.1) and shrinks to size 56" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement (sweet on the plate, second sweet on the dish, full section)" },
  badgeShow: { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", yoyo: true, hold: 1200, trigger: "groupBadge + icon at the tray tile's (+34,−34) after a wrong section (from alpha 0, scale 0.5), hold, then fade" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the treat dish after a sweet is refused; the correct section's icon on the second wrong placement of a round" },
  nod:       { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "rabbit on each correct placement" },
  pop:       { scale: 1.06, duration: 140, ease: "Back.Out", yoyo: true, trigger: "the whole plate when the round completes" },
  glow:      { alpha: 1, duration: 300, ease: "Sine.Out", yoyo: true, hold: 400, trigger: "plateRing on round complete (from alpha 0)" },
  rise:      { y: "-=30", alpha: 0, duration: 260, ease: "Sine.In", trigger: "foods clearing from the plate before the next round" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new round's tray (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing on each unplaced food in the tray (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish rabbit" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]              ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                 ╭──────┬──────╮                                │
      │  rabbit         │(veg) │(grain)│   plate (300,165) r 112       │  zone A
      │ (110,200)       ├──────┼──────┤          ( treat dish )        │
      │                 │(egg) │(milk)│            (540,200) r 44     │
      │                 ╰──────┴──────╯                                │
260   ├──────────────────────────────────────────────────────────────┤
      │  [apple] [bread] [chicken] [cheese] [candy]   tray y=380      │  zone B
      │   x=120   x=240    x=360    x=480    x=600   (96×96)          │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Six-tile trays (L2, L3): tiles of 96 at pitch 108, x = 90 / 198 / 306 / 414 / 522 / 630, y = 380. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull` per completed round.
- `ART.plate` centred (300, 165); `ART.plateRing` behind it at alpha 0; two `ART.divider`s through (300, 165), one horizontal and one vertical. Section icons at 34 px: `ART.iconVeg` (232, 108), `ART.iconGrain` (368, 108), `ART.iconProtein` (232, 222), `ART.iconDairy` (368, 222). Section slots are `makeTile` 100 × 100 with fill and stroke passed as `THEME.colour.surface` (invisible against the plate) centred at (255, 120), (345, 120), (255, 210), (345, 210); a placed food is drawn at the slot centre at size 56.
- `ART.treatDish` centred (540, 200) as a `makeTile` 100 × 100 hit area (visual r 44, dashed); `ART.dishMark` at its centre until a sweet lands (size 48).
- Tray: `makeTile` 96 × 96 with `ART.trayTile` tokens; food glyph centred at size 60; five tiles at x = 120 / 240 / 360 / 480 / 600 (L1), six at x = 90 / 198 / 306 / 414 / 522 / 630 (L2, L3), y = 380.
- Cues: `ART.groupBadge` at the tile's (+34, −34) with the group icon at 26 px inside; `ART.showRing` behind a tray tile.
- `ART.rabbit` at (110, 200).
- Tap floors: tray 96, sections 100, dish 100 (≥ 80). Gaps: tray ≥ 12; sections are adjacent (a mis-tap lands in a neighbouring section, which is a normal wrong placement, never a lock-out).
- Tab order: tray tiles left to right, then the four sections (veg, grain, protein, dairy), then the treat dish.
- While a cue plays (≈ 1.4 s) the tray, sections and dish are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Groups: V = fruit and vegetables (`ART.iconVeg`), G = grains (`ART.iconGrain`), P = protein foods (`ART.iconProtein`), D = dairy (`ART.iconDairy`), S = sweet (treat dish only). Group of each tray food: V — apple, banana, broccoli, strawberry, grapes, tomato, pear, orange, cucumber, watermelon; G — bread, rice, pasta, pretzel, baguette, croissant; P — chicken, fish, meat, nuts; D — cheese, butter; S — candy, lollipop, doughnut, cake, cookie, chocolate. Tray order shuffled per round; the four group foods are never all in the first four tray positions.

- **L1** (five tiles: one food per group + one sweet): (`ART.apple`, `ART.bread`, `ART.chicken`, `ART.cheese` + `ART.candy`) · (`ART.banana`, `ART.rice`, `ART.fish`, `ART.butter` + `ART.lollipop`) · (`ART.broccoli`, `ART.pasta`, `ART.meat`, `ART.cheese` + `ART.doughnut`) · (`ART.strawberry`, `ART.baguette`, `ART.nuts`, `ART.butter` + `ART.cookie`)
- **L2** (six tiles: one food per group + two sweets; only one sweet fits the dish): (`ART.grapes`, `ART.pretzel`, `ART.fish`, `ART.butter` + `ART.cake`, `ART.candy`) · (`ART.tomato`, `ART.rice`, `ART.chicken`, `ART.cheese` + `ART.doughnut`, `ART.chocolate`) · (`ART.pear`, `ART.croissant`, `ART.nuts`, `ART.butter` + `ART.lollipop`, `ART.cookie`) · (`ART.orange`, `ART.bread`, `ART.meat`, `ART.cheese` + `ART.candy`, `ART.cake`)
- **L3** (six tiles: five foods, two of them from ONE group, + one sweet): (`ART.apple`, `ART.broccoli`, `ART.pasta`, `ART.fish`, `ART.cheese` + `ART.chocolate`) · (`ART.cucumber`, `ART.watermelon`, `ART.pretzel`, `ART.nuts`, `ART.butter` + `ART.cookie`) · (`ART.grapes`, `ART.rice`, `ART.baguette`, `ART.chicken`, `ART.cheese` + `ART.candy`) · (`ART.tomato`, `ART.bread`, `ART.meat`, `ART.nuts`, `ART.butter` + `ART.doughnut`)

Play list of 8 rounds per Rules; no round repeats within a session; the first round of a session is always L1.

## Rules
- Item count: 8 rounds, each = 4 placements (+ an optional sweet) ≈ 5 minutes.
- Difficulty progression: 2 consecutive rounds completed with no wrong action → next level (cap L3).
- Adaptation: 2 wrong actions within one round, or a wrong action in each of 2 consecutive rounds → next round one level down (floor L1).
- What happens on a correct answer: `tone("correct")`, the food `ANIM.settle`s in its section and the section icon dims, rabbit `ANIM.nod`; on the fourth section the plate `ANIM.pop`s with `ART.plateRing` `ANIM.glow`, praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rounds with no wrong action only), rail dot fills, next round after 900 ms.
- What happens on a wrong answer:
  - A food into the wrong section (sorted by colour/shape): it glides back, `tone("nudge")`, `ART.groupBadge` with the food's group icon `ANIM.badgeShow`s on its tray tile; on the second wrong action of the round the correct section's icon `ANIM.pulse`s.
  - Cheese or butter into a non-dairy section ("not milk"): the same, with `ART.iconDairy` in the badge.
  - A sweet onto a plate section ("sweets are a group"): refused with `ANIM.nudge`, no message; the treat dish `ANIM.pulse`s the first time in the round.
  - A second food of a filled group's section, or a second sweet on the dish: refused with `ANIM.nudge`, not counted.
- Retry behaviour: per round — wrong action 1 → its cue → wrong action 2 → cue + section pulse → wrong action 3 → `ART.showRing` on every unplaced food with its section pulsing in turn; the round completes as solved-with-help. Undo (tapping a placed food) is free.
- Finish condition: 8 rounds complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Healthy Plate". No words on the play screen.

## Sound
`tone("tap")` on selecting a food or undoing; `tone("correct")` on each food landing in its section; `tone("nudge")` on a wrong section; `tone("tap", 4)` when a sweet lands on the dish; `tone("tap", 7)` when the plate completes; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: plate, four icons, treat dish and a six-tile tray fully visible).
- [ ] Keyboard operable (Tab: tray tiles left to right, then the four sections, then the dish; Enter selects / places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong placements still ends with a full plate; the show-me rings appear on the third).
- [ ] Placing the apple in the carrot section makes it settle there and the carrot icon fade a little.
- [ ] Placing the cheese in the carrot section makes it glide back with a small milk-glass badge on its tile.
- [ ] Placing a sweet on any plate section makes it spring back with no message, and the treat dish pulses once.
- [ ] One sweet lands on the treat dish; a second sweet springs back from the dish.
- [ ] A section that already holds a food springs back a second food of the same group.
- [ ] Two clean rounds in a row bring a six-tile tray; two wrong placements in a round bring a five-tile tray next.
- [ ] No brand, packet, or dish tied to one country appears — every food is a plain fruit, vegetable, grain, protein food, dairy food or sweet.
- [ ] The finish screen shows eight small filled plates and no score.
- [ ] With `?sound=off` nothing is audible.
