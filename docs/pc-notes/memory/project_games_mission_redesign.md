---
name: project-games-mission-redesign
description: "The 200 K-3 game designs are being redesigned from activities into mission games — the law, the frames, the waves, and the gates that enforce it"
metadata: 
  node_type: memory
  type: project
  originSessionId: 934e7c4a-dfea-4f44-802a-f61be1b76850
  modified: 2026-09-06T13:47:00.476Z
---

# The 200 games become games (2026-09-06)

**Operator ruling:** *"The games you designed are just activities… The game has to have a mission or
purpose. The kids need to be involved in the mission by making the character do something while on
the way solving math problems… The character should not be static, it needs to move around and
complete missions… kids want to play it for the sake of playing and completing something rather than
for the sake of training their skills."* → **"You should redesign all 200 games."**

He rejected a clarifying question and told me to get on with all 200. No pilot gate.

## He was right, and it was measurable

- **183 of 200 specs say "the child taps."** One says "mission". One says "journey".
- **182 of 203 specs declare an animal mascot, and ~110 of those are a `{y:"-=14", yoyo:true}` bobber
  that returns to its own coordinate.** Only **13** let a living body travel as the input.
- Root cause was architectural, not per-spec: `PATTERNS.md` was titled *"the twelve ways a child can
  act"* when P1-P12 are twelve ways to **touch the screen**, and `BUILD-CONVENTIONS.md` §7 drew a
  worksheet (zone A "the thing to think about" over zone B "the tiles the child acts on").
  **Nothing in the design system ever asked what the child was trying to DO.**
- ⭐⭐ **It was already a written requirement.** F-11: answer-then-arcade sells on *"motion, a goal, a
  character"* and that appeal *"must be matched by other means"*. F-212: *"a character and a goal
  that IS the task"*. F-44: progress should be *"the task completing (tower built, path filled)"* —
  and BUILD-CONVENTIONS then mandated a rail of dots. **The corpus satisfied F-63 and skipped F-212.**

## The law (`games/design/GAME-DESIGN-LAW.md` + `games/design/MISSIONS.md`)

- **Moving is solving** — the character's action is isomorphic to the cognitive operation.
  **frame = the game · pattern = the finger.** `pattern` is no longer invariant.
- ⭐ **THREE deletion tests.** Delete the maths (F-63) · delete the mission · **delete the WALKING**
  (patch traversal tweens to `duration:0` — the session must NOT play identically). The third is the
  one that matters: **001's fox already passes the delete-the-mission test** while contributing
  nothing the operator asked for.
- ⭐ **Displacement:** `answer = f(character.position)`. A commit that reads a tile id and *then*
  animates a walk is answer-then-arcade with a shorter arcade. (The engine architect's own first
  `makeStop` design was rejected by this rule — it does real work.)
- ⭐ **The journey is ALONG the apparatus, not between places.** The trail IS the number line. A world
  map plus a problem panel is a split-attention format (g = 0.63 against you) and is banned.
- ⭐ **Journey is a property of the ARRANGEMENT, not the animation.** A photograph of a hiker reads as
  a journey. The bobbing mascots fail because they have **nowhere to be**, not because they are
  under-animated — which is what makes this affordable at 5-6 on a fixed non-scrolling stage.
- **RATCHET RULE:** nothing in the world may ever decay. **The character is NEVER the consequence** —
  an error changes the apparatus, never the creature.
- 14 frames, grouped by *what the child's knowledge controls*; all 11 used patterns have a
  movement-native home.

## Three corrections the adversarial pedagogy review forced

1. **"Hidden" → "integrated, never concealed."** Concealment becomes a word problem: harder for 5-8,
   and niche demand (F-6, 4/15 sources). The notation must be visible at the moment of the answer.
2. **The ~949 enacted corrections are NOT "carried across untouched"** while the ART/ANIM registries
   they are choreographed against are rewritten — both cannot be true. Diagnosis invariant,
   choreography re-authored, count and duration may never fall.
3. **Band 5-6 (64 games) gets a repeated micro-mission, never a journey.** No navigation, no
   subgoals, no carried state. **All 200 are redesigned; not all 200 get travel** — the 9 P11 keypad
   games and tables 010/049/050 are exempt on retrieval-density grounds (F-2).

