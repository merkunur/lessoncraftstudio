/* =====================================================================
   live-verify-number-sieve.js — drive TOOL #36 on PRODUCTION
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-number-sieve.js

   ⚠ THIS TOOL SHIPPED WITHOUT ONE, AND WAS THE ONLY v4 INSTRUMENT
   WITHOUT ONE. Thirty siblings have a live-verify; every script in the
   number-sieve suite serves `mini tools/` from a local http server, so
   the entire suite proved things about the repo working tree and NOTHING
   proved the deployed tool worked. A local sweep cannot see a stale
   cache-buster, a missing data file, a 410 on a landing, or a hub
   thumbnail that never got scp'd — and this platform has shipped all
   four.

   ⭐ AND IT DRIVES THE APPARATUS, NEVER "IT MOUNTS". The main control
   here is a clue card: clicking it must make numbers GO DARK. The
   closing move is a three-way choice: picking the card that does not
   close must leave at least two numbers lit, and picking the one that
   does must leave exactly one — with nothing on screen calling either
   of them right or wrong.

   The model is loaded in `vm` so production is checked against the
   TOOL'S OWN ARITHMETIC rather than against numbers typed in here.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const BASE = 'https://www.lessoncraftstudio.com';
const ROOT = path.join(__dirname, '..');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* the tool's own model — the oracle for everything below */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'number-sieve.js'), 'utf8') + '\n;this.__T = NumberSieve;', sandbox);
const T = sandbox.__T;
const LIB = JSON.parse(fs.readFileSync(path.join(ROOT, 'mini tools', 'number-sieve-boards.json'), 'utf8'));
const C = require('./_number-sieve-content.js');

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('    ok   ' + m); } else { FAIL++; console.error('    FAIL ' + m); } };

const get = (url) => new Promise((resolve) => {
  https.get(url, { headers: { 'User-Agent': 'lcs-live-verify' } }, (res) => {
    let b = '';
    res.on('data', (d) => { b += d; });
    res.on('end', () => resolve({ status: res.statusCode, body: b }));
  }).on('error', () => resolve({ status: 0, body: '' }));
});

