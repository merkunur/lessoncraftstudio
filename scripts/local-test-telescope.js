#!/usr/bin/env node
/* =====================================================================
   local-test-telescope.js — the interaction gate for ACTIVITY #46,
   Kikkerten (RF.K.2.B, da). Real pointer, every round of every level:
     pull — collapsed at rest, no view; Kig! untouched asks (no miss); the
       lens DRAGGED out one ring short → blurred-shifted view, the last
       ring carries two syllables; the lens TAPPED one past → a blank ring,
       blurred-shrunk view, the clap hint at miss 2; a ring TAPPED pushes
       the telescope in → sharp, the word on the main tube;
     build — the word's rings DRAGGED on reversed → the collapse pops the
       wrong rings back to the rack (miss); rack rings TAPPED in word order
       → sharp; Ekstra ring: the decoy fitted → it pops out first;
     gap — a same-word ring → sent back; a foreign ring → the listen hint at
       miss 2; the answer → sharp.
   Settings, the keyboard, equal ring sizes, no live focus before Kig!, and
   the width sweep (no sideways scroll, controls ≥ 44 px inside the card,
   pictures ≥ 64 px / ≥ 96 px from 704, above the fold, at rest and done).
   Usage: node scripts/local-test-telescope.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.byg-ordet-af-stavelser.da.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'telescope-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, TelescopeCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'telescope-activity.js'), 'utf8') + '\n;this.__A = TelescopeActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].da; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
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
    await page.goto(`${base}/telescope-activity.html?activity=${ID}&lang=da&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TelescopeActivity && window.TelescopeActivity.st && document.querySelector('.ts-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.TelescopeActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.TelescopeActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, level: s.r.level, w: s.r.w, gap: s.r.gap, out: s.out, segs: s.segs, rack: s.rack, all: s.all, locked: s.locked, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.ts-note').textContent);
  const view = (page) => page.evaluate(() => { const v = document.querySelector('.ts-view'); return v ? ((v.className.match(/is-(sharp|short|long|blur)/) || [''])[0]) : ''; });
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(60); }
  async function dragTo(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('no ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8);
    await page.mouse.up(); await wait(80);
  }
  async function dragLens(page, rings) {
    const a = await ctr(page, '.ts-lens'), seg = await page.evaluate(() => window.TelescopeActivity._L.seg);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + seg * rings * i / 10, a.y);
    await page.mouse.up(); await wait(80);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.TelescopeActivity; Object.assign(a.api.settings, { extra: 'off', island: 'no' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(150);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.TelescopeActivity.OK_MS = 0; }); };

  console.log('— da');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  /* pull */
  for (const r of C.rounds('pull')) {
    await okRun(page); await force(page, 'pull', r.id);
    const n = r.w.syl.length;
    is((await page.evaluate(() => document.querySelectorAll('.ts-scope .ts-ring').length)) === 0 && !(await view(page)), `${r.id}: collapsed at rest, no view`);
    await tap(page, '.ts-check'); let s = await state(page);
    is(s.misses === 0 && (await note(page)) === T('hintPull'), `${r.id}: Kig! untouched asks`);
    if (n === 1) { await tap(page, '.ts-lens'); is(!(await view(page)), `${r.id}: no view before Kig!`); await tap(page, '.ts-check'); is((await state(page)).done && (await view(page)) === 'is-sharp', `${r.id}: one ring — sharp`); is(await celebrated(page), `${r.id}: celebrates`); continue; }
    await dragLens(page, n - 1); s = await state(page);
    is(s.out === n - 1, `${r.id}: the lens dragged out ${n - 1} rings (${s.out})`);
    await tap(page, '.ts-check'); s = await state(page);
    is(s.misses === 1 && s.last.result === 'short' && (await view(page)) === 'is-short' && (await page.evaluate(() => document.querySelectorAll('.ts-ring.is-double').length)) === 1 && (await note(page)) === T('hintShort'), `${r.id}: one ring short — two syllables on the last ring, blurred-shifted`);
    if (n === C.MAX_RINGS) {
      /* four rings is the most the telescope has: the second miss is short again, then out to the end */
      await tap(page, `.ts-scope .ts-ring[data-k="${n - 3}"]`); is(!(await view(page)) && (await state(page)).out === n - 3, `${r.id}: a tapped ring pushes the telescope in from there, the view swings away`);
      await tap(page, '.ts-check'); s = await state(page);
      is(s.misses === 2 && s.last.result === 'short' && (await note(page)) === T('hintClap') && (await page.evaluate(() => document.querySelectorAll('.ts-ghost').length)) === 3, `${r.id}: miss 2 — the clap hint, a ghost ring for each missing syllable`);
      for (let i = 0; i < 3; i++) await tap(page, '.ts-lens');
      is(!(await view(page)) && (await page.evaluate(() => document.querySelector('.ts-lens').disabled)), `${r.id}: out to four rings — the lens stops, still no live focus`);
      await tap(page, '.ts-check'); is((await state(page)).done && (await view(page)) === 'is-sharp', `${r.id}: four rings — sharp`);
      is(await celebrated(page), `${r.id}: celebrates`);
      continue;
    }
    await tap(page, '.ts-lens'); is(!(await view(page)), `${r.id}: a move swings the view away`);
    await tap(page, '.ts-lens'); is(!(await view(page)) && (await state(page)).out === n + 1, `${r.id}: one ring past — still no live focus`);
    await tap(page, '.ts-check'); s = await state(page);
    is(s.misses === 2 && s.last.result === 'long' && (await view(page)) === 'is-long' && (await page.evaluate(() => document.querySelectorAll('.ts-ring.is-blank').length)) === 1 && (await note(page)) === T('hintClap'), `${r.id}: one ring too many — a blank ring, blurred-shrunk, the clap hint`);
    const widths = await page.evaluate(() => [...document.querySelectorAll('.ts-scope .ts-ring')].map(e => Math.round(e.getBoundingClientRect().width)));
    is(new Set(widths).size === 1, `${r.id}: every ring the same size (${widths.join('/')})`);
    await tap(page, `.ts-scope .ts-ring[data-k="${n}"]`); s = await state(page);
    is(s.out === n, `${r.id}: the blank ring tapped pushes it in`);
    await tap(page, '.ts-check'); s = await state(page);
    is(s.done && (await view(page)) === 'is-sharp' && (await page.evaluate(() => document.querySelector('.ts-tube').textContent)) === r.w.word, `${r.id}: ${n} rings — sharp, the word on the main tube`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* build */
  for (const r of C.rounds('build')) {
    await okRun(page); await force(page, 'build', r.id);
    let s = await state(page); const n = r.w.syl.length;
    const word = s.all.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).map(b => b.id);
    is(s.rack.length === n && s.all.every(b => b.s >= 0), `${r.id}: the rack holds the word's rings, no decoy`);
    await tap(page, '.ts-check'); is((await state(page)).misses === 0 && (await note(page)) === T('hintBuild'), `${r.id}: Kig! with nothing fitted asks`);
    for (const id of word.slice().reverse()) await dragTo(page, `.ts-loose[data-id="${id}"]`, '.ts-scope');
    s = await state(page); is(s.segs.join() === word.slice().reverse().join(), `${r.id}: the rings dragged on in reverse`);
    await tap(page, '.ts-check'); s = await state(page);
    const stays = word.slice().reverse().map((id, i) => word.indexOf(id) === i);
    is(s.misses === 1 && s.last.result === 'order' && s.segs.every((x, i) => stays[i] ? x === word[i] : !x) && (await view(page)) === 'is-blur' && (await note(page)) === T(stays.some(Boolean) ? 'hintGlow' : 'hintNoneRight'), `${r.id}: the collapse — right rings stay, wrong rings pop to the rack`);
    for (const id of word) if (s.rack.includes(id)) await tap(page, `.ts-loose[data-id="${id}"]`);
    s = await state(page); is(s.segs.join() === word.join(), `${r.id}: rack rings tapped fit in turn`);
    await tap(page, '.ts-check'); is((await state(page)).done && (await view(page)) === 'is-sharp', `${r.id}: word order — sharp`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* build with Ekstra ring: the decoy pops out first; miss 2 locks the FIRST syllable */
  for (const r of C.rounds('build').slice(0, 4)) {
    await okRun(page); await force(page, 'build', r.id, { extra: 'on' });
    let s = await state(page); const decoy = s.all.find(b => b.s === -1);
    is(s.rack.length === r.w.syl.length + 1 && !!decoy && decoy.text === r.decoy, `${r.id} extra: a decoy ring on the rack`);
    await tap(page, `.ts-loose[data-id="${decoy.id}"]`); await tap(page, '.ts-check'); s = await state(page);
    is(s.last.result === 'decoy' && s.rack.includes(decoy.id) && (await note(page)) === T('hintDecoy'), `${r.id} extra: the decoy pops out`);
    const word = s.all.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).map(b => b.id);
    for (const id of word.slice().reverse()) await tap(page, `.ts-loose[data-id="${id}"]`);
    await tap(page, '.ts-check'); s = await state(page);
    is(s.help === 2 && s.locked === 0 && s.segs[0] === word[0] && (await page.evaluate(() => !!document.querySelector('.ts-ring[data-k="0"] .ts-rivet'))) && (await note(page)) === T('hintFirst', { first: r.w.syl[0] }), `${r.id} extra: miss 2 — the first syllable locks with a rivet`);
    for (const id of word) if (s.rack.includes(id)) await tap(page, `.ts-loose[data-id="${id}"]`);
    await tap(page, '.ts-check'); is((await state(page)).done, `${r.id} extra: sharp`);
  }
  /* gap */
  for (const r of C.rounds('gap')) {
    await okRun(page); await force(page, 'gap', r.id);
    let s = await state(page);
    const ans = s.all.find(b => b.s === r.gap), same = s.all.find(b => b.s === -2), fo = s.all.find(b => b.s === -1);
    is((await page.evaluate(() => document.querySelectorAll('.ts-ring.is-hollow').length)) === 1, `${r.id}: one hollow ring`);
    await tap(page, '.ts-check'); is((await state(page)).misses === 0 && (await note(page)) === T('hintGap'), `${r.id}: Kig! with the hollow empty asks`);
    await dragTo(page, `.ts-loose[data-id="${same.id}"]`, '.ts-ring.is-hollow'); await tap(page, '.ts-check'); s = await state(page);
    is(s.last.result === 'sameword' && s.rack.includes(same.id) && (await note(page)) === T('hintSameWord'), `${r.id}: a syllable of the word, in the wrong place — sent back`);
    await tap(page, `.ts-loose[data-id="${fo.id}"]`); await tap(page, '.ts-check'); s = await state(page);
    is(s.help === 2 && s.last.result === 'foreign' && (await page.evaluate(() => !!document.querySelector('.ts-ring.is-hollow.is-glow'))) && (await note(page)) === T('hintListen'), `${r.id}: a foreign syllable — miss 2, the hollow glows`);
    await tap(page, `.ts-loose[data-id="${ans.id}"]`); await tap(page, '.ts-check');
    is((await state(page)).done && (await view(page)) === 'is-sharp', `${r.id}: the answer — sharp`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* settings */
  await page.evaluate(() => { window.TelescopeActivity.OK_MS = 60000; });
  await force(page, 'pull', 'pull-ambulance');
  for (const v of ['yes', 'no']) { await page.evaluate((v) => { const a = window.TelescopeActivity; a.api.settings.island = v; a.onSettings(); }, v); is((await page.evaluate(() => (document.querySelector('.ts-iword') || {}).textContent || '')) === (v === 'yes' ? 'ambulance' : ''), `Ordet på øen: ${v}`); }
  await force(page, 'build', 'build-kjole', { extra: 'on' }); is((await state(page)).rack.length === 3, 'Ekstra ring: Til — three rings for a two-syllable word');
  /* keyboard */
  await force(page, 'pull', 'pull-telefon');
  await page.focus('.ts-wrap'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight');
  is((await state(page)).out === 2, '→ pulls a ring out');
  await page.keyboard.press('ArrowLeft'); is((await state(page)).out === 1, '← pushes a ring in');
  await page.keyboard.press('ArrowRight'); is((await page.evaluate(() => document.activeElement && document.activeElement.closest('.ts-wrap') !== null)) && (await state(page)).out === 2, 'focus survives the repaint');
  await force(page, 'build', 'build-spøgelse');
  await page.focus('.ts-loose'); await page.keyboard.press('Enter'); is((await state(page)).segs.filter(Boolean).length === 1, 'Enter on a rack ring fits it');
  await page.keyboard.press('Backspace'); is((await state(page)).segs.filter(Boolean).length === 0, 'Backspace takes the outermost ring off');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.TelescopeActivity.OK_MS = 60000; });
    const cases = C.rounds('pull').map(r => ['pull', r.id, null]).concat(C.rounds('build').map(r => ['build', r.id, null]), C.rounds('build').map(r => ['build', r.id, { extra: 'on' }]), C.rounds('gap').map(r => ['gap', r.id, null]));
    for (const [lv, id, set] of cases) {
      await force(o.page, lv, id, set);
      for (const phase of ['rest', 'miss', 'done']) {
        if (phase === 'miss') await o.page.evaluate(() => { const A = window.TelescopeActivity, C2 = window.TelescopeCore, st = A.st, r = st.r, n = r.w.syl.length; if (r.level === 'pull') { for (let i = 0; i < 4; i++) C2.pull(st); if (n === 4) C2.push(st, 3); } else if (r.level === 'build') { st.all.filter(b => b.s >= 0).sort((a, b) => b.s - a.s).forEach(b => C2.fit(st, b.id)); } else { C2.fit(st, st.all.find(b => b.s === -2).id); } A._look(); });
        if (phase === 'done') await o.page.evaluate(() => { const A = window.TelescopeActivity, C2 = window.TelescopeCore, st = A.st, r = st.r, n = r.w.syl.length; if (st.done) return; if (r.level === 'pull') { while (st.out > 0) C2.push(st, st.out - 1); for (let i = 0; i < n; i++) C2.pull(st); } else if (r.level === 'build') { while (C2.outermost(st) >= 0) C2.unfit(st, C2.outermost(st)); st.all.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).forEach(b => C2.fit(st, b.id)); } else { C2.fit(st, st.all.find(b => b.s === r.gap).id); } A._look(); });
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const ctl = [...document.querySelectorAll('.ts-check:not([hidden]),.ts-scope .ts-ring,.ts-loose,.ts-lens,.ts-island')].filter(e => e.offsetParent);
          const pics = [...document.querySelectorAll('.ts-pic')].filter(e => e.offsetParent).map(e => e.getBoundingClientRect().width);
          const scope = document.querySelector('.ts-scope').getBoundingClientRect(), sea = document.querySelector('.ts-sea').getBoundingClientRect();
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 || b.height < 44; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            scopeIn: scope.right <= sea.right + 1,
            pic: pics.length ? Math.min(...pics) : 999, low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.scopeIn && m.pic >= minPic, `@${w} ${id}${set ? ' extra' : ''} ${phase}: no sideways scroll, controls ≥ 44 inside the card, the telescope inside the sea, pictures ≥ ${minPic} (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, scope ${m.scopeIn}, pic ${Math.round(m.pic)})`);
        is(m.low <= m.H, `@${w} ${id}${set ? ' extra' : ''} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['pull-motorcykel', 'build-ballerina', 'gap-radise'].includes(id) && !set) await o.page.screenshot({ path: path.join(SHOT, `da-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-telescope: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
