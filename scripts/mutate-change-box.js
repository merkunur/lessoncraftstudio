#!/usr/bin/env node
/* =====================================================================
   mutate-change-box.js — proves verify-change-box-core.js can fail
   (ACTIVITY #166, The Change Box). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-change-box.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'change-box-core.js'), act: path.join(MINI, 'change-box-activity.js'), man: path.join(MINI, 'money-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ["a running total of Pip's share always shown", 'act', "_live: function () { return ChangeBoxCore.countOf(this._setting('count')) === 'live'; },", "_live: function () { return true; },"],
  ['a pile that does not sum to the payment', 'core', 'USD: [CH(70, [N(100)], [25, 25, 25, 10, 10, 5]),', 'USD: [CH(70, [N(100)], [25, 25, 25, 10, 10, 10]),'],
  ['change checked as tray = price', 'core', 'var why = null, p = pip(st);', "var why = null, p = (k === 'more' || k === 'enough') ? pip(st) : sum(vals(st, 'tray'));"],
  ['Pip counts coins, not worth', 'core', 'function pip(st) { return sum(pipVals(st)); }', 'function pip(st) { return pipVals(st).length; }'],
  ['the basket checked against the first tag only', 'core', 'price: tags.reduce(function (a, b) { return a + b; }, 0),', 'price: tags[0],'],
  ['enough always yes', 'core', "function enoughAnswer(r) { return sum(r.purse) >= r.price ? 'yes' : 'no'; }", "function enoughAnswer(r) { return 'yes'; }"],
  ['nl/fi coins with 1 c and 2 c', 'core', 'EURR: EUR.filter(function (c) { return c.v >= 5; }),', 'EURR: EUR.slice(),'],
  ['the SEK 50-pile with a 20 kr coin', 'core', "fam === 'SEK' ? [10, 10, 10, 10, 5, 2, 2, 1]", "fam === 'SEK' ? [20, 10, 10, 5, 2, 2, 1]"],
  ['en coins without numerals', 'act', "    o += '<text", "    if (loc !== 'en') o += '<text"],
  /* the rest of the model */
  ['the count-up starts from 0, not the price', 'core', "return { start: r.price, ids: ids, steps: count(ix ? ix.map(function (i) { return pileC[i].v; }) : [], r.price), end: paid(r) };", "return { start: 0, ids: ids, steps: count(ix ? ix.map(function (i) { return pileC[i].v; }) : [], 0), end: paid(r) };"],
  ['Check again unchanged counts a miss', 'core', "if (st.verdict) return { result: 'note', key: 'hintAgain' };", ''],
  ['an empty tray is checked as a miss', 'core', "if ((k === 'change' || k === 'basket') && !where(st, 'tray').length) return { result: 'note', key: 'hintTrayEmpty' };", ''],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['coins may be added in a change round', 'core', "if (st.done || st.round.kind !== 'more' || kinds(st.fam).indexOf(v) < 0) return null;", "if (st.done || kinds(st.fam).indexOf(v) < 0) return null;"],
  ['the reshuffle repeats the previous order', 'core', 'return !prev || prev.join() !== c.join(); };', 'return true; };'],
  ['two single-coin rounds may sit side by side', 'core', 'if (singleCoin(pool[c[i]]) && singleCoin(pool[c[i - 1]])) return false;', ''],
  ['a level-1 change drifts from the design', 'core', 'CH(16, [K(20)], [10, 5, 2, 2, 1]), CH(14, [K(20)], [10, 5, 2, 2, 1]), CH(12, [K(20)], [10, 5, 2, 2, 1]),', 'CH(16, [K(20)], [10, 5, 2, 2, 1]), CH(13, [K(20)], [10, 5, 2, 2, 1]), CH(12, [K(20)], [10, 5, 2, 2, 1]),'],
  ['the enough count-up starts at 0', 'act', "start: st.round.kind === 'enough' ? null : U.start,", 'start: U.start,'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['da writes kr..', 'act', ".replace(/kr\\.\\./g, 'kr.')", ''],
  ['it/pt split without «e»', 'act', "((l === 'it' || l === 'pt') ? ' e ' : nb)", 'nb'],
  ['the pt decimal written as euros', 'act', "(l === 'pt' ? 'R$ ' + d : l === 'nl' ? '€ ' + d : d + ' €')", "(l === 'nl' ? '€ ' + d : d + ' €')"],
  ["Pip's empty dish written as «0»", 'act', "if ((key === 'hintShort' || key === 'hintBasketShort') && C.pip(st) === 0) key = 'hintNothing';", ''],
  ['the row points at the old tool', 'man', '"tool": "change-box-activity"', '"tool": "money-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cb-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-change-box-core.js')], { env: Object.assign({}, process.env, { CB_CORE: files.core, CB_ACT: files.act, CB_MAN: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-change-box: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
