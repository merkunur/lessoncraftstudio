#!/usr/bin/env node
/* =====================================================================
   local-test-pinch-teams.js — ACTIVITY #112, The Talking Clasp, in a real
   browser with real pointer and key actions (vowel tiles TAPPED and
   DRAGGED into the team sockets, sockets tapped to open the clasp, Check
   clicked), in every shipped locale (en de nl fr).
   Scenarios per locale (at 1024):
     · the settings (en: Build / Same sound?; elsewhere none);
     · an empty Check → hintEmpty, no miss; a pair that is not a team →
       the second vowel bumps back to the tray; the socket tapped → empty;
       the word's team tapped in order → the clasp shuts (en: the talker
       gold and its partner quiet; elsewhere both lit); Check → the line, a
       tag on the team board;
     · a wrong team → hintWrong, the socket rings; miss 2 → the miss-2 hint,
       (en) the badge, only the right letters bright; the socket opened →
       the help gone; a lone vowel → hintSingle;
     · drags: a vowel dragged onto the socket; the keyboard: Enter on a tile;
     · Same sound? (en): the other spelling → hintSpelling, the word's card,
       the team sent back; its own spelling → the line.
   Then every clue × round (all sets) at rest, at miss 2 and solved —
   reached ONCE per locale by real actions, then resized through 320…1366:
   no sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, pictures
   ≥ 64 px (≥ 96 from 704), nothing outside the card, no bands overlap, a
   locked team's letters inside its socket.
   Usage: node scripts/local-test-pinch-teams.js [--widths=…] [--locales=…] [--clues=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,fr').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const CLUES = arg('clues', 'build,same').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '112-talking-clasp', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'pinch-teams-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, PinchTeamsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'pinch-teams-activity.js'), 'utf8') + '\n;this.__A = PinchTeamsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc] || ACT.strings[k].en).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
const okLine = (loc, id, clue) => {
  const w = C.word(loc, id), team = w.teams[0], tk = C.talker(loc, team);
  if (clue === 'same') return T(loc, 'okSame', { word: w.display, team });
  if (tk) return T(loc, team[0] === team[1] ? 'okTalkSame' : 'okTalk', { sounds: w.sounds.join('–'), word: w.display, team, t: team[0], q: team[1] });
  return T(loc, 'okOne', { word: w.display, team });
};
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
    await page.goto(`${base}/pinch-teams-activity.html?activity=syllable-builder.build-vowel-teams.rf-1-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PinchTeamsActivity && window.PinchTeamsActivity.st && document.querySelector('.pt-foot'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.PinchTeamsActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, clue, set, id) {
    await page.evaluate((clue, set, id) => { const a = window.PinchTeamsActivity; a.api.settings.clue = clue; a._pool = null; a._ensurePool(); a._set = set; a._pos = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]; a._start(id, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0); }, clue, set, id);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.PinchTeamsActivity.st; return { clue: s.clue, id: s.id, socks: s.sockets.map(x => x.tiles.slice().join('.') + (x.locked ? 'L' : '')), misses: s.misses, show: s.show, done: s.done, last: s.last }; });
  const note = (page) => page.evaluate(() => document.querySelector('.pt-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(20); return true;
  }
  const tileOf = (page, c) => page.evaluate((c) => { const s = window.PinchTeamsActivity.st; return s.tray.findIndex((x, i) => x.c === c && window.PinchTeamsCore.usedAt(s, i) < 0); }, c);
  const tap = async (page, c, tag) => { const t = await tileOf(page, c); if (t < 0) { is(false, `${tag}: a free tile ${c}`); return; } await click(page, K('tile-' + t), tag); };
  async function drag(page, fromSel, toSel, tag) {
    await page.evaluate(() => window.scrollTo(0, Math.max(0, document.querySelector('.pt-railbox').getBoundingClientRect().top + window.scrollY - 200))); await wait(15);
    const pos = (s) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, s);
    const a = await pos(fromSel), b = await pos(toSel); if (!a || !b) { is(false, `${tag}: drag ${fromSel} → ${toSel}`); return; }
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8); await wait(8); }
    await page.mouse.up(); await wait(40);
  }
  const check = (page, tag) => click(page, K('check'), tag);
  const trayLetters = (page) => page.evaluate(() => window.PinchTeamsActivity.st.tray.map(x => x.c));
  /* a pair from the tray that locks but is not the word's team (and, en, not its ee/ea twin) */
  const wrongPair = (loc, letters, want) => { for (const a of letters) for (const b of letters) { if (a === b && letters.filter(x => x === a).length < 2) continue; const p = a + b; if (C.isTeam(loc, p) && p.toLowerCase() !== want.toLowerCase() && !C.homophones(loc, p, want)) return [a, b]; } return null; };
  const noPair = (loc, letters) => { for (const a of letters) for (const b of letters) if (a !== b && !C.isTeam(loc, a + b)) return [a, b]; return null; };
  const pourRight = async (page, loc, id, tag) => { for (const t of C.word(loc, id).teams) { await tap(page, t[0], tag); await tap(page, t[1], tag); } };

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    const keys = await page.evaluate(() => window.PinchTeamsActivity.settings.map(f => f.key + ':' + f.options.map(o => o.value).join('/')));
    is(loc === 'en' ? JSON.stringify(keys) === '["clue:build/same"]' : keys.length === 0, `${loc}: the settings (${keys.join(' ') || 'none'})`);
    const id = C.BUILD[loc][0][0], w = C.word(loc, id); tag = `${loc} ${id}`;
    await force(page, 'build', 0, id);
    is(sp(await prompt(page)) === sp(T(loc, 'tBuild')), `${tag}: the task line`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → hintEmpty, no miss`);
    const np = noPair(loc, await trayLetters(page));
    await tap(page, np[0], tag); await tap(page, np[1], tag); s = await st(page);
    is(s.socks[0].split('.').length === 1 && !/L/.test(s.socks[0]) && await count(page, '.pt-tile.is-bump') === 1, `${tag}: ${np.join('')} is not a team → the second vowel bumps back`);
    await click(page, K('sock-0'), tag); s = await st(page); is(s.socks[0] === '', `${tag}: the socket tapped → empty`);
    await pourRight(page, loc, id, tag); s = await st(page);
    is(s.socks.every(x => /L$/.test(x)), `${tag}: the team tapped in order → the clasp shuts`);
    if (C.talker(loc, w.teams[0])) is(await count(page, '.pt-sock .pt-v.is-talk') === 1 && await count(page, '.pt-sock .pt-v.is-quiet') === 1, `${tag}: the talker gold, its partner quiet`);
    else is(await count(page, '.pt-sock .pt-v.is-one') === 2 && await count(page, '.pt-sock .pt-v.is-talk') === 0, `${tag}: the whole team lit as one sound`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(okLine(loc, id, 'build')) && await count(page, '.pt-wtag') === 1, `${tag}: right → «${sp(await note(page))}», a tag on the board`);
    /* a wrong team, miss 2, the help gone; a lone vowel */
    const id2 = C.BUILD[loc][0][1], w2 = C.word(loc, id2); tag = `${loc} ${id2}`;
    await force(page, 'build', 0, id2);
    const wp = wrongPair(loc, await trayLetters(page), w2.teams[0]);
    await tap(page, wp[0], tag); await tap(page, wp[1], tag); for (const t of w2.teams.slice(1)) { await tap(page, t[0], tag); await tap(page, t[1], tag); }
    await check(page, tag); s = await st(page);
    is(s.last === 'wrong' && sp(await note(page)) === sp(T(loc, 'hintWrong')) && await count(page, '.pt-sock.is-wrong') === 1, `${tag}: ${wp.join('')} → hintWrong, the socket rings`);
    await check(page, tag);
    const tk = C.talker(loc, w2.teams[0]);
    is(sp(await note(page)) === sp(tk ? T(loc, 'hintWrong2', { N: tk.toUpperCase() }) : T(loc, 'hintWrong2Team')), `${tag}: miss 2 → the miss-2 hint`);
    if (loc === 'en') is(await count(page, '.pt-badge.is-on') === 1, `${tag}: the badge fills`);
    is(await count(page, '.pt-tile.is-dim') > 0, `${tag}: only the right letters stay bright`);
    await click(page, K('sock-0'), tag); is(sp(await note(page)) === '' && await count(page, '.pt-tile.is-dim') === 0 && await count(page, '.pt-badge.is-on') === 0, `${tag}: the clasp opened → the help gone`);
    await force(page, 'build', 0, id2); await tap(page, w2.teams[0][0], tag); for (const t of w2.teams.slice(1)) { await tap(page, t[0], tag); await tap(page, t[1], tag); }
    await check(page, tag); s = await st(page); is(s.last === 'single' && sp(await note(page)) === sp(T(loc, 'hintSingle')), `${tag}: a lone vowel → hintSingle`);
    /* drag + keyboard */
    tag = `${loc} drag`; await force(page, 'build', 0, id);
    await drag(page, K('tile-' + await tileOf(page, w.teams[0][0])), K('sock-0'), tag);
    await drag(page, K('tile-' + await tileOf(page, w.teams[0][1])), K('sock-0'), tag); s = await st(page);
    is(/L$/.test(s.socks[0]), `${tag}: two vowels dragged onto the socket lock`);
    await force(page, 'build', 0, id);
    await page.evaluate((k) => document.querySelector(`[data-k="tile-${k}"]`).focus(), await tileOf(page, w.teams[0][0])); await page.keyboard.press('Enter');
    s = await st(page); is(s.socks[0] !== '', `${tag}: Enter on a tile puts it in the socket`);
    /* Same sound? */
    if (loc === 'en') {
      tag = 'en same leaf'; await force(page, 'same', 0, 'leaf');
      is(sp(await prompt(page)) === sp(T('en', 'tSame')) && await count(page, '.pt-tile.is-team') === 2, `${tag}: two ready teams`);
      await click(page, K('tile-0'), tag); await check(page, tag); s = await st(page);
      is(s.last === 'spelling' && sp(await note(page)) === sp(T('en', 'hintSpelling', { team: 'ea' })) && await count(page, '.pt-spell') === 1 && s.socks[0] === '', `${tag}: ee → the right sound, the word's ea card, the team back`);
      await click(page, K('tile-1'), tag); await check(page, tag); s = await st(page);
      is(s.done && sp(await note(page)) === sp(okLine('en', 'leaf', 'same')), `${tag}: ea → the line`);
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every clue × round at rest, at miss 2 and solved — reached ONCE per locale by real actions, then resized ---- */
  async function reach(page, loc, clue, id, state, tag) {
    if (state === 'rest') return;
    const w = C.word(loc, id);
    if (clue === 'same') {
      const rightI = await page.evaluate((t) => window.PinchTeamsActivity.st.tray.findIndex(x => x.c === t), w.teams[0]);
      if (state === 'solved') { await click(page, K('tile-' + rightI), tag); await check(page, tag); return; }
      for (let k = 0; k < 2; k++) { await click(page, K('tile-' + (1 - rightI)), tag); await check(page, tag); }
      return;
    }
    if (state === 'solved') await pourRight(page, loc, id, tag);
    else { const wp = wrongPair(loc, await trayLetters(page), w.teams[0]); await tap(page, wp[0], tag); await tap(page, wp[1], tag); for (const t of w.teams.slice(1)) { await tap(page, t[0], tag); await tap(page, t[1], tag); } }
    await check(page, tag); if (state === 'miss2') await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.pt-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.pt-pic img').forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 63.5 || (Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.pt-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.pt-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.pt-wrap')).getBoundingClientRect();
    document.querySelectorAll('.pt-pic,.pt-rail,.pt-tile,.pt-check,.pt-board').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.pt-board', '.pt-top', '.pt-railbox', '.pt-tray', '.pt-foot', '.pt-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.pt-sock').forEach(s => { const q = s.getBoundingClientRect(); s.querySelectorAll('.pt-v').forEach(v => { const r = v.getBoundingClientRect(); if (r.width && (r.left < q.left - 1 || r.right > q.right + 1)) out.fails.push('a letter spills out of its socket'); }); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const clue of CLUES.filter(c => C.clues(loc).includes(c))) for (let set = 0; set < (clue === 'build' ? C.BUILD[loc].length : 1); set++) for (const id of C.rounds(loc, clue, set)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${clue} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, clue, set, id);
      await reach(page, loc, clue, id, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${clue} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.PinchTeamsActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.pt-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && C.rounds(loc, clue, set).indexOf(id) < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${clue}-${set}-${id}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-pinch-teams: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
