#!/usr/bin/env node
/**
 * Reading comprehension Level Sets (G2-254, G2-269 … G2-273): every LIVE copy, rendered exactly as a wave renders it
 * (cli.js produce: render/render-instance.js with the screen version and the answer key), must pass the wave's QA —
 * no footer overlap, nothing past the page box, the key's measured text on its rows — on the page AND its answer key
 * (2026-11-18: the copy's own answer order wrapped a choice row onto the footer, fr G2-273 level 3 copy 13).
 *
 * The live copies are read from the waves, never guessed: waves/wave-rcm-<loc>.json and the pinned
 * waves/_fix-aud-<loc>-wrcm<loc>.json beside it (levels.<type>.<level> = [{ copy, seedVariant }]), all eleven languages.
 *
 *   node qa/verify-rc-fit.js                     the order stage (no browser), then every live copy (990) in the browser,
 *                                                at most 4 pages at a time
 *   node qa/verify-rc-fit.js --locales=fr,de     some languages;  --only=fr:G2-273:3:13  one or more copies
 *   node qa/verify-rc-fit.js --no-browser        the order stage only
 *   node qa/verify-rc-fit.js --maker             the maker's copies 1-8 of every type, level and language (every story
 *                                                of the pool) instead of the live copies: page and key as the maker
 *                                                builds them (makePage, keyLabel), the same lints
 *   node qa/verify-rc-fit.js --poison            planted fault: the measured choice orders (data/literacy/rc-levels/
 *                                                choice-fit.json) say every order fits; the order stage and the copy a
 *                                                free draw put past the footer must then FAIL
 *
 * Prints every finding, the counts per language and the run time.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const WG = path.join(__dirname, '..');
const puppeteer = require('puppeteer');
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
const { renderInstance } = require(path.join(WG, 'render', 'render-instance.js'));
const { resolveUnitTokens } = require(path.join(WG, 'lib', 'unit-axis.js'));
const II = require(path.join(WG, 'i18n', 'interactive-instructions.json'));
const publishI18n = require(path.join(WG, '..', 'publish-cli', 'i18n.js'));

const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { storyById } = require(path.join(WG, 'data', 'literacy', 'reading-passages-levels.js'));
const FIT_PATH = path.join(WG, 'data', 'literacy', 'rc-levels', 'choice-fit.json');
const FIT_DISK = JSON.parse(fs.readFileSync(FIT_PATH, 'utf8'));   // its own copy: a planted fault changes the one the type reads
const PERMS = ['012', '021', '102', '120', '201', '210'];
const MAKER_COPIES = 120;

const LOCALES = ['en', 'de', 'sv', 'fr', 'no', 'nl', 'fi', 'da', 'it', 'es', 'pt'];
const TYPES = ['G2-254', 'G2-269', 'G2-270', 'G2-271', 'G2-272', 'G2-273'];

/**
 * No browser: every live copy and maker copies 1..MAKER_COPIES of every type, level and language print each question's
 * choices in an order measured to fit at the page's tier (data/literacy/rc-levels/choice-fit.json, read from disk here),
 * and every page the copies reach is in that table. The maker draws without end, so this is what covers its copies; the
 * browser stage below proves the measured orders on the live pages themselves.
 */
