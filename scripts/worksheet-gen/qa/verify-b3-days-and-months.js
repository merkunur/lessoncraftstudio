#!/usr/bin/env node
/**
 * verify-b3-days-and-months.js — the K-321 `days-and-months` gate
 * (design file §5; brief deliverable 4). Sections 1-4 = the BASE page
 * (Phase 1); sections 5-8 = the FIVE FACES (Phase 2, 2026-09-14; record
 * _work/K-321-faces.md): K-337 gaps · G1-319 neighbours · G1-320 months
 * (the base path) · G1-321 months-neighbours · G1-322 abbrev.
 *
 *   node scripts/worksheet-gen/qa/verify-b3-days-and-months.js [--quick]
 *
 * 1. BANK — every locale block of data/b3/days-and-months.js against the §5
 *    validator rules: (1) the 5 labels present, /^[\p{L}' -]+$/u, <= 12
 *    glyphs, distinct within {yesterday,today,tomorrow} and {before,after};
 *    (2) the block defines NO dayNames / monthNames / dayAbbr / weekStart
 *    (names live in data/b2/calendar.js); `dayShort`, if set, 7 distinct
 *    case-insensitive prefixes of dayNames; `names === 'calendar'`; `abbrev`
 *    'calendar' | null; (3) title <= 70 without the worksheet word,
 *    instruction <= 150, no `{`; the CALENDAR-STEM ban /calend|kalend|kalent/
 *    in every title AND instruction (G2-298 owns that head); the SEASON ban
 *    (the genre word + the four season names per locale); (5) over
 *    CALENDAR itself: dayAbbr[i] a case-insensitive prefix of dayNames[i]
 *    in all 11 locales (77/77) unless the block sets abbrev:null.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): en d1 / d2 / d3 + the README 722-px floor test (a legal
 *    3-line title + a legal 3-line instruction — measured 2026-09-14 in this
 *    pipeline the body then comes to 710 px, BELOW the README's 722, so the
 *    test runs at the harder floor and asserts the 3 + 3 lines it produced)
 *    on the two tallest stacks (d1, d2). Asserts verify() empty, qa/lints.js clean, and ITSELF: every rank
 *    box and name tile >= tokens.density.K.minElement (56), the given cell's
 *    numeral >= the K fontChoice 30, rows === n, given count === config,
 *    every tile's text narrower than its tile, rows inside the body column
 *    and above the footer, the stack's height budget (<= 722 for the
 *    ship-level d2 and the strip level d1).
 *    WIDTHS ARE MEASURED IN THE RENDERED PAGE (the README font trap: a blank
 *    puppeteer page falls back to a system font ~6 % narrower): every day
 *    name of all 11 locales at Baloo 2 700 26 / 28 and every month name at
 *    24 / 22 against the design floors — day at 26 <= 416 (base tile inner)
 *    and <= 226 (d3 tile inner), at 28 <= 416 (d1); month at 24 <= 216 (F3
 *    tile inner), at 22 <= 145 (F4 today tile). Control: `Wednesday` at 26
 *    within 3 px of the design's 135.1 proves the woff2 loaded.
 * 3. SWEEP — 20 seeds x d1/d2/d3 (build only): rules (a)-(c) every seed, and
 *    >= 12 distinct permutations over the 20 d2 seeds (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON, no fail = SILENT; either exits 1). The correct
 *    EN bank is the control (0 findings, renders clean, verify empty).
 *      P2a a de page anchored on Sonntag (weekStart poisoned to 0)  → verify "anchor ≠ weekStart"; control Montag PASSES
 *      P2b an en page anchored on Monday (weekStart poisoned to 1)   → verify "anchor ≠ weekStart"; control Sunday PASSES
 *      P3a the rows in calendar order                                → verify "own rank position"
 *      P3b one forward run of two rows (no fixed point)              → verify "forward run" and ONLY that
 *      P5a an en tile reading `monday`                               → verify "verbatim"
 *      P5b a de tile reading `Sonnabend`                             → verify "verbatim"
 *      P8  a title carrying `Kalender`                               → bank calendar-stem ban; `Wochentage in der richtigen Reihenfolge` PASSES
 *      P9  an instruction carrying `Jahreszeiten`                    → bank season ban
 *      P12 two boxes both answering 3                                → verify "same answer"
 *      P13 rows pinned at a fixed 100 px (784 > 722) under 3-line chrome → qa/lints.js footer / overflow lint
 *      P14 a bank that defines dayNames                              → bank rule 2 AND the spec REFUSES to build
 *      P15 a rank box forced to 48 px                                → the gate's OWN K floor (verify and lints are blind to it)
 * 5. PARITY — every face's emitted i18n.en (title + instruction) === the
 *    bank's strings[<face id>] verbatim (one source); the bank validator
 *    (section 1) already bans the calendar stem + season words in them.
 * 6. FACE RENDERS — each of the five faces through the real pipeline at d2
 *    en under the en chrome AND the WORST LEGAL chrome (a 68-char Finnish
 *    title that wraps to 4 lines + a 150-char instruction that wraps to 3:
 *    measured 2026-09-14 the body is then 677 px — the design's 722 and the
 *    base record's 710 are both above it; the gate asserts the 4 + 3 lines it
 *    produced and the <= 677 body). Asserts verify() empty, lints clean, and
 *    ITSELF: F1 every rung >= 72 (K floor 56) and FILLING its grid row, the
 *    gap boxes >= 70, the bank in <= 2 rows, pills 20 px; F2/F4 rows 6, lanes
 *    223 x 68, today tiles 161 x 68 with the name inside the 145 px inner
 *    width (G1 floor 44); F3 the base assertions with the face's config at
 *    the G1 band; F5 7 + 7 items >= 44, 14 dots; every face inside the body
 *    column and above the footer. Plus the day@22 width floor (F2 today
 *    tile inner 145) over all 11 locales' names.
 * 7. FACE SWEEP — 20 seeds per face (build only; --quick skips): F1 the
 *    four non-adjacent gap patterns all occur + the bank rules every seed;
 *    F2/F4 a wrap row and distinct givens every seed; F5 a derangement every
 *    seed; F3 rules (a)-(c) over the 12-month reading order every seed.
 * 8. FACE POISONS (each must FAIL for its OWN reason; the correct faces are
 *    the controls):
 *      P1  F1 rung 1 blank (no printed anchor)                → verify "rung 1 is a gap"
 *      P4a F1 bank in week order / P4b reversed / P4c one forward pair (Sunday, Monday adjacent) → verify
 *      P19 F1 two adjacent gaps on an adjacentGaps:false page  → verify "both gaps"
 *      P6  F2 the wrap row's wrapping neighbour answering the given day itself (Saturday → "Saturday") → verify
 *      P7  F4 December's after-answer = December (or January's before = January) → verify
 *      P20 F2 the today head reading "Today" (not the bank literal)   → verify "(verbatim)"
 *      P10 a pt F2 page with the today tile at 24 (segunda-feira 152.3 > 145) → the gate's width floor + verify "wider"; pt at 22 PASSES (control)
 *      P11 F5 one abbreviation beside its own name                    → verify "beside its own name"
 *      P21 F5 the left column out of week order (Mon above Sun)      → verify "not the en week order"
 *      P16 a face whose i18n title drifts from the bank string        → parity
 *      P17 a bank with abbrev:null                                     → F5 build REFUSES
 *      P18 F3 the "1" cell moved off January                           → verify "anchor ≠ weekStart"
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b3-common.js');
const { CALENDAR } = require('../data/b2/calendar.js');
const tokens = require('../primitives/_tokens.js');

const TYPE = require('../types/k/K-321-days-and-months.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const K = tokens.density.K;                 // minElement 56, fontChoice 30
const BODY_FLOOR = 722;                     // README: three-line title + three-line instruction
const LABEL_KEYS = ['yesterday', 'today', 'tomorrow', 'before', 'after'];
const CAL_STEM = /calend|kalend|kalent/iu;
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä/i;
const SEASON = {
  en: ['season', 'seasons', 'spring', 'summer', 'autumn', 'fall', 'winter'],
  de: ['jahreszeit', 'jahreszeiten', 'frühling', 'sommer', 'herbst', 'winter'],
  es: ['estación', 'estaciones', 'primavera', 'verano', 'otoño', 'invierno'],
  pt: ['estação', 'estações', 'primavera', 'verão', 'outono', 'inverno'],
  fr: ['saison', 'saisons', 'printemps', 'été', 'automne', 'hiver'],
  it: ['stagione', 'stagioni', 'primavera', 'estate', 'autunno', 'inverno'],
  nl: ['seizoen', 'seizoenen', 'lente', 'zomer', 'herfst', 'winter'],
  sv: ['årstid', 'årstider', 'vår', 'sommar', 'höst', 'vinter'],
  da: ['årstid', 'årstider', 'forår', 'sommer', 'efterår', 'vinter'],
  no: ['årstid', 'årstider', 'vår', 'sommer', 'høst', 'vinter'],
  fi: ['vuodenaika', 'vuodenajat', 'kevät', 'kesä', 'syksy', 'talvi'],
};
// design §2 floors (tile inner widths) — the data-side guard for every locale
const WIDTH_FLOORS = [
  { what: 'day', px: 26, max: 416, why: 'base tile 440 inner' },
  { what: 'day', px: 28, max: 416, why: 'd1 tile 440 inner' },
  { what: 'day', px: 26, max: 226, why: 'd3 tile 250 inner' },
  { what: 'month', px: 24, max: 216, why: 'F3 tile 240 inner' },
  { what: 'month', px: 22, max: 145, why: 'F4 today tile 161 inner' },
];

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
function seasonRe(loc) {
  const words = SEASON[loc] || SEASON.en;
  return new RegExp('(?<!\\p{L})(' + words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?!\\p{L})', 'iu');
}

/* ------------------------------------------------------------------ bank */
function validateBank(bank, loc) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  if (!bank || typeof bank !== 'object') { push('no block'); return f; }
  const cal = CALENDAR[loc];
  if (!cal) push('no CALENDAR table for this locale');
  // rule 2: the names are NOT in the bank
  for (const k of ['dayNames', 'monthNames', 'dayAbbr', 'weekStart']) if (k in bank) push(`defines ${k} — a name fix is a calendar.js commit, never a bank copy`);
  if (bank.names !== 'calendar') push(`names must be the sentinel 'calendar' (got ${JSON.stringify(bank.names)})`);
  if (!(bank.abbrev === 'calendar' || bank.abbrev === null)) push(`abbrev must be 'calendar' | null (got ${JSON.stringify(bank.abbrev)})`);
  if (bank.dayShort !== null && bank.dayShort !== undefined) {
    if (!Array.isArray(bank.dayShort) || bank.dayShort.length !== 7) push('dayShort must be null or 7 strings');
    else {
      if (new Set(bank.dayShort).size !== 7) push('dayShort has a duplicate');
      if (cal) bank.dayShort.forEach((s, i) => { if (!cal.dayNames[i].toLocaleLowerCase(loc).startsWith(String(s).toLocaleLowerCase(loc))) push(`dayShort "${s}" is not a prefix of "${cal.dayNames[i]}"`); });
    }
  }
  // rule 1: labels
  const labels = bank.labels || {};
  for (const k of LABEL_KEYS) {
    const v = labels[k];
    if (typeof v !== 'string' || !v) { push(`label ${k} missing`); continue; }
    if (!/^[\p{L}' -]+$/u.test(v)) push(`label ${k} "${v}" carries a non-letter`);
    if ([...v].length > 12) push(`label ${k} "${v}" > 12 glyphs`);
  }
  const tri = ['yesterday', 'today', 'tomorrow'].map((k) => (labels[k] || '').toLocaleLowerCase(loc));
  if (new Set(tri).size !== 3) push('yesterday / today / tomorrow are not distinct');
  const duo = ['before', 'after'].map((k) => (labels[k] || '').toLocaleLowerCase(loc));
  if (new Set(duo).size !== 2) push('before / after are not distinct');
  // rule 3: strings
  const strings = bank.strings || {};
  for (const [id, s] of Object.entries(strings)) {
    const tag = (x) => `${id}: ${x}`;
    if (!s || typeof s.title !== 'string' || !s.title) { push(tag('no title')); continue; }
    if ([...s.title].length > 70) push(tag('title > 70 chars'));
    if (WORKSHEET_WORD.test(s.title)) push(tag('title carries the worksheet word'));
    if (typeof s.instruction !== 'string' || !s.instruction) push(tag('no instruction'));
    else {
      if ([...s.instruction].length > 150) push(tag('instruction > 150 chars'));
      if (s.instruction.includes('{')) push(tag('instruction carries a slot "{"'));
    }
    for (const [field, text] of [['title', s.title], ['instruction', s.instruction || '']]) {
      if (CAL_STEM.test(text)) push(tag(`${field} carries the calendar stem ("${text.match(CAL_STEM)[0]}") — G2-298 owns that head`));
      const m = text.match(seasonRe(loc));
      if (m) push(tag(`${field} carries a season word ("${m[0]}") — K-322 owns seasons`));
    }
  }
  for (const id of ['K-321', 'K-337', 'G1-319', 'G1-320', 'G1-321', 'G1-322']) if (!strings[id]) push(`strings ${id} missing`);
  // rule 5: dayAbbr is a prefix of dayNames (data in calendar.js) unless refused
  if (cal && bank.abbrev === 'calendar') {
    cal.dayAbbr.forEach((a, i) => {
      if (!cal.dayNames[i].toLocaleLowerCase(loc).startsWith(String(a).toLocaleLowerCase(loc))) push(`dayAbbr "${a}" is not a prefix of "${cal.dayNames[i]}"`);
    });
  }
  return f;
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, locale = 'en', baseName, seedEpoch, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, unit: null, page, outDir: OUT, baseName, seedEpoch, strings });
  const m = await page.evaluate(() => {
    const root = document.querySelector('[data-ws-content][data-lcs-order]');
    const rows = [...document.querySelectorAll('[data-lcs-row]')].map((r) => {
      const b = r.getBoundingClientRect();
      const tile = r.querySelector('.ws-nametile');
      const cell = r.querySelector('.ws-rankbox, .ws-answerbox');
      const tb = tile ? tile.getBoundingClientRect() : { width: 0, height: 0 };
      const cb = cell ? cell.getBoundingClientRect() : { width: 0, height: 0 };
      return {
        top: b.top, bottom: b.bottom, left: b.left, right: b.right,
        tileW: tb.width, tileH: tb.height, tileText: tile ? tile.textContent : '',
        tileScroll: tile ? (() => { const rg = document.createRange(); rg.selectNodeContents(tile); return rg.getBoundingClientRect().width; })() : 0,
        tileClient: tile ? (() => { const cs = getComputedStyle(tile); return tile.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); })() : 0,
        cellW: cb.width, cellH: cb.height, given: cell && cell.classList.contains('ws-rankbox') ? cell.textContent.trim() : null,
        givenPx: cell && cell.classList.contains('ws-rankbox') ? parseFloat(getComputedStyle(cell).fontSize) : null,
      };
    });
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const grid = root ? root.getBoundingClientRect() : null;
    const strip = document.querySelector('[data-lcs-strip]');
    const titleEl = document.querySelector('.ws-title'), instrEl = document.querySelector('.ws-instruction p');
    // line count = height / the height of a one-line clone (line-height may compute to "normal")
    const lines = (el) => { const c = el.cloneNode(false); c.textContent = 'x'; c.style.position = 'absolute'; c.style.visibility = 'hidden'; c.style.width = el.getBoundingClientRect().width + 'px'; el.parentNode.appendChild(c); const one = c.getBoundingClientRect().height; c.remove(); return Math.round(el.getBoundingClientRect().height / one); };
    return {
      stamps: root ? { ...root.dataset } : null, rows, titleLines: lines(titleEl), instrLines: lines(instrEl),
      body: { left: body.left, right: body.right, top: body.top, bottom: body.bottom, height: body.height },
      grid: grid ? { top: grid.top, bottom: grid.bottom } : null,
      strip: strip ? strip.getBoundingClientRect().height : 0,
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath };
}

