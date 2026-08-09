/* =====================================================================
   verify-baking-tray.js — TOOL #46, the exhaustive census
   ---------------------------------------------------------------------
   Run:  node scripts/verify-baking-tray.js
   Env:  BTR_TOOL_DIR   (the mutation harness points this at a tmp copy)

   ⚠⚠ THE GATE IMPLEMENTS ITS OWN GROUND TRUTH. Reading the expectation
   off the tool means it marks its own homework — that is exactly how 19
   of 51 mutations survived on #36. Every oracle below is written from
   the SPEC: `oPieces`, `oSpans` and `oArea` re-derive the geometry from
   (rows, cols, axis, cuts) by hand and never call the tool.

   ⭐ AND THE STATE SPACE IS FINITE AND SMALL, so this is a CENSUS, not a
   sample. Each tray contributes 1 + Σ over each axis of
   (n−1) + C(n−1,2) states; a 10×10 contributes 91 and the whole space is
   a few thousand. Sampling a space you can enumerate is a choice to know
   less than you could.

   The five laws:
     L1 CONSERVATION   Σ piece areas === rows × cols, at EVERY state
     L2 THE NUMERAL    the split spans sum to the edge numeral, and the
                       duplicated numeral is identical on every piece
     L3 ISOMETRY       rotate maps (r,c)→(c,r), count fixed, self-inverse
                       ×4, and REFUSED on a cracked tray
     L4 REFUSALS       each returns null — never a clamp, never a no-op
     L5 REVERSIBILITY  push(crack(s,k),k) deep-equals s
   ===================================================================== */

'use strict';
const path = require('path');
const TOOL_DIR = process.env.BTR_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const T = require(path.join(TOOL_DIR, 'baking-tray.js'));

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };
const isLoud = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };

const MAXD = 10;

/* ---------- THE ORACLE — written from the spec, never from the tool --- */

function oSpans(rows, cols, axis, cuts) {
  const lim = (axis === 'col') ? cols : rows;
  const out = [];
  let prev = 0;
  for (const k of cuts) { out.push(k - prev); prev = k; }
  out.push(lim - prev);
  return out;
}
function oPieces(rows, cols, axis, cuts) {
  const sp = oSpans(rows, cols, axis, cuts);
  const out = [];
  let at = 0;
  for (const s of sp) {
    if (axis === 'col') out.push([rows, s]); else out.push([s, cols]);
    at += s;
  }
  return out;
}
const oArea = (rows, cols, axis, cuts) =>
  oPieces(rows, cols, axis, cuts).reduce((t, p) => t + p[0] * p[1], 0);

const key = (s) => `${s.rows}x${s.cols}|${s.axis}|${s.cuts.join(',')}`;

/* ---------- the census ------------------------------------------------ */

console.log('[the census — every legal state of every tray]');
let states = 0, cracked = 0;
const perTray = {};

