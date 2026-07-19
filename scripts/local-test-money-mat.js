#!/usr/bin/env node
/* =====================================================================
   local-test-money-mat.js — the local Definition-of-Done for Money Mat.
   Sections:
     A  viewports 320-1366 — no h-overflow, NO-SCROLL ≥768, visible tap
        targets ≥44px
     B  the shop flow — purse taps place coins (total + clinks), mat
        taps return them, exact pay celebrates + invites another way,
        an IDENTICAL multiset leaves the invitation standing (silently),
        a DIFFERING one completes the both-ways panel
     C  the speaker chip — empty-mat line, then the spoken total
        template with unit words
     D  currencies — de comma-euro format, sv whole-krona tag, the en
        USD→GBP settings toggle swaps the purse
     E  change mode (premium) — only valid tenders offered; tap-accept
        counts on coin-by-coin to EXACTLY the tender; strip shows the
        running amounts
     F  free vs premium — ?band=3 unentitled stays band 1 with locked
        chips + gate; premium honors bands + notes in the purse
     G  no-shame audit — the keeper's face NEVER changes across events;
        no alarm-red/verdict-green; no ✗
     H  reduced motion   I  keyboard reachability
   Screenshots → docs/audit-results/money-mat/qa/
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
const QA = path.join(REPO, 'docs', 'audit-results', 'money-mat', 'qa');
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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/money-mat.html`;
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
          localStorage.setItem('lcs:money-mat:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, settings: null, stalls: [] }));
        } catch (_) {}
      }
    }, !!opts.premium);
    if (opts.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    if (opts.lang) { /* handled via url */ }
    page._errs = [];
    const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', (e) => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }
  async function ready(page) { await page.waitForSelector('.mm-scene', { timeout: 8000 }); await sleep(250); }
  async function spy(page) {
    await page.evaluate(() => {
      window.__spoken = [];
      if (window.LCSAudio) { LCSAudio.speak = function (o) { window.__spoken.push(o.text); }; LCSAudio.cancel = function () {}; }
      window.__notes = 0;
      const Real = AudioContext.prototype.createOscillator;
      AudioContext.prototype.createOscillator = function () { window.__notes++; return Real.call(this); };
    });
  }
  const clickCoin = async (page, v) => {
    await page.evaluate((v) => {
      const b = [...document.querySelectorAll('.mm-purse .mm-coinbtn, .mm-purse .mm-notebtn')].find((x) => Number(x.dataset.v) === v);
      b.click();
    }, v);
    await sleep(120);
  };

  /* ============================ A: viewports ============================ */
  console.log('A. viewport sweep');
  for (const [w, h] of [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]]) {
    const page = await newPage({ w, h });
    await page.goto(BASE);
    await ready(page);
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const tiny = [];
      document.querySelectorAll('button, a').forEach((b) => {
        const r = b.getBoundingClientRect();
        const cs = getComputedStyle(b);
        if (r.width === 0 || cs.pointerEvents === 'none' || parseFloat(cs.opacity) < 0.05) return;
        if (r.width < 44 || r.height < 44) tiny.push(`${(b.textContent || b.className).trim().slice(0, 16)} ${Math.round(r.width)}x${Math.round(r.height)}`);
      });
      return { hOver: doc.scrollWidth - doc.clientWidth, vOver: doc.scrollHeight - doc.clientHeight, tiny };
    });
    ok(`${w}x${h} no h-overflow`, m.hOver <= 1, `${m.hOver}px`);
    if (w >= 768) ok(`${w}x${h} NO-SCROLL`, m.vOver <= 2, `${m.vOver}px`);
    ok(`${w}x${h} tap targets ≥44`, m.tiny.length === 0, m.tiny.join('; '));
    await page.screenshot({ path: path.join(QA, `A-${w}x${h}.png`) });
    ok(`${w}x${h} no js errors`, page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ B: the shop flow ======================== */
  console.log('B. shop — place, return, exact pay, another way');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    /* pin a known price: 45c, USD */
    await page.evaluate(() => {
      const T = MoneyMat;
      T.price = 45; T.tray = []; T.phase = 'paying'; T.firstWay = null; T.dismissedInvite = false;
      T.render();
    });
    await sleep(200);
    await page.evaluate(() => { window.__notes = 0; });
    await clickCoin(page, 25);
    await clickCoin(page, 10);
    let st = await page.evaluate(() => ({ total: MoneyMat.trayTotal(), text: document.querySelector('.mm-total').textContent, notes: window.__notes, coins: document.querySelectorAll('.mm-mat .mm-coinbtn').length }));
    ok('two placements → total 35 + clinks', st.total === 35 && /35/.test(st.text) && st.notes >= 4 && st.coins === 2, JSON.stringify(st));
    /* return one */
    await page.evaluate(() => { document.querySelectorAll('.mm-mat .mm-coinbtn')[1].click(); });
    await sleep(150);
    st = await page.evaluate(() => ({ total: MoneyMat.trayTotal(), coins: document.querySelectorAll('.mm-mat .mm-coinbtn').length }));
    ok('mat tap returns the coin', st.total === 25 && st.coins === 1);
    /* exact pay: +10 +10 → 45 */
    await page.evaluate(() => { window.__spoken = []; });
    await clickCoin(page, 10);
    await clickCoin(page, 10);
    await sleep(300);
    st = await page.evaluate(() => ({
      phase: MoneyMat.phase,
      spoke: window.__spoken.some((s) => /45|dollar|cent/i.test(s)),
      invite: !!document.querySelector('.mm-invite')
    }));
    ok('exact pay celebrates + invites another way', st.phase === 'invited' && st.spoke && st.invite, JSON.stringify(st));
    await page.screenshot({ path: path.join(QA, 'B-paid-invited.png') });
    /* accept the invitation; the IDENTICAL multiset leaves it standing */
    await page.evaluate(() => { document.querySelector('.mm-invite .mm-chip.primary').click(); });
    await sleep(200);
    await clickCoin(page, 25); await clickCoin(page, 10); await clickCoin(page, 10);
    await sleep(300);
    st = await page.evaluate(() => ({ phase: MoneyMat.phase, both: !!document.querySelector('.mm-bothways') }));
    ok('identical multiset stays in secondWay (no scolding, no completion)', st.phase === 'secondWay' && !st.both);
    /* differing multiset completes both-ways */
    await page.evaluate(() => { [...document.querySelectorAll('.mm-mat .mm-coinbtn')].forEach(() => document.querySelector('.mm-mat .mm-coinbtn').click()); });
    await sleep(250);
    await page.evaluate(() => { window.__spoken = []; });
    for (const v of [25, 5, 5, 10]) await clickCoin(page, v);
    await sleep(350);
    st = await page.evaluate(() => ({ phase: MoneyMat.phase, both: !!document.querySelector('.mm-bothways'), ways: document.querySelectorAll('.mm-bothways .mm-way').length }));
    ok('differing multiset completes both-ways side by side', st.phase === 'bothWays' && st.both && st.ways === 2, JSON.stringify(st));
    await page.screenshot({ path: path.join(QA, 'B-bothways.png') });
    ok('B no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ C: the speaker chip ===================== */
  console.log('C. spoken total');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    await page.evaluate(() => { const T = MoneyMat; T.price = 45; T.tray = []; T.phase = 'paying'; T.render(); });
    await sleep(150);
    await page.evaluate(() => { window.__spoken = []; document.querySelector('.mm-speak').click(); });
    let sp = await page.evaluate(() => window.__spoken.join('|'));
    ok('empty mat speaks the empty line', /empty/i.test(sp), sp);
    await clickCoin(page, 25);
    await page.evaluate(() => { window.__spoken = []; document.querySelector('.mm-speak').click(); });
    sp = await page.evaluate(() => window.__spoken.join('|'));
    ok('spoken total uses the unit words', /25 cents/.test(sp), sp);
    ok('C no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ D: currencies =========================== */
  console.log('D. currencies + formats');
  {
    const page = await newPage({});
    await page.goto(BASE + '?lang=de');
    await ready(page);
    let m = await page.evaluate(() => ({
      fm: MoneyMat.formatMoney(230),
      sym: [...document.querySelectorAll('.mm-purse .mm-coinbtn')].some((b) => /€/.test(b.getAttribute('aria-label')) || /c$/.test(b.getAttribute('aria-label')))
    }));
    ok('de: comma-euro format "2,30 €"', m.fm === '2,30 €', m.fm);
    ok('de: euro coins in the purse', m.sym);
    await page.close();
    const p2 = await newPage({});
    await p2.goto(BASE + '?lang=sv');
    await ready(p2);
    m = await p2.evaluate(() => ({ tag: document.querySelector('.mm-tag-body').textContent, coins: document.querySelectorAll('.mm-purse .mm-coinbtn').length }));
    ok('sv: whole-krona tag "N kr"', /^\d+ kr$/.test(m.tag), m.tag);
    ok('sv: 4 krona coins', m.coins === 4, String(m.coins));
    await p2.close();
    const p3 = await newPage({});
    await p3.goto(BASE);
    await ready(p3);
    await p3.evaluate(() => { MoneyMat.api.settings.enCurrency = 'gbp'; MoneyMat.onSettings(); });
    await sleep(250);
    m = await p3.evaluate(() => ({
      labels: [...document.querySelectorAll('.mm-purse .mm-coinbtn')].map((b) => b.getAttribute('aria-label')).join(','),
      n: document.querySelectorAll('.mm-purse .mm-coinbtn').length
    }));
    ok('en GBP toggle swaps the purse to pence/pounds', /1p/.test(m.labels) && /£1/.test(m.labels) && m.n === 8, m.labels);
    ok('D no js errors', page._errs.length === 0 && p3._errs.length === 0, page._errs[0] || p3._errs[0]);
    await p3.close();
  }

  /* ============================ E: change mode (premium) ================ */
  console.log('E. change mode — valid tenders, tap-accept count-on');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    await page.evaluate(() => {
      const T = MoneyMat;
      T.mode = 'change'; T.price = 45; T.tray = []; T.phase = 'changePick'; T.chg = null;
      T.render();
    });
    await sleep(200);
    let st = await page.evaluate(() => ({
      tenders: [...document.querySelectorAll('.mm-purse .mm-coinbtn, .mm-purse .mm-notebtn')].map((b) => Number(b.dataset.v)),
      line: !!document.querySelector('.mm-changeline')
    }));
    ok('change mode offers only valid tenders (> price)', st.tenders.length >= 1 && st.tenders.every((v) => v > 45), JSON.stringify(st.tenders));
    /* pick the $1 tender (100) → change 55 = 5+25+25 ascending */
    await page.evaluate(() => { window.__spoken = []; });
    await clickCoin(page, 100);
    await sleep(250);
    st = await page.evaluate(() => ({ phase: MoneyMat.phase, coins: MoneyMat.chg && MoneyMat.chg.coins.slice(), strip: !!document.querySelector('.mm-countstrip') }));
    ok('tender picked → count begins with the strip', st.phase === 'changeCount' && st.strip && st.coins.join(',') === '5,25,25', JSON.stringify(st.coins));
    /* tap-accept each offered coin */
    let spokeOn = 0;
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => { window.__spoken = []; document.querySelector('.mm-offer .mm-coinbtn, .mm-offer .mm-notebtn').click(); });
      await sleep(200);
      const s2 = await page.evaluate(() => window.__spoken.join('|'));
      if (/makes|dollar|cent/i.test(s2)) spokeOn++;
    }
    st = await page.evaluate(() => ({ run: MoneyMat.chg.run, tender: MoneyMat.chg.tender, idx: MoneyMat.chg.idx, offer: !!document.querySelector('.mm-offer') }));
    ok('count-on terminates at EXACTLY the tender', st.run === st.tender && st.idx === 3 && !st.offer, JSON.stringify(st));
    ok('each accepted coin spoke the counting-on line', spokeOn === 3, String(spokeOn));
    await page.screenshot({ path: path.join(QA, 'E-change-done.png') });
    ok('E no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ F: free vs premium ====================== */
  console.log('F. free vs premium');
  {
    const page = await newPage({});
    await page.goto(BASE + '?band=3');
    await ready(page);
    let st = await page.evaluate(() => ({
      band: MoneyMat.band,
      locked: document.querySelectorAll('.mm-chip.locked').length,
      notes: document.querySelectorAll('.mm-purse .mm-notebtn').length
    }));
    ok('unentitled ?band=3 stays band 1', st.band === 1);
    ok('premium chips locked + no notes in the purse', st.locked >= 3 && st.notes === 0, JSON.stringify(st));
    await page.evaluate(() => { [...document.querySelectorAll('.mm-chip.locked')][0].click(); });
    await sleep(250);
    st = await page.evaluate(() => ({ gate: !!document.querySelector('.mm-gate'), href: document.querySelector('.mm-gate a') && document.querySelector('.mm-gate a').getAttribute('href'), band: MoneyMat.band }));
    ok('locked chip gates instead of switching', st.gate && st.band === 1);
    ok('gate links to pricing with from=', /from=tool-money-mat/.test(st.href || ''), st.href);
    await page.screenshot({ path: path.join(QA, 'F-free-gate.png') });
    const p2 = await newPage({ premium: true });
    await p2.goto(BASE + '?band=3');
    await ready(p2);
    await sleep(400);
    st = await p2.evaluate(() => ({ band: MoneyMat.band, notes: document.querySelectorAll('.mm-purse .mm-notebtn').length }));
    ok('premium honors ?band=3 + notes appear', st.band === 3 && st.notes >= 2, JSON.stringify(st));
    await p2.screenshot({ path: path.join(QA, 'F-premium-band3.png') });
    ok('F no js errors', page._errs.length === 0 && p2._errs.length === 0, page._errs[0] || p2._errs[0]);
    await page.close(); await p2.close();
  }

  /* ============================ G: no-shame audit ======================= */
  console.log('G. no-shame audit');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await spy(page);
    const faceBefore = await page.evaluate(() => document.querySelector('.mm-keeper').innerHTML);
    await page.evaluate(() => { const T = MoneyMat; T.price = 45; T.tray = []; T.phase = 'paying'; T.render(); });
    await clickCoin(page, 25);   /* under-pay */
    await clickCoin(page, 25);   /* over-pay  */
    await sleep(300);
    const audit = await page.evaluate(() => {
      const badColors = [];
      const isBad = (col) => {
        const m = col && col.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return false;
        const [r, g, b] = [+m[1], +m[2], +m[3]];
        return (r > 185 && g < 90 && b < 90) || (g > 150 && r < 100 && b < 100);
      };
      document.querySelectorAll('.mm-wrap *').forEach((el) => {
        const s = getComputedStyle(el);
        [s.color, s.backgroundColor, s.borderColor].forEach((col) => { if (isBad(col)) badColors.push(el.className + ':' + col); });
      });
      return { badColors: badColors.slice(0, 3), glyphs: /[✗✘❌]/.test(document.body.textContent), face: document.querySelector('.mm-keeper').innerHTML };
    });
    ok('keeper face NEVER changes with child actions', audit.face === faceBefore);
    ok('no alarm-red / verdict-green anywhere', audit.badColors.length === 0, audit.badColors.join('; '));
    ok('no ✗ glyphs', !audit.glyphs);
    /* over/under-pay is SILENT (no speech until exact) */
    const spoke = await page.evaluate(() => window.__spoken.length);
    ok('over/under-pay stays verbally silent', spoke === 0, String(spoke));
    ok('G no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ H: reduced motion ======================= */
  console.log('H. reduced motion');
  {
    const page = await newPage({ reduced: true });
    await page.goto(BASE);
    await ready(page);
    await page.evaluate(() => { const T = MoneyMat; T.price = 30; T.tray = []; T.phase = 'paying'; T.render(); });
    await clickCoin(page, 25); await clickCoin(page, 5);
    await sleep(300);
    const st = await page.evaluate(() => MoneyMat.phase);
    ok('reduced motion: exact pay still completes', st === 'invited');
    ok('H no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ I: keyboard ============================= */
  console.log('I. keyboard reachability');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    const kb = await page.evaluate(() => {
      const coins = [...document.querySelectorAll('.mm-purse .mm-coinbtn')];
      coins[0].focus();
      return {
        focusable: document.activeElement.classList.contains('mm-coinbtn'),
        allButtons: [...document.querySelectorAll('.mm-coinbtn, .mm-notebtn, .mm-chip, .mm-speak')].every((b) => b.tagName === 'BUTTON')
      };
    });
    ok('purse coins are focusable buttons', kb.focusable);
    ok('all interactive elements are real <button>s', kb.allButtons);
    ok('I no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + bad.join(' · ')); process.exit(1); }
  console.log('local-test-money-mat: ALL GREEN');
})();
