/* =====================================================================
   local-test-lids.js — the browser definition-of-done for TOOL #39
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-lids.js [--shot]
   Screenshots land in docs/audit-results/lids/qa/

   verify-lids.js proves the MODEL. This proves the thing on screen IS
   that model, at every width the operator might look at, in every
   configuration — not just the default one.

     L1 ⭐ THE VALUE LOCK, ON SCREEN   the counters that disappear equal
                                      k x share, for every lid count
     L2 ⭐ THE RE-SETTLE IS REAL       drop a third lid and the earlier
                                      lids GIVE COUNTERS BACK, in the DOM
     L3 ⭐ COVERED MEANS ABSENT        the hidden counters are not in the
                                      tree at all — not faded, not
                                      aria-hidden. House doctrine.
     L4 ⭐ THE LIDS ARE DRAGGED        a real pointer drag moves a lid and
                                      the table re-settles under it
     L5 ⭐ THE REMAINDER IS HONEST     what will not share stays visible
     L6 ⭐ THE PRIOR COMMITS           the marker freezes at the lift, in
                                      the DOM, and nothing marks it
     L7    LABELS ARE TRUE             in the DOM, not just in the source
     L8 ⭐ THE SWEEP                   6 widths x every lid count x both
                                      states: two tap floors named
                                      SEPARATELY, containment against THE
                                      CARD, legibility, FITS, no errors
     L9 ⭐ POISON THE SWEEP            the scoring code is shown to FAIL
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PORT = 5520;
const SHOT = process.argv.indexOf('--shot') > -1;
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'lids', 'qa');

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const f = path.join(MINI, path.basename(url));
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
vm.runInContext(fs.readFileSync(path.join(MINI, 'lids.js'), 'utf8') + '\n;this.__T = Lids;', sandbox);
const T = sandbox.__T;

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
  await page.goto(`http://127.0.0.1:${PORT}/lids.html?lang=${lang || 'en'}&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.lid-wrap', { timeout: 9000 });
  await page.waitForSelector('.lid-table', { timeout: 9000 });
  await wait(300);
};

const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
/* ⚠ A LIST OF ACCEPTABLE LABELS, NOT ONE. The placing chip legitimately
   branches — on an EMPTY table it reads "Put a lid down", because
   "Another lid" is a lie there (another than what?). Driving by a single
   literal made the harness report "the control was not on the page" for a
   control that was on the page, correctly renamed. */
const footIdx = (page, label) => page.evaluate((ls) =>
  Array.from(document.querySelectorAll('.lid-foot .lid-chip'))
    .findIndex((b) => ls.indexOf(b.textContent) >= 0), [].concat(label));
/* the placing chip, under either of its two true names */
const ADD = ['Put a lid down', 'Another lid'];
/* ⚠ ADDRESS A NUMERAL BY ITS VALUE, NEVER BY ITS INDEX. The strip used
   to run 0..12, so index and value coincided by accident. It now runs
   1..stripTop(n) — state-sized, because a fixed top could not hold the
   share at total 30 and offered nine numerals that could never be the
   answer at total 8 — and every index-addressed assertion in this file
   silently shifted by one. Driving by the numeral is also what a teacher
   does: they press a number, not a position. */
const clickMark = (page, v) => page.evaluate((n) => {
  const b = Array.from(document.querySelectorAll('.lid-mark')).find((x) => x.textContent === String(n));
  if (!b || b.getAttribute('aria-disabled') === 'true') return false;
  b.click(); return true;
}, v);
const markWith = (page, cls) => page.evaluate((c) => {
  const b = document.querySelector('.lid-mark.' + c);
  return b ? parseInt(b.textContent, 10) : -1;
}, cls);
/* the strip refuses out loud now, so 'inert' is aria-disabled, not disabled */
const stripInert = (page) => page.evaluate(() => {
  const m = Array.from(document.querySelectorAll('.lid-mark'));
  return m.length > 0 && m.every((b) => b.getAttribute('aria-disabled') === 'true');
});
const stripLive = (page) => page.evaluate(() => {
  const m = Array.from(document.querySelectorAll('.lid-mark'));
  return m.length > 0 && m.every((b) => b.getAttribute('aria-disabled') !== 'true');
});
/* ⚠ A CLICK THAT DID NOT HAPPEN MUST BE LOUD. The first draft returned
   false quietly, so when a disabled "Lift the lids" swallowed the click,
   the NEXT assertion — that the toggle is not swapped — passed for the
   boring reason that nothing had been lifted. A silent no-op in a
   harness does not fail a test, it hollows one out. */
const clickFoot = async (page, label, mayFail) => {
  const i = await footIdx(page, label);
  let ok = false;
  if (i >= 0) {
    ok = await page.evaluate((n) => {
      const b = document.querySelectorAll('.lid-foot .lid-chip')[n];
      /* ⚠ aria-disabled COUNTS AS REFUSED. No control on this card goes
         grey in silence any more — a control that cannot act stays
         focusable and clickable and says why — so `disabled` alone no
         longer tells the harness whether the press did anything. */
      if (!b || b.disabled || b.getAttribute('aria-disabled') === 'true') return false;
      b.click(); return true;
    }, i);
  }
  await wait(90);
  if (!ok && !mayFail) is(false, 'harness: the control "' + label + '" was ' + (i < 0 ? 'not on the page' : 'disabled') + ' when the test needed it');
  return ok;
};
/* how many counters are on the table RIGHT NOW, read off the tree */
const onTable = (page) => count(page, '.lid-counter');
const lidCount = (page) => count(page, '.lid-lid');
/* start from a known table: no lids, a chosen total */
/* ⚠ THE TOTAL IS A STEPPER NOW, NOT SIX CHIPS. One card used to carry a
   SETUP scale (8-12-16-20-24-30) and an ANSWER scale (0-12) four hundred
   pixels apart with nothing distinguishing them; and six chips could not
   express a model that accepts every integer from 4 to 30. */
