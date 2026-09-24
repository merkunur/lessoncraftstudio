---
name: feedback-pipeline-regression-snapshot
description: "When modifying a rule-syllabifier or gate logic in scripts/v2-data/verify-syllable-boundaries/, snapshot ALL relevant output JSONs to .before-<arc>.json before re-running. The diff is the regression-safety proof; without snapshots there's no auditable baseline."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2eb716ab-7052-48c6-a06d-c346c748d2b3
---

Rule: For ANY change to `scripts/v2-data/verify-syllable-boundaries/` (gate.js, cli.js, rule-syllabifiers/*.js), snapshot the existing `output/approved-words-<locale>.json` for every affected locale + the aggregated `output/quarantine-report.json` to `.before-<arc>.json` siblings BEFORE re-running the pipeline.

Convention: `<filename>.before-<short-arc-name>.json`. Examples from this session:
- `approved-words-es.fix-rio.before.json` (río fix commission `b84113f7`)
- `approved-words-pt.before-pt.json` (PT first-run commission `e6f979cf`)
- `approved-words-pt.before-ia-fix.json` (iã+o fix commission `ad4924da`)
- `approved-words-fi.fix-rio.before.json` + `approved-words-sv.before.json` + `quarantine-report.before.json` (cross-commission baselines)

**Why:** The pipeline regenerates the entire output, so the diff against the snapshot is the only auditable evidence that (a) the target class shifted as expected, (b) no other class regressed, and (c) counts in untouched locales stayed byte-identical (modulo `generated_at` timestamp).

**How to apply:** snapshot BEFORE `node cli.js`. Do NOT stage the .before files (out-of-tree audit artifacts per CLAUDE.md §A.8.3). Use them only in the report's verdict-shift / regression diff. Operator commits the post-run outputs; the .before files stay in the working tree as session-local working memory.

**Empirical anchor:** the gate v1.1 recalibration commission (commit `6bc6e804`) introduced the pattern; the río fix (`b84113f7`) + PT first-run (`e6f979cf`) + iã+o fix (`ad4924da`) all reused it with clean diffs. The discipline scales — a 4-locale re-run with snapshots took ~5 minutes including analysis. Caught zero false positives.

Cross-reference: CLAUDE.md §A.13.44; §A.8.3 (out-of-tree audit artifacts).
