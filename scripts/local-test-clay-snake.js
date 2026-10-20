#!/usr/bin/env node
/* =====================================================================
   local-test-clay-snake.js — the interaction gate for ACTIVITY #44, de
   kleislang (RF.K.2.B, Dutch). Real pointer, every round of every level:
     hak — Klaar! with nothing done asks (a one-klankgroep word is right);
       one chop too many by TAPS → blank pieces (miss); a seam TAPPED kneads
       it back; the right chops → one smooth snake with the word;
     letters — a TAP inside a klankgroep heals (miss); the seams tapped →
       done; bij: Klaar! with no cut is right;
     plak — the lumps DRAGGED onto the board in reverse → cracked joints
       (miss); the decoy (Extra stukje) pressed in → sent back; then reading
       order → done.
   Settings (Extra stukje, Letters op de klei), the keyboard (arrows +
   Enter chop, Backspace kneads), the width sweep (no sideways scroll,
   controls ≥ 44 px inside the card, pictures ≥ 64 px, above the fold, at
   rest and done). Pictures served at their EXACT case.
   Usage: node scripts/local-test-clay-snake.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.bouw-het-woord-met-klankgroepen.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'clay-snake-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, ClaySnakeCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'clay-snake-activity.js'), 'utf8') + '\n;this.__A = ClaySnakeActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].nl; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
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
    await page.goto(`${base}/clay-snake-activity.html?activity=${ID}&lang=nl&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.ClaySnakeActivity && window.ClaySnakeActivity.st && document.querySelector('.cs-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.ClaySnakeActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.ClaySnakeActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, n: s.r.n, word: s.r.word, cuts: s.cuts, row: s.row, tub: s.tub, lumps: s.lumps, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.cs-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(60); }
  async function tapSnake(page, frac) {
    const b = await page.evaluate(() => { const a = document.querySelector('.cs-snakearea'); a.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = a.getBoundingClientRect(); return { l: r.left, w: r.width, y: r.top + r.height - 30 }; });
    await page.mouse.click(b.l + b.w * frac, b.y); await wait(60);
  }
  async function dragToBoard(page, id, xFrac) {
    const a = await ctr(page, `.cs-tub .cs-lump[data-id="${id}"]`); if (!a) throw new Error('no lump ' + id);
    const t = await page.evaluate((f) => { const r = document.querySelector('.cs-board').getBoundingClientRect(); return { x: r.left + r.width * f, y: r.top + r.height / 2 }; }, xFrac);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(a.x + (t.x - a.x) * i / 8, a.y + (t.y - a.y) * i / 8);
    await page.mouse.up(); await wait(70);
  }
  async function force(page, lv, id, extra) {
    await page.evaluate((lv, id, extra) => { const a = window.ClaySnakeActivity; a.api.settings.level = lv; a.api.settings.extra = extra || 'uit'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, extra);
    await wait(150);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);

  console.log('— nl');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  for (const r of C.rounds('hak')) {
    await page.evaluate(() => { window.ClaySnakeActivity.OK_MS = 0; });
    await force(page, 'hak', r.id);
    is((await page.evaluate(() => document.querySelectorAll('.cs-piece').length)) === 1 && !(await page.evaluate(() => !!document.querySelector('.cs-letters'))), `${r.id}: one blank snake at rest`);
    const snakeW = await page.evaluate(() => document.querySelector('.cs-piece').getBoundingClientRect().width);
    is(Math.abs(snakeW - (await page.evaluate(() => document.querySelector('.cs-snakearea').getBoundingClientRect().width))) < 2, `${r.id}: the snake has the same length for every word (${Math.round(snakeW)} px)`);
    if (r.n === 1) { await tap(page, '.cs-check'); is((await state(page)).done, `${r.id}: one klankgroep — Klaar! with no chop is right`); is(await celebrated(page), `${r.id}: celebrates`); continue; }
    await tap(page, '.cs-check'); let s = await state(page);
    is(s.misses === 0 && (await note(page)) === T('hintChop'), `${r.id}: Klaar! with nothing done asks, no miss`);
    const k = r.n + 1;
    for (let i = 1; i < k; i++) await tapSnake(page, i / k);
    s = await state(page); is(s.cuts.length === k - 1, `${r.id}: ${k - 1} chops by tap`);
    await tap(page, '.cs-check'); s = await state(page);
    is(s.misses === 1 && s.last.result === 'long' && (await page.evaluate(() => document.querySelectorAll('.cs-piece.is-blank').length)) === 1 && (await note(page)) === T('hintLong'), `${r.id}: one piece too many — a blank piece, miss`);
    await tap(page, '.cs-seam[data-c="0"]'); s = await state(page);
    is(s.cuts.length === k - 2, `${r.id}: a seam tapped kneads it back`);
    await page.evaluate(() => { const st = window.ClaySnakeActivity.st; st.cuts = []; window.ClaySnakeActivity._paint(); });
    for (let i = 1; i < r.n; i++) await tapSnake(page, i / r.n);
    await tap(page, '.cs-check'); s = await state(page);
    is(s.done && (await page.evaluate(() => document.querySelectorAll('.cs-piece').length)) === 1 && (await page.evaluate(() => document.querySelector('.cs-piece .cs-whole').textContent)) === r.word.word, `${r.id}: ${r.n} pieces — one smooth snake with the word`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  for (const r of C.rounds('letters')) {
    await page.evaluate(() => { window.ClaySnakeActivity.OK_MS = 0; });
    await force(page, 'letters', r.id);
    const nc = C.cells(r.word.word).length, seams = C.seams(r.word);
    is((await page.evaluate(() => [...document.querySelectorAll('.cs-cell')].map(e => e.textContent).join(''))) === r.word.word, `${r.id}: the word printed along the snake`);
    if (!seams.length) { await tap(page, '.cs-check'); is((await state(page)).done, `${r.id}: one klankgroep — Klaar! with no cut is right`); is(await celebrated(page), `${r.id}: celebrates`); continue; }
    const inner = [...Array(nc - 1).keys()].map(i => i + 1).find(g => !seams.includes(g));
    await tapSnake(page, inner / nc); let s = await state(page); is(s.cuts.join() === String(inner), `${r.id}: a tap cuts at the letter gap ${inner}`);
    await tap(page, '.cs-check'); s = await state(page);
    is(s.misses === 1 && s.cuts.length === 0 && (await note(page)) === T('hintHealed'), `${r.id}: a cut inside a klankgroep heals (miss)`);
    for (const g of seams) await tapSnake(page, g / nc);
    await tap(page, '.cs-check'); s = await state(page);
    is(s.done, `${r.id}: the seams cut — done`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  for (const r of C.rounds('plak')) {
    await page.evaluate(() => { window.ClaySnakeActivity.OK_MS = 0; });
    await force(page, 'plak', r.id, 'aan');
    let s = await state(page);
    is(s.tub.length === r.n + 1, `${r.id}: the tub holds ${r.n} lumps and the decoy`);
    await tap(page, '.cs-check'); is((await state(page)).misses === 0 && (await note(page)) === T('hintPlace'), `${r.id}: Klaar! with an empty board asks`);
    const ids = s.lumps.filter(l => l.s >= 0).sort((a, b) => a.s - b.s).map(l => l.id);
    for (const id of ids.slice().reverse()) await dragToBoard(page, id, 0.95);
    s = await state(page); is(s.row.join() === ids.slice().reverse().join(), `${r.id}: lumps dragged onto the board in reverse`);
    await tap(page, '.cs-check'); s = await state(page);
    is(s.misses === 1 && s.last.result === 'joints' && (await page.evaluate(() => document.querySelectorAll('.cs-lump.is-crack').length)) === r.n - 1, `${r.id}: every reversed joint cracks (miss)`);
    for (const id of s.row.slice()) await tap(page, `.cs-prow .cs-lump[data-id="${id}"]`);
    await dragToBoard(page, 'd', 0.5); await tap(page, '.cs-check'); s = await state(page);
    is(s.last.result === 'decoy' && s.tub.includes('d') && !s.row.includes('d'), `${r.id}: the decoy is sent back to the tub`);
    s = await state(page);
    for (const id of ids) if (!s.row.includes(id)) await tap(page, `.cs-tub .cs-lump[data-id="${id}"]`);
    s = await state(page);
    if (s.row.join() !== ids.join()) { for (const id of s.row.slice()) if (id !== s.row[0] || s.row[0] !== ids[0]) await tap(page, `.cs-prow .cs-lump[data-id="${id}"]`).catch(() => {}); s = await state(page); for (const id of ids) if (!s.row.includes(id)) await tap(page, `.cs-tub .cs-lump[data-id="${id}"]`); }
    await tap(page, '.cs-check'); s = await state(page);
    is(s.done && s.row.join() === ids.join(), `${r.id}: reading order — done (${s.row.join()})`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* settings */
  await page.evaluate(() => { window.ClaySnakeActivity.OK_MS = 60000; });
  await force(page, 'hak', 'hak-rainbow');
  for (const v of ['meteen', 'na']) { await page.evaluate((v) => { const a = window.ClaySnakeActivity; a.api.settings.lettersNow = v; a.onSettings(); }, v); is((await page.evaluate(() => !!document.querySelector('.cs-letters.is-faint'))) === (v === 'meteen'), `Letters op de klei: ${v}`); }
  for (const v of ['aan', 'uit']) { await force(page, 'plak', 'plak-panda', v); is((await state(page)).tub.length === (v === 'aan' ? 3 : 2), `Extra stukje: ${v}`); }
  /* keyboard */
  await force(page, 'hak', 'hak-zebra');
  await page.focus('.cs-snakearea'); for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight'); await page.keyboard.press('Enter');
  is((await state(page)).cuts.length === 1, 'arrows + Enter chop');
  await page.keyboard.press('Backspace'); is((await state(page)).cuts.length === 0, 'Backspace kneads the nearest seam back');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.ClaySnakeActivity.OK_MS = 60000; });
    for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) {
      await force(o.page, lv, r.id, 'aan');
      for (const phase of ['rest', 'done']) {
        if (phase === 'done') await o.page.evaluate(() => { const A = window.ClaySnakeActivity, C2 = window.ClaySnakeCore, st = A.st, r = st.r; if (r.level === 'plak') { st.lumps.filter(l => l.s >= 0).sort((a, b) => a.s - b.s).forEach(l => A._placeAt(l.id, null)); } else if (r.level === 'letters') { const nc = C2.cells(r.word.word).length; C2.seams(r.word).forEach(g => A._chop(g / nc)); } else { for (let i = 1; i < r.n; i++) A._chop(i / r.n); } A._check(); });
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const ctl = [...document.querySelectorAll('.cs-check:not([hidden]),.cs-lump,.cs-easel,.cs-seam')];
          const area = document.querySelector('.cs-snakearea');
          const over = [...document.querySelectorAll('.cs-lump.is-placed')].filter(e => { const b = e.getBoundingClientRect(), bd = document.querySelector('.cs-board').getBoundingClientRect(); return b.right > bd.right + 1; }).length;
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 || b.height < 44; }).length + (area && area.getBoundingClientRect().height < 44 ? 1 : 0),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            over, pic: document.querySelector('.cs-img').getBoundingClientRect().width,
            low: Math.max(...ctl.concat(area ? [area] : []).map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        is(m.side <= 0 && m.small === 0 && m.out === 0 && m.over === 0 && m.pic >= 64, `@${w} ${r.id} ${phase}: no sideways scroll, controls ≥ 44 inside the card, the row on the board, picture ≥ 64 (side ${m.side}, small ${m.small}, out ${m.out}, over ${m.over}, pic ${Math.round(m.pic)})`);
        is(m.low <= m.H, `@${w} ${r.id} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['hak-helicopter', 'plak-watermelon', 'letters-tiger'].includes(r.id)) await o.page.screenshot({ path: path.join(SHOT, `nl-${w}-${r.id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-clay-snake: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
