/* =====================================================================
   GATE — scripts/_shp-behaviour.js       TOOL #57 THE SHAPE STRETCHER
   ---------------------------------------------------------------------
   The measured defects D2, D3, D5c, D9, D10 and D11, each asserted on
   the RENDERED tool rather than on the source — because every one of
   them passed a source-level reading. In particular:

     D2  the TURN rail played SND_DETENT on every rung, on the one rail
         whose detent set is EMPTY BY CONSTRUCTION (the tool's second
         invention, contradicted by ear), and `saidTurn` was reachable
         ONLY from the quarter-turn button.
     D3  the kept shape — the single change bought by the strongest
         pedagogy finding in the file — announced its EXISTENCE and
         never its sides or its tags, so the one mechanism with an
         effect size was sighted-only; and it was destroyed silently by
         deal / reset / settings.
     D5c Home and End on the dial moved it 200 DEGREES, because d was
         ±1e9 and 2e9 % 360 === 200.
     D9  the dial's `aria-valuenow` carried the raw rotation 0-358 — the
         degree numeral this file's own refuse-list bans, reaching a
         screen reader by a route no string edit could close.
     D10 the whole pane label was rebuilt on every paint, so a screen
         reader re-read it on every arrow press of a control that by
         theorem changes nothing.
     D11 the `sayTags*` strings are the tool's ONLY VISIBLE CAPTION and
         the pane's `aria-label` is on a role="group", which is never
         announced when it changes — the naming was exactly inverted and
         the a11y channel did not exist.

   ⚠ EVERY ASSERTION IS PRECEDED BY A NON-VACUITY CHECK. A rail that is
   absent, a label that is empty and a sound log that was never wired all
   compare equal to the passing case.
   ⚠ EVERY SCRIPTED INTERACTION FAILS LOUDLY IF IT DID NOT HAPPEN — a
   silent no-op hollows out the assertion that follows it (#39).

   Usage:  node scripts/_shp-behaviour.js [--poison]
   ===================================================================== */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const pup = require('puppeteer');

const ROOT = path.join(process.cwd(), 'mini tools');
const PORT = 5918;
const MIME = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.json': 'application/json' };
const POISON = process.argv.indexOf('--poison') >= 0;

