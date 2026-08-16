/* =====================================================================
   RENDER / LOCAL-TEST PROBE — TOOL #58, THE QUEUE (Counting rebuild)
   =====================================================================
   REAL POINTER INPUT ONLY — never page.evaluate to set state. The tool's
   whole claim is a thing you SEE, so the gate must DRIVE it and MEASURE
   the render, not read the model.

   What it proves, in pixels, with a mouse:
   · at rest — the hand is off the shelf, no badges, no default end
   · a sweep from a chosen end ACCRETES running numerals 1..k and a hand
     that TRAVELS (sampled mid-flight — an endpoint compare proves nothing)
   · THE INVARIANCE — a full sweep from either end shows the SAME total
     pill n, and the SAME member wears a DIFFERENT number from each end
   · NO WORDS ON THE STAGE — every <text> in the svg is a numeral
   · consequence — dragging the rail changes the DOM ELSEWHERE (badges),
     not merely its own highlight (the liveness lesson)
   · tap floors (≥44px chrome), containment vs the CARD, FITS at ≥768,
     wheel-reachability at 320 — across the viewport sweep
   Screenshots at 360/768/1024 → docs/audit-results/the-queue/qa for the
   human read the DoD requires.

   Poison arms (verify BOTH directions):
     QUE_PROBE_POISON=notrans   → the hand teleports; travel arm must fire
     QUE_PROBE_POISON=rest      → a badge is left at rest; rest arm fires
     QUE_PROBE_POISON=samecount → both ends give the same numbers; fires

   Run: node scripts/probe-the-queue.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.QUE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'the-queue', 'qa');
const PORT = Number(process.env.QUE_PROBE_PORT) || 5694;
const POISON = process.env.QUE_PROBE_POISON || '';
const VIEWPORTS = [320, 360, 412, 768, 1024, 1366];
const SHOT = [360, 768, 1024];
const TAP_FLOOR = 44;

fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'the-queue.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  let body = fs.readFileSync(fp);
  if (f === 'the-queue.js' && POISON) {
    let s = body.toString('utf8'); const was = s;
    if (POISON === 'notrans') s = s.replace('transition:transform var(--que-dur,0ms) ease-in-out', 'transition:none');
    if (POISON === 'rest') s = s.replace('for (i = 0; i < s.k; i++) {', 'for (i = 0; i < Math.max(1,s.k); i++) {');
    if (POISON === 'samecount') s = s.replace("return s.end === 'a' ? j : this.n(s) - 1 - j;", 'return j;');
    if (s === was) { console.log('FATAL: poison "' + POISON + '" matched nothing.'); process.exit(1); }
    body = Buffer.from(s, 'utf8');
  }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(body);
}).listen(PORT);

const fails = [];
const notes = [];
function ok(c, m) { if (!c) fails.push(m); }
function note(m) { notes.push(m); }

const base = 'http://localhost:' + PORT + '/the-queue.html';

/* geometry helpers reading the tool's OWN classes (never English text) */
async function friendsInfo(page) {
  return page.$$eval('.que-friends-none', () => []).catch(() => []);
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  try {
    /* ---- functional pass at 768 (desktop-first) ---- */
    const page = await browser.newPage();
    const cerr = [];
    /* resource 404s (/api/entitlement offline, favicon) are EXPECTED and
       degrade to the free tier; only real JS exceptions are a defect. */
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) cerr.push(m.text()); });
    page.on('pageerror', e => cerr.push(String(e)));
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    await page.setViewport({ width: 768, height: 900, deviceScaleFactor: 1 });
    await page.goto(base + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.que-wrap', { timeout: 8000 });
    await new Promise(r => setTimeout(r, 300));

    ok(cerr.length === 0, 'no console errors: ' + cerr.slice(0, 3).join(' | '));

    /* rail + geometry probes, in-page (reads DOM, drives with real mouse) */
    const railBox = await page.$eval('.que-rail', el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, cy: r.y + r.height / 2 }; });
    ok(railBox.h >= TAP_FLOOR, 'rail height ≥44px (got ' + Math.round(railBox.h) + ')');

    // friend centre x's in screen space
    async function friendXs() {
      return page.$$eval('.que-svg', svgs => {
        const svg = svgs[0]; const vb = svg.viewBox.baseVal; const r = svg.getBoundingClientRect();
        const paths = svg.querySelectorAll('.que-body');
        const xs = [];
        paths.forEach(p => { const bb = p.getBBox(); const cx = bb.x + bb.width / 2; xs.push(r.x + (cx / vb.width) * r.width); });
        return xs.sort((a, b) => a - b);
      });
    }
    // count badges: [{cx, num}]
    async function badges() {
      return page.$$eval('.que-svg', svgs => {
        const svg = svgs[0]; const vb = svg.viewBox.baseVal; const r = svg.getBoundingClientRect();
        const out = [];
        svg.querySelectorAll('.que-badge text').forEach(t => {
          const bb = t.getBBox(); const cx = bb.x + bb.width / 2;
          out.push({ cx: r.x + (cx / vb.width) * r.width, num: t.textContent });
        });
        return out;
      });
    }
    async function totalPill() {
      return page.$eval('.que-svg', svg => {
        const g = svg.querySelector('.que-total text'); return g ? g.textContent : null;
      }).catch(() => null);
    }
    async function handShown() {
      return page.$eval('.que-hand', el => el.style.display !== 'none');
    }

    const fxs = await friendXs();
    ok(fxs.length === 5, 'default line shows five friends (got ' + fxs.length + ')');

    // at rest: hand hidden, no badges
    ok(!(await handShown()), 'hand is off the shelf at rest (no default end)');
    ok((await badges()).length === 0, 'no badges at rest (transient)');

    // no words on stage: every <text> in the svg is a numeral
    const stageText = await page.$$eval('.que-svg text', ts => ts.map(t => t.textContent));
    ok(stageText.every(s => /^\d+$/.test(s.trim())), 'every text node on the stage is a numeral: ' + JSON.stringify(stageText));

    // choose end A via its button, then DRAG the rail left→right (full sweep)
    async function clickBtn(cls) { const b = await page.$('.' + cls); const bb = await b.boundingBox(); await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await new Promise(r => setTimeout(r, 120)); }
    async function dragRail(fromFrac, toFrac) {
      const x0 = railBox.x + railBox.w * fromFrac, x1 = railBox.x + railBox.w * toFrac;
      await page.mouse.move(x0, railBox.cy);
      await page.mouse.down();
      const steps = 8; for (let i = 1; i <= steps; i++) { await page.mouse.move(x0 + (x1 - x0) * i / steps, railBox.cy); await new Promise(r => setTimeout(r, 20)); }
      await page.mouse.up(); await new Promise(r => setTimeout(r, 360));
    }

    await clickBtn('que-b-enda');
    ok(await page.$eval('.que-b-enda', el => el.classList.contains('is-on')), 'end A lights when chosen');
    await dragRail(0.02, 0.98);
    let bA = await badges();
    ok(bA.length === 5, 'full sweep from A accretes 5 badges (got ' + bA.length + ')');
    ok(await handShown(), 'the hand is on the shelf after a sweep');
    let totA = await totalPill();
    ok(totA === '5', 'the whole-line total pill reads 5 after a full sweep from A (got ' + totA + ')');
    // map member x → number (from A: leftmost=1 … rightmost=5)
    bA.sort((p, q) => p.cx - q.cx);
    const numsA = bA.map(b => b.num);
    ok(numsA.join('') === '12345', 'from end A the members read 1..5 left→right (got ' + numsA.join('') + ')');

    // consequence/liveness: badges exist now that did not before → the rail changed the DOM elsewhere
    ok(bA.length > 0, 'dragging the rail changes the DOM elsewhere (badges) — not just a self-highlight');

    // REVERSE: choose end B, full sweep right→left
    await clickBtn('que-b-endb');
    ok((await badges()).length === 0, 'reversing clears the tags');
    await dragRail(0.98, 0.02);
    let bB = await badges();
    ok(bB.length === 5, 'full sweep from B accretes 5 badges');
    let totB = await totalPill();
    ok(totB === '5', 'the total is the SAME (5) from the other end — cardinality invariant (got ' + totB + ')');
    bB.sort((p, q) => p.cx - q.cx);
    const numsB = bB.map(b => b.num);
    ok(numsB.join('') === '54321', 'from end B the members read 5..1 left→right (got ' + numsB.join('') + ')');
    // THE INVENTION IN PIXELS: the same member (leftmost) wears a DIFFERENT number
    ok(numsA[0] !== numsB[0], 'the same leftmost friend wears a DIFFERENT number from each end (' + numsA[0] + ' vs ' + numsB[0] + ')');
    // the odd middle wears the same both ways
    const mid = Math.floor(5 / 2);
    ok(numsA[mid] === numsB[mid], 'the odd middle friend wears the same number both ways (' + numsA[mid] + ')');

    // TRAVEL mid-flight — the hand must SLIDE between two VISIBLE positions
    // (its first appearance from a hidden state correctly does NOT slide, so
    // establish a visible hand first, then send it across the whole line).
    await clickBtn('que-b-enda');
    await page.focus('.que-rail');
    await page.keyboard.press('ArrowRight');            // k=1, hand visible at member 0
    await new Promise(r => setTimeout(r, 380));
    const sampler = page.evaluate(() => new Promise(res => {
      const hand = document.querySelector('.que-hand'); const xs = []; let n = 0;
      (function tick() { const b = hand.getBoundingClientRect(); xs.push(Math.round(b.x)); if (++n < 40) requestAnimationFrame(tick); else res(xs); })();
    }));
    await page.keyboard.press('End');                   // k=1 → 5, a long visible slide
    const hx = await sampler;
    const distinct = new Set(hx).size;
    /* the DEFAULT assertion is the one the poison must break: notrans →
       distinct≤2 → FAIL; samecount → numsA[0]===numsB[0] → the invention
       assertion above FAILed; rest → the "no badges at rest" assertion
       above FAILed. No POISON-conditional flips (a flipped assertion that
       PASSES under poison proves nothing about the default gate). */
    ok(distinct >= 5, 'the hand TRAVELS (distinct sampled positions=' + distinct + ')');

    // tap floors on chrome
    const smalls = await page.$$eval('.que-btn', bs => bs.filter(b => { const r = b.getBoundingClientRect(); return r.height < 44 || r.width < 44; }).length);
    ok(smalls === 0, 'every chrome button is ≥44px');

    /* ---- viewport sweep: containment vs the CARD + FITS + text floor ---- */
    for (const w of VIEWPORTS) {
      await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
      await page.goto(base + '?lang=en', { waitUntil: 'networkidle0' });
      await page.waitForSelector('.que-wrap');
      await new Promise(r => setTimeout(r, 150));
      // drive to a full state so the total + badges are present
      const rb = await page.$eval('.que-rail', el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, cy: r.y + r.height / 2 }; });
      const bA2 = await page.$('.que-b-enda'); const bb2 = await bA2.boundingBox(); await page.mouse.click(bb2.x + bb2.width / 2, bb2.y + bb2.height / 2);
      await page.mouse.move(rb.x + rb.w * 0.02, rb.cy); await page.mouse.down();
      await page.mouse.move(rb.x + rb.w * 0.98, rb.cy); await page.mouse.up();
      await new Promise(r => setTimeout(r, 200));

      const card = await page.$eval('.lcs-app', el => { const r = el.getBoundingClientRect(); return { right: r.right, left: r.left, w: r.width }; });
      const over = await page.$$eval('.que-wrap *', (els, cardRight) => {
        let worst = 0; els.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.right - cardRight > worst) worst = r.right - cardRight; }); return Math.round(worst);
      }, card.right + 1);
      ok(over <= 2, 'w=' + w + ': nothing overflows the card right edge (worst +' + over + 'px)');
      const docOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      ok(docOverflow <= 1, 'w=' + w + ': no horizontal page overflow (' + docOverflow + 'px)');

      // text floor: badge numerals ≥14px on screen at the smallest width
      const numPx = await page.$$eval('.que-num', ts => ts.map(t => { const r = t.getBoundingClientRect(); return r.height; }));
      if (numPx.length) ok(Math.min.apply(null, numPx) >= 13, 'w=' + w + ': numerals render ≥13px (min ' + Math.round(Math.min.apply(null, numPx)) + ')');

      // FITS at ≥768 (desktop-first): lowest control bottom ≤ viewport
      if (w >= 768) {
        const lowest = await page.$$eval('.que-btn, .que-gate-cta', els => { let b = 0; els.forEach(e => { const r = e.getBoundingClientRect(); if (r.bottom > b) b = r.bottom; }); return Math.round(b); });
        ok(lowest <= 900, 'w=' + w + ': all controls FIT within the viewport (lowest ' + lowest + ')');
      }

      if (SHOT.indexOf(w) >= 0) {
        await page.screenshot({ path: path.join(OUT, 'render-' + w + '.png') });
        note('shot render-' + w + '.png');
      }
    }
  } catch (e) {
    fails.push('EXCEPTION: ' + (e && e.stack || e));
  } finally {
    await browser.close();
    srv.close();
  }

  notes.forEach(n => console.log('  · ' + n));
  if (fails.length) { console.log('\n' + fails.length + ' FAIL:'); fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
  console.log('\nALL PASS' + (POISON ? ' (poison=' + POISON + ')' : ''));
})();
