# 161 — Animal Babies

## Identity
- Slug: `animal-babies`
- Subject / topic: Science / matching adult animals to their young — most young look like a small copy of the adult, and a few (caterpillar, tadpole, chick) look different and change as they grow
- Age band: `5-6`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Science scope per F-218 / A-11: what a young animal LOOKS like and what it grows into, as a picture sequence; no reproduction, no life-cycle stages beyond young → adult (the full cycles are game 096).

## Learning
- Objective: Pairs each pictured adult animal on a visible board with the picture of its young, including the young that do not look like the adult (caterpillar → butterfly, tadpole → frog, chick → hen) and ignoring look-alike adults (a snail beside the caterpillar, a fish beside the tadpole).
- Prerequisites: None beyond tapping. Recognises common animals from pictures. Nothing is read and nothing is spoken; the board is discoverable by tapping (two taps make or refuse a pair).
- Curriculum links: F-23 (living things — growth and common species in all 12 systems at 5-8), F-30 (science inside world-knowledge subjects at 5-8), F-218 (observational core), F-5 (near-zero game supply for this topic). US 1-LS3-1 "young plants and animals are like, but not exactly like, their parents"; England Y1-Y2 "animals have offspring which grow into adults"; Germany Sachunterricht Klasse 1-2 "Tiere und ihre Jungen"; France GS-CP "les petits des animaux"; Spain Conocimiento del Medio 1º; Brazil EF02CI (seres vivos — ciclo de vida); Sweden förskoleklass-åk 1 "djur och deras ungar"; Finland esiopetus ympäristöoppi.
- Common misconceptions (F-133, F-131), each with this game's response:
  1. **"A baby always looks like a small parent" — the caterpillar is paired with the snail or the worm, the tadpole with the fish, the chick with the duck.** Response: L2 and L3 boards put the look-alike adult on the same board as the changing young. A wrong pair nudges apart; before it does, the tapped YOUNG plays `ANIM.growInto`: a copy of it rises above its tile and cross-fades into its true adult while scaling up (`ART.growGhost`) — the caterpillar becomes the butterfly, the tadpole becomes the frog — then fades. The child sees what the baby turns into, not just "no".
  2. **"Anything in the water is a fish" (F-133) — the tadpole is paired with the fish.** Response: the fish adult is on the L3 tadpole board on purpose; the growInto cue shows the tadpole's legs (`ART.tadpoleLegs` drawn on the ghost mid-way) before it becomes the frog.
  3. **Pairing by size only — the smallest tile is paired with the biggest adult (the kitten with the elephant).** Response: L1 young are small copies, so size matching WORKS at L1 (success starts high, F-40); from L2 every young is drawn at the SAME size (56 px) whatever its adult, so size is no longer a cue and the child must look at the animal's shape.
  4. **Tapping the same tile twice expecting a match.** Response: the second tap on the selected tile de-selects it (no error; `tone("tap")` only).

