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
echo ""
echo "🔨 Building Next.js application..."
npm run build

# 4. CRITICAL: Copy static files to standalone directory
echo ""
echo "📂 Copying static files to standalone directory..."
echo "   → Copying .next/static to .next/standalone/.next/static"
cp -r .next/static .next/standalone/.next/static

echo "   → Copying public to .next/standalone/public"
cp -r public .next/standalone/public

# NOTE: No symlinks needed! Samples are served directly by nginx from
# /var/www/lcs-media/samples/ - this deployment CANNOT affect them

# 5. Restart PM2 application
echo ""
echo "🔄 Restarting PM2 application..."
pm2 restart lessoncraftstudio

# 6. Verify application is running
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

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Website should now be accessible with all CSS/JavaScript working!"
echo "📸 Sample images: $POST_SAMPLE_COUNT JPEG + $POST_WEBP_COUNT WebP files (isolated)"
echo "🖼️  Image library: $POST_IMAGE_LIB_COUNT PNG files (isolated)"
echo "🗄️  Database: $POST_DB_PRODUCT_SAMPLES product samples, $POST_DB_SAMPLE_WORKSHEETS sample worksheets"
echo ""
