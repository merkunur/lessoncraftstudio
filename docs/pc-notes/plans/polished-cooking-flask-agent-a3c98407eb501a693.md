# Pedagogy risk review — the "moving is solving" pivot across 200 K-3 game designs

Adversarial review, 2026-09-06. Read: `games/design/research/FINDINGS.md` (all 294 lines),
`research/_src-learning-science.md` Part 1 (§1-§10), `research/ASSUMPTIONS.md`,
`research/PRIOR-ART.md` (structure + character-fronted rows), `research/_src-demand.md` §2.1-§2.3,
`design/GAME-DESIGN-BRIEF.md`, `design/FINAL-REPORT.md`, `catalogue/PATTERNS.md`,
`catalogue/BUILD-CONVENTIONS.md`, `catalogue/CATALOGUE.md` (preamble + rows 001-018 + pattern/band
counts), `specs/001-feed-the-fox.md` in full, `games/BUILD-LOG.md`, `games/ART-BIBLE.md` §8-§12.

**Bottom line.** The thesis is right in its *direction* and dangerous in three specific, nameable
places. "Moving is solving" is a restatement of a well-regarded 40-year-old design principle
(Malone's endogenous fantasy; Habgood's intrinsic integration) — **which is not in this project's
research base at all**, so the pivot is being made on the one question the research phase never
asked. Of the findings audited, **4 are genuine conflicts** (F-41 re-queue, F-48 puzzle-vs-other,
F-65 brute-force, F-69 element budget), **11 need a new enforceable rule**, and the single largest
risk is not any of those: it is that **a mission turns every error into something that happens to the
character the child identifies with**, which is Kluger & DeNisi's self-level feedback — the category
in which 38% of interventions *decreased* performance. The catalogue currently has zero instances of
that. A mission layer reintroduces it by default.

---

## 0 · Three things to fix in the framing before anything else

**0.1 "Hidden inside the play" is the wrong word and, taken literally, is the pivot's biggest
teaching risk.** Nothing in the intrinsic-integration literature advocates *concealment*. Malone's
term is intrinsic/endogenous *fantasy*; Habgood's is intrinsic *integration*. Both mean the learning
content is delivered **through** the most engaging part of the game — not that the child is unaware
of the content. Concealment has a specific, well-known failure mode at this age: it becomes a word
problem. Dressing arithmetic in a story reliably makes it *harder* for 5-8s (the story adds
comprehension load and children mis-map the story onto the wrong operation), and this project's own
demand research rates that genre as niche anyway — **F-6: "Word problems 4/15, grammar 4, punctuation
1."** Recommend the operator's phrase be re-stated as **"integrated, never concealed"**, and that the
abstract notation (numeral, symbol, ten-frame, equation) is required to be visible in the same frame
as the fiction, always. §3.1 below gives the evidence for why the struggling child pays for
concealment first.

**0.2 The two-deletion test has a hole, and there is a third test that is the one that matters.**

| Test | Catches | Status |
|---|---|---|
| A (F-63) — delete the maths, nothing playable survives | quiz-plus-arcade | already enforced |
| B (new) — delete the mission, nothing playable survives | mission-as-wallpaper | **too weak — see below** |
| C (**missing**) — delete the *walking*, replace every traversal with an instant cut: does the game play identically? | the walk as a seductive detail with a mission-shaped excuse | **this is the real F-42 discriminator** |

Test B is passed trivially by any decorative frame that happens to be load-bearing for the finish
screen. 001's fox already passes it (delete the fox and there is no bowl for the berries) while
contributing nothing the operator is asking for. **Test C is the one that separates "moving is
solving" from "moving is between solving."** If a build survives an instant-cut patch unchanged, the
seconds spent walking are pure extraneous load. Make Test C a build gate; it is scriptable (patch
tween durations to 0 and re-run `qa-game`; the session must reach Finish with an identical item log).

**0.3 The research base has a hole exactly where the pivot sits — and one supporting finding was
lost in synthesis.** Measured by grep across the entire `games/` tree: **zero** occurrences of
Habgood, Malone & Lepper 1987, "endogenous", "exogenous", "intrinsic integration", "intrinsic
fantasy", "narrative comprehension" or "story grammar". The only Lepper hit is the 1973
overjustification row. The research phase covered retrieval, spacing, CLT, feedback, rewards, timers,
adaptivity, touch and game-vs-instruction meta-analyses; **it never asked whether narrative framing
helps or hurts.** Separately, the one moderator result in the project's own sources that *supports*
the pivot was dropped in the synthesis: `_src-learning-science.md:104` records Sailer & Homner 2020
as "**game fiction** and competition-plus-collaboration are the elements that matter", and F-44 in
FINDINGS.md carries only the other half ("gamification metas show badges shift focus to the reward").
That is a correctable synthesis defect and it currently makes the evidence base look more hostile to
the pivot than it is.

> **Recommendation, cheap and decisive:** commission a short live literature check on intrinsic
> integration / endogenous fantasy / narrative framing for 5-9 and add it as F-219…F-22x, so the 200
> transformed specs can cite something. A few hours against a 200-design commitment.

---

## 1 · The F-42 problem, settled

### 1.1 What F-42 actually says

`FINDINGS.md:153` —
> **F-42 · Cognitive load: decorative motion and text are extraneous load (★★★ direction, ★★
> magnitude at 5-9).** Seductive details g = −0.33 (Sundararajan & Adesope 2020); split-attention
> g = 0.63 for integrated formats (Schroeder & Cenkci 2018); worked examples beat problem solving for
> novices and reverse with expertise. → No decorative animation while the child thinks; text budget
> 5-6 = zero on the play screen…

`_src-learning-science.md:71` (the design rule the finding compiles to) —
> 1. **No decorative animation while the child is thinking.** Motion is reserved for (a) showing the
> mechanism (counters moving into a ten-frame) and (b) feedback after an answer. Background
> animation, **idle characters**, particles are seductive details.

Note that the source rule already names *idle characters* as seductive details by name. So the
question is live and the current doctrine is against a moving character on its face.

