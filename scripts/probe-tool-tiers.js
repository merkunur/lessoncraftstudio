/* =====================================================================
   probe-tool-tiers.js — the raise-and-measure loop, made reusable
   ---------------------------------------------------------------------
   Run:
     node scripts/probe-tool-tiers.js --tool=rekenrek
     node scripts/probe-tool-tiers.js --tool=rekenrek --cap=1240:880,1560:1150
     node scripts/probe-tool-tiers.js --tool=wodb --locales=de,it,fi --state=gate

   ⭐ WHY THIS EXISTS. `derive-tool-wide-tiers.js` produces a STARTING POINT,
   not a shipped value — its own header now says so, because the chrome it
   subtracts is biased by whatever the union extent happens to swallow. On
   every tool fanned out so far the derived ceiling was CORRECTED here, by
   direct measurement at the tier floors, before anything shipped:
   arrow-strip's first set was 4px too big at 2400x1150 and only the probe
   said so. I had written six throwaway versions of this by the eighth tool;
   with ~38 to go, the loop is the thing worth building.

   ⭐⭐ `--cap` TESTS A CANDIDATE WITHOUT EDITING THE TOOL. It injects
   `body.<pfx>-wide .lcs-app{max-width:<px>}` at the matching floor, so a cap
   can be measured before it is written into a file, verified, bumped, synced
   and re-run. Editing first and measuring second is how a wrong number gets
   committed and then argued with.

   ⚠ THE FLOORS, NOT THE SCREENS I HAPPEN TO HAVE. A tier that fits at
   2560x1440 and busts at its own 2400x1150 minimum is a tier that works on
   my monitor and clips in a classroom. Every row here is a tier FLOOR.

   ⚠ AND IN de/it/fi, NOT ENGLISH. English is the shortest chrome in the set.
   lids' own near-miss is recorded as ITALIAN at 903 of a 900 budget, and
   measuring its chrome three ways gave de 388 / it 472 / fi 409 — German was
   not the worst. Any one locale is a sample of one.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const ROOT = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const PORT = 5619;

const argv = process.argv.slice(2);
const val = (f) => (argv.find((a) => a.indexOf('--' + f + '=') === 0) || '').split('=')[1];
const KEY = val('tool');
const LOCALES = (val('locales') || 'de,it,fi').split(',');
const STATE = val('state') || '';
const CHAIN = process.argv.indexOf('--chain') > -1;
if (!KEY) { console.error('usage: node scripts/probe-tool-tiers.js --tool=<key> [--cap=1240:1367:880,1740:1800:1150] [--locales=de,it,fi] [--state=gate]'); process.exit(1); }

/* --cap=<px>:<minWidth>:<minHeight>,... — a candidate ladder, applied in the page.
   ⚠⚠ THE WIDTH CONDITION IS NOT OPTIONAL AND THE FIRST VERSION OMITTED IT.
   A cap keyed on height alone fires at 1366x900 — the CONTROL cell, whose
   whole job is to prove nothing moves at or below 1366. The probe would then
   have shown the control moving and I would have "discovered" a neutrality
   break I had injected myself. Every real tier in this programme is keyed on
   width AND height together; the probe has to model that faithfully or it is
   measuring a layout the tool will never have. */
const CAPS = (val('cap') || '').split(',').filter(Boolean).map((s) => {
  const parts = s.split(':').map(Number);
  const px = parts[0];
  const w = parts.length >= 3 ? parts[1] : 1367;
  const h = parts.length >= 3 ? parts[2] : (parts[1] || 880);
  return { px, w, h };
});

/* the tier floors this programme uses, plus the two real classroom boards */
const CELLS = [
  { w: 1366, h: 900, note: 'CONTROL — nothing may move here' },
  { w: 1400, h: 880, note: 'Tier A floor' },
  { w: 1800, h: 1000, note: 'Tier B floor' },
  { w: 1920, h: 1080, note: 'the commonest board' },
  { w: 2400, h: 1150, note: 'Tier C floor' },
  { w: 2560, h: 1440, note: 'the operator board' }
];

