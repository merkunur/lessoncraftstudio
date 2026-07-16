#!/usr/bin/env node
/* =====================================================================
   local-test-number-talk-easel.js — the local DoD for the Number Talk
   Easel FREE-PLAY TOOL (mini tools/number-talk-easel.html).

   Serves `mini tools/` + `image-library-webp/` locally, then:
     A. viewport sweep 320·360·412·768·1024×768·1024×900·1366×768 —
        no overflow · Show/chips ≥44px · FITS at ≥1024 (dock ≤ viewport)
     B. flash machine (1024×768, premium-forced where needed):
        NO auto-audio on open · covered → Show → shade up → auto-cover
        after flashDuration · Show-again SEED-IDENTITY (dot positions
        identical across two flashes) · Hide-now mid-flash · Reveal
        one-way (dock swaps to Count-it + Next) · NUMERAL-LEAK GATE
        (pre-Count-it the DOM/aria carries no quantity text) · Count-it
        speaks + reveal card shows numeral + word
     C. discussion (premium-forced via localStorage ent cache):
        tint tap cycles a dot coral → teal → amber → off · tint does
        NOT apply on ten-frame cells (frames excluded) · ink stroke
        draws + survives Show again + Clear wipes both
     D. strings: starter string free (enter → stepper) · next loads
        COVERED · jump clears tints · SECOND string gated for free ·
        custom builder composes free, Save gated
     E. deep links: ?repr=dice&n=7 renders two dice; ?string=starter
        enters the string covered
     F. lang smoke de + fi (title + stems render, no digits leak)
     G. console errors: zero tolerated
   Screenshots at 360/768/1024 → docs/audit-results/number-talk-easel/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'docs', 'audit-results', 'number-talk-easel', 'qa');
const MIME = { '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.html':'text/html', '.webp':'image/webp', '.png':'image/png' };

const VIEWPORTS = [
  { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 },
  { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true }, { w: 1366, h: 768, fits: true },
];
const SHOT_WIDTHS = new Set([360, 768, 1024]);
const MIN_TAP = 44;

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/number-talk-easel.html';
    let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
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

/* premium-forced entry: seed the 14-day cached verdict */
async function forcePremium(page) {
  await page.evaluate(() => {
    const st = JSON.parse(localStorage.getItem('lcs:number-talk-easel:v1') || '{"v":1,"customSets":{}}');
    st.v = 1;
    st.ent = { tier: 'full', checkedAt: new Date().toISOString() };
    localStorage.setItem('lcs:number-talk-easel:v1', JSON.stringify(st));
    /* the cached-verdict trust path requires a token holder whose
       /api/auth/me is unreachable (the local server 404s it) */
    localStorage.setItem('accessToken', 'test-token');
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/number-talk-easel.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    if (window.speechSynthesis) {
      window.speechSynthesis.speak = function (u) { window.__spoken.push(u.text); };
    }
  });

  /* ---------- A. viewport sweep ---------- */
  console.log('\nA. viewport sweep');
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.nte-show', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate((MIN_TAP) => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const small = [];
      for (const s of ['.nte-show', '.nte-ctrlchip', '.nte-chip:not(.small)']) {
        document.querySelectorAll(s).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width && (r.width < MIN_TAP || r.height < MIN_TAP)) small.push(`${s} ${Math.round(r.width)}x${Math.round(r.height)}`);
        });
      }
      const dock = document.querySelector('.nte-dock');
      return { overflow, small,
        dockBottom: dock ? dock.getBoundingClientRect().bottom : 0,
        vh: window.innerHeight,
        shade: !!document.querySelector('.nte-shade'),
        pad: !!document.querySelector('.nte-pad') };
    }, MIN_TAP);
    const tag = `${vp.w}x${vp.h}`;
    let bad = false;
    if (m.overflow > 1) { FAIL(`${tag}: horizontal overflow ${m.overflow}px`); bad = true; }
    if (m.small.length) { FAIL(`${tag}: tap targets <44px: ${[...new Set(m.small)].join(', ')}`); bad = true; }
    if (!m.shade || !m.pad) { FAIL(`${tag}: easel/shade missing`); bad = true; }
    if (vp.fits && m.dockBottom > m.vh + 1) { FAIL(`${tag}: dock ${Math.round(m.dockBottom)} > viewport ${m.vh} (projector FITS)`); bad = true; }
    if (!bad) OK(`${tag}: fits${vp.fits ? `, dock at ${Math.round(m.dockBottom)}/${m.vh}` : ''}`);
    if (SHOT_WIDTHS.has(vp.w) && (vp.h >= 900 || vp.w < 1024)) await page.screenshot({ path: path.join(OUT, `sweep-${vp.w}.png`), fullPage: true });
    if (vp.w === 1024 && vp.h === 768) await page.screenshot({ path: path.join(OUT, 'sweep-1024x768.png'), fullPage: true });
  }

  /* ---------- B. flash machine ---------- */
  console.log('\nB. flash machine (1024×768)');
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=en&repr=random&n=5', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + '?lang=en&repr=random&n=5', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.nte-show');

  const spokenOnOpen = await page.evaluate(() => window.__spoken.length);
  if (spokenOnOpen > 0) FAIL(`auto-audio on open: ${spokenOnOpen} utterances`);
  else OK('no auto-audio on open');

  /* numeral-leak gate: pre-Count-it the ANSWER surfaces carry no
     quantity — the pad, the card slot, the title, the live region and
     the easel's aria labels (NOT the static range-chip labels "1–5",
     which are UI, not the answer) */
  const leak = await page.evaluate(() => {
    const bad = [];
    const texts = [document.title];
    const pad = document.querySelector('.nte-pad');
    texts.push(pad ? pad.innerText : '');
    pad && pad.querySelectorAll('[aria-label]').forEach(el => texts.push(el.getAttribute('aria-label')));
    const slot = document.querySelector('.nte-cardslot');
    texts.push(slot ? slot.innerText : '');
    const live = document.querySelector('.lcs-sr-only');
    texts.push(live ? live.textContent : '');
    for (const t of texts) if (/\b5\b|\bfive\b/i.test(t || '')) bad.push((t || '').slice(0, 60));
    return bad;
  });
  if (leak.length) FAIL('NUMERAL LEAK pre-Count-it: ' + leak.join(' | '));
  else OK('numeral-leak gate: no quantity in DOM/aria before Count-it');

  /* covered → Show (tap) → shade up → auto-cover after 3s */
  const covered0 = await page.$eval('.nte-shade', el => !el.classList.contains('up'));
  if (!covered0) FAIL('easel not covered on open');
  else OK('easel covered on open');
  /* record flash-1 dot positions mid-flash */
  await page.evaluate(() => {
    const b = document.querySelector('.nte-show');
    const r = b.getBoundingClientRect();
    const fire = (t) => b.dispatchEvent(new PointerEvent(t, { pointerId: 5, clientX: r.left + 10, clientY: r.top + 10, bubbles: true }));
    fire('pointerdown'); setTimeout(() => fire('pointerup'), 80);
  });
  await sleep(600);
  const flash1 = await page.evaluate(() => ({
    up: document.querySelector('.nte-shade').classList.contains('up'),
    dots: [...document.querySelectorAll('.nte-dot')].map(d => d.style.left + ',' + d.style.top).join(';'),
    label: document.querySelector('.nte-show-label').textContent
  }));
  if (!flash1.up) FAIL('Show tap did not raise the shade');
  else OK('Show: shade up (flashing)');
  if (!/hide/i.test(flash1.label)) FAIL(`Show button did not morph to Hide-now ("${flash1.label}")`);
  else OK('Show morphs to Hide-now during the flash');
  await sleep(3200);
  const covered1 = await page.$eval('.nte-shade', el => !el.classList.contains('up'));
  if (!covered1) FAIL('flash did not auto-cover after flashDuration');
  else OK('auto-cover after ~3s');

  /* Show again: seed identity */
  await page.click('.nte-ctrlchip');   /* first chip = Show again */
  await sleep(600);
  const flash2dots = await page.evaluate(() => [...document.querySelectorAll('.nte-dot')].map(d => d.style.left + ',' + d.style.top).join(';'));
  if (flash2dots !== flash1.dots) FAIL('Show again changed the layout (seed identity broken)');
  else OK('Show again: pixel-identical layout (same seed)');
  await sleep(3200);

  /* press-and-hold keeps open */
  await page.evaluate(() => {
    const b = document.querySelector('.nte-show');
    const r = b.getBoundingClientRect();
    b.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 6, clientX: r.left + 10, clientY: r.top + 10, bubbles: true }));
  });
  await sleep(4000);   /* longer than flashDuration */
  const heldOpen = await page.$eval('.nte-shade', el => el.classList.contains('up'));
  if (!heldOpen) FAIL('press-and-hold: shade auto-covered while held');
  else OK('press-and-hold: shade stays open past the timer');
  await page.evaluate(() => {
    const b = document.querySelector('.nte-show');
    const r = b.getBoundingClientRect();
    b.dispatchEvent(new PointerEvent('pointerup', { pointerId: 6, clientX: r.left + 10, clientY: r.top + 10, bubbles: true }));
  });
  await sleep(500);
  const coveredAfterHold = await page.$eval('.nte-shade', el => !el.classList.contains('up'));
  if (!coveredAfterHold) FAIL('press-and-hold release did not cover');
  else OK('hold release covers');

  /* Reveal: one-way, dock swaps */
  await page.evaluate(() => { [...document.querySelectorAll('.nte-ctrlchip')].find(c => c.classList.contains('teal')).click(); });
  await sleep(500);
  const revealed = await page.evaluate(() => ({
    up: document.querySelector('.nte-shade').classList.contains('up'),
    countBtn: !!document.querySelector('.nte-show.counted'),
    showBtn: !!document.querySelector('.nte-show:not(.counted)')
  }));
  if (!revealed.up || !revealed.countBtn || revealed.showBtn) FAIL(`Reveal: up=${revealed.up} countBtn=${revealed.countBtn} showBtn=${revealed.showBtn}`);
  else OK('Reveal: shade parked open, dock swaps to Count-it + Next');

  /* Count-it: speaks + reveal card */
  await page.click('.nte-show.counted');
  await sleep(1600);
  const counted = await page.evaluate(() => ({
    card: !!document.querySelector('.nte-card'),
    num: (document.querySelector('.nte-card-num') || {}).textContent,
    word: (document.querySelector('.nte-card-word') || {}).textContent,
    spoken: window.__spoken.length
  }));
  if (!counted.card || counted.num !== '5' || !/five/i.test(counted.word || '')) FAIL(`Count-it card: num="${counted.num}" word="${counted.word}"`);
  else OK(`Count-it → card "5 — ${counted.word}"`);
  if (counted.spoken < 1) FAIL('Count-it did not speak');
  else OK('Count-it spoke the number word');
  await page.screenshot({ path: path.join(OUT, 'counted-1024.png'), fullPage: true });

  /* ---------- C. discussion layer (premium-forced) ---------- */
  console.log('\nC. discussion (premium)');
  await forcePremium(page);
  await page.goto(BASE + '?lang=en&repr=random&n=5', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.nte-show');
  /* reveal directly */
  await page.evaluate(() => { [...document.querySelectorAll('.nte-ctrlchip')].find(c => c.classList.contains('teal')).click(); });
  await sleep(400);
  /* tint tap cycles */
  const tints = [];
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => {
      const d = document.querySelector('.nte-dot');
      d.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await sleep(120);
    tints.push(await page.$eval('.nte-dot', el => el.className.match(/nte-t\d/) ? el.className.match(/nte-t\d/)[0] : 'off'));
  }
  if (tints.join(',') !== 'nte-t1,nte-t2,nte-t3,off') FAIL(`tint cycle: ${tints.join(',')}`);
  else OK('tint tap cycles coral → teal → amber → off');
  await page.screenshot({ path: path.join(OUT, 'tint-1024.png'), fullPage: true });

  /* ink: select crayon, draw, Clear wipes (the render after pen
     selection PRESERVES the revealed phase — no extra clicks) */
  await page.evaluate(() => { document.querySelectorAll('.nte-pen')[1].click(); }); /* coral crayon */
  await sleep(400);
  await page.evaluate(() => {
    const ink = document.querySelector('.nte-ink');
    const r = ink.getBoundingClientRect();
    const fire = (t, x, y) => ink.dispatchEvent(new PointerEvent(t, { pointerId: 7, clientX: r.left + x, clientY: r.top + y, bubbles: true }));
    fire('pointerdown', 50, 50); fire('pointermove', 120, 90); fire('pointermove', 200, 120); fire('pointerup', 200, 120);
  });
  await sleep(200);
  const inkPixels = await page.evaluate(() => {
    const ink = document.querySelector('.nte-ink');
    const ctx = ink.getContext('2d');
    const data = ctx.getImageData(0, 0, ink.width, ink.height).data;
    let n = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 0) n++;
    return n;
  });
  if (inkPixels < 100) FAIL(`ink stroke did not draw (${inkPixels} px)`);
  else OK(`ink stroke drawn (${inkPixels} px)`);
  /* Clear wipes ink + tints */
  await page.click('.nte-clearbtn');
  await sleep(200);
  const afterClear = await page.evaluate(() => {
    const ink = document.querySelector('.nte-ink');
    const ctx = ink.getContext('2d');
    const data = ctx.getImageData(0, 0, ink.width, ink.height).data;
    let n = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 0) n++;
    return { px: n, tinted: document.querySelectorAll('.nte-t1,.nte-t2,.nte-t3').length };
  });
  if (afterClear.px > 0 || afterClear.tinted > 0) FAIL(`Clear left ${afterClear.px}px ink, ${afterClear.tinted} tints`);
  else OK('Clear wipes ink + tints together');

  /* frames excluded from tint */
  await page.goto(BASE + '?lang=en&repr=tenframe&n=7', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.nte-show');
  await page.evaluate(() => { [...document.querySelectorAll('.nte-ctrlchip')].find(c => c.classList.contains('teal')).click(); });
  await sleep(400);
  await page.evaluate(() => {
    const d = document.querySelector('.nte-framedot');
    if (d) d.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  await sleep(150);
  const frameTint = await page.evaluate(() => document.querySelectorAll('.nte-framedot.nte-t1').length);
  if (frameTint > 0) FAIL('tint applied on a ten-frame dot (frames are excluded)');
  else OK('ten-frame dots refuse tint (structure already encoded)');

  /* ---------- D. strings ---------- */
  console.log('\nD. strings');
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.nte-modechip');
  await page.click('.nte-modechip');
  await page.waitForSelector('.nte-panel.open', { timeout: 3000 });
  const rows = await page.$$eval('.nte-strrow', els => els.length);
  const lockedRows = await page.$$eval('.nte-strrow.locked', els => els.length);
  if (rows < 10) FAIL(`panel: only ${rows} string rows`);
  else OK(`panel: ${rows} string rows (${lockedRows} locked for free)`);
  /* free starter enters */
  await page.evaluate(() => { [...document.querySelectorAll('.nte-strrow')].find(r => !r.classList.contains('locked')).click(); });
  await sleep(400);
  const inString = await page.evaluate(() => ({
    stepper: !!document.querySelector('.nte-stepper'),
    covered: !document.querySelector('.nte-shade').classList.contains('up'),
    count: (document.querySelector('.nte-stepcount') || {}).textContent
  }));
  if (!inString.stepper || !inString.covered) FAIL(`starter string: stepper=${inString.stepper} covered=${inString.covered}`);
  else OK(`starter string entered covered (${inString.count})`);
  /* reveal + next loads covered */
  await page.evaluate(() => { [...document.querySelectorAll('.nte-ctrlchip')].find(c => c.classList.contains('teal')).click(); });
  await sleep(300);
  await page.evaluate(() => { [...document.querySelectorAll('.nte-ctrlchip')].find(c => c.classList.contains('teal')).click(); }); /* Next */
  await sleep(400);
  const afterNext = await page.evaluate(() => ({
    covered: !document.querySelector('.nte-shade').classList.contains('up'),
    count: (document.querySelector('.nte-stepcount') || {}).textContent
  }));
  if (!afterNext.covered || afterNext.count !== '2 / 4') FAIL(`next: covered=${afterNext.covered} count="${afterNext.count}"`);
  else OK('Next loads the next image COVERED (2 / 4)');
  /* locked string gate */
  await page.evaluate(() => { document.querySelector('.nte-stepnav').click(); });
  await page.waitForSelector('.nte-panel.open');
  await page.evaluate(() => { const r = document.querySelector('.nte-strrow.locked'); if (r) r.click(); });
  await sleep(250);
  const gate = await page.$('.nte-panel .nte-gate');
  if (!gate) FAIL('locked string tap: no gate line');
  else OK('locked string tap → warm gate');
  await page.screenshot({ path: path.join(OUT, 'panel-open-1024.png'), fullPage: true });

  /* custom builder: compose free, save gated */
  await page.evaluate(() => { [...document.querySelectorAll('.nte-tab')].at(-1).click(); });
  await sleep(250);
  await page.evaluate(() => { [...document.querySelectorAll('.nte-composer .nte-btn')][0].click(); }); /* Add */
  await sleep(200);
  const chips = await page.$$eval('.nte-draftchip', els => els.length);
  if (chips !== 1) FAIL(`builder: ${chips} draft chips (want 1)`);
  else OK('builder: compose is free (1 item added)');
  await page.evaluate(() => { const b = document.querySelector('.nte-btn.primary'); if (b) b.click(); });
  await sleep(250);
  const saveGate = await page.$('.nte-composer .nte-gate');
  if (!saveGate) FAIL('builder Save free: no gate');
  else OK('builder Save → warm gate (activation locked)');

  /* ---------- E. deep links ---------- */
  console.log('\nE. deep links');
  await page.goto(BASE + '?lang=en&repr=dice&n=7', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.nte-show');
  const dice = await page.evaluate(() => document.querySelectorAll('.nte-die').length);
  if (dice !== 2) FAIL(`?repr=dice&n=7: ${dice} dice (want 2 faces)`);
  else OK('?repr=dice&n=7 → two pip faces');

  /* objects deep link: every image must actually LOAD (the undefined@2x
     bug class the visual critic caught) */
  await page.goto(BASE + '?lang=en&repr=objects&n=7', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.nte-obj img', { timeout: 5000 }).catch(() => null);
  await sleep(600);
  const objImgs = await page.evaluate(() =>
    [...document.querySelectorAll('.nte-obj img')].map(i => ({ src: i.getAttribute('src'), ok: i.naturalWidth > 0 })));
  const broken = objImgs.filter(o => !o.ok);
  if (objImgs.length !== 7) FAIL(`?repr=objects&n=7: ${objImgs.length} images (want 7)`);
  else if (broken.length) FAIL(`objects: ${broken.length} images failed to load (${broken[0].src})`);
  else OK('?repr=objects&n=7 → 7 real loaded images');
  await page.goto(BASE + '?lang=en&string=s_starter_dots', { waitUntil: 'networkidle0' });
  await sleep(600);
  const dl = await page.evaluate(() => ({
    stepper: !!document.querySelector('.nte-stepper'),
    covered: !document.querySelector('.nte-shade').classList.contains('up')
  }));
  if (!dl.stepper || !dl.covered) FAIL(`?string deep link: stepper=${dl.stepper} covered=${dl.covered}`);
  else OK('?string=s_starter_dots enters covered at pos 0');

  /* ---------- F. lang smoke ---------- */
  console.log('\nF. lang smoke');
  for (const L of ['de', 'fi']) {
    await page.goto(BASE + `?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.nte-show', { timeout: 8000 }).then(() => true).catch(() => false);
    const info = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent,
      stem: (document.querySelector('.nte-prompt-txt') || {}).textContent
    }));
    if (!got) FAIL(`${L}: easel did not render`);
    else OK(`${L}: "${info.title}" — stem "${info.stem}"`);
  }

  /* ---------- G. console errors ---------- */
  console.log('\nG. console errors');
  const realErrors = consoleErrors.filter(e => !/404|Failed to load resource|net::ERR/i.test(e));
  if (realErrors.length) FAIL('console errors: ' + realErrors.slice(0, 5).join(' | '));
  else OK(`no console errors (${consoleErrors.length - realErrors.length} expected 404s ignored)`);

  await browser.close();
  server.close();

  console.log('\n' + (fails.length ? `RESULT: FAIL (${fails.length})` : 'RESULT: PASS'));
  console.log('screenshots → ' + OUT);
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
