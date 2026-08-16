/* =====================================================================
   ELEVEN-LOCALE SMOKE + STRING REACHABILITY — TOOL #56, THE GAP
   =====================================================================
   ⚠ A FRESH BROWSER PER LOCALE, and the whole authored string set is
   printed for each so a human can read it. A shared browser shares
   storage, and the shell persists the sound toggle and the settings.

   ⚠⚠ REACHABILITY IS MEASURED WITH A PROXY OVER THE TOOL'S OWN STRINGS
   OBJECT, INSTALLED BEFORE MOUNT. Three recorded traps, each bought with
   a shipped defect:
   - `lcs-shell.js:482` builds the api with Object.freeze and `t` is
     NON-WRITABLE, so wrapping api.t silently no-ops in sloppy mode and
     the gate reports "0 keys asked for" on a CORRECT tool. The shell
     resolves `i18n.t(tool.strings, key)` at CALL time, so a Proxy over
     `tool.strings` needs nothing writable.
   - A recorder installed AFTER mount cannot see what was read AT mount,
     so it is installed on the `window.TheGap` setter.
   - "The string exists" is not "the string is reached". A source scan is
     defeated by an unreachable BRANCH that still contains the t() call —
     #39's `hintMark`, authored in eleven locales and wired to nothing.
     Only driving the states finds that, which is why every control below
     is pressed and why the REFUSAL branches are entered on purpose.

   ⭐ AND TWO OF THIS TOOL'S KEYS LIVE BEHIND A COIN-FLIP: `ariaCameIn`
   and `ariaWentOut` are chosen by the direction of a RANDOM scene, so a
   driver that watches one scene reaches one of them and calls the other
   dead. The loop below deals until the recorder has seen both, which is
   the honest way to reach a branch nobody can steer to.

   ⚠ AND THIS GATE CANNOT JUDGE TRANSLATION QUALITY. It proves
   locale-SELECTION and reachability. Poisoning a string would move both
   sides of any string-vs-string comparison together, so no such
   comparison is made — the copy itself is a native panel's job.

   ⚠ THE LOCALE FILE `scripts/_the-gap-strings.js` HAS NOT LANDED. Until
   it does the tool is authored in ENGLISH ONLY; this gate detects that,
   still mounts all eleven locales, still measures reachability, and
   SKIPS ONLY the "the heading is in this locale" assertion — announcing
   loudly that it did.

   Run: node scripts/smoke-the-gap-locales.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.THE_GAP_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const TOOL = path.join(ROOT, 'the-gap.js');
const STRINGS_FILE = path.join(__dirname, '_the-gap-strings.js');
/* ⚠ env-overridable, for the same reason every other gate here is */
const PORT = Number(process.env.THE_GAP_SMOKE_PORT) || 5689;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'the-gap.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

const own = require(TOOL).strings;
const KEYS = Object.keys(own);
const HAS_LOCALES = fs.existsSync(STRINGS_FILE);
const localised = KEYS.filter(k => Object.keys(own[k]).some(l => l !== 'en')).length;

const fails = [];
let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };

/* the recorder + a print stub, installed before any tool script runs */
const PRELUDE = () => {
  window.__asked = {};
  window.__printed = 0;
  window.print = function () { window.__printed++; };
  Object.defineProperty(window, 'TheGap', {
    configurable: true,
    set: function (tool) {
      /* ⚠ a Proxy over the tool's OWN strings object needs nothing
         writable, which is the point — the frozen api cannot be wrapped */
      const real = tool.strings;
      tool.strings = new Proxy(real, {
        get: function (t, k) { if (typeof k === 'string') window.__asked[k] = 1; return t[k]; }
      });
      Object.defineProperty(window, 'TheGap', { value: tool, writable: true, configurable: true });
    },
    get: function () { return undefined; }
  });
};

/* ⚠ A CLICK THAT SILENTLY DOES NOTHING HOLLOWS OUT EVERY ASSERTION AFTER
   IT (#39). This one reports, and the caller counts. */
