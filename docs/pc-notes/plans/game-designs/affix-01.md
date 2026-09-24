# GAME 64 — "THE KNOWING MACHINE" · L.2.4.b prefix-meaning (primary) + L.2.4.c suffix (also_teaches) · EN pilot · NEW FAMILY (affix-morphology — the Game-53 compound companion)

## Status: DESIGN COMPLETE — 6-expert ensemble closed (R1 4 agents → R2 CC synthesis → R3 adversarial critic NEEDS-REWORK → all fixes baked → 2 forks operator-resolved). Catalog source `gapfill-15`. Signature engine `engine-affix.js` + `affix-core.js` (0 protected-core lines). EN pilot, non-EN 404-by-design.

## Context — why this game, why now
The affix-morphology family is genuinely **unowned** (verified against the LIVE activities + mini-tools per the Game-59 rule, not the policy-note prose): no game/activity does affix-meaning. Game 53 ("Skip's Word-Welding Yard", L.2.4.d) owns COMPOUND head-modifier composition (sun+flower = two CONTENT words in a variable relation). This game owns the **categorically distinct** cognition: an affix is a **bound MEANING-OPERATOR** (a fixed-meaning function), not a content word — predict a NEW word's meaning by applying the affix's fixed semantic TRANSFORM to a known root. It is the deliberate **morphology companion to Game 53** (a pair like area-54/perimeter-55), and it is **non-story** — chosen for variety (3 of the last 6 games were story-graph RL games; this is the engine break).

