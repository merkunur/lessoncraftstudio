<!-- Canonical game layer for all 200 K-3 games. Version 2.0, 2026-09-06. Supersedes MISSIONS.md
     v1.0 of the same date. Binding companion: design/GAME-DESIGN-LAW.md (the ruling, the band
     policy, the invariants). design/catalogue/PATTERNS.md is the INPUT contract only.
     design/catalogue/BUILD-CONVENTIONS.md §6/§7 are the no-world default; a framed game uses
     §2.6 of this file. Every one of the 200 redesigns is written against this document. -->

# MISSIONS - the game layer for all 200 games

---

## 1 · Intent, and the ruling that created it

### 1.1 The ruling, verbatim

> *"The games you designed are just activities. The purpose of the educational game is to let the kid
> have fun while training the skills. The game has to have a mission or purpose. The kids need to be
> involved in the mission by making the character do something while on the way solving math problems
> or training skills… The character should not be static, it needs to move around and complete
> missions. The game has to be engaging and fun so that kids want to play it for the sake of playing
> and completing something rather than for the sake of training their skills."*
>
> — Operator, 2026-09-06, followed by: *"You should redesign all 200 games."*

### 1.2 He is right, and it is measurable

| measure | count |
|---|---|
| specs containing the phrase *"the child taps"* | **183 of 200** |
| specs containing a journey, a destination, a mission or stakes | **0** |
| entries in `PATTERNS.md` that name a goal rather than an input verb | **0 of 12** |
| specs declaring an animal mascot | 182 |
| of those, a `{ y: "-=14", yoyo: true }` bobber that returns to its own coordinate | **~110** |
| specs in which a living body travels as the input | **13** |

`PATTERNS.md` was titled *"the twelve ways a child can act"*. P1-P12 are not ways a child can act.
They are ways a child can **touch the screen**. A taxonomy of controls was built where a taxonomy of
games should have been, and 200 specs were written inside it.

### 1.3 This is not a new direction. It is an unimplemented requirement

> **F-11** — answer-then-arcade games sell because of *"motion, a goal, a character"*, and that
> appeal *"must be matched by other means since the mechanic is banned (F-63)"*.
>
> **F-212** — *"Match the appeal of answer-then-arcade with a character and a goal that IS the task:
> the character's need is satisfied by the mathematics itself, never by a bolted-on chase."*
>
> **F-44** — progress should be *"the task completing (tower built, path filled)"*.

The research named the exact three things the operator says are missing — **motion, a goal, a
character** — numbered the requirement, and then the specs satisfied F-63 and ignored F-212. Even
F-212's own worked examples ("feed N fish") are static: it captured *goal* and *character* and
dropped **motion**, the half F-11 names first. And F-44 asked for a tower and a path, after which
`BUILD-CONVENTIONS` §6 mandated a rail of hollow circles in every game — the one place the research
was contradicted outright. That rail was removed from the play surface by the 2026-09-06 amendment
and is not coming back.

### 1.4 What this document is

The operationalisation. **Thirteen frames.** A frame is a shape of game: a place, a want inside it,
and a character whose act in that place is the same act as the thinking. Every one of the 200 games
declares exactly one frame, one terrain from that frame's register, and one pattern.

It is written to be built against with no further design work, so every world below carries real
coordinates on the real stage, checked against the real floors.

### 1.5 The box everything is designed inside (restated, so this file is self-contained)

**Prohibitions, absolute.** No timer, no countdown, no clock as a pressure device, no lives, no game
over, no losing state, no score, no points, no stars, no badges, no unlockables, no currency, no
rival who can win. **Exactly zero ways a session ends other than by finishing.** Invalid moves are
refused, never punished. Success is certain: a three-attempt support ladder always ends with the item
completed.

**Input.** Tap only, one primitive, keyboard-operable throughout (`Tab`/arrows move a focus ring,
`Enter`/`Space` taps). Tap floors **80 × 80 logical px at band 5-6, 56 × 56 at 6-8 and 8-9**, gaps
**≥ 12 px**, every interactive element **≥ 16 px from the stage edge**. Drag (P5) exists only as an
optional 6-9 accelerator layered on a P2 tap-tap path; no frame depends on it.

**Stage.** Fixed **720 × 560** logical px, `Scale.FIT`, static camera, no scrolling, no hub, no map
screen. A spec may declare a taller stage up to **720 × 720** when its scale genuinely needs it, and
must say why.

**Load.** **≤ 10 interactive elements.** An *instrument* (a keypad, a stepper, a dial, a clock face)
counts as **one**; independent *candidates* count individually; inert scenery counts as zero; **the
character counts as one**.

**Engine.** No sprites, no spritesheets, no physics, no path-following, no tilemaps. Motion is a
container tween between points. **Poses are the five in ART-BIBLE §3 — `idle`, `happy`, `think`,
`oops`, `act` — and there is no `walk` pose.** Travel is a static pose translated. No frame in this
document commissions a sixth pose for fifty mascots; every frame section enumerates the poses it
uses, and they are always a subset of those five.

**Text.** 5-6: zero words on the play surface. 6-8: ≤ 8 English words **including the premise**.
8-9: ≤ 2 short sentences. Font floors: 5-6 words ≥ 28 px and single numerals ≥ 40 px; 6-8 ≥ 24 px;
8-9 ≥ 20 px. Every text box designed for 1.6 × the English width.

**Content.** 8-15 items, ~5-7 minutes, three levels, 2-up / 2-down adaptation. Eleven locales.
Animals only, people never drawn, no national holidays, no currency outside the §14 table, metric.

**Palette.** Cream ground, teal `structure`, **one** coral `accent` per screen, **no red at all**.

---

## 2 · THE LAW

> ### MOVING IS SOLVING
> The character's action in the world is **isomorphic** to the cognitive operation. Not *solve, then
> move* — **moving is how you solve.** The child steers, and the steering is the maths.

### 2.1 The Single-State Law

A frame is legitimate **iff there is exactly one state variable `S` carrying two simultaneous
readings**, one mathematical and one physical. The child manipulates the physical reading; the
mathematics is what that manipulation means.

The practical test is one line of code:

```
worksheet:  if (tapped === item.answer)            // a verdict handed down
game:       if (world.accepts(hero, destination))  // a fit, discovered
```

### 2.2 The Displacement rule — the sharpest single check

> **`answer = f(character.position)`.** The commit handler must resolve to a **position in the
> world** and test a **geometric relation** between the character and the goal. If it reads a tile
> id, a keypad buffer or a selection index, compares it to a stored `answer` field, and *then*
> animates the character walking there, **REJECT the design.** That is answer-then-arcade with a
> shorter arcade.

An instrument is not excluded by this rule; a *disconnected* instrument is. A keypad whose digits
drive the character's altitude is a crank, and the commit still reads the character's y (§8). A
keypad whose digits are compared to `item.answer` while a cart trundles across the screen is a
decal.

### 2.3 The two deletions, stated as a gate that can actually fail

The old wording of this test could not fail anything, because every frame's deletion-2 clause named
a **shipping spec** as the residue — *"what is left is spec 005 exactly as it stands"* — which is a
confession that something playable survives, since it is running in the repo right now. The test
bites only when "playable" is defined without reference to taste.

> **Playable = the code can complete an item.** Nothing else.

Both deletions are therefore **mutations**, run by `_tools/mutate-mission.js`, and both must **fail
the build**:

| | Mutation | Required result |
|---|---|---|
| **D1** | Remove the mathematics: strip the values, the labels, the shapes, the ordering — make every candidate identical and every destination equivalent. | The session must complete on **any** input. The anti-guess gate (§2.5) then fails it. |
| **D2a** | Remove `mission.goal` — the destination object and the waiting party. | **No item can complete.** The completion predicate has no second term. |
| **D2b** | **Freeze the hero** — stub the character's position setter so it stays at its start coordinate while every tween still runs. | **No item can complete.** |

**⚠ D2b replaces the old "patch every traversal tween to `duration: 0`" form, which was vacuous.**
Zeroing a duration produces a *teleport*, and a teleport preserves displacement — so the old test
passed exactly the games it was written to catch and failed exactly the games it was written to
protect. `GAME-DESIGN-LAW.md` §2.2 Test C is corrected to the frozen-hero form by this document.

Every frame section below states its deletions **in this engine sense**, never as "what is left is a
worksheet".

### 2.4 Pattern describes the FINGER. Frame describes the GAME

> **frame = the game · pattern = the finger · terrain = the dressing**

`pattern` is no longer a game's identity and is no longer invariant (superseding
`BUILD-WORKFLOW.md` §3). Everything in `PATTERNS.md` still binds — the tap floors, the keyboard
paths, the refusal shape, the rejections at its foot — because none of it was ever the problem. Read
each pattern's *"What"* as the **input** it describes, inside whatever world the game's frame
establishes.

**Frame is chosen from the shape of the CONTENT, never from the pattern.** The question is: *what
kind of thing is the answer?*

| the answer is… | group | frames |
|---|---|---|
| a **position in an order** | A | 1 CROSSING · 2 FOOTING |
| an **extent** — a length, a height, a distance | B | 3 SPAN · 4 REACH · 5 LEAP |
| a **fit** — a physical predicate | C | 6 APERTURE · 7 MENDING |
| a **grouping** or an **exchange** | D | 8 FERRY · 9 EXCHANGE |
| a **relation** between two quantities | E | 10 LIFT |
| an **order of operations** | F | 11 WORKS |
| a **place named by language** | G | 12 ERRAND |
| a **partner** | H | 13 GATHERING |

Choosing the frame from the pattern is how a system of thirteen frames becomes thirteen games with
two hundred skins. `_tools/check-redundancy.js` must refuse an unannotated **(topic, band, pattern,
frame, terrain)** quintuple, and must be re-run against the transformed designs, not the originals.

### 2.5 The brute-force guard, named — because the old one stops working

`PATTERNS.md` P1 defends against guessing by **re-shuffling the remaining tiles after each wrong
tap**. In a persistent world the stations cannot move: a door that jumps when you knock on it
destroys the constancy that makes a place a place. That guard is dead for 41 games (21%), and every
framed spec must therefore declare a **named replacement** from this list:

- **G1 · One-way door.** Commitment is irreversible in fiction: walking back does not un-choose, and
  the attempt is spent. The character is already somewhere else.
- **G2 · No first-try after any wrong move.** An item solved after any refusal never counts as
  first-try, so guessing cannot climb the ladder.
- **G3 · The candidate SET varies, not the positions.** Between items the values, shapes or words
  are re-dealt; the world's geometry is stable. This is the fixed-world form of
  `BUILD-CONVENTIONS` §13: *never the same slot twice running* becomes **never the same category
  twice running**, enforced on the CONTENT list rather than on the layout.
- **G4 · The answer space is larger than the tile count.** A rail of 21 stops or a span of 11 units
  is a harder guess than three tiles, and several frames buy this for free.

**"The child could just try them all" is a rejection.** Where a frame genuinely cannot defend
itself, that game keeps its tiles and does not take a frame.

### 2.6 The MISSION LAYOUT — replacing BUILD-CONVENTIONS §7

```
y   0 ------------------------------------------------------- 720
    | [lang picker 16,16]                                     |  zone T   0- 56   chrome only
 56 |---------------------------------------------------------|           NO dot rail
    |                                                         |
    |   zone W - THE WORLD                                    |  56-420   364 px
    |   the board . the hero . the destination . the history  |           persistent
    |   the hero and the goal are BOTH in here, always        |
    |                                                         |
420 |---------------------------------------------------------|
    |   zone H - THE HAND                                     |  420-560  140 px
    |   what the child may play right now: <= 5 controls      |           may be EMPTY
560 ----------------------------------------------------------
```

Three rules, all machine-checkable:

1. **The world gets the height** — 364 px against §7's 204.
2. **The hero and the goal are both in zone W at every moment**, and the goal's (x, y) never changes.
3. **No dot rail during play.** `ART.dotEmpty` / `ART.dotFull` survive on the Finish screen only.

**One clarification, and it is load-bearing.** An *instrument* may stand inside zone W when it is a
**physical part of the apparatus** — a crane's control box bolted to its mast, a lever at a machine's
foot, a winch drum on a wall. A *tray of candidate tiles* may not; that is the worksheet the zone
split exists to prevent. The discriminator: an instrument is one thing the child learns once; a tray
is N alternatives the child evaluates.

### 2.7 Persistence — band-gated, and this is a correction

**L2 · PERSISTENCE (6-8 and 8-9 only).** Item *n+1* begins where item *n* ended. The hero does not
teleport home; the world does not reset. The mutation: *reset the carried state between items; if
the session plays identically, it was always a worksheet.*

**At band 5-6, persistence of POSITION is forbidden**, not optional — `GAME-DESIGN-LAW` §4 rules
*"no journey, no navigation, no subgoals, no carried state"* for those 64 games, because working
memory is ~4 at five and a payoff eight items away is a delay-of-gratification problem, not a goal.
What persists at 5-6 is the **accumulated artefact** (the row of filled vessels, the mended run, the
line of companions), which needs no memory to appreciate. §7 is the full policy.