(async () => {
  const puppeteer = require('puppeteer');

  /* ---------- §1 THE ELEVEN LANDINGS ---------- */
  console.log('\n[§1 the eleven localised landings]');
  for (const loc of LOCALES) {
    const e = C[loc];
    const r = await get(`${BASE}/${loc}/tools/${e.slug}`);
    is(r.status === 200, `[${loc}] /${loc}/tools/${e.slug} returns 200 (got ${r.status})`);
    if (r.status !== 200) continue;
    is(r.body.indexOf(e.name) > -1, `[${loc}] the page carries its own name ("${e.name}")`);
    is(r.body.indexOf(e.metaDescription.slice(0, 60)) > -1, `[${loc}] the meta description is this locale's`);
    is(r.body.indexOf(e.slug) > -1, `[${loc}] the canonical carries the native slug`);
    is(r.body.indexOf('number-sieve.html') > -1, `[${loc}] the iframe points at number-sieve.html`);
    is(r.body.indexOf(e.about[2].slice(0, 50)) > -1, `[${loc}] the third about-paragraph is on the page`);
    /* ⚠ THE CLAIM THAT WAS FALSE IN ALL ELEVEN. Printing is not paid —
       the child's field sheet is built for every visitor — and the
       landing copy said the Teacher plan "adds the curated library and
       printing" until this rebuild. Scoped to the rendered prose,
       because Next's RSC flight data serialises every sibling tool. */
    const prose = (r.body.match(/<p[^>]*>[\s\S]*?<\/p>/g) || []).join(' ');
    const SELLS_PRINT = {
      en: /plan adds[^.]*and printing/i, de: /Paket ergänzt die Kartei und das Drucken/i,
      fr: /ajoute la biblioth[^.]*et l.impression\./i, es: /agrega la colecci[^.]*y la impresi[oó]n\./i,
      pt: /e a impress[ãa]o fazem parte/i, it: /e la stampa fanno parte/i,
      nl: /en het afdrukken erbij/i, sv: /samlingen och utskrifterna/i,
      da: /samling og udskrivning til\./i, no: /samlingen og utskrift\./i, fi: /kokoelman ja tulostuksen/i
    };
    is(!SELLS_PRINT[loc].test(prose), `[${loc}] the landing no longer sells printing as paid`);
  }

  /* ---------- §2 THE APPARATUS, DRIVEN ON PRODUCTION ---------- */
  console.log('\n[§2 the apparatus, driven on production]');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await page.setViewport({ width: 1024, height: 900 });
  await page.goto(`${BASE}/mini-tools/number-sieve.html?lang=en&embed=1`, { waitUntil: 'networkidle0', timeout: 45000 });
  await page.waitForSelector('.nsv-card', { timeout: 20000 });

  /* the repertoire really is served, and at the size we shipped */
  const served = await get(`${BASE}/mini-tools/number-sieve-boards.json`);
  let servedN = 0;
  try { servedN = JSON.parse(served.body).boards.length; } catch (_) { /* left at 0 */ }
  is(servedN === LIB.boards.length, `production serves the whole library (${servedN} boards, expected ${LIB.boards.length})`);

  /* ⚠ NON-VACUITY FIRST: an empty NodeList compares happily against
     another empty one, and this gate has no business asserting anything
     about cells until it has seen some. */
  const boot = await page.evaluate(() => ({
    cells: document.querySelectorAll('.nsv-cell').length,
    lit: document.querySelectorAll('.nsv-cell:not(.nsv-out)').length,
    cards: document.querySelectorAll('.nsv-card:not(.nsv-spare)').length,
    spares: document.querySelectorAll('.nsv-spare').length,
    fams: document.querySelectorAll('.nsv-fam').length
  }));
  is(boot.cells >= 20, `the field is on screen (${boot.cells} cells)`);
  is(boot.lit === boot.cells, `every number starts alight (${boot.lit}/${boot.cells})`);
  is(boot.cards >= 2, `the deck is dealt (${boot.cards} cards)`);
  is(boot.spares === 3, `the closing choice is dealt (${boot.spares} candidates)`);
  is(boot.fams === 6, `all six card kinds are offered (${boot.fams})`);

  /* park two markers, then turn a card and watch the field */
  await page.evaluate(() => {
    [7, 13].forEach((n) => { const c = document.querySelector('.nsv-cell[data-n="' + n + '"]'); if (c) c.click(); });
  });
  await new Promise((r) => setTimeout(r, 200));
  const parked = await page.evaluate(() => document.querySelectorAll('.nsv-cell.nsv-marked').length);
  is(parked === 2, `two tables can park their own markers (${parked})`);

  const before = await page.evaluate(() => document.querySelectorAll('.nsv-cell:not(.nsv-out)').length);
  await page.evaluate(() => { const b = document.querySelector('.nsv-card.nsv-next'); if (b) b.click(); });
  await new Promise((r) => setTimeout(r, 600));
  const after = await page.evaluate(() => document.querySelectorAll('.nsv-cell:not(.nsv-out)').length);
  is(after < before, `⭐ turning a card really takes numbers off the field (${before} → ${after} alight)`);

  /* the marker is committed from the first card */
  await page.evaluate(() => { const c = document.querySelector('.nsv-cell[data-n="19"]'); if (c) c.click(); });
  await new Promise((r) => setTimeout(r, 200));
  const stillTwo = await page.evaluate(() => document.querySelectorAll('.nsv-cell.nsv-marked').length);
  is(stillTwo === 2, `⭐ a marker cannot be moved once a card has turned (${stillTwo} still down)`);

  /* run to the closing move */
  for (let i = 0; i < 8; i++) {
    const more = await page.evaluate(() => { const b = document.querySelector('.nsv-card.nsv-next'); if (!b) return false; b.click(); return true; });
    if (!more) break;
    await new Promise((r) => setTimeout(r, 260));
  }
  const atClose = await page.evaluate(() => ({
    lit: document.querySelectorAll('.nsv-cell:not(.nsv-out)').length,
    hint: (document.querySelector('.nsv-hint') || {}).textContent || '',
    armed: document.querySelectorAll('.nsv-spare:not([disabled])').length
  }));
  is(atClose.lit >= T.MIN_PENULTIMATE, `⭐ the last card acts on a PATTERN, not a coin flip (${atClose.lit} still alight)`);
  is(atClose.armed === 3, `the three candidates are live (${atClose.armed})`);
  is(atClose.hint.length > 0, `the tool asks the closing question ("${atClose.hint}")`);

  /* ⭐ pick a candidate that does NOT close: the field must say so, and
     nothing may call it wrong */
  const wrongPick = await page.evaluate(() => {
    const T2 = window.NumberSieve;
    const els = document.querySelectorAll('.nsv-spare');
    const win = T2.closingSpare(T2.st);
    const lose = [0, 1, 2].filter((i) => i !== win)[0];
    els[lose].click();
    return lose;
  });
  await new Promise((r) => setTimeout(r, 500));
  const afterWrong = await page.evaluate(() => ({
    lit: document.querySelectorAll('.nsv-cell:not(.nsv-out)').length,
    verdict: document.querySelectorAll('[class*="correct"],[class*="wrong"],[class*="right"]').length
  }));
  is(afterWrong.lit >= 2, `⭐ a candidate that does not close leaves numbers standing (${afterWrong.lit}) — the material says no, nobody else does`);
  is(afterWrong.verdict === 0, `nothing on screen is marked right or wrong (${afterWrong.verdict} verdict nodes)`);
  void wrongPick;

  /* and the one that does close leaves exactly one */
  await page.evaluate(() => {
    const T2 = window.NumberSieve;
    const els = document.querySelectorAll('.nsv-spare');
    els[T2.closingSpare(T2.st)].click();
  });
  await new Promise((r) => setTimeout(r, 500));
  const done = await page.evaluate(() => document.querySelectorAll('.nsv-cell:not(.nsv-out)').length);
  is(done === 1, `⭐ the closing card leaves exactly one number standing (${done})`);

  /* order-invariance, watched rather than asserted */
  await page.evaluate(() => { const b = document.querySelector('[data-fk="chip:shuffle"]'); if (b && !b.disabled) b.click(); });
  await new Promise((r) => setTimeout(r, 400));
  const reshuffled = await page.evaluate(() => ({
    up: document.querySelectorAll('.nsv-card.nsv-up').length,
    marked: document.querySelectorAll('.nsv-cell.nsv-marked').length
  }));
  is(reshuffled.up === 0, `shuffling turns the whole deck face-down again (${reshuffled.up} face-up)`);
  is(reshuffled.marked === 2, `⭐ and the committed markers stay committed across a shuffle (${reshuffled.marked})`);

  is(errs.length === 0, `zero console errors (${errs.slice(0, 2).join(' | ')})`);
  await page.close();

  /* ---------- §3 THE HUB THUMBNAIL ---------- */
  console.log('\n[§3 the hub thumbnail]');
  const thumb = await get(`${BASE}/mini-tools/tool-previews/number-sieve.webp`);
  is(thumb.status === 200, `the hub card image serves 200 (got ${thumb.status}) — the #38 defect, gated`);

  await browser.close();
  console.log(`\n${FAIL ? 'FAIL' : 'PASS'} — ${PASS} assertions driven on production, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})();
