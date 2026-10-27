#!/usr/bin/env node
/* =====================================================================
   mutate-climbing-tree.js — proves verify-climbing-tree-core.js can fail.
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-climbing-tree.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'climbing-tree-core.js'), act: path.join(MINI, 'climbing-tree-activity.js'), man: path.join(MINI, 'olive-kind-of-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['a wrong branch holds', 'core', "var okB = st.at === rd.right,", "var okB = true,"],
  ['a wrong twig holds on the right branch', 'core', "okT = rd.lvl === '1' || st.twig === rd.rightTwig;", "okT = true;"],
  ['the animal branch in the duck round', 'core', '"n":"duck","kind":"bird","twig":"swims","others":["vehicle","food"]', '"n":"duck","kind":"bird","twig":"swims","others":["animal","food"]'],
  ['a resident without its twig', 'core', '["swims","swan"]', '["swims","woodpecker"]'],
  ['a clue that says the kind', 'core', '"It flies and has feathers."', '"It is a bird with feathers."'],
  ['a family member of another kind', 'core', '"fruit":"banana"', '"fruit":"cat"'],
  ['a label that is not the child\'s word', 'core', '"car":"macchina"', '"car":"automobile"'],
  ['the leaf built from the sign, not the authored kind phrase', 'core', "var b = rd.branches[st.at], s = rd.subj + ' ' + b.kp;", "var b = rd.branches[st.at], s = rd.subj + ' a ' + b.sign;"],
  ['the right branch always in the first place', 'core', "orders[r] = rest.slice(0, slots[i]).concat([0], rest.slice(slots[i]));", "orders[r] = [0].concat(rest);"],
  ['the right twig always first', 'core', "tw[k] = others.slice(0, tslots[i]).concat([rj], others.slice(tslots[i]));", "tw[k] = [rj].concat(others);"],
  ['level 2 counts any placed picture as right', 'core', "if (b === rd.home[i]) st.locked[i] = true;", "if (b >= 0) st.locked[i] = true;"],
  ['level 2 never locks the right ones', 'core', "if (b === rd.home[i]) st.locked[i] = true; else", "if (b === rd.home[i]) {} else"],
  ['a wrong branch does not slide back', 'core', "if (okB) st.twig = null; else { st.at = null; st.twig = null; }", "if (okB) st.twig = null;"],
  ['Check at the roots counts as a miss', 'core', "if (st.at == null) { st.last = 'empty'; return { result: 'empty' }; }", "if (st.at == null) { st.misses++; st.last = 'empty'; return { result: 'empty' }; }"],
  ['miss 2 never glows', 'core', "st.glow = st.misses >= 2 ? { branch: rd.right,", "st.glow = st.misses >= 3 ? { branch: rd.right,"],
  ['the same order every pass', 'core', "if (!same(c, prev)) { o = c; break; }", "o = ids; break;"],
  ['a digit in a hint', 'act', 'missBranch: {en:"That', 'missBranch: {en:"2 That'],
  ['the word free in a string', 'act', 'hintTwig: {en:"Now', 'hintTwig: {en:"Free now'],
  ['the manifest still on the old tool', 'man', '"tool": "climbing-tree-activity"', '"tool": "olive-kind-of-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ct-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { CT_CORE: files.core, CT_ACT: files.act, CT_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-climbing-tree-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-climbing-tree: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
