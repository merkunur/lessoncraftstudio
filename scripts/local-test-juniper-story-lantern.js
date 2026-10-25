#!/usr/bin/env node
/* =====================================================================
   local-test-juniper-story-lantern.js — ACTIVITY #116, The Lantern That
   Carries a Lesson, in a real browser with real pointer actions (cards
   tapped into Juniper's lantern and tapped again to change them, story
   panes tapped two at a time to swap them, Check clicked), in all 11
   locales.
   Scenarios per locale (at 1024):
     · the two settings and their values;
     · Lesson, three cards: an empty Check → hintEmpty, no miss; a card →
       into the lantern, nothing lit yet; the detail → hintDetail, only its
       own pane lit, the beam halfway, the new story still dark; again →
       hintBoth, the ending glows and the new story brightens; the wrong
       lesson → the help gone, then the ending pane cold and the beam
       stopped; the lesson → okLesson naming it, all three panes lit, the
       beam into the new story, a firefly in the jar;
     · four cards: another fable's lesson → hintOther, no pane lit, the new
       story behind glass;
     · Retell: the cards shut; a wrong order → hintOrder and a pane
       wobbles; again → hintOrder2 and the first pane glows; panes swapped
       into order → okRetell, the lantern opens, the task line changes;
       then the lesson → done.
   Then every round of Lesson × 3 and × 4 cards at rest, at miss 2 and
   solved, and Retell at rest — reached ONCE per locale by real actions,
   then resized through 320…1366: no sideways scroll, Check above the fold
   at rest, Check and the hint in view at miss 2, the success line in
   view, controls ≥ 44 px, pictures ≥ 64 px (≥ 96 from 704), nothing
   outside the card, no bands overlap, no card cut off.
   Usage: node scripts/local-test-juniper-story-lantern.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '116-lantern-carries-a-lesson', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'juniper-story-lantern-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, JuniperLanternCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'juniper-story-lantern-activity.js'), 'utf8') + '\n;this.__A = window.JuniperLanternActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/juniper-story-lantern-activity.html?activity=juniper-story-lantern.central-message.rl-1-2&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.JuniperLanternActivity && window.JuniperLanternActivity.st && document.querySelector('.jl-foot .jl-check'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.JuniperLanternActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* a round, its lesson at a known slot, the retell start a known shuffle */
  async function force(page, task, n, r, slot, perm) {
    await page.evaluate((task, n, r, slot, perm) => {
      const a = window.JuniperLanternActivity; a.api.settings.task = task; a.api.settings.cards = String(n); a._pool = null; a._ensurePool();
      a._slots = Array(10).fill(slot); a._perms = Array(10).fill(perm); a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0);
    }, task, n, r, slot, perm);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.JuniperLanternActivity.st; return { task: s.task, n: s.n, r: s.r, lantern: s.lantern, order: s.order.join(), retold: s.retold, sel: s.sel, misses: s.misses, retellMisses: s.retellMisses, show: s.show, done: s.done, last: s.last }; });
  const R0 = (page) => page.evaluate(() => { const s = window.JuniperLanternActivity.st; return { cards: s.cards, right: s.right, F: s.F, order: s.order.slice() }; });
  const note = (page) => page.evaluate(() => document.querySelector('.jl-note').textContent);
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
  const check = (page, tag) => click(page, K('check'), tag);
  const cardOf = (r, kind) => r.cards.findIndex(c => c.kind === kind);
  /* swap panes into order by real taps */
  async function retell(page, tag) {
    for (let i = 0; i < 3; i++) { const o = (await R0(page)).order, j = o.indexOf(i); if (j !== i) { await click(page, K('pane-' + i), tag); await click(page, K('pane-' + j), tag); } }
    await check(page, tag);
  }
  async function solve(page, tag) { const s0 = await st(page); if (!s0.retold) await retell(page, tag); const r = await R0(page); await click(page, K('card-' + r.right), tag); await check(page, tag); }
  async function missTwice(page, tag) { const r = await R0(page); await click(page, K('card-' + cardOf(r, 'detail')), tag); await check(page, tag); await check(page, tag); }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s, r;
    is(JSON.stringify(await page.evaluate(() => window.JuniperLanternActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === '["task:lesson/retell","cards:3/4"]', `${loc}: the settings`);
    /* Lesson, three cards */
    tag = `${loc} lesson`; await force(page, 'lesson', 3, 0, 2, null); r = await R0(page);
    is(sp(await prompt(page)) === sp(T(loc, 'tLesson')) && await count(page, '.jl-card') === 3 && await count(page, '.jl-pane') === 3, `${tag}: the task line, three panes, three cards`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → hintEmpty, no miss`);
    const det = cardOf(r, 'detail'), wr = cardOf(r, 'wrong');
    await click(page, K('card-' + det), tag); s = await st(page);
    is(s.lantern === det && await count(page, '.jl-lantern.is-lit') === 1 && await count(page, '.jl-pane.is-lit') === 0 && await count(page, '.jl-card.is-in') === 1, `${tag}: the detail into the lantern, nothing lit before Check`);
    await click(page, K('card-' + wr), tag); s = await st(page); is(s.lantern === wr && await count(page, '.jl-card.is-in') === 1, `${tag}: another card swaps in — one at a time`);
    await click(page, K('card-' + wr), tag); s = await st(page); is(s.lantern === null && await count(page, '.jl-lantern.is-lit') === 0, `${tag}: the same card again takes it out`);
    await click(page, K('card-' + det), tag); await check(page, tag); s = await st(page);
    const litDet = await page.evaluate(() => [...document.querySelectorAll('.jl-pane')].map(e => e.classList.contains('is-lit') ? 1 : 0).join(''));
    is(s.last === 'detail' && sp(await note(page)) === sp(T(loc, 'hintDetail')) && litDet === [0, 1, 2].map(i => +(i === r.F.pane)).join('') && await has(page, '.jl-beam.is-half') && !(await has(page, '.jl-next.is-open')), `${tag}: the detail → only pane ${r.F.pane + 1} lit (${litDet}), the beam halfway`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintBoth')) && await count(page, '.jl-pane.is-ending') === 1 && await has(page, '.jl-next.is-bright'), `${tag}: miss 2 → the ending glows, the new story brightens`);
    await click(page, K('card-' + wr), tag); is(!(await has(page, '.jl-wrap.is-help')) && await count(page, '.jl-pane.is-ending') === 0, `${tag}: a new move takes the help away`);
    await check(page, tag);
    is(await count(page, '.jl-pane.is-lit') === 2 && await count(page, '.jl-pane.is-cold') === 1 && await has(page, '.jl-beam.is-stops') && sp(await note(page)) === sp(T(loc, 'hintBoth')), `${tag}: the wrong lesson → the ending cold, the beam stopped`);
    await click(page, K('card-' + r.right), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okLesson', { moral: r.F.m })) && await count(page, '.jl-pane.is-lit') === 3 && await has(page, '.jl-next.is-open') && await has(page, '.jl-beam.is-reaches') && await count(page, '.jl-fly') === 1, `${tag}: the lesson → okLesson, all lit, the beam into the new story, a firefly`);
    is(await page.evaluate(() => [...document.querySelectorAll('.jl-card')].every(b => b.disabled)), `${tag}: the cards rest once solved`);
    /* four cards: another fable's lesson */
    tag = `${loc} four`; await force(page, 'lesson', 4, 3, 1, null); r = await R0(page);
    is(await count(page, '.jl-card') === 4 && r.cards[1].kind === 'moral', `${tag}: four cards, the lesson where it was put`);
    await click(page, K('card-' + cardOf(r, 'other')), tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintOther')) && await count(page, '.jl-pane.is-lit') === 0 && await has(page, '.jl-npane.is-glass'), `${tag}: another fable's lesson → nothing lit, the new story behind glass`);
    /* Retell */
    tag = `${loc} retell`; await force(page, 'retell', 3, 5, 0, [2, 0, 1]); r = await R0(page);
    is(sp(await prompt(page)) === sp(T(loc, 'tRetell')) && await page.evaluate(() => [...document.querySelectorAll('.jl-card')].every(b => b.disabled)) && await count(page, 'button.jl-pane') === 3, `${tag}: the panes are buttons, the cards shut`);
    await check(page, tag); s = await st(page);
    is(s.retellMisses === 1 && sp(await note(page)) === sp(T(loc, 'hintOrder')) && await count(page, '.jl-pane.is-wobble') === 1, `${tag}: a wrong order → hintOrder, a pane wobbles`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintOrder2')) && await count(page, '.jl-pane.is-first') === 1, `${tag}: miss 2 → the first part glows`);
    await click(page, K('pane-0'), tag); s = await st(page); is(s.sel === 0 && await count(page, '.jl-pane.is-sel') === 1, `${tag}: a pane picked`);
    await click(page, K('pane-0'), tag); s = await st(page); is(s.sel === null, `${tag}: the same pane again puts it down`);
    await retell(page, tag); s = await st(page);
    is(s.retold && s.order === '0,1,2' && sp(await note(page)) === sp(T(loc, 'okRetell')) && sp(await prompt(page)) === sp(T(loc, 'tAfter')) && await has(page, '.jl-frame.is-joined') && await page.evaluate(() => [...document.querySelectorAll('.jl-card')].every(b => !b.disabled)), `${tag}: in order → okRetell, the lantern opens`);
    await click(page, K('card-' + r.right), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okRetell') + ' ' + T(loc, 'okLesson', { moral: r.F.m })), `${tag}: then the lesson → done`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.jl-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.jl-pic img,.jl-npic img,.jl-juniper img').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.width < 63.5 || (Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.jl-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.jl-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.jl-wrap')).getBoundingClientRect();
    document.querySelectorAll('.jl-pane,.jl-card,.jl-check,.jl-npane,.jl-lantern,.jl-jar,.jl-pic,.jl-beam').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const wide = document.querySelector('.jl-wrap').classList.contains('is-wide');
    const band = (wide ? ['.jl-story', '.jl-row', '.jl-tray', '.jl-foot', '.jl-note'] : ['.jl-story', '.jl-mid', '.jl-tray', '.jl-foot', '.jl-note', '.jl-next']).map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.jl-card,.jl-pane,.jl-ntext').forEach(c => { if (c.scrollWidth > c.clientWidth + 1 || c.scrollHeight > c.clientHeight + 2) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    return out;
  };
  const COMBOS = [['lesson', 3, 'rest,miss2,solved'], ['lesson', 4, 'rest,miss2,solved'], ['retell', 3, 'rest,solved']];
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const [task, n, states] of COMBOS) for (const r of C.rounds(loc)) for (const state of states.split(',')) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${task}${n} ${r} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, task, n, r, C.SLOTS[n][r], [1, 2, 0]);
      if (state === 'solved') await solve(page, t0); else if (state === 'miss2') await missTwice(page, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses >= 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${task}${n} ${r} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.JuniperLanternActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.jl-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${task}${n}-${r}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-juniper-story-lantern: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
