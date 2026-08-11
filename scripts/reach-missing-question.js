/* =====================================================================
   reach-missing-question.js — EVERY AUTHORED STRING MUST BE ASKED FOR
   ---------------------------------------------------------------------
   Run:  node scripts/reach-missing-question.js

   ⚠⚠ "THE STRING EXISTS" IS NOT "THE STRING IS REACHED", AND A SOURCE
   SCAN CANNOT TELL THEM APART. A `t('key')` call sitting in a branch
   nothing can enter passes every grep. This build shipped TWO such
   strings before a native panel read the model and found them:
     · `sayShape` was reachable only from `stageOf() === null`, and an
       exhaustive walk finds 0 of 147 button-reachable states there;
     · `askAt` was authored and rendered nowhere — only `askAt0/1/2`
       were ever read.
   Both are the recorded `hintMark` class: a string eleven native panels
   would have translated, wired to a state that cannot happen.

   So this gate does not scan. It installs a RECORDING PROXY over the
   tool's own strings object, drives the tool over a matrix of real
   states with real pointer clicks, and requires every authored key to
   have been ASKED FOR.

   ⚠ THE PROXY GOES ON `tool.strings`, NOT ON `api.t`. The shell freezes
   the api at lcs-shell.js:482, so `t` is non-writable and wrapping it
   silently no-ops in sloppy mode — a recorder that reports "0 keys
   asked" in every locale while every string renders. `i18n.t` reads
   `dict[key]` at CALL time, so a proxy over the dict needs nothing
   writable.

   ⚠ AND A RECORDER INSTALLED AFTER MOUNT CANNOT SEE WHAT WAS READ AT
   MOUNT. `render()` is forced once after the proxy is in, so the whole
   build path is re-run through it.
   ===================================================================== */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.MISSING_QUESTION_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const PORT = Number(process.env.MISSING_QUESTION_PORT) || 5781;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'missing-question.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript'
    : f.endsWith('.json') ? 'application/json'
      : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t });
  rs.end(fs.readFileSync(fp));
}).listen(PORT);

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* keys the SHELL consumes rather than the tool — they are read through
   `i18n.t(tool.strings, …)` too, but at shell-build time, before any
   recorder can be installed. An auditable list with a reason each, never
   a loosened pattern. */
