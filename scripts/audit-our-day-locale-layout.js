#!/usr/bin/env node
/* =====================================================================
   audit-our-day-locale-layout.js — 11 locales x 6 viewports.

   English fitting proves nothing about German compounds, Dutch
   "Invaljuf of invalmeester", Portuguese "a hora das atividades manuais"
   or Finnish agglutination — and this tool's whole surface is localised
   nouns on cards. The old build shipped `white-space:nowrap;
   text-overflow:ellipsis` on the card name, so every one of those was
   CUT OFF on the primary display surface, in every locale but English.

   ⚠ 704 IS IN THE SWEEP AND IT IS THE PRODUCTION WIDTH: the tool page
   wraps the iframe in max-w-3xl, which is 704px at 1440, 1920 and 2560
   alike. It is the one width most teachers will ever see.

   ⚠ FRESH BROWSER PER LOCALE. A shared one caches the module and reuses
   the ORIGIN, so locale 11 reads locale 1's localStorage day and every
   later locale passes on the first one's copy. Measured: it turned a
   12-card day into 16 during this rebuild.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const ROOT = path.join(REPO, 'mini tools');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 704, 768, 1024, 1366];   /* 704 = production */
const TAP_FLOOR = 44;      /* controls */
const TEXT_FLOOR = 14;     /* any text-bearing node */
const PORT = 8797;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

const fails = [];
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools'.length);
  const f = path.join(ROOT, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  res.end(fs.readFileSync(f));
});

/* a day with the longest names each locale owns, so the sweep measures
   the hard case and not "Art" */
const HARD_DAY = ['arrival', 'circle', 'crafts', 'outdoor', 'guest', 'assembly', 'aftercare', 'science', 'lunch', 'library'];

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  let cells = 0;

  for (const loc of LOCALES) {
    /* fresh browser, not merely a fresh page */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    for (const w of WIDTHS) {
      const page = await browser.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(e.message));
      await page.setViewport({ width: w, height: w < 500 ? 780 : 768 });
      await page.goto(`http://localhost:${PORT}/our-day.html?lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
      await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
      await page.reload({ waitUntil: 'networkidle0' });
      await page.waitForSelector('.od-wrap', { timeout: 8000 });
      await page.evaluate((ids) => { ids.forEach((i) => OurDay.addCard(i)); OurDay.startDay(); }, HARD_DAY);
      await new Promise((r) => setTimeout(r, 260));

      const m = await page.evaluate((floors) => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const out = { overflow: [], smallCtl: [], tinyText: [], clipped: [], collide: [] };
        /* containment is measured against the CARD, not an inner box that
           would absorb the evidence with its own overflow */
        document.querySelectorAll('.od-wrap *').forEach((el) => {
          /* the print documents are parked off-screen ON PURPOSE */
          if (el.closest('.od-printdocs')) return;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.right > card.right + 1 || r.left < card.left - 1) {
            out.overflow.push(el.className + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
          }
        });
        document.querySelectorAll('button, a[href], input').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.width < floors.tap - 0.5 || r.height < floors.tap - 0.5) {
            out.smallCtl.push(el.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
          }
        });
        document.querySelectorAll('.od-wrap *').forEach((el) => {
          let txt = '';
          el.childNodes.forEach((n) => { if (n.nodeType === 3) txt += n.textContent.trim(); });
          if (!txt) return;
          const fs2 = parseFloat(getComputedStyle(el).fontSize);
          if (fs2 < floors.text - 0.5) out.tinyText.push(el.className + ' ' + fs2 + 'px');
        });
        /* a card NAME that is clipped is the defect this tool shipped */
        document.querySelectorAll('.od-cardname').forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.textOverflow === 'ellipsis') out.clipped.push('ellipsis on ' + el.textContent.slice(0, 20));
          /* ⚠ scrollHeight > clientHeight is TRUE for a SINGLE line in a
             flow-root box — the font's line box overhangs. Compare LINES,
             or this condemns every correct card name in the tool. */
          const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
          const fits = Math.round(el.clientHeight / lh);
          const needs = Math.round(el.scrollHeight / lh);
          if (needs > fits) out.clipped.push('clipped: ' + el.textContent.slice(0, 24) + ' (' + needs + ' lines in ' + fits + ')');
        });
        /* two rendered things must not overlap */
        const rows = Array.from(document.querySelectorAll('.od-card'));
        for (let i = 1; i < rows.length; i++) {
          const a = rows[i - 1].getBoundingClientRect(), b = rows[i].getBoundingClientRect();
          if (b.top < a.bottom - 1) out.collide.push('cards ' + (i - 1) + '/' + i);
        }
        return out;
      }, { tap: TAP_FLOOR, text: TEXT_FLOOR });

      cells++;
      const tag = `${loc}@${w}`;
      if (errs.length) fails.push(`${tag} console error: ${errs[0]}`);
      if (m.overflow.length) fails.push(`${tag} OVERFLOWS the card: ${m.overflow.slice(0, 2).join(' | ')}`);
      if (m.smallCtl.length) fails.push(`${tag} control under ${TAP_FLOOR}px: ${m.smallCtl.slice(0, 3).join(' | ')}`);
      if (m.tinyText.length) fails.push(`${tag} text under ${TEXT_FLOOR}px: ${m.tinyText.slice(0, 3).join(' | ')}`);
      if (m.clipped.length) fails.push(`${tag} CARD NAME CLIPPED: ${m.clipped.slice(0, 2).join(' | ')}`);
      if (m.collide.length) fails.push(`${tag} rendered boxes collide: ${m.collide.slice(0, 2).join(' | ')}`);
      await page.close();
    }
    await browser.close();
    process.stdout.write(loc + ' ');
  }
  server.close();

  console.log(`\n\n${cells} cells measured (${LOCALES.length} locales x ${WIDTHS.length} viewports)`);
  if (!cells) { console.error('FATAL: measured nothing — a gate that measures nothing reports "measured nothing", not PASS'); process.exit(1); }
  if (fails.length) {
    console.error(`FAIL — ${fails.length} problem(s):`);
    fails.slice(0, 30).forEach((f) => console.error('  x ' + f));
    if (fails.length > 30) console.error(`  ... and ${fails.length - 30} more`);
    process.exit(1);
  }
  console.log('PASS — every locale fits every viewport, no clipped names, no small controls');
})();
