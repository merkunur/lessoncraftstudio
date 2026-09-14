/**
 * K-320 — Ordinal Numbers: Find the Place (nt20-C; `ordinal-numbers`, K,
 * readiness — no K-2 CCSS-M code names ordinals). Design:
 * docs/worksheet-gen/b3-designs/K-320-ordinal-numbers.md §2/§5.
 *
 * Three cream line-up panels. Each: a coral start flag + direction arrow, N
 * white picture tiles (every noun DISTINCT within the strip), a dotted mark
 * band, then TWO cue chips `[ 3rd (ring icon) ] [ 6th (X icon) ]`. The child
 * starts at the flag, counts to the chip's ordinal and makes the mark the icon
 * shows (a ring round the tile / an X across it / a tick in the band at d3).
 * Tiles carry no word, numeral or `alt`; the chips are the only text, so the
 * apparatus is identical in all 11 locales except the notation glyph, which is
 * an explicit per-locale literal table (data/b3/ordinals.js via
 * lib/b3-common.js ordinalFor) — never data/b2/calendar.js ordinal().
 *
 * THEMED (§1): pools = entriesFor(theme, loc) (B2_EXCLUDE applied); the fan
 * set's minimum over 11 locales is pets 19 >= minNouns 10 (measured). A theme
 * that cannot fill N distinct nouns THROWS (refusal). BW themes are excluded
 * (excludeBw) and a BW-marked theme is refused at build (`colour` is a
 * wave-decision mark that no face rides on).
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (n / kMax /
 * distinct / mustInclude / anyOf / maxRepeat / actions / start), never on the
 * level index. `start` ('left' | 'right' | 'mixed') is the base config key F4
 * flips (PARAM face; no new code); F1/F2/F3/F5 are the `layout` knob
 * ('write' | 'words' | 'where' | 'race', Phase 2, 2026-09-14): _buildWith
 * dispatches to a face builder BEFORE the base path runs, so a config without
 * `layout` renders byte-identically (tools/b3-baseline.js is the proof), and the
 * root stamps data-lcs-face only when the knob is declared. verify(page)
 * branches on that stamp. Faces (design §3; record _work/K-320-faces.md):
 *   write  G1-315  3 strips of n tiles, a numeral cell under every tile — `given`
 *          solid cells print the notation, `blank` open cells hide it
 *          (data-lcs-answer); position 1 never blank, no 4 blanks in a row,
 *          blank sets differ across strips; gender per bank genderPolicy.
 *   words  G1-316  2 strips + a bank row of `words` ordinal-WORD chips in a
 *          shuffled order (never ascending); the child draws a line up to the
 *          picture; chip size = the bank's measured wordPx.
 *   where  G1-317  3 strips; under each, `queries` [clone][arrow][box] cells:
 *          the child finds the pictured noun and writes its place. The strip is
 *          built so no two nouns of one bank `lookalikes` group share a strip.
 *   race   G1-318  `lanes` white rows: a runner at a distance from a chequered
 *          finish (right), an open box per lane; rank by distance (nearest =
 *          1st). Theme must be a bank `racer`; left-facing art is mirrored
 *          per the bank's `facing` table.
 *   F4 (K-336) is PARAM: {...base d2, start:'mixed'} — no code here.
 *
 * Answer hiding: the ground truth is data-lcs-* only (order, start, n, per-chip
 * ordinal/action/target/notation); verify(page) re-derives every target from
 * the stamps (target === start==='left' ? k-1 : n-k), the page rule, the
 * per-strip distinctness and the no-text/no-alt tile contract.
 *
 * Chrome budget (README ruling): body 722 with 3-line title + 3-line
 * instruction. Rows `repeat(3, minmax(<panelMin>px, 1fr))`, gap 12; the slack
 * opens INSIDE each panel between strip and chip row (space-between), never in
 * the tiles. Measured d2 panel min = 24 (arrow) + 4 + 84 + 22 + 44 + 20 + 4 =
 * 202 (the design's 198 assumed a 20 px arrow row; a 20 px pole with a 3 px
 * rule and 12 px head needs 24 — recorded in _work/K-320-build.md).
 */
'use strict';
const { entriesFor, sampleEntries, fileUri } = require('../../lib/b2-common.js');
const { bank: loadBank, ordinalFor } = require('../../lib/b3-common.js');
const { lineUpPanel, lineUpStrip, ordinalChip, wordChipRow, queryCell, finishLine, raceLane, blankNumeralBox } = require('../../templates/components-b3.js');

const BANK = 'ordinals';
const LANE_INNER = 647;   // .ws-lane with the inline padding:10px 12px override (675 − 24 − 4)
const GRID_GAP = 12;
const ARROW_ROW = 24;
const BAND = 22;
const PAD_BORDER = 24;    // 2 × 10 padding + 2 × 2 border
const BW_MARK = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;   // the localized B&W theme marker (§20.5)

/** Panel min height from the resolved config: arrow + gap + tile + band + chip row + padding/border. */
function panelMin(d) { return ARROW_ROW + 4 + d.tile + BAND + d.pillH + PAD_BORDER; }

/**
 * The page's 6 ordinals under the resolved rule, paired per strip so the two
 * chips of a strip differ in k. Bounded rejection sampling on the seeded rng
 * (throws after 500 draws — unreachable for the shipped configs, a guard for
 * a face that tightens the rule).
 */
function pageOrdinals(rng, d) {
  const total = d.strips * d.chips;
  const vals = [];
  for (let k = 1; k <= d.kMax; k++) vals.push(k);
  for (let attempt = 0; attempt < 500; attempt++) {
    let ks;
    if (d.distinct) {
      if (total > d.kMax) throw new Error(`K-320: ${total} distinct ordinals cannot come from 1..${d.kMax}`);
      const must = (d.mustInclude || []).slice();
      const rest = vals.filter((k) => !must.includes(k));
      ks = rng.shuffle(must.concat(rng.sample(rest, total - must.length)));
    } else {
      ks = [];
      for (let i = 0; i < total; i++) ks.push(rng.int(1, d.kMax));
    }
    // rule checks (also the ones distinct sampling already guarantees — one predicate, no trust)
    const count = {};
    for (const k of ks) count[k] = (count[k] || 0) + 1;
    if (d.distinct && Object.values(count).some((c) => c > 1)) continue;
    if (d.maxRepeat && Object.values(count).some((c) => c > d.maxRepeat)) continue;
    if ((d.mustInclude || []).some((k) => !count[k])) continue;
    if (d.anyOf && !d.anyOf.some((k) => count[k])) continue;
    // pair per strip: the two chips of a strip differ in k
    const strips = [];
    let ok = true;
    for (let s = 0; s < d.strips; s++) {
      const pair = ks.slice(s * d.chips, (s + 1) * d.chips).sort((a, b) => a - b);
      if (new Set(pair).size !== pair.length) { ok = false; break; }
      strips.push(pair);
    }
    if (!ok) continue;
    return strips;
  }
  throw new Error('K-320: no page ordinal set satisfies the rule ' + JSON.stringify({ kMax: d.kMax, distinct: d.distinct, mustInclude: d.mustInclude, anyOf: d.anyOf, maxRepeat: d.maxRepeat }));
}

