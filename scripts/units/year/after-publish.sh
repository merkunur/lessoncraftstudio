#!/usr/bin/env bash
# After a batch of "Year pages" (Daily Teaching System, Part 12.2) is published with publish-wave --noindex:
# everything the batch recipe asks for after the publish, in one run from the PC.
#
#   bash scripts/units/year/after-publish.sh <prefix> <codes>
#     <prefix>  the wave prefix of the batch (yma, ymb, ymc ...); its staging folder on the server is removed
#     <codes>   the type codes of the batch, comma separated, as they stand in a page address (g1439,k451)
#
# What it does:
#   1. server: counts the published pages of the codes per language and fails when one of them is indexable
#   2. server: removes /var/www/lcs-media/_staging/<prefix> and its .preband-backup twin
#   3. server: exports the ladders; PC: renders the class sheet of every code in every language and uploads them
#   4. PC: adds the new pages to out/teaching-graph/decks.tsv (rows read from the database) and rebuilds the
#      asset index of the content graph, then runs its gates and the type work list
# It commits nothing: read the output, then commit frontend/content/teaching-graph/assets and the work list.
set -euo pipefail
PREFIX="${1:?usage: after-publish.sh <prefix> <codes>}"
CODES="${2:?usage: after-publish.sh <prefix> <codes>}"
[[ "$PREFIX" =~ ^[a-z]{2,6}$ ]] || { echo "not a prefix: $PREFIX"; exit 1; }
[[ "$CODES" =~ ^[a-z0-9]+(,[a-z0-9]+)*$ ]] || { echo "not a list of codes: $CODES"; exit 1; }
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
KEY="${USERPROFILE:-$HOME}/.ssh/id_ed25519"
HOST="root@65.108.5.250"
ALT="$(echo "$CODES" | tr ',' '|')"

echo "== 1+2. the pages in the database; the staging folder"
ssh -i "$KEY" "$HOST" "PREFIX='$PREFIX' ALT='$ALT' bash -s" <<'REMOTE'
set -euo pipefail
. /opt/lessoncraftstudio/.deploy-env
WHERE="status='published' AND content_language IS NULL AND slug ~ ('-(' || '$ALT' || ')(-|\$)')"
PGPASSWORD="$LCS_DB_PASSWORD" psql -U lcs_user -h localhost lessoncraftstudio_prod -At -c "SELECT language || ' ' || count(*) || (CASE WHEN bool_or(indexable) THEN ' INDEXABLE' ELSE '' END) FROM decks WHERE $WHERE GROUP BY language ORDER BY language" | tr '\n' ';'; echo
if PGPASSWORD="$LCS_DB_PASSWORD" psql -U lcs_user -h localhost lessoncraftstudio_prod -At -c "SELECT 1 FROM decks WHERE $WHERE AND indexable LIMIT 1" | grep -q 1; then echo "FAIL: a page of the batch is indexable"; exit 1; fi
# the rows for the PC's catalogue table: language, slug, exercise_type, level word, indexable, and whether the PAGE has
# a screen version, read from the page itself as scripts/teaching-graph/pull-decks.sh does (a Check button or a
# celebration). The first version of this script wrote 0 for every page and then accused 91 playable pages.
PGPASSWORD="$LCS_DB_PASSWORD" psql -U lcs_user -h localhost lessoncraftstudio_prod -At -F $'\t' -c "SELECT language, slug, exercise_type, COALESCE(NULLIF(exercise_mode, ''), '-'), CASE WHEN indexable THEN 't' ELSE 'f' END FROM decks WHERE $WHERE ORDER BY 1, 2" > "/tmp/$PREFIX-rows.raw"
: > "/tmp/$PREFIX-rows.tsv"
while IFS=$'\t' read -r lang slug type mode idx; do
  f="/var/www/lcs-media/decks/$lang/$slug/deck.html"
  if [ -f "$f" ] && grep -q -m1 -e 'id="lcs-check"' -e 'id="lcs-celebration"' "$f"; then screen=1; else screen=0; fi
  printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$lang" "$slug" "$type" "$mode" "$idx" "$screen" >> "/tmp/$PREFIX-rows.tsv"
done < "/tmp/$PREFIX-rows.raw"
rm -f "/tmp/$PREFIX-rows.raw"
echo "rows: $(wc -l < "/tmp/$PREFIX-rows.tsv"); with a screen: $(cut -f6 "/tmp/$PREFIX-rows.tsv" | grep -c 1 || true)"
rm -rf "/var/www/lcs-media/_staging/$PREFIX" "/var/www/lcs-media/_staging/$PREFIX.preband-backup"
echo "staging folders left: $(ls /var/www/lcs-media/_staging | wc -l)"
rm -rf /root/ladders
cd /opt/lessoncraftstudio && node scripts/worksheet-gen/tools/level-set/export-ladders.js --locales=all --out=/root/ladders | tail -1
REMOTE

