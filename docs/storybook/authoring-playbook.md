# Storybook Authoring Playbook — how to DESIGN a story that passes

> **Read order.** `authoring-guide.md` = the *mechanics* (files, schema, module palette, wiring,
> validate/QA). **This playbook** = the *design decisions* that make a story good AND passable:
> arc, pacing, difficulty band, narration voice, which mechanic teaches which point, and the
> failure modes to design out. Every failure mode below maps to a gate in `gate-story.js` (C2) —
> if the gate fails, the fix is in THIS doc, never a hand-patch of the story.

**Who this is for.** A model (any tier) or a non-technical operator producing story #2..#1000. Given
ONLY this playbook + the gates + the golden exemplars, you should be able to author a complete,
correct, on-band story. When something is ambiguous, copy the nearest golden exemplar for that grade.

**The product in one line.** A linear, narrated, illustrated picture-story where **each page wraps
exactly ONE playable interaction that teaches ONE point**, warm and shame-free, in the child's
language, free. No scores, no timers, no streaks — **ever**.

---

## 1. The five arc templates (pick one; never freeform)

Every story is one of these shapes. They exist so pacing, stakes, and the "why am I solving this"
motivation are handled by structure, not invented per story. Fill in the blanks.

| Arc | Shape | Motivation per page | Best for |
|---|---|---|---|
| **Quest** | Guide wants to reach/get X → each page is a step on the way → arrive | "help me get one step closer" | counting up, sequences, path/number-line, journeys |
| **Help-a-friend** | A companion has a small problem → each page fixes one piece → friend is happy | "the friend needs this solved" | sorting, matching, sharing/composition, kindness themes |
| **Fix-a-mess** | Something is jumbled/broken → each page tidies one part → order restored | "put this right" | classification, patterns, spot-the-difference, tidy-up |
| **Discovery** | Guide explores a place → each page uncovers one thing → the place is revealed | "what's here? let's find out" | find-object, listen, memory, letter/sound intro |
| **Collect-and-sort** | Gather items across pages → the last page organizes the haul | "grab it / where does it go" | count-out-N, cardinality, category sorting |

**Rules.** ONE guide (a returning cast member, §cast-bible). Companions are per-story. The arc's
*promise* is set on page 1 and *paid off* on the last page (completion keepsake = the payoff object).
No villains, no peril, no loss — stakes are gentle ("the picnic needs plates", not "or else").

**Guide-only vs companion arcs.** **Discovery** and **Quest** work with just the guide (Pip
explores/journeys *with the child* — no companion needed). **Help-a-friend**, **Fix-a-mess**, and
**Collect-and-sort** usually introduce ONE companion (the friend, the owner of the mess) — a per-story
cast member. If your story has no companion, prefer Discovery or Quest rather than bending
Help-a-friend around an absent friend.

## 2. Per-grade envelope (hard numbers — the gate enforces these)

| Grade | Age | Pages | Narration: max words/line · max lines/page | Sentence shape | Vocab ceiling |
|---|---|---|---|---|---|
| **PK** | 3-4 | **7–10** | **6 words** · 1 line | one clause, present tense, concrete noun | pre-reader: spoken-only, picture-carried |
| **K** | 5-6 | **7–10** | **8 words** · 2 lines | one simple sentence | high-frequency + the target word |
| **1** | 6-7 | **7–10** | **12 words** · 2 lines | one sentence, may have "and"/"because" | decodable + 1–2 new nouns |
| **2** | 7-8 | **7–10** | **16 words** · 3 lines | up to two sentences | grade-appropriate; define new terms in-line |
| **3** | 8-9 | **7–10** | **20 words** · 3 lines | two sentences, one subordinate clause OK | richer; still concrete-first |

> **Page band [7–10] for ALL grades** — the 250-story Interactive Story Library standard
> (operator-ruled 2026-07-10; supersedes the earlier per-grade 3-4/4-5/5-6/6-8 bands). PK/K
> stories stay within attention span through *tiny, forgiving, repetitive steps per page* —
> one simple mechanic mastered gently — not through fewer pages. Pre-library fixtures
> (pips-picnic, pip-counts-along, pk-*) predate this band and are exempt from re-gating.

- **One teaching point per story** (not per page). Every page's interaction reinforces the SAME point
  at slightly increasing challenge (see §4 difficulty ladder). A story that teaches two points is two
  stories.
