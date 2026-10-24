#!/usr/bin/env node
/* =====================================================================
   local-test-sign-beam.js — ACTIVITY #88, The Equal-Sign Beam ("Numbers
   Court", 1.OA.D.7), in a real browser with REAL clicks on the stamps,
   the gavel, the dial and the turn chip, and the keyboard (never a model
   call to make a move). For every locale:
     · True or false, 6 + 2 = 8 + 1: the gavel with no stamp is hStamp, not
       a miss; = then the gavel: the seal HOLDS, the beam does not move,
       the pans pour 8 and 9 dots (hEvid); again: threads pair 8, one dot
       left over glows (hPair); ≠ then the gavel: the seal breaks, the beam
       tips toward the 9 (right end down), okFalse; the dial starts on 2 in
       the left pan's gold crate; − to 1 and the gavel: tips again, hLight;
       + + to 3 and the gavel: flat, okFixed "6 + 3 = 8 + 1", the claim card
       turns gold; the turn chip rewrites it "8 + 1 = 6 + 3", okTurn;
     · 3 + 5 = 5 + 3 by the keyboard: Enter on the = stamp, G → okTrue 8;
     · Make it balance, 14 − □ = 6 + 4: an empty dial is hDial; − does
       nothing; + to 1 and the gavel: the gold crate takes away too little
       (hTakeMore); ↑ ↑ ↑ to 4 and the gavel: flat, okFixed.
   And every round of both modes and both levels at rest, at the second
   miss / second tip (the evidence on screen) and solved — each state
   reached ONCE per locale by real clicks, then the window resized through
   320–1366 and measured at every width: no sideways scroll, every control
   ≥ 44 px, the controls above the fold at rest, the note AND the gavel in
   view after a miss, the beam's angle right for the state, the pictures
   loaded and clear of the claim card, the claim card not overflowing.
   Usage: node scripts/local-test-sign-beam.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '088-sign-beam', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'sign-beam-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, SignBeamCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'sign-beam-activity.js'), 'utf8') + '\n;this.__A = SignBeamActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const sp = (s) => String(s).replace(/[   ]/g, ' ');
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
    await page.goto(`${base}/sign-beam-activity.html?activity=numbers-court.judge-balance.1-oa-d-7&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SignBeamActivity && window.SignBeamActivity.st && document.querySelector('.sb-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.SignBeamActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, mode, level, idx) {
    await page.evaluate((mode, level, idx) => { const a = window.SignBeamActivity; a.api.settings.claims = mode; a.api.settings.numbers = level; a._pool = null; a._ensurePool(); a._start(idx, idx); a._render2(); window.scrollTo(0, 0); }, mode, level, idx);
    await page.waitForFunction(() => [...document.querySelectorAll('.sb-tess,.sb-wit')].length === 2 && [...document.querySelectorAll('.sb-tess,.sb-wit')].every(i => i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.SignBeamActivity.st; return { done: s.done, misses: s.misses, rmisses: s.rmisses, phase: s.phase, stamp: s.stamp, dial: s.dial, shape: s.shape, turned: s.turned }; });
  const note = (page) => page.evaluate(() => document.querySelector('.sb-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const ang = (page) => page.evaluate(() => +document.querySelector('.sb-beam').getAttribute('data-ang'));
  const claim = (page) => page.evaluate(() => document.querySelector('.sb-claim-t').textContent);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const stampBtn = (page, v, tag) => click(page, `[data-k="stamp-${v}"]`, tag);
  const gavel = (page, tag) => click(page, '[data-k="gavel"]', tag);
  const nudge = (page, d, tag) => click(page, `[data-k="${d > 0 ? 'plus' : 'minus'}"]`, tag);
  async function setDial(page, want, tag) { let s = await st(page), guard = 0; while (s.dial !== want && guard++ < 25) { await nudge(page, s.dial == null || s.dial < want ? 1 : -1, tag); s = await st(page); } }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- True or false: 6 + 2 = 8 + 1 ---- */
    let tag = `${loc} 6+2=8+1`;
    await force(page, 'tf', '10', 8);
    is(sp(await claim(page)) === '6 + 2 = 8 + 1' && await count(page, '.sb-seal') === 1 && await ang(page) === 0, `${tag}: the claim, the seal, the beam flat`);
    is(await page.evaluate(() => [...document.querySelectorAll('.sb-tess,.sb-wit')].every(i => i.naturalWidth > 0)), `${tag}: Tess and the witness are loaded library pictures`);
    await gavel(page, tag); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hStamp')) && await count(page, '.sb-stamp.is-bob') === 2, `${tag}: the gavel with no stamp is hStamp, the stamps bob, not a miss`);
    await stampBtn(page, 'eq', tag); await gavel(page, tag); s = await st(page);
    const dots = await page.evaluate(() => { const a = [...document.querySelectorAll('.sb-dot')].filter(d => !d.classList.contains('is-gone')); return a.length; });
    is(s.misses === 1 && await ang(page) === 0 && await count(page, '.sb-seal') === 1 && sp(await note(page)) === sp(T(loc, 'hEvid')) && dots === 17 && await count(page, '.sb-thread') === 0, `${tag}: a wrong ruling: the seal holds, the beam stays, 8 + 9 dots (${dots}), hEvid`);
    await gavel(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hPair')) && await count(page, '.sb-thread') === 8 && await count(page, '.sb-dot.is-extra') === 1, `${tag}: miss 2: 8 threads, 1 dot left over glows (hPair)`);
    await stampBtn(page, 'ne', tag); s = await st(page);
    is(s.stamp === 'ne' && await count(page, '.sb-dot') === 0 && sp(await note(page)) === '', `${tag}: a new stamp takes the help away`);
    await gavel(page, tag); s = await st(page);
    const pans = await page.evaluate(() => [...document.querySelectorAll('.sb-pan')].map(p => p.getBoundingClientRect().top));
    is(s.phase === 'repair' && await ang(page) > 4 && await count(page, '.sb-seal') === 0 && pans[1] > pans[0] + 10 && sp(await note(page)) === sp(T(loc, 'okFalse', { l: 8, r: 9 })), `${tag}: ≠ breaks the seal, the beam tips toward the 9 (${await ang(page)}°), okFalse`);
    is(s.dial === 2 && await count(page, '.sb-crate.is-dial[data-side="L"][data-pos="1"]') === 1, `${tag}: the dial starts on 2, the left pan's second crate is gold`);
    await nudge(page, -1, tag); s = await st(page);
    is(s.dial === 1 && await count(page, '.sb-seal') === 1 && await ang(page) === 0 && sp(await note(page)) === sp(T(loc, 'hRepair')), `${tag}: − to 1: a fresh seal, the beam level, hRepair`);
    await gavel(page, tag); s = await st(page);
    is(!s.done && s.rmisses === 1 && await ang(page) > 4 && sp(await note(page)) === sp(T(loc, 'hLight')), `${tag}: 7 against 9 tips again, the gold side is light (hLight)`);
    await setDial(page, 3, tag); await gavel(page, tag); s = await st(page);
    is(s.done && await ang(page) === 0 && await count(page, '.sb-bar.is-eq') === 1 && sp(await note(page)) === sp(T(loc, 'okFixed', { c: '6 + 3 = 8 + 1' })) && await count(page, '.sb-claim.is-gold') === 1, `${tag}: 3 lays the beam flat, okFixed, the claim card gold`);
    await click(page, '[data-k="turn"]', tag); s = await st(page);
    is(s.turned && sp(await claim(page)) === '8 + 1 = 6 + 3' && await ang(page) === 0 && sp(await note(page)) === sp(T(loc, 'okTurn')), `${tag}: turning the court rewrites the claim the other way round, still flat`);
    /* ---- 3 + 5 = 5 + 3 by the keyboard ---- */
    tag = `${loc} 3+5=5+3`;
    await force(page, 'tf', '10', 0);
    await page.focus('[data-k="stamp-eq"]'); await page.keyboard.press('Enter'); await wait(20);
    await page.keyboard.press('g'); await wait(40); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okTrue', { n: 8 })), `${tag}: Enter on = then G → okTrue 8`);
    /* ---- Make it balance: 14 − □ = 6 + 4 ---- */
    tag = `${loc} 14−□=6+4`;
    await force(page, 'mb', '20', 6);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text') ? document.querySelector('.lcs-activity-prompt-text').textContent : '')) === sp(T(loc, 'tLineMB')), `${tag}: the task line is tLineMB`);
    is(await count(page, '[data-k="minus"]:disabled') === 1 && await count(page, '.sb-stamp') === 0, `${tag}: no stamps; − sleeps on an empty dial`);
    await gavel(page, tag); s = await st(page);
    is(s.rmisses === 0 && sp(await note(page)) === sp(T(loc, 'hDial')), `${tag}: an empty dial is hDial, not a try`);
    await nudge(page, 1, tag); await gavel(page, tag); s = await st(page);
    is(s.dial === 1 && s.rmisses === 1 && sp(await note(page)) === sp(T(loc, 'hTakeMore')), `${tag}: 13 against 10: the gold crate takes away too little (hTakeMore)`);
    await page.focus('[data-k="gavel"]'); for (let k = 0; k < 3; k++) { await page.keyboard.press('ArrowUp'); await wait(15); }
    s = await st(page); is(s.dial === 4, `${tag}: ↑ ↑ ↑ sets the dial to 4`);
    await gavel(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okFixed', { c: '14 − 4 = 6 + 4' })), `${tag}: 4 balances (${await note(page)})`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round, at rest, at the second miss / second tip and solved — reached ONCE per locale, then resized through every width ---- */
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.closest('[hidden]'); };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const ctrls = [...document.querySelectorAll('.sb-stamp,.sb-gavel,.sb-nudge,.sb-turn,.sb-dial')].filter(vis);
    out.low = Math.max.apply(null, ctrls.map(e => e.getBoundingClientRect().bottom).concat([0]));
    ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
    const nr = document.querySelector('.sb-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const g = document.querySelector('.sb-gavel'); if (g) { const q = g.getBoundingClientRect(); out.gTop = q.top; out.gBottom = q.bottom; }
    const W = document.querySelector('.sb-wrap').getBoundingClientRect(), svg = document.querySelector('.sb-svg').getBoundingClientRect();
    if (svg.left < W.left - 1 || svg.right > W.right + 1) out.fails.push('the court is wider than the card');
    out.svgW = Math.round(svg.width); out.wrapW = Math.floor(W.width);
    const card = document.querySelector('.sb-claim'), cr = card.getBoundingClientRect();
    { const t = document.querySelector('.sb-claim-t').getBoundingClientRect(); if (t.left < cr.left + 2 || t.right > cr.right - 2) out.fails.push('the claim text does not fit its card'); }   /* (the ink badge hangs over the corner by design) */
    if (cr.left < W.left - 1 || cr.right > W.right + 1) out.fails.push('the claim card is outside');
    document.querySelectorAll('.sb-tess,.sb-wit').forEach(i => { const q = i.getBoundingClientRect(); if (!i.complete || !i.naturalWidth) out.fails.push('a picture did not load'); if (q.width < (W.width >= 560 ? 96 : 64) - 1) out.fails.push('a picture is small ' + Math.round(q.width)); if (q.right > cr.left + 1 && q.left < cr.right - 1) out.fails.push('a picture overlaps the claim'); });
    const svgEl = document.querySelector('.sb-svg'); document.querySelectorAll('.sb-crate rect,.sb-dot').forEach(e => { const q = e.getBoundingClientRect(); if (q.left < svg.left - 1 || q.right > svg.right + 1) out.fails.push('a crate or dot outside the court'); });
    out.ang = +document.querySelector('.sb-beam').getAttribute('data-ang');
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const mode of C.MODES) for (const level of C.LEVELS) for (const idx of C.ids(mode, level)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(mode, level, idx), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${mode}${level}.${idx} ${state}`, truth = C.isTrue(r), spot = r.fix || r.blank;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, mode, level, idx);
      let wantAng = 0;
      if (state === 'miss2') {
        if (mode === 'tf') { await stampBtn(page, truth ? 'ne' : 'eq', t0); await gavel(page, t0); await gavel(page, t0); }
        else { const rg = C.range(C.newState(r)), wrong = []; for (let x = rg.lo; x <= rg.hi && wrong.length < 2; x++) if (x !== spot.ans) wrong.push(x); const bad1 = wrong[0], bad2 = wrong[1];
          await setDial(page, bad1, t0); await gavel(page, t0); await setDial(page, bad2, t0); await gavel(page, t0); const v = C.values(r, { side: spot.side, pos: spot.pos, v: bad2 }); wantAng = C.angle(C.shapeOf(v.l, v.r), C.geometry(500)) > 0 ? 1 : -1; }
      }
      if (state === 'solved') { if (mode === 'tf') { await stampBtn(page, truth ? 'eq' : 'ne', t0); await gavel(page, t0); } if (spot) { await setDial(page, spot.ans, t0); await gavel(page, t0); } }
      const s0 = await st(page);
      if (state === 'miss2') is(mode === 'tf' ? s0.misses === 2 : s0.rmisses === 2, `${t0}: two misses`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${mode}${level}.${idx} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.sb-wrap'), s = document.querySelector('.sb-svg'); return e && s && Math.abs(+s.getAttribute('width') - Math.floor(e.getBoundingClientRect().width)) < 8; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the court repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(s1.done === s0.done && s1.misses === s0.misses && s1.rmisses === s0.rmisses && s1.dial === s0.dial && s1.phase === s0.phase, `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => { const n = document.querySelector('.sb-note'); n.scrollIntoView({ block: 'end', behavior: 'instant' }); });
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.low <= VH(w), `${tag}: the controls above the fold (${Math.round(m.low)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.nTop >= 0 && m.nBottom <= VH(w) + 1 && m.gTop >= 0 && m.gBottom <= VH(w) + 1, `${tag}: the note and the gavel in view after a miss (note ${Math.round(m.nTop)}–${Math.round(m.nBottom)}, gavel ${Math.round(m.gTop)}–${Math.round(m.gBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`);
        if (state === 'miss2') is(mode === 'tf' ? m.ang === 0 : Math.sign(m.ang) === wantAng, `${tag}: the beam ${mode === 'tf' ? 'stays level after a wrong ruling' : 'tips toward the heavy side'} (${m.ang}°)`);
        else is(m.ang === 0, `${tag}: the beam level (${m.ang}°)`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 0 || idx === 4 || idx === 8)) await page.screenshot({ path: path.join(SHOT_DIR, `${mode}${level}-${idx}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-sign-beam: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
