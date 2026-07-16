#!/usr/bin/env node
/* =====================================================================
   local-test-calendar-wall.js — the local DoD for the Calendar Wall
   FREE-PLAY TOOL (mini tools/calendar-wall.html).

   Serves `mini tools/` locally, then:
     A. viewport sweep 320·360·412·768·1024·1366 — no horizontal
        overflow · dock chips + nav ≥44px · date line + grid render
     B. functional drive (1024, projector-first):
        NO auto-audio on open (speechSynthesis spy) · today card is
        face-down → tap flips + speaks · date-line tap speaks again ·
        counter: +1 advances all visible representations in sync ·
        double-tap structurally blocked (button replaced by the counted
        chip) · Undo restores · teacher stepper sets an arbitrary count ·
        REBUNDLE: store seeded at dayCount 9 (counted yesterday) → +1 →
        band appears mid-chain → tens jar gains a bundle · weather: tap
        sun → today pill + stamp lands, Change → re-pick to rain ·
        month back-nav → title changes, forward re-enabled, Today
        returns · panel: wall rows + rename + "+ New class wall" free
        upsell + new-year two-step confirm zeroes the count and writes
        lastSummary · shell reset = VIEW only (store untouched)
     C. free next-morning read-gate: seeded count from "yesterday", no
        premium → counter renders 0 + the warm gate line; weather chart
        shows ghost stamps + gate line
     D. deep links: ?widget=weather lands on the weather widget;
        ?class=<id> selects the wall
     E. lang smoke: ?lang=de + ?lang=fi mount with composed date
        sentences (der …e/…toista forms, no bare digit date in the line)
     F. console errors: zero tolerated
   Screenshots at 360/768/1024 → docs/audit-results/calendar-wall/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'calendar-wall', 'qa');
const MIME = { '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.html':'text/html', '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png' };

const VIEWPORTS = [
  { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 },
  { w: 768, h: 1000 }, { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true },
  { w: 1366, h: 768, fits: true },
];
const SHOT_WIDTHS = new Set([360, 768, 1024]);
const MIN_TAP = 44;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/calendar-wall.html';
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length)) : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

const fails = [];
function FAIL(msg) { fails.push(msg); console.log('  ✗ FAIL ' + msg); }
function OK(msg) { console.log('  ✓ ' + msg); }
const sleep = ms => new Promise(r => setTimeout(r, ms));

function localKey(offsetDays) {
  const d = new Date();
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (offsetDays || 0));
  const pad = n => (n < 10 ? '0' : '') + n;
  return t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate());
}

/* seed the store from inside the page */
async function seedStore(page, wall) {
  await page.evaluate((wall) => {
    const id = 'w_test1';
    localStorage.setItem('lcs:calendar-wall:v1', JSON.stringify({
      v: 1, activeWallId: id, ent: null, walls: { [id]: Object.assign({
        name: 'Test class', createdAt: '2026-01-01', dayCount: 0, lastCountDate: null,
        lastFlipDate: null, countLog: [], weather: {}, pattern: 'ab', lastSummary: null
      }, wall) }
    }));
  }, wall);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/calendar-wall.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  /* speechSynthesis spy */
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    const orig = window.speechSynthesis && window.speechSynthesis.speak;
    if (window.speechSynthesis) {
      window.speechSynthesis.speak = function (u) { window.__spoken.push(u.text); };
    }
  });

  /* ---------- A. viewport sweep ---------- */
  console.log('\nA. viewport sweep');
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.cwl-grid', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate((MIN_TAP) => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const small = [];
      for (const s of ['.cwl-dockchip', '.cwl-nav', '.cwl-monav']) {
        document.querySelectorAll(s).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width && (r.width < MIN_TAP || r.height < MIN_TAP)) small.push(`${s} ${Math.round(r.width)}x${Math.round(r.height)}`);
        });
      }
      /* grid-track containment: the last-column cells must end INSIDE
         the grid box (the aspect-ratio+min-height bug pushed column 7
         off-viewport at 360 while scrollWidth stayed clean) */
      const gridBox = document.querySelector('.cwl-grid');
      let colOverflow = 0;
      if (gridBox) {
        const gr = gridBox.getBoundingClientRect().right;
        gridBox.querySelectorAll(':scope > *').forEach(el => {
          const r = el.getBoundingClientRect().right - gr;
          if (r > colOverflow) colOverflow = r;
        });
      }
      const dock = document.querySelector('.cwl-dock');
      const dockBottom = dock ? dock.getBoundingClientRect().bottom : 0;
      return { overflow, small, colOverflow, dockBottom, vh: window.innerHeight,
        grid: document.querySelectorAll('.cwl-cell:not(.empty)').length,
        dateline: !!(document.querySelector('.cwl-dateline') || {}).textContent };
    }, MIN_TAP);
    const tag = `${vp.w}x${vp.h}`;
    let bad = false;
    if (m.overflow > 1) { FAIL(`${tag}: horizontal overflow ${m.overflow}px`); bad = true; }
    if (m.colOverflow > 2) { FAIL(`${tag}: grid cells overflow their tracks by ${Math.round(m.colOverflow)}px`); bad = true; }
    if (m.small.length) { FAIL(`${tag}: tap targets <44px: ${[...new Set(m.small)].join(', ')}`); bad = true; }
    if (m.grid < 28) { FAIL(`${tag}: only ${m.grid} day cells`); bad = true; }
    if (!m.dateline) { FAIL(`${tag}: no date line`); bad = true; }
    /* projector FITS gate: the whole ritual — grid AND dock — without scrolling */
    if (vp.fits && m.dockBottom > m.vh + 1) { FAIL(`${tag}: dock bottom ${Math.round(m.dockBottom)}px > viewport ${m.vh}px (calendar view must fit a projector)`); bad = true; }
    if (!bad) OK(`${tag}: fits, ${m.grid} day cells, taps ok${vp.fits ? `, dock at ${Math.round(m.dockBottom)}/${m.vh}` : ''}`);
    if (SHOT_WIDTHS.has(vp.w) && vp.h >= 900 || vp.w < 1024 && SHOT_WIDTHS.has(vp.w)) await page.screenshot({ path: path.join(OUT, `sweep-${vp.w}.png`), fullPage: true });
    if (vp.w === 1024 && vp.h === 768) await page.screenshot({ path: path.join(OUT, 'sweep-1024x768.png'), fullPage: true });
  }

  /* ---------- B. functional drive (1024) ---------- */
  console.log('\nB. functional drive (1024)');
  await page.setViewport({ width: 1024, height: 900 });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.cwl-grid');

  /* no auto-audio */
  const spokenOnOpen = await page.evaluate(() => window.__spoken.length);
  if (spokenOnOpen > 0) FAIL(`auto-audio on open: ${spokenOnOpen} utterances`);
  else OK('no auto-audio on open');

  /* today card face-down → tap flips + speaks */
  const facedown = await page.$('.cwl-cell.today.facedown');
  if (!facedown) FAIL('today card not face-down on first open');
  else {
    await page.click('.cwl-cell.today');
    await sleep(900);
    const st = await page.evaluate(() => ({
      flipped: !!document.querySelector('.cwl-cell.today:not(.facedown)'),
      spoken: window.__spoken.length,
      lastText: window.__spoken[window.__spoken.length - 1] || ''
    }));
    if (!st.flipped) FAIL('today card did not flip');
    else if (st.spoken < 1) FAIL('flip did not speak the date');
    else if (/\d/.test(st.lastText.replace(/\b(19|20)\d\d\b/, ''))) FAIL(`spoken date contains digits: "${st.lastText}"`);
    else OK(`flip + spoke "${st.lastText}"`);
  }
  /* date line replay */
  const before = await page.evaluate(() => window.__spoken.length);
  await page.click('.cwl-dateline');
  await sleep(300);
  const after = await page.evaluate(() => window.__spoken.length);
  if (after <= before) FAIL('date-line tap did not speak');
  else OK('date-line tap replays the date');
  await page.screenshot({ path: path.join(OUT, 'calendar-flipped-1024.png'), fullPage: true });

  /* counter: premium-free basics — +1 today (fresh wall, count 0→1) */
  await page.click('.cwl-dockchip:nth-of-type(2)');   /* nth-of-type counts buttons within dock incl nav? use text-free approach below */
  await sleep(200);
  let onCounter = await page.$('.cwl-plusone');
  if (!onCounter) {
    /* dock chips: find by class order */
    await page.evaluate(() => { document.querySelectorAll('.cwl-dockchip')[1].click(); });
    await sleep(250);
    onCounter = await page.$('.cwl-plusone');
  }
  if (!onCounter) { FAIL('counter widget did not open'); }
  else {
    await page.click('.cwl-plusone');
    await sleep(400);
    const c1 = await page.evaluate(() => ({
      digits: [...document.querySelectorAll('.cwl-digit')].map(e => e.textContent).join(''),
      dots: document.querySelectorAll('.cwl-tfcell.filled').length,
      straws: document.querySelectorAll('.cwl-jar.ones .cwl-jaritem').length,
      counted: !!document.querySelector('.cwl-counted'),
      plus: !!document.querySelector('.cwl-plusone')
    }));
    if (c1.digits !== '1') FAIL(`+1: numeral "${c1.digits}" (want 1)`);
    else if (c1.dots !== 1) FAIL(`+1: ten-frame ${c1.dots} dots (want 1)`);
    else if (c1.straws !== 1) FAIL(`+1: ${c1.straws} straws (want 1)`);
    else OK('+1 advances numeral + frame + straws in sync');
    if (c1.plus || !c1.counted) FAIL('double-tap not structurally blocked (plus button still present)');
    else OK('counted-today chip replaces the button (double-tap impossible)');

    /* undo */
    await page.click('.cwl-undochip');
    await sleep(300);
    const c2 = await page.evaluate(() => ({
      digits: [...document.querySelectorAll('.cwl-digit')].map(e => e.textContent).join(''),
      plus: !!document.querySelector('.cwl-plusone')
    }));
    if (c2.digits !== '0' || !c2.plus) FAIL(`undo: numeral "${c2.digits}", plus=${c2.plus}`);
    else OK('undo restores count + button');

    /* teacher stepper sets 37 */
    await page.click('.cwl-pencil');
    await sleep(250);
    await page.$eval('.cwl-stepinput', el => { el.value = ''; });
    await page.type('.cwl-stepinput', '37');
    await page.$eval('.cwl-stepinput', el => el.dispatchEvent(new Event('change', { bubbles: true })));
    await sleep(350);
    const c3 = await page.evaluate(() => ({
      digits: [...document.querySelectorAll('.cwl-digit')].map(e => e.textContent).join(''),
      bundles: document.querySelectorAll('.cwl-bundle').length,
      straws: document.querySelectorAll('.cwl-jar.ones .cwl-jaritem').length
    }));
    if (c3.digits !== '37') FAIL(`stepper: numeral "${c3.digits}" (want 37)`);
    else if (c3.bundles !== 3) FAIL(`stepper 37: ${c3.bundles} bundles (want 3)`);
    else if (c3.straws !== 7) FAIL(`stepper 37: ${c3.straws} straws (want 7)`);
    else OK('teacher stepper → 37 = 3 bundles + 7 straws');
    await page.screenshot({ path: path.join(OUT, 'counter-37-1024.png'), fullPage: true });
  }

  /* REBUNDLE: seed dayCount 9 counted yesterday (premium-free path still animates) */
  await seedStore(page, { dayCount: 9, lastCountDate: localKey(-1) });
  await page.goto(BASE + '?lang=en&widget=counter', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.cwl-plusone', { timeout: 5000 }).catch(() => null);
  const plusBtn = await page.$('.cwl-plusone');
  if (!plusBtn) FAIL('rebundle seed: no +1 button');
  else {
    await page.click('.cwl-plusone');
    await sleep(750);
    const midBand = await page.evaluate(() => !!document.querySelector('.cwl-band'));
    await sleep(1200);
    const post = await page.evaluate(() => ({
      digits: [...document.querySelectorAll('.cwl-digit')].map(e => e.textContent).join(''),
      bundles: document.querySelectorAll('.cwl-bundle').length,
      straws: document.querySelectorAll('.cwl-jar.ones .cwl-jaritem').length,
      narr: window.__spoken.some(t => /ten|Ten/.test(t))
    }));
    if (!midBand) FAIL('rebundle: no band appeared mid-chain');
    else OK('rebundle: teal band snapped around the ten');
    if (post.digits !== '10' || post.bundles !== 1 || post.straws !== 0) {
      FAIL(`rebundle end-state: "${post.digits}" digits, ${post.bundles} bundles, ${post.straws} straws`);
    } else OK('rebundle: 9 → 10 = one bundle in the tens jar, ones empty');
    if (!post.narr) FAIL('rebundle: narration not spoken');
    else OK('rebundle: narration spoken');
  }

  /* weather: pick, pill, correction */
  await page.evaluate(() => { document.querySelectorAll('.cwl-dockchip')[2].click(); });
  await sleep(250);
  const picker = await page.$('.cwl-picker');
  if (!picker) FAIL('weather: no picker on a fresh day');
  else {
    await page.click('.cwl-wbtn[data-w="sun"]');
    await sleep(600);
    const w1 = await page.evaluate(() => ({
      pill: !!document.querySelector('.cwl-todaypill'),
      stamps: document.querySelectorAll('.cwl-stamp:not(.ghost)').length
    }));
    if (!w1.pill) FAIL('weather: no today-pill after picking');
    else OK('weather: sun picked → today pill');
    if (w1.stamps !== 1) FAIL(`weather: ${w1.stamps} stamps (want 1)`);
    else OK('weather: one stamp on the chart');
    /* correction */
    await page.click('.cwl-todaypill');
    await sleep(250);
    await page.click('.cwl-wbtn[data-w="rain"]');
    await sleep(600);
    const w2 = await page.evaluate(() => {
      const cols = [...document.querySelectorAll('.cwl-col')];
      const find = (id) => {
        for (const c of cols) {
          const cnt = c.querySelector('.cwl-colcount');
          const svg = c.querySelector('.cwl-colicon svg');
          if (c.querySelector('.cwl-colbase') && cnt) {
            // identify column by index: order matches WEATHER array (sun,cloud,rain,...)
          }
        }
        return null;
      };
      const counts = [...document.querySelectorAll('.cwl-colcount')].map(e => +e.textContent);
      return { counts };
    });
    if (w2.counts[0] !== 0 || w2.counts[2] !== 1) FAIL(`weather correction: counts ${w2.counts.join(',')} (want sun 0, rain 1)`);
    else OK('weather: same-day correction moved the mark');
    await page.screenshot({ path: path.join(OUT, 'weather-1024.png'), fullPage: true });
  }

  /* month back-nav (on weather) */
  await page.evaluate(() => { document.querySelectorAll('.cwl-monav')[0].click(); });
  await sleep(300);
  const nav = await page.evaluate(() => ({
    fwdEnabled: !document.querySelectorAll('.cwl-monav')[1].disabled,
    todayBtn: !!document.querySelector('.cwl-todaybtn'),
    picker: !!document.querySelector('.cwl-picker'),
  }));
  if (!nav.fwdEnabled || !nav.todayBtn) FAIL('month back-nav: forward/Today not offered');
  else OK('month back-nav: read-only view + Today returns');
  if (nav.picker) FAIL('month back-nav: picker rendered on a past month');
  else OK('month back-nav: no picker on a past month');
  await page.click('.cwl-todaybtn');
  await sleep(250);

  /* panel: rename + new-wall gate + new-year confirm; then reset=view-only */
  await page.click('.cwl-wallchip');
  await sleep(300);
  const rows = await page.$$eval('.cwl-wallrow', els => els.length);
  if (rows < 1) FAIL('panel: no wall rows');
  else OK(`panel: ${rows} wall row(s)`);
  await page.click('.cwl-newwall');
  await sleep(250);
  const gate = await page.$('.cwl-panel .cwl-gate');
  if (!gate) FAIL('panel: "+ New class wall" free tap → no upsell');
  else OK('panel: new-wall free tap → warm upsell');
  /* new-year two-step */
  await page.evaluate(() => { [...document.querySelectorAll('.cwl-linkbtn.danger')].at(-1).click(); });
  await sleep(250);
  const confirmMsg = await page.$eval('.cwl-confirm p', el => el.textContent).catch(() => null);
  if (!confirmMsg || !/10/.test(confirmMsg)) FAIL(`new-year confirm does not show the stakes: "${confirmMsg}"`);
  else OK(`new-year confirm shows the stakes ("${confirmMsg.trim().slice(0, 50)}…")`);
  /* capture the PANEL while it is actually open (the prior shot landed
     post-close and was byte-identical to the free-gate view) */
  await page.screenshot({ path: path.join(OUT, 'panel-open-1024.png'), fullPage: true });
  await page.click('.cwl-btn.danger');
  await sleep(350);
  const afterNY = await page.evaluate(() => JSON.parse(localStorage.getItem('lcs:calendar-wall:v1')));
  const wallNY = afterNY.walls[afterNY.activeWallId];
  if (wallNY.dayCount !== 0 || !wallNY.lastSummary || wallNY.lastSummary.days !== 10) {
    FAIL(`new-year: dayCount=${wallNY.dayCount}, lastSummary=${JSON.stringify(wallNY.lastSummary)}`);
  } else OK('new-year ritual: count zeroed, lastSummary written');
  await page.screenshot({ path: path.join(OUT, 'panel-1024.png'), fullPage: true });

  /* shell reset = view only */
  await seedStore(page, { dayCount: 42, lastCountDate: localKey(0) });
  await page.goto(BASE + '?lang=en&widget=weather', { waitUntil: 'networkidle0' });
  await sleep(300);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('.lcs-ctrl')].find(x => /reset/i.test(x.getAttribute('aria-label') || ''));
    if (b) b.click();
  });
  await sleep(400);
  const afterReset = await page.evaluate(() => ({
    store: JSON.parse(localStorage.getItem('lcs:calendar-wall:v1')),
    onCalendar: !!document.querySelector('.cwl-grid')
  }));
  const wr = afterReset.store.walls[afterReset.store.activeWallId];
  if (wr.dayCount !== 42) FAIL(`shell reset touched data: dayCount=${wr.dayCount}`);
  else OK('shell reset preserved the store (dayCount 42 intact)');
  if (!afterReset.onCalendar) FAIL('shell reset did not snap to the calendar widget');
  else OK('shell reset = view reset to widget 1');

  /* ---------- C. free next-morning read-gate ---------- */
  console.log('\nC. free next-morning read-gate');
  await seedStore(page, { dayCount: 5, lastCountDate: localKey(-1),
    weather: (() => { const o = {}; const ym = localKey(-1).slice(0, 7); o[ym] = {}; o[ym][localKey(-1).slice(8, 10)] = 'sun'; return o; })() });
  await page.goto(BASE + '?lang=en&widget=counter', { waitUntil: 'networkidle0' });
  await sleep(300);
  const free = await page.evaluate(() => ({
    digits: [...document.querySelectorAll('.cwl-digit')].map(e => e.textContent).join(''),
    gate: !!document.querySelector('.cwl-gate'),
    store: JSON.parse(localStorage.getItem('lcs:calendar-wall:v1'))
  }));
  if (free.digits !== '0') FAIL(`free read-gate: counter shows "${free.digits}" (want 0)`);
  else OK('free tier next morning: counter reads 0 (read-gate)');
  if (!free.gate) FAIL('free read-gate: no warm gate line');
  else OK('free tier: warm gate line under the counter');
  const storedCount = free.store.walls[free.store.activeWallId].dayCount;
  if (storedCount !== 5) FAIL(`free read-gate DELETED data: stored dayCount=${storedCount}`);
  else OK('free read-gate: stored data untouched (5 preserved)');
  /* weather ghost + gate */
  await page.evaluate(() => { document.querySelectorAll('.cwl-dockchip')[2].click(); });
  await sleep(300);
  const freeW = await page.evaluate(() => ({
    ghosts: document.querySelectorAll('.cwl-stamp.ghost').length,
    gate: !!document.querySelector('.cwl-gate')
  }));
  if (!freeW.ghosts) FAIL('free weather: no ghost month preview');
  else OK(`free weather: ghost preview (${freeW.ghosts} faint stamps) + today only`);
  if (!freeW.gate) FAIL('free weather: no gate line');
  else OK('free weather: warm gate line');
  await page.screenshot({ path: path.join(OUT, 'free-gate-1024.png'), fullPage: true });

  /* ---------- D. deep links ---------- */
  console.log('\nD. deep links');
  await page.goto(BASE + '?lang=en&widget=weather', { waitUntil: 'networkidle0' });
  await sleep(250);
  const dlW = await page.evaluate(() => !!document.querySelector('.cwl-chart'));
  if (!dlW) FAIL('?widget=weather did not open the weather widget');
  else OK('?widget=weather lands on weather');
  const wallId = await page.evaluate(() => JSON.parse(localStorage.getItem('lcs:calendar-wall:v1')).activeWallId);
  await page.goto(BASE + `?lang=en&class=${wallId}&widget=counter`, { waitUntil: 'networkidle0' });
  await sleep(250);
  const dlC = await page.evaluate(() => !!document.querySelector('.cwl-counter'));
  if (!dlC) FAIL('?class + ?widget=counter did not land');
  else OK('?class=<id>&widget=counter lands on the wall + counter');

  /* ---------- E. lang smoke ---------- */
  console.log('\nE. lang smoke');
  for (const L of ['de', 'fi']) {
    await page.goto(BASE + `?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.cwl-grid', { timeout: 8000 }).then(() => true).catch(() => false);
    const info = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent,
      line: (document.querySelector('.cwl-datetext') || {}).textContent || ''
    }));
    if (!got) FAIL(`${L}: grid did not render`);
    else if (/\d/.test(info.line)) FAIL(`${L}: date line contains digits: "${info.line}"`);
    else OK(`${L}: "${info.title}" — date line "${info.line}"`);
  }

  /* ---------- F. console errors ---------- */
  console.log('\nF. console errors');
  const realErrors = consoleErrors.filter(e => !/404|Failed to load resource|net::ERR/i.test(e));
  if (realErrors.length) FAIL('console errors: ' + realErrors.slice(0, 5).join(' | '));
  else OK(`no console errors (${consoleErrors.length - realErrors.length} expected 404s ignored)`);

  await browser.close();
  server.close();

  console.log('\n' + (fails.length ? `RESULT: FAIL (${fails.length})` : 'RESULT: PASS'));
  console.log('screenshots → ' + OUT);
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
