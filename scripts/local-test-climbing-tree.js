#!/usr/bin/env node
/* =====================================================================
   local-test-climbing-tree.js — ACTIVITY #132, The Climbing Tree (Olive's
   Kind-Of Tree, L.1.5.b), in a real browser with real pointer clicks and
   one real drag, in all 11 locales.
   Scenarios per locale (at 1024):
     · level 1: Check at the roots → the hint, no miss, the trunk glows; a
       wrong branch → the leaf reads that wrong sentence; Check → the
       branch dips, the picture is back at the roots, miss 1; again → miss
       2: the right branch glows; the right branch → Check → the leaf turns
       gold, the success line, Next 0.5 s later; "clue only" hides the
       picture until it perches right; four branches = four perches;
     · a real drag of the picture from the nest onto a branch;
     · level 2: nine pictures placed by clicks (two wrong) → Check: seven
       lock, two come home, the hint; the two fixed → done;
     · level 3: the right branch opens three twigs and the way back down;
       down and up again; a wrong twig → Check: the branch stays open, the
       twig hint; the right twig → the gold definition leaf.
   Then every round of every level (levels 1 and 3 also with four
   branches) at rest, at miss 2 and solved — reached ONCE per locale by
   real clicks, then resized through 320…1366: no sideways scroll, Check
   above the fold, the hint / result in view, controls ≥ 44 px, nothing
   outside the card, no clipped text, no two perches or twigs on top of
   each other, pictures ≥ their floor and loaded, no console errors.
   Usage: node scripts/local-test-climbing-tree.js [--widths=…] [--locales=…] [--levels=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', '1,2,3').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'climbing-tree-core.js'));
const ACT = (() => { const ctx = { window: {}, ClimbingTreeCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'climbing-tree-activity.js'), 'utf8') + '\n;this.__A = window.ClimbingTreeActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => String(ACT.strings[k][loc]);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
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
    await page.goto(`${base}/climbing-tree-activity.html?activity=olive-kind-of.category-attribute.l-1-5-b&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.ClimbingTreeActivity && window.ClimbingTreeActivity.st && document.querySelector('.ct-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.ClimbingTreeActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, o) {
    o = o || {};
    return page.evaluate((lvl, r, o) => {
      const a = window.ClimbingTreeActivity; a.api.settings.level = lvl; a.api.settings.clue = o.clue || 'pic'; a.api.settings.branches = o.nb || '3'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, o);
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + Math.min(r.height / 2, 20), hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    try { const b = await h.boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + Math.min(b.height / 2, 20)); } catch (e) { if (!/detached/.test(String(e))) throw e; await wait(80); const h2 = await page.$(sel); if (!h2) return false; await h2.click(); }
    await wait(40); return true;
  }
  const st = (page) => page.evaluate(() => { const s = window.ClimbingTreeActivity.st; return { at: s.at, twig: s.twig, misses: s.misses, done: s.done, last: s.last, right: s.rd.right, rightTwig: s.rd.rightTwig, home: s.rd.home, locked: s.locked, glow: s.glow, n: s.rd.branches.length }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.ct-note'); return { t: n.textContent, cls: n.className }; });
  const leafTxt = (page) => page.evaluate(() => { const l = document.querySelector('.ct-leaf'); return l ? l.textContent : ''; });
  const leafOf = (loc, lvl, r, b, t) => { const s = C.newState(loc, lvl, r); C.climb(s, b); if (t != null) C.perch(s, t); return C.leaf(s); };
  const rdOf = (page) => page.evaluate(() => { const s = window.ClimbingTreeActivity.st; return { branches: s.rd.branches.map(b => b.kind), twigs: s.rd.branches.map(b => b.twigs ? b.twigs.map(t => t.id) : null), r: s.r }; });

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    if (LEVELS.includes('1')) {
      await force(page, '1', 1); let s = await st(page); const wrong = s.right === 0 ? 1 : 0;
      await click(page, '[data-k="check"]', loc + ' check at roots'); s = await st(page); let n = await note(page);
      is(s.misses === 0 && sp(n.t) === sp(T(loc, 'hintClimb')) && await page.$('.ct-trunk.is-glow') !== null, `${loc}: Check at the roots → the hint, no miss, the trunk glows`);
      await click(page, `[data-k="branch-${wrong}"]`, loc + ' wrong branch'); s = await st(page);
      const kinds = (await rdOf(page)).branches;
      is(s.at === wrong && sp(await leafTxt(page)) === sp(C.newState(loc, '1', 1).rd.subj + ' ' + C.DATA[loc].kp[kinds[wrong]] + '.'), `${loc}: a wrong branch → the leaf reads that sentence («${sp(await leafTxt(page))}»)`);
      await click(page, '[data-k="check"]', loc + ' check 1'); s = await st(page); n = await note(page);
      is(s.misses === 1 && s.at === null && await page.$('[data-k="newcomer"]') !== null && sp(n.t) === sp(T(loc, 'missBranch')), `${loc}: miss 1 → the picture is back at the roots, the hint`);
      await click(page, `[data-k="branch-${wrong}"]`, loc + ' wrong again'); await click(page, '[data-k="check"]', loc + ' check 2'); s = await st(page);
      is(s.misses === 2 && await page.$(`[data-k="branch-${s.right}"].is-glow`) !== null && sp((await note(page)).t) === sp(T(loc, 'missGlow')), `${loc}: miss 2 → the right branch glows`);
      await page.evaluate(() => { window.ClimbingTreeActivity.OK_MS = 500; });
      await click(page, `[data-k="branch-${s.right}"]`, loc + ' right branch'); await click(page, '[data-k="check"]', loc + ' check 3'); s = await st(page);
      is(s.done && await page.$('.ct-leaf.is-gold') !== null && /is-ok/.test((await note(page)).cls), `${loc}: the right branch → a gold leaf, the success line`);
      await wait(1100);
      is(await page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); }), `${loc}: Next 0.5 s after the result`);
      await page.evaluate(() => { window.ClimbingTreeActivity.OK_MS = 600000; });
      /* clue only */
      await force(page, '1', 0, { clue: 'text' });
      is(await page.$('[data-k="newcomer"] .ct-hidden') !== null && await page.$('[data-k="newcomer"] img') === null, `${loc}: clue only → the picture hides behind a leaf`);
      s = await st(page); await click(page, `[data-k="branch-${s.right}"]`, loc + ' clue-only right'); await click(page, '[data-k="check"]', loc + ' clue-only check');
      is(await page.$(`[data-k="branch-${s.right}"] .ct-member.is-new img`) !== null, `${loc}: perched right → the picture shows`);
      /* four branches */
      await force(page, '1', 2, { nb: '4' });
      is((await page.$$('[data-k^="branch-"]')).length === 4, `${loc}: four branches = four perches`);
      /* a real drag */
      await force(page, '1', 3); s = await st(page);
      const from = await (await page.$('[data-k="newcomer"]')).boundingBox(), to = await (await page.$(`[data-k="branch-${s.right}"]`)).boundingBox();
      await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2); await page.mouse.down();
      for (let k = 1; k <= 8; k++) { await page.mouse.move(from.x + from.width / 2 + (to.x + to.width / 2 - from.x - from.width / 2) * k / 8, from.y + from.height / 2 + (to.y + 30 - from.y - from.height / 2) * k / 8); await wait(15); }
      await page.mouse.up(); await wait(60); s = await st(page);
      is(s.at === s.right, `${loc}: a real drag from the nest onto a branch places the picture`);
    }
    if (LEVELS.includes('2')) {
      await force(page, '2', 0); let s = await st(page);
      await click(page, '[data-k="check"]', loc + ' L2 empty'); is(sp((await note(page)).t) === sp(T(loc, 'hintAll')) && (await st(page)).misses === 0, `${loc}: level 2 Check with pictures waiting → the hint`);
      for (let i = 0; i < 9; i++) { await click(page, `.ct-nest [data-k="item-${i}"]`, loc + ' L2 item ' + i); await click(page, `[data-k="branch-${i < 2 ? (s.home[i] + 1) % 3 : s.home[i]}"]`, loc + ' L2 branch'); }
      await click(page, '[data-k="check"]', loc + ' L2 check'); s = await st(page);
      is(s.misses === 1 && s.locked.filter(Boolean).length === 7 && (await page.$$('.ct-nest .ct-item')).length === 2 && sp((await note(page)).t) === sp(T(loc, 'missGroup')), `${loc}: level 2 — seven lock, two come home`);
      for (const i of [0, 1]) { await click(page, `.ct-nest [data-k="item-${i}"]`, loc + ' L2 fix'); await click(page, `[data-k="branch-${s.home[i]}"]`, loc + ' L2 fix branch'); }
      await click(page, '[data-k="check"]', loc + ' L2 check 2'); s = await st(page);
      is(s.done && /is-ok/.test((await note(page)).cls), `${loc}: level 2 — all nine home → done`);
    }
    if (LEVELS.includes('3')) {
      await force(page, '3', 2); let s = await st(page);
      await click(page, `[data-k="branch-${s.right}"]`, loc + ' L3 branch');
      is((await page.$$('[data-k^="twig-"]')).length === 3 && await page.$('[data-k="down"]') !== null, `${loc}: the branch opens three twigs and the way down`);
      await click(page, '[data-k="down"]', loc + ' down'); s = await st(page); is(s.at === null && await page.$('[data-k="newcomer"]') !== null, `${loc}: back down to the roots`);
      await click(page, `[data-k="branch-${s.right}"]`, loc + ' up again'); await click(page, `[data-k="twig-${(s.rightTwig + 1) % 3}"]`, loc + ' wrong twig');
      await click(page, '[data-k="check"]', loc + ' L3 check'); s = await st(page);
      is(s.misses === 1 && s.at === s.right && s.twig === null && (await page.$$('[data-k^="twig-"]')).length === 3 && sp((await note(page)).t) === sp(T(loc, 'missTwig')), `${loc}: a wrong twig → the branch stays open, the twig hint`);
      await click(page, `[data-k="twig-${s.rightTwig}"]`, loc + ' right twig'); await click(page, '[data-k="check"]', loc + ' L3 check 2'); s = await st(page);
      const want = leafOf(loc, '3', 2, C.round(loc, '3', 2).right, C.round(loc, '3', 2).rightTwig);
      is(s.done && sp(await leafTxt(page)) === sp(want) && await page.$('.ct-leaf.is-gold') !== null, `${loc}: the right twig → the gold definition «${sp(await leafTxt(page))}»`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    const combos = []; for (const lvl of LEVELS) combos.push([lvl, '3']); if (LEVELS.includes('1')) combos.push(['1', '4']); if (LEVELS.includes('3')) combos.push(['3', '4']);
    for (const [lvl, nb] of combos) for (const r of C.rounds(lvl)) {
      await force(sw.page, lvl, r, { nb });
      for (const state of ['rest', 'miss2', 'solved']) {
        let s = await st(sw.page);
        if (state === 'miss2') {
          if (lvl === '2') { for (let k = 0; k < 2; k++) { for (let i = 0; i < 9; i++) { if ((await st(sw.page)).locked[i]) continue; const a2 = (await st(sw.page)).at; if (a2[i] >= 0) continue; await click(sw.page, `.ct-nest [data-k="item-${i}"]`, ''); await click(sw.page, `[data-k="branch-${i === 0 ? (s.home[i] + 1) % 3 : s.home[i]}"]`, ''); } await click(sw.page, '[data-k="check"]', ''); } }
          else { const w = s.right === 0 ? 1 : 0; for (let k = 0; k < 2; k++) { await click(sw.page, `[data-k="branch-${w}"]`, ''); if (lvl === '3') await click(sw.page, '[data-k="twig-0"]', ''); await click(sw.page, '[data-k="check"]', ''); } }
        }
        if (state === 'solved') {
          s = await st(sw.page);
          if (lvl === '2') { for (let i = 0; i < 9; i++) { if (s.locked[i] || s.at[i] >= 0) continue; await click(sw.page, `.ct-nest [data-k="item-${i}"]`, ''); await click(sw.page, `[data-k="branch-${s.home[i]}"]`, ''); } await click(sw.page, '[data-k="check"]', ''); }
          else { await click(sw.page, `[data-k="branch-${s.right}"]`, `${loc} L${lvl}.${r + 1} right`); if (lvl === '3') await click(sw.page, `[data-k="twig-${s.rightTwig}"]`, ''); await click(sw.page, '[data-k="check"]', ''); }
        }
        s = await st(sw.page); const tag = `${loc} L${lvl}.${r + 1}/${nb} ${state}`;
        if (state === 'miss2') is(s.misses === 2, `${tag}: reached`);
        if (state === 'solved') is(s.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => Array.from(document.querySelectorAll('.ct-wrap img')).every(im => im.complete), { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), wide = !!document.querySelector('.ct-wrap.is-wide');
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            const ctrls = Array.from(document.querySelectorAll('.ct-wrap button, .ct-wrap [role="button"]')).filter(b => b.offsetParent !== null);
            ctrls.forEach(b => { const r = b.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) F('small ' + (b.getAttribute('data-k') || b.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + b.getAttribute('data-k')); });
            const chk = document.querySelector('[data-k="check"]');
            if (state !== 'solved' && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            const nt = document.querySelector('.ct-note');
            if (state === 'miss2' && nt.textContent.trim() && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold');
            if (state === 'solved') { const p = document.querySelector('.lcs-activity-prompt'); if (p && p.getBoundingClientRect().bottom > vh + 1) F('the result bubble below the fold'); }
            document.querySelectorAll('.ct-lab, .ct-sign, .ct-tsign, .ct-leaf, .ct-clue, .ct-note:not(.is-ok)').forEach(e => { if (e.offsetParent && getComputedStyle(e).visibility !== 'hidden' && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            const sib = Array.from(document.querySelectorAll('.ct-perch, .ct-twig')).filter(e => e.offsetParent).map(e => e.getBoundingClientRect());
            for (let i = 0; i < sib.length; i++) for (let j = i + 1; j < sib.length; j++) { const a = sib[i], b = sib[j]; if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2) F('two perches/twigs overlap'); }
            document.querySelectorAll('.ct-wrap img').forEach(im => { if (!im.complete || !im.naturalWidth) F('a picture did not load ' + im.src.slice(-40)); else { const r = im.getBoundingClientRect(), floor = wide ? 96 : 64; if (r.width < floor - 0.5) F('a picture below ' + floor + ' px: ' + Math.round(r.width)); } });
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
  console.log(`local-test-climbing-tree: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
