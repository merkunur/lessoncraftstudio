# 091 — Living or Not

## Identity
- Slug: `living-or-not`
- Subject / topic: Science / living vs non-living — sorted by what a thing DOES (grows, eats or drinks, moves by itself), never by whether it moves
- Age band: `5-6`
- Interaction pattern: `P8` — sort into bins (tap the item, then tap a bin)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Science scope per F-218 / A-11: the observational core only (needs and growth), nothing causal.

## Learning
- Objective: Sorts pictured things into a "living" bin and a "not living" bin by whether they grow and eat or drink, including moving non-living things (a cloud, a car, a robot) and non-moving living things (a tree, a cactus, a seed).
- Prerequisites: None beyond tapping. The bins carry icons (a growing plant and an apple; a stone), so nothing needs to be read. Nothing is spoken.
- Curriculum links: F-23 (living things — needs of plants and animals, growth — in all 12 systems at 5-8), F-30 (science integrated into world-knowledge subjects at 5-8: HSU, Questionner le monde, ympäristöoppi, Conocimiento del Medio, natur/teknologi, naturfag), F-218 (science games cover the observational common core), F-5 (near-zero game supply for this topic — the game exists to cover the curriculum, not demand). US K-LS1-1 "what plants and animals need to survive"; England Y1 "living, dead, never alive" (Y2 formally, but the sort is in Reception/Y1 world knowledge); Germany Sachunterricht Klasse 1-2 "Lebewesen"; France CP "le vivant"; Brazil EF01CI (seres vivos); Finland esiopetus ympäristöoppi.
- Common misconceptions (F-131), each with this game's response:
  1. **"If it moves, it is alive" (a cloud, a car, a balloon, a robot).** Response: from L1 the stream includes a moving non-living thing. When such an item is put in the living bin, it glides back and does the thing that fooled the child — it MOVES (`ANIM.roll`, a slide sideways and back) — and then the `ART.timeStrip` appears under it showing the item three times at the SAME size (`ART.sameSize` copies): it moved, but it did not grow. The living bin's grow icon `ANIM.pulse`s. The child sees that moving is not the rule.
  2. **"Plants are not alive" (a tree, a flower, a cactus, a seed).** Response: from L1 the stream includes a plant. When a plant is put in the not-living bin, it glides back and the `ART.timeStrip` shows it at three sizes small → medium → big (`ANIM.growStrip`, each copy appearing 300 ms after the last with `tone("tap", k)`), and `ART.waterDrop` falls onto it (`ANIM.drip`): it grows and it drinks. The living bin's grow icon pulses.
  3. **"A toy animal is an animal" (a teddy bear).** Response: L2 includes a teddy. Placed in the living bin, it glides back and the `ART.timeStrip` shows three same-size copies; no drop falls; the stone bin's icon pulses.
  4. **Sorting by "has a face / looks like an animal" or by colour.** Response: item art varies (a robot has a face and is not alive; a cactus has no face and is alive); nothing in the game colours living things differently from non-living things — both bins use the same tokens and differ only by icon.

