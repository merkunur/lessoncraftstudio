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
