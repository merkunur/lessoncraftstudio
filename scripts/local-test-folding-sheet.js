#!/usr/bin/env node
/* =====================================================================
   local-test-folding-sheet.js — the local Definition-of-Done for #35.
   Every claim measured in a real browser against the rendered DOM.

   visual-qa-activity.js resolves only ids declared in a *-activities.json
   manifest, so it cannot see a free-play tool. SECTION L10 is the
   substitute (the §A.13.62 sweep).

     L1  mounts: a square sheet of N*N cells, a crease, gap handles
     L2  ⭐ THE FOLD IS GEOMETRICALLY TRUE ON SCREEN. The model can be
         perfect while a transform-origin off by half a cell makes the
         tool a lie, and THIS is the thing Node cannot prove: the
         reflected flap cell must land on its partner to <=1px, for all
         four creases, at several viewports.
     L3  two layers vs one layer is measurably different — and NEITHER
         is red or green
     L4  the twin lights exactly the model's partner (DOM agrees model)
     L5  open restores the sheet character-identically
     L6  moving the crease leaves every painted cell untouched
     L7  ghosts render exactly the predicted set and commit on tap
     L8  an off-centre crease hangs off the edge and says so
     L10 the sweep 320-1366 — controls >=44px, paint cells >=34px (two
         categories, measured separately), zero console errors

   Usage: node scripts/local-test-folding-sheet.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'folding-sheet', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44, MIN_CELL = 34;
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* the same model the browser is running, loaded in Node so the DOM can be
   checked AGAINST it rather than against a second guess */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {}, append() {} }),
    head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'folding-sheet.js'), 'utf8') + '\n;this.__T = FoldingSheet;', sandbox);
const T = sandbox.__T;

