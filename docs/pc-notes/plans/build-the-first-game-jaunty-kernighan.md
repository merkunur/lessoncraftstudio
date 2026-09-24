# Build game 002 — Numeral Nest (`numeral-nest`)

## Context

The 200 K-3 games program opened 2026-09-05 (CLAUDE.md §24). Two hundred specs are
designed; **none is built**. The operator said *"build the first game"* — and
`games/BUILD-LOG.md` says `NEXT: 002`, because the FINAL-REPORT's build order opens
on 002, not 001: *"the simplest P1 loop: prompt + three tiles + enacted count.
Proves makeTile, praise, rail, finish."* So the first game is **002 Numeral Nest**,
and 001 Feed the Fox is second.

This is not just one game. It is the build that establishes the house pattern the
other 199 inherit: the file skeleton, the shared art library (`_lib/art.js` is
**empty** apart from a test probe — this game draws the first real assets and the
first mascot in a 50-character roster), the test-hook shape, and the way the two
gates are satisfied. Getting it wrong is 200 games of debt.

**Outcome:** `games/numeral-nest/index.html` — one self-contained file, eleven
languages, playable locally at `http://localhost:8480/numeral-nest/index.html?lang=xx`,
through every gate in `BUILD-WORKFLOW.md` §2 Step 4. **No deploy** (nothing deploys
until all 200 exist).

---

## What is FIXED (spec invariants — not open for redesign)

From `games/design/specs/002-numeral-nest.md` + the catalogue row (binding):

- **Objective:** looks at a set of 1-10 eggs and taps the numeral (of three) that names how many.
- **Band 5-6 · Pattern P1** (tap one of N) · 8 items · session ≈ 4-5 min.
- **The four misconception responses** — mirror numerals 6↔9, off-by-one, cardinality,
  length/spread bias — each with its enacted response. The ensemble may **strengthen**
  these, never remove one.
- **No timer, no score, no lives, no losing state.** Success is certain via the
  three-step ladder ending in a show-me.
- **All 11 locales** (en de fr it es pt nl sv da no fi) — `STRINGS` ×11 is a gate.
- **Zero lines** changed in `_lib/game-core.js`, `_lib/theme.js`, `_lib/ui-strings.js`.
  Only `_lib/art.js` gains entries (additive).

---

## Defects I found in the spec myself (measured, not inferred)

Run: `node -e "…"` arithmetic over the spec's own coordinates.

| # | Defect | Measurement | Consequence |
|---|---|---|---|
| G1 | Egg row overflows the nest | 5 eggs at spacing 60 span x 212..508; the nest at (360,176) size 128 spans 296..424 | eggs float outside the nest from n=4 up; at n=8 the row is 476 px wide |
| G2 | Eggs nearly touch | spacing 60 − egg 56 = **4 px gap**; ART-BIBLE §4 requires ≥ 12 px between countable objects | the child cannot see them as separate things to count — fatal for a counting game |
| G3 | The 10-egg cluster overlaps | closest pair (−60,20)/(−100,20) is **40 px** apart with 56 px eggs; ≥ 68 px needed | overlapping eggs at exactly the level where cardinality is being taught |
| G4 | Count-badge numerals are below the band floor | badge numeral 20 px; BUILD-CONVENTIONS §12 sets 40 px for single numerals at 5-6 | ART-BIBLE §8 rule 7 fails at the critic; the enacted count is the teaching moment and is unreadable |
| G5 | Two 6-px box overlaps | bubble bottom 128 vs hen top 122; mirror-parking tile top 422 vs tile-row bottom 428 | cosmetic, but rule 5/13 of the critic rubric |

These are **must-fix before build**, not opinions. The art director and the graphic
designer own the corrected geometry; my numbers above are the acceptance test.

---

## The ensemble (BUILD-WORKFLOW §2 Step 2)

Round 1 (pedagogue · content creator ×11 locales · game developer · art director) and
Round 2 (artist · graphic designer · animation) run as `general-purpose` agents.
**Adaptation for plan mode:** the workflow has them write `_qa/<slug>/plan-<role>.md`;
plan mode forbids edits, so each returns its output in-context and I synthesise here.
The `_qa` artefacts (art sheet, critic report) are written during the build, after approval.

