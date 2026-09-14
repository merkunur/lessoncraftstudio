#!/usr/bin/env node
/**
 * verify-b3-hundreds-chart-puzzles.js — the G1-310 `hundreds-chart-puzzles`
 * gate (design §5).
 *
 *   node qa/verify-b3-hundreds-chart-puzzles.js [--quick] [--locales=en] [--seeds=N]
 *
 * Own ground truth: the gate reads data/b3/hundreds-chart-puzzles.js and
 * primitives/chart-fragment.js SHAPES/UNITS DIRECTLY, re-implements the
 * position formula, the column rule, the range, connectivity and the page
 * rules in ITS OWN code (never the spec's verify), and renders through the
 * REAL pipeline (render/render-instance.js, file:// fonts). Every page stamp
 * is diffed against the gate's derivation — "diff, not trust".
 *
 * Sections
 *   A  bank (per locale block present): exemplar is a UNITS key and not
 *      g2Only (§5 rule 1); strings for G1-310 + F1..F5: title <= 70, no
 *      worksheet-word, unique, never the bare family head, no {n}/{m}/word
 *      slot ({U}/{L}/{UNIT} are the unit tokens and legal), no free claim;
 *      instruction <= 150 with an end mark (rules 3-5). The spec's i18n.en
 *      must equal strings['G1-310'] (one source).
 *   S  shapes + units (own code): every SHAPES list 4-connected, <= 4x4,
 *      normalised, distinct cells, the declared count (rule 2); every UNITS
 *      range a whole number of rows; only `tens` is g2Only.
 *   C  renders: exemplar d1/d2/d3, the other three base units at d2, `tens`
 *      REFUSED at build, LONG chrome (3-line title + 150-char instruction,
 *      body 733) × d1-d3, WORST chrome (a 150-char Finnish instruction that
 *      wraps to THREE lines, body 710) × d1-d3, a seed sweep at d1/d2/d3.
 *      Each render: lints clean · verify() empty · the gate's own audit (every
 *      value re-derived from origin/step/rc, anchor text === derived, blanks
 *      === derived, column rule, range, connectivity, one anchor, no extra
 *      <text>, page-wide distinct values, disjoint boxes, anchors on >= 4 rows,
 *      d1 one-move + no-tens) · pieces === cfg.shapes.length · every blank
 *      rect >= 44 px (G1 floor) · anchor numeral font >= 26 and its glyph box
 *      inside the anchor cell · every piece inside its card's inner box and
 *      clear of the 30 px badge · compass present iff cfg.compass, <= 675 wide
 *      and inside the body · non-vacuity (0 blanks measured = FAIL). Sweep:
 *      >= 3 distinct shapes on every page; no two seeds render the same page
 *      (shapes + rotations + origins + anchors).
 *   D  poisons (each must FAIL; the correct EN bank + page is the control):
 *      P1 anchor 20 with a cell one column right (row-edge wrap) · P2 anchor
 *      95 with a cell one row down on 1-100 (out of range) · P3 two pieces
 *      both containing 45, one printed one hidden (duplicate value) · P8 a
 *      blank cell with its value stamped as <text> (answer printed) · P11 the
 *      bare family head as a title (the validator's de "Hundertertafel" case,
 *      run on the EN bank check) · P12 exemplar '1-99' (unknown unit, refused
 *      at build) · plus: `tens` on the base refused · two anchors on one piece
 *      · bounding boxes overlapping without a shared cell · anchors on two
 *      chart rows · a d1 piece two moves from its anchor (sq2) · a d1 piece
 *      carrying a multiple of 10 · a detached cell (not 4-connected) · cells
 *      shrunk to 40 (blank 32 < 44) · the flat-760 stack (cards min-height
 *      250 under 3-line chrome → footer lint) · a hand-edited anchor numeral ·
 *      a page of 5 pieces · the compass stripped at d1 · a blank page.
 *   E  the five faces (Phase 2, 2026-09-14): G1-347 place · G2-321 jumps ·
 *      G2-322 riddle · G1-348 error · G2-323 distance, each loaded from its
 *      EMITTED spec and rendered at d2 on the exemplar, on the other units
 *      (tens on the G2 faces only; refused on F1/F4), under LONG + WORST
 *      chrome, and over the seed sweep (distinct pages; F1 four distinct
 *      shapes; F4 error index on >= 4 positions). Per render: lints + verify
 *      clean, the gate's OWN audit (position formula, column rule, range, the
 *      one wrong cell + errorKind, two-clue agreement, the two counters,
 *      page-wide distinctness, board targets on their derived cells and never
 *      on a guide), the floors (G1 write-in cell >= 44, G1 label >= 20, G2
 *      chip >= 36 incl. the compass, G2 numeral >= 22, open box >= 26 high),
 *      geometry (rows inside the card inner box, clear of the badge, compass
 *      <= 675, board <= 675, body <= 710 at WORST), the bank pair = the emitted
 *      i18n.en (one source), gradeBand per face, non-vacuity.
 *   E-poisons (45, each on the face's `items` injection seam or a hand-edited
 *      page; the correct face page is the control): P4 two wrong cells · P5
 *      `40 R` / `5 U` · P6 guide cell 31 (refused at build) + a target moved
 *      onto a guide + two pieces sharing 56 (refused) + one piece drawn twice
 *      · P7 [43][D]+[55][L] + a start equal to the target · P9 B in A's row ·
 *      P10 a 4-cell and a 3-cell piece · the wrap decoy [39][40][41] · and the
 *      rest listed inline (labels hand-edited, targets moved / printed / shrunk,
 *      reversal, duplicate starts, one-sided landings, landing stamp off, boxes
 *      written into, chips / boxes shrunk, a row wider than the card, compass
 *      stripped, the mode stamp stripped, blank pages, a wrong value equal to
 *      another cell, a non-errorKind delta, a clean piece at d2, the box
 *      stamping the wrong number, the "wrong" cell printing its true value,
 *      counters swapped / constant, A = B, a number twice, cards stretched
 *      under 3-line chrome).
 * Exit 1 on any real failure OR any silent poison.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { loadType } = require('../lib/load-types.js');
const { chartFragment, SHAPES, UNITS, CELL_COUNT } = require('../primitives/chart-fragment.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'dev', 'g1310-gate');
const BANK_FILE = path.join(ROOT, 'data', 'b3', 'hundreds-chart-puzzles.js');

const HEAD = { en: 'Hundreds Chart Puzzles' };
const FACES = ['G1-310', 'F1', 'F2', 'F3', 'F4', 'F5'];
const BASE_UNITS = ['1-100', '0-99', '1-120', '101-200'];
const BLANK_FLOOR = 44;      // G1 minElement (_tokens.js density.G1)
const NUMERAL_FLOOR = 26;    // G1 fontChoice
const COMPASS_W = 675;
const BADGE = 30;
const CARD_PAD = 14;         // 12 padding + 2 border
const WORKSHEET_WORD = /\b(worksheet|arbeitsblatt|hoja de trabajo|folha de exerc|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtäväpaperi)/i;
// worst LEGAL chrome, measured 2026-09-14 in the real pipeline (A4): a 67-char German title wraps
// to THREE lines (99 px) and a 150-char instruction to TWO (46) -> body 733; a 150-char Finnish
// instruction with long words wraps to THREE lines (69) -> body 710. The README's 722 sits between.
const LONG_CHROME = {
  title: 'Hundreds Chart Puzzle Pieces for Beginners: Fill In Every Number',
  instruction: 'One number is printed on each piece. Write every missing number in its box: 1 more to the right, 1 less to the left, 10 more below and 10 less above.',
};
const WORST_CHROME = {
  title: 'Hundertertafel Ausschnitte: Fehlende Zahlen in jedes Feld eintragen',
  instruction: 'Jokaisessa satataulunpalasessa näkyy yksi luku. Kirjoita puuttuvat luvut: oikealle yksi enemmän, vasemmalle yksi vähemmän, alapuolelle kymmenen lisää.',
};
const WORST_BODY = 722;

function arg(name, def) { const a = process.argv.find((x) => x.startsWith('--' + name + '=')); return a ? a.slice(name.length + 3) : def; }
const flags = new Set(process.argv.slice(2).filter((x) => !x.includes('=')));
const QUICK = flags.has('--quick');
const SEEDS = +arg('seeds', QUICK ? 6 : 20);

function loadBank() {
  delete require.cache[require.resolve(BANK_FILE)];
  const mod = require(BANK_FILE);
  return mod[Object.keys(mod)[0]];
}
function clone(o) { return JSON.parse(JSON.stringify(o)); }

/* ---------------- A. bank (pure node; any locale block) ---------------- */
function checkBank(cfg, loc, spec) {
  const F = [];
  const L = String(loc);
  if (!UNITS[cfg.exemplar]) F.push(`A ${L}: exemplar "${cfg.exemplar}" is not a UNITS key (unknown unit)`);
  else if (UNITS[cfg.exemplar].g2Only) F.push(`A ${L}: exemplar "${cfg.exemplar}" is G2-face-only (tens only on G2 faces)`);
  const S = cfg.strings || {};
  const titles = [];
  const head = (HEAD[L] || '').toLowerCase();
  for (const f of FACES) {
    const s = S[f];
    if (!s || !s.title || !s.instruction) { F.push(`A ${L}: strings.${f} missing title/instruction`); continue; }
    if ([...s.title].length > 70) F.push(`A ${L}: ${f} title ${[...s.title].length} > 70`);
    if (WORKSHEET_WORD.test(s.title)) F.push(`A ${L}: ${f} title carries the worksheet word`);
    if (head && s.title.trim().toLowerCase().replace(/[:!?.]+$/, '') === head) F.push(`A ${L}: ${f} title "${s.title}" equals the family head bare`);
    if ([...s.instruction].length > 150) F.push(`A ${L}: ${f} instruction ${[...s.instruction].length} > 150`);
    if (!/[.!?]$/.test(s.instruction.trim())) F.push(`A ${L}: ${f} instruction has no end mark`);
    const slots = (s.title + ' ' + s.instruction).match(/\{[^}]*\}/g) || [];
    for (const sl of slots) if (!/^\{(U|L|UNIT)\}$/.test(sl)) F.push(`A ${L}: ${f} carries a slot ${sl} (the apparatus is language-free)`);
    if (/\bfree\b|kostenlos|gratis|gratuit|ilmainen|gratuito/i.test(s.title + ' ' + s.instruction)) F.push(`A ${L}: ${f} copy claims free`);
    titles.push(s.title.toLowerCase());
  }
  if (new Set(titles).size !== titles.length) F.push(`A ${L}: face titles repeat`);
  if (spec && L === 'en' && S['G1-310'] && (S['G1-310'].title !== spec.i18n.en.title || S['G1-310'].instruction !== spec.i18n.en.instruction)) F.push('A en: strings[G1-310] != the spec i18n.en (two sources)');
  return F;
}

