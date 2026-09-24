---
name: project-phonics-safety-pipeline
description: Phonics safety-verification pipeline + NO STEP 1+2 + DA STEP 1 + ng-rule + WORD_BLACKLIST + DA policy-managed-decoration doctrine (2026-05-25, commit 4b014cbc). Group-C E9 COMPLETE (5 of 5 Nordic locales live).
metadata: 
  node_type: memory
  type: project
  originSessionId: aa585226-31b9-437f-b029-655565fce24e
---

**[AMENDMENT 2026-06-04, commit `4d5ef88d`] sv Nordic school-convention carve-out (klappa stavelser) + policial.pt.** sv adopted the SCHOOL sound-out split (ck=klock-a, muta-cum-liquida se-bra/mus-kler, seam hand-ske) where TeX is wrong-for-purpose. **Mechanism is SURGICAL, NOT GREEN** — full GREEN was REJECTED (it globally relaxes split_source_disagreement, admitting ~192 words incl. ~14 compound-seam rule errors, breaching the safety invariant). Instead `gate.js isRegisteredSchoolDivergence()` + per-locale `SCHOOL_DIVERGENCE` config accept the school split over a disagreeing TeX ONLY for registered patterns (ck-coda PATTERN + reviewer-validated muta/seam allowlist); accepted divergences STILL pass full multi-source count agreement. **no/da will inherit this same surgical mechanism (NOT GREEN) when their pilots run.** Corrected muta class (portable): stop+liquid only (v excluded, fricative), geminate-onset kept whole (äpp-le), ng-coda kept whole (kring-la), short-vowel exception (käg-la). Backlog: rule compound-seam under-grab (busschaufför/julstrumpa/…) stays quarantined; root-fix is prerequisite to any future GREEN widening (would recover ~178 correct words). sv pool **964→984** (+20 R==T strict-recoveries via the muta rule CORRECTION, NOT relaxation; 0 wrong admitted). policial.pt 3→4 → pt **890→891**. Native-sv reviewer confirmed 36 re-splits + 20 recoveries + 12 §10.3 vocab counts; ruled kägla SETTLED=käg-la. Live sv deck `bygg-ordet-av-stavelser`: klocka kloc-ka→klock-a. Full doctrine: CLAUDE.md §A.13.57 Nordic amendment. NOTE: sv.js/no.js/nl.js/de.js are UNTRACKED working-tree files (only es/fi/fr/it/pt tracked) — this commit added sv.js.

**Status (2026-05-25 session close, commit `4b014cbc`):** Pipeline shipped at `91421bda`; gate v1.1 + río + iã+o + NO STEP 2 + DA STEP 1 layered through `4b014cbc`. ES+FI+SV+PT+NO+DA all run against the real 1,263 K-3 nouns. **E9 Sound-Chunk Builder Group-C COMPLETE** (5 of 5 Nordic locales: DE/NL/SV/NO/DA live).

## Per-locale gated counts (post all this-session fixes)

| Locale | Approved | Quarantined | Source stack | Notes |
|---|---:|---:|---|---|
| en   | n/a | n/a | (E7 CVC uses curated word set; not pipeline-gated) | |
| es   | 958 | 305 | T + R + S | gate v1.1 GREEN |
| fi   | 1120| 143 | T + R + S | gate v1.1 GREEN |
| sv   | **984** | 279 | T + R + N + W + S + chunk-table + SURGICAL school-divergence carve-out | post school-convention carve-out 2026-06-04 (was 964; +20 R==T recoveries) |
| pt   | **891** | 372 | T + R + S | gate v1.1 GREEN (was 890; +policial.pt count fix) |
| **no**   | **829** | **434** | **T + R + N + W + S + chunk-table** | **STEP 2 + 9-word WORD_BLACKLIST; school-convention fan-out 2026-06-04 (`a4b77662`): no.js ALREADY school-correct (R==T 100%), NO carve-out — Norwegian SPLITS geminates klok-ke (opposite of sv ck-coda), ng-split, vr-onset ha-vre, hanske=hans-ke; no SCHOOL_DIVERGENCE entry; no.js now git-TRACKED (was untracked)** |
| **da**   | **794** | **469** | **T + N + W + S + Q decoration** | **STEP 1 only; 402 K-1-safe (non-policy-managed) pool; no da.js by operator decision** |
| de/nl/it/fr | (not yet run on corpus; pipeline ready) | | | |

