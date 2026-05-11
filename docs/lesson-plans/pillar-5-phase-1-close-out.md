# Pillar 5 Phase 1 close-out recon

**Type:** `[DOCS][PILLAR-5]` Phase 1 close-out — Sub-Phase 1.4 deliverable
**Branch:** `pivot/printable-business-toolkit`
**Authored:** 2026-05-11
**Status:** **PILLAR 5 PHASE 1 COMPLETE.** 3 of 3 simple template-driven generators shipped per (P2) Simple-first phased shape. Phase 2 commencement awaits operator strategic-input adjudication per (2a)/(2b)/(2c) framework below.

## 1. Context

Per operator (P2) Simple-first phased ratification at Pillar 5 commission spec DRAFT (`6f2a58f6`), Phase 1 ships 3 simple template-driven generators in sequence per single-session sub-phase cadence. Phase 1 commenced at Sub-Phase 1.1 (β picture-cards) post-spec-ratification and completed across 3 generator-ship sub-phases + this close-out recon.

**Phase 1 sub-phase chain:**

| Sub-Phase | Commit | Generator | Mass-run scope | LoC |
|---|---|---|---:|---:|
| 1.1 | `468e9459` | β picture-cards | 33 PDFs (3 C5 × 11 locales) | 831 |
| 1.2 | `89c9defa` | α numeral-cards | 11 PDFs (count-objects-1-to-10 × 11 locales) | 691 |
| 1.3 | `ec762f2f` | γ manipulative-cut-outs | 33 PDFs (3 C5 × 11 locales) | 849 |
| **Total** | | **3 generators** | **77 PDFs** | **2,371** |

## 2. Per-sub-phase deliverable audit

### Sub-Phase 1.1: β picture-cards (`468e9459`)

**Files shipped:**
- `frontend/scripts/lib/picture-cards-package-loader.ts` (~280 LoC) — package.yaml loader; theme + vocabKey image resolution from image library
- `frontend/scripts/lib/picture-cards-render.ts` (~220 LoC) — Sharp image preprocessing + Playwright PDF; image-only card grid (no word-band); cut-guides per card
- `frontend/scripts/generate-picture-cards.ts` (~270 LoC) — CLI entry point with --packages/--locales/--all-packages/--resume/--concurrency
- `frontend/components/teaching-packages/TeachingPackagePictureCardsSection.tsx` (~50 LoC) — server-rendered section with PDF download button
- material-status.ts flip + page.tsx wire + 4-locale i18n (16 entries)

**Mass-run output:** 33 PDFs (3 C5 free-tier packages × 11 locales). PDF sizes ~1.3MB per file (image-bearing).

**§A.13.6 firings:** 21st firing at nginx config sed-insert collapse (caught at production curl-verify per Item 11 discipline); clean resolution via Python regex rewrite.

**Frontend verification:** picture-cards section renders at `#picture-cards` anchor; PDF downloads work; material-status badge flipped SUBSTRATE-GAP → SHIPPED.

### Sub-Phase 1.2: α numeral-cards (`89c9defa`)

**Files shipped:**
- `frontend/scripts/lib/numeral-cards-package-loader.ts` (~150 LoC) — text-only loader; NO image-library resolution; numeralRange + showNumberWord extraction
- `frontend/scripts/lib/numeral-cards-render.ts` (~230 LoC) — text-only card template; large numeral (Fredoka 700 clamp 48-140pt) + optional smaller number-word (Lexend Deca 500) via NUMBER_WORDS resource at `REFERENCE TRANSLATIONS/number-words.js`
- `frontend/scripts/generate-numeral-cards.ts` (~265 LoC) — CLI entry mirroring picture-cards surface
- `frontend/components/teaching-packages/TeachingPackageNumeralCardsSection.tsx` (~50 LoC) — section component
- material-status + page wire + 4-locale i18n

**Mass-run output:** 11 PDFs (count-objects-1-to-10 × 11 locales; only C5 package with numeral-cards material). PDF sizes ~38KB per file (text-only; substantially smaller than image-bearing).

**§A.13.6 firings:** 0 new — pattern fork from picture-cards precedent operated as expected.

**Frontend verification:** numeral-cards section renders at `#numeral-cards` anchor; PDF downloads work; material-status badge flipped DEFERRED → SHIPPED.

