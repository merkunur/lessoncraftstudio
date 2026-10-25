#!/usr/bin/env node
/* =====================================================================
   local-test-reach-back-e.js — ACTIVITY #111, The Reach-Back e, in a real
   browser with real pointer and key actions (tray tiles TAPPED and DRAGGED
   onto their sockets, sockets tapped to hand a tile back, pictures tapped,
   Check clicked). en only.
   Scenarios (at 1024):
     · Finish: the settings; an empty Check → hintEmpty, no miss; the e on
       an empty rail → the arm's hand waits; a vowel arrives → the coin
       shows its name face; a wrong vowel → hintVowel, the socket rings;
       miss 2 → hintVowel2; the right vowel takes the help away; the e
       taken off → the short face, put back → the name face; Check → the
       line, the tag on the picture, a tag on the washing line;
     · an e on a short word → hintExtra; miss 2 → the teal badge; the e
       taken off → the badge gone; Check → the line;
     · no e on a long word → hintMissing; miss 2 → the gold badge;
     · drags: a vowel and the e dragged onto their sockets;
     · Vowel given: the vowel seated; the decoy on the end → hintEnd;
     · Read and find: a tap on the e replays its reach (no state change);
       a wrong picture → hintRead, then hintRead2; the right one → the line;
     · the keyboard: Enter on a tile places it.
   Then every round (both Finish sets, Read) at rest, at miss 2 and solved
   — reached ONCE by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, pictures
   ≥ 64 px (≥ 96 from 704), nothing outside the card, no bands overlap, the
   arm's hand over the vowel socket.
   Usage: node scripts/local-test-reach-back-e.js [--widths=…] [--clues=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const CLUES = arg('clues', 'finish,read').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '111-reach-back-e', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'reach-back-e-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, ReachBackECore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'reach-back-e-activity.js'), 'utf8') + '\n;this.__A = ReachBackEActivity;', ctx); return ctx.__A; })();
const T = (k, a) => String(ACT.strings[k].en).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
const IDX = (set, w) => C.FINISH[set].findIndex(x => x[0] === w);
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/reach-back-e-activity.html?activity=cvc-builder.build-magic-e.rf-1-3-silent-e&lang=en&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.ReachBackEActivity && window.ReachBackEActivity.st && document.querySelector('.rb-foot'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.ReachBackEActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* the seam: clue + vowel mode + set, a round started fresh with the e tile in slot 1 and the right vowel first */
  async function force(page, clue, set, r, vowel) {
    await page.evaluate((clue, set, r, vowel) => { const a = window.ReachBackEActivity; a.api.settings.clue = clue; a.api.settings.vowel = vowel || 'pick'; a._pool = null; a._ensurePool(); a._set = set; a._pos = [1, 0, 2, 1, 0, 2, 1, 0, 2]; a._vFirst = [true, false, true, false, true, false, true, false, true]; a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0); }, clue, set, r, vowel || 'pick');
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.ReachBackEActivity.st; return { clue: s.clue, word: s.word, vowel: s.vowel, end: s.end, picked: s.picked, right: s.right, misses: s.misses, show: s.show, done: s.done, last: s.last }; });
  const note = (page) => page.evaluate(() => document.querySelector('.rb-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(20); return true;
  }
  const tile = (page, kind, c) => page.evaluate((kind, c) => window.ReachBackEActivity.st.tray.findIndex(t => t.k === kind && (c == null || t.c === c)), kind, c);
  const tapTile = async (page, kind, c, tag) => click(page, K('tile-' + await tile(page, kind, c)), tag);
  async function drag(page, fromSel, toSel, tag) {
    await page.evaluate(() => window.scrollTo(0, Math.max(0, document.querySelector('.rb-railbox').getBoundingClientRect().top + window.scrollY - 200))); await wait(15);
    const pos = (s) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, s);
    const a = await pos(fromSel), b = await pos(toSel); if (!a || !b) { is(false, `${tag}: drag ${fromSel} → ${toSel}`); return; }
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8); await wait(8); }
    await page.mouse.up(); await wait(40);
  }
  const check = (page, tag) => click(page, K('check'), tag);
  const coin = (page) => page.evaluate(() => { const c = document.querySelector('[data-k="vsock"] .rb-coin'); return c ? (c.classList.contains('is-name') ? 'name' : 'short') : null; });

  {
    const { page, errs } = await open(1024); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.ReachBackEActivity.settings.map(f => f.key + ':' + f.options.map(o => o.value).join('/')))) === JSON.stringify(['clue:finish/read', 'vowel:pick/given']), 'the settings: Clue (Finish / Read), Vowel (Pick / Given)');
    is(sp(await note(page)) === sp(T('nudge')), 'the first round greets with the nudge');
    /* kite */
    tag = 'kite'; await force(page, 'finish', 0, IDX(0, 'kite'));
    is(sp(await prompt(page)) === sp(T('tFinish')), `${tag}: the task line`);
    is(await count(page, '.rb-badge.is-name,.rb-badge.is-short') === 0 && await count(page, '.rb-arm') === 0, `${tag}: no badge and no arm at rest`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T('hintEmpty')), `${tag}: an empty Check → hintEmpty, no miss`);
    await tapTile(page, 'e', null, tag); s = await st(page); is(s.end === 'e' && await count(page, '.rb-arm.is-wait') === 1, `${tag}: the e on → the arm's hand waits over the empty socket`);
    await tapTile(page, 'v', 'u', tag); is(await coin(page) === 'name' && await count(page, '.rb-arm.is-tap') === 1, `${tag}: a vowel arrives → the arm taps it, the name face`);
    await check(page, tag); s = await st(page); is(s.last === 'vowel' && sp(await note(page)) === sp(T('hintVowel')) && await count(page, '.rb-sock.is-vowel.is-wrong') === 1, `${tag}: a wrong vowel → hintVowel, the socket rings`);
    await check(page, tag); is(sp(await note(page)) === sp(T('hintVowel2')) && await count(page, '.rb-badge.is-name,.rb-badge.is-short') === 0, `${tag}: miss 2 → hintVowel2, no badge`);
    await tapTile(page, 'v', 'i', tag); s = await st(page); is(s.vowel === 'i' && sp(await note(page)) === '' && await count(page, '.rb-sock.is-wrong') === 0, `${tag}: the right vowel replaces it and takes the help away`);
    await click(page, K('esock'), tag); s = await st(page); is(s.end === null && await coin(page) === 'short' && await count(page, '.rb-arm') === 0, `${tag}: the e taken off → the short face`);
    await tapTile(page, 'e', null, tag); is(await coin(page) === 'name', `${tag}: the e back on → the name face`);
    const line0 = await count(page, '.rb-tag');
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T('okE', { word: 'kite', v: 'i' })) && await count(page, '.rb-wordtag') === 1 && await count(page, '.rb-tag') === line0 + 1, `${tag}: right → the line, the tag, the washing line`);
    /* cap: an e that should not be there */
    tag = 'cap'; await force(page, 'finish', 0, IDX(0, 'cap'));
    await tapTile(page, 'v', 'a', tag); await tapTile(page, 'e', null, tag); await check(page, tag); s = await st(page);
    is(s.last === 'eExtra' && sp(await note(page)) === sp(T('hintExtra')) && await count(page, '.rb-sock.is-end.is-wrong') === 1, `${tag}: an e on a short word → hintExtra, the end socket rings`);
    await check(page, tag); is(sp(await note(page)) === sp(T('hintBadgeShort')) && await count(page, '.rb-badge.is-short') === 1, `${tag}: miss 2 → the teal badge`);
    await click(page, K('esock'), tag); is(await count(page, '.rb-badge.is-short') === 0 && sp(await note(page)) === '', `${tag}: the e taken off → the badge and the hint gone`);
    await check(page, tag); s = await st(page); is(s.done && sp(await note(page)) === sp(T('okNoE', { word: 'cap', v: 'a' })), `${tag}: no e → the line`);
    /* nose: the e missing */
    tag = 'nose'; await force(page, 'finish', 0, IDX(0, 'nose'));
    await tapTile(page, 'v', 'o', tag); await check(page, tag); s = await st(page);
    is(s.last === 'eMissing' && sp(await note(page)) === sp(T('hintMissing')) && await count(page, '.rb-sock.is-end.is-want') === 1, `${tag}: no e on a long word → hintMissing, the end socket glows`);
    await check(page, tag); is(sp(await note(page)) === sp(T('hintBadgeName')) && await count(page, '.rb-badge.is-name') === 1, `${tag}: miss 2 → the gold badge`);
    /* drags: whale */
    tag = 'whale drag'; await force(page, 'finish', 1, IDX(1, 'whale'));
    await drag(page, K('tile-' + await tile(page, 'v', 'a')), K('vsock'), tag);
    await drag(page, K('tile-' + await tile(page, 'e')), K('esock'), tag); s = await st(page);
    is(s.vowel === 'a' && s.end === 'e' && await coin(page) === 'name', `${tag}: a vowel and the e dragged onto their sockets`);
    await drag(page, K('tile-' + await tile(page, 'v', 'o')), K('esock'), tag); s = await st(page); is(s.end === 'e' && s.vowel === 'a', `${tag}: a vowel dropped on the end socket does nothing`);
    await check(page, tag); s = await st(page); is(s.done, `${tag}: whale built by drags`);
    /* Vowel given */
    tag = 'given'; await force(page, 'finish', 0, IDX(0, 'rose'), 'given'); s = await st(page);
    is(s.vowel === 'o' && await count(page, '.rb-tile.is-v') === 0 && await count(page, '.rb-tile') === 2, `${tag}: the vowel seated, the e and a decoy in the tray`);
    await tapTile(page, 'c', null, tag); await check(page, tag); is(sp(await note(page)) === sp(T('hintEnd')), `${tag}: the decoy on the end → hintEnd`);
    await click(page, K('esock'), tag); await tapTile(page, 'e', null, tag); await check(page, tag); s = await st(page); is(s.done, `${tag}: the e → right`);
    /* Read and find */
    tag = 'read'; await force(page, 'read', 0, 0);
    is(sp(await prompt(page)) === sp(T('tRead')) && await count(page, '.rb-choice') === 3 && await count(page, '.rb-arm') === 1, `${tag}: a built rail with its arm, three pictures`);
    const before = await st(page); await click(page, K('esock'), tag); is(JSON.stringify(await st(page)) === JSON.stringify(before), `${tag}: a tap on the e replays its reach and changes nothing`);
    await check(page, tag); is(sp(await note(page)) === sp(T('hintReadEmpty')), `${tag}: no pick → hintReadEmpty`);
    s = await st(page); await click(page, K('choice-' + ((s.right + 1) % 3)), tag); await check(page, tag);
    is(sp(await note(page)) === sp(T('hintRead')) && await count(page, '.rb-choice.is-wrong') === 1, `${tag}: a wrong picture → hintRead, ringed`);
    await check(page, tag); is(sp(await note(page)) === sp(T('hintRead2')), `${tag}: miss 2 → hintRead2`);
    await click(page, K('choice-' + s.right), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T('okRead', { word: 'cape' })), `${tag}: the right picture → the line`);
    /* the keyboard */
    tag = 'keys'; await force(page, 'finish', 0, IDX(0, 'pig'));
    await page.evaluate((k) => document.querySelector(`[data-k="tile-${k}"]`).focus(), await tile(page, 'v', 'i')); await page.keyboard.press('Enter');
    s = await st(page); is(s.vowel === 'i', `${tag}: Enter on a tile places it`);
    is(errs.length === 0, `no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE by real actions, then resized ---- */
  async function reach(page, clue, set, r, state, tag) {
    if (state === 'rest') return;
    if (clue === 'finish') {
      const [w, other] = C.FINISH[set][r], s = C.shape(w);
      if (state === 'solved') { await tapTile(page, 'v', s.vowel, tag); if (s.needsE) await tapTile(page, 'e', null, tag); }
      else await tapTile(page, 'v', other, tag);
    } else { const s = await st(page); await click(page, K('choice-' + (state === 'solved' ? s.right : (s.right + 1) % 3)), tag); }
    await check(page, tag); if (state === 'miss2') await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.rb-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.rb-pic img,.rb-choice img').forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 63.5 || (Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.rb-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.rb-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.rb-wrap')).getBoundingClientRect();
    document.querySelectorAll('.rb-pic,.rb-rail,.rb-tile,.rb-choice,.rb-check,.rb-line').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.rb-line', '.rb-top', '.rb-railbox', '.rb-tray', '.rb-foot', '.rb-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const hand = document.querySelector('.rb-hand'), vs = document.querySelector('[data-k="vsock"]');
    if (hand && vs) { const h = hand.getBoundingClientRect(), v = vs.getBoundingClientRect(), hx = h.left + h.width / 2; if (hx < v.left || hx > v.right || h.top > v.top) out.fails.push('the hand is not over the vowel socket'); }
    const top = document.querySelector('.rb-top').getBoundingClientRect(), arm = document.querySelector('.rb-arm');
    if (arm && top.height > 0) { const a = arm.getBoundingClientRect(); if (a.top < top.bottom - 1) out.fails.push('the arm reaches into the picture'); }
    return out;
  };
  const { page, errs } = await open(WIDTHS[WIDTHS.length - 1]);
  for (const clue of CLUES) for (const set of clue === 'finish' ? [0, 1] : [0]) for (const r of C.rounds(clue, set)) for (const state of ['rest', 'miss2', 'solved']) {
    const w0 = WIDTHS[WIDTHS.length - 1], name = clue === 'finish' ? C.FINISH[set][r][0] : 'read-' + C.READ[r][0], t0 = `${name} ${state}`;
    await page.setViewport({ width: w0, height: VH(w0) });
    await force(page, clue, set, r);
    await reach(page, clue, set, r, state, t0);
    const s0 = await st(page);
    if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real actions (${s0.misses})`);
    if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
    for (const w of WIDTHS) {
      const tag = `@${w} ${name} ${state}`;
      await page.setViewport({ width: w, height: VH(w) });
      await page.waitForFunction(() => { const a = window.ReachBackEActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
      await wait(40);
      is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
      if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
      else await page.evaluate(() => document.querySelector('.rb-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
      await wait(15);
      const m = await page.evaluate(MEASURE);
      is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
      if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
      else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
      else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
      is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
      if (SHOTS && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${clue}-${set}-${r}-${w}-${state}.png`), fullPage: true });
    }
  }
  is(errs.length === 0, `no page errors (${errs.slice(0, 2).join(' | ')})`);
  await page.close();
  await browser.close(); server.close();
  console.log(`local-test-reach-back-e: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
