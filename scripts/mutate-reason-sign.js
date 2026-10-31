#!/usr/bin/env node
/* =====================================================================
   mutate-reason-sign.js — proves verify-reason-sign-core.js can fail
   (ACTIVITY #175, Pearl's Opinion Page). Each mutation breaks the core,
   the pages, the activity or the manifest in one way a real bug would
   (the design's §12 list first); the gate must reject every one. A
   control (whitespace) must pass. A needle no longer in its file THROWS.
   Usage: node scripts/mutate-reason-sign.js [--only=<name part>|…]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawn } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'reason-sign-core.js'), data: path.join(MINI, 'reason-sign-data.js'), act: path.join(MINI, 'pearl-opinion-page-activity.js'), man: path.join(MINI, 'pearl-opinion-page-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['a restatement holds the sign up', 'core', [["else if (c.role === 'restate') { show[i] = 'copy'; why = why || 'restate'; }", "else if (c.role === 'restate') { show[i] = 'post'; signs[s.sign].reasons++; }"]]],
  ['an off-topic post is planted under the sign', 'core', [["else { show[i] = 'lonely'; why = why || 'off'; }", "else { show[i] = 'post'; signs[s.sign].reasons++; }"]]],
  ['a reason is accepted under the wrong sign', 'core', [["if (c.role === 'reason' && c.point === mine)", "if (c.role === 'reason')"]]],
  ['Level 3 accepts one reason', 'core', [["var need = st.level === 'legs' ? 2 : 1;", 'var need = 1;']]],
  ['the restatements carry the modal', 'data', [['"S": "A new park is right for our town."', '"S": "Our town should have a new park."'], ['"S": "a new park is right for our town."', '"S": "our town should have a new park."'], ['"S": "A class garden is a great plan."', '"S": "A class should have a garden."'], ['"S": "a class garden is a great plan."', '"S": "a class should have a garden."'], ['"S": "Washing dishes is a job for kids too."', '"S": "Kids should wash dishes too."'], ['"S": "washing dishes is a job for kids too."', '"S": "kids should wash dishes too."']]],
  ['an off-topic card shares no word', 'data', [['"O": "Our town has a library by the bus stop."', '"O": "The library opens at nine on Mondays."'], ['"O": "our town has a library by the bus stop."', '"O": "the library opens at nine on Mondays."']]],
  ['the reason card always in slot 1', 'core', [['var SLOT1 = [2, 1, 3, 3, 1, 2, 1, 3];', 'var SLOT1 = [1, 1, 1, 1, 1, 1, 1, 1];']]],
  ['the tide result shows before Check', 'core', [['st.sockets[socket].card = id; st.shown = null;', 'st.sockets[socket].card = id; st.shown = read(st);']]],
  ['the bridge setting has no effect', 'act', [["_bridgeOn: function () { return this._setting('bridge') === 'on'; },", '_bridgeOn: function () { return false; },']]],
  ['de bridge = weil', 'data', [['"because": "denn"', '"because": "weil"']]],
  ['nl bridge = omdat', 'data', [['"because": "want"', '"because": "omdat"']]],
  ['sv bridge = eftersom', 'data', [['"because": "för"', '"because": "eftersom"']]],
  ['the reshuffle repeats the previous order', 'core', [["if (!prev || prev.join() !== c.join()) return c;", 'return c;']]],
  /* the rest */
  ['the evaluative tell comes back', 'data', [['"S": "Kids need twenty minutes of reading every single day."', '"S": "Twenty minutes of reading a day is right for kids."'], ['"S": "kids need twenty minutes of reading every single day."', '"S": "twenty minutes of reading a day is right for kids."'], ['"S": "Every dog gets a long walk each and every day."', '"S": "A walk every single day is right for every dog."'], ['"S": "every dog gets a long walk each and every day."', '"S": "a walk every single day is right for every dog."']]],
  ['a kept point edited (de)', 'data', [['"p": "Unsere Stadt sollte einen neuen Park bauen."', '"p": "Unsere Stadt braucht einen neuen Park."']]],
  ['Level 1 never meets R2', 'core', [["mod(pass, 2) ? 'R2' : 'R1'", "'R1'"]]],
  ['Level 2 with a bare sign counts as a miss', 'core', [["if (st.level === 'two' && st.sockets.some(function (s) { return !s.card; })) return { result: 'empty', key: 'hintEmpty2' };", '']]],
  ['miss 2 never helps', 'core', [['st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = false;']]],
  ['a tide after done counts again', 'core', [["if (st.done) return { result: 'no' };", '']]],
  ['the French elision is dropped', 'act', [["if (this._loc() === 'fr' && /^[aeiouyhàâéèêîôû]/i.test(b)) return ['parce qu’', b];", '']]],
  ['a German noun loses its capital after denn', 'data', [['"b": { "R1": "tägliches Lesen macht das Gehirn stark.", "R2": "Kinder lernen', '"b": { "R1": "tägliches Lesen macht das Gehirn stark.", "R2": "kinder lernen']]],
  ['a locale loses a hint', 'act', [['"fi":"Tuo kortti kertoo jostain muusta. Mikä kortti kertoo MIKSI?"', '"fi":""']]],
  ['the French display spacing is dropped', 'act', [[".replace(/ ([!?:;»])/g, ' $1')", '']]],
  ['Next waits for a reading time', 'act', [['OK_MS: 500, FAST', 'OK_MS: 3000, FAST']]],
  ['the row points at the old template', 'man', [['"task_template": "reason-sign"', '"task_template": "pearl-opinion-page"']]],
  ['the row keeps the old rounds', 'man', [['"params": {}', '"params": {"rounds": []}']]]
];
for (const [name, file, eds] of M) for (const [a] of eds) if (read(FILES[file]).indexOf(a) < 0) throw new Error('needle gone: ' + name + ' :: ' + a.slice(0, 70));
const ONLY = (process.argv.find((x) => x.startsWith('--only=')) || '').slice(7);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rs-mut-'));
const write = (name, file, eds) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (k === file) for (const [a, b] of eds) t = t.replace(a, b); out[k] = path.join(tmp, name.replace(/\W+/g, '_').slice(0, 50) + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
const run = (f) => new Promise((res) => {
  const p = spawn(process.execPath, [path.join(__dirname, 'verify-reason-sign-core.js')], { env: Object.assign({}, process.env, { RS_CORE: f.core, RS_DATA: f.data, RS_ACT: f.act, RS_MAN: f.man }) });
  let out = ''; p.stdout.on('data', (d) => { out += d; }); p.stderr.on('data', (d) => { out += d; });
  const timer = setTimeout(() => p.kill(), 30000);
  p.on('close', (code) => { clearTimeout(timer); res({ status: code, out }); });
});
(async () => {
  const jobs = [['control (whitespace)', 'core', [["'use strict';", "'use strict';  "]]]].concat(M.filter(([n]) => !ONLY || ONLY.split('|').some((o) => n.includes(o))));
  const results = new Array(jobs.length); let next = 0;
  const worker = async () => { while (next < jobs.length) { const i = next++; results[i] = await run(write(jobs[i][0], jobs[i][1], jobs[i][2])); } };
  await Promise.all([worker(), worker(), worker(), worker()]);
  const control = results[0]; let killed = 0;
  console.log((control.status === 0 ? 'ok  ' : 'FAIL') + ' control (whitespace) survives');
  for (let i = 1; i < jobs.length; i++) {
    const r = results[i], dead = r.status !== 0; if (dead) killed++;
    const why = r.out.split('\n').find((x) => /FAIL|Error/.test(x)) || '';
    console.log((dead ? 'killed  ' : 'SURVIVED') + ' ' + jobs[i][0] + (dead ? '   ← ' + why.trim().slice(0, 110) : ''));
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`mutate-reason-sign: ${killed}/${jobs.length - 1} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
  process.exit(killed === jobs.length - 1 && control.status === 0 ? 0 : 1);
})();
