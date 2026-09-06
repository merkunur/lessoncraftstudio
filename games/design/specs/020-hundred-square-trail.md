# 020 — Hundred-Square Trail

## Identity
- Slug: `hundred-square-trail`
- Subject / topic: Mathematics / place on the hundred square: 1 more, 1 less, 10 more, 10 less
- Age band: `6-8`
- Interaction pattern: `P6` — build on a grid (the hundred square is the grid; each item is one tap that selects the cell the snail moves onto; the trail of reached cells is what the child builds)
- Frame: THE CROSSING
- Estimated build size: ~620 lines

Shared contract: `catalogue/BUILD-CONVENTIONS.md` §1-§14 (this spec declares a taller stage, 720 × 720, per §2, and states two measured deviations in Visual specification). Pattern contract: `catalogue/PATTERNS.md` P6 ("hundred-square skip-count trails"). Frame contract: `design/MISSIONS.md` FRAME 1 — THE CROSSING, and `design/GAME-DESIGN-LAW.md` (moving is solving; the Single-State Law; the three deletion tests; the ratchet rule).

Redesign note, 2026-09-06: the pre-pivot spec was already the best-behaved game in the corpus — the snail moved, its position persisted, and the trail stayed all session — and MISSIONS.md §3 names it as the one-line proof that the change is cheap. What it lacked was L3, a **visible destination**, and what it carried that it should not was a worksheet tail: a prompt row with a start numeral, an operation icon and a "?" box. Both are fixed here. The hundred square is no longer a chart the child reads; it is **the path, folded**, and the game draws the fold.

## Learning
- Objective: Finds and taps the cell on a hundred square that is 1 more, 1 less, 10 more or 10 less than the lit cell, including moves that cross a row boundary.
- Prerequisites: Reads numerals to 100; counts by tens (game 016). No reading beyond numerals and a plus/minus sign.
- Curriculum links: F-108 (digits as independent numbers; zero placeholder), F-109 (skip counting by tens tied to structure — "hundred-square trail" is the named response), F-21 ("+/− within 100 by mental strategies" and "number line to 100" in all twelve systems), F-31 rows "Count to 100; number line to 100" (conservative 7-8) and "+/− within 100, mental" (7-9) → 6-8 (US 1.NBT.C.5 "given a two-digit number, mentally find 10 more or 10 less"; England Y1-2 "count in tens", "10 more and 10 less"; Germany Klasse 2 "Hunderterfeld, Nachbarzehner"; France CE1 "tableau des nombres"; Netherlands groep 4 "honderdveld"; Spain 1º ciclo; Brazil EF02MA05; Sweden åk 1-3; Finland grades 1-2).
- Common misconceptions (F-108, F-109), each with this game's response:
  1. **+10 done as +1 (tapping the cell to the right instead of the cell below).** Response: the tapped cell tips and the snail's reach does not complete; the world then freezes and the correction **counts the ten-rod out along the path** — `ART.stepMark` takes ten single steps forward from the snail's cell at 80 ms each, right along the bed, out through the fold and back in one bed down, and settles on the correct cell, which outlines. Only then does `ART.colBand` wash the snail's column behind it. The child gets both readings in one 2800 ms correction: *ten steps forward*, and *the same column, one bed down*, with the numerals in that column reading 34, 44, 54. This replaces the pre-pivot single `slideDown`, which asserted "one row down is ten more" with a stripe instead of showing why.
  2. **Changing the wrong digit (34 + 1 → 44; 34 − 10 → 33).** Response: the same machinery with one step instead of ten. For a cube reach `ART.stepMark` takes one step along the path and `ART.rowBand` washes the bed, so the tens digit is seen to hold constant along the bed; for a rod reach `ART.colBand` washes the column and the ones digit holds. The band shows which digit changes because the other digit stays the same along the line it lights — unchanged in substance from the pre-pivot response, re-sited on a path the snail actually walks.
  3. **Row-boundary confusion (39 + 1: "the next cell is off the edge"; 40 − 1: looking at 30).** Response: NOTE — the two examples in this diagnosis are wrong under the game's own mapping and always were. With `c = (n − 1) mod 10`, cells 39 and 40 are in the **same** bed, so 39 + 1 crosses nothing; the pre-pivot Content rule had it right ("+1 is rejected on a cell ending in 0 and −1 on a cell ending in 1") and its prose contradicted it. The true boundary cases are **+1 from a cell ending in 0 (40 → 41) and −1 from a cell ending in 1 (41 → 40)**, and this game uses those. The response is now the strongest of the four: the fold is **permanent world furniture** at all nine bed ends, drawn in `ART.foldLink` from tap one rather than conjured as a transient hint; **every session's last leg goes through it**; and the correction runs `ART.stepMark` out of one edge and in at the other along the connector, with the two cells outlining in turn and `ART.rowBand` washing both beds. The child ends every session with the fold drawn permanently into their own trail, in `ART.foldLinkLit`.
  4. **Digit-order reading of the target (looking for 43 when 34 is lit — de/nl/da word order).** Response: the start cell is still always LIT (the child never has to find it), and it is now improved three ways. A living creature stands on it, so it is unmistakable at 400 px. The numeral is drawn in the cell's **lower band and is never occluded** — the pre-pivot layout stacked a 36 px snail on a 20 px numeral at the same centre and would have shipped them overlapping. And every correction **runs from the snail**, re-anchoring the start each time it plays. The sign and size of the move ride on `ART.reachPlate`, which travels with the snail instead of sitting in a prompt row.

## Mission
**Mission, as the child would say it.** *Get the little ones home.*

**Hero.** The garden snail — roster entry `snail`, and this is its **first drawing**. The pre-pivot spec shipped `{ kind: "emoji", value: "(snail)" }`, which ART-BIBLE §1 bans on the play surface, so it must be redrawn as inline SVG and read on `art-sheet.js` at 48 / 96 / 192 / 384 before anything else in this build.

It is a **parent** snail. Its two little ones are out on the garden and it is fetching them home to the burrow, where the youngest is already in the doorway waiting. It crawls one cell at a time along the hundred-step path and lays a silver trail it never lifts. Poses used: `idle` (the whole DECIDE state), `act` (the reach), `happy` (a little one climbs aboard, and the finish). There is deliberately **no `oops` pose in this game at all** — the character is never the consequence (GAME-DESIGN-LAW §3.0).

