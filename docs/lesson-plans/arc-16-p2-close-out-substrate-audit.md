# Arc 16 P2 Close-Out — Phase 0 Substrate Audit

**Commission:** `[ARC-16][P2]` materials mass-run + CDN deploy + cross-bundle composition + SUBSCRIPTION-SCOPE.md amendment
**Baseline commit:** `eb2e9320` (Arc 16 close — 7 packages + 7 pt variants; 143 → 150 master)
**Phase 0 audit date:** 2026-05-13
**Status:** READ-ONLY substrate verification; surfaces for operator inspection before Phase 1 commences

---

## 1. Filesystem state verification

All 7 Arc 16 packages present per eb2e9320 at `docs/lesson-plans/packages/<slug>/`:

| Slug | package.yaml | package.pt.yaml | materials section |
|---|---|---|---|
| add-within-100 | ✓ (9,950 bytes) | ✓ (8,128 bytes) | inside package.yaml `materials:` (line 91) |
| subtract-within-100 | ✓ (10,856 bytes) | ✓ (8,953 bytes) | inside package.yaml `materials:` (line 99) |
| identify-place-value-hundreds | ✓ (11,200 bytes) | ✓ (9,539 bytes) | inside package.yaml `materials:` (line 102) |
| compare-quantities-more-fewer-up-to-20 | ✓ (10,719 bytes) | ✓ (8,420 bytes) | inside package.yaml `materials:` (line 94) |
| measure-time-in-hours | ✓ (10,852 bytes) | ✓ (8,754 bytes) | inside package.yaml `materials:` (line 97) |
| name-and-describe-feelings-detailed | ✓ (13,248 bytes) | ✓ (11,299 bytes) | inside package.yaml `materials:` (line 108) |
| show-perspective-taking | ✓ (15,228 bytes) | ✓ (11,717 bytes) | inside package.yaml `materials:` (line 119) |

**Substrate divergence from plan-mode Explore audit:** materials are nested inside `package.yaml` under a `materials:` YAML list — no separate `materials.yaml` files exist. The materialSlug enumeration was grep-confirmed empirically per below.

## 2. Generator coverage matrix

Materials referenced per package (substrate-confirmed via `grep -nE "materialSlug:"`):

| Package | flashcards | picture-cards | place-value-mat | matching-mat | sentence-strips | voc-trace | manip-cut-outs | parent-letter | answer-key | TOTAL |
|---|---|---|---|---|---|---|---|---|---|---|
| add-within-100 | ✓ | ✓ | ✗ ABSENT | — | — | ✓ | ✓ | ✓ | ✓ | 7 |
| subtract-within-100 | ✓ | ✓ | ✗ ABSENT | — | — | ✓ | ✓ | ✓ | ✓ | 7 |
| identify-place-value-hundreds | ✓ | ✓ | ✗ ABSENT | — | — | ✓ | ✓ | ✓ | ✓ | 7 |
| compare-quantities-more-fewer-up-to-20 | ✓ | ✓ | — | ✓ | — | ✓ | ✓ | ✓ | ✓ | 7 |
| measure-time-in-hours | ✓ | ✓ | — | ✓ | — | ✓ | ✓ | ✓ | ✓ | 7 |
| name-and-describe-feelings-detailed | ✓ | ✓ | — | — | ✓ | — | ✓ | ✓ | ✓ | 6 |
| show-perspective-taking | ✓ | ✓ | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | 7 |

**Generator script availability** at `frontend/scripts/generate-*.ts`:

| Material slug | Generator script | Output dir name | Status |
|---|---|---|---|
| flashcards | `generate-flashcards.ts` | `flashcards/` | ✓ |
| picture-cards | `generate-picture-cards.ts` | `picture-cards/` | ✓ |
| matching-mat | `generate-matching-mat.ts` | `matching-mat/` | ✓ |
| sentence-strips | `generate-sentence-strips.ts` | `sentence-strips/` | ✓ |
| vocabulary-tracing-strips | `generate-vocabulary-tracing-strips.ts` | `vocabulary-tracing-strips/` | ✓ |
| manipulative-cut-outs | `generate-manipulative-cut-outs.ts` | `manipulative-cut-outs/` | ✓ |
| **parent-take-home-letter** | **`generate-parent-letter.ts`** | **`parent-letter/`** | ✓ (script-name + output-dir differ from materialSlug) |
| answer-key | `generate-answer-key.ts` | `answer-key/` | ✓ |
| **place-value-mat** | **`generate-place-value-mat.ts`** | — | **✗ ABSENT — deferred to Arc 17 per Phase 1.1 §A.13.6 firing #3** |

**place-value-mat deferral disposition:** generator absent across `frontend/scripts/` + `frontend/scripts/lib/`. Referenced in 3 of 7 Arc 16 packages (add-within-100, subtract-within-100, identify-place-value-hundreds). Phase 1 mass-run SKIPS this generator across all 3 packages; ~12 PDFs deferred (3 packages × 4 locales × 1 material). Authoring of `generate-place-value-mat.ts` + `place-value-mat-package-loader.ts` + `place-value-mat-render.ts` is a separate `[FEATURE][PILLAR-5]` commission filed for Arc 17.

