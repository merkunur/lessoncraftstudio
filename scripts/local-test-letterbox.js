#!/usr/bin/env node
/* =====================================================================
   local-test-letterbox.js — the interaction gate for ACTIVITY #6, "Pip's
   Round" (K.CC.A.3), the Letterbox Street. Real pointer DRAGS of the letter
   onto wrong and right doors, every round of both ranges, every locale
   asked for, the spoken address, the width sweep, the resize broadcast.
   Usage: node scripts/local-test-letterbox.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'pips-round.mail-route.k-cc-a-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'letterbox-activity.js')).strings;
const CORE = require(path.join(MINI, 'letterbox-core.js'));
const PICS = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'animals.json'), 'utf8'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
const SLIP_KEY = { reversed: 'wrongReversed', lastDigit: 'wrongLastDigit', oneDigit: 'wrongOneDigit', twoDigits: 'wrongTwoDigits', firstDigit: 'wrongFirstDigit', shape: 'wrongShape', off: 'wrongOff' };
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
    await page.setViewport({ width: w, height: tall ? 1500 : (w <= 420 ? 740 : 900) });
    await page.goto(`${base}/letterbox-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.LetterboxActivity && window.LetterboxActivity.st && window.LetterboxActivity._theme && document.querySelectorAll('.lb-house').length === 5, { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.LetterboxActivity.st; return { id: s.id, range: s.range, letters: s.letters, houses: s.houses.map(h => h.n), open: s.houses.map(h => h.open), residents: s.houses.map(h => h.resident), at: s.at, misses: s.misses, help: s.help, spoken: s.spoken, revealed: s.revealed, done: s.done }; });
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return { text: b.textContent, cls: b.className }; });
  const promptText = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.lb-note'); return { text: n.textContent, slip: n.classList.contains('is-slip'), done: n.classList.contains('is-done') }; });
  const houseInfo = (page) => page.evaluate(() => [...document.querySelectorAll('.lb-house')].map(b => { const r = b.getBoundingClientRect(); const img = b.querySelector('.lb-resident'); const ir = img ? img.getBoundingClientRect() : null; return { w: r.width, h: r.height, top: r.top, left: r.left, right: r.right, plate: b.querySelector('.lb-plate').textContent, open: b.classList.contains('is-open'), help: b.classList.contains('is-help'), disabled: b.disabled, label: b.getAttribute('aria-label'), img: img ? { src: img.getAttribute('src'), alt: img.alt, w: ir.width, h: ir.height, nat: img.naturalWidth } : null }; }));
  const letterInfo = (page) => page.evaluate(() => { const l = document.querySelector('.lb-letter'); const r = l.getBoundingClientRect(); const sv = l.querySelector('.lb-address'); return { hidden: l.hidden, w: r.width, h: r.height, label: l.getAttribute('aria-label'), inks: sv.querySelectorAll('.lb-ink').length, groups: sv.querySelectorAll('g').length, speaker: !!sv.querySelector('.lb-speakerglyph'), hiddenNumber: l.classList.contains('is-hidden-number'), dots: [...document.querySelectorAll('.lb-dot')].map(d => d.classList.contains('is-done') ? 'done' : d.classList.contains('is-now') ? 'now' : 'wait'), stack: document.querySelector('.lb-stack').getAttribute('aria-label') }; });
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no element ' + sel); return c; };
  /* a real finger: press the letter, move off the press point, travel to the door, lift */
  async function dragTo(page, houseIdx) {
    const a = await center(page, '.lb-letter'), b = await center(page, '.lb-house-' + houseIdx);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    await page.mouse.move(a.x + 9, a.y - 9, { steps: 2 });
    await page.mouse.move(b.x, b.y, { steps: 6 });
    await wait(40);
    await page.mouse.up(); await wait(80);
  }
  async function dragNowhere(page) {
    const a = await center(page, '.lb-letter');
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    await page.mouse.move(a.x + 9, a.y - 9, { steps: 2 });
    await page.mouse.move(a.x + 40, a.y + 60, { steps: 4 });
    await page.mouse.up(); await wait(80);
  }
  async function clickSel(page, sel) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(60); }
  async function forceRound(page, i) {
    await page.evaluate((i) => { const t = window.LetterboxActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i);
    await wait(150);
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.LetterboxActivity.api.settings[k] = v; window.LetterboxActivity.onSettings(k, v); }, k, v); await wait(250); };
  const label = (noun, loc) => { const e = PICS.nouns[noun]; return e ? (e.labels[loc] || e.labels.en)[0] : null; };

  for (const loc of LOCALES) {
    const W = 704;
    const { page, errs } = await open(loc, W, true);
    const S = (k) => STR[k][loc];
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    const pool = await page.evaluate(() => window.LetterboxActivity._pool.map(r => r.id));
    is(pool.length === 9 && pool.every((id, i) => id === 'to20-' + i), `[${loc}] pool = the nine to-20 streets`);
    const ids = await page.evaluate(() => { const t = window.LetterboxActivity, o = []; for (let i = 0; i < 18; i++) o.push(t.nextTask({ index: i }).id); return o; });
    is(ids.slice(0, 9).slice().sort().join() === ids.slice(9).slice().sort().join() && ids.slice(0, 9).join() !== ids.slice(9).join(), `[${loc}] pass 2 re-serves the pool in a new order`);
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    const barred = ['de', 'fr', 'it', 'es', 'pt'].includes(loc);
    for (let ri = 0; ri < 9; ri++) {
      await forceRound(page, ri);
      let st = await state(page), tag = `[${loc} ${st.id}]`;
      const R = CORE.rounds('to20', 'lb')[ri];
      is(st.letters.join() === R.letters.join() && st.houses.join() === R.houses.map(h => h.n).join() && st.at === 0 && !st.done && !st.spoken && st.revealed, `${tag} fresh state matches the core's street`);
      is((await promptText(page)) === S('promptWritten'), `${tag} prompt`);
      let hi = await houseInfo(page), li = await letterInfo(page);
      const LW = CORE.layout(await page.evaluate(() => Math.floor(document.querySelector('.lb-wrap').getBoundingClientRect().width)));
      is(hi.length === 5 && LW.mode === 'row' && hi.every(h => Math.abs(h.w - LW.hw) <= 1 && h.w >= 112 && h.h >= 150) && hi.every(h => Math.abs(h.top - hi[0].top) < 2), `${tag} five houses of ${LW.hw} px in one row at 704 (${hi.map(h => h.w.toFixed(0)).join('/')})`);
      is(hi.map(h => h.plate).join() === st.houses.join() && hi.every((h, i) => h.label === interp(S('houseLabel'), { h: st.houses[i] })), `${tag} printed plates + labels`);
      is(hi.every(h => !h.open && !h.img && !h.disabled && !h.help), `${tag} every door shut, no resident yet`);
      const n0 = st.letters[0], digits = String(n0).length;
      const strokes = CORE.handwriting(n0, loc).reduce((a, d) => a + d.strokes.length, 0);
      is(!li.hidden && li.w >= 120 && li.groups === digits && li.inks === strokes && !li.speaker && li.label === interp(S('letterLabel'), { n: n0 }), `${tag} the letter shows ${n0} handwritten (${li.inks} strokes over ${li.groups} digit(s))`);
      if (String(n0).includes('7')) is(li.inks === (barred ? strokes : strokes), `${tag} the seven is ${barred ? 'barred' : 'plain'} on the letter`);
      is(li.dots.join() === 'now,wait,wait' && li.stack === interp(S('stackLabel'), { k: 0 }), `${tag} stack: now, wait, wait`);
      is((await note(page)).text === S('noteStart'), `${tag} noteStart`);
      await clickSel(page, '.lcs-activity-check');
      is((await bubble(page)).text === S('hintStart') && /tryagain/.test((await bubble(page)).cls), `${tag} Check first → hintStart`);
      /* a drag that lands nowhere comes back */
      await dragNowhere(page); st = await state(page);
      is(st.at === 0 && st.misses === 0 && (await page.evaluate(() => document.querySelector('.lb-letter').style.transform)) === '', `${tag} a drag onto the street itself comes back, nothing counted`);
      /* letter 1: every wrong door first (named), help at the second, then the right door */
      const right0 = st.houses.indexOf(n0);
      const wrongs = [0, 1, 2, 3, 4].filter(i => i !== right0);
      for (let k = 0; k < wrongs.length; k++) {
        await dragTo(page, wrongs[k]); st = await state(page);
        const door = st.houses[wrongs[k]], slip = CORE.classify(n0, door), nt = await note(page);
        const want = k === 1 ? S('noteHelp') : interp(S(SLIP_KEY[slip]), { h: door, n: n0 });
        is(st.at === 0 && st.misses === k + 1 && nt.text === want && nt.slip === (k !== 1), `${tag} wrong door ${door} (${slip}) → "${want}" (got "${nt.text}")`);
        hi = await houseInfo(page);
        is(st.help === (k >= 1) && hi[right0].help === (k >= 1) && hi.filter(h => h.help).length === (k >= 1 ? 1 : 0), `${tag} after miss ${k + 1} the right plate ${k >= 1 ? 'glows' : 'does not glow'}`);
      }
      await dragTo(page, right0); await wait(500); st = await state(page); hi = await houseInfo(page); li = await letterInfo(page);
      is(st.at === 1 && st.open[right0] && hi[right0].open && hi[right0].disabled && !hi[right0].help, `${tag} the right door opens and is done`);
      const who = st.residents[right0];
      is(!!hi[right0].img && /^\/image-library-webp\/themes\/animals\//.test(hi[right0].img.src) && hi[right0].img.nat > 0 && hi[right0].img.w >= 96 && hi[right0].img.h >= 96 && hi[right0].img.alt === label(who, loc), `${tag} the resident ${who} steps out (${hi[right0].img && hi[right0].img.w.toFixed(0)} px, alt "${hi[right0].img && hi[right0].img.alt}")`);
      is(hi[right0].label === interp(S('houseDone'), { h: n0 }) + ' — ' + label(who, loc), `${tag} house label names the delivery and the neighbour`);
      is(li.dots.join() === 'done,now,wait' && li.label === interp(S('letterLabel'), { n: st.letters[1] }) && (await note(page)).text === S('noteNext'), `${tag} the next letter is up, noteNext`);
      /* an open door takes nothing */
      await dragTo(page, right0); st = await state(page);
      is(st.at === 1 && st.misses === 0, `${tag} an open door takes no more letters`);
      await clickSel(page, '.lcs-activity-check');
      is((await bubble(page)).text === S('hintUnfinished'), `${tag} Check mid-way → hintUnfinished`);
      /* letters 2 and 3 straight to their doors; the round checks itself */
      await page.evaluate(() => { window.__lastResize = null; window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
      for (let k = 1; k < 3; k++) { st = await state(page); await dragTo(page, st.houses.indexOf(st.letters[k])); await wait(450); }
      await wait(1300);
      st = await state(page); hi = await houseInfo(page);
      is(st.done && st.open.filter(Boolean).length === 3 && hi.filter(h => h.open && h.img).length === 3, `${tag} three doors open with three residents`);
      const b = await bubble(page);
      is((await celebrated(page)) && b.text === interp(S('celebrate'), { a: st.letters[0], b: st.letters[1], c: st.letters[2] }), `${tag} Check fired itself → celebrate (got "${b.text}")`);
      is((await note(page)).done && (await note(page)).text === S('noteDone') && (await letterInfo(page)).hidden && (await letterInfo(page)).dots.join() === 'done,done,done', `${tag} the strip says done; the van is empty`);
      is(hi.every(h => h.disabled), `${tag} every door disabled when done`);
      const rs = await page.evaluate(() => ({ sent: window.__lastResize, app: Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height) }));
      is(rs.sent !== null && Math.abs(rs.sent - rs.app) <= 6, `${tag} a completed round broadcasts the card height (sent ${rs.sent}, card ${rs.app})`);
      if (SHOT && ri === 4) await page.screenshot({ path: path.join(SHOT, `lb-${loc}-done.png`) });
      await clickSel(page, '.lcs-activity-next'); await wait(150);
      st = await state(page);
      is(!st.done && st.at === 0 && st.open.every(o => !o) && !(await letterInfo(page)).hidden, `${tag} Next clears`);
    }
    /* settings: to 10 → the eight small streets; spoken → the speaker until Show; a wrong door says wrongSpoken */
    await setSetting(page, 'range', 'to10');
    let st = await state(page);
    is(st.range === 'to10' && (await page.evaluate(() => window.LetterboxActivity._pool.length)) === 8 && st.houses.every(n => n <= 10), `[${loc}] range to 10: eight streets, every plate ≤ 10`);
    await setSetting(page, 'range', 'to20'); await setSetting(page, 'address', 'spoken'); await forceRound(page, 4);
    st = await state(page); let li = await letterInfo(page);
    is(st.spoken && !st.revealed && li.speaker && li.inks === 0 && li.hiddenNumber && li.label === S('letterSpokenLabel') && (await promptText(page)) === S('promptSpoken') && (await note(page)).text === S('noteSpoken'), `[${loc}] spoken: the letter shows a speaker, promptSpoken, noteSpoken`);
    is(!(await page.evaluate(() => document.querySelector('.lb-show').hidden)) && !(await page.evaluate(() => document.querySelector('.lb-show').disabled)), `[${loc}] Show is offered`);
    { const right = st.houses.indexOf(st.letters[0]), wrong = [0, 1, 2, 3, 4].find(i => i !== right); await dragTo(page, wrong); const nt = await note(page); st = await state(page);
      is(nt.slip && nt.text === interp(S('wrongSpoken'), { h: st.houses[wrong] }) && st.misses === 1, `[${loc}] spoken: a wrong door says wrongSpoken (got "${nt.text}")`); }
    await clickSel(page, '.lb-show'); st = await state(page); li = await letterInfo(page);
    is(st.revealed && !li.speaker && li.inks > 0 && (await page.evaluate(() => document.querySelector('.lb-show').disabled)), `[${loc}] Show reveals the handwritten number`);
    await dragTo(page, st.houses.indexOf(st.letters[0])); await wait(500); st = await state(page); li = await letterInfo(page);
    is(st.at === 1 && !st.revealed && li.speaker, `[${loc}] the next letter is hidden again`);
    await setSetting(page, 'address', 'written'); st = await state(page);
    is(!st.spoken && st.revealed && (await page.evaluate(() => document.querySelector('.lb-show').hidden)), `[${loc}] written: Show is hidden`);
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  /* width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    await forceRound(page, 4);
    const stageW = await page.evaluate(() => document.querySelector('.lb-wrap').clientWidth);
    const L = CORE.layout(stageW);
    const m = await page.evaluate(() => {
      const hs = [...document.querySelectorAll('.lb-house')].map(b => b.getBoundingClientRect());
      const van = document.querySelector('.lb-van').getBoundingClientRect();
      const letter = document.querySelector('.lb-letter').getBoundingClientRect();
      const strip = document.querySelector('.lb-strip').getBoundingClientRect();
      const tools = [...document.querySelectorAll('.lb-tool')].filter(b => !b.hidden).map(b => b.getBoundingClientRect());
      const wrap = document.querySelector('.lb-wrap').getBoundingClientRect();
      const plate = document.querySelector('.lb-plate').getBoundingClientRect();
      return { rows: new Set(hs.map(r => Math.round(r.top))).size, minW: Math.min(...hs.map(r => r.width)), overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inView: hs.concat([van, strip]).every(r => r.left >= -1 && r.right <= window.innerWidth + 1), vanInStreet: !!document.querySelector('.lb-street .lb-van'), letterW: letter.width, letterH: letter.height, toolH: Math.min(...tools.map(r => r.height)), toolW: Math.min(...tools.map(r => r.width)), fill: (Math.max(...hs.map(r => r.right)) - Math.min(...hs.map(r => r.left))) / wrap.width, plateH: plate.height, vanTop: van.top, houseTop: hs[0].top };
    });
    const tag = `[en @${w}]`;
    is(m.rows === (L.mode === 'row' ? 1 : 2) && m.vanInStreet === (L.mode === 'grid'), `${tag} ${L.mode}: ${m.rows} row(s), van ${m.vanInStreet ? 'in the street' : 'at the kerb'}`);
    is(m.overflow <= 2 && m.inView, `${tag} no overflow; houses, van and strip inside the viewport`);
    is(Math.abs(m.minW - L.hw) <= 1 && m.minW >= (L.mode === 'row' ? 102 : 90), `${tag} house ${m.minW.toFixed(0)} px`);
    is(m.fill >= 0.9, `${tag} the street fills ${(m.fill * 100).toFixed(0)} % of the stage`);
    is(m.toolH >= 44 && m.toolW >= 44 && m.letterW >= (L.mode === 'row' ? 150 : L.hw - 13) && m.letterH >= 0.7 * m.letterW, `${tag} tools ≥ 44; letter ${m.letterW.toFixed(0)}×${m.letterH.toFixed(0)} (house ${L.hw})`);
    is(m.plateH >= 17, `${tag} the plate numeral is ${m.plateH.toFixed(0)} px tall`);
    /* a real drag delivers at this width too */
    const st = await state(page);
    await dragTo(page, st.houses.indexOf(st.letters[0])); await wait(500);
    const st2 = await state(page), hi = await houseInfo(page);
    const img = hi.find(h => h.img);
    is(st2.at === 1 && !!img && img.img.w >= (w >= 700 ? 96 : 64), `${tag} the first letter delivers by a real drag; the resident is ${img ? img.img.w.toFixed(0) : 0} px`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `lb-en-${w}.png`), fullPage: true });
    is(errs.length === 0, `[en @${w}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-letterbox: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
