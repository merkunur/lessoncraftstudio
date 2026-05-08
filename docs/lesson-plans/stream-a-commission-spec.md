# Stream A commission spec — IMAGE_VOCABULARY substrate sweep escalation (separate parallel `[INFRA]` arc)

**Type:** `[INFRA][LESSON-PLANS]` — substrate-creation work shape; foundation infrastructure for content-arc consumption
**Branch:** `pivot/printable-business-toolkit`
**Estimated phases:** 3 sub-commits (substrate-only; smaller than content-arc 4-phase shape)
**Estimated LoC:** ~800-1500 (image-vocabulary.js extension + NUMBER_WORDS infrastructure + audit script)
**Estimated sessions:** 1-2
**Status: AUTHORIZED at Arc 11 close 2026-05-08 — Option σ-α + commencing as separate parallel `[INFRA]` arc concurrent with Pillar 2 + Arc 12 lesson-plan strand-volume.**

## 1. Context

Stream A Phase 1 substrate sweep paused 7 arcs running (Arc 4 → 11). Family-members + action-verbs deferral chain reached MATURITY THRESHOLD per Arc 9 spec. Vocabulary-acquisition strand uniquely substrate-blocked at 21/24 packages — cannot progress further without substrate extension.

Stream A Phase 1 scope per Arc 5 Phase 1 original spec covers three sub-deliverables:
1. **NUMBER_WORDS gender-toggle parameter** for numeral-cards material (per Arc 8 Phase 1 + Arc 9 Phase 1 numeracy work surfacing the need)
2. **IMAGE_VOCABULARY family-members extension** — vocab entries for father, mother, sister, brother, grandmother, grandfather, baby, family + cross-locale gender-correct forms
3. **IMAGE_VOCABULARY action-verbs extension** — vocab entries for run, jump, walk, sit, stand, sleep, eat, drink, play, read + cross-locale conjugation/infinitive forms

Plus optional sub-deliverable from Arc 5 Phase 1 spec:
4. **Romance/Nordic gender-data audit** — verify existing IMAGE_VOCABULARY gender data correctness for Romance (es/fr/it/pt) + Nordic (sv/da/no/fi) locales.

## 2. Pre-locked architecture (do NOT relitigate)

Per CLAUDE.md §6 + Arc 1-11 ship state. CC adjudicates within these locks.

- **IMAGE_VOCABULARY canonical:** `REFERENCE TRANSLATIONS/image-vocabulary.js` (1,246 entries; 11-locale singular + plural + grammatical gender per CLAUDE.md §6; never modified directly without operator approval — CC commission-authorized at Arc 11 close).
- **NUMBER_WORDS canonical:** new file required (TBD: `frontend/lib/number-words.js` OR sibling file pattern). Surfaces at Phase 1 entry.
- **Storage convention:** image-vocabulary.js entries follow existing schema:
  ```js
  "vocab-key": {"en":["Singular","Plural"],"de":["Singular","Plural","gender-letter"], ...}
  ```
- **Gender-letter convention:** "m" (masculine), "f" (feminine), "n" (neuter), "d" (de-shared neuter for Dutch). German + Romance + Nordic require gender; English + Finnish do not.
- **Filesystem-territory separation (Arc 12 concurrent-arc lock):** Stream A territory = `REFERENCE TRANSLATIONS/image-vocabulary.js` (with operator approval per CLAUDE.md §A.3) + new NUMBER_WORDS infrastructure + audit script. Does NOT touch:
  - `docs/lesson-plans/packages/` (Arc 12 territory)
  - `docs/lesson-plans/bundles/` (Pillar 2 territory)
- **Audit safety:** any IMAGE_VOCABULARY change MUST run diacritics-audit + cross-locale verification per CLAUDE.md §A.7 (auto-healing on every deploy).

## 3. Phase plan

### Phase 1 — IMAGE_VOCABULARY family-members + action-verbs extension (1 sub-commit)

