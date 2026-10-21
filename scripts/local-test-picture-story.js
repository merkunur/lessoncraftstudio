#!/usr/bin/env node
/* =====================================================================
   local-test-picture-story.js — the interaction gate for ACTIVITY #63,
   The Bookmark (Fable's Picture Stories, RL.K.1, 11 locales). Real
   pointer at 704, every round:
     Ask the book (3 pages, all 18) — Check with no mark asks (no miss)
     and the tag wiggles; a wrong target TAPPED is miss 1 and the answer
     line shows what was marked (its picture, its words or its dots); the
     tag DRAGGED onto another wrong target is miss 2: the proving page
     lifts and its words that repeat the question light up; the right
     target (for who / what, the right thing on ANOTHER page when there is
     one) wins: the shell celebrates with the question and the answer,
     the proving page shines and Fable sits on it.
     Ask the book (4 pages) — the rounds that differ in the 4-page book.
     Caption the pages (all 7 books) — a wrong page is a miss and keeps
     the sentence; every sentence slipped into its page fills its line;
     the last one wins.
   Once per locale: a tap on a scene plays its page; Enter on a phrase
   marks it; the options. At 360: the page arrows, a mark on page 2, the
   win turning to the answer page. The width sweep (all locales at 320 /
   704 / 1366, en at 320–1366), each game and book at rest, marked, miss 2
   and won: no sideways scroll, every control ≥ 44 and inside the card,
   phrases ≥ 44 tall, text ≥ 14, the largest picture of each page at its
   floor, Check above the fold.
   Usage: node scripts/local-test-picture-story.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'picture-story.read.rl-k-1';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '063-bookmark', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'picture-story-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, PictureStoryCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'picture-story-activity.js'), 'utf8') + '\n;this.__A = PictureStoryActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/picture-story-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PictureStoryActivity && window.PictureStoryActivity.st && document.querySelector('.pst-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.PictureStoryActivity.FAST = true; window.PictureStoryActivity.OK_MS = 60000; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.PictureStoryActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, mark: s.mark, misses: s.misses, help: s.help, done: s.done, last: s.last, k: s.k, placed: s.placed, order: s.order })); });
  const note = (page) => page.evaluate(() => document.querySelector('.pst-note').textContent);
  /* a VISIBLE point of the target (a picture may sit partly under another one) */
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const rs = el.getClientRects(), r = rs[0] || el.getBoundingClientRect(); const pts = [[.5, .5]]; for (let i = 1; i < 6; i++) for (let j = 1; j < 6; j++) pts.push([i / 6, j / 6]); for (const [fx, fy] of pts) { const x = r.left + r.width * fx, y = r.top + r.height * fy, h = document.elementFromPoint(x, y); if (h && (h === el || el.contains(h))) return { x, y }; } return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const el = document.querySelector(s); const rs = el.getClientRects(), r = rs[0] || el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(50);
  }
  const tsel = (id) => `[data-tid="${id}"]`;
  async function force(page, mode, n, id) {
    await page.evaluate((mode, n, id) => { const a = window.PictureStoryActivity; a.api.settings.mode = mode; a.api.settings.pages = String(n); a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, mode, n, id);
    await wait(70);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  /* the book shows one page at a time: turn to a page with the arrows */
  async function goPage(page, p) { for (let i = 0; i < 6; i++) { const cur = await page.evaluate(() => +document.querySelector('.pst-page').getAttribute('data-p')); if (cur === p) return; await tap(page, cur < p ? '[data-k="next"]' : '[data-k="prev"]'); } throw new Error('could not turn to page ' + p); }
  const pageOf = (id) => +String(id).slice(1).split('-')[0];
  async function tapT(page, id) { await goPage(page, pageOf(id)); await tap(page, tsel(id)); }
  async function check(page) { await tap(page, '[data-k="check"]'); await page.waitForFunction(() => !window.PictureStoryActivity._busy, { timeout: 15000 }); await wait(30); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; });
  async function win(page, id, must, proofPage) {
    await page.evaluate(() => { window.PictureStoryActivity.OK_MS = 0; });
    await check(page); const s = await state(page);
    if (proofPage) is(await page.evaluate((p) => !!document.querySelector(`.pst-page.is-proof[data-p="${p}"]`) && !!document.querySelector('.pst-fable.is-hop'), proofPage), `${id}: page ${proofPage} shines and Fable hops`);
    is(s.done && await celebrated(page), `${id}: right → the shell celebrates`);
    const b = await bubble(page);
    is(b && !/\{\w+\}/.test(b) && must.every(x => b.includes(x)), `${id}: the success text is filled and names ${must.join(' / ')} («${b}»)`);
    await page.evaluate(() => { window.PictureStoryActivity.OK_MS = 60000; });
  }

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.PictureStoryActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'mode:ask,caption | pages:3,4', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);

    for (const n of [3, 4]) for (const r of C.askRounds(loc, n)) {
      if (n === 4 && !['cLast', 'mAfter4', 'gEnd4'].includes(r.key)) continue;
      const id = `${loc} ask${n} ${r.key}`, bk = C.book(loc, r.story, n), all = C.targets(bk);
      await force(page, 'ask', n, r.id);
      is(await page.evaluate(() => document.querySelectorAll('.pst-book .pst-page').length) === 1 && await page.evaluate(() => document.querySelector('.pst-page').getAttribute('data-p')) === '1', `${id}: the book opens at page 1, one page at a time`);
      await check(page); let s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'hintEmpty') && await page.evaluate(() => !!document.querySelector('.pst-tag.is-wiggle')), `${id}: Check with no mark asks, the tag wiggles, no miss`);
      const same = all.filter(t => !C.right(r, t) && t.kind === r.kind), wrong = same.length >= 2 ? same : all.filter(t => !C.right(r, t));
      const w1 = wrong[0], w2 = wrong[wrong.length - 1];
      await tapT(page, w1.id); s = await state(page);
      is(s.mark === w1.id && await page.evaluate((id) => !!document.querySelector(`[data-tid="${id}"].is-marked`), w1.id), `${id}: the bookmark on ${w1.id}`);
      await check(page); s = await state(page);
      const shown = await page.evaluate(() => { const a = document.querySelector('.pst-ans'); return { img: !!a.querySelector('.pst-ansimg'), text: (a.querySelector('.pst-anstext') || {}).textContent || '', dots: a.querySelectorAll('.pst-ansdots .pst-dot').length }; });
      const okShown = w1.kind === 'thing' ? shown.text === C.label(loc, w1.pic) : w1.kind === 'phrase' ? shown.text === w1.text : shown.dots === w1.page;
      is(s.misses === 1 && s.mark === null && okShown && (await note(page)) === T(loc, r.kind === 'page' ? 'hintMissPage' : 'hintMiss'), `${id}: ${w1.id} is miss 1, the answer line shows it`);
      await goPage(page, pageOf(w2.id)); await drag(page, '[data-k="tag"]', tsel(w2.id)); s = await state(page);
      is(s.mark === w2.id, `${id}: the bookmark dragged onto ${w2.id}`);
      await check(page); s = await state(page);
      const help = r.kind === 'page' ? [] : C.helpWords(r, bk);
      const m2 = await page.evaluate((p) => ({ curl: !!document.querySelector(`.pst-page.is-curl[data-p="${p}"]`), lit: [...document.querySelectorAll(`.pst-page[data-p="${p}"] .pst-cap .is-help`)].map(e => e.textContent) }), r.page);
      const hint2 = r.kind === 'page' || !help.length ? 'hintMiss2Page' : 'hintMiss2';
      is(s.misses === 2 && m2.curl && m2.lit.length >= help.length && (await note(page)) === T(loc, hint2), `${id}: miss 2 lifts page ${r.page}, lights ${m2.lit.length} words (${help.join(' ')})`);
      const rt = C.rightTargets(r, bk), other = rt.find(x => x[0] === 't' && +x.slice(1, x.indexOf('-')) !== r.page), pick = other || rt[0];
      await tapT(page, pick); s = await state(page);
      is(s.mark === pick, `${id}: the bookmark on ${pick}${other ? ' (the right thing on another page)' : ''}`);
      await win(page, id, [r.answer], r.page);
    }

    for (const n of [3, 4]) for (const r of C.capRounds(loc, n)) {
      if (n === 4 && r.story !== 'hat' && r.story !== 'mitten') continue;
      const id = `${loc} cap${n} ${r.story}`;
      await force(page, 'caption', n, r.id);
      let s = await state(page);
      const bk = C.book(loc, r.story, n);
      is(await page.evaluate(() => document.querySelector('.pst-q').textContent) === bk.pages[s.order[0] - 1].caption.text && await page.evaluate(() => document.querySelectorAll('.pst-cap.is-slot').length) === 1 && !Object.keys(s.placed).length, `${id}: the bookmark carries a sentence, the page shows an empty line`);
      await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'capEmpty'), `${id}: Check with no page asks`);
      const wrongP = s.order[0] === 1 ? 2 : 1;
      await tapT(page, 'p' + wrongP); await check(page); s = await state(page);
      is(s.misses === 1 && s.k === 0 && (await note(page)) === T(loc, 'capMiss1'), `${id}: page ${wrongP} is the wrong page — a miss, the sentence stays`);
      for (let k = 0; k < n; k++) {
        const p = s.order[k];
        await goPage(page, p); if (k === 0) await drag(page, '[data-k="tag"]', tsel('p' + p)); else await tap(page, tsel('p' + p));
        if (k < n - 1) { await check(page); s = await state(page); is(s.k === k + 1 && s.placed[p] && Object.keys(s.placed).length === k + 1, `${id}: sentence ${k + 1} into page ${p}`); await goPage(page, p); is(await page.evaluate((t) => { const c = document.querySelector('.pst-cap.is-filled'); return !!c && c.textContent === t; }, bk.pages[p - 1].caption.text), `${id}: page ${p} now shows its sentence`); }
      }
      await win(page, id, [T(loc, 'okCap')]);
    }
    /* a tap on a scene plays its page; Enter on a phrase marks it */
    {
      const r = C.askRounds(loc, 3)[0]; await force(page, 'ask', 3, r.id);
      await page.evaluate(() => { window.PictureStoryActivity.FAST = false; });
      const sc = await page.evaluate(() => { const e = document.querySelector('.pst-page[data-p="1"] .pst-scene'); const b = e.getBoundingClientRect(); return { x: b.left + 6, y: b.top + 6 }; });
      await page.mouse.click(sc.x, sc.y); await wait(60);
      is(await page.evaluate(() => !!document.querySelector('.pst-page[data-p="1"].is-act')), `${loc}: a tap on a scene plays its page`);
      await wait(1100);
      /* Caption: picking a page plays what it shows */
      const cr = C.capRounds(loc, 3)[0]; await force(page, 'caption', 3, cr.id);
      await page.evaluate(() => { window.PictureStoryActivity.FAST = false; });
      await tap(page, tsel('p1')); await wait(60);
      is(await page.evaluate(() => !!document.querySelector('.pst-page[data-p="1"].is-act')) && (await state(page)).mark === 1, `${loc}: Caption — picking a page marks it and plays what it shows`);
      await wait(1100); await page.evaluate(() => { window.PictureStoryActivity.FAST = true; });
      await force(page, 'ask', 3, r.id);
      await page.focus('[data-tid="f1-0"]'); await page.keyboard.press('Enter'); await wait(30);
      is((await state(page)).mark === 'f1-0', `${loc}: Enter on a phrase marks it`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the page arrows on a phone */
  if (!process.argv.includes('--sweep-only')) {
    const { page } = await open(360, 'en');
    const r = C.askRounds('en', 3).find(x => x.key === 'cWhy'); await force(page, 'ask', 3, r.id);
    is(await page.evaluate(() => document.querySelectorAll('.pst-book .pst-page').length) === 1, '@360: one page at a time');
    await tap(page, '[data-k="next"]');
    is(await page.evaluate(() => document.querySelector('.pst-page').getAttribute('data-p')) === '2', '@360: the arrow turns to page 2');
    const rt = C.rightTargets(r, C.book('en', r.story, 3))[0];
    await tapT(page, rt); await page.evaluate(() => { window.PictureStoryActivity.OK_MS = 60000; }); await check(page);
    is((await state(page)).done && await page.evaluate(() => document.querySelector('.pst-page').getAttribute('data-p')) === '2', '@360: the answer on page 2 wins, page 2 stays open');
    const r2 = C.askRounds('en', 3).find(x => x.key === 'mFound'); await force(page, 'ask', 3, r2.id);
    await tap(page, tsel('t1-0')); await check(page); await tap(page, tsel('t1-0')); await check(page);
    is(await page.evaluate(() => document.querySelector('.pst-page').getAttribute('data-p')) === '3', '@360: miss 2 turns to the lifted page 3');
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const [mode, n] of [['ask', 3], ['ask', 4], ['caption', 3], ['caption', 4]]) {
      const R = C.rounds(loc, mode, n);
      const weight = (r) => C.book(loc, r.story, n).pages.reduce((a, pg) => a + pg.caption.text.length, 0) + (r.question ? r.question.text.length * 2 : 0);
      const r = R.slice().sort((a, b) => weight(b) - weight(a))[0];
      await force(page, mode, n, r.id);
      for (const phase of ['rest', 'marked', 'miss2', 'won']) {
        await page.evaluate((phase) => {
          const A = window.PictureStoryActivity, K = window.PictureStoryCore, st0 = A.st, r = st0.r;
          const st = r.mode === 'caption' ? K.newCap(r, st0.book, st0.order) : K.newAsk(r, st0.book);
          const wrongs = r.mode === 'caption' ? [] : K.targets(st.book).filter(t => !K.right(r, t));
          const wrongP = r.mode === 'caption' ? (st.order[0] === 1 ? 2 : 1) : 0;
          if (phase === 'marked') K.mark(st, r.mode === 'caption' ? 'p' + wrongP : wrongs[0].id);
          if (phase === 'miss2') { for (let i = 0; i < 2; i++) { K.mark(st, r.mode === 'caption' ? 'p' + wrongP : wrongs[i].id); K.check(st); } }
          if (phase === 'won') { if (r.mode === 'caption') { while (!st.done) { K.mark(st, 'p' + st.order[st.k]); K.check(st); } A._view = { msg: 'x' }; } else { K.mark(st, K.rightTargets(r, st.book)[0]); K.check(st); A._view = { fable: r.page, msg: 'x' }; A._page = r.page; } }
          if (phase !== 'won') A._view = {};
          if (phase === 'miss2' && r.mode !== 'caption') A._page = r.page;
          A.st = st; A._busy = false; A._paint();
        }, phase);
        await wait(60);
        const tag = `@${w} ${loc} ${mode}${n} ${r.id} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => (e.offsetParent || e.getClientRects().length) && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('button.pst-thing,button.pst-edge,button.pst-page:not(:disabled),.pst-navbtn,.pst-tag,.pst-check:not([hidden])')].filter(vis);
          const phr = [...document.querySelectorAll('.pst-phrase')].filter(vis);
          const txt = [...document.querySelectorAll('.pst-cap,.pst-q,.pst-ans,.pst-note,.pst-check,.pst-title')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const big = [...document.querySelectorAll('.lcs-app img')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
          const chk = document.querySelector('.pst-check:not([hidden])');
          const spill = [...document.querySelectorAll('.pst-page,.pst-tag')].filter(b => b.scrollWidth > b.clientWidth + 1).length;
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.concat(phr).filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            phrase: phr.length ? Math.min(...phr.map(e => Math.min(...[...e.getClientRects()].map(r => r.height)))) : 99,
            txt: txt.length ? Math.min(...txt) : 99, big: big.length ? Math.min(...big) : 0, spill,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const floor = w >= 700 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
        is(m.phrase >= 43.5 && m.txt >= 14 && !m.spill && m.big >= floor - .5, `${tag}: phrases ≥ 44 tall (${m.phrase}), text ≥ 14 (${m.txt}), nothing spills (${m.spill}), every picture ≥ ${floor} (${Math.round(m.big)})`);
        if (phase !== 'won') is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${mode}${n}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-picture-story: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