### What the pedagogue found (13 spec defects; the load-bearing ones)

| # | Defect in the spec | Fix |
|---|---|---|
| P1 | **Attempt 2 shows the answer.** `ART.totalNumeral` appears on the first wrong tap, so attempt 2 is copy-the-shape and attempt 3's show-me adds nothing — F-46's three-rung ladder is built as two | the total numeral moves to attempt 3, with the show-me ring |
| P2 | **The mirror `underline` is a verdict, not an anchor.** A bar under one of two parked tiles says "this one" and carries zero orientation information — the claimed anchor ("the round part is at the bottom") exists only in the spec's prose | one shared baseline bar under **both** tiles + a coral dot on each glyph's closed loop (low on 6, high on 9), shown together so the child compares |
| P3 | **L1's fixed 60 px spacing makes row width a perfect proxy for quantity** — the game hands the child the length/spread bias (F-101) at the exact level where strategy forms, while claiming to defeat it | vary spacing per item across {48, 60, 72} |
| P4 | **Misconception 3 has no distinct response** — byte-identical to misconception 2, so three named errors get two responses (F-43 requires one each) | the far/magnitude error ends by *gathering* the set into the one numeral on the nest label |
| P5 | **The "≈2.5 s" tile lock is arithmetically false** — the real span is `350n + 900 + 300` = 4.7 s at n=10, 6.4 s on the mirror path. A builder taking the constant literally re-enables tiles mid-count and scores a stray tap as an attempt | compute the lock from the sequence |
| P6 | **A second-attempt correct gets the identical celebration to a first-try correct**, voiding the F-65 brute-force guard (with 3 tiles, two wrong taps leave the answer by elimination) | praise + hen cluck fire **only** on first-try; later attempts get pop + tone only. Nothing negative is ever added |
| P7 | **Attempt-3 behaviour on a non-ringed tile is unspecified**, so F-61's "zero ways to end other than finishing" is asserted, not established | at attempt 3 the two wrong tiles are disabled |
| P8 | **L3 has exactly as many items as a fluent session consumes** — the stretch level is exhausted and identical on every replay | pools of 8 per level (24 total) |
| P9 | `(5; 4, 6)` appears in **both** L1 and L2, and `8` in both L2 and L3, while "no item repeats" has no defined key | dedupe on `(n, d1, d2)` **and** on `n` |
| P10 | **"Mirror distractor on every 6/9 item" mislabels `(8; 6, 9)`** — with 8 as the answer, tapping 6 or 9 is not a mirror confusion, and no firing condition is given | mirror path fires iff `{tapped, correct} == {6, 9}` |

Plus, additively: **item 1 demonstrates itself once and fades** (F-42) — the enacted
count runs on the opening set with tiles disabled, which is how a non-reading child
learns the task, *and* it fixes the deeper problem that **the game's best teaching
currently fires only on failure** (a child who is always right never sees a count).
And **tapping the nest replays the count**, free, once per item — one extra
interactive element, keeping the F-69 budget at 5 of 10 (making the eggs individually
tappable would hit 13 and breach it).

**Adaptive rule adjudicated:** FINDINGS F-46 says 3-up/2-errors-in-3-down; §8 says
2-up; the spec says "any wrong → down". Ruling: **2-up (per binding §8)**, but
**down on 2 errors in the last 3** (per F-46), not on any single wrong — the spec's
rule demotes a child for one mirror slip, exactly the error the game exists to teach,
and yo-yos the session below the child's level.

### What the content author found

- **Title: "Numeral Nest" → "Number Nest".** *Numeral* is a metalinguistic term an
  English five-year-old does not own; it is the only one of the 200 titles that uses a
  word needing explanation. ⚠ **The catalogue row is binding and the hub reads its
  title from `CATALOGUE.md`** — so this needs the row edited too, or hub and game
  disagree. **Operator decision.**
