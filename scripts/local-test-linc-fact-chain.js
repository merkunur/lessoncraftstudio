#!/usr/bin/env node
/* =====================================================================
   local-test-linc-fact-chain.js — the interaction gate for ACTIVITY #71,
   The Domino Track (Linc's Fact Chain, RI.K.3, 11 locales). Real pointer
   at 704, every round of every level of every locale:
     an empty Check → no miss, the hint; a LURE DRAGGED into the gap (the
     order / same-word / direction lure; in chains the story lure first and
     the third card second) and checked → miss 1, the read-together hint,
     the wrong cards back in the tray; the other lure TAPPED in → miss 2,
     the link word written in the gap; the right card(s) DRAGGED in → the
     shell celebrates with the authored joined sentence. Once per locale
     with real timing: the struck domino stays standing while the one
     before it LEANS against it (never through it), and the rail shows the
     two facts with the broken link; a full chain rests leaning, the last
     domino on the bell. Settings: Fewer → one card less, the teaching lure
     kept; each level shows its tab.
   The width sweep (all locales at 320 / 704 / 1366, en at 320–1366), each
   level at rest, missed and won: no sideways scroll, controls ≥ 44 inside
   the card, text ≥ 14, Linc at his floor, no clipped words, Check above
   the fold.
   Usage: node scripts/local-test-linc-fact-chain.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'linc-fact-chain.connect.ri-k-3';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '071-domino-track', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'linc-fact-chain-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, LincFactChainCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'linc-fact-chain-activity.js'), 'utf8') + '\n;this.__A = LincFactChainActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); const file = p.startsWith('/image-library-webp/') ? path.join(IMG, p.slice(20)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'text/html'); res.end(b); }); }); }
/* the lure each level teaches with first */
const FIRST = { next: 'o', so: 's', because: 'x', chain: 'l1' }, SECOND = { next: 'u', so: 'x', because: 's', chain: 'l2' };
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
    await page.goto(`${base}/linc-fact-chain-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.LincFactChainActivity && window.LincFactChainActivity.st && document.querySelector('.lf-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.LincFactChainActivity; a.FAST = true; a.OK_MS = 60000; a.MISS_MS = 0; });
    return { page, errs };
  }
  async function force(page, level, id, choices) {
    await page.evaluate((level, id, choices) => { const a = window.LincFactChainActivity; a.api.settings.level = level; a.api.settings.choices = choices || 'more'; a._pool = null; const pool = a._ensurePool(), o = pool.map((x, i) => i), k = pool.indexOf(id); o.splice(k, 1); o.unshift(k); a._order = o; a._orderForPool = pool; window.LCS_reloadFirstTask(); }, level, id, choices);
    await wait(40);
  }
  const st = (page) => page.evaluate(() => { const s = window.LincFactChainActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, tray: s.tray, placed: s.placed, misses: s.misses, done: s.done })); });
  const note = (page) => page.evaluate(() => document.querySelector('.lf-note').textContent);
  const settle = (page) => page.waitForFunction(() => !window.LincFactChainActivity._busy, { timeout: 15000 }).catch(() => {});
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(60);
  }
  const won = async (page, fn) => { await page.evaluate(() => { window.LincFactChainActivity.OK_MS = 0; }); await fn(); const c = await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false); const b = await page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; }); await page.evaluate(() => { window.LincFactChainActivity.OK_MS = 60000; }); return { c, b }; };

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    const { page, errs } = await open(704, loc);
    for (const lv of C.LEVELS) for (const id of C.ids(lv)) {
      await force(page, lv, id);
      const r = C.round(loc, lv, id), K = r.dir, tag = `${loc} ${lv}/${id}`;
      const tab = await page.evaluate(() => document.querySelector('.lf-tabtxt').textContent);
      is(sp(tab) === sp(T(loc, r.tab)), `${tag}: the tab «${tab}»`);
      await tap(page, '.lf-check'); let s = await st(page);
      is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check is no miss`);
      /* miss 1: the teaching lure dragged into the first gap (chains: the third card into the second gap too) */
      await drag(page, `.lf-card[data-card="${FIRST[K]}"]`, '.lf-gapslot[data-gap="0"]');
      if (r.gaps === 2) await drag(page, '.lf-card[data-card="c"]', '.lf-gapslot[data-gap="1"]');
      s = await st(page);
      is(s.placed[0] === FIRST[K] && (r.gaps === 1 || s.placed[1] === 'c'), `${tag}: the dragged cards stand in the gaps (${s.placed})`);
      await tap(page, '.lf-check'); await settle(page); s = await st(page);
      const h1 = T(loc, (r.links[0] === 'linkThen') ? 'hintMiss1Next' : 'hintMiss1So');
      is(s.misses === 1 && s.placed[0] === null && (r.gaps === 1 || s.placed[1] === 'c') && sp(await note(page)) === sp(h1), `${tag}: miss 1 — the wrong card back in the tray (a right third card stays), the read-together hint`);
      /* miss 2: the other lure tapped in */
      await tap(page, `.lf-card[data-card="${SECOND[K]}"]`);
      await tap(page, '.lf-check'); await settle(page); s = await st(page);
      const gw = await page.evaluate(() => [...document.querySelectorAll('.lf-gapword')].map(e => e.textContent));
      is(s.misses === 2 && gw.length >= 1 && sp(gw[0]) === sp(T(loc, r.links[0])) && sp(await note(page)).startsWith(sp(T(loc, 'hintMiss2').split('{link}')[0])), `${tag}: miss 2 — the link word in the gap («${gw[0]}»)`);
      /* the right card(s), dragged */
      for (let g = 0; g < r.gaps; g++) if (s.placed[g] !== r.answer[g]) await drag(page, `.lf-card[data-card="${r.answer[g]}"]`, `.lf-gapslot[data-gap="${g}"]`);
      const w = await won(page, () => tap(page, '.lf-check')); s = await st(page);
      is(s.done && w.c && sp(w.b).includes(sp(r.joined)) && sp(w.b).includes(sp(T(loc, 'okTail'))), `${tag}: the chain falls all the way — celebrates with «${r.joined.slice(0, 40)}…»`);
    }
    /* real timing: a miss leans, a win rests on the bell */
    await force(page, 'cause', 'sun');
    await page.evaluate(() => { const a = window.LincFactChainActivity; a.FAST = false; a.MISS_MS = 4000; });
    await tap(page, '.lf-card[data-card="s"]'); await tap(page, '.lf-check'); await wait(1300);
    const lean = await page.evaluate(() => { const d = [...document.querySelectorAll('.lf-domino')], a = d[0].getBoundingClientRect(), b = d[1].getBoundingClientRect(), rail = document.querySelector('.lf-rail'); return { overlap: a.right - b.left, rock: d[1].classList.contains('is-rock'), parts: [...rail.querySelectorAll('.lf-part')].map(e => e.textContent), broken: !!rail.querySelector('.lf-link.is-broken') }; });
    const rs = C.round(loc, 'cause', 'sun');
    is(lean.overlap <= 2 && lean.rock && lean.broken && lean.parts[0] === rs.places[0].fact && lean.parts[1] === rs.cards.s, `${loc}: the struck domino stays standing, the first leans on it (overlap ${lean.overlap.toFixed(1)}), the rail shows the broken link`);
    await page.evaluate(() => { const a = window.LincFactChainActivity; a._clearTimers(); a._busy = false; a.FAST = true; a.MISS_MS = 0; });
    /* settings: Fewer */
    await force(page, 'cause', 'icecream', 'fewer');
    const few = await st(page);
    is(few.tray.length === 2 && few.tray.includes('r') && few.tray.includes('x'), `${loc}: Fewer — two cards, the direction lure kept (${few.tray})`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) {
      const longest = C.ids(lv).slice().sort((a, b) => { const L = (id) => { const r = C.round(loc, lv, id); return Object.values(r.cards).join('').length + r.places.filter(p => p.fact).map(p => p.fact).join('').length; }; return L(b) - L(a); })[0];
      for (const phase of ['rest', 'miss', 'won']) {
        await force(page, lv, longest);
        await page.evaluate((phase) => {
          const A = window.LincFactChainActivity, K = window.LincFactChainCore, s = A.st, r = s.r;
          if (phase === 'miss') { const wrong = s.tray.filter(k => r.answer.indexOf(k) < 0); r.answer.forEach((k, g) => K.stand(s, g === 0 ? wrong[0] : k, g)); const res = K.check(s); A._view = { falls: { f: res.falls, broken: res.broken } }; }
          if (phase === 'won') { r.answer.forEach((k, g) => K.stand(s, k, g)); K.check(s); A._view = { msg: r.joined + ' ' + A._t('okTail'), joined: true, falls: { f: K.falls(r, s.placed), broken: -1 } }; }
          A._busy = false; A._paint();
        }, phase);
        await wait(50);
        const tag = `@${w} ${loc} ${lv}/${longest} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.lf-wrap button')].filter(vis);
          const txt = [...document.querySelectorAll('.lf-note,.lf-dtext,.lf-ctext,.lf-tabtxt,.lf-part,.lf-joined')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.lf-wrap img')].filter(vis).map(i => Math.max(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
          const chk = document.querySelector('.lf-check');
          const clip = [...document.querySelectorAll('.lf-dtext,.lf-ctext')].filter(vis).filter(e => e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.parentElement.clientHeight + 2).map(e => e.textContent).slice(0, 2);
          const outCard = [...document.querySelectorAll('.lf-domino')].filter(e => { const b = e.getBoundingClientRect(); return b.right > app.right + 1 || b.left < app.left - 1; }).length;
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)).slice(0, 3),
            out: ctl.filter(e => { if (e.classList.contains('lf-domino')) return false; const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            outCard, txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999, clip,
            fold: chk && !chk.hidden ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const floor = w >= 700 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length && !m.outCard, `${tag}: no sideways scroll, controls ≥ 44 inside the card, no domino off the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')}, dominoes out ${m.outCard})`);
        is(m.txt >= 14 && m.pic >= floor - .5 && !m.clip.length, `${tag}: text ≥ 14 (${m.txt}), Linc ≥ ${floor} (${Math.round(m.pic)}), no clipped words (${m.clip.join(' / ')})`);
        if (phase === 'rest') is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${lv}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-linc-fact-chain: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
