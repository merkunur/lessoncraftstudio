/* Every GEO constant must reach a call site.  #55 shipped seven dead ones
   past an 8,903-assertion gate; this asks the question directly.
   ⚠ Written as a FILE, not `node -e` — the shell-quoted form of this same
   probe reported all 14 constants DEAD, which was an escaping artefact. */
const fs = require('fs');
const src = fs.readFileSync('mini tools/the-gap.js', 'utf8');

const declStart = src.indexOf('var GEO');
const bodyStart = src.indexOf('var TheGap');
const decl = src.slice(declStart, bodyStart);
const body = src.slice(bodyStart);

const keys = [];
const KEY = /^\s{4}([A-Z][A-Z_]*)\s*:/gm;
let m;
while ((m = KEY.exec(decl))) keys.push(m[1]);

if (keys.length < 5) { console.error('FAULT: parsed only ' + keys.length + ' constants'); process.exit(1); }

let dead = 0;
for (const k of keys) {
  const re = new RegExp('GEO\\.' + k + '\\b', 'g');
  const n = (body.match(re) || []).length;
  if (!n) dead++;
  console.log(k.padEnd(16), String(n).padStart(2), n ? '' : '  <-- DEAD');
}
console.log('\n' + keys.length + ' constants, ' + dead + ' dead');

/* non-vacuity control: a name that is certainly absent must read 0 */
console.log('control (GEO.NOPE):', (body.match(/GEO\.NOPE\b/g) || []).length);
