#!/usr/bin/env node
/* =====================================================================
   local-test-roary-roar-meter.js — interaction harness for "Roary's Roar Meter"
   (L.2.5.b) / sv "Leos ordtrappa". Serves `mini tools/`; drives the real shell
   over EVERY round of BOTH the en and sv pools.

   ⚠ Until sv #34 this ran `?lang=en` only, with English round ids hard-coded, and
   its `force()` carried the silent no-op — `if (at > 0)` — so a round id that does
   not exist re-tested round 0 and the run still reported PASS. Both fixed: force()
   and tap() THROW.

   WHAT IT ASSERTS
     • the lion, the ASK line, and exactly 3 word cards, every round, both locales;
     • the right word celebrates; both wrong words show try-again and do not;
     • ⭐ NO LEAK, tightened: the CORRECT card is never marked before Check, and is
       never marked by tapping a wrong one. (The old "no card is ever marked" is
       false by design now — this build marks the TAPPED card.)
     • ⭐⭐ THE ASK LINE IS THE WHOLE DECK. It is the only thing that changes round
       to round, and without it the activity is a coin flip by construction — so it
       must be non-empty AND must actually differ between a strongest and a weakest
       round. A deck whose ask never renders is unwinnable by reading.
     • ⭐ the RENDERED card order varies across mounts. `deckFacts.positionBot` reads
       the STORED order, which `setupTask` shuffles away, so five shipped locales
       read 1.000 there on an artefact. This is where a child could actually see it.
     • ⭐ sv's two wrong-answer classes render DIFFERENT messages: tapping the
       MIDDLE-rank word means the child never ordered the three; tapping the OTHER
       EXTREME means they ordered them right and answered the question that was not
       asked. Derived from the ranks — no per-card tagging.
     • tap floor >=44px at 280px; no horizontal overflow 280 → 768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'roary-roar-meter.shades.l-2-5-b';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const TITLES = { en: "Roary's Roar Meter", sv: 'Leos ordtrappa' };

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
  const params = JSON.parse(fs.readFileSync(path.join(MINI, 'roary-roar-meter-activities.json'), 'utf8'))[0].params;
  const POOLS = { en: params.rounds, sv: params.roundsL10n.sv };
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // the target and the two wrong classes, derived here — never read off the core
  const classify = (r) => {
    const ranks = r.words.map(w => w.rank);
    const t = r.ask === 'weakest' ? Math.min.apply(null, ranks) : Math.max.apply(null, ranks);
    const mid = ranks.slice().sort((a, b) => a - b)[1];
    const right = r.words.findIndex(w => w.rank === t);
    const middle = r.words.findIndex(w => w.rank === mid);
    const otherEnd = r.words.findIndex((w, i) => i !== right && i !== middle);
    return { right, middle, otherEnd };
  };

  for (const LANG of ['en', 'sv']) {
    const pool = POOLS[LANG];
    const note = (cond, msg) => { if (!cond) fails.push(LANG + ': ' + msg); };
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

    async function force(id) {
      const ok = await page.evaluate((rid) => {
        const t = window.RoaryRoarMeterActivity;
        const k = t._pool.findIndex(x => x.id === 'roary-roar-meter.' + rid);
        if (k < 0) return false;
        const order = []; for (let i = 0; i < t._pool.length; i++) order.push(i);
        order.splice(order.indexOf(k), 1); order.unshift(k);
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
        return true;
      }, id);
      if (!ok) throw new Error('force(): no round "' + id + '" in the ' + LANG + ' pool');
      await page.waitForFunction(() => window.RoaryRoarMeterActivity.round && document.querySelector('.rrm-root'), { timeout: 4000 });
      await sleep(40);
      const got = await page.evaluate(() => window.RoaryRoarMeterActivity.round.id);
      if (got !== id) throw new Error('force(' + id + ') landed on "' + got + '"');
    }
    async function tap(id) {
      const ok = await page.evaluate((x) => { const b = document.querySelector('.rrm-opt[data-id="' + x + '"]'); if (!b) return false; b.click(); return true; }, id);
      if (!ok) throw new Error('tap(): no card with data-id ' + id);
      await sleep(50);
    }
    /* ⚠ wait for the verdict class, never a fixed sleep — a fixed sleep made the
       sibling harness flaky (a different round failed each run, the signature of a
       race). The shell also CLEARS .tryagain after 1800 ms, so read it once. */
    async function check() {
      /* ⚠ WAIT FOR A CLEAN PROMPT FIRST. The shell holds .tryagain for 1800 ms
         (lcs-shell.js:883); driving three tap→Check cycles per round back-to-back
         meant the next read could see the PREVIOUS verdict, or click a Check that
         was still disabled — which surfaced as an intermittent "got none" on a
         different round each run. Fixing the READ was not enough in #33; the
         SEQUENCING needs the same treatment. */
      await page.waitForFunction(() => {
        const p = document.querySelector('.lcs-activity-prompt');
        const c = document.querySelector('.lcs-activity-check');
        return p && !p.classList.contains('celebrate') && !p.classList.contains('tryagain') && c && !c.disabled;
      }, { timeout: 5000, polling: 20 }).catch(() => {});
      await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); });
      return page.waitForFunction(() => {
        const p = document.querySelector('.lcs-activity-prompt');
        if (!p) return null;
        if (p.classList.contains('celebrate')) return 'celebrate';
        if (p.classList.contains('tryagain')) return 'tryagain';
        return null;
      }, { timeout: 4000, polling: 20 }).then(h => h.jsonValue()).catch(() => 'none');
    }
    const hintText = () => page.evaluate(() => { const h = document.querySelector('.lcs-activity-prompt-hint'); return h ? h.textContent.trim() : ''; });
    const askText = () => page.evaluate(() => { const a = document.querySelector('.rrm-ask'); return a ? a.textContent.trim() : ''; });
    const markedIds = (cls) => page.$$eval('.rrm-opt.' + cls, els => els.map(e => +e.getAttribute('data-id')));
    const orderNow = () => page.$$eval('.rrm-opt', els => els.map(e => e.textContent.trim()).join('|'));

    try {
      await page.goto(`http://127.0.0.1:${PORT}/roary-roar-meter-activity.html?lang=${LANG}&activity=${ACTIVITY}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.RoaryRoarMeterActivity; return t && t._activityRow && document.querySelector('.rrm-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      note(title === TITLES[LANG], `header title "${title}" (expected "${TITLES[LANG]}")`);

      const Np = await page.evaluate(() => window.RoaryRoarMeterActivity._pool.length);
      note(Np === pool.length, `pool has ${Np} rounds, manifest has ${pool.length} — the wrong pool is loaded`);
      const ids = await page.evaluate((c) => { const t = window.RoaryRoarMeterActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask ? t.nextTask({ index: i }) : null; out.push(x ? x.id : null); } return out; }, 2 * Np).catch(() => []);
      if (ids.length && ids[0]) {
        note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
      }

      const asksSeen = {};
      for (const r of pool) {
        await force(r.id);
        note(!!(await page.$('.rrm-lion, .rrm-lion-svg')), `${r.id}: the character is missing`);
        note(await page.$$eval('.rrm-opt', e => e.length) === 3, `${r.id}: did not render 3 word cards`);
        const shown = await page.$$eval('.rrm-opt', e => e.map(x => x.textContent.trim()).sort().join('|'));
        note(shown === r.words.map(w => w.word).sort().join('|'), `${r.id}: rendered cards "${shown}" are not this round's`);

        // ⭐⭐ the ask is the only thing that changes round to round
        const ask = await askText();
        note(!!ask, `${r.id}: the ask line is EMPTY — the child cannot know which end is wanted`);
        asksSeen[r.ask] = ask;

        const { right, middle, otherEnd } = classify(r);
        note((await markedIds('rrm-right')).indexOf(right) < 0 && (await markedIds('rrm-tried')).indexOf(right) < 0,
          `${r.id}: the correct card is marked before Check (leak)`);

        for (const w of [middle, otherEnd]) {
          await tap(w);
          const v = await check();
          note(v === 'tryagain', `${r.id}: wrong card ${w} did not show try-again (got ${v})`);
          note((await markedIds('rrm-right')).indexOf(right) < 0, `${r.id}: tapping a WRONG card marked the CORRECT one (leak)`);
          const tried = await markedIds('rrm-tried');
          note(tried.length === 1 && tried[0] === w, `${r.id}: expected the tapped card ${w} marked, saw [${tried.join(',')}]`);
        }
        await tap(right);
        note(await check() === 'celebrate', `${r.id}: the correct word did not celebrate`);
      }

      // the ask must actually DIFFER between the two kinds of round
      note(asksSeen.strongest && asksSeen.weakest && asksSeen.strongest !== asksSeen.weakest,
        `the strongest and weakest rounds render the SAME ask line ("${asksSeen.strongest}") — the alternation is invisible`);

      // ⭐ the RENDERED order must vary — what positionBot cannot see
      const orders = new Set();
      for (let i = 0; i < 12; i++) { await force(pool[0].id); orders.add(await orderNow()); }
      note(orders.size >= 2, `the rendered card order never changed over 12 mounts of "${pool[0].id}" — cards are not shuffled`);

      // ⭐ sv: the two wrong classes must say different things
      if (LANG === 'sv') {
        const r = pool[0], { middle, otherEnd } = classify(r);
        await force(r.id); await tap(middle); await check();
        const mMsg = await hintText();
        await force(r.id); await tap(otherEnd); await check();
        const oMsg = await hintText();
        note(!!mMsg && !/^hint[A-Z]/.test(mMsg), `the middle-rank message rendered "${mMsg}" — a missing key renders as the key`);
        note(!!oMsg && !/^hint[A-Z]/.test(oMsg), `the other-extreme message rendered "${oMsg}" — a missing key renders as the key`);
        note(mMsg !== oMsg, 'both wrong-answer classes rendered the SAME message — "you never compared them" and "you answered the other question" are different mistakes');
      }

      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        for (const r of (w === 280 ? pool : [pool[pool.length - 1]])) {
          await force(r.id);
          const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
          note(over <= 2, `${r.id}: overflow ${over}px at ${w}px`);
          if (w === 280) {
            const box = await page.$$eval('.rrm-opt', e => e.map(x => { const b = x.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), t: x.textContent.trim() }; }));
            box.forEach(b => note(b.w >= 44 && b.h >= 44, `${r.id}: card "${b.t}" is ${b.w}x${b.h}px at 280px (tap floor 44)`));
          }
        }
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      console.log(`  ${fails.filter(f => f.startsWith(LANG + ':')).length ? 'FAIL' : 'ok  '} roary-roar-meter/${LANG} — "${title}" (${pool.length} rounds driven)`);
    } catch (e) {
      fails.push(LANG + ': ' + e.message);
      console.log(`  FAIL roary-roar-meter/${LANG} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`ROARY-ROAR-METER LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('ROARY-ROAR-METER LOCAL TEST PASSED — en + sv, every round driven; both wrong words show try-again and the CORRECT card is never marked; the ask renders and differs between strongest and weakest rounds; the RENDERED order varies; sv distinguishes its two wrong-answer classes; tap floor >=44px at 280; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
