# Sentence Surgeon — kid-facing "Dr. Plume's Sentence Clinic" — APPROVED DESIGN SPEC
**id:** repair-restore-04 · **standard:** L.2.1 (Grade 2 grammar/usage in writing OR speaking) · **family:** repair-restore · **engine:** new `engine-fix-it.js` (multi-action sentence-editing) · **runtime:** SIMPLE · **EN = engine-proving pilot**
**Status:** approved 2026-06-20 (6-expert ensemble; all 7 critic fixes applied — 2 non-negotiable: rounds-by-ACTION + diagnose-gate-as-grammar-judgment). Build deferred.
**also_teaches:** L.1.1.c (subject–verb agreement) · L.1.2.a/b (capitalization, series commas) · L.K.1.F (complete sentences) · L.K.2.b (cap first word/"I").

## Concept & creative hook
A cozy treehouse **checkup nook** with **Dr. Plume**, a gentle grandmother-owl. Sentences arrive "a bit muddled — not quite themselves"; the child helps each one "sound right again."
- **World reframed (critic fix #7):** drop ALL surgery/operate/scalpel/patient-under-blanket/bandage language (anxiety-native register). Warm *feel-better* checkup. Error cue = a soft **thinking-glow** (not a bandage). Progress = a gentle **sounds-right pulse** that only ever climbs. Keeps Designer B's "grammar = clear sound" via reliable whole-sentence TTS (muddled→clear) + a VISUAL per-word cue — never fragile per-word audio.
- ONE character (Dr. Plume). No-shame structural: meter can't flatline; wrong move = sentence **giggles**; wrong diagnosis = "that one's alright — look/listen again," never red/"wrong."
- **Anti-generic:** (1) the repair affordance doesn't exist until correct diagnosis (blind-swap impossible); (2) Dr. Plume performs genuinely DIFFERENT repairs (capital hat / new ending / missing word / reorder / removal / split) — a real grammar workshop, not one swap ten times.

## Core loop & the 7 distinct rounds (= 7 distinct ACTIONS)
**DIAGNOSE → REPAIR → "sounds right".** Listen/look first (sentence NEUTRAL on entry — first diagnosis is a genuine judgment, critic fix #2). DIAGNOSE: tap troubled word/gap/seam; healthy tap → "that one's alright!" (no penalty); correct → trouble named by CATEGORY (never pointing) → repair affordance appears; **wrong diagnosis brings the thinking-glow as EARNED scaffold** + kid-rule. REPAIR: every attempt reads the whole sentence aloud (wrong = muddled + giggle + undo; correct = clear + smile + pulse climbs + auto-advance). Teaching rides on every correct outcome. **No hidden assessment** (critic fix #3) — bands are a structural ramp reached by everyone, never gated.

Distinctness = the ACTION the child performs (critic fixes #1/#4); grammar content rotates within each for replay:
| Band | Round (ACTION) | Child DOES | Content | also_teaches |
|---|---|---|---|---|
| 1 | Capital Hat (mark-toggle) | tap the word needing a capital → grows a hat | sentence-start, "I", names, days | L.K.2.b, L.2.1 |
| 1 | Add the Mark (insert-punct) | drop comma/period into a visible gap slot | series comma, end mark | L.1.2.b |
| 2 | New Ending (swap-form) ★ | find wrong-FORM word, pick right form from same-lemma chips | agreement, reg/irreg past, reg/irreg plural, reflexive | L.1.1.c, L.2.1 |
| 2 | Fill the Gap (insert-word) | visible empty slot; choose the word that completes the sentence | missing verb / completeness | L.K.1.F, L.2.1.f |
| 3 | Put It in Order (reorder) | drag jumbled words into a proper sentence | word order | sentence formation |
| 3 | One Too Many (delete) | find the word that doesn't belong; tap to remove | double subject, extra "to", repeat | usage / L.2.1 |
| 3 | Two Sentences (split run-on) | tap the seam where two sentences collide → period + capital | run-on → two sentences | L.2.1.f |

Diagnosis is a grammar judgment per action. For "looks-weird" content (runned/mouses/hisself), New Ending adds an optional **2-tap category diagnosis** ("wrong TIME / NUMBER / NAME-word?") so visual-oddness can't clear the gate. Same-lemma distractors only; debatable cases (descriptive adverb, Oxford comma) retired to a reviewed reserve. Banding = structural ramp, reshuffle within band via `nextTask`. **Free slice = 3 distinct actions:** New Ending + Fill the Gap + Put It in Order (proves breadth, not a trivial cap).

## Win-states & juice (no competition)
No timer/score/streak. The sounds-right pulse only climbs (score-substitute). Read-aloud heal = the core payoff (the sentence reads itself clear & proud). Get-Well Jar vessel fills (non-numeric). Per-round "Healthy-Sentence" badge; full-pass clinic album page → cross-game GameCollection. All CSS/WebAudio; mute + reduced-motion honored.

## Pedagogy
- L.2.1 instantiated by the diagnose gate (locating the violation = command) + action-appropriate repair; different actions demand different grammar reasoning.
- **Ear = SCAFFOLD, not spine** (critic fix #6): locale-neutral spine = VISUAL editing + rule-naming; audio optional per locale; fully playable audio-off.
- Hints teach by category (kid-rule), never point. Misconceptions targeted: over-regularization, reflexive over-gen, plural-possessive, cap-as-decoration, run-ons, double-subject.
- No-test "assessment" = observable behavior (diagnose-before-repair, self-correct on the clear read, transfer to a fresh sentence) — warm observations, never a grade/gate.
- Accessibility: TTS sentence+per-word+options; ≥44px; picture/context cue; tap-primary; not color-only.

## Interaction & UX
- `engine-fix-it.js` = multi-action sentence-editing state machine (DIAGNOSE→REPAIR→DONE) with modes capitalize-toggle / swap-from-tray / insert-into-gap / reorder / delete / split-seam. Repair affordance not rendered until correct diagnosis → forbids blind-swap. Tap-primary; drag (reorder/swap) through the same validator.
- Chip-LOCAL selection + thinking-glow (ride with chips through flex-wrap + textContent swap; NOT absolute overlays).
- **Mobile @280–768 (critic fix #5):** vertical stack; ≥44px chips; **sentences ≤7 words (≤6 for insert/reorder)** → ≤3 wrapped rows at ~216px iframe-inner; **insert rounds use visible in-flow gap drop-slots** (never between-chip insertion across a wrap boundary). Pass `audit-activity-mobile.js` on reorder+insert rounds specifically + `audit-activity-variety.js` (≥7 distinct actions + nextTask reshuffle).

## Visual & art direction
Direction-A (cream #FBF3E4 / teal #146B5E / coral #F2784B; Baloo 2 + Nunito; warm treehouse-nook). Words ALWAYS DOM (per-locale content never touches art). Stub-first: CSS-owl, word-chips, gap-slot, pulse-meter, Get-Well Jar. CA5 worklist: Dr. Plume ~4 poses (idle/examine/help/cheer ≈12–14 frames) + sentence "smile" state; pulse-meter/jar/glow/gap-slots = CSS/WebAudio (no art).

## Runtime mapping + PER-LOCALE
- `engine-fix-it.js` locale-neutral (never contains a sentence); consumes pre-tokenized rounds; generalizes to a whole L-strand "edit-the-sentence" family.
- Round-descriptor: `{id, action:'capitalize|swap|insert|reorder|delete|split', tokens[], targetIndex|gapIndex|seamIndex, replacement?, distractors?:[same-lemma], covary?:[{index,form}], convention, tts:{muddled,clear}, display}`. `covary` (critic fix #6) lets one edit force agreeing tokens (es gender, de/fi case) — built day one. Per-locale round files; `makeRounds(locale)`.
- **PER-LOCALE (honest scoping, critic fix #6):** reusable = engine/UI/edit-modes/scaffold/TTS-plumbing. Natively authored per locale = sentence sets + error TAXONOMY per NATIONAL framework (NOT CCSS-translated) + distractors (real native-kid errors) + audio. AND de/es/fi need NEW edit-actions/co-variation (es gender co-vary; de V2+case; fi agglutination = suffix-edit, no reliable ear) — so the claim is "one engine + covary/suffix-edit capability, but de/es/fi require additional native-authored edit-modes," via the §A.13.48 3-agent native ensemble citing each national framework (§20.10). Highest per-locale cost in the program AND its biggest moat. EN proves the engine first.
- TTS honesty: author muddled/clear strings VERBATIM; visual is PRIMARY cue; never promise per-word audio; NSR-FLAG weak-voice locales; playable audio-off.
- Feasibility: SIMPLE. Build-staging: ship swap+insert+capitalize first, add reorder/delete/split in a depth wave — but the DESIGN ships all 7 actions so the variety bar is met honestly.
