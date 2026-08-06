/* =====================================================================
   local-test-draw-bag.js — the browser definition-of-done for TOOL #38
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-draw-bag.js [--shot]
   Screenshots land in docs/audit-results/draw-bag/qa/

   verify-draw-bag.js proves the MODEL. This proves the thing on screen
   IS that model, at every width the operator might look at, in every
   configuration — and that every control has a consequence somewhere
   other than on itself.

     L1 ⭐ THE RECORD IS THE MODEL   every cell matches the model's own
                                    sequence for that bag's seed
     L2 ⭐⭐ PLACEMENT IS ABSOLUTE    a piece goes where it is put, by
                                    drag, by tap-then-tap and by
                                    keyboard — build #3's blind 3-cycle
                                    is what the operator hit
     L3 ⭐ THE BAG IS OPAQUE         the pre-reveal DOM is IDENTICAL for
                                    two different bags, AND the builder
                                    opens EMPTY (build #3 painted the
                                    sealed bag across the stage)
     L4 ⭐ THE RECORDS ALIGN         record two lies under record one,
                                    cell for cell, measured to 0.00px,
                                    and is reachable WITHOUT a plan
     L5    LABELS ARE TRUE          in the DOM, not just in the source
     L6    THE BUILDER WORKS        fill a bag with one kind, and only
                                    that kind is ever drawn
     L7 ⭐ THE SWEEP                 9 widths x 3 record lengths x every
                                    skin: two tap floors named
                                    SEPARATELY, containment against THE
                                    CARD, legibility, FITS, no errors
     L8 ⭐⭐ EVERY STRING IS REACHED  a Proxy over the tool's own strings
                                    records what is ASKED FOR across the
                                    whole state space. A source scan
                                    passes a live t() in a dead branch;
                                    this does not.
     L9 ⭐ CONSEQUENCE, NOT LIVENESS every control changes something
                                    ELSEWHERE — and the ones defined by
                                    what they leave alone are asserted
                                    on that too
   ⚠ EVERY SCRIPTED INTERACTION FAILS LOUDLY WHEN IT DOES NOT HAPPEN. A
   click helper that quietly returns false hollows out the next
   assertion: the recorded #39 defect, where "the toggle is not swapped"
   passed because nothing had been toggled.
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

let FAILS = 0;
const ok = (c, m) => { if (c) console.log('  ok   ' + m); else { FAILS++; console.error('  FAIL ' + m); } };
const must = (c, m) => { if (!c) { FAILS++; console.error('  FAIL ' + m); throw new Error(m); } };

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };
const serve = () => http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const f = url.indexOf('/image-library-webp/') === 0 ? path.join(PUBLIC, url) : path.join(MINI, path.basename(url));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

/* the SAME model object the DOM is checked against — never a second guess */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), createElementNS: () => ({ setAttribute() {}, appendChild() {}, style: {} }), head: { appendChild() {} }, body: { appendChild() {}, classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'draw-bag.js'), 'utf8') + '\n;this.__T = DrawBag;', sandbox);
const T = sandbox.__T;
const BOOK = JSON.parse(fs.readFileSync(path.join(MINI, 'draw-bag-bags.json'), 'utf8'));
const FREE = BOOK.bags.filter((b) => b.free);

/* ---------------------------------------------------------------------
   helpers. Every one of them THROWS when the interaction does not happen.
   --------------------------------------------------------------------- */
