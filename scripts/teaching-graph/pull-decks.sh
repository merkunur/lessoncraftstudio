#!/usr/bin/env bash
# Daily Teaching System, Part 1: the published catalogue as one small table, for the content graph's asset index.
#
#   bash scripts/teaching-graph/pull-decks.sh            (on the PC; read-only on the server)
#   → out/teaching-graph/decks.tsv      language, slug, exercise_type, exercise_mode, indexable (t/f), screen (1/0)
#
# One SELECT on the server (published, monolingual decks) plus a look into each page itself: does it carry a Check
# button or a celebration (screen = 1) or not (0)? The graph records what a page IS, so the hand-kept list of
# "interactive families" can be checked against it (build-assets.js reports every disagreement with
# frontend/lib/level-sets.ts pageIsInteractive). About 173,000 small reads at low priority; allow 30 to 45 minutes.
#
# The table holds no personal data: slugs and types of published worksheets.
set -euo pipefail
HOST="root@65.108.5.250"; KEY="$HOME/.ssh/id_ed25519"
OUT="$(cd "$(dirname "$0")/../.." && pwd)/out/teaching-graph"
mkdir -p "$OUT"
ssh -i "$KEY" -o BatchMode=yes -o ServerAliveInterval=30 "$HOST" 'bash -s' <<'REMOTE' | tr -d '\r' > "$OUT/decks.tsv.part"
set -euo pipefail
. /opt/lessoncraftstudio/.deploy-env
DECKS=/var/www/lcs-media/decks
PGPASSWORD="$LCS_DB_PASSWORD" psql -U lcs_user -h localhost lessoncraftstudio_prod -At -F $'\t' -c \
  "SELECT language, slug, exercise_type, COALESCE(NULLIF(exercise_mode, ''), '-'), CASE WHEN indexable THEN 't' ELSE 'f' END FROM decks WHERE status = 'published' AND content_language IS NULL ORDER BY language, slug" |
while IFS=$'\t' read -r lang slug type mode idx; do
  f="$DECKS/$lang/$slug/deck.html"
  if [ -f "$f" ] && nice -n 15 grep -q -m1 -e 'id="lcs-check"' -e 'id="lcs-celebration"' "$f"; then screen=1; else screen=0; fi
  printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$lang" "$slug" "$type" "$mode" "$idx" "$screen"
done
REMOTE
n=$(wc -l < "$OUT/decks.tsv.part")
[ "$n" -gt 100000 ] || { echo "FAIL: only $n rows came back (expected about 173,000); decks.tsv is left as it was"; rm -f "$OUT/decks.tsv.part"; exit 1; }
mv "$OUT/decks.tsv.part" "$OUT/decks.tsv"
echo "decks.tsv: $n published decks"
cut -f1 "$OUT/decks.tsv" | sort | uniq -c | tr '\n' ' '; echo
