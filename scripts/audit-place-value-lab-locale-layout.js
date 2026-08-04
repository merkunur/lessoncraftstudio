#!/usr/bin/env node
/* =====================================================================
   audit-place-value-lab-locale-layout.js — 11 locales x 6 viewports.

   ⭐ ENGLISH FITTING PROVES NOTHING. It is the shortest chrome in the
   set. German compounds ("Einen Hunderter tauschen", "Hunderterstelle"),
   Finnish agglutination ("Kahdeksankymmentäyhdeksän") and the Romance
   clause lengths are what actually break a row — and this tool's regroup
   buttons used to sit INSIDE a narrow column, where the German label
   wrapped to three lines.

   What it asserts, per cell:
     · no text-bearing chrome node overflows the CARD
     · no two controls in the dock or the regroup row OVERLAP
     · every text-bearing node is >= 12px (a label a teacher reads at the
       back of a room, not a caption)
     · the number word itself stays inside the card at the longest value
       each locale can produce

   ⚠ The word is measured at the locale's LONGEST value, not at 24. Every
   locale's worst case differs, so the harness computes it rather than
   assuming — Finnish 888 is 38 characters where English 888 is 24.

   Run: node scripts/audit-place-value-lab-locale-layout.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = process.env.PVL_TOOL_DIR || path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const VIEWS = [[320, 780], [360, 780], [412, 820], [768, 900], [1024, 768], [1366, 900]];

let fails = 0;
const FAIL = (m) => { fails++; console.log('  ✗ FAIL ' + m); };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.indexOf('/mini-tools/') === 0
      ? path.join(MINI, p.slice('/mini-tools/'.length))
      : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

/* the longest word each locale can produce in 0-999, computed from the
   tool's own composer rather than guessed */
const WORST = () => {
  const T = window.PlaceValueLab;
  const f = T.NUM_WORDS_HELPERS[T.api.lang];
  let best = 0, n = 0;
  for (let i = 0; i <= 999; i++) {
    const L = f(i, 'cardinal').length;
    if (L > best) { best = L; n = i; }
  }
  return { n, len: best };
};

const PROBE = () => {
  const app = document.querySelector('.lcs-app');
  const card = app.getBoundingClientRect();
  const out = { over: [], small: [], overlap: [], word: null };

  const CHROME = '.pvl-collbl,.pvl-slotlbl,.pvl-chip,.pvl-ctxbtn,.pvl-big,.pvl-prompt,.pvl-invite,.pvl-tasknote,.pvl-gatemsg';
  document.querySelectorAll(CHROME).forEach((e) => {
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const d = Math.max(r.right - card.right, card.left - r.left);
    if (d > 1) out.over.push(String(e.className).slice(0, 26) + ':' + Math.round(d));
    const fs2 = parseFloat(getComputedStyle(e).fontSize);
    if (fs2 < 12 && (e.textContent || '').trim()) out.small.push(String(e.className).slice(0, 26) + ':' + fs2);
  });

  /* ⚠ NO GATE HERE ASKED WHETHER TWO RENDERED THINGS COLLIDE — every
     other check measures ONE box against a floor. A German label that
     fits the card and sits on top of its neighbour passes all of them. */
  const rows = [['.pvl-dock .pvl-chip'], ['.pvl-ctxrow .pvl-ctxbtn']];
  rows.forEach((sel) => {
    const els = Array.from(document.querySelectorAll(sel[0]));
    for (let i = 0; i < els.length; i++) {
      for (let j = i + 1; j < els.length; j++) {
        const a = els[i].getBoundingClientRect(), b = els[j].getBoundingClientRect();
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 2 && oy > 2) out.overlap.push(sel[0] + ' ' + i + '/' + j + ' by ' + Math.round(ox) + 'x' + Math.round(oy));
      }
    }
  });

  const w = document.querySelector('.pvl-word');
  if (w) {
    const r = w.getBoundingClientRect();
    out.word = { text: (w.textContent || '').slice(0, 40), over: Math.round(Math.max(r.right - card.right, card.left - r.left)) };
  }
  return out;
};

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let cells = 0;
  console.log(`place-value-lab locale layout  (${LOCALES.length} locales x ${VIEWS.length} viewports)`);

  for (const lang of LOCALES) {
    await page.setViewport({ width: 1024, height: 768 });
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/place-value-lab.html?lang=${lang}`, { waitUntil: 'networkidle0' });
    const worst = await page.evaluate(WORST);
    for (const [w, h] of VIEWS) {
      await page.setViewport({ width: w, height: h });
      /* the longest word this locale can make, on a full three-place mat */
      await page.evaluate((n) => {
        const T = window.PlaceValueLab;
        T.premium = true;
        T.api.settings.hundreds = true;
        T.st.maxPlaces = 3;
        T.st.h = Math.floor(n / 100); T.st.t = Math.floor(n / 10) % 10; T.st.o = n % 10;
        T.render();
      }, worst.n);
      const m = await page.evaluate(PROBE);
      cells++;
      const tag = `${lang} ${w}x${h}`;
      if (m.over.length) FAIL(`${tag}: chrome outside the card — ${m.over.slice(0, 3).join(', ')}`);
      if (m.small.length) FAIL(`${tag}: text under 12px — ${m.small.slice(0, 3).join(', ')}`);
      if (m.overlap.length) FAIL(`${tag}: controls overlap — ${m.overlap.slice(0, 2).join(', ')}`);
      if (m.word && m.word.over > 1) FAIL(`${tag}: the number word (${worst.n}, ${worst.len} chars) overflows by ${m.word.over}px`);
    }
    console.log(`  ${lang}: worst word is ${worst.n} at ${worst.len} chars`);
  }

  console.log(`${fails ? 'FAIL' : 'PASS'}  locale layout  (${cells} cells, ${fails} failures)`);
  await browser.close();
  server.close();
  process.exit(fails ? 1 : 0);
})();
