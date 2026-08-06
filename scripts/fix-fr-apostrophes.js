const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content/fr',
  'frontend/config/tool-content/fr',
  'frontend/config/guide-content/fr',
  'frontend/config/start-content/fr',
  'frontend/config/bundle-content/fr',
];

// In /samples/ paths, replace unescaped ' with \'
// These are filenames containing ASCII apostrophe (0x27) that need backslash-escaping in TS single-quoted strings
const apoPatterns = [
  "Loto d'Images",
  "Train de l'Alphabet",
  "Trouve l'Intrus",
  "Chemin d'Images",
  "Tri d'Images",
  "Trouve l'Ombre",
];

let totalFixed = 0;

for (const dir of dirs) {
  const fullDir = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) continue;

  for (const file of fs.readdirSync(fullDir).filter(f => f.endsWith('.ts'))) {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const pattern of apoPatterns) {
      // Only fix unescaped apostrophes (not already backslash-escaped)
      // Look for the pattern where the apostrophe is NOT preceded by backslash
      const escaped = pattern.replace("'", "\\'");

      // Replace unescaped version with escaped version, but only in /samples/ path context
      // We do simple string replacement: if we find the unescaped pattern and NOT the escaped version
      while (content.includes(pattern)) {
        // Check if it's already escaped at this position
        const idx = content.indexOf(pattern);
        if (idx > 0 && content[idx + pattern.indexOf("'") - 1] === '\\') {
          // Already escaped, skip
          break;
        }
        content = content.substring(0, idx) + escaped + content.substring(idx + pattern.length);
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalFixed++;
      console.log('Fixed apostrophes: ' + dir + '/' + file);
    }
  }
}

console.log('\nTotal files with apostrophe fixes: ' + totalFixed);