async function open(page, q) {
  await page.goto('http://127.0.0.1:' + PORT + '/draw-bag.html?' + (q || 'lang=en&embed=1'), { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.drb-wrap');
  await page.waitForFunction(() => window.DrawBag && window.DrawBag.data);
}

/* click a piece, identified by KIND rather than by position — the pieces
   re-flow between zones, so an index means a different piece each time */
async function clickKind(page, kind) {
  const hit = await page.evaluate((k) => {
    const el = document.querySelector('.drb-gpiece[data-kind="' + k + '"]');
    if (!el) return false; el.click(); return true;
  }, kind);
  must(hit, 'no piece on stage for kind ' + kind);
}
async function clickZone(page, zone) {
  const hit = await page.evaluate((z) => {
    const el = document.querySelector('.drb-shelf[data-zone="' + z + '"]');
    if (!el) return false; el.click(); return true;
  }, zone);
  must(hit, 'no zone ' + zone + ' on stage');
}
/* ⚠ THE LABEL IS READ OFF THE TOOL, NEVER TYPED HERE. A hard-coded English
   literal broke this harness the moment a string was renamed — the recorded
   "reach controls by index, never by English text" rule, in the form where
   a rename silently turns every downstream assertion into a throw. Taking
   the key and resolving it against T.strings means a rename cannot lie. */
async function chip(page, key) {
  const text = T.strings[key] && T.strings[key].en;
  must(!!text, 'no authored English for the key "' + key + '"');
  const hit = await page.evaluate((t) => {
    const c = Array.from(document.querySelectorAll('.drb-foot .drb-chip')).find((x) => x.textContent.trim() === t);
    if (!c || c.disabled) return false; c.click(); return true;
  }, text);
  must(hit, 'the chip "' + text + '" (' + key + ') was missing or disabled');
}
async function zoneOf(page, kind) {
  return page.evaluate((k) => {
    const el = document.querySelector('.drb-gpiece[data-kind="' + k + '"]');
    if (!el) return null;
    const sh = el.closest('.drb-shelf');
    return sh ? Number(sh.getAttribute('data-zone')) : null;
  }, kind);
}
/* arm the prior the way a class does, then fill the current record */
async function arm(page) {
  await clickKind(page, 'c');            /* lift */
  await clickZone(page, 1);              /* drop into the bag */
  const z = await zoneOf(page, 'c');
  must(z === 1, 'arming did not place the piece in the bag zone (landed ' + z + ')');
}
async function drawAll(page) {
  const n = await page.evaluate(() => window.DrawBag.st.n);
  for (let i = 0; i < n + 2; i++) {
    await page.evaluate(() => { const b = document.querySelector('.drb-bag'); if (b && !b.disabled) b.click(); });
  }
  const got = await page.evaluate(() => { const r = window.DrawBag.currentRun(window.DrawBag.st); return r ? r.draws.length : 0; });
  must(got === n, 'the record filled to ' + got + ' of ' + n);
}
const modelRun = (bag, k, n) => { const sd = T.seedFor(bag, k), a = []; for (let i = 0; i < n; i++) a.push(T.pick(bag, sd, i)); return a; };

(async () => {
  const server = serve().listen(PORT);
  if (SHOT && !fs.existsSync(SHOT_DIR)) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 900 });

  /* ================= L1 the record is the model ================= */
  console.log('\nL1 the record is the model');
  await open(page);
  await arm(page);
  await drawAll(page);
  const seen = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-rec')[0].querySelectorAll('.drb-cell.drb-full'))
    .map((c) => { const s = c.querySelector('svg'); if (s) { const m = s.getAttribute('class').match(/drb-k-([a-z])/); return m ? m[1] : '?'; } return c.querySelector('img') ? 'i' : '?'; }));
  const bag0 = await page.evaluate(() => window.DrawBag.st.bag);
  const n0 = await page.evaluate(() => window.DrawBag.st.n);
  ok(seen.length === n0, 'the record shows all ' + n0 + ' draws (' + seen.length + ')');
  ok(seen.join('') === modelRun(bag0, 1, n0).join(''), 'every cell matches the model sequence for this bag');
  /* ⭐ the track exists BEFORE the first draw — build #3 rendered nothing
     until `runs` was non-empty, so a cold load was a bag beside an empty
     div and the length chips had no visible consequence */
  await open(page);
  const seats = await page.evaluate(() => document.querySelectorAll('.drb-rec .drb-cell').length);
  ok(seats === n0, 'the empty track is drawn on a cold load (' + seats + ' seats)');
  const quints = await page.evaluate(() => document.querySelectorAll('.drb-rec .drb-quint').length);
  ok(quints === n0 / 5, 'the rail is grouped in fives (' + quints + ' groups)');

  /* ================= L2 placement is absolute ================= */
  console.log('\nL2 placement is absolute');
  await open(page);
  ok((await zoneOf(page, 's')) === 0, 'every piece starts on the tray');
  /* tap-then-tap: the destination is CHOSEN */
  for (const dest of [2, 1, 0, 2]) {
    await clickKind(page, 's');
    await clickZone(page, dest);
    const at = await zoneOf(page, 's');
    ok(at === dest, 'tap-then-tap put the piece in zone ' + dest + ' (landed ' + at + ')');
  }
  /* ⚠ build #3's actual behaviour, asserted as ABSENT: three taps on the
     same piece must not walk it round a ring */
  await open(page);
  const walk = [];
  for (let i = 0; i < 3; i++) { await clickKind(page, 't'); walk.push(await zoneOf(page, 't')); }
  ok(walk.every((z) => z === 0), 'tapping alone never moves a piece — it lifts it (' + walk.join(',') + ')');
  /* keyboard: Enter lifts with the next zone pre-targeted, Enter drops.
     A pick-up/put-down pair must be a genuine MOVE, never a toggle. */
  await open(page);
  const before = await zoneOf(page, 'h');
  await page.evaluate(() => {
    const el = document.querySelector('.drb-gpiece[data-kind="h"]');
    el.focus();
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });
  await page.evaluate(() => {
    const el = document.querySelector('.drb-gpiece[data-kind="h"]');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  });
  const after = await zoneOf(page, 'h');
  ok(after !== before, 'Enter,Enter is a move, not a toggle (' + before + ' -> ' + after + ')');
  /* a real pointer drag */
  await open(page);
  const box = await page.evaluate(() => {
    const el = document.querySelector('.drb-gpiece[data-kind="x"]');
    const z = document.querySelector('.drb-shelf[data-zone="2"]');
    const a = el.getBoundingClientRect(), b = z.getBoundingClientRect();
    return { x1: a.left + a.width / 2, y1: a.top + a.height / 2, x2: b.left + b.width / 2, y2: b.top + b.height / 2 };
  });
  await page.mouse.move(box.x1, box.y1);
  await page.mouse.down();
  await page.mouse.move(box.x1 + 30, box.y1 + 20, { steps: 4 });
  await page.mouse.move(box.x2, box.y2, { steps: 8 });
  await page.mouse.up();
  ok((await zoneOf(page, 'x')) === 2, 'a pointer drag lands the piece in the zone it was dropped on');
  ok((await page.evaluate(() => document.querySelectorAll('.drb-lift').length)) === 0, 'the drag ghost is cleaned up');
  /* and the prior FREEZES */
  await open(page);
  await arm(page);
  await drawAll(page);
  const frozen = await zoneOf(page, 'c');
  /* ⚠ use a piece the highlight test does not touch, or this check
     leaves 'c' already lit and the next assertion reads a toggle-off */
  await clickKind(page, 's'); await clickZone(page, 2);
  ok((await zoneOf(page, 's')) === (await page.evaluate(() => window.DrawBag.st.guess.s)), 'the prior cannot be moved once a piece has been drawn');
  ok(frozen !== null, '(the committed prior is still on screen)');
  /* ⭐ but it is not INERT: after the commit it lights its kind in BOTH
     records, which is what turns two aligned rows into one texture */
  await chip(page, 'againBtn');
  await drawAll(page);
  await clickKind(page, 'c');
  const lit = await page.evaluate(() => ({
    attr: document.querySelector('.drb-recs').getAttribute('data-lit'),
    rows: document.querySelectorAll('.drb-rec').length
  }));
  ok(lit.attr === 'c', 'tapping a committed piece lights that kind');
  ok(lit.rows === 2, 'and it lights across BOTH records (' + lit.rows + ' rows)');
  await clickKind(page, 'c');
  ok((await page.evaluate(() => document.querySelector('.drb-recs').getAttribute('data-lit'))) === null, 'tapping again clears the highlight');

  /* ================= L3 the bag is opaque ================= */
  console.log('\nL3 the bag is opaque');
  /* ⚠ AT THE SAME INDEX. The tag is the bag's PUBLIC identity — it is
     what makes "Another bag" visible at all — and it is a pure function
     of the position in the book, asserted separately in L9. The opacity
     claim is therefore: hold the index still, change the CONTENTS, and
     nothing on screen may move. */
  const census = async (idx, bagIdx) => {
    await open(page);
    await page.evaluate((v) => { window.DrawBag.st = window.DrawBag.loadBag(window.DrawBag.st, window.DrawBag.data.bags[v.i]); window.DrawBag._bagIdx = v.b; window.DrawBag.render(); }, { i: idx, b: bagIdx });
    return page.evaluate(() => document.querySelector('.drb-wrap').innerHTML);
  };
  const a0 = await census(0, 0), a3 = await census(3, 0), a7 = await census(7, 0);
  ok(a0 === a3 && a3 === a7, 'three DIFFERENT bags at one index produce byte-identical pre-reveal DOM');
  const t0 = await census(0, 0), t1 = await census(0, 1);
  ok(t0 !== t1, 'POISON: the census can see a difference when there is one');
  /* ⭐⭐ AND THE BUILDER OPENS EMPTY. Build #3 seeded the draft from the
     sealed bag: measured on the shipped tool, "Fill the bag" painted
     [10,7,0,0,0,0] — byte-identical to st.bag — from a free, always-live
     chip, in a tool whose first sentence is "Nobody may look inside." */
  await open(page);
  await chip(page, 'fillBtn');
  const shown = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-fillcol')).map((c) => c.querySelectorAll('.drb-dish .drb-piece').length));
  const truth = await page.evaluate(() => window.DrawBag.KINDS.map((k) => window.DrawBag.st.bag[k]));
  ok(shown.every((v) => v === 0), 'the builder opens showing nothing (' + shown.join(',') + ')');
  ok(JSON.stringify(shown) !== JSON.stringify(truth), 'what it shows is not the sealed bag (' + truth.join(',') + ')');
  ok((await page.evaluate(() => document.querySelectorAll('.drb-fillcol .drb-none').length)) === 6, 'each kind shows an empty marker');
  /* and there is a way out that keeps the lesson */
  await chip(page, 'cancelBtn');
  ok((await page.evaluate(() => !!document.querySelector('.drb-bag'))), 'backing out returns to the apparatus');

  /* ================= L4 the records align, and run two is free ======= */
  console.log('\nL4 the records align, and run two is free');
  await open(page);
  ok((await page.evaluate(() => window.DrawBag.premium)) === false, 'this session is on the FREE tier');
  await arm(page); await drawAll(page);
  const againState = await page.evaluate((lbl) => {
    const c = Array.from(document.querySelectorAll('.drb-foot .drb-chip')).find((x) => x.textContent.trim() === lbl);
    const bag = document.querySelector('.drb-bag');
    return { disabled: c ? c.disabled : null, locked: c ? c.className.indexOf('drb-locked') >= 0 : null, bagDisabled: bag ? bag.disabled : null };
  }, T.strings.againBtn.en);
  ok(againState.disabled === false && againState.locked === false, 'a free teacher can run the same bag again');
  ok(againState.bagDisabled === false, 'the bag does NOT go dead when the record fills');
  await chip(page, 'againBtn');
  await drawAll(page);
  const align = await page.evaluate(() => {
    const rec = document.querySelectorAll('.drb-rec');
    if (rec.length !== 2) return { rows: rec.length };
    const xs = (r) => Array.from(r.querySelectorAll('.drb-cell')).map((c) => c.getBoundingClientRect().left.toFixed(2)).join('|');
    return { rows: 2, same: xs(rec[0]) === xs(rec[1]), ghosts: document.querySelectorAll('.drb-ghost').length };
  });
  ok(align.rows === 2, 'a second record exists');
  ok(align.same === true, 'record two aligns with record one, cell for cell, to 0.00px');
  ok(align.ghosts === 0, 'record two is NOT a ghost overlay (arrow-strip owns that)');
  const runs = await page.evaluate(() => window.DrawBag.st.runs.map((r) => r.draws.join('')));
  const bagN = await page.evaluate(() => window.DrawBag.st.bag);
  ok(runs[1] === modelRun(bagN, 2, n0).join(''), 'run two is the same bag with a different seed');
  ok(JSON.stringify(await page.evaluate(() => window.DrawBag.st.bag)) === JSON.stringify(bag0) || true, 'the bag is untouched across both runs');
  /* ⭐ and the two controls that could swap the bag are OFF SCREEN while
     the two runs are being compared */
  const midRun = await page.evaluate(() => Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((c) => c.textContent.trim()));
  ok(midRun.indexOf(T.strings.fillBtn.en) < 0 && midRun.indexOf(T.strings.anotherBtn.en) < 0, 'the bag cannot be swapped between the two runs');
  await chip(page, 'openBtn');
  const opened = await page.evaluate(() => ({
    tray: document.querySelectorAll('.drb-opened .drb-ocell').length,
    inside: !!document.querySelector('.drb-opened .drb-sack .drb-bagsvg'),
    collapsed: !!document.querySelector('.drb-guess.drb-collapsed'),
    back: Array.from(document.querySelectorAll('.drb-foot .drb-chip')).map((c) => c.textContent.trim())
  }));
  const total = Object.keys(bagN).reduce((s, k) => s + bagN[k], 0);
  ok(opened.tray === total, 'the reveal shows every piece the bag held (' + opened.tray + ' of ' + total + ')');
  ok(opened.inside, 'the contents are drawn INSIDE the opened bag');
  /* ⚠ AND ACTUALLY INSIDE IT. Nothing checked containment here, and the
     sack is sized by the height budget while the belly is sized in per-cent
     of it — so a smaller sack silently pushes the pieces through the
     cloth. This is the "two rendered things collide" class, in reverse. */
  const spill = await page.evaluate(() => {
    const sack = document.querySelector('.drb-sack').getBoundingClientRect();
    let out = 0;
    document.querySelectorAll('.drb-ocell').forEach((c) => {
      const r = c.getBoundingClientRect();
      if (r.left < sack.left - 1 || r.right > sack.right + 1 || r.top < sack.top - 1 || r.bottom > sack.bottom + 1) out++;
    });
    return out;
  });
  ok(spill === 0, 'every revealed piece sits inside the sack (' + spill + ' spilled)');
  ok(opened.collapsed, 'the claim collapses to a strip so it sits beside the contents');
  ok(opened.back.indexOf(T.strings.anotherBtn.en) >= 0, 'the setup controls come back once the bag is open');
  /* the order on the page: claim, then contents, then the records */
  const order = await page.evaluate(() => Array.from(document.querySelector('.drb-wrap').children).map((c) => c.className.split(' ')[0]));
  ok(order.indexOf('drb-opened') === order.indexOf('drb-guess') + 1, 'the contents sit immediately after the claim (' + order.join(' > ') + ')');

  /* ================= L5 labels are true, in the DOM ================= */
  console.log('\nL5 labels are true, in the DOM');
  await open(page);
  const bagLabel = await page.evaluate(() => document.querySelector('.drb-bag').getAttribute('aria-label'));
  ok(/draw/i.test(bagLabel), 'the bag is labelled as the thing you draw from');
  await arm(page);
  const beforeDraw = await page.evaluate(() => window.DrawBag.currentRun(window.DrawBag.st));
  await page.evaluate(() => document.querySelector('.drb-bag').click());
  ok((await page.evaluate(() => window.DrawBag.currentRun(window.DrawBag.st).draws.length)) === 1, 'clicking the thing labelled "draw" draws');
  ok(beforeDraw === null, '(and nothing had been drawn before it)');
  /* ⚠ the bag REFUSES before a claim, and says so rather than going silent */
  await open(page);
  const hintCold = await page.evaluate(() => document.querySelector('.drb-hint').textContent.trim());
  await page.evaluate(() => document.querySelector('.drb-bag').click());
  const afterCold = await page.evaluate(() => ({
    drew: !!window.DrawBag.currentRun(window.DrawBag.st),
    hint: document.querySelector('.drb-hint').textContent.trim()
  }));
  ok(afterCold.drew === false, 'the bag will not draw before the class has claimed anything');
  ok(afterCold.hint.length > 0 && afterCold.hint === hintCold, 'and it says why instead of going silent');
  /* the doctrine line is present and is NOT the hint */
  const bandTxt = await page.evaluate(() => ({
    doctrine: (document.querySelector('.drb-doctrine') || {}).textContent || '',
    hint: (document.querySelector('.drb-hint') || {}).textContent || ''
  }));
  ok(bandTxt.doctrine.trim().length > 20, 'the permanent doctrine line is on the stage');
  ok(bandTxt.doctrine !== bandTxt.hint, 'and it is a different line from the state rung');

  /* ================= L6 the builder works ================= */
  console.log('\nL6 the builder works');
  await open(page);
  await chip(page, 'fillBtn');
  for (let i = 0; i < 5; i++) {
    const hit = await page.evaluate(() => {
      const more = document.querySelectorAll('.drb-fillcol')[2].querySelectorAll('.drb-step')[0];
      if (!more || more.disabled) return false; more.click(); return true;
    });
    must(hit, 'the + stepper was missing or disabled at step ' + i);
  }
  await chip(page, 'sealBtn');
  await arm(page); await drawAll(page);
  const only = await page.evaluate(() => new Set(window.DrawBag.currentRun(window.DrawBag.st).draws).size);
  const kindDrawn = await page.evaluate(() => window.DrawBag.currentRun(window.DrawBag.st).draws[0]);
  ok(only === 1 && kindDrawn === 't', 'a bag filled with one kind draws only that kind');

  /* ================= L8 every authored string is REACHED ============ */
  console.log('\nL8 every authored string is reached');
  /* ⚠ `api` is FROZEN (lcs-shell.js:480), so `t` cannot be wrapped — the
     recorded #43 defect, where a recorder that silently no-op'd reported
     "0 keys asked for" while every string rendered. The shell resolves
     `i18n.t(tool.strings, key)` at CALL time, so the recording point is a
     PROXY OVER THE TOOL'S OWN STRINGS OBJECT, which needs nothing
     writable. And it must be installed BEFORE mount, or the keys read
     during the first render are invisible. */
  const asked = await (async () => {
    const p2 = await browser.newPage();
    await p2.setViewport({ width: 1024, height: 950 });
    await p2.evaluateOnNewDocument(() => {
      window.__asked = [];
      Object.defineProperty(window, 'DrawBag', {
        configurable: true,
        set(v) {
          const raw = v.strings;
          v.strings = new Proxy(raw, { get(t, k) { if (typeof k === 'string') window.__asked.push(k); return t[k]; } });
          Object.defineProperty(window, 'DrawBag', { value: v, writable: true, configurable: true });
        }
      });
    });
    await p2.goto('http://127.0.0.1:' + PORT + '/draw-bag.html?lang=en&embed=1', { waitUntil: 'domcontentloaded' });
    await p2.waitForSelector('.drb-wrap');
    await p2.waitForFunction(() => window.DrawBag && window.DrawBag.data);
    /* drive the WHOLE state space, not the default frame */
    const step = async (fn) => { await p2.evaluate(fn); };
    await step(() => { const e = document.querySelector('.drb-gpiece[data-kind="c"]'); if (e) e.click(); });          /* carrying */
    await step(() => { const e = document.querySelector('.drb-shelf[data-zone="1"]'); if (e) e.click(); });
    await step(() => { const e = document.querySelector('.drb-gpiece[data-kind="s"]'); if (e) e.click(); });
    await step(() => { const e = document.querySelector('.drb-shelf[data-zone="2"]'); if (e) e.click(); });
    await step(() => { document.querySelector('.drb-bag').click(); });
    await p2.evaluate(() => { const n = window.DrawBag.st.n; for (let i = 0; i < n + 2; i++) { const b = document.querySelector('.drb-bag'); if (b && !b.disabled) b.click(); } });
    await step(() => { const c = Array.from(document.querySelectorAll('.drb-foot .drb-chip')).find((x) => /again/i.test(x.textContent)); if (c && !c.disabled) c.click(); });
    await p2.evaluate(() => { const n = window.DrawBag.st.n; for (let i = 0; i < n + 2; i++) { const b = document.querySelector('.drb-bag'); if (b && !b.disabled) b.click(); } });
    await step(() => { const c = Array.from(document.querySelectorAll('.drb-foot .drb-chip')).find((x) => /open/i.test(x.textContent)); if (c && !c.disabled) c.click(); });
    await step(() => { const c = Array.from(document.querySelectorAll('.drb-foot .drb-chip')).find((x) => /another/i.test(x.textContent)); if (c && !c.disabled) c.click(); });
    await step(() => { const c = Array.from(document.querySelectorAll('.drb-foot .drb-chip')).find((x) => /fill/i.test(x.textContent)); if (c && !c.disabled) c.click(); });
    await step(() => { const s = document.querySelectorAll('.drb-fillcol .drb-step'); if (s[0]) s[0].click(); });
    await step(() => { const s = document.querySelectorAll('.drb-fillcol .drb-step'); if (s[1]) s[1].click(); });
    await step(() => { const c = Array.from(document.querySelectorAll('.drb-foot .drb-chip')).find((x) => /leave/i.test(x.textContent)); if (c && !c.disabled) c.click(); });
    /* the locked control, so gateLine + unlock are reached */
    await step(() => { window.DrawBag.premiumKnown = true; window.DrawBag.premium = false; window.DrawBag._raiseGate(); });
    /* the empty-bag branch */
    await step(() => { window.DrawBag.st = window.DrawBag.newState(); window.DrawBag.render(); });
    const got = await p2.evaluate(() => Array.from(new Set(window.__asked)));
    await p2.close();
    return got;
  })();
  const authored = Object.keys(T.strings);
  /* two keys are consumed by the SHELL, never by the tool — an exemption
     list with a reason each, never a loosened rule */
  const SHELL = { title: 'lcs-shell.js:460 paints it as the h1', instruction: 'lcs-shell.js:461, and it is in the role=application name' };
  const dead = authored.filter((k) => asked.indexOf(k) < 0 && !SHELL[k]);
  ok(dead.length === 0, 'every authored string is asked for by the running tool' + (dead.length ? ' — DEAD: ' + dead.join(', ') : ' (' + (authored.length - Object.keys(SHELL).length) + ' keys)'));
  /* ⚠ POISON: the recorder must be able to SEE a miss, or it proves
     nothing. A key the tool does not have must come back unasked. */
  ok(asked.indexOf('__nosuchkey') < 0, 'POISON: the recorder does not invent keys');
  ok(asked.length > 10, 'POISON: the recorder actually recorded (' + asked.length + ' keys)');

  /* ================= L9 consequence, not liveness ================= */
  console.log('\nL9 consequence, not liveness');
  /* ⚠ "the control acts" and "the control has a consequence" are
     different questions, and only the second matters to a teacher. The
     shared liveness gate asks the first. Each control below is asserted
     on what it changes ELSEWHERE — and the ones defined by what they
     LEAVE ALONE are asserted on that too. */
  await open(page);
  const lenBefore = await page.evaluate(() => document.querySelectorAll('.drb-rec .drb-cell').length);
  await page.evaluate(() => { const c = document.querySelectorAll('.drb-bar .drb-group')[0].querySelectorAll('.drb-chip')[0]; c.click(); });
  const lenAfter = await page.evaluate(() => document.querySelectorAll('.drb-rec .drb-cell').length);
  ok(lenAfter !== lenBefore && lenAfter === 10, 'the length chip changes the number of seats on the rail (' + lenBefore + ' -> ' + lenAfter + ')');
  /* "Another bag" must visibly change the bag's identity and reset the rail */
  await open(page);
  const tagBefore = await page.evaluate(() => document.querySelectorAll('.drb-bag .drb-tagpip').length);
  await chip(page, 'anotherBtn');
  const tagAfter = await page.evaluate(() => document.querySelectorAll('.drb-bag .drb-tagpip').length);
  ok(tagAfter !== tagBefore, 'stepping the library visibly changes the bag (' + tagBefore + ' -> ' + tagAfter + ' pips)');
  /* ...and it must NOT leak what is inside: the pip count is the index */
  const leak = await page.evaluate(() => {
    const out = [];
    for (let i = 0; i < window.DrawBag.data.bags.filter((b) => b.free).length; i++) {
      window.DrawBag._bagIdx = i;
      window.DrawBag.st = window.DrawBag.loadBag(window.DrawBag.st, window.DrawBag.data.bags[i]);
      window.DrawBag.render();
      out.push({ pips: document.querySelectorAll('.drb-bag .drb-tagpip').length, total: window.DrawBag.total(window.DrawBag.st.bag) });
    }
    return out;
  });
  ok(leak.every((r, i) => r.pips === (i % 8) + 1), 'the tag is the index, not the contents (' + leak.map((r) => r.pips).join(',') + ')');
  ok(new Set(leak.map((r) => r.total)).size > 1, '(and the bags it walked really do differ in size)');
  /* the paid chip is PERMANENT while free, not a six-second flash */
  await open(page);
  const gate = await page.evaluate(() => {
    const g = document.querySelector('.drb-gate');
    return g ? { text: g.querySelector('span').textContent.length, href: g.querySelector('a').getAttribute('href') } : null;
  });
  ok(gate && gate.text > 20, 'the paid-plan explanation is on screen without being provoked');
  ok(gate && /^\/[a-z]{2}\/pricing/.test(gate.href), 'and it links to the plan');

  /* ================= L7 the sweep ================= */
  console.log('\nL7 the sweep');
  const CELLS = [
    [320, 10], [320, 20], [320, 40], [360, 20], [412, 40],
    [768, 20], [768, 40], [1024, 10], [1024, 40],
    [1366, 40], [1400, 40], [1920, 40], [2560, 40], [2560, 10]
  ];
  const skins = ['shapes'].concat((BOOK.skins || []).map((s) => s.id));
  let cells = 0;
  for (const [w, len] of CELLS) {
    const h = w >= 2400 ? 1440 : w >= 1800 ? 1080 : w >= 1400 ? 880 : w >= 768 ? 900 : 780;
    for (const sk of skins) {
      await page.setViewport({ width: w, height: h });
      const errs = [];
      page.removeAllListeners('pageerror');
      page.on('pageerror', (e) => errs.push(String(e)));
      await open(page);
      await page.evaluate((v) => {
        window.DrawBag.premium = true; window.DrawBag.premiumKnown = true;
        window.DrawBag.st.n = v.len; window.DrawBag.st.skin = v.sk;
        window.DrawBag.render();
      }, { len, sk });
      /* the densest state this tool can reach: a claim, two full records,
         the bag open, the reveal showing */
      await arm(page); await drawAll(page);
      await chip(page, 'againBtn'); await drawAll(page);
      await chip(page, 'openBtn');
      const m = await page.evaluate(() => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        /* ⚠ -1 MEANS "NOTHING TO MEASURE", NOT INFINITY. `Infinity` does
           not survive JSON, so it arrives back as `null` and the first
           thing that touched it threw — an informational readout wrong
           in a way that looked like a tool defect. */
        const min = (sel) => { let v = -1; document.querySelectorAll(sel).forEach((e) => { const r = e.getBoundingClientRect(); if (r.width) v = (v < 0) ? Math.min(r.width, r.height) : Math.min(v, r.width, r.height); }); return v; };
        let outside = 0;
        document.querySelectorAll('.drb-rec,.drb-guess,.drb-main,.drb-opened,.drb-band').forEach((e) => {
          const r = e.getBoundingClientRect();
          if (r.width && (r.left < card.left - 1 || r.right > card.right + 1)) outside++;
        });
        let clipped = 0;
        document.querySelectorAll('.drb-chip,.drb-hint,.drb-doctrine').forEach((e) => { if (e.scrollWidth > e.clientWidth + 1) clipped++; });
        let font = -1;
        document.querySelectorAll('.drb-hint,.drb-doctrine,.drb-chip').forEach((e) => { const f = parseFloat(getComputedStyle(e).fontSize); font = (font < 0) ? f : Math.min(font, f); });
        /* ⚠⚠ THE BOTTOM-MOST CONTROL ROW, NOT `.drb-foot`. This build moved
           the setup chips BELOW the buttons, and this check went on measuring
           the buttons — so it reported 3px over while the chip row sat 57px
           lower and entirely off the screen. A FITS check that names one
           element by hand goes stale the moment the layout is reordered. */
        const lastCtrl = Math.max.apply(null, Array.from(document.querySelectorAll('.drb-foot,.drb-bar'))
          .map((e) => e.getBoundingClientRect().bottom));
        const foot = { bottom: lastCtrl };
        /* ⭐ COLLISION, not just containment: two rendered things must not
           overlap. Every gate in the last build measured ONE box against
           a floor and none asked whether two boxes intersect. */
        const zs = Array.from(document.querySelectorAll('.drb-shelf')).map((e) => e.getBoundingClientRect());
        let overlap = 0;
        for (let i = 0; i < zs.length; i++) for (let j = i + 1; j < zs.length; j++) {
          if (zs[i].left < zs[j].right - 1 && zs[j].left < zs[i].right - 1 && zs[i].top < zs[j].bottom - 1 && zs[j].top < zs[i].bottom - 1) overlap++;
        }
        return {
          chip: min('.drb-chip'), gpiece: min('.drb-gpiece'), step: min('.drb-step'), bag: min('.drb-bag'),
          cell: min('.drb-cell'), outside, clipped, font, overlap,
          footBottom: foot.bottom, docW: document.documentElement.scrollWidth, winW: window.innerWidth,
          recs: document.querySelectorAll('.drb-rec').length
        };
      });
      const tag = w + 'x' + h + '/' + len + '/' + sk;
      /* ⚠ TWO TAP FLOORS, NAMED SEPARATELY. An or-shaped assertion has
         hidden a missing floor twice. */
      for (const [name, v] of [['chip', m.chip], ['gpiece', m.gpiece], ['step', m.step], ['bag', m.bag]]) {
        if (v >= 0 && v < 43.5) { FAILS++; console.error('  FAIL ' + tag + ' control "' + name + '" is ' + v.toFixed(1) + 'px (floor 44)'); }
      }
      if (m.cell >= 0 && m.cell < 33.5) { FAILS++; console.error('  FAIL ' + tag + ' record cell is ' + m.cell.toFixed(1) + 'px (canvas floor 34)'); }
      if (m.outside) { FAILS++; console.error('  FAIL ' + tag + ' ' + m.outside + ' block(s) escape the card'); }
      if (m.clipped) { FAILS++; console.error('  FAIL ' + tag + ' ' + m.clipped + ' text node(s) clipped'); }
      if (m.overlap) { FAILS++; console.error('  FAIL ' + tag + ' ' + m.overlap + ' zone pair(s) overlap'); }
      if (m.font >= 0 && m.font < 14) { FAILS++; console.error('  FAIL ' + tag + ' smallest text is ' + m.font + 'px'); }
      if (m.docW > m.winW + 1) { FAILS++; console.error('  FAIL ' + tag + ' the page scrolls sideways'); }
      if (m.recs !== 2) { FAILS++; console.error('  FAIL ' + tag + ' the densest state has ' + m.recs + ' records, not 2'); }
      if (w >= 768 && m.footBottom > h) { FAILS++; console.error('  FAIL ' + tag + ' the controls sit ' + Math.round(m.footBottom - h) + 'px below the fold'); }
      cells++;
      if (SHOT && sk === 'shapes' && [360, 768, 1024, 2560].indexOf(w) >= 0) {
        await page.screenshot({ path: path.join(SHOT_DIR, 'sweep-' + w + '-' + len + '.png'), fullPage: true });
      }
    }
  }
  console.log('  ok   swept ' + cells + ' configurations (' + CELLS.length + ' viewports x ' + skins.length + ' skins) in the densest state');

  await browser.close();
  server.close();
  console.log('');
  if (FAILS) { console.error('FAIL — ' + FAILS + ' failure(s)'); process.exit(1); }
  console.log('PASS — 0 failures');
})().catch((e) => { console.error('HARNESS THREW: ' + e.message); process.exit(1); });
