# nt5-F (b6) — 5 new printable worksheet types × (base + 5 variations) × 11 locales = 330

## Context
Operator /goal 2026-09-23: after analysing the existing catalogue (135 exercise-type keys, 718 type files), design and build 5 NEW K-3 printable types, each with a base page + 5 pedagogically distinct variations (6 faces × 5 types × 11 locales = 330 worksheets), rebuilt natively in every language, top quality in pedagogy/design/child-friendliness, SEO good enough for ≥400 clicks/day at maturity, and — the standing OBS — every type in the `/worksheets` sidebar must list ALL its worksheets when clicked. No SEO data is to be asked from the operator.

This is the 6th batch; the b5 (nt10-E) pipeline shipped 624 worksheets the same day and is the proven spine. The plan clones it as `b6`, adding only what b5 taught (three landing-audit passes, the bN-publish chrome step, the string-parity gate).

## Gap analysis already measured (what the catalogue has vs lacks)
Covered (do NOT re-propose): 2D shapes, 3D solids (geometry G2-242/243/244), skip counting (G1-123..126, G2-207/208), food groups/healthy food (K-203, G1-207), transportation (K-210), community helper tools (K-213), life cycles, plants, weather, human body, senses, maps, money, time, calendar, feelings, all phonics families.
Backlog from b5: colours (SPARE — dies on b/w printers), materials (SPARE — thin demand), homophones (OUT — above K-3 in 5 locales).
**THE FIVE — LOCKED BY THE OPERATOR 2026-09-23:** `cursive-writing` · `story-sequencing` · `healthy-habits` · `habitats` · `sink-or-float`. Boundaries the design must hold: healthy-habits = hygiene / sleep / exercise / routines, NOT food (K-203, G1-207 own food); habitats ≠ animal-fact-file (G2-318) / science-sort; story-sequencing = narrative picture order + retell, NOT science-sequence / life cycles; cursive = each locale's own school script (fi/sv refusal or re-target decided by the native panel, recorded); sink-or-float = predict→test→record inquiry, not a sort-only page.

Original candidate pool (history; not re-litigated):
1. `cursive-writing` — joined handwriting in each locale's OWN school script (OFL Playwrite school fonts: DE Grundschrift/LA/VA, FR Moderne, ES/MX, IT Moderna, PT/BR, NL, NO, DK, US; fi/sv likely refused or print-only). Biggest Romance/Germanic demand gap.
2. `story-sequencing` — order 3-6 picture panels + retell (reading comprehension, not science).
3. `habitats` — animal homes / where animals live.
4. `sink-or-float` — predict / test / record which everyday objects float (K-1 science inquiry: prediction column vs result column; object pictures from the library). Replaces the rejected `coding` candidate (operator 2026-09-23: "find something else instead of coding").
5. `3d-shapes` as its own family (compound head; geometry only has faces).
6. `healthy-habits` — hygiene / daily routines.
7. `number-sense` — before/after/between, number neighbours (verify vs number-charts first).
8. `insects-minibeasts`, `vowels` (es/pt/it "vocales" demand; verify vs K-230), `place-value` (verify vs base-ten).

## Phases (each gated; SoT = `docs/worksheet-gen/b6-designs/README.md`, memory `project_nt5f_worksheet_types.md`)

**A. Keyword + boundary research (types fixed, no re-selection).** Seeded 11-locale autocomplete harvest `scripts/seo-research/harvest-candidates.js` for the five (records to `b6-designs/_records/`) + 4 parallel expert panels: pedagogy (11 curricula; teaching point, Boundary vs existing ids, candidate six faces, per-locale refusals, e.g. cursive in fi/sv) and SEO Germanic / Romance(es-MX, pt-BR) / Nordic (genre heads a teacher types, tiers, SERP owners, theme-slug collisions such as `animals`/`habitats`). Output `_PANEL-FINDINGS.md`: per-locale title heads + an honest click model against the ≥400/day target. Faces are weighted toward the highest-demand sub-queries so the batch reaches the target.

**B. Design studio (per type, ≤4 agents in flight).** Clone b5 `_STUDIO-BRIEF.md`/`_SUBSTRATE.md` (refresh the substrate: b5 families become neighbours)/`_ROLE-*`. Per type: pedagogy agent → TWO independent design agents (A, B — creativity) → critic merge → final `<ID>-<key>.md` (7 sections: identity, base, faces 2-6, native rebuild ×11, data+gates, SEO heads ×11, hub contract). Ids via `alloc-b6var-ids.js` (next free K-379+ / G1-398+ / G2-377+ / G3-400+ — confirm by scanning `types/`). README hub-expectation matrix → `export-hub-expectations.js --batch=b6`.

