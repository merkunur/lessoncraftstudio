const fs = require('fs');
const path = require('path');

// This script finds unescaped apostrophes inside single-quoted TypeScript strings
// and escapes them. It uses a simple state machine to track whether we're inside
// a single-quoted string or not.

const dir = 'frontend/content/product-pages/en/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

let totalFixed = 0;
let filesFixed = 0;

for (const f of files) {
  const fp = path.join(dir, f);
  const content = fs.readFileSync(fp, 'utf8');

  let result = '';
  let fixes = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inBacktick = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    const next = content[i + 1] || '';
    const prev = i > 0 ? content[i - 1] : '';

    // Handle newlines (reset line comment)
    if (ch === '\n') {
      inLineComment = false;
      result += ch;
      continue;
    }

    // Inside line comment - pass through
    if (inLineComment) {
      result += ch;
      continue;
    }

    // Inside block comment
    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        result += '*/';
        i++;
      } else {
        result += ch;
      }
      continue;
    }

    // Inside double-quoted string
    if (inDoubleQuote) {
      if (ch === '\\') {
        result += ch + next;
        i++;
        continue;
      }
      if (ch === '"') {
        inDoubleQuote = false;
      }
      result += ch;
      continue;
    }

    // Inside backtick string
    if (inBacktick) {
      if (ch === '\\') {
        result += ch + next;
        i++;
        continue;
      }
      if (ch === '`') {
        inBacktick = false;
      }
      result += ch;
      continue;
    }

    // Inside single-quoted string
    if (inSingleQuote) {
      if (ch === '\\') {
        // Escaped character - pass through both chars
        result += ch + next;
        i++;
        continue;
      }
      if (ch === "'") {
        // Is this the end of the string or an unescaped apostrophe?
        // Heuristic: if next char is a letter (like 's, 't, 'd, etc.)
        // and the previous char is a letter, this is an apostrophe in a word
        if (/[a-zA-Z]/.test(prev) && /[a-zA-Z]/.test(next)) {
          // This is an unescaped apostrophe inside a word - escape it
          result += "\\'";
          fixes++;
          continue;
        }
        // Otherwise, this ends the string
        inSingleQuote = false;
        result += ch;
        continue;
      }
      result += ch;
      continue;
    }

    // Outside any string/comment
    if (ch === '/' && next === '/') {
      inLineComment = true;
      result += '//';
      i++;
      continue;
    }
    if (ch === '/' && next === '*') {
      inBlockComment = true;
      result += '/*';
      i++;
      continue;
    }
    if (ch === "'") {
      inSingleQuote = true;
      result += ch;
      continue;
    }
    if (ch === '"') {
      inDoubleQuote = true;
      result += ch;
      continue;
    }
    if (ch === '`') {
      inBacktick = true;
      result += ch;
      continue;
    }

    result += ch;
  }

  if (fixes > 0) {
    fs.writeFileSync(fp, result, 'utf8');
    console.log(`Fixed ${f}: ${fixes} unescaped apostrophes`);
    totalFixed += fixes;
    filesFixed++;
  }
}

console.log(`\nTotal: ${totalFixed} fixes in ${filesFixed} files`);

// Verify: quick check that no obvious unescaped apostrophes remain
// by looking for patterns like: letter + ' + letter inside string-like contexts
let warnings = 0;
for (const f of files) {
  const fp = path.join(dir, f);
  const content = fs.readFileSync(fp, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
    // Look for letter'letter that's NOT preceded by backslash
    const matches = line.matchAll(/(?<!\\)([a-zA-Z])'([a-zA-Z])/g);
    for (const m of matches) {
      // Check if we're inside a single-quoted string on this line
      // Simple check: count unescaped single quotes before this position
      const before = line.substring(0, m.index);
      let quoteCount = 0;
      for (let i = 0; i < before.length; i++) {
        if (before[i] === "'" && (i === 0 || before[i-1] !== '\\')) quoteCount++;
      }
      if (quoteCount % 2 === 1) {
        // Odd number of quotes before = we're inside a string
        warnings++;
        console.log(`WARNING: ${f}:${idx+1} - possible unescaped apostrophe: ...${m[0]}...`);
      }
    }
  });
}
console.log(`\nVerification warnings: ${warnings}`);
