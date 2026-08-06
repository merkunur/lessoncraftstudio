/**
 * Fix double-encoding in Italian content files.
 * Replaces %20 with literal spaces inside /samples/ paths,
 * so encodeImagePath() can properly encode them at render time.
 *
 * Affects: app-content/it/, tool-content/it/, bundle-content/it/
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');
const DIRS = [
  path.join(BASE, 'app-content', 'it'),
  path.join(BASE, 'tool-content', 'it'),
  path.join(BASE, 'bundle-content', 'it'),
];

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) {
    console.log(`SKIP: ${dir} does not exist`);
    continue;
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    totalFiles++;
    const content = fs.readFileSync(filePath, 'utf8');

    // Replace %20 with spaces only inside /samples/ paths
    // Also replace %C3%B9 → ù (Più encoded as Pi%C3%B9)
    let updated = content;
    let count = 0;

    // Decode all percent-encoded sequences within /samples/ path strings
    updated = updated.replace(/(\/samples\/[^'",}\n]*)/g, (match) => {
      const decoded = match.replace(/%20/g, ' ')
        .replace(/%C3%B9/g, 'ù')
        .replace(/%C3%A0/g, 'à')
        .replace(/%C3%A8/g, 'è')
        .replace(/%C3%A9/g, 'é')
        .replace(/%C3%AC/g, 'ì')
        .replace(/%C3%B2/g, 'ò');
      if (decoded !== match) count++;
      return decoded;
    });

    if (count > 0) {
      fs.writeFileSync(filePath, updated, 'utf8');
      modifiedFiles++;
      totalReplacements += count;
      console.log(`FIXED: ${path.relative(BASE, filePath)} (${count} paths decoded)`);
    }
  }
}

console.log(`\nDone: ${modifiedFiles}/${totalFiles} files modified, ${totalReplacements} paths decoded`);
