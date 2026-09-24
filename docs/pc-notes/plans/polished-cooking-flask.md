# Turn the 200 designs into real games

## Context

**Operator ruling, 2026-09-06:** *"The games you designed are just activities… The game has to have a mission or purpose. The kids need to be involved in the mission by making the character do something while on the way solving math problems… the training is rather hidden in the game. The character should not be static, it needs to move around and complete missions… kids want to play it for the sake of playing and completing something rather than for the sake of training their skills."*

He is right, and the cause is architectural rather than a failure of any one spec.

**The corpus has no game layer.** `design/catalogue/PATTERNS.md` is titled *"the twelve ways a child can act"* and every one of its twelve entries is an **input verb** — tap one of N, tap to place, tap to count, keypad entry. `BUILD-CONVENTIONS.md` §7 lays the stage out as **zone A = "the thing to think about" / zone B = "the tiles the child acts on" / zone C = feedback**. That is a worksheet. Nothing in the design system ever asks what the child is *trying to do*, who they are, where they are, or why they would come back. The mascot is furniture at a fixed coordinate that nods on a correct answer (spec 120: koala at `(60,240)`, `ANIM.nod`); progress is a rail of dots counting exercises; the finish screen is an itemised summary.

**It came from one line in the brief.** §5.1 asked for *"8–12 core interaction patterns — the ways a child can act"* and ruled that *"variety comes from content, presentation and difficulty, not from novel controls."* That is a **correct accessibility rule about the finger** (F-68 tap-first, F-49 no drag below 6) that was silently applied as a rule about **design**. Two hundred specs then inherited a taxonomy of controls where a taxonomy of games should have been.

**The project's own research already demanded more than was built.** F-44 prescribes *"progress = the task completing (tower built, path filled)"* — that is mission language, and the corpus shipped a dot rail. F-63 requires *"the learning object IS the game object"*, F-48 found puzzle/manipulative structures outperform other types (g = 0.63 vs 0.31), and PRIOR-ART names *"the answer-then-arcade archetype"* among the **poor** cases. The specs implemented the constraints and skipped the design.

**Intended outcome.** All 200 designs become games a child plays because they want to finish something — a character they drive through a world on a mission — with the skill practice load-bearing inside the play rather than presented as questions. No pedagogy is lost: the objectives, the misconception responses, the curriculum links and the 11-locale discipline are the corpus's real asset and every one of them survives.

---

## The design thesis: **moving is solving**

One rule generates the whole redesign.

> **The character's action in the world must be isomorphic to the cognitive operation.** Not *solve, then move* — **moving is how you solve**. The child steers; the steering is the maths.

Worked contrast, from a spec I read in full:

| | 120 Bar Chart Reader as designed | as a game |
|---|---|---|
| Child does | reads a bar, types `6` on a keypad, taps OK | drives a window-cleaner up the asked bar; the platform rises **one gridline per tap**, and they stop it at the top |
| Character | koala at `(60,240)`, nods when right | the thing the child is moving |
| Mission | answer 12 items | clean every window on the row; the finished street *is* the progress bar |
| The maths | the question | the height they must stop at — miscount and you stop at the wrong floor, which you can *see* |

This is the **two-deletion test**, and it is the plan's central gate:

1. **Delete the maths — nothing playable may survive.** (F-63, already enforced; it is what makes answer-then-arcade illegal.)
2. **Delete the mission — nothing playable may survive.** (New. It is what the current corpus fails.)

A quiz-with-arcade passes 2 and fails 1. The current 200 pass 1 and fail 2. A real game fails both deletions.

---

## What is invariant, and the one standing rule the operator has just amended

**Invariant — carried across untouched:**
- The `## Learning` block of every spec: objective, prerequisites, curriculum links, and **every misconception with its enacted response**. This is the corpus's hard-won value and it is preserved verbatim wherever the new mission can still enact it.
- Band (5-6 / 6-8 / 8-9) and the one-objective rule.
- **No losing state, no lives, no game over, no timer, no countdown, no score, no points/stars/badges** (brief §7 + §9 anti-patterns; F-44, F-45, F-64). Missions get **stakes without failure**: setbacks are recoverable and *in fiction* (the cart rolls back a step; the bridge plank does not fit and is handed back), never punitive, and there is exactly zero ways a session can end other than finishing (F-61).
- Tap-first, one input primitive, tap floors (80 px at 5-6 / 56 px at 6-9, ≥ 44 real), full keyboard operability, no meaning by colour alone, 11 locales, the palette and `ART-BIBLE.md`.
- Readable without reading (F-60), brute-force cannot win (F-65), ≤ 10 interactive elements at any moment (F-69), ~5-7 minute sessions.

