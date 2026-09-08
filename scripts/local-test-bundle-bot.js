#!/usr/bin/env node
/* =====================================================================
   local-test-bundle-bot.js — interaction harness for "Bundle Bot" (CCSS
   1.NBT.B.2.a). Serves `mini tools/` + drives the shell:

     • NO AUTO-BUNDLE: feeding ten loose ones with NO lever pull leaves ten in
       the scatter + the tens column EMPTY (no auto-fire).
     • FEED→PULL SEALS one rod; SUB-TEN pull REFUSES (non-shame message, no rod).
     • IMPOSTOR: the seeded looks-~10-but-9 scatter → a pull REFUSES; feed one →
       a pull bundles.
     • UN-BUNDLE: tap a banded rod → 10 scatter cubes (the inverse).
     • CANONICAL-FORM SOLVE: reaching the value as all-loose is NOT solved; you
       must bundle to the canonical tens grouping.
     • DECADE ends with an EMPTY scatter; ≥7 rounds + 6 cogs + reshuffle; no
       overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'bundle-bot.bundle-machine.1-nbt-b-2-a';
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

  const url = `http://127.0.0.1:${PORT}/bundle-bot-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const st = () => page.evaluate(() => { const a = window.BundleBotActivity; return { tens: a.cstate.tens, ones: a.cstate.ones, solved: a.solved, msg: a.msg }; });
  const feedTo = (target) => page.evaluate((t) => { const a = window.BundleBotActivity, C = window.BundleMachineCore; while (a.cstate.ones < t) C.feed(a.cstate, 1); a.render(); }, target).then(() => sleep(15));
  const pull = () => page.evaluate(() => { const l = document.querySelector('.bb-lever'); if (l) l.click(); }).then(() => sleep(30));
  const tapBar = () => page.evaluate(() => { const b = document.querySelector('.bb-bar'); if (b) b.click(); }).then(() => sleep(20));
  const feederClick = () => page.evaluate(() => { const f = document.querySelector('.bb-feeder'); if (f) f.click(); }).then(() => sleep(25));
  const tapCube = () => page.evaluate(() => { const c = document.querySelector('.bb-scatter .bb-cube'); if (c) c.click(); }).then(() => sleep(25));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.BundleBotActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'bundle-bot.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.BundleBotActivity.round && document.querySelector('.bb-shop'), { timeout: 4000 });
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.BundleBotActivity; return t && t._activityRow && document.querySelector('.bb-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Bundle Bot', `header title "${title}"`);

    /* variety/shuffle + ≥7 rounds + 6 cogs */
    const N = await page.evaluate(() => window.BundleBotActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.BundleBotActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const cogs = await page.evaluate(() => new Set(window.BundleBotActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs === 6, `expected 6 cogs, got ${cogs}`);

    /* NO AUTO-BUNDLE: feed ten ones, NO pull → ten loose, tens empty */
    await force('build-thirty-four'); await feedTo(10);
    let s = await st(); note(s.tens === 0 && s.ones === 10 && !s.solved, `feeding ten with no pull AUTO-BUNDLED (tens=${s.tens}, ones=${s.ones})`);

    /* FEED→PULL seals one rod */
    await pull(); s = await st(); note(s.tens === 1 && s.ones === 0, `a pull at ten did not bundle one rod (tens=${s.tens}, ones=${s.ones})`);

    /* SUB-TEN pull REFUSES (non-shame, no rod) */
    await force('build-thirty-four'); await feedTo(8); await pull();
    s = await st(); note(s.tens === 0, `a pull at 8 bundled a rod (tens=${s.tens})`);
    note(/not ten|keep counting/i.test(s.msg || ''), `the sub-ten refuse message is wrong ("${s.msg}")`);

    /* IMPOSTOR: seeded 9 → reflex pull refuses; feed one → bundles */
    await force('impostor-twenty-nine'); s = await st(); note(s.ones === 9 && s.tens === 0, `impostor did not seed a 9-scatter (ones=${s.ones})`);
    await pull(); s = await st(); note(s.tens === 0, `a fullness-reflex pull on the seeded 9 bundled (tens=${s.tens})`);
    await feedTo(10); await pull(); s = await st(); note(s.tens === 1, `a counted ten (9+1) did not bundle (tens=${s.tens})`);

    /* UN-BUNDLE: tap a rod → 10 scatter cubes (and this round solves at 2t 12o) */
    await force('unbundle-thirty-two'); s = await st(); note(s.tens === 3 && s.ones === 2, `unbundle round did not start 3t 2o (tens=${s.tens}, ones=${s.ones})`);
    await tapBar(); s = await st(); note(s.tens === 2 && s.ones === 12, `tapping a rod did not un-bundle to 2t 12o (tens=${s.tens}, ones=${s.ones})`);
    note(s.solved, 'the unbundle round did not solve at 2 tens 12 ones');

    /* CANONICAL-FORM: value-as-all-loose is NOT solved; must bundle */
    await force('build-twenty-three'); await feedTo(23);
    s = await st(); note(!s.solved && s.tens === 0, `23 as all-loose was accepted as solved (tens=${s.tens}, solved=${s.solved})`);
    await pull(); await pull(); s = await st(); note(s.solved && s.tens === 2 && s.ones === 3, `bundling to canonical 2t 3o did not solve (tens=${s.tens}, ones=${s.ones}, solved=${s.solved})`);

    /* ONE-BY-ONE: the feeder button adds EXACTLY one (was a forced 1-3 clump) */
    await force('build-thirty-four'); const ob = (await st()).ones; await feederClick(); const oa = (await st()).ones;
    note(oa === ob + 1, `the feeder did not add exactly one (was ${ob}, now ${oa})`);

    /* TAP-TO-REMOVE: tap a loose cube → one fewer */
    await force('build-thirty-four'); await feedTo(5); await tapCube();
    s = await st(); note(s.ones === 4, `tapping a loose cube did not take one back (ones=${s.ones})`);

    /* REMOVE-TO-SOLVE: build 2 tens, over-shoot to 24, tap a cube → 23 solves */
    await force('build-twenty-three'); await feedTo(10); await pull(); await feedTo(10); await pull(); await feedTo(4);
    s = await st(); note(s.tens === 2 && s.ones === 4 && !s.solved, `remove-to-solve setup wrong (tens=${s.tens}, ones=${s.ones}, solved=${s.solved})`);
    await tapCube(); s = await st(); note(s.solved && s.tens === 2 && s.ones === 3, `removing the over-shoot did not solve 23 (tens=${s.tens}, ones=${s.ones}, solved=${s.solved})`);

    /* DECADE ends with an EMPTY scatter */
    await force('decade-forty');
    for (let k = 0; k < 4; k++) { await feedTo(10); await pull(); }
    s = await st(); note(s.solved && s.tens === 4 && s.ones === 0, `decade did not solve as 4 tens 0 ones (tens=${s.tens}, ones=${s.ones}, solved=${s.solved})`);

    /* the tray must never form a clean ten-frame — scattered or tidied */
    await page.setViewport({ width: 412, height: 900 });
    await force('build-twenty-three');
    await feedTo(10); await sleep(40);
    const tenFrame = async () => page.evaluate(() => {
      const s = document.querySelector('.bb-scatter');
      if (!s) return { cols: -1, cubes: -1, raw: '(no .bb-scatter)' };
      const g = getComputedStyle(s).gridTemplateColumns;
      return { cols: (g && g !== 'none') ? g.trim().split(/\s+/).length : 0, cubes: s.querySelectorAll('.bb-cube').length, raw: g };
    });
    const scat = await tenFrame();
    note(scat.cubes === 10, `ten-frame check: tray holds ${scat.cubes} cubes, expected 10 — the check would be vacuous`);
    note(scat.cols !== 5, `the SCATTERED tray is a 5-column ten-frame (${scat.raw})`);
    const tidyClicked = await page.evaluate(() => { const b = document.querySelector('.bb-tidybtn'); if (!b) return false; b.click(); return true; });
    note(tidyClicked, 'ten-frame check: no .bb-tidybtn — the tidied state would go unchecked');
    await sleep(40);
    note(await page.evaluate(() => !!document.querySelector('.bb-tray.bb-tidy')), 'ten-frame check: Tidy did not apply .bb-tidy — the next assertion would be vacuous');
    const tid = await tenFrame();
    note(tid.cubes === 10, `ten-frame check: ${tid.cubes} cubes after Tidy, expected 10 — vacuous`);
    note(tid.cols !== 5, `the TIDIED tray is a 5-column ten-frame (${tid.raw}) — one tap hands the child the is-it-ten scaffold`);
    await page.evaluate(() => { const b = document.querySelector('.bb-tidybtn'); if (b) b.click(); });   // leave it scattered

    /* no unsubstituted placeholder may reach the child, in the prompt OR the hint */
    for (const rid of ['unbundle-thirty-two', 'decade-forty', 'read-state-twenty-four']) {
      await force(rid); await sleep(30);
      const ph = await page.evaluate(() => {
        const a = window.BundleBotActivity, S = a.strings || {};
        /* ⚠ READ THE REAL DESCRIPTOR, DO NOT REIMPLEMENT IT. The first version copied the
           cog->key map into the test, so poisoning the tool's actual hintKey changed nothing
           and the poison SURVIVED: the gate was testing its own copy, not the tool. */
        const task = (a._pool || []).find(x => x && x.id === 'bundle-bot.' + a.round.id);
        const hk = (task && typeof task.hintKey === 'function') ? task.hintKey(a) : null;
        const p = document.querySelector('.lcs-activity-prompt-text');
        const bubble = document.querySelector('.bb-say');
        return { prompt: p ? p.textContent : '', bubble: bubble ? bubble.textContent : '',
                 hintKey: hk, hintEn: (S[hk] && S[hk].en) || '' };
      });
      note(ph.bubble.trim().length > 0, `placeholder check/${rid}: Bolt's bubble is empty — vacuous`);
      note(ph.bubble.indexOf('{') === -1, `placeholder check/${rid}: an UNSUBSTITUTED placeholder is in the bubble — "${ph.bubble}"`);
      note(ph.prompt.indexOf('{') === -1, `placeholder check/${rid}: an UNSUBSTITUTED placeholder is in the prompt — "${ph.prompt}"`);
      note(!!ph.hintKey, `placeholder check/${rid}: could not read the task's real hintKey — the check would be vacuous`);
      note(!!ph.hintEn, `placeholder check/${rid}: hint key ${ph.hintKey} has no en string — vacuous`);
      note(!/\{\w+\}/.test(ph.hintEn), `placeholder check/${rid}: hintKey resolves to ${ph.hintKey}, which carries a placeholder the shell will NOT interpolate — "${ph.hintEn}"`);
    }

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('overfill-thirty-six'); await feedTo(12); await sleep(25);   // worst case: a 12-cube over-fill scatter
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} bundle-bot/en — "${title}"`);
  } catch (e) {
    fails.push('bundle-bot/en: ' + e.message);
    console.log(`  FAIL bundle-bot/en — ${e.message}`);
  } finally { await page.close(); }

  /* ---- sv: no English may reach text, aria-labels or SPEECH ------------------------ */
  const svAt = fails.length;
  try {
    const sp = await browser.newPage();
    await sp.setViewport({ width: 412, height: 900 });
    await sp.goto(`http://127.0.0.1:${PORT}/bundle-bot-activity.html?lang=sv&activity=${ACTIVITY}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sp.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (a) { window.__spoke.push(a && a.text); return o.apply(this, arguments); }; });
    await sp.waitForFunction(() => window.BundleBotActivity && window.BundleBotActivity._activityRow, { timeout: 15000 });
    note(await sp.evaluate(() => Array.isArray(window.__spoke)), 'sv: the speak recorder did not install — the channel carrying the number word would be unchecked');

    const pairs = await sp.evaluate(() => {
      const S = window.BundleBotActivity.strings || {};
      /* ⚠ from `en` ALONE — see the header. Only keys whose Swedish is deliberately identical
         would be excluded, and there are none here. */
      return Object.keys(S).filter(k => S[k] && S[k].en && S[k].sv !== S[k].en).map(k => [k, S[k].en]);
    });
    note(pairs.length >= 20, `sv: only ${pairs.length} keys differ from en — expected ~24, the check would be weak`);

    const ids = await sp.evaluate(() => window.BundleBotActivity._pool.map(r => r.id.replace(/^bundle-bot\./, '')));
    note(ids.length >= 9, `sv: only ${ids.length} rounds — vacuous`);
    let spokeTotal = 0;
    for (const rid of ids) {
      await sp.evaluate((id) => {
        const a = window.BundleBotActivity, n = a._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
        const k = a._pool.findIndex(x => x.id === 'bundle-bot.' + id); if (k > 0) { order.splice(k, 1); order.unshift(k); }
        a._order = order; a._orderForPool = a._pool; a._curPass = 0; window.__spoke = []; window.LCS_reloadFirstTask();
      }, rid);
      await sp.waitForFunction(() => window.BundleBotActivity.round, { timeout: 4000 });
      await sleep(60);
      /* ⚠ COLLECT ACROSS THE WHOLE ROUND, NOT ONE FRAME. The first version clicked the lever
         first, which sets this.msg and REPLACES the question in Bolt's bubble — so stripping an
         sv q-string survived the poison because the question was never on screen. And it set
         cstate directly instead of solving, so _win never ran and the NUMBER WORD (spoken and
         rendered) was never produced, letting a missing numWordSV survive too. Two poisons
         passed against a gate that never reached the strings it was testing. */
      const snap = async () => sp.evaluate(() => ({
        text: (document.querySelector('.lcs-app') || document.body).innerText || '',
        aria: [...document.querySelectorAll('.lcs-app [aria-label]')].map(e => e.getAttribute('aria-label')).join(' | '),
        spoke: (window.__spoke || []).join(' | ')
      }));
      const frames = [await snap()];                                  // the QUESTION state
      await sp.evaluate(() => { const l = document.querySelector('.bb-lever'); if (l) l.click(); });
      await sleep(60);
      frames.push(await snap());                                      // the REFUSE state
      /* ⚠ _win is reached ONLY from the activity's own handlers (feed / pull / unbundle), never by
         setting cstate and clicking Check — isCorrect() just reports this.solved, which _win sets.
         So park the machine ONE REAL ACTION short of the solution and perform that action. Without
         this the win line never rendered and a missing numWordSV survived the poison. */
      await sp.evaluate(() => {
        const a = window.BundleBotActivity, C = window.BundleMachineCore;
        /* Park ONE loose one ABOVE the solution and remove it. Removing an over-shoot lands the
           target for every cog (the activity checks isSolved in _removeOne too), whereas FEEDING
           one does not: on the overfill round the clump feeder adds three at a time, so a feed
           overshot and that round never reached the win. One uniform real action. */
        a.cstate.tens = C.solveTens(a.round); a.cstate.ones = C.solveOnes(a.round) + 1; a.render();
      });
      await sleep(40);
      await sp.evaluate(() => { const c = document.querySelector('.bb-cube'); if (c) c.click(); });
      await sleep(160);
      frames.push(await snap());                                      // the WIN state
      const seen = {
        text: frames.map(f => f.text).join(' | '),
        aria: frames.map(f => f.aria).join(' | '),
        spoke: frames.map(f => f.spoke).join(' | ')
      };
      const won = await sp.evaluate(() => !!window.BundleBotActivity.solved);
      note(won, `sv/${rid}: the round did not reach the win state — the number-word channel is unchecked`);
      spokeTotal += seen.spoke.length;
      const hay = seen.text + ' | ' + seen.aria + ' | ' + seen.spoke;
      note(seen.text.trim().length > 0, `sv/${rid}: nothing rendered — vacuous`);
      for (const [key, enVal] of pairs) {
        const segs = String(enVal).split(/\{[^}]*\}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(s => s.length >= 6);
        if (!segs.length) continue;
        const probe = segs.sort((a, b) => b.length - a.length)[0];
        note(hay.indexOf(probe) === -1, `sv/${rid}: the ENGLISH '${key}' reached the child — "${probe}"`);
      }
      /* fragments only the LANG chains can produce — none is in the strings table */
      for (const frag of ['not ten yet', 'all bundled', 'Bundle Bot', 'twenty', 'thirty', 'forty']) {
        note(hay.toLowerCase().indexOf(frag.toLowerCase()) === -1, `sv/${rid}: an English code fragment reached the child — "${frag}"`);
      }
    }
    note(spokeTotal > 0, 'sv: NOTHING was spoken across 9 rounds — the speech channel is unchecked');
    const bad = fails.length - svAt;
    console.log(bad ? `  FAIL bundle-bot/sv — ${bad} English leak(s)` : `  ok   bundle-bot/sv — no English in text, aria or speech across ${ids.length} rounds`);
    await sp.close();
  } catch (e) { fails.push('bundle-bot/sv: ' + e.message); console.log(`  FAIL bundle-bot/sv — ${e.message}`); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`BUNDLE-BOT LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('BUNDLE-BOT LOCAL TEST PASSED — NO auto-bundle (feeding ten with no pull leaves the tens column empty); feed→pull seals one rod; sub-ten pull refuses (non-shame); ' +
    'impostor seeded-9 refuses + a counted ten bundles; un-bundle a rod → 10 scatter cubes; canonical-form solve (all-loose not solved → bundle); decade ends empty-tray; ≥7 rounds + 6 cogs + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