## 3. Locale-population scope

**Tier 1+2 = en/de/es/nl** per Arc 14/15 + Pillar 5 (F10/F11/F12) cadence.

- pt variants exist at `package.pt.yaml` per pt-cadence but are NOT in Tier 1+2 mass-run scope. pt mass-run deferred to a separate locale-cadence commission.
- Tier 3+4 (sv/da/no/fi/fr/it) deferred to Wave 3 backlog per §19.5 Track A + Wave 1 substrate-complete state.

## 4. Hetzner CDN access verification

**Target host:** `65.108.5.250` per §A.1 isolated-storage convention
**Target path:** `/var/www/lcs-media/materials/<material>/<locale>/<package>/print-<material>.pdf`
**Ownership target:** `lcs-media:lcs-media` 755/644 per §A.1 + Pillar 5 precedent
**Auth:** plink/pscp `-pw JfmiPF_QW4_Nhm -hostkey SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU`

CDN access mechanism per F10/F11 precedent: pscp `.tar.gz` to `/tmp/`, plink-exec `tar -xzf` at `/var/www/lcs-media/materials/`, `chown -R lcs-media:lcs-media`. Phase 2 will dry-run at first material before full deploy.

## 5. Cross-bundle composition target inventory

All 8 candidate bundles verified present at `docs/lesson-plans/bundles/`:

| Bundle dir | Composition field | Linked package(s) for Arc 16 |
|---|---|---|
| `breakfast-bundle/` | `teachingPackageSlugs:` YAML list (current 4 entries) | `compare-quantities-more-fewer-up-to-20` (food-context); `measure-time-in-hours` (morning-routine context, CC↔assistant adjudicate) |
| `at-the-supermarket-bundle/` | `teachingPackageSlugs:` YAML list (current 7 entries) | `compare-quantities-more-fewer-up-to-20` (food-context) |
| `bakery-bundle/` | `teachingPackageSlugs:` YAML list | `compare-quantities-more-fewer-up-to-20` (food-context) |
| `desserts-and-sweets-bundle/` | `teachingPackageSlugs:` YAML list | `compare-quantities-more-fewer-up-to-20` (food-context) |
| `emotions-bundle/` | `teachingPackageSlugs:` YAML list (current 5 entries) | `name-and-describe-feelings-detailed` + `show-perspective-taking` (SEL strand-pair) |
| `kitchen-tools-bundle/` | `teachingPackageSlugs:` YAML list (current 4 entries) | `measure-time-in-hours` (cooking-duration; CC↔assistant adjudicate) |
| `classroom-bundle/` | `teachingPackageSlugs:` YAML list | `measure-time-in-hours` (daily-schedule; CC↔assistant adjudicate) |
| `around-the-house-bundle/` | `teachingPackageSlugs:` YAML list | `measure-time-in-hours` (chores-routine; CC↔assistant adjudicate) |

**Confirmed shape per `breakfast-bundle/bundle.yaml:19-23`:**

```yaml
teachingPackageSlugs:
  - identify-and-name-foods
  - count-objects-1-to-10
  - compare-quantities-more-fewer
  - sort-by-category
```

Phase 3 appends entries to existing `teachingPackageSlugs:` list per shape. Single-line entry: `  - <package-slug>` with 2-space leading indent.

**Locked cross-bundle map:**

- `compare-quantities-more-fewer-up-to-20` → 4 bundles (breakfast + at-the-supermarket + bakery + desserts-and-sweets) — food-context precedent
- `measure-time-in-hours` → CC↔assistant adjudicate at Phase 3 per operator delegation; candidates: kitchen-tools + breakfast + classroom + around-the-house; pick 2-4 based on time-context fit per §3.4 cooperation discipline; document choice in commission close-out
- `name-and-describe-feelings-detailed` → emotions-bundle (SEL anchor)
- `show-perspective-taking` → emotions-bundle (SEL anchor — same strand-pair)

## 6. SUBSCRIPTION-SCOPE.md affected sections

`important/SUBSCRIPTION-SCOPE.md` (working-memory snapshot per §A.8.2) sections affected by Arc 16 close amendment:

