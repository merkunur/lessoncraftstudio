/**
 * Convert single-quoted content strings to backtick template literals.
 * This permanently fixes the apostrophe-inside-string problem.
 *
 * Only converts strings that are 50+ characters (content strings),
 * leaving short property names and identifiers as single-quoted.
 * Also reverts any previously escaped apostrophes (\' back to ').
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
let totalConversions = 0;

function processFile(fp) {
  let content = fs.readFileSync(fp, 'utf8');
  const original = content;

  // Strategy: find single-quoted strings that are long (content strings)
  // and convert them to backtick strings.
  // We process line by line to avoid complex multi-line regex issues.

  const lines = content.split('\n');
  let inLongString = false;
  let stringStartLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line starts or contains a long single-quoted string
    // Look for patterns like: description: 'long content...',
    // or: 'long content that continues...',

    // Count unescaped single quotes
    let quotes = [];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "'" && (j === 0 || line[j-1] !== '\\')) {
        quotes.push(j);
      }
    }

    // If odd number of quotes, we have an unmatched quote (broken string)
    // This means there's an apostrophe inside the string
    if (quotes.length >= 2) {
      // Check each pair of quotes for long strings
      for (let q = 0; q < quotes.length - 1; q += 2) {
        const start = quotes[q];
        const end = quotes[q + 1];
        const stringContent = line.substring(start + 1, end);

        if (stringContent.length >= 50) {
          // Convert this string from '...' to `...`
          // First, revert any escaped apostrophes back to plain ones
          const cleaned = stringContent.replace(/\\'/g, "'");
          // Also escape any backticks that might be in the content
          const escaped = cleaned.replace(/`/g, '\\`');
          // Also escape ${} template literal expressions
          const safe = escaped.replace(/\$\{/g, '\\${');

          const newLine = line.substring(0, start) + '`' + safe + '`' + line.substring(end + 1);
          lines[i] = newLine;
          totalConversions++;
          break; // Reprocess this line after modification
        }
      }
    }

    // Handle odd quote count (broken strings with apostrophes)
    if (quotes.length % 2 !== 0 && quotes.length >= 3) {
      // Find the first and last quote — the whole thing is likely one string
      const first = quotes[0];
      const last = quotes[quotes.length - 1];
      const stringContent = line.substring(first + 1, last);

      if (stringContent.length >= 50) {
        const cleaned = stringContent.replace(/\\'/g, "'");
        const escaped = cleaned.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
        lines[i] = line.substring(0, first) + '`' + escaped + '`' + line.substring(last + 1);
        totalConversions++;
      }
    }
  }

  const newContent = lines.join('\n');
  if (newContent !== original) {
    fs.writeFileSync(fp, newContent, 'utf8');
    totalFiles++;
  }
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) { processDir(fp); continue; }
    if (e.name.endsWith('.ts')) processFile(fp);
  }
}

dirs.forEach(processDir);
console.log('Converted ' + totalConversions + ' strings in ' + totalFiles + ' files');
