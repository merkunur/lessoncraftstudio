---
name: feedback_a_named_token_check_only_finds_what_you_thought_of
description: "When a pipeline stage is skipped on a new path, audit ALL its outputs generically — a check that names tokens one by one only ever finds the ones someone already imagined"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fd3abd5a-1a0f-4a51-951f-005820734717
  modified: 2026-08-03T08:39:00.871Z
---

**When a new code path bypasses a pipeline stage, the defect is never just the one
symptom that got reported.** Audit the stage's ENTIRE output surface with a generic
pattern, then count.

**Empirical (2026-08-03).** The operator reported: "the Share/Embed panel on saved
worksheets bakes a literal `__CANONICAL_URL__`." True — and 5 of **35** leaks across
**14** tokens, all from one cause: `scripts/publish-cli/substitute.js` resolves ~14
placeholder tokens, the catalog path runs it, and the Save-Interactive-Worksheet path
never did. The unreported ones were *worse* than the reported one:

- `<title>… — __EDUCATIONAL_LEVEL_LOCALIZED__ | …>` — visible in the **browser tab**
- `<img alt="__WORKSHEET_MAIN_ALT__">`, `aria-label="__APP_ARIA_LABEL__"` — announced
  verbatim by **screen readers** to a K-3 child
- the whole `og:` block — every pasted link **unfurled broken**

I found them only because I grepped the live artifact for `__[A-Z_]{3,}__` and counted,
instead of looking for the token I was told about.

⭐ **`scripts/publish-cli/audit-deck-html.js` checks exactly TWO tokens by name**
(`__APP_ARIA_LABEL__`, `__WORKSHEET_MAIN_ALT__`) and has no generic residue scan. That is
precisely why the other twelve were invisible for as long as the feature has existed. A
named check is a list of things someone once thought of; a pattern check is the class.

**How to apply:**

- Measure the **served artifact**, not the emitter. `curl` it and count. The emitter's
  source tells you what it *intends*; the bytes tell you what shipped. (Here the counts
  even differed by one — Cloudflare's email obfuscation had eaten a `mailto:`.)
- Gate on the **class** (`/__[A-Z][A-Z0-9_]{2,}__/`), not on names, and assert **zero**.
- **Report the widened scope and let the operator rule on it** rather than silently
  fixing more than was asked, or silently fixing only what was asked.
- Where the skipped stage's values are genuinely unknown on the new path (no OG image, no
  grade band), **omit the tag** — do not invent a value to make a scan pass. Honest
  omission beats a fabricated tag.

⚠ **String assertions cannot verify a visual rule.** The share-panel fix hides
`a.lcs-share-platform` while keeping the `<button>` copy-link. "The CSS rule is present"
and "the button is in the markup" both stay true under a selector that hides BOTH —
so the gate had to measure **computed style in a browser**. Poison-tested by dropping
the `a`.

Related: [[feedback_verify_rendered_not_source]] (same family — the artifact is the
truth), [[feedback_deploy_gates_must_be_browser_free]],
[[feedback_a_crashed_gate_masquerades_as_a_failed_gate]].
