/**
 * K-322 — Four Seasons Sort (nt20-C; family key `seasons`; K; science;
 * readiness — no CCSS code). Design: docs/worksheet-gen/b3-designs/
 * K-322-seasons.md §2/§5 under _BUILD-BRIEF.md + the README rulings.
 *
 * The SANDWICH: four season SIGNS in a row across the middle (white cards,
 * teal frame, a language-free SVG glyph over the season name), four marker
 * pictures above and four below, each with one coral dot on the edge facing
 * the signs; the child draws one pencil line per picture from its dot to its
 * sign. Nothing else is printed.
 *
 * THEMELESS (`themeAxis:{applicable:false}`): the pools ARE the theme —
 * cross-theme `(theme, noun)` refs resolved by `fileUri` (winter / spring /
 * summer / thanksgivinng / tree / vegetables / forest creatures). One instance
 * per (difficulty, locale); the fan lever is the seed. `unitAxis` NOT
 * applicable (a marker category is a pool filter, not a move).
 *
 * Boundary (load-bearing): K-322 owns SEASON MARKERS. K-207 (summer-vs-winter
 * CLOTHES) owns its 12 nouns — they never enter a neutral pool (the gate reads
 * data/science/summer-vs-winter-clothes.json at validate time; the page never
 * does). Answers are never printed: a tile carries its season only in
 * `data-lcs-season`, the bins print glyph + name and are empty; `verify(page)`
 * re-derives the whole composition from the stamps + geometry.
 *
 * Difficulty is a CONFIG; every guard keys on the resolved config, never on
 * the level index:
 *   perBin         markers per season (items = 4 × perBin; K ceiling [4, 8]
 *                  at d1/d2, d3 = 12 by design — the rows shrink to 84 px)
 *   rowLen         tiles per row (= 2 × perBin)
 *   tile / iconPx  tile box / picture size (≥ the K floor 56)
 *   cols           bin column per tile (tile centres = bin centres) or null
 *                  (d3: a centred row, no column alignment)
 *   maxAlignedPerRow  ≤ N tiles per row may sit over their OWN sign (null = off)
 *   allowWeak      d3 admits the `weak:true` markers (pale in mono)
 *   writeNames / binH  d3: the bin prints the glyph over an empty writing row
 *   namePx         the bin name size (Baloo 2 700; the K label floor is 18)
 * Refusal (throw, never a filler): a pool below `perBin` after veto /
 * override / weak-filter, an unknown season key, a cycle that is not a
 * rotation of the four keys, or no shuffle satisfying (a)-(d) in 400 tries.
 *
 * PHASE 2 (2026-09-14) — the ADDITIVE `layout` knob (design §3; the faces are
 * rows in tools/b3var-rows/seasons.js that set it in the difficulty config;
 * the base's three configs carry no `layout`, so the base path is
 * byte-identical — tools/b3-baseline.js is the proof). Stamped on the root as
 * data-lcs-layout ONLY when declared; every face root also stamps
 * data-lcs-cycle (the locale's cycle) so verify() re-derives order from it.
 *   'which'  F1 K-338 — INFER a season from `markers` pictures of ONE pool and
 *            ring it among `choices` glyph tiles printed in cycle order on
 *            every card; `distinctSeasons` = the cards are the 4 seasons in
 *            random order (d2). cards / rows / markers / choices / iconPx /
 *            choicePx / choiceTile. A pool below `markers` REFUSES.
 *   'wheel'  F2 K-339 — SEQUENCE the cycle: the wheel with `given` filled
 *            slot(s) (cycleStart at N; a second given at S) and a scrambled
 *            bank of the missing signs (never clockwise, never reversed);
 *            the child copies each sign into its empty slot in cycle order.
 *            given / tiles / givenIcon. Needs no pictures: no refusal anywhere.
 *   'odd'    F3 K-340 — EXCLUDE by season: `rows` lanes of `items` markers,
 *            items-1 of one pool + one intruder; cross the intruder out.
 *            The odd index is never constant over the page; the majorities
 *            at d2 are the four seasons. A majority pool below items-1 skips
 *            its row; below 4 rows the face REFUSES. rows / items / tile /
 *            iconPx / rowMin.
 *   'months' F4 G1-323 — MAP each month to its season with a colour code:
 *            seasonLegend (bank.legend codeColors + COLOR_WORDS) over a 3 x 4
 *            grid of monthTiles in CALENDAR order (data/b2/calendar.js
 *            NAMES[loc].monthNames, never scrambled — K-321 owns that); the
 *            season of each month = bank.monthSeason (pt-BR inverted). months
 *            / mode ('circle' | 'write') / tileW / tileH / tileMax / colGap /
 *            circle / namePx.
 *   'tree'   F5 K-341 — OPEN-ENDED: four cards in cycle order, glyph + name
 *            over a bare tree (or a drawing frame when bank.faces.tree.figure
 *            === 'frame' — the pt-BR re-target); verify() = structure only.
 *            figure / caption.
 */
'use strict';
const { bank: loadBank, bankModule } = require('../../lib/b3-common.js');
const { fileUri, sampleEntries } = require('../../lib/b2-common.js');
const C3 = require('../../templates/components-b3.js');
const { markerTile, seasonBin, seasonSortStage } = C3;
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const tokens = require('../../primitives/_tokens.js');
const { writingRow } = require('../../primitives/trace-path.js');

const BANK = 'seasons';
const KEYS = ['winter', 'spring', 'summer', 'autumn'];
const TRIES = 400;

function isRotation(seq, cycle) {
  if (seq.length !== cycle.length) return false;
  for (let s = 0; s < cycle.length; s++) {
    if (seq.every((v, i) => v === cycle[(i + s) % cycle.length])) return true;
  }
  return false;
}
/** (a) no contiguous window of 4 tiles reads as a rotation of the cycle. */
function hasCycleWindow(seasons, cycle) {
  for (let i = 0; i + cycle.length <= seasons.length; i++) {
    if (isRotation(seasons.slice(i, i + cycle.length), cycle)) return true;
  }
  return false;
}

