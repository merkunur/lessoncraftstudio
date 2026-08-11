/* =====================================================================
   ELEVEN-LOCALE SMOKE + STRING REACHABILITY — TOOL #57, THE SHAPE STRETCHER
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
     so it is installed on the `window.ShapeStretcher` setter.
   - "The string exists" is not "the string is reached". A source scan is
     defeated by an unreachable BRANCH that still contains the t() call —
     #39's `hintMark`, authored in eleven locales and wired to nothing.
     Only driving the states finds it.

   ⭐⭐ AND THIS TOOL SHIPPED TWO OF EXACTLY THAT, WHICH IS WHY EVERY
   BRANCH BELOW IS ENTERED ON PURPOSE:
     `drop` — authored, with a complete reducer and its own refusal
       channel behind it, and NO BUTTON ANYWHERE. The kept shape could
       only be removed by dealing a new one, which throws away the shape
       the class just built. The control is now built, and this gate is
       what keeps it built.
     `gateClose` — 'Not now', authored for a modal that does not exist
       (the paid gate is an inline panel with nothing to dismiss).
       Removed rather than given a button.

   ⭐ FOUR KEYS LIVE BEHIND A SHAPE THE DEAL CHOOSES AT RANDOM:
   sayTagsBoth / sayTagsEqual / sayTagsRight / sayTagsNone are picked
   by which tags hold, and a tag holds on about one opening in fifty. A
   driver that watches whatever it was dealt reaches one of them and
   calls the other three dead — so the rails are DRIVEN to the states
   that produce each one, by real input.

   ⚠ AND THIS GATE CANNOT JUDGE TRANSLATION QUALITY. It proves
   locale-SELECTION and reachability. Poisoning a string would move both
   sides of any string-vs-string comparison together, so no such
   comparison is made — the copy itself is a native panel's job.

   ⚠⚠ "HAVE THE LOCALES LANDED" IS MEASURED ON THE TOOL, NOT ON A SIDECAR
   FILE. This gate used to key on `fs.existsSync('_shape-stretcher-strings.js')`
   — a proxy that can lie in BOTH directions, and the dangerous direction
   is silent: fold the locales into the tool without ever creating that
   file and every per-locale heading assertion SKIPS while the run still
   prints PASS. The condition is now `own.title[L]` — the heading is
   asserted for exactly those locales the tool actually carries a title
   for, so nothing can be skipped by accident. `HAS_LOCALES` survives only
   to print the banner, and it now names WHICH keys are short.

   Run: node scripts/smoke-shape-stretcher-locales.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.SHP_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const TOOL = path.join(ROOT, 'shape-stretcher.js');
/* ⚠ env-overridable, for the same reason every other gate here is */
const PORT = Number(process.env.SHP_SMOKE_PORT) || 5692;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'shape-stretcher.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

const own = require(TOOL).strings;
const KEYS = Object.keys(own);
const localised = KEYS.filter(k => Object.keys(own[k]).some(l => l !== 'en')).length;
/* the real "landed" condition: every declared key carries every locale */
const SHORT = KEYS.filter(k => LOCALES.some(l => typeof own[k][l] !== 'string' || !own[k][l]));
const HAS_LOCALES = KEYS.length > 0 && SHORT.length === 0;

const fails = [];
let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };

