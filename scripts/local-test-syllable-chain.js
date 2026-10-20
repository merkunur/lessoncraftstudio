#!/usr/bin/env node
/* =====================================================================
   local-test-syllable-chain.js — the interaction gate for ACTIVITY #49,
   La catena delle sillabe (RF.K.2.B, it). Real pointer, every round of
   every level:
     short / long — the start link and an open clasp showing its last
       syllable; Controlla untouched asks (no miss); the trick picture
       tapped twice → it will not close, the two half-rings show their
       syllables (miss); a plain card hooked through the open clasp →
       miss 2, every card shows its first syllable; the answer DRAGGED
       onto the clasp → it closes, engraved; the next steps by tap-tap; a
       long chain's last link tapped → it unhooks; done → the joints on the
       festone;
     build — one socket; + to one short → the last socket crammed (miss);
       two too many → empty sockets, the beats at miss 2; − to the count →
       Conta → tiles; a wrong order → the right sockets lock, the rest
       return; the right order → the word, on the festone.
   Also: the settings, the keyboard, and the width sweep (no sideways
   scroll, controls ≥ 44 px inside the card, links never overlapping,
   text ≥ 14 px, pictures ≥ 64 px / ≥ 96 px from 704, every control above
   the fold) at rest, miss and done.
   Usage: node scripts/local-test-syllable-chain.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.forma-la-parola-con-le-sillabe.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'syllable-chain-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, SyllableChainCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'syllable-chain-activity.js'), 'utf8') + '\n;this.__A = SyllableChainActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].it; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
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
    await page.goto(`${base}/syllable-chain-activity.html?activity=${ID}&lang=it&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SyllableChainActivity && window.SyllableChainActivity.st && document.querySelector('.scn-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.SyllableChainActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.SyllableChainActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, level: s.r.level, chain: s.chain, step: s.step, basket: s.basket, phase: s.phase, sockets: s.sockets, tiles: s.tiles, filled: s.filled, locked: s.locked, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.scn-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(60); }
  const K = (k) => `.scn-card[data-id="${k}"]`;
  async function drag(page, sel, to) {
    await ctr(page, '.scn-stage');
    const a = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10);
    await page.mouse.up(); await wait(100);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.SyllableChainActivity; a.FAST = true; Object.assign(a.api.settings, { lure: 'yes', labels: 'after' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(150);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const settle = (page) => page.waitForFunction(() => !window.SyllableChainActivity._busy || window.SyllableChainActivity.st.done, { timeout: 8000 }).then(() => wait(60));
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.SyllableChainActivity.OK_MS = 0; }); };
  const F = (k) => C.word(k).syl[0], Lst = (k) => { const s = C.word(k).syl; return s[s.length - 1]; };

  console.log('— it');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  /* the chains */
  for (const lv of ['short', 'long']) for (const r of C.rounds(lv)) {
    await okRun(page); await force(page, lv, r.id);
    let s = await state(page); const s0 = r.steps[0];
    is(s.chain.join() === r.start && (await page.evaluate(() => document.querySelector('.scn-open span').textContent)) === s0.syl && (await page.evaluate(() => document.querySelectorAll('.scn-card').length)) === 3 && (await page.evaluate((w) => document.querySelector('.scn-link .scn-lw').textContent, r.start)) === C.word(r.start).syl.join('·'), `${r.id}: the start link written ${C.word(r.start).syl.join('·')}, the open clasp shows "${s0.syl}"`);
    await tap(page, '.scn-check'); s = await state(page); is(s.misses === 0 && (await note(page)) === T('hintFind', { syl: s0.syl }), `${r.id}: Controlla untouched asks`);
    const wrong = s.basket.filter(k => k !== s0.answer), lure = wrong.find(k => Lst(k) === s0.syl), plain = wrong.find(k => k !== lure);
    if (lure) {
      await tap(page, K(lure)); is((await state(page)).chain.length === 1 && (await page.evaluate((k) => document.querySelector(`.scn-card[data-id="${k}"]`).classList.contains('is-sel'), lure)), `${r.id}: a first tap lifts the card (no hook)`);
      await tap(page, K(lure)); s = await state(page);
      is(s.misses === 1 && s.chain.length === 1 && s.last.result === 'lure' && (await note(page)) === T('hintLure', { word: lure, syl: s0.syl }), `${r.id}: the trick picture ${lure} will not close (miss)`);
    } else {
      await tap(page, K(wrong[1])); await tap(page, K(wrong[1])); s = await state(page);
      is(s.misses === 1 && s.last.result === 'wrong' && (await note(page)) === T('hintWrong', { word: wrong[1], first: F(wrong[1]), syl: s0.syl }), `${r.id}: ${wrong[1]} will not close (miss)`);
    }
    await settle(page);
    await tap(page, K(plain)); await tap(page, '.scn-open'); s = await state(page);
    is(s.help === 2 && (await page.evaluate(() => [...document.querySelectorAll('.scn-card .scn-tag')].map(e => e.textContent).join())) === s.basket.map(F).join() && (await note(page)) === T('hintSlow', { prev: r.start, syl: s0.syl }), `${r.id}: miss 2 — every card shows its first syllable`);
    await settle(page);
    await drag(page, K(s0.answer), '.scn-open'); s = await state(page);
    is(s.chain.join() === [r.start, s0.answer].join() && s.misses === 0 && (await page.evaluate(() => [...document.querySelectorAll('.scn-clasp span')].map(e => e.textContent).join())) === s0.syl, `${r.id}: ${s0.answer} dragged onto the clasp — it closes, engraved "${s0.syl}"`);
    for (let k = 1; k < r.steps.length; k++) {
      if (k === 2) { await tap(page, `.scn-link[data-id="${r.steps[1].answer}"]`); s = await state(page); is(s.chain.length === 2 && s.step === 1, `${r.id}: the last link tapped — it unhooks`); await tap(page, K(r.steps[1].answer)); await tap(page, K(r.steps[1].answer)); }
      if (k === 2) is((await state(page)).chain.length === 3, `${r.id}: hooked again`);
      await tap(page, K(r.steps[k].answer)); await tap(page, K(r.steps[k].answer));
    }
    s = await state(page);
    is(s.done && s.chain.length === r.steps.length + 1, `${r.id}: the chain is closed`);
    is((await page.evaluate(() => [...document.querySelectorAll('.scn-garl')].pop().textContent)) === r.steps.map(x => x.syl).join(''), `${r.id}: the joints on the festone`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* Conta e forma */
  for (const r of C.rounds('build')) {
    await okRun(page); await force(page, 'build', r.id);
    let s = await state(page); const n = r.w.syl.length;
    is(s.phase === 'count' && s.sockets === 1 && (await page.evaluate(() => document.querySelectorAll('.scn-sock').length)) === 1 && (await page.evaluate(() => document.querySelector('.scn-check').textContent)) === T('count'), `${r.id}: one socket, the button says Conta`);
    for (let i = 1; i < n - 1; i++) await tap(page, '.scn-more');
    await tap(page, '.scn-check'); s = await state(page);
    is(s.last.result === 'short' && (await page.evaluate(() => document.querySelectorAll('.scn-sock.is-crammed').length)) === 1 && (await page.evaluate(() => document.querySelector('.scn-sock.is-crammed').textContent)) === r.w.syl.slice(n - 2).join('·') && (await note(page)) === T('hintShort'), `${r.id}: one socket short — the last crammed`);
    if (n < 5) {
      await tap(page, '.scn-more'); await tap(page, '.scn-more'); await tap(page, '.scn-check'); s = await state(page);
      is(s.last.result === 'long' && (await page.evaluate(() => document.querySelectorAll('.scn-sock.is-pop').length)) === 1 && (await note(page)) === T('hintClap') && (await page.evaluate(() => document.querySelectorAll('.scn-sock.is-beat').length)) === n + 1, `${r.id}: one too many — an empty socket, the beats at miss 2`);
      await tap(page, '.scn-less');
    } else {
      /* five syllables: the link holds at most five sockets, so "too many" cannot happen — miss 2 comes from a second short count */
      is((await page.evaluate(() => document.querySelector('.scn-more').disabled)) === false, `${r.id}: + still works below five`);
      await tap(page, '.scn-less'); await tap(page, '.scn-check'); s = await state(page);
      is(s.last.result === 'short' && s.help === 2 && (await note(page)) === T('hintClap') && (await page.evaluate(() => document.querySelectorAll('.scn-sock.is-beat').length)) === 3, `${r.id}: short again — the beats at miss 2`);
      await tap(page, '.scn-more'); await tap(page, '.scn-more');
      is((await page.evaluate(() => document.querySelector('.scn-more').disabled)) === true, `${r.id}: + stops at five`);
    }
    await tap(page, '.scn-check'); s = await state(page);
    is(s.phase === 'build' && (await page.evaluate(() => document.querySelectorAll('.scn-tile').length)) === n && (await page.evaluate(() => document.querySelector('.scn-check').textContent)) === T('check'), `${r.id}: the count is right — ${n} tiles, the button says Controlla`);
    const id = (q) => 't' + q;
    await tap(page, `.scn-tile[data-id="${id(1)}"]`); await tap(page, `.scn-tile[data-id="${id(0)}"]`);
    await tap(page, '.scn-check'); s = await state(page);
    is(s.misses === 1 && !s.locked.length && s.filled.every(x => x === null) && (await note(page)) === T('hintGlow'), `${r.id}: a wrong order — the tiles return`);
    for (let q = 0; q < n; q++) await tap(page, `.scn-tile[data-id="${id(q)}"]`);
    await tap(page, '.scn-check'); s = await state(page);
    is(s.done && (await page.evaluate(() => (document.querySelector('.scn-bigword') || {}).textContent)) === r.w.word, `${r.id}: right — the word`);
    is((await page.evaluate(() => [...document.querySelectorAll('.scn-garl')].pop().textContent)) === r.w.word && await celebrated(page), `${r.id}: on the festone, celebrates`);
  }
  /* a right tile locks; a filled socket tapped gives its tile back */
  await force(page, 'build', 'build-arcobaleno');
  await page.evaluate(() => { const A = window.SyllableChainActivity, C2 = window.SyllableChainCore; C2.setSockets(A.st, 5); C2.countCheck(A.st); A._paint(); });
  await tap(page, '.scn-tile[data-id="t0"]'); await tap(page, '.scn-tile[data-id="t2"]');
  await tap(page, '.scn-sock[data-id="k1"]'); let s = await state(page); is(s.filled[1] === null, 'a filled socket tapped gives its tile back');
  await tap(page, '.scn-check'); s = await state(page); is(s.locked.join() === '0' && (await page.evaluate(() => document.querySelector('.scn-sock[data-id="k0"]').classList.contains('is-locked'))) && (await note(page)) === T('hintMore'), 'a right tile locks and glows');
  /* settings */
  await page.evaluate(() => { window.SyllableChainActivity.OK_MS = 60000; });
  await force(page, 'short', 'short-palla-0', { lure: 'no' }); s = await state(page);
  is(!s.basket.some(k => Lst(k) === 'la' && F(k) !== 'la'), `Trabocchetto: No — no card ends with "la" (${s.basket})`);
  await force(page, 'short', 'short-palla-0', { lure: 'yes' }); s = await state(page); is(s.basket.includes('scala'), 'Trabocchetto: Sì — the trick picture is in the basket');
  await force(page, 'short', 'short-palla-0', { labels: 'always' });
  is((await page.evaluate(() => document.querySelectorAll('.scn-card .scn-cw').length)) === 3, 'Sillabe sulle immagini: Sempre — every card shows its word');
  await force(page, 'short', 'short-palla-0', { labels: 'after' }); is((await page.evaluate(() => document.querySelectorAll('.scn-card .scn-cw').length)) === 0, 'Dopo l\'aggancio — the cards show no words');
  /* keyboard */
  await force(page, 'long', 'long-ape-0');
  await page.focus('.scn-card'); await page.keyboard.press('ArrowRight'); const fk = await page.evaluate(() => document.activeElement.dataset.id);
  is(!!fk && fk === (await state(page)).basket[1], 'ArrowRight moves to the next card');
  await page.evaluate(() => { const b = window.SyllableChainActivity.st.basket, ans = window.SyllableChainActivity.st.r.steps[0].answer; document.querySelector(`.scn-card[data-id="${ans}"]`).focus(); });
  await page.keyboard.press('Enter'); await page.keyboard.press('Enter'); s = await state(page); is(s.chain.length === 2, 'Enter, Enter hooks the focused card');
  await page.focus('.scn-wrap'); await page.keyboard.press('Backspace'); is((await state(page)).chain.length === 1, 'Backspace unhooks the last link');
  await force(page, 'build', 'build-cane'); await page.focus('.scn-wrap'); await page.keyboard.press('+'); is((await state(page)).sockets === 2, '+ adds a socket');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.SyllableChainActivity.OK_MS = 60000; });
    const cases = C.rounds('short').map(r => ['short', r.id, null]).concat(C.rounds('long').map(r => ['long', r.id, null]), C.rounds('long').slice(0, 3).map(r => ['long', r.id, { labels: 'always' }]), C.rounds('build').map(r => ['build', r.id, null]));
    for (const [lv, id, set] of cases) {
      await force(o.page, lv, id, set);
      const tag = `@${w} ${id}${set ? ' always' : ''}`;
      for (const phase of ['rest', 'miss', 'done']) {
        if (phase === 'miss') await o.page.evaluate(() => {
          const A = window.SyllableChainActivity, C2 = window.SyllableChainCore, st = A.st, r = st.r;
          if (r.level === 'build') { C2.setSockets(st, r.w.syl.length + 1); C2.countCheck(st); C2.setSockets(st, r.w.syl.length > 2 ? r.w.syl.length - 1 : 1); C2.countCheck(st); }
          else { for (let q = 0; q < r.steps.length - 1; q++) C2.hook(st, r.steps[q].answer); const wr = st.basket.filter(k => k !== r.steps[st.step].answer); C2.hook(st, wr[0]); C2.hook(st, wr[1]); }
          A._clash = null; A._busy = false; A._paint();
        });
        if (phase === 'done') await o.page.evaluate(() => {
          const A = window.SyllableChainActivity, C2 = window.SyllableChainCore, st = A.st, r = st.r;
          if (st.done) return;
          if (r.level === 'build') { if (st.phase === 'count') { C2.setSockets(st, r.w.syl.length); C2.countCheck(st); } st.filled = st.filled.map(() => null); st.locked = []; r.w.syl.forEach((_, q) => C2.fill(st, 't' + q, q)); A._check(); }
          else { while (!st.done) A._hook(r.steps[st.step].answer); }
        });
        await o.page.waitForFunction(() => !window.SyllableChainActivity._busy || window.SyllableChainActivity.st.done, { timeout: 8000 }).catch(() => {});
        await wait(phase === 'done' ? 200 : 60);
        if (phase === 'miss') { const s = await state(o.page); if (s.done || !s.misses) throw new Error('miss phase did not land on a miss: ' + id); }
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const links = [...document.querySelectorAll('.scn-link')].filter(vis);
          const ctl = links.concat([...document.querySelectorAll('.scn-card,.scn-open,.scn-check:not([hidden]),.scn-knob,.scn-tile,.scn-sock.is-fill,.scn-bigpic')].filter(vis));
          const pics = [...document.querySelectorAll('.scn-link img,.scn-card img,.scn-bigpic img')].filter(vis).map(e => e.getBoundingClientRect().width);
          let hit = 0; for (let i = 0; i < links.length; i++) for (let j = i + 1; j < links.length; j++) { const a = links[i].getBoundingClientRect(), b = links[j].getBoundingClientRect(); if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) hit++; }
          const txt = [...document.querySelectorAll('.scn-lw,.scn-clasp span,.scn-open span,.scn-tag,.scn-sock,.scn-tile,.scn-cw,.scn-bigword,.scn-garl b')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 - 0.5 || b.height < 44 - 0.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            hit, txt: txt.length ? Math.min(...txt) : 99,
            pic: pics.length ? Math.min(...pics) : 999, low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.pic >= minPic - 0.5, `${tag} ${phase}: no sideways scroll, controls ≥ 44 inside the card, pictures ≥ ${minPic} (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, pic ${Math.round(m.pic)})`);
        is(m.hit === 0 && m.txt >= 14, `${tag} ${phase}: no two links overlap, text ≥ 14 px (hit ${m.hit}, txt ${m.txt})`);
        is(m.low <= m.H, `${tag} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['short-palla-0', 'long-stella-7', 'build-arcobaleno'].includes(id) && !set) await o.page.screenshot({ path: path.join(SHOT, `it-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors (${o.errs.slice(0, 2).join(' | ')})`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-syllable-chain: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