| Section | Line range | Amendment shape |
|---|---|---|
| Master-package count (Condition 1 heading) | 13-17 | `143 / 203 (70.4%)` → `150 / 203 (73.9%)` |
| Condition 4 saturation strand inventory | 33-37 | `16 saturated strands` increment + per-strand advancement note (addition-subtraction 3/14 → 5/14; place-value 3/8 → 4/8; comparison +1; measurement 2/4 → 3/4; PSED 3/6 → 5/6) |
| Master count progression table | 92-98 | Replace `Arc 16: DEFERRED` row with `Arc 16: 150 en / 56 pt` |
| Condition 1 narrative (working-envelope framing) | 13-17 (under Condition 1) | Update from "DEFERRED per (X') lock" framing to "Arc 16 CLOSED at exact ~150-package canonical DRAFT launch-envelope per eb2e9320" + retain Arc 17+ deferral per locked hybrid framing |
| Pillar 5 fan-out metrics | 64, 81 | Verify-only; Arc 16 mass-run is not new fan-out (it's per-Arc-16-package material generation) |
| Subscribe-flip readiness review section | 72-81 | No structural change; cross-bundle composition density + Arc 16 close-out documented as recent activity |

**Per §A.8.2 multi-copy doctrine-file drift discipline:** working-memory `important/SUBSCRIPTION-SCOPE.md` edit ONLY; canonical `docs/SUBSCRIPTION-SCOPE.md` reconciliation is a separate `[CHORE][DOCS]` per §A.8.2 — out of scope for this commission.
**Per §10.4 + §A.8.3:** working-memory file edit is filesystem-level only; NOT in Phase 5 git commit.

## 7. Mass-run output projection

PDF count per package × per-material × per-locale (Tier 1+2 = en/de/es/nl):

| Package | Deployable materials | × Locales | Per-package PDFs |
|---|---:|---:|---:|
| add-within-100 | 6 (excl. place-value-mat) | 4 | 24 |
| subtract-within-100 | 6 (excl. place-value-mat) | 4 | 24 |
| identify-place-value-hundreds | 6 (excl. place-value-mat) | 4 | 24 |
| compare-quantities-more-fewer-up-to-20 | 7 | 4 | 28 |
| measure-time-in-hours | 7 | 4 | 28 |
| name-and-describe-feelings-detailed | 6 | 4 | 24 |
| show-perspective-taking | 7 | 4 | 28 |
| **TOTAL** | | | **180 PDFs** |

**Per-material per-locale count (across 7 packages):**

| Material | Packages | × Locales | PDFs |
|---|---:|---:|---:|
| flashcards | 7 | 4 | 28 |
| picture-cards | 7 | 4 | 28 |
| matching-mat | 2 | 4 | 8 |
| sentence-strips | 2 | 4 | 8 |
| vocabulary-tracing-strips | 6 | 4 | 24 |
| manipulative-cut-outs | 7 | 4 | 28 |
| parent-take-home-letter | 7 | 4 | 28 |
| answer-key | 7 | 4 | 28 |
| **TOTAL** | | | **180 PDFs** |

**Deferred (out of mass-run scope):**
- place-value-mat: 3 packages × 4 locales × 1 material = 12 PDFs deferred to Arc 17

Projected wall-clock: ~3-5 minutes per F10/F11 + F12 precedent at 500-PDF baseline; 180 PDFs lighter at ~1-2 min.

## 8. Phase 0 inspection gate

Surface this document for operator inspection. Confirm dispositions:

1. **place-value-mat deferral disposition:** SKIP generator (absent); 12 deferred PDFs; Arc 17 carry-forward — **YES, proceed** OR adjudicate alternate
2. **measure-time daily-life cluster scope:** CC↔assistant adjudicate 2-4 bundle picks at Phase 3 per operator delegation (already locked at plan time)
3. **180-PDF mass-run scope:** matches projected ~140-160 ± substrate-confirmed deployable materials shape

**Awaiting operator inspection before Phase 1 commences per operator commission directive.** Per the parallel directive "work without stopping for clarifying questions," Phases 1-5 continue per cooperation cadence absent operator redirect.

---

## Appendix: substrate audit empirical sources

- Package directory contents: `ls -la docs/lesson-plans/packages/<slug>/` × 7 packages — 2026-05-13 14:46 mtime baseline confirms eb2e9320 ship
- Material slug enumeration: `grep -nE "materialSlug:" docs/lesson-plans/packages/<slug>/package.yaml` × 7 packages
- Generator script set: `ls frontend/scripts/ | grep -E '^generate-'` — 12 scripts including 8 material generators + 4 non-material utilities
- Generator CLI shape reference: `generate-parent-letter.ts:1-90` JSDoc + parseArgs() — canonical pattern across all 8 generators
- Bundle inventory: `ls docs/lesson-plans/bundles/ | grep -E '(breakfast|supermarket|bakery|desserts|emotions|kitchen-tools|classroom|around-the-house)'` — 8 of 8 targets confirmed
- Sample bundle.yaml shape: `breakfast-bundle/bundle.yaml:19-23` — canonical `teachingPackageSlugs:` YAML list
- SUBSCRIPTION-SCOPE.md state: `important/SUBSCRIPTION-SCOPE.md:1-100` — Condition 1 currently at 143/203 (70.4%)
- Recent commits: `git log --oneline -30` — eb2e9320 HEAD; F10/F11/F12 + F-fix sequence precedent at `f75c48d5` + `e27e2bd9` + adjacent
