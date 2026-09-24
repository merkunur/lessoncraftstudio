---
name: Content authored about a specific named artifact must be grounded in that artifact's canonical data
description: When a commission's scope names a specific package / deck / topic / lesson / material instance, Phase 1 MUST read the canonical YAML / manifest / data file for that named instance BEFORE Phase 2 design. The NAME is a label; the artifact is content. Never infer package contents from the slug. Sibling discipline to §A.13.29 (behavior description) and §A.13.30 (reader perspective). Empirical anchor: Sub-Phase 2.4 find-and-count drift + compare-by-weight IDE-open signal.
type: feedback
originSessionId: 12858146-3749-4191-b753-18ee82e70f50
---
**Rule:** When a commission's scope NAMES a specific content artifact (a package by slug, a deck by URL, a topic by axis-key, a lesson plan by ID, a material instance), Phase 1 MUST read the canonical artifact for that named instance BEFORE any Phase 2 design or Phase 3 authoring begins. The instance's NAME is a label; its YAML / manifest / data file is the truth. Authoring content ABOUT a specific named artifact without inspecting that artifact's canonical data is a defect class equivalent to using a function in code without reading its signature.

**Why:** Even after §A.13.29 (technical-accuracy: ground-truth source-citation for behavior-describing content) and §A.13.30 (audience-perspective: reader-facing copy in plain reader-vocabulary) are locked, I can still author content about a specific named package without reading its YAML and end up describing the wrong exercises, the wrong theme, the wrong assessment criteria, the wrong materials. The three content-discipline doctrines form a complete family covering different dimensions of content authoring:

- **§A.13.29 behavior description** — catches authoring HOW a system component generally works without reading its source code
- **§A.13.30 reader perspective** — catches authoring USER-FACING copy from the engineer's mental model rather than the reader's
- **§A.13.31 per-instance content (this)** — catches authoring content ABOUT a specific named INSTANCE without reading that instance's canonical data

**Empirical anchors:**

- **Sub-Phase 2.4 find-and-count drift was partly per-instance content-blindness.** My templates described what `find-and-count|unified` exercises do in general (covered by §A.13.29 once cited against `REFERENCE APPS/find-and-count.html`), but I never read `docs/lesson-plans/packages/count-objects-1-to-10/package.yaml` to verify the package's specific `themeSelect: animals` config. The package YAML would have shown me the configs (`{ gridRows: 4, gridCols: 4, themeSelect: animals }` and `{ gridRows: 5, gridCols: 5, themeSelect: fruits }`) confirming object-counting mode, plus the broader pedagogical context (warmup routines, materials list, assessment criteria) the templates should have respected.
- **IDE-open signal at this commission's surface.** Operator opened `docs/lesson-plans/packages/compare-by-weight/package.yaml` in IDE. Reading it revealed:
  - Preschool/Kindergarten early-numeracy package teaching weight comparison
  - Pre-formal measurement work using direct comparison (lifting + balancing)
  - Comparative vocabulary: heavier / lighter / same weight
  - Composes against big-small + matching apps
  - 5 exercises + 7 materials over a 1-week unit
  - Builds on Arc 9 compare-by-length pattern; RESOLVES forward-pointer
  - Whole-class direct-weight routine in warmup; pair-work lift-and-compare in contentActivity; recast-error frames ("you said the book is light — let's compare it to something")
  
  The package NAME `compare-by-weight` reveals only the topic. The YAML reveals the pedagogy + materials + sequencing. Without reading the YAML, any content I authored about this package would be assumption-based pattern-matching from the name.

**How to apply (any commission whose scope names a specific content artifact):**

1. **Identify the named instance(s) at commission entry.** The commission spec, operator message, or IDE-open signal names one or more specific artifacts (a package slug, a deck URL, a topic axis-key, a material instance).
2. **Read the canonical artifact for each named instance BEFORE Phase 2 design.** Canonical paths:
   - Package → `docs/lesson-plans/packages/<slug>/package.yaml` (FULL FILE; not just title/description; the structure body, composedExercises, materials, compositionalRationale, assessmentCriteria, curriculumStandards all matter)
   - Topic → `frontend/config/topics-taxonomy.json` axis entry for the topic axis-key + grep packages composing the topic
   - Deck → manifest JSON + bundle + exercise data at the canonical asset path
   - Lesson plan → `docs/lesson-plans/packages/<slug>/lessons/<lesson>.yaml` (if it exists at the canonical path)
   - Material instance → the package.yaml's `materials:` entry for that specific (package, materialSlug) tuple
3. **No inference from name.** The package name is a label. The slug hints. The YAML defines. Always read past the name. If you cannot quote a specific line from the canonical artifact about the instance, you cannot author content about it.
4. **Cite canonical artifact paths in commission close-out / commit message.** "Verified against `docs/lesson-plans/packages/compare-by-weight/package.yaml`" makes the authoring traceable.
5. **IDE-open signals trigger the discipline.** When the operator opens a specific package YAML / deck file / config file in the IDE alongside a commission, Phase 1 reads that file as part of context-establishment, even if commission scope doesn't explicitly name it. The IDE-open signal is contextual intent from the operator; treat it as a Phase 1 input.

**Where this applies:**

- Lesson plan authoring for a specific package's topic
- Topic destination page content for a specific (axis, axis-key, locale) combination
- Per-package admin/operator copy (admin tooling labels, support content describing a specific package)
- Per-deck SEO surfaces (deck.html `<title>` + meta description + structured data — already substantially driven by manifest, but anything beyond manifest-derived would trigger this)
- Marketing copy referencing specific packages or decks by name
- FAQ entries answering "what does the compare-by-weight package teach?"
- Any content authoring where commission scope mentions a slug, ID, or named instance

**Family:** sibling of [feedback_template_ground_truth_discipline.md](feedback_template_ground_truth_discipline.md) (§A.13.29 behavior-description layer) and [feedback_audience_perspective_user_facing_content.md](feedback_audience_perspective_user_facing_content.md) (§A.13.30 reader-perspective layer). The three form the complete content-discipline family covering source / reader / instance dimensions. Also sibling of the broader verification-hygiene family ([feedback_documentation_against_real_emitter.md](feedback_documentation_against_real_emitter.md), [feedback_decision_premise_verification.md](feedback_decision_premise_verification.md), [feedback_infrastructure_claim_verification.md](feedback_infrastructure_claim_verification.md), [feedback_verification_regex_from_real_samples.md](feedback_verification_regex_from_real_samples.md)) — all describe the same root pattern at different layers: **claims verified against real state before being relied upon**.

**Generalization:** any time a commission scope mentions a specific instance, the instance's canonical data file is the source-of-truth. Read past the name. Cite the artifact path. Treat the named artifact like a function signature in code — you don't call it without checking it. You don't author content about it without reading it.
