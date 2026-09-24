---
name: project_server_disk_cleanup_2026_09
description: "Hetzner disk audit 2026-09-11 — where the 309 GB went, what was safely freeable (~143 GB), the one-shot cleanup script, and the standing traps (deck.html.bak.* copies, same-host tarballs, /samples orphan, MISSING_MESSAGE log spam)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 88de4c3a-76a3-4cc5-ae98-3a7a8f0bf91d
  modified: 2026-09-11T14:13:37.706Z
---

# Hetzner disk cleanup — 2026-09-11

**Measured:** `/` 436 GB, 309 used, 106 free (75%); inodes 5%. Plan file: `C:\Users\rkgen\.claude\plans\analyze-thoroughly-and-find-enumerated-micali.md`.

**Where it went:** backups/ 137 GB (2 × 67 GB deck tarballs, same disk as the data) · decks/ 113 GB of which **52.3 GB = 137,516 `deck.html.bak.*` retrofit safety copies** (alt-text-retrofit 48,711 · embed-src 38,195 · sr-rows 23,756 · teaching-block 10,664 · lazy-deckend/img-dims 5,718 each · hreflang-strip 3,790 · reconcile 964) · `.publish-cli-staging/` 13 GB (June + Sep batches, all published) · a 3.1 GB `.next/cache` stranded in a non-current release · `frontend/public/public/public` 1 GB accidental recursive copy (Mar 30, untracked) · /tmp 4.3 GB (215 deploy logs + 2,897 staged wave ZIPs, 2,896 verified live) · /root ~3 GB (npm cache, Cypress not a dep, dead-index pm2 logs).

**Done in-session:** `backup-decks.sh` final retention 2→1 (`478d4ad2`, the prune-before-create step already leaves exactly one prior tarball during tar, so the 2nd copy protected nothing); staging `_*.txt` reports preserved to `backups/staging-reports/<batch>/` (123) + the one unpublished ZIP (`wsg-wsciall-g1203-nothm-d2-no`) to `.../unpublished/`; journald `SystemMaxUse=300M` (1.0 GB→304 MB).

**Script:** `/root/lcs-disk-cleanup-2026-09-11.sh` (dry-run default, `--apply` to execute; every step guard→show→rm; adds a weekly cron `find decks -name 'deck.html.bak.*' -mtime +14 -delete`). Expected: ~143 GB freed → ~250 GB free. ⚠ The auto-mode classifier blocks rm-over-ssh from Claude; the operator runs it via `! ssh …`.

**Why:** the weekly deck backup's guard needs free ≥ 1.33 × decks-size (~150 GB) and only cleared it because it deletes the older tarball first — growth would have started aborting backups.

**How to apply / traps:**
- ⭐ **`.bak.*` files are write-once (`if (!existsSync) copyFile`), never read back; idempotency is content-marker based** — so deleting them is safe and every retrofit re-run makes a fresh one. They accumulate on EVERY `publish-wave` (step 4 alt-text writes one per deck) → the cron is load-bearing.
- ⭐ **Dry-run caught a real defect:** `releases/*/` globs the `current` SYMLINK; comparing the path (not `readlink -f`) would have rm'd the LIVE release's `.next/cache`. Compare realpaths, skip symlinks.
- ⚠ Server-side `curl https://www.lessoncraftstudio.com` gets **403 from Cloudflare**; origin checks = `--resolve www.lessoncraftstudio.com:443:127.0.0.1` on `/en`, `/en/worksheets`, `/en/decks/<slug>/` (bare `/` and trailing-slash `/en/worksheets/` redirect).
- ⚠ `*/*/manifest.json` over 52k dirs overflows the arg list and grep silently returns 0 — a false "nothing published" reading; use `find -print0 | xargs -0`. Live manifests write `"deck_id": "x"` WITH a space.
- ⚠ The DB has no deck_id column; the only deck_id → slug map is the on-disk manifest.json.
- 🛑 **Still open (operator decisions, not cleanup):** `/samples` at fs root 4.9 GB — nginx aliases `/var/www/lcs-media/samples/` which does NOT exist, `homepage-content-manager.ts` still builds `/samples/<lang>/<app>/…` URLs (all 404) → move into place or delete; `docs/audit-results` 3.5 GB QA PNGs tracked in git (bloats .git 4.3 GB on every clone); 1,811 superseded `<slug>-v1` dirs 3.8 GB kept as rollback; off-host backup (Storage Box) still not done per §A.14.6.
- 🔥 **pm2 error log grows ~60 MB/hour**: ~38k next-intl `MISSING_MESSAGE` traces/hour (`topicProse.<a>__<b> (fi)`) from `app/sitemap/[__metadata_id__]` + `topic/[slug]/[secondary]` — the §16.7.1 fallback chain EXPECTS misses; fix = `onError` swallowing MISSING_MESSAGE in the i18n request config. Separate commission.
- Running kernel `5.15.0-143` while `-191` installed — no reboot since ~Jan.

