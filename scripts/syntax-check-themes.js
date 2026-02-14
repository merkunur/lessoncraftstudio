const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory()).sort();

console.log('Checking syntax of all 50 theme files...\n');

let errors = 0;
for (const theme of dirs) {
  const fp = path.join(base, theme, 'en.ts');
  const content = fs.readFileSync(fp, 'utf8');

  // Quick bracket/brace balance check
  let braces = 0, brackets = 0, parens = 0;
  let inString = false;
  let stringChar = '';
  let escaped = false;

  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (escaped) { escaped = false; continue; }
    if (c === '\\') { escaped = true; continue; }

    if (inString) {
      if (c === stringChar) inString = false;
      continue;
    }

    if (c === "'" || c === '"' || c === '`') {
      inString = true;
      stringChar = c;
      continue;
    }

    if (c === '{') braces++;
    if (c === '}') braces--;
    if (c === '[') brackets++;
    if (c === ']') brackets--;
    if (c === '(') parens++;
    if (c === ')') parens--;
  }

  if (braces !== 0 || brackets !== 0 || parens !== 0) {
    console.log(`${theme}: UNBALANCED - braces:${braces} brackets:${brackets} parens:${parens}`);
    errors++;
  }
}

if (errors === 0) {
  console.log('All 50 files have balanced brackets, braces, and parentheses.');
} else {
  console.log(`\n${errors} files with balance issues.`);
}
