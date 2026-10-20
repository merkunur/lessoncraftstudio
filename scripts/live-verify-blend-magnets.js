#!/usr/bin/env node
/* =====================================================================
   live-verify-blend-magnets.js — drives The Blending Magnets ON
   PRODUCTION in en, de, sv and fi (desktop 1366 + phone 390): the real
   activity page, real pointer. Level 1, first round of each locale:
   Check with the magnets apart asks (no miss); the first-sound magnet
   DRAGGED into the rest (it snaps); the rhyme tapped → miss (its end
   sticks, its start pushes); the target tapped → right, the word on the
   fridge. The wrapper version is the one in page.tsx; the iframe grows
   with the card; every locale's page returns 200.
   Usage: node scripts/live-verify-blend-magnets.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '054-blend-magnets', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'blend-magnets-activities.json'), 'utf8'))[0];
const C = require(path.join(MT, 'blend-magnets-core.js'));
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  /* every locale's page answers */
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(400);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="blend-magnets-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds blend-magnets-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.BlendMagnetsActivity && window.BlendMagnetsActivity.st && document.querySelector('.bmg-wrap'), { timeout: 30000 });
    await wait(1500);
    const r = C.rounds(loc, 'onset')[0];
    await frame.evaluate((id) => { const a = window.BlendMagnetsActivity; a.OK_MS = 60000; a.FAST = true; a.api.settings.pull = 'strong'; a.api.settings.level = 'onset'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(x => x.id === id); a._order = [i].concat(pool.map((x, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, r.id);
    await wait(900);
    const frameOff = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const toView = async (sel) => { const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { y: rr.top + rr.height / 2 }; }, sel); if (!b) return false; const o = await frameOff(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - innerHeight / 2, behavior: 'instant' }), o.y + b.y); await wait(300); return true; };
    const ctrOf = async (sel) => { const o = await frameOff(); const b = await frame.evaluate((q) => { const e = document.querySelector(q); if (!e) return null; const rr = e.getBoundingClientRect(); return { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2 }; }, sel); return b && { x: o.x + b.x, y: o.y + b.y }; };
    const tap = async (sel) => { if (!(await toView(sel))) return false; const p = await ctrOf(sel); await page.mouse.click(p.x, p.y); await wait(250); return true; };
    const check = async () => { await tap('.bmg-check'); await frame.waitForFunction(() => !window.BlendMagnetsActivity._busy, { timeout: 8000 }).catch(() => {}); await wait(300); };
    const st = () => frame.evaluate(() => { const s = window.BlendMagnetsActivity.st; return JSON.parse(JSON.stringify({ gaps: s.gaps, layout: s.layout, misses: s.misses, done: s.done, last: s.last })); });

    await check(); let s = await st(); is(s.misses === 0 && s.last && s.last.result === 'snap', `[${loc} @${w}] Check with the magnets apart asks (no miss)`);
    await toView('.bmg-mag[data-i="0"]'); const p = await ctrOf('.bmg-mag[data-i="0"]');
    const dx = await frame.evaluate(() => { const A = window.BlendMagnetsActivity; return A.st.gaps[0] * A._G.share * 0.9; });
    await page.mouse.move(p.x, p.y); await page.mouse.down(); for (let k = 1; k <= 10; k++) { await page.mouse.move(p.x + dx * k / 10, p.y); await wait(20); } await page.mouse.up(); await wait(300);
    s = await st(); is(s.gaps[0] === 0, `[${loc} @${w}] «${r.parts[0]}» dragged into «${r.parts[1]}» — it snaps`);
    await tap(`.bmg-frame[data-i="${s.layout.indexOf(1)}"]`); await check(); s = await st();
    const tm = await frame.evaluate(() => [...document.querySelectorAll('.bmg-tm')].map(e => e.classList.contains('is-stick') ? 1 : 0).join(''));
    is(s.misses === 1 && s.last.result === 'rhyme' && tm === '01', `[${loc} @${w}] the rhyme «${r.pics[1].word}» — its end sticks, its start pushes (miss)`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-miss.png`) });
    await tap(`.bmg-frame[data-i="${s.layout.indexOf(0)}"]`); await check(); s = await st();
    is(s.done && (await frame.evaluate(() => [...document.querySelectorAll('.bmg-fw')].map(e => e.textContent))).includes(r.word), `[${loc} @${w}] «${r.word}» — right, on the fridge`);
    await wait(800);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const card = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: card.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    if (w === 390) await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-blend-magnets: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