const PROBE = async function (poison) {
  const T = window.ShapeStretcher;
  const R = { err: null };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  if (!T || !T._apply) { R.err = 'the tool is not mounted'; return R; }

  /* ---- instruments -------------------------------------------- */
  const sounds = [];
  const said = [];
  const rawSnd = T._snd;
  T._snd = function (f, force) { sounds.push(f); return rawSnd.call(this, f, force); };
  /* ⚠⚠ THE SHELL'S api IS Object.freeze'd (#43), AND A PLAIN ASSIGNMENT
     ONTO A PROTOTYPE-SHADOW OF IT SILENTLY NO-OPS IN SLOPPY MODE — the
     inherited `announce` is non-writable, so `shadow.announce = fn` does
     nothing at all and every sentence assertion would then be measuring
     an instrument that never installed. `defineProperty` is what
     actually attaches, and `spyAttached` below proves it did rather than
     assuming it. This exact non-vacuity check caught it on first run. */
  const rawApi = T.api;
  const shadow = Object.create(rawApi);
  Object.defineProperty(shadow, 'announce', {
    value: function (s) { said.push(s); try { return rawApi.announce.call(rawApi, s); } catch (e) { return null; } },
    writable: true, configurable: true, enumerable: true
  });
  T.api = shadow;
  R.spyAttached = (T.api.announce !== rawApi.announce) && (typeof T.api.t === 'function');

  const rail = k => document.querySelector('.shp-track-' + k + ' .shp-rail');
  const say = () => document.querySelector('.shp-say');
  const pane = () => document.querySelector('.shp-pane');

  R.railsFound = ['len', 'skew', 'turn'].filter(k => !!rail(k)).length;
  R.sayFound = !!say();
  R.paneFound = !!pane();
  if (R.railsFound !== 3 || !R.sayFound || !R.paneFound) { R.err = 'the apparatus is not on the page'; return R; }

  /* ---- D11: the caption is a live region ----------------------- */
  R.sayRole = say().getAttribute('role');
  R.sayLive = say().getAttribute('aria-live');
  R.sayText = (say().textContent || '').trim();

  /* ---- D9: the dial carries no number, the other two do -------- */
  T.st = { n: 4, k: 12, theta: 70, rot: 40, kept: null }; T.render(); await sleep(20);
  R.aria = {};
  ['len', 'skew', 'turn'].forEach(function (k) {
    R.aria[k] = {
      now: rail(k).getAttribute('aria-valuenow'),
      min: rail(k).getAttribute('aria-valuemin'),
      role: rail(k).getAttribute('role'),
      tab: rail(k).getAttribute('tabindex'),
      label: rail(k).getAttribute('aria-label')
    };
  });

  /* ---- D2: turning plays no detent tone, and DOES say --------- */
  sounds.length = 0; said.length = 0;
  T.st = { n: 4, k: 12, theta: 70, rot: 40, kept: null }; T.render(); await sleep(20);
  const rotBefore = T.st.rot;
  T._step('turn', 1);                       /* the RAIL's own path */
  await sleep(10);
  R.turnMoved = T.st.rot !== rotBefore;     /* the interaction must HAVE happened */
  R.turnSounds = sounds.slice();
  R.turnSaid = said.slice();
  R.detentFreq = T.GEO ? T.GEO.SND_DETENT : null;

  /* and a stretch that crosses nothing STILL clicks — the control that
     proves the silence above is about the dial, not about silence */
  sounds.length = 0;
  T._step('len', 1);
  await sleep(10);
  R.lenSounds = sounds.slice();

  /* ---- D5c: Home and End on the dial go nowhere ---------------- */
  T.st = { n: 4, k: 12, theta: 70, rot: 40, kept: null }; T.render(); await sleep(10);
  T._step('turn', 'lo'); R.rotAfterHome = T.st.rot;
  T._step('turn', 'hi'); R.rotAfterEnd = T.st.rot;
  /* the same two keys on a rail that HAS ends must still work — else
     "nothing moved" would be true for a broken handler too */
  T._step('len', 'lo'); R.kAfterHome = T.st.k;
  T._step('len', 'hi'); R.kAfterEnd = T.st.k;
  R.kLo = T._range('len').lo; R.kHi = T._range('len').hi;

  /* ---- D10: a pure rotation does not rewrite the label --------- */
  T.st = { n: 4, k: 12, theta: 70, rot: 40, kept: null }; T.render(); await sleep(10);
  const label0 = pane().getAttribute('aria-label');
  let writes = 0;
  const obs = new MutationObserver(function (ms) { ms.forEach(function (m) { if (m.attributeName === 'aria-label') writes++; }); });
  obs.observe(pane(), { attributes: true, attributeFilter: ['aria-label'] });
  for (let i = 0; i < 6; i++) { T._step('turn', 1); }
  await sleep(30);
  R.labelWritesOnRotation = writes;
  writes = 0;
  T._step('len', 1);                        /* a FORM change must rewrite it */
  await sleep(30);
  R.labelWritesOnForm = writes;
  obs.disconnect();
  R.labelStableText = pane().getAttribute('aria-label') !== null && label0 !== null;

  /* ---- D3: the kept shape says what it IS --------------------- */
  T.st = { n: 4, k: 0, theta: 90, rot: 30, kept: null }; T.render(); await sleep(10);
  R.labelNoKept = pane().getAttribute('aria-label');
  T._keep(); await sleep(10);
  R.keptTaken = !!T.st.kept;
  /* move the live shape well away from the kept one, and make it a
     triangle so the two descriptions cannot coincide */
  T.st = { n: 3, k: 70, theta: 30, rot: 12, kept: T.st.kept }; T.render(); await sleep(10);
  R.labelWithKept = pane().getAttribute('aria-label');
  /* ⚠⚠ THE EXPECTATION IS PINNED BY HAND, NOT READ BACK THROUGH
     `_tagKey`. The first version of this probe called the very function
     under test to work out what the label OUGHT to say, so poisoning
     `_tagKey` moved both sides together and the assertion passed on a
     tool that had stopped announcing the kept shape entirely — a gate
     marking its own homework (#44), caught by its own poison run.
     Ground truth, derived from the model by hand: the kept shape is
     {n:4, k:0, theta:90}; k = 0 makes every side equal at n = 4 and
     theta = 90 makes all four corners right, so BOTH tags hold and the
     sentence is `sayTagsBoth`. The live shape is {n:3, k:70,
     theta:30}: neither holds, so it is `sayTagsNone`. */
  R.keptTagSentence = T.api.t('sayTagsBoth');
  R.liveTagSentence = T.api.t('sayTagsNone');
  R.liveShapeWord = T.api.t('ariaShape3');
  R.keptShapeWord = T.api.t('ariaShape4');

  /* ---- D3b: the kept shape is not destroyed silently ---------- */
  T._deal(); await sleep(10);
  R.keptSurvivesDeal = !!T.st.kept;
  T.reset(); await sleep(10);
  R.keptSurvivesReset = !!T.st.kept;
  T.onSettings(); await sleep(10);
  R.keptSurvivesSettings = !!T.st.kept;
  /* and the put-away control still works, or "survives" is just "stuck" */
  T._drop(); await sleep(10);
  R.dropStillWorks = !T.st.kept;

  /* ---- D5a: a print refusal says something -------------------- */
  said.length = 0;
  T.premium = false;
  T._print(); await sleep(10);
  R.printRefusalSaid = said.slice();
  said.length = 0;
  T._keep(); T._keep(); await sleep(10);    /* the second is the refusal */
  R.keepRefusalSaid = said.slice();

  if (poison === 'nolive') say().removeAttribute('aria-live');
  return R;
};

