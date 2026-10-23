#!/usr/bin/env node
/* =====================================================================
   local-test-cousin-rain.js — ACTIVITY #78, The Cousin Rain (Mim's Memory
   Baskets, L.K.5.A), in a real browser with REAL pointer clicks (never a
   model call to make a move). For every locale:
     · Sort: Check with things on the grass is a hint, no miss; two of a kind
       in a basket make the cloud rain their cousin; a third of another kind
       makes it stop; Check splits the mixed basket's cloud into two families
       with their own cousins; Check again draws the dotted threads; moving
       the thing clears the help; the right grouping succeeds and the line
       names the round's kinds;
     · The stray: the swapped baskets are a miss with their own hint; the
       stray in the little basket succeeds with the round's own sentence;
     · Two clouds: a wrong placement shows each thing its true drops; miss 2
       threads every thing; the right placement succeeds;
     · "Only at Check": no cloud over the baskets and no rain while sorting;
     · en: a real mouse DRAG into a basket; the keyboard (Enter on a thing,
       Enter on a basket); a long press shows the thing's word;
     · every round of every level at rest AND solved at 320–1366: Check above
       the fold at rest, no sideways scroll, every control ≥ 44 px, every
       library picture at its floor (96 desktop / 64 phone), pictures in a
       basket ≥ 60 % visible and inside their basket, no two grass things
       overlapping, the hint and the task line never clipped.
   Usage: node scripts/local-test-cousin-rain.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '078-cousin-rain', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'cousin-rain-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, CousinRainCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'cousin-rain-activity.js'), 'utf8') + '\n;this.__A = CousinRainActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/cousin-rain-activity.html?activity=mims-baskets.category-sort.l-k-5-a&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.CousinRainActivity && window.CousinRainActivity.st && document.querySelector('.cr-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.CousinRainActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, idx, rain) {
    await page.evaluate((level, idx, rain) => { const a = window.CousinRainActivity; a.api.settings.level = level; a.api.settings.baskets = 'any'; a.api.settings.rain = rain || 'live'; a._pool = null; a._ensurePool(); a._start(idx); a._view.spill = false; a._render2(); }, level, idx, rain);
    await page.waitForFunction(() => { const im = [...document.querySelectorAll('.cr-wrap img.cr-pic')]; return im.length >= 4 && im.every(i => i.complete && i.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
  }
  const st = (page) => page.evaluate(() => { const s = window.CousinRainActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, help: s.help, sel: s.sel, place: s.place.slice() }; });
  const note = (page) => page.evaluate(() => document.querySelector('.cr-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  /* a REAL click at the centre of the control — and loudly if it is not there */
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(40); return true;
  }
  /* move thing i into basket b (or back to the grass with b = null) the way a child does: tap it, tap the basket */
  async function put(page, i, b, tag) {
    const where = await page.evaluate((i) => { const s = window.CousinRainActivity.st; return s.place[i]; }, i);
    if (where === null) await click(page, `.cr-thing[data-i="${i}"]`, tag);
    else await click(page, `.cr-item[data-i="${i}"]`, tag);
    if (b === null) await click(page, '.cr-meadow', tag); else await click(page, `.cr-basket[data-b="${b}"]`, tag);
    const now = await page.evaluate((i) => window.CousinRainActivity.st.place[i], i);
    is(now === b, `${tag}: thing ${i} is now in ${b === null ? 'the grass' : 'basket ' + b} (${now})`);
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- Sort, round 0: dog cat | apple banana ---- */
    let tag = `${loc} sort`;
    await force(page, 'l1', 0);
    let r = C.round('l1', 0);
    await click(page, '.cr-check', tag); let s = await st(page);
    is(s.misses === 0 && s.last === 'meadow' && sp(await note(page)) === sp(T(loc, 'hMeadow')), `${tag}: things on the grass → the hint, no miss`);
    await put(page, 0, 0, tag); is(await count(page, '.cr-cousin') === 0, `${tag}: one thing does not rain`);
    await put(page, 1, 0, tag);
    is(await page.evaluate(() => { const c = document.querySelector('.cr-basket[data-b="0"] .cr-cousin'); return c && c.getAttribute('data-cousin'); }) === r.cousin.animal, `${tag}: a dog and a cat rain the ${r.cousin.animal}`);
    is(await page.evaluate(() => document.querySelector('.cr-bcol[data-b="0"] .cr-bcloud').classList.contains('is-full')), `${tag}: the cloud over them is full`);
    await put(page, 2, 0, tag);
    is(await count(page, '.cr-basket[data-b="0"] .cr-cousin') === 0, `${tag}: an apple among them stops the rain`);
    await put(page, 3, 1, tag);
    await click(page, '.cr-check', tag); s = await st(page);
    is(s.misses === 1 && s.last === 'mixed' && sp(await note(page)) === sp(T(loc, 'hMixed')), `${tag}: a mixed basket is a miss — the cloud splits`);
    is(await count(page, '.cr-basket[data-b="0"] .cr-fam') === 2 && await count(page, '.cr-bcol[data-b="0"] .cr-bcloud.is-split img') === 2, `${tag}: two families, two clouds`);
    const famCousins = await page.evaluate(() => [...document.querySelectorAll('.cr-basket[data-b="0"] .cr-fam .cr-cousin')].map(e => e.getAttribute('data-cousin')).sort().join());
    is(famCousins === [r.cousin.animal, r.cousin.food].sort().join(), `${tag}: each family gets its own cousin (${famCousins})`);
    await click(page, '.cr-check', tag); s = await st(page); await wait(80);
    is(s.misses === 2 && s.help === 2 && sp(await note(page)) === sp(T(loc, 'hMiss2')), `${tag}: miss 2 — follow the dotted line`);
    is(await count(page, '.cr-threads path') >= 1 && await count(page, '.cr-bcol.is-target') >= 1 && await count(page, '.cr-item.is-misplaced') >= 1, `${tag}: a dotted thread, a lit basket, a glowing thing`);
    await put(page, 2, 1, tag); s = await st(page);
    is(s.help === 0 && await count(page, '.cr-threads path') === 0 && (await note(page)) === '', `${tag}: a move takes the help away`);
    await click(page, '.cr-check', tag); s = await st(page);
    const okLine = C.success(loc, { r });
    is(s.done && sp(await note(page)) === sp(okLine), `${tag}: success names the kinds — «${await note(page)}»`);
    is(await count(page, '.cr-cousin') === 2, `${tag}: at success each basket shows its cousin`);
    /* ---- The stray, round 0: dog cat fish | car ---- */
    tag = `${loc} stray`;
    await force(page, 'l2', 0); r = C.round('l2', 0);
    for (let i = 0; i < 3; i++) await put(page, i, 1, tag);
    await put(page, r.stray, 0, tag);
    await click(page, '.cr-check', tag); s = await st(page);
    is(s.misses === 1 && s.last === 'swapped' && sp(await note(page)) === sp(T(loc, 'hSwapped')), `${tag}: the swapped baskets are a miss with their own hint`);
    for (let i = 0; i < 3; i++) await put(page, i, 0, tag);
    await put(page, r.stray, 1, tag);
    await click(page, '.cr-check', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(C.DATA.WORDS[loc].l2[0]), `${tag}: the stray in the little basket — «${await note(page)}»`);
    /* ---- Two clouds, round 0 ---- */
    tag = `${loc} clouds`;
    await force(page, 'l3', 0); r = C.round('l3', 0);
    is(await count(page, '.cr-rule') === 2 && await count(page, '.cr-curtain') === 2 && !(await page.evaluate(() => getComputedStyle(document.querySelector('.cr-sky')).display !== 'none')), `${tag}: two rule clouds, two rain curtains, no sky`);
    for (let i = 0; i < r.things.length; i++) await put(page, i, (r.things[i].want + 1) % 3, tag);
    await click(page, '.cr-check', tag); s = await st(page);
    is(s.misses === 1 && s.last === 'traits' && sp(await note(page)) === sp(T(loc, 'hTraits')), `${tag}: a wrong placement shows the drops`);
    const drops = await page.evaluate(() => [...document.querySelectorAll('.cr-item')].map(e => +e.getAttribute('data-i') + ':' + e.querySelectorAll('.cr-badge.is-a').length + e.querySelectorAll('.cr-badge.is-b').length));
    const wantDrops = r.things.map((t, i) => i + ':' + (C.hasTrait(t.key, r.rule[0].trait) ? 1 : 0) + (C.hasTrait(t.key, r.rule[1].trait) ? 1 : 0));
    is(drops.sort().join() === wantDrops.sort().join(), `${tag}: every thing wears exactly its own drops`);
    await click(page, '.cr-check', tag); await wait(80);
    is(await count(page, '.cr-threads path') === r.things.length && sp(await note(page)) === sp(T(loc, 'hMiss2L3')), `${tag}: miss 2 threads every thing`);
    for (let i = 0; i < r.things.length; i++) await put(page, i, r.things[i].want, tag);
    await click(page, '.cr-check', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(C.DATA.WORDS[loc].l3[0]), `${tag}: the right places — «${await note(page)}»`);
    /* ---- "Only at Check" ---- */
    tag = `${loc} dry`;
    await force(page, 'l1', 0, 'check');
    is(await page.evaluate(() => [...document.querySelectorAll('.cr-bcloud')].every(c => getComputedStyle(c).visibility === 'hidden')), `${tag}: no cloud over the baskets`);
    await put(page, 0, 0, tag); await put(page, 1, 0, tag);
    is(await count(page, '.cr-cousin') === 0, `${tag}: no rain while sorting`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- en: a real drag, the keyboard, the long press ---- */
  {
    const { page } = await open(1024, 'en'); const tag = 'en hand';
    await force(page, 'l1', 0);
    const from = await page.evaluate(() => { const r = document.querySelector('.cr-thing[data-i="0"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    const to = await page.evaluate(() => { const r = document.querySelector('.cr-basket[data-b="1"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await page.mouse.move(from.x, from.y); await page.mouse.down(); await page.mouse.move(from.x + 20, from.y + 20, { steps: 3 }); await page.mouse.move(to.x, to.y, { steps: 12 }); await page.mouse.up(); await wait(80);
    let s = await st(page);
    is(s.place[0] === 1 && s.sel === null, `${tag}: a drag drops the dog in basket 2 (${s.place[0]})`);
    is(await count(page, '.cr-ghost') === 0, `${tag}: no ghost left behind`);
    await page.focus('.cr-thing[data-i="1"]'); await page.keyboard.press('Enter'); await wait(40);
    s = await st(page); is(s.sel === 1, `${tag}: Enter lifts the cat`);
    await page.focus('.cr-basket[data-b="1"]'); await page.keyboard.press('Enter'); await wait(40);
    s = await st(page); is(s.place[1] === 1, `${tag}: Enter on a basket drops it there`);
    await page.focus('.cr-basket[data-b="1"]'); await page.keyboard.press('Enter'); await wait(40);
    s = await st(page); is(s.sel === 1, `${tag}: Enter on a basket lifts the last thing put in`);
    await page.keyboard.press('Escape'); await wait(40);
    s = await st(page); is(s.place[1] === null && s.sel === null, `${tag}: Escape puts it back on the grass`);
    const lp = await page.evaluate(() => { const r = document.querySelector('.cr-thing[data-i="2"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await page.mouse.move(lp.x, lp.y); await page.mouse.down(); await wait(800);
    const tagTxt = await page.evaluate(() => { const t = document.querySelector('.cr-tag'); return t.classList.contains('is-on') ? t.textContent : ''; });
    await page.mouse.up(); await wait(60);
    s = await st(page);
    is(tagTxt === 'Apple' && s.sel === null, `${tag}: a long press shows the word («${tagTxt}») and lifts nothing`);
    await page.close();
  }

  /* ---- every round at rest and solved, 320–1366 ---- */
  for (const loc of LOCS) for (const w of WIDTHS) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) for (const idx of C.ids(lv, 'any')) {
      for (const state of ['rest', 'solved']) {
        const tag = `${loc} @${w} ${lv}.${idx} ${state}`;
        await force(page, lv, idx);
        if (state === 'solved') {
          await page.evaluate((lv) => { const a = window.CousinRainActivity, C = window.CousinRainCore, s = a.st, r = s.r; r.things.forEach((t, j) => C.placeAt(s, j, lv === 'l1' ? r.kinds.indexOf(t.kind) : t.want)); a._check(); }, lv);
          await page.waitForFunction(() => [...document.querySelectorAll('.cr-wrap img.cr-pic')].every(i => i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
        }
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0)); else await wait(60);
        const m = await page.evaluate((w, lv) => {
          const L = window.CousinRainCore.layout(window.CousinRainActivity._width()), out = { fails: [] };
          const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
          out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
          out.chk = document.querySelector('.cr-check').getBoundingClientRect().bottom;
          const nr = document.querySelector('.cr-note').getBoundingClientRect(); out.noteBottom = nr.bottom; out.noteTop = nr.top;
          out.lastBasket = Math.max(...[...document.querySelectorAll('.cr-basket')].map(b => b.getBoundingClientRect().bottom));
          [...document.querySelectorAll('.cr-thing,.cr-basket,.cr-check')].filter(vis).forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
          [...document.querySelectorAll('.cr-wrap img.cr-pic')].filter(vis).forEach(i => { const r = i.getBoundingClientRect(), floor = i.closest('.cr-mim') ? 64 : L.pic; if (Math.round(Math.min(r.width, r.height)) < floor) out.fails.push('picture ' + Math.round(r.width) + ' < ' + floor); });
          const grass = [...document.querySelectorAll('.cr-thing')].map(e => e.getBoundingClientRect());
          for (let a = 0; a < grass.length; a++) for (let b = a + 1; b < grass.length; b++) { const A = grass[a], B = grass[b]; if (A.left < B.right - 1 && B.left < A.right - 1 && A.top < B.bottom - 1 && B.top < A.bottom - 1) out.fails.push('grass things overlap'); }
          document.querySelectorAll('.cr-basket').forEach(bk => {
            const R = bk.getBoundingClientRect(), its = [...bk.querySelectorAll('.cr-item img')].map(i => i.getBoundingClientRect());
            its.forEach(r => { if (r.left < R.left - 2 || r.right > R.right + 2) out.fails.push('a picture sticks out of its basket'); });
            its.forEach((r, k) => { let hidden = 0; for (let q = k + 1; q < its.length; q++) { const o = its[q]; const ow = Math.max(0, Math.min(r.right, o.right) - Math.max(r.left, o.left)), oh = Math.max(0, Math.min(r.bottom, o.bottom) - Math.max(r.top, o.top)); hidden = Math.max(hidden, (ow * oh) / (r.width * r.height)); } if (hidden > 0.4) out.fails.push('a picture in a basket is ' + Math.round(hidden * 100) + '% covered'); });
          });
          ['.cr-note', '.lcs-activity-prompt-text'].forEach(sel => { const e = document.querySelector(sel); if (!e || !e.textContent) return; const rg = document.createRange(); rg.selectNodeContents(e); const T = rg.getBoundingClientRect(), E = e.getBoundingClientRect(); if (T.right > E.right + 2 || T.left < E.left - 2) out.fails.push(sel + ' text clipped'); });
          return out;
        }, w, lv);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.chk <= VH(w), `${tag}: Check above the fold (${Math.round(m.chk)} ≤ ${VH(w)})`);
        else is(m.noteTop >= 0 && m.noteBottom <= VH(w) + 1 && m.lastBasket >= 0, `${tag}: the success line is in view (${Math.round(m.noteTop)}–${Math.round(m.noteBottom)})`);
        is(m.fails.length === 0, `${tag}: ${m.fails.slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 0 || idx === 5)) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${idx}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc} @${w}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-cousin-rain: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