### 2.8 What a spec must declare

Every spec gains a `## Mission` block with eight fields:

| field | content |
|---|---|
| `frame` | one of the thirteen |
| `terrain` | one entry from that frame's register |
| `mission` | one line, in the child's words |
| `hero` | the roster animal, what it physically does, and **which of the five poses it uses** |
| `goal` | what is waiting, at what fixed coordinate, drawn from frame one |
| `S` | the single state variable, with its mathematical and its physical reading |
| `mark` | the thing that stays, and its declared **unit size in logical px** (§6, D1) |
| `guard` | the named brute-force guard from §2.5 |

A spec whose isomorphism is conventional rather than physical (§9) declares it **in the `S` field, in
one sentence.** A false isomorphism is worse than an admitted absence, because it stops anyone
looking for the real one.

---

## 3 · THE FRAMES

Thirteen. Each carries a **terrain register** of 4-6 distinct worlds, so ~15 games per frame becomes
~3 per (frame, terrain) pair, and the redundancy gate enforces it.

---

### FRAME 1 — THE CROSSING
**Group A — the answer is a position in an order.**

**Mission.** *Get across to the one waiting on the other side, one foothold at a time.*

**The character.** Stands on a stone. On a tap it hops to that stone — an up-and-over arc of two
chained tweens, **≤ 300 ms**, with an 8-12% squash on landing — and stays there. The stone it leaves
keeps a footprint for the rest of the session. It never falls: the water is shallow, the marsh is
soft, the gorge has a net.

**Poses.** `idle` on the stone · `think` when the item opens, leaning and looking along the route ·
`act` at the top of the hop · `oops` on a refusal · `happy` at the far ledge.

**World (720 × 560).** Near ledge x 24-88, top y = 306. Far ledge x 632-696, with the waiting one at
(664, 258), drawn from the first frame. Between them, two ranks so an eleven-step route fits without
shrinking a stone below the floor:

- **Rank A** (outbound), y = 306, stones 84 × 84 at x = 120 / 216 / 312 / 408 / 504 / 600.
- **Rank B** (return), y = 190, stones 84 × 84 at x = 600 / 504 / 408 / 312 / 216.
- Pitch 96, gap 12 ✓. Rank clearance 306 − 190 − 84 = 32 ✓. Numerals on the stones at 40 px `display`.

**Only the 2-4 stones structurally adjacent to the hero are live**; everything behind is settled
causeway, everything beyond is drawn dim and `setEnabled(false)`. Element count: hero + ≤ 4 live
stones = **≤ 5**. Zone H is **empty** — the world is the hand.

**Grid terrain.** Where the structure is a hundred square, the spec declares a **720 × 720** stage:
100 cells of 56 px on a 60 px pitch, cell (r, c) centred at (90 + 60c, 136 + 60r), hero token 44 px
on its current cell, trail 6 px `structure`. The turn at the end of a row is the crossing of a ten.

