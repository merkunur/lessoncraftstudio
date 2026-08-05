#!/usr/bin/env node
/* =====================================================================
   audit-measurement-bench-locale-layout.js — 11 locales x 6 viewports.

   ⭐ WHY THIS AND NOT THE SMOKE. `smoke-measurement-bench-locales.js`
   mounts each locale at ONE viewport (1024x768) and `local-test` sweeps
   six viewports in ONE locale, so the product of the two — a long locale
   at a narrow width — is exactly the cell neither covers. The native
   panels lengthened several strings substantially (pt's lengthHint is
   ~120 chars against sv's ~55), and the estimate prompt drives a
   reserved bar height that is measured, not tabulated.

   Asserts, per cell: no horizontal overflow, the stage never collides
   with the dock, every visible control clears 44px, no clipped text, and
   no JS errors.

   Run:  node scripts/audit-measurement-bench-locale-layout.js
         node scripts/audit-measurement-bench-locale-layout.js --locales=fi,pt
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MT = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const PORT = 5741;
const TYPES = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png' };

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.includes(l)) : ALL;
const VIEWPORTS = [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]];

const srv = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  let f = null;
  if (u.startsWith('/mini-tools/')) f = path.join(MT, u.slice('/mini-tools/'.length));
  else if (u.startsWith('/image-library-webp/')) f = path.join(PUB, u.slice(1));
  if (f && fs.existsSync(f) && fs.statSync(f).isFile()) {
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    return res.end(fs.readFileSync(f));
  }
  res.writeHead(404); res.end('x');
});

let FAIL = 0, PASS = 0;
const ok = (m, cond, extra) => { if (cond) { PASS++; } else { FAIL++; console.log('  FAIL  ' + m + (extra ? ' — ' + extra : '')); } };

(async () => {
  await new Promise((r) => srv.listen(PORT, r));
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    let cells = 0;
    for (const [w, h] of VIEWPORTS) {
      const p = await b.newPage();
      const errs = [];
      p.on('pageerror', (e) => errs.push(String(e.message)));
      await p.setViewport({ width: w, height: h });
      await p.goto(`http://127.0.0.1:${PORT}/mini-tools/measurement-bench.html?lang=${loc}`, { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 420));

      const m = await p.evaluate(() => {
        const doc = document.documentElement;
        const tiny = [];
        document.querySelectorAll('button, a').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width < 1 && r.height < 1) return;               /* not rendered */
          if (getComputedStyle(el).visibility === 'hidden') return;
          if (r.width < 44 || r.height < 44) tiny.push((el.className || el.textContent || '?').toString().trim().slice(0, 22) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
        });
        /* clipped text: an element whose content is wider than its box and
           which is not allowed to scroll */
        const clipped = [];
        document.querySelectorAll('.mb-hint, .mb-say, .mb-est-q, .mb-chip, .mb-tab, .mb-est-pin, .mb-vlabel').forEach((el) => {
          const cs = getComputedStyle(el);
          if (el.scrollWidth > el.clientWidth + 1 && cs.overflow !== 'visible' && cs.overflowX !== 'auto') {
            clipped.push((el.className || '?') + ' ' + el.scrollWidth + '>' + el.clientWidth);
          }
        });
        const st = document.querySelector('.mb-stage-outer');
        const dock = document.querySelector('.mb-dock');
        /* ⚠ NOT scrollWidth. The tool sets `overflow-x:hidden` on its own
           root, so the document can never report horizontal overflow — the
           first version of this check was VACUOUS and its poison proved it by
           surviving. Measure where the content actually IS instead: the
           furthest right edge of anything laid out, against the viewport. */
        let far = 0, farEl = '';
        document.querySelectorAll('.mb-wrap, .mb-wrap *').forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') return;
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > far) { far = r.right; farEl = (el.className || el.tagName || '?').toString().trim().slice(0, 30); }
        });
        return {
          hOver: Math.max(0, Math.round(far - doc.clientWidth)), farEl,
          tiny, clipped,
          collide: st && dock ? (st.getBoundingClientRect().bottom - dock.getBoundingClientRect().top) : -1
        };
      });

      const cell = `${loc} ${w}x${h}`;
      ok(cell + ' no h-overflow', m.hOver <= 1, m.hOver + 'px from ' + m.farEl);
      ok(cell + ' tap targets >=44', m.tiny.length === 0, m.tiny.join(' | '));
      ok(cell + ' no clipped text', m.clipped.length === 0, m.clipped.join(' | '));
      ok(cell + ' stage clear of the dock', m.collide <= 1, m.collide + 'px overlap');
      ok(cell + ' no js errors', errs.length === 0, errs[0]);
      cells++;
      await p.close();
    }
    console.log('  ok    ' + loc + ' — ' + cells + ' viewports');
  }

  await b.close(); srv.close();
  console.log('\n' + PASS + ' passed, ' + FAIL + ' failed  (' + LOCALES.length + ' locales x ' + VIEWPORTS.length + ' viewports)');
  if (FAIL) process.exit(1);
  console.log('audit-measurement-bench-locale-layout: ALL GREEN');
})();
