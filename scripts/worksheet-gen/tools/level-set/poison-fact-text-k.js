#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/fact-text-k.js (K-645 Find the Facts, K-646 What Is It All About?, K-647 Pictures That Teach, K-648 First, Then) can
 * fail: each planted fault changes the factory (or the text bank), renders the page it concerns, and expects the
 * page's own check or the bank's check to report it. The file is restored after every fault (and on any error).
 * A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-fact-text-k.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'fact-text-k.js');
const BANK = path.join(WG, 'data', 'literacy', 'info-texts.en.json');
// [name, file, text to find, its replacement, type, level]
const FAULTS = [
  ['the right picture always first', FACTORY, 'const at = placesFor(4, rng);', 'const at = [0, 0, 0, 0];', 'K-645', 1],
  ['the right pictures as a staircase', FACTORY, 'const at = placesFor(4, rng);', 'const at = [0, 1, 2, 0];', 'K-645', 1],
  ['pictures too small to see', FACTORY, 'facts: { 1: { font: 27, pic: 88 }', 'facts: { 1: { font: 27, pic: 40 }', 'K-645', 1],
  ['pictures too big for their row', FACTORY, 'facts: { 1: { font: 27, pic: 88 }', 'facts: { 1: { font: 27, pic: 150 }', 'K-645', 1],
  ['small print', FACTORY, 'pic: 88 }, 2: { font: 27 }, 3: { font: 26 } },', 'pic: 88 }, 2: { font: 16 }, 3: { font: 26 } },', 'K-645', 2],
  ['print too big for the page', FACTORY, 'pic: 88 }, 2: { font: 27 }, 3: { font: 26 } },', 'pic: 88 }, 2: { font: 60 }, 3: { font: 26 } },', 'K-645', 2],
  ['three questions to draw on the hardest page', FACTORY, 'shuffle(t.questions, rng).slice(0, 2).sort(', 'shuffle(t.questions, rng).slice(0, 3).sort(', 'K-645', 3],
  ['questions against the order of the text', FACTORY, 'const qs = lv === 2 ? t.questions :', 'const qs = lv === 2 ? t.questions.slice().reverse() :', 'K-645', 2],
  ['a picture that does not load', FACTORY, 'src="${fileUri(t.picture.theme, t.picture.noun)}" alt="" style="flex:0 0 auto;width:156px', 'src="missing.png" alt="" style="flex:0 0 auto;width:156px', 'K-646', 2],
  ['no big picture of the topic', FACTORY, 'flex:0 0 auto;width:156px;height:156px', 'flex:0 0 auto;width:60px;height:60px', 'K-645', 2],
  ['the main topic is a detail', FACTORY, 'pictures(placed(t.topic.right, shuffle(t.topic.wrong, rng), at), at, key, d.pic)', 'pictures(placed(t.topic.wrong[0], [t.topic.right, t.topic.wrong[1]], at), at, key, d.pic)', 'K-646', 2],
  ['the two right pictures one under the other', FACTORY, 'if (at2 === at) at2 = (at2 + 1 + rng.int(0, 1)) % 3;', 'at2 = at;', 'K-646', 1],
  ['a writing line on the middle page', FACTORY, "${lv === 3 ? row(300, 50) : ''}", '${row(300, 50)}', 'K-646', 2],
  ['one box to draw two things in', FACTORY, 'const det = t.details.map((s) => t.questions.find((q) => q.sentence === s));', 'const det = t.details.slice(0, 1).map((s) => t.questions.find((q) => q.sentence === s));', 'K-646', 2],
  ['a drawing box too small to draw in', FACTORY, 'flex:1 1 auto;min-height:96px;display:flex', 'flex:0 0 40px;height:40px;display:flex', 'K-645', 2],
  ['matching: a picture opposite its own sentence', FACTORY, 'if (rowsP.every((x, i) => x.n !== rowsS[i].n)) break;', 'rowsP = rowsS.slice(); break;', 'K-647', 2],
  ['matching: four sentences on the easy page', FACTORY, 'pictures: { 1: { n: 3, font: 27, pic: 112 }', 'pictures: { 1: { n: 4, font: 27, pic: 112 }', 'K-647', 1],
  ['matching: a missing picture that leaves two answers', FACTORY, 'rng.pick(t.match.leaveOut.filter((n) => rowsS.some((x) => x.n === n)))', 'rng.pick([1, 2, 3, 4].filter((n) => !t.match.leaveOut.includes(n)).concat(t.match.leaveOut.length === 4 ? [9] : []))', 'K-647', 3],
  ['matching: no empty box on the hard page', FACTORY, '3: { n: 4, font: 26, pic: 100, missing: true } },', '3: { n: 4, font: 26, pic: 100 } },', 'K-647', 3],
  ['matching: small print', FACTORY, '2: { n: 4, font: 26, pic: 100 }, 3: { n: 4, font: 26', '2: { n: 4, font: 15, pic: 100 }, 3: { n: 4, font: 26', 'K-647', 2],
  ['matching: pictures too big for their rows', FACTORY, '2: { n: 4, font: 26, pic: 100 }, 3: { n: 4, font: 26', '2: { n: 4, font: 26, pic: 230 }, 3: { n: 4, font: 26', 'K-647', 2],
  ['first-then: the cut-outs already in the right order', FACTORY, "if (order[0][0] !== 'first' || order[1][0] !== 'then') break;", "order = [['first', c.first], ['then', c.then], ['other', c.other]]; break;", 'K-648', 1],
  ['first-then: Then on the left', FACTORY, "${slot('first', c.first, c.firstWord)}${arrow}${slot('then', c.then, c.thenWord)}", "${slot('then', c.then, c.thenWord)}${arrow}${slot('first', c.first, c.firstWord)}", 'K-648', 2],
  ['first-then: a cut-out that does not fit its box', FACTORY, 'data-lcs-glue style="flex:0 0 auto;align-self:center;width:${side}px;height:${side}px;', 'data-lcs-glue style="flex:0 0 auto;align-self:center;width:${side - 40}px;height:${side - 40}px;', 'K-648', 1],
  ['first-then: writing lines on the middle page', FACTORY, '(lv === 3 ? `<div data-lcs-line style="line-height:0;align-self:center">', '(lv >= 2 ? `<div data-lcs-line style="line-height:0;align-self:center">', 'K-648', 2],
  ['bank: a left-over picture that is a picture of the text', BANK, '"noun": "carrot"\n    },\n    "firstWord": "flowers"', '"noun": "bee"\n    },\n    "firstWord": "flowers"', 'K-648', 1],
  // the bank's own check (it runs when the factory loads)
  ['bank: a text of five sentences', BANK, '"A cow eats grass.",', '"A cow eats grass.",\n    "A cow is big.",', 'K-645', 1],
  ['bank: a wrong picture that the text tells about', BANK, '"noun": "bread"', '"noun": "milk"', 'K-645', 1],
  ['bank: two questions answered by one picture', BANK, '"noun": "cheese"', '"noun": "grass"', 'K-645', 1],
  ['bank: a picture the library does not have', BANK, '"noun": "calf"', '"noun": "calf_x"', 'K-645', 1],
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
