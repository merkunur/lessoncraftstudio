#!/usr/bin/env node
/* =====================================================================
   local-test-letter-studio.js — the LOCAL Definition-of-Done for #25.

   verify-letter-studio.js proves the glyph algebra and the source shape
   with no browser. This proves the thing a child actually touches, with
   real CDP pointer input.

   ⭐⭐ IT RENDERS IN A 704px IFRAME AS WELL AS STANDALONE, AND THAT IS
   THE POINT. `frontend/app/[locale]/tools/[tool]/page.tsx` puts the tool
   inside `<main px-4 md:px-8> <article max-w-3xl> <section px-4 md:px-8>
   <iframe width:100%>`, so the tool's own width is:

       viewport   320  360  412  768  1024  1366  1920  2560
       iframe     256  296  348  640   704   704   704   704

   — pinned at 704 from 1024 upward, forever. #41 shipped a defect
   because both of its QA renders were taken STANDALONE, where the wide
   tiers fire and the embed's never can. This harness reproduces that box
   model exactly and ASSERTS the measured width against the table above,
   so a change to the page's padding cannot silently move the surface the
   operator actually looks at.

   WHAT IS MEASURED
     L1  no child name or student id in ANY request, the whole session
     L2  ⭐ THE COMPLAINT. A 60% trace must NOT complete. A 100% trace must.
     L3  a free visitor cannot reach a roster — DOM, ?mode=names, and the
         entitlement race
     L4  the firefly walks the strokes in order, one chime each, and the
         replay control runs it again
     L5  the pips match the glyph, composed letters and digits included —
         and the crossbar seven proves the digits come from the number core
     L6  lcs:my-classes:v1 is byte-identical after a premium name session
     L7  the sweep, in BOTH surfaces: nothing outside the CARD, no two
         rendered things COLLIDE, controls >= 44px, picker keys >= 34px,
         clean console
     L8  ⭐ every control CHANGES SOMETHING ELSEWHERE. A control whose only
         effect is its own highlight is furniture.
     L9  a name we cannot fully write is never claimed as written
     L10 the print sheet is absent from a free visitor's DOM, not merely
         hidden behind a chip

   Usage: node scripts/local-test-letter-studio.js [--shot] [--poison]
   Override for the mutation harness / the poison run: LS_TOOL_DIR
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const REAL_MINI = path.join(REPO, 'mini tools');
const MINI = process.env.LS_TOOL_DIR || REAL_MINI;
const QA = path.join(REPO, 'docs', 'audit-results', 'letter-studio', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const SHOT = process.argv.includes('--shot');
const POISON = process.argv.includes('--poison');
if (SHOT) fs.mkdirSync(QA, { recursive: true });

/* deliberately unguessable, so a hit is never a coincidence. The last one
   carries a glyph the tool cannot draw (Ω is in no alphabet we ship),
   because a roster is arbitrary text and the honest handling of an
   undrawable letter has to be provable, not assumed. */
const NAMES = ['Zzyzxil', 'Qorvaxen', 'BlintaraΩ'];
const SIDS = NAMES.map((_, i) => 's_sent' + i);
const CLASS_ID = 'c_sent';
const MC_KEY = 'lcs:my-classes:v1';
const STORE_KEY = 'lcs:letter-studio:v1';

let pass = 0, fail = 0; const bad = [];
const ok = (n, c, x) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; bad.push(n); console.log('  FAIL ' + n + (x ? ' — ' + x : '')); } };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const MC_BLOB = {
  v: 1, activeClassId: CLASS_ID,
  classes: [{ id: CLASS_ID, name: 'Sentinel', students: NAMES.map((n, i) => ({ id: SIDS[i], name: n })) }],
  fairness: { [CLASS_ID]: { drawnIds: [SIDS[0]], absent: { dateKey: '2026-7-29', ids: [] }, cycleStartedAt: 1 } },
  __futureToolField: { keep: 'me' }
};

/* ---------------------------------------------------------------------
   THE EMBED HARNESS — the tool page's box model, reproduced.
   Tailwind: px-4 = 1rem, md:px-8 = 2rem, max-w-3xl = 48rem, md = 768px.
   --------------------------------------------------------------------- */
const EXPECTED_IFRAME_WIDTH = { 320: 256, 360: 296, 412: 348, 768: 640, 1024: 704, 1366: 704, 1920: 704, 2560: 704 };
const harnessHtml = (src) => `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
 *{box-sizing:border-box} html,body{margin:0;padding:0;background:#F7F3EA}
 main{padding:16px} article{max-width:768px;margin:0 auto}
 section{padding:20px 16px;background:#DBE7DF;border-radius:16px}
 iframe{width:100%;border:0;display:block;background:transparent}
 @media (min-width:768px){main{padding:32px} section{padding:28px 32px}}
</style></head><body>
<main><article><section><iframe id="f" src="${src}" scrolling="no"></iframe></section></article></main>
<script>
 var f=document.getElementById('f'); f.style.height='420px';
 addEventListener('message',function(e){
   if(!e.data||e.data.type!=='lcs-activity-resize')return;
   var h=Number(e.data.height); if(h>=320) f.style.height=Math.round(h)+'px';
 });
</script></body></html>`;

/* ---------------------------------------------------------------------
   in-page helpers, injected into EVERY document (top and framed)
   --------------------------------------------------------------------- */
