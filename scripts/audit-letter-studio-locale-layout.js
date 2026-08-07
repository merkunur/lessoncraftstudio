#!/usr/bin/env node
/* =====================================================================
   audit-letter-studio-locale-layout.js — TOOL #25, 11 locales x 6 widths
   ---------------------------------------------------------------------
   Run:  node scripts/audit-letter-studio-locale-layout.js [--poison]

   local-test-letter-studio.js sweeps ENGLISH at six widths. This measures
   the other ten, because German compounds and Finnish cases run long and
   a gate line that fits "Class names and the printable sheets are part of
   Premium" need not fit "Die Namen aus Ihrer Klassenliste und die
   Arbeitsblätter zum Ausdrucken gehören zum Lehrer-Paket". 66 renders,
   every one measured — no sampling.

   ⭐ IT MEASURES THE EMBED, because that is the surface a teacher sees:
   the tool page pins the iframe at 256/296/348/640/704/704 for viewports
   320/360/412/768/1024/1366, and 704 from 1024 upward forever.

   ⚠ CONTAINMENT IS MEASURED AGAINST THE CARD, not the inner box: an inner
   strip with overflow-x absorbs the evidence and reports clean.

   ⚠⚠ AND EVERY EXTENT IS INTERSECTED WITH ITS CLIPPING ANCESTORS FIRST.
   `getBoundingClientRect()` reports where a box WOULD be, so every key in
   the `overflow-x:auto` picker rail counts at its laid-out position even
   after the rail has clipped it away. Measured on this very tool by a
   sibling gate: a 2591px rail inside a 1311px card, reported as escaping
   by 1280px, on a layout with nothing wrong with it. Excluding FULLY
   clipped elements is not enough either — a key straddling the edge is
   partly visible and its hidden half still overlaps whatever is beyond.

   ⚠ THE TAP FLOOR USES THE LAID-OUT RECT, THE COLLISION CHECK THE VISIBLE
   ONE. A key half-scrolled at the rail's edge can be scrolled into view
   and then tapped, so it is not too small; measuring it clipped would
   report it under-size forever and tempt you to lower the floor. A
   collision is only ever about what is on screen at the same moment.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const REAL_MINI = path.join(ROOT, 'mini tools');
const MINI = process.env.LS_TOOL_DIR || REAL_MINI;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];
const EXPECT = { 320: 256, 360: 296, 412: 348, 768: 640, 1024: 704, 1366: 704 };
const heightFor = (w) => (w >= 768 ? 1000 : 820);
const POISON = process.argv.includes('--poison');

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const harnessHtml = (src) => `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>*{box-sizing:border-box}html,body{margin:0;padding:0;background:#F7F3EA}
main{padding:16px}article{max-width:768px;margin:0 auto}
section{padding:20px 16px;background:#DBE7DF;border-radius:16px}
iframe{width:100%;border:0;display:block;height:1600px}
@media (min-width:768px){main{padding:32px}section{padding:28px 32px}}</style></head><body>
<main><article><section><iframe id="f" src="${src}" scrolling="no"></iframe></section></article></main></body></html>`;

/* =====================================================================
   THE POISON — one patch at a time, each must FAIL, control must PASS.
   ===================================================================== */
const POISON_PATCHES = [
  ['a picker key drops below the 44px control floor',
    "--ls-key:clamp(44px", "--ls-key:clamp(26px"],
  ['the gate line is allowed to run past the card',
    ".ls-gateline{font:", ".ls-gateline{width:160%;font:"],
  ['the dock stops wrapping, so long labels push each other off',
    ".ls-dock{display:flex;gap:8px;flex-wrap:wrap;", ".ls-dock{display:flex;gap:8px;flex-wrap:nowrap;"],
  ['the body text drops under the 12px legibility floor',
    ".ls-privacy{font:500 12px", ".ls-privacy{font:500 7px"]
];

