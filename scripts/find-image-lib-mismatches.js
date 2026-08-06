#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INV_FILE = path.join(__dirname, 'image-library-inventory.txt');

function walkDir(dir, exts) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory() && e.name !== 'node_modules' && e.name !== '.next') results.push(...walkDir(full, exts));
      else if (exts.some(ext => e.name.endsWith(ext))) results.push(full);
    }
  } catch {}
  return results;
}

// Load server inventory
const inv = new Set(fs.readFileSync(INV_FILE, 'utf-8').trim().split('\n'));

const files = [
  ...walkDir(path.join(ROOT, 'frontend/config'), ['.ts']),
  ...walkDir(path.join(ROOT, 'frontend/app'), ['.ts', '.tsx']),
  ...walkDir(path.join(ROOT, 'frontend/lib'), ['.ts']),
];

const captionMismatches = [];
const missingFiles = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const relFile = path.relative(ROOT, file);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('image-library') || !line.includes('.webp')) continue;

    // Extract full path and filename
    const srcM = line.match(/image-library\/([^'\"]+\.webp)/);
    if (!srcM) continue;
    const fullPath = decodeURIComponent(srcM[1]);
    const imgFilename = fullPath.split('/').pop().replace('.webp', '').toLowerCase().replace(/[-_ ]+/g, ' ').trim();

    // Check if file exists on server
    if (!inv.has(fullPath)) {
      missingFiles.push({ file: relFile, line: i + 1, path: fullPath });
    }

    // Check caption mismatch
    const block = lines.slice(i, Math.min(i + 3, lines.length)).join(' ');
    const capM = block.match(/caption:\s*['"]([^'"]+)['"]/);
    if (!capM) continue;
    const caption = capM[1];
    const captionLower = caption.toLowerCase().replace(/[-_ ]+/g, ' ').trim();

    const captionWords = captionLower.split(/\s+/).filter(w => w.length >= 3);
    const filenameWords = imgFilename.split(/\s+/).filter(w => w.length >= 3);

    const anyMatch = captionWords.some(cw => filenameWords.some(fw => fw.includes(cw) || cw.includes(fw)));

    if (!anyMatch && captionWords.length > 0) {
      captionMismatches.push({ file: relFile, line: i + 1, img: imgFilename, caption, fullSrc: fullPath });
    }
  }
}

console.log('=== MISSING FILES (image does not exist on server) ===');
console.log(`Count: ${missingFiles.length}`);
const uniqueMissing = new Map();
for (const m of missingFiles) {
  if (!uniqueMissing.has(m.path)) uniqueMissing.set(m.path, []);
  uniqueMissing.get(m.path).push(m.file + ':' + m.line);
}
for (const [p, files] of uniqueMissing) {
  console.log(`  ${p} (${files.length} refs)`);
}

console.log('\n=== CAPTION MISMATCHES (image filename != caption) ===');
console.log(`Count: ${captionMismatches.length}`);
const uniqueCap = new Map();
for (const m of captionMismatches) {
  const key = m.img + '|' + m.caption;
  if (!uniqueCap.has(key)) uniqueCap.set(key, { ...m, count: 0 });
  uniqueCap.get(key).count++;
}
for (const [key, val] of uniqueCap) {
  console.log(`  Image: "${val.img}" | Caption: "${val.caption}" (${val.count} instances)`);
}