/* ---------------- S. shapes + units (own code) ---------------- */
function ownConnected(cells) {
  const set = new Set(cells.map(([r, c]) => r + ',' + c));
  const seen = new Set([cells[0].join(',')]);
  const st = [cells[0]];
  while (st.length) {
    const [r, c] = st.pop();
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = (r + dr) + ',' + (c + dc); if (set.has(k) && !seen.has(k)) { seen.add(k); st.push([r + dr, c + dc]); } }
  }
  return seen.size === cells.length;
}
function checkShapes(shapes, units) {
  const F = [];
  for (const [name, rots] of Object.entries(shapes)) {
    if (!Array.isArray(rots) || !rots.length) { F.push(`S ${name}: no rotations`); continue; }
    rots.forEach((cells, ri) => {
      if (cells.length !== CELL_COUNT[name]) F.push(`S ${name}[${ri}]: ${cells.length} cells, declared ${CELL_COUNT[name]}`);
      if (new Set(cells.map((x) => x.join(','))).size !== cells.length) F.push(`S ${name}[${ri}]: a cell repeats`);
      const rs = cells.map((x) => x[0]), cs = cells.map((x) => x[1]);
      if (Math.min(...rs) !== 0 || Math.min(...cs) !== 0) F.push(`S ${name}[${ri}]: not normalised`);
      if (Math.max(...rs) > 3 || Math.max(...cs) > 3) F.push(`S ${name}[${ri}]: exceeds 4x4`);
      if (!ownConnected(cells)) F.push(`S ${name}[${ri}]: not 4-connected`);
    });
  }
  for (const [name, u] of Object.entries(units)) {
    const n = (u.end - u.start) / u.step + 1;
    if (!Number.isInteger(n) || n % 10 !== 0 || n < 10) F.push(`S unit ${name}: ${n} values is not a whole number of rows`);
    if ((name === 'tens') !== !!u.g2Only) F.push(`S unit ${name}: g2Only must be set on tens only`);
  }
  return F;
}

/* ---------------- C. renders (real pipeline) + the gate's own audit ---------------- */
async function renderCheck(page, type, inj, job, opts) {
  let t = type;
  if (inj) t = { ...type, build: (o, ctx) => type._buildWith(inj.bank || loadBank()[o.locale.slice(0, 2)], inj.cfg || type.difficulty[o.difficulty], { locale: o.locale, unit: o.unit }, ctx) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({
    type: t, theme: null, difficulty: job.difficulty, locale: job.locale, unit: job.unit || null, strings: job.strings,
    pageSize: job.pageSize, seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const cfg = (inj && inj.cfg) || type.difficulty[job.difficulty];
  const m = await page.evaluate(({ blankFloor, numeralFloor, compassW, badge, cardPad }) => {
    const res = { fails: [], pieces: [], blanks: 0 };
    const F = res.fails;
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.insLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    res.titleLines = Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33);
    const root = document.querySelector('[data-lcs-hcp]');
    if (!root) { F.push('no root'); return res; }
    const start = +root.dataset.lcsStart, end = +root.dataset.lcsEnd, step = +root.dataset.lcsStep;
    const compassStamped = root.dataset.lcsCompass === '1';
    const strips = [...document.querySelectorAll('.ws-chart-compass')];
    res.compass = strips.length;
    if (strips.length !== (compassStamped ? 1 : 0)) F.push(`audit: ${strips.length} compass strips, stamp says ${compassStamped ? 1 : 0}`);
    strips.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.width > compassW + 0.6) F.push(`size: compass ${r.width.toFixed(1)} > ${compassW}`);
      if (r.left < body.left - 0.6 || r.right > body.right + 0.6 || r.top < body.top - 0.6 || r.bottom > body.bottom + 0.6) F.push('size: compass outside the body');
      if (s.querySelectorAll('svg').length !== 4) F.push('audit: compass has ' + s.querySelectorAll('svg').length + ' chevrons, want 4');
    });
    const grid = root.querySelector('.ws-cardgrid');
    if (grid) { const g = grid.getBoundingClientRect(); if (g.bottom > body.bottom + 0.6 || g.top < body.top - 0.6) F.push('size: card grid outside the body'); }
    const pieces = [...root.querySelectorAll('[data-lcs-prim="chart-fragment"]')];
    const values = new Map();
    const boxes = [];
    const anchorRows = new Set();
    pieces.forEach((svg, pi) => {
      const P = `piece ${pi + 1}`;
      const ds = svg.dataset;
      const w = +ds.lcsW, h = +ds.lcsH, origin = +ds.lcsOrigin, anchor = +ds.lcsAnchor, cell = +ds.lcsCellpx;
      const pStep = +ds.lcsStep;
      const val = (r, c) => origin + pStep * (10 * r + c);
      const rcs = [...svg.querySelectorAll('[data-lcs-rc]')].map((e) => { const [r, c] = e.dataset.lcsRc.split(',').map(Number); return { r, c, el: e }; });
      const set = new Set(rcs.map((x) => x.r + ',' + x.c));
      // geometry: piece inside the card inner box, clear of the badge
      const pr = svg.getBoundingClientRect();
      const card = svg.closest('.ws-card');
      if (!card) F.push(`${P}: not inside a card`);
      else {
        const cr = card.getBoundingClientRect();
        if (pr.left < cr.left + cardPad - 0.6 || pr.right > cr.right - cardPad + 0.6 || pr.top < cr.top + cardPad - 0.6 || pr.bottom > cr.bottom - cardPad + 0.6) F.push(`${P}: piece ${pr.width.toFixed(0)}x${pr.height.toFixed(0)} outside the card inner box (${(cr.width - 2 * cardPad).toFixed(0)}x${(cr.height - 2 * cardPad).toFixed(0)})`);
        if (pr.left < cr.left + badge && pr.top < cr.top + badge) F.push(`${P}: piece under the number badge`);
        if (Math.abs(pr.width - (w * cell + 8)) > 0.6 || Math.abs(pr.height - (h * cell + 8)) > 0.6) F.push(`${P}: renders ${pr.width.toFixed(1)}x${pr.height.toFixed(1)}, stamps say ${w * cell + 8}x${h * cell + 8}`);
      }
      // own derivation
      const oi = (origin - start) / pStep;
      if (!Number.isInteger(oi) || oi < 0) F.push(`${P}: origin ${origin} off the chart`);
      if (Number.isInteger(oi) && (oi % 10) + w - 1 > 9) F.push(`${P}: row-edge wrap (origin column ${oi % 10}, width ${w})`);
      if (val(h - 1, w - 1) > end || origin < start) F.push(`${P}: out of range`);
      if (+ds.lcsStart !== start || +ds.lcsEnd !== end || pStep !== step) F.push(`${P}: unit stamps differ from the page`);
      if (rcs.length < 2) F.push(`${P}: ${rcs.length} cells`);
      if (rcs.length && (() => { const seen = new Set([rcs[0].r + ',' + rcs[0].c]); const st = [[rcs[0].r, rcs[0].c]]; while (st.length) { const [r, c] = st.pop(); for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = (r + dr) + ',' + (c + dc); if (set.has(k) && !seen.has(k)) { seen.add(k); st.push([r + dr, c + dc]); } } } return seen.size !== rcs.length; })()) F.push(`${P}: not 4-connected`);
      const givens = rcs.filter((x) => x.el.hasAttribute('data-lcs-given'));
      const blanks = rcs.filter((x) => x.el.hasAttribute('data-lcs-answer'));
      if (givens.length !== 1) F.push(`${P}: ${givens.length} anchors`);
      if (blanks.length !== rcs.length - givens.length) F.push(`${P}: ${blanks.length} blanks for ${rcs.length} cells`);
      const texts = [...svg.querySelectorAll('text')];
      if (texts.length !== 1) F.push(`${P}: ${texts.length} <text> elements, want 1 (answer printed)`);
      givens.forEach((g) => {
        const want = val(g.r, g.c);
        if (+g.el.dataset.lcsGiven !== want || anchor !== want) F.push(`${P}: anchor ${g.el.dataset.lcsGiven}/${anchor} != derived ${want}`);
        anchorRows.add(Math.floor(oi / 10) + g.r);
        const gb = g.el.getBoundingClientRect();
        texts.forEach((t) => {
          const tb = t.getBoundingClientRect();
          if (t.textContent.trim() !== String(want)) F.push(`${P}: anchor prints "${t.textContent.trim()}", derived ${want}`);
          const fs = parseFloat(getComputedStyle(t).fontSize);
          if (fs < numeralFloor - 0.1) F.push(`${P}: anchor numeral ${fs}px < ${numeralFloor}`);
          if (tb.left < gb.left || tb.right > gb.right || tb.top < gb.top || tb.bottom > gb.bottom) F.push(`${P}: anchor numeral ${tb.width.toFixed(0)}x${tb.height.toFixed(0)} outside its cell`);
        });
      });
      blanks.forEach((b) => {
        const want = val(b.r, b.c);
        if (+b.el.dataset.lcsAnswer !== want) F.push(`${P}: blank ${b.r},${b.c} stamps ${b.el.dataset.lcsAnswer}, derived ${want}`);
        const r = b.el.getBoundingClientRect();
        if (r.width < blankFloor - 0.6 || r.height < blankFloor - 0.6) F.push(`${P}: blank ${r.width.toFixed(1)}x${r.height.toFixed(1)} < G1 floor ${blankFloor}`);
        res.blanks++;
        texts.forEach((t) => { const tb = t.getBoundingClientRect(); const cx = (tb.left + tb.right) / 2, cy = (tb.top + tb.bottom) / 2; if (cx > r.left && cx < r.right && cy > r.top && cy < r.bottom) F.push(`${P}: a numeral sits on a blank (answer printed)`); });
      });
      rcs.forEach((x) => { const v = val(x.r, x.c); if (values.has(v)) F.push(`audit: value ${v} on ${P} and piece ${values.get(v) + 1} (duplicate value)`); else values.set(v, pi); });
      if (Number.isInteger(oi)) {
        const box = { r0: Math.floor(oi / 10), c0: oi % 10, pi }; box.r1 = box.r0 + h - 1; box.c1 = box.c0 + w - 1;
        boxes.forEach((o) => { if (!(box.r1 < o.r0 || o.r1 < box.r0 || box.c1 < o.c0 || o.c1 < box.c0)) F.push(`audit: ${P} and piece ${o.pi + 1} bounding boxes overlap`); });
        boxes.push(box);
      }
      res.pieces.push({ shape: ds.lcsShape, rot: +ds.lcsRot, origin, anchor, cells: rcs.length });
    });
    if (pieces.length && anchorRows.size < Math.min(4, pieces.length)) F.push(`audit: anchors on ${anchorRows.size} rows`);
    return res;
  }, { blankFloor: BLANK_FLOOR, numeralFloor: NUMERAL_FLOOR, compassW: COMPASS_W, badge: BADGE, cardPad: CARD_PAD });
  fails.push(...m.fails.map((x) => (x.startsWith('audit') || x.startsWith('size') ? x : 'audit: ' + x)));
  if (m.pieces.length !== cfg.shapes.length) fails.push(`count: ${m.pieces.length} pieces, config says ${cfg.shapes.length}`);
  if (m.compass !== (cfg.compass ? 1 : 0)) fails.push(`count: ${m.compass} compass strips, config says ${cfg.compass ? 1 : 0}`);
  if (job.strings === WORST_CHROME && m.body > WORST_BODY) fails.push(`chrome: the 3-line/3-line body measured ${m.body}, expected <= ${WORST_BODY}`);
  if (job.strings === WORST_CHROME && m.insLines < 3) fails.push(`chrome: WORST_CHROME wrapped to ${m.insLines} instruction lines, not 3 (the probe is vacuous)`);
  if ((job.strings === WORST_CHROME || job.strings === LONG_CHROME) && m.titleLines < 3) fails.push(`chrome: the probe title wrapped to ${m.titleLines} lines, not 3 (vacuous)`);
  if (!m.blanks) fails.push('non-vacuity: 0 blanks measured');
  return { fails, pieces: m.pieces, body: m.body, insLines: m.insLines, titleLines: m.titleLines, pngPath: out.pngPath };
}

