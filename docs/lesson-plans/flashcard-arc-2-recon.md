# Pillar 4 Arc 2 commission recon

**Commission:** [FEATURE][PILLAR-4] Pillar 4 Arc 2 — Full-scale flashcard generation + 200-package integration + paid-subscription gating + production ship
**Branch:** `pivot/printable-business-toolkit`
**Phases:** 6 (Phase 0 substrate audit + Phase 1 substrate extensions + Phase 2 mass-run + Phase 3a/3b/3c UI+API+tests+i18n + Phase 4 production ship + Phase 5 commission close-out)
**Sessions:** 8+ (estimate; multiple paired-phase sessions per (P3) β shape)
**Status:** Pillar 4 Arc 2 commission **CLOSED** at 2026-05-11.

## Commission audit-trail — 10 commits across the arc

| Phase | Commit | Deliverables |
|---|---|---|
| Phase 0 (META substrate audit) | `b8c55827` | 4-dimension readiness audit (pipeline + CDN dir + paid-tier gating + DB schema) |
| Phase 1 (substrate audit + extensions) | `7915d960` | 40 SOFT_HYPHENS entries × de+sv+fi (28→68 unique keys) + 4 image-key alias fixes + audit doc |
| Phase 2 pipeline extensions | `d99ee05b` | flashcard-package-loader.ts + generate-flashcards.ts extensions (--all-packages + --resume + --concurrency) |
| Phase 2 mass-run close | `7c50a2b5` | 3,102 flashcard files at Hetzner CDN; 98.9% success rate; (C) commission stub + Phase 2 recon |
| Phase 3a (access-control substrate) | `afa277da` | access-control.ts + access-check API + Phase 3a substrate doc with C5 surface |
| Phase 3b (UI + C5 lock) | `7168f913` | C5 swap (→ identify-living-vs-nonliving) + per-package page + FlashcardDeck + FlashcardPaywall + en flashcardReader namespace |
| Phase 3c (e2e + Tier 1+2 i18n) | `0e17894d` | Playwright e2e (6 tests) + de + es + nl flashcardReader namespace (~75 entries) |
| Phase 4 deploy fix | `2e6c6323` + `78fca447` | js-yaml module declaration → require() pattern (2 §A.13.6 firings at Next.js TS-build boundary) |
| Phase 4 production ship | this commit | Hetzner deploy.sh + curl verification (UI routes + access-check API + CDN regression all 200) |
| Phase 5 commission close-out | this commit | This recon + Arc 3 commission spec DRAFT |

## Outcomes — final state at commission close

### Production state

- **3,102 flashcard renders live** at `/var/www/lcs-media/flashcards/<locale>/<package>/{deck.html,print-6up.pdf,print-9up.pdf}`
- **94 packages × 11 locales × 3 deliverables** = 3,102 (1 unrenderable package: identify-and-name-action-verbs lacks image-library representation — conceptual constraint not substrate gap)
- **Nginx `/flashcards/<locale>/<package>/<file>` location-block** active per §15.7 pattern parallel
- **HTTP 200 verified** on representative samples across en + de + fi locales
- **Per-package access-gated UI route** live at `/<locale>/flashcards/<packageSlug>` (subscriber-gated; noindex robots metadata)
- **Access-check API** at `/api/flashcards/access-check?package=<slug>` returns `{allowed, reason}` per locked Q1+Q2+Q3 semantics

### Launch-trigger Condition advancement

- **C5 LOCKED** — free-tier-3-package allowlist: count-objects-1-to-10 (math) + identify-letter-sounds-vowels (literacy) + identify-living-vs-nonliving (world-knowledge); operator override of CC pre-rec via AskUserQuestion at Phase 3b
- **C6 SATISFIED** — paired Pillar 2 Arc 6 cycle produced 45 bundles × 14 themeAxisKeys; first launch-trigger Condition beyond Pillar 3 to reach satisfied state
- **C2 advanced** — 75 i18n entries added (Tier 1+2 flashcardReader namespace; de + es + nl)
- **C4 advanced** — 14-cluster taxonomy + sub-pattern emergence via paired Pillar 2 cycles

