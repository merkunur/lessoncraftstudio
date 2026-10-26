#!/usr/bin/env node
/* =====================================================================
   local-test-point-of-view.js — ACTIVITY #119, The Window That Shows
   What It Sees, in a real browser with real pointer actions (windows
   tapped, parts of a story tapped and hung on windows, Check clicked), in
   all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (task: window / tellers; views: after / all);
     · From which window?: the story card; the panel shows no harbor
       object before a window is chosen; an empty Check → the empty hint,
       no miss; the high window → a drawn dot, never a picture; the middle
       → the object inside the frame; the low → the object cut off by the
       frame; a wrong window + Check → the view hint and the line's view
       words underlined; again → the three views side by side; a new choice
       takes them away; the right window → the success line naming the
       creature, the window waves, a page in Lumen's logbook;
     · "always all three views": three strips at rest;
     · Who tells each part?: a window with no part picked → the nudge; an
       empty Check; every part on a wrong window + Check → the hint names
       the creature at the wrong window, the parts come back; again → each
       creature's parts listed; the right windows → the success line;
     · the beam animates (not FAST).
   Then every round of both tasks at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, pictures
   ≥ 64 px (window creatures and the event ≥ 96 from 704), everything
   inside the card, no bands overlapping, no text cut off.
   Usage: node scripts/local-test-point-of-view.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '119-window-shows-what-it-sees', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'point-of-view-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, LumenWindowsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'point-of-view-activity.js'), 'utf8') + '\n;this.__A = window.PointOfViewActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
const WINS = ['high', 'mid', 'low'];
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
    await page.goto(`${base}/point-of-view-activity.html?activity=point-of-view.who-told.rl-1-6&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PointOfViewActivity && window.PointOfViewActivity.st && document.querySelector('.pv-foot .pv-check'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.PointOfViewActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* a round of a task, set through the settings the drawer writes */
  async function force(page, lv, r, views) {
    const ok = await page.evaluate((lv, r, views) => {
      const a = window.PointOfViewActivity; a.api.settings.task = lv; a.api.settings.views = views || 'after'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0);
      return a.st.level === lv && a.st.r === r;
    }, lv, r, views);
    if (!ok) throw new Error('force missed ' + lv + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.PointOfViewActivity.st; return { level: s.level, r: s.r, sel: s.sel || null, hang: s.hang || null, locked: s.locked || null, pick: s.pick == null ? null : s.pick, misses: s.misses, show: s.show, last: s.last, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.pv-note').textContent);
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
  const right2 = (loc, r) => { const S = C.round2(loc, r); return S.lines.map(l => C.winOf(S.chars, l.teller)); };
  async function solve(page, loc, tag) {
    const s = await st(page);
    if (s.level === 'window') { await click(page, K('win-' + C.DATA.L1[s.r].view), tag); }
    else { const rw = right2(loc, s.r); for (let i = 0; i < 3; i++) if (!s.locked[i]) { await click(page, K('part-' + i), tag); await click(page, K('win-' + rw[i]), tag); } }
    await click(page, K('check'), tag);
  }
  async function missTwice(page, loc, tag) {
    for (let k = 0; k < 2; k++) {
      const s = await st(page);
      if (s.level === 'window') { if (k === 0) await click(page, K('win-' + WINS.find(w => w !== C.DATA.L1[s.r].view)), tag); }
      else { const rw = right2(loc, s.r); for (let i = 0; i < 3; i++) if (!s.locked[i] && !s.hang[i]) { await click(page, K('part-' + i), tag); await click(page, K('win-' + WINS[(WINS.indexOf(rw[i]) + 1) % 3]), tag); } }
      await click(page, K('check'), tag);
    }
  }
  /* the view's geometry: is there a dot, a picture, and is the picture inside the frame or cut off by it */
  const viewGeo = (page) => page.evaluate(() => {
    const v = document.querySelector('.pv-view.kind-panel'); if (!v) return null; const r = v.getBoundingClientRect(), im = v.querySelector('img');
    const q = im && im.getBoundingClientRect();
    return { cls: v.className, dot: !!v.querySelector('.pv-dot'), img: !!im, inside: q ? (q.top >= r.top - 1 && q.bottom <= r.bottom + 1) : null, cut: q ? q.bottom > r.bottom + 4 : null, imgW: q ? q.width : 0, viewH: r.height };
  });

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.PointOfViewActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === '["task:window/tellers","views:after/all"]', `${loc}: the settings`);
    /* From which window? — the whale (high) and the crab (low) */
    tag = `${loc} window`; await force(page, 'window', 3); let R = C.round1(loc, 3);
    is(sp(await prompt(page)) === sp(T(loc, 'tWindow')) && sp(await page.evaluate(() => document.querySelector('.pv-line').textContent)) === sp(R.line) && await count(page, '.pv-win') === 3, `${tag}: the task line, the storyteller's words, three windows`);
    let g = await viewGeo(page); is(g && /v-rest/.test(g.cls) && !g.dot && !g.img, `${tag}: before a window is chosen the panel shows no harbor object`);
    await click(page, K('check'), tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmptyWindow')), `${tag}: an empty Check → the empty hint, no miss`);
    await click(page, K('win-high'), tag); g = await viewGeo(page); s = await st(page);
    is(s.sel === 'high' && g.dot && !g.img && await page.evaluate(() => document.querySelector('[data-k="win-high"]').getAttribute('aria-pressed') === 'true'), `${tag}: the high window → a drawn dot, never a picture`);
    await click(page, K('win-mid'), tag); g = await viewGeo(page); is(g.img && !g.dot && g.inside && g.imgW >= 95, `${tag}: the middle window → the object inside the frame (${Math.round(g.imgW)} px)`);
    await click(page, K('win-low'), tag); g = await viewGeo(page); is(g.img && g.cut && g.imgW > g.viewH * 0.8, `${tag}: the low window → the object huge and cut off by the frame`);
    await click(page, K('check'), tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintL1Miss1')) && await count(page, '.pv-line .pv-mk') === R.marks.length && await count(page, '.pv-view.kind-strip') === 0, `${tag}: a wrong window → the view hint, the line's ${R.marks.length} view words underlined`);
    await click(page, K('check'), tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintL1Miss2')) && await count(page, '.pv-view.kind-strip') === 3 && await count(page, '.pv-mk.is-pulse') === R.marks.length, `${tag}: miss 2 → the three views side by side, the words pulse`);
    await click(page, K('win-mid'), tag); is(await count(page, '.pv-view.kind-strip') === 0 && await count(page, '.pv-mk') === 0, `${tag}: a new choice takes them away`);
    await click(page, K('win-high'), tag); await click(page, K('check'), tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okHigh', { name: C.name(loc, R.chars.high) })) && await has(page, '[data-k="win-high"].is-wave') && await count(page, '.pv-tab.is-on') === 1, `${tag}: the right window → the success line naming the creature, a wave, a page in the logbook`);
    is(await page.evaluate(() => [...document.querySelectorAll('.pv-win')].every(b => b.disabled)), `${tag}: the windows rest once solved`);
    tag = `${loc} window low`; await force(page, 'window', 4); await click(page, K('win-low'), tag); await click(page, K('check'), tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okLow', { name: C.name(loc, C.round1(loc, 4).chars.low) })), `${tag}: the crab round → solved from the low window`);
    /* all three views at rest */
    tag = `${loc} all views`; await force(page, 'window', 9, 'all');
    is(await count(page, '.pv-view.kind-strip') === 3 && await count(page, '.pv-view.kind-panel') === 0 && await count(page, '.pv-view.v-high .pv-dot') === 1 && await count(page, '.pv-view.v-high img') === 0, `${tag}: three strips at rest, the high one a dot`);
    /* Who tells each part? */
    tag = `${loc} tellers`; await force(page, 'tellers', 1); const rw = right2(loc, 1), S = C.round2(loc, 1);
    is(sp(await prompt(page)) === sp(T(loc, 'tTellers')) && await count(page, '.pv-part') === 3, `${tag}: the task line, three parts`);
    await click(page, K('win-low'), tag); is(sp(await note(page)) === sp(T(loc, 'nudgeTellers')), `${tag}: a window with no part picked → the nudge`);
    await click(page, K('part-0'), tag); await click(page, K('win-' + rw[0]), tag); s = await st(page);
    is(s.hang[0] === rw[0] && await count(page, '.pv-rail [data-k="part-0"]') === 1 && await count(page, '.pv-slot') === 1, `${tag}: the part hangs beside its window, an empty slot in the story`);
    await click(page, K('check'), tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmptyTellers')), `${tag}: an empty Check → no miss`);
    await click(page, K('part-0'), tag); await click(page, K('win-' + rw[0]), tag); s = await st(page); is(s.hang[0] === null, `${tag}: on its window again → it comes off`);
    const wrongW = rw.map(w => WINS[(WINS.indexOf(w) + 1) % 3]);
    for (let i = 0; i < 3; i++) { await click(page, K('part-' + i), tag); await click(page, K('win-' + wrongW[i]), tag); }
    await click(page, K('check'), tag); s = await st(page);
    const l0 = S.lines[0], who = S.chars[wrongW[0]], D = C.DATA[loc];
    const want = l0.clue === 'part' ? T(loc, 'hintPart', { name: D.names[who], nameAd: D.nameAd[who], hp: l0.hp }) : T(loc, 'hintView', { name: D.names[who] });
    is(s.misses === 1 && s.hang.every(h => h === null) && sp(await note(page)) === sp(want) && await count(page, '.pv-win.is-search') === 3, `${tag}: every part wrong → «${sp(await note(page))}», the parts come back`);
    for (let i = 0; i < 3; i++) { await click(page, K('part-' + i), tag); await click(page, K('win-' + wrongW[i]), tag); }
    await click(page, K('check'), tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintL2Miss2')) && await count(page, '.pv-parts') === 3 && await count(page, '.pv-part .pv-mk') === 3, `${tag}: miss 2 → each creature's parts listed, the part words underlined`);
    for (let i = 0; i < 3; i++) { await click(page, K('part-' + i), tag); await click(page, K('win-' + rw[i]), tag); }
    await click(page, K('check'), tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okTellers')) && await count(page, '.pv-rail .pv-part.is-ok') === 3, `${tag}: the right windows → the success line, every part beside its teller`);
    /* the beam, animated */
    tag = `${loc} animated`; await force(page, 'window', 0);
    await page.evaluate(() => { window.PointOfViewActivity.FAST = false; });
    await click(page, K('win-high'), tag); await click(page, K('check'), tag); await wait(100);
    is(await has(page, '.pv-house.beam-high') && await page.evaluate(() => document.querySelector('.pv-check').disabled), `${tag}: Lumen's beam swings to the window, Check waits`);
    await wait(1000); s = await st(page); is(s.done, `${tag}: then the result`);
    await page.evaluate(() => { window.PointOfViewActivity.FAST = true; });
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.pv-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.pv-frame img,.pv-evpic img,.pv-obj.o-mid img,.pv-lumen img').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(), big = !!e.closest('.pv-frame,.pv-evpic'); if (q.width < 63.5 || (big && Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.pv-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.pv-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.pv-wrap')).getBoundingClientRect();
    document.querySelectorAll('.pv-story,.pv-part,.pv-win,.pv-view,.pv-rail,.pv-check,.pv-log').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const band = ['.pv-top', '.pv-main', '.pv-foot', '.pv-note', '.pv-log'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.pv-line,.pv-event,.pv-part,.pv-parts,.pv-note,.pv-name').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    /* a part beside its window stays inside its rail; the rail inside the card */
    document.querySelectorAll('.pv-rail').forEach(r => { const q = r.getBoundingClientRect(); r.querySelectorAll('.pv-part').forEach(p => { const z = p.getBoundingClientRect(); if (z.bottom > q.bottom + 1 || z.top < q.top - 1) out.fails.push('a part spills out of its rail'); }); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lv of C.LEVELS) for (const r of C.rounds(lv)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${lv} ${r} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lv, r);
      if (state === 'solved') await solve(page, loc, t0); else if (state === 'miss2') await missTwice(page, loc, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses >= 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${lv} ${r} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.PointOfViewActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.pv-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
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
  console.log(`local-test-point-of-view: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
