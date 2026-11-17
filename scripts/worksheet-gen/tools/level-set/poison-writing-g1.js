#!/usr/bin/env node
/**
 * Proves that the checks of types/_shared/writing-g1.js (G1-616..623, the Grade 1 unit "Writing: Stories, Opinions, and
 * Facts") can fail: each planted fault (poison-writing-g1.faults.js) changes the factory or the bank, renders the pages it
 * concerns (or their answer keys, for a fault that shows on the key only) and expects the page's own check, the page lints
 * or the bank's check to report it. Before any fault, a clean run renders every type and level, page and key, and must
 * report nothing (a fault counts as caught only against a clean baseline, and only when a check REPORTS it: a page that
 * cannot be drawn at all counts as missed). The files are restored after every fault (and on any error). A dev tool: never
 * run it while pages are generated, and never stop it (a stopped run leaves its fault in the file).
 *
 *   node tools/level-set/poison-writing-g1.js [--keep]
 *
 * A fault is [name, file, find, replace, types (+), levels (+), what]: find may be a list of [find, replace] pairs (one
 * fault that needs more than one change); what is 'key' for a fault that shows on the answer key only, 'instr:N' to print
 * the instruction of level N on the page of another level, 'seeds:N' to render N copies of each level, or 'load' for a
 * fault in the factory that the bank check reports when the factory loads. It renders into its own folders under the system
 * temp folder (never into out/probe, where other runs keep pages); with --keep the folders stay (their paths are printed).
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'writing-g1.js');
const BANK = path.join(WG, 'data', 'literacy', 'writing-g1.en.json');
const SEEDS = 3;
const KEEP = process.argv.includes('--keep');
const IDS = Array.from({ length: 8 }, (_, i) => 'G1-' + (616 + i));

// one render run (a child process, so that the changed factory or bank is loaded afresh)
const renderArg = process.argv.find((a) => a.startsWith('--render='));
if (renderArg) {
  const [types, levels, what, seeds] = renderArg.slice('--render='.length).split(',');
  (async () => {
    const puppeteer = require('puppeteer');
    const { loadType } = require('../../lib/load-types.js');
    const { resolveStrings, withLevelInstruction } = require('../../i18n/strings.js');
    const { renderInstance } = require('../../render/render-instance.js');
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'poison-writing-g1-'));
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    let bad = 0, drawn = 0;
    try {
      for (const type of types.split('+')) {
        const spec = loadType(type);
        for (const level of levels.split('+')) for (let v = 1; v <= Number(seeds || SEEDS); v++) for (const k of what === 'both' ? ['', 'key'] : [what === 'key' ? 'key' : '']) {
          const instrLv = /^instr:\d$/.test(what) ? +what.slice(6) : +level;
          const strings = { ...withLevelInstruction(resolveStrings(type, 'en', spec), type, +level, 'en'), instruction: withLevelInstruction(resolveStrings(type, 'en', spec), type, instrLv, 'en').instruction };
          try {
            const r = await renderInstance({ type: spec, theme: null, difficulty: +level, locale: 'en', variant: v, seedVariant: v + 1, page, outDir: out, baseName: `${type}-L${level}-${v}${k}`, strings, buildExtra: k === 'key' ? { answerKey: true } : {} });
            drawn++;
            const f = [].concat(r.qa.lints || [], r.qa.verify || []);
            if (f.length) { bad++; console.log(`FAIL ${type} L${level} #${v}${k === 'key' ? ' key' : ''}: ` + f.slice(0, 4).join(' · ')); }
          } catch (e) { console.log(`NODRAW ${type} L${level} #${v}: ${e.message.slice(0, 160)}`); }
        }
      }
    } finally { await browser.close(); if (KEEP) console.log('kept: ' + out); else fs.rmSync(out, { recursive: true, force: true }); }
    console.log(`drawn ${drawn}, reported ${bad}`);
    process.exit(bad ? 1 : 0);
  })().catch((e) => { console.log('Error: ' + e.message.slice(0, 300)); process.exit(2); });
  return;
}

const run = (types, level, what, seeds) => spawnSync(process.execPath, [__filename, `--render=${types},${level},${what || ''},${seeds || SEEDS}`, ...(KEEP ? ['--keep'] : [])], { cwd: WG, encoding: 'utf8' });
// the clean baseline: every type, every level, page and key
{
  const r = run(IDS.join('+'), '1+2+3', 'both', 1);
  const out = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0 || /NODRAW|Error/.test(out)) { console.log(out); console.log('the clean pages do not pass: no fault can be judged'); process.exit(1); }
  console.log('clean baseline: ' + (out.match(/drawn \d+/) || ['?'])[0] + ' pages and keys pass');
}
const FAULTS = require('./poison-writing-g1.faults.js')(FACTORY, BANK);
const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
let caught = 0;
try {
  for (const [name, file, find, repl, type, level, what] of FAULTS) {
    let src = ORIG[file].replace(/\r\n/g, '\n');
    for (const [a, b] of Array.isArray(find) ? find : [[find, repl]]) {
      const hits = src.split(a).length - 1;
      if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times: ' + a.slice(0, 60));
      src = src.replace(a, () => b);
    }
    fs.writeFileSync(file, src);
    const r = /^seeds:\d+$/.test(what || '') ? run(type, level, '', +what.slice(6)) : run(type, level, what === 'load' ? '' : what);
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    // a bank fault is reported by the bank's check when the factory loads; a page fault only by a check on a drawn page
    const bankCaught = (file === BANK || what === 'load') && /Error: writing-g1\.en\.json: /.test(out);
    const pageCaught = /^FAIL /m.test(out);
    const hit = bankCaught || pageCaught;
    if (hit) caught++;
    const why = bankCaught ? (out.match(/Error: writing-g1\.en\.json: ([^\n]*)/) || ['', ''])[1] : (out.match(/^FAIL [^\n]*/m) || [''])[0].replace(/^FAIL +\S+ \S+ #\d+( key)?: /, '');
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + ': ' + (hit ? why.slice(0, 120) : out.replace(/\s+/g, ' ').slice(0, 160)));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
