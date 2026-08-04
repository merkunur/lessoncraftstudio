#!/usr/bin/env node
/* =====================================================================
   audit-place-value-lab-containment.js

   THE GATE THAT WAS MISSING, and the reason all three reported defects
   shipped. Two independent failures let them through:

   1. ⭐ THE MEASURE WAS BLIND. local-test asked
      `documentElement.scrollWidth - innerWidth`, a PAGE-level question,
      under `.lcs-app{overflow:hidden}` — so the card silently clipped
      every escaping block and the number came back 0 at EVERY width
      while rods were painting over the tens column.

   2. ⭐ THE SWEEP SAMPLED ONE POINT OF THE BAND. It only ever rendered
      the demo pose (24) and one 304 case, never 9 hundreds / 19 tens /
      19 ones — the states where a fixed-track layout would have failed.

   So this gate measures each block against THE BOX IT LIVES IN, at the
   states that stress it.

   ⚠ AND THE CARD IS THE WRONG BOX HERE. The house rule says "measure
   against the CARD", but the columns are narrower than the card and
   centred inside it, so a block can be visibly outside its own white
   column and still inside the card: measured on the pre-rebuild build,
   768 showed 24 blocks up to 195px outside their COLUMN and 0 outside
   the card. The operator said "out of the box" and meant the column.
   Both are asserted — 360 fails only the card check — and picking one
   would have certified the defect.

   Run:  node scripts/audit-place-value-lab-containment.js
         node scripts/audit-place-value-lab-containment.js --poison
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = process.env.PVL_TOOL_DIR || path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const WIDTHS = [320, 360, 412, 768, 1024, 1366];
const TALL = { 320: 780, 360: 780, 412: 820, 768: 900, 1024: 768, 1366: 900 };

/* every state the engine can actually hold that stresses the layout,
   NOT just the pose the tool opens on */
const STATES = [
  { n: 'empty', h: 0, t: 0, o: 0, p: 3 },
  { n: 'demo', h: 1, t: 2, o: 4, p: 3 },
  { n: 'offer-ones', h: 0, t: 3, o: 14, p: 2 },
  { n: 'offer-ones-max', h: 0, t: 9, o: 9, p: 2 },
  { n: 'full-bank', h: 1, t: 10, o: 0, p: 3 },
  { n: 'tens-over', h: 1, t: 19, o: 0, p: 3 },
  { n: 'both-over', h: 7, t: 19, o: 19, p: 3 },
  { n: 'max', h: 9, t: 9, o: 9, p: 3 },
  { n: 'zero-placeholder', h: 3, t: 0, o: 4, p: 3 },
];

const LOCALES = ['en', 'de', 'fi'];

let fails = 0;
const FAIL = (m) => { fails++; console.log('  ✗ FAIL ' + m); };
const OK = (m) => console.log('  ✓ ' + m);

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

const PROBE = () => {
  const app = document.querySelector('.lcs-app');
  const cardR = app && app.getBoundingClientRect();
  const out = { col: { n: 0, worst: 0, sel: '' }, card: { n: 0, worst: 0, sel: '' }, ratios: null, minCtl: Infinity, minCtlSel: '' };

  const over = (r, b) => Math.max(r.right - b.right, b.left - r.left, r.bottom - b.bottom, b.top - r.top);

  document.querySelectorAll('.pvl-block, .pvl-slot').forEach((e) => {
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const col = e.closest('.pvl-col');
    if (col) {
      const d = over(r, col.getBoundingClientRect());
      if (d > 1) { out.col.n++; if (d > out.col.worst) { out.col.worst = +d.toFixed(1); out.col.sel = String(e.className).slice(0, 30); } }
    }
    if (cardR) {
      const d = over(r, cardR);
      if (d > 1) { out.card.n++; if (d > out.card.worst) { out.card.worst = +d.toFixed(1); out.card.sel = String(e.className).slice(0, 30); } }
    }
  });

  /* ⭐ THE TEN-NESS THEOREM, measured off the RENDERED boxes and the
     RENDERED svg — never off the model, and never off the stylesheet.
     A rod must be ten cubes tall; a flat ten rods wide; and the drawn
     subdivisions must agree with the geometry, because a piece that is
     the right SIZE while drawing the wrong number of parts is the same
     lie in the other direction. */
  const one = (s) => document.querySelector(s);
  const c = one('.pvl-cube'), r = one('.pvl-rod'), f = one('.pvl-flat');
  if (c && r && f) {
    const cb = c.getBoundingClientRect(), rb = r.getBoundingClientRect(), fb = f.getBoundingClientRect();
    out.ratios = {
      rodPerCube: +(rb.height / cb.height).toFixed(3),
      flatPerRod: +(fb.width / rb.width).toFixed(3),
      rodSquare: +(rb.width / cb.width).toFixed(3),
      seams: r.querySelectorAll('[data-seam]').length,
      rods: f.querySelectorAll('[data-rod]').length,
    };
  }

  /* control tap floor — the ADD buttons and the dock, not the canvas */
  document.querySelectorAll('.pvl-add, .pvl-chip, .pvl-ctxbtn, .pvl-speak').forEach((e) => {
    const r2 = e.getBoundingClientRect();
    if (!r2.width || !r2.height) return;
    const s = Math.min(r2.width, r2.height);
    if (s < out.minCtl) { out.minCtl = s; out.minCtlSel = String(e.className).slice(0, 30); }
  });

  /* FITS — the lowest CONTROL, so trailing app padding cannot mask a
     cut-off (§A.13.62) */
  let low = 0, lowSel = '';
  document.querySelectorAll('.pvl-add, .pvl-chip, .pvl-ctxbtn, .pvl-big').forEach((e) => {
    const r3 = e.getBoundingClientRect();
    if (r3.bottom > low) { low = r3.bottom; lowSel = String(e.className).slice(0, 30); }
  });
  out.lowest = Math.round(low);
  out.lowestSel = lowSel;
  out.vh = window.innerHeight;
  return out;
};

