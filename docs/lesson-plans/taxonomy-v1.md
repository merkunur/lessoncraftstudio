# Phase 1 audit — Pedagogical learning-target taxonomy v1

**Audit scope:** the 3-level taxonomy (domain → strand → target) keying space for K-3 multilingual classroom teaching packages. Distinct from `topics-taxonomy.json` axis-keys (which key on mechanics/themes/levels). Machine-readable companion: `frontend/config/learning-targets.json` (canonical; Phase 2 tooling consumes this directly).

**Operator-ratification status:** Pending Phase 1 surface gate. CC + curriculum-validation agent have produced this v1 draft; operator's go-ahead at the gate locks it (or applies revisions surfaced below) before Phase 2 schema work begins.

## 1. Audience scope (load-bearing)

K-3 multilingual classrooms — international schools, dual-language programs, bilingual European schools, and similar contexts where children ages 3-7 learn in or alongside languages other than the dominant local language. Across 11 platform locales (en/de/fr/es/pt/it/nl/sv/da/no/fi).

This audience scope shapes the taxonomy in three ways the curriculum-validation agent specifically flagged:
- **Receptive-vs-productive language asymmetry.** Kids understand vocabulary months before they can produce it. Receptive targets (`point-to-named-X`) need to coexist with productive targets (`identify-and-name-X`) so package authors can match the lesson aim to the kid's developmental window.
- **Phonics-system divergence across language families.** English-CVC pattern, Romance syllabic, Finnish 1:1 grapheme-phoneme, German V-vs-VV length distinction — these are different decoding systems. The phonics-decoding strand below is currently English-CVC-shaped (CCSS-aligned); Phase 2+ should add language-family parallels when targeting non-English locales.
- **Cultural-content sensitivity.** Body parts, family members, foods, clothing — all valid universal targets but locale-authored differently. The taxonomy NAMES the category and count; the package author chooses culturally-appropriate exemplars at authoring time.

## 2. Framework alignment references

Targets cite alignment with established K-3 curriculum frameworks. Citations are illustrative, not prescriptive — package-authoring tooling does NOT validate alignment.

- **CCSS** — US Common Core State Standards, K-3 ELA + Mathematics
- **EYFS** — UK Early Years Foundation Stage, Early Learning Goals
- **IB PYP** — International Baccalaureate Primary Years Programme (3-7 ages, transdisciplinary themes)
- **Cambridge Primary** — early stages
- **EU Reference Framework** — early childhood frameworks (generalized)

## 3. Domain structure

Five domains:

1. **Early Literacy** — phonological awareness, letter recognition, phonics, vocabulary, spelling, reading comprehension. **Vocabulary-acquisition strand contains the MVP slice for Arc 1.**
2. **Early Numeracy** — counting, number sense, addition/subtraction, place value, measurement, geometry, data
3. **World Knowledge** — living things, environment, community, time, materials
4. **Cognitive & Executive Function** — pattern recognition, sorting, logical reasoning, memory & attention
5. **Fine Motor & Visual-Spatial** — handwriting, drawing, spatial reasoning, visual discrimination

## 4. Current target count

**~158 leaf targets** (post-spot-fix revisions) distributed across 5 domains × 4-7 strands per domain. The operator's spec called for ~200 — see §6 for the curriculum-agent-recommended additions that would land final count at ~200 if operator ratifies them.

## 5. MVP slice — vocabulary-acquisition strand

The Arc 1 first authored package lives in `early-literacy → vocabulary-acquisition → identify-and-name-10-farm-animals`. The strand contains 18 productive targets + 6 receptive parallels (added post-curriculum-agent revision):

**Productive vocabulary targets (the kid produces the label):**
- Categorical: farm animals, zoo animals, pet animals, fruits, vegetables, foods, body parts, clothing, vehicles, house rooms, school objects, weather words, action verbs, emotions, family members
- Lexical: color words, size-comparison words, spatial-position words

**Receptive vocabulary targets (the kid points to the named target):**
- point-to-named: farm-animal, zoo-animal, body-part, clothing-item, vehicle, color

**MVP slice agent verdict (curriculum agent):** "The vocab-acquisition strand and `identify-and-name-10-farm-animals` are defensible as the proof-of-concept. Farm animals are a defensible first package: highest image-library coverage in your corpus, lowest cultural-variation risk (cow/sheep/pig/chicken read across all 11 locales), strong cross-mechanic composability per the exercise-palette doc."

## 6. Curriculum-agent critique — surface gate items

The K-3 early-childhood-curriculum review (general-purpose agent prompted with CCSS / EYFS / IB-PYP / Cambridge frameworks) returned the following critique. CC has applied **all surgical citation/structural fixes** and **flagged the larger structural additions for operator ratification** at the Phase 1 surface gate.

### 6.1 Already applied (post-revision; folded into v1)

