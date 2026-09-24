---
name: Per-app bundle-shape investigation methodology — trace, don't infer
description: Investigations that drive template/code construction against an app's bundle data MUST dump the actual extractDeckBundle() runtime return, not infer from source-side data construction sites. Brief A 5A.2 failed 5/5 spot-checks for exactly this reason.
type: feedback
originSessionId: 473bae53-b898-4ea7-a163-7b023122f752
---
When investigating per-app bundle data shape for purposes of writing templates or per-app code that consumes the bundle (sr-only construction, image alt lookup, anything reading `bundle.<field>`), the methodology must be runtime-bundle-trace, not source-grep inference.

**Why:** `extractDeckBundle()` reshapes data between the canvas's `problemsData` and the returned bundle. The fields in `problemsData.push({minuend, subtrahend, ...})` at one source-grep site don't necessarily appear unchanged on the bundle. Brief A 5A.2 produced a 19-app enumeration via grep-and-infer; 5 of 5 spot-checked apps failed because templates referenced fields the actual bundle doesn't expose.

**How to apply:**

1. For each app under investigation, generate a real deck (default settings or whatever exercises the relevant code path).
2. Extract the actual bundle from the resulting deck.html — every deck embeds `<script>var DECK_BUNDLE = {...};</script>`, which is the canonical runtime output of `extractDeckBundle()`. Parse that JSON to see the real field names and shapes.
3. Write the per-app code AGAINST that bundle shape. If a template needs `{minuend}`, confirm the bundle's per-row item actually has a `minuend` field — not just that some upstream `problemsData.push(...)` mentions one.
4. Self-check before submitting: enumerate every placeholder in every template, then confirm each placeholder maps to a field that appears in the dumped bundle. If a template references a field the bundle doesn't expose, that's a contradiction — change the template OR extend `extractDeckBundle()` to expose the field. Never code against a fictional shape.

**Originating incident:** Brief A 5A.2 redo (Path C). Investigation produced templates that:
- subtraction: referenced `{minuend}` / `{subtrahend}` — bundle reshapes those out
- math-worksheet: referenced `puzzle.equations` — bundle exposes only `slots`-flat; my own investigation note literally flagged this and the code was written anyway
- prepositions: only handled image-choice mode; fill-in mode's bundle shape wasn't checked
- missing-pieces: `{pieceShape}` exists but is an English internal slug, not a localized noun
- chart-count: `target.canonicalKey` is null in actual decks; fallback used singular instead of plural

The 5/5 failure rate is the signal: source-side grep is a STARTING POINT for understanding, not a substitute for runtime verification. The 5A.2 gate exists to catch these before locking templates in across the catalog.

**Don't:**
- Don't grep `problemsData.push({...})` and assume those fields propagate.
- Don't write code that references bundle fields without verifying they appear in a real bundle dump.
- Don't ship templates without enumerating placeholders and confirming each maps to a real bundle field.
- Don't claim HIGH confidence on bundle-shape understanding without a runtime trace. Confidence levels should reflect whether a bundle was actually dumped and inspected.
