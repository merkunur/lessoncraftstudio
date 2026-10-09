#!/usr/bin/env bash
# b7-republish-locale.sh <locale> [--confirm]
#
# nt2-G (b7) IN-PLACE republish of one locale's 22 decks (2026-10-10: the page-fill layouts + the fully painted colour
# page replaced every deck after the first publish). The pooled ZIPs sit in /var/www/lcs-media/_staging/b7-<loc>/ (scp'd
# from the PC's out/upload/wave-b7-<loc>-all); every ZIP maps to the slug it was first published under
# (/root/staging/b7/<loc>-slugs.txt, from b7-publish-locale.sh) by its id token (k395, g1412 …).
#
#   dry-run  : builds the updates manifest, runs publish-bulk --dry-run with it (every ZIP must route UPDATE, 0 errors)
#   --confirm: publish-bulk --confirm --updates-manifest → the post-publish retrofits scoped to the slugs (OG, beacon,
#              site chrome, end-of-deck links, embed-hide, deck actions, METER + check, hreflang ×11, audit) → the
#              in-place-republish audit (audit-update-injections.js: the update path writes a bare deck.html) + restore.
set -euo pipefail
LOC="${1:?locale}"; MODE="${2:-}"
ROOT=/opt/lessoncraftstudio
STAGE=/var/www/lcs-media/_staging/b7-$LOC
REC=/root/staging/b7; mkdir -p "$REC"
ALL11=en,de,nl,es,fr,it,pt,sv,da,no,fi
cd $ROOT/frontend && set -a && source .env.production && set +a && cd $ROOT
[ -d "$STAGE" ] || { echo "no staging dir $STAGE"; exit 2; }
[ -s "$REC/$LOC-slugs.txt" ] || { echo "no published slug list $REC/$LOC-slugs.txt (b7-publish-locale.sh first)"; exit 2; }
N=$(ls "$STAGE"/*.zip | wc -l)
echo "== $LOC: $N ZIPs in $STAGE"

# 0. the updates manifest: ZIP basename -> the slug it was published under (matched by the id token)
node -e '
const fs = require("fs"), path = require("path"); const [stage, slugsFile, out] = process.argv.slice(1);
const slugs = fs.readFileSync(slugsFile, "utf8").split(/\r?\n/).filter(Boolean);
const tokenOfSlug = (s) => (s.match(/-(k\d+|g[123]\d+)(?:-[a-z0-9]+)?$/) || [])[1];
const bySlugToken = {}; for (const s of slugs) { const t = tokenOfSlug(s); if (t) bySlugToken[t] = s; }
const m = {}; const missing = [];
for (const z of fs.readdirSync(stage).filter((f) => f.endsWith(".zip"))) { const t = (z.match(/-(k\d+|g[123]\d+)-/) || [])[1]; if (t && bySlugToken[t]) m[z] = bySlugToken[t]; else missing.push(z); }
if (missing.length) { console.error("no published slug for: " + missing.join(", ")); process.exit(2); }
fs.writeFileSync(out, JSON.stringify(m, null, 2)); console.log(Object.keys(m).length + " ZIPs mapped to their published slugs -> " + out);
' "$STAGE" "$REC/$LOC-slugs.txt" "$REC/$LOC-updates.json"
M=$(node -e 'console.log(Object.keys(require(process.argv[1])).length)' "$REC/$LOC-updates.json")
[ "$M" = "$N" ] || { echo "manifest covers $M of $N ZIPs"; exit 2; }

# 1. dry-run — every ZIP must route UPDATE
node scripts/publish-cli/index.js publish-bulk "$STAGE" --dry-run --updates-manifest "$REC/$LOC-updates.json" --batch-id "b7u-$LOC-dry" > "$REC/$LOC-u-dry.log" 2>&1 || true
LINE=$(grep '^\[bulk dry-run\] ZIPs:' "$REC/$LOC-u-dry.log" || true); echo "$LINE"
OK=$(echo "$LINE" | sed -n 's/.*ok=\([0-9]*\).*/\1/p'); ERR=$(echo "$LINE" | sed -n 's/.*errored=\([0-9]*\).*/\1/p')
UPD=$(grep -c 'routed=UPDATE' "$(ls -td $ROOT/.publish-cli-staging/b7u-$LOC-dry* | head -1)/_summary.txt" || true)
if [ "${OK:-x}" != "$N" ] || [ "${ERR:-1}" != "0" ] || [ "${UPD:-0}" != "$N" ]; then
  echo "DRY-RUN NOT CLEAN for $LOC (want ok=$N errored=0 UPDATE=$N; got ok=$OK errored=$ERR UPDATE=$UPD) — see $REC/$LOC-u-dry.log"; tail -20 "$REC/$LOC-u-dry.log"; exit 2
fi
echo "dry-run clean: $OK/$N UPDATE"
[ "$MODE" = "--confirm" ] || { echo "(dry-run only; re-run with --confirm)"; exit 0; }

# 2. the real in-place publish
node scripts/publish-cli/index.js publish-bulk "$STAGE" --confirm --updates-manifest "$REC/$LOC-updates.json" --batch-id "b7u-$LOC" > "$REC/$LOC-u-confirm.log" 2>&1 || { echo "publish-bulk --confirm FAILED — $REC/$LOC-u-confirm.log"; tail -30 "$REC/$LOC-u-confirm.log"; exit 2; }
grep '^\[bulk publish\] Total:' "$REC/$LOC-u-confirm.log" || true
SL="$REC/$LOC-slugs.txt"

# 3. the retrofits, scoped to the 22 slugs (the update path writes a bare deck.html)
node scripts/publish-cli/regenerate-og-images.js --slugs-file="$SL" --locales=$ALL11 > "$REC/$LOC-u-og.log" 2>&1 || { echo "OG FAILED"; tail -10 "$REC/$LOC-u-og.log"; exit 2; }
node scripts/publish-cli/inject-analytics-beacon.js --locale=$LOC > "$REC/$LOC-u-beacon.log" 2>&1 || { echo "BEACON FAILED"; tail -10 "$REC/$LOC-u-beacon.log"; exit 2; }
node scripts/publish-cli/inject-deck-site-chrome.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-u-chrome.log" 2>&1 || { echo "SITE-CHROME FAILED"; tail -10 "$REC/$LOC-u-chrome.log"; exit 2; }
node scripts/publish-cli/inject-deck-end-topic-links.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-u-endlinks.log" 2>&1 || { echo "END-LINKS FAILED"; tail -10 "$REC/$LOC-u-endlinks.log"; exit 2; }
node scripts/publish-cli/inject-embed-hide-style.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-u-embedhide.log" 2>&1 || { echo "EMBED-HIDE FAILED"; tail -10 "$REC/$LOC-u-embedhide.log"; exit 2; }
node scripts/publish-cli/inject-deck-actions.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-u-actions.log" 2>&1 || { echo "DECK-ACTIONS FAILED"; tail -10 "$REC/$LOC-u-actions.log"; exit 2; }
node scripts/publish-cli/meter-deck-downloads.js --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-u-meter.log" 2>&1 || { echo "METER FAILED"; tail -10 "$REC/$LOC-u-meter.log"; exit 2; }
node scripts/publish-cli/meter-deck-downloads.js --check --locale=$LOC --slugs-file="$SL" > "$REC/$LOC-u-meter-check.log" 2>&1 || { echo "METER CHECK FAILED"; tail -10 "$REC/$LOC-u-meter-check.log"; exit 2; }
tail -1 "$REC/$LOC-u-meter-check.log"
node scripts/publish-cli/populate-and-inject-hreflang.js --confirm --locales=$ALL11 > "$REC/$LOC-u-hreflang.log" 2>&1 || { echo "HREFLANG FAILED"; tail -10 "$REC/$LOC-u-hreflang.log"; exit 2; }
tail -1 "$REC/$LOC-u-hreflang.log"
# 4. audit — BEFORE the repoint: a landing-backed deck's canonical is the landing URL, which carries no trailing slash, so
# an audit run after the repoint reports CANONICAL_NO_TRAILING_SLASH on every deck (the b6 decks carry the same canonical;
# the first b7 publish audited before repointing and was clean)
node scripts/publish-cli/audit-deck-html.js --slugs-file="$SL" --locales=$LOC > "$REC/$LOC-u-audit.log" 2>&1 || true
tail -4 "$REC/$LOC-u-audit.log"
# 5. the canonical repoint to the landing (the first publish's deck.html carried it after repoint-deck-canonical; the update path writes a bare deck.html)
node scripts/seo-landing/repoint-deck-canonical.js --types=find-the-differences,how-to-draw --locale=$LOC > "$REC/$LOC-u-repoint.log" 2>&1 || { echo "REPOINT FAILED"; tail -10 "$REC/$LOC-u-repoint.log"; exit 2; }
tail -1 "$REC/$LOC-u-repoint.log"
echo "== $LOC REPUBLISHED — then: node scripts/publish-cli/audit-update-injections.js; bash scripts/publish-cli/restore-update-injections.sh confirm"