/** Per-strip start side under the `start` config: left | right | mixed (>= 1 of each per page). */
function startSides(rng, d) {
  if (d.start === 'left' || d.start === 'right') return Array.from({ length: d.strips }, () => d.start);
  if (d.start !== 'mixed') throw new Error('K-320: unknown start ' + d.start);
  if (d.strips < 2) throw new Error('K-320: start:mixed needs >= 2 strips');
  for (let attempt = 0; attempt < 200; attempt++) {
    const sides = Array.from({ length: d.strips }, () => (rng.next() < 0.5 ? 'left' : 'right'));
    if (sides.includes('left') && sides.includes('right')) return sides;
  }
  throw new Error('K-320: start:mixed could not seat both sides');
}

/* ------------------------------------------------------------------ Phase-2 faces */
const G1_FLOOR = 44;
const LINE_ZONE = 60;      // F2: the minimum height of the zone the child draws lines through
const QUERY_GAP = 12;      // F3: strip -> query row
const RACE_LANE_W = 543;   // F5: 647 - 8 - 16 - 8 - 72
const RACE_H = 84;         // F5: the lane svg height (row min 96 = 84 + 2 x 2 border + slack)

function facePreamble(bankLoc, d, theme, locale) {
  const loc = (locale || 'en').slice(0, 2);
  if (!theme) throw new Error('K-320: a theme is required (themed type)');
  if (BW_MARK.test(theme)) throw new Error(`K-320: theme "${theme}" is a B&W theme — the type excludes BW art (refused)`);
  if (!(d.n >= 2 && d.n <= 10)) throw new Error(`K-320 ${d.layout}: n ${d.n} outside 2..10 (the notation table stops at 10)`);
  const stripW = d.n * d.tile + (d.n - 1) * d.gap;
  if (stripW > LANE_INNER) throw new Error(`K-320 ${d.layout}: strip ${stripW} > lane inner ${LANE_INNER}`);
  if (d.pic < G1_FLOOR) throw new Error(`K-320 ${d.layout}: picture ${d.pic} < the G1 floor ${G1_FLOOR}`);
  return { loc, pool: entriesFor(theme, loc), stripW };
}
/** The ordinal (1-based) of tile idx under the strip's start side. */
function kOf(idx, n, start) { return start === 'left' ? idx + 1 : n - idx; }
function rootOpen(d, theme, loc, extra, rows, minH, gap) {
  return `<div data-lcs-ordinal-page data-lcs-face="${d.layout}" data-lcs-theme="${theme}" data-lcs-locale="${loc}" data-lcs-pic="${d.pic}" ${extra} ` +
    `style="flex:1;display:grid;grid-template-rows:repeat(${rows},minmax(${minH}px,1fr));gap:${gap}px;min-height:0">`;
}

function buildFace(bankLoc, d, { theme, locale }, ctx) {
  const rng = ctx.rng;
  if (d.layout === 'race') return buildRace(bankLoc, d, { theme, locale }, rng);
  const { loc, pool } = facePreamble(bankLoc, d, theme, locale);
  if (d.layout === 'write') return buildWrite(bankLoc, d, { theme, loc, pool }, rng);
  if (d.layout === 'words') return buildWords(bankLoc, d, { theme, loc, pool }, rng);
  if (d.layout === 'where') return buildWhere(bankLoc, d, { theme, loc, pool }, rng);
  throw new Error('K-320: unknown layout ' + d.layout);
}

/** F1 — write the ordinal numbers: given cells + open cells under every tile. */
function buildWrite(bankLoc, d, { theme, loc, pool }, rng) {
  if (!(d.given >= 1 && d.blank >= 1 && d.given + d.blank === d.n)) throw new Error(`K-320 write: given ${d.given} + blank ${d.blank} != n ${d.n}`);
  if (d.blank > d.n - 1) throw new Error('K-320 write: position 1 is never blank, so blank <= n - 1');
  const policy = bankLoc.genderPolicy === 'noun' ? 'noun' : 'position';
  const sides = startSides(rng, d);
  const positions = []; for (let i = 1; i < d.n; i++) positions.push(i);   // idx 0 (the tile by the flag) is always given
  const minH = ARROW_ROW + 4 + d.tile + 4 + 44 + PAD_BORDER;
  const panels = [], meta = { strips: [] }, blankSets = [];
  for (let s = 0; s < d.strips; s++) {
    const items = sampleEntries(rng, pool, d.n, `K-320 write ${theme}/${loc} strip ${s + 1}`);
    const seen = new Set();
    for (const it of items) { if (seen.has(it.noun)) throw new Error('K-320 write: duplicate noun in a strip: ' + it.noun); seen.add(it.noun); }
    const start = sides[s];
    // the blank set: `blank` of idx 1..n-1, no run of 4 in a row, distinct from every earlier strip
    let blanks = null;
    for (let attempt = 0; attempt < 500 && !blanks; attempt++) {
      const cand = rng.sample(positions, d.blank).sort((a, b) => a - b);
      let run = 0, bad = false;
      for (let i = 0; i < d.n; i++) { run = cand.includes(i) ? run + 1 : 0; if (run >= 4) { bad = true; break; } }
      if (bad) continue;
      const key = cand.join(',');
      if (blankSets.includes(key)) continue;
      blankSets.push(key); blanks = cand;
    }
    if (!blanks) throw new Error('K-320 write: no blank set satisfies the rule (blank ' + d.blank + ' of n ' + d.n + ')');
    const given = [], answers = [], genders = [];
    for (let i = 0; i < d.n; i++) {
      const k = kOf(i, d.n, start);
      const g = policy === 'noun' ? (items[i].gender === 'f' ? 'f' : 'm') : 'm';
      const lit = ordinalFor(loc, k, g);   // throws on a missing feminine / outside 1..10 (refusal)
      if (!lit.includes(String(k))) throw new Error('K-320 write: notation "' + lit + '" does not carry ' + k);
      genders.push(g);
      if (blanks.includes(i)) { given.push(null); answers.push(lit); } else { given.push(lit); answers.push(null); }
    }
    const strip = lineUpStrip({ theme, items, tile: d.tile, pic: d.pic, gap: d.gap, start, flagScale: d.flagScale || 1.5, under: 'box', given, answers });
    panels.push(lineUpPanel({
      strip: strip.html, below: '', minH, justify: 'center',
      attrs: `data-lcs-strip data-lcs-order="${items.map((it) => it.noun).join(',')}" data-lcs-start="${start}" data-lcs-n="${d.n}" data-lcs-blank="${d.blank}" data-lcs-blanks="${blanks.join(',')}" data-lcs-genders="${genders.join(',')}"`,
    }));
    meta.strips.push({ order: items.map((it) => it.noun), start, blanks, answers });
  }
  const bodyHtml = rootOpen(d, theme, loc, `data-lcs-startmode="${d.start}" data-lcs-genderpolicy="${policy}" data-lcs-given="${d.given}" data-lcs-blank="${d.blank}"`, d.strips, minH, GRID_GAP) + panels.join('') + '</div>';
  return { bodyHtml, meta };
}