### Pre-locked decision audit-trail

**Q1+Q2+Q3 locks at Phase 2 entry adjudication batch:**
- **Q1 (b) consolidated-triple** — verified at plan-time via 3-package sample (identify-and-name-foods + identify-and-name-emotions + count-objects-1-to-10); multiple flashcards entries per package = print-format variants of SAME vocab set; maps to ONE deck.html (digital) + N print PDFs
- **Q2 fixed-cardCount** — theme-derived packages use explicit cardCount per materialSlug entry (not unbounded theme-dir pull)
- **Q3 master-inherit** — flashcards inherit master vocab_keys; material parameters master-inherit by default

**Decision 1+2+3+4 locks at Phase 2 entry:**
- **Decision 1 Hetzner CDN** — `/var/www/lcs-media/flashcards/` per §A.1 isolated-storage convention
- **Decision 2 parallelization ENABLED** — 4 worker concurrency default; runtime parameter not hardcoded
- **Decision 3 (D)** — per-package now; per-image deferred to future arc (scope-discipline favored option per operator AskUserQuestion)
- **Decision 4 --resume** — per-render granularity via file-existence check; simplest pattern

### Operator-strategic overrides

- **C5 third-domain operator override** (Phase 3b ratification): identify-and-name-emotions (CC pre-rec) → identify-living-vs-nonliving (operator pick) per architectural-centrality reasoning
- **Decision 3 (D) operator selection** (Phase 2 entry): selected per-package-only scope-discipline option over CC's provisional A-lean
- **C5 Phase 3a deferred ratification**: operator surfaced C5 at adjudication batch rather than pre-locking; CC ratified pre-rec OR override at glance-review surface

## §A.13.6 firing pattern — 9 firings; all resolved cleanly

The commission cycle exercises §A.13.6 cost-balloon escape hatch discipline across 9 distinct firings:

| # | Firing point | Resolution path |
|---|---|---|
| 1 | Phase 1 substrate audit reveals SOFT_HYPHENS universe at 416 keys (vs spec target 80-150) | Scope-reduce to 40 high-impact picks × de+sv+fi (~120 entries); defer remaining 376 to Phase 2+ extend-at-need pattern |
| 2 | Phase 1 image-key alias 5 unresolved → 4 fixable + 1 vocab-gap | Apply 4 alias fixes; defer crystal-ball vocab-gap per §10.3 NEVER-MODIFY-IMAGE-VOCABULARY discipline |
| 3 | Phase 2 commencement Hetzner Chromium missing libs (libnspr4 + libnss3 + 9 others) | Operator (A) ratification → apt-get install of 11 Playwright/Chromium runtime libraries per §A.5 protect-production-stability discipline |
| 4 | Phase 2 material resolution complexity surfaced (multiple flashcards entries per package; vocabKeyList vs theme imageSource) | Operator 3-question adjudication batch (Q1+Q2+Q3); CC verified Q1 via 3-package sample at plan-time |
| 5 | Phase 2 mass-run 11 task failures (1.05% rate; identify-and-name-action-verbs unrenderable) | Recognized as conceptual constraint not substrate gap; informational not halt-class; filed as deferred finding |
| 6 | Pillar 2 Arc 6 Phase 1 themeAxisKey verification at execution (3 of 4 originally-recommended themes unverified) | CC self-adjudicated substitute picks per §A.13.8 (zoo-animals + space + tools replacing library + garden + arts_and_crafts); Item 22 candidate doctrine emerges |
| 7 | Phase 3b C5 third-domain pre-rec divergence (CC: emotions; operator: living-vs-nonliving) | AskUserQuestion surfaces 3 options; operator override of CC pre-rec per architectural-centrality reasoning |
| 8 | Phase 4 deploy first attempt — Next.js TS-build catches js-yaml untyped module | `declare module 'js-yaml'` attempt at local scope |
| 9 | Phase 4 deploy second attempt — TS rejects `declare module` augmentation of resolved-untyped path | require() pattern with explicit `any`-shaped cast |

