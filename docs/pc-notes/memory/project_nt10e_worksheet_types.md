---
name: project-nt10e-worksheet-types
description: "nt10-E (b5) BUILT + LIVE 2026-09-23 — 10 new printable types × 6 faces × 11 locales: 624 decks + 624 landings, repointed, IndexNow 624/624, hub gate HARD, sidebar click-verified; CLAUDE.md §27 is the SoT"
metadata:
  node_type: memory
  type: project
  originSessionId: aa03a12f-8c62-4058-b405-012ce492a44b
  modified: 2026-09-23T14:38:58.045Z
---

# nt10-E (b5) — BUILT + LIVE 2026-09-23

Operator /goal 2026-09-23 (overrode §26's "last batch"): 10 new K-3 printable types, 5 variations each, native ×11, SEO ≥1,000 clicks/day, and the /worksheets sidebar MUST list every worksheet of the type. **SoT: CLAUDE.md §27** + `docs/worksheet-gen/b5-designs/README.md` (shipped matrix 624/660) + plan `C:\Users\rkgen\.claude\plans\lively-wishing-teacup.md`.

**The ten:** 2d-shapes K-368 · road-safety K-369 · family K-370 · plants G1-376 · animal-life-cycles G1-377 · earth-and-space G1-378 · maps G1-379 · digraphs G1-380 · synonyms G2-358 · word-parts G2-359. Shipped en 60 · de 60 · nl 59 · pt 59 · fr 59 · fi 59 · sv 54 · da 54 · no 54 · es 53 · it 53 = 624. Refusals: digraphs es/it/sv/da/no (whole), digraphs F4 pt + nl, word-parts F1 it, F3 fi, F4 es/fr. Taxonomy 135 keys.

**Live proof:** hub gate HARD in deploy.sh (b5 expectations, PASS on server); repoint missing=0 ×11; IndexNow 624 × HTTP 200; audit N/N clean ×11; real-browser sidebar click (en 2D Shapes → 6; fi Science group → Aurinkokunta → 6) + scripted 11-locale pass: badge = rendered cards for all 105 entries.

**Commits (main ones):** Phase A `42963dc1` · B `776c2204` · C `83556185` · D bases (see git log) · E faces · locales `6a7bab20` `5f4e6685` `f7e4f5cb` · fix round 1 `3928fd07` · native r1 `421123e1` · fix round 2 `1ef05b45` · native r2 `4f6b272c` · landings + hub HARD `6d4a03a4`.

⭐ **The lesson of this batch:** the landing panels, briefed as an AUDIT of the render, found ~400 defects across three passes that no gate saw — position/rotation answer tells, two-right-answer items, facts naming their column, pictures children name differently, instructions naming undrawn apparatus. Each class then became a gate run over every locale. Budget three landing passes (audit → fix rounds → touch-up), not one.
⚠ es = es-MX (SEP/NEM). ⚠ A b5 string lives in draft + bank + strings.<loc>.json: fixers edit drafts only, apply sequentially, `check-b5-string-parity --all` = 0 and `out/draft-drift.js` clean. ⚠ A pooled tell measured at n=40 was noise (63 % → 54 % at n=400): raise n, never the threshold. ⚠ The regen script: the generator writes to `out/staging/<wave>` and SKIPS existing zips — clear staging before regenerating.

**Done at close-out:** K-205 (Animal Babies) — all 55 live decks replaced in place (55 UPDATE, 0 INSERT, audit clean ×11, butterfly now in the grown-up column; logs `scripts/worksheet-gen/out/k205/`). ⚠ The bX-publish-locale.sh scripts (b3/b4/b5) never ran publish-wave's STEP 6b/6c → ~415-423 printable decks per locale had no site chrome; fixed catalogue-wide 2026-09-23 by `inject-deck-site-chrome.js --locale=<each>` (idempotent; beacon was already present, marker `id="lcs-insights"`). **A future bN-publish-locale.sh MUST call inject-analytics-beacon + inject-deck-site-chrome for its slugs.** The --update-slug path also writes a bare deck.html — re-run those steps after any in-place update.
**Open:** Road-sign code numbers are `unsure` in several Nordic/it banks (data only, not printed). Soft residuals recorded in each locale's `.landing-b5-<loc>.json` findings (e.g. G2-371 middle-circle answer 3/6, K-374 "look left again" not drawn, G1-378 header pictures cue two rows).