/** F2 — ordinal words: a bank row of word chips under the strip, shuffled; the child draws a line to the picture. */
function buildWords(bankLoc, d, { theme, loc, pool }, rng) {
  if (!(d.words >= 2 && d.words <= d.n)) throw new Error(`K-320 words: words ${d.words} outside 2..n ${d.n}`);
  const table = {};
  for (const w of bankLoc.words || []) table[w.k] = w;
  const px = bankLoc.wordPx === 20 ? 20 : 22;
  const sides = startSides(rng, d);
  const ks = []; for (let k = 1; k <= d.n; k++) ks.push(k);
  const minH = ARROW_ROW + 4 + d.tile + LINE_ZONE + 44 + PAD_BORDER;
  const panels = [], meta = { strips: [] };
  for (let s = 0; s < d.strips; s++) {
    const items = sampleEntries(rng, pool, d.n, `K-320 words ${theme}/${loc} strip ${s + 1}`);
    const seen = new Set();
    for (const it of items) { if (seen.has(it.noun)) throw new Error('K-320 words: duplicate noun in a strip: ' + it.noun); seen.add(it.noun); }
    const start = sides[s];
    const chosen = rng.sample(ks, d.words);
    let order = null;
    for (let attempt = 0; attempt < 200 && !order; attempt++) {
      const cand = rng.shuffle(chosen);
      let ascending = true;
      for (let i = 1; i < cand.length; i++) if (cand[i] < cand[i - 1]) { ascending = false; break; }
      if (!ascending) order = cand;   // never the position order: at least one crossing pair
    }
    if (!order) throw new Error('K-320 words: could not shuffle the chip row off the position order');
    const words = order.map((k) => {
      const w = table[k];
      if (!w || !w.m) throw new Error('K-320 words: the bank has no word for ' + k);
      const target = start === 'left' ? k - 1 : d.n - k;
      return { k, text: w.m, target };
    });
    const strip = lineUpStrip({ theme, items, tile: d.tile, pic: d.pic, gap: d.gap, start, flagScale: d.flagScale || 1.5, under: 'none' });
    const row = wordChipRow({ words: words.map((w) => ({ k: w.k, text: w.text })), px, gap: 8 });
    panels.push(lineUpPanel({
      strip: strip.html, below: row, minH,
      attrs: `data-lcs-strip data-lcs-order="${items.map((it) => it.noun).join(',')}" data-lcs-start="${start}" data-lcs-n="${d.n}" data-lcs-words-n="${d.words}"`,
    }));
    meta.strips.push({ order: items.map((it) => it.noun), start, words: words.map((w) => [w.k, w.text, w.target]) });
  }
  const bodyHtml = rootOpen(d, theme, loc, `data-lcs-startmode="${d.start}" data-lcs-wordpx="${px}" data-lcs-words="${d.words}"`, d.strips, minH, GRID_GAP) + panels.join('') + '</div>';
  return { bodyHtml, meta };
}

/** F3 — which place: a pictured query per cell; the child writes the numeral. Lookalike nouns never share a strip. */
function buildWhere(bankLoc, d, { theme, loc, pool }, rng) {
  if (!(d.queries >= 1 && d.queries <= d.n)) throw new Error(`K-320 where: queries ${d.queries} outside 1..n ${d.n}`);
  const clone = d.clone || 56;
  if (clone < G1_FLOOR) throw new Error('K-320 where: clone ' + clone + ' < the G1 floor');
  const groups = (bankLoc.lookalikes && bankLoc.lookalikes[theme]) || [];
  const groupOf = {};
  groups.forEach((g, gi) => g.forEach((noun) => { groupOf[noun] = gi; }));
  const sides = startSides(rng, d);
  const label = bankLoc.where && bankLoc.where.printed ? String(bankLoc.where.label || '') : '';
  const minH = ARROW_ROW + 4 + d.tile + QUERY_GAP + (clone + 12) + PAD_BORDER + (label ? 30 : 0);
  const panels = [], meta = { strips: [] };
  const pageAnswers = [];
  for (let s = 0; s < d.strips; s++) {
    // walk a shuffled pool; accept a noun unless its lookalike group is already seated in this strip
    const items = [], used = new Set();
    for (const e of rng.shuffle(pool)) {
      const gi = groupOf[e.noun];
      if (gi != null && used.has(gi)) continue;
      items.push(e); if (gi != null) used.add(gi);
      if (items.length === d.n) break;
    }
    if (items.length < d.n) throw new Error(`K-320 where ${theme}/${loc} strip ${s + 1}: only ${items.length} lookalike-free nouns, need ${d.n}`);
    const start = sides[s];
    const qs = rng.sample(items.map((_, i) => i), d.queries).sort((a, b) => a - b);
    const cells = qs.map((idx) => {
      const k = kOf(idx, d.n, start);
      const answer = ordinalFor(loc, k);   // genderPolicy 'position' (design §1): one expected string per k
      pageAnswers.push(answer);
      return { idx, noun: items[idx].noun, k, answer };
    });
    const strip = lineUpStrip({ theme, items, tile: d.tile, pic: d.pic, gap: d.gap, start, flagScale: d.flagScale || 1.5, under: 'none' });
    const below = (label ? `<div data-lcs-where-label style="font-family:Nunito,sans-serif;font-weight:800;font-size:18px;color:#3A3530;line-height:30px">${label.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</div>` : '') +
      `<div data-lcs-queries style="display:flex;gap:40px;justify-content:center;align-items:center">` +
      cells.map((c) => queryCell({ src: fileUri(theme, c.noun), noun: c.noun, pic: clone, answer: c.answer })).join('') + '</div>';
    panels.push(lineUpPanel({
      strip: strip.html, below, minH,
      attrs: `data-lcs-strip data-lcs-order="${items.map((it) => it.noun).join(',')}" data-lcs-start="${start}" data-lcs-n="${d.n}" data-lcs-queries-n="${d.queries}"`,
    }));
    meta.strips.push({ order: items.map((it) => it.noun), start, queries: cells.map((c) => [c.noun, c.k]) });
  }
  if (pageAnswers.length > 1 && new Set(pageAnswers).size === 1) throw new Error('K-320 where: every answer on the page is ' + pageAnswers[0]);
  const bodyHtml = rootOpen(d, theme, loc, `data-lcs-startmode="${d.start}" data-lcs-queries="${d.queries}" data-lcs-clone="${clone}"`, d.strips, minH, GRID_GAP) + panels.join('') + '</div>';
  return { bodyHtml, meta };
}

