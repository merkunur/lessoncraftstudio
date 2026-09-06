# GAME DESIGN LAW — the ruling that turns 200 activities into games

Version 1.0 — 2026-09-06. Binding on all 200 redesigns and every build that follows.
Companions: `MISSIONS.md` (the fourteen frames), `catalogue/PATTERNS.md` (amended — now the INPUT
contract), `catalogue/BUILD-CONVENTIONS.md`, `research/FINDINGS.md`, `../ART-BIBLE.md`.

## 1 · The ruling

> *"The games you designed are just activities. The purpose of the educational game is to let the kid
> have fun while training the skills. The game has to have a mission or purpose. The kids need to be
> involved in the mission by making the character do something while on the way solving math problems
> or training skills… The character should not be static, it needs to move around and complete
> missions. The game has to be engaging and fun so that kids want to play it for the sake of playing
> and completing something rather than for the sake of training their skills."*
>
> — Operator, 2026-09-06, followed by: *"You should redesign all 200 games."*

**He is right, and it is measurable.** 183 of the 200 specs say *"the child taps"*. One says "mission".
One says "journey". None of the twelve patterns names a goal. 182 of 203 specs declare an animal mascot
and **about 110 of those mascots are a `{ y: "-=14", yoyo: true }` bobber that returns to its own
coordinate**. Only **13** specs let a living body travel as the input.

**This is not a new direction. It is an unimplemented requirement.**

> **F-11** — answer-then-arcade games sell because of *"motion, a goal, a character"*, and that appeal
> *"must be matched by other means since the mechanic is banned (F-63)"*.
> **F-212** — *"Match the appeal of answer-then-arcade with a character and a goal that IS the task…
> the character's need is satisfied by the mathematics itself, never by a bolted-on chase."*
> **F-44** — progress should be *"the task completing (tower built, path filled)"* … and then
> `BUILD-CONVENTIONS` §6 mandates a rail of dots in every game.

The research named the exact three things the operator says are missing — **motion, a goal, a
character** — and numbered the requirement. Then 200 specs were written that satisfy F-63 and ignore
F-212. Even F-212's own examples ("feed N fish") are static: it captured *goal* and *character* and
dropped **motion**, the half F-11 names first.

## 2 · The law

> ### MOVING IS SOLVING
> The character's action in the world is **isomorphic** to the cognitive operation. Not *solve, then
> move* — **moving is how you solve**. The child steers, and the steering is the maths.

### 2.1 The Single-State Law — the operational form

> A game has **one state variable `S`** carrying **two simultaneous readings**: a mathematical one and
> a physical one. The child manipulates the physical reading; the mathematics is what that manipulation
> means.

**The practical test, and it is one line of code:** if the correctness check compares a tap against a
stored `answer` field, it is a worksheet. If it asks whether **the world will accept the move**, it is
a game.

```
worksheet:  if (tapped === item.answer)            // a verdict handed down
game:       if (world.accepts(hero, destination))  // a fit, discovered
```

### 2.2 The three deletion tests — none may find anything playable

| | Test | Catches |
|---|---|---|
| **A** | Delete the **maths** — nothing playable may survive. | quiz-plus-arcade (F-63) |
| **B** | Delete the **mission** — nothing playable may survive. | mission-as-wallpaper |
| **C** | Delete the **walking** — patch every traversal tween to `duration: 0`. **The session must play identically.** | the walk as a seductive detail wearing a mission as an excuse |

**Test C is the one that matters, and it is why B alone is not enough.** Test B is passed trivially by
any decorative frame that is load-bearing for the finish screen — *001's fox already passes it* (delete
the fox and there is no bowl for the berries) while contributing none of what the operator asked for.

Tests A and B are enforced as a **mutation test** (`_tools/mutate-mission.js`): delete the hero and the
goal, and the game must **fail to complete an item**. Test C is a scripted tween patch plus a `qa-game`
item-log diff. Without mechanical enforcement the system degrades into theming within two builds.

### 2.3 ⭐ The Displacement rule — the sharpest single check

> **`answer = f(character.position)`.** The commit handler must read a **position**. If it reads a tile
> id, a keypad buffer or a selection index and *then* animates the character walking there, **REJECT
> the design** — that is answer-then-arcade with a shorter arcade.

This is precisely the failure a naive reading of the ruling produces, and it would pass every other
check in the suite.

### 2.4 ⭐ Journey is a property of the ARRANGEMENT, not the animation

A photograph of a hiker on a ridge reads as a journey; nothing in it is moving. **The 110 bobbing
mascots do not fail because they are under-animated — they fail because they are at a fixed coordinate
with nowhere to be.** Give a character a place it is going and a reason to be going there and it reads
as being on a mission in a still frame, at 400 px, with no motion at all.