function assertRender(name, r, d, { bodyFloor, cfg: cfgIn, band: bandIn, bodyMax } = {}) {
  const cfg = cfgIn || TYPE.difficulty[d];
  const K = bandIn || tokens.density.K;
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.stamps && r.m.stamps.lcsUnit === cfg.unit && +r.m.stamps.lcsN === cfg.n && +r.m.stamps.lcsCols === cfg.cols, `${name}: root stamps ${JSON.stringify(r.m.stamps)} ≠ config`);
  ok(r.m.rows.length === cfg.n, `${name}: ${r.m.rows.length} rows ≠ ${cfg.n}`);
  const givens = r.m.rows.filter((x) => x.given !== null);
  ok(givens.length === cfg.given.length, `${name}: ${givens.length} given cells ≠ ${cfg.given.length}`);
  ok(givens.map((x) => +x.given).sort().join() === [...cfg.given].sort().join(), `${name}: given ranks ${givens.map((x) => x.given)} ≠ ${cfg.given}`);
  let minEl = Infinity;
  for (const x of r.m.rows) {
    minEl = Math.min(minEl, x.cellW, x.cellH, x.tileH);
    ok(x.tileScroll <= x.tileClient + 0.6, `${name}: "${x.tileText}" ${Math.round(x.tileScroll)} px wider than its tile inner ${Math.round(x.tileClient)}`);
    ok(Math.abs(x.tileW - cfg.tileW) < 1, `${name}: tile width ${x.tileW} ≠ ${cfg.tileW}`);
    ok(x.left >= r.m.body.left - 0.6 && x.right <= r.m.body.right + 0.6, `${name}: row "${x.tileText}" outside the body column`);
    ok(x.bottom <= r.m.foot - 0.6, `${name}: row "${x.tileText}" reaches the footer`);
    if (x.givenPx !== null) ok(x.givenPx >= K.fontChoice - 0.6, `${name}: given numeral ${x.givenPx} px < K ${K.fontChoice}`);
  }
  ok(minEl >= K.minElement - 0.6, `${name}: element ${Math.round(minEl)} px < K floor ${K.minElement}`);
  // the stack budget: the design's stack (rows at their floor + gaps + strip) must fit the 722 floor
  const stack = cfg.n / cfg.cols * cfg.boxPx + (Math.ceil(cfg.n / cfg.cols) - 1) * 14 + (cfg.strip ? 40 + 14 : 0);
  ok(stack <= BODY_FLOOR, `${name}: design stack ${stack} > ${BODY_FLOOR}`);
  if (bodyFloor) {
    ok(r.m.titleLines === 3 && r.m.instrLines === 3, `${name}: chrome is ${r.m.titleLines}-line title + ${r.m.instrLines}-line instruction (the floor test needs 3 + 3)`);
    ok(r.m.body.height <= bodyFloor, `${name}: body ${Math.round(r.m.body.height)} px — the long-chrome test did not reach the ${bodyFloor} floor`);
  }
  if (bodyMax) ok(r.m.body.height <= bodyMax, `${name}: body ${Math.round(r.m.body.height)} px — the worst-chrome fixture did not squeeze the body to <= ${bodyMax}`);
  return minEl;
}

