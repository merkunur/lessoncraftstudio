#!/usr/bin/env node
/* =====================================================================
   local-test-hush-owl.js — the local Definition-of-Done for Hush Owl.

   Drives the tool with a DETERMINISTIC fake microphone: getUserMedia is
   monkeypatched (before any page script) to return an oscillator-driven
   MediaStreamDestination whose amplitude the test controls via
   __hushTest.setAmp(a). A sine of amplitude a has RMS a/√2, so the
   level01 pipeline can be asserted NUMERICALLY, not just "bigger".
   (The Chromium fake-device flags are rejected: their tone amplitude
   cannot be changed mid-session, and the owl state machine test IS a
   loud→quiet transition.)

   Sections:
     A  viewport sweep 320/360/412/768/1024/1366 — no overflow, FITS,
        tap targets ≥44px, scene renders, corner mode
     B  engine — numeric level01, asleep→stirring→awake under sustained
        loudness, spike immunity, never-skip recovery, sway
     C  privacy — zero network after Start (no bodies, no sockets, no
        beacons), exfil-API tripwires, static source scan, the privacy
        sentence in the DOM
     D  mic release proof — Stop ends every track (OS light off)
     E  error paths — denied / no-mic / busy copy + Teacher's ears
        fallback drives the same engine (taps + keys 1/2/3)
     F  free vs premium — structural suppression (deep links do NOT
        leak), gates, cat/dragon render the full class contract
     G  no-sound-by-construction — the tool never creates an output
        oscillator (this is a noise meter, not a noise maker)
     H  reduced motion — no sway writes, states still distinguishable

   Screenshots → docs/audit-results/hush-owl/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const QA = path.join(REPO, 'docs', 'audit-results', 'hush-owl', 'qa');
fs.mkdirSync(QA, { recursive: true });
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

let pass = 0, fail = 0;
const bad = [];
function ok(name, cond, extra) {
  if (cond) { pass++; console.log('  ✓ ' + name); }
  else { fail++; bad.push(name); console.log('  ✗ FAIL ' + name + (extra ? ' — ' + extra : '')); }
}

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

/* installed before ANY page script on every page */
const FAKE_MIC = `(() => {
  try { localStorage.clear(); } catch (_) {}   /* hermetic pages — no cross-section leaks */
  window.__oscOutCount = 0;
  const RealOsc = AudioContext.prototype.createOscillator;
  AudioContext.prototype.createOscillator = function () {
    if (this !== window.__fakeCtx) window.__oscOutCount++;
    return RealOsc.call(this);
  };
  ['MediaRecorder', 'RTCPeerConnection', 'WebSocket'].forEach((n) => {
    const Real = window[n];
    if (!Real) return;
    window[n] = function () { window.__usedExfilAPI = n; return new Real(...arguments); };
  });
  const mode = new URLSearchParams(location.search).get('micmode') || 'ok';
  const real = navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    ? navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) : null;
  if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = async (c) => {
    if (!c || !c.audio) return real ? real(c) : Promise.reject(new DOMException('x', 'NotFoundError'));
    if (mode === 'denied') throw new DOMException('denied', 'NotAllowedError');
    if (mode === 'nomic') throw new DOMException('none', 'NotFoundError');
    if (mode === 'busy') throw new DOMException('busy', 'NotReadableError');
    const ctx = new AudioContext();
    window.__fakeCtx = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const dest = ctx.createMediaStreamDestination();
    osc.frequency.value = 440;
    gain.gain.value = 0.0005;
    osc.connect(gain).connect(dest);
    osc.start();
    await ctx.resume();
    window.__hushTest = {
      setAmp: (a) => gain.gain.setTargetAtTime(a, ctx.currentTime, 0.01),
      tracks: dest.stream.getTracks()
    };
    return dest.stream;
  };
})();`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitState(page, want, timeoutMs) {
  try {
    await page.waitForFunction((w) => window.__hushOwl && window.__hushOwl.state === w, { timeout: timeoutMs || 15000 }, want);
    return true;
  } catch (_) { return false; }
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/hush-owl.html`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--use-fake-ui-for-media-stream', '--autoplay-policy=no-user-gesture-required']
  });
  const ctx0 = browser.defaultBrowserContext();
  await ctx0.overridePermissions(`http://127.0.0.1:${PORT}`, ['microphone']);

  async function newPage(opts) {
    opts = opts || {};
    const page = await browser.newPage();
    await page.setViewport({ width: opts.w || 1024, height: opts.h || 768 });
    await page.evaluateOnNewDocument(FAKE_MIC);
    if (opts.premium) {
      await page.evaluateOnNewDocument(() => {
        try {
          localStorage.setItem('accessToken', 'harness-token');
          localStorage.setItem('lcs:hush-owl:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, level: null, settings: null }));
        } catch (_) {}
      });
    }
    if (opts.reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    page._errs = [];
    const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', (e) => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }

  /* ============================ A: viewports ============================ */
  console.log('A. viewport sweep');
  for (const [w, h] of [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]]) {
    const page = await newPage({ w, h });
    await page.goto(BASE + '?hshtest=1', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.hsh-big');
    const m = await page.evaluate(() => {
      const doc = document.scrollingElement || document.documentElement;
      const btns = [...document.querySelectorAll('button')].filter((b) => b.offsetParent !== null);
      const small = btns.filter((b) => { const r = b.getBoundingClientRect(); return r.height < 44 || r.width < 44; })
        .map((b) => (b.textContent || b.className).trim().slice(0, 24));
      const start = document.querySelector('.hsh-big').getBoundingClientRect();
      return {
        hOverflow: doc.scrollWidth > window.innerWidth + 1,
        scene: !!document.querySelector('.hsh-scene'),
        small,
        startBottom: start.bottom,
        scrollH: doc.scrollHeight,
        canScroll: getComputedStyle(document.body).overflowY,
        privacy: !!document.querySelector('.hsh-privacy')
      };
    });
    ok(`${w}×${h} no horizontal overflow`, !m.hOverflow);
    ok(`${w}×${h} scene renders`, m.scene && m.privacy);
    ok(`${w}×${h} tap targets ≥44px`, m.small.length === 0, m.small.join(', '));
    if (w >= 768) ok(`${w}×${h} FITS (Start above the fold)`, m.startBottom <= h + 1, `bottom=${Math.round(m.startBottom)}`);
    else ok(`${w}×${h} Start reachable (scroll opt-in)`, m.startBottom <= h + 1 || m.canScroll === 'auto', `bottom=${Math.round(m.startBottom)} overflowY=${m.canScroll}`);
    if (w === 360 || w === 768 || w === 1024) await page.screenshot({ path: path.join(QA, `idle-${w}.png`) });
    ok(`${w}×${h} clean console`, page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* corner mode at two widths */
  for (const [w, h] of [[360, 740], [1024, 768]]) {
    const page = await newPage({ w, h, premium: true });
    await page.goto(BASE + '?hshtest=1&embed=corner', { waitUntil: 'networkidle0' });
    const m = await page.evaluate(() => ({
      card: !!document.querySelector('.hsh-cornercard'),
      scene: !!document.querySelector('.hsh-cornercard .hsh-scene'),
      headerHidden: !document.querySelector('.lcs-header') || getComputedStyle(document.querySelector('.lcs-header')).display === 'none'
    }));
    ok(`corner ${w} renders card+scene, header hidden`, m.card && m.scene && m.headerHidden);
    if (w === 360) await page.screenshot({ path: path.join(QA, 'corner-360.png') });
    await page.close();
  }

  /* ============================ B: engine ============================ */
  console.log('B. engine (shortened constants via ?hshtest=1)');
  {
    const page = await newPage({});
    await page.goto(BASE + '?hshtest=1', { waitUntil: 'networkidle0' });
    await page.click('.hsh-big');
    await page.waitForFunction(() => window.__hushOwl && window.__hushOwl.phase === 'live', { timeout: 8000 });
    ok('Start → phase live (mic granted)', true);
    ok('starts asleep', await page.evaluate(() => window.__hushOwl.state === 'asleep'));

    /* numeric level01: amp 0.05 → RMS 0.0354 → −29.0 dBFS →
       window (sens 3: floor −55, 40 dB) → 0.65 */
    await page.evaluate(() => window.__hushTest.setAmp(0.05));
    await sleep(700);
    const lvl = await page.evaluate(() => window.__hushOwl.level01);
    ok('level01 numeric (amp 0.05 → ~0.65)', Math.abs(lvl - 0.65) < 0.08, `got ${lvl.toFixed(3)}`);

    /* spike immunity: brief loud from asleep must not move the state */
    await page.evaluate(() => window.__hushTest.setAmp(0.0005));
    await sleep(1500);
    await page.evaluate(() => window.__hushTest.setAmp(0.5));
    await sleep(400);
    await page.evaluate(() => window.__hushTest.setAmp(0.0005));
    await sleep(1500);
    ok('a 0.4s spike does not wake the owl', await page.evaluate(() => window.__hushOwl.state === 'asleep'));

    /* sustained loud → stirring → awake, observing the intermediate */
    const seen = [];
    await page.evaluate(() => window.__hushTest.setAmp(0.5));
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
      const s = await page.evaluate(() => window.__hushOwl.state);
      if (seen[seen.length - 1] !== s) seen.push(s);
      if (s === 'awake') break;
      await sleep(80);
    }
    ok('sustained loud → stirring → awake (never skips)', seen.join('>').includes('stirring>awake'), seen.join('>'));
    await page.screenshot({ path: path.join(QA, 'awake-1024.png') });

    /* recovery: quiet → stirring → asleep, never skipping */
    const seen2 = [];
    await page.evaluate(() => window.__hushTest.setAmp(0.0005));
    const t1 = Date.now();
    while (Date.now() - t1 < 15000) {
      const s = await page.evaluate(() => window.__hushOwl.state);
      if (seen2[seen2.length - 1] !== s) seen2.push(s);
      if (s === 'asleep') break;
      await sleep(80);
    }
    ok('quiet recovery awake → stirring → asleep (never skips)', seen2.join('>').includes('stirring>asleep'), seen2.join('>'));

    /* sway responds */
    const s1 = await page.evaluate(() => document.querySelector('.hsh-scene').style.getPropertyValue('--hsh-sway'));
    await sleep(400);
    const s2 = await page.evaluate(() => document.querySelector('.hsh-scene').style.getPropertyValue('--hsh-sway'));
    ok('branch sway is being written', s1 !== '' && s1 !== s2, `${s1} → ${s2}`);

    /* data-state reaches the scene */
    ok('scene data-state = asleep after recovery', await page.evaluate(() => document.querySelector('.hsh-scene').getAttribute('data-state') === 'asleep'));

    /* stirring screenshot on the way back up */
    await page.evaluate(() => window.__hushTest.setAmp(0.5));
    await waitState(page, 'stirring', 10000);
    await page.screenshot({ path: path.join(QA, 'stirring-1024.png') });

    ok('B clean console', page._errs.length === 0, page._errs[0]);
    await page.close();
  }

  /* ============================ C: privacy ============================ */
  console.log('C. privacy gates');
  {
    const page = await newPage({});
    const reqs = [];
    let sockets = 0;
    const cdp = await page.target().createCDPSession();
    await cdp.send('Network.enable');
    cdp.on('Network.webSocketCreated', () => sockets++);
    await page.goto(BASE + '?hshtest=1', { waitUntil: 'networkidle0' });
    page.on('request', (r) => reqs.push({ url: r.url(), method: r.method(), post: r.postData() || null, type: r.resourceType() }));
    await page.click('.hsh-big');
    await page.waitForFunction(() => window.__hushOwl && window.__hushOwl.phase === 'live', { timeout: 8000 });
    await page.evaluate(() => window.__hushTest.setAmp(0.5));
    await sleep(4000);
    await page.evaluate(() => window.__hushTest.setAmp(0.0005));
    await sleep(4000);
    const bodies = reqs.filter((r) => r.post || r.method !== 'GET' || r.type === 'ping');
    ok('zero requests carry a body after mic start', bodies.length === 0, JSON.stringify(bodies[0] || null));
    ok('zero requests at all during 8s of loud/quiet', reqs.length === 0, reqs.map((r) => r.url).join(', '));
    ok('zero WebSockets', sockets === 0);
    ok('exfil-API tripwires silent', await page.evaluate(() => window.__usedExfilAPI === undefined));
    const privOnPage = await page.evaluate(() => {
      const el = document.querySelector('.hsh-privacy');
      return el && el.textContent.length > 60;
    });
    ok('privacy sentence in the DOM while listening', !!privOnPage);
    await page.close();

    /* static source scan (comments stripped): no exfil primitives;
       exactly ONE fetch (entitlement) */
    const src = fs.readFileSync(path.join(MINI, 'hush-owl.js'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const fetches = (src.match(/\bfetch\s*\(/g) || []).length;
    ok('source: exactly one fetch (the entitlement check)', fetches === 1 && src.includes("fetch('/api/auth/me'"), `${fetches} fetch calls`);
    ok('source: no XMLHttpRequest/sendBeacon/WebSocket/RTC/MediaRecorder', !/XMLHttpRequest|sendBeacon|WebSocket|RTCPeerConnection|MediaRecorder/.test(src));
  }

  /* ============================ D: release ============================ */
  console.log('D. mic release proof');
  {
    const page = await newPage({});
    await page.goto(BASE + '?hshtest=1', { waitUntil: 'networkidle0' });
    await page.click('.hsh-big');
    await page.waitForFunction(() => window.__hushOwl && window.__hushOwl.phase === 'live', { timeout: 8000 });
    /* the Stop chip is the first .hsh-ctrlchip in the live dock */
    await page.evaluate(() => { [...document.querySelectorAll('.hsh-ctrlchip')][0].click(); });
    await sleep(400);
    const m = await page.evaluate(() => ({
      phase: window.__hushOwl.phase,
      ended: window.__hushTest.tracks.every((t) => t.readyState === 'ended'),
      paused: !!document.querySelector('.hsh-status')
    }));
    ok('Stop → every track ended (OS mic light off)', m.ended);
    ok('Stop → paused state renders', m.phase === 'paused' && m.paused);
    await page.close();
  }

  /* ============================ E: errors + Teacher’s ears ============================ */
  console.log('E. error paths + Teacher’s ears');
  const errTexts = {};
  for (const mode of ['denied', 'nomic', 'busy']) {
    const page = await newPage({});
    await page.goto(BASE + `?hshtest=1&micmode=${mode}`, { waitUntil: 'networkidle0' });
    await page.click('.hsh-big');
    await page.waitForSelector('.hsh-err', { timeout: 8000 });
    const m = await page.evaluate(() => ({
      msg: document.querySelector('.hsh-err p').textContent,
      buttons: [...document.querySelectorAll('.hsh-err .hsh-ctrlchip')].map((b) => b.textContent)
    }));
    errTexts[mode] = m.msg;
    ok(`${mode}: error card + retry + Teacher's ears`, m.msg.length > 30 && m.buttons.length === 2);
    if (mode === 'denied') {
      await page.screenshot({ path: path.join(QA, 'error-denied-768.png') });
      /* accept the fallback: Teacher's ears drives the SAME engine */
      await page.evaluate(() => { [...document.querySelectorAll('.hsh-err .hsh-ctrlchip')][1].click(); });
      await page.waitForSelector('.hsh-manualrow', { timeout: 5000 });
      ok('denied → Teacher’s ears goes live', await page.evaluate(() => window.__hushOwl.phase === 'live'));
      /* tap "Too loud" → awake; tap "Calm" → asleep (same state machine) */
      await page.evaluate(() => { [...document.querySelectorAll('.hsh-manualbtn')][2].click(); });
      ok('manual Too-loud wakes the owl', await waitState(page, 'awake', 10000));
      await page.screenshot({ path: path.join(QA, 'manual-768.png') });
      await page.evaluate(() => { [...document.querySelectorAll('.hsh-manualbtn')][0].click(); });
      ok('manual Calm returns to sleep', await waitState(page, 'asleep', 12000));
      /* keyboard 1/2/3 */
      await page.keyboard.press('3');
      const kb = await page.evaluate(() => [...document.querySelectorAll('.hsh-manualbtn')].findIndex((b) => b.classList.contains('active')));
      ok('keys 1/2/3 drive Teacher’s ears', kb === 2, `active=${kb}`);
      ok('E clean console', page._errs.length === 0, page._errs[0]);
    }
    await page.close();
  }
  ok('three error copies are distinct', new Set(Object.values(errTexts)).size === 3);

  /* ============================ F: free vs premium ============================ */
  console.log('F. free vs premium');
  {
    /* FREE: deep links must NOT take effect (structural suppression) */
    const page = await newPage({});
    await page.goto(BASE + '?hshtest=1&level=silent&theme=dragon', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.hsh-big');
    const m = await page.evaluate(() => ({
      level: window.__hushOwl.level,
      theme: window.__hushOwl.theme,
      lockedChips: document.querySelectorAll('.hsh-chip.locked').length,
      zzz: !!document.querySelector('.hsh-zzz')
    }));
    ok('free: ?level=silent suppressed → partner', m.level === 'partner');
    ok('free: ?theme=dragon suppressed → owl', m.theme === 'owl');
    ok('free: 3 level chips locked', m.lockedChips === 3);
    /* tapping a locked level gates instead of switching */
    await page.evaluate(() => { [...document.querySelectorAll('.hsh-chip')][0].click(); });
    await sleep(200);
    const g = await page.evaluate(() => ({
      gate: !!document.querySelector('.hsh-gate'),
      level: window.__hushOwl.level,
      pricing: (document.querySelector('.hsh-gate a') || {}).href || ''
    }));
    ok('free: locked level tap → inline gate, level unchanged', g.gate && g.level === 'partner' && g.pricing.includes('/pricing?from=tool-hush-owl'));
    await page.close();

    /* PREMIUM: deep links take effect; themes render the full contract */
    const CONTRACT = ['.hsh-body', '.hsh-head', '.hsh-zzz', '.hsh-tuft-l', '.hsh-tuft-r', '.hsh-wing-l', '.hsh-wing-r', '.hsh-lid', '.hsh-pupil', '.hsh-eye-open', '.hsh-eye-closed', '.hsh-signtext'];
    for (const theme of ['owl', 'cat', 'dragon']) {
      const p2 = await newPage({ premium: true });
      await p2.goto(BASE + `?hshtest=1&level=silent&theme=${theme}`, { waitUntil: 'networkidle0' });
      await p2.waitForFunction(() => window.__hushOwl && window.__hushOwl.level === 'silent', { timeout: 8000 }).catch(() => {});
      const mm = await p2.evaluate((sel) => ({
        level: window.__hushOwl.level,
        theme: window.__hushOwl.theme,
        missing: sel.filter((s) => !document.querySelector(s)),
        sign: (document.querySelector('.hsh-signtext') || {}).textContent
      }), CONTRACT);
      ok(`premium ${theme}: level deep link honored`, mm.level === 'silent');
      ok(`premium ${theme}: theme renders + full class contract`, mm.theme === theme && mm.missing.length === 0, mm.missing.join(', '));
      ok(`premium ${theme}: sign shows the level`, (mm.sign || '').length > 2);
      if (theme !== 'owl') await p2.screenshot({ path: path.join(QA, `theme-${theme}-1024.png`) });
      await p2.close();
    }
  }

  /* ============================ G: no sound ============================ */
  console.log('G. no-sound-by-construction');
  {
    const page = await newPage({});
    await page.goto(BASE + '?hshtest=1', { waitUntil: 'networkidle0' });
    await page.click('.hsh-big');
    await page.waitForFunction(() => window.__hushOwl && window.__hushOwl.phase === 'live', { timeout: 8000 });
    await page.evaluate(() => window.__hushTest.setAmp(0.5));
    await waitState(page, 'awake', 15000);
    await page.evaluate(() => window.__hushTest.setAmp(0.0005));
    await waitState(page, 'asleep', 15000);
    ok('the tool never creates an output oscillator', await page.evaluate(() => window.__oscOutCount === 0));
    await page.close();
  }

  /* ============================ H: reduced motion ============================ */
  console.log('H. reduced motion');
  {
    const page = await newPage({ reduced: true });
    await page.goto(BASE + '?hshtest=1', { waitUntil: 'networkidle0' });
    await page.click('.hsh-big');
    await page.waitForFunction(() => window.__hushOwl && window.__hushOwl.phase === 'live', { timeout: 8000 });
    await page.evaluate(() => window.__hushTest.setAmp(0.5));
    ok('reduced motion: states still transition', await waitState(page, 'awake', 15000));
    const sway = await page.evaluate(() => document.querySelector('.hsh-scene').style.getPropertyValue('--hsh-sway'));
    ok('reduced motion: no sway writes', sway === '');
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nRESULT: ${fail ? 'FAIL' : 'PASS'}  (${pass} passed, ${fail} failed)`);
  if (fail) bad.forEach((b) => console.log('  - ' + b));
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
