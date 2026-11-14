#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/measure-units.js (G1-574, G2-516, G2-517) can fail: each planted
 * fault changes the factory, renders the page it concerns, and expects the page's own check to report it. The
 * factory is restored after every fault (and on any error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-measure-units.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const F = path.join(WG, 'types', '_shared', 'measure-units.js');
const ORIG = fs.readFileSync(F, 'utf8');
// [name, text to find (once), its replacement, type, level, language (English when left out)]
const FAULTS = [
  ['a row laid right loses its last clip', "if (kind === 'right') xs = Array.from({ length: n }, (_, k) => X0 + k * U);", "if (kind === 'right') xs = Array.from({ length: n - 1 }, (_, k) => X0 + k * U);", 'G1-574', 2],
  ['a gap row has one gap only', "if (k === g1 || k === g2) { faults.push([x, x + U / 2]); x += U / 2; }", "if (k === g1) { faults.push([x, x + U / 2]); x += U / 2; }", 'G1-574', 1],
  ['an overlap row has no overlap', "if (k === g1 || k === g2) { x -= U / 2; faults.push([x, x + U / 2]); }", "if (k === -1) { x -= U / 2; faults.push([x, x + U / 2]); }", 'G1-574', 1],
  ['a late row starts on time', "xs = Array.from({ length: n }, (_, k) => X0 + U / 2 + k * U);", "xs = Array.from({ length: n }, (_, k) => X0 + k * U);", 'G1-574', 2],
  ['the key rings one end of a late row only', "faults.push([X0, X0 + U / 2], [X0 + len, X0 + len + U / 2]); }", "faults.push([X0, X0 + U / 2]); }", 'G1-574', 2],
  ['the harder page has no box for the clips', "${d.count ? `<span style=\"display:inline-flex;align-items:center;gap:5px\" data-lcs-count>", "${d.count && false ? `<span style=\"display:inline-flex;align-items:center;gap:5px\" data-lcs-count>", 'G1-574', 3],
  ['the easier page shows a late start', "1: { rows: 4, right: [2], wrong: ['gap', 'overlap'], nMax: 6, count: false }", "1: { rows: 4, right: [2], wrong: ['gap', 'start'], nMax: 6, count: false }", 'G1-574', 1],
  ['three rows of the easier page are laid right', "1: { rows: 4, right: [2], wrong: ['gap', 'overlap'], nMax: 6, count: false }", "1: { rows: 4, right: [3], wrong: ['gap', 'overlap'], nMax: 6, count: false }", 'G1-574', 1],
  ['the harder page has no row that stops short', "wrong: ['gap', 'overlap', 'start', 'short'], must: 'short', nMax: 7", "wrong: ['gap', 'overlap', 'start'], must: 'gap', nMax: 7", 'G1-574', 3],
  ['the rows laid right have one length', "const lensRight = pickLens(right), lensWrong = pickLens(nWrong);", "const lensRight = Array(right).fill(5), lensWrong = pickLens(nWrong);", 'G1-574', 2],
  ['the marks have no words', "bubble(WORD(Wm.right, 16, 'white-space:nowrap'), isRight, 'right')", "bubble('', isRight, 'right')", 'G1-574', 1],
  ['the page for everyone has no row that starts late', "wrong: ['gap', 'overlap', 'start'], must: 'start', nMax: 7", "wrong: ['gap', 'overlap', 'short'], must: 'gap', nMax: 7", 'G1-574', 2],
  ['a stick row of the harder page is already complete', "rng.pick(d.full ? [2, 4, 6] : [4, 6])", "rng.pick([2])", 'G2-517', 3],
  ['a unit too few in every second row', "shown = d.full ? total : kind === 'stick' ? 1 : ratio;", "shown = d.full ? total - 1 : kind === 'stick' ? 1 : ratio;", 'G2-517', 1],
  ['the cubes are a little too long', "const s = U / ratio; h2 = s;", "const s = U / ratio + 2; h2 = s;", 'G2-517', 2],
  ['a stick is as long as three clips', "const s = 2 * U; h2 = 18;", "const s = 3 * U; h2 = 18;", 'G2-517', 3],
  ['the harder page draws every unit', "3: { rows: 4, cube: [2, 3], full: false }", "3: { rows: 4, cube: [2, 3], full: true }", 'G2-517', 3],
  ['every row measures with cubes', "shuffle(['cube', 'cube', 'stick', 'stick'], rng), ns = [];", "shuffle(['cube', 'cube', 'cube', 'cube'], rng), ns = [];", 'G2-517', 1],
  ['the mark of the wrong unit is the right one', "${dot(kind === 'stick', 'clip')}", "${dot(kind === 'stick', kind)}", 'G2-517', 1],
  ['a cube is not square', "height=\"${s.toFixed(2)}\" fill=\"${C.coralSoft}\" stroke=\"${INK}\" stroke-width=\"1.8\" stroke-linejoin=\"round\"${tag}/>`;", "height=\"${(s - 6).toFixed(2)}\" fill=\"${C.coralSoft}\" stroke=\"${INK}\" stroke-width=\"1.8\" stroke-linejoin=\"round\"${tag}/>`;", 'G2-517', 1],
  ['two lengths are found most often', "const freq = rng.pick([[4, 2, 2, 1, 1], [3, 2, 2, 2, 1], [3, 2, 2, 1, 1, 1]]);", "const freq = rng.pick([[3, 3, 2, 1, 1]]);", 'G2-516', 1],
  ['the count of longer pencils is one off', "const longer = vals.filter((x) => x > K).length;", "const longer = vals.filter((x) => x >= K).length;", 'G2-516', 2],
  ['the line has a tick too few', "for (let k = 0; k < TICKS; k++) {", "for (let k = 0; k < TICKS - 1; k++) {", 'G2-516', 1],
  ['the page for everyone has its line numbered', "2: { data: true, numbered: false }", "2: { data: true, numbered: true }", 'G2-516', 2],
  ['the harder page prints the lengths', "3: { data: false, numbered: false }", "3: { data: true, numbered: false }", 'G2-516', 3],
  ['a pencil of eleven inches', "L === 'en' ? [2, 3, 4, 5, 6, 7, 8]", "L === 'en' ? [5, 6, 7, 8, 9, 10, 11]", 'G2-516', 1],
  ['the boxes of the long line are low', "BH = TICKS > 12 ? 44 : 26;", "BH = TICKS > 12 ? 26 : 26;", 'G2-516', 3, 'de'],
  ['the empty centimeter line has twelve ticks', "TICKS = !d.data && L !== 'en' ? 18 : 12;", "TICKS = !d.data && L !== 'en' ? 12 : 12;", 'G2-516', 3, 'de'],
];
let caught = 0;
try {
  for (const [name, find, repl, type, level, loc] of FAULTS) {
    const src = ORIG.replace(/\r\n/g, '\n');
    if (src.split(find).length !== 2) throw new Error('fault "' + name + '": its text is not in the factory exactly once');
    fs.writeFileSync(F, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=' + type, '--levels=' + level, '--locales=' + (loc || 'en'), '--seeds=3'], { cwd: WG, encoding: 'utf8' });
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || [''])[0].split(': ').slice(1).join(': ').slice(0, 110)) : ''));
  }
} finally { fs.writeFileSync(F, ORIG); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
