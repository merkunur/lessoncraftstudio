/**
 * Fix ONLY content files (not core config) — escape word-internal apostrophes
 * and only target the 6 content directories.
 */
const fs = require('fs');
const path = require('path');

const CONTENT_DIRS = [
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
  let filesThisPass = 0;

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
      const fp = path.join(dir, e.name);
      if (e.isDirectory()) { walk(fp); continue; }
      if (!e.name.endsWith('.ts')) continue;

      const content = fs.readFileSync(fp, 'utf8');

      // Step 1: Fix curly single quotes (U+2018, U+2019) → escaped straight apostrophe
      // But only at word-internal positions (between letters)
      // At delimiter positions (start/end of string), convert to straight quote
      let fixed = content;

      // Replace U+2018 (left curly) with straight quote (always a delimiter)
      fixed = fixed.replace(/\u2018/g, "'");

      // Replace U+2019 at word-internal positions with \'
      fixed = fixed.replace(/([a-zA-Z\u00C0-\u024F])\u2019([a-zA-Z\u00C0-\u024F])/g, "$1\\'$2");

      // Replace remaining U+2019 (at delimiter positions) with straight quote
      fixed = fixed.replace(/\u2019/g, "'");

      // Step 2: Replace non-ASCII double quotes with escaped straight double
      fixed = fixed.replace(/[\u201E\u201C\u201D]/g, '\\"');
      fixed = fixed.replace(/[\u00AB\u00BB]/g, '\\"');

      // Step 3: Escape any remaining word-internal straight apostrophes
      fixed = fixed.replace(/([a-zA-Z\u00C0-\u024F])'([a-zA-Z\u00C0-\u024F])/g, "$1\\'$2");

      if (fixed !== content) {
        fs.writeFileSync(fp, fixed, 'utf8');
        filesThisPass++;
      }
    }
  }

  for (const dir of CONTENT_DIRS) {
    walk(dir);
  }
  return filesThisPass;
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
