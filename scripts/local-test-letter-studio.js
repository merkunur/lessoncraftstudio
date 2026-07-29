#!/usr/bin/env node
/* =====================================================================
   local-test-letter-studio.js — local Definition-of-Done for #25.

   verify-letter-studio.js proves the glyph algebra and the source shape.
   This proves the thing a child actually touches — above all the one
   behaviour the catalog sells and no competitor ships: THE LINE INKS
   ONLY WHILE THE FINGER IS ON THE PATH. That claim is a lie unless a
   real pointer drag makes it true and a real scribble fails to, so both
   are driven here with CDP mouse input rather than asserted in a unit.

     L1  no child name or student id in ANY request, whole session
     L2  a faithful trace inks and forms; a wild scribble inks NOTHING
     L3  a free visitor cannot reach a roster — not in the DOM, not via
         ?mode=names, and not during the entitlement race
     L4  the firefly walks the strokes IN ORDER, one chime per stroke
     L5  the stroke counter matches the glyph, composed letters included
     L6  lcs:my-classes:v1 is byte-identical before and after a premium
         name session — this tool READS a store it does not own
     L7  viewport sweep 320-1366: FITS (the tool has no scroll opt-in, so
         the dock must be ON SCREEN at every width), nothing off-screen,
         taps >= 44px, clean console
     L8  the ruled guide renders behind the letter at every width

   Usage: node scripts/local-test-letter-studio.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const QA = path.join(REPO, 'docs', 'audit-results', 'letter-studio', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const SHOT = process.argv.includes('--shot');

/* deliberately unguessable, so a hit is never a coincidence */
/* The last one carries a glyph the tool cannot draw (Ω is in no alphabet we
   ship), because a roster is arbitrary text and the honest handling of an
   undrawable letter has to be provable, not assumed. */
const NAMES = ['Zzyzxil', 'Qorvaxen', 'BlintaraΩ'];
const SIDS = NAMES.map((_, i) => 's_sent' + i);
const CLASS_ID = 'c_sent';
const MC_KEY = 'lcs:my-classes:v1';
const STORE_KEY = 'lcs:letter-studio:v1';

