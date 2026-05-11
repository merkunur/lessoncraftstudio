# Stream A Arc 2 substrate audit

**Type:** `[DOCS][STREAM-A]` substrate audit per (S2) sequencing batch
**Branch:** `pivot/printable-business-toolkit`
**Authored:** 2026-05-11
**Status:** Audit closed. Stream A Arc 2 Phase 1 commencement readiness assessed; broad-apply per operator strategic-input at subsequent commission cycle.

## 0. Trigger context

Stream A Arc 2 absorbs accumulated vocabulary-substrate gaps filed across multiple commissions. Per Item E (S2) sequencing ratification, Stream A Arc 2 commencement paired with (μ) Phase 2 in current commission cycle; this audit consolidates inventory + remediation-path classification before broad-apply commences in subsequent cycle.

## 1. 4-source-class consolidated inventory

### 1.1 Class A — NSR-flag pending native-speaker review (84+ entries)

**Source:** [ARC][SEO][DECK-PAGE] Phase 5 commission + Pillar 4 Arc 2 SOFT_HYPHENS extension.

**Entries:** 84+ NSR-flag entries across Nordic locales (sv/fi/no/da) + Tier 4 Romance (fr/it/pt) per `project_k3_phrasing_native_speaker_review.md`.

**Class:** Native-speaker review pending.

**Remediation path:** Native-speaker procurement orthogonal to CC (per Item C (2) defer lock); operator-strategic action. Once speakers available, review batch covers ~6 locales × 14+ entries each.

### 1.2 Class B — Image-substrate gaps (~20 vocab keys)

**Source:** Pillar 4 Arc 2 Phase 2 mass-run (`flashcard-package-loader.ts`); CDN run surfaced 20/1,051 vocab keys with no resolvable image in image library.

**Entries:** Action verbs (run / jump / walk / sit / stand / sleep / eat / drink / play / read); family members (father / mother / sister / brother / grandfather / grandmother / family); singletons (sandwich / pea / shoes / etc.).

**Class:** Image-substrate gap — vocab key exists in IMAGE_VOCABULARY but no PNG file exists in image library.

**Remediation path:** Image acquisition + library extension. Operator-coordinated work — needs commission illustration acquisition for ~20 concepts. Per §10.3, IMAGE_VOCABULARY entries already exist (work is at image-library level only). Once images acquired, place in appropriate theme dirs + flashcard pipeline auto-resolves.

### 1.3 Class C — Theme-dir substrate gaps (5 packages)

**Source:** Pillar 4 Arc 2 Phase 2 mass-run; 5/100 packages failed to load due to referenced theme dirs absent from image library.

**Entries:**
- `school-objects` theme dir referenced by 2 packages (identify-community-helpers + identify-days-of-week)
- `foods` theme dir referenced by 3 packages (subtract-within-10 + use-position-vocabulary + use-spatial-position-words)

**Class:** Theme-dir gap — package YAMLs reference theme dirs that don't exist in image library.

**Remediation path:** Two options:
- **(C1) Create theme dirs** + populate with images (operator-coordinated acquisition + organization)
- **(C2) Migrate packages** to imageSource: vocabKeyList shape with explicit vocab_keys arrays — CC self-adjudicable at package YAML edit level

CC default-recommendation: **(C2) migrate packages** — small per-package edit (~5 packages × 10 LoC = 50 LoC); avoids dependency on operator-coordinated image acquisition.

### 1.4 Class D — IMAGE_VOCABULARY gender-data findings (141 entries)

**Source:** Stream A pre-existing accumulated findings (per Pillar 4 Arc 2 Phase 5 recon + Stream A Arc 1 close-out).

**Entries:** 141 vocab keys across 11 locales where grammatical gender field needs verification or correction.

**Class:** IMAGE_VOCABULARY data-integrity correction.

**Remediation path:** Per §10.3 NEVER-MODIFY-IMAGE-VOCABULARY without operator approval. Stream A Arc 2 Phase 1 requires:
1. Per-locale audit of flagged entries (native-speaker review for accuracy)
2. Operator-approved IMAGE_VOCABULARY edit batch
3. Verification via `scripts/audit-db-diacritics.js` + downstream `image_themes.translations` integrity

Operator-coordinated work; subset overlaps with Class A NSR-flag clearance.

## 2. Per-class scope estimation

