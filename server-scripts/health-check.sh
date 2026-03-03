#!/bin/bash
# Health check script for LessonCraftStudio
# Monitors samples, worksheet generators, translations, and admin panels
# for unexpected file count drops and sends alerts
#
# Location on server: /var/www/lcs-media/scripts/health-check.sh

SAMPLES_DIR="/var/www/lcs-media/samples"
WG_DIR="/var/www/lcs-media/worksheet-generators"
ADMIN_DIR="/var/www/lcs-media/admin-panels"
STATE_DIR="/var/run/lcs-media"
ALERT_EMAIL="${LCS_ALERT_EMAIL:-}"  # Set via environment variable
DROP_THRESHOLD=10  # Alert if count drops by more than 10%

# Create state directory
mkdir -p "$STATE_DIR"

ISSUES=0

# ============================================
# CHECK SAMPLES
# ============================================
CURRENT_JPEG=$(find "$SAMPLES_DIR" -name "*.jpeg" 2>/dev/null | wc -l)
CURRENT_WEBP=$(find "$SAMPLES_DIR" -name "*.webp" 2>/dev/null | wc -l)
CURRENT_SAMPLE_TOTAL=$((CURRENT_JPEG + CURRENT_WEBP))

# Read previous sample count
PREV_SAMPLE=0
if [ -f "$STATE_DIR/sample_count" ]; then
    PREV_SAMPLE=$(cat "$STATE_DIR/sample_count" 2>/dev/null || echo "0")
fi
echo "$CURRENT_SAMPLE_TOTAL" > "$STATE_DIR/sample_count"

# Check sample drop
if [ "$PREV_SAMPLE" -gt 0 ]; then
    SAMPLE_DROP=$(( (PREV_SAMPLE - CURRENT_SAMPLE_TOTAL) * 100 / PREV_SAMPLE ))
    if [ "$SAMPLE_DROP" -gt "$DROP_THRESHOLD" ]; then
        MESSAGE="ALERT: Sample count dropped from $PREV_SAMPLE to $CURRENT_SAMPLE_TOTAL ($SAMPLE_DROP% drop)"
        echo "$MESSAGE" >&2
        logger -t lcs-health-check "$MESSAGE"
        [ -n "$ALERT_EMAIL" ] && echo "$MESSAGE" | mail -s "LCS Alert: Sample Count Drop" "$ALERT_EMAIL"
        ISSUES=$((ISSUES + 1))
    fi
fi

# ============================================
# CHECK WORKSHEET GENERATORS
# ============================================
CURRENT_WG_HTML=$(find "$WG_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)
CURRENT_WG_JS=$(find "$WG_DIR/js" -name "*.js" -type f 2>/dev/null | wc -l)

# Read previous worksheet counts
PREV_WG_HTML=0
PREV_WG_JS=0
if [ -f "$STATE_DIR/wg_html_count" ]; then
    PREV_WG_HTML=$(cat "$STATE_DIR/wg_html_count" 2>/dev/null || echo "0")
fi
if [ -f "$STATE_DIR/wg_js_count" ]; then
    PREV_WG_JS=$(cat "$STATE_DIR/wg_js_count" 2>/dev/null || echo "0")
fi
echo "$CURRENT_WG_HTML" > "$STATE_DIR/wg_html_count"
echo "$CURRENT_WG_JS" > "$STATE_DIR/wg_js_count"

# Check worksheet HTML drop
if [ "$PREV_WG_HTML" -gt 0 ]; then
    WG_HTML_DROP=$(( (PREV_WG_HTML - CURRENT_WG_HTML) * 100 / PREV_WG_HTML ))
    if [ "$WG_HTML_DROP" -gt "$DROP_THRESHOLD" ]; then
        MESSAGE="ALERT: Worksheet HTML count dropped from $PREV_WG_HTML to $CURRENT_WG_HTML ($WG_HTML_DROP% drop)"
        echo "$MESSAGE" >&2
        logger -t lcs-health-check "$MESSAGE"
        [ -n "$ALERT_EMAIL" ] && echo "$MESSAGE" | mail -s "LCS Alert: Worksheet HTML Drop" "$ALERT_EMAIL"
        ISSUES=$((ISSUES + 1))
    fi
fi

# Check translation JS drop
if [ "$PREV_WG_JS" -gt 0 ]; then
    WG_JS_DROP=$(( (PREV_WG_JS - CURRENT_WG_JS) * 100 / PREV_WG_JS ))
    if [ "$WG_JS_DROP" -gt "$DROP_THRESHOLD" ]; then
        MESSAGE="ALERT: Translation JS count dropped from $PREV_WG_JS to $CURRENT_WG_JS ($WG_JS_DROP% drop)"
        echo "$MESSAGE" >&2
        logger -t lcs-health-check "$MESSAGE"
        [ -n "$ALERT_EMAIL" ] && echo "$MESSAGE" | mail -s "LCS Alert: Translation JS Drop" "$ALERT_EMAIL"
        ISSUES=$((ISSUES + 1))
    fi
fi

# ============================================
# CHECK ADMIN PANELS
# ============================================
CURRENT_ADMIN=$(find "$ADMIN_DIR" -maxdepth 1 -name "*.html" -type f 2>/dev/null | wc -l)

PREV_ADMIN=0
if [ -f "$STATE_DIR/admin_count" ]; then
    PREV_ADMIN=$(cat "$STATE_DIR/admin_count" 2>/dev/null || echo "0")
fi
echo "$CURRENT_ADMIN" > "$STATE_DIR/admin_count"

if [ "$PREV_ADMIN" -gt 0 ] && [ "$CURRENT_ADMIN" -lt "$PREV_ADMIN" ]; then
    MESSAGE="ALERT: Admin panel count dropped from $PREV_ADMIN to $CURRENT_ADMIN"
    echo "$MESSAGE" >&2
    logger -t lcs-health-check "$MESSAGE"
    [ -n "$ALERT_EMAIL" ] && echo "$MESSAGE" | mail -s "LCS Alert: Admin Panel Drop" "$ALERT_EMAIL"
    ISSUES=$((ISSUES + 1))
fi

# ============================================
# REPORT
# ============================================
if [ "$ISSUES" -gt 0 ]; then
    exit 1
fi

# Check for empty samples (OK for new installs)
if [ "$CURRENT_SAMPLE_TOTAL" -eq 0 ] && [ "$CURRENT_WG_HTML" -eq 0 ]; then
    echo "INFO: No files found (may be OK for fresh install)"
    exit 0
fi

echo "OK: Samples=$CURRENT_SAMPLE_TOTAL (JPEG:$CURRENT_JPEG WebP:$CURRENT_WEBP) | Worksheets=$CURRENT_WG_HTML HTML $CURRENT_WG_JS JS | Admin=$CURRENT_ADMIN"
exit 0
