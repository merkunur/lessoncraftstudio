#!/bin/bash
# update-flagship-art.sh — a DELIBERATE fix to one protected flagship drawing on the server (the counterpart of
# update-worksheet.sh / update-design-element.sh: unlock → copy → re-lock). Never used by deploys.
#
# The fix is made on the PC first: `art-guard.js --unlock=<noun>` → change the drawing → `art-guard.js --lock` →
# commit + push docs/makers/art-lock.json. This script refuses a master whose SHA-1 is not the one in that committed
# lock (/opt/lessoncraftstudio/docs/makers/art-lock.json), so nothing can replace a drawing by accident.
#
# Usage: update-flagship-art.sh <noun> <new-master.svg> [<new-render.webp>]
#   the render, when given, replaces the served makers-assets/themes-512/<theme>/<noun>@3x.webp recorded for <noun>
set -e
MEDIA=/var/www/lcs-media
HOME_DIR=$MEDIA/flagship-art
LOCK=/opt/lessoncraftstudio/docs/makers/art-lock.json
NOUN="${1:-}"; SRC="${2:-}"; RENDER="${3:-}"
[ -n "$NOUN" ] && [ -f "$SRC" ] || { echo "Usage: $0 <noun> <new-master.svg> [<new-render.webp>]"; exit 1; }
case "$NOUN" in *[!a-z0-9_]*) echo "ERROR: not a drawing name: $NOUN"; exit 1 ;; esac

WANT=$(node -e 'const l=require(process.argv[1]);process.stdout.write(l.files[process.argv[2]]||"")' "$LOCK" "$NOUN")
[ -n "$WANT" ] || { echo "ERROR: $NOUN is not in the committed lock ($LOCK) — lock it on the PC and push first"; exit 1; }
GOT=$(sha1sum "$SRC" | cut -d' ' -f1)
[ "$GOT" = "$WANT" ] || { echo "ERROR: $SRC (sha1 $GOT) is not the drawing the committed lock names ($WANT)"; exit 1; }

T="$HOME_DIR/drawn/$NOUN.svg"
mkdir -p "$HOME_DIR/drawn"
[ -f "$T" ] && chattr -i "$T"
cp "$SRC" "$T"; chown lcs-media:lcs-media "$T"; chmod 444 "$T"; chattr +i "$T"
node -e 'const fs=require("fs");const f=process.argv[1];const l=fs.existsSync(f)?JSON.parse(fs.readFileSync(f,"utf8")):{files:{}};l.files[process.argv[2]]=process.argv[3];l.count=Object.keys(l.files).length;fs.writeFileSync(f+".tmp",JSON.stringify(l,null,1)+"\n");fs.renameSync(f+".tmp",f)' "$HOME_DIR/art-lock.json" "$NOUN" "$WANT"
node -e 'const l=require(process.argv[1]);for(const [n,h] of Object.entries(l.files))console.log(h+"  "+n+".svg")' "$HOME_DIR/art-lock.json" > "$HOME_DIR/masters.sha1"
echo "master $NOUN.svg replaced and locked ($WANT)"

if [ -n "$RENDER" ]; then
  [ -f "$RENDER" ] || { echo "ERROR: render not found: $RENDER"; exit 1; }
  REL=$(grep -h "/$NOUN@3x\.webp$" "$HOME_DIR/renders.wanted.sha1" 2>/dev/null | head -1 | cut -d' ' -f3-)
  [ -n "$REL" ] || { echo "ERROR: no served render is recorded for $NOUN"; exit 1; }
  H=$(sha1sum "$RENDER" | cut -d' ' -f1)
  R="$MEDIA/$REL"
  [ -f "$R" ] && chattr -i "$R"
  mkdir -p "$(dirname "$R")"; cp "$RENDER" "$R"; chown lcs-media:lcs-media "$R"; chattr +i "$R"
  for f in renders.wanted.sha1 renders.protected.sha1; do
    p="$HOME_DIR/$f"; [ -f "$p" ] || continue
    grep -v "  $REL\$" "$p" > "$p.tmp" || true; echo "$H  $REL" >> "$p.tmp"; mv "$p.tmp" "$p"; chown lcs-media:lcs-media "$p"
  done
  echo "render $REL replaced and locked ($H)"
fi