function orderStage(live) {
  const fails = [], unmeasured = new Set();
  let pages = 0, repeated = 0;
  const one = (c, ctx, label, authoredCopy) => {
    const spec = loadType(c.id);
    const b = spec.build({ difficulty: c.lv, locale: c.loc, theme: null, unit: null }, ctx);
    if (!b.meta || !b.meta.questions) return;   // the published page (level 2, copy 1): its own authored path
    const story = storyById(c.loc, b.meta.passage);
    const authored = c.lv === 1 ? story.l1 : c.lv === 3 ? story.l3.mc : story.core;
    const tier = spec._tier(c.lv, c.loc, story);
    const row = FIT_DISK[`${c.loc}|${story.id}|${c.lv}`];
    if (!row) unmeasured.add(`${c.loc}|${story.id}|${c.lv}`);
    const mcs = b.meta.questions.filter((q) => q.kind !== 'write');
    mcs.forEach((q, i) => {
      const a = authored.find((x) => x.q === q.q), at = authored.indexOf(a);
      const perm = q.choices.map((x) => a.choices.indexOf(x)).join('');
      const mask = row && row[at] ? row[at][tier] : 1;
      if (!(mask & (1 << PERMS.indexOf(perm)))) fails.push(`${label}: question ${i + 1} prints its choices in the order ${perm}, not measured to fit (tier ${tier})`);
    });
    // a copy that places its own letters puts the right answers under different letters (the first copy of a level keeps
    // the authored order, as published)
    if (!authoredCopy && new Set(mcs.map((q) => q.correct)).size !== mcs.length) repeated++;
    pages++;
  };
  for (const c of live) one(c, { rng: makeRng(instanceSeed({ typeId: c.id, theme: null, difficulty: c.lv, seedEpoch: 1, variant: c.sv, unit: null })), variant: c.copy, seedVariant: c.sv }, `live ${c.key}`, c.sv === 1);
  for (const loc of LOCALES) for (const id of TYPES) for (const lv of [1, 2, 3]) for (let v = 1; v <= MAKER_COPIES; v++) {
    one({ id, loc, lv }, { rng: makeRng(instanceSeed({ typeId: id, theme: null, difficulty: lv, seedEpoch: 1, variant: v, unit: null })), variant: v, maker: true }, `maker ${loc}:${id}:${lv}:${v}`, v === 1);
  }
  for (const k of unmeasured) fails.push(`${k}: a page the copies reach is not in choice-fit.json (it keeps the authored order: run qa/rc-choice-rows-measure.js)`);
  return { fails, pages, repeated };
}
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : null; };
const POISON = process.argv.includes('--poison');
// the copies a free draw put past the footer (found 2026-11-18): the planted fault must make them fail again
const POISON_COPIES = ['fr:G2-273:3:13'];

/** every live (language, type, level, copy, seedVariant) of the reading-comprehension waves */
function liveCopies() {
  const out = new Map();
  for (const loc of LOCALES) {
    const files = [`wave-rcm-${loc}.json`, `_fix-aud-${loc}-wrcm${loc}.json`].map((f) => path.join(WG, 'waves', f)).filter((f) => fs.existsSync(f));
    if (!files.length) throw new Error(`no reading-comprehension wave for ${loc}`);
    for (const f of files) {
      const w = JSON.parse(fs.readFileSync(f, 'utf8'));
      for (const [id, byLevel] of Object.entries(w.levels || {})) {
        if (!TYPES.includes(id)) continue;
        for (const [lv, copies] of Object.entries(byLevel)) for (const c of copies) {
          const key = `${loc}:${id}:${lv}:${c.copy}`;
          const prev = out.get(key);
          if (prev && prev.sv !== c.seedVariant) throw new Error(`${key}: seedVariant ${prev.sv} in one wave, ${c.seedVariant} in ${path.basename(f)}`);
          out.set(key, { key, loc, id, lv: Number(lv), copy: c.copy, sv: c.seedVariant });
        }
      }
    }
  }
  return [...out.values()];
}

async function renderOne(page, outDir, c) {
  const spec = loadType(c.id);
  const s0 = withLevelInstruction(resolveStrings(c.id, c.loc, spec), c.id, c.lv, c.loc);
  const s1 = spec.copyStrings ? spec.copyStrings(s0, { locale: c.loc, difficulty: c.lv, unit: null, variant: c.copy, seedVariant: c.sv }) : s0;
  const strings = resolveUnitTokens(s1, spec, null, c.loc);
  const r = await renderInstance({
    type: spec, theme: null, difficulty: c.lv, locale: c.loc, variant: c.copy, seedVariant: c.sv, buildExtra: null, unit: null,
    page, outDir, baseName: `${c.id}-${c.loc}-L${c.lv}-c${c.copy}`, seedEpoch: 1, strings,
    interactive: true,
    interactiveInstruction: strings.screenInstruction || II[spec.exerciseType][spec.interactive.instructionKey][c.loc],
    answerKeySuffix: publishI18n.resolve(c.loc, 'topicPage.deckCard.answerKeyLink', 'Answer Key').value,
  });
  for (const f of fs.readdirSync(outDir)) if (f.startsWith(`${c.id}-${c.loc}-L${c.lv}-c${c.copy}`)) fs.rmSync(path.join(outDir, f), { force: true });
  return [].concat(r.qa.lints || [], r.qa.verify || [], (r.interactive && r.interactive.lints) || []).map(String);
}

