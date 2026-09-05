# 124 — Left and Right

## Identity
- Slug: `left-right-turn`
- Subject / topic: Mathematics / direction — forward, turn left, turn right — steering a robot along a hedge corridor on a grid
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (per-tap judgement; every command is enacted the moment it is tapped, and the taps are recorded on a rail)
- Estimated build size: ~520 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Pattern contract: `catalogue/PATTERNS.md` P4 (per-tap, the enacted variant: the rail is a record, not an editable program). Content is language-neutral (a grid, a robot, a flag, three command tiles); the three tile words come from `STRINGS` and are the only text on the play screen. Position words in/on/under are game 123; this game is turns and forward only. No `LOCALE_DATA`.

## Learning
- Objective: Steers a robot from its start cell to the flag by tapping Forward, Turn left and Turn right in the right sequence, choosing left or right from the ROBOT's point of view (including when the robot faces sideways or down the screen).
- Prerequisites: Knows own left and right hand well enough to try; can read a one-word tile label OR use the arrow glyph on it (both are on every tile). No counting needed.
- Curriculum links: F-21 ("position and direction words" in the common core of all twelve systems), F-31 row "Position words (in/on/under/left/right)" — conservative 7, earliest 5 → 6-8 for the ROBOT-RELATIVE form used here (US K.G.A.1 / 1.G "relative positions"; England Y1 "describe position, direction and movement, including whole, half, quarter and three-quarter turns", Y2 "use mathematical vocabulary to describe position, direction and movement … right angles for quarter turns (clockwise and anti-clockwise)"; Germany Klasse 1-2 "Lagebeziehungen, rechts/links, Wege beschreiben"; France CP/CE1 "se repérer et se déplacer … coder un déplacement"; Netherlands groep 3-4 "richting: links, rechts, rechtdoor"; Spain 1º ciclo "izquierda/derecha, itinerarios"; Brazil EF01MA12 "descrever a localização … usando termos como à direita, à esquerda"; Sweden åk 1-3 "lägesord"; Norway 2. trinn; Finland 1-2 "suunnat"). Invalid moves are refused by the object, not punished (F-61); brute force cannot count as first-try (F-65); feedback is enacted (F-43).
- Common misconceptions (F-21, F-31 direction words; the responses rest on F-43 and F-61), each with this game's response:
  1. **Own left and right swapped (the child taps Turn right meaning left).** Response: the robot turns as asked and now faces a hedge; nothing lights. If the child then taps Forward, the robot bumps the hedge (`ANIM.bump`), the hedge `ANIM.pulse`s, `tone("nudge")`, and for 1500 ms the robot shows its two side marks — `ART.markL` (hollow circle) on its own left side and `ART.markR` (filled square) on its own right side — the same two glyphs printed on the corners of the Turn-left and Turn-right tiles. The link tile ↔ robot side is shown, not explained.
  2. **The robot's left is taken to be the child's left when the robot faces sideways or down (the mirror problem — L2 and L3).** Response: the side marks rotate WITH the robot, so when it faces down the hollow circle sits on the screen-right side of the robot; after a bump the child sees the circle there and the circle on the Turn-left tile. From L2 the robot's headlight (`ART.headlight`, a coral triangle on its front edge) makes the facing unmistakable before any tap.
  3. **Forward means "up the screen" whatever the robot faces.** Response: Forward always moves one cell in the headlight's direction; when that cell is a hedge the robot bumps and stays (F-61). At L2/L3 the first correct command after a turn is Forward into a cell that is NOT above the robot, so the rule is enacted item after item.
  4. **Turning without moving (turn, turn, turn — a full circle — because a turn "feels like progress").** Response: any turn that leaves the robot facing an open cell makes that cell glow softly (`ART.openGlow`, `ANIM.glowOnce`, 600 ms) — the way ahead is confirmed; a turn that leaves it facing a hedge shows nothing. After four turns with no Forward in between, the Forward tile `ANIM.pulse`s once.
  5. **Brute force — tapping Forward until something happens.** Response: every bump is a wrong attempt (F-65): the 2nd bump on the same step adds `ART.hintRing` to the correct next tile; the 3rd bump makes it the show-me tile (`ANIM.showMe`), and the item continues ringed step by step to the flag as solved-with-help.

