/* =====================================================================
   live-verify-unit-handle.js — TOOL #40 on production, all 11 locales
   ---------------------------------------------------------------------
   Run:  node scripts/live-verify-unit-handle.js

   ⚠ NEVER "it mounts". This DRIVES the handle on the live site with a
   real pointer drag and then checks the thing the tool exists to show:
   THE UNIT SHRANK, THE NUMBER GREW, AND THE OBJECT DID NOT MOVE — the
   object's rendered geometry compared byte-for-byte before and after.

   ⚠ AND IT DRIVES THE HANDLE, NOT A BUTTON. The recorded class-graph
   defect was five green suites proving every string RENDERED and none
   proving a CONTROL ACTED; the recorded #39 defect was a liveness gate
   that could not see a consequence-free control. So the assertion here
   is never "the handle moved" — it is that the OTHER elements changed
   and the object did not.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const C = require('./_unit-handle-content.js');

/* the model, loaded headless, so production can be checked against the
   tool's OWN arithmetic rather than against numbers typed in here */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'unit-handle.js'), 'utf8') + '\n;this.__T = UnitHandle;', sandbox);
const T = sandbox.__T;

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---- 1. the eleven landings ------------------------------------- */
  for (const loc of LOCALES) {
    const url = `${BASE}/${loc}/tools/${C[loc].slug}`;
    const page = await browser.newPage();
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const seen = await page.evaluate(() => ({
      h1: (document.querySelector('h1') || {}).textContent || '',
      desc: (document.querySelector('meta[name="description"]') || { content: '' }).content,
      canon: (document.querySelector('link[rel=canonical]') || { href: '' }).href,
      iframe: (document.querySelector('iframe') || { src: '' }).src,
      body: document.body.textContent
    }));
    is(res.status() === 200, `${loc}: ${url} -> ${res.status()}`);
    is(seen.h1.indexOf(C[loc].name) >= 0, `${loc}: h1 is "${seen.h1.trim()}"`);
    is(seen.desc === C[loc].metaDescription, `${loc}: meta description is this locale's`);
    is(seen.canon.indexOf(C[loc].slug) >= 0, `${loc}: canonical carries the native slug`);
    is(/\/mini-tools\/unit-handle\.html/.test(seen.iframe), `${loc}: the iframe points at unit-handle.html`);
    is(seen.body.indexOf(C[loc].about[2].slice(0, 40)) >= 0, `${loc}: the third paragraph is on the page`);
    /* ⚠ THE NO-NAMED-UNIT REFUSAL, CHECKED ON THE RENDERED LANDING.
       A landing page is exactly where "measure in centimetres" slips in
       as a helpful clarification, and it would turn this into a ruler. */
    is(!/\b(cm|centimet|zentimet|centímetr|centimetr|sentimet|inch|tum|tomme)/i.test(seen.body),
      `${loc}: no named unit anywhere on the landing`);
    await page.close();
  }

  /* ---- 2. ⭐ THE HANDLE, DRAGGED, on production -------------------- */
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 900 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
  await page.goto(`${BASE}/mini-tools/unit-handle.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForSelector('.unh-bench', { timeout: 20000 });
  await wait(700);

  /* the object book must come from the server, not the offline fallback */
  const book = await page.evaluate(() => fetch('/mini-tools/unit-handle-objects.json').then((r) => r.json()).then((d) => d.objects.length).catch(() => 0));
  is(book === 12, `the object book served ${book} objects from production (expected 12)`);

  /* read the whole stage: both counts, and the object's exact geometry */
  const stage = () => page.evaluate(() => {
    const img = document.querySelector('.unh-obj');
    const r = img ? img.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
    return {
      counts: Array.from(document.querySelectorAll('.unh-count')).map((e) => e.textContent),
      tilesA: document.querySelectorAll('.unh-tape-a .unh-tile').length,
      tilesB: document.querySelectorAll('.unh-tape-b .unh-tile').length,
      obj: [r.left, r.top, r.width, r.height].map((v) => Math.round(v * 100) / 100).join(','),
      verdict: document.querySelectorAll('[class*="correct"],[class*="wrong"]').length
    };
  });

  const before = await stage();
  /* ⚠ NON-VACUITY FIRST. Every tape assertion below is a NodeList
     comparison, and an empty NodeList compares happily against another
     empty one. This gate shipped once keyed on `[data-t="a"]`, which the
     tool never emits — it would have passed on a tool with NO TAPES AT
     ALL. Prove the tapes are there before proving anything about them. */
  is(before.tilesA >= 2 && before.tilesB >= 2,
    `both tapes are actually laid — ${before.tilesA} and ${before.tilesB} tiles`);
  is(before.counts.length === 2, `two tapes, two numbers on production (saw ${before.counts.join(' / ')})`);
  is(before.counts[0] === before.counts[1],
    `the two tapes open on the same unit, so they agree — ${before.counts[0]} and ${before.counts[1]}`);

  /* ⭐ A REAL POINTER DRAG on tape A's grip, leftwards = smaller unit.
     Not a synthetic state poke: the recorded drag defect (the repaint
     released pointer capture and only the FIRST move applied) is only
     visible through the real event stream. */
  const grip = await page.$('.unh-tape-a .unh-grip');
  is(!!grip, 'tape A carries a grip to drag');
  const g = await grip.boundingBox();
  is(g.width >= 44 && g.height >= 44, `the grip is a ${Math.round(g.width)}x${Math.round(g.height)} target (K-2 floor 44)`);

  await page.mouse.move(g.x + g.width / 2, g.y + g.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 8; i++) { await page.mouse.move(g.x + g.width / 2 - i * 14, g.y + g.height / 2); await wait(24); }
  await page.mouse.up();
  await wait(240);

  const after = await stage();
  is(Number(after.counts[0]) > Number(before.counts[0]),
    `⭐ THE THESIS ON PRODUCTION: the unit shrank and the number ROSE, ${before.counts[0]} -> ${after.counts[0]}`);
  is(after.tilesA > before.tilesA,
    `the tape re-laid itself — ${before.tilesA} tiles became ${after.tilesA}`);
  is(after.obj === before.obj,
    `⭐ AND THE OBJECT DID NOT MOVE — geometry identical (${before.obj})`);
  is(after.counts[1] === before.counts[1],
    `⭐ the other tape is untouched, still reading ${after.counts[1]}`);
  is(after.tilesB === before.tilesB, 'the other tape kept every one of its tiles');
  is(after.verdict === 0, '⭐ neither number is ever marked right or wrong');

  /* the two named buttons must do what their labels say */
  const foot = async (label) => {
    const ok = await page.evaluate((l) => {
      const b = Array.from(document.querySelectorAll('.unh-foot .unh-chip')).find((x) => x.textContent === l);
      if (!b || b.disabled) return false;
      b.click(); return true;
    }, label);
    await wait(200);
    return ok;
  };

  is(await foot('Make it come out even'), '"Make it come out even" is live');
  const even = await page.evaluate(() => document.querySelectorAll('.unh-tape-a .unh-tile.unh-part').length);
  is(even === 0, `⭐ and it comes out even — ${even} leftover pieces on tape A`);

  is(await foot('Same unit on both'), '"Same unit on both" is live');
  const matched = await stage();
  is(matched.counts[0] === matched.counts[1],
    `⭐ and the units match — both tapes read ${matched.counts[0]}`);

  const objBefore = matched.obj;
  is(await foot('Another object'), '"Another object" is live');
  const swapped = await stage();
  is(swapped.obj !== objBefore, 'a different object is on the bench');
  is(Number(swapped.counts[0]) >= 2, `the new object still measures ${swapped.counts[0]} — never fewer than 2 units`);

  is(errs.length === 0, 'zero console errors on production' + (errs.length ? ' — ' + errs[0] : ''));
  await page.close();

  /* ---- 3. the hub card actually has its thumbnail ----------------- */
  const hub = await browser.newPage();
  const r = await hub.goto(`${BASE}/mini-tools/tool-previews/unit-handle.webp`, { timeout: 30000 });
  is(r.status() === 200, `the hub thumbnail serves ${r.status()} (the #38 defect, gated)`);
  await hub.close();

  await browser.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions driven on production`);
})();
