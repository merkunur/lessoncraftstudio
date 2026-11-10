#!/usr/bin/env bash
#
# upload-flagship-art.sh — puts the accepted flagship drawings into the server's isolated, immutable storage
# (server-scripts/protect-flagship-art.sh). Runs on the PC (Git Bash). The drawings never go through git (operator
# 2026-11-08: "images should never be pushed to git"); they travel by ssh like the image library did.
#
#   1. checks the PC's drawings against the lock (art-guard.js --verify) and lists the served renders with their SHA-1
#      (art-guard.js --list-renders: refuses a render older than its drawing — re-render first)
#   2. streams drawn/<locked>.svg + art-lock.json + renders.sha1 to /var/www/lcs-media/_staging/flagship-art
#   3. runs protect-flagship-art.sh on the server (it verifies the stage again, installs only new masters, locks them,
#      locks the renders already served and removes the stage)
#
# Run it AFTER the deploy that brings the committed lock and the maker release (deploy.sh then locks the renders that
# arrive in later releases by itself). Usage: upload-flagship-art.sh [--dry-run]
#
set -euo pipefail
DRY=0; [ "${1:-}" = "--dry-run" ] && DRY=1
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
HOST="root@65.108.5.250"; KEY="$HOME/.ssh/id_ed25519"
SSH="ssh -o BatchMode=yes -i $KEY $HOST"
GUARD="$REPO/scripts/worksheet-gen/tools/art-guard.js"
WORK=$(mktemp -d); trap 'rm -rf "$WORK"' EXIT

node "$GUARD" --verify
node "$GUARD" --list-renders > "$WORK/renders.sha1" || { echo "upload-flagship-art: REFUSED — re-render the drawings listed above first"; exit 1; }
mkdir -p "$WORK/drawn"
cp "$REPO/docs/makers/art-lock.json" "$WORK/art-lock.json"
node -e 'for (const n of Object.keys(require(process.argv[1]).files)) console.log(n)' "$(cygpath -m "$WORK/art-lock.json" 2>/dev/null || echo "$WORK/art-lock.json")" \
  | while read -r n; do cp "$REPO/scripts/worksheet-gen/art-src/drawn/$n.svg" "$WORK/drawn/"; done
echo "upload-flagship-art: $(ls "$WORK/drawn" | wc -l) drawings, $(grep -c . "$WORK/renders.sha1") renders"
if [ $DRY = 1 ]; then echo "dry run: nothing sent"; exit 0; fi

$SSH 'rm -rf /var/www/lcs-media/_staging/flagship-art && mkdir -p /var/www/lcs-media/_staging/flagship-art'
tar -C "$WORK" -cf - drawn art-lock.json renders.sha1 | $SSH 'tar -xf - -C /var/www/lcs-media/_staging/flagship-art'
$SSH 'bash /opt/lessoncraftstudio/server-scripts/protect-flagship-art.sh'
