# 083 — Opposites Bridge

## Identity
- Slug: `opposites-bridge`
- Subject / topic: Literacy / vocabulary — opposites shown as pictures (big/small, full/empty, long/short, happy/sad, day/night, open/closed, hot/cold, many/few, up/down, heavy/light, fast/slow, baby/grown, asleep/awake)
- Age band: `5-6`
- Interaction pattern: `P12` — match pairs (all tiles visible; memory is not the objective)
- Estimated build size: ~440 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P12. Locale note: content is **language-neutral** — every opposite is a PICTURE pair; no word is ever shown. The English pair names in this spec are for the builder and reviewer only (F-22: opposites are vocabulary taught at 5-7 in every system; the concept transfers, the words do not — the words are for the teacher to say beside the screen, and no `LOCALE_DATA` is needed).

## Learning
- Objective: On a visible board of six pictures, taps the two that show opposite attributes (a big elephant and a small elephant; a full glass and an empty glass; fire and ice), so that every picture ends up bridged to its opposite.
- Prerequisites: Recognises the pictured objects; taps. No reading.
- Curriculum links: F-22 (vocabulary, including opposites/antonyms, in the 5-7 oral-language strand of all twelve systems), F-31 rows "Compare more/fewer/same" and "Sort by attribute" — conservative 6-7, earliest 4 → 5-6 (US L.K.5.b "relate frequently occurring verbs and adjectives to their opposites (antonyms)"; England Reception ELG "Speaking"; Germany Klasse 1 "Gegensatzpaare"; France GS "les contraires"; Netherlands groep 1-2 "tegenstellingen"; Spain Infantil "conceptos opuestos: grande/pequeño, lleno/vacío"; Brazil EI03EO "opostos"; Sweden förskoleklass "motsatsord"; Finland esiopetus "vastakohdat"). F-103 grounds the size/quantity pairs (big/small, many/few) in the comparison strand.
- Common misconceptions (F-103, F-115, F-131 — the pairing-by-the-wrong-feature family; F-121 for the board mechanics), each with this game's response:
  1. **Pairing by sameness or theme instead of opposition (fire with the sun "because both are hot"; the brick with the ice cube "because both are blocks").** Response: a wrong pair nudges apart (`ANIM.nudge`, `tone("nudge")`); after the same tile has been in two wrong pairs its true opposite gains a soft outline (`ART.hintRing`, `ANIM.showMe`) — the board never resets, so pairs already bridged stay.
  2. **Not seeing the attribute when the object is the same (two elephants are "just elephants").** Response: L1 uses same-object pairs on purpose (the only difference IS the attribute); when such a pair is made, the small one swells to the big one's size and back (`ANIM.swell`) before the pair locks — the difference is shown, not just rewarded. Full/empty and long/short enact likewise: the empty glass fills (`ANIM.fillUp`) and the short bar stretches (`ANIM.stretch`) then return.
  3. **Comparing by the wrong dimension (F-103: "bigger" judged by length; "more" judged by spread).** Response: many/few uses the same dot in the same layout footprint (6 dots vs 1 dot inside the same tile); long/short bars share height and differ only in length; big/small differ in overall size only.
  4. **Tapping the same tile twice expecting a match.** Response: the second tap de-selects it (`tone("tap")`, no error).

## How it plays
1. **Start screen**: title "Opposites Bridge", the goat (`ART.goat`) at (360, 200) standing on a plank (`ART.plank` at (360, 250)), Start, picker.
2. **Board 1 (L1: 3 pairs, 6 tiles)**: the rail shows 2 dots (§6 — one per board; two boards per session at 5-6, three when the child moves up quickly). Zones A and B merge for this pattern: a 3 × 2 grid of tiles (`ART.tile`, 100 × 100, `makeTile`) centred at (360, 300): columns x = 240 / 360 / 480, rows y = 240 / 360, shuffled. The first board might show: big elephant `ART.elephantBig`, empty glass (`ART.glassOutline` alone), long bar `ART.barLong`, small elephant `ART.elephantSmall`, full glass (`ART.glassOutline` + `ART.glassWater`), short bar `ART.barShort`. The goat stands on the near bank at (80, 470) in zone C; a river line (`ART.river`) runs along y = 470 from x = 140 to 580; the far bank marker (`ART.bank`) at (640, 470). No caption; no words.
3. **Pairing**: tap a tile → it lifts and outlines (`api.setSelected(true)`, `ANIM.lift`, `tone("tap")`). Tap a second tile:
   - **Opposites (a pair)**: the attribute enacts (`ANIM.swell` / `ANIM.fillUp` / `ANIM.stretch` for the L1 same-object pairs; `ANIM.pop` on both for every other pair), `tone("correct")`, both tiles dim to alpha 0.6 with a link glyph (`ART.link`) drawn between them; a plank (`ART.plank`) appears on the river at the next free position (x = 240, 360, 480 for pairs 1-3) carrying the two pictures at 22 px, and the goat steps onto it (`ANIM.step`).
   - **Not opposites**: both `ANIM.nudge`, `tone("nudge")`, both de-select; if the FIRST-tapped tile has now been in two wrong pairs, its opposite gets `ART.hintRing` (`ANIM.showMe`) until the pair is made.
   - **Same tile twice**: de-select, `tone("tap")`.
