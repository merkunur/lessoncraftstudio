#!/usr/bin/env node
/* =====================================================================
   mutate-harbor-machines.js — proves verify-harbor-machines-core.js can
   fail (ACTIVITY #174, The Harbor Post). Each mutation breaks the core,
   the notes, the activity or the manifest in one way a real bug would
   (the design's §12 list first); the gate must reject every one. A
   control (whitespace) must pass. A needle no longer in its file THROWS.
   Usage: node scripts/mutate-harbor-machines.js [--only=<name part>|…]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawn } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'harbor-machines-core.js'), data: path.join(MINI, 'harbor-machines-data.js'), act: path.join(MINI, 'author-purpose-activity.js'), man: path.join(MINI, 'author-purpose-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['a story note runs the lighthouse', 'data', [['{"t":"Pip the puppy chased his tail round and round.","r":"story"},{"t":"He spun so fast he flopped into the leaves!","r":"story"}', '{"t":"Pip the puppy chased his tail round and round.","r":"fact"},{"t":"He spun so fast he flopped into the leaves!","r":"fact"}']]],
  ['the snails note runs the crane', 'data', [['{"t":"Snails carry their shells everywhere they go.","r":"fact"}', '{"t":"Snails carry their shells everywhere they go.","r":"step"}']]],
  ['the caterpillar lifts crates for first/then/last', 'data', [['{"t":"First, a caterpillar eats and eats.","r":"fact"},{"t":"Then it makes a hard case around itself.","r":"fact"}', '{"t":"First, a caterpillar eats and eats.","r":"step"},{"t":"Then it makes a hard case around itself.","r":"step"}']]],
  ['a machine runs with exactly half', 'core', [['runs: powered.length * 2 > note.s.length', 'runs: powered.length * 2 >= note.s.length']]],
  ['the miss shapes in the wrong machine', 'core', [["var ROLE_OF = { inform: 'fact', entertain: 'story', instruct: 'step' };", "var ROLE_OF = { inform: 'fact', entertain: 'step', instruct: 'story' };"]]],
  ['the machines shuffled', 'core', [["var MACHINES = ['inform', 'entertain', 'instruct'];", "var MACHINES = ['entertain', 'inform', 'instruct'];"]]],
  ['a kept note edited (de)', 'data', [['"Eulen schlafen am Tag und jagen in der Nacht."', '"Eulen schlafen tagsüber und jagen in der Nacht."']]],
  ['a level made only of kept notes', 'core', [["first: ['i1', 'i2', 'i7', 'i8', 'e1', 'e2', 'e7', 'e8', 's2', 's3', 's7', 's8'],", "first: ['i1', 'i2', 'i3', 'i1', 'e1', 'e2', 'e3', 'e1', 's1', 's2', 's3', 's2'],"]]],
  ['two-machine mode still shows the crane', 'core', [["return machinesOf(m) === 'two' ? MACHINES.slice(0, 2) : MACHINES.slice();", 'return MACHINES.slice();']]],
  ['the reshuffle repeats the previous order', 'core', [['if (prev && prev.join() === c.join()) continue;', '']]],
  ['the reshuffle allows three of a purpose in a row', 'core', [['if (threeInARow(c, pool)) continue;', '']]],
  /* the rest */
  ['miss 2 never helps', 'core', [['st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = false;']]],
  ['a post after done counts again', 'core', [["if (st.done) return { result: 'no' };", '']]],
  ['a cue-breaker loses its "!" (fr)', 'data', [['"La pieuvre a trois cœurs !"', '"La pieuvre a trois cœurs."']]],
  ['a hook in the middle of a note', 'data', [['{"t":"Look under a wet leaf to find one!","r":"step"}', '{"t":"Look under a wet leaf to find one!","r":"none"}']]],
  ['two notes share a success line (sv)', 'data', [['"w":"Författaren ville berätta en rolig historia om valpen Pip."', '"w":"Författaren ville berätta en rolig historia om en tokig groda."']]],
  ['the one/none miss hints swapped', 'act', [["'hintOne' : 'hintNone'", "'hintNone' : 'hintOne'"]]],
  ['a locale loses a hint', 'act', [['"fi":"Vain yksi lause saa tämän koneen käyntiin. Katso lapun kuvioita."', '"fi":""']]],
  ['the French spacing is dropped', 'act', [[".replace(/ ([!?:;»])/g, ' $1')", '']]],
  ['Next waits for a reading time', 'act', [['OK_MS: 500, FAST', 'OK_MS: 3000, FAST']]],
  ['the row points at the old template', 'man', [['"task_template": "harbor-machines"', '"task_template": "author-purpose"']]]
];
for (const [name, file, eds] of M) for (const [a] of eds) if (read(FILES[file]).indexOf(a) < 0) throw new Error('needle gone: ' + name + ' :: ' + a.slice(0, 60));
const ONLY = (process.argv.find((x) => x.startsWith('--only=')) || '').slice(7);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hm-mut-'));
const write = (name, file, eds) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (k === file) for (const [a, b] of eds) t = t.replace(a, b); out[k] = path.join(tmp, name.replace(/\W+/g, '_').slice(0, 50) + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
const run = (f) => new Promise((res) => {
  const p = spawn(process.execPath, [path.join(__dirname, 'verify-harbor-machines-core.js')], { env: Object.assign({}, process.env, { HM_CORE: f.core, HM_DATA: f.data, HM_ACT: f.act, HM_MAN: f.man }) });
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
  console.log(`mutate-harbor-machines: ${killed}/${jobs.length - 1} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
  process.exit(killed === jobs.length - 1 && control.status === 0 ? 0 : 1);
})();