for (let R = 1; R <= MAXD; R++) {
  for (let C = 1; C <= MAXD; C++) {
    const seen = new Set();
    const queue = [T.newState(R, C)];
    seen.add(key(queue[0]));
    let n = 0;

    while (queue.length) {
      const s = queue.shift();
      states++; n++;
      if (s.cuts.length) cracked++;

      /* ---- L1 CONSERVATION, against the oracle ---------------------- */
      is(T.area(s) === oArea(R, C, s.axis, s.cuts),
        `L1 ${key(s)}: piece areas sum to ${oArea(R, C, s.axis, s.cuts)}`);
      is(T.area(s) === R * C, `L1 ${key(s)}: and that is rows × cols`);
      is(T.count(s) === R * C, `L1 ${key(s)}: the count is unchanged`);

      /* ---- L2 THE NUMERAL LAW --------------------------------------- */
      const sp = T.spans(s);
      const osp = oSpans(R, C, s.axis, s.cuts);
      is(sp.length === osp.length && sp.every((v, i) => v === osp[i]),
        `L2 ${key(s)}: spans ${sp.join('+')} match the oracle`);
      const lim = (s.axis === 'col') ? C : R;
      is(sp.reduce((a, b) => a + b, 0) === lim,
        `L2 ${key(s)}: the split addends sum to ${lim} — the edge numeral`);
      is(sp.every((v) => v >= 1), `L2 ${key(s)}: no piece is empty`);
      /* the DUPLICATED numeral is identical on every piece */
      const pcs = T.pieces(s);
      const other = pcs.map((p) => (s.axis === 'col') ? (p.r1 - p.r0) : (p.c1 - p.c0));
      is(other.every((v) => v === other[0]),
        `L2 ${key(s)}: the duplicated numeral is the same on all ${pcs.length} pieces`);
      is(other[0] === ((s.axis === 'col') ? R : C),
        `L2 ${key(s)}: ...and it is the tray's own other dimension`);
      is(pcs.length === s.cuts.length + 1, `L2 ${key(s)}: ${s.cuts.length} cuts make ${s.cuts.length + 1} pieces`);

      /* ---- L3 ISOMETRY ---------------------------------------------- */
      if (s.cuts.length === 0) {
        const r1 = T.rotate(s);
        is(!!r1 && r1.rows === C && r1.cols === R, `L3 ${key(s)}: rotate swaps to ${C}x${R}`);
        is(!!r1 && T.count(r1) === T.count(s), `L3 ${key(s)}: and the count is fixed`);
        const r4 = T.rotate(T.rotate(T.rotate(r1)));
        is(!!r4 && r4.rows === R && r4.cols === C,
          `L3 ${key(s)}: four turns return the tray exactly`);
        is(!!r4 && r4.q === s.q,
          `L3 ${key(s)}: ...including the quarter-turn counter (${r4 && r4.q} vs ${s.q})`);
        is(!!r1 && r1.q === (s.q + 1) % 4, `L3 ${key(s)}: one turn advances q by exactly one, modulo four`);
        /* ⭐ the geometry claim the whole conservation argument rests on */
        is(T.pitch(s) === T.pitch(r1),
          `L3 ${key(s)}: THE BUN DOES NOT CHANGE SIZE ON A TURN (pitch ${T.pitch(s).toFixed(3)})`);
        is(T.trayBox(s) === T.trayBox(r1), `L3 ${key(s)}: and the sheet does not resize under it`);
      } else {
        is(T.rotate(s) === null, `L4 ${key(s)}: rotate REFUSED on a cracked tray`);
        is(T.canRotate(s) === false, `L4 ${key(s)}: ...and canRotate agrees`);
        is(T.resize(s, R + 1, C) === null, `L4 ${key(s)}: resize REFUSED while cracked`);
        is(T.canResize(s) === false, `L4 ${key(s)}: ...and canResize agrees`);
      }

      /* ---- L4 REFUSALS + L5 REVERSIBILITY, and expand -------------- */
      for (const axis of ['row', 'col']) {
        const n = T.seamCount(s, axis);
        /* out of range, both ends */
        is(T.crack(s, axis, 0) === null, `L4 ${key(s)}: seam 0 refused (${axis})`);
        is(T.crack(s, axis, n + 1) === null, `L4 ${key(s)}: seam past the end refused (${axis})`);
        is(T.crack(s, axis, 1.5) === null, `L4 ${key(s)}: a fractional seam refused (${axis})`);
        for (let k = 1; k <= n; k++) {
          const nx = T.crack(s, axis, k);
          const legal =
            s.cuts.length < 2 &&
            (s.axis === null || s.axis === axis) &&
            s.cuts.indexOf(k) < 0;
          if (!legal) {
            is(nx === null, `L4 ${key(s)}: crack(${axis},${k}) REFUSED`);
            continue;
          }
          is(nx !== null, `${key(s)}: crack(${axis},${k}) legal`);
          if (!nx) continue;
          /* L5 REVERSIBILITY — the inverse is exact, not approximate */
          const back = T.push(nx, k);
          is(!!back && key(back) === key(s),
            `L5 ${key(s)}: push(crack(${axis},${k})) returns exactly`);
          if (!seen.has(key(nx))) { seen.add(key(nx)); queue.push(nx); }
        }
      }
      /* a duplicate cut is a refusal, not a silent no-op */
      for (const k of s.cuts) {
        is(T.crack(s, s.axis, k) === null, `L4 ${key(s)}: cracking an open seam refused`);
      }
      /* pushing a seam that is not cracked is a refusal */
      is(T.push(s, 999) === null, `L4 ${key(s)}: pushing a seam that is not open refused`);
    }
    perTray[`${R}x${C}`] = n;
  }
}

