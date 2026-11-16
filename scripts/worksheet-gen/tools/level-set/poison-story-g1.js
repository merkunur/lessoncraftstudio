#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/story-g1.js (G1-579 Find the Answer in the Story, G1-580 Characters,
 * Setting, and Events, G1-581 Retell the Story and Tell Its Lesson, G1-582 Feeling Words and Sense Words, G1-583 Who
 * Is Telling the Story?) can fail: each planted fault changes the factory (or the story bank), renders the page it
 * concerns, and expects the page's own check or the bank's check to report it. The file is restored after every
 * fault (and on any error). A dev tool: never run it while pages are generated, and never stop it (a stopped run
 * leaves its fault in the file).
 *
 *   node tools/level-set/poison-story-g1.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'story-g1.js');
const BANK = path.join(WG, 'data', 'literacy', 'stories.en.json');
// [name, file, text to find, its replacement, type, level]
const FAULTS = [
  // Find the Answer in the Story (G1-579)
  ['the right answers as a staircase', FACTORY, "const at = placesFor(4, rng);\n        const asked = lv === 3", "const at = [0, 1, 2, 0];\n        const asked = lv === 3", 'G1-579', 1],
  ['no sentence starters on level 2', FACTORY, "starter: lv === 2 ? q.starter : null", "starter: null", 'G1-579', 2],
  ['a low writing row', FACTORY, "2: { font: 21, qFont: 19, rowH: 66, pad: 5 }, 3: { font: 20, qFont: 19, rowH: 54, pad: 5 } }", "2: { font: 21, qFont: 19, rowH: 44, pad: 5 }, 3: { font: 20, qFont: 19, rowH: 54, pad: 5 } }", 'G1-579', 2],
  ['one row only for a sentence on level 3', FACTORY, "(lv === 3 && TWO_ROWS ? line({ w: inner, h: d.rowH }) : '')", "''", 'G1-579', 3],
  ['four questions on level 3', FACTORY, ".slice(0, 3).sort((a, b) => a - b)", ".slice(0, 4).sort((a, b) => a - b)", 'G1-579', 3],
  ['small print', FACTORY, "details: { 1: { font: 23,", "details: { 1: { font: 16,", 'G1-579', 1],
  // Characters, Setting, and Events (G1-580)
  ['the two animals that are not in the story are keyed', FACTORY, "...t.chars.map((c) => ({ ...c, ok: 1 })), ...others.map((o) => ({ ...o, ok: 0 }))", "...t.chars.map((c) => ({ ...c, ok: 0 })), ...others.map((o) => ({ ...o, ok: 1 }))", 'G1-580', 1],
  ['the two characters pictured on the page that asks who is in the story', FACTORY, "noPics: mode === 'map' && lv === 1", "noPics: false", 'G1-580', 1],
  ['one row only for a sentence of the map', FACTORY, "+ (lv === 3 ? line({ w: inner, h: d.rowH }) : ''), lv === 3 ? 5 : 8)", "+ '', lv === 3 ? 5 : 8)", 'G1-580', 3],
  // Retell the Story and Tell Its Lesson (G1-581)
  ['the three sentences in the order of the story', FACTORY, "const order = mixed3(['012', '210']);", "const order = [0, 1, 2];", 'G1-581', 1],
  ['both lessons keyed', FACTORY, "pill(x, i === at, key, 20)", "pill(x, true, key, 20)", 'G1-581', 1],
  ['a word bank of four words', FACTORY, "shuffle(t.words, rng).map((w) =>", "shuffle(t.words, rng).slice(0, 4).map((w) =>", 'G1-581', 2],
  ['no line for the lesson on level 3', FACTORY, "cream('data-lcs-lessonline=\"1\"'", "cream('data-lcs-lessonx=\"1\"'", 'G1-581', 3],
  // Feeling Words and Sense Words (G1-582)
  ['the right picture always first', FACTORY, "const at = placesFor(4, rng);\n          below = `<div data-lcs-wordbox", "const at = [0, 0, 0, 0];\n          below = `<div data-lcs-wordbox", 'G1-582', 1],
  ['another part of the body keyed', FACTORY, "pick(ORGANS[o], d.pic, i === at, key, ORGANS[o].name)", "pick(ORGANS[o], d.pic, i === (at + 1) % 3, key, ORGANS[o].name)", 'G1-582', 1],
  ['the two right parts of the body in one place', FACTORY, "at[1] = (at[0] + rng.int(1, 2)) % 3;", "at[1] = at[0];", 'G1-582', 2],
  ['no question of the child\'s own on level 3', FACTORY, "(lv === 3 ? cream('data-lcs-own=\"1\"'", "(lv === 9 ? cream('data-lcs-own=\"1\"'", 'G1-582', 3],
  // Who Is Telling the Story? (G1-583)
  ['spoken words keyed to the narrator', FACTORY, "who: x.who, at: saidAt(t, x.words) }))", "who: 'narrator', at: saidAt(t, x.words) }))", 'G1-583', 2],
  ['the wrong names keyed on level 1', FACTORY, "pill(w, w === x.who, key, 18)", "pill(w, w !== x.who, key, 18)", 'G1-583', 1],
  ['every box keyed to N', FACTORY, "`${numBox(letter(x.who), key, lv === 3 ? 38 : 42)}", "`${numBox('N', key, lv === 3 ? 38 : 42)}", 'G1-583', 2],
  ['nothing to write on level 3', FACTORY, "(lv === 3 ? cream('data-lcs-next=\"1\"'", "(lv === 9 ? cream('data-lcs-next=\"1\"'", 'G1-583', 3],
  // the bank's own check (it runs when the factory loads)
  ['bank: two names with the same first letter', BANK, '"name": "Fay"', '"name": "Bay"', 'G1-583', 1],
  ['bank: a wrong lesson that is the lesson of no other story', BANK, '"lure": "Do not give up."', '"lure": "Be kind to animals."', 'G1-581', 1],
  ['bank: a third feeling word in a story', BANK, '"Ben ate some plums too."', '"Ben smiled at Fay."', 'G1-582', 1],
  ['bank: a sense word that stands twice', BANK, '"It was dark and quiet."', '"It was dark and dark."', 'G1-582', 1],
  ['bank: a question out of the order of the story', BANK, '"sentence": 9', '"sentence": 1', 'G1-579', 1],
  ['bank: a sentence of the narrator that is not in the story', BANK, '"The plums were sweet."', '"The plums were ripe."', 'G1-583', 1],
];
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
