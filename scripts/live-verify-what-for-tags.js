#!/usr/bin/env node
/* =====================================================================
   live-verify-what-for-tags.js — drives Jasper's Just-Right Bag (The
   What-For Tags) ON PRODUCTION in en, de, sv and fi (desktop 1366 + phone
   390): the real activity page, real pointer. Level 1: two things swapped
   + two right → Go: the right two lock, the wrong two come back with their
   tags open and the hint shows; the swapped ones put right + Go → the
   success line. Every one of the 11 pages returns 200; the wrapper version
   is page.tsx's; the iframe grows with the card.
   Usage: node scripts/live-verify-what-for-tags.js [--out=<dir>]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const OUT = arg('out', path.join(__dirname, '..', 'docs', 'audit-results', 'activities-rebuild', '133-what-for-tags', 'live'));
const MT = path.join(__dirname, '..', 'mini tools');
const ROW = JSON.parse(fs.readFileSync(path.join(MT, 'jasper-just-right-activities.json'), 'utf8')).find(x => x.id === 'jasper-just-right.real-life.l-1-5-c');
const C = require(path.join(MT, 'what-for-tags-core.js'));
const ACT = (() => { const vm = require('vm'); const ctx = { window: {}, WhatForTagsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MT, 'what-for-tags-activity.js'), 'utf8') + ';this.__A = window.WhatForTagsActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => String(ACT.strings[k][loc]);
const WRAPPER = (fs.readFileSync(path.join(__dirname, '..', 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx'), 'utf8').match(/ACTIVITY_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const wait = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  is(Object.keys(ROW.slug).length === 11, 'the row ships in all 11 locales');
  for (const loc of Object.keys(ROW.slug)) {
    const page = await browser.newPage();
    const res = await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    is(res && res.status() === 200, `[${loc}] /${loc}/activities/${ROW.slug[loc]} → ${res && res.status()}`);
    await page.close(); await wait(300);
  }
  for (const loc of ['en', 'de', 'sv', 'fi']) for (const w of [1366, 390]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: w > 500 ? 1000 : 844 });
    await page.goto(`https://www.lessoncraftstudio.com/${loc}/activities/${ROW.slug[loc]}`, { waitUntil: 'networkidle2', timeout: 90000 });
    const frameEl = await page.waitForSelector('iframe[src*="what-for-tags-activity.html"]', { timeout: 30000 }).catch(() => null);
    is(!!frameEl, `[${loc} @${w}] the page embeds what-for-tags-activity.html`);
    if (!frameEl) { await page.close(); continue; }
    const src = await page.evaluate(f => f.getAttribute('src'), frameEl);
    is(src.includes('v=' + WRAPPER), `[${loc} @${w}] wrapper version ${WRAPPER}`);
    const frame = await frameEl.contentFrame();
    await frame.waitForFunction(() => window.WhatForTagsActivity && window.WhatForTagsActivity.st && document.querySelector('.wt-wrap'), { timeout: 30000 });
    await frame.evaluate(() => { const a = window.WhatForTagsActivity; a.OK_MS = 600000; a.FAST = true; a.api.settings.level = '1'; a._pool = null; a._plan = null; a._ensurePool(); a._start(0, 0); a._render2(); });
    const right = await frame.evaluate(() => window.WhatForTagsActivity.st.rd.right);
    const off = () => page.evaluate(f => { const b = f.getBoundingClientRect(); return { x: b.left, y: b.top }; }, frameEl);
    const xy = (sel) => frame.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'nearest', inline: 'center' }); const q = e.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + Math.min(q.height / 2, 24) }; }, sel);
    const click = async (sel) => { const e = await xy(sel); if (!e) { is(false, '[' + loc + ' @' + w + '] there is a «' + sel + '»'); return; } const o0 = await off(); await page.evaluate((y) => window.scrollTo({ top: window.scrollY + y - 380, behavior: 'instant' }), o0.y + e.y); await wait(150); const e2 = await xy(sel), o = await off(); await page.mouse.click(o.x + e2.x, o.y + e2.y); await wait(250); };
    const hang = async (j, h) => { await click(`[data-k="thing-${j}"]`); await click(`[data-k="hook-${h}"]`); };
    const note = () => frame.evaluate(() => document.querySelector('.wt-note').textContent);
    await hang(right[1], 0); await hang(right[0], 1); await hang(right[2], 2); await hang(right[3], 3); await click('[data-k="check"]');
    const s1 = await frame.evaluate(() => { const s = window.WhatForTagsActivity.st; return { locked: s.locked.join(), open: document.querySelectorAll('.wt-things .wt-tag.is-open').length }; });
    is(sp(await note()) === sp(T(loc, 'missTags')) && s1.locked === 'false,false,true,true' && s1.open === 2, `[${loc} @${w}] two swapped → two lock, two come back with their tags open, «${sp(await note())}»`);
    await hang(right[0], 0); await hang(right[1], 1); await click('[data-k="check"]');
    await frame.waitForFunction(() => window.WhatForTagsActivity.st.done, { timeout: 15000 }).catch(() => {});
    /* the expected line from the unshuffled round: each window's own right thing (the page's bag is shuffled, so its indices are not this round's) */
    const st = C.newState(loc, '1', 0); st.rd.right.forEach((j, h) => { st.hook[h] = j; });
    const want = C.okLine(st, a => a.join(', '), T(loc, 'okDay'));
    const said = await frame.evaluate(() => document.querySelector('.wt-note').textContent);
    is(await frame.evaluate(() => window.WhatForTagsActivity.st.done) && sp(said) === sp(want), `[${loc} @${w}] all four right → «${sp(said)}»`);
    await page.screenshot({ path: path.join(OUT, `live-${loc}-${w}-done.png`) });
    await wait(1500);
    const fit = await page.evaluate(f => { const fr = f.getBoundingClientRect(); const c = f.contentDocument.querySelector('.lcs-app').getBoundingClientRect(); return { frameH: fr.height, cardH: c.height }; }, frameEl);
    is(fit.frameH >= fit.cardH - 8, `[${loc} @${w}] iframe grows with the card (iframe ${fit.frameH.toFixed(0)}, card ${fit.cardH.toFixed(0)})`);
    await page.close();
  }
  await browser.close();
  console.log(`live-verify-what-for-tags: ${PASS} pass, ${FAIL} fail → ${OUT}`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
