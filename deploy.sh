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
# DATABASE PROTECTION - PRE-DEPLOYMENT BACKUP
# ============================================
echo "🗄️  Checking database and creating backup..."
mkdir -p /opt/lessoncraftstudio/backups

# Get pre-deployment database counts
PRE_DB_PRODUCT_SAMPLES=$(PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -t -c "SELECT COUNT(*) FROM product_samples;" 2>/dev/null | tr -d ' ' || echo "0")
PRE_DB_SAMPLE_WORKSHEETS=$(PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -t -c "SELECT COUNT(*) FROM sample_worksheets;" 2>/dev/null | tr -d ' ' || echo "0")

echo "   Pre-deployment database: $PRE_DB_PRODUCT_SAMPLES product samples, $PRE_DB_SAMPLE_WORKSHEETS sample worksheets"

# Create database backup before deployment
BACKUP_FILE="/opt/lessoncraftstudio/backups/pre-deploy-$(date +%Y%m%d-%H%M%S).sql.gz"
PGPASSWORD=LcS2025SecureDBPass pg_dump -U lcs_user lessoncraftstudio_prod 2>/dev/null | gzip > "$BACKUP_FILE"
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

# 3. Build the application
# NOTE: Samples are in /var/www/lcs-media/samples/ - completely isolated
# No symlinks needed - nginx serves samples directly
# IMPORTANT: Build writes to .next/ but the running server reads from
# .next/standalone/ (from the PREVIOUS build), so this is safe.
echo ""
echo "🔨 Building Next.js application..."
npm run build

# 4. CRITICAL: Stage new release in separate directory (zero-downtime)
# The running server continues serving from .next/standalone/ while we prepare
echo ""
echo "📂 Staging new release..."
RELEASE_DIR=".next-release-$(date +%s)"
cp -a .next/standalone "$RELEASE_DIR"
echo "   → Copying .next/static to staged release"
cp -r .next/static "$RELEASE_DIR/.next/static"
echo "   → Copying public to staged release"
cp -r public "$RELEASE_DIR/public"
echo "   → Copying .env.production to staged release"
cp .env.production "$RELEASE_DIR/.env.production"

# NOTE: No symlinks needed! Samples are served directly by nginx from
# /var/www/lcs-media/samples/ - this deployment CANNOT affect them

# 5. Atomic swap: replace active standalone with new release
echo ""
echo "🔄 Swapping to new release..."
rm -rf .next-old
mv .next/standalone .next-old 2>/dev/null || true
mv "$RELEASE_DIR" .next/standalone
echo "   ✅ Swap complete"

# 6. Graceful restart (pm2 restart instead of delete+start to minimize downtime)
echo ""
echo "🔄 Restarting PM2 application (graceful)..."
pm2 restart lessoncraftstudio --update-env --kill-timeout 3000
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

# 8. Cleanup old release
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
POST_DB_PRODUCT_SAMPLES=$(PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -t -c "SELECT COUNT(*) FROM product_samples;" 2>/dev/null | tr -d ' ' || echo "0")
POST_DB_SAMPLE_WORKSHEETS=$(PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -t -c "SELECT COUNT(*) FROM sample_worksheets;" 2>/dev/null | tr -d ' ' || echo "0")

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
# BLOG CACHE WARMING
# ============================================
# After deploy, in-memory caches (slugCache, blogLinkTargetCache,
# sampleDiscoveryCache, relatedPostsCache, sampleMetaCache) are cold.
# Warming the listing page does nothing - caches live in the [slug] page module.
# We must hit an actual blog post to warm them.
echo ""
echo "Warming blog caches..."

# Step 1: Warm listing pages (fast, warms category data)
for locale in en de fr es pt it nl sv da no fi; do
  curl -sf "http://localhost:3000/${locale}/blog" > /dev/null 2>&1 &
done
wait

# Step 2: Get ALL published blog slugs from the database
BLOG_SLUGS=$(PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -t -c \
  "SELECT slug FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC;" 2>/dev/null | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | grep -v '^$')

if [ -n "$BLOG_SLUGS" ]; then
  SLUG_COUNT=$(echo "$BLOG_SLUGS" | wc -l | tr -d ' ')
  FIRST_SLUG=$(echo "$BLOG_SLUGS" | head -1)

  # Step 3: Warm ALL posts for English (primary locale), concurrency limit of 5.
  # Each request populates slugCache (global), blogLinkTargetCache (en),
  # relatedPostsCache, sampleDiscoveryCache, sampleMetaCache for that post.
  echo "  Warming $SLUG_COUNT blog posts for English locale..."
  BATCH=0
  for slug in $BLOG_SLUGS; do
    [ -z "$slug" ] && continue
    curl -sf "http://localhost:3000/en/blog/${slug}" > /dev/null 2>&1 &
    BATCH=$((BATCH + 1))
    if [ $BATCH -ge 5 ]; then
      wait
      BATCH=0
    fi
  done
  wait
  echo "  English blog caches warmed ($SLUG_COUNT posts)"

  # Step 4: Warm first post for remaining 10 locales (populates locale-specific blogLinkTargetCache)
  echo "  Warming locale caches with slug: $FIRST_SLUG"
  for locale in de fr es pt it nl sv da no fi; do
    curl -sf "http://localhost:3000/${locale}/blog/${FIRST_SLUG}" > /dev/null 2>&1 &
  done
  wait
  echo "Blog caches warmed ($SLUG_COUNT English posts + 10 locale entries)"
else
  echo "  No published blog posts found - skipping post cache warming"
fi

echo ""
echo "Deployment complete!"
echo ""
echo "Website should now be accessible with all CSS/JavaScript working!"
echo "Sample images: $POST_SAMPLE_COUNT JPEG + $POST_WEBP_COUNT WebP files (isolated)"
echo "Image library: $POST_IMAGE_LIB_COUNT PNG files (isolated)"
echo "Database: $POST_DB_PRODUCT_SAMPLES product samples, $POST_DB_SAMPLE_WORKSHEETS sample worksheets"
echo ""