## How it plays
1. **Start screen**: title "Living or Not", the owl (`ART.owl`) at (360, 200), Start, picker.
2. **Item 1 (L1)**: rail of 10 dots (§6) at y = 28. Zone A: a conveyor strip (`ART.belt`, a rounded bar across zone A at y = 170) with the owl perched at the left end (80, 150); the first item — the cat (`ART.cat`) — slides in from the right (`ANIM.slideIn`) to the centre (360, 170) as a `makeTile` 120 × 120 (transparent fill; the emoji drawn inside at its ART size). Zone B: two bins (`ART.bin`, 200 × 120) at y = 390, x = 230 and x = 490. The left bin's front carries the living rule: `ART.iconGrow` (a small seedling beside a bigger seedling with `ART.growArrow` between them) at (−36, −16) and `ART.iconApple` at (36, −16); the right bin's front carries `ART.iconStone` (a grey pebble outline) at (0, −16). Each bin has a count sub-label `ART.binCount` "0" at (0, +40). Which bin is left and which is right is decided once per session at random (§13) and never changes during the session. No caption — nothing to read.
3. **Sorting**: tap the item (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The item glides (`ANIM.glide`) into the bin.
   - **Correct bin**: the bin's count goes up by one, `ANIM.pop` on the bin, `tone("correct")`; every third correct item (and the tenth) gets a praise pop; the rail dot fills; the next item slides in after 400 ms.
   - **Wrong bin**: the item glides back to the centre, `tone("nudge")`; then the enacted cue for that item's class (Rules) plays for ≈ 1.6 s with the item tile disabled; then attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the item there completes the item as solved-with-help.
   - Tapping a bin with no item selected: the bin's icons do `ANIM.pop` (a harmless preview); nothing else.
4. **A full worked session (a child who thinks moving things are alive)**: item 1 cat → living ✓ · item 2 car → living ✗: the car glides back, rolls left and right (`ANIM.roll`), then three same-size cars appear under it on the time strip; the grow icon pulses; the child taps the stone bin ✓ (retried, not first-try) · item 3 tree → living ✓ · item 4 book → stone ✓ → step up · item 5 (L2) balloon → living ✗ → roll + same-size strip → stone ✓ · item 6 (L1) flower → living ✓ · item 7 dog → living ✓ → step up · item 8 (L2) teddy → living ✗ → same-size strip (no roll: a teddy does not move by itself) → stone ✓ · item 9 (L1) cloud → stone ✓ · item 10 seedling → living ✓ → Finish.
5. **Finish**: `t("all_done")` (360, 110); the owl (360, 200) `ANIM.celebrate`; the two bins at y = 400 (x = 230 / 490) showing their final counts with the items they received drawn as a row of 36 px copies above each bin (y = 320, 44 px apart, centred on the bin) — the visual summary; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  owl:        { kind: "emoji", value: "🦉", size: 80 },                          // Unicode 9
  belt:       { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  // items — living
  cat:        { kind: "emoji", value: "🐱", size: 84 },
  dog:        { kind: "emoji", value: "🐶", size: 84 },
  tree:       { kind: "emoji", value: "🌳", size: 84 },
  flower:     { kind: "emoji", value: "🌷", size: 84 },
  rabbit:     { kind: "emoji", value: "🐰", size: 84 },
  butterfly:  { kind: "emoji", value: "🦋", size: 84 },                          // Unicode 9
  seedling:   { kind: "emoji", value: "🌱", size: 84 },
  sunflower:  { kind: "emoji", value: "🌻", size: 84 },
  snail:      { kind: "emoji", value: "🐌", size: 84 },
  turtle:     { kind: "emoji", value: "🐢", size: 84 },
  cactus:     { kind: "emoji", value: "🌵", size: 84 },
  acorn:      { kind: "emoji", value: "🌰", size: 84 },                          // a seed
  bee:        { kind: "emoji", value: "🐝", size: 84 },
  // items — not living
  car:        { kind: "emoji", value: "🚗", size: 84 },
  cloud:      { kind: "emoji", value: "☁️", size: 84 },
  ball:       { kind: "emoji", value: "⚽", size: 84 },
  book:       { kind: "emoji", value: "📕", size: 84 },
  balloon:    { kind: "emoji", value: "🎈", size: 84 },
  train:      { kind: "emoji", value: "🚂", size: 84 },
  teddy:      { kind: "emoji", value: "🧸", size: 84 },                          // Unicode 11
  stone:      { kind: "emoji", value: "🪨", size: 84, fallback: "🥌" },          // Unicode 13 → curling stone
  robot:      { kind: "emoji", value: "🤖", size: 84 },
  sun:        { kind: "emoji", value: "☀️", size: 84 },
  wave:       { kind: "emoji", value: "🌊", size: 84 },
  plane:      { kind: "emoji", value: "✈️", size: 84 },
  // bins and rule icons
  bin:        { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconGrow:   { kind: "emoji", value: "🌱", size: 28 },                          // drawn twice: size 28 then size 44, the growArrow between
  growArrow:  { kind: "shape", shape: "polygon", points: [[-10,-6],[4,-6],[4,-12],[14,0],[4,12],[4,6],[-10,6]], fill: "structure" },
  iconApple:  { kind: "emoji", value: "🍎", size: 36 },
  iconStone:  { kind: "shape", shape: "polygon", points: [[-22,6],[-16,-12],[0,-18],[18,-12],[24,4],[12,16],[-10,16]], fill: "surface2", stroke: "inkSoft", strokeWidth: 3 },
  binCount:   { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  // enacted cues
  timeStrip:  { kind: "shape", shape: "roundRect", w: 300, h: 80, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  sameSize:   { kind: "shape", shape: "rect", w: 44, h: 4, fill: "inkSoft" },     // a flat bar under each same-size copy: "stays the same"
  waterDrop:  { kind: "emoji", value: "💧", size: 32 },
  showRing:   { kind: "shape", shape: "roundRect", w: 212, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Colour-blind safety: the two bins share the same fill and stroke; they differ by icon geometry (seedlings + apple vs pebble) and by position, never by colour. The item tile's chosen state is lift + outline weight. Emoji used as picture prompts are all objects/animals with an unambiguous English name (listed above with the intended word as the key).

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new item from x = 760 to the belt centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "item selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "item to bin / back to centre (x,y set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct item; bin icon preview tap" },
  roll:      { x: "+=60", duration: 260, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "a moving non-living item after a wrong bin: it slides right and back twice — it moves, but see the strip" },
  growStrip: { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "each of the three strip copies in turn (from alpha 0, scale 0.6), 300 ms apart" },
  drip:      { y: "+=40", alpha: 0, duration: 500, ease: "Sine.In", trigger: "waterDrop falls from above a plant onto it (from alpha 1), twice" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's rule icons after the strip" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "timeStrip and its copies at the end of a cue" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct bin (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish owl" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]          ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                 │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ owl(80,150)  ═══════════ belt y=170 ═══════════   item enters→│  zone A
      │                        [ item (360,170) ]                     │
      │              ┌── timeStrip (360,236) during a cue ──┐         │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌─────────────┐              ┌─────────────┐  bins y=390  │
      │      │ grow  apple │              │     stone    │  x=230/490   │  zone B
      │      │      0      │              │      0       │  (200×120)   │
      │      └─────────────┘              └─────────────┘              │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
(The bin icons in the diagram stand for `ART.iconGrow` + `ART.growArrow` + `ART.iconApple` and `ART.iconStone`.) Fixed layout, FIT scaling; the time strip overlaps the lower edge of zone A and is drawn above the belt.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull` as items are solved.
- `ART.owl` (80, 150); `ART.belt` centred (390, 170).
- The item: a `makeTile` 120 × 120 at (360, 170) with transparent fill and no stroke (fill and stroke passed as `THEME.colour.bg` so the tile itself is invisible); the item's ART emoji is a child of the tile container at (0, 0). Selected look: `ANIM.lift` plus the library selected outline (`THEME.colour.structure`, 3 px) drawn as a rounded square around the emoji.
- Bins: `makeTile` 200 × 120 (`ART.bin` tokens) at (230, 390) and (490, 390). Living bin front: `ART.iconGrow` drawn at size 28 at (−58, −14) and again at size 44 at (−10, −18), `ART.growArrow` at (−34, −14), `ART.iconApple` at (48, −16). Not-living bin front: `ART.iconStone` at (0, −16). `ART.binCount` at (0, +40) on both.
- Cue elements: `ART.timeStrip` centred (360, 236); the three copies of the current item drawn on it at x = 270 / 360 / 450, y = 236 — for a living item at sizes 32 / 48 / 64, for a non-living item all at size 48 with `ART.sameSize` bars 30 px under each copy; `ART.waterDrop` starts at (360, 130) and falls onto the strip's middle copy.
- `ART.showRing` around the correct bin.
- Tap floors: item tile 120, bins 200 × 120 (≥ 80). Gap between bins 60.
- Tab order: the item tile, then the left bin, then the right bin.
- While a cue plays (≈ 1.6 s: roll 1040 ms or strip 900 ms, plus pulse) the item tile and both bins are `setEnabled(false)`; they re-enable when the cue fades.

## Content
Language-neutral (pictures only; no words on the play screen). Each item = (ART key; class; cue class). Classes: L = living, N = not living. Cue classes: `grows` (living, animal), `plant` (living, plant — grows AND drinks), `moves` (non-living that moves), `still` (non-living that does not move).

- **L1** (clear cases; includes one plant and one moving non-living thing): (`ART.cat`; L; grows) · (`ART.dog`; L; grows) · (`ART.tree`; L; plant) · (`ART.flower`; L; plant) · (`ART.car`; N; moves) · (`ART.cloud`; N; moves) · (`ART.ball`; N; still) · (`ART.book`; N; still)
- **L2** (a moving toy, a toy animal, a stone): (`ART.rabbit`; L; grows) · (`ART.butterfly`; L; grows) · (`ART.seedling`; L; plant) · (`ART.sunflower`; L; plant) · (`ART.balloon`; N; moves) · (`ART.train`; N; moves) · (`ART.teddy`; N; still) · (`ART.stone`; N; still)
- **L3** (slow or still living things; lively non-living things): (`ART.snail`; L; grows) · (`ART.turtle`; L; grows) · (`ART.cactus`; L; plant) · (`ART.acorn`; L; plant) · (`ART.bee`; L; grows) · (`ART.robot`; N; moves) · (`ART.sun`; N; moves) · (`ART.wave`; N; moves) · (`ART.plane`; N; moves)

Play list of 10 per Rules (shuffle within level; levels in order; the first two items of a session are always one L1 living animal and one L1 still object so success starts high — F-40); no item repeats within a session; no more than two consecutive items of the same class (so a child cannot alternate bins by habit); the bin sides are fixed for the whole session.

## Rules
- Item count: 10.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3). (Three, not two: items are quick, ~15 s each.)
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: item glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the tenth; rail dot fills; next item slides in after 400 ms.
- What happens on a wrong answer (each begins with the item gliding back and `tone("nudge")`):
  - A moving non-living thing (car, cloud, balloon, train, robot, sun, wave, plane) put in the living bin ("it moves so it is alive"): `ANIM.roll` on the item, then `ART.timeStrip` with three SAME-size copies and `ART.sameSize` bars, then the stone bin's `ART.iconStone` `ANIM.pulse`s; strip fades after 1200 ms.
  - A plant (tree, flower, seedling, sunflower, cactus, acorn) put in the not-living bin ("plants are not alive"): `ART.timeStrip` with copies at three growing sizes (`ANIM.growStrip`, `tone("tap", k)` per copy), `ART.waterDrop` `ANIM.drip` twice onto the middle copy, then the living bin's `ART.iconGrow` pulses.
  - An animal put in the not-living bin: strip with three growing sizes (no drop), then the living bin's icons pulse.
  - A still non-living thing (ball, book, teddy, stone) put in the living bin: strip with three same-size copies (no roll), then the stone icon pulses.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with `ART.showRing` on the correct bin; placing the item there completes it as solved-with-help (no praise pop). No attempt 4.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Living or Not". No text on the play screen (bin counts are numerals).

## Sound
`tone("tap")` on selecting an item; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", k)` per growing copy on the strip (k = 1, 2, 3 — the pitch climbs as the copy grows); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: belt, item, both bins and the time strip fully visible).
- [ ] Keyboard operable (Tab: the item, then the two bins; Enter selects the item / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] The first session item is always an animal or a still object, never a cloud, car or plant.
- [ ] Putting the car in the living bin makes it slide right and back twice, then shows three same-size cars under it, then the stone icon pulses.
- [ ] Putting the tree in the not-living bin shows it small, medium, big with rising tones and a drop falling on it, then the seedling icon pulses.
- [ ] The teddy in the living bin shows three same-size teddies and does NOT roll.
- [ ] Bin sides do not swap during a session; the bins have identical colours and differ only by their icons.
- [ ] Bin counts go up only on correct sorts; the finish screen shows the items each bin received and no score.
- [ ] Three first-try corrects in a row bring the harder items (snail, cactus, robot, sun); a wrong bin brings clear cases next.
- [ ] If the stone emoji is missing on the device, a curling stone appears instead.
- [ ] With `?sound=off` nothing is audible.
