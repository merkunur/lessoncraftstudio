#!/bin/bash
#
# REFERENCE Folders Protection Script
# Adds read-only protection to REFERENCE folders
# Created: 2025-10-26
# Purpose: Make it technically difficult to accidentally modify golden source files
#

echo "════════════════════════════════════════════════════════"
echo "🛡️  REFERENCE Folders Protection Script"
echo "════════════════════════════════════════════════════════"
echo ""

# Define REFERENCE folders
REFERENCE_APPS="REFERENCE APPS"
REFERENCE_TRANSLATIONS="REFERENCE TRANSLATIONS"
REFERENCE_CONTENT_MANAGERS="REFERENCE CONTENT MANAGERS"

echo "📁 Checking REFERENCE folders..."
echo ""

# Function to protect a folder
protect_folder() {
    local folder="$1"

    if [ ! -d "$folder" ]; then
        echo "❌ Folder not found: $folder"
        return 1
    fi

    echo "🔒 Protecting: $folder"

    # On Windows, use attrib command via cmd
    if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Windows: Set read-only attribute on all files
        cmd //c "attrib +R \"$folder\\*.*\" /S /D" > /dev/null 2>&1

        if [ $? -eq 0 ]; then
            echo "   ✅ Read-only attribute set on all files"
        else
            echo "   ⚠️  Could not set read-only attribute (might need admin)"
        fi
    else
        # Unix/Linux: Change permissions to read-only
        chmod -R 555 "$folder"
        echo "   ✅ Permissions set to read-only (555)"
    fi

    # Create additional warning file if it doesn't exist
    local warning_file="$folder/⚠️ README - DO NOT MODIFY DIRECTLY.txt"
    if [ ! -f "$warning_file" ]; then
        echo "   ⚠️  Warning README not found - should already exist"
    else
        echo "   ✅ Warning README already exists"
    fi

    echo ""
}

# Protect each REFERENCE folder
protect_folder "$REFERENCE_APPS"
protect_folder "$REFERENCE_TRANSLATIONS"
protect_folder "$REFERENCE_CONTENT_MANAGERS"

echo "════════════════════════════════════════════════════════"
echo "✅ Protection Applied!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📝 Note: To modify files in REFERENCE folders:"
echo ""
echo "On Windows:"
echo "  1. Remove read-only: attrib -R \"REFERENCE APPS\\file.html\""
echo "  2. Make your changes"
echo "  3. Re-protect: attrib +R \"REFERENCE APPS\\file.html\""
echo ""
echo "On Unix/Linux:"
echo "  1. Remove protection: chmod +w \"REFERENCE APPS/file.html\""
echo "  2. Make your changes"
echo "  3. Re-protect: chmod -w \"REFERENCE APPS/file.html\""
echo ""
echo "Better approach: Follow the 6-step workflow in DEPLOYMENT.md"
echo "════════════════════════════════════════════════════════"
