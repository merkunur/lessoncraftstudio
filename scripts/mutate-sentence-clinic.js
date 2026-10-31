#!/usr/bin/env node
/* =====================================================================
   mutate-sentence-clinic.js — proves verify-sentence-clinic-core.js can
   fail (ACTIVITY #176, Dr. Plume's Sentence Clinic). Each mutation breaks
   the core, the patients, the activity or the manifest in one way a real
   bug would (the design's §12 list first); the gate must reject every
   one. A control (whitespace) must pass. A needle no longer in its file
   THROWS.
   Usage: node scripts/mutate-sentence-clinic.js [--only=<name part>|…]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawn } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'sentence-clinic-core.js'), data: path.join(MINI, 'sentence-clinic-data.js'), act: path.join(MINI, 'sentence-clinic-activity.js'), man: path.join(MINI, 'sentence-clinic-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['any mark is accepted', 'core', [['if (m === want) return', 'if (m) return']]],
  ['a stop in any gap cures', 'core', [["} else if (m || st.cuts[g]) ev.push({ type: 'sag', at: g });", '}']]],
  ['the auto-capital after a stop is dropped', 'core', [['var start = i === 0 || st.marks[i - 1];', 'var start = i === 0;']]],
  ['a capital the child "should" make is graded (the seam word arrives capitalised)', 'data', [['"tokens":["I","am","hungry","can","we","eat","now"]', '"tokens":["I","am","hungry","Can","we","eat","now"]']]],
  ['the tune shows before Check by default', 'act', [["defaults: { level: 'two', line: 'check' },", "defaults: { level: 'two', line: 'first' },"]]],
  ['es loses its ¿', 'core', [["if (loc === 'es' && (s.mark === '?' || s.mark === '!'))", "if (false && loc === 'es' && (s.mark === '?' || s.mark === '!'))"]]],
  ['a second valid form among the options', 'data', [['"options":["runs","running","to run"]', '"options":["runs","ran","to run"]']]],
  ['a reorder with two right orders (Is the bus big?)', 'data', [['"words":["home","runs","dog","The"]', '"words":["big","The","is","bus"]'], ['"cured":["The","dog","runs","home"]', '"cured":["The","bus","is","big"]']]],
  ['a move grades before Check', 'core', [['st.marks[g] = m; delete st.cuts[g]; }\n    st.shown = null; return true;', 'st.marks[g] = m; delete st.cuts[g]; }\n    st.shown = listen(st); return true;']]],
  ['the frozen miss marks stay after a new move', 'act', [["if (changed) { this._clearShown(); this.api.sound(t === 'cut' ? 260 : 420); }", "if (changed) { this.api.sound(t === 'cut' ? 260 : 420); }"]]],
  ['the reshuffle repeats the previous order', 'core', [['for (var t = 0; t < 200; t++) { var c = shuffle(range(n), rnd); if (!prev || prev.join() !== c.join()) return c; }', 'for (var t = 0; t < 200; t++) { var c = shuffle(range(n), rnd); return c; }']]],
  /* the rest */
  ['Level 1 takes a mark at any gap', 'core', [["if (st.level === 'one') return r.units.map(function (u) { return u.to; });", "if (st.level === 'one') return range(r.tokens.length);"]]],
  ['Level 1 takes "!"', 'core', [["function canMark(st, m) { return st.level === 'three' || m === '.' || m === '?'; }", 'function canMark(st, m) { return true; }']]],
  ['a missing seam does not knot', 'core', [["if (!m) return { type: last ? 'runoff' : 'knot', at: at, want: want };", "if (!m) return { type: 'runoff', at: at, want: want };"]]],
  ['scissors alone cure the seam', 'core', [["if (!m && st.cuts[g]) ev.push({ type: 'runoff', at: g, want: endOf[g], cut: true });", "if (!m && st.cuts[g]) ev.push({ type: 'rest', at: g });"]]],
  ['a missing word leaves no flat gap', 'core', [["ev.push({ type: 'flatgap', at: i - 1 });", "ev.push({ type: 'offkey', at: i });"]]],
  ['an extra word does not double-beat', 'core', [["ev.push({ type: 'doublebeat', at: i });", "ev.push({ type: 'offkey', at: i });"]]],
  ['the knot is mended by a mark, not the scissors', 'core', [["if (e.type === 'knot') return st.level === 'two' ? 'cut' : e.want;", "if (e.type === 'knot') return e.want;"]]],
  ['the sag comes before the knot', 'core', [["return hard[0] || t[0] || null;", 'return t[0] || null;']]],
  ['miss 2 never helps', 'core', [['st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = false;']]],
  ['fr loses the narrow space before ?', 'core', [["t += (loc === 'fr' && (s.mark === '?' || s.mark === '!') ? NNBSP : '') + s.mark;", 't += s.mark;']]],
  ['a Level 1 card loses a question (the pattern repeats)', 'data', [['{"from":4,"to":7,"tune":"A"},{"from":8,"to":11,"tune":"T"}', '{"from":4,"to":7,"tune":"T"},{"from":8,"to":11,"tune":"T"}']]],
  ['a kept round edited (de)', 'data', [['"cured":["Die","Katze","trinkt","Milch"]', '"cured":["Die","Katze","mag","Milch"]']]],
  ['a locale loses a hint', 'act', [['"fi":"Tässä on kaksi ajatusta puristettu yhteen. Mihin ensimmäinen loppuu?"', '"fi":""']]],
  ['Next waits for a reading time', 'act', [['OK_MS: 500, FAST', 'OK_MS: 3000, FAST']]],
  ['the row points at the old template', 'man', [['"task_template": "listening-line"', '"task_template": "fix-it"']]]
];
for (const [name, file, eds] of M) for (const [a] of eds) if (read(FILES[file]).indexOf(a) < 0) throw new Error('needle gone: ' + name + ' :: ' + a.slice(0, 70));
const ONLY = (process.argv.find((x) => x.startsWith('--only=')) || '').slice(7);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sc-mut-'));
const write = (name, file, eds) => {
  const out = {};
  for (const k of Object.keys(FILES)) { let t = read(FILES[k]); if (k === file) for (const [a, b] of eds) t = t.replace(a, b); out[k] = path.join(tmp, name.replace(/\W+/g, '_').slice(0, 50) + '-' + path.basename(FILES[k])); fs.writeFileSync(out[k], t); }
  return out;
};
const run = (f) => new Promise((res) => {
  const p = spawn(process.execPath, [path.join(__dirname, 'verify-sentence-clinic-core.js')], { env: Object.assign({}, process.env, { SC_CORE: f.core, SC_DATA: f.data, SC_ACT: f.act, SC_MAN: f.man }) });
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
  console.log(`mutate-sentence-clinic: ${killed}/${jobs.length - 1} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
  process.exit(killed === jobs.length - 1 && control.status === 0 ? 0 : 1);
})();
