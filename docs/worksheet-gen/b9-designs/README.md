# b9 — Picture Tracing (`picture-tracing`)

**Status 2026-10-22: BUILT + PUBLISHED** — base K-418 + 19 faces × 11 locales = 220 PDF decks (no screen, no answer key) and
220 landings at `/<loc>/worksheets/<slug>`; deck slug `<locale family slug>-<id>`; hub gate HARD in `deploy.sh`.

| file | what it is |
|---|---|
| `METHOD-picture-tracing.md` | **the method** — the template for every future tracing expansion (tracer, renderer, composer, faces, native text, gates, reviews, SEO, traps, publish as run, how to expand) |
| `K-418-picture-tracing.md` | the design contract (identity, base, faces 2-20, native plan, data + gates, SEO, hub contract) |
| `_PANEL-FINDINGS.md` | the lock, the 11-locale demand harvest, heads, rail names, trap words, the click model (320 · 600 · 920 /day at 9-15 months) |
| `_STUDIO-BRIEF.md`, `_SUBSTRATE-POOL.md` | the design-studio brief and the measured pool of traceable library drawings |
| `_work/` | the studio's pedagogy and two design proposals, and `panel-brief.md` (the native panel brief, kept current with every fix) |
| `_records/` | harvest seeds and results, id allocation, `panel.<loc>.json` + `landings.<loc>.json` per locale (the native panels' output) |
| `hub-expectations.json` | 20 rows per locale for `verify-hub-type-rows.js` |

Code: `scripts/worksheet-gen/lib/pt-*.js`, `data/b9/`, `data/pt/`, `types/k/K-418…K-432`, `types/g1/G1-429…G1-433`,
`qa/verify-b9-*.js`, `tools/*b9*`, `scripts/seo-landing/gen-b9-landings.js`, `scripts/publish-cli/b9-{publish,republish}-locale.sh`.