if (POISON) {
  const { execFileSync } = require('child_process');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ls-layout-poison-'));
  /* ⚠ CARRY EVERY FILE THE GATE READS — the shell, the cores and the
     eleven trays, or the run fails for a reason unrelated to the patch. */
  for (const f of fs.readdirSync(REAL_MINI)) {
    if (/^(letter-studio\.(js|html)|letter-tiles-\w+\.json|lcs-shell\.(js|css)|alphabet-trace-core\.js|number-trace-core\.js|stroke-trace-core\.js)$/.test(f))
      fs.copyFileSync(path.join(REAL_MINI, f), path.join(tmp, f));
  }
  const ORIGINAL = fs.readFileSync(path.join(tmp, 'letter-studio.js'), 'utf8').replace(/\r\n/g, '\n');
  const target = path.join(tmp, 'letter-studio.js');
  const run = () => {
    try {
      execFileSync(process.execPath, [__filename], {
        env: Object.assign({}, process.env, { LS_TOOL_DIR: tmp }), encoding: 'utf8', stdio: 'pipe', timeout: 1800000
      });
      return { failed: false, out: '' };
    } catch (e) {
      if (e.signal === 'SIGTERM') return { failed: true, hung: true, out: 'HUNG' };
      return { failed: true, out: String(e.stdout || '') + String(e.stderr || '') };
    }
  };
  console.log('=== POISON: audit-letter-studio-locale-layout ===');
  fs.writeFileSync(target, ORIGINAL, 'utf8');
  const control = run();
  if (control.failed) {
    console.error('  CONTROL FAILED — the unpoisoned tmp copy does not pass; nothing below means anything.');
    console.error(control.out.split('\n').filter(l => /FAIL/.test(l)).slice(0, 8).join('\n'));
    process.exit(1);
  }
  console.log('  control: the UNPOISONED tmp copy passes');
  let holes = 0;
  for (const [label, from, to] of POISON_PATCHES) {
    if (ORIGINAL.indexOf(from) === -1) { console.error('  HARNESS FAULT — anchor missing: ' + label); holes++; continue; }
    const mutated = ORIGINAL.replace(from, to);
    if (mutated === ORIGINAL) { console.error('  HARNESS FAULT — inert: ' + label); holes++; continue; }
    fs.writeFileSync(target, mutated, 'utf8');
    const r = run();
    const fired = (r.out.match(/^\s*FAIL /gm) || []).length;
    const first = (r.out.split('\n').find(l => /^\s*FAIL /.test(l)) || '').trim();
    if (r.hung) { holes++; console.error('  HUNG (a hang is a SURVIVAL) — ' + label); }
    else if (r.failed) console.log(`  killed (${String(fired).padStart(3)} defects)  ${label}\n                     first: ${first.slice(6, 120)}`);
    else { holes++; console.error('  SURVIVED — no assertion sees: ' + label); }
  }
  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) {}
  if (holes) { console.error(`\nFAIL — ${holes} hole(s)`); process.exit(1); }
  console.log('\nPASS — every poison is caught, and the control passes');
  process.exit(0);
}

/* the strings table, for the report and for the longest-control column */
const sbx = {
  window: {}, console,
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  localStorage: { getItem: () => null, setItem() {} },
  fetch: () => ({ then() { return this; }, catch() { return this; } }),
  setTimeout: () => 0, clearTimeout() {}, Math, Date, JSON, URLSearchParams, location: { search: '' }
};
sbx.window = sbx; vm.createContext(sbx);
vm.runInContext(fs.readFileSync(path.join(MINI, 'letter-studio.js'), 'utf8'), sbx);
const T = sbx.LetterStudio;

