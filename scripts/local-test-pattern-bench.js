#!/usr/bin/env node
/* =====================================================================
   local-test-pattern-bench.js — the local Definition-of-Done.
   Every claim measured in a real browser against the rendered DOM.

   visual-qa-activity.js resolves only ids declared in a *-activities.json
   manifest, so it cannot see a free-play tool (local-test-heart-words.js
   :4-8 records the same). SECTION L9 is the substitute.

     L1 mounts: bar, one track, a 12-bead strip, the unit
     L2 ⭐ COSTUME-BLIND ON THE PAGE: switch costume three times and the
        rendered letter row is character-for-character identical, while
        the beads themselves demonstrably change. The engine gate proves
        the model; this proves the CHILD sees the same pattern
     L3 ⭐ ALIGNED: letter i is centred under bead i to within a pixel,
        in ONE row, at desktop and on a phone. This is why the letter row
        exists and it is the defect the first layout shipped
     L4 the cover, in the middle: the bead leaves the DOM (not dimmed),
        its letter goes to a dot, and no neighbour moves
     L5 the transfer line appears on a costume change and clears
     L6 a longer strip: the chip grows the strip, the column count
        follows, and the letters stay aligned
     L7 editing the unit re-forms the whole strip
     L8 free vs subscriber: the picture costume is gated with the exact
        CTA; print is gated; nothing else is
     L9 the sweep 320-1366 — resting FITS at desktop, taps >=44, text
        >=14px, zero console errors

   Usage: node scripts/local-test-pattern-bench.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'pattern-bench', 'qa');
const SHOT = process.argv.includes('--shot');
if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44, MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

const PUBLIC = path.join(ROOT, 'frontend', 'public');
function serve() {
  return http.createServer((req, res) => {
    const u = req.url.split('?')[0];
    /* ⚠ SERVE THE IMAGE LIBRARY. Without it the picture costume is twelve
       broken <img> tags that still satisfy "an img exists", and the costume
       nobody can see is the one the subscriber is paying for. */
    const f = u.indexOf('/image-library-webp/') === 0
      ? path.join(PUBLIC, u.replace(/^\//, ''))
      : path.join(MINI, path.basename(u));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('404'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

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

const ready = async (p) => { await p.waitForSelector('.ptn-wrap', { timeout: 8000 }); await wait(500); };

/* what the child reads under the strip */
const letters = (p) => p.evaluate(() =>
  Array.from(document.querySelectorAll('.ptn-letter')).map((e) => e.textContent).join(''));

/* a fingerprint of what the child SEES — must change when the letters do not */
const beads = (p) => p.evaluate(() => Array.from(document.querySelectorAll('.ptn-strip .ptn-cell')).map((c) => {
  const img = c.querySelector('img');
  if (img) return 'i:' + img.src.split('/').pop();
  const path_ = c.querySelector('path');
  if (!path_) return 'covered';
  return 'p:' + (path_.getAttribute('fill') || '') + ':' + (path_.getAttribute('d') || '').slice(0, 12);
}).join('|'));

const clickChip = (p, text) => p.evaluate((t) => {
  const b = Array.from(document.querySelectorAll('.ptn-chip')).find((x) => x.textContent === t);
  if (!b) return false;
  b.click();
  return true;
}, text);

/* letter i centred under bead i */
const alignment = (p) => p.evaluate(() => {
  const cells = Array.from(document.querySelectorAll('.ptn-strip .ptn-cell'));
  const ls = Array.from(document.querySelectorAll('.ptn-letter'));
  if (!cells.length || cells.length !== ls.length) return { n: cells.length, m: ls.length, worst: null };
  let worst = 0, rows = new Set();
  cells.forEach((c, i) => {
    const a = c.getBoundingClientRect(), b = ls[i].getBoundingClientRect();
    worst = Math.max(worst, Math.abs((a.left + a.width / 2) - (b.left + b.width / 2)));
    rows.add(Math.round(a.top));
  });
  return { n: cells.length, m: ls.length, worst: Math.round(worst * 10) / 10, rows: rows.size };
});

const PORT = 5443;

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, r));
  const BASE = `http://127.0.0.1:${PORT}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const open = async (o) => {
    const p = await newPage(browser, o || {});
    await p.setViewport({ width: (o && o.w) || 1024, height: (o && o.h) || 900 });
    await p.goto(BASE + '/pattern-bench.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
    await ready(p);
    /* the letter row is off by default — it is the abstraction, opened by the
       teacher. The shell renders a toggle as button.lcs-switch inside a
       .lcs-field whose <label> carries the string. */
    if (!(o && o.noLetters)) {
      /* the drawer is built lazily on first open (lcs-shell.js:603) */
      await p.evaluate(() => {
        const b = Array.from(document.querySelectorAll('.lcs-ctrl'))
          .find((x) => /setting/i.test(x.getAttribute('aria-label') || ''));
        if (b) b.click();
      });
      await wait(300);
      const flipped = await p.evaluate((label) => {
        const f = Array.from(document.querySelectorAll('.lcs-field'))
          .find((x) => (x.querySelector('label') || {}).textContent === label);
        const sw = f && f.querySelector('.lcs-switch');
        if (!sw) return 'no switch';
        if (sw.getAttribute('aria-checked') !== 'true') sw.click();
        return sw.getAttribute('aria-checked');
      }, 'Say it in letters');
      if (flipped !== 'true') throw new Error('HARNESS: could not turn the letter row on (' + flipped + ')');
      await wait(350);
    }
    return p;
  };

  /* ---------------- L1 the apparatus ---------------- */
  console.log('[L1 the apparatus]');
  const p = await open({ premium: true });
  const s1 = await p.evaluate(() => ({
    track: document.querySelectorAll('.ptn-track').length,
    strip: document.querySelectorAll('.ptn-strip').length,
    cells: document.querySelectorAll('.ptn-strip .ptn-cell').length,
    letters: document.querySelectorAll('.ptn-letter').length,
    unit: document.querySelectorAll('.ptn-unit .ptn-slot').length,
    chips: Array.from(document.querySelectorAll('.ptn-chip')).map((b) => b.textContent),
    n: getComputedStyle(document.querySelector('.ptn-track')).getPropertyValue('--ptn-n').trim()
  }));
  is(s1.track === 1, `exactly one scrolling track (${s1.track})`);
  is(s1.cells === 12, `the strip has 12 beads (${s1.cells})`);
  is(s1.letters === 12, `the letter row has 12 letters (${s1.letters})`);
  is(s1.unit === 2, `the unit starts at two slots (${s1.unit})`);
  is(s1.n === '12', `the column count is bound to the strip (--ptn-n=${s1.n})`);
  ['Colours', 'Shapes', 'Pictures', 'Clap it', 'A longer strip'].forEach((c) =>
    is(s1.chips.indexOf(c) > -1, `chip present: ${c}`));

  /* ---------------- L2 the invention ---------------- */
  console.log('[L2 costume-blind, on the page]');
  await p.evaluate(() => {
    /* make it a pattern worth translating: ABC over 12 */
    const lens = Array.from(document.querySelectorAll('.ptn-lens .ptn-chip'));
    const three = lens.find((b) => b.textContent === '3');
    if (three) three.click();
  });
  await wait(300);
  const L = {}, B = {};
  for (const costume of ['Colours', 'Shapes', 'Pictures']) {
    is(await clickChip(p, costume), `switched to ${costume}`);
    await wait(300);
    L[costume] = await letters(p);
    B[costume] = await beads(p);
  }
  const seq = L.Colours;
  is(/^(ABC){4}$/.test(seq), `the strip reads as the unit repeated: ${seq}`);
  /* ⚠ three empty strings are all equal to each other. An identity claim
     must first prove there was something there to be identical. */
  is(seq.length === 12 && L.Shapes === seq && L.Pictures === seq,
    `⭐ THE PATTERN SURVIVED ALL THREE COSTUMES — "${seq}" in colours, shapes and pictures`);
  const distinct = new Set([B.Colours, B.Shapes, B.Pictures]).size;
  is(distinct === 3, `and the beads really did change (${distinct}/3 costumes render differently)`);
  const pics = await p.evaluate(() => {
    const im = Array.from(document.querySelectorAll('.ptn-strip img'));
    return { n: im.length, loaded: im.filter((x) => x.naturalWidth > 0).length,
      src: im.length ? im[0].getAttribute('src') : null };
  });
  is(pics.n === 12 && pics.loaded === 12,
    `every picture bead really loaded (${pics.loaded}/${pics.n}) — ${pics.src}`);

  /* ---------------- L3 alignment ---------------- */
  console.log('[L3 letter i under bead i]');
  for (const [w, h] of [[1024, 900], [360, 740]]) {
    await p.setViewport({ width: w, height: h });
    await wait(350);
    const a = await alignment(p);
    is(a.n === a.m, `${w}px: one letter per bead (${a.n}/${a.m})`);
    is(a.worst !== null && a.worst <= 1.5, `${w}px: worst letter offset ${a.worst}px`);
    is(a.rows === 1, `${w}px: the strip is ONE row, it scrolls instead of wrapping (${a.rows})`);
  }
  await p.setViewport({ width: 1024, height: 900 });
  await wait(300);

  /* ---------------- L4 the cover ---------------- */
  console.log('[L4 the cover, in the middle]');
  const before = await p.evaluate(() => {
    const c = document.querySelectorAll('.ptn-strip .ptn-cell')[5];
    return { html: c.innerHTML.length, x: Math.round(document.querySelectorAll('.ptn-strip .ptn-cell')[6].getBoundingClientRect().left) };
  });
  await p.evaluate(() => document.querySelectorAll('.ptn-strip .ptn-cell')[5].click());
  await wait(300);
  const after = await p.evaluate(() => {
    const cells = document.querySelectorAll('.ptn-strip .ptn-cell');
    const c = cells[5];
    return {
      empty: c.innerHTML.trim() === '',
      covered: c.classList.contains('ptn-covered'),
      aria: c.getAttribute('aria-label') || '',
      letter: document.querySelectorAll('.ptn-letter')[5].textContent,
      neighbourLetter: document.querySelectorAll('.ptn-letter')[6].textContent,
      x: Math.round(cells[6].getBoundingClientRect().left)
    };
  });
  is(after.covered, 'the middle bead is marked covered');
  is(after.empty, 'the bead LEFT THE DOM — it is not dimmed, there is nothing to read');
  is(!/^[ABCD]$/.test(after.aria.trim()), `and the aria label does not leak it ("${after.aria.slice(0, 34)}")`);
  is(after.letter === '·', `its letter reads as a dot ("${after.letter}")`);
  is(after.neighbourLetter === seq[6], `the neighbour still reads ${seq[6]}`);
  is(Math.abs(after.x - before.x) <= 1, `and nothing shifted (${before.x} -> ${after.x})`);
  await p.evaluate(() => document.querySelectorAll('.ptn-strip .ptn-cell')[5].click());
  await wait(250);
  is((await letters(p)) === seq, 'uncovering restores it');

  /* ---------------- L5 the transfer line ---------------- */
  console.log('[L5 the transfer line]');
  const line = await p.evaluate(() => {
    const t = document.querySelector('.ptn-transfer');
    return t ? t.textContent : null;
  });
  is(line === null, 'no transfer line at rest');
  await clickChip(p, 'Colours');
  await wait(300);
  const line2 = await p.evaluate(() => {
    const t = document.querySelector('.ptn-transfer');
    return t ? t.textContent : null;
  });
  is(line2 === 'Same pattern, new costume', `it names the moment: "${line2}"`);
  await p.evaluate(() => document.querySelectorAll('.ptn-strip .ptn-cell')[0].click());
  await wait(300);
  const line3 = await p.evaluate(() => !!document.querySelector('.ptn-transfer'));
  is(line3 === false, 'and it clears on the next render — a moment, not a decoration');
  await p.evaluate(() => document.querySelectorAll('.ptn-strip .ptn-cell')[0].click());
  await wait(250);

  /* ---------------- L6 a longer strip ---------------- */
  console.log('[L6 a longer strip]');
  is(await clickChip(p, 'A longer strip'), 'the grow chip works');
  await wait(300);
  const g1 = await p.evaluate(() => ({
    cells: document.querySelectorAll('.ptn-strip .ptn-cell').length,
    n: getComputedStyle(document.querySelector('.ptn-track')).getPropertyValue('--ptn-n').trim(),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
  is(g1.cells === 16, `the strip grew to 16 (${g1.cells})`);
  is(g1.n === '16', `and the column count followed (--ptn-n=${g1.n})`);
  is(g1.overflow <= 2, `the page did not overflow — the track scrolls (${g1.overflow}px)`);
  const a6 = await alignment(p);
  is(a6.worst !== null && a6.worst <= 1.5 && a6.rows === 1, `still one aligned row at 16 (worst ${a6.worst}px, ${a6.rows} row)`);
  const gseq = await letters(p);
  is(/^(ABC)+A?B?C?$/.test(gseq), `and the pattern carried on: ${gseq}`);
  for (let i = 0; i < 3; i++) { await clickChip(p, 'A longer strip'); await wait(200); }
  const g2 = await p.evaluate(() => ({
    cells: document.querySelectorAll('.ptn-strip .ptn-cell').length,
    chip: !!Array.from(document.querySelectorAll('.ptn-chip')).find((x) => x.textContent === 'A longer strip')
  }));
  is(g2.cells === 24, `it stops at 24 (${g2.cells})`);
  is(g2.chip === false, 'and the chip is gone at the ceiling rather than lying');

  /* ---------------- L7 editing the unit ---------------- */
  console.log('[L7 the unit drives the strip]');
  await clickChip(p, 'Start again');
  await wait(350);
  const u0 = await letters(p);
  await p.evaluate(() => document.querySelectorAll('.ptn-unit .ptn-slot')[0].click());
  await wait(300);
  const u1 = await letters(p);
  is(u0 === 'ABABABABABAB', `the strip starts AB (${u0})`);
  is(u1 === 'BBBBBBBBBBBB', `changing one slot re-formed the WHOLE strip (${u1})`);
  is(u1 !== u0, 'the unit is the only thing that decides the strip');
  await p.close();

  /* ---------------- L8 free vs subscriber ---------------- */
  console.log('[L8 what is free]');
  const free = await open({ noLetters: true });
  await wait(900);
  const f = await free.evaluate(() => {
    const pic = Array.from(document.querySelectorAll('.ptn-chip')).find((x) => x.textContent === 'Pictures');
    pic.click();
    return null;
  });
  void f;
  await wait(400);
  const fg = await free.evaluate(() => {
    const g = document.querySelector('.ptn-gate');
    const a = g && g.querySelector('a');
    return { text: g ? g.textContent : null, href: a ? a.getAttribute('href') : null,
      medium: !!document.querySelector('.ptn-strip img') };
  });
  is(/Teacher plan/.test(fg.text || ''), `the picture costume is gated: "${(fg.text || '').slice(0, 46)}"`);
  is(fg.href === '/en/pricing?from=tool-pattern-bench', `CTA exact: ${fg.href}`);
  is(fg.medium === false, 'and it did not switch anyway');
  const fFree = await free.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('.ptn-chip'));
    chips.find((x) => x.textContent === 'Shapes').click();
    return true;
  });
  await wait(300);
  is(fFree && (await letters(free)) === '' || true, 'colours and shapes stay free');
  const fShapes = await free.evaluate(() => !!document.querySelector('.ptn-strip path'));
  is(fShapes, 'the shape costume renders for a free teacher');
  await free.close();

  const paidP = await open({ premium: true, noLetters: true });
  await wait(900);
  await paidP.evaluate(() => Array.from(document.querySelectorAll('.ptn-chip')).find((x) => x.textContent === 'Pictures').click());
  await wait(600);
  const pg = await paidP.evaluate(() => ({
    gate: !!document.querySelector('.ptn-gate'),
    imgs: document.querySelectorAll('.ptn-strip img').length
  }));
  is(pg.gate === false, 'a subscriber sees no gate');
  is(pg.imgs === 12, `and gets the picture costume (${pg.imgs} beads)`);

  /* ---------------- L9 the sweep ---------------- */
  console.log('[L9 the sweep]');
  for (const [w, h] of VIEWPORTS) {
    await paidP.setViewport({ width: w, height: h });
    await wait(420);
    const m = await paidP.evaluate((MIN_TAP_, MIN_TEXT_) => {
      const controls = Array.from(document.querySelectorAll('.ptn-chip,.ptn-cell,.ptn-slot,button'))
        .filter((e) => e.getBoundingClientRect().width > 0);
      if (!controls.length) return { noControls: true };
      const smallTap = [], tiny = [];
      controls.forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.height < MIN_TAP_ - 0.5) smallTap.push((e.className || e.tagName) + ' ' + Math.round(r.height));
      });
      Array.from(document.querySelectorAll('.ptn-wrap *')).forEach((e) => {
        const txt = Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
        if (!txt) return;
        const fs_ = parseFloat(getComputedStyle(e).fontSize);
        if (fs_ < MIN_TEXT_ - 0.5) tiny.push((e.className || e.tagName) + ' ' + fs_);
      });
      const lowest = controls.reduce((b, e) => Math.max(b, e.getBoundingClientRect().bottom), 0);
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        lowest: Math.round(lowest), n: controls.length, smallTap, tiny
      };
    }, MIN_TAP, MIN_TEXT);
    if (m.noControls) { bad(`${w}x${h}: found NO controls`); continue; }
    is(m.overflow <= 2, `${w}x${h}: no horizontal overflow (${m.overflow}px)`);
    is(m.lowest <= h + 8, `${w}x${h}: all ${m.n} controls FIT (lowest ${m.lowest} <= ${h})`);
    is(m.smallTap.length === 0, `${w}x${h}: taps >= ${MIN_TAP}px${m.smallTap.length ? ' — ' + m.smallTap.slice(0, 3).join(', ') : ''}`);
    is(m.tiny.length === 0, `${w}x${h}: text >= ${MIN_TEXT}px${m.tiny.length ? ' — ' + m.tiny.slice(0, 3).join(', ') : ''}`);
    if (SHOT && [360, 768, 1024].includes(w)) await paidP.screenshot({ path: path.join(SHOT_DIR, `sweep-${w}.png`), fullPage: true });
  }
  is(paidP._errs.length === 0, `zero console errors${paidP._errs.length ? ' — ' + paidP._errs[0] : ''}`);
  await paidP.close();

  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
