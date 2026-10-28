#!/usr/bin/env node
/* =====================================================================
   mutate-value-keys.js — proves verify-value-keys-core.js can fail
   (ACTIVITY #150, The Value-Key Adding Machine). Each mutation breaks the
   core, the activity or the manifest in one way a real bug would (the
   design's §12 list first); the gate must reject every one. A control
   (whitespace) must pass. A needle no longer in its file THROWS — a
   dropped mutation never shrinks the total quietly. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-value-keys.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'value-keys-core.js'), act: path.join(MINI, 'value-keys-activity.js'), man: path.join(MINI, 'place-value-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the right set always first', 'core', '[52, [53, 52, 22]]', '[52, [52, 53, 22]]'],
  ['the right set always the one with the most pieces', 'core', '[71, [70, 11, 71]]', '[71, [70, 11, 79]]'],
  ['the machine reads a fed set by its piece count', 'core', 'st.fed = i; st.keys = keysFor(st.round.sets[i]);', 'st.fed = i; var pc = digits(st.round.sets[i]).t + digits(st.round.sets[i]).o; st.keys = { h: null, t: Math.floor(pc / 10) || null, o: pc % 10 || null };'],
  ['a zero key', 'core', '!(d >= 1 && d <= 9', '!(d >= 0 && d <= 9'],
  ['a column holds two keys', 'core', 'st.keys[p] = st.keys[p] === d ? null : d;', 'st.keys[p] = st.keys[p] && st.keys[p] !== d ? st.keys[p] + d : (st.keys[p] === d ? null : d);'],
  ['a zero place printed as + 0', 'core', 'return PLACES.filter(function (p) { return d[p] > 0; }).map(', 'return PLACES.filter(function (p) { return d[p] >= 0 && (p !== \'h\' || d[p] > 0); }).map('],
  ['the drums concatenate instead of add', 'core', 'function sumOf(keys) { var s = 0; PLACES.forEach(function (p) { if (keys[p]) s += valueOf(p, keys[p]); }); return s; }', 'function sumOf(keys) { var s = \'\'; PLACES.forEach(function (p) { if (keys[p]) s += String(keys[p]); }); return +s; }'],
  ['the worth job graded by face value', 'core', "var want = job === 'worth' ? valueOf(r.place, r.d) : n;", "var want = job === 'worth' ? r.d : n;"],
  ['the zero targets dropped', 'core', 'var MAKE3_A = [108, 247, 305, 420, 500, 604, 730, 850, 974];', 'var MAKE3_A = [118, 247, 315, 421, 511, 614, 731, 851, 974];'],
  ['keys labelled with digits instead of values', 'core', 'function valueOf(p, d) { return d * UNIT[p]; }', 'function valueOf(p, d) { return d; }'],
  ['the ones column reads in hundreds', 'core', "var UNIT = { h: 100, t: 10, o: 1 };", "var UNIT = { h: 100, t: 10, o: 100 };"],
  /* the rest of the model */
  ['a crank with no key is a miss', 'core', "if (!keyCount(st.keys)) return { result: 'note', key: 'hintNoKey' };", "if (!keyCount(st.keys)) { st.misses++; return { result: 'note', key: 'hintNoKey' }; }"],
  ['two keys accepted in the worth job', 'core', "if (job === 'worth' && keyCount(st.keys) > 1) return { result: 'note', key: 'hintOneKey' };", ''],
  ['a zero-place key is an ordinary miss', 'core', "if (zero.length && job === 'make') kind = { kind: 'zeroPressed', sum: sum, places: zero };", "if (false) kind = null;"],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['the help names a zero place', 'core', 'var nz = v.places.filter(function (p) { return d[p] > 0; });', 'var nz = v.places;'],
  ['the same order every pass', 'core', 'if (!prev || prev.join() !== o.join()) return { order: o };', 'return { order: o };'],
  ['the make passes do not alternate', 'core', "return !(job === 'make' && places === 3) || r.pass === (pass % 2); });", 'return true; });'],
  ['the tape prints smallest first', 'core', "return v.map(function (x, i) { return (i ? '+ ' : '') + x; })", "return v.reverse().map(function (x, i) { return (i ? '+ ' : '') + x; })"],
  ['which set allows three digits', 'core', "function placesOf(job, numbers) { return jobOf(job) === 'set' ? 2 : (numbers === 'two' ? 2 : 3); }", "function placesOf(job, numbers) { return numbers === 'two' ? 2 : 3; }"],
  ['a press keeps the old verdict', 'core', "st.keys[p] = st.keys[p] === d ? null : d;\n    st.verdict = null;", "st.keys[p] = st.keys[p] === d ? null : d;"],
  ['a 0 round', 'core', 'var MAKE2 = [43, 70, 58,', 'var MAKE2 = [43, 0, 58,'],
  /* the activity */
  ['the worth tray shows the answer', 'act', "html = html.replace('<b>' + C.valueOf(st.round.place, st.round.d) + '</b>', '<b>?</b>');", ''],
  ['a worth hint names the number', 'act', '"en":"Your key is worth {v}. Compare', '"en":"Your key is worth {v}, not {n}. Compare'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  ['a locale without a string', 'act', '"fi":"Paina ensin näppäintä."', '"fi":""'],
  ['fr loses a narrow space', 'act', '"fr":"Combien vaut le chiffre en couleur ?', '"fr":"Combien vaut le chiffre en couleur ?'],
  ['a hint never reaches the screen', 'act', "var nk = r.key === 'hintNoKey' && st.job !== 'make' ? 'hintFirst' : r.key; v.note = this._t(nk);", "var nk = r.key; v.note = '';"],
  ['the placeholder of a locale lost', 'act', '"de":"Bilde {n} an der Maschine."', '"de":"Bilde die Zahl an der Maschine."'],
  /* the manifest */
  ['the row still points at the old activity', 'man', '"tool": "value-keys-activity"', '"tool": "place-value-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vk-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-value-keys-core.js')], { env: Object.assign({}, process.env, { VK_CORE: files.core, VK_ACT: files.act, VK_MANIFEST: files.man }), encoding: 'utf8', timeout: 60000 });
const write = (name, mod) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (mod && mod[0] === k) { if (t.indexOf(mod[1]) < 0) throw new Error('needle gone: ' + name); t = t.replace(mod[1], mod[2]); } out[k] = path.join(tmp, name.replace(/\W+/g, '_') + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
for (const [name, file, a] of M) { if (read(FILES[file]).indexOf(a) < 0) throw new Error('needle gone: ' + name); }
let killed = 0;
const control = run(write('control', ['core', "'use strict';", "'use strict';  "]));
console.log((control.status === 0 ? 'ok  ' : 'FAIL') + ' control (whitespace) survives');
for (const [name, file, a, b] of M) {
  const r = run(write(name, [file, a, b]));
  const dead = r.status !== 0; if (dead) killed++;
  const why = ((r.stdout || '') + (r.stderr || '')).split('\n').find((x) => /FAIL|Error/.test(x)) || '';
  console.log((dead ? 'killed  ' : 'SURVIVED') + ' ' + name + (dead ? '   ← ' + why.trim().slice(0, 110) : ''));
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`mutate-value-keys: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