Related: [[feedback_verify_the_measurement_before_the_defect]] · [[project_deploy_standalone_rm_race]]

# Part 2 (same day) — root causes + the structural fixes (CLAUDE.md §A.14.12)

Operator: *"Why are things accumulating… Isn't it avoidable?"* → yes; ~95% was our own scripts creating files with no expiry. Shipped (`6f7c9e04` `486c641b` `ec9e72f3` `b279a58c` `cdb9a240`):
- **`publish-bulk` prunes its per-deck staging** after a real publish (`bulk.pruneStagingExtractions`, `--keep-staging` opt-out; the real publish reads the INPUT ZIP, the extraction was only ever dry-run inspection). Test `bulk-staging-prune.test.js`.
- **`deploy.sh`**: abort < 20 GB free (`DEPLOY_MIN_FREE_GB`, poison-tested), warn < 60; empties RETIRED releases' `.next/cache/images` (Next's runtime image cache — 3.1 GB in 8 days — not a build artefact).
- **`server-scripts/housekeeping.sh`** (cron Sun 04:30; `--dry-run`): `.bak.*` >14 d · staging extraction dirs >7 d (reports kept) · pm2 logs >14 d · `/root/*.log` >30 d. Poison-tested 9 assertions + dry-run control.
- **`t.has()` before every topicProse/topicMeta probe** (5 sites) — the 38k/h MISSING_MESSAGE traces. Verified on use-intl 4.3.6: `has()` silent, bare `t()` miss fires `onError`.
- Server-side (hand): `/etc/tmpfiles.d/lcs-tmp-age.conf` `D /tmp 1777 root root 14d` (listed before the stock rule → wins); cron line; journald 300M.

**Traps paid for:** ⭐ a Git-Bash `ln -s` on Windows makes a COPY, so a symlink-sensitive mock must run on Linux; ⭐ a mock that back-dates a dir and THEN writes into it has reset the dir's mtime — the poison "failed" against a correct script; ⭐ my sed range with an emoji anchor over-ran and executed the rest of deploy.sh locally (harmless, all mock paths) — use `awk '/start/{p=1} p; /end/{exit}'`; ⚠ CLAUDE.md and the topic page.tsx files are CRLF — multi-line string anchors must be joined with the file's own newline or the patch silently throws before writing; ⚠ pm2-logrotate `retain` is per process-INDEX family.

# Part 3 (same day) — deck backups moved OFF the server (`09f6d208`)

Operator: *"Why do you need deck backups on the server? There are all the decks on the local disk."* → we don't; the PC is the off-host location (1.2 TB free). ⚠ **But the local ZIPs are NOT a catalog backup**: `scripts/worksheet-gen/out` 12,752 + ~1,000 app ZIPs ≈ 27% of the 50,578 live decks, all PRE-retrofit (live deck.html rewritten 3-6×; slugs/OG/DB rows server-only). So the PC **pulls the live tree**.

- `scripts/ops/pull-deck-backup.sh` (Git Bash): `ssh … tar -czf - decks` streamed to `C:\Users\rkgen\lcs-backups\decks_<UTC>.tar.gz` — **zero bytes written on the server**; excludes `deck.html.bak.*` + `.pre-mode-rewrite-*`; verify = `gzip -t` + full `tar -tzf` + deck.html count vs live (−50 tolerance); keep 4; copies newest `db_*.sql.gz` + `studio_*.tar.gz`. Log `pull.log`.
- Task Scheduler `LCS deck backup pull` — Sun 03:00, WakeToRun, StartWhenAvailable, IgnoreNew, 4 h limit; installer `scripts/ops/install-pull-deck-backup-task.ps1`.
- Server: `backup-decks.sh` + the months-broken `backup-samples.sh` cron lines REMOVED (crontab backup `/root/crontab.pre-2026-09-11-pull.bak`); `backup-decks.sh` header marked retired; the last 67 GB tarball goes with the one-shot cleanup (`--apply`) once the first pull is verified.
- Measured: Hetzner→PC 9–10 MB/s (77 Mbit); tree excl. .bak 67.8 GB → ~40 GB gz → ~70 min; server gzip -6 does 22 MB/s so the LINK is the bottleneck, not compression.