const MIME = { '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer((rq, rs) => {
  const u = decodeURIComponent(rq.url.split('?')[0]);
  /* ⚠ SERVE THE IMAGE LIBRARY. A tool whose artwork 404s renders as a vast
     empty bench, which reads exactly like a sparse-at-wide defect — I filed
     one against unit-handle before noticing the harness was the cause. */
  const fp = u.indexOf('/image-library-webp/') === 0 ? path.join(PUB, u) : path.join(ROOT, u.replace('/mini-tools/', ''));
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  rs.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
  rs.end(fs.readFileSync(fp));
}).listen(PORT);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function prefixOf(key) {
  const src = fs.readFileSync(path.join(ROOT, key + '.js'), 'utf8');
  let m = /api\.el\(\s*['"]div['"]\s*,\s*['"]([a-z]+)-wrap['"]/.exec(src);
  if (m) return m[1];
  m = /getElementById\(\s*['"]([a-z]+)-style['"]/.exec(src);
  if (m) return m[1];
  const t = {};
  (src.match(/\.([a-z]{2,4})-[a-z][a-z0-9-]*\s*[,{]/g) || []).forEach((s) => {
    const p = /\.([a-z]{2,4})-/.exec(s)[1]; t[p] = (t[p] || 0) + 1;
  });
  return Object.keys(t).filter((p) => p !== 'lcs').sort((a, b) => t[b] - t[a])[0] || null;
}

/* the same union-extent the assert gate uses, so the two agree */
const PROBE = (pfx) => {
  const draws = (e) => {
    const t = e.tagName;
    /* ⚠⚠ AN EMPTY SVG OVERLAY IS NOT INK, AND COUNTING IT INFLATES THE
       APPARATUS BY WHATEVER THE OVERLAY SPANS. place-value-lab draws its
       carry/borrow arcs into a `position:absolute;inset:0` SVG that is EMPTY
       at rest — arcs are appended only while an animation runs. Counting it
       measured the apparatus at 1704px when the blocks spanned 1110px, so
       FILL reported 66.6% for a board that was really at 43.4%. Require at
       least one child element: a real drawing has geometry in it. */
    if (t === 'svg') return e.childElementCount > 0;
    if (t === 'CANVAS' || t === 'IMG') return true;
    const cs = getComputedStyle(e), bg = cs.backgroundColor;
    if (bg && bg.replace(/\s/g, '') !== 'rgba(0, 0, 0, 0)'.replace(/\s/g, '') && bg !== 'transparent') return true;
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
    if (parseFloat(cs.borderTopWidth) > 0) return true;
    return false;
  };
  const CHROME = /-(chip|foot|hint|gate|bar|controls|lock|scrim|overlay|modal|backdrop|veil)\b/;
  const app = document.querySelector('.lcs-app');
  const scope = (pfx && document.querySelector('.' + pfx + '-wrap')) || document.querySelector('.lcs-stage');
  let lo = Infinity, hi = -Infinity;
  if (scope) {
    scope.querySelectorAll('*').forEach((e) => {
      const c = String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '');
      if (CHROME.test(c) || !draws(e)) return;
      const r = e.getBoundingClientRect();
      if (!r.width || r.height <= 4) return;
      if (r.left < lo) lo = r.left;
      if (r.right > hi) hi = r.right;
    });
  }
  /* a control is only cut off if nothing can scroll to it */
  const canScrollTo = (e) => {
    let n = e.parentElement;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      if (/(auto|scroll)/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 2) return true;
      n = n.parentElement;
    }
    return false;
  };
  let unreachable = 0;
  document.querySelectorAll('button,[role="slider"],a,input,select').forEach((e) => {
    const r = e.getBoundingClientRect();
    if (r.height > 0 && !canScrollTo(e)) unreachable = Math.max(unreachable, r.bottom);
  });
  const a = app ? app.getBoundingClientRect() : null;
  return {
    cardW: a ? Math.round(a.width) : 0,
    cardH: a ? Math.round(a.height) : 0,
    cardBottom: a ? Math.round(a.bottom) : 0,
    appar: hi > lo ? Math.round(hi - lo) : 0,
    unreachable: Math.round(unreachable),
    vh: window.innerHeight, vw: window.innerWidth
  };
};

/* ⭐⭐ --chain: EVERY CAP BETWEEN THE INSTRUMENT AND THE CARD.
   part-whole-frame cost a full write-measure cycle to this. I raised
   `.pwf-sheet` from 620 to 1300 and measured 620 -> 629: the dot ramp had
   worked (`--pwf-dot` read 46px and the dot rendered 46px) while the width had
   not moved at all, because the sheet's PARENT `.pwf-col` carries its own
   `max-width:620px`. A cap on the thing you are ramping is not the only cap in
   the chain. With ~35 geometry tools to go, walking it is the first step, not
   a debugging afterthought. */
const WALK = (pfx) => {
  const draws = (e) => {
    const t = e.tagName;
    /* ⚠⚠ AN EMPTY SVG OVERLAY IS NOT INK, AND COUNTING IT INFLATES THE
       APPARATUS BY WHATEVER THE OVERLAY SPANS. place-value-lab draws its
       carry/borrow arcs into a `position:absolute;inset:0` SVG that is EMPTY
       at rest — arcs are appended only while an animation runs. Counting it
       measured the apparatus at 1704px when the blocks spanned 1110px, so
       FILL reported 66.6% for a board that was really at 43.4%. Require at
       least one child element: a real drawing has geometry in it. */
    if (t === 'svg') return e.childElementCount > 0;
    if (t === 'CANVAS' || t === 'IMG') return true;
    const cs = getComputedStyle(e), bg = cs.backgroundColor;
    if (bg && bg.replace(/\s/g, '') !== 'rgba(0,0,0,0)' && bg !== 'transparent') return true;
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
    if (parseFloat(cs.borderTopWidth) > 0) return true;
    return false;
  };
  const CHROME = /-(chip|foot|hint|gate|bar|controls|lock|scrim|overlay|modal|backdrop|veil)/;
  const scope = (pfx && document.querySelector('.' + pfx + '-wrap')) || document.querySelector('.lcs-stage');
  if (!scope) return null;
  const tally = {};
  scope.querySelectorAll('*').forEach((e) => {
    const c = String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '');
    if (!c || CHROME.test(c) || !draws(e)) return;
    const r = e.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) return;
    c.split(/\s+/).filter(Boolean).forEach((cl) => { (tally[cl] = tally[cl] || []).push(e); });
  });
  const best = Object.keys(tally).filter((k) => tally[k].length >= 3)
    .sort((a, b) => tally[b].length - tally[a].length)[0];
  if (!best) return { unit: null, rows: [] };
  /* ⭐⭐ TWO BRANCHES, NOT ONE. The walk starts from the most-REPEATED unit,
     and number-balance proved that is not always the branch that matters: I
     raised its tray and tile, read the render, and the BEAM AND PANS — the
     instrument the tool is named for — were still ~420px beside a 1320px
     tray, because `.nbal-stage` sits on a sibling branch with its own
     `width:min(100%,700px)`. Growing the supply and leaving the apparatus is
     the hollow-widening defect one level sideways, and the HOLLOW-WIDENING
     assertion passed it because the tile genuinely grew.
     So the widest inked box is walked too, and both chains are reported. */
  const widest = (() => {
    let el = null, w = 0;
    scope.querySelectorAll('*').forEach((e) => {
      const c = String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className || '');
      if (!c || CHROME.test(c) || !draws(e)) return;
      const r = e.getBoundingClientRect();
      if (r.height > 8 && r.width > w) { w = r.width; el = e; }
    });
    return el;
  })();
  const walkFrom = (start) => {
    let n = start, out = [];
    while (n && n !== document.body) {
      const cs = getComputedStyle(n);
      out.push({
        cls: String(n.className && n.className.baseVal !== undefined ? n.className.baseVal : n.className || n.tagName).slice(0, 30),
        w: Math.round(n.getBoundingClientRect().width), maxW: cs.maxWidth, width: cs.width
      });
      n = n.parentElement;
    }
    return out;
  };
  const wideRows = widest && widest !== tally[best][0] ? walkFrom(widest) : null;

  let n = tally[best][0], rows = [];
  while (n && n !== document.body) {
    const cs = getComputedStyle(n);
    rows.push({
      cls: String(n.className && n.className.baseVal !== undefined ? n.className.baseVal : n.className || n.tagName).slice(0, 30),
      w: Math.round(n.getBoundingClientRect().width),
      maxW: cs.maxWidth, width: cs.width
    });
    n = n.parentElement;
  }
  return { unit: best, rows: rows, wideRows: wideRows, wideCls: widest ? String(widest.className || '').slice(0, 30) : null };
};

