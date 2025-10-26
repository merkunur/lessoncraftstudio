#!/bin/bash
#
# Deployment Validation Script
# Prevents dangerous deployment commands
# Created: 2025-10-26
# Purpose: Block dangerous `cp -r public` commands
#

echo "════════════════════════════════════════════════════════"
echo "🛡️  Deployment Validation Script"
echo "════════════════════════════════════════════════════════"
echo ""

# Get the command to validate (passed as argument or from stdin)
COMMAND="$*"

# Check for dangerous pattern: cp -r public
if echo "$COMMAND" | grep -q "cp -r public"; then
    echo "❌ BLOCKED: Dangerous command detected!"
    echo ""
    echo "🚨 DANGER: This command contains 'cp -r public'"
    echo ""
    echo "This will overwrite production files with old git versions of:"
    echo "  - Worksheet generators (not in git since commit f9e10bb)"
    echo "  - Content managers (not in git)"
    echo "  - Translation files (not in git)"
    echo ""
    echo "✅ SAFE ALTERNATIVES:"
    echo ""
    echo "For worksheet generators:"
    echo "  Upload from REFERENCE APPS folder"
    echo "  pscp -r \"REFERENCE APPS\\*.html\" root@server:/path/"
    echo ""
    echo "For translation files:"
    echo "  Upload from REFERENCE TRANSLATIONS folder"
    echo "  pscp -r \"REFERENCE TRANSLATIONS\\translations-*.js\" root@server:/path/"
    echo ""
    echo "For static assets only:"
    echo "  cp -r .next/static .next/standalone/.next/static"
    echo "  cp -r public/uploads .next/standalone/public/uploads"
    echo ""
    echo "See: DEPLOYMENT.md for complete workflows"
    echo ""
    echo "════════════════════════════════════════════════════════"
    exit 1
fi

# Check for other dangerous patterns
if echo "$COMMAND" | grep -q "cp -r.*public/worksheet-generators"; then
    echo "❌ BLOCKED: Dangerous command detected!"
    echo ""
    echo "🚨 This command copies worksheet generators from git"
    echo ""
    echo "✅ Use REFERENCE APPS folder instead:"
    echo "  pscp -r \"REFERENCE APPS\\*.html\" root@server:/path/"
    echo ""
    exit 1
fi

if echo "$COMMAND" | grep -q "cp -r.*public/worksheet-generators/js"; then
    echo "❌ BLOCKED: Dangerous command detected!"
    echo ""
    echo "🚨 This command copies translation files from git"
    echo ""
    echo "✅ Use REFERENCE TRANSLATIONS folder instead:"
    echo "  pscp -r \"REFERENCE TRANSLATIONS\\translations-*.js\" root@server:/path/"
    echo ""
    exit 1
fi

echo "✅ Command validation passed"
echo ""
exit 0
