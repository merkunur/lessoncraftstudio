#!/usr/bin/env python3
"""Patch health-check.sh to add image library PNG+WebP monitoring."""

with open('/var/www/lcs-media/scripts/health-check.sh', 'r') as f:
    content = f.read()

# Add image library check section before the REPORT section
old_report = '# ============================================\n# REPORT\n# ============================================'

image_lib_section = '''# ============================================
# CHECK IMAGE LIBRARY
# ============================================
IMAGE_LIB_DIR="/var/www/lcs-media/image-library"
CURRENT_IMG_PNG=$(find "$IMAGE_LIB_DIR" -type f -name "*.png" 2>/dev/null | wc -l)
CURRENT_IMG_WEBP=$(find "$IMAGE_LIB_DIR" -type f -name "*.webp" 2>/dev/null | wc -l)

PREV_IMG_PNG=0
PREV_IMG_WEBP=0
if [ -f "$STATE_DIR/img_png_count" ]; then
    PREV_IMG_PNG=$(cat "$STATE_DIR/img_png_count" 2>/dev/null || echo "0")
fi
if [ -f "$STATE_DIR/img_webp_count" ]; then
    PREV_IMG_WEBP=$(cat "$STATE_DIR/img_webp_count" 2>/dev/null || echo "0")
fi
echo "$CURRENT_IMG_PNG" > "$STATE_DIR/img_png_count"
echo "$CURRENT_IMG_WEBP" > "$STATE_DIR/img_webp_count"

if [ "$PREV_IMG_PNG" -gt 0 ]; then
    IMG_PNG_DROP=$(( (PREV_IMG_PNG - CURRENT_IMG_PNG) * 100 / PREV_IMG_PNG ))
    if [ "$IMG_PNG_DROP" -gt "$DROP_THRESHOLD" ]; then
        MESSAGE="ALERT: Image library PNG count dropped from $PREV_IMG_PNG to $CURRENT_IMG_PNG ($IMG_PNG_DROP% drop)"
        echo "$MESSAGE" >&2
        logger -t lcs-health-check "$MESSAGE"
        [ -n "$ALERT_EMAIL" ] && echo "$MESSAGE" | mail -s "LCS Alert: Image Library PNG Drop" "$ALERT_EMAIL"
        ISSUES=$((ISSUES + 1))
    fi
fi

if [ "$PREV_IMG_WEBP" -gt 0 ]; then
    IMG_WEBP_DROP=$(( (PREV_IMG_WEBP - CURRENT_IMG_WEBP) * 100 / PREV_IMG_WEBP ))
    if [ "$IMG_WEBP_DROP" -gt "$DROP_THRESHOLD" ]; then
        MESSAGE="ALERT: Image library WebP count dropped from $PREV_IMG_WEBP to $CURRENT_IMG_WEBP ($IMG_WEBP_DROP% drop)"
        echo "$MESSAGE" >&2
        logger -t lcs-health-check "$MESSAGE"
        [ -n "$ALERT_EMAIL" ] && echo "$MESSAGE" | mail -s "LCS Alert: Image Library WebP Drop" "$ALERT_EMAIL"
        ISSUES=$((ISSUES + 1))
    fi
fi

# ============================================
# REPORT
# ============================================'''

content = content.replace(old_report, image_lib_section)

# Update the OK output line to include image library counts
old_ok = 'echo "OK: Samples=$CURRENT_SAMPLE_TOTAL (JPEG:$CURRENT_JPEG WebP:$CURRENT_WEBP) | Worksheets=$CURRENT_WG_HTML HTML $CURRENT_WG_JS JS | Admin=$CURRENT_ADMIN"'
new_ok = 'echo "OK: Samples=$CURRENT_SAMPLE_TOTAL (JPEG:$CURRENT_JPEG WebP:$CURRENT_WEBP) | ImageLib=PNG:$CURRENT_IMG_PNG WebP:$CURRENT_IMG_WEBP | Worksheets=$CURRENT_WG_HTML HTML $CURRENT_WG_JS JS | Admin=$CURRENT_ADMIN"'
content = content.replace(old_ok, new_ok)

with open('/var/www/lcs-media/scripts/health-check.sh', 'w') as f:
    f.write(content)

print('health-check.sh patched successfully')
