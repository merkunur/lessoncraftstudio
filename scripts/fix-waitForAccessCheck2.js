const fs = require('fs');
const path = require('path');
const APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');
const files = fs.readdirSync(APPS_DIR).filter(f => f.endsWith('.html'));
let updated = 0;

for (const file of files) {
  const filePath = path.join(APPS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace the current waitForAccessCheck with one that calls __verifyAccessNow
  const oldPattern = /async function waitForAccessCheck\(\)\s*\{[\s\S]*?(?:window\.waitForAccessCheck|window\.__accessReady)[\s\S]*?\n\s*\}/;

  const newFunction = `async function waitForAccessCheck() {
        // Fresh server verification on every export (catches session changes)
        if (typeof window.__verifyAccessNow === 'function') {
            await window.__verifyAccessNow();
        }
    }`;

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newFunction);
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log('  OK:', file);
  } else {
    console.log('  SKIP:', file);
  }
}
console.log(`\nUpdated: ${updated}/${files.length}`);
