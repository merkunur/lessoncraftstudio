# 095 — Who Lives Where (habitats — no words on the play screen)

## Identity
- Slug: `who-lives-where` (the title's verb, nothing more — this game has no lives and no way to lose)
- Subject / topic: Science / habitats — pairing an animal with the place it is found, by the place's observable features (water, sand and sun, trees, ice, big leaves, grass)
- Age band: `6-8`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Science scope per F-218 / A-11: where an animal is observably found; no food chains, no adaptation reasoning.

## Learning
- Objective: Pairs each pictured animal on a visible board with the picture of the place it is found (sea, desert, forest, ice, jungle, grassland, river), including the animals whose body suggests a different place (a penguin that swims but is found on the ice; a whale that is found in the sea; a duck on the river).
- Prerequisites: Recognises common animals from pictures; has met the feature-sort in game 094 (helpful, not required). Reads nothing.
- Curriculum links: F-23 (living things and common local species; needs of animals — in all 12 systems at 5-8), F-30, F-218, F-5. US K-ESS3-1 (living things and the places they are found) / 2-LS4-1 (diversity of life in different habitats); England Y2 "habitats and micro-habitats; animals suited to their habitat"; Germany Sachunterricht Klasse 1-2 "Tiere und ihre Lebensräume"; France CP-CE1 "les milieux de vie"; Spain Conocimiento del Medio 1º ciclo; Brazil EF03CI (ambientes e seres vivos); Sweden åk 1-3 "djur och växter i närmiljön"; Finland ympäristöoppi 1-2.
- Common misconceptions (F-133, F-131), each with this game's response:
  1. **Pairing by what the animal looks like rather than where it is found (the penguin goes to the sea because it swims; the whale to the ice because it is big and grey).** Response: a wrong pair nudges apart; before it does, the tapped habitat tile shows its feature icon (`ART.featWave` / `ART.featSun` / `ART.featTree` / `ART.featSnow` / `ART.featLeaf` / `ART.featGrass` / `ART.featDrop`) large at its centre (`ANIM.featureShow`) — the child sees what the place is made of — and after the same animal has been in two wrong pairs its true habitat gains `ART.hintRing`. L3 boards put the penguin AND the sea on one board, and the whale AND the ice, so the trap is met and enacted.
  2. **"Anything in water is a fish and all water is the same" (the frog is sent to the sea, the fish to the river).** Response: L2/L3 boards can hold both the sea and the river; the river tile's icon is `ART.featDrop` with `ART.featReed` (fresh water with reeds) while the sea's is `ART.featWave`; a wrong water pair shows the two icons side by side on the two water tiles for 900 ms (`ANIM.featureShow` on both) before the nudge.
  3. **"Every animal lives in the forest / on a farm" (the default habitat).** Response: L1 boards never contain the forest; the forest first appears at L2 alongside a tree-less habitat, and the fox / owl / squirrel / deer are its only animals — the forest icon (`ART.featTree`) is shown on every wrong forest pair.
  4. **Tapping the same tile twice expecting a match.** Response: the second tap on the selected tile de-selects it (no error; `tone("tap")` only).

## How it plays
1. **Start screen**: title "Who Lives Where" (no caption below it — the board is discoverable by tapping), the turtle (`ART.turtle`) at (360, 200), Start, picker.
2. **Board 1 (L1: 4 pairs, 8 tiles)**: the rail shows 2 dots (§6 — one per board; two boards per session, three when the child moves up fast); `t("question_x_of_y")` at (360, 48) reads the board number. Zones A/B are merged: a 4 × 2 grid of tiles (`ART.tile`, 108 × 108, gap 16) centred at (360, 300): columns x = 174 / 298 / 422 / 546, rows y = 238 / 362. The eight tiles show four animals and four habitats in a shuffled layout (an animal and its habitat are never horizontally adjacent in the same row on a fresh board). The turtle sits at (70, 300).
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (the animal and its habitat)**: both tiles glide 16 px toward each other (`ANIM.join`), `tone("correct")`, then lock: both dim to alpha 0.6 with a link glyph (`ART.link`) drawn between them and a small copy of the animal (size 28) drawn ON the habitat tile at its bottom-right (`ANIM.settleHome`) — the animal is now at home. The turtle `ANIM.nod`s. Praise pop when the board completes.
   - **Not a pair (animal + wrong habitat)**: the habitat tile shows its feature icon large (`ANIM.featureShow`, 900 ms), then both `ANIM.nudge`, `tone("nudge")`, both de-select; if the animal has now been in two wrong pairs, its true habitat gets `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Not a pair (two animals, or two habitats)**: both nudge at once, `tone("nudge")`, no feature icon (there is no habitat to explain, or no animal to place).
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut` (all tiles rise and fade), the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-3**: L2 5 pairs (10 tiles, 5 × 2 grid: x = 152 / 256 / 360 / 464 / 568, tiles 96 × 96, rows y = 244 / 356) with the forest and both waters possible; L3 5 pairs with the deliberate traps (penguin + sea on the board, whale + ice, duck + fish). Session = 2 boards at L1/L2 pace, 3 boards when the child reaches L3 by the end of board 2.
6. **A full worked session**: board 1 (L1: fish–sea, camel–desert, monkey–jungle, penguin–ice): fish + sea ✓ · penguin + sea ✗ → the sea tile shows a big wave icon, both nudge · penguin + ice ✓ · camel + desert ✓ · monkey + jungle ✓ → one wrong pair → board 2 at L2 (owl–forest, lizard–desert, octopus–sea, elephant–grassland, duck–river): owl + forest ✓ · duck + sea ✗ → the sea shows the wave AND the river shows the drop-with-reeds · duck + river ✓ · lizard + desert ✓ · octopus + sea ✓ · elephant + grassland ✓ → one wrong pair → board 3 at L3 (whale–sea, penguin–ice, duck–river, camel–desert, tiger–jungle): all five ✓ → Finish.
7. **Finish**: `t("all_done")` (360, 110); the turtle (360, 200) `ANIM.celebrate`; the summary = every pair made this session as `ART.pairChip`s (a habitat glyph with its animal on it, 72 × 44) in rows of five from y = 350 (x = 120 + i × 120, second row y = 410) — the animals at home; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5 minutes.

## Art registry
```js
const ART = {
  turtle:     { kind: "emoji", value: "🐢", size: 80 },
  tile:       { kind: "shape", shape: "roundRect", w: 108, h: 108, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },   // picture inside at size 64 (60 on 96-px tiles)
  // habitats
  sea:        { kind: "emoji", value: "🌊", size: 64 },
  desert:     { kind: "emoji", value: "🏜️", size: 64, fallback: "🌵" },   // Unicode 7; the cactus fallback is only for platforms that lack the glyph
  forest:     { kind: "emoji", value: "🌲", size: 64 },
  ice:        { kind: "emoji", value: "🏔️", size: 64 },                   // snow-capped mountain: the icy place
  jungle:     { kind: "emoji", value: "🌴", size: 64 },
  grassland:  { kind: "emoji", value: "🌾", size: 64 },
  river:      { kind: "emoji", value: "🏞️", size: 64 },                   // Unicode 7
  // animals
  fish:       { kind: "emoji", value: "🐟", size: 64 },
  camel:      { kind: "emoji", value: "🐪", size: 64 },
  monkey:     { kind: "emoji", value: "🐒", size: 64 },
  penguin:    { kind: "emoji", value: "🐧", size: 64 },
  frog:       { kind: "emoji", value: "🐸", size: 64 },
  lion:       { kind: "emoji", value: "🦁", size: 64 },
  squirrel:   { kind: "emoji", value: "🐿️", size: 64 },                   // Unicode 7
  crab:       { kind: "emoji", value: "🦀", size: 64 },                    // Unicode 8
  fox:        { kind: "emoji", value: "🦊", size: 64 },                    // Unicode 9
  whale:      { kind: "emoji", value: "🐳", size: 64 },
  giraffe:    { kind: "emoji", value: "🦒", size: 64 },                    // Unicode 10
  owl:        { kind: "emoji", value: "🦉", size: 64 },                    // Unicode 9
  lizard:     { kind: "emoji", value: "🦎", size: 64 },                    // Unicode 9
  octopus:    { kind: "emoji", value: "🐙", size: 64 },
  elephant:   { kind: "emoji", value: "🐘", size: 64 },
  duck:       { kind: "emoji", value: "🦆", size: 64 },                    // Unicode 9
  bear:       { kind: "emoji", value: "🐻", size: 64 },
  parrot:     { kind: "emoji", value: "🦜", size: 64 },                    // Unicode 11
  zebra:      { kind: "emoji", value: "🦓", size: 64 },                    // Unicode 11
  tiger:      { kind: "emoji", value: "🐅", size: 64 },
  dolphin:    { kind: "emoji", value: "🐬", size: 64 },
  hippo:      { kind: "emoji", value: "🦛", size: 64 },                    // Unicode 11
  deer:       { kind: "emoji", value: "🦌", size: 64 },                    // Unicode 9
  // habitat feature icons (what the place is made of)
  featWave:   { kind: "shape", shape: "polygon", points: [[-30,6],[-20,-6],[-10,6],[0,-6],[10,6],[20,-6],[30,6],[30,14],[-30,14]], fill: "structure" },   // sea: waves
  featSun:    { kind: "emoji", value: "☀️", size: 40 },                                                                                                     // desert: sun (with ART.featSand under it)
  featSand:   { kind: "shape", shape: "roundRect", w: 60, h: 10, fill: "accent", radius: 5 },
  featTree:   { kind: "shape", shape: "polygon", points: [[0,-30],[22,10],[8,10],[8,26],[-8,26],[-8,10],[-22,10]], fill: "structure" },                  // forest: a tree
  featSnow:   { kind: "emoji", value: "❄️", size: 40 },                                                                                                     // ice
  featLeaf:   { kind: "emoji", value: "🍃", size: 40 },                                                                                                     // jungle: big leaves
  featGrass:  { kind: "shape", shape: "polygon", points: [[-28,20],[-20,-16],[-12,20],[-4,-24],[4,20],[12,-16],[20,20],[28,-8],[30,20]], fill: "structure" },   // grassland: grass blades
  featDrop:   { kind: "emoji", value: "💧", size: 40 },                                                                                                     // river: fresh water (with ART.featReed)
  featReed:   { kind: "shape", shape: "line", w: 26, stroke: "structure", strokeWidth: 4 },                                                               // two vertical reeds beside the drop
  // board chrome
  link:       { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  hintRing:   { kind: "shape", shape: "roundRect", w: 120, h: 120, stroke: "structure", strokeWidth: 4, radius: 18 },
  pairChip:   { kind: "shape", shape: "roundRect", w: 72, h: 44, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },   // habitat glyph size 26 at left, animal size 22 at right
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names one animal or place unambiguously in English (the key is the intended word; `ART.ice` is the snowy mountain read as "the icy place"). No glyph is newer than Unicode 12; the desert fallback is a belt-and-braces measure, not a requirement. Colour-blind safety: animal tiles and habitat tiles share tokens; a locked pair shows the link bar AND the animal drawn on its habitat; feature icons differ by shape.

## Animation registry
```js
const ANIM = {
  lift:        { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:        { duration: 220, ease: "Back.Out", trigger: "each of a correct pair moves 16 px toward the other (x,y at call)" },
  settleHome:  { alpha: 1, scale: 1, duration: 260, ease: "Back.Out", trigger: "a small copy of the animal appears on its habitat tile (from alpha 0, scale 0.4)" },
  featureShow: { alpha: 1, scale: 1, duration: 260, ease: "Back.Out", yoyo: true, hold: 900, trigger: "the habitat's feature icon at the tile centre (from alpha 0, scale 0.4), hold, then fade" },
  nudge:       { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  nod:         { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "turtle on each correct pair" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true habitat (from alpha 0.2)" },
  boardOut:    { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish turtle" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                     ○ ○   rail y=28   "1 of 2" y=48    │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │  turtle   [ fish ]  [ desert ]  [ penguin ]  [ jungle ]  y=238│
      │  (70,300)                                                    │  zones A+B
      │           [ ice ]   [ monkey ]  [ sea ]      [ camel ]   y=362│
      │           x=174     x=298       x=422        x=546  (108×108) │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
5-pair boards use x = 152 / 256 / 360 / 464 / 568 with 96 × 96 tiles at rows y = 244 / 356. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3) centred at y = 28, swapped for `ART.dotFull` as boards complete; `t("question_x_of_y")` at (360, 48) with n = board number.
- Tiles: `makeTile` with `ART.tile` tokens (108 × 108 on 4-pair boards, 96 × 96 on 5-pair boards); the picture centred at size 64 (60 on 96-px tiles); selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the two facing edges + the animal copy at the habitat tile's (+30, +30) at size 28.
- Feature icons drawn at the habitat tile's centre during `ANIM.featureShow`: `ART.featWave`; `ART.featSun` with `ART.featSand` 26 px below it; `ART.featTree`; `ART.featSnow`; `ART.featLeaf`; `ART.featGrass`; `ART.featDrop` with two `ART.featReed`s at (−26, 0) and (+26, 0), vertical.
- `ART.hintRing` behind a tile. `ART.turtle` (70, 300).
- Tap floors: 96-108 ≥ 56; gaps ≥ 8 at five columns (pitch 104, tiles 96), 16 otherwise.
- Tab order: row-major, left to right, top to bottom (arrows move across the grid).
- During `ANIM.featureShow` (≈ 1.4 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Each board = a list of (animal → habitat) pairs; every habitat on a board is distinct and every animal has exactly one habitat present. Animal words map to ART keys of the same name — fish `ART.fish`, camel `ART.camel`, monkey `ART.monkey`, penguin `ART.penguin`, frog `ART.frog`, lion `ART.lion`, squirrel `ART.squirrel`, crab `ART.crab`, fox `ART.fox`, whale `ART.whale`, giraffe `ART.giraffe`, owl `ART.owl`, lizard `ART.lizard`, octopus `ART.octopus`, elephant `ART.elephant`, duck `ART.duck`, bear `ART.bear`, parrot `ART.parrot`, zebra `ART.zebra`, tiger `ART.tiger`, dolphin `ART.dolphin`, hippo `ART.hippo`, deer `ART.deer`; habitat words to `ART.sea` / `ART.desert` / `ART.forest` / `ART.ice` / `ART.jungle` / `ART.grassland` / `ART.river`.

- **L1** (4 pairs; no forest; one water only): (fish → sea · camel → desert · monkey → jungle · penguin → ice) · (crab → sea · lion → grassland · camel → desert · penguin → ice) · (fish → sea · giraffe → grassland · monkey → jungle · lizard → desert) · (frog → river · lion → grassland · monkey → jungle · penguin → ice)
- **L2** (5 pairs; the forest appears; sea and river may both appear): (owl → forest · lizard → desert · octopus → sea · elephant → grassland · duck → river) · (fox → forest · camel → desert · whale → sea · giraffe → grassland · frog → river) · (bear → forest · parrot → jungle · penguin → ice · crab → sea · zebra → grassland) · (squirrel → forest · hippo → river · fish → sea · lion → grassland · monkey → jungle)
- **L3** (5 pairs; the traps: a feathered swimmer with the sea present, a sea mammal with the ice present, a river bird with a fish present): (whale → sea · penguin → ice · duck → river · camel → desert · tiger → jungle) · (dolphin → sea · penguin → ice · frog → river · deer → forest · parrot → jungle) · (fish → sea · duck → river · penguin → ice · lion → grassland · fox → forest)

Session = 2 or 3 boards per Rules; no board repeats within a session; tile positions shuffled per board with the adjacency rule above.

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 15 pairs ≈ 5-6 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); exactly two wrong pairs → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, tiles lock with `ART.link` and the animal copy `ANIM.settleHome`s onto its habitat, turtle `ANIM.nod`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) and the rail dot.
- What happens on a wrong answer:
  - Animal + wrong habitat (sorted by looks — penguin to the sea, whale to the ice): the tapped habitat's feature icon `ANIM.featureShow`s at its centre, then both nudge, `tone("nudge")`, both de-select.
  - Animal + the wrong WATER (frog to the sea, fish or duck to the wrong water): `ANIM.featureShow` on BOTH water tiles at once (wave on the sea; drop-with-reeds on the river), then the nudge.
  - Two animals or two habitats: both nudge at once, no icon.
  - The same animal in two wrong pairs: its true habitat gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made.
- Retry behaviour: unlimited within the board; support escalates per animal (two misses → its habitat is shown). A board always completes (success is certain). The board is never reset.
- Finish condition: the session's boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Who Lives Where" — no other words on the play screen; the board counter is the shared `question_x_of_y` string.

## Sound
`tone("tap")` on select/de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("tap", 5)` when the animal copy settles on its habitat; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages ("Question 1 of 2", All done, Play again, Menu, praise change with the picker).
- [ ] Works at narrow width (400-px iframe: a 5 × 2 board fully visible with separate tiles).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on an animal).
- [ ] All tiles are face up at all times; nothing has to be remembered.
- [ ] Tapping the penguin then the sea shows a big wave on the sea tile, then both tiles wiggle apart.
- [ ] Tapping the frog then the sea shows the wave on the sea AND the drop-with-reeds on the river before the wiggle.
- [ ] A locked pair is dimmed with a bar between the tiles and a small copy of the animal sitting on its habitat.
- [ ] Tapping two animals (or two habitats) wiggles both with no feature icon.
- [ ] The first board never contains the forest; from the second board the fox/owl/squirrel/deer are the only forest animals.
- [ ] A board with 0-1 mistakes is followed by a bigger board; a board with 3+ mistakes by a smaller one.
- [ ] The finish screen lists every pair made as habitat-with-animal chips and no score.
- [ ] With `?sound=off` nothing is audible.
