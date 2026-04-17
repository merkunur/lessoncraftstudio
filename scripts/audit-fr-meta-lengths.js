const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'fr');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts')).sort();

const rows = [];
for (const f of files) {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = c.match(/metaDescription:\s*('(?:[^'\\]|\\.)*')/);
  if (!m) continue;
  const decoded = m[1]
    .slice(1, -1)
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  rows.push({ f, len: decoded.length });
}

rows.sort((a, b) => b.len - a.len);
for (const r of rows) {
  const flag = r.len > 165 ? ' !!' : r.len < 140 ? ' --' : '   ';
  console.log(flag + ' ' + String(r.len).padStart(3) + '  ' + r.f);
}
