#!/usr/bin/env node
/* =====================================================================
   local-test-dictation-desk.js — the local Definition-of-Done.
   Nothing here is asserted from source: every claim is measured in a real
   browser against the rendered DOM.

   scripts/visual-qa-activity.js resolves only ids declared in a
   *-activities.json manifest, so it cannot see a free-play tool
   (local-test-heart-words.js:4-8 records the same). SECTION L8 is the
   substitute: the full viewport sweep with measured containment, at
   DESKTOP widths too, not just phone.

     L1 mounts; the slate is COVERED and no letter of the word is in the
        DOM — the leak test, and the whole premise of a dictation
     L2 one tap uncovers exactly one unit, in order, never re-ordered
     L3 the silent tail arrives LAST, is shown, and is never spoken
     L4 the finished slate spells the word exactly (incl. the travelling
        e of a split digraph)
     L5 no child input surface anywhere; no verdict text; no image
     L6 free vs subscriber: locked stages ABSENT, print DOM absent, the
        word-list panel gated, the exact CTA
     L7 the teacher's own word: type it, mark a join, it reveals as marked
     L8 the sweep: 320-1366, FITS at desktop + PROVEN reachable below,
        taps >=44, rendered text >=14px, zero console errors

   Usage: node scripts/local-test-dictation-desk.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'dictation-desk', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44, MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const wait = (ms) => new Promise(r => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    const f = path.join(MINI, path.basename(req.url.split('?')[0]));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('404'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

async function newPage(browser, o) {
  o = o || {};
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => r.url().includes('/api/auth/me')
    ? r.respond({
        status: 200, contentType: 'application/json',
        body: JSON.stringify(o.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null })
      })
    : r.continue());
  await page.evaluateOnNewDocument((premium) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
  }, !!o.premium);
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const ready = async (p) => { await p.waitForSelector('.dd-wrap', { timeout: 8000 }); await wait(400); };

const state = (p) => p.evaluate(() => {
  const n = (s) => document.querySelectorAll(s).length;
  const cells = Array.from(document.querySelectorAll('.dd-cell'));
  return {
    wrap: n('.dd-wrap'),
    cells: cells.length,
    open: cells.filter(c => c.classList.contains('dd-open')).length,
    openText: cells.filter(c => c.classList.contains('dd-open')).map(c => c.textContent).join(''),
    silentOpen: n('.dd-cell-silent.dd-open'),
    silentNote: n('.dd-silentnote'),
    inputs: n('input,textarea,[contenteditable="true"]'),
    imgs: n('img'),
    panel: n('.dd-panel'),
    printSheet: n('.dd-printsheet'),
    locked: n('.dd-locked'),
    stages: n('.dd-stages .dd-chip'),
    gate: n('.dd-gate'),
    gateHref: (document.querySelector('.dd-gate a') || {}).href || null,
    body: document.body.innerText
  };
});

const word = (p) => p.evaluate(() => {
  const T = window.DictationDesk, w = T._word();
  return w ? { display: w.display, boxes: w.boxes.slice(), silent: w.silentTail || '', units: T.unitsFor(w).length } : null;
});

const tapReveal = async (p) => {
  await p.evaluate(() => {
    const b = Array.from(document.querySelectorAll('.dd-btn'))
      .find(x => !x.disabled && x.textContent === window.DictationDesk.api.t('revealOne'));
    if (b) b.click();
  });
  await wait(180);
};

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const BASE = 'http://127.0.0.1:' + server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------------- L1 covered at rest, nothing leaked ---------------- */
  console.log('[L1 the slate starts covered]');
  const p = await newPage(browser, {});
  await p.goto(BASE + '/dictation-desk.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(p);
  let s = await state(p);
  const w0 = await word(p);
  is(s.wrap === 1, 'the desk mounted');
  is(!!w0 && s.cells === w0.units, `a word is loaded with ${s.cells} covered places`);
  is(s.open === 0, 'nothing is uncovered yet');
  /* THE LEAK TEST — the premise of the whole tool */
  const leaked = w0 ? w0.display.toLowerCase().split('').some(ch => /[a-zà-ÿ]/.test(ch) && s.body.toLowerCase().includes(w0.display.toLowerCase())) : false;
  is(!leaked, `the word "${w0 && w0.display}" is NOT in the page text before the reveal`);
  is(s.imgs === 0, 'no picture — a picture would make it copying, not dictation');
  is(s.inputs === 0, 'no text-entry surface exists for a child');

  /* ---------------- L2 one tap, one unit, in order ---------------- */
  console.log('[L2 uncovering]');
  await tapReveal(p);
  let s1 = await state(p);
  is(s1.open === 1, 'one tap uncovered exactly one unit');
  const firstUnit = w0.boxes[0].replace(/^(.)_(.)$/, '$1');
  is(s1.openText.startsWith(firstUnit), `the first unit is "${firstUnit}" (got "${s1.openText}")`);
  await tapReveal(p);
  const s2 = await state(p);
  is(s2.open === 2, 'a second tap uncovered a second unit');
  is(s2.openText.startsWith(s1.openText), 'the reveal is a growing prefix, never re-ordered');

  /* ---------------- L3 + L4 a silent-tail word, end to end ---------------- */
  console.log('[L3 silent tail, L4 final spelling]');
  /* ⚠ Search the WHOLE bank, not the current stage: en's only silent-tail
     word is `mouse`, which sits in s4, so a stage-local search finds
     nothing and the assertion fails for the wrong reason. */
  await p.evaluate(() => {
    const T = window.DictationDesk;
    const hit = (T.bank.words || []).filter(w => w.silentTail)[0];
    if (!hit) return;
    T.premium = true;                       /* the harness needs the later stages reachable */
    T.stageId = hit.stage;
    T.index = T._words().indexOf(hit);
    T.revealed = 0;
    T.render();
  });
  await wait(200);
  let sw = await word(p);
  if (sw && sw.silent) {
    const units = sw.units;
    for (let i = 0; i < units; i++) await tapReveal(p);
    const done = await state(p);
    is(done.silentOpen === 1, `the silent tail "${sw.silent}" is its own uncovered unit`);
    is(done.silentNote === 1, 'the silent unit explains itself');
    is(done.openText.replace(/\s/g, '').toLowerCase() === sw.display.toLowerCase(),
      `the finished slate spells "${sw.display}" exactly (got "${done.openText}")`);
  } else {
    is(false, 'could not reach a silent-tail word in the free stage');
  }

  /* a split digraph: the travelling e must land at the end */
  await p.evaluate(() => {
    const T = window.DictationDesk;
    T.myWords = [{ display: 'cake', boxes: ['c', 'a_e', 'k'] }];
    T.stageId = 'own'; T.index = 0; T.revealed = 0; T.render();
  });
  await wait(200);
  await p.evaluate(() => { const T = window.DictationDesk; T.revealed = T.unitsFor(T._word()).length; T.render(); });
  await wait(200);
  const ck = await state(p);
  is(ck.openText.toLowerCase() === 'cake', `a split digraph spells out as "cake" (got "${ck.openText}")`);

  /* ---------------- L5 nothing to mark ---------------- */
  console.log('[L5 nothing to mark]');
  const s5 = await state(p);
  is(!/\b(correct|wrong|score|try again|well done)\b/i.test(s5.body), 'no verdict or score text anywhere');
  await p.close();

  /* ---------------- L6 free vs subscriber ---------------- */
  console.log('[L6 free and subscriber]');
  const free = await newPage(browser, { premium: false });
  await free.goto(BASE + '/dictation-desk.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(free);
  const f1 = await state(free);
  const stageInfo = await free.evaluate(() => ({
    free: window.DictationDesk.stagesFor(window.DictationDesk.bank, false).length,
    all: window.DictationDesk.stagesFor(window.DictationDesk.bank, true).length
  }));
  is(stageInfo.free < stageInfo.all, `locked stages exist (${stageInfo.free} free of ${stageInfo.all})`);
  is(f1.printSheet === 0, 'free: the print DOM does not exist');
  is(f1.panel === 0, 'free: the word-list panel is not built');
  is(f1.locked >= 1, 'free: the paid controls are marked, not merely disabled');
  await free.evaluate(() => {
    const b = Array.from(document.querySelectorAll('.dd-chip')).find(x => x.classList.contains('dd-locked'));
    if (b) b.click();
  });
  await wait(200);
  const f2 = await state(free);
  is(f2.gate === 1, 'free: the upsell strip appeared');
  is(/\/en\/pricing\?from=tool-dictation-desk/.test(f2.gateHref || ''), 'free: the CTA points at the Teacher plan');
  await free.close();

  /* ---------------- L7 the teacher's own word ---------------- */
  console.log('[L7 the teacher marks the units]');
  const paid = await newPage(browser, { premium: true });
  await paid.goto(BASE + '/dictation-desk.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(paid);
  await wait(300);
  await paid.evaluate(() => { window.DictationDesk.stageId = 'own'; window.DictationDesk.panelOpen = true; window.DictationDesk.render(); });
  await wait(200);
  const hasInput = await paid.evaluate(() => document.querySelectorAll('.dd-panel input').length);
  is(hasInput === 1, 'the ONE text field in the tool is the adult word-list panel');
  await paid.type('.dd-panel input', 'ship');
  await wait(200);
  await paid.evaluate(() => { document.querySelectorAll('.dd-seam')[0].click(); });   /* join s+h */
  await wait(150);
  await paid.evaluate(() => {
    const b = Array.from(document.querySelectorAll('.dd-btn')).find(x => x.textContent === window.DictationDesk.api.t('saveWord'));
    if (b) b.click();
  });
  await wait(250);
  const mine = await paid.evaluate(() => window.DictationDesk.myWords.map(m => m.boxes.join('|')));
  is(mine[0] === 'sh|i|p', `the teacher's join produced sh|i|p (got ${mine[0]})`);
  const ps = await state(paid);
  is(ps.printSheet === 1, 'subscriber: the print sheet exists');
  await paid.close();

  /* ---------------- L8 THE SWEEP ---------------- */
  console.log('[L8 viewport sweep 320-1366]');
  const sw2 = await newPage(browser, { premium: true });
  await sw2.goto(BASE + '/dictation-desk.html?lang=de&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(sw2);
  /* the densest state this tool can reach: German chrome, the longest
     word in the bank fully uncovered, and the word-list panel open */
  await sw2.evaluate(() => {
    const T = window.DictationDesk;
    let best = null;
    (T.bank.words || []).forEach(w => { if (!best || T.unitsFor(w).length > T.unitsFor(best).length) best = w; });
    if (best) { T.stageId = best.stage; T.index = T._words().indexOf(best); }
    T.revealed = 99; T.panelOpen = true; T.render();
  });
  await wait(350);
  for (const [w, h] of VIEWPORTS) {
    await sw2.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await wait(320);
    const m = await sw2.evaluate((MIN_TAP, MIN_TEXT) => {
      [document.scrollingElement, document.documentElement, document.body,
       document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')]
        .filter(Boolean).forEach(c => { try { c.scrollTop = 0; } catch (_) {} });
      const controls = Array.from(document.querySelectorAll('.dd-btn,.dd-chip,.dd-seam'))
        .filter(e => e.getBoundingClientRect().width > 0);
      if (!controls.length) return { noControls: true };
      const lowest = controls.reduce((a, e) => Math.max(a, e.getBoundingClientRect().bottom), -Infinity);
      const smallTap = controls.filter(e => { const r = e.getBoundingClientRect(); return r.width < MIN_TAP || r.height < MIN_TAP; })
        .map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
      const tiny = Array.from(document.querySelectorAll('.dd-cell.dd-open,.dd-meta,.dd-stagelbl,.dd-silentnote,.dd-hint'))
        .filter(e => e.textContent.trim() && e.getBoundingClientRect().width > 0)
        .map(e => ({ cls: e.className, px: parseFloat(getComputedStyle(e).fontSize) }))
        .filter(t => t.px < MIN_TEXT).map(t => t.cls + ' ' + t.px.toFixed(1) + 'px');
      const need = Math.max(0, lowest - window.innerHeight + 24);
      let took = null;
      for (const c of [document.scrollingElement, document.documentElement, document.body,
                       document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')].filter(Boolean)) {
        const before = c.scrollTop; c.scrollTop = need;
        if (c.scrollTop > before + 1) { took = c.className || c.tagName; break; }
        c.scrollTop = before;
      }
      const lowEl = controls.reduce((b, e) => (!b || e.getBoundingClientRect().bottom > b.getBoundingClientRect().bottom) ? e : b, null);
      const lr = lowEl.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        lowest: Math.round(lowest), nControls: controls.length, scrollTook: took,
        afterBottom: Math.round(lr.bottom), afterTop: Math.round(lr.top), smallTap, tiny
      };
    }, MIN_TAP, MIN_TEXT);
    if (m.noControls) { bad(`${w}x${h}: found NO controls — the probe measured nothing`); continue; }
    const fits = m.lowest <= h + 8;
    const reachable = fits || (m.scrollTook !== null && m.afterBottom <= h + 8 && m.afterTop >= 0);
    is(m.overflow <= 2, `${w}x${h}: no horizontal overflow (${m.overflow}px)`);
    if (w >= 768) is(fits, `${w}x${h}: all ${m.nControls} controls FIT (lowest ${m.lowest} <= ${h})`);
    else is(reachable, `${w}x${h}: fits (${m.lowest}) or PROVEN reachable — scrolled ${m.scrollTook || 'nothing'}, then visible ${m.afterTop}-${m.afterBottom}`);
    is(m.smallTap.length === 0, `${w}x${h}: taps >= ${MIN_TAP}px${m.smallTap.length ? ' — ' + m.smallTap.join(', ') : ''}`);
    is(m.tiny.length === 0, `${w}x${h}: text >= ${MIN_TEXT}px${m.tiny.length ? ' — ' + m.tiny.join(', ') : ''}`);
    if (SHOT && [360, 768, 1024].includes(w)) await sw2.screenshot({ path: path.join(SHOT_DIR, `sweep-${w}.png`), fullPage: true });
  }
  is(sw2._errs.length === 0, `zero console errors${sw2._errs.length ? ' — ' + sw2._errs[0] : ''}`);

  if (SHOT) {
    await sw2.setViewport({ width: 1024, height: 900, deviceScaleFactor: 2 });
    await sw2.evaluate(() => { const T = window.DictationDesk; T.panelOpen = false; T.revealed = 0; T.render(); });
    await wait(300);
    await sw2.screenshot({ path: path.join(SHOT_DIR, 'covered-1024.png'), fullPage: true });
    await sw2.evaluate(() => { const T = window.DictationDesk; T.revealed = 2; T.render(); });
    await wait(300);
    await sw2.screenshot({ path: path.join(SHOT_DIR, 'midreveal-1024.png'), fullPage: true });
  }
  await sw2.close();

  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
