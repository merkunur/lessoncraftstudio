const fs = require('fs');
const path = require('path');
const APPS_DIR = path.join(__dirname, '..', 'REFERENCE APPS');
const files = fs.readdirSync(APPS_DIR).filter(f => f.endsWith('.html'));
let updated = 0;

for (const file of files) {
  const filePath = path.join(APPS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Remove the stale else-if block after waitForAccessCheck
  content = content.replace(
    /    \} else if \(window\.__accessReady\) \{\n\s*await window\.__accessReady;\n\s*\}\n\s*\}/g,
    ''
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
    console.log('  OK:', file);
  }
}
console.log(`Fixed: ${updated}/${files.length}`);
