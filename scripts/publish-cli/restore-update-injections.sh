#!/bin/bash
# restore-update-injections.sh — restore what an in-place republish dropped (list from audit-update-injections.js):
#  - the TEACHING BLOCK, rebuilt from the page's CURRENT version (derive -> build -> inject, no holdout: these pages had one);
#    never copied from the old version — its picture list / instruction can be stale (2026-10-04: an old block named
#    "Slide, Rocket, Truck and Bucket" on a page showing Swing, Rocket, Train, Car)
#  - lcs-meter-js (inject-meter.js, scoped to the listed slugs)
# Usage (Hetzner): node scripts/publish-cli/audit-update-injections.js; bash scripts/publish-cli/restore-update-injections.sh [confirm]
cd /opt/lessoncraftstudio/scripts/publish-cli
MODE=${1:-dry}
LIST=${LIST:-/root/lost-inj.txt}
for l in en de es fr it pt nl sv da no fi; do
  grep "^$l " $LIST | grep " TB" | awk '{print $2}' > /tmp/rui-tb-$l.txt
  grep "^$l " $LIST | grep "METER" | awk '{print $2}' > /tmp/rui-meter-$l.txt
  if [ -s /tmp/rui-tb-$l.txt ]; then
    node -e '
const fs=require("fs");const {deriveOne}=require("./derive-teaching-facts.js");const l=process.argv[1];const D="/var/www/lcs-media/decks/"+l+"/";
const out=[];const bad=[];for(const s of fs.readFileSync("/tmp/rui-tb-"+l+".txt","utf8").trim().split("\n")){const f=deriveOne(D+fs.readlinkSync(D+s));if(!f||!f.worksheetType||f.slug!==s){bad.push(s);continue}out.push(f);}
fs.writeFileSync("/tmp/rui-facts-"+l+".json",JSON.stringify(out));console.log(l,"facts",out.length,"not rebuildable",bad.length,bad.slice(0,3).join(" "));' $l
    node build-teaching-blocks.js --family=printable --locale=$l --facts=/tmp/rui-facts-$l.json --out=/tmp/rui-blocks-$l.json | tail -1
    node inject-deck-teaching-block.js --locale=$l --blocks=/tmp/rui-blocks-$l.json $([ "$MODE" = confirm ] || echo --dry-run) | grep -E "applied|failed"
  fi
  if [ -s /tmp/rui-meter-$l.txt ] && [ "$MODE" = confirm ]; then node inject-meter.js --locale=$l --slugs-file=/tmp/rui-meter-$l.txt | grep -E "failed"; fi
done
rm -f /tmp/rui-*
