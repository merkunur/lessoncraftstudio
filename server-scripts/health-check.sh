#!/bin/bash
# Health check script for LessonCraftStudio samples
# Monitors for unexpected file count drops and sends alerts
#
# Location on server: /var/www/lcs-media/scripts/health-check.sh

SAMPLES_DIR="/var/www/lcs-media/samples"
STATE_DIR="/var/run/lcs-media"
STATE_FILE="$STATE_DIR/sample_count"
ALERT_EMAIL="${LCS_ALERT_EMAIL:-}"  # Set via environment variable
DROP_THRESHOLD=10  # Alert if count drops by more than 10%

# Create state directory
mkdir -p "$STATE_DIR"

# Count current files
CURRENT_JPEG=$(find "$SAMPLES_DIR" -name "*.jpeg" 2>/dev/null | wc -l)
CURRENT_WEBP=$(find "$SAMPLES_DIR" -name "*.webp" 2>/dev/null | wc -l)
CURRENT_TOTAL=$((CURRENT_JPEG + CURRENT_WEBP))

# Read previous count
PREVIOUS_TOTAL=0
if [ -f "$STATE_FILE" ]; then
    PREVIOUS_TOTAL=$(cat "$STATE_FILE" 2>/dev/null || echo "0")
fi

# Save current count
echo "$CURRENT_TOTAL" > "$STATE_FILE"

# Calculate drop percentage
if [ "$PREVIOUS_TOTAL" -gt 0 ]; then
    DROP=$((PREVIOUS_TOTAL - CURRENT_TOTAL))
    DROP_PERCENT=$((DROP * 100 / PREVIOUS_TOTAL))
else
    DROP=0
    DROP_PERCENT=0
fi

# Check for significant drop
if [ "$PREVIOUS_TOTAL" -gt 0 ] && [ "$DROP_PERCENT" -gt "$DROP_THRESHOLD" ]; then
    MESSAGE="ALERT: Sample count dropped from $PREVIOUS_TOTAL to $CURRENT_TOTAL ($DROP_PERCENT% drop)"
    echo "$MESSAGE" >&2

    # Send email alert if configured
    if [ -n "$ALERT_EMAIL" ]; then
        echo "$MESSAGE" | mail -s "LCS Sample Alert: File Count Drop Detected" "$ALERT_EMAIL"
    fi

    # Log to syslog
    logger -t lcs-health-check "$MESSAGE"

    exit 1
fi

# Check for empty samples (might be OK for new installs)
if [ "$CURRENT_TOTAL" -eq 0 ]; then
    echo "INFO: No sample files found (may be OK for fresh install)"
    exit 0
fi

# All good
echo "OK: $CURRENT_TOTAL files (JPEG: $CURRENT_JPEG, WebP: $CURRENT_WEBP)"
exit 0