**Traps:** ⚠ `tee >(sha256sum …)` over ssh is unsafe — bash does not wait for process substitutions, so the hash file may be unwritten when the session ends; verify with `gzip -t` + listing instead (SSH already guarantees bytes; truncation is the only real failure). ⚠ PowerShell 5.1 parses a `.ps1` as ANSI — an em-dash or `§` in a string is a parse error; keep installers ASCII. ⚠ A node `writeFileSync` of a CRLF-joined string into an LF repo file is NOT normalized by `core.autocrlf` on `git add` (the staged blob kept 1,959 CRs → a 3,916-line phantom diff); `git cat-file -p` + `tr -cd '\r' | wc -c` is the honest test (piped `git show` smudges), fix = `sed -i 's/\r$//'` before staging. ⚠ `file - | cut -c1-80` truncated ", with CRLF line terminators" — a wrong measurement that cost three more probes. ⚠ Git-Bash `ln -s` copies instead of linking.

# Part 4 — the backlog cleanup RAN (2026-09-11 ~17:00 UTC, operator: "run it yourself")

`/root/lcs-disk-cleanup-2026-09-11.sh --apply` → **203 GiB freed: 305 GB used → 102 GB used, 313 GB free (25%)**. Log `/root/cleanup-apply-2026-09-11.log`, exit 0. Removed: both server deck tarballs (134 GB — the PC holds the verified copy), 137,516 `.bak.*` (52 GB), 123 staging batches (13 GB, reports kept in `backups/staging-reports/`), /tmp waves+logs (4 GB), `public/public` (1 GB), npm/Cypress/pm2/btmp (~3 GB). Post-checks: origin 200 on hub/topic/deck/activities/tools/sitemap; a random deck per locale ×11 serves deck.html + printable PDF (bare `printable.pdf` 301s to the named file by design); 57,026 symlinks, 50,891 deck.html, 0 .bak, 0 server tarballs, dangling symlinks 1 (unchanged); pm2 3× online; nginx -t OK; **real-browser check via chrome-devtools** (sv deck renders, /en/worksheets thumbnails all 200). ⚠ `curl` to www gets a Cloudflare 403 even from the PC with a browser UA — it is bot protection, NOT an outage; verify with a real browser (chrome-devtools MCP) or origin `--resolve`.
Steady state now: catalog 61 GB + system ~40 GB; weekly growth is the only growth (housekeeping + guards live).

# Part 5 — operator rule "server disk is expensive" applied (`ec05273d`) → **87 GB used, 327 GB free (22%)**

Moved to the PC (`C:\Users\rkgen\lcs-archive\`, each verified gzip -t + entry-count before `--delete`): `/samples` 4.9 GB (3,172 entries) · `/root` session leftovers 1.2 GB (81 paths, 3,454 entries: staging, uploads, deploy logs, nginx+env backups, .sql snapshots) · untracked `publish-inbound*` + `staging-reports` 0.4 GB · `decks/.archived` · server-generated `docs/audit-results` reports (379) · historical dumps. **Deleted outright:** 1,811 superseded `<slug>-vN` dirs (2.3 GB; each cross-checked present in the PC tarball with a non-vacuity control; per-dir live-symlink guard; symlinks 57,026→57,026, dangling 1→1, deck.html 49,046 = 50,891−1,811−34 archived). **Server git checkout excludes `docs/audit-results`** (`git sparse-checkout set --no-cone '/*' '!/docs/audit-results/'`; git 2.34; `git pull` fine; docs 3.5 GB→17 MB). **DB dumps:** all 36 daily + 4 studio synced to `lcs-backups` (sizes verified), server retention 30→7 d (crontab), `pull-deck-backup.sh` now syncs every dump it lacks. New tool `scripts/ops/archive-from-server.sh` (missing path aborts — poison-tested).
**Remaining 87 GB = what the server needs:** decks 62 · frontend 5.2 (.next/cache 2.8 + node_modules 1.3 + releases) · .git 4.3 (partial-clone conversion deferred — not "completely safe") · /usr 3.7 · image-library 3.0 + webp 2.3 · /var 2.1 · umami 1.8 · landings 1.4 · /root 0.7 (pm2/npm caches).
⚠ **VACUITY TRAP hit again:** my first "0 superseded dirs missing from the tarball" compared an EMPTY list (scp target `$TMP` was unset) — added `[ n -eq 1811 ]` + a fake-name control before trusting it. ⚠ Sparse-checkout leaves MODIFIED/untracked files in the excluded dir in place — archive them, `rm -rf`, then `git sparse-checkout reapply`. ⚠ node template literals with `\` Windows paths: use a heredoc/Edit instead.
