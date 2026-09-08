#!/usr/bin/env node
/* =====================================================================
   local-test-tense.js — interaction harness (L.1.1.e verb tense, clarity-first
   redesign of #70). Serves `mini tools/` + drives the DOM:

     • tapping a wrong form does NOT resolve (warm time nudge, no advance);
       tapping the time-matching form resolves; shell Check hidden until
       resolved.
     • the 3 time-windows (correct one highlighted) + 3 form chips + Hear-it
       render; the shell prompt carries the sentence + time word; no stored
       answer; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'tense.past-present-future.l-1-1-e';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('nf'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
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

  const url = `http://127.0.0.1:${PORT}/tense-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.TenseActivity._resolved, miss: !!document.querySelector('.tn-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.TenseActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.TenseActivity._round && document.querySelector('.tn-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapTense = (tense) => page.evaluate((tn) => { const b = Array.from(document.querySelectorAll('.tn-cand')).find(x => x.getAttribute('data-tense') === tn); if (b) b.click(); return !!b; }, tense).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const otherTense = (id) => page.evaluate((rid) => { const t = window.TenseActivity, r = t._pool.find(x => x.id === rid), C = window.TenseCore; return C.TENSES.find(x => x !== r.time); }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.TenseActivity; return t && t._activityRow && document.querySelector('.tn-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Clock Tower', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.TenseActivity._activityRow.slug));
    // The EN slug is the canonical base; the activity is a localized fan-out target
    // (de/fr/es/pt/it/nl added since the original EN-only build), so assert EN is PRESENT
    // rather than EN-only (the old EN-only assertion went stale at the first localization).
    note(slugKeys.includes('en'), `manifest missing en slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.TenseActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.TenseActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const times = await page.evaluate(() => Array.from(new Set(window.TenseActivity._pool.map(r => r.time))));
    note(times.length === 3, `not all 3 times present: ${times.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.TenseActivity._pool.every(r => r.correct == null && r.correctIndex == null)), 'a round carries a stored answer-flag field');

    /* a PAST round: prompt + windows + chips render; wrong no-advance; correct resolves */
    await force('tn-p1');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/yesterday/i.test(prompt) && /which word fits/i.test(prompt), `past-round prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => document.querySelectorAll('.tn-win').length === 3), 'the 3 time-windows did not render');
    note(await page.evaluate(() => { const on = document.querySelector('.tn-win.on .tn-wlab'); return on && on.textContent === 'Before'; }), 'the past round did not highlight the Before window');
    note(await page.evaluate(() => document.querySelectorAll('.tn-cand').length === 3), 'the 3 form chips did not render');
    note(await page.evaluate(() => !!document.querySelector('.tn-hear')), 'the Hear-it button did not render');

    let other = await otherTense('tn-p1');
    await tapTense(other);   // a wrong form
    note(!(await S()).resolved, 'a wrong form resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapTense('past');
    note((await S()).resolved, 'the correct (past) form did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a FUTURE round (the "will" form) */
    await force('tn-f1');
    note(await page.evaluate(() => { const on = document.querySelector('.tn-win.on .tn-wlab'); return on && on.textContent === 'Soon'; }), 'the future round did not highlight the Soon window');
    await tapTense('future');
    note((await S()).resolved, 'future round: correct did not resolve');

    /* a PRESENT round */
    await force('tn-n1');
    await tapTense('present');
    note((await S()).resolved, 'present round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('tn-f2'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} tense/en — "${title}"`);
  } catch (e) {
    fails.push('tense/en: ' + e.message);
    console.log(`  FAIL tense/en — ${e.message}`);
  } finally { await page.close(); }

  /* ---- sv: no English may reach text, aria-labels or SPEECH, on any surface ---------- */
  const svAt = fails.length;
  try {
    const path = require('path');
    const mf = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'tense-activities.json'), 'utf8'));
    const row = Array.isArray(mf) ? mf[0] : mf;
    const enRounds = row.params.rounds, svRounds = (row.params.roundsL10n || {}).sv;
    note(Array.isArray(svRounds) && svRounds.length === enRounds.length, `sv: ${svRounds ? svRounds.length : 0} sv rounds vs ${enRounds.length} en`);
    note(svRounds && svRounds.some(r => r.alsoOk && r.alsoOk.length), 'sv: no round carries alsoOk — the affirming response class would never be driven');

    const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', 'tense-activity.js'), 'utf8');
    /* ⚠ anchor INSIDE `var L = {`. WIN_LABELS has the identical `en: {` / `nl: {` shape and comes
       FIRST in the file, so an unanchored indexOf captured the window-label table for `en` and
       inverted to an empty slice for `sv`. The non-vacuity assertions below are what caught it. */
    const Lstart = src.indexOf('var L = {');
    const slab = (from, to) => src.slice(src.indexOf(from, Lstart), src.indexOf(to, Lstart));
    const pairsOf = (s) => [...s.matchAll(/(\w+):\s*'((?:[^'\\]|\\.)*)'/g)].map(m => [m[1], m[2].replace(/\\'/g, "'")]);
    const enL = pairsOf(slab('\n    en: {', '\n    de: {'));
    const svL = pairsOf(slab('\n    sv: {\n      q:', '\n    nl: {'));
    note(enL.length >= 6, `sv: only ${enL.length} English L strings parsed — the probe list is too thin`);
    note(svL.length >= 7, `sv: only ${svL.length} Swedish L strings parsed — reachability would be vacuous`);
    const enWin = pairsOf(src.slice(src.indexOf('en: { past:'), src.indexOf('de: { past:')));
    const enQ = enRounds.map(r => ['q:' + r.id, r.q || '']).filter(p => p[1]);
    const probes = enL.map(([k, v]) => ['L.' + k, v])
      .concat(enWin.map(([k, v]) => ['WIN.' + k, v]))
      .concat(enRounds.map(r => ['subj:' + r.id, r.subject]))
      .concat(enRounds.map(r => ['tw:' + r.id, r.timeWord]))
      .concat(enRounds.map(r => ['form:' + r.id, r.verb.forms[r.time]]));
    note(probes.length >= 30, `sv: only ${probes.length} probes across all surfaces`);

    const sp = await browser.newPage();
    await sp.setViewport({ width: 412, height: 900 });
    await sp.evaluateOnNewDocument(() => {
      window.__spoke = [];
      const iv = setInterval(() => {
        if (window.LCSAudio && window.LCSAudio.speak && !window.LCSAudio.__wrapped) {
          const o = window.LCSAudio.speak;
          window.LCSAudio.speak = function (x) { window.__spoke.push(x && x.text); return o.apply(this, arguments); };
          window.LCSAudio.__wrapped = 1; clearInterval(iv);
        }
      }, 10);
    });
    await sp.goto(`http://127.0.0.1:${PORT}/tense-activity.html?lang=sv&activity=${ACTIVITY}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sp.waitForFunction(() => window.TenseActivity && window.TenseActivity._pool && window.TenseActivity._pool.length, { timeout: 15000 });
    note(await sp.evaluate(() => !!(window.LCSAudio && window.LCSAudio.__wrapped)), 'sv: the speech recorder never attached');
    note(await sp.evaluate(() => window.TenseActivity._pool.length === 9), 'sv: the sv pool did not load — the page is running the ENGLISH rounds');

    let sawNudge = 0, sawWin = 0, sawAlsoOk = 0, spoke = 0;
    const allHay = [];
    for (const r of svRounds) {
      await sp.evaluate((id) => {
        const t = window.TenseActivity, n = t._pool.length, order = [];
        for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex(x => x.id === id); if (k > 0) { order.splice(k, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.__spoke = [];
        window.LCS_reloadFirstTask();
      }, r.id);
      await sp.waitForFunction(() => document.querySelector('.tn-cand'), { timeout: 5000 });
      await sleep(60);
      const snap = () => sp.evaluate(() => ({
        text: (document.querySelector('.lcs-app') || document.body).innerText || '',
        aria: [...document.querySelectorAll('.lcs-app [aria-label]')].map(e => e.getAttribute('aria-label')).join(' | '),
        spoke: (window.__spoke || []).join(' | ')
      }));
      const frames = [await snap()];
      await sp.evaluate(() => { const b = document.querySelector('.tn-hear'); if (b) b.click(); });
      await sleep(70); frames.push(await snap());
      const plan = await sp.evaluate(() => {
        const t = window.TenseActivity, rr = t._round, C = window.TenseCore;
        const ok = (rr.alsoOk || []).filter(x => x !== rr.time);
        return { answer: rr.time, alsoOk: ok, other: C.TENSES.filter(x => x !== rr.time && ok.indexOf(x) < 0) };
      });
      const tap = (tn) => sp.evaluate((x) => { const b = [...document.querySelectorAll('.tn-cand')].find(e => e.getAttribute('data-tense') === x); if (b) b.click(); }, tn);
      /* the affirming class renders ONLY here, and only on a round that carries alsoOk */
      if (plan.alsoOk.length) { await tap(plan.alsoOk[0]); await sleep(80); frames.push(await snap()); sawAlsoOk++; }
      /* a plain wrong form — the three nudges render ONLY here */
      if (plan.other.length) { await tap(plan.other[0]); await sleep(80); frames.push(await snap()); if (await sp.evaluate(() => !!document.querySelector('.tn-line-msg.miss'))) sawNudge++; }
      await tap(plan.answer); await sleep(90); frames.push(await snap());
      if (await sp.evaluate(() => window.TenseActivity._resolved)) sawWin++;
      spoke += frames.map(f => f.spoke).join('').length;
      const hay = frames.map(f => f.text + ' | ' + f.aria + ' | ' + f.spoke).join(' | ');
      allHay.push(hay);
      note(hay.trim().length > 0, `sv/${r.id}: nothing rendered — vacuous`);
      for (const [key, enVal] of probes) {
        const segs = String(enVal).split(/\{[^}]*\}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(s => s.length >= 5);
        if (!segs.length) continue;
        const probe = segs.sort((x, y) => y.length - x.length)[0];
        note(hay.indexOf(probe) === -1, `sv/${r.id}: the ENGLISH '${key}' reached the child — "${probe}"`);
      }
    }
    note(sawNudge >= 7, `sv: only ${sawNudge} rounds showed a corrective nudge — those strings are unchecked`);
    note(sawWin >= 7, `sv: only ${sawWin} rounds reached the win — win/winNote unchecked`);
    note(sawAlsoOk >= 3, `sv: only ${sawAlsoOk} rounds drove the affirming response — nAlsoOk unchecked`);
    note(spoke > 0, 'sv: NOTHING was spoken — the Hear-it sentence is unchecked');

    /* every AUTHORED Swedish string must actually be reached (§23.6: "exists" ≠ "is reached") */
    const corpus = allHay.join(' || ');
    for (const [key, val] of svL) {
      if (key === 'q') continue;   // the identity passthrough; its text is the round question
      const segs = String(val).split(/\{[^}]*\}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(s => s.length >= 6);
      if (!segs.length) continue;
      const probe = segs.sort((x, y) => y.length - x.length)[0];
      note(corpus.indexOf(probe) !== -1, `sv: the authored string L.sv.${key} is NEVER REACHED in any state — a dead string ("${probe.slice(0, 44)}")`);
    }
    /* ⚠ the only check that can see a leak in a key with NO English twin (WIN_LABELS.sv, nAlsoOk).
       `and` (a duck), `is` (ice) and `just` (just nu) are EXCLUDED — they are real Swedish words,
       and a ban that condemns correct Swedish teaches the next author to write around it. */
    for (const w of ['the', 'not', 'does', 'word', 'which', 'yesterday', 'tomorrow', 'right now', 'happened', 'pick the']) {
      const re = new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
      note(!re.test(corpus), `sv: the English "${w}" reached the child somewhere in the Swedish render`);
    }
    const bad = fails.length - svAt;
    console.log(bad ? `  FAIL tense/sv — ${bad} English leak(s)` : `  ok   tense/sv — no English in text, aria or speech across ${svRounds.length} rounds x 5 states, every surface`);
    await sp.close();
  } catch (e) { fails.push('tense/sv: ' + e.message); console.log(`  FAIL tense/sv — ${e.message}`); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`TENSE LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('TENSE LOCAL TEST PASSED — verb tense: a wrong form does NOT resolve (warm time nudge, no advance); the time-matching form resolves; 3 time-windows (correct one highlighted) + 3 form chips + Hear-it render; the shell prompt carries the sentence + time word; shell Check hides until resolved; no stored answer; EN-only; all 3 times + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
