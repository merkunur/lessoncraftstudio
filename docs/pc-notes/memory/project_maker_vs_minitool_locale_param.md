---
name: project-maker-vs-minitool-locale-param
description: "The two embeddable families take DIFFERENT locale query params — worksheet-generator apps read ?locale=, mini-tools read ?lang=; using one family's param on the other silently yields English"
metadata: 
  node_type: memory
  type: project
  originSessionId: 313a2cf0-7f2c-4532-b870-a2a9a02c39a0
  modified: 2026-07-30T00:35:48.112Z
---

Two adjacent families of standalone HTML surfaces take **different** locale query params.
Passing the wrong one fails **silently** — no error, no console warning, just an English UI.

- **Worksheet-generator apps** (`REFERENCE APPS/*.html`, 33, served at
  `/worksheet-generators/<app>.html`) read **`?locale=`**:
  `urlParams.get('locale') || urlParams.get('ui') || 'en'`. All 33 read it; **zero** read `lang`.
  `worksheet-generators/js/unified-language-manager.js` also *writes* `?locale=` back on a
  language change, so `?locale=` is the family's own round-trip format.
- **Mini-tools / activities** (`mini tools/*`, served at `/mini-tools/…`) read **`?lang=`**
  (`lcs-shell.js`: `params.get('lang')`). This one is correct for that family and must not be
  "fixed" to `?locale=`.

Fixed 2026-07-30 (`dd503436`): `makerGeneratorUrl` in `frontend/lib/seo/maker-content.ts` had
copied the mini-tool param, so every maker landing's launch CTA opened the generator in English
regardless of page locale. One-token fix; the helper now documents both contracts inline.

**Why:** the two families sit one directory apart and their call sites are adjacent in
`app/[locale]/tools/`, so the params get cross-copied. The failure is invisible to greps that
only check the href exists — `scripts/audit-maker-pages.js`'s launch-link regex stops at
`.html` and passes either shape.

**How to apply:** when wiring any link into a generator app pass `?locale=<loc>`; into a
mini-tool pass `?lang=<loc>`. Send **one** param only — for generators, omitting `&content=`
makes `currentLocale` fall back to `uiLocale`, so chrome *and* image-vocabulary *and* the
downloaded deck's baked `contentLanguage` all follow the page locale (`&content=en` would hand
a French teacher English worksheets for their pupils). Verify by loading the app in a real
browser and asserting DOM text — the chrome is applied client-side by `initializeTranslations()`,
so curl shows English either way. See [[feedback-verify-rendered-not-source]].

Known live gap: `drawing-lines.html` is the only app of 33 with an object-level (not per-key)
English fallback, and 8 toast keys exist only in `en`, so those toasts render raw keys in non-EN.
Needs a §14.6 TWO-STEP deploy; batch with the next `drawing-lines` touch.