echo "== 3. class sheets"
scp -q -i "$KEY" "$HOST:/root/ladders/*.json" "$ROOT/scripts/worksheet-gen/out/ladders/"
ssh -i "$KEY" "$HOST" "rm -rf /root/ladders"
(cd "$ROOT" && node scripts/worksheet-gen/tools/level-set/teacher-sheet.js --ladders=scripts/worksheet-gen/out/ladders --locales=all --codes="$CODES" | tail -11)
TAR="$(mktemp -u).tar"
( cd "$ROOT/scripts/worksheet-gen/out/teacher-sheets" && LIST=""; for l in en de es fr it pt nl sv da no fi; do for c in $(echo "$CODES" | tr ',' ' '); do [ -f "$l/$c-teacher-sheet.pdf" ] && LIST="$LIST $l/$c-teacher-sheet.pdf"; done; done; tar -cf "$TAR" $LIST; echo "class sheets: $(tar -tf "$TAR" | wc -l)" )
scp -q -i "$KEY" "$TAR" "$HOST:/tmp/$PREFIX-sheets.tar"; rm -f "$TAR"
ssh -i "$KEY" "$HOST" "set -e; cd /var/www/lcs-media/level-sets && tar -xf /tmp/$PREFIX-sheets.tar && rm -f /tmp/$PREFIX-sheets.tar && chown -R lcs-media:lcs-media /var/www/lcs-media/level-sets && echo uploaded"

echo "== 4. the catalogue table and the asset index"
scp -q -i "$KEY" "$HOST:/tmp/$PREFIX-rows.tsv" "$ROOT/out/teaching-graph/$PREFIX-rows.tsv"
ssh -i "$KEY" "$HOST" "rm -f /tmp/$PREFIX-rows.tsv"
cd "$ROOT"
node -e "
const fs = require('fs');
const f = 'out/teaching-graph/decks.tsv';
const cur = fs.readFileSync(f, 'utf8');
const key = (l) => l.split('\t').slice(0, 2).join('\t');
// a row of the batch that the table already holds is REPLACED (a second run after a fix must be able to correct it)
const rows = fs.readFileSync('out/teaching-graph/' + process.argv[1] + '-rows.tsv', 'utf8').split('\n').filter(Boolean);
const fresh = new Map(rows.map((l) => [key(l), l]));
let changed = 0;
const kept = cur.split('\n').filter(Boolean).map((l) => { const n = fresh.get(key(l)); if (n === undefined) return l; fresh.delete(key(l)); if (n !== l) changed++; return n; });
const add = [...fresh.values()];
fs.writeFileSync(f, kept.concat(add).join('\n') + '\n');
console.log('decks.tsv: ' + add.length + ' row(s) added, ' + changed + ' corrected');
" "$PREFIX"
node scripts/teaching-graph/build-assets.js | tail -1
# The site calls a never-indexed page playable by its FAMILY (frontend/config/interactive-level-set-types.ts). A batch of
# PDF-only pages in a playable family would get cards that promise a screen: the first two batches did (2026-11-13,
# 2,607 pages) until their codes were listed as print-only variations. build-assets.js writes every such page to
# out/teaching-graph/screen-rule.txt; a page of THIS batch in that file fails the run.
WRONG="$(grep -c -E -- "-($ALT)(-|	)" out/teaching-graph/screen-rule.txt || true)"
if [ "$WRONG" != "0" ]; then
  echo "FAIL: the site would show $WRONG page(s) of this batch as playable on screen although they are not (or the reverse)."
  echo "      List their codes under their family in LEVEL_SET_PRINT_ONLY_VARIATIONS (frontend/config/interactive-level-set-types.ts), run build-assets.js again, and deploy:"
  grep -E -- "-($ALT)(-|	)" out/teaching-graph/screen-rule.txt | cut -f3,5 | sort | uniq -c
  exit 1
fi
node scripts/teaching-graph/gates.js | tail -1
node scripts/units/year/type-work-list.js | head -1
for l in en de sv; do node scripts/units/assemble.js --loc=$l --check | tail -1; done
echo "done: commit frontend/content/teaching-graph/assets, scripts/units/year/type-work-list.math.json and docs/daily-teaching-system/year/TYPE-WORK-LIST.math.md"
