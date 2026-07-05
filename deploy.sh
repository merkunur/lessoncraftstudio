#!/bin/bash

# LessonCraftStudio Deployment Script
# This script handles the complete deployment process for Next.js standalone mode
#
# CRITICAL: Next.js standalone mode requires manual copying of static files!
# After building, we MUST copy:
# 1. .next/static → .next/standalone/.next/static (CSS, JS, fonts, etc.)
# 2. public → .next/standalone/public (images, static files)
#
# Without these copies, the website will have NO CSS/JavaScript!
#
# ============================================
# SAMPLE PROTECTION
# ============================================
# This script NEVER touches /opt/lessoncraftstudio/samples/
# Samples are served directly by nginx and survive all deployments
# See CLAUDE.md for sample management procedures

set -e  # Exit on any error

# ============================================
# SECRETS — server-side env include (NOT in git)
# ============================================
# Credential rotation 2026-07-03: DB credentials live in
# /opt/lessoncraftstudio/.deploy-env (root:root 600, gitignored), created by
# the rotation runbook. This script and the cron jobs source it; no secret is
# hardcoded in the repo anymore.
DEPLOY_ENV="/opt/lessoncraftstudio/.deploy-env"
if [ ! -f "$DEPLOY_ENV" ]; then
    echo "FATAL: $DEPLOY_ENV missing — create it (export LCS_DB_PASSWORD='...') before deploying."
    exit 1
fi
# shellcheck disable=SC1090
source "$DEPLOY_ENV"
if [ -z "${LCS_DB_PASSWORD:-}" ]; then
    echo "FATAL: LCS_DB_PASSWORD not set by $DEPLOY_ENV."
    exit 1
fi

echo "=========================================="
echo "LessonCraftStudio Deployment Script"
echo "=========================================="
echo ""

# ============================================
# SAMPLE PROTECTION - ISOLATED STORAGE
# ============================================
# Samples are stored in /var/www/lcs-media/samples/ - COMPLETELY ISOLATED
# from this deployment. This script CANNOT touch them.
echo "🔒 Sample protection: files in /var/www/lcs-media/samples/ (isolated)"
SAMPLE_COUNT=$(find /var/www/lcs-media/samples -name "*.jpeg" 2>/dev/null | wc -l)
WEBP_COUNT=$(find /var/www/lcs-media/samples -name "*.webp" 2>/dev/null | wc -l)
echo "   Found $SAMPLE_COUNT JPEG files, $WEBP_COUNT WebP files"
echo "   (Samples are managed via content manager - zero is valid)"
echo "✅ Samples are protected in isolated storage"
echo ""

# ============================================
# IMAGE LIBRARY PROTECTION - ISOLATED STORAGE
# ============================================
# Source PNG images are stored in /var/www/lcs-media/image-library/
# This is COMPLETELY ISOLATED from the code repository
echo "🔒 Image library protection check..."
IMAGE_LIB_COUNT=$(find /var/www/lcs-media/image-library -type f -name "*.png" 2>/dev/null | wc -l)
if [ "$IMAGE_LIB_COUNT" -lt 3000 ]; then
    echo ""
    echo "⛔ CRITICAL: Image library protection check FAILED!"
    echo "   Expected: 3000+ PNG files"
    echo "   Found: $IMAGE_LIB_COUNT files"
    echo ""
    echo "   The source image library may be missing or corrupted."
    echo "   Check: /var/www/lcs-media/image-library/"
    echo "   Or run: /opt/lessoncraftstudio/server-scripts/protect-image-library.sh"
    echo ""
    exit 1
fi
echo "   Found $IMAGE_LIB_COUNT PNG files in isolated storage"
echo "✅ Image library protected"
echo ""

