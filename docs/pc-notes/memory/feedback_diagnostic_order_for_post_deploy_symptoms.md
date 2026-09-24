---
name: Diagnostic order for post-deploy symptoms — parse before rolling back
description: When an app shows symptoms after a session's deploys, parse the inline JS for syntax errors BEFORE attributing to recent work or rolling back. Pre-existing latent bugs can surface late and look like regressions when the timing aligns with new deploys.
type: feedback
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
When the operator reports an app broken after a session's deploys, the instinct to roll back recent changes is wrong as a first move. Recent deploys are correlation, not causation. The diagnostic order should be:

1. **Read the actual error** — get the JS console output (or screenshot of it) before any rollback. The first red line is usually the root cause. Asking for the console error costs 30 seconds; rolling back blind costs a deploy + verify + potentially-orthogonal revert.
2. **Parse the inline JS** — for any `<script>...</script>` block in the affected page, run `node --check` or `new Function(code)` to detect syntax errors. Pre-existing latent bugs can surface late if the affected code path was previously unused.
3. **git blame** the suspicious code BEFORE assuming recent work caused it. If the broken line predates the session's deploys by weeks or months, the deploys aren't the cause.
4. **Then** decide between rollback (if root cause is in recent work) vs. patch-forward (if root cause is pre-existing).

**Originating incident:** Brief A 5A.3 redo. Operator reported matching.html broken: "Obviously you broke the javascript." Symptoms (tiny canvas + dead sidebar) matched my Brief A bulk-script changes' deploy timing. I rolled back matching.html to its pre-Brief-A state without checking the inline JS first. Revert deployed, didn't fix the symptom — because the actual cause was a `try {}`-without-catch syntax error introduced 2026-03-02 in commit 67d28e2d ("Remove CVC Words app completely"), latent since March, surfaced now because the operator's first interactive use of matching in months hit a code path that the parser-error-aborted script block contained. The Brief A revert was orthogonal to the cause; the wasted round cost a commit + push + server-side `update-worksheet.sh` + verify cycle.

**Don't:**
- Don't say "obviously my work caused this" before reading the console error. Even if the timing is suspicious.
- Don't roll back deployed work as the first response. Rollback is reversible, but it's NOT free — every redeploy + cache-bust round has a cost, and unnecessary rollbacks dilute the trust signal that future rollbacks are needed.
- Don't generalize from one broken app to "probably others are broken too" without evidence. The natural follow-up question — "are other Group A apps also broken?" — is reasonable to ask, but the answer should drive a parsing pass across all of them, not a panicky scope-widening that interrupts the operator's other work.

**Process implication for the matching incident specifically:** the pre-existing March 2 syntax error means matching has been broken in production for ~2 months. Every other app from that same commit (`67d28e2d`) should be parse-checked too — the same code change that introduced this bug to matching may have introduced similar latent bugs elsewhere. Worth a one-shot script that runs `node --check`-equivalent against every `<script>...</script>` block in every `REFERENCE APPS/*.html` to surface any other latent syntax errors before they surface as user-reported breakage.
