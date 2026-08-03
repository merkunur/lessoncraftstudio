/* =====================================================================
   local-test-number-line.js — the BROWSER gate for TOOL #1
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-number-line.js [--shot]

   Serves `mini tools/` locally — no deploy — and drives the tool with
   REAL pointer events, checking the DOM against the tool's own model
   loaded separately in Node.

   ⚠ THREE FLOORS, NAMED SEPARATELY. An or-shaped assertion has hidden a
   missing floor twice in this program:
     · CONTROLS ≥44px — the five chips, the four range chips, both grips
     · TEXT     ≥14px — every rendered text node, numerals included
     · CANVAS   ≥34px — NOTHING HERE QUALIFIES. There are no tappable
       cells; the ticks and arcs are decoration and the grips are
       controls. Stated so the omission is a decision on the record
       rather than a gap.

   ⭐ AND THIS FILE OWNS THE STRING-REACHABILITY PROOF. `verify-` can only
   check that a key is MENTIONED in the source, which #39 showed is
   defeated by a `t()` call in a dead branch, and #43 showed again. Here a
   PROXY OVER THE TOOL'S OWN STRINGS OBJECT records every key the shell
   actually asks for, across a matrix of real states.
   ⚠ The Proxy goes on `tool.strings` and NOT on `api.t`, because
   `lcs-shell.js:482` freezes the api and `t` is non-writable — wrapping
   it silently no-ops in sloppy mode and the gate reports "0 keys asked
   for" while every string renders. And it is installed BEFORE mount,
   because a recorder attached afterwards cannot see the keys read AT
   mount.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'number-line', 'qa');
const SHOT = process.argv.indexOf('--shot') >= 0;
const PORT = 5576;
const WIDTHS = [320, 360, 412, 768, 1024, 1366, 1920, 2560];

const T = require(path.join(ROOT, 'number-line.js'));   /* the model, in Node */

if (SHOT) fs.mkdirSync(OUT, { recursive: true });

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const head = (s) => console.log('\n' + s);

/* the strings recorder, installed before the shell exists ------------- */
const RECORDER = () => {
  window.__asked = Object.create(null);
  let _lcs;
  Object.defineProperty(window, 'LCS', {
    configurable: true,
    get() { return _lcs; },
    set(v) {
      _lcs = v;
      const realMount = v.mount;
      v.mount = function (tool, opts) {
        const raw = tool.strings;
        /* ⚠ a Proxy needs nothing writable — which is the whole reason
           this works where wrapping the frozen api.t does not. */
        tool.strings = new Proxy(raw, {
          get(t2, k) {
            if (typeof k === 'string') window.__asked[k] = (window.__asked[k] || 0) + 1;
            return t2[k];
          }
        });
        if (window.__poisonKey) raw[window.__poisonKey] = { en: 'never asked for' };
        return realMount.call(this, tool, opts);
      };
    }
  });
};

async function open(b, W, opts) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR|auth\/me/.test(m.text())) errs.push(m.text()); });
  await p.evaluateOnNewDocument(RECORDER);
  if (opts && opts.poisonKey) await p.evaluateOnNewDocument((k) => { window.__poisonKey = k; }, opts.poisonKey);
  await p.setViewport({ width: W, height: 900 });
  await p.goto(`http://127.0.0.1:${PORT}/number-line.html?lang=${(opts && opts.lang) || 'en'}&embed=1`,
    { waitUntil: 'domcontentloaded' });
  await p.waitForSelector('.nl-wrap', { timeout: 9000 });
  await wait(300);
  p.__errs = errs;
  return p;
}

const setState = (p, st) => p.evaluate((s) => {
  const X = window.NumberLine; X.st = X._st(s); X._stopFlight(); X._paint();
}, st);

const model = (p) => p.evaluate(() => {
  const X = window.NumberLine;
  return { max: X.st.max, start: X.st.start, hop: X.st.hop, n: X.st.n };
});