## Waves — `games/design/REDESIGN-LOG.md` carries `NEXT:`

Ten waves grouped by objective family, **ordered by risk**. W01 = m-place-value (pure 6-8/8-9, the
pivot's home ground); **l-phonological is LAST** — it is the riskiest wave in the corpus (mostly 5-6,
locale-bound, no audio, sound boxes resist terrain; 55 of 66 literacy rows have no physical referent).
Per game: design → author → adversarial verify, run as a `Workflow` pipeline.

## Gates (each poison-tested both ways)

- **`_tools/check-mission.js`** — frame validity, single state, isomorphism, no dot rail on the play
  surface, RATCHET, character-not-consequence, and **misconception counts diffed against the
  committed original read out of git**. Refuses to pass vacuously (exit 2), per `check-pools`.
- **`qa-game` PLAY-TARGETS** — closed a hole present since the gate was written: **TARGETS runs
  before `start()`, so no play-surface control had ever been measured, and `targets.length === 0`
  was a PASS.**
- `lint-specs.js` — conditional frame schema, so the not-yet-redesigned specs keep passing.

## ⚠ Lessons bought here

- ⭐⭐ **A `Math.max()` in a gate MASKS the loss it exists to catch.** My misconception check returned
  `max(responses, numbered)`; deleting an enacted "Response:" left the numbered list intact, so it
  reported "5 → 5" and would have passed a spec that had just dropped a correction. **Two different
  promises must be counted separately.** Found by poison-testing my own gate.
- ⭐⭐ **Measure before you assert, even in your own approved plan.** The plan claimed pattern-collapse
  would break `check-redundancy`'s DUP-KEY. **Refuted in thirty seconds: all 200 `subject|topic|band`
  keys are already unique**, so `pattern` contributes nothing. The *other* half was real and
  measured — six shared mission words took DUP-OBJ pairs ≥0.60 from **2 to 13**; adding mission verbs
  to the stop-list holds it at 2.
- ⭐ **A gate can silently stop firing.** The frame regex required ALL CAPS, so `- Frame: The Climb`
  matched nothing and skipped every schema check. Now it fails loudly.
- ⭐ **Every ban needs a NEGATION guard.** A spec correctly promising *"the owl never falls, nothing
  ever collapses, no lantern is ever taken back"* would have been condemned for saying the right
  thing — the ban-too-wide trap, bought a fifth time.
- ⚠ Shell heredocs ate a large markdown document twice; use the Write tool for docs and write patch
  scripts to files. Git Bash `/tmp` is NOT Windows `%TEMP%` — node and python disagree about it.

## State at the 2026-09-06 session limit — **27 of 200 redesigned, 173 remain**

**`games/design/HANDOFF-REDESIGN.md` is the resume document.** W01 13/16 (036 038 178 left) · W02
14/18 (127 176 187 188 left) · W03 0/23. Cut off by the session limit mid-pipeline, not by any
quality decision — 57 agents died in flight. **Size the next wave to ~10-12 games and let it finish**;
three concurrent waves (57 games, ~100 agents) exhausted the limit with a third of the work done.

The pipeline is preserved in-repo at `games/_tools/redesign-wave.workflow.js` (it was session-scoped
and would have been lost), with `design/redesign-waves.json` + `design/redesign-catalogue.json`.

**19 of the 27 are clean; 7 carry defects** — the serious one is **123-position-hide-and-seek, whose
enacted misconception responses fell 5 → 1** (019 fell 5 → 4). The rest are dot rails left on the
play surface, undeclared ART keys, and emoji outside the Art registry (agents decorate prose with
⭐/⚠ and draw layout diagrams with ▪).

**Two decisions waiting:** `MISSIONS-v2-CANDIDATE.md` (a judge panel's 13-frame system) is **not
installed** — its frame names differ, so swapping it would orphan all 27 specs; and `CATALOGUE.md`
still holds the old titles, so the retitles are not live (the hub reads its title from there).

## Open beyond the redesign

Engine (`_lib/mission-core.js`) designed but not built — and it is load-bearing, because
`check-build` caps a game at 1200 non-art lines and the two shipped games are already at 1107 and
1238. `001` and `002` are activities by the new law and must be rebuilt so no later game inherits the
worksheet shape.
