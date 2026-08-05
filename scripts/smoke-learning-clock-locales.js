#!/usr/bin/env node
/* =====================================================================
   smoke-learning-clock-locales.js — eleven fresh browsers.

   ⚠ THE VERSION THIS REPLACES USED ONE SHARED PAGE for all eleven
   locales and printed a single bubble string. A fresh BROWSER per locale
   is the bar, because a shared context carries storage, voices and a
   warmed module graph from the previous language.

   ⭐⭐ IT RECORDS WHICH KEYS WERE ASKED FOR, not which strings appeared.
   A string can be authored in eleven locales and never reached — the
   shipped build carried `loading`, translated eleven times, referenced
   nowhere. A source scan cannot tell the difference between a key that is
   read and a `t('key')` call sitting in a dead branch.
   ⚠ api.t CANNOT BE WRAPPED: lcs-shell.js:482 builds the api with
   Object.freeze and `t` is non-writable, so the assignment silently
   no-ops and the recorder reports "0 keys asked for" while every string
   renders — a gate failing a correct tool. The recorder is therefore a
   PROXY OVER THE TOOL'S OWN `strings` OBJECT, which needs nothing
   writable, and it is installed before the tool script runs so that the
   keys read AT MOUNT are seen too.

   Run:  node scripts/smoke-learning-clock-locales.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const TOOL = require(path.join(MINI, 'learning-clock.js'));
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
/* the two the SHELL consumes — lcs-shell.js:448-449 builds the header and
   the container aria-label from them, so the tool never asks. Nothing
   joins this list without the same kind of citation. */
const SHELL_CONSUMED = ['title', 'instruction'];
/* ⚠ LOCALE-SCOPED, WITH A REASON. The German regional-variant chip is
   rendered only for `de` (lcs `api.lang === 'de'`), so in the other ten
   these two keys are correctly never asked for. That is an auditable
   exemption naming its condition, not a loosened check — the keys are
   still REQUIRED to be reached in de. */
const DE_ONLY = ['deVariantA', 'deVariantB'];
/* the 2:30 idiom, per locale — the moat, in one string each */
const IDIOM = { en: 'half past 2', de: 'halb 3', fr: 'deux heures et demie', it: 'le due e mezza',
  es: 'las dos y media', pt: 'duas e meia', nl: 'half 3', sv: 'halv 3', da: 'halv 3',
  no: 'halv 3', fi: 'puoli 3' };

const sleep = ms => new Promise(r => setTimeout(r, ms));
const fails = [];
let n = 0;
function is(c, m) { if (c) { n++; } else { fails.push(m); console.log('    x ' + m); } }

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/learning-clock.html';
    if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools/'.length); else p = p.replace(/^\//, '');
    fs.readFile(path.join(MINI, p), (e, b) => {
      if (e) { res.statusCode = 404; res.end('nf'); return; }
      res.setHeader('Content-Type', MIME[path.extname(p)] || 'application/octet-stream');
      res.end(b);
    });
  });
}

