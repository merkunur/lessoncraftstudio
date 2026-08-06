const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'guide-content', 'de');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

const replacements = [
  ['TpT-spezifische', 'Gumroad-spezifische'],
  ['TpT-spezifischen', 'Gumroad-spezifischen'],
  ['TpT-spezifischer', 'Gumroad-spezifischer'],
  ['TpT-spezifisches', 'Gumroad-spezifisches'],
  ['TPTs', 'Gumroads'],
];

let totalReplacements = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let fileCount = 0;

  for (const [search, replace] of replacements) {
    const count = content.split(search).length - 1;
    if (count > 0) {
      fileCount += count;
      content = content.split(search).join(replace);
    }
  }

  // Handle remaining standalone TPT (protect slugs)
  // Find remaining TPT not in slug context
  const lines = content.split('\n');
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip lines that are slug definitions (contain lowercase-hyphenated 'tpt')
    if (/['"][a-z0-9-]*tpt[a-z0-9-]*['"]/.test(line)) continue;
    // Skip lines with file paths containing tpt
    if (/\/[a-z0-9-]*tpt/.test(line)) continue;

    const newLine = line.replace(/\bTPT\b/g, 'Gumroad').replace(/\bTpT\b/g, 'Gumroad');
    if (newLine !== line) {
      const tptCount = (line.match(/\bTPT\b/g) || []).length + (line.match(/\bTpT\b/g) || []).length;
      fileCount += tptCount;
      lines[i] = newLine;
      changed = true;
    }
  }

  if (changed) {
    content = lines.join('\n');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements += fileCount;
    console.log(`  ${file}: ${fileCount}`);
  }
}

console.log('Total pass-4 replacements:', totalReplacements);
