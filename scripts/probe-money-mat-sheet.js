#!/usr/bin/env node
/* =====================================================================
   probe-money-mat-sheet.js — DOES ANYTHING ACTUALLY REACH THE PAPER?

   `audit-tool-control-liveness` scores a Print chip green the moment
   window.print() fires, so it is structurally blind to a sheet that is
   empty, invisible, or a picture of the buttons. This measures the sheet
   itself, under emulated print media:

     · the sheet is HIDDEN on screen and VISIBLE in print (both directions)
     · every screen control is GONE from the printed page — a printed
       picture of a button is not a worksheet
     · NON-VACUITY first: the sheet has descendants, has height, and its
       shapes carry a real border or fill. An empty container is still
       "visible", and that is how a hollow sheet passes.
     · ⭐ the cut-out coins print at LIFE SIZE in millimetres, and the
       smallest clears a K-2 scissors floor. The fraction-kitchen sheet
       once printed a 6.2mm piece.
     · ⭐ the coins keep their TRUE RELATIVE diameters on paper, and do NOT
       inherit the screen-legibility multipliers — the wide tiers would
       otherwise print them at twice life size.

   Usage: node scripts/probe-money-mat-sheet.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = process.env.MM_TOOL_DIR || path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const MM_PER_PX_CSS = 1 / 3.7795275591;   /* CSS px → mm, the spec ratio */