- ⭐⭐ **The English source was the defect, and it nearly shipped an obscenity.** The
  natural imperative title "Count the Eggs" gives Finnish **"Laske munat"** — `munat`
  is everyday Finnish slang for testicles, in a title a teacher reads aloud. Moving the
  whole set to a noun phrase fixes it at source in all eleven; the egg word now appears
  in no string in any locale.
- ⭐⭐ **A live defect in the SHARED `ui-strings.js`, affecting all 200 games:**
  `it.well_done` is `"Bravo!"` — masculine singular. To a girl an Italian teacher says
  *"Brava!"*. Every other locale's praise is invariable. Fix → `"Benissimo!"`.
  **Operator decision** (it edits a file shared by 200 games).
- **Praise rotation cut to `["well_done", "you_did_it", "keep_going"]`.** I verified
  this against the source myself: `great_job` is literally *"good work"* — workplace
  register — in it/da/es/pt, and `excellent` is report-card register in de/da/no/fi/sv.
- **Picture cue: KEEP hen/nest/eggs**, on two conditions — eggs drawn **plain**
  (a decorated egg reads as Easter in de/nl/sv/da/no, and colour variation invites
  sorting rather than counting), and **no basket fallback** (a basket of eggs is a
  different picture; with SVG art the Unicode-version problem that motivated it is gone).
- **Numerals: one form for all eleven, unmodified Baloo 2.** The flagged 1 / crossed 7
  are *handwriting* conventions; every one of these countries *prints* the plain form.
  And if Baloo 2's 6 and 9 are near-rotations of each other, **that is the content, not
  a bug** — a font that distinguished them incidentally would let a child pass without
  learning the rule.
- **No `LOCALE_DATA` at all** — nothing in the game varies by locale. Ship no stub.

### What the art director found (and I re-measured myself)

They confirmed G1-G3 independently and found **two more** I had missed: the spec's L2
two-row layout **overlaps eggs by 10 px vertically** (rows 44 px apart, egg 54 tall),
and the finish buttons at x 250/470 **touch** (220-wide buttons, 0 px gap).

**Corrected master geometry** (I re-ran the separation test on all of it; every count
clears, tightest case n=10 at 5% margin):

| thing | spec | corrected |
|---|---|---|
| egg | 56 | **48** (opaque ovoid 35 × 46.5) |
| nest | 128 × 128 @ (360,176) | **360 × 152 @ (412,182)** — non-square |
| hen | 96 @ (110,170) | **104 @ (128,188)** |
| numeral tile | 96, label 44 px | **104, label 72 px** |
| the big total | floating @ (360,96) | **into the hen's speech bubble** |
| `nestLabel` | 64 × 48 on the nest | **deleted** — the bubble is the answer slot |
| mirror parking | (300,470)/(420,470) | **y 382, x 296/424** (a 104 tile cannot fit an 80 px zone) |
| finish buttons | (250,510)/(470,510) | **(236,508)/(484,508)** — 28 px apart |

⚠ **Load-bearing constraint, not advice:** the egg ovoid must not exceed **46 units in
the 64 viewBox**. At 47 the n=10 clearance drops below 12 px and the layout fails. My
measured margin there is 5%.

**The 6-vs-9 ruling — the game's whole pedagogical point.** 44 px is rejected: the
bowl-position cue is ~22% of figure height, i.e. **~10 real px at a 400 px iframe**,
below what a five-year-old resolves. Ruled **72 px on a 104 px tile** (28 real px at
704). And no *static* mark can distinguish a 6 from a 9 — both sit on the same baseline
in the same box — so the distinction is taught by **motion**: the correct numeral
*drops onto* a thick coral bar with a 6% squash on landing ("sits on"), then a teal ring
draws around its **bowl** ("the round part"). Three non-colour cues: thick-vs-thin floor,
dropped-vs-static, ringed bowl low vs high. Explicitly rejected and not to be
reintroduced: a drop shadow (identical for 6 and 9 — carries zero information), a line
under the whole row (equidistant from every glyph), a struck-through hairline (a line
through a 6 is a struck-out 6).

