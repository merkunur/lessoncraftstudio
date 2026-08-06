const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'config', 'tool-content', 'it', 'crossword.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find all literal backslash-u-hex sequences
const regex = /\\u[0-9a-fA-F]{4}/g;
let match;
const matches = [];
while ((match = regex.exec(content)) !== null) {
  const ctx = content.substring(Math.max(0, match.index - 10), match.index + 15);
  matches.push({ index: match.index, match: match[0], context: ctx });
}

console.log('Found', matches.length, 'literal escape sequences:');
matches.forEach(m => console.log('  At', m.index, ':', JSON.stringify(m.context)));

// Replace all literal \uXXXX with actual characters
content = content.replace(/\\u([0-9a-fA-F]{4})/g, (full, hex) => {
  return String.fromCharCode(parseInt(hex, 16));
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('\nFixed. Verifying...');

// Re-read and check
const fixed = fs.readFileSync(filePath, 'utf8');
const remaining = [];
const regex2 = /\\u[0-9a-fA-F]{4}/g;
while ((match = regex2.exec(fixed)) !== null) {
  remaining.push(match[0]);
}
console.log('Remaining escapes:', remaining.length);

// Check titleTag
const titleMatch = fixed.match(/titleTag: '([^']+)'/);
if (titleMatch) console.log('titleTag:', titleMatch[1].length, 'chars -', titleMatch[1]);

// Check metaDescription
const metaMatch = fixed.match(/metaDescription: '([^']+)'/);
if (metaMatch) console.log('metaDescription:', metaMatch[1].length, 'chars');
