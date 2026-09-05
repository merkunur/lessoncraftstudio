# 103 — Float or Sink

## Identity
- Slug: `float-or-sink`
- Subject / topic: Science / predicting whether an everyday object floats or sinks in water, then watching it happen
- Age band: `6-8`
- Interaction pattern: `P10` — predict then reveal (the prediction is a P1 tap on one of two tiles; the reveal drops the object into the tank)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P10. Science rule (F-218, F-136): the truth is always ENACTED — the object drops and either bobs at the water line or settles on the tank floor. No density, no "why"; the child collects observations and the level design puts the misconceptions (big sinks, metal sinks) to the test.

## Learning
- Objective: Predicts, before the drop, whether a shown object will float or sink, and then observes the enacted result.
- Prerequisites: None beyond tapping. The two answer tiles are icons (an object above the water line / an object on the tank floor); no reading is needed. The optional caption is for readers.
- Curriculum links: F-23 (materials by observable property in 11 of 12 systems; floating/sinking is the classic property test), F-30 (world-knowledge subjects 5-8), F-31 row "Materials by property" — conservative 8, earliest 5 → 6-8 (England Y1/Y2 materials "suitability … properties"; US 2-PS1-1/2 "test … properties"; Germany HSU "schwimmen und sinken" — a named Klasse 1-2 unit in most Länder; France cycle 2 "flotte / coule"; Netherlands kerndoel 42; Spain "flotabilidad" primer ciclo; Brazil EF02CI01; Sweden åk 1-3 "flyta och sjunka"; Denmark natur/teknologi; Norway naturfag 1-2 "utforske"; Finland ympäristöoppi tutkiminen). F-218.
- Common misconceptions (F-136, F-103), each with this game's response:
  1. **Big or heavy things sink; small or light things float.** Response: L2 pairs a big floater with a small sinker in consecutive items (the log floats; the coin sinks; the coconut floats; the grape sinks). After a wrong prediction the reveal plays and `ART.sizeGlyph` (a small "big/small" scale bar under the object) appears for 900 ms alongside the enacted truth — the size did not decide.
  2. **Metal always sinks (material as the whole story).** Response: L3 shows the SAME material in two shapes: the metal spoon sinks, the metal bowl floats; the clay ball sinks, the clay boat floats. The reveal shows the boat/bowl riding the line with the water drawn INSIDE its rim (`ART.rimWater`) — the observation the child needs, without a word about displacement.
  3. **Fruit and living things "always float" / "always sink".** Response: L2 mixes apple and lemon (float) with grape, potato and carrot (sink) so no category rule survives the reveals.
  4. **The prediction is a guess to get over with (the arcade reflex).** Response: the reveal is the same warm animation for a right or a wrong prediction; a wrong prediction re-queues the same object later in the session (F-41) so the observation is retrieved, not just watched.

