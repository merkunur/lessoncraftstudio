const fs = require('fs');
const path = require('path');

const locale = process.argv[2] || 'nl';
const dir = path.join(__dirname, '..', 'frontend', 'config', 'blog-content', locale);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

let fixedCount = 0;

for (const file of files) {
  const fp = path.join(dir, file);
  let src = fs.readFileSync(fp, 'utf8');

  // Fix double-escaped apostrophes: \\' -> \'
  const fixed = src.replace(/\\\\\'/g, "\\'");

  if (fixed !== src) {
    fs.writeFileSync(fp, fixed, 'utf8');
    fixedCount++;
  }
}

console.log(`${locale}: Fixed double-escapes in ${fixedCount} of ${files.length} files`);
