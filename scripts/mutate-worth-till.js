#!/usr/bin/env node
/* =====================================================================
   mutate-worth-till.js — proves verify-worth-till-core.js can fail
   (ACTIVITY #164, The Worth Till). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-worth-till.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'worth-till-core.js'), act: path.join(MINI, 'worth-till-activity.js'), man: path.join(MINI, 'coin-stall-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['a cup accepting by size, not worth', 'core', 'if (c.v !== cupV) {', 'if (Math.abs(coin(st.fam, c.v).d - coin(st.fam, cupV).d) > 1.5 && c.v !== cupV) {'],
  ['the US coins drawn without their numeral', 'act', "o += '<text x=\"50\" y=\"' + (c.hole ? 36 : 50)", "if (loc !== 'en') o += '<text x=\"50\" y=\"' + (c.hole ? 36 : 50)"],
  ['nl/fi get the 1 c coin back', 'core', "EURR: { cups: [5, 10, 20, 50], coins: EUR },", "EURR: { cups: [1, 5, 10, 20, 50], coins: EUR },"],
  ['the enough rounds all yes (the old en)', 'core', "[60, [25, 10, 10, 10, 1, 1, 1]]", "[60, [25, 25, 10, 10, 1, 1, 1]]"],
  ['a trade purse holding the offered coin', 'core', "P('trade', 25, [10, 10, 5, 5, 1, 10, 5, 1])", "P('trade', 25, [10, 10, 5, 5, 1, 25, 5, 1])"],
  ['fewest accepting more coins', 'core', "else if (k === 'fewest' && p.length > fewest(r.price, r.purse).length) why = 'fewer';", ''],
  ['the parade ordered as dropped, not by worth', 'core', 'return desc(vals).map(function (v) { t += v; return { v: v, run: t }; });', 'return vals.map(function (v) { t += v; return { v: v, run: t }; });'],
  ['change checked as tray = price', 'core', 'want = r.paid - r.price;', 'want = r.price;'],
  ['running totals shown on miss 1', 'act', 'nums = v.rail >= 2', 'nums = v.rail >= 1'],
  ['a coin target below 44 px', 'act', "b.style.width = Math.max(44, px) + 'px'; b.style.height = Math.max(44, px) + 'px';", "b.style.width = px + 'px'; b.style.height = px + 'px';"],
  /* the rest of the model */
  ['the till lays cups smallest first', 'core', 'function cups(fam) { return desc(MONEY[fam].cups); }', 'function cups(fam) { return MONEY[fam].cups.slice(); }'],
  ['the dime drawn as big as the nickel', 'core', "C(10, 17.91, 'silver', { reeded: true })", "C(10, 21.21, 'silver', { reeded: true })"],
  ['no lid on the trade cup', 'core', "function lidded(st, v) { return st.round.kind === 'trade' && st.round.price === v; }", 'function lidded(st, v) { return false; }'],
  ['a second bounce shows no ghost', 'core', 'ghost: st.bounces[id] >= 2', 'ghost: st.bounces[id] >= 3'],
  ['a two-ways round accepts Pip\'s own way', 'core', "else if (k === 'two' && sameMultiset(p, r.shown)) why = 'same';", ''],
  ['Check again unchanged counts a miss', 'core', "if (st.verdict) return { result: 'note', key: 'hintAgain' };", ''],
  ['unsorted coins still graded', 'core', "if (k === 'count' && at(st, 'counter').length) return { result: 'note', key: 'hintSortFirst' };", ''],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;', 'st.misses++; st.help = st.misses >= 3;'],
  ['the purse answer ignores the side', 'core', "if (k === 'purse') side = st.choice === 'left' ? (st.side ? 'b' : 'a') : (st.side ? 'a' : 'b');", "if (k === 'purse') side = st.choice === 'left' ? 'a' : 'b';"],
  ['the purse side never drawn', 'act', 'Math.random() < 0.5 ? 1 : 0', '0'],
  ['the two purse rounds may sit side by side', 'core', "if (pool[c[i]].kind === 'purse' && pool[c[i - 1]].kind === 'purse') return false;", ''],
  ['the reshuffle repeats the previous order', 'core', 'return !prev || prev.join() !== c.join(); };', 'return true; };'],
  ['a count round table drifts', 'core', "[25, 10, 5, 1], cat(X(2, 25), [10], X(2, 5), X(2, 1))", "[25, 10, 5, 5], cat(X(2, 25), [10], X(2, 5), X(2, 1))"],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['da writes kr..', 'act', ".replace(/kr\\.\\./g, 'kr.')", ''],
  ['the instruction claims a line-up after every Check', 'act', '"en":"Put each coin in the till cup for what it is worth: a cup takes only its own coin, and the wrong coin bounces back. Then count the money, pay Pip, give change, or find the purse that holds more. After a miss, Check lines the money up, the coin worth the most first."', '"en":"Put each coin in the till cup for what it is worth: a cup takes only its own coin, and the wrong coin bounces back. Then count the money, pay Pip, give change, or find the purse that holds more. Check shows the money lined up, the coin worth the most first."'],
  ['the row points at the old tool', 'man', '"tool": "worth-till-activity"', '"tool": "coin-stall-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wt-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-worth-till-core.js')], { env: Object.assign({}, process.env, { WT_CORE: files.core, WT_ACT: files.act, WT_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-worth-till: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
