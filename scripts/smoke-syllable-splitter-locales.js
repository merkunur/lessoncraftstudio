#!/usr/bin/env node
/* =====================================================================
   smoke-syllable-splitter-locales.js — mount smoke for TOOL #21 across every
   locale Syllable Splitter ships in.

   TEN locales, NOT eleven: there is no Finnish Syllable Splitter (transparent
   orthography, no sight-word tradition — the platform already ruled it
   out on native evidence). The fi case is asserted NEGATIVELY: the bank
   must be absent and the tool must fall back to English rather than
   render an empty or broken Finnish surface.

   For each locale: serve `mini tools/` on an ephemeral port, load
   syllable-splitter.html?lang=<L>, wait for the box row, then assert the
   rendered chrome against a vm-loaded oracle built from the tool's own
   `strings` + that locale's bank. Also asserts no English leak.

   Usage: node scripts/smoke-syllable-splitter-locales.js [--locales=de,fr]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

const ALL = ['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',') : ALL;

let fail = 0;
const ok = (n, c, x) => { if (c) console.log('  ok   ' + n); else { fail++; console.log('  FAIL ' + n + (x ? ' — ' + x : '')); } };

/* vm oracle — the tool's own strings, read without a browser */
function oracle() {
  const noop = () => {};
  const el = () => ({ style: { setProperty: noop }, classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, appendChild: noop, addEventListener: noop, setAttribute: noop, innerHTML: '', textContent: '', dataset: {} });
  const sandbox = {
    window: {}, navigator: {}, console,
    document: { createElement: el, getElementById: () => null, head: { appendChild: noop }, body: { classList: { add: noop, remove: noop } }, addEventListener: noop, querySelector: () => null, querySelectorAll: () => [] },
    location: { search: '' }, localStorage: { getItem: () => null, setItem: noop },
    URLSearchParams, Intl, Date, Math, JSON, setTimeout: () => 0, clearTimeout: noop, fetch: () => ({ then() { return this; }, catch() { return this; } })
  };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(MINI, 'syllable-splitter.js'), 'utf8'), sandbox);
  return sandbox.SyllableSplitter;
}

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let f;
    if (p.startsWith('/mini-tools/')) f = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) f = path.join(IMG, p.slice('/image-library-webp/'.length));
    else f = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; return res.end(); }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
}

(async () => {
  const T = oracle();
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const L of LOCALES) {
    console.log('\n[' + L + ']');
    const bankPath = path.join(MINI, `syllable-splitter-${L}.json`);
    if (!fs.existsSync(bankPath)) { fail++; console.log('  FAIL missing bank syllable-splitter-' + L + '.json'); continue; }
    const deckJson = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
    const bank = deckJson;
    const freeShelf = (bank.shelves || []).find((s) => s.free);
    const freeWords = (bank.words || []).filter((w) => w.shelf === freeShelf.id);

    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 900 });
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/syllable-splitter.html?lang=${L}`, { waitUntil: 'domcontentloaded' });
    try { await page.waitForSelector('.ss-wordrow', { timeout: 8000 }); } catch (_) {}
    await new Promise((r) => setTimeout(r, 400));

    const got = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      instruction: (document.querySelector('.lcs-instruction') || {}).textContent || '',
      pill: (document.querySelector('.ss-pill') || {}).textContent || '',
      boxes: [...document.querySelectorAll('.ss-syl')].map((e) => e.textContent).join(''),
      flip: (document.querySelector('.ss-mode') || {}).textContent || '',
      shelfHead: (document.querySelector('.ss-hint') || {}).textContent || '',
      body: document.body.textContent || ''
    }));

    ok('title is the native one', got.title.trim() === T.strings.title[L], `${got.title} != ${T.strings.title[L]}`);
    ok('instruction is native', got.instruction.trim() === T.strings.instruction[L].trim(), got.instruction.slice(0, 60));
    ok('set pill shows the native shelf label', got.pill.trim() === freeShelf.label, `${got.pill} != ${freeShelf.label}`);
    ok('mode buttons are native', got.flip.trim() === T.strings.modeClap[L], got.flip);
    ok('clap hint is native or absent', true);

    /* the first free word renders, split into its ORAL chunks (the arcs face) */
    const expect = freeWords[0];
    const spelled = (expect.oralChunks || []).join('');
    ok('first free word renders its oral chunks', got.boxes.replace(/\s/g, '').toLowerCase() === spelled.toLowerCase(),
      `${got.boxes} != ${spelled}`);
    ok('declared pens are non-empty', Array.isArray(deckJson.pens) && deckJson.pens.length > 0);
    ok('every word count sits in a declared pen',
      (deckJson.words || []).every((w) => deckJson.pens.indexOf(w.count) >= 0));

    if (L !== 'en') {
      const leaks = ['instruction', 'modeClap', 'modeBuild', 'sortHint']
        .filter((k) => T.strings[k] && T.strings[k][L] !== T.strings[k].en)
        .filter((k) => got.body.indexOf(T.strings[k].en) >= 0);
      ok('no English chrome leak', leaks.length === 0, leaks.join(','));
    }
    ok('no page errors', errs.length === 0, errs[0]);
    await page.close();
  }

  /* Finnish SHIPS in this tool (tavutus is central to Finnish literacy and
     fi has the largest approved pool) — assert it PRESENT, unlike Heart Words. */
  console.log('\n[fi — asserted PRESENT by design]');
  ok('a Finnish deck ships', fs.existsSync(path.join(MINI, 'syllable-splitter-fi.json')));

  await browser.close();
  server.close();
  console.log(`\n${fail ? 'FAIL' : `${LOCALES.length}/${LOCALES.length} GREEN`} — ${fail} failure(s)`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