**The want, legible in one still frame with zero words.** A burrow doorway with one little snail in it looking out; two little snails sitting out on the garden; the parent partway along a silver trail that stops where it is standing. The lack reads instantly — **three of this family are not home** — and the trail shows exactly how far the parent has got. Nothing in the frame is a lack that can get worse: the little ones are not lost, not in danger and not going anywhere; they are simply out, and the burrow is simply not full yet.

**Destination.** The burrow, on a round-ten cell, at a constant (x, y) for the whole session (gate M1). It changes only at the finish (Device 1, the waiting party: it must never react to a correct answer, which would make it an approval meter).

**The single state variable.** **`S` = the cell the parent snail is standing on, 1-100.**

- *Mathematical reading:* the number the snail is on — how far along the hundred-step path it has come.
- *Physical reading:* where the snail is in the garden.

Goal predicate: `S === HOME` with both little ones aboard. Transition function: `S' = S ± 1` or `S ± 10`. The child's tap selects the transition. The correctness check, in one line, and **there is no `answer` field anywhere in this game**:

```js
accept = (tappedCell === hero.cell + reach);   // reach in {+1, -1, +10, -10}, the reach the snail is carrying
```

The pre-pivot `ART.targetBox` and `ART.targetText` ("?") are **deleted**, together with the prompt row that held them. Under THE CROSSING there is no separate answer object on the screen — this is the same deletion 008 frog-hops takes. The answer is which cell the snail is standing on when the move is over, and that cell prints its own number.

**The isomorphism — the hundred square is not a chart, it is the path, folded.** Ten garden beds of ten steps each, laid end to end, with the end of every bed joined to the start of the next by a **visible connector at the board's edge**. That single change makes all four operations physical facts about walking:

- `+1` — **one step forward** along the path.
- `+10` — **ten steps forward in one reach.** Ten steps is exactly one bed, which is *why* it lands in the cell directly below in the same column. F-109 ("skip counting by tens tied to structure") stops being a claim and becomes the geometry.
- `−1`, `−10` — the same, backward along the path.

The snail carries the reach it is about to make, **drawn out of the same material as its trail**: one trail unit (`ART.reachCube`, a single 12 × 12 `structure` square) or a ten-block (`ART.reachRod`, ten of that same square in a 5 × 2 arrangement — the house base-ten idiom, countable, and unambiguously ten of the cube at any scale). The rod IS ten steps of trail. Nothing has to be said.

**Where the reach comes from is what makes this a game rather than an instruction sheet.** It is not drawn from a pool and printed on a card. It is computed, every item, as *a step that strictly reduces the true folded distance from the snail to the little one it is currently fetching* — on the folded metric, so the fold is a genuine shortcut and the route planner finds it. **The goal generates every single item.** Delete the goal and there is no direction, no sign, no reach, and no item to pose.

Moving is solving in the strict sense GAME-DESIGN-LAW §2.3 asks for. The child is not asked what 33 + 10 is; the child is asked to **put the snail where a ten-step reach lands**, and the world takes the footing or it does not. `answer = f(character.position)` — the commit handler compares the tapped cell to `hero.cell + reach`, both of which are positions, and the snail's new coordinate IS the answer. Its cell prints the numeral, so the abstract notation sits in the same frame as the fiction at the moment of the answer (GAME-DESIGN-LAW §2.5, integrated never concealed). This is emphatically not a word problem: there is no story to decode, there is a rod and a sign.

**The mark that stays.** The silver trail. One segment per solved item, twelve by the end, including the segment that runs out of one edge and in at the other. It is the object itself in its new state, never a token awarded for reaching it — F-44's "path filled", verbatim.

## World
**Stage 720 × 720**, `Scale.FIT`, static camera, no scrolling. The taller stage is declared under BUILD-CONVENTIONS §2 and is unavoidable: a hundred square at the band 6-8 tap floor (56 px) needs 596 px of grid, which cannot exist in a 364 px zone W. The MISSION LAYOUT (MISSIONS.md §1.4) maps onto it as:

```
y   0 ┌────────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                   │  zone T   0-56  chrome only
 56   ├────────────────────────────────────────────────────────────────┤
      │  o-    1   2   3   4   5   6   7   8   9  10  ─┐               │
      │  └─   11  12  13  14  15  16  17  18  19 [20] ◄┘  burrow       │  zone W  56-720
      │       21  22  23  24*  25  26  27  28  29  30                  │  THE WORLD, 664 px,
      │       31  32  33►  34  35  36  37  38  39  40                  │  persistent all session
      │       41  42  43  44  45  46  47  48  49  50                   │
      │       51  52  53  54  55*  56  57  58  59  60                  │
      │       61 ...                                                   │
      │       ...  91  92  93  94  95  96  97  98  99 100              │
720   └────────────────────────────────────────────────────────────────┘
                                            zone H — DOES NOT EXIST
```

`►` the parent snail · `*` a little one out on the garden · `[20]` the burrow · `o-` / `└─` one of the nine fold connectors.

**The board.** 100 cells, `ART.cell`, 56 × 56, radius 8, pitch 60. Cell *n*: `c = (n − 1) mod 10`, `r = floor((n − 1) / 10)`, centre **x = 90 + 60c** (90 … 630), **y = 122 + 60r** (122 … 662). Board extent x 62-658, y 94-690. Tap target 56 px = the band 6-8 floor exactly.

**The fold — nine connectors, drawn from tap one, inert, zero interactive elements.** For each seam *r* = 0 … 8, with `y_r = 122 + 60r`, `y_mid = 152 + 60r`, `y_next = 182 + 60r`, one `ART.foldLink` is drawn as a single 720 × 60 scenery element centred at (360, y_mid). It carries, in `line` colour at 3 px: a stub leaving the right edge of the bed at (658, y_r), running to (684, y_r), a quarter arc down to (690, y_r + 6), straight down to (690, y_mid − 6), and ending in a 6 px ring centred at (690, y_mid); and its mirror on the left — a matching ring at (30, y_mid), straight down to (30, y_next − 6), a quarter arc to (36, y_next), and in to (62, y_next). **The two rings sit at the same height and are one connection.** The element has ink only outside x 62-658, so it never crosses a cell. A seam the snail has traversed is redrawn permanently in `ART.foldLinkLit` (`structure`).

