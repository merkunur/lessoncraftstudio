/**
 * Escape ALL straight apostrophes (U+0027) that appear inside
 * single-quoted TypeScript string content.
 *
 * Uses the same convergence approach: find lines with odd numbers
 * of unescaped single quotes, identify internal apostrophes by
 * finding the first and last quote (delimiters), and escape all
 * quotes in between.
 */
const fs = require('fs');
const path = require('path');

let totalFiles = 0;
let totalFixes = 0;

function fixFile(fp) {
  const content = fs.readFileSync(fp, 'utf8');
  const lines = content.split('\n');
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Count unescaped single quotes
    const quotePositions = [];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "'" && (j === 0 || line[j-1] !== '\\')) {
        quotePositions.push(j);
      }
    }

    // If even count or <= 2, line is fine
    if (quotePositions.length <= 2 || quotePositions.length % 2 === 0) continue;

    // Odd count > 2: has internal apostrophes
    // The first and last are the string delimiters
    // Everything in between that's a quote needs escaping
    const first = quotePositions[0];
    const last = quotePositions[quotePositions.length - 1];

    // Build new line: keep first and last quotes, escape the rest
    let newLine = line.substring(0, first + 1); // up to and including opening quote
    for (let j = first + 1; j < last; j++) {
      if (line[j] === "'" && (j === 0 || line[j-1] !== '\\')) {
        newLine += "\\'";
        totalFixes++;
        changed = true;
      } else {
        newLine += line[j];
      }
    }
    newLine += line.substring(last); // from closing quote to end
    lines[i] = newLine;
  }

  if (changed) {
    fs.writeFileSync(fp, lines.join('\n'), 'utf8');
    totalFiles++;
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) walk(fp);
    else if (e.name.endsWith('.ts')) fixFile(fp);
  }
}

// Run until convergence
let pass = 0;
while (true) {
  pass++;
  totalFiles = 0;
  totalFixes = 0;
  walk('frontend/config');
  console.log(`Pass ${pass}: fixed ${totalFixes} apostrophes in ${totalFiles} files`);
  if (totalFiles === 0) break;
  if (pass > 30) { console.log('Too many passes — stopping'); break; }
}