const pieceRe = /<svg[^>]*data-lcs-prim="chart-fragment"[\s\S]*?<\/svg>/g;
/** Replace the n-th (0-based) piece svg in the page html; throws when the needle is absent. */
function swapPiece(html, n, svg) {
  let i = -1;
  let hit = false;
  const out = html.replace(pieceRe, (m) => { i++; if (i !== n) return m; hit = true; return svg; });
  if (!hit) throw new Error('NEEDLE MATCHED NOTHING (piece ' + n + ')');
  return out;
}
function piece(o) { return chartFragment({ cell: 60, start: 1, end: 100, step: 1, printed: 'anchor', ...o }).svg; }

/* ================================================================== E. the five faces (Phase 2, 2026-09-14)
 * G1-347 place · G2-321 jumps · G2-322 riddle · G1-348 error · G2-323 distance — every face renders through the
 * real pipeline (the EMITTED spec, loadType) at d2 on the exemplar, on the other units (tens on the G2 faces only;
 * refused on the G1 faces), under LONG (733) and WORST (710) chrome, and over a seed sweep. The gate's OWN in-page
 * audit re-derives every value from the stamps (position formula, column rule, range, two-clue agreement, the
 * counters, the one wrong cell), measures the floors itself (G1 write-in >= 44, G2 chip >= 36, box >= 26 high,
 * G2 numeral >= 22, G1 label >= 20), and the geometry (rows inside the card inner box, clear of the badge, compass
 * <= 675 and inside the body, the F1 board <= 675). `inj.items` reaches the spec's `_buildWith` seam: the face
 * DRAWS the injected items and verify must reject them — that is how P4-P10 are killed.
 */
const FACE_IDS = { F1: 'G1-347', F2: 'G2-321', F3: 'G2-322', F4: 'G1-348', F5: 'G2-323' };
const FACE_MODE = { F1: 'place', F2: 'jumps', F3: 'riddle', F4: 'error', F5: 'distance' };
const FACE_G2 = new Set(['F2', 'F3', 'F5']);
const G2_CHIP_FLOOR = 36;
const G2_NUMERAL_FLOOR = 22;
const BOX_H_FLOOR = 26;
const LABEL_FLOOR = 20;
const FACE_BODY_WORST = 710;

