---
name: project-fac-prepositions-grammar-fix
description: "SHIPPED 2026-08-18 — find-and-count + prepositions per-locale grammar engine (lcs-grammar.js); commit 256571ac, static-only deployed + md5-verified; operator close-out flags (a)-(g) inside"
metadata:
  node_type: memory
  type: project
  originSessionId: d5ce597a-8a98-47e5-9103-0794ef014da0
  modified: 2026-08-18T10:46:56.362Z
---

# Find-and-Count + Prepositions grammar fix — ✅ SHIPPED 2026-08-18

**Goal (was goal-locked):** the two apps must NEVER emit grammatically incorrect instructions (FaC) / fill-in exercises (Prepositions) in any of the 11 locales. **DONE.**

## Ship record
- **Commit `256571ac`** `[FIX][APPS]` (6 files: both app HTMLs, `REFERENCE TRANSLATIONS/lcs-grammar.js` NEW, both translations JS, `scripts/lcs-grammar.test.js` NEW; bundleVersions 19.4.0/12.4.0) + **`63d81061`** `[DOCS]` CLAUDE.md **§14.3b** (engine doctrine fold). Both pushed.
- **Deployed STATIC-ONLY** (deploy.sh deliberately NOT run — pt-BR #1–#47 batch mid-batch): scp → `/var/www/lcs-media/scripts/update-worksheet.sh` for find-and-count.html, prepositions.html, js/lcs-grammar.js (new), js/translations-prepositions.js, js/translations-find-and-count-complete.js. **All 5 served copies md5-identical to repo**; served HTMLs carry `19.4.0`/`12.4.0` + `lcs-grammar.js?v=1`. `/opt` catches up at next regular deploy.

## Verification shipped on
- 517-assert unit suite green (`node scripts/lcs-grammar.test.js`), poison-tested both layers.
- Full-matrix harness (11 locales × FaC 13 sets × 4 tasks; 11 × 8 preps × 15 landmarks): ALL STRUCTURAL ASSERTIONS PASSED.
- 11 native panels round-2 clean (all residual fixes applied).
- **Deck wiring test** (NEW): real headless generation via each app's `__sepGenerate` seam → `__lcsWorksheetHost.getHtml()` → loaded the actual deck.html for de/pt/fi × both apps; asserted FaC `targets[].ariaHowMany` ≡ live LCSGrammar recomputation + no-English-leak (bundle AND rendered DOM), prep `slots[].expected` ≡ correct option, 3 distinct frame-valid options. GREEN, and **poison-proven** (POISON=1 injects an English-emitting `howManyQuestion` → EN_LEAK assertions fire).
- Durable copies of the QA tooling: `C:\Users\rkgen\.claude\plans\grammar-fix-artifacts\` (grammar-harness.js, apply-audit-fixes.js, deck-wiring-test.js, dumps/audit-*.md). Approved plans: `hidden-noodling-boot.md` + `structured-stirring-glade.md`.

## Operator close-out flags (surfaced at ship; none acted on)
(a) it vocab `iguana` plural "Iguana"→"iguane"? (Treccani/Zingarelli say iguane; §10.3-locked file). (b) it vocab boiled-egg/egg gender 'f' is uovo-class — engine handles it; vocab semantics note only. (c) shared `translations-shared.js` `runtimeScore` has the same agreement issue in the OTHER 27 apps (fr/it/pt) — separate commission. (d) more-less + chart-count share the vocab-insertion class — out of this commission's scope. (e) published decks with old broken sentences are immutable — §15.17 salvage commission if wanted. (f) product-naming suggestions declined: fr "Cherche et trouve", da "Jeg ser noget, du ikke ser". (g) 'in' + solid custom landmark ("in the cat") is operator content, grammatical.

## Doctrine (folded to CLAUDE.md §14.3b)
Indefinite-article frames eliminate contraction/definite-suffix morphology (de dative weak nouns + de adjective phrases curated + refuse-guarded); vocab non-noun tell = entry.de gender missing; fi `pt:true` doubles as cross-locale plurale-tantum proxy; the 2 apps' STRINGS_ALL blobs are hand-edit-only (`inline-all-locales-strings.js` skips baked apps); unresolvable input REFUSES to per-locale static fallbacks — naive suffixers unreachable in non-en paths.
