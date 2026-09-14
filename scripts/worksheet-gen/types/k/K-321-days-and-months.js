/**
 * K-321 — Days of the Week in Order (nt20-C; family key `days-and-months`,
 * K, readiness — no K-2 CCSS-M code names the day/month sequences).
 * Design: docs/worksheet-gen/b3-designs/K-321-days-and-months.md §2/§5.
 *
 * Seven rows, one SCRAMBLED day name per row on a cream tile, a dashed rank
 * box on its left. The locale's first day (`dayNames[weekStart]`) is
 * pre-numbered 1 in a solid tealSoft cell; the child finds it, then numbers
 * the other six days 2 to 7. Six written numerals = the K pre-writer's move
 * (no whole-word writing); the printed anchor shows the format.
 *
 * THE NAMES come from data/b2/calendar.js CALENDAR[loc] at render — verbatim
 * (casing included: en/de capital, the other nine lower), never displayWord,
 * never title-case, never a copy in data/b3. The bank data/b3/days-and-months.js
 * carries only `names:'calendar'` (a sentinel), the optional pt `dayShort`
 * (if set, the tiles print it), and the strings; an unauthored locale block
 * THROWS (refusal, never an en fallback).
 *
 * THEMELESS (`themeAxis:{applicable:false}`; no pictures: a picture per day
 * would add a second sign system and no vocab noun means "Tuesday"). NO
 * `unitAxis`: days and months are two GENRE HEADS with separate demand, so
 * months are FACES with landings (F3 = `unit:'months'` over this same
 * build), never a wave unit. The fan lever = the permutation per seed.
 *
 * Difficulty is a CONFIG; guards key on the RESOLVED config, never the level:
 *   unit    'days' | 'months'   the cycle (7 from weekStart | 12 from January)
 *   n       7 | 12              rows = the cycle length (verify: n === cycle)
 *   cols    1 | 2 | 3           reading order runs DOWN column 1, then 2 …
 *   given   [ranks]             ranks pre-printed in a solid cell; 1 ALWAYS
 *   strip   numberStrip 1..n above the rows (d1 only)
 *   tileW / namePx / boxPx      geometry; boxPx >= the band's element floor
 *   rowMax  grid-row growth cap (default boxPx + 40; d3's 4-row stack uses 120)
 * Composer: rng.shuffle re-drawn until (a) no tile sits at its own rank
 * position, (b) no two consecutive rows (reading order, across the column
 * break) are FORWARD neighbours, (c) >= 3 tiles displaced.
 *
 * Answer hiding: the box carries data-lcs-answer = rank (data only, prints
 * nothing); the given cell prints its rank and carries data-lcs-given, never
 * an answer; verify() re-derives every rank from the stamps against the
 * CALENDAR table (passed into the page from Node — the browser side cannot
 * require) and checks the tile text VERBATIM.
 *
 * Helpers the faces (Phase 2) reuse: `cycleOf(cal, unit)`, `rankOf(cal,
 * unit, d)`, `dayAt(cal, offset)`, `neighbourDay(d, ±1)`, `neighbourMonth(i,
 * ±1)` — exported on this module (lib/b3-common.js is shared and was not
 * edited; the design placed them there — recorded in the build report).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { CALENDAR } = require('../../data/b2/calendar.js');
const { orderRows } = require('../../templates/components-b3.js');
const tokens = require('../../primitives/_tokens.js');

const BANK = 'days-and-months';
const UNITS = { days: 7, months: 12 };
const MAX_DRAWS = 2000;

/** The cycle for a unit: the 7 day names from weekStart | the 12 month names from January. */
function cycleOf(cal, unit) {
  if (unit === 'days') return { names: cal.dayNames, start: cal.weekStart, N: 7 };
  if (unit === 'months') return { names: cal.monthNames, start: 0, N: 12 };
  throw new Error('K-321: unknown unit "' + unit + '"');
}
/** 1-based rank of index d in the unit's cycle (Monday-first de: Montag = 1, Sonntag = 7). */
function rankOf(cal, unit, d) { const { start, N } = cycleOf(cal, unit); return ((d - start + N) % N) + 1; }
function dayAt(cal, offset) { return cal.dayNames[(cal.weekStart + offset + 7) % 7]; }
function neighbourDay(d, step) { return (d + step + 7) % 7; }
function neighbourMonth(i, step) { return (i + step + 12) % 12; }

