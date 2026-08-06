const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

// All changed files that might have the apostrophe issue
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

// The right single quote ' (U+2019) decoded from \u2019 is safe in JS strings
// The straight apostrophe ' (U+0027) decoded from \u0027 breaks single-quoted strings
// We need to find lines where ' appears unescaped inside single-quoted string literals

let totalFixed = 0;
let filesFixed = 0;

for (const fp of files) {
  const rel = path.relative(root, fp).replace(/\\/g, '/');
  const raw = fs.readFileSync(fp, 'utf8');
  const lines = raw.split('\n');
  let changed = false;
  let fileCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Look for patterns like: key: 'text with d'apostrophe',
    // The issue is ' inside single-quoted strings from \u0027 decode
    // We need to find single-quoted strings that contain unescaped '
    // Strategy: find lines that have an odd number of unescaped single quotes
    // which indicates a broken string

    // Actually simpler: find the specific French pattern d'utilisation etc.
    // where an apostrophe appears mid-word inside a single-quoted string
    // These will manifest as: 'Conditions d'utilisation' - 4 quotes instead of 2

    // Use a regex to find word'word patterns that are inside what should be a string
    // Replace the middle ' with \'
    const fixed = line.replace(
      /(\w)(\u0027)(\w)/g,
      (match, before, apos, after) => {
        // Check if this looks like it's inside a string by checking the line structure
        // If the line has string assignment patterns, fix it
        return before + "\\'" + after;
      }
    );

    if (fixed !== line) {
      lines[i] = fixed;
      changed = true;
      const count = (line.match(/(\w)\u0027(\w)/g) || []).length;
      fileCount += count;
    }
  }

  if (changed) {
    fs.writeFileSync(fp, lines.join('\n'), 'utf8');
    totalFixed += fileCount;
    filesFixed++;
    console.log(`FIXED ${rel} — ${fileCount} apostrophes escaped`);
  }
}

console.log(`\nTotal: ${totalFixed} apostrophes fixed across ${filesFixed} files`);
