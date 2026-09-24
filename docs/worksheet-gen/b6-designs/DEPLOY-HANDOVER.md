# nt5-F (b6) — DEPLOY HANDOVER (for Claude Code on the operator's PC)

Written 2026-09-24 by the cloud session that finished the batch. Everything below is on branch
**`claude/hello-r3et7q`**. Nothing has been deployed or published. This file is the single source of truth for
the remaining steps; the recipe is the same as nt10-E (b5), with b6 names.

## 1. What the batch is
5 new printable worksheet types × (1 base + 5 variation faces) × 11 locales = **318 worksheets** (330 ceiling;
cursive-writing is refused whole-type in sv + fi). Types: story-sequencing K-379 · healthy-habits K-380 ·
habitats G1-398 · sink-or-float G1-399 · cursive-writing G2-377 (faces K-381..384 · G1-400..408 · G2-378..387 ·
G3-400/401). SoT: `docs/worksheet-gen/b6-designs/README.md`; memory note `project_nt5f_worksheet_types.md`
(update it at close-out); the PC's memory + plans were copied to `docs/pc-notes/` for this session.

## 2. What was done since the last PC session (all committed on `claude/hello-r3et7q`)
- Reconciliation round 2 (native strings after fix round 2): **fi** applied (the other 9 were already in the WIP commit).
- Landings pass 1 for **pt it sv da no fi** (audit of the render; findings in each `.landing-b6-<loc>.json`).
- **Fix round 3** (`_work/landing-audit/_FIX-ROUND-3-LIST.md` = the record, incl. status and what was KEPT):
  - EN source + all 10 locales: G2-379 wash-hands reason was false everywhere → corrected; G1-402 sentences no
    longer open with an order word (bank rule 10 + render verify inverted; poisons P10/P10b); G1-408 joins
    NO_TEST (title claims no experiment, poison PF4b); G2-383 no "why" + general sentences carry their witness on
    the shelf (nail / log; poison PR23); G1-407 titles = food + home; G3-400 titles name the report.
  - Per-locale: sv/pt/no G1-404 titles; pt G2-379 title; no "nebbtang", "Vaneskjema for uka", G2-377 two lines;
    fi kani / taskurapu / penguin sentence / G2-381 title; de G2-377 two lines.
  - NEW generator feature: per-locale `banks.habitats.excludeAnimals` (G1-398 pools, G1-406, G2-380; gate asserts
    no excluded animal reaches any page). Used: da ["moose"], de ["moose"], es ["moose"]. (es sloth could NOT be
    excluded — es G1-406 then has no legal page.)
  - G1-402: the picture-row → sentence-row map may not be a shift by one row (`matchTell`, poison PF4d). The
    neighbour-swap variant is deliberately NOT refused (measured: it would push the rank-1/rank-4 sentence slots
    to 17.8 / 32.2 %, outside the 25 ± 6 band).
- Landings pass 3 touch-up for **all 11** locales; then all 318 landings **composed** into
  `frontend/content/seo-landing/<loc>.json` (only additions, 0 replaced).
- New tool: `scripts/worksheet-gen/tools/b6-prepare-upload.js <loc>` (PC side of publish, see §4).

## 3. Verified state (cloud, 2026-09-24)
- `validate-b6-draft` 0 errors in all 10 locales · `lint-locale` 0 · `check-b6-string-parity --all` 576 / 0 missing.
- Family gates: story-sequencing PASS 580 / 52 poisons · healthy-habits PASS 2674 / 66 · habitats PASS 6380 / 85 ·
  sink-or-float PASS 249 / 69 · **cursive-writing PASS 2034 / 58 — run on THIS PC** (the Linux cloud renders the
  Playwrite fonts 1-2 px differently and cannot judge cursive).
- `verify-hub-type-rows.js --expect=docs/worksheet-gen/b6-designs/hub-expectations.json` PASS (318 b6 rows + 187
  control rows) against the composed landings.
- `seo-landing/gate.js` over the 11 locale files: see the last commit message of the landings commit.
- `b6-prepare-upload.js sv` tested end-to-end in the cloud: READY 24/24; refuses (exit 2) when a ZIP is missing.
- Taxonomy: 140 exercise-type keys; the 5 b6 keys have `apps.<key>` + slug + name in all 11 locales.

## 4. Remaining steps — in this order
**0. Pre-flight on the PC**
- `git fetch origin` → `git checkout pivot/printable-business-toolkit` → `git pull` →
  `git merge --ff-only origin/claude/hello-r3et7q` (verified to be a fast-forward of pivot `0e898f1`).
