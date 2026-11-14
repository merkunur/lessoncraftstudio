#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/length-stories.js (G2-518 Length Story Problems) can fail: each planted
 * fault changes the factory, renders the page it concerns, and expects the page's own check to report it. The factory
 * is restored after every fault (and on any error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-length-stories.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const F = path.join(WG, 'types', '_shared', 'length-stories.js');
const ORIG = fs.readFileSync(F, 'utf8');
// [name, text to find (once), its replacement, level, language (English when left out)]
const FAULTS = [
  ['the key adds where it should subtract', "if (p.kind === 'subChange') return p.n1 - p.n3;\n  return p.n1 - p.n2;", "if (p.kind === 'subChange') return p.n1 - p.n3;\n  return p.n1 + p.n2;", 2],
  ['a scarf of 20 cm', 'scarf: { m: [70, 99], i: [40, 80] },\n  hose:','scarf: { m: [11, 30], i: [11, 30] },\n  hose:', 3, 'de'],
  ['a one-digit length told', 'const min = d.tens ? 10 : 11;', 'const min = d.tens ? 10 : 2;', 2],
  ['lengths that are not whole tens on the easier page', "1: { kinds: ['add', 'sub', 'cmpDiff'], tens: true, worked: true },", "1: { kinds: ['add', 'sub', 'cmpDiff'], worked: true },", 1],
  ['no worked story on the easier page', "1: { kinds: ['add', 'sub', 'cmpDiff'], tens: true, worked: true },", "1: { kinds: ['add', 'sub', 'cmpDiff'], tens: true },", 1],
  ['a worked story on the page for everyone', "2: { kinds: ['add', 'sub', 'cmpDiff'] },", "2: { kinds: ['add', 'sub', 'cmpDiff'], worked: true },", 2],
  ['the harder page asks the easy stories', "3: { kinds: ['cmpMore', 'cmpLess', 'subChange'] },", "3: { kinds: ['add', 'sub', 'cmpDiff'] },", 3],
  ['the answer printed in the story', 'unit: F.unit[f.size], sentence });', "unit: F.unit[f.size], sentence: sentence + ' (' + p.answer + ')' });", 2],
  ['two stories with one answer', 'used.answers.has(a) ||', '(used.answers.size > 0 && !used.answers.has(a)) ||', 2],
  ['one thing in two stories', "const frames = F.frames.filter((f) => f.kind === kind && !used.things.has(f.thing));", "const frames = F.frames.filter((f) => f.kind === kind);", 2],
  ['the wrong unit beside the answer', 'unit: F.unit[f.size], sentence', "unit: F.unit[f.size === 'small' ? 'long' : 'small'], sentence", 2],
  ['the bar with two unknowns', "return { whole: p.n1, parts: [p.n2, q], eq: [p.n1, MINUS, p.n2, q] };", "return { whole: q, parts: [p.n2, q], eq: [p.n1, MINUS, p.n2, q] };", 2],
  ['an equation that is not true', "return { whole: q, parts: [p.n1, p.n2], eq: [p.n1, '+', p.n2, q] };", "return { whole: q, parts: [p.n1, p.n2], eq: [p.n1, MINUS, p.n2, q] };", 2],
  ['a picture that does not load', "fence: ['around the house', 'fence'] };", "fence: ['around the house', 'fence_x'] };", 2],
  ['a frame left unfilled in Finnish', 'unit: F.unit[f.size], sentence });', "unit: F.unit[f.size], sentence: sentence + ' {n4}' });", 2, 'fi'],
];
let caught = 0;
try {
  for (const [name, find, repl, level, loc] of FAULTS) {
    const src = ORIG.replace(/\r\n/g, '\n');
    if (src.split(find).length !== 2) throw new Error('fault "' + name + '": its text is not in the factory exactly once');
    fs.writeFileSync(F, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=G2-518', '--levels=' + level, '--locales=' + (loc || 'en'), '--seeds=4'], { cwd: WG, encoding: 'utf8' });
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || [''])[0].split(': ').slice(1).join(': ').slice(0, 110)) : ''));
  }
} finally { fs.writeFileSync(F, ORIG); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