async function click(p, sel, why, settle) {
  const h = await p.$(sel);
  if (!h) { fails.push(why + ': no element ' + sel); checks++; return false; }
  const box = await h.boundingBox();
  if (!box || box.width < 1) { fails.push(why + ': zero-size ' + sel); checks++; return false; }
  const vh = p.viewport().height;
  if (box.y < 0 || box.y + box.height > vh) {
    await h.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 110));
  }
  const b2 = await h.boundingBox();
  if (!b2) { fails.push(why + ': ' + sel + ' vanished'); checks++; return false; }
  await p.mouse.click(b2.x + b2.width / 2, b2.y + b2.height / 2);
  await new Promise(r => setTimeout(r, settle === undefined ? 200 : settle));
  return true;
}

const askedIn = p => p.evaluate(() => Object.keys(window.__asked || {}));

(async () => {
  console.log('#56 THE GAP — eleven-locale smoke');
  console.log(KEYS.length + ' authored keys; ' + localised + ' carry a non-English locale.');
  if (!HAS_LOCALES) {
    console.log('\n⚠⚠ scripts/_the-gap-strings.js HAS NOT LANDED — the tool is authored in');
    console.log('   ENGLISH ONLY. All eleven locales are still mounted and reachability is');
    console.log('   still measured; the per-locale heading assertion is SKIPPED and reported');
    console.log('   as skipped, not as passed.\n');
  }

  const asked = {};
  let drivenOK = 0;

  for (const L of LOCALES) {
    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

    /* ---- pass 1: the FREE tier, every control, refusals included ---- */
    const p = await b.newPage();
    p.on('pageerror', e => { fails.push(L + ': page error ' + e.message); });
    /* ⚠ A RESOURCE-LOAD console error does NOT carry its URL in
       `m.text()`, so a text filter cannot tell the harness's own 404s
       from the tool's. `m.location().url` does carry it. The three
       exemptions are NAMED: the browser's favicon, the platform
       entitlement endpoint this static server does not host (the tool is
       REQUIRED to degrade to the free tier without it), and the two
       Google font hosts — `lcs-shell.css:12` @imports them, the shell is
       protected at 0 lines, and a network blip in one random locale
       would otherwise teach me to re-run until green. */
    p.on('console', m => {
      if (m.type() !== 'error') return;
      const url = (m.location() || {}).url || '';
      if (/favicon\.ico/.test(url) || /api\/entitlement/.test(url)) return;
      if (/^https?:\/\/fonts\.(gstatic|googleapis)\.com\//.test(url)) return;
      fails.push(L + ': console error [' + (url || 'no url') + '] ' + m.text());
    });
    await p.setViewport({ width: 768, height: 1024 });
    await p.evaluateOnNewDocument(PRELUDE);
    await p.goto('http://127.0.0.1:' + PORT + '/mini-tools/the-gap.html?lang=' + L, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 550));

    /* ⚠ THE REFUSALS FIRST, because a lazy driver never enters them and
       their strings live ONLY behind those branches. */
    await click(p, '.crt-b-clear', L);                 /* nothing to clear -> saidNoTry */
    await click(p, '.crt-b-print', L);                 /* locked          -> a refusal   */

    /* ⭐ DEAL UNTIL BOTH DIRECTIONS HAVE BEEN SEEN. The ground's
       announcement is chosen by the sign of a RANDOM scene; watching one
       scene reaches one branch and calls the other dead. */
    let rounds = 0, bothSeen = false;
    for (; rounds < 40 && !bothSeen; rounds++) {
      await click(p, '.crt-b-run', L, 0);              /* cover           */
      await new Promise(r => setTimeout(r, 480));      /* mid-gap: ariaGap */
      await click(p, '.crt-b-run', L, 0);              /* mid-run refusal -> saidMidRun */
      await new Promise(r => setTimeout(r, 900));      /* the gap lifts   */
      const keys = await p.$$('.crt-k');
      if (keys.length) {
        await click(p, '.crt-k', L);                   /* a theory -> ariaTry + sayLands */
        /* ⭐ THE SAME NUMERAL AGAIN. This is the ONLY refusal a pointer
           can produce out of `_try`: `rail()` and `tryK()` share their
           bounds, so an out-of-range press does not exist and the repeat
           is the whole branch. A driver that presses each key once
           reaches neither, and calls `saidTryOff` dead. */
        await click(p, '.crt-k', L);
        await click(p, '.crt-b-clear', L);             /* and clear it                   */
      } else { fails.push(L + ': the rail is empty after the gap lifted'); checks++; }
      const a = await askedIn(p);
      bothSeen = a.indexOf('ariaCameIn') >= 0 && a.indexOf('ariaWentOut') >= 0;
      /* ⚠⚠ `again` KEEPS THE START and re-deals only the change — that
         is the whole division of labour with the teacher's grips. At an
         extreme start only ONE direction is legal (nothing can be added
         to a full shelf), so a loop that presses only `again` can sit
         forever on a start where the other branch cannot exist, and then
         report it unreachable. It moves the start too, the way a teacher
         does. */
      if (!bothSeen) {
        await click(p, '.crt-b-again', L);              /* saidDealt      */
        await click(p, rounds % 2 ? '.crt-grip-down' : '.crt-grip-up', L);
      }
    }
    ok(bothSeen, L + ': ⭐ after ' + rounds + ' scenes the ground never announced BOTH directions — one of the two branches is unreachable');

    /* ⚠⚠ AND THE REFUSAL AT THE END OF THE START RANGE IS DRIVEN, not
       assumed. `saidSetEnd` is authored in eleven locales and fires only
       when a teacher steps the start past the last one available — a
       branch no other driver in this file reaches, so the string
       recorder correctly reported it DEAD. Pressing one grip past the
       end is the whole branch. */
    for (let g = 0; g < 20; g++) await click(p, '.crt-grip-down', L);
    await click(p, '.crt-grip-down', L);
    await click(p, '.crt-b-again', L);

    /* the settings drawer -> rangeLabel + rangeTen + rangeSixteen */
    await click(p, '.lcs-ctrl', L);
    await new Promise(r => setTimeout(r, 250));
    const chips = await p.$$('.lcs-chip');
    ok(chips.length >= 2, L + ': the settings drawer offered ' + chips.length + ' chips — the range setting is not rendered');
    if (chips.length >= 2) {
      const cb = await chips[chips.length - 1].boundingBox();
      if (cb) await p.mouse.click(cb.x + cb.width / 2, cb.y + cb.height / 2);
      await new Promise(r => setTimeout(r, 300));
    }
    const scrim = await p.$('.lcs-drawer-scrim');
    if (scrim) { const sb = await scrim.boundingBox(); if (sb) await p.mouse.click(sb.x + 6, sb.y + 6); }
    await new Promise(r => setTimeout(r, 250));

    const got = await p.evaluate(() => ({
      asked: Object.keys(window.__asked || {}),
      printed: window.__printed,
      gateOn: !!document.querySelector('.crt-gate.is-on'),
      gateText: (document.querySelector('.crt-gate') || {}).textContent || '',
      texts: [].slice.call(document.querySelectorAll(
        '.crt-btn .crt-label, .crt-say, .crt-gate p, .crt-k, .lcs-title, .lcs-instruction, .lcs-field label, .lcs-chip'))
        .map(e => (e.textContent || '').trim()).filter(Boolean),
      railAria: [].slice.call(document.querySelectorAll('.crt-k')).map(e => e.getAttribute('aria-label') || ''),
      stageAria: (document.querySelector('.crt-stage') || {}).getAttribute
        ? document.querySelector('.crt-stage').getAttribute('aria-label') : '',
      groundAria: (document.querySelector('.crt-ground') || {}).getAttribute
        ? document.querySelector('.crt-ground').getAttribute('aria-label') : '',
      lang: document.documentElement.lang
    }));
    ok(got.asked.length > 0, L + ': ⚠⚠ the recorder saw NOTHING — it failed to attach, and every reachability result here is void');
    ok(got.printed === 0, L + ': ⚠ the locked print control called window.print() — the paywall gave the sheet away');
    ok(got.gateOn, L + ': the paid gate is not shown to a free visitor');
    ok(got.gateText.length > 20, L + ': the paid gate carries no copy');
    got.asked.forEach(k => { asked[k] = (asked[k] || 0) + 1; });

    /* ⚠ NO RENDERED TEXT MAY BE A RAW KEY. That is what the shell shows
       when the strings map is the wrong shape (#50: every string dead
       while 120k model assertions were green). */
    const KEYSET = {}; KEYS.forEach(k => { KEYSET[k] = 1; });
    got.texts.concat(got.railAria).concat([got.stageAria, got.groundAria]).forEach(function (t) {
      ok(!KEYSET[t], L + ': ⚠⚠ a STRING KEY is rendering — "' + t + '"');
    });
    ok(!/\{\w+\}/.test(got.stageAria + ' ' + got.groundAria + ' ' + got.railAria.join(' ')),
      L + ': ⚠ a RAW TOKEN is rendering in an aria label: ' + got.stageAria + ' | ' + got.railAria[0]);
    ok(got.texts.length >= 8, L + ': non-vacuity — only ' + got.texts.length + ' rendered strings collected');
    ok(got.stageAria.length > 15, L + ': the stage carries no aria label');

    const wantTitle = own.title[L] || own.title.en;
    const heading = await p.evaluate(() =>
      [].slice.call(document.querySelectorAll('h1,h2,.lcs-title')).map(x => x.textContent.trim()).filter(Boolean).join(' | '));
    if (HAS_LOCALES && L !== 'en') {
      ok(heading.indexOf(wantTitle) >= 0, L + ': the heading reads "' + heading + '" — expected "' + wantTitle + '"');
    }
    await p.close();

    /* ---- pass 2: a TEACHER, so the paid sheet is actually built ----
       ⚠ The entitlement is mocked AT THE NETWORK, not by setting
       `premium` — that drives the real code path the product uses,
       including the JSON shape it has to understand. */
    const p2 = await b.newPage();
    p2.on('pageerror', e => fails.push(L + ' (paid): page error ' + e.message));
    await p2.setViewport({ width: 768, height: 1024 });
    await p2.evaluateOnNewDocument(PRELUDE);
    await p2.setRequestInterception(true);
    p2.on('request', function (rq) {
      if (/\/api\/entitlement/.test(rq.url())) {
        rq.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ tier: 'teacher' }) });
      } else rq.continue();
    });
    await p2.goto('http://127.0.0.1:' + PORT + '/mini-tools/the-gap.html?lang=' + L, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 700));
    /* ⭐⭐ PRINT IT FIRST WITH THE GROUND STILL UNCOVERED. The sheet is
       built from the HELD state, so a teacher setting up — or anyone
       pressing Ctrl+P — must NOT get `m` on the paper before the class
       has watched. My first version of this gate printed here and then
       demanded two grounds, which is the answer on the paper: a wrong
       measurement wearing the costume of a defect, and it condemned the
       correct tool in all eleven locales. */
    await click(p2, '.crt-b-print', L + ' (paid, before the gap)');
    const early = await p2.evaluate(() => ({
      bands: document.querySelectorAll('.crt-sh-band').length,
      lines: document.querySelectorAll('.crt-sh-line').length,
      marks: document.querySelectorAll('.crt-sheet .crt-mark').length,
      shown: [].slice.call(document.querySelectorAll('.crt-marks .crt-mark')).length
    }));
    ok(early.bands === 1,
      L + ': ⚠⚠ the paid sheet printed ' + early.bands + ' grounds BEFORE the gap — the answer is on the paper and on the projector before the class has watched anything');
    ok(early.marks === early.shown,
      L + ': ⚠ the early sheet carries ' + early.marks + ' marks and the ground shows ' + early.shown);
    ok(early.lines >= 4, L + ': the early sheet carries only ' + early.lines + ' ruled lines');

    /* now watch a gap, and only THEN may both grounds be on the paper */
    await click(p2, '.crt-b-run', L + ' (paid)', 0);
    await new Promise(r => setTimeout(r, 1450));
    await click(p2, '.crt-b-print', L + ' (paid)');
    const paid = await p2.evaluate(() => ({
      asked: Object.keys(window.__asked || {}),
      printed: window.__printed,
      gateOn: !!document.querySelector('.crt-gate.is-on'),
      sheetH: (document.querySelector('.crt-sh-h') || {}).textContent || '',
      sheetHint: (document.querySelector('.crt-sh-hint') || {}).textContent || '',
      lines: document.querySelectorAll('.crt-sh-line').length,
      bands: document.querySelectorAll('.crt-sh-band').length,
      /* ⚠ THE SHEET'S DOT HAS ITS OWN CLASS NOW. It used to reuse the
         screen's `.crt-mark` and override it under print; the rebuild
         gives the paper `.crt-sh-dot` — the screen FILLS, the paper
         OUTLINES — so a selector on the screen class matched nothing and
         reported an empty sheet in all eleven locales. */
      sheetMarks: document.querySelectorAll('.crt-sheet .crt-sh-dot').length
    }));
    ok(paid.printed === 2, L + ': ⚠ a teacher pressed Print twice and window.print() was called ' + paid.printed + ' times');
    ok(!paid.gateOn, L + ': ⚠ the paid gate is STILL shown to a teacher — the tool sells them what they own');
    ok(paid.sheetH.length > 0, L + ': the printed sheet has no heading');
    ok(paid.sheetHint.length > 0, L + ': the printed sheet has no hint line');
    ok(paid.lines >= 4, L + ': the printed sheet carries only ' + paid.lines + ' ruled lines — the record is the PAPER');
    ok(paid.bands === 2, L + ': ⚠ the printed sheet carries ' + paid.bands + ' grounds, not the BEFORE and the AFTER');
    ok(paid.sheetMarks > 0, L + ': ⚠ the printed sheet does not carry the scene the class just watched');
    paid.asked.forEach(k => { asked[k] = (asked[k] || 0) + 1; });
    await p2.close();

    console.log('\n[' + L + '] html lang=' + got.lang + ' | ' + rounds + ' scenes driven | heading: ' + heading);
    console.log('      stage : ' + got.stageAria);
    console.log('      ground: ' + got.groundAria);
    KEYS.forEach(function (k) {
      const v = own[k][L];
      console.log('      ' + (v == null ? '(en) ' : '      ') + k + ' = ' + JSON.stringify(v == null ? own[k].en : v));
    });
    drivenOK++;
    await b.close();
  }

  /* ⭐⭐ EVERY AUTHORED KEY MUST HAVE BEEN ASKED FOR. A key that is never
     asked is a string with no state behind it — the #39 `hintMark`
     class, and it is invisible to any source scan. */
  console.log('\n--- reachability ---');
  const dead = [];
  KEYS.forEach(function (k) {
    checks++;
    if (!asked[k]) { dead.push(k); fails.push('⚠⚠ DEAD STRING: `' + k + '` is authored and NEVER ASKED FOR in any of the eleven runs'); }
  });
  KEYS.forEach(k => console.log('   ' + (asked[k] ? 'reached x' + String(asked[k]).padStart(3) : 'DEAD      ') + '  ' + k));

  ok(drivenOK === LOCALES.length, 'only ' + drivenOK + ' of ' + LOCALES.length + ' locales were driven');
  ok(Object.keys(asked).length > 10, 'non-vacuity: only ' + Object.keys(asked).length + ' keys were ever asked for');

  srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  ' + checks + ' checks, ' + fails.length + ' failures');
  if (!HAS_LOCALES) console.log('  (ENGLISH ONLY — per-locale heading assertions SKIPPED, not passed)');
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