### Sub-Phase 1.3: γ manipulative-cut-outs (`ec762f2f`)

**Files shipped:**
- `frontend/scripts/lib/manipulative-cut-outs-package-loader.ts` (~230 LoC) — mode-dependent image resolution (single-repeat: first theme image; variety: N images)
- `frontend/scripts/lib/manipulative-cut-outs-render.ts` (~250 LoC) — variable grid layout per itemSize (1in=25.4mm / 1.5in=38.1mm / 2in=50.8mm); multi-page output when itemCount × tile area > page area; Sharp + Playwright reused
- `frontend/scripts/generate-manipulative-cut-outs.ts` (~265 LoC) — CLI entry
- `frontend/components/teaching-packages/TeachingPackageManipulativeCutOutsSection.tsx` (~50 LoC) — section component + itemCount/itemSize metadata display
- material-status + page wire + 4-locale i18n

**Mass-run output:** 33 PDFs (3 C5 free-tier packages × 11 locales). PDF sizes 140-180KB (image-tile grid; multi-page for high itemCount). count-objects-1-to-10 (itemCount=40 + medium-1.5in) produces multi-page output.

**§A.13.6 firings:** 0 new — pattern fork continued cleanly with variable-grid layout addition.

**Frontend verification:** manipulative-cut-outs section renders at `#manipulative-cut-outs` anchor; itemCount + itemSize displayed; PDF downloads work; material-status badge flipped SUBSTRATE-GAP → SHIPPED.

## 3. Cross-sub-phase pattern audit — mechanical-fan-out cadence

**Pattern fork precedent:** Sub-Phase 1.1 established generator pipeline shape (loader + renderer + entry point + section component + material-status flip + page wire + Tier 1+2 i18n). Sub-Phases 1.2 + 1.3 inherited the shape cleanly with minimal divergence:

| Component | 1.1 (β) | 1.2 (α) | 1.3 (γ) |
|---|---|---|---|
| Loader pattern | Direct fork from flashcards-loader | Simplified (no image-library resolution) | Direct fork with mode-dependent resolution |
| Renderer pattern | Sharp + Playwright + image grid | NO Sharp; Fredoka numeral + Lexend word | Sharp + variable grid; multi-page support |
| Entry point | Boilerplate CLI surface | Same CLI surface | Same CLI surface |
| Section component | PDF download link + cardsPerPage URL | Same shape | Same shape + itemCount/itemSize metadata |
| material-status flip | substrate-gap → shipped | deferred → shipped | substrate-gap → shipped |
| Page wire-in | Conditional render per material entry | Same | Same |
| i18n keys | 4 keys × 4 locales | 4 keys × 4 locales | 4 keys × 4 locales |

**LoC envelope:** 831 + 691 + 849 = **2,371 across 3 sub-phases (~790 avg per generator)**. Within Pillar 5 spec projection (~600-1200 per simple generator).

**Time envelope:** ~2.5-3.5 hours per sub-phase per (P3) β shape projection. Sub-Phase 1.1 hit upper bound due to 21st firing; Sub-Phases 1.2 + 1.3 hit middle of projection (no firings).

**§A.13.6 firing distribution:** 1 firing across 3 sub-phases (21st at 1.1 nginx; 0 at 1.2 + 1.3). Sub-Phase 1.1 established nginx-substrate pattern; subsequent sub-phases inherited without surfacing new firings — empirical signal of mechanical-fan-out cadence operating correctly.

## 4. Production state inventory

**Hetzner CDN assets:**
- `/var/www/lcs-media/materials/picture-cards/<locale>/<package>/print-{6,9}up.pdf` × 33 files
- `/var/www/lcs-media/materials/numeral-cards/<locale>/count-objects-1-to-10/print-4up.pdf` × 11 files
- `/var/www/lcs-media/materials/manipulative-cut-outs/<locale>/<package>/print-cut-outs.pdf` × 33 files
- **Total: 77 PDFs at ~25MB cumulative**

**nginx routing:** `^~ /materials/` prefix-match location (Sub-Phase 1.1) handles all 3 material subdirs without per-material config changes. Cache-Control: public, max-age=300.

**Frontend material-status state at Phase 1 close:**

