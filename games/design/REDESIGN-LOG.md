# REDESIGN LOG — turning the 200 specs from activities into games

NEXT: finish the W01/W02 stragglers (036 038 178 · 127 176 187 188), then W03 from the top.

**STATE 2026-09-06: 27 of 200 redesigned. 173 remain.** The session hit its limit mid-flight and
killed 57 in-progress agents; see the wave record below for exactly what landed and what did not.
**`HANDOFF-REDESIGN.md` is the resume document — read it first.**

**Trigger.** Operator ruling 2026-09-06: *"The games you designed are just activities… The game has
to have a mission or purpose. The kids need to be involved in the mission by making the character do
something while on the way solving math problems or training skills. Here the training is rather
hidden in the game. The character should not be static, it needs to move around and complete
missions… kids want to play it for the sake of playing and completing something rather than for the
sake of training their skills."* Followed by: *"You should redesign all 200 games."*

**Read before touching a spec:** `design/MISSIONS.md` (the frame system — the game layer),
`design/GAME-DESIGN-LAW.md` (the ruling and the two-deletion test), `catalogue/PATTERNS.md`
(amended 2026-09-06 — it is now the INPUT contract, not the game design), `ART-BIBLE.md`, and the
findings the spec cites.

## The law, in one line

> **Moving is solving.** The character's action in the world is isomorphic to the cognitive
> operation. Not *solve then move* — moving IS how you solve.

**The three deletion tests.** (A) Delete the maths → nothing playable may survive (F-63). (B) Delete
the mission → nothing playable may survive. A quiz-with-arcade passes B and fails A; the 200 specs as
written pass A and fail B. (C) The **instant cut** — a load audit, not the isomorphism proof; see
`GAME-DESIGN-LAW.md` §2.2a, which was **corrected mid-programme** after a designer found the first
version of its table said the opposite of the paragraph beneath it. The isomorphism is proved by the
**Displacement rule**: `answer = f(character.position)`.

## What is carried across untouched

objective · age band · prerequisites · curriculum links across the twelve systems · the content pools
where the maths still applies · 11 locales · no timer / no countdown / no lives / no game over / no
losing state / no score / no points / no badges · refusal-not-punishment · tap-only input and the tap
floors · `≤10` interactive elements · readable without reading · ~5-7 minutes.

**⚠ The misconceptions are the exception, and the honest contract is stricter than "untouched".** The
~949 enacted corrections cannot be carried across unchanged while the ART and ANIM registries they are
choreographed against are rewritten — both cannot be true. So: **the diagnosis is invariant** (every
misconception still named, still distinct, still answered; the count may never fall, band floor 4, and
it is a diffable number recorded per wave below); **the choreography is re-authored** against the new
apparatus; **the teaching strength may never fall** (correction duration ≥ the pre-pivot spec's, and
the world freezes while a correction plays). A correction that cannot be re-staged is **flagged, never
dropped** — and a game that cannot re-stage its corrections has not earned its frame.
See `GAME-DESIGN-LAW.md` §3.0.

## What is redesigned

title · character · world · mission · what the child physically does · layout · art · motion ·
progress (diegetic, never a dot rail) · finish state. **`pattern` is no longer a game's identity**
and is no longer invariant — it records only how the finger reaches the world.

## Spec schema

The twelve required headings keep their order (`_tools/lint-specs.js` checks only that the required
ones appear in sequence, so additions are legal) and every spec gains **`## Mission`** and
**`## World`** after `## Learning`. `## How it plays`, `## Screen layout`, `## Visual
specification`, `## Art registry`, `## Animation registry` and the movement parts of `## Rules` are
rewritten. `## Learning` is carried across intact.

## The waves

Grouped by **objective family, not by number** — redundancy risk lives between games that teach the
same thing, so a wave holding a whole family can differentiate inside itself.

**Ordered by risk, hardest last.** Band 6-8 is *"the pivot's home ground and half the catalogue"*, so
W01 is deliberately pure 6-8/8-9 place-value: strong physical referents, no band-5-6 games, and a
family that maps cleanly onto THE CLIMB / THE WORKS. Literacy-phonological is **last** because it is
the riskiest wave in the corpus — mostly 5-6, locale-bound, no audio to narrate with, and sound boxes
resist becoming terrain (`GAME-DESIGN-LAW.md` §7: 55 of 66 literacy rows have no physical referent).

