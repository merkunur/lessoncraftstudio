#!/usr/bin/env node
/* =====================================================================
   local-test-bea-two-bookshelves.js — ACTIVITY #118, The Shaker Shelf
   and the Ribbon Shelf, in a real browser with real pointer actions
   (covers tapped open, the shake knob, the close tab, shelves tapped,
   books on a shelf tapped back, Check clicked), in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (books: ask / topic / fill; pages: closed / open);
     · Bea asks: Bea's ask; an empty Check → the empty hint, no miss; a
       shelf tapped with no book open → hintPick; the other shelf rests; a
       cover opens to its three pages in order; the knob shakes them into
       a new order; close + open → in order again; a book onto the asked
       shelf and back to the desk; the wrong book + Check → the shelf's
       own hint, the book back on the desk; again → hintMiss2, the asked
       book opens by itself with its marks underlined; the close tab takes
       the help away; the right book → the success line naming it, the
       spine band, done;
     · Same topic: the twin of the other kind on the desk; solved;
     · Fill both shelves: four covers, no ask; Check before all are
       shelved → hintEmptyFill; a swapped pair → those two back, the other
       two stay and rest; then all right → okBoth;
     · Inside pages open on the desk: every book's three pages under its
       cover with no tap; a tapped cover gets the shake knob, which shakes
       only that book;
     · the shelves' test animates (not FAST): the open book under test,
       Check waiting, then the result.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, cover
   pictures and Bea ≥ 64 px (covers ≥ 96 from 704), everything inside the
   card, no bands overlapping, no text cut off.
   Usage: node scripts/local-test-bea-two-bookshelves.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '118-shaker-shelf-ribbon-shelf', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'bea-two-bookshelves-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, BeaShelvesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'bea-two-bookshelves-activity.js'), 'utf8') + '\n;this.__A = window.BeaTwoBookshelvesActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
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
    await page.goto(`${base}/bea-two-bookshelves-activity.html?activity=bea-two-bookshelves.story-or-fact.rl-1-5&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.BeaTwoBookshelvesActivity && window.BeaTwoBookshelvesActivity.st && document.querySelector('.bs-foot .bs-check'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.BeaTwoBookshelvesActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* a round of a level, its asked book (or its layout) at a known slot — set through the settings the drawer writes */
  async function force(page, lv, r, slot, pages) {
    const ok = await page.evaluate((lv, r, slot, pages) => {
      const a = window.BeaTwoBookshelvesActivity; a.api.settings.books = lv; a.api.settings.pages = pages || 'closed'; a._pool = null; a._ensurePool();
      a._slots = Array(8).fill(slot); a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0);
      return a.st.level === lv && a.st.r === r;
    }, lv, r, slot, pages);
    if (!ok) throw new Error('force missed ' + lv + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.BeaTwoBookshelvesActivity.st; return { level: s.level, r: s.r, desk: s.desk, ask: s.ask, right: s.right, place: s.place, locked: s.locked, sel: s.sel, shake: s.shake, misses: s.misses, show: s.show, last: s.last, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.bs-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const has = (page, sel) => page.evaluate((s) => !!document.querySelector(s), sel);
  const pagesText = (page, scope) => page.evaluate((sc) => [...document.querySelectorAll(sc + ' .bs-page .bs-s')].map(e => e.textContent), scope || '.bs-open');
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  /* a shelf is tapped on its empty top-left corner — its books stand at the bottom, its symbol plate top-right */
  async function tapShelf(page, sh, tag) {
    const b = await page.evaluate((sh) => { const e = document.querySelector('[data-k="shelf-' + sh + '"]'); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + 18, y: r.top + 16, dis: e.disabled }; }, sh);
    if (!b) { is(false, tag + ': there is a shelf ' + sh); return false; }
    if (b.dis) { is(false, tag + ': shelf ' + sh + ' is enabled'); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const kind = (id) => C.DATA.BOOKS[id].kind, shelfOf = (k) => k === 'story' ? 'ribbon' : 'shaker';
  /* put a book on a shelf the way a child does: tap its cover (it opens), then tap the shelf */
  async function shelve(page, id, sh, tag) { await click(page, K('cover-' + id), tag); await tapShelf(page, sh, tag); }
  async function solve(page, tag) {
    const s = await st(page);
    if (s.ask) { await shelve(page, s.right, shelfOf(s.ask), tag); }
    else for (const id of s.desk) await shelve(page, id, shelfOf(kind(id)), tag);
    await click(page, K('check'), tag);
  }
  async function missTwice(page, tag) {
    for (let k = 0; k < 2; k++) {
      const s = await st(page);
      if (s.ask) { await shelve(page, s.desk.find(id => id !== s.right), shelfOf(s.ask), tag); }
      else {
        const sx = s.desk.find(id => kind(id) === 'story' && !s.place[id]), fx = s.desk.find(id => kind(id) === 'fact' && !s.place[id]);
        await shelve(page, sx, 'shaker', tag); await shelve(page, fx, 'ribbon', tag);
        for (const id of s.desk) if (id !== sx && id !== fx && !s.place[id]) await shelve(page, id, shelfOf(kind(id)), tag);
      }
      await click(page, K('check'), tag);
    }
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.BeaTwoBookshelvesActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === '["books:ask/topic/fill","pages:closed/open"]', `${loc}: the settings`);
    /* Bea asks — round 5 asks for a fact book */
    tag = `${loc} ask`; await force(page, 'ask', 4, 1); s = await st(page);
    const askedSh = shelfOf(s.ask), other = askedSh === 'ribbon' ? 'shaker' : 'ribbon', wrong = s.desk.find(id => id !== s.right);
    is(sp(await prompt(page)) === sp(T(loc, 'tAsk')) && sp(await page.evaluate(() => document.querySelector('.bs-ask').textContent)) === sp(T(loc, s.ask === 'story' ? 'askStory' : 'askFact')) && await count(page, '.bs-cover') === 3, `${tag}: the task line, Bea's ask, three covers`);
    await click(page, K('check'), tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, s.ask === 'story' ? 'hintEmptyStory' : 'hintEmptyFact')), `${tag}: an empty Check → the empty hint, no miss`);
    await tapShelf(page, askedSh, tag); is(sp(await note(page)) === sp(T(loc, 'hintPick')), `${tag}: a shelf with no book open → hintPick`);
    is(await page.evaluate((o) => document.querySelector('[data-k="shelf-' + o + '"]').disabled, other), `${tag}: the other shelf rests`);
    await click(page, K('cover-' + wrong), tag); const bw = C.book(loc, wrong);
    is(await count(page, '.bs-open') === 1 && JSON.stringify((await pagesText(page)).map(sp)) === JSON.stringify(bw.p.map(p => sp(p.s))), `${tag}: the cover opens to its three pages, in order`);
    await click(page, K('shake'), tag); s = await st(page); const sh1 = (await pagesText(page)).map(sp);
    is(s.shake && s.shake.join() !== '0,1,2' && JSON.stringify(sh1) === JSON.stringify(s.shake.map(i => sp(bw.p[i].s))), `${tag}: the knob shakes the pages into a new order`);
    await click(page, K('close'), tag); is(await count(page, '.bs-open') === 0 && await count(page, '.bs-cover') === 3, `${tag}: the close tab puts the book back on the desk`);
    await click(page, K('cover-' + wrong), tag); is(JSON.stringify((await pagesText(page)).map(sp)) === JSON.stringify(bw.p.map(p => sp(p.s))), `${tag}: opened again, the pages are in order`);
    await tapShelf(page, askedSh, tag); s = await st(page);
    is(s.place[wrong] === askedSh && await count(page, '.bs-mini') === 1 && await count(page, '.bs-cover') === 2 && s.misses === 0, `${tag}: the book stands on the shelf, nothing tested yet`);
    await click(page, K('mini-' + wrong), tag); s = await st(page); is(!s.place[wrong] && await count(page, '.bs-cover') === 3, `${tag}: a book on the shelf tapped → back to the desk`);
    await shelve(page, wrong, askedSh, tag); await click(page, K('check'), tag); s = await st(page);
    const hk = askedSh === 'shaker' ? 'hintStoryOnShaker' : 'hintFactOnRibbon';
    is(s.misses === 1 && !s.place[wrong] && sp(await note(page)) === sp(T(loc, hk)) && await count(page, '.bs-mini') === 0, `${tag}: the wrong book fails the shelf's test → ${hk}, back on the desk`);
    await shelve(page, wrong, askedSh, tag); await click(page, K('check'), tag); s = await st(page);
    const nm = C.marks(loc, s.right).length;
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintMiss2')) && await has(page, '.bs-open.is-helpbook') && await count(page, '.bs-mk.is-solid') === nm && sp(await page.evaluate(() => document.querySelector('.bs-otext b').textContent)) === sp(C.book(loc, s.right).t), `${tag}: miss 2 → the asked book opens by itself, ${nm} marks underlined`);
    await click(page, K('close'), tag); is(!(await has(page, '.bs-wrap.is-help')) && await count(page, '.bs-mk') === 0, `${tag}: the close tab takes the help away`);
    await shelve(page, s.right, askedSh, tag); await click(page, K('check'), tag); s = await st(page);
    const br = C.book(loc, s.right);
    is(s.done && sp(await note(page)) === sp(T(loc, br.kind === 'story' ? 'okStory' : 'okFact', { title: br.t })) && await has(page, '.bs-mini.is-good.band-' + br.kind), `${tag}: the right book → the success line naming it, the spine band`);
    is(await page.evaluate(() => [...document.querySelectorAll('.bs-cover,.bs-target,.bs-mini')].every(b => b.disabled)), `${tag}: everything rests once solved`);
    /* Same topic */
    tag = `${loc} topic`; await force(page, 'topic', 2, 0); s = await st(page);
    is(s.desk.some(id => id !== s.right && C.DATA.BOOKS[id].topic === C.DATA.BOOKS[s.right].topic && kind(id) !== s.ask), `${tag}: the twin of the other kind is on the desk`);
    await solve(page, tag); s = await st(page); is(s.done, `${tag}: solved`);
    /* Fill both shelves */
    tag = `${loc} fill`; await force(page, 'fill', 1, 2); s = await st(page);
    is(await count(page, '.bs-cover') === 4 && s.ask === null && sp(await prompt(page)) === sp(T(loc, 'tFill')) && sp(await page.evaluate(() => document.querySelector('.bs-ask').textContent)) === sp(T(loc, 'askFill')), `${tag}: four covers, the fill task, no ask`);
    await shelve(page, s.desk[0], shelfOf(kind(s.desk[0])), tag); await click(page, K('check'), tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmptyFill')), `${tag}: Check before every book is shelved → hintEmptyFill, no miss`);
    const sx = s.desk.find(id => kind(id) === 'story' && !s.place[id]), fx = s.desk.find(id => kind(id) === 'fact' && !s.place[id]);
    await shelve(page, sx, 'shaker', tag); await shelve(page, fx, 'ribbon', tag);
    for (const id of s.desk) if (id !== sx && id !== fx && !s.place[id]) await shelve(page, id, shelfOf(kind(id)), tag);
    await click(page, K('check'), tag); s = await st(page);
    is(s.misses === 1 && !s.place[sx] && !s.place[fx] && s.desk.filter(id => id !== sx && id !== fx).every(id => s.place[id] && s.locked[id]) && await count(page, '.bs-mini:disabled') === 2, `${tag}: the swapped pair comes back, the other two stay and rest`);
    await shelve(page, sx, 'ribbon', tag); await shelve(page, fx, 'shaker', tag); await click(page, K('check'), tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBoth')) && await count(page, '.bs-mini.is-good') === 4, `${tag}: all right → okBoth`);
    /* inside pages open on the desk */
    tag = `${loc} open pages`; await force(page, 'ask', 0, 0, 'open'); s = await st(page);
    is(await count(page, '.bs-row') === 3 && await count(page, '.bs-desk .bs-page') === 9 && await count(page, '.bs-open') === 0, `${tag}: every book's three pages lie open, no tap`);
    const b0 = s.desk[0]; await click(page, K('cover-' + b0), tag);
    is(await count(page, '.bs-row.is-sel') === 1 && await count(page, '.bs-row .bs-knob') === 1, `${tag}: a tapped cover gets the shake knob`);
    const before = await page.evaluate(() => [...document.querySelectorAll('.bs-row')].map(r => [...r.querySelectorAll('.bs-s')].map(e => e.textContent).join('|')));
    await click(page, K('shake'), tag);
    const after = await page.evaluate(() => [...document.querySelectorAll('.bs-row')].map(r => [...r.querySelectorAll('.bs-s')].map(e => e.textContent).join('|')));
    is(after[0] !== before[0] && after[1] === before[1] && after[2] === before[2], `${tag}: the knob shakes only that book`);
    /* the shelves' test, animated */
    tag = `${loc} animated`; await force(page, 'ask', 0, 2); s = await st(page);
    await page.evaluate(() => { window.BeaTwoBookshelvesActivity.FAST = false; });
    await shelve(page, s.right, 'ribbon', tag); await click(page, K('check'), tag); await wait(120);
    is(await has(page, '.bs-open.is-test.sh-ribbon') && await page.evaluate(() => document.querySelector('.bs-check').disabled) && await count(page, '.bs-page.is-lit') >= 1, `${tag}: the ribbon threads the open book's pages, Check waits`);
    await wait(1900); s = await st(page);
    is(s.done && !(await has(page, '.bs-open')) && await has(page, '.bs-mini.is-good .bs-bow'), `${tag}: the bow is tied, the book on its shelf`);
    await page.evaluate(() => { window.BeaTwoBookshelvesActivity.FAST = true; });
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.bs-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.bs-cpic img,.bs-bea img').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(), cover = !!e.closest('.bs-cpic'); if (q.width < 63.5 || (cover && Wd >= 704 && !document.querySelector('.bs-wrap.is-openpages') && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.bs-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.bs-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.bs-wrap')).getBoundingClientRect();
    document.querySelectorAll('.bs-top,.bs-cover,.bs-open,.bs-shelf,.bs-mini,.bs-check,.bs-note').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const band = ['.bs-top', '.bs-deskarea', '.bs-shelves', '.bs-foot', '.bs-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    /* a word wider than its box is cut off sideways (heights grow with the text, and Baloo's ascenders overhang their line box) */
    document.querySelectorAll('.bs-ctitle,.bs-page,.bs-ask,.bs-otext b,.bs-otext i,.bs-note').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className || c.tagName).split(' ')[0] + ' text cut off'); });
    /* the books on a shelf stand inside it */
    document.querySelectorAll('.bs-shelf').forEach(sh => { const s = sh.getBoundingClientRect(); sh.querySelectorAll('.bs-mini').forEach(m => { const q = m.getBoundingClientRect(); if (q.left < s.left - 1 || q.right > s.right + 1 || q.top < s.top - 1 || q.bottom > s.bottom + 1) out.fails.push('a book sticks out of its shelf'); }); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lv of C.LEVELS) for (const r of C.rounds()) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${lv} ${r} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lv, r, lv === 'fill' ? r % 4 : C.SLOTS[lv][r]);
      if (state === 'solved') await solve(page, t0); else if (state === 'miss2') await missTwice(page, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses >= 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${lv} ${r} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.BeaTwoBookshelvesActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.bs-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${r}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-bea-two-bookshelves: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
