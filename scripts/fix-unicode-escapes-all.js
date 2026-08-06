const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

// Collect all .ts and .tsx files from these directories
const dirs = [
  'frontend/app',
  'frontend/components',
  'frontend/lib',
  'frontend/config',
];

function walk(dir, ext, results) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walk(full, ext, results);
    } else if (ext.some(e => entry.name.endsWith(e))) {
      results.push(full);
    }
  }
}

let files = [];
for (const d of dirs) {
  walk(path.join(root, d), ['.ts', '.tsx'], files);
}

let totalFixed = 0;
let filesFixed = 0;

for (const fp of files) {
  const rel = path.relative(root, fp).replace(/\\/g, '/');
  const raw = fs.readFileSync(fp, 'utf8');

  // Step 1: Fix surrogate pairs (emoji flags etc.) - must come first
  let fixed = raw.replace(/\\ud([89a-f][0-9a-f]{2})\\ud([89a-f][0-9a-f]{2})/gi, (match, hi, lo) => {
    const highCode = parseInt('d' + hi, 16);
    const lowCode = parseInt('d' + lo, 16);
    return String.fromCodePoint(((highCode - 0xD800) * 0x400) + (lowCode - 0xDC00) + 0x10000);
  });

  // Step 2: Fix \u0027 (apostrophe) specially — replace with \' to preserve string syntax
  fixed = fixed.replace(/\\u0027/g, "\\'");

  // Step 3: Fix remaining single \uXXXX escapes (all others become real chars)
  fixed = fixed.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  if (raw !== fixed) {
    fs.writeFileSync(fp, fixed, 'utf8');
    const count = (raw.match(/\\u[0-9a-fA-F]{4}/g) || []).length;
    totalFixed += count;
    filesFixed++;
    console.log(`FIXED ${rel} — ${count} escapes replaced`);
  }
}

console.log(`\nTotal: ${totalFixed} escapes fixed across ${filesFixed} files`);
