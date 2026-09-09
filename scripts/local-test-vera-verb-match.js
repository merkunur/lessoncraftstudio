#!/usr/bin/env node
/* =====================================================================
   local-test-vera-verb-match.js — interaction harness for "Vera's Verb Match"
   (CCSS L.1.1.c). Serves `mini tools/`; drives the real shell in en AND sv:
     • a round renders the sentence-with-blank + 3 cards;
     • tapping the agreeing card → shell Check → celebrate (blank fills);
     • tapping a wrong card → tryagain, NO card marked (no leak);
     • cards SHUFFLED; tap-to-deselect; ≥8 distinct rounds + reshuffle; no overflow 280→768.

   ⚠⚠ THE CORRECT CARD IS FOUND FROM THE ROUND'S OWN CARDS, NEVER FROM
   `BeAgreementCore.oracle`. The core hard-codes FORMS = ['am','is','are'], so
   oracle() returns -1 for every non-English pool — a harness built on it would
   tap `.vvm-opt[data-id="-1"]`, find nothing, and then assert against a board it
   never touched. Same class as the recorded "a click helper that silently no-ops
   hollows out the next assertion".

   ⭐ AND NOTHING IS HARD-CODED IN ENGLISH ANY MORE. The old version drove round
   ids ('ready', 'dogs', 'asleep'…) and a literal title "Vera's Verb Match", so it
   was structurally incapable of running in a second locale. Ids come from the
   POOL and the expected title from the shipped strings table.

   ⭐⭐ sv IS A REBUILD WITH PER-ROUND CARDS. Swedish has no subject–verb
   agreement, so the sv deck teaches predicative ADJECTIVE agreement across the
   copula (Björnen är stor / Gräset är grönt / Blommorna är gula) and every round
   ships its own triple. That makes two sv-only assertions load-bearing here:
   the three cards CHANGE between rounds, and the card the child is SHOWN is the
   card the grader indexes — display and grading are two separate code paths, and
   patching only one marks a correct tap wrong.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'vera-verb-match.be-agreement.l-1-1-c';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const LOCALES = ['en', 'sv'];
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
  const manifest = JSON.parse(fs.readFileSync(path.join(MINI, 'vera-verb-match-activities.json'), 'utf8'));
  const row = manifest.find((r) => r.id === ACTIVITY);
  const activitySrc = fs.readFileSync(path.join(MINI, 'vera-verb-match-activity.js'), 'utf8');

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
    /* the expected title, read out of the shipped strings table rather than typed here */
    const titleRe = new RegExp("title:\\s*\\{[^}]*?[\\s,{]" + LOC + ":\\s*(['\"])((?:(?!\\1).)*)\\1", 's');
    const expectTitle = (activitySrc.match(titleRe) || [])[2];

    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = `http://127.0.0.1:${PORT}/vera-verb-match-activity.html?lang=${LOC}&activity=${ACTIVITY}&embed=1`;

    async function force(id) {
      await page.evaluate((rid) => {
        const t = window.VeraVerbMatchActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex(x => x.id === 'vera-verb-match.' + rid);
        const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
      }, id);
      await page.waitForFunction(() => window.VeraVerbMatchActivity.round && document.querySelector('.vvm-root'), { timeout: 4000 });
      await sleep(40);
      /* ⚠ tool.round is the RAW manifest round (setup() passes it straight through),
         so its id is bare — the 'vera-verb-match.' prefix lives on the TASK only. */
      const got = await page.evaluate(() => window.VeraVerbMatchActivity.round.id);
      /* ⚠ a force() that silently lands on the wrong round hollows out everything after it */
      if (got !== id) throw new Error(`force("${id}") landed on "${got}"`);
    }

    /* ⭐ the index of the correct card, from the ROUND'S OWN cards — never Core.oracle */
    const correctId = () => page.evaluate(() => {
      const t = window.VeraVerbMatchActivity, r = t.round;
      return t.view.choices.findIndex((c) => c.word === r.correct);
    });
    const wrongId = () => page.evaluate(() => {
      const t = window.VeraVerbMatchActivity, r = t.round;
      return t.view.choices.findIndex((c) => c.word !== r.correct);
    });
    const tap = (id) => page.evaluate((x) => { const b = document.querySelector('.vvm-opt[data-id="' + x + '"]'); if (!b) throw new Error('no card with data-id=' + x); b.click(); }, id).then(() => sleep(40));
    const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
    const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    const firstCardText = () => page.$eval('.vvm-opt', e => e.textContent.trim()).catch(() => '');
    const cardTexts = () => page.$$eval('.vvm-opt', els => els.map(e => e.textContent.trim()).sort().join('|'));

    let title = '';
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.VeraVerbMatchActivity; return t && t._activityRow && document.querySelector('.vvm-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

      title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      note(!!expectTitle, `no title string declared for this locale in the activity's strings table`);
      note(title === expectTitle, `header title "${title}" (strings table says "${expectTitle}")`);

      /* ⚠ the shell falls back to ENGLISH when a locale is missing inside an existing key
         (lcs-shell.js:80-84), so a missing sv string renders silent English, not a raw
         token. Assert the rendered chrome is NOT the English text. */
      if (LOC !== 'en') {
        const enTitle = (activitySrc.match(/title:\s*\{\s*en:\s*(['"])((?:(?!\1).)*)\1/) || [])[2];
        note(title !== enTitle, `the header rendered the ENGLISH title — the ${LOC} string is missing and the shell fell back silently`);
        const prompt = await page.$eval('.lcs-activity-prompt', e => e.textContent.trim()).catch(() => '');
        const enPrompt = (activitySrc.match(/prompt:\s*\{\s*en:\s*(['"])((?:(?!\1).)*)\1/) || [])[2];
        note(prompt.indexOf(enPrompt) < 0, `the prompt rendered the ENGLISH text ("${prompt}")`);
      }

      const Np = await page.evaluate(() => window.VeraVerbMatchActivity._pool.length);
      note(Np === pool.length, `browser pool ${Np} != manifest pool ${pool.length}`);
      note(Np >= 8, `only ${Np} rounds (<8)`);
      const seq = await page.evaluate((count) => { const t = window.VeraVerbMatchActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
      note(new Set(seq.slice(0, Np)).size >= 8, `only ${new Set(seq.slice(0, Np)).size} distinct rounds (<8)`);
      note(seq.slice(0, Np).join(',') !== seq.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

      await force(ids[2]);
      note(!!(await page.$('.vvm-sent')), 'no sentence');
      note(await page.$$eval('.vvm-opt', els => els.length) === 3, 'did not render 3 cards');

      /* ⭐⭐ DISPLAY === GRADING. setupTask() and vvmGrade() are two independent lookups;
         if they disagree the child is shown one triple and graded against another. */
      const shownVsPool = await page.evaluate(() => {
        const t = window.VeraVerbMatchActivity;
        return { shown: t.view.choices.map((c) => c.word), correct: t.round.correct, cards: t.round.cards || null };
      });
      if (shownVsPool.cards) note(JSON.stringify(shownVsPool.shown) === JSON.stringify(shownVsPool.cards),
        `the cards SHOWN ${JSON.stringify(shownVsPool.shown)} are not the round's own cards ${JSON.stringify(shownVsPool.cards)}`);
      note(shownVsPool.shown.indexOf(shownVsPool.correct) >= 0,
        `the correct answer "${shownVsPool.correct}" is not among the cards on screen ${JSON.stringify(shownVsPool.shown)}`);

      /* ⭐⭐ A SELECTION IS NOT A VERDICT. Tapping used to paint the child's own choice in
         this screen's try-again colour, before Check — so `picked` and `missed` rendered
         identically and the only difference lived above the panel. Assert the RESOLVED
         colour: the class list would look correct either way. */
      await tap(await wrongId());
      const pickColour = await page.$eval('.vvm-opt.vvm-sel', (e) => getComputedStyle(e).borderTopColor).catch(() => null);
      note(pickColour !== 'rgb(242, 120, 75)', 'the SELECTED card wears the try-again colour before Check — a selection is not a verdict');
      note(pickColour !== 'rgb(46, 125, 70)', 'the SELECTED card wears the success colour before Check — the board is grading a selection');
      await tap(await wrongId()); // deselect

      await tap(await correctId()); await check();
      note(await celebrated(), 'the agreeing card did not celebrate');
      note(await page.$('.vvm-blank.vvm-filled') != null, 'the blank did not fill on select');

      await force(ids[1]);
      await tap(await wrongId()); await check();
      note(await triedAgain(), 'a wrong card did not show try-again');
      note(!(await celebrated()), 'a wrong card celebrated (must not)');
      const leak = await page.$$eval('.vvm-opt', els => els.filter(e => /vvm-correct|vvm-right|vvm-wrong|vvm-bad/.test(e.className)).length);
      note(leak === 0, 'a card is marked correct/wrong after a wrong pick (leak)');
      /* ⭐⭐ ONE COLOUR MUST NOT MEAN BOTH THINGS. After a WRONG check the tapped card wears
         coral; until this build the CORRECT card wore the same coral on the win screen, so the
         board said the same thing either way and only the heading disagreed. Measure the
         RESOLVED colour, never the class list: `.vvm-sel` and `.vvm-right` are both two-class
         rules, so the cascade breaks the tie on ORDER alone and a reordering reverts it silently. */
      const missColour = await page.$eval('.vvm-opt.vvm-tried', (e) => getComputedStyle(e).borderTopColor).catch(() => null);
      note(await page.$$eval('.vvm-opt', els => els.filter(e => /vvm-right/.test(e.className)).length) === 0,
        'a card wears the SUCCESS mark after a wrong answer');
      note(await page.$$eval('.vvm-opt', els => els.filter(e => /vvm-tried/.test(e.className)).length) === 1,
        'the wrong answer left NO mark on the board — the miss frame is then identical to the picked frame');
      note(missColour === 'rgb(242, 120, 75)', `the tapped card is not wearing the try-again colour after a wrong Check — got ${missColour}`);

      await tap(await correctId()); await check();
      note(await celebrated(), 'the agreeing card did not celebrate after the wrong attempt');
      const winColour = await page.$eval('.vvm-opt.vvm-right', (e) => getComputedStyle(e).borderTopColor).catch(() => null);
      const winBlank = await page.$eval('.vvm-blank.vvm-right', (e) => getComputedStyle(e).color).catch(() => null);
      note(winColour === 'rgb(46, 125, 70)', `the correct card is not wearing the success colour — got ${winColour}`);
      note(winBlank === 'rgb(27, 94, 51)', `the completed sentence is not wearing the success colour — got ${winBlank}`);
      note(winColour !== missColour, `the win screen and the MISS screen wear the same colour (${missColour}) — one colour cannot mean both`);

      const firsts = [], sets = [];
      for (const id of ids.slice(0, 5)) { await force(id); firsts.push(await firstCardText()); sets.push(await cardTexts()); }
      note(new Set(firsts).size >= 2, `the first card is identical across rounds (${firsts.join(' / ')}) — cards not shuffled`);
      /* sv only: the deck's whole justification is that the RULE is productive, so the
         triple must actually CHANGE from round to round. */
      if (pool.some((r) => r.cards)) note(new Set(sets).size >= 5, `only ${new Set(sets).size} distinct card sets across 5 rounds — the per-round triples are not reaching the board`);

      await force(ids[ids.length - 1]);
      const cw = await correctId();
      await tap(cw); note(await page.evaluate(() => window.VeraVerbMatchActivity.sel != null), 'first tap did not select');
      await tap(cw); note(await page.evaluate(() => window.VeraVerbMatchActivity.sel == null), 'second tap did not deselect');

      /* ⚠ the renderer writes before + ' ' … ' ' + after, so a padded manifest field
         renders a DOUBLE space. Assert the rendered sentence, not the data. */
      await force(ids[0]);
      const sentence = await page.$eval('.vvm-sent', e => e.textContent);
      note(!/ {2}/.test(sentence), `the rendered sentence has a double space: "${sentence.trim()}"`);

      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        await force(ids[5]);
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `overflow ${over}px at ${w}px`);
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      console.log(`  ${fails.some(f => f.startsWith(LOC + ':')) ? 'FAIL' : 'ok  '} vera-verb-match/${LOC} — "${title}"`);
    } catch (e) {
      fails.push(`${LOC}: ${e.message}`);
      console.log(`  FAIL vera-verb-match/${LOC} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`VERA-VERB-MATCH LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`VERA-VERB-MATCH LOCAL TEST PASSED (${LOCALES.join(' + ')}) — sentence + 3 cards; the agreeing card celebrates + fills the blank; wrong = try-again with NO card marked (no leak); the cards SHOWN are the cards GRADED; sv per-round triples reach the board; no double space; cards shuffle; tap-to-deselect; ≥8 distinct + reshuffle; no overflow 280→768.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
