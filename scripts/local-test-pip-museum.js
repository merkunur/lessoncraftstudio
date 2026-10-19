#!/usr/bin/env node
/* =====================================================================
   local-test-pip-museum.js — the interaction gate for ACTIVITY #38,
   Professor Pip's Museum (K.G.A.2). Real pointer: Check with treasures on
   the belt (asks, no miss); a treasure DRAGGED onto a pedestal; a treasure
   TAPPED then a pedestal tapped; a wrong one refused back to the belt with
   the ghost clasp (miss 1, "look at its sides and corners"); the same
   wrong again → the right pedestal glows for the selected treasure (miss 2);
   the rest right → the wing opens; the Mystery Gallery takes a cone; the
   capstone counters (− / +, no 0); riddle plates; the setting changes the
   hall; the keyboard; the width sweep at rest, half routed, miss 1 and the
   count phase (no sideways scroll, controls ≥ 44 px, inside the card, above
   the fold, pressable). Library pictures served at their EXACT case.
   Usage: node scripts/local-test-pip-museum.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'pip-museum.curate-wing.k-g-a-2';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'pip-museum-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, PipMuseumCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'pip-museum-activity.js'), 'utf8') + '\n;this.__A = PipMuseumActivity;', ctx); return ctx.__A.strings; })();
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
    await page.goto(`${base}/pip-museum-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PipMuseumActivity && window.PipMuseumActivity.st && document.querySelector('.pm-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.PipMuseumActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.PipMuseumActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, belt: s.belt, trays: s.trays, held: s.held, refused: s.refused, count: s.count, phase: s.phase, misses: s.misses, help: s.help, done: s.done, sel: s.sel })); });
  const note = (page) => page.evaluate(() => document.querySelector('.pm-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(p, page) { if (!p) throw new Error('nothing to tap'); await page.mouse.click(p.x, p.y); await wait(90); }
  const tr = (id) => `.pm-tr[data-id="${id}"]`;
  const top = (d) => `.pm-top[data-dest="${d}"]`;
  const check = async (page) => tap(await ctr(page, '.pm-check'), page);
  /* tap a treasure, then tap a pedestal */
  async function tapRoute(page, id, d) { await tap(await ctr(page, tr(id)), page); await tap(await ctr(page, top(d)), page); }
  /* a real drag: down on the treasure, through the air, up over the pedestal's tray */
  async function drag(page, id, d) {
    const a = await ctr(page, tr(id));
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    const b = await page.evaluate((d) => { const r = document.querySelector('.pm-tray[data-dest="' + d + '"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, d);
    for (let i = 1; i <= 8; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8);
    await page.mouse.up(); await wait(90);
  }
  async function force(page, hall, id, plates) {
    await page.evaluate((h, id, pl) => { const t = window.PipMuseumActivity; t.api.settings.hall = h; t.api.settings.plates = pl || 'names'; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); }, hall, id, plates);
    await wait(250);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const T = (loc, k) => STR[k][loc];
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const round = (hall, id) => C.rounds(hall).find(x => x.id === id);

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);

    /* 1. S1 — drag, tap, refuse, glow, open */
    await force(page, 'shapes', 'S1');
    const r1 = round('shapes', 'S1'), D1 = C.dests(r1);
    is((await prompt(page)) === T(loc, 'pShapes'), `${loc}: the prompt`);
    is((await count(page, '.pm-col')) === 3 && (await count(page, '.pm-belt .pm-tr')) === 4, `${loc}: three pedestals, four treasures on the belt`);
    is(await page.evaluate(() => [...document.querySelectorAll('.pm-top, .pm-tray, .pm-belt')].every(e => e.textContent.trim() === '')), `${loc}: no words on the pedestals or the belt`);
    is((await page.evaluate(() => [...document.querySelectorAll('.pm-plate .pm-pname')].map(e => e.textContent))).join('|') === D1.map(d => T(loc, 'n_' + d)).join('|'), `${loc}: the plates name the pedestals`);
    await check(page);
    is((await state(page)).misses === 0 && (await note(page)) === T(loc, 'hintBelt'), `${loc}: Check with treasures on the belt asks — not a miss`);
    const [a, b, c, d] = r1.belt.map(t => t.id);
    await drag(page, a, C.rightOf(r1, C.byId(r1, a)));
    let s = await state(page);
    is(s.trays[C.rightOf(r1, C.byId(r1, a))].includes(a) && !s.belt.includes(a), `${loc}: a drag puts the treasure on its pedestal`);
    await tapRoute(page, b, C.rightOf(r1, C.byId(r1, b)));
    s = await state(page);
    is(s.trays[C.rightOf(r1, C.byId(r1, b))].includes(b) && s.sel == null, `${loc}: tap the treasure, tap the pedestal — it moves`);
    await tap(await ctr(page, tr(b)), page);
    is((await state(page)).trays[C.rightOf(r1, C.byId(r1, b))].includes(b), `${loc}: an unchecked treasure can be tapped again`);
    await tap(await ctr(page, top(C.rightOf(r1, C.byId(r1, b)))), page);
    const wrongOf = (id) => D1.find(x => x !== C.rightOf(r1, C.byId(r1, id)));
    await tapRoute(page, c, C.rightOf(r1, C.byId(r1, c)));
    await drag(page, d, wrongOf(d));
    await check(page);
    s = await state(page);
    is(s.misses === 1 && s.help === 1 && s.belt.join() === d && s.held[a] && s.held[b] && s.held[c], `${loc}: Check — three clasps close, the wrong one comes back (miss 1)`);
    is((await note(page)) === T(loc, 'hintTruth'), `${loc}: miss 1 — "look at its sides and corners"`);
    is(await page.evaluate((id) => !!document.querySelector('.pm-tr[data-id="' + id + '"] .pm-ghost'), d), `${loc}: the refused treasure shows its ghost clasp`);
    is(await page.evaluate((w) => document.querySelector('.pm-col[data-dest="' + w + '"]').classList.contains('is-refuse'), wrongOf(d)), `${loc}: the refusing pedestal shakes`);
    await page.evaluate((id) => { const el = document.querySelector('.pm-tr[data-id="' + id + '"]'); el.scrollIntoView({ block: 'center', behavior: 'instant' }); }, a);
    const heldDown = await ctr(page, tr(a)); await page.mouse.move(heldDown.x, heldDown.y); await page.mouse.down(); await page.mouse.move(heldDown.x + 60, heldDown.y + 120, { steps: 6 }); await page.mouse.up(); await wait(90);
    is((await state(page)).held[a] && !(await state(page)).belt.includes(a), `${loc}: a held treasure cannot be dragged away`);
    await drag(page, d, wrongOf(d));
    await check(page);
    s = await state(page);
    is(s.misses === 2 && s.help === 2 && (await note(page)) === T(loc, 'hintGlow'), `${loc}: miss 2 — help survives the drag, "the right one glows"`);
    await tap(await ctr(page, tr(d)), page);
    is((await count(page, '.pm-col.is-glow')) === 1 && await page.evaluate((w) => document.querySelector('.pm-col[data-dest="' + w + '"]').classList.contains('is-glow'), C.rightOf(r1, C.byId(r1, d))), `${loc}: the selected treasure's pedestal glows`);
    await tap(await ctr(page, top(C.rightOf(r1, C.byId(r1, d)))), page);
    await check(page);
    is((await state(page)).done && (await celebrated(page)) && (await bubble(page)).includes(T(loc, 'ok_S1')), `${loc}: the wing opens (${await bubble(page)})`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'S1-won.png') });

    /* 2. S3 — the Mystery Gallery, a rhombus is not a square */
    await force(page, 'shapes', 'S3');
    const r3 = round('shapes', 'S3');
    is((await count(page, '.pm-col.is-mystery')) === 1 && await page.evaluate(() => document.querySelector('.pm-col:last-child').classList.contains('is-mystery')), `${loc}: the Mystery Gallery is the last doorway`);
    const rh = r3.belt.find(t => t.k === 'rhombus');
    await drag(page, rh.id, 'square');
    for (const t of r3.belt.filter(t => t !== rh)) await tapRoute(page, t.id, C.rightOf(r3, t));
    await check(page);
    s = await state(page);
    is(s.belt.join() === rh.id && s.misses === 1, `${loc}: the square clasp refuses the rhombus`);
    await tapRoute(page, rh.id, 'mystery'); await check(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'ok_S3')), `${loc}: the rhombus goes to the Mystery Gallery`);

    /* 3. S9 — the capstone counters */
    await force(page, 'shapes', 'S9');
    const r9 = round('shapes', 'S9');
    for (const t of r9.belt) await tapRoute(page, t.id, C.rightOf(r9, t));
    await check(page);
    s = await state(page);
    is(s.phase === 'count' && (await count(page, '.pm-counter')) === 2 && await page.evaluate(() => !document.querySelector('.pm-counters').hidden && document.querySelector('.pm-belt').hidden), `${loc}: every clasp closes — the counters open`);
    is((await note(page)) === T(loc, 'hintCount') && s.misses === 0, `${loc}: "how many?" — not a miss`);
    const step = async (ci, which, n) => { for (let j = 0; j < n; j++) await tap(await page.evaluate((ci, wh) => { const bt = document.querySelectorAll('.pm-counter')[ci].querySelectorAll('.pm-step')[wh]; bt.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = bt.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, ci, which), page); };
    await step(0, 0, 3);
    is((await state(page)).count.triangle == null || (await state(page)).count.triangle >= 1, `${loc}: − never reaches 0`);
    await step(0, 1, 2); await step(1, 1, 3);
    s = await state(page);
    is(s.count.triangle === 2 && s.count.square === 3 && (await page.evaluate(() => [...document.querySelectorAll('.pm-val')].map(e => e.textContent).join())) === '2,3', `${loc}: the counters read 2 and 3`);
    await check(page);
    is((await state(page)).misses === 1 && (await note(page)) === T(loc, 'hintCountOne'), `${loc}: 2 triangles is wrong — count them one by one`);
    await step(0, 1, 1); await check(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'ok_S9')), `${loc}: 3 triangles and 3 squares`);

    /* 4. the solids: an object on each pedestal, the cone to the Mystery */
    await force(page, 'solids', 'D3');
    const rd = round('solids', 'D3');
    is((await prompt(page)) === T(loc, 'pSolids') && (await count(page, '.pm-top .pm-obj')) === 2 && (await count(page, '.pm-cage')) === 2, `${loc}: solids — a library object in a wire cage on each pedestal`);
    is(await page.evaluate(() => [...document.querySelectorAll('.pm-obj')].every(i => i.complete && i.naturalWidth > 0)), `${loc}: every object picture loads`);
    for (const t of rd.belt) await tapRoute(page, t.id, C.rightOf(rd, t));
    s = await state(page);
    is(s.trays.mystery.length === 2, `${loc}: the cone and the pyramid wait at the Mystery Gallery`);
    await check(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'ok_D3')), `${loc}: the solids wing opens`);

    /* 5. riddle plates */
    await force(page, 'shapes', 'S2', 'riddles');
    const r2 = round('shapes', 'S2');
    is((await page.evaluate(() => [...document.querySelectorAll('.pm-pname.is-riddle')].map(e => e.textContent))).join('|') === C.dests(r2).map(x => T(loc, 'r_' + x)).join('|'), `${loc}: riddles — each plate carries its riddle`);

    /* 6. the setting changes the hall */
    for (const [h, pre] of [['solids', 'D'], ['shapes', 'S']]) { await page.evaluate((h) => { const t = window.PipMuseumActivity; t.api.settings.hall = h; t.onSettings(); }, h); await wait(250); is((await state(page)).id[0] === pre && (h !== 'solids' || (await count(page, '.pm-obj')) >= 2), `${loc}: "${h}" hall`); }
    await page.evaluate(() => { const t = window.PipMuseumActivity; t.api.settings.plates = 'riddles'; t.onSettings(); }); await wait(150);
    is((await count(page, '.pm-pname.is-riddle')) >= 2, `${loc}: the plates setting changes the plates`);

    /* 7. the keyboard */
    if (loc === 'en' || loc === 'fi') {
      await force(page, 'shapes', 'S1');
      const k0 = r1.belt[0], dest = C.rightOf(r1, k0);
      await page.focus(tr(k0.id)); await page.keyboard.press('Enter'); await wait(60);
      is((await state(page)).sel === k0.id, `${loc}: keyboard — Enter on a treasure picks it up`);
      const di = C.dests(r1).indexOf(dest);
      await page.focus(`.pm-tray[data-dest="${C.dests(r1)[0]}"]`);
      for (let i = 0; i < di; i++) { await page.keyboard.press('ArrowRight'); await wait(40); }
      is(await page.evaluate(() => document.activeElement.getAttribute('data-dest')) === dest, `${loc}: keyboard — arrows walk the pedestals`);
      await page.keyboard.press('Enter'); await wait(60);
      is((await state(page)).trays[dest].includes(k0.id), `${loc}: keyboard — Enter on a pedestal places it`);
    }
    is(errs.length === 0, `${loc}: no errors (${errs.join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('fi', w);
    for (const [h, id] of [['shapes', 'S1'], ['shapes', 'S5'], ['shapes', 'S8'], ['shapes', 'S9'], ['solids', 'D6'], ['solids', 'D8']]) {
      await force(page, h, id);
      const probe = async (phase) => {
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect();
          const ctl = [...document.querySelectorAll('.pm-tr, .pm-top, .pm-tray, .pm-step, .pm-check')].filter(e => !e.hidden && !e.closest('[hidden]') && e.offsetParent !== null).map(e => { const r = e.getBoundingClientRect(); return { c: String(e.className).split(' ')[0], l: r.left, r: r.right, b: r.bottom + scrollY, w: r.width, h: r.height }; });
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
          [...document.querySelectorAll('.pm-tr, .pm-top, .pm-step, .pm-check')].filter(e => !e.hidden && !e.disabled && e.offsetParent !== null).forEach(e => { e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(), hh = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); if (!(hh && (hh === e || e.contains(hh)))) out.push(String(e.className).split(' ')[0] + ' ' + (e.getAttribute('data-id') || e.getAttribute('data-dest') || '')); });
          window.scrollTo({ top: 0, behavior: 'instant' });
          return out;
        });
        is(blocked.length === 0, `${w} ${id} ${phase}: every control can be pressed (${blocked.join(', ')})`);
      };
      await probe('rest');
      await page.evaluate(() => { const t = window.PipMuseumActivity, C = PipMuseumCore, st = t.st, r = st.r; st.belt.slice(0, 2).forEach(id => C.route(st, id, C.rightOf(r, C.byId(r, id)))); t._paint(); });
      await probe('half');
      await page.evaluate(() => { const t = window.PipMuseumActivity, C = PipMuseumCore, st = t.st, r = st.r, D = C.dests(r); st.belt.slice().forEach((id, i) => { const right = C.rightOf(r, C.byId(r, id)); C.route(st, id, i === 0 ? D.find(x => x !== right) : right); }); t._check(); });
      await wait(60); await probe('miss 1');
      await page.evaluate(() => { const t = window.PipMuseumActivity, C = PipMuseumCore, st = t.st, r = st.r; st.belt.slice().forEach(id => C.route(st, id, C.rightOf(r, C.byId(r, id)))); st.sel = null; t._check(); });
      await wait(60);
      if (id === 'S9') { await probe('count'); }
      if (SHOT && (w === 360 || w === 704 || w === 1024)) await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${id}.png`), fullPage: true });
    }
    is(errs.length === 0, `${w}: no errors (${errs.join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-pip-museum: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
