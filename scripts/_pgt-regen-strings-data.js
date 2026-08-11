/* Regenerate the module.exports block of _pair-gate-strings.js FROM the
   shipped tool file (the SoT), preserving the header docblock, so that
   `apply-pair-gate-locales.js` is an idempotent no-op after the
   2026-08-11 redesign fold. */
'use strict';
const fs = require('fs');
const path = require('path');
const T = require(path.join(__dirname, '..', 'mini tools', 'pair-gate.js'));

const FP = path.join(__dirname, '_pair-gate-strings.js');
const LOCS = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const js = s => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

const lines = ['module.exports = {'];
lines.push('  /* REGENERATED 2026-08-11 from the shipped `mini tools/pair-gate.js`');
lines.push('     after the redesign fold — the TOOL FILE is the SoT and this data');
lines.push('     file mirrors it so `apply-pair-gate-locales.js` is an idempotent');
lines.push('     no-op. Author changes in the tool (via native panels), then');
lines.push('     regenerate with scripts/_pgt-regen-strings-data.js; never');
lines.push('     hand-edit a locale here. */');
let n = 0;
LOCS.forEach((L, li) => {
  lines.push('  ' + L + ': {');
  const keys = Object.keys(T.strings).filter(k => T.strings[k][L] !== undefined);
  keys.forEach((k, i) => {
    n++;
    lines.push('    ' + k + ': ' + js(T.strings[k][L]) + (i === keys.length - 1 ? '' : ','));
  });
  lines.push('  }' + (li === LOCS.length - 1 ? '' : ','));
});
lines.push('};');
lines.push('');

let src = fs.readFileSync(FP, 'utf8').replace(/\r\n/g, '\n');
const at = src.indexOf('module.exports = {');
if (at === -1) throw new Error('no module.exports anchor');
fs.writeFileSync(FP, src.slice(0, at) + lines.join('\n'), 'utf8');
console.log('regenerated ' + n + ' strings across ' + LOCS.length + ' locales');
