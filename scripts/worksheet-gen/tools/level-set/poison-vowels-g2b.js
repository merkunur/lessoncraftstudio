#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/vowels-g2b.js (G2-543 Reading Words with oo, ou, ow, oi, and oy, G2-544
 * Reading Words with ar and or, G2-545 Reading Words with er, ir, and ur, G2-546 Long Vowels in Two-Syllable Words,
 * G2-547 Build and Read Two-Syllable Words, G2-548 Heart Words: could, would, should) can fail: each planted fault
 * (poison-vowels-g2b.faults.js) changes the factory or the word bank, renders the page it concerns, and expects the
 * page's own check or the bank's check to report it. The file is restored after every fault (and on any error). The
 * probe runs with --keep (probe-types without it deletes the whole of out/probe, where other pages are rendered at the
 * same time); afterwards only out/probe/G2-54[3-8]-* are removed. A dev tool: never run it while pages are generated,
 * and never stop it (a stopped run leaves its fault in the file).
 *
 *   node tools/level-set/poison-vowels-g2b.js [--only=<part of a fault name>]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'vowels-g2b.js');
const BANK = path.join(WG, 'data', 'literacy', 'vowels-g2b.en.json');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
// [name, file, text to find, its replacement, type, level]
const FAULTS = require('./poison-vowels-g2b.faults.js')(FACTORY, BANK).filter(([name]) => !ONLY || name.includes(ONLY));
if (!FAULTS.length) throw new Error('no fault named ' + ONLY);
const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
const PROBE = path.join(WG, 'out', 'probe');
const clean = () => { if (fs.existsSync(PROBE)) for (const f of fs.readdirSync(PROBE)) if (/^G2-54[3-8]-/.test(f)) fs.rmSync(path.join(PROBE, f), { force: true }); };
// every text must stand in its file before anything is changed (a stale list fails at once, with nothing planted)
// (a fault may plant several edits at once: find and replacement are then lists of the same length)
const list = (x) => (Array.isArray(x) ? x : [x]);
for (const [name, file, find] of FAULTS) for (const f of list(find)) { const hits = ORIG[file].replace(/\r\n/g, '\n').split(f).length - 1; if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times'); }
let caught = 0;
try {
  for (const [name, file, find, repl, type, level] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    fs.writeFileSync(file, list(find).reduce((t, f, i) => t.replace(f, () => list(repl)[i]), src));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=' + type, '--levels=' + level, '--locales=en', '--seeds=6', '--keep'], { cwd: WG, encoding: 'utf8' });
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR|Error/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^(?:FAIL|ERROR) +\S+ \S+ \S+ \S+: /, '').slice(0, 110)) : ''));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); clean(); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
