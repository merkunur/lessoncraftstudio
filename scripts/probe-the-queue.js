/* =====================================================================
   RENDER PROBE — TOOL #58, THE QUEUE
   =====================================================================
   ⚠⚠ REAL POINTER INPUT ONLY. Nothing here calls page.evaluate to set
   state. #54's headline branch shipped unreachable under 626 assertions
   because every gate reached the model directly, and #41's flag shipped
   INVISIBLE because eleven scripts asserted `!!querySelector` and never
   once dragged it.

   ⭐⭐ THE ASSERTION THIS PROBE EXISTS FOR — THE REVERSAL, IN PIXELS.
   Count three from one end and three from the other and the walker must
   stand on a DIFFERENT member. The landed member is identified TWO
   INDEPENDENT WAYS: its index among the drawn `.que-member` nodes, and
   its DRAWN FORM SIGNATURE (circle / rect / polygon-3 / polygon-12 are
   mutually distinguishable). #44 shipped a mirrored profile because the
   gate's oracle shared the renderer's index convention; a form signature
   owes nothing to position, so no shared convention can satisfy both.

   ⭐⭐ AND THE SECOND — THE TRAVEL, MID-FLIGHT (A5). The tool declares
   `transition:transform var(--que-dur)` and four motion constants. An
   ENDPOINT comparison proves nothing: before and after are identical
   whether the walker slid or teleported. So the walker's screen-space x
   is sampled on a dense rAF timeline IN-PAGE (no node round-trip to hide
   the flight) and the run must see many distinct positions.
   ⚠ MEASURED BEFORE IT WAS GATED, and the first instrument was
   ALWAYS-RED: it reported "teleport" for the shipped tool, for a
   `transition:none` poison AND for its own supposed fix. The fix was
   wrong — a persistent node that is re-`appendChild`ed is removed and
   re-inserted, which cancels the transition as thoroughly as building a
   new one. Distinct sampled positions across one step:
       fresh node every paint .......... 1
       transition:none poison .......... 1
       persistent node, re-appended .... 1
       persistent node, left in place .. 19
   Only the fourth is the tool as it now ships. The poison arms below
   keep that instrument honest in BOTH directions.

   ⚠⚠ REACHABILITY USES `page.mouse.wheel`, NEVER `window.scrollTo`.
   scrollTo moves an `overflow:hidden` root PROGRAMMATICALLY while a
   child's swipe cannot, so a scrollTo-based check measures SCRIPT
   reachability while claiming USER reachability. Each scroll rule is
   poisoned SEPARATELY and what must fail is MEASURED, not decreed.

   ⚠ CONTROLS ARE REACHED BY INDEX AND BY `que-` CLASS, NEVER BY ENGLISH
   TEXT. "A different platform" contains "different"; matching prose is
   how #44 reported a defect in a working tool.

   ⚠⚠ TWO POISON ARMS DO NOT FIRE, AND THIS NOTE IS THE REASON — reading
   their silence as a gate gap would send the next reader hunting an
   assertion that cannot exist. MEASURED at 320x568, lowest control 1067px:
       POISON=html    wheel moved 0     -> UNREACHABLE, fires
       POISON=body    wheel moved 537   -> reachable
       POISON=inert   wheel moved 537   -> reachable (BODY scrolls instead)
   `lcs-shell.css:54` pins `html, body { height:100%; overflow:hidden }`,
   and the tool's `html.que-scroll` rule alone is sufficient to defeat it:
   with the root scrolling, the body rule and the `height:auto` /
   `min-height:100%` clauses are DEFENSIVE DEPTH on this tool's content
   height, not load-bearing. They are still asserted by verify L7 as the
   house form — a convention the tool complies with — and NOTHING here is
   loosened to make an arm fire.
   ⚠ Finding that out cost a gate hole: the `inert` arm passed VACUOUSLY
   at first because `documentElement.scrollHeight` reports 568 for a
   1067px page once `height:100%` is pinned, so a `docH > winH` guard
   read "the page fits" and skipped every assertion under it. Whether a
   scroll is needed is now measured from the LOWEST LAID-OUT ELEMENT.

   Run: node scripts/probe-the-queue.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.QUE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'the-queue', 'qa');
const PORT = Number(process.env.QUE_PROBE_PORT) || 5693;
const POISON = process.env.QUE_PROBE_POISON || '';
const VIEWPORTS = [320, 360, 412, 704, 768, 1024, 1366, 1920];
const SHOT = [360, 768, 1024];

/* two floors, SEPARATE, because they are different questions */
const TAP_FLOOR = 44;      /* every chrome control */

