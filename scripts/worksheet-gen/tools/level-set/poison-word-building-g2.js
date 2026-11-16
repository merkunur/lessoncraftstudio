#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/word-building-g2.js (G2-535 Prefixes un- and re-, G2-536 Suffixes -ful,
 * -less, and -ly, G2-537 Apostrophes) can fail: each planted fault (poison-word-building-g2.faults.js) changes the
 * factory or the word bank, renders the page it concerns AND its answer key (some rules hold only on the key) for six
 * draws in a fresh process, and expects the page's own check or the bank's check to report it. The file is restored after
 * every fault (and on any error). The renders go to out/probe (other work renders there too); only the files of these
 * three types are removed at the end. A dev tool: never run it while pages are generated, and never stop it (a stopped
 * run leaves its fault in the file).
 *
 *   node tools/level-set/poison-word-building-g2.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'word-building-g2.js');
const BANK = path.join(WG, 'data', 'literacy', 'word-building-g2.en.json');
const PROBE = path.join(WG, 'out', 'probe');
const SEEDS = 6;

// ---- the render step (a fresh process, so the faulted file is read anew): page and key of SEEDS draws
if (process.argv[2] === '--render') {
  const [, , , type, level] = process.argv;
  const puppeteer = require('puppeteer');
  const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
  const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
  const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
  (async () => {
    let out = '', bad = 0;
    const browser = await puppeteer.launch({ headless: 'new' });
    try {
      const page = await browser.newPage();
      const spec = loadType(type);
      const lv = Number(level);
      const strings = withLevelInstruction(resolveStrings(type, 'en', spec), type, lv, 'en');
      for (let v = 1; v <= SEEDS; v++) {
        for (const key of [false, true]) {
          const r = await renderInstance({ type: spec, theme: null, difficulty: lv, locale: 'en', variant: v, seedVariant: v + 1, page, outDir: PROBE, baseName: `${type}-en-L${lv}-poison-${key ? 'key' : 'page'}-${v}`, strings, buildExtra: key ? { answerKey: true } : {} });
          const f = [].concat(r.qa.lints || [], r.qa.verify || []);
          if (f.length) { bad++; out += `FAIL ${type} L${lv} #${v}${key ? ' key' : ''}: ${f.slice(0, 3).join(' · ')}\n`; }
        }
      }
    } catch (e) { bad++; out += 'ERROR ' + e.message.split('\n')[0] + '\n'; }
    await browser.close();
    process.stdout.write(out);
    process.exit(bad ? 1 : 0);
  })();
  return;
}

// [name, file, text to find, its replacement, type, level]
const FAULTS = require('./poison-word-building-g2.faults.js')(FACTORY, BANK);
const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
let caught = 0;
try {
  for (const [name, file, find, repl, type, level] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    const hits = src.split(find).length - 1;
    if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
    fs.writeFileSync(file, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [__filename, '--render', type, String(level)], { cwd: WG, encoding: 'utf8' });
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR|Error/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR)[^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^FAIL \S+ \S+ #\d+( key)?: /, '').slice(0, 120)) : ''));
  }
} finally {
  for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]);
  if (fs.existsSync(PROBE)) for (const f of fs.readdirSync(PROBE)) if (/^G2-53[5-7]-en-L\d-poison-/.test(f)) fs.rmSync(path.join(PROBE, f), { force: true });
}
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
