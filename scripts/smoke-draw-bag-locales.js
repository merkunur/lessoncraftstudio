/* =====================================================================
   smoke-draw-bag-locales.js — 11-locale string digest for TOOL #38
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-draw-bag-locales.js

   ⚠ A FRESH BROWSER PER LOCALE. Reusing one leaks the first locale's
   cached module and every later locale quietly passes on English.
   ⚠ CONTROLS ARE REACHED BY INDEX, never by an English aria-label —
   the labels are the thing under test.
   ⚠ NUMERIC PLACEHOLDERS MATCH [0-9]+ AND NOTHING ELSE. The recorded
   arrow-strip defect: a digest matched placeholders with `.{1,60}?`,
   which matches ANY prose, so a string that was dead in all eleven
   locales reported as rendered in all eleven. A wildcard in a coverage
   check manufactures coverage. {piece} is not a wildcard either — it is
   substituted with another AUTHORED string, so the digest substitutes
   the real one and matches the literal result.
   ⚠ THE WHOLE STRING SET IS PRINTED, seen and unseen. A soft hyphen in
   a Danish label once survived every assertion and surfaced only
   because a digest printed it.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PUBLIC = path.join(ROOT, 'frontend', 'public');
const PORT = 5511;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const serve = () => http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const f = url.indexOf('/image-library-webp/') === 0 ? path.join(PUBLIC, url) : path.join(MINI, path.basename(url));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'draw-bag.js'), 'utf8') + '\n;this.__T = DrawBag;', sandbox);
const T = sandbox.__T;

/* rendered as visible text at some point in the session */
const VISIBLE = ['title', 'doctrine', 'hintGuess', 'hintCarry', 'hintClaimFirst', 'hintDraw', 'hintAgain',
  'hintOpen', 'hintLook', 'fillBtn', 'sealBtn', 'cancelBtn', 'againBtn', 'openBtn', 'anotherBtn',
  'printBtn', 'gateLine', 'unlock'];
/* rendered only into an aria-label — invisible, and just as load-bearing */
const ARIA = ['lenLabel', 'skinLabel', 'skinShapes', 'drawAria', 'tagAria', 'litAria', 'guessLabel',
  'inLabel', 'outLabel', 'poolLabel', 'recordAria', 'cellAria', 'openedLabel', 'moreAria', 'lessAria',
  'pieceRound', 'pieceSquare', 'pieceTriangle', 'pieceDiamond', 'pieceHexagon', 'pieceStar'];
/* ⚠ `instruction` is rendered by the SHELL and then hidden by
   `.lcs-app.embed .lcs-instruction{display:none}` on every iframed load, so
   it never appears in the page text — it survives only in the
   role="application" accessible name. `hintFill` shows only on an empty bag,
   which the seeded book prevents; the builder path exercises it. */
const ALSO = ['hintFill', 'instruction'];
const ALL = VISIBLE.concat(ARIA, ALSO);

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* the pattern a key must match once rendered. {i} is a NUMERAL. {piece}
   is another authored string, so it is substituted, never wildcarded. */
