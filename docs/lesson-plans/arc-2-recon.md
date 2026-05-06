# Arc 2 recon summary

**Commission:** [BUILD][LESSON-PLANS] Arc 2 — Author 9 packages + localize farm-animals to es + Nordic sentence-strips + Phase 3 verification cycle
**Branch:** `pivot/printable-business-toolkit`
**Commits:** `6272865c` (spec ratification) → `97d59205` (Phase 1 Nordic) → `f2cbdd57` (Phase 2 es localization) → `cf6bebe7` (Phase 3a clothing/vehicles/body-parts) → `bd440970` (Phase 3b fruits/school/house) → `dd94e864` (Phase 3c color/emotions/numeracy) → `[Phase 4 commit pending]`
**Sessions:** 1 (single CC session continuing from Arc 1 session)
**LoC delta:** ~3,500 net additions across 7 commits (mostly YAML)

## Deliverables shipped

| Phase | Commit | Deliverables |
|---|---|---|
| Spec | `6272865c` | Arc 2 commission spec ratification (4 ratification locks; cross-strand fold authorized). |
| 1 | `97d59205` | sentence-strips.html FRAME_BY_LOCALE extended from 5 → 11 locales. Romance (pt + it) full grammar; Nordic (sv + da + no + fi) NSR-flagged with documented morphological gaps. project_k3_phrasing_native_speaker_review.md updated (NSR list 57 → 68 keys). |
| 2 | `f2cbdd57` | identify-and-name-10-farm-animals package.es.yaml (full standalone localization). Agent review applied 2 revisions ("recaste" → "reformule"; comment typo fix). Spanish CLIL formal-usted register; same 5 exercises + 8 materials shape. |
| 3a | `cf6bebe7` | identify-and-name-clothing + identify-and-name-vehicles + identify-and-name-body-parts (en). 3 packages mirror Arc 1 farm-animals template with package-specific departures (body-parts replaces manipulative-cut-outs with vocabulary-tracing-strips). |
| 3b | `bd440970` | identify-and-name-fruits + identify-and-name-school-objects + identify-and-name-house-rooms (en). |
| 3c | `dd94e864` | use-color-words + identify-and-name-emotions + count-objects-1-to-10 (en). 7-material vocab packages (no manipulative for color/emotions) + cross-strand numeracy package (6 materials, math-app-heavy, theme-mode workaround for numeral cards). materials-catalog.json extended with numeral-cards material SPEC (Arc 2 boundary fix; generator deferred to Arc 3). |

## What worked

1. **Operator ratification at single round-trip.** All 4 surfaced subjects (Phase 2 locale, Phase 3 cadence, Nordic NSR posture, cross-strand fold) ratified in one operator response with detailed reasoning. No mid-Arc round-tripping.

2. **CC adjudicator-forward held cleanly.** Per-package agent review skipped for 6 vocabulary-template packages (Phase 3a + 3b); reserved for the cross-strand numeracy package per operator's "extra attention" directive. No surfacing for routine adjudications (commit clustering, in-package departures, body-parts material substitution).

3. **Cross-strand fold validated the architecture.** Per agent review verdict: schema + materials catalog + tooling all support numeracy packages without core changes. The numeral-cards material gap is real but addressable via Arc 2 boundary spec-only fix; Arc 3 expands cross-strand confidently with this spec in place.

4. **Validator caught chart-count empty-customization-parameters issue on first authoring attempt.** Phase 1 audit had noted "minimal explicit configuration" for chart-count; Phase 3c authoring exercised the gap and the validator surfaced it via clear error message. No silent failure; Phase 3c yaml fixed in single edit.

5. **Article auto-resolution from IMAGE_VOCABULARY gender data held across all 11 locales.** Spanish farm-animals package + Phase 1 sentence-strips Romance frames (pt + it) + 4 vocabulary-package Spanish-rendering all worked correctly via `localizedArticle`.

6. **Agent's Spanish review caught the "recaste" anglicism.** Substantive register fix that CC's English-trained authoring missed. Validates the per-locale agent-review value for localization beyond just structural validation.

