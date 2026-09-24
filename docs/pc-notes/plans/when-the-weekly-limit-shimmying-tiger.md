# nt20-C — where the weekly limit cut in, and how to resume

## Context

The operator's goal was "build the last batch of 20 worksheet types and their expansion" (nt20-C: 20 families × 6 faces × 11 locales, plan `purring-discovering-floyd.md`, Phases 0–8). The weekly limit hit mid-session on **2026-09-14 ~21:47** and nothing has moved since (last commit `9894dd5d` at 21:35; newest file on disk 21:46:52). This plan records exactly what was found on disk and the shortest correct path to close the batch.

## Where the interruption happened — measured, not recalled

| Phase | State | Evidence |
|---|---|---|
| 0 prerequisites | DONE | commits `2f4c3ddf`…`483a992a`, 72-deck divfix republish live |
| 1 EN base specs (20) | DONE | `aa9b16b0`…`f1a89b8f` |
| 2 EN variation faces (100) | DONE | close `3b8e37d7` |
| 3 EN wave + generate | DONE | `ff971519` |
| 4 ten native panels | DONE | de/nl/es/fr/it/pt/sv/da/no/fi all applied `0cfa7435`…`5d2facb6`; critic round folded in `c184c6b9`…`577b9496` |
| 5 waves + generate ×11 | DONE | release baseline `e0383ecd`; staged ZIPs on disk: en 117 · de 119 · nl 117 · es 118 · fr 116 · it 117 · pt 117 · sv 118 · da 119 · no 119 · fi 118 = **1,295** in `scripts/worksheet-gen/out/upload/wave-b3-<loc>-all/`; face tables `out/b3-faces.<loc>.json` ×11 (21:24–21:31), 117/117 en PNGs present |
| **6 landings ×11** | **INTERRUPTED — at the very first locale (en), mid-panel** | see below |
| 7 publish ×11 | not started | no `_staging/b3-*` on Hetzner referenced anywhere; `frontend/content/seo-landing/*.json` untouched since 09-03 |
| 8 hub verify + close-out | not started | `deploy.sh` still carries `--warn-missing-keys` |

### Phase 6 — the precise cut point

Phase 6 tooling was committed (`616c6fed`: `docs/worksheet-gen/b3-landing-brief.md` + `scripts/seo-landing/gen-b3-landings.js`). The en locale was then split into **four quarter panels** (five families each) launched in parallel:

| Quarter | Families | Expected landings (en) | On disk? |
|---|---|---|---|
| Q1 | letter-of-the-week · sound-boxes · syllable-split · syllable-reading · spelling-rules | 6+6+4+6+6 = **28** | **NO — agent killed before writing** |
| Q2 | opposites · compound-words · verb-forms · read-and-do · rhyming-words | 6+5+6+6+6 = **29** | YES `i18n/.landing-b3-en-q2.json` (21:46:52), 29 ids, all 9 fields |
| Q3 | feelings · animal-fact-file · hundreds-chart-puzzles · division-with-remainder · ordinal-numbers | 6×5 = **30** | **NO — agent killed before writing** |
| Q4 | days-and-months · all-about-me · seasons · logic-puzzles · picture-word-cards | 6×5 = **30** | YES `i18n/.landing-b3-en-q4.json` (21:46:04), 30 ids, all 9 fields |

(28+29+30+30 = 117 = the en shipped count in `hub-expectations.json`.)

**The two surviving quarters were written but never self-checked.** `gen-b3-landings.js en <q> --dry-run` refuses both, and the ONLY failure class is `metaDescription` over the 120–170 window: **Q2 15 ids (171–182 chars), Q4 26 ids (179–205 chars)** — 41 metas to trim. No word-count, title, slug, free-claim or soft-hyphen failures. Partial coverage is accepted by the composer ("N shipped ids still without a landing"), so the quarters merge independently.

Nothing was merged into `frontend/content/seo-landing/en.json`; no other locale has a `.landing-b3-<loc>*.json` draft. The scratch prompt generator `$TEMP/landing-prompt.js` died with the old session's scratchpad (searched `AppData/Local/Temp/claude` — absent) and must be re-created from the brief.

Unrelated working-tree noise (leave alone): ~1,134 modified `docs/audit-results/**/qa/*.png` + untracked cleo-packing-list screenshots from other activity work.

## Resume plan (Phase 6 → 8, in order)

