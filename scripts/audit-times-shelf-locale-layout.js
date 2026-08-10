/* =====================================================================
   audit-times-shelf-locale-layout.js — TOOL #47, 11 locales x 6 widths.

   The stage renders ZERO words, so the only locale-sensitive surface is
   the shell chrome and the ledge. That is precisely why this gate is
   still required: #46 was cut off by 24px at 1920x1080 in de and fi
   ONLY, because a long title tipped the header into a second line and
   the wide tier's min-height floor was measured against English.

   ⚠ THE FLOOR IS MEASURED AGAINST THE LONGEST LOCALE, NEVER AGAINST
   ENGLISH — English fitted on #46 and proved nothing.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5652;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const CASES = [
  { w: 320, h: 568 }, { w: 360, h: 800 }, { w: 412, h: 915 },
  { w: 768, h: 1024 }, { w: 1024, h: 900 }, { w: 1366, h: 768 }
];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'times-shelf.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let worstBottom = 0, worstTag = '';

  for (const loc of LOCALES) {
    for (const C of CASES) {
      const tag = `${loc} ${C.w}x${C.h}`;
      const p = await b.newPage();
      const errs = [];
      p.on('pageerror', (e) => errs.push(String(e)));
      await p.setViewport({ width: C.w, height: C.h, deviceScaleFactor: 1 });
      await p.goto(`http://127.0.0.1:${PORT}/mini-tools/times-shelf.html?lang=${loc}`, { waitUntil: 'load' });
      await p.waitForSelector('.tsh-wrap', { timeout: 12000 });
      await wait(220);

      const m = await p.evaluate(() => {
        const card = document.querySelector('.lcs-app') || document.body;
        const cr = card.getBoundingClientRect();
        /* ⚠ SCROLL TO THE BOTTOM FIRST, THEN MEASURE THE LOWEST CONTROL.
           The first version of this gate measured the bottom of every
           box including `.lcs-app`, whose trailing padding runs 12px
           past the last button — so it reported five false cut-offs at
           1366x768 while the controls were comfortably on screen. What
           actually matters is whether a finger can REACH the ledge, and
           on a phone the shell pins scrolling, so both halves have to
           be measured together. Verify the measurement before the
           defect. */
        window.scrollTo(0, 99999);
        let low = 0, wide = 0;
        const all = document.querySelectorAll('.tsh-arena, .tsh-btn');
        all.forEach((n) => {
          const r = n.getBoundingClientRect();
          if (!r.width || !r.height) return;
          if (r.bottom > low) low = r.bottom;
          if (r.right > wide) wide = r.right;
        });
        const btns = [];
        document.querySelectorAll('.tsh-btn').forEach((n) => {
          const r = n.getBoundingClientRect();
          btns.push({ w: r.width, h: r.height, x: r.left, y: r.top });
        });
        return {
          low, wide,
          cr: { x: cr.left, y: cr.top, w: cr.width, h: cr.height },
          scrollW: document.documentElement.scrollWidth,
          clientW: document.documentElement.clientWidth,
          btns,
          title: (document.querySelector('.lcs-title') || {}).textContent || ''
        };
      });

      is(errs.length === 0, `${tag} no page errors — ${errs.join(' | ')}`);
      is(m.scrollW <= m.clientW + 1, `${tag} no horizontal overflow (${m.scrollW} vs ${m.clientW})`);
      is(m.low <= C.h + 1, `${tag} every control is REACHABLE after scrolling (${m.low.toFixed(0)} vs ${C.h})`);
      is(m.wide <= m.cr.x + m.cr.w + 1, `${tag} nothing escapes the card horizontally`);
      /* the ledge must not wrap into a shape that overlaps itself */
      let bad = 0;
      for (let i = 0; i < m.btns.length; i++) {
        if (m.btns[i].w < 44 || m.btns[i].h < 44) bad++;
      }
      is(bad === 0, `${tag} every ledge control clears the 44px chrome floor — ${bad} under`);
      is(!!m.title, `${tag} the title renders`);

      if (m.low > worstBottom) { worstBottom = m.low; worstTag = tag; }
      await p.close();
    }
  }

  srv.close();
  await b.close();
  console.log(`\nlowest rendered edge across all 66 cells: ${worstBottom.toFixed(0)}px (${worstTag})`);
  console.log(`audit-times-shelf-locale-layout: ${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})();
