/**
 * Add access-guard.js to all 33 REFERENCE APPS
 *
 * This script:
 * 1. Adds <script src="/worksheet-generators/js/access-guard.js"> to the <head>
 * 2. Replaces isFreeTier() to check server verification flag
 */
const fs = require('fs');
const path = require('path');

const APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');

const files = fs.readdirSync(APPS_DIR).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} HTML apps to update.\n`);

let updated = 0;
let errors = [];

for (const file of files) {
  const filePath = path.join(APPS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // 1. Add access-guard.js script to <head> if not already present
  if (!content.includes('access-guard.js')) {
    // Insert right after <head> or after <meta charset>
    const headMatch = content.match(/<head[^>]*>/i);
    if (headMatch) {
      const insertPos = headMatch.index + headMatch[0].length;
      const scriptTag = '\n    <script src="/worksheet-generators/js/access-guard.js"></script>';
      content = content.slice(0, insertPos) + scriptTag + content.slice(insertPos);
    } else {
      errors.push(`${file}: Could not find <head> tag`);
      continue;
    }
  }

  // 2. Replace isFreeTier() function to use server verification
  // Old pattern:
  //   function isFreeTier() {
  //       const urlParams = new URLSearchParams(window.location.search);
  //       return urlParams.get('tier') === 'free';
  //   }
  //
  // New pattern: watermark ON unless server verified access
  const oldPattern = /function isFreeTier\(\)\s*\{[\s\S]*?const urlParams = new URLSearchParams\(window\.location\.search\);[\s\S]*?return urlParams\.get\(['"]tier['"]\)\s*===\s*['"]free['"];?\s*\}/;

  const newFunction = `function isFreeTier() {
        // Access Guard: watermark is ON by default.
        // Only removed after server verifies the user purchased this app.
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('tier') === 'free') return true;
        // For non-free tier, require server verification
        return !window.__accessVerified;
    }`;

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newFunction);
  } else {
    // Check if already updated
    if (content.includes('window.__accessVerified')) {
      console.log(`  SKIP: ${file} (already updated)`);
      continue;
    } else {
      errors.push(`${file}: Could not find isFreeTier() function with expected pattern`);
      continue;
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log(`  OK: ${file}`);
  }
}

console.log(`\nUpdated: ${updated}/${files.length}`);
if (errors.length > 0) {
  console.log(`\nErrors (${errors.length}):`);
  errors.forEach(e => console.log(`  - ${e}`));
}
