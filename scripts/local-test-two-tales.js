#!/usr/bin/env node
/* =====================================================================
   local-test-two-tales.js — ACTIVITY #120, The Plank Across Two Books,
   in a real browser with real pointer actions (planks tapped and laid
   across the books, on a book or in the basket, book tabs on phones,
   Check clicked), in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (task: same / only / sort; pages: 3 / 2);
     · What is the same?: two books, three planks, only the bridge to lay
       on; an empty Check → the empty hint; a place tapped with no plank →
       the pick hint; a wrong plank across + Check → it comes back with the
       walk hint; again → the moon dots show each book's evidence; a new
       move takes them away; the shared plank across → the success line
       naming it, the plank green, a proof page lit in each book;
     · What happened in only one?: Kiki's lost ball — the plank on the gold
       book is a miss, on the silver book (Sam found his acorn) solved;
     · Sort: the basket; an unfinished sort → no miss; the gold-only and
       silver-only planks swapped → those two come back, the other two
       stay; then all right;
     · two pages; the walk animates (not FAST).
   Then every round of every task at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366 (phones
   show one book at a time, with tabs): no sideways scroll, Check above
   the fold at rest, Check and the hint in view at miss 2, the success
   line in view, controls ≥ 44 px, pictures ≥ 64 px (page pictures ≥ 96
   from 704 on wide screens), everything inside the card, no bands
   overlapping, no text cut off.
   Usage: node scripts/local-test-two-tales.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '120-plank-across-two-books', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'two-tales-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, TwoTalesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'two-tales-activity.js'), 'utf8') + '\n;this.__A = window.TwoTalesActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/two-tales-activity.html?activity=two-tales.compare.rl-1-9&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TwoTalesActivity && window.TwoTalesActivity.st && document.querySelector('.tt-check'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.TwoTalesActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* a round of a task, set through the settings the drawer writes */
  async function force(page, mode, r, pages) {
    const ok = await page.evaluate((mode, r, pages) => {
      const a = window.TwoTalesActivity; a.api.settings.task = mode; a.api.settings.pages = String(pages || 3); a._pool = null; a._ensurePool();
      a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0);
      return a.st.mode === mode && a.st.r === r;
    }, mode, r, pages);
    if (!ok) throw new Error('force missed ' + mode + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.TwoTalesActivity.st; return { mode: s.mode, r: s.r, pages: s.pages, gold: s.gold, silver: s.silver, answer: s.answer, planks: s.planks, place: s.place, locked: s.locked, sel: s.sel, misses: s.misses, show: s.show, last: s.last, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.tt-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const has = (page, sel) => page.evaluate((s) => !!document.querySelector(s), sel);
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  /* a place is tapped on its empty corner (planks laid there sit in the middle); on phones a book's tab shows that book first */
  async function tapZone(page, target, tag) {
    const narrow = await page.evaluate(() => window.TwoTalesActivity._wrap.classList.contains('is-narrow'));
    if (narrow && (target === 'gold' || target === 'silver')) await click(page, K('tab-' + target), tag);
    const b = await page.evaluate((t) => { const e = document.querySelector('[data-k="zone-' + t + '"]'); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + 8, y: r.top + 6, dis: e.disabled }; }, target);
    if (!b) { is(false, tag + ': there is a place ' + target); return; }
    if (b.dis) { is(false, tag + ': place ' + target + ' is enabled'); return; }
    await page.mouse.click(b.x, b.y); await wait(25);
  }
  const truth = (tag, g, s) => C.truth(tag, g, s);
  async function lay(page, tag, target, t) { await click(page, K('plank-' + tag), t); await tapZone(page, target, t); }
  async function solve(page, tag) {
    const s = await st(page);
    if (s.mode === 'sort') { for (const p of s.planks) if (!s.place[p]) await lay(page, p, truth(p, s.gold, s.silver), tag); }
    else await lay(page, s.answer, truth(s.answer, s.gold, s.silver), tag);
    await click(page, K('check'), tag);
  }
  async function missTwice(page, tag) {
    for (let k = 0; k < 2; k++) {
      const s = await st(page);
      if (s.mode === 'sort') {
        const g = s.planks.find(p => truth(p, s.gold, s.silver) === 'gold'), v = s.planks.find(p => truth(p, s.gold, s.silver) === 'silver');
        for (const p of s.planks) if (!s.place[p]) await lay(page, p, p === g ? 'silver' : p === v ? 'gold' : truth(p, s.gold, s.silver), tag);
      } else await lay(page, s.planks.find(p => p !== s.answer), 'across', tag);
      await click(page, K('check'), tag);
    }
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.TwoTalesActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === '["task:same/only/sort","pages:3/2"]', `${loc}: the settings`);
    /* What is the same? */
    tag = `${loc} same`; await force(page, 'same', 0); s = await st(page);
    is(sp(await prompt(page)) === sp(T(loc, 'tSame')) && await count(page, '.tt-book') === 2 && await count(page, '.tt-page') === 6 && await count(page, '.tt-tray .tt-plank') === 3 && !(await has(page, K('zone-gold'))) && !(await has(page, K('zone-basket'))), `${tag}: two books of three pages, three planks, only the bridge to lay on`);
    is(await page.evaluate((n) => document.querySelector('.bk-gold .tt-bhead b').textContent === n, C.tale(loc, s.gold, 3).name), `${tag}: the gold book is ${s.gold}`);
    await click(page, K('check'), tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → the empty hint`);
    await tapZone(page, 'across', tag); is(sp(await note(page)) === sp(T(loc, 'hintPick')), `${tag}: a place with no plank picked → the pick hint`);
    const wrong = s.planks.find(p => p !== s.answer);
    await lay(page, wrong, 'across', tag); s = await st(page); is(s.place[wrong] === 'across' && await count(page, '.z-across .tt-plank') === 1, `${tag}: the plank lies on the bridge`);
    await click(page, K('check'), tag); s = await st(page);
    is(s.misses === 1 && !s.place[wrong] && sp(await note(page)) === sp(T(loc, 'hintMiss1')), `${tag}: a plank in one book only → it comes back, the walk hint`);
    await lay(page, wrong, 'across', tag); await click(page, K('check'), tag); s = await st(page);
    const dotsOk = await page.evaluate((g, sv) => { const D = window.TwoTalesCore.DATA.TALES; return [...document.querySelectorAll('.tt-tray .tt-plank')].every(b => { const t = b.getAttribute('data-k').slice(6); return b.querySelector('.dg').classList.contains('is-on') === (D[g].tags.indexOf(t) >= 0) && b.querySelector('.ds').classList.contains('is-on') === (D[sv].tags.indexOf(t) >= 0); }); }, s.gold, s.silver);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintMiss2')) && await count(page, '.tt-tray .tt-dots') === 3 && dotsOk, `${tag}: miss 2 → every plank shows each book's evidence`);
    await click(page, K('plank-' + s.answer), tag); is(await count(page, '.tt-dots') === 0, `${tag}: a new move takes the dots away`);
    await tapZone(page, 'across', tag); await click(page, K('check'), tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okSame', { tag: C.label(loc, s.answer) })) && await count(page, '.z-across .tt-plank.is-ok') === 1 && await count(page, '.bk-gold .tt-page.is-proof') >= 1 && await count(page, '.bk-silver .tt-page.is-proof') >= 1, `${tag}: the shared plank → the success line, the proof page lit in each book`);
    /* What happened in only one? — Kiki lost her ball; Sam lost his acorn and found it */
    tag = `${loc} only`; await force(page, 'only', 8); s = await st(page);
    is(s.answer === 'LOST_FOUND' && truth(s.answer, s.gold, s.silver) === 'silver' && await has(page, K('zone-gold')) && await has(page, K('zone-silver')), `${tag}: Kiki and Sam, both books take a plank`);
    await lay(page, s.answer, 'gold', tag); await click(page, K('check'), tag); s = await st(page);
    is(s.misses === 1 && !s.place[s.answer], `${tag}: on Kiki's book → a miss (she never found her ball)`);
    await lay(page, s.answer, 'silver', tag); await click(page, K('check'), tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okOnly', { name: C.tale(loc, s.silver, 3).name, tag: C.label(loc, s.answer) })), `${tag}: on Sam's book → the success line naming his book`);
    /* Sort */
    tag = `${loc} sort`; await force(page, 'sort', 1); s = await st(page);
    is(await count(page, '.tt-tray .tt-plank') === 4 && await has(page, K('zone-basket')), `${tag}: four planks and the basket`);
    const first = s.planks.find(p => ['across', 'basket'].indexOf(truth(p, s.gold, s.silver)) >= 0); await lay(page, first, truth(first, s.gold, s.silver), tag); await click(page, K('check'), tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintSortEmpty')), `${tag}: an unfinished sort → no miss`);
    const go = s.planks.find(p => truth(p, s.gold, s.silver) === 'gold'), so = s.planks.find(p => truth(p, s.gold, s.silver) === 'silver');
    for (const p of s.planks) if (!s.place[p]) await lay(page, p, p === go ? 'silver' : p === so ? 'gold' : truth(p, s.gold, s.silver), tag);
    await click(page, K('check'), tag); s = await st(page);
    is(s.misses === 1 && !s.place[go] && !s.place[so] && s.planks.filter(p => s.locked[p]).length === 2 && await count(page, '.tt-plank.is-laid:disabled') === 2, `${tag}: the swapped pair comes back, the other two stay`);
    await lay(page, go, 'gold', tag); await lay(page, so, 'silver', tag); await click(page, K('check'), tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okSort')), `${tag}: all right → solved`);
    /* two pages */
    tag = `${loc} 2 pages`; await force(page, 'same', 2, 2);
    is(await count(page, '.tt-page') === 4 && await page.evaluate(() => Math.round(document.querySelector('.tt-pic img').getBoundingClientRect().width)) >= 119, `${tag}: two pages a book, bigger pictures`);
    /* the walk, animated */
    tag = `${loc} animated`; await force(page, 'same', 0); s = await st(page);
    await page.evaluate(() => { window.TwoTalesActivity.FAST = false; });
    await lay(page, s.answer, 'across', tag); await click(page, K('check'), tag); await wait(120);
    is(await count(page, '.tt-page.is-walk') === 1 && await page.evaluate(() => document.querySelector('.tt-check').disabled), `${tag}: an end walks a book page by page, Check waits`);
    await wait(3200); s = await st(page); is(s.done, `${tag}: then the result`);
    await page.evaluate(() => { window.TwoTalesActivity.FAST = true; });
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth, wide = document.querySelector('.tt-wrap').classList.contains('is-wide');
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.tt-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.tt-pic img,.tt-turtle img').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(), pg = !!e.closest('.tt-pic'); if (q.width < 63.5 || (pg && wide && Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.tt-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.tt-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.tt-wrap')).getBoundingClientRect();
    document.querySelectorAll('.tt-book,.tt-plank,.tt-zone,.tt-tab,.tt-check').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const band = ['.tt-bridgerow', '.tt-books', '.tt-tray', '.tt-foot', '.tt-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.tt-cap,.tt-plabel,.tt-bhead b,.tt-note').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className || c.tagName).split(' ')[0] + ' text cut off'); });
    document.querySelectorAll('.tt-plank').forEach(p => { if (!vis(p)) return; const l = p.querySelector('.tt-plabel'), q = p.getBoundingClientRect(); if (l) { const z = l.getBoundingClientRect(); if (z.right > q.right + 1 || z.bottom > q.bottom + 1 || z.left < q.left - 1) out.fails.push('a plank label spills out'); } });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const mode of C.MODES) for (const r of C.rounds(mode)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${mode} ${r} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, mode, r);
      if (state === 'solved') await solve(page, t0); else if (state === 'miss2') await missTwice(page, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses >= 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${mode} ${r} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.TwoTalesActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.tt-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${mode}-${r}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-two-tales: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