/* ===================================================================== PHASE 2 — the faces (sections 5-8) */
const { loadType } = require('../lib/load-types.js');
const ROWS_MOD = require('../tools/b3var-rows/days-and-months.js');
const G1 = tokens.density.G1;                 // minElement 44, fontChoice 26
// the WORST LEGAL chrome: a 68-char title that wraps to 4 lines + a 150-char instruction that wraps to 3 → body 677 (measured 2026-09-14)
const WORST = {
  title: 'Viikonpäivienlyhenteet yhdistettäväksi viikonpäivännimiin oikein nyt',
  instruction: 'Der erste Wochentag hat schon die Zahl 1. Schreibe die Zahlen 2 bis 7 in die Kästchen: Welcher Wochentag kommt danach? Welcher Wochentag kommt zuletzt',
  body: 677, titleLines: 4, instrLines: 3,
};
const FACE_IDS = { gaps: 'K-337', neighbours: 'G1-319', months: 'G1-320', monthsNeighbours: 'G1-321', abbrev: 'G1-322' };

/** A face type over an INJECTED bank (+ calendar, + an html edit) — `_buildWith` runs with the FACE's difficulty. */
function faceWith(face, bank, cal, edit, extra) {
  return Object.assign({}, face, {
    build(args, ctx) { const out = face._buildWith(bank, args, ctx, cal); if (edit) out.bodyHtml = edit(out.bodyHtml, out.meta); return out; },
  }, extra || {});
}
function faceCfg(face, over) {
  const D = { ...face.difficulty[2], ...over };
  return Object.assign({}, face, { difficulty: { 1: D, 2: D, 3: D } });
}