async function faceCheck(page, face, type, inj, job, opts) {
  let t = type;
  if (inj) t = { ...type, build: (o, ctx) => type._buildWith(inj.bank || loadBank()[o.locale.slice(0, 2)], inj.cfg || type.difficulty[o.difficulty], { locale: o.locale, unit: o.unit, items: inj.items || null }, ctx) };
  if (opts && opts.post) { const inner = t.build; t = { ...t, build: async (o, ctx) => { const b = await inner.call(t, o, ctx); b.bodyHtml = opts.post(b.bodyHtml); return b; } }; }
  const out = await renderInstance({
    type: t, theme: null, difficulty: job.difficulty || 2, locale: job.locale, unit: job.unit || null, strings: job.strings,
    pageSize: job.pageSize, seedEpoch: job.seedEpoch || 1, page, outDir: OUT, baseName: job.baseName,
  });
  const fails = [...out.qa.lints.map((x) => 'lint: ' + x), ...out.qa.verify.map((x) => 'verify: ' + x)];
  const cfg = (inj && inj.cfg) || type.difficulty[2];
  const m = await page.evaluate(({ face, mode, blankFloor, chipFloor, numFloor, boxFloor, labelFloor, badge, cardPad, compassW }) => {
    const F = [];
    const res = { fails: F, n: 0, items: [], measured: 0 };
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    res.body = Math.round(body.height);
    res.insLines = Math.round(document.querySelector('[data-lcs-instruction]').getBoundingClientRect().height / 23);
    res.titleLines = Math.round(document.querySelector('[data-lcs-title]').getBoundingClientRect().height / 33);
    const root = document.querySelector('[data-lcs-hcp]');
    if (!root) { F.push('no root'); return res; }
    if (root.dataset.lcsMode !== mode) F.push(`audit: mode stamp "${root.dataset.lcsMode}", want ${mode}`);
    const start = +root.dataset.lcsStart, end = +root.dataset.lcsEnd, step = +root.dataset.lcsStep;
    const COLS = 10, count = (end - start) / step + 1, rows = count / COLS;
    const idx = (v) => (v - start) / step, row = (v) => Math.floor(idx(v) / COLS), col = (v) => idx(v) % COLS;
    const on = (v) => Number.isInteger(idx(v)) && idx(v) >= 0 && idx(v) < count;
    const mv = (v, m) => { if (!on(v)) return null; const r = row(v), c = col(v); if (m === 'R') return c < 9 ? v + step : null; if (m === 'L') return c > 0 ? v - step : null; if (m === 'U') return r > 0 ? v - 10 * step : null; if (m === 'D') return r < rows - 1 ? v + 10 * step : null; return null; };
    const inside = (a, b, fudge = 0.6) => a.left >= b.left - fudge && a.right <= b.right + fudge && a.top >= b.top - fudge && a.bottom <= b.bottom + fudge;
    const centreIn = (a, b) => { const cx = (a.left + a.right) / 2, cy = (a.top + a.bottom) / 2; return cx > b.left && cx < b.right && cy > b.top && cy < b.bottom; };
    const fontOf = (el) => parseFloat(getComputedStyle(el).fontSize);
    // compass: present on the three G2 faces, never on place / error; <= 675, inside the body, no ground truth
    const strips = [...document.querySelectorAll('.ws-chart-compass')];
    const wantCompass = mode === 'jumps' || mode === 'riddle' || mode === 'distance';
    if (strips.length !== (wantCompass ? 1 : 0)) F.push(`audit: ${strips.length} compass strips on ${mode}`);
    strips.forEach((s) => { const r = s.getBoundingClientRect(); if (r.width > compassW + 0.6) F.push(`size: compass ${r.width.toFixed(1)} > ${compassW}`); if (!inside(r, body)) F.push('size: compass outside the body'); if (s.querySelector('[data-lcs-answer],[data-lcs-given]')) F.push('audit: compass carries ground truth'); s.querySelectorAll(':scope > span > span > span').forEach((chip) => { const cr = chip.getBoundingClientRect(); if (cr.width < chipFloor - 0.6 || cr.height < chipFloor - 0.6) F.push(`size: compass chip ${cr.width.toFixed(1)} < G2 floor ${chipFloor}`); }); });
    // card geometry helper: the element sits inside its card's inner box and clear of the badge
    const inCard = (el, P) => {
      const card = el.closest('.ws-card'); if (!card) { F.push(`${P}: not inside a card`); return; }
      const cr = card.getBoundingClientRect(), r = el.getBoundingClientRect();
      const innerW = cr.width - 2 * cardPad, innerH = cr.height - 2 * cardPad;
      if (r.left < cr.left + cardPad - 0.6 || r.right > cr.right - cardPad + 0.6 || r.top < cr.top + cardPad - 0.6 || r.bottom > cr.bottom - cardPad + 0.6) F.push(`${P}: ${r.width.toFixed(0)}x${r.height.toFixed(0)} outside the card inner box (${innerW.toFixed(0)}x${innerH.toFixed(0)})`);
      if (r.left < cr.left + badge && r.top < cr.top + badge) F.push(`${P}: under the number badge`);
      if (!inside(r, body)) F.push(`${P}: outside the body`);
    };
    const givenOk = (g, P) => { const v = +g.dataset.lcsGiven; if (g.textContent.trim() !== String(v)) F.push(`${P}: given prints "${g.textContent.trim()}" for ${v}`); if (fontOf(g) < numFloor - 0.1) F.push(`${P}: given numeral ${fontOf(g)} < ${numFloor}`); const r = g.getBoundingClientRect(); if (r.height < boxFloor) F.push(`${P}: given ${r.height} high < ${boxFloor}`); return v; };
    const boxOk = (b, P) => { const r = b.getBoundingClientRect(); if (r.height < boxFloor - 0.6) F.push(`${P}: open box ${r.height.toFixed(1)} high < ${boxFloor}`); if (b.textContent.trim()) F.push(`${P}: open box carries text (answer printed)`); res.measured++; };
    const chipOk = (c, P) => { const r = c.firstElementChild.getBoundingClientRect(); if (r.width < chipFloor - 0.6 || r.height < chipFloor - 0.6) F.push(`${P}: chip ${r.width.toFixed(1)}x${r.height.toFixed(1)} < G2 floor ${chipFloor}`); if (!c.querySelector('svg polyline')) F.push(`${P}: chip without a chevron`); };

    if (mode === 'place') {
      const board = root.querySelector('[data-lcs-board]');
      if (!board) { F.push('audit: no board'); return res; }
      const bb = board.getBoundingClientRect(), bcell = +board.dataset.lcsCellpx;
      if (bcell < blankFloor) F.push(`size: board cell ${bcell} < G1 floor ${blankFloor}`);
      if (bb.width > 675.6) F.push(`size: board ${bb.width.toFixed(1)} > 675`);
      if (!inside(bb, body)) F.push('size: board outside the body');
      const guides = board.dataset.lcsGuides;
      const gset = new Set();
      for (let i = 0; i < count; i++) { const v = start + i * step, r = Math.floor(i / COLS), c = i % COLS; if (guides === 'corners' ? (i === 0 || i === count - 1) : (r === 0 || c === 0 || (guides === 'rich' && (v % 10 === 0 || c === COLS - 1)))) gset.add(v); }
      const gl = [...board.querySelectorAll('[data-lcs-guide]')];
      if (gl.length !== gset.size) F.push(`audit: ${gl.length} guides printed, ${gset.size} expected for '${guides}'`);
      gl.forEach((g) => { if (!gset.has(+g.dataset.lcsGuide)) F.push(`audit: guide ${g.dataset.lcsGuide} not a ${guides} guide`); if (g.textContent.trim() !== g.dataset.lcsGuide) F.push('audit: guide text != stamp'); if (fontOf(g) < 16 - 0.1) F.push(`size: guide ${fontOf(g)} < 16`); });
      const targets = [...board.querySelectorAll('[data-lcs-target]')];
      const tmap = new Map();
      const scale = bb.width / (COLS * bcell + 8);
      targets.forEach((tg) => {
        const v = +tg.dataset.lcsAnswer, k = tg.dataset.lcsTarget, r = tg.getBoundingClientRect();
        if (r.width < blankFloor - 0.6 || r.height < blankFloor - 0.6) F.push(`size: target ${v} ${r.width.toFixed(1)}x${r.height.toFixed(1)} < G1 floor ${blankFloor}`);
        res.measured++;
        if (!on(v)) { F.push(`audit: target ${v} off the chart`); return; }
        if (gset.has(v)) F.push(`audit: target ${v} on a printed guide (P6)`);
        if (tmap.has(v)) F.push(`audit: target ${v} twice (P6)`);
        tmap.set(v, k);
        const ex = bb.left + (4 + col(v) * bcell) * scale, ey = bb.top + (4 + row(v) * bcell) * scale;
        if (Math.abs(r.left - ex) > 1.5 || Math.abs(r.top - ey) > 1.5) F.push(`audit: target ${v} drawn off its derived cell (${row(v)},${col(v)})`);
        if (tg.textContent.trim()) F.push(`audit: target ${v} printed (answer printed)`);
      });
      board.querySelectorAll('text').forEach((tx) => { targets.forEach((tg) => { if (centreIn(tx.getBoundingClientRect(), tg.getBoundingClientRect())) F.push(`audit: "${tx.textContent.trim()}" printed inside a target (answer printed)`); }); });
      const pieces = [...root.querySelectorAll('[data-lcs-piece]')];
      res.n = pieces.length;
      const owner = new Map();
      let cellsTotal = 0;
      const rowRect = pieces.length ? pieces.reduce((acc, p) => { const r = p.getBoundingClientRect(); return { left: Math.min(acc.left, r.left), right: Math.max(acc.right, r.right) }; }, { left: 1e9, right: -1e9 }) : null;
      if (rowRect && rowRect.right - rowRect.left > 675.6) F.push(`size: piece row ${(rowRect.right - rowRect.left).toFixed(1)} > 675`);
      pieces.forEach((wrap) => {
        const k = wrap.dataset.lcsPiece, svg = wrap.querySelector('[data-lcs-prim="chart-fragment"]'), P = `piece ${k}`;
        if (!svg) { F.push(`${P}: no fragment`); return; }
        if (!inside(svg.getBoundingClientRect(), body)) F.push(`${P}: outside the body`);
        if (svg.dataset.lcsPrinted !== 'all') F.push(`${P}: printed=${svg.dataset.lcsPrinted}`);
        const origin = +svg.dataset.lcsOrigin, w = +svg.dataset.lcsW, h = +svg.dataset.lcsH;
        if (!on(origin)) F.push(`${P}: origin ${origin} off the chart`);
        else if (col(origin) + w - 1 > 9) F.push(`${P}: row-edge wrap`);
        if (on(origin) && origin + step * (10 * (h - 1) + (w - 1)) > end) F.push(`${P}: out of range`);
        const cells = [...svg.querySelectorAll('[data-lcs-rc]')].map((el) => { const [r, c] = el.dataset.lcsRc.split(',').map(Number); return { r, c, el, val: origin + step * (10 * r + c) }; });
        const texts = [...svg.querySelectorAll('text')];
        if (texts.length !== cells.length) F.push(`${P}: ${texts.length} labels for ${cells.length} cells`);
        texts.forEach((tx) => {
          const host = cells.find((x) => centreIn(tx.getBoundingClientRect(), x.el.getBoundingClientRect()));
          if (!host) { F.push(`${P}: a label on no cell`); return; }
          if (tx.textContent.trim() !== String(host.val)) F.push(`${P}: prints "${tx.textContent.trim()}" at (${host.r},${host.c}), derived ${host.val} (position-inconsistent)`);
          if (fontOf(tx) < labelFloor - 0.1) F.push(`${P}: label ${fontOf(tx)} < ${labelFloor}`);
          if (tx.hasAttribute('data-lcs-wrong')) F.push(`${P}: a wrong cell on the place face`);
        });
        cells.forEach((x) => {
          cellsTotal++;
          const r = x.el.getBoundingClientRect(); if (r.width < blankFloor - 0.6) F.push(`${P}: cell ${r.width.toFixed(1)} < ${blankFloor}`);
          if (owner.has(x.val)) F.push(`audit: value ${x.val} on piece ${k} and ${owner.get(x.val)} (duplicate value)`); else owner.set(x.val, k);
          if (gset.has(x.val)) F.push(`${P}: covers guide ${x.val} (P6)`);
          const tk = tmap.get(x.val);
          if (tk == null) F.push(`${P}: ${x.val} has no target`); else if (tk !== k) F.push(`${P}: ${x.val} targeted for piece ${tk}`);
        });
        res.items.push({ shape: svg.dataset.lcsShape, rot: +svg.dataset.lcsRot, origin });
      });
      if (targets.length !== cellsTotal) F.push(`audit: ${targets.length} targets for ${cellsTotal} cells`);
    } else if (mode === 'jumps') {
      const chains = [...root.querySelectorAll('[data-lcs-chain]')];
      res.n = chains.length;
      const starts = new Set(), all = new Set();
      chains.forEach((ch, i) => {
        const P = `chain ${i + 1}`;
        inCard(ch, P);
        const s = +ch.dataset.lcsStart, moves = ch.dataset.lcsMoves, answer = +ch.dataset.lcsAnswer;
        const g = ch.querySelector('[data-lcs-given]'); if (!g) F.push(`${P}: no given`); else if (givenOk(g, P) !== s) F.push(`${P}: given != start`);
        const chips = [...ch.querySelectorAll('[data-lcs-move]')];
        chips.forEach((c) => chipOk(c, P));
        if (chips.map((c) => c.dataset.lcsMove).join('') !== moves) F.push(`${P}: chips != moves`);
        let v = s; let bad = null;
        for (let k = 0; k < moves.length; k++) { if (k && moves[k] === { U: 'D', D: 'U', L: 'R', R: 'L' }[moves[k - 1]]) F.push(`${P}: immediate reversal`); const n = mv(v, moves[k]); if (n == null) { bad = `${moves[k]} from ${v} leaves the chart (P5)`; break; } v = n; }
        if (bad) F.push(`${P}: ${bad}`); else if (v !== answer) F.push(`${P}: folds to ${v}, stamped ${answer}`);
        const boxes = [...ch.querySelectorAll('[data-lcs-answer]')];
        if (!boxes.length) F.push(`${P}: no box`); boxes.forEach((b) => boxOk(b, P));
        if (boxes.length && +boxes[boxes.length - 1].dataset.lcsAnswer !== answer) F.push(`${P}: box != landing`);
        if (starts.has(s)) F.push(`${P}: start repeats`); starts.add(s);
        for (const x of [s, answer]) { if (all.has(x)) F.push(`${P}: ${x} twice on the page (duplicate value)`); all.add(x); }
        res.items.push({ start: s, moves, answer });
      });
      if (chains.length > 1 && (chains.every((c) => +c.dataset.lcsAnswer > +c.dataset.lcsStart) || chains.every((c) => +c.dataset.lcsAnswer < +c.dataset.lcsStart))) F.push('audit: landings all on one side of their starts');
    } else if (mode === 'riddle') {
      const riddles = [...root.querySelectorAll('[data-lcs-riddle]')];
      res.n = riddles.length;
      const all = new Set();
      riddles.forEach((rd, i) => {
        const P = `riddle ${i + 1}`;
        inCard(rd, P);
        const answer = +rd.dataset.lcsAnswer;
        const clues = [...rd.querySelectorAll('[data-lcs-clue]')];
        if (clues.length !== 2) F.push(`${P}: ${clues.length} clues`);
        const got = [], kinds = [];
        clues.forEach((cl, j) => {
          const s = +cl.dataset.lcsStart;
          const g = cl.querySelector('[data-lcs-given]'); if (!g) F.push(`${P}: clue ${j + 1} no given`); else if (givenOk(g, P) !== s) F.push(`${P}: clue given != start`);
          const chips = [...cl.querySelectorAll('[data-lcs-move]')]; chips.forEach((c) => chipOk(c, P));
          let v = s; for (const c of chips) { const n = mv(v, c.dataset.lcsMove); if (n == null) { F.push(`${P}: clue ${j + 1} leaves the chart (P5)`); v = null; break; } v = n; }
          if (v != null) { got.push(v); kinds.push(Math.abs(v - s) / step); }
          if (s === answer) F.push(`${P}: clue ${j + 1} start equals the answer`);
          if (all.has(s)) F.push(`${P}: start ${s} twice (duplicate value)`); all.add(s);
        });
        if (got.length === 2 && got[0] !== got[1]) F.push(`${P}: clues disagree (${got[0]} vs ${got[1]}, P7)`);
        got.forEach((v) => { if (v !== answer) F.push(`${P}: clue resolves to ${v}, stamped ${answer}`); });
        if (kinds.length === 2 && kinds.sort((a, b) => a - b).join(',') !== '1,10') F.push(`${P}: kinds ${kinds.join(',')} not one ±1 and one ±10`);
        const boxes = [...rd.querySelectorAll('[data-lcs-answer]')]; if (boxes.length !== 1) F.push(`${P}: ${boxes.length} boxes`); boxes.forEach((b) => { boxOk(b, P); if (+b.dataset.lcsAnswer !== answer) F.push(`${P}: box != answer`); });
        if (all.has(answer)) F.push(`${P}: answer ${answer} printed on the page (answer printed)`); all.add(answer);
        res.items.push({ answer, starts: clues.map((c) => +c.dataset.lcsStart) });
      });
    } else if (mode === 'error') {
      const pieces = [...root.querySelectorAll('[data-lcs-prim="chart-fragment"]')];
      res.n = pieces.length;
      const trues = new Map(), wrongs = new Map();
      const swap = (v) => { const s = String(v); if (s.length < 2) return null; const t = s.slice(0, -2) + s[s.length - 1] + s[s.length - 2]; return +t !== v && !/^0/.test(t) ? +t : null; };
      pieces.forEach((svg, i) => {
        const P = `piece ${i + 1}`;
        inCard(svg, P);
        const origin = +svg.dataset.lcsOrigin, w = +svg.dataset.lcsW, h = +svg.dataset.lcsH;
        if (!on(origin)) F.push(`${P}: origin off the chart`); else if (col(origin) + w - 1 > 9) F.push(`${P}: row-edge wrap`);
        if (on(origin) && origin + step * (10 * (h - 1) + (w - 1)) > end) F.push(`${P}: out of range`);
        const cells = [...svg.querySelectorAll('[data-lcs-rc]')].map((el) => { const [r, c] = el.dataset.lcsRc.split(',').map(Number); return { r, c, el, val: origin + step * (10 * r + c) }; });
        if (cells.length < 5) F.push(`${P}: ${cells.length} cells < 5 (ambiguous error, P10)`);
        cells.forEach((x) => { const r = x.el.getBoundingClientRect(); if (r.width < blankFloor - 0.6) F.push(`${P}: cell ${r.width.toFixed(1)} < ${blankFloor}`); if (trues.has(x.val)) F.push(`audit: ${x.val} on ${P} and piece ${trues.get(x.val)} (duplicate value)`); else trues.set(x.val, i + 1); });
        const texts = [...svg.querySelectorAll('text')];
        if (texts.length !== cells.length) F.push(`${P}: ${texts.length} labels for ${cells.length} cells`);
        const wrongLabels = [];
        texts.forEach((tx) => {
          const host = cells.find((x) => centreIn(tx.getBoundingClientRect(), x.el.getBoundingClientRect()));
          if (!host) { F.push(`${P}: a label on no cell`); return; }
          if (fontOf(tx) < labelFloor - 0.1) F.push(`${P}: label ${fontOf(tx)} < ${labelFloor}`);
          const shown = +tx.textContent.trim();
          if (tx.hasAttribute('data-lcs-wrong')) wrongLabels.push({ host, shown });
          else if (shown !== host.val) F.push(`${P}: prints ${shown} at (${host.r},${host.c}), derived ${host.val} (position-inconsistent)`);
        });
        const card = svg.closest('.ws-card'), box = card && card.querySelector('[data-lcs-errbox]');
        if (!box) F.push(`${P}: no box`); else { boxOk(box, P); const r = box.getBoundingClientRect(); if (r.width < 44 - 0.6) F.push(`${P}: box ${r.width.toFixed(1)} wide < 44`); }
        if (box && box.hasAttribute('data-lcs-clean')) { if (wrongLabels.length) F.push(`${P}: clean piece with a wrong cell`); res.items.push({ wrongIdx: null }); return; }
        if (wrongLabels.length !== 1) { F.push(`${P}: ${wrongLabels.length} wrong cells (error not unique, P4)`); return; }
        const { host, shown } = wrongLabels[0];
        const d = (shown - host.val) / step;
        if (![1, 9, 10, 11].includes(Math.abs(d)) && swap(host.val) !== shown) F.push(`${P}: ${shown} for ${host.val} is not an errorKind`);
        if (shown === host.val) F.push(`${P}: the wrong cell prints its true value`);
        if (shown < start || shown > end) F.push(`${P}: wrong value ${shown} out of range`);
        if (box && +box.dataset.lcsAnswer !== host.val) F.push(`${P}: box ${box.dataset.lcsAnswer} != right number ${host.val}`);
        if (wrongs.has(shown)) F.push(`${P}: wrong value ${shown} repeats`); wrongs.set(shown, i + 1);
        res.items.push({ shape: svg.dataset.lcsShape, rot: +svg.dataset.lcsRot, origin, wrongIdx: +svg.dataset.lcsWrongIdx, wrong: shown });
      });
      wrongs.forEach((pi, v) => { if (trues.has(v)) F.push(`piece ${pi}: wrong value ${v} equals a true value on the page (duplicate value)`); });
    } else if (mode === 'distance') {
      const items = [...root.querySelectorAll('[data-lcs-dist]')];
      res.n = items.length;
      const all = new Set(), downs = new Set(), rights = new Set();
      items.forEach((it, i) => {
        const P = `pair ${i + 1}`;
        inCard(it, P);
        const a = +it.dataset.lcsA, b = +it.dataset.lcsB;
        const gs = [...it.querySelectorAll('[data-lcs-given]')];
        if (gs.length !== 2) F.push(`${P}: ${gs.length} givens`); else { if (givenOk(gs[0], P) !== a) F.push(`${P}: first given != A`); if (givenOk(gs[1], P) !== b) F.push(`${P}: second given != B`); }
        if (!on(a) || !on(b)) { F.push(`${P}: A/B off the chart`); return; }
        if (a === b) F.push(`${P}: A equals B`);
        const down = row(b) - row(a), right = col(b) - col(a);
        const bd = it.querySelector('[data-lcs-counter="down"]'), br = it.querySelector('[data-lcs-counter="right"]');
        if (!bd || !br) { F.push(`${P}: counter box missing`); return; }
        boxOk(bd, P); boxOk(br, P);
        [bd, br].forEach((b) => { const r = b.getBoundingClientRect(); if (r.width < chipFloor - 0.6 || r.height < chipFloor - 0.6) F.push(`${P}: counter box ${r.width.toFixed(1)} < G2 floor ${chipFloor}`); });
        [...it.querySelectorAll('[data-lcs-move]')].forEach((c) => chipOk(c, P));
        if (+bd.dataset.lcsAnswer !== down || +br.dataset.lcsAnswer !== right) F.push(`${P}: counters stamp ${bd.dataset.lcsAnswer}/${br.dataset.lcsAnswer}, derived ${down}/${right} (P9)`);
        if (down < 1 || down > 6 || right < 1 || right > 6) F.push(`${P}: counter outside 1..6 at d2 (P9)`);
        for (const x of [a, b]) { if (all.has(x)) F.push(`${P}: ${x} twice on the page (duplicate value)`); all.add(x); }
        downs.add(down); rights.add(right);
        res.items.push({ a, b, down, right });
      });
      if (items.length > 1 && (downs.size === 1 || rights.size === 1)) F.push('audit: a counter is constant');
    }
    return res;
  }, { face, mode: FACE_MODE[face], blankFloor: BLANK_FLOOR, chipFloor: G2_CHIP_FLOOR, numFloor: G2_NUMERAL_FLOOR, boxFloor: BOX_H_FLOOR, labelFloor: LABEL_FLOOR, badge: BADGE, cardPad: CARD_PAD, compassW: COMPASS_W });
  fails.push(...m.fails.map((x) => (x.startsWith('audit') || x.startsWith('size') ? x : 'audit: ' + x)));
  const wantN = { place: cfg.pieces, jumps: cfg.items, riddle: cfg.items, error: cfg.shapes && cfg.shapes.length, distance: cfg.items }[FACE_MODE[face]];
  if (m.n !== wantN) fails.push(`count: ${m.n} items, config says ${wantN}`);
  if (job.strings === WORST_CHROME && m.body > FACE_BODY_WORST) fails.push(`chrome: the 3-line/3-line body measured ${m.body}, expected <= ${FACE_BODY_WORST}`);
  if (job.strings === WORST_CHROME && m.insLines < 3) fails.push(`chrome: WORST_CHROME wrapped to ${m.insLines} instruction lines (vacuous)`);
  if ((job.strings === WORST_CHROME || job.strings === LONG_CHROME) && m.titleLines < 3) fails.push(`chrome: the probe title wrapped to ${m.titleLines} lines (vacuous)`);
  if (!m.measured) fails.push('non-vacuity: 0 open boxes measured');
  return { fails, n: m.n, items: m.items, body: m.body, insLines: m.insLines, titleLines: m.titleLines, pngPath: out.pngPath };
}