**Steered variant.** Where the knowledge is craft-relative (left is the *character's* left, not the
screen's), the child names a **manoeuvre** instead of a destination and the character carries a
facing. This is the only thing in the catalogue that can express "the robot's left".
**`124 left-right-turn` is the shipped reference implementation of this variant and needs no design
work** — it should be the game the other twelve frames are checked against.

**The isomorphism.** *The answer is the footing.* Position on the chain **is** the number, the
letter, the step; a hop of *b* **is** +*b*, and the child watches *b* stones pass beneath. Order is a
fact of the world: you cannot be past a stone you have not stood on. Before and after are behind and
ahead. There is no "answer" object anywhere on the screen — the numeral is the ground.

**Refusal.** The character leans out, puts a foot over the gap, does not reach, and rocks back onto
its own stone. The tapped stone dips 6 px and rises; `tone("nudge")`. Nothing sinks, nothing is
marked, no message. **Second refusal:** the two stones structurally adjacent to the hero take a soft
`line` outline. **Third:** the true stone lifts 6 px proud of the water and holds
(`ANIM.showMe`); stepping on it completes the move as solved-with-help.

**Diegetic progress.** The settled causeway behind — each stood-on stone keeps a `structureSoft` fill
and a footprint glyph — and the visibly shrinking gap ahead. Unit = one stone.

**Finish.** The far ledge; the whole route lights as one line and stays lit — the path the child
drew, in one picture.

**Bands.** **6-8, 8-9.** **The 5-6 form is the single stream:** one item = one crossing, three
stones 96 × 96 at x = 216 / 360 / 504, y = 300, a friend on the far bank 400 px away, and the next
stream slides in when the child arrives. One means-end link, both ends visible, no carried position.

**Patterns carried.** P1 (the stone is the choice) · P4 (order) · P7 (the trail traced by walking it)
· P6 (the grid as ground) · P9.

**Terrain register.** Stepping stones over a stream · a hundred square of paving slabs · a rope of
knots over a gorge · lily pads · a line of station platforms · the waypoints of a letter, walked in
stroke order.

**Both deletions.** **D1:** strip the numerals and every stone bears weight — `world.accepts` is
always true, the session completes on any input, and G4's answer space collapses to one. **D2a:**
remove the far ledge and the waiting one and the predicate `hero.stone === goal.stone` has no second
term; no item completes. **D2b:** freeze the hero on stone 0 and it can never satisfy the predicate;
the build cannot reach Finish.

**Guard.** G1 (a hop is a one-way door) + G4 (11-21 stops) + G2.

---

### FRAME 2 — THE FOOTING
**Group A — the answer is membership.**

**Mission.** *Only some of these will hold you. Cross by the ones that will, to whatever is at the
far end.*

**The character.** Hops to an adjacent object the child chooses — arc, **≤ 300 ms**. Objects it has
stood on firm up permanently behind it. Unsound ones sink 4 px and hand the foot back.

**Poses.** `idle` on its tuft · `think` scanning ahead · `act` at the top of the hop · `oops` on a
sinking · `happy` at the arrival.

**World (720 × 560).** A scatter of 12-14 objects, 84 × 84, across x 96-624 and y 120-380, at
irregular positions but **never closer than 100 px centre to centre**, each carrying its numeral,
letter or picture at 28 px minimum. The character starts on the object nearest (110, 380). The hidden
one sits at (624, 130) with only its ears showing from the first frame and shows a little more of
itself on every hop. **Only objects within 150 px of the character are live** (2-4 of them);
everything else is visibly out of reach. Element count: hero + ≤ 4 = **≤ 5**. Zone H empty.

**The isomorphism.** *Set membership is footing.* The property — even, a multiple of five, an
initial sound, one syllable, living, a shape family — is what makes a thing bear weight. Classifying
and moving are the same tap, and the path that emerges **is** the set, drawn across the world.
Unlike a bin, the answer is a **route**, which is what makes skip counting and multiples land here
rather than in FRAME 6.

**Discriminator against FRAME 1.** *Does the knowledge say which comes NEXT, or which ones BELONG?*
The Crossing's answer is a successor; the Footing's is a member. A frame that cannot answer that
question in one sentence has chosen the wrong one.

**Refusal.** The character stretches a foot toward the object; the leaf curls, the tuft sinks two
pixels, and the foot comes back. `tone("nudge")`. The object refuses; nothing is marked wrong.
**Second:** the true next candidates take a faint `line` outline. **Third:** one of them pulses at
full contrast.

**Diegetic progress.** The firmed chain of solid ground running back to the start, and the hidden one
revealing itself hop by hop. Unit = one object.

**Finish.** The character reaches the hidden one; the whole path lights across the scatter and the
decoys not taken stay dim in place — so the set **and its complement** are both visible, which is
the picture the objective wanted all along.

**Bands.** **6-8, 8-9 only.** Membership content at 5-6 goes to FRAME 6, whose 5-6 shape is genuinely
different (carry it to the opening it fits) rather than a re-skin of FRAME 1's stream.

**Patterns carried.** P1 · P4 · P8 · P3.

**Terrain register.** A marsh of tussocks · a meadow of stones · a frozen pond of ice plates · a roof
of tiles · a scree slope.

**Both deletions.** **D1:** every object holds; the child taps forward with no decision and the
session completes on any input. **D2a:** with no hidden one at the far corner there is no arrival
predicate; items never resolve. **D2b:** frozen, the hero cannot leave its starting tuft, so no
membership decision can ever be executed.

**Guard.** G1 + G3 (the values are re-dealt per item; the scatter's geometry is stable) + G2.

---

### FRAME 3 — THE SPAN
**Group B — the answer is an extent, laid forward.**

**Mission.** *There is no way across. Build the ground under your own feet until it reaches.*

**The character.** Stands at the **frontier** — the end of what is built — and walks onto each new
piece the instant it seats (**≤ 300 ms**). It never walks on ground it did not get, and it is never a
spectator waiting for a finished bridge.

**Poses.** `idle` at the lip · `think` looking at the gap · `act` walking out · `oops` at a hole ·
`happy` on the far lip.

**World (720 × 560).** Near lip x 24-140, top y = 300. Far lip x 580-696, top y = 300, with the
wanted thing at (640, 254). The drop between is a `surface2` wash, y 300-410.

**The scale is fixed and declared: 1 unit = 40 px**, so the gap is exactly **11 units** and every
piece is drawn true to length on the ground. Faint unit notches run down the far lip's face at a
40 px pitch, so the remaining gap is countable without a numeral.

Rack in zone H: four tiles **112 × 80** at x = 152 / 288 / 424 / 560, y = 484 (pitch 136, gap 24 ✓;
right edge 616 ✓; left edge 96 ✓). **Each tile shows its piece as a row of *n* unit blocks of 18 px**,
not as a shrunken length — size is seen as a count of units — with its numeral at 40 px. Element
count: 4 pieces + hero = **5**.

**The isomorphism.** *Length is distance is progress.* Laying a 3-piece moves the character exactly
three notches. A number bond is a decomposition of a span; the remainder is not a number to be found
but a visible hole with the character standing on its edge. Unit iteration is the same act with
identical pieces, and **F-114's gaps-and-overlaps error is impossible by construction** because
pieces snap to the frontier. Expanded form is the same span built from a 300, a 40 and a 6.

**Refusal.** A piece that would overshoot the far lip tips up on its end and slides back to the rack
(`ANIM.nudge`); the remaining notches pulse once. A short span: the character walks to the piece's
end, stops with the notches showing ahead of it, and steps back one piece-length — the sanctioned
setback, denominated in the same currency as progress. **Pieces already laid stay laid.** A piece
already used is gone from the rack, so "add ones until it fits" is not available.

**Diegetic progress.** The road's length, the character's position on it, and the shrinking gap —
three readings of one number, and no fourth display. Unit = 40 px.

**Finish.** The road meets the far lip and the character walks the **whole length** of it end to end
in one glide, one tone per notch with rising pitch — the measurement re-counted as a journey — then
takes the thing.

**Bands.** **6-8, 8-9.** **The 5-6 form is the three-plank stream:** the gap is three notches, the
rack holds unit planks only, and the crossing completes inside every item.

**Patterns carried.** P2 (its home) · P6 · P9 · P3 · P5 as an optional 6-9 accelerator.

**Terrain register.** A chasm · a stream · a marsh boardwalk · a railway being laid · a garden path
of slabs · a jetty out to a moored boat.

**Both deletions.** **D1:** pieces have no length and any piece fits anywhere; the road can never be
short or long, so nothing is refused and any input completes. **D2a:** with no far lip the predicate
`builtLength === gapLength` has no target. **D2b:** frozen at the near lip, the character never
reaches a frontier, so no piece can ever be seated at one.

**Guard.** G1 (a laid piece is one-way) + G4 (11 units) + G2.

---

### FRAME 4 — THE REACH
**Group B — the answer is a height.**

**Mission.** *It is up too high. Get level with it.*

**The character.** Its feet sit on the top of what it has built, or on a cradle whose altitude is the
value it was given, so **its own height is the number**. Each accepted piece lifts it (**≤ 300 ms**);
at level it steps sideways onto the ledge.

**Poses.** `idle` standing on the stack or the cradle · `think` looking up at the gap · `act`
stepping across · `oops` reaching and not touching · `happy` holding the thing.

**World (720 × 560) — three forms, declared per spec.**

**(a) BUILD.** Ground line y = 400. Wall x 470-600, with the ledge a horizontal band at
y = 400 − *unit* × target and the wanted thing on it. Faint notches up the wall face at x = 460.
Tower base x = 300, 96 wide, growing upward. Rack in zone H: four tiles 96 × 80 at
x = 156 / 300 / 444 / 588 (pitch 144, gap 48 ✓) showing pieces of 1 / 2 / 5 / 10 drawn as unit blocks.

> **⚠ The unit is DERIVED, never chosen: `unit = (groundY − 96) / maxValue`.** At ground 400 and a
> maximum of 10, the unit is 30 px; at a maximum of 20 the spec declares a 720 × 720 stage and the
> unit becomes 26 px. **No scale in this system may put a ledge off the top of the stage.** A design
> that wants a hundred-flat on a 400 px wall has picked the wrong form; it takes (b).

**(b) RIDE.** A vertical scale of rails at the derived pitch; the character rides a cradle; an
instrument sets the rail (a two-tile stepper at 5-6, a keypad or a dial at 6-9). An index line
**≥ 6 px `structure`** is drawn from the cradle straight across the scale at the character's feet:
that line is what the child lines up with the thing being read. The rail numeral is drawn **on the
cradle**, 40 px, so the readout and the character are one object and there is nothing to look back
and forth between. Because the cradle **snaps to a rail**, no value is ever estimated.

**(c) VESSEL (the 5-6 form).** A container with a **fill line** at (250, 330) and a source mat at
(520, 380). The character carries **one unit at a time** from the mat to the vessel — one trip per
unit, ≤ 300 ms each — so the trip count **is** the count and the fill line **is** the cardinal. There
is no numeral tile anywhere.

**The isomorphism.** *Height is quantity, and in all eleven languages "more" is up.* Reaching is
composing to a target. Reading a scale is lining your own position up with a graduation, so magnitude
and position are the same thing and there is no reading-off step to get wrong by one. A bond to ten
is two pieces that together stand level with a ten-notch ledge; a teen number is a ten-rod and some
ones; a missing addend is the gap you can see. A thermometer, a ruler, a jug, a bar chart and a
counted bowl are the same instrument in different orientations, so one frame teaches the family.

**Refusal.** **(a)** A piece that would carry the top **above** the ledge wobbles once at the top of
its glide and returns to the rack, so an over-tall tower cannot be built and the only error state is
a **visible shortfall** the child closes by adding. **(b)** The character leans out and cannot touch
the thing; a bracket of unit notches is drawn between its index line and the target's top, so the
miss is stated **in units**; the instrument stays exactly where the child left it. **(c)** The vessel
will not take the extra: it rests on the rim and rolls back to the mat.

**Diegetic progress.** The tower's height, the level in the vessel, the cradle's altitude — and,
between items, the **row of finished towers or filled vessels standing along the ground line**, at
true scale. By item eight that row is itself a bar chart of the session. Unit = one piece.

**Finish.** The character on the ledge with the thing, the row beneath it.

**Bands.** All. **(c) is 5-6**, **(a) is 6-8**, **(b) is 6-8 and 8-9.**

**Patterns carried.** P9 (its home) · P6 · P2 · P3 · P10 (a ledge hidden under a cloth) · P11.

**Terrain register.** A wall with a ledge · a beanstalk · a harbour crane · a thermometer · a jug with
a fill line · a bowl with a fill line · a shelf out of reach.

**Both deletions.** **D1:** the ledge has no height and the pieces no sizes; any stack arrives, so
any input completes. **D2a:** with no ledge and no thing on it, `hero.y === ledge.y` has no second
term. **D2b:** frozen at ground level the character is level with nothing but zero, and no item whose
target exceeds zero can complete.

**Guard.** G4 (the rail set is 11-21 stops, a harder guess than three tiles) + G2 + G3.

---

### FRAME 5 — THE LEAP
**Group B — the answer is a distance committed before you can see.**

**Mission.** *You cannot see how far it is. Say how far, then go.*

**The character.** Sets itself, jumps an arc of **exactly the distance it was given**, and lands on
the mark it named — **not** on the right one. Then the world sends a plank out to meet it and it
walks across.

**Poses.** `think` at the lip · `act` in the leap · `oops` on a wild over-set · `happy` on the far
side · `idle` between.

**World (720 × 560).** Near ledge x 24-200, top y = 300. Far ledge x 560-696, top y = 300, with the
wanted thing at (620, 254). A **measuring rope** across the gap at y = 344 from x = 200 to x = 560 —
360 px, notched every **36 px**, ten notches, numerals 24 px at every notch.

Control in zone H: a stepper — minus tile 88 × 88 at (168, 486), a drum 120 × 72 at (288, 486)
carrying the current value at 40 px, plus tile 88 × 88 at (408, 486) — gaps 16 ✓ — and a commit tile
160 × 64 at (580, 486). Element count: instrument 1 + commit 1 + hero = **3**. At 5-6 the stepper is
replaced by three numeral tiles 88 × 88.

**Covered-set terrain** replaces the gap with a jar or a cup at (360, 200) and the rope with a 0-20
line at the same pitch.

**The isomorphism.** *The guess is the jump.* A prediction that would otherwise be a tile-tap becomes
a distance a body travels, and — this is the frame's best property — **the error becomes a length.**
After the landing a plank slides out of the far ledge until it reaches the character, and the plank's
own notches **are** the difference: countable, in place, with no word spoken. An under-jump lands
short and **the remainder becomes the next problem**: 7 + 5 attempted as 7 + 3 leaves the character
standing on 10 with a gap of 2 in front of it, which is the make-ten decomposition, enacted, by the
child's own error. F-105's recommended response falls out of the geometry for free.

**Refusal.** There is none, and that is deliberate — a guess is always legal and the reveal is the
feedback (P10's existing contract). The only object that refuses is the **control**, which cannot be
set past the rope's last notch. An overshoot lands on a shelf just beyond the far lip and a short
stair folds down for the character to climb; the overshoot is also a countable length.

**Diegetic progress.** Every gap crossed leaves its plank in place. By item eight a walkway of planks
runs back across the screen behind the character. Unit = one plank.

**Finish.** The character walks the walkway back once, and the finish screen shows each plank with
its notch count — every prediction and every truth, side by side.

**Bands.** **6-8, 8-9.** **The 5-6 form is the JAR:** how many are inside — commit with three tiles,
the lid lifts, the contents count themselves out into a row, payoff inside the item, no carried
position, no distance to hold in mind.

**Patterns carried.** P10 (its home) · P9 · P1 · P11.

**Terrain register.** A gorge with a rope · a stream · a jar under a cloth · a cup on a table · a
covered nest · a shuttered window.

**Both deletions.** **D1:** the gap has no width and the control nothing to be set to; every leap is
identical and always arrives. **D2a:** with no far ledge and no wanted thing, the landing has nothing
to be measured against and no item resolves. **D2b:** frozen at the near lip the character never
lands anywhere, so the plank has nothing to reach out to.

**Guard.** G4 (a 0-20 rope) + G2 + G1 (a leap is one-way).

---

### FRAME 6 — THE APERTURE
**Group C — the answer is a class, tested by fit.**

**Mission.** *Everything here belongs somewhere. Take each one to the opening it goes through.*

**The character.** Carries one thing at a time, held above its head, **rotation preserved**; walks to
the opening the child named (**≤ 300 ms**) and pushes it up into the wall. A thing that will not go
is carried back, still in its arms.

**Poses.** `idle` on the ledge · `act` carrying and pushing · `think` looking up at the opening ·
`oops` on a mismatch · `happy` when the wall closes.

**World (720 × 560).** A wall band y 180-300 spanning x 96-624, drawn as a `surface2` wash with
`line` edges. In it, 2-4 **shaped openings**, each **108 × 108**, centred y = 240:

- two: x = 260 / 460
- three: x = 200 / 360 / 520 (gap 52 ✓)
- four: x = 168 / 296 / 424 / 552 (pitch 128, gap 20 ✓)

Each opening is a **cut-out in its class's prototype pose** — a round hole, a square hole, a
triangular hole, a long rectangular hole — never a colour, never a written label. Behind and above
the wall, the waiting ones (3-4 small figures) sit still and safe from the first frame; nothing about
them ever gets worse. The character walks a ledge at y = 348. Zone H: the item washes up at
(360, 486), 112 × 112, at the item's own rotation, size and fill token. Element count: ≤ 4 openings
+ 1 item + hero = **≤ 6**.

**The isomorphism — the strongest in the document.** *Classification is fitting.* **The rule lives in
the destination's geometry**, so membership is adjudicated by the world rather than by a legend:

- **A square rotated 45° goes through the square hole**, turning itself upright as it enters. "A
  rotated square is a diamond, not a square" is not corrected by a hint; it is **refuted by the
  wall**, and `ANIM.settleUpright` stops being an explanatory animation and becomes the act of
  fitting.
- **A skinny or obtuse triangle goes through the triangular hole**, because three sides is three
  sides.
- **A rectangle will not go through the square hole** — it juts out, visibly, by the amount it is too
  long.
- **A square DOES sit inside the rectangular hole**, rattling, with a thin gap around it — which is
  mathematically correct and is now a physical fact rather than a special case in the code.

**And where the class has no geometry** — living things, materials, rhyme families, initial sounds,
syllable counts, odd and even — the opening is a **keeper at a door** who takes what belongs and
hands back what does not. That version is honest but **conventional, not physical**, and the spec
declares it in `S` (§9). Do not pretend a burrow rejects a wrong sound the way a square hole rejects
a rectangle.

**Refusal.** The thing meets the wall face and will not go. The character pushes twice and the
**silhouette of the thing against the opening's outline** is held for 1200 ms — the corner sticking
out, the round one rolling in the square socket — then it lowers the thing and steps back, **still
holding it**, so attempt 2 costs one tap. **Second miss:** the class's enacted cue plays on the thing
in its arms (sides glowing one at a time with rising tones and a "3" badge for a triangle; the two
long sides for a rectangle). **Third:** the correct opening's edge glows.

**Diegetic progress.** The wall filling, opening by opening; every fitted piece stays for the
session; a waiting one shuffles one step closer to the part of the wall that is now whole. Unit = one
opening.

**Finish.** The mended wall with the waiting ones out on top of it. The session's classifications are
all still visible, in place, as a wall — a better record than four bin counts.

**Bands.** **All.** At 5-6: two openings, one thing at a time, openings and item both ≥ 108 px,
silhouettes maximally different, and the item completes the mission every time.

**Patterns carried.** P8 (its home — 25 games) · P12 · P1 · P2.

**Terrain register.** A harbour wall after a storm · a sorting house with shaped doors · a bank of
burrows · a row of letterboxes · a fence of gates · a dovecote.

**Both deletions.** **D1:** every opening accepts everything, so the wall mends on any input and no
tap is distinguishable. **D2a:** with the wall and the waiting ones removed there is no aperture to
test a fit against; `opening.accepts(thing)` has no first term. **D2b:** frozen on the ledge the
character never arrives beneath an opening, so nothing is ever pushed through.

**Guard.** G3 (never the same category twice running, enforced on CONTENT) + G2 + G1.

---

### FRAME 7 — THE MENDING
**Group C — the answer is what completes, in place.**

**Mission.** *Something along here is broken. Fill the holes so it works again.*

**The character.** Walks the structure and **stands at the current hole**, gliding to the next one
after each fix (**≤ 300 ms**), so its position tells the child where to look.

**Poses.** `idle` at the hole · `think` looking at the two neighbours · `act` seating the piece ·
`oops` when it will not seat · `happy` when the structure works.

**World (720 × 560).** A run across y = 280: twelve panels, posts or beads at a **48 px pitch** from
x = 96 to x = 624, each 44 wide × 76 tall, with 1-4 gaps drawn as dashed sockets. The character walks
a line at y = 336, below the run. Above the run, **the thing the structure protects** — the sleeper,
the flock, the weather, the water that will run along the channel — visible from the first frame.

Heap in zone H: five pieces **88 × 88** at x = 148 / 258 / 368 / 478 / 588, y = 486 (pitch 110, gap
22 ✓). The holes are **not** tap targets; the character is already standing at one. Element count: 5
pieces + hero = **6**.

**The isomorphism.** The structure carries the rule and **the hole IS the question, in place, with
its context on both sides.** Extending a pattern, continuing a sequence, completing a symmetry,
composing a shape and finding a missing addend all become *what belongs here*, asked by the two
neighbours the child can see rather than by a prompt in a box. Because the character stands at the
hole, attention and position are the same thing.

**Refusal.** The piece will not seat: it drops halfway into the socket, lifts out and returns to the
heap (`ANIM.nudge`), with no message. Then **the two pieces either side of the hole pulse in turn,
left then right** — the rule enacted as *look what is on each side*. **Third attempt:** the correct
piece takes the show-me ring.

**Diegetic progress.** The mended run itself, and the character's position along it. Unit = one hole.

**Finish.** On the last fix **the structure works**: water runs the whole length of the channel, the
bunting lifts, the gate shuts, the necklace is worn — one continuous motion along the whole span,
which is the only place in this system where a long tween is legitimate, because it is the payoff and
input is off.

**Bands.** **All.** At 5-6: a six-panel fence, **one** hole, 2-3 pieces, an AB pattern with large
distinct pieces, and the thing protected must be something a five-year-old cares about on sight.
**Sequencing at 5-6 lives here, not in FRAME 11** — the day is a run of panels with one panel missing.

**Patterns carried.** P2 · P1 · P4 · P6 · P12.

**Terrain register.** A fence · a bead necklace on a shallow curve · a bunting line · a tiled floor
(a 6 × 3 grid of 72 px cells, y 200-416) · a water channel · a stone wall · a strip of the day.

**Both deletions.** **D1:** every piece satisfies every hole; the run is "mended" whatever goes in
it. **D2a:** with the run and the thing it protects removed there are no neighbours to satisfy and no
socket to seat into. **D2b:** frozen at the first hole the character can never reach the second, so
no run of more than one gap can complete.

**Guard.** G3 + G2 + G1.

---

### FRAME 8 — THE FERRY
**Group D — the answer is a grouping.**

**Mission.** *Get everyone across. The boat only holds so many.*

**The character.** Poles the boat from bank to bank — one glide each way, **≤ 700 ms**, as a
post-feedback consequence, never between commit and verdict. Passengers walk aboard one at a time and
off up the far bank.

**Poses.** `idle` at the pole · `act` poling · `think` when someone is left standing · `happy` at the
last landing.

**World (720 × 560).** Near bank strip y 356-404, x 60-660, with the waiting group standing in a
**regular arrangement** — one row, two rows, or a ten-frame, never a heap — 36 px figures at a 44 px
pitch, up to fourteen across x 60-632. Far bank y 96-150 with the group's pens drawn as dashed
outlines. Water wash y 160-350. The boat is a container travelling between (360, 356) and (360, 170),
176 × 64; **its deck is a FRAME of dashed seats at a 40 px pitch** — 2 × 5 for a ten-frame, R × C for
an array — so capacity is visible before anyone boards.

Controls: a **gangplank tile** 88 × 64 at (250, 452) — each tap sends the next waiting one aboard —
and a **pole tile** 88 × 64 at (470, 452), which casts off. Where the level sets capacity, three
tiles 88 × 88 at (200 / 310 / 420, 486). Element count: 2 (+3) + hero = **≤ 6**. **The passengers are
not individually tappable**, which is what keeps this frame inside F-69.

**The isomorphism.** *Capacity is the divisor, trips are the quotient, and whoever is left on the
near bank is the remainder* — standing there, countable, exactly F-111's *leftovers stay visible*.
The child does not compute 12 ÷ 4 and then watch a boat; the child runs the boat and the answer is
how many times they had to. Ten to a boat makes every crossing a ten and the last boat the ones, so
place value is the ferry timetable. Floating and sinking is a prediction you make by loading.

**Refusal.** An (N+1)th passenger walks to the boat, finds no seat and **steps back onto the bank of
their own accord**. An over-full boat sits low and will not swing off the mud. Casting off empty: the
pole does not move. Nobody falls in, nothing gets wet, nothing is marked.

**Diegetic progress.** The near bank emptying and the far bank filling — two counts moving in
opposite directions, entirely wordless. The completed pens on the far bank **are** the groups made.
Unit = one passenger.

**Finish.** The near bank bare but for the remainder, the pens full, the boat moored.

**Bands.** **6-8, 8-9.** Not 5-6: a unit of units is above band, and *how many more trips* is carried
state.

**Patterns carried.** P3 (counting aboard, one seat one passenger, so one-to-one is enforced by the
object) · P2 · P10 · P1 · P11.

**Terrain register.** A river ferry · a raft across a marsh · a cable car · a cart shuttling a field ·
a lift shaft.

**Both deletions.** **D1:** the boat's capacity disappears, everyone fits, one trip ends it and no
loading decision exists. **D2a:** with the far bank and its pens removed the crossing has no
terminus. **D2b:** freeze the boat's container and no passenger can ever be delivered.

**Guard.** G1 (a landed passenger is one-way) + G2 + G4.

---

### FRAME 9 — THE EXCHANGE
**Group D — the answer is a regrouping.**
*(Grafted whole from the operation-first system. It is the best place-value design in the
submission, and place value is the last piece of school mathematics still made of objects.)*

**Mission.** *Fill the order — and the counter only takes goods in tens, so bundle them and move them
up a shelf.*

**The character.** Carries goods up and down a ladder between three shelves. Ten loose ones handed in
at a hatch come back as **one rod on the shelf above**. It physically travels between the places
where the digits live.

**Poses.** `idle` on a shelf · `act` climbing and handing in · `think` at a shut hatch · `oops` when
a rod springs back · `happy` when the docket is matched.

**World (720 × 560).** Three bays stacked, x 120-460, each 340 × 104, with its unit drawn **true to
size**:

| bay | centre y | unit |
|---|---|---|
| hundreds | 112 | flat 104 × 104 |
| tens | 236 | rod 20 × 104 |
| ones | 360 | cube 20 × 20 |

A **ladder** at x = 478 between the bays; the character 56 px climbs it. A **hatch** 96 × 88 at
x = 560 on each bay (three of them, at y = 112 / 236 / 360). The order docket at (640, 96), 112 × 72,
target numeral at 40 px. **The shelves' contents ARE the current number** — there is no separate
readout to reconcile. Supply tiles in zone H: three 88 × 88 at (220 / 330 / 440, 486), pitch 110, gap
22 ✓. Element count: 3 hatches + 3 supply + hero = **7**.

**The isomorphism.** Place value is not a rule about columns, it is an **exchange rate**, and an
exchange rate is a counter where ten of one thing buys one of another. The shelves are the columns,
so **a carry is a climb** and **a borrow is a climb down with a rod that gets broken at the hatch.**
A zero place is a shelf you walk past, empty — which is exactly what makes it a placeholder rather
than nothing. Three-digit numbers are read as the three shelves, top to bottom.

**Refusal.** Offering nine ones at the hatch: **the hatch stays shut and the nine sit on its ledge**,
which is the entire content of *you cannot carry yet*, delivered with no words. A rod cannot be split
anywhere except at the hatch, so it springs back if set down on the ones shelf. The tenth unit will
not sit down on a full shelf and slides to the hatch's ledge, which is the invitation.

**Diegetic progress.** The shelves against the docket — the child sees how much of the number is
built and which shelf is short. Unit = one bay's contents.

**Finish.** The shelves match the docket; the order is wheeled out; the finish screen shows the
numbers built, each as its shelves.

**Bands.** **6-8, 8-9.** Not 5-6.

**Patterns carried.** P6 · P2 · P11 (its home) · P3.

**Terrain register.** A goods counter · a granary · a chemist's shelves · a post room · a bank of
lockers.

**Both deletions.** **D1:** the hatch takes anything, the shelves mean nothing, the order is always
filled. **D2a:** with the docket removed there is no target for the shelves to match. **D2b:** frozen
on the ones shelf the character can never reach the tens hatch, so no regrouping can occur and no
order above nine can complete.

**Guard.** G1 (an exchange is one-way) + G4 + G2.

---

### FRAME 10 — THE LIFT
**Group E — the answer is a relation.**
*(The single best isomorphism in the submission, and the only one that makes a RELATIONAL symbol
physical rather than a quantity.)*

**Mission.** *Make the other side heavier and it will carry you up.*

**The character.** **Stands on one pan of a beam and rides it.** When the far side outweighs it the
beam swings and it is carried up to the ledge and steps off.

> **A level beam is a walkable bridge. A tilted one is a slope.**

**Poses.** `idle` on the pan · `think` looking up at the ledge · `act` riding · `oops` sliding one
step to the pan's rim · `happy` on the ledge.

**World (720 × 560).** Beam pivoted at (360, 292), 440 long, pans at x = 150 and x = 570; pan
y = 292 ± 44 by the beam's state (level 0°, or ±11°). The character 56 px starts on the **left** pan.
The ledge to reach is above the left pan at (150, 130), with the way onward on it. Rack in zone H:
four tiles 88 × 88 at x = 180 / 292 / 404 / 516, y = 486 (pitch 112, gap 24 ✓), each a numeral, a set
or an expression **with its value drawn as a stack of unit cubes on its face**. The notches already
climbed run down a narrow cliff strip at x 20-56 with the character's mark on the highest. Element
count: 4 weights + hero = **5**.

**The isomorphism.** *Comparison is the machine.* "Greater" is not a symbol to be chosen; it is which
way the beam goes and therefore whether the child gets up the cliff. **Equality is the case that
matters most**: a level beam is a road and a tilted one is not, so the equals sign becomes the
difference between a bridge and a slope — which is precisely the reading the misconception literature
says children lack.

**Refusal.** Nothing refuses a weight: the beam's answer **is** the feedback and it is always honest.
When the beam settles the wrong way the character cannot walk uphill and **slides one step to the
pan's rim** — the sanctioned setback — and the two pans' cube stacks then draw themselves side by
side along the beam so the comparison is a pair of lengths. Weights are one-use per item. Nothing
falls; nothing is lost.

**Diegetic progress.** **Height.** Each item is one notch up the gorge, drawn on the cliff strip, and
the apparatus redraws one notch higher rather than scrolling. Unit = one notch.

**Finish.** The character on the top ledge, the cliff strip showing every notch climbed, and **the
last beam left level behind it as a bridge.**

**Bands.** **6-8, 8-9.** **At 5-6 only the PREDICT form** — which pan will drop (P10; no lift, no
inverse reasoning) — because *make the other side heavier so that I go up* is a genuine inverse
inference and a means-end chain of two.

**Patterns carried.** P9 · P10 · P1 · P12.

**Terrain register.** A gorge with a counterweight · a drawbridge · a well bucket · a market scale ·
a see-saw against a cliff.

**Both deletions.** **D1:** the weights are indistinguishable, the beam never has a reason to move,
the character never rises. **D2a:** with the ledge removed the ride has no terminus and no item
resolves. **D2b:** frozen on the pan the character rides nothing; the beam may tilt and the predicate
`hero.y === ledge.y` can never be satisfied.

**Guard.** G4 + G2 + G3 (the weight set is re-dealt; the beam does not move).

---

### FRAME 11 — THE WORKS
**Group F — the answer is an order.**

**Mission.** *Get it running — and it will only run in the right order.*

**The character.** Clambers along a machine, or walks a ring, from stage to stage, setting each one.
When a stage is set it **runs**, and the material travels one stage further.

**Poses.** `idle` at the current stage · `think` leaning toward the next · `act` working the lever ·
`oops` when nothing happens · `happy` at the first product.

**World (720 × 560) — two topologies.**

**(a) CHAIN.** Five stages, each a 110 × 120 housing, at x = 120 / 248 / 376 / 504 / 632, y = 230
(pitch 128, gap 18 ✓; right edge 687 ✓; left edge 65 ✓). The product exit at the far end. The
character on a walkway at y = 322. Parts in zone H: three tiles 88 × 88 at (200 / 330 / 460, 486).
Element count: 5 stages + 3 parts + hero = **9**.

**(b) RING** — for cycles: the day, the seasons, a life cycle. Six stations, each a 104 × 92 card, on
a ring of radius 150 about (300, 250): (450, 250) · (375, 380) · (225, 380) · (150, 250) ·
(225, 120) · (375, 120). Adjacent chord 150 px against a 104 px card ✓. The centre holds the thing
that changes across the cycle. The ring path is a faint 4 px line; completed arcs redraw at 8 px
`structure`. Element count: 6 stations + hero = **7**.

> **The clock is the ring as an INSTRUMENT, not as twelve stations** — a face centred (300, 250),
> r = 150, with twelve hour marks and twelve five-minute marks, counting as **one** element under
> §5.1, with the character riding the hour position. Twelve independent stations would be thirteen
> elements and would breach F-69.

**The isomorphism.** A procedure with prerequisites **is** a route with locked doors: you cannot
water a seed you have not planted, because the watering stage's shutter is down until the seed is in
soil — and the child discovers the dependency by pushing at it rather than by being told. **Doing
step 3 before step 2 is refused by the machine, not by the game**: the chute above the lever is
empty and the lever turns nothing. A cycle drawn as a ring is the concept itself, because order
becomes a direction of travel and the closed loop is what distinguishes a cycle from a list.

**Refusal.** The lever moves and nothing happens; the empty chute above it is the reason and it is
visible. On the ring: the character leans toward an out-of-turn station and stays put, that station's
scene stays shut, and the arc between the last completed station and the true next one lights faintly
for 800 ms. No return trip, no mark. **Second miss:** the station whose shutter IS up gains a soft
outline.

**Diegetic progress.** How far the material has travelled along the machine; the ring lighting arc by
arc; the thing in the middle changing stage. Unit = one stage.

**Finish.** The machine running end to end with the first product dropping out of the chute; or the
closed lit ring with every station in its final state and the character back where it started.

**Bands.** **6-8, 8-9 only.** A multi-stage procedure is a subgoal chain and 5-6 cannot spare it;
**5-6 sequencing takes FRAME 7 instead** — a run of panels with one missing.

**Patterns carried.** P4 (its home) · P2 · P1 · P9 · P6.

**Terrain register.** A mill · a pump chain · a lock system · a potting bench · a ring of the day · a
year wheel.

**Both deletions.** **D1:** every shutter is up, order does not matter, the route is arbitrary and
any input completes. **D2a:** with the machine and the product exit removed there is nothing for a
stage to be *before*. **D2b:** frozen at stage 1 the material never travels and no chain of more than
one stage can complete.

**Guard.** G1 (a run stage is one-way) + G2 + G3.

---

### FRAME 12 — THE ERRAND
**Group G — the answer is a place named by language.**

**Mission.** *The note says where. Go there and do what it says.*

**The character.** Walks to a named place in one scene and **puts its own body into the relation** —
it goes *under* the bridge, stands *between* the two stones, climbs *onto* the shelf, comes out from
*behind* the tree — then carries what it finds to the second named place.

**Poses.** `idle` · `think` re-reading the note · `act` reaching · `oops` on an empty hand · `happy`
setting a thing down.

**World (720 × 560).** **One scene** across x 60-660, y 100-380, built from three or four large
landmarks 130-160 px each, drawn as low-contrast `surface2` washes so nothing competes with the
character. Six relation places, each an 84 × 84 target, all ≥ 100 px apart:

in the box (150, 250) · under the bench (250, 360) · between the two stones (400, 240) ·
beside the gate (360, 378) · on the shelf (520, 170) · behind the tree (600, 300).

The character starts at (110, 350). The note is pinned at (78, 130), 140 × 96, and is **tappable to
re-read** — re-reading is never an attempt. Element count: 6 places + note + hero = **8**.

**The isomorphism.** *Reading is navigation.* The sentence, the pictogram or the position word **is**
the route, so comprehension is the only thing that can tell the character where to go, and a
two-clause instruction is literally two moves. And for position words specifically: **a spatial
preposition is a relation between two bodies, and the only way to be sure a child has it is to put a
body into that relation.** Steering the character under the bridge **is** parsing "under", because
the word has no other content. There is no translation step between the language and the world.

**Refusal.** The character walks to the tapped place, reaches, and its hand comes back empty with a
small puff; it stays where it is and the leg is not stamped. **Second miss:** the note's current
glyph enlarges and the landmark it refers to takes a soft outline — the relation is narrowed before
the place is given. **Third:** the true place takes the show-me ring.

**Diegetic progress.** The scene becomes the thing it is being prepared for — boots by the gate, lamp
on the shelf, basket under the bench — and when the last errand lands, something happens across the
whole scene: the door opens, the visitor arrives, the light goes on. Unit = one place filled.

**Finish.** The finished scene, with the notes stacked beside it.

**Bands.** **5-6** (one-leg errands — *go under the bridge* — destination on screen, one tap
resolves it, payoff inside the item), **6-8** (five places, a sentence of at most eight words,
fetch-and-put as two moves), **8-9** (two-clause instructions, literal recall from a short text the
child can re-open). Position words specifically are 5-6 and 6-8.

**Patterns carried.** P1 · P2 · P4 · P7 · P12.

**Terrain register.** A room being tidied · a yard before a visitor · a shed · a beach · a kitchen
table set for a meal · a burrow.

**Both deletions.** **D1:** nothing names a destination, every place is as good as another, walking
is aimless and any input completes. **D2a:** with the scene's landmarks removed there is no place for
a relation to hold between. **D2b:** frozen at its start the character's body is never in any
relation, so no leg can be stamped.

**Guard.** G1 + G2 + G3 (the note's target varies, the scene does not).

---

### FRAME 13 — THE GATHERING
**Group H — the answer is a partner.**

**Mission.** *They got separated. Bring each one back to the one it belongs with.*

**The character.** Hops to the one it is calling (**≤ 300 ms**) and offers. If they belong together
the two walk back and **the new one falls in behind**, so the line grows visibly across the screen.
If not, the little one stays where it is and the character comes back alone.

**Poses.** `idle` at the head of the line · `think` scanning the meadow · `act` calling · `oops` when
nobody comes · `happy` when the line files in.

**World (720 × 560).** Home at a corner: a fold, burrow or barn 140 × 120 at (100, 300). Up to six
companions at fixed spots within x 200-640, y 120-360, each 84 × 84, **≥ 100 px apart**. The
character starts at (170, 400); the line grows behind it along y = 400 at a 46 px pitch. Element
count: ≤ 6 companions + hero = **7**. Zone H is empty, or holds the single thing being offered.

**The isomorphism.** *Matching is reunion.* A companion joins only if presented with its own —
its pair, its partner-number, its rhyme, its other half — and **the length of the line behind the
character is the count.** Every P12 board in the catalogue is already a set of separated pairs; this
frame only says out loud what the board was always about, and turns a click into a journey the two of
them make together.

**Discriminator against FRAME 6.** *Is the partner a PLACE or a PERSON?* A place accepts or refuses
by shape and stays where it is; a person comes with you and joins the line.

**Refusal.** The little one looks away and stays put. It is never scared, never lost, never taken; it
does not move at all. **Second miss involving the same one:** its true partner takes a soft outline.
The board never resets.

**Diegetic progress.** **The line behind you** — the most legible progress display in the system: a
five-year-old reads *four found, two to go* from a photograph. The meadow thins as the line grows.
Unit = one companion.

> **The procession is also available as a progress DEVICE to any other frame** — a growing line of
> the things you have brought in, drawn along the foot of zone W. It is the object in its new state,
> not a token, so it satisfies §6 D4.

**Finish.** The whole line filing in through the door, in order, the character last.

**Bands.** **All.** At 5-6: three companions at 96 × 96, all visible (memory load is never the
objective), one reunion per item, payoff inside the item.

**Patterns carried.** P12 (its home — 18 games) · P1 · P8 · P2.

**Terrain register.** A meadow at dusk · a rock pool · a hedgerow · a farmyard · a snowfield · a
station platform.

**Both deletions.** **D1:** everyone follows anyone, so no offering is better than another and the
line fills on any input. **D2a:** with home and the line removed there is nowhere for a pair to be
brought back to. **D2b:** frozen at the head of the line the character can never reach a companion to
offer to.

**Guard.** G2 + G3 (the pair set is re-dealt; the meadow's spots are fixed) + G1.

---

## 4 · The pattern-to-frame map

Every pattern gets a **home** — the frame where the input verb and the mission verb are literally the
same act — plus secondary frames, and a named catalogue game.

| pattern | games | **home frame** | also | named example | what the walk becomes |
|---|---|---|---|---|---|
| **P1** tap one of N | 41 | **1 CROSSING** | 2, 6, 5, 13 | **002 `numeral-nest`** | the numeral tile becomes the flagstone the hen stands on |
| **P2** tap to place | 31 | **3 SPAN** | 7, 4, 9, 6 | **004 `bridge-of-ten`** | the beaver starts out on the half-built bridge; its x is the built length, not a reward tween |
| **P3** tap to count | 17 | **4 REACH** (vessel) | 8, 3, 13 | **001 `feed-the-fox`** | one trip per berry; the bowl's fill line is the cardinal and the numeral tail is deleted |
| **P4** tap in order | 22 | **11 WORKS** | 1, 7, 12 | **093 `seed-to-flower`** | the watering stage's shutter is down until the seed is in soil |
| **P5** drag | 0 | — | optional accelerator on any P2 path (6-9 only) | — | nothing depends on it |
| **P6** build on a grid | 8 | **1 CROSSING** (grid ground) | 3, 9, 7, 4 | **020 `hundred-square-trail`** | one cell right is +1, one row down is +10; the trail is the record |
| **P7** trace a path | 8 | **1 CROSSING** | 12, 3 | **008 `frog-hops`** | the landing pad IS the answer — Malone's *Darts*, already in the corpus |
| **P8** sort into bins | 25 | **6 APERTURE** | 2, 8, 13 | **005 `shape-sorter`** | the bin becomes a shaped hole; a rotated square goes through and turns itself upright |
| **P9** set a value | 8 | **4 REACH** (ride) | 10, 5, 11 | **164 `hot-or-cold-thermometer`** | the thermometer is the ladder and the animal climbs it |
| **P10** predict then reveal | 13 | **5 LEAP** | 8, 10, 4 | **023 `hidden-part-cup`** | the guess is the jump; the shortfall arrives as a plank with countable notches |
| **P11** keypad entry | 9 | **9 EXCHANGE** | 4, 8, 5 | **019 `read-the-rods`** | the typed number is the shelf state; a carry is a climb |
| **P12** match pairs | 18 | **13 GATHERING** | 6, 7, 10 | **161 `animal-babies`** | the lost young file in behind you; the line is the count |

**Reading the table.** The home is a default, not an assignment. **Frame is chosen from the shape of
the CONTENT (§2.4), and where the two disagree, the content wins** — `120 bar-chart-reader` is a P11
game whose content is a height, so it takes FRAME 4, not FRAME 9 (§8).

---

## 5 · The F-42 rule — movement against cognitive load, checkable on a spec

F-42 bans decorative motion while the child thinks (seductive details, g = −0.33). A moving character
is on its face exactly that, so the rule separating germane motion from extraneous motion must be
mechanical, not a matter of taste.

> ### MOTION IS A CONSEQUENCE, NEVER A COMPANION
> Play runs a strict two-beat cycle. **DECIDE** — a choice is open, the stage is frozen. **ACT** —
> the child has tapped, the world answers. There is no third state.

**DECIDE.** Not "calm": **frozen.** Nothing tweens, loops, breathes or drifts. The character holds
**one static pose** at one coordinate. It may have *changed* pose when the item was posed (`idle` →
`think`, oriented toward the thing that matters) — that is a swap, not an animation.

**ACT.** Every target disabled. The world moves, and every moving pixel is the consequence of the tap
that just happened.

### 5.1 Six clauses, all mechanically checkable

| # | clause | assertion | poison (must FAIL) |
|---|---|---|---|
| **F-42.1** | **FREEZE.** Nothing animates while a choice is open. | At every decision point of a full `qa-game` session, and 200 ms after input re-enables: if any target reports `enabled`, then `scene.tweens.getTweens().filter(t => t.isPlaying()).length === 0`, excepting the keyboard focus ring and tweens carrying `t.data.role === "hint"` (finite, ≤ 1500 ms, non-repeating). | add a one-line idle bob to the mascot |
| **F-42.2** | ⭐ **ACT IS NOT SILENT.** | Within **100 ms** of a commit tap the same count must be **> 0**. | delete all motion from the game |
| **F-42.3** | ⭐ **DERIVATION.** At least one parameter of the character's motion is a **pure function of the answer's value** — destination node, step count, distance, direction, repeats, or the length of the thing carried. | **Differential:** drive item *k* twice through `LCS_TEST.wrong()` and `LCS_TEST.correct()`, record the character's terminal (x, y) **and** its step count; the two runs must differ. | make the character's traversal byte-identical whatever the child answered |
| **F-42.4** | **NO LOOPS.** | No `ANIM` entry carries `repeat: -1` or `loop: true` outside the file's `SHOW_ME` allowlist (the ≤ 1 Hz attention pulse), and no `scene.time.addEvent({ loop: true })` targets an object drawn from `ART`. Grep-checkable per file. | add an ambient scenery loop |
| **F-42.5** | **BUDGET, two-part.** | The **answering move** — commit to the world's verdict — is **≤ 300 ms** (F-40's feedback latency). The **whole ACT window**, including any post-verdict consequence travel, is **≤ 1200 ms** (≤ 1500 for a level completion). **Total ACT time per session ≤ 60 s.** | make the hero cross the stage before the verdict |
| **F-42.6** | **CO-LOCATION.** | Apparatus, character and readout in one frame, one saccade apart; the readout is drawn **on** the object; zero camera tweens between item-start and commit. | a world screen that opens a problem panel |

**F-42.2 is the clause that stops the gate being vacuous**, and it is the reason a freeze rule alone
is worthless: a game with no motion at all passes F-42.1 perfectly. **F-42.3 is the clause that
separates a mission from a mascot**, and neither of the other two can see it: a walk whose duration
matters but whose destination does not is decoration with a stopwatch. **A walk that fails F-42.3
must be DELETED, not shortened.**

### 5.2 Exceptions, exhaustively

1. The **once-only demonstration** on the first item of a new mechanic, which F-42 permits verbatim.
   Input off throughout.
2. The **world build** at item start — the new stacks rising, the next fence line arriving —
   `ANIM.appear`, **≤ 400 ms**, input off for the whole of it. Input enables when the last `appear`
   completes.
3. The **breathing idle** (2 % scale, 3 s), on the **Boot and Finish screens only**, per ART-BIBLE §6.
4. The **stuck cue**: after 8 s with no input, one non-looping pulse of one hint element, ≤ 600 ms, at
   most once per 8 s, and **never on the character** — a mascot that fidgets at you is ambient motion
   with an excuse.

Nothing else.

### 5.3 Why this satisfies F-42 rather than negotiating with it

Seductive-details harm is measured on motion that **competes with the material** for attention. Under
F-42.1 nothing moves while the child is choosing, and under F-42.3 the character's motion **is** the
material — the child's own answer, rendered at full size, which is the enacted feedback F-43 asks for
(EF 0.49 against KR 0.05).

And the larger half of F-42 is split attention, g = 0.63: **a world map that opens a problem panel is
a split-attention format by construction.** F-42.6 forbids it, which is why no frame in this document
has a hub, a map, a second screen, or a readout that is not drawn on the object it describes.

> ⚠ F-42 is graded *"★★★ direction, ★★ magnitude at 5-9"*, and its source is explicit that most CLT
> studies use adolescents and adults, while working-memory capacity is smallest in this band, so
> extraneous load bites **harder**, not softer. **The uncertainty is asymmetric downward for 5-6. Do
> not read ★★ as licence.**

### 5.4 Journey is a property of the ARRANGEMENT, not of the animation

A photograph of a hiker on a ridge reads as a journey and nothing in it is moving. **The 110 bobbing
mascots do not fail because they are under-animated — they fail because they are at a fixed
coordinate with nowhere to be.** A character standing perfectly still, halfway along a visible route,
facing a destination it has not reached, with a settled causeway behind it, reads as *on a mission*
in a still frame, at 400 px, with no motion at all.

This is what makes the whole system affordable inside a fixed stage with no spritesheets and five
poses. **Travel time is not the goal. Somewhere to be is the goal.**

---

## 6 · Stakes without failure

Nothing can be lost, so the wanting has to come from somewhere structural. The governing rule first,
because it draws the line the devices sit inside.

> ### THE RATCHET RULE
> **Every state in the world may move only toward better. Nothing decays with time, and nothing
> decays with an error.** A wrong answer may fail to advance the world; it may never reverse it.
> Every correct answer sets a **high-water mark the world may never drop below**.

This settles the cases that otherwise look ambiguous. A wilting plant that starts unwell and only ever
improves is legitimate. A plant that wilts *further* on a wrong answer is a losing state in a
costume. Same test for a draining pool, a guttering lamp, a melting bridge: **if it can get worse, it
is banned.**

### D1 · THE DRAWN DEFICIT — and the rule that the goal must visibly move

The game opens on a state that reads as **not yet right**: the empty bowl, the twelve empty bays, the
gap in the bridge, the flock outside the pen, the hole in the quilt. Not a question asked of a world
that is fine — **a world that is not fine.** The empty slots are simultaneously the deficit, the
promise and the progress rail, which is why §2.6 can delete the dot rail rather than replace it.

> **The goal must visibly move on every single item.** The goal object is drawn as **N discrete units
> where N is the item count** (8-15), and **exactly one unit resolves per item.** Where the goal is
> continuous — a span, a height — the spec declares the **unit size in logical px** in its `mark`
> field, and the deficit's drawn extent must shrink by **at least one declared unit** per item.

The gate measures the deficit at every item boundary and asserts strict monotone decrease against the
**spec's own declared unit**. There is no invented threshold anywhere in this rule: N comes from the
item count and the unit comes from the spec. This is the only mechanical answer any of the candidate
systems produced to *would this be boring on the third item*, and it alone would have caught all 110
bobbing mascots with no other rule in the document.

**A frame that cannot draw its deficit in the first frame has no stakes and is not a frame.**

### D2 · THE RECOVERABLE SETBACK — ground, never state

A refused move costs the character a re-walk denominated in **the same currency as progress**: one
plank stepped back, one rung of re-climb, one return trip to the rack, one step to the pan's rim,
one wasted crossing. The child feels a real cost and can read exactly how much it was.

Three binding constraints: **(a)** the setback must be undone by the same move that caused it, so the
child always knows the way out; **(b)** it may never remove a **completed** item, only un-advance the
current one; **(c)** it is **silent** — `tone("nudge")` and the object's own motion, no string, no
colour change, no face. A wrong answer can cost you the walk you are on; it can never cost you a
thing you have already banked.

### D3 · THE WAITING PARTY — someone is already there

The recipient is on screen from the first frame, in zone W, at a fixed coordinate, holding the thing
it lacks: the chicks in the nest, the friend on the far bank, the crablings behind the wall, the
sleeper under the quilt. The stake is **somebody else's state**, and it is structurally incapable of
being lost — the waiting party is never harmed, never leaves, never gives up.

**It has exactly two states, WAITING and SATISFIED, and its pose changes exactly once, on arrival.**
It never gets sadder while you think, never looks disappointed, never reacts to a wrong answer at
all. **A face that responds to failure is a punishment with fur on it.** A waiting party that reacts
to each correct answer becomes an approval meter, which is F-44's banned shape.

The wanting is carried by the **object it holds out**, never by its face — which is also the cheapest
thing in this document to draw, and the strongest device at 5-6.

### D4 · THE MARK THAT STAYS

Every correct move leaves something permanent: a stone settled into a causeway, a plank laid, a rung
nailed, a shelf stocked, an opening filled, a companion in the line. Nothing ever un-marks; the world
improves monotonically; the child can see at any moment the thing they have made. **Accumulation is
stake without jeopardy.**

The mark must be **the object itself in its new state, never a token representing it.** A lit lamp,
not a star awarded for lighting a lamp. That distinction is the whole of F-66.

### The absolute prohibition, restated

**No timer. No countdown. No clock as a pressure device. No lives. No game over. No losing state of
any kind. No score, no points, no stars, no badges, no unlockables, no currency. No rival who can
win. Exactly ZERO ways a session ends other than by finishing.** Invalid moves are refused with a
nudge and no message. Success is certain: the three-attempt ladder always ends with the item
completed.

### Losing states in costume — the banned list

Each of these is easier to design than the four devices above, and each will be proposed again.

| tempting | why it is banned |
|---|---|
| a crumbling bridge, a rising tide, a guttering lamp, a closing tunnel | violates the RATCHET RULE — the world decays. Any state that changes while the child's hands are still is a clock. |
| a pursuer, a shark, a rival racing you | F-45 (competition lowers young children's intrinsic motivation; 5-6-year-olds who lose choose to compete less), F-75 (Shark Numbers is named in the research as *the* counter-example). A pursuer is a timer with teeth. |
| fuel, energy, a battery, a health bar, "three pushes left" | a life meter renamed. A life bar that cannot reach zero is decoration; one that can is a loss. |
| a pet that must be fed, or gets sad if neglected | a need that grows while you are away is a timer, and there is no storage, so the pet forgets you between sessions. |
| "the plant will die if you get it wrong" | decay, and it makes the child's error harm a living thing. |
| a companion who gets left behind | a loss, and a cruel one at this age. |
| a locked door that stays locked | violates F-46 (success is certain) and F-61 (zero non-finishing ends). |
| a persistent cumulative error display — a tally of wasted trips, a count of misses | a score with the sign flipped (F-44). A setback is felt once, in fiction, and is not written down. |
| a shop where you can run out of money | a depletable resource is a losing state with an accountant. |

---

## 7 · Band 5-6 — the 64 games

Four developmental facts bear on this band and **none is in the research base**: working memory is
~4 digits at five with 2-3 chunks in the focus of attention (a goal + a location + a quantity + a
numeral is at capacity *before the maths starts*); goal-plan-outcome narrative comprehension is only
*emerging*; multi-step subgoal chaining is fragile (2-move planning ~4-5, 3+ move ~6-7); and a payoff
eight items away is a delay-of-gratification problem, not a goal. This is also the band with a **zero
text budget** and no audio to narrate with.

Twelve rules. Six are structural, and six are about what the mission may be **about** — which is the
half every layout-led system omits, and 64 games depend on it.

### Structural

**S1 · The mission completes EVERY ITEM.** At 6-8 and 8-9 the mission may span the session and the
item is a step in it. At 5-6 the whole loop closes every 25-40 seconds — a bowl filled, a stream
crossed, an opening filled, a companion reunited — and the **session-long artefact is the ROW of
completed missions** (eight full bowls, eight mended fences), which needs no memory to appreciate. A
five-year-old cannot hold *we are half way up* for six minutes; they can hold *the fox got its
berries* for four seconds. **No journey, no navigation, no subgoals, no carried position.**

**S2 · One means-end link, both ends visible, ≤ 350 px apart.** Never *collect, then carry, then
return, then report*. Fetch-and-give, or count-and-fill, or bring-it-in. **If the mission has a middle
you have to remember you are in, it is a 6-8 mission.**

**S3 · The goal is re-readable at every instant** — drawn, permanently, in the same place, from the
first frame. Never in a bubble that fades, never implied by a previous item. A five-year-old forgets
the goal roughly as often as they look away from it.

**S4 · Cause and effect adjacent.** The character begins acting within **150 ms** of the tap and has
finished within **800 ms**. Total ACT budget at this band: **900 ms**. A delayed consequence is, at
five, an unrelated event.

**S5 · The choices are the WORLD, not a tray.** At an 80 px floor with 12 px gaps, a stage that must
also hold a character, a goal and an artefact affords about **six** decision objects. So the 5-6
frames are the ones whose choices **are** the terrain — the stones, the openings, the pieces, the
places, the companions — and any frame that keeps a tray cuts it to three or four tiles.

**S6 · The floors, applied to the WORLD.** Every destination — an opening, a stone, a place, a
companion — is **≥ 80 × 80** with **≥ 12 px** clearance, exactly as a choice tile would be. Never
off-screen, never occluded, never behind anything. **At most eight tappable things**, and the source,
the supply and the character are not among them: the character fetches automatically, so the child
never has to sequence *pick up* before *deliver*.

### What the mission may be about

**C1 · The verb must be one the child has performed by age four.** Feed · fill · put away · give ·
bring · cover · wake · gather · mend. **Not** *repair-for-a-reason*, not *deliver-on-behalf-of*, not
*trade*, not *rescue-then-return*, not *escort*.

**C2 · The character is more often the RECIPIENT than the agent.** The child brings; the animal
receives. Where the character does travel, the route is at most **five hops** and every hop is
drawn as a visible foothold, so the plan sits on the screen instead of in the child's head.

**C3 · No fiction that requires a WHY.** *The fox is hungry* is enough. *The bridge fell in the storm
so the market is cut off* is a story with a premise, and the premise will not survive item two.

**C4 · There is no story, there is a SITUATION.** The test: **if the mission cannot be stated by a
single frozen frame with zero words, it is not a 5-6 mission.** Someone holding an empty bowl. A gap
with a friend across it. A hole in a fence with the flock behind it. A situation needs no *before* and
no *after*, which is exactly why it survives a child who cannot hold a sequence of events.

**C5 · The mission is stated as a PICTURE OF THE END STATE.** A goal ghost — the finished thing drawn
at 25 % alpha at the destination. Zero words on the play surface is this band's budget anyway; the
picture is what buys something with it.

**C6 · Refusals must be PHYSICAL AND INSTANT.** Will not reach, will not fit, will not open, will not
come. A conditional or delayed refusal cannot be traced back to its cause at five. And the
character's `think` pose must **orient toward the thing the child should look at** — that is a real
means-end scaffold, modelling the goal-directed attention the child does not yet generate for
themselves.

### The 5-6 frame set

Eight distinct shapes for 64 games, ≈ 8 games each, and every one of them carries a terrain register
of 4-6 worlds — so the redundancy gate sees roughly two games per (frame, terrain) pair at this band.

| frame | its 5-6 form | verb |
|---|---|---|
| **1 CROSSING** | the **single stream** — three stones 96 × 96 at (216 / 360 / 504, 300), a friend across, one crossing per item | cross |
| **3 SPAN** | the **three-plank stream** — a gap of three notches, unit planks only | mend / cross |
| **4 REACH** | the **vessel** — one unit per trip, a fill line, no numeral tile anywhere | fill / feed |
| **5 LEAP** | the **jar** — commit with three tiles, the lid lifts, the contents count themselves out | look |
| **6 APERTURE** | **two openings**, one thing at a time, ≥ 108 px, silhouettes maximally different | put away |
| **7 MENDING** | a **six-panel fence**, one hole, 2-3 pieces | mend / cover |
| **12 ERRAND** | a **one-leg errand** — go under the bridge | bring / give |
| **13 GATHERING** | **three companions**, all visible, one reunion per item | gather |

**Out of band at 5-6, in their full form:** 2 FOOTING (a route is navigation), 8 FERRY (a unit of
units), 9 EXCHANGE, 10 LIFT (an inverse inference — it gets the predict form only), 11 WORKS (a
subgoal chain). Sequencing content that would have gone to 11 goes to 7 instead; membership content
that would have gone to 2 goes to 6.

---

## 8 · The worked transformation — spec 120 `bar-chart-reader`

**Frame 4 THE REACH**, ride form. **Terrain:** a harbour crane. **Pattern P11**, kept — and made
load-bearing. **Band 6-8. Items 12. Levels L1/L2/L3 unchanged.**

**Objective, invariant:** *finds the bar the question ring points at, reads its top against the
gridlines and axis labels, and types that number (at the third level, the total of the two ringed
bars).*

### 8.1 BEFORE — verbatim from the spec

> Zone A/B left: the chart — `ART.axisY` … eleven `ART.gridLine`s … three bars (`ART.bar`, 56 wide)
> … under each bar its category icon … the ASKED icon (cat) sits inside `ART.askRing` …
> **The koala at (60, 240) looks at the chart.**
>
> Zone A/B right: the keypad — nine keys … a fourth row … backspace … and 0. Zone C: OK
> (`makeButton ok`) at (420, 440), disabled until the display holds a digit.
>
> **Correct (6)**: the display `ANIM.pop`s … **the koala `ANIM.nod`**; the rail dot fills.

A chart, a keypad, and a koala that nods. The koala is named in the layout, named in the correct
branch, and named on the Finish screen — and **nowhere else in the whole specification**. The state
variable is `answer === bar.value`: a comparison between a typed number and a stored field. Delete
the koala and every item still completes. It fails D2a, D2b and F-42.3 simultaneously.

It also carries three violations of the shared contract that a rewrite must not inherit: axis labels
at **16 px** and row badges at **11 px** against §12's 24 px floor for this band; and a keypad at a
**8 px** gap against §3's 12 px minimum.

### 8.2 AFTER — *the harbour crane*

**Mission.** *Every animal on the quay has a stack of crates to get aboard the barge. The crane's
grab has to be level with the top of a stack to lift it in one go.*

**`S` — the crane's altitude.** Read mathematically it is the value the child has entered. Read
physically it is where the otter is on the mast. **One variable, two readings.**

**`mark`** — the barge's manifest, twelve bays, unit = one bay. **`guard`** — G4 (the answer space is
21 rails, against three tiles in the original) + G2 + G3 (the stacks are re-dealt per item; the wall
does not move).

#### Stage

**720 × 720, declared per BUILD-CONVENTIONS §2** — a 21-rail scale with every integer labelled at the
24 px floor cannot exist on a 560 px stage, and estimating a bar tip is the one thing F-118 forbids.
The whole stage is zone W: the crane's control box is a **physical part of the apparatus** and stands
in the world per §2.6; zone H is empty.

#### The world, built once and standing for the whole session

- **Quay line** y = 616, 3 px `ink`, x 72 → 470.
- **Rails 0-20**: rail *u* at **y = 616 − 26u** (rail 20 at y = 96), 1 px `line` hairlines from
  x = 72 to x = 470. **Rail numerals 24 px `display`, right-aligned to x = 64** — multiples of five in
  `ink`, the rest in `inkSoft`. Left-most text edge ≈ 40 ✓.
- **The stacks.** One crate is **56 × 26** — exactly one rail interval — stacked from the quay
  upward, so a stack of six tops out flush with the rail labelled 6: **the bar geometry is the
  carpentry.** L1: three stacks 56 wide at x = 150 / 262 / 374. L2 and L3: four stacks 48 wide at
  x = 138 / 226 / 314 / 402.
- **The owners.** Each stack's animal icon, 32 px, on the quay at y = 646 — all the same size, no
  stack marked out by colour. The asked one carries `ART.askRing` (r 30).
- **The mast** at x = 500, 12 px `structure`, y 80 → 640.
- **The cradle**, 88 × 42, at (500, railY), with the otter (`ART.otter`, 56 px) standing on it and the
  **grab jaws** drawn at its left edge at (456, railY).
- **The index line**, 6 px `structure`, from x = 76 to x = 452 at railY. *This is the child's own
  gridline, and it is the thing they line up.*
- **The cradle board**, 64 × 44 at (556, railY), carrying the altitude numeral at **40 px** —
  **the readout rides the character**, so F-42.6 is satisfied by construction rather than by a card
  at (170, 440).
- **The control box**, `surface` roundRect 196 × 320 at (604, 242), `line` 2 px — an apparatus, not a
  tray. Keys **56 × 56** at columns x = 536 / 604 / 672, rows y = 140 / 208 / 276 (**pitch 68, gap
  12 ✓**), 1-9 in phone order; row four y = 344: backspace (570, 344), 0 (638, 344).
- **The HOIST lever**, 160 × 64 at (604, 470), `ART.hookGlyph` — disabled until the board holds a
  digit.
- **The barge**, hull 200 × 112 at (604, 612). Its manifest is **twelve bays, 24 × 44, in two rows of
  six** at x = 520 + 32*i*, y = 586 and 638 — **drawn empty, dashed, from the first frame.**

**There is no dot rail and no `t("question_x_of_y")`.** The twelve empty bays are the deficit, the
promise and the progress in one object (D1), and one bay resolves per item.

**Element count: the keypad (one instrument) + HOIST + the otter = 3.** The shipped spec has twelve
targets; this is a reduction, and it settles §9.4's open conflict in the safe direction.

#### How it plays

**1 · Start.** `GameCore.makeStartScreen`, title "Bar Chart Reader". The otter at (360, 240) beside
its cradle; the barge at the right with twelve empty bays. Language picker at (16, 16), hidden under
`?embed=1`. Never auto-starts.

**2 · Item 1 (L1: dog 4, cat 6, rabbit 2; the cat is asked).** The three stacks grow from the quay
(`ANIM.grow`, 400 ms, input off). The cat's icon takes `ART.askRing`. **That is the whole prompt** —
no caption is required, and the two game strings survive only as the 6-8 band's optional ≤ 8-word
premise. The cradle is wherever the last item left it (rail 0 on the first item). Input enables.
**From here until HOIST, nothing on the stage is moving.**

**3 · Cranking.** Each digit appears on the cradle board (`ANIM.digitIn`, `tone("tap")`) and **the
cradle rides to that rail** — 140 ms per rail, the index line travelling with it, so the number the
child is typing is the height the character is at. Two digits maximum; backspace removes one; the
physical 0-9, Backspace and Enter do the same. **Cranking is free and is not an attempt** (G4): the
index line is drawn, but the tip line and the row badges are not, so the child must judge level-ness
themselves — which is the skill.

**4 · The commit.** HOIST. Input off. The grab closes at the cradle's rail.

- **Level with the top crate (6).** The jaws get under the top crate, the **whole stack lifts** and
  swings into the next empty bay of the barge, where it settles as a bar drawn at 2 px per crate —
  so the manifest is a bar chart of the session, accumulating. `ART.tipLine` draws across the wall at
  the stack's top and the rail numeral pulses: **the reading is modelled on every success, not only
  on failure** (F-43). `tone("correct")`, `GameCore.showPraise`. The owner walks up the gangplank.
  The cradle **stays exactly where it is** — its altitude persists into the next item (§2.7, L2),
  which is what the L3 totals need. After 900 ms the next stacks grow.
- **One rail out (5 or 7 for 6).** The jaws close on the crate face and **cannot get under the top**;
  they open again. `tone("nudge")`. Then the asked stack **counts its crates** from the quay —
  `ART.rowBadge` 1, 2, 3 … at **24 px**, `tone("tap", k)` with the pitch climbing, the last badge
  growing — `ART.tipLine` draws at the true top and the matching rail numeral pulses. **The count and
  the label agree in front of the child, and the otter is standing one crate below the answer.**
  Nothing enters the barge. Attempt 2.
- **Another stack's height (the graph-as-picture error).** The grab travels to **that stack's top
  level** and closes there; **that owner looks up, because they did not ask**; the index line is
  visibly crossing the asked stack partway up. The ask ring pulses, then the asked stack counts. This
  is a strictly better rendering of the spec's misconception 2 than *dim every other bar*: the child
  has gone to the wrong house, which is what reading the wrong bar actually is.
- **The number of stacks or of icons (3 or 4).** The grab goes to that rail; the asked stack counts.
  **Nothing anywhere in the harbour is ever labelled with how many stacks there are.**
- **Two digits reversed (21 for 12).** The mast physically stops at rail 20: the cradle rises to the
  head-block and jams under it. **The ceiling refuses the impossible value before any hint is
  needed.**
- **Attempt 3 — the show-me.** The same enactment, then the answer builds itself on the cradle board
  digit by digit (tens first while rail 10 is marked, then the ones), holds 1200 ms and clears; the
  child re-cranks and HOIST carries `ART.showRing`. The stack goes aboard as solved-with-help — no
  praise pop, and the bay's bar is drawn from a single hook rather than two, which is a non-colour,
  non-score cue. **There is no attempt 4 and no way for this to end other than the bay filling.**

**5 · L3 — the total of two stacks.** Two icons are ringed with `ART.plusMark` between them: the two
animals are shipping together. On HOIST **the crane sets stack B on top of stack A** — B's crates
counting on from A's without restarting, *a+1 … a+b*, which is F-105's counting-on made physical —
and the grab is level with the joined tower or it is not. A child who answers with one stack's height
watches the joined tower rise visibly above their own grab. **The commit is a geometric relation
between the otter's y and a tower the world just built, not a comparison against a stored total.**

**6 · Re-queue (F-41).** An item hoisted wrong first-try sends its owner **to the back of the queue on
the quay** and returns two items later with the stacks re-dealt. The child can see the animal they
have not managed to load yet, standing in the line. Levels and the 2-up / 2-down ladder are
unchanged.

**7 · Finish.** The twelfth bay fills; the gangplank lifts; the barge pulls out to the right
(`ANIM.sail`, 1200 ms) with `ANIM.celebrate` on the otter. `t("all_done")` at 52 px. **The summary is
the manifest, redrawn larger**: twelve bars at 3 px per crate with their numerals at **24 px** — the
spec's twelve mini charts, except they are the cargo the child loaded. First-try loads carry
`ART.dotFull`, helped ones `ART.dotEmpty`. `play_again` and `menu`. Session ≈ 6 minutes.

### 8.3 The audits

**Misconceptions: 5 preserved, 5 re-staged, count unchanged, duration ≥ the original's**, and two of
them (the reversal and the number-of-stacks) are now **partly unrepresentable** rather than corrected
— the mast refuses rail 21, and nothing in the harbour carries a stack count.

**Deletions.** **D1:** strip the rail numerals and make the crates uniform — the grab has no rail to
stop at and no HOIST is distinguishable from another; the session completes on any input. **D2a:**
remove the stacks, the owners and the barge — the predicate `cradle.rail === stack.topRail` has no
second term and no item can complete. **D2b:** freeze the cradle at rail 0 — every stack of height ≥ 1
is unreachable and the build cannot reach Finish. **All three mutations fail the build, which is the
whole point.**

**Displacement (§2.2).** The commit reads `cradle.railIndex`, which **is** the character's y. The
keypad is a crank, not a buffer.

**F-42.** **.1** between the stacks growing and HOIST the stage is completely still while the child
reads the wall. **.2** HOIST starts the grab within 100 ms. **.3** type 6 instead of 9 and the otter's
terminal y differs by 78 px. **.4** the only `repeat: -1` in the file is `ANIM.showMe`. **.5** the
grab closes in 280 ms (the verdict), and the lift-and-swing is post-verdict consequence within the
1200 ms window. **.6** the readout is on the cradle; the index line physically joins the crane to the
wall; zero camera tweens.

**Stakes.** **D1** twelve empty bays and a quay full of goods nobody has moved, on screen before the
first tap; one bay per item, unit declared. **D2** a wrong HOIST costs the crank back down and
**nothing wrong ever enters the hold**, so the twelve bays are the high-water mark made visible.
**D3** the owners have two states and change once, on loading. **D4** the manifest is the cargo, not
a token.

**Contract.** All text ≥ 24 px; keypad gap 12; three interactive elements; no dot rail; stage
declared with its reason.

**What was deleted:** a koala that nodded, and the row of hollow circles.

---

## 9 · What this system cannot do

**The governing sentence:** *a false isomorphism is worse than an admitted absence, because it stops
anyone looking for the real one.* Every class below is named so that a spec in it **declares** its
weakness in the `S` field rather than dressing it.

### 9.1 Exempt from the world layer by ruling — ~46 games

`GAME-DESIGN-LAW` §4.1 exempts, on measured and verified-disjoint grounds: the **9 P11 keypad games**
and the **tables games** (`010`, `049`, `050`), the **18 P12 boards**, the **13 P10 games**, and
**6 specs that already outgrew the stage**.

The reason is real and is not a concession: **F-2 records that demand at 8-9 is retrieval fluency**,
and *a child who wants times-table practice does not want a walk between questions.* Inserting
seconds between retrievals destroys retrieval density, which is the entire value of the genre.

**What an exempt game still gets, with no exemption:** a **want**, a character with **agency**, a
**goal on screen whose distance visibly shrinks**, and **diegetic progress**. It still fails all
three deletion mutations — its state variable is still single, still physical, still manipulated
rather than reported on. It expresses agency by **operating, building or placing** rather than by
walking. **What is banned everywhere, with no exemption, is the static mascot at a fixed coordinate
with nowhere to be.**

### 9.2 The literacy problem, measured

Scanning all 200 objectives for a physical or spatial referent a character could move through:

| subject | rows | no physical referent | share |
|---|---|---|---|
| science | 24 | **0** | 0 % |
| maths | 110 | **3** (`109`, `110`, `130` — all naming conventions, not quantities) | 3 % |
| literacy | 66 | **55** | **83 %** |

**The resistance is almost entirely a literacy problem**, and inside literacy it concentrates in four
classes: phonological (18 rows — the referent is a *sound*, and a sound has no location), orthographic
convention (12), grammar and punctuation (13), and semantic or inferential relations (12).

**Three-tier fallback.**

**Tier A — the sound has a home even if it has no location (~25 rows).** FRAME 6 APERTURE or FRAME 13
GATHERING with an *arbitrary but consistent* world: sound-families in burrows, rhyme-families as a
family you reunite, syllables as carriages you couple. **The isomorphism is conventional, not
physical** — a burrow does not reject a wrong sound the way a square hole rejects a rectangle — and
the spec says so in `S`. Deletion 2 still bites, because delivery genuinely is classification. **The
corpus already contains a fully movement-native literacy game and nobody noticed:
`171 syllable-hop` — *hop once per syllable across stones* — which is FRAME 1, and is the template.**

**Tier B — sequencing and procedure literacy (~12 rows) takes FRAME 11 WORKS.** Sentence order, story
order, alphabetical order, recipe steps and dictionary order are *procedures*, and a procedure in a
machine is refused by the machine. `197 read-the-recipe` is already this game and does not know it;
`075`, `078`, `157`, `191`, `196` follow.

**Tier C — the declared exceptions (~18 rows).** Inference (`081`), title choice (`198`), pronouns
(`192`), feelings (`155`), question-vs-telling (`077`). The mission is genuine and the world is
genuine, but the isomorphism is conventional. **A Tier-C spec must state it in `S` in one sentence**,
e.g. *"S = which pen the sentence is in; the isomorphism is conventional, not physical."* Then a
reviewer sees the weak ones at a glance instead of discovering them at build time.

For `077` specifically the best available frame is **8 FERRY**: two boats, one to the island where
things are *asked* and one where things are *told*, with the sentence stamped as it steps aboard. The
mission is real, the near bank genuinely empties — but a wrong sentence in the asking boat does not
make the boat sit low, and pretending otherwise would be the more dangerous outcome.

### 9.3 The other classes that resist, named

- **Letter and numeral formation** (`064`, `065`). The hand's movement *is* the objective, so a
  mission can only supply a reason to be drawing. FRAME 1's waypoint terrain is honest **for the
  ORDER and DIRECTION of strokes** and is a stand-in, not an isomorphism, **for the motor act**.
  Declare it. And **the waypoints are tap targets by default**; freehand tracing is a 6-9 optional
  accelerator only, never the specified path (P7).
- **Judgement objectives** — *is this equation true?* (`032`), *is this a sentence?* (`090`), *is this
  the same letter in a different font?* (`141`). These produce a **verdict**, not a quantity, a
  destination, a member, an order or a partner — and every frame here is powered by one of those.
  FRAME 10 LIFT is the only honest home (a true statement levels the beam), which means every
  judgement game would be the same frame. There is no fix inside this system: **the shape of the
  answer does not admit a journey.**
- **Subitising** (`011`, `134`). Actively hostile to the whole document: the point is *not* to
  enumerate, so any frame that steps once per object destroys the skill it tests. Only FRAME 5's jar
  form fits, and there the character barely moves. **This is the one place where a near-static screen
  is correct and the mission should be almost invisible.**
- **Perceptual discrimination** — b/d/p/q orientation, the same letter across fonts, visual
  discrimination. FRAME 6 is the least-bad home and the frame does all the work; the mission is a
  wrapper. Declare it.
- **Some science observations** — *which is louder* (`174`), *push or pull* (`166`), *what is the
  weather* (`100`). A sound does not fit through a letterbox. FRAME 6 sorts them into homes and the
  fiction strains; these are the specs where an ensemble should be expected to come back and say the
  frame is not earning its place.

### 9.4 Structural risks, ranked, with their mitigations

**R1 · The re-skin risk is the big one, and it is what the terrain register exists for.** Thirteen
frames over 200 games is ~15 games each; without terrain that is thirteen games with two hundred
skins, one level up from the disease being cured. **Mitigation:** frame is chosen from the shape of
the content (§2.4); the terrain register gives 4-6 worlds per frame; `check-redundancy.js` refuses an
unannotated **(topic, band, pattern, frame, terrain)** quintuple. **This is unbuilt and must be built
before the second wave.**

**R2 · The ACT budget compounds.** Twelve items × three ACTs × up to 1200 ms is up to 43 seconds of a
5-7 minute session spent watching. **`qa-game` must measure total ACT time per session and fail above
60 s** (F-42.5). This is the risk most likely to be discovered by the operator rather than by a gate.

**R3 · A frame can become a costume.** Nothing stops a builder drawing a boat around a P8 sort and
calling it FRAME 8. The Single-State Law is the defence and the three mutations are the enforcement.
**Without `mutate-mission.js` this document degrades into theming within two builds.**

**R4 · The frozen stage may read as broken.** A stage where genuinely nothing moves is unusual, and a
child may tap to see if the game is alive. That is a *feature* (F-60), and it needs exactly one
concession, which F-42 already permits: the once-only demonstration (§5.2).

**R5 · Persistence makes the finish state content-dependent**, so a visual-critic screenshot sweep
cannot compare against a fixed reference. **The gate must assert *properties* of the finish state
(goal reached, N marks present), never a pixel match.**

**R6 · The prior-art fence is thinner than it looks.** ~35 catalogue rows were re-scoped so a paid
game would not re-skin one of the 204 free activities, and the stated differentiator was *"a character
goal that IS the task"* — but the free activities are already character-fronted and their characters
are **named**. **Missions alone do not differentiate.**

**R7 · The motivation claim is the weakest thing in the evidence base.** Wouters 2013: serious games
give better learning (d = 0.29) and retention (d = 0.36) but **motivation d = 0.26, not significant.**
The operator's goal — *children want to play for the sake of playing* — is exactly the outcome this
literature does not support asserting. **That is an argument for measuring it with children, not for
abandoning it.** Every wave ships to a local link for that reason.

**R8 · Nothing here has been built.** The fox passed every gate three times and was rejected on
sight. **The first framed build must be a transformation of an already-built game — `001` or `002` —
so the operator can compare identical content in both shapes side by side.**

---

## 10 · Rejected frames, and why

Each of these is more obviously *fun* than something in §3, and each is banned by evidence already in
the corpus. They are listed because every one of them will be proposed again.

| refused | why |
|---|---|
| **THE LOCKED GATE** — answer correctly, the gate opens, the character walks through | The most tempting frame in the document, and the two-deletion test **cannot** catch it — it fails both and is still wrong. **The walk is a reward paid out after the thinking, not the thinking itself.** Diagnostic, applicable to any candidate: *if the character's motion happens after the answer is judged rather than being the act of answering, it is a chase with a nicer coat on.* This is why §2.2 (Displacement) and §5.1 (F-42.3) exist. |
| **THE CHASE / THE RACE / THE ESCAPE** — a pursuer, a rival, a rising tide | F-45 (competition lowers young children's intrinsic motivation, worse for girls; 5-6-year-olds who lose choose to compete less), F-75 (Shark Numbers is named in the research as *the* banned shape). And once anything pursues you, time is a resource: a countdown in a costume. **Any world state that advances while the child's hands are still is a clock.** |
| **THE HUNT** — pop it, catch it, shoot it | Answer-then-arcade with the arcade in front. Delete the question and a playable catching game survives, so it fails D1 — which is exactly the failure F-11 and F-63 name. The appeal it has is real and is precisely what F-212 says to **match by other means**, not to import. |
| **THE PET** you must look after | A need that grows while you are away is a timer; neglect is a losing state; there is no storage, so the pet forgets you between sessions. Every version is either a clock or a lie. |
| **THE BASE / THE FARM** you come back to | The storage problem stated positively. **A mission whose payoff is next time is a mission with no payoff**, because there is no next time the game can prove. |
| **THE COLLECTION** — stickers, hats, an unlocked map | F-44 is unambiguous (d = −0.40 for tangible rewards, worse in children) and the brief bans it. **Any frame whose progress object is not made of the child's answers is this frame in disguise** — which is why every frame above has its progress made of the work itself. |
| **THE STORY** with chapters, a villain, a twist | Narrative comprehension is thin at five; it is eleven languages of authored prose; and the 5-6 band's text budget on the play surface is **zero words**. **A mission a child can see beats a story a child must be told, in every band.** |
| **THE MAZE / THE EXPEDITION** — a world you explore, scroll or pan | Needs scrolling (banned) or a map held in mind (a means-end depth 5-6 cannot spare), and F-8 records the only evidence in the corpus about exploration and it is **negative**: parents complain Prodigy *"spends more time exploring than doing the maths."* `124` already ships the solved version — a single corridor, entirely visible — and that is FRAME 1's steered variant. **The exploring is what is refused, not the corridor.** |
| **THE PHYSICS PUZZLE** — roll the ball, tip the plank, stack until it topples | No physics engine, no path-following, and a toppling stack is a losing state with charm. |
| **THE PLATFORMER** | Tap-only, no physics, discrete poses — and F-49's touch-accuracy finding kills it at 5-7 even if the rest were allowed. The skill would be the jumping (F-63). |
| **TWO CHARACTERS TAKING TURNS** | F-45 forbids a second input and the competition evidence for this age is negative. **A partner may stand in any of the thirteen frames; it may never take a turn.** |
| **THE SHOP** where you can run out of money | A depletable resource is a losing state with an accountant. FRAME 9 keeps the counter and throws away the wallet. |
| **THE QUEST CHAIN** — a story that continues between sessions | No accounts, no storage. A story you cannot resume is a story you always start again. |
| **THE DISGUISE / THE GROWING AVATAR** | Pure cosmetic motion. It passes D1 and fails D2 so completely that it is not a frame at all — **it is the mascot problem the corpus already has, given a bigger budget.** |
| **BRANCHING CHOICE-YOUR-OWN-ROUTE** | If both branches are valid the mathematics stops deciding anything; if only one is, it is the locked gate again. It also multiplies content per session by the branching factor, makes the adaptive ladder unschedulable, and puts a menu on screen (F-69's named bad case). |
| **THE RHYTHM FRAME** — move in time with the music | Already rejected in `PATTERNS.md`: *a timer in disguise (F-45, F-64)*. Skip-count rhythm is expressed through P3 with an optional metronome that never ends an item. |
| **THE SAD PET / THE DISAPPOINTED FRIEND** | F-61, ART-BIBLE §3 (never frowns, cries or looks angry at the child) and §8 rule 14. **An error changes the apparatus, never the creature.** *Reviewer check: look at the wrong-answer screenshot — if the character's state changed, reject.* |
| **THE TIDY-UP** | Not refused on principle — refused as a **duplicate**. It is FRAME 6 with shelves instead of shaped openings, and one sorting frame with six terrains is better than two frames that are the same frame. |

---

## Appendix · The gate suite this document requires

None of it exists yet, and **every lesson in this repository's history says the gate written after the
build is the gate that certifies the defect.** Build these first, poison-tested in both directions,
before any game is framed.

| gate | asserts | poison must FAIL on |
|---|---|---|
| `mutate-mission.js` **D1** | the maths is load-bearing | a game whose candidates are interchangeable |
| `mutate-mission.js` **D2a** | the goal is load-bearing | a decorative mascot and a decorative destination |
| `mutate-mission.js` **D2b** ⭐ | the hero's **displacement** is load-bearing | a commit handler that reads a tile id |
| `check-mission.js` **M1** | `mission.goal` at a constant (x, y) inside zone W; `mission.hero` moves on ≥ *n*−1 of *n* items | a fixed-coordinate mascot |
| `check-mission.js` **M2** | F-42.1 freeze | a one-line idle bob |
| `check-mission.js` **M3** ⭐ | F-42.2 ACT is not silent | a game with no motion at all |
| `check-mission.js` **M4** ⭐ | F-42.3 differential motion | a byte-identical traversal |
| `check-mission.js` **M5** | the ratchet — `mission.progress` never decreases across a session driven wrong on every item | a decaying world |
| `check-mission.js` **M6** ⭐ | the deficit shrinks by ≥ one **declared** unit per item | a goal that does not visibly move |
| `check-mission.js` **M7** | total ACT time ≤ 60 s; answering move ≤ 300 ms | a hero that crosses the stage before the verdict |
| `check-mission.js` **M8** | no dot-rail art during Play; every text ≥ the band floor; every gap ≥ 12; every element ≥ 16 from the edge; element count within §5.1 | the three contract violations `120` shipped |
| `check-redundancy.js` | the **(topic, band, pattern, frame, terrain)** quintuple is unique or annotated | thirteen games with two hundred skins |

**Order of work.** (1) Build the gates. (2) Frame `001` or `002` — an already-built game — so the
operator compares identical content in both shapes. (3) Assign frame and terrain to all 200 catalogue
rows in one pass, flagging every Tier-C literacy row and every §9.1 exemption in the same pass.
(4) Only then re-spec.

*End of MISSIONS.md v2.0.*