4. **Board complete**: all three pairs bridged → praise pop (rotation), the goat crosses to the far bank (`ANIM.cross`), the rail dot fills, the tiles rise away (`ANIM.boardOut`) and the next board `ANIM.appear`s after 600 ms with the goat back on the near bank and an empty river.
5. **Boards 2-N**: L1 pairs are same-object attribute pairs (big/small, full/empty, long/short, happy/sad, day/night, open/closed); L2 pairs are two different objects standing for the attribute (fire/ice, six dots/one dot, up arrow/down arrow, brick/balloon); L3 pairs are living things whose opposite is a property, not a look (hare/tortoise, chick/hen, asleep/awake). Session = 2 boards at L1 pace, up to 3 when the child moves up quickly (Rules).
6. **Finish**: `t("all_done")` (360, 110); the goat (360, 200) `ANIM.celebrate`; the summary = every pair bridged this session as planks in a row along y = 400 (x = 120 + k × 80, plank 72 × 20, the two pictures at 22 px above each plank) — the bridge the child built; `play_again` (250, 510), `menu` (470, 510); `tone("finish")`.

Session ≈ 4-5 minutes.

## Art registry
```js
const ART = {
  goat:          { kind: "emoji", value: "🐐", size: 72 },
  tile:          { kind: "shape", shape: "roundRect", w: 100, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  link:          { kind: "shape", shape: "rect", w: 24, h: 6, fill: "structure" },
  hintRing:      { kind: "shape", shape: "roundRect", w: 112, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  river:         { kind: "shape", shape: "rect", w: 440, h: 14, fill: "surface2" },
  bank:          { kind: "shape", shape: "roundRect", w: 60, h: 40, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 10 },
  plank:         { kind: "shape", shape: "roundRect", w: 100, h: 22, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 6 },
  // L1 — same object, different attribute
  elephantBig:   { kind: "emoji", value: "🐘", size: 64 },   // big
  elephantSmall: { kind: "emoji", value: "🐘", size: 28 },   // small
  glassOutline:  { kind: "shape", shape: "roundRect", w: 40, h: 56, stroke: "ink", strokeWidth: 3, radius: 6 },   // the glass (empty = outline alone)
  glassWater:    { kind: "shape", shape: "rect", w: 32, h: 42, fill: "structure" },                              // drawn inside the outline = full
  barLong:       { kind: "shape", shape: "roundRect", w: 80, h: 18, fill: "structure", radius: 6 },              // long
  barShort:      { kind: "shape", shape: "roundRect", w: 30, h: 18, fill: "structure", radius: 6 },              // short
  happy:         { kind: "emoji", value: "😀", size: 56 },   // happy
  sad:           { kind: "emoji", value: "😢", size: 56 },   // sad
  sun:           { kind: "emoji", value: "☀", size: 56 },    // day
  moon:          { kind: "emoji", value: "🌙", size: 56 },   // night
  bookOpen:      { kind: "emoji", value: "📖", size: 56 },   // open
  bookClosed:    { kind: "emoji", value: "📕", size: 56 },   // closed
  // L2 — different objects standing for the attribute
  fire:          { kind: "emoji", value: "🔥", size: 56 },   // hot
  ice:           { kind: "emoji", value: "🧊", size: 56 },   // cold (Unicode 12)
  dot:           { kind: "shape", shape: "circle", r: 7, fill: "structure" },   // many = 6 dots in a 3×2 block (pitch 20); few = 1 dot
  arrowUp:       { kind: "shape", shape: "polygon", points: [[0,-30],[26,0],[10,0],[10,30],[-10,30],[-10,0],[-26,0]], fill: "structure" },   // up
  arrowDown:     { kind: "shape", shape: "polygon", points: [[0,30],[26,0],[10,0],[10,-30],[-10,-30],[-10,0],[-26,0]], fill: "structure" },  // down
  brick:         { kind: "emoji", value: "🧱", size: 56 },   // heavy (Unicode 11)
  balloon:       { kind: "emoji", value: "🎈", size: 56 },   // light
  // L3 — living things, the opposite is a property
  hare:          { kind: "emoji", value: "🐇", size: 56 },   // fast
  tortoise:      { kind: "emoji", value: "🐢", size: 56 },   // slow
  chick:         { kind: "emoji", value: "🐣", size: 56 },   // baby
  hen:           { kind: "emoji", value: "🐔", size: 56 },   // grown
  asleep:        { kind: "emoji", value: "😴", size: 56 },   // asleep
  awake:         { kind: "emoji", value: "😃", size: 56 },   // awake
  dotEmpty:      { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:       { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
No entry is newer than Unicode 12, so no fallbacks are needed. Composite tiles: full glass = `ART.glassOutline` + `ART.glassWater` centred together; empty glass = `ART.glassOutline` alone; many = six `ART.dot` at (−20, −10), (0, −10), (20, −10), (−20, 10), (0, 10), (20, 10); few = one `ART.dot` at (0, 0).

## Animation registry
```js
const ANIM = {
  lift:      { y: "-=8", scale: 1.06, duration: 120, ease: "Sine.Out", trigger: "tile selected" },
  swell:     { scale: 2.28, duration: 350, ease: "Sine.InOut", yoyo: true, trigger: "the small elephant grows to the big one's size (28 → 64 px) and back; big/small pair" },
  fillUp:    { scaleY: 1, duration: 350, ease: "Sine.InOut", yoyo: true, trigger: "a glassWater copy inside the empty glass grows from scaleY 0 (anchored at the bottom) to full and back; full/empty pair" },
  stretch:   { scaleX: 2.67, duration: 350, ease: "Sine.InOut", yoyo: true, trigger: "the short bar stretches to the long bar's length (30 → 80) and back, anchored at its left end; long/short pair" },
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "both tiles of any other correct pair" },
  nudge:     { x: "+=10", duration: 80, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "both tiles of a wrong pair" },
  step:      { duration: 400, ease: "Sine.InOut", trigger: "goat to the newest plank (x set at call; y = 442)" },
  cross:     { x: 640, duration: 700, ease: "Sine.InOut", trigger: "goat to the far bank when a board completes" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the true opposite (from alpha 0.2)" },
  boardOut:  { y: "-=30", alpha: 0, duration: 300, ease: "Sine.In", trigger: "all tiles and planks when a board completes" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "new board tiles (from alpha 0, scale 0.6); goat back at the near bank" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish goat" }
};
```

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]                      ○ ○   rail y=28 (one dot per board)│  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │                                                              │
      │           [ big  ]     [empty]     [ long ]     row y=240     │
      │                                                              │  zones A+B
      │           [short ]     [ full]     [small ]     row y=360     │
      │            x=240        x=360       x=480      (100×100)     │
480   ├──────────────────────────────────────────────────────────────┤
      │ goat(80,470) ═══ plank ═══ plank ═══ plank ═══ [bank](640,470)│  zone C
      │              x=240        x=360        x=480   river y=470    │
560   └──────────────────────────────────────────────────────────────┘
```
Fixed layout, FIT scaling. The tiles in the diagram are named by their attribute for the reader; on screen they hold pictures only.

## Visual specification
- Background `THEME.colour.bg`; rail per §6 with one `ART.dotEmpty` per board (2 or 3), centred at y = 28, swapped for `ART.dotFull` as boards complete. No numerals anywhere (5-6 band).
- Tiles: `makeTile` 100 × 100 with `ART.tile` tokens; the picture (or composite) centred; selected = library selected look + `ANIM.lift`; locked = alpha 0.6 + `ART.link` drawn between the two locked tiles' facing edges (horizontal link between row-mates, vertical between column-mates, diagonal otherwise — a straight bar rotated to the line between centres).
- `ART.hintRing` behind a tile. `ART.river` centred (360, 470); `ART.bank` at (640, 470); `ART.goat` at (80, 470) at rest, moving to (plankX, 442) per `ANIM.step`; `ART.plank`s centred (240 / 360 / 480, 470) with the pair's two pictures at 22 px at (plankX − 22, 446) and (plankX + 22, 446).
- Tap floors 100 ≥ 80; gaps 20. Keyboard: arrows move across the 3 × 2 grid, Enter selects; a second Enter on another tile attempts the pair.

## Content
Language-neutral (pictures). Pairs are listed as (left picture ↔ right picture; attribute names for the reader). A board = 3 pairs drawn from the level's pool without repeats; tile positions shuffled; the two tiles of one pair are never horizontally adjacent in the same row on a fresh board.

- **L1 pool — same object, different attribute (6 pairs; a board takes 3):**
  1. `ART.elephantBig` ↔ `ART.elephantSmall` (big / small)
  2. `ART.glassOutline` + `ART.glassWater` ↔ `ART.glassOutline` alone (full / empty)
  3. `ART.barLong` ↔ `ART.barShort` (long / short)
  4. `ART.happy` ↔ `ART.sad` (happy / sad)
  5. `ART.sun` ↔ `ART.moon` (day / night)
  6. `ART.bookOpen` ↔ `ART.bookClosed` (open / closed)
- **L2 pool — different objects standing for the attribute (4 pairs; a board takes 3):**
  7. `ART.fire` ↔ `ART.ice` (hot / cold)
  8. six `ART.dot` ↔ one `ART.dot` (many / few)
  9. `ART.arrowUp` ↔ `ART.arrowDown` (up / down)
  10. `ART.brick` ↔ `ART.balloon` (heavy / light)
- **L3 pool — living things, the opposite is a property (3 pairs; the board is all three):**
  11. `ART.hare` ↔ `ART.tortoise` (fast / slow)
  12. `ART.chick` ↔ `ART.hen` (baby / grown)
  13. `ART.asleep` ↔ `ART.awake` (asleep / awake)

Board composition rules: an L1 board never holds two face pairs (happy/sad is the only face pair at L1, so this is automatic); the L3 board holds the asleep/awake faces and never an L1 face pair (levels never mix on one board). The pair test is a predicate over tile data (`tile.pairId === other.pairId && tile !== other`), never a comparison of pictures.

## Rules
- Item count: one "item" = one board; 2 boards minimum, 3 boards when the child reaches L3 by the end of board 2 (session cap 3 boards, 9 pairs at most ≈ 5 minutes).
- Difficulty progression: a board completed with at most one wrong pair → next board one level up (cap L3).
- Adaptation: a board with three or more wrong pairs → next board one level down (floor L1); a board with exactly two wrong pairs → same level (a fresh draw from the pool).
- What happens on a correct answer: the attribute enacts (`ANIM.swell` / `ANIM.fillUp` / `ANIM.stretch` at L1; `ANIM.pop` otherwise), `tone("correct")`, tiles lock with `ART.link`, a plank appears with the two pictures, the goat `ANIM.step`s onto it; on board completion a praise pop (rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]), `ANIM.cross`, and the rail dot.
- What happens on a wrong answer:
  - Any non-opposite pair (theme, look-alike, shared feature): both nudge, `tone("nudge")`, both de-select; the board is never reset.
  - The same tile in two wrong pairs: its true opposite gains `ART.hintRing` (the show-me step for this pattern); the ring stays until the pair is made.
  - Same tile tapped twice: de-select with `tone("tap")`; not counted.
