const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'de');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts')).sort();

const rows = [];
for (const f of files) {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const title = c.match(/titleTag:\s*'([^']*)'/)?.[1] || '';
  const h1 = c.match(/hero:\s*\{\s*\n\s*title:\s*'([^']*)'/)?.[1] || '';
  const m = c.match(/metaDescription:\s*('(?:[^'\\]|\\.)*')/);
  let meta = '';
  if (m) {
    meta = m[1]
      .slice(1, -1)
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  }
  rows.push({ file: f, title, h1, metaLen: meta.length, meta: meta.slice(0, 80) });
}

rows.sort((a, b) => b.metaLen - a.metaLen);
for (const r of rows) {
  console.log(r.file + ':');
  console.log('  t(' + r.title.length + ') ' + r.title);
  console.log('  h(' + r.h1.length + ') ' + r.h1);
  console.log('  m(' + r.metaLen + ') ' + r.meta);
}
