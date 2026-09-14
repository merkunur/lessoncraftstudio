#!/usr/bin/env node
/**
 * verify-b3-days-and-months.js — the K-321 `days-and-months` gate
 * (design file §5; brief deliverable 4). Phase 1 = the BASE page; the face
 * branches (F1..F5) and their poisons P1 P4 P6 P7 P10 P11 land with Phase 2.
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
  if (!strings['K-321']) push('strings K-321 missing');
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
        tileW: tb.width, tileH: tb.height, tileText: tile ? tile.textContent : '', tileScroll: tile ? tile.scrollWidth : 0, tileClient: tile ? tile.clientWidth : 0,
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

function assertRender(name, r, d, { bodyFloor } = {}) {
  const cfg = TYPE.difficulty[d];
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
    ok(x.tileScroll <= x.tileClient + 0.6, `${name}: "${x.tileText}" ${x.tileScroll} px wider than its tile ${x.tileClient}`);
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
  return minEl;
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
    strings: { 'K-321': { title: 'Wochentage in der richtigen Reihenfolge', instruction: 'Der erste Tag der Woche hat schon die 1. Schreibe 2 bis 7 zu den anderen Tagen in der richtigen Reihenfolge.' } } };
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
    console.log('poison:\n' + poisonLog.join('\n'));
    const allKilled = killed === TOTAL;
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && allKilled;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${TOTAL} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank };
