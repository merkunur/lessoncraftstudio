const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

const directories = [
  'guide-content/en',
  'guide-content/de',
  'start-content/en',
  'start-content/de',
  'bundle-content/en',
  'bundle-content/de',
  'idea-content/en',
  'idea-content/de',
];

const regex = /  themeImages: \[\r?\n(?:.*\r?\n)*?  \],?\r?\n/;

let totalFiles = 0;
let modifiedFiles = 0;
let skippedFiles = 0;

for (const dir of directories) {
  const fullDir = path.join(BASE, dir);
  if (!fs.existsSync(fullDir)) {
    console.log(`Directory not found: ${dir} — skipping`);
    continue;
  }

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'));
  console.log(`\nProcessing ${dir}/ (${files.length} .ts files)`);

  for (const file of files) {
    totalFiles++;
    const filePath = path.join(fullDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    if (!regex.test(content)) {
      skippedFiles++;
      continue;
    }

    const updated = content.replace(regex, '');
    fs.writeFileSync(filePath, updated, 'utf8');
    modifiedFiles++;
    console.log(`  ✓ Removed themeImages from ${file}`);
  }
}

console.log(`\n--- Summary ---`);
console.log(`Total .ts files scanned: ${totalFiles}`);
console.log(`Files modified: ${modifiedFiles}`);
console.log(`Files without themeImages: ${skippedFiles}`);
