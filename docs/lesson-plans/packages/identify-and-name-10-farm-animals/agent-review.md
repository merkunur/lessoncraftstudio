# Agent review — identify-and-name-10-farm-animals

**Reviewer:** general-purpose agent prompted as K-3 classroom teacher with international-school + multilingual-classroom context.
**Date:** 2026-05-06.
**Phase:** 4 first authored package agent-review iteration.

## Reviewer summary

Final-ship verdict: **ship with listed revisions.** The architecture works (5 composedExercises + 6 materials + 4-section CLIL was a defensible shape, and the validator passing is real evidence). Three structural revisions were called out as load-bearing for the template's quality.

## Worst-flaw call

> "Cat and dog included as 'farm animals.' This is the single thing to fix before ship. Every other issue in this review is refinement; this one is a category error a kindergarten teacher will notice in the first 30 seconds. It also undermines the curriculum-agent verdict ('farm animals are universal across 11 locales') — cat and dog are universal as PETS, not farm animals, and that distinction matters in the very vocabulary work the package teaches. Drop cat + dog; add donkey + rooster (or ship the 8-animal set)."

## Three load-bearing revisions called out

1. **Drop cat + dog from vocabKeys** (category error: pets, not farm animals).
2. **Swap exercise slot 5 alphabet-train for an animal-naming assessment** (alphabet-train assesses letters, not animal-naming — target drift).
3. **Author flashcards as 4-up jumbo for warmup + 9-up take-home** (warmup body explicitly says "teacher holds up flashcards" — needs jumbo size for whole-class hold-up).

## Iteration applied (post-review)

Both load-bearing revisions + 4 polish items applied to package.yaml:

| Revision | Status | What changed |
|---|---|---|
| 1. Drop cat + dog | ✅ applied | vocabKeys across 5 materials (flashcards × 2, picture-cards, sentence-strips × 2, manipulative-cut-outs originally; now manipulative uses theme=animals + single-repeat) now: cow, sheep, pig, chicken, rooster, horse, duck, goat, rabbit, donkey. Verified all 10 have full 11-locale IMAGE_VOCABULARY entries with gender data. |
| 2. Swap exercise slot 5 | ✅ applied | alphabet-train → picture-sort (theme mode; leftCategoryThemeSelect=animals, rightCategoryThemeSelect=vehicles). Pure animal-naming assessment via category-membership decision. |
| 3. Flashcards 4-up jumbo + 9-up take-home | ✅ applied | Authored as TWO flashcards materials: ordering 1 (cardsPerPage=4, borderStyle=thick, vocabulary-anchor for whole-class warmup); ordering 2 (cardsPerPage=9, borderStyle=thin, vocabulary-anchor for take-home/station). |
| 4. Sentence-strips 2-3 frames | ✅ applied | Authored as TWO sentence-strips materials: ordering 4 (i-see-a, week-1 intro); ordering 5 (there-are-count-plural, week-2 extension; integrates counting + plural morphology). includeWritingLine=true on the week-2 strip per agent's "writing line" recommendation. |
| 5. Manipulative mode → single-repeat | ✅ applied | mode: variety → single-repeat; itemCount 20 → 30. Per agent: variety mode is for sorting; single-repeat is correct for counting which is the CLIL station-3 use case. |
| 6. Parent-letter cue selection | ✅ applied | Cue list shifted from first-6-alphabetic (cat/dog/cow/sheep/pig/chicken — included pets) to deliberate 6 highest-recognition (cow/sheep/pig/chicken/horse/duck — universally recognized in all 11 locales). |
| 7. compositionalRationale field | ✅ applied | New top-level field acknowledging cross-strand drift. Names primary (vocabulary acquisition), secondary (phonics), tertiary (counting + categorization) strand split. Per agent's "drift is okay if intentional but should be acknowledged." |
| 8. flashcards showArticle | ✅ applied | Both flashcards materials now showArticle=true (auto-resolves indefinite article from IMAGE_VOCABULARY gender data per locale). Agent flagged this as load-bearing for German/French/Spanish/Italian/Dutch contexts where bare nouns under-model the gender system. |

## Polish items deferred (not blocking ship)

These are the agent's quality-polish recommendations that did not land in this commit. They warrant either Phase 4.1 follow-on or generalization to packages 2-10:

