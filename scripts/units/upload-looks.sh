#!/usr/bin/env bash
# Uploads the pictures of real pages of the Teacher plan's files (Daily Teaching System, Part 11.6) from the PC:
#   out/teaching-looks/<loc>/*.webp  →  /var/www/lcs-media/teaching-looks/<loc>/
# served at /teaching-looks/<loc>/ (scripts/units/patch-nginx-teaching-looks.py). Built by scripts/units/build-looks.js.
#
#   bash scripts/units/upload-looks.sh en            add the pictures of today's build (nothing is removed: the live
#                                                    pages still show the pictures of the build before, until the deploy)
#   bash scripts/units/upload-looks.sh en --check    every picture the looks file names is on the server, same size
#   bash scripts/units/upload-looks.sh en --prune    AFTER the deploy: remove pictures the looks file no longer names
set -euo pipefail
LOC="${1:?usage: upload-looks.sh <locale> [--check|--prune]}"
MODE="${2:-}"
[[ "$LOC" =~ ^[a-z]{2}$ ]] || { echo "not a locale: $LOC"; exit 1; }
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/out/teaching-looks/$LOC"
[ -d "$SRC" ] || { echo "nothing built for $LOC ($SRC)"; exit 1; }
KEY="${USERPROFILE:-$HOME}/.ssh/id_ed25519"
HOST="root@65.108.5.250"
DEST="/var/www/lcs-media/teaching-looks/$LOC"

LOCAL="$(cd "$SRC" && find . -maxdepth 1 -type f -name '*.webp' -printf '%P %s\n' | sort)"
[ -n "$LOCAL" ] || { echo "no picture under $SRC"; exit 1; }
remote_list() { ssh -i "$KEY" "$HOST" "if [ -d '$DEST' ]; then cd '$DEST' && find . -maxdepth 1 -type f -name '*.webp' -printf '%P %s\n' | sort; fi"; }

if [ "$MODE" = "--check" ]; then
  MISSING="$(comm -23 <(echo "$LOCAL") <(remote_list))"
  if [ -z "$MISSING" ]; then echo "$LOC: the server holds all $(echo "$LOCAL" | wc -l) picture(s) of the PC"; exit 0; fi
  echo "$LOC: not on the server (or another size):"; echo "$MISSING"; exit 1
fi
if [ "$MODE" = "--prune" ]; then
  KEEP="$(cd "$SRC" && find . -maxdepth 1 -type f -name '*.webp' -printf '%P\n' | sort)"
  OLD="$(comm -13 <(echo "$KEEP") <(remote_list | cut -d' ' -f1))"
  [ -n "$OLD" ] || { echo "$LOC: nothing to remove"; exit 0; }
  for f in $OLD; do [[ "$f" =~ ^[a-z0-9.-]+\.webp$ ]] || { echo "refusing an unexpected name: $f"; exit 1; }; done
  ssh -i "$KEY" "$HOST" "cd '$DEST' && rm -f $(echo $OLD | tr '\n' ' ')"
  echo "$LOC: removed $(echo "$OLD" | wc -l) old picture(s)"; exit 0
fi

TAR="$(mktemp -u).tar"
tar -C "$SRC" -cf "$TAR" $(cd "$SRC" && find . -maxdepth 1 -type f -name '*.webp' -printf '%P\n')
scp -q -i "$KEY" "$TAR" "$HOST:/tmp/teaching-looks-$LOC.tar"
rm -f "$TAR"
ssh -i "$KEY" "$HOST" "set -e; mkdir -p '$DEST'; tar -C '$DEST' -xf /tmp/teaching-looks-$LOC.tar; rm -f /tmp/teaching-looks-$LOC.tar; chown -R lcs-media:lcs-media /var/www/lcs-media/teaching-looks; find /var/www/lcs-media/teaching-looks -type d -exec chmod 755 {} +; find /var/www/lcs-media/teaching-looks -type f -exec chmod 644 {} +"
MISSING="$(comm -23 <(echo "$LOCAL") <(remote_list))"
if [ -z "$MISSING" ]; then echo "$LOC: $(echo "$LOCAL" | wc -l) picture(s) on the server at $DEST"; else echo "FAIL: the server does not hold what was sent"; echo "$MISSING"; exit 1; fi