**The route family — six gardens, every one exactly 12 steps.** Fixed at Play start, all of it visible from the first frame. With `cS = 2` and `rS` drawn at random from {2 … 7}: start = 10·rS + 3, little one A = 10·(rS + 2) + 5, little one B = 10·(rS − 1) + 4, burrow = 10·(rS − 1).

| rS | start | little one A | little one B | burrow |
|---|---|---|---|---|
| 2 | 23 | 45 | 14 | 10 |
| **3** | **33** | **55** | **24** | **20** |
| 4 | 43 | 65 | 34 | 30 |
| 5 | 53 | 75 | 44 | 40 |
| 6 | 63 | 85 | 54 | 50 |
| 7 | 73 | 95 | 64 | 60 |

Three legs of four, and the leg shapes are the teaching:

- **Leg 1, down-and-right** (33 → 55): the reducing reaches are two `+10` and two `+1`; the level picks the order.
- **Leg 2, up-and-left** (55 → 24): three `−10` and one `−1`.
- **Leg 3, the run and the fold** (24 → 23 → 22 → 21 → **20**): four `−1` steps, the last one across the fold — `21 − 1 = 20`, out of the left edge of one bed and in at the right end of the bed above. **The burrow is always at a round ten, and the last step of every session is the decade boundary.**

All four operations appear in every session; every step strictly reduces the true folded distance to the current target (the ratchet, satisfied by construction); and the total is 12 whatever order the level chooses, because within a leg the folded metric is Manhattan.

**Canonical coordinates for rS = 3.** Hero on cell 33 (c = 2, r = 3) → cell centre **(210, 302)**. Little one A on 55 (c = 4, r = 5) → **(330, 422)**. Little one B on 24 (c = 3, r = 2) → **(270, 242)**. Burrow on cell 20 (c = 9, r = 1) → cell centre **(630, 182)**, the arch drawn at **(644, 156)** in the cell's occupant band so the numeral 20 stays readable beneath it. The burrow therefore sits at the head of a fold connector, which is deliberate: the last step of the session comes home **through** that connector.

**The active waypoint carries the one state coral.** `ART.waypointRing`, a 4 px `accent` ring 52 × 52, sits on the cell the snail is currently fetching from — little one A, then little one B, then the burrow — and on **nothing else on the screen**. Every other cue in the game is `structure` or `structureSoft`, so coral means exactly one thing all session: *this is where we are going next*.

**Zone H is EMPTY. It does not exist on this stage** — the world is the hand, exactly as THE CROSSING specifies. Every control is the garden itself.

**F-69 reading, stated in the open (MISSIONS §9.4).** The hundred square is **ONE instrument, not 100 candidates** — a coordinate space the child learns once and then reads, like a keypad or a dial, not a set of alternatives each of which must be weighed. Counted that way the screen holds **one** interactive element (the board), plus the hero, two little ones and a burrow as non-interactive world, and the fold connectors as inert scenery. This is not a new conflict: the pre-pivot spec already shipped 100 tappable cells and passed review, exactly as spec 120 already ships twelve targets. **If the operator overrules the instrument reading, this game cannot be built in any shape** — a hundred square cannot be made of ten cells — and that is worth knowing before the build, not after.

All 100 cells stay live, deliberately. Restricting taps to the four legal neighbours would be easier and would destroy the game: misconceptions 1, 2 and 4 are all diagnosed from *which wrong cell* the child reaches for, and a board that refuses the wrong reach before the finger lands teaches nothing.

## How it plays
1. **Start screen** (`GameCore.makeStartScreen`, title from `S("title")`): the premise as a picture, not a sentence — the parent snail (`ART.snailIdle`, 96 px) on a short strip of garden at (360, 250), the two little ones (`ART.youngSnail`, 40 px) out at (250, 320) and (470, 300), and the burrow (`ART.burrow`, 88 px) at (360, 400) with the youngest looking out of it. Start button and language picker below (the picker is not created under `?embed=1`). The whole want is legible before a single word is read, so the band's 8-word budget is spent on the title alone.
2. **Play builds the world once.** The 720 × 720 board, all 100 cells with their numerals; the nine `ART.foldLink` connectors; the burrow with `ART.burrowRim` drawn after it so arrivals tuck behind the lip; both little ones; the snail on its start cell in `ART.cellLit`; `ART.waypointRing` on little one A's cell; `ART.reachPlate` beside the snail. Nothing else is ever created or destroyed — items change the world, they do not rebuild it. `GameCore.reportHeight()`.
3. **Item 1 (rS = 3, L1: the snail is on 33, the reach is `+1`).** The stage is **frozen** — zero tweens running while a choice is open (gate M2). The snail holds `ART.snailIdle` on cell 33. `ART.reachPlate` sits in the occupant band two cells diagonally below-left, carrying `ART.reachSign` "+1" and `ART.reachCube`. Cell 33 is lit and reads 33; cell 55 wears the coral waypoint ring with little one A on it; cell 24 has little one B; cell 20 has the burrow and the youngest.
4. **Tapping.**
   - **The world accepts (34).** `tone("correct")`; the snail plays `ART.snailAct` for 120 ms, then `ANIM.glide` carries it 60 px to cell 34 in 500 ms while `ANIM.trailDraw` lays a 6 px `structure` segment centre-to-centre behind it; cell 34 takes `ART.cellLit`, cell 33 takes `ART.cellDone`; `GameCore.showPraise` with the next praise key. After 300 ms the reach for the next step is computed from the new position and `ART.reachPlate` re-seats itself with `ANIM.appear`. **The trail stays for the whole session.**
   - **The world refuses (e.g. 43 tapped for a `+1` reach).** The tapped cell **tips** — `ANIM.tip`, a 6° roll and back, 80 ms out and back — the snail's reach does not complete, and `tone("nudge")` sounds (mellow, never a buzzer). **The snail does not move. No trail is laid. Its pose does not change.** The apparatus moved; the creature did not. Then the world freezes and the enacted correction plays for the full 2800 ms (Rules).
   - **Attempt 2 is unaided** after that correction. A second refusal replays the marker run only (≤ 800 ms) and then `ART.glowRing` appears on the correct cell with `ANIM.showMe` at 1 Hz.
   - **Attempt 3.** Tapping the ringed cell completes the item as solved-with-help — the snail still moves, the trail still draws, the little one still climbs aboard. Success is certain; there is no fourth attempt and no way for the session to end other than arriving.
   - **Tapping the snail's own cell, or any cell already on the trail:** nothing happens, and it is not an error.