- Re-run the cursive gate on the PC: `node scripts/worksheet-gen/qa/verify-b6-cursive-writing.js` (must PASS). It
  passed on the PC before round 3; since then only the de and no G2-377 instructions changed (the words "two empty
  lines"), so a re-run is a confirmation, not a hunt.
- `git status` clean. Push pivot.

**1. Server taxonomy first (the nt10-D trap).** The server checkout must carry the new
`frontend/config/topics-taxonomy.json` BEFORE any locale is published, or publish-cli falls back to `slug.en` and
ships English deck slugs (235 decks had to be deleted and republished in nt10-D). Do this with your normal deploy
(`deploy.sh` pulls pivot). It also ships the 318 landings; their decks do not exist yet, so a landing's deck link
404s until step 2 publishes that locale — keep the gap short (b5 did publish → deploy → repoint instead; if you
prefer that, pull the server checkout without building so publish-cli sees the taxonomy). Verify on the server:
`grep -c '"cursive-writing"' /opt/lessoncraftstudio/frontend/config/topics-taxonomy.json` ≥ 1.

**2. Publish ×11, one locale at a time, en first.** Per locale `<loc>`:
- PC: `node scripts/worksheet-gen/tools/b6-prepare-upload.js <loc>` → must end `READY <loc>: N/N` (en de es fr
  it pt nl da no = 30, sv fi = 24). It regenerates the waves, CLEARS `out/staging/wave-b6*-<loc>` (cli.js skips an
  existing ZIP, so a stale pre-fix ZIP would otherwise ship), generates both waves, pools into
  `scripts/worksheet-gen/out/upload/wave-b6-<loc>-all/`.
- Copy the pool to `/var/www/lcs-media/_staging/b6-<loc>/` (scp with the SSH key, as usual).
- Server: `bash /opt/lessoncraftstudio/scripts/publish-cli/b6-publish-locale.sh <loc>` (dry-run: must say
  `dry-run clean: N/N INSERT, 0 collisions`) → then `... b6-publish-locale.sh <loc> --confirm`. The script already
  runs OG images, hreflang ×11, the analytics beacon + site chrome (the b3-b5 gap) and the deck audit.
- After en: open one en deck and one en landing in a browser before doing the other 10.
- Afterwards remove `/var/www/lcs-media/_staging/b6-<loc>/` (server disk rule: the server keeps only what it serves).

**3. After all 11:** deploy (if landings were not yet live) → `node scripts/seo-landing/repoint-deck-canonical.js
--types=story-sequencing,healthy-habits,habitats,sink-or-float,cursive-writing --locale=<loc>` for each locale
(missing = 0) → `scripts/publish-cli/refresh-deck-noindex-exempt.sh` → `node scripts/indexnow-submit.js`
(same invocation as nt10-E).

**4. Hub gate HARD.** In `deploy.sh` line ~325 drop `--warn-missing-keys` from the b6 `verify-hub-type-rows.js`
call; deploy; it must PASS on the server. Then the real-browser check: click each of the 5 sidebar entries on
`/<loc>/worksheets` (All tab) in en + de + fi (+ a sample of others) — each must list exactly its worksheets
(6 per type; cursive 0 in sv/fi).

**5. G1-204 in-place republish** (the plastic-spoon → bolt data fix from Phase C, `data/science/sink-vs-float.json`;
b3-baseline drift is G1-204 only). Same `--update-slug` path as the K-205 republish in nt10-E, then re-run the
beacon + site-chrome injectors for those slugs (the update path writes a bare deck.html).

**6. Close-out.** CLAUDE.md: add §28 nt5-F (built + live, counts, refusals, lessons) and §14.10 count 135 → 140
("nt5-F added 5"). Memory: update `project_nt5f_worksheet_types.md` + MEMORY.md pointer. Commit + push.

## 5. Safety rules that apply (CLAUDE.md Appendix A + the PC memory)
- Never `git add .`; stage explicit paths. Never touch `/var/www/lcs-media/{samples,image-library,...}`.
- Commit + push BEFORE deploy (deploy.sh pulls). Watch deploy output for the payment canary and the hub gates.
- Stage wave ZIPs under `/var/www/lcs-media/_staging/`, never `/tmp`; delete staging after publish.
- `git status` clean and server taxonomy verified before publishing each locale.
- If any step prints something unexpected: stop, read the log the script names, do not retry blind
  (publish-bulk is not idempotent; a partial run needs staging hygiene first, CLAUDE.md §A.14.4).

## 6. Known open items (not blockers; recorded in the landing `findings` and the fix-round-3 list)
Art: G1-398 dragonfly needs a clearly water-bound replacement picture; es sloth reads as a meerkat; K-380 comb child
reads as head-scratching; G1-400 fence-story outsider unreadable at print size. Layout: G3-400 second result tank
unlabelled; pt G2-384/385 fit 4 not 5; da G3-401 first sentence one free line. Slugs kept for URL stability though
the page wording moved (e.g. G2-383 slugs containing "why"; de G2-377 slug says VA while the page prints LA — decide
accept vs 301 later).
