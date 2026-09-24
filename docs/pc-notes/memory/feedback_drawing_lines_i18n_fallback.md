---
name: feedback-drawing-lines-i18n-fallback
description: "A missing i18n key can break the SOURCE locale too — check both directions; and derive translations from each locale's own siblings rather than authoring fresh"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 313a2cf0-7f2c-4532-b870-a2a9a02c39a0
  modified: 2026-07-30T01:42:46.042Z
---

`drawing-lines` shipped raw camelCase identifiers as visible UI text — **including in English**.
Fixed 2026-07-30 (`ecd7bc69`, live + verified in all 11 locales).

Three compounding defects, and the ordering of the diagnosis is the lesson:

1. **The gap ran BOTH ways.** 8 keys were missing from all 10 non-EN blocks, which is what I
   originally reported. But `generatingWorksheet` was missing from **`en`** while present in all 10
   others — and *that* was the key the app actually calls, in a `duration:0` persistent banner. So
   English was the most broken locale. I had reported the opposite.
2. **Object-level vs per-key fallback.** Its `t()` resolved the locale TABLE first
   (`translations[loc] || translations.en`) then looked the key up in that table alone, so a missing
   key returned the raw identifier instead of degrading to English. It was the **only** app of 33
   doing this — the other 32 all do `table[key] || en[key] || key`.
3. **Cyrillic homoglyphs** (U+043E `о`, U+043D `н`) inside the fi string `tehtävämонistetta`.

**Why:** an `|| 'English default'` guard next to a `t()` call is a false comfort — it never fires,
because the raw key returned by a missing lookup is *truthy*. And a key-count audit
("175/182 in every non-EN locale") hides a source-locale gap entirely, because en is the yardstick.

**How to apply:**
- When auditing i18n parity, diff **both directions**: keys in en missing from locale X *and* keys
  in X missing from en. A key the code calls but en lacks breaks the default locale.
- Check the fallback SHAPE, not just the data. Per-key (`table[key] || en[key] || key`) makes any
  future gap degrade to English instead of leaking an identifier. Fix the shape even after
  backfilling the data — it is the permanent fix.
- **Derive, don't author.** 6 of 8 values came from each locale's own already-translated siblings
  (byte-identical twins, or `overlayAdded` "{type} …" filled with that locale's noun). Only one key
  needed fresh wording. Derivation preserves native register and avoids machine translation.
- Two traps when deriving: **gender agreement** — fr `Bordure` and pt `Moldura` are feminine, so
  "ajoutée"/"adicionada", while es `Borde` / it `Bordo` are masculine (see
  [[feedback-activity-i18n-fanout-gender-anchor]]); and **inflection** — build fi's PDF string from
  its *own* `preparingPdf` ("PDF:ää", partitive), never a naive JPEG→PDF swap.
- Sanitize derived values: `creatingWorksheet` was derived from the Cyrillic-contaminated key and
  silently inherited the corruption until the derivation itself stripped it.
- **Verify rendered, and prove the check fails on the unchanged state.** The chrome is applied
  client-side, so curl sees English either way. The puppeteer probe reported 13 raw-key leaks
  against the pre-fix table and 0 after — see [[feedback-verify-rendered-not-source]].

Deploy note: this app has **no** `Interactive-HTML export v<N>` marker (PDF-only, outside the
canonical 29), so §14.6 step 3's verification grep does not apply — use another sentinel.
`update-worksheet.sh`'s relative target **must include the subdirectory**
(`js/translations-drawing-lines.js`); passing the bare filename silently writes a stray copy to the
top level, which is then immutable and needs `chattr -i` (operator-approval-gated, §A.3) to remove.