/** A maker copy (scripts/makers/runtime.js makePage, the shell's copy number) in the browser: the page with the
 *  catalogue lints and the type's verify(), its answer key (keyLabel, as the maker builds it) with the key measure and the
 *  footer / page-box lints — the same checks render-instance.js puts on a wave's page and key. */
async function renderMaker(page, outDir, c) {
  const { makePage } = require(path.join(WG, '..', 'makers', 'runtime.js'));
  const { runLints } = require(path.join(WG, 'qa', 'lints.js'));
  const { measureKeyPage, judgeKey } = require(path.join(WG, 'qa', 'key-text-measure.js'));
  const spec = loadType(c.id);
  const strings = withLevelInstruction(resolveStrings(c.id, c.loc, spec), c.id, c.lv, c.loc);
  const made = makePage({ type: spec, locale: c.loc, difficulty: c.lv, theme: null, unit: null, variant: c.copy, strings, baseStrings: strings, answerKey: true, answerKeySuffix: publishI18n.resolve(c.loc, 'topicPage.deckCard.answerKeyLink', 'Answer Key').value });
  const base = path.join(outDir, `maker-${c.id}-${c.loc}-L${c.lv}-c${c.copy}`);
  const load = async (html, file) => {
    fs.writeFileSync(file, html, 'utf8');
    await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
    await page.goto(require('url').pathToFileURL(file).href, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
  };
  const fails = [];
  await load(made.html, base + '.html');
  fails.push(...(await runLints(page, { gradeBand: spec.gradeBand })), ...(await spec.verify(page)));
  if (!made.keyHtml) fails.push('no answer key');
  else {
    await load(made.keyHtml, base + '.key.html');
    fails.push(...judgeKey(await measureKeyPage(page), 'answer key'), ...(await runLints(page, { gradeBand: spec.gradeBand })).filter((l) => /footer overlap|exceeds page box/.test(l)).map((l) => 'answer key: ' + l));
  }
  for (const f of [base + '.html', base + '.key.html']) fs.rmSync(f, { force: true });
  return fails.map(String);
}
const MAKER_BROWSER_COPIES = 8;   // levels 1 and 3: copies 1-6 are the six stories, 7-8 two again; level 2: 1-5 + 3 again

// each worker its own browser and one page in it: a page in a background tab of a shared browser is throttled by Chrome,
// and a wave render (fonts, screenshots, PDFs) there stalls (the first run of this check sat 25 minutes on four copies)
const RENDER_TIMEOUT_MS = 180000;
async function run(copies) {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-rc-fit-'));
  const queue = copies.slice();
  const results = [];
  const worker = async () => {
    let browser = await puppeteer.launch({ headless: 'new' });
    let page = await browser.newPage();
    try {
      for (;;) {
        const c = queue.shift();
        if (!c) break;
        let fails, timer;
        try {
          fails = await Promise.race([(c.maker ? renderMaker : renderOne)(page, outDir, c), new Promise((_, no) => { timer = setTimeout(() => no(new Error(`no result in ${RENDER_TIMEOUT_MS / 1000} s`)), RENDER_TIMEOUT_MS); })]);
        } catch (e) {
          fails = ['render: ' + String(e.message).slice(0, 200)];
          await browser.close().catch(() => {});
          browser = await puppeteer.launch({ headless: 'new' });
          page = await browser.newPage();
        } finally { clearTimeout(timer); }
        results.push({ c, fails });
        if (results.length % 50 === 0) process.stderr.write(`  ${results.length} of ${copies.length} copies rendered\n`);
      }
    } finally { await browser.close().catch(() => {}); }
  };
  try { await Promise.all([0, 1, 2, 3].slice(0, Math.max(1, Math.min(4, copies.length))).map(worker)); } finally { fs.rmSync(outDir, { recursive: true, force: true }); }
  return results;
}

(async () => {
  const t0 = Date.now();
  let copies = liveCopies();
  if (POISON) {
    // the planted fault: every measured mask says "every order fits" (the draw as it was before 2026-11-18)
    const FIT = require(path.join(WG, 'data', 'literacy', 'rc-levels', 'choice-fit.json'));
    for (const k of Object.keys(FIT)) FIT[k] = FIT[k].map((m) => (m ? m.map(() => 63) : m));
    const st = orderStage(copies);
    console.log(`${st.fails.length ? 'caught ' : 'MISSED '} the order stage: ${st.fails.length} copies print an order not measured to fit (${st.fails[0] || ''})`);
    copies = copies.filter((c) => POISON_COPIES.includes(c.key));
    if (copies.length !== POISON_COPIES.length) throw new Error('a planted-fault copy is not live any more: ' + POISON_COPIES.join(' '));
    const res = await run(copies);
    const caught = res.filter((r) => r.fails.length);
    res.forEach((r) => console.log(`${r.fails.length ? 'caught ' : 'MISSED '} ${r.c.key}  ${r.fails.slice(0, 2).join(' | ')}`));
    console.log(`${caught.length} of ${res.length} planted-fault copies fail in the browser, the order stage ${st.fails.length ? 'fails' : 'does NOT fail'} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
    process.exit(caught.length === res.length && st.fails.length ? 0 : 1);
  }
  const locs = arg('locales'), only = arg('only');
  const st = orderStage(copies);
  st.fails.slice(0, 40).forEach((f) => console.log('FAIL ' + f));
  console.log(`order stage: ${st.pages} pages (every live copy + maker copies 1-${MAKER_COPIES}), ${st.fails.length} findings; ${st.repeated} pages past the first copy repeat an answer letter (only where the measured orders leave no other way)`);
  if (locs) copies = copies.filter((c) => locs.split(',').includes(c.loc));
  if (only) copies = copies.filter((c) => only.split(',').includes(c.key));
  if (process.argv.includes('--no-browser')) process.exit(st.fails.length ? 1 : 0);
  // --maker: the maker's copies 1-MAKER_BROWSER_COPIES of every type, level and language instead of the live copies
  const maker = process.argv.includes('--maker');
  if (maker) {
    copies = [];
    for (const loc of (locs ? locs.split(',') : LOCALES)) for (const id of TYPES) for (const lv of [1, 2, 3]) for (let v = 1; v <= MAKER_BROWSER_COPIES; v++) copies.push({ key: `${loc}:${id}:${lv}:m${v}`, loc, id, lv, copy: v, sv: '-', maker: true });
  }
  const res = await run(copies);
  const per = {};
  let bad = 0;
  for (const { c, fails } of res.sort((a, b) => a.c.key.localeCompare(b.c.key, 'en', { numeric: true }))) {
    const p = (per[c.loc] = per[c.loc] || { n: 0, bad: 0 });
    p.n++;
    if (fails.length) { p.bad++; bad++; console.log(`FAIL ${c.key} (seedVariant ${c.sv})  ${fails.join(' | ')}`); }
  }
  console.log(Object.entries(per).map(([l, p]) => `${l} ${p.n - p.bad}/${p.n}`).join('  '));
  console.log(`reading comprehension ${maker ? `maker copies 1-${MAKER_BROWSER_COPIES}` : 'live copies'}: ${res.length} rendered (page, ${maker ? '' : 'screen, '}answer key), ${bad} with QA findings; ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  process.exit(bad || st.fails.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