/* ---------------------------------------------------------------- */
function judge(R) {
  const fails = []; let pass = 0;
  const ok = (c, m) => { if (c) pass++; else fails.push(m); };
  if (R.err) { fails.push(R.err); return { pass, fails }; }

  /* NON-VACUITY */
  ok(R.spyAttached === true, '⚠⚠ the announce spy did not attach — every sentence assertion below is measuring an instrument that never installed');
  ok(R.railsFound === 3, 'non-vacuity: found ' + R.railsFound + ' rails, not 3');
  ok(typeof R.detentFreq === 'number', 'non-vacuity: GEO.SND_DETENT is not readable, so "no detent tone" cannot be checked');
  if (!R.spyAttached || R.railsFound !== 3) return { pass, fails };

  /* D11 */
  ok(R.sayLive === 'polite' || R.sayLive === 'assertive',
    'D11 ⚠⚠ THE ONLY VISIBLE CAPTION IS NOT A LIVE REGION (aria-live=' + JSON.stringify(R.sayLive) + ') — the pane label is on a role="group" and is never announced, so a tag arriving or leaving reaches a screen reader on NO channel');
  ok(R.sayRole === 'status', 'D11 the caption has no status role (' + JSON.stringify(R.sayRole) + ')');
  ok(!!R.sayText, 'D11 non-vacuity: the caption is empty, so its liveness is unobservable');

  /* D9 */
  ok(R.aria.turn.now === null,
    'D9 ⚠⚠ THE DIAL STILL ANNOUNCES A DEGREE NUMERAL — aria-valuenow="' + R.aria.turn.now + '", the exact quantity the refuse-list bans and the second invention proves irrelevant');
  ok(R.aria.len.now !== null && R.aria.skew.now !== null,
    'D9 the stretch/lean rails lost their value too — those numbers DO change what the shape is, and dropping them is the fix overshooting');
  ok(R.aria.turn.tab === '0' && !!R.aria.turn.label,
    'D9 the dial is no longer reachable or no longer named — the numeral had to go, the control did not');

  /* D2 */
  ok(R.turnMoved === true, 'D2 non-vacuity: the turn step did not move the dial, so "it made no sound" is meaningless');
  ok(R.turnSounds.indexOf(R.detentFreq) < 0,
    'D2 ⚠⚠ THE TURN RAIL PLAYS THE DETENT TONE (' + JSON.stringify(R.turnSounds) + ') — a detent on the one rail whose detent set is EMPTY BY CONSTRUCTION, which is the second invention contradicted by ear');
  ok(R.turnSounds.length === 0, 'D2 the dial made a sound at all (' + JSON.stringify(R.turnSounds) + ') — a rung that changes nothing announces nothing');
  ok(R.turnSaid.length > 0,
    'D2 ⚠⚠ `saidTurn` IS STILL UNREACHABLE FROM THE RAIL — it was reachable only from the quarter-turn button, so dragging the dial said nothing at all');
  ok(R.lenSounds.length > 0,
    'D2 CONTROL: the stretch rail is silent too, so the dial\'s silence is not about the dial — the fix has muted the instrument');

  /* D5c */
  ok(R.rotAfterHome === 40 && R.rotAfterEnd === 40,
    'D5c ⚠⚠ HOME/END STILL MOVE THE DIAL (40 -> ' + R.rotAfterHome + ' -> ' + R.rotAfterEnd + ') — it was a 200-degree jump, because d was ±1e9 and 2e9 % 360 === 200; and any chosen landing rung asserts that some rotation is special');
  ok(R.kAfterHome === R.kLo && R.kAfterEnd === R.kHi,
    'D5c CONTROL: Home/End no longer reach the ends of the stretch ladder (' + R.kAfterHome + '/' + R.kAfterEnd + ' against ' + R.kLo + '/' + R.kHi + ') — the ring declines them, the ladders must not');

  /* D10 */
  ok(R.labelWritesOnRotation === 0,
    'D10 ⚠⚠ THE PANE LABEL IS REWRITTEN ON A PURE ROTATION (' + R.labelWritesOnRotation + ' writes over 6 arrow presses) — a screen reader re-reads the whole description on every press of the control that by theorem changes nothing');
  ok(R.labelWritesOnForm > 0,
    'D10 CONTROL: a FORM change does not rewrite the label either — the guard is not caching, it is switched off');

  /* D3 */
  ok(!!R.labelNoKept && !!R.labelWithKept, 'D3 non-vacuity: the pane label is empty, so nothing about it can be asserted');
  ok(R.keptTaken === true, 'D3 non-vacuity: keeping a shape did not take one, so the label below describes nothing');
  ok(R.labelWithKept !== R.labelNoKept, 'D3 the pane says the same thing with two shapes on it as with one');
  ok(!!R.keptTagSentence && !!R.liveTagSentence && R.keptTagSentence !== R.liveTagSentence,
    'D3 non-vacuity: the kept and live tag sentences are the same string, so finding one in the label proves nothing');
  ok(!!R.keptTagSentence && R.labelWithKept.indexOf(R.keptTagSentence) >= 0,
    'D3 ⚠⚠ THE KEPT SHAPE\'S OWN TAGS ARE ANNOUNCED NOWHERE — the label is ' + JSON.stringify(R.labelWithKept) + ' and the kept shape\'s tag state is ' + JSON.stringify(R.keptTagSentence) + '. The simultaneous array is the one mechanism in this tool with an effect size, and it was sighted-only');
  ok(R.labelWithKept.indexOf(R.keptShapeWord) >= 0 && R.labelWithKept.indexOf(R.liveShapeWord) >= 0,
    'D3 the label does not carry BOTH shapes\' side counts (' + JSON.stringify(R.labelWithKept) + ')');

  /* D3b */
  ok(R.keptSurvivesDeal === true,
    'D3b ⚠⚠ DEALING STILL DESTROYS THE KEPT SHAPE SILENTLY — no announcement on any channel, on the control a child presses most');
  ok(R.keptSurvivesReset === true, 'D3b reset still destroys the kept shape silently');
  ok(R.keptSurvivesSettings === true, 'D3b a settings change still destroys the kept shape silently');
  ok(R.dropStillWorks === true,
    'D3b CONTROL: the kept shape can no longer be put away — "survives" has become "stuck", which is a worse defect than the one being fixed');

  /* D5a */
  ok(R.printRefusalSaid.length > 0,
    'D5a ⚠⚠ THE PRINT REFUSAL SAYS NOTHING — a 3px nudge and a beep, on the refusal a free visitor is by far the most likely to meet');
  ok(R.keepRefusalSaid.length > 0, 'D5a the keep refusal lost its sentence');

  return { pass, fails };
}

