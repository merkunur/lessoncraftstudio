#!/bin/bash
# ============================================================================
# SERVER-SIDE SYNC SCRIPT
# ============================================================================
# Purpose: Sync uploaded files from public to standalone directory
#
# This script should be run on the production server AFTER uploading
# worksheet generators or translations to frontend/public/
#
# Location on server: /opt/lessoncraftstudio/scripts/server-sync-standalone.sh
# ============================================================================

set -e  # Exit on error

echo ""
echo "============================================================"
echo "  SERVER SYNC: public -> standalone"
echo "============================================================"
echo ""

cd /opt/lessoncraftstudio/frontend

# ============================================================================
# STEP 1: Sync worksheet generators to standalone
# ============================================================================
echo "[STEP 1] Syncing worksheet generators to standalone..."

if [ -d "public/worksheet-generators" ]; then
    mkdir -p ".next/standalone/public/worksheet-generators"
    cp public/worksheet-generators/*.html .next/standalone/public/worksheet-generators/ 2>/dev/null || true
    APPS_COUNT=$(ls -1 .next/standalone/public/worksheet-generators/*.html 2>/dev/null | wc -l)
    echo "  Synced $APPS_COUNT HTML files to standalone"
else
    echo "  WARNING: public/worksheet-generators not found"
fi
echo ""

# ============================================================================
# STEP 2: Sync translations to standalone
# ============================================================================
echo "[STEP 2] Syncing translations to standalone..."

if [ -d "public/worksheet-generators/js" ]; then
    mkdir -p ".next/standalone/public/worksheet-generators/js"
    cp public/worksheet-generators/js/*.js .next/standalone/public/worksheet-generators/js/ 2>/dev/null || true
    TRANS_COUNT=$(ls -1 .next/standalone/public/worksheet-generators/js/*.js 2>/dev/null | wc -l)
    echo "  Synced $TRANS_COUNT JS files to standalone"
else
    echo "  WARNING: public/worksheet-generators/js not found"
fi
echo ""

# ============================================================================
# STEP 3: Sync content managers to standalone
# ============================================================================
echo "[STEP 3] Syncing content managers to standalone..."

if [ -f "public/homepage-content-manager.html" ]; then
    cp public/homepage-content-manager.html .next/standalone/public/
    echo "  Synced homepage-content-manager.html"
fi

if [ -f "public/worksheet-generators/blog-content-manager.html" ]; then
    cp public/worksheet-generators/blog-content-manager.html .next/standalone/public/worksheet-generators/
    echo "  Synced blog-content-manager.html"
fi

if [ -f "public/worksheet-generators/content-manager-v2.html" ]; then
    cp public/worksheet-generators/content-manager-v2.html .next/standalone/public/worksheet-generators/
    echo "  Synced content-manager-v2.html"
fi
echo ""

# ============================================================================
# STEP 4: Restart PM2
# ============================================================================
echo "[STEP 4] Restarting PM2..."

pm2 restart lessoncraftstudio

echo ""
echo "============================================================"
echo "  SERVER SYNC COMPLETE"
echo "============================================================"
echo ""
echo "  All files synced to standalone and PM2 restarted."
echo ""

exit 0
