# River Steer — kid-facing "Comparison Creek" — APPROVED DESIGN SPEC
**id:** navigate-spatial-04 · **standard:** K.CC.C.7 (compare two written numerals 1–10) · **family:** navigate-spatial · **engine:** new `engine-river-steer.js` (fork-as-round; `correctSide` DERIVED) · **runtime:** SIMPLE · **EN pilot**
**Status:** approved 2026-06-21 (6-expert ensemble; all 9 critic fixes — 3 highest-priority: commit-lock the read-back, position-flipping teaching-bump, ≥80% adjacency). Build deferred.
**also_teaches:** 1.OA.C.6 (sum-fork) · K.G.A.1 (left/right steering) · L.K.1.e.
**Shares K.CC.C.7 with "Grandpa Pip's Nesting Pots" (construct-build-12) — kept DISTINCT: Pots = whole-set SERIATION; River Steer = binary pairwise numeral compares as steering.**

## Concept & creative hook
Comparison Creek winds home to Cozy Bend; the journey IS the reward (otters/heron/waterfall). Each bend forks into TWO channels with floating number-buoys; read the prompt + buoys, steer the raft, the river inks forward on a map.
- World does real work: binary compare maps natively to a two-channel fork (left/right IS the answer). **3-way "superlative" fork CUT (fix #6):** a 3-way river = a muddy delta, fights the binary-native world, and K.CC.C.7 = compare TWO.
- **Captain Quill** (fix #7): an over-confident duckling who **self-corrects out loud** — his voice carries the read-back as a metacognition-modeling beat ("Six! …wait, let me check. …yes, six is bigger."). Cap grows to fit on forks ATTEMPTED (cosmetic, fix #8). Renamed from Pip (avoid Grandpa-Pip collision).
- **Wind-vane confirm COMMIT-LOCKED (fix #1, top priority):** tapping a channel COMMITS; the vane then reads back the CHOSEN number as confirmation of a decision already made. You CANNOT tap one channel to hear its number then the other before deciding — kills the "beat it by ear" oracle (an auditory child winning without reading a numeral).
- No-shame: **Buckley the beaver** = a FRIEND (gently props the raft back, soft bonk, no sad sound).
- Anti-generic: far-apart pairs (2v9) = eyeball-by-size, not numeral-reading → onboarding-only, never scored. Heart = ADJACENT numerals (6v7, 8v9).

## Core loop & the 8 distinct experiences
**Fork loop (one fork = one round):** drift to bend → two channel buttons w/ DOM buoys → Quill speaks the prompt (alternates bigger↔smaller + experience-types) → child taps (COMMITS) → vane read-back → resolve. First-try correct = bloom + smooth scenic drift + map inks + `ctx.correct()`. Wrong = choppy bump + `ctx.wrong()` (no penalty) → **POSITION-FLIPPING teaching-bump (fix #2):** Quill re-states "7 is more than 4" AND the channels SWAP positions → the child must RE-READ to find which channel now holds 7 (not just "steer the other way"). Left/right slip → nudge steering not math. Per-pass `nextTask` reshuffle.

Distinctness = change in RENDER / RESPONSE-MODE / CONCEPT, not just the prompt word (fix #4; within an experience the pair + bigger↔smaller rotate as legit coverage):
| Band | Experience | Distinct because | Standard |
|---|---|---|---|
| B3 | Steer-compare (bigger↔smaller) | core read-two-numerals-steer | K.CC.C.7 |
| B1 | Dot-compare | dot-sets (count not read) | K.CC.C.6 scaffold |
| B1 | Rosetta-translate | numeral vs dot-set (symbol↔quantity) | C.6↔C.7 bridge |
| B6 | Sum-fork | compute then compare/match | 1.OA.C.6 |
| B5 | Productive name-it | GENERATE the relation (cloze, un-guessable) | K.CC.C.7 |
| B4 | Tie / equals | recognize SAME → teaches = | K.CC.C.7 (=) |
| B4 | Size-decoupled buoy (NEW) | big "3" vs small "8" — read value over print-size (attacks digit-shape≠value) | K.CC.C.7 |
| B5 | Betweenness micro-fork (NEW) | "which is BETWEEN 4 and 6?" — different relation | K.CC.C.7 ext |

Bands AUTHORED/linear, NOT performance-adaptive (fix #8): B0 learn-to-steer (dots far-apart, FREE, never scored) → B1 → B2 numerals-far (free taste) → **B3 ADJACENT (the HEART, gated)** → B4 → B5 → B6. **Free slice = B0 + one B2 taste + ONE B3 adjacent fork w/ a productive beat** (proves the real skill).

## Win-states & juice (no competition)
No score/timer/streak/fail. Reward = the journey (scenic drift + map inks). **Juice-asymmetry:** first-try correct = long smooth scenic glide + new vista; wrong = short choppy PLAIN bonk (no candy on the wrong path). Anti-farm: bump plain+short + the position-flip means a guess buys a forced re-read, not a second blind 50%. Full-pass keepsake = rotating Creek postcard → GameCollection. Playtest FIRST: bonk-vs-drift feel + "do kids farm the dam?" + "does the vane get old?" (fix #5/#9). CSS/WebAudio; mute + reduced-motion.

## Pedagogy
- K.CC.C.7 instantiated; commit-locked read-back + position-flip bump close the by-ear and guess-then-told paths.
- STACKED anti-guess: (1) **ADJACENCY-SPINE ≥80% scored B3+ diff-1** (fix #3 — the single most important decision; far-apart onboarding-only, ≤20% diff-2); (2) prompt alternation; (3) side/position balance; (4) position-flip bump; (5) un-guessable productive beat; (6) commit-locked read-back; (7) juice-asymmetry no penalty.
- Dot-sets = C.6 scaffold (not a guess-defense); Rosetta bridge; numerals = the C.7 spine.
- Misconceptions: digit-shape≠value (size-decoupled experience attacks it), ignore-prompt-always-bigger (alternation), left/right slip (nudge steering).
- No-test assessment = first-try steers on ADJACENT forks + productive responses (parent-invisible, gates nothing).
- Accessibility: numbers/prompt ALWAYS DOM; TTS = prompt + committed read-back + teaching-bump; clamp(34,12vw,64); channels full-stage-height (≥36px ×many).

## Interaction & UX
- `engine-river-steer.js` fork-as-round; `deriveCorrectSide(rule,channels)` = only source of the answer. Commit-locked tap → vane → resolve (no drag). CSS transform-drift (no offset-path/loop, transitionend-chained); per-round `translateY` river-slide on a **FIXED-HEIGHT stage** (fix #9 — no iframe-resize thrash). Vane spin <0.4s, skippable on 2nd tap, read-back non-blocking. Custom `renderVessel` (river-map) still emits `.lcs-vessel-pip.filled`. Mobile @280: two ~132×160 channels + clamp numerals — **wireframe the 280px vertical budget BEFORE build** (channels+boat+vane+prompt+hear-it+vessel coexist); pass `audit-game-mobile`.

## Visual & art direction
Direction-A (cream #FBF3E4 / teal #146B5E / coral #F2784B; Baloo 2 + Nunito). Captain Quill (3 cap sizes, over-confident-self-corrector); Buckley (idle/bump). Words ALWAYS DOM. Stub-first: raft/otter/heron/beaver=`creature`, dam/glint=`tile`/`food`, scenes=`scene`. CA5 ≈ raft paddle×6/glide×4/bump×2/cheer×3 + otter idle×4/wave×3 + heron lift×3 + beaver idle×2/bump×2 + 3 scene plates + 3 cap sizes. Vessel/drift/glint/bloom/bump/vane-spin/map-ink = CSS/WebAudio.

## Runtime mapping + MEASURED build-gate + PER-LOCALE
- Fork descriptor: `{promptKey:'bigger|smaller|sum|equals|tie|nameMore|between|sizeDecoupled', promptArgs, channels:[{value, render:'numeral|dots|sum', printScale?}], rule, scene}`. `correctSide` derived; `printScale` decoupled from `value` by construction.
- **`verify-river-steer-core.js` (MEASURED; HALTS build):** (1) unique-determinacy; (2) **adjacency ≥80% scored B3+ diff-1** (fix #3); (3) prompt-alternation balanced; (4) side/position balance (incl. printScale ⊥ correct side); (5) **BLIND-SOLVER SIM discriminating (fix #6):** model every fixed non-reading strategy (always-left/right/bigger/smaller/random) AND **the by-ear strategy** (under commit-lock can hear only ONE number → degenerates to random; if it ties the reader, the read-back leaks → FAIL); model the position-flip bump honestly; require reader **≥1.5× fewer steps** than the best fixed strategy; (6) **distinct-signature on {renderType,responseMode,channelCount}** (NOT promptKey, fix #4) ≥7; (7) productive-beat presence (scored + free); (8) no-penalty invariant (ctx.wrong, position-flip present); (9) values∈1..10. Plus standing gates (mobile/variety/no-competition/SEO).
- **PER-LOCALE — cheap RENDER + a modest AUTHORED-SENTENCE layer (fix #7, honest):** numerals universal → no numeral art. But NOT "closed-set + TTS only": (a) **bigger(magnitude) vs more(cardinality)** lexicalize differently per locale → separate promptKeys via the §A.13.48 3-agent native ensemble (K-3 EDUCATOR included) — wrong choice teaches the wrong frame; (b) the **teaching-bump comparative sentence** ("7 is more than 4") = a per-locale authored, native-reviewed template (comparative + number agreement), not string-interpolation. Single-digit cardinal TTS = safest TTS load. Far cheaper than grammar, honestly classified.
- Feasibility: SIMPLE — one engine + DOM/CSS/WebAudio + ~30 frames. Stub-first; tune bonk-vs-drift + vane BEFORE wiring the pool.
