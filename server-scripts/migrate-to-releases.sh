#!/bin/bash
# ONE-TIME migration: move the live pm2 process from serving
# frontend/.next/standalone/server.js to the zero-downtime releases/current model
# (commission #1, 2026-07-03). Run ONCE on Hetzner, then use the new deploy.sh.
#
# Causes ONE brief restart gap (a few seconds) — the last non-graceful restart;
# every subsequent deploy uses `pm2 reload` with no stop window.
set -euo pipefail

cd /opt/lessoncraftstudio/frontend

if [ -L releases/current ]; then
    echo "IDEMPOTENT: releases/current already exists — nothing to do."
    exit 0
fi

if [ ! -f .next/standalone/server.js ]; then
    echo "FATAL: .next/standalone/server.js not found — is this the right box/dir?"
    exit 1
fi

BUILD_ID="$(cat .next/standalone/.next/BUILD_ID 2>/dev/null || echo "migrated-$(date +%s)")"
echo "→ Snapshotting live standalone as releases/${BUILD_ID} (cp -a preserves symlinks + .env.production)"
mkdir -p releases
rm -rf "releases/${BUILD_ID}.tmp"
cp -a .next/standalone "releases/${BUILD_ID}.tmp"
mv "releases/${BUILD_ID}.tmp" "releases/${BUILD_ID}"

# Validate the public symlinks survived (same guard as deploy.sh)
for link in worksheet-generators admin mini-tools; do
    if [ -d "releases/${BUILD_ID}/public/${link}" ] && [ ! -L "releases/${BUILD_ID}/public/${link}" ]; then
        echo "FATAL: public/${link} copied as a directory, not a symlink — aborting (nothing changed for pm2)."
        exit 1
    fi
done

echo "→ Creating releases/current symlink (atomic)"
ln -s "/opt/lessoncraftstudio/frontend/releases/${BUILD_ID}" releases/current.tmp
mv -T releases/current.tmp releases/current

echo "→ Saving current pm2 description for rollback reference"
pm2 prettylist lessoncraftstudio > "/root/pm2-pre-releases-migration-$(date +%s).txt" || true

echo "→ Re-pointing pm2 at releases/current/server.js (cluster mode, 1 instance)"
pm2 delete lessoncraftstudio
PORT=3000 NODE_ENV=production pm2 start releases/current/server.js \
    --name lessoncraftstudio -i 1 --kill-timeout 3000 --update-env
pm2 save

echo "→ Health check..."
for i in $(seq 1 30); do
    if curl -sf http://localhost:3000 > /dev/null 2>&1; then
        echo "   ✅ Server up after ${i}s on releases/current (build ${BUILD_ID})"
        exit 0
    fi
    sleep 1
done

echo "⚠️  Server not responding after 30s — check 'pm2 logs lessoncraftstudio'."
echo "    Rollback: pm2 delete lessoncraftstudio && cd /opt/lessoncraftstudio/frontend && \\"
echo "              PORT=3000 NODE_ENV=production pm2 start .next/standalone/server.js --name lessoncraftstudio -i 1 && pm2 save"
exit 1
