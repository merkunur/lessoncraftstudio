---
name: feedback-activities-asset-rules
description: "K-3 activities asset rules — color-only, localized B&W markers per locale, trailing-number stripping. Naive \"BW\" match is WRONG. Use existing localized article+plural data."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: aa585226-31b9-437f-b029-655565fce24e
---

**Rule 1 — Image paths.** Pictures at `/image-library-webp/themes/<theme>/<noun>@2x.webp`.

**Rule 2 — Vocabulary source.** `REFERENCE TRANSLATIONS/image-vocabulary.js` is **authoritative for WHICH word a noun is per locale**. 1,263 noun keys × 11 locales × [singular, plural, gender] (EN + FI have no gender → 2-element arrays; other 9 locales 3-element with gender code m/f/n/d/h/t). Carries **NO phonics data**. NEVER modified.

**Rule 3 — Color-only.** Activities ship color images only. Exclude B&W themes.

**Rule 4 — Localized B&W markers (critical, easily-missed).** B&W themes are identified by a **LOCALIZED end-of-theme-name marker, NOT a literal "BW" or "B&W" suffix**:

| Locale | Marker |
|---|---|
| en | BW |
| de | SW |
| da | SH |
| es | BN |
| fi | MV |
| fr | NB |
| it | BN |
| nl | ZW |
| no | SH |
| pt | PB |
| sv | SV |

**Naive "BW" substring match is WRONG and will leak B&W content into 10 of 11 locales.** Filter MUST be language-aware. Use the locale of the active activity to pick the correct marker, then check end-of-theme-name.

**Rule 5 — Trailing-number stripping.** Ignore trailing numbers on:
- **Filenames** — `cat 2.webp` → resolve as `cat`, label as "cat" (never show "cat 2" or "cat2" to kids)
- **Theme names** — `animals 2` → resolve as `animals`

**Parsing order:**
1. Strip trailing number from filename → resolve vocab key
2. Strip trailing number from theme name → apply B&W filter
3. Handle combined case `animals bw 2` correctly (strip `2` first → `animals bw` → THEN B&W check finds `bw`)

**Rule 6 — Use existing localized article+plural data; don't generate.** image-vocabulary.js carries singular + plural + gender per locale. When an activity needs a label, ARTICLE, or plural form, look it up in image-vocabulary.js. Do NOT generate articles algorithmically (German `der/die/das` is genuinely irregular; Spanish `el/la` follows rules but image-vocabulary.js encodes exceptions; etc.).

**Rule 7 — Phonics activities draw from `approved-words-<locale>.json`.** Per the safety pipeline ([[project-phonics-safety-pipeline]]), word-decoding activities (E7, future E8, future E9) must read their candidate word list ONLY from the gated output of the verification pipeline. Direct reads from image-vocabulary.js for phonics activities bypass the safety gate and are FORBIDDEN.

**Failure modes this prevents:**
- B&W image leaking into a color-only activity in non-EN locale (e.g., `animals bw 2` slipping through naive "BW" filter on a fi activity)
- "cat 2" showing as a label to a K-3 kid
- Wrong-gender article in DE/ES/IT/PT/FR activity ("der Hund" vs "das Hund")
- Phonics word with a wrong syllable break shipping because activity authoring bypassed the safety pipeline

**Origin:** CC-MEMORY-UPDATE-PROMPT.md commission 2026-05-22. Asset rules accreted from operator commission across E1, E2, E7. The localized-B&W-marker rule was operator-confirmed after a naive-match defect was caught in early E2 work.