isLoud(states > 3000, `censused ${states} legal states across 100 trays (${cracked} of them cracked)`);

/* ⭐⭐ AND THE CENSUS MUST REACH THE OTHER CEILING, because it CERTIFIED
   the worst defect in the build by never going there. `rotate`, `crack`
   and `push` rebuilt the state without passing the ceiling, so with the
   11-and-12 setting on a 12x7 tray of EIGHTY-FOUR buns turned into
   SEVENTY — conservation, the tool's only claim, false in exactly the
   configuration the setting sells. This gate enumerated 1..10 and never
   built a tray the bug could reach, while asserting L1 118,000 times.
   A census is only exhaustive over the space you let it see. */
console.log('\n[the census again, at the 11-and-12 ceiling]');
{
  let big = 0, broke = 0, worst = '';
  for (let R = 1; R <= 12; R++) {
    for (let C = 1; C <= 12; C++) {
      const s0 = T.newState(R, C, T.MAX12);
      if (s0.rows !== R || s0.cols !== C) { broke++; worst = `${R}x${C} was clamped to ${s0.rows}x${s0.cols}`; continue; }
      const seen = new Set([key(s0)]);
      const q = [s0];
      while (q.length) {
        const s = q.shift(); big++;
        if (T.count(s) !== R * C || T.area(s) !== R * C) {
          broke++; worst = `${key(s)} holds ${T.area(s)}, not ${R * C}`;
        }
        const r1 = T.rotate(s);
        if (r1 && T.count(r1) !== R * C) { broke++; worst = `${key(s)} turned into ${T.count(r1)}`; }
        for (const axis of ['row', 'col']) {
          for (let k = 1; k <= T.seamCount(s, axis); k++) {
            const nx = T.crack(s, axis, k);
            if (!nx) continue;
            if (T.count(nx) !== R * C) { broke++; worst = `${key(s)} broke into ${T.count(nx)}`; }
            if (!seen.has(key(nx))) { seen.add(key(nx)); q.push(nx); }
          }
        }
      }
    }
  }
  isLoud(broke === 0,
    `⭐⭐ ${big} states censused at the 12 ceiling, and the count survives EVERY turn and EVERY break` +
    (broke ? ` — ${broke} failures, e.g. ${worst}` : ''));
}
isLoud(perTray['10x10'] === 91, `a 10x10 tray has exactly ${perTray['10x10']} states — the closed form says 91`);
isLoud(perTray['1x1'] === 1, 'a 1x1 tray has exactly one state and no seam at all');

/* ---------- the refusals that need their own poison ------------------- */

console.log('\n[refusals — each must be null, never a clamp]');
{
  const s = T.newState(7, 6);
  const c = T.crack(s, 'row', 5);
  isLoud(T.crack(c, 'col', 3) === null,
    '⭐ THE PERPENDICULAR SECOND CRACK IS REFUSED — four quadrants is (a+b)(c+d), which needs notation this tool does not have');
  isLoud(T.crack(T.crack(c, 'row', 2), 'row', 3) === null,
    '⭐ THE THIRD CRACK IS REFUSED — three pieces is the ceiling');
  isLoud(T.resize(s, 7, 6) === null,
    'a resize that changes nothing is a REFUSAL, not a silent no-op');
  isLoud(T.rotate(null) === null && T.crack(null, 'row', 1) === null && T.push(null, 1) === null,
    'every mutator survives a null state');
  isLoud(T.spans(null).length === 0 && T.pieces(null).length === 0 && T.count(null) === 0,
    'every reader survives a null state');
}

