#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/story-g3.js (G3-504 The Central Message, G3-506 Character Traits,
 * G3-508 Get Ready to Talk About a Story, G3-509 Talk About the Story) and the story option of info-text-g3.js
 * (G3-502, G3-503) can fail: each planted fault changes a factory (or the story bank), renders the page it concerns,
 * and expects the page's own check or the bank's check to report it. The file is restored after every fault (and on
 * any error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-story-g3.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'story-g3.js');
const FACTORY3 = path.join(WG, 'types', '_shared', 'info-text-g3.js');
const BANK = path.join(WG, 'data', 'literacy', 'stories.en.json');
// [name, file, text to find, its replacement, type, level]
const FAULTS = [
  // The Central Message (G3-504)
  ['the sentence that is not in the story stands last', FACTORY, "if (rows[3].ok) break; }", "rows = [...t.shows.map((s) => ({ s, ok: 1 })), { s: t.notInStory, ok: 0 }]; break; }", 'G3-504', 1],
  ['the check boxes keyed the wrong way round', FACTORY, "${tick(!!r.ok)}", "${tick(!r.ok)}", 'G3-504', 1],
  ['the question about the ending on level 2', FACTORY, "const how = lv === 3 ? cream(", "const how = lv >= 2 ? cream(", 'G3-504', 2],
  ['small print', FACTORY, "message: { 1: { font: 15.6, lh: 1.42 }", "message: { 1: { font: 12, lh: 1.42 }", 'G3-504', 1],
  ['a low writing line', FACTORY, "3: { font: 15, lh: 1.38, rowH: 31 } },", "3: { font: 15, lh: 1.38, rowH: 22 } },", 'G3-504', 3],
  // Character Traits (G3-506)
  ['both right words in the same place', FACTORY, "at[1] = (at[0] + 1 + rng.int(0, 1)) % 3;", "at[1] = at[0];", 'G3-506', 1],
  ['the sentences in the order of the cards', FACTORY, "order = shuffle([0, 1, 2], rng); if (order.join('') !== '012') break; }", "order = [0, 1, 2]; break; }", 'G3-506', 1],
  ['no words offered on level 2', FACTORY, "const bank = lv === 2 ?", "const bank = lv === 9 ?", 'G3-506', 2],
  ['no question about the feeling on level 3', FACTORY, "const end = lv === 3 ? cream(", "const end = lv === 9 ? cream(", 'G3-506', 3],
  // the talk pages (G3-508, G3-509)
  ['level 2 of the notes without the words to read aloud', FACTORY, "lv === 1 ? cream('data-lcs-note=\"more\"'", "lv <= 2 ? cream('data-lcs-note=\"more\"'", 'G3-508', 2],
  ['two of the four sentence starters only', FACTORY, "STARTERS.map((x) =>", "STARTERS.slice(0, 2).map((x) =>", 'G3-509', 1],
  ['one line only for an idea of the talk', FACTORY, "sample: true }) + rule({ w: inner, h: d.rowH }), d.pad || 6));", "sample: true }), d.pad || 6));", 'G3-509', 2],  // a story through the factory of the informational texts
  ['a story printed with headings', FACTORY3, "headings: !story && (mode === 'evidence' || mode === 'ask')", "headings: (mode === 'evidence' || mode === 'ask')", 'G3-502', 2],
  // the bank's own check (it runs when the factory loads)
  ['bank: a sentence for a trait that is not in the story', BANK, '"proof": "The fox laughed behind his paw."', '"proof": "The fox laughed loudly."', 'G3-506', 1],
  ['bank: a talk question that is no question', BANK, '"Why didn\'t the crow give up?"', '"Why the crow did not give up"', 'G3-509', 1],
  ['bank: a literal sentence that is the message', BANK, '"literal": "A lion should watch out for hunters."', '"literal": "Even a small friend can be a great help."', 'G3-504', 1],
  ['bank: a proof that is no sentence of its paragraph', BANK, '"proof": "She ran right over the lion\'s nose."', '"proof": "She ran over the nose of the lion."', 'G3-502', 1],
  ['bank: the plain sentence shows a trait', BANK, '"plain": "It had not rained for many weeks."', '"plain": "But the crow did not stop."', 'G3-506', 1],
  ['bank: a trait word used for two characters', BANK, '"grumpy"', '"hard-working"', 'G3-506', 1],
];
const ORIG = {}; for (const f of [FACTORY, FACTORY3, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
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