**New house doctrine they set, which the other 199 inherit:** a mascot may carry one
identity feature in an `accent` **tint** (the hen's terracotta comb), exempt from the
one-coral-per-screen count, because it never changes and never means anything. The
counted coral is **state** coral — the single element that is coral *because of what is
happening now*. This is what frees coral for meaning across the whole roster.

### Conflicts I adjudicated from the source documents

- **The caption `howMany`.** Pedagogue: delete it (F-42, zero text at 5-6). Content
  author: keep it (it is the teacher's script; the bubble is the child's cue).
  **Ruling: KEEP.** BUILD-CONVENTIONS §6/§9 is the *binding* contract and explicitly
  permits ≤3 words paired with an ART element; FINDINGS is evidence, not contract. The
  pedagogue's real point — that a non-reader is told nothing — is answered by the
  item-1 self-demonstration, which I am taking.
- **`fox.idle` does not exist.** The content author read it as registered; it is inside
  the `_lib/art.js` header comment as an `ENTRY SHAPE` example. The library is empty
  apart from the test probe.

---

## The two gates I must design around (read from the gate source, not the docs)

**`_tools/check-build.js` (static)** — the `BUILD-CONVENTIONS.md` §1 skeleton is
**stale**: it omits `<script src="../_lib/art.js">`, which the gate *requires* (and
`preloadArt` throws without it). Also fails on: any emoji outside the `const ART`
block; any `#rrggbb` outside `<style>`/ART; any `fontFamily: "literal"`;
`add.image(`/`load.image(`/`new Audio(`/`<img`/`<audio`; any `vh/vw/vmin/vmax`;
`ResizeObserver`; a missing locale key; a missing `LCS_TEST` method; > 1200 non-ART lines.

**`_tools/qa-game.js` (runtime)** — the session loop is
`start(); repeat { wrong(); 350 ms; correct(); 900 ms; scene() }`. The spec locks all
three tiles for the ≈2.5 s enacted count, so a naive `correct()` 350 ms after `wrong()`
is refused and **the session never finishes**. This is the central implementation
problem of the whole program (every game with an enacted hint hits it) and the
developer agent's resolution is the doctrine the other 199 inherit.

---

### What the implementation designer found (19 risks; the ones that change the build)

**The central problem — and the doctrine the other 199 games inherit.** `qa-game.js`
fires `correct()` 350 ms after `wrong()`, while the enacted count holds the tiles
disabled for 2.3-6.1 s. A direct `correct()` hits `makeTile`'s `if (!api.enabled)
return` and evaporates; the harness then pushes more intents into the same dead window
and *which* taps land depends on frame timing — items would occasionally solve with no
wrong at all, **falsifying the gate's own claim that every item got a wrong answer**.

Resolution: `wrong()`/`correct()` **enqueue an intent**; `Play.update()` drains at most
one per frame, only in a frame where the tiles are genuinely tappable, by emitting
`pointerdown`+`pointerup` on the tile's own container — the identical listener chain a
finger triggers, including the `enabled` guard. **This preserves §16 rather than
bypassing it: there is no private set-state entry point anywhere in the file.** What the
queue removes is the race, not the path. Alignment is self-correcting — `buildItem()`
drops a leading `"correct"`, so every item begins on a `wrong` and any odd consumption
heals at the next boundary. Measured headroom: ~35 loop turns against the harness's
400-turn bound (27×).

**Two gate traps that would fail an otherwise-correct file:**
- ⭐ **`check-build` finds the ART block by brace-matching** from `const ART = {`, then
  strips it by literal `String.replace` before the HEX scan. **A single `{` inside an
  inline SVG string mis-slices the block**, cascading into false HEX *and* emoji
  failures. Avoided by construction here — the SVGs live in `_lib/art.js`, which the
  gate does not scan — but only because we chose that split.
- `✓` and `✗` are `Extended_Pictographic` and are **not** in the gate's ALLOW set, so
  neither may appear even in a comment; `.add.image(` is matched against the whole
  source, so it may not appear in a comment either.

**⭐ The gate cannot see the game's headline pedagogy.** `shotWrong` latches on the
*first* wrong answer — always an easy L1 item — so the **mirror cue is never
screenshotted**, and attempt 3 is unreachable with one wrong per item, so the
**show-me ring is never screenshotted** either. Both are the states this game exists
for. Fix: two throwaway probes written into `_qa/` during the build (one driving the
queue to an L3 6/9 item, one sending three wrongs) so the critic and the pedagogue grade
what the gate structurally cannot reach.

**Other findings taken:** the tiles are created **once** and re-labelled per item —
game-core keeps one *global* `state.buttons` with a single `focusIndex`, and destroying
tiles between items would leave the ring pointing at a different object; `Play` must
call the `off()` returned by `onLanguageChange` in `shutdown` (**the most likely
accumulating leak in the whole library** — ten replays otherwise leave ten listeners
bound to dead scenes); every deferred callback is guarded by an `itemToken`; the finish
cards must be `drawArt`, **not** `makeTile`, or eight non-functional stops enter the
Tab order; `?embed=1` must suppress the picker in **both** Boot and Play; and every
non-square SVG entry must set `size === w` or `drawArt` renders it at 0.16 scale.

**Two library-level observations, not this game's to fix:** `makeTile`'s `pointerup`
calls `setFocus`, so **a finger tap paints a keyboard focus ring** in all 200 games (it
will appear in the gate screenshots — the critic should grade it as intended UI, not a
defect); and the gate measures the 44 px floor **only at 704**, so 400 and 1024 are
screenshotted but never target-checked. What actually protects 400 px is §3's 80 px band
floor, not the gate.

## Where the two agents' geometry disagreed

The art director and implementation designer independently produced *different*
corrected geometries (nest 360×152 @ (412,182) with egg 48 and curved arcs, vs nest
400×132 @ (360,188) with egg 56 and staggered rows). Both pass my separation test.
**Ruling: the art director's, as the composition authority** — the developer's remit was
to flag what will not hold in code, and their geometric findings (R1, R2, R4-R7, R19)
agree with the art director's in direction. The developer's *code-level* findings are
orthogonal and all taken.

## Cross-agent conflicts, ruled

| conflict | ruling |
|---|---|
| Pedagogue: delete the `howMany` caption (F-42 zero text at 5-6). Content author: keep it | **KEEP.** BUILD-CONVENTIONS §6/§9 is the binding contract and permits ≤3 words paired with an ART element; FINDINGS is evidence, not contract. The pedagogue's real concern — a non-reader is told nothing — is answered by the item-1 self-demonstration, which I am taking |
| Pedagogue: 9 items. Art director: 8 dots, 8 summary tiles | **8 items.** Both fit geometrically (I measured); the spec's Rules state 8 and §8 permits 8-10 at this band. The re-queue takes one of the eight slots rather than lengthening a five-year-old's session |
| Spec: `nestLabel` holds the solved numeral on the nest. Art director: delete it, the bubble is the answer slot | **Art director.** One answer slot, three visually distinct states (`?` / shown-total / my-answer), and it removes a 64×48 element from an already-crowded zone A |

## Your three decisions (answered)

1. **Title → "Number Nest"**, and the `CATALOGUE.md` row 002 is edited to match so the
   hub and the game agree. Slug `numeral-nest` is unchanged (machine id). The other ten
   locales keep their natively rebuilt titles, none of which calques the English anyway.
2. **Fix Italian + trim the rotation.** `it.well_done: "Bravo!"` → **`"Benissimo!"`** in
   the shared `_lib/ui-strings.js` (a correctness fix inherited by all 200 games), and
   this game's praise rotation is **`["well_done", "you_did_it", "keep_going"]`** — the
   three that read as child register in all eleven. `great_job` and `excellent` are left
   in the file, unused here.
3. **Take all four pedagogy additions:** pools 13 → **24** (8 per level, so a replay is
   not identical and L3 cannot be exhausted), a missed quantity **re-queued 3 items
   later** with fresh distractors and layout, **tapping the nest replays the count**
   free once per item, and **item 1 demonstrates itself** and fades.

## Build steps (after approval)

**Round 2 of the ensemble runs here, not in plan mode** — the artist, graphic designer
and animation agents write to `ART-BIBLE.md` §3-§4, `_lib/art.js` and
`_qa/<slug>/art-sheet.html`, all of which plan mode forbids. Their output is also art
the operator judges by *looking* at it, which is what the critic pass and my own read
are for. So:

1. **Round 2** — artist draws the six SVG entries (`hen.idle/think/happy/oops`, `egg`,
   `nest`) into `_lib/art.js` to the art director's briefs + contact sheet; graphic
   designer settles the shape entries and per-level coordinate tables; animation agent
   writes the ANIM registry including the mirror-cue drop-and-ring timing.
2. `_lib/art.js` + the six ART-BIBLE §7 index rows (the first real entries in the
   library — it currently holds only a test probe).
3. `games/numeral-nest/index.html` — the §1 skeleton **plus `art.js`**, registries
   (`ART`, `ANIM`, `STRINGS` ×11, `CONTENT`; **no `LOCALE_DATA`**), Boot/Play/Finish,
   the deferred-intent `window.LCS_TEST`.
4. Fix the stale `BUILD-CONVENTIONS.md` §1 skeleton (add the missing `art.js` line) —
   one line, and it would otherwise mislead all 199 remaining builds.
5. `node games/_test/run-tests.js` still passes (`art.js` changed).
6. Gates in order, none skippable: `check-build.js` → `qa-game.js` → **the two extra
   probes for the mirror cue and show-me ring the gate cannot reach** → visual-critic
   agent on every screenshot against the art director's 28-point rubric → **I read
   704 + 1024 + 400 myself** → pedagogue sign-off on the BUILT pools → `build-hub.js`.
7. Close out: `BUILD-LOG.md` entry + `NEXT: 001`, memory update, commit with explicit
   paths (never `git add .`, never anything under `_qa/` or any `.png`), no push unless asked.
8. `node games/_tools/serve.js` (background) and hand over the 11 local links.

## The build, settled

**Game:** `games/numeral-nest/index.html`, title **"Number Nest"** (11 native titles),
8 items drawn from a 24-item pool, 3 levels, P1 tap-one-of-three, ages 5-6.

**Loop:** eggs appear in the nest → the child taps a numeral → correct on the first try
gets praise + the hen's cluck + the numeral gliding into her speech bubble; a wrong tap
gets a calm nudge and an **enacted count** (each egg badges in turn to a rising tone, the
last badge grows coral) with three distinct responses — the 6↔9 mirror cue (both tiles
park side by side, the correct numeral **drops onto a coral bar** with a squash and a
ring draws around its **bowl**), the off-by-one recount, and the far-guess **gather**
(the set collapses into the one numeral that stands for it). Attempt 3 rings the correct
tile and disables the others, so an item can never end unsolved. Praise and the hen fire
**only on a first try**, so guessing never reads as knowing.

**Art:** six new SVG entries in `_lib/art.js` — the first real assets in the library,
and the hen is the template for the other 49 mascots. Egg 48 px in a 360×152 nest, tiles
104 px with 72 px numerals, one coral element per screen (state coral), one teal ground
band that every scene stands on.

## Verification

- `node games/_tools/check-build.js numeral-nest` → PASS.
- `node games/_tools/qa-game.js numeral-nest` → PASS (11 locales boot, never
  auto-starts, ≥ 7 distinct Start labels, a wrong answer on **every** item still
  reaches Finish, all targets ≥ 44 px real at 704).
- Screenshots in `games/_qa/numeral-nest/` graded against ART-BIBLE §8 (14 points)
  plus this game's own checklist; **the G1-G5 measurements above re-run as arithmetic
  on the shipped coordinates.**
- Manual: play it at `?lang=de` and `?lang=fi` (longest strings), `?sound=off`,
  `?embed=1`, and tap all three tiles in a row to prove brute-force never reads as success.
