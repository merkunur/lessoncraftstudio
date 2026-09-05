# 162 — Animal Diets

## Identity
- Slug: `animal-diet-plates`
- Subject / topic: Science / what animals eat — plant-eaters, meat-eaters and (at the top level) animals that eat both, sorted by the food the animal is seen eating
- Age band: `6-8`
- Interaction pattern: `P8` — sort into bins (tap the animal, then tap a bin)
- Estimated build size: ~470 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P8. Science scope per F-218 / A-11: what an animal eats, shown as the animal eating it; no food chains, no "predator/prey" words, no digestion.

## Learning
- Objective: Sorts pictured animals into a plant-eater bin and a meat-eater bin (and, at the top level, a both bin) by the food each animal eats, including large plant-eaters that look fierce (elephant, rhino, hippo-sized animals) and small or cute meat-eaters (cat, owl, frog, spider).
- Prerequisites: Recognises common animals from pictures; can tell a leaf from a piece of meat in a picture. The bins carry food icons, so nothing needs to be read. Nothing is spoken.
- Curriculum links: F-23 (living things — needs of animals, food — in all 12 systems at 5-8; classification by observable features at 6-8), F-30 (science inside world-knowledge subjects), F-218 (observational core), F-5 (no game supply). US 1-LS1-1 / K-LS1-1 (animals need food; different animals eat different foods); England Y1 "carnivores, herbivores and omnivores" (Y1 animals including humans); Germany Sachunterricht Klasse 1-2 "Was Tiere fressen"; France CP-CE1 "régimes alimentaires des animaux"; Spain Conocimiento del Medio 1º ciclo "alimentación de los animales"; Brazil EF02CI (seres vivos — alimentação); Sweden åk 1-3 "djurs behov"; Finland ympäristöoppi 1-2.
- Common misconceptions (F-133, F-131), each with this game's response:
  1. **"Big, fierce-looking animals eat meat" (the elephant, rhino and gorilla are put in the meat bin).** Response: L1 already holds the elephant; L2 the rhino and gorilla. A wrong bin glides the animal back and its TRUE food appears beside its mouth and is eaten (`ANIM.munch` — a bundle of grass or leaves shrinks into the mouth), and a flat-teeth badge (`ART.teethFlat`) shows under the animal for 1.2 s; the leaf bin's icon pulses. The animal's size is never the rule; its food is.
  2. **"Small or cute animals eat plants" (the cat, owl, frog and spider go to the leaf bin).** Response: L2 holds them. The cue shows the true food eaten (a fish for the cat, a bug for the frog and spider) and the pointed-teeth badge (`ART.teethSharp`) or the hooked-beak badge (`ART.beakHook`) for the owl.
  3. **"All birds eat seeds" (the eagle, owl and penguin go to the leaf bin).** Response: the cue for a bird shows its beak badge (`ART.beakHook` for the eagle and owl, `ART.beakFish` for the penguin) and the food eaten (meat or a fish); the hen and duck appear only at L3 in the both bin, so the child meets seed-eating birds after the hunters.
  4. **"An animal eats one kind of food" — at L3 the bear or pig is forced into one of the two bins.** Response: L3 adds a third bin whose icon is BOTH foods; a bear put in the leaf bin glides back and eats a berry AND a fish one after the other (`ANIM.munch` twice) with the both-teeth badge (`ART.teethBoth`), then the both bin's icons pulse.

