const fs = require('fs');
const src = fs.readFileSync('frontend/config/category-content.ts', 'utf8');

const categories = [
  'math', 'language-arts', 'word-games', 'art-creativity',
  'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor'
];

let allPass = true;

for (const cat of categories) {
  // Find the en block for this category
  const escaped = cat.replace(/[-]/g, '\\-');
  const pattern = new RegExp(
    "'" + escaped + "':\\s*\\{\\s*en:\\s*\\{\\s*title:\\s*'([^']*)'[\\s\\S]*?description:\\s*'([^']*)'",
  );
  const match = src.match(pattern);
  if (!match) {
    console.log('MISS: ' + cat + ' - regex did not match');
    allPass = false;
    continue;
  }

  // Interpret \uXXXX escape sequences to get actual rendered char count
  const title = match[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  const desc = match[2].replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  const tLen = title.length;
  const dLen = desc.length;
  const tOk = tLen >= 50 && tLen <= 60;
  const dOk = dLen >= 150 && dLen <= 160;
  const status = (tOk && dOk) ? 'PASS' : 'FAIL';
  if (!tOk || !dOk) allPass = false;

  console.log(`${status}: ${cat}`);
  console.log(`  Title (${tLen} chars): ${title}`);
  if (!tOk) console.log(`  *** Title out of range (need 50-60) ***`);
  console.log(`  Desc  (${dLen} chars): ${desc.substring(0, 90)}...`);
  if (!dOk) console.log(`  *** Desc out of range (need 150-160) ***`);
}

console.log('');
console.log(allPass ? 'ALL 8 CATEGORIES PASS' : 'SOME CATEGORIES FAILED');
process.exit(allPass ? 0 : 1);
