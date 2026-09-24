# Gadget Repair Shop — kid-facing "Fixit's Fix-It Corner" — APPROVED DESIGN SPEC
**id:** repair-restore-01 · **standard:** 1.OA.D.8 (determine the unknown whole number in an add/sub equation, unknown in ALL positions) · **family:** repair-restore · **engine:** new `engine-missing-part.js` (term-list round, one `{blank:true}`, NO stored answer; `deriveUnknown` solves the linear constraint + proves uniqueness) · **runtime:** SIMPLE · **EN pilot**
**Status:** approved 2026-06-21 (6-expert ensemble; all 8 critic-required fixes). Build deferred.
**also_teaches:** 1.OA.C.6 (within 20) · K.OA.A.4 (make 10) · 1.OA.D.7 (meaning of =) · 2.OA.A.1 (within-100 re-skin).
**Distinct from Sentence Surgeon (repair-restore-04):** that EDITS tokens for grammar (L.2.1); this solves a numeric constraint with a DERIVED unknown. No shared engine/character/mechanic.

## Concept & creative hook
A basement repair shop that **brightens dim-grey → warm-gold** as gadgets are fixed (non-numeric world-fills vessel). Broken gadgets arrive on the bench; each needs the right numbered part to whir alive.
- **Fixit, a NEAR-SIGHTED repair-mole (inverted power dynamic — the heart):** can't read the tiny number, so YOU his sharp-eyed apprentice work it out. Child = the trusted expert Fixit depends on, NOT a tested student. Wrong → "let's check this together." This dynamic also makes the escalation (below) read as help arriving, not a remedial track.
- **TEST-IT suspense beat (premium micro-moment):** a fix is NOT an instant green check — commit the part → gadget **strains → catches → cli-click → POP → whirs to life**.
- **10-gadget gratitude GALLERY — earns its slot (fix #8):** revisitable persistent shelf; each gadget does a **specific silly job tied to its repair** + thanks the child referencing *that* job ("butter 100 slices of toast a minute!") — never interchangeable "you fixed me!" ×10. If a job/line can't be made specific, it isn't in the ten.
- **No-shame:** wrong = a modeled diagnostic physical consequence, never a red X / sad sound.
- **Anti-generic:** NOT a fill-in-the-blank worksheet with a mole on top — (a) reasoning rides the TAP via fading scaffolds + strategy tools; (b) wrong has a modeled COMPUTATIONAL consequence; (c) the part comes ONLY from a **bounded common-error tray** (never a free 0–20 dial) → a right answer is a computation, not a stab.

## Core loop & the distinct experiences
**Loop:** broken gadget shows its equation as DOM cells with one glowing `.socket` (the blank) → Fixit reads it RELATIONALLY ("eight plus how-many makes thirteen?") → child picks from a **bounded common-error tray** (3–4 parts; 1 correct, rest engine-generated common errors) → **tap-the-part** (drag = enhancement, same validator) → TEST-IT beat resolves.
- **CONFIRM-AFTER-COMMIT, not pre-reveal (fixes #1/#2/#5/#6 — headline):** the whole shows as a **labeled vessel ("13"), undivided** on every computation band — NOT 13 countable sockets. Part-part-whole animates only AFTER commit: fills (correct) / **over-revs** (too many — "13 is the whole, 8 is a part") / **half-turn-stalls** (off-by-one). The visible model is FEEDBACK, never input → no countable gap to point-count instead of computing.
- **First-try correct →** TEST-IT beat + gadget's specific silly job + room brightens a notch + `ctx.correct()` auto-advance.
- **Wrong →** modeled physical consequence + Fixit MODELS the computation ("8 plus 4 is 12 — one more") + inverse hook ("…or 13 take away 8") + tray does NOT eliminate the wrong part (no elimination-to-1 cheat).
- **ESCALATION after 2 misses — forces an OPERATION not a count (fixes #2/#3):** 3rd attempt swaps tap-the-part for a **determination-forcing enacted operation** — **count-ON from the known part** (number-line advances from 8; child taps each hop to 13; the hops ARE the answer) or **make-ten** (8→10, 10→13; read 2+3). Number EMERGES from an operation, never a gap-match. Framed in-character as Fixit fetching his tools ("slides over the counting-rail: let's build it together!") — help arriving, never "you failed."

**Fade schedule (fix #5 — concrete → representational → abstract; MANDATORY):**
| Band | Bands in it | Visible-model state |
|---|---|---|
| On-ramp | make-10, within-10 direct | **Full countable** discrete structure (≤10) — counting is correct here |
| Core | missing-addend, missing-subtrahend (within 20) | **Confirm-after-commit only** — whole = labeled vessel, model diagnoses post-commit |
| Hard | missing-first-addend, missing-minuend, balance, produce | **Faded / strategy-tools only** — fact-family triangle + number-line operate on FACTS |

**Distinct experiences (fix #4 — distinct TO THE CHILD via a different ACTION/metaphor, not a different blank-slot):**
| Band | Experience | The child's DISTINCT action | Standard |
|---|---|---|---|
| On-ramp | Make-10 | fill a part to hit exactly 10 (two-step fill) | K.OA.A.4 |
| On-ramp | Missing-sum (direct) | known + known → supply the whole | 1.OA.C.6 |
| Core ★ | Missing-addend (8+?=13) | **count-ON** — number-line hops L→R from the known part | 1.OA.D.8 (core) |
| Core | Missing-subtrahend (13−?=8) | **count-BACK** — hops R→L from the whole | 1.OA.D.8 |
| Hard | Missing-first-addend (?+5=12) | can't count-on from a blank → **rotate the fact-family triangle** (think-addition) | 1.OA.D.8 |
| Hard ◆ | Missing-minuend (?−5=8) | **slide-back-together** — 8 remaining + 5 removed recombine (eq says minus, you ADD) | 1.OA.D.8 (hardest) |
| Hard | Balance (6+6=?+4) | level a **balancing GADGET** (scale/teeter Fixit levels — fix #7: a gadget, not a bare see-saw); attacks "=-means-answer-next" | 1.OA.D.7 |
| Capstone | Produce-a-problem | child **places the blank themselves** in a fact-family → deepest no-test mastery | 1.OA.D.8 |

- **Produce-a-problem fully specified (fix #4):** child sees a complete fact-family triangle (13 / 8 / 5) + **taps one number to hide it** → creates a problem for "the next gadget." `deriveUnknown` + uniqueness scan validates an in-range uniquely-determined eq; Fixit then "fixes" it on-screen modeling the inverse. (The one demotable-to-stretch item if build cost is high — but specced to ship.)
- **Bands = FIXED AUTHORED sequence, NEVER performance-adaptive (fix #3):** every child walks the same ladder (on-ramp → core → hard → capstone; within-10 before within-20; make-10 the on-ramp). Pacing may add **support** only, never escalate **challenge** on performance → no hidden SmartScore. Per-pass order-only reshuffle via `nextTask` within a band.
- **Free slice = make-10 + the real missing-addend (count-on) + a missing-subtrahend (count-back)** — NOT a trivial missing-sum (mis-sells the skill).

## Win-states & juice (no competition)
No score/timer/streak/fail. Reward = restoration + gratitude (TEST-IT beat → specific silly job → Fixit's warm grateful line → room brightens → gadget pins to the revisitable gallery). Wrong = "let's check together" + diagnostic modeled consequence, never a buzzer, no candy on the wrong path. Anti-farm: bounded common-error tray + non-eliminating retry + escalation-to-an-operation → a guess buys a forced count-out, not a free second 50%. Full-pass keepsake = a repaired-gadget badge → cross-game `GameCollection`. Produce-a-problem capstone = the payoff. CSS/WebAudio; mute + reduced-motion.

## Pedagogy
- **1.OA.D.8 instantiated:** unknown in ALL positions; difficulty driven by POSITION (which term blank → which strategy), not number size. The fade keeps it on-standard, not drifting into K.CC counting.
- **Counting-crutch named + closed (fixes #2/#5):** a pre-shown countable gap would let a child count holes (K.CC.B.5) and skip the +/− computation. Confirm-after-commit + fade + operation-forcing escalation remove every countable path on a computation band; the build-gate's counting-solver adversary ENFORCES it.
- **Inverse relationship = the TAUGHT strategy (the heart):** fact-family TRIANGLE plate (whole 13 top, parts 8+unknown → 8+5/5+8/13−8/13−5 = one kit) + think-addition-to-subtract / count-it-up + number-line/make-ten tools (offered, non-blocking — enact, never penalize). Missing-minuend gets the concrete slide-back-together.
- **Misconceptions, each a named distractor w/ a modeled consequence:** add-the-visibles (21 → over-rev), copy-total (13 → dead-clunk), off-by-one (4 → half-turn-stall), wrong-operation; and =-means-answer-next (the balancing gadget attacks it).
- **No-test assessment = behavior, parent-invisible, gates nothing:** first-try-correct on a common-error board + produce-a-problem. First-try-correct drives internal pacing only, never shown.
- **Accessibility/TTS:** equation read RELATIONALLY; bare-cardinal TTS (safest load); ≥36px; number-line + make-ten tap-operable; numbers/operators ALWAYS DOM.

## Interaction & UX
- `engine-missing-part.js`: round = term list w/ exactly ONE `{blank:true}`, NO stored answer. `deriveUnknown(round)` solves the linear constraint (blank coeff ±1) + brute-force 0..range scan proves exactly one solution. `commonErrorParts(round,x)` family-aware (each distractor a named error class; out-of-range error-candidate → another error class, NEVER random).
- **Confirm-after-commit rendering (headline fix in runtime):** whole = labeled vessel on computation bands; the discrete part-part-whole animation is a POST-COMMIT feedback pass, not an input affordance. Discrete countable structure pre-commit ONLY on the ≤10 on-ramp.
- Tap-primary (tap tray part → seats into socket → TEST-IT beat); drag = enhancement, same validator. Equation = DOM flex cells; balance wraps at `=` (≤7 cells).
- **Escalation = full-region SWAP, not an overlay (fix #6):** the 3rd-try count-on/make-ten tool replaces the tray region, never floats atop a full column.
- **Mobile @280–768 (fixes #6/#7):** gadget `clamp(120–220px)`; equation flex-wrap; tray 3–4 parts ≥56px (2×2 below ~300px); Fixit + tools fit. The **labeled-vessel whole (not 13 sockets) is what makes 280px fit** — one fix, two problems. The balancing gadget STACKS vertically at ≤300px (not a wide horizontal beam). Escalation number-line/ten-frame = region-swap → full column. **Wireframe the 280px budget for base + escalated + balance states before build** (latter two break first). Pass `audit-game-mobile.js` 280→768 on all three, empty + filled.

## Visual & art direction
Direction-A (cream #FBF3E4 bench-light / teal #146B5E gadget-trim+numerals / coral #F2784B socket-glow+room-warmth; Baloo 2 + Nunito). **Fixit** = round near-sighted mole, slipping spectacles, holds things close in every pose: idle / squint-at-part / model-the-count / delight. **Gadgets** = 8–10 contraptions, each broken (dim/sputtering) + repaired (bright + specific silly job). Words/numbers/operators ALWAYS DOM. Stub-first: gadget bodies → `tile`/`scene`; parts/cogs → `gem`; Fixit → `creature`. **CA5 ≈ 5 sheets, ~52 frames:** 8 gadget broken/repaired pairs (~32) + cog/parts sheet (~12) + Fixit 4 poses (~8). Equation cells, labeled-vessel whole, ten-frame, number-line, fact-family triangle, balancing-gadget beam, all juice (strain/catch/POP/whir, over-rev, stall, room-brighten) = DOM/CSS/WebAudio.

## Runtime mapping + MEASURED build-gate + PER-LOCALE
- **Round descriptor:** `{band, experience:'make10|missingSum|missingAddend|missingSubtrahend|missingFirstAddend|missingMinuend|balance|produce', terms:[{value}|{blank:true}], op, range:10|20, modelState:'countable|confirmOnly|faded', tool?:'countOn|makeTen|triangle|numberLine'}`. NO stored answer; `correctPart` derived; tray = `commonErrorParts(round, deriveUnknown(round))`.
- **`verify-fix-equation-core.js` (MEASURED — loads the real engine + shipped pool; HALTS build):**
  1. **Derive + uniquely-determined** (deriveUnknown + brute-force 0..range scan → exactly one solution).
  2. **No stored answer** (assert no literal answer field; only ever derived).
  3. **Every distractor a named COMMON-ERROR class** (add-visibles/copy-total/off-by-one/wrong-op) — **FAIL on any random distractor**.
  4. **Blind-random-solver loses** to the computing-solver (honest bump model incl. escalation; reader wins ≥1.5× fewer total steps, not a coin-flip).
  5. **COUNTING-SOLVER ADVERSARY (fix #7 — makes the fade enforceable):** model a strategy that counts any visible discrete-countable affordance on the rendered board. On every band past the make-10/within-10 on-ramp this solver MUST FAIL (no countable gap yields the answer pre-commit). **Counting-solver wins on a computation band → FAIL the build.**
  6. **Escalation-forces-operation** (3rd-try scaffold output produced by an enacted operation, NOT a gap-match; satisfiable-by-counting-to-match → FAIL).
  7. **Confirm-after-commit on computation bands** (discrete part-part-whole renders only post-commit, or only on on-ramp bands; never pre-input on a computation band).
  8. **≥7 distinct position-families** (signature on experience/action, not the blank-slot).
  9. **≥1 inverse-scaffold present** (fact-family triangle / think-addition) in the scored set.
  10. **Numbers in range** (terms + derived unknown ∈ 1..range; sums too).
  - Plus standing gates: `audit-game-mobile.js` (base + escalated + balance states), `audit-game-variety.js`, `audit-no-competition.js` (lcs-shell 0-line), SEO/JSON-LD §21.
- **PER-LOCALE — CHEAP (deliberate favorable contrast to grammar, honestly classified):** numbers universal → no numeral art, no morphology. Localized = Fixit's ~10 lines + operator trio (plus/minus/equals) + the relational read frames ("eight plus how-many makes thirteen?") + the bump comparative/relation sentences. Single-digit-and-teens cardinal TTS = the safe load. No per-locale edit-modes (unlike Sentence Surgeon). §A.13.48 native pass for the relational-frame wording (wrong frame teaches the wrong relation) — a light load.
- **Feasibility:** SIMPLE — one engine + DOM/CSS/WebAudio + ~52 CA5 frames. Stub-first; local preview; tune the TEST-IT beat (strain→catch→POP) + the modeled-consequence animations BEFORE wiring the full pool.
