# 172 — Animal Homes

## Identity
- Slug: `animal-homes-build`
- Subject / topic: Science / animals and their shelters — nest, hive, pond, burrow, web, cave — as an observable fact about each animal
- Age band: `5-6`
- Interaction pattern: `P2` — tap to place (tap an animal, then tap a home), judged per placement
- Estimated build size: ~460 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14. Pattern contract: `catalogue/PATTERNS.md` P2 (immediate judgement per placement). Science scope per F-218: where an animal shelters is something a child can see in a garden or a picture book; nothing causal, no habitat vocabulary. Icon prompts only — nothing to read.

## Learning
- Objective: Places each of 2-3 pictured animals into the home it lives in (nest, hive, pond, burrow, web or cave) by tapping the animal and then the home.
- Prerequisites: None beyond tapping; the homes are pictures, the animals are pictures. Nothing is spoken; nothing needs reading.
- Curriculum links: F-23 (living things — needs of animals, common local species — in all 12 systems at 5-8), F-30 (science lives inside a world-knowledge subject at this age: HSU, Questionner le monde, ympäristöoppi, Conocimiento del Medio, natur/teknologi, naturfag), F-218, F-5 (near-zero game supply — the game covers the curriculum, not demand), F-31 row "Living/non-living; plant & animal needs" — conservative 7-8, earliest 5 → 5-6 for the shelter-matching form (US K-ESS3-1 "relationship between the needs of different plants or animals and the places they live"; England Y1-2 "habitats … how animals are suited"; Germany Sachunterricht Klasse 1 "Tiere und ihre Lebensräume"; France GS/CP "les animaux et leur milieu"; Spain Infantil; Brazil EI03ET03; Sweden förskoleklass "djur och natur"; Finland esiopetus ympäristöoppi).
- Common misconceptions (F-133, F-131), each with this game's response:
  1. **"It flies, so it lives in a nest" (a bat put in the nest; a bee put in the nest).** Response: the animal glides back and enacts its own habit — the bat turns upside down and hangs (`ANIM.hang`), the bee buzzes in a tight circle (`ANIM.buzz`) — the cue is what the animal DOES, not what it resembles; the home tiles do not pulse until the show-me step.
  2. **"It is in the water, so it is a fish / everything wet goes together" (the frog put in the hive because the pond is "for the fish").** Response: L2 and L3 put a frog and a fish together with the pond present only once — both belong there; a refused frog hops in place (`ANIM.hop`) and then swims (`ANIM.swim`).
  3. **"Only big furry animals are animals — a spider has no home" (the spider put in the burrow or the nest).** Response: the spider drops on a thread (`ART.thread` + `ANIM.dangle`) when refused — its own way of living, which only the web fits.
  4. **Matching by where the tile happens to sit (the left animal into the left home).** Response: home order and animal order are shuffled independently per item; the correct home is never directly above its animal on two consecutive items.

