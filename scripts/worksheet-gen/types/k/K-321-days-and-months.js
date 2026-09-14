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
 *
 * PHASE 2 (2026-09-14) — the ADDITIVE `layout` knob (design §3; the faces
 * are rows in tools/b3var-rows/days-and-months.js that set it in the
 * difficulty config; the base's own three configs carry no `layout`, so the
 * base path is byte-identical — tools/b3-baseline.js is the proof). Stamped
 * on the face root as data-lcs-layout ONLY when declared (the base root
 * keeps data-lcs-order; a face root never carries it):
 *   'gaps'       F1 K-337  — PRODUCE the sequence: an anchored 7-rung week
 *                ladder, `gaps` blank rungs (rung 1 NEVER a gap; no two
 *                adjacent unless adjacentGaps) copied from a shuffled name
 *                bank (bank order ≠ week order, ≠ reversed, no forward
 *                neighbour pair incl. the wrap). unit 'days' only.
 *                gaps / adjacentGaps / bank / namePx / glyphH / rungH.
 *   'neighbours' F2 G1-319 (unit days, heads yesterday/today/tomorrow) and
 *                F4 G1-321 (unit months, heads:'beforeAfter' → before / — /
 *                after): `rows` given names in the middle, the child writes
 *                the two NEIGHBOURS (mod 7 / mod 12 — the Sunday→Monday and
 *                December→January wraps). Distinct givens; `wrap:true` forces
 *                ≥ 1 wrap row (a given at rank 1 or N); `inverse` rows print
 *                both neighbours and blank the middle. rows / wrap / inverse /
 *                glyphH (the bank's laneGlyphH.neighbours|months wins when set —
 *                pt's 28) / heads.
 *   'abbrev'     F5 G1-322 — DECODE the notation: 7 `dayAbbr` in the locale's
 *                week order down the left, the 7 full names DERANGED down the
 *                right, a line per pair. Honest ×11 by data (dayAbbr[i] is a
 *                prefix of dayNames[i], 77/77). A bank with abbrev:null
 *                REFUSES (no landing for that locale). pairs (7).
 * F3 G1-320 is the BASE path with unit:'months' (12 rows, January anchored
 * 1, answers 2..12) — no knob.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b3-common.js');
const { CALENDAR } = require('../../data/b2/calendar.js');
const { orderRows, nameBank, nameLadder, neighbourHeads, neighbourRow, abbrevPairs } = require('../../templates/components-b3.js');
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
    if (d.layout) return this._buildFace(bank, d, loc, ctx, cal);   // Phase 2 faces; the base path below is untouched
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

  /* ------------------------------------------------------------ Phase 2 faces */
  _buildFace(bank, d, loc, ctx, cal) {
    switch (d.layout) {
      case 'gaps': return this._buildGaps(bank, d, loc, ctx, cal);
      case 'neighbours': return this._buildNeighbours(bank, d, loc, ctx, cal);
      case 'abbrev': return this._buildAbbrev(bank, d, loc, ctx, cal);
      default: throw new Error(`K-321: unknown layout "${d.layout}"`);
    }
  },

  /** The printed texts of a unit: the verbatim names, or the pt `dayShort` option for days (guarded like the base). */
  _texts(bank, loc, unit, names) {
    if (unit === 'days' && Array.isArray(bank.dayShort)) {
      if (bank.dayShort.length !== 7 || new Set(bank.dayShort).size !== 7) throw new Error(`K-321: ${loc} dayShort must be 7 distinct strings`);
      bank.dayShort.forEach((x, i) => {
        if (!names[i].toLocaleLowerCase(loc).startsWith(String(x).toLocaleLowerCase(loc))) throw new Error(`K-321: ${loc} dayShort "${x}" is not a prefix of "${names[i]}"`);
      });
      return bank.dayShort;
    }
    if (names.some((t) => typeof t !== 'string' || !t.trim())) throw new Error(`K-321: ${loc} has an empty ${unit} name`);
    return names;
  },

  /** F1 — Missing Days: Write the Week in Order (K). */
  _buildGaps(bank, d, loc, ctx, cal) {
    const rng = ctx.rng;
    if (d.unit !== 'days') throw new Error(`K-321 gaps: unit "${d.unit}" — the ladder is the 7-day week (months are F3/F4)`);
    const { names, start, N } = cycleOf(cal, 'days');
    const texts = this._texts(bank, loc, 'days', names);
    const gaps = d.gaps;
    if (!(gaps >= 2 && gaps <= 4)) throw new Error(`K-321 gaps: gaps ${gaps} outside 2..4`);
    if (d.bank !== true) throw new Error('K-321 gaps: a bank-less ladder is a spelling test at K (bank must be true)');
    const glyphH = (bank.laneGlyphH && bank.laneGlyphH.days) || d.glyphH || 40;
    if (glyphH < 40) throw new Error(`K-321 gaps: glyphH ${glyphH} < the K whole-word floor 40`);
    const rungMin = d.rungMin || 72, rungMax = d.rungMax || 100;
    if (rungMin < tokens.density.K.minElement) throw new Error(`K-321 gaps: rungMin ${rungMin} < the K element floor ${tokens.density.K.minElement}`);
    // the gap rungs: never rung 0 (the anchor); no two adjacent unless adjacentGaps
    const slots = Array.from({ length: N - 1 }, (_, i) => i + 1);
    let gapSet = null;
    for (let k = 0; k < MAX_DRAWS; k++) {
      const cand = rng.sample(slots, gaps).sort((a, b) => a - b);
      const adjacent = cand.some((g, i) => i > 0 && g === cand[i - 1] + 1);
      if (d.adjacentGaps || !adjacent) { gapSet = new Set(cand); break; }
    }
    if (!gapSet) throw new Error('K-321 gaps: no gap pattern in ' + MAX_DRAWS + ' draws');
    // the bank: all 7 names shuffled; order ≠ week order, ≠ reversed, no forward pair (incl. the wrap)
    const week = Array.from({ length: N }, (_, i) => (start + i) % N);
    const rev = [...week].reverse();
    let order = null;
    for (let k = 0; k < MAX_DRAWS; k++) {
      const cand = rng.shuffle(week);
      if (cand.join() === week.join() || cand.join() === rev.join()) continue;
      if (cand.some((b, i) => i > 0 && (b - cand[i - 1] + N) % N === 1)) continue;
      order = cand; break;
    }
    if (!order) throw new Error('K-321 gaps: no bank order satisfied the rules in ' + MAX_DRAWS + ' draws');
    const rungs = week.map((day, i) => ({ day, text: texts[day], gap: gapSet.has(i), answer: gapSet.has(i) ? day : undefined }));
    const bodyHtml = `<div class="ws-gaps" data-ws-content data-lcs-layout="gaps" data-lcs-unit="days" data-lcs-weekstart="${start}" data-lcs-n="${N}" ` +
      `data-lcs-gaps="${gaps}" data-lcs-adjacent="${d.adjacentGaps ? 1 : 0}" style="display:flex;flex-direction:column;gap:16px;flex:1 1 auto;min-height:0;padding-bottom:6px">` +
      nameBank({ names: order.map((day) => ({ day, text: texts[day] })), px: d.bankPx || 20 }) +
      nameLadder({ rungs, namePx: d.namePx, glyphH, rungMin, rungMax }) + '</div>';
    return { bodyHtml, meta: { layout: 'gaps', gaps: [...gapSet].sort((a, b) => a - b), bank: order, answers: rungs.filter((r) => r.gap).map((r) => r.day) } };
  },

  /** F2 — Yesterday, Today, Tomorrow (days) / F4 — The Month Before and After (months, heads:'beforeAfter'). G1. */
  _buildNeighbours(bank, d, loc, ctx, cal) {
    const rng = ctx.rng;
    const { names, start, N } = cycleOf(cal, d.unit);
    const texts = this._texts(bank, loc, d.unit, names);
    const rows = d.rows;
    if (!(rows >= 3 && rows <= N)) throw new Error(`K-321 neighbours: rows ${rows} outside 3..${N}`);
    const inverse = d.inverse || 0;
    if (!(inverse >= 0 && inverse <= rows)) throw new Error(`K-321 neighbours: inverse ${inverse} outside 0..${rows}`);
    const band = tokens.density[this.gradeBand] || tokens.density.K;
    const writes = (rows - inverse) * 2 + inverse;
    if (writes < band.items[0] || writes > band.items[1]) throw new Error(`K-321 neighbours: ${writes} written names outside the ${this.gradeBand} page rule ${band.items.join('..')}`);
    const laneKey = d.unit === 'months' ? 'months' : 'neighbours';
    const glyphH = (bank.laneGlyphH && bank.laneGlyphH[laneKey]) || d.glyphH || 32;
    if (glyphH < 26) throw new Error(`K-321 neighbours: glyphH ${glyphH} < the G1 whole-word floor 26`);
    const labels = bank.labels || {};
    const heads = d.heads === 'beforeAfter'
      ? { left: labels.before, mid: '', right: labels.after }
      : { left: labels.yesterday, mid: labels.today, right: labels.tomorrow };
    for (const [k, v] of Object.entries(heads)) if (k !== 'mid' && (typeof v !== 'string' || !v)) throw new Error(`K-321 neighbours: ${loc} bank has no ${k} head label for heads "${d.heads || 'ytt'}"`);
    if (d.heads !== 'beforeAfter' && (typeof heads.mid !== 'string' || !heads.mid)) throw new Error(`K-321 neighbours: ${loc} bank has no today label`);
    const namePx = d.todayPx || 22;
    // the givens: distinct; wrap:true → ≥ 1 given at rank 1 or N (the cycle's seam); wrap:false → none
    const all = Array.from({ length: N }, (_, i) => i);
    const isWrap = (i) => { const r = ((i - start + N) % N) + 1; return r === 1 || r === N; };
    let todays = null;
    for (let k = 0; k < MAX_DRAWS; k++) {
      const cand = rng.sample(all, rows);
      const wraps = cand.filter(isWrap).length;
      if (d.wrap && wraps === 0) continue;
      if (!d.wrap && wraps > 0) continue;
      todays = cand; break;
    }
    if (!todays) throw new Error('K-321 neighbours: no given set satisfied the wrap rule in ' + MAX_DRAWS + ' draws');
    const invRows = new Set(inverse ? rng.sample(todays.map((_, i) => i), inverse) : []);
    const at = (i) => ({ day: i, text: texts[i] });
    const rowsHtml = todays.map((t, i) => neighbourRow({
      left: at((t - 1 + N) % N), today: at(t), right: at((t + 1) % N), namePx, glyphH, inverse: invRows.has(i),
    })).join('');
    const bodyHtml = `<div class="ws-neighbours" data-ws-content data-lcs-layout="neighbours" data-lcs-unit="${d.unit}" data-lcs-weekstart="${start}" data-lcs-n="${N}" ` +
      `data-lcs-rows="${rows}" data-lcs-wrap="${d.wrap ? 1 : 0}" data-lcs-inverse="${inverse}" data-lcs-heads="${d.heads === 'beforeAfter' ? 'beforeAfter' : 'ytt'}" ` +
      `style="display:grid;grid-template-rows:30px repeat(${rows},minmax(92px,110px));row-gap:8px;align-content:center;flex:1 1 auto;min-height:0;padding-bottom:6px">` +
      neighbourHeads({ left: heads.left, mid: heads.mid, right: heads.right }) + rowsHtml + '</div>';
    return { bodyHtml, meta: { layout: 'neighbours', unit: d.unit, todays, inverse: [...invRows], answers: todays.map((t) => [(t - 1 + N) % N, (t + 1) % N]) } };
  },

  /** F5 — Days of the Week: Abbreviations (G1). */
  _buildAbbrev(bank, d, loc, ctx, cal) {
    const rng = ctx.rng;
    if (d.unit !== 'days') throw new Error(`K-321 abbrev: unit "${d.unit}" — only days carry abbreviations`);
    if (bank.abbrev !== 'calendar') throw new Error(`K-321 abbrev: ${loc} bank sets abbrev:${JSON.stringify(bank.abbrev)} — F5 is REFUSED for this locale (no landing)`);
    const { names, start, N } = cycleOf(cal, 'days');
    const abbr = cal.dayAbbr;
    if (!Array.isArray(abbr) || abbr.length !== 7 || new Set(abbr).size !== 7) throw new Error(`K-321 abbrev: ${loc} calendar.js dayAbbr is not 7 distinct strings`);
    abbr.forEach((a, i) => { if (!names[i].toLocaleLowerCase(loc).startsWith(String(a).toLocaleLowerCase(loc))) throw new Error(`K-321 abbrev: ${loc} "${a}" is not a prefix of "${names[i]}"`); });
    if (d.pairs !== 7) throw new Error(`K-321 abbrev: pairs ${d.pairs} — the face ships the whole week (7)`);
    const texts = this._texts(bank, loc, 'days', names);
    const week = Array.from({ length: N }, (_, i) => (start + i) % N);
    let right = null;
    for (let k = 0; k < MAX_DRAWS; k++) {
      const cand = rng.shuffle(week);
      if (cand.every((x, i) => x !== week[i])) { right = cand; break; }
    }
    if (!right) throw new Error('K-321 abbrev: no derangement in ' + MAX_DRAWS + ' draws');
    const bodyHtml = `<div class="ws-match" data-ws-content data-lcs-layout="abbrev" data-lcs-unit="days" data-lcs-weekstart="${start}" data-lcs-n="${N}" data-lcs-pairs="${N}" style="min-height:0">` +
      abbrevPairs({ left: week.map((day) => ({ day, text: abbr[day] })), right: right.map((day) => ({ day, text: texts[day] })), itemH: d.itemH || 78, abbrPx: d.abbrPx || 26, namePx: d.namePx || 24 }) + '</div>';
    return { bodyHtml, meta: { layout: 'abbrev', left: week, right } };
  },

  async verify(page) {
    // the verbatim name tables for every locale (Node side); the page picks its own by <html lang>
    const tables = {};
    for (const [loc, c] of Object.entries(CALENDAR)) tables[loc] = { dayNames: c.dayNames, monthNames: c.monthNames, weekStart: c.weekStart, dayAbbr: c.dayAbbr };
    const shorts = {};
    const labels = {};
    try {
      const mod = require('../../data/b3/days-and-months.js');
      const all = mod[Object.keys(mod)[0]] || {};
      for (const [loc, b] of Object.entries(all)) {
        if (b && Array.isArray(b.dayShort)) shorts[loc] = b.dayShort;
        if (b && b.labels) labels[loc] = b.labels;
      }
    } catch (e) { /* no bank on disk: the tiles must then print the calendar names */ }
    if (this._verifyLabels) Object.assign(labels, this._verifyLabels);   // the gate's synthetic locale blocks
    return page.evaluate(({ tables, shorts, labels }) => {
      const fails = [];
      const lang0 = (document.documentElement.lang || 'en').slice(0, 2);
      const faceRoot = document.querySelector('[data-ws-content][data-lcs-layout]');
      if (faceRoot) {
        /* ---------------------------------------------------------- faces */
        const cal = tables[lang0];
        if (!cal) return [`no calendar table for ${lang0}`];
        if (document.querySelectorAll('[data-ws-content][data-lcs-layout]').length !== 1) return ['more than one face root'];
        if (faceRoot.hasAttribute('data-lcs-order')) fails.push('a face root carries the base data-lcs-order stamp');
        const layout = faceRoot.dataset.lcsLayout;
        const unit = faceRoot.dataset.lcsUnit;
        if (unit !== 'days' && unit !== 'months') return [`unit "${unit}"`];
        const names = unit === 'days' ? cal.dayNames : cal.monthNames;
        const texts = unit === 'days' && shorts[lang0] ? shorts[lang0] : names;
        const N = names.length;
        const start = unit === 'days' ? cal.weekStart : 0;
        const rankOf = (x) => ((x - start + N) % N) + 1;
        if (+faceRoot.dataset.lcsWeekstart !== start) fails.push(`weekstart stamp ${faceRoot.dataset.lcsWeekstart} ≠ ${lang0} ${unit} start ${start}`);
        if (+faceRoot.dataset.lcsN !== N) fails.push(`n stamp ${faceRoot.dataset.lcsN} ≠ cycle ${N}`);
        if (faceRoot.querySelector('img')) fails.push('a picture on the apparatus');
        if (faceRoot.textContent.includes('{')) fails.push('an unresolved slot "{" on the page');
        const noDigits = () => {
          const walker = document.createTreeWalker(faceRoot, NodeFilter.SHOW_TEXT);
          let node;
          while ((node = walker.nextNode())) if (/\d/.test(node.nodeValue)) fails.push(`a numeral "${node.nodeValue.trim()}" on the apparatus`);
        };
        const textW = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect().width; };
        const innerW = (el) => { const cs = getComputedStyle(el); return el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); };
        const fits = (el, what) => { if (textW(el) > innerW(el) + 0.6) fails.push(`${what} "${el.textContent}" wider than its box (${textW(el).toFixed(1)} > ${innerW(el).toFixed(1)})`); };
        if (layout === 'gaps') {
          if (unit !== 'days') fails.push('a gaps ladder on months');
          const rungs = [...faceRoot.querySelectorAll('[data-lcs-rung]')];
          if (rungs.length !== N) fails.push(`${rungs.length} rungs ≠ ${N}`);
          const gapsWant = +faceRoot.dataset.lcsGaps;
          const adjacentOk = faceRoot.dataset.lcsAdjacent === '1';
          let gapCount = 0, prevGap = false;
          const printed = [], gapAnswers = [];
          rungs.forEach((r, i) => {
            if (+r.dataset.lcsRung !== i) fails.push(`rung ${i + 1} stamped ${r.dataset.lcsRung}`);
            const day = +r.dataset.lcsDay;
            if (day !== (start + i) % N) fails.push(`rung ${i + 1} holds ${names[day]} ≠ the ${lang0} day at that rung ${names[(start + i) % N]}`);
            const isGap = r.dataset.lcsGap === '1';
            if (i === 0 && isGap) fails.push('rung 1 is a gap (the anchor must be printed)');
            if (isGap) {
              gapCount++;
              if (prevGap && !adjacentOk) fails.push(`rungs ${i} and ${i + 1} are both gaps (adjacentGaps is off)`);
              if (r.textContent.trim() !== '') fails.push(`gap rung ${i + 1} prints "${r.textContent.trim()}"`);
              const lanes = r.querySelectorAll('[data-lcs-prim="writing-row"]');
              if (lanes.length !== 1) fails.push(`gap rung ${i + 1} has ${lanes.length} writing rows`);
              if (+r.dataset.lcsAnswer !== day) fails.push(`gap rung ${i + 1} answer stamp ${r.dataset.lcsAnswer} ≠ ${day}`);
              const box = r.querySelector('.ws-blankbox');
              if (!box) fails.push(`gap rung ${i + 1} has no blank box`);
              else if (box.getBoundingClientRect().height < 70 - 0.6) fails.push(`gap rung ${i + 1} blank box ${Math.round(box.getBoundingClientRect().height)} px < 70`);
              gapAnswers.push(day);
            } else {
              const tile = r.querySelector('.ws-nametile');
              if (!tile) { fails.push(`rung ${i + 1} has no name tile`); return; }
              if (tile.textContent !== texts[day]) fails.push(`rung ${i + 1} reads "${tile.textContent}" ≠ ${lang0} name "${texts[day]}" (verbatim)`);
              fits(tile, `rung ${i + 1}`);
              printed.push(day);
            }
            prevGap = isGap;
          });
          if (gapCount !== gapsWant) fails.push(`${gapCount} gaps ≠ stamp ${gapsWant}`);
          // the bank
          const bank = faceRoot.querySelector('[data-lcs-bank]');
          if (!bank) fails.push('no name bank');
          else {
            const words = [...bank.querySelectorAll('[data-lcs-bank-word]')];
            const order = words.map((w) => +w.dataset.lcsBankWord);
            words.forEach((w) => { const dd = +w.dataset.lcsBankWord; if (w.textContent !== texts[dd]) fails.push(`bank word reads "${w.textContent}" ≠ "${texts[dd]}" (verbatim)`); });
            const want = [...printed, ...gapAnswers].sort((a, b) => a - b).join();
            if ([...order].sort((a, b) => a - b).join() !== want) fails.push(`bank {${order}} ≠ printed ∪ gap answers {${want}}`);
            const week = Array.from({ length: N }, (_, i) => (start + i) % N);
            if (order.join() === week.join()) fails.push('the bank is in week order (it hands over the answer)');
            if (order.join() === [...week].reverse().join()) fails.push('the bank is the week reversed');
            for (let i = 1; i < order.length; i++) if ((order[i] - order[i - 1] + N) % N === 1) fails.push(`bank words ${i}-${i + 1}: ${names[order[i - 1]]} then ${names[order[i]]} is a forward week pair`);
            const tops = new Set(words.map((w) => Math.round(w.getBoundingClientRect().top)));
            if (tops.size > 2) fails.push(`the bank wraps to ${tops.size} rows (> 2)`);
            words.forEach((w) => fits(w, 'bank pill'));
          }
          noDigits();
        } else if (layout === 'neighbours') {
          const rows = [...faceRoot.querySelectorAll('[data-lcs-today]')];
          const want = +faceRoot.dataset.lcsRows;
          if (rows.length !== want) fails.push(`${rows.length} rows ≠ stamp ${want}`);
          const todays = rows.map((r) => +r.dataset.lcsToday);
          if (new Set(todays).size !== todays.length) fails.push(`given names repeat: ${todays.map((t) => names[t]).join(', ')}`);
          let inverseSeen = 0;
          rows.forEach((r, i) => {
            const t = todays[i];
            if (!(t >= 0 && t < N)) { fails.push(`row ${i + 1}: today ${t}`); return; }
            const inv = r.dataset.lcsInverse === '1';
            if (inv) inverseSeen++;
            const lanes = [...r.querySelectorAll('[data-lcs-lane]')];
            const tiles = [...r.querySelectorAll('.ws-nametile')];
            const expect = { left: (t - 1 + N) % N, right: (t + 1) % N, mid: t };
            if (inv) {
              if (lanes.length !== 1 || lanes[0].dataset.lcsLane !== 'mid') fails.push(`inverse row ${i + 1}: lanes ${lanes.map((l) => l.dataset.lcsLane)}`);
              if (tiles.length !== 2) fails.push(`inverse row ${i + 1}: ${tiles.length} tiles`);
              else {
                if (+tiles[0].dataset.lcsDay !== expect.left || tiles[0].textContent !== texts[expect.left]) fails.push(`inverse row ${i + 1}: left tile "${tiles[0].textContent}" ≠ "${texts[expect.left]}"`);
                if (+tiles[1].dataset.lcsDay !== expect.right || tiles[1].textContent !== texts[expect.right]) fails.push(`inverse row ${i + 1}: right tile "${tiles[1].textContent}" ≠ "${texts[expect.right]}"`);
              }
            } else {
              if (lanes.length !== 2 || lanes[0].dataset.lcsLane !== 'left' || lanes[1].dataset.lcsLane !== 'right') fails.push(`row ${i + 1}: lanes ${lanes.map((l) => l.dataset.lcsLane)}`);
              if (tiles.length !== 1) fails.push(`row ${i + 1}: ${tiles.length} tiles`);
              else {
                if (+tiles[0].dataset.lcsDay !== t) fails.push(`row ${i + 1}: tile day ${tiles[0].dataset.lcsDay} ≠ today ${t}`);
                if (tiles[0].textContent !== texts[t]) fails.push(`row ${i + 1}: tile reads "${tiles[0].textContent}" ≠ ${lang0} name "${texts[t]}" (verbatim)`);
                fits(tiles[0], `row ${i + 1} today tile`);
              }
            }
            lanes.forEach((l) => {
              const role = l.dataset.lcsLane;
              if (+l.dataset.lcsAnswer !== expect[role]) fails.push(`row ${i + 1}: ${role} answer ${names[+l.dataset.lcsAnswer]} ≠ the ${role === 'left' ? 'previous' : role === 'right' ? 'next' : 'given'} of ${names[t]}, ${names[expect[role]]}`);
              if (l.textContent.trim() !== '') fails.push(`row ${i + 1}: ${role} lane prints "${l.textContent.trim()}"`);
              if (l.querySelectorAll('[data-lcs-prim="writing-row"]').length !== 1) fails.push(`row ${i + 1}: ${role} lane has no writing row`);
            });
          });
          if (inverseSeen !== +faceRoot.dataset.lcsInverse) fails.push(`${inverseSeen} inverse rows ≠ stamp ${faceRoot.dataset.lcsInverse}`);
          if (faceRoot.dataset.lcsWrap === '1' && !todays.some((t) => rankOf(t) === 1 || rankOf(t) === N)) fails.push(`no wrap row (no given at rank 1 or ${N})`);
          if (faceRoot.dataset.lcsWrap === '0' && todays.some((t) => rankOf(t) === 1 || rankOf(t) === N)) fails.push('a wrap row on a wrap:false page');
          // the heads: the locale's labels verbatim
          const lab = labels[lang0];
          const heads = faceRoot.dataset.lcsHeads;
          const h = (k) => { const e = faceRoot.querySelector(`[data-lcs-head="${k}"]`); return e ? e.textContent : null; };
          if (!lab) fails.push(`no labels for ${lang0} to check the heads against`);
          else {
            const want = heads === 'beforeAfter' ? { left: lab.before, mid: '', right: lab.after } : { left: lab.yesterday, mid: lab.today, right: lab.tomorrow };
            for (const k of ['left', 'mid', 'right']) if (h(k) !== want[k]) fails.push(`${k} head reads "${h(k)}" ≠ ${lang0} label "${want[k]}" (verbatim)`);
          }
          faceRoot.querySelectorAll('[data-lcs-head]').forEach((e) => fits(e, 'head'));
          noDigits();
        } else if (layout === 'abbrev') {
          if (unit !== 'days') fails.push('abbreviations on months');
          const left = [...faceRoot.querySelectorAll('[data-lcs-abbr]')];
          const right = [...faceRoot.querySelectorAll('[data-lcs-name]')];
          const pairs = +faceRoot.dataset.lcsPairs;
          if (left.length !== pairs || right.length !== pairs) fails.push(`${left.length} abbreviations / ${right.length} names ≠ ${pairs} pairs`);
          const ld = left.map((e) => +e.dataset.lcsAbbr), rd = right.map((e) => +e.dataset.lcsName);
          const week = Array.from({ length: N }, (_, i) => (start + i) % N);
          if (ld.join() !== week.join()) fails.push(`left column ${ld.map((x) => cal.dayAbbr[x])} is not the ${lang0} week order`);
          if ([...rd].sort((a, b) => a - b).join() !== Array.from({ length: N }, (_, i) => i).join()) fails.push(`right column ${rd} is not a permutation of the week`);
          left.forEach((e, i) => { if (e.textContent !== cal.dayAbbr[ld[i]]) fails.push(`abbreviation ${i + 1} reads "${e.textContent}" ≠ ${lang0} dayAbbr "${cal.dayAbbr[ld[i]]}" (verbatim)`); });
          right.forEach((e, i) => { if (e.textContent !== texts[rd[i]]) fails.push(`name ${i + 1} reads "${e.textContent}" ≠ ${lang0} name "${texts[rd[i]]}" (verbatim)`); fits(e.querySelector('span') || e, `name ${i + 1}`); });
          for (let i = 0; i < Math.min(ld.length, rd.length); i++) if (ld[i] === rd[i]) fails.push(`pair ${i + 1}: ${cal.dayAbbr[ld[i]]} sits beside its own name ${names[rd[i]]} (no line to draw)`);
          if (faceRoot.querySelectorAll('.ws-match-dot').length !== 2 * pairs) fails.push('a pair without its dots');
          noDigits();
        } else fails.push(`unknown layout "${layout}"`);
        return fails;
      }
      /* ------------------------------------------------------------ base */
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
        { const rg = document.createRange(); rg.selectNodeContents(tile); const cs = getComputedStyle(tile); const inner = tile.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          if (rg.getBoundingClientRect().width > inner + 0.6) fails.push(`row ${i + 1}: "${want}" wider than its tile`); }
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
    }, { tables, shorts, labels });
  },

  cycleOf, rankOf, dayAt, neighbourDay, neighbourMonth, calendarOf, shuffleRules,
};
