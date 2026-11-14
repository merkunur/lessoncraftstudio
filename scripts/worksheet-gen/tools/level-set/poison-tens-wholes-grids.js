#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/tens-wholes-grids.js (G3-491, G3-492, G2-515) can fail: each planted
 * fault changes the factory, renders the page it concerns, and expects the page's own check to report it. The
 * factory is restored after every fault (and on any error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-tens-wholes-grids.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const F = path.join(WG, 'types', '_shared', 'tens-wholes-grids.js');
const ORIG = fs.readFileSync(F, 'utf8');
// [name, text to find (once), its replacement, type, level]
const FAULTS = [
  ['a rod is missing in every group', "for (let k = 0; k < b; k++) {\n      const x = gx + PAD", "for (let k = 0; k < b - 1; k++) {\n      const x = gx + PAD", 'G3-491', 1],
  ['the ten stands first in five equations, not six', "rng.sample(facts.map((_, i) => i), 6)", "rng.sample(facts.map((_, i) => i), 5)", 'G3-491', 3],
  ['the trio card loses its tens partner line', "tensLine(f, 21) + partner(f) + `</div>`", "tensLine(f, 21) + `</div>`", 'G3-491', 2],
  ['a part of every circle is left white', "fractionShape({ shape: 'circle', d: p.den, shaded: p.den, size }, ctx)", "fractionShape({ shape: 'circle', d: p.den, shaded: p.den - 1, size }, ctx)", 'G3-492', 1],
  ['a whole rectangle has a part too few', "for (let r = 0; r < grid[1]; r++) for (let c = 0; c < grid[0]; c++) s +=", "for (let r = 0; r < grid[1]; r++) for (let c = (r ? 0 : 1); c < grid[0]; c++) s +=", 'G3-492', 1],
  ['a whole rectangle loses its outline', "data-lcs-whole-outline=\"1\"/>`;", "/>`;", 'G3-492', 1],
  ['the fraction stands beside its whole number', "left:${x - 23}px;top:${Y + 18}px\">${frac(null, ln.den", "left:${x - 9}px;top:${Y + 18}px\">${frac(null, ln.den", 'G3-492', 2],
  ['the last mark of a number line is missing', "for (let k = 0; k <= n; k++) { const whole = k % ln.den === 0", "for (let k = 0; k < n; k++) { const whole = k % ln.den === 0", 'G3-492', 2],
  ['an equation is stamped with a wrong fraction', "const n = e.k * e.den, EQS = NUM('=', 26);", "const n = e.k * e.den + (e.kind === 'value' ? 1 : 0), EQS = NUM('=', 26);", 'G3-492', 3],
  ['a mark is missing on the top side', "for (let k = 1; k < c; k++) { s += tick(x0 + k * u, y0 - 8", "for (let k = 2; k < c; k++) { s += tick(x0 + k * u, y0 - 8", 'G2-515', 2],
  ['the harder page keeps marks on four sides', "3: { cards: 4, cols: 2, max: 5, start: false, add: true, sides: 2 }", "3: { cards: 4, cols: 2, max: 5, start: false, add: true, sides: 4 }", 'G2-515', 3],
  ['the parts are not squares', "<rect x=\"${x0}\" y=\"${y0}\" width=\"${c * u}\" height=\"${r * u}\" fill=\"#FFFFFF\"", "<rect x=\"${x0}\" y=\"${y0}\" width=\"${c * u}\" height=\"${r * u - 9}\" fill=\"#FFFFFF\"", 'G2-515', 2],
  ['the addition has a box too few', "line(Array.from({ length: q.r }, () => box(q.c, bw, 34))", "line(Array.from({ length: q.r - 1 }, () => box(q.c, bw, 34))", 'G2-515', 2],
  ['the easier page draws no first column', "for (let k = 2; k < r; k++) s += `<line x1=\"${x0}\"", "for (let k = 99; k < r; k++) s += `<line x1=\"${x0}\"", 'G2-515', 1],
  ['a rectangle of four squares', "if (r * c < 6) continue;", "if (r * c < 2) continue; if (i === 1 && (r !== 2 || c !== 2)) continue;", 'G2-515', 1],
];
let caught = 0;
try {
  for (const [name, find, repl, type, level] of FAULTS) {
    const src = ORIG.replace(/\r\n/g, '\n');
    if (src.split(find).length !== 2) throw new Error('fault "' + name + '": its text is not in the factory exactly once');
    fs.writeFileSync(F, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=' + type, '--levels=' + level, '--locales=en', '--seeds=3'], { cwd: WG, encoding: 'utf8' });
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || [''])[0].split(': ').slice(1).join(': ').slice(0, 110)) : ''));
  }
} finally { fs.writeFileSync(F, ORIG); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
