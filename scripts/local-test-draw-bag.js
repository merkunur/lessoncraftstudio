/* =====================================================================
   local-test-draw-bag.js — the browser definition-of-done for TOOL #38
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-draw-bag.js [--shot]
   Screenshots land in docs/audit-results/draw-bag/qa/

   verify-draw-bag.js proves the MODEL. This proves the thing on screen
   is that model, at every width the operator might look at, in every
   configuration — not just the default one.

     L1 ⭐ THE RECORD IS THE MODEL   every cell matches the model's own
                                    sequence for that bag's seed
     L2 ⭐ THE PRIOR COMMITS         the guess freezes on draw one, in
                                    the DOM and not merely in the state
     L3 ⭐ THE BAG IS OPAQUE         the pre-reveal DOM is IDENTICAL for
                                    two different bags, so nothing about
                                    the contents can be read off it
     L4 ⭐ THE RECORDS ALIGN         record two lies under record one,
                                    cell for cell, measured to 0.00px
     L5    LABELS ARE TRUE          in the DOM, not just in the source
     L6    THE BUILDER WORKS        fill a bag with one kind, and only
                                    that kind is ever drawn
     L7 ⭐ THE SWEEP                 6 widths x 3 record lengths x every
                                    skin: two tap floors named
                                    SEPARATELY, containment against THE
                                    CARD, legibility, FITS, no errors
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PUBLIC = path.join(ROOT, 'frontend', 'public');
const PORT = 5510;
const SHOT = process.argv.indexOf('--shot') > -1;
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'draw-bag', 'qa');

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };
/* the picture skins load out of frontend/public, everything else out of
   mini tools — the same split audit-tool-control-liveness.js uses */
const serve = () => http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const f = url.indexOf('/image-library-webp/') === 0
    ? path.join(PUBLIC, url)
    : path.join(MINI, path.basename(url));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

/* the SAME model object the DOM is checked against — never a second guess */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'draw-bag.js'), 'utf8') + '\n;this.__T = DrawBag;', sandbox);
const T = sandbox.__T;
const BOOK = JSON.parse(fs.readFileSync(path.join(MINI, 'draw-bag-bags.json'), 'utf8'));
const FREE_BAGS = BOOK.bags.filter((b) => b.free);