### 1.2 The answer: it flips on relevance, and relevance is definitional, not rhetorical

A seductive detail is defined in that literature as material that is **interesting but irrelevant** —
irrelevance is part of the construct, not a judgement about it. Material that carries information the
learner must process is not a seductive detail at all; it is intrinsic load (the element
interactivity of the material) or the working-memory devoted to it. So a moving character is
extraneous **iff its motion carries no information the child must use.**

That is the whole answer, and it has a clean mechanical form: **the character's position must be a
variable in the problem.** Not a token that visits the problem — a *term* in it.

But F-42 has a second half that the pivot must not sleep through, and it is the larger number:
**split attention, g = 0.63 for integrated formats.** A world screen plus a problem panel is a
split-attention format *by construction* — the mission lives on the map, the maths lives in the
panel, and the child must hold one while reading the other. **The hub-and-spoke overworld is exactly
this, and it is the shape most people reach for first.** The project's own prior-art dissection
condemns it twice, in the fetched reviews:

- `_src-demand.md:405` (Prodigy, the "poorly-regarded" table) — *"Children don't see how math matters
  in their character's life"*; parents: child *"spends more time exploring it than doing the actual
  maths"*.
- `_src-demand.md:392` (Teach Your Monster, in the **well-regarded** table) — *"mostly yes (blend the
  sounds to open the gate); **some travel/dress-up filler**"*, and CSM: the app *"may be distracting"*
  due to backstory.

TYMTR is the closest existing product to what the operator is describing, and even its favourable
review names travel as filler. That is the failure mode to design against by name.

### 1.3 The rule, mechanically enforceable on 200 designs

**THE F-42 GATE — five checks. All five must pass. Four are scriptable.**

| # | Check | How it is measured | Fails when |
|---|---|---|---|
| **F1** | **Freeze.** Nothing is mid-animation while a choice is open, except an object the child is currently touching. | Screenshot at the moment tiles enable; already gradeable as ART-BIBLE §8 rubric item 6 ("Nothing decorative moves while a choice is open"). `qa-game` already takes this shot. | any idle bob, ambient scenery motion, a companion animating, a character walking while the child deliberates |
| **F2** | **Displacement.** The answer must be computable *only* from the character's position: `answer = f(character.position)`. | Read the source. If the commit handler reads a tile id, a keypad buffer or a selection index instead of a position, the character is decoration. | the child taps an answer tile and *then* the character walks there |
| **F3** | **Co-location (split attention).** The quantity being reasoned about and the place the character stands render in the same 720×560 frame, one saccade apart. No map screen, no scene transition mid-item, no scroll, no camera pan during deliberation. | static: assert one Phaser scene per item and zero camera tweens between item-start and commit | a world map that opens a mini-game; a panel that slides over the world |
| **F4** | **Single world.** Zero screens exist whose only purpose is navigation. | count scenes; Boot / Play / Finish only | a hub |
| **F5** | **Instant-cut (Test C, §0.2).** Patch every traversal tween to duration 0; the session must play identically. | scripted patch + `qa-game` diff of the item log | the game only "works" because the walk fills time |

**And a sixth for the youngest band, because F-42's other half is the text budget:** a mission implies
a premise, and a premise is words. At 5-6 the budget is **zero words on the play screen**
(`FINDINGS.md:153`, A-12: *"a spec may not rely on any instruction sentence"*). So at 5-6 the mission
must be **legible as a single still frame showing a lack** — an empty bowl, an unlit lamp, a gap in a
bridge — never a told story. See §4.

**One honest caveat on the magnitude.** F-42 is graded "★★★ direction, ★★ magnitude at 5-9", and the
source is explicit: *"Most CLT studies use adolescents/adults; the direction is consistent but effect
sizes for 5-9 are not established. Working-memory capacity is smallest in this band, so extraneous
load bites harder, not softer."* The uncertainty is asymmetric **downward** for the 5-6 band. Do not
read "★★ magnitude" as licence.

---

## 2 · Finding-by-finding audit

Verdicts: **COMPATIBLE** / **NEEDS-A-RULE** / **GENUINE CONFLICT**.

### F-40 — cued recognition + immediate feedback · **NEEDS-A-RULE**
> *"Preschoolers (3-6) only show a testing effect with two ingredients: cued recall (not free recall)
> AND immediate feedback… Cued recall + immediate feedback: **89.1% vs 41.8%**"* — `_src-learning-science.md:19`

The 47-point gain is the load-bearing number for the whole 5-6 catalogue, and a mission threatens it
in one specific way: **it puts a traversal between the answer and the feedback.** "Choose → walk two
seconds → find out" inserts a delay into the exact mechanism the effect depends on, and the source
adds that immediate feedback is the right default for this band on procedural tasks.

**Rule:** the walk may be the *commitment*, or it may be the *celebration*, but it may never sit
between the commitment and the truth. Feedback within ~300 ms of the commit, measured. A second
hazard: in a world the cue can degrade into "go find the thing", which is free recall of a location
plus a search — the condition that produced *no effect at all* (43.5% vs 44.5%). The cue must be on
screen at the moment of the answer.

### F-41 — expanding re-queue of misses · **GENUINE CONFLICT** (the sharpest one)
> *"A missed item re-enters the queue after 1 intervening item, then 2-3, then 5-7; a 'last look'
> near the end; never the same item back-to-back"* — `FINDINGS.md:151`, and
> `_src-learning-science.md:47`: *"Do not repeat the same item back-to-back after a correction (that
> is massed; the retrieval is trivial)."*

The operator asked exactly the right question. An item queue is a **permutation with repetition** —
item 7 may occupy positions 3, 5, 9, 16. A world is made of **places**, and places have persistence
and topology. Three collisions:

1. **Narrative incoherence.** If items are places, revisiting a place the child already fixed is
   incoherent — the bridge is built; why is it broken again? A 6-year-old notices. You either break
   the fiction or break the schedule.
2. **The child controls the order.** Free navigation destroys the expanding lag entirely: the child
   can revisit immediately (massed — explicitly the thing to avoid) or never.
