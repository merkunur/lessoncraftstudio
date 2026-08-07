#!/usr/bin/env node
/* =====================================================================
   audit-folding-sheet-locale-layout.js — the sweep, in the WORDIEST
   locales.

   ⚠ WHY THIS EXISTS. local-test runs in English. German, Dutch and
   Finnish chips are far longer ("Bögen entfernen", "Boogje voor
   boogje"), and at 320px they wrapped the bar to four rows and pushed
   the tool 75px past the fold — in four locales at once. English fits;
   the product does not. An English-only sweep is structurally blind to
   this, so it gets its own gate.

   THE RULE, matching the platform standard (§A.13.62 and the sweep in
   local-test-number-balance.js):
     - at >=768 (desktop, the viewport the operator actually uses) every
       resting control MUST FIT. No exceptions.
     - below 768 it must fit OR be PROVEN REACHABLE by scrolling — and
       reachability is measured here, not assumed.

   Usage: node scripts/audit-folding-sheet-locale-layout.js [--shot]
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'folding-sheet', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

/* every locale, because any of them can be the wordy one after a
   re-authoring pass */
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const V = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html' };

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const srv = http.createServer((q, r) => {
  const f = path.join(MINI, path.basename(q.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { r.writeHead(404); r.end(); return; }
    r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'text/plain' });
    r.end(b);
  });
});

(async () => {
  await new Promise((r) => srv.listen(5471, r));
  const br = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    console.log(`[${loc}]`);
    const p = await br.newPage();
    await p.setRequestInterception(true);
    p.on('request', (r) => r.url().includes('/api/auth/me')
      ? r.respond({ status: 200, contentType: 'application/json',
          body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
      : r.continue());
    await p.evaluateOnNewDocument(() => {
      try { localStorage.clear(); localStorage.setItem('accessToken', 'h'); } catch (_) {}
      const iv = setInterval(() => { if (window.LCSAudio) { window.LCSAudio.speak = function () {}; clearInterval(iv); } }, 10);
      setTimeout(() => clearInterval(iv), 4000);
    });
    await p.setViewport({ width: 320, height: 640 });
    await p.goto('http://127.0.0.1:5471/folding-sheet.html?lang=' + loc + '&embed=1', { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.fsh-wrap', { timeout: 8000 });
    await wait(600);
    /* the busiest resting state: votes in (so the undo chip shows) and
       the numbers revealed (so the counts take their row) */
    /* the busiest resting state for this tool: paint, reveal the mirror,
       and FOLD — the legend adds a whole row of the wordiest strings
       ("two colours together" is the one that wraps) */
    await p.evaluate(() => {
      [9, 10, 17, 18, 19, 25, 33, 34, 42].forEach((i) => {
        const c = document.querySelector('.fsh-cell[data-i="' + i + '"]'); if (c) c.click();
      });
    });
    await wait(250);
    await p.evaluate(() => {
      const b = Array.from(document.querySelectorAll('.fsh-chip'));
      if (b[5]) b[5].click();          /* show me the mirror */
    });
    await wait(300);
    await p.evaluate(() => {
      const b = Array.from(document.querySelectorAll('.fsh-chip'));
      if (b[4]) b[4].click();          /* fold it */
    });
    await wait(650);

    /* ⭐ THE GUARD. Everything below measures the painted-mirrored-FOLDED
       sheet. If any of the three did not land, this run is measuring a
       different object and must fail loudly rather than pass quietly. */
    const reached = await p.evaluate(() => ({
      painted: document.querySelectorAll('.fsh-cell[class*="fsh-c"]').length,
      folded: !!document.querySelector('.fsh-folded'),
      legend: !!document.querySelector('.fsh-legend')
    }));
    is(reached.folded, `[${loc}] the sheet really is folded — the state this audit exists to measure`);
    is(reached.legend, `[${loc}] the legend really is on screen (it carries the wordiest strings)`);
    if (!reached.folded || !reached.legend) { await p.close(); continue; }

    for (const [w, h] of V) {
      await p.setViewport({ width: w, height: h });
      await wait(420);
      const m = await p.evaluate(() => {
        const c = Array.from(document.querySelectorAll('.fsh-chip,.fsh-swatch,.fsh-gap'))
          .filter((e) => e.getBoundingClientRect().width > 0);
        const lowest = c.reduce((b, e) => Math.max(b, e.getBoundingClientRect().bottom), 0);
        const low = c.reduce((bb, e) => (!bb || e.getBoundingClientRect().bottom > bb.getBoundingClientRect().bottom) ? e : bb, null);
        const small = c.filter((e) => e.getBoundingClientRect().height < 43.5)
          .map((e) => (e.className || e.tagName));
        const tiny = [];
        Array.from(document.querySelectorAll('.fsh-wrap *')).forEach((e) => {
          if (!Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim())) return;
          const fs_ = parseFloat(getComputedStyle(e).fontSize);
          if (fs_ < 13.5) tiny.push((e.className || e.tagName) + ' ' + fs_);
        });
        /* PROVE reachability rather than assuming it: scroll whatever
           scrolls, then re-measure the lowest control */
        let took = null;
        for (let el = low; el; el = el.parentElement) {
          const before = el.scrollTop;
          el.scrollTop = before + 4000;
          if (el.scrollTop > before + 1) { took = el.className || el.tagName; break; }
          el.scrollTop = before;
        }
        const after = low.getBoundingClientRect();
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          lowest: Math.round(lowest), n: c.length, small, tiny, took,
          afterTop: Math.round(after.top), afterBottom: Math.round(after.bottom)
        };
      });
      const fits = m.lowest <= h + 8;
      is(m.overflow <= 2, `${loc} ${w}x${h}: no horizontal overflow (${m.overflow}px)`);
      if (w >= 768) {
        is(fits, `${loc} ${w}x${h}: all ${m.n} controls FIT (lowest ${m.lowest} <= ${h})`);
      } else {
        const reachable = fits || (m.took !== null && m.afterBottom <= h + 8 && m.afterTop >= 0);
        is(reachable, `${loc} ${w}x${h}: fits (${m.lowest}) or PROVEN reachable — scrolled ${m.took || 'nothing'}, then visible ${m.afterTop}-${m.afterBottom}`);
      }
      is(m.small.length === 0, `${loc} ${w}x${h}: taps >= 44px${m.small.length ? ' — ' + m.small.slice(0, 2).join(', ') : ''}`);
      is(m.tiny.length === 0, `${loc} ${w}x${h}: text >= 14px${m.tiny.length ? ' — ' + m.tiny.slice(0, 2).join(', ') : ''}`);
      if (SHOT && (w === 360 || w === 1024)) {
        await p.screenshot({ path: path.join(SHOT_DIR, `loc-${loc}-${w}.png`), fullPage: true });
      }
    }
    await p.close();
  }

  await br.close();
  srv.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