**Family-members vocabulary** (8 entries):
- father / mother / sister / brother / grandmother / grandfather / baby (already in IMAGE_VOCABULARY) / family
- All 11 locales: singular + plural + grammatical gender (Germanic/Romance/Nordic).
- Cross-locale verification per CLAUDE.md §6 vocabulary-correctness standard.

**Action-verbs vocabulary** (10 entries):
- run / jump / walk / sit / stand / sleep / eat / drink / play / read
- Cross-locale verb forms: en uses base form; Romance uses infinitive (correr, courir, correre, correr); Germanic uses infinitive (laufen, lopen); Nordic uses infinitive (springa, løbe, løpe, juosta).
- Gender-irrelevant for verbs (some locales mark for noun-derived gerunds; out of scope here).

**Image asset coordination:** verify image library has corresponding images for family-members + action-verbs. If gaps surface, flag to operator (image-authoring is operator-pace separate work; substrate-side ships entries that materialize when images do).

### Phase 2 — NUMBER_WORDS gender-toggle infrastructure (1 sub-commit)

**Per Arc 8 + 9 numeracy-work surfacing:** numeral-cards material needs NUMBER_WORDS i18n resource separate from IMAGE_VOCABULARY (CLAUDE.md §A.3 documented at Arc 2 boundary).

**Phase 2 deliverables:**
- New file (TBD path): `frontend/lib/number-words.js` OR `REFERENCE TRANSLATIONS/number-words.js` — locale-specific number-word strings for numerals 1-100 (some locales gender-dependent: Spanish "uno/una" for 1; German "ein/eine" — Romance gender-toggle).
- Gender-toggle parameter on numeral-cards material consumption: locale-aware article/gender resolution per the noun the numeral counts.
- Backwards-compatible default (gender-toggle off; uses canonical form per locale convention).

### Phase 3 — Romance/Nordic gender-data audit + recon (1 sub-commit)

**Audit script** (frontend/scripts/audit-image-vocabulary-gender.js):
- Verify all es/fr/it/pt entries have valid {m, f} gender per locale convention.
- Verify all de/sv/da/no entries have valid {m, f, n} gender per locale convention.
- Verify nl entries have valid {m, f, d} (Dutch de-shared neuter convention).
- Surface entries with missing or inconsistent gender data.
- Operator-side review pass for Phase 3 surface findings (out of CC scope; operator-pace).

**Stream A Phase 1 recon document:** stream-a-phase-1-recon.md covering deliverables shipped + audit findings + downstream-arc unblock confirmation (family-members + action-verbs now ready for Arc 12 Phase 1 Path A consumption).

## 4. Adjudication delegations (CC handles without surfacing)

- Per-locale vocabulary form selection (singular + plural + gender).
- Cognate-aware authoring across Romance + Germanic + Nordic locales.
- Audit script implementation details.
- Per-vocab-entry NSR-flag if Claude quality assessment is uncertain.
- Commit cadence within phases.

## 5. Surface only at

- Phase 1 entry: surface NUMBER_WORDS file path decision (frontend/lib/ vs REFERENCE TRANSLATIONS/).
- Phase 2 entry: surface gender-toggle UX for numeral-cards (parameter naming + default behavior).
- Phase 3 audit findings: surface any large-scale gender-data corrections needed (operator-coordination work item).
- Phase 3 recon close.
- If anything would require modifying packages/ OR bundles/ (filesystem-territory boundary cross — surfaces as coordination question per Arc 11 close lock).

## 6. Verification

- All IMAGE_VOCABULARY additions validate via existing diacritics-audit + auto-healing pipeline (CLAUDE.md §A.7).
- NUMBER_WORDS i18n file loads without error in target consumer (numeral-cards material).
- frontend/scripts/audit-image-vocabulary-gender.js runs clean OR surfaces operator-actionable findings.
- Family-members + action-verbs entries available for Arc 12 Phase 1 Path A authoring.
- Filesystem-territory non-overlap with Pillar 2 + Arc 12 verified at each commit.

