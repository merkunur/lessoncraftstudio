#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/info-text-g3c.js (G3-500 Events in Order, G3-501 Cause and Effect) can
 * fail: each planted fault changes the factory (or the text bank), renders the page it concerns, and expects the
 * page's own check or the bank's check to report it. The file is restored after every fault (and on any error).
 * A dev tool: never run it while pages are generated.
 *
 *   node tools/level-set/poison-info-text-g3c.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'info-text-g3c.js');
const BANK = path.join(WG, 'data', 'literacy', 'info-texts.en.json');
// [name, file, text to find, its replacement, type, level]
const FAULTS = [
  // Events in Order (G3-500)
  ['the events stand in the order of the text', FACTORY, "order = shuffle([0, 1, 2, 3], rng); const s = order.join(''); if (s !== '0123' && s !== '3210') break; }", "order = [0, 1, 2, 3]; break; }", 'G3-500', 1],
  ['a box keyed to another place', FACTORY, "${numBox(i + 1, key)}<span style=\"font:700 14.5px/1.25 'Nunito',sans-serif;color:${T.ink}\">${esc(c.chain[i])}</span>", "${numBox(((i + 1) % 4) + 1, key)}<span style=\"font:700 14.5px/1.25 'Nunito',sans-serif;color:${T.ink}\">${esc(c.chain[i])}</span>", 'G3-500', 1],
  ['the question about the first event keyed to the third', FACTORY, "c.chain[1], [c.chain[2], c.chain[3]], 0)", "c.chain[2], [c.chain[1], c.chain[3]], 0)", 'G3-500', 1],
  ['both right answers in the same place', FACTORY, "at[1] = (at[0] + 1 + rng.int(0, 1)) % 3;", "at[1] = at[0];", 'G3-500', 1],
  ['the task does not say what the chain tells', FACTORY, "label(story ? 'Write the <b data-lcs-topic>four main events of the story</b> in order.' : `Write in order the four events or steps that tell <b data-lcs-topic>${esc(c.topic)}</b>, one on each line.`, 15)", "label('Write the four most important events in order, one on each line.', 15)", 'G3-500', 2],
  ['the lines do not begin with the order words', FACTORY, "const STARTS = ['First,', 'Next,', 'Then,', 'Finally,'];", "const STARTS = ['Then,', 'Then,', 'Then,', 'Then,'];", 'G3-500', 2],
  ['no arrows between the lines', FACTORY, "${i ? ARROW : ''}", "", 'G3-500', 2],
  ['no lines to explain on the hardest level', FACTORY, "const why = lv === 3 ? cream(", "const why = lv === 9 ? cream(", 'G3-500', 3],
  ['small print', FACTORY, "chain: { 1: { font: 14.6, lh: 1.32 }", "chain: { 1: { font: 12.5, lh: 1.32 }", 'G3-500', 1],
  // Cause and Effect (G3-501)
  ['every effect stands in the place of its cause', FACTORY, "order = shuffle([0, 1, 2, 3], rng); if (order.filter((x, i) => x === i).length === 0) break; }", "order = [0, 1, 2, 3]; break; }", 'G3-501', 1],
  ['a box keyed to another effect', FACTORY, "${numBox(letterOf(i), key)}", "${numBox(letterOf((i + 1) % 4), key)}", 'G3-501', 1],
  ['every card gives the cause', FACTORY, "const give = shuffle(lv === 2 ? ['cause', 'cause', 'effect', 'effect'] : ['cause', 'effect', rng.pick(['cause', 'effect'])], rng);", "const give = ['cause', 'cause', 'cause', 'cause'];", 'G3-501', 2],
  ['a card asks for the half it gives', FACTORY, "starter: miss === 'cause' ? 'Cause:' : 'Effect:',", "starter: miss === 'cause' ? 'Effect:' : 'Cause:',", 'G3-501', 2],
  ['no line for the one sentence on the hardest level', FACTORY, "(lv === 3 ? `<div data-lcs-oneline>", "(lv === 9 ? `<div data-lcs-oneline>", 'G3-501', 3],
  ['a low writing line', FACTORY, "2: { font: 14.6, lh: 1.32, rowH: 30 }, 3: { font: 14.5, lh: 1.3, rowH: 28 } },", "2: { font: 14.6, lh: 1.32, rowH: 21 }, 3: { font: 14.5, lh: 1.3, rowH: 28 } },", 'G3-501', 2],
  // the bank's own check (it runs when the factory loads)
  ['paragraph numbers beside the task that asks for 1 to 4', FACTORY, "numbers: !(mode === 'chain' && lv === 1)", "numbers: true", 'G3-500', 1],
  ['one line only for the one sentence', FACTORY, "${rule({ w: inner, h: d.rowH })}</div>` : ''), 4); });", "</div>` : ''), 4); });", 'G3-501', 3],
  ['bank: an effect that stands twice', BANK, '"effect": "Lighthouses no longer need keepers."', '"effect": "People built tall towers with a bright light."', 'G3-501', 1],
  ['bank: an event that the text does not tell', BANK, '"It dives again."', '"It jumps high."', 'G3-500', 1],
  ['bank: a sample sentence without because or so', BANK, '"explain": "The Pony Express closed because a telegraph could send a message in minutes."', '"explain": "The Pony Express closed. A telegraph could send a message in minutes."', 'G3-500', 3],
  ['bank: a chain that does not say what it tells', BANK, '"topic": "how a blue whale breathes"', '"topic": ""', 'G3-500', 2],
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
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^(?:FAIL|ERROR) +\S+ \S+ \S+ \S+: /, '').slice(0, 110)) : ''));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
