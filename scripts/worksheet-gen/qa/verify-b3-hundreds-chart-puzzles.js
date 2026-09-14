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
 *      DEFERRED to the Phase-2 faces (they need face code the base does not
 *      carry): P4 F4 two wrong cells · P5 F2 `40 R` / `5 U` · P6 F1 guide
 *      cell / shared cell · P7 F3 clues disagree · P9 F5 d1 shape at d2 · P10
 *      F4 2-cell piece · the F4 wrap decoy. Printed as DEFERRED, never counted.
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

async function main() {
  const locales = arg('locales', 'en').split(',');
  const seeds = +arg('seeds', QUICK ? 6 : 20);
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
    }

    // ---- D. poisons (en; each must FAIL; control = the correct bank + page)
    const loc = 'en';
    const cfg = bankAll.en;
    const control = await renderCheck(page, type, null, { difficulty: 2, locale: loc, baseName: 'G1-310-control' });
    note(control.fails.length === 0 && checkBank(cfg, loc, type).length === 0, 'control (correct bank + page) did not pass: ' + control.fails.join(' | '));
    const poisons = [];
    const deferred = ['P4 F4 piece with two wrong cells', 'P5 F2 chain 40 R / 5 U', 'P6 F1 piece on guide cell 31 / two pieces sharing 56', 'P7 F3 [43][D] + [55][L] / start equals target', 'P9 F5 d2 item with B in A\'s row', 'P10 F4 piece of 2 cells', 'F4 wrap decoy [39][40][41]'];
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

    let killed = 0;
    for (const p of poisons) {
      let res; try { res = await p.run(); } catch (e) { res = 'threw ' + e.message; }
      const ok = res === null;
      if (ok) killed++;
      console.log(`[D] ${p.name}: ${ok ? 'KILLED' : 'SURVIVED — ' + res}`);
    }
    for (const d of deferred) console.log(`[D] ${d}: DEFERRED (Phase-2 face code; not counted)`);
    note(killed === poisons.length, `${poisons.length - killed} poison(s) survived`);
    const verdict = failures.length === 0;
    if (failures.length) console.log('FAILS:\n  ' + failures.join('\n  '));
    console.log(`G1-310 gate: ${assertions} assertions, ${failures.length} failures, poisons ${killed}/${poisons.length} killed (${deferred.length} deferred to the faces) → ${verdict ? 'PASS' : 'FAIL'}`);
    process.exitCode = verdict ? 0 : 1;
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { checkBank, checkShapes, LONG_CHROME, WORST_CHROME };