7. **Per-package departures from Arc 1 template proved sound.** body-parts (no manipulative-cut-outs; vocabulary-tracing-strips substituted; 25-min duration); color-words + emotions (7 materials, no manipulative); numeracy (6 materials, math-app-heavy). Each departure motivated by the package's natural pedagogical engagement axis. The Arc 1 generalization "Manipulative-cut-outs: pick single-repeat OR variety, not both" extends naturally to "OR omit entirely if pedagogically wrong-fit."

## What didn't (or surfaced friction)

1. **No numeral keys in IMAGE_VOCABULARY.** Cross-strand fold's first surfaced architectural gap. count-objects-1-to-10 package's flashcards material can't use vocabKeyList mode (no keys for "one"/"two"/etc.). Theme-mode workaround (using animal images for counting work) is pragmatic but doesn't deliver true numeral cards. Arc 2 boundary fix: added numeral-cards material SPEC to catalog (generator deferred to Arc 3). 5+ Arc 3 numeracy packages will benefit.

2. **chart-count app has empty customization_parameters in palette.** Documented in Phase 1 ("minimal explicit configuration") but only exercised at Phase 3c numeracy package authoring. No app-side fix possible per CLAUDE.md §3.2 (do-not-modify-app-generation-logic). Workaround: pass only universal parameters; app gets theme content via internal mechanism.

3. **Sentence-frame undersized for numeracy.** Single counting-relevant frame (there-are-count-plural). i-see-a / this-is-a / i-have-a / i-like-plural don't reinforce counting. Arc 3 candidate: i-count-count-plural + i-see-count-plural frame additions to FRAME_BY_LOCALE. Filed as catalog-extension non-blocking.

4. **Sparse-override storage convention not yet supported.** package.es.yaml authored as full standalone (not sparse override) per Phase 2 CLI's full-file consumption. Acceptable single-locale duplication; refactor to sparse-override pattern when scope warrants (likely Arc 3+ when 2-3 locale variants per package land).

5. **Colors + emotions vocab boundary case.** "orange" not in IMAGE_VOCABULARY as a color (only fruit); "calm" not in IMAGE_VOCABULARY as an emotion. Substitutes used (gray for color; confused for emotion) — works but suggests IMAGE_VOCABULARY coverage gap. Filed as Arc 3+ candidate to extend vocabulary coverage for abstract-attribute categories (emotions, qualities, abstractions).

6. **CLIL section bodies still outline-grade (not full scripts).** Arc 1 generalization 7 ("CLIL bodies as teacher-actionable scripts") was applied at intent level (specific verbs, named routines, kid-action prescribed) but not at full-script level (no choral-repetition pattern explicitly transcribed; no gesture annotations). Arc 3 candidate: extend CLIL bodies to script-grade for non-native-speaker substitute teacher use.

## What surprised

1. **Body-parts package departed naturally from template.** The Arc 1 manipulative-cut-outs material doesn't compose well with body-parts vocabulary (kids don't count "5 heads" naturally). The natural substitute — vocabulary-tracing-strips for handwriting integration — emerged as a per-package design choice, not a global template change. This validates the package-shape-flexibility doctrine: templates inform but don't dictate.

2. **Cross-strand validation was lower-cost than anticipated.** Schema + tooling held without changes. The architectural findings (numeral-cards gap, chart-count empty params, sentence-frame coverage) are workable at the boundary; none required schema migration or validator rework.

3. **Spanish agent review surfaced "recaste" anglicism that CC missed.** The agent's substantive content review found a register issue invisible to CC's English-trained authoring eye. This validates the locale-agent-review pattern even for templated localization (not just net-new content authoring).

