---
name: Verification — shape correctness AND path coverage, both from real samples
description: When verifying bundle assertions, check two axes — shape correctness (does the data match expected format?) AND path coverage (does the test deck actually exercise the code path under test?). Both axes must come from real bundle samples, not theoretical expectations. Same source-side-inference family as Brief A 5A.2's 5/5 spot-check failures, just one level deeper.
type: feedback
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
When writing verification code that checks bundle field shapes (regex matching expected token formats, type-shape validators, asserting field values), the methodology has TWO axes that must BOTH be verified:

**Axis 1 — Shape correctness:** does the actually-observed data match the expected format? Derive the assertion from 2–3 real bundle dumps, not from theoretical expectations.

**Axis 2 — Path coverage:** does the test deck exercise the code path under test? A field shape can look right while the test deck silently doesn't trigger the code that would expose a bug.

A "PASS" that satisfies axis 1 but fails axis 2 is a **lucky PASS** — masks coverage gaps rather than confirming correctness. The next implementation should default to asking *"what did this deck NOT exercise?"* alongside *"did the assertion match?"*

**Why both axes matter:** assertions written against theoretical shape expectations are themselves source-side inference. The same failure mode that produced Brief A 5A.2's 5/5 spot-check breakage applies here — the verifier's PASS/FAIL signal is only as good as its assumptions about (a) the data format and (b) the test data's coverage. A too-strict verifier produces false-FAIL on legal data; a too-loose verifier produces false-PASS on coverage gaps that mask real bugs.

**Originating incidents:** Brief A 5A.3 redo verification round.

**(a) Shape error — math-worksheet B verifier was too strict.**
The B carry-forward was: "math-worksheet equations[i].expr is consistently space-separated (e.g. 'A + B' not 'A+B' or 'A plus B')." I wrote the verifier regex as: `tokens.every(t => /^[A-Z]$/.test(t) || /^[+\-]$/.test(t))` — checking each token is a single letter OR a single operator.

Real expr samples in the verified bundle: `"C - B + A"`, `"A - C"`, `"A + 3 - 9"`, `"C - B"`, `"A + B + C"`. The third sample contains numeric literals (`3`, `9`) my regex didn't anticipate. The verifier reported FAIL when the data was actually correctly space-separated — just contained a token type I hadn't accounted for.

**(b) Coverage gap — more-less and math-worksheet "PASS" cases were lucky.**
Original Brief A 5A.2 spot-check showed more-less producing empty sr-only — appeared to fail. After Commit 1 added `bundle.problems[]` and the verifier checked the field shape, more-less PASSed shape correctness BUT `imageAKey`/`imageBKey` were both null in real data (because source provides path STRINGS, my bundle code expected OBJECTS). The verifier reported populated correctly without checking whether the values were null. Same shape error as math-worksheet's `imageKeyMap` empty in the verified deck — the deck was a symbol-only puzzle with no images assigned, so the bundle code that handles populated imageMap never executed.

**How to apply:**

1. Before writing a verification regex or assertion, dump 2–3 real bundles via `var DECK_BUNDLE = ...` parsing.
2. Enumerate the actually-observed token / value types in the data being verified. List them explicitly (e.g., "tokens observed: capital letters, single-digit numbers, multi-digit numbers, + - = symbols").
3. Write the regex / assertion to accept all observed types. Reject only types that are clearly malformed.
4. **Coverage check after shape check**: before declaring PASS, ask *"what did this deck NOT exercise?"* For per-field assertions, check that the field's value is non-null / non-empty in the test sample. If the field is empty, the test deck didn't trigger the code path; surface as **lucky PASS** rather than confirmed PASS, and request a re-test deck that exercises the path.
5. If a real sample surfaces a type not in the original enumeration, that's information — re-enumerate, expand the regex. Don't reject the data on grounds of "shouldn't be there."

**Don't:**
- Don't write `tokens.every(t => /^[A-Z]$/...)` because "tokens are letters and operators" — verify what's actually there.
- Don't claim verification PASS without (a) the verifier passing all real samples AND (b) the test deck exercising the field's populated path.
- Don't claim verification FAIL without confirming the data really is malformed (vs. the verifier being too strict).
- Don't accept empty-array / null-value cases as "PASS" without explicitly noting the coverage gap. `imageMap === {}` PASSes shape but doesn't tell you whether the populated path works.

**Pairs with:** [feedback_bundle_shape_investigation_methodology.md](feedback_bundle_shape_investigation_methodology.md) — same root principle (trace, don't infer) applied to verification rather than per-app code construction.

**Forward-looking helper note (deferred refactor):** image-key resolution from extractDeckBundle() is now inline in 5+ places across the Brief A bundle-extended apps with two opposite-direction dual-shape branches (string-vs-object). Worth a `LCSImageRef.coercePath(imgOrPath)` helper in catalog-export.js (or in image-reference.js) to centralize the dual-shape handling once a third bundle extension hits the same question. Don't preemptively promote per minimum-needed; flag for promotion when a third consumer arrives. Same pattern as `srOperator*` keys (single-consumer in math-worksheet until promoted to shared on second arrival).
