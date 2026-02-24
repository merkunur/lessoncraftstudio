const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'sv');
const files = [
  'addition-worksheets.ts',
  'alphabet-train-worksheets.ts',
  'coloring-worksheets.ts',
  'math-worksheets.ts',
  'word-scramble-worksheets.ts',
  'find-and-count-worksheets.ts',
  'matching-worksheets.ts',
];
let ok = true;
for (const f of files) {
  const c = fs.readFileSync(path.join(BASE, f), 'utf8');
  const seoTitle = c.match(/seo:\s*\{[^}]*?title:\s*'([^']*?)'/s)?.[1] || '';
  const heroTitle = c.match(/hero:\s*\{[^}]*?title:\s*'([^']*?)'/s)?.[1] || '';
  const kw = c.match(/seo:\s*\{[^}]*?keywords:\s*'([^']*?)'/s)?.[1] || '';
  const kwCount = kw.split(',').length;
  const diff = seoTitle !== heroTitle;
  const hasSwedish = /[\u00e5\u00e4\u00f6\u00c5\u00c4\u00d6]/.test(seoTitle + heroTitle);
  console.log(f.padEnd(38), 'kw:', kwCount, ' titles_differ:', diff, ' swedish_chars:', hasSwedish);
  if (kwCount !== 11) { console.log('  *** KEYWORD COUNT MISMATCH'); ok = false; }
  if (!diff) { console.log('  *** TITLES ARE THE SAME'); ok = false; }
  if (!hasSwedish) { console.log('  *** NO SWEDISH CHARS'); ok = false; }
}
console.log(ok ? '\nALL CHECKS PASSED' : '\nSOME CHECKS FAILED');
