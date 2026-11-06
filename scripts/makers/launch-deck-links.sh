#!/bin/bash
# launch-deck-links.sh — the one-time retrofit of the maker launch over every published deck (run on the server, after the
# deploy that carries the landing pages): the band above the worksheet on all decks, then the "Make your own" link of the
# action strip re-pointed at the new landings. Both scripts are idempotent; atomic writes; one locale at a time at low
# priority, so the site keeps serving. Log: /root/launch-deck-links.log (ends with DONE or a FAILED line per locale).
#
#   bash scripts/makers/launch-deck-links.sh [en de ...]      default: all eleven
set -uo pipefail
cd /opt/lessoncraftstudio || exit 1
LOCALES=("$@")
[ ${#LOCALES[@]} -gt 0 ] || LOCALES=(en de fr es pt it nl sv da no fi)
for loc in "${LOCALES[@]}"; do
  echo "== $loc ribbon $(date -u +%H:%M:%S)"
  nice -n 15 node scripts/publish-cli/inject-deck-maker-ribbon.js --locale="$loc" 2>&1 | tail -4 || echo "FAILED ribbon $loc"
  echo "== $loc actions $(date -u +%H:%M:%S)"
  nice -n 15 node scripts/publish-cli/inject-deck-actions.js --rewrite --locale="$loc" 2>&1 | tail -3 || echo "FAILED actions $loc"
done
echo "DONE $(date -u +%H:%M:%S)"
