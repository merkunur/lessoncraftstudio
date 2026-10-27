#!/usr/bin/env node
/* =====================================================================
   local-test-leapfrog-parts.js — ACTIVITY #135, The Leapfrog Parts (Add
   It Both Ways, 1.OA.B.3), in a real browser with real pointer clicks,
   in all 11 locales.
   Scenarios per locale (at 1024):
     · a tap only lifts a card (nothing leapfrogs yet); tapping it again
       puts it down;
     · a same-total impostor: the lifted card shows its leapfrog, the
       impostor glows at exactly the cube where the colours disagree, the
       hint says "same total"; again → miss 2: the card stays lifted and
       leapfrogged as the help; the true twin → a twin plate on the shelf
       and the turnaround line; tapping the plate takes the twins apart;
       all three → the round line, Next 0.5 s later;
     · a different total (a talking round): the overhang shows, the hint
       says "one row sticks out";
     · take-away: tapping the "−" bounces, no miss, the minus hint;
     · L leapfrogs the lifted card in place and is never a pick;
     · numbers to 10 change the cards.
   Then every round (turnarounds and take-aways, to 10 and to 20) at rest,
   at miss 2 and solved — reached ONCE per locale by real clicks, then
   resized through 320…1366: no sideways scroll, every card and plate
   above the fold, the hint / result in view, controls ≥ 44 px, nothing
   outside the card, no clipped text, no two cards on top of each other,
   cubes never below 11 px, no console errors.
   Usage: node scripts/local-test-leapfrog-parts.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'leapfrog-parts-core.js'));
const ACT = (() => { const ctx = { window: {}, LeapfrogPartsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'leapfrog-parts-activity.js'), 'utf8') + '\n;this.__A = window.LeapfrogPartsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 150) console.error('   FAIL: ' + m); } };
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
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/leapfrog-parts-activity.html?activity=match-pairs.add-it-both-ways.1-oa-b-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.LeapfrogPartsActivity && window.LeapfrogPartsActivity.st && document.querySelector('.lp-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.LeapfrogPartsActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, num, cards, r) {
    const ok = await page.evaluate((num, cards, r) => {
      const a = window.LeapfrogPartsActivity; a.api.settings.num = num; a.api.settings.cards = cards; a._pool = null; a._plan = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.rd.r === r;
    }, num, cards, r);
    if (!ok) throw new Error('force failed');
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); await page.mouse.click(b.x + b.width - 12, b.y + b.height / 2); await wait(30); return true;
  }
  const st = (page) => page.evaluate(() => { const s = window.LeapfrogPartsActivity.st; return { held: s.held, help: s.help, matched: s.matched, misses: s.misses, done: s.done, last: s.last, lay: s.lay, cards: s.rd.cards }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.lp-note'); return { t: n.textContent, cls: n.className }; });
  const twinOf = (s, i) => s.cards.findIndex((c, j) => j !== i && c.pair === s.cards[i].pair);
  const tot = (c) => c.kind === 'take' ? c.w : c.a + c.b;

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    await force(page, '20', 'add', 0); let s = await st(page);
    await click(page, '[data-k="card-0"]', loc + ' lift'); s = await st(page);
    is(s.held === 0 && await page.$('[data-k="card-0"].is-held') !== null && await page.$('.is-leapt') === null, `${loc}: a tap only lifts the card — nothing leapfrogs yet`);
    await click(page, '[data-k="card-0"]', loc + ' drop'); s = await st(page); is(s.held === null, `${loc}: tapping it again puts it down`);
    const imp = s.cards.findIndex((c, j) => j !== 0 && j !== twinOf(s, 0) && tot(c) === tot(s.cards[0]));
    await click(page, '[data-k="card-0"]', loc + ' lift 2'); await click(page, `[data-k="card-${imp}"]`, loc + ' impostor'); s = await st(page);
    const glow = await page.$$eval(`[data-k="card-${imp}"] .lp-bad`, x => x.length);
    is(s.last === 'miss' && sp((await note(page)).t) === sp(T(loc, 'missSame')) && await page.$('[data-k="card-0"].is-leapt') !== null && glow === C.compare(s.cards[0], s.cards[imp]).bad.length && glow > 0, `${loc}: a same-total impostor — the leapfrog shows, ${glow} cube(s) glow where the colours disagree`);
    await click(page, '[data-k="card-0"]', loc + ' lift 3'); await click(page, `[data-k="card-${imp}"]`, loc + ' impostor 2'); s = await st(page);
    is(s.help === 0 && s.held === 0 && await page.$('[data-k="card-0"].is-help') !== null && sp((await note(page)).t) === sp(T(loc, 'missHelp')), `${loc}: miss 2 → the card stays lifted and leapfrogged as the help`);
    await click(page, `[data-k="card-${twinOf(s, 0)}"]`, loc + ' twin'); s = await st(page);
    const c0 = s.cards[0], lo = Math.min(c0.a, c0.b), hi = Math.max(c0.a, c0.b);
    is(s.matched.length === 1 && (await page.$$('.lp-plate')).length === 1 && sp((await note(page)).t) === sp(T(loc, 'okAdd', { a: lo, b: hi, s: lo + hi })), `${loc}: the true twin → a twin plate and the turnaround line`);
    await click(page, '.lp-plate', loc + ' plate'); s = await st(page);
    is(s.matched.length === 0 && (await page.$$('.lp-plate')).length === 0, `${loc}: tapping the plate takes the twins apart`);
    await page.evaluate(() => { window.LeapfrogPartsActivity.OK_MS = 500; });
    for (let i = 0; i < 6; i++) { s = await st(page); if (s.matched.indexOf(s.cards[i].pair) >= 0) continue; await click(page, `[data-k="card-${i}"]`, loc + ' all'); await click(page, `[data-k="card-${twinOf(s, i)}"]`, loc + ' all twin'); }
    s = await st(page);
    is(s.done && /is-ok/.test((await note(page)).cls) && sp((await note(page)).t) === sp(T(loc, 'okRound')), `${loc}: three twins → the round line`);
    await wait(1100);
    is(await page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); }), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.LeapfrogPartsActivity.OK_MS = 600000; });
    /* a different total: the overhang */
    await force(page, '20', 'add', 5); s = await st(page);
    const diff = s.cards.findIndex((c, j) => j !== 0 && tot(c) !== tot(s.cards[0]));
    await click(page, '[data-k="card-0"]', loc + ' talk'); await click(page, `[data-k="card-${diff}"]`, loc + ' different'); s = await st(page);
    is(sp((await note(page)).t) === sp(T(loc, 'missTotal')) && (await page.$$(`[data-k="card-${diff}"] .lp-over, [data-k="card-${diff}"] .lp-short`)).length > 0, `${loc}: a different total — one row sticks out`);
    /* take-away: the minus refuses */
    await force(page, '20', 'take', 1);
    const mb = await page.evaluate(() => { const e = document.querySelector('[data-k="card-2"] [data-minus]').getBoundingClientRect(); return { x: e.left + e.width / 2, y: e.top + e.height / 2 }; });
    await page.mouse.click(mb.x, mb.y); await wait(40); s = await st(page);
    is(s.held === null && s.misses.every(x => x === 0) && sp((await note(page)).t) === sp(T(loc, 'hintMinus')) && await page.$('[data-k="card-2"].is-bounce') !== null, `${loc}: tapping the minus — the whole bounces back, no miss`);
    /* L: a leapfrog in place, never a pick */
    await click(page, '[data-k="card-1"]', loc + ' L lift'); await page.keyboard.press('l'); await wait(30); s = await st(page);
    is(await page.$('[data-k="card-1"].is-leapt') !== null && s.held === 1 && s.misses.every(x => x === 0), `${loc}: L leapfrogs the lifted card in place, not a pick`);
    /* to 10 */
    await force(page, '10', 'add', 0); s = await st(page); is(s.cards.every(c => c.a + c.b <= 10), `${loc}: numbers to 10`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    for (const [num, cards] of [['20', 'add'], ['20', 'take'], ['10', 'add'], ['10', 'take']]) for (const r of C.rounds()) {
      await force(sw.page, num, cards, r);
      for (const state of ['rest', 'miss2', 'solved']) {
        let s2 = await st(sw.page);
        if (state === 'miss2') { const w = s2.cards.findIndex((c, j) => j !== 0 && j !== twinOf(s2, 0)); for (let k = 0; k < 2; k++) { s2 = await st(sw.page); if (s2.held !== 0) await click(sw.page, '[data-k="card-0"]', ''); await click(sw.page, `[data-k="card-${w}"]`, `${loc} ${num}/${cards} r${r + 1} miss`); } }
        if (state === 'solved') { s2 = await st(sw.page); if (s2.held === 0) { await click(sw.page, `[data-k="card-${twinOf(s2, 0)}"]`, ''); } for (let i = 0; i < 6; i++) { s2 = await st(sw.page); if (s2.matched.indexOf(s2.cards[i].pair) >= 0) continue; await click(sw.page, `[data-k="card-${i}"]`, ''); await click(sw.page, `[data-k="card-${twinOf(s2, i)}"]`, ''); } }
        s2 = await st(sw.page); const tag = `${loc} ${num}/${cards} r${r + 1} ${state}`;
        if (state === 'miss2') is(s2.help === 0, `${tag}: reached`);
        if (state === 'solved') is(s2.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => { const a = window.LeapfrogPartsActivity, d = a._dims(), c = document.querySelector('.lp-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x);
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            Array.from(document.querySelectorAll('.lp-wrap button')).filter(b => b.offsetParent !== null).forEach(b => { const r = b.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) F('small ' + (b.getAttribute('data-k') || b.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + b.getAttribute('data-k')); if (state !== 'solved' && r.bottom > vh + 1) F('below the fold ' + b.getAttribute('data-k') + ' ' + Math.round(r.bottom)); });
            const nt = document.querySelector('.lp-note');
            if (state === 'miss2' && nt.textContent.trim() && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold');
            if (state === 'solved') { const p = document.querySelector('.lcs-activity-prompt'); if (p && p.getBoundingClientRect().bottom > vh + 1) F('the result bubble below the fold'); document.querySelectorAll('.lp-plate').forEach(b => { if (b.getBoundingClientRect().bottom > vh + 1) F('a twin plate below the fold'); }); }
            document.querySelectorAll('.lp-ptext, .lp-note:not(.is-ok)').forEach(e => { if (e.offsetParent && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            document.querySelectorAll('.lp-card').forEach(c => { const r = c.getBoundingClientRect(), s = c.querySelector('.lp-svg'); if (!s) return; Array.from(s.querySelectorAll('text, rect')).forEach(t => { const q = t.getBoundingClientRect(); if (q.width && (q.right > r.right + 1 || q.left < r.left - 1)) F('a part of a card drawn outside it'); }); });
            const cs = Array.from(document.querySelectorAll('.lp-card')).map(e => e.getBoundingClientRect());
            for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) { const x = cs[i], y = cs[j]; if (Math.min(x.right, y.right) - Math.max(x.left, y.left) > 2 && Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top) > 2) F('two cards overlap'); }
            const cube = Array.from(document.querySelectorAll('.lp-cube')).find(c => c.getBoundingClientRect().width > 0); if (cube) { const q = cube.getBoundingClientRect(); if (q.width < 11) F('cubes below 11 px: ' + q.width.toFixed(1)); }
            return out;
          }, state);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await wait(120);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-leapfrog-parts: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
