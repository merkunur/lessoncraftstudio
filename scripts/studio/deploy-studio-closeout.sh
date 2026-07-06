#!/bin/bash
#
# deploy-studio-closeout.sh — ONE command finishing the Story Studio deploy
# =========================================================================
# Everything up to the production-mutation line is already done (git pulled,
# mini-tools + storybook-library copied, /var/www/lcs-media/studio created,
# nginx already at client_max_body_size 50M ≥ the 40MB SEP cap — no change).
# This script runs the remaining production steps in the §A.5.1/§14.6 order:
#
#   1. git pull (idempotent; picks up anything newer)
#   2. re-sync the studio mini-tools files + storybook-library (idempotent,
#      BEFORE the build per the §20.4 manifest race)
#   3. prisma migrate deploy   (the additive studio_* tables)
#   4. bash deploy.sh          (generate + build + zero-downtime reload + smoke)
#   5. §14.6 two-step: served copies of the 29 apps + catalog-export.js
#   6. install the studio backup cron line (§A.14.6)
#   7. post-deploy curls (gate walls + static assets + sentinel)
#
# USAGE (on Hetzner):  bash /opt/lessoncraftstudio/scripts/studio/deploy-studio-closeout.sh
#
set -e
cd /opt/lessoncraftstudio

echo "== 1/7 git pull =="
git pull

echo "== 2/7 mini-tools sync (pre-build) =="
for f in storybook-studio.html storybook.html storybook-player.js storybook-audio.js \
         studio-core.js studio-canvas.js studio-inspector.js studio-generator-bridge.js \
         studio-generators.json studio-tour.js; do
  cp "mini tools/$f" /var/www/lcs-media/mini-tools/
done
cp -r "mini tools/storybook-library" /var/www/lcs-media/mini-tools/
chown -R lcs-media:lcs-media /var/www/lcs-media/mini-tools/storybook-library
mkdir -p /var/www/lcs-media/studio/stories
chown -R lcs-media:lcs-media /var/www/lcs-media/studio

echo "== 3/7 prisma migrate deploy =="
cd frontend
set -a; source .env.production; set +a
npx prisma migrate deploy
cd ..

echo "== 4/7 deploy.sh =="
bash deploy.sh

echo "== 5/7 two-step: 29 apps + catalog-export.js served copies =="
APPS="addition alphabet-train big-small bingo chart-count code-addition crossword cryptogram \
find-and-count find-objects grid-match matching math-puzzle math-worksheet missing-pieces \
more-less odd-one-out pattern-train pattern-worksheet picture-path picture-sort prepositions \
shadow-match subtraction sudoku treasure-hunt word-guess word-scramble wordsearch"
for a in $APPS; do
  cp "/opt/lessoncraftstudio/REFERENCE APPS/$a.html" "/tmp/$a.html"
  /var/www/lcs-media/scripts/update-worksheet.sh "/tmp/$a.html" "$a.html" >/dev/null
  rm -f "/tmp/$a.html"
done
cp "/opt/lessoncraftstudio/REFERENCE TRANSLATIONS/catalog-export.js" /tmp/catalog-export.js
/var/www/lcs-media/scripts/update-worksheet.sh /tmp/catalog-export.js js/catalog-export.js >/dev/null
rm -f /tmp/catalog-export.js
echo "   synced 29 apps + js/catalog-export.js"

echo "== 6/7 backup cron =="
chmod +x /opt/lessoncraftstudio/scripts/studio/backup-studio.sh
if ! crontab -l 2>/dev/null | grep -q backup-studio.sh; then
  (crontab -l 2>/dev/null; echo '30 1 * * 0 /opt/lessoncraftstudio/scripts/studio/backup-studio.sh >> /var/log/lessoncraftstudio-backup.log 2>&1') | crontab -
  echo "   cron line installed (Sun 1:30 AM)"
else
  echo "   cron line already present"
fi

echo "== 7/7 post-deploy checks (localhost origin — bypasses Cloudflare) =="
fail=0
chk() { # url, expected status, grep (optional)
  local code
  code=$(curl -s -o /tmp/chk.out -w '%{http_code}' "http://127.0.0.1:3000$1")
  if [ "$code" != "$2" ]; then echo "   FAIL $1 -> $code (want $2)"; fail=1; else
    if [ -n "$3" ] && ! grep -q "$3" /tmp/chk.out; then echo "   FAIL $1 missing '$3'"; fail=1; else echo "   OK   $1 ($code)"; fi
  fi
}
chk "/en/studio" 200 "noindex"
chk "/api/studio/ping" 401
chk "/api/play/nosuchlink00/story.json" 404
chk "/de/studio" 200
sv=$(curl -s "http://127.0.0.1:3000/mini-tools/studio-generators.json" | grep -c 'Suchsel' || true)
[ "$sv" -ge 1 ] && echo "   OK   studio-generators.json (DE review live)" || { echo "   FAIL studio-generators.json stale"; fail=1; }
lib=$(curl -s "http://127.0.0.1:3000/mini-tools/storybook-library/manifest.json" | grep -c '"backgrounds"' || true)
[ "$lib" -ge 1 ] && echo "   OK   storybook-library/manifest.json" || { echo "   FAIL library manifest"; fail=1; }
ce=$(curl -s "https://www.lessoncraftstudio.com/worksheet-generators/js/catalog-export.js" | grep -c "wantCropUI" || true)
[ "$ce" -ge 1 ] && echo "   OK   served catalog-export.js carries the 'ui' sentinel" || echo "   WARN catalog-export.js edge copy not yet refreshed (Cloudflare TTL — recheck in 5 min)"
v40=$(curl -s "https://www.lessoncraftstudio.com/worksheet-generators/word-guess.html" | grep -c "catalog-export.js?v=40" || true)
[ "$v40" -ge 1 ] && echo "   OK   word-guess serves ?v=40" || echo "   WARN word-guess edge copy not yet refreshed (recheck in 5 min)"

echo ""
if [ "$fail" = "0" ]; then
  echo "DONE. Next (live tenant verification, ~25 assertions):"
  echo "  server:  cd /opt/lessoncraftstudio/frontend && set -a && source .env.production && set +a && node ../scripts/studio/mint-test-session.js"
  echo "  PC:      LCS_BASE_URL=https://www.lessoncraftstudio.com LCS_TEST_TOKEN=<token> node scripts/storybook/prove-studio-tenant.js"
  echo "  server:  node ../scripts/studio/mint-test-session.js --revoke   (afterwards)"
else
  echo "DONE WITH FAILURES — see FAIL lines above."
  exit 1
fi
