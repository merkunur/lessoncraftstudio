#!/bin/bash
#
# archive-from-server.sh — move something the server does NOT need to host onto the PC.
#
# Operator rule (2026-09-11, CLAUDE.md §A.14.12 rule 6): the Hetzner server hosts only what it
# serves or builds; backups, archives, snapshots, staging leftovers and old versions live on the
# PC. This is the one tool for that: it streams the given server paths as ONE tar.gz straight into
# C:\Users\rkgen\lcs-archive\<name>_<UTC>.tar.gz (zero bytes written on the server), verifies the
# archive (gzip -t + entry count == the server's own count), and ONLY THEN — and only with
# --delete — removes the paths on the server.
#
# Usage:  archive-from-server.sh <name> <server-path> [<server-path>…] [--delete] [--dry-run]
#   e.g.  archive-from-server.sh samples /samples --delete
#         archive-from-server.sh root-leftovers /root/staging /root/b2var-upload --delete
# Paths must be absolute. A path that does not exist on the server aborts the run (nothing is
# archived or deleted) — a typo must never silently archive "the rest".
#
set -u
HOST="root@65.108.5.250"; KEY="$HOME/.ssh/id_ed25519"
SSH="ssh -o BatchMode=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=10 -i $KEY $HOST"
ARCHIVE_DIR="${LCS_ARCHIVE_DIR:-/c/Users/rkgen/lcs-archive}"
DELETE=0; DRY=0; PATHS=(); NAME=""
for a in "$@"; do
  case "$a" in
    --delete) DELETE=1 ;;
    --dry-run) DRY=1 ;;
    *) if [ -z "$NAME" ]; then NAME="$a"; else PATHS+=("$a"); fi ;;
  esac
done
[ -n "$NAME" ] && [ ${#PATHS[@]} -gt 0 ] || { echo "usage: $0 <name> <abs-server-path>… [--delete] [--dry-run]"; exit 2; }
for p in "${PATHS[@]}"; do case "$p" in /*) ;; *) echo "FAIL: path must be absolute: $p"; exit 2;; esac; done
mkdir -p "$ARCHIVE_DIR"
LOG="$ARCHIVE_DIR/archive.log"; exec > >(tee -a "$LOG") 2>&1
say() { printf '[%s] %s\n' "$(date -u '+%Y-%m-%d %H:%M:%S')" "$*"; }
OUT="$ARCHIVE_DIR/${NAME}_$(date -u +%Y%m%d_%H%M%S).tar.gz"
Q=""; for p in "${PATHS[@]}"; do Q="$Q '$p'"; done   # single-quoted for the remote shell

say "=== archive '$NAME' from $HOST: ${PATHS[*]} → $OUT (delete=$DELETE dry=$DRY)"
# Every path must exist; count entries + bytes the same way tar will see them.
MISSING=$($SSH "for p in $Q; do [ -e \"\$p\" ] || echo \"\$p\"; done")
[ -z "$MISSING" ] || { say "FAIL: not on the server: $MISSING"; exit 1; }
COUNT=$($SSH "find $Q -mindepth 0 | wc -l" | tr -dc '0-9')
BYTES=$($SSH "du -sbc $Q | tail -1 | cut -f1" | tr -dc '0-9')
say "server: $COUNT entries, $((BYTES/1048576)) MB"
if [ $DRY = 1 ]; then say "[dry-run] would archive then $([ $DELETE = 1 ] && echo DELETE || echo keep) on the server"; exit 0; fi

# tar -P keeps absolute paths (so /samples restores to /samples); --warning=no-file-changed tolerates
# a log that grows while we read it; pipefail returns tar's exit code (0 ok, 1 = file changed, 2 fatal).
$SSH "set -o pipefail; nice -n 10 tar -P --warning=no-file-changed -czf - $Q" > "$OUT.part"; RC=$?
[ $RC -le 1 ] || { say "FAIL: remote tar exited $RC"; rm -f "$OUT.part"; exit 1; }
SIZE=$(stat -c %s "$OUT.part"); say "stream done: $((SIZE/1048576)) MB (tar rc=$RC)"
gzip -t "$OUT.part" || { say "FAIL: gzip -t (truncated/corrupt)"; rm -f "$OUT.part"; exit 1; }
GOT=$(tar -tzf "$OUT.part" | wc -l | tr -dc '0-9')
say "verify: $GOT entries in archive vs $COUNT on server"
[ "$GOT" -ge "$COUNT" ] || { say "FAIL: archive has fewer entries than the server"; rm -f "$OUT.part"; exit 1; }
mv "$OUT.part" "$OUT"; say "OK: $OUT"

if [ $DELETE = 1 ]; then
  say "deleting on the server: ${PATHS[*]}"
  $SSH "rm -rf $Q" && say "deleted; server df: $($SSH 'df -h / | tail -1')"
else
  say "kept on the server (no --delete)"
fi