/** A calendar table for a locale (the 2-letter code; throws on an unknown locale — refusal). */
function calendarOf(loc) {
  const cal = CALENDAR[loc];
  if (!cal || !Array.isArray(cal.dayNames) || cal.dayNames.length !== 7 || !Array.isArray(cal.monthNames) || cal.monthNames.length !== 12) {
    throw new Error('K-321: data/b2/calendar.js has no complete table for ' + loc + ' (refuse)');
  }
  return cal;
}

/** Shuffle rules (a)-(c) over a reading-order sequence of cycle indices. */
function shuffleRules(seq, start, N) {
  const f = [];
  let displaced = 0;
  seq.forEach((d, i) => { if (d === (start + i) % N) f.push(`row ${i + 1} holds its own rank`); else displaced++; });
  for (let i = 0; i + 1 < seq.length; i++) {
    if ((seq[i + 1] - seq[i] + N) % N === 1) f.push(`rows ${i + 1}-${i + 2} are a forward run`);
  }
  if (displaced < 3) f.push(`only ${displaced} tiles displaced (< 3)`);
  return f;
}

module.exports = {
  id: 'K-321',
  slug: 'days-and-months',
  gradeBand: 'K',
  assetClass: 'geometry',
  exerciseType: 'days-and-months',
  themeAxis: { applicable: false },
  difficulty: {
    1: { unit: 'days', n: 7, cols: 1, given: [1, 4, 7], strip: true, tileW: 440, namePx: 28, boxPx: 60 },
    2: { unit: 'days', n: 7, cols: 1, given: [1], strip: false, tileW: 440, namePx: 26, boxPx: 60 },
    3: { unit: 'days', n: 7, cols: 2, given: [1], strip: false, tileW: 250, namePx: 26, boxPx: 60, rowMax: 120 },
  },
  i18n: {
    en: {
      title: 'Days of the Week in Order',
      instruction: 'The first day of the week is already marked 1. Number the other days 2 to 7 in the order they come.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), { theme, difficulty, locale: loc }, ctx);
  },

  /**
   * The whole build over an INJECTED bank (+ optional calendar table) — the
   * gate's poison seam; build() passes the real ones.
   */
  _buildWith(bank, { difficulty, locale }, ctx, calOverride) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-321: no difficulty ' + difficulty);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const cal = calOverride || calendarOf(loc);
    if (!bank || bank.names !== 'calendar') throw new Error(`K-321: ${loc} bank must carry names:'calendar' (the names live in calendar.js)`);
    for (const k of ['dayNames', 'monthNames', 'dayAbbr', 'weekStart']) {
      if (k in bank) throw new Error(`K-321: ${loc} bank defines ${k} — a name fix is a calendar.js commit, never a bank copy`);
    }
    if (!UNITS[d.unit]) throw new Error('K-321: unknown unit ' + d.unit);
    const { names, start, N } = cycleOf(cal, d.unit);
    if (d.n !== N) throw new Error(`K-321: n ${d.n} ≠ the ${d.unit} cycle length ${N}`);
    if (![1, 2, 3].includes(d.cols)) throw new Error(`K-321: cols ${d.cols} outside 1..3`);
    const given = Array.from(new Set(d.given || []));
    if (!given.includes(1)) throw new Error('K-321: rank 1 (the anchor) must be given');
    if (given.some((g) => !(g >= 1 && g <= N))) throw new Error(`K-321: a given rank is outside 1..${N}`);
    const writes = N - given.length;
    const band = tokens.density[this.gradeBand] || tokens.density.K;
    if (writes < band.items[0] || writes > band.items[1]) throw new Error(`K-321: ${writes} written numerals outside the ${this.gradeBand} page rule ${band.items.join('..')}`);
    if (d.boxPx < band.minElement) throw new Error(`K-321: boxPx ${d.boxPx} < the ${this.gradeBand} element floor ${band.minElement}`);
    // the printed text: the locale's verbatim names, or the pt `dayShort` option
    let texts = names;
    if (d.unit === 'days' && Array.isArray(bank.dayShort)) {
      if (bank.dayShort.length !== 7 || new Set(bank.dayShort).size !== 7) throw new Error(`K-321: ${loc} dayShort must be 7 distinct strings`);
      bank.dayShort.forEach((s, i) => {
        if (!names[i].toLocaleLowerCase(loc).startsWith(String(s).toLocaleLowerCase(loc))) throw new Error(`K-321: ${loc} dayShort "${s}" is not a prefix of "${names[i]}"`);
      });
      texts = bank.dayShort;
    }
    if (texts.some((t) => typeof t !== 'string' || !t.trim())) throw new Error(`K-321: ${loc} has an empty ${d.unit} name`);

    // composer: a permutation of the cycle in reading order, rules (a)-(c)
    const ids = Array.from({ length: N }, (_, i) => i);
    let seq = null;
    for (let k = 0; k < MAX_DRAWS; k++) {
      const cand = rng.shuffle(ids);
      if (shuffleRules(cand, start, N).length === 0) { seq = cand; break; }
    }
    if (!seq) throw new Error('K-321: no permutation satisfied the shuffle rules in ' + MAX_DRAWS + ' draws');

    const items = seq.map((idx) => {
      const rank = ((idx - start + N) % N) + 1;
      return given.includes(rank)
        ? { day: idx, text: texts[idx], given: rank }
        : { day: idx, text: texts[idx], answer: rank };
    });
    const bodyHtml = orderRows({
      items, cols: d.cols, tileW: d.tileW, boxPx: d.boxPx, namePx: d.namePx,
      given, unit: d.unit, weekStart: start, strip: !!d.strip, rowMax: d.rowMax,
    });
    return { bodyHtml, meta: { unit: d.unit, order: seq, given, answers: items.filter((i) => i.answer).map((i) => i.answer), cols: d.cols } };
  },

  async verify(page) {
    // the verbatim name tables for every locale (Node side); the page picks its own by <html lang>
    const tables = {};
    for (const [loc, c] of Object.entries(CALENDAR)) tables[loc] = { dayNames: c.dayNames, monthNames: c.monthNames, weekStart: c.weekStart };
    const shorts = {};
    try {
      const mod = require('../../data/b3/days-and-months.js');
      const all = mod[Object.keys(mod)[0]] || {};
      for (const [loc, b] of Object.entries(all)) if (b && Array.isArray(b.dayShort)) shorts[loc] = b.dayShort;
    } catch (e) { /* no bank on disk: the tiles must then print the calendar names */ }
    return page.evaluate(({ tables, shorts }) => {
      const fails = [];
      const roots = document.querySelectorAll('[data-ws-content][data-lcs-order]');
      if (roots.length !== 1) return [`${roots.length} order roots`];
      const root = roots[0];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const cal = tables[lang];
      if (!cal) return [`no calendar table for ${lang}`];
      const unit = root.dataset.lcsUnit;
      if (unit !== 'days' && unit !== 'months') return [`unit "${unit}"`];
      const names = unit === 'days' ? cal.dayNames : cal.monthNames;
      const texts = unit === 'days' && shorts[lang] ? shorts[lang] : names;
      const N = names.length;
      const start = unit === 'days' ? cal.weekStart : 0;
      const rankOf = (d) => ((d - start + N) % N) + 1;
      if (+root.dataset.lcsWeekstart !== start) fails.push(`weekstart stamp ${root.dataset.lcsWeekstart} ≠ ${lang} ${unit} start ${start}`);
      if (+root.dataset.lcsN !== N) fails.push(`n stamp ${root.dataset.lcsN} ≠ cycle ${N}`);
      const cols = +root.dataset.lcsCols;
      if (![1, 2, 3].includes(cols)) fails.push(`cols stamp ${root.dataset.lcsCols}`);
      const rows = [...root.querySelectorAll('[data-lcs-row]')];
      if (rows.length !== N) fails.push(`${rows.length} rows ≠ ${N}`);
      rows.forEach((r, i) => { if (+r.dataset.lcsRow !== i) fails.push(`row ${i + 1} stamped ${r.dataset.lcsRow} (reading order broken)`); });
      const seq = rows.map((r) => +r.dataset.lcsDay);
      if ([...seq].sort((a, b) => a - b).join() !== Array.from({ length: N }, (_, i) => i).join()) fails.push(`days ${seq.join(',')} are not a permutation of 0..${N - 1}`);
      const givenStamp = (root.dataset.lcsGiven || '').split(',').filter(Boolean).map(Number);
      const givenSeen = [];
      const answers = [];
      rows.forEach((r, i) => {
        const d = seq[i];
        const tiles = r.querySelectorAll('.ws-nametile');
        if (tiles.length !== 1) { fails.push(`row ${i + 1}: ${tiles.length} name tiles`); return; }
        const tile = tiles[0];
        if (+tile.dataset.lcsDay !== d) fails.push(`row ${i + 1}: tile day ${tile.dataset.lcsDay} ≠ row day ${d}`);
        const want = texts[d];
        if (tile.textContent !== want) fails.push(`row ${i + 1}: tile reads "${tile.textContent}" ≠ ${lang} name "${want}" (verbatim)`);
        if (tile.scrollWidth > tile.clientWidth + 0.6) fails.push(`row ${i + 1}: "${want}" wider than its tile`);
        const rank = rankOf(d);
        const gs = r.querySelectorAll('.ws-rankbox');
        const as = r.querySelectorAll('.ws-answerbox');
        if (gs.length + as.length !== 1) { fails.push(`row ${i + 1}: ${gs.length} given + ${as.length} answer cells`); return; }
        if (gs.length) {
          const g = gs[0];
          if (g.textContent.trim() !== String(rank)) fails.push(`row ${i + 1}: given cell prints "${g.textContent.trim()}" but ${want} is rank ${rank}`);
          if (+g.dataset.lcsGiven !== rank) fails.push(`row ${i + 1}: given stamp ${g.dataset.lcsGiven} ≠ rank ${rank}`);
          if (g.hasAttribute('data-lcs-answer')) fails.push(`row ${i + 1}: given cell carries an answer stamp`);
          givenSeen.push(rank);
        } else {
          const a = as[0];
          if (a.textContent.trim() !== '') fails.push(`row ${i + 1}: answer box prints "${a.textContent.trim()}"`);
          if (a.dataset.lcsAnswer !== String(rank)) fails.push(`row ${i + 1}: answer stamp ${a.dataset.lcsAnswer} ≠ rank ${rank} of ${want}`);
          answers.push(+a.dataset.lcsAnswer);
        }
      });
      // the anchor: rank 1 given, on the cycle's first name
      if (!givenSeen.includes(1)) fails.push('no given cell prints 1 (the anchor is missing)');
      const anchorRow = rows.findIndex((r) => r.querySelector('.ws-rankbox') && r.querySelector('.ws-rankbox').textContent.trim() === '1');
      if (anchorRow >= 0 && seq[anchorRow] !== start) fails.push(`anchor "1" sits on ${names[seq[anchorRow]]} ≠ the ${lang} first ${unit === 'days' ? 'day' : 'month'} ${names[start]} (anchor ≠ weekStart)`);
      if ([...givenSeen].sort().join() !== [...givenStamp].sort().join()) fails.push(`given cells ${givenSeen} ≠ root stamp ${givenStamp}`);
      const wantAnswers = Array.from({ length: N }, (_, i) => i + 1).filter((k) => !givenSeen.includes(k));
      if ([...answers].sort((a, b) => a - b).join() !== wantAnswers.join()) fails.push(`answers {${[...answers].sort((a, b) => a - b)}} ≠ {1..${N}} minus given {${givenSeen}}`);
      if (new Set(answers).size !== answers.length) fails.push('two boxes carry the same answer');
      // shuffle rules (a)-(c) over the reading order
      let displaced = 0;
      seq.forEach((d, i) => { if (d === (start + i) % N) fails.push(`row ${i + 1}: ${names[d]} sits at its own rank position`); else displaced++; });
      for (let i = 0; i + 1 < seq.length; i++) if ((seq[i + 1] - seq[i] + N) % N === 1) fails.push(`rows ${i + 1}-${i + 2}: ${names[seq[i]]} then ${names[seq[i + 1]]} is a forward run`);
      if (displaced < 3) fails.push(`only ${displaced} tiles displaced`);
      // nothing else on the apparatus
      if (root.querySelector('img')) fails.push('a picture on the apparatus');
      if (root.textContent.includes('{')) fails.push('an unresolved slot "{" on the page');
      const strip = root.querySelector('[data-lcs-strip]');
      if (strip) {
        const vals = [...strip.querySelectorAll('[data-lcs-strip-value]')].map((e) => e.textContent.trim());
        if (vals.join() !== Array.from({ length: N }, (_, i) => String(i + 1)).join()) fails.push(`strip reads ${vals.join(',')} ≠ 1..${N}`);
      }
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (!/\d/.test(node.nodeValue)) continue;
        const el = node.parentElement;
        if (el.closest('.ws-rankbox') || el.closest('[data-lcs-strip]')) continue;
        fails.push(`a numeral "${node.nodeValue.trim()}" outside a given cell`);
      }
      return fails;
    }, { tables, shorts });
  },

  cycleOf, rankOf, dayAt, neighbourDay, neighbourMonth, calendarOf, shuffleRules,
};