/** The face section: renders + sweeps + refusals for one locale. Returns the assertion count it added. */
async function runFaces(page, loc, bankLoc, note, log) {
  let added = 0;
  const faceTypes = {};
  for (const [f, id] of Object.entries(FACE_IDS)) faceTypes[f] = loadType(id);
  for (const f of Object.keys(FACE_IDS)) {
    const type = faceTypes[f], id = FACE_IDS[f];
    const cfg = type.difficulty[2];
    note(cfg.mode === FACE_MODE[f], `${id}: resolved d2 mode ${cfg.mode}, want ${FACE_MODE[f]}`);
    note(type.gradeBand === (FACE_G2.has(f) ? 'G2' : 'G1'), `${id}: gradeBand ${type.gradeBand}`);
    const s = bankLoc.strings[f];
    note(s && type.i18n.en && s.title === type.i18n.en.title && s.instruction === type.i18n.en.instruction, `${id}: the emitted i18n.en differs from bank strings.${f} (two sources)`);
    const renders = [];
    renders.push({ locale: loc, baseName: `${id}-d2-${loc}`, tag: 'level' });
    const units = BASE_UNITS.filter((x) => x !== bankLoc.exemplar).concat(FACE_G2.has(f) ? ['tens'] : []);
    for (const u of units) renders.push({ locale: loc, unit: u, baseName: `${id}-d2-${loc}-u${u}`, tag: 'unit' });
    renders.push({ locale: loc, strings: LONG_CHROME, pageSize: 'a4', baseName: `${id}-d2-${loc}-longchrome`, tag: 'long-chrome' });
    renders.push({ locale: loc, strings: WORST_CHROME, pageSize: 'a4', baseName: `${id}-d2-${loc}-worstchrome`, tag: 'worst-chrome' });
    for (let sd = 2; sd <= SEEDS; sd++) renders.push({ locale: loc, seedEpoch: sd, baseName: `${id}-d2-${loc}-seed${sd}`, tag: 'seed' });
    const pages = new Map();
    const errPositions = new Set();
    for (const job of renders) {
      let r;
      try { r = await faceCheck(page, f, type, null, job); } catch (e) { r = { thrown: e.message }; }
      note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
      if (r.thrown) { log(`[E] ${job.baseName}: THREW ${r.thrown}`); continue; }
      added += 10 * r.n;
      note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
      if (f === 'F1') note(new Set(r.items.map((p) => p.shape)).size === r.items.length, `${job.baseName}: piece shapes repeat`);
      if (f === 'F4') r.items.forEach((p) => { if (p.wrongIdx != null) errPositions.add(p.wrongIdx); });
      if (job.tag === 'seed' || job.tag === 'level') {
        const key = JSON.stringify(r.items);
        const prev = pages.get(key);
        note(!prev, `${job.baseName}: identical page to ${prev}`);
        pages.set(key, job.baseName);
      }
      if (job.tag !== 'seed') log(`[E] ${job.baseName}: body ${r.body} (${r.titleLines}-line title, ${r.insLines}-line instruction), ${r.n} items ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
    }
    log(`[E] ${id} sweep over ${SEEDS} seeds: ${pages.size} distinct pages`);
    if (f === 'F4') note(errPositions.size >= 4, `${id}: the error index took ${errPositions.size} positions over the sweep, want >= 4`);
    if (!FACE_G2.has(f)) {
      let err = null;
      try { await faceCheck(page, f, type, null, { locale: loc, unit: 'tens', baseName: `${id}-tens` }); } catch (e) { err = e.message; }
      note(err && /G2-face-only/.test(err), `${id}: unit tens was not refused on a G1 face (${err || 'rendered'})`);
      log(`[E] ${id}: unit tens -> ${err ? 'refused' : 'RENDERED'}`);
    }
  }
  return { added, faceTypes };
}


async function main() {
  const locales = arg('locales', 'en').split(',');
  const seeds = SEEDS;
  const type = loadType('G1-310');
  let assertions = 0;
  const failures = [];
  const note = (ok, msg) => { assertions++; if (!ok) failures.push(msg); };
  const bankAll = loadBank();
  fs.mkdirSync(OUT, { recursive: true });
  for (const s of [LONG_CHROME, WORST_CHROME]) { note([...s.title].length <= 70, 'probe title > 70'); note([...s.instruction].length <= 150, 'probe instruction > 150'); }

  // ---- S
  const sF = checkShapes(SHAPES, UNITS);
  assertions += Object.values(SHAPES).reduce((n, r) => n + r.length * 5, 0) + Object.keys(UNITS).length * 2;
  failures.push(...sF);
  console.log(`[S] ${Object.keys(SHAPES).length} shapes / ${Object.values(SHAPES).reduce((n, r) => n + r.length, 0)} rotations, ${Object.keys(UNITS).length} units · ${sF.length} faults`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    for (const loc of locales) {
      const cfg = bankAll[loc];
      note(!!cfg, `no ${loc} block in the bank (refusal — the ${loc} panel has not authored it)`);
      if (!cfg) { console.log(`[A] ${loc}: no block (refused)`); continue; }
      const a = checkBank(cfg, loc, type);
      assertions += 40;
      failures.push(...a);
      console.log(`[A] ${loc}: exemplar ${cfg.exemplar} · ${a.length} data faults`);
      // ---- C
      const renders = [];
      for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: loc, baseName: `G1-310-d${d}-${loc}`, tag: 'level' });
      for (const u of BASE_UNITS.filter((x) => x !== cfg.exemplar)) renders.push({ difficulty: 2, locale: loc, unit: u, baseName: `G1-310-d2-${loc}-u${u}`, tag: 'unit' });
      for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: loc, strings: LONG_CHROME, pageSize: 'a4', baseName: `G1-310-d${d}-${loc}-longchrome`, tag: 'long-chrome' });
      for (const d of [1, 2, 3]) renders.push({ difficulty: d, locale: loc, strings: WORST_CHROME, pageSize: 'a4', baseName: `G1-310-d${d}-${loc}-worstchrome`, tag: 'worst-chrome' });
      for (const d of [1, 2, 3]) for (let s = 2; s <= seeds; s++) renders.push({ difficulty: d, locale: loc, seedEpoch: s, baseName: `G1-310-d${d}-${loc}-seed${s}`, tag: 'seed' });
      const pages = { 1: new Map(), 2: new Map(), 3: new Map() };
      for (const job of renders) {
        let r;
        try { r = await renderCheck(page, type, null, job); } catch (e) { r = { thrown: e.message }; }
        note(!r.thrown, `${job.baseName}: threw ${r.thrown}`);
        if (r.thrown) { console.log(`[C] ${job.baseName}: THREW ${r.thrown}`); continue; }
        assertions += 12 * r.pieces.length;
        note(r.fails.length === 0, `${job.baseName}: ${r.fails.join(' | ')}`);
        const kinds = new Set(r.pieces.map((p) => p.shape));
        note(kinds.size >= 3, `${job.baseName}: ${kinds.size} distinct shapes on the page, want >= 3`);
        if (job.tag === 'seed' || job.tag === 'level') {
          const key = r.pieces.map((p) => `${p.shape}/${p.rot}@${p.origin}a${p.anchor}`).join(',');
          const prev = pages[job.difficulty].get(key);
          note(!prev, `${job.baseName}: identical page to ${prev}`);
          pages[job.difficulty].set(key, job.baseName);
        }
        if (job.tag !== 'seed') console.log(`[C] ${job.baseName}: body ${r.body} (${r.titleLines}-line title, ${r.insLines}-line instruction), pieces [${r.pieces.map((p) => p.shape + '@' + p.anchor).join(' ')}] ${r.fails.length ? 'FAIL ' + r.fails.join(' | ') : 'ok'}`);
      }
      for (const d of [1, 2, 3]) console.log(`[C] d${d} sweep over ${seeds} seeds: ${pages[d].size} distinct pages`);
      // tens refused on the base
      let tensErr = null;
      try { await renderCheck(page, type, null, { difficulty: 2, locale: loc, unit: 'tens', baseName: 'G1-310-tens' }); } catch (e) { tensErr = e.message; }
      note(tensErr && /G2-face-only/.test(tensErr), `unit tens was not refused on the base (${tensErr || 'rendered'})`);
      console.log(`[C] ${loc}: unit tens -> ${tensErr ? 'refused (' + tensErr.replace(/^.*G1-310: /, '') + ')' : 'RENDERED'}`);
      // ---- E (faces)
      const fe = await runFaces(page, loc, cfg, note, (m) => console.log(m));
      assertions += fe.added;
    }

    // ---- D. poisons (en; each must FAIL; control = the correct bank + page)
    const loc = 'en';
    const cfg = bankAll.en;
    const control = await renderCheck(page, type, null, { difficulty: 2, locale: loc, baseName: 'G1-310-control' });
    note(control.fails.length === 0 && checkBank(cfg, loc, type).length === 0, 'control (correct bank + page) did not pass: ' + control.fails.join(' | '));
    const poisons = [];
    const bankPoison = (name, block, want) => poisons.push({ name, run: async () => { const f = checkBank(block, 'en', null); return f.some((x) => want.test(x)) ? null : 'silent (' + (f[0] || 'no fault') + ')'; } });
    const htmlPoison = (name, post, want, job) => poisons.push({ name, run: async () => {
      const r = await renderCheck(page, type, (job && job.inj) || null, { difficulty: (job && job.difficulty) || 2, locale: loc, strings: job && job.strings, pageSize: job && job.pageSize, baseName: 'G1-310-poison-' + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 28).toLowerCase() }, { post });
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    const buildPoison = (name, run, want) => poisons.push({ name, run: async () => { try { await run(); return 'silent (rendered)'; } catch (e) { return want.test(e.message) ? null : 'wrong error: ' + e.message; } } });

    htmlPoison('P1 anchor 20 with a cell one column right (row-edge wrap)', (h) => swapPiece(h, 0, piece({ shape: 'bar-h3', origin: 19, anchorIdx: 1 })), /row-edge wrap/);
    htmlPoison('P2 anchor 95 with a cell one row down (out of range)', (h) => swapPiece(h, 0, piece({ shape: 'bar-v3', origin: 85, anchorIdx: 1 })), /out of range/);
    htmlPoison('P3 two pieces both containing 45, one printed one hidden', (h) => swapPiece(swapPiece(h, 0, piece({ shape: 'sq3', origin: 34, anchorIdx: 4 })), 1, piece({ shape: 'bar-h3', origin: 44, anchorIdx: 0 })), /duplicate value/);
    htmlPoison('P8 a blank cell with its value stamped as <text>', (h) => {
      const m = h.match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"[^>]*data-lcs-rc="[^"]+" data-lcs-answer="(\d+)"\/>/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (blank)');
      const cx = +m[1] + +m[3] / 2, cy = +m[2] + +m[4] / 2;
      return h.replace(m[0], m[0] + `<text x="${cx}" y="${cy}" font-family="'Baloo 2'" font-size="26" font-weight="700" fill="#3A3530" text-anchor="middle" dominant-baseline="central">${m[5]}</text>`);
    }, /answer printed/);
    bankPoison('P11 the bare family head as a title', (() => { const b = clone(cfg); b.strings['G1-310'].title = 'Hundreds Chart Puzzles'; return b; })(), /equals the family head/);
    bankPoison('P12 exemplar 1-99 (unknown unit, bank check)', (() => { const b = clone(cfg); b.exemplar = '1-99'; return b; })(), /unknown unit/);
    buildPoison('P12b exemplar 1-99 refused at build', () => renderCheck(page, type, { bank: { ...cfg, exemplar: '1-99' } }, { difficulty: 2, locale: loc, baseName: 'G1-310-poison-p12b' }), /unknown unit/);
    buildPoison('tens on the base refused at build', () => renderCheck(page, type, null, { difficulty: 2, locale: loc, unit: 'tens', baseName: 'G1-310-poison-tens' }), /G2-face-only/);
    bankPoison('exemplar tens in the bank', (() => { const b = clone(cfg); b.exemplar = 'tens'; return b; })(), /G2-face-only/);
    htmlPoison('two anchors on one piece', (h) => {
      const m = h.match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" rx="6" ry="6" fill="#FFFFFF" stroke="#C8BFAE" stroke-width="2" stroke-dasharray="5 4" data-lcs-rc="([^"]+)" data-lcs-answer="(\d+)"\/>/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (blank rect)');
      return h.replace(m[0], `<rect x="${m[1]}" y="${m[2]}" width="${m[3]}" height="${m[4]}" rx="5" ry="5" fill="#DDEBE8" stroke="#146B5E" stroke-width="2" data-lcs-rc="${m[5]}" data-lcs-given="${m[6]}"/>` +
        `<text x="${+m[1] + +m[3] / 2}" y="${+m[2] + +m[4] / 2}" font-family="'Baloo 2'" font-size="26" font-weight="700" fill="#3A3530" text-anchor="middle" dominant-baseline="central" data-lcs-anchor="${m[6]}">${m[6]}</text>`);
    }, /one anchor|anchors/);
    htmlPoison('bounding boxes overlap without a shared cell', (h) => swapPiece(swapPiece(h, 0, piece({ shape: 'L3', rot: 0, origin: 11, anchorIdx: 0 })), 1, piece({ shape: 'bar-h3', origin: 12, anchorIdx: 1 })), /bounding boxes overlap/);
    htmlPoison('anchors on two chart rows', (h) => {
      const ps = [1, 4, 7, 31, 34, 37].map((o) => piece({ shape: 'sq3', origin: o, anchorIdx: 4 }));
      let out = h;
      ps.forEach((s, i) => { out = swapPiece(out, i, s); });
      return out;
    }, /anchors on 2|anchors on \d rows/);
    htmlPoison('a d1 piece two moves from its anchor (sq2)', (h) => swapPiece(h, 0, piece({ shape: 'sq2', origin: 12, anchorIdx: 0, cell: 56 })), /one move/, { difficulty: 1 });
    htmlPoison('a d1 piece carrying a multiple of 10', (h) => swapPiece(h, 0, piece({ shape: 'bar-h3', origin: 18, anchorIdx: 1, cell: 56 })), /multiple of 10/, { difficulty: 1 });
    htmlPoison('a detached cell (not 4-connected)', (h) => {
      const svg = piece({ shape: 'bar-h3', origin: 42, anchorIdx: 0 });
      const detached = svg.replace('data-lcs-w="3"', 'data-lcs-w="4"').replace('data-lcs-rc="0,1"', 'data-lcs-rc="0,3"');
      if (detached === svg) throw new Error('NEEDLE MATCHED NOTHING (rc 0,1)');
      return swapPiece(h, 0, detached);
    }, /4-connected/);
    poisons.push({ name: 'cells shrunk to 40 (blank 32 < 44)', run: async () => {
      const r = await renderCheck(page, type, { cfg: { ...type.difficulty[2], cell: 52 } }, { difficulty: 2, locale: loc, baseName: 'G1-310-poison-cell40' }, { post: (h) => h.replace(/data-lcs-cellpx="52"/g, 'data-lcs-cellpx="40"').replace(/<svg([^>]*)width="164" height="164" viewBox="0 0 164 164"/g, '<svg$1width="128" height="128" viewBox="0 0 164 164"') });
      return r.fails.some((x) => /< G1 floor/.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    htmlPoison('the flat-760 stack under 3-line chrome', (h) => h.replace(/<section class="ws-card"/g, '<section class="ws-card" style="min-height:250px"'), /footer overlap|overflow|outside the body|outside the card/, { strings: LONG_CHROME, pageSize: 'a4' });
    htmlPoison('a hand-edited anchor numeral', (h) => {
      const m = h.match(/data-lcs-anchor="(\d+)">\1<\/text>/);
      if (!m) throw new Error('NEEDLE MATCHED NOTHING (anchor text)');
      return h.replace(m[0], `data-lcs-anchor="${m[1]}">${+m[1] + 1}</text>`);
    }, /anchor text|anchor prints/);
    htmlPoison('a page of 5 pieces', (h) => swapPiece(h, 5, ''), /pieces: 5|5 pieces/);
    htmlPoison('the compass stripped at d1', (h) => h.replace(/<div class="ws-chart-compass"[\s\S]*?<\/div>/, ''), /compass/, { difficulty: 1 });
    htmlPoison('a blank page (non-vacuity)', (h) => h.replace(pieceRe, ''), /non-vacuity|pieces: 0|blank worksheet/);

    // ---- E-poisons: the faces (each must FAIL; the correct face page is the control)
    const faceTypes = {};
    for (const [f, id] of Object.entries(FACE_IDS)) faceTypes[f] = loadType(id);
    for (const f of Object.keys(FACE_IDS)) {
      const ctl = await faceCheck(page, f, faceTypes[f], null, { locale: loc, baseName: `${FACE_IDS[f]}-control` });
      note(ctl.fails.length === 0, `${FACE_IDS[f]} control did not pass: ${ctl.fails.join(' | ')}`);
    }
    const facePoison = (name, f, o, want) => poisons.push({ name, run: async () => {
      const type = faceTypes[f];
      const inj = (o.items || o.cfg) ? { items: o.items || null, cfg: o.cfg ? { ...type.difficulty[2], ...o.cfg } : null } : null;
      const r = await faceCheck(page, f, type, inj, { locale: loc, unit: o.unit, strings: o.strings, pageSize: o.pageSize, baseName: FACE_IDS[f] + '-poison-' + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 30).toLowerCase() }, o.post ? { post: o.post } : null);
      return r.fails.some((x) => want.test(x)) ? null : 'silent (' + (r.fails[0] || 'no fault') + ')';
    } });
    const faceBuildPoison = (name, f, o, want) => poisons.push({ name, run: async () => {
      const type = faceTypes[f];
      const inj = { items: o.items || null, cfg: o.cfg ? { ...type.difficulty[2], ...o.cfg } : null };
      try { await faceCheck(page, f, type, inj, { locale: loc, unit: o.unit, baseName: FACE_IDS[f] + '-poison-' + name.replace(/[^a-z0-9]+/gi, '-').slice(0, 30).toLowerCase() }); return 'silent (rendered)'; }
      catch (e) { return want.test(e.message) ? null : 'wrong error: ' + e.message; }
    } });
    const replaceOnce = (h, re, fn) => { const m = h.match(re); if (!m) throw new Error('NEEDLE MATCHED NOTHING (' + re.source.slice(0, 40) + ')'); return h.replace(m[0], fn(m)); };
    // F1 place
    const placeOk = [{ shape: 'sq3', rot: 0, origin: 23, anchorIdx: 4 }, { shape: 'plus', rot: 0, origin: 55, anchorIdx: 2 }, { shape: 'L3', rot: 0, origin: 72, anchorIdx: 0 }, { shape: 'T3', rot: 0, origin: 37, anchorIdx: 1 }];
    faceBuildPoison('P6a F1 piece covering guide cell 31 (refused at build)', 'F1', { items: [{ shape: 'L3', rot: 0, origin: 31, anchorIdx: 0 }, ...placeOk.slice(1)] }, /printed guide/);
    facePoison('P6a F1 target moved onto a printed guide (hand-edited page)', 'F1', { post: (h) => replaceOnce(h, /data-lcs-target="(\d)" data-lcs-answer="(\d+)"/, (m) => `data-lcs-target="${m[1]}" data-lcs-answer="11"`) }, /printed guide|P6/);
    faceBuildPoison('P6b F1 two pieces sharing cell 56 (refused at build)', 'F1', { items: [{ shape: 'sq3', rot: 0, origin: 45, anchorIdx: 4 }, { shape: 'plus', rot: 0, origin: 55, anchorIdx: 2 }, ...placeOk.slice(2)] }, /targeted twice/);
    facePoison('P6b F1 one piece drawn twice (hand-edited page)', 'F1', { post: (h) => { const ps = h.match(pieceRe); if (!ps || ps.length < 2) throw new Error('NEEDLE MATCHED NOTHING (pieces)'); return swapPiece(h, 1, ps[0]); } }, /duplicate value|targeted for piece/);
    facePoison('F1 a piece label hand-edited (position-inconsistent)', 'F1', { post: (h) => replaceOnce(h, /data-lcs-cell="(\d+)">\1<\/text>/, (m) => `data-lcs-cell="${m[1]}">${+m[1] + 1}</text>`) }, /position-inconsistent/);
    facePoison('F1 a target drawn one column off its value', 'F1', { post: (h) => replaceOnce(h, /<rect x="([\d.]+)" y="([\d.]+)" width="46" height="46" rx="0" ry="0" fill="#FFFFFF" data-lcs-target="(\d)" data-lcs-answer="(\d+)"\/>/, (m) => `<rect x="${+m[1] + 46}" y="${m[2]}" width="46" height="46" rx="0" ry="0" fill="#FFFFFF" data-lcs-target="${m[3]}" data-lcs-answer="${m[4]}"/>`) }, /drawn off|drawn at row/);
    facePoison('F1 a target printed (answer printed)', 'F1', { post: (h) => replaceOnce(h, /<rect x="([\d.]+)" y="([\d.]+)" width="46" height="46" rx="0" ry="0" fill="#FFFFFF" data-lcs-target="(\d)" data-lcs-answer="(\d+)"\/>/, (m) => m[0] + `<text x="${+m[1] + 23}" y="${+m[2] + 23}" font-family="'Baloo 2'" font-size="16" font-weight="700" fill="#3A3530" text-anchor="middle" dominant-baseline="central">${m[4]}</text>`) }, /answer printed/);
    facePoison('F1 board cell shrunk to 40 (target 40 < 44)', 'F1', { post: (h) => { const out = h.replace(/width="46" height="46" rx="0"/g, 'width="40" height="40" rx="0"'); if (out === h) throw new Error('NEEDLE MATCHED NOTHING (target rects)'); return out; } }, /< G1 floor/);
    faceBuildPoison('F1 boardCell 40 refused at build', 'F1', { cfg: { boardCell: 40 } }, /44 px floor/);
    facePoison('F1 a wrong-cell label on the place face', 'F1', { post: (h) => replaceOnce(h, /data-lcs-cell="(\d+)">\1<\/text>/, (m) => `data-lcs-wrong="${+m[1] + 1}">${+m[1] + 1}</text>`) }, /wrong cell on the place face/);
    // F2 jumps
    const chainsOk = [[12, 'RDR'], [25, 'DRD'], [48, 'ULU'], [63, 'RRD'], [77, 'LDL'], [31, 'DDR'], [86, 'UUL'], [54, 'RUR']].map(([start, m]) => ({ start, moves: m.split('') }));
    facePoison('P5a F2 chain 40 R (+1 across the row edge)', 'F2', { items: [{ start: 40, moves: ['R', 'D', 'R'] }, ...chainsOk.slice(1)] }, /row-edge wrap|leaves the chart/);
    facePoison('P5b F2 chain 5 U (-10 below start)', 'F2', { items: [{ start: 5, moves: ['U', 'R', 'R'] }, ...chainsOk.slice(1)] }, /out of range|leaves the chart/);
    facePoison('F2 an immediate reversal (U then D)', 'F2', { items: [{ start: 44, moves: ['U', 'D', 'R'] }, ...chainsOk.slice(1)] }, /revers/);
    facePoison('F2 two chains from one start', 'F2', { items: [chainsOk[0], { start: 12, moves: ['D', 'D', 'L'] }, ...chainsOk.slice(2)] }, /start .* repeats|duplicate value/);
    facePoison('F2 every landing below its start', 'F2', { items: [[45, 'UUL'], [67, 'LUL'], [88, 'ULU'], [33, 'UUU'], [59, 'LLU'], [92, 'UUL'], [76, 'ULL'], [24, 'ULL']].map(([start, m]) => ({ start, moves: m.split('') })) }, /same side|one side/);
    facePoison('F2 landing stamp off by one', 'F2', { post: (h) => replaceOnce(h, /(<span data-lcs-chain data-lcs-start="\d+" data-lcs-moves="[UDLR]+" data-lcs-step="\d+" data-lcs-answer=")(\d+)(")/, (m) => `${m[1]}${+m[2] + 1}${m[3]}`) }, /folded landing|folds to|box != landing/);
    facePoison('F2 the landing written into the box (answer printed)', 'F2', { post: (h) => replaceOnce(h, /(<span class="ws-blankbox" +data-lcs-answer="(\d+)"[^>]*>)(<\/span>)/, (m) => `${m[1]}${m[2]}${m[3]}`) }, /answer printed/);
    facePoison('F2 chips shrunk to 30 (< G2 floor 36)', 'F2', { post: (h) => { const out = h.replace(/width:36px;height:36px;flex:0 0 36px/g, 'width:30px;height:30px;flex:0 0 30px'); if (out === h) throw new Error('NEEDLE MATCHED NOTHING (chips)'); return out; } }, /< G2 floor/);
    facePoison('F2 chain wider than the card (gap 30)', 'F2', { cfg: { gap: 30 } }, /outside the card inner box/);
    facePoison('F2 the compass stripped', 'F2', { post: (h) => replaceOnce(h, /<div class="ws-chart-compass"[\s\S]*?<\/div>/, () => '') }, /compass/);
    facePoison('F2 the mode stamp stripped (the base verify must reject a face page)', 'F2', { post: (h) => replaceOnce(h, / data-lcs-mode="jumps"/, () => '') }, /verify:|audit: mode stamp/);
    facePoison('F2 a blank page (non-vacuity)', 'F2', { post: (h) => { const out = h.replace(/<section class="ws-card"[\s\S]*?<\/section>/g, ''); if (out === h) throw new Error('NEEDLE MATCHED NOTHING (cards)'); return out; } }, /non-vacuity|chains: 0|0 items|blank worksheet/);
    // F3 riddle
    const riddlesOk = [[24, 'D', 33, 'R', 34], [8, 'D', 19, 'L', 18], [52, 'L', 41, 'D', 51], [27, 'R', 38, 'U', 28], [73, 'U', 62, 'R', 63], [20, 'D', 29, 'R', 30], [40, 'D', 49, 'R', 50], [25, 'R', 16, 'D', 26]].map(([s1, m1, s2, m2, a]) => ({ clues: [{ start: s1, move: m1 }, { start: s2, move: m2 }], answer: a }));
    facePoison('P7a F3 [43][D] + [55][L] (clues disagree)', 'F3', { items: [{ clues: [{ start: 43, move: 'D' }, { start: 55, move: 'L' }], answer: 53 }, ...riddlesOk.slice(1)] }, /clues disagree|P7/);
    facePoison('P7b F3 a clue whose start equals the target', 'F3', { items: [{ clues: [{ start: 43, move: 'D' }, { start: 53, move: 'L' }], answer: 53 }, ...riddlesOk.slice(1)] }, /start .* equals the answer|equals the answer/);
    facePoison('F3 a clue across the row edge ([50][R])', 'F3', { items: [{ clues: [{ start: 41, move: 'D' }, { start: 50, move: 'R' }], answer: 51 }, ...riddlesOk.slice(1)] }, /row-edge wrap|leaves the chart/);
    facePoison('F3 two tens clues (kinds 10,10)', 'F3', { items: [{ clues: [{ start: 43, move: 'D' }, { start: 63, move: 'U' }], answer: 53 }, ...riddlesOk.slice(1)] }, /kinds/);
    facePoison('F3 the answer printed as another riddle\'s given', 'F3', { items: [riddlesOk[0], { clues: [{ start: 34, move: 'D' }, { start: 45, move: 'L' }], answer: 44 }, ...riddlesOk.slice(2)] }, /printed|duplicate value/);
    facePoison('F3 the answer written into the box', 'F3', { post: (h) => replaceOnce(h, /(<span class="ws-blankbox" +data-lcs-answer="(\d+)"[^>]*>)(<\/span>)/, (m) => `${m[1]}${m[2]}${m[3]}`) }, /answer printed/);
    // F4 error
    const errOk = [{ shape: 'sq3', rot: 0, origin: 12, anchorIdx: 4, wrongIdx: 0, wrongValue: 21 }, { shape: 'L3', rot: 0, origin: 41, anchorIdx: 0, wrongIdx: 3, wrongValue: 72 }, { shape: 'T3', rot: 0, origin: 65, anchorIdx: 1, wrongIdx: 4, wrongValue: 96 }, { shape: 'plus', rot: 0, origin: 27, anchorIdx: 2, wrongIdx: 0, wrongValue: 29 }, { shape: 'T3', rot: 2, origin: 81, anchorIdx: 1, wrongIdx: 0, wrongValue: 92 }, { shape: 'L3', rot: 2, origin: 45, anchorIdx: 0, wrongIdx: 4, wrongValue: 76 }];
    facePoison('P4 F4 a piece with two wrong cells', 'F4', { post: (h) => replaceOnce(h, /data-lcs-cell="(\d+)">\1<\/text>/, (m) => `data-lcs-wrong="${+m[1] + 1}">${+m[1] + 1}</text>`) }, /error not unique|wrong cells/);
    facePoison('P10 F4 a piece of 4 cells (sq2)', 'F4', { items: [{ shape: 'sq2', rot: 0, origin: 12, anchorIdx: 0, wrongIdx: 1, wrongValue: 14 }, ...errOk.slice(1)] }, /ambiguous error|>= 5|< 5/);
    facePoison('P10 F4 a piece of 3 cells (bar-h3)', 'F4', { items: [{ shape: 'bar-h3', rot: 0, origin: 12, anchorIdx: 0, wrongIdx: 1, wrongValue: 15 }, ...errOk.slice(1)] }, /ambiguous error|>= 5|< 5/);
    facePoison('F4 wrap decoy [39][40][41] in one row', 'F4', { items: [{ shape: 'L3', rot: 1, origin: 39, anchorIdx: 3, wrongIdx: 4, wrongValue: 58 }, ...errOk.slice(1)] }, /row-edge wrap/);
    facePoison('F4 wrong value equal to another cell on the page', 'F4', { items: [errOk[0], { ...errOk[1], wrongValue: 13 }, ...errOk.slice(2)] }, /equals a true value|duplicate value/);
    facePoison('F4 wrong value +5 (not an errorKind)', 'F4', { items: [{ ...errOk[0], wrongValue: 17 }, ...errOk.slice(1)] }, /not an errorKind/);
    facePoison('F4 a piece with no wrong cell at d2', 'F4', { items: [{ ...errOk[0], wrongIdx: null, wrongValue: null }, ...errOk.slice(1)] }, /clean pieces|0 wrong cells/);
    facePoison('F4 box stamps the wrong number', 'F4', { post: (h) => replaceOnce(h, /(<span class="ws-blankbox" data-lcs-errbox data-lcs-answer=")(\d+)(")/, (m) => `${m[1]}${+m[2] + 1}${m[3]}`) }, /box .* != right number|right number is/);
    facePoison('F4 the "wrong" cell prints its true value', 'F4', { post: (h) => {
      const re = /<rect [^>]*data-lcs-rc="(\d+),(\d+)"\/><text ([^>]*)data-lcs-wrong="(\d+)">\4<\/text>/;
      const m = h.match(re); if (!m) throw new Error('NEEDLE MATCHED NOTHING (wrong label)');
      const before = h.slice(0, h.indexOf(m[0]));
      const origins = [...before.matchAll(/data-lcs-origin="(\d+)"/g)]; if (!origins.length) throw new Error('NEEDLE MATCHED NOTHING (origin)');
      const trueVal = +origins[origins.length - 1][1] + 10 * +m[1] + +m[2];
      return h.replace(m[0], `<rect ${m[0].slice(6, m[0].indexOf('/><text'))}/><text ${m[3]}data-lcs-wrong="${trueVal}">${trueVal}</text>`);
    } }, /prints its true value/);
    // F5 distance
    const pairsOk = [[4, 35, 3, 1], [11, 22, 1, 1], [24, 67, 4, 3], [63, 86, 2, 3], [13, 78, 6, 5], [87, 99, 1, 2], [45, 58, 1, 3], [6, 47, 4, 1]].map(([a, b, down, right]) => ({ a, b, down, right }));
    facePoison('P9 F5 B in A\'s row at d2 (down 0)', 'F5', { items: [{ a: 34, b: 37, down: 0, right: 3 }, ...pairsOk.slice(1)] }, /outside 1\.\.6|P9/);
    facePoison('F5 counters swapped', 'F5', { items: [{ a: 34, b: 57, down: 3, right: 2 }, ...pairsOk.slice(1)] }, /derived|P9/);
    facePoison('F5 A equals B', 'F5', { items: [{ a: 34, b: 34, down: 0, right: 0 }, ...pairsOk.slice(1)] }, /A equals B/);
    facePoison('F5 every counter the same', 'F5', { items: [[4, 26, 2, 2], [11, 33, 2, 2], [41, 63, 2, 2], [15, 37, 2, 2], [51, 73, 2, 2], [61, 83, 2, 2], [7, 29, 2, 2], [44, 66, 2, 2]].map(([a, b, down, right]) => ({ a, b, down, right })) }, /constant/);
    facePoison('F5 a number printed twice on the page', 'F5', { items: [pairsOk[0], { a: 35, b: 57, down: 2, right: 2 }, ...pairsOk.slice(2)] }, /twice|duplicate value/);
    facePoison('F5 a counter written into its box', 'F5', { post: (h) => replaceOnce(h, /(<span class="ws-blankbox" data-lcs-counter="down" data-lcs-answer="(\d+)"[^>]*>)(<\/span>)/, (m) => `${m[1]}${m[2]}${m[3]}`) }, /answer printed/);
    facePoison('F5 counter boxes shrunk to 30', 'F5', { post: (h) => { const out = h.replace(/style="width:44px;height:44px;flex:0 0 44px"/g, 'style="width:30px;height:30px;flex:0 0 30px"'); if (out === h) throw new Error('NEEDLE MATCHED NOTHING (counter boxes)'); return out; } }, /< G2 floor/);
    facePoison('F5 cards stretched under 3-line chrome (footer)', 'F5', { strings: LONG_CHROME, pageSize: 'a4', post: (h) => h.replace(/<section class="ws-card"/g, '<section class="ws-card" style="min-height:190px"') }, /footer overlap|overflow|outside the body|outside the card/);

    let killed = 0;
    for (const p of poisons) {
      let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
      const ok = res === null;
      if (ok) killed++;
      console.log(`[D] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
    }
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    const verdict = failures.length === 0;
    if (failures.length) console.log('FAILS:\n  ' + failures.join('\n  '));
    console.log(`G1-310 gate (base + 5 faces): ${verdict ? 'PASS' : 'FAIL'} (${assertions} assertions, ${killed}/${poisons.length} poisons killed${failures.length ? ', ' + failures.length + ' failures' : ''})`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { checkBank, checkShapes, LONG_CHROME, WORST_CHROME };