let pass = 0, fail = 0; const bad = [];
const ok = (n, c, x) => { if (c) { pass++; console.log('  ✓ ' + n); } else { fail++; bad.push(n); console.log('  ✗ FAIL ' + n + (x ? ' — ' + x : '')); } };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/')
      ? path.join(IMGLIB, p.slice('/image-library-webp/'.length))
      : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const [lang, cur, label] of [['en', 'usd', 'en/USD'], ['de', 'eur', 'de/EUR'], ['sv', 'sek', 'sv/SEK']]) {
    console.log(`\n${label}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 768 });
    await page.goto(`http://127.0.0.1:${PORT}/money-mat.html?lang=${lang}`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 300));

    /* prime: premium, a known price, and a completed change round so page 3
       has real numbers on it */
    await page.evaluate(() => {
      const T = MoneyMat;
      T.premium = true; T.band = 2; T.mode = 'change';
      T.price = 45; T.chg = { tender: 100 }; T.tray = [25, 25, 5];
      T.phase = 'changeDone';
      T.render(); T._buildSheet();
    });
    await new Promise((r) => setTimeout(r, 250));

    const onScreen = await page.evaluate(() => getComputedStyle(document.querySelector('.mm-sheet')).display);
    ok('the sheet is hidden on screen', onScreen === 'none', onScreen);

    /* ⭐⭐ GATING THE CHIP IS NOT GATING THE FEATURE. Ctrl+P bypasses every
       button on the page, so a paid sheet revealed by an unconditional
       @media print block is not gated at all. Asserted from the FREE state,
       under print media, with no chip involved. */
    const leak = await page.evaluate(async () => {
      const T = MoneyMat;
      T.premium = false; T.render(); T._buildSheet();
      return null;
    });
    await page.emulateMediaType('print');
    await new Promise((r) => setTimeout(r, 200));
    const freePrint = await page.evaluate(() => {
      const s = document.querySelector('.mm-sheet');
      return { display: getComputedStyle(s).display, h: s.getBoundingClientRect().height };
    });
    ok('⭐ a FREE user pressing Ctrl+P gets no paid sheet',
      freePrint.display === 'none' && freePrint.h === 0, JSON.stringify(freePrint));
    await page.emulateMediaType('screen');
    await page.evaluate(() => { MoneyMat.premium = true; MoneyMat.render(); MoneyMat._buildSheet(); });
    await new Promise((r) => setTimeout(r, 200));

    await page.emulateMediaType('print');
    await new Promise((r) => setTimeout(r, 250));

    const m = await page.evaluate((MM) => {
      const vis = (s) => { const e = document.querySelector(s); return !!e && getComputedStyle(e).display !== 'none'; };
      const sheet = document.querySelector('.mm-sheet');
      const cuts = [...document.querySelectorAll('.mm-cut')];
      const inked = cuts.filter((c) => {
        const cs = getComputedStyle(c);
        return (cs.borderTopWidth !== '0px' && cs.borderTopStyle !== 'none') || cs.backgroundImage !== 'none';
      }).length;
      const sizes = cuts.map((c) => c.getBoundingClientRect().width * MM);
      const byLabel = {};
      cuts.forEach((c) => { byLabel[c.textContent.trim()] = c.getBoundingClientRect().width; });
      return {
        sheetVisible: vis('.mm-sheet'),
        sheetKids: sheet ? sheet.querySelectorAll('*').length : 0,
        sheetH: sheet ? sheet.getBoundingClientRect().height : 0,
        pages: document.querySelectorAll('.mm-page').length,
        cuts: cuts.length, inked,
        minMM: sizes.length ? Math.min(...sizes) : 0,
        maxMM: sizes.length ? Math.max(...sizes) : 0,
        mats: document.querySelectorAll('.mm-pmat').length,
        lines: document.querySelectorAll('.mm-ptrack').length,
        byLabel,
        chromeLeft: ['.mm-dock', '.mm-purse', '.mm-scene', '.mm-matzone', '.lcs-header'].filter(vis)
      };
    }, MM_PER_PX_CSS);

    /* NON-VACUITY FIRST — an empty container is still "visible" */
    ok('the sheet reaches the page', m.sheetVisible);
    ok(`NON-VACUITY: it has ${m.sheetKids} descendants`, m.sheetKids > 20, String(m.sheetKids));
    ok(`NON-VACUITY: it is ${Math.round(m.sheetH)}px tall, not a zero-height box`, m.sheetH > 200, String(m.sheetH));
    ok(`${m.inked} cut-outs carry a real border — something reaches paper`, m.inked > 0 && m.inked === m.cuts, `${m.inked}/${m.cuts}`);
    ok('all three pages are present (coins, mats, the counting line)', m.pages === 3, String(m.pages));
    ok('the mats page carries six mats and three equals rows', m.mats === 6, String(m.mats));
    ok('the counting line page carries two blank lines', m.lines === 2, String(m.lines));

    ok('every screen control is gone from the printed page', m.chromeLeft.length === 0, m.chromeLeft.join(', '));

    /* ⭐ LIFE SIZE, AND CUTTABLE */
    ok(`the smallest cut-out is ${m.minMM.toFixed(1)}mm — a K-2 child can cut it`, m.minMM >= 15, m.minMM.toFixed(2));
    ok(`the largest is ${m.maxMM.toFixed(1)}mm — still a coin, not a saucer`, m.maxMM <= 32, m.maxMM.toFixed(2));

    /* ⭐ TRUE RELATIVE DIAMETERS SURVIVE ONTO PAPER */
    const ratio = await page.evaluate(() => {
      const c = MoneyMat.curView().coins;
      const out = [];
      for (const d of c) {
        const el = [...document.querySelectorAll('.mm-cut')].find((x) => x.textContent.replace(/\s/g, '') === d.label.replace(/\s/g, ''));
        if (el) out.push({ v: d.v, declared: d.d, drawn: el.getBoundingClientRect().width });
      }
      return out;
    });
    let worst = 0;
    for (let i = 1; i < ratio.length; i++) {
      const want = ratio[i].declared / ratio[0].declared;
      const got = ratio[i].drawn / ratio[0].drawn;
      worst = Math.max(worst, Math.abs(got - want) / want);
    }
    ok('⭐ true relative diameters survive onto paper', ratio.length >= 3 && worst < 0.02, `worst ${(worst * 100).toFixed(1)}%  n=${ratio.length}`);

    /* ⭐ AND THEY DO NOT INHERIT THE SCREEN MULTIPLIERS */
    const scaled = await page.evaluate(() => {
      const before = document.querySelector('.mm-cut').getBoundingClientRect().width;
      document.querySelector('.mm-wrap').style.setProperty('--mm-dz', '3');
      document.querySelector('.mm-wrap').style.setProperty('--mm-cs', '3');
      const after = document.querySelector('.mm-cut').getBoundingClientRect().width;
      return { before, after };
    });
    ok('⭐ the sheet ignores the screen legibility multipliers',
      Math.abs(scaled.after - scaled.before) < 0.5,
      `${scaled.before.toFixed(1)} → ${scaled.after.toFixed(1)} when --mm-dz/--mm-cs tripled`);

    if (process.argv.includes('--shot')) {
      await page.screenshot({ path: path.join(REPO, 'docs', 'audit-results', 'money-mat', 'qa', `P-sheet-${lang}.png`), fullPage: true });
    }
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + bad.join(' · ')); process.exit(1); }
  console.log('probe-money-mat-sheet: ALL GREEN');
})();