| Class | Entries | Scope | Class | Operator-coord |
|---|---:|---|---|---|
| A: NSR-flag pending | 84+ | ~6 locales × 14 entries each | review-class | YES (native-speaker procurement) |
| B: Image-substrate gaps | ~20 | ~20 illustrations | acquisition-class | YES (image acquisition) |
| C: Theme-dir substrate gaps | 5 packages | ~50 LoC migrate OR theme-dir creation | flex (C2 CC-self / C1 operator-coord) | optional |
| D: IMAGE_VOCABULARY gender-data | 141 | per-locale audit + approved edits | data-integrity-class | YES (per §10.3) |

**Total Stream A Arc 2 scope envelope:** ~250+ remediation actions across 4 classes; ~3 of 4 classes operator-coordinated; only Class C (2) is CC-self-adjudicable at single-arc shape.

## 3. Stream A Arc 2 Phase 1 commencement readiness

### 3.1 Per-class commencement gates

| Class | Commencement gate | Current state |
|---|---|---|
| A | Native-speaker procurement (operator-strategic) | DEFERRED per Item C (2) lock |
| B | Operator-coordinated image acquisition decision | Pending operator strategic-input |
| C | Operator-strategic (C1) vs (C2) decision | Pending operator strategic-input; CC default-rec (C2) migrate-packages |
| D | Per-locale audit prep + operator-approved edit batch | Pending operator strategic-input |

### 3.2 CC-self-adjudicable subset

**Class C (C2) migrate-packages** is the only fully CC-self-adjudicable sub-deliverable. ~50 LoC across 5 package YAMLs.

If operator ratifies (C2) at Stream A Arc 2 Phase 1 commencement:
- 5 packages get vocabKeyList shape
- Theme-dir-absent failure mode resolved without acquisition dependency
- Stream A Arc 2 Phase 1 ships in ~0.5 session

### 3.3 Operator-coordinated subset

Classes A, B, D require operator-coordinated inputs:
- Class A: native-speaker procurement (Item C deferred per (2))
- Class B: image acquisition decision + acquisition itself
- Class D: per-locale audit + edit batch

Stream A Arc 2 broad-apply absorbs these as operator-coordinated work materializes; not single-commission-cycle scope.

## 4. Phase 6 fold-queue carry-forward

Items emerging from this audit:

- **Sub-pattern: 4-class taxonomy for substrate-gap absorption** — NSR-pending / acquisition-pending / migration-class / data-integrity-class. Generalizes to future substrate-priming arcs.
- **(C1) vs (C2) trade-off** — when substrate gap can be remediated either by acquisition OR by migration, default to migration when operator-coordination cost dominates. Fold candidate (Item 25 candidate).

## 5. Stream A Arc 2 Phase 1 commencement recommendation

Per audit findings + cost-balloon discipline:

**Recommend operator ratify at next session:**

- **(P1-C2-only)** — Stream A Arc 2 Phase 1 ships (C2) migrate-packages only (~0.5 session; 5 packages); Class A + B + D queue for operator-coordinated work
- **(P1-deferred)** — Continue Stream A Arc 2 broad-apply deferral; audit findings stay filed; Phase 1 commences when operator-coordinated work clears

CC default-recommendation: **(P1-C2-only)** — ships CC-self-adjudicable subset cleanly; closes the only substrate-gap class that's blocking flashcard pipeline (5 packages don't ship flashcards currently); preserves operator-attention budget on coordinated subsets.

## 6. Standing position

Stream A Arc 2 substrate audit closed at this commit. Phase 1 commencement readiness assessed:
- (C2) migrate-packages CC-self-adjudicable; ratifiable at next session
- Classes A + B + D operator-coordinated; queue for subsequent strategic-input

Stream A Arc 2 Phase 1 commencement: at next-session operator ratification per (P1-C2-only) OR (P1-deferred).

## 7. Cross-references

- `project_k3_phrasing_native_speaker_review.md` — Class A NSR-flag inventory source
- `docs/lesson-plans/flashcard-arc-2-phase-2-recon.md` — Class B + C inventory source
- Stream A Arc 1 close-out recon — Class D pre-existing findings source
- CLAUDE.md §10.3 (NEVER-MODIFY-IMAGE-VOCABULARY without approval) — Class D gate
- §17.5.1 (Nordic NSR posture) — Class A locale scope rationale
- Pillar 4 Arc 2 commission audit-trail — Class B + C empirical surface

---

*End of Stream A Arc 2 substrate audit. Phase 1 commencement readiness: (C2) migrate-packages CC-self-adjudicable; other classes operator-coordinated.*
