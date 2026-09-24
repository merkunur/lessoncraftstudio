---
name: project-nt20b-worksheet-types
description: "nt20-B (2026-09-02) — the SECOND batch of 20 printable worksheet types x 11 locales (220 decks + 220 landings), native-rebuilt; recipe, traps, click math, and the fan-out lever"
metadata: 
  node_type: memory
  type: project
  originSessionId: 4f9fd445-6edc-446d-973b-f428a422baa3
  modified: 2026-09-02T13:32:05.030Z
---

# nt20-B — 20 new printable worksheet types × 11 locales (2026-09-02)

**Status (LIVE 2026-09-02, prod HEAD `b77607db`, deploy EXIT=0):** 220 decks published (audit 220/220 clean, OG 220, hreflang 1162 groups), 220 landings live (all 220 curl 200; lint + similarity 0 FAIL / 0 WARN across the whole corpus), hub strip +20 (page 1 links 20/20 in en/de/fi), deck canonicals repointed to the landings (spot-checked en/fi/sv), robots exempt map refreshed (19,634 lines), IndexNow 220 URLs → HTTP 200, `/<loc>/topic/<new-family>` 200. NOT done / follow-ups: contact-sheet critic pass on the 10 non-EN d1/d3 pages (only d2 ships); the vocab `crane` fix (§10.3); the fan-out lever (below). Operator /goal: 20 new types, native in 11 languages, ≥1000 clicks/day target.

## The 20 types (ids · family key · shipped theme)
K-284 word-tracing animals · K-285 dot-to-dot · K-286 grid-copy · K-287 singular-plural fruits · K-288 articles animals (sv/da/no → fruits; fi = yksikkö/monikko form page) · G1-242 read-and-color fruits_bw · G1-243 number-of-the-day · G1-244 write-the-word fruits · G1-245 alphabetical-order animals · G1-246 number-walls · G1-247 doubles-halves fruits · G1-248 number-lines (REUSE) · G1-249 sentence-building animals · G2-274 capitals-punctuation vehicles · G2-275 word-classes toys · G2-276 money (REUSE) fruits · G2-277 calendar · G2-278 picture-writing vehicles · G2-279 grid-coordinates · G3-370 word-problems (REUSE) fruits. 17 NEW family keys → taxonomy now 95 exercise-type keys.