const SHELL_CONSUMED = {
  title: 'lcs-shell.js:449 — the <h1> and the accessible name',
  instruction: 'lcs-shell.js:461 — the instruction line (display:none in embed)'
};

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(String(e.message)));

  await p.setViewport({ width: 704, height: 1000 });
  await p.goto(`http://localhost:${PORT}/mini-tools/missing-question.html`, { waitUntil: 'networkidle0' });
  await sleep(350);

  /* ---- install the recorder, then FORCE a full rebuild through it ---- */
  const installed = await p.evaluate(() => {
    const T = window.MissingQuestion;
    if (!T || !T.strings) return { ok: false, why: 'no strings object' };
    const raw = T.strings;
    window.__asked = new Set();
    T.strings = new Proxy(raw, {
      get(target, key) {
        if (typeof key === 'string') window.__asked.add(key);
        return target[key];
      }
    });
    /* the proxy must actually be the thing the shell reads */
    const probe = T.api && T.api.t ? T.api.t('title') : null;
    return { ok: true, keys: Object.keys(raw).length, probe: probe };
  });
  if (!installed.ok) { console.log('FAIL — could not install the recorder: ' + installed.why); process.exit(1); }
  console.log(`recorder installed over ${installed.keys} authored keys`);
  /* ⚠ non-vacuity: if the probe did not register, the proxy is not the
     object being read and every "never asked" below would be a lie */
  const sawProbe = await p.evaluate(() => window.__asked.has('title'));
  if (!sawProbe) { console.log('FAIL — the recorder is not on the path the tool reads'); process.exit(1); }

  await p.evaluate(() => window.MissingQuestion.render());
  await sleep(200);

  const click = async sel => {
    const el = await p.$(sel);
    if (!el) return false;
    await el.click();
    await sleep(90);
    return true;
  };
  const ask = () => p.evaluate(() => window.MissingQuestion.st.ask);
  const setBand = bd => p.evaluate(x => {
    const T = window.MissingQuestion; T.api.settings.band = x; T.onSettings('band', x); T.render();
  }, bd);
  const setShape = sh => p.evaluate(x => {
    const T = window.MissingQuestion; T.api.settings.shape = x; T.onSettings('shape', x); T.render();
  }, sh);
  const setPremium = v => p.evaluate(x => {
    const T = window.MissingQuestion; T.premium = x; T._gate(); T.render();
  }, v);

  /* ---- THE MATRIX ------------------------------------------------- */

  /* every refusal, each reached by the act that causes it */
  await click('.mqu-b-count');              /* nothing told   -> saidNothingTold */
  await click('.mqu-b-t0');                 /* not linked     -> saidNothingLinked */
  await click('.mqu-b-recount');            /* not counted    -> saidNotCounted */
  await click('.mqu-b-link');
  const a0 = await ask();
  await click('.mqu-b-t' + a0);             /* that IS the ask -> saidThatIsTheAsk */
  const tellable = [0, 1, 2].filter(i => i !== a0);
  await click('.mqu-b-t' + tellable[0]);
  await click('.mqu-b-count');              /* one told       -> saidStillMissing */
  await click('.mqu-b-t' + tellable[1]);
  await click('.mqu-b-count');              /* the count      -> sayCount */
  await sleep(400);
  await click('.mqu-b-count');              /* uncount */
  await click('.mqu-b-count');
  await sleep(300);
  await click('.mqu-b-recount');            /* recount */
  await sleep(600);

  /* the ceiling and the floor.
     ⚠ FROM A CLEAN FRAME. The size steppers now REFUSE once anything is
     linked or told, so running this leg on the state the ladder walk
     left behind produced `saidTellingStarted` every time and
     `saidAtCeiling` was never reached — the gate correctly reported a
     dead string that was in fact live, because the drive could not get
     to it. */
  await click('.mqu-b-deal');
  for (let i = 0; i < 30; i++) await click('.mqu-b-tup');    /* -> saidAtCeiling */
  for (let i = 0; i < 30; i++) await click('.mqu-b-tdown');  /* -> saidAtFloor */
  await click('.mqu-b-link');
  await click('.mqu-b-tup');                                 /* -> saidTellingStarted */
  await click('.mqu-b-link');

  /* the paywall, both states.
     ⚠ `window.print()` opens a modal the headless browser never
     dismisses, so it is stubbed. That is a harness limitation, NOT the
     tool being helped past its own dispatch: the REAL print chip is
     clicked, the REAL entitlement guard runs, and `_buildSheet` is
     reached the way a subscriber reaches it. */
  await p.evaluate(() => { window.print = function () { window.__printed = (window.__printed || 0) + 1; }; });
  await setPremium(false);
  await click('.mqu-b-print');              /* -> saidLocked + lockedTitle/Body */
  await setPremium(true);
  await click('.mqu-b-print');              /* -> sheetTitle + sheetHint */
  await sleep(150);
  const printed = await p.evaluate(() => window.__printed || 0);
  if (!printed) { console.log('FAIL — the print chip did not reach window.print() for a subscriber'); await b.close(); srv.close(); process.exit(1); }
  await setPremium(false);

  /* ⚠ THE SETTINGS DRAWER IS A STRING SURFACE TOO, and it is built
     lazily — the shell renders `setShape`/`setBand` and every option
     label only when the drawer opens. A drive that never opens it scores
     seven authored keys as dead when they are simply behind a control
     nobody pressed. Open it. */
  const drawerOpened = await p.evaluate(() => {
    const btns = document.querySelectorAll('.lcs-ctrl');
    if (!btns.length) return false;
    btns[0].click();               /* settings is always first */
    return true;
  });
  if (!drawerOpened) { console.log('FAIL — no chrome controls found; the drawer could not be opened'); await b.close(); srv.close(); process.exit(1); }
  await sleep(250);
  const drawerChips = await p.$$eval('.lcs-chip', n => n.length);
  if (drawerChips < 5) { console.log('FAIL — the settings drawer rendered only ' + drawerChips + ' chips; it did not open'); await b.close(); srv.close(); process.exit(1); }
  await sleep(120);

  /* every arrangement — and the say that belongs to a change.
     ⚠ BOTH OUTCOMES OF A CHANGE MUST BE REACHED. An arrangement switch
     either CARRIES the told facts into the new roles or, when the same
     two numbers cannot be legal there, CLEARS them — and the two have
     different say-lines because only one of them is "the same two
     things". Measured over every frame: 102 changes carry, 138 clear.
     A drive that happens to hit only the carrying half scores
     `sayShapeCleared` as dead when it is simply on the other branch. */
  for (const sh of ['change', 'compare', 'bracket']) await setShape(sh);

  /* the CLEARING branch, driven with real controls: walk the total down
     to the floor (where the parts are tightest) with both facts told,
     then change the arrangement. */
  /* ⚠ `link` IS A TOGGLE, so a blind click can turn it OFF. An earlier
     leg of this drive leaves it on, and clicking it here unlinked the
     stand, made every `tell` refuse, and left 0 told — so the switch
     carried trivially and the clearing branch was never entered. The
     drive must READ the state, not assume it. */
  /* ⚠ START FROM A KNOWN STATE, using a real control. This leg kept
     inheriting whatever the previous legs had left — a linked stand, a
     half-told frame — and every "fix" that assumed a state was wrong
     again one control later. `deal` is the tool's own way of saying
     "everything unsaid", so press it and proceed from there. */
  await click('.mqu-b-deal');
  await setShape('change');
  await click('.mqu-b-deal');
  for (let i = 0; i < 30; i++) await click('.mqu-b-tdown');
  const ensureLinked = async () => {
    const on = await p.evaluate(() => !!window.MissingQuestion.st.linked);
    if (!on) await click('.mqu-b-link');
    const now = await p.evaluate(() => !!window.MissingQuestion.st.linked);
    if (!now) throw new Error('could not link the stand');
  };
  await ensureLinked();
  const a1 = await ask();
  /* ⚠ `tell` IS A TOGGLE TOO. A blind click on a niche an earlier leg
     already told turns it OFF — the same trap as `link`, one control
     along, and it left the drive at told=1 so the clearing branch was
     never entered. Read the state before every click. */
  for (const j of [0, 1, 2]) {
    if (j === a1) continue;
    const on = await p.evaluate(i => !!window.MissingQuestion.st.told[i], j);
    if (!on) await click('.mqu-b-t' + j);
  }
  const toldNow = await p.evaluate(() => window.MissingQuestion.toldCount(window.MissingQuestion.st));
  if (toldNow !== 2) throw new Error('drive failed to tell both facts (told=' + toldNow + ')');
  await setShape('bracket');
  await setShape('compare');
  await setShape('change');
  /* every band */
  for (const bd of ['twenty', 'ten']) await setBand(bd);
  /* every ask position, and the tell/untell label pair on each */
  for (const i of [0, 1, 2]) {
    await click('.mqu-b-ask' + i);
    await click('.mqu-b-link');
    for (const j of [0, 1, 2]) { await click('.mqu-b-t' + j); await click('.mqu-b-t' + j); }
    await click('.mqu-b-link');
  }
  await click('.mqu-b-deal');
  await click('.mqu-b-unlink') /* no such control; harmless */;

  /* the niches are controls too */
  for (const i of [0, 1, 2]) await click(`.mqu-niche[data-i="${i}"]`);

  /* ---- the verdict ------------------------------------------------ */
  const res = await p.evaluate(() => ({
    asked: Array.from(window.__asked),
    all: Object.keys(window.MissingQuestion.strings)
  }));

  const authored = res.all.filter(k => typeof k === 'string');
  const never = authored.filter(k => res.asked.indexOf(k) < 0 && !SHELL_CONSUMED[k]);
  const shellOnly = authored.filter(k => res.asked.indexOf(k) < 0 && SHELL_CONSUMED[k]);

  console.log(`\n${authored.length} authored keys; ${res.asked.filter(k => authored.indexOf(k) >= 0).length} asked for during the drive`);
  if (shellOnly.length) {
    console.log('\nconsumed by the SHELL rather than the tool (auditable exemptions):');
    shellOnly.forEach(k => console.log(`  · ${k.padEnd(16)} ${SHELL_CONSUMED[k]}`));
  }
  if (errs.length) console.log('\npage errors: ' + JSON.stringify(errs.slice(0, 3)));

  if (never.length) {
    console.log(`\nFAIL — ${never.length} authored string(s) were NEVER ASKED FOR:`);
    never.forEach(k => console.log('  ✗ ' + k));
    console.log('\n  A string with no state behind it is the `hintMark` class. Either');
    console.log('  wire it to a reachable state, or delete it — never leave it for');
    console.log('  eleven native panels to translate.');
    await b.close(); srv.close(); process.exit(1);
  }

  console.log('\nPASS — every authored string was asked for by a real state.');
  await b.close(); srv.close();
})().catch(e => { console.error('FAILED: ' + e.message); srv.close(); process.exit(1); });
