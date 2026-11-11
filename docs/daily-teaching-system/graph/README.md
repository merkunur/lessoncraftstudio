# The content graph (Daily Teaching System, Part 1)

One registry that answers, for any teaching point and any of the 11 languages: which printable worksheet types teach it, which of them have published pages there (per level), which have an on-screen version, which form a Level Set, which maker makes more, which classroom tool models it, and which activity practises it (live, or planned with its number). Units, sub packs, tests and curriculum pages (Parts 4 to 7) are views of these facts; none of them keeps its own list.

Master plan: `../PLAN.md` (Part 1). What the reviewers said about the points themselves: `REVIEW-NOTES.md`. What each language has: `COVERAGE.md`.

## Files

| File | What | Made by |
|---|---|---|
| `frontend/content/teaching-graph/points.json` | The 306 teaching points: id, grade, subject, strand, skill, code, teaching order, prerequisites, worksheet types | **generated** by `build-points.js` |
| `…/strand-map.json` | Every free-text strand of the source → one strand key of `strand-names.ts` (the national domain names ×11) and one of eight subjects | hand |
| `…/extra-points.json` | Three points the source does not hold (story writing, two-step word problems, secret codes) | hand |
| `…/type-additions.json` | 193 worksheet types made after the source was written → their point (60 by family, 133 by hand) | hand |
| `…/order.json` | The teaching order of math, literacy and thinking skills, grade by grade | authored by two teacher-reviewers |
| `…/prerequisites.json` | What a child must be able to do first (nearest real dependencies, at most three) | authored by two teacher-reviewers |
| `…/tools.json` | Each of the 61 classroom tools → the points it models | hand, audited by one reviewer |
| `…/assets/<loc>.json` ×11 | What really exists per worksheet type, tool and activity in that language | **generated** by `build-assets.js` |
| `scripts/teaching-graph/pull-decks.sh` | Fetches the published catalogue as one table (read-only on the server; it also looks into each page for a Check button) → `out/teaching-graph/decks.tsv` | — |
| `scripts/teaching-graph/gates.js` | The gates, and `--poison` | — |
| `scripts/teaching-graph/report.js` | `COVERAGE.md` and the full per-language lists in `out/teaching-graph/` | — |

The source of the points is `docs/activities-rebuild/coverage/coverage-map.json` (the activities programme's map: every worksheet type under one teaching point). The graph reads it and never edits it.

## When something changes

| What changed | Do |
|---|---|
| A new worksheet type exists | Add it to `type-additions.json` (or it joins by its row in the coverage map), then `node scripts/teaching-graph/build-points.js --strict` |
| Decks were published or republished | `bash scripts/teaching-graph/pull-decks.sh` (30 to 45 minutes), `node scripts/teaching-graph/build-assets.js`, `node scripts/teaching-graph/report.js` |
| A tool was added or retired | Edit `tools.json` |
| A maker was rebuilt, a landing added, an activity gained a language | `node scripts/teaching-graph/build-assets.js` (no pull needed), then the report |
| Always, before committing | `node scripts/teaching-graph/gates.js` and `node scripts/teaching-graph/gates.js --poison` |

`build-assets.js --check` (PC only: it needs `decks.tsv`) proves the committed index is the build of the current table. The gates themselves read committed files only, so they also run on the server (`deploy.sh`, as a warning for now).

## What the graph does not hold (yet)

- **The 29 retired apps' decks.** Their pages carry no type code; the index counts them per family under `apps` and no teaching point names them. The makers replaced the apps.
- **Readers and test items.** They do not exist yet (Parts 7 and 8); they join as two more asset kinds.
- **National grade placement and official objectives.** That is Part 2 (`frontend/content/curricula/<loc>/`): a point's grade here is where its worksheets sit, which follows the US sequence.
- **Prerequisites across subjects** (a maze that needs the alphabet). Prerequisites stay inside a subject.
- **Science, social studies, health, arts, SEL order.** Those subjects keep a mechanical order (grade, then worksheet id) and carry no prerequisites: their topics do not build on one another in a fixed sequence.