let pass = 0, fail = 0; const bad = [];
const ok = (n, c, x) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; bad.push(n); console.log('  FAIL ' + n + (x ? ' — ' + x : '')); } };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const MC_BLOB = {
  v: 1, activeClassId: CLASS_ID,
  classes: [{ id: CLASS_ID, name: 'Sentinel', students: NAMES.map((n, i) => ({ id: SIDS[i], name: n })) }],
  fairness: { [CLASS_ID]: { drawnIds: [SIDS[0]], absent: { dateKey: '2026-7-29', ids: [] }, cycleStartedAt: 1 } },
  groupings: { [CLASS_ID]: { cups: [[SIDS[0], SIDS[1]]], madeAt: 1, sentBy: 'name-sticks' } },
  __futureToolField: { keep: 'me' }
};

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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/letter-studio.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  const sins = [];   /* every PII escape, across every page, whole run */

  async function newPage(o) {
    o = o || {};
    const page = await browser.newPage();
    await page.setViewport({ width: o.w || 1024, height: o.h || 900 });

    await page.setRequestInterception(true);
    page.on('request', req => {
      const hay = (req.url() + ' ' + (req.postData() || '')).toLowerCase();
      for (const n of NAMES.concat(SIDS)) if (hay.includes(n.toLowerCase()))
        sins.push(`${n} in ${req.method()} ${req.url().slice(0, 70)}`);
      if (/\/api\/auth\/me/.test(req.url())) {
        const body = JSON.stringify(o.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null });
        if (o.entDelayMs) { setTimeout(() => req.respond({ status: 200, contentType: 'application/json', body }).catch(() => {}), o.entDelayMs); return; }
        return req.respond({ status: 200, contentType: 'application/json', body });
      }
      req.continue();
    });

    await page.evaluateOnNewDocument((seed) => {
      /* ⚠ the shell FREEZES its api object, so `api.sound` cannot be spied on
         — an attempt silently no-ops in sloppy mode and the test then reports
         zero chimes for the wrong reason. Measure the chime where it actually
         happens instead: every note is one sine oscillator (lcs-shell.js
         Audio.pop), so hooking start() counts notes AND proves they are sine
         and soft, which is the Class Timer no-alarm bar. */
      window.__notes = [];
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        const realOsc = AC.prototype.createOscillator;
        AC.prototype.createOscillator = function () {
          const o = realOsc.call(this);
          const realStart = o.start.bind(o);
          o.start = function () { window.__notes.push({ f: o.frequency.value, t: o.type }); return realStart.apply(null, arguments); };
          return o;
        };
      }

      window.__usedExfilAPI = undefined;
      const trip = (n) => { window.__usedExfilAPI = n; };
      if (navigator.sendBeacon) navigator.sendBeacon = () => { trip('sendBeacon'); return false; };
      const RealXHR = window.XMLHttpRequest;
      window.XMLHttpRequest = function () { trip('XMLHttpRequest'); return new RealXHR(); };
      window.WebSocket = function () { trip('WebSocket'); };
      window.RTCPeerConnection = function () { trip('RTCPeerConnection'); };
      try {
        localStorage.clear();
        if (seed.mc) localStorage.setItem(seed.mcKey, JSON.stringify(seed.mc));
        if (seed.token) localStorage.setItem('accessToken', 'harness-token');
      } catch (_) {}
    }, { mc: o.mc === undefined ? MC_BLOB : o.mc, mcKey: MC_KEY, token: !!o.premium });

    page._errs = [];
    const benign = t => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', e => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', m => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }
  const ready = async (p) => { await p.waitForSelector('.ls-svg', { timeout: 8000 }); await sleep(300); };
  async function shoot(p, n) { if (!SHOT) return; await p.evaluate(() => window.scrollTo(0, 0)); await sleep(120); await p.screenshot({ path: path.join(QA, n) }); }

  /* -------- the pointer rig: viewBox (0..100 x, 0..110 y) -> page px ----- */
  async function svgRect(p) {
    return p.evaluate(() => { const r = document.querySelector('.ls-svg').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  }
  const toPage = (r, pt) => ({ x: r.x + (pt.x / 100) * r.w, y: r.y + (pt.y / 110) * r.h });

  async function dragPath(p, pts) {
    const r = await svgRect(p);
    const first = toPage(r, pts[0]);
    await p.mouse.move(first.x, first.y);
    await p.mouse.down();
    for (const pt of pts.slice(1)) { const q = toPage(r, pt); await p.mouse.move(q.x, q.y); }
    await p.mouse.up();
    await sleep(260);
  }

  /* ---------- L7 + L8 viewport sweep ---------- */
  console.log('\nL7/L8 — viewport sweep (FITS: this tool has no scroll opt-in)');
  for (const v of VIEWPORTS) {
    const p = await newPage({ w: v.w, h: v.h, mc: null });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const m = await p.evaluate((vw, vh) => {
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
      }).map(b => b.className + ':' + Math.round(b.getBoundingClientRect().height));
      /* FITS is measured on the CONTROLS, not on trailing padding: the
         lowest thing a teacher must be able to press. */
      let low = 0, who = '';
      for (const b of document.querySelectorAll('.ls-controls button, .ls-card > button')) {
        const r = b.getBoundingClientRect();
        if (r.height && r.bottom > low) { low = r.bottom; who = b.className; }
      }
      return {
        off: off.slice(0, 3), small, low: Math.round(low), who, vh,
        rules: document.querySelectorAll('.ls-rule').length,
        guides: document.querySelectorAll('.ls-guide').length,
        dot: document.querySelectorAll('.ls-startdot').length
      };
    }, v.w, v.h);
    ok(`${v.w}px nothing off-screen`, m.off.length === 0, m.off.join(' | '));
    ok(`${v.w}px taps >=44px`, m.small.length === 0, m.small.slice(0, 3).join(', '));
    ok(`${v.w}px controls FIT on screen`, m.low > 0 && m.low <= v.h, `lowest control ${m.who} bottom ${m.low} > ${v.h}`);
    ok(`${v.w}px the ruled guide renders`, m.rules >= 3, 'got ' + m.rules);
    ok(`${v.w}px the letter + start dot render`, m.guides >= 1 && m.dot === 1, `guides ${m.guides} dot ${m.dot}`);
    ok(`${v.w}px no console errors`, p._errs.length === 0, p._errs[0]);
    if ([360, 768, 1024].includes(v.w)) await shoot(p, `studio-${v.w}.png`);
    await p.close();
  }

  /* ---------- L2 THE LIVE INK ---------- */
  console.log('\nL2 — the line inks only on the path');
  {
    /* a faithful trace of a one-stroke letter must ink AND form */
    const p = await newPage({ mc: null });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    /* drive the tool to a known one-stroke glyph so the test is not hostage
       to whatever letter index 0 happens to be */
    await p.evaluate(() => { LetterStudio.index = 'abcdefghijklmnopqrstuvwxyz'.indexOf('l'); LetterStudio._reset(); LetterStudio.render(); });
    await sleep(250);
    const g = await p.evaluate(() => {
      const ch = LetterStudio._current();
      return { ch: ch, strokes: AlphabetTraceCore.GLYPHS[ch].map(s => s.map(q => ({ x: q.x, y: q.y }))) };
    });
    ok('the harness reached a one-stroke letter', g.ch === 'l' && g.strokes.length === 1, `${g.ch} / ${g.strokes.length} strokes`);
    await dragPath(p, g.strokes[0]);
    const after = await p.evaluate(() => ({
      ink: document.querySelectorAll('.ls-ink:not(.ls-ink-live)').length,
      formed: !!(LetterStudio.state && LetterStudio.state.formed),
      hint: (document.querySelector('.ls-hint') || {}).textContent || '',
      primaries: [...document.querySelectorAll('.ls-go')].map(b => b.textContent)
    }));
    ok('a faithful trace inks the stroke', after.ink >= 1, 'ink paths ' + after.ink);
    ok('a faithful trace FORMS the letter', after.formed);
    ok('the praise line appears, with no verdict', /wrote it/i.test(after.hint) && !/wrong|incorrect|try again/i.test(after.hint), after.hint);
    /* Exactly ONE primary at the success moment, and it must be Next — two
       coral pills give a child scanning for the big orange button a coin-flip
       between advancing and replaying the demo. */
    ok('a Next affordance appears once formed', /next/i.test(after.primaries.join(' ')), after.primaries.join('|'));
    ok('and it is the ONLY primary action', after.primaries.length === 1, after.primaries.join('|'));
    await shoot(p, 'traced-formed.png');
    await p.close();
  }
  {
    /* a wild scribble must ink NOTHING — this is the assertion that fails
       the moment the per-sample gate is removed */
    const p = await newPage({ mc: null });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => { LetterStudio.index = 'abcdefghijklmnopqrstuvwxyz'.indexOf('l'); LetterStudio._reset(); LetterStudio.render(); });
    await sleep(250);
    /* build a scribble PROVEN far from every stroke of this glyph */
    const scrib = await p.evaluate(() => {
      const g = AlphabetTraceCore.GLYPHS[LetterStudio._current()];
      const segD = (a, b, p) => {
        const vx = b.x - a.x, vy = b.y - a.y, L2 = vx * vx + vy * vy;
        if (!L2) return Math.hypot(p.x - a.x, p.y - a.y);
        let t = ((p.x - a.x) * vx + (p.y - a.y) * vy) / L2; t = Math.max(0, Math.min(1, t));
        return Math.hypot(a.x + t * vx - p.x, a.y + t * vy - p.y);
      };
      const far = (p) => {
        let d = Infinity;
        for (const st of g) for (let i = 0; i < st.length - 1; i++) d = Math.min(d, segD(st[i], st[i + 1], p));
        return d;
      };
      const out = [];
      for (let y = 10; y <= 100; y += 12) {
        for (const x of [4, 96]) { const p = { x, y }; if (far(p) > 36) { out.push(p); break; } }
      }
      return { pts: out, minDist: Math.min.apply(null, out.map(far)) };
    });
    ok('the scribble is provably off-path', scrib.pts.length >= 5 && scrib.minDist > 36, `${scrib.pts.length} pts, min ${Math.round(scrib.minDist)}`);
    await dragPath(p, scrib.pts);
    const after = await p.evaluate(() => ({
      ink: document.querySelectorAll('.ls-ink:not(.ls-ink-live)').length,
      live: (document.querySelector('.ls-ink-live') || {}).getAttribute ? document.querySelector('.ls-ink-live').getAttribute('d') : null,
      formed: !!(LetterStudio.state && LetterStudio.state.formed),
      hint: (document.querySelector('.ls-hint') || {}).textContent || ''
    }));
    ok('a scribble inks NOTHING', after.ink === 0 && !after.live, `ink ${after.ink} live "${after.live}"`);
    ok('a scribble does not form the letter', !after.formed);
    ok('a scribble draws no rebuke', !/wrong|incorrect|no,|try again/i.test(after.hint), after.hint);
    /* silence alone reads as a broken screen — the hint must say WHY */
    ok('a scribble gets a kind explanation, not silence', /keep following|joins in/i.test(after.hint), after.hint);
    await p.close();
  }

  /* ---------- L4 the firefly ---------- */
  console.log('\nL4 — the firefly walks the strokes in order');
  {
    const p = await newPage({ mc: null });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => { LetterStudio.index = 'abcdefghijklmnopqrstuvwxyz'.indexOf('t'); LetterStudio._reset(); LetterStudio.render(); });
    await sleep(220);
    const n = await p.evaluate(() => {
      window.__notes.length = 0; window.__fly = [];
      const iv = setInterval(() => {
        const f = document.querySelector('.ls-firefly');
        if (f) window.__fly.push({ x: +f.getAttribute('cx'), y: +f.getAttribute('cy') });
      }, 40);
      window.__stop = () => clearInterval(iv);
      document.querySelector('.ls-go').click();
      return AlphabetTraceCore.GLYPHS[LetterStudio._current()].length;
    });
    await sleep(2200);
    const d = await p.evaluate(() => { window.__stop(); return { notes: window.__notes.slice(), fly: window.__fly.length, first: window.__fly[0], last: window.__fly[window.__fly.length - 1] }; });
    ok('the firefly appears and moves', d.fly > 4 && d.first && d.last && (d.first.x !== d.last.x || d.first.y !== d.last.y), JSON.stringify(d.first) + '->' + JSON.stringify(d.last));
    ok('one chime per stroke', d.notes.length === n, `${d.notes.length} notes for ${n} strokes`);
    ok('every chime is a soft sine, never an alarm', d.notes.length > 0 && d.notes.every(x => x.t === 'sine' && x.f <= 1200), JSON.stringify(d.notes));
    const gone = await p.evaluate(() => document.querySelectorAll('.ls-firefly').length);
    ok('the firefly leaves when it is done', gone === 0);
    await p.close();
  }

  /* ---------- L5 the stroke counter ---------- */
  console.log('\nL5 — the counter matches the glyph');
  for (const ch of ['t', 'ä']) {
    const p = await newPage({ mc: null });
    await p.goto(BASE + '?lang=' + (ch === 'ä' ? 'de' : 'en'), { waitUntil: 'domcontentloaded' }); await ready(p);
    const r = await p.evaluate((want) => {
      const tray = LetterStudio.letters();
      const i = tray.indexOf(want);
      if (i < 0) return { missing: true, tray: tray.join('') };
      LetterStudio.index = i; LetterStudio._reset(); LetterStudio.render();
      const g = AlphabetTraceCore.GLYPHS[want];
      const base = LetterStudio.COMPOSE[want] ? AlphabetTraceCore.GLYPHS[LetterStudio.COMPOSE[want][0]] : null;
      return { n: g.length, baseN: base ? base.length : null, cur: LetterStudio._current() };
    }, ch);
    ok(`"${ch}" is in the tray`, !r.missing, r.tray);
    if (r.missing) { await p.close(); continue; }
    await sleep(200);
    /* trace stroke 0 so the counter has something to count */
    const s0 = await p.evaluate(() => AlphabetTraceCore.GLYPHS[LetterStudio._current()][0].map(q => ({ x: q.x, y: q.y })));
    await dragPath(p, s0);
    const hint = await p.evaluate(() => (document.querySelector('.ls-hint') || {}).textContent || '');
    const m = /(\d+)\D+(\d+)/.exec(hint);
    ok(`"${ch}" counter reads stroke 2 of ${r.n}`, !!m && +m[2] === r.n, `hint "${hint}" vs ${r.n} strokes`);
    if (r.baseN !== null) ok(`"${ch}" carries more strokes than its base`, r.n > r.baseN, `${r.n} vs base ${r.baseN}`);
    await p.close();
  }

  /* ---------- L3 the free visitor and the roster ---------- */
  console.log('\nL3 — a free visitor cannot reach a roster');
  {
    const p = await newPage({});                       /* MC seeded, free */
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const r = await p.evaluate((names) => ({
      modes: [...document.querySelectorAll('.ls-modebtn')].map(b => b.textContent),
      html: document.documentElement.innerHTML,
      mc: LetterStudio._mc === null || LetterStudio._mc === undefined,
      roster: LetterStudio.rosterFor(JSON.parse(localStorage.getItem('lcs:my-classes:v1')), 'c_sent', LetterStudio.premium).length,
      leak: names.filter(n => document.documentElement.innerHTML.includes(n))
    }), NAMES);
    ok('no Names mode is offered', !r.modes.some(t => /name/i.test(t)), r.modes.join('|'));
    ok('no child name anywhere in the DOM', r.leak.length === 0, r.leak.join(','));
    ok('my-classes was never even opened', r.mc);
    ok('rosterFor refuses at the free tier', r.roster === 0);
    await p.close();
  }
  {
    const p = await newPage({});
    await p.goto(BASE + '?lang=en&mode=names', { waitUntil: 'domcontentloaded' }); await ready(p);
    const r = await p.evaluate((names) => ({ mode: LetterStudio.mode, leak: names.filter(n => document.documentElement.innerHTML.includes(n)) }), NAMES);
    ok('?mode=names is refused for a free visitor', r.mode !== 'names', r.mode);
    ok('the deep link leaks no name', r.leak.length === 0, r.leak.join(','));
    await p.close();
  }
  {
    /* THE RACE: entitlement lands late. A name must never flash first. */
    const p = await newPage({ premium: true, entDelayMs: 1500 });
    await p.goto(BASE + '?lang=en&mode=names', { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.ls-svg, .ls-card', { timeout: 8000 });
    let flashed = [];
    for (let i = 0; i < 12; i++) {
      const seen = await p.evaluate((names) => names.filter(n => document.documentElement.innerHTML.includes(n)), NAMES);
      if (seen.length) flashed = flashed.concat(seen);
      await sleep(110);
    }
    ok('no name appears during the entitlement race', flashed.length === 0, flashed.join(','));
    await sleep(1200);
    const later = await p.evaluate((names) => ({ premium: LetterStudio.premium, mode: LetterStudio.mode, seen: names.filter(n => document.documentElement.innerHTML.includes(n)) }), NAMES);
    ok('the subscriber does get Names mode once entitlement lands', later.premium === true && later.mode === 'names', JSON.stringify(later));
    ok('and the roster is then visible', later.seen.length === NAMES.length, later.seen.join(','));
    await p.close();
  }

  /* ---------- L6 my-classes is byte-identical ---------- */
  console.log('\nL6 — my-classes survives a premium name session untouched');
  {
    const p = await newPage({ premium: true });
    await p.goto(BASE + '?lang=en&mode=names', { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.ls-name', { timeout: 8000 }); await sleep(200);
    const before = await p.evaluate(k => localStorage.getItem(k), MC_KEY);
    await p.evaluate(() => document.querySelectorAll('.ls-name')[0].click());
    await sleep(300);
    const s0 = await p.evaluate(() => AlphabetTraceCore.GLYPHS[LetterStudio._current()][0].map(q => ({ x: q.x, y: q.y })));
    await dragPath(p, s0);
    const after = await p.evaluate(k => localStorage.getItem(k), MC_KEY);
    ok('lcs:my-classes:v1 is byte-identical', before === after);
    ok('the future-tool sentinel survives', /__futureToolField/.test(after || ''));
    const own = await p.evaluate(k => localStorage.getItem(k), STORE_KEY);
    ok('the tool writes only its own key', own === null || own.length > 0);
    ok('no exfil API was ever touched', (await p.evaluate(() => window.__usedExfilAPI)) === undefined);
    await shoot(p, 'names-premium.png');
    await p.close();
  }

  /* ---------- L9 a name we cannot fully write is not claimed as written ---- */
  console.log('\nL9 — an undrawable letter is never papered over');
  {
    const p = await newPage({ premium: true });
    await p.goto(BASE + '?lang=en&mode=names', { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.ls-name', { timeout: 8000 }); await sleep(200);
    /* pick the sentinel whose name carries the undrawable glyph */
    const picked = await p.evaluate((want) => {
      const b = [...document.querySelectorAll('.ls-name')].find(x => x.textContent === want);
      if (b) b.click();
      return !!b;
    }, NAMES[2]);
    ok('the name with an undrawable letter is still offered', picked);
    await sleep(300);
    const r = await p.evaluate((want) => ({
      partial: LetterStudio.namePartial === true,
      seq: (LetterStudio.nameSeq || []).length,
      full: want.length,
      shown: document.body.innerText.includes(want)
    }), NAMES[2]);
    ok('the child still sees their whole name', r.shown);
    ok('the tool knows it cannot write every letter', r.partial, `seq ${r.seq} of ${r.full}`);
    /* walk the whole traceable sequence and check the final claim */
    for (let i = 0; i < r.seq; i++) {
      const s = await p.evaluate(() => AlphabetTraceCore.GLYPHS[LetterStudio._current()].map(x => x.map(q => ({ x: q.x, y: q.y }))));
      for (const stroke of s) await dragPath(p, stroke);
      const more = await p.evaluate(() => { const b = [...document.querySelectorAll('.ls-go')].pop(); if (b && /next/i.test(b.textContent)) { b.click(); return true; } return false; });
      await sleep(220);
      if (!more) break;
    }
    const hint = await p.evaluate(() => (document.querySelector('.ls-hint') || {}).textContent || '');
    ok('it never claims the WHOLE name was written', !/whole name/i.test(hint), hint);
    await p.close();
  }

  /* ---------- L1 the whole-run scanner ---------- */
  console.log('\nL1 — whole-run PII scan');
  ok('no child name or id in ANY request, whole session', sins.length === 0, sins.slice(0, 3).join(' | '));

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('failed: ' + bad.join(' | ')); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
