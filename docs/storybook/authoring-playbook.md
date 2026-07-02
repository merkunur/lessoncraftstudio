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

## 2. Per-grade envelope (hard numbers — the gate enforces these)

| Grade | Age | Pages | Narration: max words/line · max lines/page | Sentence shape | Vocab ceiling |
|---|---|---|---|---|---|
| **PK** | 3-4 | **3–4** | **6 words** · 1 line | one clause, present tense, concrete noun | pre-reader: spoken-only, picture-carried |
| **K** | 5-6 | **4–5** | **8 words** · 2 lines | one simple sentence | high-frequency + the target word |
| **1** | 6-7 | **5–6** | **12 words** · 2 lines | one sentence, may have "and"/"because" | decodable + 1–2 new nouns |
| **2** | 7-8 | **6–8** | **16 words** · 3 lines | up to two sentences | grade-appropriate; define new terms in-line |
| **3** | 8-9 | **6–8** | **20 words** · 3 lines | two sentences, one subordinate clause OK | richer; still concrete-first |

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

**Prompt patterns by mechanic** (fill `{…}`; keep within the grade word ceiling):
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

**No free keyboard typing anywhere** (tap/drag only — hard platform rule; keypad number-bond modes are
rejected by the module). All taps ≥112 design units.

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
