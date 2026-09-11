# Server access + secrets (credential rotation 2026-07-03)

Both production credentials that previously lived in plaintext in this repo
(DB password in deploy.sh/docs; root SSH password in runbooks/CLAUDE.md) were
**rotated on 2026-07-03** and removed from every tracked file. The old values
are dead. This doc is the current access contract — it contains NO secrets.

## SSH — key auth (the standard channel)

```
ssh  -i %USERPROFILE%/.ssh/id_ed25519 root@65.108.5.250 "<command>"
scp  -i %USERPROFILE%/.ssh/id_ed25519 <local> root@65.108.5.250:<remote>
```
- The ed25519 public key is installed in `/root/.ssh/authorized_keys`.
- Host key (unchanged): `SHA256:zGvE6IIIBmoCYDkeCqseB4CHA9Uxdl0d1Wh31QAY1jU` (pinned in known_hosts).
- plink/pscp `-pw` password auth is retired (the .ppk copy of the key is
  passphrase-protected; use Windows OpenSSH). Historical docs showing
  `plink -pw REDACTED-ROTATED-…` are dead examples — translate to the ssh form.

## Root password (console/fallback only)

Rotated 2026-07-03. Stored ONLY at:
- PC: `%USERPROFILE%\.lcs-secrets\hetzner-root-password.txt`
- Server: `/root/.root-password-rotated-2026-07-03` (600)
Never put it in a command line, doc, or commit. Password auth remains enabled
on sshd purely as a lockout fallback.

## DB credentials — server-side env include

- **File:** `/opt/lessoncraftstudio/.deploy-env` (root:root **600**, gitignored)
  containing `export LCS_DB_PASSWORD='…'`.
- **Consumers:** `deploy.sh` (sources it and FAILS FAST if missing),
  `server-scripts/post-deploy-smoke.sh`, the nightly pg_dump crontab line,
  `scripts/final-regression.sh`, and the diacritics maintenance scripts
  (`server-scripts/*-db-diacritics*.js` read `process.env.LCS_DB_PASSWORD`).
- The Next.js app + publish-cli read `DATABASE_URL` from
  `frontend/.env.production` (server-side file, not in git) — updated at
  rotation; each release carries its own copy (`frontend/releases/<id>/.env.production`).
- **Manual psql:** `source /opt/lessoncraftstudio/.deploy-env && PGPASSWORD="$LCS_DB_PASSWORD" psql -U lcs_user -d lessoncraftstudio_prod`

## Rotating again (runbook)

1. `NEW=$(openssl rand -hex 20)`
2. Update `/opt/lessoncraftstudio/.deploy-env` + `frontend/.env.production` +
   `frontend/.env` + every `frontend/releases/*/.env.production` (sed the old value).
3. `sudo -u postgres psql -c "ALTER USER lcs_user WITH PASSWORD '<NEW>';"`
4. `pm2 reload lessoncraftstudio --update-env` immediately (window between 3
   and 4 is the only moment new DB connections could fail).
5. Verify: fresh psql with new password; old refused; site 200; nightly cron
   line references the env include (no inline secret).
Root password: `echo "root:<NEW>" | chpasswd` via a key-auth session; update
the two storage locations above; verify key auth still works BEFORE closing
the session.

## Disk hygiene — hand-installed pieces (2026-09-11; CLAUDE.md §A.14.12)

Two things live outside git on the server. If the box is ever rebuilt, reinstall both.

1. **Weekly housekeeping cron** (root crontab; Sun 04:30, after the 01:00 deck backup and
   the 04:00 DB-dump prunes):
   ```
   30 4 * * 0 /opt/lessoncraftstudio/server-scripts/housekeeping.sh >> /var/log/lessoncraftstudio-housekeeping.log 2>&1
   ```
   Preview any time with `bash server-scripts/housekeeping.sh --dry-run`.
2. **`/tmp` expiry** — Ubuntu's default (`D /tmp 1777 root root -`) cleans `/tmp` only at boot,
   and this server goes months between reboots. `/etc/tmpfiles.d/lcs-tmp-age.conf`:
   ```
   # LCS 2026-09-11: expire /tmp entries untouched for 14 days (systemd-tmpfiles-clean.timer runs daily)
   D /tmp 1777 root root 14d
   ```
   Nothing long-lived uses `/tmp` (pm2 → `/root/.pm2`, Postgres socket → `/var/run`). Stage
   wave ZIPs under `/var/www/lcs-media/_staging/<wave>/`, not `/tmp`.

Also hand-set the same day: `journald` `SystemMaxUse=300M` (`/etc/systemd/journald.conf`).
The one-shot backlog cleanup that preceded these is `/root/lcs-disk-cleanup-2026-09-11.sh`
(dry-run by default, `--apply` to run); `deploy.sh` now refuses to build below 20 GB free.

## Deck backup — the PC pulls it (2026-09-11)

**No deck tarball lives on the server any more.** Every Sunday 03:00 (local) the PC's Task Scheduler job
`LCS deck backup pull` runs `scripts/ops/pull-deck-backup.sh` (Git Bash), which streams
`tar -czf - decks` over SSH straight into `C:Userskgenlcs-backupsdecks_<UTC>.tar.gz` (~40 GB,
~75 min at the measured 9 MB/s), verifies it (`gzip -t` + full listing + deck.html count vs the
server's live count), keeps the newest 4, and copies the newest `db_*.sql.gz` + `studio_*.tar.gz`
alongside. Log: `C:Userskgenlcs-backupspull.log`. Re-register the task with
`powershell -ExecutionPolicy Bypass -File scriptsopsinstall-pull-deck-backup-task.ps1`.
`backup-decks.sh` on the server is retired (manual use only; its cron line and the broken
`backup-samples.sh` line were removed — the samples dir has been empty since the seller-era teardown).

**Restore** (a lost deck tree; the DB rows are in the daily `db_*.sql.gz`):
```
scp -i %USERPROFILE%/.ssh/id_ed25519 C:Userskgenlcs-backupsdecks_<stamp>.tar.gz root@65.108.5.250:/tmp/
ssh -i %USERPROFILE%/.ssh/id_ed25519 root@65.108.5.250 "tar -xzf /tmp/decks_<stamp>.tar.gz -C /var/www/lcs-media/ && chown -R lcs-media:lcs-media /var/www/lcs-media/decks && rm /tmp/decks_<stamp>.tar.gz && find /var/www/lcs-media/decks -maxdepth 2 -xtype l | wc -l"
```
(The last command counts dangling symlinks — expect 0 or 1; the archive preserves the `<slug> → <slug>-vN`
symlinks.) A single deck can be pulled out with `tar -xzf … decks/<locale>/<slug>-vN`. The archive
excludes `deck.html.bak.*` retrofit copies and `.pre-mode-rewrite-*` snapshots on purpose.
