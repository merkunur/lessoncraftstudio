#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/info-text-g3.js (G3-494 Answer with Evidence, G3-495 Ask and Answer,
 * G3-496 Main Idea and Key Details, G3-497 The Main Idea of Each Paragraph) can fail: each planted fault changes the
 * factory (or the text bank), renders the page it concerns, and expects the page's own check or the bank's check to
 * report it. The file is restored after every fault (and on any error). A dev tool: never run it while pages are
 * generated.
 *
 *   node tools/level-set/poison-info-text-g3.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'info-text-g3.js');
const BANK = path.join(WG, 'data', 'literacy', 'info-texts.en.json');
const ORDERED4 = "rows = [...t.parts.map((p, i) => ({ n: i + 1, text: p.focus })), { n: 0, text: t.focusLure }]; break;";
// [name, file, text to find, its replacement, type, level]
const FAULTS = [
  // Answer with Evidence (G3-494)
  ['level 1 names another paragraph than the one that proves the answer', FACTORY, "(paragraph ${x.part})</span>", "(paragraph ${(x.part % 4) + 1})</span>", 'G3-494', 1],
  ['a paragraph box keyed to another paragraph', FACTORY, "paraBox(x.part, key)}</div>`, 4));", "paraBox((x.part % 4) + 1, key)}</div>`, 4));", 'G3-494', 2],
  ['two questions of the hardest level proved by one paragraph', FACTORY, "if (new Set(three.map((x) => x.part)).size === 3) break;", "three = t.questions.filter((x, i, a) => (a[i + 1] && a[i + 1].part === x.part) || (a[i - 1] && a[i - 1].part === x.part)).concat(t.questions.find((x, i, a) => !(a[i + 1] && a[i + 1].part === x.part) && !(a[i - 1] && a[i - 1].part === x.part))).slice(0, 3); break;", 'G3-494', 3],
  ['one line only for the proving words', FACTORY, "${rule({ w: inner, h: d.proofH, answer: two[1] || null, sample: true })}</div>`; })(), 4));", "</div>`; })(), 4));", 'G3-494', 3],
  ['small print', FACTORY, "evidence: { 1: { font: 14.5, lh: 1.3 }", "evidence: { 1: { font: 12.5, lh: 1.3 }", 'G3-494', 1],
  ['a text too big for the page', FACTORY, "evidence: { 1: { font: 14.5, lh: 1.3 }", "evidence: { 1: { font: 18, lh: 1.3 }", 'G3-494', 1],
  ['no headings on the evidence page', FACTORY, "headings: mode === 'evidence' || mode === 'ask' }", "headings: false }", 'G3-494', 2],
  // Ask and Answer (G3-495)
  ['a sentence in a box that is no sentence of the text', FACTORY, "\"${esc(a.answer)}\"</div>`;", "\"${esc(a.q)}\"</div>`;", 'G3-495', 1],
  ['all right questions in one place', FACTORY, "const at = placesFor(4, rng);", "const at = [1, 1, 1, 1];", 'G3-495', 1],
  ['the line begins with another question word', FACTORY, "w: inner, h: d.rowH, starter: a.word, answer: key ? a.q : null, sample: true }), 6));", "w: inner, h: d.rowH, starter: 'Which', answer: key ? a.q : null, sample: true }), 6));", 'G3-495', 2],
  ['two own questions with the same first word', FACTORY, "const three = shuffle(t.ask, rng).slice(0, 3);", "const three = [t.ask[0], t.ask[0], t.ask[1]];", 'G3-495', 3],
  // Main Idea and Key Details (G3-496)
  ['the headings are printed on the main-idea page', FACTORY, "headings: mode === 'evidence' || mode === 'ask' }", "headings: true }", 'G3-496', 2],
  ['the sentence that is not in the text stands last', FACTORY, "if (rows[3].ok) break;", "rows = [...t.details.map((s) => ({ s, ok: 1 })), { s: t.notInText, ok: 0 }]; break;", 'G3-496', 1],
  ['the check boxes keyed the wrong way round', FACTORY, "${tick(!!r.ok)}", "${tick(!r.ok)}", 'G3-496', 1],
  ['a summary on level 2', FACTORY, "const sum = lv === 3 ? cream(", "const sum = lv >= 2 ? cream(", 'G3-496', 2],
  ['no summary on level 3', FACTORY, "const sum = lv === 3 ? cream(", "const sum = lv === 9 ? cream(", 'G3-496', 3],
  // The Main Idea of Each Paragraph (G3-497)
  ['the statements in the order of the paragraphs', FACTORY, "if (seq !== '1234' && seq !== '4321' && rows[4].n !== 0) break;", ORDERED4, 'G3-497', 1],
  ['a box keyed to another paragraph', FACTORY, "numBox(r.n || '', key, 34)", "numBox(r.n ? (r.n % 4) + 1 : '', key, 34)", 'G3-497', 1],
  ['both right headings in the same place', FACTORY, "if (at[0] === at[1]) at[1] = (at[1] + 1) % 3;", "at[1] = at[0];", 'G3-497', 1],
  ['no heading lines on the hardest paragraph page', FACTORY, "(lv === 3 ? `<div data-lcs-headline>", "(lv === 9 ? `<div data-lcs-headline>", 'G3-497', 3],
  // the writing lines (the review of 2026-11-16)
  ['a writing line lower than wide-ruled paper', FACTORY, "2: { font: 14.6, lh: 1.33, rowH: 30 }", "2: { font: 14.6, lh: 1.33, rowH: 22 }", 'G3-494', 2],
  ['the answer lines in two columns (short lines)', FACTORY, "below = stack(cells);", "below = grid(cells);", 'G3-494', 2],
  ['a first word in big letters across the line', FACTORY, "font:800 15.5px/1 'Nunito',sans-serif;color:${T.ink}\">${esc(starter)}", "font:800 24px/1 'Nunito',sans-serif;color:${T.ink}\">${esc(starter)}", 'G3-495', 2],
  ['no wrong question about the paragraph of the sentence', FACTORY, "shuffle([a.lure, rng.pick(t.ask.filter((b) => b !== a)).q], rng)", "shuffle(t.ask.filter((b) => b !== a).map((b) => b.q), rng).slice(0, 2)", 'G3-495', 1],
  // the bank's own check (it runs when the factory loads)
  ['bank: a wrong question that is the right question of another sentence', BANK, '"lure": "What do krill look like?"', '"lure": "What does a blue whale eat?"', 'G3-495', 1],
  ['bank: a proof that is no sentence of its paragraph', BANK, '"proof": "At birth it is already about 25 feet long."', '"proof": "At birth it is about 25 feet long."', 'G3-494', 2],
  ['bank: an answer sentence that is not in the text', BANK, '"answer": "Blue whales swim in oceans all around the world."', '"answer": "Blue whales swim in all the oceans of the world today."', 'G3-495', 1],
  ['bank: a question that does not begin with its question word', BANK, '"q": "Why is a blue whale not a fish?"', '"q": "How is a blue whale not a fish?"', 'G3-495', 1],
  ['bank: a sentence of thirty words', BANK, '"Blue whales swim in oceans all around the world."', '"Blue whales swim in every ocean of the world, in the cold seas near the ice and in the warm seas far away, alone or in small groups, all year long."', 'G3-497', 2],
  ['bank: two main-idea sentences that read the same', BANK, '"narrow": "A blue whale has baleen instead of teeth."', '"narrow": "Many animals live in the ocean."', 'G3-496', 1],
  ['bank: the left-over statement fits a paragraph', BANK, '"focusLure": "why blue whales are in danger"', '"focusLure": "how a blue whale breathes"', 'G3-497', 1],
  ['bank: a key detail that is the sentence not in the text', BANK, '"notInText": "Blue whales hunt seals and big fish with sharp teeth."', '"notInText": "A calf drinks milk from its mother and grows very fast."', 'G3-496', 1],
];
const ORIG = { [FACTORY]: fs.readFileSync(FACTORY, 'utf8'), [BANK]: fs.readFileSync(BANK, 'utf8') };
let caught = 0;
try {
  for (const [name, file, find, repl, type, level] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    const hits = src.split(find).length - 1;
    if (file === FACTORY ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
    fs.writeFileSync(file, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=' + type, '--levels=' + level, '--locales=en', '--seeds=6'], { cwd: WG, encoding: 'utf8' });
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR|Error/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^(?:FAIL|ERROR) +\S+ \S+ \S+ \S+: /, '').slice(0, 120)) : ''));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
