---
name: feedback-pre-flight-hand-trace-encoding
description: "Pre-flight hand-traces of syllabifier behavior MUST keep diacritics intact. PT first-run Phase 1 agent traced pão as p+a+o (3 chars where second was plain a), missing that ã is U+00E3 (single codepoint in NASAL_VOWELS). Verify by reading actual code, not via mental-model reasoning."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2eb716ab-7052-48c6-a06d-c346c748d2b3
---

Rule: When tracing rule-syllabifier behavior by hand (typical Phase 1 diagnostic for any pipeline change), keep accented characters as their canonical Unicode codepoints throughout. `ã` is U+00E3 (single codepoint, in `NASAL_VOWELS`); `pão` is `p`+`ã`+`o`, NOT `p`+`a`+`o`. Same applies to `õ` (U+00F5), `í` (U+00ED), `ú` (U+00FA), `é` (U+00E9), etc.

**Why:** A Phase 1 Explore agent traced `pão` as `p`+`a`+`o` and concluded a "BLOCKING ISSUE" exists in pt.js nasal-diphthong handling. I verified by reading pt.js directly + hand-tracing with the correct codepoints, and the alarm was a false positive. The character `ã` was silently stripped of its diacritic during the agent's mental-model trace.

Powering through the agent's hypothesis would have wasted a commission designing a fix for a non-bug.

**How to apply:** ALWAYS read the actual file (Read tool) + verify the agent's character-by-character trace before accepting a "blocking issue" claim. Specifically:
1. Read the rule-syllabifier file (`pt.js`, `es.js`, etc.) to confirm the actual `VOWELS`/`STRONG_VOWELS`/`WEAK_VOWELS`/`NASAL_VOWELS` set membership.
2. For each pre-flight test word with diacritics, COPY the exact characters from the source corpus (image-vocabulary.js) — don't retype.
3. Hand-trace step by step, naming each codepoint explicitly when it's non-ASCII.

CLAUDE.md §A.13.14 already says "Explore for breadth-survey, direct Grep+Read for fidelity-critical claims" — this is a specific instance for syllabifier hand-traces.

**Empirical anchor:** PT first-run commission Phase 1 (commit `e6f979cf`). The Phase 1 Explore agent's diagnostic claimed `pão` would split as `pa-o`; direct read of pt.js + correct codepoint tracing showed it correctly splits as `[pão]` (1 syllable, nasal diphthong via the `NASAL_VOWELS.has('ã')` check). The agent's error was tracing `p`+`a`+`o` instead of `p`+`ã`+`o`.

Note: the GENUINE iã+o defect (avião → [a,viã,o]) was a different, real bug — surfaced empirically when the pipeline ran on the real corpus, NOT predicted by the agent. That's the correct fault-detection mode: hand-traces predict; empirical runs validate.

Cross-reference: CLAUDE.md §A.13.14 + §A.13.45.
