# REDESIGN LOG — turning the 200 specs from activities into games

NEXT: W01

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

**The two-deletion test.** Delete the maths → nothing playable may survive (F-63). Delete the
mission → nothing playable may survive (new). A quiz-with-arcade passes the second and fails the
first; the 200 specs as written pass the first and fail the second. A real game fails both.

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
