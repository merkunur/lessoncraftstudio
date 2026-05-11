# Pillar 5 commission spec — material generators

**Type:** `[FEATURE][PILLAR-5]` commission shape varies per ratified scope (P1/P2/P3)
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 6 (one per generator) OR consolidated into Phase 1 (simple) + Phase 2 (complex) per (P2) shape
**Estimated LoC:** ~9,500-14,500 cumulative across 6 generators (per-shape estimates below)
**Estimated sessions:** 12-18 sole-arc OR 3-5 (simple-first phase) + 7-10 (complex-second phase) per (P2)
**Status: DRAFT — operator ratification pending at next session.**

## 1. Context

Pillar 1 + Pillar 2 + Pillar 4 evaluation-surface commission shipped at this session (`7c21e1da` through `7d0d0082`). Teaching-package detail page surfaces 7 materials per package; 6 of 7 render "Generator pending" status badge because runtime generators don't yet exist. Only `flashcards` (Pillar 4 Arc 1+2 generator + mass-run) renders shipped state.

The visible "Generator pending" badges on the user-facing evaluation surface that operator just approved constitute empirical demand signal for material generator commission cycle. Per Phase 6 fold-queue Item 27 (empirical-saturation as natural close-point signal) + Item 22 (operator-pre-recommendation substrate verification): substrate-gap class surfacing at evaluation-time IS the trigger for Pillar 5 commencement.

This spec covers 6 generators classified by complexity per Phase 1 substrate audit:

**Simple template-driven (3):**
- (α) numeral-cards — text-only numeral + localized number-word card
- (β) picture-cards — image-list grid (variant of flashcards without text labels)
- (γ) manipulative-cut-outs — image-tile grid with cut-guides

**Complex hybrid (3):**
- (δ) sentence-strips — text + image hybrid with gender/article resolution per locale morphology
- (ε) parent-take-home-letter — bilingual template (homeLanguage body + target-language picture cues) at CEFR A2 reading level
- (ζ) answer-key — auto-aggregation from package + composedExercises + materials metadata

## 2. Pre-locked architecture

Per Pillar 4 Arc 1+2 generator stack precedent + Pillar 5 commencement adjudication-forward per §3.4.

- **Generation pipeline pattern:** TypeScript + Playwright + Sharp (matches Pillar 4 Arc 1 lock). Each generator at `frontend/scripts/lib/<material>-renderer.ts` + entry point at `frontend/scripts/generate-<material>.ts`.
- **Hetzner CDN destination:** `/var/www/lcs-media/materials/<material>/<locale>/<package>/<output-file>` per §A.1 isolated-storage convention. Mirrors `/var/www/lcs-media/flashcards/` from Pillar 4 Arc 2 Phase 2 mass-run.
- **Output format:** PDF for all 6 (print-targeted; teachers download + cut/laminate). Optional HTML deck.html for numeral-cards + picture-cards if interactive use surfaces empirical demand.
- **Access-control reuse:** `frontend/lib/flashcards/access-control.ts` `canAccessFlashcard` predicate composition pattern extends to per-material access-check via thin wrapper helper per material slug.
- **Sky+v2 design canonical:** 2:3 portrait card (where applicable); 60% image; 30% text-band; 4mm theme-color accent. Per Pillar 4 Arc 1 lock.
- **Substrate sources locked:**
  - IMAGE_VOCABULARY (image library + 11-locale text + gender/plural metadata) per CLAUDE.md §6
  - NUMBER_WORDS resource (Arc 3 Phase 1 deliverable; separate from IMAGE_VOCABULARY)
  - materials-catalog.json customizationParameters per material spec
  - package.yaml composedExercises + materials for answer-key aggregation

## 3. Six candidate shape options

Per-generator shape framing. CC self-adjudicates implementation per ratified scope.

### Shape (α) — Numeral-cards generator (Arc 3 deferral closure)

- **Phase 1:** Template authoring (numeral grid layout + localized number-word per cardsPerPage variant)
- **Phase 2:** Mass-run for 11 locales × N packages-using-numeral-cards (currently 1: count-objects-1-to-10; future numeracy packages will compose)
- **Cost projection:** ~1-2 sessions; ~800-1200 LoC
- **Strategic case:** Closes Arc 3 deferral. NUMBER_WORDS resource may need fresh authoring per locale if not already shipped at Arc 3 Phase 1.
- **Cross-deps:** NUMBER_WORDS i18n resource (Arc 3 deliverable; verify state at commencement)
- **Risk:** LOW — text-only template; no morphology resolution

