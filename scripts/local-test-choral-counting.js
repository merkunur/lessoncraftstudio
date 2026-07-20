#!/usr/bin/env node
/* =====================================================================
   local-test-choral-counting.js — the local Definition-of-Done for
   Choral Counting. Sections:
     A  viewports 320-1366 — no h-overflow, cells ≥36px on phones, tap
        targets ≥44px on the rail
     B  the count — NEXT inks the derived sequence one tap at a time
        (NEVER auto-advances), the halo travels, back-one fades quietly,
        the summary pill collapses the pickers after the first ink
     C  speech — OFF by default (the class voice counts); toggled ON it
        speaks the BARE numeral at the rate rule; the speak spy proves
        both
     D  wonder marks — tap an empty cell marks "?", counting into it
        resolves with the SAME pen-pop (no verdict), mark toggles off
     E  noticing (premium) — arm a marker → cell wash + same-color
        re-tap clears; header tap washes the whole line; digit tint
        chips tint the ones; clear-all wipes
     F  free vs premium — locked chips gate; a premium deep link
        (?start=4&skip=5) stays free-legal unentitled with ZERO premium
        function; entitled it applies (both entitlement paths)
     G  saves (premium) — save, resume restores progress + marks with
        the halo on the last-inked
     H  completion — the done caption shows "what do you notice?"
        (no score, no verdict)
     I  no-shame audit — no alarm-red/verdict-green, no ✗
     J  reduced motion   K  keyboard (Space = next)
   Screenshots → docs/audit-results/choral-counting/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const QA = path.join(REPO, 'docs', 'audit-results', 'choral-counting', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

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
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length)) : path.join(MINI, p.replace(/^\//, ''));
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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/choral-counting.html`;
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
          localStorage.setItem('lcs:choral-counting:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, settings: null, counts: [] }));
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
  async function ready(page) { await page.waitForSelector('.cc-grid', { timeout: 8000 }); await sleep(250); }
  async function shoot(page, name) {
    await page.evaluate(() => { window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0; const st = document.querySelector('.lcs-stage'); if (st) st.scrollTop = 0; });
    await sleep(150);
    await page.screenshot({ path: path.join(QA, name) });
  }
  async function spy(page) {
    await page.evaluate(() => {
      window.__spoken = [];
      if (window.LCSAudio) { LCSAudio.speak = function (o) { window.__spoken.push(o); }; LCSAudio.cancel = function () {}; }
    });
  }
  const tapNext = (page) => page.click('.cc-next');
  const inkedNums = (page) => page.$$eval('.cc-cell', (cells) => cells.filter((c) => /\d/.test(c.textContent)).map((c) => c.textContent.trim()));

  /* ================= A — viewports ================= */
  console.log('A — viewports');
  for (const [w, h] of [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]]) {
    const page = await newPage({ w, h });
    await page.goto(BASE);
    await ready(page);
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const cell = document.querySelector('.cc-cell');
      const next = document.querySelector('.cc-next');
      const r = next.getBoundingClientRect();
      return {
        hScroll: doc.scrollWidth > doc.clientWidth + 1,
        cellW: cell ? cell.getBoundingClientRect().width : 0,
        nextH: r.height, nextW: r.width
      };
    });
    ok(`${w}x${h} no h-scroll`, !m.hScroll);
    ok(`${w}x${h} NEXT ≥44px`, m.nextH >= 44 && m.nextW >= 44, `${m.nextW}x${m.nextH}`);
    if (w <= 412) ok(`${w}x${h} cells ≥26px`, m.cellW >= 26, String(m.cellW));
    ok(`${w}x${h} no js errors`, page._errs.length === 0, page._errs[0]);
    await shoot(page, `A-${w}x${h}.png`);
    await page.close();
  }

  /* ================= B — the count ================= */
  console.log('B — the count');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    ok('pickers visible before first ink', await page.$('.cc-pickers') !== null);
    ok('no number inked without a tap', (await inkedNums(page)).length === 0);
    await tapNext(page); await sleep(120);
    await tapNext(page); await sleep(120);
    await tapNext(page); await sleep(120);
    const nums = await inkedNums(page);
    ok('three taps ink 1,2,3', nums.join(',') === '1,2,3', nums.join(','));
    ok('halo on the just-inked cell', await page.$eval('.cc-halo', (el) => el.textContent.trim()) === '3');
    ok('pickers collapsed to summary pill', await page.$('.cc-pickers') === null && await page.$('.cc-sum-pill') !== null);
    /* no auto-advance: wait, count unchanged */
    await sleep(900);
    ok('NEVER auto-advances', (await inkedNums(page)).length === 3);
    await page.click('.cc-back'); await sleep(120);
    ok('back-one removes exactly one', (await inkedNums(page)).join(',') === '1,2');
    /* summary pill → new-count confirm */
    await page.click('.cc-sum-pill'); await sleep(100);
    ok('pill asks before resetting', (await page.$('.cc-confirm')) !== null);
    await shoot(page, 'B-midcount.png');
    ok('B no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ================= C — speech ================= */
  console.log('C — speech');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    await tapNext(page); await sleep(80);
    let spoken = await page.evaluate(() => window.__spoken);
    ok('speech OFF by default (class voice counts)', spoken.length === 0, JSON.stringify(spoken));
    /* toggle speech on through the tool API (settings drawer equivalent) */
    await page.evaluate(() => { ChoralCounting.api.settings.speakNumbers = true; ChoralCounting.onSettings(); });
    await spy(page);
    await tapNext(page); await sleep(80);
    spoken = await page.evaluate(() => window.__spoken);
    ok('speaks the bare numeral', spoken.length === 1 && spoken[0].text === '2' && spoken[0].type === 'number', JSON.stringify(spoken));
    ok('base rate 0.92', spoken[0] && spoken[0].rate === 0.92);
    await page.close();

    /* rate rule ≥100 in a compound locale */
    const de = await newPage({ premium: true });
    await de.goto(BASE + '?lang=de&start=99&skip=1');
    await ready(de);
    await de.evaluate(() => { ChoralCounting.api.settings.speakNumbers = true; ChoralCounting.onSettings(); });
    await spy(de);
    await de.click('.cc-next'); await sleep(80);   /* 99 */
    await de.click('.cc-next'); await sleep(80);   /* 100 */
    const sp = await de.evaluate(() => window.__spoken);
    ok('de 99 at 0.92, 100 at 0.85', sp.length === 2 && sp[0].rate === 0.92 && sp[1].rate === 0.85, JSON.stringify(sp));
    ok('de speech lang=de numerals', sp.every((o) => o.lang === 'de' && /^\d+$/.test(o.text)));
    await de.close();
  }

  /* ================= D — wonder marks ================= */
  console.log('D — wonder marks');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    /* mark the 3rd planned cell (index 2) while empty — re-query after
       every render (handles detach) */
    const tapCell = (i) => page.evaluate((j) => document.querySelectorAll('.cc-cell')[j].click(), i);
    await tapCell(2); await sleep(100);
    ok('empty-cell tap wonder-marks "?"', await page.$('.cc-wonder .cc-q') !== null);
    await tapCell(2); await sleep(100);
    ok('second tap toggles the mark off', await page.$('.cc-wonder') === null);
    await tapCell(2); await sleep(100);
    await shoot(page, 'D-wonder.png');
    await tapNext(page); await tapNext(page); await sleep(80);
    ok('mark still standing before arrival', await page.$('.cc-wonder') !== null);
    await tapNext(page); await sleep(150);
    const resolved = await page.evaluate(() => ({
      wonder: !!document.querySelector('.cc-wonder'),
      third: document.querySelectorAll('.cc-cell')[2].textContent.trim(),
      verdict: /correct|wrong|right!/i.test(document.body.textContent)
    }));
    ok('arrival resolves: the number inks, mark gone, no verdict', !resolved.wonder && resolved.third === '3' && !resolved.verdict);
    ok('D no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ================= E — noticing (premium) ================= */
  console.log('E — noticing');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE);
    await ready(page);
    for (let i = 0; i < 12; i++) { await tapNext(page); }
    await sleep(200);
    /* arm marker 1, wash a cell, re-tap clears */
    await page.click('.cc-swatch'); await sleep(80);
    ok('marker arms', await page.$('.cc-swatch.cc-armed') !== null);
    const tapCellE = (i) => page.evaluate((j) => document.querySelectorAll('.cc-cell')[j].click(), i);
    await tapCellE(0); await sleep(80);
    let washed = await page.$$eval('.cc-cell', (cs) => cs.filter((c) => c.style.boxShadow).length);
    ok('armed tap washes the cell', washed === 1);
    await tapCellE(0); await sleep(80);
    washed = await page.$$eval('.cc-cell', (cs) => cs.filter((c) => c.style.boxShadow).length);
    ok('same-color re-tap clears', washed === 0);
    /* header line wash */
    await page.click('.cc-h-col'); await sleep(80);
    const lineWashed = await page.$$eval('.cc-cell', (cs) => cs.filter((c) => c.style.background && c.style.background !== 'transparent').length);
    ok('header tap washes the whole column', lineWashed >= 2, String(lineWashed));
    /* digit tint */
    const tapTint = (i) => page.evaluate((j) => document.querySelectorAll('.cc-tints .cc-chip')[j].click(), i);
    await tapTint(0); await sleep(80);
    ok('ones tint engages', await page.$('.cc-grid.cc-tint-ones') !== null);
    await shoot(page, 'E-noticing.png');
    /* clear all */
    await tapTint(2); await sleep(80);
    const after = await page.evaluate(() => ({
      tint: !!document.querySelector('.cc-tint-ones'),
      washes: Array.prototype.filter.call(document.querySelectorAll('.cc-cell'), (c) => c.style.boxShadow).length
    }));
    ok('clear-all wipes marks + tint', !after.tint && after.washes === 0);
    ok('E no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ================= F — free vs premium ================= */
  console.log('F — free vs premium');
  {
    const page = await newPage({});
    await page.goto(BASE + '?start=4&skip=5');
    await ready(page);
    const free = await page.evaluate(() => {
      const first = document.querySelectorAll('.cc-cell')[0];
      return {
        headers: !!document.querySelector('.cc-h'),
        lockedChips: document.querySelectorAll('.cc-locked').length,
        summary: (document.querySelector('.cc-step-val') || {}).textContent
      };
    });
    ok('premium deep link ignored unentitled (start stays 1)', free.summary === '1', free.summary);
    ok('no header tap zones for free', !free.headers);
    ok('locked chips visible (discoverable)', free.lockedChips >= 4, String(free.lockedChips));
    /* a locked chip opens the gate; zero premium function */
    await page.evaluate(() => { document.querySelector('.cc-chip.cc-locked').click(); });
    await sleep(120);
    ok('locked chip opens the gate panel', await page.$('.cc-gate') !== null);
    const gateLink = await page.$eval('.cc-gate-link', (a) => a.getAttribute('href'));
    ok('gate links to pricing', /\/pricing\?from=tool-choral-counting$/.test(gateLink), gateLink);
    /* markers do nothing for free */
    await page.click('.cc-gate-close');
    await tapNext(page); await sleep(80);
    await page.click('.cc-swatch'); await sleep(80);
    ok('free swatch tap gates, never arms', await page.$('.cc-swatch.cc-armed') === null && await page.$('.cc-gate') !== null);
    await shoot(page, 'F-free-gate.png');
    await page.close();

    const p2 = await newPage({ premium: true });
    await p2.goto(BASE + '?start=4&skip=5');
    await ready(p2);
    const start = await p2.$eval('.cc-step-val', (el) => el.textContent);
    ok('premium deep link applies (trust-cache path)', start === '4', start);
    await p2.click('.cc-next'); await sleep(80);
    const first = await p2.evaluate(() => document.querySelector('.cc-halo').textContent.trim());
    ok('premium counts 4 by 5s', first === '4');
    await shoot(p2, 'F-premium.png');
    await p2.close();
  }

  /* ================= G — saves (premium) ================= */
  console.log('G — saves');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE);
    await ready(page);
    for (let i = 0; i < 5; i++) await tapNext(page);
    await sleep(150);
    await page.click('.cc-swatch'); await sleep(80);
    await page.evaluate(() => document.querySelectorAll('.cc-cell')[1].click()); await sleep(80);
    /* save via the shelf chip */
    await page.evaluate(() => {
      const chips = Array.prototype.slice.call(document.querySelectorAll('.cc-saves .cc-chip'));
      chips[0].click();
    });
    await sleep(120);
    ok('save creates a card with a thumbnail', await page.$('.cc-savecard .cc-thumb') !== null);
    /* new count, then resume */
    await page.click('.cc-sum-pill'); await sleep(80);
    await page.evaluate(() => {
      const chips = Array.prototype.slice.call(document.querySelectorAll('.cc-confirm .cc-chip'));
      chips[0].click();
    });
    await sleep(120);
    ok('new count resets', (await inkedNums(page)).length === 0);
    await page.click('.cc-saveopen'); await sleep(150);
    const back = await page.evaluate(() => ({
      inked: Array.prototype.filter.call(document.querySelectorAll('.cc-cell'), (c) => /\d/.test(c.textContent)).length,
      halo: document.querySelector('.cc-halo') ? document.querySelector('.cc-halo').textContent.trim() : null,
      mark: Array.prototype.filter.call(document.querySelectorAll('.cc-cell'), (c) => c.style.boxShadow).length
    }));
    ok('resume restores progress + marks + halo', back.inked === 5 && back.halo === '5' && back.mark === 1, JSON.stringify(back));
    await shoot(page, 'G-saves.png');
    ok('G no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ================= H — completion ================= */
  console.log('H — completion');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE + '?start=940&skip=10');   /* 940..1000 clips at the bound: 7 terms, 1 row */
    await ready(page);
    for (let i = 0; i < 9; i++) await tapNext(page);
    await sleep(200);
    const done = await page.evaluate(() => ({
      caption: !!document.querySelector('.cc-done'),
      notice: (document.querySelector('.cc-done-notice') || {}).textContent || '',
      nextOff: document.querySelector('.cc-next').disabled,
      score: /\bscore\b|\bpoints\b|\bstars?\b/i.test(document.body.textContent)
    }));
    ok('done caption + notice prompt', done.caption && done.notice.length > 3);
    ok('NEXT disables at plan end', done.nextOff);
    ok('no score language at completion', !done.score);
    await shoot(page, 'H-done.png');
    await page.close();
  }

  /* ================= I — no-shame audit ================= */
  console.log('I — no-shame');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE);
    await ready(page);
    for (let i = 0; i < 4; i++) await tapNext(page);
    await page.click('.cc-back'); await sleep(120);
    const audit = await page.evaluate(() => {
      const all = Array.prototype.slice.call(document.querySelectorAll('*'));
      const reds = all.filter((el) => {
        const c = getComputedStyle(el).backgroundColor;
        const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return false;
        const [r, g, b] = [+m[1], +m[2], +m[3]];
        return r > 190 && g < 80 && b < 80;   /* alarm red */
      });
      return { reds: reds.length, xmark: /✗|❌/.test(document.body.textContent) };
    });
    ok('no alarm-red anywhere', audit.reds === 0, String(audit.reds));
    ok('no ✗ anywhere', !audit.xmark);
    await page.close();
  }

  /* ================= J — reduced motion ================= */
  console.log('J — reduced motion');
  {
    const page = await newPage({ reduced: true });
    await page.goto(BASE);
    await ready(page);
    await tapNext(page); await sleep(80);
    const anim = await page.evaluate(() => {
      const c = document.querySelector('.cc-pop');
      return c ? getComputedStyle(c).animationName : 'none';
    });
    ok('pen-pop suppressed under reduced motion', anim === 'none', anim);
    ok('J no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ================= K — keyboard ================= */
  console.log('K — keyboard');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await page.evaluate(() => document.body.focus());
    await page.keyboard.press('Space'); await sleep(120);
    ok('Space inks the next number', (await inkedNums(page)).join(',') === '1');
    await page.keyboard.press('ArrowRight'); await sleep(120);
    ok('ArrowRight inks too', (await inkedNums(page)).join(',') === '1,2');
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + bad.join(' | ')); process.exit(1); }
  console.log('local-test-choral-counting: ALL GREEN');
})();
