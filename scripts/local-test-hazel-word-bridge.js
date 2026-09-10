#!/usr/bin/env node
/* =====================================================================
   local-test-hazel-word-bridge.js — interaction harness for "Hazel's Word Bridge"
   (CCSS L.1.1.g, conjunctions). Serves `mini tools/`; drives the real shell in
   en AND sv:
     • a round renders the sentence card with a "___" gap + 4 conjunction chips;
     • tapping the fitting conjunction → shell Check → celebrate;
     • tapping a wrong one → tryagain, the tapped chip turns coral, and the board
       still never reveals WHICH chip was right;
     • three states, three colours: GOLD chosen · CORAL wrong · GREEN right — asserted
       as RESOLVED colours, because all three are two-class rules whose ties the cascade
       breaks on source ORDER alone;
     • chips SHUFFLED; tap-to-deselect; ≥7 distinct rounds + reshuffle;
     • no overflow 280→768.

   ⚠⚠ THE EXPECTED ANSWER IS COMPUTED FROM THE MANIFEST, NEVER FROM THE CORE.
   `conjunction-core.js` hard-codes RELATION_CONJ = {addition:'and', contrast:'but',
   cause:'because', result:'so'}. Applied to a localized round it returns a plausible
   ENGLISH word most of the time and **''** for relation 'alternative', which every
   localized deck uses. The previous version of this file called
   `ConjunctionCore.oracle(...)` — on an sv `alternative` round that is '', so the
   harness would `querySelector('.hwb-chip[data-w=""]')`, find nothing, silently do
   nothing, and then assert against a board it never touched. That is the recorded
   "a click helper that silently no-ops hollows out the next assertion" trap.
   ⚠ And `hwbOracle`/`hwbIsAnswer` are module-private in the activity — not on
   `window` — so there is no locale-correct oracle to call. Hence the local table.

   ⭐ AND NOTHING IS HARD-CODED IN ENGLISH ANY MORE. The old version drove round ids
   ('hatcoat', 'boots', 'dark'…) and a literal title "Hazel's Word Bridge", so it was
   structurally incapable of running in a second locale.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'hazel-word-bridge.joining-words.l-1-1-g';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const LOCALES = ['en', 'sv'];
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

/* the relation → conjunction truth, per locale. Mirrors verify-conjunction-core.js. */
const CONJ = {
  en: { addition: 'and', contrast: 'but', cause: 'because', result: 'so' },
  sv: { addition: 'och', alternative: 'eller', contrast: 'men', cause: 'för' },
};

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
  const row = JSON.parse(fs.readFileSync(path.join(MINI, 'hazel-word-bridge-activities.json'), 'utf8'))
    .find((r) => r.id === ACTIVITY);
  const activitySrc = fs.readFileSync(path.join(MINI, 'hazel-word-bridge-activity.js'), 'utf8');
  const svLine = (key) => {
    const line = activitySrc.split(/\r?\n/).find((l) => l.trim().indexOf(key + ': {') === 0);
    if (!line) return null;
    const i = line.lastIndexOf('sv: ');
    if (i < 0) return null;
    const q = line[i + 4]; let v = '', j = i + 5;
    while (j < line.length && line[j] !== q) { v += line[j]; j++; }
    return v;
  };
  const enLine = (key) => {
    const line = activitySrc.split(/\r?\n/).find((l) => l.trim().indexOf(key + ': {') === 0);
    const i = line.indexOf('en: ');
    const q = line[i + 4]; let v = '', j = i + 5;
    while (j < line.length && line[j] !== q) { v += line[j]; j++; }
    return v;
  };

  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  for (const LOC of LOCALES) {
    const note = (cond, msg) => { if (!cond) fails.push(`${LOC}: ${msg}`); };
    const pool = (row.params.roundsL10n && row.params.roundsL10n[LOC]) || row.params.rounds;
    const ids = pool.map((r) => r.id);
    const table = CONJ[LOC];
    const expect = (rid) => table[pool.find((r) => r.id === rid).relation];
    const wantTitle = LOC === 'en' ? enLine('title') : svLine('title');

    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = `http://127.0.0.1:${PORT}/hazel-word-bridge-activity.html?lang=${LOC}&activity=${ACTIVITY}&embed=1`;

    async function force(id) {
      await page.evaluate((rid) => {
        const t = window.HazelWordBridgeActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex(x => x.id === 'hazel-word-bridge.' + rid);
        const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
      }, id);
      await page.waitForFunction(() => window.HazelWordBridgeActivity.round && document.querySelector('.hwb-root'), { timeout: 4000 });
      await sleep(40);
      /* ⚠ a force() that silently lands on the wrong round hollows out everything after it */
      const got = await page.evaluate(() => window.HazelWordBridgeActivity.round.id);
      if (got !== id) throw new Error(`force("${id}") landed on "${got}"`);
    }
    /* ⚠ every tap asserts the chip EXISTS — a no-op tap must fail loudly, not quietly */
    const tap = (w) => page.evaluate((x) => {
      const b = document.querySelector('.hwb-chip[data-w="' + x + '"]');
      if (!b) throw new Error('no chip labelled "' + x + '" on the board');
      b.click();
    }, w).then(() => sleep(40));
    const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
    const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    const firstChipText = () => page.$eval('.hwb-chip', e => e.textContent.trim()).catch(() => '');
    const chipSet = () => page.$$eval('.hwb-chip', els => els.map(e => e.textContent.trim()).sort().join('|'));

    let title = '';
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.HazelWordBridgeActivity; return t && t._activityRow && document.querySelector('.hwb-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

      title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      note(!!wantTitle, 'no title string declared for this locale in the strings table');
      note(title === wantTitle, `header title "${title}" (strings table says "${wantTitle}")`);

      /* ⚠ the shell falls back to ENGLISH when a locale is missing inside an existing key
         (lcs-shell.js:80-84), so a missing sv string renders silent English, not a raw token. */
      if (LOC !== 'en') {
        note(title !== enLine('title'), 'the header rendered the ENGLISH title — the sv string is missing and the shell fell back silently');
        const ask = await page.$eval('.hwb-ask', e => e.textContent.trim()).catch(() => '');
        note(ask !== enLine('theAsk'), `the ask line rendered the ENGLISH text ("${ask}")`);
      }

      /* ⭐⭐ THE CHIPS ON SCREEN MUST BE THIS LOCALE'S CHIPS. If REL_CONJ_<LOC> or
         CHIPS_<LOC> is missing, the board silently shows the ENGLISH set and nothing
         is ever correct — the single highest-risk failure mode of this engine. */
      const shown = await chipSet();
      const wantChips = Object.values(table).slice().sort().join('|');
      note(shown === wantChips, `the board shows chips ${shown} — expected this locale's ${wantChips}`);

      const Np = await page.evaluate(() => window.HazelWordBridgeActivity._pool.length);
      note(Np === pool.length, `browser pool ${Np} != manifest pool ${pool.length}`);
      const seq = await page.evaluate((count) => { const t = window.HazelWordBridgeActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
      note(new Set(seq.slice(0, Np)).size >= 7, `only ${new Set(seq.slice(0, Np)).size} distinct rounds (<7)`);
      note(seq.slice(0, Np).join(',') !== seq.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

      /* a SELECTION IS NOT A VERDICT — assert before any Check */
      await force(ids[0]);
      await tap(Object.values(table).find((c) => c !== expect(ids[0])));
      const pickColour = await page.$eval('.hwb-chip.hwb-sel', e => getComputedStyle(e).borderTopColor).catch(() => null);
      note(pickColour !== 'rgb(242, 120, 75)', 'the SELECTED chip wears the try-again colour before Check — a selection is not a verdict');
      note(pickColour !== 'rgb(47, 165, 106)', 'the SELECTED chip wears the success colour before Check — the board is grading a selection');
      await force(ids[0]);
      note(!!(await page.$('.hwb-sent')), 'no sentence card');
      note(await page.$$eval('.hwb-chip', els => els.length) === 4, 'did not render 4 chips');
      const sentence = await page.$eval('.hwb-senttxt', e => e.textContent);
      note(sentence.indexOf('___') >= 0, 'the sentence card has no gap');
      note(!/ {2}/.test(sentence), `the rendered sentence has a double space: "${sentence.trim()}"`);

      await tap(expect(ids[0])); await check();
      note(await celebrated(), `the fitting conjunction "${expect(ids[0])}" did not celebrate — if the whole board is wrong, REL_CONJ_${LOC.toUpperCase()} is probably missing from REL_CONJ_L10N`);

      /* a wrong chip: try-again, and nothing on the board may be marked */
      const wrongRound = ids[4];
      await force(wrongRound);
      const wrong = Object.values(table).find((c) => c !== expect(wrongRound));
      await tap(wrong); await check();
      note(await triedAgain(), 'a wrong conjunction did not show try-again');
      note(!(await celebrated()), 'a wrong conjunction celebrated (must not)');
      const leak = await page.$$eval('.hwb-chip', els => els.filter(e => /hwb-correct|hwb-right|hwb-wrong|hwb-bad/.test(e.className)).length);
      note(leak === 0, 'a chip is marked correct/wrong after a wrong pick (leak)');
      /* ⭐⭐ ONE COLOUR MUST NOT MEAN BOTH THINGS. Measure the RESOLVED colour, never the
         class list: .hwb-sel / .hwb-tried / .hwb-right are all two-class rules, so the
         cascade breaks every tie on source ORDER and a reordering reverts the meaning
         silently while the DOM still looks right. */
      const missColour = await page.$eval('.hwb-chip.hwb-tried', e => getComputedStyle(e).borderTopColor).catch(() => null);
      note(missColour === 'rgb(242, 120, 75)', `the tapped chip is not wearing the try-again colour after a wrong Check — got ${missColour}`);
      await tap(expect(wrongRound)); await check();
      note(await celebrated(), 'the fitting conjunction did not celebrate after the wrong attempt');
      const winColour = await page.$eval('.hwb-chip.hwb-right', e => getComputedStyle(e).borderTopColor).catch(() => null);
      note(winColour === 'rgb(47, 165, 106)', `the fitting chip is not wearing the success colour — got ${winColour}`);
      note(winColour !== missColour, `the win state and the MISS state wear the same colour (${missColour}) — one colour cannot mean both`);

      const firsts = [];
      for (const id of ids.slice(0, 5)) { await force(id); firsts.push(await firstChipText()); }
      note(new Set(firsts).size >= 2, `the first chip is identical across rounds (${firsts.join(',')}) — chips not shuffled`);

      await force(ids[ids.length - 1]);
      const cw = expect(ids[ids.length - 1]);
      await tap(cw); note(await page.evaluate(() => !!window.HazelWordBridgeActivity.sel), 'first tap did not select');
      await tap(cw); note(await page.evaluate(() => !window.HazelWordBridgeActivity.sel), 'second tap did not deselect');

      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        await force(ids[3]);
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `overflow ${over}px at ${w}px`);
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      console.log(`  ${fails.some(f => f.startsWith(LOC + ':')) ? 'FAIL' : 'ok  '} hazel-word-bridge/${LOC} — "${title}"`);
    } catch (e) {
      fails.push(`${LOC}: ${e.message}`);
      console.log(`  FAIL hazel-word-bridge/${LOC} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`HAZEL-WORD-BRIDGE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`HAZEL-WORD-BRIDGE LOCAL TEST PASSED (${LOCALES.join(' + ')}) — sentence card + 4 chips IN THIS LOCALE'S SET; the fitting conjunction celebrates; wrong = try-again, the TAPPED chip turns coral and no OTHER chip is marked (no leak); no double space; chips shuffle; tap-to-deselect; ≥7 distinct + reshuffle; no English fallback; no overflow 280→768.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
