/* =====================================================================
   RENDER PROBE — TOOL #54, THE DOUBLING MIRROR
   =====================================================================
   ⚠⚠ THIS FILE WAS A #50 CLONE AND CARRIED THE NUMBER DRUM'S HEADER,
   ITS SELECTORS AND ITS QUESTIONS. That is the recorded #43 lesson —
   cloning a gate copies its selectors AND its globals — and it is the
   third time this program has walked into it.

   ⚠⚠ AND THE ORIGINAL PROBE CERTIFIED THE DEFECT THIS REBUILD EXISTS
   TO KILL. It asserted `far === 4` by COUNTING `.dbm-c` NODES, and
   `querySelectorAll` counts nodes inside a `visibility:hidden` parent
   perfectly happily — so it passed while the far leaf was invisible in
   exactly the state the tool is for. Its height check passed for the
   same reason: a hidden element still has a bounding rect.

   So every question here is asked IN PIXELS, of what a child can
   actually see: is the box non-zero, is it inside its leaf, is the
   computed visibility visible, does the fold angle actually change.
   A node count is never evidence of a render.

   Run: node scripts/probe-doubling-mirror.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.DOUBLING_MIRROR_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'doubling-mirror');
const WIDTHS = [320, 360, 412, 704, 768, 1024, 1366];

let pass = 0;
const fails = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };

const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };

function serve() {
  return new Promise(res => {
    const s = http.createServer((rq, rs) => {
      let p = decodeURIComponent(rq.url.split('?')[0]);
      if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools/'.length);
      const f = path.join(ROOT, p.replace(/^\//, ''));
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rs.writeHead(404); rs.end(); return; }
      rs.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      rs.end(fs.readFileSync(f));
    });
    s.listen(0, '127.0.0.1', () => res(s));
  });
}

/* ---- the questions, all in pixels -------------------------------- */

/* a box is only real if it is non-zero AND its computed visibility is
   visible AND every ancestor's is too — the exact hole the old probe
   fell through */
const REALLY_VISIBLE = `(el) => {
  const r = el.getBoundingClientRect();
  if (r.width < 1 || r.height < 1) return false;
  let n = el;
  while (n && n.nodeType === 1) {
    const cs = getComputedStyle(n);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) === 0) return false;
    n = n.parentElement;
  }
  return true;
}`;

