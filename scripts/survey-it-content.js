const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'config', 'app-content', 'it');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts')).sort();

const rows = [];
let ctaCount = 0;
for (const f of files) {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  if (c.includes('ctaHeading:')) ctaCount++;
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
  rows.push({ file: f, title, titleLen: title.length, h1, metaLen: meta.length });
}

console.log('ctaHeading present: ' + ctaCount + '/33');
console.log('');
console.log('=== Top 8 titles by length ===');
rows.sort((a, b) => b.titleLen - a.titleLen);
for (const r of rows.slice(0, 8)) console.log('  t(' + r.titleLen + ') ' + r.title);
console.log('');
console.log('=== Top 6 metas ===');
rows.sort((a, b) => b.metaLen - a.metaLen);
for (const r of rows.slice(0, 6)) {
  const flag = r.metaLen > 165 ? '!!' : '  ';
  console.log(flag + ' m(' + r.metaLen + ') ' + r.file);
}
console.log('');
console.log('=== Sample H1s ===');
for (const r of rows.slice(0, 5)) console.log('  ' + r.file + ': ' + r.h1);
console.log('');
console.log('=== uiStrings.it state ===');
const tmpl = fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'apps', '[slug]', 'page.tsx'), 'utf8');
const itBlock = tmpl.match(/\s\sit:\s*\{[\s\S]*?\},/);
if (itBlock) {
  const hasPaired = /pairedToolPrompt/.test(itBlock[0]);
  const sc = itBlock[0].match(/startCreating:\s*'([^']*)'/)?.[1];
  console.log('startCreating: ' + sc);
  console.log('pairedToolPrompt present: ' + hasPaired);
}
