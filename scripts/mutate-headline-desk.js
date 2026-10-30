#!/usr/bin/env node
/* =====================================================================
   mutate-headline-desk.js — proves verify-headline-desk-core.js can fail
   (ACTIVITY #173, Marina's Headline Desk). Each mutation breaks the core,
   the texts, the activity or the manifest in one way a real bug would
   (the design's §12 list first); the gate must reject every one. A
   control (whitespace) must pass. A needle no longer in its file THROWS.
   A mutation may need several edits (a list of [needle, replacement]).
   Usage: node scripts/mutate-headline-desk.js [--only=<name part>|…]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawn } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'headline-desk-core.js'), data: path.join(MINI, 'headline-desk-data.js'), act: path.join(MINI, 'marina-headline-desk-activity.js'), man: path.join(MINI, 'marina-headline-desk-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['a detail staples every strip', 'core', [["{ role: 'detail', text: a.detail[0], covers: [a.detail[1]] }", "{ role: 'detail', text: a.detail[0], covers: [0, 1, 2] }"]]],
  ['a neighbour staples one strip', 'core', [["{ role: 'neighbour', text: a.neighbour, covers: [] }, { role: 'fourth', text: a.fourth[0], covers: [a.fourth[1]] }] };\n    });\n    if (level === 'two')", "{ role: 'neighbour', text: a.neighbour, covers: [0] }, { role: 'fourth', text: a.fourth[0], covers: [a.fourth[1]] }] };\n    });\n    if (level === 'two')"]]],
  ['the paragraph card staples the whole Level 2 article', 'core', [["covers: a.para[1] ? [2, 3] : [0, 1] }", "covers: [0, 1, 2, 3] }"]]],
  ['Level 3 accepts the other paragraph (no jam)', 'core', [['var inside = card.covers.every(function (i) { return r.target.indexOf(i) >= 0; });', 'var inside = true;']]],
  ['a neighbour shares no word with its article (de, outside the EN table)', 'data', [['"neighbour":"Gummistiefel für den Regen"', '"neighbour":"Drachen am windigen Strand"']]],
  ['topics start with a question word again (de)', 'data', [['"topic":"Bienen und ihr süßer Honig"', '"topic":"Wie Bienen ihren Honig machen"'], ['"topic":"Vom kleinen Ei zum Frosch"', '"topic":"Wie ein Frosch groß wird"'], ['"topic":"Wenn ein Vulkan ausbricht"', '"topic":"Warum ein Vulkan ausbricht"'], ['"topic":"Bücher aus der Bücherei leihen"', '"topic":"Wie wir Bücher ausleihen"']]],
  ['the right card always in slot 1', 'core', [['var slot = (SLOTS[level][ncards][k] - 1 + (pass || 0)) % ncards,', 'var slot = 0,']]],
  ['the stapler result survives a new card', 'core', [['st.slot = st.slot === i ? null : i; st.verdict = null; st.help = false; return true;', 'st.slot = st.slot === i ? null : i; st.help = false; return true;']]],
  ['the 4-card setting has no effect', 'core', [["function cardsOf(v) { return String(v) === '4' ? 4 : 3; }", 'function cardsOf(v) { return 3; }']]],
  ['the reshuffle repeats the previous order', 'core', [['if (!prev || prev.join() !== c.join()) return c;', 'return c;']]],
  ['a kept article sentence edited', 'data', [['"Sie fliegen von Blüte zu Blüte."', '"Sie fliegen von Blume zu Blume."']]],
  /* the rest */
  ['the detail and neighbour hints swapped', 'core', [["var HINT = { neighbour: 'hintNeighbour', detail: 'hintDetail',", "var HINT = { neighbour: 'hintDetail', detail: 'hintNeighbour',"]]],
  ['miss 2 never helps', 'core', [['st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = false;']]],
  ['a thread word missing from its strip', 'data', [['"hl":[["Bees"],["They"],["they"]]', '"hl":[["Bee"],["They"],["they"]]']]],
  ['a detail copied from its strip (de)', 'data', [['"detail":["Bienen fliegen zu vielen Blüten",1]', '"detail":["Sie fliegen von Blüte zu Blüte",1]']]],
  ['the whole-article card staples the yellow strips in Level 3', 'core', [["if (!inside || !card.covers.length) return", "if (!card.covers.length) return"]]],
  ['a locale loses a hint', 'act', [['"fi":"Mikään suikale ei kerro siitä. Lue suikaleet uudelleen."', '"fi":""']]],
  ['the slot tables lean on one slot', 'core', [["story: { 3: [1, 2, 3, 1, 3, 2, 2, 3],", "story: { 3: [1, 1, 3, 1, 3, 1, 2, 1],"]]],
  ['Next waits for a reading time', 'act', [['OK_MS: 500, FAST', 'OK_MS: 3000, FAST']]],
  ['the row points at the old engine', 'man', [['"tool": "marina-headline-desk-activity"', '"tool": "main-topic-activity"']]]
];
for (const [name, file, eds] of M) for (const [a] of eds) if (read(FILES[file]).indexOf(a) < 0) throw new Error('needle gone: ' + name + ' :: ' + a.slice(0, 50));
const ONLY = (process.argv.find((x) => x.startsWith('--only=')) || '').slice(7);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'hd-mut-'));
const write = (name, file, eds) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (k === file) for (const [a, b] of eds) t = t.replace(a, b); out[k] = path.join(tmp, name.replace(/\W+/g, '_').slice(0, 50) + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
const run = (f) => new Promise((res) => {
  const p = spawn(process.execPath, [path.join(__dirname, 'verify-headline-desk-core.js')], { env: Object.assign({}, process.env, { HD_CORE: f.core, HD_DATA: f.data, HD_ACT: f.act, HD_MAN: f.man }) });
  let out = ''; p.stdout.on('data', (d) => { out += d; }); p.stderr.on('data', (d) => { out += d; });
  const timer = setTimeout(() => p.kill(), 300000);
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
  console.log(`mutate-headline-desk: ${killed}/${jobs.length - 1} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
  process.exit(killed === jobs.length - 1 && control.status === 0 ? 0 : 1);
})();