**Amended by this ruling — `pattern` is no longer invariant.** `BUILD-WORKFLOW.md` §3 currently freezes *"objective, band, pattern, misconception responses"*. **Pattern must change**, because pattern is exactly the layer that made these activities. PATTERNS.md is **demoted, not deleted**: it stops being *"the twelve ways a child can act"* and becomes the **input-primitive contract** — how the child touches the screen. A moving character is fully compatible with tap-only input: *tap where to go*.

---

## Three root causes, all three must be fixed

A spec-by-spec rewrite alone would fail, because two of the three causes are below the specs.

1. **The design system has no game layer.** `PATTERNS.md` = twelve input verbs. Nothing names a mission, a goal, a world or a character with agency.
2. **The layout contract is a worksheet.** `BUILD-CONVENTIONS.md` §7 hard-codes zone A "the thing to think about" / zone B "the tiles the child acts on" / zone C feedback, on a 720×560 stage.
3. **The engine cannot move a character.** `GameCore` exposes exactly **17 methods** — `init · t · setLanguage · makeButton · makeLanguagePicker · showPraise · makeStartScreen · reportHeight · makeTile · playAnim · tone · setSoundEnabled · preloadArt · drawArt · setFocus`. There is no avatar, no route, no world, no mission state, no goal. It is a tile-and-button chrome library, and a game built on it can only be a quiz. Phaser is bundled but only its shapes, text and tweens are used.

**Corollary:** write 200 mission designs against an engine that cannot run them and you have written 200 pieces of fiction. The engine and one played-through pilot come **before** the fan-out.

## The evidence constrains the *kind* of game, and it is not arcade

F-48 is the single most useful number in the corpus: early-childhood game trials show **puzzle games g = 0.63 vs 0.31 for other types**, and PRIOR-ART lists the twitch/arcade titles among the poor cases. F-45 bans a rival who can win; F-64 bans the countdown. So the target is not an action game with sums in it.

> **A mission here is a puzzle you walk through, not an arcade you shoot through.** The character moves deliberately, by tap, at the child's pace, and the world is a space to be *figured out and completed* — a bridge finished, a street cleaned, a herd brought home.

That is the intersection of what the operator asked for and what the research supports, and it is also what makes these paid games structurally different from the 204 free activities the catalogue must not re-skin.

### The operator is asking for an unimplemented finding, not a new direction

This is the strongest fact in the plan and it should be stated plainly to him:

> **F-11** — *"Popular 'answer-then-arcade' games sell in UK schools… Their appeal (**motion, a goal, a character**) must be matched by other means since the mechanic is banned (F-63)."*
>
> **F-212** — *"**Match the appeal of answer-then-arcade with a character and a goal that IS the task** (F-11, F-63): the character's need is satisfied by the mathematics itself… never by a bolted-on chase."*
>
> **F-203** — *"Puzzle/manipulative structures over quiz wrappers: arrange, complete, match, build, sort, compose."*

The research identified the exact three things the operator says are missing — **motion, a goal, a character** — ruled that they must be matched, numbered the requirement, and the catalogue's own prior-art rule repeated it. Then 200 specs were written that satisfy F-63 and ignore F-212. Note that even F-212's own illustrations ("feed N fish, fill the ten-frame tank") are static: it captured *goal* and *character* and dropped **motion**, which is precisely the half F-11 names first and the operator is now insisting on.

So this work **delivers an existing requirement**. Nothing in the pedagogy has to be argued away.

## The gates block this today, and two of them would fail silently

Surveyed in full. The project rule holds throughout: **never move a threshold to pass — fix the artefact, or fix WHAT is measured.** Every item below is a rewrite of the measurable, not a relaxation.

**Hard blocks — a mission game cannot pass these at all (7):**

