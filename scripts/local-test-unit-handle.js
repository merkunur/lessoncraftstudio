/* =====================================================================
   local-test-unit-handle.js — the browser DoD for TOOL #40
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-unit-handle.js [--shot]
   Screenshots land in docs/audit-results/unit-handle/qa/

   verify- proves the MODEL. This proves the thing on screen IS that
   model, at every width, in every configuration — and above all that
   THE DRAG WORKS, because the drag is the entire invention.

     L1 ⭐ THE UNIT IS THE DRAGGABLE THING  a real pointer drag stretches
                                           it and the count follows
     L2 ⭐ THE OBJECT DOES NOT FLINCH       measured in the DOM, to the
                                           pixel, across the whole drag
     L3 ⭐ THE OTHER TAPE DOES NOT MOVE     byte-identical geometry
     L4 ⭐ THE TILES SPAN THE OBJECT        rendered, not modelled
     L5    THE REMAINDER IS VISIBLY A PART
     L6 ⭐ THE KEYBOARD TWIN                arrows, Home/End, and
                                           Enter/Space comes out even
     L7    LABELS ARE TRUE, in the DOM
     L8    THE FREE TIER IS A REAL TRY
     L9 ⭐ THE SWEEP                        6 widths x objects x unit
                                           extremes; two tap floors named
                                           SEPARATELY; containment
                                           against THE CARD
     L10 ⭐ POISON THE SWEEP
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
const PORT = 5530;
const SHOT = process.argv.indexOf('--shot') > -1;
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'unit-handle', 'qa');

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const serve = () => http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const f = url.indexOf('/image-library-webp/') === 0 ? path.join(PUBLIC, url) : path.join(MINI, path.basename(url));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

/* the SAME model the DOM is checked against — never a second guess */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'unit-handle.js'), 'utf8') + '\n;this.__T = UnitHandle;', sandbox);
const T = sandbox.__T;
const BOOK = JSON.parse(fs.readFileSync(path.join(MINI, 'unit-handle-objects.json'), 'utf8'));
/* ⚠ the harness model needs the shelf too, or every length it computes
   is 0 and its expectations are silently meaningless */
T.data = BOOK; T.premium = true;

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
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
  /* ⚠ favicon.ico is the harness's own 404, not the tool's */
  page.on('console', (m) => { if (m.type() === 'error' && !/favicon|404|net::ERR/.test(m.text())) page._errs.push(m.text()); });
  page.on('pageerror', (e) => page._errs.push(String(e)));
  return page;
}

