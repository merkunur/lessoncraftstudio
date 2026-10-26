#!/usr/bin/env node
/* =====================================================================
   local-test-verb-gates.js — ACTIVITY #123, The Verb Gates (Vera's Verb
   Match, L.1.1.c), in a real browser with real pointer actions (gates
   tapped onto the gateway, the hung gate tapped to take it down, the
   house tapped, Check clicked), in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (sv/da/no three levels, the rest five; who is coming
       hidden / shown);
     · at rest the crowd is in the house (not shown); an empty Check → the
       empty hint, no miss;
     · a crowd at the turnstile → one walks into the garden, the rest sit
       behind it, the turnstile hint; Check again → the right gate glows;
       the hung gate tapped → it comes down, the glow goes; the right gate
       → everyone in the garden, the success line, a flower;
     · one alone at the double gate → it waits, the two-or-more hint;
     · the star at the turnstile (a level with a star door) → the star
       hint; a crowd at the star door → the star-door hint;
     · sv/da/no: an en-word at the t-turnstile → the gender hint and the
       article clue;
     · the house tapped → the crowd walks out with no miss and walks back;
       "show who is coming" → the crowd stands outside the house at rest.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, the hint and the success
   line in view, controls ≥ 44 px, pictures ≥ 64 px (≥ 96 from 560 wide),
   the crowd inside the path, everything inside the card, no text cut off.
   Usage: node scripts/local-test-verb-gates.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '123-verb-gates', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'verb-gates-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, VerbGatesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'verb-gates-activity.js'), 'utf8') + '\n;this.__A = window.VerbGatesActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 120) console.error('   FAIL: ' + m); } };
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
    await page.goto(`${base}/verb-gates-activity.html?activity=vera-verb-match.be-agreement.l-1-1-c&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.VerbGatesActivity && window.VerbGatesActivity.st && document.querySelector('.vg-rack'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.VerbGatesActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, show) {
    const ok = await page.evaluate((lvl, r, show) => {
      const a = window.VerbGatesActivity; a.api.settings.level = lvl; a.api.settings.show = show || 'hide'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, show);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.VerbGatesActivity.st; return { r: s.r, lvl: s.lvl, hung: s.hung, misses: s.misses, show: s.show, last: s.last, reason: s.reason, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.vg-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const text = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent : null; }, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const gate = (page, shape, tag) => click(page, K('gate-' + shape), tag);
  const check = (page, tag) => click(page, K('check'), tag);
  const sentence = (rd) => C.filled(rd, rd.right).replace(/[.!]$/, '');
  const find = (loc, lvl, f) => C.rounds().find(r => f(C.round(loc, lvl, r)));

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    const L = C.levels(loc);
    is(JSON.stringify(await page.evaluate(() => window.VerbGatesActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === JSON.stringify(['level:' + L.join('/'), 'show:hide/show']), `${loc}: the settings`);
    /* a crowd round */
    const mr = find(loc, '1', rd => rd.right === 'many' && !rd.crowd.star), rd = C.round(loc, '1', mr), N = C.size(rd);
    tag = `${loc} L1.${mr + 1}`; await force(page, '1', mr);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 't1')), `${tag}: the task line`);
    is(await count(page, '.vg-m') === 0 && sp(await text(page, '.vg-sign')) === sp(rd.sign) && await count(page, '.vg-gap') === 1 && await count(page, '.vg-gate') === rd.gates.length, `${tag}: at rest the crowd is inside, the house sign reads the subject, a gap, the rack`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → the empty hint, no miss`);
    const one = rd.gates.find(g => g.shape === 'one') ? 'one' : 'oneT';
    await gate(page, one, tag); s = await st(page);
    is(s.hung === one && sp(await text(page, '.vg-hw')) === sp(C.word(rd, one)), `${tag}: the turnstile hangs; its word fills the gap`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '.vg-arrived .vg-m') === 1 && await count(page, '.vg-queue .vg-m.is-sit') === N - 1, `${tag}: one walks through, ${N - 1} sit behind the turnstile`);
    is(sp(await note(page)) === sp(T(loc, 'missOne')), `${tag}: the turnstile hint`);
    await check(page, tag); is(await count(page, '.vg-gate.is-glow') === 1 && await count(page, K('gate-many') + '.is-glow') === 1 && sp(await note(page)) === sp(T(loc, 'missGlow')), `${tag}: miss 2 → the right gate glows`);
    await click(page, K('hung'), tag); s = await st(page); is(s.hung === null && await count(page, '.vg-gate.is-glow') === 0 && await count(page, '.vg-empty') === 1, `${tag}: the hung gate tapped → it comes down, the glow goes`);
    await gate(page, 'many', tag); await check(page, tag); s = await st(page);
    is(s.done && await count(page, '.vg-arrived .vg-m') === N && await count(page, '.vg-queue .vg-m') === 0, `${tag}: the double gate → everyone in the garden`);
    is(sp(await note(page)) === sp(T(loc, 'okMany', { s: sentence(rd), W: C.word(rd, 'many').toLocaleUpperCase(loc) })) && await count(page, '.vg-fl.on') === 1, `${tag}: the success line, a flower`);
    /* one alone at the double gate */
    const orr = find(loc, '1', x => x.right === 'one' && !x.crowd.star); tag = `${loc} L1.${orr + 1}`; await force(page, '1', orr);
    await gate(page, 'many', tag); await check(page, tag);
    is(await count(page, '.vg-queue .vg-m.is-wait') === 1 && await count(page, '.vg-arrived .vg-m') === 0 && sp(await note(page)) === sp(T(loc, 'missTwo')), `${tag}: one alone waits at the double gate; the two-or-more hint`);
    /* the star */
    const sr = find(loc, '1', x => x.crowd.star && x.crowd.n === 0);
    if (sr != null) {
      const srd = C.round(loc, '1', sr); tag = `${loc} L1.${sr + 1} star`; await force(page, '1', sr);
      await gate(page, srd.starDoor ? 'one' : 'many', tag); await check(page, tag);
      is(await count(page, '.vg-m.is-star') === 1 && sp(await note(page)) === sp(T(loc, 'missMe')), `${tag}: the star alone at the wrong gate → the star hint`);
      await click(page, K('hung'), tag); await gate(page, srd.right, tag); await check(page, tag); s = await st(page);
      is(s.done && await count(page, '.vg-arrived .vg-m.is-star') === 1 && sp(await note(page)) === sp(T(loc, 'okMe', { s: sentence(srd), W: C.word(srd, srd.right).toLocaleUpperCase(loc) })), `${tag}: the star goes through; I, so …`);
      if (srd.starDoor) {
        tag = `${loc} L1.${mr + 1} star door`; await force(page, '1', mr); await gate(page, 'star', tag); await check(page, tag);
        is(await count(page, '.vg-queue .vg-m.is-bump') === N && sp(await note(page)) === sp(T(loc, 'missStar')), `${tag}: a crowd bumps off the star door`);
      }
    }
    /* sv/da/no: the gender gate */
    if (C.round(loc, '1', 0).hasT) {
      const gr = find(loc, '1', x => x.right === 'oneT' && x.art), grd = C.round(loc, '1', gr); tag = `${loc} L1.${gr + 1} gender`; await force(page, '1', gr);
      await gate(page, 'one', tag); await check(page, tag);
      is(sp(await note(page)) === sp(T(loc, 'missGender')) && sp(await text(page, '.vg-ghost')) === sp(grd.art), `${tag}: the plain turnstile refuses an ett/et-word; the clue «${grd.art}»`);
      await gate(page, 'oneT', tag); await check(page, tag); s = await st(page);
      is(s.done && sp(await note(page)) === sp(T(loc, 'okT', { s: sentence(grd), W: C.word(grd, 'oneT').toLocaleUpperCase(loc) })), `${tag}: the t-turnstile turns`);
    }
    /* the house: sent out without Check; show who */
    tag = `${loc} house`; await force(page, '1', mr);
    await page.evaluate(() => { window.VerbGatesActivity.FAST = false; });
    await gate(page, 'many', tag); await click(page, K('house'), tag); s = await st(page);
    is(s.misses === 0 && !s.done && await count(page, '.vg-arrived .vg-m') === N && await count(page, '.vg-hung.is-open') === 1, `${tag}: the house tapped → the crowd walks through, no miss, not solved`);
    await wait(2300); is(await count(page, '.vg-m') === 0, `${tag}: they walk back home`);
    await page.evaluate(() => { window.VerbGatesActivity.FAST = true; });
    await force(page, '1', mr, 'show'); is(await count(page, '.vg-queue .vg-m') === N, `${loc}: "show who is coming" → the crowd stands outside at rest`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] }, wide = document.querySelector('.vg-wrap').classList.contains('is-wide');
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.vg-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.vg-m img').forEach(e => { if (!vis(e)) return; const w = e.getBoundingClientRect().width; if (w < 63.5 || (wide && w < 95.5)) out.fails.push('picture ' + Math.round(w)); });
    const ck = document.querySelector('.vg-check').getBoundingClientRect(); out.cBottom = ck.bottom;
    const nr = document.querySelector('.vg-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.vg-wrap')).getBoundingClientRect();
    document.querySelectorAll('.vg-strip,.vg-scene,.vg-gate,.vg-check,.vg-hung,.vg-house').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const sc = document.querySelector('.vg-scene').getBoundingClientRect();
    document.querySelectorAll('.vg-m,.vg-ghost').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < sc.left - 2 || q.right > sc.right + 2 || q.bottom > sc.bottom + 2) out.fails.push(String(e.className).split(' ')[0] + ' outside the path'); });
    const band = ['.vg-strip', '.vg-scene', '.vg-rack', '.vg-foot', '.vg-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const zones = ['.vg-home', '.vg-gw', '.vg-garden'].map(s => document.querySelector(s).getBoundingClientRect());
    for (let i = 1; i < zones.length; i++) { const a = zones[i - 1], b = zones[i]; if (a.right > b.left + 1 && a.bottom > b.top + 1) out.fails.push('two zones of the path overlap'); }
    document.querySelectorAll('.vg-words,.vg-gw-word,.vg-note,.vg-sign').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lvl of C.levels(loc)) for (const r of C.rounds()) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} L${lvl}.${r + 1} ${state}`, rd = C.round(loc, lvl, r);
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r);
      if (state === 'solved') { await gate(page, rd.right, t0); await check(page, t0); }
      else if (state === 'miss2') { await gate(page, rd.gates.find(g => g.shape !== rd.right).shape, t0); await check(page, t0); await check(page, t0); }
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} L${lvl}.${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.VerbGatesActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.vg-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the ${state === 'solved' ? 'success line' : 'hint'} in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r % 3 === 0) await page.screenshot({ path: path.join(SHOT_DIR, `L${lvl}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-verb-gates: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