| # | Where | What it asserts | Why it blocks |
|---|---|---|---|
| 1 | `check-build.js:131-132` | bans `.add.sprite(`, `.load.spritesheet(`, `.load.image(` | Forbids the whole Phaser idiom for an animated character. The *intended* measurable is "no binary assets; art goes through `drawArt`" — it was implemented as "no sprites". **Split those two ideas.** |
| 2 | `qa-game.js:205` | a real click on Start must take the scene `Boot → Play` | Any map or mission-brief scene between them fails. |
| 3 | `qa-game.js:232,235,241` | closed `Boot/Play/Finish` enum; loop runs `while scene === "Play"` | A fourth scene silently exits the loop and reports a **false** SESSION failure. |
| 4 | `qa-game.js:236-238` | `wrong()` → 350 ms → `correct()` → 900 ms, per item | Assumes one binary answer per item. If answering means *arriving somewhere*, `correct()` would have to teleport the avatar — which §16 forbids, so the gate would be proving a path no child can take. |
| 5 | `check-build.js:160` | `LCS_TEST` must expose `wrong`, `correct`, `targets` | Hard-codes the tap-a-choice vocabulary as the vocabulary of proof. |
| 6 | `lint-specs.js:119-121` | `ID-PATTERN` must be a `P<n>` listed in `PATTERNS.md` | **There is no legal pattern id for a mission game.** The spec-side twin of block 1. |
| 7 | `lint-specs.js:160-162` | `## Rules` must contain "Item count / correct answer / wrong answer / Retry behaviour…" | Item-and-answer shaped. Left as-is these become boilerplate a writer satisfies vacuously — the worst outcome: a gate that passes while measuring nothing. |

**Silent breakage — passes or fails for the wrong reason (the dangerous set):**

- ⚠️ **`qa-game.js:223` — an empty `targets()` is a PASS** (*"no targets reported on the start screen"*). A mission game that returns `[]` would clear the 44-px tap-target gate **by reporting nothing**. This must become a non-vacuity assertion before anything else changes.
- ⚠️ **The stage mapping is hard-coded `(x/720, y/560)` with no camera term** at `qa-game.js:159,199-200,221` and in both probes. It is *already* wrong for the §2-permitted 720×720 stage; it is inert only because the camera never moves. Move the camera and ALIGNMENT reports **every control dead** with a confident, specific, entirely wrong message.
- ⚠️ **ALIGNMENT snapshots bounds then matches within 2 px** (`qa-game.js:153,174`) — anything in motion mismatches. Its own failure text (*"a child has to hunt for the live part"*) presupposes a stationary control.
- ⚠️ **`qa-game`'s TARGETS check is already vacuous** — it runs before `start()`, so it only ever measures the start and finish screens. Documented at `probe-feed-the-fox.js:348-354` and `BUILD-LOG.md:119`; the per-game probe is what actually covers the play surface.
- ⚠️ **`check-redundancy.js:27-29` — the stop-word list encodes tapping as the universal background**: it strips `tap/taps/tapping/choose/pick/select/match/correct` precisely because every objective contained them. Mission verbs (*move, walk, carry, collect, deliver, rescue*) are **not** stripped, so they become the dominant shared tokens across all 200 objectives and inflate the DUP-OBJ similarity score everywhere. And `check-redundancy.js:72,85` uses `pattern` as a load-bearing differentiation axis — **if every game becomes "a mission game", DUP-KEY fires on nearly every same-subject pair**, which historically leads to blanket `[deliberate:]` annotation, i.e. silent disablement of the gate.
- ⚠️ `check-pools.js` is entirely three-tile-static-choice shaped (`{id,n,d,lay}`, distractor legality, rank balance). It correctly **exits 2 rather than passing vacuously** when it parses nothing — that refusal is the template every new content gate must copy.
- ⚠️ `check-build.js:167` — the **1200 non-art line ceiling**, against shipped games at 1107 and 1238. Re-express the measurable (per-scene budgets, or exclude a declared controller block the way ART lines already are); do not raise the number.
- ⚠️ `window.__startBtn` is an **undocumented harness contract** (`qa-game.js:104,134,169`) that works only by accident of a top-level `var` becoming a window property. Any scene restructure breaks POINTER and ALIGNMENT with a message that reads like a game defect.

**The structural gap:** `art-sheet.js` proves the still frame, `qa-game` proves the file responds to a pointer, the critic reads still screenshots, I read still renders — **nothing in the suite reviews MOTION**, and a game whose defects live in movement needs a fourth instrument. That is an addition, fully consistent with the never-loosen rule.

**What must not be touched:** NO-AUTO · the 11-locale sweep and ≥7 distinct Start labels · the POINTER callable-hit-area assertion (the lesson that made all 200 games untouchable while the suite was green — it matters *more* for a moving character) · **NO-PUNISH** (a mission game is exactly where no-lives/no-losing gets quietly abandoned) · NO-VH · the registries/11-locale completeness · `check-pools`' refusal to pass vacuously · the probe concept.

## Scope ruling (operator, this session)

> **"You should redesign all 200 games."**

All 200 are redesigned — no pilot gate, no staged subset, no "prove it on one first". The redesign is the deliverable. Engine work and gate rewrites run alongside it so the designs land on a real target rather than a hoped-for one, but they do not hold up the redesign.

