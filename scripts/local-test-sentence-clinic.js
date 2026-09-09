#!/usr/bin/env node
/* =====================================================================
   local-test-sentence-clinic.js — interaction harness for the fix-it
   clinic (Dr. Plume / Doktor Fjäder), CCSS L.2.1 / Lgr22 åk 2.
   Serves `mini tools/` and drives the real shell with puppeteer.

   ⚠⚠ WHAT CHANGED (sv #25). This was an EN-ONLY pilot: the URL hard-coded
   `lang=en` and it asserted the English title literally, so a naive locale
   flag would have failed on any non-English run. It now drives EN **and**
   SV over every one of the 7 actions, asserts each locale runs its OWN
   manifest pool, and adds the two assertions below.

   Per locale:
     • renders the owl + the sentence card + Check;
     • NO BLIND-SWAP: zero option chips before a correct diagnosis; tapping
       a HEALTHY word does not advance and keeps chips hidden; tapping the
       troubled word reveals them;
     • all 7 actions complete via their correct interaction → phase 'done'
       → Check celebrates + locks;
     • ⭐ THE MISS CHANNEL DOES NOT LEAK THE ANSWER. `_giggle` used to
       announce `giggle + round.convention` on EVERY wrong tap, while the
       visible caption is gated on `if (this.readOnly)` — so a sighted
       child saw the rule only AFTER solving and a screen-reader child was
       handed it mid-round. In 5 of the 21 shipped chip rounds that rule
       names the correct chip outright. This is asserted at RUNTIME, on a
       real miss, rather than as a rule about the DATA: with the leak
       fixed, a convention that names the answer is exactly right — it is
       a post-solve reward — so a data-level ban would condemn the correct
       Swedish `Vi säger ”å” — men vi skriver ”och”.`
     • ⭐ A SOLVED INSERT ROUND LEAVES NO EMPTY GAP. The `sc-gap` render
       had no readOnly guard (the seam block four lines below did), so the
       finished card drew the repaired sentence PLUS a stray pulsing notch.
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.

   Usage: node scripts/local-test-sentence-clinic.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sentence-clinic.fix-it.l-2-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

/* the expected header per locale, read from the SHIPPED strings table rather than
   re-typed here, so a rename cannot make this gate silently wrong */
