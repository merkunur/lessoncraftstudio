#!/usr/bin/env bash
# b5-publish-locale.sh <locale> [--confirm]
#
# nt10-E Phase 7 (clone of b3-publish-locale.sh, 2026-09-21): INSERT-publish of one locale's pooled b5 wave
# (the 10 base + up to 50 variation printable decks generated on the PC into
# scripts/worksheet-gen/out/upload/wave-b5-<loc>-all/ and scp'd to
# /var/www/lcs-media/_staging/b5-<loc>/). Runs ON HETZNER. The nt20-B recipe
# (memory project_nt20b_worksheet_types.md, README b5-designs step 9), scripted:
#
#   dry-run  : publish-bulk --dry-run → ok must equal the ZIP count, collisions
#              0, errored 0, no halts — else STOP (exit 2) and read the staging
#              artefacts it names.
#   --confirm: publish-bulk --confirm → the new slugs (from "[publish] Slug:" on
#              stderr) → regenerate-og-images (--locales = ALL 11: the default is
#              en,es,pt) → populate-and-inject-hreflang --confirm --locales=<11>
#              (cross-locale siblings) → audit-deck-html --slugs-file --locales=<loc>.
# After --confirm on every locale the caller pushes + deploys the landings, then
# repoint-deck-canonical.js --types=<10 keys> --locale=<loc>,
# refresh-deck-noindex-exempt.sh and indexnow-submit.js (see the plan).
set -euo pipefail
LOC="${1:?locale}"; MODE="${2:-}"
ROOT=/opt/lessoncraftstudio
STAGE=/var/www/lcs-media/_staging/b5-$LOC
REC=/root/staging/b5; mkdir -p "$REC"
ALL11=en,de,nl,es,fr,it,pt,sv,da,no,fi
cd $ROOT/frontend && set -a && source .env.production && set +a && cd $ROOT
[ -d "$STAGE" ] || { echo "no staging dir $STAGE"; exit 2; }
N=$(ls "$STAGE"/*.zip | wc -l)
echo "== $LOC: $N ZIPs in $STAGE"

# 1. dry-run — every ZIP must route INSERT cleanly
node scripts/publish-cli/index.js publish-bulk "$STAGE" --dry-run --batch-id "b5-$LOC-dry" > "$REC/$LOC-dry.log" 2>&1 || true
LINE=$(grep '^\[bulk dry-run\] ZIPs:' "$REC/$LOC-dry.log" || true)
echo "$LINE"
OK=$(echo "$LINE" | sed -n 's/.*ok=\([0-9]*\).*/\1/p'); COLL=$(echo "$LINE" | sed -n 's/.*collisions=\([0-9]*\).*/\1/p')
ERR=$(echo "$LINE" | sed -n 's/.*errored=\([0-9]*\).*/\1/p'); TH=$(echo "$LINE" | sed -n 's/.*theme_halts=\([0-9]*\).*/\1/p'); MH=$(echo "$LINE" | sed -n 's/.*exercise_mode_halts=\([0-9]*\).*/\1/p')
if [ "${OK:-x}" != "$N" ] || [ "${COLL:-1}" != "0" ] || [ "${ERR:-1}" != "0" ] || [ "${TH:-1}" != "0" ] || [ "${MH:-1}" != "0" ]; then
  echo "DRY-RUN NOT CLEAN for $LOC (want ok=$N collisions=0 errored=0 halts=0) — see $REC/$LOC-dry.log and the staging artefacts:"; grep -A4 'Inspect:' "$REC/$LOC-dry.log" || true; tail -30 "$REC/$LOC-dry.log"; exit 2
fi
echo "dry-run clean: $OK/$N INSERT, 0 collisions"
[ "$MODE" = "--confirm" ] || { echo "(dry-run only; re-run with --confirm)"; exit 0; }

# 2. real publish
node scripts/publish-cli/index.js publish-bulk "$STAGE" --confirm --batch-id "b5-$LOC" > "$REC/$LOC-confirm.log" 2>&1 || { echo "publish-bulk --confirm FAILED — $REC/$LOC-confirm.log"; tail -30 "$REC/$LOC-confirm.log"; exit 2; }
grep '^\[bulk publish\] Total:' "$REC/$LOC-confirm.log" || true
grep '^\[publish\] Slug: ' "$REC/$LOC-confirm.log" | sed 's/^\[publish\] Slug: //; s/ (collision.*//' > "$REC/$LOC-slugs.txt"
S=$(wc -l < "$REC/$LOC-slugs.txt"); echo "published slugs: $S (want $N) → $REC/$LOC-slugs.txt"
[ "$S" = "$N" ] || { echo "SLUG COUNT $S != $N — inspect $REC/$LOC-confirm.log before going on"; exit 2; }
grep -c 'collision; suffixed' "$REC/$LOC-confirm.log" | sed 's/^/suffixed slugs: /' || true

# 3. OG images (all 11 locales named — the script's default is en,es,pt)
node scripts/publish-cli/regenerate-og-images.js --slugs-file="$REC/$LOC-slugs.txt" --locales=$ALL11 > "$REC/$LOC-og.log" 2>&1 || { echo "OG FAILED — $REC/$LOC-og.log"; tail -20 "$REC/$LOC-og.log"; exit 2; }
tail -3 "$REC/$LOC-og.log"
# 4. hreflang siblings across every locale
node scripts/publish-cli/populate-and-inject-hreflang.js --confirm --locales=$ALL11 > "$REC/$LOC-hreflang.log" 2>&1 || { echo "HREFLANG FAILED — $REC/$LOC-hreflang.log"; tail -20 "$REC/$LOC-hreflang.log"; exit 2; }
tail -3 "$REC/$LOC-hreflang.log"
# 4b. publish-wave STEP 6b + 6c — the bX-publish-locale scripts skipped them, so ~420 printable decks per locale
#     shipped without the site header/footer (fixed catalogue-wide 2026-09-23). Both are idempotent per locale.
node scripts/publish-cli/inject-analytics-beacon.js --locale=$LOC > "$REC/$LOC-beacon.log" 2>&1 || { echo "BEACON FAILED — $REC/$LOC-beacon.log"; tail -10 "$REC/$LOC-beacon.log"; exit 2; }
node scripts/publish-cli/inject-deck-site-chrome.js --locale=$LOC --slugs-file="$REC/$LOC-slugs.txt" > "$REC/$LOC-chrome.log" 2>&1 || { echo "SITE-CHROME FAILED — $REC/$LOC-chrome.log"; tail -10 "$REC/$LOC-chrome.log"; exit 2; }
tail -1 "$REC/$LOC-chrome.log"
# 5. audit the new decks
node scripts/publish-cli/audit-deck-html.js --slugs-file="$REC/$LOC-slugs.txt" --locales=$LOC > "$REC/$LOC-audit.log" 2>&1 || true
tail -6 "$REC/$LOC-audit.log"
echo "== $LOC DONE — slugs in $REC/$LOC-slugs.txt"