## How it plays
1. **Start screen**: title "Float or Sink", the otter (`ART.otter`) at (360, 200), Start, picker.
2. **Item 1 (L1: apple)**: rail of 10 dots (§6; `t("question_x_of_y")` at (360, 48), 18 px `THEME.colour.inkSoft`). Zone A: the tank (`ART.tank`, 320 × 190) centred at (360, 170); water (`ART.water`) fills its lower 120 px with the water line (`ART.waterLine`) at y = 135 and two ripple marks (`ART.ripple`) on it; the tank floor is the tank's bottom edge at y = 255. The object (`ART.objApple`, 56 px) hangs above the tank at (360, 84) on a short line (`ART.hook`). The otter sits at the tank's left (140, 200). Zone B: two prediction tiles (`makeTile` 160 × 120) at y = 380, x = 250 / 470: `ART.tileFloat` (a tile showing a small water line with a dot ON it — `ART.iconFloat`) and `ART.tileSink` (the same line with the dot at the tile's bottom — `ART.iconSink`); their left/right order is shuffled per item. Caption `S("floatOrSink")` ("Float or sink?") at (360, 296), 24 px `THEME.colour.inkSoft`.
3. **Predicting**: the child taps a tile. It selects (`api.setSelected`, `ANIM.lift`, `tone("tap")`); tapping the other switches; there is no separate Check — 600 ms after the last tap with no further tap, the reveal begins (both tiles `setEnabled(false)` for the reveal).
4. **Reveal**: the hook releases (`ART.hook` fades, `ANIM.hookOff`), the object drops (`ANIM.drop`) to the water line; a splash (`ART.splash`, two short arcs) `ANIM.splash`es at the line; then the truth:
   - **Floats**: the object settles at the line (its centre 10 px above y = 135) and bobs (`ANIM.bob`, ±4 px, twice); the ripples widen (`ANIM.rippleOut`).
   - **Sinks**: the object continues down (`ANIM.sinkDown`, 700 ms, slower than the drop) to the floor (centre at y = 228) and settles with `ANIM.settle`; a trail of three bubbles (`ART.bubble`) rises (`ANIM.bubbleUp`).
   - **Prediction correct**: the chosen tile `ANIM.pop`, `tone("correct")`, praise pop (rotation), the object's small copy is added to the summary shelf at the tank's right (`ART.shelfFloat` row at y = 100 or `ART.shelfSink` row at y = 240, x from 560, 28 px, spaced 30) — the growing record; rail dot fills; after 900 ms the next object `ANIM.appear`s on the hook.
   - **Prediction wrong**: `tone("nudge")` once the object has settled (never before — the reveal is the feedback); the correct tile gains a soft outline (`ART.hintRing`, `ANIM.showMe`) for 1200 ms while the enacted state stays on screen; the misconception glyph appears where the Rules say (size bar / rim water); then the object still goes to the correct shelf row (the truth is recorded); the item counts as not first-try and RE-QUEUES: the same object returns after 2 intervening items (F-41). No second guess on the same drop — the truth has already been shown; the retrieval happens when the object comes back.
   - **Re-queued item wrong again**: same reveal; the object is not queued a third time; the item counts as solved-with-help.
5. **Items 2-10**: per Content and Rules. L1 clear cases; L2 size/weight traps in adjacent pairs; L3 shape traps (the same material twice).
6. **Finish**: `t("all_done")` (360, 110); the otter (360, 200) `ANIM.celebrate`; the summary = the tank at (360, 330) (scaled 0.8) with every floater drawn along its water line and every sinker along its floor (the two shelves poured into the tank, 28 px each, spaced 30 from x = 250) — the session's observations in one picture; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 5-6 minutes.

## Art registry
```js
const ART = {
  otter:      { kind: "emoji", value: "🦦", size: 80, fallback: "🐻" },    // Unicode 12 otter; fallback for older devices
  objApple:   { kind: "emoji", value: "🍎", size: 56 },
  objLog:     { kind: "emoji", value: "🪵", size: 56, fallback: "🥢" },   // Unicode 13 → chopsticks (wood) fallback
  objLeaf:    { kind: "emoji", value: "🍃", size: 56 },
  objDuck:    { kind: "emoji", value: "🦆", size: 56 },                    // a toy duck
  objBall:    { kind: "emoji", value: "🎾", size: 56 },
  objCork:    { kind: "emoji", value: "🍾", size: 56 },                    // the cork; read as "bottle top" — a cork floats
  objCoconut: { kind: "emoji", value: "🥥", size: 56 },
  objLemon:   { kind: "emoji", value: "🍋", size: 56 },
  objIce:     { kind: "emoji", value: "🧊", size: 56 },
  objBottle:  { kind: "emoji", value: "🧴", size: 56 },                    // capped plastic bottle
  objStone:   { kind: "emoji", value: "🪨", size: 56, fallback: "🧱" },   // Unicode 13 → brick fallback
  objKey:     { kind: "emoji", value: "🔑", size: 56 },
  objCoin:    { kind: "emoji", value: "🪙", size: 56, fallback: "🔩" },   // Unicode 13 → bolt fallback
  objGrape:   { kind: "emoji", value: "🍇", size: 56 },
  objPotato:  { kind: "emoji", value: "🥔", size: 56 },
  objCarrot:  { kind: "emoji", value: "🥕", size: 56 },
  objBolt:    { kind: "emoji", value: "🔩", size: 56 },
  objAnchor:  { kind: "emoji", value: "⚓", size: 56 },
  objSpoon:   { kind: "emoji", value: "🥄", size: 56 },                    // metal spoon
  objBowl:    { kind: "emoji", value: "🥣", size: 56 },                    // metal bowl (empty)
  objClayBall:{ kind: "shape", shape: "circle", r: 26, fill: "inkSoft", stroke: "ink", strokeWidth: 2 },
  objClayBoat:{ kind: "shape", shape: "polygon", points: [[-34,-10],[34,-10],[22,14],[-22,14]], fill: "inkSoft", stroke: "ink", strokeWidth: 2 },
  tank:       { kind: "shape", shape: "roundRect", w: 320, h: 190, fill: "surface", stroke: "structure", strokeWidth: 4, radius: 10 },
  water:      { kind: "shape", shape: "rect", w: 312, h: 120, fill: "structureSoft" },
  waterLine:  { kind: "shape", shape: "line", w: 312, stroke: "structure", strokeWidth: 3 },
  ripple:     { kind: "shape", shape: "ellipse", w: 40, h: 8, stroke: "structure", strokeWidth: 2 },
  rimWater:   { kind: "shape", shape: "rect", w: 40, h: 6, fill: "structureSoft" },      // drawn inside a floating boat/bowl rim
  hook:       { kind: "shape", shape: "line", w: 2, stroke: "inkSoft", strokeWidth: 2 },  // vertical, 30 px, above the hanging object
  splash:     { kind: "shape", shape: "arc", r: 22, stroke: "structure", strokeWidth: 3 },   // two arcs, 200°-250° and 290°-340°, either side of the entry point
  bubble:     { kind: "shape", shape: "circle", r: 5, stroke: "structure", strokeWidth: 2 },
  sizeGlyph:  { kind: "shape", shape: "rect", w: 80, h: 8, fill: "accent" },               // a bar as long as the object is "big": 80 for big items, 32 for small ones (Content)
  tileFloat:  { kind: "shape", shape: "roundRect", w: 160, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  tileSink:   { kind: "shape", shape: "roundRect", w: 160, h: 120, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  iconFloat:  { kind: "shape", shape: "circle", r: 14, fill: "structure" },   // drawn ON a 100-px line at (0,−6) inside tileFloat: dot centre 10 px above the line
  iconSink:   { kind: "shape", shape: "circle", r: 14, fill: "structure" },   // drawn at (0,+40) inside tileSink, under a 100-px line at (0,−20)
  iconLine:   { kind: "shape", shape: "line", w: 100, stroke: "structure", strokeWidth: 3 },
  hintRing:   { kind: "shape", shape: "roundRect", w: 172, h: 132, stroke: "structure", strokeWidth: 4, radius: 18 },
  shelfFloat: { kind: "shape", shape: "rect", w: 120, h: 3, fill: "structure" },   // the summary shelf lines at the tank's right
  shelfSink:  { kind: "shape", shape: "rect", w: 120, h: 3, fill: "inkSoft" },
  dotEmpty:   { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:    { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
The two prediction tiles differ by the DOT'S POSITION relative to the line (on it / under it), never by colour.

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.04, duration: 120, ease: "Sine.Out", trigger: "prediction tile selected" },
  hookOff:   { alpha: 0, duration: 150, ease: "Sine.In", trigger: "hook releases" },
  drop:      { y: 125, duration: 380, ease: "Quad.In", trigger: "object falls from (360,84) to the water line (centre y = 125)" },
  splash:    { alpha: 1, scale: 1.4, duration: 220, ease: "Sine.Out", yoyo: true, trigger: "splash arcs at the entry point (from alpha 0, scale 0.6)" },
  bob:       { y: "+=4", duration: 350, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "floating object at the line" },
  rippleOut: { scaleX: 1.6, alpha: 0.3, duration: 500, ease: "Sine.Out", yoyo: true, trigger: "ripples on a float" },
  sinkDown:  { y: 228, duration: 700, ease: "Sine.In", trigger: "object continues to the tank floor" },
  settle:    { scale: 1.0, duration: 120, ease: "Sine.Out", trigger: "object lands on the floor (from scale 0.96)" },
  bubbleUp:  { y: "-=80", alpha: 0, duration: 900, ease: "Sine.Out", trigger: "three bubbles from the sinking object, started 150 ms apart" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "correct prediction tile" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct tile after a wrong prediction (from alpha 0.2); stopped after 1200 ms" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "next object on the hook; size glyph (from alpha 0, scale 0.6)" },
  toShelf:   { duration: 400, ease: "Sine.InOut", trigger: "a 28-px copy of the object glides to its shelf row (x,y at call)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish otter" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]        ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28; "2 of 10" y=48   │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                       │ hook                                  │
      │                      obj (360,84)         shelfFloat (620,100)│
      │  otter   ┌────────── ART.tank (360,170) ──────────┐           │  zone A
      │ (140,200)│ ~~~~~~~~~ waterLine y=135 ~~~~~~~~~~~~~ │           │
      │          │           water                         │ shelfSink │
      │          └───────────── floor y=255 ───────────────┘ (620,240) │
260   ├──────────────────────────────────────────────────────────────┤
      │                  "Float or sink?" (360,296)                    │
      │      ┌────────────┐              ┌────────────┐   tiles y=380  │  zone B
      │      │  ── • ──   │              │  ───────   │   x=250/470    │
      │      │            │              │     •      │   (160×120)    │
      │      └────────────┘              └────────────┘                │
480   ├──────────────────────────────────────────────────────────────┤
      │                                                              │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The shelves at x = 560-680 sit beside the tank inside zone A.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` (x = 261 + i × 22) → `ART.dotFull`; `t("question_x_of_y")` at (360, 48).
- `ART.otter` (140, 200). `ART.tank` centred (360, 170); `ART.water` centred (360, 195) (top edge y = 135); `ART.waterLine` at y = 135; two `ART.ripple` at (300, 135) and (420, 135).
- The object: the item's ART entry centred (360, 84) with `ART.hook` from (360, 54) to (360, 69). Float rest position centre y = 125; sink rest position centre y = 228 (the floor is y = 255, the object's lower edge sits on it). `ART.rimWater` drawn at the boat/bowl's centre (0, +2) when they float. `ART.splash` arcs at (340, 135) and (380, 135). `ART.bubble` ×3 start at the object's (−12, −10), (0, −18), (+12, −10).
- `ART.sizeGlyph` under the object's rest position (+0, +40), width 80 or 32 per Content.
- Prediction tiles: `makeTile` 160 × 120 with `ART.tileFloat` / `ART.tileSink` tokens; inside: `ART.iconLine` and `ART.iconFloat` (dot on the line) or `ART.iconSink` (dot 60 px below the line). `ART.hintRing` behind the correct tile after a wrong prediction.
- Shelves: `ART.shelfFloat` at (620, 100) and `ART.shelfSink` at (620, 240); object copies at 28 px along them from x = 572, spaced 30 (a shelf holds up to 5; a 6th starts a second row 26 px lower).
- Tap floors 160 × 120 (≥ 56). Gap between tiles 60. Tab order: float tile, sink tile (creation order follows the shuffled left/right layout).