**C. Spine.** `tools/_clone-b6-spine.js` (from `_clone-b5-spine.js`): `lib/b6-common.js`, `templates/components-b6/`, `tools/{register-b6-taxonomy,register-b6-en-content,apply-b6-locale,validate-b6-draft,check-b6-string-parity,gen-b6-waves,gen-b6var-specs,gen-b6-faces-table,b6-probe-child}.js`, `gen-b6-landings.js`, `b6-publish-locale.sh`. `b3-baseline.js --check` 0 drift before/after. Register 5 keys: `apps.<key>` + `axes['exercise-type'].<key>` slug/name (EN now, ×11 at Phase F), strand rows additive in `frontend/lib/seo/strand-names.ts`, taxonomy 135 → 140.

**D. EN bases.** One builder agent per family under `_BUILD-BRIEF.md`: spec + component + any NEW primitive (with a render-measuring verify) + `data/b6/<key>.js` + `qa/verify-b6-<key>.js`. Every picture named is OPENED. Cursive: fonts vendored under `assets/fonts/` (OFL, woff2 subset) + `measure-font-metrics.js` extended, and school-line starters measured, not derived. I read every render at print size.

**E. EN faces.** `b6var-rows/<key>.js` → `gen-b6var-specs` → `gate-variation-distinct --batch=b6` (resolved d2 config must differ) → baseline recapture.

**F. Native panels ×11** (≤4 in flight; the EN is a SOURCE TO AUDIT; panels open pictures and render a sample; es = es-MX, pt = pt-BR). `.draft-b6-<loc>.json` → `validate-b6-draft` → `apply-b6-locale` ONE locale at a time → `lint-locale` → `check-b6-string-parity --all` = 0 (a string lives in draft + bank + `i18n/strings.<loc>.json`).

**G. Generate + critique ×11.** `gen-b6-waves` → clear `out/staging/<wave>` → `cli.js generate` (d2) → desc band 120-170 + title similarity → sweep renders; answer-position/rotation tells measured both directions on the SHIPPED instance at n≥400; two-right-answer + fact-names-its-column + picture-naming classes each gated per locale.

**H. Landings ×11, THREE passes** (b5 lesson: ~400 defects found only by audit-of-render). `b6-landing-brief.md` → audit pass → fix rounds (generator/data, regenerate) → touch-up → `gen-b6-landings.js` → `seo-landing/gate.js` 0 FAIL, 0 duplicate titles/metas ×11. Titles = the genre head a teacher types (from Phase A records), no visible "free".

**I. Publish ×11.** `git status` clean + server taxonomy carries the locale (else English slugs) → `b6-publish-locale.sh` which MUST also run `inject-analytics-beacon` + `inject-deck-site-chrome` (the b3-b5 gap) → `deploy.sh` → `repoint-deck-canonical.js` missing=0 → IndexNow.

**J. Hub (the OBS).** `deploy.sh` gains `verify-hub-type-rows.js --expect=docs/worksheet-gen/b6-designs/hub-expectations.json` (warn until landed, then HARD); render/order verifiers; real-browser click on each of the 5 sidebar entries in en + one Germanic/Romance/Nordic locale showing exactly the expected cards, plus a scripted 11-locale pass badge = rendered cards.

**K. Close-out.** Memory file + MEMORY.md pointer, CLAUDE.md §28 + §14.10 count 135 → 140, commit + push.

## Critical files / reuse
`scripts/worksheet-gen/tools/_clone-b5-spine.js`, `*b5*` tools, `lib/b5-common.js`, `lib/unit-axis.js`, `lib/b3-picture-index.js`, `lib/b3-instructions.js`, `primitives/_tokens.js`, `primitives/font-metrics.json`, `scripts/seo-research/harvest-candidates.js`, `scripts/verify-hub-type-rows.js`, `frontend/config/topics-taxonomy.json`, `frontend/lib/seo/strand-names.ts`, `scripts/publish-cli/{publish-wave,repoint-deck-canonical,inject-deck-site-chrome}.js`, `docs/worksheet-gen/b5-designs/*` (briefs to clone).

## Verification
- Per family: `qa/verify-b6-<key>.js` + render-measuring primitive verifies + poison tests both directions; `gate-variation-distinct`; `b3-baseline --check` 0 drift.
- Per locale: `check-b6-string-parity` 0, `lint-locale`, audit-deck-html N/N clean, landing gate 0 FAIL / 0 dups.
- Live: hub gate HARD PASS on server; repoint missing=0 ×11; IndexNow 200; real-browser sidebar click lists every worksheet of each type.
