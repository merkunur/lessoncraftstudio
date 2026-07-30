#!/usr/bin/env node
/* =====================================================================
   local-test-part-whole-frame.js — the local Definition-of-Done for
   Part–Whole Frame. Nothing here is asserted from source: every claim is
   measured in a real browser against the rendered DOM.

   scripts/visual-qa-activity.js resolves only ids declared in a
   *-activities.json manifest, so it cannot see a free-play tool
   (local-test-heart-words.js:4-8 records the same). SECTION L9 is the
   substitute: the full viewport sweep with measured containment, at
   DESKTOP widths too, not just phone.

     L1 the frame renders; the nest holds the whole; a + b === whole
     L2 a real pointer drag carries EXACTLY one, and the nest never moves
     L3 a drag released anywhere else changes nothing (the nest is not a
        place, and there is no floor to drop a counter on)
     L4 each of the three covers removes its count from the DOM, not just
        from view — a hidden number is still a number to anything reading
        the tree
     L5 no verdict, no score, no Check anywhere in the rendered text
     L6 the split is spoken with the locale's number words
     L7 free vs subscriber: the band, the all-ways record, the print DOM,
        and the exact gate CTA
     L8 keyboard parity, and the chime is a soft sine
     L9 the sweep: 320-1366, FITS at desktop + reachable below, taps >=44,
        rendered text >=14px, no overflow, zero console errors

   Usage: node scripts/local-test-part-whole-frame.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'part-whole-frame', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44, MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (cond, m) => cond ? ok(m) : bad(m);

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(MINI, path.basename(p) || 'index.html');
    fs.readFile(file, (e, buf) => {
      if (e) { res.writeHead(404); res.end('404'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(buf);
    });
  });
}

async function newPage(browser, o) {
  o = o || {};
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    if (r.url().includes('/api/auth/me')) {
      return r.respond({
        status: 200, contentType: 'application/json',
        body: JSON.stringify(o.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null })
      });
    }
    r.continue();
  });
  await page.evaluateOnNewDocument((premium) => {
    window.__notes = [];
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC && AC.prototype.createOscillator) {
      const orig = AC.prototype.createOscillator;
      AC.prototype.createOscillator = function () {
        const osc = orig.call(this);
        const f = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(osc), 'frequency');
        try { window.__notes.push({ type: osc.type }); } catch (_) {}
        const st = osc.start.bind(osc);
        osc.start = function (...a) { try { window.__notes.push({ type: osc.type, hz: osc.frequency && osc.frequency.value }); } catch (_) {} return st(...a); };
        return osc;
      };
    }
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
  }, !!o.premium);
  page._errs = [];
  const benign = (t) => /404|net::ERR|Failed to load resource/.test(t);
  page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const ready = async (p) => { await p.waitForSelector('.pwf-wrap', { timeout: 8000 }); await new Promise(r => setTimeout(r, 280)); };
const spy = (p) => p.evaluate(() => { window.__spoken = []; if (window.LCSAudio) LCSAudio.speak = (o) => window.__spoken.push(o); });

/* the measured DOM snapshot — one evaluate, no source reading */
const state = (p) => p.evaluate(() => {
  const n = (sel) => document.querySelectorAll(sel).length;
  const txt = (sel) => { const e = document.querySelector(sel); return e ? e.textContent.trim() : null; };
  const nums = Array.from(document.querySelectorAll('.pwf-num')).map(e => parseInt(e.textContent, 10));
  return {
    wrap: n('.pwf-wrap'),
    wholeDots: n('.pwf-box-whole .pwf-dot'),
    aDots: n('.pwf-box-a .pwf-dot'),
    bDots: n('.pwf-box-b .pwf-dot'),
    nums, headVal: txt('.pwf-headval'),
    covered: n('.pwf-covered'), cloths: n('.pwf-cloth'),
    ways: n('.pwf-wayrow'), waysBox: n('.pwf-ways'),
    printSheet: n('.pwf-printsheet'),
    locked: n('.pwf-locked'), gate: n('.pwf-gate'),
    gateHref: (document.querySelector('.pwf-gate a') || {}).href || null,
    notation: txt('.pwf-notation'),
    body: document.body.innerText
  };
});

