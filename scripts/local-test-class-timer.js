#!/usr/bin/env node
/* =====================================================================
   local-test-class-timer.js — the local DoD for the Class Timer
   (mini tools/class-timer.html).

   Serves `mini tools/` locally, then:
     A. viewport sweep 320·360·412·768·1024×768·1024×900·1366×768 on the
        wedge — no overflow · taps ≥44px · FITS (dock ≤ viewport);
        + each other metaphor at 1024×768 and 360 (premium-forced)
     B. the engine:
        · 3s real timer → start + end logged EXACTLY once, done rest
          state, chime fired, no repeat
        · fake-jump: 600s running, force endAt into the past → exactly
          ONE end fire across two extra ticks (dedupe)
        · one-minute + halfway cues: direct-tick edge tests (no waits)
        · +1 min mid-run grows remaining; halfFired stays true
        · pause freezes remaining; resume continues
        · resume-mid-run: start 60s, reload at ~3s → running with
          remaining ∈ [50,58]s
        · finished-while-away: persisted running timer with past endAt
          → reload renders done SILENTLY (no chime, no end log)
     C. NO-ALARM assertion (structural): every oscillator is 'sine',
        peak scheduled gain ≤ 0.3, ≤4 notes per cue, no looping buffer
        sources anywhere
     D. reset guard: reset while running → confirm scrim; Keep going
        continues; Stop → idle
     E. readout: absent by default; ON → 10s-band rounding above 2min
     F. free gates: non-wedge metaphor reverts + gate · presets gated ·
        corner gated; premium unlocks presets row + corner card
     G. deep link ?t&label&metaphor pre-armed idle — NO autostart
     H. voices: premium start speaks the interpolated label; free start
        speaks nothing
     I. lang smoke de + fi · console clean
   Screenshots → docs/audit-results/class-timer/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'class-timer', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const VIEWPORTS = [
  { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 },
  { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true }, { w: 1366, h: 768, fits: true },
];

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/class-timer.html';
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

async function forcePremium(page) {
  await page.evaluate(() => {
    const st = JSON.parse(localStorage.getItem('lcs:class-timer:v1') || '{"v":1}');
    st.v = 1;
    st.ent = { tier: 'full', checkedAt: new Date().toISOString() };
    localStorage.setItem('lcs:class-timer:v1', JSON.stringify(st));
    localStorage.setItem('accessToken', 'test-token');
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/class-timer.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    if (window.speechSynthesis) window.speechSynthesis.speak = function (u) { window.__spoken.push(u.text); };
    /* no-alarm spies */
    window.__oscTypes = [];
    window.__gainPeaks = [];
    window.__loopedSources = 0;
    const AC = window.AudioContext;
    if (AC) {
      window.AudioContext = function () {
        const ctx = new AC();
        const co = ctx.createOscillator.bind(ctx);
        ctx.createOscillator = function () {
          const o = co();
          const st = o.start.bind(o);
          o.start = function () { window.__oscTypes.push(o.type); return st.apply(null, arguments); };
          return o;
        };
        const cg = ctx.createGain.bind(ctx);
        ctx.createGain = function () {
          const g = cg();
          const lr = g.gain.linearRampToValueAtTime.bind(g.gain);
          g.gain.linearRampToValueAtTime = function (v, t) { window.__gainPeaks.push(v); return lr(v, t); };
          return g;
        };
        const cb = ctx.createBufferSource.bind(ctx);
        ctx.createBufferSource = function () {
          const s = cb();
          const st2 = s.start.bind(s);
          s.start = function () { if (s.loop) window.__loopedSources++; return st2.apply(null, arguments); };
          return s;
        };
        return ctx;
      };
    }
  });

  /* ---------- A. viewport sweep (wedge) ---------- */
  console.log('\nA. viewport sweep (wedge)');
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.ctm-big', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const small = [];
      for (const s of ['.ctm-chip', '.ctm-big', '.ctm-ctrlchip', '.ctm-presetchip']) {
        document.querySelectorAll(s).forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width && r.height < 43) small.push(`${s} ${Math.round(r.width)}x${Math.round(r.height)}`);
        });
      }
      const last = [...document.querySelectorAll('.ctm-wrap > *')].pop();
      return { overflow, small, bottom: last ? last.getBoundingClientRect().bottom : 0, vh: window.innerHeight, met: !!document.querySelector('.ctm-met-wedge') };
    });
    const tag = `${vp.w}x${vp.h}`;
    let bad = false;
    if (m.overflow > 1) { FAIL(`${tag}: horizontal overflow ${m.overflow}px`); bad = true; }
    if (m.small.length) { FAIL(`${tag}: small taps: ${[...new Set(m.small)].slice(0, 3).join(', ')}`); bad = true; }
    if (!m.met) { FAIL(`${tag}: wedge missing`); bad = true; }
    if (vp.fits && m.bottom > m.vh + 1) { FAIL(`${tag}: content ${Math.round(m.bottom)} > ${m.vh} (FITS)`); bad = true; }
    if (!bad) OK(`${tag}: fits (bottom ${Math.round(m.bottom)}/${m.vh})`);
    if (vp.w === 360) await page.screenshot({ path: path.join(OUT, 'sweep-360.png'), fullPage: true });
    if (vp.w === 768 && vp.h === 1000) await page.screenshot({ path: path.join(OUT, 'sweep-768.png'), fullPage: true });
    if (vp.w === 1024 && vp.h === 768) await page.screenshot({ path: path.join(OUT, 'idle-wedge-1024x768.png') });
  }

  /* other metaphors at 1024×768 + 360 (premium) */
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await forcePremium(page);
  for (const met of ['jar', 'candle', 'balloon']) {
    for (const [w, h] of [[1024, 768], [360, 740]]) {
      await page.setViewport({ width: w, height: h });
      await page.goto(BASE + `?lang=en&metaphor=${met}`, { waitUntil: 'networkidle0' });
      await page.waitForSelector('.ctm-met-' + met, { timeout: 8000 }).catch(() => null);
      const m = await page.evaluate((met) => {
        const last = [...document.querySelectorAll('.ctm-wrap > *')].pop();
        return {
          met: !!document.querySelector('.ctm-met-' + met),
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          bottom: last ? last.getBoundingClientRect().bottom : 0,
          vh: window.innerHeight,
        };
      }, met);
      if (!m.met) FAIL(`${met}@${w}: metaphor missing`);
      else if (m.overflow > 1) FAIL(`${met}@${w}: overflow ${m.overflow}px`);
      else if (w === 1024 && m.bottom > m.vh + 1) FAIL(`${met}@1024x768: ${Math.round(m.bottom)} > ${m.vh} (FITS)`);
      else OK(`${met}@${w}: fits`);
      if (w === 1024) await page.screenshot({ path: path.join(OUT, `idle-${met}-1024x768.png`) });
    }
  }

  /* ---------- B. the engine ---------- */
  console.log('\nB. engine (1024×768)');
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ctm-big');

  /* 3s real timer */
  await page.evaluate(() => { ClassTimer.timer.duration = 3; ClassTimer.render(); });
  await page.click('.ctm-big.coral');
  await sleep(600);
  let st = await page.evaluate(() => ({ phase: ClassTimer.timer.phase, log: window.__lcsTimerLog.map(l => l.cue) }));
  if (st.phase !== 'running' || st.log.filter(c => c === 'start').length !== 1) FAIL(`start: phase=${st.phase} log=[${st.log}]`);
  else OK('3s timer started (start logged once)');
  await sleep(3200);
  st = await page.evaluate(() => ({
    phase: ClassTimer.timer.phase,
    log: window.__lcsTimerLog.map(l => l.cue),
    hero: (document.querySelector('.ctm-hero') || {}).textContent,
  }));
  if (st.phase !== 'done' || st.log.filter(c => c === 'end').length !== 1) FAIL(`end: phase=${st.phase} log=[${st.log}]`);
  else if (st.log.filter(c => c === 'chime').length !== 1) FAIL(`chime count: [${st.log}]`);
  else OK(`ends once with one chime, rest label "${st.hero}"`);
  await page.screenshot({ path: path.join(OUT, 'done-rest-1024x768.png') });
  /* let it sit — no repeat chime */
  await sleep(1500);
  st = await page.evaluate(() => window.__lcsTimerLog.filter(l => l.cue === 'chime').length);
  if (st !== 1) FAIL(`repeat chime: ${st}`);
  else OK('no repeat chime at rest');

  /* fake-jump dedupe: 600s running, force endAt past, two manual ticks */
  await page.evaluate(() => { ClassTimer._resetToIdle(); ClassTimer.timer.duration = 600; ClassTimer.render(); });
  await page.click('.ctm-big.coral');
  await sleep(400);
  const jump = await page.evaluate(() => {
    window.__lcsTimerLog.length = 0;
    ClassTimer.timer.endAt = Date.now() - 1000;   /* the tab slept 10 minutes */
    ClassTimer._tick();
    ClassTimer._tick();
    ClassTimer._tick();
    return window.__lcsTimerLog.filter(l => l.cue === 'end').length;
  });
  if (jump !== 1) FAIL(`fake-jump dedupe: ${jump} end fires (want exactly 1)`);
  else OK('fake-jump: exactly one end fire across 3 ticks');

  /* one-minute + halfway edge tests (direct ticks, no waiting) */
  const cues = await page.evaluate(() => {
    ClassTimer._resetToIdle();
    ClassTimer.api.settings.half = true;
    ClassTimer.api.settings.oneMin = true;
    const t = ClassTimer.timer;
    t.duration = 300; t.phase = 'running';
    t.halfFired = false; t.oneMinFired = false; t.endFired = false;
    window.__lcsTimerLog.length = 0;
    t.endAt = Date.now() + 140000;   /* remaining 140s < half(150s) */
    ClassTimer._tick();
    const afterHalf = window.__lcsTimerLog.map(l => l.cue).join(',');
    t.endAt = Date.now() + 55000;    /* remaining 55s < 60s */
    ClassTimer._tick();
    const afterOne = window.__lcsTimerLog.map(l => l.cue).join(',');
    ClassTimer._tick();              /* no repeats */
    return { afterHalf, afterOne, final: window.__lcsTimerLog.map(l => l.cue).join(',') };
  });
  if (cues.afterHalf !== 'half') FAIL(`half cue: [${cues.afterHalf}]`);
  else if (cues.afterOne !== 'half,onemin') FAIL(`one-min cue: [${cues.afterOne}]`);
  else if (cues.final !== 'half,onemin') FAIL(`cue repeat: [${cues.final}]`);
  else OK('halfway + one-minute fire once each (edge-triggered)');

  /* +1 min grows remaining; halfFired stays true */
  const plus = await page.evaluate(() => {
    const before = ClassTimer._remaining();
    ClassTimer._plusMin();
    return { grew: ClassTimer._remaining() - before, halfFired: ClassTimer.timer.halfFired };
  });
  if (plus.grew < 59000 || plus.grew > 61000) FAIL(`+1 min grew ${plus.grew}ms`);
  else if (!plus.halfFired) FAIL('+1 min reset halfFired (second halfway cue would fire)');
  else OK('+1 min grows remaining, no second halfway');

  /* pause freezes */
  const pz = await page.evaluate(async () => {
    ClassTimer._pause();
    const a = ClassTimer._remaining();
    await new Promise(r => setTimeout(r, 700));
    return { a, b: ClassTimer._remaining(), phase: ClassTimer.timer.phase };
  });
  if (pz.phase !== 'paused' || pz.a !== pz.b) FAIL(`pause: phase=${pz.phase} ${pz.a}→${pz.b}`);
  else OK('pause freezes remaining');
  await page.screenshot({ path: path.join(OUT, 'paused-1024x768.png') });

  /* resume-mid-run across reload */
  await page.evaluate(() => { ClassTimer._resetToIdle(); ClassTimer.timer.duration = 60; ClassTimer.render(); });
  await page.click('.ctm-big.coral');
  await sleep(3000);
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.ctm-hero');
  const res = await page.evaluate(() => ({ phase: ClassTimer.timer.phase, rem: ClassTimer._remaining() }));
  if (res.phase !== 'running' || res.rem < 50000 || res.rem > 58000) FAIL(`resume: phase=${res.phase} remaining=${res.rem}`);
  else OK(`reload mid-run resumes (${Math.round(res.rem / 1000)}s left, running)`);

  /* finished-while-away: silent done */
  await page.evaluate(() => {
    const st = JSON.parse(localStorage.getItem('lcs:class-timer:v1'));
    st.timer = { phase: 'running', duration: 60, endAt: Date.now() - 5000, remainingAtPause: null, labelKey: 'labelCleanup', halfFired: false, oneMinFired: false, endFired: false };
    localStorage.setItem('lcs:class-timer:v1', JSON.stringify(st));
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('.ctm-hero');
  await sleep(700);
  const away = await page.evaluate(() => ({
    phase: ClassTimer.timer.phase,
    away: !!document.querySelector('.ctm-away'),
    chimes: (window.__lcsTimerLog || []).filter(l => l.cue === 'chime' || l.cue === 'end').length,
    oscs: window.__oscTypes.length,
  }));
  if (away.phase !== 'done' || !away.away) FAIL(`away-done: phase=${away.phase} note=${away.away}`);
  else if (away.chimes !== 0 || away.oscs !== 0) FAIL(`away-done NOT silent: cues=${away.chimes} oscs=${away.oscs}`);
  else OK('finished-while-away renders done SILENTLY with the note');

  /* ---------- C. no-alarm assertion ---------- */
  console.log('\nC. no-alarm (structural)');
  await page.evaluate(() => { ClassTimer._resetToIdle(); });
  const alarm = await page.evaluate(async () => {
    window.__oscTypes.length = 0; window.__gainPeaks.length = 0;
    ClassTimer._chime();
    ClassTimer._pip();
    await new Promise(r => setTimeout(r, 300));
    return { types: window.__oscTypes.slice(), peaks: window.__gainPeaks.slice(), loops: window.__loopedSources };
  });
  const badType = alarm.types.find(t => t !== 'sine');
  const badPeak = alarm.peaks.find(p => p > 0.3);
  if (badType) FAIL(`non-sine oscillator: ${badType}`);
  else if (badPeak) FAIL(`gain peak ${badPeak} > 0.3`);
  else if (alarm.types.length > 4) FAIL(`${alarm.types.length} notes in one cue burst (>4)`);
  else if (alarm.loops > 0) FAIL(`${alarm.loops} looping sources`);
  else OK(`alarm-incapable: ${alarm.types.length} sine notes, peaks ≤ ${Math.max(...alarm.peaks)}`);

  /* ---------- D. reset guard ---------- */
  console.log('\nD. reset guard');
  await page.evaluate(() => { ClassTimer.timer.duration = 300; ClassTimer.render(); });
  await page.click('.ctm-big.coral');
  await sleep(300);
  await page.evaluate(() => ClassTimer.reset());
  await sleep(200);
  let rg = await page.evaluate(() => ({ scrim: !!document.querySelector('.ctm-confirm-scrim'), phase: ClassTimer.timer.phase }));
  if (!rg.scrim || rg.phase !== 'running') FAIL(`reset guard: scrim=${rg.scrim} phase=${rg.phase}`);
  else OK('reset while running shows the confirm, timer keeps going');
  await page.evaluate(() => { [...document.querySelectorAll('.ctm-confirm button')].find(b => !b.classList.contains('teal')).click(); });
  await sleep(200);
  rg = await page.evaluate(() => ({ phase: ClassTimer.timer.phase, scrim: !!document.querySelector('.ctm-confirm-scrim') }));
  if (rg.phase !== 'idle' || rg.scrim) FAIL(`confirm Stop: phase=${rg.phase}`);
  else OK('Stop confirms to idle');

  /* ---------- E. readout ---------- */
  console.log('\nE. readout');
  if (await page.$('.ctm-readout')) FAIL('readout visible by default (must be OFF)');
  else OK('readout absent by default');
  const ro = await page.evaluate(() => {
    ClassTimer.api.settings.readout = true;
    ClassTimer.timer.duration = 300;
    ClassTimer.timer.phase = 'running';
    ClassTimer.timer.endAt = Date.now() + 294000;   /* 4:54 remaining */
    ClassTimer.render();
    ClassTimer._paint(ClassTimer._remaining());
    return (document.querySelector('.ctm-readout') || {}).textContent;
  });
  if (ro !== '5:00') FAIL(`readout banding: "${ro}" for 294s (want 5:00 — ceil to 10s band)`);
  else OK('readout rounds up to 10s bands above 2 min');
  await page.evaluate(() => { ClassTimer.api.settings.readout = false; ClassTimer._resetToIdle(); });

  /* ---------- F. free gates + premium ---------- */
  console.log('\nF. free/premium seams (fresh free profile)');
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ctm-big');
  let gate = await page.evaluate(() => {
    ClassTimer.onSettings('metaphor', 'candle');
    return new Promise(r => setTimeout(() => r({
      met: ClassTimer.api.settings.metaphor,
      gate: !!document.querySelector('.ctm-gate'),
    }), 150));
  });
  if (gate.met !== 'wedge' || !gate.gate) FAIL(`metaphor gate: met=${gate.met} gate=${gate.gate}`);
  else OK('non-wedge metaphor reverts + gates for free');
  await page.evaluate(() => { const g = document.querySelector('.ctm-gate'); if (g) g.remove(); });
  await page.evaluate(() => document.querySelector('.ctm-presetchip').click());
  await sleep(150);
  gate = await page.evaluate(() => ({ gate: !!document.querySelector('.ctm-gate'), running: ClassTimer.timer.phase }));
  if (!gate.gate || gate.running !== 'idle') FAIL(`preset gate: gate=${gate.gate}`);
  else OK('presets gated for free');
  /* deep-link metaphor for free must also fall back to wedge */
  await page.goto(BASE + '?lang=en&metaphor=candle', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ctm-met');
  const freeMet = await page.evaluate(() => !!document.querySelector('.ctm-met-candle'));
  if (freeMet) FAIL('free deep-link got the candle (premium metaphor)');
  else OK('free deep-link falls back to the wedge');

  /* premium: presets row taps arm the timer; corner card renders */
  await forcePremium(page);
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ctm-presetchip');
  await page.evaluate(() => document.querySelector('.ctm-presetchip').click());
  await sleep(200);
  const armed = await page.evaluate(() => ({ dur: ClassTimer.timer.duration, label: ClassTimer.timer.labelKey, phase: ClassTimer.timer.phase }));
  if (armed.dur !== 300 || armed.label !== 'labelCleanup' || armed.phase !== 'idle') FAIL(`preset arm: ${JSON.stringify(armed)}`);
  else OK('premium preset one-tap arms Cleanup 5:00 (idle, giant Start)');
  await page.goto(BASE + '?lang=en&embed=corner&t=300', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ctm-cornercard', { timeout: 8000 }).catch(() => null);
  const corner = await page.evaluate(() => {
    const c = document.querySelector('.ctm-cornercard');
    return { there: !!c, w: c ? Math.round(c.getBoundingClientRect().width) : 0, dock: !!document.querySelector('.ctm-dock') };
  });
  if (!corner.there || corner.w > 320 || corner.dock) FAIL(`corner: ${JSON.stringify(corner)}`);
  else OK(`corner card ${corner.w}px, no dock`);
  await page.screenshot({ path: path.join(OUT, 'corner.png') });

  /* ---------- G. deep link pre-armed ---------- */
  console.log('\nG. deep link');
  await page.goto(BASE + '?lang=en&t=600&label=cleanup&metaphor=candle', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ctm-big');
  const dl = await page.evaluate(() => ({
    phase: ClassTimer.timer.phase, dur: ClassTimer.timer.duration,
    label: ClassTimer.timer.labelKey, met: ClassTimer.api.settings.metaphor,
    started: (window.__lcsTimerLog || []).some(l => l.cue === 'start'),
  }));
  if (dl.phase !== 'idle' || dl.dur !== 600 || dl.label !== 'labelCleanup' || dl.met !== 'candle' || dl.started)
    FAIL(`deep link: ${JSON.stringify(dl)}`);
  else OK('deep link pre-arms 10:00 Cleanup candle — idle, NO autostart');

  /* ---------- H. voices ---------- */
  console.log('\nH. voices');
  await page.evaluate(() => { window.__spoken.length = 0; });
  await page.click('.ctm-big.coral');
  await sleep(600);
  let vc = await page.evaluate(() => window.__spoken.slice());
  if (!vc.some(t => /Cleanup/.test(t))) FAIL(`premium start voice: [${vc}]`);
  else OK(`premium start speaks: "${vc[0]}"`);
  await page.evaluate(() => { ClassTimer._resetToIdle(); localStorage.clear(); });
  await page.goto(BASE + '?lang=en&t=600', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.ctm-big');
  await page.evaluate(() => { window.__spoken.length = 0; });
  await page.click('.ctm-big.coral');
  await sleep(600);
  vc = await page.evaluate(() => window.__spoken.length);
  if (vc !== 0) FAIL(`free start spoke ${vc} lines (voices are premium)`);
  else OK('free start is voice-silent (chime-only tier)');
  await page.evaluate(() => ClassTimer._resetToIdle());

  /* ---------- I. lang smoke + console ---------- */
  console.log('\nI. lang smoke + console');
  for (const [lang, want] of [['de', 'Klassen-Timer'], ['fi', 'Luokan ajastin']]) {
    await page.goto(BASE + '?lang=' + lang, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.ctm-big');
    const title = await page.evaluate(() => (document.querySelector('.lcs-title') || {}).textContent || '');
    if (!title.includes(want)) FAIL(`${lang}: title "${title}"`);
    else OK(`${lang}: "${title}"`);
  }
  const realErrors = consoleErrors.filter(e => !/favicon|404|Failed to load resource/.test(e));
  if (realErrors.length) FAIL(`console errors: ${realErrors.slice(0, 4).join(' | ')}`);
  else OK('console clean');

  await browser.close();
  server.close();
  console.log('\n' + (fails.length ? `FAIL — ${fails.length} failure(s)` : 'PASS — class-timer DoD green'));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('HARNESS CRASH:', e); process.exit(1); });