## Content
Language-neutral (pictures and two icons; the caption is the only word string). Items = (object ART key; truth; size glyph width).

- **L1** (clear cases): (`ART.objApple`; float; 32) · (`ART.objStone`; sink; 32) · (`ART.objDuck`; float; 32) · (`ART.objKey`; sink; 32) · (`ART.objBall`; float; 32) · (`ART.objBolt`; sink; 32) · (`ART.objLeaf`; float; 32) · (`ART.objAnchor`; sink; 80)
- **L2** (size/weight traps, played as adjacent pairs — the play list draws a pair together): (`ART.objLog`; float; 80) then (`ART.objCoin`; sink; 32) · (`ART.objCoconut`; float; 80) then (`ART.objGrape`; sink; 32) · (`ART.objBottle`; float; 80) then (`ART.objPotato`; sink; 32) · (`ART.objIce`; float; 32) then (`ART.objCarrot`; sink; 32) · (`ART.objLemon`; float; 32) then (`ART.objCork`; float; 32)
- **L3** (same material, different shape — adjacent pairs): (`ART.objSpoon`; sink; 32) then (`ART.objBowl`; float; 80) · (`ART.objClayBall`; sink; 32) then (`ART.objClayBoat`; float; 80) · (`ART.objBowl`; float; 80) then (`ART.objSpoon`; sink; 32) · (`ART.objClayBoat`; float; 80) then (`ART.objClayBall`; sink; 32)

