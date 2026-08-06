const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'frontend', 'content', 'product-pages', 'en');
const files = ['coloring-worksheets.ts', 'draw-and-color-worksheets.ts', 'drawing-lines-worksheets.ts'];
const wc = s => s.trim().split(/\s+/).filter(Boolean).length;

for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  // Find all feature items with id, title, description
  const itemRe = /id:\s*'(\d+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?description:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  console.log(f + ':');
  while ((m = itemRe.exec(src)) !== null) {
    const words = wc(m[3]);
    if (words < 30) {
      console.log(`  id=${m[1]} [${words}w] "${m[2]}"`);
      console.log(`    desc: "${m[3].substring(0, 80)}..."`);
    }
  }
}