5. **Arriving at a little one (items 4 and 8).** The snail lands on the waypoint cell; `ART.snailHappy`; the little one plays `ANIM.climbOn` (400 ms) and settles onto the shell as a 12 px rider inside the hero's own footprint. The coral ring moves to the next waypoint. **Two out → one out → none out**, and the count is on the parent's back where the child is already looking.
6. **The fold step (item 12, always).** The reach is `−1` from a cell ending in 1. `ANIM.foldGlide` runs twice: the snail leaves the left edge of its bed (250 ms) and enters at the right end of the bed above (250 ms), travelling along the connector, and the trail draws round it. That seam's `ART.foldLink` is replaced by `ART.foldLinkLit` permanently. The snail is home.
7. **Finish.** The snail is at the burrow, both riders are down, and all four of the family are in the doorway — the parent, the two fetched, the one who was waiting. The whole trail then **lights as one continuous line** from the start cell to the burrow, fold and all, in one 900 ms `ANIM.trailLight`. `ANIM.celebrate` on the family, `tone("finish")` once. The Finish scene is the world the child made, not a summary of it (Screen layout).

One session ≈ 5-6 minutes: 12 moves, one tap each, with a correction on the ones that need it.

## Art registry
```js
const ART = {
  /* ---- the family (first drawings of roster entry `snail`; ART-BIBLE §3) ---- */
  snailIdle:     { kind: "svg", value: LCSArt.get("snail.idle"),   size: 46 },  // 96 px on start/finish; shell #F6A07E with a #C2603C spiral, body/foot #E9E1D2 under a 3 px ink outline
  snailAct:      { kind: "svg", value: LCSArt.get("snail.act"),    size: 46 },  // the reach: head and foot extended toward the move
  snailHappy:    { kind: "svg", value: LCSArt.get("snail.happy"),  size: 46 },  // eyes crescent; used when a little one climbs on, and at the finish
  youngSnail:    { kind: "svg", value: LCSArt.get("snail.young"),  size: 40 },  // 12 px as a rider on the shell, 40 px sitting out on the garden
  burrow:        { kind: "svg", value: LCSArt.get("burrow"),       size: 48, w: 48, h: 40 },  // the arch, with the youngest in the doorway
  burrowRim:     { kind: "svg", value: LCSArt.get("burrow.rim"),   size: 48, w: 48, h: 40 },  // the near lip, drawn AFTER arrivals so they tuck behind it (ART-BIBLE §10.5)

  /* ---- the garden path ---- */
  cell:          { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "surface", stroke: "line", strokeWidth: 1, radius: 8 },
  cellLit:       { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structure", stroke: "structure", strokeWidth: 2, radius: 8 },      // the cell the snail is on
  cellDone:      { kind: "shape", shape: "roundRect", w: 56, h: 56, fill: "structureSoft", stroke: "structure", strokeWidth: 2, radius: 8 },  // a cell the trail has reached
  cellNumeral:   { kind: "text",  value: "", size: 24, font: "body",    color: "ink" },
  cellNumeralLit:{ kind: "text",  value: "", size: 24, font: "display", color: "bg" },
  trail:         { kind: "shape", shape: "line", w: 6, stroke: "structure", strokeWidth: 6 },
  foldLink:      { kind: "svg", value: LCSArt.get("foldLink"),    size: 720, w: 720, h: 60 },  // one seam: right stub + ring, left ring + stub, in `line`; ink only outside x 62-658
  foldLinkLit:   { kind: "svg", value: LCSArt.get("foldLink.lit"), size: 720, w: 720, h: 60 }, // the same seam in `structure`, once the trail has crossed it

  /* ---- the reach the snail is carrying ---- */
  reachPlate:    { kind: "shape", shape: "roundRect", w: 116, h: 34, fill: "surface", stroke: "line", strokeWidth: 2, radius: 8 },
  reachSign:     { kind: "text",  value: "", size: 24, font: "display", color: "ink" },   // "+1" / "-1" / "+10" / "-10"
  reachCube:     { kind: "shape", shape: "roundRect", w: 12, h: 12, fill: "structure", stroke: "bg", strokeWidth: 1, radius: 2 },   // one step of trail
  reachRod:      { kind: "svg", value: LCSArt.get("tenBlock"), size: 60, w: 60, h: 24 },  // ten of reachCube, 5 x 2, 1 px bg gutters: ten steps of trail

  /* ---- state and correction ---- */
  waypointRing:  { kind: "shape", shape: "roundRect", w: 52, h: 52, stroke: "accent",        strokeWidth: 4, radius: 8 },  // THE one state coral on the screen
  stepMark:      { kind: "shape", shape: "roundRect", w: 52, h: 52, stroke: "structure",     strokeWidth: 4, radius: 8 },  // the marker that walks a correction out
  rowBand:       { kind: "shape", shape: "roundRect", w: 596, h: 56, fill: "structureSoft", radius: 8 },   // washes one bed during a cube correction
  colBand:       { kind: "shape", shape: "roundRect", w: 56, h: 596, fill: "structureSoft", radius: 8 },   // washes one column during a rod correction
  glowRing:      { kind: "shape", shape: "roundRect", w: 60, h: 60, stroke: "structure",     strokeWidth: 4, radius: 10 }   // the show-me on attempt 3
};
```
No emoji appears anywhere in this game, including here: the snail is redrawn as inline SVG per ART-BIBLE §1 and the pre-pivot `{ kind: "emoji" }` entry is deleted. `ART.targetBox`, `ART.targetText`, `ART.opOne`, `ART.opTen`, `ART.opText`, `ART.startNumeral`, `ART.miniCell` and both progress-dot entries are deleted with the prompt row and the abstract completion meter they belonged to. The three hex values in the comments are the sanctioned lighter/darker tints of `accent` and `surface2` (ART-BIBLE §2), written as hex only inside an SVG string; every drawn colour resolves from a `THEME.colour` token.