| Wave | N | Bands | Families |
|---|---|---|---|
| W01 | 16 | 6-8:10 8-9:6 | m-place-value |
| W02 | 18 | 5-6:7 6-8:7 8-9:4 | m-shape-space |
| W03 | 23 | 6-8:17 8-9:6 | m-add-sub · m-multiply-divide |
| W04 | 24 | 5-6:12 6-8:12 | m-bonds · m-counting · m-compare-order |
| W05 | 24 | 5-6:3 6-8:13 8-9:8 | m-fractions · m-measure · m-money · m-time · m-data |
| W06 | 21 | 5-6:8 6-8:11 8-9:2 | m-pattern · s-matter · s-life-animals · s-life-plants |
| W07 | 23 | 5-6:12 6-8:8 8-9:3 | s-body-health · s-earth-weather · s-forces-energy · l-comprehension · l-word-reading |
| W08 | 18 | 5-6:3 6-8:9 8-9:6 | l-sentence |
| W09 | 14 | 5-6:10 6-8:2 8-9:2 | l-letter · l-other |
| W10 | 19 | 5-6:9 6-8:9 8-9:1 | l-phonological |

## Per-game pipeline

1. **Frame + mission** — pick the frame, invent the world, the character's job and the goal; state
   the isomorphism in one sentence.
2. **Pedagogical carry-over** — re-seat the objective, band and every misconception response inside
   the new mission. Anything that no longer has a home is **flagged, never silently dropped**.
3. **Spec authoring** — the full redesigned spec to the schema above.
4. **Adversarial verification** — the two-deletion test · the F-42 rule · no-punish/no-timer/
   no-losing · tap-only reachability · `≤10` interactive elements · 400-px legibility · redundancy
   against already-redesigned siblings. A failure returns the game to step 1.

## Entry format

```
## W<NN> — <families> — redesigned YYYY-MM-DD
- Games: <numbers>
- Frames used: <frame>×N …
- Retitled: NNN <old> → <new> (CATALOGUE.md row updated — the hub reads its title from there)
- Misconceptions with no home in the new mission: <none | list, with what was done>
- Gates: lint-specs PASS · check-redundancy 0 hard · two-deletion PASS n/n · F-42 PASS
- Notes / what this wave bought for the rest
```

## Built games needing rebuild

`002 numeral-nest` and `001 feed-the-fox` are shipped as activities and are the current style
reference for everything that follows. Both are rebuilt once their specs are redesigned, so that no
later game inherits the worksheet shape.

## Log

## Known open gate holes (carried, not forgotten)

- **ALIGNMENT and POINTER only ever inspect the Boot scene.** Both resolve the scene through
  `window.__startBtn.scene` and run before `start()`, so the two checks that exist *because* "a
  synthetic emit is not a tap" have never hit-tested a single **play-surface** control. This is the
  same class as the TARGETS hole fixed in `ecd863d6` (PLAY-TARGETS), and it is the gate that would
  have caught the operator's own defect #2 — *"I have to hover several times before buttons
  respond"*. Fix: resolve the ACTIVE scene (`game.scene.getScenes(true)`) instead of Boot's, and run
  the alignment pass a second time after the real click enters Play. Deferred deliberately: it is a
  refactor of a working gate and no redesigned game is built yet.
- **`window.__startBtn` is an undocumented harness contract.** It works only because a top-level
  `var` in a game's `<script>` becomes a window property; it is not in BUILD-CONVENTIONS §16. Any
  scene restructure breaks POINTER and ALIGNMENT with a message that reads like a game defect.
  `window.__phaserGameForQA` is referenced by the harness and set by nothing.
- **`check-pools.js` is shaped for one game.** It parses `{ id, n, d, lay }` rows and checks
  distractor legality and rank balance — properties of a three-tile static choice. It correctly
  **exits 2 rather than passing vacuously** when it parses nothing, which is the template every new
  content gate must copy, but a mission-shaped sibling does not exist yet.
- **Nothing in the suite reviews MOTION.** `art-sheet.js` proves the still frame, `qa-game` proves
  the file responds to a pointer, the critic reads still screenshots, and I read still renders. A
  game whose defects live in movement needs a fourth instrument.

## W01-W03 (partial) — m-place-value · m-shape-space · m-add-sub/m-multiply-divide — 2026-09-06

**27 of 57 attempted games redesigned.** The session limit killed 57 agents mid-pipeline, so the
waves are partial by interruption, not by rejection. Nothing that landed was rolled back.