This is what makes the law affordable at band 5-6, inside a fixed 720×560 stage, with no scrolling and
no spritesheets. **Travel time is not the goal. Somewhere to be is the goal.**

### 2.4a ⭐⭐ The journey is ALONG the apparatus, not BETWEEN places

The single most useful sentence in this document, and the corpus already contains the proof.

> **The trail IS the number line.** The hero travels *along the thing being learned*, never between a
> world screen and a problem screen.

`008 frog-hops` is Malone's *Darts* unretouched — *"the landing pad is the answer"* — and `020`'s snail
trail is the only progress in 200 specs that feels like it is going somewhere. Both move **on the
apparatus itself**.

This is also the rule that keeps F-42's larger half satisfied. The bigger risk was never the walking:
it is **split attention, g = 0.63**, and *a world map plus a problem panel is a split-attention format
by construction*. The repo's own sources condemn it twice — Prodigy *"spends more time exploring than
doing the maths"*, and even in the **well-regarded** column, Teach Your Monster to Read carries *"some
travel/dress-up filler"*. **A map that opens a mini-game is the banned shape.**

### 2.5 Integrated, never concealed

The operator's phrase is *"the training is rather hidden in the game"*. **Taken literally that is the
single biggest teaching risk in this programme, so we implement the intent rather than the word.**

Nothing in the intrinsic-integration literature advocates concealment — Malone's term is endogenous
*fantasy*, Habgood's is intrinsic *integration*, and both mean the content is delivered **through** the
most engaging part of the game, not that the child is unaware of it. Concealment has a specific failure
mode at this age: **it becomes a word problem**, reliably *harder* for 5-8s (the story adds
comprehension load; children mis-map the story onto the wrong operation), and rated niche by this
project's own demand research (**F-6:** word problems 4/15 sources).

> **Hard rule.** The abstract notation — numeral, symbol, ten-frame, equation, letter — is **visible in
> the same frame as the fiction at the moment of the answer.** The mission supplies the *reason*; it
> never replaces the *cue*.

What the operator is actually asking for, and what we deliver, is that the child is **never presented
with a test**. The maths is the steering, not a question printed on a card. That is achieved by
integration, not by hiding.

## 3 · What is invariant

Carried across every redesign untouched: **objective · band · prerequisites · curriculum links ·
11 locales**.

### 3.0 ⚠ The misconceptions are NOT "carried across untouched", and saying so was incoherent

An earlier draft of this document and of `REDESIGN-LOG.md` both claimed the ~949 enacted corrections
were carried across untouched **while simultaneously rewriting the ART and ANIM registries those
corrections are choreographed against.** Both cannot be true. The honest contract, which is stricter
rather than looser:

- **The diagnosis is invariant.** Every misconception the original spec names is still named, still
  distinct, and still gets its own response. **The count may never fall** (band floor 4) — a diffable
  number recorded per wave in `REDESIGN-LOG.md`.
- **The choreography is re-authored.** The correction is re-staged against the new apparatus, because
  the old one no longer exists. A correction that cannot be re-staged is **flagged, never dropped** —
  and a game that cannot re-stage its corrections has not earned its frame.
- **The teaching strength may never fall.** Per-game enacted-correction duration ≥ the pre-pivot
  spec's, and **the world freezes while a correction plays**. Elaborated feedback is EF 0.49 against
  KR 0.05; this is the most expensive thing in the corpus to break.

And the prohibitions — a mission is the most likely thing in this project's history to erode them:

- **No timer, no countdown, no clock, no lives, no game over, no losing state, no score, no points, no
  stars, no badges.** Exactly zero ways a session ends other than finishing. (brief §7/§9; F-44, F-45,
  F-64.)
- **Invalid moves are refused, not punished** (F-61) — a nudge, a bump, a plank that does not fit.
- **Success is certain** — the three-attempt ladder always ends with the item completed.
- **Tap only**, the tap floors (80 px at 5-6, 56 px at 6-9, ≥44 real), full keyboard operability,
  meaning never by colour alone, readable without reading, ~5-7 minutes.
- ⭐ **THE RATCHET RULE — nothing in the world may ever decay.** Every mark the child makes stays made.
  A wrong move never removes a previously earned piece of the goal. This is what generates stakes
  without a losing state: the tension is *not yet arrived*, never *falling back*.
- ⭐⭐ **The character is NEVER the consequence.** No fall, no denial, no sad face, no hurt, no "didn't
  make it". **An error changes the apparatus, never the creature.** *(Reviewer check: look at the
  wrong-answer screenshot — if the character's state changed, reject.)*

