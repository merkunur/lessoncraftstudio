#!/usr/bin/env python3
"""Patch deploy.sh to add image library WebP guards (pre-deploy + post-deploy)."""

with open('/opt/lessoncraftstudio/deploy.sh', 'r') as f:
    content = f.read()

# First restore from backup in case of partial prior patch
with open('/opt/lessoncraftstudio/deploy.sh.bak', 'r') as f:
    content = f.read()

# 1. Pre-deploy: Add WebP check after the PNG count line and its guard
old_pre = 'echo "   Found $IMAGE_LIB_COUNT PNG files in isolated storage"\necho "\u2705 Image library protected"'
new_pre = '''echo "   Found $IMAGE_LIB_COUNT PNG files in isolated storage"
IMAGE_LIB_WEBP_COUNT=$(find /var/www/lcs-media/image-library -type f -name "*.webp" 2>/dev/null | wc -l)
if [ "$IMAGE_LIB_WEBP_COUNT" -lt 3000 ]; then
    echo ""
    echo "\u26d4 CRITICAL: Image library WebP protection check FAILED!"
    echo "   Expected: 3000+ WebP files"
    echo "   Found: $IMAGE_LIB_WEBP_COUNT files"
    echo ""
    exit 1
fi
echo "   Found $IMAGE_LIB_WEBP_COUNT WebP files in isolated storage"
echo "\u2705 Image library protected"'''

content = content.replace(old_pre, new_pre, 1)

# 2. Post-deploy: Add WebP verification
old_post = 'POST_IMAGE_LIB_COUNT=$(find /var/www/lcs-media/image-library -type f -name "*.png" 2>/dev/null | wc -l)\necho "   Found $POST_IMAGE_LIB_COUNT PNG files"'
new_post = 'POST_IMAGE_LIB_COUNT=$(find /var/www/lcs-media/image-library -type f -name "*.png" 2>/dev/null | wc -l)\nPOST_IMAGE_LIB_WEBP=$(find /var/www/lcs-media/image-library -type f -name "*.webp" 2>/dev/null | wc -l)\necho "   Found $POST_IMAGE_LIB_COUNT PNG files, $POST_IMAGE_LIB_WEBP WebP files"'

content = content.replace(old_post, new_post, 1)

# 3. Add WebP drop check in post-deploy verification
old_verify = '''if [ "$POST_IMAGE_LIB_COUNT" -lt "$IMAGE_LIB_COUNT" ]; then
    echo ""
    echo "\u26a0\ufe0f  WARNING: Image library count dropped from $IMAGE_LIB_COUNT to $POST_IMAGE_LIB_COUNT"
    echo "    This should NOT happen - image library is in isolated storage!"
    echo "    Investigate immediately."
else
    echo "\u2705 Image library verified in isolated storage"
fi'''

new_verify = '''if [ "$POST_IMAGE_LIB_COUNT" -lt "$IMAGE_LIB_COUNT" ]; then
    echo ""
    echo "\u26a0\ufe0f  WARNING: Image library PNG count dropped from $IMAGE_LIB_COUNT to $POST_IMAGE_LIB_COUNT"
    echo "    This should NOT happen - image library is in isolated storage!"
    echo "    Investigate immediately."
elif [ "$POST_IMAGE_LIB_WEBP" -lt "$IMAGE_LIB_WEBP_COUNT" ]; then
    echo ""
    echo "\u26a0\ufe0f  WARNING: Image library WebP count dropped from $IMAGE_LIB_WEBP_COUNT to $POST_IMAGE_LIB_WEBP"
    echo "    This should NOT happen - image library is in isolated storage!"
    echo "    Investigate immediately."
else
    echo "\u2705 Image library verified in isolated storage"
fi'''

content = content.replace(old_verify, new_verify, 1)

# 4. Update final summary line
old_summary = 'echo "Image library: $POST_IMAGE_LIB_COUNT PNG files (isolated)"'
new_summary = 'echo "Image library: $POST_IMAGE_LIB_COUNT PNG + $POST_IMAGE_LIB_WEBP WebP files (isolated)"'
content = content.replace(old_summary, new_summary, 1)

with open('/opt/lessoncraftstudio/deploy.sh', 'w') as f:
    f.write(content)

# Verify the patches applied
with open('/opt/lessoncraftstudio/deploy.sh', 'r') as f:
    final = f.read()

checks = [
    'IMAGE_LIB_WEBP_COUNT',
    'POST_IMAGE_LIB_WEBP',
    'WebP protection check FAILED',
    'WebP count dropped',
]
for check in checks:
    if check in final:
        print(f'  OK: found "{check}"')
    else:
        print(f'  MISSING: "{check}" not found!')

print('deploy.sh patched successfully')
