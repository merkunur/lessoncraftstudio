#!/bin/bash
# ============================================================================
# MASTER SYNCHRONIZATION SCRIPT
# ============================================================================
# Purpose: Sync REFERENCE folders (source of truth) to the dev-server mirror
#
# REFERENCE APPS           -> frontend/public/worksheet-generators
# REFERENCE TRANSLATIONS   -> frontend/public/worksheet-generators/js
#
# Run this script after ANY modification to REFERENCE files
# ============================================================================

set -e  # Exit on error

echo ""
echo "============================================================"
echo "  MASTER SYNC: REFERENCE folders to ALL local copies"
echo "============================================================"
echo ""

# Change to project root directory
cd "$(dirname "$0")/.."
PROJECT_ROOT=$(pwd)

# ============================================================================
# STEP 1: Verify REFERENCE folders exist and have files
# ============================================================================
echo "[STEP 1] Verifying REFERENCE folders..."
echo ""

if [ ! -d "REFERENCE APPS" ]; then
    echo "ERROR: REFERENCE APPS folder not found!"
    echo "       This folder must exist and contain production files."
    exit 1
fi

if [ ! -d "REFERENCE TRANSLATIONS" ]; then
    echo "ERROR: REFERENCE TRANSLATIONS folder not found!"
    echo "       This folder must exist and contain translation files."
    exit 1
fi

# Count files
APPS_COUNT=$(ls -1 "REFERENCE APPS"/*.html 2>/dev/null | wc -l)
TRANS_COUNT=$(ls -1 "REFERENCE TRANSLATIONS"/*.js 2>/dev/null | wc -l)

echo "  REFERENCE APPS:         $APPS_COUNT HTML files"
echo "  REFERENCE TRANSLATIONS: $TRANS_COUNT JS files"
echo ""

if [ "$APPS_COUNT" -lt 30 ]; then
    echo "ERROR: REFERENCE APPS has fewer than 30 files!"
    echo "       Expected 33 worksheet generators."
    echo "       Aborting to prevent data loss."
    exit 1
fi

if [ "$TRANS_COUNT" -lt 30 ]; then
    echo "ERROR: REFERENCE TRANSLATIONS has fewer than 30 files!"
    echo "       Expected 38 translation files."
    echo "       Aborting to prevent data loss."
    exit 1
fi

echo "  Verification PASSED"
echo ""

# ============================================================================
# STEP 2: Sync REFERENCE APPS to frontend/public/worksheet-generators
#   (the dormant legacy-apps/ and "worksheet generators/" Express
#    deployments were removed; only the dev-server mirror is populated.)
# ============================================================================
echo "[STEP 2] Syncing to frontend/public/worksheet-generators..."

mkdir -p "frontend/public/worksheet-generators"
cp "REFERENCE APPS"/*.html "frontend/public/worksheet-generators/"
COPIED=$(ls -1 "frontend/public/worksheet-generators"/*.html 2>/dev/null | wc -l)
echo "  Copied $COPIED files to frontend/public/worksheet-generators"
echo ""

# ============================================================================
# STEP 3: Sync REFERENCE TRANSLATIONS to frontend/public/worksheet-generators/js
# ============================================================================
echo "[STEP 3] Syncing translations to frontend/public/worksheet-generators/js..."

mkdir -p "frontend/public/worksheet-generators/js"
cp "REFERENCE TRANSLATIONS"/*.js "frontend/public/worksheet-generators/js/"
COPIED=$(ls -1 "frontend/public/worksheet-generators/js"/*.js 2>/dev/null | wc -l)
echo "  Copied $COPIED translation files"
echo ""

# ============================================================================
# Summary
# ============================================================================
echo "============================================================"
echo "  SYNC COMPLETE"
echo "============================================================"
echo ""
echo "  All local copies are now synchronized with REFERENCE folders."
echo ""
echo "  To deploy to production server, run:"
echo "    scripts/deploy-to-production.sh"
echo ""
echo "  Or manually upload specific files using scp/pscp."
echo ""

exit 0