console.log('\n[the clamp — one rule, composed, and it is TOTAL]');
{
  const junk = [undefined, null, 0, -3, 1.7, NaN, Infinity, '5', {}, [], 11, 15, 999, -999];
  let ok = true;
  for (const v of junk) {
    const s = T._st({ rows: v, cols: v, q: v, axis: v, cuts: v });
    if (!(s.rows >= 1 && s.rows <= 10 && s.cols >= 1 && s.cols <= 10)) ok = false;
    if (!(s.q >= 0 && s.q <= 3)) ok = false;
    if (!Array.isArray(s.cuts)) ok = false;
    if (s.cuts.length && s.axis === null) ok = false;
  }
  isLoud(ok, 'every junk value in every field lands inside the model');
  const s2 = T._st({ rows: 7, cols: 6, axis: 'row', cuts: [5, 5, 5, 2, 99, -1, 3] });
  isLoud(s2.cuts.length === 2, `duplicate, out-of-range and excess cuts are dropped (${s2.cuts.join(',')})`);
  isLoud(s2.cuts[0] < s2.cuts[1], 'and what survives is sorted');
  const s3 = T._st({ rows: 7, cols: 6, axis: 'row', cuts: [] });
  isLoud(s3.axis === null,
    '⚠ axis and cuts CANNOT DISAGREE: an empty cut list forces axis null, so there is one source of truth');
}

/* ---------- the geometry, which is a conservation claim ---------------- */

console.log('\n[geometry — the tray is the target, and it must stay hittable]');
{
  /* ⚠ THE CONSTANTS ARE READ OFF THE TOOL, never re-declared here. A
     gate carrying its own copy of the number it checks is testing a
     copy — #44 shipped a dispatch duplicated inside its own test and
     three mutations of the REAL one sailed straight through. */
  const G = T.GEO;
  isLoud(!!G && typeof G.NUM === 'number' && typeof G.NEAR === 'number',
    'NON-VACUITY: the tool exposes its geometry constants for this check');
  let slack = Infinity, slackAt = '', smallest = Infinity, smallestAt = '';
  for (let R = 1; R <= 10; R++) {
    for (let C = 1; C <= 10; C++) {
      const s = T.newState(R, C);
      const p = T.pitch(s);
      /* ⭐ the duplicated numeral rides OUTSIDE the tray on the
         perpendicular edge, so there must be room for it there. */
      const spare = (T.trayBox(s) - Math.max(R, C) * p) / p;
      if (spare < slack) { slack = spare; slackAt = `${R}x${C}`; }
      /* the numeral lane must survive */
      is(T.gutter(s) >= G.NUM, `${R}x${C}: the numeral lane survives inside the gutter`);
      /* the pointer target is the tray plus half a bun all round */
      const hitPx = (Math.max(R, C) * p + p) * (296 / G.VB);
      if (hitPx < smallest) { smallest = hitPx; smallestAt = `${R}x${C}`; }
    }
  }
  isLoud(slack >= 1.5,
    `⭐ every tray keeps ${slack.toFixed(2)} buns of clear paper outside it at ${slackAt} — where the duplicated numeral rides`);
  /* ⚠ NOT AN INVENTED THRESHOLD. The floor is the browser gate's own
     measured 34px canvas rule expressed in model units at the 320px
     viewport, where the arena is 296px and 1u = 0.296px. */
  isLoud(smallest >= 34,
    `⭐ the pointer target is at least ${smallest.toFixed(0)}px at a 320px viewport (worst tray ${smallestAt}) — a press resolves to the nearest seam, so a child is never asked to hit a 6px strip`);
  isLoud(G.NEAR > 0 && G.NEAR < 0.5,
    );
}