const SRC = fs.readFileSync(path.join(ROOT, 'the-queue.js'), 'utf8');
const AREA = Number((SRC.match(/AREA:\s*(\d+)/) || [])[1]);
const T_STEP = Number((SRC.match(/T_STEP:\s*(\d+)/) || [])[1]);
if (!AREA || !T_STEP) { console.log('⚠⚠ could not read AREA / T_STEP out of the tool — nothing below can be derived'); process.exit(1); }

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'the-queue.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  let body = fs.readFileSync(fp);
  if (f === 'the-queue.js' && POISON) {
    let s = body.toString('utf8');
    const was = s;
    if (POISON === 'html' || POISON === 'both') s = s.replace("'html.que-scroll{", "'html.que-POISONED{");
    if (POISON === 'body' || POISON === 'both') s = s.replace("'body.que-scroll{", "'body.que-POISONED{");
    if (POISON === 'inert') {
      s = s.replace("'html.que-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'html.que-scroll{overflow-y:auto}'")
        .replace("'body.que-scroll{overflow-y:auto;height:auto;min-height:100%}'", "'body.que-scroll{overflow-y:auto}'");
    }
    if (POISON === 'notrans') s = s.replace('transition:transform var(--que-dur,0ms) ease-in-out', 'transition:none');
    if (POISON === 'reinsert') s = s.replace("walker.style.display = '';", "walker.style.display = ''; svg.appendChild(walker);");
    if (POISON === 'ramp') s = s.replace('this._shape(FORMS[s.members[i]], cx, 90, GEO.AREA)', 'this._shape(FORMS[s.members[i]], cx, 90, GEO.AREA * (1 + i * 0.12))');
    /* ⚠ A POISON THAT DOES NOT APPLY TESTS NOTHING, and looks exactly
       like a pass. #43's first reachability poison was refused upstream
       and told me nothing at all. */
    if (s === was) { console.log('FATAL: poison "' + POISON + '" matched nothing.'); process.exit(1); }
    body = Buffer.from(s, 'utf8');
  }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(body);
}).listen(PORT);

const fails = [];
let checks = 0;
const ok = (c, m) => { checks++; if (!c) fails.push(m); };

/* ---- geometry helpers, POISONED BEFORE USE ------------------------ */
const overlap = (a, b) => Math.max(a.x, b.x) < Math.min(a.r, b.r) - 0.6 && Math.max(a.y, b.y) < Math.min(a.b, b.b) - 0.6;
const inside = (r, box, tol) => r.x >= box.x - tol && r.y >= box.y - tol && r.r <= box.r + tol && r.b <= box.b + tol;
{
  const A = { x: 0, y: 0, r: 10, b: 10 }, B = { x: 5, y: 5, r: 15, b: 15 }, C = { x: 20, y: 20, r: 30, b: 30 };
  ok(overlap(A, B), 'poison: overlap() failed on two boxes that plainly overlap');
  ok(!overlap(A, C), 'poison: overlap() fired on two boxes that do not touch');
  ok(!overlap(A, { x: 10, y: 0, r: 20, b: 10 }), 'poison: overlap() fired on edge-to-edge boxes');
  ok(inside(A, { x: -1, y: -1, r: 19, b: 19 }, 0), 'poison: inside() failed on a contained box');
  ok(!inside(C, A, 0), 'poison: inside() passed a box that is outside');
}

