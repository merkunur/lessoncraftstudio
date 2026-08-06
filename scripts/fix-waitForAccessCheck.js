/**
 * Update waitForAccessCheck in all 33 apps to use the global
 * version defined by access-guard.js (which makes a fresh API call).
 */
const fs = require('fs');
const path = require('path');

const APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');
const files = fs.readdirSync(APPS_DIR).filter(f => f.endsWith('.html'));

console.log(`Updating ${files.length} apps...\n`);

let updated = 0;

for (const file of files) {
  const filePath = path.join(APPS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace the local waitForAccessCheck that just awaits __accessReady
  // with one that calls the global window.waitForAccessCheck (fresh API call)
  const oldPattern = /async function waitForAccessCheck\(\)\s*\{[\s\S]*?if \(window\.__accessReady\)\s*\{[\s\S]*?await window\.__accessReady;[\s\S]*?\}[\s\S]*?\}/;

  const newFunction = `async function waitForAccessCheck() {
        // Calls the global function from access-guard.js
        // which makes a FRESH API call to catch session changes
        if (window.waitForAccessCheck && window.waitForAccessCheck !== waitForAccessCheck) {
            await window.waitForAccessCheck();
        } else if (window.__accessReady) {
            await window.__accessReady;
        }
    }`;

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newFunction);
  } else {
    console.log(`  SKIP: ${file}`);
    continue;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log(`  OK: ${file}`);
  }
}

console.log(`\nUpdated: ${updated}/${files.length}`);
