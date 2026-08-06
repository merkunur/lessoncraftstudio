// Count all text words in a content file (all string types, all lengths)
const fs = require('fs');
const file = process.argv[2];
const c = fs.readFileSync(file, 'utf8');

let total = 0;

// Single-quoted strings
const sq = c.match(/'(?:[^'\\]|\\.)*'/g) || [];
for (const s of sq) {
  const inner = s.slice(1, -1);
  if (inner.startsWith('/') || inner.startsWith('http') || inner.includes('.webp') || inner.includes('.png')) continue;
  if (inner.length < 3) continue;
  total += inner.split(/\s+/).filter(w => w.length > 0).length;
}

// Backtick strings
const bt = c.match(/`[^`]+`/g) || [];
for (const s of bt) {
  const inner = s.slice(1, -1);
  if (inner.startsWith('/') || inner.startsWith('http')) continue;
  total += inner.split(/\s+/).filter(w => w.length > 0).length;
}

console.log(`${file}: ${total} total words`);
