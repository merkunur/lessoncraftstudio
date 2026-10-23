#!/usr/bin/env node
/* =====================================================================
   local-test-about-strings.js — ACTIVITY #79, The About-Strings (The
   Wobble Museum, W.K.2), in a real browser with REAL pointer clicks (never a
   model call to make a move). For every locale:
     · Catch the drift: a loose string is a hint, no miss; every string on
       the room's sign → miss 1 lights every about-word, the drift's string
       sags and "they" points back; miss 2 threads the drift to the door; one
       re-hook clears the help; success sends the drift through the door
       and builds the page ("they" right after a namer), the line names it;
     · Make the page: a cart card hangs on a tap and goes back; a room fact
       left on the cart is a miss of its own; the full page succeeds;
     · Name the room: an empty frame is a hint; the sun in the moon's frame
       makes exactly the two facts it is not true of sag; miss 2 lifts the
       moon on the shelf; the moon succeeds;
     · "Words that help" underlines the about-words; "Cards: 3" hangs three;
     · en: a real mouse drag of a string onto the door; the keyboard;
     · every room of every level at rest AND solved at 320–1366: Check
       above the fold at rest, the success line in view when solved, no
       sideways scroll, every control ≥ 44 px, every library picture at its
       floor, no card's text spilling out of its card.
   Usage: node scripts/local-test-about-strings.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '079-about-strings', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'about-strings-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, AboutStringsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'about-strings-activity.js'), 'utf8') + '\n;this.__A = AboutStringsActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(LIB, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/about-strings-activity.html?activity=wobble-museum.catch-drift.w-k-2&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.AboutStringsActivity && window.AboutStringsActivity.st && document.querySelector('.as-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.AboutStringsActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, idx, opts) {
    await page.evaluate((level, idx, o) => { const a = window.AboutStringsActivity; a.api.settings.level = level; a.api.settings.cards = (o && o.cards) || '4'; a.api.settings.help = (o && o.help) || 'off'; a._pool = null; a._ensurePool(); a._start(idx); a._render2(); }, level, idx, opts || {});
    await page.waitForFunction(() => { const im = [...document.querySelectorAll('.as-wrap img.as-pic')]; return im.length >= 1 && im.every(i => i.complete && i.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(60);
  }
  const st = (page) => page.evaluate(() => { const s = window.AboutStringsActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, help: s.help, sel: s.sel, wall: s.wall.slice(), cart: s.cart.slice(), hook: Object.assign({}, s.hook), frame: s.frame }; });
  const note = (page) => page.evaluate(() => document.querySelector('.as-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(40); return true;
  }
  async function hook(page, id, sign, tag) {   /* the child's way: tap the card, tap the sign */
    await click(page, `.as-card[data-id="${id}"]:not(.is-cart)`, tag);
    await click(page, sign === 'door' ? '[data-sign="door"]' : '[data-sign="topic"]', tag);
    is((await st(page)).hook[id] === sign, `${tag}: ${id}'s string is on the ${sign} sign`);
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- Catch the drift, frogs ---- */
    let tag = `${loc} drift`;
    await force(page, 'l1', 0);
    let s = await st(page), w = C.words(loc, 'frogs');
    await click(page, '.as-check', tag); s = await st(page);
    is(s.misses === 0 && s.last === 'loose' && sp(await note(page)) === sp(T(loc, 'hLoose')), `${tag}: loose strings → the hint, no miss`);
    for (const id of s.wall) await hook(page, id, 'topic', tag);
    await click(page, '.as-check', tag); s = await st(page); await wait(60);
    is(s.misses === 1 && s.last === 'strings' && sp(await note(page)) === sp(T(loc, 'hMiss1')), `${tag}: the drift on the room's sign is a miss`);
    is(await count(page, '.as-card.is-lit') === 4 && await count(page, '.as-string.is-slack') === 1, `${tag}: every about-word lights, the drift's string sags`);
    is(await count(page, '.as-arrow') === 1, `${tag}: "they" points back to its namer`);
    const lit = await page.evaluate(() => [...document.querySelectorAll('.as-card .as-about')].map(e => e.textContent));
    is(lit.every(x => x.length > 0), `${tag}: the about-words are marked (${lit.join(' | ')})`);
    await click(page, '.as-check', tag); s = await st(page); await wait(60);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hMiss2')) && await count(page, '.as-thread') === 1 && await count(page, '.as-door.is-want') === 1, `${tag}: miss 2 threads the drift to the door`);
    await hook(page, 'd0', 'door', tag); s = await st(page);
    is(s.help === 0 && await count(page, '.as-thread') === 0 && await count(page, '.as-card.is-lit') === 0, `${tag}: a move takes the help away`);
    await click(page, '.as-check', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okDrift'), { title: w.title })), `${tag}: success — «${await note(page)}»`);
    is(await count(page, '.as-door .as-visitor') === 1 && await count(page, '.as-pfacts li') === 3, `${tag}: the drift is in the next room, three facts on the page`);
    const pageFacts = await page.evaluate(() => [...document.querySelectorAll('.as-pfacts li')].map(e => e.textContent));
    is(pageFacts[1] === C_text(loc, 'frogs', 'f1'), `${tag}: "they" sits right after a namer on the page («${pageFacts.join(' / ')}»)`);
    /* ---- Make the page, moon ---- */
    tag = `${loc} page`;
    await force(page, 'l2', 1); w = C.words(loc, 'moon');
    await click(page, '.as-check', tag); s = await st(page);
    is(s.misses === 0 && s.last === 'loose', `${tag}: the hung card's loose string is a hint`);
    await click(page, '.as-card.is-cart[data-id="d0"]', tag); s = await st(page);
    is(s.wall.indexOf('d0') >= 0 && s.cart.indexOf('d0') < 0, `${tag}: a tap hangs a cart card`);
    await click(page, '.as-card[data-id="d0"]:not(.is-cart)', tag); await click(page, '.as-card.is-cart', tag); s = await st(page);
    is(s.cart.indexOf('d0') >= 0 && s.wall.indexOf('d0') < 0, `${tag}: a picked card goes back to the cart`);
    await hook(page, 'f3', 'topic', tag);
    await click(page, '.as-check', tag); s = await st(page);
    is(s.misses === 1 && s.last === 'missing' && sp(await note(page)) === sp(T(loc, 'hMissing')), `${tag}: a room fact left on the cart is a miss`);
    for (const id of ['f2', 'f4']) { await click(page, `.as-card.is-cart[data-id="${id}"]`, tag); await hook(page, id, 'topic', tag); }
    await click(page, '.as-check', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okPage'), { title: w.title })), `${tag}: the drifts stayed on the cart — «${await note(page)}»`);
    /* ---- Name the room, moon ---- */
    tag = `${loc} name`;
    await force(page, 'l3', 1);
    await click(page, '.as-check', tag); s = await st(page);
    is(s.misses === 0 && s.last === 'frame' && sp(await note(page)) === sp(T(loc, 'hFrame')), `${tag}: an empty frame is a hint`);
    await click(page, '.as-shelfpic[data-pic="weather/sunny"]', tag); s = await st(page);
    is(s.frame === 'weather/sunny', `${tag}: a tap puts the sun in the frame`);
    await click(page, '.as-check', tag); await wait(60);
    is(sp(await note(page)) === sp(T(loc, 'hSign')) && await count(page, '.as-card.is-slack') === 2 && await count(page, '.as-string.is-slack') === 2, `${tag}: the two facts the sun is not true of sag`);
    await click(page, '.as-check', tag);
    is(await count(page, '.as-shelfpic.is-want[data-pic="camping/moon"]') === 1 && sp(await note(page)) === sp(T(loc, 'hSign2')), `${tag}: miss 2 lifts the moon`);
    await click(page, '.as-shelfpic[data-pic="camping/moon"]', tag);
    await click(page, '.as-check', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okPage'), { title: C.words(loc, 'moon').title })), `${tag}: the moon names the room`);
    /* ---- settings ---- */
    await force(page, 'l1', 2, { help: 'on' });
    is(await page.evaluate(() => getComputedStyle(document.querySelector('.as-about')).textDecorationLine.indexOf('underline') >= 0), `${loc}: "Words that help" underlines the about-words`);
    await force(page, 'l1', 2, { cards: '3' });
    is(await count(page, '.as-cards .as-card') === 3, `${loc}: "Cards: 3" hangs three cards`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- en: a real drag of a string, the keyboard ---- */
  {
    const { page } = await open(1024, 'en'); const tag = 'en hand';
    await force(page, 'l1', 0);
    const from = await page.evaluate(() => { const r = document.querySelector('.as-card[data-id="d0"] .as-ring').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    const to = await page.evaluate(() => { const r = document.querySelector('[data-sign="door"] .as-arch').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await page.mouse.move(from.x + 12, from.y + 12); await page.mouse.down(); await page.mouse.move(from.x + 30, from.y + 20, { steps: 3 });
    await wait(40); is(await count(page, '.as-string.is-live') === 1, `${tag}: the string stretches with the finger`);
    await page.mouse.move(to.x, to.y, { steps: 12 }); await page.mouse.up(); await wait(80);
    let s = await st(page); is(s.hook.d0 === 'door' && s.sel === null, `${tag}: a drag hooks the drift's string on the door`);
    await page.focus('.as-card[data-id="f0"]'); await page.keyboard.press('Enter'); await wait(40);
    s = await st(page); is(s.sel === 'f0', `${tag}: Enter picks a card`);
    await page.focus('[data-sign="topic"]'); await page.keyboard.press('Enter'); await wait(40);
    s = await st(page); is(s.hook.f0 === 'topic', `${tag}: Enter on the sign hooks it`);
    await page.close();
  }

  /* ---- every room of every level at rest and solved, 320–1366 ---- */
  for (const loc of LOCS) for (const w of WIDTHS) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) for (const idx of C.ids()) for (const state of ['rest', 'solved']) {
      const tag = `${loc} @${w} ${lv}.${idx} ${state}`;
      await force(page, lv, idx);
      if (state === 'solved') {
        await page.evaluate(() => { const a = window.AboutStringsActivity, C = window.AboutStringsCore, s = a.st, r = s.r;
          if (r.level === 'l3') C.place(s, r.topic.pic);
          else { if (r.level === 'l2') s.cart.slice().forEach(id => { if (C.find(r, id).about === 'topic') C.hang(s, id); }); s.wall.forEach(id => id && C.hookTo(s, id, C.find(r, id).about)); }
          a._check(); });
        await page.waitForFunction(() => [...document.querySelectorAll('.as-wrap img.as-pic')].every(i => i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
        await wait(60);
      } else await page.evaluate(() => window.scrollTo(0, 0));
      const m = await page.evaluate(() => {
        const L = window.AboutStringsCore.layout(window.AboutStringsActivity._width()), out = { fails: [] };
        const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
        out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        out.chk = document.querySelector('.as-check').getBoundingClientRect().bottom;
        const nr = document.querySelector('.as-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
        [...document.querySelectorAll('.as-card,.as-sign,.as-door,.as-shelfpic,.as-check')].filter(vis).forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        [...document.querySelectorAll('.as-wrap img.as-pic')].filter(vis).forEach(i => { const r = i.getBoundingClientRect(), floor = L.mode === 'wide' ? 96 : 64; if (Math.round(Math.min(r.width, r.height)) < floor) out.fails.push('picture ' + Math.round(r.width) + ' < ' + floor); });
        [...document.querySelectorAll('.as-card')].filter(vis).forEach(c => { const t = c.querySelector('.as-text'), rg = document.createRange(); rg.selectNodeContents(t); const T = rg.getBoundingClientRect(), R = c.getBoundingClientRect(); if (T.right > R.right + 1 || T.bottom > R.bottom + 1 || T.left < R.left - 1) out.fails.push('card text spills: ' + t.textContent); });
        const cart = document.querySelector('.as-cart'); if (cart && vis(cart)) { const R = cart.getBoundingClientRect(); if (R.right > document.documentElement.clientWidth + 1) out.fails.push('cart wider than the page'); }
        return out;
      });
      is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
      if (state === 'rest') is(m.chk <= VH(w), `${tag}: Check above the fold (${Math.round(m.chk)} ≤ ${VH(w)})`);
      else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`);
      is(m.fails.length === 0, `${tag}: ${m.fails.slice(0, 3).join('; ')}`);
      if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 0 || idx === 1)) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${idx}-${w}-${state}.png`), fullPage: true });
    }
    is(errs.length === 0, `${loc} @${w}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-about-strings: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

function fill(s, a) { return String(s).replace(/\{(\w+)\}/g, (m, x) => x in a ? a[x] : m); }
function C_text(loc, room, id) { const r = C.round('l1', C.DATA.TOPICS.findIndex(t => t.id === room), '4'); return C.cardText(loc, r, id).text; }
