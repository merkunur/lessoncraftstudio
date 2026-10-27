#!/usr/bin/env node
/* =====================================================================
   local-test-mirror-chart.js — ACTIVITY #130, The Mirror Chart (Word
   Doctor's Clinic, L.1.2.e), in a real browser with real pointer actions
   (tiles tapped in and out, keys and the capital key pressed, bank words
   picked, the mirror button clicked), in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (four levels; six helps);
     · level 1: the task line, a box per letter, a fogged mirror; Mirror
       with an empty box → the hint, no miss; a wrong tile that spells
       another picture → the mirror shows THAT picture and the hint names
       the letters; Mirror again → miss 2: the sick box mists; the tile
       tapped out → the mist goes; the right tile → the mirror shows the
       patient, the success line names the word;
     · a tile that spells nothing → fog with the letters drawn in it;
     · level 3 solved; level 4: the singular → one picture (the count
       hint), the right ending → two pictures;
     · level 2 "boxes, first letter, bank": a wrong bank word → its
       mirror; the right one → healed;
     · level 2 "on a line": the word typed on the keys heals; Delete takes
       a letter back; German: a lower-case start → the capital hint, the
       capital key → healed;
     · level 2 "boxes + first letter": a filled box tapped → empty again.
   Then every round of every level (level 2 in three helps) at rest, at
   miss 2 and solved — reached ONCE per locale by real taps, then resized
   through 320…1366: no sideways scroll, the mirror button above the fold
   at rest, the hint and the success line in view, controls ≥ 44 px,
   everything inside the card, no text cut off, no two bands on top of
   each other, the library pictures loaded.
   Usage: node scripts/local-test-mirror-chart.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '130-mirror-chart', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'mirror-chart-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, MirrorChartCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'mirror-chart-activity.js'), 'utf8') + '\n;this.__A = window.MirrorChartActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 120) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(IMGROOT, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    if (p.startsWith('/image-library-webp/')) { const d = path.dirname(file); if (!fs.existsSync(d) || !fs.readdirSync(path.dirname(d)).includes(path.basename(d)) || !fs.readdirSync(d).includes(path.basename(file))) { res.statusCode = 404; res.end(); return; } }
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
/* what a tile spells, by the core's own rule (the round data is the source; the browser does the rest) */
const tileSpells = (rd, i) => { const st = C.newState(rd.loc, rd.lvl, rd.r); C.place(st, i); return { s: C.spelled(st), m: C.look(st) }; };
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
    await page.goto(`${base}/mirror-chart-activity.html?activity=word-clinic.spell-by-ear.l-1-2-e&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.MirrorChartActivity && window.MirrorChartActivity.st && document.querySelector('.mc-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.MirrorChartActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, help) {
    const ok = await page.evaluate((lvl, r, help) => {
      const a = window.MirrorChartActivity; a.api.settings.level = lvl; a.api.settings.help = help || 'all'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r && (lvl !== '2' || a.st.rd.help === (help || 'all'));
    }, lvl, r, help);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r + ' ' + help);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.MirrorChartActivity.st; return { r: s.r, lvl: s.lvl, tile: s.tile, letters: s.letters ? s.letters.slice() : null, misses: s.misses, show: s.show, last: s.last, reason: s.reason, done: s.done }; });
  const rdOf = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.MirrorChartActivity.st.rd)));
  const note = (page) => page.evaluate(() => document.querySelector('.mc-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const mirrorPics = (page) => page.evaluate(() => [...document.querySelectorAll('.mc-glass img')].map(i => decodeURIComponent(i.getAttribute('src'))));
  const K = (k) => `[data-k="${k}"]`;
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const look = (page, tag) => click(page, K('check'), tag);
  /* type a string on the on-screen keys (the capital key before a capital) */
  async function typeWord(page, s, tag) { for (const ch of s) { if (ch !== ch.toLowerCase()) await click(page, K('shift'), tag); await click(page, K('key-' + ch.toLowerCase()), tag); } }
  const wrongLast = (rd) => { const w = rd.target, last = w[w.length - 1].toLowerCase(); return w.slice(0, -1) + rd.keys.find(k => k !== last && /[a-z]/.test(k)); };
  async function reach(page, rd, state, tag) {
    if (state === 'rest') return true;
    const P = rd.parts;
    if (rd.kind !== 'write') {
      const w = rd.tiles.findIndex((_, i) => i !== 0);
      if (state === 'solved') { await click(page, K('tile-0'), tag); await look(page, tag); return true; }
      await click(page, K('tile-' + w), tag); await look(page, tag); await look(page, tag); return true;
    }
    if (P.bank) {
      if (state === 'solved') { await click(page, K('bank-0'), tag); await look(page, tag); return true; }
      await click(page, K('bank-1'), tag); await look(page, tag); await look(page, tag); return true;
    }
    const given = P.first ? 1 : 0, w = state === 'solved' ? rd.target : wrongLast(rd);
    await typeWord(page, w.slice(given), tag); await look(page, tag); if (state === 'miss2') await look(page, tag); return true;
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s, rd;
    is(JSON.stringify(await page.evaluate(() => window.MirrorChartActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === JSON.stringify(['level:1/2/3/4', 'help:all/boxfirst/boxbank/first/bank/line']), `${loc}: the settings`);
    /* level 1 */
    const r1 = C.rounds('1').find(r => { const x = C.round(loc, '1', r); return x.tiles.some((_, i) => i && tileSpells(x, i).m.kind === 'other'); });
    await force(page, '1', r1); rd = await rdOf(page); tag = `${loc} L1.${r1 + 1}`;
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 't1')), `${tag}: the task line`);
    is(await count(page, '.mc-box') === rd.boxes.length && await count(page, '.mc-glass .mc-fog') === 1 && await count(page, '.mc-glass img') === 0 && (await page.evaluate(() => [...document.querySelectorAll('.mc-patient img')].map(i => decodeURIComponent(i.getAttribute('src')))))[0].includes(rd.pic), `${tag}: a box per letter, the patient on the chart, a fogged mirror`);
    await look(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: Mirror with an empty box → the hint, no miss`);
    const wi = rd.tiles.findIndex((_, i) => i && tileSpells(rd, i).m.kind === 'other'), ws = tileSpells(rd, wi);
    await click(page, K('tile-' + wi), tag); is((await st(page)).tile === wi && await count(page, K('box-' + rd.sick) + '.is-full') === 1, `${tag}: the tile «${rd.tiles[wi]}» goes into the sick box`);
    await look(page, tag); s = await st(page);
    is(s.misses === 1 && (await mirrorPics(page)).some(p => p.includes(ws.m.pic)) && sp(await note(page)) === sp(T(loc, 'missOther', { other: ws.s })), `${tag}: «${ws.s}» → the mirror shows ${ws.m.pic}, «${sp(await note(page))}»`);
    await look(page, tag); s = await st(page);
    is(s.misses === 2 && await count(page, '.mc-box.is-misty') === 1 && sp(await note(page)) === sp(T(loc, 'missGlow')), `${tag}: miss 2 → the sick box mists`);
    await click(page, K('box-' + rd.sick), tag); s = await st(page); is(s.tile === null && await count(page, '.is-misty') === 0 && await count(page, '.mc-glass .mc-fog') === 1, `${tag}: the tile tapped out of the box → the mist goes, the mirror fogs`);
    await click(page, K('tile-0'), tag); await look(page, tag); s = await st(page);
    is(s.done && (await mirrorPics(page)).some(p => p.includes(rd.pic)) && sp(await note(page)) === sp(T(loc, 'okHealed', { word: rd.target })) && await count(page, '.mc-mirror.is-ok') === 1, `${tag}: the right tile → the patient in the mirror, «${sp(await note(page))}»`);
    /* fog */
    let fog = null; for (const lvl of ['1', '3']) for (const r of C.rounds(lvl)) { const x = C.round(loc, lvl, r); const i = x.tiles.findIndex((_, j) => j && tileSpells(x, j).m.kind === 'fog'); if (i > 0 && !fog) fog = { lvl, r, i, s: tileSpells(x, i).s }; }
    if (fog) { await force(page, fog.lvl, fog.r); tag = `${loc} L${fog.lvl}.${fog.r + 1}`; await click(page, K('tile-' + fog.i), tag); await look(page, tag);
      is(await count(page, '.mc-glass .mc-fog') === 1 && sp(await page.evaluate(() => document.querySelector('.mc-finger').textContent)) === fog.s && sp(await note(page)) === sp(T(loc, 'missFog', { other: fog.s })), `${tag}: «${fog.s}» → fog with the letters in it`); }
    /* level 3 */
    await force(page, '3', 0); rd = await rdOf(page); tag = `${loc} L3.1`; await click(page, K('tile-0'), tag); await look(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, rd.wordOnly ? 'okWord' : 'okHealed', { word: rd.target })), `${tag}: the rule word healed, «${sp(await note(page))}»`);
    /* level 4 */
    const r4 = C.rounds('4').find(r => { const x = C.round(loc, '4', r); return x.tiles.some((_, i) => i && tileSpells(x, i).m.kind === 'count'); });
    if (r4 != null) { await force(page, '4', r4); rd = await rdOf(page); tag = `${loc} L4.${r4 + 1}`; const ci = rd.tiles.findIndex((_, i) => i && tileSpells(rd, i).m.kind === 'count');
      await click(page, K('tile-' + ci), tag); await look(page, tag); is((await mirrorPics(page)).length === 1 && sp(await note(page)) === sp(T(loc, 'missCount', { other: tileSpells(rd, ci).s })), `${tag}: «${tileSpells(rd, ci).s}» → one picture, «${sp(await note(page))}»`);
      await click(page, K('tile-0'), tag); await look(page, tag); s = await st(page); is(s.done && (await mirrorPics(page)).length === 2 && sp(await note(page)) === sp(T(loc, 'okPlural', { word: rd.target })), `${tag}: «${rd.target}» → two pictures, «${sp(await note(page))}»`); }
    else is(loc === 'fi', `${loc}: a level-4 round whose tray holds the singular (fi: endings only add, none gives the singular)`);
    /* level 2, the bank */
    await force(page, '2', 0, 'all'); rd = await rdOf(page); tag = `${loc} L2.1 all`;
    is(await count(page, '.mc-bankw') === 4 && await count(page, '.mc-key') === 0 && await count(page, '.mc-box.is-given') === 1, `${tag}: boxes with the first letter and a bank of four, no keys`);
    const b1 = rd.bank[1]; await click(page, K('bank-1'), tag); await look(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, C.lookUp(loc, b1) ? 'missOther' : 'missFog', { other: b1 })), `${tag}: «${b1}» → «${sp(await note(page))}»`);
    await click(page, K('bank-0'), tag); await look(page, tag); is((await st(page)).done, `${tag}: «${rd.target}» from the bank heals`);
    /* level 2, on a line */
    const r2 = 3; await force(page, '2', r2, 'line'); rd = await rdOf(page); tag = `${loc} L2.${r2 + 1} line`;
    is(await count(page, '.mc-line') === 1 && await count(page, '.mc-bankw') === 0 && await count(page, '.mc-key:not(.is-back):not(.is-shift)') === rd.keys.length && await count(page, K('shift')) === (loc === 'de' ? 1 : 0), `${tag}: a line and the keyboard${loc === 'de' ? ' with the capital key' : ''}`);
    await look(page, tag); is((await st(page)).misses === 0 && sp(await note(page)) === sp(T(loc, 'hintLine')), `${tag}: Mirror on an empty line → the hint, no miss`);
    await click(page, K('key-' + rd.keys[0]), tag); await click(page, K('back'), tag); is((await st(page)).letters.length === 0, `${tag}: Delete takes the letter back`);
    if (loc === 'de') { await typeWord(page, rd.target.toLowerCase(), tag); await look(page, tag); is(sp(await note(page)) === sp(T(loc, 'missCapital')) && await count(page, '.mc-glass .mc-fog') === 1, `${tag}: «${rd.target.toLowerCase()}» → the capital hint, the mirror stays fogged`);
      for (let i = 0; i < rd.target.length; i++) await click(page, K('back'), tag); }
    await typeWord(page, rd.target, tag); await look(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okHealed', { word: rd.target })), `${tag}: «${rd.target}» typed heals`);
    /* level 2, boxes + first letter: a filled box tapped is emptied */
    await force(page, '2', 1, 'boxfirst'); rd = await rdOf(page); tag = `${loc} L2.2 boxfirst`;
    await typeWord(page, rd.target[1], tag); is((await st(page)).letters[1] === rd.target[1], `${tag}: a key fills the next box`);
    await click(page, K('box-1'), tag); is((await st(page)).letters[1] === null, `${tag}: the filled box tapped → empty again`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.mc-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + String(e.className).split(' ')[0] + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.mc-look'); out.cBottom = ck && vis(ck) ? ck.getBoundingClientRect().bottom : 0;
    const nr = document.querySelector('.mc-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.mc-wrap')).getBoundingClientRect();
    document.querySelectorAll('.mc-chart,.mc-mirror,.mc-boxes,.mc-tray,.mc-bank,.mc-keys,.mc-look,.mc-box,.mc-tile,.mc-bankw,.mc-key').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    const band = ['.mc-row', '.mc-boxes', '.mc-tray', '.mc-bank', '.mc-keys', '.mc-foot', '.mc-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const ls = document.querySelector('.mc-listen'), pt = document.querySelector('.mc-patient');
    if (ls && pt && vis(ls)) { const a = ls.getBoundingClientRect(); [...pt.querySelectorAll('img')].forEach(i => { const b = i.getBoundingClientRect(), x = Math.min(a.right, b.right) - Math.max(a.left, b.left), y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (x > 12 && y > 12) out.fails.push('the listen button on the patient'); }); }
    document.querySelectorAll('.mc-box,.mc-tile,.mc-bankw,.mc-note,.mc-line,.mc-clear,.mc-finger').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    document.querySelectorAll('.mc-wrap img').forEach(i => { if (vis(i) && !(i.complete && i.naturalWidth > 0)) out.fails.push('a picture did not load ' + i.getAttribute('src')); });
    return out;
  };
  const SWEEP = [['1', null], ['2', 'all'], ['2', 'line'], ['2', 'bank'], ['3', null], ['4', null]];
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const [lvl, help] of SWEEP) for (const r of C.rounds(lvl)) for (const state of ['rest', 'miss2', 'solved']) {
      if (lvl === '2' && help !== 'all' && r > 3) continue;
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} L${lvl}${help ? ' ' + help : ''}.${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r, help);
      const rd = await rdOf(page);
      await reach(page, rd, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real taps (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real taps`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} L${lvl}${help ? ' ' + help : ''}.${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.MirrorChartActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.mc-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom > 0 && m.cBottom <= VH(w), `${tag}: the mirror button above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the ${state === 'solved' ? 'success line' : 'hint'} in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && ['en', 'de', 'fi'].indexOf(loc) >= 0 && [360, 704, 1024].indexOf(w) >= 0 && r % 4 === 0) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-L${lvl}${help && help !== 'all' ? help : ''}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-mirror-chart: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
