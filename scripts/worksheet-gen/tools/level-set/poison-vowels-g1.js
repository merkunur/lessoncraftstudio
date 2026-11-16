#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/vowels-g1.js (G1-584 Silent e Changes the Vowel, G1-585 Long a: ai and ay,
 * G1-586 Long e: ee and ea, G1-587 Long o: oa and ow) can fail: each planted fault (poison-vowels-g1.faults.js) changes the
 * factory or the word bank, renders the page it concerns, and expects the page's own check or the bank's check to report
 * it. The file is restored after every fault (and on any error). A dev tool: never run it while pages are generated, and
 * never stop it (a stopped run leaves its fault in the file).
 *
 *   node tools/level-set/poison-vowels-g1.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'vowels-g1.js');
const BANK = path.join(WG, 'data', 'literacy', 'long-vowels.en.json');
// [name, file, text to find, its replacement, type, level]
const FAULTS = require('./poison-vowels-g1.faults.js')(FACTORY, BANK);
const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
let caught = 0;
try {
  for (const [name, file, find, repl, type, level] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    const hits = src.split(find).length - 1;
    if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
    fs.writeFileSync(file, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=' + type, '--levels=' + level, '--locales=en', '--seeds=6'], { cwd: WG, encoding: 'utf8' });
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR|Error/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^(?:FAIL|ERROR) +\S+ \S+ \S+ \S+: /, '').slice(0, 110)) : ''));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
