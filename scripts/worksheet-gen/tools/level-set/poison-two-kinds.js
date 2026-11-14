#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/two-kinds.js (K-643 How Many in All?) can fail: each planted fault
 * changes the factory, renders the page it concerns, and expects the page's own check to report it. The factory is
 * restored after every fault (and on any error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-two-kinds.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const F = path.join(WG, 'types', '_shared', 'two-kinds.js');
const ORIG = fs.readFileSync(F, 'utf8');
// [name, text to find (once), its replacement, level, language (English when left out), theme (household when left out)]
const FAULTS = [
  ['a group of one', 'const n1 = rng.int(2, T - 2);', 'const n1 = rng.int(1, T - 1);', 2],
  ['two stories with one total', 'const totals = shuffle(d.totals, rng).slice(0, d.problems);', 'const totals = Array(d.problems).fill(d.totals[3]);', 2],
  ['one color twice in a story', 'opts.push([cs[i], cs[j]]);', 'opts.push([cs[i], cs[i]]);', 2],
  ['two stories with the same two colors', "usedPairs.add(p.slice().sort().join('+'));", '', 2],
  ['one thing in every story', 'const picked = shuffle(things, rng).slice(0, d.problems);', 'const picked = Array(d.problems).fill(things[0]);', 2],
  ['a color word without its dot', '${word}${dot(color)}</span>`', '${word}</span>`', 1],
  ['the dots under the frame swapped', '${box(n1, c1)}${sign(w1)}${box(n2, c2)}', '${box(n1, c2)}${sign(w1)}${box(n2, c1)}', 2],
  ['a row of nine', 'Array.from({ length: d.row }, (_, k) => slot(k))', 'Array.from({ length: d.row - 1 }, (_, k) => slot(k))', 2],
  ['the row not split after the fifth picture', "${k === 5 ? 'margin-left:14px;' : ''}", '', 1],
  ['pictures too big for the row', 'totals: [5, 6, 7, 8, 9], ten: 1 / 3, icon: 54', 'totals: [5, 6, 7, 8, 9], ten: 1 / 3, icon: 72', 2],
  ['the harder page shows pictures', 'if (d.draw) {', 'if (false) {', 3],
  ['a story prints its total', 'problems.push({ noun: thing.noun, n1, n2, c1, c2, place: frameOf[i].t });', "text += ' ' + (n1 + n2); problems.push({ noun: thing.noun, n1, n2, c1, c2, place: frameOf[i].t });", 2],
  ['the stamp and the story disagree', 'data-lcs-kinds="${[n1, n2, c1, c2', 'data-lcs-kinds="${[n2 + 1, n1, c1, c2', 2],
  ['the story names another color than its group', 'colorSpan(colorWord(L, c1, thing.gender), c1)', 'colorSpan(colorWord(L, c1, thing.gender), c2)', 2],
  ['four stories on the easier page', '1: { problems: 3,', '1: { problems: 4,', 1],
  ['a total of 7 on the easier page', 'totals: [4, 5, 6], icon: 60', 'totals: [5, 6, 7], icon: 60', 1],
  ['four stories on the harder page', '3: { problems: 3, row: 0,', '3: { problems: 4, row: 0,', 3],
  ['a low box to draw in', 'min-height:104px;display:flex', 'min-height:40px;flex:0 0 40px;display:flex', 3],
  ['the frame loses its plus sign', "const [w1, w2] = F.eq || ['+', '='];", "const [w1, w2] = F.eq || ['and', '='];", 2],
  ['the French frame keeps + and =', "const [w1, w2] = F.eq || ['+', '='];", "const [w1, w2] = ['+', '='];", 2, 'fr'],
  ['a butterfly in a box', "const PLACES = { butterfly: ['garden'],", "const PLACES = { butterfly: ['box'],", 1, 'en', 'nature bw'],
  ['a green flower', "const THING_COLORS = { flower: ['red', 'blue', 'yellow'] };", "const THING_COLORS = { flower: ['green', 'blue', 'yellow'] };", 1, 'en', 'nature bw'],
  ['a story in Finnish with a slot left', 'text = text.replace(T1, colorSpan(colorWord(L, c1, thing.gender), c1))', "text = text.replace(T1, '{c1}')", 2, 'fi'],
];
let caught = 0;
try {
  for (const [name, find, repl, level, loc, theme] of FAULTS) {
    const src = ORIG.replace(/\r\n/g, '\n');
    if (src.split(find).length !== 2) throw new Error('fault "' + name + '": its text is not in the factory exactly once');
    fs.writeFileSync(F, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=K-643', '--levels=' + level, '--locales=' + (loc || 'en'), '--seeds=3', '--theme=' + (theme || 'household bw')], { cwd: WG, encoding: 'utf8' });
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || [''])[0].split(': ').slice(1).join(': ').slice(0, 110)) : ''));
  }
} finally { fs.writeFileSync(F, ORIG); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