## How it plays
1. **Start screen**: title "Left and Right", the robot (`ART.robot`) at (300, 200) and the flag (`ART.flag`) at (430, 200), Start, picker (hidden under `?embed=1`).
2. **Item 1 (L1: robot faces up; one right turn)**: rail of 10 dots at y = 28 (§6). The grid: 5 columns × 4 rows of `ART.cell` (72 × 72 on a 76-px pitch) with its top-left cell centred at (98, 134) — cell (c, r) is centred at (98 + 76c, 134 + 76r), so the grid spans x 60-440, y 96-400. Every cell not on the corridor is a hedge (`ART.hedge`, drawn in place of the cell). The corridor for item 1 is (1,3) (1,2) (1,1) (2,1) (3,1). The robot sits on (1,3) with its headlight pointing up; the flag stands on (3,1), which is drawn as `ART.targetCell` (accent-stroked) with `ART.flag` on it — the target IS the prompt; there is no sentence. Zone B (right of the grid): three command tiles, `makeTile` 120 × 100 with `ART.cmdTile` tokens, centred at x = 590: Forward at y = 150 (label `ART.arrowForward` above `S("forward")`), Turn left at y = 270 (`ART.arrowLeft` above `S("left")`, `ART.markL` at the tile's top-left corner (−44, −34)), Turn right at y = 390 (`ART.arrowRight` above `S("right")`, `ART.markR` at the tile's top-right corner (44, −34)). Zone C: the record rail — empty until the first tap — chips (`ART.chip`, 40 × 40) from x = 80 at y = 512, 48 px apart, each showing the command's arrow glyph at 60 % and its position number (`ART.chipNum`) at its top-right. The rail shows the last 12 taps; older chips fade (`ANIM.fadeOut`) and the row shifts left.
3. **Commanding**: the child taps a tile. Each tap: `tone("tap")`, `ANIM.pop` on the tile, a chip is added to the rail, and the robot acts at once.
   - **Forward, cell ahead open**: the robot `ANIM.glide`s one cell in its facing direction (260 ms). If that cell is the flag's cell → **item complete**: `ANIM.pop` on the robot, the flag `ANIM.wave`, `tone("correct")`, `GameCore.showPraise` with the next praise key, the rail dot fills, the record rail clears, and after 900 ms the next item builds (hedges and flag `ANIM.appear`).
   - **Forward, cell ahead is a hedge or the grid edge**: refused — the robot `ANIM.bump`s (12 px toward the hedge and back), the hedge (or the grid's edge line `ART.edgeLine` on that side) `ANIM.pulse`s, `tone("nudge")`, the side marks `ART.markL` / `ART.markR` appear on the robot for 1500 ms (`ANIM.appear` then `ANIM.fadeOut`), the chip is still recorded (dimmed to alpha 0.5 so the record shows the bump). Attempt 2 on this step. All tiles `setEnabled(false)` for the 1500 ms.
   - **Turn left / Turn right**: the robot rotates a quarter turn (`ANIM.turn`, angle ±90 over 220 ms; the headlight and side marks are children of the robot container so they rotate with it). If it now faces an open cell, that cell shows `ART.openGlow` with `ANIM.glowOnce`. A turn is never refused.
   - **Wrong step, 2nd bump**: the bump cue again, then `ART.hintRing` (`ANIM.showMe` at low contrast — alpha 0.2 → 0.6) around the correct next tile (the tile that the item's command sequence names for the robot's CURRENT cell and facing — the game recomputes it: if the robot faces an open corridor cell that leads toward the flag, Forward; else the turn that faces it).
   - **3rd bump on one step**: show-me — the correct next tile pulses at full contrast (`ANIM.showMe`, alpha 0.3 → 1) until tapped; thereafter every next correct tile is ringed until the flag is reached; the item completes as solved-with-help (no praise pop; the flag still waves).
4. **Items 2-10**: per Content/Rules. L1: robot faces UP at the start, one turn; L2: robot starts facing LEFT or RIGHT, one or two turns; L3: robot starts facing DOWN (the mirror case), two turns.
5. **Finish**: `t("all_done")` (360, 110); the robot (300, 210) and the flag (430, 210) with `ANIM.celebrate`; the summary = the ten corridors the child walked, drawn as mini grids (`ART.miniGrid`, 50 × 40, with the corridor cells as `ART.miniPath` 8 × 8 dots) in two rows of five from y = 330 (x = 120 + (i mod 5) × 120, rows 70 px apart); `play_again` (250, 510), `menu` (470, 510); `tone("finish")`; `GameCore.reportHeight()`.

Session ≈ 5-6 minutes (10 items × 25-40 s).

## Art registry
```js
const ART = {
  robot:        { kind: "emoji", value: "🤖", size: 52 },          // sits in a container with the headlight and the two side marks
  flag:         { kind: "emoji", value: "🚩", size: 44 },          // stands on the target cell; the prompt
  cell:         { kind: "shape", shape: "roundRect", w: 72, h: 72, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },
  hedge:        { kind: "shape", shape: "roundRect", w: 72, h: 72, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },   // every non-corridor cell; three 2-px structure lines across it read as a hedge
  targetCell:   { kind: "shape", shape: "roundRect", w: 72, h: 72, fill: "surface", stroke: "accent", strokeWidth: 4, radius: 8 },
  edgeLine:     { kind: "shape", shape: "line", w: 304, stroke: "structure", strokeWidth: 4 },          // pulses on the grid side the robot bumps into (length 380 for top/bottom)
  headlight:    { kind: "shape", shape: "polygon", points: [[-10,-22],[10,-22],[0,-34]], fill: "accent" },   // the robot's front; rotates with the robot container
  markL:        { kind: "shape", shape: "circle", r: 7, stroke: "structure", strokeWidth: 3 },           // hollow circle = LEFT; on the Turn-left tile's corner and on the robot's left side at (-30, 0)
  markR:        { kind: "shape", shape: "rect", w: 14, h: 14, fill: "structure" },                        // filled square = RIGHT; on the Turn-right tile's corner and on the robot's right side at (30, 0)
  openGlow:     { kind: "shape", shape: "roundRect", w: 72, h: 72, fill: "accent" },                     // 25 % alpha over the open cell the robot now faces
  cmdTile:      { kind: "shape", shape: "roundRect", w: 120, h: 100, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  arrowForward: { kind: "text",  value: "↑", size: 40, font: "display", color: "ink" },
  arrowLeft:    { kind: "text",  value: "↰", size: 40, font: "display", color: "ink" },
  arrowRight:   { kind: "text",  value: "↱", size: 40, font: "display", color: "ink" },
  hintRing:     { kind: "shape", shape: "roundRect", w: 132, h: 112, stroke: "structure", strokeWidth: 4, radius: 18 },
  chip:         { kind: "shape", shape: "roundRect", w: 40, h: 40, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },   // record rail; holds the command arrow at 60 % size
  chipNum:      { kind: "shape", shape: "circle", r: 9, fill: "structure" },                              // position numeral 12 px display, color bg
  miniGrid:     { kind: "shape", shape: "roundRect", w: 50, h: 40, fill: "surface2", stroke: "line", strokeWidth: 1, radius: 6 },
  miniPath:     { kind: "shape", shape: "rect", w: 8, h: 8, fill: "structure" },                          // one per corridor cell at (c × 10 − 20, r × 10 − 15) inside the mini grid
  dotEmpty:     { kind: "shape", shape: "circle", r: 8, stroke: "line", strokeWidth: 2 },
  dotFull:      { kind: "shape", shape: "circle", r: 8, fill: "structure" }
};
```
Robot container: `ART.robot` at (0, 0), `ART.headlight` at (0, 0) with its tip at (0, −34) — pointing up at rotation 0; `ART.markL` at (−30, 0) and `ART.markR` at (30, 0), both alpha 0 until a bump. Facing is the container's angle: up 0, right 90, down 180, left 270. The two side marks are hollow-vs-filled AND circle-vs-square so colour never carries the left/right meaning (§12).

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a command tile tapped; the robot on arrival" },
  glide:     { duration: 260, ease: "Sine.InOut", trigger: "the robot moves one cell (x,y set at call)" },
  turn:      { angle: "+=90", duration: 220, ease: "Sine.InOut", trigger: "Turn right; Turn left uses angle '-=90'" },
  bump:      { x: "+=12", duration: 90, ease: "Sine.Out", yoyo: true, trigger: "Forward into a hedge or the edge; the axis and sign follow the facing (y for up/down)" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the hedge or edge line bumped; the Forward tile after four turns in a row" },
  glowOnce:  { alpha: 0, duration: 600, ease: "Sine.In", trigger: "openGlow on the open cell the robot now faces (from alpha 0.25 to 0)" },
  appear:    { alpha: 1, scale: 1, duration: 200, ease: "Back.Out", trigger: "side marks after a bump; new hedges, flag and chips (from alpha 0, scale 0.6)" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "side marks after 1500 ms; the oldest chip when the rail is full; the rail on item completion" },
  wave:      { angle: 12, duration: 150, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the flag when the robot arrives" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "hintRing on the correct next tile (from alpha 0.2; capped at 0.6 on the 2nd bump, full on the 3rd)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "finish robot and flag" }
};
```
No flashing: `showMe` at 1 Hz; `wave` four swings then stops.

## Screen layout
```
y   0 ┌──────────────────────────────────────────────────────────────┐
      │ [lang]           ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  rail y=28                │  zone T
 56   ├──────────────────────────────────────────────────────────────┤
      │  ┌────┬────┬────┬────┬────┐ grid x 60-440, y 96-400           │
      │  │ H  │ H  │ H  │ H  │ H  │  row 0 (y=134)     [  ↑    ]      │
      │  ├────┼────┼────┼────┼────┤                    [Forward]      │  zones A+B
      │  │ H  │ .  │ .  │ F  │ H  │  row 1 (y=210)     (590,150)      │
260   │  ├────┼────┼────┼────┼────┤                    [  ↰    ]      │
      │  │ H  │ .  │ H  │ H  │ H  │  row 2 (y=286)     [ Left  ]      │
      │  ├────┼────┼────┼────┼────┤                    (590,270)      │
      │  │ H  │ R  │ H  │ H  │ H  │  row 3 (y=362)     [  ↱    ]      │
      │  └────┴────┴────┴────┴────┘                    [ Right ]      │
      │   x=98  174  250  326  402   (cell centres)    (590,390)      │
480   ├──────────────────────────────────────────────────────────────┤
      │  record rail: [↑1][↑2][↱3][↑4] … chips 40×40 from x=80, y=512 │  zone C
560   └──────────────────────────────────────────────────────────────┘
```
Legend: H = hedge, . = open corridor cell, R = robot, F = flag cell. Fixed layout, FIT scaling; the grid never scrolls or reflows.

## Visual specification
- Background `THEME.colour.bg`; rail per §6: 10 × `ART.dotEmpty` at y = 28 (x = 261 + i × 22) → `ART.dotFull`.
- Grid: 20 cells; corridor cells `ART.cell`, other cells `ART.hedge`, the flag cell `ART.targetCell` with `ART.flag` centred on it. The grid's four edges are `ART.edgeLine`s at x = 58 / x = 442 (length 304) and y = 94 / y = 402 (length 380), alpha 0 until bumped.
- Robot container at the start cell's centre, angle per facing; `ART.robot` is drawn at 52 px so the headlight tip (34 px from centre) stays inside the 72-px cell.
- Command tiles: `makeTile` 120 × 100 with `ART.cmdTile` tokens at (590, 150) / (590, 270) / (590, 390); arrow glyph at tile (0, −16); word label at tile (0, 28) in `THEME.font.body` 24 px `THEME.colour.ink`, `wordWrap` 110, fit-to-width (the library shrinks long words); `ART.markL` at (−44, −34) on the Turn-left tile, `ART.markR` at (44, −34) on the Turn-right tile. Tab order: Forward, Turn left, Turn right.
- `ART.hintRing` centred on a tile; `ART.openGlow` centred on a cell; `ART.chip`s at (80 + i × 48, 512) with the arrow at 60 % and `ART.chipNum` at (14, −14).
- Tap floors: tiles 120 × 100 ≥ 56; gap between tiles 20; the grid cells are NOT tappable (tapping a cell does nothing).
- Text on the play screen: the three tile words only (≤ 8 words, F-42).

## Content
Language-neutral. Grid cells are (column, row) with (0,0) top-left, columns 0-4, rows 0-3. Each item = (start cell; start facing; corridor cells in order from start to flag; the command sequence). Every cell not listed in the corridor is a hedge. Facing: U up, D down, L left, R right. Commands: F forward, L turn left, R turn right.

- **L1** (facing up; one turn — the robot's left is the child's left):
  1. (1,3); U; (1,3) (1,2) (1,1) (2,1) (3,1); F F R F F
  2. (3,3); U; (3,3) (3,2) (2,2) (1,2) (0,2); F L F F F
  3. (2,3); U; (2,3) (2,2) (2,1) (3,1) (4,1); F F R F F
  4. (4,3); U; (4,3) (4,2) (4,1) (3,1) (2,1) (1,1); F F L F F F
- **L2** (facing left or right; one or two turns):
  5. (0,3); R; (0,3) (1,3) (2,3) (2,2) (2,1); F F L F F
  6. (4,0); L; (4,0) (3,0) (2,0) (2,1) (2,2) (2,3); F F L F F F
  7. (0,0); R; (0,0) (1,0) (1,1) (1,2) (2,2) (3,2); F R F F L F F
  8. (4,3); L; (4,3) (3,3) (3,2) (3,1) (2,1) (1,1); F R F F L F F
- **L3** (facing down — the mirror case; two turns):
  9. (2,0); D; (2,0) (2,1) (2,2) (1,2) (0,2) (0,3); F F R F F L F
  10. (1,0); D; (1,0) (1,1) (1,2) (2,2) (3,2) (3,3); F F L F F R F
  11. (3,0); D; (3,0) (3,1) (4,1) (4,2) (4,3); F L F R F F
  12. (4,1); D; (4,1) (4,2) (3,2) (2,2) (1,2) (1,3); F R F F F L F

Every corridor is a single path with no branches, so exactly one turn direction is open at each corner; the command sequence listed is the unique shortest route and is what the hint ring follows. Play list of 10 per Rules: start at L1 and take items from the current level in a shuffled order without repeating an item; if a level's pool runs out it is reshuffled. Two consecutive items never share the same start cell (§13).

Worked example: item 1 (L1 #1): F, F — the robot climbs to (1,1); R — it turns to face (2,1), which glows; F, F — it reaches the flag; praise · item 2 (L1 #2) first-try → L2 · item 3 (L2 #5): F, F; the child taps Turn right (own-right) — the robot faces down at a hedge, nothing glows; F — bump, the hedge pulses, the side marks show the hollow circle on the robot's UP side (its left, since it faces right); the child taps Turn left twice (now facing up, the cell glows), F, F → flag (helped) → L1 · item 4 (L1 #3) first-try · item 5 (L1 #4) first-try → L2 · items 6-7 first-try → L3 · item 8 (L3 #9): the robot faces down; F, F; Turn right — the robot faces screen-LEFT and (1,2) glows; F, F; Turn left — faces down, (0,3) glows; F → flag first-try · items 9-10 first-try · Finish shows ten mini corridors.

## Rules
- Item count: 10.
- Difficulty progression: 2 consecutive first-try items (no bump on the whole item) → next level (cap L3).
- Adaptation: any bump on an item, or a non-first-try item twice in a row → next item one level down (floor L1). The current item is never abandoned.
- Turn-loop cue: four turns with no Forward between them → the Forward tile `ANIM.pulse`s once (an inactivity-free cue; no clock).
- What happens on a correct answer: arrival on the flag cell → `ANIM.pop`, flag `ANIM.wave`, `tone("correct")`, praise rotation ["well_done", "great_job", "excellent", "you_did_it", "keep_going"], rail dot, next item after 900 ms. Every enacted correct turn shows `ART.openGlow` on the cell ahead (`ANIM.glowOnce`).
- What happens on a wrong answer (per anticipated mistake; a "wrong answer" is a Forward into a hedge or the edge):
  - Own left/right swapped (L1): `ANIM.bump`, hedge `ANIM.pulse`, `tone("nudge")`, side marks on the robot for 1500 ms (hollow circle = left, filled square = right, matching the tile corners).
  - Robot-relative mirror (L2/L3: the robot faces sideways or down and the child turned toward the screen's left/right): the same bump cue; the side marks rotate with the robot, so the hollow circle sits on the robot's own left wherever that is on screen.
  - Forward taken as "up the screen": the same bump cue; the edge line pulses when the bump is against the grid edge.
  - Turning without moving: no bump; after four turns the Forward tile pulses once.
  - Brute force (repeated Forward): each bump is an attempt; the 2nd bump on a step rings the correct tile at low contrast; the 3rd makes it the show-me tile.
- Retry behaviour: attempt 1 unaided → attempt 2 after the side-marks cue (+ `ART.hintRing` at low contrast on the correct tile) → attempt 3 with the full-contrast show-me tile; from then on the correct next tile is ringed at every step until the flag; the item completes as solved-with-help. No attempt 4. An item with any bump never counts as first-try.
- Finish condition: 10 items. No losing state; no clock; the robot can always turn round, so no position is a dead end.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, via `S(key)`): `title` = "Left and Right"; `forward` = "Forward"; `left` = "Left"; `right` = "Right". The tile words are the only text on the play screen; each tile also carries an arrow glyph from ART so a non-reader can play.

## Sound
`tone("tap")` on every command tile; `tone("tap", 4)` when the robot lands on a cell; `tone("correct")` on arrival at the flag; `tone("nudge")` on a bump; `tone("finish")` once. Silent under `?sound=off`; no audio files. Nothing is spoken; the headlight, the glow and the side marks carry the meaning.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu, praise and the three tile words change with the picker; long words such as the Finnish for "forward" shrink to fit the tile).
- [ ] Works at narrow width (400-px iframe: the whole grid, the three tiles and the record rail are visible; tiles remain separate targets).
- [ ] Keyboard operable (Tab cycles Forward, Turn left, Turn right; Enter taps; the grid cells are never focusable).
- [ ] Never auto-starts.
- [ ] No losing state (twenty Forward taps into a hedge still end with the item completing via the ringed tiles, and the session reaches All done).
- [ ] Forward moves the robot one cell in the direction its coral headlight points, whatever that direction is on screen.
- [ ] Forward into a hedge makes the robot bump and the hedge pulse; the robot does not move; a hollow circle and a filled square appear on the robot's two sides for about a second and a half.
- [ ] Turn left rotates the robot a quarter turn anticlockwise; Turn right clockwise; a turn that faces an open cell makes that cell glow briefly.
- [ ] At level 3 the robot starts facing down the screen; Turn right then makes it face the screen's left.
- [ ] The hollow circle on the robot's left side is the same glyph as on the Turn-left tile's corner; the filled square matches the Turn-right tile.
- [ ] Every tap adds a numbered chip to the bottom rail; a bumped Forward is recorded dimmed; the rail clears when the flag is reached.
- [ ] Two items with no bumps bring a robot that starts facing sideways; a bump brings a robot that starts facing up on the next item.
- [ ] Four turns in a row with no Forward make the Forward tile pulse once.
- [ ] The finish screen shows ten small corridors and no score.
- [ ] With `?sound=off` nothing is audible.
