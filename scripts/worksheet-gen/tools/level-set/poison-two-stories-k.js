#!/usr/bin/env node
/**
 * Proves that the page checks of types/_shared/two-stories-k.js (K-685 Compare Two Stories and K-686 Draw Same and Different) and the check of its
 * bank (data/literacy/two-stories-k.en.json) can fail: each planted fault (poison-two-stories-k.faults.js) changes the factory or the
 * bank, renders the pages it concerns (six child's pages, or, for a fault of the answer key, four keys) in a child process
 * that prints EVERY report of a page, and expects the page's own check or the bank's check to report something the clean
 * files do not (the clean run of each type and level is the baseline and never counts); a fault may name the pattern its
 * new report must match. The file is restored after every fault (and on any error). out/probe is kept (other work renders
 * there); only the pages of these two types are removed at the end. A dev tool: never run it while pages are generated.
 * A fault is planted in a COPY beside the real file (.poison-copy.<name>), never in the factory or the bank themselves: the
 * page runner resolves every require of the real file to its copy and stops (exit 3) when it did not load the copies. The
 * copies and the run's state (out/poison-state/<runner>.json: the md5 of the clean files) are removed on exit and on
 * SIGINT, SIGTERM, SIGHUP and SIGBREAK; a run that was killed leaves them, and the next run refuses to start when the files
 * are not the clean ones that state recorded (it goes on, and removes the stale copies, when they are).
 *
 *   node tools/level-set/poison-two-stories-k.js [--keep]
 *
 * With --keep the pages of the faults stay in out/probe for a look (they are removed otherwise).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const WG = path.join(__dirname, '..', '..');
const KEEP = process.argv.includes('--keep');

// the page runner (a child process): renders six child's pages, or four answer keys, of a type and level and prints
// every report of the page's checks
const RUN = (process.argv.find((a) => a.startsWith('--run=')) || '').slice(6);
if (RUN) {
  const [id, lvS, kind] = RUN.split(':'), lv = Number(lvS), isKey = kind === 'key';
  process.chdir(WG);
  // a planted run: every require of the real factory or bank resolves to its copy (the real files are never written)
  const MAP = process.env.LCS_POISON_MAP ? JSON.parse(process.env.LCS_POISON_MAP) : null;
  if (MAP) { const Module = require('module'), resolve = Module._resolveFilename;
    Module._resolveFilename = function (request, parent, ...rest) { const r = resolve.call(this, request, parent, ...rest); return MAP[r.toLowerCase()] || r; }; }
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
      if (MAP && !Object.values(MAP).every((c) => require.cache[c])) { console.log('NOCOPY: the planted copies were not loaded'); process.exit(3); }
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
  const FACTORY = path.join(WG, 'types', '_shared', 'two-stories-k.js');
  const BANK = path.join(WG, 'data', 'literacy', 'two-stories-k.en.json');
  // [name, file, text to find, its replacement, type, level, 'key' when the fault shows on the answer key only, pattern]
  const FAULTS = require('./poison-two-stories-k.faults.js')(FACTORY, BANK);
  const ORIG = {}; for (const f of [FACTORY, BANK]) ORIG[f] = fs.readFileSync(f, 'utf8');
  // the copies the faults are planted in, and the state of this run (the md5 of the clean files)
  const crypto = require('crypto'), md5 = (f) => crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex');
  const COPY = {}; for (const f of [FACTORY, BANK]) COPY[f] = path.join(path.dirname(f), '.poison-copy.' + path.basename(f));
  const STATE = path.join(WG, 'out', 'poison-state', path.basename(__filename, '.js') + '.json');
  if (fs.existsSync(STATE)) { const st = JSON.parse(fs.readFileSync(STATE, 'utf8'));
    const bad = Object.entries(st.md5).filter(([f, m]) => !fs.existsSync(f) || md5(f) !== m);
    if (bad.length) { console.error('REFUSED: a stopped run (' + st.started + ') recorded other clean files: ' + bad.map(([f, m]) => path.basename(f) + ' was ' + m + ', is ' + (fs.existsSync(f) ? md5(f) : 'missing')).join('; ') + '. Restore the clean files first (then delete ' + STATE + ').'); process.exit(2); }
    console.log('a stopped run (' + st.started + ') left its state; the files are the clean ones it recorded: going on'); }
  for (const c of Object.values(COPY)) fs.rmSync(c, { force: true });
  const CLEAN = Object.fromEntries([FACTORY, BANK].map((f) => [f, md5(f)]));
  fs.mkdirSync(path.dirname(STATE), { recursive: true });
  fs.writeFileSync(STATE, JSON.stringify({ started: new Date().toISOString(), pid: process.pid, md5: CLEAN }, null, 1));
  const cleanup = () => { for (const c of [...Object.values(COPY), STATE]) { try { fs.rmSync(c, { force: true }); } catch (e) { /* gone */ } } };
  process.on('exit', cleanup);
  for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGBREAK']) process.on(sig, () => { cleanup(); process.exit(130); });
  const MAPENV = JSON.stringify(Object.fromEntries(Object.entries(COPY).map(([f, c]) => [path.resolve(f).toLowerCase(), c])));
  // every fault names a type of this runner, a level, a kind of run and a pattern: a fault that names no real type would
  // render nothing and read as "nothing new reported", so it stops the run before any file is touched
  const TYPES = ["K-685","K-686"];
  for (const [name, , , , type, level, where, expect] of FAULTS) if (!TYPES.includes(type) || ![1, 2, 3].includes(level) || ![null, 'key'].includes(where) || !(expect instanceof RegExp)) throw new Error('fault "' + name + '": not a type of this runner, a level, a kind of run (null or key) and a pattern');
  // every text first: a stale list stops the run before any file is touched
  for (const [name, file, find] of FAULTS) {
    const hits = ORIG[file].replace(/\r\n/g, '\n').split(find).length - 1;
    if (file !== BANK ? hits !== 1 : hits < 1) throw new Error('fault "' + name + '": its text is in the file ' + hits + ' times');
  }
  const run = (type, level, where, planted) => { const r = spawnSync(process.execPath, [__filename, `--run=${type}:${level}:${where === 'key' ? 'key' : 'page'}`], { cwd: WG, encoding: 'utf8', env: planted ? { ...process.env, LCS_POISON_MAP: MAPENV } : process.env });
    if (r.status === 3) throw new Error('the page runner did not load the planted copies: no fault can be counted'); return r; };
  // the reports of a run, one by one (a FAIL line holds several, joined by " · "; a load error is one)
  const reports = (out) => new Set(out.split('\n').filter((l) => /^(FAIL|ERROR)|Error: /.test(l))
    .flatMap((l) => l.replace(/^(?:FAIL|ERROR)\b.*?#\d+:\s*/, '').replace(/^ERROR\s+/, '').split(' · ').map((x) => x.trim()).filter(Boolean)));
  // the baseline: what the clean files report for each type, level and kind of run
  const BASE = {};
  const baseOf = (type, level, where) => { const k = `${type}:${level}:${where || ''}`; if (!BASE[k]) { const r = run(type, level, where); BASE[k] = reports((r.stdout || '') + (r.stderr || '')); } return BASE[k]; };
  // the clean control: every type, level and kind of run the faults use, rendered from the clean files and printed. It
  // must report nothing (and exit 0), or a fault could hide behind a report the clean run already makes
  { const used = [...new Set(FAULTS.map((f) => `${f[4]}:${f[5]}:${f[6] || ''}`))].sort(); let dirty = 0;
    for (const k of used) { const [t, l, w] = k.split(':'); const r = run(t, +l, w || null); const rep = reports((r.stdout || '') + (r.stderr || '')); BASE[k] = rep;
      const ok = r.status === 0 && !rep.size; if (!ok) dirty++;
      console.log('control  ' + t + ' L' + l + ' ' + (w || 'page') + ': ' + (ok ? 'clean' : ([...rep].join(' · ') || 'exit ' + r.status).slice(0, 150))); }
    if (dirty) throw new Error(dirty + ' of ' + used.length + ' clean control runs report something: no fault can be counted');
    console.log('clean control: ' + used.length + ' runs, 0 with a report'); }
  let caught = 0;
  try {
    for (const [name, file, find, repl, type, level, where, expect] of FAULTS) {
      const base = baseOf(type, level, where);
      const src = ORIG[file].replace(/\r\n/g, '\n');
      for (const f of Object.keys(ORIG)) fs.writeFileSync(COPY[f], f === file ? src.replace(find, () => repl) : ORIG[f]);
      const r = run(type, level, where, true);
      for (const f of Object.keys(ORIG)) if (md5(f) !== CLEAN[f]) throw new Error(path.basename(f) + ' changed during the run (it is never written by this runner)');
      const fresh = [...reports((r.stdout || '') + (r.stderr || ''))].filter((x) => !base.has(x));
      const hit = r.status !== 0 && fresh.length > 0 && (!expect || fresh.some((x) => expect.test(x)));
      if (hit) caught++;
      const shown = (expect && fresh.find((x) => expect.test(x))) || fresh[0] || '(nothing new reported)';
      console.log((hit ? 'caught   ' : 'MISSED   ') + name + ': ' + shown.slice(0, 150));
    }
  } finally {
    cleanup();
    const P = path.join(WG, 'out', 'probe');
    if (!KEEP && fs.existsSync(P)) for (const f of fs.readdirSync(P)) if (new RegExp('^(' + TYPES.join('|') + ')-en-L\\d-p(page|key)-').test(f)) fs.rmSync(path.join(P, f), { force: true });
  }
  console.log(caught + ' of ' + FAULTS.length + ' planted faults caught');
  process.exit(caught === FAULTS.length ? 0 : 1);
}
