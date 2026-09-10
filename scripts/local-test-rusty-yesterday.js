#!/usr/bin/env node
/* =====================================================================
   local-test-rusty-yesterday.js — interaction harness for "Rusty's Yesterday
   Machine" (L.2.1.d) / sv "Murklas ordsluss". Serves `mini tools/`; drives the
   real shell over EVERY round of BOTH the en and sv pools.

   ⚠ Until sv #33 this ran `?lang=en` only, hard-coded English round ids, and its
   `force()` silently did NOTHING on a miss (`if (at > 0)`) — so a typo'd id
   re-tested round 0 and the run still reported PASS. Both are fixed: force() and
   tap() THROW.

   WHAT IT ASSERTS
     • the today→yesterday panel + exactly 3 word cards, every round, both locales;
     • the past-tense card celebrates; a wrong card shows try-again and does NOT;
     • ⭐ NO LEAK, tightened: the CORRECT card is never marked before Check, and is
       never marked by tapping a WRONG one. (The looser "no card is ever marked"
       is now false by design — this build marks the TAPPED card so the child can
       see which one they tried.)
     • ⭐ the RENDERED card order varies across mounts. `deckFacts.positionBot`
       reads the STORED order, which setupTask shuffles away, so it is an artefact
       there and can only be asserted here, where a child could actually see it.
     • ⭐ sv's three response classes render three DISTINCT messages. One string
       cannot be honest about all three: the har-word is CORRECT Swedish in the
       wrong slot, the invented form is not a word, the att-word is the infinitive.
     • tap floor >=44px at 280px — ⚠ the floor is set by chip WIDTH, not height
       (sv #32: a one-letter chip rendered 29px). sv round "ata" ships «åt», the
       narrowest card in the catalogue at two characters.
     • no horizontal overflow 280 → 768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'rusty-yesterday.irregular-past.l-2-1-d';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const TITLES = { en: "Rusty's Yesterday Machine", sv: 'Murklas ordsluss' };

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
  const params = JSON.parse(fs.readFileSync(path.join(MINI, 'rusty-yesterday-activities.json'), 'utf8'))[0].params;
  const POOLS = { en: params.rounds, sv: params.roundsL10n.sv };
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  for (const LANG of ['en', 'sv']) {
    const pool = POOLS[LANG];
    const note = (cond, msg) => { if (!cond) fails.push(LANG + ': ' + msg); };
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

    // ⚠ THROWS on a miss. The previous version's `if (at > 0)` made a typo'd id a
    // silent no-op, so the harness tested round 0 eight times and reported PASS.
    async function force(id) {
      const ok = await page.evaluate((rid) => {
        const t = window.RustyYesterdayActivity;
        const k = t._pool.findIndex(x => x.id === 'rusty-yesterday.' + rid);
        if (k < 0) return false;
        const order = []; for (let i = 0; i < t._pool.length; i++) order.push(i);
        order.splice(order.indexOf(k), 1); order.unshift(k);
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
        return true;
      }, id);
      if (!ok) throw new Error('force(): no round "' + id + '" in the ' + LANG + ' pool');
      await page.waitForFunction(() => window.RustyYesterdayActivity.round && document.querySelector('.ryd-root'), { timeout: 4000 });
      await sleep(40);
      const got = await page.evaluate(() => window.RustyYesterdayActivity.round.id);
      if (got !== id) throw new Error('force(' + id + ') landed on "' + got + '"');
    }
    const correctId = () => page.evaluate(() => window.IrregularPastCore.oracle(window.RustyYesterdayActivity.round));
    const wrongIds = () => page.evaluate(() => { const r = window.RustyYesterdayActivity.round, o = window.IrregularPastCore.oracle(r); return r.choices.map((c, i) => i).filter(i => i !== o); });
    async function tap(id) {
      const ok = await page.evaluate((x) => { const b = document.querySelector('.ryd-opt[data-id="' + x + '"]'); if (!b) return false; b.click(); return true; }, id);
      if (!ok) throw new Error('tap(): no card with data-id ' + id);
      await sleep(50);
    }
    /* ⚠ WAIT for the verdict class, never sleep a fixed time. A 140ms sleep made
       this harness FLAKY — the same poison failed on round "see" in one run and
       "come" in the next, which is the signature of a race, not a defect. The
       shell also CLEARS .tryagain after 1800ms (lcs-shell.js:883), so the window
       is bounded on both sides: poll fast, and read the verdict once. */
    async function check() {
      await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
      return page.waitForFunction(() => {
        const p = document.querySelector('.lcs-activity-prompt');
        if (!p) return null;
        if (p.classList.contains('celebrate')) return 'celebrate';
        if (p.classList.contains('tryagain')) return 'tryagain';
        return null;
      }, { timeout: 4000, polling: 20 }).then(h => h.jsonValue()).catch(() => 'none');
    }
    let verdict = 'none';
    const celebrated = () => verdict === 'celebrate';
    const triedAgain = () => verdict === 'tryagain';
    const hintText = () => page.evaluate(() => { const h = document.querySelector('.lcs-activity-prompt-hint'); return h ? h.textContent.trim() : ''; });
    const correctMarked = () => page.evaluate(() => {
      const r = window.RustyYesterdayActivity.round, o = window.IrregularPastCore.oracle(r);
      const b = document.querySelector('.ryd-opt[data-id="' + o + '"]');
      return !!(b && /ryd-right|ryd-tried/.test(b.className));
    });
    const orderNow = () => page.$$eval('.ryd-opt', els => els.map(e => e.textContent.trim()).join('|'));

    try {
      await page.goto(`http://127.0.0.1:${PORT}/rusty-yesterday-activity.html?lang=${LANG}&activity=${ACTIVITY}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.RustyYesterdayActivity; return t && t._activityRow && document.querySelector('.ryd-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      note(title === TITLES[LANG], `header title "${title}" (expected "${TITLES[LANG]}")`);

      const Np = await page.evaluate(() => window.RustyYesterdayActivity._pool.length);
      note(Np === pool.length, `pool has ${Np} rounds, manifest has ${pool.length} — the wrong pool is loaded`);
      const ids = await page.evaluate((c) => { const t = window.RustyYesterdayActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
      note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
      note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(','), 'second pass did not reshuffle');

      // every round of this locale's own pool, driven for real
      for (const r of pool) {
        await force(r.id);
        note(!!(await page.$('.ryd-panel')), `${r.id}: no today/yesterday panel`);
        note(await page.$$eval('.ryd-opt', e => e.length) === 3, `${r.id}: did not render 3 word cards`);
        const shown = await page.$$eval('.ryd-opt', e => e.map(x => x.textContent.trim()).sort().join('|'));
        note(shown === r.choices.map(c => c.word).sort().join('|'), `${r.id}: rendered cards "${shown}" are not this round's`);
        note(!(await correctMarked()), `${r.id}: the correct card is marked before Check (leak)`);

        for (const w of await wrongIds()) {
          await tap(w); verdict = await check();
          note(triedAgain(), `${r.id}: wrong card did not show try-again`);
          note(!celebrated(), `${r.id}: a wrong card celebrated`);
          note(!(await correctMarked()), `${r.id}: tapping a WRONG card marked the CORRECT one (leak)`);
        }
        await tap(await correctId()); verdict = await check();
        note(celebrated(), `${r.id}: the past-tense card did not celebrate`);
      }

      // ⭐ the RENDERED order must vary — this is what positionBot cannot see
      const orders = new Set();
      for (let i = 0; i < 12; i++) { await force(pool[0].id); orders.add(await orderNow()); }
      note(orders.size >= 2, `the rendered card order never changed over 12 mounts of "${pool[0].id}" — cards are not shuffled`);

      // ⭐ sv: the three wrong-answer classes must say three different things
      if (LANG === 'sv') {
        const byCls = {};
        for (const r of pool) {
          for (let i = 0; i < r.choices.length; i++) {
            const cls = r.choices[i].cls;
            if (!cls || byCls[cls]) continue;
            await force(r.id); await tap(i); verdict = await check();
            byCls[cls] = await hintText();
          }
        }
        const seen = Object.keys(byCls);
        note(seen.length === 3, `only ${seen.length} response class(es) reachable (${seen.join(',')}) — expected har/fake/att`);
        seen.forEach(c => note(byCls[c] && byCls[c].length > 10 && !/^hintWrong/.test(byCls[c]), `class "${c}" rendered "${byCls[c]}" — a missing key renders as the key itself`));
        note(new Set(seen.map(c => byCls[c])).size === seen.length, 'two response classes rendered the SAME message — one string cannot be honest about all three');
      }

      // tap floor + overflow. ⚠ the floor is chip WIDTH, not height.
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        for (const r of (w === 280 ? pool : [pool[pool.length - 1]])) {
          await force(r.id);
          const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
          note(over <= 2, `${r.id}: overflow ${over}px at ${w}px`);
          if (w === 280) {
            const box = await page.$$eval('.ryd-opt', e => e.map(x => { const b = x.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), t: x.textContent.trim() }; }));
            box.forEach(b => note(b.w >= 44 && b.h >= 44, `${r.id}: card "${b.t}" is ${b.w}x${b.h}px at 280px (tap floor 44)`));
          }
        }
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      console.log(`  ${fails.filter(f => f.startsWith(LANG + ':')).length ? 'FAIL' : 'ok  '} rusty-yesterday/${LANG} — "${title}" (${pool.length} rounds driven)`);
    } catch (e) {
      fails.push(LANG + ': ' + e.message);
      console.log(`  FAIL rusty-yesterday/${LANG} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`RUSTY-YESTERDAY LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('RUSTY-YESTERDAY LOCAL TEST PASSED — en + sv, every round driven; the past-tense card celebrates and every wrong card shows try-again; the CORRECT card is never marked before Check or by a wrong tap; the RENDERED order varies; sv shows three distinct response messages; tap floor >=44px at 280; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
