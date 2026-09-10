#!/usr/bin/env node
/* =====================================================================
   local-test-ziggy-odd-one-out.js — interaction harness for "Ziggy's Odd One Out"
   (L.1.5.a) / sv "Sebbes bildhage". Serves `mini tools/` AND the image library;
   drives the real shell over EVERY round of BOTH the en and sv pools.

   ⚠ Until sv #35 this ran `?lang=en` only, with English round ids hard-coded, and
   its `force()` carried the silent no-op — `if (at > 0)` — so a round id that does
   not exist re-tested round 0 and the run still reported PASS.

   WHAT IT ASSERTS
     • the zebra, the ask, and exactly 4 picture-and-word tiles, every round;
     • the outsider celebrates; each of the three members shows try-again;
     • ⭐ NO LEAK, tightened: the OUTSIDER is never marked before Check, and never
       by tapping a member. (The old "no tile is ever marked" is false by design
       now — this build marks the TAPPED tile.)
     • ⭐⭐ EVERY TILE ACTUALLY SHOWS ITS PICTURE. `:84` hides a failed image with
       `onerror="this.style.visibility='hidden'"`, so a missing or misspelled file
       renders as a word over blank space and every text gate stays green. Asserted
       via naturalWidth and computed visibility — the only place it is visible.
     • ⭐ two tiles must never render the SAME word. `facts.distinct` checks `noun`
       (the English filename), not `label`, and Swedish has 61 labels shared by more
       than one image key — klocka is clock, watch AND bell; mask is face-mask AND
       worm; bok is book AND beech.
     • ⭐ the RENDERED tile order varies across mounts (positionBot reads the stored
       order, which setupTask shuffles away).
     • tap floor >=44px at 280px; no horizontal overflow 280 → 768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'ziggy-odd-one-out.category.l-1-5-a';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const TITLES = { en: "Ziggy's Odd One Out", sv: 'Sebbes bildhage' };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    /* ⚠ the image library is served from frontend/public, NOT from mini tools —
       without this every tile 404s and the onerror handler hides the failure. */
    if (p.startsWith('/image-library-webp/')) file = path.join(PUB, p.replace(/^\//, ''));
    else if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const params = JSON.parse(fs.readFileSync(path.join(MINI, 'ziggy-odd-one-out-activities.json'), 'utf8'))[0].params;
  const POOLS = { en: params.rounds, sv: params.roundsL10n.sv };
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const classify = (r) => {
    const c = {};
    r.items.forEach(it => { c[it.category] = (c[it.category] || 0) + 1; });
    const odd = r.items.findIndex(it => c[it.category] === 1);
    return { odd, members: r.items.map((_, i) => i).filter(i => i !== odd) };
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
        const t = window.ZiggyOddOneOutActivity;
        const k = t._pool.findIndex(x => x.id === 'ziggy-odd-one-out.' + rid);
        if (k < 0) return false;
        const order = []; for (let i = 0; i < t._pool.length; i++) order.push(i);
        order.splice(order.indexOf(k), 1); order.unshift(k);
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
        return true;
      }, id);
      if (!ok) throw new Error('force(): no round "' + id + '" in the ' + LANG + ' pool');
      await page.waitForFunction(() => window.ZiggyOddOneOutActivity.round && document.querySelector('.zoo-root'), { timeout: 4000 });
      await sleep(250);                       // the four images must decode
      const got = await page.evaluate(() => window.ZiggyOddOneOutActivity.round.id);
      if (got !== id) throw new Error('force(' + id + ') landed on "' + got + '"');
    }
    async function tap(id) {
      const ok = await page.evaluate((x) => { const b = document.querySelector('.zoo-opt[data-id="' + x + '"]'); if (!b) return false; b.click(); return true; }, id);
      if (!ok) throw new Error('tap(): no tile with data-id ' + id);
      await sleep(60);
    }
    /* ⚠ wait for a CLEAN prompt before clicking, then for the verdict — a fixed sleep
       made the sibling harness flaky and the sequencing race bit it a second time. */
    async function check() {
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
    const marked = (cls) => page.$$eval('.zoo-opt.' + cls, els => els.map(e => +e.getAttribute('data-id')));
    const orderNow = () => page.$$eval('.zoo-opt', els => els.map(e => e.textContent.trim()).join('|'));
    const tiles = () => page.$$eval('.zoo-opt', els => els.map(b => {
      const img = b.querySelector('img'), w = b.querySelector('.zoo-word');
      return {
        id: +b.getAttribute('data-id'),
        loaded: !!(img && img.complete && img.naturalWidth > 0),
        hidden: !!(img && getComputedStyle(img).visibility === 'hidden'),
        src: img ? img.getAttribute('src') : null,
        word: w ? w.textContent.trim() : ''
      };
    }));

    try {
      await page.goto(`http://127.0.0.1:${PORT}/ziggy-odd-one-out-activity.html?lang=${LANG}&activity=${ACTIVITY}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.ZiggyOddOneOutActivity; return t && t._activityRow && document.querySelector('.zoo-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      note(title === TITLES[LANG], `header title "${title}" (expected "${TITLES[LANG]}")`);

      const Np = await page.evaluate(() => window.ZiggyOddOneOutActivity._pool.length);
      note(Np === pool.length, `pool has ${Np} rounds, manifest has ${pool.length} — the wrong pool is loaded`);

      for (const r of pool) {
        await force(r.id);
        const { odd, members } = classify(r);

        const ts = await tiles();
        note(ts.length === 4, `${r.id}: ${ts.length} tiles, expected 4`);
        ts.forEach(t => {
          note(!!t.word, `${r.id}: tile ${t.id} renders no word`);
          note(!t.hidden, `${r.id}: tile ${t.id} has a HIDDEN image — onerror fired on ${t.src}`);
          note(t.loaded, `${r.id}: tile ${t.id} image did not load — ${t.src}`);
        });
        note(new Set(ts.map(t => t.word)).size === 4, `${r.id}: two tiles render the SAME word (${ts.map(t => t.word).join(', ')})`);
        const shown = ts.map(t => t.word).sort().join('|');
        note(shown === r.items.map(i => (i.label || i.noun)).sort().join('|'), `${r.id}: rendered words "${shown}" are not this round's`);
        note((await marked('zoo-right')).indexOf(odd) < 0 && (await marked('zoo-tried')).indexOf(odd) < 0,
          `${r.id}: the outsider is marked before Check (leak)`);

        for (const w of members) {
          await tap(w);
          const v = await check();
          note(v === 'tryagain', `${r.id}: member ${w} did not show try-again (got ${v})`);
          note((await marked('zoo-right')).indexOf(odd) < 0, `${r.id}: tapping a member marked the OUTSIDER (leak)`);
          const tr = await marked('zoo-tried');
          note(tr.length === 1 && tr[0] === w, `${r.id}: expected the tapped tile ${w} marked, saw [${tr.join(',')}]`);
        }
        await tap(odd);
        note(await check() === 'celebrate', `${r.id}: the outsider did not celebrate`);
      }

      const orders = new Set();
      for (let i = 0; i < 12; i++) { await force(pool[0].id); orders.add(await orderNow()); }
      note(orders.size >= 2, `the rendered tile order never changed over 12 mounts of "${pool[0].id}" — tiles are not shuffled`);

      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        for (const r of (w === 280 ? pool : [pool[pool.length - 1]])) {
          await force(r.id);
          const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
          note(over <= 2, `${r.id}: overflow ${over}px at ${w}px`);
          if (w === 280) {
            const box = await page.$$eval('.zoo-opt', e => e.map(x => { const b = x.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), t: x.textContent.trim() }; }));
            box.forEach(b => note(b.w >= 44 && b.h >= 44, `${r.id}: tile "${b.t}" is ${b.w}x${b.h}px at 280px (tap floor 44)`));
          }
        }
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
      console.log(`  ${fails.filter(f => f.startsWith(LANG + ':')).length ? 'FAIL' : 'ok  '} ziggy-odd-one-out/${LANG} — "${title}" (${pool.length} rounds driven)`);
    } catch (e) {
      fails.push(LANG + ': ' + e.message);
      console.log(`  FAIL ziggy-odd-one-out/${LANG} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`ZIGGY-ODD-ONE-OUT LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.slice(0, 20).forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('ZIGGY-ODD-ONE-OUT LOCAL TEST PASSED — en + sv, every round driven; every tile shows a loaded picture and a distinct word; the outsider celebrates and every member shows try-again; the outsider is never marked before Check or by a member; the RENDERED order varies; tap floor >=44px at 280; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
