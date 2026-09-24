---
name: K-3-naturalness phrasing decisions made without native-speaker review — track for validation
description: Language phrasing decisions about K-3 register naturalness made by implementers without native-speaker background should be tracked as validation-candidates rather than shipped as resolved. Originating incident: Brief A 5A.2 redo German shape orientation phrasing.
type: project
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
When implementing localization in a priority language and the choice between phrasings hinges on K-3 register naturalness (which adjective reads more like everyday classroom vocabulary, which preposition is more child-friendly, etc.), and neither the implementer nor the operator can make an authoritative call from native-speaker intuition, the decision should be:

1. Pick one option as the working translation (default to the operator's structural reasoning when both options are defensible)
2. Flag the specific keys here for validation when a native-speaker review process is operationalized
3. Don't ship as silently resolved

**Why:** translations that are structurally correct but K-3-register-off ship to children as "machine-feeling" output. Worse, the implementer's confidence level (low) doesn't propagate to downstream consumers, who may assume the translation is locked-in correct rather than a working choice pending review.

**How to apply:**
- During implementation, when picking between phrasings on K-3 register grounds, write down the alternatives considered + the reasoning + an explicit "needs native-speaker validation" flag.
- Add the specific affected keys to this entry (or a similar tracking entry).
- When the German native-speaker review process is operationalized (CLAUDE.md handoff §11 identified the need for Nordic languages — Swedish, Danish, Norwegian, Finnish — but the same principle applies to Tier 1 German for K-3 register decisions), validate the flagged keys.

## Two NSR populations — review-workflow distinction

The NSR list now spans 57 keys (organic + bulk-tier additions). They split into two populations with different surfacing patterns and review workflows:

**Population 1 — organic-phrasing flags (17 keys, accumulated one-at-a-time):** the original list, surfaced during Brief A 5A.3 + Group B Phase 3 execution as specific phrasing decisions hit the implementer's confidence-floor on K-3 register or German gender/case agreement. Each flag is a discrete judgment call documented inline (alternatives considered + reasoning + needs-NSR flag). Review workflow: NSR reviewer addresses flags one at a time with full inline context.

**Population 2 — bulk-i18n-tier flags (40 keys, single-batch from Brief B Phase 2):** the `seo.educational_level.*` + `endDeck.*` families authored in one batch as part of publish-cli's substitution layer. Strings are organized by Tier 3-4 launch tier (sv, fi, no, da × 10 keys); flagged because §17.5's Nordic-NSR recommendation applies. Review workflow: NSR reviewer addresses flags by tier (sv batch, fi batch, no batch, da batch), validating school-system-specific terminology + K-3 register together.

Hygiene note for future-operator working the NSR process: the two populations want different review pacing. Population 1's flags are localizable judgment calls — small per-flag review sessions work. Population 2's flags are tier-batches — one NSR-reviewer pass per tier (by a native speaker of that tier's language) covers all 10 keys efficiently. Treat them differently in the NSR commissioning process.

## Currently flagged for native-speaker validation (57 keys total — see two-population breakdown above)

The native-speaker-review pattern is NOT Nordic-only — it applies symmetrically to any priority language including English when implementer-side K-3-register choices are made without native-speaker judgment.

### English (en)

**Brief A 5A.3 Commit 3 — "ellipse" vs "oval" for K-3 register:**

The K-3-natural English word for the shape is "oval" rather than "ellipse" (geometric vocabulary K-3 students don't typically encounter in English curriculum). Working translation in `translations-shared.js`:
- `srShapeEllipsePortrait` ("tall oval")
- `srShapeEllipseLandscape` ("wide oval")

Decision made by implementer; needs native-English-speaker K-3 educator validation. If "tall oval" / "wide oval" reads natural for K-3, lock it. If something else (e.g., "standing oval" / "lying oval" / "vertical oval" / "horizontal oval") reads more natural, swap in `translations-shared.js` (single-keyset, low-risk).

### German (de)

**Brief A 5A.2 redo — shape orientation phrasing for srShape* keys:**

The pair `hochkantes Rechteck / breites Rechteck` (and matching `Oval`) was chosen over the alternative `hochkantes Rechteck / liegendes Rechteck` for orientation-encoded shape names. Reasoning: `hochkantes / breites` reads as register-symmetric (both everyday K-3 vocabulary), whereas `liegend` is slightly more figurative for shape orientation and may be less intuitive for young learners.

Both pairs are defensible. Neither implementer nor operator is a native German speaker. The choice was made on structural reasoning, not native-speaker judgment.

Specific keys to validate:
- `srShapeRectPortrait` ("hochkantes Rechteck")
- `srShapeRectLandscape` ("breites Rechteck")
- `srShapeEllipsePortrait` ("hochkantes Oval" — pending Commit 4 German srShape pass into translations-shared.js)
- `srShapeEllipseLandscape` ("breites Oval" — pending Commit 4 German srShape pass)

If a native German K-3 educator suggests different phrasing, the change is single-keyset, low-risk: update the 4 strings in `translations-shared.js` (post-Commit-4) and re-deploy.

### German prepositions templates — pre-existing grammatical gender-agreement issues

**Brief A 5A.3 Commit 4 audit (post-Commit 4 surface):**

The pre-existing German `srExercisePrepositionsChoice` and `srExercisePrepositionsFillIn` templates use construction `der {item} ... zur {shape}`, which presupposes feminine grammatical gender for both substituted nouns. Items and shapes have all three genders in German:
- masculine: `der Würfel`, `der Stern` (substituting into `der {item}` produces correct `der Würfel`, but the surrounding declension still presupposes feminine flow)
- feminine: `die Katze`, `die Ellipse` (works correctly with `der {item}` declension)
- neuter: `das Herz`, `das Dreieck`, `das Oval` (substituting into `der {item}` produces ungrammatical `der Herz` — should be `das Herz`)

A deck with masculine or neuter substitutions renders ungrammatical German. NOT a Brief A regression — these strings predate Brief A. Surfaced during Commit 4 placeholder-alignment audit because the audit verified placeholders match between EN and DE, NOT that the surrounding German template grammar is correct.

Specific keys to validate (and likely rewrite):
- `srExercisePrepositionsChoice` (de) — pre-existing gender-agreement error in `der {item}` and `zur {shape}` constructions
- `srExercisePrepositionsFillIn` (de) — same pre-existing error

**Native-speaker fix shape (when commissioned):** rewrite the template to either (a) use a gender-agnostic article like `das Bild von {item}` ("the picture of the {item}") which sidesteps the issue, OR (b) introduce per-gender template variants and route based on the substituted noun's gender (which is available via `ImageVocab.gender(key, "de")`).

**Pattern reminder for native-speaker review process:** the same gender-agreement issue likely exists in OTHER per-app German srExercise* templates beyond just prepositions. Any template that puts a definite article before a `{noun}` placeholder presupposes the noun's gender; in German (and Spanish/French/Italian/Portuguese) this is a load-bearing assumption. When the native-speaker-review process operationalizes, it should re-audit ALL per-app German srExercise* templates for case/gender/declension agreement, not just review the structurally-flagged keys (`srShape*`, `srExerciseShadowMatch*`).

### Shadow-match templates — pre-existing German gender-agreement issues + makeItWhole K-3 phrasing

**Brief A 5A.3 Commit 2 — three-template split for shadow-match modes:**

The original single key `srExerciseShadowMatchMakeItWhole` was split into two cut-direction-specific templates in commit `10bd13be`. Working English phrasings:
- `srExerciseShadowMatchMakeItWholeHorizontal` ("Match the top half of the {item} to its bottom half.")
- `srExerciseShadowMatchMakeItWholeVertical` ("Match the left half of the {item} to its right half.")
- (Plus `srExerciseShadowMatchShadow` — pre-existing template, not split.)

Phrasing chosen by implementer for K-3 readability. Validate whether "top half / bottom half / left half / right half" is more natural than alternatives like "upper part / lower part / left side / right side" for K-3 audience.

**Brief A 5A.3 Commit 4 verification surface (post-Commit 4 render-check, 2026-04-27):**

The German shadow-match templates use `Verbinde das {item}` (and analogous `Verbinde die obere/untere Hälfte des {item}`), which presupposes a definite article + case marking that aligns with neuter or specific gender contexts. Items have all three German genders, so `das Hausschuhe` (plural masc), `das Schlafanzug` (masc), `das Strickjacke` (fem) all render ungrammatically.

Same root cause family as the prepositions issue. Surfaced during Commit 4 render-verification when the operator's German shadow-match deck visibly produced "das Hausschuhe / das Schlafanzug / das Shorts / das Strickjacke" — the `srExerciseShadowMatchShadow` template's `das {item}` was visible across all 4 of the deck's items.

Specific keys to validate:
- `srExerciseShadowMatchShadow` (de) — `das {item}` presupposes neuter
- `srExerciseShadowMatchMakeItWholeHorizontal` (de) — already flagged for K-3 phrasing; ALSO has the same gender issue in `des {item}` genitive construction
- `srExerciseShadowMatchMakeItWholeVertical` (de) — same as horizontal

NOT a Brief A regression. The `srExerciseShadowMatchShadow` German template predates Brief A; the makeItWhole horizontal/vertical splits were authored in Commit 2 (commit `10bd13be`) inheriting the same template-construction pattern. Fix is the same shape as the prepositions fix: gender-agnostic restructuring or per-gender variants routed via `ImageVocab.gender(key, "de")`.

### Swedish, Danish, Norwegian, Finnish (sv, da, no, fi)

CLAUDE.md handoff §11 already identified these as native-speaker-review-needed for the broader Brief A 9-language translation pass. When that pass is commissioned, treat all srShape* / srExercise* / srPuzzle* / srOperator* keys as validation-candidates by default — same K-3-register concern.

### German Group B Phase 3 sr-only puzzle templates — materialization status post-Phase-3 verification

**Group B Phase 3 close-out reconciliation (2026-04-28):** the Phase 3 commits shipped with pre-emptive flags filed before commit per the flag-and-ship discipline. Post-Phase-3 verification reconciled the pre-emptive flag set against actually-materialized concerns:

**RESOLVED-BY-WORKAROUND (NOT counted in flag total — workaround shipped successfully):**

| Key (de) | App | Pre-emptive concern | Resolution |
|---|---|---|---|
| `srPuzzleSudoku` | sudoku | `{imageList}` genitive-declension after "Bildern von" | Colon-list workaround: "mit den Bildern: {imageList}" — bare-noun-list reads grammatically clean across mixed-gender items. Verified PASS in commit `b07afa37`. |
| `srPuzzleCryptogram` | cryptogram | Same declension concern | Same colon-list workaround: "Der Geheimcode zeigt diese Bilder: {imageList}". Verified PASS in commit `898f3596`. |
| `srPuzzlePicturePathCollectibles` | picture-path | `{itemList}` accusative declension on multi-gender list | "Achte auf {itemList} entlang des Weges" — accusative on bare-noun-list reads acceptably; `Intl.ListFormat('de')` produces "X, Y und Z" form which inherits no article-driven case marking. Verified PASS in commit `263c67f2`. |
| `srWorksheetQuestions` | all 3 apps | "Arbeitsblatt-Fragen" register | Single-word aria-label; low-risk-by-default; reads natural K-3 German. No materialized concern. |

**MATERIALIZED — gender-agreement on `vom`/`zum` + image gender (4 keys, structural-template-redesign-scope):**

The picture-path Phase 3 verification surfaced exactly the predicted gender-agreement family. `vom`/`zum` are masculine/neuter contractions of `von dem`/`zu dem`; feminine items require `von der`/`zur`. Materialization:

| Key (de) | Pattern site | Materialized in verification |
|---|---|---|
| `srPuzzlePicturePathPathway` | "vom {startImage}" / "zum {endImage}" | "vom Clementine" (should be "von der Clementine"); "zum Avocado" (should be "zur Avocado") — both feminine items |
| `srPuzzlePicturePathClassicMaze` | "vom Startpfeil" / "zum Zielpfeil" | Currently masculine arrows so working; if rephrased to image-anchored variant would inherit the issue. Flagged for forward-looking consistency. |
| `srPuzzlePicturePathChoosePathSingle` | "zum {endImage}" | "zum Nektarine" (should be "zur Nektarine") — feminine |
| `srPuzzlePicturePathChoosePath` | "zum {endImage}" | "zum Grapefruit" (should be "zur Grapefruit") — feminine; "zum Apfel" coincidentally correct (masculine). |

**Same family as the 5 pre-existing German gender-agreement keys from Brief A 5A.3** (`srExercisePrepositionsChoice`, `srExercisePrepositionsFillIn`, `srExerciseShadowMatchShadow`, `srExerciseShadowMatchMakeItWholeHorizontal`, `srExerciseShadowMatchMakeItWholeVertical`).

**Pattern-fix shape options for NSR review (same shape as Brief A 5A.3 fixes):**
- (a) **Gender-agnostic restructuring** using neuter "Bild" as the article anchor: "zum Bild von der Nektarine" / "zum Bild der Grapefruit". Verbose but always grammatical.
- (b) **Per-gender variant routing** via `ImageVocab.gender(key, "de")` API. Requires (i) ImageVocab API extension to expose gender-per-key consistently, (ii) per-gender translation key variants (e.g. `srPuzzlePicturePathChoosePath_M` / `_F` / `_N`), (iii) per-app code dispatching on the resolved image's gender. Adds template-count overhead but produces idiomatic native-speaker-quality output.
- (c) **Hybrid**: ship Brief A 5A.3 fix shape (whichever lands first) and propagate the same shape to Phase 3 keys. Ensures consistency across the family.

**Default Phase 3 phrasings shipped (verified PASS, NSR-flagged):**

- Zeile/Spalte form: shipped "Zeile {N} Spalte {M}" without inserted preposition. Verified reads cleanly across all 5 picture-path verification decks.
- Number-word: `{2: "zwei", 3: "drei"}` lookup at template-fill time, locale-keyed. Verified PASS in decks 4 and 5.
- "Unter den {endpointCount} Bildern am Ende": image-noun-headed form chosen over participle-nominalization "Bildenden Wegen". Verified reads K-3-natural.
- Colon-list workarounds for sudoku/cryptogram `{imageList}` — verified PASS, working translations.

**Pattern reminder (carryover from Brief A 5A.3 Commit 4 audit):** placeholder-alignment audit verifies EN ↔ DE template placeholder match; does NOT verify German case/gender/declension correctness. Phase 3 close ships with structural alignment verified and grammar concerns flagged here. Future native-speaker-review work re-audits ALL per-app German srExercise* / srPuzzle* templates for case/gender/declension agreement, not just the structurally-flagged keys.

---

**Flag count summary (Phase 3 close-out reconciliation, 2026-04-28):** 17 keys flagged for K-3 native-speaker review:
- English: 4 keys (Brief A 5A.3) — 2 K-3 register (`srShapeEllipsePortrait`, `srShapeEllipseLandscape` — "tall oval" / "wide oval") + 2 shadow-match phrasing (`srExerciseShadowMatchMakeItWholeHorizontal`, `srExerciseShadowMatchMakeItWholeVertical`)
- German: 13 keys (9 structural-template-redesign-scope + 4 K-3 phrasing only):
  - 4 K-3 phrasing only: shape orientation (`srShapeRectPortrait`, `srShapeRectLandscape`, `srShapeEllipsePortrait`, `srShapeEllipseLandscape`) — Brief A 5A.3
  - 9 structural-template-redesign-scope (gender-agreement family — `vom`/`zum` + image-gender mismatch, `der/das`-article presupposition mismatch, accusative declension on lists):
    - 5 pre-existing from Brief A 5A.3: `srExercisePrepositionsChoice`, `srExercisePrepositionsFillIn`, `srExerciseShadowMatchShadow`, `srExerciseShadowMatchMakeItWholeHorizontal`, `srExerciseShadowMatchMakeItWholeVertical`
    - 4 newly-materialized from Group B Phase 3: `srPuzzlePicturePathPathway`, `srPuzzlePicturePathClassicMaze`, `srPuzzlePicturePathChoosePathSingle`, `srPuzzlePicturePathChoosePath` (commits `263c67f2` materialized "vom Clementine" / "zum Avocado" / "zum Nektarine" / "zum Grapefruit" — `vom`/`zum` masc/neut contraction conflicting with feminine image gender)

**RESOLVED-BY-WORKAROUND (NOT counted, documented above):** `srPuzzleSudoku`, `srPuzzleCryptogram`, `srPuzzlePicturePathCollectibles`, `srWorksheetQuestions` — pre-emptive flags filed before Phase 3 commits but workarounds (colon-introduced lists, accusative on bare-noun lists, low-risk single-word aria-label) shipped successfully. Re-flag if a future commit revises the working translations to a form that re-introduces the gender-agreement concern.

**Audit-vs-grammar distinction:** the Commit 4 placeholder-alignment audit verified that placeholder slot tokens match between EN and DE templates; it did NOT verify that German case/gender/declension is correct on the surrounding template text. The two are orthogonal concerns. Future native-speaker-review work should treat all per-app German (and Spanish/French/Italian/Portuguese) srExercise* templates as candidates for grammar audit, not just the structurally-flagged keys.

Pattern reminder: the native-speaker-review trigger is "K-3-naturalness phrasing decision made by implementer without native-speaker background" OR "grammatical correctness in a gender/case-marked language not verifiable by implementer", regardless of which language. When future commits make similar judgment calls in other priority languages (fr, es, pt, it, nl), append the flagged keys here.

### Brief B Phase 2 — `seo.educational_level.*` + `endDeck.*` families (40 keys NSR-flagged)

Per Brief B v3 Decision 2 + Q3 (Tier 4 NSR posture: Danish NSR-flagged matching §17.5 Nordic-NSR; Romance trio fr/it/pt operator-best-effort without NSR). Filed at i18n authoring time (this commit) per the Phase 2 brief's "filed at Phase 2, not Phase 6" guidance.

**4 NSR-flagged locales × 10 keys = 40 strings:**

`sv` (Swedish):
- `seo.educational_level.preschool` ("Förskola"), `kindergarten` ("Förskoleklass"), `grade_1` ("Årskurs 1"), `grade_2` ("Årskurs 2"), `grade_3` ("Årskurs 3")
- `endDeck.heading` ("Vill du ha mer?"), `moreType` ("Fler {type}-arbetsblad"), `moreTheme` ("Fler arbetsblad med tema {theme}"), `moreLevel` ("Fler arbetsblad för {level}"), `browseAll` ("Bläddra bland alla arbetsblad")

`fi` (Finnish):
- `seo.educational_level.preschool` ("Päiväkoti"), `kindergarten` ("Esikoulu"), `grade_1` ("1. luokka"), `grade_2` ("2. luokka"), `grade_3` ("3. luokka")
- `endDeck.heading` ("Lisää tällaisia?"), `moreType` ("Lisää {type}-tehtäviä"), `moreTheme` ("Lisää {theme}-aiheisia tehtäviä"), `moreLevel` ("Lisää tehtäviä luokalle {level}"), `browseAll` ("Selaa kaikkia tehtäviä")

`no` (Norwegian — Bokmål):
- `seo.educational_level.preschool` ("Barnehage"), `kindergarten` ("Førskole"), `grade_1` ("1. trinn"), `grade_2` ("2. trinn"), `grade_3` ("3. trinn")
- `endDeck.heading` ("Vil du ha mer?"), `moreType` ("Flere {type}-arbeidsark"), `moreTheme` ("Flere arbeidsark med tema {theme}"), `moreLevel` ("Flere arbeidsark for {level}"), `browseAll` ("Bla gjennom alle arbeidsark")

`da` (Danish — Tier 4 but Nordic; NSR-flagged per §17.5):
- `seo.educational_level.preschool` ("Børnehave"), `kindergarten` ("Børnehaveklasse"), `grade_1` ("1. klasse"), `grade_2` ("2. klasse"), `grade_3` ("3. klasse")
- `endDeck.heading` ("Vil du have mere?"), `moreType` ("Flere {type}-arbejdsark"), `moreTheme` ("Flere arbejdsark med tema {theme}"), `moreLevel` ("Flere arbejdsark til {level}"), `browseAll` ("Gennemse alle arbejdsark")

**Validation reasoning for the NSR boundary:** §17.5 explicitly recommends NSR for the Nordic four (sv, da, no, fi). Romance languages (fr, it, pt) have stronger Claude quality assessment per §17.5 — operator-best-effort without NSR for v1; re-evaluate if Phase 5 / eleven-deck dry-run / future user feedback surfaces issues. Cross-references: Brief B Phase 2 brief Q3 + Q5; CLAUDE.md §17.5 + §19 (tier launch sequence).

**NOT NSR-flagged** at Phase 2 (operator-best-effort without NSR per Q3 + Decision 2):
- `fr` (French): preschool=Maternelle / kindergarten=Grande section / grade_1=CP / grade_2=CE1 / grade_3=CE2; endDeck shipped
- `it` (Italian): preschool=Scuola dell'infanzia / kindergarten=Scuola materna / grades=Prima/Seconda/Terza elementare; endDeck shipped
- `pt` (Portuguese — Portugal default): preschool=Pré-escolar / kindergarten=Jardim de infância / grades=1.º/2.º/3.º ano; endDeck shipped
- Tier 1-2 (en, de, es, nl): operator-authored without NSR per Decision 2; not flagged.

Total NSR list size after this update: **57 keys flagged** across 5 locales (en + de + sv + fi + no + da). Update from prior 17 keys (4 EN + 13 DE) to 57 keys (4 EN + 13 DE + 10 sv + 10 fi + 10 no + 10 da). MEMORY.md index entry should reflect the new total when next updated.

### Swedish, Danish, Norwegian, Finnish (sv, da, no, fi) — Brief A historical pre-existing flag

CLAUDE.md handoff §11 already identified these as native-speaker-review-needed for the broader Brief A 9-language translation pass. When that pass is commissioned, treat all srShape* / srExercise* / srPuzzle* / srOperator* keys as validation-candidates by default — same K-3-register concern. (Brief B Phase 2 above is a separate authoring surface within the same NSR-recommended posture for these languages.)

## Home page revision + DE i18n recovery pass (2026-05-02, commit a06cd835) — 3 DE register candidates

DE homepage namespace authored from EN canonical at this pass. German is in §17.5 higher-Claude-confidence tier; authored without blanket NSR-flag. Three specific phrasings flagged for native-speaker review on register/idiomatic grounds (not correctness — gender/case/spelling are correct):

1. **`homepage.breadthGrid.intro`: "Beispieldecks"** (compound: example + Decks). The English loanword "Decks" stands in a German compound. Operator pattern in §3 LanguageProof panel labels accepts mixed-register English loanwords ("Auto-translated" stays English in DE), so the precedent is consistent. NSR call: does "Beispieldecks" read naturally to a German K-3 educator, or would "Beispiel-Decks" (hyphenated) or "Beispielarbeitsblätter" (longer, no loanword) read better?

2. **`homepage.freeExperience.share.body` + `homepage.hero.interaction`: "Die Kinder lösen sie"** (the children solve them). Register choice: "Kinder" (children, warm K-3-natural) vs "Schüler" (pupils/students, more institutional). Operator's editorial-scholarly register direction in HOMEPAGE-SAVE-STATE.md is "professional, quiet, educator-respecting" — both terms can carry that register. NSR call: which sits better with German K-3 dual-language teachers in editorial register?

3. **`homepage.subscription.workspace.body`: "was zu Ihrer Wortschatz-Einheit von Woche 3 gehört"** (what belongs to your vocabulary unit from week 3). Direct translation of EN "what's tagged to your Week 3 vocabulary." German classroom-natural? "Wortschatz-Einheit Woche 3" is grammatically correct but may not mirror how German K-3 teachers actually label/think of their weekly vocabulary unit. NSR call: would "meine Wortschatzwoche 3" (vocabulary-week 3 as compound) or "Vokabeleinheit Woche 3" (using "Vokabel" instead of "Wortschatz") read more naturally?

All three are register/idiomatic-naturalness questions, not correctness — DE home page passes the gender/plural/capitalization rules that its own §3 LanguageProof.german panel advertises. Resolution path: when an NSR session runs, validate or revise these three phrasings.

## Arc 2 Phase 1 — Nordic sentence-strips frame templates (2026-05-07, commit pending)

Six new locales added to `REFERENCE APPS/material-generators/sentence-strips.html` `FRAME_BY_LOCALE` table: pt + it + sv + da + no + fi. Romance (pt + it) NOT NSR-flagged per §17.5 stronger-Claude-quality posture. Nordic (sv + da + no + fi) NSR-flagged per §17.5.1 default + commission ratification.

**Specific NSR items per locale:**

`sv` (Swedish — 2 keys flagged):
- `the-item-is-color`: "{item} är {color}." — uses indefinite-article form ("en katt är röd") instead of Swedish-correct definite suffix-article ("katten är röd"). Pedagogically acceptable for K-3 ("a cat is red" reads as a generic claim) but suffix-article rendering would require either per-vocab-key post-processing or extending IMAGE_VOCABULARY with definite-form data. NSR call: validate the indefinite-form workaround OR commission shared-library extension for Swedish/Danish/Norwegian suffix-article support.
- `the-item-says`: same suffix-article gap as the-item-is-color.

`da` (Danish — 2 keys flagged):
- `the-item-is-color` + `the-item-says`: same suffix-article gap as Swedish. Same indefinite-form workaround. Same NSR call.

`no` (Norwegian bokmål — 2 keys flagged):
- `the-item-is-color` + `the-item-says`: same suffix-article gap. Same workaround. Same NSR call.

`fi` (Finnish — 5 keys flagged; case-marking is THE Finnish issue):
- `i-see-a`: "Näen {item:bare}." renders nominative; pedagogically wrong for accusative-position frames. Should be "Näen kissan" (accusative). NSR call: extend IMAGE_VOCABULARY with Finnish accusative-case forms OR add per-locale post-processing layer.
- `i-like-plural`: "Pidän {item:plural}." renders nominative plural; should be partitive elative ("Pidän kissoista"). NSR call: same as above.
- `there-are-count-plural`: "On {count} {item:plural}." renders nominative plural; should be partitive ("On 3 kissaa"). NSR call: same.
- `the-item-is-color` + `the-item-says`: nominative subject works structurally for these (Finnish "kissa on punainen" is correct) but K-3-pedagogical register should be validated by native speaker.
- CORRECT (not flagged): `i-have-a` ("Minulla on {item:bare}") and `this-is-a` ("Tämä on {item:bare}") — Finnish uses nominative for subject-position + existential-have construction, so nominative renders correctly.

**Total NSR list size after this update: 68 keys flagged** across 6 locales (en + de + sv + fi + no + da). Update from prior 57 keys (4 EN + 13 DE + 10 sv + 10 fi + 10 no + 10 da) to 57 + 11 sentence-strips frames (2 sv + 2 da + 2 no + 5 fi) = **68 keys**. MEMORY.md index entry should reflect the new total when next updated.

**Architectural NSR-flag implication for Arc 3+:** suffix-article (sv/da/no) and case-marking (fi) gaps suggest the shared library's `localizedArticle` model (prefix-only) is incomplete for Nordic morphology. Resolution paths:
- Extend IMAGE_VOCABULARY with definite-form data per Nordic locale (sv: "katten" / da: "katten" / no: "katten").
- Extend IMAGE_VOCABULARY with case-form data for Finnish (kissa nom / kissan acc / kissaa part).
- Add a per-locale post-processing layer that takes the nominative output + applies morphological transformation.

Either path requires operator-side data work (IMAGE_VOCABULARY extension) OR engineering work (post-processing layer). Defer to Arc 3+ commission decision; NSR-flag holds until then.

## Arc 3 Phase 1 — NUMBER_WORDS gender-default architectural gap (2026-05-07, commit `4e2d53c3`)

The `NUMBER_WORDS` resource added to `material-generator-shared.js` per Arc 3 Phase 1 has a STRUCTURAL gender-default limitation that recurs across Romance + Nordic locales:

**Romance gender-mismatch (es / it / pt):** Hardcoded `uno` / `un` / `um` (masculine) for "1" produces grammatically-wrong output when the noun being counted is feminine: `un vaca` (es) / `un gallina` (es) / `um vaca` (pt) — should be `una vaca` / `uma vaca`. Cardinal `dois` (pt) and `dos` (es) for "2" similarly need feminine forms `duas` / `dos` (es 2 is invariant; pt 2 is gendered). Same pattern for fr `un` vs `une`, it `uno` vs `una`. CC adjudicated masculine default at Arc 3 Phase 1 per operator-pre-authorized scope (gender-toggle deferred to Arc 4+).

**Nordic gender-mismatch (sv / da / no):** Hardcoded `en` (common-gender) for "1" produces wrong output when noun is neuter / ett-genus: `en barn` (no) → should be `et barn`; `en hus` (sv) → should be `ett hus`. CC adjudicated common-gender default at Arc 3 Phase 1.

**Finnish case-morphology gap:** Hardcoded `yksi` (nominative) for "1" produces wrong output in object-position frames: "Näen yksi vaca" → should be `Näen yhden vaca` (accusative). Same pattern as Arc 2 Phase 1 sentence-strips Finnish accusative-marking gap; same NSR-flag.

**Resolution paths (deferred to Arc 4+ commission decision):**
- Extend NUMBER_WORDS resource with per-gender + per-case forms (per-locale tables).
- Add a per-locale post-processing layer that takes the masculine/common-gender NUMBER_WORDS output + applies gender/case transformation based on the noun's gender data from IMAGE_VOCABULARY.
- Add a `numeral-cards` material customization parameter for nounGender (defaults to 'm'; operator overrides per package).

**Trigger condition:** when Arc 4+ ships its first NUMBER_WORDS-gendered locale render at K-3 quality grade. Until then, masculine/common-gender default is acceptable for K-3 introduction (kids learn the masculine forms first; gender-correct forms come at K1+ extension).

**Filed during Arc 3 Phase 2 pt cluster review** when the agent surfaced the issue:
> "Hardcoded `um` will produce gender-mismatch on feminine items: `um vaca`, `um ovelha`, `um galinha`, `um cabra` would all read wrong. The cardinal **2 onwards is invariant** (`dois` becomes `duas` for feminine — same problem) — `dois vacas` is wrong; correct is `duas vacas`. This is a structural limitation matching what was already flagged in `project_brief_a_translation_debt.md` for Spanish/Italian/Portuguese gender agreement."

Same family as the existing Spanish/Italian gender-agreement debt; not a pt-specific bug but an architectural gap inherited from Phase 1's masculine-default adjudication.

## `[ARC][SEO][DECK-PAGE]` Phase 5 — `seo.words.*` 44-entry localization (2026-05-09)

Per Phase 4a Adjudication 2 (γ) absorption + Phase 5 Sub-item 1: 4 keys × 11 locales = 44 entries added to `frontend/messages/<locale>.json` under `seo.words.*` namespace, resolving Class B retrofit's English-fallback residue at retrofit surface (republish-seo.js consumer at lines 232-235).

**Tier 1-3 (en, de, es, nl, fr, it, pt) — operator-best-effort without NSR per §17.5 stronger-Claude-quality posture for Romance/Germanic.** Not flagged at Phase 5; treat as resolved unless empirical issues surface.

**Tier 3-4 Nordic (sv, fi, no, da) — NSR-flagged per §17.5.1 weaker-Claude-quality posture for Nordic. 4 NSR-flagged locales × 4 seo.words.* keys = 16 entries flagged.**

`sv` (Swedish — 4 keys flagged):
- `seo.words.worksheet` ("Övningsblad") — register/idiomatic-naturalness validate
- `seo.words.free_interactive` ("Gratis interaktivt") — adjective-noun agreement check (works structurally for "Gratis interaktivt övningsblad" but K-3 register validation needed)
- `seo.words.for` ("för") — preposition; standard
- `seo.words.print_or_play_online` ("Skriv ut eller spela online") — verb phrase; "spela online" K-3-natural validate

`fi` (Finnish — 4 keys flagged):
- `seo.words.worksheet` ("Tehtävämoniste") — long compound; alternative "tehtävälehti" / "harjoitustehtävä" — NSR validate which reads more naturally for K-3 contexts
- `seo.words.free_interactive` ("Ilmainen interaktiivinen") — adjective forms; partitive case in object position may apply at consumer ("ilmaista interaktiivista tehtävämonistetta") which is a structural i18n gap, NOT addressable in messages.json alone. NSR call: nominative form is appropriate for the standalone use case in description; consumer code may need to apply Finnish case morphology when the words are slotted into a sentence
- `seo.words.for` ("varten") — postposition rather than preposition; works in standalone contexts but consumer's use of "for kindergarten" → "varten esikoulu" reads unnaturally; correct rendering is "esikoululle" (allative case on the noun). Same Finnish case-morphology gap as Arc 2 Phase 1 sentence-strips: structural i18n architecture limitation not addressable in messages.json
- `seo.words.print_or_play_online` ("Tulosta tai pelaa verkossa") — imperative verb forms; "verkossa" inessive case for "online" is K-3-natural; validate full phrase

`no` (Norwegian Bokmål — 4 keys flagged):
- `seo.words.worksheet` ("Oppgaveark") — compound; alternative "Arbeidsark" exists (used in Brief B Phase 2 endDeck namespace); NSR call: pick consistent preferred form between "oppgaveark" and "arbeidsark" across all bokmål contexts
- `seo.words.free_interactive` ("Gratis interaktivt") — works structurally; K-3 register validation
- `seo.words.for` ("for") — preposition; standard
- `seo.words.print_or_play_online` ("Skriv ut eller spill online") — verb forms; "spill online" K-3-natural validate

`da` (Danish — 4 keys flagged):
- `seo.words.worksheet` ("Opgaveark") — compound; consistent with Brief B Phase 2 endDeck namespace ("arbejdsark"); NSR call: "opgaveark" vs "arbejdsark" — pick consistent preferred form
- `seo.words.free_interactive` ("Gratis interaktivt") — works structurally; K-3 register validation
- `seo.words.for` ("til") — preposition; "til" is dative-leaning vs "for" purpose-leaning; either works for "for kindergarten" but Danish K-3 educator may have a preference
- `seo.words.print_or_play_online` ("Udskriv eller spil online") — verb forms; "spil online" K-3-natural validate

**Validation reasoning for the NSR boundary:** §17.5 + §17.5.1 explicitly recommend NSR for the Nordic four (sv, da, no, fi). Romance + Germanic Tier 1-3 (en, de, es, nl, fr, it, pt) operator-best-effort without NSR per §17.5 stronger Claude quality assessment; re-evaluate if Phase 5 close-out / future user feedback surfaces issues. Cross-references: §17.5 + §17.5.1 + Phase 4a Adjudication 2 (γ).

**Naming-consistency cross-check across NSR-flagged Nordic locales:** the seo.words namespace's "worksheet" key uses different compounds than the endDeck namespace's "{type}-arbetsblad" / "{type}-tehtäviä" / "{type}-arbeidsark" / "{type}-arbejdsark" forms (per Brief B Phase 2 NSR list above). NSR reviewer should align the per-locale preferred form across all uses (seo.words + endDeck + future surfaces).

**Total NSR list size after Phase 5 update: 84 keys flagged** across 6 locales (en + de + sv + fi + no + da). Update from prior 68 keys (4 EN + 13 DE + 12 sv + 15 fi + 12 no + 12 da — counting all prior populations including Brief B Phase 2 + Arc 2 Phase 1 + Arc 3 Phase 1) to 68 + 16 (4 sv + 4 fi + 4 no + 4 da) = **84 keys**. Includes all populations across organic (17), Brief B Phase 2 (40), Arc 2 (11), Arc 3 (architectural-gap class — implicit), Phase 5 (16 = NEW).

MEMORY.md index entry should reflect the new total when next updated alongside this file. Phase 5 close-out commit message includes NSR-flag annotation per §17.5.1 commit-message-NSR-flag pattern.
