#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/two-texts-k.js (K-649 Two Texts, One Topic) can fail: each planted
 * fault changes the factory (or the text bank), renders the page it concerns, and expects the page's own check or the
 * bank's check to report it. The file is restored after every fault (and on any error). A dev tool: never run it
 * while pages are generated.
 *
 *   node tools/level-set/poison-two-texts-k.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'two-texts-k.js');
const BANK = path.join(WG, 'data', 'literacy', 'info-texts.en.json');
// [name, file, text to find, its replacement, type, level, draws (8 unless the fault shows on one text only)]
const FAULTS = [
  ["two pictures of one place side by side", FACTORY, "if (!order.some((x, i) => i && x[0] === order[i - 1][0])) break; }", "order = all; break; }", "K-649", 1],
  ["a box to glue into is filled on the child page", FACTORY, "${key ? `<span data-lcs-key-pic=", "${true ? `<span data-lcs-key-pic=", "K-649", 1],
  ["one box only in each place", FACTORY, "<div style=\"display:flex;gap:8px\">${list.map(slot).join('')}</div>", "<div style=\"display:flex;gap:8px\">${list.slice(0, 1).map(slot).join('')}</div>", "K-649", 1],
  ["five pictures to cut out", FACTORY, "order.map(([k, c]) => `<span data-lcs-cutpic=", "order.slice(1).map(([k, c]) => `<span data-lcs-cutpic=", "K-649", 1],
  ["small print", FACTORY, "1: { font: 25, slot: 100, pic: 88 }", "1: { font: 18, slot: 100, pic: 88 }", "K-649", 1],
  ["print too big for one line", FACTORY, "2: { font: 23 }", "2: { font: 44 }", "K-649", 2],
  ["no line to write on under the drawings of level 3", FACTORY, "(lv === 3 ? row(196, 72, list[0].label, key) : '')", "(lv === 9 ? row(196, 72, list[0].label, key) : '')", "K-649", 3],
  ["a place without the picture of its text", FACTORY, "${pics.map((p) => img(p, 42)).join('')}<span", "<span", "K-649", 2],
  ["the second text beside the first", FACTORY, "textBox(p.a, 'a', d.font) + textBox(p.b, 'b', d.font) +", "`<div style=\"display:flex;gap:6px\">${textBox(p.a, 'a', 12)}${textBox(p.b, 'b', 12)}</div>` +", "K-649", 2],
  ["bank: a thing said to be in both texts stands in one", BANK, "\"A sheep eats grass.\"", "\"A sheep eats hay.\"", "K-649", 1],
  ["bank: a thing of the first text only stands in the second too", BANK, "\"It may bark at the mail truck.\"", "\"It may bark at a mouse.\"", "K-649", 1],
  ["bank: a sentence too long for one line", BANK, "\"Stars shine too.\"", "\"Stars shine too, and they are very far away from us.\"", "K-649", 2],
];
const ORIG = { [FACTORY]: fs.readFileSync(FACTORY, 'utf8'), [BANK]: fs.readFileSync(BANK, 'utf8') };
let caught = 0;
try {
  for (const [name, file, find, repl, type, level, draws = 8] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    const hits = src.split(find).length - 1;
    if (hits !== 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
    fs.writeFileSync(file, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=' + type, '--levels=' + level, '--locales=en', '--seeds=' + draws], { cwd: WG, encoding: 'utf8' });
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR|Error/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^(?:FAIL|ERROR) +\S+ \S+ \S+ \S+: /, '').slice(0, 120)) : ''));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
