#!/usr/bin/env node
/* =====================================================================
   local-test-photo-syllables.js — the interaction gate for ACTIVITY #52,
   La photo qui se révèle (RF.K.2.B, fr). Real pointer, every round of
   every level:
     Développer on an empty rail asks (no miss); the decoy card TAPPED on
     with the word's first card → the photo develops a strip from another
     photo (foreign band, fogged strips, the card tilts) — miss 1; the
     decoy DRAGGED off the rail → the paper goes blank; the word's cards
     laid in a wrong order (or, one-syllable words, a decoy again) → miss
     2: the ghost photo and one guide line per syllable boundary; all
     taken back; the first card DRAGGED onto the rail, the rest tapped →
     the photo develops whole, the album gets the word, celebrates.
   Also: a missing card leaves a white band (hintMissing); a card dragged
   BETWEEN two rail cards is inserted; the keyboard (← → move a rail card,
   Delete / Backspace take back); Carte piège aucune deals no decoy; an
   album photo comes back full size in the frame; the grey e on the
   mute-e cards. And the width sweep 320–1366 at rest, miss and whole:
   no sideways scroll, controls ≥ 44 px inside the card, the rail cards
   on one line inside the rail, text ≥ 14 px, the photo ≥ 96 / 64 px,
   every control above the fold.
   Usage: node scripts/local-test-photo-syllables.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.forme-le-mot-en-syllabes.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'photo-syllables-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, PhotoSyllablesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'photo-syllables-activity.js'), 'utf8') + '\n;this.__A = PhotoSyllablesActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].fr; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/photo-syllables-activity.html?activity=${ID}&lang=fr&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PhotoSyllablesActivity && window.PhotoSyllablesActivity.st && document.querySelector('.phs-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.PhotoSyllablesActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.PhotoSyllablesActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, rail: s.rail, tray: s.tray, misses: s.misses, help: s.help, done: s.done, last: s.last, developed: s.developed })); });
  const note = (page) => page.evaluate(() => document.querySelector('.phs-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(50); }
  async function dragTo(page, sel, to) {
    const a = await ctr(page, sel); const b = await page.evaluate((t) => { const r = (typeof t === 'string' ? document.querySelector(t) : null).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to.sel);
    const bx = to.x !== undefined ? to.x : b.x, by = b.y;
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (bx - a.x) * i / 10, a.y + (by - a.y) * i / 10);
    await page.mouse.up(); await wait(80);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.PhotoSyllablesActivity; a.FAST = true; Object.assign(a.api.settings, { decoy: 'one' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(120);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function develop(page) { await tap(page, '.phs-check'); await page.waitForFunction(() => !window.PhotoSyllablesActivity._busy, { timeout: 8000 }); await wait(60); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.PhotoSyllablesActivity.OK_MS = 0; }); };
  const TRAY = (id) => `.phs-tray .phs-card[data-id="${id}"]`, RAIL = (id) => `.phs-rail .phs-card[data-id="${id}"]`;

  console.log('— fr');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) {
    await okRun(page); await force(page, lv, r.id);
    const n = r.w.syl.length; let s = await state(page);
    is(s.rail.length === 0 && (await page.evaluate(() => document.querySelectorAll('.phs-tray .phs-card').length)) === n + r.decoys.length && (await page.evaluate(() => !!document.querySelector('.phs-blank'))), `${r.id}: ${n + r.decoys.length} cards in the tray, the rail empty, the paper blank`);
    const muteCards = await page.evaluate(() => [...document.querySelectorAll('.phs-tray .phs-card')].filter(c => c.querySelector('.phs-mute')).map(c => c.dataset.id).sort());
    const st0 = C.newState(r, 0); is(JSON.stringify(muteCards) === JSON.stringify(st0.cards.filter(c => c.mute).map(c => c.id).sort()), `${r.id}: the grey e on exactly the mute-e cards (${muteCards.join(' ') || 'none'})`);
    await develop(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T('hintEmpty'), `${r.id}: Développer on an empty rail asks (no miss)`);
    await tap(page, TRAY('x0')); await tap(page, TRAY('c0'));
    s = await state(page); is(s.rail.join() === 'x0,c0', `${r.id}: tapped cards go on the rail in turn`);
    await develop(page); s = await state(page);
    is(s.misses === 1 && s.last.result === 'foreign' && (await note(page)) === T('hintForeign') && (await page.evaluate(() => document.querySelectorAll('.phs-band.is-foreign').length)) === 1 && (await page.evaluate(() => !!document.querySelector('.phs-rail .phs-card.is-tilt'))), `${r.id}: the decoy develops a strip of another photo, fogged, its card tilts — miss 1`);
    await dragTo(page, RAIL('x0'), { sel: '.phs-tray' }); s = await state(page);
    is(!s.rail.includes('x0') && s.tray.includes('x0') && (await page.evaluate(() => !!document.querySelector('.phs-blank'))), `${r.id}: the decoy dragged off the rail — the paper goes blank`);
    if (n >= 2) { await tap(page, RAIL('c0')); await tap(page, TRAY('c1')); await tap(page, TRAY('c0')); for (let i = 2; i < n; i++) await tap(page, TRAY('c' + i)); }
    else await tap(page, TRAY(r.decoys.length > 1 ? 'x1' : 'x0'));
    await develop(page); s = await state(page);
    const lines = await page.evaluate(() => document.querySelectorAll('.phs-guide').length);
    is(s.help === 2 && (await note(page)) === T('hintLines') && (await page.evaluate(() => !!document.querySelector('.phs-ghost'))) && lines === n - 1, `${r.id}: miss 2 — the ghost photo and ${n - 1} guide line(s)`);
    for (const id of s.rail.slice()) await tap(page, RAIL(id));
    s = await state(page); is(s.rail.length === 0, `${r.id}: rail cards tapped go back to the tray`);
    await dragTo(page, TRAY('c0'), { sel: '.phs-rail' }); s = await state(page); is(s.rail.join() === 'c0', `${r.id}: "${r.w.syl[0]}" dragged onto the rail`);
    for (let i = 1; i < n; i++) await tap(page, TRAY('c' + i));
    await develop(page);
    await page.waitForFunction(() => !!document.querySelector('.phs-full'), { timeout: 5000 }).catch(() => {});
    s = await state(page);
    is(s.done && (await page.evaluate(() => !!document.querySelector('.phs-full') && !document.querySelector('.phs-band'))), `${r.id}: the photo develops whole`);
    is((await page.evaluate(() => [...document.querySelectorAll('.phs-snapword')].map(e => e.textContent))).includes(r.w.word), `${r.id}: "${r.w.word}" goes into the album`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* missing, insertion, keyboard, settings, the album */
  await page.evaluate(() => { window.PhotoSyllablesActivity.OK_MS = 60000; });
  await force(page, 'long', 'long-papillon');
  await tap(page, TRAY('c0')); await develop(page); let s = await state(page);
  is(s.last.result === 'missing' && (await note(page)) === T('hintMissing') && (await page.evaluate(() => !!document.querySelector('.phs-gapband'))), 'a missing card leaves a white band: hintMissing');
  await tap(page, TRAY('c2'));
  const mid = await page.evaluate(() => { const c = [...document.querySelectorAll('.phs-rail .phs-card')].map(e => e.getBoundingClientRect()); return (c[0].right + c[1].left) / 2; });
  await dragTo(page, TRAY('c1'), { sel: '.phs-rail', x: mid }); s = await state(page);
  is(s.rail.join() === 'c0,c1,c2', `a card dragged between two rail cards is inserted (${s.rail.join()})`);
  await page.focus(RAIL('c0')); await page.keyboard.press('ArrowRight'); s = await state(page); is(s.rail.join() === 'c1,c0,c2', '→ moves a rail card right');
  await page.keyboard.press('ArrowLeft'); s = await state(page); is(s.rail.join() === 'c0,c1,c2', '← moves it back');
  await page.focus(RAIL('c2')); await page.keyboard.press('Delete'); s = await state(page); is(s.rail.join() === 'c0,c1' && s.tray.includes('c2'), 'Delete takes a rail card back');
  await page.focus('.phs-wrap'); await page.keyboard.press('Backspace'); s = await state(page); is(s.rail.join() === 'c0', 'Backspace takes the last card back');
  await force(page, 'mute', 'mute-lune', { decoy: 'none' }); s = await state(page); is(s.tray.length === 2 && !s.tray.some(id => id[0] === 'x'), 'Carte piège: aucune — no decoy in the tray');
  await force(page, 'mute', 'mute-lune', { decoy: 'one' }); s = await state(page); is(s.tray.length === 3, 'Carte piège: une — the decoy in the tray');
  await page.evaluate(() => { const A = window.PhotoSyllablesActivity; A._album = ['chat', 'papillon']; A.FAST = false; A._paint(); });
  await tap(page, '.phs-snap'); is(await page.evaluate(() => !!document.querySelector('.phs-full') && /cat@2x/.test(document.querySelector('.phs-full').src)), 'an album photo comes back FULL size in the frame');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.PhotoSyllablesActivity.OK_MS = 60000; });
    const cases = [].concat(...C.LEVEL_KEYS.map(lv => C.rounds(lv).map(r => [lv, r.id])));
    for (const [lv, id] of cases) {
      await force(o.page, lv, id);
      const tag = `@${w} ${id}`;
      for (const phase of ['rest', 'miss', 'whole']) {
        if (phase === 'miss') await o.page.evaluate(() => {
          const A = window.PhotoSyllablesActivity, C2 = window.PhotoSyllablesCore, st = A.st, n = st.r.w.syl.length;
          A._album = ['parapluie', 'ambulance', 'chocolat', 'boulanger', 'papillon', 'éléphant', 'tournesol', 'chat', 'lune'];
          C2.lay(st, 'x0'); C2.lay(st, 'c0'); C2.develop(st); st.cards.filter(c => st.tray.includes(c.id)).forEach(c => C2.lay(st, c.id)); C2.develop(st);
          A._busy = false; A._view = {}; A._paint();
        });
        if (phase === 'whole') await o.page.evaluate(() => {
          const A = window.PhotoSyllablesActivity, C2 = window.PhotoSyllablesCore, st = A.st; A._clearTimers(); A._busy = false; A._view = {};
          st.rail.slice().forEach(id => C2.takeBack(st, id)); st.r.w.syl.forEach((_, q) => C2.lay(st, 'c' + q)); A._check();
        });
        await o.page.waitForFunction((ph) => ph !== 'whole' || !!document.querySelector('.phs-full'), { timeout: 8000 }, phase).catch(() => {});
        await wait(phase === 'whole' ? 500 : 60);
        if (phase === 'miss') { const s3 = await state(o.page); if (s3.done || s3.misses < 2) throw new Error('miss phase did not land on miss 2: ' + id); }
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.phs-card,.phs-check:not([hidden]),.phs-say,.phs-snap')].filter(vis);
          const rail = document.querySelector('.phs-rail').getBoundingClientRect(), rc = [...document.querySelectorAll('.phs-rail .phs-card')].map(e => e.getBoundingClientRect());
          const railOk = rc.every(b => b.left >= rail.left - 1 && b.right <= rail.right + 1 && b.top >= rail.top - 1 && b.bottom <= rail.bottom + 1) && rc.every(b => Math.abs(b.top - (rc[0] || b).top) < 2);
          const txt = [...document.querySelectorAll('.phs-face,.phs-snapword,.phs-note')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const img = document.querySelector('.phs-image').getBoundingClientRect();
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 - 0.5 || b.height < 44 - 0.5; }).map(e => e.className).slice(0, 3),
            out: ctl.concat([document.querySelector('.phs-frame')]).filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            railOk, txt: txt.length ? Math.min(...txt) : 99, pic: Math.min(img.width, img.height),
            low: Math.max(...ctl.filter(e => !e.classList.contains('phs-snap')).map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.pic >= minPic - 0.5, `${tag} ${phase}: no sideways scroll, controls ≥ 44 inside the card, photo ≥ ${minPic} (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, pic ${Math.round(m.pic)})`);
        is(m.railOk && m.txt >= 14, `${tag} ${phase}: the rail cards on one line inside the rail, text ≥ 14 px (rail ${m.railOk}, txt ${m.txt})`);
        is(m.low <= m.H, `${tag} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['short-lapin', 'mute-lune', 'long-ambulance'].includes(id)) await o.page.screenshot({ path: path.join(SHOT, `fr-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors (${o.errs.slice(0, 2).join(' | ')})`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-photo-syllables: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
