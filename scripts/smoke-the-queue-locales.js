/* =====================================================================
   ELEVEN-LOCALE SMOKE + STRING REACHABILITY — TOOL #58, THE QUEUE
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
     so it is installed on the `window.TheQueue` setter.
   - "The string exists" is not "the string is reached". A source scan is
     defeated by an unreachable BRANCH that still contains the t() call —
     #39's `hintMark`, authored in eleven locales and wired to nothing.
     Only driving the states finds it.

   ⭐⭐ EVERY BRANCH IS ENTERED ON PURPOSE, and two of them are otherwise
   unreachable at the default setting:
     `sayLandedSame` + `ariaLandedSame` need an ODD platform — the two
       landings coincide iff k = (n+1)/2, which exists only for odd n. At
       the default `four` they can NEVER fire, so the driver switches the
       setting to `three` and counts two from each end.
     `sayEndOfLine` needs a count already at the far end, which means
       stepping n times and then once more.
     `sheetTitle` / `sheetHint` live behind the paywall, so pass 2 mocks
       the entitlement AT THE NETWORK — the real code path — rather than
       assigning `premium = true`, which would skip the fetch the tool
       actually runs.

   ⚠ THE TOOL CARRIES `en` ONLY. `i18n.t` therefore falls back to English
   in all eleven, which is CORRECT and expected pre-fan-out. The heading
   assertion is keyed on `own.title[L]` actually existing, so it cannot
   silently skip; a boolean flag would have.

   ⚠ AND THIS GATE CANNOT JUDGE TRANSLATION QUALITY. It proves
   locale-SELECTION and reachability. Poisoning a string moves both sides
   of any string-vs-string comparison together, so no such comparison is
   made — the copy itself is a native panel's job.

   Run: node scripts/smoke-the-queue-locales.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.QUE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const TOOL = path.join(ROOT, 'the-queue.js');
const PORT = Number(process.env.QUE_SMOKE_PORT) || 5694;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'the-queue.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

const TOOLOBJ = require(TOOL);
const own = TOOLOBJ.strings;
const KEYS = Object.keys(own);
const SHORT = KEYS.filter(k => LOCALES.some(l => typeof own[k][l] !== 'string' || !own[k][l]));
const HAS_LOCALES = KEYS.length > 0 && SHORT.length === 0;

/* ⚠⚠ CLONE TRAP, closed structurally. */
if (TOOLOBJ.id !== 'the-queue') { console.log('FATAL: loaded ' + TOOLOBJ.id + ', not the-queue.'); process.exit(1); }

const fails = [];
let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };

/* the recorder + a print stub, installed before any tool script runs */
const PRELUDE = () => {
  window.__asked = {};
  window.__printed = 0;
  window.print = function () { window.__printed++; };
  Object.defineProperty(window, 'TheQueue', {
    configurable: true,
    set: function (tool) {
      const real = tool.strings;
      tool.strings = new Proxy(real, {
        get: function (t, k) { if (typeof k === 'string') window.__asked[k] = 1; return t[k]; }
      });
      Object.defineProperty(window, 'TheQueue', { value: tool, writable: true, configurable: true });
    },
    get: function () { return undefined; }
  });
};

/* ⚠ A CLICK THAT SILENTLY DOES NOTHING HOLLOWS OUT EVERY ASSERTION AFTER
   IT (#39). This one reports, and the caller counts. */
async function click(p, sel, why, nth, settle) {
  const hs = await p.$$(sel);
  const h = hs[nth || 0];
  if (!h) { fails.push(why + ': no element ' + sel); checks++; return false; }
  const box = await h.boundingBox();
  if (!box || box.width < 1) { fails.push(why + ': zero-size ' + sel); checks++; return false; }
  if (box.y < 0 || box.y + box.height > p.viewport().height) {
    await h.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 110));
  }
  const b2 = await h.boundingBox();
  if (!b2) { fails.push(why + ': ' + sel + ' vanished'); checks++; return false; }
  await p.mouse.click(b2.x + b2.width / 2, b2.y + b2.height / 2);
  await new Promise(r => setTimeout(r, settle === undefined ? 170 : settle));
  return true;
}

const askedIn = p => p.evaluate(() => Object.keys(window.__asked || {}));
const stageAria = p => p.$eval('.que-stage', e => e.getAttribute('aria-label') || '').catch(() => '');
const liveText = p => p.evaluate(async () => {
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  const l = document.querySelector('.lcs-sr-only[aria-live]');
  return l ? l.textContent : '';
});

