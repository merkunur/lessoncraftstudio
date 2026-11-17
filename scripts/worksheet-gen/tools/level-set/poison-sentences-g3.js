#!/usr/bin/env node
/**
 * Proves that the checks of types/_shared/sentences-g3.js (G3-520..529, the Grade 3 unit "Sentences and Conventions")
 * can fail: each planted fault (poison-sentences-g3.faults.js) changes the factory or the bank, renders the page it
 * concerns (or its answer key, for a fault that shows on the key only) and expects the page's own check, the page lints
 * or the bank's check to report it. Before any fault, a clean run renders every type and level, page and key, and must
 * report nothing (a fault counts as caught only against a clean baseline). The files are restored after every fault (and
 * on any error). A dev tool: never run it while pages are generated, and never stop it (a stopped run leaves its fault
 * in the file).
 *
 *   node tools/level-set/poison-sentences-g3.js [--keep]
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
const FACTORY = path.join(WG, 'types', '_shared', 'sentences-g3.js');
const BANK = path.join(WG, 'data', 'literacy', 'sentences-g3.en.json');
const SEEDS = 5;
const KEEP = process.argv.includes('--keep');

// one render run (a child process, so that the changed factory or bank is loaded afresh)
const renderArg = process.argv.find((a) => a.startsWith('--render='));
if (renderArg) {
  const [types, levels, key, seeds] = renderArg.split('=')[1].split(',');
  (async () => {
    const puppeteer = require('puppeteer');
    const { loadType } = require('../../lib/load-types.js');
    const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
    const { renderInstance } = require('../../render/render-instance.js');
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'poison-sentences-g3-'));
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    let bad = 0;
    try {
      for (const type of types.split('+')) {
        const spec = loadType(type);
        for (const level of levels.split('+')) for (let v = 1; v <= Number(seeds || SEEDS); v++) for (const k of key === 'both' ? ['', 'key'] : [key]) {
          const strings = withLevelInstruction(resolveStrings(type, 'en', spec), type, +level, 'en');
          try {
            const r = await renderInstance({ type: spec, theme: null, difficulty: +level, locale: 'en', variant: v, seedVariant: v + 1, page, outDir: out, baseName: `${type}-L${level}-${v}${k}`, strings, buildExtra: k === 'key' ? { answerKey: true } : {} });
            const f = [].concat(r.qa.lints || [], r.qa.verify || []);
            if (f.length) { bad++; console.log(`FAIL ${type} L${level} #${v}${k === 'key' ? ' key' : ''}: ` + f.slice(0, 4).join(' · ')); }
          } catch (e) { bad++; console.log(`ERROR ${type} L${level} #${v}: ${e.message}`); }
        }
      }
    } finally { await browser.close(); if (KEEP) console.log('kept: ' + out); else fs.rmSync(out, { recursive: true, force: true }); }
    process.exit(bad ? 1 : 0);
  })().catch((e) => { console.log('Error: ' + e.message); process.exit(1); });
  return;
}

const run = (types, level, key, seeds) => spawnSync(process.execPath, [__filename, `--render=${types},${level},${key || ''},${seeds || SEEDS}`, ...(KEEP ? ['--keep'] : [])], { cwd: WG, encoding: 'utf8' });
// the clean baseline: every type, every level, page and key
{
  const ids = Array.from({ length: 10 }, (_, i) => 'G3-' + (520 + i)).join('+');
  const r = run(ids, '1+2+3', 'both', 1);
  const out = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0) { console.log(out); console.log('the clean pages do not pass: no fault can be judged'); process.exit(1); }
  console.log('clean baseline: 60 pages and keys pass');
}
// [name, file, text to find, its replacement, type, level, 'key']
const FAULTS = require('./poison-sentences-g3.faults.js')(FACTORY, BANK);
const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
let caught = 0;
try {
  for (const [name, file, find, repl, type, level, key] of FAULTS) {
    const src = ORIG[file].replace(/\r\n/g, '\n');
    const hits = src.split(find).length - 1;
    if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
    fs.writeFileSync(file, src.replace(find, () => repl));
    const r = run(type, level, key);
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const hit = r.status !== 0 && /FAIL|ERROR|Error/.test(out);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + (hit ? ': ' + ((out.match(/(?:FAIL|ERROR) [^\n]*/) || out.match(/Error: [^\n]*/) || [''])[0].replace(/^(?:FAIL|ERROR) +\S+ \S+ #\d+( key)?: /, '').slice(0, 110)) : ''));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
