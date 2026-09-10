#!/usr/bin/env node
/* =====================================================================
   local-test-cleo-packing-list.js — interaction harness for "Cleo's Packing List"
   (L.1.2.b), en + sv. Serves `mini tools/`; drives the real shell.

   ⚠⚠ IT MUST NOT ASK THE ENGLISH CORE FOR A SWEDISH ANSWER. The previous version
   computed the expected card from `window.SeriesCommaCore.oracle`, which reads only
   `round.slot`; every builder happens to place the correct form at that slot, so it
   appeared to work and was structurally unable to notice a builder that stopped
   doing so. The expected card is now built from the round DATA plus this file's own
   per-locale correct form, and matched against the rendered text.

   ⚠⚠ AND IT MUST NOT FORCE ROUNDS BY HARD-CODED ENGLISH IDS. The previous version
   named picnic/farm/colors/table/lunch/field/winter, none of which exist in the
   Swedish pool — and it failed SILENTLY: `const at = order.indexOf(k); if (at > 0)`
   with `k === -1` does no splice and no throw, so the harness would have tested
   whatever round happened to be first and reported a pass. force() now throws.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'cleo-packing-list.series-commas.l-1-2-b';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

/* this file's OWN truth — independent of the activity and of the core */
const CORRECT = {
  en: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]}, and ${r.items[2]}.`,
  sv: (r) => `${r.lead} ${r.items[0]}, ${r.items[1]}, ${r.items[2]} och ${r.items[3]}.`,
};
const TITLE = { en: "Cleo's Packing List", sv: 'Rankas ordkedja' };
const ITEMS = { en: 3, sv: 4 };
const GOLD = 'rgb(232, 165, 58)', CORAL = 'rgb(242, 120, 75)', GOOD = 'rgb(47, 165, 106)';

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const manifest = JSON.parse(fs.readFileSync(path.join(MINI, 'cleo-packing-list-activities.json'), 'utf8'))[0];
  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  for (const LOC of ['en', 'sv']) {
    const note = (cond, msg) => { if (!cond) fails.push(`${LOC}: ${msg}`); };
    const rounds = LOC === 'en' ? manifest.params.rounds : manifest.params.roundsL10n[LOC];
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
    page.on('console', (m) => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = `http://127.0.0.1:${PORT}/cleo-packing-list-activity.html?lang=${LOC}&activity=${ACTIVITY}&embed=1`;

    /* ⚠ THROWS on a miss. The silent version is worse than no harness. */
    async function force(rawId) {
      const landed = await page.evaluate((rid) => {
        const t = window.CleoPackingListActivity;
        const k = t._pool.findIndex((x) => x.id === 'cleo-packing-list.' + rid);
        if (k < 0) return null;
        const order = []; for (let i = 0; i < t._pool.length; i++) order.push(i);
        const at = order.indexOf(k); order.splice(at, 1); order.unshift(k);
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
        return true;
      }, rawId);
      if (!landed) throw new Error(`force("${rawId}") found no such round in the ${LOC} pool`);
      await page.waitForFunction(() => window.CleoPackingListActivity.round && document.querySelector('.cpl-root'), { timeout: 4000 });
      await sleep(50);
      const got = await page.evaluate(() => window.CleoPackingListActivity.round.id);
      if (got !== rawId) throw new Error(`force("${rawId}") landed on "${got}"`);
    }
    const cards = () => page.$$eval('.cpl-opt', (els) => els.map((e) => ({ id: e.getAttribute('data-id'), text: e.textContent.trim() })));
    const tap = (id) => page.evaluate((x) => { const b = document.querySelector('.cpl-opt[data-id="' + x + '"]'); if (b) b.click(); }, id).then(() => sleep(50));
    const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(140));
    const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.CleoPackingListActivity;
        return t && t._activityRow && document.querySelector('.cpl-root') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', (e) => e.textContent.trim()).catch(() => '');
      note(title === TITLE[LOC], `header title "${title}", expected "${TITLE[LOC]}"`);
      /* ⭐ the shell falls back to ENGLISH when a locale is missing inside an existing
         key, silently — so a Swedish deck rendering the English title is the tell. */
      if (LOC !== 'en') note(title !== TITLE.en, 'rendered the ENGLISH title — the sv strings are not being reached');

      /* the pool drives the ids; nothing English is hard-coded */
      const ids = rounds.map((r) => r.id);
      const poolIds = await page.evaluate(() => window.CleoPackingListActivity._pool.map((t) => t.id.replace('cleo-packing-list.', '')));
      note(poolIds.length >= 8, `only ${poolIds.length} rounds (<8)`);
      note(ids.every((i) => poolIds.includes(i)), 'the rendered pool does not match this locale\'s manifest rounds');
      const seq = await page.evaluate((n) => {
        const t = window.CleoPackingListActivity, out = [];
        for (let i = 0; i < n; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); }
        return out;
      }, 2 * poolIds.length);
      const N = poolIds.length;
      note(new Set(seq.slice(0, N)).size >= 8, `only ${new Set(seq.slice(0, N)).size} distinct rounds (<8)`);
      note(seq.slice(0, N).join(',') !== seq.slice(N).join(','), 'second pass did not reshuffle');

      /* ---- every round: three cards, the declared correct one present ---- */
      for (const r of rounds) {
        await force(r.id);
        const cs = await cards();
        note(cs.length === 3, `${r.id}: ${cs.length} cards, expected 3`);
        note(r.items.length === ITEMS[LOC], `${r.id}: ${r.items.length} items, expected ${ITEMS[LOC]}`);
        const want = CORRECT[LOC](r);
        note(cs.some((c) => c.text === want), `${r.id}: the correct form is absent from the board.\n      expected: ${want}\n      rendered: ${cs.map((c) => c.text).join(' | ')}`);
      }

      /* ---- correct tap celebrates, and the card wears the SUCCESS colour ---- */
      const first = rounds[0];
      await force(first.id);
      let cs = await cards();
      const right = cs.find((c) => c.text === CORRECT[LOC](first));
      const wrong = cs.find((c) => c.id !== right.id);
      await tap(right.id); await check();
      note(await celebrated(), 'the correct card did not celebrate');
      const okMark = await page.$$eval('.cpl-opt', (els) => {
        const e = els.find((x) => x.classList.contains('cpl-right'));
        return e ? { n: els.filter((x) => x.classList.contains('cpl-right')).length, border: getComputedStyle(e).borderTopColor } : null;
      });
      note(okMark && okMark.n === 1, 'the correct card is not marked after a correct Check');
      note(okMark && okMark.border === GOOD, `the correct card is not wearing the success colour — got ${okMark && okMark.border}`);

      /* ---- wrong tap: try-again, the TAPPED card goes coral, and nothing reveals
              which card is right. ⚠ The old assertion was "no card is marked at all";
              that is now false by design, so what is measured changed — the tapped
              card may be marked, the correct one may not. ---- */
      const second = rounds[1];
      await force(second.id);
      cs = await cards();
      const r2 = cs.find((c) => c.text === CORRECT[LOC](second));
      const w2 = cs.find((c) => c.id !== r2.id);
      await tap(w2.id);
      const selBorder = await page.$eval('.cpl-opt.cpl-sel', (e) => getComputedStyle(e).borderTopColor).catch(() => null);
      note(selBorder === GOLD, `a card SELECTED but not yet checked is not wearing the "chosen" colour — got ${selBorder}`);
      note(selBorder !== CORAL, 'a selection before Check wears the try-again colour — a selection is not a verdict');
      await check();
      note(await triedAgain(), 'a wrong card did not show try-again');
      note(!(await celebrated()), 'a wrong card celebrated (must not)');
      const marks = await page.$$eval('.cpl-opt', (els) => ({
        tried: els.filter((e) => e.classList.contains('cpl-tried')).map((e) => e.getAttribute('data-id')),
        right: els.filter((e) => e.classList.contains('cpl-right')).length,
        triedBorder: (() => { const e = els.find((x) => x.classList.contains('cpl-tried')); return e ? getComputedStyle(e).borderTopColor : null; })(),
      }));
      note(marks.tried.length === 1 && marks.tried[0] === w2.id, 'the try-again mark is not on the tapped card');
      note(marks.right === 0, 'the correct card was marked after a WRONG answer — that prints the answer');
      note(marks.triedBorder === CORAL, `the tapped card is not wearing the try-again colour — got ${marks.triedBorder}`);
      await tap(r2.id); await check();
      note(await celebrated(), 'the correct card did not celebrate after a wrong attempt');

      /* ---- cards shuffle; tap-to-deselect ---- */
      const firsts = [];
      for (const r of rounds.slice(0, 5)) { await force(r.id); firsts.push(await page.$eval('.cpl-opt', (e) => e.textContent.trim()).catch(() => '')); }
      note(new Set(firsts).size >= 2, 'the first card is identical across rounds — cards not shuffled');

      const last = rounds[rounds.length - 1];
      await force(last.id);
      cs = await cards();
      await tap(cs[0].id);
      note(await page.evaluate(() => window.CleoPackingListActivity.sel != null), 'first tap did not select');
      await tap(cs[0].id);
      note(await page.evaluate(() => window.CleoPackingListActivity.sel == null), 'second tap did not deselect');

      /* ---- no overflow 280 -> 768 ---- */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        await force(rounds[4].id);
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `overflow ${over}px at ${w}px`);
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      console.log(`  ${fails.some((f) => f.startsWith(LOC + ':')) ? 'FAIL' : 'ok  '} cleo-packing-list/${LOC} — "${title}"`);
    } catch (e) {
      fails.push(`${LOC}: ${e.message}`);
      console.log(`  FAIL cleo-packing-list/${LOC} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`CLEO-PACKING-LIST LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach((f) => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('CLEO-PACKING-LIST LOCAL TEST PASSED (en + sv) — 3 cards per round with THIS locale\'s ' +
    'correct form present (computed from the manifest, never from the English core); the correct card ' +
    'celebrates and turns green; a wrong card turns coral and reveals nothing; a selection is GOLD, ' +
    'not the try-again colour; ids driven off the pool and force() throws on a miss; no English ' +
    'fallback; cards shuffle; tap-to-deselect; >=8 distinct + reshuffle; no overflow 280->768.');
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
