#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/sentences-k.js (K-654 Naming Words and Action Words, K-655 A Sentence
 * Starts with a Capital Letter, K-656 A Period or a Question Mark?, K-657 Say More: Make the Sentence Longer) can fail:
 * each planted fault (poison-sentences-k.faults.js) changes the factory or the bank, renders the page it concerns (or
 * its answer key, for a fault that shows on the key only) and expects the page's own check, the page lints or the
 * bank's check to report it. The file is restored after every fault (and on any error). A dev tool: never run it while
 * pages are generated, and never stop it (a stopped run leaves its fault in the file).
 *
 *   node tools/level-set/poison-sentences-k.js [--keep]
 *
 * It renders into its own folders under the system temp folder (never into out/probe, where other runs keep pages); with
 * --keep the folders stay (their paths are printed) for a look at a fault's pages.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'sentences-k.js');
const BANK = path.join(WG, 'data', 'literacy', 'sentences-k.en.json');
const SEEDS = 6;
const KEEP = process.argv.includes('--keep');

// one render run (a child process, so that the changed factory or bank is loaded afresh)
const renderArg = process.argv.find((a) => a.startsWith('--render='));
if (renderArg) {
  const [type, level, key] = renderArg.split('=')[1].split(',');
  (async () => {
    const puppeteer = require('puppeteer');
    const { loadType } = require('../../lib/load-types.js');
    const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
    const { renderInstance } = require('../../render/render-instance.js');
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'poison-sentences-k-'));
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    let bad = 0;
    try {
      const spec = loadType(type);
      for (let v = 1; v <= SEEDS; v++) {
        const strings = withLevelInstruction(resolveStrings(type, 'en', spec), type, +level, 'en');
        try {
          const r = await renderInstance({ type: spec, theme: null, difficulty: +level, locale: 'en', variant: v, seedVariant: v + 1, page, outDir: out, baseName: `${type}-L${level}-${v}`, strings, buildExtra: key === 'key' ? { answerKey: true } : {} });
          const f = [].concat(r.qa.lints || [], r.qa.verify || []);
          if (f.length) { bad++; console.log(`FAIL ${type} L${level} #${v}${key === 'key' ? ' key' : ''}: ` + f.slice(0, 4).join(' · ')); }
        } catch (e) { bad++; console.log(`ERROR ${type} L${level} #${v}: ${e.message}`); }
      }
    } finally { await browser.close(); if (KEEP) console.log('kept: ' + out); else fs.rmSync(out, { recursive: true, force: true }); }
    process.exit(bad ? 1 : 0);
  })().catch((e) => { console.log('Error: ' + e.message); process.exit(1); });
  return;
}

// [name, file, text to find, its replacement, type, level, 'key']
const FAULTS = require('./poison-sentences-k.faults.js')(FACTORY, BANK);
const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
let caught = 0;
try {
  for (const [name, file, find, repl, type, level, key] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    const hits = src.split(find).length - 1;
    if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
    fs.writeFileSync(file, src.replace(find, () => repl));
    const r = spawnSync(process.execPath, [__filename, `--render=${type},${level},${key || ''}`, ...(KEEP ? ['--keep'] : [])], { cwd: WG, encoding: 'utf8' });
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR|Error/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^(?:FAIL|ERROR) +\S+ \S+ #\d+( key)?: /, '').slice(0, 110)) : ''));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
