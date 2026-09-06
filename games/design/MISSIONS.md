<!-- Canonical game layer. Authored 2026-09-06 by the mission-design ensemble under the operator
     ruling "You should redesign all 200 games". Binding companion: GAME-DESIGN-LAW.md (the ruling,
     the three deletion tests, the band policy, the F-42 gate). PATTERNS.md was demoted the same day
     to the INPUT contract: frame = the game, pattern = the finger. -->

# MISSION FRAMES — the missing game layer for the 200 K-3 games

Design commission, 2026-09-06. Companion to `design/catalogue/PATTERNS.md` (how a finger touches the screen) and `design/catalogue/BUILD-CONVENTIONS.md` (the shared build contract). A **pattern** is an input verb. A **frame** is a shape of game. Every one of the 200 games gets exactly one frame and keeps its existing pattern.

---

## 0. The verdict was already in the research, and the specs broke their own rule

The operator's judgement — *"the games you designed are just activities … the character should not be static, it needs to move around and complete missions"* — is not a new requirement. It is **F-11 and F-212, re-derived from the outside by a person looking at the output.**

> **F-11 · Popular "answer-then-arcade" games sell in UK schools (H).** Mathsframe's top-20 is full of "answer questions then dodge obstacles" titles. **Their appeal (motion, a goal, a character) must be matched by other means** since the mechanic is banned (F-63).

> **F-212 · Match the appeal of answer-then-arcade with a character and a goal that IS the task** (F-11, F-63): the character's need is satisfied by the mathematics itself (feed N fish, fill the ten-frame tank), **never by a bolted-on chase**.

> **F-44 · …** → No points, stars, coins, badges or unlockables for engagement/completion; **progress = the task completing (tower built, path filled)**; praise strings process-level and unannounced.

F-11 names the three things to match — **motion, a goal, a character** — and the catalogue delivered a static mascot at a fixed coordinate, no goal beyond the item count, and motion only as post-answer applause. Measured across `design/specs/`:

| measure | count |
|---|---|
| specs containing the phrase "the child taps" | **112 of 200** |
| specs containing the word "mission" | **1** |
| specs containing the word "journey" | **1** |
| patterns in `PATTERNS.md` that name a goal rather than an input verb | **0 of 12** |
| games whose progress display is a dot rail (`BUILD-CONVENTIONS` §6) | **all of them** |

F-44 literally names *"tower built, path filled"* as what progress should look like, and §6 of the shared contract then mandates a **row of hollow circles at y = 28** instead. The dot rail is the most telling artefact in the corpus: an abstract completion meter bolted above a world, present in every game because the shared contract put it there.

**There is also a real hole in the research, and this document fills it.** A keyword sweep of `FINDINGS.md`, `GAME-DESIGN-BRIEF.md`, `ASSUMPTIONS.md` and `PRIOR-ART.md` returns **zero hits** for: *chocolate-covered broccoli · Malone · Habgood · integrated fantasy · extrinsic fantasy · avatar · mascot · agency · autonomy · curiosity · replay*. The negative half of the motivation question is researched to ★★★ with named studies (F-44 extrinsic rewards, F-45 competition, F-206 no badges). The positive half — *what to put there instead* — is **one sentence, F-212, asserted at (H) confidence from a single observation of a UK games-site top-20 list.** F-212 is Habgood's integrated-fantasy principle rediscovered empirically and never operationalised. The frame catalogue below is that operationalisation.

### What this document does NOT change

Nothing in the hard constraints moves. No timer, no countdown, no lives, no score, no losing state (brief §7/§9, F-44/F-45/F-64). Tap-only, keyboard-operable, ≥ 80 px at 5-6 and ≥ 56 px at 6-9 (F-49/F-69, §3). Fixed 720 × 560, `Scale.FIT`, no scrolling, no camera movement. ≤ 10 interactive elements (F-69). No decorative motion while the child thinks (F-42). 8-15 items, 5-7 minutes, 3-up/2-down adaptation, a three-step support ladder ending in certain success (F-46, §8). Eleven locales, no people, no holidays, metric only. Inline SVG and Phaser shapes; motion is a container tween; poses are discrete swaps.

Every frame below is designed **inside** that box. Where a frame appears to press on a rule, §9 says exactly which rule and what the resolution is.

---

## 1. The thesis, made checkable

> **MOVING IS SOLVING.** The character's action in the world is isomorphic to the cognitive operation. Not *solve, then move* — moving **is** how you solve.

F-63 already ships half the test. This document adds the other half.

**Deletion 1 (F-63, existing).** Delete the maths. Nothing playable may survive. *Answer-then-arcade fails this: the arcade remains.*

**Deletion 2 (F-63b, new).** Delete the mission — the hero, the destination, the world. Nothing playable may survive. *The current corpus fails this: delete spec 120's koala at (60, 240) and the game is unchanged, because the koala was never load-bearing.*

A real game **fails both deletions**. This is not a slogan; §9.2 turns it into a mutation test the build suite runs, in the repo's own poison-testing idiom.

### 1.1 The Single-State Law — the mechanism that makes both deletions fail

A frame is legitimate **iff there exists exactly one state variable `S` such that:**

1. **the mission's goal is a predicate on `S`** — the hero is at the den, the wall is whole, the plank reaches the roof;
2. **the cognitive operation is the transition function on `S`** — a correct answer is the legal transition, a wrong answer an illegal one;
3. **the child's tap selects a transition of `S`**, and never "reports an answer about" it.

The current corpus carries **two** state variables: the item (real) and the mission (absent, or decorative). That is exactly why deleting one leaves the other intact. Collapse them and both deletions bite: without the maths there is no transition function; without the world there is nothing for the transition to act on.

**Practical test when reading a spec.** Find the sentence that decides correctness. If it compares a tapped value to a stored `answer` field, the game has two states and is a worksheet. If it asks whether the world will accept the move — *does the stone fit the hole, does the plank reach the roof, will the duckling follow* — it has one state and is a game.

### 1.2 The three structural laws

**L1 · SINGLE STATE.** As above. The spec must name `S` and give its two readings, one mathematical and one physical, in a new spec field (§9.1).

**L2 · PERSISTENCE.** Item *n+1* begins where item *n* ended. The hero does not teleport home between items; the world does not reset. This is the cheapest change in the whole document — spec 020's snail already does it (*"The trail stays on the square for the whole session"*), and 020 is the only game in the catalogue that feels like it is going somewhere.

**L3 · VISIBLE DESTINATION.** The goal is on screen from the first tap, in a state only arrival changes, and the distance to it shrinks visibly. This replaces the dot rail: progress is *how far is left*, not *how many circles are filled*. F-44's own words.

### 1.3 An item is a MOVE, not a question

The session is not a list of 12 questions; it is a route of 12 moves. Everything in §8 survives the rename unchanged — item count, levels, 2-up/2-down, the support ladder, re-queue. A re-queued item (F-41) is a stretch of route walked twice, which is what a route is like.

### 1.4 The MISSION LAYOUT — replacing BUILD-CONVENTIONS §7

§7's zone A (*"the thing to think about"*, 204 px) stacked over zone B (*"the tiles the child acts on"*, 220 px) **is a worksheet, drawn as a rule.** A framed game uses this instead:

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

- **The world gets the height.** 364 px against §7's 204. The world is the game; the hand is a strip of controls, and in several frames (THE ROUNDS, THE TENDING, THE CROSSING) it is **empty**, because the world itself is what the child taps.
- **The hero and the goal are both in zone W at every moment of the session**, and the goal's (x, y) never changes.
- **No dot rail during play.** Progress is diegetic. `ART.dotEmpty` / `ART.dotFull` survive only on the Finish screen, where a spec may keep the first-try record (§10).

---

## 2. The frame catalogue

Fourteen frames, grouped by **what the child's knowledge controls**. That grouping is the distinctness test: two frames in different groups can never be re-skins of each other, and §2.15 gives the discriminator for the three near-neighbour pairs inside a group.

| | group — what the knowledge controls | frames |
|---|---|---|
| A | **which way** — position among discrete options | 1 THE CROSSING · 9 THE PILOT |
| B | **how much** — magnitude as distance, height or load | 2 THE LEAP · 14 THE CLIMB · 4 THE HAUL |
| C | **whether it fits** — a physical predicate | 3 THE OPENING · 6 THE SPAN · 13 THE FERRY |
| D | **where it belongs** — classification as destination | 5 THE ROUNDS |
| E | **who comes with you** — matching as recruitment | 10 THE FOLLOWING |
| F | **what it turns into** — transformation | 7 THE TENDING · 12 THE SWAP |
| G | **in what order** — procedure | 11 THE WORKS |
| H | **what is hidden** — prediction | 8 THE LANTERN |

Every entry gives: mission · what the hero physically does · the world on 720 × 560 · **the isomorphism** · refusal · diegetic progress · finish · patterns · bands · and the two-deletion check.

---

### FRAME 1 — THE CROSSING

**Mission (as the child would say it).** *Get across to the other side.*

