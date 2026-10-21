#!/usr/bin/env node
/* =====================================================================
   local-test-opposites-rod.js — the interaction gate for ACTIVITY #72,
   The Two-Ended Rod (Quill's Mirror Market, K.L.5.b, 11 locales). Real
   pointer at 704, every round of every level of every locale:
     pictures + sentences — the near-miss DRAGGED onto the rod (it parks
     in the middle groove / beside the target, or rides the crossing rod
     and comes back, or falls off) → miss 1 and its hint; the unrelated
     card TAPPED → miss 2, it bumps and comes back, the far end pulses;
     the opposite DRAGGED → it slides to the far end, the sentence blank
     fills with the authored word, the shell celebrates with the pair.
     the bedtime scene — three flips finish it.
     same or opposite — an empty Check is no miss; a wrong word dragged to
     an end and checked → a miss, the word back in the basket; every word
     dragged to its own end → the celebration names both lists.
     pair up — a card dragged to the wrong rod shivers and stays (miss);
     each card dragged to its own rod (one by tap-then-rod).
     prefixes — a push with no clip is no miss; a wrong clip dragged to
     the rod and the word pushed → it rolls back, nothing built; the
     right clip tapped and the word pushed → the made word at the far end.
   Write mode (Answer = Write it) in sentences per locale: the target
   typed is a miss, nonsense shakes without a miss, the answer typed in
   CAPITALS slides home. Settings: Words only → no pictures.
   The width sweep (all locales at 320 / 704 / 1366, en at 320–1366),
   each level at rest, missed and won: no sideways scroll, controls ≥ 44
   inside the card, text ≥ 14, pictures at their floor, no clipped words,
   the round's controls above the fold.
   Usage: node scripts/local-test-opposites-rod.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ONLY = arg('levels', '');
const ID = 'opposites.antonyms.k-l-5-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '072-two-ended-rod', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'opposites-rod-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, OppositesRodCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'opposites-rod-activity.js'), 'utf8') + '\n;this.__A = OppositesRodActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
const head = (s) => sp(s).split('{')[0].trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); const file = p.startsWith('/image-library-webp/') ? path.join(IMG, p.slice(20)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'text/html'); res.end(b); }); }); }
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
    await page.goto(`${base}/opposites-rod-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.OppositesRodActivity && window.OppositesRodActivity.st && document.querySelector('.tr-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.OppositesRodActivity; a.FAST = true; a.OK_MS = 60000; a.MISS_MS = 0; });
    return { page, errs };
  }
  async function force(page, level, id, extra) {
    await page.evaluate((level, id, extra) => { const a = window.OppositesRodActivity; a.api.settings.level = level; a.api.settings.words = (extra && extra.words) || 'pics'; a.api.settings.answer = (extra && extra.answer) || 'pick'; a._pool = null; const pool = a._ensurePool(), o = pool.map((x, i) => i), k = pool.indexOf(id); o.splice(k, 1); o.unshift(k); a._order = o; a._orderForPool = pool; a._slots = null; window.LCS_reloadFirstTask(); }, level, id, extra);
    await wait(40);
  }
  const st = (page) => page.evaluate(() => { const s = window.OppositesRodActivity.st; return JSON.parse(JSON.stringify({ r: s.r, misses: s.misses, done: s.done, parked: s.parked, ends: s.ends, filled: s.filled, clip: s.clip, flipped: s.flipped })); });
  const note = (page) => page.evaluate(() => document.querySelector('.tr-note').textContent);
  const settle = (page) => page.waitForFunction(() => !window.OppositesRodActivity._busy, { timeout: 15000 }).catch(() => {});
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    if (!b) throw new Error('nowhere to drop: ' + to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(60);
  }
  const won = async (page, fn) => { await page.evaluate(() => { window.OppositesRodActivity.OK_MS = 0; }); await fn(); const c = await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false); const b = await page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; }); await page.evaluate(() => { window.OppositesRodActivity.OK_MS = 60000; }); return { c, b: sp(b) }; };
  const HINT1 = { mid: 'hMid', same: 'hSame', off: 'hOff', cross: 'hCross' };

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    const { page, errs } = await open(704, loc);
    for (const lv of C.LEVELS.filter(x => !ONLY || ONLY.split(',').includes(x))) for (const id of C.ids(loc, lv)) {
      await force(page, lv, id);
      let s = await st(page); const r = s.r, tag = `${loc} ${lv}/${id}`;
      const task = await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text, .lcs-activity-prompt').textContent);
      const tk = id === 'pic.scene' ? 'tScene' : ({ pic: 'tPictures', same: 'tSame', pairs: 'tPairs', sent: 'tSentences', flip: 'tFlip', mean: 'tMeaning' })[id.split('.')[0]];
      is(sp(task).includes(sp(T(loc, tk))), `${tag}: the task line «${task.slice(0, 50)}»`);
      if (r.kind === 'rod') {
        const node = C.round(loc, id, r.cards.findIndex(c => c.home === 'far'), 'L');
        is(JSON.stringify(node.cards.map(c => [c.key, c.home])) === JSON.stringify(r.cards.map(c => [c.key, c.home])), `${tag}: the page deals the core's round`);
        const others = r.cards.filter(c => c.home !== 'far'), near = others.find(c => c.home !== 'off') || others[0], off = others.find(c => c !== near);
        await drag(page, `.tr-basket .tr-card[data-card="${near.id}"]`, '.tr-rodbox'); await settle(page); s = await st(page);
        const n1 = await note(page);
        is(s.misses === 1 && !s.done && sp(n1).startsWith(head(T(loc, HINT1[near.home]))), `${tag}: ${near.word} dragged → ${near.home}, miss 1, «${n1.slice(0, 40)}»`);
        if (near.home === 'mid' || near.home === 'same') is(await page.evaluate((id, h) => !!document.querySelector(`.tr-card.is-parked.is-${h}[data-parked="${id}"]`), near.id, near.home), `${tag}: ${near.word} parks ${near.home === 'mid' ? 'in the groove' : 'beside the target'}`);
        else is(await page.evaluate((id) => !!document.querySelector(`.tr-basket .tr-card[data-card="${id}"]`), near.id), `${tag}: ${near.word} comes back to the basket`);
        await tap(page, `.tr-basket .tr-card[data-card="${off.id}"]`); await settle(page); s = await st(page);
        is(s.misses === 2 && sp(await note(page)).startsWith(head(T(loc, 'hMiss2'))) && await page.evaluate(() => !!document.querySelector('.tr-clip.is-far.is-help')), `${tag}: ${off.word} tapped → falls off, miss 2, the far end pulses`);
        const w = await won(page, () => drag(page, `.tr-basket .tr-card[data-card="${r.far.id}"]`, '.tr-rodbox')); s = await st(page);
        const blank = await page.evaluate(() => { const b = document.querySelector('.tr-blank'); return b ? b.textContent : null; });
        is(s.done && w.c && w.b.includes(sp(r.target.word)) && w.b.includes(sp(r.far.word)) && (!r.sentence || blank === r.fill), `${tag}: ${r.far.word} slides to the far end${r.sentence ? ', the blank reads «' + blank + '»' : ''} (done ${s.done} c ${w.c} b «${w.b.slice(0, 80)}»)`);
      } else if (r.kind === 'scene') {
        await tap(page, '[data-scene="0"]'); await tap(page, '[data-scene="2"]'); s = await st(page);
        is(!s.done && s.flipped.filter(Boolean).length === 2, `${tag}: two flips, not finished`);
        const w = await won(page, () => tap(page, '[data-scene="1"]'));
        is(w.c && w.b.includes(sp(T(loc, 'okScene')).slice(0, 12)), `${tag}: three flips finish the bedtime scene`);
      } else if (r.kind === 'same') {
        await page.evaluate(() => { const b = document.querySelector('.tr-wrap .tr-check, .tr-wrap [data-k="check"]'); if (b) b.scrollIntoView({ block: 'center' }); });
        const chk = await page.evaluate(() => !!document.querySelector('.tr-check:not([hidden])'));
        is(chk, `${tag}: the Check button shows`);
        await tap(page, '.tr-check'); s = await st(page);
        is(s.misses === 0 && sp(await note(page)).startsWith(head(T(loc, 'hEmpty'))), `${tag}: an empty Check is no miss`);
        const wrongC = r.cards.find(c => c.home === 'off') || r.cards.find(c => c.home === 'far');
        await drag(page, `.tr-basket .tr-card[data-card="${wrongC.id}"]`, '.tr-zone.is-near');
        await tap(page, '.tr-check'); s = await st(page);
        is(s.misses === 1 && !s.ends[wrongC.id] && await page.evaluate((id) => !!document.querySelector(`.tr-basket .tr-card[data-card="${id}"]`), wrongC.id), `${tag}: ${wrongC.word} at the same end → miss, back in the basket`);
        for (const c of r.cards.filter(c => c.home !== 'off')) await drag(page, `.tr-basket .tr-card[data-card="${c.id}"]`, c.home === 'same' ? '.tr-zone.is-near' : '.tr-zone.is-far');
        s = await st(page);
        is(r.cards.every(c => (c.home === 'off') === !s.ends[c.id]), `${tag}: every word dragged to an end`);
        const w = await won(page, () => tap(page, '.tr-check'));
        is(w.c && r.cards.filter(c => c.home === 'far').every(c => w.b.includes(sp(c.word))), `${tag}: Check → the celebration names the opposites`);
      } else if (r.kind === 'pairs') {
        const c0 = r.cards[0], wrongRod = (c0.rod + 1) % 3;
        await drag(page, `.tr-basket .tr-card[data-card="${c0.id}"]`, `.tr-mini[data-rod="${wrongRod}"]`); s = await st(page);
        is(s.misses === 1 && s.filled.every(x => !x), `${tag}: ${c0.word} on the wrong rod → miss, nothing filled`);
        await settle(page);
        await tap(page, `.tr-basket .tr-card[data-card="${r.cards[1].id}"]`); await tap(page, `.tr-mini[data-rod="${r.cards[1].rod}"] .tr-bar`); s = await st(page);
        is(s.filled[r.cards[1].rod] === r.cards[1].id, `${tag}: tap a card, tap its rod → home`);
        await drag(page, `.tr-basket .tr-card[data-card="${r.cards[2].id}"]`, `.tr-mini[data-rod="${r.cards[2].rod}"]`);
        const w = await won(page, () => drag(page, `.tr-basket .tr-card[data-card="${c0.id}"]`, `.tr-mini[data-rod="${c0.rod}"]`));
        is(w.c && (await st(page)).done, `${tag}: three cards home, the shelf celebrates`);
      } else {
        await tap(page, '.tr-card.is-base'); s = await st(page);
        is(s.misses === 0 && sp(await note(page)).startsWith(head(T(loc, 'hNoClip'))), `${tag}: a push with no clip is no miss`);
        const wi = r.clips.findIndex(c => c.idx !== r.right), ri = r.clips.findIndex(c => c.idx === r.right);
        await drag(page, `.tr-clipcard[data-clip="${wi}"]`, '.tr-rodbox'); s = await st(page);
        is(s.clip === wi, `${tag}: the wrong clip ${r.clips[wi].label} hangs on the far end`);
        await tap(page, '.tr-card.is-base'); await settle(page); s = await st(page);
        is(s.misses === 1 && !s.done && !(await page.evaluate(() => !!document.querySelector('.tr-card.is-fused'))), `${tag}: it rolls back, nothing built`);
        await tap(page, `.tr-clipcard[data-clip="${ri}"]`);
        const w = await won(page, () => tap(page, '.tr-card.is-base'));
        const fz = await page.evaluate(() => { const f = document.querySelector('.tr-card.is-fused'); return f ? f.textContent : ''; });
        is(w.c && fz === r.fused && w.b.includes(sp(r.fused)), `${tag}: ${r.clips[ri].label} closes → «${fz}»`);
      }
      await settle(page);
    }
    /* write mode */
    const sid = C.ids(loc, 'sentences')[0];
    await force(page, 'sentences', sid, { answer: 'write' });
    let s = await st(page);
    is(await page.evaluate(() => !!document.querySelector('.tr-input') && !document.querySelector('.tr-basket')), `${loc}: Write it — the write box, no basket`);
    const typeIn = async (text) => { await tap(page, '.tr-input'); await page.evaluate(() => { const i = document.querySelector('.tr-input'); i.value = ''; i.dispatchEvent(new Event('input')); }); await page.keyboard.type(text); await page.keyboard.press('Enter'); await settle(page); };
    await typeIn('qxzvq'); s = await st(page);
    is(s.misses === 0 && !s.done && sp(await note(page)).startsWith(head(T(loc, 'hSpell'))), `${loc}: nonsense typed shakes, no miss`);
    await typeIn(s.r.target.word); s = await st(page);
    is(s.misses === 1 && !s.done, `${loc}: the word itself typed → a miss`);
    const w = await won(page, () => typeIn(s.r.far.word.toLocaleUpperCase(loc)));
    is(w.c && (await st(page)).done, `${loc}: «${s.r.far.word.toLocaleUpperCase(loc)}» typed slides home`);
    /* words only */
    await force(page, 'pictures', 'pic.hot', { words: 'only' });
    is(await page.evaluate(() => !document.querySelector('.tr-wrap img') && document.querySelectorAll('.tr-card.is-wordonly').length >= 4), `${loc}: Words only — no pictures`);
    await force(page, 'pictures', 'pic.hot');
    is(await page.evaluate(() => document.querySelectorAll('.tr-wrap img').length >= 4), `${loc}: Pictures — the cards carry pictures`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  const LONG = { pictures: 'pic.full', same: null, pairs: null, sentences: null, prefixes: null };
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) {
      const ids = C.ids(loc, lv);
      const longest = LONG[lv] || ids.slice().sort((a, b) => JSON.stringify(C.round(loc, b, 0, 'L')).length - JSON.stringify(C.round(loc, a, 0, 'L')).length)[0];
      for (const phase of ['rest', 'miss', 'won']) {
        await force(page, lv, longest);
        await page.evaluate((phase) => {
          const A = window.OppositesRodActivity, K = window.OppositesRodCore, s = A.st, r = s.r;
          if (phase === 'miss') {
            if (s.kind === 'rod') { const c = r.cards.find(c => c.home === 'mid' || c.home === 'same'); if (c) K.drop(s, c.id); else K.drop(s, r.cards.find(c => c.home !== 'far').id); }
            if (s.kind === 'same') { K.place(s, r.cards[0].id, 'near'); K.place(s, r.cards[1].id, 'far'); }
            if (s.kind === 'pairs') { K.dropOn(s, r.cards[0].id, (r.cards[0].rod + 1) % 3); K.dropOn(s, r.cards[1].id, r.cards[1].rod); }
            if (s.kind === 'flip' || s.kind === 'meaning') { const k = r.clips.findIndex(c => c.idx !== r.right); K.hang(s, k); K.push(s); }
            if (s.kind === 'scene') K.flip(s, 0);
          }
          if (phase === 'won') {
            if (s.kind === 'rod') K.drop(s, r.far.id);
            if (s.kind === 'scene') [0, 1, 2].forEach(i => K.flip(s, i));
            if (s.kind === 'same') { r.cards.forEach(c => { if (c.home !== 'off') K.place(s, c.id, c.home === 'same' ? 'near' : 'far'); }); K.checkSame(s); }
            if (s.kind === 'pairs') r.cards.forEach(c => K.dropOn(s, c.id, c.rod));
            if (s.kind === 'flip' || s.kind === 'meaning') { K.hang(s, r.clips.findIndex(c => c.idx === r.right)); K.push(s); }
          }
          A._busy = false; A._view = phase === 'won' ? { slide: true } : {}; A._paint();
        }, phase);
        await wait(60);
        const tag = `@${w} ${loc} ${lv}/${longest} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.tr-wrap button, .tr-wrap input')].filter(vis);
          const txt = [...document.querySelectorAll('.tr-note,.tr-word,.tr-sentence,.tr-clipcard,.tr-input')].filter(e => (e.textContent.trim() || e.tagName === 'INPUT') && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.tr-wrap .tr-art')].filter(vis).map(i => Math.max(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
          const clip = [...document.querySelectorAll('.tr-word')].filter(vis).filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.textContent).slice(0, 2);
          const all = [...document.querySelectorAll('.tr-card,.tr-clipcard,.tr-rodbox,.tr-mini')].filter(vis).filter(e => { const b = e.getBoundingClientRect(); return b.right > app.right + 1 || b.left < app.left - 1; }).map(e => e.className).slice(0, 2);
          const low = ctl.length ? Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)) : 0;
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)).slice(0, 3),
            out: all, txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999, clip, fold: low, H: innerHeight
          };
        });
        const floor = w >= 700 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44, nothing off the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
        is(m.txt >= 14 && m.pic >= floor - .5 && !m.clip.length, `${tag}: text ≥ 14 (${m.txt}), pictures ≥ ${floor} (${Math.round(m.pic)}), no clipped words (${m.clip.join(' / ')})`);
        if (phase === 'rest') is(m.fold <= m.H + 1, `${tag}: the controls above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${lv}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-opposites-rod: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