`approved-words-<locale>.json` pools are canonical word sources for E8/E9 activity authoring, but git-tracking is partial: **tracked = es/fi/fr/it/pt/sv**; **de/nl/da/no pools are UNTRACKED** working-tree files (en has none). A commission editing a de/nl/da/no pool MUST `git add` it (confirm via `git ls-files`) or the change lives only on disk. (CLAUDE.md §A.13.57 is SoT; da has a pool but no rule-syllabifier — distinct.)

## Locked safety invariant (operator non-negotiable)

> "A wrong split NEVER reaches an activity; quarantine ALWAYS beats publishing a wrong split."

Operationalized at gate.js:226-238: `split_source_disagreement` check fires BEFORE count-agreement check. R (rule-syllabifier) is an ADDITIONAL agreeing source — NEVER overrides T's split.

**Empirical confirmation (SV STEP 2):** 964/964 SV-approved words have BOTH `TeX` AND `rule` in `sources_agreed`. Zero R-overrides-T. R only "recovers" words by reinforcing T's correct split (lifting words that were T+S=2-agreed to T+R+S=3-agreed).

## WORD_BLACKLIST mechanism (rule-syllabifier doctrine, locked in NO STEP 2)

When R's principled K-1 convention conflicts with TeX's empirically-inconsistent choice for specific words — AND the word is a native (not loanword) — R RETURNS NULL for those words. Effect: gate sees only T as split source → no split-disagreement → word recovers via T+N+S count agreement.

This honors the locked safety invariant: R never overrides T's split; R abstains instead.

**NO blacklist (9 words):** kjegle, kongle, kringle, sykling, tøfler, gjøkur, oppvaskmaskin, symaskin, forstørrelsesglass. Reasons: TeX-NO inconsistent on stop+liquid (kr/gl/kl) vs sk convention; principled R can't match per-word. Loanwords stay regressed (acceptable per operator).

## Norwegian + Danish ng-rule (locked)

**Norwegian intervocalic ng splits BETWEEN the n and the g.** Default 2-chunk walker; `n` stays as coda of preceding syllable, `g` becomes onset of following syllable. NO special case for ng in `no.js`.

Examples (real `approved-words-no.json` rows):
- engel → en-gel ✓ (intervocalic ng → n|g split)
- finger → fin-ger ✓
- ballong → bal-long (final ng kept as coda; no between-vowel split)
- ringperm → ring-perm (pre-consonant ng kept as coda; boundary at j-1 in 3+-walker)

**Different from Swedish ng-as-coda.** SV `sv.js` has a special case `if (pair === 'ng') boundaryTok = j` that pulls BOTH consonants to the preceding syllable → ängel → äng-el (Garlén/Lgr22 convention).

**Danish follows the NO rule** per empirical TeX+NST evidence in DA STEP 1 (engel approved as en-gel in DA, not eng-el). For future `da.js` reference if/when built — inherit the NO walker shape, NOT the SV special case.

`no.js` header comments at lines 47-51 + 104-108 document this rule correctly.

## DA quarantine regex is policy-decoration, NOT gate-veto

Per `cli.js:100-103` (verbatim):
```
inputs.daPolicyManaged = qResult.flagged;
inputs.daQuarantineReasons = qResult.reasons;
// Do NOT set inputs.Q here — that would trigger hard quarantine in the gate.
// The policy doc handles these words; they still PASS the gate.
```

The 5-criterion `da-quarantine.js` regex (stød / weakened-final / post-vocalic-r / s-stop / ld-nd-rd) runs on every DA word's IPA but flags `policy_managed:true` as **DECORATION on PASS verdicts** — never hard-quarantines.

Per §20.7 verdict: "DECIDED: orthographic syllables for K-1, phonemic-divergence awareness grade 2 per Elbro lydrethed-first."

**DA STEP 1 empirical (post-run):**
- 794 approved (62.9%)
- 469 quarantined (37.1% — at the LOW end of §20.7-predicted 35-55%)
- **392 of 794 approved (49.4%) carry `policy_managed:true`** — informational flag for activity authoring
- **402 of 794 approved (50.6%) are non-policy-managed K-1 strict-safe pool**

Sub-reason tally across flagged subset: 200 post_vocalic_r_vocalized / 181 final_stop_not_realized / 69 ld_nd_rd_cluster_deletion / 9 stod_on_vowel_no_consonant_cue / 3 s_stop_cluster_unaspirated.

**Operator's K-1 activity-authoring guidance:** use only `policy_managed:false` words for K-1 syllable-builder activities (orthography aligns with sound). Use full 794 if grade-2 phonemic-divergence awareness is part of the lesson.

