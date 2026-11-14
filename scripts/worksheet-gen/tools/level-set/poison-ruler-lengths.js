#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/ruler-lengths.js (G3-493) can fail: each planted
 * fault changes the factory, renders the page it concerns, and expects the page's own check to report it. The
 * factory is restored after every fault (and on any error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-ruler-lengths.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const F = path.join(WG, 'types', '_shared', 'ruler-lengths.js');
const ORIG = fs.readFileSync(F, 'utf8');
// [name, text to find (once), its replacement, type, level, language (English when left out)]
const FAULTS = [
  ['a pencil is one mark too long', "k * T, PH, bodies[i % 3])", "(k + 1) * T, PH, bodies[i % 3])", 'G3-493', 2],
  ['a pencil starts beside its mark', "pencil(X0 + s0 * T, 2,", "pencil(X0 + s0 * T + 4, 2,", 'G3-493', 2],
  ['the ruler shows whole marks only', "if (k % (per / shown) !== 0) continue;", "if (k % per !== 0) continue;", 'G3-493', 2],
  ['the harder page starts every pencil at 0', "if (!d.offset) return 0;", "if (d.offset || !d.offset) return 0;", 'G3-493', 3],
  ['two lengths are the most common', "const freq = rng.pick([[3, 2, 1, 1, 1], [3, 2, 2, 1], [3, 1, 1, 1, 1, 1]]);", "const freq = rng.pick([[3, 3, 1, 1]]);", 'G3-493', 2],
  ['the count of longer pencils is one off', "const longer = ks.filter((x) => x > K).length;", "const longer = ks.filter((x) => x > K).length + 1;", 'G3-493', 2],
  ['the centimeter ruler is not real size', "px: 8 * 96 / 2.54, write: w, key };", "px: 264, write: w, key };", 'G3-493', 2, 'de'],
  ['the boxes are small', "big ? 92 : 78, big ? 46 : 36", "big ? 60 : 60, big ? 30 : 30", 'G3-493', 2],
  ['a quarter inch on the easier English page', "const step = d.halves && S.per === 4 ? 2 : 1;", "const step = 1;", 'G3-493', 1],
  ['the plot has a tick too few', "for (let j = 0; j <= n; j++) {", "for (let j = 0; j < n; j++) {", 'G3-493', 2],
  ['Mexico gets a decimal comma', "const HALF = ['es', 'pt', 'it', 'no', 'fi'].includes(L);", "const HALF = ['pt', 'it', 'no', 'fi'].includes(L);", 'G3-493', 2, 'es'],
  ['Germany gets the fraction', "const HALF = ['es', 'pt', 'it', 'no', 'fi'].includes(L);", "const HALF = ['es', 'pt', 'it', 'no', 'fi', 'de'].includes(L);", 'G3-493', 2, 'de'],
  ['a French page is made', "const HALF = ['es', 'pt', 'it', 'no', 'fi'].includes(L);", "const HALF = ['es', 'pt', 'it', 'no', 'fi'].includes(L) || false;", 'G3-493', 2, 'fr'],
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