| Material | Status | Anchor |
|---|---|---|
| flashcards | SHIPPED (Pillar 4 Arc 2) | `#flashcards` |
| picture-cards | SHIPPED (Sub-Phase 1.1) | `#picture-cards` |
| numeral-cards | SHIPPED (Sub-Phase 1.2) | `#numeral-cards` |
| manipulative-cut-outs | SHIPPED (Sub-Phase 1.3) | `#manipulative-cut-outs` |
| sentence-strips | SUBSTRATE-GAP | — (Phase 2 δ scope) |
| parent-take-home-letter | SUBSTRATE-GAP | — (Phase 2 ε scope) |
| answer-key | SUBSTRATE-GAP | — (Phase 2 ζ scope) |

**4 of 7 SHIPPED.** Remaining 3 substrate-gap entries are precisely the Phase 2 scope (δ + ε + ζ complex generators).

## 5. Production-canonical-path verification per §A.13.28 + Item 11

At Sub-Phase 1.4 close (this commit), sample-curl matrix executed:

**PDF sample-curl (14 URLs across 3 generators × 2 locales):**
- picture-cards en/de × 3 C5 packages = 6 PDFs → all 200 ✓
- numeral-cards en/de × count-objects-1-to-10 = 2 PDFs → all 200 ✓
- manipulative-cut-outs en/de × 3 C5 packages = 6 PDFs → all 200 ✓

**HTML page rendering (6 URLs):**
- /en + /de × 3 C5 packages = 6 HTML
- Section anchors verified per package material substrate:
  - count-objects-1-to-10: picture=✓ numeral=✓ manipulative=✓ (×2 locales)
  - identify-letter-sounds-vowels: picture=✓ numeral=✗ manipulative=✓ (×2 locales; numeral correctly absent — no material entry)
  - identify-living-vs-nonliving: picture=✓ numeral=✗ manipulative=✓ (×2 locales)

20/20 sample URLs render expected state. Item 11 production-canonical-path verification discipline operationally clean at Phase 1 close-out boundary.

## 6. Phase 2 commencement adjudication framework

Per (P2) Simple-first phased ratification: Phase 2 commencement decision per empirical demand signal at Phase 1 close. Operator strategic-input options:

### (2a) Commence Phase 2 immediately per (P2) shape continuation

- Commit ~7-10 sessions cumulative per Pillar 5 spec projection across δ + ε + ζ
- (P2) shape doctrine validated: Phase 1 mechanical-fan-out cadence empirically clean
- (R2) ADVANCING-NATURALLY state preserved
- **CC default-rec IF Phase 1 evaluation surfaces no significant findings**

### (2b) Defer Phase 2

- Phase 1 close suffices for current (R2) state advancement
- Phase 2 commits at future strategic moment per empirical demand signal (post-launch usage data; complex-material demand evidence)
- 3 of 7 substrate-gap badges persist on count-objects-1-to-10 page until empirical demand signal warrants

### (2c) Partial Phase 2 — commit subset

- ζ answer-key first as bounded-data-driven case (correct-answer content may already exist in package YAMLs; lower content-generation complexity than δ/ε)
- δ sentence-strips + ε parent-letter defer per content-generation complexity assessment
- ~2-3 sessions cumulative for ζ-only

**Empirical demand signal absorption:**

Operator inspects the 4 production URLs at Phase 1 close:
- `/en/teaching-packages/count-objects-1-to-10` — 4 shipped materials sections (flashcards + picture-cards + numeral-cards + manipulative-cut-outs)
- `/de/teaching-packages/count-objects-1-to-10` — same surface in DE locale
- `/en/teaching-packages/identify-letter-sounds-vowels` — 3 shipped sections (flashcards + picture-cards + manipulative-cut-outs)
- `/en/teaching-packages/identify-living-vs-nonliving` — same

Operator surfaces findings (UX / content / integration class) per Q3-d composite framing. Findings inform Phase 2 adjudication at next session.

## 7. Phase 6 fold-queue carry-forward — Item 29 candidate

**Item 29 (candidate; awaits Phase 6 [DOCS] fold-cycle absorption):**

