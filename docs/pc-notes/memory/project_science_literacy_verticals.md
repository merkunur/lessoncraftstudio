---
name: project-science-literacy-verticals
description: Two new K-2 worksheet verticals (Science design-once = DONE+LIVE; Literacy native-per-language = NEXT). Resume point for vertical 2.
metadata: 
  node_type: memory
  type: project
  originSessionId: 4e4da4ca-ae33-404f-bb03-07db98fe660b
---

Commission (Fable 5, 2026-06-13): two new K-2 printable worksheet verticals on the worksheet-gen pipeline. **BOTH COMPLETE + LIVE: ≥5 variants/type + native-speaker-reviewed (NSR-flag CLEARED).**

## 🏁 NSR COMPLETE — all 10 non-EN reviewed by native linguists (2026-06-14, source 8333a4f9 / tracker 7762d82c)
The §17.5.1 NSR-flag is CLEARED for both verticals. 10 expert native-linguist agents (one per locale, via the Agent tool) reviewed both verticals' authored text (titles/instructions/skill-sentences/family names+slugs/science bin labels/category+vc labels) from per-locale bundles (`i18n/build-nsr-bundle.js` → `.nsr-<loc>-bundle.json`); each returned a corrections JSON; `i18n/apply-nsr-corrections.js` merged + computed the affected (type,locale) set. **52 corrections; es/fr clean.** Biggest find: **no science display strings had æ/ø/å ASCII-stripped** (hoerer/gronnsaker…) — restored. **257 decks republished** (256 in-place UPDATE via publish-bulk `--updates-manifest` [zipBasename→existing-slug, slug-stable] + 1 INSERT for the lone slug fix no rekkefolge→rekkefoelge; old slug unpublished) + OG + hreflang + deploy. 0 fail. Verified live. **Key mechanic:** titles/instructions/bin-labels are baked into the worksheet JPEG → text fixes require REGENERATE (not HTML-rewrite); the variant_id `gXXX` deck-id uses no-hyphen (G1-203→g1203). NSR review files `.nsr-*` out-of-tree.

## 🏁 ≥5 VARIANTS PER TYPE — LIVE (2026-06-14, commits 2527ba74 + f04e5189)
Operator req: a K-3 library needs ≥5 worksheets per kind. Delivered 5 distinct variant sheets per TYPE per locale via the variant axis (`variantsPerType:5` in the wave → reseeded RNG per variant → distinct selection; `variant_id` -2..-5 → unique slug + "Set N" title; deck slug = FAMILY-slug + variant_id, e.g. beginning-sounds-k221-2). Live v1 kept; **+1,540 v2-5 published** (lit 660 + sci 880; batch-20260614004125, 0 fail) + OG (1540) + hreflang (1540 DB / 7630 rewrites). DB-verified every type =5. **How:** raised `tools/gen-lit-fan.js` caps (literacy pools 24-32, incl EN + neutral category 6/bin); expanded `data/science/*.json` so each sort bin ≥6 + helper-tool→12 (cache-verified curation). **Honest caps:** chicken-life-cycle EXCLUDED (fixed 3-stage sequence, stays 1); baby-animals=6 pairs (only 5 baby-animal images library-wide). Distinctness rule: pool ≥ ~2× per-sheet count. SEO desc-band edge: "Set N" suffix (~14 chars) tightens the band → a few short-instruction locales needed instruction-length tuning (pt K-229 shortened, da/no earlier). No deploy needed.

## 🏁 LITERACY VERTICAL CLOSED (2026-06-14) — 165 decks live (15 types × 11 locales)
Published batch-20260613233535 (165 INSERT, 0 fail). Commits b1ecf1b6 / 60156407 / d5d762aa / 54158810 / 55fb483c / e7311405(tracker) — pushed. 5 cores untouched. **5 family-key topic hubs** live per locale (beginning-sounds, letter-knowledge, word-building, picture-vocabulary, phonological-awareness). Verified live: localized title/level, single h1, 12 hreflang, og:image, native slugs. Native-per-language (words from each gated approved-words-<locale> pool via tools/gen-lit-fan.js; i18n via 10 native ensembles → i18n/apply-lit-loc.js surgical merge). **NSR-FLAG sv/da/no/fi** (native review pending). Engine: 4 lit factories + lit-sort + reuse science-category-sort/pair-match. Scoped publish (publish-bulk → og --slugs-file → hreflang all-11 → deploy.sh). Honest drop: opposites (asset-thin). Residual it/fi obscure-short word-picks = future native-polish item. Full record: docs/science-literacy-build-tracker.md "🏁 LITERACY VERTICAL CLOSED".


