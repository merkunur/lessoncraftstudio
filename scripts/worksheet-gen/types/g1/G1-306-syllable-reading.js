/**
 * G1-306 — Word Families: Read and Write (nt20-C; `syllable-reading`, G1,
 * en RF.1.3.b; the framework NAME elsewhere). THEMELESS: pictures come from the
 * whole cached library through lib/b3-picture-index.js; the fan lever is the
 * UNIT (unitAxis) — a rime family (R, en), a consonant family (S, es pt it fr
 * de fi) or a vowel / seed row (B, nl sv da no), one apparatus for all three.
 *
 * The page: a white READING CARPET on top — carpetRows rows of cells read aloud
 * left to right, a dashed coral read-tick at the end of each row — and below it
 * `cards` cream cards, each a picture over a school-line lane. The unit is
 * PRINTED on the carpet; the child reads it, finds the picture's word, writes
 * the piece: S the first syllable, R the onset before the rime the lane already
 * prints in coral, B the whole word. The target word is never on its card.
 * d1: 1 row / 4 cards / pic 160 · d2: 2 rows / 6 cards / 128 · d3: 3 rows /
 * 8 cards / 88. `structure` is a guard key ('simple' here; the Complex face
 * flips it to 'complex' and the carpet reads the bank's complexUnits).
 *
 * build() reads ONLY data/b3/syllable-reading.js (lib/b3-common.js bank) +
 * the picture index; a unit / difficulty the bank cannot fill THROWS (a
 * refusal — never a filler, never a substitution).
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');
const { hasPicture, candidates } = require('../../lib/b3-picture-index.js');
const { distinctByWord, sampleEntries, fileUri } = require('../../lib/b2-common.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const C3 = require('../../templates/components-b3.js');
const { esc } = require('../../primitives/_svg.js');

const BANK = 'syllable-reading';

/** The ordered row list a bank block exposes for a structure (S/B `units`, R `rimes`; complex = `complexUnits`). */
function rowsOf(cfg, structure) {
  if (structure === 'complex') {
    if (!Array.isArray(cfg.complexUnits)) throw new Error('G1-306: structure "complex" needs an array complexUnits in the bank (not authored) — refuse');
    return cfg.complexUnits;
  }
  const rows = cfg.shape === 'rime' ? cfg.rimes : cfg.units;
  if (!Array.isArray(rows) || !rows.length) throw new Error('G1-306: bank block has no rows for shape ' + cfg.shape + ' — refuse');
  return rows;
}

function parseCell(cell) {
  const s = String(cell);
  const i = s.indexOf('|');
  return i < 0 ? { onset: null, rime: null, text: s } : { onset: s.slice(0, i), rime: s.slice(i + 1), text: s.slice(0, i) + s.slice(i + 1) };
}

/** The picture for a bank word: every colour candidate, or the one dir a `pictureTheme` pin names; none = refuse. */
function pickPicture(rng, w, loc) {
  const all = candidates(w.key, loc);
  const c = w.pictureTheme ? all.filter((x) => x.theme === w.pictureTheme) : all;
  if (!c.length) throw new Error(`G1-306: no colour picture for "${w.key}"${w.pictureTheme ? ' in theme ' + w.pictureTheme : ''} (${loc}) — refuse the item`);
  const pick = c.length === 1 ? c[0] : rng.pick(c);
  return Object.assign({ src: fileUri(pick.theme, pick.noun) }, pick);
}

/** Bank order first: unit ids of the structure's rows. */
function unitIds(loc, structure) { return rowsOf(bank(BANK, loc), structure || 'simple').map((r) => r.id); }

