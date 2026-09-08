#!/usr/bin/env node
/* =====================================================================
   local-test-hoppers-number-line.js — interaction harness for "Hopper's
   Number Line" (CCSS 2.MD.B.6). Serves `mini tools/` + drives the real shell:

     • a round renders the story + the number line (ticks) + direction + size
       chips;
     • building the CORRECT model (tap start tick, pick dir, pick size) + the
       dial appears → dial the DERIVED landing → "Hop!" → solved;
     • the dial does NOT appear until start+dir+size are all set;
     • a WRONG size (decoy) → not solved; a flipped direction → not solved;
     • ≥7 distinct rounds + reshuffle; no horizontal overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'hoppers-number-line.jump-sums.2-md-b-6';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/hoppers-number-line-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.HoppersNumberLineActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'hoppers-number-line.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.HoppersNumberLineActivity.round && document.querySelector('.hnl-root'), { timeout: 4000 });
    await sleep(40);
  }
  // set the model fields directly (drives the real render + grade path), then commit
  const setModel = (start, dir, size, dialed) => page.evaluate((m) => {
    const t = window.HoppersNumberLineActivity;
    t.startV = m.start; t.dir = m.dir; t.sizeV = m.size; t.dialed = m.dialed; t.render();
  }, { start, dir, size, dialed }).then(() => sleep(40));
  const commit = () => page.evaluate(() => window.HoppersNumberLineActivity._commit()).then(() => sleep(60));
  const solved = () => page.evaluate(() => window.HoppersNumberLineActivity.solved);
  const audit = () => page.evaluate(() => window.NumberlineJumpCore.audit(window.HoppersNumberLineActivity.round));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.HoppersNumberLineActivity; return t && t._activityRow && document.querySelector('.hnl-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Hopper's Number Line", `header title "${title}"`);

    /* variety/shuffle */
    const Np = await page.evaluate(() => window.HoppersNumberLineActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.HoppersNumberLineActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 7, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<7)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    /* structure + the dial is gated on the model */
    await force('fwd-6-8');
    note(await page.$$eval('.hnl-tickhit', els => els.length) >= 5, 'number line did not render tick targets');
    note(await page.$$eval('.hnl-size', els => els.length) === 3, 'did not render 3 size chips (incl decoy)');
    note(await page.$$eval('.hnl-dir', els => els.length) === 2, 'did not render 2 direction buttons');
    note((await page.$('.hnl-keypad')) === null, 'the dial appeared BEFORE the model was set');

    /* correct model → dial appears → solve */
    let a = await audit();
    await setModel(a.start, a.dir, a.size, a.answer);
    note((await page.$('.hnl-keypad')) !== null, 'the dial did not appear after the model was set');
    await commit();
    note(await solved(), 'the correct model + dialed landing did not solve');

    /* wrong size (decoy) → not solved */
    await force('fwd-9-12'); a = await audit();
    await setModel(a.start, a.dir, a.decoys[0], a.start + (a.dir === 'back' ? -1 : 1) * a.decoys[0]);
    await commit();
    note(!(await solved()), 'a decoy hop-size solved (size must be graded)');

    /* flipped direction → not solved */
    await force('back-16-6'); a = await audit();
    const flip = a.dir === 'back' ? 'fwd' : 'back';
    await setModel(a.start, flip, a.size, a.start + (flip === 'back' ? -1 : 1) * a.size);
    await commit();
    note(!(await solved()), 'a flipped direction solved (direction must be graded)');

    /* a back (difference) round solves on the correct model */
    await force('back-45-20'); a = await audit();
    await setModel(a.start, a.dir, a.size, a.answer);
    await commit();
    note(await solved(), 'a backward (difference) round did not solve on the correct model');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('fwd-30-40');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} hoppers-number-line/en — "${title}"`);
  } catch (e) {
    fails.push('hoppers-number-line/en: ' + e.message);
    console.log(`  FAIL hoppers-number-line/en — ${e.message}`);
  } finally { await page.close(); }

  /* ---- sv: no English may reach text, aria-labels or SPEECH ------------------------ */
  const svAt = fails.length;
  try {
    /* SURFACE 2 comes from the MANIFEST ON DISK, never from a copy in this file */
    const mfPath = require('path').join(__dirname, '..', 'mini tools', 'hoppers-number-line-activities.json');
    const mf = JSON.parse(fs.readFileSync(mfPath, 'utf8'));
    const mrows = (Array.isArray(mf) ? mf[0] : mf).params.rounds;
    note(mrows.length >= 9, `sv: only ${mrows.length} rounds in the manifest — vacuous`);
    const storyEn = mrows.map(r => ['story:' + r.id, r.story]).filter(p => p[1]);
    note(storyEn.length === mrows.length, `sv: only ${storyEn.length} English stories found — the manifest surface would go unchecked`);
    const missingSv = mrows.filter(r => !(r.storyL10n && r.storyL10n.sv)).map(r => r.id);
    note(missingSv.length === 0, `sv: ${missingSv.length} round(s) have NO storyL10n.sv — ${missingSv.join(',')}`);

    const sp = await browser.newPage();
    await sp.setViewport({ width: 412, height: 900 });
    await sp.goto(`http://127.0.0.1:${PORT}/hoppers-number-line-activity.html?lang=sv&activity=${ACTIVITY}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sp.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (a) { window.__spoke.push(a && a.text); return o.apply(this, arguments); }; });
    await sp.waitForFunction(() => window.HoppersNumberLineActivity && window.HoppersNumberLineActivity._pool && window.HoppersNumberLineActivity._pool.length, { timeout: 15000 });
    note(await sp.evaluate(() => Array.isArray(window.__spoke)), 'sv: the speak recorder did not install — the spoken story would be unchecked');

    /* SURFACE 1 from the page, derived from `en` ALONE */
    const strEn = await sp.evaluate(() => {
      const S = window.HoppersNumberLineActivity.strings || {};
      return Object.keys(S).filter(k => S[k] && S[k].en && S[k].sv !== S[k].en).map(k => [k, S[k].en]);
    });
    note(strEn.length === 16, `sv: ${strEn.length} strings-table keys differ from en, expected 16`);
    const pairs = strEn.concat(storyEn);
    note(pairs.length >= 24, `sv: only ${pairs.length} probes across BOTH surfaces — expected 25`);

    const ids = await sp.evaluate(() => window.HoppersNumberLineActivity._pool.map(r => r.id));
    let sawWin = 0, sawWait = 0, spokeTotal = 0;
    for (const rid of ids) {
      await sp.evaluate((id) => {
        const t = window.HoppersNumberLineActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex(x => x.id === id); if (k > 0) { order.splice(k, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.__spoke = []; window.LCS_reloadFirstTask();
      }, rid);
      await sp.waitForFunction(() => window.HoppersNumberLineActivity.round && document.querySelector('.hnl-root'), { timeout: 5000 });
      await sleep(60);
      const snap = () => sp.evaluate(() => ({
        text: (document.querySelector('.lcs-app') || document.body).innerText || '',
        aria: [...document.querySelectorAll('.lcs-app [aria-label]')].map(e => e.getAttribute('aria-label')).join(' | '),
        spoke: (window.__spoke || []).join(' | ')
      }));
      const frames = [await snap()];                                    /* the STORY state */
      const r = await sp.evaluate(() => { const t = window.HoppersNumberLineActivity, r = t.round; return { start: r.start, dir: r.dir, size: r.size, land: window.NumberlineJumpCore.landing(r) }; });
      /* a WRONG commit — sayWait renders ONLY here */
      await sp.evaluate((m) => { const t = window.HoppersNumberLineActivity; t.startV = m.start; t.dir = m.dir; t.sizeV = m.size; t.dialed = m.land + 1; t.render(); t._commit(); }, r);
      await sleep(80);
      const f1 = await snap(); frames.push(f1); if (f1.text !== frames[0].text) sawWait++;
      /* then the RIGHT commit — sayWin renders ONLY here */
      await sp.evaluate((m) => { const t = window.HoppersNumberLineActivity; t.startV = m.start; t.dir = m.dir; t.sizeV = m.size; t.dialed = m.land; t.render(); t._commit(); }, r);
      await sleep(100);
      const f2 = await snap(); frames.push(f2);
      if (await sp.evaluate(() => window.HoppersNumberLineActivity.solved)) sawWin++;
      spokeTotal += frames.map(f => f.spoke).join('').length;
      const hay = frames.map(f => f.text + ' | ' + f.aria + ' | ' + f.spoke).join(' | ');
      note(hay.trim().length > 0, `sv/${rid}: nothing rendered — vacuous`);
      for (const [key, enVal] of pairs) {
        const segs = String(enVal).split(/\{[^}]*\}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(s => s.length >= 6);
        if (!segs.length) continue;
        const probe = segs.sort((a, b) => b.length - a.length)[0];
        note(hay.indexOf(probe) === -1, `sv/${rid}: the ENGLISH '${key}' reached the child — "${probe}"`);
      }
      for (const frag of ['Where does', 'hops forward', 'hops back', 'Forward', 'Back', 'Hop!']) {
        note(hay.indexOf(frag) === -1, `sv/${rid}: an English fragment reached the child — "${frag}"`);
      }
    }
    note(sawWait >= 7, `sv: only ${sawWait} rounds changed after a WRONG commit — sayWait is unchecked`);
    note(sawWin >= 7, `sv: only ${sawWin} rounds reached the win — sayWin is unchecked`);
    note(spokeTotal > 0, 'sv: NOTHING was spoken — the story channel is unchecked');
    const bad = fails.length - svAt;
    console.log(bad ? `  FAIL hoppers/sv — ${bad} English leak(s)` : `  ok   hoppers/sv — no English in text, aria or speech across ${ids.length} rounds x 3 states, BOTH surfaces`);
    await sp.close();
  } catch (e) { fails.push('hoppers/sv: ' + e.message); console.log(`  FAIL hoppers/sv — ${e.message}`); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`HOPPERS-NUMBER-LINE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('HOPPERS-NUMBER-LINE LOCAL TEST PASSED — story + number line + dir + size chips; dial gated on the model; correct model + dialed landing solves; decoy size + flipped direction do NOT solve; back (difference) solves; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
