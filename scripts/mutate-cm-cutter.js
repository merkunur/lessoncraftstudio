#!/usr/bin/env node
/* =====================================================================
   mutate-cm-cutter.js — proves verify-cm-cutter-core.js can fail
   (ACTIVITY #153, The CM Cutter). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-cm-cutter.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'cm-cutter-core.js'), act: path.join(MINI, 'cm-cutter-activity.js'), man: path.join(MINI, 'tildy-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['an alignment lamp before Check', 'act', "o += '<rect class=\"cc-ruler\" data-zero=\"' + Z + '\"", "o += '<rect class=\"cc-ruler' + (st.zero === r.s ? ' is-aligned' : '') + '\" data-zero=\"' + Z + '\""],
  ['the cutter starts at the table edge', 'core', 'var Z = st.zero, end = Z + st.len;', 'var Z = st.w0, end = st.zero + st.len;'],
  ['the stub is hidden', 'act', 'if (cut && cut.stub) o +=', 'if (false && cut.stub) o +='],
  ['air snips counted as pieces', 'core', 'pieces: Math.max(0, Math.min(r.e, end) - Math.max(r.s, Z))', 'pieces: Math.max(0, Math.min(r.e, end) - Z)'],
  ['a broken ruler graded by its end number', 'core', "return extra || missing ? { kind: 'miscount', extra: extra, missing: missing } : { kind: 'ok' };", "return st.stitches.length === r.e ? { kind: 'ok' } : { kind: 'miscount', extra: extra, missing: missing };"],
  ['a rack with two fitting rulers', 'core', "rack: [6, 9, 12] }", "rack: [6, 11, 12] }"],
  ['the reading fixed to the table, not the ruler', 'act', 'var n = Math.round(t - st.zero);', 'var n = Math.round(t);'],
  ['the cat\'s nudge skipped (the ruler starts aligned)', 'core', "['ribbon', 0, 7, 3]", "['ribbon', 0, 7, 0]"],
  ['the rounds sorted by length', 'core', "var ALIGN = [['ribbon', 0, 7, 3], ['leather', 0, 5, 2], ['yarn', 0, 4, 1]", "var ALIGN = [['yarn', 0, 4, 1], ['leather', 0, 5, 2], ['ribbon', 0, 7, 3]"],
  /* the rest of the model */
  ['a picked ruler lands already aligned', 'core', 'st.len = st.rack[i]; st.picked = i; st.zero = st.w0;', 'st.len = st.rack[i]; st.picked = i; st.zero = st.round.s;'],
  ['the broken jar shows the true length for free', 'core', 'return { pieces: on, stub: 0, air: st.stitches.length - on, tail: 0, gaps: length(r) - on };', 'return { pieces: length(r), stub: 0, air: 0, tail: 0, gaps: 0 };'],
  ['a strip starting at the table edge', 'core', "['braid', 5, 8, 3]", "['braid', 4, 8, 3]"],
  ['a short ruler accepted', 'core', 'if (c.tail) return { kind: \'short\', by: c.tail };\n    ', ''],
  ['misread accepted when aligned', 'core', "if (st.reading !== length(r)) return { kind: 'misread', by: st.reading - length(r) };", ''],
  ['no reading is a miss', 'core', "if (st.reading == null) return { kind: 'note', key: 'hintRead' };", "if (st.reading == null) return { kind: 'misread', by: 0 };"],
  ['the window clamps the 0 too tight', 'core', 'z = Math.max(st.w0, Math.min(st.w0 + WIN - 1, Math.round(z)));', 'z = Math.max(st.w0 + 1, Math.min(st.w0 + WIN - 1, Math.round(z)));'],
  ['a move keeps the old cut', 'core', 'function clear(st) { st.verdict = null; st.cut = null; }', 'function clear(st) { st.verdict = null; }'],
  ['an alignment flag in the state', 'core', "misses: 0, help: false, verdict: null, cut: null, done: false };", "misses: 0, help: false, verdict: null, cut: null, done: false, aligned: false };"],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['the same order every pass', 'core', 'if (!prev || prev.join() !== c.join()) { o = c; break; }', 'o = c; break;'],
  ['the rack never reshuffles', 'core', 'racks[r.k] = shuffle(r.rack.slice(), rnd);', 'racks[r.k] = r.rack.slice();'],
  ['the misread help shows the stub hint', 'core', "if (v.kind === 'misread') return st.help ? 'hintEnd' : 'hintJar';", "if (v.kind === 'misread') return st.help ? 'hintPin' : 'hintJar';"],
  /* the activity */
  ['the tail is hidden', 'act', 'if (cut && cut.tail) o +=', 'if (false && cut.tail) o +='],
  ['a note never reaches the screen', 'act', "if (r.result === 'note') { v.note = this._t(r.key);", "if (r.result === 'note') { v.note = '';"],
  ['fr loses a narrow space', 'act', '"fr":"Bocal : {n} morceaux"', '"fr":"Bocal : {n} morceaux"'],
  ['a locale without a string', 'act', '"fi":"Tarkista"', '"fi":""'],
  ['fr names the tailor', 'act', '"fr":"La couturière dit {m} cm.', '"fr":"Tildy dit {m} cm.'],
  ['a success line that drops the pieces', 'act', '"de":"0 am Anfang, {n} am Ende: Das Band ist {n} cm lang, und im Glas liegen {n} Stücke."', '"de":"0 am Anfang, {n} am Ende: Das Band ist {n} cm lang."'],
  ['the word free in a string', 'act', 'checkBtn: {"en":"Check"', 'checkBtn: {"en":"Free check"'],
  /* the manifest */
  ['the row still points at the old tildy activity', 'man', '"tool": "cm-cutter-activity"', '"tool": "tildy-activity"'],
  ['a new locale without its page title', 'man', '"fi": "Mittaa viivaimella senttimetreinä – 2. luokka | Tiina"', '"fi": ""']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-cm-cutter-core.js')], { env: Object.assign({}, process.env, { CC_CORE: files.core, CC_ACT: files.act, CC_MANIFEST: files.man }), encoding: 'utf8', timeout: 120000 });
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
console.log(`mutate-cm-cutter: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