## Manifest-id disambiguation convention (started NO, continued DA)

Engine `_loadActivity` does `rows.find(r.id === activityId)`. If two manifest entries share the same id, the FIRST one wins regardless of locale.

**Convention:** every new locale's syllable-builder manifest id gets a `.<locale>` suffix. Defensive even when slug is currently unique.

- SV: `syllable-builder.bygg-ordet-av-stavelser.rf-k-2-b` (pre-convention; lives unchanged)
- NO: `syllable-builder.bygg-ordet-av-stavelser.no.rf-k-2-b` ← collision-disambig
- DA: `syllable-builder.byg-ordet-af-stavelser.da.rf-k-2-b` ← defensive

## Latent .da Spanish-placeholder bug-class (5th confirmation)

5 string surfaces in `mini tools/syllable-builder-activity.js` (lines 32/45/58/147/148) defaulted to Spanish at file-init for `.da`. Same bug shape fixed previously for `.de` (`3704dea5`), `.nl` (`6053e0df`), `.sv` (`c2bc4249`), `.no` (`f834efd1`).

Pattern: **fix-as-part-of-build** for any new locale syllable-builder commission. Phase 1 grep `da:` / `<locale>:` for Spanish text in the activity.js; fix all 5 surfaces in same commit as build.

## Audit verdicts on adjacent rule-syllabifiers (no code changes from this session)

- `es.js` — N/A for nasal-rebracket (Spanish has no nasal vowels)
- `it.js` — FLAG (Italian iato/dittongo register-sensitive; on NSR-backlog)
- `fr.js` — CORRECT (explicit digraph enumeration; not phonotactic)
- `fi.js` — CORRECT (explicit diphthong set; no accent marks in native FI)
- `sv.js` — sv.js STEP 2 SHIPPED pre-session; ng-as-coda special case is locked (sv-specific)
- **`no.js` — sv.js-shape clone with 5 iteration rounds + 9-word WORD_BLACKLIST; net +58 to 829/1263 (65.6%); ng-as-coda special-case REMOVED for Norwegian**
- `da.js` — **NOT BUILT** per operator decision (DA STEP 1 option i ship-from-K-1-safe pool selected; option ii rejected as low ROI)

## Per-language verdicts (LOCKED — verbatim, this-session-current state)

- **sv** — safe + ~30-60 sj/kj/sk-cluster quarantine. **Empirical post sv.js: 964/1263 = 76.3% approved.** Strongest source stack of all locales (NST + Wiktionary + chunk-table + sv.js R + S).
- **no** — safe + Norwegian-specific TeX-under-segmentation defect class (262 words); R recovers 87, regressions 29 (all loanwords; operator-acceptable). **Empirical post no.js: 829/1263 = 65.6% approved.** ng-rule = n|g split (DIFFERENT from sv).
- **de** — safe + ~80-120 multigraph-onset quarantine (Sch/Sp/St/Pf/Qu/Ch). Resolved by DE curriculum chunk table cited from Augst & Dehn (2009). E9 DE activity live pre-session.
- **nl** — safe + ~200-300 multigraph quarantine. THINNEST source coverage. E9 NL activity live pre-session.
- **da** — safe + **35-55% policy-managed decoration rate (NOT quarantine)** via 5-criterion IPA regex on PASS verdicts per cli.js:100-103. **Empirical STEP 1: 794/1263 approved (62.9%); 402 K-1 strict-safe pool (policy_managed:false).** Operator-decided ship from K-1 safe pool; no da.js by design. ng-rule follows NO (n|g split).
- **es/it/pt/fr/fi** — GREEN auto-gate. No locale-specific concern.

## Pipeline outputs (the source of truth for activity authoring)

- `scripts/v2-data/verify-syllable-boundaries/output/approved-words-<locale>.json` — gated word list per locale. **Activity authoring reads ONLY from here.** Words not on the list cannot enter any activity manifest.
- `output/quarantine-report.json` — aggregated quarantined words with reasons + source outputs
- `output/kaikki-coverage-preflight.json` — pre-flight Wiktionary coverage per locale
- Snapshots: `output/approved-words-{no,sv}.before-<arc>.json` + `output/quarantine-report.before-<arc>.json` (out-of-tree per §A.13.44)

## Read-only inputs (NEVER modified by the pipeline)

- `REFERENCE TRANSLATIONS/image-vocabulary.js` — 1,263 noun keys × 11 locales
- `scripts/v2-data/vocabulary-phonics.json` — pre-computed `syl`/`pat`/`lc`/`cmp`

