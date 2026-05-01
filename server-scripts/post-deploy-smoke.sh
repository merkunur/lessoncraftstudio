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

# Test 8: Seller-era /en/apps catalog confirmed deleted (CLAUDE.md §17.1, Pass 1+2)
echo "Testing seller-era surface deletions..."
APPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/en/apps" 2>/dev/null)
if [ "$APPS_STATUS" != "404" ]; then
    echo "  FAIL: /en/apps returned $APPS_STATUS (expected 404 — seller catalog should be deleted)"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: /en/apps returns 404 (seller catalog deletion holds)"
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

# Test 11: Seller-era /en/blog confirmed deleted (CLAUDE.md §17.1, Pass 1)
BLOG_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/en/blog" 2>/dev/null)
if [ "$BLOG_STATUS" != "404" ]; then
    echo "  FAIL: /en/blog returned $BLOG_STATUS (expected 404 — seller blog should be deleted)"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: /en/blog returns 404 (seller blog deletion holds)"
fi

# Test 12: Seller-era /en/tools/kdp-royalty-calculator confirmed deleted (CLAUDE.md §17.1, Pass 1)
KDP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/en/tools/kdp-royalty-calculator" 2>/dev/null)
if [ "$KDP_STATUS" != "404" ]; then
    echo "  FAIL: /en/tools/kdp-royalty-calculator returned $KDP_STATUS (expected 404 — KDP tool should be deleted)"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: /en/tools/kdp-royalty-calculator returns 404 (seller tool deletion holds)"
fi

# Test 12b: Catalog deck route serves via nginx (positive smoke for the K-3 pivot surface).
# Hit nginx (port 443) directly because deck assets live at /var/www/lcs-media/decks/ — see CLAUDE.md §15.7.
# Use --resolve to bypass the cert SAN, then -k to ignore the local cert mismatch.
DECK_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -k "https://localhost/en/decks/addition-image-image/" -H "Host: www.lessoncraftstudio.com" 2>/dev/null)
if [ "$DECK_STATUS" != "200" ]; then
    echo "  FAIL: /en/decks/addition-image-image/ returned $DECK_STATUS (expected 200 — catalog deck route)"
    FAILURES=$((FAILURES + 1))
else
    echo "  PASS: /en/decks/addition-image-image/ serves (catalog deck route works)"
fi

# Test 13: Image translation diacritics (Swedish bear = Björn, not Bjorn)
echo ""
echo "Testing image translation diacritics..."
BROKEN_DIACRITICS=$(PGPASSWORD=LcS2025SecureDBPass psql -U lcs_user -d lessoncraftstudio_prod -t -c \
  "SELECT COUNT(*) FROM image_library_items WHERE
   translations->>'sv' IN ('Bjorn','Dorr','Fonster','Kylskap','Sang') OR
   translations->>'de' IN ('Bar','Tur','Kuhlschrank','Lowe','Schildkrote') OR
   translations->>'fr' IN ('Elephant','Reveil','Ane','Chevre','Meduse');" 2>/dev/null | tr -d ' ')

if [ "$BROKEN_DIACRITICS" = "0" ] 2>/dev/null; then
    echo "  PASS: Image translation diacritics correct"
elif [ -n "$BROKEN_DIACRITICS" ] 2>/dev/null; then
    echo "  FAIL: $BROKEN_DIACRITICS rows have stripped diacritics (Bjorn instead of Björn, etc.)"
    FAILURES=$((FAILURES + 1))
else
    echo "  WARN: Could not query diacritics (DB connection issue?)"
    WARNINGS=$((WARNINGS + 1))
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
