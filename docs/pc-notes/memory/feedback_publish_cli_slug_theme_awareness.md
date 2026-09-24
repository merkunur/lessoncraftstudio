---
name: publish-cli theme-aware slug derivation
description: Slug-derivation rules that drop manifest fields propagate SEO degradation across catalog growth waves
type: feedback
originSessionId: a45fbf5d-0d63-43e6-861f-adc433942f40
---
When publish-cli derives slugs from manifest fields, omitting any axis-key signal that visitor-facing surfaces depend on produces SEO-degraded URLs at wave-scale. The 443-deck en addition+subtraction Track C wave (2026-05-05) surfaced this when Phase 2 dry-run revealed slugs collapsed to 8 unique patterns across 443 ZIPs because slug-derivation read only `exercise_type + exercise_mode` and dropped `manifest.theme` entirely.

**Why:** auto-suffix collision-resolver does work (`addition-find-addend`, `addition-find-addend-2`, ..., `-50+`) but burying theme distinction behind numeric tails:
1. Fragments Google ranking signal across near-identical slug patterns
2. Surfaces zero theme signal in search-result snippet leading segment
3. Reads as broken/duplicate to teachers copy-pasting deck links

**How to apply:**
- Phase 1 inventory of any catalog-growth wave should include slug-pattern preview check via dry-run; surface if surfaced patterns don't include all axis-key signals visitor-facing surfaces depend on
- Slug-shape canonical for theme-bearing decks: `<exercise-type>-<exercise-mode>-<theme>` (operation+mechanic+content; identity-claim grammar; aligns with Google snippet leading-segment prominence + teacher operation-first search grammar)
- Distinct from intersection-URL axis-ordering (theme→level→type per 6c canonical, navigation-context grammar) — different surfaces have different reading grammars
- Themeless decks (theme=null per pattern-worksheet remediation precedent) preserve `<exercise-type>-<exercise-mode>` shape — `if (manifest.theme)` guard handles the null branch

**Within-batch collision-pair inspection-before-confirm pattern:** when publish-bulk dry-run surfaces within-batch slug collisions on operator-authored deck waves, default to surfacing inspection report before --confirm rather than auto-suffix-and-proceed. Author-intent reconstruction from manifest + asset metadata costs one CC turn; reversal of accidentally-shipped duplicates costs §15.5 edit-in-place commission later. Tiebreak rule when operator can't distinguish content quality: drop later-generated ZIP per pair (earlier-roll-wins); operator can override.

Originating commits:
- `785d63f6` — [FEATURE][PUBLISH-CLI] Theme-aware slug derivation single SoT (slug.js: deriveSeedFromManifest; refactored bulk.js + publish.js + index.js call sites)
- `cc4120ce` — [CHORE][REPO] decks/ gitignore
- Production change: 440-deck publish-bulk wave (no git commit; DB + filesystem)