module.exports = {
  id: 'K-322',
  slug: 'seasons',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'seasons',
  themeAxis: { applicable: false },
  difficulty: {
    1: { perBin: 1, rowLen: 2, tile: 124, iconPx: 100, cols: [1, 2], maxAlignedPerRow: 1, allowWeak: false, writeNames: false, binH: 160, namePx: 22, rowGap: 51 },
    2: { perBin: 2, rowLen: 4, tile: 112, iconPx: 88, cols: [0, 1, 2, 3], maxAlignedPerRow: 1, allowWeak: false, writeNames: false, binH: 160, namePx: 22, rowGap: 63 },
    3: { perBin: 3, rowLen: 6, tile: 84, iconPx: 64, cols: null, maxAlignedPerRow: null, allowWeak: true, writeNames: true, binH: 190, namePx: 22, rowGap: 20 },
  },
  i18n: {
    en: {
      title: 'Four Seasons Sort',
      instruction: 'Draw a line from the dot on each picture to the season box it belongs to.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const mod = bankModule(BANK);
    if (!mod.neutral) throw new Error('K-322: data/b3/seasons.js has no neutral block');
    return this._buildWith({ neutral: mod.neutral, block: loadBank(BANK, loc) }, { theme, difficulty, locale: loc }, ctx);
  },

  /** The effective pool of one season for a locale block (override > veto > weak filter). */
  _pool(neutral, block, season, allowWeak) {
    const ov = block.override && block.override[season];
    if (ov) {
      if (!Array.isArray(ov.items)) throw new Error(`K-322: override ${season} without items`);
      return ov.items.filter((it) => allowWeak || !it.weak);
    }
    const base = neutral.pools && neutral.pools[season];
    if (!Array.isArray(base)) throw new Error(`K-322: neutral pool "${season}" is absent`);
    const veto = new Set((block.veto || []).map((v) => v.theme + '/' + v.noun));
    return base.filter((it) => !veto.has(it.theme + '/' + it.noun)).filter((it) => allowWeak || !it.weak);
  },

  /** The whole build over an INJECTED bank {neutral, block} (the gate's poison seam). */
  _buildWith(bank, { difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-322: no difficulty ' + difficulty);
    if (d.layout) return this._buildFace(bank, d, (locale || 'en').slice(0, 2), ctx);   // Phase 2 faces; the base path below is untouched
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const { neutral, block } = bank;
    const keys = neutral.keys || KEYS;
    if (keys.length !== 4 || keys.some((k) => !KEYS.includes(k))) throw new Error('K-322: neutral.keys must be the four season keys');
    const cycle = block.cycle;
    if (!Array.isArray(cycle) || !isRotation(cycle, KEYS)) throw new Error(`K-322: ${loc} cycle ${JSON.stringify(cycle)} is not a rotation of ${KEYS.join(',')}`);
    if (d.perBin < 1) throw new Error('K-322: perBin < 1');
    if (d.rowLen !== 2 * d.perBin) throw new Error(`K-322: rowLen ${d.rowLen} ≠ 2 × perBin ${d.perBin}`);
    if (d.iconPx < 56) throw new Error(`K-322: iconPx ${d.iconPx} < the K floor 56`);
    if (d.cols && d.cols.length !== d.rowLen) throw new Error('K-322: cols must name one bin column per tile');
    for (const k of KEYS) if (!block.names || !block.names[k]) throw new Error(`K-322: ${loc} has no name for ${k}`);

    // one pool per season; sample-or-throw (a pool below perBin is a refusal)
    const items = [];
    for (const season of KEYS) {
      const pool = this._pool(neutral, block, season, d.allowWeak);
      const picked = sampleEntries(rng, pool, d.perBin, `K-322 ${loc} ${season}`);
      for (const it of picked) items.push({ theme: it.theme, noun: it.noun, season });
    }
    const nouns = new Set(items.map((it) => it.noun));
    if (nouns.size !== items.length) throw new Error('K-322: a noun appears twice on the page');

    // (a) neither row a cycle rotation, (b) no row single-season,
    // (c) <= maxAlignedPerRow tiles per row over their own sign, (d) no noun twice
    const aligned = (row) => d.cols ? row.filter((it, i) => cycle[d.cols[i]] === it.season).length : 0;
    let top = null, bottom = null;
    for (let t = 0; t < TRIES; t++) {
      const order = rng.shuffle(items);
      const a = order.slice(0, d.rowLen), b = order.slice(d.rowLen);
      const okRow = (row) => new Set(row.map((it) => it.season)).size >= 2 &&
        !hasCycleWindow(row.map((it) => it.season), cycle) &&
        (d.maxAlignedPerRow == null || aligned(row) <= d.maxAlignedPerRow);
      if (okRow(a) && okRow(b)) { top = a; bottom = b; break; }
    }
    if (!top) throw new Error(`K-322 ${loc}: no row order satisfies (a)-(d) in ${TRIES} tries (refuse)`);

    const tileOf = (it, dot) => markerTile({ theme: it.theme, noun: it.noun, src: fileUri(it.theme, it.noun), season: it.season, px: d.iconPx, tile: d.tile, dot });
    const bins = cycle.map((k) => seasonBin({ key: k, name: block.names[k], h: d.binH, namePx: d.namePx || 22, writeLane: !!d.writeNames }));
    const stage = seasonSortStage({
      top: top.map((it) => tileOf(it, 'bottom')),
      bins,
      bottom: bottom.map((it) => tileOf(it, 'top')),
      tile: d.tile, rowGap: d.rowGap, cols: d.cols,
    });
    const bodyHtml = stage.replace('data-lcs-seasons ',
      `data-lcs-seasons data-lcs-per-bin="${d.perBin}" data-lcs-max-aligned="${d.maxAlignedPerRow == null ? 'off' : d.maxAlignedPerRow}" data-lcs-icon-px="${d.iconPx}" `);
    return {
      bodyHtml,
      meta: { perBin: d.perBin, cycle, top: top.map((it) => it.theme + '/' + it.noun), bottom: bottom.map((it) => it.theme + '/' + it.noun), seasons: { top: top.map((it) => it.season), bottom: bottom.map((it) => it.season) } },
    };
  },

  /* ------------------------------------------------------------ Phase 2 faces */
  /** Common face guards: the four keys, the locale cycle, the names. Returns {cycle, names}. */
  _faceCommon(bank, loc) {
    const { neutral, block } = bank;
    const keys = neutral.keys || KEYS;
    if (keys.length !== 4 || keys.some((k) => !KEYS.includes(k))) throw new Error('K-322: neutral.keys must be the four season keys');
    const cycle = block.cycle;
    if (!Array.isArray(cycle) || !isRotation(cycle, KEYS)) throw new Error(`K-322: ${loc} cycle ${JSON.stringify(cycle)} is not a rotation of ${KEYS.join(',')}`);
    for (const k of KEYS) if (!block.names || !block.names[k]) throw new Error(`K-322: ${loc} has no name for ${k}`);
    return { cycle, names: block.names };
  },

  _buildFace(bank, d, loc, ctx) {
    switch (d.layout) {
      case 'which': return this._buildWhich(bank, d, loc, ctx);
      case 'wheel': return this._buildWheel(bank, d, loc, ctx);
      case 'odd': return this._buildOdd(bank, d, loc, ctx);
      case 'months': return this._buildMonths(bank, d, loc, ctx);
      case 'tree': return this._buildTree(bank, d, loc, ctx);
      default: throw new Error(`K-322: unknown layout "${d.layout}"`);
    }
  },

  _faceRoot(layout, cycle, stamps, inner, style) {
    const extra = Object.entries(stamps).map(([k, v]) => ` data-lcs-${k}="${v}"`).join('');
    return `<div data-ws-content data-lcs-seasons data-lcs-layout="${layout}" data-lcs-cycle="${cycle.join(',')}"${extra} style="${style || 'display:flex;flex-direction:column;flex:1 1 auto;min-height:0'}">${inner}</div>`;
  },

  /** F1 — Which Season Is It? */
  _buildWhich(bank, d, loc, ctx) {
    const rng = ctx.rng;
    const { neutral, block } = bank;
    const { cycle } = this._faceCommon(bank, loc);
    const cards = d.cards, markers = d.markers, choices = d.choices;
    if (!(cards >= 2 && cards <= 6)) throw new Error(`K-322 which: cards ${cards} outside 2..6`);
    if (!(markers >= 2 && markers <= 3)) throw new Error(`K-322 which: markers ${markers} outside 2..3 (three 88 px pictures fill the 294 px stage)`);
    if (!(choices >= 2 && choices <= 4)) throw new Error(`K-322 which: choices ${choices} outside 2..4`);
    if (d.iconPx < 56) throw new Error(`K-322 which: iconPx ${d.iconPx} < the K floor 56`);
    if ((d.choicePx || 56) < 56) throw new Error(`K-322 which: choicePx ${d.choicePx} < the K floor 56`);
    const rows = d.rows || Math.ceil(cards / 2);
    // the choice strip = `choices` keys in cycle order (all four at d2; the first `choices` of the cycle below)
    const strip = cycle.slice(0, choices);
    // answers: the strip's seasons in random order; distinctSeasons → a permutation (cards <= strip length);
    // more cards than seasons repeat seasons only after every season has a card
    let answers = [];
    while (answers.length < cards) answers = answers.concat(rng.shuffle(strip));
    answers = answers.slice(0, cards);
    if (d.distinctSeasons && cards > strip.length) throw new Error(`K-322 which: distinctSeasons with ${cards} cards > ${strip.length} seasons`);
    // pools (weak removed unless allowWeak); every season on the page needs >= markers unused nouns
    const used = new Set();
    const cardsData = answers.map((season, i) => {
      const pool = this._pool(neutral, block, season, !!d.allowWeak).filter((it) => !used.has(it.noun));
      if (pool.length < markers) throw new Error(`K-322 which ${loc}: ${season} pool has ${pool.length} unused markers < ${markers} (refuse)`);
      const picked = rng.sample(pool, markers);
      picked.forEach((it) => used.add(it.noun));
      return { season, markers: picked.map((it) => ({ theme: it.theme, noun: it.noun, season, src: fileUri(it.theme, it.noun) })) };
    });
    const cardsHtml = cardsData.map((c, i) => C3.seasonWhichCard({
      cardIndex: i + 1, answer: c.season, markers: c.markers, keys: strip,
      px: d.iconPx, gap: d.markerGap || 12, choicePx: d.choicePx || 56, choiceTile: d.choiceTile || 68, choiceGap: d.choiceGap || 6,
    }));
    const inner = cardGrid({ cards: cardsHtml, cols: 2, rows });
    const bodyHtml = this._faceRoot('which', cycle, { cards, markers, choices, distinct: d.distinctSeasons ? 1 : 0, 'icon-px': d.iconPx, 'choice-px': d.choicePx || 56 }, inner);
    return { bodyHtml, meta: { answers, cards: cardsData.map((c) => c.markers.map((m) => m.theme + '/' + m.noun)) } };
  },

  /** F2 — Season Wheel: Seasons in Order. */
  _buildWheel(bank, d, loc, ctx) {
    const rng = ctx.rng;
    const { cycle, names } = this._faceCommon(bank, loc);
    const given = d.given, tiles = d.tiles;
    if (!(given >= 1 && given <= 2)) throw new Error(`K-322 wheel: given ${given} outside 1..2`);
    if (given + tiles !== 4) throw new Error(`K-322 wheel: given ${given} + tiles ${tiles} ≠ 4`);
    // clockwise from N = the cycle (cycleStart at N); a second given sits at S
    const givenIdx = given === 2 ? [0, 2] : [0];
    const slots = cycle.map((k, i) => ({ key: k, name: names[k], given: givenIdx.includes(i), icon: d.givenIcon !== false }));
    const missing = cycle.filter((k, i) => !givenIdx.includes(i));
    const clockwise = missing.join(',');
    const reversed = missing.slice().reverse().join(',');
    let order = null;
    for (let t = 0; t < TRIES; t++) {
      const o = rng.shuffle(missing);
      if (missing.length < 3 || (o.join(',') !== clockwise && o.join(',') !== reversed)) { order = o; break; }
    }
    if (!order) throw new Error('K-322 wheel: no scrambled bank order found');
    const wheel = C3.seasonWheel({ d: d.wheelD || 440, slots, slotPx: d.slotPx || 110, iconPx: d.slotIconPx || 40, namePx: d.slotNamePx || 18 });
    const bankHtml = C3.modelBank({ keys: order, names, px: d.modelPx || 56, tile: d.modelTile || 100, gap: 24, h: d.modelH || 96, namePx: d.modelNamePx || 16 });
    const inner = `<div style="display:flex;flex-direction:column;align-items:center;gap:24px;flex:0 0 auto">${wheel}${bankHtml}</div>`;
    const bodyHtml = this._faceRoot('wheel', cycle, { given, tiles }, inner, 'display:flex;flex-direction:column;justify-content:center;flex:1 1 auto;min-height:0');
    return { bodyHtml, meta: { cycle, given: givenIdx.map((i) => cycle[i]), bank: order } };
  },

  /** F3 — Seasons: What Does Not Belong? */
  _buildOdd(bank, d, loc, ctx) {
    const rng = ctx.rng;
    const { neutral, block } = bank;
    const { cycle } = this._faceCommon(bank, loc);
    const rows = d.rows, items = d.items;
    if (!(rows >= 4 && rows <= 6)) throw new Error(`K-322 odd: rows ${rows} outside 4..6`);
    if (!(items >= 3 && items <= 5)) throw new Error(`K-322 odd: items ${items} outside 3..5`);
    if (d.iconPx < 56) throw new Error(`K-322 odd: iconPx ${d.iconPx} < the K floor 56`);
    const need = items - 1;
    // majorities: the four seasons shuffled (d2 = one each), then more from the shuffle again
    let wanted = [];
    while (wanted.length < rows) wanted = wanted.concat(rng.shuffle(cycle));
    wanted = wanted.slice(0, rows);
    const used = new Set();
    const poolOf = (k) => this._pool(neutral, block, k, !!d.allowWeak).filter((it) => !used.has(it.noun));
    const rowsData = [];
    for (const maj of wanted) {
      const pool = poolOf(maj);
      if (pool.length < need) continue;                       // the row is skipped, never padded
      const others = cycle.filter((k) => k !== maj && poolOf(k).length >= 1);
      if (!others.length) continue;
      const intruderSeason = rng.pick(others);
      const majPick = rng.sample(pool, need);
      const intruder = rng.pick(poolOf(intruderSeason));
      [...majPick, intruder].forEach((it) => used.add(it.noun));
      rowsData.push({ majority: maj, majPick, intruder: { ...intruder, season: intruderSeason } });
    }
    if (rowsData.length < 4) throw new Error(`K-322 odd ${loc}: only ${rowsData.length} rows can be filled (< 4: refuse)`);
    // the odd index: never constant over the page
    let odd = null;
    for (let t = 0; t < TRIES; t++) {
      const o = rowsData.map(() => rng.int(0, items - 1));
      if (new Set(o).size >= 2) { odd = o; break; }
    }
    if (!odd) throw new Error('K-322 odd: could not vary the odd index');
    const lanes = rowsData.map((r, i) => {
      const seq = r.majPick.map((it) => ({ theme: it.theme, noun: it.noun, season: r.majority }));
      seq.splice(odd[i], 0, { theme: r.intruder.theme, noun: r.intruder.noun, season: r.intruder.season });
      return C3.oddRow({ index: i, items: seq.map((it) => ({ ...it, src: fileUri(it.theme, it.noun) })), px: d.iconPx, tile: d.tile, gap: d.oddGap || 24, odd: odd[i], majority: r.majority });
    });
    const style = `display:grid;grid-template-rows:repeat(${rowsData.length}, minmax(${d.rowMin || 140}px,1fr));gap:10px;flex:1 1 auto;min-height:0`;
    const bodyHtml = this._faceRoot('odd', cycle, { rows: rowsData.length, items, 'icon-px': d.iconPx }, lanes.join(''), style);
    return { bodyHtml, meta: { majorities: rowsData.map((r) => r.majority), odd, intruders: rowsData.map((r) => r.intruder.theme + '/' + r.intruder.noun) } };
  },

  /** F4 — Months and Seasons: Colour the Season (G1). */
  _buildMonths(bank, d, loc, ctx) {
    const { block } = bank;
    const { cycle, names } = this._faceCommon(bank, loc);
    const { NAMES } = require('../../data/b2/calendar.js');
    const { COLOR_WORDS } = require('../../data/color-words.js');
    const cal = NAMES[loc];
    if (!cal || !Array.isArray(cal.monthNames) || cal.monthNames.length !== 12) throw new Error(`K-322 months: no 12 month names for ${loc} (refuse)`);
    const words = COLOR_WORDS[loc];
    if (!words) throw new Error(`K-322 months: no colour words for ${loc} (refuse)`);
    const ms = block.monthSeason;
    if (!Array.isArray(ms) || ms.length !== 12 || ms.some((k) => !KEYS.includes(k))) throw new Error(`K-322 months: ${loc} monthSeason is not 12 season keys`);
    const legend = block.legend || {};
    const WORD_OF = { codeRed: 'red', codeBlue: 'blue', codeYellow: 'yellow', codeGreen: 'green', codeOrange: 'orange', codePurple: 'purple', codeBrown: 'brown', codePink: 'pink' };
    const entries = cycle.map((k) => {
      const cn = legend[k];
      const hex = tokens.codeColors[cn];
      if (!hex || !WORD_OF[cn]) throw new Error(`K-322 months: ${loc} legend ${k} = "${cn}" is not a codeColors name`);
      const colorWord = words[WORD_OF[cn]];
      if (!colorWord) throw new Error(`K-322 months: ${loc} has no colour word for ${WORD_OF[cn]}`);
      return { key: k, name: names[k], color: hex, colorName: cn, colorWord };
    });
    if (new Set(entries.map((e) => e.colorName)).size !== 4) throw new Error(`K-322 months: ${loc} legend colours are not distinct`);
    const months = d.months || 12;
    const idx = months === 12 ? [...Array(12).keys()] : months === 4 ? [0, 3, 6, 9] : null;
    if (!idx) throw new Error(`K-322 months: months ${months} must be 12 or 4`);
    const mode = d.mode || 'circle';
    if (!['circle', 'write'].includes(mode)) throw new Error(`K-322 months: mode "${mode}"`);
    const tileW = d.tileW || 210, tileH = d.tileH || 88, circle = d.circle || 44;
    if (circle < 44) throw new Error(`K-322 months: circle ${circle} < the G1 floor 44`);
    const cols = months === 12 ? 3 : 2;
    const tilesHtml = idx.map((i) => C3.monthTile({ index: i, name: cal.monthNames[i], season: ms[i], w: tileW, h: tileH, circle, namePx: d.namePx || 22, mode }));
    // rows grow from the design's 88 up to tileMax (128) as the chrome allows; the leftover stays below the grid
    const grid = `<div class="ws-month-grid" data-lcs-months-grid style="display:grid;grid-template-columns:repeat(${cols}, ${tileW}px);grid-template-rows:repeat(${idx.length / cols}, minmax(${tileH}px, ${d.tileMax || 128}px));gap:12px ${d.colGap == null ? 22 : d.colGap}px;justify-content:center;flex:1 1 auto;min-height:0;align-content:start">${tilesHtml.join('')}</div>`;
    const inner = C3.seasonLegend({ entries, iconPx: d.legendIconPx || 32, namePx: d.legendNamePx || 18, wordPx: d.legendWordPx || 17 }) + `<div style="height:14px;flex:0 0 auto"></div>` + grid;
    const bodyHtml = this._faceRoot('months', cycle, { months, mode, circle }, inner, 'display:flex;flex-direction:column;justify-content:flex-start;flex:1 1 auto;min-height:0');
    return { bodyHtml, meta: { months: idx, seasons: idx.map((i) => ms[i]), legend: entries.map((e) => e.key + ':' + e.colorName + ':' + e.colorWord) } };
  },

  /** F5 — Draw the Tree in Four Seasons (open-ended). */
  _buildTree(bank, d, loc, ctx) {
    const { block } = bank;
    const { cycle, names } = this._faceCommon(bank, loc);
    const panel = block.faces && block.faces.tree;
    const figure = (panel && panel.figure) || d.figure || 'tree';           // the panel's ruling (pt-BR 'frame') beats the row's default
    if (!['tree', 'frame'].includes(figure)) throw new Error(`K-322 tree: figure "${figure}"`);
    const w = d.figureW || 260, h = d.caption ? (d.figureHCaption || 200) : (d.figureH || 250);
    const captions = d.caption ? (panel && panel.captions) : null;
    if (d.caption && !(captions && KEYS.every((k) => typeof captions[k] === 'string' && captions[k].trim()))) throw new Error(`K-322 tree: ${loc} caption:true needs faces.tree.captions x4 (refuse)`);
    const cards = cycle.map((k) => {
      const fig = figure === 'tree' ? C3.seasonBareTree({ w, h })
        : `<span data-lcs-open="frame" style="display:block;width:${w}px;height:${h}px">${C3.drawBox({ w, h })}</span>`;
      const cap = d.caption ? `<div class="ws-season-caption" style="width:${w}px;flex:0 0 auto">${writingRow({ w, h: 52, glyphH: 40, xHeight: true }).svg}</div>` : '';
      return C3.seasonTreeCard({ key: k, name: names[k], iconPx: d.treeIconPx || 36, namePx: d.treeNamePx || 20, figureHtml: fig + cap });
    });
    const inner = cardGrid({ cards, cols: 2, rows: 2 });
    const bodyHtml = this._faceRoot('tree', cycle, { figure, caption: d.caption ? 1 : 0 }, inner);
    return { bodyHtml, meta: { cycle, figure } };
  },

  /** verify() for the five faces — re-derives everything from the stamps + geometry. */
  async _verifyFace(page) {
    return page.evaluate(() => {
      const fails = [];
      const KEYS = ['winter', 'spring', 'summer', 'autumn'];
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-ws-content][data-lcs-seasons]');
      if (!root) return ['no seasons root'];
      const layout = root.dataset.lcsLayout;
      const cycle = (root.dataset.lcsCycle || '').split(',');
      const isRot = (seq, of) => seq.length === 4 && [0, 1, 2, 3].some((s) => seq.every((v, i) => v === of[(i + s) % 4]));
      if (!isRot(cycle, KEYS)) fails.push(`cycle stamp ${cycle.join(',')} is not a rotation of ${KEYS.join(',')}`);
      const pic = (im, what, minPx) => {
        if (!im) { fails.push(`${what}: no picture`); return null; }
        if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`${what}: alt names the picture`);
        const parts = decodeURIComponent(im.src).split('/');
        const dir = parts[parts.length - 2] || '';
        if (BW.test(dir)) fails.push(`${what}: picture from a B&W directory "${dir}"`);
        const file = parts[parts.length - 1].replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < minPx - 0.6) fails.push(`${what}: icon ${Math.round(Math.min(r.width, r.height))} px < ${minPx}`);
        return { dir, file };
      };
      const item = (el, what, minPx, nouns) => {
        const s = el.dataset.lcsSeason;
        if (!KEYS.includes(s)) fails.push(`${what}: season "${s}"`);
        const noun = (el.dataset.lcsItem || '').split('/').pop();
        if (nouns.has(noun)) fails.push(`${what}: noun "${noun}" appears twice on the page`);
        nouns.add(noun);
        const imgs = el.querySelectorAll('img');
        if (imgs.length !== 1) { fails.push(`${what}: ${imgs.length} pictures`); return s; }
        const p = pic(imgs[0], what, minPx);
        if (p && p.file !== noun) fails.push(`${what}: picture "${p.file}" ≠ stamped noun "${noun}"`);
        if (el.textContent.trim()) fails.push(`${what}: prints text`);
        return s;
      };
      const glyphOf = (el, what) => {
        const g = el.querySelector('[data-lcs-icon]');
        if (!g) { fails.push(`${what}: no glyph`); return null; }
        return g.dataset.lcsIcon;
      };
      const inside = (r, box, what) => { if (r.left < box.left - 0.6 || r.right > box.right + 0.6 || r.top < box.top - 0.6 || r.bottom > box.bottom + 0.6) fails.push(`${what}: outside its container`); };

      /* ---------------- F1 which ---------------- */
      if (layout === 'which') {
        const cards = [...root.querySelectorAll('[data-lcs-which]')];
        const n = cards.length, markers = +root.dataset.lcsMarkers, choices = +root.dataset.lcsChoices, distinct = root.dataset.lcsDistinct === '1';
        const minPx = Math.max(56, +root.dataset.lcsIconPx || 0), minChoice = Math.max(56, +root.dataset.lcsChoicePx || 0);
        if (+root.dataset.lcsCards !== n) fails.push(`cards stamp ${root.dataset.lcsCards} ≠ ${n}`);
        if (n < 2 || n > 6) fails.push(`${n} cards outside 2..6`);
        const strip = cycle.slice(0, choices);
        const nouns = new Set(), answers = [], positions = new Set();
        cards.forEach((c, i) => {
          const what = `card ${i + 1}`;
          const ans = c.dataset.lcsAnswer;
          if (!KEYS.includes(ans)) fails.push(`${what}: answer "${ans}"`);
          answers.push(ans);
          const ms = [...c.querySelectorAll('[data-lcs-item]')];
          if (ms.length !== markers) fails.push(`${what}: ${ms.length} markers ≠ ${markers}`);
          const seasons = ms.map((m, k) => item(m, `${what} marker ${k + 1}`, minPx, nouns));
          if (seasons.some((s) => s !== ans)) fails.push(`${what}: markers from two pools (${seasons.join(',')}) — the answer "${ans}" is not the one season they share`);
          const tiles = [...c.querySelectorAll('[data-lcs-choice]')];
          const keys = tiles.map((t) => t.dataset.lcsChoice);
          if (keys.join(',') !== strip.join(',')) fails.push(`${what}: choice tiles ${keys.join(',')} are not the cycle order ${strip.join(',')}`);
          tiles.forEach((t, k) => {
            const g = glyphOf(t, `${what} tile ${k + 1}`);
            if (g && g !== t.dataset.lcsChoice) fails.push(`${what} tile ${k + 1}: glyph ${g} ≠ ${t.dataset.lcsChoice}`);
            const r = t.getBoundingClientRect();
            if (Math.min(r.width, r.height) < minChoice - 0.6) fails.push(`${what} tile ${k + 1}: ${Math.round(Math.min(r.width, r.height))} px < ${minChoice}`);
            if (t.textContent.trim()) fails.push(`${what} tile ${k + 1}: prints text`);
          });
          if (!keys.includes(ans)) fails.push(`${what}: the answer "${ans}" is not on the strip`);
          positions.add(keys.indexOf(ans));
          // no text on the stage (the badge is outside it)
          const stage = c.closest('.ws-card-stage') || c;
          if (stage.textContent.trim()) fails.push(`${what}: prints text on the stage`);
          const cr = c.closest('.ws-card').getBoundingClientRect();
          inside(c.getBoundingClientRect(), cr, what);
        });
        if (distinct && new Set(answers).size !== answers.length) fails.push(`answers ${answers.join(',')} repeat a season (distinctSeasons)`);
        if (n >= 3 && positions.size < 2) fails.push(`the answer sits at position ${[...positions].join()} on every card`);
        return fails;
      }

      /* ---------------- F2 wheel ---------------- */
      if (layout === 'wheel') {
        const slots = [...root.querySelectorAll('[data-lcs-slot]')];
        const keys = slots.map((s) => s.dataset.lcsSlot);
        const given = +root.dataset.lcsGiven;
        if (keys.join(',') !== cycle.join(',')) fails.push(`slots clockwise ${keys.join(',')} ≠ the cycle ${cycle.join(',')}`);
        const wheel = root.querySelector('[data-lcs-wheel]');
        if (!wheel) fails.push('no wheel');
        else {
          // geometry: slot i sits at N / E / S / W of the wheel box
          const wr = wheel.getBoundingClientRect();
          const cx = (wr.left + wr.right) / 2, cy = (wr.top + wr.bottom) / 2;
          slots.forEach((s, i) => {
            const r = s.getBoundingClientRect();
            const sx = (r.left + r.right) / 2, sy = (r.top + r.bottom) / 2;
            const dir = [[0, -1], [1, 0], [0, 1], [-1, 0]][i];
            const dx = sx - cx, dy = sy - cy;
            const d = Math.hypot(dx, dy);
            if (d < 100 || Math.abs(dx / d - dir[0]) > 0.05 || Math.abs(dy / d - dir[1]) > 0.05) fails.push(`slot ${i + 1} (${s.dataset.lcsSlot}) is not at ${'NESW'[i]} of the wheel`);
            if (Math.min(r.width, r.height) < 100) fails.push(`slot ${i + 1}: ${Math.round(r.width)} px < 100`);
          });
        }
        const filled = slots.filter((s) => s.dataset.lcsGiven === '1');
        if (filled.length !== given) fails.push(`${filled.length} filled slots ≠ given ${given}`);
        if (!filled.length || filled[0] !== slots[0]) fails.push('the first given slot is not at N');
        slots.forEach((s, i) => {
          const what = `slot ${i + 1} (${s.dataset.lcsSlot})`;
          if (s.dataset.lcsGiven === '1') {
            const g = glyphOf(s, what);
            const name = s.querySelector('.ws-season-slot-name');
            if (!g && !name) fails.push(`${what}: given slot prints neither glyph nor name`);
            if (g && g !== s.dataset.lcsSlot) fails.push(`${what}: glyph ${g} ≠ ${s.dataset.lcsSlot}`);
            // the printed content stays inside the slot's circle (radius − stroke)
            const r = s.getBoundingClientRect(); const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2, rad = r.width / 2 - 3;
            for (const el of [g ? s.querySelector('[data-lcs-icon]') : null, name].filter(Boolean)) {
              const b = el.getBoundingClientRect();
              for (const [x, y] of [[b.left, b.top], [b.right, b.top], [b.left, b.bottom], [b.right, b.bottom]]) {
                if (Math.hypot(x - cx, y - cy) > rad + 0.6) { fails.push(`${what}: "${el.textContent.trim() || 'glyph'}" reaches outside the slot circle`); break; }
              }
            }
          } else {
            if (s.children.length || s.textContent.trim()) fails.push(`${what}: an empty slot prints something`);
          }
        });
        const bank = [...root.querySelectorAll('[data-lcs-model]')];
        const bk = bank.map((b) => b.dataset.lcsModel);
        const missing = keys.filter((k, i) => slots[i].dataset.lcsGiven !== '1');
        if (bk.slice().sort().join(',') !== missing.slice().sort().join(',')) fails.push(`bank ${bk.join(',')} ≠ the missing signs ${missing.join(',')}`);
        if (bk.length >= 3 && bk.join(',') === missing.join(',')) fails.push(`bank ${bk.join(',')} is the clockwise order`);
        if (bk.length >= 3 && bk.join(',') === missing.slice().reverse().join(',')) fails.push(`bank ${bk.join(',')} is the reversed order`);
        bank.forEach((b, i) => {
          const what = `bank tile ${i + 1} (${b.dataset.lcsModel})`;
          const g = glyphOf(b, what);
          if (g && g !== b.dataset.lcsModel) fails.push(`${what}: glyph ${g} ≠ ${b.dataset.lcsModel}`);
          const gi = b.querySelector('[data-lcs-icon]'); if (gi && Math.min(gi.getBoundingClientRect().width, gi.getBoundingClientRect().height) < 56 - 0.6) fails.push(`${what}: glyph < 56`);
          const name = b.querySelector('.ws-season-model-name');
          if (!name || !name.textContent.trim()) fails.push(`${what}: no name`);
          else if (name.scrollWidth > b.clientWidth - 4 + 0.6) fails.push(`${what}: name "${name.textContent.trim()}" (${Math.round(name.scrollWidth)} px) wider than the tile`);
        });
        const names = [...filled.map((s) => s.querySelector('.ws-season-slot-name')), ...bank.map((b) => b.querySelector('.ws-season-model-name'))].filter(Boolean).map((e) => e.textContent.trim().toLocaleLowerCase());
        if (new Set(names).size !== names.length) fails.push('two signs print the same name');
        return fails;
      }

      /* ---------------- F3 odd ---------------- */
      if (layout === 'odd') {
        const rows = [...root.querySelectorAll('[data-lcs-odd-row]')];
        const items = +root.dataset.lcsItems, minPx = Math.max(56, +root.dataset.lcsIconPx || 0);
        if (+root.dataset.lcsRows !== rows.length) fails.push(`rows stamp ${root.dataset.lcsRows} ≠ ${rows.length}`);
        if (rows.length < 4 || rows.length > 6) fails.push(`${rows.length} rows outside 4..6`);
        const nouns = new Set(), odds = new Set(), majorities = [];
        rows.forEach((r, i) => {
          const what = `row ${i + 1}`;
          const els = [...r.querySelectorAll('[data-lcs-item]')];
          if (els.length !== items) fails.push(`${what}: ${els.length} items ≠ ${items}`);
          const seasons = els.map((e, k) => item(e, `${what} item ${k + 1}`, minPx, nouns));
          const count = {}; seasons.forEach((s) => { count[s] = (count[s] || 0) + 1; });
          const maj = r.dataset.lcsMajority, odd = +r.dataset.lcsOdd;
          if (!KEYS.includes(maj)) fails.push(`${what}: majority "${maj}"`);
          majorities.push(maj);
          const intruders = seasons.map((s, k) => (s !== maj ? k : -1)).filter((k) => k >= 0);
          if (intruders.length !== 1) fails.push(`${what}: ${intruders.length} intruders (${seasons.join(',')}) — want exactly one item outside the ${maj} pool`);
          else if (intruders[0] !== odd) fails.push(`${what}: odd stamp ${odd} points at a ${seasons[odd]} item, the intruder is at ${intruders[0]}`);
          odds.add(odd);
          const lr = r.getBoundingClientRect();
          els.forEach((e, k) => inside(e.getBoundingClientRect(), lr, `${what} item ${k + 1}`));
          if (r.querySelectorAll('.ws-season-dot').length) fails.push(`${what}: prints a dot (no lines on this face)`);
        });
        if (rows.length >= 2 && odds.size < 2) fails.push(`the intruder sits at position ${[...odds].join()} in every row`);
        if (rows.length === 4 && new Set(majorities).size !== 4) fails.push(`majorities ${majorities.join(',')} are not the four seasons`);
        return fails;
      }

      /* ---------------- F4 months ---------------- */
      if (layout === 'months') {
        const tiles = [...root.querySelectorAll('[data-lcs-month]')];
        const months = +root.dataset.lcsMonths, mode = root.dataset.lcsMode, circleMin = Math.max(44, +root.dataset.lcsCircle || 0);
        if (tiles.length !== months) fails.push(`${tiles.length} tiles ≠ months ${months}`);
        const legend = [...root.querySelectorAll('[data-lcs-legend]')];
        const lkeys = legend.map((l) => l.dataset.lcsLegend);
        if (lkeys.join(',') !== cycle.join(',')) fails.push(`legend ${lkeys.join(',')} ≠ the cycle ${cycle.join(',')}`);
        const colors = legend.map((l) => l.dataset.lcsColor);
        if (new Set(colors).size !== legend.length) fails.push(`legend colours ${colors.join(',')} are not distinct`);
        const lnames = [];
        legend.forEach((l, i) => {
          const what = `legend ${i + 1} (${l.dataset.lcsLegend})`;
          const g = glyphOf(l, what);
          if (g && g !== l.dataset.lcsLegend) fails.push(`${what}: glyph ${g} ≠ ${l.dataset.lcsLegend}`);
          const name = l.querySelector('.ws-season-legend-name');
          if (!name || !name.textContent.trim()) fails.push(`${what}: no season name`); else lnames.push(name.textContent.trim().toLocaleLowerCase());
          const sw = l.querySelector('[data-lcs-swatch]');
          if (!sw) fails.push(`${what}: no swatch`);
          else { const r = sw.getBoundingClientRect(); if (Math.min(r.width, r.height) < 20) fails.push(`${what}: swatch ${Math.round(r.width)} px < 20`); }
          const w = l.querySelector('[data-lcs-colorword]');
          if (!w || !w.textContent.trim()) fails.push(`${what}: no colour word (the B&W signal)`);
        });
        if (new Set(lnames).size !== lnames.length) fails.push('two legend entries print the same season name');
        let prev = -1; const count = {}; const seq = [];
        const grid = root.querySelector('[data-lcs-months-grid]');
        tiles.forEach((t, i) => {
          const what = `tile ${i + 1}`;
          const m = +t.dataset.lcsMonth, s = t.dataset.lcsSeason;
          if (!(m >= 0 && m <= 11)) fails.push(`${what}: month ${m}`);
          if (m <= prev) fails.push(`${what}: month ${m} after ${prev} — not calendar order`);
          if (months === 12 && m !== i) fails.push(`${what}: month ${m} ≠ position ${i} (a month is missing or scrambled)`);
          prev = m;
          if (!cycle.includes(s)) fails.push(`${what}: season "${s}"`);
          count[s] = (count[s] || 0) + 1; seq.push(s);
          const name = t.querySelector('.ws-month-name');
          if (!name || !name.textContent.trim()) fails.push(`${what}: no month name`);
          if (t.textContent.trim() !== (name ? name.textContent.trim() : '')) fails.push(`${what}: prints more than the month name`);
          const ans = t.querySelector(mode === 'write' ? '[data-lcs-write]' : '[data-lcs-circle]');
          if (!ans) fails.push(`${what}: no ${mode === 'write' ? 'writing box' : 'circle'}`);
          else {
            const ar = ans.getBoundingClientRect(), tr = t.getBoundingClientRect();
            if (mode !== 'write' && Math.min(ar.width, ar.height) < circleMin - 0.6) fails.push(`${what}: circle ${Math.round(ar.width)} px < ${circleMin}`);
            if (ans.children.length || ans.textContent.trim()) fails.push(`${what}: the answer spot is not empty`);
            // the spot must sit inside the tile's CONTENT box (an overflowing name pushes it into the padding first)
            const padR = parseFloat(getComputedStyle(t).paddingRight) || 0;
            inside(ar, { left: tr.left, right: tr.right - padR, top: tr.top, bottom: tr.bottom }, `${what} answer spot`);
            if (name) {
              const nr = name.getBoundingClientRect();
              if (nr.right > ar.left - 8 + 0.6) fails.push(`${what}: month "${name.textContent.trim()}" (${Math.round(nr.width)} px) runs into the answer spot — the tile is too narrow`);
              inside(nr, tr, `${what} name`);
            }
          }
          if (t.querySelector('img') || t.querySelector('[data-lcs-icon]')) fails.push(`${what}: prints a picture or a glyph (the answer)`);
        });
        if (months === 12) {
          for (const k of cycle) if ((count[k] || 0) !== 3) fails.push(`${k} has ${count[k] || 0} months, want 3`);
          for (const k of cycle) { const ok = seq.some((_, st) => [0, 1, 2].every((j) => seq[(st + j) % 12] === k)); if (!ok) fails.push(`${k} months are not contiguous`); }
          // no grid row (3 tiles) is single-season
          for (let r = 0; r < 4; r++) { const row = seq.slice(r * 3, r * 3 + 3); if (new Set(row).size === 1) fails.push(`grid row ${r + 1} is single-season (${row[0]})`); }
        }
        if (grid) { const gr = grid.getBoundingClientRect(); const br = document.querySelector('[data-lcs-body]').getBoundingClientRect(); inside(gr, br, 'month grid'); }
        return fails;
      }

      /* ---------------- F5 tree (structure only) ---------------- */
      if (layout === 'tree') {
        const cards = [...root.querySelectorAll('[data-lcs-tree-card]')];
        const keys = cards.map((c) => c.dataset.lcsTreeCard);
        if (keys.join(',') !== cycle.join(',')) fails.push(`cards ${keys.join(',')} are not in the cycle order ${cycle.join(',')}`);
        const figure = root.dataset.lcsFigure, caption = root.dataset.lcsCaption === '1';
        const names = [];
        cards.forEach((c, i) => {
          const what = `card ${i + 1} (${c.dataset.lcsTreeCard})`;
          const g = glyphOf(c, what);
          if (g && g !== c.dataset.lcsTreeCard) fails.push(`${what}: glyph ${g} ≠ ${c.dataset.lcsTreeCard}`);
          const name = c.querySelector('.ws-season-tree-name');
          if (!name || !name.textContent.trim()) fails.push(`${what}: no season name`); else names.push(name.textContent.trim().toLocaleLowerCase());
          const open = c.querySelectorAll('[data-lcs-open]');
          if (open.length !== 1) fails.push(`${what}: ${open.length} open areas, want 1`);
          else {
            const o = open[0];
            if (o.dataset.lcsOpen !== figure) fails.push(`${what}: open area "${o.dataset.lcsOpen}" ≠ figure ${figure}`);
            const r = o.getBoundingClientRect();
            if (r.width < 200 || r.height < 180) fails.push(`${what}: open area ${Math.round(r.width)} × ${Math.round(r.height)} is too small to draw in`);
            if (o.querySelector('img') || o.textContent.trim()) fails.push(`${what}: the open area is not empty (a picture or text is printed in it)`);
            if (figure === 'tree' && !o.querySelector('svg path')) fails.push(`${what}: no tree drawn`);
            if (figure === 'frame' && o.querySelector('svg')) fails.push(`${what}: a frame card draws a figure`);
            inside(r, c.closest('.ws-card').getBoundingClientRect(), `${what} open area`);
          }
          const rows = c.querySelectorAll('[data-lcs-prim="writing-row"]');
          if (caption && rows.length !== 1) fails.push(`${what}: ${rows.length} caption rows, want 1`);
          if (!caption && rows.length) fails.push(`${what}: a caption row without caption:true`);
          if (c.querySelector('img')) fails.push(`${what}: a picture is printed (the child draws it)`);
        });
        if (new Set(names).size !== names.length) fails.push('two cards print the same season name');
        return fails;
      }
      return [`unknown layout "${layout}"`];
    });
  },

  async verify(page) {
    const layout = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-seasons]'); return r ? (r.dataset.lcsLayout || null) : null; });
    if (layout) return this._verifyFace(page);
    return page.evaluate(() => {
      const fails = [];
      const KEYS = ['winter', 'spring', 'summer', 'autumn'];
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-ws-content][data-lcs-seasons]');
      if (!root) return ['no seasons root'];
      const perBin = +root.dataset.lcsPerBin;
      const maxAligned = root.dataset.lcsMaxAligned;
      const bins = [...root.querySelectorAll('[data-lcs-bin]')];
      const cycle = bins.map((b) => b.dataset.lcsBin);
      // 4 bins = a rotation of the four keys, in order
      if (cycle.length !== 4) fails.push(`${cycle.length} bins, want 4`);
      const isRot = (seq) => seq.length === 4 && [0, 1, 2, 3].some((s) => seq.every((v, i) => v === cycle[(i + s) % 4]));
      if (new Set(cycle).size !== 4 || cycle.some((k) => !KEYS.includes(k)) || !isRot(KEYS)) fails.push(`bins ${cycle.join(',')} are not a rotation of ${KEYS.join(',')}`);
      // the bin prints a name (or a writing row at d3), never a picture; names distinct
      const names = [];
      bins.forEach((b, i) => {
        if (b.querySelector('img')) fails.push(`bin ${i + 1}: prints a picture`);
        if (!b.querySelector(`[data-lcs-icon="${b.dataset.lcsBin}"]`)) fails.push(`bin ${i + 1}: glyph ≠ ${b.dataset.lcsBin}`);
        const span = b.querySelector('.ws-season-name');
        const row = b.querySelector('[data-lcs-prim="writing-row"]');
        if (b.dataset.lcsWrite === '1') { if (!row) fails.push(`bin ${i + 1}: no writing row`); if (span) fails.push(`bin ${i + 1}: prints the name on a write bin`); }
        else {
          if (!span || !span.textContent.trim()) fails.push(`bin ${i + 1}: no name`);
          else {
            names.push(span.textContent.trim());
            if (span.scrollWidth > b.clientWidth - 16 + 0.6) fails.push(`bin ${i + 1}: "${span.textContent.trim()}" (${Math.round(span.scrollWidth)} px) wider than the bin's inner ${b.clientWidth - 16}`);
          }
        }
      });
      if (new Set(names.map((n) => n.toLocaleLowerCase())).size !== names.length) fails.push('two bins print the same name');
      // items
      const rows = ['top', 'bottom'].map((w) => [...root.querySelectorAll(`[data-lcs-row="${w}"] [data-lcs-item]`)]);
      const all = rows.flat();
      if (all.length !== 4 * perBin) fails.push(`${all.length} tiles ≠ 4 × perBin ${perBin}`);
      const count = {};
      const nouns = new Set();
      const minPx = Math.max(56, +root.dataset.lcsIconPx || 0);
      all.forEach((t, i) => {
        const s = t.dataset.lcsSeason;
        if (!cycle.includes(s)) fails.push(`tile ${i + 1}: season "${s}" is not a bin`);
        count[s] = (count[s] || 0) + 1;
        const noun = (t.dataset.lcsItem || '').split('/').pop();
        if (nouns.has(noun)) fails.push(`tile ${i + 1}: noun "${noun}" appears twice`);
        nouns.add(noun);
        if (t.textContent.trim()) fails.push(`tile ${i + 1}: prints text`);
        const imgs = t.querySelectorAll('img');
        if (imgs.length !== 1) { fails.push(`tile ${i + 1}: ${imgs.length} pictures`); return; }
        const im = imgs[0];
        if (!im.complete || im.naturalWidth === 0) fails.push(`tile ${i + 1}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`tile ${i + 1}: alt names the picture`);
        const parts = decodeURIComponent(im.src).split('/');
        const dir = parts[parts.length - 2] || '';
        if (BW.test(dir)) fails.push(`tile ${i + 1}: picture from a B&W directory "${dir}"`);
        const file = parts[parts.length - 1].replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
        if (file !== noun) fails.push(`tile ${i + 1}: picture "${file}" ≠ stamped noun "${noun}"`);
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < minPx - 0.6) fails.push(`tile ${i + 1}: icon ${Math.round(Math.min(r.width, r.height))} px < ${minPx}`);
        if (!t.querySelector('.ws-season-dot')) fails.push(`tile ${i + 1}: no dot`);
      });
      for (const k of cycle) if ((count[k] || 0) !== perBin) fails.push(`${k} receives ${count[k] || 0} tiles, want ${perBin}`);
      // (a)-(c) from DOM order + geometry
      const binCx = bins.map((b) => { const r = b.getBoundingClientRect(); return (r.left + r.right) / 2; });
      rows.forEach((row, ri) => {
        const seq = row.map((t) => t.dataset.lcsSeason);
        for (let i = 0; i + 4 <= seq.length; i++) if (isRot(seq.slice(i, i + 4))) fails.push(`${ri ? 'bottom' : 'top'} row reads as the season order (${seq.slice(i, i + 4).join(',')})`);
        if (new Set(seq).size < 2) fails.push(`${ri ? 'bottom' : 'top'} row is single-season`);
        if (maxAligned !== 'off') {
          let al = 0;
          row.forEach((t) => {
            const r = t.getBoundingClientRect(); const cx = (r.left + r.right) / 2;
            const over = binCx.findIndex((x) => Math.abs(x - cx) < 1);
            if (over >= 0 && cycle[over] === t.dataset.lcsSeason) al++;
          });
          if (al > +maxAligned) fails.push(`${ri ? 'bottom' : 'top'} row: ${al} tiles over their own sign > ${maxAligned}`);
        }
      });
      // dots face the signs: top-row dots below the tile centre, bottom-row above
      rows[0].forEach((t, i) => { const d = t.querySelector('.ws-season-dot'); if (d && d.getBoundingClientRect().top < t.getBoundingClientRect().top + t.offsetHeight / 2) fails.push(`top tile ${i + 1}: dot is not on the bottom edge`); });
      rows[1].forEach((t, i) => { const d = t.querySelector('.ws-season-dot'); if (d && d.getBoundingClientRect().bottom > t.getBoundingClientRect().top + t.offsetHeight / 2) fails.push(`bottom tile ${i + 1}: dot is not on the top edge`); });
      return fails;
    });
  },
};
