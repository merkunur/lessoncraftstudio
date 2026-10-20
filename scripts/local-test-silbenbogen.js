#!/usr/bin/env node
/* =====================================================================
   local-test-silbenbogen.js — the interaction gate for ACTIVITY #43, die
   Schwungbahn (RF.K.2.B, German). Real pointer, every word of every level:
   Fahren! with no bows asks to swing (no miss); the swing pad TAPPED one
   bow too many times; the cards DRAGGED into the bows in reading order →
   "Ein Bogen ist leer." (miss 1); the empty bow TAPPED away; two cards
   swapped by a drag → the ride stops, the built letters show, then the
   picture slices (miss 2); dragged back → the ride, the word with its
   capital, the word line, the shell's celebration. Settings (Wörter,
   Silbenfarben), the keyboard (S swings, Enter places, Backspace removes),
   the width sweep (no sideways scroll, controls ≥ 44 px, pictures ≥ 64 px,
   everything above the fold, at rest and built). Pictures served at their
   EXACT case.
   Usage: node scripts/local-test-silbenbogen.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.bau-das-wort-aus-silben.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'silbenbogen-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, SilbenbogenCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'silbenbogen-activity.js'), 'utf8') + '\n;this.__A = SilbenbogenActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].de; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
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
    await page.goto(`${base}/silbenbogen-activity.html?activity=${ID}&lang=de&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SilbenbogenActivity && window.SilbenbogenActivity.st && document.querySelector('.sb-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.SilbenbogenActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.SilbenbogenActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, n: s.r.n, word: s.r.word, bows: s.bows, beds: s.beds, tray: s.tray, cards: s.cards, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.sb-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(60); }
  async function dragTo(page, fromSel, b) {
    const a = await ctr(page, fromSel); if (!a) throw new Error('no ' + fromSel);
    const t = await page.evaluate((b) => { const r = document.querySelector(`.sb-bow[data-b="${b}"] .sb-bed`).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, b);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(a.x + (t.x - a.x) * i / 8, a.y + (t.y - a.y) * i / 8);
    await page.mouse.up(); await wait(70);
  }
  async function force(page, lv, id) {
    await page.evaluate((lv, id) => { const a = window.SilbenbogenActivity; a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id);
    await wait(150);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const cardOf = (s, syl) => s.cards.find(c => c.s === syl).id;

  console.log('— de');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) {
    await page.evaluate(() => { window.SilbenbogenActivity.OK_MS = 0; });
    await force(page, lv, r.id);
    const pr = await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
    is(pr === T('prompt'), `${r.id}: the task line never names the count`);
    is((await page.evaluate(() => document.querySelectorAll('.sb-bow').length)) === 0, `${r.id}: no slots are drawn at rest`);
    is((await page.evaluate(() => [...document.querySelectorAll('.sb-tcard .sb-syl')].every(e => e.textContent === e.textContent.toLowerCase()))), `${r.id}: lower-case cards`);
    await tap(page, '.sb-check'); let s = await state(page);
    is(s.misses === 0 && (await note(page)) === T('hintSwing'), `${r.id}: Fahren! with no bows asks to swing, no miss`);
    for (let i = 0; i <= r.n; i++) await tap(page, '.sb-pad');
    s = await state(page); is(s.bows === r.n + 1, `${r.id}: the pad tapped ${r.n + 1}× — ${r.n + 1} bows`);
    for (let syl = 0; syl < r.n; syl++) await dragTo(page, `.sb-tcard[data-id="${cardOf(s, syl)}"]`, syl);
    s = await state(page); is(s.tray.length === 0 && s.beds.slice(0, r.n).every((id, i) => s.cards.find(c => c.id === id).s === i), `${r.id}: every card dragged into its bow`);
    await tap(page, '.sb-check'); s = await state(page);
    is(s.misses === 1 && s.last.reason === 'tooMany' && (await note(page)) === T('hintTooMany') && (await page.evaluate(() => !!document.querySelector('.sb-bow.is-sag'))), `${r.id}: one bow too many — "Ein Bogen ist leer.", the bow sags`);
    await tap(page, `.sb-bow[data-b="${r.n}"] .sb-bed`); s = await state(page);
    is(s.bows === r.n, `${r.id}: the empty bow tapped away`);
    if (r.n >= 2) {
      await dragTo(page, `.sb-bow[data-b="0"] .sb-bed`, 1); s = await state(page);
      is(s.cards.find(c => c.id === s.beds[0]).s === 1 && s.cards.find(c => c.id === s.beds[1]).s === 0, `${r.id}: a card dragged onto a full bow swaps`);
      await tap(page, '.sb-check'); s = await state(page);
      is(s.last.reason === 'order' && s.last.stopAt === 0 && s.help === 2 && (await note(page)) === T('hintSlices') && (await page.evaluate(() => document.querySelectorAll('.sb-slice').length)) === r.n, `${r.id}: the wrong order stops the ride — miss 2 shows the picture slices`);
      is((await page.evaluate(() => (document.querySelector('.sb-built') || {}).textContent)) === s.last.built, `${r.id}: the letters as built (${s.last.built})`);
      await dragTo(page, `.sb-bow[data-b="1"] .sb-bed`, 0);
    }
    await tap(page, '.sb-check'); s = await state(page);
    is(s.done, `${r.id}: the ride — done`);
    is((await page.evaluate(() => (document.querySelector('.sb-word') || {}).textContent)) === r.word.word, `${r.id}: the word with its capital (${r.word.word})`);
    is(await celebrated(page), `${r.id}: the shell celebrates`);
  }
  /* the word line keeps the built words */
  is((await page.evaluate(() => document.querySelectorAll('.sb-lword').length)) >= 1, 'the word line shows built words');
  /* settings */
  await page.evaluate(() => { window.SilbenbogenActivity.OK_MS = 60000; });
  for (const lv of C.LEVEL_KEYS) { await page.evaluate((lv) => { const a = window.SilbenbogenActivity; a.api.settings.level = lv; a.onSettings(); }, lv); await wait(150); const s = await state(page); is(C.rounds(lv).some(r => r.id === s.id), `Wörter ${lv}: a ${lv} word`); }
  await force(page, 'lang', 'lang-butterfly'); await tap(page, '.sb-pad'); await tap(page, '.sb-pad');
  const arc = () => page.evaluate(() => [...document.querySelectorAll('.sb-arc path')].map(p => p.getAttribute('stroke')).join());
  await page.evaluate(() => { const a = window.SilbenbogenActivity; a.api.settings.colours = 'aus'; a.onSettings(); }); const aus = await arc();
  await page.evaluate(() => { const a = window.SilbenbogenActivity; a.api.settings.colours = 'blaurot'; a.onSettings(); }); const br = await arc();
  is(aus === '#146B5E,#146B5E' && br === '#2F6FD6,#D9452F', `Silbenfarben: Aus teal (${aus}), Blau – Rot alternating (${br})`);
  /* keyboard */
  await force(page, 'kurz', 'kurz-cat');
  await page.focus('.sb-tcard'); await page.keyboard.press('s'); await page.keyboard.press('s'); await page.keyboard.press('s');
  is((await state(page)).bows === 3, 'S swings');
  await page.keyboard.press('Backspace'); is((await state(page)).bows === 2, 'Backspace removes an empty bow');
  let s = await state(page);
  await page.focus(`.sb-tcard[data-id="${cardOf(s, 0)}"]`); await page.keyboard.press('Enter');
  s = await state(page); is(s.beds[0] === cardOf(s, 0), 'Enter places the focused card in the first empty bow');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep: at rest and built */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.SilbenbogenActivity.OK_MS = 60000; });
    for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) {
      await force(o.page, lv, r.id);
      for (const phase of ['rest', 'built']) {
        if (phase === 'built') await o.page.evaluate((n) => { const A = window.SilbenbogenActivity, st = A.st; for (let i = 0; i < n; i++) A._swing(); st.cards.slice().sort((a, b) => b.s - a.s).forEach((c, i) => A._place(c.id, i)); A._ride(); }, r.n);
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const ctl = [...document.querySelectorAll('.sb-check:not([hidden]),.sb-tcard,.sb-pad,.sb-bed,.sb-picture')];
          const syl = [...document.querySelectorAll('.sb-syl')].filter(e => { const s = e.getBoundingClientRect(), c = e.parentElement.getBoundingClientRect(); return s.left < c.left - 1 || s.right > c.right + 1; }).length;
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 || b.height < 44; }).length,
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            pic: document.querySelector('.sb-img').getBoundingClientRect().width,
            syl, low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        is(m.side <= 0 && m.small === 0 && m.out === 0 && m.pic >= 64 && m.syl === 0, `@${w} ${r.id} ${phase}: no sideways scroll, controls ≥ 44 inside the card, picture ≥ 64, syllables inside their cards (side ${m.side}, small ${m.small}, out ${m.out}, pic ${Math.round(m.pic)}, syl ${m.syl})`);
        is(m.low <= m.H, `@${w} ${r.id} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && (r.id === 'lang-watermelon' || r.id === 'kurz-cat' || r.id === 'mittel-necklace')) await o.page.screenshot({ path: path.join(SHOT, `de-${w}-${r.id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-silbenbogen: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
