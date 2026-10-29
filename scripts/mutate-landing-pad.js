#!/usr/bin/env node
/* =====================================================================
   mutate-landing-pad.js — proves verify-landing-pad-core.js can fail
   (ACTIVITY #157, The Spring and the Landing Pad). Each mutation breaks
   the core, the activity or the manifest in one way a real bug would (the
   design's §12 list first); the gate must reject every one. A control
   (whitespace) must pass. A needle no longer in its file THROWS. Needles
   are matched after collapsing \r\n.
   Usage: node scripts/mutate-landing-pad.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const MINI = path.join(__dirname, '..', 'mini tools');
const FILES = { core: path.join(MINI, 'landing-pad-core.js'), act: path.join(MINI, 'landing-pad-activity.js'), man: path.join(MINI, 'hoppers-number-line-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  /* the design's list (§12) */
  ['an unchanged Let go counts a miss (no pad reminder)', 'core', "    if (st.verdict) return { result: 'note', key: st.verdict.kind === 'splash' ? 'hintMovePad' : 'hintSame' };", ''],
  ['the start stone counted as hop 1', 'core', 'var at = st.frogAt, stops = [at]', 'var at = st.frogAt - st.facing, stops = [at]'],
  ['facing ignored (always forward)', 'core', 'order.forEach(function (c) { at += st.facing * c; stops.push(at); });', 'order.forEach(function (c) { at += c; stops.push(at); });'],
  ['coils counted as 1 each', 'core', 'st.coils.forEach(function (c) { s += c; }); return s;', 'st.coils.forEach(function (c) { s += 1; }); return s;'],
  ['a self-consistent wrong build accepted', 'core', 'if (onPad && right) {', 'if (onPad) {'],
  ['a one-coil allowed on the tens line', 'core', "    if (c === 1 && st.round.step === 10) return false;\n", ''],
  ['the pad shows its number', 'act', "' data-pad=\"1\"');", "' data-pad=\"1\"') + '<text class=\"lp-num\">' + padV + '</text>';"],
  ['the hop count ignored', 'core', 'for (var h = 0; h < st.count; h++)', 'for (var h = 0; h < 1; h++)'],
  ['a division round accepts hops past the bank', 'core', 'var onPad = R.final === st.padAt, right = dirOk && sizeOk && countOk;', "var onPad = R.final === st.padAt || (r.kind === 'div' && R.final <= 0), right = dirOk && sizeOk && (countOk || (r.kind === 'div' && st.count > r.count));"],
  ['"some" labels draws every number', 'core', "r.level === '100' ? 5 : 2;", "r.level === '100' ? 5 : 1;"],
  ['the reshuffle repeats the previous order', 'core', 'if ((!prev || prev.join() !== c.join()) && runsOk(level, c)) return c;', 'if (runsOk(level, c)) return c;'],
  ['three rounds of one kind in a row', 'core', '&& runsOk(level, c)) return c;', ') return c;'],
  /* the rest of the model */
  ['Check with nothing counts a miss', 'core', "if (st.frogAt === null) return { result: 'note', key: 'hintFrog' };", "if (st.frogAt === null) { st.misses++; return { result: 'note', key: 'hintFrog' }; }"],
  ['a wrong start is not graded first', 'core', 'if (st.frogAt !== r.start) { st.misses++;', 'if (false) { st.misses++;'],
  ['miss 2 never helps', 'core', 'st.misses++; st.help = st.misses >= 2;\n    st.verdict = { kind: onPad', 'st.misses++; st.help = st.misses >= 3;\n    st.verdict = { kind: onPad'],
  ['a move keeps the old verdict', 'core', 'function clear(st) { if (!st.done) st.verdict = null; }', 'function clear(st) { }'],
  ['a division pad that can be moved', 'core', "if (st.done || r.kind === 'div') return false;", 'if (st.done) return false;'],
  ['the spring holds ten one-coils', 'core', '>= 9) return false;\n    st.coils.push(c);', '>= 10) return false;\n    st.coils.push(c);'],
  ['the wrong-start hint ignores the labels', 'core', "return labelled(st.round, st.round.start, every) ? 'hintStartFind' : 'hintStart';", "return 'hintStartFind';"],
  ['a round table drifts', 'core', '[[6, 8, 1], [16, 6, -1]', '[[6, 9, 1], [16, 6, -1]'],
  ['a tens-line hop that is not whole tens', 'core', '[0, 100, 10, 30, 40, 1]', '[0, 100, 10, 30, 45, 1]'],
  /* the review's finding: equal hops are drawn as hops */
  ['equal hops drawn one arc per coil', 'act', "_byHop: function (stops, per) { if (this.st.round.level !== 'eq' || !per) return stops;", '_byHop: function (stops, per) { return stops;'],
  ['the dotted path on a wrong start', 'act', "if (st.help && vk && vk !== 'start' && !anim)", 'if (st.help && vk && !anim)'],
  ['the one-coil button not shut on the tens line', 'act', 'bo.disabled = st.done || this._busy || r.step === 10;', 'bo.disabled = st.done || this._busy;'],
  /* strings */
  ['a locale without a string', 'act', '"fi":"Hyppää!"', '"fi":""'],
  ['a success line with a hyphen minus', 'act', '"en":"{s} − {n} = {e} — Hopper landed on {e}!"', '"en":"{s} - {n} = {e} — Hopper landed on {e}!"'],
  ['de multiplies with ×', 'act', 'Also {k} · {n} = {e}!', 'Also {k} × {n} = {e}!'],
  ['a story gives the landing away', 'act', '"en":"Hopper sits on {s}. He hops {n} forward. Where does he land?"', '"en":"Hopper sits on {s}. He hops {n} forward. Where does he land ({e})?"'],
  ['a hint names the hop count', 'act', '"en":"How many hops does the story say? Light that many hop marks."', '"en":"Light {k} hop marks."'],
  ['the word free in a string', 'act', '"en":"Let go!"', '"en":"Free go!"'],
  ['pt loses its mascot', 'act', '"pt":"O Saltão está no {s}. Ele pula {n} para frente.', '"pt":"O Hopper está no {s}. Ele pula {n} para frente.'],
  /* the manifest */
  ['the row still points at the old activity', 'man', '"tool": "landing-pad-activity"', '"tool": "hoppers-number-line-activity"'],
  ['a new locale without its title', 'man', '"fi": "Hopperin lukusuora – yhteen-', '"xx": "Hopperin lukusuora – yhteen-']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lp-mut-'));
const run = (files) => spawnSync(process.execPath, [path.join(__dirname, 'verify-landing-pad-core.js')], { env: Object.assign({}, process.env, { LP_CORE: files.core, LP_ACT: files.act, LP_MANIFEST: files.man }), encoding: 'utf8', timeout: 300000 });
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
console.log(`mutate-landing-pad: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
