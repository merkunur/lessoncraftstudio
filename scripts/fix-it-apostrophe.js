/**
 * Fix unescaped apostrophes in Italian /samples/ paths.
 * Treno dell'Alfabeto → Treno dell\'Alfabeto
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');
const DIRS = [
  path.join(BASE, 'guide-content', 'it'),
  path.join(BASE, 'start-content', 'it'),
  path.join(BASE, 'app-content', 'it'),
  path.join(BASE, 'tool-content', 'it'),
  path.join(BASE, 'bundle-content', 'it'),
];

let fixed = 0;

for (const dir of DIRS) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Fix unescaped apostrophes in /samples/ paths
    // Look for dell'Alfabeto NOT preceded by backslash
    let updated = content;
    let count = 0;

    // Replace in lines containing /samples/
    const lines = updated.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('/samples/')) {
        // Find dell'A where ' is not already escaped
        const before = lines[i];
        // Replace dell' with dell\' but only if not already dell\'
        lines[i] = lines[i].replace(/dell'(?!\\)/g, (match, offset, str) => {
          // Check if preceded by backslash
          if (offset > 0 && str[offset + 3] === '\\') return match;
          return "dell\\'";
        });
        // Simpler: just replace dell' with dell\' where it's not already escaped
        // Reset and do it properly
        lines[i] = before;
        let newLine = '';
        let j = 0;
        while (j < lines[i].length) {
          if (lines[i].substring(j, j + 5) === "dell'" && (j === 0 || lines[i][j - 1] !== '\\')) {
            newLine += "dell\\'";
            j += 5;
            count++;
          } else {
            newLine += lines[i][j];
            j++;
          }
        }
        lines[i] = newLine;
      }
    }

    if (count > 0) {
      fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
      fixed++;
      console.log(`Fixed ${count} apostrophes in: ${path.relative(BASE, filePath)}`);
    }
  }
}

console.log(`\nDone: ${fixed} files fixed`);