function patternFor(key, loc) {
  const raw = T.strings[key][loc];
  let p = esc(raw);
  p = p.split(esc('{i}')).join('[0-9]+');
  p = p.split(esc('{piece}')).join('(?:' + T.KINDS.map((k) => esc(T.strings[T.PIECE_KEY[k]][loc])).join('|') + ')');
  return new RegExp(p);
}

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function makePage(browser, premium) {
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => (r.url().includes('/api/auth/me')
    ? r.respond({
      status: 200, contentType: 'application/json',
      body: JSON.stringify(premium
        ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
        : { user: { subscriptionTier: 'free' }, subscription: null })
    })
    : r.continue()));
  await page.evaluateOnNewDocument((p) => {
    try { localStorage.clear(); } catch (_) {}
    if (p) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
    window.print = function () {};
  }, premium);
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const load = async (page, loc) => {
  await page.setViewport({ width: 1024, height: 950 });
  await page.goto(`http://127.0.0.1:${PORT}/draw-bag.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.drb-bag', { timeout: 9000 });
  await wait(300);
};
const sweepText = (page) => page.evaluate(() => document.body.innerText + '\n' + document.documentElement.outerHTML);
const clickIdx = async (page, sel, i) => {
  await page.evaluate((s, n) => { const e = document.querySelectorAll(s)[n]; if (e && !e.disabled) e.click(); }, sel, i);
  await wait(70);
};
const drawAll = async (page) => {
  for (let i = 0; i < 45; i++) {
    const done = await page.evaluate(() => { const b = document.querySelector('.drb-bag'); if (!b || b.disabled) return true; b.click(); return false; });
    if (done) break;
    await wait(35);
  }
};

(async () => {
  const server = serve().listen(PORT);
  for (const loc of LOCALES) {
    /* ⚠ a fresh browser, not a fresh page */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const seen = {};
    for (const k of ALL) seen[k] = false;
    let errs = [];
    let gateShape = null;

    try {
      /* ---- premium pass: the second run and its hint ---------------- */
      const p1 = await makePage(browser, true);
      await load(p1, loc);
      const mark = async () => {
        const txt = await sweepText(p1);
        for (const k of ALL) if (!seen[k] && patternFor(k, loc).test(txt)) seen[k] = true;
      };
      await mark();

      /* ⚠ THE FOOT IS TWO GROUPS NOW, and the setup group LEAVES THE SCREEN
         between the first draw and the reveal (that is invention 1 — the
         bag must be visibly unswappable while the two runs are compared).
         So indices are only valid in a named state:
             at rest / after the reveal : 0 open  1 again  2 fill  3 another  4 print
             inside the builder         : 0 close 1 leave
         and `.drb-sep` is a div, so it does not shift the chip indices. */

      /* the lift, the drop, and the first draw */
      await p1.evaluate(() => { const e = document.querySelector('.drb-gpiece'); if (e) e.click(); });
      await wait(70);
      await mark();                                            /* hintCarry */
      await p1.evaluate(() => { const z = document.querySelector('.drb-shelf[data-zone="1"]'); if (z) z.click(); });
      await wait(70);
      await mark();                                            /* hintGuess */
      await clickIdx(p1, '.drb-bag', 0);
      await mark();                                            /* hintDraw */
      await drawAll(p1);
      await mark();                                            /* hintAgain */
      await clickIdx(p1, '.drb-foot .drb-chip', 1);            /* run it again */
      await wait(150);
      await drawAll(p1);
      await mark();                                            /* hintOpen */
      await clickIdx(p1, '.drb-foot .drb-chip', 0);            /* open the bag */
      await wait(150);
      await mark();                                            /* hintLook, openedLabel */

      /* the committed prior doubles as the highlight control */
      await p1.evaluate(() => { const e = document.querySelector('.drb-gpiece'); if (e) e.click(); });
      await wait(70);
      await mark();                                            /* litAria */

      /* stepping the library announces the bag's tag */
      await clickIdx(p1, '.drb-foot .drb-chip', 3);            /* another bag */
      await wait(120);
      await mark();                                            /* tagAria */

      /* the builder, last: it is the only path to hintFill / sealBtn / cancelBtn */
      await clickIdx(p1, '.drb-foot .drb-chip', 2);            /* fill the bag */
      await wait(120);
      await mark();
      await clickIdx(p1, '.drb-fillcol .drb-step', 0);         /* one more piece */
      await mark();
      await clickIdx(p1, '.drb-foot .drb-chip', 1);            /* leave it as it was */
      await wait(120);
      await mark();
      await clickIdx(p1, '.drb-foot .drb-chip', 2);            /* fill again */
      await wait(120);
      await clickIdx(p1, '.drb-fillcol .drb-step', 0);
      await clickIdx(p1, '.drb-foot .drb-chip', 0);            /* close the bag */
      await wait(150);
      await mark();
      errs = errs.concat(p1._errs);
      /* no other locale's title may have leaked onto the page */
      const bodyText = await p1.evaluate(() => document.body.innerText);
      const leaked = LOCALES.filter((o) => o !== loc && T.strings.title[o] !== T.strings.title[loc] && bodyText.indexOf(T.strings.title[o]) >= 0);
      is(leaked.length === 0, '[' + loc + '] no other locale\'s title on the page' + (leaked.length ? ' (leaked: ' + leaked.join(',') + ')' : ''));
      await p1.close();

      /* ---- free pass: the gate line and the unlock link ------------- */
      const p2 = await makePage(browser, false);
      await load(p2, loc);
      const mark2 = async () => {
        const txt = await sweepText(p2);
        for (const k of ALL) if (!seen[k] && patternFor(k, loc).test(txt)) seen[k] = true;
      };
      await drawAll(p2);
      await mark2();
      await clickIdx(p2, '.drb-foot .drb-chip', 1);            /* locked: run it again */
      await wait(150);
      await mark2();
      gateShape = await p2.evaluate(() => {
        const g = document.querySelector('.drb-gate');
        if (!g) return null;
        const a = g.querySelector('a');
        return { kids: g.childNodes.length, href: a ? a.getAttribute('href') : null, aText: a ? a.textContent : null };
      });
      errs = errs.concat(p2._errs);
      await p2.close();
    } catch (e) {
      FAIL++;
      console.error('  FAIL [' + loc + '] harness threw: ' + (e && e.message ? e.message : e));
    }

    /* ---- THE DIGEST. Printed in full, seen and unseen. -------------- */
    console.log('');
    console.log('[' + loc + ']  ' + JSON.stringify(T.strings.title[loc]));
    for (const k of ALL) {
      console.log('   ' + (seen[k] ? 'x' : ' ') + ' ' + k.padEnd(14) + JSON.stringify(T.strings[k][loc]));
    }
    const missing = ALL.filter((k) => !seen[k]);
    is(missing.length === 0, '[' + loc + '] every authored string rendered' + (missing.length ? ' — MISSING: ' + missing.join(', ') : ' (' + ALL.length + ' keys)'));
    is(errs.length === 0, '[' + loc + '] zero console errors' + (errs.length ? ' — ' + errs[0] : ''));
    /* ⚠ TWO NODES AND A REAL LINK, never a concatenation — joining them
       makes the one actionable thing on the gate unclickable */
    is(gateShape && gateShape.kids === 2 && /^\/[a-z]{2}\/pricing/.test(gateShape.href || ''),
      '[' + loc + '] the gate is two nodes with a real link (' + (gateShape ? gateShape.kids + ' nodes, ' + gateShape.href : 'no gate') + ')');

    await browser.close();
  }
  server.close();
  console.log('');
  if (FAIL) { console.error('FAIL — ' + FAIL + ' of ' + (PASS + FAIL) + ' assertions'); process.exit(1); }
  console.log('PASS — ' + PASS + ' assertions across ' + LOCALES.length + ' locales');
})();
