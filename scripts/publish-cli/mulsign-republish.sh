#!/usr/bin/env bash
# mulsign-republish.sh <locale> <idx|noidx> [--confirm]
#
# 2026-10-31 IN-PLACE republish of the worksheet-gen pages that printed '×' where de/sv/da/no/fi schools write '·'
# (arrays-multiplication, base-ten, number-charts). Clone of b9-republish-locale.sh. The ZIPs sit in
# /var/www/lcs-media/_staging/mulsign-<loc>-<kind>/ with <loc>-<kind>-updates.json (ZIP basename -> live slug), built on
# the PC from the live manifests. Published (indexable) pages and Level Set copies (noindex) are separate folders on
# purpose: the indexable flag rides in each ZIP's manifest and must not be mixed.
#
#   dry-run  : publish-bulk --dry-run with the manifest (every ZIP must route UPDATE, 0 errors)
#   --confirm: publish-bulk --confirm --updates-manifest -> the scoped retrofits (OG, beacon, site chrome, end links,
#              embed-hide, deck actions, METER + check, hreflang x11, audit) -> canonical repoint for the published pages.
#              Then run audit-update-injections.js + restore-update-injections.sh confirm (the update path writes a bare deck.html).
set -euo pipefail
LOC="${1:?locale}"; KIND="${2:?idx|noidx}"; MODE="${3:-}"
ROOT=/opt/lessoncraftstudio
STAGE=/var/www/lcs-media/_staging/mulsign-$LOC-$KIND
REC=/root/staging/mulsign; mkdir -p "$REC"
MAN="$STAGE/updates.json"
ALL11=en,de,nl,es,fr,it,pt,sv,da,no,fi
cd $ROOT/frontend && set -a && source .env.production && set +a && cd $ROOT
[ -s "$MAN" ] || { echo "no updates manifest $MAN"; exit 2; }
N=$(ls "$STAGE"/*.zip | wc -l)
M=$(node -e 'console.log(Object.keys(require(process.argv[1])).length)' "$MAN")
[ "$M" = "$N" ] || { echo "manifest covers $M of $N ZIPs"; exit 2; }
node -e 'console.log(Object.values(require(process.argv[1])).join("\n"))' "$MAN" > "$REC/$LOC-$KIND-slugs.txt"
SL="$REC/$LOC-$KIND-slugs.txt"
echo "== $LOC $KIND: $N ZIPs"

node scripts/publish-cli/index.js publish-bulk "$STAGE" --dry-run --updates-manifest "$MAN" --batch-id "mulsign-$LOC-$KIND-dry" > "$REC/$LOC-$KIND-dry.log" 2>&1 || true
LINE=$(grep '^\[bulk dry-run\] ZIPs:' "$REC/$LOC-$KIND-dry.log" || true); echo "$LINE"
OK=$(echo "$LINE" | sed -n 's/.*ok=\([0-9]*\).*/\1/p'); ERR=$(echo "$LINE" | sed -n 's/.*errored=\([0-9]*\).*/\1/p')
UPD=$(grep -c 'routed=UPDATE' "$(ls -td $ROOT/.publish-cli-staging/mulsign-$LOC-$KIND-dry* | head -1)/_summary.txt" || true)
if [ "${OK:-x}" != "$N" ] || [ "${ERR:-1}" != "0" ] || [ "${UPD:-0}" != "$N" ]; then
  echo "DRY-RUN NOT CLEAN (want ok=$N errored=0 UPDATE=$N; got ok=$OK errored=$ERR UPDATE=$UPD) — $REC/$LOC-$KIND-dry.log"; tail -20 "$REC/$LOC-$KIND-dry.log"; exit 2
fi
echo "dry-run clean: $OK/$N UPDATE"
[ "$MODE" = "--confirm" ] || { echo "(dry-run only; re-run with --confirm)"; exit 0; }

node scripts/publish-cli/index.js publish-bulk "$STAGE" --confirm --updates-manifest "$MAN" --batch-id "mulsign-$LOC-$KIND" > "$REC/$LOC-$KIND-confirm.log" 2>&1 || { echo "publish-bulk --confirm FAILED"; tail -30 "$REC/$LOC-$KIND-confirm.log"; exit 2; }
grep '^\[bulk publish\] Total:' "$REC/$LOC-$KIND-confirm.log" || true
node scripts/publish-cli/regenerate-og-images.js --slugs-file="$SL" --locales=$ALL11 > "$REC/$LOC-$KIND-og.log" 2>&1 || { echo "OG FAILED"; tail -10 "$REC/$LOC-$KIND-og.log"; exit 2; }
node scripts/publish-cli/inject-analytics-beacon.js --locale=$LOC > "$REC/$LOC-$KIND-beacon.log" 2>&1 || { echo "BEACON FAILED"; tail -10 "$REC/$LOC-$KIND-beacon.log"; exit 2; }
node scripts/publish-cli/inject-deck-site-chrome.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-$KIND-chrome.log" 2>&1 || { echo "SITE-CHROME FAILED"; exit 2; }
node scripts/publish-cli/inject-deck-end-topic-links.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-$KIND-endlinks.log" 2>&1 || { echo "END-LINKS FAILED"; exit 2; }
node scripts/publish-cli/inject-embed-hide-style.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-$KIND-embedhide.log" 2>&1 || { echo "EMBED-HIDE FAILED"; exit 2; }
node scripts/publish-cli/inject-deck-actions.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-$KIND-actions.log" 2>&1 || { echo "DECK-ACTIONS FAILED"; exit 2; }
node scripts/publish-cli/meter-deck-downloads.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-$KIND-meter.log" 2>&1 || { echo "METER FAILED"; exit 2; }
node scripts/publish-cli/meter-deck-downloads.js --check --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-$KIND-meter-check.log" 2>&1 || { echo "METER CHECK FAILED"; tail -10 "$REC/$LOC-$KIND-meter-check.log"; exit 2; }
tail -1 "$REC/$LOC-$KIND-meter-check.log"
node scripts/publish-cli/populate-and-inject-hreflang.js --confirm --locales=$ALL11 > "$REC/$LOC-$KIND-hreflang.log" 2>&1 || { echo "HREFLANG FAILED"; exit 2; }
node scripts/publish-cli/audit-deck-html.js --slugs-file="$SL" --locales=$LOC > "$REC/$LOC-$KIND-audit.log" 2>&1 || true
tail -4 "$REC/$LOC-$KIND-audit.log"
if [ "$KIND" = "idx" ]; then
  for T in arrays-multiplication base-ten number-charts; do
    node scripts/seo-landing/repoint-deck-canonical.js --types=$T --locale=$LOC > "$REC/$LOC-repoint-$T.log" 2>&1 || { echo "REPOINT $T FAILED"; tail -5 "$REC/$LOC-repoint-$T.log"; exit 2; }
    tail -1 "$REC/$LOC-repoint-$T.log"
  done
fi
echo "== $LOC $KIND REPUBLISHED"