async function renderFace(page, type, { locale = 'en', baseName, strings }) {
  const out = await renderInstance({ type, theme: null, difficulty: 2, locale, unit: null, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
    const root = document.querySelector('[data-ws-content][data-lcs-layout], [data-ws-content][data-lcs-order]');
    const rect = (e) => { const b = e.getBoundingClientRect(); return { top: b.top, bottom: b.bottom, left: b.left, right: b.right, w: b.width, h: b.height }; };
    // the lowest INK: the apparatus pieces (tiles, boxes, pills, items, the rail), never a layout container that merely fills the body
    const INK = '.ws-nametile,.ws-blankbox,.ws-bankword,.ws-match-item,.ws-rankbox,.ws-answerbox,[data-lcs-rail],.ws-raildot,[data-lcs-head],.ws-match-dot';
    let lowest = 0;
    (root ? root.querySelectorAll(INK) : []).forEach((e) => { const b = e.getBoundingClientRect(); if (b.width && b.height) lowest = Math.max(lowest, b.bottom); });
    const lines = (el) => { const c = el.cloneNode(false); c.textContent = 'x'; c.style.position = 'absolute'; c.style.visibility = 'hidden'; c.style.width = el.getBoundingClientRect().width + 'px'; el.parentNode.appendChild(c); const one = c.getBoundingClientRect().height; c.remove(); return Math.round(el.getBoundingClientRect().height / one); };
    // text width by Range (a centred inline-flex overflow spills into negative x, invisible to scrollWidth) vs the box's inner width
    const textOf = (e) => { const rg = document.createRange(); rg.selectNodeContents(e); const cs = getComputedStyle(e);
      return { text: e.textContent, scroll: rg.getBoundingClientRect().width, client: e.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), px: parseFloat(cs.fontSize) }; };
    return {
      layout: root ? root.dataset.lcsLayout || 'base' : null,
      body: { height: body.height, left: body.left, right: body.right, top: body.top, bottom: body.bottom }, foot, lowest,
      titleLines: lines(document.querySelector('.ws-title')), instrLines: lines(document.querySelector('.ws-instruction p')),
      root: root ? rect(root) : null,
      rungs: [...document.querySelectorAll('[data-lcs-rung]')].map((r) => ({
        ...rect(r), gap: r.dataset.lcsGap === '1', day: +r.dataset.lcsDay,
        inner: r.firstElementChild ? rect(r.firstElementChild) : null,
        tile: r.querySelector('.ws-nametile') ? textOf(r.querySelector('.ws-nametile')) : null,
        box: r.querySelector('.ws-blankbox') ? rect(r.querySelector('.ws-blankbox')) : null,
        lanes: r.querySelectorAll('[data-lcs-prim="writing-row"]').length,
      })),
      rail: ['top', 'line', 'head'].map((k) => { const e = document.querySelector(`[data-lcs-rail="${k}"]`); return e ? rect(e) : null; }),
      bank: document.querySelector('[data-lcs-bank]') ? rect(document.querySelector('[data-lcs-bank]')) : null,
      pills: [...document.querySelectorAll('[data-lcs-bank-word]')].map((e) => ({ ...rect(e), ...textOf(e), day: +e.dataset.lcsBankWord })),
      nrows: [...document.querySelectorAll('[data-lcs-today]')].map((r) => ({
        ...rect(r), today: +r.dataset.lcsToday,
        lanes: [...r.querySelectorAll('[data-lcs-lane]')].map((l) => ({ ...rect(l), role: l.dataset.lcsLane, lanes: l.querySelectorAll('[data-lcs-prim="writing-row"]').length })),
        tiles: [...r.querySelectorAll('.ws-nametile')].map((t) => ({ ...rect(t), ...textOf(t) })),
      })),
      heads: [...document.querySelectorAll('[data-lcs-head]')].map((e) => ({ ...rect(e), ...textOf(e), role: e.dataset.lcsHead })),
      matchL: [...document.querySelectorAll('[data-lcs-abbr]')].map((e) => ({ ...rect(e), ...textOf(e.querySelector('span')), day: +e.dataset.lcsAbbr })),
      matchR: [...document.querySelectorAll('[data-lcs-name]')].map((e) => ({ ...rect(e), ...textOf(e.querySelector('span')), day: +e.dataset.lcsName })),
      dots: document.querySelectorAll('.ws-match-dot').length,
      widthDay22: (() => {   // the F2 today tile inner (145) over every locale's day names at 22 — measured in the real fonts
        const probe = document.createElement('span');
        probe.setAttribute('style', "position:absolute;visibility:hidden;white-space:nowrap;font-family:'Baloo 2',cursive;font-weight:700;font-size:22px");
        document.body.appendChild(probe);
        const out = [];
        for (const [loc, list] of Object.entries(window.__K321_DAYS || {})) for (const text of list) { probe.textContent = text; out.push({ loc, text, w: probe.getBoundingClientRect().width }); }
        probe.remove();
        return out;
      })(),
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, meta: out.meta };
}

function assertFaceCommon(name, r, band, { worst } = {}) {
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.root, `${name}: no face root`);
  if (r.m.root) {
    ok(r.m.root.left >= r.m.body.left - 0.6 && r.m.root.right <= r.m.body.right + 0.6, `${name}: the apparatus leaves the body column`);
    ok(r.m.lowest <= r.m.foot - 0.6, `${name}: content reaches ${Math.round(r.m.lowest)} against the footer at ${Math.round(r.m.foot)}`);
  }
  if (worst) {
    ok(r.m.titleLines === WORST.titleLines && r.m.instrLines === WORST.instrLines, `${name}: chrome is ${r.m.titleLines}-line title + ${r.m.instrLines}-line instruction (the worst-chrome test needs ${WORST.titleLines} + ${WORST.instrLines})`);
    ok(r.m.body.height <= WORST.body, `${name}: body ${Math.round(r.m.body.height)} px — the worst-chrome fixture did not squeeze the body to <= ${WORST.body}`);
  }
}
function assertGaps(name, r, cfg) {
  assertFaceCommon(name, r, K, { worst: !!r.worst });
  ok(r.m.rungs.length === 7, `${name}: ${r.m.rungs.length} rungs`);
  ok(r.m.rungs.filter((x) => x.gap).length === cfg.gaps, `${name}: ${r.m.rungs.filter((x) => x.gap).length} gaps ≠ ${cfg.gaps}`);
  let minRung = Infinity;
  for (const x of r.m.rungs) {
    minRung = Math.min(minRung, x.h);
    ok(x.inner && Math.abs(x.inner.h - x.h) < 1, `${name}: rung ${x.day} inner ${x.inner && Math.round(x.inner.h)} px does not fill its ${Math.round(x.h)} px row`);
    if (x.gap) {
      ok(x.box && x.box.h >= 70 - 0.6, `${name}: gap box ${x.box && Math.round(x.box.h)} px < 70`);
      ok(x.lanes === 1, `${name}: gap rung has ${x.lanes} writing rows`);
    } else {
      ok(x.tile && x.tile.scroll <= x.tile.client + 0.6, `${name}: "${x.tile && x.tile.text}" wider than its rung`);
      ok(x.tile && Math.abs(x.tile.px - cfg.namePx) < 0.6, `${name}: rung name ${x.tile && x.tile.px} px ≠ ${cfg.namePx}`);
    }
  }
  ok(minRung >= (cfg.rungMin || 72) - 0.6, `${name}: rung ${Math.round(minRung)} px < rungMin ${cfg.rungMin || 72}`);
  ok(minRung >= K.minElement - 0.6, `${name}: rung ${Math.round(minRung)} px < K floor ${K.minElement}`);
  ok(r.m.rail.every(Boolean), `${name}: rail parts missing (${r.m.rail.map((x) => !!x)})`);
  ok(r.m.pills.length === 7, `${name}: ${r.m.pills.length} bank pills`);
  const tops = new Set(r.m.pills.map((x) => Math.round(x.top)));
  ok(tops.size <= 2, `${name}: the bank wraps to ${tops.size} rows`);
  for (const x of r.m.pills) {
    ok(x.scroll <= x.client + 0.6, `${name}: pill "${x.text}" clipped`);
    ok(Math.abs(x.px - 20) < 0.6, `${name}: pill "${x.text}" ${x.px} px ≠ 20`);
    ok(x.h >= 36 - 0.6, `${name}: pill "${x.text}" ${Math.round(x.h)} px tall < 36`);
  }
  ok(r.m.bank && r.m.bank.h <= 98 + 0.6, `${name}: bank lane ${r.m.bank && Math.round(r.m.bank.h)} px > 98 (a third row?)`);
  return minRung;
}
function assertNeighbours(name, r, cfg, band) {
  assertFaceCommon(name, r, band, { worst: !!r.worst });
  ok(r.m.nrows.length === cfg.rows, `${name}: ${r.m.nrows.length} rows ≠ ${cfg.rows}`);
  let minEl = Infinity;
  for (const row of r.m.nrows) {
    ok(row.lanes.length === 2, `${name}: row ${row.today} has ${row.lanes.length} lanes`);
    for (const l of row.lanes) {
      minEl = Math.min(minEl, l.w, l.h);
      ok(Math.abs(l.w - 223) < 1 && Math.abs(l.h - 68) < 1, `${name}: lane ${Math.round(l.w)}×${Math.round(l.h)} ≠ 223×68`);
      ok(l.lanes === 1, `${name}: lane without a writing row`);
    }
    ok(row.tiles.length === 1, `${name}: row ${row.today} has ${row.tiles.length} tiles`);
    for (const t of row.tiles) {
      minEl = Math.min(minEl, t.w, t.h);
      ok(Math.abs(t.w - 161) < 1 && Math.abs(t.h - 68) < 1, `${name}: today tile ${Math.round(t.w)}×${Math.round(t.h)} ≠ 161×68`);
      ok(t.scroll <= t.client + 0.6, `${name}: today "${t.text}" ${Math.round(t.scroll)} px wider than its tile inner ${Math.round(t.client)}`);
      ok(Math.abs(t.px - (cfg.todayPx || 22)) < 0.6, `${name}: today "${t.text}" ${t.px} px ≠ ${cfg.todayPx || 22}`);
    }
    ok(row.h >= 92 - 0.6, `${name}: row ${Math.round(row.h)} px < 92`);
  }
  ok(minEl >= band.minElement - 0.6, `${name}: element ${Math.round(minEl)} px < ${band.minElement}`);
  ok(r.m.heads.length === 3, `${name}: ${r.m.heads.length} heads`);
  for (const h of r.m.heads) { ok(h.scroll <= h.client + 0.6, `${name}: head "${h.text}" clipped`); if (h.text) ok(Math.abs(h.px - 20) < 0.6, `${name}: head "${h.text}" ${h.px} px ≠ 20`); }
  return minEl;
}
function assertAbbrev(name, r, cfg, band) {
  assertFaceCommon(name, r, band, { worst: !!r.worst });
  ok(r.m.matchL.length === 7 && r.m.matchR.length === 7, `${name}: ${r.m.matchL.length} + ${r.m.matchR.length} items`);
  ok(r.m.dots === 14, `${name}: ${r.m.dots} dots ≠ 14`);
  let minEl = Infinity;
  for (const x of [...r.m.matchL, ...r.m.matchR]) {
    minEl = Math.min(minEl, x.w, x.h);
    ok(x.scroll <= x.client + 0.6, `${name}: "${x.text}" clipped`);
    ok(x.h >= 66 - 0.6, `${name}: item "${x.text}" ${Math.round(x.h)} px < 66`);
  }
  for (const x of r.m.matchL) ok(Math.abs(x.px - 26) < 0.6, `${name}: abbreviation "${x.text}" ${x.px} px ≠ 26`);
  for (const x of r.m.matchR) ok(Math.abs(x.px - 24) < 0.6, `${name}: name "${x.text}" ${x.px} px ≠ 24`);
  ok(minEl >= band.minElement - 0.6, `${name}: element ${Math.round(minEl)} px < ${band.minElement}`);
  return minEl;
}

/** Find the rung html blocks of a gaps page (index = ladder order). */
const RUNG_RE = /<div class="ws-rung"[^>]*data-lcs-rung="(\d+)"[^>]*>[\s\S]*?<\/div>/g;
const PILL_RE = /<span class="ws-bankword"[^>]*>[^<]*<\/span>/g;
function reorderPills(html, order) {
  const pills = html.match(PILL_RE) || [];
  if (pills.length !== 7) throw new Error('reorderPills: ' + pills.length + ' pills matched');
  const byDay = new Map(pills.map((x) => [+/data-lcs-bank-word="(\d+)"/.exec(x)[1], x]));
  let k = 0;
  return html.replace(PILL_RE, () => byDay.get(order[k++]));
}


/** Widths measured INSIDE the rendered page (real woff2), for every locale's names. */
async function measureWidths(page) {
  const names = {};
  for (const [loc, c] of Object.entries(CALENDAR)) names[loc] = { days: c.dayNames, months: c.monthNames };
  return page.evaluate((names) => {
    const tile = document.querySelector('.ws-nametile');
    const probe = document.createElement('span');
    probe.setAttribute('style', tile.getAttribute('style'));
    probe.style.width = 'auto'; probe.style.padding = '0'; probe.style.border = '0'; probe.style.position = 'absolute'; probe.style.visibility = 'hidden';
    document.body.appendChild(probe);
    const out = { fontLoaded: document.fonts.check("700 26px 'Baloo 2'"), widths: [] };
    for (const [loc, t] of Object.entries(names)) {
      for (const [what, list] of [['day', t.days], ['month', t.months]]) {
        for (const px of what === 'day' ? [26, 28] : [24, 22]) {
          probe.style.fontSize = px + 'px';
          for (const text of list) {
            probe.textContent = text;
            out.widths.push({ loc, what, px, text, w: probe.getBoundingClientRect().width });
          }
        }
      }
    }
    probe.remove();
    return out;
  }, names);
}

