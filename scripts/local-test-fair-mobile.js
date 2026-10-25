#!/usr/bin/env node
/* =====================================================================
   local-test-fair-mobile.js — ACTIVITY #107, The Fair Mobile, in a real
   browser with real pointer and key actions (cards are TAPPED and DRAGGED
   onto the mobile, Check is clicked; the model is only read — to know
   which card is which — never told what happened), 11 locales.
   Scenarios per locale (at 1024):
     · halves #1: an empty Check → hintEmpty, no miss; the unequal card
       tapped on → the pin holds the bar level; Check → it tips ≥ 6°, the
       heavy share glows coral, the light one teal, hintUneq; miss 2 → the
       pin holds it level again, the dashed fair line, a long spring
       marked; a new card clears the help; the fourths card → two pieces
       in the spare tray, hintMany; the whole card → a bare hook, hintFew;
       the fair card DRAGGED on → Check → level, the success line, a
       stacked ½ on both shares; free play: another card swings at once;
       a drag that misses the mobile hangs nothing;
     · thirds (the triangle): the fair card → level, okThirds, three labels;
     · name the share: a tap chooses the card, a tap on a wrong mobile
       hangs it → hintMobile; miss 2 → hintCount2 and the right mobile
       bobs; dragged to the right mobile → the locale's line;
     · the keyboard: Enter on a card hangs it, Delete on the mobile takes it
       down; settings: the spirit level off removes the bubble.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, cards
   ≥ 64 px, nothing outside the card, the bands never overlap, every
   piece, label and plate inside its mobile.
   Usage: node scripts/local-test-fair-mobile.js [--widths=…] [--locales=…] [--levels=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', 'hf,thirds,name').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '107-fair-mobile', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const C = require(path.join(MINI, 'fair-mobile-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, FairMobileCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'fair-mobile-activity.js'), 'utf8') + '\n;this.__A = FairMobileActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
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
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/fair-mobile-activity.html?activity=choice-board.fraction-equal-shares.1-g-a-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FairMobileActivity && window.FairMobileActivity.st && document.querySelector('.fm-mob'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.FairMobileActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* the test seam: level + settings, then a round started fresh (deals are read back, never set) */
  async function force(page, level, r, set) {
    await page.evaluate((level, r, set) => { const a = window.FairMobileActivity; a.api.settings.level = level; a.api.settings.bubble = (set && set.bubble) || 'on'; a._pool = null; a._ensurePool(); a._pos = null; a._start(r, 0); a._render2(); window.scrollTo(0, 0); }, level, r, set || null);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const a = window.FairMobileActivity, s = a.st; return { cards: s.cards.slice(), mobiles: s.mobiles.slice(), right: s.right, hung: s.hung, on: s.on, pin: s.pin, misses: s.misses, show: s.show, done: s.done, sel: a._view.sel, showing: a._view.showing, measure: a._view.measure }; });
  const note = (page) => page.evaluate(() => document.querySelector('.fm-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  /* the drawn angle of mobile mi's main bar (degrees, + = right end down) */
  const barAngle = (page, mi) => page.evaluate((mi) => { const l = document.querySelectorAll('.fm-mob')[mi].querySelector('line[stroke-width="10"]'); return Math.atan2(+l.getAttribute('y2') - +l.getAttribute('y1'), +l.getAttribute('x2') - +l.getAttribute('x1')) * 180 / Math.PI; }, mi || 0);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(10); return true;
  }
  const K = (k) => `[data-k="${k}"]`;
  /* a real drag from a card to a mobile (or to a point off every mobile) */
  async function drag(page, card, mi, tag) {
    const a = await centre(page, K('card-' + card));
    if (!a) { is(false, `${tag}: there is card ${card} to drag`); return; }
    const to = mi == null ? { x: 6, y: a.y } : await page.evaluate((mi) => { const e = document.querySelectorAll('.fm-mob')[mi], r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(r.height / 2, 120) }; }, mi);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) { await page.mouse.move(a.x + (to.x - a.x) * i / 10, a.y + (to.y - a.y) * i / 10); await wait(4); }
    await page.mouse.up(); await wait(30);
  }
  const idx = async (page, id) => (await st(page)).cards.indexOf(id);
  async function check(page, tag) { return click(page, K('check'), tag); }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} halves #1`, s;
    await force(page, 'hf', 0);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tHalves')), `${tag}: the task line`);
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → hintEmpty, no miss`);
    await click(page, K('card-' + await idx(page, 'circle-halves-uneq')), tag); s = await st(page);
    is(s.hung === s.cards.indexOf('circle-halves-uneq') && s.pin && Math.abs(await barAngle(page)) < 0.5, `${tag}: a tap hangs the card; the pin holds the bar level`);
    is(await count(page, '.fm-card.is-hung') === 1 && await count(page, '.fm-mob .fm-piece') === 2, `${tag}: the card leaves the shelf, its two pieces hang`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && !s.pin && Math.abs(await barAngle(page)) >= 6, `${tag}: Check pulls the pin — it tips ${(await barAngle(page)).toFixed(1)}°`);
    is(sp(await note(page)) === sp(T(loc, 'hintUneq')), `${tag}: miss 1 → hintUneq`);
    is(await count(page, '.fm-piece.is-heavy') === 1 && await count(page, '.fm-piece.is-light') === 1, `${tag}: the heavy share glows coral, the light one teal`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && s.pin && Math.abs(await barAngle(page)) < 0.5 && sp(await note(page)) === sp(T(loc, 'hintSprings')), `${tag}: miss 2 → the pin holds it level, hintSprings`);
    is(await count(page, '.fm-fair') === 1 && await count(page, '.fm-extra.is-long') >= 1 && await count(page, '.fm-extra.is-short') >= 1, `${tag}: the fair line; the long spring and the short one marked`);
    await click(page, K('card-' + await idx(page, 'circle-fourths')), tag); s = await st(page);
    is(!s.showing && await count(page, '.fm-fair') === 0 && await count(page, '.fm-piece.is-heavy') === 0 && sp(await note(page)) === '', `${tag}: a new card clears the help`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintCount2')) && await count(page, '.fm-spare') === 2, `${tag}: the fourths card → two pieces in the spare tray; at miss ≥ 2: count`);
    await force(page, 'hf', 0);
    await click(page, K('card-' + await idx(page, 'circle-fourths')), tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintMany')) && await count(page, '.fm-spare') === 2, `${tag}: miss 1, too many → hintMany`);
    await click(page, K('card-' + await idx(page, 'circle-notsplit')), tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintCount2')) && await count(page, '.fm-bare') === 1, `${tag}: the whole card → a bare hook`);
    await force(page, 'hf', 0);
    await click(page, K('card-' + await idx(page, 'circle-notsplit')), tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintFew')), `${tag}: miss 1, too few → hintFew`);
    await drag(page, await idx(page, 'circle-halves-v'), null, tag); s = await st(page);
    is(s.hung === s.cards.indexOf('circle-notsplit'), `${tag}: a drag that misses the mobile hangs nothing`);
    await drag(page, await idx(page, 'circle-halves-v'), 0, tag); s = await st(page);
    is(s.hung === s.cards.indexOf('circle-halves-v'), `${tag}: the fair card dragged onto the mobile`);
    await check(page, tag); s = await st(page);
    is(s.done && Math.abs(await barAngle(page)) < 0.5 && sp(await note(page)) === sp(T(loc, 'okHalves')), `${tag}: level, the success line`);
    is(await count(page, '.fm-label') === 2 && await page.evaluate(() => [...document.querySelectorAll('.fm-label text')].map(t => t.textContent).join('/')) === '1/2/1/2', `${tag}: a stacked ½ on both shares`);
    await click(page, K('card-' + await idx(page, 'circle-halves-uneq')), tag);
    is(Math.abs(await barAngle(page)) >= 6 && sp(await note(page)) === sp(T(loc, 'okHalves')), `${tag}: free play — another card swings at once`);
    /* thirds: the triangle */
    tag = `${loc} thirds #4`;
    await force(page, 'thirds', 3);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tThirds')), `${tag}: the task line`);
    await click(page, K('card-' + await idx(page, 'tri-thirds-bands')), tag); await check(page, tag);
    is(Math.abs(await barAngle(page)) >= 6 && sp(await note(page)) === sp(T(loc, 'hintUneq')), `${tag}: the bands tip the ⅓ mobile`);
    await click(page, K('card-' + await idx(page, 'tri-thirds-centre')), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okThirds')) && await count(page, '.fm-label') === 3, `${tag}: the centre cut hangs level, three labels`);
    /* name the share */
    tag = `${loc} name #2`;
    await force(page, 'name', 1); s = await st(page);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tName')), `${tag}: the task line`);
    is(await count(page, '.fm-plate') === 3, `${tag}: three name plates`);
    const wrong = (s.right + 1) % 3;
    await click(page, K('card-0'), tag); s = await st(page);
    is(s.sel === 0 && s.hung === null && await count(page, '.fm-card.is-sel') === 1, `${tag}: a tap chooses the card`);
    await click(page, K('mobile-' + wrong), tag); s = await st(page);
    is(s.hung === 0 && s.on === wrong, `${tag}: a tap on a mobile hangs it there`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintMobile')), `${tag}: the wrong mobile → hintMobile`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintCount2')) && await page.evaluate((r) => document.querySelectorAll('.fm-mob')[r].classList.contains('is-bob'), s.right), `${tag}: miss 2 → count; the right mobile bobs`);
    await drag(page, 0, s.right, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'ok3Fourth')), `${tag}: dragged to the right mobile → the line`);
    /* keyboard */
    tag = `${loc} keyboard`;
    await force(page, 'hf', 4);
    await page.focus(K('card-1')); await page.keyboard.press('Enter'); await wait(20); s = await st(page);
    is(s.hung === 1, `${tag}: Enter on a card hangs it`);
    await page.focus(K('mobile-0')); await page.keyboard.press('Delete'); await wait(20); s = await st(page);
    is(s.hung === null, `${tag}: Delete on the mobile takes it down`);
    /* settings */
    tag = `${loc} settings`;
    await force(page, 'hf', 0, { bubble: 'off' });
    is(await count(page, '.fm-bubble') === 0, `${tag}: spirit level off — no bubble`);
    await force(page, 'hf', 0);
    is(await count(page, '.fm-bubble') === 1, `${tag}: spirit level on — the bubble`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real actions, then resized ---- */
  async function reach(page, level, state, tag) {
    if (state === 'rest') return;
    const s = await st(page);
    if (level === 'name') { const m = state === 'solved' ? s.right : (s.right + 1) % 3; await click(page, K('card-0'), tag); await click(page, K('mobile-' + m), tag); }
    else { const i = state === 'solved' ? s.right : (s.right + 1) % 4; await click(page, K('card-' + i), tag); }
    await check(page, tag); if (state === 'miss2') await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.fm-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.fm-card').forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 63.5) out.fails.push('card ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.fm-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.fm-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.fm-wrap')).getBoundingClientRect();
    document.querySelectorAll('.fm-mob,.fm-card,.fm-check').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.fm-mobiles', '.fm-shelf', '.fm-foot', '.fm-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.fm-mob').forEach(m => { const b = m.querySelector('svg').getBoundingClientRect(); m.querySelectorAll('.fm-piece,.fm-label,.fm-plate,.fm-spare,line[stroke-width="10"]').forEach(e => { const q = e.getBoundingClientRect(); if (q.left < b.left - 1 || q.right > b.right + 1 || q.top < b.top - 1 || q.bottom > b.bottom + 1) out.fails.push((e.getAttribute('class') || 'bar').split(' ')[0] + ' leaves its mobile'); }); });
    /* the plate's word stays on its plate */
    document.querySelectorAll('.fm-plate').forEach(p => { const r = p.querySelector('rect').getBoundingClientRect(), tw = p.querySelector('.fm-pw'); if (!tw) return; const t = tw.getBoundingClientRect(); if (t.left < r.left || t.right > r.right) out.fails.push('a plate word overflows'); });
    /* a piece never covers another piece */
    /* two pieces whose FILLS share a point (boxes can overlap where the shapes do not, e.g. two diagonal halves) */
    document.querySelectorAll('.fm-mob').forEach(m => { const els = [...m.querySelectorAll('.fm-piece')], P = els.map(e => e.getBoundingClientRect()), inv = m.querySelector('svg').getScreenCTM().inverse();
      const inFill = (e, x, y) => { const q = new DOMPoint(x, y).matrixTransform(inv); return e.isPointInFill(q); };
      for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { const a = P[i], b = P[j], x0 = Math.max(a.left, b.left), x1 = Math.min(a.right, b.right), y0 = Math.max(a.top, b.top), y1 = Math.min(a.bottom, b.bottom); if (x1 - x0 < 1 || y1 - y0 < 1) continue; let hit = 0;
        for (let x = x0 + 0.5; x < x1 && !hit; x += 1) for (let y = y0 + 0.5; y < y1; y += 1) if (inFill(els[i], x, y) && inFill(els[j], x, y)) { hit = 1; break; }
        if (hit) out.fails.push('two pieces overlap'); } });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const level of LEVELS) for (const r of C.ids(level)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${level} #${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, level, r);
      await reach(page, level, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${level} #${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.FairMobileActivity, D = a._dims(), m = document.querySelector('.fm-mob svg'); return m && Math.abs(+m.getAttribute('width') - D.mobW) < 1 && a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow'); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.fm-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${level}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-fair-mobile: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
