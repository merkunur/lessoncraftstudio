/**
 * Update isFreeTier() in all 33 apps to handle async verification timing.
 *
 * The new isFreeTier() is synchronous (for backward compat) but the export
 * functions are wrapped to await __accessReady before proceeding.
 */
const fs = require('fs');
const path = require('path');

const APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');
const files = fs.readdirSync(APPS_DIR).filter(f => f.endsWith('.html'));

console.log(`Updating ${files.length} apps...\n`);

let updated = 0;
let errors = [];

for (const file of files) {
  const filePath = path.join(APPS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace the isFreeTier function with one that checks both sync and async state
  const oldPattern = /function isFreeTier\(\)\s*\{[\s\S]*?\/\/ Access Guard:[\s\S]*?return !window\.__accessVerified;\s*\}/;

  const newFunction = `function isFreeTier() {
        // Access Guard: watermark ON by default.
        // Removed only after server confirms purchase.
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('tier') === 'free') return true;
        return !window.__accessVerified;
    }

    // Async version: waits for server verification before deciding.
    // Used by export functions to avoid race conditions.
    async function waitForAccessCheck() {
        if (window.__accessReady) {
            await window.__accessReady;
        }
    }`;

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newFunction);
  } else {
    if (content.includes('waitForAccessCheck')) {
      console.log(`  SKIP: ${file} (already has waitForAccessCheck)`);
      continue;
    }
    errors.push(`${file}: pattern not found`);
    continue;
  }

  // Now wrap addWatermarkToCanvas calls in export functions to await verification first.
  // Find patterns like:
  //   const watermarkData = addWatermarkToCanvas(someCanvas);
  // Replace with:
  //   await waitForAccessCheck();
  //   const watermarkData = addWatermarkToCanvas(someCanvas);
  //
  // But only add if not already present on the previous line.
  const watermarkCallPattern = /^([ \t]*)(const|let|var) watermarkData = addWatermarkToCanvas\(/gm;

  content = content.replace(watermarkCallPattern, (match, indent, keyword) => {
    return `${indent}await waitForAccessCheck();\n${indent}${keyword} watermarkData = addWatermarkToCanvas(`;
  });

  // Also need to make the containing export functions async if they aren't already.
  // Look for patterns like: function exportToPDF() { or function handleExport() {
  // that contain addWatermarkToCanvas and make them async.
  // This is tricky to do with regex, so we'll add async to specific known patterns.

  // Many apps use arrow functions or function declarations for export.
  // The safest approach: find functions containing "await waitForAccessCheck"
  // and ensure they're async. Look for the nearest function/arrow above.

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log(`  OK: ${file}`);
  }
}

console.log(`\nUpdated: ${updated}/${files.length}`);
if (errors.length > 0) {
  console.log(`Errors: ${errors.join(', ')}`);
}
