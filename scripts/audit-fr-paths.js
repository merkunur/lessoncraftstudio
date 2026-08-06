const fs = require('fs');
const dir = 'frontend/config/app-content/fr';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();
const allPaths = [];

for (const f of files) {
  const content = fs.readFileSync(dir + '/' + f, 'utf8');
  const lines = content.split('\n');

  let inVisuals = false;
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('visuals:')) {
      inVisuals = true;
      braceDepth = 0;
    }

    if (inVisuals) {
      braceDepth += (line.match(/{/g) || []).length;
      braceDepth -= (line.match(/}/g) || []).length;

      // Look for src: or primary: with value
      const srcMatch = line.match(/(?:src|primary):\s*'(.+)'/);
      if (srcMatch) {
        // Unescape JS string
        const val = srcMatch[1].replace(/\\'/g, "'");
        if (val.includes('/samples/')) {
          allPaths.push(f.replace('.ts', '') + '\t' + val);
        }
      }

      if (braceDepth <= 0 && i > 0) {
        inVisuals = false;
      }
    }
  }
}

// Deduplicate for testing
const unique = [...new Set(allPaths.map(p => p.split('\t')[1]))];

console.log('=== ALL PATHS (' + allPaths.length + ' total, ' + unique.length + ' unique) ===');
allPaths.forEach(p => console.log(p));
console.log('\n=== UNIQUE PATHS FOR TESTING ===');
unique.forEach(p => console.log(p));
