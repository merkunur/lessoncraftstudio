#!/usr/bin/env node
/* =====================================================================
   local-test-event-tunnel.js — ACTIVITY #127, The Event Tunnel (Tempo's
   Day Plan, L.1.1.i), in a real browser with real pointer actions
   (phrases tapped into the gap and back, the lantern tapped, stretches
   tapped, cards picked and placed, Check clicked), in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (four levels; stretches hidden / shown);
     · level 1: the task line, the card on its stretch, the event picture,
       three phrases; an empty Check → the hint, no miss; the lantern
       tapped with a phrase chosen → it lights that stretch, no miss; a
       wrong phrase → Check → the lantern lights its stretch, its hint;
       Check again → the card's stretch glows and the right phrase glows;
       the gap tapped → the phrase comes out; the right phrase → solved;
     · level 3: an empty Check → the hint; a wrong stretch → the place
       hint, the lantern lights the sentence's stretch; the right one →
       solved;
     · level 4: an empty Check → the hint; wrong stretches → the cards
       come back; the right plan → solved;
     · "show the three stretches" outlines them.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, the hint and the success
   line in view, controls ≥ 44 px, everything inside the card, no text
   cut off, the card inside its stretch, no two bands on top of each other.
   Usage: node scripts/local-test-event-tunnel.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '127-event-tunnel', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'event-tunnel-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, EventTunnelCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'event-tunnel-activity.js'), 'utf8') + '\n;this.__A = window.EventTunnelActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/event-tunnel-activity.html?activity=tempo-day-plan.time-prepositions.l-1-1-i&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.EventTunnelActivity && window.EventTunnelActivity.st && document.querySelector('.et-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.EventTunnelActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, stretches) {
    const ok = await page.evaluate((lvl, r, stretches) => {
      const a = window.EventTunnelActivity; a.api.settings.level = lvl; a.api.settings.stretches = stretches || 'hide'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, stretches);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.EventTunnelActivity.st; return { r: s.r, lvl: s.lvl, chosen: s.chosen, at: s.at, sel: s.sel, misses: s.misses, show: s.show, last: s.last, reason: s.reason, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.et-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const check = (page, tag) => click(page, K('check'), tag);
  async function planAll(page, rd, zoneOf, tag) { for (let k = 0; k < 3; k++) { const s = await st(page); if (s.at[k] != null) continue; await click(page, K('card-' + k), tag); await click(page, K('zone-' + zoneOf(k)), tag); } }
  const wrongPlan = (rd) => { const used = new Set(), out = []; for (let k = 0; k < 3; k++) { const z = rd.zones.filter(z => z !== rd.items[k].target && !used.has(z))[0]; used.add(z); out.push(z); } return (k) => out[k]; };
  async function reach(page, rd, state, tag) {
    if (state === 'rest') return true;
    if (rd.kind === 'name') {
      if (state === 'solved') { await click(page, K('word-' + rd.stretch), tag); await check(page, tag); return true; }
      await click(page, K('word-' + rd.rack.find(w => w !== rd.stretch)), tag); await check(page, tag); await check(page, tag); return true;
    }
    if (rd.kind === 'place') {
      if (state === 'solved') { await click(page, K('zone-' + rd.stretch), tag); await check(page, tag); return true; }
      await click(page, K('zone-' + rd.zones.find(z => z !== rd.stretch)), tag); await check(page, tag); await check(page, tag); return true;
    }
    if (state === 'solved') { await planAll(page, rd, (k) => rd.items[k].target, tag); await check(page, tag); return true; }
    const wz = wrongPlan(rd); await planAll(page, rd, wz, tag); await check(page, tag); await planAll(page, rd, wz, tag); await check(page, tag); return true;
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.EventTunnelActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === JSON.stringify(['level:1/2/3/4', 'stretches:hide/show']), `${loc}: the settings`);
    /* level 1: a past-the-exit round */
    const r1 = C.rounds('1').find(r => C.round(loc, '1', r).stretch === 'a'), rd = C.round(loc, '1', r1);
    tag = `${loc} L1.${r1 + 1}`; await force(page, '1', r1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 't1')), `${tag}: the task line`);
    is(await count(page, '.et-road .et-zone') === 3 && await count(page, '.et-zone.z-a .et-act') === 1 && await count(page, '.et-pic') === 1 && await count(page, '.et-word') === 3, `${tag}: three stretches, the card past the tunnel, the picture, three phrases`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintPick')), `${tag}: an empty Check → the hint, no miss`);
    await click(page, K('word-b'), tag); await click(page, K('lamp'), tag); s = await st(page);
    is(s.misses === 0 && await count(page, '.et-zone.z-b.is-lit') === 1 && await count(page, '.et-lamp.at-b') === 1, `${tag}: the lantern tapped → it lights the stretch in front, no miss`);
    await click(page, K('word-d'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'missLitD')) && await count(page, '.et-zone.z-d.is-lit') === 1, `${tag}: during → the lantern lights the tunnel, «${sp(await note(page))}»`);
    await check(page, tag); is(await count(page, '.et-zone.z-a.is-glow') === 1 && await count(page, K('word-a') + '.is-glow') === 1 && sp(await note(page)) === sp(T(loc, 'missGlow')), `${tag}: miss 2 → the card's stretch and the right phrase glow`);
    await click(page, K('gap'), tag); s = await st(page); is(s.chosen === null && await count(page, '.et-gap') === 1, `${tag}: the gap tapped → the phrase comes out`);
    await click(page, K('word-a'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okA', { s: C.sentence(rd, 'a').replace(/[.!]$/, '') })) && await count(page, '.et-zone.z-a.is-lit .et-act.is-ok') === 1, `${tag}: after → solved, the card glows in the lit stretch`);
    /* level 3 */
    const x3 = C.round(loc, '3', 4); tag = `${loc} L3.5`; await force(page, '3', 4);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintPlace')), `${tag}: an empty Check → the hint`);
    const wz = x3.zones.find(z => z !== x3.stretch); await click(page, K('zone-' + wz), tag);
    is(await count(page, '.et-zone.z-' + wz + ' .et-act') === 1, `${tag}: the card stands where it was tapped`);
    await check(page, tag); s = await st(page); is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'missPlace')) && await count(page, '.et-zone.z-' + x3.stretch + '.is-lit') === 1, `${tag}: the wrong stretch → the place hint, the lantern lights the sentence's stretch`);
    await click(page, K('zone-' + x3.stretch), tag); await check(page, tag); is((await st(page)).done, `${tag}: the right stretch → solved`);
    /* level 4 */
    const x4 = C.round(loc, '4', 0); tag = `${loc} L4.1`; await force(page, '4', 0);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintPlan')), `${tag}: an empty Check → the hint`);
    await planAll(page, x4, wrongPlan(x4), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.at.every(x => x === null) && await count(page, '.et-shelf .et-card') === 3 && sp(await note(page)) === sp(T(loc, 'missPlan')), `${tag}: wrong stretches → the cards come back`);
    await planAll(page, x4, (k) => x4.items[k].target, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okPlan')), `${tag}: the right plan → solved`);
    await force(page, '1', r1, 'show'); is(await page.evaluate(() => document.querySelector('.et-wrap').classList.contains('show-stretch')), `${loc}: "show the three stretches" outlines them`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.et-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + String(e.className).split(' ')[0] + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.et-check'); out.cBottom = ck && vis(ck) ? ck.getBoundingClientRect().bottom : 0;
    const nr = document.querySelector('.et-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.et-wrap')).getBoundingClientRect();
    document.querySelectorAll('.et-strip,.et-scene,.et-rack,.et-shelf,.et-word,.et-card,.et-check').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const sc = document.querySelector('.et-scene').getBoundingClientRect();
    document.querySelectorAll('.et-pic,.et-lamp').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < sc.left - 1 || q.right > sc.right + 1 || q.top < sc.top - 1 || q.bottom > sc.bottom + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the scene'); });
    document.querySelectorAll('.et-zone').forEach(z => { const q = z.getBoundingClientRect(); z.querySelectorAll('.et-act,.et-pin').forEach(a => { const r = a.getBoundingClientRect(); if (r.left < q.left - 2 || r.right > q.right + 2) out.fails.push('a card wider than its stretch'); }); });
    const band = ['.et-strip', '.et-scene', '.et-rack', '.et-shelf', '.et-foot', '.et-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.et-sent,.et-word,.et-card,.et-act,.et-note,.et-li').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lvl of C.levels()) for (const r of C.rounds(lvl)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} L${lvl}.${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r);
      const rd = await page.evaluate(() => JSON.parse(JSON.stringify(window.EventTunnelActivity.st.rd)));
      if (!(await reach(page, rd, state, t0))) continue;
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} L${lvl}.${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.EventTunnelActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.et-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
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
  console.log(`local-test-event-tunnel: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