Floaters at rest: centre y = 125, bob ±4. Sinkers at rest: centre y = 228. `ART.rimWater` is drawn only for `ART.objBowl` and `ART.objClayBoat` when floating.

Play list: 10 items per Rules; L2/L3 pairs are drawn as a unit and played consecutively (their order within the pair is as listed); a wrong first prediction re-queues the object after 2 intervening items (replacing the last unplayed item of the same level); the correct tile's side is shuffled per item and never the same side more than 3 times running.

## Rules
- Item count: 10 (including re-queued repeats, which replace unplayed items).
- Difficulty progression: 3 consecutive first-try correct predictions → next level (cap L3).
- Adaptation: wrong first predictions on 2 consecutive items → next item one level down (floor L1). A single miss re-queues the object without changing level.
- What happens on a correct answer: reveal (drop, splash, float-and-bob or sink-and-bubble), `ANIM.pop`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] on every first-try correct item, the object's copy glides to its shelf (`ANIM.toShelf`), rail dot, next object after 900 ms.
- What happens on a wrong answer (per anticipated mistake):
  - Big/heavy predicted to sink but it floats (or small predicted to float but it sinks): full reveal, then `ART.sizeGlyph` appears under the settled object for 900 ms and `ART.hintRing` pulses on the correct tile; `tone("nudge")`; the object re-queues.
  - Metal / clay shape trap (L3): full reveal with `ART.rimWater` inside the floating bowl/boat; hint ring; re-queue.
  - Category rule (fruit floats / sinks): full reveal; hint ring; re-queue.
  - No tile tapped for 8 s: the two tiles `ANIM.lift` in turn once (an inactivity cue, never a clock); nothing else.
