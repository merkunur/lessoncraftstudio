# 124 — The Picnic Lane

## Identity
- Slug: `left-right-turn`
- Subject / topic: Mathematics / direction — forward, turn left, turn right — steering a push-mower along a lane through a hedge garden on a grid
- Age band: `6-8`
- Interaction pattern: `P4` — tap in order (per-tap judgement; every command is enacted the moment it is tapped)
- Frame: THE PILOT
- Estimated build size: ~640 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md`. Frame contract: `design/MISSIONS.md` FRAME 9 THE PILOT. Ruling: `design/GAME-DESIGN-LAW.md`. Pattern contract: `catalogue/PATTERNS.md` P4 (per-tap, the enacted variant). Content is language-neutral (a garden, a mower, an arbour, three command tiles); the three tile words come from `STRINGS` and are the only text on the play screen. Position words in/on/under are game 123; this game is turns and forward only. No `LOCALE_DATA`.

**What changed from the pre-pivot spec, and what did not.** `MISSIONS.md` §2 FRAME 9 calls the original 124 *"the single closest thing in the corpus to a real game"* and it is right: it already failed Deletion 1 and Deletion 2, and its state variable was already single and physical. It failed four other things, and this redesign fixes exactly those four — **L2 PERSISTENCE** (the world rebuilt itself every item and the robot teleported to a new start cell), **L3 VISIBLE DESTINATION** (a per-item flag, not a session goal), **the WANT** (a survey flag is not a reason to go anywhere), and **the row of progress dots at y = 28**. The pattern, the band, the objective, the prerequisites and the curriculum links are untouched.

## Learning
- Objective: Steers a robot from its start cell to the flag by tapping Forward, Turn left and Turn right in the right sequence, choosing left or right from the ROBOT's point of view (including when the robot faces sideways or down the screen).
- Prerequisites: Knows own left and right hand well enough to try; can read a one-word tile label OR use the arrow glyph on it (both are on every tile). No counting needed.
- Curriculum links: F-21 ("position and direction words" in the common core of all twelve systems), F-31 row "Position words (in/on/under/left/right)" — conservative 7, earliest 5 → 6-8 for the ROBOT-RELATIVE form used here (US K.G.A.1 / 1.G "relative positions"; England Y1 "describe position, direction and movement, including whole, half, quarter and three-quarter turns", Y2 "use mathematical vocabulary to describe position, direction and movement … right angles for quarter turns (clockwise and anti-clockwise)"; Germany Klasse 1-2 "Lagebeziehungen, rechts/links, Wege beschreiben"; France CP/CE1 "se repérer et se déplacer … coder un déplacement"; Netherlands groep 3-4 "richting: links, rechts, rechtdoor"; Spain 1º ciclo "izquierda/derecha, itinerarios"; Brazil EF01MA12 "descrever a localização … usando termos como à direita, à esquerda"; Sweden åk 1-3 "lägesord"; Norway 2. trinn; Finland 1-2 "suunnat"). Invalid moves are refused by the object, not punished (F-61); brute force cannot count as first-try (F-65); feedback is enacted (F-43).
- Common misconceptions (F-21, F-31 direction words; the responses rest on F-43 and F-61), each with this game's response:
  1. **Own left and right swapped (the child taps Turn right meaning left).** Response: the mower turns as asked and now points at a hedge; no wheel ruts appear ahead of it, so the way is not confirmed. If the child then taps Forward, the mower noses into the hedge (`ANIM.bump`, 12 px along the facing axis and back), the hedge `ANIM.pulse`s, `tone("nudge")`, and the world **freezes for 1500 ms with every tile disabled** while the mower shows its two fender marks — `ART.markL` (hollow circle) on its own left flank and `ART.markR` (filled square) on its own right flank — the same two glyphs printed on the corners of the Turn-left and Turn-right tiles. The link tile-to-flank is shown, not explained. Nothing is damaged, nothing regrows, the mower does not move, and the hedgehog's drawing does not change.
  2. **The robot's left is taken to be the child's left when the robot faces sideways or down (the mirror problem — L2 and L3).** Response: `ART.markL` and `ART.markR` are children of the rotating mower container, so with the mower facing south the hollow circle sits on the **screen's right** of it; after a bump the child sees the circle there and the same circle on the Turn-left tile. Two independent facing cues carry it before any tap — the coral cutting bar `ART.cutBar` across the mower's front edge, and the hedgehog's snout, which points the same way. And because the world **persists**, the mower is never quietly reset to facing-up between items, so the mirror case is never un-taught by a rebuild: Garden A takes three of its thirteen turns on a south-facing mower and one on a west-facing one.
  3. **Forward means "up the screen" whatever the robot faces.** Response: Forward always moves one cell in the direction the cutting bar points; when that cell is a hedge the mower bumps and stays (F-61). This no longer has to be engineered per item — it falls out of the lane, because after the first corner the mower faces east for four cells and does not face north again until cell 22 of 27.
  4. **Turning without moving (turn, turn, turn — a full circle — because a turn "feels like progress").** Response: any turn that leaves the mower facing an open lane cell paints `ART.wayMark` — two short `inkSoft` wheel ruts along that cell's lane axis (`ANIM.rutFade`, 600 ms at support tier S2; held until the mower moves at S1) — and a turn facing a hedge paints nothing. The cue is carried by **shape, not colour**, so it costs the screen no coral. After four turns with no Forward between them the Forward tile `ANIM.pulse`s once (a cue with no clock in it).
  5. **Brute force — tapping Forward until something happens.** Response: every bump is a wrong attempt (F-65): the 2nd bump on the same step adds `ART.hintRing` to the correct next tile at low contrast, the 3rd makes it the show-me tile (`ANIM.showMe`), and the stretch continues ringed step by step to the next arch as solved-with-help. Above that sits the named anti-brute-force guard, THE ONE-WAY WHEEL (Rules): an item is first-try only if the mower made exactly as many forwards as the stretch is long, so a guesser never earns a first-try, the support tier never rises, and the scaffold stays maximal — which is the correct response to guessing, not a penalty.
  6. **"Mown means done, so I should drive back and look for something."** *(New; created by this apparatus, and named rather than left to be discovered.)* A child who reads the mown lane behind them as a finished task may reverse along it hunting for the next thing. Response: reversing is permitted and completely free — no bump, no dead end, nothing un-mows, nothing is lost. The only things on screen that can still change are the shaggy lane ahead and the bare arches ahead, and at S1 the wheel ruts point forward. The world answers the question by being consistent (Device 3 in its quietest form).

## Mission
**Mission, as the child would say it.** *Mow the lane so I can get to the picnic.*

**The hero.** A hedgehog on a small push-mower, drawn **top-down** and rotating as one container. Per THE PILOT's rule it **is** the vehicle: the child does not command a character, the child is the steering.

**The want (the visible lack, one still frame at 400 px).** The arbour is laid for three and only two are sitting there. The third chair is empty, the cake is uncut, and the whole lane between the potting shed and the arbour is grown over with long grass. *They are waiting, and the way is not clear.* No sentence is needed and none is written: the play screen carries three English words in total, all of them on the control tiles.

**The goal.** `mission.goal` = the arbour at a constant (664, 180), drawn from tap one, changing exactly once — at arrival. It never reacts to an item (a waiting party that responds per item is an approval meter, F-44's banned shape).

**The single state variable.** **S = (cell, facing)** — the mower's pose in the garden. One state variable, two readings.

- **Mathematical reading.** An ordered pair: a position on a 2-D lattice, and an orientation in {0°, 90°, 180°, 270°}. Forward is a translation by the unit vector **of the facing**; Left and Right are minus/plus 90° rotations of the facing with the position held. The child is composing a sequence of rigid motions in a frame that is not the screen's — which is the Objective verbatim ("choosing left or right from the ROBOT's point of view").
- **Physical reading.** Where the mower is standing in the garden, and which way its cutting bar points.

The mission's goal is a **predicate on S** (`S.cell === arbour`). The **transition function on S** is exactly the three commands. There is no `answer` field anywhere in this game and there never was — 124 is the one spec in the corpus that already satisfied the Single-State Law.

*(The Objective is invariant and says "robot" and "flag"; the mower is that robot and the arbour is that flag. What the Objective names — a vehicle-relative frame with a facing — is precisely what has been preserved and made persistent.)*

**The isomorphism, stated exactly.** *The answer is the manoeuvre, and the manoeuvre is executed as it is chosen.* There is no commit step, no Check, no verdict. The Forward handler reads `mower.cell` and `mower.facing`, computes the neighbour, and asks **`lane.contains(neighbour)`** — `world.accepts(hero, destination)` line for line. The Left and Right handlers read `mower.facing` and rotate it. Nothing compares a tap to a stored value, and the hint recomputes the correct next command from (position, lane), so even the scaffold is a function of the world rather than an answer key.

**The Displacement rule passes at its strongest.** THE PILOT is the one frame in which the character's displacement is not the *consequence* of the answer — it **is** the answer, because a vehicle-relative turn has no existence except as a change of the vehicle's own orientation. "The mower's left" cannot be expressed without a mower and a facing.

**The journey is along the apparatus, not between places** (LAW §2.4a). The lane is not a route *between* problems; the lane's own geometry — where it turns, which way, and what the mower is facing when it gets there — is the content. The garden is the curriculum sequence laid out as terrain: the opening run is taken facing north (mower-left = child-left, the easy case), the middle brings the south- and west-facing turns (the mirror case), and the tail is a staircase where a turn arrives every second cell.

**The mark that stays.** The mown lane, permanently. See `## World` for the three-display progress stack.

