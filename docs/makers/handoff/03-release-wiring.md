# 03 — Release wiring (P5) (task 3, Fable 5.1, 2026-11-01)

Prepared and tested LOCALLY against ARCHITECTURE §5, §8, §13, §15 (gate 13), CLAUDE.md §8.1 / §A.5.1 / §21.7 / §A.14.12.
Nothing run on the server, no database, no `migrate deploy`, no deploy.sh, no nginx. The site stays unchanged by
construction until the operator installs a release: every new website path reads the SERVED tree
(`/var/www/lcs-media/makers/`, absent today) and answers "none" without it.

## Built (one commit, hash in the final message)

- **Schema + migration file.** `MakerRecipe` (`maker_recipes`) + `MakerShareLink` (`maker_share_links`) appended to
  `frontend/prisma/schema.prisma` (+ the two virtual relation lists on `User`, no SQL);
  `frontend/prisma/migrations/20271101000000_add_maker_recipes_and_links/migration.sql` generated with
  `prisma migrate diff` from the committed schema: 2 CREATE TABLE, 4 indexes, 3 FKs — no ALTER of an existing table.
- **The APIs.** `frontend/lib/makers/store.ts` = the RULES (pure; the exact contract of `scripts/makers/local-store.js`:
  401/400/413/404/409/429, one link per recipe and kind, `meter` from the teacher at READ time, soft delete, cap 500);
  `db.ts` = Prisma `MakerDb` (one statement per call); `auth.ts` = the meter's identity (Bearer, then refresh cookie);
  routes `frontend/app/api/makers/{recipes, recipes/[id], links, links/[linkId]}/route.ts` (public link read =
  `public, max-age=0, s-maxage=300` + noindex; all else `no-store`). `link-store.ts` BACKED: `getLink` → store +
  released-maker check; `presetForDeck` → published Deck → `DECKS_DIR/<lang>/<slug>/manifest.json` → `presetFromManifest`
  with `makerOf` over the released makers' `templates.json` (`released.ts`, 5-min cache of the served tree).
- **Smart links.** `scripts/makers/build-smart-links.js` → committed `frontend/lib/makers/smart-links.json` (33 old apps
  → maker + template, from topic-map.js); `smart-link.ts` returns `/makers/app/?maker=<id>&lang=<loc>&t=<tpl>` only when
  that maker is released on the server (gallery when the template is refused in the locale); `MakerLanding.tsx`:
  ONE line, `launchUrl = smartLaunchUrl(...) ?? makerGeneratorUrl(...)` (+ import). Nothing else on a landing changes.
- **Release path.** `scripts/makers/release-pack.js` (PC: current versions + pointers + app shell + play pointers +
  migrations + `makers-assets` → `out/makers-release/` with `RELEASE.json` sha256 per file; 7,095 files, 105 MB today;
  `--all-versions` later) · `scripts/makers/install-release.js` (server, from deploy.sh: verifies every hash, copies a
  version folder only where absent and refuses if an installed one differs, assets never overwritten, pointers written
  last and atomically, chown, removes the stage; no-op without a stage) · `scripts/makers/patch-nginx-makers.py`
  (`/makers/<x>/<hash>/` immutable, `/makers-assets/` 30 d, `/makers/` pointers + app shell 5 min; `X-Robots-Tag: noindex`
  on all; `nginx -t`-guarded, idempotent, backup outside sites-enabled) · `deploy.sh` step 1c (before the Next build):
  install, then gate 13 HARD once `/var/www/lcs-media/makers/versions.json` exists.
- **Gate 13 `registration`** (`scripts/makers/gates/registration.js [--served=<dir>]`): ledger ↔ current.txt, data
  snapshot, strings ×locales, every data-manifest file, every thumbnail × locale, maker name ×11, smart links (template
  built, frozen slugs ×11, smart-links.json in sync), play tree + landings ×11, app shell + generated files, migration
  records known to the ledger, the 6 routes, schema models, the migration, deploy.sh wiring, housekeeping never deletes
  under makers*. 19 poisons, each must fail.

## Measured

`makers-store.test.js` 47/47 (poisoned: a revoke rule and the rev rule each make it fail) · `saves-shell.js` 21/21 and
`play-shell.js` 83/83 **driven against the REAL rules** through `scripts/makers/tests/run-gate-with-real-store.js`
(replaces the stand-in's `handle`/`readLink` with store.ts over an in-memory db persisted in the stand-in's file shape;
one earlier play-shell failure reproduced as a concurrent rebuild of `counting`, not the store — passed on re-run) ·
`registration.js` all registered (13 makers, 19 poisons caught) on the build tree AND on a packed + installed temp root
· install: idempotent (second run: 15 kept, 0 copied), refuses a tampered file and a differing installed version ·
nginx patch on a synthetic config: inserted before `location / {`, idempotent, block order right · `old-landings.js`
363/363 · `preflight-indexable-routes.js` clean (the API routes are JSON; `/s/` keeps noindex) · `tsc --noEmit` 0 errors
in the maker files. No deploy, no server.

## Server steps for the operator, in order (at the makers' release, not before)

1. PC: `node scripts/makers/release-pack.js` → upload `out/makers-release/` to `/var/www/lcs-media/_staging/makers-release/`
   (e.g. `rsync -a out/makers-release/ root@65.108.5.250:/var/www/lcs-media/_staging/makers-release/`).
2. Server: `python3 scripts/makers/patch-nginx-makers.py --dry-run`, then without `--dry-run` (once).
3. Server: `cd /opt/lessoncraftstudio/frontend && set -a && source .env.production && set +a && npx prisma migrate deploy`
   (§A.5.1; `prisma generate` runs in deploy.sh).
4. `bash /opt/lessoncraftstudio/deploy.sh` — step 1c installs the stage and runs gate 13; the build follows.
5. Verify: `curl -I https://www.lessoncraftstudio.com/makers/versions.json` (200, noindex, s-maxage) and
   `/makers/<maker>/<hash>/templates.json` (immutable); an old landing's launch button now opens `/makers/app/?maker=…&t=…`.

## NOT done / decisions / traps

- The mode cards ("See what you can make") still launch the old app per mode; only the two launch buttons are smart.
- No `limit_req` block of its own: `/api/makers/*` runs through `location /` (lcsperip 8 r/s, burst 40) — enough per
  ARCHITECTURE §9; a dedicated zone is an operator call.
- `makers-assets` is UNVERSIONED (the browser platform's `ASSET_BASE`), so it is cached 30 d, not immutable; a changed
  picture needs a new file name — or a versioned asset base (ARCHITECTURE §5.2's `/makers-assets/<av>/`, not built).
- Housekeeping: nothing to exempt — `housekeeping.sh` deletes only named classes; the gate asserts it never names makers*.
- Deck presets open only in a RELEASED maker; a maker whose version was pinned by a recipe but never released → the
  shell's "unknown version → current" rule applies.
- Trap: `git checkout --` with no path prints status and changes nothing — but never type it near uncommitted work.
- Trap: the shell gates read the build tree; a rebuild by another session mid-run fails them for reasons that are not
  yours (observed once). Trap: Windows `python` prints `—` as `�` (harmless); Linux is UTF-8.
- No new strings; nothing for the native review.
