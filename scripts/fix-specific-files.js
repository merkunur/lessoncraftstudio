/**
 * Fix specific files that the bulk converter broke.
 * These files have special patterns (German „" quotes, French d' elisions)
 * that need careful handling.
 *
 * Strategy: Replace curly quotes, then convert long single-quoted strings
 * to backtick template literals (not double quotes, to avoid conflicts
 * with German typographic quotes in content).
 */
const fs = require('fs');

const files = [
  'frontend/config/app-content/de/prepositions.ts',
  'frontend/config/app-content/en/prepositions.ts',
  'frontend/config/app-content/en/word-guess.ts',
  'frontend/config/app-content/fr/chart-count.ts',
  'frontend/config/app-content/fr/code-addition.ts',
  'frontend/config/app-content/index.ts',
];

for (const fp of files) {
  let content = fs.readFileSync(fp, 'utf8');

  // Step 1: Replace curly quotes with straight equivalents
  content = content.replace(/[\u2018\u2019]/g, "'");
  content = content.replace(/[\u201C\u201D]/g, '"');

  // Step 2: Find all lines with broken single-quoted strings
  // (odd number of unescaped single quotes)
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Count unescaped single quotes
    let count = 0;
    for (let j = 0; j < line.length; j++) {
      if (line[j] === "'" && (j === 0 || line[j-1] !== '\\')) count++;
    }

    // If odd count > 2, this line has internal apostrophes breaking a string
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
        // Extract the content between first and last quote
        const before = line.substring(0, first);
        const stringContent = line.substring(first + 1, last);
        const after = line.substring(last + 1);

        // Convert to backtick string
        // Escape any backticks in content
        const safe = stringContent.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
        lines[i] = before + '`' + safe + '`' + after;
      }
    }
  }

  fs.writeFileSync(fp, lines.join('\n'), 'utf8');
  console.log('Fixed: ' + fp);
}