console.log('\n[the nearest-seam resolution — the whole pointer contract]');
{
  const s = T.newState(7, 6);
  const bound = Object.create(T); bound.st = s;
  const P = T.pitch(s), OX = T.gutter(s), OY = T.gutter(s);
  /* dead on seam 5 */
  let hit = bound._nearestSeam(OX + 3 * P, OY + 5 * P, P, OX, OY);
  isLoud(!!hit && hit.axis === 'row' && hit.k === 5, 'a press on the 5th row seam picks the 5th row seam');
  /* nearer seam 5 than 4 */
  hit = bound._nearestSeam(OX + 3.5 * P, OY + 4.85 * P, P, OX, OY);
  isLoud(!!hit && hit.k === 5, '...and a near miss still picks the nearer of the two');
  /* the middle of a bun belongs to nothing */
  hit = bound._nearestSeam(OX + 3.5 * P, OY + 4.5 * P, P, OX, OY);
  isLoud(hit === null, '⭐ the middle of a bun belongs to NO seam — the material is not one big button');
  /* a column press picks a column seam */
  hit = bound._nearestSeam(OX + 2 * P, OY + 3.5 * P, P, OX, OY);
  isLoud(!!hit && hit.axis === 'col' && hit.k === 2, 'a press on a vertical seam picks the column axis');
  /* after a row crack, no column seam is reachable at all */
  const c = T.crack(s, 'row', 5);
  const b2 = Object.create(T); b2.st = c;
  hit = b2._nearestSeam(OX + 2 * P, OY + 3.5 * P, P, OX, OY);
  isLoud(hit === null,
    '⭐ once the tray is cracked across, a press on a column seam resolves to NOTHING — the perpendicular crack is refused by not being offered');
  hit = b2._nearestSeam(OX + 3 * P, OY + 5 * P, P, OX, OY);
  isLoud(!!hit && hit.cracked === true, '...and the open seam itself resolves to the PUSH, not to a second crack');

  /* ⚠ AND THE CASES WHERE THE TWO CANDIDATE RULES DIVERGE. Both of the
     assertions above passed against a resolver with its axis lock and
     its nearest-wins comparison REMOVED, because a downstream canCrack
     guard rejected the bad pick and the two paths happened to agree.
     A test that cannot tell two implementations apart is not testing
     the one that shipped. */
  hit = b2._nearestSeam(OX + 2 * P, OY + 3.05 * P, P, OX, OY);
  isLoud(!!hit && hit.axis === 'row' && hit.k === 3,
    '⭐ pressing exactly on a BLOCKED column seam, a hair from a legal row seam, still breaks the row — the blocked axis must not win and then be thrown away, or the press does nothing at all');

  const b3 = Object.create(T); b3.st = s;
  hit = b3._nearestSeam(OX + 2.05 * P, OY + 5.2 * P, P, OX, OY);
  isLoud(!!hit && hit.axis === 'col' && hit.k === 2,
    '⭐ with a column seam and a row seam both in reach, the NEARER one wins (col 2 at 0.05 beats row 5 at 0.2) — not simply the first one considered');
}

/* ---------- the source itself: the house traps ------------------------ */

