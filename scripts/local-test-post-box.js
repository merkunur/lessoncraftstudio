#!/usr/bin/env node
/* =====================================================================
   local-test-post-box.js — the interaction gate for ACTIVITY #40, the
   Number Post Box (K.G.B.4). Real pointer. Count: pegs plant, wiggle and
   lift; a wrong door bounces (a bare side glows, or a stick tumbles off);
   the second bounce ticks the sides (help 1), the fourth plants the pegs
   and the right door breathes (help 2); the right door posts it. Sort: a
   DRAG posts a shape, a tap-tap bounces one; Check before any offer asks;
   Check with shapes left wobbles them (miss 1), then hovers their door's
   sticks (miss 2); then the tray is posted and the drawer shows the names.
   Real: every near-miss verdict (lengths, corners, open, curve) and the
   real squares posted. Name: named doors. The settings, the keyboard,
   double-tap spin, and the width sweep (no sideways scroll, controls
   ≥ 44 px, inside the card, above the fold, pressable, every side of the
   counting shape hit-testable), plus the fold at 320 in every locale.
   Usage: node scripts/local-test-post-box.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.count-sides.k-g-b-4';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };
const C = require(path.join(MINI, 'post-box-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, PostBoxCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'post-box-activity.js'), 'utf8') + '\n;this.__A = PostBoxActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function exact(file) { const parts = path.relative(MINI, file).split(path.sep); let cur = MINI; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); const file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  async function open(loc, w) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/post-box-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PostBoxActivity && window.PostBoxActivity.st && document.querySelector('.pb-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.PostBoxActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.PostBoxActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, pegs: s.pegs, bounces: s.bounces, offers: s.offers, misses: s.misses, help: s.help, show: s.show, done: s.done, posted: s.posted, tiles: s.tiles, doors: s.doors, slots: s.slots })); });
  const note = (page) => page.evaluate(() => document.querySelector('.pb-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(p, page) { if (!p) throw new Error('nothing to tap'); await page.mouse.click(p.x, p.y); await wait(90); }
  const door = (d) => `.pb-door[data-door="${d}"]`, tile = (id) => `.pb-tile[data-id="${id}"]`;
  /* the midpoint of a side of the counting shape, in page px — and it must press that side */
  const sidePt = (page, i) => page.evaluate((i) => { const ln = document.querySelector('.pb-side[data-side="' + i + '"]'); ln.closest('.pb-tile').scrollIntoView({ block: 'center', behavior: 'instant' }); const svg = ln.ownerSVGElement, m = svg.getScreenCTM(), pt = svg.createSVGPoint(); pt.x = (+ln.getAttribute('x1') + +ln.getAttribute('x2')) / 2; pt.y = (+ln.getAttribute('y1') + +ln.getAttribute('y2')) / 2; const q = pt.matrixTransform(m), h = document.elementFromPoint(q.x, q.y); return h === ln ? { x: q.x, y: q.y } : null; }, i);
  async function drag(page, id, d) {
    const a = await ctr(page, tile(id));
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    const b = await page.evaluate((d) => { const r = document.querySelector('.pb-door[data-door="' + d + '"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, d);
    for (let i = 1; i <= 8; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8);
    await page.mouse.up(); await wait(90);
  }
  async function force(page, md, lv, id) {
    await page.evaluate((md, lv, id) => { const a = window.PostBoxActivity; a.api.settings.mode = md; a.api.settings.shapes = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, md, lv, id);
    await wait(250);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const rightOf = (r, key) => r.doors.find(d => C.fits(C.shapeOf(key), d));

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);

    /* 1. count: the long rectangle */
    await force(page, 'count', 'first', 'C2');
    is((await prompt(page)) === T(loc, 'pCount') && (await count(page, '.pb-door')) === 4 && await page.evaluate(() => document.querySelector('.pb-check').hidden), `${loc}: count — the prompt, four doors, no Check`);
    is(await page.evaluate(() => [...document.querySelectorAll('.pb-num')].map(e => e.textContent).join()) === '3,4,5,6', `${loc}: doors 3 4 5 6 in order`);
    await tap(await sidePt(page, 0), page); await tap(await sidePt(page, 1), page);
    is((await state(page)).pegs.join() === '0,1' && (await count(page, '.pb-peg')) === 2, `${loc}: two sides tapped, two pegs`);
    await tap(await sidePt(page, 0), page);
    is((await state(page)).pegs.join() === '0,1', `${loc}: tapping an earlier peg only wiggles it`);
    await tap(await sidePt(page, 1), page);
    is((await state(page)).pegs.join() === '0', `${loc}: tapping the last peg lifts it`);
    await tap(await ctr(page, door(3)), page);
    let s = await state(page);
    is(s.bounces === 1 && !s.done && (await note(page)) === T(loc, 'resTooFew', { a: 3, b: 4 }) && (await count(page, '.pb-bare')) === 1, `${loc}: door 3 — a side has no stick, it glows`);
    await tap(await ctr(page, door(5)), page);
    s = await state(page);
    is(s.help === 1 && (await note(page)) === T(loc, 'hintCount1') && (await count(page, '.pb-tick')) === 4 && (await count(page, '.pb-extra')) === 1, `${loc}: door 5 — a stick tumbles off; help 1 ticks the four sides`);
    await tap(await ctr(page, door(6)), page); await tap(await ctr(page, door(3)), page);
    s = await state(page);
    is(s.help === 2 && (await note(page)) === T(loc, 'hintCount2') && s.pegs.length === 4 && await page.evaluate(() => document.querySelector('.pb-door[data-door="4"]').classList.contains('is-breathe')), `${loc}: fourth bounce — the pegs plant themselves, door 4 breathes`);
    await tap(await ctr(page, door(4)), page);
    is((await state(page)).done && (await celebrated(page)) && (await bubble(page)).includes(T(loc, 'ok_rect')), `${loc}: door 4 — posted (${await bubble(page)})`);

    /* 2. sort */
    await force(page, 'sort', 'first', 'S1');
    const sr = C.rounds('sort', 'first')[0];
    is((await prompt(page)) === T(loc, 'pSort') && (await count(page, '.pb-tile')) === 6 && (await count(page, '.pb-door')) === 3, `${loc}: sort — six shapes, three doors`);
    await tap(await ctr(page, '.pb-check'), page);
    is((await state(page)).misses === 0 && (await note(page)) === T(loc, 'hintStartTray'), `${loc}: Check before any offer asks — not a miss`);
    s = await state(page);
    const k0 = s.tiles[0], k1 = s.tiles[1];
    await drag(page, k0.id, rightOf(sr, k0.key));
    is((await state(page)).posted.includes(k0.id), `${loc}: a drag posts a shape through its door`);
    const wrongDoor = sr.doors.find(d => !C.fits(C.shapeOf(k1.key), d));
    await tap(await ctr(page, tile(k1.id)), page); await tap(await ctr(page, door(wrongDoor)), page);
    s = await state(page);
    is(!s.posted.includes(k1.id) && s.offers === 2 && (await note(page)).length > 0, `${loc}: tap, tap a wrong door — it bounces`);
    await tap(await ctr(page, '.pb-check'), page);
    is((await state(page)).misses === 1 && (await note(page)) === T(loc, 'hintTray1') && (await count(page, '.pb-tile.is-wobble')) === 5, `${loc}: Check with five left — they wobble (miss 1)`);
    await tap(await ctr(page, tile(k1.id)), page); await tap(await ctr(page, door(wrongDoor)), page);
    is(!(await state(page)).show && (await count(page, '.pb-tile.is-wobble')) === 0, `${loc}: a new offer takes the showing away`);
    await tap(await ctr(page, '.pb-check'), page);
    is((await state(page)).help === 2 && (await note(page)) === T(loc, 'hintTray2') && (await count(page, '.pb-hover')) === 5, `${loc}: miss 2 — their doors' sticks hover over them`);
    for (const t of (await state(page)).tiles.filter(t => !t.posted)) { await tap(await ctr(page, tile(t.id)), page); await tap(await ctr(page, door(rightOf(sr, t.key))), page); }
    await tap(await ctr(page, '.pb-check'), page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'okSort')) && (await count(page, '.pb-plate')) === 6, `${loc}: every shape posted — the drawer shows six name plates`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'sort-won.png') });

    /* 3. real: every near-miss verdict */
    await force(page, 'real', 'first', 'R2');
    is((await prompt(page)) === T(loc, 'pReal_sq') && (await count(page, '.pb-door.is-big')) === 1, `${loc}: real — one big door`);
    s = await state(page);
    for (const [key, res] of [['N-long', 'resLengths'], ['N-skew', 'resCorners'], ['N-open4', 'resOpen'], ['N-curve4', 'resCurve']]) {
      const t = s.tiles.find(x => x.key === key); await tap(await ctr(page, tile(t.id)), page); await tap(await ctr(page, door('sq')), page);
      is((await note(page)) === T(loc, res) && !(await state(page)).posted.includes(t.id), `${loc}: ${key} at the square door — ${res}`);
    }
    is((await count(page, '.pb-rock')) === 1, `${loc}: the straight stick rocks on the curve`);
    const q1 = s.tiles.find(x => x.key === 'Q1'); await tap(await ctr(page, tile(q1.id)), page); await tap(await ctr(page, door('sq')), page);
    await tap(await ctr(page, '.pb-check'), page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'okReal_sq')), `${loc}: the real square posted — done`);
    await force(page, 'real', 'more', 'Rm3');
    is((await prompt(page)) === T(loc, 'pRiddle_rect') && (await count(page, '.pb-tile')) === 6, `${loc}: real, more — the riddle and a sixth tile`);

    /* 4. name */
    await force(page, 'name', 'first', 'N1');
    const nr = C.rounds('name', 'first')[0];
    is((await prompt(page)) === T(loc, 'pName') && (await page.evaluate(() => [...document.querySelectorAll('.pb-name')].map(e => e.textContent.replace(/­/g, '')).sort().join('|'))) === nr.doors.map(d => STR['n_' + d][loc].replace(/­/g, '')).sort().join('|'), `${loc}: name — the doors carry the names`);
    for (const t of (await state(page)).tiles) { await tap(await ctr(page, tile(t.id)), page); await tap(await ctr(page, door(rightOf(nr, t.key))), page); }
    await tap(await ctr(page, '.pb-check'), page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'okName')), `${loc}: every shape through the door with its name`);

    /* 5. the settings change the board */
    for (const [md, lv, n] of [['count', 'more', 6], ['count', 'first', 4], ['sort', 'more', 4], ['real', 'first', 1], ['name', 'more', 4]]) { await page.evaluate((md, lv) => { const a = window.PostBoxActivity; a.api.settings.mode = md; a.api.settings.shapes = lv; a.onSettings(); }, md, lv); await wait(250); is((await count(page, '.pb-door')) === n, `${loc}: ${md}/${lv} — ${n} door(s)`); }

    /* 6. the keyboard + double-tap spin */
    if (loc === 'en' || loc === 'fi') {
      await force(page, 'count', 'first', 'C1');
      await page.focus('.pb-tile'); await page.keyboard.press('ArrowRight'); await page.keyboard.press(' '); await wait(60);
      is((await state(page)).pegs.join() === '1', `${loc}: keyboard — an arrow walks the sides, Space plants a peg`);
      await page.keyboard.press('Backspace'); await wait(60);
      is((await state(page)).pegs.length === 0, `${loc}: keyboard — Backspace lifts it`);
      await page.keyboard.press('r'); await wait(60);
      is((await state(page)).tiles[0].turn === 45, `${loc}: keyboard — R spins the shape`);
      await page.focus(door(3)); await page.keyboard.press('Enter'); await wait(60);
      is((await state(page)).done, `${loc}: keyboard — Enter on door 3 posts the triangle`);
      await force(page, 'sort', 'first', 'S2');
      s = await state(page); const kt = s.tiles[0], kr = C.rounds('sort', 'first')[1];
      await page.focus(tile(kt.id)); await page.keyboard.press('Enter'); await wait(60);
      await page.focus(door(rightOf(kr, kt.key))); await page.keyboard.press('Enter'); await wait(60);
      is((await state(page)).posted.includes(kt.id), `${loc}: keyboard — Enter on a shape, Enter on a door`);
      const kt2 = s.tiles[1], p2 = await ctr(page, tile(kt2.id)), t0 = kt2.turn;
      await page.mouse.click(p2.x, p2.y); await wait(60); await page.mouse.click(p2.x, p2.y); await wait(120);
      is((await state(page)).tiles[1].turn === (t0 + 45) % 360, `${loc}: a double tap spins a shape`);
    }
    is(errs.length === 0, `${loc}: no errors (${errs.join(' | ')})`);
    await page.close();

    /* 7. the fold at 320 in every locale, on the tallest board (name, more, miss 2) */
    const { page: p320, errs: e320 } = await open(loc, 320);
    for (const [md, lv, id] of [['name', 'more', 'Nm2'], ['sort', 'more', 'Sm1'], ['count', 'more', 'Cm4']]) {
      await force(p320, md, lv, id);
      await p320.evaluate(() => { const a = window.PostBoxActivity, C = PostBoxCore, st = a.st, r = st.r; if (r.mode === 'count') { const t = st.tiles[0], n = C.sidesOf(C.tileShape(t)); st.doors.filter(d => d !== n).slice(0, 4).forEach(d => a._offer(t.id, d)); } else { const t = st.tiles[0]; a._offer(t.id, r.doors.find(d => C.fits(C.tileShape(t), d))); a._check(); a._check(); } a._paint(); });
      const low = await p320.evaluate(() => { const c = document.querySelector('.pb-check'), d = document.querySelector('.pb-doors').getBoundingClientRect(); return Math.max(d.bottom, c && !c.hidden ? c.getBoundingClientRect().bottom : 0) + scrollY; });
      is(low <= 641, `${loc} 320 ${id}: Check and the doors above the fold (${Math.round(low)})`);
    }
    is(e320.length === 0, `${loc} 320: no errors (${e320.join(' | ')})`);
    await p320.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('fi', w);
    for (const [md, lv, id] of [['count', 'first', 'C9'], ['count', 'more', 'Cm4'], ['count', 'more', 'Cm8'], ['sort', 'more', 'Sm4'], ['real', 'more', 'Rm6'], ['name', 'more', 'Nm2'], ['name', 'first', 'N1']]) {
      await force(page, md, lv, id);
      const probe = async (phase) => {
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect();
          const ctl = [...document.querySelectorAll('.pb-tile, .pb-door, .pb-check')].filter(e => !e.hidden && e.offsetParent !== null).map(e => { const r = e.getBoundingClientRect(); return { c: String(e.className).split(' ')[0] + ' ' + (e.getAttribute('data-id') || e.getAttribute('data-door') || ''), l: r.left, r: r.right, b: r.bottom + scrollY, w: r.width, h: r.height }; });
          const hov = [...document.querySelectorAll('.pb-hover')].map(e => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right }; });
          return { docW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight, app: { l: app.left, r: app.right }, ctl, hov };
        });
        is(m.docW <= m.vw + 1, `${w} ${id} ${phase}: no sideways scroll`);
        m.ctl.forEach(c => {
          if (c.l < m.app.l - 1 || c.r > m.app.r + 1) is(false, `${w} ${id} ${phase}: ${c.c} inside the card`);
          if (Math.min(c.w, c.h) < 44) is(false, `${w} ${id} ${phase}: ${c.c} is ${Math.round(c.w)}×${Math.round(c.h)} — under 44`);
          if (c.b > m.vh + 1) is(false, `${w} ${id} ${phase}: ${c.c} below the fold (${Math.round(c.b)} > ${m.vh})`);
        });
        m.hov.forEach((h, i) => { if (h.l < m.app.l - 1 || h.r > m.app.r + 1) is(false, `${w} ${id} ${phase}: hover badge ${i} inside the card`); });
        const blocked = await page.evaluate(() => {
          const out = [];
          [...document.querySelectorAll('.pb-tile, .pb-door, .pb-check')].filter(e => !e.hidden && !e.disabled && e.offsetParent !== null).forEach(e => { e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(), hh = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); if (!(hh && (hh === e || e.contains(hh)))) out.push(String(e.className).split(' ')[0] + ' ' + (e.getAttribute('data-id') || e.getAttribute('data-door') || '')); });
          document.querySelectorAll('.pb-side').forEach(ln => { ln.closest('.pb-tile').scrollIntoView({ block: 'center', behavior: 'instant' }); const svg = ln.ownerSVGElement, mm = svg.getScreenCTM(), pt = svg.createSVGPoint(); pt.x = (+ln.getAttribute('x1') + +ln.getAttribute('x2')) / 2; pt.y = (+ln.getAttribute('y1') + +ln.getAttribute('y2')) / 2; const q = pt.matrixTransform(mm), h = document.elementFromPoint(q.x, q.y); if (h !== ln) out.push('side ' + ln.getAttribute('data-side')); });
          window.scrollTo({ top: 0, behavior: 'instant' });
          return out;
        });
        is(blocked.length === 0, `${w} ${id} ${phase}: every control and every side can be pressed (${blocked.join(', ')})`);
      };
      await probe('rest');
      await page.evaluate(() => { const a = window.PostBoxActivity, C = PostBoxCore, st = a.st, r = st.r; if (r.mode === 'count') { const t = st.tiles[0], n = C.sidesOf(C.tileShape(t)); st.doors.filter(d => d !== n).slice(0, 4).forEach(d => a._offer(t.id, d)); } else { st.tiles.slice(0, 2).forEach(t => { const d = r.doors.find(q => C.fits(C.tileShape(t), q)); if (d != null) a._offer(t.id, d); }); a._check(); a._check(); } a._paint(); });
      await wait(60); await probe(md === 'count' ? 'help 2' : 'miss 2');
      if (SHOT && (w === 360 || w === 704 || w === 1024)) await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${id}.png`), fullPage: true });
    }
    is(errs.length === 0, `${w}: no errors (${errs.join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-post-box: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