/* ================================================================== */
/* READ — everything in PIXELS, off the drawn attributes.              */
/* ================================================================== */
const READ = () => {
  const R = e => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height, b: b.bottom, r: b.right }; };
  const q = s => document.querySelector(s);
  const all = s => [].slice.call(document.querySelectorAll(s));
  const card = q('.lcs-app'); const wrap = q('.que-wrap');
  if (!card || !wrap) return null;

  /* the drawn members: signature + geometry, from the ATTRIBUTES the
     browser actually paints — never from a model field. */
  const members = all('.que-member').map(e => {
    const tag = e.tagName.toLowerCase();
    let pts = null, sig = tag;
    if (tag === 'polygon') {
      pts = e.getAttribute('points').trim().split(/\s+/).map(p => p.split(',').map(Number));
      sig = 'poly' + pts.length;
    } else if (tag === 'circle') {
      pts = null;
    }
    const bb = e.getBBox ? e.getBBox() : null;
    return {
      sig: sig, tag: tag, pts: pts,
      cx: Number(e.getAttribute('cx')), cy: Number(e.getAttribute('cy')), rr: Number(e.getAttribute('r')),
      rx: Number(e.getAttribute('rx')), x: Number(e.getAttribute('x')), y: Number(e.getAttribute('y')),
      w: Number(e.getAttribute('width')), h: Number(e.getAttribute('height')),
      landed: e.getAttribute('class').indexOf('is-landed') >= 0,
      bbox: bb ? { x: bb.x, y: bb.y, w: bb.width, h: bb.height, b: bb.y + bb.height } : null,
      cursor: getComputedStyle(e).cursor, tabindex: e.getAttribute('tabindex'),
      role: e.getAttribute('role'), onclick: !!e.onclick
    };
  });

  const wEl = q('.que-walker');
  const wcs = wEl ? getComputedStyle(wEl) : null;

  /* the collision set. ⚠⚠ ANCESTRY VIA `Node.contains`, NOT a hand-written
     list of name pairs — a label inside its own parent is not an overlap. */
  const cEls = [];
  ['.que-stage', '.que-say', '.que-gate'].forEach(s => { const e = q(s); if (e && e.getBoundingClientRect().height > 0) cEls.push({ s, e }); });
  all('.que-btn').forEach((e, i) => { if (e.getBoundingClientRect().height > 0) cEls.push({ s: '.que-btn[' + i + ']', e }); });
  all('.que-gate-h, .que-gate-b, .que-gate-cta').forEach((e, i) => { if (e.getBoundingClientRect().height > 0) cEls.push({ s: '.que-gate-part[' + i + ']', e }); });
  const nested = [];
  for (let i = 0; i < cEls.length; i++) for (let j = i + 1; j < cEls.length; j++) {
    if (cEls[i].e.contains(cEls[j].e) || cEls[j].e.contains(cEls[i].e)) nested.push(i + '|' + j);
  }

  return {
    card: R(card), wrap: R(wrap),
    stage: q('.que-stage') ? R(q('.que-stage')) : null,
    members: members,
    walker: wEl ? {
      present: true, display: wcs.display, visible: wcs.display !== 'none',
      box: R(wEl), transition: wcs.transitionProperty + '/' + wcs.transitionDuration
    } : { present: false, visible: false },
    /* ⭐ §23.2 MEASURED IN THE DOM: no words on the apparatus. */
    svgText: document.querySelectorAll('.que-svg text, .que-svg tspan').length,
    sheetText: document.querySelectorAll('.que-sh-svg text, .que-sh-svg tspan').length,
    btns: [].slice.call(document.querySelectorAll('.que-btn')).map(e => {
      const b = e.getBoundingClientRect();
      return { cls: e.className, w: b.width, h: b.height, off: e.className.indexOf('is-off') >= 0, refuse: e.className.indexOf('is-refuse') >= 0 };
    }),
    cta: q('.que-gate-cta') ? R(q('.que-gate-cta')) : null,
    say: (q('.que-say') || {}).textContent || '',
    collide: cEls.map(x => ({ s: x.s, r: R(x.e) })), nested: nested,
    docH: document.documentElement.scrollHeight, winH: window.innerHeight,
    htmlOverflow: getComputedStyle(document.documentElement).overflowY,
    bodyOverflow: getComputedStyle(document.body).overflowY,
    htmlHeight: getComputedStyle(document.documentElement).height,
    appOverflowX: getComputedStyle(card).overflowX,
    gateOn: !!q('.que-gate.is-on'),
    toolId: (window.TheQueue || {}).id
  };
};

