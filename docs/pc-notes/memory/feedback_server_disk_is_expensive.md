---
name: feedback_server_disk_is_expensive
description: "Operator rule 2026-09-11 — the Hetzner server hosts ONLY what it serves or builds; every backup, archive, snapshot, staging leftover or old version lives on the PC (lcs-backups / lcs-archive). Never park a copy on the server."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 88de4c3a-76a3-4cc5-ae98-3a7a8f0bf91d
  modified: 2026-09-11T16:57:19.866Z
---

# The server hosts only what it serves or builds — everything else lives on the PC

Operator, verbatim (2026-09-11): *"If it is completely safe you shouldn't let anything unnecessary occupy
space on the server. If you need to backup anything that the server doesn't need to host you should use the
local disk instead of the server. The free space of the server is valuable and expensive unlike the local disk."*

**Why:** the 436 GB Hetzner disk is the scarce resource (it filled once in June and crashed Postgres; the
weekly backup guard needed 150 GB free); the PC has 1.2 TB free and IS the second machine of the two-machine
system. A backup on the same disk as the data protects nothing anyway.

**How to apply:**
- Weekly catalog copy: `scripts/ops/pull-deck-backup.sh` → `C:\Users\rkgen\lcs-backups\` (Task Scheduler
  "LCS deck backup pull", Sun 03:00). It also syncs every daily `db_*.sql.gz` the PC doesn't have.
- Anything else the server doesn't need: `scripts/ops/archive-from-server.sh <name> <path>… [--delete]` →
  `C:\Users\rkgen\lcs-archive\<name>_<UTC>.tar.gz`, verified (gzip -t + entry count) BEFORE `--delete`.
- Before a script writes a file the server will not serve: write it to the PC, or give it an expiry in
  `server-scripts/housekeeping.sh` — in the same commit (CLAUDE.md §A.14.12).
- Server keeps: the live catalog, image libraries, landings, `frontend/.next/cache` (build speed), the 3
  releases (rollback), 7 days of DB dumps, nginx logs (SEO measurement), `.git` (history for `git pull`).
- The server's checkout excludes `docs/audit-results` via `git sparse-checkout` (the PC has it).
- "Completely safe" is the operator's condition: verify each item is unreferenced (nginx, app code, symlinks)
  and has a verified PC copy before deleting; a real-browser check afterwards, not just curl.
