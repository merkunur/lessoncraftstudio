#!/usr/bin/env node
/* =====================================================================
   local-test-time-frames.js — ACTIVITY #125, Photo, Window, Envelope (The
   Clock Tower, L.1.1.e), in a real browser with real pointer actions
   (cards tapped into the gap, the gap tapped to send a card back, the
   time word and the develop button tapped, photos and windows tapped,
   words tapped, the base form typed on the keyboard, Check clicked), in
   all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (six levels);
     · level 1: the task line, the sentence with an empty gap and its
       cards; an empty Check → the empty hint, no miss; the time word
       tapped → its opening glows; a wrong card + the develop button → the
       card peeks; Check → it bumps against the time word's opening with
       that opening's hint; Check again → the right card glows; the gap
       tapped → the card comes back; the right card → it files in, the
       success line names the sentence;
     · level 1, a split future (de/nl): the second half fills the second gap;
     · level 3: the time word into the gap — a wrong one bumps, the right
       one files;
     · level 4: wrong photos come off, the right ones lock;
     · level 5: another word → its hint; the verb → its base form shows;
     · level 6: the verb, then the base form typed → solved.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, the hint and the success
   line in view, controls ≥ 44 px, everything inside the card, no text cut
   off, no two bands on top of each other.
   Usage: node scripts/local-test-time-frames.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '125-time-frames', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'time-frames-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, TimeFramesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'time-frames-activity.js'), 'utf8') + '\n;this.__A = window.TimeFramesActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 120) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(IMGROOT, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/time-frames-activity.html?activity=tense.past-present-future.l-1-1-e&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TimeFramesActivity && window.TimeFramesActivity.st && document.querySelector('.vt-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.TimeFramesActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r) {
    const ok = await page.evaluate((lvl, r) => {
      const a = window.TimeFramesActivity; a.api.settings.level = lvl; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.TimeFramesActivity.st; return { r: s.r, lvl: s.lvl, gap: s.gap, link: s.link, locked: s.locked, sel: s.sel, found: s.found, typed: s.typed, misses: s.misses, show: s.show, last: s.last, reason: s.reason, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.vt-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const text = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent : null; }, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const check = (page, tag) => click(page, K('check'), tag);
  async function placeAll(page, rd, paneOf, tag) {
    for (let i = 0; i < 3; i++) { const s = await st(page); if (s.link.indexOf(i) >= 0) continue; await click(page, K('photo-' + i), tag); await click(page, K('pane-' + paneOf(i)), tag); }
  }
  async function reach(page, rd, state, tag) {
    if (state === 'rest') return true;
    if (rd.kind === 'pick' || rd.kind === 'time') {
      if (state === 'solved') { await click(page, K('card-' + rd.right), tag); await check(page, tag); return true; }
      const wrong = rd.cards.find(c => c.tense !== rd.right).tense; await click(page, K('card-' + wrong), tag); await check(page, tag); await check(page, tag); return true;
    }
    if (rd.kind === 'pair') {
      const right = (i) => rd.photos[i], wrong = (i) => (rd.photos[i] + 1) % 3;
      if (state === 'solved') { await placeAll(page, rd, right, tag); await check(page, tag); return true; }
      await placeAll(page, rd, wrong, tag); await check(page, tag); await placeAll(page, rd, wrong, tag); await check(page, tag); return true;
    }
    const vi = rd.words.findIndex(w => w.verb), ni = rd.words.findIndex(w => w.w && !w.verb);
    if (state === 'solved') {
      await click(page, K('word-' + vi), tag); await check(page, tag);
      if (rd.kind === 'write') { await page.focus(K('type')); await page.keyboard.type(rd.base, { delay: 5 }); await check(page, tag); }
      return true;
    }
    await click(page, K('word-' + ni), tag); await check(page, tag); await click(page, K('word-' + ni), tag); await click(page, K('word-' + ni), tag); await check(page, tag); return true;
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.TimeFramesActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === JSON.stringify(['level:1/2/3/4/5/6']), `${loc}: the settings`);
    /* level 1: a three-card round */
    const r1 = C.rounds().find(r => { const x = C.round(loc, '1', r); return x.cards.length === Math.max(...C.rounds().map(q => C.round(loc, '1', q).cards.length)); }), rd = C.round(loc, '1', r1);
    tag = `${loc} L1.${r1 + 1}`; await force(page, '1', r1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 't1')), `${tag}: the task line`);
    is(await count(page, '.vt-gap') === 1 && await count(page, '.vt-cardw') === rd.cards.length && await count(page, '.vt-op') === 3 && await count(page, '.vt-pic') === Math.min(2, rd.n), `${tag}: an empty gap, ${rd.cards.length} cards, three openings, the picture`);
    is(sp(await text(page, K('tw'))) === sp(rd.tw), `${tag}: the time word «${rd.tw}»`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → the empty hint, no miss`);
    await click(page, K('tw'), tag); is(await count(page, '.vt-op.op-' + C.OPENING[rd.time] + '.is-glow') === 1, `${tag}: the time word tapped → the ${C.OPENING[rd.time]} glows`);
    const wrong = rd.cards.find(c => c.tense !== rd.right);
    await click(page, K('card-' + wrong.tense), tag); s = await st(page); is(s.gap === wrong.tense && await count(page, K('gap')) === 1, `${tag}: a card tapped → it sits in the gap`);
    await click(page, K('develop'), tag); is(await count(page, '.vt-peek .vt-fr.is-' + C.frame(loc, wrong.tense)) === 1 && (await st(page)).misses === 0, `${tag}: the develop button → the card peeks as a ${C.frame(loc, wrong.tense)}, no miss`);
    await check(page, tag); s = await st(page);
    const op = C.OPENING[rd.time], hk = { album: 'missAlbum', post: 'missPost', window: 'missWindow' }[op];
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, hk)) && await count(page, '.vt-op.op-' + op + ' .vt-fr.is-bump.is-' + C.frame(loc, wrong.tense)) === 1, `${tag}: Check → it bumps against the ${op}; «${sp(await note(page))}»`);
    await check(page, tag); is(await count(page, '.vt-cardw.is-glow') === 1 && await count(page, K('card-' + rd.right) + '.is-glow') === 1 && sp(await note(page)) === sp(T(loc, 'missGlow')), `${tag}: miss 2 → the right card glows`);
    await click(page, K('gap'), tag); s = await st(page); is(s.gap === null && await count(page, '.vt-gap') === 1, `${tag}: the gap tapped → the card comes back`);
    await click(page, K('card-' + rd.right), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, C.okKey(rd), { s: C.filled(rd, rd.right).replace(/[.!]$/, '') })) && await count(page, '.vt-op.op-' + op + ' .vt-fr.is-in.is-' + C.frame(loc, rd.right)) === 1, `${tag}: the right card → it files into the ${op}, the success line`);
    /* a split future */
    const rs = C.rounds().find(r => { const x = C.round(loc, '1', r); const c = C.card(x, 'future'); return x.time === 'future' && !!c && / … /.test(c.w); });
    if (rs != null) { tag = `${loc} L1.${rs + 1} split`; const xs = C.round(loc, '1', rs), pp = C.parts(C.card(xs, 'future').w); await force(page, '1', rs); await click(page, K('card-future'), tag); is(sp(await text(page, K('gap'))) === sp(pp[0]) && sp(await text(page, '.vt-g2')) === sp(pp[1]), `${tag}: «${pp[0]} … ${pp[1]}» fills both gaps`); await check(page, tag); is((await st(page)).done, `${tag}: solved`); }
    /* level 3 */
    const x3 = C.round(loc, '3', 0); tag = `${loc} L3.1`; await force(page, '3', 0);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 't3')) && await count(page, '.vt-cardw') === x3.cards.length, `${tag}: the task line, ${x3.cards.length} time words`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintTime')), `${tag}: an empty Check → the time hint`);
    const w3 = x3.cards.find(c => c.tense !== x3.right);
    await click(page, K('card-' + w3.tense), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, { album: 'missAlbum', post: 'missPost', window: 'missWindow' }[C.OPENING[w3.tense]])), `${tag}: a wrong time word → it bumps («${sp(await note(page))}»)`);
    await click(page, K('card-' + x3.right), tag); await check(page, tag); is((await st(page)).done && await count(page, '.vt-fr.is-in') === 1, `${tag}: the right time word → it files`);
    /* level 4 */
    const x4 = C.round(loc, '4', 0); tag = `${loc} L4.1`; await force(page, '4', 0);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintPair')) && (await st(page)).misses === 0, `${tag}: no photos → the hint, no miss`);
    const st4 = await st(page), photos = await page.evaluate(() => window.TimeFramesActivity.st.rd.photos);
    const rd4 = Object.assign({}, x4, { photos });
    await placeAll(page, rd4, (i) => (photos[i] + 1) % 3, tag); is(await count(page, '.vt-slot .vt-photo') === 3, `${tag}: three photos on windows`);
    await check(page, tag); s = await st(page); is(s.misses === 1 && s.link.every(x => x === null) && await count(page, '.vt-photos .vt-photo') === 3 && sp(await note(page)) === sp(T(loc, 'missPair')), `${tag}: wrong photos come off`);
    await placeAll(page, rd4, (i) => photos[i], tag); await check(page, tag); s = await st(page); is(s.done && await count(page, '.vt-photo.is-locked') === 3, `${tag}: the right photos lock`);
    void st4;
    /* level 5 */
    const x5 = C.round(loc, '5', 0); tag = `${loc} L5.1`; await force(page, '5', 0);
    const vi = x5.words.findIndex(w => w.verb), ni = x5.words.findIndex(w => w.w && !w.verb);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintFind')), `${tag}: no word → the find hint`);
    await click(page, K('word-' + ni), tag); await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'missVerb')) && (await st(page)).misses === 1, `${tag}: another word → its hint`);
    await click(page, K('word-' + ni), tag); await click(page, K('word-' + vi), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await text(page, '.vt-basepane b')) === sp(x5.base) && sp(await note(page)) === sp(T(loc, 'okFind', { W: x5.verb.toLocaleUpperCase(loc), B: x5.base.toLocaleUpperCase(loc) })), `${tag}: the verb → its base form «${x5.base}»`);
    /* level 6 */
    const x6 = C.round(loc, '6', 0); tag = `${loc} L6.1`; await force(page, '6', 0);
    const v6 = x6.words.findIndex(w => w.verb);
    await click(page, K('word-' + v6), tag); await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'foundType')) && await count(page, K('type')) === 1, `${tag}: the verb → write its base form`);
    await page.focus(K('type')); await page.keyboard.type(x6.base + 'q', { delay: 5 }); await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'missSpell')), `${tag}: a wrong spelling → its hint`);
    await page.focus(K('type')); await page.keyboard.press('Backspace'); await check(page, tag); is((await st(page)).done, `${tag}: the base form typed → solved`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.vt-wrap button, .vt-wrap input')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + String(e.className).split(' ')[0] + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.vt-check'); out.cBottom = ck && vis(ck) ? ck.getBoundingClientRect().bottom : 0;
    const nr = document.querySelector('.vt-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.vt-wrap')).getBoundingClientRect();
    document.querySelectorAll('.vt-card,.vt-tray,.vt-cardw,.vt-front,.vt-op,.vt-fr,.vt-check,.vt-pane,.vt-photo,.vt-basepane,.vt-word').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    document.querySelectorAll('.vt-op').forEach(o => { const q = o.getBoundingClientRect(); o.querySelectorAll('.vt-fr').forEach(f => { const r = f.getBoundingClientRect(); if (r.left < q.left - 2 || r.right > q.right + 2) out.fails.push('a frame wider than its opening'); }); });
    const band = ['.vt-card', '.vt-tray', '.vt-front', '.vt-panes', '.vt-photos', '.vt-basepane', '.vt-foot', '.vt-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.vt-cardw,.vt-note,.vt-photo,.vt-pane b,.vt-basepane b,.vt-sent,.vt-fr b').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className || c.tagName).split(' ')[0] + ' text cut off'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lvl of C.levels()) for (const r of C.rounds()) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} L${lvl}.${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r);
      const rd = await page.evaluate(() => { const x = window.TimeFramesActivity.st.rd; return { kind: x.kind, right: x.right, cards: x.cards, photos: x.photos, words: x.words, base: x.base }; });
      if (!(await reach(page, rd, state, t0))) continue;
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} L${lvl}.${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.TimeFramesActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.vt-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom > 0 && m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the ${state === 'solved' ? 'success line' : 'hint'} in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && ['en', 'de', 'fi'].indexOf(loc) >= 0 && [360, 704, 1024].indexOf(w) >= 0 && r % 4 === 0) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-L${lvl}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-time-frames: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