- Retry behaviour: the truth is shown once per drop; the retrieval retry is the re-queue (after 2 items); a second miss on the same object counts as solved-with-help and is not queued again. No item is ever left unsolved: every object reaches a shelf.
- Finish condition: 10 items. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("question_x_of_y")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Float or Sink"; `floatOrSink` = "Float or sink?".

## Sound
`tone("tap")` on selecting a tile; `tone("tap", 4)` on the splash; `tone("tap", 7)` when an object settles floating and `tone("tap", -3)` when it lands on the floor (a higher note for up, a lower for down — the tank shows the same); `tone("correct")` on a correct prediction; `tone("nudge")` after a wrong one (after the reveal); `tone("finish")` once. Silent under `?sound=off`.

## Testing checklist
- [ ] Works in all 11 languages (Question 2 of 10, All done, Play again, Menu, praise change; "Float or sink?" changes once translated).
- [ ] Works at narrow width (400-px iframe: tank, shelves and both tiles fully visible).
- [ ] Keyboard operable (Tab between the two tiles; Enter selects; the drop starts by itself 600 ms later).
- [ ] Never auto-starts.
- [ ] No losing state (wrong predictions never end the session; every object ends on a shelf; the session reaches All done).
- [ ] Nothing drops until a tile is chosen; tapping the other tile before the drop switches the choice.
- [ ] The apple drops, splashes, stops at the water line and bobs; the stone drops, splashes, keeps going, lands on the floor and three bubbles rise.
- [ ] A wrong prediction is never signalled before the object has settled; then the correct tile pulses a ring and the object still goes to the correct shelf.
- [ ] After a wrong prediction the same object comes back two items later.
- [ ] At the second level a big log floats right before a small coin sinks, and a bar under the object shows its size for a moment after a wrong guess.
- [ ] At the third level the metal spoon sinks and the metal bowl floats with water drawn inside its rim; the clay ball sinks and the clay boat floats.
- [ ] Three first-try corrects in a row bring the trap pairs; two misses in a row bring clear cases back.
- [ ] The finish screen shows the tank with every floater on the line and every sinker on the floor, and no score.
- [ ] If the log, rock or coin emoji is missing on the device, chopsticks, a brick or a bolt appears instead.
- [ ] With `?sound=off` nothing is audible.