let PASS = 0, FAIL = 0;
const bad = (m) => { FAIL++; console.error('  FAIL ' + m); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const server = http.createServer((req, res) => {
    const u = req.url.split('?')[0];
    if (u === '/harness') {
      const q = new URL(req.url, 'http://x').searchParams;
      res.setHeader('Content-Type', 'text/html');
      return res.end(harnessHtml('/mini-tools/letter-studio.html?' + (q.get('q') || '')));
    }
    const f = path.join(MINI, decodeURIComponent(u).replace(/^\/mini-tools\//, '').replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) {
        fs.readFile(path.join(REAL_MINI, path.basename(f)), (e2, b2) => {
          if (e2) { res.writeHead(404); return res.end('404'); }
          res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
          res.end(b2);
        });
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => (r.url().includes('/api/auth/me')
    ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'free' }, subscription: null }) })
    : r.continue()));

  let worstCtrl = 999, worstKey = 999, worstFont = 999, checked = 0;
  const longest = {};

  for (const loc of LOCALES) {
    for (const w of WIDTHS) {
      await page.setViewport({ width: w, height: heightFor(w) });
      await page.goto(`http://127.0.0.1:${PORT}/harness?q=${encodeURIComponent('lang=' + loc + '&embed=1')}`, { waitUntil: 'domcontentloaded' });
      const handle = await page.waitForSelector('#f', { timeout: 15000 });
      const frame = await handle.contentFrame();
      await frame.waitForSelector('.ls-svg', { timeout: 15000 });
      await wait(420);
      const box = await handle.boundingBox();
      const tag = loc + '@' + w;
      if (Math.round(box.width) !== EXPECT[w]) bad(`${tag}: the tool got ${Math.round(box.width)}px, not the ${EXPECT[w]}px the tool page gives it`);

      /* drive it into the state that carries the LONGEST strings: the word
         panel open (its input, its Go button, the class prompt) AND the
         picker expanded to every letter AND the free-tier gate line. */
      await frame.evaluate(() => {
        LetterStudio.wordOpen = true;
        LetterStudio.pickerOpen = true;
        LetterStudio.render();
      });
      await wait(360);

      const m = await frame.evaluate(() => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const shown = (e) => {
          const cs = getComputedStyle(e);
          if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        /* ⚠ THE VISIBLE RECT — intersected with every clipping ancestor */
        const vis = (e) => {
          let r = e.getBoundingClientRect();
          let out = { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
          let n = e.parentElement;
          while (n && n !== document.body) {
            const s = getComputedStyle(n);
            if (/auto|scroll|hidden/.test(s.overflowX + s.overflowY)) {
              const b = n.getBoundingClientRect();
              out.left = Math.max(out.left, b.left); out.right = Math.min(out.right, b.right);
              out.top = Math.max(out.top, b.top); out.bottom = Math.min(out.bottom, b.bottom);
            }
            n = n.parentElement;
          }
          return (out.right - out.left > 1 && out.bottom - out.top > 1) ? out : null;
        };

        /* containment: the block-level furniture, against THE CARD */
        const outside = [];
        document.querySelectorAll('.ls-wrap,.ls-picker,.ls-card,.ls-sheet,.ls-dock,.ls-pips,.ls-gateline,.ls-wordpanel,.ls-wordform,.ls-seq,.ls-privacy,.ls-todo,.ls-rosterlead')
          .forEach((e) => {
            if (!shown(e)) return;
            const r = vis(e); if (!r) return;
            if (r.right > card.right + 1 || r.left < card.left - 1) outside.push((e.className || e.tagName) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
          });

        /* tap floors: the LAID-OUT rect */
        const small = [], keySmall = [];
        document.querySelectorAll('button,input').forEach((e) => {
          if (!shown(e)) return;
          const r = e.getBoundingClientRect();
          if (r.width < 43.5 || r.height < 43.5) small.push((e.className || '') + ':' + Math.round(r.width) + 'x' + Math.round(r.height));
          if (/ls-key/.test(e.className) && (r.width < 34 || r.height < 34)) keySmall.push(e.className);
        });
        const ctrlSizes = Array.from(document.querySelectorAll('button,input')).filter(shown)
          .map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); });
        const keySizes = Array.from(document.querySelectorAll('.ls-key')).filter(shown)
          .map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); });

        /* legibility + clipped labels. ⚠ the picker RAIL is a scroller by
           design, so it is excluded — a scroller whose scrollWidth exceeds
           its clientWidth is doing its job, not clipping a label. */
        const texts = Array.from(document.querySelectorAll('.ls-gateline,.ls-privacy,.ls-todo,.ls-rosterlead,.ls-name,.ls-gatelink,.ls-wordinput'))
          .filter((e) => shown(e) && (e.textContent || e.value || '').trim());
        const minFont = texts.length ? Math.min(...texts.map((e) => parseFloat(getComputedStyle(e).fontSize))) : 99;
        const clipped = texts.filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => (e.textContent || '').trim().slice(0, 40));

        /* collisions, on VISIBLE rects only */
        const set = [];
        document.querySelectorAll('.ls-key,.ls-more,.ls-chip,.ls-primary,.ls-caseb,.ls-replay,.ls-pip,.ls-gateline,.ls-privacy,.ls-todo,.ls-rosterlead,.ls-seqch,.ls-name,.ls-wordinput,.ls-wordgo,.ls-gatelink')
          .forEach((e) => { if (!shown(e)) return; const r = vis(e); if (r) set.push({ e, r, n: e.className || e.tagName }); });
        const hits = [];
        for (let i = 0; i < set.length; i++) for (let j = i + 1; j < set.length; j++) {
          const a = set[i], b = set[j];
          if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
          const ox = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
          const oy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
          if (ox > 1 && oy > 1) hits.push(a.n + ' X ' + b.n + ' (' + Math.round(ox) + 'x' + Math.round(oy) + ')');
        }

        /* the widest CHROME control, for the per-locale report */
        const widest = Array.from(document.querySelectorAll('.ls-chip,.ls-primary,.ls-caseb,.ls-more,.ls-wordgo')).filter(shown)
          .map((e) => ({ t: (e.getAttribute('aria-label') || e.textContent || '').trim(), w: Math.round(e.getBoundingClientRect().width) }))
          .sort((a, b) => b.w - a.w)[0];

        return {
          outside, small, keySmall, clipped, minFont,
          hits: hits.slice(0, 4), widest,
          minCtrl: ctrlSizes.length ? Math.min(...ctrlSizes) : null,
          minKey: keySizes.length ? Math.min(...keySizes) : null,
          doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          gate: document.querySelectorAll('.ls-gateline').length,
          keys: document.querySelectorAll('.ls-key').length,
          appH: Math.round(document.querySelector('.lcs-app').getBoundingClientRect().height)
        };
      });

      /* ⚠ NON-VACUITY FIRST. Every measurement below is over a collection,
         and an empty collection satisfies "nothing is too small" and
         "nothing collides" perfectly. Assert the collections are populated
         before believing a single verdict about their contents. */
      if (!m.keys || m.keys < 26) bad(`${tag}: only ${m.keys} picker keys — the measurements below would be vacuous`);
      if (!m.gate) bad(`${tag}: the free-tier gate line did not render, so the longest string was never measured`);
      if (m.minCtrl === null) bad(`${tag}: no controls found at all`);

      if (m.outside.length) bad(`${tag}: outside THE CARD — ${m.outside.join(', ')}`);
      if (m.small.length) bad(`${tag}: control under the 44px floor — ${m.small.slice(0, 3).join(', ')}`);
      if (m.keySmall.length) bad(`${tag}: picker key under the 34px floor — ${m.keySmall.slice(0, 3).join(', ')}`);
      if (m.clipped.length) bad(`${tag}: clipped label(s) — "${m.clipped.join('", "')}"`);
      if (m.minFont < 12) bad(`${tag}: text at ${m.minFont}px, under the 12px legibility floor`);
      if (m.hits.length) bad(`${tag}: rendered things COLLIDE — ${m.hits.join(' | ')}`);
      if (m.doc > 0) bad(`${tag}: the page overflows sideways by ${m.doc}px`);

      if (m.minCtrl !== null) worstCtrl = Math.min(worstCtrl, m.minCtrl);
      if (m.minKey !== null) worstKey = Math.min(worstKey, m.minKey);
      worstFont = Math.min(worstFont, m.minFont);
      if (m.widest && (!longest[loc] || m.widest.w > longest[loc].w)) longest[loc] = m.widest;
      checked++; PASS++;
    }
    const L = longest[loc];
    console.log(`  ${loc}  ${WIDTHS.length} widths ok   ruling ${T.rulingFor(loc).system.padEnd(24)} widest control: "${(L ? L.t : '?').slice(0, 44)}" (${L ? L.w : 0}px)`);
  }

  await browser.close();
  server.close();
  console.log('');
  console.log(`  ${checked} renders (${LOCALES.length} locales x ${WIDTHS.length} widths, embedded exactly as the tool page embeds it)`);
  console.log(`  smallest control ${worstCtrl.toFixed(1)}px · smallest picker key ${worstKey.toFixed(1)}px · smallest text ${worstFont}px`);
  if (FAIL) { console.error(`FAIL — ${FAIL} defect(s)`); process.exit(1); }
  console.log('PASS — no locale breaks the layout at any width');
})().catch(e => { console.error(e); process.exit(1); });