/* ----------------------------------------------------------------- poison */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function typeWithBank(bank, cal) {
  return Object.assign({}, TYPE, { build(args, ctx) { return TYPE._buildWith(bank, args, ctx, cal); } });
}
function typeWithHtml(bank, cal, edit) {
  return Object.assign({}, TYPE, { build(args, ctx) { const out = TYPE._buildWith(bank, args, ctx, cal); out.bodyHtml = edit(out.bodyHtml, out.meta); return out; } });
}
const ROW_RE = /<div class="ws-orderrow"[^>]*>(?:<span[^>]*>[^<]*<\/span>){2}<\/div>/g;
/** Re-lay the rows in a new reading order (an array of the CURRENT row indices); re-stamps data-lcs-row. */
function reorderRows(html, order) {
  const rows = html.match(ROW_RE) || [];
  if (rows.length !== order.length) throw new Error(`reorderRows: ${rows.length} rows matched, want ${order.length} (the needle is blind)`);
  const laid = order.map((src, i) => rows[src].replace(/data-lcs-row="\d+"/, `data-lcs-row="${i}"`));
  let k = 0;
  return html.replace(ROW_RE, () => laid[k++]);
}
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
/** Run assertRender on a poisoned page and hand back ITS findings without charging the control. */
function gateFindings(name, r, d) {
  const before = fails.length, saved = assertions;
  assertRender(name, r, d);
  const found = fails.splice(before);
  assertions = saved;
  return found;
}

