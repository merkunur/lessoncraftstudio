# §20 activities — relocated empirical detail (from CLAUDE.md)

> Gate-evolution, per-locale pool counts, adjacent-syllabifier audit verdicts, and the Nordic-seam backlog for the phonics pipeline (§20.7). CLAUDE.md keeps the safety requirement + the LOCKED per-language verdicts + pointer. Live working SoT is [[project-phonics-safety-pipeline]] / [[project-activities-live-inventory]]. Relocated 2026-06-08 — nothing deleted.

## §20.7 Literacy engines + phonics safety pipeline (full)

### 20.7 Literacy engines + phonics safety pipeline
See [[project-phonics-safety-pipeline]]. Built + SV+FI proven at commit `91421bda` (2026-05-22). 3 engines over a shared internal word-builder core, shipped as distinct facades: **E7** single-letter (EN, built; 20-task CVC deck) · **E8** Syllable Builder (es/it/pt/fr/fi — **all LIVE**, 28-word decks) · **E9** Sound-Chunk Builder (de/nl/sv/da/no — **all LIVE**; 28-word decks, de 30). E2 already covers letter-recognition / sight-words / initial-sound across all locales.

**Safety requirement (operator, non-negotiable):** a syllable/decoding error must be **structurally impossible to publish**. Every word's syllable/sound break confirmed by ≥3 independent sources OR quarantine. Source stack: TeX hyphenation (`hyphen` npm) + in-repo rule-based syllabifier + NST pronunciation lexicons (CC0; sv/no/da) + Wiktionary IPA (kaikki; de/nl/sv/no/da) + `vocabulary-phonics.json` syl cross-check + per-locale curriculum chunk tables (de/nl/sv/no) + DA quarantine regex (5 IPA-criteria → policy-managed flag).

**Per-language verdicts (LOCKED, verbatim):**
- **sv** — fully safe, no quarantine
- **no** — safe + ~30-60 kj/sj/skj quarantine (one merger-policy decision; treat kj+sj as distinct in K-1, awareness in grade 2)
- **de** — safe + ~80-120 multigraph-onset quarantine (Augst & Dehn-cited chunk table)
- **nl** — safe + ~200-300 multigraph quarantine; thinnest source coverage (Wiktionary pre-flight passed at 84% — above 60% threshold)
- **da** — safe + 35-55% policy-managed-decoration rate (stød/weakened-final/post-vocalic-r/s-stop/ld-nd-rd, regex-detectable from NST IPA) + ONE curriculum policy decision **DECIDED: orthographic syllables for K-1, phonemic-divergence awareness grade 2** (Elbro lydrethed-first). **CRITICAL implementation detail (per `cli.js:100-103`)**: the 5-criterion `da-quarantine.js` regex is DECORATION on PASS verdicts (`policy_managed:true` flag), NOT hard quarantine. DA flagged words still pass the syllable-count gate; the policy determines which activities they're eligible for (K-1 strict uses `policy_managed:false` pool; grade-2 inclusive uses full approved). DA STEP 1 empirical (2026-05-25, 794/1263 approved): 392 of 794 (49.4%) carry the flag — exactly the §20.7-predicted "haircut" — leaving 402 K-1-safe non-policy-managed words for K-1 activity authoring
- **es/it/pt/fr/fi** — GREEN auto-gate, no concern

**No live per-word human review required for any language.** Pipeline outputs `scripts/v2-data/verify-syllable-boundaries/output/approved-words-<locale>.json` (activity-authoring source of truth) + `quarantine-report.json` (operator-reviewable). Read-only inputs: image-vocabulary.js + vocabulary-phonics.json (NEVER touched).

**Gate evolution post-pipeline-ship (2026-05-22 session):**
- **Gate v1.1** (commit `6bc6e804`): GREEN-locale (es/it/pt/fr/fi) rule-syllabifier is the AUTHORITATIVE split source when it agrees with vocab-phonics count. TeX disagreement is advisory-only (no longer vetoes). Safety floor preserved: rule-vs-vocab-phonics count disagreement still quarantines; rule-null falls through to legacy 3-source gate.
- **Per-locale rule-syllabifier fixes** (ES río accent-guard, PT iã+o re-bracketing, PT ss/rr split, PT-hiatus + FI-seam settled counts, policial.pt 3→4): the specific commit-by-commit accent/digraph/seam corrections live in [[project-phonics-safety-pipeline]] + §A.13.57. Each preserved the safety floor (count-disagreement still quarantines); none moved the gate threshold.

**Per-locale gated approved-pool counts (live `output/`, post the 2026-06 fixes + Nordic arc):** ES 958 · IT 978 · PT 891 · NL 1062 · SV **984** (post-carve-out, was 931 pre-arc) · NO 829 · DA 794 · FI 1120 · FR 810 · DE 1028, of 1263 K-3 nouns. EN curated word set (not pipeline-gated). These are the activity-authoring source-of-truth pools (`approved-words-<locale>.json`).

**Audit verdicts on adjacent rule-syllabifiers (no code changes):**
- `es.js` — N/A for nasal-rebracket (Spanish has no nasal vowels)
- `it.js` — was FLAGGED (Italian iato/dittongo register-sensitive); the flag did NOT block — IT shipped (E8 "Forma la parola con le sillabe" LIVE, 28-word deck, native-reviewer-confirmed). The flagged class did not surface in the K-3 deck corpus.
- `fr.js` — CORRECT (explicit digraph enumeration; not phonotactic)
- `fi.js` — CORRECT (explicit diphthong set; no accent marks in native FI)

**Backlog:** the río + iã+o vocab-phonics count drift (~13 ES/PT words) is now **CLOSED** — the 8 settled count corrections + `pt.js`/`fi.js` guards (`7393a989`) re-enabled them. The **OPEN** syllable-pipeline backlog is now the **~14 Nordic compound-seam under-grab errors** (sv `bus-schauf-för` / `juls-trum-pa` / `blåskrika` / `höstack` / `samtalshjärta` …, §A.13.57) — they stay quarantined behind the strict gate; hardening the rule's morpheme-seam handling at root is the **prerequisite to any future GREEN-widening** of sv (which would then recover the ~178 correct words currently quarantined).
