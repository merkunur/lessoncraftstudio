#!/usr/bin/env node
/* =====================================================================
   audit-heart-words-locale-layout.js — 10 locales × 7 widths = 70 renders.

   The strings gate proves the words are right; this proves they FIT. German,
   Dutch and the Scandinavian languages compound freely, so a chip that is
   comfortable in English can overflow its card or drop under the 44px tap
   floor in half the catalogue — and neither the model gate nor the English
   browser gate can see it.

   ⚠ 704 is in the sweep and it is the width that matters: the tool page
   pins the iframe there on EVERY desktop.

   Quiet on success — one line per locale, a worst-case digest at the end.

   Usage: node scripts/audit-heart-words-locale-layout.js [--shot] [--locales=de,sv]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const SHELL = path.join(__dirname, '..', 'mini tools');
const ROOT = process.env.HW_TOOL_DIR || SHELL;
const IMAGES = path.join(__dirname, '..', 'frontend', 'public', 'image-library-webp');
const PORT = 5562;
const SHOT = process.argv.indexOf('--shot') >= 0;
const SHOTDIR = path.join(__dirname, '..', '.scratch', 'hw', 'locale');

const ALLL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALLL;
const WIDTHS = [320, 360, 412, 704, 768, 1024, 1366];
const heightFor = (w) => (w >= 1200 ? 900 : w < 500 ? 760 : 860);

let PASS = 0, FAIL = 0, renders = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
const worst = { chip: 1e9, chipAt: '', over: 0, overAt: '', font: 1e9, fontAt: '' };

const MIME = { '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css',
               '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };
const srv = http.createServer((rq, rs) => {
  const url = rq.url.split('?')[0];
  let fp;
  if (url.indexOf('/image-library-webp/') === 0) {
    fp = path.join(IMAGES, decodeURIComponent(url.replace('/image-library-webp/', '')));
  } else {
    const f = decodeURIComponent(url.replace('/mini-tools/', '').replace(/^\//, ''));
    fp = path.join(ROOT, f);
    if (!fs.existsSync(fp)) fp = path.join(SHELL, f);
  }
  if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) { rs.writeHead(404); rs.end('x'); return; }
  rs.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'text/plain' });
  rs.end(fs.readFileSync(fp));
});

/* Measure the BOARD and then the DESK, because the desk is where the long
   words live — tabs, the seam hint, the caps, the print chooser. Measuring
   only the board would miss every string a compounding language stretches. */
const measure = () => {
  const q = (s) => Array.from(document.querySelectorAll(s));
  const card = document.querySelector('.hw-card') || document.querySelector('.hw-desk');
  const wrap = document.querySelector('.hw-wrap');
  const chips = q('.hw-pill,.hw-toolbtn,.hw-flip,.hw-tab,.hw-deskback,.hw-ed-btn,.hw-radiobtn,.hw-teachbtn,.hw-wordchip');
  const texts = q('.hw-pill,.hw-toolbtn,.hw-flip,.hw-tab,.hw-desknote,.hw-ed-label,.hw-shelflabel,.hw-legend,.hw-writeprompt');
  const wr = wrap ? wrap.getBoundingClientRect() : null;
  let over = 0, clipped = 0, minChip = 1e9, minFont = 1e9;
  for (const c of chips) {
    const r = c.getBoundingClientRect();
    if (r.height > 0) minChip = Math.min(minChip, r.height);
    if (wr) over = Math.max(over, r.right - wr.right, wr.left - r.left);
  }
  for (const t of texts) {
    const s = getComputedStyle(t);
    const f = parseFloat(s.fontSize);
    if (t.textContent.trim() && f) minFont = Math.min(minFont, f);
    /* a chip whose label does not fit its own box */
    if (t.scrollWidth > t.clientWidth + 1) clipped++;
  }
  return {
    chipCount: chips.length,
    textCount: texts.length,
    minChip: chips.length ? minChip : -1,
    minFont: texts.length ? minFont : -1,
    over: Math.round(over * 10) / 10,
    clipped,
    docW: document.documentElement.scrollWidth,
    winW: window.innerWidth,
    cardW: card ? card.getBoundingClientRect().width : -1
  };
};

(async () => {
  srv.listen(PORT);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    for (const W of WIDTHS) {
      const H = heightFor(W);
      await page.setViewport({ width: W, height: H });
      await page.goto(`http://127.0.0.1:${PORT}/heart-words.html?lang=${loc}&embed=1`,
        { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.hw-box', { timeout: 12000 });
      await wait(220);

      for (const surface of ['board', 'desk-words', 'desk-mine', 'desk-print']) {
        if (surface !== 'board') {
          await page.evaluate((s) => {
            const T = window.HeartWords;
            T.premium = true;                 /* the widest possible chrome */
            T.surface = 'desk';
            T.deskTab = s === 'desk-words' ? 'words' : (s === 'desk-mine' ? 'mine' : 'print');
            T.render();
          }, surface);
          await wait(140);
        }
        const m = await page.evaluate(measure);
        renders++;
        const at = `${loc} ${W}px ${surface}`;

        /* ⚠ non-vacuity first — a floor over an empty collection is a
           check that cannot fail */
        is(m.chipCount >= 2, `${at}: rendered its controls (${m.chipCount}) — the floors below measure something`);
        is(m.textCount >= 1, `${at}: rendered its labels (${m.textCount}) — ditto`);
        is(m.cardW > 150, `${at}: the surface is laid out (${Math.round(m.cardW)}px)`);
        is(m.docW <= m.winW + 1, `${at}: no sideways scroll (${m.docW} vs ${m.winW})`);
        is(m.over <= 0.5, `${at}: a control overhangs the card by ${m.over}px`);
        is(m.clipped === 0, `${at}: ${m.clipped} label(s) clipped inside their own box`);
        is(m.minChip >= 44, `${at}: smallest control is ${Math.round(m.minChip)}px, under the 44px floor`);
        is(m.minFont >= 11, `${at}: smallest label is ${Math.round(m.minFont)}px`);

        if (m.minChip < worst.chip) { worst.chip = m.minChip; worst.chipAt = at; }
        if (m.over > worst.over) { worst.over = m.over; worst.overAt = at; }
        if (m.minFont < worst.font) { worst.font = m.minFont; worst.fontAt = at; }
      }

      if (SHOT && W === 360) {
        if (!fs.existsSync(SHOTDIR)) fs.mkdirSync(SHOTDIR, { recursive: true });
        await page.screenshot({ path: path.join(SHOTDIR, `${loc}-360.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors${errs.length ? ' — ' + errs[0] : ''}`);
    console.log(`  ok   ${loc}`);
    await page.close();
  }

  await browser.close();
  srv.close();

  console.log('');
  console.log(`  tightest control: ${Math.round(worst.chip)}px at ${worst.chipAt}`);
  console.log(`  worst overhang:   ${worst.over}px at ${worst.overAt}`);
  console.log(`  smallest label:   ${Math.round(worst.font)}px at ${worst.fontAt}`);
  if (FAIL) { console.error(`\nFAIL — ${FAIL} of ${PASS + FAIL} checks across ${renders} renders`); process.exit(1); }
  console.log(`\nPASS — ${PASS} checks across ${renders} renders (${LOCALES.length} locales × ${WIDTHS.length} widths × 4 surfaces)`);
})().catch(e => { console.error('HARNESS THREW: ' + e.message + '\n' + e.stack); try { srv.close(); } catch (_) {} process.exit(1); });