**Firing distribution analysis:** firings concentrate at boundaries — commission entry adjudication (1-4), mass-execution (5), cross-arc cross-cluster commission interactions (6), operator pre-rec surfaces (7), deploy-boundary type-check (8-9). Foundation phases + final phases rarely fire. **9 firings across 8+ sessions = ~1.1 firings per session.** Item 20 (Phase 6 fold-queue) firing distribution analysis confirmed empirically: substrate-audit-vs-execution boundaries dominate firing surface.

## Phase 6 fold-queue carry-forward — Items 17-23 from this commission cycle

Items emerging across Pillar 4 Arc 2 + paired Pillar 2 Arc 5/6 cycles:

- **Item 17:** substrate audit at substrate-audit-vs-mass-execution boundary — discipline recommends substrate audit at any mass-execution phase before execution commences
- **Item 18:** bundle taxonomy emergence at scale — 13-cluster pattern at 37 bundles; 14-cluster at 45 bundles
- **Item 19:** library install safety review discipline — system package installation on production warrants explicit safety review (dependency footprint + version conflicts + service impact + reversibility) before authorization
- **Item 20:** §A.13.6 firing distribution analysis — firings concentrate at substrate-audit-vs-execution boundaries + cross-territory transitions
- **Item 21:** mass-run partial-failure rate as commission close-out metric — when commission's primary deliverable has empirical success-rate measurement, close-out doc reports rate breakdown explicitly
- **Item 22:** operator-pre-recommendation substrate verification at theme/category selection points — at any theme-selection surface in operator response, CC verifies candidate themeAxisKeys against canonical-state before execution
- **Item 23:** paired-cluster + crossover-bundle as sub-patterns under cluster taxonomy — bundle architecture admits hierarchical sub-pattern organization at scale-dependent densities

Phase 6 fold-cycle at post-Pillar-4-Arc-2 close projection: ~23-26 items total across the [ARC][SEO][DECK-PAGE] inheritance + Pillar 4 Arc 2 + Pillar 2 Arc 5/6 commission cycles.

## β shape (P3) — 6 paired phases across 3rd commission cycle

| # | Pillar 4 Arc 2 phase | Pillar 2 cycle phase | Commits |
|---|---|---|---|
| 1 | Phase 0 (META audit) | Pillar 2 Arc 5 Phase 1 | b8c55827 + 91ffb245 |
| 2 | Phase 1 (substrate ext) | Pillar 2 Arc 5 Phase 2 | 7915d960 + 6cb4ca5b |
| 3 | Phase 2 (mass-run close) | Pillar 2 Arc 5 Phase 3 close | 7c50a2b5 + 3dd5dfe5 |
| 4 | Phase 3a (access-control) | Pillar 2 Arc 6 ratification + Phase 1 | afa277da + bf2dfc3c + df1c4ee1 |
| 5 | Phase 3b (UI + C5 lock) | Pillar 2 Arc 6 Phase 2 | 7168f913 + 4205ff60 |
| 6 | Phase 3c (e2e + i18n) | Pillar 2 Arc 6 Phase 3 close | 0e17894d + 543e3411 |

(P3) β shape doctrine empirically validated at 6 paired phases — asymmetric scope concurrent commissioning sustained clean across all 6 paired ships. Cross-arc filesystem-territory separation held (Pillar 4 Arc 2 → frontend/lib/flashcards/ + frontend/app/[locale]/flashcards/ + scripts/lib/flashcard-* + Hetzner CDN; Pillar 2 Arc 5/6 → docs/lesson-plans/bundles/). Zero merge conflicts; zero coordination overhead.

Phase 4 + Phase 5 close as sole-arc (Pillar 2 Arc 6 closed at Phase 3) completes the (P3) β shape's 3rd commission cycle.

## Patterns generalizing forward

