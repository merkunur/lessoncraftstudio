const fs = require('fs');

const files = [
  'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes/transportation/da.ts',
  'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes/construction/da.ts',
  'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes/travel/da.ts',
  'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes/camping/da.ts',
  'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes/pirates/da.ts',
];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Remove backslash before non-ASCII characters (stray escapes)
  // But preserve legitimate backslashes like \' in strings
  const before = c.length;
  // Match a literal backslash followed by any non-ASCII Unicode character
  const result = [];
  for (let i = 0; i < c.length; i++) {
    if (c.charCodeAt(i) === 0x5c && i + 1 < c.length && c.charCodeAt(i + 1) > 0x7f) {
      // Skip the backslash, keep the unicode char
      changed = true;
      continue;
    }
    result.push(c[i]);
  }

  if (changed) {
    fs.writeFileSync(f, result.join(''), 'utf8');
    console.log('Fixed:', f);
  } else {
    console.log('No changes needed:', f);
  }
}