## 7. Out of scope (commission-locked)

- Image library extension (operator-pace separate Wave 1 image authoring per CLAUDE.md §11).
- TeachingPackage authoring (Arc 12 territory).
- Bundle authoring (Pillar 2 territory).
- App-side modifications.
- NUMBER_WORDS gender-toggle adoption in apps (apps team work; out of lesson-plans commission scope).
- Subscriber UI.

## 8. Doctrine to load before starting Stream A Phase 1

- §1, §3.4, §6 (CLAUDE.md vocabulary canonical), §A.3 (NEVER DO without operator approval — IMAGE_VOCABULARY direct modification ALLOWED per Arc 11 close commission), §A.7 (diacritics auto-healing), §10.3.
- `REFERENCE TRANSLATIONS/image-vocabulary.js` (1,246 entries; canonical schema).
- `REFERENCE TRANSLATIONS/number-words.js` IF EXISTS (otherwise create per Phase 2).
- Arc 5 Phase 1 original Stream A spec (in arc-5-recon.md or earlier docs).
- `docs/SUBSCRIPTION-SCOPE.md`.

## 9. Authorization

Operator ratified at Arc 11 close (2026-05-08): "Decision 2: Stream A escalation — σ-α (escalate NOW, separate parallel [INFRA]). Seven-arc deferral chain has reached the maturity threshold per Arc 9 spec. Vocabulary-acquisition strand uniquely substrate-blocked at 21/24 cannot progress further without family-members + action-verbs landing. Commission Stream A Phase 1 escalation as separate parallel [INFRA] arc covering NUMBER_WORDS gender-toggle + IMAGE_VOCABULARY extension + Romance/Nordic gender-data audit per Arc 5 Phase 1 original spec."

Stream A Phase 1 commences immediately as separate parallel `[INFRA]` arc concurrent with Pillar 2 + Arc 12 lesson-plan strand-volume.

## 10. Concurrent-arc protections (per Arc 11 close lock)

**Operator-attention serialization at surface points.** Stream A surfaces (Phase 1 entry; Phase 2 entry; Phase 3 audit findings; Phase 3 recon close) sequenced with Pillar 2 + Arc 12 surfaces. CC ensures no simultaneous surface-collision.

**Filesystem-territory separation.** Stream A territory: `REFERENCE TRANSLATIONS/image-vocabulary.js` + new NUMBER_WORDS infrastructure (path TBD at Phase 1 entry) + new audit script. Does NOT touch:
- `docs/lesson-plans/packages/` (Arc 12 territory)
- `docs/lesson-plans/bundles/` (Pillar 2 territory)
- `REFERENCE APPS/` (app-side; not in any lesson-plans-arc territory)

**Cross-arc dependency UNBLOCKING:** Stream A Phase 1 ship UNBLOCKS Arc 12 Phase 1 Path A (family-members + action-verbs authoring becomes possible). Per locked decision #34, CC adjudicates timing — if Stream A Phase 1 ships before Arc 12 Phase 1 commences, fold family-members + action-verbs into Arc 12 Phase 1.

**Surface posture:** standard (per Arc 11 close lock).

## 11. Family-members + action-verbs deferral chain RESOLUTION

**Pre-Stream-A-Phase-1-ship:** chain extends Arc 4 → 11 (7-arc deferral).

**Post-Stream-A-Phase-1-ship:** chain CLOSES. Arc 12 Phase 1 Path A available; CC adjudicates fold-in timing per locked decision #34.

**Stream A Phase 1 ship is the load-bearing event** that closes the deferral chain that has structured Arc 4-11 lesson-plan-arc commission specs. Doctrine-class transition: from "substrate-blocked deferral" pattern to "post-substrate-completion" content-authoring cadence.
