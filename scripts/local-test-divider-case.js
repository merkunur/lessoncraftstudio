#!/usr/bin/env node
/* =====================================================================
   local-test-divider-case.js — ACTIVITY #129, The Divider Case (Cleo's
   Packing List, L.1.2.b), in a real browser with real pointer actions
   (gaps tapped for commas and back, shelf pictures picked and sent back,
   Pack clicked), in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (three levels; lists 3 / 4 / 3 then 4; walls as I go /
       only when I pack);
     · level 1: the task line, n+1 gaps, an empty case; Pack with no comma
       → the hint, no miss; a gap tapped → its comma and its wall, tapped
       again → both gone; a comma after the lead and the first comma
       missing → Pack: the pictures drop, the left pocket is empty
       (hatched), two things squash, the hint; Pack again → miss 2: the
       missing gap glows, the extra gap shakes; a move clears the help;
       the right commas → Pack: the lid shuts, every pocket holds one
       thing, the success line with the sentence;
     · non-English: a comma before the conjunction → the sliver hint;
       English: no comma before "and" → the serial-comma hint;
     · walls "only when I pack": a comma drops no wall until Pack;
     · level 2: two pictures → Pack → the hint, no miss; three and the
       commas → packed, "your own list";
     · level 3: the already-right start packs at once.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real taps, then resized through 320…1366: no
   sideways scroll, Pack above the fold at rest, the hint and the success
   line in view, controls ≥ 44 px, everything inside the card, no text cut
   off, every wall under its gap, no two bands on top of each other.
   Usage: node scripts/local-test-divider-case.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '129-divider-case', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'divider-case-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, DividerCaseCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'divider-case-activity.js'), 'utf8') + '\n;this.__A = window.DividerCaseActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 120) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(IMGROOT, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    /* exact-case lookup, like the Linux server */
    if (p.startsWith('/image-library-webp/')) { const d = path.dirname(file); if (!fs.existsSync(d) || !fs.readdirSync(path.dirname(d)).includes(path.basename(d)) || !fs.readdirSync(d).includes(path.basename(file))) { res.statusCode = 404; res.end(); return; } }
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
    await page.goto(`${base}/divider-case-activity.html?activity=cleo-packing-list.series-commas.l-1-2-b&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.DividerCaseActivity && window.DividerCaseActivity.st && document.querySelector('.dc-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.DividerCaseActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, walls, lists) {
    const ok = await page.evaluate((lvl, r, walls, lists) => {
      const a = window.DividerCaseActivity; a.api.settings.level = lvl; a.api.settings.walls = walls || 'go'; a.api.settings.lists = lists || '34'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, walls, lists);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.DividerCaseActivity.st; return { r: s.r, lvl: s.lvl, commas: s.commas.slice(), picks: s.picks.slice(), misses: s.misses, show: s.show, last: s.last, reason: s.reason, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.dc-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const pack = (page, tag) => click(page, K('check'), tag);
  /* set the commas by tapping exactly the gaps that differ */
  async function commas(page, want, tag) { const s = await st(page); for (const g of new Set(s.commas.concat(want))) if (s.commas.includes(g) !== want.includes(g)) await click(page, K('gap-' + g), tag); }
  const nOf = (rd, picks) => rd.kind === 'own' ? picks.length : rd.items.length;
  async function reach(page, rd, state, tag) {
    if (rd.kind === 'own') { const k = rd.r % 2 ? 4 : 3; for (let i = 0; i < k; i++) await click(page, K('pick-' + rd.order[i]), tag); if (state === 'rest') return true; }
    else if (state === 'rest') return true;
    const n = rd.kind === 'own' ? (rd.r % 2 ? 4 : 3) : rd.items.length, R = C.required(rd.loc, n);
    if (state === 'solved') { await commas(page, R, tag); await pack(page, tag); return true; }
    await commas(page, R.filter(x => x !== 1).concat([0]), tag); await pack(page, tag); await pack(page, tag); return true;
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.DividerCaseActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === JSON.stringify(['level:1/2/3', 'lists:3/4/34', 'walls:go/pack']), `${loc}: the settings`);
    /* level 1, a list of four */
    const r1 = 9, rd1 = C.round(loc, '1', r1), n1 = rd1.items.length, R1 = C.required(loc, n1); tag = `${loc} L1.${r1 + 1}`; await force(page, '1', r1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 't1')), `${tag}: the task line`);
    is(await count(page, '.dc-gap') === n1 + 1 && await count(page, '.dc-pic') === 0 && await count(page, '.dc-wall:not(.is-conj)') === 0, `${tag}: ${n1 + 1} gaps, an empty case`);
    await pack(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: Pack with no comma → the hint, no miss`);
    await click(page, K('gap-1'), tag); is(await count(page, K('gap-1') + '.is-on') === 1 && await count(page, '.dc-wall:not(.is-conj)') === 1, `${tag}: a gap tapped → its comma and its wall`);
    await click(page, K('gap-1'), tag); is((await st(page)).commas.length === 0 && await count(page, '.dc-wall:not(.is-conj)') === 0, `${tag}: tapped again → both gone`);
    await commas(page, R1.filter(x => x !== 1).concat([0]), tag); await pack(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'missLead')) && await count(page, '.dc-pic') === n1 && await count(page, '.dc-h.p-empty') >= 1 && await count(page, '.dc-thing.is-squash') === 2, `${tag}: a comma after the lead and the first one missing → pictures, an empty pocket, a squash, «${sp(await note(page))}»`);
    await pack(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'missGlow')) && await count(page, K('gap-1') + '.is-missing') === 1 && await count(page, K('gap-0') + '.is-extra') === 1, `${tag}: miss 2 → the missing gap glows, the extra one shakes`);
    await click(page, K('gap-0'), tag); is(await count(page, '.is-missing,.is-extra') === 0 && await count(page, '.dc-pic') === 0, `${tag}: a move clears the help and the packing`);
    await commas(page, R1, tag); await pack(page, tag); s = await st(page);
    const want1 = T(loc, 'okPacked', { s: await page.evaluate(() => window.DividerCaseCore.sentence(window.DividerCaseActivity.st)) });
    is(s.done && sp(await note(page)) === sp(want1) && await count(page, '.dc-case.is-shut') === 1 && await count(page, '.dc-h.p-squash,.dc-h.p-empty') === 0 && await count(page, '.dc-pic') === n1, `${tag}: the right commas → the lid shuts, «${sp(await note(page))}»`);
    /* the last gap, by the language's rule */
    const r2 = 1, n2 = C.round(loc, '1', r2).items.length, R2 = C.required(loc, n2); tag = `${loc} L1.${r2 + 1}`; await force(page, '1', r2);
    if (C.divides(loc)) { await commas(page, R2.concat([n2 - 1]), tag); await pack(page, tag); is(sp(await note(page)) === sp(T(loc, 'missBeside', { and: C.DATA[loc].conj })) && await count(page, '.dc-h.p-empty') >= 1, `${tag}: a comma before «${C.DATA[loc].conj}» → the sliver, «${sp(await note(page))}»`); }
    else { await commas(page, R2.filter(x => x !== n2 - 1), tag); await pack(page, tag); is(sp(await note(page)) === sp(T(loc, 'missEnLast')), `${tag}: no comma before "and" → «${sp(await note(page))}»`); }
    /* walls only when packing */
    await force(page, '1', 0, 'pack'); await click(page, K('gap-1'), `${loc} walls`);
    is(await count(page, '.dc-wall:not(.is-conj)') === 0, `${loc}: "only when I pack" — a comma drops no wall yet`);
    await pack(page, `${loc} walls`); is(await count(page, '.dc-wall:not(.is-conj)') === 1, `${loc}: "only when I pack" — Pack drops the wall`);
    /* level 2 */
    const rd2 = C.round(loc, '2', 0, C.plan(loc, '2', '34', Math.random).trays[0]); tag = `${loc} L2.1`; await force(page, '2', 0);
    const order = await page.evaluate(() => window.DividerCaseActivity.st.rd.order);
    is(await count(page, '.dc-shelfb') === 8 && await count(page, '.dc-shelfimg') === 8, `${tag}: a shelf of eight pictures`);
    await click(page, K('pick-' + order[0]), tag); await click(page, K('pick-' + order[1]), tag); await pack(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintFew')), `${tag}: two things → «${sp(await note(page))}», no miss`);
    await click(page, K('pick-' + order[2]), tag); await click(page, K('item-' + order[1]), tag); s = await st(page); is(s.picks.length === 2, `${tag}: a thing sent back to the shelf`);
    await click(page, K('pick-' + order[1]), tag); await commas(page, C.required(loc, 3), tag); await pack(page, tag); s = await st(page);
    const want2 = T(loc, 'okOwn', { s: await page.evaluate(() => window.DividerCaseCore.sentence(window.DividerCaseActivity.st)) });
    is(s.done && sp(await note(page)) === sp(want2), `${tag}: their own list packs, «${sp(await note(page))}»`);
    /* level 3: the already-right start */
    const rr = C.rounds('3').find(r => C.round(loc, '3', r).shape === 'right'); await force(page, '3', rr); await pack(page, `${loc} L3`);
    is((await st(page)).done, `${loc} L3.${rr + 1}: the right start packs at once`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.dc-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + String(e.className).split(' ')[0] + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.dc-pack'); out.cBottom = ck && vis(ck) ? ck.getBoundingClientRect().bottom : 0;
    const nr = document.querySelector('.dc-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.dc-wrap')).getBoundingClientRect();
    document.querySelectorAll('.dc-case,.dc-shelf,.dc-col,.dc-shelfb,.dc-pack').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const cs = document.querySelector('.dc-case').getBoundingClientRect();
    document.querySelectorAll('.dc-col').forEach(e => { const q = e.getBoundingClientRect(); if (q.left < cs.left - 1 || q.right > cs.right + 1) out.fails.push('a column outside the case'); });
    /* every wall stands under its own gap */
    document.querySelectorAll('.dc-sockc').forEach(col => { const g = col.querySelector('.dc-gap'), w = col.querySelector('.dc-wall'); if (!g || !w) return; const a = g.getBoundingClientRect(), b = w.getBoundingClientRect(); if (Math.abs((a.left + a.right) / 2 - (b.left + b.right) / 2) > 3 || b.top < a.bottom - 2) out.fails.push('a wall not under its gap'); });
    const band = ['.dc-case', '.dc-shelf', '.dc-foot', '.dc-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.dc-word,.dc-shelfb span,.dc-note').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lvl of C.levels()) for (const r of C.rounds(lvl, '34')) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} L${lvl}.${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r);
      const rd = await page.evaluate(() => JSON.parse(JSON.stringify(window.DividerCaseActivity.st.rd)));
      if (!(await reach(page, rd, state, t0))) continue;
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real taps (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real taps`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} L${lvl}.${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.DividerCaseActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.dc-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom > 0 && m.cBottom <= VH(w), `${tag}: Pack above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the ${state === 'solved' ? 'success line' : 'hint'} in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && ['en', 'de', 'fi'].indexOf(loc) >= 0 && [360, 704, 1024].indexOf(w) >= 0 && r % 5 === 0) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-L${lvl}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-divider-case: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
