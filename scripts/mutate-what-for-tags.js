#!/usr/bin/env node
/* =====================================================================
   mutate-what-for-tags.js — proves verify-what-for-tags-core.js can fail.
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-what-for-tags.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'what-for-tags-core.js'), act: path.join(MINI, 'what-for-tags-activity.js'), man: path.join(MINI, 'jasper-just-right-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['a wrong thing locks on its hook', 'core', "if (fits(st, h)) st.locked[h] = true;", "if (true) st.locked[h] = true;"],
  ['a wrong thing keeps its tag closed', 'core', "else { back.push(h); if (rd.lvl !== '2') st.open[j] = true; st.hook[h] = null; }", "else { back.push(h); st.hook[h] = null; }"],
  ['a wrong thing stays on the hook', 'core', "else { back.push(h); if (rd.lvl !== '2') st.open[j] = true; st.hook[h] = null; }", "else { back.push(h); if (rd.lvl !== '2') st.open[j] = true; }"],
  ['Go with an empty hook counts as a miss', 'core', "{ st.last = 'empty'; return { result: 'empty' }; }", "{ st.misses++; st.last = 'empty'; return { result: 'empty' }; }"],
  ['level 2 done without every moment', 'core', "var missing = rd.lvl === '2' ? rd.windows.filter(function (w, h) { return w.fits && !st.locked[h]; }).length", "var missing = rd.lvl === '2' ? 0"],
  ['miss 2 never hops', 'core', "if (st.misses >= 2) st.glow =", "if (st.misses >= 3) st.glow ="],
  ['the hop leaves out the still-wanted things', 'core', "(!st.open[j] || needed(st, j))", "(!st.open[j])"],
  ['the bag never shuffles', 'core', "orders[r] = slot;", "orders[r] = ident(bag);"],
  ['the same order every pass', 'core', "if (!same(c, prev)) { o = c; break; }", "o = ids; break;"],
  ['a spoon beside the whipped cream', 'core', '"right":["whisk","glass","spatula","scarf"],"extras":["umbrella","comb"', '"right":["whisk","glass","spatula","scarf"],"extras":["spoon","comb"'],
  ['a lamp in the tent round', 'core', '"right":["flashlight","pillow","coat","water"],"extras":["spade","sunglasses"', '"right":["flashlight","pillow","coat","water"],"extras":["spade","lamp"'],
  ['level 2: the pencil said to help in the rain', 'core', '"pencil":["write","draw"]', '"pencil":["write","draw","rain"]'],
  ['level 3: hammer beside loud', 'core', '"pairs":[["couch","fireplace"],["snowman","icicle"],["drum","trumpet"]]', '"pairs":[["couch","fireplace"],["snowman","icicle"],["drum","hammer"]]'],
  ['a sentence that names its answer', 'core', '"rain":"It is raining outside."', '"rain":"It is raining outside. Take the umbrella."'],
  ['a sentence that gives the answer by its root', 'core', '"bright":"The light outside hurts your eyes."', '"bright":"The sun hurts your eyes."'],
  ['a label that is not the child\'s word', 'core', '"spatula":"stegespade"', '"spatula":"paletkniv"'],
  ['a missing picture', 'core', '"water":"At the Supermarket/water"', '"water":"At the Supermarket/waterx"'],
  ['a digit in a hint', 'act', 'hintHang: {en:"Hang', 'hintHang: {en:"2 Hang'],
  ['the word free in a string', 'act', 'missTags: {en:"The tags', 'missTags: {en:"Free tags'],
  ['the manifest still on the old tool', 'man', '"tool": "what-for-tags-activity"', '"tool": "jasper-just-right-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wt-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { WT_CORE: files.core, WT_ACT: files.act, WT_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-what-for-tags-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-what-for-tags: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
