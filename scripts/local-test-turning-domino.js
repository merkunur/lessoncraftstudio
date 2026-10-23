#!/usr/bin/env node
/* =====================================================================
   local-test-turning-domino.js — ACTIVITY #84, The Turning Domino ("Find
   the Missing Part", 1.OA.B.4), in a real browser with REAL clicks, keys
   and a drag (never a model call to make a move). For every locale:
     · 12 − ? = 7 (the tray half face down): Check with the dial untouched
       is a hint, no miss; the roof shows ? for the hidden half; 8 overflows
       the plate by 3 (hOver); 4 leaves 1 empty place (hGap); miss 2 numbers
       the 5 empty places (hCount); 5 is right: the domino is whole, the
       fact 12 − 5 = 7 is in the house, the roof shows 5; turning, breaking
       off, putting back (click, keyboard T, a real drag) write the other
       three facts — a repeated fact does not count twice; four facts →
       okFour, the house glows, a domino on the shelf;
     · ? − 5 = 8 (the lid): the plate shows ?, the roof apex too; 11 places
       leave 2 pips hanging (hLid {d}); miss 2 lays out all 13 pips without
       numbers (hCountLid); 13 lifts the lid;
     · Within 10, ? − 4 = 6: the dial stops at 10;
     · Fact house off: the round ends right after the half is found.
   And every round of both levels at rest, at miss 2, at the start of
   stage 2 and with the house full at 320–1366: every control above the
   fold at rest and after a miss, the success line in view when full, no
   sideways scroll, every control ≥ 44 px, every pip inside its half, the
   sockets and hanging pips inside the board.
   Usage: node scripts/local-test-turning-domino.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '084-turning-domino', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const C = require(path.join(MINI, 'turning-domino-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, TurningDominoCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'turning-domino-activity.js'), 'utf8') + '\n;this.__A = TurningDominoActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const sp = (s) => String(s).replace(/[   ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/turning-domino-activity.html?activity=numberbond.subtraction-unknown-addend.1-oa-b-4&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TurningDominoActivity && window.TurningDominoActivity.st && document.querySelector('.td-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.TurningDominoActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, idx, house) {
    await page.evaluate((level, idx, house) => { const a = window.TurningDominoActivity; a.api.settings.numbers = level; a.api.settings.house = house || 'on'; a._pool = null; a._shelf = []; a._ensurePool(); a._start(idx); a._render2(); window.scrollTo(0, 0); }, level, idx, house);
    await wait(30);
  }
  const st = (page) => page.evaluate(() => { const s = window.TurningDominoActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, dial: s.dial, stage: s.stage, facts: s.facts.length, removed: s.removed, hidden: s.hidden }; });
  const note = (page) => page.evaluate(() => document.querySelector('.td-note').textContent);
  const eq = (page) => page.evaluate(() => document.querySelector('.td-eq').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const roof = (page) => page.evaluate(() => [...document.querySelectorAll('.td-rn')].map(t => t.textContent).join(','));
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const dialTo = async (page, n, tag) => { let s = await st(page); let guard = 0; while (s.dial !== n && guard++ < 30) { await click(page, `[data-k="${s.dial == null || s.dial < n ? 'plus' : 'minus'}"]`, tag); s = await st(page); } };
  const go = (page, tag) => click(page, '[data-k="go"]', tag);

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- 12 − ? = 7 (w20 round 3): L 7 on the holder, R 5 face down in the tray ---- */
    let tag = `${loc} 12−?=7`;
    await force(page, 'w20', 3);
    is(sp(await eq(page)) === '12 − ? = 7', `${tag}: the strip opens as 12 − ? = 7 (${await eq(page)})`);
    is(await roof(page) === '12,7,?', `${tag}: the roof hides the missing part (${await roof(page)})`);
    is(await count(page, '.td-tray .td-half.is-down') === 1, `${tag}: the hidden half lies face down in the tray`);
    await go(page, tag); let s = await st(page);
    is(s.misses === 0 && s.last === 'empty' && sp(await note(page)) === sp(T(loc, 'hDial')), `${tag}: Check with the dial untouched is a hint, no miss`);
    await dialTo(page, 8, tag);
    is(await count(page, '.td-tray .td-ghost') === 8, `${tag}: 8 ghost rings on the face-down half`);
    await go(page, tag); s = await st(page);
    is(s.last === 'many' && s.misses === 1 && await count(page, '.td-over') === 3 && sp(await note(page)) === sp(T(loc, 'hOver', { whole: 12 })), `${tag}: 8 leaves 3 pips hanging off the plate, hOver`);
    is(s.hidden === 'right' && await count(page, '.td-tray .td-half.is-down') === 1, `${tag}: a miss keeps the half face down`);
    await dialTo(page, 4, tag);
    is((await note(page)) === '' && await count(page, '.td-over') === 0, `${tag}: a new dial move takes the help away`);
    await force(page, 'w20', 3); await dialTo(page, 4, tag);   /* a fresh round, so 4 is miss 1 */
    await go(page, tag); s = await st(page);
    is(s.last === 'few' && await count(page, '.td-sock.is-empty') === 1 && sp(await note(page)) === sp(T(loc, 'hGap', { whole: 12 })), `${tag}: 4 leaves one empty place, hGap`);
    await go(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hCount')) && await count(page, '.td-snum') === 5, `${tag}: miss 2 numbers the 5 empty places, hCount`);
    await dialTo(page, 5, tag); await go(page, tag); s = await st(page);
    is(s.stage === 2 && s.removed === null && s.hidden === null && s.facts === 1, `${tag}: 5 is right: the domino is whole, one fact in the house`);
    is(sp(await eq(page)) === '7 + 5 = 12' && await roof(page) === '12,7,5', `${tag}: the strip reads 7 + 5 = 12, the roof shows 5`);
    const wins = () => page.evaluate(() => [...document.querySelectorAll('.td-win.is-on')].map(w => w.textContent.replace(/[  ]/g, ' ')).join('|'));
    is((await wins()) === '12 − 5 = 7', `${tag}: the solved equation stamps its window (${await wins()})`);
    is(sp(await note(page)).indexOf(sp(T(loc, 'okPart', { a: 7, b: 5, whole: 12 }))) === 0 && sp(await note(page)).indexOf(sp(T(loc, 'hStage2'))) > 0, `${tag}: okPart + the stage-2 hint`);
    is(await count(page, '.td-ctrl[hidden]') === 1, `${tag}: the dial leaves after stage 1`);
    await click(page, '[data-k="turn"]', tag); s = await st(page);
    is(sp(await eq(page)) === '5 + 7 = 12' && s.facts === 2, `${tag}: turning swaps the addition (${await eq(page)})`);
    await click(page, '[data-k="half-left"]', tag); s = await st(page);
    is(sp(await eq(page)) === '12 − 5 = 7' && s.removed === 'left' && s.facts === 2, `${tag}: breaking the 5 off is 12 − 5 = 7 again — not counted twice`);
    is(sp(await note(page)).indexOf(sp(T(loc, 'hBack'))) >= 0, `${tag}: the note says how to put it back`);
    is(await count(page, '[data-k="turn"]:disabled') === 1, `${tag}: no turning with a half off`);
    await click(page, '.td-tray [data-k="half-left"]', tag); s = await st(page);
    is(s.removed === null && sp(await eq(page)) === '5 + 7 = 12', `${tag}: tapping the tray half puts it back`);
    /* a real drag breaks the right half (the 7) off */
    const b = await centre(page, '[data-k="half-right"]');
    await page.mouse.move(b.x, b.y); await page.mouse.down(); for (let k = 1; k <= 6; k++) await page.mouse.move(b.x, b.y + k * 10); await page.mouse.up(); await wait(40);
    s = await st(page);
    is(s.removed === 'right' && sp(await eq(page)) === '12 − 7 = 5' && s.facts === 3, `${tag}: a real drag breaks the 7 off: 12 − 7 = 5 (${await eq(page)})`);
    await page.focus('.td-wrap'); await page.keyboard.press('b'); await page.keyboard.press('t'); await wait(30); s = await st(page);
    is(s.done && s.facts === 4 && sp(await note(page)) === sp(T(loc, 'okFour', { a: 7, b: 5, w: 12 })), `${tag}: B puts back, T turns: the fourth fact, okFour`);
    is(await count(page, '.td-house.is-full') === 1 && await count(page, '.td-mini') === 1, `${tag}: the house glows, a domino on the shelf`);
    is(await page.evaluate(() => [...document.querySelectorAll('.td-half,.td-turn')].every(e => e.disabled)), `${tag}: the domino locks when the house is full`);

    /* ---- ? − 5 = 8 (w20 round 4): the lid ---- */
    tag = `${loc} ?−5=8`;
    await force(page, 'w20', 4);
    is(await count(page, '.td-plate.is-lid') === 1 && (await page.evaluate(() => document.querySelector('.td-plate').textContent)) === '?' && await roof(page) === '?,8,5', `${tag}: the plate and the roof apex hide the whole`);
    await go(page, tag); is(sp(await note(page)) === sp(T(loc, 'hDialLid')), `${tag}: hDialLid`);
    await click(page, '[data-k="plus"]', tag); s = await st(page);
    is(s.dial === 2, `${tag}: the plate dial starts at 2`);
    await page.focus('.td-wrap'); for (let k = 0; k < 9; k++) await page.keyboard.press('ArrowUp'); await wait(20); s = await st(page);
    is(s.dial === 11 && await count(page, '.td-sock.is-faint') === 11, `${tag}: ↑ sets 11 faint places on the plate`);
    await go(page, tag); s = await st(page);
    is(s.last === 'lid' && await count(page, '.td-socks .td-sp') === 11 && await count(page, '.td-over') === 2 && sp(await note(page)) === sp(T(loc, 'hLid', { d: 11 })), `${tag}: 11 places, 2 pips hanging, hLid`);
    await go(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hCountLid')) && await count(page, '.td-socks .td-sp') === 13 && await count(page, '.td-snum') === 0, `${tag}: miss 2 lays out all 13 pips, unnumbered`);
    await dialTo(page, 13, tag); await page.keyboard.press('Enter'); await wait(30); s = await st(page);
    is(s.stage === 2 && (await page.evaluate(() => document.querySelector('.td-plate').textContent)) === '13' && sp(await eq(page)) === '8 + 5 = 13', `${tag}: Enter checks: 13 lifts the lid`);

    /* ---- Within 10: ? − 4 = 6 — the dial stops at 10 ---- */
    tag = `${loc} w10 ?−4=6`;
    await force(page, 'w10', 4);
    await dialTo(page, 10, tag);
    is(await count(page, '[data-k="plus"]:disabled') === 1, `${tag}: the plate dial stops at 10`);
    /* ---- the house off ---- */
    tag = `${loc} house off`;
    await force(page, 'w20', 0, 'off');
    is(await count(page, '.td-house[hidden]') === 1, `${tag}: no house`);
    await dialTo(page, 5, tag); await go(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okPart', { a: 3, b: 5, whole: 8 })), `${tag}: the round ends with the half found`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round of every level at rest, at miss 2, at stage 2 and full, 320–1366 ---- */
  for (const loc of LOCS) for (const w of WIDTHS) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) for (const idx of C.ids(lv)) for (const state of ['rest', 'miss2', 'stage2', 'full']) {
      const tag = `${loc} @${w} ${lv}.${idx} ${state}`, r = C.round(lv, idx);
      await force(page, lv, idx);
      if (state !== 'rest') {
        if (state === 'miss2') { await dialTo(page, r.answer === r.dialMax ? r.answer - 1 : r.answer + 1, tag); await go(page, tag); await go(page, tag); }
        else {
          await dialTo(page, r.answer, tag); await go(page, tag);
          if (state === 'full') for (const sel of ['[data-k="turn"]', '[data-k="half-left"]', '.td-tray .td-half', '[data-k="half-right"]', '.td-tray .td-half', '[data-k="turn"]']) { if ((await st(page)).done) break; await click(page, sel, tag); }   /* the house can close a move early (an addition stance): stop handling then */
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        if (state === 'full') await page.evaluate(() => document.querySelector('.td-note').scrollIntoView({ block: 'nearest', behavior: 'instant' }));
      }
      await wait(20);
      const m = await page.evaluate(() => {
        const out = { fails: [] };
        const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.closest('[hidden]'); };
        out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const ctrls = [...document.querySelectorAll('.td-half,.td-turn,.td-dbtn,.td-go')].filter(vis);
        out.low = Math.max.apply(null, ctrls.map(e => e.getBoundingClientRect().bottom));
        const nr = document.querySelector('.td-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
        ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        document.querySelectorAll('.td-half').forEach(h => { const R = h.getBoundingClientRect(); h.querySelectorAll('.td-pip,.td-ghost').forEach(p => { const q = p.getBoundingClientRect(); if (q.left < R.left || q.right > R.right || q.top < R.top || q.bottom > R.bottom) out.fails.push('a pip outside its half'); }); });
        const B = document.querySelector('.td-board').getBoundingClientRect();
        document.querySelectorAll('.td-socks circle').forEach(c => { const q = c.getBoundingClientRect(); if (q.left < B.left - 1 || q.right > B.right + 1) out.fails.push('a socket outside the board'); });
        const wins = [...document.querySelectorAll('.td-win')]; wins.forEach(wn => { if (wn.scrollWidth > wn.clientWidth + 1) out.fails.push('a window\'s fact is cut off'); });
        return out;
      });
      is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
      if (state === 'rest' || state === 'miss2' || state === 'stage2') is(m.low <= VH(w), `${tag}: every control above the fold (${Math.round(m.low)} ≤ ${VH(w)})`);
      if (state === 'full') { is((await st(page)).done, `${tag}: four facts by real clicks`); is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`); }
      is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
      if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 3 || idx === 4)) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${idx}-${w}-${state}.png`), fullPage: true });
    }
    is(errs.length === 0, `${loc} @${w}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-turning-domino: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
