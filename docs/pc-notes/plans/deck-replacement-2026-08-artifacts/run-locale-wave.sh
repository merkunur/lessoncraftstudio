#!/bin/bash
# run-locale-wave.sh <loc> <expected_updates> <expected_inserts>
# Gated end-to-end replacement wave for one locale. Aborts on any gate mismatch.
set -u
LOC=$1; EXP_UPD=$2; EXP_INS=$3
ROOT=/root/replacement-2026-08
REPO=/opt/lessoncraftstudio
STG=$REPO/.publish-cli-staging
cd $REPO/frontend && set -a && source .env.production && set +a

echo "=== [$LOC] extract ==="
mkdir -p $ROOT/$LOC
tar xzf $ROOT/repl-$LOC.tgz -C $ROOT/$LOC || { echo "ABORT extract"; exit 1; }
N=$(ls $ROOT/$LOC/*.zip | wc -l)
echo "zips: $N"
[ "$N" -eq "$((EXP_UPD+EXP_INS))" ] || { echo "ABORT zip-count $N != $((EXP_UPD+EXP_INS))"; exit 1; }

echo "=== [$LOC] dry-run ==="
node ../scripts/publish-cli/publish-wave.js $ROOT/$LOC --locales=$LOC \
  --updates-manifest=$ROOT/updates-manifest.$LOC.json --no-db-check \
  > $ROOT/wave-$LOC-dry.log 2>&1
B=$(ls -t $STG | head -1)
U=$(grep -c 'routed=UPDATE' $STG/$B/_summary.txt)
I=$(grep -c 'routed=INSERT' $STG/$B/_summary.txt)
echo "dry-run routing: UPDATE=$U INSERT=$I (batch $B)"
[ "$U" -eq "$EXP_UPD" ] || { echo "ABORT routing UPDATE $U != $EXP_UPD"; exit 1; }
[ "$I" -eq "$EXP_INS" ] || { echo "ABORT routing INSERT $I != $EXP_INS"; exit 1; }

echo "=== [$LOC] record old-links ==="
python3 - <<PYEOF || { echo "ABORT old-links"; exit 1; }
import json, os
m=json.load(open('$ROOT/updates-manifest.$LOC.json'))
out=open('$ROOT/old-links.$LOC.tsv','w')
missing=0
for slug in sorted(set(m.values())):
    p='/var/www/lcs-media/decks/$LOC/'+slug
    try: t=os.readlink(p)
    except OSError: missing+=1; print('MISSING', slug); continue
    out.write(slug+'\t'+t+'\n')
out.close()
print('recorded', len(set(m.values()))-missing, 'missing', missing)
raise SystemExit(1 if missing else 0)
PYEOF

echo "=== [$LOC] CONFIRM wave ==="
node ../scripts/publish-cli/publish-wave.js $ROOT/$LOC --locales=$LOC \
  --updates-manifest=$ROOT/updates-manifest.$LOC.json --no-db-check --confirm \
  > $ROOT/wave-$LOC.log 2>&1
WEXIT=$?
B=$(ls -t $STG | head -1)
PUB=$(grep -c '^PUBLISHED' $STG/$B/_results.txt 2>/dev/null || echo 0)
FAIL=$(grep -c '^FAILED' $STG/$B/_results.txt 2>/dev/null || echo 0)
echo "confirm: exit=$WEXIT published=$PUB failed=$FAIL (batch $B)"
grep '^FAILED' $STG/$B/_results.txt 2>/dev/null | head -5
[ "$PUB" -ge 1 ] || { echo "ABORT nothing published"; exit 1; }
grep '^PUBLISHED' $STG/$B/_results.txt | grep -o 'slug=[^ ]*' | cut -d= -f2 > $ROOT/wave-slugs.$LOC.txt

echo "=== [$LOC] transplant dry-run ==="
node ../scripts/publish-cli/transplant-seo-head.js --locale=$LOC \
  --map=$ROOT/transplant.$LOC.txt --old-links=$ROOT/old-links.$LOC.tsv --dry-run \
  > $ROOT/transplant-$LOC-dry.log 2>&1 || { echo "ABORT transplant dry"; tail -5 $ROOT/transplant-$LOC-dry.log; exit 1; }
tail -2 $ROOT/transplant-$LOC-dry.log

echo "=== [$LOC] transplant CONFIRM ==="
node ../scripts/publish-cli/transplant-seo-head.js --locale=$LOC \
  --map=$ROOT/transplant.$LOC.txt --old-links=$ROOT/old-links.$LOC.tsv --confirm \
  > $ROOT/transplant-$LOC.log 2>&1 || { echo "ABORT transplant confirm"; tail -5 $ROOT/transplant-$LOC.log; exit 1; }
tail -2 $ROOT/transplant-$LOC.log

echo "=== [$LOC] DONE ==="