const setTotal = async (page, n) => {
  for (let guard = 0; guard < 40; guard++) {
    const at = await page.evaluate(() => {
      const v = document.querySelector('.lid-tval');
      return v ? parseInt(v.textContent, 10) : null;
    });
    if (at === null || at === n) break;
    const dir = at < n ? '+' : '-';
    const moved = await page.evaluate((d) => {
      const b = document.querySelector('.lid-total [data-fk="total' + d + '"]');
      if (!b || b.getAttribute('aria-disabled') === 'true') return false;
      b.click(); return true;
    }, dir);
    if (!moved) break;
    await wait(45);
  }
  await wait(90);
};
/* ⚠ PLACING FROM AN EMPTY TABLE LAYS TWO. One lid took floor(n/1) = n and
   swallowed every counter, which was one click from the opening frame, so
   the reachable set is {0,2,3,4}. The harness has to walk it the same way
   a teacher does. */
const addLids = async (page, k) => {
  if (k < 2) throw new Error('addLids: the tool has no one-lid state; the reachable set is {0,2,3,4}');
  await clickFoot(page, ADD);                 /* 0 -> 2 */
  for (let i = 2; i < k; i++) await clickFoot(page, ADD);
};

/* ===================================================================== */
(async () => {
  const server = serve().listen(PORT);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  try {
    /* ---- L1 ⭐ the value lock, on screen ---------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      /* the tool opens on the first free table, so clear it to a total we choose */
      for (let i = 0; i < 4; i++) await clickFoot(page, 'Take one away', true);
      await setTotal(page, 20);
      const total = 20;
      is((await onTable(page)) === total, 'L1 an empty table shows all ' + total + ' counters');
      let ok = true, detail = [];
      /* ⚠ THE WALK STARTS AT TWO. Placing from an empty table lays a
         PAIR — one lid took floor(n/1) = n and swallowed every counter,
         which was one click from the opening frame — so the reachable
         set is {0,2,3,4} and the harness walks it the way a teacher
         does. The value lock is checked at every reachable count. */
      for (let k = T.MIN_LIDS; k <= T.MAX_LIDS; k++) {
        await clickFoot(page, ADD);
        const vis = await onTable(page);
        const lids = await lidCount(page);
        const share = Math.floor(total / k);
        detail.push(k + ':' + vis);
        if (lids !== k || total - vis !== k * share) ok = false;
      }
      /* and one lid is not reachable at all, which is the point */
      is((await lidCount(page)) === T.MAX_LIDS, 'L1 the walk ends at the four-lid ceiling');
      is(ok, 'L1 ⭐ THE VALUE LOCK ON SCREEN: hidden === lids x share at every lid count (visible ' + detail.join(' ') + ')');
      await page.close();
    }

    /* ---- L2 ⭐ the re-settle is real -------------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      for (let i = 0; i < 4; i++) await clickFoot(page, 'Take one away', true);
      await setTotal(page, 12);
      await addLids(page, 2);
      const visTwo = await onTable(page);      /* 12 - 2*6 = 0 */
      await clickFoot(page, ADD);
      const visThree = await onTable(page);    /* 12 - 3*4 = 0 */
      await clickFoot(page, ADD);
      const visFour = await onTable(page);     /* 12 - 4*3 = 0 */
      is(visTwo === 0 && visThree === 0 && visFour === 0,
        'L2 12 counters share exactly 2, 3 and 4 ways (' + visTwo + '/' + visThree + '/' + visFour + ' left over)');

      /* the giving-back, shown where it is VISIBLE: 20 counters */
      for (let i = 0; i < 4; i++) await clickFoot(page, 'Take one away', true);
      await setTotal(page, 20);
      await addLids(page, 2);
      const a = await onTable(page);            /* 20 - 2*10 = 0 */
      await clickFoot(page, ADD);
      const b = await onTable(page);            /* 20 - 3*6  = 2 */
      is(a === 0 && b === 2,
        'L2 ⭐ THE RE-SETTLE: a third lid makes the first two give back — 0 on the table becomes ' + b);
      await page.close();
    }

    /* ---- L3 ⭐ covered means absent --------------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      for (let i = 0; i < 4; i++) await clickFoot(page, 'Take one away', true);
      await setTotal(page, 16);
      await addLids(page, 2);
      const m = await page.evaluate(() => {
        const cs = Array.from(document.querySelectorAll('.lid-counter'));
        return {
          n: cs.length,
          faded: cs.filter((c) => {
            const s = getComputedStyle(c);
            return parseFloat(s.opacity) < 0.99 || s.visibility === 'hidden' || s.display === 'none';
          }).length,
          hiddenAttr: cs.filter((c) => c.hasAttribute('aria-hidden')).length,
          /* nothing anywhere in the tree may carry the share as text */
          leak: document.querySelector('.lid-table').textContent.trim()
        };
      });
      is(m.n === 0, 'L3 ⭐ COVERED MEANS ABSENT: 16 under 2 lids leaves ' + m.n + ' counters in the whole tree');
      /* ⚠ THE aria-hidden CLAUSE IS GONE, AND DELIBERATELY. It was written
         to enforce house doctrine — a covered counter LEAVES THE DOM, it
         is not hidden with CSS or with an attribute — and the count above
         proves exactly that: zero counters in the whole tree. But every
         VISIBLE counter is now aria-hidden on purpose, because thirty
         nodes each announcing "a counter" is noise that never told a
         screen-reader user how many were on the table; the count moved
         onto the table's own group label. Keeping the old clause would
         have condemned the accessibility fix. What survives is the half
         that is still a law: nothing is merely FADED. */
      is(m.faded === 0, 'L3 no counter is merely faded out — a covered counter leaves the DOM entirely');
      is(m.leak === '', 'L3 the table carries no text at all (the no-words law)');
      /* and the reveal is genuinely absent before the lift */
      is((await count(page, '.lid-reveal')) === 0, 'L3 no reveal block exists before the lids are lifted');
      await clickFoot(page, 'Lift the lids');
      /* ⚠ WAIT OUT THE LIFT BEFORE MEASURING OR SHOOTING. The reveal is a
         380ms animation with the counters arriving at 160ms; a screenshot
         taken inside that window shows a half-faded lid over half-faded
         counters and reads as a defect that is not there. */
      await wait(560);
      const truth = await markWith(page, 'lid-truth');
      is(truth === 8, 'L3 after the lift the truth is marked on the strip at numeral ' + truth + ' (16 shared 2 ways)');
      is((await onTable(page)) === 16, 'L3 every counter comes back when the lids come up');
      await page.close();
    }

    /* ---- L4 ⭐ the lids are dragged --------------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      for (let i = 0; i < 4; i++) await clickFoot(page, 'Take one away', true);
      /* ⚠ 20 UNDER 3 LIDS, NOT 12 UNDER 1. With a single lid the share IS
         the total, so the table is empty however far the lid is dragged —
         there is nothing to observe, and an assertion over a blank table
         proves nothing. A leftover of 2 makes the re-settle VISIBLE: the
         count must not change (the lock is independent of position) while
         WHICH counters are left over must. */
      await setTotal(page, 20);
      await addLids(page, 3);
      const visBefore = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.lid-counter')).map((c) => c.style.left + ',' + c.style.top).sort().join('|'));
      const before = await page.evaluate(() => {
        const l = document.querySelector('.lid-lid').getBoundingClientRect();
        return { x: Math.round(l.left), y: Math.round(l.top) };
      });
      /* A REAL pointer drag, not a synthetic state poke — and ACROSS THE
         TABLE, not a nudge. ⚠ The first draft moved the lid 120px toward
         its neighbours; the lock held and the lid moved, but the two
         left-over counters stayed the same two, because the outliers were
         still the outliers. That is CORRECT behaviour and a WEAK test:
         to see a re-settle you have to move the lid somewhere that
         changes who is nearest. */
      const box = await page.evaluate(() => {
        const l = document.querySelector('.lid-lid').getBoundingClientRect();
        const t = document.querySelector('.lid-table').getBoundingClientRect();
        return {
          cx: l.left + l.width / 2, cy: l.top + l.height / 2,
          tx: t.left + t.width * 0.12, ty: t.top + t.height * 0.18
        };
      });
      await page.mouse.move(box.cx, box.cy);
      await page.mouse.down();
      await page.mouse.move(box.tx, box.ty, { steps: 18 });
      await page.mouse.up();
      await wait(200);
      const after = await page.evaluate(() => {
        const l = document.querySelector('.lid-lid').getBoundingClientRect();
        return { x: Math.round(l.left), y: Math.round(l.top) };
      });
      const moved = Math.abs(after.x - before.x) + Math.abs(after.y - before.y);
      is(moved > 40, 'L4 ⭐ A REAL POINTER DRAG MOVES A LID — ' + moved + 'px, no other cover on this platform does this');
      const visAfter = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.lid-counter')).map((c) => c.style.left + ',' + c.style.top).sort().join('|'));
      is((await lidCount(page)) === 3 && (await onTable(page)) === 2,
        'L4 the lock survives the drag: still 3 lids, still 2 left over wherever the lid lands');
      is(visBefore !== visAfter,
        'L4 ⭐ THE TABLE RE-SETTLES UNDER THE MOVED LID — the two left over are DIFFERENT counters now');

      /* the keyboard fallback the liveness gate needs */
      await page.evaluate(() => document.querySelector('.lid-lid').focus());
      const kb0 = await page.evaluate(() => Math.round(document.querySelector('.lid-lid').getBoundingClientRect().left));
      for (let i = 0; i < 4; i++) { await page.keyboard.press('ArrowRight'); await wait(60); }
      const kb1 = await page.evaluate(() => Math.round(document.querySelector('.lid-lid').getBoundingClientRect().left));
      is(kb1 !== kb0, 'L4 the keyboard fallback nudges a lid too (' + kb0 + ' -> ' + kb1 + 'px)');
      await page.close();
    }

    /* ---- L5 ⭐ the remainder is honest ------------------------------ */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      for (let i = 0; i < 4; i++) await clickFoot(page, 'Take one away', true);
      await setTotal(page, 20);
      await addLids(page, 3);
      const vis = await onTable(page);
      is(vis === 2, 'L5 ⭐ THE REMAINDER IS HONEST: 20 under 3 lids leaves ' + vis + ' counters in plain sight');
      const hint = await page.evaluate(() => document.querySelector('.lid-hint').textContent.trim());
      await clickFoot(page, 'Lift the lids');
      /* ⚠ WAIT OUT THE LIFT BEFORE MEASURING OR SHOOTING. The reveal is a
         380ms animation with the counters arriving at 160ms; a screenshot
         taken inside that window shows a half-faded lid over half-faded
         counters and reads as a defect that is not there. */
      await wait(560);
      const after = await page.evaluate(() => document.querySelector('.lid-hint').textContent.trim());
      is(after.indexOf('Some counters are left over. They do not fit under a lid.') === 0,
        'L5 the leftover gets its own sentence, only once it can be seen ("' + after + '")');
      /* ⚠ AND THE EXACT SHARE MUST SPEAK. This assertion used to require
         the hint to be EMPTY when nothing was left over, which pinned the
         defect rather than a law: measured across the fifteen
         configurations two-or-more lids can reach, NINE render blank, so
         the clean share was the majority of the tool and the tool said
         nothing about it. Silence is itself an editorial — it marks the
         exact share as the case with nothing to say and the remainder as
         the case where something went wrong, which is the inverse of this
         tool's own third invention. */
      for (let i = 0; i < 5; i++) await clickFoot(page, 'Lids back on', true);
      await page.close();
      const p2 = await newPage(browser, { premium: true });
      await open(p2, 'en', 1024, 900);
      for (let i = 0; i < 4; i++) await clickFoot(p2, 'Take one away', true);
      await setTotal(p2, 12);
      await addLids(p2, 3);
      await clickFoot(p2, 'Lift the lids');
      const clean = await p2.evaluate(() => document.querySelector('.lid-hint').textContent.trim());
      is(clean.indexOf('Every counter is under a lid. None are left over.') === 0,
        'L5 a total that shares exactly SAYS SO after the lift ("' + clean + '")');
      is(clean.indexOf('left over. They do not fit') === -1,
        'L5 — and it does not borrow the remainder\'s sentence');
      await p2.close();
    }

    /* ---- L6 ⭐ the prior commits ------------------------------------ */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      for (let i = 0; i < 4; i++) await clickFoot(page, 'Take one away', true);
      await setTotal(page, 12);
      await addLids(page, 3);
      await clickMark(page, 5);
      await wait(90);
      const marked = await markWith(page, 'lid-on');
      is(marked === 5, 'L6 the class parks a marker on 5 (a wrong guess — the tool must not care)');

      await clickFoot(page, 'Lift the lids');
      /* ⚠ WAIT OUT THE LIFT BEFORE MEASURING OR SHOOTING. The reveal is a
         380ms animation with the counters arriving at 160ms; a screenshot
         taken inside that window shows a half-faded lid over half-faded
         counters and reads as a defect that is not there. */
      await wait(560);
      const after = await page.evaluate(() => ({
        marked: (function () { const b = document.querySelector('.lid-mark.lid-on'); return b ? parseInt(b.textContent, 10) : -1; }()),
        allDisabled: Array.from(document.querySelectorAll('.lid-mark')).every((b) => b.getAttribute('aria-disabled') === 'true'),
        truth: (function () { const b = document.querySelector('.lid-mark.lid-truth'); return b ? parseInt(b.textContent, 10) : -1; }()),
        both: document.querySelectorAll('.lid-mark.lid-on.lid-truth').length,
        truthCount: document.querySelectorAll('.lid-mark.lid-truth').length,
        verdictClass: document.querySelectorAll('[class*="correct"],[class*="wrong"],[class*="right"]').length,
        stripText: Array.from(document.querySelectorAll('.lid-strip')).map((s) => s.textContent).join('')
      }));
      is(after.marked === 5, 'L6 ⭐ THE PRIOR SURVIVES THE LIFT, unmoved, at 5');
      is(after.allDisabled, 'L6 every marker refuses to move once the lids are up');
      is(after.truth === 4, '\u2b50 L6 THE TRUTH LANDS ON THE STRIP at numeral ' + after.truth + ', on the same scale as the marker on 9');
      is(after.truthCount === 1, 'L6 exactly one numeral carries the truth (saw ' + after.truthCount + ')');
      is(after.both === 0, 'L6 the marker and the truth are on DIFFERENT numerals here, each with its own treatment');
      is(after.verdictClass === 0, 'L6 ⭐ the guess of 5 against a share of 4 is NEVER MARKED');
      is(!/correct|wrong|✓|✗|✔|✘/i.test(after.stripText), 'L6 no tick, cross or verdict anywhere in the strip');
      if (SHOT) await page.screenshot({ path: path.join(SHOT_DIR, 'prior-vs-truth-1024.png') });
      await page.close();
    }

    /* ---- L7 · labels are true, in the DOM --------------------------- */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      /* ⚠ THE TOOL OPENS WITH NO LIDS ON THE TABLE — deliberately: the
         hint reads "Put down two lids." So a test that goes straight to
         the lift finds the control DISABLED, and everything after it
         passes for the boring reason. Put lids down first. */
      const k0 = await lidCount(page);
      is(k0 === 0, 'L7 the tool opens with an untouched table and no lids on it');
      /* ⚠ THE FIRST PRESS LAYS A PAIR. One lid took floor(n/1) = n and
         swallowed every counter — an empty table and one enormous disc,
         one click from the opening frame — so the reachable set is
         {0,2,3,4} and the placing control is honest about it: on an empty
         table it reads "Put a lid down" and it puts down two, because two
         is what the routine is. */
      await clickFoot(page, ADD);
      const kPair = await lidCount(page);
      is(kPair === 2, 'L7 the first press lays a PAIR, never a single lid (' + k0 + ' -> ' + kPair + ')');
      await clickFoot(page, ADD);
      const k1 = await lidCount(page);
      is(k1 === 3, 'L7 "Another lid" then adds one at a time (' + kPair + ' -> ' + k1 + ')');
      await clickFoot(page, 'Take one away');
      is((await lidCount(page)) === k1 - 1, 'L7 "Take one away" removes one');
      await clickFoot(page, ADD);

      await clickFoot(page, 'Lift the lids');
      /* ⚠ WAIT OUT THE LIFT BEFORE MEASURING OR SHOOTING. The reveal is a
         380ms animation with the counters arriving at 160ms; a screenshot
         taken inside that window shows a half-faded lid over half-faded
         counters and reads as a defect that is not there. */
      await wait(560);
      is(await footIdx(page, 'Lids back on') >= 0, 'L7 the button relabels itself "Lids back on" once they are up');
      await clickFoot(page, 'Lids back on');
      is(await footIdx(page, 'Lift the lids') >= 0 && (await count(page, '.lid-reveal')) === 0,
        'L7 ⭐ THE TOGGLE IS NOT SWAPPED: "Lids back on" puts them back and the reveal goes away');

      const sig = () => page.evaluate(() => document.querySelectorAll('.lid-counter').length + ':' + document.querySelectorAll('.lid-lid').length);
      const s0 = await sig();
      await clickFoot(page, 'Another table');
      const s1 = await sig();
      is(s0 !== s1, 'L7 "Another table" lands on a table that renders differently (' + s0 + ' -> ' + s1 + ')');
      await page.close();
    }

    /* ---- L7b · the free tier is a real try, and the gate is honest --- */
    {
      const page = await newPage(browser, { premium: false });
      await open(page, 'en', 1024, 900);
      /* ⚠ THE TOTALS BAR IS GONE. Six chips could not express a model that
         accepts every integer from 4 to 30 — a teacher could not set 13 by
         hand although the book hands them 13 — and a SETUP scale of six
         numerals sitting four hundred pixels above the ANSWER scale was
         what made a teacher unable to tell which row the class should
         point at. It is a stepper now, so the free tier is measured by
         where the stepper STOPS. */
      await setTotal(page, 20);
      const atFreeCeiling = await page.evaluate(() => {
        const v = document.querySelector('.lid-tval');
        const plus = document.querySelector('.lid-total [data-fk="total+"]');
        return { at: v ? parseInt(v.textContent, 10) : null, locked: !!(plus && plus.classList.contains('lid-locked')) };
      });
      is(atFreeCeiling.at === 20, 'L7b a free class reaches 20 counters — a real try, not a demo (' + atFreeCeiling.at + ')');
      is(atFreeCeiling.locked, 'L7b and the step past it is visibly locked rather than silently clamped');
      await page.evaluate(() => {
        const b = document.querySelector('.lid-total [data-fk="total+"]');
        if (b) b.click();
      });
      await wait(150);
      const gate = await page.evaluate(() => {
        const g = document.querySelector('.lid-gate');
        if (!g) return null;
        return { nodes: g.children.length, a: g.querySelector('a') ? g.querySelector('a').getAttribute('href') : null, txt: g.textContent };
      });
      is(gate && gate.nodes === 2, 'L7b the gate is TWO nodes, never a concatenation');
      is(gate && /\/en\/pricing\?from=tool-lids/.test(gate.a), 'L7b the gate link points at pricing (' + (gate && gate.a) + ')');
      is(gate && !/splat/i.test(gate.txt), 'L7b the brand word appears nowhere in the gate');
      /* the free tier still plays: two lids, a marker and a lift */
      for (let i = 0; i < 4; i++) await clickFoot(page, 'Take one away', true);
      await setTotal(page, 20);
      await addLids(page, 2);
      await clickMark(page, 9);
      await clickFoot(page, 'Lift the lids');
      /* ⚠ WAIT OUT THE LIFT BEFORE MEASURING OR SHOOTING. The reveal is a
         380ms animation with the counters arriving at 160ms; a screenshot
         taken inside that window shows a half-faded lid over half-faded
         counters and reads as a defect that is not there. */
      await wait(560);
      const freeTruth = await markWith(page, 'lid-truth');
      is(freeTruth === 10, 'L7b a signed-out class runs the whole routine and sees the truth land on 10');
      await page.close();
    }


    /* ---- L10 ⭐ THE STRIP HAS A FUNCTION -------------------------
       The operator's report on the shipped tool was "the numbers under
       the board has no function", and they were right: the marker
       highlighted itself and changed nothing else in the entire file.
       This is the assertion that report earned. */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);

      /* a. INERT UNTIL THERE IS A QUESTION — the exact state in the
         operator's screenshot: no lids, whole strip live and willing. */
      const off0 = await stripInert(page);
      is(off0, '\u2b50 L10 with no lids down the whole strip is inert \u2014 there is no question yet');
      /* \u26a0 AND IT REFUSES OUT LOUD RATHER THAN GOING GREY IN SILENCE. Three
         controls used to die without a word \u2014 the totals, the strip, and
         the placing chip at four lids \u2014 and each read as breakage. A
         `disabled` button also fires no click, is unfocusable and is
         skipped by screen readers, so the refusal strings behind it would
         have been dead in all eleven locales. */
      const spoke = await page.evaluate(() => {
        const b = document.querySelector('.lid-mark');
        if (!b) return null;
        b.click();
        return document.querySelector('.lid-hint').textContent.trim();
      });
      await wait(150);
      is(spoke && spoke.indexOf('Drag a lid onto the table') === 0,
        '\u2b50 L10 a numeral pressed with no lids down SAYS WHY (\"' + spoke + '\")');
      /* \u26a0 THE ONE-LID RUNG IS GONE FROM THIS BLOCK BECAUSE IT IS GONE FROM
         THE TOOL: one lid took the whole total and swallowed every
         counter, so placing lays a PAIR and the strip comes alive at once. */
      await clickFoot(page, ADD);
      const on2 = await stripLive(page);
      is(on2, 'L10 the pair brings the strip to life');

      /* b. THE HINT NOW SAYS WHAT THE STRIP IS FOR (hintMark was a dead
         string authored in eleven locales and never referenced) */
      const hint = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.lid-hint .lid-hline')).map((e) => e.textContent));
      is(hint.length === 2, 'L10 the hint is two lines here (saw ' + hint.length + ')');
      /* \u26a0 THE WORDING CHANGED, AND FIVE NATIVE PANELS ARE WHY. "Park the
         marker on the number you think it is" named a MARKER \u2014 a noun the
         apparatus never shows \u2014 so a teacher hunting for one saw a row of
         numerals. It is now a locative imperative with no device verb,
         because a projector has no mouse. */
      is(hint[1] === 'Choose a number below.',
        '\u2b50 L10 the strip is finally told what it is for: "' + hint[1] + '"');

      /* c. A LID CHANGE VOIDS THE COMMITMENT */
      await clickMark(page, 6);
      await wait(120);
      const parked = await markWith(page, 'lid-on');
      is(parked === 6, 'L10 the marker parks on 6');
      await clickFoot(page, ADD);
      const voided = await markWith(page, 'lid-on');
      is(voided === -1, '\u2b50 L10 a third lid VOIDS the commitment \u2014 it was an answer to a different question');

      /* d. FOCUS SURVIVES THE RE-RENDER.
         ⚠ Park on 9, NOT on 4. The table here is 12 under 3 lids, so the
         share IS 4 — the first draft of this block parked the marker on
         the truth and then asserted the two treatments differ, which
         compared one element with itself and failed for a reason that
         had nothing to do with the tool. */
      await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.lid-mark')).find((x) => x.textContent === '9'); if (b) b.focus(); });
      await clickMark(page, 9);
      await wait(160);
      const focused = await page.evaluate(() => {
        const a = document.activeElement;
        return a && a.classList.contains('lid-mark') ? a.textContent : (a ? a.tagName : 'none');
      });
      is(focused === '9', 'L10 focus stays on the numeral that was pressed (landed on "' + focused + '")');

      /* e. THE TWO TREATMENTS ARE VISUALLY DISTINCT, AND IN THE SAME HUE */
      await clickFoot(page, 'Lift the lids');
      /* ⚠ WAIT OUT THE LIFT BEFORE MEASURING OR SHOOTING. The reveal is a
         380ms animation with the counters arriving at 160ms; a screenshot
         taken inside that window shows a half-faded lid over half-faded
         counters and reads as a defect that is not there. */
      await wait(560);
      const look = await page.evaluate(() => {
        const marks = Array.from(document.querySelectorAll('.lid-mark'));
        const mark = marks.find((b) => b.classList.contains('lid-on'));
        const tru = marks.find((b) => b.classList.contains('lid-truth'));
        const read = (e) => { const c = getComputedStyle(e); return { bg: c.backgroundColor, shadow: c.boxShadow, op: c.opacity }; };
        return { mark: mark ? read(mark) : null, truth: tru ? read(tru) : null,
                 markN: mark ? mark.textContent : null, truthN: tru ? tru.textContent : null };
      });
      is(look.mark && look.truth, 'L10 both the marker (' + look.markN + ') and the truth (' + look.truthN + ') are on the strip together');
      is(look.mark && look.mark.bg !== 'rgba(0, 0, 0, 0)', 'L10 the marker is a FILL');
      is(look.truth && look.truth.shadow !== 'none', 'L10 the truth is a RING');
      is(look.markN === '9' && look.truthN === '4',
        'L10 the class said ' + look.markN + ', the lids held ' + look.truthN + ' — two different numerals, one scale');
      is(look.truth && look.truth.bg !== look.mark.bg, 'L10 the two treatments are not the same thing');
      is(look.truth && look.truth.op === '1' && look.mark.op === '1',
        'L10 neither fades out when the strip is disabled after the lift');

      /* the normal case is the one worth looking at: the class said one
         thing and the lids held another, both on one strip */
      if (SHOT) await page.screenshot({ path: path.join(SHOT_DIR, 'strip-truth-differ-1024.png') });

      /* g. AND WHEN THE CLASS WAS RIGHT, ONE NUMERAL WEARS BOTH. This is
         the case that needs its own rule: a filled pill with rings the
         same colour as the fill would be invisible, so they invert. */
      await clickFoot(page, 'Lids back on');
      await clickMark(page, 4);
      await wait(120);
      await clickFoot(page, 'Lift the lids');
      /* ⚠ WAIT OUT THE LIFT BEFORE MEASURING OR SHOOTING. The reveal is a
         380ms animation with the counters arriving at 160ms; a screenshot
         taken inside that window shows a half-faded lid over half-faded
         counters and reads as a defect that is not there. */
      await wait(560);
      const same = await page.evaluate(() => {
        const both = document.querySelectorAll('.lid-mark.lid-on.lid-truth');
        if (both.length !== 1) return { n: both.length };
        const c = getComputedStyle(both[0]);
        return { n: 1, numeral: both[0].textContent, bg: c.backgroundColor, shadow: c.boxShadow };
      });
      is(same.n === 1, 'L10 a correct guess puts both treatments on ONE numeral (saw ' + same.n + ')');
      is(same.numeral === '4' && same.shadow !== 'none' && same.bg !== 'rgba(0, 0, 0, 0)',
        'L10 — and that numeral is still both filled AND ringed, so neither reading is lost');

      /* f. AND STILL NO VERDICT */
      const verdict = await page.evaluate(() =>
        document.querySelectorAll('[class*="correct"],[class*="wrong"],[class*="right"],[class*="good"],[class*="bad"]').length);
      is(verdict === 0, '\u2b50 L10 the guess and the answer sit on one strip and NOTHING marks the gap');
      if (SHOT) await page.screenshot({ path: path.join(SHOT_DIR, 'strip-truth-1024.png') });
      await page.close();
    }

    /* ---- L8 ⭐ THE SWEEP -------------------------------------------- */
    {
      const CASES = [];
      /* the tier floors: this tool gets NO table growth at Tier A (its own
         height budget forbids it) and 840/1040 above, so the wide cells are
         where the type ramp and the bigger table have to prove they fit. */
      for (const w of [320, 360, 412, 768, 1024, 1366, 1400, 1800, 2400, 2560]) {
        /* ⚠ 0 REPLACES 1. The sweep must cover the OPENING FRAME — an
           empty table with two ghosts on it, which is the state the
           operator actually complained about — and must not ask for a
           one-lid state the tool no longer has. */
        for (const k of [0, 2, 3, 4]) {
          for (const lifted of [false, true]) CASES.push([w, k, lifted]);
        }
      }
      let worstCtrl = 999, worstCell = 999, worstCellWide = 999, worstFont = 999, sweepErrs = 0, checked = 0, overlaps = 0;
      for (const [w, k, lifted] of CASES) {
        const page = await newPage(browser, { premium: true });
        const h = w >= 2560 ? 1440 : w >= 2400 ? 1150 : w >= 1800 ? 1000 : w >= 1400 ? 880 : w >= 768 ? 900 : 780;
        await open(page, 'en', w, h);
        /* every configuration, not just the default one — and BOTH
           states, because the lifted table grows a reveal block */
        for (let i = 0; i < T.MAX_LIDS; i++) await clickFoot(page, 'Take one away', true);
        await setTotal(page, 30);             /* the widest strip and the densest table */
        if (k >= 2) {
          await addLids(page, k);
          await clickMark(page, 6);
          await wait(80);
          if (lifted) await clickFoot(page, 'Lift the lids');
      /* ⚠ WAIT OUT THE LIFT BEFORE MEASURING OR SHOOTING. The reveal is a
         380ms animation with the counters arriving at 160ms; a screenshot
         taken inside that window shows a half-faded lid over half-faded
         counters and reads as a defect that is not there. */
      await wait(560);
        }
        await wait(140);

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
          const ctrl = { chip: minOf('.lid-chip'), mark: minOf('.lid-mark'), lid: minOf('.lid-lid') };
          const cell = minOf('.lid-counter');
          const fonts = Array.from(document.querySelectorAll('.lid-hint,.lid-chip,.lid-mark,.lid-gate span,.lid-gate a'))
            .filter((e) => e.offsetParent !== null && (e.textContent || '').trim())
            .map((e) => parseFloat(getComputedStyle(e).fontSize));
          /* ⚠ CONTAINMENT AGAINST THE CARD, NOT THE INNER BOX — overflow-x
             on an inner strip absorbs the evidence. */
          const outside = Array.from(document.querySelectorAll('.lid-bar,.lid-table,.lid-strip,.lid-foot,.lid-hint'))
            .filter((e) => { const r = e.getBoundingClientRect(); return r.right > cr.right + 1 || r.left < cr.left - 1; }).length;
          const clipped = Array.from(document.querySelectorAll('.lid-chip,.lid-hint'))
            .filter((e) => e.scrollWidth > e.clientWidth + 1).length;
          const foot = document.querySelector('.lid-foot').getBoundingClientRect();
          const tbl = document.querySelector('.lid-table').getBoundingClientRect();
          /* ⭐ OVERLAP, MEASURED ON THE RENDERED DOM. Only meaningful in
             the lifted state, where the counters sit in their packing —
             the scattered ones are a loose pile and may touch by design.
             Centres closer than 92% of a diameter count as overlapping. */
          let overlap = 0;
          const lidEls = Array.from(document.querySelectorAll('.lid-lid'));
          if (lidEls.length && document.querySelector('.lid-lid.lid-up')) {
            const cs = Array.from(document.querySelectorAll('.lid-counter')).map((e) => {
              const r = e.getBoundingClientRect();
              return { x: r.left + r.width / 2, y: r.top + r.height / 2, d: r.width };
            });
            for (const L of lidEls) {
              const lr = L.getBoundingClientRect();
              const lx = lr.left + lr.width / 2, ly = lr.top + lr.height / 2;
              const mine = cs.filter((c) => Math.hypot(c.x - lx, c.y - ly) <= lr.width / 2);
              for (let p = 0; p < mine.length; p++) {
                for (let q = p + 1; q < mine.length; q++) {
                  if (Math.hypot(mine[p].x - mine[q].x, mine[p].y - mine[q].y) < mine[p].d * 0.92) overlap++;
                }
              }
            }
          }
          /* NOT TINY: the table is the apparatus. If it collapses to a
             band the lids cannot be carried anywhere. */
          return {
            ctrl, cell, overlap, minFont: fonts.length ? Math.min(...fonts) : 99,
            outside, clipped,
            tableH: tbl.height, tableW: tbl.width,
            doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            bottom: foot.bottom, cardBottom: cr.bottom
          };
        });

        const tag = w + 'px/k=' + k + '/' + (lifted ? 'lifted' : 'down');
        for (const key of Object.keys(m.ctrl)) {
          if (m.ctrl[key] === null) continue;
          if (m.ctrl[key] < 43.5) is(false, 'L8 ' + tag + ': control ".lid-' + key + '" is ' + m.ctrl[key].toFixed(1) + 'px, under the 44px control floor');
          worstCtrl = Math.min(worstCtrl, m.ctrl[key]);
        }
        /* ⚠ THE COUNTER FLOOR IS WIDTH-DEPENDENT, AND THE REASON IS NOT
           "it would not pass otherwise". The counter is not a control —
           nothing taps it — and it scales with the table so that the
           packing keeps its clearance at every width. Holding a flat
           34px would force either a fixed counter (which overlaps into a
           blob at 320px, the actual defect) or a lid half the width of a
           phone. So: the 34px canvas floor stands where the operator
           looks, and below 768 the real protection is OVERLAP, measured
           on the rendered DOM at every width. */
        if (m.cell !== null) {
          const floor = w >= 768 ? 33.5 : 12;
          if (m.cell < floor) is(false, 'L8 ' + tag + ': a counter is ' + m.cell.toFixed(1) + 'px, under the ' + floor + 'px floor for this width');
          worstCell = Math.min(worstCell, m.cell);
          if (w >= 768) worstCellWide = Math.min(worstCellWide, m.cell);
        }
        overlaps += m.overlap;
        if (m.overlap > 0) is(false, 'L8 ' + tag + ': ' + m.overlap + ' pair(s) of counters overlap under a lid — the pile cannot be counted');
        if (m.minFont < 14) is(false, 'L8 ' + tag + ': text at ' + m.minFont + 'px, under the 14px legibility floor');
        worstFont = Math.min(worstFont, m.minFont);
        if (m.outside) is(false, 'L8 ' + tag + ': ' + m.outside + ' block(s) outside THE CARD');
        if (m.clipped) is(false, 'L8 ' + tag + ': ' + m.clipped + ' label(s) clipped by their own box');
        if (m.doc > 0) is(false, 'L8 ' + tag + ': the page overflows sideways by ' + m.doc + 'px');
        if (m.tableH < 180) is(false, 'L8 ' + tag + ': the table is only ' + Math.round(m.tableH) + 'px tall — the lids have nowhere to go');
        /* the REAL viewport, not a literal 900 — the batch's recurring trap */
        if (w >= 768 && m.bottom > h) is(false, 'L8 ' + tag + ': does not FIT — the foot ends at ' + Math.round(m.bottom) + 'px of ' + h + 'px');
        /* ⚠ BELOW 768 THE STANDARD IS *PROVEN REACHABLE*, NOT FITS, AND
           REACHABLE IS NOT MEASURED BY SCROLLING. lcs-shell.css sets
           `html,body{height:100%;overflow:hidden}` deliberately; in
           production the shell grows the iframe to `.lcs-app`'s own
           height. So the honest question is whether the last control is
           inside the card the parent will be told to show. */
        if (w < 768 && m.bottom > m.cardBottom + 1) {
          is(false, 'L8 ' + tag + ': the foot ends at ' + Math.round(m.bottom) + 'px, past the card the iframe is grown to (' + Math.round(m.cardBottom) + 'px)');
        }
        if (page._errs.length) { sweepErrs += page._errs.length; is(false, 'L8 ' + tag + ': console error — ' + page._errs[0]); }
        if (SHOT && k === 3 && !lifted && (w === 360 || w === 768 || w === 1024)) {
          await page.screenshot({ path: path.join(SHOT_DIR, 'sweep-' + w + '-k3.png'), fullPage: true });
        }
        if (SHOT && k === 3 && lifted && w === 768) {
          await page.screenshot({ path: path.join(SHOT_DIR, 'sweep-768-k3-lifted.png'), fullPage: true });
        }
        checked++;
        await page.close();
      }
      is(true, 'L8 ⭐ the sweep: ' + checked + ' configurations (' + new Set(CASES.map((c) => c[0])).size + ' widths x ' + new Set(CASES.map((c) => c[1])).size + ' lid counts x both states)');
      is(worstCtrl >= 43.5, 'L8 smallest control across the whole sweep: ' + worstCtrl.toFixed(1) + 'px (floor 44)');
      is(worstCellWide >= 33.5, 'L8 smallest counter at 768px and above: ' + worstCellWide.toFixed(1) + 'px (floor 34)');
      is(worstCell >= 12, 'L8 smallest counter anywhere, phones included: ' + worstCell.toFixed(1) + 'px (floor 12)');
      is(overlaps === 0, 'L8 ⭐ zero overlapping counters under a lid across the whole sweep — every pile is countable');
      is(worstFont >= 14, 'L8 smallest text across the whole sweep: ' + worstFont + 'px (floor 14)');
      is(sweepErrs === 0, 'L8 zero console errors across the sweep');
    }

    /* ---- L9 ⭐ POISON THE SWEEP -------------------------------------
       A measurement that has never failed is not known to work. This
       shrinks the two tap targets separately and pushes a block off the
       card, then asserts THE SAME code that scored the sweep reports all
       of it. If this block ever passes silently, every "ok" above is
       worthless. */
    {
      const page = await newPage(browser, { premium: true });
      await open(page, 'en', 1024, 900);
      /* ⚠ NO LIDS. The canvas floor measures a COUNTER, and two lids over
         twelve counters leaves none in the tree — the first draft poisoned
         a table with nothing on it and reported "measured nothing", which
         is a poison test that cannot fail. */
      const bad = await page.evaluate(() => {
        const st = document.createElement('style');
        st.textContent =
          '.lid-counter{width:20px !important;height:20px !important;}' +
          '.lid-chip{min-height:20px !important;min-width:20px !important;padding:0 !important;}' +
          '.lid-hint{font-size:9px !important;}' +
          '.lid-strip{position:relative !important;left:900px !important;}' +
          '.lid-table{height:40px !important;min-height:0 !important;}';
        document.head.appendChild(st);
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const minOf = (sel) => {
          const els = Array.from(document.querySelectorAll(sel)).filter((e) => e.offsetParent !== null);
          if (!els.length) return null;
          return Math.min(...els.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); }));
        };
        const fonts = Array.from(document.querySelectorAll('.lid-hint,.lid-chip'))
          .filter((e) => e.offsetParent !== null && (e.textContent || '').trim())
          .map((e) => parseFloat(getComputedStyle(e).fontSize));
        return {
          chip: minOf('.lid-chip'), cell: minOf('.lid-counter'),
          minFont: fonts.length ? Math.min(...fonts) : 99,
          tableH: document.querySelector('.lid-table').getBoundingClientRect().height,
          outside: Array.from(document.querySelectorAll('.lid-bar,.lid-table,.lid-strip,.lid-foot,.lid-hint'))
            .filter((e) => { const r = e.getBoundingClientRect(); return r.right > card.right + 1 || r.left < card.left - 1; }).length
        };
      });
      is(bad.chip !== null && bad.chip < 43.5, 'L9 POISON: the control floor catches a 20px chip (measured ' + (bad.chip === null ? 'nothing' : bad.chip.toFixed(1) + 'px') + ')');
      is(bad.cell !== null && bad.cell < 33.5, 'L9 POISON: the canvas floor catches a 20px counter, SEPARATELY (measured ' + (bad.cell === null ? 'nothing' : bad.cell.toFixed(1) + 'px') + ')');
      is(bad.minFont < 14, 'L9 POISON: the legibility floor catches 9px text');
      is(bad.outside > 0, 'L9 POISON: containment-against-THE-CARD catches a block pushed off the right edge');
      is(bad.tableH < 180, 'L9 POISON: the not-tiny floor catches a collapsed table (' + Math.round(bad.tableH) + 'px)');
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
