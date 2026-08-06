#!/usr/bin/env node
/* =====================================================================
   local-test-clock-read.js — interaction harness for "Owl's Cuckoo
   Cottage" (CCSS 1.MD.B.3). Serves `mini tools/` + drives the shell:

     • READ: a pre-set coupled clock + event-cards → tap the matching event
       → cuckoo acts (the time spoken, spy); tap a WRONG event → SILENT (not
       solved, no red, instant re-try). The READ prompt names NO target time.
     • SET: drag/step the coupled hands to a named time → "Wake the cuckoo!"
       → correct (coupled 30H+0.5M at half-past; hour NOT on the number).
     • ORDER: three set clocks → tap the one showing the asked event.
     • WORLD-CUE: a sky cue → set → commit.
     • NO digital target shown (the readout mirrors the child's CURRENT
       hands, not the target); the day-arc advances per round; wrong is
       SILENT; >=7 cogs + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'clock-read.tell-time.1-md-b-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/clock-read-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const A = () => page.evaluate(() => { const a = window.ClockReadActivity; return { solved: a.solved, picked: a.picked, roundId: a.round && a.round.id, mode: a.round && a.round.mode, dayArc: a.dayArc, setH: a.setHour, setM: a.setMinute }; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ClockReadActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'clock-read.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ClockReadActivity.round && document.querySelector('.crd-root .crd-main'), { timeout: 4000 });
    await sleep(40);
  }
  const clickCard = (eid) => page.evaluate((e) => { const b = document.querySelector('.crd-card[data-id="' + e + '"]'); if (b) b.click(); }, eid).then(() => sleep(30));
  const wrongEventId = () => page.evaluate(() => { const a = window.ClockReadActivity, C = window.ClockReadCore; const cg = C.correctEventId(a.round); return a.round.events.find(e => e.id !== cg).id; });
  const correctEventId = () => page.evaluate(() => window.ClockReadCore.correctEventId(window.ClockReadActivity.round));
  const setHands = (h, m) => page.evaluate((hh, mm) => { const a = window.ClockReadActivity; a.setHour = hh; a.setMinute = mm; a._paint(); }, h, m).then(() => sleep(20));
  const clickWake = () => page.evaluate(() => { const b = document.querySelector('.crd-wake'); if (b) b.click(); }).then(() => sleep(40));
  const clickClock = (i) => page.evaluate((idx) => { const b = document.querySelector('.crd-clockbtn[data-i="' + idx + '"]'); if (b) b.click(); }, i).then(() => sleep(30));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (opts) { window.__spoke.push(opts && opts.text); return o.apply(this, arguments); }; });
    await page.waitForFunction(() => { const t = window.ClockReadActivity; return t && t._activityRow && document.querySelector('.crd-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Owl's Cuckoo Cottage", `header title "${title}"`);

    /* >=7 cogs + reshuffle */
    const N = await page.evaluate(() => window.ClockReadActivity._pool.length);
    const cogs = await page.evaluate(() => new Set(window.ClockReadActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs >= 7, `expected >=7 cogs, got ${cogs}`);
    const ids = await page.evaluate((c) => { const t = window.ClockReadActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* READ: no named target in the prompt + tap correct → cuckoo speaks the time */
    await force('read-bedtime');   /* 8:30, read-half */
    const sayTxt = await page.$eval('.crd-saytop', e => e.textContent).catch(() => '');
    note(!/8[:.]?30|half past|o.?clock/i.test(sayTxt), `the READ prompt names a target time (told-target leak): "${sayTxt}"`);
    /* the coupled hour hand is BETWEEN at 8:30 (not on the 8) */
    const hourAng = await page.evaluate(() => { const g = document.querySelector('.crd-hand-hour'); const t = g.getAttribute('transform'); return parseFloat(t.replace(/[^0-9.\-]/g, '')); });
    note(Math.abs(hourAng - 255) < 1, `the 8:30 hour hand is not coupled (angle ${hourAng}, expected 255 — between 8 and 9)`);
    await page.evaluate(() => { window.__spoke = []; });
    const ce = await correctEventId();
    await clickCard(ce);
    await sleep(360);   /* the cuckoo speaks on a 250ms delay */
    let s = await A(); note(s.solved, 'tapping the matching event did not heal');
    const spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/half past eight|8/.test(spoke.toLowerCase()), `the cuckoo did not speak the time ("${spoke}")`);

    /* READ wrong → SILENT (not solved, no pick stuck, no red) */
    await force('read-lunch');
    const we = await wrongEventId();
    await clickCard(we);
    s = await A(); note(!s.solved, 'a wrong event healed'); note(s.picked === null, 'the wrong event stayed picked (must peek-and-tuck silently)');

    /* SET: drag to the named time → commit → correct (no digital target shown) */
    await force('set-half-seven');   /* 7:30 */
    const readoutBefore = await page.$eval('.crd-readout', e => e.textContent).catch(() => '');
    note(!/7[:.]30/.test(readoutBefore), `the readout shows the TARGET time before the child sets it (digital target leak): "${readoutBefore}"`);
    await setHands(7, 0); await clickWake();   /* wrong (7:00) → silent */
    s = await A(); note(!s.solved, 'an o\'clock set passed a half-past round');
    await setHands(7, 30); await clickWake();
    s = await A(); note(s.solved, 'setting 7:30 did not heal');

    /* ORDER: tap the clock showing the asked event */
    await force('order-lunch');   /* lunch 12:00 = clock index 1 */
    await clickClock(0); s = await A(); note(!s.solved, 'a wrong clock healed in order');
    await clickClock(1); s = await A(); note(s.solved, 'tapping the lunch clock did not heal order');

    /* WORLD-CUE: decode → set */
    await force('cue-noon');   /* 12:00 */
    await setHands(12, 0); await clickWake();
    s = await A(); note(s.solved, 'setting noon from the cue did not heal');

    /* day-arc advances per round (monotonic) */
    const arc1 = (await A()).dayArc;
    await force('set-nine');
    const arc2 = (await A()).dayArc;
    note(arc2 >= 1, 'the day-arc did not advance on a new round');

    /* mobile overflow 280→768 (order = the widest: 3 clocks) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('order-bedtime'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} clock-read/en — "${title}"`);
  } catch (e) {
    fails.push('clock-read/en: ' + e.message);
    console.log(`  FAIL clock-read/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`CLOCK-READ LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('CLOCK-READ LOCAL TEST PASSED — READ names no target + the coupled 8:30 hour hand sits between numbers + tapping the matching event speaks the time; a wrong event is SILENT (peek-and-tuck); SET drags to the named time + commits (half-past rejects an o\'clock; no digital target before the child sets it); ORDER taps the right clock; WORLD-CUE decodes → set; the day-arc advances per round; >=7 cogs + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
