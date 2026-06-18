#!/usr/bin/env node
/* =====================================================================
   local-test-clock.js — local interaction harness for the E10
   set-the-clock activity (no Next stack needed).

   Serves `mini tools/` at /mini-tools/ and drives the standalone
   clock-activity.html with puppeteer to exercise the REAL set path:

     • renders (clock face + 2 hands + digital readout) per locale;
     • per-locale CORE strings — the title renders the locale's localized
       text; the prompt shows the locale's WORDED time (the half-idiom);
     • RADIAL DRAG smoke — grab the minute hand by its tip (the only hand at
       the outer radius) and drag it to the bottom; assert setMinute changes
       (proves the pointer-events radial drag is wired);
     • KEYBOARD set (deterministic — both hands overlap at the 12:00 start,
       so the keyboard path reliably reaches an exact (H,M)): the CORRECT
       target celebrates + locks; a WRONG time does not;
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • mobile overflow 280/360/412/768.

   Usage:
     node scripts/local-test-clock.js                 # all 11 locales
     node scripts/local-test-clock.js --locales=en,de --shot
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const SHOT = has('shot');
/* both E10 coordinates on the shared core: #1 (1.MD.B.3, half-hour) is the
   regression; #2 (2.MD.C.7, to-5-min) is the new one. */
const ACTIVITIES = [
  { id: 'clock.set-clock.1-md-b-3', tag: '1.MD.B.3' },
  { id: 'clock.tell-time-5-min.2-md-c-7', tag: '2.MD.C.7' },
];
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'clock');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file = (p === '/' || p === '/clock-activity.html') ? path.join(MINI, 'clock-activity.html')
      : p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length))
      : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
function coreStrings() {
  const src = fs.readFileSync(path.join(MINI, 'clock-core.js'), 'utf8');
  const win = {}; new Function('window', src)(win); return win.ClockCore.strings;
}

(async () => {
  const STR = coreStrings();
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port, BASE = `http://127.0.0.1:${PORT}`;
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };

  for (const loc of LOCALES) {
   for (const act of ACTIVITIES) {
    const tag = loc + '/' + act.tag;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/clock-activity.html?lang=${loc}&activity=${act.id}&embed=1`;

    /* set the time deterministically via the keyboard fallback (Enter steps
       hour +1 / minute +minuteStep) — robust against the 12:00 hand overlap,
       and honors the activity's 5-min vs 30-min granularity. */
    async function keyboardSet(H, M) {
      const cur = await page.evaluate(() => ({ h: window.ClockActivity.setHour, m: window.ClockActivity.setMinute, step: window.ClockActivity.minuteStep || 30 }));
      const mp = (((M - cur.m) % 60 + 60) % 60) / cur.step;
      for (let i = 0; i < mp; i++) { await page.$eval('.clk-hand-minute', e => e.focus()); await page.keyboard.press('Enter'); }
      const hp = ((H - cur.h) % 12 + 12) % 12;
      for (let i = 0; i < hp; i++) { await page.$eval('.clk-hand-hour', e => e.focus()); await page.keyboard.press('Enter'); }
    }

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.ClockActivity;
        return t && t._activityRow && document.querySelector('.clk-svg') && document.querySelector('.clk-hand-hour') && document.querySelector('.clk-hand-minute') && document.querySelector('.clk-readout') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      /* 1. localized title */
      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      note(title === (STR.title[loc] || STR.title.en), `${tag}: title "${title}" ≠ localized "${STR.title[loc] || STR.title.en}"`);

      /* prompt shows the locale's WORDED time (idiom), not a bare key */
      const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      note(prompt.length > 0 && !/\d+:\d\d/.test(prompt), `${tag}: prompt "${prompt}" looks like a bare H:MM key (worded time missing)`);

      /* 2. variety over 2 passes */
      const N = await page.evaluate(() => window.ClockActivity._pool.length);
      const ids = await page.evaluate((c) => { const t = window.ClockActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
      note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

      /* 3. RADIAL DRAG smoke — grab the minute hand by its tip + drag to bottom
            (180° = 30 min, a multiple of both 30 and 5, so valid for both). */
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => document.querySelector('.clk-hand-minute'), { timeout: 5000 });
      const geo = await page.evaluate(() => { const r = document.querySelector('.clk-svg').getBoundingClientRect(); return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, scale: r.width / 100 }; });
      const m0 = await page.evaluate(() => window.ClockActivity.setMinute);
      const tip = { x: geo.cx + 0 * geo.scale, y: geo.cy - 34 * geo.scale };
      const bottom = { x: geo.cx + 0 * geo.scale, y: geo.cy + 34 * geo.scale };
      await page.mouse.move(tip.x, tip.y); await page.mouse.down();
      await page.mouse.move((tip.x + bottom.x) / 2, (tip.y + bottom.y) / 2, { steps: 4 });
      await page.mouse.move(bottom.x, bottom.y, { steps: 6 }); await page.mouse.up();
      const m1 = await page.evaluate(() => window.ClockActivity.setMinute);
      note(m1 === 30 && m1 !== m0, `${tag}: minute-hand radial drag did not set minute to 30 (got ${m1})`);

      /* 4. WRONG time → no celebrate */
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      const tgt = await page.evaluate(() => ({ H: window.ClockActivity.targetHour, M: window.ClockActivity.targetMinute }));
      await keyboardSet((tgt.H % 12) + 1, tgt.M);   // wrong hour, correct minute
      await page.click('.lcs-activity-check');
      const wrong = await page.evaluate(() => ({ c: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), ro: window.ClockActivity.readOnly }));
      note(!wrong.c && !wrong.ro, `${tag}: a wrong time still celebrated/locked`);

      /* 5. CORRECT time → celebrate + lock */
      await keyboardSet(tgt.H, tgt.M);
      await page.click('.lcs-activity-check');
      const ok = await page.evaluate(() => ({ c: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), ro: window.ClockActivity.readOnly, correct: window.ClockActivity.isCorrect() }));
      note(ok.correct, `${tag}: keyboard-set to target did not satisfy isCorrect()`);
      note(ok.c && ok.ro, `${tag}: correct time (${tgt.H}:${tgt.M}) did not celebrate + lock`);

      /* 6. mobile overflow */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 900 });
        await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
        if (SHOT && (w === 360 || w === 768)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${act.tag}-${w}.png`) });
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okTag = !fails.some(f => f.startsWith(tag + ':'));
      console.log(`  ${okTag ? 'ok  ' : 'FAIL'} ${tag} — "${title}" | "${prompt}" | ${new Set(p1).size} distinct`);
    } catch (e) {
      fails.push(`${tag}: ${e.message}`);
      console.log(`  FAIL ${tag} — ${e.message}`);
    } finally { await page.close(); }
   }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`CLOCK LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`CLOCK LOCAL TEST PASSED — ${LOCALES.length} locale(s) × ${ACTIVITIES.length} activities (1.MD.B.3 regression + 2.MD.C.7): render + localized worded-prompt + radial-drag + keyboard set (correct celebrates, wrong doesn't) + ≥7-round reshuffle + no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
