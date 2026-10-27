#!/usr/bin/env node
/* =====================================================================
   local-test-stove-knob.js — ACTIVITY #134, The Stove Knob (Pesto's Soup
   Stall, L.1.5.d), in a real browser with real pointer clicks, one real
   word drag and one real knob turn by hand, in all 11 locales.
   Scenarios per locale (at 1024):
     · level 1: Turn it up with empty clicks → the hint, no miss, the empty
       click pulses; a wrong order → the sweep runs (the knob climbs click
       by click, the flame grows), the soup jumps at the wrong words, the
       hint names the first; again → miss 2: the soup colour strip and the
       word dots; a move takes them away; the right order → the success
       line, Next 0.5 s later; soup colours "only when I turn it up" keep the
       soup plain while placing, "all the time" colour it; four words;
     · a real drag of a word onto a click; a real turn of the knob by hand;
     · level 2: the knob holds the ladder; a wrong click + Serve → the bowl
       stops short with that soup, the hint; the right click → served; a
       between round: the decoy in the middle → the hint; the middle word →
       served;
     · level 3: the trap beside the first word → named in the hint; the
       twin → done;
     · level 4: a looking word on the going knob → the field hint; sorted →
       done.
   Then every round of every level (level 1 also with four words) at rest,
   at miss 2 and solved — reached ONCE per locale by real clicks, then
   resized through 320…1366: no sideways scroll, the button above the
   fold, the hint / result in view, controls ≥ 44 px, nothing outside the
   card, no clipped text, no two clicks / tiles on top of each other, the
   pot ≥ its floor and loaded, no console errors.
   Usage: node scripts/local-test-stove-knob.js [--widths=…] [--locales=…] [--levels=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', '1,2,3,4').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'stove-knob-core.js'));
const ACT = (() => { const ctx = { window: {}, StoveKnobCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'stove-knob-activity.js'), 'utf8') + '\n;this.__A = window.StoveKnobActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
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
    await page.goto(`${base}/stove-knob-activity.html?activity=shades.pick.l-1-5-d&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.StoveKnobActivity && window.StoveKnobActivity.st && document.querySelector('.sk-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.StoveKnobActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, o) {
    o = o || {};
    const ok = await page.evaluate((lvl, r, o) => {
      const a = window.StoveKnobActivity; a.api.settings.level = lvl; a.api.settings.words = o.words || '3'; a.api.settings.peek = o.peek || 'off'; a._pool = null; a._plan = null; a._ensurePool();
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
  /* a word already on the knob is tapped back to the shelf first, as a child would */
  const put = async (page, j, w, what) => {
    const at = await page.evaluate((j) => window.StoveKnobActivity.st.win.indexOf(j), j);
    if (at === w) return; if (at >= 0) await click(page, `[data-k="win-${at}"]`, what + ' back');
    await click(page, `[data-k="tile-${j}"]`, what + ' tile'); await click(page, `[data-k="win-${w}"]`, what + ' click');
  };
  const st = (page) => page.evaluate(() => { const s = window.StoveKnobActivity.st, rd = s.rd; return { win: s.win, knob: s.knob, misses: s.misses, done: s.done, last: s.last, help: s.help, jumped: s.jumped, kind: rd.kind, answer: rd.answer, fixed: rd.fixed, tiles: rd.tiles.map(t => ({ text: t.text, rank: t.rank, kind: t.kind, knob: t.knob })), windows: rd.windows }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.sk-note'); return { t: n.textContent, cls: n.className }; });
  const soup = (page) => page.evaluate(() => { const e = document.querySelector('.sk-soup > ellipse'); return e ? e.getAttribute('fill') : ''; });
  /* the right tile for window w, and a wrong one */
  const rightFor = (s, w) => { const W = s.windows[w]; return s.tiles.findIndex((t, j) => s.win.indexOf(j) < 0 && (s.kind === 'order' ? t.rank === W.click + 1 : s.kind === 'between' ? t.kind === 'ladder' : s.kind === 'twin' ? t.kind === 'twin' : t.knob === W.knob && t.rank === W.click + 1)); };

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    if (LEVELS.includes('1')) {
      await force(page, '1', 0); let s = await st(page);
      await click(page, '[data-k="check"]', loc + ' empty'); s = await st(page); let n = await note(page);
      is(s.misses === 0 && sp(n.t) === sp(T(loc, 'hintEmpty')) && (await page.$$('.sk-win.is-pulse')).length === 3, `${loc}: Turn it up with empty clicks → the hint, no miss, the empty clicks pulse`);
      const by = (r) => s.tiles.findIndex(t => t.rank === r);
      const plain = await soup(page);
      await put(page, by(3), 0, loc + ' wrong a'); await put(page, by(2), 1, loc + ' b'); await put(page, by(1), 2, loc + ' wrong c');
      is(await soup(page) === plain, `${loc}: "only when I turn it up" — the soup stays plain while placing`);
      await click(page, '[data-k="check"]', loc + ' turn 1'); s = await st(page); n = await note(page);
      const top = C.DATA[loc].lad.heat.w3[2];
      is(s.misses === 1 && s.jumped.join() === '0,2' && sp(n.t) === sp(T(loc, 'missJump', { w: top })) && (await page.$$('.sk-win.is-jump')).length === 2 && await soup(page) !== plain, `${loc}: miss 1 → the soup jumps at the two wrong words and shows the misplaced one, the hint names «${top}»`);
      await click(page, '[data-k="check"]', loc + ' turn 2'); s = await st(page);
      is(s.misses === 2 && s.help && await page.$('.sk-swatches') !== null && (await page.$$('.sk-dot')).length === 3 && sp((await note(page)).t) === sp(T(loc, 'missGlow')), `${loc}: miss 2 → the soup colour strip and a dot on every word`);
      await click(page, '[data-k="win-0"]', loc + ' take back'); s = await st(page);
      is(!s.help && await page.$('.sk-swatches') === null, `${loc}: a move takes the help away`);
      await page.evaluate(() => { window.StoveKnobActivity.OK_MS = 500; });
      await put(page, by(1), 0, loc + ' fix a'); s = await st(page);
      if (s.win[2] !== by(3)) await put(page, by(3), 2, loc + ' fix c');
      await click(page, '[data-k="check"]', loc + ' turn 3'); s = await st(page);
      is(s.done && /is-ok/.test((await note(page)).cls) && (await page.$$('.sk-win.is-in')).length === 3, `${loc}: the right order → the success line`);
      await wait(1100);
      is(await page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); }), `${loc}: Next 0.5 s after the result`);
      await page.evaluate(() => { window.StoveKnobActivity.OK_MS = 600000; });
      /* all the time: the soup takes each word as the knob reaches it */
      await force(page, '1', 1, { peek: 'on' }); s = await st(page);
      await put(page, s.tiles.findIndex(t => t.rank === 3), 0, loc + ' peek'); const c3 = await soup(page);
      await put(page, s.tiles.findIndex(t => t.rank === 1), 0, loc + ' peek 2'); is(c3 !== await soup(page), `${loc}: "all the time" — the soup changes with the word on the click`);
      await force(page, '1', 5, { words: '4' }); is((await page.$$('[data-k^="win-"]')).length === (C.DATA[loc].lad.size.w4 ? 4 : 3), `${loc}: four words on the knob where the ladder has four`);
      /* a real drag of a word, a real turn by hand */
      await force(page, '1', 2); s = await st(page);
      const j = s.tiles.findIndex(t => t.rank === 1), from = await (await page.$(`[data-k="tile-${j}"]`)).boundingBox(), to = await (await page.$('[data-k="win-0"]')).boundingBox();
      await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2); await page.mouse.down();
      for (let k = 1; k <= 8; k++) { await page.mouse.move(from.x + from.width / 2 + (to.x + to.width / 2 - from.x - from.width / 2) * k / 8, from.y + from.height / 2 + (to.y + to.height / 2 - from.y - from.height / 2) * k / 8); await wait(15); }
      await page.mouse.up(); await wait(60); s = await st(page);
      is(s.win[0] === j, `${loc}: a real drag puts the word on the click`);
      const kb = await (await page.$('[data-k="knob-0"]')).boundingBox(), cx = kb.x + kb.width / 2, cy = kb.y + kb.height / 2;
      await page.mouse.move(cx + kb.width * 0.4, cy + kb.height * 0.35); await page.mouse.down();
      for (let k = 0; k <= 8; k++) { const a = (35 - 70 * k / 8) * Math.PI / 180; await page.mouse.move(cx + Math.cos(a) * kb.width * 0.45, cy + Math.sin(a) * kb.width * 0.45); await wait(15); }
      await page.mouse.up(); await wait(60); s = await st(page);
      is(s.knob[0] === 2, `${loc}: turning the knob by hand climbs to the biggest flame (${s.knob[0]})`);
    }
    if (LEVELS.includes('2')) {
      await force(page, '2', 1); let s = await st(page);
      const wrongC = s.answer === 0 ? 1 : 0;
      await click(page, `[data-k="win-${wrongC}"]`, loc + ' L2 turn'); await click(page, '[data-k="check"]', loc + ' serve'); s = await st(page);
      is(s.misses === 1 && !s.done && await page.$('.sk-bowl.is-short') !== null && sp((await note(page)).t) === sp(T(loc, 'missPick')), `${loc}: level 2 — the wrong word + Serve → the bowl stops short, the hint`);
      await click(page, `[data-k="win-${s.answer}"]`, loc + ' L2 right'); await click(page, '[data-k="check"]', loc + ' serve 2'); s = await st(page);
      is(s.done && await page.$('.sk-bowl.is-in') !== null && await page.$('.sk-tick') !== null, `${loc}: level 2 — the right word → served, ticked`);
      await force(page, '2', 18); s = await st(page);
      const dec = s.tiles.findIndex((t, j) => t.kind === 'decoy' && s.win.indexOf(j) < 0), mid = s.tiles.findIndex(t => t.kind === 'ladder' && t.rank === 2);
      await put(page, dec, 1, loc + ' decoy'); await click(page, '[data-k="check"]', loc + ' serve 3'); s = await st(page);
      const W = C.DATA[loc].lad[C.DATA.BETWEEN[1][0]].w3;
      is(s.misses === 1 && sp((await note(page)).t) === sp(T(loc, 'missBetween', { low: W[0], high: W[2] })), `${loc}: between — a decoy in the middle → the hint`);
      await put(page, mid, 1, loc + ' middle'); await click(page, '[data-k="check"]', loc + ' serve 4'); s = await st(page);
      is(s.done, `${loc}: between — the middle word → served`);
    }
    if (LEVELS.includes('3')) {
      await force(page, '3', 0); let s = await st(page);
      const trap = s.tiles.findIndex(t => t.kind === 'other'), twin = s.tiles.findIndex(t => t.kind === 'twin');
      await put(page, trap, 1, loc + ' trap'); await click(page, '[data-k="check"]', loc + ' L3'); s = await st(page);
      const tw = C.DATA[loc].twins[0], cap = (x) => x.charAt(0).toLocaleUpperCase(loc) + x.slice(1);
      is(s.misses === 1 && sp((await note(page)).t) === sp(T(loc, 'missTwin', { w: cap(tw[2]), t: tw[0] })), `${loc}: level 3 — the trap is named`);
      await put(page, twin, 1, loc + ' twin'); await click(page, '[data-k="check"]', loc + ' L3 2'); s = await st(page);
      is(s.done, `${loc}: level 3 — the twin → done`);
    }
    if (LEVELS.includes('4')) {
      await force(page, '4', 0); let s = await st(page);
      const look = s.tiles.map((t, j) => t.knob === 1 ? j : -1).filter(j => j >= 0).sort((a, b) => s.tiles[a].rank - s.tiles[b].rank), go = s.tiles.map((t, j) => t.knob === 0 ? j : -1).filter(j => j >= 0).sort((a, b) => s.tiles[a].rank - s.tiles[b].rank);
      for (let i = 0; i < 3; i++) await put(page, look[i], i, loc + ' L4 look on go');
      for (let i = 0; i < 3; i++) await put(page, go[i], 3 + i, loc + ' L4 go on look');
      await click(page, '[data-k="check"]', loc + ' L4'); s = await st(page);
      is(s.misses === 1 && sp((await note(page)).t) === sp(T(loc, 'missField')), `${loc}: level 4 — words on the wrong knobs → the field hint`);
      for (let i = 0; i < 3; i++) await put(page, go[i], i, loc + ' L4 fix go');
      s = await st(page); for (let i = 0; i < 3; i++) if (s.win[3 + i] !== look[i]) await put(page, look[i], 3 + i, loc + ' L4 fix look');
      await click(page, '[data-k="check"]', loc + ' L4 2'); s = await st(page);
      is(s.done, `${loc}: level 4 — sorted and ordered → done`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    const combos = []; for (const lvl of LEVELS) combos.push([lvl, {}]); if (LEVELS.includes('1')) combos.push(['1', { words: '4' }]);
    for (const [lvl, o] of combos) for (const r of C.rounds(lvl)) {
      await force(sw.page, lvl, r, o);
      for (const state of ['rest', 'miss2', 'solved']) {
        let s = await st(sw.page);
        if (state === 'miss2') for (let k = 0; k < 2; k++) {
          s = await st(sw.page);
          if (s.kind === 'pick') await click(sw.page, `[data-k="win-${s.answer === 0 ? 1 : 0}"]`, '');
          else for (let w = 0; w < s.windows.length; w++) { s = await st(sw.page); if (s.win[w] != null) continue; const right = rightFor(s, w); const j = s.tiles.findIndex((t, x) => s.win.indexOf(x) < 0 && x !== right); await put(sw.page, j >= 0 ? j : right, w, ''); }
          await click(sw.page, '[data-k="check"]', `${loc} L${lvl}.${r + 1} miss`);
        }
        if (state === 'solved') {
          s = await st(sw.page);
          if (s.kind === 'pick') await click(sw.page, `[data-k="win-${s.answer}"]`, '');
          else {
            for (let w = 0; w < s.windows.length; w++) { s = await st(sw.page); if (s.fixed[w] != null || s.win[w] == null) continue; await click(sw.page, `[data-k="win-${w}"]`, ''); }
            for (let w = 0; w < s.windows.length; w++) { s = await st(sw.page); if (s.win[w] != null) continue; await put(sw.page, rightFor(s, w), w, `${loc} L${lvl}.${r + 1} right`); }
          }
          await click(sw.page, '[data-k="check"]', '');
        }
        s = await st(sw.page); const tag = `${loc} L${lvl}.${r + 1}${o.words ? '/4' : ''} ${state}`;
        if (state === 'miss2') is(s.misses === 2, `${tag}: reached`);
        if (state === 'solved') is(s.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => { const a = window.StoveKnobActivity, d = a._dims(), c = document.querySelector('.sk-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
          await sw.page.waitForFunction(() => Array.from(document.querySelectorAll('.sk-wrap img')).every(im => im.complete), { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), wrap = document.querySelector('.sk-wrap'), wide = wrap.classList.contains('is-wide'), cramp = wrap.classList.contains('is-cramp');
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            Array.from(document.querySelectorAll('.sk-wrap button')).filter(b => b.offsetParent !== null).forEach(b => { const r = b.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) F('small ' + (b.getAttribute('data-k') || b.className) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + b.getAttribute('data-k')); if (state !== 'solved' && r.bottom > vh + 1) F('below the fold ' + b.getAttribute('data-k') + ' ' + Math.round(r.bottom)); });
            const nt = document.querySelector('.sk-note');
            if (state === 'miss2' && nt.textContent.trim() && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold');
            if (state === 'solved') { const p = document.querySelector('.lcs-activity-prompt'); if (p && p.getBoundingClientRect().bottom > vh + 1) F('the result bubble below the fold'); }
            document.querySelectorAll('.sk-word, .sk-ttext, .sk-field, .sk-note:not(.is-ok), .sk-go span').forEach(e => { if (e.offsetParent && (e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.clientHeight + 2)) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            const grp = (sel) => Array.from(document.querySelectorAll(sel)).filter(e => e.offsetParent).map(e => e.getBoundingClientRect());
            const all = grp('.sk-win').concat(grp('.sk-tile'), grp('.sk-knob'), grp('.sk-go'), grp('.sk-pot'));
            for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const x = all[i], y = all[j]; if (Math.min(x.right, y.right) - Math.max(x.left, y.left) > 2 && Math.min(x.bottom, y.bottom) - Math.max(x.top, y.top) > 2) F('two parts overlap'); }
            document.querySelectorAll('.sk-wrap img').forEach(im => { if (!im.offsetParent) return; if (!im.complete || !im.naturalWidth) F('a picture did not load ' + im.src.slice(-40)); else { const r = im.getBoundingClientRect(), floor = wide ? 96 : cramp ? 56 : 64; if (r.width < floor - 0.5) F('a picture below ' + floor + ' px: ' + Math.round(r.width)); } });
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
  console.log(`local-test-stove-knob: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
