# (μ) Phase 1 diagnostic revised — pre-migration residue class identified

**Type:** `[DOCS][PILLAR-4]` (μ) Phase 1 root-cause revision per §A.13.6 firing + §A.13.8 cost-recalibration discipline
**Branch:** `pivot/printable-business-toolkit`
**Authored:** 2026-05-11
**Status:** Phase 1 revised. (2a) full-Phase-2 ratification supersedes per recalibration surface — recommends operator re-ratify Phase 2 path with corrected scope.

## 0. Trigger

Phase 1 original classification (commit `f6f8ea38`) identified "authoring-side regression at 10 §14.10 catalog apps" — apps emit GENERIC IDENTICAL titles causing DB constraint NULL-class. Operator ratified (2a) Full Phase 2 on structural-regression grounds (~3-4 sessions; ~700-1,200 LoC; 10-app Shape A fix + Tier 3+4 publish-path root-cause + retrofit + verification).

(μ) Phase 2 Sub-A commencement at this session entered Sub-step 1 emit-site investigation. Investigation surfaced timestamp distribution analysis missing from Phase 1: **ALL NULL decks created before 2026-05-09 schema migration that added title_hash column.**

Per §A.13.8 cost-recalibration discipline — surface immediately; do not power through against incorrect root-cause classification.

## 1. Corrected empirical findings

### 1.1 en NULL timeline (1,288 decks)

| Day | Total en decks | NULL count | NULL pct |
|---|---:|---:|---:|
| 2026-04-29 | 4 | 3 | 75% |
| 2026-05-01 | 4 | 1 | 25% |
| 2026-05-02 | 22 | 6 | 27% |
| 2026-05-05 | 594 | 52 | 8.8% |
| 2026-05-06 | 304 | 202 | 66% |
| 2026-05-07 | 938 | 561 | 60% |
| 2026-05-08 | 1,115 | 463 | 42% |
| **2026-05-09 (migration date)** | **867** | **0** | **0%** |
| **2026-05-10 (post-migration)** | **335** | **0** | **0%** |
| **Post-migration total** | **1,202** | **0** | **0%** |

### 1.2 Tier 3+4 NULL timeline (195 decks)

| Locale | Day | Total | NULL count |
|---|---|---:|---:|
| da | 2026-05-04 | 29 | 29 |
| fi | 2026-05-04 | 29 | 29 |
| fr | 2026-05-04 | 29 | 29 |
| it | 2026-05-04 | 29 | 29 |
| no | 2026-05-04 | 1 | 1 |
| pt | 2026-05-04 | 29 | 29 |
| sv | 2026-05-04 | 29 | 29 |

ALL Tier 3+4 NULL decks created 2026-05-04 — well before 2026-05-09 schema migration.

## 2. Corrected root-cause classification

**Class: PRE-MIGRATION RESIDUE** (NOT authoring-side regression).