**Colour ruling, recorded for the art director to confirm at art-sheet time.** The shell is an `accent` tint and is the snail's **one identity feature** under ART-BIBLE §9.2 (the hen's-comb precedent), not the §9.4 warm-body case, because the body and foot are `surface2` tints and the shell is a discrete, unchanging part. That keeps coral available for meaning, and the game therefore declares exactly **one** `accent` entry, `ART.waypointRing`. One grep, one number. If the art director rules the shell IS the body, the shell moves to `surface2` tints with a `structure`-tinted spiral and nothing else changes.

## Animation registry
```js
const ANIM = {
  glide:      { duration: 500, ease: "Sine.InOut", trigger: "the snail from its cell to the reached cell, 60 px (x/y set at call)" },
  foldGlide:  { duration: 250, ease: "Sine.InOut", trigger: "half a seam traversal: out of one bed edge, then in at the other (played twice)" },
  trailDraw:  { duration: 500, ease: "Sine.Out",   trigger: "the new trail segment's end point tweens from the old cell to the new one (one Graphics, redrawn each frame)" },
  tip:        { angle: 6, duration: 80, ease: "Sine.InOut", yoyo: true, trigger: "a refused cell rolls 6 degrees and back; the snail does not move" },
  climbOn:    { duration: 400, ease: "Back.Out",   trigger: "a little one moves from its cell onto the parent's shell (x/y set at call)" },
  appear:     { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "the reach plate re-seats beside the snail (from alpha 0)" },
  markPlace:  { alpha: 1, duration: 200, ease: "Sine.Out", trigger: "stepMark fades in on the snail's cell at the start of a correction" },
  markStep:   { duration: 80, ease: "Linear",      trigger: "stepMark moves one cell along the path (x/y set at call); ten of these for a rod, one for a cube" },
  outline:    { alpha: 1, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "stepMark settles on the correct cell, holds, fades" },
  bandIn:     { alpha: 0.35, duration: 200, ease: "Sine.Out", yoyo: true, hold: 1200, trigger: "rowBand / colBand washes the bed or the column behind the settled marker" },
  showMe:     { alpha: 1, duration: 500, ease: "Sine.InOut", yoyo: true, repeat: -1, trigger: "glowRing on the correct cell from alpha 0.2; stopped when tapped" },
  pulse:      { scale: 1.08, duration: 300, ease: "Sine.InOut", yoyo: true, trigger: "the reach plate container on the inactivity cue" },
  trailLight: { alpha: 1, duration: 900, ease: "Sine.Out", trigger: "the whole trail lights as one continuous line on the Finish scene" },
  celebrate:  { angle: 8, duration: 120, ease: "Sine.InOut", yoyo: true, repeat: 3, trigger: "the family at the burrow, Finish scene only" }
};
```
No flashing: `showMe` cycles at 1 Hz; bands and outlines play once per correction; `celebrate` runs 480 ms, inside the 1.5 s cap. Per ART-BIBLE §9.3 nothing tweens the raw `scale` of a `kind: "svg"` entry — `pulse` runs on the plate's **container**, and the snail, the little ones and the burrow are each wrapped in a container so `glide`, `foldGlide` and `climbOn` move a container whose natural scale really is 1.

## Screen layout
Stage **720 × 720** (per BUILD-CONVENTIONS §2 the Phaser config `height` becomes 720; nothing else changes), `Scale.FIT`, everything fixed, no camera movement. There is no zone H and **no abstract progress strip anywhere on the play surface** — progress is diegetic (MISSIONS §1.4): the burrow is on screen from tap one, the trail lengthens behind, and the little ones move from the garden onto the parent's back.

```
y   0 ┌──────────────────────────────────────────────────────────────────┐
      │ [lang 16,16]                                                     │  zone T  0-56
 56   ├──────────────────────────────────────────────────────────────────┤
 94   │      1   2   3   4   5   6   7   8   9  10   bed 0  y=122   ─┐   │
      │ ┌─  11  12  13  14  15  16  17  18  19 [20]  bed 1  y=182  ◄┘   │  zone W
      │ └─  21  22  23  24*  25  26  27  28  29  30  bed 2  y=242   ─┐   │  56-720
      │ ┌─  31  32  33►  34  35  36  37  38  39  40  bed 3  y=302  ◄┘   │  THE WORLD
      │ └─  41  42  43  44  45  46  47  48  49  50   bed 4  y=362        │
      │     51  52  53  54  55*  56  57  58  59  60  bed 5  y=422        │
      │     61 ...                                   bed 6  y=482        │
      │     71 ...                                   bed 7  y=542        │
      │     81 ...                                   bed 8  y=602        │
      │     91  92  93  94  95  96  97  98  99 100   bed 9  y=662        │
690   │   x = 90 + 60c  (90 … 630); cells 56 x 56, pitch 60              │
720   └──────────────────────────────────────────────────────────────────┘
```

The nine fold connectors live in the two side margins (x 27-62 and x 658-693) at the midlines y = 152 + 60r; they are scenery, never a target, and they carry no ink over any cell. The praise pop appears centred over the board (library default).

**Finish scene.** The world is redrawn exactly as it played — same cells, same trail, same fold, same four animals at the burrow door — and then the whole world group is scaled by **0.82 about (360, 330)**, which puts the board at x 116-604, y 136-625. This is stated rather than assumed because the geometry forces it: a 596 px board plus a title plus two 72 px chrome buttons does not fit in 720 px of stage, and MISSIONS §9.1.6's "re-draw at play coordinates" cannot be met literally here. It is **not** the pre-pivot mini-grid summary (`ART.miniCell` is deleted) — it is the identical world, uniformly scaled, with nothing rearranged and nothing recomposed. `t("all_done")` at (360, 84), 44 px, `THEME.colour.structure`. `makeButton play_again` at (250, 668) and `makeButton menu` at (470, 668), both full size, 16 px clear of the bottom edge. No score, no stars, no badges and no first-try tally: the trail already says everything, and it says it without ranking the child. `GameCore.reportHeight()`.

