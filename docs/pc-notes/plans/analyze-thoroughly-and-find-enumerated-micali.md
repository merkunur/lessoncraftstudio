# Part 5 — "Server disk is expensive; anything the server doesn't need to host lives on the PC" (2026-09-11)

> Parts 1–4 are done: 203 GiB freed (313 GB free), root causes fixed and deployed, weekly PC pull of the
> catalog in place, server holds no backups. This part turns the operator's principle into a standing rule
> and applies it to everything still on the server that the server does not need.

## Context

Operator (verbatim): *"If it is completely safe you shouldn't let anything unnecessary occupy space on the
server. If you need to backup anything that the server doesn't need to host you should use the local disk
instead of the server. The free space of the server is valuable and expensive unlike the local disk."*

Everything below was measured live and verified safe (nothing serving the site reads it; nothing on the
server needs it after it has a verified copy on the PC).

## The standing rule (goes into CLAUDE.md §A.14.12 as rule 6 + a feedback memory)

**The server hosts only what it serves or builds. Everything else — backups, archives, snapshots, one-off
staging, old versions, records — lives on the PC (`C:\Users\rkgen\lcs-backups\` for the weekly catalog
pull, `C:\Users\rkgen\lcs-archive\` for cold archives). Before any script writes a file the server will not
serve, it either writes it to the PC or gives it an expiry. Never park a copy "just in case" on the server.**

## What moves off the server now (≈ 16 GB → ~330 GB free) — all verified safe

| Item | Size | Why safe | Where it goes |
|---|---|---|---|
| `/samples` (root, Jan-2026 upload) | 4.9 GB | nginx aliases `/samples/` → `/var/www/lcs-media/samples/`, which does not exist; served by nothing (the only refs are two `.bak` nginx configs) | `lcs-archive\samples_<stamp>.tar.gz` |
| 1,811 superseded deck version dirs (`<slug>-v1` where the symlink points at `-v2`+) | 3.8 GB | not linked by any of the 57,026 symlinks; every one is inside the verified PC tarball `decks_20260911_144618.tar.gz`; DB reads are slug-derived (§8.1) | already on the PC — delete only |
| `docs/audit-results` checkout on the server (11,214 QA PNGs) | 3.5 GB | nothing server-side reads them (the 5 scripts that mention the dir WRITE reports and run ad hoc); the PC has the full checkout | git **sparse-checkout** excludes the dir on the server (reversible: `git sparse-checkout disable`) |
| `/root` session leftovers (`staging/`, `b2var-upload*`, `postgres-backups/`, `*.sql`, `*-deploy.log`, `nginx-backups/`, `tracing-fix-staging/`, `*.preband-backup`) | 1.2 GB | June–Sept one-off staging and logs; the published output is live in `decks/` | `lcs-archive\root-leftovers_<stamp>.tar.gz` |
| `publish-inbound/`, `publish-inbound.smm-variant-original/` (untracked) | 0.4 GB | untracked logs/JSON from May–June publishes; `git ls-files` = 0 | `lcs-archive\publish-inbound_<stamp>.tar.gz` |
| `backups/pre-deploy-*.sql.gz` older than 7 d (86 files) + `db_*.sql.gz` older than 7 d | ~2.4 GB | the PC pull now copies EVERY daily dump it doesn't have yet; the server keeps 7 days for a quick same-day restore | cron retention 30 d → 7 d; dumps synced to `lcs-backups\` |
| `decks/.archived/` (unpublished decks) + `backups/staging-reports/` | 30 MB | records, not served | `lcs-archive\…` |

**Stays on the server (it needs them):** the live catalog (64 GB), image libraries (5.3 GB), landings, `frontend/.next/cache` (2.8 GB — the build cache; removing it costs 5–8 min on every deploy), the 3 releases (rollback), `node_modules`, umami, Postgres, nginx logs (SEO measurement), 7 days of DB dumps, `.git` (4.3 GB — history is needed by `git pull`; shrinking it means a partial-clone conversion, not "completely safe" → deferred, noted).

## Mechanism

- NEW `scripts/ops/archive-from-server.sh <name> <server-path>…` (PC, Git Bash): streams `tar -czf -` of the
  paths into `C:\Users\rkgen\lcs-archive\<name>_<UTC>.tar.gz`, verifies (`gzip -t` + entry count == server
  `find | wc -l`), and only with `--delete` removes the paths on the server afterwards. Reusable for every
  future "the server doesn't need this" case.
- `scripts/ops/pull-deck-backup.sh`: copy **all** `db_*.sql.gz` not yet present locally (was: newest only).
- Server crontab: the two retention lines `-mtime +30` → `-mtime +7`.
- Server git: `git sparse-checkout set --no-cone '/*' '!/docs/audit-results/'` (git 2.34.1 supports it);
  deploy.sh's `git pull` is unaffected; `docs/ops/server-access.md` records how to undo.
- Superseded version dirs: recomputed fresh at execution (`find` version dirs not targeted by any
  symlink, excluding `.archived`), cross-checked against the PC tarball listing before deletion.
- CLAUDE.md §A.14.12 rule 6 + `feedback_server_disk_is_expensive.md` memory + §A.3-style note that
  `lcs-archive` is where cold data goes.

## Order
1. Rule → CLAUDE.md + memory (so it survives this session even if something below is deferred).
2. Write `archive-from-server.sh`; dry-run; archive `/samples`, `/root` leftovers, `publish-inbound*`,
   `.archived`, `staging-reports` (≈ 6.6 GB → ~12 min at 9 MB/s); verify each; then `--delete`.
3. Superseded dirs: recompute, verify all present in the PC tarball listing, delete.
4. Sparse-checkout on the server; confirm `git pull` still works and the site is untouched.
5. Retention cron edit + pull script change; commit + push; pull onto the server (no deploy needed).
6. Final `df`, origin health, real-browser check; record in memory.

## Verification
- Each archive: `gzip -t` OK, entry count equals the server-side count before deletion, size sane.
- `ls -d /samples /root/staging …` → gone; `df -h /` ≈ 330 GB free.
- Deck checks as in Part 4 (origin 200s, one random deck per locale, 57,026 symlinks, 0 dangling beyond the
  pre-existing 1, 50,891 − 1,811 = 49,080 deck.html files).
- `git -C /opt/lessoncraftstudio status` clean of errors; `git sparse-checkout list` shows the exclusion;
  `ls docs/audit-results` absent; `git pull` returns "Already up to date".
- `crontab -l` shows `+7`; `pull-deck-backup.sh --dry-run` lists the db-sync step.
- Real browser: a deck page + the worksheets hub render.
