#!/bin/bash
# Fix shadow match vertical alignment issue in landscape + vertical cut mode

FILE_PATH="/opt/lessoncraftstudio/frontend/.next/standalone/public/worksheet-generators/shadow match.html"

# Create backup
cp "$FILE_PATH" "$FILE_PATH.backup-$(date +%Y%m%d-%H%M%S)"

# Step 1: Calculate targetHeight BEFORE the loop and store it
# Find line after imgSize calculation (around line 2441) and add targetHeight calculation
sed -i '/^          }$/,/^          \/\/ Create first halves/ {
    /^          \/\/ Create first halves/ i\
\
          // Calculate FIXED target height for consistent vertical alignment\
          const targetHeight = data.cutDirection === "horizontal" ? imgSize * 0.8 : imgSize * 1.3;
}' "$FILE_PATH"

# Step 2: Replace the targetHeight calculation inside the callback to use the pre-calculated value
sed -i 's/let targetHeight;/\/\/ Use pre-calculated targetHeight (defined before loop)/g' "$FILE_PATH"
sed -i '/\/\/ Use pre-calculated targetHeight/,/targetHeight = imgSize \* 1.3;/ {
    /if (data\.cutDirection === .horizontal.)/ d
    /targetHeight = imgSize \* 0\.8;/ d
    /} else {/ d
    /targetHeight = imgSize \* 1\.3;/ d
    /}$/ {
        N
        /\n[[:space:]]*$/ d
    }
}' "$FILE_PATH"

# Step 3: Replace getScaledHeight() with targetHeight in positioning calculations
# Line ~2544 and ~2607
sed -i 's/yPos = firstRowImageY - (half\.img\.getScaledHeight() \/ 2);/yPos = firstRowImageY - (targetHeight \/ 2);  \/\/ Use fixed targetHeight for perfect alignment/g' "$FILE_PATH"
sed -i 's/yPos = secondRowImageY - (half\.img\.getScaledHeight() \/ 2);/yPos = secondRowImageY - (targetHeight \/ 2);  \/\/ Use fixed targetHeight for perfect alignment/g' "$FILE_PATH"

# Step 4: Update label positioning to also use targetHeight for consistency
sed -i 's/labelY = yPos + half\.img\.getScaledHeight() + verticalSpacing;/labelY = yPos + targetHeight + verticalSpacing;  \/\/ Use fixed targetHeight/g' "$FILE_PATH"

echo "✅ Fix applied successfully!"
echo "Backup saved to: $FILE_PATH.backup-$(date +%Y%m%d-%H%M%S)"
echo ""
echo "Please restart PM2 to apply changes:"
echo "pm2 restart lessoncraftstudio"
