const fs = require('fs');
const path = require('path');
const base = 'C:/Users/rkgen/lessoncraftstudio/frontend/content/themes';
const marker = '    },\n  },\n\n  // -- FAQ --';
const dirs = fs.readdirSync(base).filter(d => fs.statSync(path.join(base, d)).isDirectory());
let ok = 0, fail = 0;
dirs.forEach(t => {
  const fp = path.join(base, t, 'en.ts');
  if (!fs.existsSync(fp)) { console.log(t + ': NO en.ts'); fail++; return; }
  const f = fs.readFileSync(fp, 'utf8');
  const idx = f.indexOf(marker);
  if (idx > -1) { ok++; } else { console.log(t + ': NOT FOUND'); fail++; }
});
console.log('OK:', ok, 'FAIL:', fail, 'TOTAL:', dirs.length);
