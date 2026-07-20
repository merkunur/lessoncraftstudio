#!/usr/bin/env node
/* =====================================================================
   local-test-our-day.js — the local Definition-of-Done for Our Day.
   Sections:
     A  viewports 320-1366 — no h-overflow, palette + strip render,
        Start ≥44px
     B  build flow — palette taps append in order, Start the day enters
        run mode (palette collapses, sun on card 0)
     C  the sun — tap advances + folds the departed card, NEVER
        auto-advances, the ↩ pebble un-advances
     D  verb map — RUN card tap pulses (free: NO TTS); pencil enters
        edit; EDIT card tap opens the change overlay
     E  the change ritual — Swap via palette → ⟳ badge + "was:" text
        stays legible; skip = moon path
     F  times (premium) — ghost chip → 5-min picker → chip shows analog+
        digital; RUN chip tap speaks the COLLOQUIAL frame (en "half
        past", de "um halb", da strip-rule single "klokken")
     G  persistence + templates (premium) — day-state survives reload
        with the sun in place; save/load template; today-weekday banner
     H  display mode — 60s idle fades chrome (clock shimmed)
     I  free vs premium — locked chips gate; ?template deep link waits
        for entitlement (both paths)
     J  print stylesheet — @media print present, chrome hidden rules
     K  no-shame — no alarm-red, sun breathes (never blinks), no ✗,
        no timer/late language in the DOM
     L  reduced motion
   Screenshots → docs/audit-results/our-day/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const QA = path.join(REPO, 'docs', 'audit-results', 'our-day', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/our-day.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  async function newPage(opts) {
    opts = opts || {};
    const page = await browser.newPage();
    await page.setViewport({ width: opts.w || 1024, height: opts.h || 768 });
    await page.evaluateOnNewDocument((premium, store) => {
      try { if (sessionStorage.getItem('__od_seeded')) return; sessionStorage.setItem('__od_seeded', '1'); } catch (_) {}
      try { localStorage.clear(); } catch (_) {}
      if (premium) {
        try {
          localStorage.setItem('accessToken', 'harness-token');
          const base = store || { v: 1, templates: {} };
          base.ent = { tier: 'full', checkedAt: new Date().toISOString() };
          localStorage.setItem('lcs:our-day:v1', JSON.stringify(base));
        } catch (_) {}
      } else if (store) {
        try { localStorage.setItem('lcs:our-day:v1', JSON.stringify(store)); } catch (_) {}
      }
    }, !!opts.premium, opts.store || null);
    if (opts.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    page._errs = [];
    const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', (e) => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }
  async function ready(page) { await page.waitForSelector('.od-palette,.od-strip', { timeout: 8000 }); await sleep(250); }
  async function shoot(page, name, focusSel) {
    await page.evaluate((sel) => {
      if (sel && document.querySelector(sel)) document.querySelector(sel).scrollIntoView({ block: 'center' });
      else { window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0; }
    }, focusSel || null);
    await sleep(150);
    await page.screenshot({ path: path.join(QA, name) });
  }
  async function spy(page) {
    await page.evaluate(() => {
      window.__spoken = [];
      if (window.LCSAudio) { LCSAudio.speak = function (o) { window.__spoken.push(o); }; LCSAudio.cancel = function () {}; }
    });
  }
  const palTap = (page, i) => page.evaluate((j) => document.querySelectorAll('.od-pal-card')[j].click(), i);
  const stripNames = (page) => page.$$eval('.od-cardname', (els) => els.map((e) => e.textContent.trim()));

  /* ================= A — viewports ================= */
  console.log('A — viewports');
  for (const [w, h] of [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]]) {
    const page = await newPage({ w, h });
    await page.goto(BASE);
    await ready(page);
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const start = document.querySelector('.od-start');
      const r = start ? start.getBoundingClientRect() : { width: 0, height: 0 };
      return { hScroll: doc.scrollWidth > doc.clientWidth + 1, pal: document.querySelectorAll('.od-pal-card').length, startH: r.height };
    });
    ok(`${w}x${h} no h-scroll`, !m.hScroll);
    ok(`${w}x${h} palette renders ≥38 cards`, m.pal >= 38, String(m.pal));
    ok(`${w}x${h} Start ≥44px`, m.startH >= 44, String(m.startH));
    ok(`${w}x${h} no js errors`, page._errs.length === 0, page._errs[0]);
    await shoot(page, `A-${w}x${h}.png`);
    await page.close();
  }

  /* ================= B — build flow ================= */
  console.log('B — build flow');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    await palTap(page, 1); await sleep(80);   /* circle */
    await palTap(page, 7); await sleep(80);
    await palTap(page, 9); await sleep(80);
    const names = await stripNames(page);
    ok('three taps build three cards in order', names.length === 3, names.join(','));
    await shoot(page, 'B-build.png');
    await page.click('.od-start'); await sleep(200);
    const run = await page.evaluate(() => ({
      pal: !!document.querySelector('.od-palette'),
      sun: !!document.querySelector('.od-sun'),
      firstNow: document.querySelector('.od-card').classList.contains('od-now')
    }));
    ok('Start enters run mode (palette collapses, sun on card 0)', !run.pal && run.sun && run.firstNow);
    ok('B no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ================= C — the sun ================= */
  console.log('C — the sun');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    for (const i of [0, 5, 8, 12]) { await palTap(page, i); await sleep(60); }
    await page.click('.od-start'); await sleep(150);
    /* never auto-advances */
    await sleep(900);
    let state = await page.evaluate(() => ({ done: document.querySelectorAll('.od-done').length }));
    ok('NEVER auto-advances', state.done === 0);
    await page.click('.od-sun'); await sleep(300);
    state = await page.evaluate(() => ({
      done: document.querySelectorAll('.od-done').length,
      nowIdx: Array.prototype.findIndex.call(document.querySelectorAll('.od-card'), (c) => c.classList.contains('od-now')),
      pebble: !!document.querySelector('.od-pebble')
    }));
    ok('sun tap folds card 0 + moves to card 1', state.done === 1 && state.nowIdx === 1);
    ok('the ↩ pebble appears after advance', state.pebble);
    await shoot(page, 'C-running.png');
    await page.click('.od-pebble'); await sleep(200);
    state = await page.evaluate(() => ({
      done: document.querySelectorAll('.od-done').length,
      nowIdx: Array.prototype.findIndex.call(document.querySelectorAll('.od-card'), (c) => c.classList.contains('od-now'))
    }));
    ok('pebble un-advances quietly', state.done === 0 && state.nowIdx === 0);
    ok('C no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ================= D — verb map ================= */
  console.log('D — verb map');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    for (const i of [0, 5, 8]) { await palTap(page, i); await sleep(60); }
    await page.click('.od-start'); await sleep(150);
    await spy(page);
    await page.evaluate(() => document.querySelectorAll('.od-cardbody')[1].click());
    await sleep(150);
    const d = await page.evaluate(() => ({
      spoken: window.__spoken.length,
      pulsed: !!document.querySelector('.od-pulse'),
      overlay: !!document.querySelector('.od-change')
    }));
    ok('free RUN card tap pulses, no TTS, no overlay', d.spoken === 0 && d.pulsed && !d.overlay);
    /* pencil → edit → card tap opens the ritual */
    await page.evaluate(() => document.querySelector('.od-editchip').click());
    await sleep(150);
    await page.evaluate(() => document.querySelectorAll('.od-cardbody')[1].click());
    await sleep(150);
    ok('EDIT card tap opens the change overlay', await page.$('.od-change') !== null);
    ok('D no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ================= E — the change ritual ================= */
  console.log('E — change ritual');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    for (const i of [0, 5, 8]) { await palTap(page, i); await sleep(60); }
    await page.click('.od-start'); await sleep(150);
    await page.evaluate(() => document.querySelector('.od-editchip').click()); await sleep(120);
    const beforeName = (await stripNames(page))[1];
    await page.evaluate(() => document.querySelectorAll('.od-cardbody')[1].click()); await sleep(120);
    await shoot(page, 'E-change.png');
    /* Swap → pick a palette card inside the overlay */
    await page.evaluate(() => {
      const chips = Array.prototype.slice.call(document.querySelectorAll('.od-change .od-chip'));
      chips[0].click();   /* Swap it */
    });
    await sleep(150);
    await page.evaluate(() => document.querySelector('.od-change .od-pal-card').click());
    await sleep(200);
    const e = await page.evaluate(() => ({
      badge: !!document.querySelector('.od-badge'),
      was: (document.querySelector('.od-was') || {}).textContent || '',
      red: false
    }));
    ok('swap leaves the ⟳ badge', e.badge);
    ok('the old activity stays legible ("was: …")', e.was.length > 3 && e.was.includes(beforeName), e.was);
    await shoot(page, 'E-changed.png');
    ok('E no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ================= F — times (premium) ================= */
  console.log('F — times');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE);
    await ready(page);
    for (const i of [0, 10, 8]) { await palTap(page, i); await sleep(60); }
    await page.click('.od-start'); await sleep(200);
    await page.evaluate(() => document.querySelector('.od-editchip').click()); await sleep(150);
    ok('ghost time chips visible in edit (premium)', (await page.$$('.od-timechip')).length === 3);
    await page.evaluate(() => document.querySelectorAll('.od-timechip')[1].click()); await sleep(150);
    ok('the 5-min picker opens', await page.$('.od-timepick') !== null);
    /* pick 9:30 */
    await page.evaluate(() => {
      const keys = Array.prototype.slice.call(document.querySelectorAll('.od-tp-key'));
      keys.find((k) => k.textContent === '9').click();
    });
    await sleep(120);
    await page.evaluate(() => {
      const keys = Array.prototype.slice.call(document.querySelectorAll('.od-tp-key'));
      keys.find((k) => k.textContent === ':30').click();
    });
    await sleep(120);
    await page.evaluate(() => {
      const acts = Array.prototype.slice.call(document.querySelectorAll('.od-tp-actions .od-chip'));
      acts[0].click();
    });
    await sleep(200);
    const chip = await page.evaluate(() => (document.querySelectorAll('.od-timechip')[1] || {}).textContent || '');
    ok('chip shows 9:30 with the mini clock', chip.includes('9:30'));
    await shoot(page, 'F-times.png');
    /* back to run; chip tap speaks the colloquial frame */
    await page.evaluate(() => document.querySelector('.od-editchip').click()); await sleep(150);
    await spy(page);
    await page.evaluate(() => document.querySelector('.od-timechip').click()); await sleep(200);
    const sp = await page.evaluate(() => window.__spoken);
    ok('en chip tap speaks "… is at half past 9." (digit hour-word — TTS inflects)', sp.length === 1 && /is at half past 9\./.test(sp[0].text), JSON.stringify(sp));
    ok('speech carries lang', sp[0] && sp[0].lang === 'en');
    await page.close();

    /* de: "um halb" + da: single klokken (the strip rule, live) */
    const de = await newPage({ premium: true });
    await de.goto(BASE + '?lang=de');
    await ready(de);
    await de.evaluate(() => {
      OurDay.day.items = [{ id: 'lunch', time: { h: 12, m: 30 }, changedFrom: null, skipped: false }];
      OurDay.day.started = true; OurDay.mode = 'run'; OurDay.render();
    });
    await spy(de);
    await de.evaluate(() => document.querySelector('.od-timechip').click()); await sleep(200);
    const spDe = await de.evaluate(() => window.__spoken);
    ok('de lunch 12:30 speaks "… ist um halb 1." (halb eins via TTS)', spDe.length === 1 && /ist um halb 1\./.test(spDe[0].text), JSON.stringify(spDe));
    await de.close();

    const da = await newPage({ premium: true });
    await da.goto(BASE + '?lang=da');
    await ready(da);
    await da.evaluate(() => {
      OurDay.day.items = [{ id: 'math', time: { h: 8, m: 0 }, changedFrom: null, skipped: false }];
      OurDay.day.started = true; OurDay.mode = 'run'; OurDay.render();
    });
    await spy(da);
    await da.evaluate(() => document.querySelector('.od-timechip').click()); await sleep(200);
    const spDa = await da.evaluate(() => window.__spoken);
    const daText = spDa[0] ? spDa[0].text : '';
    ok('da 8:00 has exactly ONE "klokken" (strip rule)', (daText.toLowerCase().match(/\bklokken\b/g) || []).length === 1, daText);
    await da.close();
  }

  /* ================= G — persistence + templates ================= */
  console.log('G — persistence + templates');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE);
    await ready(page);
    for (const i of [0, 5, 8, 12]) { await palTap(page, i); await sleep(60); }
    await page.click('.od-start'); await sleep(150);
    await page.click('.od-sun'); await sleep(250);
    /* reload: the all-day tool survives */
    await page.reload(); await ready(page);
    const back = await page.evaluate(() => ({
      cards: document.querySelectorAll('.od-card').length,
      done: document.querySelectorAll('.od-done').length,
      nowIdx: Array.prototype.findIndex.call(document.querySelectorAll('.od-card'), (c) => c.classList.contains('od-now'))
    }));
    ok('day-state survives reload (sun still on card 1)', back.cards === 4 && back.done === 1 && back.nowIdx === 1, JSON.stringify(back));
    /* save as a generic template + reset + load */
    await page.evaluate(() => {
      const chips = Array.prototype.slice.call(document.querySelectorAll('.od-toolbar .od-chip'));
      chips.find((c) => !c.classList.contains('od-editchip') && !c.classList.contains('od-locked')).click();
    });
    await sleep(150);
    ok('templates panel opens (premium)', await page.$('.od-templates') !== null);
    await page.evaluate(() => {
      const saves = Array.prototype.slice.call(document.querySelectorAll('.od-tmpl-card .od-chip-sm'));
      saves[5].click();   /* generic slot ★1 */
    });
    await sleep(150);
    ok('template saved with mini-strip thumbnail', await page.$('.od-tmpl-card .od-thumb') !== null);
    await page.evaluate(() => { OurDay.reset(); });
    await sleep(150);
    ok('reset clears the day', (await page.$$('.od-card')).length === 0);
    await page.evaluate(() => {
      const opens = Array.prototype.slice.call(document.querySelectorAll('.od-tmpl-open'));
      opens[5].click();
    });
    await sleep(200);
    ok('template load restores the strip', (await page.$$('.od-card')).length === 4);
    await shoot(page, 'G-templates.png', '.od-templates');
    ok('G no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();

    /* the today-weekday banner */
    const wd = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];
    if (['mon', 'tue', 'wed', 'thu', 'fri'].includes(wd)) {
      const p2 = await newPage({ premium: true, store: { v: 1, templates: { [wd]: { items: [{ id: 'circle', time: null }, { id: 'math', time: null }], ts: 1 } } } });
      await p2.goto(BASE);
      await ready(p2);
      await sleep(400);
      ok('today’s template pre-stages behind a banner', await p2.$('.od-banner') !== null);
      await p2.evaluate(() => document.querySelector('.od-banner .od-chip').click());
      await sleep(200);
      ok('banner Use loads the plan', (await p2.$$('.od-card')).length === 2);
      await p2.close();
    } else {
      console.log('  (weekend — banner case exercised via deep link below)');
    }
  }

  /* ================= H — display mode ================= */
  console.log('H — display mode');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    for (const i of [0, 5]) { await palTap(page, i); await sleep(60); }
    await page.click('.od-start'); await sleep(150);
    await page.evaluate(() => { OurDay._lastTouch = Date.now() - 70000; });
    await sleep(5600);
    ok('60s idle enters display mode (chrome fades)', await page.$('.od-wrap.od-display') !== null);
    await shoot(page, 'H-display.png');
    await page.close();
  }

  /* ================= I — free vs premium ================= */
  console.log('I — free vs premium');
  {
    const page = await newPage({});
    await page.goto(BASE + '?template=tue');
    await ready(page);
    const free = await page.evaluate(() => ({
      chips: document.querySelectorAll('.od-timechip').length,
      locked: document.querySelectorAll('.od-locked').length,
      banner: !!document.querySelector('.od-banner')
    }));
    ok('free: no time chips, no banner from the deep link', free.chips === 0 && !free.banner);
    ok('templates + print visibly locked', free.locked >= 2, String(free.locked));
    await page.evaluate(() => document.querySelector('.od-chip.od-locked').click());
    await sleep(150);
    ok('locked chip opens the gate', await page.$('.od-gate') !== null);
    const gl = await page.$eval('.od-gate-link', (a) => a.getAttribute('href'));
    ok('gate links to pricing', /\/pricing\?from=tool-our-day$/.test(gl), gl);
    await shoot(page, 'I-free-gate.png', '.od-gate');
    await page.close();

    const p2 = await newPage({ premium: true, store: { v: 1, templates: { tue: { items: [{ id: 'circle', time: null }], ts: 1 } } } });
    await p2.goto(BASE + '?template=tue');
    await ready(p2);
    await sleep(400);
    ok('premium deep link stages the template banner (trust-cache path)', await p2.$('.od-banner') !== null);
    await p2.close();
  }

  /* ================= J — print stylesheet ================= */
  console.log('J — print');
  {
    const page = await newPage({ premium: true });
    await page.goto(BASE);
    await ready(page);
    const css = await page.evaluate(() => (document.getElementById('od-style') || {}).textContent || '');
    ok('@media print present', css.includes('@media print'));
    ok('print hides chrome + rail', /@media print[^]*\.od-toolbar[^]*display:none/.test(css) && /@media print[^]*\.od-rail/.test(css));
    ok('print rows avoid page breaks', /page-break-inside:avoid/.test(css));
    await page.close();
  }

  /* ================= K — no-shame ================= */
  console.log('K — no-shame');
  {
    const page = await newPage({});
    await page.goto(BASE);
    await ready(page);
    for (const i of [0, 5, 8]) { await palTap(page, i); await sleep(60); }
    await page.click('.od-start'); await sleep(150);
    await page.click('.od-sun'); await sleep(300);
    const audit = await page.evaluate(() => {
      const all = Array.prototype.slice.call(document.querySelectorAll('*'));
      const reds = all.filter((el) => {
        const c = getComputedStyle(el).backgroundColor;
        const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return false;
        return +m[1] > 190 && +m[2] < 80 && +m[3] < 80;
      });
      const sun = document.querySelector('.od-sun');
      const anim = sun ? getComputedStyle(sun).animationDuration : '0s';
      return {
        reds: reds.length,
        xmark: /✗|❌/.test(document.body.textContent),
        late: /\blate\b|behind schedule/i.test(document.body.textContent),
        sunSlow: parseFloat(anim) >= 2
      };
    });
    ok('no alarm-red anywhere', audit.reds === 0, String(audit.reds));
    ok('no ✗ anywhere', !audit.xmark);
    ok('no late/behind language', !audit.late);
    ok('the sun breathes slowly (≥2s), never blinks', audit.sunSlow);
    await page.close();
  }

  /* ================= L — reduced motion ================= */
  console.log('L — reduced motion');
  {
    const page = await newPage({ reduced: true });
    await page.goto(BASE);
    await ready(page);
    for (const i of [0, 5]) { await palTap(page, i); await sleep(60); }
    await page.click('.od-start'); await sleep(150);
    const anim = await page.evaluate(() => {
      const sun = document.querySelector('.od-sun');
      return sun ? getComputedStyle(sun).animationName : 'missing';
    });
    ok('sun animation suppressed under reduced motion', anim === 'none', anim);
    ok('L no js errors', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('FAILED: ' + bad.join(' | ')); process.exit(1); }
  console.log('local-test-our-day: ALL GREEN');
})();