function pageHelpers() {
  /* ⭐ THE VISIBLE RECT, NOT THE LAID-OUT ONE.
     The picker rail is `overflow-x:auto`. getBoundingClientRect() reports
     a child's full rect even when the rail has clipped it away, so every
     key scrolled past the rail's right edge reads as colliding with the
     More button beyond it. Excluding FULLY-clipped elements is not enough
     either — a key straddling the edge is partly visible and its
     invisible part still overlaps. Intersect with every scroll/clip
     ancestor first. */
  window.__visRect = function (e) {
    var r = e.getBoundingClientRect();
    var out = { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
    var n = e.parentElement;
    while (n && n !== document.body) {
      var s = getComputedStyle(n);
      if (/auto|scroll|hidden/.test(s.overflowX + s.overflowY)) {
        var b = n.getBoundingClientRect();
        out.left = Math.max(out.left, b.left); out.right = Math.min(out.right, b.right);
        out.top = Math.max(out.top, b.top); out.bottom = Math.min(out.bottom, b.bottom);
      }
      n = n.parentElement;
    }
    return (out.right - out.left > 1 && out.bottom - out.top > 1) ? out : null;
  };
  window.__shown = function (e) {
    var cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
    var r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  /* a stable signature of everything EXCEPT the element being clicked, so
     "the world changed" can never be satisfied by a control that only
     highlights itself */
  window.__world = function (exceptSel) {
    var skip = exceptSel ? Array.prototype.slice.call(document.querySelectorAll(exceptSel)) : [];
    var parts = [];
    var all = document.querySelectorAll('.lcs-app *');
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      var inSkip = false;
      for (var k = 0; k < skip.length; k++) if (skip[k] === e || skip[k].contains(e)) { inSkip = true; break; }
      if (inSkip) continue;
      var txt = '';
      for (var c = 0; c < e.childNodes.length; c++) if (e.childNodes[c].nodeType === 3) txt += e.childNodes[c].textContent.trim();
      parts.push(e.tagName + '.' + (e.className.baseVal !== undefined ? e.className.baseVal : e.className)
        + '#' + txt + '{' + (e.getAttribute('d') || '') + (e.getAttribute('aria-pressed') || '')
        + (e.getAttribute('aria-expanded') || '') + (e.disabled ? 'D' : '') + '}');
    }
    var store = ''; try { store = localStorage.getItem('lcs:letter-studio:v1') || ''; } catch (_) {}
    return { dom: parts.join('|'), notes: (window.__notes || []).length, store: store };
  };
  window.__notes = [];
  var AC = window.AudioContext || window.webkitAudioContext;
  if (AC) {
    var realOsc = AC.prototype.createOscillator;
    AC.prototype.createOscillator = function () {
      var o = realOsc.call(this);
      var realStart = o.start.bind(o);
      o.start = function () { window.__notes.push({ f: o.frequency.value, t: o.type }); return realStart.apply(null, arguments); };
      return o;
    };
  }
  window.__usedExfilAPI = undefined;
  var trip = function (n) { window.__usedExfilAPI = n; };
  if (navigator.sendBeacon) navigator.sendBeacon = function () { trip('sendBeacon'); return false; };
  var RealXHR = window.XMLHttpRequest;
  window.XMLHttpRequest = function () { trip('XMLHttpRequest'); return new RealXHR(); };
  window.WebSocket = function () { trip('WebSocket'); };
  window.RTCPeerConnection = function () { trip('RTCPeerConnection'); };
}

/* =====================================================================
   THE POISON — `--poison` applies each patch ALONE to a tmp copy of the
   tool and re-runs this whole suite against it. Every patch must FAIL,
   and the unpoisoned control must PASS, or a "caught" verdict below could
   just be the tmp harness breaking for an unrelated reason.
   ⚠ Each patch THROWS if its anchor is missing rather than being skipped:
   a dropped needle shrinks the denominator while the run still reports
   that everything was caught.
   ===================================================================== */
/* each entry is [label, [[from, to], …]] — a patch may need more than one
   edit, and applying only part of it is how a needle silently survives */
const POISON_PATCHES = [
  ['the autocomplete comes back — the ORIGINAL complaint', [[
    "    if (r.done) { this._drag = false; this._endStroke(ch); }",
    "    if (r.on) { var _L = this.trace.lanes[this.trace.idx]; this.trace.u = _L.total; this.trace.i = _L.pts.length - 1; this.trace.n = 999; this._drag = false; this._endStroke(ch); }"]]],
  ['the ink appears wherever the finger is, on the path or not', [[
    '    if (r.on) {\n      this.cur.push(pt);',
    '    if (true) {\n      this.cur.push(pt);']]],
  ['a mid-stroke lift wipes the ink off the screen again', [[
    'if (this.cur && this.cur.length) this._curPath.setAttribute(\'d\', this._d(this.cur));',
    '/* wiped */']]],
  ['a picker key is shrunk below the 44px control floor', [[
    "'--ls-key:clamp(44px,7.6cqi,54px);--ls-sheet:min(96cqi,440px);}'",
    "'--ls-key:clamp(24px,7.6cqi,54px);--ls-sheet:min(96cqi,440px);}'"]]],
  ['the replay control loses its consequence', [[
    "rep.addEventListener('click', function (e) { e.stopPropagation(); self._demo(); });",
    "rep.addEventListener('click', function (e) { e.stopPropagation(); rep.classList.add('ls-on'); });"]]],
  ['the selected case button is pressable and inert again', [[
    '          b.disabled = self.upper === pair[1];\n', '']]],
  ['the word Go button is live over an empty box again', [[
    "    var sync = function () { go.disabled = !(inp.value || '').trim(); };",
    '    var sync = function () { go.disabled = false; };']]],
  ['the print sheet is built for everybody — the Ctrl+P bypass', [[
    '    if (this.premium) {\n      injectLetterStudioPrintCSS();',
    '    if (true) {\n      injectLetterStudioPrintCSS();']]],
  /* ⚠ THIS NEEDLE HAS TO BREACH TWO LAYERS, and my first version breached
     only one. Patching the render gate ALONE survives — correctly so,
     because `_loadMC` still refuses to open the store without premium, so
     the roster is [] and no name chip is built. That is defence in depth
     working, and keeping it as a "survivor" would train the next reader to
     loosen a gate that is doing its job. The honest poison opens the store
     AND the render gate, so a name genuinely reaches the DOM. */
  ['the roster renders for a free visitor (BOTH layers breached)', [
    ['    if (!this.premium) return null;\n    if (this._mc) return this._mc;',
     '    if (false) return null;\n    if (this._mc) return this._mc;'],
    ['    var roster = this.rosterFor(this._loadMC(), this._classId, this.premium);\n    if (this.premium) {',
     '    var roster = this.rosterFor(this._loadMC(), this._classId, true);\n    if (true) {']]],
  ['the container rungs never fire — the sheet is 440px on every desktop', [
    ["+ '@container ls (min-width:380px){'", "+ '@container ls (min-width:99999px){'"],
    ["+ '@container ls (min-width:600px){'", "+ '@container ls (min-width:99998px){'"],
    ["+ '@container ls (min-width:960px){'", "+ '@container ls (min-width:99997px){'"]]]
];

if (POISON) {
  const { execFileSync } = require('child_process');
  const ORIGINAL = fs.readFileSync(path.join(REAL_MINI, 'letter-studio.js'), 'utf8').replace(/\r\n/g, '\n');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ls-lt-poison-'));
  const target = path.join(tmp, 'letter-studio.js');
  const run = () => {
    try {
      execFileSync(process.execPath, [__filename], {
        env: Object.assign({}, process.env, { LS_TOOL_DIR: tmp }),
        encoding: 'utf8', stdio: 'pipe', timeout: 600000
      });
      return { failed: false, out: '' };
    } catch (e) {
      if (e.signal === 'SIGTERM') return { failed: true, out: 'HUNG', hung: true };
      return { failed: true, out: String(e.stdout || '') + String(e.stderr || '') };
    }
  };
  console.log('=== POISON: local-test-letter-studio ===');
  fs.writeFileSync(target, ORIGINAL, 'utf8');
  const control = run();
  if (control.failed) {
    console.error('  CONTROL FAILED — the unpoisoned tmp copy does not pass, so nothing below means anything.');
    console.error(control.out.split('\n').filter(l => /FAIL/.test(l)).slice(0, 8).join('\n'));
    process.exit(1);
  }
  console.log('  control: the UNPOISONED tmp copy passes');
  let holes = 0;
  for (const [label, edits] of POISON_PATCHES) {
    let mutated = ORIGINAL, faulted = null;
    for (const [from, to] of edits) {
      if (mutated.indexOf(from) === -1) { faulted = 'anchor missing'; break; }
      const next = mutated.replace(from, to);
      if (next === mutated) { faulted = 'inert edit'; break; }
      mutated = next;
    }
    if (faulted) { console.error(`  HARNESS FAULT — ${faulted}: ${label}`); holes++; continue; }
    fs.writeFileSync(target, mutated, 'utf8');
    const r = run();
    const fired = (r.out.match(/^\s*FAIL /gm) || []).length;
    const first = (r.out.split('\n').find(l => /^\s*FAIL /.test(l)) || '').trim();
    if (r.failed && !r.hung) console.log(`  killed (${String(fired).padStart(3)} assertions)  ${label}\n                       first: ${first.slice(6, 116)}`);
    else if (r.hung) { holes++; console.error('  HUNG (a hang is a SURVIVAL) — ' + label); }
    else { holes++; console.error('  SURVIVED — no assertion sees: ' + label); }
  }
  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
  if (holes) { console.error(`\nFAIL — ${holes} hole(s) / harness fault(s)`); process.exit(1); }
  console.log('\nPASS — every poison is caught, and the control passes');
  process.exit(0);
}

(async () => {
  const server = http.createServer((req, res) => {
    const u = req.url.split('?')[0];
    if (u === '/harness') {
      const q = new URL(req.url, 'http://x').searchParams;
      res.setHeader('Content-Type', 'text/html');
      return res.end(harnessHtml('/mini-tools/letter-studio.html?' + (q.get('q') || '')));
    }
    const p = decodeURIComponent(u);
    const f = path.join(MINI, p.replace(/^\/mini-tools\//, '').replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      /* fall back to the real tree so a poisoned tmp dir needs only the
         file it poisons, not the whole mini-tools directory */
      if (e) {
        fs.readFile(path.join(REAL_MINI, path.basename(f)), (e2, b2) => {
          if (e2) { res.statusCode = 404; return res.end(); }
          res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
          res.end(b2);
        });
        return;
      }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  const sins = [];   /* every PII escape, across every page, whole run */

  async function newPage(o) {
    o = o || {};
    const page = await browser.newPage();
    await page.setViewport({ width: o.w || 1024, height: o.h || 900 });
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', req => {
      const hay = (req.url() + ' ' + (req.postData() || '')).toLowerCase();
      for (const n of NAMES.concat(SIDS)) if (hay.includes(n.toLowerCase()))
        sins.push(`${n} in ${req.method()} ${req.url().slice(0, 70)}`);
      if (/\/api\/auth\/me/.test(req.url())) {
        const body = JSON.stringify(o.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null });
        if (o.entDelayMs) { setTimeout(() => req.respond({ status: 200, contentType: 'application/json', body }).catch(() => {}), o.entDelayMs); return; }
        return req.respond({ status: 200, contentType: 'application/json', body });
      }
      req.continue();
    });
    await page.evaluateOnNewDocument(pageHelpers);
    await page.evaluateOnNewDocument((seed) => {
      try {
        localStorage.clear();
        if (seed.mc) localStorage.setItem(seed.mcKey, JSON.stringify(seed.mc));
        if (seed.token) localStorage.setItem('accessToken', 'harness-token');
      } catch (_) {}
    }, { mc: o.mc === undefined ? MC_BLOB : o.mc, mcKey: MC_KEY, token: !!o.premium });

    page._errs = [];
    const benign = t => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', e => { if (!benign(e.message)) page._errs.push('pageerror: ' + e.message); });
    page.on('console', m => { if (m.type() === 'error' && !benign(m.text())) page._errs.push(m.text()); });
    return page;
  }

  /* a `ctx` is whichever document the tool is in, plus where that document
     sits inside the top-level page — so one body of test code drives the
     standalone surface and the embedded one identically. */
  async function openStandalone(o, q) {
    const page = await newPage(o);
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/letter-studio.html?${q || 'lang=en'}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.ls-svg', { timeout: 12000 });
    await sleep(360);
    return { page, doc: page, off: { x: 0, y: 0 }, kind: 'standalone' };
  }
  async function openEmbedded(o, q) {
    const page = await newPage(o);
    await page.goto(`http://127.0.0.1:${PORT}/harness?q=${encodeURIComponent((q || 'lang=en') + '&embed=1')}`, { waitUntil: 'domcontentloaded' });
    const handle = await page.waitForSelector('#f', { timeout: 12000 });
    const frame = await handle.contentFrame();
    await frame.waitForSelector('.ls-svg', { timeout: 12000 });
    await sleep(420);
    const box = await handle.boundingBox();
    return { page, doc: frame, off: { x: box.x, y: box.y }, kind: 'embed', iframeWidth: Math.round(box.width) };
  }

  /* -------- the pointer rig: viewBox (0..100 x, 2..100 y) -> page px ---- */
  async function svgRect(ctx) {
    const r = await ctx.doc.evaluate(() => {
      const b = document.querySelector('.ls-svg').getBoundingClientRect();
      return { x: b.left, y: b.top, w: b.width, h: b.height };
    });
    return { x: r.x + ctx.off.x, y: r.y + ctx.off.y, w: r.w, h: r.h };
  }
  /* the tool's own inverse: y = 2 + ((clientY - top)/height)*98 */
  const toPage = (r, p) => ({ x: r.x + (p.x / 100) * r.w, y: r.y + ((p.y - 2) / 98) * r.h });

  /* a REAL drag: densely resampled, because a child's finger delivers far
     more samples than a stroke has control points and the judge counts
     on-path samples (stroke-trace-core `minSamples`). */
  async function dragAlong(ctx, pts, fraction) {
    const r = await svgRect(ctx);
    const dense = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const n = Math.max(2, Math.ceil(Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y) / 1.0));
      for (let k = 0; k < n; k++) {
        const t = k / n;
        dense.push({ x: pts[i].x + (pts[i + 1].x - pts[i].x) * t, y: pts[i].y + (pts[i + 1].y - pts[i].y) * t });
      }
    }
    dense.push(pts[pts.length - 1]);
    const cut = fraction >= 1 ? dense.length : Math.max(2, Math.round(dense.length * fraction));
    const use = dense.slice(0, cut);
    const first = toPage(r, use[0]);
    await ctx.page.mouse.move(first.x, first.y);
    await ctx.page.mouse.down();
    for (const p of use.slice(1)) { const q = toPage(r, p); await ctx.page.mouse.move(q.x, q.y); }
    await ctx.page.mouse.up();
    await sleep(260);
  }
  /* the flattened path of stroke `k` of the glyph on screen right now */
  const strokeOf = (ctx, k) => ctx.doc.evaluate((idx) => {
    const g = LetterStudio._glyph(LetterStudio._current());
    return StrokeTraceCore.flatten(g[idx]).map(p => ({ x: p.x, y: p.y }));
  }, k);
  const pickLetter = (ctx, ch) => ctx.doc.evaluate((want) => {
    const keys = LetterStudio.keys();
    const i = keys.findIndex(k => k.g === want);
    if (i < 0) return false;
    LetterStudio.index = i; LetterStudio.seq = null; LetterStudio._reset(); LetterStudio.render();
    return true;
  }, ch);

  async function shoot(ctx, n) { if (!SHOT) return; await sleep(120); await ctx.page.screenshot({ path: path.join(QA, n) }); }

  /* =================================================================
     L7 — THE SWEEP, on both surfaces
     ================================================================= */
  console.log('\nL7 — the sweep: standalone AND the 704px embed');
  const VIEWPORTS = [320, 360, 412, 768, 1024, 1366];
  const sheetWidths = { standalone: [], embed: [] };
  for (const kind of ['standalone', 'embed']) {
    for (const w of VIEWPORTS) {
      const h = w >= 768 ? 900 : 780;
      const ctx = kind === 'embed'
        ? await openEmbedded({ w, h, mc: null }, 'lang=de')
        : await openStandalone({ w, h, mc: null }, 'lang=de');
      const tag = `${kind} ${w}px`;

      if (kind === 'embed') {
        ok(`${tag} the tool's own width is ${EXPECTED_IFRAME_WIDTH[w]}px, as the tool page gives it`,
          ctx.iframeWidth === EXPECTED_IFRAME_WIDTH[w], `measured ${ctx.iframeWidth}`);
      }

      const m = await ctx.doc.evaluate(() => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const vis = (e) => window.__shown(e) && window.__visRect(e);

        /* CONTAINMENT is measured against THE CARD, never the inner box:
           an inner strip with overflow-x absorbs the evidence. */
        const outside = [];
        document.querySelectorAll('.ls-wrap, .ls-picker, .ls-card, .ls-sheet, .ls-dock, .ls-pips, .ls-gateline, .ls-wordpanel, .ls-seq, .ls-replay').forEach(e => {
          if (!window.__shown(e)) return;
          const r = e.getBoundingClientRect();
          if (r.right > card.right + 1 || r.left < card.left - 1) outside.push((e.className || '') + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
        });

        /* TAP FLOORS use the LAYOUT rect, not the visible one. A key half
           scrolled off the rail's edge can be scrolled into view and then
           tapped, so it is not too small — measuring it clipped would
           report it under-size forever and tempt you to lower the floor. */
        const small = [], keySmall = [];
        document.querySelectorAll('button, input').forEach(e => {
          if (!window.__shown(e)) return;
          const r = e.getBoundingClientRect();
          if (r.width < 43.5 || r.height < 43.5) small.push(e.className + ':' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (/ls-key/.test(e.className) && (r.width < 34 || r.height < 34)) keySmall.push(e.className);
        });

        /* COLLISION uses the VISIBLE rect, and only between things that
           must both be readable at the same moment. The `.ls-svg` canvas
           is excluded on purpose: `.ls-replay` is a deliberate overlay on
           it, and that overlap is checked separately against the LETTER. */
        const set = [];
        document.querySelectorAll('.ls-key, .ls-more, .ls-chip, .ls-primary, .ls-caseb, .ls-replay, .ls-pip, .ls-gateline, .ls-privacy, .ls-rosterlead, .ls-seqch, .ls-name, .ls-wordinput, .ls-wordgo, .ls-gatelink').forEach(e => {
          const r = vis(e); if (r) set.push({ e: e, r: r, n: e.className || e.tagName });
        });
        const hits = [];
        for (let i = 0; i < set.length; i++) for (let j = i + 1; j < set.length; j++) {
          const a = set[i], b = set[j];
          if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
          const ox = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
          const oy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
          if (ox > 1 && oy > 1) hits.push(a.n + ' X ' + b.n + ' (' + Math.round(ox) + 'x' + Math.round(oy) + ')');
        }

        /* the replay control must not park on the letter it replays */
        const hair = Array.from(document.querySelectorAll('.ls-hair')).filter(window.__shown)
          .map(e => e.getBoundingClientRect());
        const rep = document.querySelector('.ls-replay');
        let onLetter = null;
        if (rep && hair.length) {
          const rr = rep.getBoundingClientRect();
          const L = { left: Math.min(...hair.map(r => r.left)), right: Math.max(...hair.map(r => r.right)), top: Math.min(...hair.map(r => r.top)), bottom: Math.max(...hair.map(r => r.bottom)) };
          const ox = Math.min(rr.right, L.right) - Math.max(rr.left, L.left);
          const oy = Math.min(rr.bottom, L.bottom) - Math.max(rr.top, L.top);
          if (ox > 1 && oy > 1) onLetter = Math.round(ox) + 'x' + Math.round(oy);
        }

        return {
          outside, small, keySmall, hits: hits.slice(0, 5), onLetter,
          docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          rules: document.querySelectorAll('.ls-rule').length,
          hairs: document.querySelectorAll('.ls-hair').length,
          dot: document.querySelectorAll('.ls-startdot').length,
          keys: document.querySelectorAll('.ls-key').length,
          sheet: Math.round(document.querySelector('.ls-sheet').getBoundingClientRect().width),
          wrap: Math.round(document.querySelector('.ls-wrap').getBoundingClientRect().width),
          height: Math.round(document.querySelector('.lcs-app').getBoundingClientRect().height)
        };
      });

      ok(`${tag} nothing sits outside the CARD`, m.outside.length === 0, m.outside.join(' | '));
      ok(`${tag} the page does not overflow sideways`, m.docOverflow <= 0, m.docOverflow + 'px');
      ok(`${tag} every control is >= 44px`, m.small.length === 0, m.small.slice(0, 4).join(', '));
      ok(`${tag} every picker key is >= 34px`, m.keySmall.length === 0, m.keySmall.slice(0, 4).join(', '));
      ok(`${tag} no two rendered things collide`, m.hits.length === 0, m.hits.join(' | '));
      ok(`${tag} the replay control does not sit on the letter`, !m.onLetter, 'overlap ' + m.onLetter);
      ok(`${tag} the ruled guide, the letter and the start dot all render`, m.rules >= 3 && m.hairs >= 1 && m.dot === 1, `rules ${m.rules} hairs ${m.hairs} dot ${m.dot}`);
      ok(`${tag} the picker offers the locale's letters (${m.keys})`, m.keys >= 36, 'keys ' + m.keys);
      ok(`${tag} no console errors`, ctx.page._errs.length === 0, ctx.page._errs[0]);
      sheetWidths[kind].push({ w, sheet: m.sheet, wrap: m.wrap });
      if (kind === 'embed' && [360, 768, 1024].includes(w)) await shoot(ctx, `embed-${w}.png`);
      if (kind === 'standalone' && w === 360) await shoot(ctx, 'standalone-360.png');
      console.log(`       ${tag}: content ${m.height}px, sheet ${m.sheet}px in a ${m.wrap}px container, ${m.keys} keys`);
      await ctx.page.close();
    }
  }
  /* ⭐ THE SHEET MUST ACTUALLY GROW — the defect this rebuild exists to
     remove. `.ls-sheet` shipped capped flat at 420px with wide tiers keyed
     `min-width:1367px`, which inside a 704px iframe can never match, so it
     was 420px on every desktop from 1024 to 2560.
     ⚠ MY OWN SWEEP DID NOT SEE THIS. Containment, collisions and tap
     floors are all satisfied by a tiny sheet — the poison run caught the
     hole, which is what a poison run is for. The bound is read off the
     shipped CSS: the base is `--ls-sheet: min(96cqi, 440px)`, so a sheet
     WIDER than 440 in the embed proves a container rung fired. */
  {
    const base = parseFloat((/--ls-sheet:min\(96cqi,(\d+)px\)/.exec(fs.readFileSync(path.join(MINI, 'letter-studio.js'), 'utf8')) || [])[1]);
    ok('the un-rung sheet cap is readable from the shipped CSS', base > 0, 'got ' + base);
    /* ⚠ MONOTONICITY IS ASSERTED ON THE EMBED ONLY, and that is a
       measurement, not a convenience. Standalone dips 547 -> 541 between
       768 and 1024, which looks like a defect and is not: `.lcs-app` is
       capped at 720px at BOTH widths (measured, padding 0), and the sheet
       is faithfully 80cqi of its container — 0.8 x 683 = 546 and
       0.8 x 677 = 541. The 6px is a responsive padding inside
       lcs-shell.css, which is protected and not this tool's to change.
       Asserting pixel-monotonicity standalone would be measuring the
       SHELL and calling it a Letter Studio bug. */
    {
      const seq = sheetWidths.embed;
      ok(`embed: the sheet never shrinks as the surface grows (${seq.map(r => r.sheet).join(' -> ')})`,
        seq.every((r, i) => i === 0 || r.sheet >= seq[i - 1].sheet - 1));
      const s = sheetWidths.standalone;
      ok(`standalone: the sheet still tracks its container (${s.map(r => r.sheet).join(' -> ')})`,
        s[s.length - 1].sheet > s[0].sheet * 2);
    }
    const wide = sheetWidths.embed.find(r => r.w === 1024);
    ok(`embed 704px: a container rung fires — the sheet is ${wide.sheet}px, past the ${base}px un-rung cap`, wide.sheet > base);
    const narrow = sheetWidths.embed.find(r => r.w === 360);
    ok(`embed: the sheet more than doubles from the 296px surface to the 704px one (${narrow.sheet} -> ${wide.sheet})`, wide.sheet > narrow.sheet * 2);
  }

  /* =================================================================
     L2 — THE COMPLAINT
     ================================================================= */
  console.log('\nL2 — the complaint: a partial trace must NOT complete');
  {
    const ctx = await openEmbedded({ w: 1024, h: 900, mc: null }, 'lang=en');
    ok('the harness reached a one-stroke letter', await pickLetter(ctx, 'l'));
    await sleep(250);
    const s0 = await strokeOf(ctx, 0);
    await dragAlong(ctx, s0, 0.6);
    const partial = await ctx.doc.evaluate(() => ({
      formed: !!(LetterStudio.trace && LetterStudio.trace.formed),
      progress: StrokeTraceCore.progress(LetterStudio.trace),
      inked: document.querySelectorAll('.ls-ink:not(.ls-ink-live)').length,
      liveD: (document.querySelector('.ls-ink-live') || {}).getAttribute ? document.querySelector('.ls-ink-live').getAttribute('d') : null
    }));
    ok('a 60% trace does NOT form the letter', partial.formed === false);
    ok('and the work it DID do survives the lift', partial.progress > 0.4 && partial.progress < 0.85, 'progress ' + partial.progress.toFixed(3));
    ok('the ink appeared where the finger went', !!partial.liveD, 'no live ink path');

    /* now finish it */
    await dragAlong(ctx, s0, 1);
    const done = await ctx.doc.evaluate(() => ({
      formed: !!(LetterStudio.trace && LetterStudio.trace.formed),
      inked: document.querySelectorAll('.ls-ink:not(.ls-ink-live)').length,
      faded: document.querySelectorAll('.ls-hair.ls-faded').length,
      hairs: document.querySelectorAll('.ls-hair').length
    }));
    ok('a 100% trace DOES form the letter', done.formed === true);
    ok('the finished stroke is inked', done.inked >= 1, 'ink paths ' + done.inked);
    ok('and the guide steps back once the letter is written', done.faded === done.hairs && done.hairs > 0, `${done.faded}/${done.hairs} faded`);
    await shoot(ctx, 'traced-formed.png');
    await ctx.page.close();
  }
  {
    /* a wild scribble must ink NOTHING — the assertion that fails the
       moment the per-sample gate is removed */
    const ctx = await openEmbedded({ w: 1024, h: 900, mc: null }, 'lang=en');
    await pickLetter(ctx, 'l'); await sleep(250);
    const scrib = await ctx.doc.evaluate(() => {
      const g = LetterStudio._glyph(LetterStudio._current());
      const far = (p) => {
        let d = Infinity;
        for (const st of g) for (const q of StrokeTraceCore.flatten(st)) d = Math.min(d, Math.hypot(q.x - p.x, q.y - p.y));
        return d;
      };
      const out = [];
      for (let y = 8; y <= 96; y += 10) for (const x of [4, 96]) { const p = { x, y }; if (far(p) > 30) { out.push(p); break; } }
      return { pts: out, minDist: Math.min.apply(null, out.map(far)) };
    });
    ok('the scribble is provably off-path', scrib.pts.length >= 5 && scrib.minDist > 30, `${scrib.pts.length} pts, min ${Math.round(scrib.minDist)}`);
    await dragAlong(ctx, scrib.pts, 1);
    const after = await ctx.doc.evaluate(() => ({
      ink: document.querySelectorAll('.ls-ink:not(.ls-ink-live)').length,
      live: (document.querySelector('.ls-ink-live') || {}).getAttribute('d'),
      formed: !!(LetterStudio.trace && LetterStudio.trace.formed),
      text: document.body.innerText
    }));
    ok('a scribble inks NOTHING', after.ink === 0 && !after.live, `ink ${after.ink} live "${after.live}"`);
    ok('a scribble does not form the letter', after.formed === false);
    ok('and it draws no rebuke — no verdict anywhere on the page',
      !/wrong|incorrect|try again|no,/i.test(after.text), (after.text.match(/wrong|incorrect|try again/i) || [])[0]);
    await ctx.page.close();
  }

  /* =================================================================
     L8 — every control changes something ELSEWHERE
     ================================================================= */
  console.log('\nL8 — every control changes something ELSEWHERE');
  {
    const ctx = await openEmbedded({ w: 1024, h: 900, mc: null }, 'lang=de');

    /* the helper returns the world signature EXCLUDING the control itself,
       so a button whose only effect is its own highlight scores as dead —
       which is exactly what the shared liveness gate cannot see. */
    const act = async (sel, nth, label, prep) => {
      if (prep) { await prep(); await sleep(300); }
      const before = await ctx.doc.evaluate((s) => window.__world(s), sel);
      const hit = await ctx.doc.evaluate((s, n) => {
        const b = Array.from(document.querySelectorAll(s)).filter(window.__shown)[n || 0];
        if (!b || b.disabled) return false;
        b.click(); return true;
      }, sel, nth || 0);
      if (!hit) { ok(`${label} — the control is present and pressable`, false, sel + ' missing or disabled'); return; }
      await sleep(420);
      const after = await ctx.doc.evaluate((s) => window.__world(s), sel);
      ok(`${label} changes something OTHER than itself`,
        before.dom !== after.dom || before.notes !== after.notes || before.store !== after.store,
        'nothing outside ' + sel + ' moved');
    };

    await act('.ls-key', 7, 'a picker key');
    await act('.ls-more', 0, 'the show-all-letters control');
    await act('.ls-replay', 0, 'the replay control');
    await act('.ls-primary', 0, 'the primary (next letter)');
    /* the case pair: pressing the OTHER case must act */
    await act('.ls-caseb', 1, 'the capital-case control');
    await act('.ls-chip', 1, 'the word chip (opens the panel)');
    /* undo only means anything once something is drawn */
    await act('.ls-chip', 0, 'undo, after a stroke has been drawn', async () => {
      await ctx.doc.evaluate(() => { LetterStudio.wordOpen = false; LetterStudio.render(); });
      await sleep(250);
      await pickLetter(ctx, 'l'); await sleep(250);
      const s0 = await strokeOf(ctx, 0);
      await dragAlong(ctx, s0, 1);
    });

    /* ⭐ AND THE TWO CONTROLS THAT MUST NOT BE LIVE OVER NOTHING.
       A control that takes an answer to a question nobody asked is the
       recorded defect shared by draw-bag, number-sieve, measurement-bench
       and estimation-jar. Here: the already-selected case, and the word
       Go button with an empty box. */
    const inert = await ctx.doc.evaluate(() => {
      LetterStudio.wordOpen = true; LetterStudio.seq = null; LetterStudio.seqLabel = '';
      LetterStudio.upper = false; LetterStudio.render();
      const sel = Array.from(document.querySelectorAll('.ls-caseb')).find(b => /ls-on/.test(b.className));
      const go = document.querySelector('.ls-wordgo');
      const inp = document.querySelector('.ls-wordinput');
      return {
        selectedCaseDisabled: !!(sel && sel.disabled),
        selectedCaseFound: !!sel,
        goDisabled: !!(go && go.disabled),
        inputEmpty: !!(inp && !inp.value)
      };
    });
    ok('the ALREADY-SELECTED case button is disabled, not a silent no-op',
      inert.selectedCaseFound && inert.selectedCaseDisabled, 'it is pressable and does nothing');
    ok('the word Go button is disabled while the box is empty',
      inert.inputEmpty && inert.goDisabled, 'it is pressable over an empty box');
    /* and it must come ALIVE once there is a word — a permanently dead
       control would satisfy the assertion above for the wrong reason */
    const revived = await ctx.doc.evaluate(() => {
      const inp = document.querySelector('.ls-wordinput');
      inp.value = 'kuh';
      inp.dispatchEvent(new Event('input', { bubbles: true }));
      return !document.querySelector('.ls-wordgo').disabled;
    });
    ok('and it comes alive as soon as a word is typed', revived);
    await ctx.page.close();
  }

  /* =================================================================
     L4 — the firefly
     ================================================================= */
  console.log('\nL4 — the firefly walks the strokes in order');
  {
    const ctx = await openEmbedded({ w: 1024, h: 900, mc: null }, 'lang=en');
    await pickLetter(ctx, 't'); await sleep(300);
    const n = await ctx.doc.evaluate(() => {
      window.__notes.length = 0; window.__fly = [];
      const iv = setInterval(() => {
        const f = document.querySelector('.ls-firefly');
        if (f) window.__fly.push({ x: +f.getAttribute('cx'), y: +f.getAttribute('cy') });
      }, 40);
      window.__stop = () => clearInterval(iv);
      document.querySelector('.ls-replay').click();
      return LetterStudio._glyph(LetterStudio._current()).length;
    });
    await sleep(2600);
    const d = await ctx.doc.evaluate(() => { window.__stop(); return { notes: window.__notes.slice(), fly: window.__fly.slice() }; });
    ok('the replay control makes the firefly appear and travel',
      d.fly.length > 4 && (d.fly[0].x !== d.fly[d.fly.length - 1].x || d.fly[0].y !== d.fly[d.fly.length - 1].y),
      JSON.stringify(d.fly[0]) + '->' + JSON.stringify(d.fly[d.fly.length - 1]));
    ok(`one chime per stroke (${d.notes.length} for ${n})`, d.notes.length === n);
    ok('every chime is a soft sine, never an alarm', d.notes.length > 0 && d.notes.every(x => x.t === 'sine' && x.f <= 1200), JSON.stringify(d.notes));
    const gone = await ctx.doc.evaluate(() => document.querySelectorAll('.ls-firefly').length);
    ok('the firefly leaves when it is done', gone === 0);
    await ctx.page.close();
  }

  /* =================================================================
     L5 — the pips match the glyph, and the digits are the number core's
     ================================================================= */
  console.log('\nL5 — the pips match the glyph the child is shown');
  for (const [loc, ch] of [['en', 't'], ['de', 'ä'], ['da', 'ø'], ['de', 'ß']]) {
    const ctx = await openEmbedded({ w: 1024, h: 900, mc: null }, 'lang=' + loc);
    const found = await pickLetter(ctx, ch);
    ok(`${loc}: "${ch}" is in the picker`, found);
    if (!found) { await ctx.page.close(); continue; }
    await sleep(250);
    const r = await ctx.doc.evaluate(() => ({
      pips: document.querySelectorAll('.ls-pip').length,
      strokes: LetterStudio._glyph(LetterStudio._current()).length,
      roads: document.querySelectorAll('.ls-road').length
    }));
    ok(`${loc}: "${ch}" shows ${r.strokes} pips, one per stroke`, r.pips === r.strokes && r.strokes >= 1, `${r.pips} pips / ${r.strokes} strokes`);
    ok(`${loc}: "${ch}" draws one road per stroke`, r.roads === r.strokes, `${r.roads} roads`);
    await ctx.page.close();
  }
  {
    /* ⭐ THE SHIPPED DEFECT, IN THE BROWSER. The digits used to be drawn
       from number-trace-core and judged against alphabet-trace-core's
       lowercase "l". The crossbar seven is the visible tell that the
       LOCALE reaches the number core at all. */
    for (const [loc, want] of [['en', 1], ['de', 2]]) {
      const ctx = await openEmbedded({ w: 1024, h: 900, mc: null }, 'lang=' + loc);
      await pickLetter(ctx, '7'); await sleep(250);
      const r = await ctx.doc.evaluate(() => ({
        strokes: LetterStudio._glyph(LetterStudio._current()).length,
        pips: document.querySelectorAll('.ls-pip').length,
        lanes: LetterStudio.trace.lanes.length,
        isL: JSON.stringify(LetterStudio._glyph('7')) === JSON.stringify(AlphabetTraceCore.GLYPHS['l'])
      }));
      ok(`${loc}: the seven has ${want} stroke(s) and the judge agrees`, r.strokes === want && r.lanes === want && r.pips === want, JSON.stringify(r));
      ok(`${loc}: the seven is NOT being judged as a lowercase "l"`, !r.isL);
      /* and it can actually be traced */
      const g = await ctx.doc.evaluate(() => LetterStudio._glyph(LetterStudio._current()).length);
      for (let k = 0; k < g; k++) { const s = await strokeOf(ctx, k); await dragAlong(ctx, s, 1); }
      const formed = await ctx.doc.evaluate(() => !!(LetterStudio.trace && LetterStudio.trace.formed));
      ok(`${loc}: a child can actually write the seven`, formed);
      await ctx.page.close();
    }
  }

  /* =================================================================
     L3 — a free visitor cannot reach a roster
     ================================================================= */
  console.log('\nL3 — a free visitor cannot reach a roster');
  {
    const ctx = await openEmbedded({}, 'lang=en');                 /* MC seeded, free */
    const r = await ctx.doc.evaluate((names) => {
      LetterStudio.wordOpen = true; LetterStudio.render();
      return {
        html: document.documentElement.innerHTML,
        names: document.querySelectorAll('.ls-name').length,
        mcUntouched: LetterStudio._mc === null || LetterStudio._mc === undefined,
        roster: LetterStudio.rosterFor(JSON.parse(localStorage.getItem('lcs:my-classes:v1')), 'c_sent', LetterStudio.premium).length,
        leak: names.filter(n => document.documentElement.innerHTML.includes(n)),
        gate: !!document.querySelector('.ls-gateline'),
        printChip: document.querySelectorAll('.ls-psheet').length
      };
    }, NAMES);
    ok('no roster button exists, even with the panel open', r.names === 0, 'names ' + r.names);
    ok('no child name anywhere in the DOM', r.leak.length === 0, r.leak.join(','));
    ok('my-classes was never even opened', r.mcUntouched);
    ok('rosterFor refuses at the free tier', r.roster === 0);
    ok('the gate is an inline LINE, never a scrim over 25 children', r.gate);
    ok('L10 the print sheet is ABSENT from the DOM, not merely hidden', r.printChip === 0, 'psheet nodes ' + r.printChip);
    await ctx.page.close();
  }
  {
    const ctx = await openEmbedded({}, 'lang=en&mode=names');
    const r = await ctx.doc.evaluate((names) => ({
      mode: LetterStudio.mode,
      leak: names.filter(n => document.documentElement.innerHTML.includes(n))
    }), NAMES);
    ok('?mode=names is refused for a free visitor', r.mode !== 'names', r.mode);
    ok('the deep link leaks no name', r.leak.length === 0, r.leak.join(','));
    await ctx.page.close();
  }
  {
    /* THE RACE: entitlement lands late. A name must never flash first. */
    const page = await newPage({ premium: true, entDelayMs: 1500 });
    await page.goto(`http://127.0.0.1:${PORT}/harness?q=${encodeURIComponent('lang=en&mode=names&embed=1')}`, { waitUntil: 'domcontentloaded' });
    const handle = await page.waitForSelector('#f', { timeout: 12000 });
    const frame = await handle.contentFrame();
    await frame.waitForSelector('.ls-svg', { timeout: 12000 });
    let flashed = [];
    for (let i = 0; i < 12; i++) {
      const seen = await frame.evaluate((names) => names.filter(n => document.documentElement.innerHTML.includes(n)), NAMES);
      if (seen.length) flashed = flashed.concat(seen);
      await sleep(110);
    }
    ok('no name appears during the entitlement race', flashed.length === 0, flashed.join(','));
    await sleep(1400);
    const later = await frame.evaluate((names) => {
      LetterStudio.wordOpen = true; LetterStudio.render();
      return { premium: LetterStudio.premium, names: document.querySelectorAll('.ls-name').length, seen: names.filter(n => document.documentElement.innerHTML.includes(n)) };
    }, NAMES);
    ok('the subscriber does get the roster once entitlement lands', later.premium === true && later.names === NAMES.length, JSON.stringify(later));
    await page.close();
  }

  /* =================================================================
     L6 — my-classes survives a premium name session untouched
     ================================================================= */
  console.log('\nL6 — my-classes survives a premium name session untouched');
  {
    const ctx = await openEmbedded({ premium: true }, 'lang=en');
    await ctx.doc.evaluate(() => { LetterStudio.wordOpen = true; LetterStudio.render(); });
    await ctx.doc.waitForSelector('.ls-name', { timeout: 8000 });
    const before = await ctx.doc.evaluate(k => localStorage.getItem(k), MC_KEY);
    await ctx.doc.evaluate(() => document.querySelectorAll('.ls-name')[0].click());
    await sleep(400);
    const s0 = await strokeOf(ctx, 0);
    await dragAlong(ctx, s0, 1);
    const after = await ctx.doc.evaluate(k => localStorage.getItem(k), MC_KEY);
    ok('lcs:my-classes:v1 is byte-identical', before === after);
    ok('the future-tool sentinel survives', /__futureToolField/.test(after || ''));
    /* ⚠ NOT `own === null || own.length > 0`, which the previous version of
       this file asserted at :483 — that is true of every possible value and
       could not fail. What is actually claimed is that the tool wrote its
       OWN key and recorded the letter it just finished. */
    const own = await ctx.doc.evaluate(k => localStorage.getItem(k), STORE_KEY);
    let parsed = null; try { parsed = JSON.parse(own); } catch (_) {}
    ok('the tool wrote its own store, and only its own', !!parsed && typeof parsed === 'object', own);
    ok('no exfil API was ever touched', (await ctx.doc.evaluate(() => window.__usedExfilAPI)) === undefined);
    ok('L10 a subscriber DOES get the print sheet in the DOM',
      (await ctx.doc.evaluate(() => document.querySelectorAll('.ls-psheet').length)) === 1);
    await shoot(ctx, 'names-premium.png');
    await ctx.page.close();
  }

  /* =================================================================
     L9 — a name we cannot fully write is never claimed as written
     ================================================================= */
  console.log('\nL9 — an undrawable letter is never papered over');
  {
    const ctx = await openEmbedded({ premium: true }, 'lang=en');
    await ctx.doc.evaluate(() => { LetterStudio.wordOpen = true; LetterStudio.render(); });
    await ctx.doc.waitForSelector('.ls-name', { timeout: 8000 });
    const picked = await ctx.doc.evaluate((want) => {
      const b = Array.from(document.querySelectorAll('.ls-name')).find(x => x.textContent === want);
      if (b) b.click();
      return !!b;
    }, NAMES[2]);
    ok('the name with an undrawable letter is still offered', picked);
    await sleep(400);
    const r = await ctx.doc.evaluate((want) => ({
      partial: LetterStudio.seqPartial === true,
      seq: (LetterStudio.seq || []).length,
      full: [...want].length,
      skipShown: document.querySelectorAll('.ls-seqskip').length,
      shown: document.body.innerText
    }), NAMES[2]);
    ok('the tool knows it cannot write every letter', r.partial, `seq ${r.seq} of ${r.full}`);
    ok('it traces fewer letters than the name has', r.seq === r.full - 1, `${r.seq} vs ${r.full}`);
    ok('and it SHOWS the gap rather than hiding it', r.skipShown === 1, 'skip markers ' + r.skipShown);
    await ctx.page.close();
  }

  /* =================================================================
     L1 — the whole-run scanner
     ================================================================= */
  console.log('\nL1 — whole-run PII scan');
  ok('no child name or id in ANY request, whole session', sins.length === 0, sins.slice(0, 3).join(' | '));

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) { console.log('failed: ' + bad.join(' | ')); process.exit(1); }
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
