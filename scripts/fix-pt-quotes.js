const fs = require('fs');
const path = require('path');
const dirs = ['app-content','tool-content','bundle-content','guide-content','idea-content','start-content'];
let totalFixed = 0;

for (const dir of dirs) {
  const base = path.join('frontend', 'config', dir, 'pt');
  if (!fs.existsSync(base)) continue;
  for (const f of fs.readdirSync(base)) {
    const fp = path.join(base, f);
    let content = fs.readFileSync(fp, 'utf8');
    const original = content;

    // Replace d' followed by vowel (Portuguese contractions like d'água)
    // Need to escape the apostrophe as \' inside single-quoted TS strings
    content = content.replace(/([dD])'([a-z\u00e0\u00e1\u00e2\u00e3\u00e9\u00ea\u00ed\u00f3\u00f4\u00f5\u00fa])/gi, "$1\\'$2");

    if (content !== original) {
      fs.writeFileSync(fp, content, 'utf8');
      totalFixed++;
      console.log('Fixed: ' + fp);
    }
  }
}
console.log('\nTotal files fixed:', totalFixed);