/** F5 — who wins the race: runners at distinct distances from a chequered finish; rank by distance. */
function buildRace(bankLoc, d, { theme, locale }, rng) {
  const loc = (locale || 'en').slice(0, 2);
  if (!theme) throw new Error('K-320: a theme is required (themed type)');
  if (BW_MARK.test(theme)) throw new Error(`K-320: theme "${theme}" is a B&W theme — the type excludes BW art (refused)`);
  const racers = bankLoc.racers || [];
  if (!racers.includes(theme)) throw new Error(`K-320 race: theme "${theme}" is not a racer (${racers.join(', ')}) — the wave must pin one (refused)`);
  if (!(d.lanes >= 2 && d.lanes <= 10)) throw new Error('K-320 race: lanes ' + d.lanes + ' outside 2..10');
  if (!(d.sep >= G1_FLOOR)) throw new Error('K-320 race: sep ' + d.sep + ' < the G1 floor ' + G1_FLOOR);
  if (d.pic < G1_FLOOR) throw new Error('K-320 race: runner ' + d.pic + ' < the G1 floor');
  const laneW = d.laneW || RACE_LANE_W;
  const noRace = new Set((bankLoc.noRace && bankLoc.noRace[theme]) || []);
  const facing = (bankLoc.facing && bankLoc.facing[theme]) || {};
  const pool = entriesFor(theme, loc).filter((e) => !noRace.has(e.noun));
  const items = sampleEntries(rng, pool, d.lanes, `K-320 race ${theme}/${loc}`);
  const seen = new Set();
  for (const it of items) { if (seen.has(it.noun)) throw new Error('K-320 race: duplicate runner: ' + it.noun); seen.add(it.noun); }
  // slots: the runner's LEFT edge on a grid of step `step` from x0, jittered +-jit; pairwise >= step - 2*jit >= sep
  const step = d.step || 88, jit = d.jitter == null ? 12 : d.jitter, x0 = d.x0 == null ? 26 : d.x0;
  if (step - 2 * jit < d.sep) throw new Error(`K-320 race: step ${step} - 2 x jitter ${jit} < sep ${d.sep}`);
  const lastRight = x0 + (d.lanes - 1) * step + jit + d.pic;
  if (lastRight > laneW) throw new Error(`K-320 race: the farthest runner reaches ${lastRight} > lane ${laneW}`);
  if (x0 - jit < 6) throw new Error('K-320 race: the nearest slot runs off the lane start');
  const slots = rng.shuffle(items.map((_, i) => i));
  const runners = items.map((it, i) => ({ noun: it.noun, x: x0 + slots[i] * step + rng.int(-jit, jit) }));
  for (let a = 0; a < runners.length; a++) for (let b = a + 1; b < runners.length; b++) {
    if (Math.abs(runners[a].x - runners[b].x) < d.sep) throw new Error('K-320 race: two runners closer than ' + d.sep);
  }
  const byX = runners.slice().sort((a, b) => b.x - a.x);
  byX.forEach((r, i) => { r.rank = i + 1; r.answer = ordinalFor(loc, i + 1); });
  const rowH = d.rowH || 96;
  const rows = runners.map((r) => {
    const face = facing[r.noun] || facing.default || 'front';
    const mirror = face === 'left';
    return `<div class="ws-race-row" data-ws-content data-lcs-lane style="display:flex;align-items:center;gap:8px;padding:0 12px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;min-height:${rowH}px;min-width:0">` +
      raceLane({ src: fileUri(theme, r.noun), noun: r.noun, x: r.x, laneW, pic: d.pic, h: RACE_H, mirror }) +
      finishLine({ h: RACE_H }) +
      blankNumeralBox({ w: 72, h: 44, answer: r.answer, attrs: 'data-lcs-rank-box' }) + '</div>';
  });
  const bodyHtml = `<div data-lcs-ordinal-page data-lcs-face="race" data-lcs-theme="${theme}" data-lcs-locale="${loc}" data-lcs-pic="${d.pic}" ` +
    `data-lcs-lanes="${d.lanes}" data-lcs-sep="${d.sep}" data-lcs-lanew="${laneW}" ` +
    `style="flex:1;display:grid;grid-template-rows:repeat(${d.lanes},minmax(${rowH}px,1fr));gap:8px;min-height:0">` + rows.join('') + '</div>';
  return { bodyHtml, meta: { runners: runners.map((r) => [r.noun, r.x, r.rank]) } };
}

