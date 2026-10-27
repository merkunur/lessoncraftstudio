#!/usr/bin/env node
/* =====================================================================
   local-test-what-for-tags.js — ACTIVITY #133, The What-For Tags (Jasper's
   Just-Right Bag, L.1.5.c), in a real browser with real pointer clicks and
   one real drag, in all 11 locales.
   Scenarios per locale (at 1024):
     · level 1: Go with empty hooks → the hint, no miss, the hooks swing;
       two things swapped + two right → Go: the two right lock, the two wrong
       go home with their tags open, the hint; two untried things → miss 2:
       the still-wanted things hop; all right → the success line, Next
       0.5 s later; a hanging thing tapped goes home; "picture only" hides
       the sentences; the eight-thing bag;
     · a real drag of a thing from the bag onto a hook;
     · level 2: Go with no copy → the hint; a right and a wrong copy → the
       right one locks, the wrong one comes off, the tag opens; the rest →
       done;
     · level 3: Go empty → the hint; two swapped → four lock, two go home;
       fixed → done.
   Then every round of every level (level 1 also with eight things and in
   picture-only mode) at rest, at miss 2 and solved — reached ONCE per
   locale by real clicks, then resized through 320…1366: no sideways scroll,
   Go above the fold, the hint / result in view, controls ≥ 44 px, nothing
   outside the card, no clipped text, no two windows / things / hooks on top
   of each other, pictures ≥ their floor and loaded, no console errors.
   Usage: node scripts/local-test-what-for-tags.js [--widths=…] [--locales=…] [--levels=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', '1,2,3').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'what-for-tags-core.js'));
const ACT = (() => { const ctx = { window: {}, WhatForTagsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'what-for-tags-activity.js'), 'utf8') + '\n;this.__A = window.WhatForTagsActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => String(ACT.strings[k][loc]);
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 150) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(IMGROOT, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    if (p.startsWith('/image-library-webp/')) { const d = path.dirname(file); if (!fs.existsSync(d) || !fs.readdirSync(path.dirname(d)).includes(path.basename(d)) || !fs.readdirSync(d).includes(path.basename(file))) { res.statusCode = 404; res.end(); return; } }
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
    await page.goto(`${base}/what-for-tags-activity.html?activity=jasper-just-right.real-life.l-1-5-c&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.WhatForTagsActivity && window.WhatForTagsActivity.st && document.querySelector('.wt-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.WhatForTagsActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, o) {
    o = o || {};
    const ok = await page.evaluate((lvl, r, o) => {
      const a = window.WhatForTagsActivity; a.api.settings.level = lvl; a.api.settings.bag = o.bag || '6'; a.api.settings.words = o.words || 'text'; a._pool = null; a._plan = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, o);
    if (!ok) throw new Error('force failed ' + lvl + '/' + r);
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center', inline: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + Math.min(r.height / 2, 20), hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    try { const b = await h.boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + Math.min(b.height / 2, 20)); } catch (e) { if (!/detached/.test(String(e))) throw e; await wait(80); const h2 = await page.$(sel); if (!h2) return false; await h2.click(); }
    await wait(40); return true;
  }
  const hang = async (page, j, h, what) => { await click(page, `[data-k="thing-${j}"]`, what + ' thing'); await click(page, `[data-k="hook-${h}"]`, what + ' hook'); };
  const st = (page) => page.evaluate(() => { const s = window.WhatForTagsActivity.st; return { hook: s.hook, locked: s.locked, open: s.open, misses: s.misses, done: s.done, last: s.last, right: s.rd.right, home: s.rd.home, fits: s.rd.windows.map(w => !!w.fits), glow: s.glow, n: s.rd.things ? s.rd.things.length : 1 }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.wt-note'); return { t: n.textContent, cls: n.className }; });
  const wo = (s) => s.hook.map((_, h) => h);

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    if (LEVELS.includes('1')) {
      await force(page, '1', 0); let s = await st(page);
      await click(page, '[data-k="check"]', loc + ' go empty'); s = await st(page); let n = await note(page);
      is(s.misses === 0 && sp(n.t) === sp(T(loc, 'hintHang')) && (await page.$$('.wt-hook.is-swing')).length === 4, `${loc}: Go with empty hooks → the hint, no miss, the hooks swing`);
      await hang(page, s.right[1], 0, loc + ' swap a'); await hang(page, s.right[0], 1, loc + ' swap b'); await hang(page, s.right[2], 2, loc + ' right c'); await hang(page, s.right[3], 3, loc + ' right d');
      await click(page, '[data-k="check"]', loc + ' go 1'); s = await st(page); n = await note(page);
      is(s.misses === 1 && s.locked.join() === 'false,false,true,true' && s.hook[0] === null && s.hook[1] === null && sp(n.t) === sp(T(loc, 'missTags')), `${loc}: miss 1 → two lock, two go home, the hint`);
      const tagTxt = await page.evaluate((j) => { const e = document.querySelector(`[data-k="thing-${j}"] .wt-tag.is-open`); return e ? e.textContent : ''; }, s.right[0]);
      is(sp(tagTxt) === sp(C.DATA[loc].tag[C.round(loc, '1', 0).windows[0].use]), `${loc}: the returned thing's tag flipped open («${sp(tagTxt)}»)`);
      const ex = Array.from({ length: s.n }, (_, j) => j).filter(j => s.right.indexOf(j) < 0);
      await hang(page, ex[0], 0, loc + ' extra a'); await hang(page, ex[1], 1, loc + ' extra b'); await click(page, '[data-k="check"]', loc + ' go 2'); s = await st(page);
      is(s.misses === 2 && sp((await note(page)).t) === sp(T(loc, 'missTry')) && await page.$(`[data-k="thing-${s.right[0]}"].is-hop`) !== null && await page.$(`[data-k="thing-${s.right[1]}"].is-hop`) !== null && await page.$(`[data-k="thing-${ex[0]}"].is-hop`) === null, `${loc}: miss 2 → the still-wanted things hop`);
      await page.evaluate(() => { window.WhatForTagsActivity.OK_MS = 500; });
      await hang(page, s.right[0], 0, loc + ' fix a'); await hang(page, s.right[1], 1, loc + ' fix b'); await click(page, '[data-k="check"]', loc + ' go 3'); s = await st(page);
      is(s.done && /is-ok/.test((await note(page)).cls) && (await page.$$('.wt-hook.is-in')).length === 4, `${loc}: all four right → the success line`);
      await wait(1100);
      is(await page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); }), `${loc}: Next 0.5 s after the result`);
      await page.evaluate(() => { window.WhatForTagsActivity.OK_MS = 600000; });
      /* a hanging thing tapped goes home */
      await force(page, '1', 2); s = await st(page); await hang(page, s.right[0], 0, loc + ' home'); await click(page, '[data-k="hook-0"]', loc + ' tap hung');
      s = await st(page); is(s.hook[0] === null, `${loc}: a hanging thing tapped goes home`);
      /* picture only + eight things */
      await force(page, '1', 3, { words: 'pic' });
      is(await page.evaluate(() => Array.from(document.querySelectorAll('.wt-sent')).every(e => e.offsetParent === null) && document.querySelectorAll('.wt-mpic').length === 4), `${loc}: picture only → the sentences hide, the pictures stay`);
      await force(page, '1', 4, { bag: '8' }); is((await page.$$('[data-k^="thing-"]')).length === 8, `${loc}: eight things in the bag`);
      /* a real drag */
      await force(page, '1', 5); s = await st(page);
      const from = await (await page.$(`[data-k="thing-${s.right[2]}"]`)).boundingBox(), to = await (await page.$('[data-k="hook-2"]')).boundingBox();
      await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2); await page.mouse.down();
      for (let k = 1; k <= 8; k++) { await page.mouse.move(from.x + from.width / 2 + (to.x + to.width / 2 - from.x - from.width / 2) * k / 8, from.y + from.height / 2 + (to.y + to.height / 2 - from.y - from.height / 2) * k / 8); await wait(15); }
      await page.mouse.up(); await wait(60); s = await st(page);
      is(s.hook[2] === s.right[2], `${loc}: a real drag from the bag onto a hook hangs the thing`);
    }
    if (LEVELS.includes('2')) {
      await force(page, '2', 0); let s = await st(page);
      await click(page, '[data-k="check"]', loc + ' L2 empty'); is(sp((await note(page)).t) === sp(T(loc, 'hintCopy')) && (await st(page)).misses === 0, `${loc}: level 2 Go with no copy → the hint`);
      const yes = s.fits.map((f, h) => f ? h : -1).filter(h => h >= 0), no = s.fits.map((f, h) => f ? -1 : h).filter(h => h >= 0);
      await click(page, `[data-k="hook-${yes[0]}"]`, loc + ' L2 yes'); await click(page, `[data-k="hook-${no[0]}"]`, loc + ' L2 no'); await click(page, '[data-k="check"]', loc + ' L2 go'); s = await st(page);
      is(s.misses === 1 && s.locked[yes[0]] && s.hook[no[0]] === null && await page.$('.wt-solo .wt-tag.is-open') !== null && sp((await note(page)).t) === sp(T(loc, 'missMore')), `${loc}: level 2 — the right copy locks, the wrong one comes off, the tag opens`);
      for (const h of yes.slice(1)) await click(page, `[data-k="hook-${h}"]`, loc + ' L2 rest');
      await click(page, '[data-k="check"]', loc + ' L2 go 2'); s = await st(page);
      is(s.done && /is-ok/.test((await note(page)).cls), `${loc}: level 2 — every moment where it helps → done`);
    }
    if (LEVELS.includes('3')) {
      await force(page, '3', 0); let s = await st(page);
      await click(page, '[data-k="check"]', loc + ' L3 empty'); is(sp((await note(page)).t) === sp(T(loc, 'hintFeel')), `${loc}: level 3 Go empty → the hint`);
      const by = [0, 1, 2].map(k => s.home.map((x, j) => x === k ? j : -1).filter(j => j >= 0));
      const plan = [by[1][0], by[0][1], by[0][0], by[1][1], by[2][0], by[2][1]];
      for (let h = 0; h < 6; h++) await hang(page, plan[h], h, loc + ' L3 ' + h);
      await click(page, '[data-k="check"]', loc + ' L3 go'); s = await st(page);
      is(s.misses === 1 && s.locked.filter(Boolean).length === 4 && sp((await note(page)).t) === sp(T(loc, 'missFeel')), `${loc}: level 3 — four lock, two go home, the hint`);
      await hang(page, by[0][0], 0, loc + ' L3 fix a'); await hang(page, by[1][0], 2, loc + ' L3 fix b'); await click(page, '[data-k="check"]', loc + ' L3 go 2'); s = await st(page);
      is(s.done, `${loc}: level 3 — fixed → done`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    const combos = []; for (const lvl of LEVELS) combos.push([lvl, {}]); if (LEVELS.includes('1')) { combos.push(['1', { bag: '8' }]); combos.push(['1', { words: 'pic' }]); }
    for (const [lvl, o] of combos) for (const r of C.rounds(lvl)) {
      await force(sw.page, lvl, r, o);
      for (const state of ['rest', 'miss2', 'solved']) {
        let s = await st(sw.page);
        if (state === 'miss2') for (let k = 0; k < 2; k++) {
          s = await st(sw.page);
          if (lvl === '2') { const no = s.fits.map((f, h) => f ? -1 : h).filter(h => h >= 0); await click(sw.page, `[data-k="hook-${no[k % no.length]}"]`, ''); }
          else for (const h of wo(s)) { if (s.hook[h] != null) continue; s = await st(sw.page); const want = lvl === '1' ? s.right[h] : -1; const j = Array.from({ length: s.n }, (_, x) => x).find(x => s.hook.indexOf(x) < 0 && (lvl === '3' ? s.home[x] === (Math.floor(h / 2) + 1) % 3 : x !== want)); if (j == null) continue; await hang(sw.page, j, h, ''); }
          await click(sw.page, '[data-k="check"]', `${loc} L${lvl}.${r + 1} miss`);
        }
        if (state === 'solved') {
          s = await st(sw.page);
          if (lvl === '2') { for (let h = 0; h < 5; h++) if (s.fits[h] && !s.locked[h]) await click(sw.page, `[data-k="hook-${h}"]`, ''); }
          else for (const h of wo(s)) { s = await st(sw.page); if (s.locked[h]) continue; const j = lvl === '1' ? s.right[h] : Array.from({ length: s.n }, (_, x) => x).find(x => s.hook.indexOf(x) < 0 && s.home[x] === Math.floor(h / 2)); if (s.hook[h] !== j) await hang(sw.page, j, h, `${loc} L${lvl}.${r + 1} right`); }
          await click(sw.page, '[data-k="check"]', '');
        }
        s = await st(sw.page); const tag = `${loc} L${lvl}.${r + 1}${o.bag ? '/8' : ''}${o.words ? '/pic' : ''} ${state}`;
        if (state === 'miss2') is(s.misses === 2, `${tag}: reached`);
        if (state === 'solved') is(s.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          /* the board re-renders for its new width; measure only once its band matches the stage */
          await sw.page.waitForFunction(() => { const a = window.WhatForTagsActivity, d = a._dims(), c = document.querySelector('.wt-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
          await sw.page.waitForFunction(() => Array.from(document.querySelectorAll('.wt-wrap img')).every(im => im.complete), { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => { window.scrollTo(0, 0); const r = document.querySelector('.wt-things'); if (r) r.scrollLeft = 0; });
          const m = await sw.page.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), wrap = document.querySelector('.wt-wrap'), wide = wrap.classList.contains('is-wide'), tiny = wrap.classList.contains('is-cramp');
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect(), row = document.querySelector('.wt-things');
            const inRow = (b) => row && row.contains(b);
            const ctrls = Array.from(document.querySelectorAll('.wt-wrap button')).filter(b => b.offsetParent !== null);
            ctrls.forEach(b => { const r = b.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) F('small ' + (b.getAttribute('data-k') || b.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (!inRow(b) && (r.left < cr.left - 1 || r.right > cr.right + 1)) F('outside the card ' + b.getAttribute('data-k')); });
            if (row && row.offsetParent) { const r = row.getBoundingClientRect(); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('the bag row outside the card'); }
            const go = document.querySelector('[data-k="check"]');
            if (state !== 'solved' && go.getBoundingClientRect().bottom > vh + 1) F('Go below the fold ' + Math.round(go.getBoundingClientRect().bottom));
            const things = Array.from(document.querySelectorAll('[data-k^="thing-"]')).filter(b => b.offsetParent);
            if (state !== 'solved') things.forEach(b => { const r = b.getBoundingClientRect(); if (r.bottom > vh + 1) F('a thing below the fold ' + Math.round(r.bottom)); });
            const nt = document.querySelector('.wt-note');
            if (state === 'miss2' && nt.textContent.trim() && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold');
            if (state === 'solved') { const p = document.querySelector('.lcs-activity-prompt'); if (p && p.getBoundingClientRect().bottom > vh + 1) F('the result bubble below the fold'); }
            document.querySelectorAll('.wt-lab, .wt-tag.is-open, .wt-sent, .wt-feel, .wt-note:not(.is-ok)').forEach(e => { if (e.offsetParent && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            const grp = (sel) => Array.from(document.querySelectorAll(sel)).filter(e => e.offsetParent).map(e => e.getBoundingClientRect());
            [grp('.wt-win'), grp('.wt-hook'), grp('[data-k^="thing-"]')].forEach(a => { for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) { const x = a[i], y = a[j]; if (Math.min(x.right, y.right) - Math.max(x.left, y.left) > 2 && Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top) > 2) F('two windows / hooks / things overlap'); } });
            const note = document.querySelector('.wt-note:not(.is-ok)'), goR = go.getBoundingClientRect();
            if (note && note.textContent.trim() && go.offsetParent) { const n = note.getBoundingClientRect(); if (Math.min(n.right, goR.right) - Math.max(n.left, goR.left) > 1 && Math.min(n.bottom, goR.bottom) - Math.max(n.top, goR.top) > 1) F('the hint under Go'); }
            document.querySelectorAll('.wt-wrap img').forEach(im => { if (!im.offsetParent) return; if (!im.complete || !im.naturalWidth) F('a picture did not load ' + im.src.slice(-40)); else { const r = im.getBoundingClientRect(), floor = wide ? 96 : tiny ? 56 : 64; if (r.width < floor - 0.5) F('a picture below ' + floor + ' px: ' + Math.round(r.width)); } });
            return out;
          }, state);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await wait(150);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-what-for-tags: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