**Amended by this ruling:** `pattern` is no longer invariant (superseding `BUILD-WORKFLOW.md` §3).
**frame = the game · pattern = the finger.**

### 3.1 Losing states in costume — the banned list

A mission tempts every one of these and each is a losing state wearing a hat: the character *falls*,
*drowns*, *gets tired*, *runs out of* anything; a collected item is *dropped* or *taken back*; a built
thing *collapses*; a companion *leaves*; the goal *moves further away*; a path *closes behind you*; a
meter *empties*. None may ship.

## 4 · The band policy — a mission is not the same thing at five and at nine

Four developmental facts bear on band 5-6 and **none is in the research base**: working memory is ~4
digits at five with 2-3 chunks in the focus of attention (a goal + a location + a quantity + a numeral
is at capacity *before the maths starts*); goal-plan-outcome narrative comprehension is only *emerging*
at 5-6; multi-step subgoal chaining is fragile (2-move planning ~4-5, 3+ move ~6-7); and a payoff eight
items away is a delay-of-gratification problem. This is also the band with a **zero text budget** and no
audio to narrate with.

| Band | Games | Policy |
|---|---|---|
| **5-6** | 64 | **Repeated micro-mission only.** One goal, one item deep, restated every item, legible as a **single still frame showing a lack** — an empty bowl, an unlit lamp, a gap in a bridge. Payoff inside the same item. **No journey, no navigation, no subgoals, no carried state.** "The character moves" means *the character moves AS the answer*; it must **not** mean *the child navigates*, because navigation is a means-end task this band cannot spare. §2.4 is what makes this still feel like a mission. |
| **6-8** | 98 | **Staged journey permitted** — 2-3 stages, **conveyor not map**. Premise **≤ 8 English words** (about 5 usable after the 1.6× German/Finnish allowance) or it is a picture. The pivot's home ground, and half the catalogue. |
| **8-9** | 38 | Permitted, **except** high-density retrieval. |

**The 8-9 exemption, and it is real.** F-2 records that demand in this band is *retrieval fluency* —
Mathsframe's most-popular list is ~40% multiplication; parents name TTRS and Hit the Button first. **A
child who wants times-table practice does not want a walk between questions**; inserting seconds between
retrievals destroys retrieval density, which is the entire value of the genre. **The 9 P11 keypad games
and the tables games (010, 049, 050) are exempt from the world layer.** They still get a want, an
agentive character and a diegetic goal; they do not get travel.

> **What 001 is actually missing is not a journey — it is a WANT.** A hungry fox, an empty bowl, and a
> child who fills it. Adding the want is cheap and is most of the fix at 5-6.

### 4.1 ⚠ All 200 are REDESIGNED. Not all 200 get TRAVEL.

The operator ruled *"You should redesign all 200 games"*, and all 200 are redesigned. But the
adversarial pedagogy review identifies **at least 46 games exempt from the world layer on measured,
verified-disjoint grounds** — the 9 P11 keypad games and the tables games (retrieval density, §4
above), 18 P12 match-pairs boards, 13 P10 predict-and-reveal games, and 6 specs that already outgrew
the stage. Forcing travel onto these makes them worse, and *a bad mission is worse than a good
activity*.

**The resolution, and it satisfies both the ruling and the evidence:**

| Every one of the 200 gets | Not every one gets |
|---|---|
| a **want** — a visible lack the child resolves | a traversal |
| a character with **agency**, never a bobbing mascot | a route |
| a **goal on screen** whose distance visibly shrinks | a world to cross |
| **diegetic progress**, never a dot rail | stations |

An exempt game still fails all three deletion tests — its state variable is still single, still
physical, still manipulated rather than reported on. It simply expresses agency by *operating,
building or placing* rather than by walking. **What is banned everywhere, with no exemption, is the
static mascot at a fixed coordinate with nowhere to be.**

## 5 · The F-42 gate — how a moving character stops being a seductive detail

F-42 bans decorative motion while the child thinks (seductive details g = −0.33). A moving character is
on its face exactly that, so the rule separating germane from extraneous must be mechanical.

> **The resolution: motion is a CONSEQUENCE, never a COMPANION.** Play runs a strict two-beat cycle —
> **DECIDE** (the world is frozen, zero tweens running, the child is choosing) → **ACT** (≤1200 ms,
> always caused by a tap, then back to frozen). Nothing animates that the child did not just cause.

