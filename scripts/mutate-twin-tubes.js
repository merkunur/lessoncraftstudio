#!/usr/bin/env node
/* =====================================================================
   mutate-twin-tubes.js — proves verify-twin-tubes-core.js can fail (ACTIVITY #142, The Twin Tubes).
   Each mutation breaks the core, the activity or the data in one way a
   real bug would; the gate must reject every one. A control (a harmless
   whitespace change) must pass. A needle that is no longer in the file
   THROWS — a dropped mutation would shrink the count while the run still
   said "every mutation killed".
   Usage: node scripts/mutate-twin-tubes.js
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const FILES = { core: path.join(MINI, 'twin-tubes-core.js'), act: path.join(MINI, 'twin-tubes-activity.js'), man: path.join(MINI, 'match-pairs-activities.json') };
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const M = [
  ['a word card pours its places in number order, not word order', 'core', "card.parts.forEach(function (c) { c.places.forEach(function (p) { amt[p] = card.digits[p]; order.push(p); }); }); return { amt: amt, order: order };", "card.parts.forEach(function (c) { c.places.forEach(function (p) { amt[p] = card.digits[p]; order.push(p); }); }); return { amt: amt, order: order.sort() };"],
  ['the ones word found inside the tens word', 'core', "ow = tw && locate(R, words(d[2]), tw);", "ow = tw && locate(R, words(d[2]));"],
  ['a word chunk that drops a letter', 'core', "out.push({ text: R.slice(p.at, p.at + p.len), places: p.places }); pos = p.at + p.len;", "out.push({ text: R.slice(p.at, p.at + p.len - 1), places: p.places }); pos = p.at + p.len;"],
  ['a zero place pours into its tube', 'core', "if (d[1]) filled.push(1); if (d[2]) filled.push(2);", "filled.push(1); filled.push(2);"],
  ['a whole hundred in a round', 'core', "[305, 350, 530]", "[300, 350, 530]"],
  ['three different hundreds give the numbers away', 'core', "[247, 274, 427]", "[247, 374, 427]"],
  ['a zero in the plain set', 'core', "[613, 631, 316]", "[613, 631, 306]"],
  ['the expanded form writes the zero part', 'core', "if (d[1]) p.push(d[1] * 10);", "p.push(d[1] * 10);"],
  ['the bright digit worth its face value', 'core', "var lit = digitsOf(n).indexOf(dgt), val = dgt * [100, 10, 1][lit], vd = digitsOf(val);", "var lit = digitsOf(n).indexOf(dgt), val = dgt * [100, 10, 1][2 - lit], vd = digitsOf(val);"],
  ['the word card pours clear', 'core', "function frosted(card) { return card.kind === 'word' || card.kind === 'valword' || card.kind === 'lit'; }", "function frosted(card) { return card.kind === 'lit'; }"],
  ['a deal where a number keeps its column', 'core', "if (c[0] === c[1] && c[1] === c[2]) return false;", "if (c[0] === c[1] && c[1] === c[2] && false) return false;"],
  ['level compares only the hundreds', 'core', "function level(a, b) { return a.amt[0] === b.amt[0] && a.amt[1] === b.amt[1] && a.amt[2] === b.amt[2]; }", "function level(a, b) { return a.amt[0] === b.amt[0]; }"],
  ['a used card can go back in the stand', 'core', "else if (!card(st, id) || used(st, id)) return 'no';", "else if (!card(st, id)) return 'no';"],
  ['the same card twice in the stand', 'core', "if (isPlaced(st, id)) return 'no';", ""],
  ['miss 2 never helps', 'core', "st.misses++; st.help = st.misses >= 2;", "st.misses++; st.help = st.misses >= 3;"],
  ['a clear pair against a frosted card gives the count of the wrong card', 'core', "if (both) return ['diffH', 'diffT', 'diffO'][L.place];", "if (!none) return ['diffH', 'diffT', 'diffO'][L.place];"],
  ['a round finishes after two triples', 'core', "if (all) st.done = true;", "if (Object.keys(st.found).length >= 2) st.done = true;"],
  ['a pair pours its numeral, not the value it shows', 'core', 'pp = pourOf(card(st, st.found[key].ids[0])); return { amt: pp.amt,', 'pp = pourOf(card(st, st.found[key].ids[0])); return { amt: card(st, st.found[key].ids[0]).digits.slice(),'],
  ['the same order every pass', 'core', "var o = shuffle(ids, rnd); if (!prev || prev.join() !== o.join()) return { order: o };", "var o = ids.slice(); return { order: o };"],
  ['a digit in a hint', 'act', 'notT: {"en":"The tens are not the same."', 'notT: {"en":"The 10s are not the same."'],
  ['a zero count that breaks the Finnish frame', 'act', '"fi":"nolla kymmentä"', '"fi":"ei kymmeniä 0"'],
  ['the word free in a string', 'act', 'hSecond: {"en":"Put a second card in the stand."', 'hSecond: {"en":"Put a second free card in the stand."'],
  ['a success line that drops the word', 'act', 'okTriple: {"en":"{numeral} — {word} — {expanded}!"', 'okTriple: {"en":"{numeral} — {expanded}!"'],
  ['a role="img" label', 'act', "apparatusClasses: ['tt-art'],", "apparatusClasses: ['tt-art'], _x: ['role', 'img'],"],
  ['a frozen slug edited', 'man', '"three-ways-to-show-a-number"', '"three-ways-to-show-a-number-2"'],
  ['the manifest still on the old tool', 'man', '"tool": "twin-tubes-activity"', '"tool": "match-pairs-activity"'],
  ['another row touched', 'man', '"tool": "match-pairs-activity"', '"tool": "match-pairs-activity2"']
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tt-mut-'));
const run = (files) => { const env = Object.assign({}, process.env, { TT_CORE: files.core, TT_ACT: files.act, TT_MANIFEST: files.man }); return spawnSync(process.execPath, [path.join(__dirname, 'verify-twin-tubes-core.js')], { env, encoding: 'utf8', timeout: 300000 }); };
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
console.log(`mutate-twin-tubes: ${killed}/${M.length} killed; control ${control.status === 0 ? 'passed' : 'FAILED'}`);
process.exit(killed === M.length && control.status === 0 ? 0 : 1);
