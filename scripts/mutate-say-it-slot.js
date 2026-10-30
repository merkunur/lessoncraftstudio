#!/usr/bin/env node
/* =====================================================================
   mutate-say-it-slot.js — proves verify-say-it-slot-core.js can fail
   (ACTIVITY #165, The Say-It Slot). Each mutation breaks the core, the
   activity or the manifest in one way a real bug would (the design's §12
   list first); the gate must reject every one. A control (whitespace)
   must pass. A needle no longer in its file THROWS. Needles are matched
   after collapsing \r\n.
   Usage: node scripts/mutate-say-it-slot.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'say-it-slot-core.js'), act: path.join(MINI, 'say-it-slot-activity.js'), man: path.join(MINI, 'money-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['the counter auto-advances when a coin is picked up (a running total)', 'act', "v.sel = v.sel === id ? null : id; v.said = null;", "v.sel = v.sel === id ? null : id; v.said = null; st.counter = SayItSlotCore.inBox(st) + c.v;"],
  ['drop accepts counter >= box + coin', 'core', 'if (st.counter !== want) {', 'if (st.counter < want) {'],
  ['the counter may pass the price pin', 'core', "if (nv > maxCounter(st)) return 'pin';", "if (nv > maxCounter(st) + 10) return 'pin';"],
  ['the counter may go below the box', 'core', "if (nv < inBox(st)) return 'floor';", "if (nv < 0) return 'floor';"],
  ["a spit leaves the child's wrong number on the wheels", 'core', 'st.misses[id] = (st.misses[id] || 0) + 1; st.missTotal++;\n      st.counter = has;', 'st.misses[id] = (st.misses[id] || 0) + 1; st.missTotal++;'],
  ['success on counter = price without the coins', 'core', "st.counter = nv; return 'ok';", "st.counter = nv; if (st.round.price && nv === st.round.price) st.done = true; return 'ok';"],
  ['the lever gives back the first coin, not the last', 'core', 'var id = st.box.pop(), c = byId(st, id); st.said.pop();', 'var id = st.box.shift(), c = byId(st, id); st.said.pop();'],
  ['stranding never fires', 'core', 'if (!canFinish(st)) { st.stranded++;', 'if (false) { st.stranded++;'],
  ['the fewest level accepts a longer exact set', 'core', 'st.box.length > fewestNeed(st)', 'st.box.length > 99'],
  ['the cloth is not shuffled', 'core', "else shuffle(r.purse.slice(), rnd).forEach(function (v) { add(v, 'cloth'); });", "else desc(r.purse).forEach(function (v) { add(v, 'cloth'); });"],
  ['nl/fi get the 1 c coin back', 'core', 'EURR: EUR.filter(function (c) { return c.v >= 5; }),', 'EURR: EUR.slice(),'],
  ['sv gets a 20 kr coin', 'core', "SEK: [C(1, 19.5, 'silver'), C(2, 22.5, 'silver'), C(5, 23.75, 'gold'), C(10, 20.5, 'gold')],", "SEK: [C(1, 19.5, 'silver'), C(2, 22.5, 'silver'), C(5, 23.75, 'gold'), C(10, 20.5, 'gold'), C(20, 25, 'gold')],"],
  ['pt gets a 1-centavo coin', 'core', "BRL: [C(5, 22, 'copper'),", "BRL: [C(1, 17, 'copper'), C(5, 22, 'copper'),"],
  ['the US coins drawn without their numeral', 'act', "o += '<text x=\"50\" y=\"' + (c.hole ? 23", "if (loc !== 'en') o += '<text x=\"50\" y=\"' + (c.hole ? 23"],
  ['compare R8 swapped to more-coins-lose', 'core', 'K(cat(X(8, 1), [5, 5]), [10, 10]), K([10, 10, 10], [25])],\n    EURF', 'K(cat(X(8, 1), [5, 5]), [10, 10]), K([10, 10], [25])],\n    EURF'],
  ['endless mode uses up its coins', 'core', "if (c.at === 'supply') { inC =", 'if (false) { inC ='],
  ['the miss-2 count-on leaves the wheels on the answer', 'act', 'this._later(function () { v.show = null; if (self._wrap) self._paint(); }, this.FAST ? 10 : 350 * (steps.length + 2));', 'v.show = steps[steps.length - 1];'],
  /* the rest of the model */
  ['a too-big coin is not stopped at the pin', 'core', "if (want > maxCounter(st)) return { result: 'tooBig' };", ''],
  ['miss 2 never shows the count-on', 'act', 'if (res.miss >= 2) {', 'if (res.miss >= 3) {'],
  ['the count-on says the five before the tens', 'core', 'while (rest >= 10) { t += 10; rest -= 10; out.push(t); }\n    if (rest >= 5) { t += 5; rest -= 5; out.push(t); }', 'if (rest % 10 >= 5) { t += 5; rest -= 5; out.push(t); }\n    while (rest >= 10) { t += 10; rest -= 10; out.push(t); }'],
  ['the other tray may be counted in between', 'core', "if (st.active && c.at !== 'tray-' + st.active && (c.at === 'tray-a' || c.at === 'tray-b')) return { result: 'otherTray' };", ''],
  ["the top-up counter starts at 0, not at Pip's coins", 'core', 'st.counter = inBox(st);\n    return st;', 'st.counter = 0;\n    return st;'],
  ['the two compare rounds may sit side by side', 'core', "if (pool[c[i]].kind === 'compare' && pool[c[i - 1]].kind === 'compare') return false;", ''],
  ['the reshuffle repeats the previous order', 'core', 'return !prev || prev.join() !== c.join(); };', 'return true; };'],
  ['the wrong compare pick still wins', 'core', 'if (st.pick === answer(st.round)) st.done = true; else st.compareMiss = true;', 'st.done = true;'],
  ['a level-1 table drifts from the design', 'core', '[26, [25, 10, 10, 5, 1]]', '[26, [25, 10, 5, 5, 1]]'],
  ['Next waits for a reading time', 'act', 'OK_MS: 500, FAST', 'OK_MS: 3000, FAST'],
  ['da writes kr..', 'act', ".replace(/kr\\.\\./g, 'kr.')", ''],
  ['the split form drops «e» in it', 'act', "(l === 'it' ? ' e ' : nb)", 'nb'],
  ['the success line drops the chain', 'act', "chain: st.said.map(function (x) { return self._money(x); }).join(', ')", "chain: ''"],
  ['«more coins is not always more money» told after every wrong pick', 'act', "return mine.length > other.length ? 'hintCompare' : 'hintCompareMoney';", "return 'hintCompare';"],
  ['the Coins setting waits for the next round', 'act', "'.' + this._level() + '.' + this._mode(); },", "'.' + this._level(); },"],
  ['the row points at the old tool', 'man', '"tool": "say-it-slot-activity"', '"tool": "money-activity"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sis-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-say-it-slot-core.js')], { env: Object.assign({}, process.env, { SIS_CORE: files.core, SIS_ACT: files.act, SIS_MAN: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-say-it-slot: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