module.exports = {
  id: 'K-320',
  slug: 'ordinal-numbers',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'ordinal-numbers',
  themeAxis: { applicable: true, minNouns: 10, excludeBw: true },
  difficulty: {
    1: { strips: 3, n: 5, tile: 100, pic: 84, gap: 12, chips: 2, kMax: 5, distinct: false, maxRepeat: 2, mustInclude: [1, 5], anyOf: null, actions: ['circle', 'cross'], chipPx: 30, pillH: 48, start: 'left', flagScale: 1.5 },
    2: { strips: 3, n: 7, tile: 84, pic: 72, gap: 8, chips: 2, kMax: 7, distinct: true, maxRepeat: 1, mustInclude: [1], anyOf: [6, 7], actions: ['circle', 'cross'], chipPx: 30, pillH: 44, start: 'left', flagScale: 1.5 },
    3: { strips: 3, n: 8, tile: 76, pic: 64, gap: 5, chips: 2, kMax: 8, distinct: true, maxRepeat: 1, mustInclude: [1, 8], anyOf: null, actions: ['circle', 'cross', 'tick'], chipPx: 28, pillH: 44, start: 'left', flagScale: 1.5 },
  },
  i18n: {
    en: {
      title: 'Ordinal Numbers: Find the Place',
      instruction: 'Start at the flag. Count to the number of each chip and make the mark it shows.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d, { theme, locale }, ctx) {
    if (!d) throw new Error('K-320: no difficulty config');
    if (d.layout != null && d.layout !== 'base') return buildFace(bankLoc, d, { theme, locale }, ctx);   // Phase-2 faces; the base path below is untouched
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!theme) throw new Error('K-320: a theme is required (themed type)');
    if (BW_MARK.test(theme)) throw new Error(`K-320: theme "${theme}" is a B&W theme — the base excludes BW art (refused)`);
    if (d.kMax > d.n) throw new Error(`K-320: kMax ${d.kMax} > n ${d.n}`);
    const stripW = d.n * d.tile + (d.n - 1) * d.gap;
    if (stripW > LANE_INNER) throw new Error(`K-320: strip ${stripW} > lane inner ${LANE_INNER}`);
    if (d.actions.length < d.chips) throw new Error('K-320: fewer actions than chips per strip');
    const notation = (k) => {
      const s = ordinalFor(loc, k);   // throws outside 1..10 / missing locale (refusal)
      if (bankLoc.notation[k] !== s) throw new Error('K-320: bank/ordinalFor disagree at ' + k);
      return s;
    };

    const pool = entriesFor(theme, loc);
    const ks = pageOrdinals(rng, d);
    const sides = startSides(rng, d);
    const minH = panelMin(d);
    const panels = [];
    const meta = { strips: [] };
    for (let s = 0; s < d.strips; s++) {
      const items = sampleEntries(rng, pool, d.n, `K-320 ${theme}/${loc} strip ${s + 1}`);
      const seen = new Set();
      for (const it of items) { if (seen.has(it.noun)) throw new Error('K-320: duplicate noun in a strip: ' + it.noun); seen.add(it.noun); }
      const start = sides[s];
      const actions = rng.sample(d.actions, d.chips);
      const chips = ks[s].map((k, i) => {
        if (!(k >= 1 && k <= d.n)) throw new Error(`K-320: ordinal ${k} outside 1..${d.n}`);
        const target = start === 'left' ? k - 1 : d.n - k;
        return { k, action: actions[i], target, notation: notation(k) };
      });
      const targets = new Set(chips.map((c) => c.target));
      if (targets.size !== chips.length) throw new Error('K-320: two chips on one tile');
      const strip = lineUpStrip({ theme, items, tile: d.tile, pic: d.pic, gap: d.gap, start, flagScale: d.flagScale || 1.5, under: 'band' });
      const chipRow = `<div data-lcs-chips style="display:flex;gap:24px;align-items:center;justify-content:center;height:${d.pillH}px">` +
        chips.map((c) => ordinalChip({
          k: c.k, notation: c.notation, px: d.chipPx, icon: c.action, h: d.pillH,
          attrs: `data-lcs-chip data-lcs-ordinal="${c.k}" data-lcs-action="${c.action}" data-lcs-target="${c.target}" data-lcs-notation="${c.notation}"`,
        })).join('') + `</div>`;
      panels.push(lineUpPanel({
        strip: strip.html, below: chipRow, minH,
        attrs: `data-lcs-strip data-lcs-order="${items.map((it) => it.noun).join(',')}" data-lcs-start="${start}" data-lcs-n="${d.n}" data-lcs-chips-n="${d.chips}"`,
      }));
      meta.strips.push({ order: items.map((it) => it.noun), start, chips: chips.map((c) => [c.k, c.action, c.target]) });
    }
    const bodyHtml = `<div data-lcs-ordinal-page data-lcs-theme="${theme}" data-lcs-locale="${loc}" data-lcs-kmax="${d.kMax}" ` +
      `data-lcs-distinct="${d.distinct ? 1 : 0}" data-lcs-maxrep="${d.maxRepeat || 0}" data-lcs-must="${(d.mustInclude || []).join(',')}" ` +
      `data-lcs-anyof="${(d.anyOf || []).join(',')}" data-lcs-actions="${d.actions.join(',')}" data-lcs-startmode="${d.start}" ` +
      `data-lcs-pic="${d.pic}" data-lcs-pillh="${d.pillH}" ` +
      `style="flex:1;display:grid;grid-template-rows:repeat(${d.strips},minmax(${minH}px,1fr));gap:${GRID_GAP}px;min-height:0">` +
      panels.join('') + `</div>`;
    return { bodyHtml, meta };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-ordinal-page]');
      if (!root) return ['no ordinal-numbers root'];
      const theme = root.dataset.lcsTheme || '';
      const bw = root.dataset.lcsBw === '1';
      if (/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i.test(theme) && !bw) fails.push(`theme "${theme}" carries a B&W marker without data-lcs-bw`);
      const face = root.dataset.lcsFace || null;

      /* ---- shared: one line-up strip (tiles + flag + arrow); returns {order, n, start, tiles} or null */
      const checkStrip = (lane, S) => {
        const order = (lane.dataset.lcsOrder || '').split(',').filter(Boolean);
        const n = +lane.dataset.lcsN, start = lane.dataset.lcsStart;
        if (!['left', 'right'].includes(start)) fails.push(`${S}: start stamp "${start}"`);
        if (!(n >= 2) || order.length !== n) fails.push(`${S}: order has ${order.length} nouns, n=${n}`);
        if (new Set(order).size !== order.length) fails.push(`${S}: a noun repeats in the line-up`);
        const arrow = lane.querySelector('[data-lcs-arrow]');
        if (!arrow) fails.push(`${S}: no start arrow`);
        else if (arrow.dataset.lcsArrow !== start) fails.push(`${S}: arrow drawn ${arrow.dataset.lcsArrow}, strip stamped ${start}`);
        if (!lane.querySelector('[data-lcs-flag]')) fails.push(`${S}: no flag`);
        const tiles = [...lane.querySelectorAll('[data-lcs-idx]')];
        if (tiles.length !== n) fails.push(`${S}: ${tiles.length} tiles, n=${n}`);
        tiles.forEach((t) => {
          const idx = +t.dataset.lcsIdx;
          if (order[idx] !== t.dataset.lcsNoun) fails.push(`${S}: tile ${idx} noun "${t.dataset.lcsNoun}" != order "${order[idx]}"`);
          if (t.textContent.trim()) fails.push(`${S}: tile ${idx} carries text "${t.textContent.trim().slice(0, 12)}"`);
          if (t.querySelector('text')) fails.push(`${S}: tile ${idx} carries SVG text`);
          const imgs = t.querySelectorAll('img');
          if (imgs.length !== 1) fails.push(`${S}: tile ${idx} has ${imgs.length} pictures`);
          imgs.forEach((img) => {
            if (img.hasAttribute('alt')) fails.push(`${S}: tile ${idx} img carries alt`);
            if (!img.complete || img.naturalWidth === 0) fails.push(`${S}: tile ${idx} picture broken`);
          });
        });
        const ordered = [...tiles].sort((a, b) => +a.dataset.lcsIdx - +b.dataset.lcsIdx);
        for (let i = 1; i < ordered.length; i++) {
          if (ordered[i].getBoundingClientRect().left <= ordered[i - 1].getBoundingClientRect().left) fails.push(`${S}: tile ${i} is not to the right of tile ${i - 1}`);
        }
        return { order, n, start, tiles: ordered };
      };
      /* the only text a lane may carry sits inside `allowSel` nodes */
      const onlyText = (lane, S, allowSel) => {
        const walker = document.createTreeWalker(lane, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          const t = node.textContent.trim();
          if (t && !(allowSel && node.parentElement.closest(allowSel))) fails.push(`${S}: stray text "${t.slice(0, 16)}"`);
        }
      };
      const kOf = (idx, n, start) => (start === 'left' ? idx + 1 : n - idx);
      const startMode = root.dataset.lcsStartmode;
      const checkStartMode = (sides) => {
        if (!['left', 'right', 'mixed'].includes(startMode)) fails.push('startmode stamp ' + startMode);
        if (startMode === 'mixed' && !(sides.has('left') && sides.has('right'))) fails.push('start:mixed but not both sides present');
        if ((startMode === 'left' || startMode === 'right') && [...sides].some((s) => s !== startMode)) fails.push(`start:${startMode} but a strip starts elsewhere`);
      };

      /* ================= F1 write ================= */
      if (face === 'write') {
        const lanes = [...root.querySelectorAll('[data-ws-content][data-lcs-strip]')];
        if (!lanes.length) fails.push('no line-up strips');
        const blankCfg = +root.dataset.lcsBlank, givenCfg = +root.dataset.lcsGiven;
        const sides = new Set(), blankSets = [];
        let boxesSeen = 0;
        lanes.forEach((lane, si) => {
          const S = `strip ${si + 1}`;
          const st = checkStrip(lane, S);
          sides.add(st.start);
          if (lane.querySelector('[data-lcs-chip]')) fails.push(`${S}: a cue chip on a write page`);
          const boxes = [...lane.querySelectorAll('[data-lcs-box]')].sort((a, b) => +a.dataset.lcsBox - +b.dataset.lcsBox);
          if (boxes.length !== st.n) fails.push(`${S}: ${boxes.length} numeral cells, n=${st.n}`);
          const blanks = [];
          let run = 0;
          boxes.forEach((b) => {
            const idx = +b.dataset.lcsBox;
            const k = kOf(idx, st.n, st.start);
            const isGiven = b.hasAttribute('data-lcs-given');
            const isBlank = b.classList.contains('ws-blankbox');
            if (isGiven === isBlank) fails.push(`${S}: cell ${idx} is neither a given nor a blank`);
            boxesSeen++;
            if (isGiven) {
              const lit = b.dataset.lcsGiven;
              if (b.textContent.trim() !== lit) fails.push(`${S}: cell ${idx} prints "${b.textContent.trim()}", stamped "${lit}"`);
              if (!lit.includes(String(k))) fails.push(`${S}: given cell ${idx} "${lit}" does not carry ${k}`);
              run = 0;
            } else {
              const ans = b.dataset.lcsAnswer || '';
              if (!ans.includes(String(k))) fails.push(`${S}: blank cell ${idx} answer "${ans}" does not carry ${k}`);
              if (b.textContent.trim()) fails.push(`${S}: blank cell ${idx} prints "${b.textContent.trim()}" (the answer is never printed)`);
              if (idx === 0 || k === 1) fails.push(`${S}: position 1 is blank`);
              blanks.push(idx);
              run++;
              if (run >= 4) fails.push(`${S}: four blanks in a row`);
            }
            const r = b.getBoundingClientRect();
            if (r.height < 43.4) fails.push(`${S}: cell ${idx} ${r.height.toFixed(1)} < 44 high`);
          });
          if (blanks.length !== blankCfg) fails.push(`${S}: ${blanks.length} blanks, config says ${blankCfg}`);
          if (boxes.length - blanks.length !== givenCfg) fails.push(`${S}: ${boxes.length - blanks.length} given, config says ${givenCfg}`);
          const stamped = (lane.dataset.lcsBlanks || '').split(',').filter(Boolean).map(Number).join(',');
          if (stamped !== blanks.join(',')) fails.push(`${S}: blanks stamped ${stamped}, rendered ${blanks.join(',')}`);
          if (blankSets.includes(blanks.join(','))) fails.push(`${S}: the blank set repeats an earlier strip`);
          blankSets.push(blanks.join(','));
          onlyText(lane, S, '[data-lcs-given]');
        });
        if (!boxesSeen) fails.push('non-vacuity: 0 numeral cells checked');
        checkStartMode(sides);
        return fails;
      }

      /* ================= F2 words ================= */
      if (face === 'words') {
        const lanes = [...root.querySelectorAll('[data-ws-content][data-lcs-strip]')];
        if (!lanes.length) fails.push('no line-up strips');
        const wordsCfg = +root.dataset.lcsWords, px = +root.dataset.lcsWordpx;
        if (![22, 20].includes(px)) fails.push('wordpx stamp ' + px);
        const sides = new Set();
        let chipsSeen = 0;
        lanes.forEach((lane, si) => {
          const S = `strip ${si + 1}`;
          const st = checkStrip(lane, S);
          sides.add(st.start);
          if (lane.querySelector('[data-lcs-chip]')) fails.push(`${S}: a cue chip on a words page`);
          if (lane.querySelector('[data-lcs-band]')) fails.push(`${S}: a mark band under a words strip`);
          const bank = lane.querySelector('[data-lcs-bank]');
          if (!bank) fails.push(`${S}: no word bank row`);
          const chips = [...lane.querySelectorAll('[data-lcs-word-k]')];
          if (chips.length !== wordsCfg) fails.push(`${S}: ${chips.length} word chips, config says ${wordsCfg}`);
          const ks = [];
          chips.forEach((c, ci) => {
            const k = +c.dataset.lcsWordK;
            chipsSeen++;
            if (!(k >= 1 && k <= st.n)) fails.push(`${S} chip ${ci + 1}: k ${k} outside 1..${st.n}`);
            if (!c.textContent.trim()) fails.push(`${S} chip ${ci + 1}: empty`);
            if (/\d/.test(c.textContent)) fails.push(`${S} chip ${ci + 1}: a word chip carries a digit "${c.textContent.trim()}"`);
            if (c.closest('[data-lcs-idx]')) fails.push(`${S} chip ${ci + 1}: a chip inside a tile`);
            if (bank && !bank.contains(c)) fails.push(`${S} chip ${ci + 1}: outside the bank row`);
            const r = c.getBoundingClientRect();
            if (r.height < 43.4) fails.push(`${S} chip ${ci + 1}: ${r.height.toFixed(1)} < 44 high`);
            if (Math.abs(parseFloat(getComputedStyle(c).fontSize) - px) > 0.6) fails.push(`${S} chip ${ci + 1}: font ${getComputedStyle(c).fontSize}, stamped ${px}`);
            ks.push(k);
          });
          if (new Set(ks).size !== ks.length) fails.push(`${S}: a word repeats (${ks.join(',')})`);
          let ascending = ks.length > 1;
          for (let i = 1; i < ks.length; i++) if (ks[i] < ks[i - 1]) ascending = false;
          if (ascending) fails.push(`${S}: the chips stand in position order (${ks.join(',')})`);
          // the bank row sits BELOW the strip, with room for lines
          const strip = lane.querySelector('[data-lcs-lineup]');
          if (bank && strip) {
            const gapPx = bank.getBoundingClientRect().top - strip.getBoundingClientRect().bottom;
            if (gapPx < 59.4) fails.push(`${S}: line zone ${gapPx.toFixed(1)} < 60`);
          }
          onlyText(lane, S, '[data-lcs-word-k]');
        });
        if (!chipsSeen) fails.push('non-vacuity: 0 word chips checked');
        checkStartMode(sides);
        return fails;
      }

      /* ================= F3 where ================= */
      if (face === 'where') {
        const lanes = [...root.querySelectorAll('[data-ws-content][data-lcs-strip]')];
        if (!lanes.length) fails.push('no line-up strips');
        const qCfg = +root.dataset.lcsQueries, clone = +root.dataset.lcsClone;
        const sides = new Set(), pageAnswers = [];
        let qSeen = 0;
        lanes.forEach((lane, si) => {
          const S = `strip ${si + 1}`;
          const st = checkStrip(lane, S);
          sides.add(st.start);
          if (lane.querySelector('[data-lcs-chip]')) fails.push(`${S}: a cue chip on a where page`);
          if (lane.querySelector('[data-lcs-band]')) fails.push(`${S}: a mark band under a where strip`);
          const qs = [...lane.querySelectorAll('[data-lcs-query]')];
          if (qs.length !== qCfg) fails.push(`${S}: ${qs.length} queries, config says ${qCfg}`);
          const nouns = [];
          qs.forEach((q, qi) => {
            qSeen++;
            const noun = q.dataset.lcsNoun;
            const hits = st.order.filter((x) => x === noun).length;
            if (hits !== 1) fails.push(`${S} query ${qi + 1}: "${noun}" occurs ${hits}x in its strip`);
            const idx = st.order.indexOf(noun);
            const k = kOf(idx, st.n, st.start);
            const box = q.querySelector('.ws-blankbox');
            if (!box) fails.push(`${S} query ${qi + 1}: no answer box`);
            else {
              const ans = box.dataset.lcsAnswer || '';
              if (idx >= 0 && !ans.includes(String(k))) fails.push(`${S} query ${qi + 1}: answer "${ans}" does not carry ${k}`);
              pageAnswers.push(ans);
              if (box.getBoundingClientRect().height < 43.4) fails.push(`${S} query ${qi + 1}: box < 44 high`);
            }
            const img = q.querySelector('img');
            if (!img) fails.push(`${S} query ${qi + 1}: no clone picture`);
            else {
              if (!img.complete || img.naturalWidth === 0) fails.push(`${S} query ${qi + 1}: clone broken`);
              if (img.hasAttribute('alt')) fails.push(`${S} query ${qi + 1}: clone carries alt`);
              const tile = st.tiles[idx];
              const tileImg = tile && tile.querySelector('img');
              if (tileImg && tileImg.getAttribute('src') !== img.getAttribute('src')) fails.push(`${S} query ${qi + 1}: clone src != the strip tile's src`);
              const r = img.getBoundingClientRect();
              if (r.width < clone - 0.6 || r.height < clone - 0.6) fails.push(`${S} query ${qi + 1}: clone ${r.width.toFixed(1)}x${r.height.toFixed(1)} < ${clone}`);
            }
            if (q.closest('[data-lcs-idx]')) fails.push(`${S} query ${qi + 1}: a query inside a tile`);
            if (q.textContent.trim()) fails.push(`${S} query ${qi + 1}: prints "${q.textContent.trim().slice(0, 12)}"`);
            nouns.push(noun);
          });
          if (new Set(nouns).size !== nouns.length) fails.push(`${S}: two queries ask the same noun`);
          onlyText(lane, S, '[data-lcs-where-label]');
        });
        if (!qSeen) fails.push('non-vacuity: 0 queries checked');
        if (pageAnswers.length > 1 && new Set(pageAnswers).size === 1) fails.push('every answer on the page is ' + pageAnswers[0]);
        checkStartMode(sides);
        return fails;
      }

      /* ================= F5 race ================= */
      if (face === 'race') {
        const lanesCfg = +root.dataset.lcsLanes, sep = +root.dataset.lcsSep, laneW = +root.dataset.lcsLanew, pic = +root.dataset.lcsPic;
        const rows = [...root.querySelectorAll('[data-ws-content][data-lcs-lane]')];
        if (rows.length !== lanesCfg) fails.push(`${rows.length} lanes, config says ${lanesCfg}`);
        const runners = [];
        rows.forEach((row, ri) => {
          const S = `lane ${ri + 1}`;
          const rs = row.querySelectorAll('[data-lcs-runner]');
          if (rs.length !== 1) fails.push(`${S}: ${rs.length} runners`);
          const fin = row.querySelectorAll('[data-lcs-finish]');
          if (fin.length !== 1) fails.push(`${S}: ${fin.length} finish strips`);
          const boxes = row.querySelectorAll('.ws-blankbox');
          if (boxes.length !== 1) fails.push(`${S}: ${boxes.length} answer boxes`);
          const r = rs[0], box = boxes[0], f = fin[0];
          if (!r || !box || !f) return;
          const x = +r.dataset.lcsX, noun = r.dataset.lcsNoun;
          const img = r.querySelector('img');
          if (!img) fails.push(`${S}: no runner picture`);
          else {
            if (!img.complete || img.naturalWidth === 0) fails.push(`${S}: runner picture broken`);
            if (img.hasAttribute('alt')) fails.push(`${S}: runner carries alt`);
            const ib = img.getBoundingClientRect(), lb = r.getBoundingClientRect(), fb = f.getBoundingClientRect();
            if (Math.abs(ib.left - lb.left - x) > 0.6) fails.push(`${S}: runner drawn at ${(ib.left - lb.left).toFixed(1)}, stamped x=${x}`);
            if (ib.width < pic - 0.6 || ib.height < pic - 0.6) fails.push(`${S}: runner ${ib.width.toFixed(1)}x${ib.height.toFixed(1)} < ${pic}`);
            if (ib.right > lb.right + 0.6 || ib.left < lb.left - 0.6) fails.push(`${S}: runner outside its lane`);
            if (ib.right > fb.left + 0.6) fails.push(`${S}: runner overlaps the finish`);
            if (fb.left <= ib.right) fails.push(`${S}: finish is not to the right of the runner`);
          }
          if (r.textContent.trim() || box.textContent.trim()) fails.push(`${S}: prints text`);
          if (box.getBoundingClientRect().height < 43.4) fails.push(`${S}: box < 44 high`);
          runners.push({ x, noun, answer: box.dataset.lcsAnswer || '', S });
        });
        if (!runners.length) fails.push('non-vacuity: 0 runners checked');
        for (let a = 0; a < runners.length; a++) for (let b = a + 1; b < runners.length; b++) {
          if (Math.abs(runners[a].x - runners[b].x) < sep) fails.push(`${runners[a].S} and ${runners[b].S}: runners ${Math.abs(runners[a].x - runners[b].x)} px apart < ${sep}`);
        }
        if (new Set(runners.map((r) => r.noun)).size !== runners.length) fails.push('a runner repeats');
        runners.forEach((r) => {
          const rank = 1 + runners.filter((o) => o.x > r.x).length;
          if (!r.answer.includes(String(rank))) fails.push(`${r.S}: answer "${r.answer}" does not carry rank ${rank} (x=${r.x})`);
          if (!(r.x >= 0 && r.x + pic <= laneW)) fails.push(`${r.S}: x ${r.x} outside the lane`);
        });
        const ranks = runners.map((r) => 1 + runners.filter((o) => o.x > r.x).length);
        if (new Set(ranks).size !== ranks.length) fails.push('two runners share a rank');
        if (root.querySelector('[data-lcs-chip], [data-lcs-idx]')) fails.push('a strip element on a race page');
        return fails;
      }
      if (face) return ['unknown face stamp ' + face];

      /* ================= base (and F4 = start:mixed) ================= */
      const kMax = +root.dataset.lcsKmax, distinct = root.dataset.lcsDistinct === '1', maxRep = +root.dataset.lcsMaxrep;
      const must = (root.dataset.lcsMust || '').split(',').filter(Boolean).map(Number);
      const anyOf = (root.dataset.lcsAnyof || '').split(',').filter(Boolean).map(Number);
      const actions = (root.dataset.lcsActions || '').split(',').filter(Boolean);
      const lanes = [...root.querySelectorAll('[data-ws-content][data-lcs-strip]')];
      if (!lanes.length) fails.push('no line-up strips');
      const allKs = [];
      const sides = new Set();
      lanes.forEach((lane, si) => {
        const S = `strip ${si + 1}`;
        const st = checkStrip(lane, S);
        const { n, start } = st;
        const chipsN = +lane.dataset.lcsChipsN;
        sides.add(start);
        // chips: chipsN, each 1<=k<=n, target re-derived, distinct k + action, targets disjoint, ascending k
        const chips = [...lane.querySelectorAll('[data-lcs-chip]')];
        if (chips.length !== chipsN) fails.push(`${S}: ${chips.length} chips, want ${chipsN}`);
        const ksHere = [], acts = new Set(), tg = new Set();
        chips.forEach((c, ci) => {
          const k = +c.dataset.lcsOrdinal, target = +c.dataset.lcsTarget, act = c.dataset.lcsAction, txt = c.dataset.lcsNotation;
          if (!(k >= 1 && k <= n)) fails.push(`${S} chip ${ci + 1}: ordinal ${k} outside 1..${n}`);
          const want = start === 'left' ? k - 1 : n - k;
          if (target !== want) fails.push(`${S} chip ${ci + 1}: target ${target}, formula says ${want} (start ${start}, n ${n}, k ${k})`);
          if (!actions.includes(act)) fails.push(`${S} chip ${ci + 1}: action "${act}" not in the pool ${actions.join('/')}`);
          if (act === 'colour' && !bw) fails.push(`${S} chip ${ci + 1}: colour mark on colour art`);
          if (acts.has(act)) fails.push(`${S}: two chips ask the same mark "${act}"`); acts.add(act);
          if (tg.has(target)) fails.push(`${S}: two chips point at tile ${target}`); tg.add(target);
          if (!txt || !txt.includes(String(k))) fails.push(`${S} chip ${ci + 1}: notation "${txt}" does not carry ${k}`);
          const vis = (c.querySelector('[data-lcs-chip-text]') || {}).textContent || '';
          if (vis.trim() !== txt) fails.push(`${S} chip ${ci + 1}: prints "${vis.trim()}", stamped "${txt}"`);
          if (!c.querySelector('[data-lcs-mark]') || c.querySelector('[data-lcs-mark]').dataset.lcsMark !== act) fails.push(`${S} chip ${ci + 1}: icon != action`);
          if (c.closest('[data-lcs-idx]')) fails.push(`${S} chip ${ci + 1}: a chip inside a tile`);
          ksHere.push(k);
        });
        for (let i = 1; i < ksHere.length; i++) if (ksHere[i] <= ksHere[i - 1]) fails.push(`${S}: chips not ascending (${ksHere.join(',')})`);
        allKs.push(...ksHere);
        // no other text in the lane: the chips are the only text
        onlyText(lane, S, '[data-lcs-chip]');
      });
      // the page rule, re-derived from the stamps
      const count = {};
      for (const k of allKs) count[k] = (count[k] || 0) + 1;
      if (allKs.some((k) => k > kMax)) fails.push(`an ordinal above kMax ${kMax}: ${allKs.join(',')}`);
      if (distinct && Object.values(count).some((c) => c > 1)) fails.push(`page rule: ordinals repeat (${allKs.join(',')})`);
      if (maxRep && Object.values(count).some((c) => c > maxRep)) fails.push(`page rule: an ordinal appears more than ${maxRep}x (${allKs.join(',')})`);
      for (const k of must) if (!count[k]) fails.push(`page rule: ${k} is not asked`);
      if (anyOf.length && !anyOf.some((k) => count[k])) fails.push(`page rule: none of ${anyOf.join('/')} is asked`);
      checkStartMode(sides);
      return fails;
    });
  },
};
