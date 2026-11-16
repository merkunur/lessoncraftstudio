#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/story-g2.js (G2-526 How a Character Meets a Challenge, G2-527 What
 * Happens and Why, G2-528 What Is the Lesson?, G2-529 Beginning, Middle, and End) can fail: each planted fault changes
 * the factory (or the story bank), renders the page it concerns, and expects the page's own check or the bank's check
 * to report it. The file is restored after every fault (and on any error). A dev tool: never run it while pages are
 * generated, and never stop it (a stopped run leaves its fault in the file).
 *
 *   node tools/level-set/poison-story-g2.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'story-g2.js');
const BANK = path.join(WG, 'data', 'literacy', 'stories.en.json');
// [name, file, text to find, its replacement, type, level]
const FAULTS = [
  // How a Character Meets a Challenge (G2-526)
  ['the right answers as a staircase', FACTORY, "const at = mixed3(['012', '210']);", "const at = [0, 1, 2];", 'G2-526', 1],
  ['one row only for an answer of level 2', FACTORY, "const ROWS = [2, 2, 1];", "const ROWS = [1, 1, 1];", 'G2-526', 2],
  ['no question of the child\'s own on level 3', FACTORY, "(lv === 3 ? cream('data-lcs-own=\"1\"'", "(lv === 9 ? cream('data-lcs-own=\"1\"'", 'G2-526', 3],
  ['small print', FACTORY, "challenge: { 1: { font: 17.5, lh: 1.45 }", "challenge: { 1: { font: 14, lh: 1.45 }", 'G2-526', 1],
  ['a low writing row', FACTORY, "challenge: { 1: { font: 17.5, lh: 1.45 }, 2: { font: 17.5, lh: 1.45, rowH: 48 }", "challenge: { 1: { font: 17.5, lh: 1.45 }, 2: { font: 17.5, lh: 1.45, rowH: 38 }", 'G2-526', 2],
  // What Happens and Why (G2-527)
  ['every effect in the place of its cause', FACTORY, "const order = mixed3(['012', '021', '102', '210']);", "const order = [0, 1, 2];", 'G2-527', 1],
  ['a box keyed to another effect', FACTORY, "${numBox(letterOf(i), key)}", "${numBox(letterOf((i + 1) % 3), key)}", 'G2-527', 1],
  ['a card asks for the half it gives', FACTORY, "<span data-lcs-asks=\"${miss}\"", "<span data-lcs-asks=\"${g}\"", 'G2-527', 2],
  ['level 3 gives three causes', FACTORY, "shuffle(['cause', 'cause', 'effect'], rng)", "['cause', 'cause', 'cause']", 'G2-527', 3],
  // What Is the Lesson? (G2-528)
  ['the sentence that is not in the story stands last', FACTORY, "if (rows[2].ok) break; }", "rows = [...t.shows.map((s) => ({ s, ok: 1 })), { s: t.notInStory, ok: 0 }]; break; }", 'G2-528', 1],
  ['the check boxes keyed the wrong way round', FACTORY, "${tick(!!r.ok)}", "${tick(!r.ok)}", 'G2-528', 1],
  ['no question about the ending on level 3', FACTORY, "(lv === 3 ? cream('data-lcs-how=\"1\"'", "(lv === 9 ? cream('data-lcs-how=\"1\"'", 'G2-528', 3],
  // Beginning, Middle, and End (G2-529)
  ['the three sentences in the order of the story', FACTORY, "const order = mixed3(['012', '210']), at = rng.int(0, 2);", "const order = [0, 1, 2], at = rng.int(0, 2);", 'G2-529', 1],
  ['the middle keyed to the end', FACTORY, "choices(placed(t.retell[1], shuffle([t.retell[0], t.retell[2]], rng), at)", "choices(placed(t.retell[2], shuffle([t.retell[0], t.retell[1]], rng), at)", 'G2-529', 1],
  ['no line for the lesson on level 3', FACTORY, "(lv === 3 ? cream('data-lcs-lessonline=\"1\"'", "(lv === 9 ? cream('data-lcs-lessonline=\"1\"'", 'G2-529', 3],
  ['numbers in front of the paragraphs', FACTORY, "${esc(p.sentences.join(' '))}</div>`).join('');", "<span>${i + 1}</span> ${esc(p.sentences.join(' '))}</div>`).join('');", 'G2-529', 1],
  // the bank's own check (it runs when the factory loads)
  ['bank: a wrong lesson that is the lesson of no other story', BANK, '"lure": "People do not believe someone who tells lies."', '"lure": "Honesty is always the best choice."', 'G2-528', 1],
  ['bank: a feeling that is not one word', BANK, '"answer": "ashamed"', '"answer": "very ashamed of himself"', 'G2-526', 1],
  ['bank: an effect that stands twice', BANK, '"effect": "He lay down for a nap."', '"effect": "She crossed the finish line first."', 'G2-527', 1],
  ['bank: no character whose place the child takes', BANK, '"you": "the tortoise"', '"you": ""', 'G2-526', 3],
  ['bank: a retelling whose middle is its end', BANK, '"The tortoise wins the race."', '"The hare takes a nap, but the tortoise keeps walking."', 'G2-529', 1],
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
