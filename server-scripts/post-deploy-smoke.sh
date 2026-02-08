#!/bin/bash
#
# Post-Deployment Smoke Tests
# Runs automatically after every deployment to catch broken functionality immediately
# Created: 2026-01-27
#

echo "=========================================="
echo "Post-Deployment Smoke Tests"
echo "=========================================="
echo ""

FAILURES=0
WARNINGS=0
BASE_URL="http://localhost:3000"

# Test 1: Health endpoint
echo "Testing health endpoints..."
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/health" 2>/dev/null)
if [ "$HEALTH" != "200" ]; then
    echo "  FAIL: /api/health returned $HEALTH"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: /api/health"
fi

# Test 2: Database health
DB_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/health/database" 2>/dev/null)
if [ "$DB_HEALTH" != "200" ]; then
    echo "  FAIL: /api/health/database returned $DB_HEALTH"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: /api/health/database"
fi

# Test 3: Samples health
SAMPLES_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/health/samples" 2>/dev/null)
if [ "$SAMPLES_HEALTH" != "200" ]; then
    echo "  WARN: /api/health/samples returned $SAMPLES_HEALTH"
    WARNINGS=$((WARNINGS + 1))
else
    echo "  PASS: /api/health/samples"
fi

echo ""

# Test 4: Support ticket POST (the bug we just fixed - 405 means missing handler)
echo "Testing API endpoints..."
SUPPORT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/support/tickets" -H "Content-Type: application/json" -d '{}' 2>/dev/null)
if [ "$SUPPORT" = "405" ]; then
    echo "  FAIL: /api/support/tickets POST returns 405 (missing handler!)"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: /api/support/tickets POST (returns $SUPPORT)"
fi

# Test 5: Contact form POST
CONTACT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/contact" -H "Content-Type: application/json" -d '{}' 2>/dev/null)
if [ "$CONTACT" = "405" ]; then
    echo "  FAIL: /api/contact POST returns 405 (missing handler!)"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: /api/contact POST (returns $CONTACT)"
fi

# Test 6: Homepage samples API
HOMEPAGE_SAMPLES=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/homepage-samples/list" 2>/dev/null)
if [ "$HOMEPAGE_SAMPLES" != "200" ]; then
    echo "  WARN: /api/homepage-samples/list returned $HOMEPAGE_SAMPLES"
    WARNINGS=$((WARNINGS + 1))
else
    echo "  PASS: /api/homepage-samples/list"
fi

echo ""

# Test 7: Homepage loads for key languages
echo "Testing homepage for all languages..."
LANG_FAILURES=0
for LANG in en de fr es it pt nl sv da no fi; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$LANG" 2>/dev/null)
    if [ "$STATUS" != "200" ]; then
        echo "  FAIL: /$LANG homepage returned $STATUS"
        LANG_FAILURES=$((LANG_FAILURES + 1))
    fi
done

if [ $LANG_FAILURES -eq 0 ]; then
    echo "  PASS: All 11 language homepages load"
else
    echo "  FAIL: $LANG_FAILURES language homepage(s) failed"
    FAILURES=$((FAILURES + LANG_FAILURES))
fi

echo ""

# Test 8: Sample product page loads
echo "Testing sample product pages..."
PRODUCT_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/en/addition" 2>/dev/null)
if [ "$PRODUCT_STATUS" != "200" ]; then
    echo "  FAIL: /en/addition product page returned $PRODUCT_STATUS"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: Product page /en/addition"
fi

echo ""

# Test 9: Hero images accessible via nginx
echo "Testing static assets via nginx..."
HERO=$(curl -s -o /dev/null -w "%{http_code}" "https://localhost/samples/english/homepage/hero-portrait_preview.webp" 2>/dev/null || echo "000")
if [ "$HERO" = "200" ]; then
    echo "  PASS: Hero images accessible via nginx"
elif [ "$HERO" = "000" ]; then
    echo "  WARN: Could not connect to nginx for hero images (SSL/cert issue?)"
    WARNINGS=$((WARNINGS + 1))
else
    echo "  WARN: Hero image returned $HERO (check nginx config)"
    WARNINGS=$((WARNINGS + 1))
fi

# Test 10: Sample thumbnails accessible
SAMPLE=$(curl -s -o /dev/null -w "%{http_code}" "https://localhost/samples/english/homepage/addition-thumbnail_thumb.webp" 2>/dev/null || echo "000")
if [ "$SAMPLE" = "200" ]; then
    echo "  PASS: Sample thumbnails accessible via nginx"
elif [ "$SAMPLE" = "000" ]; then
    echo "  WARN: Could not connect to nginx for thumbnails"
    WARNINGS=$((WARNINGS + 1))
else
    echo "  WARN: Sample thumbnail returned $SAMPLE"
    WARNINGS=$((WARNINGS + 1))
fi

echo ""

# Test 11: Check pricing page loads (important for conversions)
echo "Testing critical pages..."
PRICING=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/en/pricing" 2>/dev/null)
if [ "$PRICING" != "200" ]; then
    echo "  FAIL: /en/pricing returned $PRICING"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: Pricing page"
fi

# Test 12: Check support page loads
SUPPORT_PAGE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/en/support" 2>/dev/null)
if [ "$SUPPORT_PAGE" != "200" ]; then
    echo "  FAIL: /en/support returned $SUPPORT_PAGE"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: Support page"
fi

echo ""
echo "=========================================="

# Summary
if [ $FAILURES -gt 0 ]; then
    echo "SMOKE TESTS: $FAILURES FAILURE(S), $WARNINGS WARNING(S)"
    echo "=========================================="
    echo ""
    echo "DEPLOYMENT MAY HAVE ISSUES - CHECK LOGS ABOVE!"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo "SMOKE TESTS: ALL PASSED with $WARNINGS WARNING(S)"
    echo "=========================================="
    exit 0
else
    echo "SMOKE TESTS: ALL PASSED"
    echo "=========================================="
    exit 0
fi
