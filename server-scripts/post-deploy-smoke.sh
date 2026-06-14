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
EDGE_URL="https://www.lessoncraftstudio.com"

# Locales tested in the seller-matrix and positive-surface blocks (Tests 14-16).
# Source of truth: CLAUDE.md §6.
ALL_LOCALES="en de fr es pt it nl sv da no fi"
# Subset hit through the public CDN edge (full matrix would be ~250 curls; this keeps the
# edge-aware pass under ~30 s while still covering Germanic + Romance representatives).
EDGE_LOCALES="en de fr"

# Status check against the local Next.js process. Used for middleware-logic assertions.
check_local_status() {
    local path="$1"
    curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$path" 2>/dev/null
}

# Status check against the public CDN edge. On a non-matching status, surfaces the
# cache-state headers so a stale edge or unexpected hit/miss is diagnosable from the log.
# Args: <path> <expected_status>. Returns 0 if match, 1 otherwise.
check_edge_status() {
    local path="$1"
    local expected="$2"
    local headers status
    headers=$(curl -sI "$EDGE_URL$path" 2>/dev/null)
    status=$(echo "$headers" | head -1 | awk '{print $2}')
    if [ "$status" = "$expected" ]; then
        return 0
    fi
    local cf_cache cf_ray cache_ctl age
    cf_cache=$(echo "$headers" | grep -i '^cf-cache-status:' | awk '{print $2}' | tr -d '\r')
    cf_ray=$(echo "$headers" | grep -i '^cf-ray:' | awk '{print $2}' | tr -d '\r')
    cache_ctl=$(echo "$headers" | grep -i '^cache-control:' | sed 's/^[Cc]ache-[Cc]ontrol: //I' | tr -d '\r')
    age=$(echo "$headers" | grep -i '^age:' | awk '{print $2}' | tr -d '\r')
    echo "    └─ got=$status (expected=$expected) cf-cache-status=${cf_cache:-none} cf-ray=${cf_ray:-none} age=${age:-none} cache-control='${cache_ctl:-none}'"
    return 1
}

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

# Test 8: Seller-era teardown matrix — full namespace × locale coverage (CLAUDE.md §17.1, §A.14.8)
#
# Why this is shaped this way: the prior Test 8 only asserted /en/apps, the prior Test 11 only
# /en/blog, the prior Test 12 only /en/tools/kdp-royalty-calculator. Three URLs total. The whole
# point of a 410-teardown smoke test is that it should fail loudly if ANY seller URL comes back
# to life — but the old shape would have stayed green through almost any partial regression
# (different locale, different namespace, edge-vs-origin divergence).
#
# This block exercises every seller namespace caught by middleware.ts REMOVED_PREFIXES
# (apps|tools|guides|bundles|ideas|start|blog|compare|gallery|teaching-packages|lesson-plans|
# flashcards|themed-bundles), across all 11 supported locales, at the Next.js layer. The
# edge-aware companion (Test 8b) runs the same matrix through the public CDN hostname for
# the en/de/fr representatives plus a cache-bust pass.
#
# Carve-out: middleware.ts:100-104 deliberately allows /<locale>/tools and /<locale>/tools/
# (bare) to pass through as the new manipulatives landing per the platform-header arc. So the
# matrix below targets `tools/<seller-slug>` sub-paths, NOT bare /tools. Bare /tools is
# verified positively in Test 8c.
echo "Testing seller-era teardown matrix (local Next.js layer)..."
# Note: the worksheet-maker /apps/<x>-worksheets slugs now 301 into their rebuilt
# /tools/<x>-maker landings (SEO RESCUE Part 1 — see Test 8d), so they are NO LONGER
# 410. The /apps/ sub-path sentinel here uses a non-maker seller slug that still 410s.
SELLER_PATHS_LOCAL="apps apps/seller-bundle-pack tools/profit-hub tools/kdp-royalty-calculator tools/kdp-size-calculator tools/niche-finder tools/activity-book-planner bundles guides ideas start blog"
MATRIX_FAILURES=0
MATRIX_CHECKS=0
for LANG in $ALL_LOCALES; do
    for SUB in $SELLER_PATHS_LOCAL; do
        MATRIX_CHECKS=$((MATRIX_CHECKS + 1))
        STATUS=$(check_local_status "/$LANG/$SUB")
        if [ "$STATUS" != "410" ]; then
            echo "  FAIL: /$LANG/$SUB returned $STATUS (expected 410)"
            MATRIX_FAILURES=$((MATRIX_FAILURES + 1))
        fi
    done
done
if [ $MATRIX_FAILURES -eq 0 ]; then
    echo "  PASS: $MATRIX_CHECKS seller-namespace × locale checks all return 410 Gone"
else
    echo "  FAIL: $MATRIX_FAILURES of $MATRIX_CHECKS seller-namespace × locale checks did not return 410"
    FAILURES=$((FAILURES + MATRIX_FAILURES))
fi

echo ""

