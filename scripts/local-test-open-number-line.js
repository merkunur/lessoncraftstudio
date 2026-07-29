#!/usr/bin/env node
/* =====================================================================
   local-test-open-number-line.js — local Definition-of-Done for #26.

   verify-open-number-line.js proves the model, the arc geometry and the
   number-word copy. This proves the thing a child's finger actually does,
   and the one claim that is a lie unless a real gesture makes it true:
   DRAGGING DRAWS THE JUMP. Nothing here is asserted from source.

     L1  the line is EMPTY — no ticks, and the only marks on it are the
         numbers the child has actually landed on
     L2  a real pointer drag draws an arc and the notation writes itself
     L3  landings are the running sum; two +10 drags from 0 reach 20
     L4  undo removes exactly ONE arc; Start over clears the jumps but
         keeps where the line began
     L5  no verdict, score, timer or Check anywhere in the DOM, ever
     L6  the landing is spoken as a number WORD in the page's locale
     L7  a free visitor cannot replay; the gate opens and closes cleanly
     L8  keyboard parity — the marker jumps without a pointer at all
     L9  viewport sweep 320-1366: dock FITS at >=768, proven REACHABLE
         below; taps >= 44px; clean console

   Usage: node scripts/local-test-open-number-line.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const QA = path.join(REPO, 'docs', 'audit-results', 'open-number-line', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const SHOT = process.argv.includes('--shot');

let pass = 0, fail = 0; const bad = [];
const ok = (n, c, x) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; bad.push(n); console.log('  FAIL ' + n + (x ? ' — ' + x : '')); } };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const f = path.join(MINI, p.replace(/^\/mini-tools\//, '').replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; return res.end(); }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
}
const VIEWPORTS = [{ w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 }, { w: 1024, h: 900 }, { w: 1366, h: 900 }];

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/open-number-line.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  async function newPage(o) {
    o = o || {};
    const page = await browser.newPage();
    await page.setViewport({ width: o.w || 1024, height: o.h || 900 });
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (/\/api\/auth\/me/.test(req.url())) {
        return req.respond({
          status: 200, contentType: 'application/json',
          body: JSON.stringify(o.premium
            ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
            : { user: { subscriptionTier: 'free' }, subscription: null })
        });
      }
      req.continue();
    });
    await page.evaluateOnNewDocument((premium) => {
      /* every note is one sine oscillator (lcs-shell Audio.pop); hooking
         start() counts them AND proves they stay soft */
      window.__notes = [];
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        const real = AC.prototype.createOscillator;
        AC.prototype.createOscillator = function () {
          const o = real.call(this);
          const rs = o.start.bind(o);
          o.start = function () { window.__notes.push({ f: o.frequency.value, t: o.type }); return rs.apply(null, arguments); };
          return o;
        };
      }
      window.__spoken = [];
      try { localStorage.clear(); if (premium) localStorage.setItem('accessToken', 'harness'); } catch (_) {}
    }, !!o.premium);

    page._errs = [];
    const benign = t => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', e => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', m => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }
  const ready = async (p) => { await p.waitForSelector('.onl-svg', { timeout: 8000 }); await sleep(280); };
  async function shoot(p, n) { if (!SHOT) return; await p.evaluate(() => window.scrollTo(0, 0)); await sleep(110); await p.screenshot({ path: path.join(QA, n) }); }
  const spy = (p) => p.evaluate(() => { window.__spoken = []; if (window.LCSAudio) LCSAudio.speak = o => window.__spoken.push(o); });

  /* -------- the pointer rig: value -> page px through the live svg ------- */
  async function dragTo(p, value) {
    const geo = await p.evaluate((v) => {
      const T = OpenNumberLine, g = T.GEOM;
      const svg = document.querySelector('.onl-svg'), r = svg.getBoundingClientRect();
      const mk = document.querySelector('.onl-marker').getBoundingClientRect();
      const x = T.xOf(v, T._view);
      return {
        fromX: mk.left + mk.width / 2, fromY: mk.top + mk.height / 2,
        toX: r.left + (x / g.W) * r.width, toY: mk.top + mk.height / 2
      };
    }, value);
    await p.mouse.move(geo.fromX, geo.fromY);
    await p.mouse.down();
    /* several moves, like a real finger */
    for (let i = 1; i <= 6; i++) {
      await p.mouse.move(geo.fromX + (geo.toX - geo.fromX) * (i / 6), geo.toY);
    }
    await p.mouse.up();
    await sleep(260);
  }
  const state = (p) => p.evaluate(() => ({
    arcs: document.querySelectorAll('.onl-arc:not(.onl-arc-live)').length,
    notes: [...document.querySelectorAll('.onl-note')].map(n => n.textContent),
    marks: document.querySelectorAll('.onl-mark').length,
    nums: [...document.querySelectorAll('.onl-num')].map(n => n.textContent),
    ticks: document.querySelectorAll('[class*="tick"]').length,
    deltas: OpenNumberLine.line.deltas.slice(),
    landing: OpenNumberLine.landing(OpenNumberLine.line),
    hint: (document.querySelector('.onl-hint') || {}).textContent || '',
    text: document.body.innerText
  }));

  /* ---------- L1 the line is EMPTY ---------- */
  console.log('\nL1 — the line is empty');
  {
    const p = await newPage({});
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const s = await state(p);
    ok('no ticks are drawn anywhere', s.ticks === 0, 'tick-ish elements: ' + s.ticks);
    ok('no arcs before the child jumps', s.arcs === 0);
    /* exactly one mark: where the line starts. Nothing is drawn where the
       child has not been — that is the whole difference from a number line. */
    ok('only the start is marked', s.marks === 1 && s.nums.length === 1, `marks ${s.marks} nums ${s.nums.length}`);
    ok('the axis is drawn', (await p.$$('.onl-axis')).length === 1);
    /* ⚠ THE MARKER MUST SIT EXACTLY ON ITS LANDING. It is an HTML button
       overlaid on the SVG, so it and the arc must share ONE coordinate
       system; 6px of padding on the sheet was once enough to drift it a
       whole friendly-step. Measure it, at several values. */
    const drift = await p.evaluate(() => {
      const T = OpenNumberLine, g = T.GEOM;
      const svg = document.querySelector('.onl-svg'), r = svg.getBoundingClientRect();
      const out = [];
      for (const v of [0, 10, 40, 77]) {
        T.line = T.newLine(v); T.render();
        const mk = document.querySelector('.onl-marker').getBoundingClientRect();
        const sv2 = document.querySelector('.onl-svg').getBoundingClientRect();
        const want = sv2.left + (T.xOf(v, T._view) / g.W) * sv2.width;
        out.push({ v: v, off: Math.abs((mk.left + mk.width / 2) - want) });
      }
      T.line = T.newLine(0); T.render();
      return out;
    });
    const worst = Math.max.apply(null, drift.map(d => d.off));
    ok('the marker is centred on its landing (one coordinate system)', worst <= 1.5,
       'worst drift ' + worst.toFixed(2) + 'px — ' + JSON.stringify(drift));
    await shoot(p, 'empty-1024.png');
    await p.close();
  }

  /* ---------- L2/L3 DRAGGING DRAWS THE JUMP ---------- */
  console.log('\nL2/L3 — a real drag draws the arc and the notation writes itself');
  {
    const p = await newPage({});
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await spy(p);
    await dragTo(p, 10);
    let s = await state(p);
    ok('one drag draws one arc', s.arcs === 1, 'arcs ' + s.arcs);
    ok('the notation wrote itself', s.notes.length === 1 && /^\+10$/.test(s.notes[0]), s.notes.join('|'));
    ok('the landing is derived from the jump', s.landing === 10 && JSON.stringify(s.deltas) === '[10]', JSON.stringify(s.deltas));
    ok('the landing is now marked too', s.marks === 2 && s.nums.indexOf('10') >= 0, s.nums.join(','));

    await dragTo(p, 20);
    s = await state(p);
    ok('a second drag adds a second arc', s.arcs === 2, 'arcs ' + s.arcs);
    ok('landings are the running sum', s.landing === 20 && JSON.stringify(s.deltas) === '[10,10]', JSON.stringify(s.deltas));
    ok('every jump keeps its own label', s.notes.length === 2 && s.notes.every(t => /^\+10$/.test(t)), s.notes.join('|'));
    await shoot(p, 'two-jumps-1024.png');

    /* a backward jump — the take-away arc must still be drawn ABOVE */
    await dragTo(p, 15);
    s = await state(p);
    const back = s.notes[s.notes.length - 1];
    ok('a backward jump labels with a real minus sign', back.indexOf('−') === 0 && back.indexOf('-') < 0, back);
    const apexAbove = await p.evaluate(() => {
      const T = OpenNumberLine, ls = T.landings(T.line);
      const ap = T.arcApex(ls[ls.length - 2], ls[ls.length - 1], T._view);
      return ap.y < T.GEOM.AXIS_Y;
    });
    ok('the take-away arc still sits above the line', apexAbove);
    await p.close();
  }

  /* ---------- L4 undo / start over ---------- */
  console.log('\nL4 — undo removes exactly one');
  {
    const p = await newPage({});
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => { OpenNumberLine._setStart(40); });
    await sleep(200);
    await dragTo(p, 50); await dragTo(p, 60); await dragTo(p, 70);
    let s = await state(p);
    ok('three drags, three arcs', s.arcs === 3, 'arcs ' + s.arcs);
    await p.evaluate(() => { [...document.querySelectorAll('.onl-linkbtn')].find(b => /undo/i.test(b.textContent)).click(); });
    await sleep(220);
    s = await state(p);
    ok('undo removed exactly one arc', s.arcs === 2, 'arcs ' + s.arcs);
    await p.evaluate(() => { [...document.querySelectorAll('.onl-linkbtn')].find(b => /start over/i.test(b.textContent)).click(); });
    await sleep(220);
    s = await state(p);
    ok('Start over clears the jumps', s.arcs === 0 && s.deltas.length === 0);
    ok('Start over keeps where the line began', s.landing === 40, 'landing ' + s.landing);
    await p.close();
  }

  /* ---------- L5 nothing is ever graded ---------- */
  console.log('\nL5 — nothing is graded');
  {
    const p = await newPage({});
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await dragTo(p, 7);           /* a deliberately un-round, "unhelpful" jump */
    const s = await state(p);
    ok('an odd jump is accepted without comment', s.arcs === 1);
    ok('no verdict language anywhere', !/wrong|incorrect|correct|well done|try again|oops/i.test(s.text), s.text.slice(0, 90));
    ok('no Check button exists', !/\bcheck\b/i.test(s.text));
    ok('no score or timer', !/score|timer|streak|point/i.test(s.text));
    ok('the hint reports progress, not judgement', /now at|jump/i.test(s.hint), s.hint);
    await p.close();
  }

  /* ---------- L6 the landing is spoken as a WORD ---------- */
  console.log('\nL6 — the landing is spoken as a number word');
  for (const [loc, want] of [['de', 'siebenundvierzig'], ['nl', 'zevenenveertig'], ['en', 'forty-seven']]) {
    const p = await newPage({});
    await p.goto(BASE + '?lang=' + loc, { waitUntil: 'domcontentloaded' }); await ready(p);
    await spy(p);
    await p.evaluate(() => { OpenNumberLine._setStart(40); });
    await sleep(200);
    await spy(p);
    await p.evaluate(() => { OpenNumberLine._jumpBy(7); });
    await sleep(300);
    const sp = await p.evaluate(() => window.__spoken || []);
    const said = sp.map(x => String(x.text)).join(' ');
    ok(`${loc} speaks the landing as a word`, said.indexOf(want) >= 0, `spoke "${said}"`);
    ok(`${loc} speaks with the right lang + type`, sp.length > 0 && sp.every(x => x.lang === loc && x.type === 'number'), JSON.stringify(sp[0] || {}));
    await p.close();
  }

  /* ---------- L7 the premium gate ---------- */
  console.log('\nL7 — replay is premium, and the gate behaves');
  {
    const p = await newPage({});
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    ok('a free visitor sees no print button', !/print this line/i.test((await state(p)).text));
    await p.evaluate(() => { [...document.querySelectorAll('.onl-locked')][0].click(); });
    await sleep(240);
    ok('the gate opens', (await p.$$('.onl-gate')).length === 1);
    const cta = await p.evaluate(() => (document.querySelector('.onl-gate-cta') || {}).getAttribute && document.querySelector('.onl-gate-cta').getAttribute('href'));
    ok('the gate links to pricing for this tool', /\/en\/pricing\?from=tool-open-number-line/.test(cta || ''), String(cta));
    await p.evaluate(() => document.querySelector('.onl-gate-close').click());
    await sleep(220);
    ok('the gate closes', (await p.$$('.onl-gate')).length === 0);
    await p.close();
  }
  {
    const p = await newPage({ premium: true });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await sleep(500);
    const t = (await state(p)).text;
    ok('a subscriber gets replay and printing', /play my thinking/i.test(t) && /print this line/i.test(t), t.slice(0, 90));
    await p.close();
  }

  /* ---------- L8 keyboard parity ---------- */
  console.log('\nL8 — the marker works from a keyboard');
  {
    const p = await newPage({});
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => document.querySelector('.onl-marker').focus());
    await p.keyboard.press('ArrowRight');
    await sleep(240);
    let s = await state(p);
    ok('ArrowRight draws a jump', s.arcs === 1 && s.deltas[0] > 0, JSON.stringify(s.deltas));
    await p.evaluate(() => document.querySelector('.onl-marker').focus());
    await p.keyboard.press('ArrowLeft');
    await sleep(240);
    s = await state(p);
    ok('ArrowLeft draws a backward jump', s.arcs === 2 && s.deltas[1] < 0, JSON.stringify(s.deltas));
    ok('a chime sounded, soft and sine', (await p.evaluate(() => window.__notes)).every(n => n.t === 'sine' && n.f <= 1200));
    await p.close();
  }

  /* ---------- L9 viewport sweep ---------- */
  console.log('\nL9 — viewport sweep');
  async function dockReachable(p, v) {
    return p.evaluate((vh) => {
      const lowest = () => {
        let low = -1, who = '';
        for (const b of document.querySelectorAll('.onl-controls button')) {
          const r = b.getBoundingClientRect();
          if (r.height && r.bottom > low) { low = r.bottom; who = b.className; }
        }
        return { low, who };
      };
      const before = lowest();
      const fits = before.low > 0 && before.low <= vh;
      const cands = [document.scrollingElement, document.documentElement, document.body].filter(Boolean);
      for (const el of cands) el.scrollTop = el.scrollHeight;
      window.scrollTo(0, document.documentElement.scrollHeight);
      const scrolled = Math.round(Math.max(window.scrollY, ...cands.map(el => el.scrollTop)));
      const after = lowest();
      const reachable = after.low > 0 && after.low <= vh + 1;
      for (const el of cands) el.scrollTop = 0;
      window.scrollTo(0, 0);
      return { fits, reachable, scrolled, who: before.who, low: Math.round(before.low) };
    }, v.h);
  }
  for (const v of VIEWPORTS) {
    const p = await newPage({ w: v.w, h: v.h });
    await p.goto(BASE + '?lang=de', { waitUntil: 'domcontentloaded' }); await ready(p);
    await dragTo(p, 10);          /* measure with content on the line */
    const m = await p.evaluate((vw) => {
      const off = [];
      for (const e of document.querySelectorAll('.lcs-stage *')) {
        const cs = getComputedStyle(e);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const r = e.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (r.right > vw + 1 || r.left < -1) off.push('offscreen ' + (e.className.baseVal || e.className || e.tagName));
      }
      const small = [...document.querySelectorAll('button')].filter(b => {
        const r = b.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
      }).map(b => (b.className || '') + ':' + Math.round(b.getBoundingClientRect().height));
      return { off: off.slice(0, 3), small };
    }, v.w);
    const reach = await dockReachable(p, v);
    ok(`${v.w}px nothing off-screen`, m.off.length === 0, m.off.join(' | '));
    ok(`${v.w}px taps >=44px`, m.small.length === 0, m.small.slice(0, 3).join(', '));
    if (v.w >= 768) ok(`${v.w}px controls FIT on screen`, reach.fits, `${reach.who} bottom ${reach.low} > ${v.h}`);
    else ok(`${v.w}px controls are REACHABLE (scroll ${reach.scrolled}px)`, reach.reachable, `${reach.who} still off-screen`);
    ok(`${v.w}px the arc still renders`, (await p.$$('.onl-arc:not(.onl-arc-live)')).length === 1);
    /* ⚠ THE "TINY" GATE, and the reason it exists: SVG text scales with the
       viewBox, so at a 340px-wide sheet the notation rendered ~8px while
       every HTML label beside it stayed 15px. The number line was the only
       thing that shrank — and the sweep passed, because nothing measured
       the RENDERED size of anything inside the SVG. Measure it. */
    const legible = await p.evaluate(() => {
      const px = (sel) => {
        const e = document.querySelector(sel);
        if (!e) return null;
        const r = e.getBoundingClientRect();
        return { h: r.height, fs: parseFloat(getComputedStyle(e).fontSize) };
      };
      const note = px('.onl-note'), num = px('.onl-num');
      /* And the marker must not sit on top of the number it landed on.
         ⚠ MEASURE THE VISIBLE DISC, NOT THE BUTTON BOX. The button is a
         44px transparent hit target (the tap gate needs that) while the
         disc drawn inside it is 26px, so measuring the box overstated the
         overlap by ~9px and reported a failure at every width including
         ones that are visibly fine. The child sees the disc. */
      const mkEl = document.querySelector('.onl-marker');
      const mk = mkEl.getBoundingClientRect();
      /* read the REAL disc size off the pseudo-element rather than
         hardcoding it — the CSS trims it on phones, and a gate carrying its
         own copy of a value the stylesheet owns will quietly go stale */
      const DISC = parseFloat(getComputedStyle(mkEl, '::after').width) || 26;
      const discBottom = (mk.top + mk.height / 2) + DISC / 2;
      const here = document.querySelector('.onl-num-here');
      const hr = here ? here.getBoundingClientRect() : null;
      const overlap = hr ? (discBottom - hr.top) : -999;
      return { note: note && note.h, num: num && num.h, overlap: Math.round(overlap) };
    });
    ok(`${v.w}px the notation is legible (>=14px)`, legible.note !== null && legible.note >= 14,
       'rendered ' + (legible.note === null ? 'missing' : legible.note.toFixed(1) + 'px'));
    ok(`${v.w}px the landing numbers are legible (>=14px)`, legible.num !== null && legible.num >= 14,
       'rendered ' + (legible.num === null ? 'missing' : legible.num.toFixed(1) + 'px'));
    ok(`${v.w}px the marker does not clip its own landing number`, legible.overlap <= 2,
       'marker overlaps the number by ' + legible.overlap + 'px');
    ok(`${v.w}px no console errors`, p._errs.length === 0, p._errs[0]);
    if ([360, 768, 1024].includes(v.w)) await shoot(p, `line-${v.w}.png`);
    await p.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('failed: ' + bad.join(' | ')); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