**The hero physically.** Stands on one stepping stone and hops to the next. It never leaves the ground and never falls; the water is shallow, the marsh is soft, the gorge has a net. Position persists across every item.

**World.** A chain of 10-14 stones from the near bank (x ≈ 90) to the far bank (x ≈ 640), laid in a shallow S so the whole route fits zone W without scrolling. The hero stands on the current stone. **Only the 2-4 stones immediately ahead are live** — everything behind is settled causeway, everything beyond is dim. The far bank carries the waiting party from tap one. Zone H is **empty**: the world is the hand.

**The isomorphism.** *The answer is the footing.* Each live stone carries a candidate; exactly one bears weight. Choosing the stone **is** choosing the answer, and the hop is not a reward for choosing — it is the choice being executed. There is no separate "answer" object anywhere on the screen.

**Refusal.** The wrong stone **tips** — a 6° roll and back — and the hero's foot withdraws. It does not sink, splash or vanish; it stays available and stays a stone. Attempt 2 after the enacted hint; attempt 3 the correct stone lifts a few pixels proud of the water and holds there (the show-me), and stepping on it completes the move.

**Diegetic progress.** The causeway behind, the shrinking gap ahead. A child glancing at the screen knows how far along they are without a single glyph.

**Finish.** The hero reaches the far bank and the whole causeway lights as one line — the route, drawn by the child, in one picture.

**Patterns.** P1 (the stone is the choice) · P4 (step them in order) · P12 (step onto the stone that pairs with the one you are on) · P3 (step onto the stone with that many).
**Bands.** All. Best at 5-6, where a 3-stone fan at 88 px is the whole interface.
**Deletions.** No maths → every stone bears weight → walking with no choices. No world → candidates with no way to commit. Both collapse.

---

### FRAME 2 — THE LEAP

**Mission.** *Jump far enough to land on the ledge.*

**The hero physically.** Coils, springs, and lands at a distance it chose. Where it lands is where it stays; it does not walk back.

**World.** A marked runway across zone W at y ≈ 300 — a numbered line, a row of lily pads, a set of rungs — with the target ledge at a known distance and the destination beyond it. Zone H holds the magnitude control (a stepper, a keypad, or the hop-tracing path itself).

**The isomorphism.** *The answer is the distance.* A magnitude is expressed as a length of world crossed. Under-jump lands short, and **the remaining gap is visible and countable**. Over-jump overshoots, and the overshoot is visible and countable.