(async () => {
  const srv = serve();
  await new Promise(r => srv.listen(0, r));
  const PORT = srv.address().port;
  const keys = Object.keys(TOOL.strings);
  console.log(`${keys.length} authored keys x ${LOCALES.length} locales, one fresh browser each\n`);

  for (const loc of LOCALES) {
    /* ⚠ A WHOLE NEW BROWSER, not a new page. */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 1600, hasTouch: true });
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });

    await page.evaluateOnNewDocument(() => {
      window.__asked = Object.create(null);
      let held;
      Object.defineProperty(window, 'LearningClock', {
        configurable: true,
        get() { return held; },
        set(v) {
          if (v && v.strings) {
            const raw = v.strings;
            v.strings = new Proxy(raw, {
              get(t, k) { if (typeof k === 'string') window.__asked[k] = (window.__asked[k] || 0) + 1; return t[k]; },
              has(t, k) { return k in t; },
              ownKeys(t) { return Reflect.ownKeys(t); },
              getOwnPropertyDescriptor(t, k) { return Reflect.getOwnPropertyDescriptor(t, k); }
            });
          }
          held = v;
        }
      });
      if (window.speechSynthesis) {
        window.speechSynthesis.speak = () => {};
        window.speechSynthesis.getVoices = () => [{ lang: 'en-US' }];
      }
    });

    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/learning-clock.html?lang=${loc}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.lck-svg');
    await sleep(280);

    /* ---- drive the whole state matrix so every branch is reached ---- */
    await page.evaluate(() => {
      const T = window.LearningClock;
      const click = s => { const e = document.querySelector(s); if (e) e.click(); };
      /* free first: every gate line */
      ['step-1', 'mode-task', 'mode-elapsed', 'ourtimes', 'print'].forEach(k => click(`[data-fk="${k}"]`));
      T.premium = true; T.premiumKnown = true; T.render();
      /* every step and every hand view */
      ['60', '30', '15', '5', '1'].forEach(g => click(`[data-fk="step-${g}"]`));
      ['both', 'hour', 'minute'].forEach(v => click(`[data-fk="view-${v}"]`));
      click('[data-fk="half-am"]'); click('[data-fk="half-pm"]');
      click('[data-fk="fives"]');
      click('[data-fk="why"]');
      click('[data-fk="devariant"]');
      /* practice: prompt, every diagnosis, the completed round, the break */
      T.mode = 'task'; T.step = '30'; T._nextTask();
      T.task.target = 150;
      [[30, 0], [120, 0], [200, 0]].forEach(p => { T.task.phase = 'set'; T.total = p[0]; T._checkTask(); });
      T.task.phase = 'set'; T.total = 150; T._checkTask();
      T.task.done = 5; T._nextTask();
      T.task.misses = 2; T.render();
      click('[data-fk="scaffold"]');
      /* elapsed: idle, started, finished */
      T.mode = 'elapsed'; T.elapsed = { start: null, end: null }; T.render();
      click('[data-fk="pinend"]'); click('[data-fk="pinclear"]');
      T.elapsed = { start: 710, end: null }; T.total = 20; T.render();
      T.elapsed = { start: 0, end: 90 }; T.render();
      /* the saved-times panel, both refusals and a real save */
      T.mode = 'explore'; T.render();
      T._openPanel();
      click('.lck-composer .lck-chip');                 /* empty name */
      const inp = document.querySelector('.lck-input');
      if (inp) { inp.value = 'x'; }
      click('.lck-composer .lck-chip');
      T._store.ourTimes = new Array(12).fill(0).map((_, i) => ({ id: 'a' + i, label: 'L' + i, h: 1, m: 0, pm: true }));
      T._renderPanel();
      click('.lck-composer .lck-chip');                 /* the cap */
      T._closePanel();
      /* replay a saved time — that is the only path that reads setOurTime */
      T._store.ourTimes = [{ id: 'z', label: 'Lunch', h: 12, m: 0, pm: false }];
      T._openPanel();
      click('.lck-prow .lck-chip');
      T._store.ourTimes = [];
      /* ⚠ THE DRAWER IS BUILT LAZILY, so its option labels — setDigital,
         digBoth/12/24/off, minuteRing, ring24, setSpeakDrag — are not read
         until it is opened. A driver that never opens it reports eight
         correctly-authored keys as dead. */
      const gear = document.querySelector('.lcs-ctrl');
      if (gear) gear.click();
    });
    await sleep(260);
    await page.evaluate(() => {
      const d = document.querySelector('.lcs-drawer, .lcs-scrim');
      if (d && d.classList.contains('lcs-scrim')) d.click();
      const T = window.LearningClock;
      T.mode = 'explore'; T.total = 150; T.pm = true; T.step = '30'; T.render();
    });
    await sleep(320);

    const asked = await page.evaluate(() => Object.assign({}, window.__asked));
    const bubble = await page.evaluate(() => (document.querySelector('.lck-bubbletext') || {}).textContent || '');
    const title = await page.evaluate(() => (document.querySelector('.lcs-title') || {}).textContent || '');

    console.log(`[${loc}]  title="${title}"  bubble="${bubble}"`);
    /* print the WHOLE authored set — that is the point of this gate */
    keys.forEach(k => console.log(`      ${k.padEnd(14)} ${JSON.stringify(TOOL.strings[k][loc])}`));

    is(Object.keys(asked).length > 20, `${loc}: the recorder saw ${Object.keys(asked).length} keys — under 20 means it is not attached`);
    const never = keys.filter(k => SHELL_CONSUMED.indexOf(k) < 0 && !asked[k] &&
      !(DE_ONLY.indexOf(k) >= 0 && loc !== 'de'));
    is(never.length === 0, `${loc}: authored but NEVER asked for: ${never.join(', ')}`);
    if (loc === 'de') is(DE_ONLY.every(k => asked[k]), 'de: the regional-variant keys ARE reached in the locale that has the chip');
    is(title.trim().length > 0, `${loc}: the shell rendered a title`);
    is(bubble === IDIOM[loc], `${loc}: the 2:30 idiom is "${IDIOM[loc]}" (got "${bubble}")`);
    is(errs.length === 0, `${loc}: page errors — ${errs.slice(0, 2).join(' | ')}`);
    await browser.close();
  }

  srv.close();
  console.log('');
  if (fails.length) { console.log(`FAIL — ${fails.length} of ${n + fails.length}`); process.exit(1); }
  console.log(`PASS — ${n} assertions across 11 fresh browsers`);
})().catch(e => { console.error(e); process.exit(1); });