/* ---------------------------------------------------------------- */
(async function () {
  const srv = http.createServer((q, s) => {
    const f = path.join(ROOT, q.url.split('?')[0].replace(/^\/mini-tools/, ''));
    fs.readFile(f, (e, d) => {
      if (e) { s.writeHead(404); s.end(); }
      else { s.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'text/plain' }); s.end(d); }
    });
  });
  await new Promise(r => srv.listen(PORT, r));
  const browser = await pup.launch({ headless: 'new', args: ['--no-sandbox'] });

  const run = async function (poison) {
    const p = await browser.newPage();
    await p.setViewport({ width: 900, height: 900 });
    const errs = [];
    p.on('pageerror', e => errs.push(String(e)));
    await p.goto('http://localhost:' + PORT + '/shape-stretcher.html', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));
    const rec = await p.evaluate(PROBE, poison || '');
    await p.close();
    if (errs.length && !rec.err) rec.err = 'page error: ' + errs[0];
    return rec;
  };

  let exit = 0;
  const r = judge(await run(''));
  console.log('\n' + (r.fails.length ? 'FAIL' : 'PASS') + '  ' + r.pass + ' assertions, ' + r.fails.length + ' failures');
  r.fails.forEach(f => console.log('  x ' + f));
  if (r.fails.length) exit = 1;

  if (POISON) {
    /* ⭐ POISON EVERY ASSERTION, NOT JUST THE FIRST. Each case disables
       exactly one fixed defect on the LIVE object and must fire its own
       named assertion — the obvious single poison short-circuits at the
       first check and leaves the rest never observed failing. */
    const CASES = [
      ['D2 detent tone back on the dial', function () { window.ShapeStretcher._turned = function () { this._snd(this.GEO.SND_DETENT); this._paint(this.GEO.T_TURN); }; }, 'D2 '],
      ['D5c Home/End back to ±1e9', function () { var T = window.ShapeStretcher, s = T._step; T._step = function (k, d) { if (d === 'lo') d = -1e9; if (d === 'hi') d = 1e9; if (typeof d === 'string') return; var r = T._range(k), c = T.st[r.get]; var v = k === 'turn' ? ((c + d * r.step) % 360 + 360) % 360 : Math.min(r.hi, Math.max(r.lo, c + d * r.step)); T._apply(k, v); }; }, 'D5c '],
      ['D3 the kept shape unannounced again', function () { var T = window.ShapeStretcher; T._tagKey = function () { return 'ariaKept'; }; }, 'D3 '],
      ['D3b dealing destroys the kept shape', function () { var T = window.ShapeStretcher; T._deal = function () { this.st = this.newState(this.api.settings.sides); this._paint(); }; }, 'D3b '],
      ['D5a the print refusal goes wordless', function () { var T = window.ShapeStretcher, r = T._refuse; T._refuse = function (w) { if (w === 'print') { this._snd(this.GEO.SND_REFUSE, true); return; } return r.call(this, w); }; }, 'D5a '],
      ['D9 the dial announces its degrees again', function () { var T = window.ShapeStretcher, p = T._paint; T._paint = function (d) { p.call(this, d); var el = document.querySelector('.shp-track-turn .shp-rail'); if (el) el.setAttribute('aria-valuenow', String(this.st.rot)); }; }, 'D9 '],
      ['D10 the label rebuilt on every paint', function () { var T = window.ShapeStretcher, p = T._paint; T._paint = function (d) { this._sig = null; p.call(this, d); }; }, 'D10 '],
      ['D11 the caption stops being live', function () { var T = window.ShapeStretcher, b = T._build; T._build = function () { b.call(this); document.querySelector('.shp-say').removeAttribute('aria-live'); }; T.render(); }, 'D11 ']
    ];
    console.log('\n--- poison ---');
    for (const c of CASES) {
      const p = await browser.newPage();
      await p.setViewport({ width: 900, height: 900 });
      await p.goto('http://localhost:' + PORT + '/shape-stretcher.html', { waitUntil: 'networkidle2' });
      await new Promise(r2 => setTimeout(r2, 600));
      await p.evaluate(c[1]);
      const rec = await p.evaluate(PROBE, '');
      await p.close();
      const jr = judge(rec);
      const hit = jr.fails.some(f => f.indexOf(c[2]) === 0);
      console.log((hit ? '  ok    ' : '  ⚠⚠  ') + c[0].padEnd(40) + (hit ? 'FIRED' : 'SURVIVED — the assertion for ' + c[2].trim() + ' cannot fail'));
      if (!hit) exit = 1;
    }
  }

  await browser.close();
  srv.close();
  process.exit(exit);
})().catch(e => { console.error(e); process.exit(1); });