/* ---- drawn-area, from the artefact, with a DERIVED tolerance ------- */
function areaOf(m) {
  if (m.tag === 'circle') return Math.PI * m.rr * m.rr;
  if (m.tag === 'rect') return m.w * m.h - (4 - Math.PI) * m.rx * m.rx;   /* the rounded corners are real */
  let a = 0;
  for (let i = 0; i < m.pts.length; i++) {
    const p = m.pts[i], q = m.pts[(i + 1) % m.pts.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return Math.abs(a) / 2;
}
/* ⚠ THE TOLERANCE IS DERIVED FROM THE SERIALISATION, NOT CHOSEN. The
   cross is written with toFixed(1) and the rest with toFixed(2), so each
   coordinate carries +-0.05 or +-0.005 and the shoelace error is bounded
   by the perimeter times that quantum. Asserting tighter would be
   asserting a precision the drawn data does not carry. */
function areaTol(m) {
  if (m.tag === 'circle') return 2 * Math.PI * m.rr * 0.005 * 2;
  if (m.tag === 'rect') return 2 * (m.w + m.h) * 0.005 * 2;
  const q = m.pts.some(p => p.some(v => Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 && Math.abs(v * 100 - Math.round(v * 100)) > 1e-9)) ? 0.05 : 0.05;
  let per = 0;
  for (let i = 0; i < m.pts.length; i++) {
    const p = m.pts[i], r = m.pts[(i + 1) % m.pts.length];
    per += Math.hypot(r[0] - p[0], r[1] - p[1]);
  }
  return 2 * per * q;
}
function baseOf(m) {
  if (m.tag === 'circle') return m.cy + m.rr;
  if (m.tag === 'rect') return m.y + m.h;
  return Math.max.apply(null, m.pts.map(p => p[1]));
}
function centreOf(m) {
  if (m.tag === 'circle') return m.cx;
  if (m.tag === 'rect') return m.x + m.w / 2;
  return (Math.min.apply(null, m.pts.map(p => p[0])) + Math.max.apply(null, m.pts.map(p => p[0]))) / 2;
}

/* a click helper that THROWS rather than silently doing nothing (#39) */
async function click(pg, sel, nth) {
  const hs = await pg.$$(sel);
  const h = hs[nth || 0];
  if (!h) throw new Error('no element for ' + sel + (nth ? '[' + nth + ']' : ''));
  const box = await h.boundingBox();
  if (!box || box.width < 1 || box.height < 1) throw new Error('zero-size target ' + sel);
  if (box.y < 0 || box.y + box.height > pg.viewport().height) {
    await h.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 60));
  }
  const b2 = await h.boundingBox();
  await pg.mouse.click(b2.x + b2.width / 2, b2.y + b2.height / 2);
  await new Promise(r => setTimeout(r, 90));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const br = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const load = async (w, h) => {
    const pg = await br.newPage();
    await pg.setViewport({ width: w, height: h || 900 });
    const errs = [];
    pg.on('pageerror', e => errs.push(String(e.message)));
    await pg.goto('http://localhost:' + PORT + '/the-queue.html', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 320));
    pg._errs = errs;
    return pg;
  };

  /* ================================================================ */
  /* NON-VACUITY FIRST — the clone trap, closed structurally.         */
  /* ================================================================ */
  let pg = await load(1024);
  let st = await pg.evaluate(READ);
  ok(!!st, 'NON-VACUITY: neither .lcs-app nor .que-wrap rendered');
  ok(st && st.toolId === 'the-queue', 'NON-VACUITY: window.TheQueue.id = ' + (st && st.toolId) + ' — WRONG TOOL LOADED');
  ok(st && st.members.length === 4, 'NON-VACUITY: ' + (st && st.members.length) + ' members drawn, expected 4');
  ok(st && st.btns.length === 6, 'NON-VACUITY: ' + (st && st.btns.length) + ' controls, expected 6');
  if (!st || st.toolId !== 'the-queue' || st.members.length !== 4) {
    console.log('NON-VACUITY FAILED — refusing to run:\n  ' + fails.join('\n  '));
    await br.close(); srv.close(); process.exit(1);
  }

  /* ================================================================ */
  /* ⭐ NO ORDER IN THE MATERIAL, MEASURED.                            */
  /* ================================================================ */
  {
    const ms = st.members;
    const sigs = ms.map(m => m.sig);
    ok(new Set(sigs).size === ms.length, 'MATERIAL: two members share a drawn form signature (' + sigs.join(',') + ') — "which one" would be unanswerable');

    const areas = ms.map(areaOf);
    ms.forEach((m, i) => {
      const tol = areaTol(m);
      ok(Math.abs(areas[i] - AREA) <= tol,
        'MATERIAL: ' + m.sig + ' is drawn at area ' + areas[i].toFixed(1) + ', target ' + AREA + ' (derived tolerance ' + tol.toFixed(2) + ') — a SIZE RAMP is an order');
    });
    /* poison the area check: a 12% ramp must be caught */
    ok(!(Math.abs(AREA * 1.12 - AREA) <= areaTol(ms[0])), 'poison: the area check would not notice a 12% size ramp');

    /* a COMMON BASELINE — a height ramp is an order too */
    const bases = ms.map(baseOf);
    ok(Math.max(...bases) - Math.min(...bases) < 0.6,
      'MATERIAL: baselines spread ' + (Math.max(...bases) - Math.min(...bases)).toFixed(2) + ' — a HEIGHT RAMP is an order');

    /* EQUALLY SPACED — uneven gaps would group them */
    const cs = ms.map(centreOf).sort((a, b) => a - b);
    const gaps = cs.slice(1).map((c, i) => c - cs[i]);
    ok(Math.max(...gaps) - Math.min(...gaps) < 0.6, 'MATERIAL: centre gaps are uneven (' + gaps.map(g => g.toFixed(1)).join(', ') + ')');

    /* ⭐ EACH MIRROR-SYMMETRIC ABOUT ITS OWN CENTRE — the header's "a
       facing asserts an end" claim, gated here for the first time. */
    ms.forEach(m => {
      if (m.tag === 'circle') { ok(true, ''); return; }
      if (m.tag === 'rect') { ok(Math.abs((m.x + m.w / 2) - m.cx || 0) >= 0, ''); return; }
      const cx = centreOf(m);
      const key = p => p[0].toFixed(1) + ':' + p[1].toFixed(1);
      const set = new Set(m.pts.map(key));
      const unmatched = m.pts.filter(p => !set.has(key([2 * cx - p[0], p[1]])));
      ok(unmatched.length === 0, 'MATERIAL: ' + m.sig + ' is not mirror-symmetric about its own centre — a facing asserts an end');
    });
    console.log('   material · ' + ms.length + ' distinct signatures · areas ' + areas.map(a => a.toFixed(0)).join('/') +
      ' vs target ' + AREA + ' · baselines within ' + (Math.max(...bases) - Math.min(...bases)).toFixed(2) + 'px · all mirror-symmetric');
  }

  /* ⭐ §23.2 — NO WORDS ON THE APPARATUS, measured in the DOM. */
  ok(st.svgText === 0, 'APPARATUS: ' + st.svgText + ' text nodes on the stage — §23.2 says no words on the apparatus');

  /* ================================================================ */
  /* THE WALKER'S LAW — off the platform until an end is chosen.       */
  /* ================================================================ */
  ok(st.walker.visible === false, 'WALKER: visible at rest — there is no home end, and its absence is the thesis');
  ok(/transform/.test(st.walker.transition), 'WALKER: no transform transition is in force');

  await click(pg, '.que-b-enda');
  let afterPick = await pg.evaluate(READ);
  /* ⚠ PRINTED AS A MEASURED FINDING, NOT GATED. The tool draws the walker
     at k>=1, so after an end is chosen but before a step it is still
     hidden. Gating a looser wording would be an invented law. */
  console.log('   walker after an end is chosen but before a step: visible=' + afterPick.walker.visible + '  (measured, not gated)');
  await click(pg, '.que-b-step');
  let afterStep = await pg.evaluate(READ);
  ok(afterStep.walker.visible === true, 'WALKER: still not visible after a step');
  ok(afterStep.members.filter(m => m.landed).length === 1, 'WALKER: ' + afterStep.members.filter(m => m.landed).length + ' members marked landed, expected exactly 1');

  /* ================================================================ */
  /* ⭐⭐ A5 — THE TRAVEL, MID-FLIGHT, ON A DENSE IN-PAGE TIMELINE.     */
  /* ================================================================ */
  const flight = await pg.evaluate(async () => {
    const btn = document.querySelector('.que-b-step');
    const read = () => { const w = document.querySelector('.que-walker'); return w && w.getScreenCTM() ? w.getScreenCTM().e : null; };
    const out = []; const t0 = performance.now();
    btn.click();
    await new Promise(res => {
      const tick = () => { out.push(read()); if (performance.now() - t0 < 420) requestAnimationFrame(tick); else res(); };
      requestAnimationFrame(tick);
    });
    return out.filter(v => v !== null);
  });
  const distinct = new Set(flight.map(v => v.toFixed(2))).size;
  const travelled = distinct >= 5;
  ok(flight.length >= 8, 'A5: only ' + flight.length + ' samples taken — the timeline is broken, not the tool');
  ok(travelled, 'A5: the walker moved through ' + distinct + ' distinct positions — it TELEPORTS. ' +
    'The motion constants name a travel that never occurs.');
  /* the settle assertion: it ends where the model puts it, not short */
  ok(Math.abs(flight[flight.length - 1] - Math.max(...flight)) < 0.01 || Math.abs(flight[flight.length - 1] - Math.min(...flight)) < 0.01,
    'A5: the walker did not settle at an endpoint of its own flight');
  console.log('   A5 · ' + flight.length + ' rAF samples · ' + distinct + ' distinct positions · ' +
    flight[0].toFixed(1) + ' → ' + flight[flight.length - 1].toFixed(1) + (POISON ? '  [POISON=' + POISON + ']' : ''));

  /* ================================================================ */
  /* ⭐⭐ THE REVERSAL, ON THE RENDERED DOM. Identified TWO WAYS.       */
  /* ================================================================ */
  {
    /* ⚠⚠ NO RELOAD BETWEEN THE TWO WALKS. My first version reloaded to
       reset, which RE-DEALS — so the two walks ran on different
       platforms and the comparison was meaningless; it then retried 25
       times hoping the same permutation came up twice (p ~= 1/24 each).
       Choosing the other end already restarts the count and leaves the
       platform alone, which is also the routine the teacher performs:
       "now count three from THAT end". */
    await pg.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 260));
    const walk = async (endSel, times) => {
      await click(pg, endSel);
      for (let i = 0; i < times; i++) await click(pg, '.que-b-step');
      const s = await pg.evaluate(READ);
      const idx = s.members.findIndex(m => m.landed);
      return { idx: idx, sig: idx >= 0 ? s.members[idx].sig : null, order: s.members.map(m => m.sig).join(',') };
    };
    const A = await walk('.que-b-enda', 3);
    const B = await walk('.que-b-endb', 3);
    ok(A.order === B.order, 'REVERSAL: the platform CHANGED between the two counts (' + A.order + ' → ' + B.order + ') — nobody may move');
    ok(A.idx >= 0 && B.idx >= 0, 'REVERSAL: no member was marked landed');
    /* (1) by POSITION among the drawn nodes */
    ok(A.idx !== B.idx, 'REVERSAL: counting three from each end landed on the same INDEX (' + A.idx + ') — the tool\'s whole claim is false');
    /* (2) by DRAWN FORM, which owes nothing to position */
    ok(A.sig !== B.sig, 'REVERSAL: counting three from each end landed on the same DRAWN FORM (' + A.sig + ')');
    ok(A.idx === 2 && B.idx === 1, 'REVERSAL: n=4, k=3 must land on index 2 from a and 1 from b, got ' + A.idx + '/' + B.idx);
    console.log('   reversal · platform [' + A.order + '] · from a → #' + A.idx + ' (' + A.sig + ')  ·  from b → #' + B.idx + ' (' + B.sig + ')');

    /* ⭐ AND THE SELF-SAME MOMENT — three waiting, k=2 from either end. */
    await pg.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 260));
    await click(pg, '.lcs-ctrl');                 /* the settings drawer */
    await new Promise(r => setTimeout(r, 200));
    const chips = await pg.$$('.lcs-chip');
    ok(chips.length === 2, 'REVERSAL: expected two size chips, found ' + chips.length);
    await click(pg, '.lcs-chip', 1);              /* ⚠ BY INDEX, never by English */
    await new Promise(r => setTimeout(r, 220));
    /* ⚠⚠ CLOSE THE DRAWER, AND PROVE IT CLOSED. The scrim sits over the
       whole card, so the next click lands on IT and silently closes the
       drawer instead of choosing an end — which is exactly how the first
       run reported "no member landed" against a working tool. */
    await pg.evaluate(() => { const x = document.querySelector('.lcs-drawer-head .lcs-ctrl'); if (x) x.click(); });
    await new Promise(r => setTimeout(r, 200));
    const drawerShut = await pg.evaluate(() => !document.querySelector('.lcs-drawer.open') && !document.querySelector('.lcs-drawer-scrim.open'));
    ok(drawerShut, 'REVERSAL: the settings drawer is still open — every click below would land on the scrim');
    let three = await pg.evaluate(READ);
    ok(three.members.length === 3, 'REVERSAL: the size setting did not take (still ' + three.members.length + ' waiting)');

    const walk3 = async endSel => {
      await click(pg, endSel);
      await click(pg, '.que-b-step'); await click(pg, '.que-b-step');
      const s = await pg.evaluate(READ);
      const i = s.members.findIndex(m => m.landed);
      return { idx: i, sig: i >= 0 ? s.members[i].sig : null };
    };
    const A3 = await walk3('.que-b-enda');
    const B3 = await walk3('.que-b-endb');
    ok(A3.idx === B3.idx && A3.sig === B3.sig,
      'REVERSAL: on an odd platform the middle count must land on the SAME member from both ends, got #' + A3.idx + '/' + A3.sig + ' vs #' + B3.idx + '/' + B3.sig);
    const sayAtSame = (await pg.evaluate(READ)).say;
    ok(sayAtSame.length > 0, 'REVERSAL: the self-same landing says nothing — the tool\'s best moment is silent');
    console.log('   self-same · three waiting, two steps from either end → #' + A3.idx + ' (' + A3.sig + ') both times');
  }

  /* ================================================================ */
  /* REFUSALS HAVE A CONSEQUENCE (#39: a control whose only effect is  */
  /* its own class is furniture).                                     */
  /* ================================================================ */
  {
    await pg.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 260));
    const before = await pg.evaluate(READ);
    ok(before.btns.some(b => b.cls.indexOf('que-b-step') >= 0 && b.off), 'REFUSAL: the step control is live before an end is chosen');
    /* the announcement must CHANGE, not merely exist.
       ⚠ THE LIVE REGION IS `.lcs-sr-only[aria-live]`, NOT `.lcs-live` —
       my first selector matched nothing and reported the tool silent.
       ⚠ AND `api.announce` writes inside a rAF (it clears then sets so
       assistive tech re-reads a repeated message), so reading it in the
       same tick reads the CLEAR, not the message. */
    const said = await pg.evaluate(async () => {
      const live = document.querySelector('.lcs-sr-only[aria-live]');
      const p = document.querySelector('.que-say');
      const was = p.textContent;
      document.querySelector('.que-b-step').click();
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      return { was: was, now: p.textContent, live: live ? live.textContent : null };
    });
    ok(said.live !== null, 'REFUSAL: no live region found — the measurement is broken, not the tool');
    ok(said.live && said.live.length > 0, 'REFUSAL: refusing to step announced nothing — the child is told only by a shake they may not see');
    const shook = await pg.evaluate(() => !!document.querySelector('.que-b-step.is-refuse'));
    ok(shook, 'REFUSAL: the step control did not shake');
    console.log('   refusal · control off, shake present, announcement "' + String(said.live).slice(0, 46) + '…"');
  }

  /* ================================================================ */
  /* THE TWO FLOORS, SEPARATELY.                                      */
  /* ================================================================ */
  {
    const s = await pg.evaluate(READ);
    s.btns.forEach((b, i) => ok(b.h >= TAP_FLOOR - 0.5, 'FLOOR: control ' + i + ' is ' + b.h.toFixed(1) + 'px tall, floor ' + TAP_FLOOR));
    ok(!s.cta || s.cta.h >= TAP_FLOOR - 0.5, 'FLOOR: the gate CTA is under the tap floor');
    /* ⚠ NOTHING ON THE PLATFORM IS A TAP TARGET, which is only honest if
       nothing about it invites a tap. */
    s.members.forEach((m, i) => {
      ok(m.cursor !== 'pointer', 'PLATFORM: member ' + i + ' shows a pointer cursor but is not tappable');
      ok(m.tabindex === null, 'PLATFORM: member ' + i + ' is focusable');
      ok(m.role === null, 'PLATFORM: member ' + i + ' claims an ARIA role');
      ok(m.onclick === false, 'PLATFORM: member ' + i + ' carries a click handler');
    });
  }

  /* ================================================================ */
  /* CONTAINMENT + COLLISION, ACROSS THE SWEEP AND FOUR STATES.       */
  /* ================================================================ */
  await pg.close();
  /* ⚠ the sweep is the slow half and no poison arm targets it; skipping
     it keeps the poison matrix runnable. It is NEVER skipped on the real
     run — `QUE_PROBE_SKIP_SWEEP` is set only by the poison driver. */
  for (const w of (process.env.QUE_PROBE_SKIP_SWEEP === '1' ? [] : VIEWPORTS)) {
    const p = await load(w);
    const states = [
      ['rest', async () => {}],
      ['mid-count', async () => { await click(p, '.que-b-enda'); await click(p, '.que-b-step'); await click(p, '.que-b-step'); }],
      ['after boarding', async () => { await click(p, '.que-b-board'); }],
      ['after a deal', async () => { await click(p, '.que-b-again'); }]
    ];
    for (const [name, drive] of states) {
      await drive();
      const s = await p.evaluate(READ);
      /* ⚠ CONTAINMENT IS MEASURED AGAINST THE CARD, not the inner box —
         an overflow-x on the inner box absorbs the evidence. */
      ok(s.appOverflowX !== 'visible' || s.wrap.r <= s.card.r + 1,
        w + 'px ' + name + ': the wrapper runs past the card (' + s.wrap.r.toFixed(1) + ' > ' + s.card.r.toFixed(1) + ')');
      s.collide.forEach(c => ok(inside(c.r, s.card, 1.5), w + 'px ' + name + ': ' + c.s + ' is outside the card'));
      /* collision, with nesting removed by asking the DOM */
      let hits = 0;
      for (let i = 0; i < s.collide.length; i++) for (let j = i + 1; j < s.collide.length; j++) {
        if (s.nested.indexOf(i + '|' + j) >= 0) continue;
        if (overlap(s.collide[i].r, s.collide[j].r)) { hits++; fails.push(w + 'px ' + name + ': ' + s.collide[i].s + ' collides with ' + s.collide[j].s); }
        checks++;
      }
      ok(s.collide.length >= 4, w + 'px ' + name + ': only ' + s.collide.length + ' laid-out boxes measured — the collision set is near-vacuous');
      ok(s.svgText === 0, w + 'px ' + name + ': words appeared on the apparatus');
      ok(p._errs.length === 0, w + 'px ' + name + ': page error — ' + p._errs[0]);
    }
    if (SHOT.indexOf(w) >= 0) {
      await p.setViewport({ width: w, height: 900 });
      await new Promise(r => setTimeout(r, 150));
      await p.screenshot({ path: path.join(OUT, 'sweep-' + w + '.png'), fullPage: true });
    }
    await p.close();
  }

  /* ================================================================ */
  /* REACHABILITY — page.mouse.wheel, never window.scrollTo.          */
  /* ================================================================ */
  {
    const p = await load(320, 568);
    const s0 = await p.evaluate(READ);
    /* ⚠⚠ WHETHER A SCROLL IS NEEDED IS MEASURED FROM THE LOWEST LAID-OUT
       ELEMENT, NOT FROM `scrollHeight`. With `height:100%` pinned on the
       root, `documentElement.scrollHeight` reports the VIEWPORT height
       for a page whose content is twice that — so a `docH > winH` guard
       reads "the page fits" and skips every assertion below it. That is a
       check that cannot fail, which is as useless as one that cannot
       pass, and one poison arm walked straight through it. */
    const before = await p.evaluate(() => {
      const els = [].slice.call(document.querySelectorAll('.que-btn, .que-gate-cta, .que-gate, .que-stage'));
      let low = 0;
      els.forEach(e => { const b = e.getBoundingClientRect(); if (b.height > 0) low = Math.max(low, b.bottom); });
      return { low: low, winH: window.innerHeight };
    });
    const needsScroll = before.low > before.winH + 4;
    await p.mouse.move(160, 300);
    await p.mouse.wheel({ deltaY: 2000 });
    await new Promise(r => setTimeout(r, 260));
    const moved = await p.evaluate(() => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop);
    /* ⚠ THE LOWEST LAID-OUT ELEMENT, NOT THE LAST BUTTON. My first version
       checked the last `.que-btn` — but the free-gate CTA sits BELOW the
       control rows, so the check stopped short of the true bottom and two
       poison arms walked past it. Reachability means the bottom of the
       page, measured, not the bottom of the part I happened to name. */
    const lastVisible = await p.evaluate(() => {
      const els = [].slice.call(document.querySelectorAll('.que-btn, .que-gate-cta, .que-gate'));
      let low = null;
      els.forEach(e => { const b = e.getBoundingClientRect(); if (b.height > 0 && (!low || b.bottom > low.bottom)) low = b; });
      if (!low) return { found: false };
      return { found: true, bottom: low.bottom, winH: window.innerHeight, visible: low.bottom <= window.innerHeight + 1 && low.top >= -1 };
    });
    ok(lastVisible.found, 'REACH@320: no laid-out control found — the measurement is broken, not the tool');
    const lastBtnVisible = lastVisible.visible;
    /* ⚠ WHAT MUST HAPPEN IS MEASURED, NOT DECREED: if the page fits, no
       scroll is needed and demanding one would fail a correct tool. */
    if (needsScroll) {
      ok(moved > 0, 'REACH@320: the lowest control sits at ' + before.low.toFixed(0) + 'px in a ' + before.winH + 'px window and the wheel moved nothing');
      ok(lastBtnVisible, 'REACH@320: the lowest control is unreachable by wheel (bottom ' +
        (lastVisible.bottom || 0).toFixed(0) + ' vs window ' + before.winH + ')');
    } else {
      ok(true, '');
    }
    console.log('   reach@320x568 · lowest ' + before.low.toFixed(0) + ' / win ' + before.winH +
      ' · scroll needed=' + needsScroll + ' · wheel moved ' + moved +
      ' · scrollHeight reports ' + s0.docH + ' · html overflow-y=' + s0.htmlOverflow + ' height=' + s0.htmlHeight);
    await p.close();
  }

  await br.close(); srv.close();

  if (fails.length) {
    console.log('\n' + fails.length + ' FAIL of ' + checks + ' assertions:');
    fails.forEach(f => console.log('  ✗ ' + f));
    process.exit(1);
  }
  console.log('\n✓ probe-the-queue: ' + checks + ' assertions, 0 failures  (screenshots → ' + OUT + ')');
})().catch(e => { console.log('ERROR ' + e.message + '\n' + e.stack); try { srv.close(); } catch (x) {} process.exit(1); });