## World
**Stage 720 x 620.** A declared taller stage, permitted by BUILD-CONVENTIONS §2 (max 720 x 720), taken so a 9 x 6 garden fits at a cell size that stays legible at a 400-px iframe. `height` in the Phaser config changes and nothing else. Zones are the MISSIONS §1.4 Mission Layout, scaled to the taller stage:

```
y   0 ---------------------------------------------------------- 720
    | [lang picker 16,16]                                        |  zone T   0- 56   chrome only
 56 |------------------------------------------------------------|            no progress dots
    |                                                            |
    |   zone W - THE WORLD                                       |   56-480   424 px
    |   the garden . the mower . the arbour . the mown lane      |            persistent
    |   hero and goal are BOTH in here at every moment           |
    |                                                            |
480 |------------------------------------------------------------|
    |   zone H - THE HAND: three command tiles, nothing else     |  480-620   140 px
620 --------------------------------------------------------------
```

**The garden — 9 columns x 6 rows, cell 58 x 58 on a 62-px pitch.**
`x(c) = 96 + 62c` gives 96, 158, 220, 282, 344, 406, 468, 530, 592.
`y(r) = 118 + 62r` gives 118, 180, 242, 304, 366, 428.
Grid bounds x 67-621, y 89-457 — entirely inside zone W.

**THE LANE — 27 cells, machine-verified.** Garden A (the other two are in `## Content`):

`(0,5) (0,4) (0,3) (0,2) (0,1) (0,0) | (1,0) (2,0) (3,0) (4,0) | (4,1) (4,2) | (3,2) (2,2) | (2,3) (2,4) | (3,4) (4,4) | (4,5) | (5,5) (6,5) | (6,4) (6,3) | (7,3) | (7,2) | (8,2) | (8,1)` then east into the arbour.

