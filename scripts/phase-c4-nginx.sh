#!/bin/bash
# Phase C.4 — add 23 nginx 301 redirects for old space-named URLs.
# Runs ON THE SERVER. Backs up the current config, inserts rewrite rules,
# validates, reloads. Rollback path: restore the pre-change .bak file.
#
# Uses [ ] regex character class to match the literal space after nginx
# URI-decodes the request. This avoids nginx directive-argument-splitting
# on whitespace.

set -e

NGINX_CONFIG="/etc/nginx/sites-enabled/lessoncraftstudio"
# Write backups to /tmp to avoid nginx auto-loading them from sites-enabled.
BACKUP="/tmp/lessoncraftstudio.pre-c4-$(date +%Y%m%d-%H%M%S).bak"

echo "Backing up nginx config..."
cp "$NGINX_CONFIG" "$BACKUP"
echo "Backup: $BACKUP"

# Check if our marker already exists (idempotency)
if grep -q "# C4-REWRITES-BEGIN" "$NGINX_CONFIG"; then
  echo "Rewrites already present. Exiting (idempotent)."
  exit 0
fi

# Build rewrite rules file — use printf to avoid shell word-splitting pitfalls
# Pattern: `[ ]` matches a literal space (works after nginx URI-decodes %20).
#          `\.` would be plain `.` in regex; we want regex-escaped dot.
REWRITE_FILE=$(mktemp)
cat > "$REWRITE_FILE" <<'EOF'
        # C4-REWRITES-BEGIN — 301 redirects for %20 URLs → hyphenated URLs
        rewrite "^/worksheet-generators/alphabet[ ]train\.html$" /worksheet-generators/alphabet-train.html permanent;
        rewrite "^/worksheet-generators/big[ ]small\.html$" /worksheet-generators/big-small.html permanent;
        rewrite "^/worksheet-generators/chart[ ]count\.html$" /worksheet-generators/chart-count.html permanent;
        rewrite "^/worksheet-generators/code[ ]addition\.html$" /worksheet-generators/code-addition.html permanent;
        rewrite "^/worksheet-generators/cvc[ ]words\.html$" /worksheet-generators/cvc-words.html permanent;
        rewrite "^/worksheet-generators/draw[ ]and[ ]color\.html$" /worksheet-generators/draw-and-color.html permanent;
        rewrite "^/worksheet-generators/drawing[ ]lines\.html$" /worksheet-generators/drawing-lines.html permanent;
        rewrite "^/worksheet-generators/find[ ]and[ ]count\.html$" /worksheet-generators/find-and-count.html permanent;
        rewrite "^/worksheet-generators/find[ ]objects\.html$" /worksheet-generators/find-objects.html permanent;
        rewrite "^/worksheet-generators/grid[ ]match\.html$" /worksheet-generators/grid-match.html permanent;
        rewrite "^/worksheet-generators/math[ ]puzzle\.html$" /worksheet-generators/math-puzzle.html permanent;
        rewrite "^/worksheet-generators/math[ ]worksheet\.html$" /worksheet-generators/math-worksheet.html permanent;
        rewrite "^/worksheet-generators/missing[ ]pieces\.html$" /worksheet-generators/missing-pieces.html permanent;
        rewrite "^/worksheet-generators/more[ ]less\.html$" /worksheet-generators/more-less.html permanent;
        rewrite "^/worksheet-generators/odd[ ]one[ ]out\.html$" /worksheet-generators/odd-one-out.html permanent;
        rewrite "^/worksheet-generators/pattern[ ]train\.html$" /worksheet-generators/pattern-train.html permanent;
        rewrite "^/worksheet-generators/pattern[ ]worksheet\.html$" /worksheet-generators/pattern-worksheet.html permanent;
        rewrite "^/worksheet-generators/picture[ ]path\.html$" /worksheet-generators/picture-path.html permanent;
        rewrite "^/worksheet-generators/picture[ ]sort\.html$" /worksheet-generators/picture-sort.html permanent;
        rewrite "^/worksheet-generators/shadow[ ]match\.html$" /worksheet-generators/shadow-match.html permanent;
        rewrite "^/worksheet-generators/treasure[ ]hunt\.html$" /worksheet-generators/treasure-hunt.html permanent;
        rewrite "^/worksheet-generators/word[ ]guess\.html$" /worksheet-generators/word-guess.html permanent;
        rewrite "^/worksheet-generators/word[ ]scramble\.html$" /worksheet-generators/word-scramble.html permanent;
        # C4-REWRITES-END
EOF

# Insert the rewrite file's contents after the `location /worksheet-generators/ {` line.
TMPFILE=$(mktemp)
awk -v rewritefile="$REWRITE_FILE" '
  /^    location \/worksheet-generators\/ \{/ {
    print
    while ((getline line < rewritefile) > 0) print line
    close(rewritefile)
    next
  }
  { print }
' "$NGINX_CONFIG" > "$TMPFILE"

# Swap in and validate
cp "$TMPFILE" "$NGINX_CONFIG"
if ! nginx -t 2>&1; then
  echo "nginx -t FAILED. Restoring backup..."
  cp "$BACKUP" "$NGINX_CONFIG"
  rm -f "$TMPFILE" "$REWRITE_FILE"
  exit 1
fi
rm -f "$TMPFILE" "$REWRITE_FILE"

# Reload
systemctl reload nginx
echo "nginx reloaded."

# Verify a random redirect works
echo ""
echo "Testing redirect for 'alphabet%20train.html'..."
curl -sI "http://localhost/worksheet-generators/alphabet%20train.html" | head -3

echo ""
echo "Done."