async function main() {
  const banks = bankModule('days-and-months');
  const locales = Object.keys(banks);
  // 1. bank (control) + the calendar.js prefix rule for every locale that has a table
  for (const loc of locales) {
    const f = validateBank(banks[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`bank ${loc}: names=${banks[loc].names} abbrev=${banks[loc].abbrev} dayShort=${banks[loc].dayShort ? 'set' : 'null'} labels ${LABEL_KEYS.map((k) => banks[loc].labels[k]).join('/')}`);
  }
  {
    let prefixOk = 0, total = 0;
    for (const [loc, c] of Object.entries(CALENDAR)) c.dayAbbr.forEach((a, i) => { total++; if (c.dayNames[i].toLocaleLowerCase(loc).startsWith(a.toLocaleLowerCase(loc))) prefixOk++; });
    ok(prefixOk === total && total === 77, `calendar.js dayAbbr prefix rule ${prefixOk}/${total} (want 77/77)`);
    console.log(`calendar.js: dayAbbr is a prefix of dayNames in ${prefixOk}/${total} slots`);
  }
  const en = banks.en;
  // a synthetic de block for the locale poisons (the de panel has not authored one; it is never written to disk)
  const deBank = { ...clone(en), labels: { yesterday: 'gestern', today: 'heute', tomorrow: 'morgen', before: 'davor', after: 'danach' },
    strings: { ...clone(en).strings, 'K-321': { title: 'Wochentage in der richtigen Reihenfolge', instruction: 'Der erste Tag der Woche hat schon die 1. Schreibe 2 bis 7 zu den anderen Tagen in der richtigen Reihenfolge.' } } };
  ok(validateBank(deBank, 'de').length === 0, 'the synthetic de control block must validate: ' + validateBank(deBank, 'de').join('; '));
  const deStrings = deBank.strings['K-321'];

  // 2. renders through the real pipeline
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `K-321-gate-d${d}-en` });
      const mi = assertRender(`d${d}`, r, d);
      pngs.push(r.png);
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} rows ${r.m.rows.length} min element ${Math.round(mi)} body ${Math.round(r.m.body.height)}`);
      if (d === 2) {
        // widths inside the real render
        const mw = await measureWidths(page);
        ok(mw.fontLoaded, 'Baloo 2 700 26 is not loaded in the rendered page (measuring a fallback font)');
        const wed = mw.widths.find((x) => x.loc === 'en' && x.what === 'day' && x.px === 26 && x.text === 'Wednesday');
        ok(wed && Math.abs(wed.w - 135.1) < 3, `control: Wednesday at 26 measures ${wed && wed.w.toFixed(1)} (design 135.1 with the real woff2)`);
        for (const fl of WIDTH_FLOORS) {
          const set = mw.widths.filter((x) => x.what === fl.what && x.px === fl.px);
          const widest = set.reduce((a, b) => (b.w > a.w ? b : a));
          ok(widest.w <= fl.max, `${fl.what} at ${fl.px}: widest "${widest.text}" (${widest.loc}) ${widest.w.toFixed(1)} > ${fl.max} (${fl.why})`);
          console.log(`width ${fl.what}@${fl.px}: widest ${widest.loc} "${widest.text}" ${widest.w.toFixed(1)} <= ${fl.max} (${fl.why})`);
        }
      }
    }
    // the README 722 floor: a 70-char title (3 lines) + a 150-char instruction (3 lines) on the two tallest stacks
    {
      // a legal title (<= 70 chars) that wraps to 3 lines in the ~375 px title column and a legal
      // instruction (<= 150 chars) that wraps to 3 lines: MEASURED 2026-09-14 in this pipeline the
      // body then comes to 710 px — below the README's 722 — so the test runs at the harder floor.
      const strings = { title: 'Wochentage in die richtige Reihenfolge bringen und Zahlen eintragen', instruction: 'Der erste Wochentag hat schon die Zahl 1. Schreibe die Zahlen 2 bis 7 in die Kästchen: Welcher Wochentag kommt danach? Welcher Wochentag kommt zuletzt' };
      ok([...strings.title].length <= 70 && [...strings.instruction].length <= 150, `long-chrome strings ${[...strings.title].length}/${[...strings.instruction].length} chars are not legal lengths`);
      for (const d of [1, 2]) {
        const r = await renderWith(page, TYPE, { difficulty: d, baseName: `K-321-gate-d${d}-en-longchrome`, strings });
        assertRender(`d${d} long chrome`, r, d, { bodyFloor: BODY_FLOOR });
        pngs.push(r.png);
        console.log(`render d${d} long chrome: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.height)} px (floor ${BODY_FLOOR}) rows ${r.m.rows.map((x) => Math.round(x.bottom - x.top)).join('/')}`);
      }
    }
    // de control (synthetic block; real CALENDAR.de) renders clean and anchors on Montag
    {
      const r = await renderWith(page, typeWithBank(deBank), { difficulty: 2, locale: 'de', baseName: 'K-321-gate-d2-de-control', strings: deStrings });
      assertRender('d2 de control', r, 2);
      const anchor = r.m.rows.find((x) => x.given === '1');
      ok(anchor && anchor.tileText === 'Montag', `de control anchors on ${anchor && anchor.tileText} (want Montag)`);
      pngs.push(r.png);
      console.log(`render d2 de control: verify ${r.verify.length} lints ${r.lints.length} anchor ${anchor && anchor.tileText}`);
    }
    // refusals
    {
      let threw = '';
      try { TYPE.build({ theme: null, difficulty: 2, locale: 'xx' }, { rng: makeRng('x') }); } catch (e) { threw = e.message; }
      ok(/no xx block/.test(threw), 'an unauthored locale must REFUSE (throw), not fall back to en: ' + threw);
      threw = '';
      try { TYPE._buildWith({ ...clone(en), names: 'copy' }, { difficulty: 2, locale: 'en' }, { rng: makeRng('x') }); } catch (e) { threw = e.message; }
      ok(/names:'calendar'/.test(threw), 'a bank without the calendar sentinel must refuse: ' + threw);
    }

    // 3. seed sweep (build only)
    if (!QUICK) {
      const perms = new Set();
      for (const d of [1, 2, 3]) {
        for (let k = 1; k <= 20; k++) {
          const rng = makeRng(instanceSeed({ typeId: 'K-321', theme: null, difficulty: d, seedEpoch: k }));
          const b = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
          const f = TYPE.shuffleRules(b.meta.order, CALENDAR.en.weekStart, 7);
          ok(f.length === 0, `sweep d${d} seed ${k}: ${f.join('; ')}`);
          ok(b.meta.order.length === 7 && new Set(b.meta.order).size === 7, `sweep d${d} seed ${k}: not a permutation`);
          if (d === 2) perms.add(b.meta.order.join(','));
        }
      }
      ok(perms.size >= 12, `sweep: only ${perms.size} distinct d2 permutations over 20 seeds`);
      console.log(`sweep: 60 builds clean, ${perms.size} distinct d2 permutations over 20 seeds`);
    }

    // 4. poisons
    let killed = 0;
    const TOTAL = 12;
    // P2a — de anchored on Sonntag (weekStart poisoned to 0); control = the de render above
    {
      const r = await renderWith(page, typeWithBank(deBank, { ...CALENDAR.de, weekStart: 0 }), { difficulty: 2, locale: 'de', baseName: 'K-321-gate-poison-P2a', strings: deStrings });
      if (judge('P2a de anchor on Sonntag', r.verify, /anchor "1" sits on Sonntag ≠ the de first day Montag \(anchor ≠ weekStart\)/)) killed++;
    }
    // P2b — en anchored on Monday (weekStart poisoned to 1); control = the en renders above
    {
      const r = await renderWith(page, typeWithBank(en, { ...CALENDAR.en, weekStart: 1 }), { difficulty: 2, baseName: 'K-321-gate-poison-P2b' });
      if (judge('P2b en anchor on Monday', r.verify, /anchor "1" sits on Monday ≠ the en first day Sunday \(anchor ≠ weekStart\)/)) killed++;
    }
    // P3a — the rows in calendar order
    {
      const t = typeWithHtml(en, null, (html, meta) => {
        const order = meta.order.map((day, i) => ({ day, i })).sort((a, b) => TYPE.rankOf(CALENDAR.en, 'days', a.day) - TYPE.rankOf(CALENDAR.en, 'days', b.day)).map((x) => x.i);
        return reorderRows(html, order);
      });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'K-321-gate-poison-P3a' });
      if (judge('P3a calendar order', r.verify, /sits at its own rank position/)) killed++;
    }
    // P3b — exactly one forward run, no fixed point: verify must name the run and NOTHING else
    {
      // find a permutation of ranks with no fixed point and exactly one forward-neighbour pair
      const perms = [];
      (function gen(a, rest) { if (!rest.length) { perms.push(a); return; } rest.forEach((x, i) => gen([...a, x], rest.filter((_, j) => j !== i))); })([], [0, 1, 2, 3, 4, 5, 6]);
      const target = perms.find((p) => p.every((v, i) => v !== i) && p.filter((v, i) => i + 1 < p.length && (p[i + 1] - v + 7) % 7 === 1).length === 1);
      const t = typeWithHtml(en, null, (html, meta) => {
        // meta.order = day indices in reading order; rank(day) = day for en (weekStart 0)
        const posOfRank = new Map(meta.order.map((day, i) => [TYPE.rankOf(CALENDAR.en, 'days', day) - 1, i]));
        return reorderRows(html, target.map((rank) => posOfRank.get(rank)));
      });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'K-321-gate-poison-P3b' });
      const only = r.verify.length === 1 && /forward run/.test(r.verify[0]);
      if (judge('P3b one forward run', r.verify, /is a forward run/, only ? 'and only that' : 'but NOT alone: ' + JSON.stringify(r.verify)) && only) killed++;
    }
    // P5a — an en tile reading `monday`
    {
      const t = typeWithHtml(en, null, (html) => { const h = html.replace('>Monday</span>', '>monday</span>'); if (h === html) throw new Error('P5a needle blind'); return h; });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'K-321-gate-poison-P5a' });
      if (judge('P5a tile monday', r.verify, /tile reads "monday" ≠ en name "Monday" \(verbatim\)/)) killed++;
    }
    // P5b — a de tile reading `Sonnabend`
    {
      const t = typeWithHtml(deBank, null, (html) => { const h = html.replace('>Samstag</span>', '>Sonnabend</span>'); if (h === html) throw new Error('P5b needle blind'); return h; });
      const r = await renderWith(page, t, { difficulty: 2, locale: 'de', baseName: 'K-321-gate-poison-P5b', strings: deStrings });
      if (judge('P5b tile Sonnabend', r.verify, /tile reads "Sonnabend" ≠ de name "Samstag" \(verbatim\)/)) killed++;
    }
    // P8 — a title carrying Kalender; the control title passes
    {
      const b = clone(deBank); b.strings['K-321'].title = 'Wochentage im Kalender';
      const a = judge('P8 Kalender title', validateBank(b, 'de'), /title carries the calendar stem \("Kalend"\)/);
      const c = validateBank(deBank, 'de').length === 0;
      poisonLog.push(`  P8 control "${deBank.strings['K-321'].title}": ${c ? 'PASSES' : 'FAILS'}`);
      if (a && c) killed++;
    }
    // P9 — an instruction carrying Jahreszeiten
    {
      const b = clone(deBank); b.strings['K-321'].instruction = 'Schreibe die Jahreszeiten in die Kästchen.';
      if (judge('P9 Jahreszeiten instruction', validateBank(b, 'de'), /instruction carries a season word \("Jahreszeiten"\)/)) killed++;
    }
    // P12 — two boxes both answering 3
    {
      const t = typeWithHtml(en, null, (html) => { const h = html.replace('data-lcs-answer="2"', 'data-lcs-answer="3"'); if (h === html) throw new Error('P12 needle blind'); return h; });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'K-321-gate-poison-P12' });
      if (judge('P12 two boxes answer 3', r.verify, /two boxes carry the same answer/)) killed++;
    }
    // P13 — rows pinned at a fixed 100 px (7 x 100 + 84 = 784 > 722) under the 3-line chrome → the footer lint
    {
      const strings = { title: 'Wochentage in die richtige Reihenfolge bringen und Zahlen eintragen', instruction: 'Der erste Wochentag hat schon die Zahl 1. Schreibe die Zahlen 2 bis 7 in die Kästchen: Welcher Wochentag kommt danach? Welcher Wochentag kommt zuletzt' };
      const t = typeWithHtml(en, null, (html) => { const h = html.replace(/minmax\(60px,100px\)/, '100px'); if (h === html) throw new Error('P13 needle blind'); return h; });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'K-321-gate-poison-P13', strings });
      if (judge('P13 784-px stack under 3-line chrome', r.lints, /footer overlap|overflow/)) killed++;
    }
    // P14 — a bank that defines dayNames: the validator fails AND the spec refuses to build
    {
      const b = { ...clone(en), dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] };
      const a = judge('P14 bank defines dayNames', validateBank(b, 'en'), /defines dayNames/);
      let refused = [];
      try { TYPE._buildWith(b, { difficulty: 2, locale: 'en' }, { rng: makeRng('p14') }); } catch (e) { refused = [e.message]; }
      const c = judge('P14 build', refused, /bank defines dayNames/, 'the spec refused the poisoned bank');
      if (a && c) killed++;
    }
    // P15 — a rank box forced to 48 px: verify and lints are blind; the gate's OWN floor must see it
    {
      const t = typeWithHtml(en, null, (html) => { const h = html.replace(/width:60px;height:60px" data-lcs-answer/g, 'width:48px;height:48px" data-lcs-answer'); if (h === html) throw new Error('P15 needle blind'); return h; });
      const r = await renderWith(page, t, { difficulty: 2, baseName: 'K-321-gate-poison-P15' });
      const found = gateFindings('P15', r, 2);
      if (judge('P15 48-px box', found, /element 48 px < K floor 56/, `verify ${r.verify.length} lints ${r.lints.length} — neither sees it`)) killed++;
    }
    /* ============================================================== PHASE 2 — the faces */
    const FACE_TOTAL = 12;
    const faces = {};
    for (const k of Object.keys(FACE_IDS)) faces[k] = loadType(FACE_IDS[k]);
    // 5. parity: the emitted spec's i18n.en === the bank's strings[id]
    function parity(spec, bank) {
      const b = (bank.strings || {})[spec.id];
      const f = [];
      if (!b) f.push(`${spec.id}: no bank strings block`);
      else {
        if (spec.i18n.en.title !== b.title) f.push(`${spec.id}: spec title "${spec.i18n.en.title}" ≠ bank "${b.title}"`);
        if (spec.i18n.en.instruction !== b.instruction) f.push(`${spec.id}: spec instruction ≠ bank`);
      }
      return f;
    }
    for (const spec of Object.values(faces)) {
      const f = parity(spec, en);
      ok(f.length === 0, f.join('; '));
      ok(ROWS_MOD.ROWS.some((r) => r[1] === spec.id), `${spec.id} is not a row of tools/b3var-rows/days-and-months.js`);
    }
    ok(faces.gaps.gradeBand === 'K' && ['neighbours', 'months', 'monthsNeighbours', 'abbrev'].every((k) => faces[k].gradeBand === 'G1'), 'face bands: F1 K, F2-F5 G1');
    console.log('parity: 5 faces, spec i18n.en === bank strings');

    // 6. face renders: en chrome + the worst legal chrome (677)
    const dayNames = {};
    for (const [loc, c] of Object.entries(CALENDAR)) dayNames[loc] = c.dayNames;
    await page.evaluateOnNewDocument((d) => { window.__K321_DAYS = d; }, dayNames);
    const faceRenders = {};
    for (const [key, spec] of Object.entries(faces)) {
      const cfg = spec.difficulty[2];
      for (const worst of [false, true]) {
        const r = await renderFace(page, spec, { baseName: `${spec.id}-gate-d2-en${worst ? '-worstchrome' : ''}`, strings: worst ? WORST : undefined });
        r.worst = worst;
        const name = `${spec.id} ${key}${worst ? ' worst chrome' : ''}`;
        let mi;
        if (key === 'gaps') mi = assertGaps(name, r, cfg);
        else if (key === 'neighbours' || key === 'monthsNeighbours') mi = assertNeighbours(name, r, cfg, G1);
        else if (key === 'abbrev') mi = assertAbbrev(name, r, cfg, G1);
        else {
          // F3 = the base path with the face's config at the G1 band
          const rb = await renderWith(page, spec, { difficulty: 2, baseName: `${spec.id}-gate-d2-en${worst ? '-worstchrome' : ''}`, strings: worst ? WORST : undefined });
          mi = assertRender(name, rb, 2, { cfg, band: G1, bodyMax: worst ? WORST.body : undefined });
          if (worst) ok(rb.m.titleLines === WORST.titleLines && rb.m.instrLines === WORST.instrLines, `${name}: chrome is ${rb.m.titleLines} + ${rb.m.instrLines} lines (want ${WORST.titleLines} + ${WORST.instrLines})`);
          ok(rb.m.rows.length === 12, `${name}: ${rb.m.rows.length} rows ≠ 12`);
          const anchor = rb.m.rows.find((x) => x.given === '1');
          ok(anchor && anchor.tileText === 'January', `${name}: anchor on ${anchor && anchor.tileText} (want January)`);
          r.png = rb.png; r.verify = rb.verify; r.lints = rb.lints; r.m.body = rb.m.body;
        }
        pngs.push(r.png);
        if (!worst) faceRenders[key] = r;
        console.log(`render ${name}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.height)} px` +
          (r.m.lowest ? ` lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}` : '') + ` min element ${Math.round(mi)}` +
          (key === 'gaps' ? ` rungs ${r.m.rungs.map((x) => Math.round(x.h)).join('/')} gaps ${r.m.rungs.map((x, i) => (x.gap ? i + 1 : '')).filter(Boolean).join(',')} bank rows ${new Set(r.m.pills.map((x) => Math.round(x.top))).size}` : '') +
          (key === 'neighbours' || key === 'monthsNeighbours' ? ` rows ${r.m.nrows.map((x) => Math.round(x.h)).join('/')} givens ${r.meta.todays.join(',')}` : '') +
          (key === 'abbrev' ? ` right ${r.meta.right.join(',')}` : ''));
      }
    }
    // the day@22 floor (F2 today tile inner 145) over all 11 locales, measured inside the rendered page
    {
      const w = faceRenders.neighbours.m.widthDay22;
      ok(w.length === 77, `day@22 probe measured ${w.length} names (want 77)`);
      const widest = w.reduce((a, b) => (b.w > a.w ? b : a));
      ok(widest.w <= 145, `day at 22: widest "${widest.text}" (${widest.loc}) ${widest.w.toFixed(1)} > 145 (F2 today tile inner)`);
      console.log(`width day@22: widest ${widest.loc} "${widest.text}" ${widest.w.toFixed(1)} <= 145 (F2 today tile inner)`);
    }

    // 7. face sweep
    if (!QUICK) {
      const patterns = new Set();
      for (let k = 1; k <= 20; k++) {
        const mk = (id) => makeRng(instanceSeed({ typeId: id, theme: null, difficulty: 2, seedEpoch: k }));
        const g = faces.gaps.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: mk('K-337') });
        patterns.add(g.meta.gaps.join(','));
        ok(!g.meta.gaps.includes(0), `sweep gaps seed ${k}: rung 1 is a gap`);
        ok(!g.meta.gaps.some((x, i) => i > 0 && x === g.meta.gaps[i - 1] + 1), `sweep gaps seed ${k}: adjacent gaps ${g.meta.gaps}`);
        const week = [0, 1, 2, 3, 4, 5, 6];
        ok(g.meta.bank.join() !== week.join() && g.meta.bank.join() !== [...week].reverse().join(), `sweep gaps seed ${k}: bank in week order`);
        ok(!g.meta.bank.some((b, i) => i > 0 && (b - g.meta.bank[i - 1] + 7) % 7 === 1), `sweep gaps seed ${k}: bank has a forward pair`);
        for (const [key, N] of [['neighbours', 7], ['monthsNeighbours', 12]]) {
          const n = faces[key].build({ theme: null, difficulty: 2, locale: 'en' }, { rng: mk(FACE_IDS[key]) });
          const start = key === 'neighbours' ? CALENDAR.en.weekStart : 0;
          ok(new Set(n.meta.todays).size === 6, `sweep ${key} seed ${k}: givens repeat`);
          ok(n.meta.todays.some((t) => { const rk = ((t - start + N) % N) + 1; return rk === 1 || rk === N; }), `sweep ${key} seed ${k}: no wrap row`);
        }
        const a = faces.abbrev.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: mk('G1-322') });
        ok(a.meta.right.every((x, i) => x !== a.meta.left[i]), `sweep abbrev seed ${k}: not a derangement`);
        const m = faces.months.build({ theme: null, difficulty: 2, locale: 'en' }, { rng: mk('G1-320') });
        const f = TYPE.shuffleRules(m.meta.order, 0, 12);
        ok(f.length === 0, `sweep months seed ${k}: ${f.join('; ')}`);
      }
      ok(patterns.size === 4, `sweep gaps: ${patterns.size} gap patterns over 20 seeds (want all 4 non-adjacent patterns)`);
      console.log(`sweep faces: 100 builds clean, gap patterns {${[...patterns].join(' | ')}}`);
    }

    // 8. face poisons
    let faceKilled = 0;
    const gapsBody = (html) => (html.match(/<span class="ws-blankbox"[\s\S]*?<\/svg><\/span>/) || [])[0];
    // P1 — rung 1 blank
    {
      const t = faceWith(faces.gaps, en, null, (html) => {
        const gap = gapsBody(html);
        const re = /(<div class="ws-rung"[^>]*data-lcs-rung="0"[^>]*)data-lcs-printed="1">(<span class="ws-nametile"[^>]*>[^<]*<\/span>)/;
        if (!gap || !re.test(html)) throw new Error('P1 needle blind');
        return html.replace(re, (m0, a) => `${a}data-lcs-gap="1" data-lcs-answer="0">${gap}`);
      });
      const r = await renderFace(page, t, { baseName: 'K-337-gate-poison-P1' });
      if (judge('P1 F1 rung 1 blank', r.verify, /rung 1 is a gap \(the anchor must be printed\)/)) faceKilled++;
    }
    // P4 — the bank in week order / reversed / with one forward pair
    {
      const cases = [['P4a F1 bank in week order', [0, 1, 2, 3, 4, 5, 6], /the bank is in week order/], ['P4b F1 bank reversed', [6, 5, 4, 3, 2, 1, 0], /the bank is the week reversed/], ['P4c F1 bank Sunday,Monday adjacent', [0, 1, 3, 5, 2, 6, 4], /bank words 1-2: Sunday then Monday is a forward week pair/]];
      let all = true;
      for (const [name, order, re] of cases) {
        const r = await renderFace(page, faceWith(faces.gaps, en, null, (html) => reorderPills(html, order)), { baseName: 'K-337-gate-poison-' + name.slice(0, 3) });
        if (!judge(name, r.verify, re)) all = false;
      }
      if (all) faceKilled++;
    }
    // P19 — two adjacent gaps on an adjacentGaps:false page
    {
      const t = faceWith(faces.gaps, en, null, (html, meta) => {
        const g = meta.gaps.find((x) => x >= 2 && !meta.gaps.includes(x - 1));   // a printed rung right above a gap (never rung 1)
        const gap = gapsBody(html);
        const re = new RegExp(`(<div class="ws-rung"[^>]*data-lcs-rung="${g - 1}"[^>]*)data-lcs-printed="1">(<span class="ws-nametile"[^>]*>[^<]*<\\/span>)`);
        if (g === undefined || !gap || !re.test(html)) throw new Error('P19 needle blind');
        return html.replace(re, (m0, a) => `${a}data-lcs-gap="1" data-lcs-answer="${g - 1}">${gap}`);
      });
      const r = await renderFace(page, t, { baseName: 'K-337-gate-poison-P19' });
      if (judge('P19 F1 adjacent gaps', r.verify, /are both gaps \(adjacentGaps is off\)/)) faceKilled++;
    }
    // P6 — F2: the wrap row's wrapping neighbour answers the given day itself
    {
      const t = faceWith(faces.neighbours, en, null, (html, meta) => {
        const t6 = meta.todays.find((x) => x === 6 || x === 0);
        const role = t6 === 6 ? 'right' : 'left';
        const wrong = t6 === 6 ? 0 : 6;
        const re = new RegExp(`(data-lcs-today="${t6}"[\\s\\S]*?data-lcs-lane="${role}" data-lcs-answer=")${wrong}"`);
        if (t6 === undefined || !re.test(html)) throw new Error('P6 needle blind');
        return html.replace(re, `$1${t6}"`);
      });
      const r = await renderFace(page, t, { baseName: 'G1-319-gate-poison-P6' });
      if (judge('P6 F2 wrap neighbour = today', r.verify, /(right answer Saturday ≠ the next of Saturday, Sunday|left answer Sunday ≠ the previous of Sunday, Saturday)/)) faceKilled++;
    }
    // P7 — F4: December's after = December (or January's before = January)
    {
      const t = faceWith(faces.monthsNeighbours, en, null, (html, meta) => {
        const g = meta.todays.find((x) => x === 11 || x === 0);
        const role = g === 11 ? 'right' : 'left';
        const wrong = g === 11 ? 0 : 11;
        const re = new RegExp(`(data-lcs-today="${g}"[\\s\\S]*?data-lcs-lane="${role}" data-lcs-answer=")${wrong}"`);
        if (g === undefined || !re.test(html)) throw new Error('P7 needle blind');
        return html.replace(re, `$1${g}"`);
      });
      const r = await renderFace(page, t, { baseName: 'G1-321-gate-poison-P7' });
      if (judge('P7 F4 December after = December', r.verify, /(right answer December ≠ the next of December, January|left answer January ≠ the previous of January, December)/)) faceKilled++;
    }
    // P20 — F2: the today head reads "Today"
    {
      const t = faceWith(faces.neighbours, en, null, (html) => { const h = html.replace('data-lcs-head="mid">today<', 'data-lcs-head="mid">Today<'); if (h === html) throw new Error('P20 needle blind'); return h; });
      const r = await renderFace(page, t, { baseName: 'G1-319-gate-poison-P20' });
      if (judge('P20 F2 head "Today"', r.verify, /mid head reads "Today" ≠ en label "today" \(verbatim\)/)) faceKilled++;
    }
    // P10 — a pt F2 page at todayPx 24 (segunda-feira 152.3 > 145) fails the width floor; pt at 22 is the control
    {
      const ptBank = { ...clone(en), labels: { yesterday: 'ontem', today: 'hoje', tomorrow: 'amanhã', before: 'antes', after: 'depois' }, laneGlyphH: { days: 40, months: 32, neighbours: 28 } };
      ptBank.strings['G1-319'] = { title: 'Ontem, hoje e amanhã: os dias da semana', instruction: 'O dia do meio é hoje. Escreve o dia que foi ontem e o dia que será amanhã.' };
      ok(validateBank(ptBank, 'pt').length === 0, 'the synthetic pt block must validate: ' + validateBank(ptBank, 'pt').join('; '));
      const labelsExtra = { _verifyLabels: { pt: ptBank.labels } };
      const ctrl = await renderFace(page, faceWith(faces.neighbours, ptBank, null, null, labelsExtra), { locale: 'pt', baseName: 'G1-319-gate-d2-pt-control', strings: ptBank.strings['G1-319'] });
      assertNeighbours('G1-319 pt control (today at 22)', ctrl, faces.neighbours.difficulty[2], G1);
      pngs.push(ctrl.png);
      console.log(`render G1-319 pt control: verify ${ctrl.verify.length} lints ${ctrl.lints.length} givens ${ctrl.m.nrows.map((x) => x.tiles[0] && x.tiles[0].text).join('/')}`);
      const bad = faceWith(faceCfg(faces.neighbours, { todayPx: 24 }), ptBank, null, null, labelsExtra);
      const r = await renderFace(page, bad, { locale: 'pt', baseName: 'G1-319-gate-poison-P10', strings: ptBank.strings['G1-319'] });
      const found = (() => { const before = fails.length, saved = assertions; assertNeighbours('P10', r, { ...faces.neighbours.difficulty[2], todayPx: 24 }, G1); const f = fails.splice(before); assertions = saved; return f; })();
      const a = judge('P10 pt today at 24 (gate width floor)', found, /today ".*-feira" \d+ px wider than its tile inner/);
      const b = judge('P10 pt today at 24 (verify)', r.verify, /today tile ".*-feira" wider than its box/);
      if (a && b) faceKilled++;
    }
    // P11 — F5: one abbreviation beside its own name
    {
      const t = faceWith(faces.abbrev, en, null, (html, meta) => {
        // swap the right item at position i with the one holding left[i]'s day
        const i = 0, want = meta.left[0], j = meta.right.indexOf(want);
        const items = html.match(/<div class="ws-match-item"[^>]*data-lcs-name="\d+">[\s\S]*?<\/div>/g) || [];
        if (items.length !== 7 || j < 0) throw new Error('P11 needle blind');
        const swapped = items.slice(); [swapped[i], swapped[j]] = [items[j], items[i]];
        let k = 0;
        return html.replace(/<div class="ws-match-item"[^>]*data-lcs-name="\d+">[\s\S]*?<\/div>/g, () => swapped[k++]);
      });
      const r = await renderFace(page, t, { baseName: 'G1-322-gate-poison-P11' });
      if (judge('P11 F5 Sun beside Sunday', r.verify, /pair 1: Sun sits beside its own name Sunday/)) faceKilled++;
    }
    // P21 — F5: the left column out of week order
    {
      const t = faceWith(faces.abbrev, en, null, (html) => {
        const re = /<div class="ws-match-item ws-match-item--plain"[^>]*data-lcs-abbr="\d+">[\s\S]*?<\/div>/g;
        const items = html.match(re) || [];
        if (items.length !== 7) throw new Error('P21 needle blind');
        const swapped = items.slice(); [swapped[0], swapped[1]] = [items[1], items[0]];
        let k = 0;
        return html.replace(re, () => swapped[k++]);
      });
      const r = await renderFace(page, t, { baseName: 'G1-322-gate-poison-P21' });
      if (judge('P21 F5 left column out of week order', r.verify, /left column Mon,Sun,Tue,Wed,Thu,Fri,Sat is not the en week order/)) faceKilled++;
    }
    // P16 — a face whose title drifts from the bank
    {
      const drift = Object.assign({}, faces.abbrev, { i18n: { en: { title: 'Days of the Week: Short Forms', instruction: faces.abbrev.i18n.en.instruction } } });
      if (judge('P16 spec title ≠ bank', parity(drift, en), /spec title "Days of the Week: Short Forms" ≠ bank/)) faceKilled++;
    }
    // P17 — abbrev:null → F5 refuses
    {
      let threw = '';
      try { faces.abbrev._buildWith({ ...clone(en), abbrev: null }, { difficulty: 2, locale: 'en' }, { rng: makeRng('p17') }); } catch (e) { threw = e.message; }
      if (judge('P17 abbrev:null', threw ? [threw] : [], /F5 is REFUSED for this locale/)) faceKilled++;
    }
    // P18 — F3: the "1" cell moved off January
    {
      const t = faceWith(faces.months, en, null, (html) => {
        const rank = /<span class="ws-rankbox"[^>]*>1<\/span>/.exec(html);
        const ans = /<span class="ws-answerbox"[^>]*data-lcs-answer="2"[^>]*><\/span>/.exec(html) || /<span class="ws-answerbox"[^>]*data-lcs-answer="2"[^>]*>[^<]*<\/span>/.exec(html);
        if (!rank || !ans) throw new Error('P18 needle blind');
        return html.replace(rank[0], '\u0000').replace(ans[0], rank[0]).replace('\u0000', ans[0]);
      });
      const r = await renderFace(page, t, { baseName: 'G1-320-gate-poison-P18' });
      if (judge('P18 F3 anchor off January', r.verify, /anchor "1" sits on February ≠ the en first month January \(anchor ≠ weekStart\)/)) faceKilled++;
    }
    killed += faceKilled;
    const GRAND = TOTAL + FACE_TOTAL;

    console.log('poison:\n' + poisonLog.join('\n'));
    const allKilled = killed === GRAND;
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && allKilled;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${GRAND} poisons killed${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${GRAND} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank };
