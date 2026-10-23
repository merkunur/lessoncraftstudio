#!/usr/bin/env node
/* =====================================================================
   local-test-lamplight-cupboard.js — ACTIVITY #80, The Lamplight Cupboard
   (Sock & Shadow, SL.K.6), in a real browser with REAL pointer clicks
   (never a model call to make a move). For every locale:
     · Fetch it: the tube with nothing said is a hint, no miss; tapping a
       thing says its noun and the lamps light exactly the things it fits;
       two cups lit = a jam; one wrong thing = "no ring"; a word that fits
       nothing = the dark cupboard; a word past Shadow's memory rolls the
       FIRST word off (memory 2); miss 2 puts badges on the cupboard; a word
       in the sentence goes back on a tap; the detail word lets ONE thing
       through, the line names the phrase and a ticket spears the spike;
     · Tell how you feel: a reason alone = "how do you feel?"; a face alone
       = "why?" and all three helps light; the wrong face is its own hint;
       miss 2 makes the right face and reason glow; the face + reason
       succeeds; please is ungraded;
     · Lamps "only after I speak": nothing lights before the tube;
     · en: the keyboard;
     · every round of both levels at rest AND solved at 320–1366: every
       control above the fold at rest, the success line in view when
       solved, no sideways scroll, every control ≥ 44 px, every library
       picture at its floor, no card's label spilling out of its card.
   Usage: node scripts/local-test-lamplight-cupboard.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '080-lamplight-cupboard', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'lamplight-cupboard-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, LamplightCupboardCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'lamplight-cupboard-activity.js'), 'utf8') + '\n;this.__A = LamplightCupboardActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
const fill = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, x) => x in a ? a[x] : m);
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(LIB, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/lamplight-cupboard-activity.html?activity=sock-and-shadow.puppet-speak.sl-k-6&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.LamplightCupboardActivity && window.LamplightCupboardActivity.st && document.querySelector('.lc-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.LamplightCupboardActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, idx, opts) {
    await page.evaluate((level, idx, o) => { const a = window.LamplightCupboardActivity; a.api.settings.level = level; a.api.settings.memory = (o && o.memory) || '3'; a.api.settings.lamps = (o && o.lamps) || 'live'; a._pool = null; a._ensurePool(); a._start(idx); a._render2(); }, level, idx, opts || {});
    await page.waitForFunction(() => { const im = [...document.querySelectorAll('.lc-wrap img.lc-pic')]; return im.length >= 1 && im.every(i => i.complete && i.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(60);
  }
  const st = (page) => page.evaluate(() => { const s = window.LamplightCupboardActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, door: s.last && s.last.door, help: s.help, strip: s.strip.slice(), pegs: s.pegs.slice(), dropped: s.dropped.slice(), r: s.r }; });
  const note = (page) => page.evaluate(() => document.querySelector('.lc-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(40); return true;
  }
  const say = (page, w, tag) => click(page, w[0] === 'n' || w[0] === 'f' ? `.lc-cubby[data-w="${w}"]` : `[data-k="chip-${w}"]`, tag);
  const tube = (page, tag) => click(page, '.lc-tube', tag);
  const litNow = (page) => page.evaluate(() => [...document.querySelectorAll('.lc-cubby.is-lit')].map(e => +e.getAttribute('data-c')).sort((a, b) => a - b));
  const shelfOf = (r, i) => r.things[i].shelf === 'T' ? 'h:top' : 'h:bottom';

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- Fetch it: the two cups (round 2) ---- */
    let tag = `${loc} cups`;
    await force(page, 'l1', 2);
    let s = await st(page);
    await tube(page, tag); s = await st(page);
    is(s.misses === 0 && s.last === 'empty' && sp(await note(page)) === sp(T(loc, 'hEmpty')), `${tag}: the tube with nothing said is a hint, no miss`);
    await say(page, 'n:cup', tag); s = await st(page);
    const cups = s.r.things.filter(t => t.noun === 'cup').map(C.cubby).sort((a, b) => a - b);
    is(s.strip.join() === 'n:cup' && (await litNow(page)).join() === cups.join(), `${tag}: tapping a cup says "cup" and lights both cups (${await litNow(page)})`);
    await tube(page, tag); s = await st(page);
    is(s.misses === 1 && s.last === 'jam' && s.door === 'jam' && sp(await note(page)) === sp(T(loc, 'hJam')), `${tag}: two cups lit jam in the door`);
    await click(page, '[data-k="word-n:cup"]', tag); await say(page, 'n:ball', tag); s = await st(page);
    is(s.strip.join() === 'n:ball', `${tag}: a word in the sentence goes back on a tap`);
    await tube(page, tag); s = await st(page);
    is(s.misses === 2 && s.last === 'wrong' && sp(await note(page)) === sp(T(loc, 'hMiss2')), `${tag}: one wrong thing, now miss 2`);
    is(await count(page, '.lc-badge') >= 1 && await count(page, '.lc-chip.is-help, .lc-cubby.is-help') >= 1, `${tag}: miss 2 badges the cupboard and glows the telling word`);
    await click(page, '[data-k="word-n:ball"]', tag); await say(page, 'n:cup', tag); await say(page, 's:small', tag); s = await st(page);
    is(s.help === 0 && await count(page, '.lc-badge') === 0, `${tag}: a new word takes the help away`);
    await tube(page, tag); s = await st(page);
    const said = C.phraseText(C.build(loc, ['n:cup', 's:small']));
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okL1'), { p: said })), `${tag}: one thing through — «${await note(page)}»`);
    is(await count(page, '.lc-ticket') >= 1 && await count(page, '.lc-hatch.is-open') === 1, `${tag}: the ticket spears the spike, the hatch opens`);
    /* ---- the wrong shelf (round 3): nothing fits ---- */
    tag = `${loc} dark`;
    await force(page, 'l1', 3); s = await st(page);
    const kite = s.r.things.find(t => t.noun === 'kite');
    await say(page, 'n:kite', tag); await say(page, shelfOf(s.r, s.r.target), tag); s = await st(page);
    is(kite.shelf !== s.r.things[s.r.target].shelf && (await litNow(page)).length === 0, `${tag}: the kite on the target's shelf lights nothing`);
    await tube(page, tag); s = await st(page);
    is(s.last === 'none' && sp(await note(page)) === sp(T(loc, 'hNone')) && await count(page, '.lc-hatch.is-none') === 1, `${tag}: the dark cupboard says nothing fits`);
    /* ---- memory 2: the first word rolls off (round 2) ---- */
    tag = `${loc} memory`;
    await force(page, 'l1', 2, { memory: '2' }); s = await st(page);
    for (const w of ['s:small', shelfOf(s.r, s.r.target), 'n:cup']) await say(page, w, tag);
    await tube(page, tag); s = await st(page);
    is(s.last === 'overflow' && s.dropped.join() === 's:small' && sp(await note(page)) === sp(fill(T(loc, 'hOverflow'), { n: 2 })), `${tag}: the third word knocks "small" off (${s.dropped}) and the cups jam`);
    is(await count(page, '.lc-bead.is-rolled') === 1, `${tag}: the rolled bead is on the floor`);
    /* ---- Tell how you feel (round 0) ---- */
    tag = `${loc} feel`;
    await force(page, 'l2', 0); s = await st(page);
    await say(page, 'r:rain', tag); await tube(page, tag); s = await st(page);
    is(s.last === 'noFeel' && sp(await note(page)) === sp(T(loc, 'hNoFeel')), `${tag}: a reason alone asks how you feel`);
    await say(page, 'f:happy', tag); await tube(page, tag); s = await st(page);
    is(s.last === 'wrongFace' && sp(await note(page)) === sp(T(loc, 'hMiss2f')), `${tag}: the wrong face, miss 2`);
    is(await count(page, '.lc-cubby.is-help[data-w="f:sad"]') === 1 && await count(page, '.lc-chip.is-help[data-w="r:rain"]') === 1, `${tag}: miss 2 glows the face and the reason`);
    await say(page, 'f:sad', tag); await say(page, 'p:please', tag); await tube(page, tag); s = await st(page);
    const said2 = C.phraseText(C.buildFeel(loc, ['f:sad', 'r:rain', 'p:please']));
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okL2'), { p: said2 })), `${tag}: face + reason + please — «${await note(page)}»`);
    tag = `${loc} why`;
    await force(page, 'l2', 2); await say(page, 'f:tired', tag); await tube(page, tag); s = await st(page);
    is(s.last === 'noWhy' && sp(await note(page)) === sp(T(loc, 'hNoWhy')), `${tag}: a face alone asks why`);
    is(await page.evaluate(() => { const r = window.LamplightCupboardActivity.st.r; return [...document.querySelectorAll('.lc-cubby.is-lit')].filter(e => +e.getAttribute('data-c') >= 3).length; }) === 3, `${tag}: no reason lights all three helps`);
    await force(page, 'l2', 2); await say(page, 'f:sad', tag); await say(page, 'r:late', tag); await tube(page, tag); s = await st(page);
    is(s.last === 'wrongFace' && sp(await note(page)) === sp(T(loc, 'hWrongFace')), `${tag}: the wrong face has its own hint`);
    /* ---- lamps only after speaking ---- */
    tag = `${loc} after`;
    await force(page, 'l1', 2, { lamps: 'after' });
    is(await count(page, '.lc-pelmet') >= 1, `${tag}: the pelmet hides the lamps`);
    await say(page, 'n:cup', tag);
    is((await litNow(page)).length === 0, `${tag}: nothing lights before the tube`);
    await tube(page, tag);
    is((await litNow(page)).length === 2, `${tag}: the tube shows the two lit cups`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- en: the keyboard ---- */
  {
    const { page } = await open(1024, 'en'); const tag = 'en keys';
    await force(page, 'l1', 2);
    await page.focus('.lc-cubby[data-w="n:cup"]'); await page.keyboard.press('Enter'); await wait(40);
    await page.focus('[data-k="chip-s:small"]'); await page.keyboard.press('Enter'); await wait(40);
    let s = await st(page); is(s.strip.join() === 'n:cup,s:small', `${tag}: Enter says a thing and a word (${s.strip})`);
    await page.focus('.lc-tube'); await page.keyboard.press('Enter'); await wait(60);
    s = await st(page); is(s.done, `${tag}: Enter on the tube tells Shadow`);
    await page.close();
  }

  /* ---- every round of both levels at rest and solved, 320–1366 ---- */
  for (const loc of LOCS) for (const w of WIDTHS) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) for (const idx of C.ids(lv)) for (const state of ['rest', 'solved']) {
      const tag = `${loc} @${w} ${lv}.${idx} ${state}`;
      await force(page, lv, idx);
      if (state === 'solved') {
        await page.evaluate(() => { const a = window.LamplightCupboardActivity, C = window.LamplightCupboardCore, s = a.st, r = s.r;
          if (r.level === 'l1') { const ws = r.chips.concat(r.say); let best = null;
            for (let k = 1; k <= 3 && !best; k++) for (let m = 1; m < (1 << ws.length) && !best; m++) { const p = ws.filter((c, b) => m & (1 << b)); if (p.length !== k || new Set(p.map(x => x[0])).size !== k) continue; const L = C.litSet(r, p); if (L.length === 1 && L[0] === r.target) best = p; }
            best.forEach(x => C.addWord(s, x)); }
          else { C.addWord(s, 'f:' + r.feel); C.addWord(s, 'r:' + r.reason); if (r.chips.indexOf('p:please') >= 0) C.addWord(s, 'p:please'); }
          a._paint(); a._check(); });
        await page.waitForFunction(() => [...document.querySelectorAll('.lc-wrap img.lc-pic')].every(i => i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
        await wait(80);
      } else await page.evaluate(() => window.scrollTo(0, 0));
      const m = await page.evaluate(() => {
        const L = window.LamplightCupboardCore.layout(window.LamplightCupboardActivity._width()), out = { fails: [] };
        const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
        out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        out.low = Math.max.apply(null, [...document.querySelectorAll('.lc-chip,.lc-tube,.lc-cubby.is-say')].filter(vis).map(e => e.getBoundingClientRect().bottom));
        const nr = document.querySelector('.lc-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
        [...document.querySelectorAll('.lc-chip,.lc-tube,.lc-cubby.is-say,.lc-word')].filter(vis).forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        [...document.querySelectorAll('.lc-wrap img.lc-pic')].filter(vis).forEach(i => { const r = i.getBoundingClientRect(), floor = L.mode === 'wide' ? 96 : 64; if (Math.round(Math.min(r.width, r.height)) < floor) out.fails.push('picture ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' < ' + floor + ' ' + i.className); });
        [...document.querySelectorAll('.lc-chip')].filter(vis).forEach(c => { const t = c.querySelector('.lc-label'), rg = document.createRange(); rg.selectNodeContents(t); const T = rg.getBoundingClientRect(), R = c.getBoundingClientRect(); if (T.right > R.right + 1 || T.bottom > R.bottom + 1 || T.left < R.left - 1) out.fails.push('label spills: ' + t.textContent); });
        const r = window.LamplightCupboardActivity.st.r;
        if (r.level === 'l1') { const sz = { B: [], S: [] };
          r.things.forEach(t => { const c = document.querySelector('.lc-cubby[data-c="' + ((t.shelf === 'T' ? 0 : 3) + t.col) + '"] img.lc-pic'); if (c && vis(c)) sz[t.size].push(c.getBoundingClientRect().width); });
          if (sz.B.length && sz.S.length && Math.min.apply(null, sz.B) < 1.3 * Math.max.apply(null, sz.S)) out.fails.push('big ' + Math.round(Math.min.apply(null, sz.B)) + ' vs small ' + Math.round(Math.max.apply(null, sz.S)) + ': not visibly bigger'); }
        return out;
      });
      is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
      if (state === 'rest') is(m.low <= VH(w), `${tag}: every control above the fold (${Math.round(m.low)} ≤ ${VH(w)})`);
      else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`);
      is(m.fails.length === 0, `${tag}: ${m.fails.slice(0, 3).join('; ')}`);
      if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 0 || idx === 5)) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${idx}-${w}-${state}.png`), fullPage: true });
    }
    is(errs.length === 0, `${loc} @${w}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-lamplight-cupboard: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