const activitySrc = fs.readFileSync(path.join(MINI, 'sentence-clinic-activity.js'), 'utf8');
function shippedTitle(loc) {
  const m = activitySrc.match(/\n      title:\s*\{([^\n]*)\}/);
  if (!m) throw new Error('could not read the title table out of sentence-clinic-activity.js');
  const e = new RegExp("(?:^|[,{])\\s*" + loc + ":\\s*(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')").exec(m[1]);
  if (!e) throw new Error('no title.' + loc + ' in the shipped strings table');
  return e[1].slice(1, -1).replace(/\\(['"])/g, '$1');
}

const LOCALES = ['en', 'sv'];
const ROUNDS = ['cap-start', 'mark-end', 'swap-agree', 'fill-verb', 'order-svo', 'del-double', 'split-runon'];

/* ⚠ whole-WORD containment, never indexOf. Locating a token by substring inside rendered
   prose is the trap that made a correct fix look broken twice in sv #24 (`he` inside "the",
   `ich` inside "mich"). Split on non-letters and compare tokens. */
function namesWord(haystack, word) {
  if (!word || !/\p{L}/u.test(word)) return false;
  return String(haystack).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean).includes(String(word).toLowerCase());
}

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
  const BASE = `http://127.0.0.1:${PORT}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const seenTitles = {};

  for (const LOC of LOCALES) {
    const note = (cond, msg) => { if (!cond) fails.push(`[${LOC}] ` + msg); };
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = `${BASE}/sentence-clinic-activity.html?lang=${LOC}&activity=${ACTIVITY}&embed=1`;
    async function force(roundId) {
      await page.evaluate((rid) => {
        const t = window.SentenceClinicActivity;
        const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex(x => x.id === 'sentence-clinic.' + rid);
        const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0;
        window.LCS_reloadFirstTask();
      }, roundId);
      await page.waitForFunction(() => window.SentenceClinicActivity.round, { timeout: 4000 });
    }
    const meta = () => page.evaluate(() => { const r = window.SentenceClinicActivity.round; return { id: r.id, action: r.action, targetIndex: r.targetIndex, gapIndex: r.gapIndex, seamIndex: r.seamIndex, replacement: r.replacement, distractors: r.distractors, correctOrder: r.correctOrder, tokens: r.tokens, convention: r.convention }; });
    const state = () => page.evaluate(() => ({ done: window.SentenceClinicActivity.phase === 'done', opts: document.querySelectorAll('.sc-opt').length, celebrated: !!(document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate')), readOnly: window.SentenceClinicActivity.readOnly, msg: (document.querySelector('.sc-msg') || {}).textContent || '' }));
    async function clickWord(i) { const w = await page.$$('button.sc-chip'); if (w[i]) await w[i].click(); }
    async function clickSeam(i) { const s = await page.$$('.sc-seam'); if (s[i]) await s[i].click(); }
    async function clickOptText(txt) {
      const opts = await page.$$('.sc-opt');
      for (const o of opts) { const t = await (await o.getProperty('textContent')).jsonValue(); if (String(t).trim() === txt) { await o.click(); return true; } }
      return false;
    }
    /* ⚠ the reorder tray renders in DESCRIPTOR order minus already-placed tokens
       (`this.round.tokens.forEach`, no shuffle), so a token is reached by computing its
       tray POSITION, never by matching its text — two identical tokens would be ambiguous. */
    async function clickTrayIndex(ti, placed) {
      const pos = Array.from({ length: ti }, (_, k) => k).filter(k => placed.indexOf(k) < 0).length;
      const opts = await page.$$('.sc-opt');
      if (!opts[pos]) return false;
      await opts[pos].click(); return true;
    }
    async function solve(m) {
      if (m.action === 'capitalize' || m.action === 'delete') { await clickWord(m.targetIndex); }
      else if (m.action === 'insert-punct' || m.action === 'insert-word') { await clickOptText(m.replacement); }
      else if (m.action === 'split') { await clickSeam(m.seamIndex); }
      else if (m.action === 'swap') { await clickWord(m.targetIndex); await new Promise(r => setTimeout(r, 80)); await clickOptText(m.replacement); }
      else if (m.action === 'reorder') {
        const placed = [];
        for (const ti of m.correctOrder) { await clickTrayIndex(ti, placed); placed.push(ti); await new Promise(r => setTimeout(r, 80)); }
      }
      await new Promise(r => setTimeout(r, 120));
    }

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.SentenceClinicActivity;
        return t && t._activityRow && document.querySelector('.sc-plume') && document.querySelector('.sc-chip') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      note(!!(await page.$('.sc-plume-svg')), 'no owl mascot');
      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      seenTitles[LOC] = title;
      note(title === shippedTitle(LOC), `header title "${title}" ≠ the shipped strings.title.${LOC} "${shippedTitle(LOC)}"`);
      note(!!(await page.$('.sc-msg')), 'no .sc-msg feedback line — alright/giggle/soundsRight would reach only the aria-live region');

      /* the locale runs its OWN pool, not a silent English fallback.
         ⚠ `_buildTasksFromRow` is `roundsL10n[LANG] || row.params.rounds`, so a missing sv key
         degrades to the ENGLISH ROUNDS with nothing failing — this is the assertion that sees it. */
      const firstTokens = (await meta()).tokens.join(' ');
      note(!!firstTokens, 'no tokens rendered');
      /* ⚠ _pool items hold a CLOSURE over the round (makeTasks captures `r` in setup), so there
         is no `.tokens` to read there. The rendered tokens are collected in the 7-action loop
         below — after every round has actually been on screen — and compared there. */
      const seenTokens = [];

      /* variety/shuffle via nextTask */
      const N = await page.evaluate(() => window.SentenceClinicActivity._pool.length);
      const ids = await page.evaluate((count) => { const t = window.SentenceClinicActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      note(new Set(p1).size >= 7, `only ${new Set(p1).size} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), 'pass-2 not same set');
      note(p1.join('|') !== p2.join('|'), 'pass-2 order identical (no reshuffle)');

      /* NO BLIND-SWAP */
      await force('swap-agree');
      const sm = await meta();
      const before = await state();
      note(before.opts === 0, `swap: ${before.opts} option chips shown BEFORE diagnosis (blind-swap must be impossible)`);
      const healthy = (sm.targetIndex + 2) % sm.tokens.length;
      await clickWord(healthy === sm.targetIndex ? (sm.targetIndex + 1) % sm.tokens.length : healthy);
      const afterHealthy = await state();
      note(afterHealthy.opts === 0 && !afterHealthy.done, 'swap: tapping a healthy word revealed chips / advanced (must not)');
      /* the healthy tap must also SAY something on screen — those strings used to reach the
         aria-live region only, so a sighted child got a beep and nothing else. */
      note(afterHealthy.msg.trim().length > 0, 'swap: tapping a healthy word produced no visible feedback at all');
      await clickWord(sm.targetIndex);
      const afterDiag = await state();
      note(afterDiag.opts > 0, 'swap: correct diagnosis did NOT reveal the repair chips');

      /* ⭐ THE MISS MUST NOT LEAK THE ANSWER — drive a real wrong chip and read what is said */
      const wrong = (sm.distractors || []).find(d => d !== sm.replacement);
      note(!!wrong, 'swap: no distractor to tap');
      if (wrong) {
        await clickOptText(wrong);
        await new Promise(r => setTimeout(r, 120));
        const missState = await state();
        note(!missState.done, 'swap: a WRONG chip resolved the round');
        note(missState.msg.trim().length > 0, 'swap: a wrong chip produced no visible message');
        note(!namesWord(missState.msg, sm.replacement),
          `swap: the MISS message names the correct chip "${sm.replacement}" — "${missState.msg.trim()}"`);
        note(missState.msg.indexOf(sm.convention) < 0,
          `swap: the MISS message carries the round's convention (the post-solve teaching caption) — "${missState.msg.trim()}"`);
      }
      await clickOptText(sm.replacement);
      const swapDone = await state();
      note(swapDone.done, 'swap: correct repair did not reach done');

      /* EVERY action completes via its correct interaction */
      for (const rid of ROUNDS) {
        await force(rid);
        const m = await meta();
        seenTokens.push(m.tokens.join(' '));
        await solve(m);
        const st = await state();
        note(st.done, `action '${m.action}' (${rid}) did not complete via the correct interaction`);
        if (st.done) {
          /* ⭐ a solved INSERT round must leave no empty gap behind */
          if (m.action === 'insert-punct' || m.action === 'insert-word') {
            const strays = await page.evaluate(() => Array.from(document.querySelectorAll('.sc-gap')).filter(n => !n.textContent.trim()).length);
            note(strays === 0, `${rid}: ${strays} empty .sc-gap left on the SOLVED card (a stray notch inside the repaired sentence)`);
          }
          await page.click('.lcs-activity-check');
          const fin = await state();
          note(fin.celebrated && fin.readOnly, `${rid}: Check did not celebrate + lock`);
        }
      }

      /* ⭐ the locale runs its OWN pool, not a silent English fallback.
         `_buildTasksFromRow` is `roundsL10n[LANG] || row.params.rounds`, so a missing sv key
         degrades to the ENGLISH ROUNDS with nothing failing — a half-built locale would render
         English sentences under a Swedish UI and look merely "not wired up yet". */
      if (LOC !== 'en') {
        const manifest = JSON.parse(fs.readFileSync(path.join(MINI, 'sentence-clinic-activities.json'), 'utf8'));
        const enTokens = (manifest.rows || manifest)[0].params.rounds.map(r => r.tokens.join(' '));
        const leaked = seenTokens.filter(t => enTokens.includes(t));
        note(leaked.length === 0, `${leaked.length} round(s) rendered the ENGLISH sentence — the pool fell back (first: "${leaked[0]}")`);
      }

      /* mobile overflow 280→768 */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 800 });
        await force('order-svo');
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
      }

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      console.log(`  ${fails.filter(f => f.startsWith('[' + LOC + ']')).length ? 'FAIL' : 'ok  '} sentence-clinic/${LOC} — "${title}"`);
    } catch (e) {
      fails.push(`[${LOC}] ` + e.message);
      console.log(`  FAIL sentence-clinic/${LOC} — ${e.message}`);
    } finally { await page.close(); }
  }

  /* cross-locale chrome leak: the two headers must not be the same string */
  if (seenTitles.en && seenTitles.sv) {
    if (seenTitles.en === seenTitles.sv) fails.push(`both locales rendered the SAME header "${seenTitles.en}" — the locale never took`);
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SENTENCE-CLINIC LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`SENTENCE-CLINIC LOCAL TEST PASSED — ${LOCALES.join(' + ')}: owl + sentence render, each locale runs its own pool, ` +
    `blind-swap impossible, the miss message says nothing that names the answer, all 7 actions complete + Check celebrates, ` +
    `no stray gap on a solved insert round, ≥7 reshuffle, no overflow 280→768.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
