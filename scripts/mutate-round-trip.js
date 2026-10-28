#!/usr/bin/env node
/* =====================================================================
   mutate-round-trip.js — proves verify-round-trip-core.js can fail (ACTIVITY #143, The Round-Trip Cart).
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-round-trip.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'round-trip-core.js'), act: path.join(MINI, 'round-trip-activity.js'), man: path.join(MINI, 'gus-snack-cart-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['the back trip uses the story\'s own sign (no inverse)', 'core', "function tripFor(start, step, claim) { var back = claim - step;", "function tripFor(start, step, claim) { var back = claim + step;"],
  ['the back trip drives the claim\'s distance, not the story\'s', 'core', "function tripFor(start, step, claim) { var back = claim - step;", "function tripFor(start, step, claim) { var back = claim - (claim - start);"],
  ['the gap loses its direction', 'core', "closes: back === start, gap: back - start };", "closes: back === start, gap: Math.abs(back - start) };"],
  ['a route checks only its last leg', 'core', "legs.push(t); if (!t.closes) fail = i; else from = claim;", "legs.push(t); if (!t.closes && i === st.rd.steps.length - 1) fail = i; else from = claim;"],
  ['rounding half down', 'core', "function nearerTen(n) { return Math.floor((n + 5) / 10) * 10; }", "function nearerTen(n) { return Math.floor((n + 4) / 10) * 10; }"],
  ['the farther post is accepted', 'core', "if (post !== nearerTen(n)) return n % 10 === 5 ? 'five' : 'far';", ""],
  ['a wrong about value counts as a miss', 'core', "st.aboutOk = st.mode === 'round' ? +st.typed.about === aboutValue(st) : null;", "st.aboutOk = st.mode === 'round' ? +st.typed.about === aboutValue(st) : null; if (st.aboutOk === false) st.misses++;"],
  ['the hops count ones as tens', 'core', "return { tens: Math.floor(m / 10), ones: m % 10,", "return { tens: Math.round(m / 10), ones: m % 10,"],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2;", "st.misses++; st.help = st.misses >= 3;"],
  ['the cart can be dragged during a round', 'core', "function drive(st, n) { if (!st.done) return false;", "function drive(st, n) {"],
  ['a story number changed', 'core', "var ONE = [[45, -8, 0, 1],", "var ONE = [[45, -9, 0, 1],"],
  ['a route leg leaves the road', 'core', "[92, [-35, 6, -18]]", "[92, [-35, 6, -68]]"],
  ['the bands are dropped from the plan', 'core', "var keys = Object.keys(bands).sort();", "var keys = ['1']; bands['1'] = rounds(mode).map(function (r) { return r.k; });"],
  ['the same order every pass', 'core', "if (!prev || prev.join() !== o.join()) return { order: o };", "return { order: o.sort(function (a, b) { return a - b; }) };"],
  ['a refused picture (the plum that is an apple)', 'core', "{ key: 'apple', pic: 'At the Supermarket/apple' },", "{ key: 'apple', pic: 'fruits/plum' },"],
  ['a B&W picture', 'core', "{ key: 'carrot', pic: 'At the Supermarket/carrot' },", "{ key: 'carrot', pic: 'vegetables bw/carrot' },"],
  ['a two-digit box takes a third digit', 'core', "function maxLen(box) { return box === 'about' ? 3 : 2; }", "function maxLen(box) { return 3; }"],
  ['a story that drops its number', 'act', 'sOne3: {"en":"Gus had 34 acorns. He found 9 more."', 'sOne3: {"en":"Gus had 34 acorns. He found some more."'],
  ['a digit in a hint', 'act', 'hintStart: {"en":"Type how many Gus has now."', 'hintStart: {"en":"Type how many Gus has now (2 digits)."'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  ['Gus called a squirrel', 'act', 'title: {"en":"Gus\'s Snack Cart"', 'title: {"en":"Gus the squirrel\'s Snack Cart"'],
  ['the ascii hyphen for minus', 'act', "MINUS: '−',", "MINUS: '-',"],
  ['a success line without the answer', 'act', 'okSub: {"en":"{a} take away {b} is {c}', 'okSub: {"en":"{a} take away {b} is right'],
  ['a role="img" label', 'act', "apparatusClasses: ['rt-art'],", "apparatusClasses: ['rt-art'], _x: ['role', 'img'],"],
  ['a frozen slug edited', 'man', '"en": "gus-snack-cart"', '"en": "gus-snack-cart-2"'],
  ['the manifest still on the old tool', 'man', '"tool": "round-trip-activity"', '"tool": "gus-snack-cart-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rt-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { RT_CORE: files.core, RT_ACT: files.act, RT_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-round-trip-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name + ' — ' + mod[1].slice(0, 60)); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_') + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
let killed = 0;
const control = run(write('control', ['core', "'use strict';", "'use strict';  "]));
console.log((control.status === 0 ? 'ok  ' : 'FAIL') + ' control (whitespace) survives');
for (const [name, file, a, b] of M) {
  const r = run(write(name, [file, a, b]));
  const dead = r.status !== 0; if (dead) killed++;
  const why = ((r.stdout || '') + (r.stderr || '')).split('\n').find(x => /FAIL|Error/.test(x)) || '';
  console.log((dead ? 'killed  ' : 'SURVIVED') + ' ' + name + (dead ? '   ← ' + why.trim().slice(0, 110) : ''));
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`mutate-round-trip: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
