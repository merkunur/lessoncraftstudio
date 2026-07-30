#!/usr/bin/env node
/* =====================================================================
   local-test-number-balance.js — the local Definition-of-Done.
   Every claim measured in a real browser against the rendered DOM.

   visual-qa-activity.js resolves only ids declared in a *-activities.json
   manifest, so it cannot see a free-play tool (local-test-heart-words.js
   :4-8 records the same). SECTION L8 is the substitute.

     L1 mounts: a beam, two pans, two ropes, a tray
     L2 a real pointer drag lands a tile in each pan, measured in the DOM
     L3 ⭐ ANALOG, measured on the RENDERED BEAM: three increasing
        differences produce three increasing rotations read off the SVG
        transform. The engine gate proves the maths; this proves the
        child actually sees it
     L4 HOLD: the rendered angle does not move while held, and does move
        on release
     L5 the cloth removes the covered pan's numbers from the page text
     L6 notation off -> no symbol anywhere; on -> the symbol matches
     L7 free vs subscriber: tiles stop at ten, the CTA is exact
     L8 the sweep 320-1366 — resting FITS at desktop, taps >=44, text
        >=14px, zero console errors

   Usage: node scripts/local-test-number-balance.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'number-balance', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44, MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

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
    ? r.respond({ status: 200, contentType: 'application/json',
        body: JSON.stringify(o.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null }) })
    : r.continue());
  await page.evaluateOnNewDocument((premium) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
    window.print = function () { window.__printed = (window.__printed || 0) + 1; };
  }, !!o.premium);
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const ready = async (p) => { await p.waitForSelector('.nbal-wrap', { timeout: 8000 }); await wait(600); };

/* the angle the CHILD sees, read off the SVG transform */
const renderedAngle = (p) => p.evaluate(() => {
  const g = document.querySelector('.nbal-beamg');
  const t = g ? g.getAttribute('transform') : '';
  const m = /rotate\(\s*(-?[\d.]+)/.exec(t || '');
  return m ? parseFloat(m[1]) : null;
});

/* settle the spring, then read */
async function settledAngle(p) { await wait(1500); return renderedAngle(p); }

async function dragTileToPan(page, n, pan) {
  const box = await page.evaluate((num, side) => {
    const tiles = Array.from(document.querySelectorAll('.nbal-slot-tray .nbal-tile'));
    const t = tiles.find(x => x.textContent === String(num));
    const d = document.querySelector('[data-slot="' + side + '"]');
    if (!t || !d) return null;
    const a = t.getBoundingClientRect(), b = d.getBoundingClientRect();
    return { fx: a.left + a.width / 2, fy: a.top + a.height / 2, tx: b.left + b.width / 2, ty: b.top + b.height / 2 };
  }, n, pan);
  if (!box) return false;
  await page.mouse.move(box.fx, box.fy);
  await page.mouse.down();
  for (let i = 1; i <= 6; i++) {
    await page.mouse.move(box.fx + (box.tx - box.fx) * i / 6, box.fy + (box.ty - box.fy) * i / 6);
    await wait(16);
  }
  await page.mouse.up();
  await wait(200);
  return true;
}

const PORT = 5441;

(async () => {
  const server = serve();
  await new Promise(r => server.listen(PORT, r));
  const BASE = `http://127.0.0.1:${PORT}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------------- L1 ---------------- */
  console.log('[L1 the apparatus]');
  const p = await newPage(browser, {});
  await p.setViewport({ width: 1024, height: 900 });
  await p.goto(BASE + '/number-balance.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(p);
  const s1 = await p.evaluate(() => ({
    beam: document.querySelectorAll('.nbal-beamg .nbal-beam').length,
    pans: Array.from(document.querySelectorAll('[data-slot]')).map(z => z.getAttribute('data-slot')).sort(),
    ropes: document.querySelectorAll('.nbal-rope').length,
    tiles: document.querySelectorAll('.nbal-slot-tray .nbal-tile').length
  }));
  is(s1.beam === 1, 'a beam');
  is(JSON.stringify(s1.pans) === JSON.stringify(['left', 'right']), `two pans (${s1.pans.join(', ')})`);
  is(s1.ropes === 2, 'two ropes — the pans hang, they do not float');
  is(s1.tiles === 10, `a tray of ten numbers for a free visitor (got ${s1.tiles})`);
  is((await settledAngle(p)) === 0, 'an empty balance rests level');

  /* ---------------- L2 ---------------- */
  console.log('[L2 dragging, measured in the DOM]');
  is(await dragTileToPan(p, 4, 'left'), 'a real drag reaches the left pan');
  is(await dragTileToPan(p, 9, 'right'), 'a real drag reaches the right pan');
  const placed = await p.evaluate(() => ({
    l: Array.from(document.querySelectorAll('[data-slot="left"] .nbal-tile')).map(t => t.textContent),
    r: Array.from(document.querySelectorAll('[data-slot="right"] .nbal-tile')).map(t => t.textContent)
  }));
  is(placed.l.join() === '4' && placed.r.join() === '9', `the tiles are in the pans (left ${placed.l}, right ${placed.r})`);

  /* ---------------- L3 the invention, measured on the rendered beam ---- */
  console.log('[L3 ANALOG — measured on the beam the child sees]');
  const angles = [];
  for (const [l, r] of [[7, 8], [7, 11], [1, 20]]) {
    await p.evaluate((L, R) => {
      const T = window.NumberBalance;
      T.st = T.newState();
      T.st.left = [L]; T.st.right = [R];
      T.render();
    }, l, r);
    angles.push({ d: r - l, a: Math.abs(await settledAngle(p)) });
  }
  is(angles.every(x => x.a !== null), 'the beam angle is readable from the DOM');
  is(angles[0].a < angles[1].a && angles[1].a < angles[2].a,
    `a bigger miss leans strictly further: d=${angles[0].d} -> ${angles[0].a.toFixed(1)}deg, d=${angles[1].d} -> ${angles[1].a.toFixed(1)}deg, d=${angles[2].d} -> ${angles[2].a.toFixed(1)}deg`);
  is(angles[0].a >= 0.8 && angles[2].a >= 8,
    `and both ends are actually visible (${angles[0].a.toFixed(1)}deg / ${angles[2].a.toFixed(1)}deg)`);

  /* ---------------- L4 HOLD ---------------- */
  console.log('[L4 HOLD — the prediction beat]');
  await p.evaluate(() => {
    const T = window.NumberBalance;
    T.st = T.newState(); T.st.left = [5];
    T.st = T.hold(T.st); T.render();
  });
  const heldBefore = await settledAngle(p);
  await p.evaluate(() => { const T = window.NumberBalance; T.st = T.add(T.st, 'right', 9); T.render(); });
  const heldAfter = await settledAngle(p);
  is(Math.abs(heldAfter - heldBefore) < 0.05, `the beam does not move while held (${heldBefore.toFixed(2)} -> ${heldAfter.toFixed(2)})`);
  await p.evaluate(() => { const T = window.NumberBalance; T.st = T.release(T.st); T.render(); });
  const released = await settledAngle(p);
  is(Math.abs(released - heldAfter) > 1, `and it settles when let go (-> ${released.toFixed(2)})`);

  /* ---------------- L5 the cloth ---------------- */
  console.log('[L5 the cloth]');
  await p.evaluate(() => {
    const T = window.NumberBalance;
    /* right sums to 5, not 6 — with [2,4] the uncovered total WAS 6 and
       the control tripped on a coincidence rather than a leak */
    T.st = T.newState(); T.st.left = [6]; T.st.right = [2, 3];
    T.api.settings.totals = true; T.st.cloth = 'left'; T.render();
  });
  await wait(300);
  /* ⚠ scoped to the COVERED PAN, not the whole page. Searching the page for
     "6" can never fail — the tray always shows a 6 — so the assertion would
     have passed on a real leak just as readily. Measure the pan. */
  const covered = await p.evaluate(() => {
    const pan = document.querySelector('.nbal-pan-left');
    const other = document.querySelector('.nbal-pan-right');
    return {
      cloth: document.querySelectorAll('.nbal-cloth').length,
      leftTiles: document.querySelectorAll('[data-slot="left"] .nbal-tile').length,
      leftText: pan ? pan.innerText.replace(/\s+/g, '') : 'MISSING',
      leftAria: pan ? (pan.getAttribute('aria-label') || '') : '',
      leftTotals: pan ? pan.querySelectorAll('.nbal-total').length : -1,
      rightText: other ? other.innerText.replace(/\s+/g, '') : 'MISSING'
    };
  });
  is(covered.cloth === 1, 'a cloth is drawn over the pan');
  is(covered.leftTiles === 0, 'the covered pan holds no tiles in the DOM');
  is(covered.leftText === '' && !/\d/.test(covered.leftAria),
    `the covered pan carries no number in its text or aria (text "${covered.leftText}", aria "${covered.leftAria}")`);
  is(covered.leftTotals === 0, 'and its total is not rendered, even with totals switched on');
  is(/6/.test(covered.rightText) === false && /\d/.test(covered.rightText),
    `while the UNCOVERED pan still shows its own numbers ("${covered.rightText}") — proving the check can fail`);

  /* ---------------- L6 notation ---------------- */
  console.log('[L6 notation follows the beam]');
  const noSym = await p.evaluate(() => {
    const T = window.NumberBalance;
    T.st = T.newState(); T.st.left = [4, 3]; T.st.right = [9];
    T.api.settings.notation = false; T.api.settings.totals = false; T.st.cloth = null; T.render();
    return document.querySelectorAll('.nbal-symbol').length;
  });
  is(noSym === 0, 'with notation off there is no symbol at all');
  const sym = await p.evaluate(() => {
    const T = window.NumberBalance;
    T.api.settings.notation = true; T.render();
    const e = document.querySelector('.nbal-symbol');
    return e ? e.textContent : null;
  });
  is(sym === '<', `with it on the symbol describes the beam (7 vs 9 -> "${sym}")`);
  await p.close();

  /* ---------------- L7 the paywall ---------------- */
  console.log('[L7 the paywall]');
  const free = await newPage(browser, {});
  await free.setViewport({ width: 1024, height: 900 });
  await free.goto(BASE + '/number-balance.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(free);
  const fr = await free.evaluate(() => ({
    tiles: document.querySelectorAll('.nbal-slot-tray .nbal-tile').length,
    href: (document.querySelector('.nbal-gate a') || {}).getAttribute
      ? document.querySelector('.nbal-gate a').getAttribute('href') : null
  }));
  is(fr.tiles === 10, `a free visitor gets numbers to ten (${fr.tiles})`);
  is(fr.href === '/en/pricing?from=tool-number-balance', `the CTA is exact (${fr.href})`);
  await free.close();

  const paid = await newPage(browser, { premium: true });
  await paid.setViewport({ width: 1024, height: 900 });
  await paid.goto(BASE + '/number-balance.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
  await ready(paid);
  await wait(500);
  const pr = await paid.evaluate(() => ({
    tiles: document.querySelectorAll('.nbal-slot-tray .nbal-tile').length,
    gates: document.querySelectorAll('.nbal-gate').length
  }));
  is(pr.tiles === 20, `a subscriber gets numbers to twenty (${pr.tiles})`);
  is(pr.gates === 0, 'and sees no gate');

  /* ---------------- L8 the sweep ---------------- */
  console.log('[L8 viewport sweep 320-1366]');
  await paid.evaluate(() => {
    const T = window.NumberBalance;
    T.st = T.newState(); T.st.left = [4, 3, 2]; T.st.right = [9, 5];
    T.api.settings.totals = true; T.api.settings.notation = true; T.render();
  });
  await wait(600);
  for (const [w, h] of VIEWPORTS) {
    await paid.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await wait(340);
    const m = await paid.evaluate((MIN_TAP, MIN_TEXT) => {
      [document.scrollingElement, document.documentElement, document.body,
       document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')]
        .filter(Boolean).forEach(c => { try { c.scrollTop = 0; } catch (_) {} });
      const controls = Array.from(document.querySelectorAll('.nbal-tile,.nbal-chip'))
        .filter(e => e.getBoundingClientRect().width > 0);
      if (!controls.length) return { noControls: true };
      const lowest = controls.reduce((a, e) => Math.max(a, e.getBoundingClientRect().bottom), -Infinity);
      const smallTap = controls.filter(e => { const r = e.getBoundingClientRect(); return r.width < MIN_TAP || r.height < MIN_TAP; })
        .map(e => e.className.split(' ')[0] + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
      const tiny = Array.from(document.querySelectorAll('.nbal-total,.nbal-traylabel,.nbal-note,.nbal-privacy,.nbal-symbol'))
        .filter(e => e.textContent.trim() && e.getBoundingClientRect().width > 0)
        .map(e => ({ cls: e.className, px: parseFloat(getComputedStyle(e).fontSize) }))
        .filter(t => t.px < MIN_TEXT).map(t => t.cls + ' ' + t.px.toFixed(1) + 'px');
      const need = Math.max(0, lowest - window.innerHeight + 24);
      let took = null;
      for (const c of [document.scrollingElement, document.documentElement, document.body,
                       document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')].filter(Boolean)) {
        const b4 = c.scrollTop; c.scrollTop = need;
        if (c.scrollTop > b4 + 1) { took = c.className || c.tagName; break; }
        c.scrollTop = b4;
      }
      const low = controls.reduce((bb, e) => (!bb || e.getBoundingClientRect().bottom > bb.getBoundingClientRect().bottom) ? e : bb, null);
      const lr = low.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        lowest: Math.round(lowest), n: controls.length, took,
        afterBottom: Math.round(lr.bottom), afterTop: Math.round(lr.top), smallTap, tiny
      };
    }, MIN_TAP, MIN_TEXT);
    if (m.noControls) { bad(`${w}x${h}: found NO controls`); continue; }
    const fits = m.lowest <= h + 8;
    const reachable = fits || (m.took !== null && m.afterBottom <= h + 8 && m.afterTop >= 0);
    is(m.overflow <= 2, `${w}x${h}: no horizontal overflow (${m.overflow}px)`);
    if (w >= 768) is(fits, `${w}x${h}: all ${m.n} controls FIT (lowest ${m.lowest} <= ${h})`);
    else is(reachable, `${w}x${h}: fits (${m.lowest}) or PROVEN reachable — scrolled ${m.took || 'nothing'}, then visible ${m.afterTop}-${m.afterBottom}`);
    is(m.smallTap.length === 0, `${w}x${h}: taps >= ${MIN_TAP}px${m.smallTap.length ? ' — ' + m.smallTap.slice(0, 3).join(', ') : ''}`);
    is(m.tiny.length === 0, `${w}x${h}: text >= ${MIN_TEXT}px${m.tiny.length ? ' — ' + m.tiny.join(', ') : ''}`);
    if (SHOT && [360, 768, 1024].includes(w)) await paid.screenshot({ path: path.join(SHOT_DIR, `sweep-${w}.png`), fullPage: true });
  }
  is(paid._errs.length === 0, `zero console errors${paid._errs.length ? ' — ' + paid._errs[0] : ''}`);
  await paid.close();

  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
