#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/info-text-g3b.js (G3-498 Use the Search Tools, G3-499 Which Search
 * Tool?) can fail: each planted fault changes the factory (or the text bank), renders the page it concerns, and
 * expects the page's own check or the bank's check to report it. The file is restored after every fault (and on any
 * error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-info-text-g3b.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'info-text-g3b.js');
const BANK = path.join(WG, 'data', 'literacy', 'info-texts.en.json');
// [name, file, text to find, its replacement, type, level]
const FAULTS = [
  // the book
  ['the index sends every word to page 2', FACTORY, "data-lcs-pages=\"${pagesOf(t, w).join(',')}\"", "data-lcs-pages=\"2\"", 'G3-498', 1],
  ['no key word in bold', FACTORY, "strong(k.bold, `data-lcs-keyword=\"${i + 2}\"`)", "esc(k.bold)", 'G3-498', 1],
  ['no sidebar', FACTORY, "const side = b.sidebar.page === i + 2 ?", "const side = b.sidebar.page === 99 ?", 'G3-498', 1],
  ['the table of contents names the wrong pages', FACTORY, "[...t.parts.map((p, i) => [p.heading, i + 2]), ['Glossary and Index', 6]]", "[...t.parts.map((p, i) => [p.heading, i + 3]), ['Glossary and Index', 6]]", 'G3-498', 1],
  ['small print', FACTORY, "find: { 1: { font: 14.5, lh: 1.25 }", "find: { 1: { font: 12, lh: 1.25 }", 'G3-498', 1],
  ['a book too big for the page', FACTORY, "find: { 1: { font: 14.5, lh: 1.25 }", "find: { 1: { font: 17, lh: 1.25 }", 'G3-498', 1],
  // Use the Search Tools (G3-498)
  ['every question names the index', FACTORY, "<b data-lcs-use=\"${x.tool}\"", "<b data-lcs-use=\"index\"", 'G3-498', 2],
  ['a low writing line', FACTORY, "rule({ w: (inner - 14) / 2 - 24, h: 28,", "rule({ w: (inner - 14) / 2 - 24, h: 20,", 'G3-498', 2],
  ['a tool box keyed to another tool', FACTORY, "</div>${toolBox(TOOLS[x.tool][0], key)}</div>`, 3));", "</div>${toolBox('C', key)}</div>`, 3));", 'G3-498', 3],
  ['the key-word question of level 3 names its feature', FACTORY, ".replace(/^Which word is printed in bold on page (\\d)\\?$/, 'Which word on page $1 stands out from all the other words?')", "", 'G3-498', 3],
  ['level 3 asks a chapter question (the contents or a heading answer it)', FACTORY, "['index', 'glossary', 'sidebar', 'keyword'].map((tool) => rng.pick(byTool(tool)))", "['index', 'glossary', 'sidebar', 'contents'].map((tool) => rng.pick(byTool(tool)))", 'G3-498', 3],
  ['a question of level 3 names the glossary', FACTORY, ".replace('Which word in the glossary means', 'Which word means')", "", 'G3-498', 3],
  // Which Search Tool? (G3-499)
  ['a box keyed to another tool', FACTORY, "${numBox(TOOLS[x.tool][0], key)}<span style=\"font:700 14.5px/1.25", "${numBox('C', key)}<span style=\"font:700 14.5px/1.25", 'G3-499', 1],
  ['the wishes in the order of the bank', FACTORY, "if (rows.map((x) => TOOLS[x.tool][0]).join('') !== 'GCISK') break; }", "rows = b.wants.slice(); break; }", 'G3-499', 1],
  ['a tool is missing from the list of tools', FACTORY, "Object.values(TOOLS).map(([l, name]) =>", "Object.values(TOOLS).slice(1).map(([l, name]) =>", 'G3-499', 1],
  ['two questions for one tool', FACTORY, "const three = shuffle(['contents', 'index', 'glossary', 'sidebar', 'heading'], rng).slice(0, d.n);", "const three = ['index', 'index', 'glossary'];", 'G3-499', 3],
  // the bank's own check (it runs when the factory loads)
  ['bank: an index question keyed to other pages', BANK, '"answer": "3 and 4"', '"answer": "3 and 5"', 'G3-498', 1],
  ['bank: a chapter question keyed to another chapter', BANK, '"answer": "How the Light Works"', '"answer": "Lighthouses Today"', 'G3-498', 1],
  ['bank: a key word that does not stand on its page', BANK, '"bold": "coasts"', '"bold": "harbors"', 'G3-498', 1],
  ['bank: an answer the sidebar does not give', BANK, '"answer": "a lighthouse"', '"answer": "a prison"', 'G3-498', 1],
  ['bank: a wish keyed to other pages', BANK, '"answer": "3, 4, and 5"', '"answer": "3 and 4"', 'G3-499', 1],
  ['bank: a wish for the page of a chapter (a heading grants it too)', BANK, '"want": "You want to see the names of all the chapters in one place."', '"want": "You want to know on which page a chapter begins."', 'G3-499', 1],
  ['bank: a wish for a heading (the contents tell the same)', BANK, '"tool": "keyword",\n      "want"', '"tool": "heading",\n      "want"', 'G3-499', 1],
  // review en.review-1119-read2: the glossary in ABC order, read down each of its two columns
  ['the glossary in the order of the pages', FACTORY, 'const gloss = glossOrder(b.keys).map(', 'const gloss = b.keys.map(', 'G3-498', 2],
  ['the glossary in ABC order across its rows', FACTORY, 'grid-template-rows:repeat(2,auto);grid-auto-flow:column;', '', 'G3-498', 2],
];
const ORIG = { [FACTORY]: fs.readFileSync(FACTORY, 'utf8'), [BANK]: fs.readFileSync(BANK, 'utf8') };
let caught = 0;
try {
  for (const [name, file, find, repl, type, level] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    let needle = find;
    if (file === BANK && find.includes('\n')) { const m = new RegExp(find.split('\n').map((x) => x.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\n\\s*')).exec(src); if (m) needle = m[0]; }
    const hits = src.split(needle).length - 1;
    if (file === FACTORY ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
    fs.writeFileSync(file, src.replace(needle, () => (needle === find ? repl : needle.replace('"keyword"', '"heading"'))));
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