## Visual specification
- Background: `THEME.colour.bg`.
- **Cells.** 100 × `GameCore.makeTile` 56 × 56 with `ART.cell` tokens. **`ART.cellNumeral` is drawn at (cell.x, cell.y + 16)** — the cell's lower band — in 24 px `THEME.font.body`, `THEME.colour.ink`. The lit cell uses `ART.cellLit` with `ART.cellNumeralLit` (24 px `THEME.font.display`, `THEME.colour.bg`) at the same offset; reached cells use `ART.cellDone` with the ordinary numeral.
- **The occupant band, and the rule that makes it work.** Every occupant — `ART.snailIdle` / `ART.snailAct` / `ART.snailHappy`, `ART.youngSnail`, `ART.burrow` + `ART.burrowRim` — is drawn inside a **46 × 36 footprint centred at (cell.x, cell.y − 16)**, the cell's upper band. Measured: the footprint spans y cell.y−34 … cell.y+2, so it clears its own numeral (top edge cell.y+7) by 5 px and clears the numeral of the cell above (bottom edge cell.y−35) by 1 px, overhanging only 6 px into the 4 px gutter and the empty top of the cell above. **No occupant ever covers a numeral, on any cell, at any point in the session.** This replaces the pre-pivot layout, which drew a 36 px snail at the cell centre on top of a 20 px numeral at the same centre and would have shipped them overlapping.
- **Riders.** When a little one is aboard it is drawn at 12 px on the parent's shell crest, inside the parent's own 46 × 36 footprint — rider 1 at (−4, −7) and rider 2 at (+7, −4) from the hero container's origin. Two riders never leave the footprint, so the no-covered-numeral property holds unchanged when the parent is carrying.
- **The trail.** `ART.trail` segments on one `Graphics`, drawn beneath every occupant and above the cells. A seam segment is drawn along the connector geometry so the trail visibly leaves one edge and arrives at the other.
- **The fold.** `ART.foldLink` × 9 at (360, 152 + 60r), beneath the cells layer, in `THEME.colour.line`. A traversed seam swaps to `ART.foldLinkLit` in `THEME.colour.structure` and stays.
- **The reach plate.** `ART.reachPlate`, 116 × 34, holding `ART.reachSign` (24 px `THEME.font.display`, `THEME.colour.ink`) on the left and the material on the right — `ART.reachRod` for a ten-reach, `ART.reachCube` for a one-reach — the pair centred as a group inside a plate whose size never changes. **Placement rule, and it is load-bearing.** The plate occupies the **occupant band of the two cells diagonally away from the snail**, on the bed below (or the bed above when the snail is in bed 9), on the side away from the nearest vertical board edge: centre = (hero.x ± 120, hero.y ± 60 − 16), spanning 116 px. Measured against every cell of the board: it covers **no numeral** (the occupant band is empty by construction) and it touches **no target cell** (its nearest edge stops 34 px short of the ±10 target's column and it sits a whole bed away from the ±1 targets). Candidate order is [below-away, below-toward, above-away, above-toward]; the first candidate that is on the board and holds no occupant wins; if all four hold occupants the plate falls back to the hero's own bed, in the occupant band of the two cells beyond the ±1 target away from the nearest edge, which is never a target either. The plate travels with the snail, so **there is no prompt row**: the pre-pivot y = 88 row — start numeral, operation icon, answer box — is deleted entirely, and so is the abstract 12-dot progress strip that sat above it.
- **State.** `ART.waypointRing` on the active waypoint cell and nowhere else — the only `THEME.colour.accent` element on the play surface. `ART.stepMark`, `ART.rowBand`, `ART.colBand` and `ART.glowRing` are all `THEME.colour.structure` or `THEME.colour.structureSoft`, so a correction never competes with the destination for the one warm colour. Meaning is never carried by colour alone: the waypoint is also marked by a little one or the burrow sitting on it, the lit cell by the snail standing on it, and the show-me by a pulse.
- **Bands.** `ART.rowBand` centred on the target bed at (360, 122 + 60r); `ART.colBand` centred on the target column at (90 + 60c, 392); both at alpha 0.35, beneath the numerals so nothing they wash becomes unreadable.
- **Two measured deviations from BUILD-CONVENTIONS, declared rather than discovered.** (1) The gap between adjacent cells is **4 px**, not the §3 minimum of 12 — accepted for a hundred square, whose whole point is adjacency, with the correction that a mis-tap on a neighbour is judged like any other refused cell and never ends an item. (2) Nothing else deviates: the numeral is 24 px, meeting the §12 floor for band 6-8, and the tap target is 56 × 56, meeting the §3 floor for band 6-8 exactly.
- Keyboard: arrow keys move the focus ring across the board in row-major order, wrapping at a bed end onto the next bed exactly as the fold does, so the keyboard traversal teaches the same thing the trail does; Enter or Space taps. Tab order: cells 1 to 100. Focus ring is `THEME.colour.focus`, library default.
- `?embed=1`: the language picker is not created; nothing else changes.

## Content
Language-neutral. The play surface carries numerals and the signs "+" and "−" only, so `LOCALE_DATA` is not needed; `STRINGS` carries `title` in all 11 locales per BUILD-CONVENTIONS §17.

**The route is generated by the goal, never drawn from a pool.** At Play start the game draws `rS` from {2, 3, 4, 5, 6, 7} and builds the garden from the World table: `start = 10·rS + 3`, `A = 10·(rS + 2) + 5`, `B = 10·(rS − 1) + 4`, `HOME = 10·(rS − 1)`. The waypoint sequence is A, then B, then HOME.

**The reach for each item** is chosen from the multiset of steps still owed on the current leg. For a leg from `p` to `q`, write `q − p = 10·t + o` with `t` and `o` chosen to minimise `|t| + |o|`; the leg owes `|t|` reaches of `sign(t)·10` and `|o|` reaches of `sign(o)·1`, and every one of them strictly reduces the folded distance to the waypoint, in any order. The level chooses **which of the remaining reaches is taken next**, and the level is re-read at every item:

- **L1** — take the smallest-magnitude reach still owed (cubes before rods).
- **L2** — take the largest-magnitude reach still owed (rods before cubes).
- **L3** — take a reach of the opposite kind to the previous step if one is still owed, otherwise any (interleaved).

Where only one kind remains the three levels agree, which is correct and honest: **leg 3 is four `−1` steps at every level**, and the fold therefore always arrives last, when the child is warmest.

**Worked session, rS = 3, at L1 throughout.** Leg 1 (33 → 55, owes +10, +10, +1, +1): 33 → 34 → 35 → 45 → 55. Leg 2 (55 → 24, owes −10, −10, −10, −1): 55 → 54 → 44 → 34 → 24. Leg 3 (24 → 20, owes four −1): 24 → 23 → 22 → 21 → **20**, the last step across the fold. Twelve moves, all four operations, one seam crossing, trail complete.
**The same route at L2:** 33 → 43 → 53 → 54 → 55 → 45 → 35 → 25 → 24 → 23 → 22 → 21 → 20.
**At L3:** 33 → 43 → 44 → 54 → 55 → 45 → 44 → 34 → 24 → 23 → 22 → 21 → 20.

Every intermediate cell in all six route families and all three orderings lies inside 1-100 and is one legal reach from its predecessor; the property is a consequence of the leg decomposition and is asserted at Play start rather than trusted.

## Rules
- **Item count:** 12 — the route is exactly 12 steps by construction, in every one of the six gardens.
- **Difficulty progression:** after 2 consecutive first-try correct items the level rises one step (cap L3). "First-try correct" = the correct cell was the first cell tapped for that item.
- **Adaptation:** a wrong tap on an item, or a wrong first try on 2 consecutive items, drops the level one step (floor L1). The level is re-read at every item, so a change takes effect on the very next move. The current item is never abandoned. **Declared limitation:** because placement fixes the route at twelve steps, the level can choose the *order* of the reaches within a leg but not the operations themselves, and leg 3 offers no ordering freedom at all. What carries the adaptation instead is the support ladder below — the half that matters most at 6-8 — and the leg shapes are ordered so the fold always arrives last.
- **Anti-brute-force guard, by name: THE ONE-WAY TRAIL.** P1's re-shuffle guard is unavailable here and is also unnecessary — there are no tiles to shuffle, and the stations cannot move, because a garden that rearranges itself when you knock on it is not a place (MISSIONS §6). Four independent components: (1) **one correct cell in a hundred** — a random tapper reaches the enacted correction on the first wrong tap and the show-me on the second, on essentially every item, so F-65's brute-force condition is met by the board's own size rather than by a mechanism bolted on; (2) **commitment is a one-way door** — a laid trail segment is never unlaid and the snail never walks back to un-choose; (3) **guessing cannot climb** — an item solved after any wrong tap never counts as first-try, and only first-try items raise the level, so a guesser stays on the plainest ordering all session, finishes warmly and completely, and never opens the harder one; (4) **the reach varies per item and is generated by the goal, not by a candidate set** — there is no set of options to exhaust, because what varies between items is the reach the snail is carrying, computed from where the snail is and where the little one is.
- **Stuck rule (an inactivity cue, never a clock):** if 8 s pass with no tap, targets are disabled, `ART.reachPlate` plays `ANIM.pulse` once and the snail plays `ART.snailAct` once (300 ms), then targets are re-enabled. This keeps gate M2 true — whenever any target is enabled, the running tween count is zero. It repeats every 8 s. Nothing about elapsed time is displayed and nothing ends.
- **What happens on a correct answer:** `tone("correct")`; `ART.snailAct` for 120 ms; `ANIM.glide` (or `ANIM.foldGlide` twice across a seam) moves the snail one cell; `ANIM.trailDraw` lays the segment; the reached cell takes `ART.cellLit` and the vacated one `ART.cellDone`; a traversed seam swaps to `ART.foldLinkLit`; if the reached cell is the waypoint, `ART.snailHappy` and `ANIM.climbOn` bring the little one aboard and `ART.waypointRing` moves to the next waypoint; `GameCore.showPraise` with the next key of ["well_done", "great_job", "excellent", "you_did_it", "keep_going"] in rotation; after 300 ms the next reach is computed and `ART.reachPlate` re-seats with `ANIM.appear`. Total ACT ≈ 500-900 ms.
- **What happens on a wrong answer.** The tapped cell plays `ANIM.tip`, `tone("nudge")` sounds, the snail does not move, no trail is laid and the snail's pose does not change. The world then freezes for a **fixed 2800 ms correction** — the same budget for every error class, so the teaching strength can never quietly fall below the pre-pivot spec's:
  - **A ten-reach answered as a one-reach (the sideways neighbour tapped, misconception 1):** `ANIM.markPlace` puts `ART.stepMark` on the snail's cell (200 ms); ten `ANIM.markStep`s run it forward along the path at 80 ms each with `tone("tap", k)` for k = 1 … 10 so the pitch climbs with the count (F-213), out through the fold and back in one bed down if the run crosses a bed end; it settles on the correct cell and `ANIM.outline` holds it; `ART.colBand` then washes the column with `ANIM.bandIn` behind the settled marker, holds, and both fade. Ten steps forward **and** the same column one bed down, in one 2800 ms message.
  - **The wrong digit changed (misconception 2):** the same machinery with one `ANIM.markStep`. For a one-reach `ART.rowBand` washes the bed (the tens digit holds along it); for a ten-reach `ART.colBand` washes the column (the ones digit holds along it). Hold 1920 ms, then fade.
  - **A boundary move missed (misconception 3 — `+1` from a cell ending in 0, or `−1` from a cell ending in 1):** `ART.stepMark` runs out of one bed edge and in at the other along the connector (80 ms each half); the two cells outline in turn; `ART.rowBand` then washes **both** beds so the seam is seen as one join in the path rather than a jump across the board.
  - **Any other cell (a digit-swapped 43 for a 34 + 1 reach, misconception 4):** the correction for the item's own reach plays as above; the band shows the line the arrival must lie on, and the marker runs from the snail, re-anchoring the start cell.
  - **Tapping the snail's own cell, or a cell already on the trail:** nothing happens, and it is not an error.
- **Retry behaviour:** attempt 1 unaided → the full 2800 ms correction → attempt 2 unaided → a short replay (the marker run only, ≤ 800 ms) and then `ART.glowRing` with `ANIM.showMe` at 1 Hz on the correct cell → attempt 3 completes the item as solved-with-help, with no praise pop; the snail still moves, the trail still draws, the little one still climbs aboard. There is no fourth attempt. An item completed after any wrong tap does not count as first-try.
- **ACT budget (MISSIONS R1, ceiling 60 s).** Twelve moves at ≈ 500-900 ms ≈ 8 s, plus corrections. The gate-driven session (`wrong()` then `correct()` on every item) costs 12 × (2800 + 700) ≈ 42 s. The worst human session (two wrong taps on every item) costs 12 × (2800 + 1200 + 700) ≈ 56 s. Both are inside the ceiling, and the second is the number to watch if any duration is ever raised.
- **The ratchet.** Nothing in this game decays. The trail is never unlaid; a little one on the shell never gets down; the burrow never empties; the distance home never grows; no path closes behind the snail. There is no tide, no dusk, no pursuer, no wilting and nothing that empties.
- **Finish condition:** the snail reaches HOME with both little ones aboard, which is exactly 12 solved items → Finish scene. There is no losing state and no way for a session to end other than arriving; the only exits are Finish and Menu.
- **Test hook (BUILD-CONVENTIONS §16).** `correct()` taps `hero.cell + reach`. `wrong()` taps the misconception-1/2 distractor — the ±1 neighbour when the reach is a rod, the ±10 neighbour when it is a cube — so a gate-driven session exercises the real correction rather than an arbitrary miss. `targets()` returns all 100 cells with their logical boxes.

## Strings
- `GameCore.t()` keys used: `t("start")`, `t("all_done")`, `t("play_again")`, `t("menu")`, and the praise keys `t("well_done")`, `t("great_job")`, `t("excellent")`, `t("you_did_it")`, `t("keep_going")`.
- The pre-pivot `t("question_x_of_y")` is **dropped from both screens**. The progress it reported is now diegetic on the play surface, and on the Finish screen the completed trail is the record; a count of first-try items would rank the child for nothing.
- Game-specific strings (`STRINGS.en`, read via `S(key)`; all 11 locales authored at build per §17):
  - `title` = "Snail Trail Home"
- **Text budget (F-42 check F6, band 6-8, ceiling 8 English words including the premise):** the premise is delivered as a **picture** on the start screen, so it costs zero words, and the game's entire authored vocabulary is the three-word title. The play surface carries **no authored game text at all** — only numerals, the signs "+" and "−", and the shared localised praise chrome that BUILD-CONVENTIONS §6 mandates in all 200 games.

## Sound
`GameCore.tone` only (§11): `tone("tap")` on any cell tap; `tone("correct")` when the world accepts the move; `tone("nudge")` on a refused cell — mellow, never a buzzer; during a rod correction `tone("tap", k)` for k = 1 … 10 as `ART.stepMark` takes each of the ten steps, so the child hears the count climb as the reach is walked out (F-213); during a cube correction a single `tone("tap", 1)`, and across a seam `tone("tap", 1)` on each half, so a small step sounds small and a ten-step reach sounds like ten; `tone("finish")` once on the Finish scene. Silent under `?sound=off`; no audio files; no sound carries meaning the screen does not also show.

## Testing checklist
- [ ] Works in all 11 languages: the picker changes Start, "All done!", "Play again", "Menu" and the praise pops; the play screen has no words in any language.
- [ ] Works at narrow width: in a 400-px-wide iframe the whole 720 × 720 stage is visible, every cell numeral is readable, the fold connectors read as connections rather than as decoration, and the cells are separate targets.
- [ ] Keyboard operable: arrow keys move the focus ring across the board and wrap at a bed end onto the next bed exactly as the fold does; Enter taps; the focus ring is visible on the current cell.
- [ ] Never auto-starts: the start screen shows the whole want — parent, two little ones out, burrow with the youngest in the doorway — until Start is tapped.
- [ ] No losing state: wrong taps never end the session; the show-me ring always completes the item; the trail always reaches the burrow; there is no way to finish other than arriving.
- [ ] **Mission (deletion test B):** `mutate-mission.js` removes `mission.goal` and `mission.hero`, and the game must **fail to complete item 1** — with no waypoint there is no direction, no sign and no reach, so no item can be posed. It must not fall back to a pool.
- [ ] **Deletion test A:** with the cell numerals and the reach plate stripped, no cell differs from any other, `hero.cell + reach` is undefined, and nothing playable survives — a hundred identical squares that refuse every tap.
- [ ] **Instant-cut test (C):** patching `ANIM.glide`, `ANIM.foldGlide` and `ANIM.trailDraw` to `duration: 0` leaves the session identical — same twelve items, same reaches, same refusals, same corrections, same trail, same finish. **The correction is not a traversal and must not be patched:** the ten-step run keeps its 800 ms, because it is the message and not the hero getting somewhere.
- [ ] **Ratchet:** driven with a wrong tap on every item, the trail length, the number of little ones aboard and the seams lit never decrease at any point in the session.
- [ ] **Freeze (gate M2):** at every decision point, with any cell enabled, the running tween count is zero — including during the 8-second inactivity cue, which disables targets for its 300 ms and re-enables them after.
- [ ] The snail's cell is filled teal, its numeral is legible in cream in the cell's lower band, and **no occupant covers any numeral on any cell** at any point, with two riders aboard as well as none.
- [ ] The reach plate never overlaps any of the four target cells and never covers a numeral, swept across all 100 possible snail positions and all six gardens.
- [ ] For a `+1` reach from 33, tapping 34 moves the snail there and draws the segment; 34 becomes the new lit cell and the next reach is computed from it.
- [ ] For a `+10` reach from 33, tapping 34 makes the marker walk ten steps forward along the path and settle on 43, and only then does the column wash.
- [ ] The last step of every session crosses a fold: the snail leaves one bed edge, arrives at the other, the seam lights permanently, and the burrow is on a round ten.
- [ ] Both little ones end the session on the parent's shell and all four are in the doorway on the Finish scene; the finish is asserted by **properties** — snail at HOME, four family at the door, 12 trail segments, exactly one crossing a fold — never by a pixel match, because the trail is content-dependent (MISSIONS R6).
- [ ] The Finish screen shows the same world at 0.82 scale with the whole trail lit as one line, and no score, stars, badges or first-try count anywhere.
- [ ] With `?sound=off` nothing is audible; with sound on, a ten-reach correction plays ten notes climbing in pitch and a one-reach correction plays one.
- [ ] `art-sheet.js` renders `snail.idle`, `snail.act`, `snail.happy`, `snail.young`, `burrow`, `burrow.rim`, `foldLink` and `tenBlock` at 48 / 96 / 192 / 384 on the stage colour, and a person reads the sheet before the visual critic runs.
