#!/usr/bin/env node
/* =====================================================================
   live-verify-pinch-teams.js — drives Build Vowel-Team Words (The Talking
   Clasp) ON PRODUCTION in en, de, nl and fr (desktop 1366 + phone 390):
   the real activity page, real pointer. A pair that is not a team → the
   second vowel bumps back; the socket opened; the word's team tapped in
   order → the clasp shuts (en: the talker lit, its partner quiet; else
   both lit) → Check → the locale's success line and a tag on the team
   board. Every shipped page returns 200; the wrapper version is
   page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-pinch-teams.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '112-talking-clasp', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'syllable-builder-activities.json'), 'utf8')).find(r => r.id === 'syllable-builder.build-vowel-teams.rf-1-3');
const C = require(path.join(MT, 'pinch-teams-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, PinchTeamsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'pinch-teams-activity.js'), 'utf8') + ';this.__A = PinchTeamsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc] || ACT.strings[k].en).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
const WORD = { en: 'boat', de: 'mouse', nl: 'muis', fr: 'loup' };
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  is(JSON.stringify(Object.keys(ROW.slug).sort()) === JSON.stringify(['de', 'en', 'fr', 'nl']), 'the row ships in en de nl fr');
  for (const loc of Object.keys(WORD)) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    is(res && res.status() === 200, `[${loc} @${w}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    const frameEl = await page.waitForSelector('iframe[src*="pinch-teams-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds pinch-teams-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.PinchTeamsActivity && window.PinchTeamsActivity.st && document.querySelector('.pt-foot'), { timeout: 30000 });
    const id = WORD[loc], word = C.word(loc, id), team = word.teams[0];
    await frame.evaluate((id) => { const a = window.PinchTeamsActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.clue = 'build'; a._pool = null; a._ensurePool(); a._set = 0; a._start(id, 0); a._render2(); }, id);
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, `[${loc} @${w}] there is a «${sel}»`); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const o = await off(); await page.mouse.click(o.x + e.x, o.y + e.y); await wait(250); };
    const tile = (c) => frame.evaluate((c) => { const s = window.PinchTeamsActivity.st; return s.tray.findIndex((x, i) => x.c === c && window.PinchTeamsCore.usedAt(s, i) < 0); }, c);
    const st = () => frame.evaluate(() => { const s = window.PinchTeamsActivity.st; return { socks: s.sockets.map(x => x.tiles.length + (x.locked ? 'L' : '')), done: s.done }; });
    const note = () => frame.evaluate(() => document.querySelector('.pt-note').textContent);
    const letters = await frame.evaluate(() => window.PinchTeamsActivity.st.tray.map(x => x.c));
    let np = null; for (const a of letters) for (const b of letters) if (!np && a !== b && !C.isTeam(loc, a + b)) np = [a, b];
    await click(`[data-k="tile-${await tile(np[0])}"]`); await click(`[data-k="tile-${await tile(np[1])}"]`);
    let s = await st(); is(s.socks[0] === '1', `[${loc} @${w}] ${np.join('')} is not a team → the second vowel bumps back`);
    await click('[data-k="sock-0"]');
    await click(`[data-k="tile-${await tile(team[0])}"]`); await click(`[data-k="tile-${await tile(team[1])}"]`);
    s = await st(); const tk = C.talker(loc, team);
    is(s.socks[0] === '2L' && await frame.evaluate((tk) => tk ? document.querySelectorAll('.pt-sock .pt-v.is-talk').length === 1 && document.querySelectorAll('.pt-sock .pt-v.is-quiet').length === 1 : document.querySelectorAll('.pt-sock .pt-v.is-one').length === 2, !!tk), `[${loc} @${w}] ${team} locks under the clasp${tk ? ', its ' + tk + ' lit' : ', lit as one sound'}`);
    await click('[data-k="check"]');
    await frame.waitForFunction(() => window.PinchTeamsActivity.st.done, { timeout: 15000 }).catch(() => {}); s = await st();
    const line = tk ? T(loc, team[0] === team[1] ? 'okTalkSame' : 'okTalk', { sounds: word.sounds.join('–'), word: word.display, team, t: team[0], q: team[1] }) : T(loc, 'okOne', { word: word.display, team });
    is(s.done && sp(await note()) === sp(line) && await frame.evaluate(() => document.querySelectorAll('.pt-wtag').length === 1), `[${loc} @${w}] → «${sp(await note())}», a tag on the board`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-pinch-teams: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