- Retry behaviour: unlimited within the board; support escalates per tile (two misses → its opposite is shown). A board always completes (success is certain, F-46).
- Finish condition: the session's boards complete. No losing state, no clock.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific: `title` = "Opposites Bridge". No words on the play screen.

## Sound
`tone("tap")` on select/de-select; `tone("correct")` on a pair; `tone("nudge")` on a non-pair; `tone("tap", 4)` when the goat steps onto a plank; `tone("finish")` once. Silent under `?sound=off`. Nothing is spoken; the opposite words are never shown or said by the game.

## Testing checklist
- [ ] Works in all 11 languages (All done, Play again, Menu and praise change with the picker; the play screen shows no words in any language).
- [ ] Works at narrow width (400-px iframe: the 3 × 2 board, the goat, the river and the far bank are all visible and separate).
- [ ] Keyboard operable (arrows move across the grid, Enter selects; a second Enter on another tile attempts the pair).
- [ ] Never auto-starts.
- [ ] No losing state (any number of wrong pairs still ends with every pair bridged; a hint ring appears after two misses on a tile).
- [ ] All six tiles are face up at all times; nothing has to be remembered.
- [ ] Pairing the big and small elephants makes the small one grow to the big one's size and shrink back before they lock.
- [ ] Pairing the full and empty glasses makes the empty glass fill and empty again; pairing the long and short bars makes the short bar stretch and return.
- [ ] Each correct pair adds a plank to the river with the two pictures on it, and the goat steps onto the new plank; completing the board walks the goat to the far bank.
- [ ] Tapping the fire and then the sun (on a board that has both) nudges both apart; nothing turns red and no sad face appears.
- [ ] Tapping a tile twice de-selects it with no error.
- [ ] A board with 0-1 mistakes is followed by a board whose pairs are different objects (fire and ice); a board with 3+ mistakes is followed by same-object pairs again.
- [ ] The finish screen shows the planks of every pair made and no score.
- [ ] With `?sound=off` nothing is audible.