### Shape (β) — Picture-cards generator

- **Phase 1:** Template authoring (image grid layout; no text labels). Variant of flashcards generator stripped of text.
- **Phase 2:** Mass-run for 11 locales × packages-using-picture-cards (~40+ packages in current C1 inventory)
- **Cost projection:** ~1 session; ~600-800 LoC (smallest scope; reuses flashcards generator infrastructure)
- **Strategic case:** Simplest of the 6; ships fastest; immediate material-status flip on N packages
- **Cross-deps:** IMAGE_VOCABULARY (already shipped; reused from flashcards)
- **Risk:** LOW — image-list template; no text rendering

### Shape (γ) — Manipulative-cut-outs generator

- **Phase 1:** Template authoring with two modes:
  - single-repeat (counting work): one image × itemCount tiles per page
  - variety (sorting/categorization): one image per vocabKey across vocabKeys array
  - Cut-guide rendering: dashed lines between tiles; ~1.5in tile size for finger-friendly K-3 cutting
- **Phase 2:** Mass-run for 11 locales × packages-using-manipulative-cut-outs (~35+ packages)
- **Cost projection:** ~1-2 sessions; ~800-1200 LoC
- **Strategic case:** Concrete-manipulative pedagogical role; specific K-3 cut-and-handle classroom workflow
- **Cross-deps:** IMAGE_VOCABULARY (reused)
- **Risk:** MEDIUM — layout + cut-guide rendering; two distinct modes

### Shape (δ) — Sentence-strips generator

- **Phase 1:** framePreset template substrate (this-is-a / i-see-a / i-have-a / there-are-count-plural / there-is-a-position / etc.) per materials-catalog.json
- **Phase 2:** Per-locale morphology resolution: gender + article + plural agreement. Locale morphology classes:
  - **Romance (es/it/pt/fr):** masculine/feminine articles (el/la, il/la, o/a, le/la) + plural agreement
  - **Germanic (de/nl):** definite article variation (der/die/das, de/het) + case marking
  - **Nordic (sv/da/no):** common/neuter gender + suffix article (en/et, en/et, en/et)
  - **Finnish:** agglutinative case marking (no article); critical morphology QC
  - **English:** simplest baseline
- **Phase 3:** Mass-run for 11 locales × packages-using-sentence-strips (~50+ packages)
- **Cost projection:** ~3-4 sessions; ~2500-3500 LoC; **HIGHEST QC RISK** in Pillar 5
- **Strategic case:** Language-frame pedagogical role; richest substrate for K-3 multilingual classroom literacy work
- **Cross-deps:** IMAGE_VOCABULARY (gender + plural metadata across 11 locales; may surface IMAGE_VOCABULARY gaps per Stream A Arc 2 Class D 141 gender-data findings)
- **Risk:** HIGH — locale morphology + NSR-flag-class for Nordic/Romance per §17.5.1; sentence frames must render grammatically correct in target classroom register

### Shape (ε) — Parent-take-home-letter generator