console.log('\n[the stylesheet and the shell contract — read off the source]');
{
  const fs = require('fs');
  const raw = fs.readFileSync(path.join(TOOL_DIR, 'baking-tray.js'), 'utf8');
  /* ⚠ STRIP COMMENTS FIRST. A `.lcs-` ban once matched a COMMENT twice
     in a row on #22, because an apostrophe in ordinary English opens a
     match and `[^'"]*` crosses newlines. */
  const code = raw.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');

  isLoud(!/[0-9.]vh\b/.test(code),
    '⚠ NO `vh` INSIDE A MANIPULATIVE — it is iframe-relative, and the iframe is not the viewport');
  isLoud(/[0-9.]vh\b/.test('max-height:60vh;'), 'poison: the vh ban FIRES');
  isLoud(!/[0-9.]vh\b/.test('overflow:hidden;'), '⚠ poison: and does not fire on ordinary CSS');

  isLoud(/api\.el\(\s*'div'\s*,\s*'btr-wrap'\s*\)/.test(code),
    "⭐ the wrap carries the `btr-wrap` class — the shared liveness gate derives the namespace by /([a-z]+)-wrap/, and #38's variant was invisible to it");
  isLoud(/@media print\{/.test(code),
    '⭐ THERE IS A REAL @media print BLOCK — #40 and #41 each shipped a Print chip calling window.print() with none, printing the whole web page, and the liveness gate scored both green because window.print fired');
  /* ⚠ `btr-printsheet`, not `btr-sheet`. The class was renamed after a
     cloned gate waited on `.btr-sheet` expecting the STAGE — the sibling
     tool's name for a different thing. Two things under one class name
     is a recorded defect on this platform (`.urt-lock` was a padlock AND
     a button modifier; `.ss-ghost` was a drag ghost AND a button
     modifier), so the print sheet was given a name it cannot share. */
  isLoud(/btr-printsheet/.test(code), '...and a print sheet for it to reveal');
  isLoud(!/font:\s*[^;]*Baloo/.test(code),
    '⚠ NO `font:` SHORTHAND WITH AN UNQUOTED FONT NAME — the whole declaration is dropped and a clamp() floor silently never applies');
}

console.log('\n[the opening state, and the tier]');
{
  /* driven through a stub api rather than asserted against the source,
     so the check survives a reformat */
  const calls = [];
  const stub = {
    lang: 'en', embed: false, compact: false, settings: {},
    t: (k) => String((T.strings[k] && T.strings[k].en) || k),
    el: () => ({ appendChild() {}, setAttribute() {}, addEventListener() {}, style: {}, classList: { add() {} } }),
    stage: { appendChild() {} }, sound: () => {}, announce: (s) => calls.push(s),
    track: () => {}, token: null
  };
  const saved = { st: T.st, api: T.api, premium: T.premium };
  /* a two-field stub, not browser work: init() adds a body class and
     injects its stylesheet, and neither is what is under test here. */
  const hadDoc = typeof global.document !== 'undefined';
  if (!hadDoc) {
    global.document = {
      body: { classList: { add() {} } },
      head: { appendChild() {} },
      createElement: () => ({ setAttribute() {}, appendChild() {} }),
      createTextNode: () => ({})
    };
  }
  T.init(stub);
  if (!hadDoc) delete global.document;
  isLoud(T.st.rows === 7 && T.st.cols === 6,
    `⭐ THE TOOL ALWAYS OPENS ON 7 x 6 — a remembered 9x9 is a different tool with the same URL, and the teacher opening this cold in front of 25 children must get the same first screen (got ${T.st.rows}x${T.st.cols})`);
  isLoud(T.st.cuts.length === 0 && T.st.q === 0, '...whole, and unturned');
  isLoud(T.premium === false,
    '⚠ AN UNRESOLVED TIER IS PESSIMISTIC — free-tier-locked, never optimistically unlocked');
  T.st = saved.st; T.api = saved.api; T.premium = saved.premium;
}

console.log('\n[the gap can never hold a numeral — structural, not tuned]');
{
  let ok = true, worstRatio = 0;
  for (let R = 1; R <= 10; R++) {
    for (let C = 1; C <= 10; C++) {
      const s = T.newState(R, C);
      const ratio = T.gap(s) / T.pitch(s);
      worstRatio = Math.max(worstRatio, ratio);
      if (ratio >= 1 / 3) ok = false;
    }
  }
  isLoud(ok, `the crack gap is ${(worstRatio * 100).toFixed(0)}% of a bun — under the 1/3 a numeral would need`);
}

/* ---------- the design law: no words, no operators -------------------- */

console.log('\n[§23.2 — the apparatus carries numerals and material, nothing else]');
{
  const keys = Object.keys(T.strings);
  /* ⚠⚠ ACROSS EVERY LOCALE, NOT JUST ENGLISH. TOTAL, ADVICE and the
     count-noun check all read `.en` and nothing else, so a total, a
     verdict or a bare "1 rader" could ship in ten languages entirely
     untested — and the count-noun check is the one that exists BECAUSE
     of the bug the plural bracket was invented for. */
  const LOCS = ['en','de','fr','it','es','pt','nl','sv','da','no','fi'];
  const each = function (fn) { var bad = []; LOCS.forEach(function (l) { keys.forEach(function (k) { var v = T.strings[k][l]; if (v && fn(String(v))) bad.push(l + '.' + k); }); }); return bad; };

  const en = keys.map((k) => String(T.strings[k].en || ''));
  const blob = en.join(' ');

  /* ⚠ UNICODE LOOKAROUNDS, NEVER `\b` — it is ASCII-only and cannot see
     a boundary beside an accented letter, which killed three bans on
     #44's apply script and one on #43. */
  const w = (body) => new RegExp('(?<!\\p{L})(?:' + body + ')(?!\\p{L})', 'iu');

  /* ⚠ THE FIRST VERSION OF THIS BAN ONLY CAUGHT `x` BEFORE A DIGIT, so
     "{r} x {c}" — the exact shape an operator would take in a template —
     walked straight past it and the mutation survived. Catch a bare `x`
     between spaces, whatever sits either side. */
  const OPS = /[×✕✖·]|(?<![\p{L}])x(?![\p{L}])|\s\+\s|\s=\s/iu;
  isLoud(!OPS.test(blob),
    '⭐ NO OPERATOR IN ANY STRING — no reading of "3 × 4" is correct in all eleven languages, so position carries it instead');
  isLoud(OPS.test('7 x 6') && OPS.test('{r} x {c}') && OPS.test('5 + 2') && OPS.test('a = b'),
    'poison: the operator ban FIRES on an operator, including between placeholders');
  isLoud(!OPS.test('Break after row 5: 5 rows above, 2 rows below.'),
    '⚠ poison the other way: the ban must PASS a correct label — a ban that condemns correct prose teaches a panel to reword around it');

  /* ⭐⭐ A GLYPH BAN IS DECORATIVE IN MOST OF THESE LANGUAGES. German
     notates with the WORD *mal*, and *gleich* / *ergibt* / *macht* are
     all "="; the Nordic and Romance locales have their own. A ban that
     only forbids `×` lets every one of them through, so the tool would
     refuse to notate in English and notate freely in German. Each
     locale's operator WORDS are listed here and the ban runs per locale
     as they land. */
  /* ⚠⚠ IMPORTED, NOT RE-DECLARED. This gate carried its OWN copy of the
     ban, so narrowing German `gleich` to `ist gleich` in the apply script
     fixed nothing here and the panel's correct "Gleich viele Reihen"
     stayed condemned. That is #44's recorded defect verbatim: a French
     exemption went into apply-, verify- kept its own copy, and the same
     correct sentence kept failing. An exemption has to travel with the
     ban — and the ban ships with its own poison, run here too, so
     neither consumer can trust it without exercising it. */
  const B = require('./_baking-tray-bans.js');
  const banFailures = B.poison();
  isLoud(banFailures.length === 0,
    `poison: every ban case holds in BOTH directions` + (banFailures.length ? ` — ${banFailures[0]}` : ''));
  const offenders = [];
  Object.keys(B.OP_WORDS).forEach((loc) => {
    const ban = B.word(B.OP_WORDS[loc]);
    keys.forEach((k) => {
      const v = T.strings[k][loc];
      if (v && ban.test(String(v)) && !B.exempt(loc, k)) offenders.push(`${loc}.${k}`);
    });
  });
  isLoud(offenders.length === 0,
    `⭐ no locale writes the operator as a WORD either` + (offenders.length ? ` — ${offenders.join(', ')}` : ''));
  isLoud(B.EXEMPT.every((e) => e.why && e.why.length > 60),
    `every ban exemption carries a written reason (${B.EXEMPT.length} on file)`);

  /* ⭐ NO SEAM IS EVER RECOMMENDED. The 5-groove is a groove in the
     MATERIAL, not a hint: a suggested seam is a covert grade in a tool
     whose whole remainder over the shipped winter-piles activity is
     that it does not grade — and two children disagreeing about where
     to break is the content, which an opinion would delete. */
  const ADVICE = w('best|better|should|correct|right way|recommend(?:ed)?|try again|well done|good choice');
  const advising = each((v) => ADVICE.test(v));
  isLoud(advising.length === 0,
    `⭐ NO STRING RECOMMENDS, APPROVES OR CORRECTS ANYTHING${advising.length ? ' — ' + advising.join(', ') : ''}`);
  isLoud(ADVICE.test('This is the best place to break.') && ADVICE.test('Well done!'),
    'poison: the advice ban FIRES');
  isLoud(!ADVICE.test('Break after row 5: 5 rows above, 2 rows below.'),
    '⚠ poison: and passes a label that merely describes a break');

  /* The total must never appear, in any string, including an aria-label.
     ⚠ AND A LETTER-BOUNDARY IS NOT A BOUNDARY FOR A NUMERAL. The `w()`
     helper guards with `\p{L}`, which is right for words and WRONG here:
     "42" inside "421" is bounded by a DIGIT, so the lookahead passed and
     the ban condemned a number that merely contains it. The class of
     defect is the same one `\b` causes in Finnish — a boundary that
     cannot see the character class it is standing next to. */
  const TOTAL = require('./_baking-tray-bans.js').TOTAL;
  const totals = each((v) => TOTAL.test(v));
  isLoud(totals.length === 0, 'NO TOTAL in any string, IN ANY LOCALE — "7 rows of 6", never "42"' + (totals.length ? ' — ' + totals.join(', ') : ''));
  isLoud(TOTAL.test('that makes 42 buns'), 'poison: the total ban FIRES');
  isLoud(!TOTAL.test('there are 421 of them'), '⚠ poison: and does NOT fire inside a longer numeral');

  /* ⚠ THIS ASSERTION USED TO CLAIM MORE THAN IT MEASURED. It matched
     `you|your|yours` and then announced "the second person appears in
     exactly one string" — while `instruction`, `hintCut`, `hintCut3` and
     `hintSquare` are all second-person IMPERATIVES, which the pattern
     cannot see. The intent (one line addressed to the class; the rest
     neutral or infinitive) is right; the wording was not. It now says
     what it checks, and the imperative set is named rather than
     accidentally certified. */
  const YOU = w('you|your|yours');
  /* the two are ONE SLOT — hintSquare replaces hintWhole on a square
     tray — so they are the same sentence in two shapes, and both put the
     question to the class. Named, not loosened. */
  const ASKS = ['hintWhole', 'hintSquare'];
  const pronoun = keys.filter((k) => YOU.test(String(T.strings[k].en || '')));
  isLoud(pronoun.length === ASKS.length && pronoun.every((k) => ASKS.indexOf(k) >= 0),
    `the second-person PRONOUN appears only where the class is asked a question (${pronoun.join(', ') || 'none'})`);
  const IMPERATIVE = ['instruction', 'hintCut', 'hintCut3', 'hintSquare'];
  isLoud(IMPERATIVE.every((k) => keys.indexOf(k) >= 0),
    `the four instructing strings are a NAMED set, not an accident: ${IMPERATIVE.join(', ')}`);

  /* ⭐ A BARE COUNT-NOUN PAIR IS BANNED. "{a} rows" renders "1 rows" the
     moment the seam is 1 — which is the tool's own headline derivation
     (seven into six and one). Every count that governs a noun must carry
     a [x|one|many] bracket. */
  /* the row-noun of every locale, so the check runs where the bug can
     actually land rather than only where English happens to show it */
  const ROWNOUN = 'rows?|Reihen?|rang[ée]es?|righe|riga|filas?|fileiras?|rijen?|rader|rad|r[æa]kker|rekk|riv[ei]';
  const BARE = each((v) => new RegExp('\\{[a-z]\\}\\s+(?:' + ROWNOUN + ')(?![\\p{L}])', 'u').test(v));
  isLoud(BARE.length === 0,
    `no string pairs a count with a bare noun` + (BARE.length ? ` — ${BARE.join(', ')} would render "1 rows"` : ''));

  isLoud(en.every((v) => v.length > 0), `all ${keys.length} authored keys carry English`);
}

console.log('\n[the labels state their consequence before they are pressed]');
{
  const s = T.newState(7, 6);
  const sp = T._wouldSpans ? T._wouldSpans.call({ st: s, MIN: 1 }, 'row', 5) : null;
  const bound = Object.create(T); bound.st = s;
  isLoud(bound._wouldSpans('row', 5).join(',') === '5,2',
    '⭐ the pad for seam 5 of a 7-row tray announces "5 above, 2 below" BEFORE it is pressed — that is how the distributive law reaches a screen-reader user, who never sees the numerals split');
  /* ⚠ AND THE CASE HAS TO BE ONE WHERE IT COULD BE WRONG. My first
     example cut at 5 and asked about seam 2, where the lower bound is
     zero either way — so a version that ignored the existing cut gave
     the same answer and the mutation survived. Cut LOW and ask HIGH:
     cut at 2, seam 5 of a 7-row tray is 3-above-2-below, and a label
     that forgot the existing cut would say 5-above. */
  const c2 = T.crack(s, 'row', 2);
  const bound2 = Object.create(T); bound2.st = c2;
  isLoud(bound2._wouldSpans('row', 5).join(',') === '3,2',
    '⭐ inside a piece it announces THAT PIECE\'S own split (3 above, 2 below), not the whole tray\'s — a screen-reader user would otherwise be told the wrong two facts');
  const bound3 = Object.create(T); bound3.st = T.crack(s, 'row', 5);
  isLoud(bound3._wouldSpans('row', 2).join(',') === '2,3',
    '...and the upper bound is honoured the same way');
}

console.log('');
if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
console.log(`PASS — ${PASS} assertions, ${states} states censused`);