# ============================================
# WORKSHEET & CONTENT MANAGER PROTECTION - ISOLATED STORAGE
# ============================================
echo "🔒 Worksheet generator protection check..."
WG_HTML_COUNT=$(find /var/www/lcs-media/worksheet-generators -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
WG_JS_COUNT=$(find /var/www/lcs-media/worksheet-generators/js -name "*.js" -type f 2>/dev/null | wc -l)
ADMIN_COUNT=$(find /var/www/lcs-media/admin-panels -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)

if [ "$WG_HTML_COUNT" -lt 30 ]; then
    echo ""
    echo "⛔ CRITICAL: Worksheet generator protection check FAILED!"
    echo "   Expected: 30+ HTML files"
    echo "   Found: $WG_HTML_COUNT files"
    echo ""
    echo "   Check: /var/www/lcs-media/worksheet-generators/"
    echo "   Or run: /opt/lessoncraftstudio/server-scripts/setup-worksheet-isolation.sh"
    echo ""
    exit 1
fi

if [ "$WG_JS_COUNT" -lt 30 ]; then
    echo ""
    echo "⛔ CRITICAL: Translation JS protection check FAILED!"
    echo "   Expected: 30+ JS files"
    echo "   Found: $WG_JS_COUNT files"
    echo ""
    echo "   Check: /var/www/lcs-media/worksheet-generators/js/"
    echo ""
    exit 1
fi

echo "   Found $WG_HTML_COUNT HTML apps, $WG_JS_COUNT JS translations, $ADMIN_COUNT admin panels"

# ============================================
# DESIGN ELEMENTS PROTECTION - ISOLATED STORAGE
# ============================================
echo "🔒 Design elements protection check..."
DE_SVG_COUNT=$(find /var/www/lcs-media/design-elements -name "*.svg" -type f 2>/dev/null | wc -l)

if [ "$DE_SVG_COUNT" -lt 70 ]; then
    echo ""
    echo "⛔ CRITICAL: Design elements protection check FAILED!"
    echo "   Expected: 70+ SVG files"
    echo "   Found: $DE_SVG_COUNT files"
    echo ""
    echo "   Check: /var/www/lcs-media/design-elements/"
    echo "   Or run: /opt/lessoncraftstudio/server-scripts/setup-design-elements-protection.sh"
    echo ""
    exit 1
fi

echo "   Found $DE_SVG_COUNT design-element SVGs"
echo "✅ Worksheet generators protected"
echo ""

# ============================================
# DATABASE PROTECTION - PRE-DEPLOYMENT BACKUP
# ============================================
echo "🗄️  Checking database and creating backup..."
mkdir -p /opt/lessoncraftstudio/backups

# Get pre-deployment database counts
PRE_DB_PRODUCT_SAMPLES=$(PGPASSWORD="${LCS_DB_PASSWORD}" psql -U lcs_user -d lessoncraftstudio_prod -t -c "SELECT COUNT(*) FROM product_samples;" 2>/dev/null | tr -d ' ' || echo "0")
PRE_DB_SAMPLE_WORKSHEETS=$(PGPASSWORD="${LCS_DB_PASSWORD}" psql -U lcs_user -d lessoncraftstudio_prod -t -c "SELECT COUNT(*) FROM sample_worksheets;" 2>/dev/null | tr -d ' ' || echo "0")

echo "   Pre-deployment database: $PRE_DB_PRODUCT_SAMPLES product samples, $PRE_DB_SAMPLE_WORKSHEETS sample worksheets"

# Create database backup before deployment
BACKUP_FILE="/opt/lessoncraftstudio/backups/pre-deploy-$(date +%Y%m%d-%H%M%S).sql.gz"
PGPASSWORD="${LCS_DB_PASSWORD}" pg_dump -U lcs_user lessoncraftstudio_prod 2>/dev/null | gzip > "$BACKUP_FILE"
if [ -f "$BACKUP_FILE" ] && [ -s "$BACKUP_FILE" ]; then
    echo "   Database backup created: $BACKUP_FILE"
else
    echo "   ⚠️  Database backup may have failed (continuing deployment)"
fi
echo ""

# Navigate to project root
cd /opt/lessoncraftstudio

# 1. Pull latest code
echo "📥 Pulling latest code from repository..."
git pull

# 2. Navigate to frontend
cd frontend

# 3. Refresh Prisma client against any schema changes pulled in
#
# [ARC][SEO][DECK-PAGE] Phase 4a Checkpoint 2 fix per Adjudication 1 (α):
# `prisma generate` MUST run after `git pull` to refresh the Prisma client
# against any schema changes pulled in. Without this step, Prisma client
# consumers (publish-cli/db.js, frontend/lib/prisma.ts) silently fail with
# "Unknown argument" errors when accessing schema-migration-introduced
# columns (e.g., titleHash + descriptionHash from migration
# 20260509083000_add_seo_hash_columns).
#
# Phase 4a Checkpoint 1 reference retrofit surfaced this empirically: the
# DB row was found via findExistingBySlug, but deck.update({titleHash,
# descriptionHash}) failed with stale-client errors until manual
# `npx prisma generate` ran on Hetzner. See §A.5.1 doctrine for the
# parallel `prisma migrate deploy` two-step requirement.
#
# Phase 6 fold-cycle: §A.5.1 doctrinal extension absorbs this as TWO-STEP
# → THREE-STEP: deploy.sh now runs `prisma generate` automatically; only
# `prisma migrate deploy` remains manual (per §A.5.1's existing prose).
echo ""
echo "🔧 Generating Prisma client..."
npx prisma generate || { echo "ERROR: prisma generate failed"; exit 1; }
echo "✅ Prisma client regenerated"

# 4. Build the application — ZERO-DOWNTIME releases/current model (commission #1, 2026-07-03)
# The live server serves frontend/releases/current/server.js (symlink → releases/<BUILD_ID>/).
# It NEVER serves from .next/, so the build can wipe/rewrite .next/ freely while the site
# stays up — no pm2 stop, no ISR-writer-vs-rm race (ISR cache is written inside the release
# dir the worker realpathed at spawn, not .next/standalone).
# One-time migration: server-scripts/migrate-to-releases.sh (guard below enforces it ran).
echo ""
if [ ! -L releases/current ]; then
    echo "FATAL: frontend/releases/current symlink missing — the pm2 process still serves .next/standalone."
    echo "       Run server-scripts/migrate-to-releases.sh once, then re-run deploy.sh."
    exit 1
fi

# Guard: hreflang CJS mirror must match the TS SoT (drift breaks deck hreflang emission)
echo "🔎 hreflang mirror parity check..."
node /opt/lessoncraftstudio/scripts/publish-cli/hreflang-codes.test.js || { echo "ERROR: hreflang-codes.js has drifted from frontend/lib/seo/hreflang.ts — fix before deploying"; exit 1; }

echo ""
echo "🧹 Cleaning stale build output to force full regeneration..."
echo "   (safe while live: the running server serves releases/current/, not .next/)"
rm -rf .next/server .next/standalone
echo "🔨 Building Next.js application (nice -n 10 so the live server keeps CPU)..."
export BUILD_DATE=$(date -u +%Y-%m-%dT%H:%M:%SZ)
echo "   BUILD_DATE=${BUILD_DATE}"
# Heap 20GB + 60min (2026-07-05, steady-state). Memory was NEVER the real build blocker:
#  (1) vm.max_map_count=65530 (default) capped cold compiles → std::bad_alloc regardless of
#      RAM/heap. FIXED: raised to 1048576 (persisted in /etc/sysctl.conf on this box).
#  (2) The warm .next/cache/webpack (993MB) is now rebuilt, so builds are warm-incremental again.
# >>> NEVER `rm -rf .next/cache` — that is what turned cheap warm builds into a 40GB cold-compile
#     OOM loop. deploy.sh only removes .next/server + .next/standalone, which is safe. <<<
# 24GB + 90min for the ONE recovery build onto a partly-mismatched cache after reverting the
# fs-unbundle back to the es static-JSON-import config (the config every FAST build used — the
# fs change reshaped landing-content.ts's graph across its 16 route importers and blew up the
# single-threaded webpack seal). Once this build writes a clean cache MATCHING the deployed code,
# subsequent deploys are warm/fast — REVERT this back to 20480/3600 after a green build.
NODE_OPTIONS="--max-old-space-size=20480" nice -n 10 timeout 5400 npm run build || { echo "BUILD FAILED (OOM or >90 min) — check the log for 'heap out of memory' vs a genuine hang. Aborting."; exit 1; }

# 4b. Stage new release under releases/<BUILD_ID> (zero-downtime)
# The running server continues serving from releases/current/ while we prepare
echo ""
echo "📂 Staging new release..."
NEW_BUILD_ID="$(cat .next/BUILD_ID 2>/dev/null || echo "unknown-$(date +%s)")"
mkdir -p releases
RELEASE_DIR="releases/${NEW_BUILD_ID}"
rm -rf "$RELEASE_DIR"
cp -a .next/standalone "$RELEASE_DIR"
echo "   → Copying .next/static to staged release"
cp -r .next/static "$RELEASE_DIR/.next/static"
echo "   → Copying public to staged release"
cp -a public "$RELEASE_DIR/public"

# Validate symlinks survived the copy (cp -a preserves them, cp -r would not)
echo "   → Validating symlinks in staged release..."
if [ -d "$RELEASE_DIR/public/worksheet-generators" ] && [ ! -L "$RELEASE_DIR/public/worksheet-generators" ]; then
    echo "FATAL: public/worksheet-generators is a directory, not a symlink!"
    echo "       Someone changed cp -a back to cp -r. Fix package.json and deploy.sh."
    rm -rf "$RELEASE_DIR"
    exit 1
fi
if [ -d "$RELEASE_DIR/public/admin" ] && [ ! -L "$RELEASE_DIR/public/admin" ]; then
    echo "FATAL: public/admin is a directory, not a symlink!"
    rm -rf "$RELEASE_DIR"
    exit 1
fi
if [ -d "$RELEASE_DIR/public/mini-tools" ] && [ ! -L "$RELEASE_DIR/public/mini-tools" ]; then
    echo "FATAL: public/mini-tools is a directory, not a symlink!"
    rm -rf "$RELEASE_DIR"
    exit 1
fi
echo "   ✅ Symlinks preserved correctly"

echo "   → Copying .env.production to staged release"
cp .env.production "$RELEASE_DIR/.env.production"

# NOTE: No symlinks needed! Samples are served directly by nginx from
# /var/www/lcs-media/samples/ - this deployment CANNOT affect them

# 5. Static chunk retention BEFORE the flip: merge previous builds' hashed chunks
#    into the STAGED release so clients/Cloudflare holding pre-deploy HTML never 404
#    on old chunk names (§A.14.11; the nginx no-store-on-404 layer stays as backstop).
#    Done pre-flip so old chunks are servable the instant the symlink swaps. KEEP=5.
ARCHIVE=".next-static-archive"   # SIBLING of .next/ — survives cleanDistDir; gitignored; never served
KEEP=5
STAGED_STATIC="$RELEASE_DIR/.next/static"
echo "🧩 Static chunk retention (build ${NEW_BUILD_ID}, keep ${KEEP})..."
mkdir -p "$ARCHIVE"
rm -rf "${ARCHIVE:?}/${NEW_BUILD_ID}"
cp -r "$STAGED_STATIC" "$ARCHIVE/$NEW_BUILD_ID"          # snapshot THIS build PRISTINE, before any merge
RETAINED=0
for prev in $(ls -1dt "$ARCHIVE"/*/ 2>/dev/null); do
  prev="${prev%/}"
  [ "$(basename "$prev")" = "$NEW_BUILD_ID" ] && continue   # never merge self (mtime-tie safe)
  [ "$RETAINED" -ge "$((KEEP-1))" ] && break
  cp -rn "$prev/." "$STAGED_STATIC/" 2>/dev/null || true     # -n: current build wins
  RETAINED=$((RETAINED+1)); echo "   ↩︎ merged previous build $(basename "$prev")"
done
for old in $(ls -1dt "$ARCHIVE"/*/ 2>/dev/null | tail -n +$((KEEP+1))); do rm -rf "${old%/}"; done
echo "   ✅ staged static = current + ${RETAINED} previous build(s)"

# 6. Atomic flip: releases/current → the new release (symlink+rename, kernel-atomic —
#    the §15.5 pattern; NOT ln -sfn). Old pm2 workers keep serving the old realpath
#    until reload replaces them, so there is no window with mismatched files.
echo ""
echo "🔄 Flipping releases/current → ${NEW_BUILD_ID}..."
RELEASE_ABS="$(cd "$RELEASE_DIR" && pwd)"
ln -s "$RELEASE_ABS" releases/current.tmp
mv -T releases/current.tmp releases/current
echo "   ✅ Flip complete"

# 6b. Graceful zero-downtime reload: cluster-mode reload starts a new worker (which
#     realpaths releases/current to the NEW release), waits for it to listen, then
#     kills the old worker. No stop window.
echo ""
echo "🔄 Reloading PM2 application (graceful, zero-downtime)..."
pm2 reload lessoncraftstudio --update-env --kill-timeout 3000
pm2 save

# 7. Health check with retry loop
echo ""
echo "⏳ Waiting for server to become ready..."
SERVER_UP=false
for i in $(seq 1 30); do
    if curl -sf http://localhost:3000 > /dev/null 2>&1; then
        echo "   ✅ Server up after ${i}s"
        SERVER_UP=true
        break
    fi
    sleep 1
done

if [ "$SERVER_UP" = false ]; then
    echo "   ⚠️  Server did not respond within 30s - checking PM2 status..."
    pm2 status lessoncraftstudio
fi

# 8. Prune old releases: keep the current release + 2 previous (KEEP_RELEASES=3).
#    Never deletes the release `current` points at (compared by realpath).
KEEP_RELEASES=3
CURRENT_TARGET="$(readlink -f releases/current 2>/dev/null || true)"
PRUNED=0
KEPT=0
for rel in $(ls -1dt releases/*/ 2>/dev/null); do
  rel="${rel%/}"
  [ "$(basename "$rel")" = "current" ] && continue
  if [ "$(readlink -f "$rel")" = "$CURRENT_TARGET" ]; then KEPT=$((KEPT+1)); continue; fi
  KEPT=$((KEPT+1))
  if [ "$KEPT" -gt "$KEEP_RELEASES" ]; then rm -rf "$rel"; PRUNED=$((PRUNED+1)); fi
done
echo "🧹 Release pruning: kept $((KEPT - PRUNED)), pruned ${PRUNED}"

# 8b. Cleanup legacy pre-releases-model dirs if still present
rm -rf .next-old

# 9. Verify application is running
echo ""
echo "📊 Application status:"
pm2 status lessoncraftstudio

# ============================================
# SAMPLE VERIFICATION (ISOLATED STORAGE)
# ============================================
# Samples are in /var/www/lcs-media/samples/ - deployment cannot affect them
# This is just a verification step to confirm they're still accessible
echo ""
echo "🔒 Verifying sample images in isolated storage..."
POST_SAMPLE_COUNT=$(find /var/www/lcs-media/samples -name "*.jpeg" 2>/dev/null | wc -l)
POST_WEBP_COUNT=$(find /var/www/lcs-media/samples -name "*.webp" 2>/dev/null | wc -l)
echo "   Found $POST_SAMPLE_COUNT JPEG files, $POST_WEBP_COUNT WebP files"

if [ "$POST_SAMPLE_COUNT" -lt "$SAMPLE_COUNT" ]; then
    echo ""
    echo "⚠️  WARNING: Sample count dropped from $SAMPLE_COUNT to $POST_SAMPLE_COUNT"
    echo "    This should NOT happen - samples are in isolated storage!"
    echo "    Investigate immediately."
else
    echo "✅ Samples verified in isolated storage"
fi

# ============================================
# IMAGE LIBRARY VERIFICATION (ISOLATED STORAGE)
# ============================================
echo ""
echo "🔒 Verifying image library in isolated storage..."
POST_IMAGE_LIB_COUNT=$(find /var/www/lcs-media/image-library -type f -name "*.png" 2>/dev/null | wc -l)
echo "   Found $POST_IMAGE_LIB_COUNT PNG files"

if [ "$POST_IMAGE_LIB_COUNT" -lt "$IMAGE_LIB_COUNT" ]; then
    echo ""
    echo "⚠️  WARNING: Image library count dropped from $IMAGE_LIB_COUNT to $POST_IMAGE_LIB_COUNT"
    echo "    This should NOT happen - image library is in isolated storage!"
    echo "    Investigate immediately."
else
    echo "✅ Image library verified in isolated storage"
fi

# ============================================
# WORKSHEET & CONTENT MANAGER VERIFICATION
# ============================================
echo ""
echo "🔒 Verifying worksheet generators in isolated storage..."
POST_WG_HTML=$(find /var/www/lcs-media/worksheet-generators -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
POST_WG_JS=$(find /var/www/lcs-media/worksheet-generators/js -name "*.js" -type f 2>/dev/null | wc -l)
POST_ADMIN=$(find /var/www/lcs-media/admin-panels -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
echo "   Found $POST_WG_HTML HTML apps, $POST_WG_JS JS translations, $POST_ADMIN admin panels"

if [ "$POST_WG_HTML" -lt "$WG_HTML_COUNT" ]; then
    echo "   ⚠️  WARNING: Worksheet HTML count dropped from $WG_HTML_COUNT to $POST_WG_HTML"
    echo "      This should NOT happen - worksheets are in isolated storage!"
elif [ "$POST_WG_JS" -lt "$WG_JS_COUNT" ]; then
    echo "   ⚠️  WARNING: Translation JS count dropped from $WG_JS_COUNT to $POST_WG_JS"
    echo "      This should NOT happen - translations are in isolated storage!"
else
    echo "✅ Worksheet generators verified in isolated storage"
fi

# ============================================
# DESIGN ELEMENTS VERIFICATION
# ============================================
echo ""
echo "🔒 Verifying design elements in isolated storage..."
POST_DE_SVG=$(find /var/www/lcs-media/design-elements -name "*.svg" -type f 2>/dev/null | wc -l)
echo "   Found $POST_DE_SVG design-element SVGs"

if [ "$POST_DE_SVG" -lt "$DE_SVG_COUNT" ]; then
    echo "   ⚠️  WARNING: Design-element SVG count dropped from $DE_SVG_COUNT to $POST_DE_SVG"
    echo "      This should NOT happen - design elements are in isolated storage!"
else
    echo "✅ Design elements verified in isolated storage"
fi

# Quick HTTP test for sample accessibility (via nginx)
echo ""
echo "🌐 Testing sample HTTP access via nginx..."
SAMPLE_TEST=$(curl -s -o /dev/null -w "%{http_code}" "https://localhost/samples/english/addition/sample-1.jpeg" 2>/dev/null || echo "000")
if [ "$SAMPLE_TEST" = "200" ]; then
    echo "✅ Samples accessible via nginx"
else
    echo "ℹ️  Sample HTTP test returned: $SAMPLE_TEST (check nginx config for /samples/)"
fi

# ============================================
# DATABASE PROTECTION - POST-DEPLOYMENT CHECK
# ============================================
echo ""
echo "🗄️  Verifying database after deployment..."
POST_DB_PRODUCT_SAMPLES=$(PGPASSWORD="${LCS_DB_PASSWORD}" psql -U lcs_user -d lessoncraftstudio_prod -t -c "SELECT COUNT(*) FROM product_samples;" 2>/dev/null | tr -d ' ' || echo "0")
POST_DB_SAMPLE_WORKSHEETS=$(PGPASSWORD="${LCS_DB_PASSWORD}" psql -U lcs_user -d lessoncraftstudio_prod -t -c "SELECT COUNT(*) FROM sample_worksheets;" 2>/dev/null | tr -d ' ' || echo "0")

echo "   Post-deployment database: $POST_DB_PRODUCT_SAMPLES product samples, $POST_DB_SAMPLE_WORKSHEETS sample worksheets"

if [ "$POST_DB_PRODUCT_SAMPLES" -lt "$PRE_DB_PRODUCT_SAMPLES" ] 2>/dev/null; then
    echo "   ⚠️  WARNING: Product sample count dropped from $PRE_DB_PRODUCT_SAMPLES to $POST_DB_PRODUCT_SAMPLES"
else
    echo "✅ Database integrity maintained"
fi

# ============================================
# SITEMAP REVALIDATION
# ============================================
echo ""
echo "🗺️  Revalidating sitemap..."
sleep 3  # Wait for PM2 to fully start
SITEMAP_RESULT=$(curl -s -X POST http://localhost:3000/api/revalidate-sitemap 2>/dev/null || echo '{"status":"error"}')
echo "   Sitemap revalidation: $SITEMAP_RESULT"

# ============================================
# POST-DEPLOYMENT SMOKE TESTS
# ============================================
echo ""
echo "Running post-deployment smoke tests..."
sleep 5  # Wait for PM2 to fully start

if [ -f /opt/lessoncraftstudio/server-scripts/post-deploy-smoke.sh ]; then
    bash /opt/lessoncraftstudio/server-scripts/post-deploy-smoke.sh
    SMOKE_RESULT=$?
    if [ $SMOKE_RESULT -ne 0 ]; then
        echo ""
        echo "Some smoke tests failed - check logs above"
    fi
else
    echo "   Smoke test script not found (skipping)"
fi

# ============================================
# DIACRITICS PROTECTION - POST-DEPLOYMENT CHECK
# ============================================
echo ""
echo "🔤 Checking image translation diacritics..."
BROKEN=$(PGPASSWORD="${LCS_DB_PASSWORD}" psql -U lcs_user -d lessoncraftstudio_prod -t -c \
  "SELECT COUNT(*) FROM image_library_items WHERE
   translations->>'sv' IN ('Bjorn','Dorr','Fonster','Kylskap','Sang') OR
   translations->>'de' IN ('Bar','Tur','Kuhlschrank','Lowe','Schildkrote') OR
   translations->>'fr' IN ('Elephant','Reveil','Ane','Chevre','Meduse');" 2>/dev/null | tr -d ' ')

if [ "$BROKEN" -gt 0 ] 2>/dev/null; then
    echo "  ⚠️  Found $BROKEN rows with stripped diacritics - auto-fixing..."
    if [ -f /opt/lessoncraftstudio/server-scripts/fix-db-diacritics.js ]; then
        cd /opt/lessoncraftstudio/frontend
        node /opt/lessoncraftstudio/server-scripts/fix-db-diacritics.js 2>&1 | tail -5
        node /opt/lessoncraftstudio/server-scripts/fix-db-diacritics-numbered.js 2>&1 | tail -5
        echo "  ✅ Diacritics auto-fix complete"
    else
        echo "  ⛔ Fix script not found at /opt/lessoncraftstudio/server-scripts/fix-db-diacritics.js"
        echo "     Upload from local: server-scripts/fix-db-diacritics.js"
    fi
else
    echo "  ✅ All diacritics correct"
fi

# Verify every static chunk referenced by live HTML actually resolves (retention/sync sanity).
# WARN-only: runs AFTER the live swap; failing cannot un-deploy and must NOT abort the
# remaining steps (set -e is active). Surfaces loudly in the deploy output.
echo ""
echo "🧪 Verifying referenced static chunks resolve..."
CHUNK_FAIL=0; CHUNK_TOTAL=0
for route in /en/auth/signin /en; do
  HTML="$(curl -sf "http://localhost:3000${route}" 2>/dev/null || true)"
  [ -z "$HTML" ] && { echo "   ⚠️  could not fetch ${route} (skipping)"; continue; }
  for asset in $(printf '%s' "$HTML" | grep -oE '/_next/static/[^"'"'"' ]+\.(js|css)' | sort -u); do
    CHUNK_TOTAL=$((CHUNK_TOTAL+1))
    code="$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000${asset}")"
    [ "$code" != "200" ] && { echo "   ❌ ${code} ${asset}"; CHUNK_FAIL=$((CHUNK_FAIL+1)); }
  done
done
[ "$CHUNK_FAIL" -gt 0 ] && echo "   ⚠️  WARN: ${CHUNK_FAIL}/${CHUNK_TOTAL} chunk(s) != 200 — investigate retention/nginx" \
                        || echo "   ✅ all ${CHUNK_TOTAL} referenced chunks return 200"
# do NOT exit non-zero here

echo ""
echo "🔎 Checking deck URL-column drift (at-rest only; live links are slug-derived)..."
# WARN-only recurrence guard (SEO-recovery 2026-06-25): the script always exits 0;
# live deck links derive from slug (canonicalDeckAssets) so any drift here is at-rest
# cosmetic. Isolated subshell (set +e + env) so it can never abort the deploy.
# Fix surfaced drift with scripts/publish-cli/fix-deck-url-columns.js.
( set +e
  set -a; . /opt/lessoncraftstudio/frontend/.env.production 2>/dev/null; set +a
  node /opt/lessoncraftstudio/scripts/publish-cli/check-deck-url-drift.js 2>&1 | tail -15
) || true

echo ""
echo "📡 Submitting recrawl signals (IndexNow → Bing/Yandex)..."
# NOTE: Google RETIRED its sitemap-ping endpoint in 2023 — the old
# google.com/ping?sitemap= call was a no-op. Google recrawl is driven by the
# GSC console + fresh sitemap lastmod (BUILD_DATE, set above). See
# docs/seo/index-recovery-runbook.md. IndexNow notifies Bing/Yandex (+Seznam)
# for near-real-time recrawl of the post-pivot clean pages.
node /opt/lessoncraftstudio/scripts/indexnow-submit.js || true
echo ""
echo "Deployment complete!"
echo ""
echo "Website should now be accessible with all CSS/JavaScript working!"
echo "Sample images: $POST_SAMPLE_COUNT JPEG + $POST_WEBP_COUNT WebP files (isolated)"
echo "Image library: $POST_IMAGE_LIB_COUNT PNG files (isolated)"
echo "Worksheets: $POST_WG_HTML HTML + $POST_WG_JS JS + $POST_ADMIN admin (isolated)"
echo "Database: $POST_DB_PRODUCT_SAMPLES product samples, $POST_DB_SAMPLE_WORKSHEETS sample worksheets"
echo ""