## Files

| Path | Role |
|---|---|
| `scripts/v2-data/verify-syllable-boundaries/cli.js` | Orchestrator entrypoint |
| `gate.js` | Multi-source agreement evaluator (strict-gate semantics confirmed empirically this session) |
| `sources/{hyphenation,nst,kaikki-wiktionary,vocab-phonics-cross-check,rule-syllabifier,image-vocabulary-loader}.js` | Per-source adapters |
| `rule-syllabifiers/{fi,es,it,pt,fr,sv,no}.js` | Per-locale phonotactic syllabifiers (no.js ADDED this session ~370 LOC) |
| `chunk-tables/{de,nl,sv,no}-chunks.json` | Curriculum chunk inventories (cited) |
| `da-grapheme-phoneme.json` | Danish G-P table (Juul/Elbro/Gellert-cited) |
| `da-quarantine.js` | 5-criterion IPA-regex detector (DECORATION on PASS, not gate-veto) |
| `danish-syllable-policy.md` | Operator-revisitable policy doc |

## Next commission queue

- **E8 fan-out to FR** — next active commission (fr.js confirmed CORRECT)
- **E8 fan-out to IT** — NSR-flagged commission alongside FR (it.js iato/dittongo register-sensitive)
- After E8 reaches ≥4 locales: future E9-equivalent locales OR new engine builds (E4 match-pairs, E12 place-value, etc.)
- **DA STEP 2 (build da.js) — operator-rejected at this session; revisit if grade-2 phonemic-awareness activities authorize policy-managed-word use**

## sv compound-seam surgical recovery — SHIPPED 2026-06-04 (`[NSR-FLAG][sv]`)

Root-caused the sv seam under-grab backlog: ONE mechanism (compound layer can't locate the seam → phonotactic layer leaks a stem-internal rule across it). **Seam location is INHERENTLY LEXICAL** (`muskler` vs `påsklilja` `V s k l V` ambiguity + linking-`s` collapse) — no rule fix exists; only surgical exact-match override is safety-compatible (over-match ships wrong = forbidden; under-match quarantines = acceptable). **Recovered 8 words** via `sv.js SCHOOL_COMPOUND_SEAMS` (+ gate.js `SCHOOL_DIVERGENCE.sv.mutaSeamWords` for the 6 Class-2 where TeX is also wrong): havssköldpadda, havssnäcka, julstrumpa, blåskrika, höstack, ljusslingor, sjukhusarmband, förlängningssladd. sv pool 984→993 entries. Anti-regression test `sv-seam-recovery.test.js`. **CORRECTED FRAME: never GREEN for Nordic — strict gate + surgical recovery, never wholesale R-authority; the "seam-fix as GREEN prerequisite" framing is RETIRED** (CLAUDE.md §A.13.57 amended). Lexicon-expansion REJECTED (unbounded over-match). 3 deliberate drops below.

## Backlog (deferred)

- **[§A.7 DATA-QUALITY] `conversation-heart` calque scan** — sv label `Samtalshjärta` (also de `Gesprächsherz`, fr `Cœur de conversation`) is a literal calque of the English Valentine-candy concept; native-sv flagged it as not natural K-3 Swedish (dropped from seam recovery despite a correct split). Scope a cross-locale scan for similar English-concept calques in corpus labels — its own initiative, NOT actioned.
- **[§10.3 vocab-phonics] `skridskoåkning` `syl` 3→4** — `vocabulary-phonics.json` S=3 is wrong (school count 4; NST N=4 agrees). Blocks its seam recovery (count-mismatch quarantine). A protected single-word correction would make it recoverable via the same Class-1 path. Operator-approved edit, separate.
- **[FUTURE] sv GREEN-widening / SALDO decompounder** — only ever gated behind strict agreement (recover-not-override); the ~178 typographic-divergence words stay quarantined as acceptable. NOT a GREEN trigger.
- `[FIX][DATA]` vocab-phonics count drift on río + iã+o classes (~13 words ES + PT; safety floor catches them)
- IT NSR-flagged commission (it.js iato/dittongo verification)
- DA STEP 2 da.js (deferred per operator option-i ship-from-K-1-safe)

**Origin:** This-session updates 2026-05-25 (NO STEP 1+STEP 2 + DA STEP 1 + Group-C completion at commit `4b014cbc`). Pre-this-session pipeline + sv.js STEP 2 + es/fi/pt/sv proven at earlier commissions.
