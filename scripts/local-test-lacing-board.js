#!/usr/bin/env node
/* =====================================================================
   local-test-lacing-board.js — the interaction gate for ACTIVITY #47,
   Snørebrettet (RF.K.2.B, no). Real pointer, every round of every level:
     thread — nothing threaded at rest; Stram! untouched asks (no miss);
       the lace's tip DRAGGED onto the second syllable → Stram! slips it
       out (miss), it hops back; the first TAPPED → Stram! asks for more
       (no miss); the rest threaded by tip-drag and tap → right: the
       buttons on the rail, then the word card, a peg on the peg rail;
     decoy — a decoy threaded → it slips off first (hintDecoy); miss 2
       glows ONLY the next button; two decoys → hintDecoy2;
     count — one hole short → the last button carries two syllables, a
       ghost hole; one too many → a blank button, the clap hint and the
       syllables above the board at miss 2; the blank tapped off → right.
   Also: tap-the-last unthreads (an earlier one does not), the settings,
   the keyboard (Enter threads, Backspace unthreads, focus survives), the
   DOM order = cell order (never the word order), and the width sweep (no
   sideways scroll, controls ≥ 44 px inside the card, buttons inside the
   board and never overlapping, syllables ≥ 14 px, pictures ≥ 64 px /
   ≥ 96 px from 704, every control above the fold) at rest, miss and done.
   Usage: node scripts/local-test-lacing-board.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.bygg-ordet-av-stavelser.no.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'lacing-board-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, LacingBoardCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'lacing-board-activity.js'), 'utf8') + '\n;this.__A = LacingBoardActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].no; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
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
    await page.goto(`${base}/lacing-board-activity.html?activity=${ID}&lang=no&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.LacingBoardActivity && window.LacingBoardActivity.st && document.querySelector('.lc-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.LacingBoardActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.LacingBoardActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, level: s.r.level, w: s.r.w, buttons: s.buttons, path: s.path, row: s.row, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.lc-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(60); }
  const B = (id) => `.lc-btn[data-id="${id}"]`;
  /* the lace's tip dragged onto a button */
  async function lace(page, id) {
    await ctr(page, '.lc-board');
    const a = await page.evaluate(() => { const r = document.querySelector('.lc-aglet').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, B(id));
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10);
    await page.mouse.up(); await wait(80);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.LacingBoardActivity; Object.assign(a.api.settings, { decoys: 'one', layout: 'scatter' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(150);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.LacingBoardActivity.OK_MS = 0; }); };
  const word = (s) => s.buttons.filter(b => b.s !== null && b.s >= 0).sort((a, b) => a.s - b.s).map(b => b.id);
  const domS = (page) => page.evaluate(() => [...document.querySelectorAll('.lc-btn')].map(e => window.LacingBoardCore.button(window.LacingBoardActivity.st, e.dataset.id).s));
  async function finish(page, r) {
    let s = await state(page);
    is(s.done && (await page.evaluate(() => [...document.querySelectorAll('.lc-btn')].every(e => e.classList.contains('is-gone')))), `${r.id}: the unused buttons fall away from the rail`);
    is(s.done && (await page.evaluate(() => document.querySelectorAll('.lc-btn.is-railed').length === 0 && !!document.querySelector('.lc-word'))), `${r.id}: right — the buttons closed up into the word`);
    is((await page.evaluate(() => (document.querySelector('.lc-word') || {}).textContent)) === r.w.word && (await page.evaluate(() => [...document.querySelectorAll('.lc-peg span')].map(e => e.textContent))).includes(r.w.word), `${r.id}: the word card, and a peg on the peg rail`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }

  console.log('— no');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  /* thread */
  for (const r of C.rounds('thread')) {
    await okRun(page); await force(page, 'thread', r.id);
    let s = await state(page); const n = r.w.syl.length, wd = word(s);
    is(s.buttons.length === n && !s.path.length && (await page.evaluate(() => !!document.querySelector('.lc-aglet') && !document.querySelector('.lc-btn.is-threaded'))), `${r.id}: ${n} buttons, nothing threaded, the tip at the knot`);
    if (n >= 3) { const d = await domS(page); is(d.join() !== wd.map((_, i) => i).join() && d.join() !== wd.map((_, i) => n - 1 - i).join(), `${r.id}: the DOM (Tab) order is never the word order (${d})`); }
    await tap(page, '.lc-check'); s = await state(page);
    is(s.misses === 0 && (await note(page)) === T('hintThread'), `${r.id}: Stram! untouched asks`);
    await lace(page, wd[1]); s = await state(page);
    is(s.path.join() === wd[1], `${r.id}: the tip dragged onto "${r.w.syl[1]}" threads it`);
    await tap(page, '.lc-check'); s = await state(page);
    is(s.misses === 1 && !s.path.length && s.last.result === 'order' && (await page.evaluate((id) => document.querySelector(`.lc-btn[data-id="${id}"]`).classList.contains('is-hop'), wd[1])) && (await note(page)) === T('hintFirst'), `${r.id}: the wrong first button slips out and hops back (miss)`);
    await tap(page, B(wd[0])); await tap(page, '.lc-check'); s = await state(page);
    is(s.misses === 1 && s.path.join() === wd[0] && s.last.result === 'more' && (await note(page)) === T('hintMore'), `${r.id}: a right beginning asks for more, no miss`);
    for (let i = 1; i < n; i++) { if (i % 2) await lace(page, wd[i]); else await tap(page, B(wd[i])); }
    s = await state(page); is(s.path.join() === wd.join(), `${r.id}: threaded in word order (tip and tap)`);
    await tap(page, '.lc-check');
    await finish(page, r);
  }
  /* decoy */
  for (const r of C.rounds('decoy')) {
    await okRun(page); await force(page, 'decoy', r.id);
    let s = await state(page); const wd = word(s), dec = s.buttons.find(b => b.s === -1);
    is(s.buttons.length === r.w.syl.length + 1 && dec && dec.text === r.decoys[0], `${r.id}: one trick button "${r.decoys[0]}"`);
    await tap(page, B(dec.id)); await tap(page, '.lc-check'); s = await state(page);
    is(s.last.result === 'decoy' && !s.path.length && (await page.evaluate((id) => document.querySelector(`.lc-btn[data-id="${id}"]`).classList.contains('is-decoy'), dec.id)) && (await note(page)) === T('hintDecoy'), `${r.id}: the trick button slips off (miss)`);
    await lace(page, wd[1]); await tap(page, '.lc-check'); s = await state(page);
    is(s.help === 2 && (await page.evaluate(() => [...document.querySelectorAll('.lc-btn.is-next')].map(e => e.dataset.id))).join() === wd[0] && (await note(page)) === T('hintNext'), `${r.id}: miss 2 — ONLY the next button glows`);
    for (const id of wd) await tap(page, B(id));
    await tap(page, '.lc-check');
    await finish(page, r);
  }
  /* two trick buttons; tap-the-last unthreads */
  for (const r of C.rounds('decoy').slice(0, 3)) {
    await okRun(page); await force(page, 'decoy', r.id, { decoys: 'two' });
    let s = await state(page); const wd = word(s), decs = s.buttons.filter(b => b.s === -1);
    is(decs.length === 2 && (await page.evaluate(() => document.querySelector('.lcs-activity-prompt').textContent)).includes(T('pDecoy2')), `${r.id}: two trick buttons, the prompt says two`);
    await tap(page, B(wd[0])); await tap(page, B(decs[0].id)); await tap(page, B(decs[1].id));
    await tap(page, B(wd[0])); s = await state(page); is(s.path.length === 3, `${r.id}: tapping an earlier threaded button does not unthread it`);
    await tap(page, B(decs[1].id)); s = await state(page); is(s.path.join() === [wd[0], decs[0].id].join(), `${r.id}: tapping the LAST threaded button takes it off`);
    await tap(page, B(decs[1].id)); await tap(page, '.lc-check'); s = await state(page);
    is(s.last.result === 'decoy' && s.path.join() === wd[0] && (await note(page)) === T('hintDecoy2') && (await page.evaluate(() => document.querySelectorAll('.lc-btn.is-right').length)) === 1, `${r.id}: both trick buttons slip off, the right beginning stays and glows`);
    for (const id of wd.slice(1)) await tap(page, B(id));
    await tap(page, '.lc-check'); is((await state(page)).done, `${r.id}: two trick buttons — right`);
  }
  /* count */
  for (const r of C.rounds('count')) {
    await okRun(page); await force(page, 'count', r.id);
    let s = await state(page); const n = r.w.syl.length, ids = s.buttons.map(b => b.id);
    is(s.buttons.length === 6 && (await page.evaluate(() => [...document.querySelectorAll('.lc-syl')].every(e => !e.textContent))), `${r.id}: six blank buttons`);
    await tap(page, '.lc-check'); is((await state(page)).misses === 0 && (await note(page)) === T('hintCount'), `${r.id}: Stram! untouched asks`);
    let miss = 0;
    if (n > 1) {
      for (let i = 0; i < n - 1; i++) { if (i === 0) await lace(page, ids[i]); else await tap(page, B(ids[i])); }
      await tap(page, '.lc-check'); s = await state(page); miss++;
      is(s.last.result === 'short' && (await page.evaluate(() => document.querySelectorAll('.lc-btn.is-double').length)) === 1 && (await page.evaluate(() => !!document.querySelector('.lc-ghost'))) && (await note(page)) === T('hintShort'), `${r.id}: one hole short — the last button carries two syllables, a ghost hole`);
      const dbl = await page.evaluate(() => document.querySelector('.lc-btn.is-double .lc-syl').textContent);
      is(dbl === r.w.syl.slice(n - 2).join('·'), `${r.id}: the squeezed button reads ${dbl}`);
    }
    for (let i = n - 1 > 0 ? n - 1 : 0; i < n + 1; i++) await tap(page, B(ids[i]));
    await tap(page, '.lc-check'); s = await state(page); miss++;
    is(s.last.result === 'long' && (await page.evaluate(() => document.querySelectorAll('.lc-btn.is-blank').length)) === 1 && s.path.length === n + 1, `${r.id}: one too many — a blank button, still on the lace`);
    if (miss >= 2) is((await note(page)) === T('hintClap') && (await page.evaluate(() => (document.querySelector('.lc-banner') || {}).textContent)) === r.w.syl.join(' · '), `${r.id}: miss 2 — clap, the word in syllables above the board`);
    else is((await note(page)) === T('hintLong'), `${r.id}: hintLong`);
    await tap(page, B(ids[n])); s = await state(page); is(s.path.length === n, `${r.id}: the blank button tapped off`);
    await tap(page, '.lc-check'); s = await state(page);
    is(s.done, `${r.id}: ${n} holes — right`);
    await finish(page, r);
  }
  /* settings */
  await page.evaluate(() => { window.LacingBoardActivity.OK_MS = 60000; });
  await force(page, 'thread', 'thread-solsikke', { layout: 'row' });
  const tops = await page.evaluate(() => [...document.querySelectorAll('.lc-btn')].map(e => Math.round(parseFloat(e.style.top))));
  is((await state(page)).row && new Set(tops).size === 1, `Knappene: På rad — the buttons in one row (${tops})`);
  await force(page, 'thread', 'thread-solsikke', { layout: 'scatter' }); is(!(await state(page)).row, 'Knappene: Spredt');
  for (const [v, k] of [['none', 0], ['one', 1], ['two', 2]]) { await force(page, 'decoy', 'decoy-paraply', { decoys: v }); is((await state(page)).buttons.length === 3 + k, `Lureknapper: ${v} — ${3 + k} buttons`); }
  /* keyboard */
  await force(page, 'thread', 'thread-solsikke');
  await page.focus('.lc-btn'); const fid = await page.evaluate(() => document.activeElement.dataset.id);
  await page.keyboard.press('Enter'); is((await state(page)).path.join() === fid, 'Enter on a button threads it');
  is((await page.evaluate(() => document.activeElement && document.activeElement.dataset.id)) === fid, 'focus survives the repaint');
  await page.keyboard.press('Backspace'); is((await state(page)).path.length === 0, 'Backspace takes the last button off');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.LacingBoardActivity.OK_MS = 60000; });
    const cases = C.rounds('thread').map(r => ['thread', r.id, null]).concat(C.rounds('thread').slice(-3).map(r => ['thread', r.id, { layout: 'row' }]), C.rounds('decoy').map(r => ['decoy', r.id, { decoys: 'two' }]), C.rounds('decoy').slice(-3).map(r => ['decoy', r.id, { decoys: 'two', layout: 'row' }]), C.rounds('count').map(r => ['count', r.id, null]));
    for (const [lv, id, set] of cases) {
      await force(o.page, lv, id, set);
      const tag = `@${w} ${id}${set ? ' ' + Object.values(set).join('/') : ''}`;
      for (const phase of ['rest', 'miss', 'done']) {
        if (phase === 'miss') await o.page.evaluate(() => { const A = window.LacingBoardActivity, C2 = window.LacingBoardCore, st = A.st, r = st.r, n = r.w.syl.length; if (r.level === 'count') { for (let i = 0; i < Math.max(1, n - 1); i++) C2.thread(st, st.buttons[i].id); if (n === 1) C2.thread(st, st.buttons[1].id); } else { const w = st.buttons.filter(b => b.s >= 0).sort((a, b) => a.s - b.s); C2.thread(st, w[w.length - 1].id); st.buttons.filter(b => b.s === -1).forEach(b => C2.thread(st, b.id)); C2.thread(st, w[0].id); } A._tighten(); for (let q = 0; q < (r.level === 'count' ? 2 : 1); q++) { const nx = st.buttons.find(b => st.path.indexOf(b.id) < 0 && b.s !== 0); if (nx) C2.thread(st, nx.id); } C2.tighten(st); if (st.done) throw new Error('miss phase landed on right: ' + r.id); A._paint(); });
        if (phase === 'done') await o.page.evaluate(() => { const A = window.LacingBoardActivity, C2 = window.LacingBoardCore, st = A.st, r = st.r; if (st.done) return; while (st.path.length) C2.unthreadLast(st); if (r.level === 'count') { for (let i = 0; i < r.w.syl.length; i++) C2.thread(st, st.buttons[i].id); } else st.buttons.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).forEach(b => C2.thread(st, b.id)); A._tighten(); });
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement, board = document.querySelector('.lc-board').getBoundingClientRect();
          const btns = [...document.querySelectorAll('.lc-btn:not(.is-gone)')].filter(e => e.offsetParent);
          const ctl = btns.concat([...document.querySelectorAll('.lc-check:not([hidden]),.lc-pic,.lc-aglet')].filter(e => e.offsetParent));
          const pics = [...document.querySelectorAll('.lc-pic img')].map(e => e.getBoundingClientRect().width);
          /* the face circle (unrotated box) — two faces must never overlap */
          const faces = btns.filter(e => !e.classList.contains('is-railed')).map(e => ({ x: e.offsetLeft + e.offsetWidth / 2, y: e.offsetTop + e.offsetHeight / 2, r: e.offsetWidth / 2 }));
          let hit = 0; for (let i = 0; i < faces.length; i++) for (let j = i + 1; j < faces.length; j++) if (Math.hypot(faces[i].x - faces[j].x, faces[i].y - faces[j].y) < faces[i].r + faces[j].r - 1) hit++;
          const ag = document.querySelector('.lc-aglet'); let cover = 0;
          if (ag) { const a = { x: ag.offsetLeft + 24, y: ag.offsetTop + 24 }; faces.forEach(f => { if (Math.hypot(f.x - a.x, f.y - a.y) < f.r - 4) cover++; }); }
          const syl = [...document.querySelectorAll('.lc-syl')].filter(e => e.textContent).map(e => parseFloat(getComputedStyle(e).fontSize));
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 - 0.5 || b.height < (e.classList.contains('is-railed') ? 30 : 44) - 0.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            inBoard: btns.every(e => { const b = e.getBoundingClientRect(); return b.left >= board.left - 6 && b.right <= board.right + 6 && b.top >= board.top - 6 && b.bottom <= board.bottom + 6; }),
            hit, cover, syl: syl.length ? Math.min(...syl) : 99,
            pic: pics.length ? Math.min(...pics) : 999, low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.inBoard && m.pic >= minPic, `${tag} ${phase}: no sideways scroll, controls ≥ 44 inside the card, buttons on the board, pictures ≥ ${minPic} (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, board ${m.inBoard}, pic ${Math.round(m.pic)})`);
        is(m.hit === 0 && m.cover === 0 && m.syl >= 14, `${tag} ${phase}: no two buttons overlap, the tip covers no face, syllables ≥ 14 px (hit ${m.hit}, cover ${m.cover}, syl ${m.syl})`);
        is(m.low <= m.H, `${tag} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['thread-solsikke', 'decoy-helikopter', 'count-motorsykkel'].includes(id) && (!set || set.decoys === 'two') && !(set && set.layout)) await o.page.screenshot({ path: path.join(SHOT, `no-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-lacing-board: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