## Machinery (all under scripts/worksheet-gen unless noted)
- Specs `types/{k,g1,g2,g3}/<ID>-*.js`; primitives `dot-figure`, `number-wall`, `calendar`, `coord-grid`, `grid-copy`; `templates/components-b2.js`; `lib/b2-common.js` (`entriesFor`, `countable`, `safeNouns`+`B2_EXCLUDE`, `displayWord`); `lib/sentence-bank.js` (pure-substitution frames `{name}{n}{noun}{color}`).
- Data `data/b2/*.js` — **GENERATED** from `i18n/.draft-b2-<loc>.json` by `tools/apply-b2-locale.js` (en block preserved; edit en INSIDE the generated module). ⚠ `data/` is gitignored → `git add -f`.
- Panel workflow: `docs/worksheet-gen/b2-panel-brief.md` → one 3-agent native panel per locale writes the draft → `tools/validate-b2-draft.js <loc>` (poison-tested; `validate-b2-draft.test.js`) → apply → `i18n/lint-locale.js`. Landings: `docs/worksheet-gen/b2-landing-brief.md` → `i18n/.landing-b2-<loc>.json` → `scripts/seo-landing/gen-b2-landings.js <loc> <file> [--dry-run]` (reads the wave's `themeOverrides` for the shipped theme).
- Waves `waves/wave-b2-<loc>.json` (themes animals,vehicles,toys,fruits + 4 BW; `themeOverrides` per type — NEW in enumerate.js). Byte-identity harness `tools/b2-baseline.js --check` (513 coords, 0 drift throughout).
- Publish (Hetzner, env = `cd frontend && set -a && source .env.production && set +a`): `publish-bulk <dir> --dry-run` → `--confirm` per locale → slugs from `grep "^\[publish\] Slug: " _confirm.log` → `regenerate-og-images.js --slugs-file=… --locales=<11>` → `populate-and-inject-hreflang.js --confirm --locales=<11>` → `audit-deck-html.js --slugs-file= --locales=`. Then landings apply → `gen-var-highlights.js` (BASES +20) → deploy → `repoint-deck-canonical.js --types=<families> --locale=<loc>` → `refresh-deck-noindex-exempt.sh` → `indexnow-submit.js`.

## Traps bought this batch (each cost a re-run)
- ⭐⭐ **The round-robin theme index is the spec's position in the wave list, not the 1-based count** — I mapped G1-247 to fruits, it shipped on toys in 11 locales after 8 landing panels had written "kiwis". Fixed by `themeOverrides` + unpublish/republish ×11. **Always read the theme off `--dry-run` enumeration (or the staged ZIP names), never off a hand-computed map.**
- ⭐⭐ **The session usage limit kills every running agent at once** (7 died together); agents that had already written their draft file were recoverable (`validate` on disk), the rest re-launched. Launch ≤4 panels at a time and check for on-disk drafts before relaunching.
- ⭐ **A panel's EN-source audit is the only review the English gets** — 10 panels found the same defects (theme-blind frames "the bananas are red", bare "a {noun}" → "a apricot", plates for swings, unpunctuated coin rows, "I see a" starters). Fold them BEFORE the next locales inherit.
- ⭐ **"Regular plural" is locale-specific** — the EN prefix rule (cat→cats) rejected every Italian fruit (mela→mele). Non-EN uses a folded-stem rule.
- ⭐ **Gender-mix pages need a theme with both genders** — sv/da/no animals have 1–2 ett/et-nouns; K-288 rides fruits there (wave override). nl/de/fi fine.
- ⭐ Probe renders must pass `strings` per job or the chrome falls back to English — the critic then "found" English titles on German pages.
- Fixed-height rows clip content (K-287 badge under the card edge) — size the row from its content, never `min-height` on a page that must fit.
- Inline picture + punctuation: the icon's right margin reads as " ." — strip it before end marks and nowrap the icon with its next token (G2-276/G2-277 `glueInline`).
- Dot-ordinal locales produce "den 15.." and da "6 kr.." — collapse `..` after fill.
- Hetzner `git pull` fails over HTTP/2 ("could not read Username") — set `git config http.version HTTP/1.1` in the repo (done 2026-09-02).
- fi currency unit is `snt` (currencies.js), not `ct` — the verify map must read the data file.
- `gate.js` §4.B slot-token lint is unsatisfiable for accented/hyphenated tokens (es 8, pt 10, fi 7, it 5, sv 3, de/da 1 pages) — the recorded corpus-wide class; similarity + wordcount + banned are what matter (targeted checker: scratch `b2-gate-new.js` logic — lint + Jaccard vs the whole corpus in seconds; the full `gate.js` times out on sv).

## Vocab defects surfaced by the panels (image-vocabulary.js is §10.3 operator-locked — NOT changed; guarded by `B2_EXCLUDE`)
`crane` = the BIRD in es (Grulla) / no (Trane) / da (Trane) / sv / fi (Kurki); no `lego` plural "Legoer"; da toys-bw `tank`/`loader`; toys theme holds persons (girl/baby/doll) — shop excludes them; toys store plurals as singulars (blocks/cards/dice/chess/crayons) — `countable()` excludes them everywhere.

## Click math (honest)
440 pages (220 decks + 220 landings) ≈ 300–450 clicks/day at 9–15-month maturity on the house 1–5/page baseline; the 1000+/day contribution comes from the **theme/variation fan-out lever** (themed types fan across more themes with zero new design via `themesPerType`; dot-to-dot/pixel/calendar fan by figure set or month) — run when Search Console names the winners, exactly as nt20-VAR did.
