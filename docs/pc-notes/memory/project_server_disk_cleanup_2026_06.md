---
name: project-server-disk-cleanup-2026-06
description: "Server-wide safe disk cleanup 2026-06-08 (~77 GB reclaimed, 86%→67%) + durable anti-regrowth fixes; the recurring reclaimable locations + the URGENT no-offsite-backup gap"
metadata: 
  node_type: memory
  type: project
  originSessionId: add6803a-fa3f-494e-a1e2-4c6705c960ef
---

**Hetzner server (`65.108.5.250`) disk cleanup 2026-06-08** after a 3-agent read-only audit. Disk **86% (62 GB free) → 67% (139 GB free), ~77 GB reclaimed** (block-level; some backup dirs were hardlinked so apparent `du` size > actual freed). App stayed **online** throughout; all live decks + endpoints 200.

## What was reclaimed (the recurring candidates — re-check these next time)
- **`/opt/lessoncraftstudio/.publish-cli-staging/`** — per-publish batch staging dirs (~3.5–4 GB each); keep the 2 newest, `rm -rf` older. Same disposable class as `publish-inbound/*-wave`. Was 30 GB / 8 batches.
- **`/opt/lessoncraftstudio/backups/pre-deploy-*.sql.gz`** — deploy.sh writes a full-DB snapshot before EVERY deploy; had **1,627 files back to Jan 25** (no retention). Pruned to last 30 days (1627→632). Now retention-managed (see fix below).
- **`/var/www/lcs-media/backups/`** — one-time pre-change safety backups for the **May 28–31 description-banding + title-overhaul + SEO-migration arc** (decks-predesc 40G / premigration 7.4G / pretitle 4.4G / title-overhaul-×6); that arc shipped+verified+superseded by 3 deck waves → deleted (59 GB apparent, ~29 GB actual freed due to hardlinks). Dir now empty.
- **`/opt/lessoncraftstudio/backups/republish-de-1780181084`** (1.4 GB stale), **systemd journal** (vacuumed 4 GB→560 MB), **npm cache** `/root/.npm/_cacache` (1.3 GB), **pm2 error log** (`pm2 flush`, 370 MB of 404-spam→1.5 MB), **puppeteer cache** `/root/.cache/puppeteer` (612 MB), **`/var/log/btmp.1`** (190 MB), **stale `/tmp`** (de-wave staging, 10 `*-samples.tar.gz`, scaling-arc-5, old seo-audit JSONs, ~5 GB).

## Durable anti-regrowth fixes applied (so it doesn't pile up again)
1. **Cron** (root): `0 4 * * 0 find /opt/lessoncraftstudio/backups -name 'pre-deploy-*.sql.gz' -mtime +30 -delete` (mirrors the existing `db_*` cleanup line — the gap that let 1,627 accumulate).
2. **journald**: `SystemMaxUse=1G` in `/etc/systemd/journald.conf` + `systemctl restart systemd-journald` (was uncapped).
3. **pm2-logrotate** installed (3.0.0, online): `max_size=50M`, `retain=7`, `compress=true`.

## DO-NOT-TOUCH / flagged
- **100 GB deck tarballs** `/opt/lessoncraftstudio/backups/decks_*.tar.gz` (3, KEEP_VERSIONS=3) — **the SOLE disaster-recovery copies; kept untouched.**
- **⚠️ URGENT GAP — NO OFFSITE BACKUP.** Root cron has only LOCAL backups (`backup-decks.sh` weekly, `db_` daily, samples weekly); no rclone/s3/b2/rsync-offsite, no `aws`/`b2` binaries. Per §A.14.6 a backup gap is URGENT (catastrophic FS loss = unrecoverable). The 100 GB local tarballs do NOT protect against disk/host failure. **Recommend a separate off-host-backup commission** (Hetzner Storage Box / B2 via rclone). NOT actioned here.
- DB is healthy (98 MB, only trivial bloat — autovacuum handles it); `.next` is the live build (do not delete while serving); §A.3 protected asset trees untouched.

## Method note
Audited via 3 parallel read-only Explore agents (filesystem / logs+caches / Postgres) + direct `plink` ground-truthing (reconciled an agent disagreement on the 125 GB `/opt/.../backups` composition: 100 GB tarballs + 24.3 GB pre-deploy SQL + 0.5 GB db_ + 1.4 GB republish-de). Cross-ref CLAUDE.md §A.14.6, §A.3, §A.5.1; [[project-norwegian-deck-wave]], [[project-danish-deck-wave]].
