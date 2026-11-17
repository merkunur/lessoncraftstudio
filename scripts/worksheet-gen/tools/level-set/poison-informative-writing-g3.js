#!/usr/bin/env node
/**
 * Proves that the checks of types/_shared/informative-writing-g3.js (G3-556..563, the Grade 3 unit "Informative Writing
 * and Research") can fail: each planted fault (poison-informative-writing-g3.faults.js) changes the factory or the bank,
 * renders the page it concerns AND its answer key (some rules hold only on the key) for four copies in a fresh process,
 * and expects the page's own check, the page lints, or the bank's check to report it. The file is restored after every
 * fault (and on any error). A fault of the factory counts only when a check of the rendered page reports it (FAIL), not
 * when the factory cannot draw a page at all; a fault of the bank, or one marked 'load', must stop the factory when it
 * loads. First, as a control, every type and level the faults use is rendered with nothing planted and must pass (a page
 * that fails anyway would "catch" every fault). The renders go to out/probe (other work renders there too); only the
 * poison files of these eight types are removed at the end. Run it after the level instructions are registered (the
 * pages print them). A dev tool: never run it while pages are generated, and never stop it (a stopped run leaves its
 * fault in the file).
 *
 *   node tools/level-set/poison-informative-writing-g3.js [--keep]           (all faults)
 *   node tools/level-set/poison-informative-writing-g3.js --only=<words>     (the faults whose name holds those words)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'informative-writing-g3.js');
const BANK = path.join(WG, 'data', 'literacy', 'informative-writing-g3.en.json');
const PROBE = path.join(WG, 'out', 'probe');
const SEEDS = 4;
const KEEP = process.argv.includes('--keep');

// ---- the render step (a fresh process, so the faulted file is read anew): page and key of SEEDS copies
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

// [name, file, text to find, its replacement, type, level, 'load'] (text and replacement may be lists: several changes)
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const FAULTS = require('./poison-informative-writing-g3.faults.js')(FACTORY, BANK).filter((f) => !ONLY || ONLY.split('|').some((o) => f[0].includes(o)));
if (!FAULTS.length) throw new Error('no fault is named like ' + ONLY);
const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
/** a fault changes one text, or several (find and replacement as two lists of the same length) */
const faulted = (name, file, find, repl) => {
  const finds = [].concat(find), repls = [].concat(repl);
  if (finds.length !== repls.length) throw new Error('fault "' + name + '": ' + finds.length + ' texts, ' + repls.length + ' replacements');
  const src = ORIG[file].replace(/\r\n/g, '\n');
  let out = src;
  finds.forEach((f, i) => { const hits = src.split(f).length - 1; if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text ' + (i + 1) + ' is in the file ' + hits + ' times'); out = out.replace(f, () => repls[i]); });
  return out;
};
for (const [name, file, find, repl] of FAULTS) faulted(name, file, find, repl);   // a stale list stops before anything runs
let caught = 0;
try {
  // the control: every page and key the faults use passes its checks with nothing planted
  for (const tl of [...new Set(FAULTS.filter((f) => f[1] !== BANK && f[6] !== 'load').map((f) => f[4] + '|' + f[5]))]) {
    const [type, level] = tl.split('|');
    const r = spawnSync(process.execPath, [__filename, '--render', type, level], { cwd: WG, encoding: 'utf8' });
    if (r.status !== 0) throw new Error(`the control fails: ${type} level ${level} does not pass with no fault planted\n` + (r.stdout || '') + (r.stderr || ''));
    console.log('control  ' + type + ' level ' + level + ': passes');
  }
  for (const [name, file, find, repl, type, level, where] of FAULTS) {
    fs.writeFileSync(file, faulted(name, file, find, repl));
    const r = spawnSync(process.execPath, [__filename, '--render', type, String(level)], { cwd: WG, encoding: 'utf8' });
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    // a fault of the bank, or one marked 'load', must stop the factory when it loads (its bank check names the bank);
    // every other fault must be reported by a check of the rendered page
    const atLoad = file === BANK || where === 'load';
    const hit = r.status !== 0 && (atLoad ? /informative-writing-g3\.en\.json: /.test(out) : /^FAIL /m.test(out));
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + ': ' + ((out.match(/(?:FAIL|ERROR)[^\n]*/) || out.match(/Error: [^\n]*/) || ['(no check reported it)'])[0].replace(/^FAIL \S+ \S+ #\d+( key)?: /, '').slice(0, 130)));
  }
} finally {
  for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]);
  if (!KEEP && fs.existsSync(PROBE)) for (const f of fs.readdirSync(PROBE)) if (/^G3-(55[6-9]|56[0-3])-en-L\d-poison-/.test(f)) fs.rmSync(path.join(PROBE, f), { force: true });
}
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
