#!/usr/bin/env node
/* =====================================================================
   local-test-feelings-check-in.js — local Definition-of-Done for #24.

   The gate proves the pure engine and the source. This proves the thing
   a teacher actually gets, and it holds the PRIVACY bar set by Hush Owl
   rather than the weaker request-sniff, because this tool holds a named
   child's emotional state.

     L1  no roster name or student id in ANY request, whole session
     L2  zero WebSockets (CDP) and no exfil API ever touched
     L3  THE DAY ROLL with no reload — via the tick, via a wake, and via
         a reload with a stale key. Midnight is crossed by replacing Date
         BEFORE any script runs, so the shipped tool keeps zero test
         surface
     L4  THE CENTER BOARD REGRESSION — entitlement delayed 1500ms over a
         stale day: the roster board that appears afterwards must be
         rolled, and no name may appear before it
     L5  no history accumulates across five simulated days
     L6  a free visitor cannot obtain a roster — not in the DOM, not in
         an attribute, not through a deep link, not during the race
     L7  lcs:my-classes:v1 is byte-identical before and after
     L8  anonymous mode stores no identity
     L9  a change of mind overwrites
     L10 a child removed from the roster leaves no orphaned id
     L11 viewport sweep, taps >= 44px, clean console

   Usage: node scripts/local-test-feelings-check-in.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const QA = path.join(REPO, 'docs', 'audit-results', 'feelings-check-in', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const SHOT = process.argv.includes('--shot');

/* deliberately unguessable, so a hit is never a coincidence */
const NAMES = ['Zzyzxil', 'Qorvaxen', 'Blintara', 'Murrowyn', 'Vexholt'];
const SIDS = NAMES.map((_, i) => 's_sent' + i);
const CLASS_ID = 'c_sent';
const MC_KEY = 'lcs:my-classes:v1';
const STORE_KEY = 'lcs:feelings-check-in:v1';

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
    const f = p.startsWith('/image-library-webp/')
      ? path.join(IMG, p.slice('/image-library-webp/'.length))
      : path.join(MINI, p.replace(/^\/mini-tools\//, '').replace(/^\//, ''));
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
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/feelings-check-in.html`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  const sins = [];   /* every PII escape, across every page, whole run */

  async function newPage(o) {
    o = o || {};
    const page = await browser.newPage();
    await page.setViewport({ width: o.w || 1024, height: o.h || 900 });

    /* the PII scanner is installed BEFORE any navigation and stays live */
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
      /* mockable clock, installed before the tool exists, so the shipped
         source needs no test hook of its own */
      window.__lcsClockOffset = 0;
      const Real = Date;
      const Fake = function (...a) { return a.length ? new Real(...a) : new Real(Real.now() + window.__lcsClockOffset); };
      Fake.now = () => Real.now() + window.__lcsClockOffset;
      Fake.parse = Real.parse; Fake.UTC = Real.UTC; Fake.prototype = Real.prototype;
      window.Date = Fake;

      /* exfil tripwires */
      window.__usedExfilAPI = undefined;
      const trip = (n) => { window.__usedExfilAPI = n; };
      if (navigator.sendBeacon) navigator.sendBeacon = () => { trip('sendBeacon'); return false; };
      const RealXHR = window.XMLHttpRequest;
      window.XMLHttpRequest = function () { trip('XMLHttpRequest'); return new RealXHR(); };
      window.WebSocket = function () { trip('WebSocket'); };
      window.RTCPeerConnection = function () { trip('RTCPeerConnection'); };

      try { if (sessionStorage.getItem('__fci_seeded')) return; sessionStorage.setItem('__fci_seeded', '1'); } catch (_) {}
      try {
        localStorage.clear();
        if (seed.mc) localStorage.setItem(seed.mcKey, JSON.stringify(seed.mc));
        if (seed.token) localStorage.setItem('accessToken', 'harness-token');
        if (seed.store) localStorage.setItem(seed.storeKey, JSON.stringify(seed.store));
      } catch (_) {}
    }, { mc: o.mc === undefined ? MC_BLOB : o.mc, mcKey: MC_KEY, token: !!o.premium, store: o.store || null, storeKey: STORE_KEY });

    page._errs = [];
    const benign = t => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', e => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', m => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }
  const ready = async (p) => { await p.waitForSelector('.fci-card', { timeout: 8000 }); await sleep(250); };
  const readStore = (p) => p.evaluate(k => { try { return JSON.parse(localStorage.getItem(k)); } catch (_) { return null; } }, STORE_KEY);
  async function shoot(p, n) { if (!SHOT) return; await p.evaluate(() => window.scrollTo(0, 0)); await sleep(120); await p.screenshot({ path: path.join(QA, n) }); }

  /* a full premium roster check-in: pick a child, pick a feeling */
  async function checkIn(p, idx, feeling) {
    await p.evaluate((i) => {
      const b = document.querySelectorAll('.fci-name')[i];
      if (b) b.click();
    }, idx);
    await sleep(220);
    await p.evaluate((f) => {
      const b = document.querySelector(`.fci-feel[data-feel="${f}"]`);
      if (b) b.click();
    }, feeling);
    await sleep(320);
    await p.evaluate(() => { const b = document.querySelector('.fci-go'); if (b) b.click(); });
    await sleep(220);
  }

  /* ---------- L11 + the board renders ---------- */
  console.log('\nL11 — viewport sweep');
  for (const v of VIEWPORTS) {
    const p = await newPage({ w: v.w, h: v.h, mc: null });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    const m = await p.evaluate((vw) => {
      const bad = [];
      for (const e of document.querySelectorAll('.lcs-stage *')) {
        const cs = getComputedStyle(e);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const r = e.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (r.right > vw + 1 || r.left < -1) bad.push('offscreen ' + (e.className || e.tagName));
      }
      const small = [...document.querySelectorAll('button')].filter(b => {
        const r = b.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
      }).map(b => b.className + ':' + Math.round(b.getBoundingClientRect().height));
      return { bad: bad.slice(0, 3), small, feels: document.querySelectorAll('.fci-feel').length };
    }, v.w);
    ok(`${v.w}px nothing off-screen`, m.bad.length === 0, m.bad.join(' | '));
    ok(`${v.w}px taps >=44px`, m.small.length === 0, m.small.slice(0, 3).join(', '));
    ok(`${v.w}px five feelings render`, m.feels === 5, 'got ' + m.feels);
    ok(`${v.w}px no console errors`, p._errs.length === 0, p._errs[0]);
    if ([360, 768, 1024].includes(v.w)) await shoot(p, `board-${v.w}.png`);
    await p.close();
  }

  /* ---------- the free experience: validation + help menu ---------- */
  console.log('\nFREE — the board, the kind reply, and the help menu');
  {
    const p = await newPage({ mc: null });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    await p.evaluate(() => { window.__spoken = []; if (window.LCSAudio) { LCSAudio.speak = o => window.__spoken.push(o); LCSAudio.cancel = () => {}; } });
    ok('no mode strip for a free visitor', (await p.$$('.fci-modebtn')).length === 0);
    await p.evaluate(() => document.querySelector('.fci-feel[data-feel="sad"]').click());
    await sleep(400);
    const r = await p.evaluate(() => ({
      val: (document.querySelector('.fci-validation') || {}).textContent || '',
      help: document.querySelectorAll('.fci-help').length,
      spoken: window.__spoken || []
    }));
    ok('a kind reply appears', r.val.length > 10, r.val);
    ok('the help menu is FREE and present', r.help === 4, 'got ' + r.help);
    ok('the reply is spoken with lang', r.spoken.length > 0 && r.spoken.every(s => s.lang === 'en' && s.type === 'ui'));
    ok('no verdict language', !/correct|wrong|good job|well done/i.test(r.val));
    await shoot(p, 'opened-sad.png');
    await p.close();
  }

  /* ---------- L6 a free visitor cannot obtain a roster ---------- */
  console.log('\nL6 — a free visitor cannot obtain a roster');
  {
    const p = await newPage({ entDelayMs: 1200 });     /* my-classes seeded, NO token */
    const polled = [];
    await p.goto(BASE + '?lang=en&mode=roster&class=' + CLASS_ID, { waitUntil: 'domcontentloaded' });
    for (let i = 0; i < 28; i++) {                      /* poll THROUGH the race */
      polled.push(await p.evaluate(() => document.documentElement.outerHTML));
      await sleep(50);
    }
    await ready(p); await sleep(400);
    const leaked = polled.filter(h => NAMES.some(n => h.includes(n)));
    ok('no name during the entitlement race', leaked.length === 0, `${leaked.length}/${polled.length} polls`);
    const st = await p.evaluate(() => ({
      html: document.documentElement.outerHTML,
      mc: window.FeelingsCheckIn._mc,
      mode: window.FeelingsCheckIn.mode
    }));
    ok('no name in the final DOM or any attribute', !NAMES.some(n => st.html.includes(n)));
    ok('my-classes was never even parsed (_mc stays null)', st.mc === null, JSON.stringify(st.mc));
    ok('?mode=roster is refused and stays anon', st.mode === 'anon', st.mode);
    await p.close();
  }

  /* ---------- premium roster + L9 + L7 ---------- */
  console.log('\nPREMIUM — roster check-in');
  {
    const p = await newPage({ premium: true });
    await p.goto(BASE + '?lang=en&mode=roster', { waitUntil: 'domcontentloaded' });
    await ready(p); await sleep(400);
    const before = await p.evaluate(k => localStorage.getItem(k), MC_KEY);
    ok('the roster renders for a subscriber', (await p.$$('.fci-name')).length === NAMES.length);

    await checkIn(p, 0, 'happy');
    await checkIn(p, 1, 'tired');
    let day = (await readStore(p)).day;
    ok('two children checked in', Object.keys(day.picks[CLASS_ID] || {}).length === 2, JSON.stringify(day.picks));
    ok('a pick is a bare string', typeof day.picks[CLASS_ID][SIDS[0]] === 'string');

    /* L9 — change of mind overwrites, never appends */
    await checkIn(p, 0, 'calm');
    day = (await readStore(p)).day;
    ok('L9 a change of mind overwrites', day.picks[CLASS_ID][SIDS[0]] === 'calm', JSON.stringify(day.picks[CLASS_ID]));
    ok('L9 still exactly two entries', Object.keys(day.picks[CLASS_ID]).length === 2);

    /* the class weather summary */
    const w = await p.evaluate(() => ({
      line: (document.querySelector('.fci-wline') || {}).textContent || '',
      icons: document.querySelectorAll('.fci-wicon').length
    }));
    ok('the class weather reads as weather', w.line.length > 10 && w.icons > 0, w.line);
    ok('the weather never names a child', !NAMES.some(n => w.line.includes(n)));
    await shoot(p, 'roster-premium.png');

    /* L7 — my-classes is byte-identical */
    const after = await p.evaluate(k => localStorage.getItem(k), MC_KEY);
    ok('L7 my-classes byte-identical after a full session', before === after);
    const mc = JSON.parse(after);
    ok('L7 the future-tool sentinel survives', mc.__futureToolField && mc.__futureToolField.keep === 'me');
    ok('L7 fairness + groupings intact', !!mc.fairness[CLASS_ID] && mc.groupings[CLASS_ID].sentBy === 'name-sticks');
    await p.close();
  }

  /* ---------- L3 the day roll, three ways ---------- */
  console.log('\nL3 — the day roll (no reload)');
  {
    /* (a) the interval tick */
    const p = await newPage({ premium: true });
    await p.goto(BASE + '?lang=en&mode=roster', { waitUntil: 'domcontentloaded' });
    await ready(p); await sleep(400);
    await checkIn(p, 0, 'happy'); await checkIn(p, 1, 'sad');
    const k0 = (await readStore(p)).day.dateKey;
    await p.evaluate(() => { window.__lcsClockOffset += 14 * 3600e3; });
    await sleep(3 * 1000 + 600);                       /* 3 ticks of DAY_TICK_MS=60000? no: force it */
    let rolled = await readStore(p);
    if (rolled.day.dateKey === k0) {
      /* the interval is a minute long; drive one tick directly rather
         than idle for it — the LISTENER path is proven in (b) */
      await p.evaluate(() => window.FeelingsCheckIn._tickDay());
      await sleep(250);
      rolled = await readStore(p);
    }
    ok('L3a the day rolled without a reload', rolled.day.dateKey !== k0, `${k0} -> ${rolled.day.dateKey}`);
    ok('L3a picks are gone from STORAGE, not just the DOM', Object.keys(rolled.day.picks).length === 0, JSON.stringify(rolled.day.picks));
    const domNames = await p.evaluate(() => document.documentElement.outerHTML);
    ok('L3a no yesterday feeling still painted', !(await p.$('.fci-name.fci-done')));
    ok('L3a the roster itself is still there', domNames.includes(NAMES[0]));
    await p.close();

    /* (b) a wake from sleep — the visibilitychange path */
    const q = await newPage({ premium: true });
    await q.goto(BASE + '?lang=en&mode=roster', { waitUntil: 'domcontentloaded' });
    await ready(q); await sleep(400);
    await checkIn(q, 0, 'angry');
    const k1 = (await readStore(q)).day.dateKey;
    await q.evaluate(() => {
      window.__lcsClockOffset += 20 * 3600e3;
      Object.defineProperty(document, 'hidden', { value: false, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await sleep(350);
    const r2 = await readStore(q);
    ok('L3b a wake after midnight rolls the day', r2.day.dateKey !== k1, `${k1} -> ${r2.day.dateKey}`);
    ok('L3b picks cleared on wake', Object.keys(r2.day.picks).length === 0);
    await q.close();

    /* (c) a reload onto a stale stored day */
    const stale = { v: 1, day: { dateKey: '2001-1-1', anon: { calm: 3, happy: 9, sad: 2, angry: 0, tired: 1 }, picks: { [CLASS_ID]: { [SIDS[0]]: 'sad', [SIDS[1]]: 'angry' } } } };
    const s = await newPage({ premium: true, store: stale });
    await s.goto(BASE + '?lang=en&mode=roster', { waitUntil: 'domcontentloaded' });
    await ready(s); await sleep(400);
    const r3 = await readStore(s);
    ok('L3c a stale day is rolled on load', r3.day.dateKey !== '2001-1-1', r3.day.dateKey);
    ok('L3c yesterday’s picks are gone', Object.keys(r3.day.picks).length === 0, JSON.stringify(r3.day.picks));
    ok('L3c yesterday’s anon counts are zeroed', Object.keys(r3.day.anon).every(k => r3.day.anon[k] === 0));
    await s.close();
  }

  /* ---------- L4 THE CENTER BOARD REGRESSION ---------- */
  console.log('\nL4 — the Center Board regression (async entitlement over a stale day)');
  {
    const stale = { v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() },
      day: { dateKey: '2001-1-1', anon: { calm: 0, happy: 0, sad: 0, angry: 0, tired: 0 }, picks: { [CLASS_ID]: { [SIDS[0]]: 'sad', [SIDS[1]]: 'angry', [SIDS[2]]: 'tired' } } } };
    const p = await newPage({ premium: true, store: stale, entDelayMs: 1500 });
    await p.goto(BASE + '?lang=en&mode=roster', { waitUntil: 'domcontentloaded' });
    await sleep(2600);                                  /* let entitlement land + the board swap */
    const r = await readStore(p);
    ok('L4 the board a premium teacher gets IS rolled', r.day.dateKey !== '2001-1-1', r.day.dateKey);
    ok('L4 the stale picks did not survive the swap', Object.keys(r.day.picks).length === 0, JSON.stringify(r.day.picks));
    const dom = await p.evaluate(() => document.documentElement.outerHTML);
    ok('L4 the roster board did render after entitlement', dom.includes(NAMES[0]));
    ok('L4 nobody shows as already checked in', !(await p.$('.fci-name.fci-done')));
    await p.close();
  }

  /* ---------- L5 no history accumulates ---------- */
  console.log('\nL5 — no history accumulates');
  {
    const p = await newPage({ premium: true });
    await p.goto(BASE + '?lang=en&mode=roster', { waitUntil: 'domcontentloaded' });
    await ready(p); await sleep(400);
    let size1 = 0;
    for (let d = 0; d < 5; d++) {
      await checkIn(p, 0, 'happy'); await checkIn(p, 1, 'sad'); await checkIn(p, 2, 'calm');
      const raw = await p.evaluate(k => localStorage.getItem(k), STORE_KEY);
      if (d === 0) size1 = raw.length;
      await p.evaluate(() => { window.__lcsClockOffset += 25 * 3600e3; });
      await p.evaluate(() => window.FeelingsCheckIn._tickDay());
      await sleep(200);
    }
    const raw = await p.evaluate(k => localStorage.getItem(k), STORE_KEY);
    const st = JSON.parse(raw);
    /* Scan the DAY, not the whole blob: `ent.checkedAt` is a legitimate ISO
       stamp for the subscription check and its date part matches the same
       shape. The claim under test is that no second DAY ever accumulates. */
    const keys = JSON.stringify(st.day).match(/\d{4}-\d{1,2}-\d{1,2}/g) || [];
    ok('L5 exactly one date survives in the day', keys.length === 1, keys.join(','));
    /* and the blob carries no container that a second day could live in */
    ok('L5 the store has only its known top-level keys',
      Object.keys(st).every(k => ['v', 'settings', 'ent', 'lastClassId', 'day'].indexOf(k) >= 0),
      Object.keys(st).join(','));
    ok('L5 the store never grew', raw.length <= size1 + 120, `${size1} -> ${raw.length}`);
    (function walk(n, t) {
      if (Array.isArray(n)) { ok('L5 no array in the store', false, 'at ' + t); return; }
      if (!n || typeof n !== 'object') return;
      for (const k of Object.keys(n)) walk(n[k], t + '.' + k);
    })(st, 'store');
    ok('L5 store shape stays closed', Object.keys(st.day).sort().join(',') === 'anon,dateKey,picks', Object.keys(st.day).join(','));
    await p.close();
  }

  /* ---------- L8 anonymous mode stores no identity ---------- */
  console.log('\nL8 — anonymous mode stores no identity');
  {
    const p = await newPage({ mc: null });
    await p.goto(BASE + '?lang=en', { waitUntil: 'domcontentloaded' }); await ready(p);
    for (const f of ['happy', 'sad', 'happy']) {
      await p.evaluate((x) => document.querySelector(`.fci-feel[data-feel="${x}"]`).click(), f);
      await sleep(260);
      await p.evaluate(() => { const b = document.querySelector('.fci-go'); if (b) b.click(); });
      await sleep(200);
    }
    const raw = await p.evaluate(k => localStorage.getItem(k), STORE_KEY);
    const st = JSON.parse(raw);
    ok('L8 counts accumulated', st.day.anon.happy === 2 && st.day.anon.sad === 1, JSON.stringify(st.day.anon));
    ok('L8 no picks object was created', !Object.keys(st.day.picks).length, JSON.stringify(st.day.picks));
    ok('L8 no student id anywhere in the store', !/s_/.test(raw), raw.slice(0, 90));
    ok('L8 no timestamp on a feeling', !/\d{2}:\d{2}:\d{2}/.test(JSON.stringify(st.day)));
    await p.close();
  }

  /* ---------- L10 orphan prune ---------- */
  console.log('\nL10 — a removed child leaves no orphaned id');
  {
    const p = await newPage({ premium: true });
    await p.goto(BASE + '?lang=en&mode=roster', { waitUntil: 'domcontentloaded' });
    await ready(p); await sleep(400);
    await checkIn(p, 0, 'happy'); await checkIn(p, 1, 'sad');
    /* another tab removes a child from the shared roster */
    await p.evaluate((k, mc, gone) => {
      const blob = JSON.parse(JSON.stringify(mc));
      blob.classes[0].students = blob.classes[0].students.filter(s => s.id !== gone);
      localStorage.setItem(k, JSON.stringify(blob));
      window.dispatchEvent(new StorageEvent('storage', { key: k }));
    }, MC_KEY, MC_BLOB, SIDS[0]);
    await sleep(400);
    const day = (await readStore(p)).day;
    ok('L10 the removed child’s id is pruned', !(day.picks[CLASS_ID] || {})[SIDS[0]], JSON.stringify(day.picks[CLASS_ID]));
    ok('L10 the remaining child is untouched', (day.picks[CLASS_ID] || {})[SIDS[1]] === 'sad');
    await p.close();
  }

  /* ---------- L1 / L2 the privacy verdict, over the whole run ---------- */
  console.log('\nL1/L2 — privacy, measured across the entire session');
  {
    const p = await newPage({ premium: true });
    const client = await p.target().createCDPSession();
    await client.send('Network.enable');
    let sockets = 0;
    client.on('Network.webSocketCreated', () => { sockets++; });
    await p.goto(BASE + '?lang=en&mode=roster', { waitUntil: 'domcontentloaded' });
    await ready(p); await sleep(400);
    await checkIn(p, 0, 'sad');
    await sleep(400);
    const exfil = await p.evaluate(() => window.__usedExfilAPI);
    ok('L2 zero WebSockets', sockets === 0, 'n=' + sockets);
    ok('L2 no exfil API was touched', exfil === undefined, String(exfil));
    await p.close();
  }
  ok('L1 no roster name or student id in ANY request, whole session', sins.length === 0, sins.slice(0, 3).join(' | '));

  await browser.close(); server.close();
  console.log(`\n${fail ? 'FAIL' : 'ALL GREEN'} — ${pass} passed, ${fail} failed`);
  if (fail) bad.forEach(b => console.log('  - ' + b));
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
