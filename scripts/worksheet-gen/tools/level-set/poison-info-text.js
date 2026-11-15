#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/info-text.js (G1-575 Read the Facts, G1-576 Main Topic and Key Details,
 * G1-577 Use the Text Features) can fail: each planted fault changes the factory (or the text bank), renders the page
 * it concerns, and expects the page's own check or the bank's check to report it. The file is restored after every
 * fault (and on any error). A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-info-text.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'info-text.js');
const BANK = path.join(WG, 'data', 'literacy', 'info-texts.en.json');
// [name, file, text to find (once), its replacement, type, level]
const FAULTS = [
  ['a sentence starter on the hardest page', FACTORY, 'starter: lv === 2 ? q.starter : null', 'starter: q.starter', 'G1-575', 3],
  ['no sentence starter on the middle page', FACTORY, 'starter: lv === 2 ? q.starter : null', 'starter: null', 'G1-575', 2],
  ['the right answer always in the first place', FACTORY, 'choices(placed(q.choices[q.correct], wrong, at[n]), at[n], key, { font: 21 })', 'choices(placed(q.choices[q.correct], wrong, 0), 0, key, { font: 21 })', 'G1-575', 1],
  ['questions against the order of the text', FACTORY, '.sort((a, b) => a.q.sentence - b.q.sentence)', '.sort((a, b) => b.q.sentence - a.q.sentence)', 'G1-575', 2],
  ['a picture that does not load', FACTORY, 'src="${fileUri(t.picture.theme, t.picture.noun)}" alt="" style="width:132px', 'src="missing.png" alt="" style="width:132px', 'G1-576', 2],
  ['bold words printed like the text', FACTORY, 'font-weight:800;-webkit-text-stroke:0.7px', 'font-weight:700;-webkit-text-stroke:0px', 'G1-577', 2],
  ['a glossary on the facts page', FACTORY, "glossary: mode === 'features'", 'glossary: true', 'G1-575', 2],
  ['no glossary on the features page', FACTORY, "glossary: mode === 'features'", 'glossary: false', 'G1-577', 2],
  ['three key detail boxes on the easy page', FACTORY, '1: { font: 23, rowH: 66, details: 1, rows: 3 }', '1: { font: 23, rowH: 30, details: 3, rows: 2 }', 'G1-576', 1],
  ['the caption task on the middle page', FACTORY, 'if (lv === 3) {', 'if (lv >= 2) {', 'G1-577', 2],
  ['the two heading questions side by side', FACTORY, "if (!fs.some((x, i) => i && x.kind === 'heading' && fs[i - 1].kind === 'heading')) break;", "if (fs.some((x, i) => i && x.kind === 'heading' && fs[i - 1].kind === 'heading')) break;", 'G1-577', 2],
  ['a text too big for its page', FACTORY, '2: { font: 21, rowH: 58, qFont: 20 }', '2: { font: 30, rowH: 58, qFont: 20 }', 'G1-575', 2],
  ['a page half empty', FACTORY, '1: { font: 22, rowH: 0, qFont: 21, pad: 7 }', '1: { font: 13, rowH: 0, qFont: 14, pad: 1 }', 'G1-575', 1],
  ['one answer printed twice', FACTORY, 'const out = wrong.slice(); out.splice(at, 0, right); return out;', 'const out = [wrong[0], wrong[0]]; out.splice(at, 0, right); return out;', 'G1-577', 1],
  ['the second picture is the first again', FACTORY, 'const p2 = t.picture2;', 'const p2 = t.picture;', 'G1-577', 3],
  ['a writing line wider than its card', FACTORY, "line({ w: inner, h: d.rowH, answer: key ? x.answer : null })", "line({ w: inner + 60, h: d.rowH, answer: key ? x.answer : null })", 'G1-577', 2],
  // the bank's own check (it runs when the factory loads)
  ['bank: a question whose sentence is not in the text', BANK, '"sentence": 1,', '"sentence": 41,', 'G1-575', 2],
  ['bank: a bold word that the glossary does not hold', BANK, '"word": "tongue",', '"word": "tooth",', 'G1-577', 2],
  ['bank: a heading question that asks for no heading of the text', BANK, '"answer": "What Frogs Eat"', '"answer": "What Frogs Drink"', 'G1-577', 2],
  ['bank: a starter that does not begin the answer sentence', BANK, '"starter": "Many frogs live near",', '"starter": "Frogs are found near",', 'G1-575', 2],
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
