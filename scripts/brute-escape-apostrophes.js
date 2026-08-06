/**
 * Brute-force: escape ANY unescaped apostrophe that appears between
 * two word characters (including accented characters).
 * Pattern: letter + ' + letter → letter + \' + letter
 * Only skips already-escaped \' sequences.
 */
const fs = require('fs');
const path = require('path');

let totalFiles = 0;
let pass = 0;

function fixAll() {
  let filesThisPass = 0;

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
      const fp = path.join(dir, e.name);
      if (e.isDirectory()) { walk(fp); continue; }
      if (!e.name.endsWith('.ts')) continue;

      const content = fs.readFileSync(fp, 'utf8');
      // Replace word'word with word\'word (but not word\'word which is already escaped)
      const fixed = content.replace(/([a-zA-Z\u00C0-\u024F])'([a-zA-Z\u00C0-\u024F])/g, "$1\\'$2");

      if (fixed !== content) {
        fs.writeFileSync(fp, fixed, 'utf8');
        filesThisPass++;
      }
    }
  }

  walk('frontend/config');
  return filesThisPass;
}

// Run until convergence (some replacements may create new patterns)
while (true) {
  pass++;
  const count = fixAll();
  totalFiles += count;
  console.log('Pass ' + pass + ': ' + count + ' files');
  if (count === 0) break;
  if (pass > 10) break;
}
console.log('Total: ' + totalFiles + ' files fixed');
