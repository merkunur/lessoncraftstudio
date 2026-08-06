/**
 * Escape word'space patterns (possessives at end of plural words)
 * e.g., "buyers' reviews" → "buyers\' reviews"
 */
const fs = require('fs');
const path = require('path');

const dirs = [
  'frontend/config/app-content',
  'frontend/config/tool-content',
  'frontend/config/guide-content',
  'frontend/config/bundle-content',
  'frontend/config/idea-content',
  'frontend/config/start-content',
  'frontend/config/compare-content',
];

let totalFiles = 0;
let pass = 0;

function fixAll() {
  let count = 0;
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
      const fp = path.join(dir, e.name);
      if (e.isDirectory()) { walk(fp); continue; }
      if (!e.name.endsWith('.ts')) continue;

      const content = fs.readFileSync(fp, 'utf8');
      // Replace word' space with word\' space
      // But NOT already-escaped word\' space
      const fixed = content.replace(/([a-zA-Z\u00C0-\u024F])' ([a-zA-Z])/g, "$1\\' $2");

      if (fixed !== content) {
        fs.writeFileSync(fp, fixed, 'utf8');
        count++;
      }
    }
  }
  dirs.forEach(walk);
  return count;
}

while (true) {
  pass++;
  const count = fixAll();
  totalFiles += count;
  console.log('Pass ' + pass + ': ' + count + ' files');
  if (count === 0) break;
  if (pass > 5) break;
}
console.log('Total: ' + totalFiles + ' files fixed');