module.exports = {
  id: 'G1-306',
  slug: 'word-families-read-and-write',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'syllable-reading',
  themeAxis: { applicable: false },
  unitAxis: {
    applicable: true,
    units: (loc) => unitIds((loc || 'en').slice(0, 2)),
    exemplar: (loc) => bank(BANK, (loc || 'en').slice(0, 2)).exemplar,
    tokens: (unit, loc) => {
      const l = (loc || 'en').slice(0, 2);
      const row = rowsOf(bank(BANK, l), 'simple').find((r) => r.id === unit);
      const label = row ? (row.label || row.id) : String(unit);
      return { U: label.charAt(0).toLocaleUpperCase(l) + label.slice(1), L: label.toLocaleLowerCase(l), UNIT: label };
    },
  },
  difficulty: {
    // carpetRows / cell / cellFont · cards / cols / rows / pic · lane w / h / glyphH · perRowMin · S count bounds · poolMin
    1: { carpetRows: 1, cell: 72, cellFont: 32, cards: 4, cols: 2, rows: 2, pic: 160, laneW: 200, laneH: 72, glyphH: 36, perRowMin: 2, structure: 'simple', minCount: 2, maxCount: 2, poolMin: 5 },
    2: { carpetRows: 2, cell: 64, cellFont: 30, cards: 6, cols: 3, rows: 2, pic: 128, laneW: 151, laneH: 60, glyphH: 30, perRowMin: 2, structure: 'simple', minCount: 2, maxCount: 3, poolMin: 8 },
    3: { carpetRows: 3, cell: 56, cellFont: 28, cards: 8, cols: 4, rows: 2, pic: 88, laneW: 126, laneH: 56, glyphH: 26, perRowMin: 2, structure: 'simple', minCount: 2, maxCount: 4, poolMin: 8 },
  },
  i18n: {
    en: {
      title: 'Word Families: Read and Write',
      instruction: 'Read every word on the carpet out loud. Say each picture word, find it on the carpet, then write its beginning on the line before the ending.',
    },
  },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const cfg = bank(BANK, loc);
    const shape = cfg.shape;
    if (!['syllable', 'rime', 'soundout'].includes(shape)) throw new Error('G1-306: bank ' + loc + ' has unknown shape "' + shape + '"');
    const rows = rowsOf(cfg, d.structure);
    const unitId = unit || cfg.exemplar;
    const f = rows.findIndex((r) => r.id === unitId);
    if (f < 0) throw new Error(`G1-306: unit "${unitId}" is not a ${d.structure} row of the ${loc} bank — refuse`);
    const carpetRows = rows.slice(f, f + d.carpetRows);
    if (carpetRows.length < d.carpetRows) throw new Error(`G1-306: unit "${unitId}" has only ${carpetRows.length} of ${d.carpetRows} carpet rows in ${loc} — refuse`);

    // the printed carpet: cells verbatim, distinct across the carpet (else a picture could match twice)
    const cellsByRow = carpetRows.map((r) => r.cells.map(parseCell));
    const allCells = cellsByRow.flat();
    const seenCell = new Set();
    for (const c of allCells) {
      const k = c.text.toLocaleLowerCase(loc);
      if (seenCell.has(k)) throw new Error(`G1-306: cell "${c.text}" printed twice on the carpet (${loc} ${unitId}) — refuse`);
      seenCell.add(k);
    }
    // read-only cells (no picture uses them) may never exceed a THIRD of the carpet, or the
    // child stops trusting the carpet (design file, the critic's verdict); a data refusal
    const readOnlyN = carpetRows.reduce((n, r) => n + (r.readOnly || []).length, 0);
    if (readOnlyN * 3 > allCells.length) throw new Error(`G1-306: ${readOnlyN} read-only cells of ${allCells.length} exceed a third of the carpet (${loc} ${unitId} d${difficulty}) — REFUSED`);
    const banned = new Set(cfg.ban || []);
    const white = cfg.whitelist || {};

    // eligibility, in the design order: (texPool + count + strict pool are
    // BANK-time facts, gated by qa/verify-b3-syllable-reading.js) → pictured →
    // the unit is a cell of ITS row by exact equality, once on the carpet →
    // ban / whitelist → distinct by word
    const eligibleByRow = carpetRows.map((row, ri) => {
      const rowCells = cellsByRow[ri];
      const words = (row.words || []).filter((w) => {
        if (banned.has(w.key)) return false;
        if (cfg.strictPool && white && Object.keys(white).length && !white[w.key]) return false;
        if (!hasPicture(w.key, loc)) return false;
        if (w.pictureTheme && !candidates(w.key, loc).some((c) => c.theme === w.pictureTheme)) return false;
        const u = String(w.unit).toLocaleLowerCase(loc);
        let ownRowHit;
        if (shape === 'rime') ownRowHit = rowCells.filter((c) => c.onset === w.unit && c.rime === row.rime && c.text === w.word);
        else if (shape === 'syllable') ownRowHit = rowCells.filter((c) => c.text.toLocaleLowerCase(loc) === u);
        else ownRowHit = rowCells.filter((c) => c.text.toLocaleLowerCase(loc) === String(w.word).toLocaleLowerCase(loc));
        if (ownRowHit.length !== 1) return false;
        if (shape === 'syllable') {
          const n = Array.isArray(w.split) ? w.split.length : 0;
          if (n < d.minCount || n > d.maxCount) return false;
        }
        return true;
      }).map((w) => ({ ...w, rowId: row.id, rime: row.rime || null, count: Array.isArray(w.split) ? w.split.length : 1 }));
      return distinctByWord(words, (w) => String(w.word).toLocaleLowerCase(loc));
    });
    eligibleByRow.forEach((ws, ri) => {
      if (ws.length < d.perRowMin) throw new Error(`G1-306: row "${carpetRows[ri].id}" has ${ws.length} pictured words < perRowMin ${d.perRowMin} (${loc} ${unitId} d${difficulty}) — refuse`);
    });
    let pool = distinctByWord(eligibleByRow.flat(), (w) => String(w.word).toLocaleLowerCase(loc));
    if (pool.length < d.poolMin) throw new Error(`G1-306: unit "${unitId}" pool ${pool.length} < floor ${d.poolMin} (${loc} d${difficulty}) — REFUSED, never filled`);
    if (d.perRowMin * carpetRows.length > d.cards) throw new Error('G1-306: perRowMin × rows exceeds cards — ladder defect');

    // sample: perRowMin from every row, then the rest of the cards from the remainder; card order shuffled, row order never
    let picks = [];
    eligibleByRow.forEach((ws) => { picks.push(...sampleEntries(rng, ws, d.perRowMin, 'G1-306 row')); });
    const chosen = new Set(picks.map((w) => w.key));
    const rest = pool.filter((w) => !chosen.has(w.key));
    picks.push(...sampleEntries(rng, rest, d.cards - picks.length, 'G1-306'));
    picks = rng.shuffle(picks);

    // the carpet
    const maxChars = Math.max(...allCells.map((c) => [...c.text].length));
    const fontPx = maxChars <= 3 ? d.cellFont : Math.max(26, d.cellFont - 4);
    const carpet = C3.syllableCarpet({
      rows: carpetRows.map((r) => ({ cells: r.cells, rime: r.rime || null, readOnly: r.readOnly || [] })),
      cell: d.cell, fontPx, gap: 8, tick: true,
    });
    if (carpet.width > 651) throw new Error(`G1-306: carpet row ${carpet.width} px > 651 (${loc} ${unitId} d${difficulty}) — refuse the unit`);

    // the cards
    const cards = picks.map((w) => {
      const pic = pickPicture(rng, w, loc);
      const lane = C3.syllableLane({ w: d.laneW, h: d.laneH, glyphH: d.glyphH, printed: shape === 'rime' ? w.rime : null });
      const unitStamp = shape === 'syllable' ? String(w.unit).toLocaleLowerCase(loc) : String(w.unit);
      return `<div class="ws-card-stage" style="flex-direction:column;gap:12px" ` +
        `data-lcs-word="${esc(w.word)}" data-lcs-vocab="${esc(w.key)}" data-lcs-unit="${esc(unitStamp)}"` +
        (shape === 'rime' ? ` data-lcs-rime="${esc(w.rime)}"` : '') +
        ` data-lcs-count="${w.count}" data-lcs-face="base" data-lcs-row-id="${esc(w.rowId)}">` +
        `<img class="ws-icon" src="${pic.src}" alt="" data-lcs-pic="${esc(w.key)}" style="width:${d.pic}px;height:${d.pic}px">` +
        lane + `</div>`;
    });
    const grid = cardGrid({ cards, cols: d.cols, rows: d.rows });

    const root = `<div data-ws-content data-lcs-sr data-lcs-shape="${shape}" data-lcs-structure="${d.structure}" ` +
      `data-lcs-cards="${d.cards}" data-lcs-carpet-rows="${d.carpetRows}" data-lcs-per-row-min="${d.perRowMin}" ` +
      `data-lcs-min-count="${d.minCount}" data-lcs-max-count="${d.maxCount}" data-lcs-unit-id="${esc(unitId)}" data-lcs-face="base" ` +
      `style="flex:1;display:flex;flex-direction:column;gap:16px;min-height:0">${carpet.html}${grid}</div>`;
    return {
      bodyHtml: root,
      meta: {
        unit: unitId, shape, rows: carpetRows.map((r) => r.id), words: picks.map((w) => w.word), units: picks.map((w) => w.unit),
        pool: pool.length, cellW: carpet.cellW, fontPx: carpet.fontPx, carpetWidth: carpet.width,
      },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const lc = (s) => String(s).toLocaleLowerCase(lang);
      const root = document.querySelector('[data-lcs-sr]');
      if (!root) return ['no root stamp'];
      const shape = root.dataset.lcsShape;
      const wantCards = +root.dataset.lcsCards;
      const wantRows = +root.dataset.lcsCarpetRows;
      const perRowMin = +root.dataset.lcsPerRowMin;
      const minCount = +root.dataset.lcsMinCount, maxCount = +root.dataset.lcsMaxCount;
      if (!['simple', 'complex'].includes(root.dataset.lcsStructure)) fails.push('structure stamp missing');

      // the carpet
      const carpet = root.querySelector('[data-lcs-carpet]');
      if (!carpet) return ['no carpet'];
      if (!carpet.hasAttribute('data-ws-content')) fails.push('carpet lacks data-ws-content');
      const rows = [...carpet.querySelectorAll('svg[data-lcs-row]')];
      if (rows.length !== wantRows) fails.push(`carpet rows ${rows.length} != ${wantRows}`);
      const cells = [...carpet.querySelectorAll('g[data-lcs-cell]')];
      const seen = new Map();
      cells.forEach((g) => { const k = lc(g.dataset.lcsCell); seen.set(k, (seen.get(k) || 0) + 1); });
      for (const [k, n] of seen) if (n > 1) fails.push(`cell "${k}" printed ${n} times`);
      cells.forEach((g) => {
        const t = g.querySelector('text');
        if (!t) { fails.push(`cell "${g.dataset.lcsCell}" has no text`); return; }
        if (lc(t.textContent.replace(/\s+/g, '')) !== lc(g.dataset.lcsCell)) fails.push(`cell text "${t.textContent}" != stamp "${g.dataset.lcsCell}"`);
        const rect = g.querySelector('rect');
        const fill = (rect && rect.getAttribute('fill') || '').toUpperCase();
        if (fill !== '#FFFFFF' && fill !== '#DDEBE8') fails.push(`cell "${g.dataset.lcsCell}" fill ${fill} (want white / tealSoft)`);
      });
      rows.forEach((svg, i) => {
        const w = svg.getBoundingClientRect().width;
        if (w > 651 + 0.6) fails.push(`row ${i + 1} width ${Math.round(w)} > 651`);
        const n = +svg.dataset.lcsCells;
        if (svg.querySelectorAll('g[data-lcs-cell]').length !== n) fails.push(`row ${i + 1}: cells != data-lcs-cells`);
      });
      const ro = cells.filter((g) => g.dataset.lcsReadonly);
      if (ro.length * 3 > cells.length) fails.push(`${ro.length} read-only cells of ${cells.length} exceed a third of the carpet`);
      const ticks = [...carpet.querySelectorAll('[data-lcs-readtick]')];
      if (ticks.length !== wantRows) fails.push(`read-ticks ${ticks.length} != ${wantRows}`);
      ticks.forEach((c, i) => {
        const fill = (c.getAttribute('fill') || 'none').toUpperCase();
        if (fill !== '#FFFFFF' && fill !== 'NONE') fails.push(`read-tick ${i + 1} is filled (${fill})`);
        if (!c.getAttribute('stroke-dasharray')) fails.push(`read-tick ${i + 1} not dashed`);
      });

      // the cards
      const cards = [...root.querySelectorAll('.ws-card-stage[data-lcs-word]')];
      if (cards.length !== wantCards) fails.push(`cards ${cards.length} != ${wantCards}`);
      const lanes = root.querySelectorAll('[data-lcs-syllable-lane]');
      if (lanes.length !== wantCards) fails.push(`lanes ${lanes.length} != ${wantCards}`);
      const seenWord = new Set(), seenKey = new Set(), perRow = new Map();
      cards.forEach((card, i) => {
        const word = card.dataset.lcsWord, unit = card.dataset.lcsUnit, key = card.dataset.lcsVocab;
        const n = i + 1;
        if (!word || !unit || !key) fails.push(`card ${n}: stamp missing`);
        if (seenWord.has(lc(word))) fails.push(`card ${n}: word "${word}" twice`);
        seenWord.add(lc(word));
        if (seenKey.has(key)) fails.push(`card ${n}: vocab "${key}" twice`);
        seenKey.add(key);
        perRow.set(card.dataset.lcsRowId, (perRow.get(card.dataset.lcsRowId) || 0) + 1);
        // the stamped unit is a carpet cell EXACTLY once
        let hits;
        if (shape === 'rime') {
          const rime = card.dataset.lcsRime || '';
          if (unit + rime !== word) fails.push(`card ${n}: onset "${unit}" + rime "${rime}" != "${word}"`);
          hits = cells.filter((g) => g.dataset.lcsOnset === unit && g.dataset.lcsRime === rime && lc(g.dataset.lcsCell) === lc(word));
        } else if (shape === 'syllable') {
          if (!lc(word).startsWith(lc(unit))) fails.push(`card ${n}: "${word}" does not start with "${unit}"`);
          const c = +card.dataset.lcsCount;
          if (!(c >= minCount && c <= maxCount)) fails.push(`card ${n}: count ${c} outside ${minCount}-${maxCount}`);
          hits = cells.filter((g) => lc(g.dataset.lcsCell) === lc(unit));
        } else {
          if (lc(unit) !== lc(word)) fails.push(`card ${n}: sound-out unit != word`);
          hits = cells.filter((g) => lc(g.dataset.lcsCell) === lc(word));
        }
        if (hits.length !== 1) fails.push(`card ${n}: "${word}" matches ${hits.length} cells (want 1)`);
        if (hits.length === 1 && hits[0].dataset.lcsReadonly) fails.push(`card ${n}: "${word}" sits on a read-only cell`);
        // answer hiding: the only visible text is the R rime on the lane
        const visible = card.textContent.replace(/\s+/g, '');
        const allowed = shape === 'rime' ? (card.dataset.lcsRime || '') : '';
        if (visible !== allowed) fails.push(`card ${n}: visible text "${visible}" (want "${allowed}")`);
        if (visible && lc(visible) === lc(word)) fails.push(`card ${n}: the answer is printed`);
        const lane = card.querySelectorAll('[data-lcs-syllable-lane]');
        if (lane.length !== 1) fails.push(`card ${n}: ${lane.length} lanes`);
        else {
          const l = lane[0];
          if (shape === 'rime' && l.dataset.lcsPrinted !== card.dataset.lcsRime) fails.push(`card ${n}: lane prints "${l.dataset.lcsPrinted}" not the rime`);
          if (shape !== 'rime' && l.dataset.lcsPrinted) fails.push(`card ${n}: lane prints "${l.dataset.lcsPrinted}" on a ${shape} page`);
          if (+l.dataset.lcsWritable < 60) fails.push(`card ${n}: writable ${l.dataset.lcsWritable} < 60`);
          if (l.querySelectorAll('line').length < 3) fails.push(`card ${n}: school lines missing`);
        }
        const img = card.querySelectorAll('img');
        if (img.length !== 1 || !img[0].complete || img[0].naturalWidth === 0) fails.push(`card ${n}: picture missing/broken`);
        if (img.length === 1 && /\bbw[\/\\]/i.test(decodeURIComponent(img[0].getAttribute('src') || ''))) fails.push(`card ${n}: BW-directory picture`);
      });
      const carpetRowIds = new Set(cards.map((c) => c.dataset.lcsRowId));
      for (const [rid, n] of perRow) if (n < perRowMin) fails.push(`row "${rid}": ${n} cards < perRowMin ${perRowMin}`);
      if (rows.length && carpetRowIds.size > rows.length) fails.push('cards cite more rows than the carpet has');
      return fails;
    });
  },
};
