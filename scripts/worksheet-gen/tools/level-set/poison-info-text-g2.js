#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/info-text-g2.js (G2-519 Main Topic and Paragraphs, G2-520 Glossary and
 * Index) can fail: each planted fault changes the factory (or the text bank), renders the page it concerns, and
 * expects the page's own check or the bank's check to report it. The file is restored after every fault (and on any
 * error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-info-text-g2.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'info-text-g2.js');
const BANK = path.join(WG, 'data', 'literacy', 'info-texts.en.json');
// [name, file, text to find, its replacement, type, level]
const FAULTS = [
  ['the paragraph page prints the title (the main topic)', FACTORY, "(full ? `<div data-lcs-title style=", "(true ? `<div data-lcs-title style=", 'G2-519', 1],
  ['the paragraph page prints the headings', FACTORY, "(full ? `<div data-lcs-heading style=", "(true ? `<div data-lcs-heading style=", 'G2-519', 2],
  ['the statements in the order of the paragraphs', FACTORY, "if (seq !== '123' && seq !== '321' && rows[3].n !== 0) break;", "rows = [...t.parts.map((p, i) => ({ n: i + 1, text: p.focus })), { n: 0, text: t.focusLure }]; break;", 'G2-519', 1],
  ['a box keyed to another paragraph', FACTORY, "numBox(r.n || '', key)", "numBox(r.n ? (r.n % 3) + 1 : '', key)", 'G2-519', 1],
  ['no heading lines on the hardest paragraph page', FACTORY, "(lv === 3 ? `<div style=\"display:flex;align-items:flex-end;gap:8px\">", "(lv === 9 ? `<div style=\"display:flex;align-items:flex-end;gap:8px\">", 'G2-519', 3],
  ['a text too big for the page', FACTORY, 'focus: { 1: { font: 19.5 }', 'focus: { 1: { font: 27 }', 'G2-519', 1],
  ['a page half empty', FACTORY, 'focus: { 1: { font: 19.5 }', 'focus: { 1: { font: 14.6 }', 'G2-519', 1],
  ['no bold words on the features page', FACTORY, 'if (full) { const b = t.bold[i];', 'if (false) { const b = t.bold[i];', 'G2-520', 2],
  ['one picture only on the features page', FACTORY, "${full ? fig(t.pictures[1], 2, true) : ''}", '', 'G2-520', 2],
  ['no glossary and no index', FACTORY, 'const extras = full ? `<div style="margin-top:6px;', 'const extras = false ? `<div style="margin-top:6px;', 'G2-520', 2],
  ['small print', FACTORY, '2: { font: 15, n: 6, rowH: 33 }', '2: { font: 12, n: 6, rowH: 33 }', 'G2-520', 2],
  ['two heading questions side by side on the circle level', FACTORY, 'fs = [h[0], o[0], o[1], h[1], o[2], o[3]]; }', 'fs = [h[0], h[1], o[0], o[1], o[2], o[3]]; }', 'G2-520', 1],
  ['six questions on the hardest features page', FACTORY, "if (d.n === 4) fs = [rng.pick(", "if (d.n === 44) fs = [rng.pick(", 'G2-520', 3],
  ['no entry to add on the hardest features page', FACTORY, "        if (lv === 3) {\n          cells.push(", "        if (lv === 9) {\n          cells.push(", 'G2-520', 3],
  // the bank's own check (it runs when the factory loads)
  ['bank: an index word on two pages', BANK, '"They chew through small trees to cut them down."', '"They chew through small trees with their teeth."', 'G2-520', 2],
  ['bank: an index word in a caption', BANK, '"caption": "A beaver can cut through a log like this one."', '"caption": "A beaver can cut a log with its teeth."', 'G2-520', 2],
  ['bank: a bold word that the glossary does not hold', BANK, '"word": "gnaw",', '"word": "chew",', 'G2-520', 2],
  ['bank: a bold word on the wrong page', BANK, '"This wall is called a dam."', '"This wall is webbed."', 'G2-520', 2],
  ['bank: a heading question that asks for no heading', BANK, '"answer": "A Body Made for Swimming"', '"answer": "A Body Made for Diving"', 'G2-520', 2],
  ['bank: an index question with the wrong page', BANK, '"q": "On which page can you read about teeth?",\n     "answer": "2"', '"q": "On which page can you read about teeth?",\n     "answer": "3"', 'G2-520', 2],
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
