#!/usr/bin/env bash
# htdguide-republish.sh <locale> <pool> [--confirm]      pool = ls | k401
#
# 2026-10-13: in-place republish of every How to Draw deck that prints DOTTED guide shapes. The fitted ellipses did not
# match the library drawings (a child had lines to erase); these pages now draw a lesson DRAWN from the shapes
# (scripts/worksheet-gen/data/htdv, lib/htd-vector.js, gate qa/verify-htd-guides.js). ZIPs regenerated on the PC
# (cli.js generate --types=… --force) and staged under /var/www/lcs-media/_staging/htdguide/<loc>/<pool>/:
#   ls    the 35 Level Set decks (K-396 L1, K-401 L1-3, G2-391 L1) — never indexed: published with --noindex
#   k401  the published K-401 "Draw a Dog with Simple Shapes" deck — landing-backed: repointed to its landing after
# Runs ON HETZNER. Cloned from starterfix-republish.sh (the proven in-place flow):
#   1. publish-bulk --dry-run WITHOUT a manifest → _collisions.txt: every ZIP must collide with a PUBLISHED slug (a ZIP
#      with no collision was never published → it is REMOVED, never INSERTed)
#   2. the updates manifest { "<zip>": "<existing slug>" } + a rollback record of every slug's version symlink
#   3. publish-wave.js --updates-manifest (--skip-preband) — dry-run, or --confirm (+ the finalization steps)
# After --confirm (both pools): node scripts/publish-cli/audit-update-injections.js;
#   bash scripts/publish-cli/restore-update-injections.sh confirm   (the update path writes a bare deck.html)
set -euo pipefail
LOC="${1:?locale}"; POOL="${2:?pool ls|k401}"; MODE="${3:-}"
case "$POOL" in ls) NOIDX=--noindex ;; k401) NOIDX= ;; *) echo "pool must be ls or k401"; exit 2 ;; esac
ROOT=/opt/lessoncraftstudio
STAGE=/var/www/lcs-media/_staging/htdguide/$LOC/$POOL
REC=/root/staging/htdguide; mkdir -p "$REC"
TAG="htdg-$POOL-$LOC"
cd $ROOT/frontend && set -a && source .env.production && set +a && cd $ROOT
[ -d "$STAGE" ] || { echo "no staging dir $STAGE"; exit 2; }
N=$(ls "$STAGE"/*.zip | wc -l)
echo "== $LOC/$POOL: $N ZIPs in $STAGE"

# 1. probe dry-run (no manifest) → collisions = the live rows
node scripts/publish-cli/index.js publish-bulk "$STAGE" --dry-run --batch-id "$TAG-probe" > "$REC/$TAG-probe.log" 2>&1 || true
COLL=$ROOT/.publish-cli-staging/$TAG-probe/_collisions.txt
[ -f "$COLL" ] || { echo "no _collisions.txt from the probe — see $REC/$TAG-probe.log"; tail -20 "$REC/$TAG-probe.log"; exit 2; }
node - "$COLL" "$STAGE" "$REC/$TAG-updates.json" "$LOC" <<'EOF'
const fs = require('fs'), path = require('path');
const [coll, stage, out, loc] = process.argv.slice(2);
const txt = fs.readFileSync(coll, 'utf8');
const zips = fs.readdirSync(stage).filter((f) => f.endsWith('.zip'));
const map = {}; const bad = [];
for (const block of txt.split(/\n(?=ZIP: )/)) {
  const m = block.match(/^ZIP: (\S+)[\s\S]*?existing slug:\s+(\S+)[\s\S]*?existing status:\s+(\S+)/);
  if (!m) continue;
  if (m[3] !== 'published') { bad.push(m[1] + ' collides with a ' + m[3] + ' row (' + m[2] + ')'); continue; }
  map[m[1]] = m[2];
}
const missing = zips.filter((z) => !map[z]);
if (missing.length) { console.error('REFUSE (not live, would INSERT): ' + missing.join(', ')); process.exit(2); }
if (bad.length) { console.error('REFUSE: ' + bad.join('\n')); process.exit(2); }
fs.writeFileSync(out, JSON.stringify(map, null, 1) + '\n');
console.log('updates manifest: ' + Object.keys(map).length + ' ZIP → slug mappings');
EOF
M=$(node -e 'console.log(Object.keys(require(process.argv[1])).length)' "$REC/$TAG-updates.json")
[ "$M" = "$N" ] || { echo "manifest covers $M of $N ZIPs"; exit 2; }

# 2. rollback record
node -e "
const m=require('$REC/$TAG-updates.json'); const fs=require('fs'); const out=[];
for (const s of Object.values(m)) { let t=''; try { t=fs.readlinkSync('/var/www/lcs-media/decks/$LOC/'+s); } catch(e) { t='MISSING'; } out.push(s+'\t'+t); }
fs.writeFileSync('$REC/$TAG-oldlinks.tsv', out.join('\n')+'\n'); console.log('rollback record: '+out.length+' links → $REC/$TAG-oldlinks.tsv');"
node -e "console.log(Object.values(require('$REC/$TAG-updates.json')).join('\n'))" > "$REC/$TAG-slugs.txt"

# 3. publish-wave
if [ "$MODE" = "--confirm" ]; then
  node scripts/publish-cli/publish-wave.js "$STAGE" --locales="$LOC" --updates-manifest="$REC/$TAG-updates.json" --skip-preband $NOIDX --batch-id="$TAG" --confirm 2>&1 | tee "$REC/$TAG-confirm.log" | grep -E "^\[|PUBLISHED|FAIL|ERROR|HALT|routed=|clean|audit" | tail -40
  echo "== $LOC/$POOL routed UPDATE: $(grep -c 'routed=UPDATE' $ROOT/.publish-cli-staging/$TAG/_results.txt || true) of $N"
  if [ "$POOL" = "k401" ]; then
    node scripts/seo-landing/repoint-deck-canonical.js --types=how-to-draw --locale=$LOC 2>&1 | tail -1
  fi
else
  node scripts/publish-cli/publish-wave.js "$STAGE" --locales="$LOC" --updates-manifest="$REC/$TAG-updates.json" --skip-preband $NOIDX --batch-id="$TAG-dry" 2>&1 | tee "$REC/$TAG-dry.log" | grep -E "ok=|collisions=|errors=|halt|HALT|ERROR|DRY-RUN complete" | tail -12
fi