## How it plays
1. **Start screen**: title "Animal Homes", the hedgehog host (`ART.hedgehog`) at (360, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: nest + pond; bird + fish)**: rail of 8 dots (§6) at y = 28. Zone A: two home tiles (`ART.homeTile`, 130 × 110, `makeTile`) at y = 170, x = 250 and 470, one drawn with `ART.nest` (size 72) at its centre and one with the pond (`ART.pond` ellipse with `ART.pondWave` on it); `ART.hedgehog` sits at (80, 170). Zone B: two animal tiles (`ART.animalTile`, 100 × 100, `makeTile`) at y = 390, x = 250 and 470, showing `ART.bird` and `ART.fish` at size 72, in shuffled order. Zone C: empty. No caption — nothing to read.
3. **Placing**: the child taps an animal (it lifts: `api.setSelected(true)`, `ANIM.lift`, `tone("tap")`), then taps a home. The animal glides (`ANIM.glide`) to the home.
   - **Right home**: the animal settles inside the home tile (drawn at size 48 at the tile's (0, +14)), the home `ANIM.pop`s, `tone("correct")`; the animal tile in zone B empties (alpha 0.35, disabled). When every animal of the item is home: praise pop (next key in rotation), the hedgehog `ANIM.nod`s, the rail dot fills, and after 900 ms the next item builds (`ANIM.appear`).
   - **Wrong home**: the animal glides back to its tile with `tone("nudge")`, then enacts its habit cue (Rules: fly / buzz / swim / hop / dig / dangle / hang / sleep) for ≈ 1.2 s with all tiles disabled; the tapped home shows no mark. Attempt 2 for this animal.
   - **A home that already holds an animal**: the arriving animal springs back (`ANIM.nudge`), no message, no attempt counted (F-61).
   - **Tapping a placed animal inside a home**: it returns to its tile (undo, free).
   - **Second wrong home for the same animal**: the cue again, then that animal's correct home gains the show-me ring (`ART.showRing`, `ANIM.showMe`); placing it there completes the placement as solved-with-help.
4. **A full worked session**: item 1 bird → nest ✓, fish → pond ✓ · item 2 (L1) bee → burrow ✗ (buzz cue) → hive ✓ (retried), rabbit → burrow ✓ · item 3 (L1) bird → nest ✓, fox → burrow ✓ · item 4 (L1) frog → pond ✓, bee → hive ✓ → step up · item 5 (L2) bird ✓, fish ✓, rabbit ✓ · item 6 (L2) spider → burrow ✗ (dangle cue) → web ✓, bee ✓, frog ✓ · item 7 (L2) owl ✓, spider ✓, fox ✓ → step up · item 8 (L3) bird → nest ✓, bat → nest ✗ (refused: nest is full → springs back, not an attempt) → bat → pond ✗ (hang cue) → cave ✓, frog → pond ✓ → Finish.
5. **Finish**: `t("all_done")` (360, 110); the hedgehog (360, 200) `ANIM.celebrate`; the summary = the six homes in a row at y = 400 (x = 110 + i × 100, drawn at size 48: `ART.nest`, hive, pond, burrow, `ART.web`, cave) each with the animals it received during the session drawn above it at size 28 (up to three, stacked 30 px apart) — the visual summary; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  hedgehog:   { kind: "emoji", value: "🦔", size: 80 },                          // Unicode 10
  homeTile:   { kind: "shape", shape: "roundRect", w: 130, h: 110, fill: "surface", stroke: "line", strokeWidth: 2, radius: 16 },
  animalTile: { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  // homes
  nest:       { kind: "emoji", value: "🪹", size: 72, fallback: "🧺" },          // Unicode 13 → basket
  hive:       { kind: "shape", shape: "roundRect", w: 72, h: 64, fill: "surface2", stroke: "structure", strokeWidth: 3, radius: 30 },   // three hairline bands (line token) across it, 16 px apart
  hiveDoor:   { kind: "shape", shape: "circle", r: 8, fill: "ink" },              // at the hive's (0, +18)
  pond:       { kind: "shape", shape: "ellipse", w: 96, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 3 },
  pondWave:   { kind: "emoji", value: "🌊", size: 28 },                           // drawn on the pond at (0, −4)
  burrow:     { kind: "shape", shape: "polygon", points: [[-46,24],[-30,-14],[0,-26],[30,-14],[46,24]], fill: "surface2", stroke: "structure", strokeWidth: 3 },
  burrowHole: { kind: "shape", shape: "ellipse", w: 34, h: 24, fill: "ink" },      // at the burrow's (0, +8)
  web:        { kind: "emoji", value: "🕸️", size: 72 },                          // Unicode 7
  cave:       { kind: "shape", shape: "polygon", points: [[-48,28],[-40,-10],[-18,-30],[18,-30],[40,-10],[48,28]], fill: "surface2", stroke: "structure", strokeWidth: 3 },
  caveDark:   { kind: "shape", shape: "polygon", points: [[-22,28],[-18,0],[0,-10],[18,0],[22,28]], fill: "ink" },
  // animals
  bird:       { kind: "emoji", value: "🐦", size: 72 },
  owl:        { kind: "emoji", value: "🦉", size: 72 },                            // Unicode 9
  bee:        { kind: "emoji", value: "🐝", size: 72 },
  fish:       { kind: "emoji", value: "🐟", size: 72 },
  frog:       { kind: "emoji", value: "🐸", size: 72 },
  rabbit:     { kind: "emoji", value: "🐰", size: 72 },
  fox:        { kind: "emoji", value: "🦊", size: 72 },                            // Unicode 9
  spider:     { kind: "emoji", value: "🕷️", size: 72 },                           // Unicode 7
  bear:       { kind: "emoji", value: "🐻", size: 72 },
  bat:        { kind: "emoji", value: "🦇", size: 72 },                            // Unicode 9
  // cues
  thread:     { kind: "shape", shape: "line", w: 2, stroke: "inkSoft", strokeWidth: 2 },   // vertical, from the tile top down to the dangling spider; length set at runtime (max 60)
  zz:         { kind: "text",  value: "z", size: 22, font: "display", color: "inkSoft" },   // rises from a sleeping bear
  showRing:   { kind: "shape", shape: "roundRect", w: 142, h: 122, stroke: "structure", strokeWidth: 4, radius: 20 },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The hive, pond, burrow and cave are drawn shapes because no emoji shows them unambiguously; the art upgrade replaces them with SVG in one entry each. Colour-blind safety: homes differ by geometry (a rounded stack, an ellipse, a mound with a hole, an arch with a dark inside, a nest, a web), never by colour; all home tiles share one fill.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "animal selected" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "animal to a home / back to its tile (x,y set at call)" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "refused placement into a full home" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "home receiving its animal" },
  fly:       { y: "-=40", angle: 10, duration: 260, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "bird / owl after a wrong home: rises and tilts twice" },
  buzz:      { x: "+=14", y: "-=14", duration: 90, ease: "Sine.InOut", yoyo: true, repeat: 5, trigger: "bee after a wrong home: quick tight zig-zag" },
  swim:      { x: "+=30", scaleX: -1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "fish / frog after a wrong home: glides sideways and turns" },
  hop:       { y: "-=36", duration: 140, ease: "Sine.Out", yoyo: true, repeat: 1, trigger: "frog before its swim cue" },
  dig:       { y: "+=28", angle: -12, duration: 220, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "rabbit / fox after a wrong home: ducks down twice as if digging" },
  dangle:    { y: "+=60", duration: 500, ease: "Bounce.Out", yoyo: true, hold: 300, trigger: "spider after a wrong home: drops on ART.thread, then climbs back" },
  hang:      { angle: 180, duration: 400, ease: "Sine.InOut", yoyo: true, hold: 500, trigger: "bat after a wrong home: turns upside down, holds, turns back" },
  sleep:     { scale: 1.06, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "bear after a wrong home: slow breathing; ART.zz rises with ANIM.rise" },
  rise:      { y: "-=40", alpha: 0, duration: 700, ease: "Sine.In", trigger: "ART.zz floating up from the bear" },
  nod:       { angle: 10, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "hedgehog when an item completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new item (from alpha 0, scale 0.6)" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ring around the correct home (from alpha 0.2)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish hedgehog" }
};
```
`buzz` repeats 5 × 90 ms = a 1.1 s zig-zag; nothing toggles visibility, so the no-flash rule holds.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]            ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │ hedgehog    ┌────────┐    ┌────────┐    ┌────────┐             │
      │ (80,170)    │  home  │    │  home  │    │  home  │  y=170     │  zone A
      │             └────────┘    └────────┘    └────────┘  130×110   │
      │             x=180          x=360          x=540  (3 homes)    │
260   ├──────────────────────────────────────────────────────────────┤
      │             ┌──────┐      ┌──────┐      ┌──────┐               │
      │             │animal│      │animal│      │animal│   y=390      │  zone B
      │             └──────┘      └──────┘      └──────┘   100×100    │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Two-home items use x = 250 / 470 for both rows. Fixed layout, FIT scaling.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 8 × `ART.dotEmpty` at y = 28 (x = 283 + i × 22) → `ART.dotFull`.
- `ART.hedgehog` at (80, 170).
- Home tiles: `makeTile` 130 × 110 with `ART.homeTile` tokens; the home art centred at (0, −6): `ART.nest` (emoji), `ART.hive` + `ART.hiveDoor`, `ART.pond` + `ART.pondWave`, `ART.burrow` + `ART.burrowHole`, `ART.web` (emoji), `ART.cave` + `ART.caveDark`. A placed animal is drawn at size 48 at the tile's (0, +14), in front of the home art.
- Animal tiles: `makeTile` 100 × 100 with `ART.animalTile` tokens; the animal emoji centred at size 72. Selected look = library outline + `ANIM.lift`. An emptied tile stays at alpha 0.35 and disabled.
- Cue drawing: `ART.thread` from the spider tile's top-centre down to the spider during `ANIM.dangle`; `ART.zz` starts at the bear's (+24, −30) and rises.
- `ART.showRing` around the correct home during show-me.
- Tap floors: animal tiles 100, home tiles 130 × 110 (≥ 80). Gaps: 80 (two-tile rows), 50 (three-tile rows).
- Tab order: animal tiles left to right, then home tiles left to right.
- During a cue (≈ 1.2-1.5 s) every tile is `setEnabled(false)`.
- Text budget (5-6): zero words on the play screen.

## Content
Language-neutral (pictures only). Each item = (homes; animals; cue class per animal). Home words map to ART: nest `ART.nest`, hive `ART.hive`, pond `ART.pond`, burrow `ART.burrow`, web `ART.web`, cave `ART.cave`. Animals: bird `ART.bird`, owl `ART.owl`, bee `ART.bee`, fish `ART.fish`, frog `ART.frog`, rabbit `ART.rabbit`, fox `ART.fox`, spider `ART.spider`, bear `ART.bear`, bat `ART.bat`. Homes per animal: bird/owl → nest; bee → hive; fish/frog → pond; rabbit/fox → burrow; spider → web; bear/bat → cave.

- **L1** (2 homes, 2 animals; clear cases): (nest, pond; bird, fish) · (hive, burrow; bee, rabbit) · (nest, burrow; bird, fox) · (pond, hive; frog, bee)
- **L2** (3 homes, 3 animals): (nest, pond, burrow; bird, fish, rabbit) · (hive, web, pond; bee, spider, frog) · (nest, web, burrow; owl, spider, fox) · (pond, hive, burrow; fish, bee, rabbit)
- **L3** (3 homes, 3 animals, one deliberate trap per item — F-133): (nest, cave, pond; bird, **bat**, frog) · (cave, burrow, web; **bear**, fox, spider) · (nest, pond, cave; owl, fish, **bat**) · (hive, cave, pond; bee, **bear**, frog)

Cue class per animal (Rules): bird, owl → fly; bee → buzz; fish → swim; frog → hop then swim; rabbit, fox → dig; spider → dangle; bat → hang; bear → sleep.

Play list of 8 per Rules (shuffle within level; levels in order); home order and animal order shuffled independently per item; the correct home is never directly above its animal on two consecutive items; no item repeats within a session.

## Rules
- Item count: 8 (an item = all its animals placed).
- Difficulty progression: 2 consecutive items with every placement first-try → next level (cap L3).
- Adaptation: 2 wrong placements within one item, or a wrong placement in each of 2 consecutive items → next item one level down (floor L1).
- What happens on a correct answer: the animal settles in its home, home `ANIM.pop`, `tone("correct")`; when the item's last animal is home: praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] (items with no wrong placement only), hedgehog `ANIM.nod`, rail dot fills, next item after 900 ms.
- What happens on a wrong answer (each begins with the animal gliding back and `tone("nudge")`):
  - Bird or owl in a non-nest home: `ANIM.fly`.
  - Bat in the nest or anywhere but the cave ("it flies so it is a bird"): `ANIM.hang` — it hangs upside down.
  - Bee in a non-hive home: `ANIM.buzz`.
  - Fish or frog in a non-pond home ("wet things go elsewhere" / "the pond is only for fish"): fish `ANIM.swim`; frog `ANIM.hop` then `ANIM.swim`.
  - Rabbit or fox in a non-burrow home: `ANIM.dig`.
  - Spider in a non-web home ("a spider has no home"): `ART.thread` + `ANIM.dangle`.
  - Bear in a non-cave home: `ANIM.sleep` with `ART.zz` rising.
  - Any animal into a home that is already occupied: refused, springs back, no message, not an attempt.
- Retry behaviour: per animal — attempt 1 unaided → attempt 2 after the habit cue → attempt 3 with `ART.showRing` on that animal's home; placing it there is solved-with-help. Undo (tapping a placed animal) is free. No attempt 4.
- Finish condition: 8 items. No losing state; no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Animal Homes". No words on the play screen.

## Sound
`tone("tap")` on selecting an animal; `tone("correct")` when an animal settles in its home; `tone("nudge")` on a wrong home; `tone("tap", 3)` on each buzz zig and `tone("tap", 1)` on each dig; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; no animal sounds are simulated.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; the play screen has no words).
- [ ] Works at narrow width (400-px iframe: three home tiles and three animal tiles fully visible and separate).
- [ ] Keyboard operable (Tab: animals left to right, then homes left to right; Enter selects / places / undoes).
- [ ] Never auto-starts.
- [ ] No losing state (wrong homes never end the session; the ring always leads to completion).
- [ ] Tapping an animal then a home moves the animal into the home; tapping it there sends it back.
- [ ] A second animal sent to an occupied home springs back with no message.
- [ ] The bee put in the nest zig-zags in place, then waits; the spider put in the burrow drops on a thread and climbs back.
- [ ] The bat put in the nest turns upside down and back; after a second wrong home the cave gains a pulsing ring.
- [ ] Home order and animal order are shuffled; the right home is not always above its animal.
- [ ] Two clean items in a row bring three homes; two wrong placements in one item bring two homes next.
- [ ] The finish screen shows the six homes with the animals each received and no score.
- [ ] If the nest emoji is missing on the device a basket appears in its place.
- [ ] With `?sound=off` nothing is audible.
