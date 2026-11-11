#!/usr/bin/env bash
# Uploads the Teacher-only files of one language (Daily Teaching System, Part 3) from the PC to the server:
#   out/teacher-files/<loc>/…  →  /var/www/lcs-media/teacher-files/<loc>/…
#
# The folder is OUTSIDE everything nginx serves: no URL leads to these files. They are read from disk by
# GET /api/quota/dl?kind=teacher (frontend/lib/teacher-files.ts), which answers a subscriber only.
#
#   bash scripts/units/upload-teacher-files.sh en            upload
#   bash scripts/units/upload-teacher-files.sh en --check    compare what is on the server with the PC (sizes), upload nothing
#
# Built by: node scripts/units/build-guide.js --loc=<loc>   and   node scripts/sub-plans/build-pack.js --loc=<loc>
set -euo pipefail
LOC="${1:?usage: upload-teacher-files.sh <locale> [--check]}"
MODE="${2:-}"
[[ "$LOC" =~ ^[a-z]{2}$ ]] || { echo "not a locale: $LOC"; exit 1; }
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/out/teacher-files/$LOC"
[ -d "$SRC" ] || { echo "nothing built for $LOC ($SRC)"; exit 1; }
KEY="${USERPROFILE:-$HOME}/.ssh/id_ed25519"
HOST="root@65.108.5.250"
DEST="/var/www/lcs-media/teacher-files/$LOC"

LOCAL="$(cd "$SRC" && find . -type f -name '*.pdf' -printf '%P %s\n' | sort)"
[ -n "$LOCAL" ] || { echo "no PDF under $SRC"; exit 1; }
remote_list() { ssh -i "$KEY" "$HOST" "if [ -d '$DEST' ]; then cd '$DEST' && find . -type f -name '*.pdf' -printf '%P %s\n' | sort; fi"; }

if [ "$MODE" = "--check" ]; then
  if [ "$LOCAL" = "$(remote_list)" ]; then echo "$LOC: the server holds the same $(echo "$LOCAL" | wc -l) file(s) as the PC"; exit 0; fi
  echo "$LOC: the server and the PC differ"; diff <(echo "$LOCAL") <(remote_list) || true; exit 1
fi

# pack on the PC, unpack on the server into a new folder, then swap: a reader never sees a half-written tree
TAR="$(mktemp -u).tar"
tar -C "$SRC" -cf "$TAR" $(cd "$SRC" && find . -type f -name '*.pdf' -printf '%P\n')
scp -q -i "$KEY" "$TAR" "$HOST:/tmp/teacher-files-$LOC.tar"
rm -f "$TAR"
ssh -i "$KEY" "$HOST" "set -e; mkdir -p /var/www/lcs-media/teacher-files; N='$DEST.new'; rm -rf \"\$N\"; mkdir -p \"\$N\"; tar -C \"\$N\" -xf /tmp/teacher-files-$LOC.tar; rm -f /tmp/teacher-files-$LOC.tar; chown -R lcs-media:lcs-media \"\$N\"; find \"\$N\" -type d -exec chmod 755 {} +; find \"\$N\" -type f -exec chmod 644 {} +; if [ -d '$DEST' ]; then mv '$DEST' '$DEST.old'; fi; mv \"\$N\" '$DEST'; rm -rf '$DEST.old'"
if [ "$LOCAL" = "$(remote_list)" ]; then echo "$LOC: $(echo "$LOCAL" | wc -l) file(s) uploaded to $DEST"; else echo "FAIL: the server does not hold what was sent"; exit 1; fi
