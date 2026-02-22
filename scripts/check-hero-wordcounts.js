const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();

for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  const heroIdx = src.indexOf('hero:');
  if (heroIdx === -1) { console.log(f.replace('.ts','') + ': NO HERO'); continue; }

  // Extract description from hero section (up to 5000 chars)
  const heroSlice = src.slice(heroIdx, heroIdx + 5000);

  // Try backtick first (multi-line descriptions)
  let desc = null;
  const btMatch = heroSlice.match(/description:\s*`([^`]*)`/);
  if (btMatch) desc = btMatch[1];

  // Try single-quoted
  if (!desc) {
    const sqMatch = heroSlice.match(/description:\s*'([^']*)'/);
    if (sqMatch) desc = sqMatch[1];
  }

  const wc = desc ? desc.trim().split(/\s+/).filter(Boolean).length : 0;
  if (wc < 200) {
    console.log(f.replace('.ts','') + ': ' + wc + ' words' + (desc ? '' : ' (NOT FOUND)'));
  }
}