## How it plays
1. **Start screen**: title "Animal Babies", the hen with a chick (`ART.hen` at (330, 200), `ART.chick` at (400, 226)), Start, picker.
2. **Board 1 (L1: 3 pairs, 6 tiles)**: the rail shows 3 dots (§6 — one per board; three boards per session). Zones A/B are merged: a 3 × 2 grid of tiles (`ART.tile`, 120 × 120, gap 24) centred at (360, 295): columns x = 216 / 360 / 504, rows y = 220 / 370. Three tiles show adults (`ART.cat`, `ART.dog`, `ART.elephant` at size 72) and three show their young — at L1 the young is the SAME picture at size 44 standing on a small grass tuft (`ART.tuft`) so it reads as "the little one" — in a shuffled layout (an adult and its young are never side by side in the same row on a fresh board). The hen sits at (70, 295) as the guide character; no caption.
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Pair (an adult and its own young)**: both tiles glide 16 px toward each other (`ANIM.join`), `tone("correct")`, then lock: both dim to alpha 0.6 with a link glyph (`ART.link`) drawn between them and a small copy of the young (size 28) drawn ON the adult tile at its bottom-right (`ANIM.settleHome`) — the baby is with its parent; the hen `ANIM.nod`s. Praise pop when the board completes.
   - **Not a pair (a young + the wrong adult)**: the young plays `ANIM.growInto` (its `ART.growGhost` copy rises 40 px, scales 0.7 → 1.15 and cross-fades from the young's picture to its true adult's picture over 900 ms, holds 500 ms, fades), then both tiles `ANIM.nudge`, `tone("nudge")`, both de-select. If that young has now been in two wrong pairs, its true adult gains `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Not a pair (two adults, or two young)**: both nudge at once, `tone("nudge")`, no ghost (there is nothing to grow into).
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all three pairs locked → praise pop (rotation), the rail dot fills, `ANIM.boardOut` (all tiles rise and fade), the next board `ANIM.appear`s after 600 ms.
5. **Boards 2-3**: L2 = 3 pairs where one young looks different from its adult (the hen's chick, the butterfly's caterpillar) and every young is drawn at 56 px; L3 = 3 pairs with the deliberate look-alike trap on the board (tadpole + frog + FISH; caterpillar + butterfly + SNAIL; chick + hen + DUCK). Each board is one item.
6. **A full worked session**: board 1 (L1: cat–kitten, dog–puppy, elephant–calf) ✓ ✓ ✓ → step up · board 2 (L2: hen–chick, butterfly–caterpillar, sheep–lamb): sheep + lamb ✓ · caterpillar + hen ✗ → a ghost caterpillar rises, grows and turns into a butterfly, then both tiles wiggle · caterpillar + butterfly ✓ · hen + chick ✓ (one wrong pair → same level) · board 3 (L2: frog–tadpole, bear–cub, duck–duckling): tadpole + bear ✗ → the ghost tadpole grows legs and becomes a frog · tadpole + frog ✓ · bear + cub ✓ · duck + duckling ✓ → Finish.
7. **Finish**: `t("all_done")` (360, 110); the hen (330, 200) `ANIM.celebrate` with the chick beside her; the summary = every pair made this session as `ART.pairChip`s (the adult at size 30 on the left, its young at size 22 on the right, 84 × 48) in a row of up to nine from y = 380 (x = 360 − (n − 1) × 46 + i × 92, wrapping to y = 440 after five) — the families; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  hen:        { kind: "emoji", value: "🐔", size: 72 },
  tile:       { kind: "shape", shape: "roundRect", w: 120, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  tuft:       { kind: "shape", shape: "polygon", points: [[-22,12],[-14,-6],[-8,12],[0,-10],[8,12],[14,-6],[22,12]], fill: "structureSoft", stroke: "structure", strokeWidth: 2 },   // under an L1 "little one"
  // adults (young drawn as the same glyph at 44 px on L1 boards, 56 px on L2/L3 boards, unless a separate young key exists)
  cat:        { kind: "emoji", value: "🐱", size: 72 },
  dog:        { kind: "emoji", value: "🐶", size: 72 },
  elephant:   { kind: "emoji", value: "🐘", size: 72 },
  horse:      { kind: "emoji", value: "🐎", size: 72 },
  cow:        { kind: "emoji", value: "🐄", size: 72 },
  pig:        { kind: "emoji", value: "🐷", size: 72 },
  sheep:      { kind: "emoji", value: "🐑", size: 72 },
  bear:       { kind: "emoji", value: "🐻", size: 72 },
  rabbit:     { kind: "emoji", value: "🐰", size: 72 },
  duck:       { kind: "emoji", value: "🦆", size: 72 },                          // Unicode 9
  goat:       { kind: "emoji", value: "🐐", size: 72 },
  penguin:    { kind: "emoji", value: "🐧", size: 72 },
  butterfly:  { kind: "emoji", value: "🦋", size: 72 },                          // Unicode 9
  frog:       { kind: "emoji", value: "🐸", size: 72 },
  fish:       { kind: "emoji", value: "🐟", size: 72 },
  snail:      { kind: "emoji", value: "🐌", size: 72 },
  // young that look different from the adult
  chick:      { kind: "emoji", value: "🐥", size: 56 },
  caterpillar:{ kind: "emoji", value: "🐛", size: 56 },
  tadpole:    { kind: "shape", shape: "ellipse", w: 34, h: 24, fill: "structure" },   // head; ART.tadpoleTail is drawn from its right edge
  tadpoleTail:{ kind: "shape", shape: "polygon", points: [[0,-5],[26,-10],[34,0],[26,10],[0,5]], fill: "structure" },
  tadpoleLegs:{ kind: "shape", shape: "polygon", points: [[-6,10],[-14,22],[-8,22],[0,12],[8,22],[14,22],[6,10]], fill: "structure" },   // appears on the ghost mid-way through growInto
  // cues and chrome
  growGhost:  { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "bg", stroke: "structure", strokeWidth: 3, radius: 16 },   // the rising card that carries the young → adult cross-fade
  link:       { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  hintRing:   { kind: "shape", shape: "roundRect", w: 132, h: 132, stroke: "structure", strokeWidth: 4, radius: 20 },
  pairChip:   { kind: "shape", shape: "roundRect", w: 84, h: 48, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names one animal unambiguously in English (the key is the intended word). No glyph is newer than Unicode 12, so no fallback is needed; the tadpole has no emoji and is drawn from two shapes. Colour-blind safety: adult and young tiles share tokens; a locked pair shows the link bar AND the small young on its adult; the ghost cue is motion + picture, never colour.

## Animation registry
```js
const ANIM = {
  lift:        { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  join:        { duration: 220, ease: "Back.Out", trigger: "each of a correct pair moves 16 px toward the other (x,y at call)" },
  settleHome:  { alpha: 1, scale: 1, duration: 260, ease: "Back.Out", trigger: "a small copy of the young appears on its adult's tile (from alpha 0, scale 0.4)" },
  growInto:    { y: "-=40", scale: 1.15, duration: 900, ease: "Sine.InOut", hold: 500, trigger: "growGhost rises from the tapped young's tile (from scale 0.7); its picture cross-fades young → true adult over the 900 ms (two text objects, alphas 1→0 and 0→1); tadpoleLegs appear at 450 ms; then fadeOut" },
  fadeOut:     { alpha: 0, duration: 300, ease: "Sine.In", trigger: "growGhost after its hold" },
  nudge:       { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  nod:         { angle: 6, duration: 110, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hen on each correct pair" },
  showMe:      { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true adult (from alpha 0.2)" },
  boardOut:    { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles when a board completes" },
  appear:      { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6)" },
  celebrate:   { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hen" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                    ○ ○ ○   rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │   hen        [ cat ]      [ puppy ]    [ elephant ]   y=220  │
      │  (70,295)                                                    │  zones A+B
      │              [ calf ]     [ dog ]      [ kitten ]     y=370  │
      │              x=216        x=360        x=504   (120×120)     │
      │        growGhost rises to y−40 above the tapped young        │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling; the ghost card may overlap zone T briefly (it rises 40 px from a top-row tile to y = 180 at most).

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 3 × `ART.dotEmpty` at y = 28 (x = 338 + i × 22) → `ART.dotFull` as boards complete. No board counter text (5-6 band).
- Tiles: `makeTile` 120 × 120 with `ART.tile` tokens at the six grid positions; the picture centred. Adult pictures at size 72. Young pictures: L1 = the adult's glyph at size 44 with `ART.tuft` drawn 30 px below the glyph centre; L2/L3 = size 56 (a separate glyph where one exists: `ART.chick`, `ART.caterpillar`, `ART.tadpole` + `ART.tadpoleTail`), no tuft.
- Selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` between the two facing edges + the young's picture at size 28 at the adult tile's (+34, +34).
- `ART.growGhost` is created at the tapped young's tile centre, drawn above every tile; inside it the young's picture (size 56) and its adult's picture (size 72) are stacked at (0, 0), alphas swapped by `ANIM.growInto`; `ART.tadpoleLegs` at (0, +8) on the tadpole ghost only.
- `ART.hintRing` behind a tile. `ART.hen` (70, 295) during play; at (330, 200) on Start/Finish with `ART.chick` at (400, 226).
- Tap floors: 120 ≥ 80; gaps 24 both ways.
- Tab order: row-major, left to right, top to bottom (arrows move across the grid).
- During `ANIM.growInto` (≈ 1.7 s) all tiles are `setEnabled(false)`.

## Content
Language-neutral (pictures only). Each board = three (adult → young) pairs; every animal on a board is distinct. "same" means the young is the adult's own glyph drawn small. Adult words map to ART keys of the same name — cat `ART.cat`, dog `ART.dog`, elephant `ART.elephant`, horse `ART.horse`, cow `ART.cow`, pig `ART.pig`, sheep `ART.sheep`, bear `ART.bear`, rabbit `ART.rabbit`, duck `ART.duck`, goat `ART.goat`, penguin `ART.penguin`, butterfly `ART.butterfly`, frog `ART.frog`, fish `ART.fish`, snail `ART.snail`, hen `ART.hen`.

- **L1** (every young is a small copy; size is a valid cue): (cat → same · dog → same · elephant → same) · (horse → same · pig → same · rabbit → same) · (cow → same · bear → same · penguin → same) · (sheep → same · goat → same · cat → same)
- **L2** (one changing young per board; all young at 56 px; no look-alike adult yet): (hen → `ART.chick` · butterfly → `ART.caterpillar` · sheep → same) · (frog → `ART.tadpole` · bear → same · duck → same) · (hen → `ART.chick` · cow → same · rabbit → same) · (butterfly → `ART.caterpillar` · horse → same · pig → same)
- **L3** (a changing young WITH its look-alike adult on the board): (frog → `ART.tadpole` · fish → same · elephant → same) · (butterfly → `ART.caterpillar` · snail → same · dog → same) · (hen → `ART.chick` · duck → same · goat → same) · (frog → `ART.tadpole` · fish → same · butterfly → `ART.caterpillar`)

Trap table for the ghost cue (what each changing young grows into): `ART.caterpillar` → `ART.butterfly`; `ART.tadpole` → `ART.frog` (legs at mid-cue); `ART.chick` → `ART.hen`. A "same" young's ghost simply scales from 44/56 px up to 72 px of the same glyph.

Session = 3 boards per Rules; no board repeats within a session; tile positions shuffled per board with the adjacency rule above; the first board of a session is always L1.

## Rules
- Item count: one "item" = one board; 3 boards (9 pairs ≈ 4-5 minutes).
- Difficulty progression: a board completed with no wrong pair → next board one level up (cap L3).
- Adaptation: a board with two or more wrong pairs → next board one level down (floor L1); exactly one wrong pair → same level.
- What happens on a correct answer: `ANIM.join`, `tone("correct")`, tiles lock with `ART.link` and the young copy `ANIM.settleHome`s onto its adult, hen `ANIM.nod`; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], boards with no wrong pair only) and the rail dot.
- What happens on a wrong answer:
  - A young + the wrong adult, chosen by looks (caterpillar → snail, tadpole → fish, chick → duck): `ANIM.growInto` on a `ART.growGhost` above the young — it turns into its true adult — then both `ANIM.nudge`, `tone("nudge")`, both de-select.
  - A young + the wrong adult, chosen by size (kitten → elephant): the same ghost cue (the kitten's ghost grows into a cat), then the nudge.
  - Two adults or two young: both nudge at once, no ghost.
  - The same young in two wrong pairs: its true adult gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made and the board counts as solved-with-help.
- Retry behaviour: unlimited within the board; support escalates per young (two misses → its adult is shown). A board always completes (success is certain). The board is never reset.
- Finish condition: the session's 3 boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Animal Babies". No words on the play screen.

## Sound
`tone("tap")` on select/de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("tap", 4)` when the ghost finishes changing into the adult (the growth "arrives"); `tone("tap", 5)` when the young copy settles on its adult; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu, praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: the 3 × 2 board fully visible with separate tiles; the ghost card stays on the stage).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair locked; hint rings appear after two misses on a young).
- [ ] All tiles are face up at all times; nothing has to be remembered.
- [ ] On the first board every young is the same picture as its adult, drawn small on a grass tuft; from the second board all young are the same size.
- [ ] Tapping the caterpillar then the snail makes a card rise from the caterpillar and turn into a butterfly before both tiles wiggle apart.
- [ ] Tapping the tadpole then the fish shows the tadpole growing legs and becoming a frog.
- [ ] Tapping two adults (or two young) wiggles both with no rising card.
- [ ] A locked pair is dimmed with a bar between the tiles and a small copy of the young sitting on its adult.
- [ ] The first board is always the small-copy level; a clean board is followed by a harder one; a board with two mistakes by an easier one.
- [ ] The finish screen shows every family as an adult-with-young chip and no score.
- [ ] With `?sound=off` nothing is audible.
