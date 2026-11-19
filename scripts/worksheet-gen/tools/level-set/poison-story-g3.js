#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/story-g3.js (G3-504 The Central Message, G3-506 Character Traits,
 * G3-508 Get Ready to Talk About a Story, G3-509 Talk About the Story) and the story option of info-text-g3.js
 * (G3-502, G3-503) can fail: each planted fault changes a factory (or the story bank), renders the page it concerns,
 * and expects the page's own check or the bank's check to report it. The file is restored after every fault (and on
 * any error). A dev tool: never run it while pages are generated. A fault marked 'key' is a fault of the answer key: its
 * keys are rendered (this script with --render-key, seeded as probe-types seeds its pages) and checked.
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
// [name, file, text to find, its replacement, type, level, 'key' for a fault of the answer key]
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
  // the fix round of 2026-11-19: the key of "copy the sentence that shows it" names every sentence that shows the trait
  ['the key leaves out the other sentences that show a trait', FACTORY, 'also.map((a) => `<span data-lcs-alsotext>', 'also.slice(0, 1).map((a) => `<span data-lcs-alsotext>', 'G3-506', 2, 'key'],
  ['the other sentences of the key too big for their line', FACTORY, "Also right: ` + also.map(", "Also right: ` + also.map((a) => a + ' ' + a).map(", 'G3-506', 2, 'key'],
  ['bank: a sentence named as showing a trait too that is no sentence of the story', BANK, '"also": [\n      "The lion laughed."\n', '"also": [\n      "The lion laughed loudly."\n', 'G3-506', 2],
  // the fix round of review en.review-1119-read
  ['bank: a sentence of the story says its message almost word for word', BANK, '"\\"But I kept my promise.\\""', '"\\"Now you know that even a little friend can be a great help.\\""', 'G3-504', 1],
  ['bank: a word of the list stands in the story', BANK, '"Then she flew away, pleased with her plan."', '"Then she flew away, pleased with her clever plan."', 'G3-506', 1],
  ['the key\'s line does not grow for a long list of other sentences', FACTORY, 'if (!px) { px = 10; hk = Math.ceil(', 'if (!px) { px = 10; hk = h || Math.ceil(', 'G3-506', 3, 'key'],
  ['the key\'s long list of other sentences in small print', FACTORY, 'if (!px) { px = 10; hk =', 'if (!px) { px = 8; hk =', 'G3-506', 2, 'key'],
  // review en.review-1119-read2: a story page prints typographic quotes and apostrophes
  ['a story page with straight quotes', FACTORY, 'bodyHtml: _parts3.curly(`<div data-ws-content data-lcs-story3=', 'bodyHtml: String(`<div data-ws-content data-lcs-story3=', 'G3-504', 1],
  ['an evidence page of a story with straight quotes', FACTORY3, 'bodyHtml: (story ? curly : String)(`<div data-ws-content data-lcs-info3=', 'bodyHtml: (story ? String : String)(`<div data-ws-content data-lcs-info3=', 'G3-502', 1],
];
/** --render-key <type> <level>: the answer keys of six copies (seeded as probe-types seeds its pages), each checked by
 *  the type's own check; prints FAIL lines and exits 1 when one fails */
async function renderKeys(id, level) {
  const url = require('url');
  const puppeteer = require('puppeteer');
  const { loadType } = require('../../lib/load-types.js');
  const { buildPage } = require('../../page/shell.js');
  const { makeRng, instanceSeed } = require('../../lib/rng.js');
  const type = loadType(id), browser = await puppeteer.launch({ headless: 'new' }), page = await browser.newPage();
  const OUT = path.join(WG, 'out', 'probe'); fs.mkdirSync(OUT, { recursive: true });
  let bad = 0;
  try {
    for (let v = 1; v <= 6; v++) {
      const rng = makeRng(instanceSeed({ typeId: type.id, theme: null, difficulty: level, seedEpoch: 1, variant: v + 1, unit: null }));
      const built = type.build({ theme: null, difficulty: level, locale: 'en', unit: null }, { rng, variant: v, seedVariant: v + 1, answerKey: true });
      const file = path.join(OUT, `${id}-en-L${level}-poison-key-${v}.html`);
      fs.writeFileSync(file, buildPage({ title: type.i18n.en.title, instruction: type.i18n.en.instruction, bodyHtml: built.bodyHtml, locale: 'en', pageSize: 'letter' }));
      await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 1 });
      await page.goto(url.pathToFileURL(file).href, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      const fails = await type.verify(page);
      fs.rmSync(file, { force: true });
      if (fails.length) { bad++; console.log(`FAIL  ${id} en L${level} #${v} key: ` + fails.slice(0, 4).join(' · ')); }
    }
  } finally { await browser.close(); }
  process.exit(bad ? 1 : 0);
}
if (process.argv[2] === '--render-key') renderKeys(process.argv[3], Number(process.argv[4])).catch((e) => { console.error('ERROR ' + e.message); process.exit(1); });
else runFaults();
function runFaults() {
const ORIG = {}; for (const f of [FACTORY, FACTORY3, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
let caught = 0;
try {
  for (const [name, file, find, repl, type, level, of] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    const hits = src.split(find).length - 1;
    if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
    fs.writeFileSync(file, src.replace(find, () => repl));
    const r = of === 'key' ? spawnSync(process.execPath, [__filename, '--render-key', type, String(level)], { cwd: WG, encoding: 'utf8' })
      : spawnSync(process.execPath, [path.join(__dirname, 'probe-types.js'), '--types=' + type, '--levels=' + level, '--locales=en', '--seeds=6'], { cwd: WG, encoding: 'utf8' });
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR|Error/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^(?:FAIL|ERROR) +\S+ \S+ \S+ \S+: /, '').slice(0, 110)) : ''));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
}