- **Phase 1:** Bilingual template: body in homeLanguage (parent's language; recent-immigrant context per CLAUDE.md §1 international school + dual-language program audience) + picture cues labeled in target instruction language
- **Phase 2:** CEFR A2 reading-level constraint at body text:
  - Lexile ~400 / CEFR A2 equivalent across all 11 locales
  - Tone variants: warm / formal / playful per package material spec
  - Signature line + optional school-letterhead header
- **Phase 3:** Mass-run for 11 locales × homeLanguage variants × packages-using-parent-letter (high-cardinality; needs per-package authoring or template-driven generation)
- **Cost projection:** ~2-3 sessions; ~1800-2500 LoC
- **Strategic case:** Home-school-bridge pedagogical role; directly serves multilingual K-3 audience per §1 acquisition strategy
- **Cross-deps:** IMAGE_VOCABULARY (picture cues) + CEFR A2 reading-level constraint validation + sentence-frame template substrate (reused from sentence-strips if ordered after)
- **Risk:** MEDIUM-HIGH — CEFR A2 constraint validation per locale; potential NSR-flag-class for register matching parent-literacy at recent-immigrant level

### Shape (ζ) — Answer-key generator

- **Phase 1:** package.yaml + composedExercises + materials aggregation:
  - One section per composedExercise rendering: appName / exerciseMode / customization parameters / expected answers (where deterministically computable)
  - One section per material requiring teacher reference (numeral-cards reference, sentence-strips text variants, etc.)
  - Pedagogical notes section (optional per includePedagogicalNotes flag)
- **Phase 2:** Exercise-resolver substrate: per appName + exerciseMode, fetch canonical answer pattern OR sample deck from catalog for answer reference
- **Phase 3:** Mass-run for 11 locales × all packages (all packages need answer keys; high-cardinality)
- **Cost projection:** ~2-3 sessions; ~1500-2200 LoC
- **Strategic case:** Teacher-reference pedagogical role; required for teacher classroom prep across all packages
- **Cross-deps:** Package metadata schema + exercise-palette.json + composedExercises customization-parameter resolution per app
- **Risk:** MEDIUM — depends on stable schemas (package.yaml + exercise-palette.json); aggregation logic complexity scales with material/exercise variant count

## 4. Recommended commission shape options

Three commission cycle structures available for operator strategic-input:

### (P1) All 6 sole-arc

- Phase 1 through Phase 6 sequential, one generator per phase
- Cost: ~12-18 sessions cumulative
- Strategic case: full Pillar 5 commission cycle CLOSED state at end; all material-status badges flip SUBSTRATE-GAP → SHIPPED in one commission cycle
- Risk: long commission cycle; operator-attention concentration sustained over weeks

### (P2) Simple-first phased

- **Phase 1 cluster** (~3-5 sessions; 3 simple generators): α (numeral-cards) + β (picture-cards) + γ (manipulative-cut-outs)
- **Phase 2 cluster** (~7-10 sessions; 3 complex generators): δ (sentence-strips) + ε (parent-letter) + ζ (answer-key)
- Strategic case: 3 material-status flips at Phase 1 close demonstrate pillar progress empirically; Phase 2 commencement informed by Phase 1 learnings
- Risk: Phase 2 launch dependent on Phase 1 close + operator strategic-input on complex generators

### (P3) Priority-driven

- Operator picks 2-3 highest-impact generators per empirical demand signal
- Cost: ~3-8 sessions per selection
- Strategic case: bounded commission cycle; surfaces empirical demand signal for remaining generators at close
- Risk: partial Pillar 5 cycle; "Generator pending" badges persist on some materials

**CC default-recommendation if no strategic preference surfaces:** (P2) Simple-first phased — empirically validates pillar architecture at low cost-risk before committing complex-generator scope.

## 5. Cross-pillar integration

Per material generator ship:
- `frontend/lib/teaching-packages/material-status.ts` MATERIAL_STATUS entry flips from `substrate-gap` / `deferred` → `shipped` with `shippedAnchor` link
- `TeachingPackageMaterialsList` rendering automatically shows sage-50 background + "Available below ↓" hint per existing pattern
- Teaching-package detail page surfaces material with download/preview UI (parallel to flashcards section pattern)

No new TeachingPackageDetail component edits required per generator; only material-status.ts data extension.

Bundle browse-route (`/[locale]/themed-bundles/[bundleSlug]`) surfaces unchanged; bundles compose teaching-packages which compose materials.

## 6. Concurrent-arc compatibility

Per (P3) β shape continuation precedent (11 paired phases / 7 commission cycles; 20/20 §A.13.6 firings × clean resolution):

- Pillar 5 generator commission compatible with concurrent commissioning per (P3) β shape if filesystem-territory clean
- Likely concurrent candidates at Pillar 5 commencement:
  - Tier 3+4 i18n fill (fr/it/pt/sv/da/no/fi) — orthogonal territory
  - Stream A Arc 2 Class A/B/D operator-coordinated work — orthogonal
  - (μ) post-launch SEO data re-evaluation — orthogonal
- Non-compatible (same-territory):
  - Pillar 1 master-package authoring extension (C1 advancement) — touches `docs/lesson-plans/packages/` which material generators read

## 7. Out of scope (Pillar 6+)

- Material customization UI (operator-facing material configurator) — teachers download generator output as-is; per-package customization happens at package authoring time, not material download time
- Custom theme uploads — themes locked at 50 canonical-color themeAxisKeys per §16.5
- Per-student personalization (name on materials, etc.) — student-data-bearing surface; out of v1 launch per §11
- Material analytics + usage tracking — out of v1 per §11
- Mac Studio AI enrichment of materials — Pillar 4 Arc 3 (γ) candidate; orthogonal pillar territory
- Catalog deck integration with materials (deck.html embeds material previews) — Pillar 4 Arc 3 (β) candidate; orthogonal

## 8. Authorization

Operator-strategic decisions at commencement:

1. **Commission shape selection** (P1 vs P2 vs P3) — operator picks at next session
2. **Generator priority order** within shape — operator picks if (P3) is selected
3. **Concurrent-arc pairing** — Pillar 5 sole-arc vs concurrent with Tier 3+4 i18n OR operator-coordinated work

CC self-adjudicates implementation decisions per ratified scope per §3.4 + established Pillar 4 Arc 1+2 generator pattern precedent.

## 9. Cost projection summary

| Shape | Sessions | LoC | Mass-run? | QC risk |
|---|---:|---:|---|---|
| (α) Numeral-cards | 1-2 | 800-1200 | YES (11 locales × N packages) | LOW |
| (β) Picture-cards | 1 | 600-800 | YES (11 locales × ~40 packages) | LOW |
| (γ) Manipulative-cut-outs | 1-2 | 800-1200 | YES (11 locales × ~35 packages) | MEDIUM |
| (δ) Sentence-strips | 3-4 | 2500-3500 | YES (11 locales × ~50 packages) | **HIGH** |
| (ε) Parent-letter | 2-3 | 1800-2500 | YES (11 locales × homeLanguage × N packages) | MEDIUM-HIGH |
| (ζ) Answer-key | 2-3 | 1500-2200 | YES (11 locales × ALL packages) | MEDIUM |
| **Total (P1) cumulative** | **12-18** | **8000-11400** | | |

## 10. Standing position at Pillar 5 spec DRAFT close

- Pillar 5 commission spec DRAFT shipped (this commit)
- Awaits operator strategic-input on (P1)/(P2)/(P3) shape ratification at next session
- 6 material-status badges remain SUBSTRATE-GAP / DEFERRED on teaching-package detail page until Pillar 5 commission cycle ships per-generator output
- (R2) ADVANCING-NATURALLY state preserved at Pillar 5 spec DRAFT shipping

CC default-recommendation: **(P2) Simple-first phased** commencement at operator ratification per empirical low-risk validation of pillar architecture before complex-generator commitment.

## 11. Cross-references

- `docs/lesson-plans/flashcard-arc-3-commission-spec.md` — Pillar 4 Arc 3 spec precedent (commission-shape pattern; 6 candidate α-ζ framing)
- `docs/lesson-plans/flashcard-arc-2-recon.md` — Pillar 4 Arc 2 generator + mass-run precedent
- `frontend/config/materials-catalog.json` — material spec source for each generator
- `frontend/scripts/generate-flashcards.ts` — Pillar 4 Arc 1+2 generator implementation precedent
- `frontend/scripts/lib/flashcard-package-loader.ts` — package-loader pattern (per-generator parallel)
- `frontend/lib/teaching-packages/material-status.ts` — cross-pillar integration target (status flip per generator)
- CLAUDE.md §A.1 (isolated-storage convention) — Hetzner CDN destination pattern
- CLAUDE.md §6 (11 locales + IMAGE_VOCABULARY) — substrate source
- CLAUDE.md §17.5.1 (NSR-flag pattern for Nordic + Tier 4 Romance) — relevant for (δ) sentence-strips QC
- Stream A Arc 2 Class D — IMAGE_VOCABULARY gender-data findings (relevant for (δ))

---

*End of Pillar 5 commission spec draft. Status: DRAFT — operator ratification at next session per (P1)/(P2)/(P3) shape selection.*