**Forks resolved by operator (this session):**
- **un-REVERSE CUT for the EN pilot** → four CLEAN single-sense operators: **un-=NOT · re-=AGAIN · -ful=FULL OF · -less=WITHOUT**. Removes the one-glyph-two-meanings confusion + the POS-routing cheat. un-REVERSE (unlock/untie) returns in a v2 with its OWN distinct "undo-loop" glyph, proven on the simpler version first.
- **§A.13.60 count = 2 cognitions + content-variety waiver** (apply + which-affix; the cohort-honest precedent — Games 52/57/61/63 all waived). `affix-for-meaning` is dropped as a *cognition claim* (it's the forward/inverse pair of `apply`).

---

## §1 — Concept / world
**Marigold the tinkerer mole** runs a brass contraption — **the Knowing Machine**. A plain ROOT word rides in on a belt; the child drops an **affix-COG** into the machine; the machine *turns the meaning* and the child predicts what the new word now MEANS. The four cogs render as **operator-GLYPHS, never object-pictures** — this is the Game-53 fence made structural: an affix has no referent, so it must never look like a thing.
- **un- = a flip-arrow cog** (NOT — flips the meaning to its opposite)
- **re- = a rewind-loop cog** (AGAIN — sends the action back round)
- **-ful = a brimming-cup cog** (FULL OF)
- **-less = an empty-cup cog** (WITHOUT)
- **Twin-opposites** make the operator-ness tangible: un↔re (flip vs go-again), -ful↔-less (full vs empty).
- **`GameCollection`** = Marigold's shelf of finished **"knowing-jars"** (a warm abundance vessel — never a count, never a score; the jars just accumulate as a cozy backdrop).
- Warm, no-shame: a wrong pick → the machine gently **"shows what the cog does"** (the post-commit teaching reveal) and lets the child try again. No buzzer, no fail-state.

## §2 — The standard + the load-bearing cognition
**CCSS L.2.4.b (primary)** — determine the meaning of the new word formed when a known PREFIX is added (happy/unhappy, tell/retell). **L.2.4.c (also_teaches)** — a known root + a suffix (-ful/-less). ONE game, prefix-led, suffix rounds folded in (pedagogy ruled: not split).
**Load-bearing cognition:** predict a word's meaning by **applying the affix's FIXED SEMANTIC TRANSFORM to a known root** — un-=NOT, re-=AGAIN, -ful=FULL OF, -less=WITHOUT.
**The forcing test:** *does swapping the affix change the correct answer?* (helpful vs helpless → yes.)
**The cheat-test:** can the child win WITHOUT applying the affix's meaning — by root-only / affix-as-spelling / familiar-retrieval / visual-transform-match / **paraphrase-template gloss-keyword** match? If yes → a cheat. All six are closed by §4.

## §3 — Mechanic / modes / child actions (honest 2 cognitions + content-variety waiver)
- **Mode A — APPLY (the core action).** An affixed word rides in (e.g. **"thankful"**); the machine shows the **-ful brimming-cup cog** turning; the child taps the **MEANING** from 3 DOM-`<text>` options. *Cognition 1.*
- **Mode B — WHICH-AFFIX (transform discrimination).** A target MEANING is shown ("the cup is full of color"); two cogs are offered (e.g. **-ful vs -less**, or **un- vs re-**); the child taps the cog that produces it. A genuinely different ACTION — compare two operators rather than apply one. *Cognition 2.*
- **Content-variety waiver (§A.13.60):** ≥7 content-distinct rounds across the two modes, varying the **root AND the affix-family** (not one root re-skinned with four cogs). Order-only reshuffle via the wrapper `nextTask` hook (NOT `lcs-shell.js` — protected). Reference: the fractions-activity `shuffledOrder`+`nextTask` pattern. Gate: `audit-activity-variety.js` 2-pass probe (≥7 distinct, pass-2 ≠ pass-1 same-set).
- **No Check button** — `ctx.correct()` auto-advances; a wrong tap triggers the teaching reveal + retry (`ctx.advance()` neutral). Tap only (no drag — 280px).

## §4 — Anti-cheat architecture (THE deepest flaw + the gate)

### §4.1 The deepest cohort cheat (critic, one level below the obvious) — the PARAPHRASE-TEMPLATE / GLOSS-KEYWORD cheat
A naive oracle emits each meaning as a **templated paraphrase** (NOT→"not X", AGAIN→"X again", FULL_OF→"full of X", WITHOUT→"without X"). Every correct answer then carries a **syntactic fingerprint that maps 1:1 onto the affix glyph the child can SEE during the pick** → a child (or a `PARAPHRASE_TEMPLATE_SOLVER`) matches **affix→gloss-keyword** ("un"→the option starting with "not"; "-less"→"without…"; "re"→"…again"; "-ful"→"full of…") with **zero meaning comprehension**. The three locked solvers (root-only, wrong-transform, familiar-retrieval) are BLIND to it. **And the obvious fix — "vary the phrasing" — destroys the build-gate** (`MEANING_DERIVED_FROM_TRANSFORM_NOT_STORED`): a varied paraphrase ("open what was shut") can't be computed by `applyTransform`, so it must be hand-stored, which the gate rejects. The computed-oracle and the cheat-defense are in direct contradiction.

### §4.2 THE FIX — tuple-layer / rendering-layer split
1. **Oracle computes a SEMANTIC TUPLE, not a gloss string.** `applyTransform(transform, root)` → e.g. `{op:'negate', base:'happy'}` · `{op:'repeat', base:'tie'}` · `{op:'full_of', base:'color'}` · `{op:'without', base:'fear'}`. The gate's `MEANING_DERIVED_FROM_TRANSFORM_NOT_STORED` asserts the **tuple** is computed from the transform (a hand-stored tuple is ignored + fails). Stays honest — the tuple IS derived.
2. **A separate per-item `phrasings[]` table renders each tuple → surface text, ≥3 distinct NON-FRAME realizations per tuple, chosen at RANDOM per round.** e.g. `{negate, happy}` → {"sad — the opposite of happy", "not feeling happy", "the un-happy feeling"}; `{full_of, color}` → {"covered all over in color", "with lots of color", "color everywhere"}. The leading word of the correct phrasing is **NOT a function of the affix**.
3. **Distractors drawn from the SAME phrasings pool of OTHER tuples** (the wrong-transform foil + the root-only foil), so a "not…", a "without…", and a "full of…" string co-occur across affix targets → the frame no longer identifies the affix. (un-NOT's correct answer may be "sad" with no "not" at all.)
4. **`PARAPHRASE_TEMPLATE_SOLVER` runs against the RENDERED surface** (the load-bearing detail the brief missed) — a fixed affix→gloss-frame-keyword map picking the frame-matching option — and **MUST score at chance**.

### §4.3 The locked distractor model + plausibility (critic Flaw 3)
`buildMeaningOptions` ALWAYS seeds (i) the **root-meaning distractor** (root-only fails) + (ii) the **wrong-transform distractor** = a different affix's transform on the same root, drawn ONLY from a per-root **`legalAffixes[]` whitelist** (so the foil is a real, tempting word — not a nonce "re-happy"). Correct ∉ index-0. Items with no second legal affix are INELIGIBLE for Mode A and run in Mode B instead (the gate REJECTS items that silently degrade to 2-way). Assert `WRONG_TRANSFORM_DISTRACTOR_IS_PLAUSIBLE`.

### §4.4 Other closed cheats
- **Visual-transform-match** (both designers' biggest-risk; = Game-63 eye-equalize): the answer surface is **MEANING-PHRASES in pure DOM `<text>`, zero icons/arrows/cup imagery**; the affix cog-glyph is the affix-IDENTIFIER visible during the pick but carries NO answer-cue; the steam-picture teaching reveal renders ONLY after commit, never in the option region. Assert `OPTION_REGION_CONTAINS_NO_SVG_TRANSFORM_GLYPH`.
- **Familiar-retrieval** (Game-53 lineage): load-bearing wholes are NOVEL vs a real **Grade-2 frequency list** (not just "unattested in the item table"); the 1–2 familiar anchors (unhappy, redo) are tagged `anchor:true` and EXCLUDED from the load-bearing count. Assert `LOAD_BEARING_ROUNDS_NOVEL_WHOLE` (frequency-checked) + `ROOT_IS_KNOWN_WHOLE_IS_NOVEL`.
- **TTS-by-ear** (own MEMORY RF.K.2.c finding): TTS reads the ROOT and the MEANING-PHRASES only — NEVER the affix in isolation (spoken as a letter-name) and NEVER the affixed whole pre-commit (= the answer by audio). Assert `TTS_NEVER_SPEAKS_AFFIXED_WHOLE_PRE_COMMIT`.

### §4.5 The MEASURED build-gate `verify-affix-core.js` (window-shim idiom — drives the REAL core)
- **AFFIX_TRANSFORM_ORACLE** → 100% (computes the tuple; renders a legal phrasing).
- **MUST-FAIL solvers (all at/below chance):** `ROOT_ONLY_SOLVER` · `WRONG_TRANSFORM_SOLVER` · `FAMILIAR_RETRIEVAL_SOLVER` · `PARAPHRASE_TEMPLATE_SOLVER` (against the rendered surface) · `BRUTE_TAPPER` / FIRST / RANDOM.
- **Structural asserts:** `MEANING_DERIVED_FROM_TRANSFORM_NOT_STORED` (mutation test: flip the transform → the tuple AND the rendered correct meaning change) · `AFFIX_CHANGES_THE_ANSWER` (the root-meaning distractor is present AND ≠ correct) · `WRONG_TRANSFORM_DISTRACTOR_PRESENT` + `WRONG_TRANSFORM_DISTRACTOR_IS_PLAUSIBLE` · `PARAPHRASE_FRAME_NOT_AFFIX_PREDICTIVE` (no transform's correct phrasing leads with its gloss-keyword > 1/N) · `OPTION_REGION_CONTAINS_NO_SVG_TRANSFORM_GLYPH` · `LOAD_BEARING_ROUNDS_NOVEL_WHOLE` (frequency-checked) · `ROOT_IS_KNOWN_WHOLE_IS_NOVEL` · `AFFIX_TRANSFORM_FAMILIES_COVERED` (all four: negate/repeat/full_of/without) · `TTS_NEVER_SPEAKS_AFFIXED_WHOLE_PRE_COMMIT`.

## §5 — §A.13.60 distinctness
Honest **2 distinct child-actions** (APPLY + WHICH-AFFIX) + the **content-variety waiver** (≥7 content-varied rounds, root × affix-family varied) + the order-only `nextTask` reshuffle. Cohort precedent (Games 52/57/61/63). NOT padded with the dropped `affix-for-meaning` (forward/inverse of APPLY) or `strip-the-root` (an RF spelling-drill — dropped per pedagogy). `audit-activity-variety.js` 2-pass probe is the gate.

## §6 — Visual / interaction / a11y
Direction-A (cream #FBF3E4, teal #146B5E, coral #F2784B; Baloo 2 + Nunito; dual-shadow card ~720px). Brass-machine + belt; the four cogs as flat operator-glyphs. Stub-first (CSS/SVG placeholders) → operator CA5 art for Marigold + the machine. Roots/affixes/meaning-options ALWAYS real DOM/SVG `<text>` (never baked art — 11-language ready). 280px→desktop; ≥44px targets; tap not drag; full keyboard (tab/enter the cogs + options) + screen-reader (the affixed word, the active cog's meaning, and each option announced as text); reduced-motion (the machine "turn" + steam reveal honor it); mute-safe (TTS optional support, never load-bearing).

## §7 — Per-locale
**EN pilot ONLY; non-EN 404-by-design** (resolveActivitySlug→null→notFound; the cvc/sight-word precedent). Affixes are HEAVILY language-bound. Native feasibility-scan per locale at fan-out (§A.13.48 ensemble): **Germanic likely fan-able** (de un-/-los/-voll, nl on-/-loos/-vol, Nordic u-/-løs/-fuld) — but each needs its own affix set + its own `phrasings[]` table (per-locale authored, real fan-out cost). **Romance (es/it/pt/fr) + Finnish DEFER** (prefix/suffix semantics + Finnish agglutination diverge; the Game-53 precedent). Scope the `phrasings[]` authoring cost before any non-EN commitment.

## §8 — Build artifacts / signature architecture
- **NEW** `mini tools/engine-affix.js` + `mini tools/affix-core.js` (0 lines to any of the 5 protected cores; `git diff --stat` on the cores = empty is the regression proof). Game-53's compound-core is the direct structural template.
- **NEW** `scripts/verify-affix-core.js` (the §4.5 MEASURED gate; window-shim drives the real core).
- **NEW** `scripts/local-test-affix.js` (the EN render/interaction/280-768 mobile probe + `audit-activity-mobile.js` 8/8).
- Wrapper: a new `affix-apply` + `affix-which` template on the engine; `nextTask` reshuffle; `poolSize` counts the round pool (the standing new-shape DoD).
- Reuses shared `game-shell.js` (`ctx.correct()` auto-advance; `GameCollection` knowing-jars vessel).
- Manifest row in the engine's `*-activities.json`; register the engine in `frontend/lib/activities.ts MANIFEST_FILES` (the BUILD-FAILING preflight gate, `preflight-activity-routes.js`).
- **DESIGN-ONLY for now** — no code is written; everything stays LOCAL until the ~300-game set is ready. Persist this spec to `game-designs/affix-01.md` at closeout.

## Cohort doctrine this game adds
**The tuple-layer / rendering-layer split** — when a game's answer is a MEANING and the oracle must COMPUTE it (to stay un-stored), a templated gloss re-introduces a syntactic keyword that maps 1:1 to the operator (the keyword-proxy reborn, Games 61/62 lineage). The fix is to compute a **semantic tuple** (keeps the oracle honest) and render it through a **per-item ≥3-realization non-frame phrasings table chosen at random**, with the de-cheating solver run **against the rendered surface, not the tuple**. Generalizes to any future "pick the meaning" game where a computed answer would otherwise carry a structural fingerprint.
