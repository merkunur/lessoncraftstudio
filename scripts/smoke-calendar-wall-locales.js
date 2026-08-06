#!/usr/bin/env node
/* =====================================================================
   smoke-calendar-wall-locales.js — all eleven locales.
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-calendar-wall-locales.js

   ⚠ A FRESH BROWSER PER LOCALE, and that is a correctness fix rather
   than caution. The previous version reused ONE page and ONE origin for
   all eleven, so every locale inherited the previous locale's
   localStorage wall — locale eleven was reading locale one's marks — and
   a cached module meant the tool was only ever really loaded once.

   ⭐ IT RECORDS WHICH KEYS WERE ASKED FOR, not which strings appeared.
   A string can be present in the file, present in the digest, and
   unreachable in the running tool; scanning the source cannot tell the
   difference, and this programme has shipped a dead string authored in
   all eleven locales and wired to nothing.
   ⚠ `api.t` CANNOT BE WRAPPED: lcs-shell.js builds the api with
   Object.freeze and `t` is non-writable, so the assignment silently
   no-ops and the recorder reports zero for a perfectly good tool. The
   recorder is a Proxy over the tool's OWN strings object instead, which
   needs nothing writable.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/calendar-wall.html';
    const f = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length))
                                           : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => { if (e) { res.statusCode = 404; res.end(''); return; }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream'); res.end(b); });
  });
}

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  let fails = 0;
  const askedUnion = {};

  for (const L of LOCALES) {
    /* a whole new browser: no shared cache, no shared origin, no
       inherited wall from the locale before */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const errs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => errs.push('pageerror: ' + e.message));

    await page.evaluateOnNewDocument(() => {
      window.__asked = {};
      /* wrap the tool's strings object before the shell reads it */
      const install = () => {
        if (!window.CalendarWall || window.CalendarWall.__wrapped) return false;
        const real = window.CalendarWall.strings;
        window.CalendarWall.strings = new Proxy(real, {
          get(t, k) { if (typeof k === 'string') window.__asked[k] = (window.__asked[k] || 0) + 1; return t[k]; },
          has(t, k) { return k in t; },
          ownKeys(t) { return Reflect.ownKeys(t); },
          getOwnPropertyDescriptor(t, k) { return Reflect.getOwnPropertyDescriptor(t, k); },
        });
        window.CalendarWall.__wrapped = true;
        return true;
      };
      const iv = setInterval(() => { if (install()) clearInterval(iv); }, 2);
      window.addEventListener('DOMContentLoaded', install);
    });

    await page.setViewport({ width: 1024, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/calendar-wall.html?lang=${L}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.cwl-grid', { timeout: 8000 }).catch(() => null);
    await new Promise(r => setTimeout(r, 450));

    /* ⭐ DRIVE THE BUILDERS OVER A MATRIX OF REAL STATES. A key is only
       proved live if some reachable state asks for it, and most of this
       tool's strings live on ONE branch — the free gate, the two-step
       confirm, the closed day, the tenth day. Walking only the opening
       frame proves almost nothing. */
    await page.evaluate(() => {
      const T = window.CalendarWall;
      const paint = () => T._paint();

      /* the settings drawer is the shell's, and it is built LAZILY —
         its labels are never asked for until someone opens it */
      const gear = document.querySelector('.lcs-ctrl');
      if (gear) { gear.click(); }
      paint();

      /* free, uncounted, no weather: the +1, the gates, the teacher key
         in its CLOSED wording, an empty day sheet */
      T.premium = false;
      T._armTeacher(false);
      paint();
      T._openSheet(T.M.shiftKey(T._todayKey, 1));
      T._closeSheet();
      T._goWidget(1); paint();          /* free counter gate */
      T._goWidget(2); paint();          /* free weather gate */
      T._printMonth();                  /* the print gate */
      T._openPanel(); T._paintPanel();
      const add = document.querySelector('.cwl-newwall');
      if (add) add.click();             /* the extra-wall gate */
      T._closePanel();

      /* now a subscriber, mid-year, with marks and a target */
      T.premium = true;
      T._armTeacher(true);
      const w = T.wall();
      for (let i = 9; i >= 1; i--) T.M.setCountOn(w, T.M.shiftKey(T._todayKey, -i), 10 - i);
      const k = T.M.shiftKey(T._todayKey, 4);
      const id = T.M.addEvent(w, k, 'trip', 'Zoo', 2, 'once');
      T.M.addEvent(w, T.M.shiftKey(T._todayKey, 2), 'off', '', 1, 'once');
      T.M.setTarget(w, id);
      T.M.setWeatherOn(w, T._todayKey, 'rain');
      paint();                           /* today pill, change, countdown, count-together */
      T._openSheet(k); T._paintSheet();  /* the sheet with marks + the target toggle */
      T._pendingRemove = id; T._paintSheet();   /* removeAsk */
      T._closeSheet();
      T._showUndo();                     /* undoRemove */
      T._hideUndo();

      /* the tenth day: the regroup narration */
      T._goWidget(1); T._stepperOpen = true; paint();
      T._advance();

      /* a month that is not this one: the Today button */
      T._goWidget(0);
      T._viewMonth = T.M.addMonths(T._viewMonth, 1);
      paint();
      T._viewMonth = T.M.monthOf(T._todayKey);

      /* the two-step new-year confirm */
      T._openPanel(); T._pendingConfirm = 'newYear'; T._paintPanel(); T._closePanel();
      paint();

      /* a mark that is NOT the target, so the toggle offers to SET one */
      const other = T.M.addEvent(w, T.M.shiftKey(T._todayKey, 5), 'star', '', 1, 'once');
      T._openSheet(T.M.shiftKey(T._todayKey, 5)); T._paintSheet(); T._closeSheet();

      /* the target falling TODAY */
      T.M.addEvent(w, T._todayKey, 'bday', '', 1, 'once');
      const todayEv = T.M.eventsOn(w, T._todayKey).filter(function (e) { return e.k === 'bday'; })[0];
      if (todayEv) { T.M.setTarget(w, todayEv.id); paint(); }
      T.M.setTarget(w, other);

      /* the free tier with the teacher window OPEN: the events gate */
      T.premium = false; T._armTeacher(true);
      T._openSheet(T.M.shiftKey(T._todayKey, 5)); T._paintSheet(); T._closeSheet();
      T.premium = true;

      /* exactly one day in school, and a hundred */
      w.days = {}; T.M.setCountOn(w, T._todayKey, 1);
      T._goWidget(1); paint();
      w.days = {}; T.M.setCountOn(w, T.M.shiftKey(T._todayKey, -1), 99);
      T._advance();
      /* a fresh year with last year's total behind it */
      w.lastSummary = { days: 178 }; w.days = {};
      paint();

      /* the driver must hand the tool back in a KNOWN state. It ended
         on the counter, so the measurement below found no calendar and
         all eleven locales failed for a reason that had nothing to do
         with the locales. A driver that leaves the subject somewhere
         arbitrary is measuring wherever it happened to stop. */
      T._armTeacher(false);
      T._closeSheet(); T._closePanel(); T._hideUndo();
      T._viewMonth = T.M.monthOf(T._todayKey);
      T._goWidget(0);
      paint();
    });
    await new Promise(r => setTimeout(r, 400));

    const m = await page.evaluate(() => {
      const cells = [...document.querySelectorAll('.cwl-cell:not(.empty)')];
      const nums = cells.filter(c => (c.querySelector('.cwl-cellnum') || {}).textContent);
      const body = document.body.textContent || '';
      const keys = Object.keys(window.CalendarWall.strings);
      /* ⚠ a RAW KEY on the page means the shell fell through to the key
         name, which is what a missing locale entry looks like to a user */
      const leaked = keys.filter(k => new RegExp('(?<![A-Za-z])' + k + '(?![A-Za-z])').test(body));
      return {
        title: (document.querySelector('.lcs-title') || {}).textContent,
        instruction: (document.querySelector('.lcs-instruction') || {}).textContent,
        line: (document.querySelector('.cwl-datetext') || {}).textContent || '',
        cells: cells.length, numbered: nums.length,
        weekdays: [...document.querySelectorAll('.cwl-wd .cwl-wd-l')].map(e => e.textContent).join(' '),
        asked: window.__asked || {},
        totalKeys: keys.length,
        leaked,
      };
    });

    for (const k of Object.keys(m.asked)) askedUnion[k] = true;
    const real = errs.filter(e => !/404|Failed to load resource|net::ERR/i.test(e));
    const askedN = Object.keys(m.asked).length;
    const ok = m.numbered === m.cells && m.cells >= 28 && m.line && !/\d/.test(m.line)
               && !m.leaked.length && !real.length && m.title && m.instruction && askedN > 20;
    if (!ok) fails++;
    console.log(`${ok ? '✓' : '✗'} ${L}: "${m.title}" — "${m.line.trim()}" | ${m.numbered}/${m.cells} numbered | ${askedN} keys asked` +
      (m.leaked.length ? ' | RAW KEYS: ' + m.leaked.join(',') : '') +
      (real.length ? ' | ERRORS: ' + real.slice(0, 2).join(' | ') : ''));
    console.log('    weekdays: ' + m.weekdays.slice(0, 60));
    await browser.close();
  }

  /* ⭐ A15 — NO DEAD STRINGS. A key nobody ever asks for is either an
     unreachable branch or a fossil, and the only way to tell them apart
     is to look. `title` and `instruction` are consumed by the SHELL, not
     by the tool, so they never come through this Proxy. */
  /* ⚠ EXEMPTIONS ARE AN AUDITABLE LIST WITH A REASON EACH, never a
     loosened check. Two kinds only:
     · the shell consumes it, so it never passes through the tool's own
       strings object and this recorder structurally cannot see it;
     · it is one of a ROTATING SET where exactly one member renders per
       day by design, so on any single day the others are correctly
       absent. The set as a whole is proved live by its first member. */
  const EXEMPT = {
    title: 'the shell renders it (lcs-shell.js builds the h1)',
    instruction: 'the shell renders it (and hides it in every embed)',
  };
  /* ⭐ THE ROTATING SET IS ASSERTED, NOT EXEMPTED. Exactly one talk
     prompt renders per day by design, so naming three of them as
     exceptions would have been arbitrary — and would have hidden the
     case where ALL FOUR are dead. The rule is that the SET must be live;
     which member is live today is the calendar's business. */
  const ROTATING = ['promptMost', 'promptCompare', 'promptTotal', 'promptPredict'];
  const rotLive = ROTATING.filter(k => askedUnion[k]);
  if (!rotLive.length) { fails++; console.log('\n✗ none of the four talk prompts is reachable'); }
  else console.log('\n✓ the talk-prompt rotation is live (today: ' + rotLive.join(', ') + ')');
  ROTATING.forEach(k => { EXEMPT[k] = 'one of four talk prompts; exactly one renders per day'; });
  const all = Object.keys(require('./_calendar-wall-strings.js'));
  const never = all.filter(k => !askedUnion[k] && !EXEMPT[k]);
  if (never.length) {
    fails++;
    console.log('\n✗ ' + never.length + ' string(s) authored in 11 locales and NEVER ASKED FOR: ' + never.join(', '));
  } else {
    console.log('\n✓ every authored string is reached on some path');
  }

  server.close();
  console.log(fails ? `RESULT: FAIL (${fails})` : `RESULT: PASS (11/11)`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
