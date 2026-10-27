#!/usr/bin/env node
/* =====================================================================
   mutate-group-photo.js — proves verify-group-photo-core.js can fail.
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-group-photo.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'group-photo-core.js'), act: path.join(MINI, 'group-photo-activity.js'), man: path.join(MINI, 'ziggy-odd-one-out-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['any seat on the step snaps sharp', 'core', "if (st.step === rd.odd) {", "if (st.step != null) {"],
  ['the caption from a wrong tag', 'core', "rd.caption = D.kinds[s.kind][0];", "rd.caption = D.kinds[s.tags[1]][0];"],
  ['two odd ones in the data (a banana among the animals)', 'core', '"items":["dog","cat","pig","apple"]', '"items":["dog","cat","banana","apple"]'],
  ['a tick does not push Xs', 'core', "if (k !== t && st.cells[f][k] === 'e') { st.cells[f][k] = 'x'; st.by[f][k] = key; }", "if (false) {}"],
  ['lifting a tick lifts the child\'s own Xs too', 'core', "if (st.by[a][b] === key) { st.cells[a][b] = 'e'; st.by[a][b] = null; }", "if (st.cells[a][b] === 'x' && (a === f || b === t)) { st.cells[a][b] = 'e'; st.by[a][b] = null; }"],
  ['an either-or clue read as ruling nothing out', 'core', "return f === c[1] && t !== c[2] && t !== c[3];", "return false;"],
  ['a clue dropped: two solutions', 'core', '"clues":[["has",0,0],["not",1,2]]', '"clues":[["has",0,0]]'],
  ['the odd one always on seat one', 'core', "perms[r] = rest.slice(0, slots[i]).concat([s.odd], rest.slice(slots[i]));", "perms[r] = [s.odd].concat(rest);"],
  ['a word card in both fields', 'core', '"words":["walk","run","hop","march","stare"]', '"words":["walk","peek","hop","march","stare"]'],
  ['the glass bottle counted as plastic', 'core', '"items":["pspoon","toothbrush","shampoo","bottle"]', '"items":["pspoon","toothbrush","bottle","shampoo"]'],
  ['a wrong name tag true of every member', 'core', '"items":["robin","duck","owl","cup"],"odd":3,"kind":"birds","tags":["birds","insects","clothes"]', '"items":["robin","duck","owl","cup"],"odd":3,"kind":"birds","tags":["birds","animals","clothes"]'],
  ['miss 2 never shows who belongs', 'core', "var two = st.misses >= 2,", "var two = st.misses >= 3,"],
  ['the shutter with nobody on the step counts as a miss', 'core', "if (st.step == null) { st.last = 'empty'; return { result: 'empty' }; }", "if (st.step == null) { st.misses++; st.last = 'empty'; return { result: 'empty' }; }"],
  ['the true/false lamps reversed', 'core', "if (!!val === rd.tf[i].truth) {", "if (!val === rd.tf[i].truth) {"],
  ['the same order every pass', 'core', "if (!same(c, prev)) { o = c; break; }", "o = ids; break;"],
  ['a straight apostrophe in the French data', 'core', '"le cerf-volant","le ballon","le tambour","le chapeau","la chaussette","l’écharpe"', '"le cerf-volant","le ballon","le tambour","le chapeau","la chaussette","l\'écharpe"'],
  ['miss 2 glows a cell in a right row', 'core', "if (tk[fx[i][0]] !== fx[i][1]) { st.glow = fx[i]; break; }", "if (true) { st.glow = fx[i]; break; }"],
  ['a digit in a hint', 'act', "miss1: {en:\"The photo is cloudy", "miss1: {en:\"2 The photo is cloudy"],
  ['the word free in a string', 'act', "nameAsk: {en:\"Sharp!", "nameAsk: {en:\"Free and sharp!"],
  ['the manifest still on the old tool', 'man', '"tool": "group-photo-activity"', '"tool": "ziggy-odd-one-out-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gp-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { GP_CORE: files.core, GP_ACT: files.act, GP_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-group-photo-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-group-photo: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
