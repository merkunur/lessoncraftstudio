#!/usr/bin/env node
/* =====================================================================
   local-test-post-slot.js — the interaction gate for ACTIVITY #39, the
   Letterbox (K.G.A.3; G2 faces). Real pointer. Sort: Check with the bag
   full asks (no miss); a tap lifts a shape but never turns it edge-on; a
   shape DRAGGED onto the letter tray, one TAPPED onto the parcel tray; two
   on the wrong tray → Check posts the flat letters, shelves the solids and
   bounces the two back with their edge-on views (miss 1, "a line on its
   edge"); miss 2 puts an arrow on each; then the bag is posted and the
   flag goes up; free play turns shapes edge-on. Faces: Check before the
   tab asks; the turn button turns the solid; the tab opens the net; no
   number asks; a wrong number wobbles the unstamped faces (miss 1) then
   numbers the stamps (miss 2); the right number with a face unstamped
   bumps back (no miss); every face stamped + the right number posts it.
   The cylinder's curved sheet curls. Things: the library picture with its
   fitted outline. The setting, the keyboard, and the width sweep (no
   sideways scroll, controls ≥ 44 px, inside the card, above the fold,
   pressable). Library pictures served at their EXACT case.
   Usage: node scripts/local-test-post-slot.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.flat-solid.k-g-a-3';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'post-slot-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, PostSlotCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'post-slot-activity.js'), 'utf8') + '\n;this.__A = PostSlotActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice(12)) : path.join(MINI, p.replace(/^\//, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
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
    await page.goto(`${base}/post-slot-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PostSlotActivity && window.PostSlotActivity.st && document.querySelector('.ps-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.PostSlotActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.PostSlotActivity.st; const o = { id: s.r.id, misses: s.misses, help: s.help, show: s.show, done: s.done }; if (s.r.task === 'sort') Object.assign(o, { bag: s.bag, trays: s.trays, posted: s.posted, shelved: s.shelved, bounced: s.bounced }); else Object.assign(o, { unfolded: s.unfolded, stamps: s.stamps, chip: s.chip, pose: s.pose }); return JSON.parse(JSON.stringify(o)); });
  const note = (page) => page.evaluate(() => document.querySelector('.ps-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(p, page) { if (!p) throw new Error('nothing to tap'); await page.mouse.click(p.x, p.y); await wait(90); }
  const it = (id) => `.ps-it[data-id="${id}"]`;
  const tray = (d) => `.ps-tray[data-dest="${d}"]`;
  const check = async (page) => tap(await ctr(page, '.ps-check'), page);
  async function tapTo(page, id, d) { await tap(await ctr(page, it(id)), page); await tap(await ctr(page, tray(d) + ' .ps-motif'), page); }
  async function drag(page, id, d) {
    const a = await ctr(page, it(id));
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    const b = await page.evaluate((d) => { const r = document.querySelector('.ps-tray[data-dest="' + d + '"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, d);
    for (let i = 1; i <= 8; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8);
    await page.mouse.up(); await wait(90);
  }
  /* a point inside a net face that really presses it */
  const facePt = (page, fi) => page.evaluate((fi) => {
    const g = document.querySelector('.ps-fg[data-f="' + fi + '"]'); g.scrollIntoView({ block: 'center', behavior: 'instant' });
    const r = g.getBoundingClientRect();
    for (let a = 1; a < 10; a++) for (let b = 1; b < 10; b++) { const pa = (a + 4) % 9 + 1, pb = (b + 4) % 9 + 1; const x = r.left + r.width * pa / 10, y = r.top + r.height * pb / 10, h = document.elementFromPoint(x, y); if (h && h.closest('.ps-fg') === g) return { x, y }; }
    return null;
  }, fi);
  const stampAt = async (page, fi) => tap(await facePt(page, fi), page);
  const chip = async (page, n) => tap(await ctr(page, `.ps-chip[data-n="${n}"]`), page);
  async function force(page, task, id) {
    await page.evaluate((t, id) => { const a = window.PostSlotActivity; a.api.settings.task = t; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, task, id);
    await wait(250);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const T = (loc, k) => STR[k][loc];
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);

    /* 1. sort */
    await force(page, 'sort', 'B1');
    const r = C.rounds('sort').find(x => x.id === 'B1'), fl = (id) => C.byId(r, id).flat;
    is((await prompt(page)) === T(loc, 'pSort'), `${loc}: the prompt`);
    is((await count(page, '.ps-bag .ps-it')) === 6 && (await count(page, '.ps-tray')) === 2, `${loc}: a bag of six, two trays`);
    is(await page.evaluate(() => [...document.querySelectorAll('.ps-bag, .ps-tray, .ps-post')].every(e => e.textContent.trim() === '')), `${loc}: no words on the apparatus`);
    await check(page);
    is((await state(page)).misses === 0 && (await note(page)) === T(loc, 'hintBag'), `${loc}: Check with the bag full asks — not a miss`);
    let s = await state(page);
    const ids = s.bag.slice(), fid = ids.find(fl), sid = ids.find(id => !fl(id));
    await tap(await ctr(page, it(fid)), page);
    is(await page.evaluate((id) => { const e = document.querySelector('.ps-it[data-id="' + id + '"]'); return e.classList.contains('is-sel') && !e.classList.contains('is-edge') && getComputedStyle(e.querySelector('.ps-svg')).transform === 'none'; }, fid), `${loc}: a tap lifts the shape — it does not turn on its edge`);
    await tap(await ctr(page, it(fid)), page);
    await drag(page, fid, 'letter');
    s = await state(page);
    is(s.trays.letter.includes(fid) && !s.bag.includes(fid), `${loc}: a drag puts the shape on the letter tray`);
    await tapTo(page, sid, 'parcel');
    s = await state(page);
    is(s.trays.parcel.includes(sid), `${loc}: tap the shape, tap the tray — it moves`);
    const rest = s.bag.slice(), wf = rest.find(fl), ws = rest.find(id => !fl(id));
    for (const id of rest) await tapTo(page, id, (id === wf || id === ws) ? (fl(id) ? 'parcel' : 'letter') : (fl(id) ? 'letter' : 'parcel'));
    await check(page);
    s = await state(page);
    is(s.misses === 1 && s.help === 1 && s.bag.length === 2 && s.bag.includes(wf) && s.bag.includes(ws), `${loc}: Check — the two on the wrong tray bounce back (miss 1)`);
    is(s.posted.length === 2 && s.shelved.length === 2, `${loc}: the right letters are posted, the right parcels shelved`);
    is((await note(page)) === T(loc, 'hintLine') && (await count(page, '.ps-edge')) === 2 && (await count(page, '.ps-edge.is-flat')) === 1, `${loc}: miss 1 — their edge-on views: a line and a thick block`);
    is((await count(page, '.ps-shelved > g')) === 2, `${loc}: the shelved parcels stand on the shelf`);
    await tapTo(page, wf, 'parcel');
    is(!(await state(page)).show && await page.evaluate(() => document.querySelector('.ps-edges').hidden), `${loc}: a new move clears the showing`);
    await tapTo(page, ws, 'letter');
    await check(page);
    s = await state(page);
    is(s.misses === 2 && s.help === 2 && (await note(page)) === T(loc, 'hintArrows'), `${loc}: miss 2 — "follow the arrows"`);
    is((await count(page, '.ps-arrow.is-letter')) === 1 && (await count(page, '.ps-arrow.is-parcel')) === 1 && await page.evaluate((id) => !!document.querySelector('.ps-it[data-id="' + id + '"] .ps-arrow.is-letter'), wf), `${loc}: each bounced shape points to its tray`);
    await tapTo(page, wf, 'letter'); await tapTo(page, ws, 'parcel');
    await check(page);
    is((await state(page)).done && (await celebrated(page)) && (await bubble(page)).includes(T(loc, 'okSort')), `${loc}: the bag is posted (${await bubble(page)})`);
    is(await page.evaluate(() => document.querySelector('.ps-postsvg').classList.contains('is-done')), `${loc}: the flag goes up`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'sort-won.png') });

    /* 2. faces: the cube */
    await force(page, 'faces', 'F1');
    is((await prompt(page)) === T(loc, 'pFaces'), `${loc}: faces — the prompt`);
    is((await count(page, '.ps-hid')) >= 3 && (await count(page, '.ps-chip')) === 9, `${loc}: a see-through solid (hidden edges dashed) and chips 1–9`);
    await check(page);
    is((await note(page)) === T(loc, 'hintTab') && (await state(page)).misses === 0, `${loc}: Check before the tab asks`);
    const y0 = (await state(page)).pose.yaw;
    await tap(await ctr(page, '.ps-turn'), page);
    is((await state(page)).pose.yaw === (y0 + 90) % 360, `${loc}: the turn button turns the solid`);
    await tap(await ctr(page, '.ps-tab'), page);
    is((await state(page)).unfolded && (await count(page, '.ps-fg')) === 6 && (await count(page, '.ps-turn')) === 0, `${loc}: the tab opens it into six faces`);
    await check(page);
    is((await note(page)) === T(loc, 'hintChip'), `${loc}: no number — asks`);
    await chip(page, 5); await stampAt(page, 0); await stampAt(page, 1);
    s = await state(page);
    is(s.chip === 5 && s.stamps.length === 2 && (await count(page, '.ps-fg.is-stamped .ps-mark')) === 2, `${loc}: a chip and two postmarks`);
    await check(page);
    is((await state(page)).misses === 1 && (await note(page)) === T(loc, 'hintFaces') && (await count(page, '.ps-fg.is-wobble')) === 4, `${loc}: wrong number — miss 1, the four unstamped faces wobble`);
    await check(page);
    is((await state(page)).help === 2 && (await note(page)) === T(loc, 'hintNumbers') && (await count(page, '.ps-num')) === 2, `${loc}: miss 2 — the stamps are numbered`);
    await chip(page, 6); await check(page);
    s = await state(page);
    is(!s.done && s.misses === 2 && (await note(page)) === T(loc, 'hintFaces'), `${loc}: the right number with faces unstamped — the net bumps back, no miss`);
    for (let i = 2; i < 6; i++) await stampAt(page, i);
    await stampAt(page, 5); is((await state(page)).stamps.length === 5, `${loc}: a second tap takes a stamp off`); await stampAt(page, 5);
    await check(page);
    is((await state(page)).done && (await celebrated(page)) && (await bubble(page)).includes(T(loc, 'okFaces').replace('{n}', '6')), `${loc}: posted — ${await bubble(page)}`);
    is((await count(page, '.ps-tab.is-fold')) === 1, `${loc}: free play — the net can be folded up`);

    /* 3. the cylinder's curved sheet */
    await force(page, 'faces', 'F3');
    await tap(await ctr(page, '.ps-tab'), page);
    const sheet = await page.evaluate(() => { const g = document.querySelector('.ps-fg.is-curved'); return g && +g.getAttribute('data-f'); });
    await stampAt(page, sheet);
    is((await state(page)).stamps.length === 0 && (await note(page)) === T(loc, 'hintCurve'), `${loc}: the curved sheet curls — no stamp`);

    /* 4. things */
    await force(page, 'things', 'T1');
    is((await prompt(page)) === T(loc, 'pThings') && await page.evaluate(() => { const i = document.querySelector('.ps-thing'); return !!i && i.complete && i.naturalWidth > 0; }), `${loc}: things — the library picture loads`);
    is((await count(page, '.ps-ovis')) === 9 && (await count(page, '.ps-ohid')) === 3 && (await count(page, '.ps-turn')) === 0, `${loc}: the dice wears its cube outline (three hidden edges dashed)`);
    await force(page, 'things', 'T7');
    is(await page.evaluate(() => document.querySelector('.ps-turntable').classList.contains('is-lying')) && (await count(page, '.ps-outline ellipse')) === 1, `${loc}: the can lies on its side, a cylinder outline`);
    await tap(await ctr(page, '.ps-tab'), page);
    is((await count(page, '.ps-fg')) === 3 && (await count(page, '.ps-fg.is-curved')) === 1, `${loc}: the can opens into two circles and a curved sheet`);

    /* 5. the setting changes the board */
    for (const [t, sel] of [['faces', '.ps-turn'], ['things', '.ps-thing'], ['sort', '.ps-bag']]) { await page.evaluate((t) => { const a = window.PostSlotActivity; a.api.settings.task = t; a.onSettings(); }, t); await wait(250); is((await count(page, sel)) >= 1 && (await state(page)).id[0] === { sort: 'B', faces: 'F', things: 'T' }[t], `${loc}: "${t}" changes the board`); }

    /* 6. the keyboard */
    if (loc === 'en' || loc === 'fi') {
      await force(page, 'sort', 'B2');
      const k0 = (await state(page)).bag[0], kr = C.rounds('sort').find(x => x.id === 'B2');
      await page.focus(it(k0)); await page.keyboard.press('Enter'); await wait(60);
      const d = C.byId(kr, k0).flat ? 'letter' : 'parcel';
      await page.focus(tray(d)); await page.keyboard.press('Enter'); await wait(60);
      is((await state(page)).trays[d].includes(k0), `${loc}: keyboard — Enter on a shape, Enter on a tray`);
      await force(page, 'faces', 'F2');
      await page.focus('.ps-tab'); await page.keyboard.press('Enter'); await wait(60);
      await page.evaluate(() => document.querySelector('.ps-fg[data-f="0"]').focus()); await page.keyboard.press('Enter'); await wait(60);
      is((await state(page)).unfolded && (await state(page)).stamps.length === 1, `${loc}: keyboard — Enter opens the net and stamps a face`);
    }
    is(errs.length === 0, `${loc}: no errors (${errs.join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('fi', w);
    for (const [t, id] of [['sort', 'B4'], ['sort', 'B7'], ['faces', 'F1'], ['faces', 'F6'], ['faces', 'F5'], ['faces', 'F3'], ['things', 'T3'], ['things', 'T7']]) {
      await force(page, t, id);
      const probe = async (phase) => {
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect();
          const ctl = [...document.querySelectorAll('.ps-it, .ps-tray, .ps-chip, .ps-check, .ps-tab, .ps-turn, .ps-fg')].filter(e => !e.closest('[hidden]') && (e.offsetParent !== null || e.tagName === 'g')).map(e => { const r = e.getBoundingClientRect(); return { c: String(e.getAttribute('class')).split(' ')[0], l: r.left, r: r.right, b: r.bottom + scrollY, w: r.width, h: r.height }; });
          return { docW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight, app: { l: app.left, r: app.right }, ctl };
        });
        is(m.docW <= m.vw + 1, `${w} ${id} ${phase}: no sideways scroll`);
        m.ctl.forEach(c => {
          if (c.l < m.app.l - 1 || c.r > m.app.r + 1) is(false, `${w} ${id} ${phase}: ${c.c} inside the card`);
          if (Math.min(c.w, c.h) < 44) is(false, `${w} ${id} ${phase}: ${c.c} is ${Math.round(c.w)}×${Math.round(c.h)} — under 44`);
          if (c.b > m.vh + 1) is(false, `${w} ${id} ${phase}: ${c.c} below the fold (${Math.round(c.b)} > ${m.vh})`);
        });
        const blocked = await page.evaluate(() => {
          const out = [];
          [...document.querySelectorAll('.ps-it, .ps-tray, .ps-chip, .ps-check, .ps-tab, .ps-turn')].filter(e => !e.hidden && !e.disabled && e.offsetParent !== null).forEach(e => { e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(), hh = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); if (!(hh && (hh === e || e.contains(hh)))) out.push(String(e.className).split(' ')[0] + ' ' + (e.getAttribute('data-id') || e.getAttribute('data-dest') || e.getAttribute('data-n') || '')); });
          document.querySelectorAll('.ps-fg').forEach(g => { g.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = g.getBoundingClientRect(); let ok = false; for (let a = 1; a < 10 && !ok; a++) for (let b = 1; b < 10 && !ok; b++) { const h = document.elementFromPoint(r.left + r.width * a / 10, r.top + r.height * b / 10); if (h && h.closest('.ps-fg') === g) ok = true; } if (!ok) out.push('face ' + g.getAttribute('data-f')); });
          window.scrollTo({ top: 0, behavior: 'instant' });
          return out;
        });
        is(blocked.length === 0, `${w} ${id} ${phase}: every control can be pressed (${blocked.join(', ')})`);
      };
      await probe('rest');
      if (t === 'sort') {
        await page.evaluate(() => { const a = window.PostSlotActivity, C = PostSlotCore, st = a.st, r = st.r; st.bag.slice(0, 3).forEach(id => C.move(st, id, C.byId(r, id).flat ? 'letter' : 'parcel')); a._paint(); });
        await probe('half');
        await page.evaluate(() => { const a = window.PostSlotActivity, C = PostSlotCore, st = a.st, r = st.r; st.bag.slice().forEach((id, i) => C.move(st, id, (i === 0) === C.byId(r, id).flat ? 'parcel' : 'letter')); a._check(); });
        await wait(60); await probe('miss 1');
        await page.evaluate(() => { const a = window.PostSlotActivity, C = PostSlotCore, st = a.st, r = st.r; st.bag.slice().forEach(id => C.move(st, id, C.byId(r, id).flat ? 'parcel' : 'letter')); a._check(); });
        await wait(60); await probe('miss 2');
      } else {
        await page.evaluate(() => { const a = window.PostSlotActivity, C = PostSlotCore, st = a.st; C.unfold(st); st.net.faces.forEach((f, i) => { if (!f.curved && i > 0) C.stamp(st, i); }); C.setChip(st, st.r.answer + 1); a._check(); a._check(); });
        await wait(60); await probe('net, miss 2');
      }
      if (SHOT && (w === 360 || w === 704 || w === 1024)) await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${id}.png`), fullPage: true });
    }
    is(errs.length === 0, `${w}: no errors (${errs.join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-post-slot: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
