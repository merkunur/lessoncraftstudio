#!/usr/bin/env node
/* =====================================================================
   local-test-mims-baskets.js — interaction harness for "Mim's Memory Baskets"
   (CCSS L.K.5.A). Serves `mini tools/` + `/image-library-webp/` (the pictures)
   + drives the shell:

     • CATEGORY-SORTER: picking each object + tapping its category basket sorts
       it (the concept is spoken on a correct drop); the spill empties → solved.
     • NON-LEAKING WRONG-DROP: dropping into the wrong basket does NOT place the
       object (it stays in the spill) + a non-leaking "hmm" (NEVER reveals/dims
       the right basket); no concept is spoken for it.
     • CONFOUND: the red apple sorts to FOODS, the red fire-truck to VEHICLES
       (different baskets — color does not decide).
     • PICTURES LOAD (img naturalWidth>0); NO counting surface; 3+ baskets;
       ≥7 rounds + 4 cogs + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'mims-baskets.category-sort.l-k-5-a';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.startsWith('/image-library-webp/')) file = path.join(REPO, p);
    else if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
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

  const url = `http://127.0.0.1:${PORT}/mims-baskets-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const st = () => page.evaluate(() => { const a = window.MimsBasketsActivity; return { solved: a.solved, msg: a.msg, placed: Object.assign({}, a.cstate.placed) }; });
  const labelOf = (noun) => page.evaluate((n) => window.CategorySortCore.info(n).label, noun);
  const catLabel = (cid) => page.evaluate((c) => window.CategorySortCore.CATEGORY[c].label, cid);
  const pickThing = (label) => page.evaluate((lab) => { const b = [...document.querySelectorAll('.mb-thing')].find(x => { const c = x.querySelector('.mb-thingcap'); return c && c.textContent === lab; }); if (b) { b.click(); return true; } return false; }, label).then(() => sleep(20));
  const tapBasket = (clab) => page.evaluate((lab) => { const b = [...document.querySelectorAll('.mb-basket')].find(x => { const l = x.querySelector('.mb-blab'); return l && l.textContent === lab; }); if (b) b.click(); }, clab).then(() => sleep(25));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MimsBasketsActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'mims-baskets.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MimsBasketsActivity.round && document.querySelector('.mb-baskets'), { timeout: 4000 });
  }
  const sortNoun = async (noun) => { const lab = await labelOf(noun); const cid = await page.evaluate((n) => window.CategorySortCore.categoryOf(n), noun); const clab = await catLabel(cid); await pickThing(lab); await tapBasket(clab); };

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (opts) { window.__spoke.push(opts && opts.text); return o.apply(this, arguments); }; });
    await page.waitForFunction(() => { const t = window.MimsBasketsActivity; return t && t._activityRow && document.querySelector('.mb-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Mim's Memory Baskets", `header title "${title}"`);

    /* variety/shuffle + ≥7 rounds + 4 cogs */
    const N = await page.evaluate(() => window.MimsBasketsActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.MimsBasketsActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const cogs = await page.evaluate(() => new Set(window.MimsBasketsActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs === 4, `expected 4 cogs, got ${cogs}`);

    /* PICTURES LOAD + 3+ baskets + NO counting surface */
    await force('sort-three'); await sleep(250);
    const imgOk = await page.evaluate(() => { const im = document.querySelector('.mb-thingimg'); return im && im.naturalWidth > 0; });
    note(imgOk, 'the spill object pictures did not load (naturalWidth 0)');
    const nbask = await page.evaluate(() => document.querySelectorAll('.mb-basket').length);
    note(nbask >= 3, `only ${nbask} baskets (<3 coin-flip)`);
    const hasCount = await page.evaluate(() => /\b(count|how many|\d+\s*\/\s*\d+)\b/i.test(document.querySelector('.mb-root').textContent));
    note(!hasCount, 'a counting surface is present (must be NO counting)');

    /* CATEGORY-SORTER: sort every object → solved; the concept is spoken */
    await page.evaluate(() => { window.__spoke = []; });
    const spill1 = await page.evaluate(() => window.MimsBasketsActivity.round.spill.slice());
    for (const n of spill1) await sortNoun(n);
    let s = await st(); note(s.solved, 'sorting every object correctly did not solve the round');
    const spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/is an ANIMAL|is a FOOD|RIDE/i.test(spoke), `the concept was not spoken on correct drops ("${spoke}")`);
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a full sort');

    /* NON-LEAKING WRONG-DROP: apple → Vehicles basket (wrong) */
    await force('confound-red'); await page.evaluate(() => { window.__spoke = []; });
    await pickThing(await labelOf('apple')); await tapBasket(await catLabel('vehicle'));
    s = await st(); note(s.placed['apple'] === undefined, 'a wrong drop (apple→Vehicles) was accepted');
    note(/hmm|doesn.t belong/i.test(s.msg || ''), `the wrong message is not the non-leaking "hmm" ("${s.msg}")`);
    const leakSpoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(!/FOOD/i.test(leakSpoke), `the wrong drop LEAKED the right concept ("${leakSpoke}")`);

    /* CONFOUND: apple→Foods, fire_truck→Vehicles (color does not decide) */
    await force('confound-red'); await sortNoun('apple'); await sortNoun('fire_truck');
    s = await st(); note(s.placed['apple'] === 'food' && s.placed['fire_truck'] === 'vehicle', `the red confound mis-sorted (apple=${s.placed['apple']}, fire_truck=${s.placed['fire_truck']})`);

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('sort-four'); await sleep(120);   // 4 objects + 4 baskets — worst case
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} mims-baskets/en — "${title}"`);
  } catch (e) {
    fails.push('mims-baskets/en: ' + e.message);
    console.log(`  FAIL mims-baskets/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MIMS-BASKETS LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('MIMS-BASKETS LOCAL TEST PASSED — the category-sorter sorts every object → solved (the concept is spoken); a wrong drop is NOT accepted + a non-leaking "hmm" (no right-basket reveal, no concept spoken); the red confound splits apple→Foods / fire-truck→Vehicles; pictures load; NO counting surface; 3+ baskets; ≥7 rounds + 4 cogs + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