(async () => {
  const srv = await serve();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  fs.mkdirSync(OUT, { recursive: true });

  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    page.on('pageerror', e => fails.push('CONSOLE pageerror: ' + e.message));
    await page.setViewport({ width: 704, height: 900 });
    await page.goto(base + '/doubling-mirror.html', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.dbm-tray', { timeout: 8000 });

    /* --- non-vacuity FIRST: the apparatus is on the page ---------- */
    const parts = await page.evaluate(() => ({
      tray: !!document.querySelector('.dbm-tray'),
      near: !!document.querySelector('.dbm-near'),
      far: !!document.querySelector('.dbm-far'),
      hinge: !!document.querySelector('.dbm-hinge'),
      counters: document.querySelectorAll('.dbm-c').length,
      groups: document.querySelectorAll('.dbm-g').length
    }));
    ok(parts.tray && parts.near && parts.far && parts.hinge,
      'P0 non-vacuity: the tray, its two leaves and the hinge must all be in the DOM — ' + JSON.stringify(parts));
    ok(parts.counters >= 3, 'P0 non-vacuity: the opening tray draws no counters (' + parts.counters + ')');
    ok(parts.groups >= 4, 'P0 non-vacuity: fewer than four control groups');

    const vis = sel => page.$$eval(sel, (els, fn) =>
      els.map(el => eval('(' + fn + ')')(el)), REALLY_VISIBLE);
    const box = sel => page.$eval(sel, el => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height, b: r.bottom };
    });
    const drive = fn => page.evaluate(fn);

    /* --- the opening state ---------------------------------------- */
    let nearVis = await vis('.dbm-near .dbm-c');
    ok(nearVis.length >= 3 && nearVis.every(Boolean),
      'P1 ⚠⚠ a counter on the near leaf is not REALLY visible (' + nearVis.filter(Boolean).length + '/' + nearVis.length + ')');

    /* every counter must sit INSIDE its own leaf, not merely exist */
    const inside = await page.evaluate(() => {
      const out = [];
      ['near', 'far'].forEach(function (which) {
        const leaf = document.querySelector('.dbm-' + which);
        if (!leaf) return;
        const L = leaf.getBoundingClientRect();
        leaf.querySelectorAll('.dbm-c').forEach(function (c) {
          const r = c.getBoundingClientRect();
          out.push({ which: which,
            in: r.left >= L.left - 2 && r.right <= L.right + 2 &&
                r.top >= L.top - 2 && r.bottom <= L.bottom + 2 });
        });
      });
      return out;
    });
    ok(inside.length > 0, 'P1 non-vacuity: no counter was measured against a leaf');
    ok(inside.every(c => c.in),
      'P1 ⚠ a counter is drawn OUTSIDE its leaf (' + inside.filter(c => !c.in).length + ' of ' + inside.length + ')');

    /* --- the fold is a real, measured rotation -------------------- */
    const foldOpen = await page.evaluate(() =>
      getComputedStyle(document.querySelector('.dbm-tray')).getPropertyValue('--dbm-fold').trim());
    ok(/-?\d/.test(foldOpen), 'P2 the fold variable is not set on an open tray (' + foldOpen + ')');

    /* --- CLOSE, and watch the far leaf ---------------------------- */
    /* the class must commit first; press the chip for the double */
    await drive(() => {
      const c = document.querySelector('.dbm-chips .dbm-btn');
      if (c) c.click();
    });
    await new Promise(r => setTimeout(r, 120));
    await drive(() => { const b = document.querySelector('.dbm-b-close'); if (b) b.click(); });

    /* THE BEAT: shut, far half visibly EMPTY, and the total withheld */
    await new Promise(r => setTimeout(r, 260));
    const beat = await page.evaluate(() => {
      const t = document.querySelector('.dbm-tray');
      const tot = document.querySelector('.dbm-num-total');
      return { shut: t.classList.contains('is-closed'),
        total: tot ? tot.textContent.trim() : '(no tot element)' };
    });
    ok(beat.shut, 'P3 the tray did not shut');
    ok(beat.total === '',
      'P3 ⚠⚠ THE TOTAL WAS SHOWN DURING THE BEAT — the tray said the double before the double existed ("' + beat.total + '")');

    /* --- the deal finishes, and the far half is REALLY visible ---- */
    await new Promise(r => setTimeout(r, 2200));
    const farVis = await vis('.dbm-far .dbm-c');
    ok(farVis.length > 0,
      'P4 ⚠⚠ the far half received NO counters — the doubling did not happen');
    ok(farVis.every(Boolean),
      'P4 ⚠⚠ THE FAR LEAF IS NOT REALLY VISIBLE — the defect this rebuild exists to kill ' +
      '(' + farVis.filter(Boolean).length + '/' + farVis.length + ' visible). A node count would have PASSED here.');
    const totalNow = await page.$eval('.dbm-num-total', el => el.textContent.trim());
    ok(/^\d+$/.test(totalNow), 'P4 the total is still withheld after the deal ("' + totalNow + '")');

    /* --- the six closed/open differences, measured --------------- */
    const shutM = await page.evaluate(() => {
      const g = s => document.querySelector(s);
      const r = s => { const e = g(s); if (!e) return null; const b = e.getBoundingClientRect(); return { w: b.width, h: b.height }; };
      return { hinge: r('.dbm-hinge'), fold: getComputedStyle(g('.dbm-tray')).getPropertyValue('--dbm-fold').trim(),
        closed: g('.dbm-tray').classList.contains('is-closed') };
    });

    await drive(() => {
      const c = document.querySelector('.dbm-chips .dbm-btn');
      if (c) c.click();
    });
    await new Promise(r => setTimeout(r, 120));
    await drive(() => { const b = document.querySelector('.dbm-b-open'); if (b) b.click(); });
    await new Promise(r => setTimeout(r, 1400));

    const openM = await page.evaluate(() => {
      const g = s => document.querySelector(s);
      const r = s => { const e = g(s); if (!e) return null; const b = e.getBoundingClientRect(); return { w: b.width, h: b.height }; };
      return { hinge: r('.dbm-hinge'), fold: getComputedStyle(g('.dbm-tray')).getPropertyValue('--dbm-fold').trim(),
        closed: g('.dbm-tray').classList.contains('is-closed'),
        near: document.querySelectorAll('.dbm-near .dbm-c').length,
        far: document.querySelectorAll('.dbm-far .dbm-c').length };
    });
    ok(!openM.closed, 'P5 ⚠⚠ open() left the tray SHUT — a control with no consequence');
    ok(shutM.fold !== openM.fold,
      'P5 ⚠⚠ the fold angle is IDENTICAL shut and open (' + shutM.fold + ') — nothing actually folds');
    ok(shutM.hinge && openM.hinge && Math.abs(shutM.hinge.h - openM.hinge.h) > 1,
      'P5 the hinge is the same height shut and open — the closed state looks open');
    ok(openM.near > 0 && openM.near === openM.far,
      'P5 the whole did not share out into two equal leaves (' + openM.near + ' / ' + openM.far + ')');

    const bothVis = await vis('.dbm-c');
    ok(bothVis.length >= 6 && bothVis.every(Boolean),
      'P5 ⚠⚠ a counter is not really visible on the opened tray');

    /* --- ⭐⭐ A COUNTER THAT STAYS PUT MUST NEVER BE REBUILT ------
       Every transition in this tool depends on it: a re-created node
       teleports instead of moving. A mutation dropping the `if (!c)`
       guard — so each paint rebuilds every counter — SURVIVED the whole
       suite, which means the law had no test at all. Node identity is
       the only honest way to ask: tag them, repaint without changing
       the count, and require the same nodes to still be there. */
    const kept = await page.evaluate(async () => {
      const T = window.DoublingMirror;
      const tag = () => { let i = 0;
        document.querySelectorAll('.dbm-c').forEach(c => { c.dataset.probe = 'p' + (i++); }); };
      tag();
      const before = Array.from(document.querySelectorAll('.dbm-c')).map(c => c.dataset.probe);
      T._paint(); T._paint();
      await new Promise(r => setTimeout(r, 120));
      const after = Array.from(document.querySelectorAll('.dbm-c')).map(c => c.dataset.probe || '(new)');
      return { before: before, after: after };
    });
    ok(kept.before.length > 0, 'P10 non-vacuity: no counters were tagged');
    ok(kept.after.length === kept.before.length &&
       kept.after.every((t, i) => t === kept.before[i]),
      'P10 ⚠⚠ a repaint REBUILT counters that had not moved (' +
      kept.after.filter(t => t === '(new)').length + ' new nodes) — a rebuilt node ' +
      'teleports instead of transitioning, and every motion in this tool depends on it');

    /* --- the viewport sweep, measured against the CARD ------------ */
    for (const w of WIDTHS) {
      await page.setViewport({ width: w, height: 900 });
      await new Promise(r => setTimeout(r, 180));
      const m = await page.evaluate(() => {
        const card = document.querySelector('.dbm-card');
        const C = card.getBoundingClientRect();
        let overflow = 0, tiny = 0, n = 0;
        document.querySelectorAll('.dbm-c').forEach(function (c) {
          const r = c.getBoundingClientRect();
          n++;
          if (r.right > C.right + 1 || r.left < C.left - 1) overflow++;
          if (r.width < 10) tiny++;
        });
        let small = 0, ctl = 0;
        document.querySelectorAll('.dbm-btn').forEach(function (b) {
          const r = b.getBoundingClientRect();
          if (r.width < 1) return;
          ctl++;
          if (r.height < 44 || r.width < 44) small++;
        });
        return { n: n, overflow: overflow, tiny: tiny, ctl: ctl, small: small,
          cardW: C.width, docW: document.documentElement.scrollWidth };
      });
      ok(m.n > 0, 'P6@' + w + ' non-vacuity: no counters measured');
      ok(m.ctl > 0, 'P6@' + w + ' non-vacuity: no controls measured');
      ok(m.overflow === 0, 'P6@' + w + ' ⚠ ' + m.overflow + ' counters overflow the CARD');
      ok(m.tiny === 0, 'P6@' + w + ' ⚠ ' + m.tiny + ' counters render under 10px');
      ok(m.small === 0, 'P6@' + w + ' ⚠ ' + m.small + ' controls are under the 44px tap floor');
      await page.screenshot({ path: path.join(OUT, 'dbm-' + w + '.png') });
    }

    /* --- the two mutations the model gate cannot see -------------- */
    /* ⭐ these live HERE, not in mutate-doubling-mirror.js, because
       they are properties of the RENDER: a stagger read from GEO and a
       counter that gets its second frame before its class is dropped.
       A model gate is structurally blind to both. */
    await page.setViewport({ width: 704, height: 900 });
    const stagger = await page.evaluate(() => {
      const src = (window.DoublingMirror && window.DoublingMirror.GEO) || null;
      return src ? src.T_DEAL_STEP : null;
    });
    ok(stagger === null || typeof stagger === 'number',
      'P7 the deal stagger is not a number');

    /* ⭐⭐ MEASURE THE CONSEQUENCE, NOT THE MECHANISM. The first version
       of this check read `style.transitionDelay` off each counter — the
       IMPLEMENTATION of the stagger — and measured nothing, because by
       the time it looked the deal had finished and the nodes had been
       re-synced. What actually matters to a child is whether the
       counters ARRIVE together or one at a time, so this samples the
       visible count every 50ms and asks how many distinct counts it
       passed through. Same-frame arrival is a GROUPING; staggered
       arrival is a COUNT, and the whole beat exists for the second. */
    const arrivals = await page.evaluate(async () => {
      const again = document.querySelector('.dbm-b-again');
      if (again) again.click();
      await new Promise(r => setTimeout(r, 300));
      const chip = document.querySelector('.dbm-chips .dbm-btn');
      if (chip) chip.click();
      await new Promise(r => setTimeout(r, 150));
      const close = document.querySelector('.dbm-b-close');
      if (!close) return { err: 'no close button' };
      close.click();
      const seen = [];
      for (let i = 0; i < 70; i++) {
        /* ⚠⚠ COUNT WHAT IS VISIBLE, NOT WHAT IS IN THE DOM. The
           deal appends all N nodes at once and staggers their
           TRANSITION, so a querySelectorAll count jumps 0 -> N in one
           frame and reported a correct tool as arriving all together.
           That is the node-count trap this probe was written to avoid,
           committed inside the probe itself. */
        seen.push(Array.prototype.filter.call(
          document.querySelectorAll('.dbm-far .dbm-c'),
          function (c) { return parseFloat(getComputedStyle(c).opacity) > 0.5; }).length);
        await new Promise(r => setTimeout(r, 50));
      }
      return { seen: seen, peak: Math.max.apply(null, seen),
               steps: Array.from(new Set(seen)).sort(function (a, b) { return a - b; }) };
    });
    ok(!arrivals.err, 'P7 ' + arrivals.err);
    ok(arrivals.peak >= 2,
      'P7 non-vacuity: the far leaf never held two counters, so there was no deal to measure (peak ' +
      arrivals.peak + ')');
    ok(arrivals.steps && arrivals.steps.length >= 3,
      'P7 ⚠⚠ the far leaf jumped straight to its full count — every counter arrived in the ' +
      'same frame, so the deal reads as a GROUPING and not a COUNT (counts seen: ' +
      JSON.stringify(arrivals.steps) + ')');

  } catch (e) {
    fails.push('THREW: ' + e.message);
  } finally {
    await browser.close();
    srv.close();
  }

  if (fails.length) {
    console.log('FAIL  ' + pass + ' checks, ' + fails.length + ' failures');
    fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f));
    process.exit(1);
  }
  console.log('PASS  ' + pass + ' render checks, 0 failures');
  console.log('  screenshots: ' + OUT);
})();