## How it plays
1. **Start screen**: title "Animal Diets", the fox (`ART.fox`) at (360, 200), Start, picker.
2. **Item 1 (L1)**: rail of 12 dots (§6) at y = 28; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`. Zone A: a table top (`ART.table`, a rounded bar across zone A at y = 200) with the fox at its left end (80, 170); the first animal — the cow (`ART.cow`) — slides in from the right (`ANIM.slideIn`) to the centre (360, 160) as a `makeTile` 120 × 120 (transparent fill; the emoji drawn inside at size 84). Zone B: two bins (`ART.bin`, 200 × 120) at y = 390, x = 230 and x = 490. The left bin's front carries `ART.iconLeaf` (a leafy sprig) on a small `ART.plate`; the right bin's front carries `ART.iconMeat` (meat on a bone) on a plate. Each bin has a count sub-label `ART.binCount` "0" at (0, +40). Which bin is left and which is right is decided once per session at random (§13) and never changes during the session. No caption.
3. **Sorting**: tap the animal (it lifts, `ANIM.lift`, `tone("tap")`), then tap a bin. The animal glides (`ANIM.glide`) into the bin.
   - **Correct bin**: the bin's count goes up by one, `ANIM.pop` on the bin, `tone("correct")`; every third correct item (and the twelfth) gets a praise pop; the rail dot fills; the next animal slides in after 400 ms.
   - **Wrong bin**: the animal glides back to the centre, `tone("nudge")`; then the enacted cue for that animal (Rules): its food `ANIM.appear`s at (280, 160), glides into the animal's mouth and shrinks away (`ANIM.munch`, `tone("tap", 3)`), while the animal's teeth or beak badge `ANIM.badgeShow`s at (360, 226); the correct bin's icon `ANIM.pulse`s; ≈ 1.8 s with the tile disabled; then attempt 2.
   - **Second wrong bin**: the cue again, then the correct bin gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing the animal there completes the item as solved-with-help.
   - Tapping a bin with no animal selected: the bin's plate icon does `ANIM.pop` (a harmless preview); nothing else.
4. **Items 2-12**: per Content/Rules. L1 = clear plant-eaters and hunters with two bins; L2 = the traps (fierce plant-eaters, cute hunters, hunting birds) with two bins; L3 = three bins — the both bin (`ART.bin` with `ART.iconLeaf` at (−34, −16) and `ART.iconMeat` at (34, −16) on one wide plate) appears in the MIDDLE, the two other bins move to x = 150 and x = 570 (bins 180 × 110), and the stream mixes both-eaters with L2 animals.
5. **A full worked session**: item 1 cow → leaf ✓ · item 2 lion → meat ✓ · item 3 elephant → meat ✗: the elephant glides back, a bundle of leaves slides into its mouth and vanishes, a row of flat teeth shows under it, the leaf plate pulses; the child taps the leaf bin ✓ (retried) · item 4 shark → meat ✓ · item 5 rabbit → leaf ✓ · item 6 eagle → meat ✓ → step up · item 7 (L2) cat → leaf ✗ → a fish is eaten, pointed teeth show · meat ✓ · item 8 (L2) rhino → leaf ✓ · item 9 (L2) owl → meat ✓ · item 10 (L2) panda → leaf ✓ → step up · item 11 (L3, three bins) bear → leaf ✗ → a berry is eaten, then a fish is eaten, the both-teeth badge shows, the middle bin's two plates pulse · both ✓ · item 12 (L3) pig → both ✓ → Finish.
6. **Finish**: `t("all_done")` (360, 110); the fox (360, 200) `ANIM.celebrate`; the two (or three) bins at y = 400 showing their final counts with the animals they received drawn as a row of 36 px copies above each bin (y = 320, 44 px apart, centred on the bin) — the visual summary; `t("question_x_of_y")` at (360, 470) with n = first-try items, total 12; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  fox:        { kind: "emoji", value: "🦊", size: 80 },                          // Unicode 9
  table:      { kind: "shape", shape: "roundRect", w: 600, h: 24, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 12 },
  // plant-eaters
  cow:        { kind: "emoji", value: "🐄", size: 84 },
  rabbit:     { kind: "emoji", value: "🐰", size: 84 },
  horse:      { kind: "emoji", value: "🐎", size: 84 },
  sheep:      { kind: "emoji", value: "🐑", size: 84 },
  giraffe:    { kind: "emoji", value: "🦒", size: 84 },                          // Unicode 10
  elephant:   { kind: "emoji", value: "🐘", size: 84 },
  rhino:      { kind: "emoji", value: "🦏", size: 84 },                          // Unicode 9
  gorilla:    { kind: "emoji", value: "🦍", size: 84 },                          // Unicode 9
  koala:      { kind: "emoji", value: "🐨", size: 84 },
  panda:      { kind: "emoji", value: "🐼", size: 84 },
  zebra:      { kind: "emoji", value: "🦓", size: 84 },                          // Unicode 11
  deer:       { kind: "emoji", value: "🦌", size: 84 },                          // Unicode 9
  goat:       { kind: "emoji", value: "🐐", size: 84 },
  snail:      { kind: "emoji", value: "🐌", size: 84 },
  caterpillar:{ kind: "emoji", value: "🐛", size: 84 },
  camel:      { kind: "emoji", value: "🐪", size: 84 },
  // meat-eaters
  lion:       { kind: "emoji", value: "🦁", size: 84 },
  tiger:      { kind: "emoji", value: "🐅", size: 84 },
  shark:      { kind: "emoji", value: "🦈", size: 84 },                          // Unicode 9
  crocodile:  { kind: "emoji", value: "🐊", size: 84 },
  wolf:       { kind: "emoji", value: "🐺", size: 84 },
  eagle:      { kind: "emoji", value: "🦅", size: 84 },                          // Unicode 9
  cat:        { kind: "emoji", value: "🐱", size: 84 },
  owl:        { kind: "emoji", value: "🦉", size: 84 },                          // Unicode 9
  frog:       { kind: "emoji", value: "🐸", size: 84 },
  snake:      { kind: "emoji", value: "🐍", size: 84 },
  penguin:    { kind: "emoji", value: "🐧", size: 84 },
  dolphin:    { kind: "emoji", value: "🐬", size: 84 },
  spider:     { kind: "emoji", value: "🕷️", size: 84 },                          // Unicode 7
  lizard:     { kind: "emoji", value: "🦎", size: 84 },                          // Unicode 9
  // eat both
  bear:       { kind: "emoji", value: "🐻", size: 84 },
  pig:        { kind: "emoji", value: "🐷", size: 84 },
  hen:        { kind: "emoji", value: "🐔", size: 84 },
  monkey:     { kind: "emoji", value: "🐒", size: 84 },
  mouse:      { kind: "emoji", value: "🐭", size: 84 },
  duck:       { kind: "emoji", value: "🦆", size: 84 },                          // Unicode 9
  hedgehog:   { kind: "emoji", value: "🦔", size: 84 },                          // Unicode 10
  dog:        { kind: "emoji", value: "🐶", size: 84 },
  // foods eaten during the cue
  foodGrass:  { kind: "emoji", value: "🌾", size: 44 },
  foodLeaves: { kind: "emoji", value: "🍃", size: 44 },
  foodCarrot: { kind: "emoji", value: "🥕", size: 44 },
  foodBamboo: { kind: "emoji", value: "🎋", size: 44 },
  foodBanana: { kind: "emoji", value: "🍌", size: 44 },
  foodMeat:   { kind: "emoji", value: "🍖", size: 44 },
  foodFish:   { kind: "emoji", value: "🐟", size: 44 },
  foodBug:    { kind: "emoji", value: "🪲", size: 44, fallback: "🐜" },          // Unicode 13 → ant
  foodBerry:  { kind: "emoji", value: "🫐", size: 44, fallback: "🍇" },          // Unicode 13 → grapes
  foodSeeds:  { kind: "emoji", value: "🌰", size: 44 },
  // bins and rule icons
  bin:        { kind: "shape", shape: "roundRect", w: 200, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  plate:      { kind: "shape", shape: "ellipse", w: 80, h: 34, fill: "surface2", stroke: "inkSoft", strokeWidth: 2 },
  iconLeaf:   { kind: "emoji", value: "🌿", size: 36 },
  iconMeat:   { kind: "emoji", value: "🍖", size: 36 },
  binCount:   { kind: "text",  value: "0", size: 22, font: "display", color: "inkSoft" },
  // teeth / beak badges (drawn under the animal during a cue)
  badgeCard:  { kind: "shape", shape: "roundRect", w: 96, h: 40, fill: "bg", stroke: "structure", strokeWidth: 2, radius: 10 },
  teethFlat:  { kind: "shape", shape: "polygon", points: [[-36,-8],[36,-8],[36,8],[-36,8]], fill: "surface", stroke: "ink", strokeWidth: 2 },      // drawn with 5 vertical ink lines at x = −22, −11, 0, 11, 22: a row of flat teeth
  teethSharp: { kind: "shape", shape: "polygon", points: [[-36,-8],[-24,10],[-12,-8],[0,10],[12,-8],[24,10],[36,-8]], fill: "surface", stroke: "ink", strokeWidth: 2 },   // a row of points
  teethBoth:  { kind: "shape", shape: "polygon", points: [[-36,-8],[-26,10],[-16,-8],[-6,-8],[-6,8],[6,8],[6,-8],[16,-8],[26,10],[36,-8]], fill: "surface", stroke: "ink", strokeWidth: 2 },   // points at the sides, flat in the middle
  beakHook:   { kind: "shape", shape: "polygon", points: [[-16,-10],[10,-10],[18,0],[10,12],[2,4],[-16,4]], fill: "accent", stroke: "ink", strokeWidth: 2 },              // a hooked beak
  beakFish:   { kind: "shape", shape: "polygon", points: [[-18,-6],[18,-2],[18,2],[-18,6]], fill: "accent", stroke: "ink", strokeWidth: 2 },                             // a long straight beak
  beakFlat:   { kind: "shape", shape: "polygon", points: [[-14,-8],[14,-8],[18,0],[14,8],[-14,8],[-18,0]], fill: "accent", stroke: "ink", strokeWidth: 2 },              // a short wide beak
  showRing:   { kind: "shape", shape: "roundRect", w: 212, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Every emoji names one animal or food unambiguously in English (the key is the intended word). Two food glyphs are newer than Unicode 12 and carry fallbacks (bug → ant; blueberries → grapes). Colour-blind safety: the bins share fill and stroke and differ by the food icon on the plate and by position; the badges differ by outline shape (flat row / points / hook), never by colour alone.

## Animation registry
```js
const ANIM = {
  slideIn:   { x: 360, duration: 320, ease: "Sine.Out", trigger: "new animal from x = 760 to the table centre" },
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "animal selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "animal to bin / back to centre (x,y set at call)" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "bin receives a correct animal; bin plate preview tap" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "the food at (280,160) before it is eaten (from alpha 0, scale 0.6)" },
  munch:     { x: 340, scale: 0.3, alpha: 0, duration: 600, ease: "Sine.In", trigger: "the food glides into the animal's mouth and vanishes; for a both-eater the second food follows 300 ms after the first" },
  badgeShow: { alpha: 1, y: 226, duration: 220, ease: "Back.Out", yoyo: true, hold: 1200, trigger: "badgeCard + teeth/beak shape under the animal (from alpha 0, y 240), hold, then fade" },
  pulse:     { scale: 1.15, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 2, trigger: "the correct bin's plate icon(s) after the munch" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "showRing around the correct bin (from alpha 0.2)" },
  binsShift: { duration: 400, ease: "Sine.InOut", trigger: "the two bins move to x = 150 / 570 and shrink to 180 × 110 when the both bin appears at L3 (x set at call)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish fox" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]     ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28  "1 of 12" y=48  │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ fox(80,170)   food(280,160)→ [ animal (360,160) ]  enters→   │  zone A
      │              ═══════════ table y=200 ═══════════             │
      │                   [badge (360,226) during a cue]             │
260   ├──────────────────────────────────────────────────────────────┤
      │      ┌─────────────┐              ┌─────────────┐  bins y=390 │
      │      │   (leaf)    │              │   (meat)    │  x=230/490  │  zone B
      │      │      0      │              │      0      │  (200×120)  │
      │      └─────────────┘              └─────────────┘             │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
L3 three-bin layout: bins 180 × 110 at x = 150 / 360 / 570, y = 390 (gap 30); the both bin in the middle. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 12 × `ART.dotEmpty` at y = 28 (x = 239 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.fox` (80, 170); `ART.table` centred (390, 200).
- The animal: a `makeTile` 120 × 120 at (360, 160) with transparent fill and no stroke (fill and stroke passed as `THEME.colour.bg`); the animal's ART emoji is a child of the tile container at (0, 0). Selected look: `ANIM.lift` plus the library selected outline (`THEME.colour.structure`, 3 px) drawn as a rounded square around the emoji.
- Bins: `makeTile` with `ART.bin` tokens at (230, 390) and (490, 390) (L1-L2), or 180 × 110 at (150, 390) / (360, 390) / (570, 390) (L3). Each bin front: `ART.plate` at (0, −10) with its icon(s) centred on the plate — `ART.iconLeaf`, or `ART.iconMeat`, or both at (−24, −16) and (24, −16) on a plate drawn 120 wide; `ART.binCount` at (0, +40).
- Cue elements: the food glyph at (280, 160) → `ANIM.munch`; `ART.badgeCard` at (360, 226) with the badge shape centred on it. `ART.showRing` around the correct bin (scaled to the bin size + 12).
- Tap floors: animal tile 120, bins ≥ 180 × 110 (≥ 56). Gap between bins ≥ 30.
- Tab order: the animal tile, then the bins left to right.
- While a cue plays (≈ 1.8 s) the animal tile and all bins are `setEnabled(false)`.

## Content
Language-neutral (pictures only; the only text is the shared counter). Each item = (ART key; bin; food eaten in the cue; badge). Bins: P = plant-eater, M = meat-eater, B = both (L3 only). Food keys are `ART.foodGrass` / `ART.foodLeaves` / `ART.foodCarrot` / `ART.foodBamboo` / `ART.foodBanana` / `ART.foodMeat` / `ART.foodFish` / `ART.foodBug` / `ART.foodBerry` / `ART.foodSeeds`; badge keys `ART.teethFlat` / `ART.teethSharp` / `ART.teethBoth` / `ART.beakHook` / `ART.beakFish` / `ART.beakFlat`.

- **L1** (clear cases; the elephant is the one fierce-looking plant-eater): (`ART.cow`; P; grass; teethFlat) · (`ART.rabbit`; P; carrot; teethFlat) · (`ART.horse`; P; grass; teethFlat) · (`ART.sheep`; P; grass; teethFlat) · (`ART.giraffe`; P; leaves; teethFlat) · (`ART.elephant`; P; leaves; teethFlat) · (`ART.lion`; M; meat; teethSharp) · (`ART.tiger`; M; meat; teethSharp) · (`ART.shark`; M; fish; teethSharp) · (`ART.crocodile`; M; meat; teethSharp) · (`ART.wolf`; M; meat; teethSharp) · (`ART.eagle`; M; meat; beakHook)
- **L2** (the traps: fierce plant-eaters, cute hunters, hunting birds, small crawlers): (`ART.rhino`; P; grass; teethFlat) · (`ART.gorilla`; P; leaves; teethFlat) · (`ART.koala`; P; leaves; teethFlat) · (`ART.panda`; P; bamboo; teethFlat) · (`ART.zebra`; P; grass; teethFlat) · (`ART.deer`; P; leaves; teethFlat) · (`ART.goat`; P; grass; teethFlat) · (`ART.snail`; P; leaves; teethFlat) · (`ART.caterpillar`; P; leaves; teethFlat) · (`ART.camel`; P; grass; teethFlat) · (`ART.cat`; M; fish; teethSharp) · (`ART.owl`; M; meat; beakHook) · (`ART.frog`; M; bug; teethSharp) · (`ART.snake`; M; meat; teethSharp) · (`ART.penguin`; M; fish; beakFish) · (`ART.dolphin`; M; fish; teethSharp) · (`ART.spider`; M; bug; teethSharp) · (`ART.lizard`; M; bug; teethSharp)
- **L3** (three bins; both-eaters mixed with L2 animals): (`ART.bear`; B; berry then fish; teethBoth) · (`ART.pig`; B; carrot then meat; teethBoth) · (`ART.hen`; B; seeds then bug; beakFlat) · (`ART.monkey`; B; banana then bug; teethBoth) · (`ART.mouse`; B; seeds then bug; teethBoth) · (`ART.duck`; B; leaves then bug; beakFlat) · (`ART.hedgehog`; B; berry then bug; teethBoth) · (`ART.dog`; B; meat then carrot; teethBoth) · plus any four L2 animals drawn at random for the L3 stream

Play list of 12 per Rules (shuffle within level; levels in order; the first two items of a session are always one L1 plant-eater and one L1 meat-eater so success starts high — F-40); no animal repeats within a session; no more than two consecutive items for the same bin; the bin sides are fixed for the whole session; the both bin exists only while the current level is L3 (it `ANIM.binsShift`s in when L3 is reached and stays for the rest of the session even if the level eases, so the layout never flips back and forth).

## Rules
- Item count: 12.
- Difficulty progression: 3 consecutive first-try correct → next level (cap L3).
- Adaptation: a wrong bin, or wrong first-try on 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: animal glides into the bin, bin `ANIM.pop`, count +1, `tone("correct")`; praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]) on every third correct item and on the twelfth; rail dot fills; next animal slides in after 400 ms.
- What happens on a wrong answer (each begins with the animal gliding back and `tone("nudge")`):
  - A fierce-looking plant-eater (elephant, rhino, gorilla, camel, zebra) put in the meat bin: its plant food `ANIM.appear`s and `ANIM.munch`es into its mouth, `ART.teethFlat` `ANIM.badgeShow`s, the leaf bin's `ART.iconLeaf` `ANIM.pulse`s.
  - A cute or small hunter (cat, owl, frog, spider, lizard, snake) put in the leaf bin: its meat/fish/bug is eaten, `ART.teethSharp` (or `ART.beakHook` for the owl) shows, the meat bin's `ART.iconMeat` pulses.
  - A hunting bird (eagle, owl, penguin) put in the leaf bin: the beak badge (`ART.beakHook` / `ART.beakFish`) shows with the food eaten; the meat bin's icon pulses.
  - A both-eater (L3) put in the leaf or meat bin: two foods are eaten one after the other, `ART.teethBoth` (or `ART.beakFlat` for the hen and duck) shows, the both bin's two icons pulse together.
  - Any other animal in the wrong bin: its listed food is eaten with its listed badge; the correct bin's icon pulses.
- Retry behaviour: attempt 1 → attempt 2 after the cue → attempt 3 with `ART.showRing` on the correct bin; placing the animal there completes it as solved-with-help (no praise pop). No attempt 4.
- Finish condition: 12 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("question_x_of_y")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Animal Diets". No other text on the play screen (bin counts are numerals).

## Sound
`tone("tap")` on selecting an animal; `tone("correct")` on a correct bin; `tone("nudge")` on a wrong bin; `tone("tap", 3)` as each food is eaten during a cue (twice for a both-eater); `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken.

## Testing checklist
- [ ] Works in all 11 languages ("Question 1 of 12", All done, Play again, Menu, praise change with the picker; nothing else is text).
- [ ] Works at narrow width (400-px iframe: table, animal, three bins and the badge fully visible).
- [ ] Keyboard operable (Tab: the animal, then the bins left to right; Enter selects the animal / drops it in a bin).
- [ ] Never auto-starts.
- [ ] No losing state (wrong bins never end the session; the show-me ring always leads to completion).
- [ ] The first two animals of a session are one clear plant-eater and one clear meat-eater.
- [ ] Putting the elephant in the meat bin makes it glide back, a bundle of leaves slides into its mouth and disappears, a row of flat teeth shows under it, and the leaf plate pulses.
- [ ] Putting the cat in the leaf bin shows a fish being eaten and a row of pointed teeth; putting the owl there shows a hooked beak.
- [ ] The both bin appears in the middle only when the third level is reached, the outer bins slide apart to make room, and the layout never flips back.
- [ ] Putting the bear in the leaf bin shows a berry eaten, then a fish eaten, then the both-teeth badge, and both plates in the middle bin pulse.
- [ ] Bin sides do not swap during a session; bins have identical colours and differ only by their plate icons.
- [ ] Bin counts go up only on correct sorts; the finish screen shows the animals each bin received.
- [ ] If the beetle or blueberry glyph is missing on the device, an ant or grapes appears instead.
- [ ] With `?sound=off` nothing is audible.