(async () => {
  const pfx = prefixOf(KEY);
  if (CHAIN) {
    const b0 = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p0 = await b0.newPage();
    await p0.setViewport({ width: 2560, height: 1440 });
    await p0.goto(`http://127.0.0.1:${PORT}/${KEY}.html?lang=de`, { waitUntil: 'domcontentloaded' });
    await p0.waitForSelector('.lcs-app', { timeout: 12000 });
    await wait(600);
    const w = await p0.evaluate(WALK, pfx);
    console.log('\n' + KEY + ' — the cap chain at 2560x1440, unit `.' + (w && w.unit) + '`');
    console.log('  element                          width   max-width     css width');
    /* ⚠⚠ FLAG ANY ANCESTOR NARROWER THAN ITS PARENT, not just a `max-width`.
       The first version tested max-width only and reported number-balance as
       having NO cap anywhere — while `.nbal-tray` is `width:min(100%,700px)`,
       which binds exactly as hard. The same blind spot missed part-whole-
       frame's `.pwf-sheet`, also `width:min(100%,620px)`; I found that one by
       eye and got lucky. Narrower-than-my-parent is the property-agnostic
       test and it catches max-width, width, flex-basis and a grid track
       alike — the question is which box stops growing, not which declaration
       stopped it. The declaration is still printed, so the fix is obvious. */
    const show = (rows, label) => {
      if (!rows || !rows.length) return;
      console.log('  ' + label);
      rows.forEach((r, i) => {
        const parent = rows[i + 1];
        const binds = parent && r.w < parent.w - 2;
        const why = r.maxW !== 'none' ? 'max-width:' + r.maxW
          : (r.width && r.width !== 'auto' ? 'width:' + r.width : 'content');
        console.log('  .' + r.cls.padEnd(31) + String(r.w).padStart(5) + '   ' +
          String(r.maxW).padEnd(12) + '  ' + String(r.width).padEnd(12) +
          (binds ? '  <== BINDS (' + why + ')' : ''));
      });
    };
    show(w ? w.wideRows : null, 'WIDEST inked branch — `.' + (w && w.wideCls) + '`');
    const rows = w ? w.rows : [];
    console.log('  REPEATED-unit branch — `.' + (w && w.unit) + '`');
    rows.forEach((r, i) => {
      const parent = rows[i + 1];
      const binds = parent && r.w < parent.w - 2;
      const why = r.maxW !== 'none' ? 'max-width:' + r.maxW
        : (r.width && r.width !== 'auto' ? 'width:' + r.width : 'content');
      console.log('  .' + r.cls.padEnd(31) + String(r.w).padStart(5) + '   ' +
        String(r.maxW).padEnd(12) + '  ' + String(r.width).padEnd(12) +
        (binds ? '  <== BINDS (' + why + ')' : ''));
    });
    await b0.close();
    process.exit(0);
  }
  console.log('\n' + KEY + '   prefix .' + pfx + '-' + (CAPS.length ? '   candidate caps: ' + CAPS.map((c) => c.px + 'px above ' + c.w + 'x' + c.h).join(', ') : '   (as shipped)'));
  console.log('  loc  viewport     card        appar  card%  screen%  lowest/vh   verdict');
  console.log('  ---  -----------  ----------  -----  -----  -------  ----------  -------');
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let bad = 0, rows = 0;
  for (const loc of LOCALES) {
    for (const cell of CELLS) {
      const p = await b.newPage();
      try {
        await p.setViewport({ width: cell.w, height: cell.h });
        await p.goto(`http://127.0.0.1:${PORT}/${KEY}.html?lang=${loc}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await p.waitForSelector('.lcs-app', { timeout: 12000 });
        await wait(500);
        if (CAPS.length) {
          await p.evaluate((caps, pf) => {
            const st = document.createElement('style');
            st.textContent = caps.map((c) =>
              '@media (min-width:' + c.w + 'px) and (min-height:' + c.h + 'px){' +
              'body.' + pf + '-wide .lcs-app{max-width:min(' + c.px + 'px,96vw) !important;}}').join('');
            document.head.appendChild(st);
          }, CAPS, pfx);
          await wait(400);
        }
        /* the paid panel is the longest chrome most tools have */
        if (STATE === 'gate') {
          await p.evaluate(() => {
            const g = Object.keys(window).map((k) => window[k]).find((v) => v && typeof v === 'object' && typeof v._showGate === 'function');
            if (g) { try { g._showGate(); } catch (_) {} }
            const lock = document.querySelector('[class*="-lock"],[class*="-locked"]');
            if (lock && lock.click) lock.click();
          });
          await wait(400);
        }
        const m = await p.evaluate(PROBE, pfx);
        rows++;
        const cut = m.unreachable > m.vh + 0.5;
        if (cut) bad++;
        console.log('  ' + loc + '   ' + String(cell.w + 'x' + cell.h).padEnd(11) + '  ' +
          String(m.cardW + 'x' + m.cardH).padEnd(10) + '  ' + String(m.appar).padStart(5) + '  ' +
          String(m.cardW ? Math.round(m.appar / m.cardW * 100) + '%' : '-').padStart(5) + '  ' +
          String(m.vw ? (m.appar / m.vw * 100).toFixed(1) + '%' : '-').padStart(7) + '  ' +
          String(m.unreachable + '/' + m.vh).padStart(10) + '  ' +
          (cut ? 'CUT ' + (m.unreachable - m.vh) + 'px' : 'fits'));
      } catch (e) {
        console.log('  ' + loc + '   ' + String(cell.w + 'x' + cell.h).padEnd(11) + '  BOOT FAIL — ' + String(e).slice(0, 50));
        bad++;
      }
      await p.close();
    }
  }
  await b.close();
  console.log('\n  ' + rows + ' cells measured; ' + (bad ? bad + ' CUT OFF — back the cap off and re-run' : 'every cell fits'));
  process.exit(bad ? 1 : 0);
})();
