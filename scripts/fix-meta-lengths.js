/**
 * Trim meta descriptions that exceed 155 chars.
 * Strategy: Remove trailing periods, shorten common phrases.
 */
const fs = require('fs');
const path = require('path');

const files = [
  'frontend/config/app-content/en/cryptogram.ts',
  'frontend/config/app-content/en/draw-and-color.ts',
  'frontend/config/app-content/en/drawing-lines.ts',
  'frontend/config/tool-content/en/big-small.ts',
  'frontend/config/tool-content/en/crossword.ts',
  'frontend/config/tool-content/en/cryptogram.ts',
  'frontend/config/tool-content/en/draw-and-color.ts',
  'frontend/config/tool-content/en/drawing-lines.ts',
  'frontend/config/tool-content/en/grid-match.ts',
  'frontend/config/tool-content/en/missing-pieces.ts',
  'frontend/config/tool-content/en/more-less.ts',
  'frontend/config/tool-content/en/odd-one-out.ts',
  'frontend/config/tool-content/en/pattern-train.ts',
  'frontend/config/tool-content/en/picture-path.ts',
  'frontend/config/tool-content/en/picture-sort.ts',
  'frontend/config/tool-content/en/prepositions.ts',
  'frontend/config/tool-content/en/treasure-hunt.ts',
  'frontend/config/tool-content/en/word-search.ts',
  'frontend/config/guide-content/en/create-etsy-worksheet-bundles.ts',
  'frontend/config/guide-content/en/sell-educational-printables-etsy.ts',
];

let fixed = 0;

for (const relPath of files) {
  const filePath = path.join(__dirname, '..', relPath);
  let content = fs.readFileSync(filePath, 'utf8');

  const match = content.match(/metaDescription:\s*'([^']+)'/);
  if (!match) continue;

  const oldMeta = match[1];
  if (oldMeta.length <= 155) continue;

  let newMeta = oldMeta;

  // Common shortening strategies
  newMeta = newMeta.replace(' — no design skills needed.', '.');
  newMeta = newMeta.replace(' — no design skills needed', '');
  newMeta = newMeta.replace(' — no signup needed.', '.');
  newMeta = newMeta.replace(' — no signup needed', '');
  newMeta = newMeta.replace(' — no signup required.', '.');
  newMeta = newMeta.replace(' — no signup required', '');
  newMeta = newMeta.replace('Try free with watermark.', 'Try free.');
  newMeta = newMeta.replace('Try free — no signup.', 'Try free.');
  newMeta = newMeta.replace('Try free — no signup required.', 'Try free.');
  newMeta = newMeta.replace('Upgrade for commercial license to sell.', 'Upgrade to sell.');
  newMeta = newMeta.replace('Upgrade for commercial license.', 'Upgrade to sell.');
  newMeta = newMeta.replace(' and sell commercially', ' to sell');
  newMeta = newMeta.replace('commercial license. Try free', 'license. Try free');
  newMeta = newMeta.replace(', commercial license', ', license');

  // If still over, try more aggressive trimming
  if (newMeta.length > 155) {
    // Remove trailing period if present and over
    if (newMeta.endsWith('.') && newMeta.length === 156) {
      newMeta = newMeta.slice(0, -1);
    }
    // Replace " & " with " + " (saves 0 chars) or ","
    // Replace "worksheets" with "sheets" in some contexts
    if (newMeta.length > 155) {
      newMeta = newMeta.replace('worksheets', 'sheets');
    }
    if (newMeta.length > 155) {
      newMeta = newMeta.replace('commercial license', 'commercial use');
    }
    if (newMeta.length > 155) {
      newMeta = newMeta.replace('answer keys, ', '');
    }
  }

  if (newMeta.length > 155) {
    // Last resort: truncate to 152 and add "..."
    newMeta = newMeta.slice(0, 152) + '...';
  }

  if (newMeta !== oldMeta) {
    content = content.replace(`metaDescription: '${oldMeta}'`, `metaDescription: '${newMeta}'`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED (${oldMeta.length} -> ${newMeta.length}): ${relPath}`);
    fixed++;
  }
}

console.log(`\nDone: ${fixed} meta descriptions trimmed`);
