# Pillar 4 Arc 3 commission spec — flashcard catalog extension OR enrichment OR bundle-linkage

**Type:** `[FEATURE][PILLAR-4]` commission shape varies per Shape choice
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 3-5 (Shape-dependent)
**Estimated LoC:** ~500-3,000 (Shape-dependent)
**Estimated sessions:** 1-3 (Shape-dependent)
**Status: DRAFT — operator ratification pending at Pillar 4 Arc 2 close adjudication batch.**

## 1. Context

Pillar 4 Arc 2 closed at 2026-05-11 across 10 commits + 6 paired phases. 3,102 flashcard renders live at Hetzner CDN; subscriber-gating substrate (access-control + access-check API) + UI layer (per-package route + FlashcardDeck + FlashcardPaywall) + Playwright e2e + Tier 1+2 i18n shipped. **C5 LOCKED + C6 SATISFIED.**

**Notable arc-2-recon patterns generalizing forward:**

1. β shape (P3) at 6-paired-phase scale operationally stable + asymmetric-scope sustained
2. §A.13.6 + §A.13.8 paired discipline empirically reliable across 9 firings × 100% clean resolution
3. Substrate-audit-vs-mass-execution boundary discipline (Item 17) validated
4. Paired-Condition trajectory pattern (C5 + C6 advance together via paired Pillar 4 Arc 2 + Pillar 2 Arc 6 cycle)
5. Production-canonical-path verification (Item 11) provides audit-trail value at deploy boundary
6. Mass-run partial-failure rate as commission close-out metric (Item 21) — 98.9% success rate transparent reporting

**Deferred candidate queue across Pillar 4 Arc 2:**
- Per-image standalone deck.html surface (Decision 3 (D) deferred)
- Bundle-flashcard linkage (Arc 2 §7)
- Mac Studio AI enrichment (Arc 2 §7)
- Sentence-frame substrate revival (Arc 1 scope-correction reversal)
- BW-image flashcards (Arc 1 scope-correction reversal)
- deck.html external image references (C-stub at `7c50a2b5`)
- Optional flashcards browse landing (Phase 3d deferred)
- Tier 3+4 i18n fill (fr + it + pt + sv + da + no + fi flashcardReader namespace; Wave-N gap-fill candidate)

## 2. Pre-locked architecture (do NOT relitigate)

Per CLAUDE.md §6 + Pillar 4 Arc 1+2 ship state. CC adjudicates within these locks.

- **Sky+v2 canonical design** — 2:3 portrait card; 60% image; 30% word-band; 4mm theme-color accent; soft-hyphen substrate; per Pillar 4 Arc 1 lock
- **Per-package deck.html surface (Decision 3 (D))** — bundled envelope at ~1,573; per-image standalone DEFERRED
- **Hetzner CDN destination (Decision 1)** — `/var/www/lcs-media/flashcards/<locale>/<package>/...`
- **C5 free-tier-3-package allowlist** — count-objects-1-to-10 + identify-letter-sounds-vowels + identify-living-vs-nonliving (operator-locked at Phase 3a close)
- **Access-control predicate composition** — `canAccessFlashcard(packageSlug, session)` from `lib/flashcards/access-control.ts`; free-tier → admin-bypass → active-LCS-subscription → gated resolution order
- **Pixel-identical visual treatment between free + paid tiers** — per CONVERSATION-HANDOFF §0 + Plan-agent recommendation; preserves §1 acquisition flywheel
- **TypeScript build constraint** — js-yaml require() pattern via require()+cast (per Phase 4 fix); if @types/js-yaml install warranted in future arc, can refactor

## 3. Phase shape options (operator chooses at commencement)

Pillar 4 Arc 3 offers 6 candidate shapes; CC default-recommends contingent on operator strategic-input + post-launch empirical signals.

### Shape (α) — Per-image standalone deck.html surface

- **Phase 1:** extend `frontend/scripts/generate-flashcards.ts` with `--per-image` mode rendering individual standalone deck.html per (image, locale) combination
- **Phase 2:** mass-run ~16,632 per-image deck.html renders to `/var/www/lcs-media/flashcards/per-image/<locale>/<vocab-key>/deck.html`
- **Phase 3:** UI integration — per-image surface for SEO + embed contexts; sitemap entries
- **Phase 4:** Production ship + recon + Arc 4 spec drafting
- **Cost projection:** ~3-4 sessions; ~2,000-3,000 LoC; mass-run wall-clock similar to Phase 2 (~10-15 min on Hetzner)
- **Strategic case:** Decision 3 (D) deferred per scope-discipline; opens per-image SEO surface (~16,632 indexable URLs) + embed contexts (atomic single-card-share unit); structural multiplier for §1 acquisition flywheel
- **Trade-off:** Storage scale (~4GB → ~40GB at base64 embedding) — likely triggers (C-stub) external-image-reference architectural pivot as prerequisite

