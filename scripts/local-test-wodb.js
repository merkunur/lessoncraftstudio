#!/usr/bin/env node
/* =====================================================================
   local-test-wodb.js — the local Definition-of-Done for Which One
   Doesn't Belong.

   Sections:
     A  viewport sweep 320/360/412/768/1024/1366 — no overflow, the
        NO-SCROLL projector contract at ≥768 (grid + dock above the
        fold), tap targets ≥44px
     B  the ritual — multi-lift (all four, identical styling), un-lift,
        reveal mode per-cell, reveal-all stagger, the closing moment on
        the 4th card, start-again resets
     C  renderers — number/shape/dots/clock/img/word cells render;
        clock hand angles asserted from the transform attribute;
        images load (naturalWidth > 0 against the local library)
     D  free vs premium — free resolves ONLY the weekly featured grid
        (?grid= deep links cannot leak), library visible with locked
        tiles that gate, builder gated; premium: deep links honored,
        builder full flow (number/shape/dots/clock + save) persists
     E  TTS spy — stems cycle 3-distinct, revealed reasons speak on
        tap, NOTHING speaks on load (no autoplay)
     F  no-shame audit — lift ring is teal (never green), no verdict
        glyphs (✓ ✗ ★ 👑) anywhere in the DOM
     G  reduced motion — lift becomes ring-only (no transform)
   Screenshots → docs/audit-results/wodb/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const QA = path.join(REPO, 'docs', 'audit-results', 'wodb', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

const GRIDS = JSON.parse(fs.readFileSync(path.join(MINI, 'wodb-grids.json'), 'utf8'));
function isoWeek(now) {
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const first = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  return 1 + Math.round(((d - first) / 86400000 - 3 + ((first.getUTCDay() + 6) % 7)) / 7);
}
const FEATURED_ID = GRIDS.featuredOrder[isoWeek(new Date()) % GRIDS.featuredOrder.length];

let pass = 0, fail = 0;
const bad = [];
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; bad.push(name); console.log('  ✗ FAIL ' + name + (extra ? ' — ' + extra : '')); }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/image-library-webp/')) file = path.join(IMGLIB, p.slice('/image-library-webp/'.length));
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/wodb.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  async function newPage(opts) {
    opts = opts || {};
    const page = await browser.newPage();
    await page.setViewport({ width: opts.w || 1024, height: opts.h || 768 });
    await page.evaluateOnNewDocument((premium) => {
      try { localStorage.clear(); } catch (_) {}
      if (premium) {
        try {
          localStorage.setItem('accessToken', 'harness-token');
          localStorage.setItem('lcs:wodb:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, savedGrids: [], settings: null }));
        } catch (_) {}
      }
    }, !!opts.premium);
    if (opts.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    page._errs = [];
    const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', (e) => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }
  async function spyTTS(page) {
    await page.evaluate(() => {
      window.__spoken = [];
      if (window.LCSAudio) LCSAudio.speak = function (o) { window.__spoken.push(o.text); };
    });
  }
  async function ready(page) {
    await page.waitForSelector('.wdb-cell', { timeout: 8000 });
  }

  /* ============================ A: viewports ============================ */
  console.log('A. viewport sweep');
  for (const [w, h] of [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]]) {
    const page = await newPage({ w, h });
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    const m = await page.evaluate(() => {
      const doc = document.scrollingElement || document.documentElement;
      /* a pointer-events:none / opacity-0 button (the hidden ear) is not a
         tap target — its LIFTED size is asserted separately in section B */
      const btns = [...document.querySelectorAll('button')].filter((b) => {
        if (b.offsetParent === null) return false;
        const cs = getComputedStyle(b);
        return cs.pointerEvents !== 'none' && parseFloat(cs.opacity) > 0.05;
      });
      const small = btns.filter((b) => { const r = b.getBoundingClientRect(); return (r.height < 44 || r.width < 44) && r.height > 0; })
        .map((b) => (b.textContent || b.className).trim().slice(0, 22));
      const dock = document.querySelector('.wdb-dock').getBoundingClientRect();
      return {
        hOverflow: doc.scrollWidth > window.innerWidth + 1,
        cells: document.querySelectorAll('.wdb-cell').length,
        small,
        dockBottom: dock.bottom,
        canScroll: getComputedStyle(document.body).overflowY
      };
    });
    ok(`${w}×${h} no horizontal overflow`, !m.hOverflow);
    ok(`${w}×${h} 4 cells render`, m.cells === 4);
    ok(`${w}×${h} tap targets ≥44px`, m.small.length === 0, m.small.join(', '));
    if (w >= 768) ok(`${w}×${h} NO-SCROLL contract (dock above fold)`, m.dockBottom <= h + 1, `dockBottom=${Math.round(m.dockBottom)}`);
    else ok(`${w}×${h} dock reachable (scroll opt-in)`, m.dockBottom <= h + 1 || m.canScroll === 'auto');
    if (w === 360 || w === 768 || w === 1024) await page.screenshot({ path: path.join(QA, `featured-${w}.png`) });
    ok(`${w}×${h} clean console`, page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ B: the ritual ============================ */
  console.log('B. the ritual');
  {
    const page = await newPage({});
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    await spyTTS(page);
    const cellSel = (i) => `.wdb-grid .wdb-cell:nth-child(${i + 1})`;

    /* single lift first — the canonical "one child chose" frame */
    await page.click(cellSel(1));
    await sleep(450);
    ok('single lift: exactly one ring', await page.evaluate(() => document.querySelectorAll('.wdb-cell[aria-pressed="true"]').length === 1));
    await page.screenshot({ path: path.join(QA, 'lifted-single-1024.png') });
    await page.click(cellSel(1));
    await sleep(250);

    /* multi-lift: all four, identical ring (compare AFTER the 180ms
       transitions settle — mid-transition shadows differ per click time) */
    for (let i = 0; i < 4; i++) await page.click(cellSel(i));
    await sleep(450);
    const lifted = await page.evaluate(() => [...document.querySelectorAll('.wdb-cell')].map((c) => c.getAttribute('aria-pressed')));
    ok('multi-lift: all four lift', lifted.every((v) => v === 'true'));
    const rings = await page.evaluate(() => new Set([...document.querySelectorAll('.wdb-cell[aria-pressed="true"]')].map((c) => getComputedStyle(c).boxShadow)).size);
    ok('lifted styling identical on all four (equal claims)', rings === 1);
    const earSize = await page.evaluate(() => {
      const r = document.querySelector('.wdb-cell[aria-pressed="true"] .wdb-ear').getBoundingClientRect();
      return Math.min(r.width, r.height);
    });
    ok('lifted ear is a real ≥44px tap target', earSize >= 43.5, `${earSize}px`);
    await page.screenshot({ path: path.join(QA, 'lifted-1024.png') });

    /* un-lift */
    await page.click(cellSel(0));
    ok('un-lift works', await page.evaluate(() => document.querySelector('.wdb-grid .wdb-cell').getAttribute('aria-pressed') === 'false'));

    /* reveal mode: per-cell, teacher-paced */
    await page.evaluate(() => { [...document.querySelectorAll('.wdb-chip')].find((c) => !c.classList.contains('teal') && !c.classList.contains('locked')).click(); });
    await sleep(150);
    ok('reveal mode arms', await page.evaluate(() => !!document.querySelector('.wdb-grid.reveal-armed')));
    await page.click(cellSel(0));
    await sleep(400);
    const one = await page.evaluate(() => ({
      revealed: document.querySelectorAll('.wdb-cell.revealed').length,
      band: getComputedStyle(document.querySelector('.wdb-cell.revealed .wdb-reason')).transform
    }));
    ok('per-cell reveal: exactly one band up', one.revealed === 1 && one.band !== 'none');
    for (let i = 1; i < 4; i++) { await page.click(`.wdb-grid .wdb-cell:nth-child(${i + 1})`); await sleep(120); }
    await sleep(400);
    const done = await page.evaluate(() => ({
      revealed: document.querySelectorAll('.wdb-cell.revealed').length,
      closing: !!document.querySelector('.wdb-closing'),
      glow: !!document.querySelector('.wdb-grid.all-revealed')
    }));
    ok('4th card → closing moment + shared glow', done.revealed === 4 && done.closing && done.glow);
    await page.screenshot({ path: path.join(QA, 'revealed-1024.png') });

    /* start again resets everything */
    await page.evaluate(() => { [...document.querySelectorAll('.wdb-chip')].find((c) => c.textContent.includes('Start again')).click(); });
    await sleep(150);
    const reset = await page.evaluate(() => ({
      revealed: document.querySelectorAll('.wdb-cell.revealed').length,
      lifted: document.querySelectorAll('.wdb-cell[aria-pressed="true"]').length,
      closing: !!document.querySelector('.wdb-closing')
    }));
    ok('start again resets ritual', reset.revealed === 0 && reset.lifted === 0 && !reset.closing);

    /* reveal-all path */
    await page.evaluate(() => { [...document.querySelectorAll('.wdb-chip')].find((c) => c.textContent.includes('Show the reasons')).click(); });
    await sleep(120);
    await page.evaluate(() => { document.querySelector('.wdb-linkbtn').click(); });
    await sleep(500);
    ok('reveal-all reveals four + closing', await page.evaluate(() =>
      document.querySelectorAll('.wdb-cell.revealed').length === 4 && !!document.querySelector('.wdb-closing')));
    ok('B clean console', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ C: renderers ============================ */
  console.log('C. renderers (premium deep links)');
  {
    const checks = [
      ['wodb-clock-23-four', async (page) => {
        const m = await page.evaluate(() => {
          const gs = [...document.querySelectorAll('.wdb-clock')];
          const rots = gs.map((svg) => [...svg.querySelectorAll('g')].map((g) => g.getAttribute('transform')));
          return { n: gs.length, rots };
        });
        ok('clock grid: 4 clocks', m.n === 4);
        /* 4:15 → hour 127.5°, minute 90° */
        ok('clock 4:15 hand angles exact', JSON.stringify(m.rots[1]).includes('127.5') && JSON.stringify(m.rots[1]).includes('rotate(90.0'));
      }],
      ['wodb-shape-23-triangles', async (page) => {
        const m = await page.evaluate(() => ({
          shapes: document.querySelectorAll('.wdb-shape').length,
          outline: [...document.querySelectorAll('.wdb-shape path, .wdb-shape circle')].some((p) => p.getAttribute('fill') === 'none')
        }));
        ok('shape grid: 4 shapes incl. outline', m.shapes === 4 && m.outline);
      }],
      ['wodb-dots-1-twelve', async (page) => {
        const m = await page.evaluate(() => ({
          svgs: document.querySelectorAll('.wdb-dots').length,
          frame: !!document.querySelector('.wdb-dots.frame'),
          row: !!document.querySelector('.wdb-dots.row')
        }));
        ok('dots grid: 4 arrangements incl. row + tenframe', m.svgs === 4 && m.frame && m.row);
      }],
      ['wodb-pic-k-flyers', async (page) => {
        await sleep(600);
        const m = await page.evaluate(() => {
          const imgs = [...document.querySelectorAll('.wdb-img')];
          return { n: imgs.length, loaded: imgs.filter((i) => i.naturalWidth > 0).length };
        });
        ok('picture grid: 4 images load from the library', m.n === 4 && m.loaded === 4, `${m.loaded}/4 loaded`);
      }],
      ['wodb-mix-23-six', async (page) => {
        const m = await page.evaluate(() => ({
          num: !!document.querySelector('.wdb-num'),
          word: (document.querySelector('.wdb-wordcell') || {}).textContent,
          clock: !!document.querySelector('.wdb-clock'),
          dots: !!document.querySelector('.wdb-dots')
        }));
        ok('mixed grid: num+word+clock+dots', m.num && m.word === 'six' && m.clock && m.dots);
      }]
    ];
    for (const [id, fn] of checks) {
      const page = await newPage({ premium: true });
      await page.goto(BASE + '?grid=' + id, { waitUntil: 'networkidle0' });
      await ready(page);
      await page.waitForFunction((want) => {
        const nm = document.querySelector('.wdb-namechip');
        return nm && nm.textContent.length > 0;
      }, { timeout: 8000 }, id).catch(() => {});
      await fn(page);
      await page.close();
    }
  }

  /* ============================ D: free vs premium ============================ */
  console.log('D. free vs premium');
  {
    /* FREE: a ?grid= deep link CANNOT leak — resolves to the featured grid */
    const nonFeatured = GRIDS.grids.map((g) => g.id).find((id) => id !== FEATURED_ID);
    const page = await newPage({});
    await page.goto(BASE + '?grid=' + nonFeatured, { waitUntil: 'networkidle0' });
    await ready(page);
    const feat = GRIDS.grids.find((g) => g.id === FEATURED_ID);
    const m = await page.evaluate(() => ({
      name: (document.querySelector('.wdb-namechip') || {}).textContent,
      firstNum: (document.querySelector('.wdb-num') || {}).textContent || null,
      imgs: document.querySelectorAll('.wdb-img').length,
      clocks: document.querySelectorAll('.wdb-clock').length,
      dots: document.querySelectorAll('.wdb-dots').length,
      shapes: document.querySelectorAll('.wdb-shape').length
    }));
    const t = feat.cells[0].t;
    const featMatches = (t === 'num' && m.firstNum === String(feat.cells[0].v)) ||
      (t === 'img' && m.imgs > 0) || (t === 'clock' && m.clocks > 0) ||
      (t === 'dots' && m.dots > 0) || (t === 'shape' && m.shapes > 0);
    ok('free: ?grid= suppressed → weekly featured renders', m.name.length > 0 && featMatches, `featured=${FEATURED_ID} cells[0].t=${t}`);

    /* library visible to free; non-featured tiles locked; locked tap gates */
    await page.evaluate(() => { [...document.querySelectorAll('.wdb-chip')].find((c) => c.textContent.includes('Grid library')).click(); });
    await page.waitForSelector('.wdb-panel.open', { timeout: 5000 });
    const lib = await page.evaluate(() => ({
      tiles: document.querySelectorAll('.wdb-tile').length,
      locked: document.querySelectorAll('.wdb-tile.locked').length
    }));
    ok('free: full library visible, 20 of 21 soft-locked', lib.tiles === 21 && lib.locked === 20, `tiles=${lib.tiles} locked=${lib.locked}`);
    await page.screenshot({ path: path.join(QA, 'library-free-1024.png') });
    await page.evaluate(() => { document.querySelector('.wdb-tile.locked').click(); });
    await sleep(250);
    ok('free: locked tile → inline gate (never a modal)', await page.evaluate(() =>
      !!document.querySelector('.wdb-gate') && !!document.querySelector('.wdb-gate a[href*="/pricing?from=tool-wodb"]')));
    /* builder gated */
    await page.evaluate(() => { [...document.querySelectorAll('.wdb-chip')].find((c) => c.textContent.includes('Build')).click(); });
    await sleep(250);
    ok('free: builder gated', await page.evaluate(() => !document.querySelector('.wdb-cell.empty')));
    await page.close();

    /* PREMIUM: builder full flow */
    const p2 = await newPage({ premium: true });
    await p2.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(p2);
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-chip')].find((c) => c.textContent.includes('Build')).click(); });
    await p2.waitForSelector('.wdb-cell.empty', { timeout: 5000 });
    ok('premium: builder opens with 4 empty wells', await p2.evaluate(() => document.querySelectorAll('.wdb-cell.empty').length === 4));

    /* well 0: number */
    await p2.evaluate(() => { document.querySelectorAll('.wdb-grid .wdb-cell')[0].click(); });
    await p2.waitForSelector('.wdb-picker', { timeout: 5000 });
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-tab')].find((t) => t.textContent === 'Number').click(); });
    await p2.waitForSelector('.wdb-biginput');
    await p2.type('.wdb-biginput', '7');
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-picker .wdb-big')].pop().click(); });
    await sleep(200);
    ok('builder: number cell placed', await p2.evaluate(() => (document.querySelector('.wdb-num') || {}).textContent === '7'));

    /* well 1: shape */
    await p2.evaluate(() => { document.querySelectorAll('.wdb-grid .wdb-cell')[1].click(); });
    await p2.waitForSelector('.wdb-picker');
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-tab')].find((t) => t.textContent === 'Shape').click(); });
    await sleep(120);
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-picker .wdb-big')].pop().click(); });
    await sleep(200);
    /* well 2: dots */
    await p2.evaluate(() => { document.querySelectorAll('.wdb-grid .wdb-cell')[2].click(); });
    await p2.waitForSelector('.wdb-picker');
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-tab')].find((t) => t.textContent === 'Dots').click(); });
    await sleep(120);
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-picker .wdb-big')].pop().click(); });
    await sleep(200);
    /* well 3: clock */
    await p2.evaluate(() => { document.querySelectorAll('.wdb-grid .wdb-cell')[3].click(); });
    await p2.waitForSelector('.wdb-picker');
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-tab')].find((t) => t.textContent === 'Clock').click(); });
    await sleep(120);
    await p2.screenshot({ path: path.join(QA, 'picker-768.png') });
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-picker .wdb-big')].pop().click(); });
    await sleep(200);
    ok('builder: all four wells filled', await p2.evaluate(() => document.querySelectorAll('.wdb-cell.empty').length === 0));
    await p2.screenshot({ path: path.join(QA, 'builder-1024.png') });

    await p2.type('.wdb-nameinput', 'Harness grid');
    await p2.evaluate(() => { [...document.querySelectorAll('.wdb-big')].find((b) => !b.closest('.wdb-picker')).click(); });
    await sleep(300);
    const saved = await p2.evaluate(() => {
      const st = JSON.parse(localStorage.getItem('lcs:wodb:v1'));
      return { n: (st.savedGrids || []).length, title: st.savedGrids[0] && st.savedGrids[0].title, playing: document.querySelectorAll('.wdb-cell').length };
    });
    ok('builder: saved grid persists in store + plays', saved.n === 1 && saved.title === 'Harness grid' && saved.playing === 4);
    /* saved grid without reasons → no Show-reasons chip */
    ok('custom grid without reasons hides Show-reasons', await p2.evaluate(() =>
      ![...document.querySelectorAll('.wdb-chip')].some((c) => c.textContent.includes('Show the reasons'))));
    ok('D clean console', p2._errs.length === 0, p2._errs[0]);
    await p2.close();
  }

  /* ============================ E: TTS ============================ */
  console.log('E. TTS (stems + reasons; no autoplay)');
  {
    const page = await newPage({});
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    await spyTTS(page);
    ok('no autoplay on load', await page.evaluate(() => window.__spoken.length === 0));
    await page.click('.wdb-grid .wdb-cell');
    await sleep(120);
    for (let i = 0; i < 3; i++) { await page.evaluate(() => { document.querySelector('.wdb-cell[aria-pressed="true"] .wdb-ear').click(); }); await sleep(80); }
    const stems = await page.evaluate(() => window.__spoken.slice());
    ok('ear cycles 3 distinct stems', new Set(stems).size === 3, stems.join(' | '));
    const stembar = await page.evaluate(() => (document.querySelector('.wdb-stembar') || {}).textContent);
    ok('stem shown as text too', !!stembar && stems.includes(stembar));
    /* revealed reason speaks on tap */
    await page.evaluate(() => { [...document.querySelectorAll('.wdb-chip')].find((c) => c.textContent.includes('Show the reasons')).click(); });
    await sleep(120);
    await page.click('.wdb-grid .wdb-cell');
    await sleep(300);
    await page.click('.wdb-grid .wdb-cell');   /* second tap on revealed card → speaks */
    await sleep(120);
    const last = await page.evaluate(() => window.__spoken[window.__spoken.length - 1]);
    ok('revealed card speaks its reason on tap', !!last && !stems.includes(last));
    ok('E clean console', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ F: no-shame audit ============================ */
  console.log('F. no-shame audit');
  {
    const page = await newPage({});
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    await page.click('.wdb-grid .wdb-cell');
    await sleep(250);
    const m = await page.evaluate(() => {
      const ring = getComputedStyle(document.querySelector('.wdb-cell[aria-pressed="true"]')).boxShadow;
      const body = document.body.innerText;
      return {
        tealRing: ring.includes('rgb(20, 107, 94)'),
        green: /rgb\(4[0-9], 1[6-9][0-9], 7[0-9]\)|#2E7D32|#4CAF50/i.test(ring),
        glyphs: /[✓✔✗✘★👑🏆]/.test(body)
      };
    });
    ok('lift ring is teal (structure), never green', m.tealRing && !m.green);
    ok('no verdict glyphs in the DOM', !m.glyphs);
    await page.close();
  }

  /* ============================ G: reduced motion ============================ */
  console.log('G. reduced motion');
  {
    const page = await newPage({ reduced: true });
    await page.goto(BASE, { waitUntil: 'networkidle0' });
    await ready(page);
    await page.click('.wdb-grid .wdb-cell');
    await sleep(250);
    const m = await page.evaluate(() => {
      const c = document.querySelector('.wdb-cell[aria-pressed="true"]');
      return { tf: getComputedStyle(c).transform, ring: getComputedStyle(c).boxShadow.includes('rgb(20, 107, 94)') };
    });
    ok('reduced motion: no lift transform, ring only', (m.tf === 'none' || m.tf === 'matrix(1, 0, 0, 1, 0, 0)') && m.ring, m.tf);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nRESULT: ${fail ? 'FAIL' : 'PASS'}  (${pass} passed, ${fail} failed)`);
  if (fail) bad.forEach((b) => console.log('  - ' + b));
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