/* the recorder + a print stub, installed before any tool script runs */
const PRELUDE = () => {
  window.__asked = {};
  window.__printed = 0;
  window.print = function () { window.__printed++; };
  Object.defineProperty(window, 'ShapeStretcher', {
    configurable: true,
    set: function (tool) {
      /* ⚠ a Proxy over the tool's OWN strings object needs nothing
         writable, which is the point — the frozen api cannot be wrapped */
      const real = tool.strings;
      tool.strings = new Proxy(real, {
        get: function (t, k) { if (typeof k === 'string') window.__asked[k] = 1; return t[k]; }
      });
      Object.defineProperty(window, 'ShapeStretcher', { value: tool, writable: true, configurable: true });
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
  await new Promise(r => setTimeout(r, settle === undefined ? 180 : settle));
  return true;
}

/* ⭐ DRIVE A LADDER TO AN EXACT RUNG BY KEYBOARD — Home, then the coarse
   step, then the fine one. Real input, and the landing is READ BACK off
   the rail rather than assumed. */
const railNow = (p, track) =>
  p.$eval('.shp-track-' + track + ' .shp-rail', e => Number(e.getAttribute('aria-valuenow')));

async function driveRail(p, track, target, why) {
  const sel = '.shp-track-' + track + ' .shp-rail';
  const h = await p.$(sel);
  if (!h) { fails.push(why + ': no rail for ' + track); checks++; return null; }
  await h.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await p.focus(sel);
  await p.keyboard.press('Home');
  await new Promise(r => setTimeout(r, 40));
  for (let i = 0; i < 400; i++) {
    const now = await railNow(p, track);
    if (now === target) return now;
    const step = await p.$eval(sel, e => Number(e.getAttribute('aria-valuemax')) - Number(e.getAttribute('aria-valuemin')));
    const gap = target - now;
    const coarse = track === 'len' ? 10 : track === 'skew' ? 20 : 20;
    await p.keyboard.press(Math.abs(gap) >= coarse ? (gap > 0 ? 'PageUp' : 'PageDown') : (gap > 0 ? 'ArrowRight' : 'ArrowLeft'));
    if (step < 0) break;
  }
  const end = await railNow(p, track);
  fails.push(why + ': ⚠ the ' + track + ' rail could not be driven to ' + target + ' (stopped at ' + end + ')');
  checks++;
  return end;
}

const askedIn = p => p.evaluate(() => Object.keys(window.__asked || {}));
const paneAria = p => p.$eval('.shp-pane', e => e.getAttribute('aria-label') || '');

(async () => {
  console.log('#57 THE SHAPE STRETCHER — eleven-locale smoke');
  console.log(KEYS.length + ' authored keys; ' + localised + ' carry a non-English locale.');
  if (!HAS_LOCALES) {
    console.log('\n⚠⚠ THE FOLD IS INCOMPLETE — ' + SHORT.length + ' key(s) do not carry all ten');
    console.log('   non-English locales: ' + SHORT.join(', '));
    console.log('   Every locale is still mounted and reachability is still measured; the');
    console.log('   heading assertion still runs for every locale the TITLE carries.\n');
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
       from the tool's. The three exemptions are NAMED: the favicon, the
       platform entitlement endpoint this static server does not host
       (the tool is REQUIRED to degrade to the free tier without it), and
       the two Google font hosts — `lcs-shell.css:12` @imports them, the
       shell is protected at 0 lines, and a network blip in one random
       locale would otherwise teach me to re-run until green. */
    p.on('console', m => {
      if (m.type() !== 'error') return;
      const url = (m.location() || {}).url || '';
      if (/favicon\.ico/.test(url) || /api\/entitlement/.test(url)) return;
      if (/^https?:\/\/fonts\.(gstatic|googleapis)\.com\//.test(url)) return;
      fails.push(L + ': console error [' + (url || 'no url') + '] ' + m.text());
    });
    await p.setViewport({ width: 768, height: 1024 });
    await p.evaluateOnNewDocument(PRELUDE);
    await p.goto('http://127.0.0.1:' + PORT + '/mini-tools/shape-stretcher.html?lang=' + L, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 550));

    /* ⚠ TWO CHANNELS, AND THE TAG SENTENCE IS ON THE SECOND ONE. The
       pane's label names the shape (and the kept shape, when there is
       one); the CAPTION carries which tags are holding, as an aria-live
       region. My first version counted distinct pane labels and demanded
       five, which the label cannot vary that many ways — a floor pointed
       at the wrong channel, while the four tag strings were in fact all
       being reached. */
    const ariaSeen = {}, saySeen = {};
    const note = async () => {
      ariaSeen[await paneAria(p)] = 1;
      saySeen[await p.$eval('.shp-say', e => e.textContent || '')] = 1;
    };
    await note();

    /* ⚠ THE REFUSALS FIRST, because a lazy driver never enters them and
       their strings live ONLY behind those branches. */
    await click(p, '.shp-b-drop', L);                  /* nothing kept -> a refusal */
    await click(p, '.shp-b-print', L);                 /* locked       -> a refusal */

    /* ⭐ DRIVE TO EACH TAG STATE. All four announcements live behind a
       shape the deal picks at random, and a tag holds on about one
       opening in fifty. */
    await driveRail(p, 'skew', 60, L);                 /* no square corners      */
    await driveRail(p, 'len', 0, L);                   /* -> every side equal    */
    await note();                                      /* sayTagsEqual + saidSeat */
    await driveRail(p, 'skew', 90, L);                 /* -> and square corners  */
    await note();                                      /* sayTagsBoth  + saidSeat */
    await driveRail(p, 'len', 10, L);                  /* -> equal lets go       */
    await note();                                      /* sayTagsRight + saidPop  */
    await driveRail(p, 'skew', 60, L);                 /* -> square lets go      */
    await note();                                      /* sayTagsNone  + saidPop  */

    /* the dial: Enter is a quarter turn where there are no detents */
    await p.focus('.shp-track-turn .shp-rail');
    await p.keyboard.press('Enter');
    await new Promise(r => setTimeout(r, 160));
    await click(p, '.shp-b-quarter', L);               /* saidTurn */

    /* Enter on a rail that has no detents in this state is the other
       refusal a keyboard can produce */
    await driveRail(p, 'len', 40, L);
    await p.focus('.shp-track-skew .shp-rail');
    await p.keyboard.press('Enter');                   /* snaps to a detent */
    await new Promise(r => setTimeout(r, 160));

    /* keep / keep again / drop / drop again */
    await click(p, '.shp-b-keep', L);                  /* saidKept + ariaKept */
    await note();
    await click(p, '.shp-b-keep', L);                  /* -> saidNoKeep       */
    await click(p, '.shp-b-drop', L);
    await click(p, '.shp-b-drop', L);                  /* -> a refusal again  */
    await click(p, '.shp-b-deal', L);                  /* saidDealt           */

    /* the settings drawer -> sidesLabel + sidesFour + sidesThree, and
       the three-sided shape -> ariaShape3 */
    await click(p, '.lcs-ctrl', L);
    await new Promise(r => setTimeout(r, 250));
    const chips = await p.$$('.lcs-chip');
    ok(chips.length >= 2, L + ': the settings drawer offered ' + chips.length + ' chips — the sides setting is not rendered');
    if (chips.length >= 2) {
      const cb = await chips[chips.length - 1].boundingBox();
      if (cb) await p.mouse.click(cb.x + cb.width / 2, cb.y + cb.height / 2);
      await new Promise(r => setTimeout(r, 300));
    }
    await click(p, '.lcs-drawer-head .lcs-ctrl', L);
    await new Promise(r => setTimeout(r, 220));
    ok(!(await p.$('.lcs-drawer.open')), L + ': ⚠⚠ the settings drawer did not close — every click after it would be swallowed');
    await note();                                      /* ariaShape3 */

    const got = await p.evaluate(() => ({
      asked: Object.keys(window.__asked || {}),
      printed: window.__printed,
      gateOn: !!document.querySelector('.shp-gate.is-on'),
      gateText: (document.querySelector('.shp-gate') || {}).textContent || '',
      texts: [].slice.call(document.querySelectorAll(
        '.shp-btn .shp-label, .shp-tlabel, .shp-say, .shp-gate p, .shp-gate-cta, .lcs-title, .lcs-instruction, .lcs-field label, .lcs-chip'))
        .map(e => (e.textContent || '').trim()).filter(Boolean),
      railAria: [].slice.call(document.querySelectorAll('.shp-rail')).map(e => e.getAttribute('aria-label') || ''),
      paneAria: (document.querySelector('.shp-pane') || {}).getAttribute
        ? document.querySelector('.shp-pane').getAttribute('aria-label') : '',
      say: (document.querySelector('.shp-say') || {}).textContent || '',
      corners: document.querySelectorAll('.shp-live .shp-corner').length,
      lang: document.documentElement.lang
    }));
    ok(got.asked.length > 0, L + ': ⚠⚠ the recorder saw NOTHING — it failed to attach, and every reachability result here is void');
    ok(got.printed === 0, L + ': ⚠ the locked print control called window.print() — the paywall gave the sheet away');
    ok(got.gateOn, L + ': the paid gate is not shown to a free visitor');
    ok(got.gateText.length > 20, L + ': the paid gate carries no copy');
    ok(got.corners === 3, L + ': the three-sides setting did not take (' + got.corners + ' corners drawn)');
    ok(Object.keys(saySeen).length >= 4,
      L + ': ⭐ only ' + Object.keys(saySeen).length + ' distinct tag captions were reached — all four states live behind a shape the deal picks at random, and a tag holds on about one opening in fifty');
    ok(Object.keys(ariaSeen).length >= 3,
      L + ': ⭐ only ' + Object.keys(ariaSeen).length + ' distinct pane labels were reached — the label must at least tell a four-sided shape from a three-sided one, and one shape from a kept pair');
    got.asked.forEach(k => { asked[k] = (asked[k] || 0) + 1; });

    /* ⚠ NO RENDERED TEXT MAY BE A RAW KEY. That is what the shell shows
       when the strings map is the wrong shape (#50: every string dead
       while 120k model assertions were green). */
    const KEYSET = {}; KEYS.forEach(k => { KEYSET[k] = 1; });
    got.texts.concat(got.railAria).concat([got.paneAria, got.say]).forEach(function (t) {
      ok(!KEYSET[t], L + ': ⚠⚠ a STRING KEY is rendering — "' + t + '"');
    });
    ok(!/\{\w+\}/.test(got.paneAria + ' ' + got.say + ' ' + got.railAria.join(' ')),
      L + ': ⚠ a RAW TOKEN is rendering: ' + got.paneAria + ' | ' + got.say);
    ok(got.texts.length >= 10, L + ': non-vacuity — only ' + got.texts.length + ' rendered strings collected');
    /* ⚠ the tag sentence lives in the CAPTION, which is an aria-live
       region; the pane's label deliberately does not repeat it, so a
       screen reader is not re-read on every arrow press of the one
       control that by theorem changes nothing */
    ok(got.paneAria.length > 10, L + ': the pane carries no accessible name');
    ok(got.say.length > 5, L + ': the caption says nothing about the tags');
    ok(got.railAria.every(a => a.length > 1), L + ': a rail has no accessible name');

    const wantTitle = own.title[L] || own.title.en;
    const heading = await p.evaluate(() =>
      [].slice.call(document.querySelectorAll('h1,h2,.lcs-title')).map(x => x.textContent.trim()).filter(Boolean).join(' | '));
    /* ⚠ keyed on the TITLE THIS TOOL ACTUALLY CARRIES, not on a global
       "have the locales landed" flag — a flag can skip this silently. */
    if (L !== 'en' && typeof own.title[L] === 'string' && own.title[L]) {
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
    await p2.goto('http://127.0.0.1:' + PORT + '/mini-tools/shape-stretcher.html?lang=' + L, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 700));
    await click(p2, '.shp-b-keep', L + ' (paid)');
    await click(p2, '.shp-b-print', L + ' (paid)');
    const paid = await p2.evaluate(() => ({
      asked: Object.keys(window.__asked || {}),
      printed: window.__printed,
      gateOn: !!document.querySelector('.shp-gate.is-on'),
      sheetH: (document.querySelector('.shp-sh-h') || {}).textContent || '',
      sheetHint: (document.querySelector('.shp-sh-hint') || {}).textContent || '',
      lines: document.querySelectorAll('.shp-sh-line').length,
      shapes: document.querySelectorAll('.shp-sheet .shp-poly').length
    }));
    ok(paid.printed === 1, L + ': ⚠ a teacher pressed Print and window.print() was called ' + paid.printed + ' times');
    ok(!paid.gateOn, L + ': ⚠ the paid gate is STILL shown to a teacher — the tool sells them what they own');
    ok(paid.sheetH.length > 0, L + ': the printed sheet has no heading');
    ok(paid.sheetHint.length > 0, L + ': the printed sheet has no hint line');
    ok(paid.lines >= 4, L + ': the printed sheet carries only ' + paid.lines + ' ruled lines — the record is the PAPER');
    ok(paid.shapes === 2, L + ': ⚠ the printed sheet carries ' + paid.shapes + ' shapes, not the pair the class left on the pane');
    paid.asked.forEach(k => { asked[k] = (asked[k] || 0) + 1; });
    await p2.close();

    console.log('\n[' + L + '] html lang=' + got.lang + ' | ' + Object.keys(saySeen).length +
      ' distinct tag captions | heading: ' + heading);
    console.log('      pane: ' + got.paneAria);
    console.log('      say : ' + got.say);
    KEYS.forEach(function (k) {
      const v = own[k][L];
      console.log('      ' + (v == null ? '(en) ' : '      ') + k + ' = ' + JSON.stringify(v == null ? own[k].en : v));
    });
    drivenOK++;
    await b.close();
  }

  /* ⭐⭐ EVERY AUTHORED KEY MUST HAVE BEEN ASKED FOR. A key that is never
     asked is a string with no state behind it — the #39 `hintMark`
     class, and it is invisible to any source scan. THIS TOOL SHIPPED
     TWO: `drop` (a control that was never built) and `gateClose` (a
     modal that does not exist). */
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
  if (!HAS_LOCALES) console.log('  (THE FOLD IS INCOMPLETE — ' + SHORT.length + ' key(s) short of all ten locales)');
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
