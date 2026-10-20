#!/usr/bin/env node
/* =====================================================================
   local-test-rhyme-chain.js — the interaction gate for ACTIVITY #42, the
   Rhyme Chain (RF.K.2.a). Real pointer, in every locale, every round of
   the pool: PICK/FINISH (a wrong picture DRAGGED to the chain falls back —
   one miss, the hint names both ends; a second miss shows every pattern;
   the rhyme tap-tapped onto the empty ring closes — done), JUDGE (the wrong
   button is a miss, the right one ends it), ODD (a rhyming picture marked
   is a miss, the odd one falls), SORT/FIELD/CHAIN (every right picture
   dragged to its chain, pulling early asks, the wagon then rolls), the
   shell's celebration. Settings (names, patterns) change the board; the
   keyboard (Enter hangs, Y/N judge). The width sweep: no sideways scroll,
   controls ≥ 44 px, cards ≥ 64 px, every control inside the card and above
   the fold. Library pictures served at their EXACT case.
   Usage: node scripts/local-test-rhyme-chain.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'rhyme-shop.rhyme.rf-k-2-a';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'rhyme-chain-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, RhymeChainCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'rhyme-chain-activity.js'), 'utf8') + '\n;this.__A = RhymeChainActivity;', ctx); return ctx.__A.strings; })();
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
  async function open(loc, w) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/rhyme-chain-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.RhymeChainActivity && window.RhymeChainActivity.st && document.querySelector('.rc-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.RhymeChainActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.RhymeChainActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, kind: s.r.kind, misses: s.misses, help: s.help, show: s.show, done: s.done, grass: s.grass, chains: s.chains, judge: s.judge, oddPick: s.oddPick, pair: s.pair || null })); });
  const note = (page) => page.evaluate(() => document.querySelector('.rc-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(80); }
  const card = (id) => `.rc-card[data-id="${id}"]`;
  async function drag(page, id, ci) {
    const a = await ctr(page, card(id)); if (!a) throw new Error('no card ' + id);
    const b = await page.evaluate((ci) => { const r = document.querySelector(`.rc-rig[data-ci="${ci}"] .rc-chain`).getBoundingClientRect(); return { x: r.left + Math.min(r.width / 2, 120), y: r.top + r.height / 2 }; }, ci);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8);
    await page.mouse.up(); await wait(90);
  }
  async function force(page, id) {
    await page.evaluate((id) => { const a = window.RhymeChainActivity; a._pool = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, id);
    await wait(200);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
  const cap = (loc, s) => s.charAt(0).toLocaleUpperCase(loc) + s.slice(1);

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);
    is((await page.evaluate(() => window.RhymeChainActivity.api.settings.names)) === (['sv', 'da', 'no', 'fi'].includes(loc) ? 'on' : 'off'), `${loc}: names start ${['sv', 'da', 'no', 'fi'].includes(loc) ? 'on' : 'off'}`);
    const pool = C.rounds(loc);
    for (const r of pool) {
      await page.evaluate(() => { window.RhymeChainActivity.OK_MS = 0; });
      await force(page, r.id);
      let s = await state(page);
      const pr = await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
      is(pr.length > 0 && !/\{\w+\}/.test(pr), `${loc} ${r.id}: prompt "${pr}"`);
      const anchorRime = s.chains[0] && s.chains[0].anchor ? s.chains[0].anchor.rime : null;
      if (r.kind === 'pick' || r.kind === 'finish') {
        is(!(await page.evaluate(() => { const b = document.querySelector('.rc-check'); return b && !b.hidden; })), `${loc} ${r.id}: no wagon button — the ring is the test`);
        const wrong = s.grass.filter(c => c.rime !== anchorRime), right = s.grass.find(c => c.rime === anchorRime);
        await drag(page, wrong[0].id, 0); s = await state(page);
        const w0 = s.grass.find(c => c.id === wrong[0].id);
        is(s.misses === 1 && !s.done && !!w0 && w0.revealed && (await note(page)) === T(loc, 'hintEnds', { a: s.chains[0].anchor.word, b: wrong[0].word }), `${loc} ${r.id}: a wrong picture dragged falls back — miss 1, "listen to the ends"`);
        await drag(page, wrong[1].id, 0); s = await state(page);
        is(s.help === 2 && (await page.evaluate(() => [...document.querySelectorAll('.rc-card .rc-ring')].every(x => x.classList.contains('is-pat')))), `${loc} ${r.id}: miss 2 — every candidate shows its pattern`);
        await tap(page, card(right.id)); is((await state(page)).done === false && (await page.evaluate(() => !!document.querySelector('.rc-card.is-sel'))), `${loc} ${r.id}: a tap selects (never commits)`);
        await tap(page, '.rc-slot'); s = await state(page);
        is(s.done && s.chains[0].links.length === 1 && s.chains[0].links[0].id === right.id, `${loc} ${r.id}: tap-tap hangs the rhyme — done`);
        if (r.kind === 'finish') is((await page.evaluate(() => document.querySelector('.rc-song').textContent)).includes(r.sung.slice(0, 12)), `${loc} ${r.id}: the song strip sings the whole line`);
      } else if (r.kind === 'judge') {
        const truth = s.pair[0].rime === s.pair[1].rime;
        await tap(page, '.rc-vbtn.' + (truth ? 'is-no' : 'is-yes')); s = await state(page);
        is(s.misses === 1 && !s.done, `${loc} ${r.id}: the wrong button is a miss`);
        await tap(page, '.rc-vbtn.' + (truth ? 'is-yes' : 'is-no')); s = await state(page);
        is(s.done, `${loc} ${r.id}: the right button — done`);
      } else if (r.kind === 'odd') {
        const links = s.chains[0].links, odd = links.find(c => links.filter(o => o.rime === c.rime).length === 1), other = links.find(c => c !== odd);
        await tap(page, '.rc-check'); is((await note(page)) === T(loc, 'hintOddEmpty'), `${loc} ${r.id}: pulling with nothing marked asks`);
        await tap(page, `.rc-link[data-id="${other.id}"]`); await tap(page, '.rc-check'); s = await state(page);
        is(s.misses === 1 && !s.done, `${loc} ${r.id}: a rhyming picture marked — miss`);
        await tap(page, `.rc-link[data-id="${odd.id}"]`); await tap(page, '.rc-check'); s = await state(page);
        is(s.done && (await page.evaluate((id) => document.querySelector(`.rc-link[data-id="${id}"]`).classList.contains('is-fallen'), odd.id)), `${loc} ${r.id}: the odd one falls — done`);
      } else {
        await tap(page, '.rc-check'); is((await state(page)).misses === 0 && (await note(page)) === T(loc, 'hintEmpty'), `${loc} ${r.id}: pulling an empty chain asks, no miss`);
        let guard = 0, early = false;
        while (!(await state(page)).done && guard++ < 12) {
          s = await state(page);
          const next = s.grass.find(c => s.chains.some(ch => ch.anchor.rime === c.rime));
          if (!next) { await tap(page, '.rc-check'); continue; }
          await drag(page, next.id, s.chains.findIndex(ch => ch.anchor.rime === next.rime));
          s = await state(page);
          if (!early && !s.done && s.grass.some(c => s.chains.some(ch => ch.anchor.rime === c.rime))) { early = true; await tap(page, '.rc-check'); is((await state(page)).misses === 0 && /\S/.test(await note(page)), `${loc} ${r.id}: pulling early asks for more, no miss`); }
        }
        s = await state(page);
        is(s.done && s.misses === 0, `${loc} ${r.id}: every rhyme dragged to its chain — the wagon rolls`);
        if (r.kind === 'sort') is(s.chains.every(ch => ch.links.every(c => c.rime === ch.anchor.rime)) && s.chains.reduce((n, ch) => n + ch.links.length, 0) === r.choices.length, `${loc} ${r.id}: every picture on its own chain`);
      }
      is(await celebrated(page), `${loc} ${r.id}: the shell celebrates`);
    }
    /* settings: names and patterns change the board */
    await page.evaluate(() => { window.RhymeChainActivity.OK_MS = 60000; });
    const pick = pool.find(x => x.kind === 'pick');
    await force(page, pick.id);
    for (const v of ['on', 'off']) { await page.evaluate((v) => { const a = window.RhymeChainActivity; a.api.settings.names = v; a.onSettings(); }, v); is((await page.evaluate(() => document.querySelectorAll('.rc-card .rc-name').length)) === (v === 'on' ? 3 : 0), `${loc}: names ${v}`); }
    for (const v of ['always', 'after']) { await page.evaluate((v) => { const a = window.RhymeChainActivity; a.api.settings.patterns = v; a.onSettings(); }, v); is((await page.evaluate(() => document.querySelectorAll('.rc-card .rc-ring.is-pat').length)) === (v === 'always' ? 3 : 0), `${loc}: patterns ${v}`); }
    /* keyboard: Enter hangs the focused picture; Y/N answer a judge */
    await force(page, pick.id);
    let s = await state(page); const right = s.grass.find(c => c.rime === s.chains[0].anchor.rime);
    await page.focus(card(right.id)); await page.keyboard.press('Enter'); is((await state(page)).done, `${loc}: Enter hangs the focused picture`);
    const jd = pool.find(x => x.kind === 'judge'); await force(page, jd.id); s = await state(page);
    await page.focus('.rc-vbtn'); await page.keyboard.press(s.pair[0].rime === s.pair[1].rime ? 'y' : 'n'); is((await state(page)).done, `${loc}: Y/N answer the judge`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  /* the width sweep */
  const sweepLocales = LOCALES.length > 2 ? ['fi', 'pt', 'de'] : LOCALES;
  for (const loc of sweepLocales) for (const w of WIDTHS) {
    const { page, errs } = await open(loc, w);
    await page.evaluate(() => { window.RhymeChainActivity.OK_MS = 60000; });
    for (const r of C.rounds(loc)) {
      await force(page, r.id);
      const m = await page.evaluate(() => {
        const app = document.querySelector('.lcs-app').getBoundingClientRect(), H = innerHeight, de = document.documentElement;
        const ctl = [...document.querySelectorAll('.rc-check:not([hidden]),.rc-card,.rc-vbtn,.rc-slot,.rc-wrap button.rc-link')];
        return {
          side: de.scrollWidth - de.clientWidth,
          small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 || b.height < 44; }).length,
          tags: Math.min(...[...document.querySelectorAll('.rc-tag')].map(e => e.getBoundingClientRect().width)),
          out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
          low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H
        };
      });
      is(m.side <= 0 && m.small === 0 && m.out === 0 && m.tags >= 64, `${loc} @${w} ${r.id}: no sideways scroll, controls ≥ 44 inside the card, pictures ≥ 64 (side ${m.side}, small ${m.small}, out ${m.out}, tag ${m.tags})`);
      is(m.low <= m.H, `${loc} @${w} ${r.id}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
      if (SHOT && (w === 360 || w === 704 || w === 1024) && loc === sweepLocales[0]) await page.screenshot({ path: path.join(SHOT, `${loc}-${w}-${r.id}.png`), fullPage: true });
    }
    is(errs.length === 0, `${loc} @${w}: no console errors`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-rhyme-chain: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