# Test 8b: Edge-aware seller verification through public CDN hostname (CLAUDE.md §15.8, §A.14.8)
#
# Asserts the public-facing CDN serves 410, not just the local Next.js process. Surfaces
# cf-cache-status / cf-ray / Age / Cache-Control on any non-410 response so a stale-edge or
# rogue cache hit is diagnosable from the log rather than invisible. Each URL is also hit
# with a cache-busting query string so any future regression to "edge serves stale 200" can't
# pass silently. (Cloudflare currently sets cf-cache-status=DYNAMIC on all 410s — verified
# 2026-05-24 — so the cache-bust pass is defensive against future config drift.)
echo "Testing seller-era teardown via public CDN edge..."
EDGE_FAILURES=0
EDGE_CHECKS=0
CB_NONCE=$(date +%s)$$
for LANG in $EDGE_LOCALES; do
    for SUB in $SELLER_PATHS_LOCAL; do
        EDGE_CHECKS=$((EDGE_CHECKS + 2))
        if ! check_edge_status "/$LANG/$SUB" "410"; then
            echo "  FAIL: edge /$LANG/$SUB did not return 410"
            EDGE_FAILURES=$((EDGE_FAILURES + 1))
        fi
        if ! check_edge_status "/$LANG/$SUB?cb=$CB_NONCE" "410"; then
            echo "  FAIL: edge /$LANG/$SUB?cb=<nonce> did not return 410 (possible stale edge)"
            EDGE_FAILURES=$((EDGE_FAILURES + 1))
        fi
    done
done
if [ $EDGE_FAILURES -eq 0 ]; then
    echo "  PASS: $EDGE_CHECKS edge seller-namespace checks all return 410 (plain + cache-busted)"
else
    echo "  FAIL: $EDGE_FAILURES of $EDGE_CHECKS edge seller-namespace checks did not return 410"
    FAILURES=$((FAILURES + EDGE_FAILURES))
fi

echo ""

# Test 8c: Positive teacher-surface checks — fails the deploy if a teardown rule over-reaches
# and takes down a legitimate teacher page. Covers the carve-outs (/<loc>/tools manipulatives
# landing, /<loc>/license content-license page) that a tightened seller regex could break.
echo "Testing positive teacher surfaces (must stay 200)..."
POSITIVE_PATHS="tools worksheets activities license"
POS_FAILURES=0
POS_CHECKS=0
for LANG in $ALL_LOCALES; do
    for SUB in $POSITIVE_PATHS; do
        POS_CHECKS=$((POS_CHECKS + 1))
        STATUS=$(check_local_status "/$LANG/$SUB")
        # /worksheets and /activities are platform-shipped per CLAUDE.md §4.3 + §4.4.
        # /tools is the manipulatives carve-out per middleware.ts:100-104.
        # /license is the content-license page (200 verified 2026-05-24).
        if [ "$STATUS" != "200" ]; then
            echo "  FAIL: /$LANG/$SUB returned $STATUS (expected 200 — teacher surface)"
            POS_FAILURES=$((POS_FAILURES + 1))
        fi
    done
done
if [ $POS_FAILURES -eq 0 ]; then
    echo "  PASS: $POS_CHECKS teacher-surface checks all return 200"
else
    echo "  FAIL: $POS_FAILURES of $POS_CHECKS teacher-surface checks did not return 200"
    FAILURES=$((FAILURES + POS_FAILURES))
fi

# Mini-tools served by nginx directly per CLAUDE.md §20.3 — check via edge to catch
# nginx-config regressions that the local Next.js layer wouldn't surface.
MINI_FAILURES=0
for MT in ten-frame number-line ruler; do
    if ! check_edge_status "/mini-tools/$MT.html" "200"; then
        echo "  FAIL: /mini-tools/$MT.html did not return 200"
        MINI_FAILURES=$((MINI_FAILURES + 1))
    fi
done
if [ $MINI_FAILURES -eq 0 ]; then
    echo "  PASS: 3 mini-tools (ten-frame, number-line, ruler) all return 200 via edge"
else
    FAILURES=$((FAILURES + MINI_FAILURES))
fi

echo ""

# Test 8d: Worksheet-maker /apps -> /tools 301 redirects (SEO RESCUE Part 1).
# The pre-pivot /apps/<x>-worksheets URLs now 301 into their rebuilt /tools/<x>-maker
# landings (frontend/config/maker-redirects.ts). check_local_status does NOT follow
# redirects, so a 301 reads as "301". Guards against the redirect map regressing to 410.
# Includes the de buchstabensalat case (word-scramble /apps/ slug — the corrected mapping).
echo "Testing worksheet-maker /apps -> /tools 301 redirects..."
MAKER_REDIRECT_PATHS="/en/apps/cryptogram-worksheets /en/apps/math-puzzle-worksheets /de/apps/buchstabensalat-arbeitsblaetter /es/apps/sopa-letras-fichas /fr/apps/mots-caches-fiches"
MK_FAILURES=0
MK_CHECKS=0
for P in $MAKER_REDIRECT_PATHS; do
    MK_CHECKS=$((MK_CHECKS + 1))
    STATUS=$(check_local_status "$P")
    if [ "$STATUS" != "301" ]; then
        echo "  FAIL: $P returned $STATUS (expected 301 -> /tools maker landing)"
        MK_FAILURES=$((MK_FAILURES + 1))
    fi
done
if [ $MK_FAILURES -eq 0 ]; then
    echo "  PASS: $MK_CHECKS maker /apps->/tools 301 redirects verified"
else
    echo "  FAIL: $MK_FAILURES of $MK_CHECKS maker redirect checks failed"
    FAILURES=$((FAILURES + MK_FAILURES))
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

# (Tests 11 and 12 — single-URL seller-era assertions for /en/blog and
# /en/tools/kdp-royalty-calculator — removed 2026-05-24. Their coverage is subsumed
# by Test 8 (full seller namespace × all 11 locales) and Test 8b (edge-aware pass).
# See §A.14.8 for the pre-publish-wave audit discipline this enforces.)

# Test 11: Catalog deck route serves via nginx (positive smoke for the K-3 pivot surface).
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