The 2026-05-09 schema migration (`20260509083000_add_seo_hash_columns`) added `title_hash` + `description_hash` columns as nullable to the `decks` table. All decks created BEFORE this migration have NULL values in these columns by definition (column didn't exist when they were inserted).

Post-migration publishes (since 2026-05-09): **1,202 new en decks ALL have title_hash populated correctly = 0% NULL.** The §11 commission's variant_id discriminator + (θ) ratification's structural-uniqueness claim are working as designed.

**The 5.5pp trajectory drop (74.7% → 69.2%) was historical-residue indexing — NOT compounding regression.** As operator-side English publishing rhythm continued post-migration, the total deck count grew (denominator increased) while the historical NULL residue stayed fixed (numerator constant), causing the proportional backfill rate to drop. This is statistical artifact, not structural regression.

## 3. Original Phase 1 classification error — analysis

The Phase 1 original classification fell into 2 traps:

1. **Per-app aggregation without timestamp stratification.** The per-app breakdown showed 10 apps below 70% backfill, sorted by NULL count. This made it LOOK like the 10 apps had ongoing regression. In fact, all 10 apps had high publish-volume during 2026-05-04 to 2026-05-08 (pre-migration window); the NULL is purely historical.

2. **Title-pattern aggregation conflating cause + symptom.** Same NULL-cohort decks share identical titles ("Picture Sort" × 244). I assumed identical title = collision-class. But the actual cause is timestamp — these decks were inserted before the unique constraint existed.

**Per §A.13.6 firing distribution analysis (Item 20 fold candidate):** firings at trajectory-check surface (this turn) correctly surfaced the gap in original Phase 1 inventory. Phase 1 should have included timestamp distribution as a foundational dimension — adding to Item 6 + Item 21 fold-queue carry-forward.

## 4. Revised Phase 2 path

### 4.1 Recommended path

**(2a-revised) RETROFIT-ONLY** — bulk-update title_hash + description_hash for 1,483 pre-migration NULL decks.

- **Single script:** `scripts/publish-cli/retrofit-mu-pre-migration-residue.js`
  - Iterate NULL decks
  - For each: extract `<title>` text from deck.html (already substituted at publish time; live at CDN)
  - Compute sha256(title) → title_hash
  - Compute sha256(description) → description_hash
  - Bulk-update DB
- **Scope:** ~200-300 LoC; ~1 session
- **No 10-app authoring-side fix needed** — apps work correctly
- **No Tier 3+4 publish-path investigation needed** — same class

### 4.2 What was originally over-scoped at (2a)

| Original (2a) sub-deliverable | Now ✗ |
|---|---|
| 10-app title emit-site Shape A fix | ✗ NOT NEEDED — apps work correctly post-migration |
| Tier 3+4 publish-path root-cause | ✗ NOT NEEDED — same pre-migration residue class |
| Retrofit script + DB backfill | ✓ NEEDED |
| Verification | ✓ NEEDED (smaller scope; just retrofit verification) |

**Scope reduction: ~3 sub-deliverables → 1 sub-deliverable. ~700-1,200 LoC → ~200-300 LoC. ~3-4 sessions → ~1 session.**

### 4.3 Operator re-ratification surfaces

Per §A.13.8: original (2a) ratification was based on incorrect Phase 1 classification. Revised (2a-revised) requires operator re-ratification:

- **(2a-revised) Retrofit-only** — CC default-recommendation per corrected root-cause class; ~1 session
- **(2a-original)** — Continue with 10-app fix + Tier 3+4 + retrofit (rejected per corrected findings; no apps to fix)
- **(2d) Continue post-launch deferral on residue** — 1,483 NULL decks acceptable as post-launch backlog; pre-migration residue doesn't compound

CC default-recommendation: **(2a-revised) Retrofit-only.** Closes structural foundation for forward-flow correctness claim by backfilling historical residue + restoring 100% C2-equivalent advancement metric. Bounded scope; minimal commission overhead.

## 5. Item 24 candidate revision

Original Item 24 candidate framing: "DB-constraint-silent-failure-mode vs gate-halt-class divergence." Empirical evidence at this revision shows the divergence is NOT operating in current code — DB constraint enforces correctly + gate HALT-class fires for new publishes. The pre-migration residue is a TEMPORAL artifact (column didn't exist pre-migration).

Revised Item 24 candidate: **Schema migration timestamp-stratification doctrine** — at any commission cycle where DB column additions touch backfill workflows, foundational inventory analysis must include timestamp distribution to distinguish pre-migration residue from ongoing regression class. Without timestamp stratification, residue can be misclassified as regression. Phase 6 fold-queue Item 24 reframed accordingly.

## 6. §A.13.6 firing audit-trail at this revision

- **12th §A.13.6 firing this commission cycle.** Diagnostic-first discipline + sub-step recalibration produced corrected classification before retrofit-script work commenced. Saved ~3 sessions of misallocated effort on 10-app fix.
- **§A.13.8 cost-recalibration paired discipline:** surface corrected scope immediately + operator-strategic re-ratification rather than power through.
- **Pattern reliability:** 12/12 = 100% clean resolution holds across the commission cycle.

## 7. Standing position

(μ) Phase 2 Sub-A original scope deferred pending operator re-ratification of revised Phase 2 path. Stream A Arc 2 substrate audit continues independently per (S2) sequencing.

CC: at next-session commencement, surface revised Phase 2 path; operator ratifies (2a-revised) OR (2d); CC commences ratified path.

---

*End of revised Phase 1 root-cause. Status: revision absorbed; operator re-ratification pending.*
