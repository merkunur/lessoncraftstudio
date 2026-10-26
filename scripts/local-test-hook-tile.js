#!/usr/bin/env node
/* =====================================================================
   local-test-hook-tile.js — ACTIVITY #122, The Hook Tile (Hattie's
   Whose-Is-It, L.1.1.b), in a real browser with real pointer actions
   (tiles tapped into the slot, the slot tapped to pull, Check clicked),
   in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (level 1 / 2 / 3; hooks shown / plain);
     · an empty Check → the empty hint, no miss;
     · en/fi: the plural tile in a possession round → one more owner
       stands on the shelf, the thing stays in the basket, the twin hint;
       a hook in a plural round dangles empty → the dangle hint; the
       plural fills the shelf → solved;
     · a wrong hook → the thing slips back, the rule hint, the clue (the
       owner's article, or the name's last letter); Check again → the right
       tile glows; the slot tapped → the tile comes out;
     · the right hook → the thing hangs on the owner's peg, the success
       line names the finished words, a tag hangs on the wall;
     · names on name cards; plain tiles show no hook; the swing (not FAST).
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, the hint and the success
   line in view, controls ≥ 44 px, pictures ≥ 64 px (≥ 96 from 560 wide),
   everything inside the card, no text cut off.
   Usage: node scripts/local-test-hook-tile.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '122-hook-tile', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'hook-tile-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, HookTileCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'hook-tile-activity.js'), 'utf8') + '\n;this.__A = window.HookTileActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/hook-tile-activity.html?activity=hattie-whose-is-it.possessive.l-1-1-b&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.HookTileActivity && window.HookTileActivity.st && document.querySelector('.hk-tray'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.HookTileActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, hook) {
    const ok = await page.evaluate((lvl, r, hook) => {
      const a = window.HookTileActivity; a.api.settings.level = lvl; a.api.settings.hook = hook || 'show'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, hook);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.HookTileActivity.st; return { r: s.r, lvl: s.lvl, slot: s.slot, misses: s.misses, show: s.show, last: s.last, reason: s.reason, done: s.done, tray: s.tray }; });
  const note = (page) => page.evaluate(() => document.querySelector('.hk-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const has = (page, sel) => page.evaluate((s) => !!document.querySelector(s), sel);
  const K = (k) => `[data-k="${k}"]`;
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  /* a tile by its text: the tray order is planned, so find its button */
  async function tap(page, tile, tag) { const s = await st(page); const i = s.tray.indexOf(tile); if (i < 0) { is(false, `${tag}: «${tile}» is in the tray`); return; } await click(page, K('tile-' + i), tag); }
  const check = (page, tag) => click(page, K('check'), tag);
  const owners = (page) => count(page, '.hk-owner,.hk-card');
  const phrase = (rd, t) => { const p = C.filled(rd, t).replace(/[.!]$/, ''); return p.charAt(0).toUpperCase() + p.slice(1); };

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.HookTileActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === '["level:1/2/3","hook:show/plain"]', `${loc}: the settings`);
    const plural = C.DATA[loc].plural;
    /* a possession round of level 1 */
    const pr = C.rounds().find(r => C.round(loc, '1', r).kind === 'poss'); const rd = C.round(loc, '1', pr);
    tag = `${loc} L1.${pr + 1}`; await force(page, '1', pr);
    is(sp((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent))) === sp(T(loc, 't1')) && await count(page, '.hk-tile') === rd.tiles.length && await has(page, '.hk-basket .hk-thing') && await count(page, '.hk-slot') === 1, `${tag}: the owner, the thing in the basket, an empty slot, the tray`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → the empty hint, no miss`);
    if (plural) {
      await tap(page, plural, tag); is(await owners(page) === rd.n0 + 1 && await has(page, '.hk-basket .hk-thing'), `${tag}: the plural makes one more owner; the thing stays`);
      await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'missTwin')), `${tag}: the twin hint`);
    } else {
      const wr = rd.tiles.find(t => t !== rd.right);
      await tap(page, wr, tag); s = await st(page); is(s.slot === wr && await has(page, '.hk-basket .hk-thing') && !(await has(page, '.hk-hang')), `${tag}: a wrong hook slips; the thing stays in the basket`);
      await check(page, tag); s = await st(page);
      is(s.misses === 1 && sp(await note(page)) === sp(C.ruleText(loc, rd.owner.name ? 'missName' : 'missNoun')), `${tag}: the rule hint`);
      is(rd.art ? sp(await page.evaluate(() => (document.querySelector('.hk-art-ghost') || {}).textContent)) === sp(rd.art) : rd.owner.name && ['es', 'it', 'pt'].indexOf(loc) < 0 ? await has(page, '.hk-last') : true, `${tag}: the clue shows the reason`);
      await check(page, tag); is(await count(page, '.hk-tile.is-glow') === 1 && sp(await note(page)) === sp(T(loc, 'missGlow')), `${tag}: miss 2 → the right tile glows`);
      await click(page, K('slot'), tag); s = await st(page); is(s.slot === null && await count(page, '.hk-tile.is-glow') === 0, `${tag}: the slot tapped → the tile comes out, the glow goes`);
    }
    await tap(page, rd.right, tag); is(await has(page, '.hk-hang img') && !(await has(page, '.hk-basket .hk-thing')), `${tag}: the right hook hangs the thing on the owner's peg`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okPoss', { phrase: phrase(rd, rd.right) })) && await count(page, '.hk-tag') === 1, `${tag}: solved → the success line, a tag on the wall`);
    /* en/fi: a plural round */
    if (plural) {
      const pl = C.rounds().find(r => C.round(loc, '1', r).kind === 'plural'), rp = C.round(loc, '1', pl); tag = `${loc} L1.${pl + 1} plural`;
      await force(page, '1', pl); is(await owners(page) === rp.n0 && !(await has(page, '.hk-basket .hk-thing')), `${tag}: owners already on the shelf, nothing in the basket`);
      await tap(page, rp.tiles.find(t => t !== plural), tag); is(await has(page, '.hk-dangle'), `${tag}: a hook dangles empty`);
      await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'missDangle')), `${tag}: the dangle hint`);
      await tap(page, plural, tag); await check(page, tag); s = await st(page);
      is(s.done && await owners(page) === rp.n && sp(await note(page)) === sp(T(loc, 'okMany', { phrase: phrase(rp, plural) })), `${tag}: the plural → solved`);
    }
    /* level 3 names, plain tiles */
    const nr = C.rounds().find(r => C.round(loc, '3', r).owner.name); tag = `${loc} L3 names`;
    if (nr != null) { await force(page, '3', nr, 'plain'); is(await count(page, '.hk-card') === 1 && await count(page, '.hk-hook') === 0, `${tag}: a name card; plain tiles show no hook`); }
    await force(page, '1', pr, 'show'); is(await count(page, '.hk-hook') >= 1, `${loc}: hooks shown by default`);
    /* the swing */
    await page.evaluate(() => { window.HookTileActivity.FAST = false; }); await tap(page, rd.right, `${loc} swing`);
    is(await has(page, '.hk-hang.is-swing'), `${loc}: the thing swings on its peg`);
    await page.evaluate(() => { window.HookTileActivity.FAST = true; });
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] }, wide = document.querySelector('.hk-wrap').classList.contains('is-wide');
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.hk-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.hk-owner img,.hk-thing img,.hk-hang img').forEach(e => { if (!vis(e)) return; const w = e.getBoundingClientRect().width; if (w < 63.5 || (wide && w < 95.5)) out.fails.push('picture ' + Math.round(w)); });
    const ck = document.querySelector('.hk-check').getBoundingClientRect(); out.cBottom = ck.bottom;
    const nr = document.querySelector('.hk-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.hk-wrap')).getBoundingClientRect();
    document.querySelectorAll('.hk-scene,.hk-bar,.hk-tile,.hk-check,.hk-owner,.hk-card,.hk-basket').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const band = ['.hk-wall', '.hk-scene', '.hk-bar', '.hk-tray', '.hk-foot', '.hk-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.hk-words,.hk-tile,.hk-note,.hk-card').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    const sh = document.querySelector('.hk-owners'); if (sh && vis(sh)) { const q = sh.getBoundingClientRect(), s2 = document.querySelector('.hk-shelf').getBoundingClientRect(); if (q.right > s2.right + 2 || q.left < s2.left - 2) out.fails.push('owners spill off the shelf'); }
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lvl of C.LEVELS) for (const r of C.rounds()) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} L${lvl}.${r + 1} ${state}`, rd = C.round(loc, lvl, r);
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r);
      if (state === 'solved') { await tap(page, rd.right, t0); await check(page, t0); }
      else if (state === 'miss2') { await tap(page, rd.tiles.find(t => t !== rd.right), t0); await check(page, t0); await check(page, t0); }
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} L${lvl}.${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.HookTileActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.hk-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
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
  console.log(`local-test-hook-tile: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