- **PK is readiness-only** (no CCSS code; see `preschool-audit.md`). K–3 may pin a CCSS code IF the
  interaction *instantiates* the standard (not merely touches its topic — the §20.8 "demonstrate, not
  touch" rule). If unsure, ship it as a readiness strand with no code; never invent a code.
- Curriculum-neutral **child-facing** framing. The CCSS code lives in metadata/JSON-LD only; no page
  ever says "Common Core" or a standard number to the child (the standing platform rule).

## 3. Narration voice (per-grade templates — copy the pattern)

Voice = warm adult reading to a small child on a lap. Second person, invitational, never quizzing.
The narration *sets up* the interaction; the interaction is the "your turn". Never state the answer.

**Prompt patterns by mechanic** (fill `{…}`; keep within the grade word ceiling). These are
PATTERNS, not literals — **vary the exact wording across pages** so the story reads like Pip talking,
not a repeated quiz; each still within the ceiling.
- tap-the-answer (`sb-choice-board`, `sb-listen`, `sb-count-tap`): *"Which one is {target}? Tap it!"* /
  *"Can you find {target}?"*
- find in scene (`sb-find-object`): *"{Guide} lost the {items}. Can you spot them?"*
- order/seriate (`sb-sequence`, `sb-connect-dots`): *"Let's put these in order, {smallest} first."* /
  *"Tap the numbers 1, 2, 3… to see what it makes!"*
- pattern (`sb-pattern`): *"What comes next? Tap the piece that finishes the row."*
- classify/sort (`sb-sort-bins`, `sb-choice-board` label-mode): *"Where does each one go? Drag it home."*
- compose/parts (`sb-match-pairs`, `sb-number-bond`, `sb-fractions`): *"Make {N}! Find two that go
  together."* / *"How do we cut this so everyone gets a fair piece?"*
- build word (`sb-cvc-builder`, `sb-word-builder`): *"Build the word {picture}. Tap the {letters/chunks}."*
- worksheet bridge (`sb-worksheet-exercise`): use the exercise's own localized prompt; narration just
  frames it (*"Try this one with me."*).

**Success lines** (the `success.narrationKey`): celebrate the CHILD, never the score. *"You did it!"* /
*"You found them all!"* / *"Nice thinking!"* Warm, 1 short line. Localized like everything else.

**Forbidden in narration** (gate-checked): numbers-as-scores, "correct/incorrect/wrong", time pressure
("quick!", "hurry"), comparison ("better than"), any standard name, any word above the grade ceiling.

## 4. The difficulty ladder within a story

Same teaching point, gently rising load across pages. Concrete recipes:
- **Counting/cardinality:** page 1 small set (≤3) → later pages larger set, then count-out-N, then a
  compare/which-more. Keep the child-facing quantity within the grade ceiling (PK ≤5, K ≤10, 1 ≤20,
  2 ≤100). The gate treats PK as a HARD cap and K–3 as a **WARN** — because place-value/teen standards
  (K.NBT teens, 1.NBT tens-and-ones, 2.NBT three-digit) legitimately exceed the *operation* ceiling; a
  larger quantity there is reviewable, not automatically wrong.
- **Letters/sounds:** recognize → match → build (chunks/letters). PK: recognize only.
- **Sorting/patterns:** 2 categories / AB pattern → 3 categories / ABC → add a distractor.
- **Distractor plausibility (gate-checked):** wrong options must be *reasonable* (same category, near
  value) so the child thinks — never absurd (a "5" among {cat, dog, hat}) and never a trap. The correct
  answer must be *unambiguously* correct (no two-valid-answers — the sentence-builder/`sb-match-pairs`
  "a perfect matching must exist" rule generalizes).
- **Never gild the answer.** No visual/positional tell (no gold tile, no always-first-slot, no lone
  odd-color). §A.13.60 challenge bar.

## 5. Mechanic-selection guide (teaching-point → module)

Pick the module whose *thinking type* matches the teaching point. When two fit, prefer the one needing
**zero new art** (native modules + image library) over a bespoke build.

| The child should… | Module | Notes |
|---|---|---|
| recognize/identify one thing | `sb-choice-board` (image/label) · `sb-listen` (by sound) | listen = audio-first, text appears when muted |
| find things in a picture | `sb-find-object` | uses the scene art; rects ≥112du |
| count / count-out N | `sb-count-tap` · `sb-choice-board` count-group | stays ≤ grade ceiling |
| put in order by size/number | `sb-sequence` · `sb-connect-dots` (numerals) | connect-dots reveals an outline |
| finish a pattern | `sb-pattern` | AB / ABC |
| classify into groups | `sb-sort-bins` · `sb-choice-board` label-mode | |
| compose a number / find equivalence | `sb-match-pairs` · `sb-number-bond` | keypad modes rejected by design |
| partition a whole (halves/fourths) | `sb-fractions` | tap cut lines |
| tell time | `sb-clock` | narration states the target time |
| remember pairs | `sb-memory` | mismatches = exploration, never a "miss" |
| build a word (no typing) | `sb-cvc-builder` (letters) · `sb-word-builder` (syllables) | phonics-safe words only (§20.7) |
| discriminate two scenes | `sb-spot-diff` | |
| solve a real worksheet exercise | `sb-worksheet-exercise` | SEP families A/F/E/C; use `sep-generate.js` or manual export |
| **trace a line/letter/shape with a finger** (PK) | **`sb-trace`** | PK fine-motor; forgiving band (`ctx.band`), forward-arc ink, never resets; author under `alignment.grade:"PK"` |
| **find the way / route a token** (PK) | **`sb-maze`** | drag through a wide corridor; walls soft-stop, never reset |
| **stamp / colour / fit / complete / place** (PK) | `sb-dot-stamp` · `sb-color-code` · `sb-shape-fit` · `sb-complete-picture` · `sb-listen-place` | the PK tap/drag cluster — wide targets, drift-home-on-miss (guide §4) |
| **PK variant** (size-order · peekaboo · odd-one-out · feed-the-animal · shadow-match) | recompose `sb-sequence`/`sb-find-object`/`sb-choice-board`/`sb-count-tap`/`sb-worksheet-exercise` | config-only, no new code — see guide §4 "Pre-school VARIANTS" |

**No free keyboard typing anywhere** (tap/drag only — hard platform rule; keypad number-bond modes are
rejected by the module). All taps ≥112 design units.

**Pre-school (PK) tolerance rule.** PK fine-motor modules (`sb-trace`, and the
Phase-2+ drag/tap cluster) read a wide tolerance band from `sb-bands.js` via
`ctx.band` (resolved from `story.alignment.grade`). The band's `fatal.*`
minimums (tap ≥200du, drag-handle ≥240du, path-band ≥110du, corridor ≥300du,
≤4 taps / ≤3 drags) are **HARD validator checks** — a too-precise PK task fails
`validate-story`. QA proves the tolerance on the real artifact: an imprecise-but-
correct gesture (0.55×band jitter + a mid-drag lift) MUST complete, an off-band
gesture must NOT falsely complete and must stay answerable (the imprecise-touch
pass in `qa-storybook.js`, driven by `lib/touch-driver.js` via each module's
`qaGesture()` seam).

## 6. The failure-mode catalog → countermeasure → gate

Design these OUT. Each maps to a `gate-story.js` (C2) check; a gate failure = fix per the countermeasure.

| Failure mode | What it looks like | Countermeasure (design rule) | Gate |
|---|---|---|---|
| **Generic** | could be any story; no arc, no guide, filler pages | pick one §1 arc; guide sets a page-1 promise; every page pays toward it | `arc-present`, `one-guide` |
| **Confusing** | two valid answers; absurd distractors; unclear prompt | §4 unambiguous-answer + plausible-distractor rules | `distractor-plausibility`, `single-answer` |
| **Age-wrong** | too-long lines; vocab over ceiling; number over ceiling; too many pages | §2 envelope numbers | `line-length`, `vocab-ceiling`, `number-ceiling`, `page-count` |
| **Motion-dependent** | the mechanic only works with animation; reduced-motion breaks it | every clip has a `fallbackPose`; interaction solvable inert | `reduced-motion-safe` |
| **Locale-leak** | English text in a non-EN story; missing locale key; machine-translated feel | every string key covers `story.locales`; `.word.<noun>` == IMAGE_VOCABULARY singular; native-ensemble authored, never MT | `locale-completeness`, `english-leak`, `vocab-canonical` |
| **Answer-gilded** | correct option visually/positionally marked | §4 no-tell rule; shuffle order | `no-gild` |
| **Scoring-leak** | a number/score/timer/streak/"correct" appears | §3 forbidden list; celebration-only success | `no-scoring` |
| **One-point drift** | story teaches 2+ points | §2 one-point rule; split into two stories | `single-teaching-point` |
| **Asset-gap** | a referenced pose/scene/word/exercise is missing | asset worklist complete before authoring (see blueprint) | `asset-worklist-complete` |
| **Standard-overreach** | CCSS code assigned but interaction only *touches* the topic; or a PK activity carries a code | §20.8 "demonstrate not touch"; PK = readiness, no code | `alignment-honesty` |

### 6.1 Pre-school fine-motor traps (the 13 — "the hard part is the fingers")

For PK the tolerance IS the design. Each trap is a way a 3–5-yo finger fails an
otherwise-fine activity; each countermeasure is built into `sb-bands.js PK` + the
module + a gate (validator FATAL, or the `qa-storybook.js` imprecise-touch pass).

| # | Trap | What it looks like | Countermeasure (band / module) | Gate |
|---|---|---|---|---|
| 1 | **Tap target too small** | a 3-5yo can't land on it | `fatal.minTapTarget ≥200du` (≈70px); CSS inflate to ≥44px | validateTask FATAL (dot-stamp / color-code) |
| 2 | **Drag handle too small** | piece too small to grab | `fatal.minDragHandle ≥240du` | validateTask FATAL (shape-fit / complete-picture / listen-place) |
| 3 | **Snap radius too tight** | a near-enough drop/tap doesn't take | wide `nearFitSnapRadius` (220) | qa touch-PASS: wobbly-correct (0.55×tol) must complete |
| 4 | **Path band too narrow** | a wobbly trace falls off | `fatal.pathBandHalfWidth ≥110du`; forward-arc ink | validateTask FATAL + qa path-PASS |
| 5 | **Reset on miss** | a wrong move wipes progress → gives up | soft guide-back / drift-home, NEVER reset | qa touch-FAIL: page stays answerable (no dead state) |
| 6 | **Reset on lift** | a mid-drag finger lift restarts | progress persists across pointerup/cancel | qa touch-PASS runs a mid-drag lift and still completes |
| 7 | **Too many targets** | cognitive overload | `maxTaps ≤4` / `maxDrags ≤3` | validateTask FATAL |
| 8 | **All-or-nothing finish** | one missed spot blocks completion | `coverageCompletionThreshold ≤0.75` (a missed spot still finishes) | module completion math |
| 9 | **Text-only prompt** | a non-reader can't even start | audio narration REQUIRED per page | gate-story PK narration present |
| 10 | **Colour-only encoding** | meaning carried only by colour | never encode by colour alone (shape/position/label too) | design rule (author check) |
| 11 | **Motion carries the info** | reduced-motion child misses it | motion decorative only; static fallback declared | qa reduced-motion pass |
| 12 | **Muted lockout** | an audio-first task is unsolvable muted | audio-equity: muted OR ≥2 misses reveals the visual tell (`SBKit.equity`) | qa runs with `sound=off` and still passes |
| 13 | **Corridor/gap too tight** | the token can't fit through the maze | `fatal.mazeCorridorWidth ≥300du` sampled along the WHOLE route | validateTask FATAL (sb-maze) |

Feedback vocabulary (all PK modules): **progress** = the artifact visibly grows ·
**miss** = a soft wordless-then-narrated redirect, correct path stays open, never
resets · **success** = warm chime + settle-once (reduced-motion: final state +
audio only).

## 7. The one-page authoring loop (what you actually do)

1. Choose grade + teaching point (from the **curriculum ledger**, a `status:"open"` slot).
2. Choose an **arc** (§1) and the **guide** (§cast-bible) + a companion if the arc needs one.
3. Write a **blueprint** (`blueprint-format.md`): the page count (§2), per-page mechanic (§5) +
   `taskData`-or-`exerciseSpec`, narration lines (§3, within ceiling), the asset worklist, the
   teaching-point metadata, and the completion keepsake.
4. `gate-story.js --blueprint` → fix every finding per §6 → `blueprint-to-skeleton.js` → compose in
   the **Studio** → author strings (EN first; ensembles add locales per §8 of the authoring-guide).
5. `validate-story.js` (fatal gate) → `gate-story.js` (quality gate) → `qa-storybook.js` (plays +
   solves + screenshots) → **look at the screenshots, desktop first**.
6. SEO row + prose + preview webp (authoring-guide §7). Deploy (§9). Verify live.

**Definition of done** = both gates green + QA solves every page + you (or the operator) looked at the
rendered screenshots and it reads like a warm little story a 5-year-old would want again. "Tests pass +
HTTP 200" is NOT done.

## 8. Anti-patterns (learned; do not repeat)

- Padding a grade's story count with near-duplicate junk (the teaching-packages nuke, `920aebbc`).
  Honest density: a **variant** story (new theme/arc, same point) is fine; filler is not.
- Assigning a CCSS code because the topic is adjacent. Instantiate the standard or ship readiness.
- Inventing a mechanic when a native module fits. The palette grows only for a genuinely new thinking
  type (and that's an engineering commission, not a per-story act).
- Editing a protected core (`*-core.js`, `lcs-shell.*`) to make a story fit. STOP and surface — the
  adapter scale-fits; the story bends to the engine, never the reverse.
