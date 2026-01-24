#!/bin/bash
# Translation Synchronization Verification Script

set -e

echo "════════════════════════════════════════════════════════"
echo "🔍 Translation Synchronization Verification"
echo "════════════════════════════════════════════════════════"
echo ""

REF_DIR="REFERENCE TRANSLATIONS"
PUB_DIR="frontend/public/worksheet-generators/js"

REF_COUNT=$(find "$REF_DIR" -name "translations-*.js" -type f | grep -v -E "(backup|original|test|broken)" | wc -l)
PUB_COUNT=$(find "$PUB_DIR" -name "translations-*.js" -type f | wc -l)

echo "📊 File Counts:"
echo "   REFERENCE TRANSLATIONS: $REF_COUNT"
echo "   frontend/public: $PUB_COUNT"

if [ "$REF_COUNT" != "33" ] || [ "$PUB_COUNT" != "33" ]; then
    echo "❌ File count mismatch! Expected 33 in both locations."
    exit 1
fi

echo "   ✅ File counts correct (33 each)"
echo ""

echo "🔍 Comparing files..."
MISMATCH=0
find "$REF_DIR" -name "translations-*.js" -type f | grep -v -E "(backup|original|test|broken)" | while read ref_file; do
    filename=$(basename "$ref_file")
    pub_file="$PUB_DIR/$filename"
    if [ -f "$pub_file" ]; then
        if ! diff -q "$ref_file" "$pub_file" > /dev/null 2>&1; then
            echo "   ❌ MISMATCH: $filename"
            MISMATCH=$((MISMATCH + 1))
        fi
    else
        echo "   ❌ MISSING: $filename"
        MISMATCH=$((MISMATCH + 1))
    fi
done

if [ $MISMATCH -eq 0 ]; then
    echo "   ✅ All files synchronized"
else
    echo "   ❌ $MISMATCH files out of sync"
    exit 1
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ Verification Complete - All files in sync!"
echo "════════════════════════════════════════════════════════"
