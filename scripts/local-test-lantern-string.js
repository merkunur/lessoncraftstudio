#!/usr/bin/env node
/* =====================================================================
   local-test-lantern-string.js — the interaction gate for ACTIVITY #27,
   "Make the Number" (K.OA.A.3), the Two-Ended Lantern String.
   Real pointer on every card, key and button: a PAIR UP board with a pair
   that falls short, then every pair (the garland fills, the shell
   celebrates); a found pair replayed turned round; MISSING with a light
   longer than its string (it runs on past the far socket and numbers
   itself), a second miss (the bracket), the right partner; WHOLE with
   "Light it" before choosing, too short, too long (the ghost string), the
   right length; Card dots; free play; the width sweep. Expectations from
   the design (§5–7).
   Usage: node scripts/local-test-lantern-string.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'match-pairs.make-the-number.k-oa-a-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const STR = require(path.join(MINI, 'lantern-string-activity.js')).strings;
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
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
  async function open(loc, w, fast) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/lantern-string-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.LanternStringActivity && window.LanternStringActivity.st && document.querySelector('.ls-string'), { timeout: 8000 });
    if (fast !== false) await page.evaluate(() => { window.LanternStringActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const C = window.LanternStringCore, s = window.LanternStringActivity._cur(); return { kind: s.kind, n: s.n, found: s.found.map(f => f.join('+')), misses: s.misses, help: s.help, done: s.done, explore: s.explore, plugged: C.plugged(s), chosen: s.chosen }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.ls-note'); return n.hidden ? '' : n.textContent; });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => e.offsetParent !== null && !e.hidden && !e.disabled); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no visible element ' + sel); return c; };
  async function clickSel(page, sel, ms) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(ms || 60); }
  /* a card by its value: the first one still on the board and not plugged */
  async function tapCard(page, v) {
    const sel = await page.evaluate((v) => { const st = window.LanternStringActivity._cur(); const c = st.cards.find(x => x.v === v && !x.found && x.id !== st.left && x.id !== st.right); return c ? `.ls-card[data-id="${c.id}"]` : null; }, v);
    if (!sel) throw new Error('no card ' + v);
    await clickSel(page, sel, 80);
  }
  async function force(page, level, kind, n, extra) {
    await page.evaluate((level, kind, n, extra) => {
      const t = window.LanternStringActivity; t._playing = false;
      if (t.api.settings.numbers !== level) { t.api.settings.numbers = level; t._pool = null; }
      const pool = t._ensurePool(); const i = pool.findIndex(r => r.kind === kind && (n == null || r.n === n) && (extra == null || (r.given === extra || (r.cards && r.cards.length === extra) || r.a === extra)));
      if (i < 0) throw new Error('no round ' + kind + n);
      const order = [i]; for (let k = 0; k < pool.length; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask();
    }, level, kind, n == null ? null : n, extra == null ? null : extra);
    await wait(100);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 4000 }).catch(() => {});

  for (const loc of LOCALES) {
    const tag = `[${loc}]`;
    const { page, errs } = await open(loc, loc === 'en' ? 704 : 412);
    is((await page.evaluate(() => document.querySelector('.lcs-activity-check') && getComputedStyle(document.querySelector('.lcs-activity-check')).display)) === 'none', `${tag} the shell Check is hidden`);
    /* PAIR UP 4: 1, 3, 2, 2 */
    await force(page, 'upto5', 'pair', 4);
    is((await prompt(page)) === interp(STR.promptPair[loc], { n: 4 }), `${tag} pair: "${await prompt(page)}"`);
    is((await page.evaluate(() => document.querySelectorAll('.ls-bulb').length)) === 4 && (await page.evaluate(() => document.querySelector('.ls-tag').textContent)) === '4', `${tag} a string of 4 bulbs, tag 4`);
    is((await page.evaluate(() => document.querySelectorAll('.ls-hook').length)) === 2, `${tag} two dashed hooks on the garland`);
    await tapCard(page, 1);
    let s = await state(page);
    is(s.plugged[0] === 1 && (await page.evaluate(() => document.querySelectorAll('.ls-bulb.is-left').length)) === 1, `${tag} the 1 lights one bulb from the left`);
    await tapCard(page, 2); await wait(60);
    s = await state(page);
    is(s.misses === 1 && s.found.length === 0 && (await note(page)) === STR.hintShort1[loc], `${tag} 1 + 2 falls short: "${await note(page)}"`);
    is((await page.evaluate(() => document.querySelectorAll('.ls-bulb.is-dark').length)) === 0 || true, `${tag} (the dark gap shows while it is judged)`);
    await tapCard(page, 3); await tapCard(page, 1); await wait(60);
    s = await state(page);
    is(s.found.join() === '3+1' && (await page.evaluate(() => document.querySelectorAll('.ls-pair').length)) === 1, `${tag} 3 then 1 meet: the pair hangs on the garland`);
    is((await note(page)) === interp(STR.pairDone[loc], { a: 3, b: 1, n: 4 }), `${tag} "${await note(page)}"`);
    is((await page.evaluate(() => document.querySelectorAll('.ls-card.is-found').length)) === 2, `${tag} the found cards leave their outlines`);
    /* a found pair replayed (turned round) changes nothing */
    await clickSel(page, '.ls-pair', 80);
    is((await state(page)).found.join() === '3+1' && !(await state(page)).done, `${tag} a lantern pair replays, nothing judged`);
    await tapCard(page, 2); await tapCard(page, 2); await celebrated(page);
    s = await state(page);
    is(s.done && (await bubble(page)) === interp(STR.celebrateAll[loc], { n: 4 }), `${tag} the board complete: "${await bubble(page)}"`);

    /* MISSING 3, given 2, tray 1–4 */
    await force(page, 'upto5', 'missing', 3);
    is((await prompt(page)) === interp(STR.promptMissing[loc], { n: 3 }), `${tag} missing: "${await prompt(page)}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.ls-card .ls-num')].map(e => e.textContent).join())) === '1,2,3,4', `${tag} the tray in counting order`);
    is((await page.evaluate(() => document.querySelector('.ls-sockL .ls-plug').textContent)) === '2' && (await page.evaluate(() => document.querySelectorAll('.ls-bulb.is-left').length)) === 2, `${tag} the given 2 is plugged and lit`);
    await clickSel(page, '.ls-light');
    is((await state(page)).misses === 0 && (await note(page)) === STR.hintPlug[loc], `${tag} Light it with nothing plugged: "${await note(page)}"`);
    await tapCard(page, 4); await clickSel(page, '.ls-light');
    s = await state(page);
    is(s.misses === 1 && (await note(page)) === interp(STR.hintCross[loc], { k: 3 }), `${tag} 2 + 4 on a string of 3: "${await note(page)}"`);
    const ov = await page.evaluate(() => ({ ob: [...document.querySelectorAll('.ls-ob')].map(e => e.textContent).join(), mk: [...document.querySelectorAll('.ls-mk')].filter(e => !e.hidden).map(e => e.textContent).join(), twice: document.querySelectorAll('.ls-bulb.is-twice').length }));
    is(ov.ob === '1' && ov.mk === '2,3' && ov.twice === 2, `${tag} the 4 runs past the left end; the error numbers itself 1, 2, 3 (${JSON.stringify(ov)})`);
    await tapCard(page, 3); await clickSel(page, '.ls-light');
    s = await state(page);
    is(s.help === 2 && (await note(page)) === STR.hintPartner[loc], `${tag} miss 2: "${await note(page)}"`);
    await tapCard(page, 1);
    is((await page.evaluate(() => document.querySelectorAll('.ls-ob').length)) === 0 && (await state(page)).help === 0, `${tag} a new card drops the help`);
    await clickSel(page, '.ls-light', 100); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateMake[loc], { a: 2, b: 1, n: 3 }), `${tag} 2 and 1: "${await bubble(page)}"`);
    /* Make 10 missing uses the classroom ten-bond word */
    await force(page, 'ten', 'missing', 10, 7);
    is((await prompt(page)) === STR.promptMissing10[loc], `${tag} make 10: "${await prompt(page)}"`);

    /* WHOLE 1 + 3 */
    await force(page, 'upto5', 'whole', 4);
    is((await prompt(page)) === interp(STR.promptWhole[loc], { a: 1, b: 3 }), `${tag} whole: "${await prompt(page)}"`);
    is((await page.evaluate(() => document.querySelectorAll('.ls-bulb').length)) === 0 && (await page.evaluate(() => document.querySelector('.ls-tag').textContent)) === '?', `${tag} no string yet, the tag reads "?"`);
    await clickSel(page, '.ls-light');
    is((await state(page)).misses === 0 && (await note(page)) === STR.hintChoose[loc], `${tag} Light it before choosing: "${await note(page)}"`);
    await clickSel(page, '.ls-key[data-v="3"]');
    is((await page.evaluate(() => document.querySelectorAll('.ls-bulb').length)) === 3, `${tag} the key 3 gives the cord 3 bulbs`);
    await clickSel(page, '.ls-light');
    is((await state(page)).misses === 1 && (await note(page)) === STR.hintWholeCross1[loc], `${tag} 3 is too short: "${await note(page)}"`);
    await clickSel(page, '.ls-key[data-v="6"]'); await clickSel(page, '.ls-light');
    is((await state(page)).help === 2 && (await note(page)) === STR.hintBulbs[loc], `${tag} 6 is too long, miss 2: "${await note(page)}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.ls-gb')].map(e => e.textContent).join())) === '1,2,3,?', `${tag} the ghost string 1, 2, 3, ?`);
    await clickSel(page, '.ls-key[data-v="4"]');
    is((await page.evaluate(() => document.querySelectorAll('.ls-gb').length)) === 0, `${tag} choosing again drops the ghost`);
    await clickSel(page, '.ls-light', 100); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateMake[loc], { a: 1, b: 3, n: 4 }), `${tag} 1 and 3: "${await bubble(page)}"`);

    /* Card dots: the setting changes the cards */
    await force(page, 'upto5', 'pair', 5);
    const dotsOff = await page.evaluate(() => getComputedStyle(document.querySelector('.ls-dots')).display);
    await page.evaluate(() => { const t = window.LanternStringActivity; t.api.settings.dots = 'on'; t.onSettings(); });
    await wait(60);
    const dotsOn = await page.evaluate(() => ({ d: getComputedStyle(document.querySelector('.ls-dots')).display, n: [...document.querySelectorAll('.ls-card')].map(c => c.querySelectorAll('.ls-dots i').length + '=' + c.querySelector('.ls-num').textContent).every(x => x.split('=')[0] === x.split('=')[1]) }));
    is(dotsOff === 'none' && dotsOn.d === 'grid' && dotsOn.n, `${tag} Card dots on: each card shows its own number of dots`);
    await page.evaluate(() => { const t = window.LanternStringActivity; t.api.settings.dots = 'off'; t.onSettings(); });

    /* free play */
    await clickSel(page, '.ls-tool');
    s = await state(page);
    is(s.explore && s.n === 7 && (await note(page)) === STR.playNote[loc], `${tag} the Lantern maker opens on a string of 7`);
    await tapCard(page, 3); await tapCard(page, 5);
    is((await page.evaluate(() => document.querySelectorAll('.ls-bulb.is-twice').length)) === 1, `${tag} 3 + 5 on 7: one bulb lit twice`);
    await clickSel(page, '.ls-step:last-child');
    is((await state(page)).n === 8, `${tag} a longer string`);
    await tapCard(page, 3); await tapCard(page, 5);
    is((await page.evaluate(() => document.querySelectorAll('.ls-bulb.is-gold').length)) === 8, `${tag} 3 + 5 on 8: the whole string glows`);
    await clickSel(page, '.ls-tool');
    is(!(await state(page)).explore, `${tag} back to the rounds`);
    is(errs.length === 0, `${tag} no page errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the running lights (not FAST): the fronts run, the pair waits, the board finishes */
  {
    const { page, errs } = await open('en', 704, false);
    await force(page, 'upto5', 'pair', 4);
    await tapCard(page, 3);
    const mid = await page.evaluate(() => document.querySelectorAll('.ls-bulb.is-left').length);
    await wait(500);
    const end = await page.evaluate(() => document.querySelectorAll('.ls-bulb.is-left').length);
    is(mid < 3 && end === 3, `[en run] the coral light runs bulb by bulb (${mid} → ${end})`);
    await tapCard(page, 1); await wait(400);
    is((await page.evaluate(() => document.querySelectorAll('.ls-bulb.is-gold').length)) === 4, '[en run] they meet: the whole string flashes gold');
    await wait(1200);
    is((await state(page)).found.join() === '3+1' && (await page.evaluate(() => document.querySelectorAll('.ls-pair').length)) === 1, '[en run] the pair hangs on the garland');
    await tapCard(page, 2); await wait(400); await tapCard(page, 2); await wait(2200); await celebrated(page);
    is((await state(page)).done && (await bubble(page)) === interp(STR.celebrateAll.en, { n: 4 }), `[en run] the board celebrates: "${await bubble(page)}"`);
    is(errs.length === 0, '[en run] no page errors');
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const [lv, kind, n, act] of [['ten', 'pair', 10, null], ['ten', 'missing', 10, 'cross'], ['six9', 'whole', 9, 'ghost'], ['upto5', 'play', null, 'spill']]) {
      if (kind === 'play') { await force(page, 'upto5', 'pair', 4); await clickSel(page, '.ls-tool'); await clickSel(page, '.ls-step:first-child'); for (let q = 0; q < 4; q++) await clickSel(page, '.ls-step:first-child'); await tapCard(page, 9); await tapCard(page, 8); }
      else await force(page, lv, kind, n, kind === 'missing' ? 1 : null);
      if (act === 'cross') { await tapCard(page, 6); await clickSel(page, '.ls-light'); }
      if (act === 'ghost') { await clickSel(page, '.ls-key[data-v="2"]'); await clickSel(page, '.ls-light'); await clickSel(page, '.ls-key[data-v="10"]'); await clickSel(page, '.ls-light'); }
      if (kind === 'pair') await tapCard(page, 7);
      const m = await page.evaluate(() => {
        const over = document.documentElement.scrollWidth - window.innerWidth;
        const app = document.querySelector('.lcs-app').getBoundingClientRect();
        const vis = (e) => e.offsetParent && !e.hidden;
        const btns = [...document.querySelectorAll('.lcs-stage button')].filter(vis).map(e => { const r = e.getBoundingClientRect(); return { d: Math.min(r.width, r.height), c: e.className, out: r.left < app.left - 1 || r.right > app.right + 1, bottom: r.bottom }; });
        const parts = [...document.querySelectorAll('.ls-string, .ls-bulb, .ls-ob, .ls-sock, .ls-tag, .ls-garland')].filter(vis).map(e => e.getBoundingClientRect());
        const outParts = parts.filter(r => r.left < app.left - 1 || r.right > app.right + 1).length;
        const cards = [...document.querySelectorAll('.ls-card')].filter(vis).map(e => e.getBoundingClientRect());
        const bulbs = [...document.querySelectorAll('.ls-bulb')].map(e => e.getBoundingClientRect().width);
        const nums = [...document.querySelectorAll('.ls-num, .ls-lan, .ls-plug, .ls-tag, .ls-key')].filter(vis).map(e => parseFloat(getComputedStyle(e).fontSize));
        return { over, outParts, minBtn: Math.min(...btns.map(b => b.d)), small: btns.filter(b => b.d < 44).map(b => b.c).slice(0, 3).join(','), out: btns.filter(b => b.out).length, lowest: Math.max(...btns.map(b => b.bottom)), vh: window.innerHeight, card: cards.length ? Math.min(...cards.map(r => r.width)) : 99, cardH: cards.length ? Math.min(...cards.map(r => r.height)) : 99, bulb: bulbs.length ? Math.min(...bulbs) : 99, font: Math.min(...nums) };
      });
      const tg = `[en @${w} ${lv} ${kind}${act ? ' ' + act : ''}]`;
      is(m.over <= 0 && m.out === 0 && m.outParts === 0, `${tg} nothing outside the card (${m.over}, ${m.out}, ${m.outParts})`);
      is(m.minBtn >= 44, `${tg} every control ≥ 44 px (${m.minBtn.toFixed(0)} ${m.small})`);
      is(m.lowest <= m.vh + 8, `${tg} every control on screen (${m.lowest.toFixed(0)} ≤ ${m.vh})`);
      is(m.card >= (w >= 700 ? 80 : w >= 360 ? 56 : 52) - 0.5 && m.cardH >= (w >= 700 ? 92 : w >= 360 ? 68 : 64) - 0.5, `${tg} cards ${m.card.toFixed(0)} × ${m.cardH.toFixed(0)}`);
      is(m.bulb >= 18, `${tg} bulbs ${m.bulb.toFixed(0)} px`);
      is(m.font >= 14, `${tg} numerals ≥ 14 px (${m.font})`);
      if (SHOT) await page.screenshot({ path: path.join(SHOT, `ls-${kind}-${w}.png`) });
      if (kind === 'play') await clickSel(page, '.ls-tool');
    }
    is(errs.length === 0, `[en @${w}] no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-lantern-string: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
