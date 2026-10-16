#!/usr/bin/env node
/* =====================================================================
   local-test-jar-label.js — the interaction gate for ACTIVITY #7, "Rivet's
   Number Forge" (K.CC.A.3), the Jar Label. Real taps: marks on the toys,
   digits on the keys (the floating pad on a phone), wrong labels laid
   against the jar (41 / the lone digit / one short / one over / zero),
   the right label, the shelf of a fill round; every round of both ranges,
   every locale asked for, the width sweep, the resize broadcast.
   Usage: node scripts/local-test-jar-label.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'rivets-number-forge.numeral-album.k-cc-a-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'jar-label-activity.js')).strings;
const CORE = require(path.join(MINI, 'jar-label-core.js'));
const PICS = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'toys.json'), 'utf8'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
const HINT = { none: 'hintNoLabel', zero: 'hintZero', reversed: 'hintReversed', oneDigit: 'hintOneDigit', more: 'hintMore', fewer: 'hintFewer', fillMore: 'hintFillMore', fillFewer: 'hintFillFewer' };
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice(12));
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
    await page.setViewport({ width: w, height: tall ? 1500 : (w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900) });   /* the visual-qa folds */
    await page.goto(`${base}/jar-label-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.JarLabelActivity && window.JarLabelActivity.st && window.JarLabelActivity._theme, { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.JarLabelActivity.st; return { id: s.id, kind: s.kind, n: s.n, noun: s.noun, typed: s.typed, inJar: s.inJar, marked: s.marks.filter(Boolean).length, checked: s.checked ? { ok: s.checked.ok, slip: s.checked.slip, k: s.checked.k } : null, done: s.done }; });
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return { text: b.textContent, cls: b.className }; });
  const promptText = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  const view = (page) => page.evaluate(() => {
    const cells = [...document.querySelectorAll('.jl-cell')];
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && getComputedStyle(el).visibility !== 'hidden' && !el.hidden; };
    const toys = cells.filter(c => c.classList.contains('is-toy'));
    const img = toys[0] && toys[0].querySelector('img');
    const ir = img ? img.getBoundingClientRect() : null;
    const mode = document.querySelector('.jl-wrap').classList.contains('is-side') ? 'side' : 'stack';
    return { toys: toys.length, visibleToys: toys.filter(vis).length, marked: cells.filter(c => c.classList.contains('is-marked')).length, ticked: cells.filter(c => c.classList.contains('is-ticked')).length, over: cells.filter(c => c.classList.contains('is-over')).length, empty: cells.filter(c => c.classList.contains('is-place')).length,
      img: img ? { src: img.getAttribute('src'), alt: img.alt, w: ir.width, nat: img.naturalWidth } : null, label: document.querySelector('.jl-label').textContent, labelAria: document.querySelector('.jl-label').getAttribute('aria-label'), stuck: document.querySelector('.jl-label').classList.contains('is-stuck'), wrongLabel: document.querySelector('.jl-label').classList.contains('is-wrong'),
      padShown: !document.querySelector('.jl-pad').hidden, pencilShown: !document.querySelector('.jl-pencil').hidden, shelf: document.querySelector('.jl-shelf').hidden ? 0 : document.querySelectorAll('.jl-shelf-toy').length, note: document.querySelector('.jl-note').hidden ? null : document.querySelector('.jl-note').textContent, noteSlip: document.querySelector('.jl-note').classList.contains('is-slip'), mode, keysDisabled: [...document.querySelectorAll('.jl-key:not(.jl-key-erase):not(.jl-key-done)')].every(k => k.disabled), eraseDisabled: document.querySelector('.jl-key-erase').disabled };
  });
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no element ' + sel); return c; };
  async function clickSel(page, sel) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(70); }
  /* type a label with real key taps (opening the floating pad on a phone) */
  async function typeLabel(page, a) {
    const v = await view(page);
    if (!v.padShown) await clickSel(page, '.jl-pencil');
    while ((await state(page)).typed !== '') await clickSel(page, '.jl-key-erase');
    for (const d of String(a)) await clickSel(page, `.jl-key:nth-child(${d === '0' ? 10 : Number(d)})`);
    if ((await view(page)).mode === 'stack') await clickSel(page, '.jl-key-done');
  }
  async function forceRound(page, i) {
    await page.evaluate((i) => { const t = window.JarLabelActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i);
    await wait(150);
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.JarLabelActivity.api.settings[k] = v; window.JarLabelActivity.onSettings(k, v); }, k, v); await wait(250); };
  const label = (noun, loc) => { const e = PICS.nouns[noun]; return e ? (e.labels[loc] || e.labels.en)[0] : null; };

  for (const loc of LOCALES) {
    const W = 704;
    const { page, errs } = await open(loc, W, true);
    const S = (k) => STR[k][loc];
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    const pool = await page.evaluate(() => window.JarLabelActivity._pool.map(r => r.id));
    const want = CORE.rounds('to20', 'both', 'jl');
    is(pool.join() === want.map(r => r.id).join(), `[${loc}] pool = the 17 to-20 rounds`);
    const ids = await page.evaluate(() => { const t = window.JarLabelActivity, o = []; for (let i = 0; i < 34; i++) o.push(t.nextTask({ index: i }).id); return o; });
    is(ids.slice(0, 17).slice().sort().join() === ids.slice(17).slice().sort().join() && ids.slice(0, 17).join() !== ids.slice(17).join(), `[${loc}] pass 2 re-serves the pool in a new order`);
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    for (let ri = 0; ri < want.length; ri++) {
      await forceRound(page, ri);
      const R = want[ri];
      let st = await state(page), tag = `[${loc} ${R.id}]`, v = await view(page);
      is(st.id === R.id && st.kind === R.kind && st.n === R.n && st.noun === R.noun && !st.done && st.typed === '' && st.marked === 0, `${tag} fresh state`);
      is((await promptText(page)) === interp(S(R.kind === 'fill' ? 'promptFill' : 'promptCount'), { n: R.n }), `${tag} prompt`);
      is(v.mode === 'side' && v.padShown === (R.kind === 'count') && !v.pencilShown && v.shelf === (R.kind === 'fill' ? 6 : 0), `${tag} side layout: pad ${v.padShown}, shelf ${v.shelf}`);
      if (R.kind === 'count') {
        is(v.toys === R.n && v.visibleToys === R.n && v.empty === 0 && v.label === '' && v.labelAria === S('labelEmpty') && v.note === S('noteCount'), `${tag} ${R.n} toys in the jar, the label empty, noteCount (side mode)`);
        if (R.n) is(!!v.img && /^\/image-library-webp\/themes\/toys\//.test(v.img.src) && v.img.nat > 0 && v.img.w >= 96 && v.img.alt === label(R.noun, loc), `${tag} library toy ${R.noun} ≥ 96 px (${v.img && v.img.w.toFixed(0)}), alt "${v.img && v.img.alt}"`);
        /* marks: tap two toys, untap one */
        if (R.n >= 2) {
          await clickSel(page, '.jl-cell[data-i="0"]'); await clickSel(page, '.jl-cell[data-i="1"]'); v = await view(page); st = await state(page);
          is(st.marked === 2 && v.marked === 2, `${tag} two marks`);
          await clickSel(page, '.jl-cell[data-i="0"]'); st = await state(page);
          is(st.marked === 1, `${tag} a second tap removes a mark`);
        }
        /* Check with no label */
        await clickSel(page, '.lcs-activity-check');
        is((await bubble(page)).text === S('hintNoLabel') && /tryagain/.test((await bubble(page)).cls), `${tag} Check with no label → hintNoLabel`);
        /* wrong labels, each laid against the jar */
        const wrongs = R.n === 0 ? [3] : R.n >= 10 ? [Number(String(R.n).split('').reverse().join('')), R.n % 10, R.n - 1, R.n + 1] : [R.n - 1, R.n + 1];
        for (const a of wrongs) {
          if (a === R.n || a < 0 || (R.n >= 10 && a === Number(String(R.n).split('').reverse().join('')) && a % 10 === 0)) continue;
          await typeLabel(page, a); st = await state(page);
          is(st.typed === String(a) && (await view(page)).label === String(a), `${tag} typed ${a} on the label`);
          await clickSel(page, '.lcs-activity-check'); st = await state(page); v = await view(page);
          const slip = CORE.classify(a, R.n);
          is(st.checked && !st.checked.ok && st.checked.slip === slip && !st.done, `${tag} label ${a} → ${slip} (got ${st.checked && st.checked.slip})`);
          is((await bubble(page)).text === S(HINT[slip]) && v.wrongLabel, `${tag} bubble names ${slip}`);
          const aa = Math.min(a, 20);
          is(v.ticked === Math.min(aa, R.n) && v.over === Math.max(0, R.n - aa) && v.empty === Math.max(0, aa - R.n), `${tag} places for ${a}: ${v.ticked} ticked / ${v.over} over / ${v.empty} empty`);
          if (slip === 'more') is(v.note === interp(S('noteLeft'), { k: R.n - a }) && v.noteSlip, `${tag} note "${v.note}"`);
          if (slip === 'fewer') is(v.note === interp(S('noteEmpty'), { k: a - R.n }) && v.noteSlip, `${tag} note "${v.note}"`);
        }
        /* a new digit clears the places */
        await typeLabel(page, R.n); v = await view(page);
        is(v.ticked === 0 && v.over === 0 && v.empty === 0 && !v.wrongLabel, `${tag} typing again clears the laid places`);
        await page.evaluate(() => { window.__lastResize = null; window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
        await clickSel(page, '.lcs-activity-check'); await wait(400); st = await state(page); v = await view(page);
        is(st.done && (await celebrated(page)) && (await bubble(page)).text === interp(S('celebrateCount'), { n: R.n }) && v.stuck && v.padShown && v.keysDisabled && v.eraseDisabled && v.note === null, `${tag} the right label sticks; the pad stays, disabled (${(await bubble(page)).text})`);
      } else {
        is(v.toys === 0 && v.label === String(R.n) && v.note === S('noteFill') && v.shelf === 6, `${tag} empty jar, the label says ${R.n}, six toys on the shelf`);
        is((await page.evaluate(() => Math.min(...[...document.querySelectorAll('.jl-shelf-toy')].map(b => Math.min(b.getBoundingClientRect().width, b.getBoundingClientRect().height))))) >= 44, `${tag} shelf toys ≥ 44 px`);
        await clickSel(page, '.lcs-activity-check'); st = await state(page);
        is(st.checked.slip === 'fillMore' && (await bubble(page)).text === S('hintFillMore') && (await view(page)).note === interp(S('noteNeed'), { k: R.n }), `${tag} empty → hintFillMore, "${(await view(page)).note}"`);
        for (let i = 0; i < R.n + 1; i++) await clickSel(page, '.jl-shelf-toy');
        st = await state(page); v = await view(page);
        is(st.inJar === R.n + 1 && v.toys === R.n + 1 && v.visibleToys === R.n + 1, `${tag} ${R.n + 1} dropped in by real taps`);
        is(!!v.img && v.img.w >= 96 && v.img.alt === label(R.noun, loc), `${tag} the jar's toys are the library picture (${v.img && v.img.w.toFixed(0)} px)`);
        await clickSel(page, '.lcs-activity-check'); st = await state(page);
        is(st.checked.slip === 'fillFewer' && (await bubble(page)).text === S('hintFillFewer') && (await view(page)).note === interp(S('noteOver'), { k: 1 }), `${tag} one over → hintFillFewer`);
        await clickSel(page, '.jl-cell[data-i="0"]'); st = await state(page);
        is(st.inJar === R.n && st.checked === null, `${tag} a tap in the jar puts one back`);
        await page.evaluate(() => { window.__lastResize = null; window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
        await clickSel(page, '.lcs-activity-check'); await wait(400); st = await state(page); v = await view(page);
        is(st.done && (await celebrated(page)) && (await bubble(page)).text === interp(S('celebrateFill'), { n: R.n }) && v.stuck && v.shelf === 0, `${tag} ${R.n} in the jar → done`);
      }
      const rs = await page.evaluate(() => ({ sent: window.__lastResize, app: Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height) }));
      is(rs.sent !== null && Math.abs(rs.sent - rs.app) <= 6, `${tag} a completed round broadcasts the card height (sent ${rs.sent}, card ${rs.app})`);
      if (SHOT && R.id === 'to20-count-14') await page.screenshot({ path: path.join(SHOT, `jl-${loc}-done.png`) });
      await clickSel(page, '.lcs-activity-next'); await wait(150);
      st = await state(page);
      is(!st.done && st.typed === '' && st.marked === 0 && st.checked === null, `${tag} Next clears`);
    }
    /* settings */
    await setSetting(page, 'range', 'to10');
    is((await page.evaluate(() => window.JarLabelActivity._pool.map(r => r.n).join())) === CORE.rounds('to10', 'both', 'jl').map(r => r.n).join(), `[${loc}] range to 10: the fourteen small rounds`);
    await setSetting(page, 'task', 'fill');
    is((await page.evaluate(() => window.JarLabelActivity._pool.every(r => r.kind === 'fill') && window.JarLabelActivity._pool.length)) === 3, `[${loc}] rounds = fill the jar: three fill rounds`);
    await setSetting(page, 'task', 'count');
    is((await page.evaluate(() => window.JarLabelActivity._pool.every(r => r.kind === 'count') && window.JarLabelActivity._pool.length)) === 11, `[${loc}] rounds = count and write: eleven count rounds`);
    await setSetting(page, 'task', 'both'); await setSetting(page, 'range', 'to20');
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  /* width sweep: the tallest round (20) and a fill round at every width */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const want = CORE.rounds('to20', 'both', 'jl');
    await forceRound(page, want.findIndex(r => r.kind === 'count' && r.n === 20));
    const stageW = await page.evaluate(() => Math.floor(document.querySelector('.jl-wrap').getBoundingClientRect().width));
    const L = CORE.layout(stageW);
    let v = await view(page);
    const m = await page.evaluate(() => {
      const wrap = document.querySelector('.jl-wrap').getBoundingClientRect(), jar = document.querySelector('.jl-jar').getBoundingClientRect(), pad = document.querySelector('.jl-pad');
      const chk = document.querySelector('.lcs-activity-check').getBoundingClientRect();
      const cells = [...document.querySelectorAll('.jl-cell.is-toy')].map(c => c.getBoundingClientRect());
      const rows = new Set(cells.map(r => Math.round(r.top))).size;
      const keys = [...document.querySelectorAll('.jl-key')].filter(k => !k.hidden && k.offsetParent !== null).map(k => k.getBoundingClientRect());
      return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, fill: jar.width / wrap.width + (pad.hidden ? 0 : pad.getBoundingClientRect().width / wrap.width), rows, cellW: cells.length ? cells[0].width : 0, checkBottom: chk.bottom, innerH: window.innerHeight, keyMin: keys.length ? Math.min(...keys.map(k => Math.min(k.width, k.height))) : 0, padHidden: pad.hidden, lidH: document.querySelector('.jl-lid').getBoundingClientRect().height };
    });
    const tag = `[en @${w}]`;
    is(v.mode === L.mode && m.rows === CORE.rowsFor(20, L.cols) && Math.abs(m.cellW - L.cell) <= 1, `${tag} ${L.mode}: ${m.rows} rows of ${L.cols}, cell ${m.cellW.toFixed(0)}`);
    is(m.overflow <= 2, `${tag} no overflow`);
    is(v.img && v.img.w >= (w >= 700 ? 96 : 64), `${tag} toy ${v.img && v.img.w.toFixed(0)} px`);
    is(m.checkBottom <= m.innerH + 1, `${tag} twenty toys: Check at ${m.checkBottom.toFixed(0)} within ${m.innerH}`);
    if (L.mode === 'side') { is(!m.padHidden && m.keyMin >= 44, `${tag} the pad stands beside the jar, keys ≥ 44 (${m.keyMin.toFixed(0)})`); }
    else {
      is(m.padHidden && v.pencilShown, `${tag} the pad is folded away; the pencil shows`);
      await clickSel(page, '.jl-pencil'); const m2 = await page.evaluate(() => { const pad = document.querySelector('.jl-pad').getBoundingClientRect(), wrap = document.querySelector('.jl-wrap').getBoundingClientRect(), keys = [...document.querySelectorAll('.jl-key')].map(k => k.getBoundingClientRect()); return { inside: pad.left >= wrap.left - 1 && pad.right <= wrap.right + 1 && pad.bottom <= wrap.bottom + 1, keyMin: Math.min(...keys.map(k => Math.min(k.width, k.height))), shown: !document.querySelector('.jl-pad').hidden }; });
      is(m2.shown && m2.inside && m2.keyMin >= 44, `${tag} the floating pad opens inside the stage, keys ≥ 44 (${m2.keyMin.toFixed(0)})`);
      await clickSel(page, '.jl-key:nth-child(2)'); await clickSel(page, '.jl-key-done'); v = await view(page);
      is(!v.padShown && v.label === '2', `${tag} Done folds the pad; the label keeps the digit`);
    }
    /* a real label at this width */
    await typeLabel(page, 20); await clickSel(page, '.lcs-activity-check'); await wait(300);
    is((await state(page)).done && (await celebrated(page)), `${tag} 20 sticks by real taps`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `jl-en-${w}.png`), fullPage: true });
    /* the fill round fits too */
    await forceRound(page, want.findIndex(r => r.kind === 'fill' && r.n === 15));
    for (let i = 0; i < 15; i++) await clickSel(page, '.jl-shelf-toy');
    const f = await page.evaluate(() => ({ checkBottom: document.querySelector('.lcs-activity-check').getBoundingClientRect().bottom, innerH: window.innerHeight, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
    is(f.checkBottom <= f.innerH + 1 && f.overflow <= 2, `${tag} fifteen in the jar + the shelf: Check at ${f.checkBottom.toFixed(0)} within ${f.innerH}`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `jl-en-${w}-fill.png`), fullPage: true });
    is(errs.length === 0, `[en @${w}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-jar-label: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