const open = async (page, lang, w, h) => {
  await page.setViewport({ width: w || 1024, height: h || 900 });
  await page.goto(`http://127.0.0.1:${PORT}/unit-handle.html?lang=${lang || 'en'}&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.unh-bench', { timeout: 9000 });
  await page.waitForSelector('.unh-grip', { timeout: 9000 });
  await wait(400);
};

const geom = (page, sel) => page.evaluate((s) => {
  const e = document.querySelector(s);
  if (!e) return null;
  const r = e.getBoundingClientRect();
  return { l: Math.round(r.left * 100) / 100, t: Math.round(r.top * 100) / 100, w: Math.round(r.width * 100) / 100, h: Math.round(r.height * 100) / 100 };
}, sel);
const tapeShape = (page, which) => page.evaluate((k) => {
  const tape = document.querySelector('.unh-tape-' + k);
  if (!tape) return null;
  return {
    tiles: Array.from(tape.querySelectorAll('.unh-tile')).map((e) => {
      const r = e.getBoundingClientRect();
      return Math.round(r.left * 100) / 100 + ':' + Math.round(r.width * 100) / 100 + (e.classList.contains('unh-part') ? 'p' : '');
    }).join('|'),
    count: (tape.querySelector('.unh-count') || {}).textContent || ''
  };
}, which);
const foot = (page, label) => page.evaluate((l) => {
  const b = Array.from(document.querySelectorAll('.unh-foot .unh-chip')).find((x) => x.textContent === l);
  if (!b || b.disabled) return false;
  b.click(); return true;
}, label);

/* ⚠ A REAL POINTER DRAG, TO A UNIT THE MODEL ACTUALLY ALLOWS. The
   first draft dragged to arbitrary fractions of the tape, most of which
   fall outside [U_MIN, uMax] — the tool refused them, correctly, and the
   test read that as a broken drag. Targets are computed from the object
   the page is actually showing. */
async function dragHandle(page, which, toFrac) {
  const box = await page.evaluate((k) => {
    const h = document.querySelector('.unh-tape-' + k + ' .unh-grip');
    const tape = document.querySelector('.unh-tape-' + k);
    const r = h.getBoundingClientRect(), tr = tape.getBoundingClientRect();
    return { x: r.right - 4, y: r.top + r.height / 2, tl: tr.left, tw: tr.width };
  }, which);
  await page.mouse.move(box.x, box.y);
  await page.mouse.down();
  const band = await page.evaluate(() => {
    const tape = document.querySelector('.unh-tape-a');
    const tiles = Array.from(tape.querySelectorAll('.unh-tile'));
    const tr = tape.getBoundingClientRect();
    const first = tiles[0].getBoundingClientRect();
    const last = tiles[tiles.length - 1].getBoundingClientRect();
    return { x0: (first.left - tr.left) / tr.width, x1: (last.right - tr.left) / tr.width };
  });
  /* toFrac now names a point ALONG THE OBJECT, which is where the legal
     units live: 0 = its left edge, 1 = its right edge */
  const target = box.tl + box.tw * (band.x0 + (band.x1 - band.x0) * toFrac);
  await page.mouse.move(target, box.y, { steps: 14 });
  await page.mouse.up();
  await wait(220);
}

/* ===================================================================== */
(async () => {
  const server = serve().listen(PORT);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  try {
    /* ---- L1..L4 ⭐ the drag, and what must NOT move with it -------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);

      const objBefore = await geom(page, '.unh-obj');
      const bBefore = await tapeShape(page, 'b');
      const aBefore = await tapeShape(page, 'a');

      await dragHandle(page, 'a', 0.18);
      const aAfter = await tapeShape(page, 'a');
      const objAfter = await geom(page, '.unh-obj');
      const bAfter = await tapeShape(page, 'b');

      is(aAfter.tiles !== aBefore.tiles, 'L1 ⭐ A REAL POINTER DRAG RESTRETCHES THE UNIT — the tape re-laid');
      is(aAfter.count !== aBefore.count,
        'L1 ⭐ and its count followed: ' + aBefore.count + ' -> ' + aAfter.count);
      is(JSON.stringify(objAfter) === JSON.stringify(objBefore),
        'L2 ⭐ THE OBJECT DID NOT FLINCH — identical to the pixel across the drag (' + JSON.stringify(objAfter) + ')');
      is(JSON.stringify(bAfter) === JSON.stringify(bBefore),
        'L3 ⭐ THE OTHER TAPE DID NOT MOVE — byte-identical geometry and count ' + bAfter.count);

      /* L4 — the tiles span the object, measured in the DOM */
      const span = await page.evaluate(() => {
        const o = document.querySelector('.unh-obj');
        const tape = document.querySelector('.unh-tape-a');
        const tiles = Array.from(tape.querySelectorAll('.unh-tile'));
        if (!tiles.length) return null;
        const first = tiles[0].getBoundingClientRect();
        const last = tiles[tiles.length - 1].getBoundingClientRect();
        /* the object's VISIBLE span is what the tape must match; the
           image carries transparent padding, so compare against the
           model-derived edges the tool positioned it from */
        /* ⚠ measured against the TAPE's own box, not the bench's. The
           bench carries a 2px border, so its rect starts outside the
           content box the tape's percentages are relative to — a 3-model-
           unit phantom error that looks exactly like a real drift. */
        const tr = tape.getBoundingClientRect();
        return {
          tapeL: Math.round((first.left - tr.left) / tr.width * 1000),
          tapeR: Math.round((last.right - tr.left) / tr.width * 1000),
          gaps: tiles.slice(1).map((e, i) => Math.round((e.getBoundingClientRect().left - tiles[i].getBoundingClientRect().right) * 100) / 100)
        };
      });
      const st = { obj: 0, uA: 0, uB: 0 };
      is(span && Math.abs(span.tapeR - span.tapeL - T.lengthOf({ obj: 0, uA: 100, uB: 100 })) <= 2,
        'L4 ⭐ the tiles span the object exactly: ' + (span && (span.tapeR - span.tapeL)) + ' of ' + T.lengthOf({ obj: 0, uA: 100, uB: 100 }) + ' model units');
      is(span && span.gaps.every((g) => Math.abs(g) <= 0.6),
        'L4 no gap or overlap between tiles (worst ' + (span ? Math.max(...span.gaps.map(Math.abs)).toFixed(2) : '?') + 'px)');

      /* L5 — the remainder is visibly a part */
      await dragHandle(page, 'a', 0.23);
      const part = await page.evaluate(() => {
        const p = document.querySelector('.unh-tape-a .unh-part');
        if (!p) return null;
        const c = getComputedStyle(p);
        const whole = document.querySelector('.unh-tape-a .unh-tile:not(.unh-part)');
        return { dashed: c.borderStyle, bg: c.backgroundColor, w: p.getBoundingClientRect().width, wholeW: whole.getBoundingClientRect().width };
      });
      if (part) {
        is(part.dashed === 'dashed', 'L5 the remainder is drawn dashed, not solid');
        is(part.w < part.wholeW, 'L5 the remainder is narrower than a whole unit (' + Math.round(part.w) + ' vs ' + Math.round(part.wholeW) + 'px)');
      } else is(true, 'L5 (this drag landed on an exact fit — no remainder to draw)');
      if (SHOT) await page.screenshot({ path: path.join(SHOT_DIR, 'drag-1024.png') });
      await page.close();
    }

    /* ---- L6 ⭐ the keyboard twin ------------------------------------ */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      await page.evaluate(() => document.querySelector('.unh-tape-a .unh-grip').focus());

      const cnt = () => page.evaluate(() => document.querySelector('.unh-tape-a .unh-count').textContent);
      const c0 = await cnt();
      for (let i = 0; i < 3; i++) { await page.keyboard.press('ArrowLeft'); await wait(90); }
      const c1 = await cnt();
      is(c1 !== c0, 'L6 arrows shrink the unit and the count climbs (' + c0 + ' -> ' + c1 + ')');

      await page.keyboard.press('End'); await wait(120);
      const cEnd = await cnt();
      is(cEnd === '2', 'L6 End takes the unit to the top of the band — the fewest tiles, ' + cEnd);
      await page.keyboard.press('Home'); await wait(120);
      const cHome = await cnt();
      is(Number(cHome) > Number(cEnd), 'L6 Home takes it to the smallest unit — the most tiles, ' + cHome);

      /* ⭐ Enter/Space must DO something — the liveness lesson */
      await page.keyboard.press('ArrowRight'); await wait(90);
      const before = await page.evaluate(() => document.querySelector('.unh-tape-a .unh-count').textContent
        + '|' + document.querySelectorAll('.unh-tape-a .unh-part').length);
      await page.keyboard.press('Enter'); await wait(150);
      const after = await page.evaluate(() => document.querySelector('.unh-tape-a .unh-count').textContent
        + '|' + document.querySelectorAll('.unh-tape-a .unh-part').length);
      is(after !== before, 'L6 ⭐ Enter moves the unit (' + before + ' -> ' + after + ')');
      is(after.split('|')[1] === '0', 'L6 ⭐ and it COMES OUT EVEN — no remainder tile left');

      const focused = await page.evaluate(() => {
        const a = document.activeElement;
        return a && a.classList.contains('unh-grip') ? 'handle' : (a ? a.tagName : 'none');
      });
      is(focused === 'handle', 'L6 focus stays on the handle across the re-render (landed on "' + focused + '")');
      await page.close();
    }

    /* ---- L7 · labels are true, in the DOM --------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      const objSrc = () => page.evaluate(() => ((document.querySelector('.unh-obj') || {}).src || '').split('/').slice(-1)[0]);
      const o0 = await objSrc();
      is(await foot(page, 'Another object'), 'L7 "Another object" is live');
      await wait(200);
      is((await objSrc()) !== o0, 'L7 "Another object" lands on a different object (' + o0 + ' -> ' + await objSrc() + ')');

      const both = () => page.evaluate(() => [document.querySelector('.unh-tape-a .unh-count').textContent,
        document.querySelector('.unh-tape-b .unh-count').textContent].join('/'));
      await dragHandle(page, 'a', 0.19);
      const diff = await both();
      is(await foot(page, 'Same unit on both'), 'L7 "Same unit on both" is live when they differ');
      await wait(200);
      const same = await both();
      is(same.split('/')[0] === same.split('/')[1], 'L7 "Same unit on both" makes the two counts agree (' + diff + ' -> ' + same + ')');

      await dragHandle(page, 'a', 0.27);
      is(await foot(page, 'Make it come out even'), 'L7 "Make it come out even" is live');
      await wait(200);
      is((await page.evaluate(() => document.querySelectorAll('.unh-tape-a .unh-part').length)) === 0,
        'L7 — and it leaves no remainder on tape 1');
      await page.close();
    }

    /* ---- L8 · the free tier is a real try, and the gate is honest ---- */
    {
      const page = await newPage(browser, { premium: false });
      await open(page, 'en', 1024, 900);
      /* the whole apparatus works signed out */
      await dragHandle(page, 'a', 0.17);
      await dragHandle(page, 'b', 0.44);
      const counts = await page.evaluate(() => [document.querySelector('.unh-tape-a .unh-count').textContent,
        document.querySelector('.unh-tape-b .unh-count').textContent]);
      is(counts[0] !== counts[1], 'L8 a signed-out class can stretch both tapes to different counts (' + counts.join(' vs ') + ')');

      /* six objects, then the gate */
      let seen = 0;
      for (let i = 0; i < 8; i++) { if (await foot(page, 'Another object')) seen++; await wait(120); }
      is(seen === 8, 'L8 the free shelf cycles (it wraps rather than dead-ending)');

      await page.evaluate(() => {
        const b = Array.from(document.querySelectorAll('.unh-foot .unh-chip')).find((x) => x.classList.contains('unh-locked'));
        if (b) b.click();
      });
      await wait(200);
      const gate = await page.evaluate(() => {
        const g = document.querySelector('.unh-gate');
        if (!g) return null;
        return { nodes: g.children.length, href: g.querySelector('a') ? g.querySelector('a').getAttribute('href') : null };
      });
      is(gate && gate.nodes === 2, 'L8 the gate is TWO nodes, never a concatenation');
      is(gate && /\/en\/pricing\?from=tool-unit-handle/.test(gate.href), 'L8 the gate points at pricing (' + (gate && gate.href) + ')');
      await page.close();
    }

    /* ---- L9 ⭐ THE SWEEP -------------------------------------------- */
    {
      const CASES = [];
      for (const w of [320, 360, 412, 768, 1024, 1366, 1400, 1920, 2560]) {
        for (const objStep of [0, 3, 5]) {
          for (const frac of [0.45, 0.15]) CASES.push([w, objStep, frac]);
        }
      }
      let worstCtrl = 999, worstTile = 999, worstTileWide = 999, worstFont = 999, sweepErrs = 0, checked = 0, overlaps = 0;
      for (const [w, objStep, frac] of CASES) {
        const page = await newPage(browser, { premium: true });
        const h = w >= 2400 ? 1440 : w >= 1800 ? 1080 : w >= 1400 ? 880 : w >= 768 ? 900 : 780;
        await open(page, 'en', w, h);
        for (let i = 0; i < objStep; i++) { await foot(page, 'Another object'); await wait(90); }
        /* drive BOTH tapes to their extremes, not just the default */
        await dragHandle(page, 'a', frac);
        await dragHandle(page, 'b', frac === 0.45 ? 0.16 : 0.40);
        await wait(140);

        const m = await page.evaluate(() => {
          const card = document.querySelector('.lcs-app');
          const cr = card.getBoundingClientRect();
          const vis = (e) => e.offsetParent !== null || e.getBoundingClientRect().width > 0;
          const minOf = (sel) => {
            const els = Array.from(document.querySelectorAll(sel)).filter(vis);
            if (!els.length) return null;
            return Math.min(...els.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); }));
          };
          /* ⚠ TWO TAP FLOORS, NAMED AND MEASURED SEPARATELY. An or-shaped
             assertion has hidden a missing floor twice on this platform.
             A CHIP and a HANDLE are controls (44px). A plain TILE is
             canvas, and the REMAINDER is a sliver by definition — it is
             excluded, because its whole job is to be smaller than a unit. */
          const ctrl = { chip: minOf('.unh-chip'), grip: minOf('.unh-grip') };
          const wholeTiles = Array.from(document.querySelectorAll('.unh-tile:not(.unh-part):not(.unh-handle)'));
          const tile = wholeTiles.length ? Math.min(...wholeTiles.map((e) => e.getBoundingClientRect().width)) : null;
          const fonts = Array.from(document.querySelectorAll('.unh-hint,.unh-chip,.unh-count,.unh-gate span,.unh-gate a'))
            .filter((e) => vis(e) && (e.textContent || '').trim())
            .map((e) => parseFloat(getComputedStyle(e).fontSize));
          /* ⚠ CONTAINMENT AGAINST THE CARD — an inner overflow absorbs the evidence */
          const outside = Array.from(document.querySelectorAll('.unh-hint,.unh-bench,.unh-foot'))
            .filter((e) => { const r = e.getBoundingClientRect(); return r.right > cr.right + 1 || r.left < cr.left - 1; }).length;
          const clipped = Array.from(document.querySelectorAll('.unh-chip,.unh-hint'))
            .filter((e) => e.scrollWidth > e.clientWidth + 1).length;
          /* tiles must never overlap each other */
          let ov = 0;
          for (const k of ['a', 'b']) {
            const ts = Array.from(document.querySelectorAll('.unh-tape-' + k + ' .unh-tile'));
            for (let i = 1; i < ts.length; i++) {
              if (ts[i].getBoundingClientRect().left < ts[i - 1].getBoundingClientRect().right - 0.6) ov++;
            }
          }
          /* ⭐ THE TAPE STACK IS INSIDE ITS OWN CONTAINER — and NOTHING ELSE
             HERE CAN SEE IT. `.unh-tapes` is a FIXED height with both tapes
             absolutely positioned by `--unh-row`, so if the pitch and the
             container height ever disagree the second tape renders OUTSIDE
             the box, overlapping the foot or vanishing under it — and the
             CARD HEIGHT DOES NOT CHANGE, so every FIT, containment and
             overlap assertion on this platform stays green. Found by a
             poison that correctly refused to fire: `--unh-row:420px` at Tier
             C passed the whole 11-locale layout gate. Three tiers now set
             both numbers, which is three chances to set one of them. */
          const box = document.querySelector('.unh-tapes').getBoundingClientRect();
          const tapesOut = Array.from(document.querySelectorAll('.unh-tape'))
            .filter((e) => { const r = e.getBoundingClientRect(); return r.bottom > box.bottom + 1 || r.top < box.top - 1; }).length;

          const f = document.querySelector('.unh-foot').getBoundingClientRect();
          const bench = document.querySelector('.unh-objzone').getBoundingClientRect();
          return {
            ctrl, tile, overlap: ov, minFont: fonts.length ? Math.min(...fonts) : 99,
            outside, clipped, benchH: bench.height, tapesOut,
            doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            bottom: f.bottom, cardBottom: cr.bottom
          };
        });

        const tag = w + 'px/obj+' + objStep + '/' + frac;
        if (m.tapesOut) is(false, 'L9 ' + tag + ': ' + m.tapesOut + ' tape(s) render OUTSIDE .unh-tapes — the pitch and the container height disagree');
        for (const k of Object.keys(m.ctrl)) {
          if (m.ctrl[k] === null) continue;
          if (m.ctrl[k] < 43.5) is(false, 'L9 ' + tag + ': control ".unh-' + k + '" is ' + m.ctrl[k].toFixed(1) + 'px, under the 44px control floor');
          worstCtrl = Math.min(worstCtrl, m.ctrl[k]);
        }
        if (m.tile !== null) {
          /* the canvas floor is width-dependent, as it is on The Lids:
             34px where the operator looks, 12px absolute below that */
          const floor = w >= 768 ? 33.5 : 12;
          if (m.tile < floor) is(false, 'L9 ' + tag + ': a whole tile is ' + m.tile.toFixed(1) + 'px, under the ' + floor + 'px floor for this width');
          worstTile = Math.min(worstTile, m.tile);
          if (w >= 768) worstTileWide = Math.min(worstTileWide, m.tile);
        }
        if (m.minFont < 14) is(false, 'L9 ' + tag + ': text at ' + m.minFont + 'px, under the 14px legibility floor');
        worstFont = Math.min(worstFont, m.minFont);
        if (m.outside) is(false, 'L9 ' + tag + ': ' + m.outside + ' block(s) outside THE CARD');
        if (m.clipped) is(false, 'L9 ' + tag + ': ' + m.clipped + ' label(s) clipped by their own box');
        if (m.doc > 0) is(false, 'L9 ' + tag + ': the page overflows sideways by ' + m.doc + 'px');
        if (m.overlap) { overlaps += m.overlap; is(false, 'L9 ' + tag + ': ' + m.overlap + ' tile(s) overlap their neighbour'); }
        if (m.benchH < 60) is(false, 'L9 ' + tag + ': the object zone is only ' + Math.round(m.benchH) + 'px tall');
        if (w >= 768 && m.bottom > 900) is(false, 'L9 ' + tag + ': does not FIT — the foot ends at ' + Math.round(m.bottom) + 'px');
        /* below 768 the standard is PROVEN REACHABLE, not FITS — the
           shell grows the iframe to the card's own height */
        if (w < 768 && m.bottom > m.cardBottom + 1) {
          is(false, 'L9 ' + tag + ': the foot ends at ' + Math.round(m.bottom) + 'px, past the card the iframe is grown to (' + Math.round(m.cardBottom) + 'px)');
        }
        if (page._errs.length) { sweepErrs += page._errs.length; is(false, 'L9 ' + tag + ': console error — ' + page._errs[0]); }
        if (SHOT && objStep === 3 && frac === 0.15 && (w === 360 || w === 768 || w === 1024)) {
          await page.screenshot({ path: path.join(SHOT_DIR, 'sweep-' + w + '.png'), fullPage: true });
        }
        checked++;
        await page.close();
      }
      /* the width count is DERIVED, not written out -- the literal said "6
         widths" while the loop ran 9, which is exactly the shape of label
         that makes a widened sweep look like it never widened. */
      is(true, 'L9 ⭐ the sweep: ' + checked + ' configurations (' + (CASES.length / 6) + ' widths x 3 objects x 2 unit extremes, both tapes driven)');
      is(worstCtrl >= 43.5, 'L9 smallest control across the whole sweep: ' + worstCtrl.toFixed(1) + 'px (floor 44)');
      is(worstTileWide >= 33.5, 'L9 smallest whole tile at 768px and above: ' + worstTileWide.toFixed(1) + 'px (floor 34)');
      is(worstTile >= 12, 'L9 smallest whole tile anywhere, phones included: ' + worstTile.toFixed(1) + 'px (floor 12)');
      is(worstFont >= 14, 'L9 smallest text across the whole sweep: ' + worstFont + 'px (floor 14)');
      is(overlaps === 0, 'L9 ⭐ zero overlapping tiles across the whole sweep');
      is(sweepErrs === 0, 'L9 zero console errors across the sweep');
    }

    /* ---- L10 ⭐ POISON THE SWEEP ------------------------------------
       A measurement that has never failed is not known to work. */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      const bad = await page.evaluate(() => {
        const st = document.createElement('style');
        st.textContent =
          '.unh-tile{width:20px !important;}' +
          '.unh-chip{min-height:20px !important;min-width:20px !important;padding:0 !important;}' +
          '.unh-hint{font-size:9px !important;}' +
          '.unh-objzone{height:40px !important;} .unh-bench{position:relative !important;left:900px !important;}' +
          /* the tape pitch pushed past its own fixed-height container */
          '.unh-tapes{--unh-row:420px !important;}';
        document.head.appendChild(st);
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const minOf = (sel) => {
          const els = Array.from(document.querySelectorAll(sel)).filter((e) => e.getBoundingClientRect().width > 0);
          if (!els.length) return null;
          return Math.min(...els.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); }));
        };
        const fonts = Array.from(document.querySelectorAll('.unh-hint,.unh-chip'))
          .filter((e) => (e.textContent || '').trim())
          .map((e) => parseFloat(getComputedStyle(e).fontSize));
        const wholeTiles = Array.from(document.querySelectorAll('.unh-tile:not(.unh-part):not(.unh-handle)'));
        return {
          chip: minOf('.unh-chip'),
          tile: wholeTiles.length ? Math.min(...wholeTiles.map((e) => e.getBoundingClientRect().width)) : null,
          minFont: fonts.length ? Math.min(...fonts) : 99,
          benchH: document.querySelector('.unh-objzone').getBoundingClientRect().height,
          outside: Array.from(document.querySelectorAll('.unh-hint,.unh-bench,.unh-foot'))
            .filter((e) => { const r = e.getBoundingClientRect(); return r.right > card.right + 1 || r.left < card.left - 1; }).length,
          tapesOut: (function () {
            const box = document.querySelector('.unh-tapes').getBoundingClientRect();
            return Array.from(document.querySelectorAll('.unh-tape'))
              .filter((e) => { const r = e.getBoundingClientRect(); return r.bottom > box.bottom + 1 || r.top < box.top - 1; }).length;
          })()
        };
      });
      is(bad.chip !== null && bad.chip < 43.5, 'L10 POISON: the control floor catches a 20px chip (measured ' + (bad.chip === null ? 'nothing' : bad.chip.toFixed(1) + 'px') + ')');
      is(bad.tile !== null && bad.tile < 33.5, 'L10 POISON: the canvas floor catches a 20px tile, SEPARATELY (measured ' + (bad.tile === null ? 'nothing' : bad.tile.toFixed(1) + 'px') + ')');
      is(bad.minFont < 14, 'L10 POISON: the legibility floor catches 9px text');
      is(bad.outside > 0, 'L10 POISON: containment-against-THE-CARD catches a block pushed off the right edge');
      is(bad.tapesOut > 0, 'L10 POISON: the tape-stack containment catches a pitch past its container (' + bad.tapesOut + ' outside) — the state that passed the ENTIRE 11-locale layout gate');
      is(bad.benchH < 60, 'L10 POISON: the not-tiny floor catches a collapsed bench (' + Math.round(bad.benchH) + 'px)');
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
