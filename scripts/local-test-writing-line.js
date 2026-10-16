#!/usr/bin/env node
/* =====================================================================
   local-test-writing-line.js — the interaction gate for ACTIVITY #5, "Digby's
   Number Trace" (K.CC.A.3), the Fading Line. Real pointer DRAGS along each
   glyph (and backwards, mirrored, half-way, scribbled), every digit, every
   locale asked for, the three guides, both line settings, the width sweep,
   the resize broadcast. Usage: node scripts/local-test-writing-line.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'digby-number-trace.numeral-formation.k-cc-a-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'writing-line-activity.js')).strings;
const CORE = require(path.join(MINI, 'writing-line-core.js'));
const { ST } = CORE.deps();
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.endsWith('.html')) file = path.join(MINI, path.basename(p));
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice(12));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice(20));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  async function open(loc, w, tall) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() === 404 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push('404 ' + r.url()); });
    await page.setViewport({ width: w, height: tall ? 1500 : (w <= 420 ? 740 : 900) });
    await page.goto(`${base}/writing-line-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.WritingLineActivity && window.WritingLineActivity.st && document.querySelectorAll('.wl-box').length === 3, { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.WritingLineActivity.st; return { digit: s.digit, guide: s.guide, at: s.at, done: s.done, strokes: s.strokes.length, cells: s.cells.map(c => ({ level: c.level, shown: c.shown, formed: c.formed, ink: c.ink.length, live: c.live.length, fails: c.fails, idx: c.trace.idx })) }; });
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return { text: b.textContent, cls: b.className }; });
  const promptText = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.wl-note'); return { text: n.textContent, slip: n.classList.contains('is-slip'), done: n.classList.contains('is-done') }; });
  const boxInfo = (page) => page.evaluate(() => [...document.querySelectorAll('.wl-box')].map(b => { const r = b.getBoundingClientRect(); const sv = b.firstChild; return { shown: b.style.display !== 'none', w: r.width, h: r.height, active: b.classList.contains('is-active'), done: b.classList.contains('is-done'), roads: sv.querySelectorAll('.wl-road').length, hairs: sv.querySelectorAll('.wl-hair').length, faded: sv.querySelectorAll('.wl-hair.is-faded').length, inks: sv.querySelectorAll('.wl-ink:not(.wl-ink-live)').length, start: !!sv.querySelector('.wl-start'), mid: !!sv.querySelector('.wl-rule-mid'), pips: sv.querySelectorAll('.wl-pip').length, label: b.getAttribute('aria-label') }; }));
  /* a finger drag through glyph-box points on box b: pixels from the svg's bounding box */
  async function drag(page, b, pts) {
    const r = await page.evaluate((b) => { const sv = document.querySelectorAll('.wl-box')[b].firstChild; sv.scrollIntoView({ block: 'center' }); const q = sv.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; }, b);
    const px = (p) => ({ x: r.x + p.x / 100 * r.w, y: r.y + p.y / 100 * r.h });
    const p0 = px(pts[0]);
    await page.mouse.move(p0.x, p0.y); await page.mouse.down();
    for (let i = 1; i < pts.length; i++) { const p = px(pts[i]); await page.mouse.move(p.x, p.y, { steps: 2 }); }
    await page.mouse.up(); await wait(40);
  }
  const ideal = (strokes, i) => ST.flatten(strokes[i], 1.2);
  async function writeBox(page, b) { const st = await page.evaluate(() => window.WritingLineActivity.st.strokes); for (let i = 0; i < st.length; i++) await drag(page, b, ideal(st, i)); }
  async function clickSel(page, sel) {
    const box = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    if (!box) throw new Error('no element ' + sel);
    await page.mouse.click(box.x, box.y); await wait(60);
  }
  async function forceRound(page, i) {
    await page.evaluate((i) => { const t = window.WritingLineActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i);
    await wait(120);
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.WritingLineActivity.api.settings[k] = v; window.WritingLineActivity.onSettings(k, v); }, k, v); await wait(200); };

  for (const loc of LOCALES) {
    const W = 704;
    const { page, errs } = await open(loc, W, true);
    const S = (k) => STR[k][loc];
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    const pool = await page.evaluate(() => window.WritingLineActivity._pool.map(r => r.digit));
    is(pool.join() === '0,1,2,3,4,5,6,7,8,9', `[${loc}] pool 0…9`);
    const ids = await page.evaluate(() => { const t = window.WritingLineActivity, o = []; for (let i = 0; i < 20; i++) o.push(t.nextTask({ index: i }).id); return o; });
    is(ids.slice(0, 10).slice().sort().join() === ids.slice(10).slice().sort().join() && ids.slice(0, 10).join() !== ids.slice(10).join(), `[${loc}] pass 2 re-serves the pool in a new order`);
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    for (let d = 0; d <= 9; d++) {
      await forceRound(page, d);
      let st = await state(page), tag = `[${loc} ${d}]`;
      is(st.digit === d && st.guide === 'fading' && st.at === 0 && st.cells.map(c => c.level).join() === 'full,ghost,blank', `${tag} fresh fading state`);
      is((await promptText(page)) === interp(S('promptFading'), { d }), `${tag} prompt`);
      let bi = await boxInfo(page);
      is(bi.length === 3 && bi.every(b => b.shown && b.w >= 200 && b.h >= 200), `${tag} three boxes ≥ 200 px at 704 (${bi.map(b => b.w.toFixed(0)).join('/')})`);
      is(bi[0].active && bi[0].roads === st.strokes && bi[0].hairs === st.strokes && bi[0].start && bi[0].mid, `${tag} box 1: road + hairline per stroke, the start dot, the mid rule`);
      is(bi[0].pips === (st.strokes > 1 ? st.strokes : 0), `${tag} box 1: stroke numerals only when ≥ 2 strokes (${bi[0].pips})`);
      is(bi[1].roads === 0 && bi[1].faded === st.strokes && !bi[1].start && bi[2].roads === 0 && bi[2].hairs === 0 && !bi[1].active && !bi[2].active, `${tag} box 2 waits as a ghost preview, box 3 waits empty`);
      is(await page.evaluate(() => document.querySelector('.wl-rub').disabled), `${tag} Rub out disabled while nothing is inked`);
      is((await note(page)).text === S('noteFull') && bi[0].label === interp(S('boxLabel'), { i: 1 }) + ': ' + S('boxActive'), `${tag} note + label for box 1`);
      await clickSel(page, '.lcs-activity-check');
      is((await bubble(page)).text === S('hintStart') && /tryagain/.test((await bubble(page)).cls), `${tag} Check first → hintStart`);
      /* backwards: the first stroke from its far end */
      const strokes = await page.evaluate(() => window.WritingLineActivity.st.strokes);
      await drag(page, 0, ideal([CORE.reverseStroke(strokes[0])], 0));
      let n1 = await note(page); st = await state(page);
      const sym = d === 0 || d === 8;
      is(n1.slip && n1.text === S(sym ? 'noteDirection' : 'noteReversed') && st.cells[0].ink === 0 && !st.cells[0].formed && st.cells[0].fails === 1, `${tag} a backwards drag → ${sym ? 'noteDirection' : 'noteReversed'}, nothing formed (got "${n1.text}")`);
      is(st.cells[0].live === 0 && (await page.evaluate(() => document.querySelector('.wl-rub').disabled)), `${tag} a named slip leaves no ink; Rub out stays disabled`);
      /* Show me: the walker appears on the active box */
      await clickSel(page, '.wl-show'); await wait(120);
      is((await page.evaluate(() => !!document.querySelectorAll('.wl-box')[0].querySelector('.wl-walker'))), `${tag} Show me puts the walker on box 1`);
      /* box 1, properly */
      await writeBox(page, 0); st = await state(page); bi = await boxInfo(page);
      is(st.cells[0].formed && st.at === 1 && bi[0].done && bi[0].inks === st.strokes && bi[1].active, `${tag} box 1 forms with ${st.strokes} ink stroke(s); box 2 is up`);
      is(bi[1].roads === 0 && bi[1].faded === st.strokes && bi[1].start && (await note(page)).text === S('noteGhost'), `${tag} box 2 is a ghost (faded hairline + dot), noteGhost`);
      await clickSel(page, '.lcs-activity-check');
      is((await bubble(page)).text === S('hintUnfinished'), `${tag} Check mid-way → hintUnfinished`);
      /* half a stroke → short; the ink stays; Rub out clears it */
      { const f = ideal(strokes, 0); await drag(page, 1, f.slice(0, Math.floor(f.length * 0.72))); }
      n1 = await note(page); st = await state(page);
      is(n1.slip && n1.text === S('noteShort') && st.cells[1].live > 0, `${tag} 72 % of the stroke → noteShort, the live ink stays (${st.cells[1].live} pts)`);
      is(!(await page.evaluate(() => document.querySelector('.wl-rub').disabled)), `${tag} Rub out enabled`);
      await clickSel(page, '.wl-rub'); st = await state(page);
      is(st.cells[1].live === 0 && st.cells[1].ink === 0 && st.cells[1].idx === 0 && (await note(page)).text === S('noteGhost'), `${tag} Rub out clears box 2`);
      await writeBox(page, 1); st = await state(page); bi = await boxInfo(page);
      is(st.at === 2 && bi[2].active && bi[2].roads === 0 && bi[2].hairs === 0 && !bi[2].start && (await note(page)).text === S('noteBlank'), `${tag} box 3 is blank, noteBlank`);
      /* mirrored first stroke on the blank box (the 1 is mirror-blind: its mirrored flag passes) */
      if (d !== 1) {
        await drag(page, 2, ideal(CORE.mirrorStrokes(strokes), 0)); n1 = await note(page); st = await state(page);
        is(n1.slip && n1.text === S(sym ? 'noteDirection' : 'noteMirror') && st.cells[2].ink === 0, `${tag} a mirrored drag on the blank box → ${sym ? 'noteDirection' : 'noteMirror'} (got "${n1.text}")`);
      }
      /* three stalls → the ghost steps in (helped); scribbles that touch nothing */
      const scribble = [{ x: 3, y: 3 }, { x: 97, y: 4 }, { x: 4, y: 96 }];
      const before = (await state(page)).cells[2].fails;
      for (let k = before; k < 3; k++) await drag(page, 2, scribble);
      st = await state(page); bi = await boxInfo(page);
      is(st.cells[2].fails === 3 && st.cells[2].shown === 'ghost' && bi[2].faded === st.strokes && bi[2].start && (await note(page)).text === S('noteHelp'), `${tag} after 3 stalls the ghost appears in box 3 (noteHelp)`);
      if (SHOT && d === 3) await page.screenshot({ path: path.join(SHOT, `wl-${loc}-3-helped.png`) });
      await writeBox(page, 2); await wait(1100);
      st = await state(page);
      is(st.done && st.cells.every(c => c.formed), `${tag} the line is full`);
      const b = await bubble(page);
      is((await celebrated(page)) && b.text === interp(S('celebrateFading'), { d }), `${tag} Check fired itself → "${interp(S('celebrateFading'), { d })}" (got "${b.text}")`);
      is((await note(page)).done && (await note(page)).text === interp(S('noteDone'), { d }), `${tag} the strip says done`);
      if (SHOT && d === 3) await page.screenshot({ path: path.join(SHOT, `wl-${loc}-3-done.png`) });
      await clickSel(page, '.lcs-activity-next'); await wait(150);
      st = await state(page);
      is(!st.done && st.at === 0 && st.cells.every(c => !c.formed && c.ink === 0), `${tag} Next clears`);
    }
    /* settings: guide full → three roads; alone → ghost, blank, blank; line plain → no mid rule */
    await setSetting(page, 'guide', 'full'); await forceRound(page, 5);
    let st = await state(page), bi = await boxInfo(page);
    is(st.guide === 'full' && st.cells.map(c => c.level).join() === 'full,full,full' && bi[0].roads === st.strokes && (await promptText(page)) === interp(S('promptFull'), { d: 5 }), `[${loc}] guide full: full roads, promptFull`);
    await writeBox(page, 0); await writeBox(page, 1); await writeBox(page, 2); await wait(1100);
    is((await celebrated(page)) && (await bubble(page)).text === interp(S('celebrateFull'), { d: 5 }), `[${loc}] guide full celebrates with celebrateFull`);
    await setSetting(page, 'guide', 'alone'); await forceRound(page, 7); st = await state(page); bi = await boxInfo(page);
    is(st.guide === 'alone' && st.cells.map(c => c.level).join() === 'ghost,blank,blank' && bi[0].roads === 0 && bi[0].faded === st.strokes && (await promptText(page)) === interp(S('promptAlone'), { d: 7 }) && (await note(page)).text === S('noteGhost'), `[${loc}] guide alone: ghost first, promptAlone`);
    is(st.strokes === (loc === 'de' || loc === 'fr' || loc === 'it' || loc === 'es' || loc === 'pt' ? 2 : 1), `[${loc}] the seven has ${st.strokes} stroke(s) in ${loc}`);
    await setSetting(page, 'line', 'plain'); bi = await boxInfo(page);
    is(bi.every(b => !b.mid) && (await state(page)).at === 0, `[${loc}] one line: no mid rule, the round is kept`);
    await setSetting(page, 'line', 'house'); await setSetting(page, 'guide', 'fading');
    /* the resize broadcast: a completed round shows Next (taller card) */
    await forceRound(page, 2); await wait(1200);
    await page.evaluate(() => { window.__lastResize = null; window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
    await writeBox(page, 0); await writeBox(page, 1); await writeBox(page, 2); await wait(1500);
    const rs = await page.evaluate(() => ({ sent: window.__lastResize, app: Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height) }));
    is(rs.sent !== null && Math.abs(rs.sent - rs.app) <= 6, `[${loc}] a completed round broadcasts the card height (sent ${rs.sent}, card ${rs.app})`);
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  /* width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    await forceRound(page, 4);
    const m = await page.evaluate(() => {
      const boxes = [...document.querySelectorAll('.wl-box')].filter(b => b.style.display !== 'none').map(b => b.getBoundingClientRect());
      const thumbs = document.querySelector('.wl-thumbs');
      const strip = document.querySelector('.wl-strip').getBoundingClientRect();
      const tools = [...document.querySelectorAll('.wl-tool')].map(b => b.getBoundingClientRect());
      return { n: boxes.length, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, minW: Math.min(...boxes.map(r => r.width)), inView: boxes.every(r => r.left >= -1 && r.right <= window.innerWidth + 1), stripIn: strip.right <= window.innerWidth + 1 && strip.left >= -1, thumbsShown: thumbs.style.display !== 'none', toolH: Math.min(...tools.map(r => r.height)), toolW: Math.min(...tools.map(r => r.width)) };
    });
    const tag = `[en @${w}]`;
    const stageW = await page.evaluate(() => document.querySelector('.lcs-stage').clientWidth);
    const L = CORE.layout(stageW);
    is(m.n === (L.mode === 'row' ? 3 : 1) && m.thumbsShown === (L.mode === 'single'), `${tag} ${L.mode}: ${m.n} box(es) shown, thumbs ${m.thumbsShown}`);
    is(m.overflow <= 2 && m.inView && m.stripIn, `${tag} no overflow; boxes and strip inside the viewport`);
    is(Math.abs(m.minW - L.cell) <= 1 && m.minW >= (L.mode === 'row' ? 152 : 236), `${tag} box ${m.minW.toFixed(0)} px`);
    is(m.toolH >= 44 && m.toolW >= 44, `${tag} tools ≥ 44`);
    /* a real drag writes on the visible box at this width too */
    const strokes = await page.evaluate(() => window.WritingLineActivity.st.strokes);
    await drag(page, 0, ideal(strokes, 0));
    const st = await state(page);
    is(st.cells[0].idx === 1 || st.cells[0].formed, `${tag} the first stroke forms by a real drag`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `wl-en-${w}.png`), fullPage: true });
    is(errs.length === 0, `[en @${w}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-writing-line: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
