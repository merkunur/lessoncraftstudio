#!/usr/bin/env bash
# divfix-republish.sh <locale> [--confirm]
#
# nt20-C prerequisite C3 (2026-09-14): in-place republish of the live decks the
# notation + G3-311 gap fixes changed (72 decks, 11 locales; ZIPs regenerated on
# the PC by scripts/worksheet-gen/tools/divfix-regen.js and staged under
# /var/www/lcs-media/_staging/divfix/<loc>/). Runs ON HETZNER.
#
#   1. records the current version symlink of every affected slug (rollback)
#   2. publish-bulk --dry-run WITHOUT a manifest → _collisions.txt is the DB
#      count: every ZIP must collide with a PUBLISHED slug (a ZIP with no
#      collision was never published → it is REMOVED, never INSERTed)
#   3. builds the updates manifest { "<zip>": "<existing slug>" } from it
#   4. publish-wave.js --updates-manifest=<file> (--skip-preband: printable ZIPs
#      are banded at emit time and the SEO heads are byte-equal to the live
#      ones) — dry-run, or --confirm which also runs the 9 finalization steps
#      scoped to the republished slugs (OG, alt-text, img-dims, lazy-deckend,
#      topic-slash, site-chrome, hreflang x11, noindex map, audit).
# After --confirm: repoint-deck-canonical.js --types=… --locale=<loc> (a new
# version dir is self-canonical again), refresh-deck-noindex-exempt.sh,
# indexnow-submit.js — run by the caller (see the nt20-C plan).
set -euo pipefail
LOC="${1:?locale}"; MODE="${2:-}"
ROOT=/opt/lessoncraftstudio
STAGE=/var/www/lcs-media/_staging/divfix/$LOC
REC=/root/staging/divfix; mkdir -p "$REC"
cd $ROOT/frontend && set -a && source .env.production && set +a && cd $ROOT
[ -d "$STAGE" ] || { echo "no staging dir $STAGE"; exit 2; }
N=$(ls "$STAGE"/*.zip | wc -l)
echo "== $LOC: $N ZIPs in $STAGE"

# 2. probe dry-run (no manifest) → collisions = the live rows
node scripts/publish-cli/index.js publish-bulk "$STAGE" --dry-run --batch-id "divfix-$LOC-probe" > "$REC/$LOC-probe.log" 2>&1 || true
COLL=$ROOT/.publish-cli-staging/divfix-$LOC-probe/_collisions.txt
[ -f "$COLL" ] || { echo "no _collisions.txt from the probe — see $REC/$LOC-probe.log"; tail -20 "$REC/$LOC-probe.log"; exit 2; }
node - "$COLL" "$STAGE" "$REC/$LOC-updates.json" "$LOC" <<'EOF'
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
for (const z of missing) { console.log('NOT LIVE (removing from the batch, never INSERT): ' + z); fs.renameSync(path.join(stage, z), path.join(stage, '..', loc + '.notlive-' + z)); }
if (bad.length) { console.error('REFUSE: ' + bad.join('\n')); process.exit(2); }
fs.writeFileSync(out, JSON.stringify(map, null, 1) + '\n');
console.log('updates manifest: ' + Object.keys(map).length + ' ZIP → slug mappings');
for (const [z, s] of Object.entries(map)) console.log('  ' + z + ' -> ' + s);
EOF

# 1. rollback record (after the manifest so the slug list is authoritative)
node -e "
const m=require('$REC/$LOC-updates.json'); const fs=require('fs'); const out=[];
for (const s of Object.values(m)) { let t=''; try { t=fs.readlinkSync('/var/www/lcs-media/decks/$LOC/'+s); } catch(e) { t='MISSING'; } out.push(s+'\t'+t); }
fs.writeFileSync('$REC/$LOC-oldlinks.tsv', out.join('\n')+'\n'); console.log('rollback record: '+out.length+' links → $REC/$LOC-oldlinks.tsv');"

# 4. publish-wave
if [ "$MODE" = "--confirm" ]; then
  node scripts/publish-cli/publish-wave.js "$STAGE" --locales="$LOC" --updates-manifest="$REC/$LOC-updates.json" --skip-preband --batch-id="divfix-$LOC" --confirm 2>&1 | tee "$REC/$LOC-confirm.log" | grep -E "^\[|PUBLISHED|FAIL|ERROR|HALT|routed=|✓|✗|clean|audit" | tail -60
  echo "== $LOC routed:"; grep -c "routed=UPDATE" $ROOT/.publish-cli-staging/divfix-$LOC/_results.txt || true
else
  node scripts/publish-cli/publish-wave.js "$STAGE" --locales="$LOC" --updates-manifest="$REC/$LOC-updates.json" --skip-preband --batch-id="divfix-$LOC-dry" 2>&1 | tee "$REC/$LOC-dry.log" | grep -E "ok=|collisions=|errors=|halt|HALT|ERROR|DRY-RUN complete" | tail -12
fi
