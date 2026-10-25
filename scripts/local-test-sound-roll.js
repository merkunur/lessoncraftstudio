#!/usr/bin/env node
/* =====================================================================
   local-test-sound-roll.js — ACTIVITY #109, The Sound Roll, in a real
   browser with real pointer and key actions (the punch is TAPPED for a
   round hole and HELD past the stretch mark for a long slot, holes are
   tapped shut, the crank and Check are clicked, pictures tapped), in
   every shipped locale (en de nl sv da no fi).
   Scenarios per locale (at 1024):
     · Long or short (not fi): an empty Check → hintEmpty, no miss; a held
       punch makes a slot, a tap a round hole; all three wrong → Check →
       the word's rolls slide under, gold / coral, hintLos; miss 2 →
       hintLos2; a new punch takes the help away; a vowel hole tapped
       shut; right → the success line, the song book gains three cards;
       letters shown → letters under the holes at rest;
     · Count (not sv): one hole per letter → hintCount; miss 2; a hole
       tapped shut → ok (length never judged: one hole held long);
     · Blend: the crank before a pick plays the roll → hintPick, no miss;
       the wrong picture → hintBlend, ringed; the right one → the line;
     · the keyboard: Enter / Shift+Enter on the punch; the clue list (fi
       has no Long or short, sv no Count).
   Then every clue × round of set A at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, pictures
   ≥ 64 px (≥ 96 from 704), nothing outside the card, no bands overlap.
   Usage: node scripts/local-test-sound-roll.js [--widths=…] [--locales=…] [--clues=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const CLUES = arg('clues', 'los,count,blend').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '109-sound-roll', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'sound-roll-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, SoundRollCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'sound-roll-activity.js'), 'utf8') + '\n;this.__A = SoundRollActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/sound-roll-activity.html?activity=stretch-giraffe.long-short-vowel.rf-1-2-a&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SoundRollActivity && window.SoundRollActivity.st && document.querySelector('.sr-foot'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.SoundRollActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* the test seam: clue + letters, then set A round r started fresh */
  async function force(page, clue, r, set) {
    await page.evaluate((clue, r, set) => { const a = window.SoundRollActivity; a.api.settings.clue = clue; a.api.settings.letters = (set && set.letters) || 'hidden'; a._pool = null; a._ensurePool(); a._set = 0; a._pos = [0, 1, 2, 0, 1, 2, 0, 1, 2]; a._start(r, r); a._render2(); window.scrollTo(0, 0); }, clue, r, set || null);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.SoundRollActivity.st, v = window.SoundRollActivity._view; return { clue: s.clue, words: s.words.slice(), rolls: s.rolls ? s.rolls.slice() : null, holes: s.holes ? s.holes.slice() : null, picked: s.picked, right: s.right, misses: s.misses, show: s.show, done: s.done, master: !!v.master }; });
  const note = (page) => page.evaluate(() => document.querySelector('.sr-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(15); return true;
  }
  /* a real press on the punch: a tap, or a hold past the stretch mark */
  async function punch(page, i, long, tag) {
    const b = await centre(page, K('punch-' + i)); if (!b) { is(false, `${tag}: punch ${i}`); return; }
    await page.mouse.move(b.x, b.y); await page.mouse.down(); await wait(long ? 540 : 60); await page.mouse.up(); await wait(20);
  }
  const check = (page, tag) => click(page, K('check'), tag);
  const wantLos = (loc, r) => C.DATA.los[loc][0][r].map(id => C.word(loc, id).long ? 'long' : 'round');

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    const have = C.clues(loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.SoundRollActivity.settings[0].options.map(o => o.value))) === JSON.stringify(have), `${loc}: the clue list offers ${have.join(', ')}`);
    if (have.includes('los')) {
      tag = `${loc} long or short`; await force(page, 'los', 3);
      is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tLos')), `${tag}: the task line`);
      is(await count(page, '.sr-let') === 0 && await count(page, '.sr-hole.is-empty') === 3, `${tag}: no letters at rest, three empty vowel places`);
      await check(page, tag); s = await st(page);
      is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → hintEmpty, no miss`);
      const want = wantLos(loc, 3);
      await punch(page, 0, true, tag); s = await st(page); is(s.rolls[0] === 'long' && await count(page, '[data-roll="0"] .sr-hole.is-long') === 1, `${tag}: a held punch makes a long slot`);
      await punch(page, 1, false, tag); s = await st(page); is(s.rolls[1] === 'round', `${tag}: a tap makes a round hole`);
      for (let i = 0; i < 3; i++) await punch(page, i, want[i] !== 'long', tag);
      await check(page, tag); s = await st(page);
      is(s.misses === 1 && s.master && sp(await note(page)) === sp(T(loc, 'hintLos')), `${tag}: all three wrong → hintLos, the word's rolls`);
      is(await count(page, '.sr-masterroll') === 3 && await count(page, '.sr-hole.is-coral') === 3, `${tag}: three coral vowel holes over the word's rolls`);
      await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintLos2')), `${tag}: miss 2 → hintLos2`);
      await punch(page, 0, want[0] === 'long', tag); s = await st(page);
      is(!s.master && await count(page, '.sr-masterroll') === 0 && sp(await note(page)) === '', `${tag}: a new punch takes the help away`);
      await click(page, '[data-roll="1"] .sr-hole:not(.is-pre)', tag); s = await st(page); is(s.rolls[1] === null, `${tag}: a tap closes the vowel hole`);
      const book0 = await count(page, '.sr-card');
      for (let i = 1; i < 3; i++) await punch(page, i, want[i] === 'long', tag);
      await check(page, tag); s = await st(page);
      const longs = want.filter(x => x === 'long').length;
      is(s.done && sp(await note(page)) === sp(T(loc, longs === 3 ? 'okLos3L' : longs === 0 ? 'okLos3S' : 'okLosMix')), `${tag}: right → the success line`);
      is(await count(page, '.sr-card') === book0 + 3, `${tag}: three cards in the song book`);
      await force(page, 'los', 0, { letters: 'shown' }); is(await count(page, '.sr-let') >= 6, `${tag}: letters shown at rest`);
      await force(page, 'los', 0); await page.evaluate(() => document.querySelector('[data-k="punch-0"]').focus());
      await page.keyboard.down('Shift'); await page.keyboard.press('Enter'); await page.keyboard.up('Shift'); s = await st(page); is(s.rolls[0] === 'long', `${tag}: Shift+Enter on the punch → a slot`);
      await page.keyboard.press('Enter'); s = await st(page); is(s.rolls[0] === 'round', `${tag}: Enter → a round hole`);
    }
    if (have.includes('count')) {
      tag = `${loc} count`; const r = C.DATA.count[loc][0].findIndex(id => C.word(loc, id).boxes.length >= 3); await force(page, 'count', r);
      const n = C.word(loc, C.DATA.count[loc][0][r]).boxes.length;
      is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tCount')), `${tag}: the task line`);
      await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty roll → hintEmpty`);
      for (let k = 0; k <= n; k++) await punch(page, 0, false, tag);
      await check(page, tag); s = await st(page); is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintCount')) && await count(page, '.sr-masterroll') === 1, `${tag}: one hole too many → hintCount, the word's roll`);
      await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintCount2')), `${tag}: miss 2 → hintCount2`);
      await click(page, '[data-roll="0"] .sr-hole[data-h="' + n + '"]', tag); s = await st(page); is(s.holes.length === n && !s.master, `${tag}: a hole tapped shut, the help gone`);
      await click(page, '[data-roll="0"] .sr-hole[data-h="0"]', tag); await punch(page, 0, true, tag); s = await st(page); is(s.holes.length === n && s.holes.includes('long'), `${tag}: one hole held long`);
      await check(page, tag); s = await st(page);
      is(s.done && sp(await note(page)) === sp(T(loc, 'okCount', { word: C.word(loc, C.DATA.count[loc][0][r]).display, n })), `${tag}: ${n} holes (length not judged) → the success line`);
    }
    tag = `${loc} blend`; await force(page, 'blend', 1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tBlend')), `${tag}: the task line`);
    is(await count(page, '.sr-rollb .sr-let') >= 2, `${tag}: a lettered roll`);
    await click(page, K('crank'), tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintPick')), `${tag}: the crank before a pick plays the roll → hintPick, no miss`);
    s = await st(page); const wrong = (s.right + 1) % 3;
    await click(page, K('choice-' + wrong), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintBlend')) && await count(page, '.sr-choice.is-wrong') === 1, `${tag}: the wrong picture → hintBlend, ringed coral`);
    await click(page, K('choice-' + s.right), tag); is(await count(page, '.sr-choice.is-wrong') === 0, `${tag}: a new pick clears the ring`);
    await check(page, tag); s = await st(page);
    const m = C.master(loc, C.DATA.blend[loc][1][0]);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBlend', { sounds: m.holes.map(h => h.g).join('–') + (m.ghost ? '(' + m.ghost + ')' : ''), word: C.word(loc, C.DATA.blend[loc][1][0]).display })), `${tag}: the right picture → the line`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every clue × round at rest, at miss 2 and solved — reached ONCE per locale by real actions, then resized ---- */
  async function reach(page, loc, clue, r, state, tag) {
    if (state === 'rest') return;
    if (clue === 'los') { const want = wantLos(loc, r); for (let i = 0; i < 3; i++) await punch(page, i, state === 'solved' ? want[i] === 'long' : want[i] !== 'long', tag); }
    else if (clue === 'count') { const n = C.word(loc, C.DATA.count[loc][0][r]).boxes.length; for (let k = 0; k < (state === 'solved' ? n : n + 1); k++) await punch(page, 0, false, tag); }
    else { const s = await st(page); await click(page, K('choice-' + (state === 'solved' ? s.right : (s.right + 1) % 3)), tag); }
    await check(page, tag); if (state === 'miss2') await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, W = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.sr-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.sr-pic img').forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 63.5 || (W >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.sr-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.sr-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.sr-wrap')).getBoundingClientRect();
    document.querySelectorAll('.sr-pic,.sr-roll,.sr-punch,.sr-box,.sr-check,.sr-crank').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.sr-book', '.sr-stage', '.sr-foot', '.sr-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const clue of CLUES.filter(c => C.clues(loc).includes(c))) for (const r of C.ids()) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${clue} #${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, clue, r);
      await reach(page, loc, clue, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${clue} #${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.SoundRollActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(40);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.sr-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${clue}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-sound-roll: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