### Shape (β) — Bundle-flashcard linkage

- **Phase 1:** integration layer — `frontend/components/bundles/BundleFlashcardsSection.tsx` renders flashcard packages associated with each Pillar 2 bundle
- **Phase 2:** Bundle reader extensions — Each of 45 bundles' YAML adds `flashcardPackages: []` field; populates per-bundle from `teachingPackageSlugs[]` filtered to packages-with-flashcards-material (~95 / 100)
- **Phase 3:** Subscriber-gated bundle access via composed access-control predicate
- **Phase 4:** Production ship + recon + Arc 4 spec drafting
- **Cost projection:** ~2-3 sessions; ~1,500-2,500 LoC
- **Strategic case:** Pillar 4 Arc 2 §7 candidate; integrates Pillar 2 bundles with flashcard surface; cross-pillar architectural integration

### Shape (γ) — Mac Studio AI enrichment

- **Phase 1:** Mac Studio service extension to generate supplementary flashcard content (pronunciation guides; usage examples; etymology notes)
- **Phase 2:** Integration with deck.html template via Phase 3 enrichment data API
- **Phase 3:** Subscriber-gated AI content delivery
- **Phase 4:** Production ship + recon + Arc 4 spec drafting
- **Cost projection:** ~3-4 sessions; ~2,000-3,000 LoC
- **Strategic case:** Pillar 4 Arc 2 §7 candidate; differentiates flashcards beyond image+word; commercial value-add at paid-tier
- **Trade-off:** Mac Studio dependency reactivation per §4.5 + §15.3 doctrine; needs operator-strategic AI-quality assessment

### Shape (δ) — Sentence-frame substrate revival

- **Phase 1:** sentence-frame template authoring (per-locale; ~25 keys per locale × 11 locales)
- **Phase 2:** flashcard-render.ts extension to optionally include sentence-frame band
- **Phase 3:** mass-rerun for ~3,102 flashcards with sentence-frame inclusion
- **Cost projection:** ~2-3 sessions; ~1,500-2,500 LoC; NSR-flag class concerns for Nordic/Romance locales
- **Strategic case:** Pillar 4 Arc 1 ratification-time scope-correction reversal; commission ONLY if post-launch SEO/engagement signals warrant sentence-frame revival

### Shape (ε) — BW-image flashcards

- **Phase 1:** Substrate audit for BW theme dirs (animals_bw + apparel_bw + 26+ others)
- **Phase 2:** Pipeline extension to support BW image source
- **Phase 3:** mass-run for BW flashcard generation (~1,326 BW images × 11 locales = ~14,586 BW flashcard renders)
- **Phase 4:** Production ship + recon + Arc 4 spec drafting
- **Cost projection:** ~3-4 sessions; ~2,500-3,500 LoC; mass-run substantial
- **Strategic case:** Pillar 4 Arc 1 ratification-time scope-correction reversal; commission ONLY if operator-side deck-generation expands to BW themes

### Shape (ζ) — Optional flashcards browse landing + Tier 3+4 i18n + minor fixes

- **Phase 1:** Optional flashcards browse landing page `/[locale]/flashcards/` (list all packages-with-flashcards-material; free-tier visible; paid-tier locked)
- **Phase 2:** Tier 3+4 i18n fill (fr + it + pt + sv + da + no + fi flashcardReader namespace; ~175 entries across 7 locales)
- **Phase 3:** Minor UI polish + production ship + recon + Arc 4 spec drafting
- **Cost projection:** ~1-2 sessions; ~500-1,200 LoC
- **Strategic case:** Closing Phase 3d deferred + i18n Wave-N gap-fill in unified arc; lighter commission shape vs Shapes α-ε
- **CC default-recommendation if other shapes don't surface strategic case** — closes Phase 3d + Wave-N gap in single arc; lowest-cost Arc 3 shape

## 4. Concurrent-arc compatibility

Pillar 4 Arc 3 supports concurrent-arc commencement per Arc 12+ precedent + (P3) β shape 3-cycle 6-paired-phase validation. Likely concurrent candidates at Pillar 4 Arc 2 close:

- **Pillar 2 Arc 7** — Shape A/B/C/D/E from DRAFT at `543e3411`
- **Arc 16** — if final ~150 lesson-plan-target requires additional packages (operator strategic re-evaluation)
- **NSR-resolution arc** — if operator commissions (Phase 2 deferral now potentially expiring)
- **Stream A Arc 2** — vocabulary-substrate gap absorption candidate
- **(μ) slug-rationalization** — DEFER post-launch likely continues

