/**
 * Fix remaining broken single-quoted strings.
 * Specifically targets patterns where an apostrophe inside a short string
 * breaks the TypeScript parser.
 */
const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content',
  'frontend/config/tool-content',
  'frontend/config/guide-content',
  'frontend/config/bundle-content',
  'frontend/config/idea-content',
  'frontend/config/start-content',
  'frontend/config/compare-content',
];

let totalFiles = 0;
let totalFixes = 0;

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { processDir(fp); continue; }
    if (!e.name.endsWith('.ts')) continue;

    const content = fs.readFileSync(fp, 'utf8');
    const lines = content.split('\n');
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Count unescaped single quotes
      let count = 0;
      for (let j = 0; j < line.length; j++) {
        if (line[j] === "'" && (j === 0 || line[j-1] !== '\\')) count++;
      }

      // If odd count and > 2, this line has a broken string
      if (count % 2 !== 0 && count > 2) {
        // Find all apostrophes that are between word characters
        // or at word boundaries (like Kids' Activities)
        let newLine = '';
        let inString = false;
        let stringStart = -1;

        for (let j = 0; j < line.length; j++) {
          if (line[j] === "'" && (j === 0 || line[j-1] !== '\\')) {
            if (!inString) {
              inString = true;
              stringStart = j;
              newLine += "'";
            } else {
              // Is this the end of the string or an internal apostrophe?
              // Check if next char suggests string continuation (letter, space in word context)
              const nextChar = j + 1 < line.length ? line[j+1] : '';
              const prevChar = j > 0 ? line[j-1] : '';

              // Heuristic: if previous char is a letter and next char is a letter or space
              // followed by more content, this is likely an internal apostrophe
              if (/[a-zA-Z]/.test(prevChar) && /[a-zA-Z\s]/.test(nextChar) && nextChar !== '') {
                // Check if the remaining content looks like it continues the string
                const remaining = line.substring(j + 1);
                if (remaining.includes("'")) {
                  // There's another quote ahead — this is an internal apostrophe
                  newLine += "\\'";
                  totalFixes++;
                  changed = true;
                  continue;
                }
              }
              // This is the end of the string
              inString = false;
              newLine += "'";
            }
          } else {
            newLine += line[j];
          }
        }
        lines[i] = newLine;
      }
    }

    if (changed) {
      fs.writeFileSync(fp, lines.join('\n'), 'utf8');
      totalFiles++;
    }
  }
}

dirs.forEach(processDir);
console.log('Fixed ' + totalFiles + ' files, ' + totalFixes + ' apostrophes escaped');