| # | Check | Fails when |
|---|---|---|
| **F1** | **Freeze.** Nothing mid-animation while a choice is open, except an object under the child's finger. | any idle bob, ambient scenery, a companion animating, the character walking while the child deliberates |
| **F2** | **Displacement** (§2.3) — `answer = f(character.position)`. | the commit handler reads a tile id and then animates a walk |
| **F3** | **Co-location.** Apparatus and character in the same 720×560 frame, one saccade apart; zero camera tweens between item-start and commit. | a world map that opens a mini-game; a panel sliding over the world |
| **F4** | **Single world.** Boot / Play / Finish only; zero screens whose sole purpose is navigation. | a hub |
| **F5** | **Instant-cut** (Test C). | the game only "works" because the walk fills time |
| **F6** | **Text budget unchanged** — 5-6 zero words, 6-8 ≤8 English words *including the premise*, 8-9 ≤2 short sentences. | the mission buys itself an exemption |

⚠ F-42 is graded *"★★★ direction, ★★ magnitude at 5-9"* and its source is explicit that most CLT
studies use adolescents and adults, while *"working-memory capacity is smallest in this band, so
extraneous load bites harder, not softer"*. **The uncertainty is asymmetric downward for 5-6. Do not
read ★★ as licence.**

### 5.1 Ruling on F-69 (≤10 interactive elements)

Spec 120 already ships **12** targets (an 11-key keypad plus OK), so the rule needs a reading or it
invalidates existing work. **Ruling: an instrument counts as ONE element; independent candidates count
individually.** A keypad, a dial or a stepper is one apparatus the child learns once. Four choice
tiles, four stations or four bins are four. The budget therefore counts *the character, every station,
and every candidate*, with each multi-key instrument as one.

## 6 · Retrieval and feedback integrity

- **The walk never sits between the commit and the feedback.** Feedback within ~300 ms of commitment,
  measured. (F-40.)
- **Conveyor, not map.** Items are EVENTS, not LOCATIONS. The expanding re-queue survives: a missed item
  returns as the same kind of obstacle in a **new** place, and the child never controls item order.
  (F-41.)
- ⚠ **Brute force cannot win — and the existing guard STOPS WORKING, for 41 games (21%).** `PATTERNS.md`
  P1 defends against guessing by re-shuffling the remaining tiles after each wrong tap. **In a
  persistent world the stations cannot move** — a door that jumps when you knock on it destroys the
  world's constancy, which is the thing that makes it a place. So every framed spec must declare a
  **named replacement guard**, and "the child could just try them all" is a rejection:
  commitment is a **one-way door** (walking back does not un-choose); an item solved after any wrong
  move never counts as first-try; and the *candidate set*, not the *positions*, varies per item.
  Where a frame genuinely cannot defend itself, that game keeps its tiles and does not take a frame.
- **Misconception count must not fall.** A transformed spec enumerates **≥ as many distinct**
  misconception responses as the original (band floor 4), each still naming a distinct error and each
  rewritten against the new apparatus. Recorded as a diffable number in `REDESIGN-LOG.md`.
- **Correction duration must not fall**, and **the world freezes while a correction plays**. Elaborated
  feedback is EF 0.49 against KR 0.05 — the most expensive thing in the corpus to break.

## 7 · Honest limits

- **The motivation claim is the weakest thing in the evidence base.** Wouters 2013: serious games give
  better learning (d = 0.29) and retention (d = 0.36) but **motivation d = 0.26, not significant**. The
  operator's goal — *"children want to play for the sake of playing"* — is exactly the outcome this
  literature does not support asserting. That is an argument for **measuring it with children**, not for
  abandoning it. Every wave ships to a local link for that reason.
- **Literacy is where this law is weakest.** 55 of the 66 literacy rows have no physical referent,
  against ~3% of maths and 0% of science. `MISSIONS.md` §8.2 carries a three-tier fallback, and a
  Tier-C spec must **declare** a weak isomorphism rather than hide it.
- **The prior-art fence is thinner than it looks.** ~35 catalogue rows were re-scoped so a paid game
  would not re-skin one of the 204 free activities, and the stated differentiator was *"a character goal
  that IS the task"* — but the free activities are **already character-fronted, and their characters are
  NAMED** ("Wren's Question Window", "Dot's Story Spine"). Missions alone do not differentiate.
  `check-redundancy.js` must be re-run **against the transformed designs**, not the originals.
- **Some apparatus resists becoming terrain.** Where a mission would be forced, the honest answer is a
  want and an agentive character without travel. **A bad mission is worse than a good activity.**
- **A supporting finding was dropped and should be restored.** Sailer & Homner 2020 is recorded in
  `_src-learning-science.md` as finding **game fiction** to be one of the two moderators that matter
  (g = 0.49 cognitive), but F-44 carries only the badges half. The evidence base currently reads as more
  hostile to this pivot than it is.
- **Nothing here has been built.** The fox passed every gate three times and was rejected on sight.
  The first framed build should be a transformation of 001 or 002, so the same content can be compared
  in both shapes.
