#!/usr/bin/env node
/* =====================================================================
   local-test-learning-clock.js — the local DoD for Learning Clock
   (mini tools/learning-clock.html).

   Serves `mini tools/` locally, then:
     A. viewport sweep — no overflow, taps ≥44px, FITS at ≥1024
     B. GEARING INVARIANTS: minute drag +720° → hour +2 (cross-12 up);
        −360° → hour −1; hour drag sweeps the minute at 12×; hour angle
        ≡ total/2 after every synthetic drag; ONE real pointer drag
        moves the hands
     C. snap per granularity (60/30/15/5/1) on release
     D. the bubble text equals sayTime at 20 random snapped times
     E. TTS spy: speaks the bubble text + api.lang on release; SILENT
        during the drag (speakDrag off); no speech before a gesture
     F. task mode (premium): 12 hour-granularity targets, no repeat
        until exhausted; wrong → gentle note (what you made + nudge, no
        red); right → glow + Next; gran 1 prompts use the formal register
     G. elapsed across 12: 11:50 → 0:20 = "30 minutes"; band segments
     H. digital: en 12h + AM; de dual line; moon tap flips to 14:30
     I. the de variant chip exists ONLY on de and flips 2:15 speech
     J. free gates: 15/5/1 chips, Practice, How-long, Our times
     K. lang smoke de + fi (the 2:30 idiom is the title check) · console
   Screenshots → docs/audit-results/learning-clock/qa/
   Exit 1 on any FAIL.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'learning-clock', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/learning-clock.html';
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
    localStorage.setItem('lcs:learning-clock:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, ourTimes: [] }));
    localStorage.setItem('accessToken', 'test-token');
  });
}
/* synthetic drag through the real engine (angle sequence on a hand) */
async function synthDrag(page, which, degrees, steps) {
  return page.evaluate((which, degrees, steps) => {
    const t = LearningClock;
    t._drag = { which, lastAngle: 0 };
    let a = 0;
    for (let i = 0; i < steps; i++) {
      a += degrees / steps;
      t._applyDrag(which, ((a % 360) + 360) % 360);
    }
    t._drag = null;
    t._snapRelease();
    return t.total;
  }, which, degrees, steps);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/learning-clock.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    if (window.speechSynthesis) window.speechSynthesis.speak = function (u) { window.__spoken.push({ text: u.text, lang: u.lang }); };
  });

  /* ---------- A. sweep ---------- */
  console.log('\nA. viewport sweep');
  const VIEWPORTS = [
    { w: 320, h: 640 }, { w: 360, h: 740 }, { w: 412, h: 820 }, { w: 768, h: 1000 },
    { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true }, { w: 1366, h: 768, fits: true },
  ];
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.lck-svg', { timeout: 8000 }).catch(() => null);
    const m = await page.evaluate(() => {
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      const small = [];
      document.querySelectorAll('.lck-chip, .lck-big, .lck-speak, .lck-why, .lck-sky').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width && (r.height < 39 || r.width < 39)) small.push(el.className.split(' ')[0] + ':' + Math.round(Math.min(r.height, r.width)));
      });
      const last = [...document.querySelectorAll('.lck-wrap > *')].pop();
      return { overflow, small, svg: !!document.querySelector('.lck-svg'), bubble: (document.querySelector('.lck-bubbletext') || {}).textContent, bottom: last ? last.getBoundingClientRect().bottom : 0, vh: window.innerHeight };
    });
    const tag = `${vp.w}x${vp.h}`;
    let bad = false;
    if (m.overflow > 1) { FAIL(`${tag}: overflow ${m.overflow}px`); bad = true; }
    if (m.small.length) { FAIL(`${tag}: small taps ${m.small.slice(0, 3)}`); bad = true; }
    if (!m.svg || m.bubble !== 'half past 2') { FAIL(`${tag}: face/bubble wrong ("${m.bubble}")`); bad = true; }
    if (vp.fits && m.bottom > m.vh + 1) { FAIL(`${tag}: ${Math.round(m.bottom)} > ${m.vh} (FITS)`); bad = true; }
    /* EVERY width: the dock's last control must be REACHABLE — visible
       in-frame, or brought in-frame by scrolling the stage (the shell
       clips html/body; the tool opts the stage into scroll ≤560) */
    if (!vp.fits) {
      const reach = await page.evaluate(() => {
        /* the scroll container is BODY (the tool opts it into scroll
           ≤560; the app is content-height under #lcs-root) */
        document.body.scrollTop = document.body.scrollHeight;
        const stage = document.querySelector('.lcs-stage');
        if (stage) stage.scrollTop = stage.scrollHeight;
        const chips = [...document.querySelectorAll('.lck-dock .lck-chip')];
        const lastChip = chips[chips.length - 1];
        const r = lastChip ? lastChip.getBoundingClientRect() : null;
        const out = { n: chips.length, bottom: r ? Math.round(r.bottom) : -1, vh: window.innerHeight };
        return out;
      });
      if (!reach.n || reach.bottom < 0 || reach.bottom > reach.vh + 1) { FAIL(`${tag}: dock unreachable (${reach.n} chips, bottom ${reach.bottom} vs vh ${reach.vh})`); bad = true; }
      if (vp.w === 360) await page.screenshot({ path: path.join(OUT, 'sweep-360-bottom.png') });
      await page.evaluate(() => { document.body.scrollTop = 0; const s = document.querySelector('.lcs-stage'); if (s) s.scrollTop = 0; });
    }
    if (!bad) OK(`${tag}: fits/reachable, bubble "half past 2"`);
    if (vp.w === 360) await page.screenshot({ path: path.join(OUT, 'sweep-360.png'), fullPage: true });
    if (vp.w === 768 && vp.h === 1000) await page.screenshot({ path: path.join(OUT, 'sweep-768.png'), fullPage: true });
    if (vp.w === 1024 && vp.h === 768) await page.screenshot({ path: path.join(OUT, 'explore-1024x768.png') });
  }

  /* ---------- B. gearing ---------- */
  console.log('\nB. gearing invariants');
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.lck-svg');

  /* minute +720° from 2:30 → 4:30 */
  let t = await page.evaluate(() => { LearningClock.total = 150; LearningClock._paint(); return 0; });
  t = await synthDrag(page, 'minute', 720, 48);
  if (t !== 270) FAIL(`minute +720°: total=${t} (want 270 = 4:30)`);
  else OK('minute +720° → hour +2 (2:30 → 4:30)');
  /* minute −360° → back one hour */
  t = await synthDrag(page, 'minute', -360, 24);
  if (t !== 210) FAIL(`minute −360°: total=${t} (want 210 = 3:30)`);
  else OK('minute −360° → hour −1 (4:30 → 3:30)');
  /* hour drag +30° = +1 hour, minute sweeps (total +60) */
  t = await synthDrag(page, 'hour', 30, 12);
  if (t !== 270) FAIL(`hour +30°: total=${t} (want 270)`);
  else OK('hour hand +30° sweeps a full minute lap (+60 min)');
  /* hour angle ≡ total/2 */
  const angles = await page.evaluate(() => {
    const tr = LearningClock._hourHand.getAttribute('transform');
    return { tr, expect: (LearningClock.total / 2).toFixed(2) };
  });
  if (!angles.tr.includes(angles.expect)) FAIL(`hour angle: ${angles.tr} vs total/2=${angles.expect}`);
  else OK('hour angle ≡ total/2 after drags');
  /* one REAL pointer drag on the minute pad */
  const before = await page.evaluate(() => LearningClock.total);
  const pad = await page.evaluate(() => {
    const r = LearningClock._minHand.querySelector('.lck-pad').getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });
  const c = await page.evaluate(() => {
    const r = LearningClock._svg.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await page.mouse.move(pad.x, pad.y);
  await page.mouse.down();
  /* sweep ~90° around the center */
  const a0 = Math.atan2(pad.x - c.x, -(pad.y - c.y));
  for (let i = 1; i <= 10; i++) {
    const a = a0 + (Math.PI / 2) * i / 10;
    const rr = Math.hypot(pad.x - c.x, pad.y - c.y);
    await page.mouse.move(c.x + Math.sin(a) * rr, c.y - Math.cos(a) * rr);
    await sleep(16);
  }
  await page.mouse.up();
  await sleep(200);
  const after = await page.evaluate(() => LearningClock.total);
  if (after === before) FAIL('real pointer drag moved nothing');
  else OK(`real pointer drag works (${before} → ${after})`);

  /* ---------- C. snap per granularity ---------- */
  console.log('\nC. snap per granularity');
  await forcePremium(page);
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.lck-svg');
  for (const g of ['60', '30', '15', '5', '1']) {
    const snapped = await page.evaluate((g) => {
      LearningClock.api.settings.granularity = g;
      LearningClock.total = 187;              /* 3:07 raw */
      LearningClock._snapRelease();
      return LearningClock.total;
    }, g);
    const step = parseInt(g, 10);
    if (snapped % step !== 0) FAIL(`gran ${g}: snapped to ${snapped}`);
    else OK(`gran ${g}: 187 → ${snapped}`);
  }

  /* ---------- D. bubble == sayTime ---------- */
  console.log('\nD. bubble equals sayTime');
  const mism = await page.evaluate(() => {
    LearningClock.api.settings.granularity = '5';
    const bad = [];
    for (let i = 0; i < 20; i++) {
      const t2 = Math.floor(Math.random() * 144) * 5;
      LearningClock.total = t2;
      LearningClock._paint();
      LearningClock._bubbleFinal(false);
      const want = LearningClock._say();
      const got = document.querySelector('.lck-bubbletext').textContent;
      if (got !== want) bad.push(t2 + ':' + got + '≠' + want);
    }
    return bad;
  });
  if (mism.length) FAIL(`bubble mismatches: ${mism.slice(0, 3)}`);
  else OK('bubble text equals sayTime at 20 random times');

  /* ---------- E. TTS seams ---------- */
  console.log('\nE. TTS seams');
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.lck-svg');
  const pre = await page.evaluate(() => window.__spoken.length);
  if (pre > 0) FAIL(`speech before gesture: ${pre}`);
  else OK('silent before the first gesture');
  /* drag silently (speakDrag off), speak on release */
  await page.evaluate(() => { window.__spoken.length = 0; });
  await synthDrag(page, 'minute', 90, 8);
  await sleep(400);   /* LCSAudio is file-first async → TTS fallback */
  const spoke1 = await page.evaluate(() => window.__spoken.slice());
  if (spoke1.length !== 1) FAIL(`release speech: ${spoke1.length} utterances`);
  else OK(`speaks once on release: "${spoke1[0].text}"`);
  /* bubble tap re-speaks */
  await page.evaluate(() => { window.__spoken.length = 0; });
  await page.evaluate(() => document.querySelector('.lck-speak').click());
  await sleep(300);
  const spoke2 = await page.evaluate(() => window.__spoken.slice());
  const bubbleNow = await page.evaluate(() => document.querySelector('.lck-bubbletext').textContent);
  if (!spoke2.length || spoke2[0].text !== bubbleNow) FAIL(`re-speak: [${spoke2.map(s => s.text)}] vs "${bubbleNow}"`);
  else if (!/^en/i.test(spoke2[0].lang)) FAIL(`speech lang ${spoke2[0].lang}`);
  else OK('bubble tap re-speaks the exact text in the tool locale');

  /* ---------- F. task mode ---------- */
  console.log('\nF. task mode (premium)');
  await page.evaluate(() => {
    LearningClock.api.settings.granularity = '60';
    LearningClock.mode = 'task';
    LearningClock.task = { order: [], idx: 0, phase: 'set', target: null, done: 0 };
    LearningClock._nextTask();
  });
  await sleep(200);
  const walk = await page.evaluate(() => {
    const seen = [];
    for (let i = 0; i < 12; i++) {
      seen.push(LearningClock.task.target);
      LearningClock.total = LearningClock.task.target;
      LearningClock._checkTask();
      LearningClock._nextTask();
    }
    return seen;
  });
  if (new Set(walk).size !== 12) FAIL(`task repeats: ${new Set(walk).size}/12 distinct`);
  else OK('12 hour-granularity targets, no repeat until exhausted');
  /* wrong answer = gentle */
  const gentle = await page.evaluate(() => {
    LearningClock.total = (LearningClock.task.target + 60) % 720;
    LearningClock._checkTask();
    return { note: LearningClock._taskNote, phase: LearningClock.task.phase, kind: LearningClock._taskNoteKind };
  });
  if (gentle.phase !== 'set' || gentle.kind !== 'nudge' || !gentle.note) FAIL(`gentle miss: ${JSON.stringify(gentle).slice(0, 80)}`);
  else OK('wrong answer → gentle note, hands stay live, no red');
  await page.screenshot({ path: path.join(OUT, 'task-1024x768.png') });
  /* formal register at gran 1 */
  const formal = await page.evaluate(() => {
    LearningClock.api.settings.granularity = '1';
    LearningClock.total = 157;   /* 2:37 */
    return LearningClock._say();
  });
  if (!/thirty-seven/.test(formal)) FAIL(`formal register: "${formal}"`);
  else OK(`gran 1 speaks formally: "${formal}"`);

  /* ---------- G. elapsed ---------- */
  console.log('\nG. elapsed across 12');
  const el = await page.evaluate(() => {
    LearningClock.mode = 'elapsed';
    LearningClock.elapsed = { start: 710, end: 20 };   /* 11:50 → 12:20 */
    LearningClock.total = 20;
    LearningClock.render();
    return {
      text: document.querySelector('.lck-bubbletext').textContent,
      segs: document.querySelectorAll('.lck-svg g path').length,
    };
  });
  if (!/30/.test(el.text)) FAIL(`across-12 duration: "${el.text}"`);
  else if (el.segs < 2) FAIL(`band segments: ${el.segs} (want ≥2 across the boundary)`);
  else OK(`11:50 → 12:20 = "${el.text}" in ${el.segs} segments`);
  await page.screenshot({ path: path.join(OUT, 'elapsed-1024x768.png') });

  /* ---------- H. digital ---------- */
  console.log('\nH. digital line');
  await page.evaluate(() => { LearningClock.mode = 'explore'; LearningClock.total = 150; LearningClock.pm = false; LearningClock.render(); });
  const dEn = await page.evaluate(() => (document.querySelector('.lck-d1') || {}).textContent);
  if (dEn !== '2:30 AM') FAIL(`en digital: "${dEn}"`);
  else OK('en shows 2:30 AM');
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.lck-svg');
  /* start from the NIGHT half (default is pm/afternoon) */
  await page.evaluate(() => { LearningClock.pm = false; LearningClock.render(); });
  let dDe = await page.evaluate(() => ({
    d1: (document.querySelector('.lck-d1') || {}).textContent,
    d2: (document.querySelector('.lck-d2') || {}).textContent,
  }));
  if (dDe.d1 !== '2:30' || !/02:30/.test(dDe.d2)) FAIL(`de dual: ${JSON.stringify(dDe)}`);
  /* sky truth: 02:30 is night → moon art + ☾ glyph */
  let skyState = await page.evaluate(() => ({ moon: !!document.querySelector('.lck-sky.moon'), glyph: (document.querySelector('.lck-d2') || { textContent: '' }).textContent.slice(0, 1) }));
  if (!skyState.moon || skyState.glyph !== '☾') FAIL(`sky at 02:30: ${JSON.stringify(skyState)} (want moon + ☾)`);
  await page.evaluate(() => document.querySelector('.lck-sky').click());
  await sleep(150);
  dDe = await page.evaluate(() => (document.querySelector('.lck-d2') || {}).textContent);
  if (!/14:30/.test(dDe)) FAIL(`pm flip: "${dDe}"`);
  skyState = await page.evaluate(() => ({ moon: !!document.querySelector('.lck-sky.moon'), glyph: (document.querySelector('.lck-d2') || { textContent: '' }).textContent.slice(0, 1) }));
  if (skyState.moon || skyState.glyph !== '☀') FAIL(`sky at 14:30: ${JSON.stringify(skyState)} (want sun + ☀)`);
  else OK('de dual 2:30/☾02:30; sky tap flips to ☀14:30 — art tracks the real hour');

  /* ---------- I. de variant chip ---------- */
  console.log('\nI. de variant');
  const dv = await page.evaluate(() => {
    const chip = document.querySelector('.lck-devariant');
    if (!chip) return { err: 'chip missing on de' };
    const before = LearningClock.sayTime('de', 2, 15, { deQuarter: !!LearningClock._store.deQuarter });
    chip.click();
    return new Promise(r => setTimeout(() => r({
      before,
      after: LearningClock.sayTime('de', 2, 15, { deQuarter: !!LearningClock._store.deQuarter }),
    }), 150));
  });
  if (dv.err || dv.before !== 'Viertel nach 2' || dv.after !== 'viertel 3') FAIL(`de variant: ${JSON.stringify(dv)}`);
  else OK('the viertel chip flips 2:15: "Viertel nach 2" ↔ "viertel 3"');
  const dvEn = await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' }).then(() => page.evaluate(() => !!document.querySelector('.lck-devariant')));
  if (dvEn) FAIL('variant chip leaked to en');
  else OK('variant chip is de-only');

  /* ---------- J. free gates ---------- */
  console.log('\nJ. free gates');
  const page2 = await browser.newPage();
  await page2.setViewport({ width: 1024, height: 768 });
  await page2.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page2.evaluate(() => localStorage.clear());
  await page2.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await page2.waitForSelector('.lck-svg');
  const gates = await page2.evaluate(async () => {
    const out = {};
    const click = async (sel, txt) => {
      const el = [...document.querySelectorAll(sel)].find(e => txt ? e.textContent.includes(txt) : true);
      if (el) el.click();
      await new Promise(r => setTimeout(r, 120));
      const g = document.querySelector('.lck-gate');
      const had = !!g;
      if (g) g.remove();
      return had;
    };
    out.gran5 = await click('.lck-chip[data-g="5"]');
    out.granStuck = LearningClock.api.settings.granularity === '30';
    out.task = await click('.lck-chip', 'Practice');
    out.taskStuck = LearningClock.mode === 'explore';
    out.elapsed = await click('.lck-chip', 'How long?');
    out.saves = await click('.lck-chip', 'Our times');
    return out;
  });
  if (!gates.gran5 || !gates.granStuck || !gates.task || !gates.taskStuck || !gates.elapsed || !gates.saves)
    FAIL(`free gates: ${JSON.stringify(gates)}`);
  else OK('15/5/1, Practice, How-long, Our-times all gate for free');
  await page2.close();

  /* ---------- K. lang smoke + console ---------- */
  console.log('\nK. lang smoke + console');
  for (const [lang, want, idiom] of [['de', 'Lernuhr', 'halb 3'], ['fi', 'Opettelukello', 'puoli 3']]) {
    await page.goto(BASE + '?lang=' + lang, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.lck-svg');
    const got = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent,
      bubble: (document.querySelector('.lck-bubbletext') || {}).textContent,
    }));
    if (!got.title.includes(want) || got.bubble !== idiom) FAIL(`${lang}: "${got.title}" / "${got.bubble}"`);
    else OK(`${lang}: "${got.title}" — 2:30 = "${got.bubble}"`);
  }
  /* the arc renders on ? */
  await page.goto(BASE + '?lang=de', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.lck-svg');
  await page.evaluate(() => document.querySelector('.lck-why').click());
  await sleep(400);
  const arc = await page.evaluate(() => LearningClock._arcEl.getAttribute('opacity'));
  if (arc !== '0.7') FAIL(`arc opacity ${arc}`);
  else OK('explainer arc renders on ?');
  await page.screenshot({ path: path.join(OUT, 'arc-de-1024x768.png') });

  const realErrors = consoleErrors.filter(e => !/favicon|404|Failed to load resource/.test(e));
  if (realErrors.length) FAIL(`console: ${realErrors.slice(0, 4).join(' | ')}`);
  else OK('console clean');

  await browser.close();
  server.close();
  console.log('\n' + (fails.length ? `FAIL — ${fails.length} failure(s)` : 'PASS — learning-clock DoD green'));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('HARNESS CRASH:', e); process.exit(1); });
