# DEPLOY — the Italian (it) second-batch fan-out (whole branch) to production

## Context
The Italian fan-out (#1..#114, ~110 activities + nila-pond `0814c6a5`) is complete and committed+pushed, but **NOT live** — every it
activity 404s (verified: nila-pond `idea-principale-di-un-testo-scuola-dell-infanzia` and coin-stall `la-bancarella-di-otto-...`
both HTTP 404). The operator said **"deploy all of them."** Production (server `/opt/lessoncraftstudio`) is at `b8767f0a` and is
**110 commits behind** origin HEAD `0814c6a5` — so a branch deploy brings the entire it fan-out **plus any other committed-but-
undeployed branch work** live in one shot. This is the standard branch deploy; there is no per-activity deploy.

## Why the it activities 404 today (the load-bearing mechanic)
- `frontend/public/mini-tools` is a **symlink → `/var/www/lcs-media/mini-tools`** (the nginx-served dir).
- `frontend/lib/activities.ts` resolves manifests preferring `public/mini-tools/<engine>-activities.json` → i.e. reads from the SERVED
  dir. The build's static-param generation enumerates activity slugs from those manifests.
- The served `nila-pond-activities.json` is the **Aug-20 stale copy** (`grep '"it"'` = 0) → the build never saw the it slugs → the
  routes were never generated → 404. **∴ the §20.4 cp of `mini tools/` → `/var/www/lcs-media/mini-tools/` MUST happen BEFORE
  `npm run build`**, or the deploy reproduces the 404.

## Pre-flight (all verified read-only)
- HEAD `0814c6a5` == `origin/pivot/printable-business-toolkit` (fully pushed). ✅
- Served mini-tools is **NOT immutable** (`lsattr` shows no `i`) → plain `cp` works (unlike the chattr+i worksheet-generators). ✅
- Served mini-tools has subdirs (`og/ previews/ tool-previews/ storybook-library/`) — cp of top-level `*.js/*.json/*.html` will NOT
  touch them. ✅
- deploy.sh does its OWN `git pull` (line 164) then gates then `npm run build` (line 334) then atomic release-symlink swap. A gate
  failure aborts BEFORE the swap → **zero-downtime** (old release keeps serving). `set -e`.

## The deploy procedure (ONE ssh chain — §20.4 order)
Run over SSH key-auth (`ssh -i ~/.ssh/id_ed25519 root@65.108.5.250`), from `/opt/lessoncraftstudio`:
```
cd /opt/lessoncraftstudio \
 && git pull \
 && cp "mini tools/"*.js "mini tools/"*.json "mini tools/"*.html /var/www/lcs-media/mini-tools/ \
 && chown lcs-media:lcs-media /var/www/lcs-media/mini-tools/*.js /var/www/lcs-media/mini-tools/*.json /var/www/lcs-media/mini-tools/*.html \
 && bash deploy.sh
```
- `git pull` brings the 110 commits (updates repo `mini tools/` + `frontend/` sources). deploy.sh's internal line-164 pull is then a no-op.
- The `cp` syncs the served/symlinked manifests+runtime JS so the build enumerates the it slugs. page.tsx + `it.json` are compiled
  from the pulled `frontend/` source (no cp needed for those).
- `bash deploy.sh` runs: `prisma generate` → hreflang-mirror parity → preflight-indexable-routes → preflight-tool-registration →
  **preflight-activity-routes** (I ran it locally = PASS) → **audit-font-shorthand** → theme-webp-coverage → tool-print-sheets →
  payment-env guard → `npm run build` (8 GB, ≤30 min) → static-file copies + archive → release swap → post-deploy smoke + payment canary.

## Gate contingencies (deploy.sh aborts safely BEFORE the swap — fix then re-run)
- ⚠ **audit-font-shorthand (the known batch-deploy hazard):** the `KNOWN` ratchet in `scripts/audit-font-shorthand.js` is LINE-KEYED;
  a pure line-MOVE of a pre-existing `font: … Baloo 2` offender (from any of the 110 commits) fires exit-1. If it fires: re-run to
  confirm **0 NEW** (only moved lines), re-baseline `KNOWN` to the current lines, `git commit + push`, re-`git pull` on server,
  re-run deploy. Never amnesty a genuinely NEW offender.
- hreflang-mirror parity / preflight-indexable-routes / preflight-tool-registration: a drift in some other branch commit → fix at
  source, push, re-pull. (Each of the 110 commits presumably passed its own gates.)
- `npm run build` OOM/timeout → read the log ('heap out of memory' vs hang); the release symlink is untouched on failure.
- payment canary is WARN-only (post-swap) — a loud `!!!` is a real signal but does not un-deploy.

## Verification (after the swap; mind Cloudflare 5-min TTL §15.8)
1. **it now live:** `curl -sI` → 200 for nila-pond `…/it/activities/idea-principale-di-un-testo-scuola-dell-infanzia` + 3–4 mid-batch
   it slugs (coin-stall `la-bancarella-di-otto-euro-e-centesimi-classe-terza`, + two more from `mini tools/*-activities.json slug.it`).
2. **Italian content:** `curl … | grep` the it title/prompt (e.g. «Lo stagno delle idee di Nila», «Ascolto e parlato», «scuola
   dell'infanzia») — no English leak, no raw code.
3. **it in sitemap:** `curl …/sitemap/8.xml | grep -c "/it/activities/"` rises.
4. **No regression:** an en activity + an already-live locale activity (de/es/pt) + homepage still 200.
5. `audit-activity-pages.js` (or a spot `verify-activity-content-it` live curl) clean.

## Post-deploy bookkeeping (out-of-tree, no commit)
Update `memory/project_it_secondbatch_fanout.md` + the MEMORY.md it line: COMPLETE → **COMPLETE + DEPLOYED (prod HEAD `0814c6a5`,
date)**; drop the "awaits end-of-batch deploy" caveat. (Mirrors the pt-BR "COMPLETE + DEPLOYED" precedent.)
