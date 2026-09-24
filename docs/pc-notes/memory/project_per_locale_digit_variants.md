---
name: project-per-locale-digit-variants
description: "Digit 1 is hard-coded Continental for all 11 locales, and two numeral tables disagree about the barred 7 — open work, deliberately not done"
metadata: 
  node_type: memory
  type: project
  originSessionId: e0ba3f07-cce6-4842-980a-8c89e3573187
  modified: 2026-08-07T09:29:23.592Z
---

Opened by the Finnish native panel during the Letter Studio rebuild (2026-08-07). **The
barred 7 is fixed** (`number-trace-core.js barFor` is now three named locale sets with a
coverage assertion, after `lang !== 'en'` gave Finland a bar it does not teach — and,
because the bar is a separate stroke, told Finnish children the seven is a two-stroke
figure via `_buildPips`). Three related things are **known, verified, and NOT done**:

1. **`'1'` is hard-coded Continental for all eleven locales.** `number-trace-core.js`
   draws a ~21-unit diagonal entry flag on a 68-unit body. Correct for fi/de/fr; **wrong
   for `en`**, where US manuscript teaches a bare vertical. So the table currently hands
   English a *correct* unbarred 7 and an *incorrect* flagged 1 — the very pair whose
   confusability the crossbar exists to resolve.

2. **⚠ TWO NUMERAL TABLES DISAGREE.** `mini tools/numeral-trace-core.js` (consumed by
   `mamas-roll-call-activity.js`) has its own digits, its `glyphFor(n)` **takes no `lang`**,
   and its 7 is unbarred everywhere. Verified: in German, Letter Studio draws a **2-stroke
   barred** 7 and Mama's Roll Call draws a **1-stroke unbarred** one. That file's own
   header already says *"Per-locale variants (1/4/7/9) are a fast-follow."*

3. **`4` (open top) and `9` (straight leg)** are further candidates. Correct for `fi`;
   nobody has ruled them elsewhere.

**The right shape** is a per-digit variant table, not a second special case beside the
seven — and the locale sets must be NAMED, with a locale absent from all of them a build
failure, so the next locale added cannot inherit a decision nobody made. That pattern is
already implemented for the 7 in `number-trace-core.js`; copy it.

**Standing rule this came from:** a negation (`lang !== 'en'`) is not a ruling. It is one
decision about English and ten assumptions about everybody else. Finland is the standing
counter-example — it writes the flagged 1 *and* an unbarred 7, so the typographic argument
that explains where the bar came from cannot predict what a country settled on. Ask the
locale; never extrapolate across a cluster. See
[[feedback_native_panels_read_the_model]].