- ✅ Dropped `identify-and-name-body-parts` mis-citation (was `CCSS.RL.K.4` — that's about asking/answering questions about unknown words in a text; wrong frame)
- ✅ Fixed `identify-and-name-action-verbs` citation (was `EYFS.ELG.LL`; corrected to `EYFS.ELG.UW` to match other naming targets)
- ✅ Added `EYFS.ELG.UW` parallel to `identify-and-name-emotions` (kept PSED citation as PSED is also valid)
- ✅ Reframed `identify-symmetry-line` description and dropped `CCSS.4.G.A.3` citation (Grade 4 standard; outside K-3 range — kept informal Grade 2 framing)
- ✅ Fixed `use-before-after-vocabulary` citation (LL → UW)
- ✅ Dropped `complete-analogy-image-pair` ungrounded EYFS.ELG.LL citation
- ✅ Dropped `remember-image-pair-positions` ungrounded EYFS.ELG.PSED citation
- ✅ Collapsed `spell-25/50/100-sight-words` (3 targets; arbitrary tiers) into `spell-high-frequency-sight-words-tier-1` + `tier-2`
- ✅ Added 6 receptive-vocabulary parallel targets (point-to-named-X)
- ✅ Added doctrine note on receptive-vs-productive distinction
- ✅ Added doctrine note on phonics-system English-CVC scope flag

### 6.2 Pending operator ratification at Phase 1 surface gate

The curriculum agent recommended **~50 additional targets organized into new strands and parallels.** These are pedagogically defensible but represent substantial structural additions to v1. Operator chooses at the surface gate: apply now (lock at ~200 targets), defer to Arc 2, or selective apply.

**Option A — Speaking & Listening strand (10 targets, new strand under early-literacy):**
- follow-1-step-oral-instruction, follow-2-step-oral-instruction, follow-3-step-oral-instruction
- respond-to-greeting-in-target-language
- ask-and-answer-yes-no-questions
- ask-and-answer-wh-questions
- retell-a-3-event-story-orally
- participate-in-simple-conversation
- recite-a-rhyme-or-short-poem
- describe-a-picture-in-2-3-sentences

**Option B — Writing-Composition strand (8 targets, new strand under early-literacy):**
- write-own-name, label-a-picture-with-1-word, label-picture-with-noun-phrase
- write-a-simple-sentence-with-picture-prompt, write-2-sentences-on-a-topic, write-a-3-sentence-story
- use-capital-letter-at-sentence-start, use-period-at-sentence-end

**Option C — Personal/Social/Emotional Development strand (8 targets, new strand under World Knowledge OR new domain):**
- identify-own-emotions-in-context, identify-emotions-of-others-from-faces
- name-things-i-can-do-myself, share-and-take-turns, wait-my-turn
- identify-classroom-rules, identify-safe-vs-unsafe-situations
- make-and-name-a-friend

**Option D — Multilingual-specific strand (5 targets, new strand under early-literacy):**
- name-this-object-in-two-languages
- notice-cognate-word-pairs
- compare-greeting-routines-across-cultures
- identify-language-of-spoken-utterance
- respond-in-target-language-when-prompted

**Option E — Reading-comprehension expansion (6 targets, extending existing strand):**
- identify-main-character, identify-setting, identify-problem-and-solution
- distinguish-fiction-from-nonfiction, read-and-follow-2-sentence-instruction, infer-character-feeling-from-picture-cue

**Option F — Numeracy gaps (5 targets, extending existing strands):**
- tell-time-to-quarter-hour
- add-2-digit-without-regrouping, subtract-2-digit-without-regrouping
- identify-fractions-half-third-quarter
- recognize-money-amounts-up-to-1-unit

**Option G — Phonics-system parallels (4 targets, extending phonics-decoding with language-family flags):**
- read-Spanish-CV-syllable-words
- read-Finnish-words-with-vowel-length
- read-German-compound-word-boundaries
- read-French-silent-final-consonant-pattern

### 6.3 Curriculum agent's final-lock recommendation

> "Lock with the listed revisions before Phase 2 schema work. The taxonomy is structurally sound and the MVP slice is defensible — but three issues will cost more to fix later than now: (1) the missing speaking/listening + writing-composition + PSED strands leave systematic gaps that international-school curriculum coordinators will notice immediately; (2) the receptive-vs-productive vocabulary distinction is the single most load-bearing pedagogical concept for your audience and is currently invisible; (3) the English-CVC-shaped phonics strand needs an explicit scope-flag or parallel rungs for Romance/Nordic/Germanic so a Spanish-medium school doesn't see `read-cvce-words` and conclude the platform is anglocentric. Do this revision pass before sealing the schema in Phase 2; the MVP package itself (`identify-and-name-10-farm-animals`) can ship as designed in parallel."

CC has applied (1) the receptive-vs-productive distinction (receptive parallels added) and (3) the phonics scope flag (doctrine note). (2) requires ~50 new targets across 4-5 new strands and is the operator-ratification surface.

**CC's adjudication recommendation to the operator:** apply Options A (Speaking & Listening) + B (Writing-Composition) + D (Multilingual-specific) at Phase 1 lock. Defer Options C (PSED) + E (Reading-comp expansion) + F (Numeracy gaps) + G (Phonics parallels) to Arc 2. Rationale: A+B+D directly support the platform's K-3 multilingual differentiator; C+E+F+G are valuable but lower marginal utility for the launch arc and easier to add incrementally as packages in those domains land.

## 7. Out-of-scope for v1 (deferred or out-of-scope)

Per commission scope and audit-trail conventions:

- The 29 existing axis-key-shaped LessonPlan rows stay as legacy artifacts. The new taxonomy does NOT key on the same space (see existing-plan-substrate.md §7).
- Curriculum-standards-alignment validation tooling — this is a discovery aid, not a validation gate.
- Locale-specific phonics-system parallels at v1 (flagged as Arc 2+ work).
- Any non-Latin-script phonics or vocabulary patterns (current 11 locales are all Latin-script).
