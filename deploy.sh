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
# SAMPLE PROTECTION - PRE-DEPLOYMENT CHECK
# ============================================
echo "🔒 Checking sample image integrity..."
SAMPLE_COUNT=$(find /opt/lessoncraftstudio/samples -name "*.jpeg" 2>/dev/null | wc -l)
WEBP_COUNT=$(find /opt/lessoncraftstudio/samples -name "*.webp" 2>/dev/null | wc -l)
echo "   Found $SAMPLE_COUNT JPEG files, $WEBP_COUNT WebP files"

if [ "$SAMPLE_COUNT" -lt 1000 ]; then
    echo ""
    echo "🚨🚨🚨 DEPLOYMENT ABORTED 🚨🚨🚨"
    echo ""
    echo "Sample count is $SAMPLE_COUNT (expected 3000+)"
    echo "This indicates samples may have been deleted or corrupted."
    echo ""
    echo "RECOVERY OPTIONS:"
    echo "1. Restore from backup: tar -xzf /opt/lessoncraftstudio/backups/samples_*.tar.gz -C /opt/lessoncraftstudio/"
    echo "2. Re-upload samples from local machine"
    echo ""
    echo "Deployment aborted to protect sample images."
    exit 1
fi
echo "✅ Sample integrity verified"
echo ""

# Navigate to project root
cd /opt/lessoncraftstudio

# ============================================
# SYMLINK PROTECTION - BEFORE GIT PULL
# ============================================
# Remove the symlink BEFORE git pull to prevent git from following it
# and accidentally deleting the actual samples directory
echo "🛡️  Protecting samples symlink..."
if [ -L "frontend/public/samples" ]; then
    rm -f frontend/public/samples
    echo "   Symlink removed (will recreate after git pull)"
elif [ -d "frontend/public/samples" ]; then
    echo "   WARNING: frontend/public/samples is a directory, not a symlink!"
    echo "   Removing directory to prevent git conflicts..."
    rm -rf frontend/public/samples
fi

# 1. Pull latest code
echo "📥 Pulling latest code from repository..."
git pull

# ============================================
# SYMLINK PROTECTION - KEEP REMOVED DURING BUILD
# ============================================
# DO NOT recreate the symlink yet!
# Next.js build follows symlinks and can delete the target files.
# We will create the symlink ONLY in standalone/public after build.
echo "   Symlink will be created in standalone/public after build"

# 2. Navigate to frontend
cd frontend

# 3. Build the application (WITHOUT the samples symlink to protect them)
echo ""
echo "🔨 Building Next.js application..."
echo "   (samples symlink removed to prevent Next.js from touching them)"
npm run build

# 4. CRITICAL: Copy static files to standalone directory
echo ""
echo "📂 Copying static files to standalone directory..."
echo "   → Copying .next/static to .next/standalone/.next/static"
cp -r .next/static .next/standalone/.next/static

echo "   → Copying public to .next/standalone/public"
cp -r public .next/standalone/public

echo "   → Creating samples symlink in standalone/public"
ln -sfn /opt/lessoncraftstudio/samples .next/standalone/public/samples

# Recreate symlink in frontend/public for future local development
echo "   → Recreating samples symlink in frontend/public"
ln -sfn /opt/lessoncraftstudio/samples public/samples

# 5. Restart PM2 application
echo ""
echo "🔄 Restarting PM2 application..."
pm2 restart lessoncraftstudio

# 6. Verify application is running
echo ""
echo "📊 Application status:"
pm2 status lessoncraftstudio

# ============================================
# SAMPLE PROTECTION - POST-DEPLOYMENT CHECK
# ============================================
echo ""
echo "🔒 Verifying sample images after deployment..."
POST_SAMPLE_COUNT=$(find /opt/lessoncraftstudio/samples -name "*.jpeg" 2>/dev/null | wc -l)
POST_WEBP_COUNT=$(find /opt/lessoncraftstudio/samples -name "*.webp" 2>/dev/null | wc -l)
echo "   Found $POST_SAMPLE_COUNT JPEG files, $POST_WEBP_COUNT WebP files"

if [ "$POST_SAMPLE_COUNT" -lt "$SAMPLE_COUNT" ]; then
    echo ""
    echo "⚠️  WARNING: Sample count dropped from $SAMPLE_COUNT to $POST_SAMPLE_COUNT"
    echo "    Something may have affected the samples directory!"
    echo "    Investigate immediately."
else
    echo "✅ Sample integrity maintained"
fi

# Quick HTTP test for sample accessibility
echo ""
echo "🌐 Testing sample HTTP access..."
SAMPLE_TEST=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/samples/english/addition/Addition%20Worksheet%201.jpeg" 2>/dev/null || echo "000")
if [ "$SAMPLE_TEST" = "200" ]; then
    echo "✅ Samples accessible via HTTP"
else
    echo "⚠️  Sample HTTP test returned: $SAMPLE_TEST (may be OK if testing via nginx)"
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Website should now be accessible with all CSS/JavaScript working!"
echo "📸 Sample images: $POST_SAMPLE_COUNT JPEG + $POST_WEBP_COUNT WebP files protected"
echo ""
