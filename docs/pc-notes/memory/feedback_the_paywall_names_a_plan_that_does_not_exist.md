---
name: feedback-the-paywall-names-a-plan-that-does-not-exist
description: "28 mini-tools sell \"Premium\", but the plan is called \"Teacher\" and the word Premium appears zero times in the English message catalogue"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e0ba3f07-cce6-4842-980a-8c89e3573187
  modified: 2026-08-07T09:21:24.821Z
---

**The tools' paywall copy names a plan that does not exist.** Measured 2026-08-07:

- `frontend/messages/en.json` contains **zero** occurrences of `"Premium"`.
- The plan the `unlock` link actually opens is `pricingPage.tier.name`:
  **Teacher · Lehrkraft · Enseignant · Docente · Lärare · Opettaja** (and the rest).
- **28 of the mini-tools** say "Premium" to the teacher, **655 occurrences** in
  `mini tools/*.js` — including `name-sticks`, which is where Letter Studio's `noClass`
  string sends a teacher who has no class list. So a free teacher meets two different
  names for one plan within two clicks.
- The French catalogue additionally carries `dashboard.tierNames.full: "Premium"`
  (`frontend/messages/fr.json:644`) in a namespace that **does not exist in `en.json` at all**.

**Why it matters:** it is the same defect class as a paywall that oversells or undersells
a feature — the copy and the model disagree, and the teacher is the one who finds out.
Clicking "See Premium" and landing on a page offering "Teacher" reads as a broken or
out-of-date product at exactly the moment you are asking for money.

**How it surfaced:** all ten native language panels found it independently while writing
Letter Studio's strings — they read the pricing catalogue rather than translating my
English. See [[feedback_native_panels_read_the_model]] and
[[feedback_the_english_source_is_the_locale_nobody_reads]]; this is that pattern again.

**Status:** fixed in `letter-studio` only (its gate line now names the Teacher plan in all
11 locales). The other 27 tools are **untouched and unbudgeted** — a suite-wide copy sweep
is the operator's call, not a quiet scope expansion off a single-tool commission.

**How to apply:** before writing any paywall sentence in any tool, read
`pricingPage.tier.name` for that locale and use it. Never invent a plan name, and never
carry one forward from a sibling tool without checking it against the catalogue.