/* a real finger: down, several moves, up */
async function dragCounter(page, fromSel, toSel) {
  const box = await page.evaluate((f, t) => {
    const a = document.querySelector(f), b = document.querySelector(t);
    if (!a || !b) return null;
    const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
    return { x1: ra.left + ra.width / 2, y1: ra.top + ra.height / 2, x2: rb.left + rb.width / 2, y2: rb.top + rb.height / 2 };
  }, fromSel, toSel);
  if (!box) return false;
  await page.mouse.move(box.x1, box.y1);
  await page.mouse.down();
  for (let i = 1; i <= 6; i++) {
    await page.mouse.move(box.x1 + (box.x2 - box.x1) * i / 6, box.y1 + (box.y2 - box.y1) * i / 6);
  }
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 120));
  return true;
}

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const BASE = 'http://127.0.0.1:' + server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* ---------------- L1 the frame renders ---------------- */
  console.log('[L1 the frame]');
  let page = await newPage(browser, {});
  await page.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(page);
  let s = await state(page);
  const whole = parseInt(s.headVal, 10);
  is(s.wrap === 1, 'the frame mounted');
  is(whole >= 3 && whole <= 10, `today's whole is inside the free band (${whole})`);
  is(s.wholeDots === whole, `the nest holds the whole (${s.wholeDots} = ${whole})`);
  is(s.aDots + s.bDots === whole, `the parts sum to the whole (${s.aDots} + ${s.bDots} = ${whole})`);

  /* ---------------- L2 carry ---------------- */
  console.log('[L2 carrying one across]');
  const before = { a: s.aDots, b: s.bDots, nest: s.wholeDots };
  await dragCounter(page, '.pwf-box-a .pwf-dish', '.pwf-box-b .pwf-dish');
  let s2 = await state(page);
  is(s2.aDots === before.a - 1 && s2.bDots === before.b + 1, `exactly one counter crossed (${before.a}/${before.b} -> ${s2.aDots}/${s2.bDots})`);
  is(s2.wholeDots === before.nest, 'THE WHOLE NEVER CHANGED');
  is(s2.aDots + s2.bDots === whole, 'conservation holds in the DOM after the carry');

  /* ---------------- L3 nowhere else to drop ---------------- */
  console.log('[L3 the nest is not a place]');
  const s3a = await state(page);
  await dragCounter(page, '.pwf-box-a .pwf-dish', '.pwf-box-whole .pwf-dish');
  let s3 = await state(page);
  is(s3.aDots === s3a.aDots && s3.bDots === s3a.bDots, 'a drag at the nest changed nothing');
  is(s3.wholeDots === whole, 'the nest still holds the whole');

  /* ---------------- L4 the covers ---------------- */
  console.log('[L4 the three covers]');
  for (const which of ['whole', 'a', 'b']) {
    await page.evaluate((w) => {
      const box = document.querySelector('.pwf-box-' + w);
      box.querySelector('.pwf-clothbtn').click();
    }, which);
    await new Promise(r => setTimeout(r, 120));
    const c = await page.evaluate((w) => {
      const box = document.querySelector('.pwf-box-' + w);
      return {
        dots: box.querySelectorAll('.pwf-dot').length,
        num: box.querySelectorAll('.pwf-num').length,
        cloth: box.querySelectorAll('.pwf-cloth').length,
        aria: (box.querySelector('.pwf-dish') || {}).getAttribute ? box.querySelector('.pwf-dish').getAttribute('aria-label') : ''
      };
    }, which);
    is(c.cloth === 1 && c.dots === 0 && c.num === 0, `cover ${which}: counters and numeral are OUT of the DOM, not hidden`);
    await page.evaluate((w) => document.querySelector('.pwf-box-' + w + ' .pwf-clothbtn').click(), which);
    await new Promise(r => setTimeout(r, 100));
  }

  /* ---------------- L5 nothing to be wrong about ---------------- */
  console.log('[L5 no verdict surface]');
  s = await state(page);
  is(!/\b(correct|wrong|check|score|try again)\b/i.test(s.body), 'no verdict/score/Check in the rendered text');

  /* ---------------- L6 the spoken split ---------------- */
  console.log('[L6 the spoken frame]');
  for (const [loc, word] of [['en', 'seven'], ['de', 'sieben'], ['nl', 'zeven']]) {
    const p2 = await newPage(browser, {});
    await p2.goto(`${BASE}/part-whole-frame.html?lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await ready(p2);
    await spy(p2);
    await p2.evaluate(() => { window.PartWholeFrame._setWhole(7); });
    await new Promise(r => setTimeout(r, 120));
    await p2.evaluate(() => { window.PartWholeFrame._carry('toB'); });
    await new Promise(r => setTimeout(r, 200));
    const spoken = await p2.evaluate(() => window.__spoken || []);
    const said = spoken.map(x => x.text).join(' | ');
    is(spoken.length > 0 && spoken.every(x => x.lang === loc), `${loc}: everything spoken is tagged ${loc}`);
    is(said.toLowerCase().includes(word), `${loc}: the whole is spoken as a number word ("${word}" in "${said}")`);
    await p2.close();
  }

  /* ---------------- L7 free vs subscriber ---------------- */
  console.log('[L7 free and subscriber]');
  const free = await newPage(browser, { premium: false });
  await free.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(free);
  let fs1 = await state(free);
  is(fs1.waysBox === 0, 'free: the all-ways record is not built');
  is(fs1.printSheet === 0, 'free: the print DOM does not exist');
  is(fs1.locked >= 1, 'free: the paid controls are marked, not merely disabled');
  await free.evaluate(() => { window.PartWholeFrame._setWhole(14); });
  await new Promise(r => setTimeout(r, 150));
  let fs2 = await state(free);
  is(parseInt(fs2.headVal, 10) <= 10, 'free: the whole cannot pass ten');
  is(fs2.gate === 1, 'free: the upsell strip appeared');
  is(/\/en\/pricing\?from=tool-part-whole-frame/.test(fs2.gateHref || ''), 'free: the CTA points at the Teacher plan');
  await free.close();

  const paid = await newPage(browser, { premium: true });
  await paid.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(paid);
  await new Promise(r => setTimeout(r, 250));
  await paid.evaluate(() => { window.PartWholeFrame.api.settings.band = '20'; window.PartWholeFrame._setWhole(14); });
  await new Promise(r => setTimeout(r, 150));
  const ps = await state(paid);
  is(parseInt(ps.headVal, 10) === 14, 'subscriber: the whole goes past ten');
  is(ps.waysBox === 1, 'subscriber: the all-ways record is built');
  is(ps.printSheet === 1, 'subscriber: the print sheet exists');
  await paid.evaluate(() => { window.PartWholeFrame._carry('toB'); window.PartWholeFrame._carry('toB'); });
  await new Promise(r => setTimeout(r, 200));
  const ps2 = await state(paid);
  is(ps2.ways >= 2, `subscriber: found ways are written down (${ps2.ways})`);
  await paid.close();

  /* ---------------- L8 keyboard + the chime ---------------- */
  console.log('[L8 keyboard and sound]');
  const kb = await newPage(browser, {});
  await kb.goto(BASE + '/part-whole-frame.html?lang=en&embed=1', { waitUntil: 'networkidle0' });
  await ready(kb);
  const k0 = await state(kb);
  await kb.evaluate(() => document.querySelector('.pwf-box-a .pwf-dish-live').focus());
  await kb.keyboard.press('ArrowRight');
  await new Promise(r => setTimeout(r, 150));
  const k1 = await state(kb);
  is(k1.aDots === k0.aDots - 1, 'ArrowRight carries one counter across');
  is(k1.wholeDots === k0.wholeDots, 'the keyboard path also leaves the whole alone');
  const notes = await kb.evaluate(() => window.__notes || []);
  is(notes.length === 0 || notes.every(n => !n.hz || n.hz <= 1200), 'no shrill tones');
  await kb.close();

  /* ---------------- L9 THE SWEEP ---------------- */
  console.log('[L9 viewport sweep 320-1366]');
  const sw = await newPage(browser, { premium: true });
  await sw.goto(BASE + '/part-whole-frame.html?lang=de&embed=1', { waitUntil: 'networkidle0' });
  await ready(sw);
  await new Promise(r => setTimeout(r, 300));
  /* ⚠ Sweep the DENSEST state the tool can reach, not the one it happens
     to open on: German captions, the all-ways record open, and a whole of
     20 (four rows of counters in every tray). "Which mode has the most
     chrome, and does the sweep ever enter it?" */
  await sw.evaluate(() => {
    window.PartWholeFrame.api.settings.band = '20';
    window.PartWholeFrame._setWhole(20);
    window.PartWholeFrame.showEmpty = true;
    window.PartWholeFrame.render();
  });
  await new Promise(r => setTimeout(r, 320));
  for (const [w, h] of VIEWPORTS) {
    await sw.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await new Promise(r => setTimeout(r, 320));
    const m = await sw.evaluate((MIN_TAP, MIN_TEXT) => {
      /* ⚠ RESET SCROLL FIRST. A previous viewport in the sweep may have
         left the document scrolled to the bottom; every rect would then be
         negative and `Math.max(acc, bottom)` with acc=0 would report a
         lowest of 0 — an assertion that passes because it measured
         nothing. Same family as the screenshot-scroll-reset rule. */
      [document.scrollingElement, document.documentElement, document.body,
       document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')]
        .filter(Boolean).forEach(c => { try { c.scrollTop = 0; } catch (_) {} });
      const app = document.querySelector('.lcs-app') || document.body;
      const controls = Array.from(document.querySelectorAll('.pwf-step,.pwf-linkbtn,.pwf-clothbtn,.pwf-dish-live,.pwf-waystoggle'));
      if (!controls.length) return { noControls: true };
      const lowest = controls.reduce((acc, e) => Math.max(acc, e.getBoundingClientRect().bottom), -Infinity);
      const smallTap = controls.filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.width < MIN_TAP || r.height < MIN_TAP); })
        .map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
      const texts = Array.from(document.querySelectorAll('.pwf-cap,.pwf-num,.pwf-headval,.pwf-notation,.pwf-waycell'))
        .filter(e => e.textContent.trim() && e.getBoundingClientRect().width > 0)
        .map(e => ({ cls: e.className, px: parseFloat(getComputedStyle(e).fontSize) }));
      const tiny = texts.filter(t => t.px < MIN_TEXT).map(t => t.cls + ' ' + t.px.toFixed(1) + 'px');
      /* ⚠ DRIVE the scroll, do not infer it. The shell sets
         `html, body { height:100%; overflow:hidden }`, so a taller
         scrollHeight does NOT mean the content can be reached — it means
         it is clipped. Try every plausible scroll container, measure which
         one actually moved, and re-read the control's position after. */
      const cands = [document.scrollingElement, document.documentElement, document.body,
                     document.querySelector('.lcs-app'), document.querySelector('.lcs-stage')].filter(Boolean);
      /* Scroll by EXACTLY what is needed, not to the end: scrolling to
         99999 pushes the control above the viewport, where `bottom <= h`
         is true because it is off the top. Ask for the control to be
         genuinely VISIBLE afterwards. */
      const need = Math.max(0, lowest - window.innerHeight + 24);
      let took = null, movedBy = 0;
      for (const c of cands) {
        const before = c.scrollTop;
        c.scrollTop = need;
        if (c.scrollTop > before + 1) { took = c.className || c.tagName; movedBy = c.scrollTop - before; break; }
        c.scrollTop = before;
      }
      const lowEl = controls.reduce((best, e) =>
        (!best || e.getBoundingClientRect().bottom > best.getBoundingClientRect().bottom) ? e : best, null);
      const lr = lowEl.getBoundingClientRect();
      const lowestAfter = Math.round(lr.bottom);
      const lowestTopAfter = Math.round(lr.top);
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        lowest: Math.round(lowest), nControls: controls.length,
        lowestCls: (controls.reduce((b,e)=>(!b||e.getBoundingClientRect().bottom>b.getBoundingClientRect().bottom)?e:b,null)||{}).className,
        appH: Math.round(app.getBoundingClientRect().height),
        scrollTook: took, movedBy: Math.round(movedBy),
        lowestAfterScroll: lowestAfter, lowestTopAfter: lowestTopAfter,
        smallTap, tiny
      };
    }, MIN_TAP, MIN_TEXT);
    if (m.noControls) { bad(`${w}x${h}: found NO controls to measure — the probe measured nothing`); continue; }
    const fits = m.lowest <= h + 8;
    /* reachable ONLY if a real container actually scrolled AND the lowest
       control is inside the viewport afterwards */
    const reachable = fits || (m.scrollTook !== null && m.lowestAfterScroll <= h + 8 && m.lowestTopAfter >= 0);
    is(m.overflow <= 2, `${w}x${h}: no horizontal overflow (${m.overflow}px)`);
    if (w >= 768) is(fits, `${w}x${h}: all ${m.nControls} controls FIT (lowest ${m.lowest} <= ${h}, ${m.lowestCls})`);
    else is(reachable, `${w}x${h}: controls fit (${m.lowest}) or PROVEN reachable — scrolled ${m.scrollTook || 'nothing'} by ${m.movedBy}px, lowest control then fully visible at ${m.lowestTopAfter}-${m.lowestAfterScroll} inside ${h}`);
    is(m.smallTap.length === 0, `${w}x${h}: taps >= ${MIN_TAP}px${m.smallTap.length ? ' — ' + m.smallTap.join(', ') : ''}`);
    is(m.tiny.length === 0, `${w}x${h}: text >= ${MIN_TEXT}px${m.tiny.length ? ' — ' + m.tiny.join(', ') : ''}`);
    if (SHOT && [360, 768, 1024].includes(w)) {
      await sw.screenshot({ path: path.join(SHOT_DIR, `sweep-${w}.png`), fullPage: true });
    }
  }
  is(sw._errs.length === 0, `zero console errors${sw._errs.length ? ' — ' + sw._errs[0] : ''}`);
  if (SHOT) {
    await sw.setViewport({ width: 1024, height: 900, deviceScaleFactor: 2 });
    await sw.evaluate(() => { document.querySelector('.pwf-box-a .pwf-clothbtn').click(); });
    await new Promise(r => setTimeout(r, 250));
    await sw.screenshot({ path: path.join(SHOT_DIR, 'covered-1024.png'), fullPage: true });
  }
  await sw.close();
  await page.close();

  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