(async () => {
  console.log('#58 THE QUEUE — eleven-locale smoke + string reachability');
  console.log(KEYS.length + ' authored keys.');
  if (!HAS_LOCALES) {
    console.log('\n⚠ THE FAN-OUT HAS NOT RUN — ' + SHORT.length + ' key(s) carry English only.');
    console.log('  This is EXPECTED pre-fan-out: `i18n.t` falls back to `en` in all eleven.');
    console.log('  Every locale is still mounted and reachability is still measured; the');
    console.log('  heading assertion runs for exactly those locales the title carries.\n');
  }

  const askedAll = {};
  let printedFree = 0, printedTeacher = 0;

  for (const L of LOCALES) {
    const br = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await br.newPage();
    await p.setViewport({ width: 1024, height: 950 });
    const errs = [];
    p.on('pageerror', e => errs.push(String(e.message)));
    await p.evaluateOnNewDocument(PRELUDE);
    await p.goto('http://localhost:' + PORT + '/the-queue.html?lang=' + L, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 320));

    /* ---- NON-VACUITY FIRST ---------------------------------------- */
    const mounted = await p.evaluate(() => !!document.querySelector('.que-wrap') && document.querySelectorAll('.que-member').length);
    ok(mounted >= 3, L + ': the tool did not mount (' + mounted + ' members)');
    if (!mounted) { await br.close(); continue; }

    /* ---- ariaNoEnd + the free gate (both live at rest) ------------- */
    const aria0 = await stageAria(p);
    ok(aria0.length > 0, L + ': the stage carries no aria-label at rest');
    ok(await p.evaluate(() => !!document.querySelector('.que-gate.is-on')), L + ': the free gate is not shown to a non-subscriber');

    /* ---- both refusals, before an end is chosen -------------------- */
    await click(p, '.que-b-step', L + ' refuse/step');
    const refuseSay = await liveText(p);
    ok(refuseSay.length > 0, L + ': refusing to step announced nothing');
    await click(p, '.que-b-board', L + ' refuse/board');

    /* ---- pick an end: ariaPlatform, then stepping ------------------ */
    await click(p, '.que-b-enda', L + ' pick end a');
    await click(p, '.que-b-step', L + ' step 1');
    const ariaWalk = await stageAria(p);
    ok(ariaWalk !== aria0, L + ': the stage aria-label did not change after a step');

    /* ---- sayEndOfLine: step to the far end and once more ----------- */
    for (let i = 0; i < 5; i++) await click(p, '.que-b-step', L + ' step to the end');
    const endSay = await liveText(p);
    ok(endSay.length > 0, L + ': stepping past the far end announced nothing');

    /* ---- sayBoarded ----------------------------------------------- */
    await click(p, '.que-b-board', L + ' board');
    /* ---- sayDealt -------------------------------------------------- */
    await click(p, '.que-b-again', L + ' deal');

    /* ---- the drawer, and the ODD platform for sayLandedSame -------- */
    await click(p, '.lcs-ctrl', L + ' open settings');
    const chips = await p.$$('.lcs-chip');
    ok(chips.length === 2, L + ': expected two size chips, found ' + chips.length);
    await click(p, '.lcs-chip', L + ' choose three', 1);   /* ⚠ BY INDEX, never by English */
    await p.evaluate(() => { const x = document.querySelector('.lcs-drawer-head .lcs-ctrl'); if (x) x.click(); });
    await new Promise(r => setTimeout(r, 200));
    ok(await p.evaluate(() => !document.querySelector('.lcs-drawer.open')), L + ': the settings drawer would not close');
    const n3 = await p.evaluate(() => document.querySelectorAll('.que-member').length);
    ok(n3 === 3, L + ': the size setting did not take (' + n3 + ' members)');

    await click(p, '.que-b-enda', L + ' odd/pick');
    await click(p, '.que-b-step', L + ' odd/step 1');
    await click(p, '.que-b-step', L + ' odd/step 2');
    const sameSay = await p.$eval('.que-say', e => e.textContent).catch(() => '');
    ok(sameSay.length > 0, L + ': the self-same landing is silent — the tool\'s best moment');
    const ariaSame = await stageAria(p);
    ok(/\S/.test(ariaSame), L + ': the self-same landing carries no aria-label');

    /* ---- the free tier must NOT print ------------------------------ */
    await click(p, '.que-b-print', L + ' print (free)');
    const pf = await p.evaluate(() => window.__printed);
    printedFree += pf;
    ok(pf === 0, L + ': the FREE tier reached window.print() — the sheet is sold, not given');

    const askedFree = await askedIn(p);
    askedFree.forEach(k => { askedAll[k] = 1; });

    /* ---- no raw key and no raw token may render -------------------- */
    const rendered = await p.evaluate(() => {
      const bits = [];
      document.querySelectorAll('.que-wrap *, .lcs-app h1, .lcs-app p').forEach(e => {
        if (e.children.length === 0 && e.textContent.trim()) bits.push(e.textContent.trim());
      });
      document.querySelectorAll('[aria-label]').forEach(e => bits.push(e.getAttribute('aria-label')));
      return bits;
    });
    rendered.forEach(txt => {
      ok(KEYS.indexOf(txt) < 0, L + ': a RAW KEY rendered as text — "' + txt + '"');
      ok(!/\{\w+\}/.test(txt), L + ': an unsubstituted token rendered — "' + txt + '"');
    });

    ok(errs.length === 0, L + ': page error — ' + errs[0]);

    /* ---- PASS 2: a teacher, entitlement mocked AT THE NETWORK ------ */
    const p2 = await br.newPage();
    await p2.setViewport({ width: 1024, height: 950 });
    await p2.evaluateOnNewDocument(PRELUDE);
    await p2.setRequestInterception(true);
    p2.on('request', r => {
      if (r.url().indexOf('/api/entitlement') >= 0) {
        r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ tier: 'teacher' }) });
      } else r.continue();
    });
    await p2.goto('http://localhost:' + PORT + '/the-queue.html?lang=' + L, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 420));
    ok(await p2.evaluate(() => !document.querySelector('.que-gate.is-on')), L + ': the paid gate is still shown to a teacher');
    await click(p2, '.que-b-print', L + ' print (teacher)');
    const pt = await p2.evaluate(() => window.__printed);
    printedTeacher += pt;
    ok(pt > 0, L + ': a TEACHER could not reach window.print() — the thing they paid for');
    const sheetHas = await p2.evaluate(() => {
      const s = document.querySelector('.que-sheet');
      return { h: !!s.querySelector('.que-sh-h'), hint: !!s.querySelector('.que-sh-hint'),
        shapes: s.querySelectorAll('.que-member').length, lines: s.querySelectorAll('.que-sh-line').length,
        text: s.querySelectorAll('.que-sh-svg text').length };
    });
    ok(sheetHas.h && sheetHas.hint, L + ': the printed sheet is missing its heading or its hint');
    ok(sheetHas.shapes >= 3, L + ': the printed sheet does not carry the platform the class was looking at');
    ok(sheetHas.lines >= 4, L + ': the printed sheet has no ruled lines to write on');
    ok(sheetHas.text === 0, L + ': words appeared on the printed apparatus — §23.2');

    (await askedIn(p2)).forEach(k => { askedAll[k] = 1; });

    /* ---- the heading, for the locales the tool actually carries ---- */
    if (own.title && own.title[L]) {
      const h = await p2.evaluate(() => { const e = document.querySelector('.lcs-app h1, .lcs-title'); return e ? e.textContent.trim() : ''; });
      ok(h === own.title[L], L + ': heading is "' + h + '", authored "' + own.title[L] + '"');
    }

    console.log('  ' + L + ' · mounted ' + mounted + ' · asked ' + askedFree.length + '/' + KEYS.length +
      ' · free print ' + pf + ' · teacher print ' + pt + ' · sheet ' + sheetHas.shapes + ' shapes/' + sheetHas.lines + ' lines');
    await br.close();
  }

  /* ================================================================= */
  /* ⭐ NO AUTHORED KEY MAY GO UNASKED.                                */
  /* ================================================================= */
  const never = KEYS.filter(k => !askedAll[k]);
  ok(never.length === 0, 'DEAD STRINGS: authored and never asked for in any state — ' + never.join(', '));
  ok(Object.keys(askedAll).length >= KEYS.length, 'the recorder saw only ' + Object.keys(askedAll).length +
    ' keys — the Proxy is broken, not the tool');
  ok(printedFree === 0, 'the free tier reached window.print() in ' + printedFree + ' locale(s)');
  ok(printedTeacher === LOCALES.length, 'a teacher reached window.print() in only ' + printedTeacher + ' of ' + LOCALES.length + ' locales');

  console.log('\n--- the authored string set, for a human to read ---');
  KEYS.forEach(k => console.log('  ' + k.padEnd(16) + ' ' + JSON.stringify(own[k].en)));

  srv.close();
  if (fails.length) {
    console.log('\n' + fails.length + ' FAIL of ' + checks + ' assertions:');
    fails.forEach(f => console.log('  ✗ ' + f));
    process.exit(1);
  }
  console.log('\n✓ smoke-the-queue-locales: ' + checks + ' assertions across ' + LOCALES.length +
    ' locales, every one of ' + KEYS.length + ' authored keys reached, 0 failures');
})().catch(e => { console.log('ERROR ' + e.message + '\n' + e.stack); try { srv.close(); } catch (x) {} process.exit(1); });