1. **β shape (P3) sustainability at asymmetric scope** — 6 paired phases across 3rd commission cycle empirically locks β shape as canonical commissioning default for compatible territories.
2. **Cost-balloon escape hatch discipline at all boundary types** — substrate audits, mass-execution, cross-cluster commissions, operator pre-rec surfaces, deploy-boundary type-check all fire + resolve cleanly. Discipline maturity validated.
3. **Paired-Condition trajectory pattern** — C5 + C6 both advanced via single Pillar 4 Arc 2 + Pillar 2 Arc 6 cycle. Paired commission cycles produce paired Condition advancement.
4. **§A.13.6 + §A.13.8 paired discipline empirically reliable** — 9 firings × 100% clean resolution. Pattern maturity established at commission-cycle scale.
5. **Substrate-audit-vs-mass-execution boundary discipline (Item 17)** — recommends substrate audit at any mass-execution phase before execution; saved Phase 2 from blind-execution against unverified Phase 1 substrate.
6. **Production-canonical-path verification (Item 11)** — curl-spot-check at Phase 4 close caught zero gaps but provides audit-trail value at deploy boundary.

## v3 launch-trigger Condition status at commission close

| Condition | State |
|---|---|
| C1 (203 master packages) | 143 / 203 (70.4%) — at working-envelope; defer-evaluation per Arc 16 (X) lock |
| C2 (2,030 locale variants) | ~124 / 2,030 (6.1%) — substrate-priming + Tier 1+2 i18n advancement |
| C3 (NSR-flag clearance) | 84+ entries; NSR-resolution arc deferred |
| C4 (5 domains + locked strands) | 16 saturated strands + 14 clusters — well-advanced |
| **C5 (3 free-tier packages cross-domain)** | **LOCKED — count-objects-1-to-10 + identify-letter-sounds-vowels + identify-living-vs-nonliving** ✓ |
| **C6 (themed bundles ≥N × ≥M themes)** | **SATISFIED — 45 bundles × 14+ themeAxisKeys** ✓ |

C5 LOCKED + C6 SATISFIED at this commission close. Two Conditions in stable/satisfied state; four advancing.

## 5-item adjudication batch surfaces at next-session commencement

Per operator framing at this commission close — 5 deferred-commission re-evaluations queue for next-session commencement:

1. **Pillar 2 Arc 7 ratification** — DRAFT at `543e3411` with 5 Shape options (A continued / B linkage tooling / C locale-variant / D holiday-template completion / E sub-pattern formalization)
2. **Arc 16 reconsideration** — (X) lock from Arc 15 close; commencement vs continued deferral
3. **NSR-resolution arc commencement readiness** — Phase 2 deferred until master ~140-150 + queue stabilizes; state checks needed
4. **(μ) slug-rationalization timing** — Adjudication 4 (ι) DEFER post-launch; residual state check needed
5. **Stream A Arc 2 commencement** — Stream A pre-existing 141 gender-data findings + 84+ NSR entries + Pillar 4 Arc 2 Phase 2 substrate gaps absorption candidate

Operator strategic-input determines next-commission-cycle shape — sole-arc vs concurrent vs sequential per shape framework. Trajectory transition from "advancing all Conditions" to "consolidating toward Subscribe-flip readiness."

## Standing position at Pillar 4 Arc 2 commission close

- **Pillar 4 Arc 2 commission CLOSED** at 2026-05-11 across 10 commits + 6 paired phases (3rd β cycle)
- Pillar 4 Arc 3 commission DRAFT (this Phase 5; operator ratification at adjudication batch)
- Pillar 2 Arc 7 commission DRAFT (Pillar 2 Arc 6 Phase 3 close; operator ratification at adjudication batch)
- 5-item adjudication batch awaits operator-strategic input
- (P3) β shape's 3rd commission cycle complete; future cycle shape per adjudication batch outcome
- Phase 6 fold-queue at ~23-26 items projection across commission cycles

Standing by for adjudication batch processing + subsequent commission cycle shape determination.

---

*End of Pillar 4 Arc 2 commission recon. Status: CLOSED.*
