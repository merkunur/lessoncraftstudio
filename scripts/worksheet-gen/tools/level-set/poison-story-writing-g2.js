#!/usr/bin/env node
/**
 * Proves that the checks of types/_shared/story-writing-g2.js (G2-571 Parts of a True Story, G2-572 Plan Your True Story,
 * G2-573 Draft Your True Story, G2-574 Edit a Story, G2-575 Revise with a Partner) can fail: each planted fault
 * (poison-story-writing-g2.faults.js) changes the factory or the bank, renders the page it concerns AND its answer key for
 * SEEDS draws in a fresh process, and expects a check to report it. A fault of the factory counts only when a check of the
 * RENDERED page reports it (FAIL), never when the page cannot be drawn at all; a fault of the bank, or one marked 'load',
 * must stop the factory when it loads. First, as a control, every type and level the faults use is rendered with nothing
 * planted and must pass (a page that fails anyway would "catch" every fault). Every page prints the instruction of its
 * level as the factory holds it (INSTR, read in the render process: a fault in it is printed). The files are restored
 * after every fault (and on any error). A dev tool: never run it while pages are generated, and never stop it (a stopped
 * run leaves its fault in the file).
 *
 *   node tools/level-set/poison-story-writing-g2.js [--keep] [--only=<words>[|<words>]]
 *
 * It renders into its own folders under the system temp folder (never into out/probe); with --keep the folders stay.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const FACTORY = path.join(WG, 'types', '_shared', 'story-writing-g2.js');
const BANK = path.join(WG, 'data', 'literacy', 'story-writing-g2.en.json');
const MODE = { 'G2-571': 'read', 'G2-572': 'plan', 'G2-573': 'draft', 'G2-574': 'edit', 'G2-575': 'revise' };
const SEEDS = 3;
const KEEP = process.argv.includes('--keep');

// ---- the render step (a fresh process, so the faulted file is read anew): page and key of SEEDS draws
if (process.argv[2] === '--render') {
  const [, , , types, level] = process.argv;
  const puppeteer = require('puppeteer');
  (async () => {
    let out = '', bad = 0;
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'poison-sw2-'));
    const browser = await puppeteer.launch({ headless: 'new' });
    try {
      const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
      const { resolveStrings } = require(path.join(WG, 'i18n', 'strings.js'));
      const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
      const { INSTR } = require(FACTORY);
      const page = await browser.newPage();
      for (const type of types.split('+')) {
        const spec = loadType(type), lv = Number(level);
        const strings = { ...resolveStrings(type, 'en', spec), instruction: INSTR[MODE[type]][lv] };
        for (let v = 1; v <= SEEDS; v++) for (const key of [false, true]) {
          try {
            const r = await renderInstance({ type: spec, theme: null, difficulty: lv, locale: 'en', variant: v, seedVariant: v + 1, page, outDir: dir, baseName: `${type}-L${lv}-${key ? 'key' : 'page'}-${v}`, strings, buildExtra: key ? { answerKey: true } : {} });
            const f = [].concat(r.qa.lints || [], r.qa.verify || []);
            if (f.length) { bad++; out += `FAIL ${type} L${lv} #${v}${key ? ' key' : ''}: ${f.join(' · ')}\n`; }
          } catch (e) { bad++; out += `ERROR ${type} L${lv} #${v}: ${e.message.split('\n')[0]}\n`; }
        }
      }
    } catch (e) { bad++; out += 'ERROR ' + e.message.split('\n')[0] + '\n'; }
    await browser.close();
    if (KEEP) out += 'kept: ' + dir + '\n'; else fs.rmSync(dir, { recursive: true, force: true });
    process.stdout.write(out);
    process.exit(bad ? 1 : 0);
  })();
  return;
}

const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const FAULTS = require('./poison-story-writing-g2.faults.js')(FACTORY, BANK).filter((f) => !ONLY || ONLY.split('|').some((o) => f[0].includes(o)));
if (!FAULTS.length) throw new Error('no fault is named like ' + ONLY);
const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
/** a fault changes one text, or several (find and replacement as two lists of the same length); a factory text must stand
 *  in the factory exactly once (a stale list stops before anything runs) */
const faulted = (name, file, find, repl) => {
  const finds = [].concat(find), repls = [].concat(repl);
  if (finds.length !== repls.length) throw new Error('fault "' + name + '": ' + finds.length + ' texts, ' + repls.length + ' replacements');
  const src = ORIG[file].replace(/\r\n/g, '\n');
  let out = src;
  finds.forEach((f, i) => { const hits = src.split(f).length - 1; if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text ' + (i + 1) + ' is in the file ' + hits + ' times'); if (f === repls[i]) throw new Error('fault "' + name + '": changes nothing'); out = out.replace(f, () => repls[i]); });
  return out;
};
for (const [name, file, find, repl] of FAULTS) faulted(name, file, find, repl);
const run = (types, level) => spawnSync(process.execPath, [__filename, '--render', types, String(level), ...(KEEP ? ['--keep'] : [])], { cwd: WG, encoding: 'utf8', timeout: 600000 });
const escRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
let caught = 0;
try {
  for (const tl of [...new Set(FAULTS.map((f) => f[4] + '|' + f[5]))]) {
    const [types, level] = tl.split('|');
    const r = run(types, level);
    if (r.status !== 0) throw new Error(`the control fails: ${types} level ${level} does not pass with no fault planted\n` + (r.stdout || '') + (r.stderr || ''));
    console.log('control  ' + types + ' level ' + level + ': passes');
  }
  for (const [name, file, find, repl, types, level, where, expect] of FAULTS) {
    fs.writeFileSync(file, faulted(name, file, find, repl));
    const r = run(types, level);
    fs.writeFileSync(file, ORIG[file]);
    const out = (r.stdout || '') + (r.stderr || '');
    const atLoad = file === BANK || where === 'load';
    // a fault that other checks report as well names the words of its own rule (expect); they must be among the reports
    const own = expect ? (out.match(new RegExp('[^·:;]*' + escRe(expect) + '[^·\\n;]*')) || [null])[0] : null;
    const hit = r.status !== 0 && (atLoad ? /ERROR|Error/.test(out) : /^FAIL /m.test(out)) && (!expect || !!own);
    if (hit) caught++;
    console.log((hit ? 'caught   ' : 'MISSED   ') + name + ': ' + (own ? own.trim() : (out.match(/(?:FAIL|ERROR)[^\n]*/) || out.match(/Error: [^\n]*/) || ['(no check reported it)'])[0].replace(/^FAIL \S+ \S+ #\d+( key)?: /, '')).slice(0, 130));
  }
} finally { for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]); }
console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
process.exit(caught === FAULTS.length ? 0 : 1);
