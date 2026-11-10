#!/usr/bin/env bash
# fl-integrate.sh — the redrawn flagship drawings into every engine, in order (docs/makers/FLAGSHIP.md, FLAGSHIP-CHECK.md).
# Run from scripts/worksheet-gen when every drawing of docs/makers/art-queue.json is accepted and locked (tools/art-guard.js).
#   bash tools/fl-integrate.sh            all passed drawings
#   bash tools/fl-integrate.sh --dry-run  print the steps only
# Every step writes only generated data (cache/, data/fl/ stores, data/d2d/index.json, data/fl/pt-fit.json); the published
# 200 designs, Level Set scenes and data/pt/index.json are untouched. After it: read the new pictures' engine sheets
# (FLAGSHIP-CHECK.md method), then the gates.
set -euo pipefail
cd "$(dirname "$0")/.."
DRY=0; [ "${1:-}" = "--dry-run" ] && DRY=1
step() { echo; echo "== $*"; [ $DRY = 1 ] || eval "$@"; }
# the temp folder with forward slashes: step() re-reads its command, which would strip Windows backslashes
FLT="$(cygpath -m "$TEMP" 2>/dev/null || echo "$TEMP")/fl"; mkdir -p "$FLT"

# 0. every accepted drawing present and unchanged
step node tools/art-guard.js --verify
# 1. the redrawn SVGs as the library's own files (cache/themes + themes-512, manifest; vocabKey null)
step node tools/fl-art.js install-drawn
# 2. the ids of the flagship drawings (the 435) for the per-picture engines
step "node -e \"const {LINEART}=require('./data/fl/designs-all.js');const m=require('./cache/manifest.json');const ids=LINEART.filter(d=>{const [t,n]=d.items[0].src.split('/');return m.themes[t]&&m.themes[t].fl&&m.themes[t].nouns[n]&&m.themes[t].nouns[n].drawn}).map(d=>d.id);require('fs').writeFileSync(process.argv[1],ids.join(','));console.log(ids.length+' redrawn pictures')\" "$FLT/drawn-ids.txt""
# 3. Dot to Dot, How to Draw, Color by Number stores for them
step node tools/fl-batch.js d2d --list="$FLT/drawn-ids.txt"
step node tools/fl-batch.js htd --list="$FLT/drawn-ids.txt"
step node tools/fl-slim.js
# the redrawn drawings' lessons are cut from their own shapes (lib/htd-steps.js splits their thin inner lines between steps)
step node tools/htd-drawn.js
step node tools/fl-slim.js
step node tools/fl-batch.js cbn --list="$FLT/drawn-ids.txt"
step "node tools/fl-cbn.js --only=\$(cat \"$FLT/drawn-ids.txt\")"
step node tools/fl-cbn-specks.js
# 4. Picture Tracing traces, Find the Differences scenes and their pins, the flip list
step node tools/fl-pt.js
step node tools/fl-fd-scenes.js
step node tools/fl-fd-build.js
step node tools/fl-fd-pins.js
# the five new faces (K-488..K-492) pin their own scenes (lib/fd-faces.js): rebuilt after the scenes change
step node tools/build-fd-face-pins.js
step node tools/fl-flip.js
# 5. the index and the derived lists the makers read
step node tools/fl-index.js
step node tools/build-d2d-index.js
step node tools/build-pt-fit.js
step node ../makers/flagship/pools.js
# 6. the measured checks of the visual check (each writes its findings; read them, refuse at the source)
step node tools/cbn-unpainted.js --library
step node ../makers/flagship/cbn-silent.js --all
step node ../makers/flagship/d2d-lookalikes.js --with-new
step node ../makers/flagship/htd-doubled.js --limit=0.85 --with-new
step node tools/art-guard.js --list-renders "> /dev/null"
echo; echo "fl-integrate: done. Next: read the new pictures on every engine's sheets, then picks.js per maker, the screen replays, the gates."
