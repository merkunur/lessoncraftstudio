#!/usr/bin/env node
/* =====================================================================
   local-test-pronoun-prism.js — ACTIVITY #124, The Pronoun Prism (The
   Borrowed Hat, L.1.1.d), in a real browser with real pointer actions
   (prisms tapped into the gap, the turn button, the gap tapped to take
   the prism out, names tapped, cards and bins tapped, Check clicked), in
   all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (de/it/nl five levels, the rest six; marks shown /
       words only);
     · level 1: the referent block, an empty gap, three prisms; an empty
       Check → the empty hint, no miss; the wrong person → its hint, the
       block pings, the arrow drops; Check again → the right prism glows
       with the wanted face mark; the right person on a wrong face → the
       job hint; turned to the right face → solved, the arrow lands, a
       hat in the window;
     · level 2: the compound trap (the done-to face where the doer is
       wanted) → the cover hint, the other name lifts;
     · level 3: the sentence with the name shown above, the name marked;
     · level 4: a wrong name tied → its hint; the right names → solved,
       the threads drawn;
     · level 5: cards in the wrong bins → they come back; the right bins;
     · level 6 (where it exists): the owner word on its own;
     · "words only" hides the face marks.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, the hint and the success
   line in view, controls ≥ 44 px, words inside their prisms and cards,
   everything inside the card, no text cut off.
   Usage: node scripts/local-test-pronoun-prism.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '124-pronoun-prism', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'pronoun-prism-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, PronounPrismCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'pronoun-prism-activity.js'), 'utf8') + '\n;this.__A = window.PronounPrismActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 120) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/pronoun-prism-activity.html?activity=pronoun.case.l-1-1-d&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PronounPrismActivity && window.PronounPrismActivity.st && document.querySelector('.vp-hand'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.PronounPrismActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, marks) {
    const ok = await page.evaluate((lvl, r, marks) => {
      const a = window.PronounPrismActivity; a.api.settings.level = lvl; a.api.settings.marks = marks || 'show'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, marks);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.PronounPrismActivity.st; return { r: s.r, lvl: s.lvl, placed: s.placed, face: s.face, tied: s.tied, at: s.at, sel: s.sel, misses: s.misses, show: s.show, last: s.last, reason: s.reason, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.vp-note').textContent);
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
  /* real actions per kind */
  async function prismTo(page, p, face, tag) {
    const s = await st(page); if (s.placed !== p) await click(page, K('prism-' + p), tag);
    for (let g = 0; g < 3; g++) { const s2 = await st(page); if (s2.face[p] === face) return; await click(page, K('turn'), tag); }
  }
  async function tieNames(page, rd, names, tag) { for (const n of names) { const i = rd.names.indexOf(n); await click(page, K('name-' + i), tag); } }
  async function sortAll(page, rd, binOf, tag) {
    for (let i = 0; i < rd.cards.length; i++) { const s = await st(page); if (s.at[i] != null) continue; if (s.sel !== i) await click(page, K('card-' + i), tag); await click(page, K('bin-' + binOf(rd.cards[i], i)), tag); }
  }
  /* bring a round to a state by real actions */
  async function reach(page, rd, state, tag) {
    if (state === 'rest') return true;
    if (rd.kind === 'prism') {
      if (state === 'solved') { await prismTo(page, rd.person, rd.ji, tag); await check(page, tag); return true; }
      const wrong = rd.tray.find(p => p !== rd.person); await prismTo(page, wrong, 0, tag); await check(page, tag); await check(page, tag); return true;
    }
    if (rd.kind === 'thread') {
      if (state === 'solved') { await tieNames(page, rd, rd.ans, tag); await check(page, tag); return true; }
      const other = rd.names.find(n => rd.ans.indexOf(n) < 0); if (!other) return false;
      await tieNames(page, rd, [other], tag); await check(page, tag); await check(page, tag); return true;
    }
    const bins = rd.bins.map(b => b.b);
    if (state === 'solved') { await sortAll(page, rd, c => c.b, tag); await check(page, tag); return true; }
    const wrongBin = c => bins.find(b => b !== c.b);
    await sortAll(page, rd, wrongBin, tag); await check(page, tag); await sortAll(page, rd, wrongBin, tag); await check(page, tag); return true;
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    const L = C.levels(loc);
    is(JSON.stringify(await page.evaluate(() => window.PronounPrismActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === JSON.stringify(['level:' + L.join('/'), 'marks:show/words']), `${loc}: the settings`);
    /* level 1 */
    const r1 = C.rounds().find(r => { const rd = C.round(loc, '1', r); return rd.ji === 1 || rd.ji === 2; }), rd = C.round(loc, '1', r1);
    tag = `${loc} L1.${r1 + 1}`; await force(page, '1', r1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 't1')), `${tag}: the task line`);
    is(sp(await text(page, '.vp-ref')) === sp(rd.ref.replace(/^★ \+ /, '+')) && await count(page, '.vp-gap') === 1 && await count(page, '.vp-prism') === 3, `${tag}: the referent block, an empty gap, three prisms`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → the empty hint, no miss`);
    const wrongP = rd.tray.find(p => p !== rd.person);
    await prismTo(page, wrongP, rd.ji, tag); await check(page, tag); s = await st(page);
    const why = C.COUNT[wrongP] !== C.COUNT[rd.person] ? 'missCount' : 'missWho';
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, why)) && await count(page, '.vp-ref.is-ping') === 1 && await count(page, '.vp-arrow.is-bad,.vp-string.is-bad') === 1, `${tag}: the wrong person → «${sp(await note(page))}», the block pings, the arrow drops`);
    await check(page, tag); is(await count(page, '.vp-prism.is-glow') === 1 && await count(page, K('prism-' + rd.person) + '.is-glow') === 1 && await count(page, '.vp-want') === 1 && sp(await note(page)) === sp(T(loc, 'missGlow')), `${tag}: miss 2 → the right prism glows, the wanted mark shows`);
    await force(page, '1', r1); await prismTo(page, rd.person, 0, tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, ['missDoer', 'missObj', 'missOwn'][rd.ji])), `${tag}: the right person on the doer face → the job hint`);
    await click(page, K('gap'), tag); s = await st(page); is(s.placed === null && await count(page, '.vp-gap') === 1, `${tag}: the gap tapped → the prism comes out`);
    await prismTo(page, rd.person, rd.ji, tag); await check(page, tag); s = await st(page);
    const w = C.rightWord(rd);
    is(s.done && sp(await note(page)) === sp(T(loc, C.okKey(rd), { s: C.filled(rd, w).replace(/[.!]$/, ''), W: w.toLocaleUpperCase(loc) })) && await count(page, '.vp-gapbox.is-ok') === 1 && await count(page, '.vp-arrow.is-ok,.vp-string.is-ok') === 1 && await count(page, '.vp-hat.on') === 1, `${tag}: solved → the success line, the arrow lands, a hat`);
    /* level 2: the compound trap */
    const rc = C.rounds().find(r => { const x = C.round(loc, '2', r); return x.comp && x.ji === 0; });
    if (rc != null) { tag = `${loc} L2.${rc + 1} compound`; const xr = C.round(loc, '2', rc); await force(page, '2', rc); await prismTo(page, xr.person, 1, tag); await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'missCover')) && await count(page, '.vp-comp.is-lift') === 1, `${tag}: the done-to face → cover the other name; it lifts`); }
    /* level 3 */
    const x3 = C.round(loc, '3', 0); await force(page, '3', 0);
    is(await count(page, '.vp-orig') === 1 && sp(await text(page, '.vp-oname')).toLowerCase() === sp(x3.ref).toLowerCase(), `${loc} L3: the sentence with the name, the name marked`);
    /* level 4 */
    const t4 = C.rounds().find(r => { const x = C.round(loc, '4', r); return x.names.some(n => x.ans.indexOf(n) < 0); }), x4 = C.round(loc, '4', t4); tag = `${loc} L4.${t4 + 1}`;
    await force(page, '4', t4); await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintTie')), `${tag}: nothing tied → the tie hint`);
    await tieNames(page, x4, [x4.names.find(n => x4.ans.indexOf(n) < 0)], tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && [T(loc, 'missRings'), T(loc, 'missTwho')].map(sp).indexOf(sp(await note(page))) >= 0, `${tag}: a wrong name → «${sp(await note(page))}»`);
    await tieNames(page, x4, [x4.names.find(n => x4.ans.indexOf(n) < 0)], tag); await tieNames(page, x4, x4.ans, tag); is(await count(page, '.vp-thread.is-tie') === x4.ans.length, `${tag}: one thread per tied name`);
    await check(page, tag); s = await st(page); is(s.done && sp(await note(page)) === sp(T(loc, 'okThread', { W: x4.pro.toLocaleUpperCase(loc), names: x4.ans.join(' + ') })), `${tag}: the right names → solved`);
    /* level 5 */
    const x5 = C.round(loc, '5', 0); tag = `${loc} L5.1`; await force(page, '5', 0);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintSort')), `${tag}: cards on the shelf → the sort hint, no miss`);
    const bins = x5.bins.map(b => b.b);
    await sortAll(page, x5, c => bins.find(b => b !== c.b), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.at.every(x => x === null) && await count(page, '.vp-cards .vp-card') === 3 && sp(await note(page)) === sp(T(loc, 'missSort')), `${tag}: the wrong bins → the cards come back`);
    await sortAll(page, x5, c => c.b, tag); await check(page, tag); s = await st(page); is(s.done && await count(page, '.vp-bin .vp-card.is-ok') === 3, `${tag}: the right bins → solved`);
    /* level 6 */
    if (L.indexOf('6') >= 0) { const x6 = C.round(loc, '6', 0); tag = `${loc} L6.1`; await force(page, '6', 0); await prismTo(page, x6.person, 2, tag); is(sp(await text(page, '.vp-gw span')) === sp(C.rightWord(x6)), `${tag}: the owner face shows the word on its own («${C.rightWord(x6)}»)`); await check(page, tag); is((await st(page)).done, `${tag}: solved`); }
    await force(page, '1', r1, 'words'); is(await count(page, '.vp-mk') === 0, `${loc}: "words only" hides the face marks`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.vp-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.vp-check').getBoundingClientRect(); out.cBottom = ck.bottom;
    const nr = document.querySelector('.vp-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.vp-wrap')).getBoundingClientRect();
    document.querySelectorAll('.vp-stage,.vp-prism,.vp-check,.vp-bin,.vp-card,.vp-strip,.vp-ref').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    document.querySelectorAll('.vp-prism').forEach(p => { const q = p.getBoundingClientRect(); p.querySelectorAll('.vp-face b').forEach(b => { const r = b.getBoundingClientRect(); if (r.left < q.left - 1 || r.right > q.right + 1) out.fails.push('a word wider than its prism'); }); });
    const band = ['.vp-window', '.vp-stage', '.vp-hand', '.vp-foot', '.vp-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.vp-words,.vp-note,.vp-ref,.vp-s1,.vp-s2,.vp-card,.vp-binhead,.vp-orig').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lvl of C.levels(loc)) for (const r of C.rounds()) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} L${lvl}.${r + 1} ${state}`, rd = C.round(loc, lvl, r);
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r);
      const reached = await reach(page, rd, state, t0);
      if (!reached) continue;
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} L${lvl}.${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.PronounPrismActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.vp-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the ${state === 'solved' ? 'success line' : 'hint'} in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r % 4 === 0) await page.screenshot({ path: path.join(SHOT_DIR, `L${lvl}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-pronoun-prism: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
