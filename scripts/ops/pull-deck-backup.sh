#!/bin/bash
#
# pull-deck-backup.sh — the OFF-HOST deck backup: the PC pulls the live deck tree from Hetzner.
# Runs on the PC (Git Bash), weekly via Task Scheduler (scripts/ops/install-pull-deck-backup-task.ps1).
#
# Why this shape (2026-09-11, CLAUDE.md §A.14.6 / §A.14.12):
#   - The old backup-decks.sh wrote a ~67 GB tarball ON THE SERVER's own disk — same disk as the data
#     it protected, 67 GB of production disk, permanently. The PC (1.2 TB free) IS the second machine
#     of the two-machine system, so it is the off-host location.
#   - tar streams straight over SSH: ZERO bytes are ever written on the server.
#   - The ZIPs already on the PC are NOT a backup of the catalog (~27% coverage, all pre-retrofit);
#     the live deck.html / slugs / OG images / DB rows exist only on the server — hence this pull.
#
# What it does:
#   1. ssh: tar -czf - /var/www/lcs-media/decks (excluding deck.html.bak.* retrofit copies and the
#      dot-snapshot dirs) → <BACKUP_DIR>/decks_<UTC>.tar.gz.part   (~37 GB, ~66 min at 9.6 MB/s)
#   2. verify: gzip -t (truncation/corruption) + full tar listing + deck.html count vs the server's
#      live count (tolerates a small delta from publishes that ran during the pull)
#   3. rename .part → .tar.gz; keep the newest KEEP full copies; a failed pull leaves the previous
#      good copies untouched and the .part removed
#   4. copy the newest db_*.sql.gz + studio_*.tar.gz (small) next to it
#
# Restore: see docs/ops/server-access.md ("Deck backup — restore").
#
# Usage: pull-deck-backup.sh [--dry-run]   env: LCS_BACKUP_DIR (default /c/Users/rkgen/lcs-backups), LCS_KEEP (4)
#
set -u
DRY=0; [ "${1:-}" = "--dry-run" ] && DRY=1
HOST="root@65.108.5.250"
KEY="$HOME/.ssh/id_ed25519"
SSH="ssh -o BatchMode=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=10 -i $KEY $HOST"
BACKUP_DIR="${LCS_BACKUP_DIR:-/c/Users/rkgen/lcs-backups}"
KEEP="${LCS_KEEP:-4}"
STAMP=$(date -u +%Y%m%d_%H%M%S)
OUT="$BACKUP_DIR/decks_$STAMP.tar.gz"
LOG="$BACKUP_DIR/pull.log"
mkdir -p "$BACKUP_DIR"
exec > >(tee -a "$LOG") 2>&1
say() { printf '[%s] %s\n' "$(date -u '+%Y-%m-%d %H:%M:%S')" "$*"; }
fail() { say "FAIL: $*"; rm -f "$OUT.part"; exit 1; }

say "=== deck backup pull start (dry-run=$DRY) → $OUT"
$SSH 'true' || fail "cannot reach $HOST with $KEY"

# Live count BEFORE the pull (the tarball may contain a few more if a publish runs meanwhile).
LIVE_DECKS=$($SSH 'find /var/www/lcs-media/decks -type f -name deck.html | wc -l' | tr -dc '0-9')
LIVE_GB=$($SSH 'du -sb --exclude="deck.html.bak.*" /var/www/lcs-media/decks | cut -f1' | awk '{printf "%.1f", $1/1e9}')
say "server: $LIVE_DECKS deck.html files, ~${LIVE_GB} GB (excl. .bak copies)"
FREE_GB=$(df -BG "$BACKUP_DIR" | awk 'NR==2 {print $4}' | tr -dc '0-9')
[ "${FREE_GB:-0}" -gt 120 ] || fail "only ${FREE_GB} GB free in $BACKUP_DIR (need >120 GB headroom for a new copy + rotation)"

# The stream. pipefail so tar's own exit code comes back through ssh (1 = "file changed as we read it",
# which a concurrent publish can cause — tolerated; 2 = fatal). --warning=no-file-changed keeps that
# case quiet; gzip -6 (default) measured ~0.6 ratio on this tree.
REMOTE='set -o pipefail; cd /var/www/lcs-media && nice -n 10 tar --warning=no-file-changed --exclude="deck.html.bak.*" --exclude="decks/.pre-mode-rewrite-*" -czf - decks'
if [ $DRY = 1 ]; then
  say "[dry-run] $SSH \"$REMOTE\" > $OUT.part"
  say "[dry-run] verify: gzip -t + tar -tzf count ≈ $LIVE_DECKS; rotate to keep $KEEP; copy newest db_/studio_ dumps"
  exit 0
fi

T0=$(date +%s)
$SSH "$REMOTE" > "$OUT.part"; RC=$?
T1=$(date +%s)
[ $RC -le 1 ] || fail "remote tar exited $RC"
SIZE=$(stat -c %s "$OUT.part")
say "stream done: $((SIZE/1048576)) MB in $(( (T1-T0)/60 )) min ($(( SIZE / (T1-T0+1) / 1048576 )) MB/s), tar rc=$RC"
[ "$SIZE" -gt 1073741824 ] || fail "stream is only $SIZE bytes — not a full copy"

# Verify: integrity (truncation shows as a gzip error) + full listing + deck count.
say "verify: gzip -t ..."
gzip -t "$OUT.part" || fail "gzip -t failed (truncated or corrupt stream)"
say "verify: tar listing ..."
GOT=$(tar -tzf "$OUT.part" | grep -c '/deck\.html$') || fail "tar listing failed"
say "verify: $GOT deck.html in archive vs $LIVE_DECKS live"
[ "$GOT" -ge $((LIVE_DECKS - 50)) ] || fail "archive has $GOT deck.html but the server has $LIVE_DECKS"

mv "$OUT.part" "$OUT"
say "OK: $OUT ($((SIZE/1048576)) MB)"

# Rotate: keep the newest KEEP full copies.
ls -1t "$BACKUP_DIR"/decks_*.tar.gz 2>/dev/null | tail -n +$((KEEP+1)) | while read -r old; do say "rotate: rm $old"; rm -f "$old"; done

# Small companions: newest DB dump + Story Studio tenant tree.
for pat in 'db_*.sql.gz' 'studio_*.tar.gz'; do
  newest=$($SSH "ls -t /opt/lessoncraftstudio/backups/$pat 2>/dev/null | head -1")
  if [ -n "$newest" ]; then
    scp -q -o BatchMode=yes -i "$KEY" "$HOST:$newest" "$BACKUP_DIR/" && say "copied $(basename "$newest")"
  fi
done
ls -1t "$BACKUP_DIR"/db_*.sql.gz 2>/dev/null | tail -n +9 | xargs -r rm -f      # keep 8 DB dumps
ls -1t "$BACKUP_DIR"/studio_*.tar.gz 2>/dev/null | tail -n +5 | xargs -r rm -f  # keep 4

say "=== done. copies on disk:"; ls -lh "$BACKUP_DIR"/decks_*.tar.gz | awk '{print "   " $5 "  " $9}'