function serve() {
  return http.createServer((req, res) => {
    const f = path.join(MINI, path.basename(req.url.split('?')[0]));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('404'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

const PORT = 5501;

async function newPage(browser, o) {
  o = o || {};
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => r.url().includes('/api/auth/me')
    ? r.respond({ status: 200, contentType: 'application/json',
        body: JSON.stringify(o.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null }) })
    : r.continue());
  await page.evaluateOnNewDocument((premium) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
    window.print = function () { window.__printed = (window.__printed || 0) + 1; };
  }, !!o.premium);
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const clickChip = (p, text) => p.evaluate((t) => {
  const b = Array.from(document.querySelectorAll('.fsh-chip')).find((x) => x.textContent === t);
  if (!b) return false; b.click(); return true;
}, text);
const clickGlyph = (p, g) => p.evaluate((t) => {
  const b = Array.from(document.querySelectorAll('.fsh-glyph')).find((x) => x.textContent === t);
  if (!b) return false; b.click(); return true;
}, g);
const paint = (p, idxs) => p.evaluate((list) => {
  list.forEach((i) => { const c = document.querySelector('.fsh-cell[data-i="' + i + '"]'); if (c) c.click(); });
}, idxs);

/* ⚠ READ THE CREASE OFF THE PAGE, NEVER ASSUME IT. The first draft of
   this file hard-coded the crease it expected and reported 345px of
   drift at desktop — the tool had moved the crease (a real bug, since
   fixed) and the harness was measuring against a state that no longer
   existed. A harness that guesses at state cannot tell you which of the
   two of you is wrong. */
const readCrease = (p) => p.evaluate(() => {
  const g = Array.from(document.querySelectorAll('.fsh-glyph')).find((b) => b.getAttribute('aria-pressed') === 'true');
  const kind = { '│': 'v', '─': 'h', '╲': 'd', '╱': 'a' }[g ? g.textContent : '│'];
  const gaps = Array.from(document.querySelectorAll('.fsh-gap'));
  const k = Math.max(0, gaps.findIndex((b) => b.getAttribute('aria-pressed') === 'true'));
  return { kind: kind, k: (kind === 'd' || kind === 'a') ? 0 : k };
});
const modelOf = (crease, paintArr) => ({
  n: T.N, paint: paintArr || new Array(T.N * T.N).fill(null),
  crease: { kind: crease.kind, k: crease.k }, folded: false, ghosts: false
});

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, r));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const open = async (o) => {
    const p = await newPage(browser, o);
    await p.setViewport({ width: 1024, height: 900 });
    await p.goto(`http://127.0.0.1:${PORT}/folding-sheet.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.fsh-sheet', { timeout: 9000 });
    await wait(600);
    return p;
  };

  /* ---------------- L1 the apparatus ---------------- */
  console.log('[L1 the apparatus]');
  const p1 = await open({ premium: true });
  const m1 = await p1.evaluate(() => ({
    cells: document.querySelectorAll('.fsh-cell').length,
    gaps: document.querySelectorAll('.fsh-gap').length,
    glyphs: document.querySelectorAll('.fsh-glyph').length,
    crease: !!document.querySelector('.fsh-crease'),
    swatches: document.querySelectorAll('.fsh-swatch').length,
    sq: (() => { const r = document.querySelector('.fsh-sheet').getBoundingClientRect(); return Math.abs(r.width - r.height); })()
  }));
  const N = T.N;
  is(m1.cells === N * N, `the sheet is ${N}x${N} (${m1.cells} cells)`);
  is(m1.gaps === N - 1, `${m1.gaps} gap handles — one per crease position`);
  is(m1.glyphs === 4, 'four crease directions');
  is(m1.crease, 'the crease is on the sheet');
  is(m1.swatches === T.COLOURS.length, `${m1.swatches} paint colours`);
  is(m1.sq <= 1, `the sheet is square (|w-h| = ${m1.sq.toFixed(2)}px)`);

  /* ---------------- L2 ⭐ the fold is true on screen ---------------- */
  console.log('[L2 ⭐ the fold lands where the map says]');
  for (const [w, h] of [[360, 740], [768, 1000], [1024, 900]]) {
    await p1.setViewport({ width: w, height: h });
    await wait(250);
    for (const g of ['│', '─', '╲', '╱']) {
      await clickGlyph(p1, g);
      await wait(250);
      const crease = await readCrease(p1);
      await clickChip(p1, 'Fold it');
      await wait(650);
      const worst = await p1.evaluate(() => {
        /* the flap holds a reflected copy of every cell; a FAR cell in the
           flap must land exactly on its partner in the sheet underneath */
        const flap = document.querySelector('.fsh-flap');
        if (!flap) return { err: 'no flap' };
        const sheetCells = Array.from(document.querySelectorAll('.fsh-sheet > .fsh-cell'));
        const flapCells = Array.from(flap.querySelectorAll('.fsh-cell'));
        return { sheet: sheetCells.map((c) => { const r = c.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }),
                 flap: flapCells.map((c) => { const r = c.getBoundingClientRect(); return [r.left, r.top]; }) };
      });
      if (worst.err) { bad(`L2 ${g} at ${w}px: ${worst.err}`); continue; }
      /* compare against the MODEL's partner for the crease the page is
         ACTUALLY showing, read back from the rendered controls */
      const st = modelOf(crease);
      let maxd = 0, counted = 0;
      for (let i = 0; i < N * N; i++) {
        if (T.isNear(st, i)) continue;                     /* only the flap's far cells land */
        const m = T.mirrorIdx(st, i);
        if (m < 0) continue;                               /* hangs off the edge */
        const f = worst.flap[i], s = worst.sheet[m];
        const d = Math.max(Math.abs(f[0] - s[0]), Math.abs(f[1] - s[1]));
        if (d > maxd) maxd = d;
        counted++;
      }
      is(maxd <= 1.0 && counted > 0,
        `⭐ ${g}(${crease.kind}${crease.k}) at ${w}px: all ${counted} folded cells land on their partner, worst ${maxd.toFixed(2)}px`);
      await clickChip(p1, 'Open it out');
      await wait(400);
    }
  }
  await p1.setViewport({ width: 1024, height: 900 });
  await wait(200);

  /* ---------------- L3 layers, and no verdict colour ---------------- */
  console.log('[L3 two layers, one layer]');
  await clickGlyph(p1, '│');
  await wait(200);
  const vst = modelOf(await readCrease(p1));
  const pairIdx = 2 * N + 1;                    /* row 2, col 1 */
  const partner = T.mirrorIdx(vst, pairIdx);
  const loneIdx = 3 * N + 2;
  await paint(p1, [pairIdx, partner, loneIdx]);
  await wait(300);
  await clickChip(p1, 'Fold it');
  await wait(650);
  const look = await p1.evaluate((a, b) => {
    const g = (i) => {
      const c = document.querySelector('.fsh-sheet > .fsh-cell[data-i="' + i + '"]');
      const s = getComputedStyle(c);
      return { cls: c.className, op: parseFloat(s.opacity), shadow: s.boxShadow, bg: s.backgroundColor };
    };
    return { two: g(a), one: g(b) };
  }, pairIdx, loneIdx);
  is(/fsh-l-two/.test(look.two.cls), 'paint meeting paint reads as two layers');
  is(/fsh-l-one/.test(look.one.cls), 'paint meeting bare paper reads as one layer');
  is(look.one.op < look.two.op - 0.2, `and they are measurably different (${look.one.op} vs ${look.two.op})`);
  const rgb = (s) => (s.match(/\d+/g) || []).map(Number);
  const verdictish = (s) => { const [r, g2, b] = rgb(s); return (r > 150 && g2 < 90 && b < 90) || (g2 > 150 && r < 110 && b < 110); };
  is(!verdictish(look.one.bg) && !verdictish(look.two.bg), 'and neither is a red or a green');
  await clickChip(p1, 'Open it out');
  await wait(350);

  /* ---------------- L4 the twin agrees with the model ---------------- */
  console.log('[L4 the twin]');
  await clickChip(p1, 'Fold it');
  await wait(500);
  await p1.evaluate((i) => { document.querySelector('.fsh-sheet > .fsh-cell[data-i="' + i + '"]').click(); }, pairIdx);
  await wait(300);
  const twins = await p1.evaluate(() => Array.from(document.querySelectorAll('.fsh-twin'))
    .map((c) => Number(c.getAttribute('data-i'))).sort((a, b) => a - b));
  const wantTwins = [pairIdx, partner].sort((a, b) => a - b);
  is(twins.join() === wantTwins.join(), `pressing a cell lights exactly its partner (${twins.join(' + ')} = model ${wantTwins.join(' + ')})`);
  await clickChip(p1, 'Open it out');
  await wait(350);

  /* ---------------- L5 open is lossless in the DOM ---------------- */
  console.log('[L5 open it out]');
  const snap = () => p1.evaluate(() => Array.from(document.querySelectorAll('.fsh-sheet > .fsh-cell'))
    .map((c) => c.style.backgroundColor || '-').join('|'));
  const before5 = await snap();
  for (let f = 0; f < 4; f++) { await clickChip(p1, 'Fold it'); await wait(420); await clickChip(p1, 'Open it out'); await wait(360); }
  is(await snap() === before5, 'four fold/open cycles leave the sheet character-identical');

  /* ---------------- L6 moving the crease costs nothing ---------------- */
  console.log('[L6 the crease is a claim]');
  const before6 = await snap();
  await p1.evaluate(() => { const g = document.querySelectorAll('.fsh-gap'); g[1].click(); });
  await wait(350);
  is(await snap() === before6, 'moving the crease leaves every painted cell untouched');
  await p1.evaluate(() => { const g = document.querySelectorAll('.fsh-gap'); g[3].click(); });
  await wait(300);

  /* ---------------- L7 ghosts ---------------- */
  console.log('[L7 show me the mirror]');
  await clickChip(p1, 'Show me the mirror');
  await wait(400);
  const gInfo = await p1.evaluate(() => Array.from(document.querySelectorAll('.fsh-ghost'))
    .map((c) => Number(c.getAttribute('data-i'))).sort((a, b) => a - b));
  const domPaint = await p1.evaluate(() => Array.from(document.querySelectorAll('.fsh-sheet > .fsh-cell'))
    .map((c) => c.style.backgroundColor ? 1 : null));
  const modelSt = modelOf(await readCrease(p1), domPaint.map((v) => (v ? 0 : null)));
  const wantG = T.ghostsOf(modelSt).sort((a, b) => a - b);
  is(gInfo.join() === wantG.join(), `the ghosts are exactly the missing partners (${gInfo.length} of them)`);
  is(gInfo.length > 0, 'and there is at least one to tap');
  const paintedBefore = await p1.evaluate(() => document.querySelectorAll('.fsh-sheet > .fsh-cell[style*="background"]').length);
  await p1.evaluate((i) => { document.querySelector('.fsh-sheet > .fsh-cell[data-i="' + i + '"]').click(); }, gInfo[0]);
  await wait(350);
  const paintedAfter = await p1.evaluate(() => document.querySelectorAll('.fsh-sheet > .fsh-cell[style*="background"]').length);
  is(paintedAfter === paintedBefore + 1, `tapping a ghost makes it real (${paintedBefore} -> ${paintedAfter})`);

  /* ---------------- L8 the overhang ---------------- */
  console.log('[L8 it hangs off the edge]');
  await clickChip(p1, 'Start again');
  await wait(300);
  await p1.evaluate(() => { document.querySelectorAll('.fsh-gap')[0].click(); });   /* far off-centre */
  await wait(300);
  await paint(p1, [N * 4 + 6, N * 4 + 7]);
  await wait(250);
  await clickChip(p1, 'Fold it');
  await wait(550);
  const oh = await p1.evaluate(() => {
    const h = document.querySelector('.fsh-hint');
    return h ? h.textContent.trim() : null;
  });
  is(oh && /hangs off/.test(oh), `an off-centre crease says so: "${oh}"`);
  is(p1._errs.length === 0, `zero console errors${p1._errs.length ? ' — ' + p1._errs[0] : ''}`);
  await p1.close();

  /* ---------------- L10 the sweep ---------------- */
  console.log('[L10 the sweep]');
  for (const [w, h] of VIEWPORTS) {
    const p = await newPage(browser, { premium: true });
    await p.setViewport({ width: w, height: h });
    await p.goto(`http://127.0.0.1:${PORT}/folding-sheet.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.fsh-sheet', { timeout: 9000 });
    await wait(500);
    const geo = await p.evaluate(() => {
      const ctrls = Array.from(document.querySelectorAll('.fsh-chip,.fsh-swatch,.fsh-gap'));
      const cells = Array.from(document.querySelectorAll('.fsh-cell'));
      const smallest = (els) => els.reduce((m, e) => {
        const r = e.getBoundingClientRect();
        const s = Math.min(r.width, r.height);
        return (s > 0 && s < m) ? s : m;
      }, 9999);
      const app = document.querySelector('.lcs-app') || document.body;
      const low = Array.from(document.querySelectorAll('.fsh-foot .fsh-chip'))
        .reduce((m, e) => Math.max(m, e.getBoundingClientRect().bottom), 0);
      return { ctrl: smallest(ctrls), cell: smallest(cells), low: low, vh: window.innerHeight,
        overflow: app.scrollWidth - app.clientWidth,
        /* ⚠ EVERY text-bearing node, not a hand-picked selector list.
           The first version measured three classes and missed the legend
           entirely at 13px — the 11-locale audit caught what this file
           was structurally unable to see. A list of selectors is a list
           somebody has to remember to extend. */
        text: Math.min.apply(null, Array.from(document.querySelectorAll('.fsh-wrap *'))
          .filter((e) => Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim()))
          .map((e) => parseFloat(getComputedStyle(e).fontSize)).concat([99])) };
    });
    /* ⚠ TWO CATEGORIES, MEASURED SEPARATELY. A control holds 44; a paint
       cell is canvas and holds 34 (calendar-wall precedent). Collapsing
       them into one number is how a real defect gets waved through. */
    is(geo.ctrl >= MIN_TAP - 0.5, `${w}px: every control >= ${MIN_TAP}px (${geo.ctrl.toFixed(1)})`);
    is(geo.cell >= MIN_CELL - 0.5, `${w}px: every paint cell >= ${MIN_CELL}px (${geo.cell.toFixed(1)})`);
    is(geo.overflow <= 1, `${w}px: no horizontal overflow (${geo.overflow}px)`);
    is(geo.text >= 14, `${w}px: text >= 14px (${geo.text})`);
    if (w >= 768) is(geo.low <= geo.vh + 1, `${w}px: FITS at desktop (lowest control ${Math.round(geo.low)} <= ${geo.vh})`);
    is(p._errs.length === 0, `${w}px: zero console errors${p._errs.length ? ' — ' + p._errs[0] : ''}`);
    if (SHOT && [360, 768, 1024].indexOf(w) > -1) {
      await p.screenshot({ path: path.join(SHOT_DIR, `sheet-${w}.png`), fullPage: true });
      /* and a folded render, which is the state worth looking at */
      await clickChip(p, 'Fold it');
      await wait(700);
      await p.screenshot({ path: path.join(SHOT_DIR, `folded-${w}.png`), fullPage: true });
    }
    await p.close();
  }

  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
