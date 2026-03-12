const fs = require('fs');
const path = require('path');

const configRoot = path.join(__dirname, '..', 'frontend', 'config');

// Collect all en/ content files across 6 content types
const contentDirs = ['guide-content', 'app-content', 'tool-content', 'start-content', 'idea-content', 'bundle-content'];
let files = [];
for (const dir of contentDirs) {
  const dirPath = path.join(configRoot, dir, 'en');
  if (!fs.existsSync(dirPath)) continue;
  const entries = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts'));
  for (const f of entries) {
    files.push(path.join(dirPath, f));
  }
}

// Add the 4 config files with escapes
const configFiles = ['app-translations.ts', 'section-labels.ts', 'sales-pages.ts', 'grade-slugs.ts'];
for (const cf of configFiles) {
  const fp = path.join(configRoot, cf);
  if (fs.existsSync(fp)) files.push(fp);
}

let totalFixed = 0;
let filesFixed = 0;

for (const fp of files) {
  const rel = path.relative(path.join(__dirname, '..'), fp).replace(/\\/g, '/');
  const raw = fs.readFileSync(fp, 'utf8');
  const fixed = raw.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  if (raw !== fixed) {
    fs.writeFileSync(fp, fixed, 'utf8');
    const count = (raw.match(/\\u[0-9a-fA-F]{4}/g) || []).length;
    totalFixed += count;
    filesFixed++;
    console.log(`FIXED ${rel} — ${count} escapes replaced`);
  }
}

console.log(`\nTotal: ${totalFixed} escapes fixed across ${filesFixed} files`);