3. **The "last look"** requires bringing a specific item back at a specific late position. On a map
   that means marching the child back across the world.

**The only resolvable form: the world is a CONVEYOR, not a MAP.** The child moves forward along a
path; items arrive in the order the queue dictates; a re-queued item appears as **the same kind of
obstacle in a new place**, never the same place again. **Items are EVENTS, not LOCATIONS.**

This is a hard constraint and it kills the map-with-pins design. It also means **the child does not
get free roaming.** "The character moves around" must mean *along a journey*, not *around an open
world*. If the operator wants free navigation, F-41 is lost — that should be a knowing decision, not
a discovery in month three.

### F-43 — elaborated feedback · **NEEDS-A-RULE, and it contains the pivot's biggest risk**
> *"elaborated feedback ≫ correct-answer ≫ right/wrong only. **EF 0.49 · KCR 0.32 · KR 0.05**…
> **38% of feedback interventions in Kluger & DeNisi 1996 decreased performance — those that drew
> attention to the self**"* — `FINDINGS.md:155`

**(i) The correction gets squeezed.** Measured on the two built games: an enacted correction holds
the tiles disabled for **2.9–8.3 seconds** (`BUILD-LOG.md`). In a mission, that is 8 seconds of the
story standing still, and the pressure to shorten it will be constant. Shortening EF to KCR is a
0.49 → 0.32 trade; to KR it is 0.49 → **0.05**, a tenfold loss on the effect that carries the whole
catalogue. It will happen silently, because no gate measures correction length.
**Rule: the correction freezes the world** — nothing in the mission advances while it plays — and a
gate asserts a per-game minimum correction duration that may not fall below the pre-pivot spec's.

**(ii) The avatar problem — the single biggest pedagogical risk in the pivot.** In an itemised game a
wrong answer changes the *object*:
> *"An error changes the object, never the child's status: the piece bounces back, the counter
> un-fills, the wrong card gently returns."* — `_src-learning-science.md:173`, F-47

**In a mission, a wrong answer changes what happens to the character the child identifies with** —
they don't get across, the friend stays hungry, the lamp stays dark *and the character is standing
next to it*. That is Kluger & DeNisi's "attention drawn to the self" category, wearing a costume. The
research base already carries a live instance of exactly this failure and flags it as such:

> **F-75 · A punitive animation can sit inside an otherwise good design (H).** Shark Numbers (ICT
> Games) is loved and its wrong-answer shark bite is exactly the failure aversion the brief bans —
> the counter-example that "good site" ≠ "good feedback". — `FINDINGS.md:207`

