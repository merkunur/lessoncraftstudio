---
name: publish-wave-audit-sample-all
description: "§A.14.8 pre-publish-wave audit MUST sample ALL ZIPs per app, not the first one. First-sample-only is invalid; theme-emit defects often affect every deck in an app."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c0aed571-3506-405b-be6f-e14f2e8d4886
---

When running the §A.14.8 pre-publish-wave audit step 1 (theme-emit audit), sample **every ZIP per app's theme field**, not the first one. First-sample-only is a defect class: theme-emit bugs affect EVERY deck the app generates, but the gate-passing samples and the failing samples are interspersed across apps, so spot-checking one ZIP per app can give a false "all clean" reading.

**Why:** The recurring §A.14.8 defect class #1 (apps' `buildCatalogManifestSettings()` reading the wrong picker, hardcoding `theme: null`, or reading an undefined JS-scope variable) produces 100% NULL theme in the affected app's wave. Sampling the first ZIP either catches that app (all NULL → flag), or misses an entirely different defective app whose first ZIP happens to be one of the rare themeless legitimate cases. The canonical 1-ZIP-per-app audit-shape from earlier CLAUDE.md drafts is structurally insufficient when the operator generates per-deck thematic variation.

**How to apply:** at audit time, run a comprehensive scan that produces a frequency table per app:
```bash
for d in <app-dirs>; do
  for f in "$d"/*.zip; do
    unzip -p "$f" manifest.json | jq -r '.theme // "NULL"'
  done | sort | uniq -c | sort -rn
done
```
Any app showing **100% NULL across N>1 ZIPs** is a Shape A defect (per §A.13.5) unless the app is canonically themeless (cryptogram, etc.). Distinguishes from operator-themeless-by-design: ask "did the operator say they selected themes per deck?" — if yes, NULL is a defect; if no (themeless app per design), NULL is clean.

**Empirical anchor (2026-05-14):** Spanish wave of 1,264 ZIPs across 14 apps. First-ZIP-per-app audit reported only cryptogram as themeless. Comprehensive audit revealed 5 apps shipped 100% NULL theme across 628 total ZIPs (matching=94, big-small=141, pattern-train=245, pattern-worksheet=50, prepositions=98) — each from a distinct authoring-side defect at `buildCatalogManifestSettings()`. Operator's response: explicit redress as MEMORY discipline.

Operator's framing: "Every fucking time when you publish decks the same shit!" The recurrence pattern fits the §A.14.8 doctrine origin note ("surfaced empirically across the 345-en-wave + alphabet-train/prepositions embed-gap commission cycles"). The fix is structural — both source-code Shape A repair per app AND comprehensive-audit discipline going forward.

**Related disciplines:**
- §A.13.5 Shape A canonical authoring pattern (source-side root-cause)
- §A.13.10 Manifest-as-schema-contract (fix at emit-site)
- §15.16 reconciliation gate (publish-cli backstop)
- §15.17 salvage scripts (already-staged-wave recovery)
- §A.14.8 pre-publish-wave audit doctrine (this rule extends step 1)