**What is kept from each existing spec** (the corpus's real value — never re-derived, never re-litigated):
objective · age band · prerequisites · curriculum links across the 12 systems · **every researched misconception with its enacted correction** · the L1/L2/L3 content pools where the maths still applies · the 11-locale discipline · every no-punish/no-timer/no-losing rule.

**What is redesigned:** title · character · world · mission · what the child physically does · layout · art · motion · progress · finish state. `pattern` becomes an input note, not the game's identity.

Re-titling is established practice, not a new liberty: 002 shipped as *Number Nest* rather than the catalogued *Numeral Nest*, with `CATALOGUE.md` row 002 updated to match because the hub reads its title from there. The same edit is made per game.

## Deliverables

### D1 — `games/design/MISSIONS.md`, the missing game layer
The mission-frame system: ~10-14 reusable frames, each a *shape of game* (mission · what the character does · world layout on a fixed 720×560 · the isomorphism that makes moving = solving · refusal behaviour · diegetic progress · finish state). Plus the pattern→frame mapping so every one of P1-P12 has a movement-native home, the F-42 rule, and the stakes-without-failure devices.

**The shape of it** — every input pattern already has a movement-native home, so nothing has to be forced. Sketch, to be finalised by the design ensemble as D1's first act:

| Pattern (games) | Mission frame | Why moving *is* solving |
|---|---|---|
| P1 choose (41) | **Fork in the road** | The character reaches a junction of N ways. Choosing *is* going. |
| P2 tap-to-place (31) | **Fetch & carry** | Walk out, pick it up, carry it, set it down — placing becomes a round trip. |
| P8 sort into bins (25) | **The delivery round** | Each parcel goes to the door that takes it; sorting is a route. |
| P4 tap in order (22) | **Stepping stones** | Cross in the right order; the wrong stone won't take your weight. |
| P12 match pairs (18) | **Reuniting** | Lead each one across to the one it belongs with. |
| P3 tap to count (17) | **Gathering** | Walk the line picking up as you go; one-to-one becomes a walk past. |
| P10 predict-reveal (13) | **Scouting** | Commit before you open the door you are about to walk through. |
| P11 keypad (9) | **Working the machine** | Dial the crane, ride it to the floor you named. |
| P6 build on a grid (8) | **Laying the road** | Build the path, then walk the path you built. |
| P7 trace a path (8) | **The crossing** | Already movement — make the character actually travel it instead of a hint dot. |
| P9 set a value (8) | **Aim and ride** | Set the ramp, the sail, the hands — then go where you set it. |

Note what this preserves: the input primitive stays **tap only** in every row (tap where to go, tap what to pick up), so every accessibility rule in `PATTERNS.md` survives untouched.

### D2 — `games/design/GAME-DESIGN-LAW.md`, the amendment
The ruling, the two-deletion test, what is invariant, and the demotion of `PATTERNS.md` from *"the twelve ways a child can act"* to the **input-primitive contract**. `PATTERNS.md` gets a header amendment; nothing in it is deleted, because every accessibility rule it carries still binds.

### D3 — all 200 specs, redesigned
Each keeps the 12-heading schema (extra headings are legal — `lint-specs.js:88-93` only checks that the required ones appear in order) and gains **`## Mission`** and **`## World`**. `## How it plays`, `## Screen layout`, `## Visual specification`, `## Art registry`, `## Animation registry` and the movement parts of `## Rules` are rewritten; `## Learning` is carried across intact.

### D4 — `_lib/mission-core.js` + the session lift
The avatar/travel/mission layer, **plus** lifting the ~350 lines of session/adaptive/support-ladder logic that both built games duplicate verbatim. This is not optional polish: `check-build.js:167` caps a game at 1200 non-art lines and the two shipped games are already at 1107 and 1238, so a richer game **cannot fit** until the shared logic moves into the library.

### D5 — the gate rewrites
Every item in the block table above, each poison-tested in both directions, plus the two pre-existing defects the survey exposed (the vacuous empty-`targets()` pass; the missing camera term in the stage mapping) and a **fourth instrument that reviews MOTION** — the suite proves the file, the picture and my own reading of still frames, and nothing yet proves movement.

### D6 — catalogue and redundancy re-basing
`CATALOGUE.md` gains a `frame` column and updated titles. `check-redundancy.js` needs its differentiation axis re-chosen **before** the corpus changes: with `pattern` collapsing toward one value, `DUP-KEY` would fire on nearly every same-subject pair, and its stop-word list strips the tap vocabulary but not mission verbs, so *move/walk/carry/collect* would become the dominant shared tokens and inflate every similarity score. Left alone, the gate degrades into noise and gets silenced by blanket `[deliberate:]` annotation.

## How the 200 get redesigned — the fan-out

Not one agent per game in a single pass. Each game runs a **four-stage pipeline**, and games flow through independently:

1. **Frame assignment + mission invention** — an expert children's-game designer picks the frame, invents the world, the character's job and the goal, and writes the isomorphism in one sentence.
2. **Pedagogical carry-over** — the objective, band and every misconception response are re-seated inside the new mission; anything that no longer has a home is flagged rather than dropped.
3. **Spec authoring** — the full redesigned spec to the 12+2 heading schema.
4. **Adversarial verification** — the two-deletion test, the F-42 rule, no-punish/no-timer/no-losing, tap-only reachability, ≤10 interactive elements, 400-px legibility, and a redundancy check against already-redesigned siblings. A game that fails goes back to stage 1.

Waves are grouped by **objective family, not by number** (counting/cardinality, bonds, +/− to 20, place value, shapes, letter-sound, blending, sequencing, science observation…), because the redundancy risk is between games that teach the same thing, and a wave that holds a whole family can differentiate inside itself. A durable ledger — `games/design/REDESIGN-LOG.md`, mirroring `BUILD-LOG.md`'s `NEXT:` pointer — carries the program across sessions.

## Sequencing

| | Work | Why here |
|---|---|---|
| 1 | D1 + D2 — frames and law | Every redesign is written against them; nothing can start first. |
| 2 | D6 redundancy re-basing | Must land **before** the corpus changes or the gate is destroyed by its own stop-list. |
| 3 | D3 — the 200, in family waves | The deliverable. |
| 4 | D4 + D5 — engine and gates | Runs alongside 3 from the start; the engine's *capability contract* is fixed in step 1 so designs target something real. |
| 5 | Rebuild 001 + 002, then resume the build order | The two shipped games are activities by the new law and must not stand as the style reference. |

## Verification

**Per redesigned spec** (mechanical, runs on every one of the 200):
- `node games/_tools/lint-specs.js <spec>` — PASS, with the amended schema (`## Mission`, `## World`, a `frame` id in place of the `P<n>` lock at `lint-specs.js:119-121`, and a `## Rules` vocabulary that names mission events rather than "wrong answer" boilerplate).
- `node games/_tools/check-redundancy.js --specs` — 0 un-annotated hard duplicates **on the re-based axis**.
- The **two-deletion test**, asserted per spec: delete the maths → is anything playable left? delete the mission → is anything playable left? Both must be "no".
- **The F-42 check**: nothing decorative moves while a choice is open.
- **No-punish sweep**: `lives · game over · you lose · red x · buzzer · timer/countdown` absent — this is the rule most at risk of quiet abandonment once games have missions and stakes.

**Per built game** (the existing Step-4 gate ladder, with the rewrites): `check-build` → `qa-game` (11 locales, never auto-starts, real-pointer POINTER + ALIGNMENT, a full session that fails on every item and still reaches Finish, targets ≥44 px) → per-game probe → **art sheet at 48/96/192/384** → the new **motion instrument** → visual critic → I read the 704 and 1024 renders myself → pedagogue sign-off.

**End-to-end, the only test that actually matters:** `node games/_tools/serve.js` → `http://localhost:8480/<slug>/index.html?lang=en` and the same in the other ten languages, and **the operator puts it in front of a child.** The question the whole programme is judged on is not whether the gates are green — game 002 passed every gate and was rejected on sight — it is whether a child plays a second time without being asked.

## Risks, stated plainly

- **Hiding the maths can make it harder to learn.** Fiction adds processing for the child who is already struggling, and the enacted misconception corrections are the corpus's best asset — if a correction cannot fire inside a mission, that game got worse, not prettier. Stage 2 of the pipeline exists for exactly this, and any correction without a home is flagged, never quietly dropped.
- **Band 5-6 is 64 games**, and means-end reasoning and narrative comprehension are thin at five. Missions there must be one step long and legible with no words at all (F-60). This may need a simpler frame set for the youngest band.
- **Some objectives resist a movement-native mission** — abstract literacy like *077 question-or-telling* is the type case. Those get an honest fallback rather than a forced fiction; a bad mission is worse than a good activity.
- **The redesign makes every game bigger**, against a 1200-line ceiling two games already brush. D4 is load-bearing, not optional.
- **`check-redundancy` degrades into noise** if the axis is not re-based first — and a noisy gate gets silenced, which is worse than no gate.
- **200 rebuilt games is a long programme.** The redesign is the deliverable here; the builds continue one per trigger against redesigned specs.