**Refusal — and this is the frame's best property.** A short jump is not refused at all. **The hero lands, stays, and the remainder becomes the next problem.** 7 + 5 attempted as 7 + 3 leaves the hero on 10 with a gap of 2 in front of it — which is the make-ten decomposition, enacted, by the child's own error. This is the single strongest error-response in the whole system: the misconception is not corrected, it is *converted into the next step of the correct method.* (F-105's own recommended response — *"highlight that 4 is already there, the first jump lands on 5"* — falls out of the geometry for free.) An overshoot is the one case that must reverse: the hero windmills, the ledge is behind it, and it hops back to its take-off mark — a visible, in-fiction, cost-free undo.

**Diegetic progress.** Distance covered along the runway.

**Finish.** The hero on the far ledge, the runway behind it marked with every landing it made — the session's arithmetic, drawn as a set of jumps.

**Patterns.** P9 (set the jump length) · P7 (trace the hops — its native home) · P11 (type how far) · P3 (count the hops).
**Bands.** 6-8, 8-9. At 5-6 only in the +/− stepper form (§3's rule for P9).
**Deletions.** No maths → any jump reaches → a jump button. No world → a number typed into nothing.

---

### FRAME 3 — THE OPENING

**Mission.** *Open the way wide enough to get through.*

**The hero physically.** Walks up to a barrier — a sluice gate, a portcullis, a shutter, a lock — supplies a quantity, and walks through the gap it made. Doors already passed stand open behind it.

**World.** A corridor of 3-5 barriers seen at once across zone W, receding left to right, with the goal room lit at the end. The hero at the current barrier. Zone H holds the instrument.

**The isomorphism.** *The amount you supply is the size of the opening.* This is the frame's signature and what separates it from a reward-gate: the door does not "open because you were right", it **opens by exactly the amount you gave.** Supply 6 when 8 is needed and the gate rises six units — the child sees through the gap, sees the hero is too tall for it, and sees precisely how much is missing. Partial knowledge produces partial, legible, non-punishing progress.

**Refusal.** No refusal event is needed for an under-supply: the gap is the feedback and it is quantitative. An over-supply lifts the gate past its stops and it settles back to its maximum with a clunk — the excess had nowhere to go. The hero never squeezes through a wrong-sized gap.

**Diegetic progress.** Barriers standing open behind; light reaching further along the corridor with each one.

**Finish.** The corridor open end to end, the goal room reached, every gate at its full height.

**Patterns.** P11 (its best home — the combination is typed, the gate rises as you type) · P9 (a dial or stepper) · P6 (fill the frame that IS the gate's counterweight) · P12 (key to lock).
**Bands.** 6-8, 8-9.
**Deletions.** No maths → gates open on any input. No world → an instrument that outputs a number to nowhere.

---

### FRAME 4 — THE HAUL

**Mission.** *Fetch enough to fill it.*

**The hero physically.** Shuttles between a source and a store, carrying a load in view. Two legs per trip, both walked.

**World.** Source on one side of zone W (a berry bush, a woodpile, a spring), the store on the other (a nest, a rick, a cistern) with its **capacity visibly marked** — a rim, a fill line, a frame of empty cells. The hero walks the middle. Zone H holds the load-building control if the load is assembled rather than counted.

**The isomorphism.** *The answer is the load.* Cardinality is expressed as a carried set; the target is a container's capacity. Correctness is not judged — it is **fitted**: the load either fills the store or it does not, and the shortfall is the shape of the empty cells left.

**Refusal.** An over-load will not go through the store's mouth: the hero arrives, the load is visibly wider than the opening, it backs up a step and the surplus is still in its arms. Nothing is dropped, nothing is lost. An under-load goes in and leaves a hole, and the hole is the next trip.

**Diegetic progress.** The store filling. This is F-44's *"tower built"* verbatim.

**Finish.** The store full and closed, the hero on top of it.

**Patterns.** P3 (tap to count the load — its native home) · P6 (build the load on a frame) · P2 (place items into the basket) · P9 (a stepper on the load).
**Bands.** All; the purest 5-6 frame after THE CROSSING.
**Deletions.** No maths → any load fills → a fetch button. No world → a counted set with no container.

---

### FRAME 5 — THE ROUNDS

**Mission.** *Get everybody home.*

**The hero physically.** Carries one thing at a time to one of several doors, and **walks there and back**. The walk back with a refused parcel is the whole cost of an error.

**World.** 3-4 homes around the edge of zone W — burrows, letterboxes, pools, stalls — each marked by an icon-shaped opening, never by colour (§12). The hero starts centre with a satchel. Zone H holds the current item, or is empty when items lie in the world.

**The isomorphism.** *Classification is destination.* Sorting stops being a judgement about a category and becomes a journey to an address. The bin's count sub-label is replaced by the residents visibly at home.

**Refusal.** The resident looks out, does not take it, and goes back in. The hero turns and walks back with the parcel still in hand. **No mark, no sound of disapproval, no red.** On the second refusal in a round the three doors each show their icon once, in turn — "there are three places here, and this belongs at one of them".

**Diegetic progress.** The satchel emptying; the homes filling.

**Finish.** Every door shut, every resident home, the hero's satchel empty and slung over its shoulder.

**Patterns.** P8 (its native home — 25 games) · P12 · P1 · P2.
**Bands.** All. At 5-6 use 2 doors and one item at a time, exactly as P8 already specifies.
**Deletions.** No maths → every door accepts everything. No world → items and categories with no delivery.

---

### FRAME 6 — THE SPAN

**Mission.** *Build it long enough to reach.*

**The hero physically.** **Stands on the structure while it grows** and walks out along it as it extends. This is the rule that stops THE SPAN degenerating into build-then-reward: the hero is never a spectator waiting for a finished bridge, it is out on the end of the unfinished one.

**World.** A gap or a height in zone W with a measured scale beside it — a gorge with distance marks, a wall with course lines, a shelf out of reach. A supply of parts at the near end. Zone H holds the parts tray.

**The isomorphism.** *The answer is the extent of what you built.* Composition and part-whole become physical reach. The mathematics is not compared to a target — it **is** the length, and the target is a place.

**Refusal.** The structure is placed and is visibly short or visibly overhanging. The hero walks to the end, looks down at the gap, and steps back one plank. Parts stay where they were put; the child adjusts. Spec 004 already has the geometry of this exactly right (*"the halves stay apart with a gap … the overhang extends past the far bank"*) — it just has the beaver watching instead of standing on it.

**Diegetic progress.** The structure's extent, and the hero's position along it.

**Finish.** The hero on the far side, the structure whole behind it.

**Patterns.** P6 (build on a grid) · P2 (place parts — its native home) · P4 (order the parts) · P9.
**Bands.** All.
**Deletions.** No maths → any structure reaches. No world → parts assembled toward nothing.

---

### FRAME 7 — THE TENDING

**Mission.** *Make it well again.*

**The hero physically.** Fetches from service points around the world and brings what it fetched to the living thing. Three beats per act: go, take, return.

**World.** One growing subject at a stable position in zone W. Around it, 3-5 **service points** — a tap, a sunbeam, a window latch, a shelf of clutter — each a real place with an 88 px face. The subject changes stage permanently as it receives what it needs. Zone H holds finished subjects, accumulating.

**The isomorphism.** *The answer is what the organism will take.* Correctness is the subject's own acceptance, not a verdict. Every candidate must be a **place the hero travels to**, so choosing is already a journey.

**Refusal.** The subject does not respond; the offering stays in the hero's paws and must be carried back to where it came from. The carry-back is the honest, wordless cost.

**Diegetic progress.** The plot in bloom; the patient standing; the hive humming.

**Finish.** The whole plot thriving — which is also the learning summary.

**Patterns.** P2 (its native home) · P8 · P10 · P1.
**Bands.** 5-6, 6-8. Science's best frame; 0 of 24 science rows resist it.
**Deletions.** No science → everything is accepted. No world → a tray of pictures and three empty boxes.

---

### FRAME 8 — THE LANTERN

**Mission.** *Find out what is in the dark.*

**The hero physically.** Carries a light. The lit circle is its reach; it walks into what it has revealed.

**World.** A covered board in zone W — face-down tiles, mist, a shuttered row — with the hero's lit patch at its current edge. Only tiles adjacent to the light are live (≤ 6). The goal is a known landmark whose *position* is visible through the fog even though its contents are not.

**The isomorphism.** *You must say what is under it before you look.* Prediction is the step, and the reveal is the world telling the truth (P10's existing contract: *"the reveal is the feedback — right or wrong, the truth is shown and enacted"*).

**Refusal.** There is none, and that is deliberate. The tile clears either way; the truth is always shown and always counted out. What differs is only whether the hero knew before it looked — a correct prediction and the hero **strides**; a wrong one and it steps up carefully to look first, then walks on. The mission always advances. Nothing is ever lost, and the child is never held back for guessing.

**Diegetic progress.** The map uncovering.

**Finish.** The board fully lit — the map the child drew by predicting it.

**Patterns.** P10 (its native home) · P12 (face-down pairs) · P3 (the reveal counts itself).
**Bands.** All.
**Deletions.** No maths → nothing to predict, only a tile-flipper. No world → a covered card with no map and nowhere to go.

---

### FRAME 9 — THE PILOT

**Mission.** *Steer it into the harbour.*

**The hero physically.** **Is** the vehicle. Each command is enacted the instant it is tapped; the craft turns, advances, or bumps.

**World.** A channel, corridor or grid across zone W with the destination marked and in view. Zone H holds 2-4 command tiles. A record rail of what was tapped may run along the bottom of zone H.

**The isomorphism.** *The answer is the manoeuvre.* Direction, turn and step-count are knowledge the craft executes. Crucially the frame supports **craft-relative** reference (left is the craft's left, not the screen's) — the one thing no other frame can express.

**Refusal.** Bump. The craft does not move, nothing is damaged, and the obstacle pulses. Spec 124 has this exactly right already and it is the single closest thing in the corpus to a real game: *"No losing state; no clock; the robot can always turn round, so no position is a dead end."*

**Diegetic progress.** The track drawn behind the craft.

**Finish.** The craft berthed; the route drawn on the chart.

**Patterns.** P4 (its native home, in 124's per-tap enacted variant) · P9 · P11 (type the number of steps) · P1.
**Bands.** 6-8, 8-9.
**Deletions.** No maths → every command works → a toy. No world → three buttons wired to nothing.
**Note.** THE PILOT needs no design work. It exists, it is built to spec, and it should be the reference implementation the other thirteen are checked against.

---

### FRAME 10 — THE FOLLOWING

**Mission.** *Find them all and bring them home.*

**The hero physically.** Walks a small plot and gathers. Each recruit **falls in behind it**, and the line grows visibly across the screen.

**World.** An open plot in zone W with ≤ 6 companions scattered at fixed spots, and home at one corner. The hero and its growing tail. Zone H is empty or holds the thing being offered.

**The isomorphism.** *The answer is who will follow.* A companion joins only if presented with its match — its pair, its partner-number, its rhyme, its other half. **The length of the line behind the hero is the count.** Matching becomes recruitment, and progress becomes a physical procession.

**Refusal.** The companion looks away and stays put. It is never scared, never lost, never taken. On a second miss its true partner shows a soft outline.

**Diegetic progress.** The line behind you. This is the most legible progress display in the whole catalogue: a five-year-old reads "four found, two to go" from a photograph.

**Finish.** The whole line filing in through the door, in order, the hero last.

**Patterns.** P12 (its native home — 18 games) · P1 · P8.
**Bands.** All; outstanding at 5-6.
**Deletions.** No maths → everyone follows anyone. No world → pairs with no procession.

---

### FRAME 11 — THE WORKS

**Mission.** *Get the machine running.*

**The hero physically.** Clambers along a machine from stage to stage, setting each one. When a stage is set it **runs**, and the flow travels one stage further.

**World.** A machine drawn as a chain of 4-6 stages left to right across zone W — a mill, a pump, a conveyor, a lock system — with the product exit at the far end. The hero at the current stage. Zone H holds the parts or the step cards.

**The isomorphism.** *The answer is the order.* Procedure and sequence become a physical chain in which stage *n* cannot run before stage *n−1*, because the material has not arrived yet. Doing step 3 before step 2 is refused **by the machine**, not by the game: the chute is empty and the lever turns nothing.

**Refusal.** The lever moves and nothing happens; the empty chute above it is the reason and it is visible. This is F-61 in its purest form — *invalid moves are refused by the object*.

**Diegetic progress.** How far the flow has travelled along the machine.

**Finish.** The machine running end to end and the first product dropping out of the chute.

**Patterns.** P4 (sequencing and procedures — its native home) · P2 · P6 · P11.
**Bands.** 6-8, 8-9.
**Deletions.** No maths → stages run in any order. No world → cards in a row with no consequence.

---

### FRAME 12 — THE SWAP

**Mission.** *Trade up until you can afford the thing you came for.*

**The hero physically.** Walks between stalls carrying what it currently has, and hands it over.

**World.** 3 stalls across zone W and a **want-board** showing the one thing the hero came for, visible from tap one. The hero's basket is always in view with its contents drawn, not numbered. Zone H holds the goods on offer.

**The isomorphism.** *The answer is the exchange rate.* Equivalence and regrouping become trade: ten ones **are** one ten because the stallholder will take one for the other, and the child watches ten small things leave the basket and one large thing arrive. Nothing is stated; the till does it.

**Refusal.** The stallholder shakes their head — once, small — and the goods stay in the basket. No stall ever takes something and gives nothing.

**Diegetic progress.** The basket's contents climbing toward the want-board.

**Finish.** The hero walking off with the thing it came for.

**Patterns.** P12 · P2 · P11 · P1.
**Bands.** 6-8, 8-9.
**Deletions.** No maths → any trade is accepted. No world → equivalent quantities with no reason to convert them.
**Locale note.** §14 already carries the 11-currency table; THE SWAP must use goods-for-goods wherever a spec is not specifically about money, so the frame stays culturally portable (F-73).

---

### FRAME 13 — THE FERRY

**Mission.** *Get everyone across.*

**The hero physically.** Poles the boat from bank to bank. The hero stays with the boat; **the boat is what travels**, and the hero travels with it.

**World.** Two banks in zone W with the water between. A queue of ≤ 4 waiting on the near bank; the far bank filling up. The boat mid-water or moored. Zone H is empty — the passengers are tapped where they stand.

**The isomorphism.** *The answer is what may travel together.* A load rule — a total, a category, a capacity, a compatibility — is expressed as whether the boat will leave the bank. This is the frame for a **stream** of items, which is what P8 and P1 actually are in 66 of the 200 games.

**Refusal.** The boat sits low, or its bow will not swing off the mud, and the passengers step back onto the bank of their own accord. Nobody falls in. Nothing gets wet.

**Diegetic progress.** The near bank empties and the far bank fills — two counts, moving in opposite directions, entirely wordless.

**Finish.** The near bank bare, the far bank crowded, the boat moored.

**Patterns.** P8 · P1 · P3 · P2 · P10 (*predict whether it will float, then push off* — an excellent second home for P10).
**Bands.** All.
**Deletions.** No maths → the boat takes anything. No world → items with a property and nothing that property does.

---

### FRAME 14 — THE CLIMB

**Mission.** *Get up to it.*

**The hero physically.** Ascends a vertical scale, rung by rung or in a cradle. **Its own altitude is a number**, read against the scale it is climbing.

**World.** A measured column occupying the full height of zone W — a beanstalk, a cliff with numbered ledges, a tower with storey lines, a thermometer, a scaffold. The scale's marks are the world's furniture. The goal is at a specific height. Zone H holds the instrument that sets altitude.

**The isomorphism.** *The answer is how high you are.* Reading a scale, comparing two values, ordering, place value and measurement all become "where am I on this thing". Two heroes on two adjacent columns is comparison; the taller one is *visibly* taller and no `>` sign is needed until the spec wants one.

**Refusal.** The hero reaches for a rung that is not there, the hand closes on air, and it comes back down to the last good rung. It never falls: it is roped, or in a cradle, or the branches are dense.

**Diegetic progress.** The hero's own height. The most direct diegetic progress possible — the child *is* the meter.

**Finish.** The hero at the top with the goal, the scale below it marked with every height it visited.

**Patterns.** P9 (its native home) · P6 · P4 (order by height) · P11 · P1.
**Bands.** All. At 5-6 the +/− stepper form only.
**Deletions.** No maths → any altitude arrives. No world → a number with no altitude.

---

### 2.15 The adjacency map — the three near-neighbour pairs and their discriminators

Honest disclosure: three pairs sit close enough that a careless spec could build one and call it the other. The discriminator is stated so a reviewer can settle it in one question.

| pair | discriminator (the one question) |
|---|---|
| **1 CROSSING vs 9 PILOT** | *Does the child choose a PLACE or a MOVE?* The Crossing's answer is a destination cell (absolute). The Pilot's answer is a manoeuvre (craft-relative); it needs a facing, and nothing else in the catalogue can express "the robot's left". |
| **2 LEAP vs 14 CLIMB** | *Is the quantity a DISTANCE TRAVELLED or a POSITION HELD?* The Leap commits a magnitude and the remainder persists as the next problem (addition, counting-on, decomposition). The Climb's altitude simply **is** the value, to be read, compared and ordered (measurement, place value, comparison). |
| **4 HAUL vs 13 FERRY** | *Is the target a CAPACITY or a RULE?* The Haul fills one container to a known cardinality. The Ferry moves a stream past a compatibility rule; its progress is two counts moving in opposite directions, which the Haul does not have. |

**6 SPAN vs 3 OPENING** deserves a note though it is not adjacent: the Span is a **construction** (compose parts to an extent, hero walks on it); the Opening is a **gate check** (supply a quantity, the aperture equals it, hero walks through it). Composition versus equality.

---

## 3. Pattern → frame mapping

Every pattern gets at least one movement-native home, with a worked example naming a real catalogue game. The pattern is unchanged in every case — only the frame around it is new.

| pattern | games | primary frame | also | worked example |
|---|---|---|---|---|
| **P1** tap one of N | 41 | **1 CROSSING** | 5, 8, 10, 13 | 002 · 024 · 150 · 200 |
| **P2** tap to place | 31 | **6 SPAN** | 4, 7, 11, 12 | 004 · 043 · 092 · 180 |
| **P3** tap to count | 17 | **4 HAUL** | 2, 8, 13 | 001 · 012 · 039 |
| **P4** tap in order | 22 | **11 WORKS** | 9, 1, 14 | 124 · 190 · 093 |
| **P6** build on a grid | 8 | **6 SPAN** | 3, 4, 14 | 020 · 003 · 060 |
| **P7** trace a path | 8 | **2 LEAP** | 1, 9 | 008 · 030 · 171 |
| **P8** sort into bins | 25 | **5 ROUNDS** | 13, 7 | 005 · 077 · 169 |
| **P9** set a value | 8 | **14 CLIMB** | 2, 3, 9 | 164 · 179 · 009 |
| **P10** predict then reveal | 13 | **8 LANTERN** | 13, 7 | 011 · 103 · 023 |
| **P11** keypad entry | 9 | **3 OPENING** | 14, 12, 9 | 120 · 019 · 050 |
| **P12** match pairs | 18 | **10 FOLLOWING** | 12, 5, 8 | 007 · 105 · 161 |

*(P5 drag is unused by every one of the 200 rows and stays an optional 6-9 accelerator on the P2 tap-tap path, per its own catalogue outcome. No frame depends on it.)*

### The eleven worked examples

**P1 → THE CROSSING · 002 `numeral-nest` (maths, 5-6).**
*Now:* "A nest shows 1-10 eggs; three numeral tiles fly in; tap the one that matches."
*Framed:* the hen must reach her nest across the yard. Three **numbered flagstones** lie ahead of her; the clutch of eggs she is carrying is on her back and countable. She steps onto the stone that says how many she has. Wrong stone tips; the eggs recount themselves on her back (the existing misconception response, unmoved) and she tries again. The nest is visible from the first frame with the chicks in it. **The numeral tile became the ground she stands on.**

**P2 → THE SPAN · 004 `bridge-of-ten` (maths, 6-8).**
*Now:* two slots, a tray of bags, the beaver walks across **after** the Check — the exact anti-pattern the operator named.
*Framed:* the beaver **starts out on the half-built bridge**, over the water, with the far bank in view. It lays one bag, walks to the new end, and looks at what is left. A short pair leaves it standing on an end with a gap in front of it; an over-long pair pushes the far half past the bank and it has to walk back. The `ANIM.walk` that was applause becomes the mechanic. **One line of the existing spec changes: the beaver's x is the built length, not a reward tween.**

**P3 → THE HAUL · 001 `feed-the-fox` (maths, 5-6, BUILT).**
*Now:* count the berries by tapping, then tap the numeral that says how many.
*Framed:* the fox's bowl has a **fill line** on it. The berries are on the mat and the fox carries them over one at a time — each tap is a berry going in, the count rides on the bowl's rim, and the bowl is full exactly when the line is reached. The P1 numeral tail (which the build's own ensemble already flagged as making it *"80% a re-skin of 002"*) is deleted: **the cardinality is the fill line, and the answer is that the bowl is full.**

**P4 → THE WORKS · 093 `seed-to-flower` (science, 6-8).**
*Now:* order the plant life stages seed → flower → seed.
*Framed:* a greenhouse propagation bench with four stations in a row. Setting a station makes the growth advance to it — and station 3 cannot run until station 2 has produced what it feeds on. The empty chute *is* the reason the wrong order does not work.

**P6 → THE SPAN · 020 `hundred-square-trail` (maths, 6-8).**
*Now:* already the best-behaved game in the corpus. The snail moves, its position persists, and the trail stays all session.
*Framed:* it needs only L3 — **a destination**. Put the snail's home on a named cell, visible from tap one, and the session becomes a route across the hundred square instead of twelve unrelated hops. Everything else in the spec is already correct. **This is the one-line proof that the change is cheap.**

**P7 → THE LEAP · 008 `frog-hops` (maths, 6-8).**
*Now:* trace b hops, then **tap the answer tile** — a worksheet tail on a movement-native body.
*Framed:* delete the three answer tiles. The frog jumps; **where it lands is the answer** and the pad it lands on says so. An off-by-one lands one pad short of the ledge with the gap in front of it. The existing `hopStrip` becomes the load-out of hops the frog is carrying. Spec 008 loses ~90 lines and becomes a game.

**P8 → THE ROUNDS · 169 `recycle-sort` (science, 6-8).**
*Framed:* four yard bays around the edge, a barrow, and one object at a time. Wheel it to a bay; if the bay is wrong the object will not go down the chute and comes back in the barrow. The bays fill visibly, which is the bin count made physical.

**P9 → THE CLIMB · 164 `hot-or-cold-thermometer` (science, 6-8).**
*Now:* stepper moves the column, Check commits.
*Framed:* the thermometer **is** the ladder and the animal climbs it. The scene sets the height it must reach; the +/− stepper is the climb; being level with the band's mark is being right. Already a scale, already a stepper — it needs a climber.

**P10 → THE LANTERN · 103 `float-or-sink` (science, 6-8).**
*Framed:* a jetty walk in the dusk. Each plank is a covered water tank; say what the object will do, then the lantern is lowered and the water tells the truth. Right or wrong, the plank is crossed and the truth is enacted — P10's existing contract, sited in a world.

**P11 → THE OPENING · 019 `read-the-rods` (maths, 6-8).**
*Framed:* a store-room door whose counterweight is the base-ten blocks on the shelf beside it. Type the number and the door rises by that many units. Type 34 for 43 and the door rises to 34 and stops, with the hero's head above the gap. The keypad drives a portcullis.

**P12 → THE FOLLOWING · 161 `animal-babies` (science, 5-6).**
*Framed:* the lost young are scattered in the meadow and each will only follow its own parent. Lead a parent to a young one; if it is the wrong pair the calf stays down in the grass. The line behind the hero is the count of families reunited, and the finish is all of them filing into the barn.

---

## 4. The F-42 resolution

> **F-42 · …** → **No decorative animation while the child thinks**; text budget 5-6 = zero on the play screen … labels sit ON the object.

> **ART-BIBLE §6 · …** Idle loops are forbidden during play; a breathing idle (2 % scale, 3 s) is allowed only on the start and finish screens. **Enacted feedback first:** the correction animation is the message; the mascot's reaction follows it, never replaces it.

This is the rule the thesis appears to break, and it does not. The resolution is one sentence plus three corollaries, and it is measurable.

> ### MOTION IS A CONSEQUENCE, NEVER A COMPANION.
> **Every frame runs a strict two-state cycle, and exactly one of the two states contains motion.**

**DECIDE state — a choice is open.** The stage is **frozen**. Not "calm": frozen. Nothing tweens, nothing loops, nothing breathes, nothing drifts. The hero holds **one static pose** (`idle` or `think`) at one coordinate. Zero tweens are running.

**ACT state — the child has tapped.** Every interactive target is disabled. The world moves: the hero travels, the structure grows, the gate rises, the stone tips. **≤ 1200 ms** (≤ 1500 for a level completion, per §12's celebration cap). Then the stage freezes again and the next choice opens.

**The measurable form**, and it is a one-line assertion the runtime gate can make at every decision point of a `qa-game` session:

```
whenever  targets.some(t => t.enabled)
assert    scene.tweens.getTweens().length === 0      // the focus ring excepted
```

There is no third state and no exception. A frame that wants ambient life must put it on the Boot or Finish screen, where §6 already allows it.

### Corollary 1 — the child causes every pixel that moves

Because motion only exists inside ACT, and ACT only begins on a tap, **there is no motion the child did not cause.** F-42's target is *extraneous* load — motion competing for attention that the task needs. Motion that is the direct consequence of the child's own tap is not extraneous; it is the answer to the question they just asked. Seductive-details research (Sundararajan & Adesope, g = −0.33) is about material irrelevant to the objective. A hero walking to the stone the child chose is the objective.

### Corollary 2 — the refusal is an ACT, so a wrong tap gets motion too

The stone tips, the boat sits low, the resident shakes their head. This is what stops the frozen stage from reading as dead, and it costs nothing: the ART-BIBLE already requires the correction to be enacted first and the mascot to react second. **The frames do not add an animation budget; they re-site the one that exists.**

### Corollary 3 — journey is a property of the ARRANGEMENT, not of the animation

This is the load-bearing insight, and it is why the whole system fits inside F-42.

*A photograph of a hiker is obviously a journey.* A hero standing perfectly still, halfway along a visible trail, facing a destination it has not reached, with a causeway of settled stones behind it — reads as "on a mission" without a single pixel moving. Everything the operator asked for is carried by **position, facing, accumulated history and a visible goal**, all of which are static properties of a frozen frame.

The corpus's mascots do not fail because they are insufficiently animated. They fail because **they are at a fixed coordinate with nowhere to be** — spec 120's koala at (60, 240) for all twelve items, spec 092's bee at (150, 130) for all eight rounds. Animating them would not fix it and would break F-42. **Moving them, once, per tap, toward somewhere — fixes it and honours F-42 exactly.**

### The one genuine tension, stated honestly

A hero that travels a long way makes ACT long, and long ACT is dead time. Budget: **≤ 1200 ms**, which at 720 px wide means a hero crossing a third of the stage per move, or a shorter hop with a settle. Frames whose worlds are long (THE CROSSING with 14 stones) must therefore use **short hops between adjacent stations**, not sweeping traversals. That is a real design constraint on every frame and it is written into each world layout above: *stations are adjacent, moves are one station.*

---

## 5. Stakes without failure

The requirement: generate the feeling of a mission that matters when nothing can be lost, and when the number of ways a session can end other than by finishing must be **zero** (F-61's own check).

The governing rule first, because it draws the line the three devices sit inside.

> ### THE RATCHET RULE
> **Every state in the world may move only toward better. Nothing decays with time, and nothing decays with an error.** A wrong answer may fail to advance the world; it may never reverse it.

This is the precise boundary between *stake* and *loss*, and it settles cases that otherwise look ambiguous. Spec 092's **wilting** plant is legitimate: it starts unwell and only ever improves. A plant that wilted *further* on a wrong answer would be a losing state wearing a costume. Same test for a draining pool, a guttering lamp, a melting bridge: **if it can get worse, it is banned.**

### Device 1 — THE WAITING PARTY

**Someone is already at the destination, visible from the first tap, in a state that only your arrival changes.** The chicks in the nest, the resident leaning out of the lit window, the friend on the far bank, the crablings behind the wall, the empty chairs at the table.

The stake is *somebody else's* state, not the hero's survival. A five-year-old feels "they are waiting for me" as genuine pressure, and it is structurally incapable of being lost: the waiting party is never harmed, never leaves, never gives up. It simply stays exactly as it is until the child arrives. It also satisfies F-45's hard constraint verbatim — *"a second character is a partner, never a rival that can finish first."*

Design rule: the waiting party **must be drawn from tap one**, must be in zone W, and must change **only** at the finish. A waiting party that reacts to each correct answer becomes an approval meter, which is F-44's banned shape.

### Device 2 — THE MARK THAT STAYS

**Every correct move leaves something permanent in the world.** A stone settled into a causeway. A lamp lit. A rung nailed. A duckling in the line. A shelf stocked. A tower on the skyline.

Nothing ever un-marks. The world improves monotonically and the child can see, at any moment, the thing they have made. **Accumulation is stake without jeopardy**: what is at stake is not something you can lose, it is something that is becoming real. This is also exactly F-44's prescribed progress display — *"the task completing (tower built, path filled)"* — so it does double duty and lets the dot rail be deleted rather than replaced.

Design rule: the mark must be **the object itself in its new state**, never a token representing it. A lit lamp, not a star awarded for lighting a lamp. That distinction is the whole of F-66 (*"rewards are cosmetic or ARE the content"*).

### Device 3 — THE HONEST OBSTACLE

**The refusal is a physical event with a cause the child can read, and it costs a step, not a life.**

The stone tips because it is the wrong stone. The load will not go through the door because the load is too wide. The duckling will not follow because you offered the wrong thing. The lever turns nothing because the chute above it is empty.

The child's reading is *"that did not work"*, never *"I was wrong"* — which is F-47's exact requirement (*"an error changes the object, never the child's status"*) and F-61's (*"invalid moves are refused by the object"*). Tension comes from **the world having rules**, which is the only source of tension that survives the removal of failure.

Design rule: the obstacle must be **legible without language**. If a child cannot see why it did not work, it is a verdict in disguise. And the cost must be a *walk back*, a *step down*, a *retained parcel* — something re-doable in the same breath.

### The banned versions — the tempting shapes that are all losing states in costume

Named explicitly because each one will be proposed, and each one is easier to design than the three above:

| tempting | why it is banned |
|---|---|
| a crumbling bridge, a rising tide, a guttering lamp | violates the RATCHET RULE — the world decays |
| a pursuer, a shark, a rival racing you | F-45 (competition), F-75 (Shark Numbers is named as *the* counter-example) |
| fuel, energy, a battery, a health bar | a life meter renamed |
| "the plant will die if you get it wrong" | decay, and it makes the child's error harm a living thing |
| a countdown to sunset, tide, or bedtime | F-64, F-45 — a timer wearing weather |
| a companion who gets left behind | a loss, and a cruel one at this age |
| a locked door that stays locked | violates F-46 (success is certain) and F-61 (zero non-finishing ends) |

---

## 6. Three worked transformations

Each shows the before verbatim from the spec, then the game. Pedagogy, misconception responses, level structure, item counts and locale behaviour are **preserved exactly** — the only thing that changes is what the child is doing while they do it.

---

### 6.1 · Spec 120 `bar-chart-reader` → **THE ROOFTOP ROUND**

Frame **14 THE CLIMB** with a **3 THE OPENING** finish at L3. Pattern **P11** unchanged. Band 6-8. Objective unchanged: *finds the bar the question ring points at, reads its top against the gridlines and axis labels, and types that number (at the third level, the total of the two ringed bars).*

#### BEFORE — verbatim from the spec

> Zone A/B left: the chart … three bars … under each bar its category icon … the ASKED icon (cat) sits inside `ART.askRing` … **The koala at (60, 240) looks at the chart.** Zone A/B right: the keypad — nine keys … Zone C: OK … disabled until the display holds a digit.

> **Correct (6)**: the display `ANIM.pop`s … the koala `ANIM.nod`; the rail dot fills.

A chart, a keypad, and a koala that nods. Delete the koala and nothing changes — the game fails Deletion 2. The state variable is `answer === bar.value`: a comparison between a typed number and a stored field.

#### AFTER — the game

**Mission.** *The owl has to get the lanterns up to the animals on the towers before dark. She cannot fly — she is carrying too many — so she rides the cradle up the outside.*

**The single state `S`.** *The altitude of the cradle.* Read mathematically it is the value the child has entered. Read physically it is where the owl is on the side of the building. **One variable, two readings** — which is the whole of §1.1.

**World (zone W, 56-420).** The bar chart **is the town**, drawn with everything F-118 requires and nothing removed. The street is the x-axis at y = 400. The gridlines are **storey lines**, every 22 px, and the axis labels 0-10 are the **floor numbers painted up the side** at x = 100 — so the gridline-and-label discipline the spec insists on ("the child never estimates a bar tip") is now the reason the town is legible. The bars are towers, all one fill, 56 px wide, at x = 180 / 270 / 360. Each tower's resident icon is its **shop sign at street level** at y = 428, all 36 px, exactly as the spec requires. The asked tower carries `ART.askRing` on its sign **and a lit window at its top with the resident leaning out, holding an empty lantern hook** — the waiting party, Device 1, visible from tap one.

The owl sits in a cradle on a mast at x = 470, right of the towers. **Her altitude numeral is painted on the cradle's side** — the display, integrated onto the object, which is F-42's split-attention rule satisfied by construction rather than by a card at (170, 440).

**Hand (zone H, 420-560).** The hoist keypad: digits 0-9, backspace and HOIST as 52 × 52 tiles in one row at y = 495, pitch 62 from x = 50. Physical digits, Backspace and Enter work as before.

**The isomorphism, exactly.** *The number you type is the height you go to.* Each digit tapped re-computes the target storey and **the cradle climbs to it** — an ACT, caused by a tap, so F-42 holds. The child is not stating a fact about a bar; they are driving a machine to a height. Then HOIST extends the gangplank toward the asked tower:

- **Level with the roof.** The plank lands. The owl **walks across** (≈ 700 ms), hangs the lantern, and the resident takes it. That tower's lantern is **lit for the rest of the session** — Device 2. She walks back into the cradle, which **stays where it is**: her altitude persists into the next item (L2), which is precisely the affordance the L3 totals need.
- **Below the roof (typed 5 for 6).** The plank extends and meets **brickwork**. The owl looks up at the roof edge above her. Then the spec's enacted hint fires unchanged: the tower counts its storeys from the street, `ART.rowBadge` 1, 2, 3 … with rising tones, the last badge grows, `ART.tipLine` crosses at the roof and the matching axis label pulses. **The count and the label agree in front of her, and she is standing one storey below the answer.**
- **Above the roof (typed 7 for 6).** The plank extends over the roof and finds air; the owl leans out, sees the roof *below* her, and the plank tips down and withdraws. Then the same storey count.
- **Another tower's height (the graph-as-picture error, typed 9 when the tallest tower is 9).** The plank reaches **that tower's roof — and the wrong resident is there.** They wave and shake their head; their window is already dark. The owl looks back at the ringed sign. This is a strictly better rendering of the spec's own misconception 2 than *"dims every other bar"*: **the child has gone to the wrong house**, which is what reading the wrong bar actually is.
- **Third attempt.** The spec's show-me, unchanged: the correct number builds itself digit by digit on the cradle's own numeral, the child re-types it, HOIST carries the show-me ring.

**L3 — the total of two bars.** Two signs are ringed with `ART.plusMark` between them: **those two residents are moving in together, and their new tower is going up on the empty plot between them.** The owl types the total; the cradle loads that many storey-blocks and the new tower **rises to that height** — a THE OPENING move, where the quantity supplied *is* the extent produced. On a wrong total the spec's L3 hint plays exactly as written: tower A counts 1 … a, tower B **continues** a+1 … a+b (the count does not restart, F-105), and the sum strip is the new tower's own storeys. **The new tower stays on the skyline** for the rest of the session.

**Diegetic progress.** Lit lanterns on the skyline; new towers standing. There is no dot rail.

**Finish.** The Finish scene re-draws the same town at dusk: every lantern lit, the L3 towers built, the owl on the last roof. Because every tower still sits on the same gridlines, **the finish screen is a readable bar chart of the session** — the spec's "twelve mini charts" summary, except it is the world the child made. The first-try record is kept warm rather than scored: on a helped tower the resident is on the roof *beside* the owl, having come down to help.

**Deletion check.** Delete the maths (storey lines, values) → the plank has nothing to land on and the cradle's altitude means nothing. Delete the mission (owl, cradle, residents) → the keypad drives nothing and there is no commit path at all. **Both collapse.**

**What actually changes in the spec.** The ART registry keeps every entry (`bar` → tower, `rowBadge`, `tipLine`, `askRing`, `sumStrip`, `tenRow` all unchanged in function). The CONTENT block — all 21 items across L1/L2/L3 — is **untouched**. The misconception table is untouched. The Rules block is untouched but for the removal of the dot rail. Roughly **60 lines of "How it plays" and "Screen layout"** are rewritten.

---

### 6.2 · Spec 092 `plant-needs` → **THE POTTING SHED**

Frame **7 THE TENDING**. Pattern **P2** unchanged. Band 5-6. Objective unchanged: *gives a wilting plant exactly the three things it needs — sunlight, water and air — from a tray of six, leaving the things a plant does not need in the tray.*

#### BEFORE — verbatim from the spec

> Three empty slots (`ART.slot`, 88 × 88, dashed) in a row at y = 100 … — the plant's "needs shelf". Zone B: a tray of four tiles … **the bee hovers at (150, 130).**

> **A non-need placed**: the item glides back to the tray, `tone("nudge")` …

A tray, three boxes, and a bee that hovers. The "needs shelf" is a worksheet answer-row with a dashed border. The bee is decoration in the most literal sense: it is never referred to again in the entire spec except on the Finish screen.

#### AFTER — the game

**Mission.** *A new seedling has come into the shed, in the dark corner, under a jar, dry. The bee has to get it out into the light and growing, and the butterfly on the sunny end of the bench is waiting for a flower to visit.*

**The single state `S`.** *The seedling's condition.* Read scientifically it is which of the three needs it has received. Read physically it is where it stands, whether its jar is off, and whether it has been watered. **The three needs are three physically different acts**, which is the whole design.

**World (zone W, 56-420).** The shed, drawn as ART-BIBLE §4 scenery — a low-contrast `surface2` wash, one scene element, no detail. A **bench** runs across at y ≈ 330. Top right, the **window**, with the **sunbeam** falling from it onto the bench's right-hand half and pooling in a bright patch centred (540, 300). The bench's left half is in shade. The new seedling stands in the shade at (170, 300) **under its glass cloche**, in a pot that always shows soil (misconception 3 is unchanged and now stronger: soil is manifestly the floor the plant stands on, and it is never a thing you can pick up). The bee rests beside it at (110, 250). The **butterfly waits on the sunny end at (660, 270)** — Device 1.

Four service points, each 88 × 88 (5-6 floor):
| where | what tapping it means |
|---|---|
| the cloche, (170, 268) | **air** — the bee flies up and lifts the jar off |
| the bright patch, (540, 300) | **light** — the bee goes and **pushes the pot along the bench into the beam** |
| the watering can, (60, 380) | **water** — the bee flies to the can, fills a thimble, brings it back, pours |
| the window latch, (620, 190) | (L3 only, when the window is shut and the beam is weak) |

The clutter — sweets, hat, ball, teddy, pizza, juice — lies on a low shelf along the bottom of zone W at y = 395, 88 × 88, 1 tile at L1 and 3 at L2/L3. Six to eight interactive elements, well inside F-69.

**Hand (zone H, 420-560).** **Empty during play** — it holds the *finished plants*, lining up along a front rail as the session goes on. The world is the hand.

**The rule the child learns in one move: tap a thing, then tap the plant.** Uniform for every candidate, which is P2 exactly as written (*"tap a source tile, then tap a destination"*), and discoverable by tapping, which is the brief's hard requirement for 5-6.

**The isomorphism.** *The answer is where the bee goes and what it brings back.* Every candidate is a **place**, so choosing is already a journey; and the plant's acceptance is the correctness test. There is no shelf, no slot, no arrangement to be judged.

**The four responses, all preserved, all re-sited into the world:**

1. **Food offered (sweet, pizza, apple, chocolate)** — the bee carries it over, offers it, the leaves do not move, and it sets it down beside the pot. Then **the sunbeam brightens and three `ART.ray` lines reach the leaf** with `ANIM.glowLeaf` — the spec's exact cue, except the beam is now a real object in the world with a real source, so the wordless argument is *"it makes what it needs from THAT"*. **The bee then carries the sweet back to the shelf** — the honest cost, Device 3.
2. **Drink offered (juice)** — carried, offered, refused; then the **watering can** pulses and a drop arcs across the shed onto the soil (`ANIM.drip` unchanged, now with a source). Carried back.
3. **Soil as food** — structurally impossible, as before, and now more so: the pot is a thing the bee *pushes*, so soil is visibly the floor. On the third need the roots appear gripping it, unchanged.
4. **Objects that please the child (teddy, hat, ball)** — carried, refused, carried back, no extra cue on the first. On the **second** wrong offering in a round, **the three service points pulse once each in turn** — the spec's three-slot pulse, now pointing at three *places that work* instead of three empty boxes.

**Persistence and progress.** A round ends when the seedling is in the beam, uncovered and watered; it **blooms and stays on the sunny end of the bench**. The next seedling is wheeled in to the shade. Over eight rounds **the shady end empties and the sunny end fills with flowers**, and the butterfly moves to visit each new bloom. That is the progress bar: wordless, diegetic, and it is F-44's own prescription.

**Finish.** The Finish scene is the shed at the end: eight blooming plants along the sunny end, the butterfly on the last one, the window open, the beam full of them. This is the spec's existing summary (*"eight blooming plants … the garden the child grew"*) except it is not a summary — **it is the room, at the coordinates it was at all session.**

**Deletion check.** Delete the science → every service point and every clutter item is accepted, the bee ferries anything, and the plant blooms regardless. Delete the mission (bee, bench, shed, beam) → a tray of pictures with nothing to do to them. **Both collapse.**

---

### 6.3 · Spec 005 `shape-sorter` → **THE HARBOUR WALL**

Frame **5 THE ROUNDS**, with the destinations shaped so classification becomes fit. Pattern **P8** unchanged. Band 5-6. Objective unchanged: *sorts circles, squares, triangles and rectangles into the right bin regardless of the shape's rotation, size or fill.*

#### BEFORE — verbatim from the spec

> Zone A: a conveyor strip … with **the crab at the left end (80, 170)**; the first item … slides in from the right … Zone B: three bins … each with a prototype icon on its front … and a count sub-label.

> **Wrong bin**: the shape glides back to the centre … the bin the child tapped shows no mark.

Three boxes with icons and running totals, and a crab that stands at the left end of a conveyor belt for ten items and does nothing. The "bins" are answer boxes; the "counts" are a score with a different name.

#### AFTER — the game

**Mission.** *A storm has knocked holes in the harbour wall, and the little crabs cannot come out onto the rocks until it is whole. The crab has to find the right stone for every hole.*

**The single state `S`.** *Which holes are plugged.* Read mathematically it is which shapes have been correctly classified. Read physically it is how much of the wall stands.

**World (zone W, 56-420).** The **harbour wall** as a horizontal band from y = 200 to y = 300, drawn as a `surface2` wash with `line` edges. Behind and above it, the **pool with three or four crablings sitting on the rocks, watching** — the waiting party, Device 1, still and safe from the first frame. **Nothing about them ever gets worse**; they simply cannot come out yet.

In the wall, three **shaped holes** (four at L3) at x = 180 / 360 / 540, each 110 × 110, drawn as a cut-out in the prototype pose — a round hole, a square hole, a triangular hole, a long rectangular hole. These replace `ART.iconCircle` and its siblings and do the same job better: the hole is not a label saying "squares here", it is a square-shaped absence.

The crab walks a **ledge in front of the wall at y ≈ 340**. **Its x persists between items.**

**Hand (zone H, 420-560).** The beach, where one stone at a time washes up at (360, 470), 120 × 120, at the item's rotation, size and fill token — all three varied exactly as the spec requires so that colour and size never predict anything. Four to five interactive elements total.

**The isomorphism — and this is the best one in the document.** *Classification is fitting.* A shape sorter is the oldest toy in the world and it makes the mathematics physical with no loss whatever:

- **A square rotated 45° goes through the square hole.** The crab turns it as it pushes it in. Misconception 1 — *"a rotated square is a diamond, not a square"* — is not corrected by a hint; it is **refuted by the wall**, and the spec's `ANIM.settleUpright` stops being an explanatory animation and becomes *the act of fitting the stone*.
- **A skinny or obtuse triangle goes through the triangular hole**, because three sides is three sides. Misconception 2, enacted.
- **A rectangle will not go through the square hole** — it juts out, visibly, by the amount it is too long. Misconception 3's harder half, shown rather than told.
- **A square DOES sit inside the rectangular hole**, rattling, with a thin gap around it — which is exactly the spec's L3 rule (*"a square placed in the rectangle bin is accepted … mathematically a square is a rectangle; the game never teaches otherwise"*), rendered as a physical fact instead of a special case in the code. `ART.squareInRect` becomes literally true.

**Play.** Tap the stone — the crab scuttles down the beach, picks it up and holds it over its head, **rotation preserved**. Tap a hole — the crab scuttles along the ledge to below that hole and pushes the stone up into it.

- **It fits.** The stone seats itself, turning if it needs to, and locks into the wall; the wall's edge closes over it. It **stays there for the rest of the session**, Device 2. A crabling shuffles one step closer to that part of the wall.
- **It does not fit.** The stone meets the wall face and will not go. The crab pushes twice and the **silhouette of the stone against the hole shows the mismatch** — the corner sticking out, the round one rolling in the square socket. Then it lowers the stone and steps back, **still holding it**. The spec's enacted cue for that error type plays on the stone in the crab's claws: sides glowing one at a time with rising tones and the "3" badge for a triangle; the two long sides for a rectangle; the upright turn for a rotated square. **Attempt 2 costs only one tap**, because the crab is already holding the stone — which is exactly the shape F-46's support ladder wants.
- **Second miss.** The cue again, then the correct hole's edge glows (`ART.showRing` on the hole rather than on a bin).
- **Tapping a hole empty-handed** — the crab looks up at it and the hole's shape ghosts once. The spec's harmless preview, unchanged.

**One doctrine amendment this forces, and it is a real one.** §13 requires that *"the correct tile is never in the same slot twice running"*. The wall's holes are **fixed for the session**, which is both more physical and kinder — the child gets a stable map of the world. So §13 is satisfied a different way: **with a fixed world, "never the same slot twice running" becomes "never the same category twice running"**, enforced on the CONTENT list rather than on the layout. That rule generalises to every framed game and belongs in the shared contract (§9.1).

**Diegetic progress.** The wall filling, hole by hole. No dot rail, and **no bin counts** — the wall itself shows which shape went where, which is a better record than four numbers.

**Finish.** The mended wall with the crablings out on top of it, and the crab among them. The session's ten classifications are all still visible, in place, as a wall.

**Deletion check.** Delete the geometry (every hole accepts everything) → the crab ferries stones to arbitrary holes and the wall mends regardless. Delete the mission (crab, wall, crablings) → shapes and shaped boxes with nothing to move them. **Both collapse.**

---

## 7. Rejections — frames I refused, and why

Each of these is more obviously *fun* than something in the catalogue above, and each is banned by evidence already in the corpus. They are listed because every one of them will be proposed again.

| refused frame | why |
|---|---|
| **The Chase** — something is behind you | F-45 (competition lowers young children's intrinsic motivation, worse for girls; 5-6-year-olds who lose choose to compete less), F-75 (the Shark Numbers bite is named in the research as the exact banned shape). A pursuer is a timer with teeth. |
| **The Race** — get there before the other one | F-45 verbatim: *"a second character is a partner, never a rival that can finish first."* |
| **The Escape** — the room is filling / the roof is coming down | Violates the RATCHET RULE; it is a countdown wearing scenery. F-64. |
| **The Expedition** — a big world you scroll or pan around | The stage is fixed at 720 × 560 with no camera movement and no scrolling, by contract. Worse: F-8 records the only evidence in the corpus about exploration and it is **negative** — parents complain that Prodigy *"spends more time exploring than doing the maths."* The frames above deliberately keep the entire world visible in one frame. |
| **The Quest Chain** — a story that continues between sessions | No accounts, no storage (F-41 notes cross-session spacing *"cannot be stored"*). A story you cannot resume is a story you always start again. |
| **The Base Builder** — spend what you earn on a home | This is a currency and a shop; F-44 (d = −0.40 for tangible rewards, worse in children) and F-206. The mark that stays (Device 2) gives the same accumulation feeling with none of the extrinsic machinery, because the thing accumulating **is** the content. |
| **The Companion Who Can Be Lost** — protect the duckling | A loss, and a cruel one at five. THE FOLLOWING keeps recruitment and drops jeopardy. |
| **The Boss** — a big one at the end | Requires a rival and a fail state. The end of a session is a destination, not an opponent. |
| **The Two-Player Frame** — take turns with a friend | `PATTERNS.md` already rejects it: *"competition evidence for this age is negative (F-45); a partner character may appear inside P1-P12 but never as a second input."* |
| **The Rhythm Frame** — move in time with the music | *"Timed rhythm tapping — a timer in disguise (F-45, F-64)"*, already rejected in `PATTERNS.md`. |
| **The Inventory / Choice Frame** — pick your own route through the world | Genuine agency, genuinely rejected: it multiplies the content per session by the branching factor, it makes the adaptive ladder (§8) unschedulable, and it puts a menu on screen, which is F-69's named bad case (*"Prodigy's shop UI"*). |

---

## 8. Honest risks

### 8.1 The literacy problem, measured

This is the thesis's real weakness and it is not small. Scanning all 200 objectives for a physical or spatial referent a character could move through:

| subject | rows | rows with no physical referent | share |
|---|---|---|---|
| science | 24 | **0** | 0 % |
| maths | 110 | **3** (109 calendar-week, 110 months-wheel, 130 number-word-match — all three are *naming conventions*, not quantities) | 3 % |
| literacy | 66 | **55** | **83 %** |

**The resistance to a movement-native mission is almost entirely a literacy problem**, and inside literacy it concentrates in four classes: phonological (18 rows — the referent is a *sound*, and a sound has no location), orthographic convention (12), grammar and punctuation (13), and semantic/inferential relations (12). Spec **077 `question-or-telling`** is the type case the commission named: whether a sentence asks or tells is a property of an utterance, and utterances do not have addresses.

### 8.2 The fallback for the 55, in three tiers

**Tier A — the sound has a home even if it has no location (≈ 25 rows).** Phonological and orthographic games take **5 THE ROUNDS** or **10 THE FOLLOWING** with an *arbitrary but consistent* world: the sound-families live in burrows, the rhyme-families are a family you reunite, the syllables are a train of carriages you couple. The isomorphism is weaker than the shape sorter's — the burrow does not *physically* reject a wrong sound the way a square hole rejects a rectangle — but it is honest, because the mission is delivery and delivery genuinely is classification. Deletion 2 still bites (no world, no delivery). Deletion 1 bites. **The corpus already contains one of these and it works**: spec **171 `syllable-hop`** — *"hop once per syllable across stones"* — is a fully movement-native literacy game that nobody noticed they had written. It is the template.

**Tier B — sequencing and procedure literacy takes 11 THE WORKS (≈ 12 rows).** Sentence order, story order, alphabetical order, recipe steps and dictionary order are *procedures*, and a procedure in a machine is refused by the machine. 197 `read-the-recipe` is already this game and does not know it. 075, 078, 157, 191, 196 follow.

**Tier C — the honest exception: ~18 rows keep a strong frame and a weak isomorphism, and this must be declared, not hidden.** Inference (081), title choice (198), pronouns (192), feelings (155), question-vs-telling (077): for these the mission is a genuine mission and the world is genuine, but the *isomorphism is conventional* — the sentence goes in the "asks" boat because we say it does, not because the boat would sink. **A spec in Tier C must say so in its `S` field**, in one sentence, e.g. *"S = which boat the sentence is in; the isomorphism is conventional, not physical."* Then a reviewer can see the weak ones at a glance instead of discovering them at build time.

For 077 specifically the best available frame is **13 THE FERRY**: two boats, one that goes to the island where things are *asked* and one to the island where things are *told*, and the sentence is stamped with its mark as it steps aboard. The mission is real, the progress is real (the near bank empties), the stamp is the learning object — but a wrong sentence in the asks-boat does not make the boat sit low. It is a good game with a declared weak joint, and pretending otherwise would be the more dangerous outcome.

### 8.3 The other risks, ranked

**R1 · The 1200 ms tax is real and compounds.** Twelve items × three ACTs each × up to 1200 ms is up to 43 seconds of a 5-7 minute session spent watching. Mitigation is in every world layout above — *moves are one station, stations are adjacent* — but a builder who makes a hero cross the stage will blow the budget without any gate noticing. **`qa-game` must measure total ACT time per session and fail above ~60 s.** This is the risk most likely to be discovered by the operator rather than by a gate.

**R2 · A frame can become a costume.** Nothing stops a builder from drawing a boat around a P8 sort and calling it THE FERRY. The Single-State Law is the defence and §9.2's mutation test is the enforcement; without the mutation test this document degrades into theming within two builds.

**R3 · Fourteen frames is a lot to hold.** Three pairs are adjacent (§2.15) and a tired reviewer will conflate them. Mitigation: the frame is a **required field on the catalogue row**, so it is chosen once, in the open, at spec time.

**R4 · The frozen stage may read as broken.** A stage where genuinely nothing moves is unusual, and a child may tap to see if the game is alive. This is a *feature* (F-60: *"can a five-year-old find the first move by tapping?"*) but it needs one deliberate concession: **the first item of a session may demonstrate itself once**, which F-42 already permits verbatim (*"first item of a new mechanic can demonstrate itself once, then fade"*). The hero takes one step unbidden, on arrival, and then holds.

**R5 · Re-queue (F-41) fights persistence (L2).** A missed item returning 3 items later means revisiting a place the hero has left. Resolution: the re-queued item is a **different instance of the same skill at the hero's current position**, not a teleport back — which is what a route is like, and what spec 120's own re-queue rule (*"re-enters with its bar ORDER shuffled"*) already implies.

**R6 · Persistence makes the finish state content-dependent.** If the hero's route depends on the child's answers, the Finish screen is not identical between sessions — so a visual-critic screenshot sweep cannot compare against a fixed reference. The gate must assert *properties* of the finish state (goal reached, N marks present), never a pixel match.

**R7 · This document has not been built.** Every claim above about how a five-year-old will read a tipping stone is a design judgement, not a measurement. The corpus's own history is unkind here — the fox passed every gate three times and was rejected on sight — so **the first framed build should be a transformation of an already-built game (001 or 002), so the operator can compare the same content in both shapes side by side.**

---

## 9. What this changes in the shared contract

Concrete, so the system is enforceable rather than aspirational.

### 9.1 Spec and catalogue changes

1. **`CATALOGUE.md` gains a `frame` column** beside `pattern`. 200 values, chosen once, reviewable in one pass.
2. **Every spec gains a `## Mission` section** with five fields: *mission* (one line, the child's words) · *hero* (which roster animal, and what it physically does) · *destination* (what is waiting, at what coordinate) · **`S`** (the single state variable, with its mathematical and its physical reading) · *the mark that stays*.
3. **`BUILD-CONVENTIONS §7` is replaced** by the Mission Layout (§1.4). Zones A/B/C become W/H.
4. **§6 loses the dot rail during play**; the diegetic progress display is named in the spec's Mission section. The rail survives on Finish only.
5. **§13's "never the same slot twice running"** gains the fixed-world form: *never the same category twice running* (§6.3).
6. **§10's Finish screen** re-draws the final world at its play coordinates, plus the title and the two buttons.
7. **F-63b** is added to `FINDINGS.md` §4 beside F-63, with the two-deletion test stated as a pair.

### 9.2 The gate — `_tools/check-mission.js`, and the mutation test that gives it teeth

Static and runtime assertions, in the repo's existing idiom:

- **M1 · DESTINATION.** A named `mission.goal` exists with constant (x, y) inside zone W for the whole session; `mission.hero` exists and its (x, y) changes on at least *n−1* of *n* items.
- **M2 · FREEZE (the F-42 gate).** At every decision point of a full `qa-game` session: if any target is enabled, the running tween count is zero.
- **M3 · PERSISTENCE.** Hero position at the start of item *k+1* equals its position at the end of item *k*, for every *k*. Plus: the zone-W pixel diff between item 1 and item *n*, **outside the current item's own region**, exceeds a threshold — i.e. the world visibly remembers.
- **M4 · RATCHET.** A monotone `mission.progress`, asserted never to decrease across a session driven with a wrong answer on every item.
- **M5 · NO RAIL.** No dot-rail art is drawn during the Play scene.
- **M6 · ACT BUDGET.** Total ACT time per session ≤ 60 s (R1).

**And the mutation test, which is the only part that actually enforces the thesis:**

- **`mutate-mission.js` · DELETION 2.** Remove `mission.goal` and `mission.hero` from the game. **The game must fail to complete an item.** If it still runs, the mission was decoration and the game is a worksheet with a costume. This is the exact poison-testing discipline the repo already applies to every tool gate, pointed at the one property no other gate can see.
- **DELETION 1** is already covered: F-63's delete-the-question check plus F-65's brute-force guard (a random tapper must reach the show-me ladder on most items).

Both deletions must **fail the build**. That is what makes "moving is solving" a contract rather than a slogan.

### 9.3 Suggested order of work

1. **Ratify the F-69 reading** (§9.4) — it blocks three frames and one existing built game.
2. **Build `check-mission.js` and `mutate-mission.js` first**, poison-tested in both directions, before any game is framed. Every lesson in this repo's history says the gate that is written after the build is the gate that certifies the defect.
3. **Frame 001 or 002** — an already-built game — so the operator can compare identical content in both shapes.
4. **Assign frames to all 200 catalogue rows** in one pass, and flag every Tier-C literacy row (§8.2) in the same pass.
5. Only then re-spec.

### 9.4 One rule needs the operator's ruling before anything is built

**F-69 says *"≤ 10 interactive elements on screen"*, and it cites Hit the Button's *"8-10 large buttons"* approvingly.** But spec 120 already ships **eleven keypad keys plus OK = twelve targets**, and passed review; THE OPENING, THE CLIMB and THE SWAP all want a keypad too. The rule and the corpus are already in conflict and the conflict is being resolved silently.

The reading I have designed against, which needs ratifying or overruling:

> **An INSTRUMENT counts as one element; CANDIDATES count individually; inert scenery counts as zero.**
> A keypad, a stepper or a dial is one instrument — the child does not evaluate ten alternatives, they enter a value. A row of answer tiles is *n* elements, because each one is a thing to consider. F-69's real target is **choice load**, not target count.

If the operator overrules this, P11's nine keypad games need a different instrument and three frames lose their best pattern — so it is worth settling before, not after.