> **Sub-phase mechanical-fan-out cadence as commission shape sub-pattern.** When commission's phase decomposes into structurally-uniform sub-phases sharing template/integration pattern, sub-phase 1 establishes precedent + sub-phases 2+N inherit + 0-new-firings becomes empirical signal of cadence operating correctly. Joins Items 1 + 17 + 21 in mechanical-fan-out doctrine block.

**Empirical anchor:** Pillar 5 Phase 1 Sub-Phases 1.1 / 1.2 / 1.3:
- Sub-Phase 1.1 established generator pipeline shape + 1 §A.13.6 firing (nginx)
- Sub-Phase 1.2 inherited cleanly + 0 firings
- Sub-Phase 1.3 inherited cleanly + 0 firings
- 0-new-firings across 1.2 + 1.3 = empirical signal of mechanical-fan-out cadence

**How to apply (at future commission sub-phase decomposition):**
1. Identify whether sub-phases share template/integration pattern (typically: same loader+renderer+component shape; differ only in domain-specific render logic)
2. Sub-phase 1 establishes precedent + canonical sub-phase commit shape
3. Sub-phases 2+N inherit; firings expected only at substrate-novelty boundaries
4. 0-new-firings post-precedent = mechanical-fan-out cadence operational; expected vs unexpected divergence surfacing

**Cross-references at codification:**
- Item 1 (concurrent-arc cadence)
- Item 17 (substrate audit at mass-execution boundary)
- Item 21 (mass-run partial-failure rate as commission close-out metric)
- §A.13.12 mechanical-vs-architectural fan-out classification

Phase 6 [DOCS] fold-cycle absorbs Item 29 alongside Items 22-28 from prior commission cycles. Scheduling per operator strategic-input.

## 8. Pillar 5 Phase 1 status

- **Sub-Phase 1.1 CLOSED** at `468e9459` (β picture-cards)
- **Sub-Phase 1.2 CLOSED** at `89c9defa` (α numeral-cards)
- **Sub-Phase 1.3 CLOSED** at `ec762f2f` (γ manipulative-cut-outs)
- **Sub-Phase 1.4 CLOSED** at this commit (Phase 1 close-out recon)
- **PILLAR 5 PHASE 1 COMPLETE** — all 3 simple template-driven generators shipped per (P2) ratified shape.

## 9. Standing position

Pillar 5 Phase 1 COMPLETE. Phase 2 commencement awaits operator strategic-input adjudication on (2a)/(2b)/(2c) per Phase 1 evaluation findings.

Subsequent operator-attention surface points:
- Operator inspection of 4 production URLs at Phase 1 close (per §6 Empirical demand signal absorption)
- (2a)/(2b)/(2c) Phase 2 adjudication at next session
- Tier 3+4 i18n + full-catalog mass-run remain backlog candidates per Pillar 5 spec out-of-scope framing

(P3) β shape sustained at 11th paired phase / 7th commission cycle. 21/21 §A.13.6 firings × 100% clean resolution holds across commission framework lifespan.

## 10. Cross-references

- `docs/lesson-plans/pillar-5-commission-spec.md` — Pillar 5 commission spec DRAFT (`6f2a58f6`); 6 candidate shapes α-ζ + 3 commission-shape options P1/P2/P3
- `docs/lesson-plans/flashcard-arc-3-close-out.md` — Pillar 4 cycle close-out precedent (recon doc shape)
- `docs/lesson-plans/flashcard-arc-2-recon.md` — primary close-out recon template
- Sub-Phase 1.1 commit `468e9459` — β picture-cards generator + integration
- Sub-Phase 1.2 commit `89c9defa` — α numeral-cards generator + integration
- Sub-Phase 1.3 commit `ec762f2f` — γ manipulative-cut-outs generator + integration
- `frontend/lib/teaching-packages/material-status.ts` — 4 SHIPPED + 3 SUBSTRATE-GAP state at this close
- `frontend/config/materials-catalog.json` lines 80-104 (picture-cards) / 215-244 (manipulative-cut-outs) / 279-305 (numeral-cards) — spec sources
- `REFERENCE TRANSLATIONS/number-words.js` — NUMBER_WORDS resource consumed by Sub-Phase 1.2

---

*End of Pillar 5 Phase 1 close-out recon. Status: PHASE 1 COMPLETE; Phase 2 commencement awaits operator adjudication.*