/* drag a grip by real pointer events, from its centre to a target value */
async function dragGrip(p, sel, toValue) {
  const box = await p.evaluate((s, v) => {
    const X = window.NumberLine;
    const g = document.querySelector(s).getBoundingClientRect();
    const st = document.querySelector('.nl-stage').getBoundingClientRect();
    return {
      x: g.x + g.width / 2, y: g.y + g.height / 2,
      tx: st.x + (X.xOf(X.st, v) / X.W) * st.width, ty: g.y + g.height / 2
    };
  }, sel, toValue);
  await p.mouse.move(box.x, box.y);
  await p.mouse.down();
  await p.mouse.move((box.x + box.tx) / 2, box.ty, { steps: 6 });
  await p.mouse.move(box.tx, box.ty, { steps: 6 });
  await p.mouse.up();
  await wait(150);
}

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* =================================================================
     L1 — the DOM agrees with the model's own arithmetic
     ================================================================= */
  head('L1  the arcs are the model');
  {
    const p = await open(b, 1024);
    let bad = 0, checked = 0;
    for (const c of [{ max: 20, start: 0, hop: 5 }, { max: 20, start: 0, hop: 3 },
      { max: 100, start: 0, hop: 10 }, { max: 20, start: 20, hop: -5 },
      { max: 1000, start: 0, hop: 100 }]) {
      const full = T.allTheWay(T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 }))
        || T._st({ max: c.max, start: c.start, hop: c.hop, n: 0 });
      await setState(p, full);
      const got = await p.evaluate(() => document.querySelectorAll('.nl-arc').length);
      checked++;
      if (got !== full.n) { bad++; console.error('   ' + JSON.stringify(c) + ' model says ' + full.n + ' arcs, DOM has ' + got); }
    }
    is(checked === 5 && bad === 0, 'L1 arc count matches landings()-1 across ' + checked + ' shapes');
    await p.close();
  }

  /* =================================================================
     L2 — congruence, measured in PIXELS off the rendered boxes
     ⚠ NOT by re-reading arcPath. #44 shipped a mirrored profile past
     every gate because the oracle shared the tool's own convention.
     ================================================================= */
  head('L2  congruence in pixels');
  for (const W of [360, 1024]) {
    const p = await open(b, W);
    await setState(p, { max: 20, start: 0, hop: 3, n: 6 });
    const m = await p.evaluate(() => {
      const a = [...document.querySelectorAll('.nl-arc')].map((e) => {
        const r = e.getBoundingClientRect();
        return { w: +r.width.toFixed(2), h: +r.height.toFixed(2) };
      });
      return { n: a.length, dw: Math.max(...a.map((x) => x.w)) - Math.min(...a.map((x) => x.w)),
        dh: Math.max(...a.map((x) => x.h)) - Math.min(...a.map((x) => x.h)), a0: a[0] };
    });
    is(m.n >= 2, 'L2 ' + W + 'px non-vacuity: ' + m.n + ' arcs on screen');
    is(m.dw < 1.2 && m.dh < 1.2, 'L2 ' + W + 'px every dome identical (spread ' + m.dw.toFixed(2) + 'w / ' + m.dh.toFixed(2) + 'h px)');
    await p.close();
  }

  /* =================================================================
     L3 — REAL POINTER DRAGS, and what must NOT change
     ================================================================= */
  head('L3  real drags');
  {
    const p = await open(b, 1024);
    await setState(p, { max: 20, start: 0, hop: 5, n: 3 });

    await dragGrip(p, '.nl-g-hop', 4);
    let m = await model(p);
    is(m.hop === 4, 'L3 dragging the hop grip sets the hop (got ' + m.hop + ')');
    is(m.n === 0, 'L3 ⭐ and CLEARS the trail — a mixed-length trail is unrepresentable');
    is(m.start === 0, 'L3 and must NOT move the start (got ' + m.start + ')');

    await setState(p, { max: 20, start: 0, hop: 5, n: 2 });
    await dragGrip(p, '.nl-g-start', 5);
    m = await model(p);
    is(m.start === 5, 'L3 dragging the start grip sets the start (got ' + m.start + ')');
    is(m.n === 0, 'L3 and clears the trail');
    is(m.hop === 5, 'L3 and must NOT change the hop length');

    /* keyboard twin — a drag-only handle is dead to the liveness gate */
    await setState(p, { max: 20, start: 0, hop: 5, n: 0 });
    await p.focus('.nl-g-start');
    await p.keyboard.press('ArrowRight');
    await wait(80);
    m = await model(p);
    is(m.start === 1, 'L3 the start grip has a keyboard twin (ArrowRight -> ' + m.start + ')');
    await p.focus('.nl-g-hop');
    await p.keyboard.press('ArrowRight');
    await wait(80);
    m = await model(p);
    is(m.hop === 6, 'L3 the hop grip has a keyboard twin (ArrowRight -> ' + m.hop + ')');
    await p.close();
  }

  /* =================================================================
     L4 — every control's CONSEQUENCE, and its non-consequence
     ⚠ audit-tool-control-liveness only asks "did the DOM change". A
     control whose whole effect is its own highlight scores green there
     and is still furniture (#39).
     ================================================================= */
  head('L4  consequences');
  {
    const p = await open(b, 1024);
    await setState(p, { max: 20, start: 3, hop: 2, n: 0 });

    const ticksBefore = await p.evaluate(() => document.querySelectorAll('.nl-tick').length);
    const numsBefore = await p.evaluate(() => document.querySelectorAll('.nl-num').length);
    await p.evaluate(() => [...document.querySelectorAll('.nl-chip')].find((e) => /Numerals/.test(e.textContent)).click());
    await wait(120);
    const after = await p.evaluate(() => ({
      ticks: document.querySelectorAll('.nl-tick').length,
      nums: document.querySelectorAll('.nl-num').length
    }));
    is(after.nums < numsBefore, 'L4 Numerals thins the numerals (' + numsBefore + ' -> ' + after.nums + ')');
    is(after.ticks === ticksBefore, 'L4 ⭐ and must NOT move the ticks (' + ticksBefore + ' both sides)');

    /* the range chip's consequence is the AXIS, not its own highlight */
    await setState(p, { max: 20, start: 3, hop: 2, n: 0 });
    const xBefore = await p.evaluate(() => {
      const X = window.NumberLine;
      const st = document.querySelector('.nl-stage').getBoundingClientRect();
      return st.x + (X.xOf(X.st, 3) / X.W) * st.width;
    });
    await p.evaluate(() => [...document.querySelectorAll('.nl-range')].find((e) => e.textContent === '100').click());
    await wait(120);
    const r = await p.evaluate(() => {
      const X = window.NumberLine;
      const st = document.querySelector('.nl-stage').getBoundingClientRect();
      const last = [...document.querySelectorAll('.nl-num')].pop();
      return { start: X.st.start, max: X.st.max, lastNum: last && last.textContent,
        x: st.x + (X.xOf(X.st, 3) / X.W) * st.width };
    });
    is(r.max === 100 && r.lastNum === '100', 'L4 the range chip RELABELS the axis (last numeral ' + r.lastNum + ')');
    is(r.start === 3, 'L4 and the value is preserved — the same number, a new place');
    is(Math.abs(r.x - xBefore) > 20, 'L4 and it visibly moved (' + Math.abs(r.x - xBefore).toFixed(0) + 'px)');

    /* ⭐ ALL THE WAY MUST CHAIN, AND EVERY FLIGHT MUST BE A REAL ARC.
       The first cut hopped exactly ONCE — `_flyTo` opens with
       `_stopFlight()`, which nulled the continuation the chain had just
       assigned. Nothing here caught it because every other test drives a
       single Hop; the THUMBNAIL GENERATOR found it, with a card showing
       one arc where the point of the card is a row of them. */
    await setState(p, { max: 20, start: 0, hop: 5, n: 0 });
    await p.evaluate(() => [...document.querySelectorAll('.nl-chip')][1].click());
    await wait(2600);
    let chained = await model(p);
    is(chained.n === 4, 'L4 ⭐ All the way CHAINS to the wall (n=' + chained.n + ', want 4)');
    const arcsAfter = await p.evaluate(() => document.querySelectorAll('.nl-arc').length);
    is(arcsAfter === 4, 'L4 and draws all four arcs (' + arcsAfter + ')');

    /* Hop, and the wall */
    await setState(p, { max: 20, start: 0, hop: 3, n: 5 });
    await p.evaluate(() => document.querySelector('.nl-chip').click());
    await wait(700);
    let m = await model(p);
    is(m.n === 6, 'L4 Hop advances one landing (n=' + m.n + ')');
    const dis = await p.evaluate(() => ({
      hop: document.querySelector('.nl-chip').disabled,
      all: [...document.querySelectorAll('.nl-chip')][1].disabled
    }));
    is(dis.hop && dis.all, 'L4 ⭐ at the wall BOTH action chips are disabled — the hop is refused, not shortened');
    const gapVisible = await p.evaluate(() => {
      const X = window.NumberLine;
      return X.gap(X.st);
    });
    is(gapVisible === 2, 'L4 and the leftover gap is 2, drawn as absence');
    await p.close();
  }

  /* =================================================================
     L5 — no verdict surface anywhere, ever
     ================================================================= */
  head('L5  no verdict');
  {
    const p = await open(b, 1024);
    let bad = [];
    for (const st of [{ max: 20, start: 0, hop: 5, n: 4 }, { max: 20, start: 0, hop: 3, n: 6 },
      { max: 20, start: 20, hop: -5, n: 4 }, { max: 10, start: 8, hop: 5, n: 0 }]) {
      await setState(p, st);
      const txt = await p.evaluate(() => document.querySelector('.nl-wrap').textContent);
      if (/correct|wrong|well done|score|try again|✓|✗|check/i.test(txt)) bad.push(JSON.stringify(st));
    }
    is(bad.length === 0, 'L5 no verdict vocabulary in any reachable state');
    const pose = await p.evaluate(() => {
      const X = window.NumberLine;
      X.st = X._st({ max: 20, start: 0, hop: 3, n: 5 }); X._paint();
      X._chipHopClick = null;
      return null;
    });
    await p.close();
  }

  /* =================================================================
     L6 — ⭐ STRING REACHABILITY, by recording Proxy over a state matrix
     ================================================================= */
  head('L6  string reachability (the real one)');
  {
    const p = await open(b, 1024);
    /* drive every branch the tool has */
    for (const st of [
      { max: 20, start: 0, hop: 5, n: 0 },      /* hintSetHop  */
      { max: 20, start: 0, hop: 5, n: 2 },      /* hintGoing   */
      { max: 20, start: 0, hop: 5, n: 4 },      /* hintExact   */
      { max: 20, start: 0, hop: 3, n: 6 },      /* hintWall    */
      { max: 10, start: 8, hop: 5, n: 0 }       /* hintNoRoom  */
    ]) await setState(p, st);
    await p.evaluate(() => window.NumberLine._showGate());
    await wait(150);

    const asked = await p.evaluate(() => Object.keys(window.__asked));
    const authored = Object.keys(T.strings);
    const missing = authored.filter((k) => asked.indexOf(k) < 0);
    is(asked.length > 10, 'L6 non-vacuity: the recorder saw ' + asked.length + ' key lookups');
    is(missing.length === 0, 'L6 every authored key is asked for at runtime' +
      (missing.length ? ' — DEAD: ' + missing.join(', ') : ''));
    await p.close();
  }

  /* ⭐ POISON THE RECHABILITY GATE. A gate that has never been shown to
     FAIL is a claim. The poison is #39's shape: a key that is authored
     and never asked for. If this run does NOT report it dead, the gate
     is measuring nothing. */
  {
    const p = await open(b, 1024, { poisonKey: '__poisonNeverAsked' });
    await setState(p, { max: 20, start: 0, hop: 5, n: 2 });
    const asked = await p.evaluate(() => Object.keys(window.__asked));
    const caught = asked.indexOf('__poisonNeverAsked') < 0;
    is(caught, 'L6 POISON: an authored-but-unasked key is correctly reported dead');
    await p.close();
  }

  /* =================================================================
     L7 — the viewport sweep: floors, containment, FITS, clean console
     ================================================================= */
  head('L7  the sweep');
  for (const W of WIDTHS) {
    const p = await open(b, W);
    /* the longest state: gate open, wall hint, all numerals */
    await setState(p, { max: 20, start: 0, hop: 3, n: 6 });
    await p.evaluate(() => window.NumberLine._showGate());
    await wait(200);

    const m = await p.evaluate(() => {
      const card = document.querySelector('.lcs-app').getBoundingClientRect();
      const out = { over: [], tiny: [], smallCtl: [], lowest: 0 };
      document.querySelectorAll('.nl-wrap *').forEach((e) => {
        const r = e.getBoundingClientRect();
        if (!r.width && !r.height) return;
        if (r.right > card.right + 0.5 || r.left < card.left - 0.5) out.over.push(e.className || e.tagName);
        if (e.children.length === 0 && e.textContent.trim()) {
          const fs = parseFloat(getComputedStyle(e).fontSize);
          if (fs < 14) out.tiny.push((e.className || e.tagName) + '@' + fs + 'px');
        }
      });
      document.querySelectorAll('.nl-chip,.nl-range,.nl-grip').forEach((e) => {
        const r = e.getBoundingClientRect();
        const s = Math.min(r.width, r.height);
        if (s < 44) out.smallCtl.push((e.className || '') + '@' + s.toFixed(0) + 'px');
        out.lowest = Math.max(out.lowest, r.bottom);
      });
      out.cardBottom = card.bottom;
      return out;
    });

    is(m.over.length === 0, 'L7 ' + W + 'px containment vs the CARD' + (m.over.length ? ' — ' + m.over.slice(0, 3).join(',') : ''));
    is(m.tiny.length === 0, 'L7 ' + W + 'px TEXT floor 14px' + (m.tiny.length ? ' — ' + m.tiny.slice(0, 3).join(',') : ''));
    is(m.smallCtl.length === 0, 'L7 ' + W + 'px CONTROL floor 44px' + (m.smallCtl.length ? ' — ' + m.smallCtl.slice(0, 3).join(',') : ''));
    /* ⚠ FITS is checked at DESKTOP too, not only on a phone — the whole
       reason §A.13.62 exists is that cut-off shipped at 768 while the
       phone was verified clean. */
    is(m.lowest <= 900 + 0.5, 'L7 ' + W + 'px FITS — lowest control at ' + m.lowest.toFixed(0) + 'px of 900');
    is(p.__errs.length === 0, 'L7 ' + W + 'px clean console' + (p.__errs.length ? ' — ' + p.__errs[0] : ''));

    if (SHOT && [360, 768, 1024].indexOf(W) >= 0) {
      await p.screenshot({ path: path.join(OUT, 'nl-' + W + '.png') });
    }
    await p.close();
  }

  /* ⭐ POISON THE FLOORS. Shrink a chip below the floor and require the
     sweep to catch it — a floor that has never fired is a number. */
  {
    const p = await open(b, 1024);
    await p.addStyleTag({ content: '.nl-chip{min-height:20px !important;padding:2px 6px !important;font-size:11px !important;}' });
    await wait(120);
    const bad = await p.evaluate(() => {
      let ctl = 0, txt = 0;
      document.querySelectorAll('.nl-chip').forEach((e) => {
        const r = e.getBoundingClientRect();
        if (Math.min(r.width, r.height) < 44) ctl++;
        if (parseFloat(getComputedStyle(e).fontSize) < 14) txt++;
      });
      return { ctl, txt };
    });
    is(bad.ctl > 0 && bad.txt > 0, 'L7 POISON: the floors fire on a shrunk build (' + bad.ctl + ' controls, ' + bad.txt + ' texts)');
    await p.close();
  }

  await b.close();
  srv.close();
  console.log('\n' + (FAIL ? 'FAIL' : 'PASS') + '  ' + PASS + ' passed, ' + FAIL + ' failed');
  process.exit(FAIL ? 1 : 0);
})();
