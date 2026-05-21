# Phonics safety-verification pipeline

Build-time validator that gates K-3 phonics activities. For each word in `REFERENCE TRANSLATIONS/image-vocabulary.js`, the pipeline asks ≥3 independent sources to verify the syllable / sound-chunk breakdown. Words where all sources agree go to `approved-words-<locale>.json` (the source of truth for activity authoring). Words with any disagreement go to `quarantine-report.json` with the disagreeing-source details surfaced for operator review.

**The kid never sees a word the pipeline didn't approve.** That's the safety invariant.

## Sources per language

| Source | Mechanism | Locales |
|---|---|---|
| **T** — TeX hyphenation | `hyphen` npm (Liang patterns; MIT) | all 11 |
| **R** — Rule-based syllabifier | per-locale phonotactic rules (in-repo) | es, it, pt, fr, fi |
| **N** — NST pronunciation lexicon | CC-ZERO public-domain from Språkbanken/Nasjonalbiblioteket; SAMPA with `$`-separator syllable boundaries | sv, no, da |
| **W** — Wiktionary IPA | en.wiktionary.org API; CC-BY-SA; counts IPA vowel nuclei | de, nl, sv, no, da |
| **S** — vocab-phonics syl | `scripts/v2-data/vocabulary-phonics.json` syl count cross-check | all 11 |
| **C** — Curriculum chunk table | in-repo JSON cited from academic + textbook sources | de, nl, sv, no |
| **DA quarantine regex** | 5-criterion IPA pattern detector → policy-managed flag | da only |

NST + Wiktionary feed the gate as **count cross-checks** (NST is phonetic SAMPA; orthographic split comes from T/R). Disagreement at the count level → quarantine.

## Usage

```bash
# Install deps (once)
cd scripts/v2-data/verify-syllable-boundaries
npm install

# Run on one locale
node cli.js --locale sv

# Run on multiple
node cli.js --locales sv,fi

# Run on all 11
node cli.js --all
```

External corpora (NST + Wiktionary) download on first run and cache to `.cache/` (gitignored).

## Outputs

| File | Contents |
|---|---|
| `output/approved-words-<locale>.json` | Gated word list. Activity authoring draws ONLY from here. Includes per-word split, count, chunks, sources_agreed. |
| `output/quarantine-report.json` | Aggregated quarantined words with reasons + source outputs. Operator-reviewable. |
| `output/kaikki-coverage-preflight.json` | Pre-flight Wiktionary coverage numbers per locale. |

## Files committed (small) vs cached locally (large)

**Committed:** all pipeline code, chunk tables, DA G-P table + quarantine regex + policy doc, outputs.

**Cached locally (`.cache/`, gitignored):**
- NST lexicons (~50-220MB compressed each; downloads from sprakbanken.no on first run)
- kaikki/Wiktionary per-word lookups (per-locale JSON; populated incrementally)

## Danish policy

See `danish-syllable-policy.md`. Default: orthographic syllables for K-1, phonemic-divergence awareness in grade 2. Words tripping the DA quarantine regex (~35-55% of K-3 DA vocabulary) are flagged `policy_managed: true` in `approved-words-da.json` but still pass — the policy doc defines how each grade-level handles them.

## Proof run

This commission proved the pipeline on SV + FI against the real 1,263 K-3 nouns. Results:

| Locale | Approved | Quarantined | Source stack |
|---|---|---|---|
| FI | 990 (78.4%) | 273 | T + R + S (3 sources) |
| SV | 931 (73.7%) | 332 | T + N (count) + W + S (4 sources) |

Quarantine reasons (combined):
- 248 fi split-source disagreement (TeX typographic rules vs rule-based pedagogical syllabification — known TeX vs phonotactic mismatch; operator can review + author manual overrides)
- 223 sv syllable-count mismatch (TeX disagrees with NST + Wiktionary + vocab-phonics on count — real disagreements that the pipeline correctly catches)
- 109 sv insufficient independent sources (count sources couldn't be retrieved for some words; Wiktionary coverage gap)
- 17 fi syllable-count mismatch
- 8 fi insufficient independent sources

## Next commission

Build E8 Syllable Builder + a proof activity on top of `approved-words-fi.json` OR `approved-words-sv.json` (operator picks). Activity authoring reads ONLY from the approved file — words not on the list cannot enter the activity manifest.

## Files of note

- `cli.js` — entrypoint
- `gate.js` — multi-source agreement evaluator
- `sources/` — per-source adapters
- `rule-syllabifiers/` — per-locale phonotactic rules (FI is proof-critical; ES/IT/PT/FR built but not run in proof)
- `chunk-tables/` — curriculum chunk inventories (DE/NL/SV/NO)
- `da-grapheme-phoneme.json` — Danish G-P table (Juul/Elbro-cited)
- `da-quarantine.js` — Danish IPA-regex policy-managed-class detector
- `danish-syllable-policy.md` — Danish curriculum policy (operator-revisitable)
- `output/` — gated outputs
- `.cache/` — externally-vendored data (gitignored)

## Read-only inputs

These files are READ-ONLY; the pipeline never modifies them:

- `../../REFERENCE TRANSLATIONS/image-vocabulary.js` — 1,263 nouns × 11 locales
- `../vocabulary-phonics.json` — pre-computed phonics enrichment (syl count + C/V pattern)
