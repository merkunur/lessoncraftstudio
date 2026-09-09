#!/usr/bin/env node
/* =====================================================================
   local-test-sage-root-garden.js — interaction harness for "Sage's Root Garden"
   (CCSS L.2.4.c). Serves `mini tools/`; drives the real shell:
     • a round renders the root word + 3 word cards;
     • tapping the family member → shell Check → celebrate;
     • tapping a non-family word → tryagain, NO card marked (no leak);
     • cards SHUFFLED; tap-to-deselect; ≥8 distinct rounds + reshuffle; no overflow 280→768.

   ⚠ WAS an EN-only pilot in three separate ways: the URL hard-coded `lang=en`, the header
   title was asserted as an English literal, and the force() calls carried ENGLISH ROUND IDS.
   ⚠⚠ Round ids are PER-LOCALE in this manifest (en `farm`, de `spiel`, it `it-gatto`) — unlike
   sentence-clinic, where they are invariant — so the ids are now read off the POOL and the
   title off the SHIPPED strings table, never a literal.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sage-root-garden.roots.l-2-4-c';
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
  /* the expected header per locale, read from the SHIPPED strings table rather than re-typed,
     so a rename cannot make this gate silently wrong */
  const activitySrc = fs.readFileSync(path.join(MINI, 'sage-root-garden-activity.js'), 'utf8');
  function shippedTitle(loc) {
    const m = activitySrc.match(/\n      title:\s*\{([^\n]*)\}/);
    if (!m) throw new Error('could not read the title table');
    const e = new RegExp('(?:^|[,{])\\s*' + loc + ":\\s*('(?:[^'\\\\]|\\\\.)*'|\"(?:[^\"\\\\]|\\\\.)*\")").exec(m[1]);
    if (!e) throw new Error('no title.' + loc);
    return e[1].slice(1, -1).replace(/\\(['\"])/g, '$1');
  }
  const LOCALES = ['en', 'sv'];
  const seenTitles = {};
for (const LOC of LOCALES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/sage-root-garden-activity.html?lang=${LOC}&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SageRootGardenActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'sage-root-garden.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SageRootGardenActivity.round && document.querySelector('.srg-root'), { timeout: 4000 });
    await sleep(40);
  }
  const correctId = () => page.evaluate(() => window.RootWordCore.oracle(window.SageRootGardenActivity.round));
  const wrongId = () => page.evaluate(() => { const r = window.SageRootGardenActivity.round, o = window.RootWordCore.oracle(r); return r.choices.map((c, i) => i).filter(i => i !== o)[0]; });
  const tap = (id) => page.evaluate((x) => { const b = document.querySelector('.srg-opt[data-id="' + x + '"]'); if (b) b.click(); }, id).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
  const firstCardText = () => page.$eval('.srg-opt', e => e.textContent.trim()).catch(() => '');

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SageRootGardenActivity; return t && t._activityRow && document.querySelector('.srg-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    seenTitles[LOC] = title;
    note(title === shippedTitle(LOC), `header title "${title}" != shipped strings.title.${LOC} "${shippedTitle(LOC)}"`);

    /* ⚠ ROUND IDS COME FROM THE POOL. `_pool` prefixes them with the activity name, so strip it. */
    const RIDS = await page.evaluate(() => window.SageRootGardenActivity._pool.map(t => t.id.replace(/^sage-root-garden\./, '')));
    note(RIDS.length >= 8, `pool has ${RIDS.length} ids`);

    const Np = await page.evaluate(() => window.SageRootGardenActivity._pool.length);
    note(Np >= 8, `only ${Np} rounds (<8)`);
    const ids = await page.evaluate((count) => { const t = window.SageRootGardenActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    await force(RIDS[0]);
    note(!!(await page.$('.srg-rootword')), 'no root word');
    note(await page.$$eval('.srg-opt', els => els.length) === 3, 'did not render 3 word cards');

    await tap(await correctId()); await check();
    note(await celebrated(), 'the family word did not celebrate');

    await force(RIDS[1]);
    await tap(await wrongId()); await check();
    note(await triedAgain(), 'a non-family word did not show try-again');
    note(!(await celebrated()), 'a non-family word celebrated (must not)');
    const leak = await page.$$eval('.srg-opt', els => els.filter(e => /srg-correct|srg-right|srg-wrong|srg-bad/.test(e.className)).length);
    note(leak === 0, 'a card is marked correct/wrong after a wrong pick (leak)');
    await tap(await correctId()); await check();
    note(await celebrated(), 'the family word did not celebrate after the wrong attempt');

    const firsts = [];
    for (const id of RIDS.slice(0, 5)) { await force(id); firsts.push(await firstCardText()); }
    note(new Set(firsts).size >= 2, `the first card is identical across rounds (${firsts.join(' / ')}) — cards not shuffled`);

    await force(RIDS[RIDS.length - 1]);
    const cw = await correctId();
    await tap(cw); note(await page.evaluate(() => window.SageRootGardenActivity.sel != null), 'first tap did not select');
    await tap(cw); note(await page.evaluate(() => window.SageRootGardenActivity.sel == null), 'second tap did not deselect');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force(RIDS[RIDS.length - 2]);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    /* ⭐ the locale runs its OWN pool, not a silent English fallback */
    if (LOC !== 'en') {
      const enRoots = JSON.parse(fs.readFileSync(path.join(MINI, 'sage-root-garden-activities.json'), 'utf8'))[0].params.rounds.map(r => r.root);
      const roots = await page.evaluate(() => window.SageRootGardenActivity._pool.map(t => { let r = null; t.setup({ setupTask: (x) => { r = x.root; } }); return r; }));
      const leaked = roots.filter(r => enRoots.includes(r));
      note(leaked.length === 0, `${leaked.length} round(s) served the ENGLISH root — the pool fell back (first: "${leaked[0]}")`);

      /* ⭐ AND THE DECK MUST NOT BE SOLVABLE BY MATCHING LETTERS. This is the whole point of the
         Swedish rebuild, asserted at RUNTIME on the pool the child actually gets: a bot that
         picks the one word beginning with the root scores 8/8 in en/de/fr/es/nl and 0/8 here. */
      const botScore = await page.evaluate(() => {
        let hit = 0, tot = 0;
        for (const t of window.SageRootGardenActivity._pool) {
          let r = null; t.setup({ setupTask: (x) => { r = x; } }); if (!r) continue;
          tot++;
          const m = r.choices.filter(c => c.word.toLowerCase().startsWith(r.root.toLowerCase()));
          if (m.length === 1 && m[0].word === r.correct) hit++;
        }
        return { hit, tot };
      });
      note(botScore.tot > 0, 'letter-bot probe measured no rounds');
      note(botScore.hit === 0, `the letter bot solves ${botScore.hit}/${botScore.tot} rounds — the deck can be won without reading a meaning`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.filter(f => f.startsWith('[' + LOC + ']')).length ? 'FAIL' : 'ok  '} sage-root-garden/${LOC} — "${title}"`);
  } catch (e) {
    fails.push('[' + LOC + '] ' + e.message);
    console.log(`  FAIL sage-root-garden/${LOC} — ${e.message}`);
  } finally { await page.close(); }
}

  /* cross-locale chrome leak: the two headers must not be the same string */
  if (seenTitles.en && seenTitles.sv && seenTitles.en === seenTitles.sv) {
    fails.push(`both locales rendered the SAME header "${seenTitles.en}" — the locale never took`);
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SAGE-ROOT-GARDEN LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('SAGE-ROOT-GARDEN LOCAL TEST PASSED — root word + 3 word cards; the family word celebrates; a non-family word = try-again with NO card marked (no leak); cards shuffle; tap-to-deselect; ≥8 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
