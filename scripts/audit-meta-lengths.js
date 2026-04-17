const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'en');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts')).sort();

const results = [];
for (const file of files) {
  const c = fs.readFileSync(path.join(dir, file), 'utf8');
  // Robust: find metaDescription line(s) and unwrap escapes to count actual chars
  const m = c.match(/metaDescription:\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/);
  if (!m) {
    console.error('No meta in ' + file);
    continue;
  }
  let raw = m[1];
  const quote = raw[0];
  raw = raw.slice(1, -1);
  // Decode escaped quote (\') and unicode escapes (\uXXXX) to count real chars
  let decoded = raw
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  results.push({ file, length: decoded.length, text: decoded });
}

results.sort((a, b) => b.length - a.length);
for (const r of results) {
  const flag = r.length > 165 ? ' !! ' : r.length < 140 ? ' -- ' : '    ';
  console.log(flag + r.length.toString().padStart(3) + '  ' + r.file.padEnd(24) + '  ' + r.text.slice(0, 80) + (r.text.length > 80 ? '...' : ''));
}
