/**
 * sample-wave.js — a SMALL copy of a Level Set wave for measuring a fix (guessability audit 2026-10-06): the first
 * N copies of every (type, level), written to waves/_sample-<prefix>-<loc>.json with its own id so it stages to
 * out/staging/gs-<prefix>-<loc> and never touches the real wave's folder.
 *
 *   node tools/level-set/sample-wave.js <prefix> <loc> [n=4]
 *   node cli.js generate --wave waves/_sample-<prefix>-<loc>.json --force
 *   node qa/guessability.js out/staging/gs-<prefix>-<loc> --group=face
 */
'use strict';
const fs = require('fs');
const path = require('path');
const [prefix, loc, nArg] = process.argv.slice(2);
if (!prefix || !loc) { console.error('usage: node tools/level-set/sample-wave.js <prefix> <loc> [n=4]'); process.exit(2); }
const n = +(nArg || 4);
const W = path.join(__dirname, '..', '..', 'waves');
const w = JSON.parse(fs.readFileSync(path.join(W, `wave-${prefix}-${loc}.json`), 'utf8'));
w.id = `gs-${prefix}-${loc}`;
w._note = `SAMPLE of wave-${prefix}-${loc} (first ${n} copies per type and level) — guessability check, not for publishing`;
let total = 0;
for (const t of Object.keys(w.levels || {})) for (const lv of Object.keys(w.levels[t])) {
  w.levels[t][lv] = w.levels[t][lv].slice(0, n); total += w.levels[t][lv].length;
}
const out = path.join(W, `_sample-${prefix}-${loc}.json`);
fs.writeFileSync(out, JSON.stringify(w, null, 1) + '\n');
console.log(`${out}: ${total} decks`);
