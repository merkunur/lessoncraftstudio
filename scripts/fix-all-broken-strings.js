/**
 * Fix ALL remaining files with broken single-quoted strings.
 * Converts broken lines (odd number of unescaped single quotes)
 * to backtick template literals.
 */
const fs = require('fs');
const path = require('path');

const CONFIG_DIR = 'frontend/config';
let totalFiles = 0;
let totalFixes = 0;

function processFile(fp) {
  let content = fs.readFileSync(fp, 'utf8');

  // Step 1: Replace curly quotes
  content = content.replace(/[\u2018\u2019]/g, "'");
  content = content.replace(/[\u201C\u201D]/g, '"');

  const lines = content.split('\n');
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Count unescaped single quotes
    let count = 0;
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "'" && (j === 0 || line[j-1] !== '\\')) count++;
    }

    // If odd count and > 2, this line has internal apostrophes
    if (count % 2 !== 0 && count > 2) {
      // Find the first and last unescaped single quote
      let first = -1, last = -1;
      for (let j = 0; j < line.length; j++) {
        if (line[j] === "'" && (j === 0 || line[j-1] !== '\\')) {
          if (first === -1) first = j;
          last = j;
        }
      }

      if (first !== -1 && last !== -1 && first !== last) {
        const before = line.substring(0, first);
        const stringContent = line.substring(first + 1, last);
        const after = line.substring(last + 1);

        // Convert to backtick string — escape backticks and ${}
        const safe = stringContent
          .replace(/`/g, '\\`')
          .replace(/\$\{/g, '\\${')
          .replace(/\\'/g, "'"); // Unescape \' since backticks handle '

        lines[i] = before + '`' + safe + '`' + after;
        changed = true;
        totalFixes++;
      }
    }
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
    else if (e.name.endsWith('.ts')) processFile(fp);
  }
}

walk(CONFIG_DIR);
console.log(`Fixed ${totalFixes} broken strings in ${totalFiles} files`);