## LITERACY PROGRESS (session 2026-06-13/14) — EN foundation proven, NOT yet published
Commits (local on `pivot/printable-business-toolkit`, NOT pushed): `b1ecf1b6` EN pool · `60156407` 4 factories · `d5d762aa` EN pipeline · `5f105604` tracker. 5 protected cores untouched throughout.
- **EN phonics pool DONE**: `rule-syllabifiers/en.js` (careful English COUNTER) + `en` = **GREEN** in `gate.js` (operator-ratified, reversed the plan's STRICT premise — TeX en-us is typographic, disagrees 32%+; no literacy printable renders a syllable SPLIT, only counts/words/graphemes → GREEN safe, count R+S cross-validated). `approved-words-en.json` = **910/353**. All E7 CVC pass; vocab-phonics count-defects (table/candle/lion…) correctly quarantine. Snapshots `.before-gue-que-fix` out-of-tree (§A.13.44).
- **4 factories DONE (Gate-2 APPROVED)**: `lit-sound-match` · `lit-letter-knowledge` · `lit-word-build` · `lit-vocab-match` in `scripts/worksheet-gen/types/_shared/`. 5 text-tile render shapes. `qa/lints.js` +`[data-lit-content]` marker. Gallery `out/exemplars/literacy-gallery.html` (operator must OPEN the file — Read-tool PNGs don't show in their terminal).
- **EN pipeline PROVEN**: 4 family keys in `topics-taxonomy.json` (EN slug/name, `default_subject:"letters"`); 5 specs **K-221..K-225**; `skill-sentences.en.json` +4; `wave-lit-en.json` → 5 ZIPs 0 fail. 5 distinct titles, descs 120-170 band, cannibalization gate PASS (max 0.000 vs matching/alphabet-train/word-scramble/word-guess).
- **EN CATALOG COMPLETE** (commit `54158810` + tracker `51de987b`): 15 EN types across 5 family keys (operator directive: EN-complete before any fan). 3 new factory modes (find-letter-grid, vowel-consonant, build-the-word; Gate-2 round-2 approved). New family key **phonological-awareness** ("Sounds & Syllables"). K-228/K-234/K-235 reuse science-category-sort; K-232 reuses science-pair-match (0 new render code). **opposites HONEST-DROPPED** (asset-thin: day/night/big/small not single-noun-imageable, turtle off-pool). 15 ZIPs 0 fail, unique titles, descs 120-170, cannibalization gate ALL PASS (worst 0.047). Full type list + drops in tracker "EN CATALOG COMPLETE". Gallery `out/exemplars/en-catalog/gallery.html`.
- **NEXT (Phase 4 — native 11-locale fan, DEFERRED per operator until EN done; EN now done)**: per-(type,locale) words from each gated `approved-words-<locale>.json` pool; **letter-knowledge fans from the alphabet alone** (alphabets + vowels already authored all 11); reuse-science sorts need per-locale bin labels (letters/numbers locale-neutral; category words + Vowels/Consonants labels need translation); taxonomy non-EN slug/name (5 family keys ×10) + skill-sentences ×10 via 3-agent ensembles §A.13.48 → scoped publish (publish-bulk → og --slugs-file --locales=all11 → hreflang all-11 → deploy.sh hubs; difficulty [2]). **No push/publish yet** (commits local on `pivot/printable-business-toolkit`). Resume: tracker `docs/science-literacy-build-tracker.md` + plan `~/.claude/plans/continue-the-two-new-worksheet-verticals-floofy-glacier.md`.

**SoT for resuming:** the build tracker `docs/science-literacy-build-tracker.md` (has a `▶▶ LITERACY — START HERE ◀◀` section = complete starting brief) + the plan file `~/.claude/plans/two-new-worksheet-verticals-polymorphic-axolotl.md`.

## SCIENCE — DONE (231 decks live in production)
21 K-2 types × 11 locales published (commits `fbfec84e` + `dc5b03ed`, pushed; deploy.sh rebuilt, smoke passed). 3 new additive factories (`science-category-sort`/`science-sequence`/`science-pair-match` in `scripts/worksheet-gen/types/_shared/`), 5 protected cores untouched. Topic hubs `/topic/{science-sort,science-sequence,science-match}` render per locale. Honest buildable count = 21 (asset-blocked types dropped, logged). Native-ensemble localized; sv/da/no/fi NSR-flagged. The **science build IS the literacy blueprint** — same 9-step pattern.

## LITERACY — NEXT (Gate-1 rulings LOCKED, do not re-ask)
- printable worksheet-gen decks (not interactive activities).
- dedupe = **distinct-query-face, build most** (overlapping apps have no landing pages); gate each overlap with `scripts/seo-landing/gate.js`.
- **full EN + commission an EN phonics pool** (`rule-syllabifiers/en.js` + `approved-words-en.json` via `scripts/v2-data/verify-syllable-boundaries/`; 10 non-EN pools already live).
- 4 factories: `lit-sound-match`/`lit-letter-knowledge`/`lit-word-build`/`lit-vocab-match`. Native per locale from each pool; framework classifier (picture-answer→readiness / grapheme-answer→CARRIES). Per-type hardest-locale exemplar = Gate 2 → native ×11.

## Key science learnings (apply to literacy)
- Type ids MUST be grade-prefixed (K/G1/G2) — `emit/manifest.js ageRangeForSpec` (protected core) derives age from id prefix. Use a free 200-block.
- Family keys MUST be registered in `topics-taxonomy.json axes['exercise-type']` (+`apps.*`) or `deck-html.js` throws; round-trip-safe edit.
- Themeless decks need per-family **skill-sentences ×11** or terse locales (es/it/de/fi) fall under the 120-char SEO desc floor.
- Curated `data/` is gitignored → `git add -f`.
- Publish scoped (avoid §50-min catalog-wide OG): `publish-bulk --confirm` → `regenerate-og-images --slugs-file --locales=<all11>` (defaults en,es,pt without --locales!) → `populate-and-inject-hreflang --confirm --locales=<all11>` → deploy.sh for topic hubs. difficulty [2] only (TITLE_NON_UNIQUE).
- Transient post-publish 308 = Cloudflare caching origin-308s during atomic rewrites; self-heals via 300s TTL.

Cross-refs: [[feedback-content-publishing-seo-standard]], [[feedback-11-locale-recreation-discipline]], [[project-phonics-safety-pipeline]].
