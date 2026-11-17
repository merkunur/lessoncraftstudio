#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/draw-and-write-k.js (K-673 What I Like Best and Why, K-674 My Favorite and
 * Why, K-675 Facts and Labels, K-676 I Can Teach You a Fact, K-677 Put a Small Moment in Order, K-678 My Small Moment,
 * K-679 A Friend Asks, I Add, K-680 Author's Chair) and the check of its bank (data/literacy/draw-and-write-k.en.json) can
 * fail: each planted fault (poison-draw-and-write-k.faults.js) changes the factory or the bank, renders the pages it
 * concerns (six child's pages, or, for a fault of the answer key, four keys) in a child process that prints EVERY report of
 * a page, and expects the page's own check or the bank's check to report something the clean files do not (the clean run of
 * each type and level is the baseline: a level whose new instruction is not registered yet reports that on every page, and
 * it never counts); a fault may name the pattern its new report must match. The file is restored after every fault (and on
 * any error). out/probe is kept (other work renders there); only the pages of these eight types are removed at the end. A
 * dev tool: never run it while pages are generated, and never stop it (a stopped run leaves its fault in the file).
 *
 *   node tools/level-set/poison-draw-and-write-k.js [--keep] [--only=<pattern of fault names>]
 *
 * With --keep the pages of the faults stay in out/probe for a look (they are removed otherwise). --only runs the faults whose
 * name matches (while a fault list is written); the run that counts runs them all.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const KEEP = process.argv.includes('--keep');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);

// the page runner (a child process): renders six child's pages, or four answer keys, of a type and level and prints
// every report of the page's checks
const RUN = (process.argv.find((a) => a.startsWith('--run=')) || '').slice(6);
if (RUN) {
  const [id, lvS, kind] = RUN.split(':'), lv = Number(lvS), isKey = kind === 'key';
  process.chdir(WG);
  (async () => {
    const puppeteer = require(path.join(WG, '..', '..', 'node_modules', 'puppeteer'));
    let bad = 0, browser;
    try {
      const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
      const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
      const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
      browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      const spec = loadType(id);
      const strings = withLevelInstruction(resolveStrings(id, 'en', spec), id, lv, 'en');
      for (let v = 1; v <= (isKey ? 4 : 6); v++) {
        try {
          const k = await renderInstance({ type: spec, theme: null, difficulty: lv, locale: 'en', variant: v, seedVariant: v + 1, page, outDir: path.join(WG, 'out', 'probe'), baseName: `${id}-en-L${lv}-${isKey ? 'pkey' : 'ppage'}-${v}`, strings, buildExtra: isKey ? { answerKey: true } : {} });
          const f = [].concat(k.qa.lints || [], k.qa.verify || []);
          if (f.length) { bad++; console.log(`FAIL ${id} L${lv} ${isKey ? 'key' : 'page'} #${v}: ${f.join(' · ')}`); }
        } catch (e) { bad++; console.log('ERROR ' + e.message.split('\n')[0]); }
      }
    } catch (e) { bad++; console.log('ERROR ' + e.message.split('\n')[0]); }
    if (browser) await browser.close();
    process.exit(bad ? 1 : 0);
  })();
} else {
  const FACTORY = path.join(WG, 'types', '_shared', 'draw-and-write-k.js');
  const BANK = path.join(WG, 'data', 'literacy', 'draw-and-write-k.en.json');
  // [name, file, text to find, its replacement, type, level, 'key' when the fault shows on the answer key only, pattern]
  const FAULTS = require('./poison-draw-and-write-k.faults.js')(FACTORY, BANK).filter((x) => !ONLY || new RegExp(ONLY).test(x[0]));
  const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
  // every text first: a stale list stops the run before any file is touched
  for (const [name, file, find] of FAULTS) {
    const hits = ORIG[file].replace(/\r\n/g, '\n').split(find).length - 1;
    if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
  }
  const run = (type, level, where) => spawnSync(process.execPath, [__filename, `--run=${type}:${level}:${where === 'key' ? 'key' : 'page'}`], { cwd: WG, encoding: 'utf8' });
  // the reports of a run, one by one (a FAIL line holds several, joined by " · "; a load error is one)
  const reports = (out) => new Set(out.split('\n').filter((l) => /^(FAIL|ERROR)|Error: /.test(l))
    .flatMap((l) => l.replace(/^(?:FAIL|ERROR)\b.*?#\d+:\s*/, '').replace(/^ERROR\s+/, '').split(' · ').map((x) => x.trim()).filter(Boolean)));
  // the baseline: what the clean files report for each type, level and kind of run
  const BASE = {};
  const baseOf = (type, level, where) => { const k = `${type}:${level}:${where || ''}`; if (!BASE[k]) { const r = run(type, level, where); BASE[k] = reports((r.stdout || '') + (r.stderr || '')); } return BASE[k]; };
  let caught = 0;
  try {
    for (const [name, file, find, repl, type, level, where, expect] of FAULTS) {
      const base = baseOf(type, level, where);
      const src = ORIG[file].replace(/\r\n/g, '\n');
      fs.writeFileSync(file, src.replace(find, () => repl));
      const r = run(type, level, where);
      fs.writeFileSync(file, ORIG[file]);
      const fresh = [...reports((r.stdout || '') + (r.stderr || ''))].filter((x) => !base.has(x));
      const hit = r.status !== 0 && fresh.length > 0 && (!expect || fresh.some((x) => expect.test(x)));
      if (hit) caught++;
      const shown = (expect && fresh.find((x) => expect.test(x))) || fresh[0] || '(nothing new reported)';
      console.log((hit ? 'caught   ' : 'MISSED   ') + name + ': ' + shown.slice(0, 150));
    }
  } finally {
    for (const f of Object.keys(ORIG)) fs.writeFileSync(f, ORIG[f]);
    const P = path.join(WG, 'out', 'probe');
    if (!KEEP && fs.existsSync(P)) for (const f of fs.readdirSync(P)) if (/^K-6(7[3-9]|80)-en-L\d-p(page|key)-/.test(f)) fs.rmSync(path.join(P, f), { force: true });
  }
  console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
  process.exit(caught === FAULTS.length ? 0 : 1);
}