let PASS = 0, FAIL = 0;
const is = (cond, msg) => { if (cond) { PASS++; console.log('  ok   ' + msg); } else { FAIL++; console.error('  FAIL ' + msg); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function newPage(browser, o) {
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => (r.url().includes('/api/auth/me')
    ? r.respond({
      status: 200, contentType: 'application/json',
      body: JSON.stringify(o && o.premium
        ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
        : { user: { subscriptionTier: 'free' }, subscription: null })
    })
    : r.continue()));
  await page.evaluateOnNewDocument((premium) => {
    try { localStorage.clear(); } catch (_) {}
    if (premium) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }
    window.print = function () { window.__printed = (window.__printed || 0) + 1; };
  }, !!(o && o.premium));
  page._errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const open = async (page, lang, w, h) => {
  await page.setViewport({ width: w || 1024, height: h || 900 });
  await page.goto(`http://127.0.0.1:${PORT}/draw-bag.html?lang=${lang || 'en'}&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.drb-wrap', { timeout: 9000 });
  await page.waitForSelector('.drb-bag', { timeout: 9000 });
  await wait(300);
};

const click = async (page, sel, i) => {
  await page.evaluate((s, n) => { const e = document.querySelectorAll(s)[n || 0]; if (e) e.click(); }, sel, i || 0);
  await wait(70);
};
const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);

/* the record, read off the rendered SVG classes — the piece a cell
   actually shows, never a value the harness was told */
const readRecord = (page, ri) => page.evaluate((n) => {
  const rec = document.querySelectorAll('.drb-rec')[n];
  if (!rec) return null;
  return Array.from(rec.querySelectorAll('.drb-cell')).map((c) => {
    const svg = c.querySelector('svg');
    if (svg) { const m = /drb-k-([a-z])/.exec(svg.getAttribute('class') || ''); return m ? m[1] : '?'; }
    if (c.querySelector('img')) return 'i';
    return '';
  }).join('').replace(/\s/g, '');
}, ri);

const drawAll = async (page, n) => {
  for (let i = 0; i < n + 2; i++) {
    const done = await page.evaluate(() => {
      const b = document.querySelector('.drb-bag');
      if (!b || b.disabled) return true;
      b.click();
      return false;
    });
    if (done) break;
    await wait(45);
  }
};

/* ===================================================================== */
(async () => {
  const server = serve().listen(PORT);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  try {
    /* ---- L1 · the record is the model ------------------------------ */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      /* the tool seats the first free bag at startup, so the expected
         sequence is computable without asking the page anything */
      const bag = {}; for (const k of T.KINDS) bag[k] = FREE_BAGS[0].b[k] || 0;
      const n = T.DEFAULT_LEN;
      let want = '';
      const seed = T.seedFor(bag, 1);
      for (let i = 0; i < n; i++) want += T.pick(bag, seed, i);

      await drawAll(page, n);
      const got = await readRecord(page, 0);
      is(got === want, 'L1 the record is the model: ' + n + ' cells match the model sequence for this bag (' + got.slice(0, 12) + '…)');
      is(await page.evaluate(() => document.querySelector('.drb-bag').disabled), 'L1 a full record disables the bag');
      await page.close();
    }

    /* ---- L2 · the prior commits ------------------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      const shelfBefore = await count(page, '.drb-shelf.drb-in .drb-gpiece');
      await click(page, '.drb-shelf.drb-pool .drb-gpiece', 0);
      const shelfAfter = await count(page, '.drb-shelf.drb-in .drb-gpiece');
      is(shelfBefore === 0 && shelfAfter === 1, 'L2 a piece moves into the bag shelf before any draw (' + shelfBefore + ' -> ' + shelfAfter + ')');

      await click(page, '.drb-bag', 0);
      const allDisabled = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.drb-gpiece')).every((b) => b.disabled));
      is(allDisabled, 'L2 the prior commits: every guess control is disabled after draw one');

      const snap = () => page.evaluate(() => Array.from(document.querySelectorAll('.drb-shelf')).map((s) => s.className + ':' + s.querySelectorAll('.drb-gpiece').length).join('|'));
      const before = await snap();
      await click(page, '.drb-gpiece', 0);
      await click(page, '.drb-gpiece', 1);
      is((await snap()) === before, 'L2 clicking a committed guess moves nothing (' + before + ')');
      await page.close();
    }

    /* ---- L3 ⭐ the bag is opaque ------------------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      /* everything the page renders before a draw, as one string */
      const census = () => page.evaluate(() => {
        const stage = document.querySelector('.drb-wrap');
        const pieces = Array.from(stage.querySelectorAll('.drb-piece')).map((p) => {
          const m = /drb-k-([a-z])/.exec(p.getAttribute('class') || '');
          return m ? m[1] : (p.tagName === 'IMG' ? 'i' : '?');
        }).sort().join('');
        return { pieces, cells: stage.querySelectorAll('.drb-cell').length, revealed: stage.querySelectorAll('.drb-ocell').length };
      });
      const a = await census();
      /* step to a DIFFERENT bag and look again */
      const foot = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((b) => b.textContent));
      const anotherIdx = foot.indexOf('Another bag');
      await click(page, '.drb-foot .drb-chip', anotherIdx);
      const b = await census();
      is(a.revealed === 0 && b.revealed === 0, 'L3 nothing is revealed before the bag is opened');
      is(JSON.stringify(a) === JSON.stringify(b),
        'L3 ⭐ the bag is opaque: two different bags render an IDENTICAL pre-reveal DOM (' + a.pieces + ' / ' + a.cells + ' cells)');
      /* and after opening, the reveal appears and holds the real total */
      await drawAll(page, T.DEFAULT_LEN);
      const foot2 = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((x) => x.textContent));
      await click(page, '.drb-foot .drb-chip', foot2.indexOf('Open the bag'));
      const revealed = await count(page, '.drb-ocell');
      is(revealed > 0, 'L3 the reveal appears only after "Open the bag" (' + revealed + ' pieces)');
      await page.close();
    }

    /* ---- L4 ⭐ the two records align --------------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      await drawAll(page, T.DEFAULT_LEN);
      const foot = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((b) => b.textContent));
      await click(page, '.drb-foot .drb-chip', foot.indexOf('Run it again'));
      await wait(120);
      is((await count(page, '.drb-rec')) === 2, 'L4 "Run it again" lays a second record');
      await drawAll(page, T.DEFAULT_LEN);

      const geom = await page.evaluate(() => {
        const recs = document.querySelectorAll('.drb-rec');
        if (recs.length < 2) return null;
        const cols = (r) => getComputedStyle(r).gridTemplateColumns.split(' ').length;
        const xs = (r) => Array.from(r.querySelectorAll('.drb-cell')).map((c) => Math.round(c.getBoundingClientRect().left * 100) / 100);
        return { c0: cols(recs[0]), c1: cols(recs[1]), x0: xs(recs[0]), x1: xs(recs[1]) };
      });
      is(geom && geom.c0 === geom.c1, 'L4 both records wrap to the same column count (' + (geom && geom.c0) + ')');
      const maxDx = geom ? Math.max(...geom.x0.map((v, i) => Math.abs(v - geom.x1[i]))) : 999;
      is(maxDx === 0, 'L4 ⭐ record two lies under record one, cell for cell, to ' + maxDx.toFixed(2) + 'px');

      const r1 = await readRecord(page, 0), r2 = await readRecord(page, 1);
      is(r1 !== r2, 'L4 the same bag produced two different records — the thesis, on screen');
      /* and never a ghost overlay: arrow-strip owns that */
      is((await count(page, '.drb-ghost')) === 0, 'L4 no ghost overlay (arrow-strip owns run-over-ghost)');
      if (SHOT) await page.screenshot({ path: path.join(SHOT_DIR, 'two-records-1024.png') });
      await page.close();
    }

    /* ---- L5 · labels are true, in the DOM ---------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      const footTexts = () => page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((b) => b.textContent));
      let t = await footTexts();
      await click(page, '.drb-foot .drb-chip', t.indexOf('Fill the bag'));
      is((await count(page, '.drb-fill')) === 1, 'L5 "Fill the bag" opens the builder');
      is((await count(page, '.drb-fillcol')) === T.KINDS.length, 'L5 the builder offers all six kinds');
      t = await footTexts();
      await click(page, '.drb-foot .drb-chip', t.indexOf('Close the bag'));
      is((await count(page, '.drb-fill')) === 0, 'L5 "Close the bag" seals it');
      await page.close();
    }

    /* ---- L6 · the builder actually decides what is drawn -------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      let t = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((b) => b.textContent));
      await click(page, '.drb-foot .drb-chip', t.indexOf('Fill the bag'));
      /* empty every kind, then put six of ONE kind in */
      await page.evaluate(() => {
        for (let pass = 0; pass < 14; pass++) {
          document.querySelectorAll('.drb-fillcol').forEach((col) => {
            const less = col.querySelectorAll('.drb-step')[1];
            if (less && !less.disabled) less.click();
          });
        }
      });
      await wait(120);
      for (let i = 0; i < 6; i++) {
        await page.evaluate(() => {
          const more = document.querySelectorAll('.drb-fillcol')[3].querySelectorAll('.drb-step')[0];
          if (more && !more.disabled) more.click();
        });
        await wait(45);
      }
      t = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((b) => b.textContent));
      await click(page, '.drb-foot .drb-chip', t.indexOf('Close the bag'));
      await wait(120);
      await drawAll(page, T.DEFAULT_LEN);
      const rec = await readRecord(page, 0);
      const only = T.KINDS[3];
      is(rec.length > 0 && rec.split('').every((c) => c === only),
        'L6 ⭐ a bag the teacher filled with one kind draws only that kind (' + rec.slice(0, 10) + '…)');
      await page.close();
    }

    /* ---- L7 ⭐ THE SWEEP --------------------------------------------- */
    {
      const skins = ['shapes'].concat(BOOK.skins.map((s) => s.id));
      const CELLS = [
        [320, 10], [320, 20], [320, 40],
        [360, 20], [412, 40],
        [768, 20], [768, 40],
        [1024, 10], [1024, 40],
        [1366, 40],
        /* ⚠ THE TIER CELLS. draw-bag SHIPPED its three wide tiers with a sweep
           that stopped at 1366, so nothing in its own suite ever rendered them
           — a tier nobody measures is a tier nobody has verified. Each is its
           tier's floor at the fullest record, which is where the grid is
           tallest and the cap most likely to push past the fold. */
        [1400, 40], [1920, 40], [2560, 40], [2560, 10]
      ];
      let worstCtrl = 999, worstCell = 999, worstFont = 999, sweepErrs = 0, checked = 0;
      for (const [w, n] of CELLS) {
        for (const skin of skins) {
          const page = await newPage(browser, { premium: true });
          const h = w >= 2400 ? 1440 : w >= 1800 ? 1080 : w >= 1400 ? 880 : w >= 768 ? 900 : 780;
          const vpH = h;
          await open(page, 'en', w, h);
          /* every configuration, not just the default one */
          await page.evaluate((len, sk) => {
            const lens = document.querySelectorAll('.drb-bar .drb-group')[0].querySelectorAll('.drb-chip');
            for (const b of lens) if (b.textContent === String(len) && !b.disabled) { b.click(); return; }
          }, n, skin);
          await wait(90);
          await page.evaluate((sk) => {
            const chips = document.querySelectorAll('.drb-bar .drb-group')[1].querySelectorAll('.drb-chip');
            for (const b of chips) if ((b.getAttribute('aria-label') || '').toLowerCase().indexOf(sk === 'shapes' ? 'shape' : sk.slice(0, 4)) >= 0) { b.click(); return; }
          }, skin);
          await wait(120);
          /* put a piece on each guess shelf and half-fill the record, so
             the measurement is of a page in use rather than at rest */
          await click(page, '.drb-shelf.drb-pool .drb-gpiece', 0);
          await click(page, '.drb-shelf.drb-pool .drb-gpiece', 0);
          await click(page, '.drb-shelf.drb-in .drb-gpiece', 0);
          await drawAll(page, n);
          /* ⚠ THE DENSEST CELLS ALSO RUN TWICE AND OPEN THE BAG. This
             sweep passed a page that ran to 1091px at 768 in every
             locale, because it never opened the reveal with two full
             records — the locale audit found it. "Sweep every
             configuration" has to mean every STATE, not just every
             setting. */
          if (n === 40) {
            await page.evaluate(() => { const c = document.querySelectorAll('.drb-foot .drb-chip')[1]; if (c && !c.disabled) c.click(); });
            await wait(130);
            await drawAll(page, n);
            await page.evaluate(() => { const c = document.querySelectorAll('.drb-foot .drb-chip')[2]; if (c && !c.disabled) c.click(); });
            await wait(130);
          }
          await wait(120);

          const m = await page.evaluate(() => {
            const card = document.querySelector('.lcs-app');
            const cr = card.getBoundingClientRect();
            const minOf = (sel) => {
              const els = Array.from(document.querySelectorAll(sel)).filter((e) => e.offsetParent !== null);
              if (!els.length) return null;
              return Math.min(...els.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); }));
            };
            /* ⚠ TWO TAP FLOORS, NAMED SEPARATELY AND MEASURED SEPARATELY.
               An or-shaped assertion ("the chip OR anything holds 44px")
               has hidden a missing floor twice on this platform. */
            const ctrl = {
              chip: minOf('.drb-chip'), step: minOf('.drb-step'),
              gpiece: minOf('.drb-gpiece'), bag: minOf('.drb-bag')
            };
            const cell = minOf('.drb-cell');
            const fonts = Array.from(document.querySelectorAll('.drb-hint,.drb-chip,.drb-gate span,.drb-gate a'))
              .filter((e) => e.offsetParent !== null && (e.textContent || '').trim())
              .map((e) => parseFloat(getComputedStyle(e).fontSize));
            /* ⚠ CONTAINMENT AGAINST THE CARD, NOT THE INNER BOX. Cells
               inside a record that itself overflows pass every cell-level
               check, and overflow-x absorbs the evidence. */
            const outside = Array.from(document.querySelectorAll('.drb-rec,.drb-guess,.drb-main,.drb-opened,.drb-fill'))
              .filter((e) => { const r = e.getBoundingClientRect(); return r.right > cr.right + 1 || r.left < cr.left - 1; }).length;
            const clipped = Array.from(document.querySelectorAll('.drb-chip,.drb-hint'))
              .filter((e) => e.scrollWidth > e.clientWidth + 1).length;
            const foot = document.querySelector('.drb-foot').getBoundingClientRect();
            /* ⚠ SPARSE IS MEASURED, NOT EYEBALLED. Three stacked guess
               shelves — two of them empty until the class commits — ate
               about 200px across the top of a desktop screen, and every
               floor above passed it, because a floor cannot see empty
               space. §A.13.62: sparse, tiny and cut-off are the three
               classes measured gates kept missing. */
            const g = document.querySelector('.drb-guess');
            const guessH = g ? g.getBoundingClientRect().height : 0;
            /* the undecided pool starts holding all six pieces, and at
               desktop they must sit on ONE line — it missed by 0.375px
               once, which reads as a deliberate 5+1 arrangement */
            const pool = document.querySelector('.drb-shelf.drb-pool');
            const poolPieces = pool ? pool.querySelectorAll('.drb-gpiece').length : 0;
            const poolRows = pool && poolPieces
              ? new Set(Array.from(pool.querySelectorAll('.drb-gpiece')).map((e) => Math.round(e.getBoundingClientRect().top))).size
              : 0;
            const bag = document.querySelector('.drb-bag');
            return {
              ctrl, cell, minFont: fonts.length ? Math.min(...fonts) : 99,
              outside, clipped, guessH, poolPieces, poolRows,
              bagMin: bag ? Math.min(bag.getBoundingClientRect().width, bag.getBoundingClientRect().height) : 0,
              doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
              bottom: foot.bottom
            };
          });

          const tag = w + 'px/n=' + n + '/' + skin;
          for (const k of Object.keys(m.ctrl)) {
            if (m.ctrl[k] === null) continue;
            if (m.ctrl[k] < 43.5) { is(false, 'L7 ' + tag + ': control ".drb-' + k + '" is ' + m.ctrl[k].toFixed(1) + 'px, under the 44px control floor'); }
            worstCtrl = Math.min(worstCtrl, m.ctrl[k]);
          }
          if (m.cell !== null) {
            if (m.cell < 33.5) is(false, 'L7 ' + tag + ': a record cell is ' + m.cell.toFixed(1) + 'px, under the 34px canvas floor');
            worstCell = Math.min(worstCell, m.cell);
          }
          if (m.minFont < 14) is(false, 'L7 ' + tag + ': text at ' + m.minFont + 'px, under the 14px legibility floor');
          worstFont = Math.min(worstFont, m.minFont);
          if (m.outside) is(false, 'L7 ' + tag + ': ' + m.outside + ' block(s) outside THE CARD');
          if (m.clipped) is(false, 'L7 ' + tag + ': ' + m.clipped + ' label(s) clipped by their own box');
          if (m.doc > 0) is(false, 'L7 ' + tag + ': the page overflows sideways by ' + m.doc + 'px');
        /* ⚠ THIS WAS A HARDCODED 900. Third time in this batch: a per-tool
           gate whose sweep is widened past 900 keeps comparing against a
           literal, so a tool that fits its board perfectly reports CUT OFF.
           Measure the REAL viewport; below the wide cells it IS 900, so no
           existing cell moves. */
          if (w >= 768 && m.bottom > vpH) is(false, 'L7 ' + tag + ': does not FIT — the foot ends at ' + Math.round(m.bottom) + 'px of ' + vpH + 'px');
          /* ⚠ BELOW 768 THE STANDARD IS *PROVEN REACHABLE*, NOT FITS —
             the recorded arrow-strip defect is a sweep that asserted
             FITS at >=768 and checked nothing at all below it, so a
             phone could hide the last control forever and stay green.
             ⚠ BUT REACHABLE IS *NOT* MEASURED BY SCROLLING. lcs-shell.css
             sets `html,body{height:100%;overflow:hidden}` on purpose, so
             the standalone page can NEVER scroll; in production the tool
             sits in an iframe that the shell grows by broadcasting
             `.lcs-app`'s own height (lcs-shell.js:914 — rect.height + 2).
             A scroll-and-re-measure check therefore fails on every phone
             width while production is perfectly fine, and "fixing" the
             tool to satisfy it would break the shell contract. The
             honest question is the one the shell actually answers: is
             the last control INSIDE THE CARD the parent will be told to
             show? Measured here at 902px inside a 926px card. */
          if (w < 768) {
            const reach = await page.evaluate(() => {
              const card = document.querySelector('.lcs-app').getBoundingClientRect();
              const chips = document.querySelectorAll('.drb-foot .drb-chip');
              const last = chips[chips.length - 1];
              if (!last) return { ok: false, bottom: 0, card: 0 };
              const r = last.getBoundingClientRect();
              return { ok: r.bottom <= card.bottom + 1, bottom: Math.round(r.bottom), card: Math.round(card.bottom) };
            });
            if (!reach.ok) is(false, 'L7 ' + tag + ': the last foot control ends at ' + reach.bottom + 'px, past the card the iframe is grown to (' + reach.card + 'px) — it would be clipped on a phone');
          }
          /* NOT SPARSE: at desktop the three shelves must sit side by
             side, so the guess block is one row and not three bands */
          if (w >= 820 && m.guessH > 140) is(false, 'L7 ' + tag + ': the guess block is ' + Math.round(m.guessH) + 'px tall at desktop — three empty bands, not one row');
          /* NOT TINY: the bag is the apparatus and the only thing the
             class taps; it must not be smaller than the chips beside it */
          if (m.bagMin && m.bagMin < 100) is(false, 'L7 ' + tag + ': the bag is only ' + Math.round(m.bagMin) + 'px — the apparatus is smaller than its own chrome');
          if (page._errs.length) { sweepErrs += page._errs.length; is(false, 'L7 ' + tag + ': console error — ' + page._errs[0]); }
          if (SHOT && skin === 'shapes' && (w === 360 || w === 768 || w === 1024)) {
            await page.screenshot({ path: path.join(SHOT_DIR, 'sweep-' + w + '-n' + n + '.png'), fullPage: true });
          }
          checked++;
          await page.close();
        }
      }
      is(true, 'L7 ⭐ the sweep: ' + checked + ' configurations (6 widths x 3 lengths x ' + skins.length + ' skins)');
      is(worstCtrl >= 43.5, 'L7 smallest control across the whole sweep: ' + worstCtrl.toFixed(1) + 'px (floor 44)');
      is(worstCell >= 33.5, 'L7 smallest record cell across the whole sweep: ' + worstCell.toFixed(1) + 'px (floor 34)');
      is(worstFont >= 14, 'L7 smallest text across the whole sweep: ' + worstFont + 'px (floor 14)');
      is(sweepErrs === 0, 'L7 zero console errors across the sweep');
    }
    /* ---- L9 · the undecided pool holds six on one line ---------------
       ⚠ MEASURED ON A FRESH LOAD, because that is the only moment all
       six pieces are in the pool — the sweep moves two of them before it
       measures, so folding this into the sweep would have made an
       assertion that could never fire. It missed by 0.375px once. */
    for (const w of [820, 1024, 1366]) {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', w, 900);
      const r = await page.evaluate(() => {
        const pool = document.querySelector('.drb-shelf.drb-pool');
        const ps = Array.from(pool.querySelectorAll('.drb-gpiece'));
        return { n: ps.length, rows: new Set(ps.map((e) => Math.round(e.getBoundingClientRect().top))).size };
      });
      is(r.n === T.KINDS.length && r.rows === 1,
        'L9 at ' + w + 'px the undecided pool holds all ' + r.n + ' pieces on ' + r.rows + ' row');
      await page.close();
    }

    /* ---- L8 ⭐ POISON THE SWEEP ------------------------------------
       A measurement that has never failed is not known to work. This
       shrinks the two tap targets and pushes a block off the card, then
       asserts the SAME code that scored the sweep reports all three. If
       this block ever passes silently, every "ok" above is worthless.
       (The platform rule: prove a gate FAILS on a synthetic violation
       before trusting it — and the number-sieve or-shaped tap-floor
       assertion is why the two floors are poisoned separately.) */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      await drawAll(page, T.DEFAULT_LEN);
      const bad = await page.evaluate(() => {
        const st = document.createElement('style');
        st.textContent =
          '.drb-cell{width:20px !important;height:20px !important;}' +
          '.drb-chip{min-height:20px !important;min-width:20px !important;padding:0 !important;}' +
          '.drb-hint{font-size:9px !important;}' +
          '.drb-guess{position:relative !important;left:900px !important;}';
        document.head.appendChild(st);
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const minOf = (sel) => {
          const els = Array.from(document.querySelectorAll(sel)).filter((e) => e.offsetParent !== null);
          if (!els.length) return null;
          return Math.min(...els.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); }));
        };
        const fonts = Array.from(document.querySelectorAll('.drb-hint,.drb-chip'))
          .filter((e) => e.offsetParent !== null && (e.textContent || '').trim())
          .map((e) => parseFloat(getComputedStyle(e).fontSize));
        return {
          chip: minOf('.drb-chip'), cell: minOf('.drb-cell'),
          minFont: fonts.length ? Math.min(...fonts) : 99,
          outside: Array.from(document.querySelectorAll('.drb-rec,.drb-guess,.drb-main,.drb-opened,.drb-fill'))
            .filter((e) => { const r = e.getBoundingClientRect(); return r.right > card.right + 1 || r.left < card.left - 1; }).length
        };
      });
      is(bad.chip !== null && bad.chip < 43.5, 'L8 POISON: the control floor catches a 20px chip (measured ' + (bad.chip === null ? 'nothing' : bad.chip.toFixed(1) + 'px') + ')');
      is(bad.cell !== null && bad.cell < 33.5, 'L8 POISON: the canvas floor catches a 20px cell, SEPARATELY (measured ' + (bad.cell === null ? 'nothing' : bad.cell.toFixed(1) + 'px') + ')');
      is(bad.minFont < 14, 'L8 POISON: the legibility floor catches 9px text');
      is(bad.outside > 0, 'L8 POISON: containment-against-THE-CARD catches a block pushed off the right edge');
      await page.close();
    }
  } catch (e) {
    FAIL++;
    console.error('  FAIL harness threw: ' + (e && e.stack ? e.stack : e));
  }

  await browser.close();
  server.close();
  console.log('');
  if (FAIL) { console.error('FAIL — ' + FAIL + ' of ' + (PASS + FAIL) + ' assertions'); process.exit(1); }
  console.log('PASS — ' + PASS + ' assertions');
})();