(async () => {
  const POISON = process.argv.indexOf('--poison') >= 0;
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  console.log(`place-value-lab containment  (tool dir: ${MINI})`);
  let cells = 0, ratioCells = 0;

  for (const lang of LOCALES) {
    for (const w of WIDTHS) {
      await page.setViewport({ width: w, height: TALL[w] });
      await page.goto(`http://127.0.0.1:${PORT}/mini-tools/place-value-lab.html?lang=${lang}`, { waitUntil: 'networkidle0' });
      for (const s of STATES) {
        await page.evaluate((st) => {
          const T = window.PlaceValueLab;
          /* ⚠ premium too: on the pre-rebuild build `_maxPlaces` also
             required it, so without this the hundreds column never
             rendered, `.pvl-flat` was absent, and the ten-ness block
             below skipped in silence — a gate reporting a clean sweep
             of nothing. */
          T.premium = true;
          T.api.settings.hundreds = st.p >= 3;
          T.st.maxPlaces = st.p;
          T.st.h = st.p >= 3 ? st.h : 0; T.st.t = st.t; T.st.o = st.o;
          T.render();
        }, s);
        const m = await page.evaluate(PROBE);
        cells++;
        const tag = `${lang} ${w} ${s.n}`;
        if (m.col.n) FAIL(`${tag}: ${m.col.n} block(s) outside their COLUMN, worst ${m.col.worst}px (${m.col.sel})`);
        if (m.card.n) FAIL(`${tag}: ${m.card.n} block(s) outside the CARD, worst ${m.card.worst}px (${m.card.sel})`);
        /* ⭐ NON-VACUITY FIRST. A state that puts all three pieces on
           the mat MUST produce all three nodes, or the ten-ness block
           below is comparing nothing and reporting success. This is
           exactly how the check passed on the old build the first time
           it ran. */
        if (s.p >= 3 && s.h > 0 && s.t > 0 && s.o > 0) {
          if (!m.ratios) { FAIL(`${tag}: expected a cube, a rod AND a flat on the mat — ten-ness unmeasurable`); }
          else ratioCells++;
        }
        if (m.ratios) {
          const R = m.ratios;
          if (Math.abs(R.rodPerCube - 10) > 0.15) FAIL(`${tag}: a rod is ${R.rodPerCube} cubes tall, must be 10`);
          if (Math.abs(R.flatPerRod - 10) > 0.15) FAIL(`${tag}: a flat is ${R.flatPerRod} rods wide, must be 10`);
          if (Math.abs(R.rodSquare - 1) > 0.05) FAIL(`${tag}: a rod is ${R.rodSquare} cubes wide, must be 1`);
          if (R.seams !== 9) FAIL(`${tag}: a rod draws ${R.seams} seams, must be 9 (ten units)`);
          if (R.rods !== 9) FAIL(`${tag}: a flat draws ${R.rods} rod boundaries, must be 9 (ten rods)`);
        }
        if (m.minCtl !== Infinity && m.minCtl < 44) FAIL(`${tag}: control ${Math.round(m.minCtl)}px < 44 (${m.minCtlSel})`);
        if (w >= 768 && m.lowest > m.vh) FAIL(`${tag}: FITS — lowest control at ${m.lowest} > viewport ${m.vh} (${m.lowestSel})`);
      }
    }
  }

  if (!ratioCells) FAIL('the ten-ness theorem was never measured — no state produced all three pieces');
  if (!fails) OK(`${cells} cells (${ratioCells} with all three pieces): contained in column AND card, ten-ness exact, controls >= 44px, FITS at >= 768`);
  console.log(`${fails ? 'FAIL' : 'PASS'}  containment  (${cells} cells, ${fails} failures)`);

  await browser.close();
  server.close();
  process.exit(fails ? 1 : 0);
})();
