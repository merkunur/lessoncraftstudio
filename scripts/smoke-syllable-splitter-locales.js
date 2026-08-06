#!/usr/bin/env node
/* =====================================================================
   smoke-syllable-splitter-locales.js — mount smoke for TOOL #22 across
   ALL ELEVEN locales Syllable Splitter ships in.

   ⚠ THIS DOCBLOCK USED TO BE AN UNEDITED HEART WORDS CLONE, and every
   clause of it was false: it called this tool #21, claimed there is no
   Finnish Syllable Splitter ("transparent orthography, no sight-word
   tradition"), said fi was asserted NEGATIVELY, and told you to wait for
   a "box row". `syllable-splitter-fi.json` has always shipped, the code
   at the bottom of this very file has always asserted fi PRESENT, and
   Finnish tavutus is central to Finnish literacy — fi has the LARGEST
   approved syllable pool of the eleven. A variable holding a rendered
   mode button was still called `flip`.

   This is the recorded "cloning a gate copies its selectors AND its
   globals" trap, in its worst form: the clone was in the PROSE, which is
   what the next reader trusts when the code is too long to re-derive.

   For each locale: serve `mini tools/` on an ephemeral port, load
   syllable-splitter.html?lang=<L>&embed=1, wait for the clap face, then
   assert the rendered chrome against a vm-loaded oracle built from the
   tool's own `strings` + that locale's deck. Also asserts no English leak.

   ⚠ WHAT THIS GATE CAN AND CANNOT CATCH — measured, by poisoning it.
   The oracle reads the tool's OWN strings, so both sides of every
   comparison come from one file. Editing a string therefore moves the
   expectation with it and the gate stays green: it CANNOT catch a bad
   translation. Poisoning the string was a wasted poison; poisoning the
   RENDER (making the cue emit English regardless of locale) fires four
   assertions immediately.
   So this gate proves the LOCALE-SELECTION AND RENDER PATH is correct in
   all eleven languages — nothing about whether the German is good German.
   That is the native panels' job (§A.13.48), and no amount of gate work
   substitutes for it.

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
    /* ⚠ `embed=1`, because that is what production loads — every tool
       landing page builds its iframe with it. Loading standalone here made
       the cue assertion below VACUOUS: the in-stage cue only renders in an
       embed (the shell shows its own copy otherwise), so the empty-string
       branch passed in all eleven locales and measured nothing. Testing
       the surface a teacher never sees is how a gate certifies nothing. */
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/syllable-splitter.html?lang=${L}&embed=1`, { waitUntil: 'domcontentloaded' });
    try { await page.waitForSelector('.ss-clap', { timeout: 8000 }); } catch (_) {}
    await new Promise((r) => setTimeout(r, 400));

    const got = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      instruction: (document.querySelector('.lcs-instruction') || {}).textContent || '',
      pill: (document.querySelector('.ss-pill-value') || {}).textContent || '',
      eyebrow: (document.querySelector('.ss-pill-eyebrow') || {}).textContent || '',
      boxes: [...document.querySelectorAll('.ss-syl')].map((e) => e.textContent).join(''),
      mode: (document.querySelector('.ss-segbtn') || {}).textContent || '',
      cue: (document.querySelector('.ss-cue') || {}).textContent || '',
      body: document.body.textContent || ''
    }));

    ok('title is the native one', got.title.trim() === T.strings.title[L], `${got.title} != ${T.strings.title[L]}`);
    ok('instruction is native', got.instruction.trim() === T.strings.instruction[L].trim(), got.instruction.slice(0, 60));
    ok('set menu shows the native shelf label', got.pill.trim() === freeShelf.label, `${got.pill} != ${freeShelf.label}`);
    ok('set menu is labelled as a MENU in this language', got.eyebrow.trim() === T.strings.shelfPick[L], got.eyebrow);
    ok('mode buttons are native', got.mode.trim() === T.strings.modeClap[L], got.mode);

    /* ⚠ WAS `ok('clap hint is native or absent', true)` — a hard-coded
       `true`. It could not fail, so it certified nothing while reading as
       one more green line in a passing run. Assert the thing it named. */
    ok("the in-stage cue is this locale's instruction, verbatim",
      got.cue.trim() === T.strings.instruction[L].trim(), got.cue.slice(0, 60) || '(absent)');

    /* ⭐ THE WORD IS HIDDEN AT REST — the tool's central ruling, and a
       per-locale claim, because a leak would be locale-specific. */
    ok('the word is NOT on screen at rest', got.boxes === '', got.boxes);

    ok('declared pens are non-empty', Array.isArray(deckJson.pens) && deckJson.pens.length > 0);
    /* ⚠ oralCount, NOT count. The pens are filled by `wordsWithCount()`,
       which reads oralCount — what the class CLAPS. The shipped assertion
       tested `count`, the WRITTEN count: the wrong field. French is
       exactly where the two differ (18 of 55 words), so a word whose
       clapped count had no pen would have passed this gate and then been
       unsortable on screen. */
    const unpenned = (deckJson.words || []).filter((w) => deckJson.pens.indexOf(w.oralCount) < 0);
    ok("every word's CLAPPED count sits in a declared pen", unpenned.length === 0,
      unpenned.slice(0, 3).map((w) => w.display + ':' + w.oralCount).join(','));

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
