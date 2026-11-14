#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/solids-k.js (K-644 Name the Solid Shapes) can fail: each planted fault
 * changes the factory, renders the page it concerns, and expects the page's own check to report it. The factory is
 * restored after every fault (and on any error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-solids-k.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const F = path.join(WG, 'types', '_shared', 'solids-k.js');
const ORIG = fs.readFileSync(F, 'utf8');
// [name, text to find (once), its replacement, level, language (English when left out)]
const FAULTS = [
  ['every thing under its own solid', 'do { below = shuffle(SOLIDS, rng); } while (below.some((s, i) => s === top[i]));', 'below = top.slice();', 2],
  ['one color for every solid of the code', 'Object.keys(HEX)[i]]', 'Object.keys(HEX)[0]]', 2],
  ['nothing turned on the page for everyone', "sizes: [52, 72, 94], turn: true, things: 'plain'", "sizes: [52, 72, 94], turn: false, things: 'plain'", 2],
  ['one size only', "2: { each: 3, others: 0, sizes: [52, 72, 94]", "2: { each: 3, others: 0, sizes: [72, 72, 72]", 2],
  ['a turned solid on the easier page', '1: { each: 2, others: 0, sizes: [64, 92], turn: false', '1: { each: 2, others: 0, sizes: [64, 92], turn: true', 1],
  ['no shape to leave white on the harder page', "Array(i < 2 ? 3 : 2).fill(s)), 'box', 'pyramid'];", "Array(i < 2 ? 3 : 2).fill(s)), 'cube', 'cone'];", 3],
  ['the plain things on the harder page', "turn: true, things: 'other', cols: 4", "turn: true, things: 'plain', cols: 4", 3],
  ['a name of the code left out', "color:${INK}\">${N[s]}</span>", "color:${INK}\"></span>", 2],
  ['a solid too big for its cell', "2: { each: 3, others: 0, sizes: [52, 72, 94]", "2: { each: 3, others: 0, sizes: [52, 72, 190]", 2],
  ['the match without its dots', '${dotFirst ? dotSpan + inner : inner + dotSpan}', '${inner}', 2],
  ['a thing whose picture does not load', "cylinder: [['At the Supermarket', 'can']]", "cylinder: [['At the Supermarket', 'can_x']]", 2],
  ['a stamp that disagrees with the drawing', 'data-lcs-cell="${k}|${pose}|${size}"', 'data-lcs-cell="${k}|${pose}|${size + 10}"', 2],
  ['three of each on the easier page', '1: { each: 2,', '1: { each: 3,', 1],
  ['a color dot that is not the solid\'s', 'data-lcs-dot="${colorOf[s]}" style="display:inline-block;width:20px', 'data-lcs-dot="red" style="display:inline-block;width:20px', 2, 'de'],
  ['a pair of one size on the easier page', 'const sizes = shuffle(d.sizes, rng);', 'const sizes = [d.sizes[0]];', 1],
  ['a turnable solid never upright', "shuffle(['up', rng.pick(turned[k]), ", "shuffle([rng.pick(turned[k]), rng.pick(turned[k]), ", 2],
];
let caught = 0;
try {
  for (const [name, find, repl, level, loc] of FAULTS) {
    const src = ORIG.replace(/\r\n/g, '\n');
    if (src.split(find).length !== 2) throw new Error('fault "' + name + '": its text is not in the factory exactly once');
    fs.writeFileSync(F, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=K-644', '--levels=' + level, '--locales=' + (loc || 'en'), '--seeds=3'], { cwd: WG, encoding: 'utf8' });
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || [''])[0].split(': ').slice(1).join(': ').slice(0, 110)) : ''));
  }
} finally { fs.writeFileSync(F, ORIG); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