Measured: **27 cells, 27 distinct, 0 self-touches** — no two non-consecutive lane cells are orthogonally adjacent, so every cell has exactly one open neighbour ahead and the unique-shortest-route property the hint depends on holds by construction rather than by care. **The remaining 27 cells are hedge.** *(The approved design brief said "18 hedge cells"; 9 x 6 = 54 minus 27 lane is 27. The brief's figure was an arithmetic slip and 27 is the measured number.)* 13 corners; turn sequence **R R R L L R L L R L R L R** — irregular by construction, with a triple-right at corners 1-3 and an L,L at corners 7-8, so no child can tap a remembered rhythm. Turns taken while facing N: 4, E: 5, S: 3, W: 1.

**Three cell states, each distinguished by fill AND glyph** (§12 — never colour alone):
`ART.hedge` — `structureSoft` fill, `structure` 3-px stroke, three 2-px `structure` lines across.
`ART.laneShaggy` — `surface2` fill, `line` 2-px stroke, three 14-px `structure` grass tufts standing up.
`ART.laneMown` — `surface` fill, `line` 2-px stroke, two 1.5-px `inkSoft` wheel ruts along the cell's lane axis.

**The mower** starts on cell (0,5) at (96, 428) facing north (container angle 0; east 90, south 180, west 270). Its silhouette is **asymmetric along its axis** — a broad 30 x 10 `cutBar` at the front, a narrow tail behind — so facing is carried by shape as well as by the one coral. `ART.markL` sits at container (-24, 2), `ART.markR` at (24, 2), both alpha 0 until a correction; both are children of the container, so they rotate with it, and that is the entire mechanism of misconception 2.

**Ten rose arches** hoop over the lane at irregular positions: (158,118) (344,180) (282,242) (220,304) (282,366) (344,428) (406,428) (468,366) (530,242) (592,180). Bare = a 2-px `line` hoop (`ART.archBare`). Passed = a 3-px `structure` hoop with five `surface` blossoms outlined in `ink` (`ART.archBloom`), permanently.

**The arbour — the waiting party, drawn from tap one** — centred (664, 180), 80 x 112: a trellis, a round table with an uncut cake, and one empty chair (`ART.arbour`), with `ART.rabbitSeated` and `ART.mouseSeated` already in the other two. It never moves and never reacts during play.

**The potting shed** (`ART.shed`) at (40, 428), 48 x 64, door open — where the mower came from. Inert scenery, and it stops the composition sitting lopsided.

**Zone H is a helm and nothing else — three tiles, 170 x 92**, at (170, 540), (360, 540) and (550, 540): **Turn-left on the LEFT of the panel, Forward in the middle, Turn-right on the RIGHT.** The pre-pivot spec stacked them vertically at x = 590, which put "left" *above* "right"; a control panel for a game about left and right must not contradict itself in its own layout. Scrambling the order to force vehicle-relative reasoning was considered and rejected: the game's job is to *correct* the screen-relative frame with the fender marks and the bump, not to dodge it by making the helm confusing. **Interactive elements: 3** — the cells are not tappable, the mower is not tappable, and the arbour, arches and shed are inert scenery (F-69 satisfied without needing the §5.1 instrument reading at all).

**The tap-record strip is DELETED.** The pre-pivot spec kept a chip row at y = 512 recording every tap, with a bumped Forward left on screen dimmed. Two reasons it goes: the mown lane is a better record of the same thing and it is diegetic, and a permanent on-screen mark of a mistake is punishment by accumulation. If a reviewer wants it back it fits at y = 596 as 28-px chips, at the cost of the clean helm; that trade is not recommended. This is a deliberate, named removal, not an oversight.

**Diegetic progress — three displays at once, all readable in one still photograph, none of them a row of dots.**
1. **The mown lane behind, the shaggy lane ahead.** The strongest of the three: the mower cuts the cell it enters and that cell stays cut for the whole session. A child glancing at the screen from across the room knows how far along they are with no glyph, no number and no counting.
2. **Ten rose arches — bloomed behind, bare ahead.** Passing under an arch opens its roses permanently. Device 2 exactly: the object itself in a new state, never a token awarded for reaching it.
3. **The shrinking distance to the arbour**, which is on screen and unmoving from tap one.

*Honest risk, named rather than buried:* the arches are one per item and could be read as a row of progress dots relocated into the world. The discriminators a reviewer should apply — they sit at irregular positions along the lane, they are not in a row, they are not aligned, they are never counted anywhere in the game, and they are load-bearing scenery that would still be drawn if the item structure did not exist. If a reviewer judges that insufficient, the fallback is to drop the arches entirely and let the mown/shaggy boundary carry progress alone; the game loses a milestone beat and nothing else.

## How it plays
1. **Start screen (Boot).** `S("title")` at (360, 80) size 44 `structure`; the mower with its hedgehog at (200, 260) facing east; a band of five `ART.laneShaggy` cells across the middle at y = 260 from x = 268 to x = 516 on a 62-px pitch; `ART.arbour` at (600, 260) with `ART.rabbitSeated`, `ART.mouseSeated` and the empty chair; `makeButton` `t("start")` at (360, 470); language picker at (16, 16), hidden under `?embed=1`. `ANIM.breathe` on the two seated friends (a 2 % scale idle, permitted on Boot and Finish only, ART-BIBLE §6). **Never auto-starts.**
2. **The world builds once, on Start.** A garden is chosen from the three in `## Content`. All 54 cells are drawn — 27 hedge, 27 `ART.laneShaggy`; the ten arches bare; the arbour, the shed, the mower on cell (0,5) at (96, 428) facing north, its start cell already mown (`ART.laneMown`, because the mower is standing on it). Support tier starts at **S1**. `GameCore.reportHeight()`. **The stage then freezes** — zero tweens, no idle bob, no ambient scenery. This is the DECIDE beat and it holds until the child taps.
3. **R4's one permitted self-demonstration.** On item 1 only, the Forward tile `ANIM.pulse`s once and the mower advances one cell unbidden to (0,4) = (96, 366), mowing it, then freezes. F-42 permits a new mechanic to demonstrate itself once; this is the only motion in the game the child did not cause.
4. **Commanding.** Every tap runs `tone("tap")`, `ANIM.pop` on the tile, and the mower acts at once. All three tiles are `setEnabled(false)` for the duration of the ACT and re-enabled when the stage freezes again.
   - **Forward, cell ahead on the lane.** `ANIM.roll`, 340 ms, one cell along the facing. The cell it leaves and the cell it enters are both `ART.laneMown` and stay mown forever. `tone("tap", k)` with k rising as the k-th cell of the current stretch is entered, so the run is audible (F-213).
   - **Forward, cell ahead is a hedge or off the grid.** Refused, not punished: `ANIM.bump` 12 px along the facing and back (90 ms out, 90 ms back), the hedge `ANIM.pulse`s, `tone("nudge")`, then the world **freezes for 1500 ms with every tile disabled** while `ART.markL` and `ART.markR` `ANIM.appear` on the mower's flanks and `ANIM.fadeOut`. Correction duration is 1500 ms, identical to the pre-pivot spec's, so teaching strength does not fall; and because the correction is a frozen hold with targets disabled it is an ACT, so F-42's freeze assertion holds through it. The mower does not move, nothing is damaged, nothing decays, and the hedgehog's drawing does not change at all.
   - **Turn left / Turn right.** `ANIM.swing`, angle minus or plus 90 over 220 ms; the cutting bar, the snout and both fender marks are children of the container so they rotate with it. If the mower now faces an open lane cell, `ART.wayMark` paints in that cell (`ANIM.rutFade`). **A turn is never refused** — turning is thinking, and thinking is free and unlimited. A turn is never an attempt.
5. **A worked session on Garden A, item by item, with real coordinates.**
   - **Item 1 (L1, stretch 6, one corner).** F, F, F, F, F carries the mower up column 0 from (96,428) to (96,118); the corner at (0,0) needs **Turn right** (taken facing north — mower-left is child-left, the easy case) and the ruts appear in (1,0); F to (158,118) passes under **arch 1**, which `ANIM.bloom`s and stays bloomed. `tone("correct")`, `GameCore.showPraise("well_done")`. No rebuild, no pause, no reset: item 2 has already begun.
   - **Item 2 (L1, stretch 4).** F, F, F to (344,118); **Turn right** taken facing east; F to (344,180) — **arch 2**. Two first-try items in a row, so the support tier rises to **S2**: the ruts now fade after 600 ms instead of holding.
   - **Item 3 (L2, stretch 2 — the first mirror case).** The mower faces **south**. The route needs **Turn right**, which on screen swings it to the LEFT. Suppose the child taps Turn left: the mower swings to face east at (344,242), no ruts appear, and if Forward is tapped it noses into the hedge at (406,242) — bump, hedge pulse, `tone("nudge")`, 1500 ms frozen with the hollow circle on the mower's screen-**upper** flank and the filled square below it, matching the tile corners. The tier drops to **S1** for the rest of the item. Attempt 2: the child taps Turn right twice (a turn is free), the ruts light in (282,242) and hold; F arrives under **arch 3**. The item completes as a non-first-try.
   - **Attempt 2 on any step.** The bump cue again, then `ART.hintRing` around the correct next tile, `ANIM.showMe` at low contrast (alpha 0.2 rising to 0.6). The ring is computed from the world: if the mower faces an open lane cell that leads toward the arbour, Forward; otherwise the turn that would face it.
   - **Attempt 3 on one step (show-me).** The correct next tile pulses at full contrast (alpha 0.3 to 1) until it is tapped; from then on every correct next tile is ringed until the next arch, and the item completes as solved-with-help. **No attempt 4.**
   - **Items 4-6 (L2).** F, Turn left, F to (220,304) — **arch 4** (the corner at (2,2) is taken facing **west**, the rarest case, one of thirteen). F, Turn left, F to (282,366) — **arch 5** (taken facing south). F, Turn right, F to (344,428) — **arch 6**.
   - **Item 7 (L3, stretch 1 — the shortest beat, deliberately).** Turn left (facing south), F to (406,428) — **arch 7**. A single breath between the mirror block and the tail staircase.
   - **Item 8 (L3, stretch 2).** F to (468,428), Turn left, F to (468,366) — **arch 8**.
   - **Item 9 (L3, stretch 3, two corners).** F to (468,304), Turn right, F to (530,304), Turn left, F to (530,242) — **arch 9**.
   - **Item 10 (L3, stretch 3, three corners, ending at the goal).** Turn right, F to (592,242), Turn left, F to (592,180) — **arch 10** blooms — Turn right, and one last Forward rolls the mower **east off the grid edge into the arbour**. `S.cell === arbour` is now true and the session is finished. Item 10's completion **is** the arrival.
6. **Turn-loop cue.** Four turns with no Forward between them makes the Forward tile `ANIM.pulse` once (misconception 4). No clock is involved: the trigger is a count of taps, not elapsed time.
7. **Arrival and Finish.** The hedgehog climbs down into the empty chair (`ART.hedgehogSeated` replaces the mower's rider at the arbour), and `ART.rabbitSeated` and `ART.mouseSeated` `ANIM.celebrate` — an 8° rock, under 1500 ms. `tone("finish")`. The Finish scene is **the same world at the same coordinates** (MISSIONS §9.1 item 6): the whole garden redrawn with all 27 lane cells mown, all ten arches bloomed, the hedge intact around it, and three animals at a table for three. `t("all_done")` at (360, 30) size 44 in zone T (the picker is not drawn on Finish, so the band is free; the world keeps its play coordinates, which is why the title moves out of zone W). `makeButton` `t("play_again")` at (240, 545), `makeButton` `t("menu")` at (480, 545). `GameCore.reportHeight()`. **No score, no dots, no count, no summary of items, nothing recording anything the child got wrong.** The ten mini-corridor thumbnails of the pre-pivot spec are gone: one picture of a finished garden says more than ten thumbnails of disconnected puzzles.

Session about 4-5 minutes (40 commands: 27 forwards at roughly 2.5 s of deliberation each, 13 vehicle-relative turns at roughly 8 s each, plus correction holds).

## Art registry
```js
const ART = {
  /* --- the hero: ONE container, rotated as a whole (angle 0 = north) --- */
  mower:         { kind: "svg", value: LCSArt.get("mower.top"), size: 46, fallback: "🚜" },   // top-down push-mower: surface2 tints, ink 3-px outline, broad front, narrow tail
  hedgehogTop:   { kind: "svg", value: LCSArt.get("hedgehog.top"), size: 34, fallback: "🦔" }, // TOP-DOWN hedgehog: spiky rounded oval in inkSoft tints, snout + two small eyes at the FRONT edge, four short feet. Poses: idle, happy only.
  cutBar:        { kind: "shape", shape: "rect", w: 30, h: 10, fill: "accent" },              // the cutting bar across the mower's front edge at container (0,-16) — THE ONLY accent entry in this file
  markL:         { kind: "shape", shape: "circle", r: 7, stroke: "ink", strokeWidth: 3 },     // hollow circle = LEFT; on the Turn-left tile's corner and on the mower's own left flank at (-24, 2)
  markR:         { kind: "shape", shape: "rect", w: 14, h: 14, fill: "ink" },                 // filled square = RIGHT; on the Turn-right tile's corner and on the mower's own right flank at (24, 2)

  /* --- the garden: three cell states, each with fill AND glyph --- */
  hedge:         { kind: "shape", shape: "roundRect", w: 58, h: 58, fill: "structureSoft", stroke: "structure", strokeWidth: 3, radius: 8 },  // + three 2-px structure lines across
  laneShaggy:    { kind: "shape", shape: "roundRect", w: 58, h: 58, fill: "surface2", stroke: "line", strokeWidth: 2, radius: 8 },            // + three 14-px structure grass tufts standing up
  laneMown:      { kind: "shape", shape: "roundRect", w: 58, h: 58, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },             // + two 1.5-px inkSoft wheel ruts along the cell's lane axis
  wayMark:       { kind: "shape", shape: "line", w: 34, stroke: "inkSoft", strokeWidth: 3 },  // drawn twice, 14 px apart, along the open cell's lane axis: "the way is confirmed", carried by shape not colour

  /* --- the milestones and the destination --- */
  archBare:      { kind: "svg", value: LCSArt.get("arch.bare"), size: 58, w: 58, h: 46, fallback: "⛩" },   // a plain 2-px line hoop over the lane
  archBloom:     { kind: "svg", value: LCSArt.get("arch.bloom"), size: 58, w: 58, h: 46, fallback: "🌸" }, // 3-px structure hoop + five surface blossoms outlined in ink, structure centres
  arbour:        { kind: "svg", value: LCSArt.get("arbour"), size: 80, w: 80, h: 112, fallback: "⛱" },     // trellis, round table, uncut cake, ONE EMPTY CHAIR
  rabbitSeated:  { kind: "svg", value: LCSArt.get("rabbit.happy"), size: 40, fallback: "🐰" },
  mouseSeated:   { kind: "svg", value: LCSArt.get("mouse.happy"), size: 34, fallback: "🐭" },
  hedgehogSeated:{ kind: "svg", value: LCSArt.get("hedgehog.happy"), size: 40, fallback: "🦔" },           // front-facing ART-BIBLE §3 drawing; drawn ONLY at the arbour, where it never rotates
  shed:          { kind: "svg", value: LCSArt.get("shed"), size: 48, w: 48, h: 64, fallback: "🏚" },       // door open; inert scenery

  /* --- the helm --- */
  cmdTile:       { kind: "shape", shape: "roundRect", w: 170, h: 92, fill: "surface", stroke: "line", strokeWidth: 2, radius: 14 },
  arrowForward:  { kind: "text",  value: "↑", size: 40, font: "display", color: "ink" },
  arrowLeft:     { kind: "text",  value: "↰", size: 40, font: "display", color: "ink" },
  arrowRight:    { kind: "text",  value: "↱", size: 40, font: "display", color: "ink" },
  hintRing:      { kind: "shape", shape: "roundRect", w: 182, h: 104, stroke: "structure", strokeWidth: 4, radius: 18 }
};
```
**Mower container.** `ART.mower` at (0, 0); `ART.hedgehogTop` at (0, 4); `ART.cutBar` at (0, -16); `ART.markL` at (-24, 2) and `ART.markR` at (24, 2), both alpha 0 until a correction. Facing is the container's angle: north 0, east 90, south 180, west 270. The two fender marks are hollow-versus-filled AND circle-versus-square, so colour never carries the left/right meaning (§12).

**Coral accounting, one grep and one number: `accent` appears in exactly ONE entry, `cutBar`.** It is the facing cue, and the facing is the one thing on the screen that means something *right now* — which is what §9.2 reserves state coral for. The approved brief put an 8-px `accent` centre in each blossom as well; that is changed here, and deliberately. The blossoms are permanent history marks, and every other mark-that-stays in the corpus is `structure` teal, so teal centres are both more consistent and cheaper: they leave the single coral on the part of the screen the child must read. The hedgehog is drawn in `inkSoft` and `surface2` tints, so the §10.1 warm-body clause does not bind here and no identity accent is spent.

**Art gate, before a line of code is written.** The top-down drawing is the one genuine ART-BIBLE tension in this design. §3 specifies front-facing stacked circles with large eyes and a five-pose set, and a container rotated to 180° renders a front-facing character **upside down** — and this game's hardest teaching case *is* the 180° case. The pre-pivot spec ships the identical unsolved defect (`ART.robot` was an emoji in a rotating container), and it is exactly the class the fox rebuild bought: *nobody ever looked at the art.* Resolution: `mower.top` and `hedgehog.top` are authored as top-down drawings with the pose set collapsed to `idle` and `happy` only, and gated by `node _tools/art-sheet.js left-right-turn mower,hedgehogTop` at 48 / 96 / 192 / 384, **read by a person before the visual critic runs**. A pleasant side effect: with no `oops` pose available, "the character is never the consequence" becomes structurally impossible to violate rather than merely disciplined.

## Animation registry
```js
const ANIM = {
  pop:       { scale: 1.12, duration: 140, ease: "Back.Out", yoyo: true, trigger: "a command tile is tapped" },
  roll:      { duration: 340, ease: "Sine.InOut", trigger: "the mower advances one cell (x,y set at call, along the facing)" },
  swing:     { angle: "+=90", duration: 220, ease: "Sine.InOut", trigger: "Turn right; Turn left uses angle '-=90'" },
  bump:      { x: "+=12", duration: 90, ease: "Sine.Out", yoyo: true, trigger: "Forward into a hedge or off the grid; the axis and sign follow the facing (y for north/south)" },
  pulse:     { scale: 1.1, duration: 300, ease: "Sine.InOut", yoyo: true, repeat: 1, trigger: "the bumped hedge; the Forward tile after four turns with no Forward; the Forward tile once on item 1 (R4)" },
  rutFade:   { alpha: 0, duration: 600, ease: "Sine.In", trigger: "ART.wayMark in the open cell the mower now faces — S2 only; at S1 the ruts hold at alpha 1 until the mower moves; at S3 they are not drawn" },
  appear:    { alpha: 1, duration: 200, ease: "Back.Out", trigger: "the fender marks after a bump (from alpha 0); a bare arch on build" },
  fadeOut:   { alpha: 0, duration: 300, ease: "Sine.In", trigger: "the fender marks after the 1500 ms correction hold" },
  bloom:     { scale: 1.08, duration: 380, ease: "Back.Out", yoyo: true, trigger: "an arch as the mower passes under it; the roses stay open afterwards" },
  showMe:    { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "ART.hintRing on the correct next tile (from alpha 0.2; capped at 0.6 on the 2nd bump, full on the 3rd)" },
  celebrate: { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the seated friends at the arbour on arrival" },
  breathe:   { scale: 1.02, duration: 3000, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "the seated friends on the Boot and Finish screens ONLY (ART-BIBLE §6); never during play" }
};
```
No flashing: `showMe` runs at 1 Hz, `bloom` fires once, `celebrate` is four swings and stops. Every entry above is wrapped on a **container**, never applied to a raw `kind:"svg"` object (ART-BIBLE §9.3: `preloadArt` rasterises at 2x and `drawArt` compensates with an object scale of 0.5, so tweening absolute `scale` on the art itself renders it at double size with no error and no warning).

## Screen layout
```
y   0 +--------------------------------------------------------------+
      | [lang 16,16]                                                 |  zone T  0-56
 56   +--------------------------------------------------------------+
      |  c=  0    1    2    3    4    5    6    7    8               |
      |  x= 96  158  220  282  344  406  468  530  592               |
118   |  r0 [H ] [.A1] [.  ] [.  ] [.  ] [H ] [H ] [H ] [H ]         |
180   |  r1 [.  ] [H ] [H ] [H ] [.A2] [H ] [H ] [H ] [.A0] --> ,--. |  zone W
242   |  r2 [.  ] [H ] [.  ] [.A3] [.  ] [H ] [H ] [.A9] [.  ]  |ARB| |  56-480
304   |  r3 [.  ] [H ] [.A4] [H ] [H ] [H ] [.  ] [.  ] [H ]    `--' |
366   |  r4 [.  ] [H ] [.  ] [.A5] [.  ] [H ] [.A8] [H ] [H ]        |
428   | ,-.[M  ] [H ] [H ] [H ] [.A6] [.A7] [.  ] [H ] [H ]          |
      | shd   grid x 67-621, y 89-457      arbour (664,180) 80x112   |
480   +--------------------------------------------------------------+
      |   [ ↰  ]        [  ↑   ]        [ ↱  ]                       |  zone H
      |   [Left]        [Forward]       [Right]                      |  480-620
      |  (170,540)      (360,540)      (550,540)   170x92            |
620   +--------------------------------------------------------------+
```
Legend: `H` hedge, `.` lane cell, `A1`-`A0` the ten arches in route order (A0 is the tenth, on the exit cell), `M` the mower's start cell, `shd` the potting shed, `ARB` the arbour. Garden A shown; B and C use the same geometry with different lane cells. Fixed layout, `Scale.FIT`, never scrolls or reflows. Zone T carries the language picker and nothing else — **no row of progress dots anywhere on the play surface; progress is the mown lane, the bloomed arches and the shrinking distance to the arbour.**

## Visual specification
- Background `THEME.colour.bg`. Zone T holds the language picker at (16, 16) and nothing else.
- **Garden:** 54 cells drawn on the 62-px pitch — 27 `ART.hedge`, and 27 lane cells that begin as `ART.laneShaggy` and become `ART.laneMown` the moment the mower stands on them, permanently. A mown cell is never redrawn shaggy by any code path (this is the RATCHET RULE expressed as a drawing rule).
- **Mower container** at its cell centre, angle per facing; the art is drawn at 46 px so the 30 x 10 `ART.cutBar` at container (0, -16) stays inside the 58-px cell, and the fender marks at container x = ±24 stay inside it too.
- **Arches:** ten `ART.archBare` hoops at the coordinates in `## World`, drawn *behind* the mower container so it passes under them; each is replaced once by `ART.archBloom` and never changes again.
- **Arbour** `ART.arbour` at (664, 180), 80 x 112, spanning x 624-704 and y 124-236 — clear of the grid's right edge at 621 and 16 px clear of the stage edge. `ART.rabbitSeated` at (650, 196) and `ART.mouseSeated` at (678, 200) inside it from the first frame; the third chair stays empty until arrival, when `ART.hedgehogSeated` is drawn at (664, 208).
- **Shed** `ART.shed` at (40, 428), 48 x 64, spanning x 16-64 — clear of the grid's left edge at 67.
- **Helm:** three `makeTile` 170 x 92 with `ART.cmdTile` tokens at (170, 540), (360, 540), (550, 540). Arrow glyph at tile (0, -18) — `ART.arrowLeft`, `ART.arrowForward`, `ART.arrowRight` in that left-to-right order. Word label at tile (0, 26) in `THEME.font.body` 24 px `THEME.colour.ink`, `wordWrap: { width: 158 }`, fit-to-width (the library shrinks long words). `ART.markL` at (-62, -28) on the Turn-left tile; `ART.markR` at (62, -28) on the Turn-right tile — the same two glyphs that appear on the mower's flanks, so the link tile-to-vehicle-side is shown and never explained. Tab order Left, Forward, Right, matching the screen order; Enter or Space taps.
- **`ART.hintRing`** is centred on a tile (182 x 104 around a 170 x 92 tile). **`ART.wayMark`** is drawn twice, 14 px apart, centred on the open cell the mower now faces.
- **Tap floors:** tiles 170 x 92, floor 56 for band 6-8, so 92 clears it by 36. Gaps between tiles are 20 (floor 12). Nearest tile edge to a stage edge is 85 (floor 16). The garden cells are not tappable and are never focusable; tapping a cell does nothing.
- **Text on the play screen: three English words**, the tile labels (F-42's budget is 8 including the premise; the premise costs zero words because the empty chair and the shaggy lane carry it, leaving 1.6x headroom for `Geradeaus`, `eteenpäin` and `vasemmalle` on a tile 42 % wider than the pre-pivot spec's).
- **Colour:** `accent` appears exactly once on the screen, as the mower's cutting bar. Nothing else is coral. The "way is open" cue is deliberately colour-free (two `inkSoft` ruts).

## Content
Language-neutral. Cells are (column, row) with (0,0) top-left, columns 0-8, rows 0-5. Facing: U up/north, D down/south, L left/west, R right/east. Every cell not listed on a lane is a hedge. Each garden is a **simple path with no branches and no self-touches**, so exactly one turn direction is open at each corner and the listed route is the unique shortest one; that is what the hint recomputes against. The mower starts on the first cell of the lane facing U in all three gardens, and every lane exits east from (8,1) into the arbour, so `mission.goal` has one constant coordinate for the whole catalogue of gardens.

**The garden spine — the property every garden must satisfy** (`node _tools/check-lane.js <garden>`; all three measured below): 27 cells, 27 distinct, **0 self-touches**, all in bounds; 13 corners; a straight north-facing opening run of at least 4 cells; at least 3 turns taken while facing south and at least 1 while facing west; the majority of the south-taken turns after the halfway cell; at least one same-direction pair and one tail staircase in the turn sequence; the last cell (8,1); a turn sequence shared with no other garden.

**GARDEN A** — lane, in route order:
(0,5) (0,4) (0,3) (0,2) (0,1) (0,0) (1,0) (2,0) (3,0) (4,0) (4,1) (4,2) (3,2) (2,2) (2,3) (2,4) (3,4) (4,4) (4,5) (5,5) (6,5) (6,4) (6,3) (7,3) (7,2) (8,2) (8,1)
Turn sequence **R R R L L R L L R L R L R**; facings N 4 / E 5 / S 3 / W 1; opening run 6 cells; south-taken turns at cells 12, 16, 19 (2 of 3 after the halfway cell).
Arches at route cells **7, 11, 13, 15, 17, 19, 20, 22, 25, 27** — stretches of **6, 4, 2, 2, 2, 2, 1, 2, 3, 3** forwards, summing to 27.

**GARDEN B** — lane, in route order:
(0,5) (0,4) (0,3) (0,2) (0,1) (1,1) (2,1) (2,2) (3,2) (4,2) (4,1) (4,0) (5,0) (6,0) (6,1) (6,2) (6,3) (5,3) (5,4) (5,5) (6,5) (7,5) (7,4) (8,4) (8,3) (8,2) (8,1)
Turn sequence **R R L L R R R L L L R L R**; facings N 4 / E 5 / S 3 / W 1; opening run 5 cells; south-taken turns at cells 8, 17, 20 (2 of 3 after halfway); tail staircase at cells 22, 23, 24.
Arches at route cells **5, 9, 12, 14, 17, 19, 21, 23, 25, 27** — stretches of **4, 4, 3, 2, 3, 2, 2, 2, 2, 3**, summing to 27.

**GARDEN C** — lane, in route order:
(0,5) (0,4) (0,3) (0,2) (1,2) (2,2) (3,2) (3,1) (3,0) (4,0) (5,0) (5,1) (6,1) (6,2) (6,3) (5,3) (4,3) (4,4) (4,5) (5,5) (6,5) (7,5) (7,4) (8,4) (8,3) (8,2) (8,1)
Turn sequence **R L R R L R R L L L R L R**; facings N 4 / E 5 / S 3 / W 1; opening run 4 cells; south-taken turns at cells 12, 15, 19 (2 of 3 after halfway); tail staircase at cells 22, 23, 24.
Arches at route cells **4, 7, 10, 12, 15, 17, 19, 22, 24, 27** — stretches of **3, 3, 3, 2, 3, 2, 2, 3, 2, 4**, summing to 27.

**Levels are stretches of the route, not a shuffled pool.** In a persistent world the content cannot reshuffle, so the ladder is authored into the terrain. For Garden A: **L1 = items 1-2** (long runs, one corner each, taken facing north then east — the screen-aligned cases); **L2 = items 3-6** (two forwards each; every corner taken facing south, west, south then east — the mirror block, and where the facing difficulty peaks); **L3 = items 7-10** (seven corners across eight forwards, including two- and three-corner stretches — harder by turn **density** and by chaining, not by facing). Gardens B and C carry the same three-part shape at their own cell indices.

**The arch positions are irregular by construction** and are not a row: Garden A places two of them adjacent along the bottom edge (344,428) and (406,428) and then jumps 62 px up and 62 px right; Garden B and C place theirs on entirely different cells. No arch position is ever counted, labelled or numbered anywhere in the game.

## Rules
- **Item count:** 10. An item is one stretch of lane from the mower's current position to the next arch; item 10 ends at the arbour itself, so the last item's completion **is** the finish.
- **Difficulty progression:** the route is the ladder and the child climbs it by travelling — L1 (long runs, screen-aligned corners), L2 (short stretches, the south- and west-facing mirror corners), L3 (the staircase: two- and three-corner stretches). There is no pool to draw from and nothing is shuffled per item, because in a persistent world the stations cannot move.
- **Adaptation:** the **support tier** moves, not the content. Three tiers, starting at **S1**. Two consecutive first-try items raise the tier by one (S1 to S2 to S3, that is *less* support); any bump, or two consecutive non-first-try items, drops it by one (floor S1), and any bump drops it to S1 for the remainder of the current item. **S1** — after a turn that faces an open lane cell, `ART.wayMark` paints there and **holds** until the mower moves. **S2** — the ruts paint and fade after 600 ms (`ANIM.rutFade`). **S3** — no ruts at all; the facing must be read off the cutting bar and the snout. The current item is never abandoned, and the turn-loop cue and the fender-mark correction fire at every tier.
- **What happens on a correct answer:** a Forward into an open lane cell rolls the mower one cell (`ANIM.roll`), mows the cell it enters, and mows it permanently; a turn that faces an open cell paints the ruts per tier. Passing under an arch completes the item: the arch `ANIM.bloom`s and stays bloomed, `tone("correct")`, `GameCore.showPraise` with the next praise key from ["well_done", "great_job", "excellent", "you_did_it", "keep_going"]. **The world is not rebuilt, the mower does not move, and nothing pauses** — the next item has already begun.
- **What happens on a wrong answer** (a "wrong answer" here is a Forward into a hedge or off the grid; a turn is never wrong and never an attempt):
  - *Own left/right swapped:* `ANIM.bump`, the hedge `ANIM.pulse`s, `tone("nudge")`, then 1500 ms frozen with every tile disabled while `ART.markL` and `ART.markR` show on the mower's own flanks (hollow circle left, filled square right, matching the tile corners).
  - *Vehicle-relative mirror (the mower facing sideways or down):* the same cue; the fender marks rotate with the container, so the hollow circle sits on the mower's own left wherever that lands on screen.
  - *Forward taken as "up the screen":* the same cue; the bump is against whatever the cutting bar was pointing at.
  - *Turning without moving:* no bump at all; after four turns with no Forward the Forward tile `ANIM.pulse`s once.
  - *Repeated Forward:* each bump is an attempt; see Retry behaviour and the guard below.
- **Retry behaviour:** attempts are counted **per step**, not per item. Attempt 1 unaided. Attempt 2 (2nd bump on the same step): the bump cue again plus `ART.hintRing` on the correct next tile at low contrast (`ANIM.showMe`, alpha 0.2 to 0.6). Attempt 3: the ring goes to full contrast (alpha 0.3 to 1) and holds until that tile is tapped; from then on every correct next tile is ringed until the next arch, and the item completes as solved-with-help. **No attempt 4.** An item with any bump never counts as first-try.
- **ANTI-BRUTE-FORCE GUARD — declared by name, because P1's tile re-shuffle is impossible here.** A station that jumps when you knock on it destroys the world's constancy, which is the thing that makes it a place; and the three tiles are Forward, Left and Right, fixed by meaning, so shuffling them would be monstrous. The declared replacement is two guards.
  - **THE ONE-WAY WHEEL.** Every Forward is a commitment: it lays mown lane and it cannot be un-laid. An item is **first-try only if the mower made exactly as many forwards as the stretch is long and took zero bumps** — so a retreat back over already-mown lane disqualifies an item just as a bump does. This is LAW §6's "commitment is a one-way door", sharpened past *no wrong move* to *no wasted move*, and it is legible, because the wheel count is a property of the route and the route is drawn on the ground. A guesser therefore never earns a first-try, the support tier never rises, and the scaffold stays maximal. **Nothing is deducted, because there is nothing to deduct.**
  - **THREE GARDENS.** The lane is one of three authored gardens chosen at session start, all obeying the spine in `## Content` and all carrying different turn sequences. A remembered sequence is worth nothing next session. This is LAW §6's "the candidate set varies" applied at the only granularity this game has: the candidates cannot vary per item, so the *route* varies per session.
  - *One honest exposure.* At S1 the ruts hold in the open cell ahead until the mower moves, so a child can turn until ruts appear and then drive — succeeding without reasoning. That is what a scaffold *is*, it is why S1 exists, and it fades: at S3 there are no ruts and the facing must be read off the cutting bar. The pre-pivot spec had no equivalent, because its `openGlow` fired at every level unconditionally, so this design is strictly more rigorous at the top of the ladder, not less.
- **THE RATCHET RULE, enforced as code paths that do not exist.** No path redraws a mown cell as shaggy. No path closes a bloomed arch. No path moves the arbour, empties it, or makes anyone leave it. No path moves the mower except a Forward the child tapped. Reversing along the lane is permitted, free, and un-mows nothing. **No position is ever a dead end** — the lane is a simple path and the mower can always turn round.
- **The character is never the consequence.** An error changes the apparatus (a shivering hedge, two fender marks) and never the creature. With the pose set collapsed to `idle` and `happy` there is no sad drawing in the file to reach for.
- **Finish condition:** the mower arrives at the arbour, that is, `S.cell === arbour` after the last Forward rolls it east off the grid. Ten items. No clock, no score, no session limit, no way for a session to end other than by arriving.

## Strings
- `GameCore.t()` keys: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- Game-specific (`STRINGS.en`, read through `S(key)`, authored in all 11 locales at build time per BUILD-CONVENTIONS §17): `title` = "The Picnic Lane"; `forward` = "Forward"; `left` = "Left"; `right` = "Right".
- The three tile words are the only text on the play screen; every tile also carries an arrow glyph from ART and the Left/Right tiles carry the fender-mark glyph, so a non-reader can play. The title appears on the Boot screen only.
- **The English is a source to be audited, not a target to be translated.** Every locale panel receives the English strings *and this spec's naming* and is asked to report defects in them. Two nouns need per-locale checking before they are written: whatever each locale calls the **push-mower** and whatever it calls the **arbour** must be chosen against the shipped lexicon of the sibling games, not against English, and the Scandinavian definite forms must be read aloud before they ship.

## Sound
`tone("tap")` on every command tile tap; `tone("tap", k)` as the mower enters the k-th cell of the current stretch, so a long run is audible as a rising line (F-213); `tone("correct")` when an arch blooms; `tone("nudge")` on a bump; `tone("finish")` once on arrival. Silent under `?sound=off`; no audio files, nothing spoken. The cutting bar, the wheel ruts and the fender marks carry every meaning the sound carries, so a muted session loses nothing.

## Testing checklist
- [ ] Works in all 11 languages (Start, All done, Play again, Menu, praise and the three tile words change with the picker; long words such as the Finnish for "forward" shrink to fit the 170-px tile).
- [ ] Works at narrow width (400-px iframe: the whole 9 x 6 garden, the arbour, the shed and the three tiles are visible; tiles remain separate targets; the mower's facing is unambiguous in a still screenshot at all four orientations).
- [ ] Keyboard operable (Tab cycles Left, Forward, Right in screen order; Enter and Space tap; the garden cells are never focusable; every one of the three tiles moves the world when reached by keyboard alone).
- [ ] Never auto-starts.
- [ ] No losing state (twenty Forward taps into a hedge still end with the item completing via the ringed tiles, and the session reaches All done; driving backwards for a hundred taps also reaches All done).
- [ ] **MISSION.** `mission.goal` (the arbour) is drawn from the first frame at a constant (664, 180) and changes only at arrival; `mission.hero` changes position on at least 9 of the 10 items; deleting `mission.goal` and `mission.hero` makes the game unable to complete an item (`mutate-mission.js`, Deletion 2).
- [ ] **RATCHET.** Driven with a wrong answer on every item, no mown cell ever redraws shaggy, no bloomed arch ever closes, the arbour never empties, and the mown-cell count never decreases across the session.
- [ ] **INSTANT-CUT (Deletion C).** With `ANIM.roll` and `ANIM.swing` patched to `duration: 0`, the item log is **identical** — same 27 forwards, 13 turns, refusals, ten blooms and finished garden. Measured ACT budget for a clean session: 27 x 340 ms + 13 x 220 ms + 10 x 380 ms = **15.9 s**; with a bump and its 1500 ms hold on every item, **32.9 s** — both under R1's 60 s ceiling.
- [ ] **FREEZE (F-42).** At every decision point of a full `qa-game` session, if any target is enabled the running tween count is zero — including through the 1500 ms correction hold, where all three tiles are disabled. The only motion the child did not cause is R4's single self-demonstration on item 1.
- [ ] **PERSISTENCE.** The mower's position at the start of item k+1 equals its position at the end of item k for every k; the world is built once and never rebuilt; no item resets the facing.
- [ ] Forward moves the mower one cell in the direction its coral cutting bar points, whatever that direction is on screen; Forward into a hedge makes it bump and the hedge shiver, and the mower does not move.
- [ ] A hollow circle and a filled square appear on the mower's two flanks for about a second and a half after a bump, and they rotate with it — facing south, the hollow circle is on the screen's right.
- [ ] The hollow circle on the mower's left flank is the same glyph as on the Turn-left tile's corner; the filled square matches the Turn-right tile.
- [ ] Turn left rotates a quarter turn anticlockwise and Turn right clockwise; a turn that faces an open lane cell paints two wheel ruts there; a turn facing a hedge paints nothing; a turn is never refused and never counts as an attempt.
- [ ] Four turns with no Forward between them make the Forward tile pulse once.
- [ ] Every lane cell the mower stands on is mown and stays mown; every arch it passes under blooms and stays bloomed; the finish screen shows all 27 cells mown, all ten arches bloomed and three animals at the table.
- [ ] The finish screen asserts **properties** (goal reached, 27 mown cells, 10 bloomed arches, 3 seated animals), never a pixel match against a fixed reference — the finish state is content-dependent because the child may have wandered (R6).
- [ ] Two clean items in a row make the wheel ruts start fading instead of holding; a third clean pair removes them; any bump brings them straight back.
- [ ] A session driven with a retreat over already-mown lane completes normally and is never scored as first-try.
- [ ] The finish screen shows no score, no count and no row of dots.
- [ ] `git diff` shows 0 lines changed in `_lib/game-core.js`, `_lib/theme.js` or any other shared file.
- [ ] `node _tools/art-sheet.js left-right-turn mower,hedgehogTop` was rendered at 48 / 96 / 192 / 384 and read by a person before the visual critic ran; the top-down hedgehog reads as a hedgehog at 384 and as a directed shape at 48.
- [ ] With `?sound=off` nothing is audible.