4. **Frame template for languages-package surfaced unanticipated complexity.** Romance article-elision (l') + Nordic suffix-articles + Finnish case-marking each required different morphological treatment. Phase 1 NSR-flag posture made the gaps explicit and queueable rather than burying them in incomplete frame templates.

## Patterns that generalize to Arc 3

1. **Strand-shape package-template variation.** Vocabulary packages mirror Arc 1 farm-animals 8-material baseline. Numeracy packages naturally drop to 6 materials (skip vocab-tracing + redundant flashcard variants). Other strands (PSED, world-knowledge) will likely have their own natural baselines. Don't enforce a single template across strands.

2. **theme-mode workaround for non-vocab targets.** When the learning target's "vocabulary" isn't lexical items in IMAGE_VOCABULARY (numerals, abstract qualities, processes), use theme-mode for image content + acknowledge in compositionalRationale that the "theme" is operator-substitutable without changing the target.

3. **Sentence-strips frame coverage is per-strand.** Vocabulary packages compose 2 frames (i-see-a + frame variant). Numeracy packages compose 1 frame (there-are-count-plural). Color/emotion packages compose 1 frame (this-is-a, since color/emotion sit naturally with copula register). Author the right number per package; don't enforce 2-frame rule.

4. **Material-customization rejection paths (validator catches).** chart-count's empty params surfaced via validator error message; numeral-cards via a failed authoring attempt. Future packages will hit similar rejection paths at first-authoring; document workarounds in inline package comments + escalate genuinely architectural gaps to material-catalog spec extensions at boundary.

5. **NSR-flag-at-ship doctrine carries across catalog work.** Nordic sentence-strips, Spanish localization (lighter-weight NSR-flag for register), and any future Arc 3 Tier 3+ locale work all benefit from explicit-flagging-rather-than-burying.

6. **Agent review per-package vs cluster-review CC adjudication.** Vocabulary-template packages following Arc 1 canonical → cluster review (or skip, applying generalizations). Cross-strand prototypes + locale variants → full per-package review (locale variant especially needs native-speaker register check). Arc 3 follows this same posture.

## Schema / tooling / generator changes needed before Arc 3

**Required (gating Arc 3 numeracy expansion):**
- `numeral-cards` material GENERATOR implementation (spec landed at Arc 2; ARC 3 PHASE 1 priority).
- NUMBER_WORDS i18n resource per locale (separate from IMAGE_VOCABULARY); Arc 3 Phase 1 alongside numeral-cards generator.

**Strongly recommended (workarounds work but ship grade improves):**
- i-count-count-plural + i-see-count-plural sentence-frames in FRAME_BY_LOCALE (numeracy frame coverage).
- Sparse-override package.<locale>.yaml validator support (DRY for locale variants at scale).

**Optional (future commission):**
- Numeral-vs-numberword toggle in sentence-strips.
- IMAGE_VOCABULARY coverage extension for abstract-attribute keys ("orange" as color, "calm" as emotion).
- CLIL section body script-grade extension for non-native-speaker substitute teacher use.
- Plural-morphology QC pass for Finnish partitive case (Arc 3 Tier 3 scope).

## Out-of-scope items closed

Per Arc 2 commission scope:
- Packages 11+ (Arc 3+).
- Non-vocab-and-non-numeracy strand packages (Arc 3+; Arc 2 shipped count-objects as the sole cross-strand prototype).
- Localization beyond es (Arc 3+).
- bingo-board, matching-mat material additions (still deferred).
- Word-wall cards, mini-book material additions (still deferred).
- family-members + foods + action-verbs vocabulary packages (deferred per Arc 1 agent flag).

## Verification status

- All 7 Arc 2 commits push to origin clean.
- Pre-commit hooks pass (no `--no-verify` needed; no schema changes in Arc 2).
- Phase 2 author-teaching-package validator: 13/13 tests still passing after materials catalog extension to 10 entries.
- All 10 packages (Arc 1 farm-animals + farm-animals.es + Arc 2's 9) validate clean via Phase 2 CLI.
- 11 generators extant (8 v1 catalog generators from Arc 1 Phase 3 + numeral-cards SPEC-only entry pending Arc 3 implementation).
- No browser visual-rendering verification yet (operator-side; same posture as Arc 1).