CC default-recommendation: (β-continued) Pillar 4 Arc 3 + Pillar 2 Arc 7 paired per empirically-validated 3-cycle β shape pattern. Triple-concurrent (γ shape — untested at this scale) possible if scope envelopes permit.

## 5. Verification expectations

Per Shape-specific verification matrices:

- **Shape (α):** mass-run 100% success + per-image deck.html spot-check + sitemap entry verification
- **Shape (β):** bundle-flashcard integration spot-check + cross-pillar predicate composition verification
- **Shape (γ):** Mac Studio AI content quality assessment + subscriber-gated delivery e2e
- **Shape (δ):** sentence-frame rendering across 11 locales + NSR-flag clearance for Nordic/Romance
- **Shape (ε):** BW-mass-run spot-check + cross-mode (color + BW) coexistence verification
- **Shape (ζ):** browse landing UI + Tier 3+4 i18n raw-key-leak grep + minor-fix verification

## 6. Authorization

Operator-strategic decisions at commencement:

1. **Phase shape choice** (α vs β vs γ vs δ vs ε vs ζ) — operator picks at Pillar 4 Arc 2 close adjudication batch. CC default-recommends:
   - **(ζ)** lightest-cost — closes Phase 3d + Wave-N gap; recommended if no strong strategic case for substantial Arc 3
   - **(α)** highest structural-multiplier — opens per-image SEO surface; recommended if scale-multiplier is operator priority + storage scale acceptable
   - **(β)** cross-pillar integration — recommended if bundle-flashcard linkage is commercial-product priority
   - **(γ)** AI enrichment — recommended if Mac Studio reactivation is operator strategic + commercial value-add high
   - **(δ)** + **(ε)** — recommended ONLY if post-launch signal warrants reversal of Arc 1 ratification-time scope-corrections
2. **Concurrent-arc evaluation** — paired with Pillar 2 Arc 7 commencement OR sole-arc per (P3) shape decision

## 7. Out of scope (Pillar 4 Arc 4+)

- Mass migration of flashcard architecture (e.g., wholesale shift from base64 embedding to external references absent C-stub commission first)
- Per-image standalone deck.html surface IF Shape α not selected (DEFER to future arc)
- BW-image flashcards IF Shape ε not selected (DEFER to future arc)
- Mac Studio AI enrichment IF Shape γ not selected (DEFER per Mac Studio strategic-fit re-evaluation)
- Sentence-frame substrate revival IF Shape δ not selected (DEFER per Arc 1 scope-correction lock)
- Flashcard analytics + tracking surfaces (out of v1 launch scope per CLAUDE.md §11)

## 8. Cost projection summary

| Shape | Sessions | LoC | Mass-run? | Strategic positioning |
|---|---|---|---|---|
| (α) Per-image | 3-4 | 2,000-3,000 | YES (~16,632 renders) | Structural multiplier; opens SEO + embed |
| (β) Bundle-linkage | 2-3 | 1,500-2,500 | No (integration only) | Cross-pillar architectural integration |
| (γ) AI enrichment | 3-4 | 2,000-3,000 | Partial (AI content gen) | Commercial differentiation |
| (δ) Sentence-frame | 2-3 | 1,500-2,500 | YES (~3,102 renders) | Arc 1 scope-correction reversal |
| (ε) BW flashcards | 3-4 | 2,500-3,500 | YES (~14,586 renders) | Arc 1 scope-correction reversal + scale-doubling |
| (ζ) Browse + Tier 3+4 + minor | 1-2 | 500-1,200 | No | Lightweight close-out |

CC default-recommendation: **(ζ) lightweight close-out** if no strong strategic case for substantial Arc 3; **(α) per-image** if scale-multiplier prioritized; **(β) bundle-linkage** if cross-pillar commercial integration prioritized.

## 9. Q-recon at Pillar 4 Arc 2 close

Operator-strategic decisions surfacing at Pillar 4 Arc 2 close:

- Pillar 4 Arc 3 Shape choice + ratification timing
- Concurrent-arc pairing (Pillar 2 Arc 7 + Arc 16 + NSR-resolution + (μ) + Stream A Arc 2)
- Subscribe-flip trajectory positioning (C5 LOCKED + C6 SATISFIED; advance toward launch-trigger satisfaction across remaining Conditions)

CC awaits operator direction at adjudication batch.

---

*End of Pillar 4 Arc 3 commission spec draft. Status: DRAFT — operator ratification at adjudication batch.*