| wave | families | done | remaining |
|---|---|---|---|
| W01 | m-place-value | **13 / 16** | 036 · 038 · 178 |
| W02 | m-shape-space | **14 / 18** | 127 · 176 · 187 · 188 |
| W03 | m-add-sub · m-multiply-divide | **0 / 23** | all 23 (designs were in flight when the limit hit) |

**Frames used:** THE CLIMB · THE CROSSING · THE OPENING · THE ROUNDS · THE SPAN · THE TENDING —
a genuine spread, no monoculture.

**Retitled (examples):** 120 *Bar Chart Reader* → **The Lantern Lift** (the keypad is the hoist; the
number you type is the altitude you go to, so reading the wrong bar means arriving at the wrong
house) · 005 *Shape Sorter* → **Mend the Harbour Wall** (*"a category is not a label on a box — it is
a shape of absence in the wall"*) · 035 → **The Water Stair** · 019 → **The Winter Door** ·
177 → **The Hundred Road** · 179 → **Signpost Mountain** · 041 → **Stepping Stones** ·
123 → **Found You!** · 126 → **Stone by Stone** · 125 → **Shadow Show**.
⚠ `CATALOGUE.md` rows have **not** been updated to the new titles yet — the hub reads its title from
there (the 002 precedent). That is outstanding work.

**Misconceptions — the number that matters.** Held or grew on 25 of 27. 184 *gained* one (6 → 7).
Two regressions, both caught by the gate and both outstanding:
`019` enacted 5 → 4, and **`123` enacted 5 → 1**, which is a serious loss and must be repaired
before that spec is built.

### Open defects in the 27 (the resume list)

| spec | defect |
|---|---|
| 009-balance-pans | ART-KEYS ×2 undeclared · dot rail still on the play surface |
| 019-read-the-rods | dot rail still on the play surface · **enacted responses 5 → 4** |
| 020-hundred-square-trail | ART-KEYS ×3 undeclared |
| 123-position-hide-and-seek | **enacted responses 5 → 1** |
| 132-order-three-numbers | EMOJI-REG ×4 (▪ in the layout diagram) · dot rail still on the play surface |
| 179-number-to-1000-line | ART-KEYS ×3 · EMOJI-REG ×4 |
| 180-expanded-form-cards | ART-KEYS ×1 · EMOJI-REG ×1 |

**19 of the 27 are clean.** Corpus-wide: `lint-specs` 21 failures (all inside those 7 specs),
`check-mission` 5 failures.

### What this wave bought

- ⭐⭐ **A design agent found a contradiction in `GAME-DESIGN-LAW.md` that I had written and shipped.**
  The Test C table said *"the session must play identically"* while the paragraph beneath said the
  opposite, and on inspection the test could not discriminate at all — a correctly isomorphic walk
  and a decorative one both play identically under an instant cut. Corrected in §2.2a: Test C is a
  **load audit**, the Displacement rule is the isomorphism proof. Fixed in `17119d3c`.
- ⭐⭐ **`check-mission`'s two prose bans were 42/42 false positives on their first real run.**
  CHARACTER banned the word **"cross"** for meaning *angry* — in a corpus whose central frame is
  **THE CROSSING** — and matched *"the goat crosses"*, *"lines cross"*, *"ANIM.cross"* (9/9 false).
  RATCHET matched design rationale (*"collapses this game into 002"*), a balance pan **sinking**
  (which is a balance pan working), the **required** adaptive ladder (*"drops the next item one
  level"*), correct refusal (*"until they are taken back"*), and the goal being **reached** (*"the
  yard empties"* — the crablings came out) (33/33 false). `cross` removed; RATCHET downgraded to a
  WARNING with the measurement recorded in its docblock, because a gate with a 100% false-positive
  rate gets ignored — and then it is ignored on the day it is right. **The two decidable checks
  earned their place in the same run: NO-RAIL caught 3 specs, MISCONCEPTIONS caught 2 real losses.**
- ⭐ **The inherited `NO-PUNISH` ban has a third word sense.** It already guarded *"lives in/on/at"*
  (the animal); the redesign added *"L3 **lives from** all four kinds"* (draws its content from).
  Widened, and poison-tested three ways: a real *"three lives and loses one"* still fails.
- **A judge panel produced a competing 13-frame system** (`MISSIONS-v2-CANDIDATE.md`, 112 KB). It is
  **NOT installed** — its frame names differ (THE FOOTING, THE APERTURE, THE MENDING, THE EXCHANGE,
  THE LIFT, THE ERRAND, THE GATHERING), so installing it would orphan all 27 specs already written
  against v1. Reconcile deliberately before the next wave, or leave v1 standing.
