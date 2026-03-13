const fs = require('fs');
const path = require('path');
const category = process.argv[2] || 'app-content';
const dir = path.join(__dirname, '..', 'frontend', 'config', category, 'fr');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts')).sort();
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const re = /metaDescription:\s*\n?\s*'((?:[^'\\]|\\.)*)'/;
  const m = content.match(re);
  const meta = m ? m[1].replace(/\\'/g, "'") : 'NOT FOUND';
  console.log(f.replace('.ts', '') + ' | ' + meta.length + ' | ' + meta);
}