### Step 1 — finish en (this session)

1. Re-create the panel prompt generator in the scratchpad (`landing-prompt.js <loc> <q>`): it prints a prompt that hands a 3-agent native panel the brief `docs/worksheet-gen/b3-landing-brief.md`, the quarter's five family keys, the shipped ids for that locale from `out/b3-faces.<loc>.json` (skip `shipped:false`), the output path `scripts/worksheet-gen/i18n/.landing-b3-<loc>-q<N>.json`, the locale-scoped scratch rule, and the self-check command. EN is handed as SOURCE TO AUDIT for non-en locales.
2. Launch **en Q1 + en Q3** panels (general-purpose agents, 2 in flight) → they must end on `dry-run ok`.
3. Meanwhile trim the 41 overlong metas in en Q2/Q4 myself (keep the keyword lead, cut trailing clauses; re-run dry-run until clean). Small, mechanical — no panel needed.
4. Merge the four quarters → `i18n/.landing-b3-en.json` (`{locale, landings: {...q1,...q2,...q3,...q4}}`; assert 117 ids, no duplicate slugs).
5. `node scripts/seo-landing/gen-b3-landings.js en <merged> --dry-run` → `dry-run ok — complete` → run without `--dry-run` (writes `frontend/content/seo-landing/en.json`).
6. `node scripts/seo-landing/gate.js frontend/content/seo-landing/en.json` — READ BOTH sections (§4.B lint + similarity), 0 FAIL.
7. `node scripts/verify-hub-type-rows.js` (hard mode; en cells should now match, other locales still WARN).
8. Commit: `frontend/content/seo-landing/en.json` + `scripts/worksheet-gen/i18n/.landing-b3-en.json` (explicit paths). No push yet.

### Step 2 — the other 10 locales (de → nl → es → fr → it → pt → sv → da → no → fi)

Same recipe per locale, four quarters, **≤ 4 panels in flight**, native 3-agent panels reading their own `out/b3-faces.<loc>.json` PNGs + `strings.<loc>.json`. Per locale: merge → dry-run → compose → `gate.js` both sections → hub gate → commit `<loc>.json` + draft. Expect the meta-overrun class again — tell panels in the prompt to run the self-check before finishing (the en panels never got there). Refused ids (`_records/refusals.<loc>.json`) get no landing.

### Step 3 — Phase 7 publish ×11 (Hetzner)

Per plan Phase 7: push; scp `out/upload/wave-b3-<loc>-all/*.zip` → `/var/www/lcs-media/_staging/b3-<loc>/` (never /tmp); `publish-bulk --dry-run` (ok = shipped count, 0 collisions) → `--confirm` → slugs from `_confirm.log` → `regenerate-og-images.js --slugs-file= --locales=<all 11>` → `populate-and-inject-hreflang.js --confirm --locales=<all 11>` → `audit-deck-html.js` N/N → `deploy.sh > log 2>&1; echo EXIT=$?` → `repoint-deck-canonical.js --types=<20 keys> --locale=<loc>` → `refresh-deck-noindex-exempt.sh` → `indexnow-submit.js`.

### Step 4 — Phase 8 close-out

Drop `--warn-missing-keys` from `deploy.sh`; `verify-hub-type-rows.js` hard 20 keys × 11; `verify-worksheets-hub-order.js` + `verify-worksheets-hub-render.js`; real-browser check `/<loc>/worksheets?type=<key>` (All tab) for de, fi, one Romance. Update memory RESUME pointer + MEMORY.md line, CLAUDE.md §14.10 (95 → 115) + §25 status.

## Verification for Step 1 (the immediate deliverable)

- `gen-b3-landings.js en … --dry-run` prints `dry-run ok — complete` (117/117, 0 errors).
- `gate.js` 0 FAIL in both sections; sibling similarity WARN band only.
- `verify-hub-type-rows.js`: 20 en cells = expected (letter-of-the-week 6 … syllable-split 4, compound-words 5 …), unique slugs, `mode` non-empty.
- `git diff --stat` touches only `frontend/content/seo-landing/en.json` (+ the draft).

## Session discipline reminder

At session end: update the RESUME pointer in `memory/project_nt20c_worksheet_types.md` (which locales/quarters are merged, last commit) and the MEMORY.md line — this session's failure mode was exactly that the in-flight quarter state lived only in agents.