The catalogue today has **zero** instances of avatar-consequence feedback (linted: *"No spec has a
timer, a life, a game-over, a red cross or a buzzer"* — FINAL-REPORT). A mission layer reintroduces
it by default, because that is what missions are for.

**And here is the tension I will not paper over:** if the character can never fail, be hurt, be
denied or look sad, the mission has no stakes — and stakes are what the operator is asking for. This
is irreducible. The only resolution available inside this evidence base is **stakes without loss:**
the goal is *not yet reached*, never *lost*; progress is monotone; the bridge has a gap, not a
collapse; the character's expression stays "surprised-not-disapproving" (ART-BIBLE §8 rubric 14). If
that reads as insufficiently game-like to the operator, then the pivot and F-43/F-47 are in genuine
conflict and someone has to choose, in the open.

### F-46 — 80-90% first-try, three-step ladder · **NEEDS-A-RULE**
> *"attempt 1 unaided → attempt 2 with the targeted hint → attempt 3 with a demonstration the child
> completes; no attempt 4"* — `FINDINGS.md:161`

A mission makes failure **more visible** in one way and **less costly** in another.
*More visible:* the world remembers. An item vanishes; a world does not. Any persistent trace of
error — a shorter route, a dropped item, a helper who never joined, a patch of the map that stays
grey — is a running score of failure, banned twice over (F-44 "no points/stars"; F-47 "an error
changes the object, never the child's status").
*Less costly:* a mission offers an alternative "success" the child can pursue instead of thinking —
walking (see F-65).

**Rule: world state is a function of items COMPLETED, never of attempts TAKEN.** Two children who
finish the same mission must arrive at an identical world. Scriptable: run a session with zero errors
and a session with two errors per item; the final-frame render must be pixel-identical.

### F-48 — puzzle g = 0.63 vs other types 0.31 · **GENUINE CONFLICT — the most important number here**
> *"early-childhood GBL meta **g = 0.46** with **puzzle games 0.63 vs other types 0.31**"* —
> `FINDINGS.md:165`, source `_src-learning-science.md:184` (PMC11018941, 136 studies)

This is a **2× effect-size difference and it points against the pivot's direction of travel.** "Puzzle
games" (arrange, complete, match, build) is exactly what the 200 designs are — F-203 makes it
doctrine. "Other types" in these meta-analyses typically absorbs adventure, role-play and action,
which is the direction "a character moves around and completes missions" travels.

**I do not know that meta-analysis's game-type taxonomy, and the research base does not record it** —
FINDINGS.md carries the label and the numbers with no category list. **Before 200 designs are
committed, someone should read PMC11018941's taxonomy and determine which bucket a
character-completes-missions game falls into.** If it is "other", the pivot is buying a halving of
expected effect in exchange for engagement. That may still be the right business call — a game nobody
plays has an effect size of zero — but it should be made with the number in view, not around it.

**The mitigating reading, which I think is correct:** the pivot *as stated* keeps the puzzle
structure and changes only the input verb. P2 "tap source, tap destination" is still arrange/complete
whether the destination is a slot or a place. If the transformation preserves arrange / complete /
match / build and re-skins only the frame, the 0.63 bucket is retained. **If it adds traversal,
exploration, inventory and dialogue, it is not.** That is the line, and F5 (instant-cut) is how you
police it.

### F-49 — touch accuracy at 5-7 · **NEEDS-A-RULE; and yes, tap-to-move demands more precision**
> *"Tap and drag accuracy improve 3→6 and are still below adult at 6… NN/g: 3-5-year-olds need ≥ 2 cm
> targets and can drag only coarsely; 6-8 still find precise/long drags frustrating"* —
> `FINDINGS.md:167`

Direct answer to the operator's question: **yes, materially, in every natural implementation.** A tile
is a declared target of known size with a ≥12 px gap (BUILD-CONVENTIONS §3: 80×80 at 5-6, 56×56
above). A *place in a world* is a region of continuous space, and the natural implementations all
degrade:

- **Tap-anywhere-to-walk-there** — an unbounded continuous target. The child taps between two places
  and gets an ambiguous destination. There is no ≥80 px floor on "the gap between two meanings".
- **Drag the character** — a drag, banned below 6 (F-49; PATTERNS P5 *"Bands. 6-8, 8-9. **Never
  5-6***").
- **Virtual d-pad or arrow keys** — a second input primitive, violating F-68 (*"One reliable input
  primitive per game, tap-first… Check: every game completes with tap alone"*).

**The only safe form: destinations stay discrete declared tiles at the band floor with ≥12 px gaps;
the character walks to whichever tile was tapped.** That is P2 with a walk replacing the glide, and it
keeps every accessibility property intact. It also means **the world cannot be continuous space** — it
is a set of stations.

⚠ **A second-order hazard with a precedent already paid for.** BUILD-CONVENTIONS §3.1 records that a
container's hit area is offset by its display origin, that a centre-only click passes a displaced hit
box, and that on game 002 *"nothing was clickable in any game"* while every gate passed. **A moving
character makes hit areas travel**, which is a harder version of the same class. Any pivot that makes
targets move must extend `qa-game`'s POINTER/ALIGNMENT checks to sample a target **mid-traversal and
at rest**, or it is walking back into the defect class that already reached the operator.

### F-60 — readable without reading · **NEEDS-A-RULE; partly yes, with a hard limit**
> *"Check: mute the sound, hide the text — can a 5-year-old find the first move by tapping?"* —
> `FINDINGS.md:177`

What a 5-year-old **can** infer wordlessly from a single frame: a **lack** — an empty bowl, an unlit
lamp, a gap in a bridge, a creature reaching for something out of range. This is exactly how the good
prior art works (Endless Alphabet's grey outlines are self-evidently holes; DragonBox ships
*"deliberately no instructions"*).

What a 5-year-old **cannot** infer wordlessly: a multi-step goal, a deferred payoff, a *why*, an
ordering constraint, a rule about what is allowed. **The moment a mission has more than one clause it
needs narration — and there is no audio** (brief §2: *"No binary asset files, ever… no audio files"*;
sound is four Web-Audio tones) **and no text at 5-6.**

**Rule at 5-6: the mission is a single visible lack, restorable by exactly the target skill, and
completed inside one item.** "Fill the bowl" works. "Cross the forest, collect three keys, open the
gate" cannot be told and therefore cannot exist. Note how thin this margin already is: build 002
renamed itself because *"**numeral** was the only word among the 200 titles a five-year-old would need
explained"*, and the natural alternative title produced an obscenity in Finnish. Mission framing
multiplies that surface by 11 locales.

### F-61 — invalid moves refused, not punished · **COMPATIBLE, with a rule**
> *"Check: the number of ways a session can end other than finishing must be zero."* — `FINDINGS.md:179`

A world adds one new way to be stuck that an item game does not have: **the child walks somewhere with
nothing to do and cannot work out how to get back.** That is not a loss state but it is a session that
ends by abandonment, which is the same outcome. **Rule: from every reachable state, the next required
action is visible on the current screen.** No dead ends, no backtracking, no state whose correct move
is off-screen.

### F-63 — the learning object is the game object · **COMPATIBLE; the pivot strengthens it**
> *"Check: delete the question; nothing playable should survive."* — `FINDINGS.md:183`

Compatible, and F-212 already anticipates the pivot: *"Match the appeal of answer-then-arcade with a
character and a goal that IS the task… the character's need is satisfied by the mathematics itself
(feed N fish, fill the ten-frame tank), never by a bolted-on chase."* **The catalogue already does
this** — 001 *"A fox waits beside an empty bowl"*, 004 *"A river needs exactly 10 stones"*, 008 *"A
frog sits on the first addend"*. The operator's complaint is therefore **not** that the games lack a
character or a goal; it is that they lack **agency and spatial consequence**. Worth saying plainly,
because it narrows what has to change. See §0.2 for why the mission-deletion test needs Test C beside
it.

### F-65 — brute-force cannot win · **GENUINE CONFLICT unless designed against**
> *"Komodo let a child press every button until one worked (Mumsnet). Check: after a wrong tap the
> item re-presents with a hint and counts as retried"* — `FINDINGS.md:187`

Direct answer: **yes, a child can brute-force by walking, and it is worse than tapping**, because the
exploration is *itself rewarding* — which is precisely the Prodigy diagnosis (*"spends more time
exploring it than doing the actual maths"*). Two structural problems:

1. **The existing guard stops working.** PATTERNS P1's brute-force guard is *"After each wrong tap the
   remaining tiles re-shuffle position"*. **You cannot re-shuffle places in a world** — a place that
   moves is not a place. That guard covers **41 games (21% of the catalogue)** and the pivot deletes
   it.
2. **BUILD-CONVENTIONS §13 becomes unenforceable.** *"Two consecutive items never share the same
   correct tile position."* Positions in a persistent world are stable by definition, so a child can
   learn "it's usually the far one" — a positional cue a shuffled tile grid never gives them.

**Replacement guard required: the commitment is a one-way door.** The child chooses; the choice
enacts; the correction runs; the item is marked retried. Walking back does not un-choose. Plus the
conveyor rule from F-41: no free navigation between undertaken items. And a replacement for §13:
vary which *kind* of station carries the answer, since you can no longer vary where it is.

### F-69 — ≤10 interactive elements · **GENUINE CONFLICT, mechanically**
> *"Hit the Button's whole screen is 8-10 large buttons; Endless shows one word… Check: ≤ 10
> interactive elements on screen."* — `FINDINGS.md:195`

A world screen naturally carries the character + N destinations + the apparatus + the answer choices +
chrome. A 3-choice item with a character, three stations and a Check tile is already **8**. Two hard
rules:

- The count stays ≤10 **including the character and every destination**. Budget it explicitly per
  spec.
- **Every non-interactive scene element must be distinguishable from an interactive one by a rule the
  child learns in one item** (e.g. everything interactive sits on a `surface` tile with a `line`
  stroke; scenery never does). Otherwise the world adds *visual search*, which is extraneous by
  definition. ART-BIBLE §8 rubric 13 already fights this — *"Scenery is a wash; no scene element
  competes with a tile"* — and a traversable world puts it under real pressure.

⚠ **And the budget nobody is counting: lines.** Brief §2 caps a game at 400–800 lines; specs estimate
380–540. A world adds a movement system, a station graph, a persistent layout and traversal state. On
the two games built so far the ensemble spent its budget on the correction ladder. **The risk is that
world code crowds out misconception code, because misconception code is the invisible part.** See
§3.2.

### F-71 — adaptive practice visible as "more of that" · **COMPATIBLE; the pivot helps**
> *"TYMTR increases practice where the child struggles… Bad: Duolingo ABC forces 127 sequential
> units"* — `FINDINGS.md:199`

A mission is a genuinely better renderer of adaptation than a silent difficulty step: "the river needs
more stones" is non-punitive and legible. **But:** adaptive item counts collide with a fixed mission
length. If the mission is "cross the river" and crossing takes 8 stones, the game cannot give extra
practice without lengthening the river — which visibly marks the struggling child as slower.
**Rule: mission length is fixed in ITEMS, and no world element may display remaining distance in a way
that changes with performance.** The dot rail already does this correctly. A visible path with a
visible end *is* a progress bar; if it stretches, it is a shaming device.

### Additional findings the pivot puts at risk (not in the operator's list)

| Finding | Quote | Verdict |
|---|---|---|
| **F-44 / F-206** — no points, stars, badges, unlockables | *"Deci, Koestner & Ryan 1999: d = −0.40/−0.36/−0.28 … worse for children"*; *"No points, stars, coins, badges or unlockables for engagement/completion; progress = the task completing"* (`FINDINGS.md:157`) | **HIGH RISK — the most likely accidental violation.** "Complete missions" carries collectibles as a genre convention: keys, stars, a map that fills in, a character that levels. The catalogue passes this cleanly today. **Rule: the only thing a completed item may produce is the world-state the maths itself created.** Nothing collectible unless it IS the learning object — F-66's one licensed form (*"TYMTR's 'trickies' are the sight words"*). |
| **F-45 / F-207** — no timers, no opponent that can win | *"a second character is a partner, never a rival that can finish first"* (`FINDINGS.md:159`) | **NEEDS-A-RULE.** Missions attract chases, "get there before…", companions who race ahead. **No NPC may move without the child's action; no world event may be scheduled on a clock.** |
| **F-72 / F-214** — natural end in minutes; single file, no cross-session state | *"Games cannot store cross-session state reliably (iframe, no account)"* (`_src-learning-science.md:50`) | **NEEDS-A-RULE, and it is a concrete trap.** A world invites a fiction of persistence — a base being built, a map filling in — that the architecture cannot deliver. A 6-year-old who loses their base is being punished by the storage model. **Build no world whose fiction implies it should be remembered between sessions.** |
| **F-73 / F-211** — culturally portable; §17 locale completeness | *"no coin, unit, holiday or English-only word list in the base game"* (`FINDINGS.md:203`) | **NEEDS-A-RULE.** The catalogue is portable largely *because* it has almost no narrative. Missions add story premises, and BUILD-CONVENTIONS §17 requires all 11 locales natively authored. **Every mission clause is 11 native authorings**, on a 5-6 text budget of zero. |
| **F-50 / F-203** — mirror the physical manipulative exactly | *"the on-screen object mirrors it exactly, including its conventions (ten-frame fills top row left→right)"* (`_src-learning-science.md:199`) | **NEEDS-A-RULE + a geometric constraint — see §2.1 below.** |

### 2.1 · Which apparatus can become terrain, and which cannot

This is the practical fork, and it decides how much of the catalogue can be transformed at all. Zone
A is 204 px tall and zone B is 220 px on a 720×560 stage. **There is not room for both a traversable
world and a full-size manipulative.** Something gives, and it must not be the manipulative — F-50's
evidence is on the *representation*, not on the frame.

The good resolution is available where the mapping is natural: **make the manipulative BE the
terrain.**

| Maps naturally to terrain (pivot is a genuine improvement) | Resists terrain (pivot damages the representation) |
|---|---|
| **Number line** → a road / river. 008 *Frog Hops* already does exactly this: *"A frog sits on the first addend… the child traces the hops through b lily pads."* | **Ten-frame** — its power is that a fixed 2×5 is read at a glance. A ten-frame you *walk along* stops being subitisable. |
| **Hundred square** → a field; skip-count trails | **Balance scale** — must be seen whole, both pans, simultaneously. Walking between pans is *literally* the split-attention format F-42 penalises. |
| **Array** → an orchard / tiled floor | **Clock face** — radial, must be whole; hands differ in length AND colour AND shape (F-113) |
| **P4 sequence, P7 path** — already journeys | **Comparison (F-103)** — the enacted correction is *pairing lines between two rows*; both rows must be in one view |
| **P8 sort into bins** — bins are already places | **P12 match pairs** — a board, not a place |
| **Position words** (123, 188) — the objective *is* spatial | **P11 keypad** — retrieval density is the point; see §4 |

**Triage rule: if the apparatus is in the right-hand column, the game is exempt from the world layer
and keeps its mission as a single-frame lack (the 001 shape).** Forcing terrain onto a ten-frame or a
balance scale trades a ★★-evidenced representation for a frame with no evidence behind it at all.

---

## 3 · The genuine risk list

### 3.1 Where "hidden" becomes worse teaching — the struggling child pays first

Two independent threads converge, and both are already in this project's own sources.

**(a) The fiction is extra element interactivity, and it taxes the novice hardest.** The child must
now (1) hold the premise, (2) map it to a quantity, (3) operate on the quantity, (4) map back. That
is three extra operations for the child with the least working memory. The evidence direction is not
in doubt — it is the expertise-reversal literature the file already cites:
> *"Worked examples beat problem solving for novices; the advantage reverses with expertise…
> **d differences 0.45-2.99 between low/high prior knowledge**, 26 studies"* — `_src-learning-science.md:64`

and the age caveat:
> *"Working-memory capacity is smallest in this band, so extraneous load bites harder, not softer."*
> — `_src-learning-science.md:68`

**The child who most needs the game is the one the fiction taxes most.** A struggling child in a
mission spends scarce working memory on the story.

**(b) Cue specificity — the transfer problem.** Retrieval practice's benefit is *cued* (F-40). If the
practised cue is "the fox looks hungry" and the school cue is "3 + 4 =", the child has practised the
wrong association. **Rule: the retrieval cue in the game must be the same KIND of cue the child meets
in school** — a numeral, a symbol, a quantity, a word. The mission supplies the *reason to answer*; it
never replaces the *cue to retrieve from*.

001 gets this right today and shows what must be preserved: the numeral tiles are present, the
caption asks "How many?", and the total numeral is surfaced above the set
(`specs/001-feed-the-fox.md:26`). **A transformed version that replaced the numeral with "enough
berries for the fox" would teach the fox, not the number.**

### 3.2 Do the ~600-1000 misconception responses survive relocation? — the most expensive, least visible cost

001 carries **4** enumerated misconception responses, each a *choreography against a fixed layout*:
> *"the berries re-light one by one from the first, 350 ms apart, each showing its badge again with
> `tone("tap", k)`; the last badge plays `ANIM.lastBadge` and `ART.totalNumeral` pulses"* —
> `specs/001-feed-the-fox.md:29`

Across 200 specs at 3-5 each that is roughly **600-1000 enacted corrections**, and FINAL-REPORT
certifies them as a linted property: *"every spec's wrong-answer responses are per-misconception and
enacted on the object (F-43, F-47)."* Three ways a mission destroys them:

1. **Time** — 2.9-8.3 s each, measured; missions create constant pressure to shorten (§F-43(i)).
2. **Apparatus** — every correction is written against fixed coordinates (`ART.totalNumeral` at
   (392, 96)). Move the apparatus into terrain and **all 600-1000 are re-authored.** The gates check
   *layout*; **no gate checks whether a correction still diagnoses the error it names.** This is the
   part that will rot silently.
3. **Attention ownership** — if the story advances while the correction plays, the correction is not
   attended to.

**Rule: a transformed spec is not accepted unless its Common-misconceptions block is re-written
against the new apparatus, with a count ≥ the pre-pivot spec's, and each response still names a
distinct error.** Make the count a diffable number.

### 3.3 The avatar problem (restated, because it is the headline)

See §F-43(ii). A mission converts every error into a consequence for the character the child
identifies with — Kluger & DeNisi's self-level category, 38% of which *decreased* performance. The
catalogue has zero instances today. F-75 is the project's own recorded example of a punitive
animation surviving inside an otherwise-good design. **If one rule from this document is enforced,
make it this one:** the character is never hurt, never denied, never sad; an error changes the
apparatus; progress is monotone; stakes are "not yet", never "lost".

### 3.4 Endogenous vs exogenous fantasy — what I know, and what I am unsure of

**What I hold with confidence:**

- **Malone & Lepper (1987), "Making learning fun: A taxonomy of intrinsic motivations for learning."**
  The source of the *endogenous (intrinsic) vs exogenous (extrinsic) fantasy* distinction. Endogenous:
  the fantasy depends on the skill and the skill depends on the fantasy. Exogenous: the fantasy is a
  wrapper (the canonical bad example is arithmetic-as-hangman — the hanging has nothing to do with the
  operation). Malone's earlier (1981) work on *Darts* is the ur-example of the operator's thesis:
  guessing a fraction to place a dart on a number line is endogenous **because the answer IS a
  position.** "Moving is solving" is that idea, and it is well regarded and 40+ years old. This is the
  strongest single point in the pivot's favour.
- **Habgood & Ainsworth (2011), "Motivating children to learn effectively: exploring the value of
  intrinsic integration in educational games", *Journal of the Learning Sciences*.** The key empirical
  test. They built *Zombie Division*, in which the learning content (division by 2/3/4/5) is carried
  by the core mechanic — you defeat a skeleton by striking it with the weapon matching a divisor of
  the number on its chest — and compared it against an extrinsic version delivering identical content
  *between* play. The direction of the results: the intrinsically integrated version produced better
  learning, and a **much** larger effect on free-choice time on task (children given a free choice
  spent very substantially longer with the integrated version). Habgood's construct has two limbs:
  the content is delivered through the parts of the game that are most fun, and the game **embodies**
  the content in the representation of its world.

**What I am unsure of and would not let anyone quote from me:**

- The exact effect sizes and Ns in Habgood & Ainsworth. My recollection is that the sample was in the
  tens per condition, the children were upper-primary (**roughly 7-11, not 5-6**), the setting was
  school, and the **learning** effects were more modest and less consistent than the **preference /
  time-on-task** effects. I am reporting direction from memory, not from a fetched source.
- Whether the *Zombie Division* result replicates at 5-6. I have no reason to think it was tested
  there, and every developmental reason in §4 to doubt it transfers unchanged.
- The game-type taxonomy behind F-48's 0.63 / 0.31 split (see §F-48). This is the number most likely
  to be decisive and it is the one nobody in this project has looked at.

**And the caution that sits directly against the operator's stated goal:**
> *"Serious games vs conventional instruction: better learning and retention, **not more
> motivating**… learning d = 0.29, retention d = 0.36, **motivation d = 0.26 n.s.**"* — Wouters 2013,
> `_src-learning-science.md:182`, summarised in F-48

The operator's objective is "children want to play for the sake of playing." **That is the one outcome
this evidence base is weakest on.** It is not an argument against trying; it is an argument for
measuring it with children rather than asserting it from a design document.

### 3.5 A risk nobody has named: the pivot thins the prior-art fence

A-22 and `PRIOR-ART.md` record that ~35 catalogue rows were re-scoped specifically so a paid game
would not re-skin one of the 204 live free activities — and the stated differentiator was *"a
character goal that IS the task"* (CATALOGUE preamble). But the free activities are **already**
character-fronted: *"Wren's Question Window"*, *"Juniper's Story Lantern"*, *"Dot's Story Spine"*,
*"Bea's Two Bookshelves"*, *"Wake Up, Pip!"* (`PRIOR-ART.md:163-211`). If missions become the paid
games' differentiator, the differentiation is thinner than it looks. **Re-run
`_tools/check-redundancy.js` against the transformed designs, not the originals.**

---

## 4 · The age split — 64 / 98 / 38

### Band 5-6 (64 games) — a mission structure is *mostly* inappropriate as normally understood

Four developmental facts bear on this. I hold them with moderate-to-good confidence; **none is in the
research base**, which is itself worth noting.

1. **Working memory.** Around 4 items of digit span at 5; roughly 2-3 chunks in the focus of
   attention. A goal + a location + a quantity + a numeral is already at or past capacity before the
   maths starts.
2. **Narrative comprehension.** Children of 5 reliably follow *sequences* ("and then…"); the
   goal-plan-outcome story-grammar level — a protagonist's goal driving subordinate actions — is
   *emerging* at 5-6 and consolidating at 6-7 (Stein & Glenn's story-grammar tradition). Practically:
   **a 5-year-old will follow "the fox is hungry → give it berries" and will not hold "we must reach
   the mountain, and this bridge is one of five steps" across a six-minute session.**
3. **Means-end reasoning.** Multi-step subgoal chaining is fragile at 5 (2-move planning ~4-5, 3+ move
   ~6-7). **A mission with subgoals is the CONTENT for a 5-year-old, not the frame** — it consumes the
   attention the counting needs.
4. **Delay.** A payoff eight items away is a delay-of-gratification problem at 5. The payoff must be
   inside the item.

And it is the band with **zero text budget** (F-42, A-12) and **no audio** to narrate with.

**Verdict for 5-6: the mission must be ONE goal, ONE item deep, restated every item, legible as a
single still frame showing a lack, with the payoff inside the same item.** That is a **repeated
micro-mission**, not a journey — and it is *exactly what 001 already is*: hungry fox → count → berries
go into the bowl → fox eats → next item. Nothing is carried between items except the dot rail.

**Corollary:** at 5-6, "the character moves" must mean *the character moves AS the answer* (walks to
the tapped station, hops to the number). It must not mean *the child navigates* — navigation is a
means-end task and this band cannot spare it. **If the operator wants a journey at 5-6, that is the
place I would say the pivot is wrong.**

### Band 6-8 (98 games) — the pivot's home ground; pilot here

Goal-plan-outcome structure is available; a 2-3 stage mission is comprehensible; short sentences are
readable. This is where "moving is solving" is both defensible and most valuable, and it is half the
catalogue.

Binding constraint: the text budget is **≤ 8 English words** (F-42), which BUILD-CONVENTIONS §2 says
must be designed at 1.6× width for German and Finnish — call it ~5 words of usable premise. **A mission
premise fits in 8 words or it is a picture.**

### Band 8-9 (38 games) — permitted, with one important exemption

Two short sentences allowed; multi-stage goals fine. But this band is tables, division, fraction
notation and minute-level clock (F-26/27/28) — the most **notation-heavy** content, where §3.1's
don't-conceal-the-notation rule bites hardest.

And a specific exemption: F-2 says the demand here is for **retrieval fluency** (*"Mathsframe's
published most-popular list is ~40% multiplication; Topmarks' flagship Hit the Button…; Mumsnet
parents name TTRS and Hit the Button first"*). **A child who wants times-table practice does not want
a walk between questions** — inserting seconds between retrievals reduces retrieval density, which is
the entire value of the genre. **Recommend exempting the 9 P11 keypad games and the tables games
(010, 049, 050) from the world layer outright**, alongside the right-hand column of §2.1.

### Recommended band policy

| Band | Policy |
|---|---|
| **5-6** (64) | **Repeated micro-mission only.** One goal, one item deep, single-frame lack, payoff inside the item. No journey, no navigation, no subgoals, no carried state. |
| **6-8** (98) | **Staged journey permitted** — 2-3 stages, **conveyor not map**, premise ≤ 8 English words or a picture. **Pilot the pivot here.** |
| **8-9** (38) | Permitted, **except** high-density retrieval (P11 ×9, tables) and the §2.1 resists-terrain apparatus. |

---

## 5 · The sign-off checklist — what would make me certify a transformed design

Twenty items in eight groups. Each is checkable by a non-programmer or by a script; the scriptable
ones name the mechanism. **In this project's culture every gate is poison-tested before it is
trusted** (A-23, A-24) — each script below must be shown to FAIL on a synthetic violation *and* PASS
on a correct design, in both directions, before it is wired in. **Never move a threshold to make a
design pass; change what is measured** (A-23).

### A · The three deletion tests
1. **Delete the maths** — nothing playable survives. (F-63; existing.)
2. **Delete the mission** — nothing playable survives. (Operator's new test.)
3. ⭐ **Delete the WALKING** — patch every traversal tween to duration 0. **The session must play
   identically** (same item log, same reachable states, same finish). If it does, the walking was
   seconds, not solving. *Scriptable: `_tools/check-mission.js --instant-cut` + `qa-game` log diff.*

### B · Load (the F-42 gate — §1.3)
4. **Freeze.** Nothing mid-animation while a choice is open, except an object under the child's
   finger. *(ART-BIBLE §8 rubric 6, graded on the existing screenshot sweep.)*
5. **Displacement.** `answer = f(character.position)` — the commit handler reads a position, not a
   tile id. *If it reads a tile id and then animates a walk, REJECT: that is answer-then-arcade with a
   shorter arcade.*
6. **Co-location.** Apparatus and character in the same 720×560 frame, always. Zero scene transitions
   and zero camera tweens between item-start and commit. **Zero navigation-only screens.**
7. **Element budget.** ≤10 interactive elements **including the character and every station** (F-69);
   and every interactive element is distinguishable from scenery by a rule learnable in one item.
8. **Text budget unchanged.** 5-6: zero words on the play screen. 6-8: ≤8 English words *total*,
   including the mission premise. 8-9: ≤2 short sentences. *(F-42/F-204; already linted — do not let
   the mission buy an exemption.)*

### C · Retrieval integrity
9. **The walk never sits between the commit and the feedback.** Feedback within ~300 ms of
   commitment, measured. (F-40 — the 89.1% vs 41.8% mechanism.)
10. **The retrieval cue is the school cue.** A numeral, symbol, quantity or word is present at the
    moment of the answer. The mission gives the *reason*; it never replaces the *cue*. (§3.1b.)
11. **Conveyor, not map.** Items are EVENTS, not LOCATIONS. The expanding re-queue (1 → 2-3 → 5-7)
    and the last look are intact; a re-queued item returns as the same kind of obstacle in a **new**
    place; the child does not control item order. (F-41.)
12. **Brute force cannot win.** The commitment is a one-way door; walking back does not un-choose; an
    item solved after any wrong move never counts as first-try; and something varies per item to
    replace the now-impossible position shuffle (§13/F-65).

### D · Feedback integrity — the pedagogical core
13. ⭐⭐ **The character is never the consequence.** No fall, no denial, no sad face, no hurt, no
    "didn't make it". An error changes the **apparatus**. Progress is monotone: the goal is *not yet
    reached*, never *lost*. (F-43, F-47, F-75.) *Reviewer check: look at the wrong-answer screenshot —
    if the character's state changed, reject.*
14. **Misconception count did not fall.** The transformed spec enumerates **≥ as many distinct**
    misconception responses as the original, each still naming a distinct error and each re-written
    against the new apparatus. *Diffable number; make it a build-log field.*
15. **Correction duration did not fall.** Per-game enacted-correction duration ≥ the pre-pivot spec's.
    **The world freezes while a correction plays.** (F-43: EF 0.49 → KR 0.05 is the cost of getting
    this wrong.)
16. **World state is a function of items COMPLETED, not attempts TAKEN.** *Scriptable: a zero-error
    session and a two-errors-per-item session must produce a pixel-identical final frame.*

### E · Motivation hygiene
17. **No economy.** Nothing collectible, no keys, stars, badges, tokens, levelling, or a map that
    fills in — unless the collected thing IS the learning object (F-66's licensed form). The only
    thing an item may produce is the world-state the maths itself created. (F-44 d = −0.40, worse for
    children.)
18. **No clock, no rival.** No NPC moves without the child's action; no world event is scheduled on a
    timer; mission length is fixed in ITEMS and no world element shows a distance that changes with
    performance. (F-45, F-71.)
19. **No implied persistence.** The fiction must not promise anything the child would expect to find
    next session — there is no cross-session state. (F-214, `_src-learning-science.md:50`.)

### F · Accessibility (unchanged floors — the mission buys no exemption)
20. **Destinations are discrete declared tiles** at the band floor (80 px at 5-6, 56 px above) with
    ≥12 px gaps. **No tap-anywhere-to-walk. No character dragging below 6. No d-pad, ever** (F-68: one
    input primitive, tap-first). Keyboard reaches every station. **`qa-game`'s POINTER/ALIGNMENT
    checks must sample a moving target mid-traversal AND at rest** — hit areas that travel are a
    harder version of the §3.1 defect that already reached the operator.

### G · Band fit (§4)
21. 5-6: one goal, one item deep, single-frame lack, payoff inside the item, no navigation.
    6-8: ≤3 stages, conveyor. 8-9: exempt P11 and the tables games; exempt the §2.1
    resists-terrain apparatus.

### H · The one thing no checklist can replace
22. ⭐ **Build ONE game both ways and put it in front of children.** The catalogue is a 200-unit bet
    and two games exist. Building 003 (or better, a 6-8 game — the pivot's home band) in a
    transformed and an untransformed version costs one build and settles more than any argument in
    this document. The instrumentation intent already exists — FINAL-REPORT risk 5: *"the adaptive
    rules are design choices, not measured… the first ten builds should log first-try rates to check
    the band."* Log **first-try rate, time-to-first-action, items completed, and free-choice replay**,
    which is the measure Habgood found the largest effect on and the one the operator actually cares
    about.

---

## 6 · Where I think the pivot is wrong, stated plainly

Three named claims, for the record.

1. **A journey at 5-6 is wrong.** 64 games. Goal-plan-outcome comprehension, means-end planning and
   working memory are all against it, the text budget is zero and there is no audio to narrate with.
   The correct 5-6 form is a repeated one-item micro-mission, which 001 already is. If the pivot
   forces journeys into this band it will make 32% of the catalogue worse, and the harm will be
   invisible because the games will look better.

2. **"Hidden inside the play" is wrong as written.** Concealment costs the struggling child most
   (expertise reversal, d differences 0.45-2.99) and breaks cue-specific transfer. The right word is
   *integrated*. Keep the notation on screen.

3. **Free navigation is wrong everywhere.** It breaks F-41's re-queue, hands the child a rewarding
   brute-force route (F-65, the Prodigy diagnosis), makes §13 unenforceable and blows the F-69 element
   budget. Conveyor, not map — and if the operator specifically wants roaming, that is a deliberate
   trade of the spacing schedule, which should be decided out loud.

**And one place I think the pivot is clearly right:** the character-as-position idea is Malone's
*Darts*, and 008 *Frog Hops* is already built on it — *"A frog sits on the first addend (covered,
numeral only); the child traces the hops through b lily pads; the landing pad is the answer."* That is
"moving is solving" in the existing catalogue, unretouched, and it is the template. **Transform toward
008. Do not transform toward a map.**