- **CLIL section bodies need teacher-actionable scripts**, not outlines. The agent's specific revision: warmup body should specify "Teacher: 'cow' (holds up cow card). Class: 'cow.'" with gestures named explicitly. Current bodies are usable outlines but assume teacher pedagogical fluency. Generalizes to all packages — author bodies for the non-native-speaker substitute teacher audience.
- **Time per station** in scaffold (8 min / 3 stations = ~2.5 min each is too short). Either reduce to 2 stations × 4 min OR extend section to 12 min and shorten contentActivity to 8 min. Defer to Phase 4.1 if teacher-feedback surfaces this in actual use.
- **Assessment criteria measurement procedure** ("Assess receptive identification via flashcard hold-up, 1 min per kid in pairs. Assess productive naming via picture-card individual interview, ~30 sec per kid.") — agent recommended adding measurement procedure to make criteria operationalizable. Defer to Phase 4.1.
- **Multilingual-classroom flag**: verify `labelCase: lowercase` doesn't render German nouns ungrammatical. The materials catalog should auto-case per locale; if it honors `labelCase` literally, German labels would lose initial-cap on common nouns. Phase 3 generators must auto-case at render time; if they don't, file as defect in materials catalog (not package). Per agent: "Verify this is auto-resolved at render time and not literally honored."
- **Category cleanliness for vocabulary lists in future packages**. Agent's MVP slice generalization: "Don't mix tropical-and-temperate fruits ('mango + apple + dragonfruit' is a category problem). Author the vocabulary list against a single concept boundary." Locks for packages 2-10.

## MVP slice generalization (lessons for packages 2-10)

The agent surfaced 8 generalizable lessons. Folded into Phase 5 Arc 2 commission spec:

1. Vocabulary choice needs single-purpose category. Don't mix pets-and-farm-animals; don't mix tropical-and-temperate fruits.
2. Exercise composition should NOT span more than 2 mechanic families per package — rotate families across the 1-2 week unit instead. (This package's slot 1+2 matching variants land within 1 family which is OK; the multi-family spread across slots 3-5 was flagged but acknowledged as cross-strand drift.)
3. Sentence-strips should be composed 2-3× per package (frame progression). Applied here for first time.
4. Flashcards: 4-up jumbo for warmup + 9-up for take-home. Author as two materials, not one. Applied here for first time.
5. Acknowledge drift explicitly via `compositionalRationale` field. Applied here for first time.
6. Manipulative-cut-outs: pick `single-repeat` for counting OR `variety` for sorting — don't author both at once. Applied here.
7. CLIL section bodies need teacher-actionable scripts. Deferred for this package; Arc 2 templates should ship with scripted bodies from authoring time.
8. Verify each vocab key against all 11 locales' IMAGE_VOCABULARY at authoring time. Verified for this package's 10 farm animals — all clean. Body-parts and clothing packages will hit cultural-variation issues this package didn't.

## Final state at Arc 1 Phase 4 commit

- Package validates: PASS via `frontend/scripts/author-teaching-package.ts`.
- Final composition: 5 composedExercises + 8 materials (was 5 + 6 pre-revision).
- Vocabulary: 10 universally-farm animals (cow, sheep, pig, chicken, rooster, horse, duck, goat, rabbit, donkey).
- compositionalRationale field added; cross-strand drift acknowledged.
- Render-pending: operator opens each material generator in browser + downloads PDF; Phase 4 ships the YAML + agent review, NOT rendered PDFs.
- Phase 5 Arc 2 commission spec carries forward the 8 generalizable lessons + 4 polish-deferred items.

## Arc 2 Phase 2 — es localization (2026-05-07)

Spanish locale variant authored at `package.es.yaml` per Arc 2 ratification (es default per §19; formal usted register per §17.9 lock).

K-3 Spanish-medium classroom-teacher agent reviewed the es variant. Two revisions applied:

| Revision | What changed |
|---|---|
| ✅ "Recaste/recaste" → "Reformule/reformule" (3 instances in contentActivity body) | "Recastear" is a clear anglicism; native Spanish ELL/CLIL teachers say "reformular." Single substantive register fix. |
| ✅ Inline comment on Material 4 (sentence-strips week 1) corrected | Pre-revision comment listed "vaca" twice in feminine count + said "5 of 10 feminine"; actual split is 4 feminine (vaca, oveja, gallina, cabra) + 6 masculine. Comment cleanup; doesn't affect rendered output. |

Polish items the agent flagged as optional (NOT applied; deferred):
- "la maestra o el maestro" → "el/la docente" (tighter native register; not blocking).
- "Primer grado" — agent flagged peninsular-Spain context might prefer "1.º de Primaria"; left as "Primer grado" for LatAm + US-dual-language fit.
- US dual-language proficiency variance: agent suggested adding a one-line note "ajuste por nivel de español, no solo por grado" — defer to Phase 4.1 / Arc 3 for differentiation-tier refinement; not blocking.

Final-ship verdict (agent): "Ship with listed revisions." Two revisions applied; ships clean.

es package validates: PASS via Phase 2 CLI.
