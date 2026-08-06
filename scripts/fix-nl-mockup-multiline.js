/**
 * Fix nl/printable-mockup-photos-sell-more.ts
 *
 * This file has multi-line content in single-quoted strings which breaks SWC.
 * Convert multi-line single-quoted strings to backtick template literals.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'config', 'blog-content', 'nl', 'printable-mockup-photos-sell-more.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find single-quoted strings that span multiple lines and convert to backticks
// We'll do this by processing the file character by character
const lines = content.split('\n');
const result = [];
let i = 0;
let accumulating = false;
let accumulated = '';

while (i < lines.length) {
  const line = lines[i];

  if (!accumulating) {
    // Check if this line has an unclosed single-quoted string
    // Count unescaped single quotes
    let quoteCount = 0;
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "'" && (j === 0 || line[j - 1] !== '\\')) {
        quoteCount++;
      }
    }
    if (quoteCount % 2 !== 0) {
      // Odd number of quotes — string continues to next line
      accumulating = true;
      accumulated = line;
    } else {
      result.push(line);
    }
  } else {
    accumulated += '\n' + line;
    // Check if the accumulated text now has balanced quotes
    let quoteCount = 0;
    for (let j = 0; j < accumulated.length; j++) {
      if (accumulated[j] === "'" && (j === 0 || accumulated[j - 1] !== '\\')) {
        quoteCount++;
      }
    }
    if (quoteCount % 2 === 0) {
      // Balanced — convert single-quoted multiline to backticks
      // Find the opening single quote of the multiline string
      accumulated = accumulated.replace(
        /(?:content|introduction|description|answer|heading|tagline): '([\s\S]*?)(?<!\\)'/g,
        (match, inner, offset, fullStr) => {
          const key = match.split(':')[0].trim();
          // Unescape \' to just ' for backtick strings
          const fixed = inner.replace(/\\'/g, "'");
          return key + ': `' + fixed + '`';
        }
      );
      result.push(accumulated);
      accumulating = false;
      accumulated = '';
    }
  }
  i++;
}

if (accumulating) {
  result.push(accumulated);
}

const output = result.join('\n');
fs.writeFileSync(filePath, output, 'utf8');
console.log('Fixed. Lines:', output.split('\n').length);

// Verify no broken strings
const longLines = output.split('\n').filter(l => l.length > 2000);
console.log('Lines > 2000 chars:', longLines.length);
