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
 * FACES (Phase 2, 2026-09-14; design §3) — additive knobs read by build() +
 * verify(), stamped ONLY when declared; the base's own d1-d3 carry none and
 * render byte-identically (tools/b3-baseline.js):
 *   choices:N        G1-330 Circle — the same carpet + picks; each card = picture
 *                    + a column of N pills (the target's own cell + N-1 other
 *                    cells of ITS row, never a spelled prefix of each other);
 *                    the correct position is balanced over the page. No lane.
 *   join:true        G1-331 Join — no carpet; cards from `bank.multi` (count 2):
 *                    picture + the approved split as ORDERED tiles with a "+"
 *                    + one ruling row. The child writes the word joined.
 *   colourMode:true  G1-332 Carpet — carpetRows rows (5), cards = picture +
 *                    a colourRing; the child colours the target cell. No lane.
 *   structure:'complex'  G1-333 — the base act over `bank.complexUnits`
 *                    (en: blend ladders; the lane prints each word's own rime).
 *   mode:'syllabified'   G1-334 — a numberedBank of `bank` pictures (lines +
 *                    2 distractors) over `lines` rows, each a word printed
 *                    PRE-SPLIT + an empty number box; answer = the picture's
 *                    number (data-lcs-pic), never in ascending order.
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
const { rulingBlock } = require('../../templates/components-b2.js');
const tokens = require('../../primitives/_tokens.js');
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

/** Which face a resolved difficulty asks for — the base's own d1-d3 carry none of the knobs. */
function faceOf(d) {
  if (d.mode === 'syllabified') return 'syllabified';
  if (d.join) return 'join';
  if (d.colourMode) return 'carpet';
  if (d.choices) return 'circle';
  return 'base';
}

/* ------------------------------------------------------------------ the carpet + the picks (base / circle / carpet / complex) */
/**
 * Everything up to the sampled picks and the rendered carpet, in the base's
 * exact order of rng calls (the base's d1-d3 output is hashed by the release
 * baseline; this function IS the base's former build body).
 */
function prepareCarpet({ d, cfg, loc, unitId, difficulty, rng }) {
  const shape = cfg.shape;
  const rows = rowsOf(cfg, d.structure);
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
  // ban / whitelist → distinct by word. A complex R row (blend ladder) has no
  // shared rime: each word's rime is what follows its onset in its own cell.
  const eligibleByRow = carpetRows.map((row, ri) => {
    const rowCells = cellsByRow[ri];
    const words = (row.words || []).filter((w) => {
      if (banned.has(w.key)) return false;
      if (cfg.strictPool && white && Object.keys(white).length && !white[w.key]) return false;
      if (!hasPicture(w.key, loc)) return false;
      if (w.pictureTheme && !candidates(w.key, loc).some((c) => c.theme === w.pictureTheme)) return false;
      const u = String(w.unit).toLocaleLowerCase(loc);
      let ownRowHit;
      if (shape === 'rime') {
        const wantRime = row.rime || String(w.word).slice(String(w.unit).length);
        ownRowHit = rowCells.filter((c) => c.onset === w.unit && c.rime === wantRime && c.text === w.word);
      } else if (shape === 'syllable') ownRowHit = rowCells.filter((c) => c.text.toLocaleLowerCase(loc) === u);
      else ownRowHit = rowCells.filter((c) => c.text.toLocaleLowerCase(loc) === String(w.word).toLocaleLowerCase(loc));
      if (ownRowHit.length !== 1) return false;
      if (shape === 'syllable') {
        const n = Array.isArray(w.split) ? w.split.length : 0;
        if (n < d.minCount || n > d.maxCount) return false;
      }
      return true;
    }).map((w) => ({
      ...w, rowId: row.id,
      rime: row.rime || (shape === 'rime' ? String(w.word).slice(String(w.unit).length) : null),
      count: Array.isArray(w.split) ? w.split.length : 1,
    }));
    return distinctByWord(words, (w) => String(w.word).toLocaleLowerCase(loc));
  });
  eligibleByRow.forEach((ws, ri) => {
    if (ws.length < d.perRowMin) throw new Error(`G1-306: row "${carpetRows[ri].id}" has ${ws.length} pictured words < perRowMin ${d.perRowMin} (${loc} ${unitId} d${difficulty}) — refuse`);
  });
  const pool = distinctByWord(eligibleByRow.flat(), (w) => String(w.word).toLocaleLowerCase(loc));
  if (pool.length < d.poolMin) throw new Error(`G1-306: unit "${unitId}" pool ${pool.length} < floor ${d.poolMin} (${loc} d${difficulty}) — REFUSED, never filled`);
  if (d.perRowMin * carpetRows.length > d.cards) throw new Error('G1-306: perRowMin × rows exceeds cards — ladder defect');

  // sample: perRowMin from every row, then the rest of the cards from the remainder; card order shuffled, row order never
  // On the carpet face every card colours ONE cell, so two cards sharing a first syllable
  // (fr papaye + parapluie, both "pa", read off the fr contact sheet 2026-09-14) would ask
  // for one cell in two colours: in colourMode the picks are distinct by unit as well.
  // the CELL a card colours: the unit (syllable shape) or onset|rime (rime shape — 'r' colours r|an and r|at, two cells)
  const unitOf = (w) => String(w.unit).toLocaleLowerCase(loc) + (shape === 'rime' ? '|' + String(w.rime).toLocaleLowerCase(loc) : '');
  const byUnit = (ws) => (d.colourMode ? distinctByWord(rng.shuffle(ws.slice()), unitOf) : ws);
  let picks = [];
  eligibleByRow.forEach((ws) => {
    const cand = byUnit(ws);
    if (cand.length < d.perRowMin) throw new Error(`G1-306: row "${ws[0] && ws[0].rowId}" has ${cand.length} distinct first syllables < perRowMin ${d.perRowMin} (${loc} ${unitId} d${difficulty}) — refuse`);
    picks.push(...sampleEntries(rng, cand, d.perRowMin, 'G1-306 row'));
  });
  const chosen = new Set(picks.map((w) => w.key));
  const usedUnits = new Set(picks.map(unitOf));
  const rest = byUnit(pool.filter((w) => !chosen.has(w.key) && !(d.colourMode && usedUnits.has(unitOf(w)))));
  if (rest.length < d.cards - picks.length) throw new Error(`G1-306: unit "${unitId}" offers ${picks.length + rest.length} cards with distinct first syllables < ${d.cards} (${loc} d${difficulty}) — REFUSED, never filled`);
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
  return { shape, carpetRows, cellsByRow, allCells, pool, picks, carpet };
}

/** The base card: picture over a school-line lane (the R rime printed in coral). */
function baseCard(d, shape, w, pic, loc) {
  const lane = C3.syllableLane({ w: d.laneW, h: d.laneH, glyphH: d.glyphH, printed: shape === 'rime' ? w.rime : null });
  const unitStamp = shape === 'syllable' ? String(w.unit).toLocaleLowerCase(loc) : String(w.unit);
  return `<div class="ws-card-stage" style="flex-direction:column;gap:12px" ` +
    `data-lcs-word="${esc(w.word)}" data-lcs-vocab="${esc(w.key)}" data-lcs-unit="${esc(unitStamp)}"` +
    (shape === 'rime' ? ` data-lcs-rime="${esc(w.rime)}"` : '') +
    ` data-lcs-count="${w.count}" data-lcs-face="base" data-lcs-row-id="${esc(w.rowId)}">` +
    `<img class="ws-icon" src="${pic.src}" alt="" data-lcs-pic="${esc(w.key)}" style="width:${d.pic}px;height:${d.pic}px">` +
    lane + `</div>`;
}

/** The cell text of a pick's OWN cell (S the unit, R / B the word). */
function ownCellText(shape, w, loc) {
  return shape === 'syllable' ? String(w.unit).toLocaleLowerCase(loc) : String(w.word);
}
const isPrefix = (a, b) => a !== b && (a.startsWith(b) || b.startsWith(a));

/** Circle card: picture + N pills (the own cell + N-1 other cells of the row); the correct pill at `pos`. */
function circleCard(d, shape, w, pic, loc, rng, rowCells, pos) {
  const own = rowCells.find((c) => c.text.toLocaleLowerCase(loc) === ownCellText(shape, w, loc).toLocaleLowerCase(loc));
  if (!own) throw new Error(`G1-306 circle: "${w.word}" has no own cell in row ${w.rowId} — refuse`);
  const others = rowCells.filter((c) => c !== own && !isPrefix(c.text.toLocaleLowerCase(loc), own.text.toLocaleLowerCase(loc)));
  if (others.length < d.choices - 1) throw new Error(`G1-306 circle: row "${w.rowId}" offers ${others.length} distractor cells for "${w.word}" (need ${d.choices - 1}) — refuse`);
  const dis = sampleEntries(rng, others, d.choices - 1, 'G1-306 circle');
  const cells = dis.slice();
  cells.splice(pos, 0, own);
  const raw = (c) => (c.onset != null ? c.onset + '|' + c.rime : c.text);
  const pills = C3.syllablePills({ cells: cells.map(raw), fontPx: d.pillFont, h: d.pillH, gap: d.pillGap || 6 });
  const unitStamp = shape === 'syllable' ? String(w.unit).toLocaleLowerCase(loc) : String(w.unit);
  return `<div class="ws-card-stage" style="flex-direction:column;gap:8px" ` +
    `data-lcs-word="${esc(w.word)}" data-lcs-vocab="${esc(w.key)}" data-lcs-unit="${esc(unitStamp)}"` +
    (shape === 'rime' ? ` data-lcs-rime="${esc(w.rime)}"` : '') +
    ` data-lcs-count="${w.count}" data-lcs-face="circle" data-lcs-row-id="${esc(w.rowId)}" data-lcs-answer="${esc(own.text)}">` +
    `<img class="ws-icon" src="${pic.src}" alt="" data-lcs-pic="${esc(w.key)}" style="width:${d.pic}px;height:${d.pic}px">` +
    pills.html + `</div>`;
}

/** Carpet card: picture beside a colour ring; the child colours the target cell in that colour. */
function carpetCard(d, shape, w, pic, loc, color) {
  const unitStamp = shape === 'syllable' ? String(w.unit).toLocaleLowerCase(loc) : String(w.unit);
  return `<div class="ws-card-stage" style="flex-direction:row;gap:14px" ` +
    `data-lcs-word="${esc(w.word)}" data-lcs-vocab="${esc(w.key)}" data-lcs-unit="${esc(unitStamp)}"` +
    (shape === 'rime' ? ` data-lcs-rime="${esc(w.rime)}"` : '') +
    ` data-lcs-count="${w.count}" data-lcs-face="carpet" data-lcs-row-id="${esc(w.rowId)}" data-lcs-colour="${esc(color)}">` +
    `<img class="ws-icon" src="${pic.src}" alt="" data-lcs-pic="${esc(w.key)}" style="width:${d.pic}px;height:${d.pic}px">` +
    C3.colourRing({ color }) + `</div>`;
}

/** The approved-words split is lower-case; print it in the word's own case (de nouns keep
 *  their capital — de panel 2026-09-14). Byte-identical where the word is already lower-case. */
function caseAlign(split, word) {
  const chars = [...String(word)];
  if (split.join('') === word || split.join('').toLocaleLowerCase() !== String(word).toLocaleLowerCase()) return split;
  const out = []; let i = 0;
  for (const t of split) { const n = [...t].length; out.push(chars.slice(i, i + n).join('')); i += n; }
  return out;
}

/* ------------------------------------------------------------------ the multi pool (join / syllabified) */
function multiPool(d, cfg, loc, who) {
  if (!Array.isArray(cfg.multi) || !cfg.multi.length) throw new Error(`G1-306 ${who}: the ${loc} bank has no multi pool (not authored) — refuse`);
  const banned = new Set(cfg.ban || []);
  const white = cfg.whitelist || {};
  const muteE = !!(cfg.refuse && cfg.refuse.finalMuteE);
  const words = cfg.multi.filter((w) => {
    if (!Array.isArray(w.split) || w.split.length < 2) return false;
    const n = w.split.length;
    if (n < d.minCount || n > d.maxCount) return false;
    if (d.maxLetters && [...String(w.word)].length > d.maxLetters) return false;
    if (!/^\p{L}+$/u.test(String(w.word))) return false;
    if (w.split.join('').toLocaleLowerCase(loc) !== String(w.word).toLocaleLowerCase(loc)) return false;
    if (banned.has(w.key)) return false;
    if (cfg.strictPool && white && Object.keys(white).length && !white[w.key]) return false;
    if (!hasPicture(w.key, loc)) return false;
    if (w.pictureTheme && !candidates(w.key, loc).some((c) => c.theme === w.pictureTheme)) return false;
    if (muteE && /e$/i.test(w.split[n - 1])) return false;   // fr: a final mute e is not a syllable the child can read out
    return true;
  }).map((w) => ({ ...w, count: w.split.length }));
  return distinctByWord(words, (w) => String(w.word).toLocaleLowerCase(loc));
}

/** G1-331 Join: cards = picture + ordered split tiles + one ruling row. */
function buildJoin({ d, cfg, loc, rng, difficulty }) {
  const pool = multiPool(d, cfg, loc, 'join');
  if (pool.length < d.poolMin) throw new Error(`G1-306 join: pool ${pool.length} < floor ${d.poolMin} (${loc} d${difficulty}) — REFUSED, never filled`);
  const picks = rng.sample(pool, d.cards);
  const cards = picks.map((w) => {
    const pic = pickPicture(rng, w, loc);
    return `<div class="ws-card-stage" style="flex-direction:column;gap:8px" ` +
      `data-lcs-word="${esc(w.word)}" data-lcs-vocab="${esc(w.key)}" data-lcs-split="${esc(w.split.join('|'))}" ` +
      `data-lcs-count="${w.count}" data-lcs-face="join">` +
      `<img class="ws-icon" src="${pic.src}" alt="" data-lcs-pic="${esc(w.key)}" style="width:${d.pic}px;height:${d.pic}px">` +
      C3.syllableJoin({ tokens: w.split, fontPx: d.tileFont, tileH: d.tileH }) +
      rulingBlock({ rows: 1, w: d.laneW, h: d.laneH, glyphH: d.glyphH }) + `</div>`;
  });
  const grid = cardGrid({ cards, cols: d.cols, rows: d.rows });
  const root = `<div data-ws-content data-lcs-sr data-lcs-shape="${cfg.shape}" data-lcs-structure="${d.structure}" ` +
    `data-lcs-cards="${d.cards}" data-lcs-carpet-rows="0" data-lcs-min-count="${d.minCount}" data-lcs-max-count="${d.maxCount}" ` +
    `data-lcs-face="join" style="flex:1;display:flex;flex-direction:column;gap:16px;min-height:0">${grid}</div>`;
  return { bodyHtml: root, meta: { face: 'join', shape: cfg.shape, words: picks.map((w) => w.word), splits: picks.map((w) => w.split.join('-')), pool: pool.length } };
}

/** G1-334 Syllabified: a numbered picture bank over rows of pre-split words + an empty number box. */
function buildSyllabified({ d, cfg, loc, rng, difficulty }) {
  const pool = multiPool(d, cfg, loc, 'syllabified');
  const need = d.lines + d.distractors;
  if (pool.length < Math.max(d.poolMin, need)) throw new Error(`G1-306 syllabified: pool ${pool.length} < ${Math.max(d.poolMin, need)} (${loc} d${difficulty}) — REFUSED, never filled`);
  // rows: at least `minThree` three-syllable words when the pool holds any, the rest from the remainder
  const threes = pool.filter((w) => w.count >= 3);
  const wantThree = Math.min(d.minThree || 0, threes.length);
  let rows = wantThree ? sampleEntries(rng, threes, wantThree, 'G1-306 syllabified 3-syllable') : [];
  const chosen = new Set(rows.map((w) => w.key));
  rows.push(...sampleEntries(rng, pool.filter((w) => !chosen.has(w.key)), d.lines - rows.length, 'G1-306 syllabified'));
  rows = rng.shuffle(rows);
  const onPage = new Set(rows.map((w) => w.key));
  const distractors = sampleEntries(rng, pool.filter((w) => !onPage.has(w.key)), d.distractors, 'G1-306 syllabified distractors');
  // the bank: rows ∪ distractors shuffled; the rows' numbers must NOT read in ascending order
  let bankItems = null;
  for (let t = 0; t < 40 && !bankItems; t++) {
    const cand = rng.shuffle([...rows, ...distractors]);
    const idx = rows.map((w) => cand.indexOf(w) + 1);
    const ascending = idx.every((v, i) => i === 0 || v > idx[i - 1]);
    if (!ascending) bankItems = cand;
  }
  if (!bankItems) throw new Error('G1-306 syllabified: could not order the bank against the rows — refuse');
  const bank = C3.numberedBank({ items: bankItems.map((w) => ({ src: pickPicture(rng, w, loc).src, vocabKey: w.key })), iconPx: d.bankPic, gap: d.bankGap || 8 });
  const lines = rows.map((w, i) => C3.syllabifiedRow({
    tokens: caseAlign(w.split, w.word), sepMode: cfg.sepMode || 'hyphen', fontPx: d.wordFont, h: d.rowH, hMin: d.rowMin || 70, boxPx: d.boxPx,
    data: {
      'data-lcs-sr-row': i + 1, 'data-lcs-word': w.word, 'data-lcs-vocab': w.key, 'data-lcs-split': w.split.join('|'),
      'data-lcs-count': w.count, 'data-lcs-pic': bankItems.indexOf(w) + 1, 'data-lcs-face': 'syllabified',
    },
  }));
  const root = `<div data-ws-content data-lcs-sr data-lcs-shape="${cfg.shape}" data-lcs-structure="${d.structure}" ` +
    `data-lcs-lines="${d.lines}" data-lcs-bank="${need}" data-lcs-distractors="${d.distractors}" data-lcs-sep="${esc(cfg.sepMode || 'hyphen')}" ` +
    `data-lcs-min-count="${d.minCount}" data-lcs-max-count="${d.maxCount}" data-lcs-max-letters="${d.maxLetters}" data-lcs-carpet-rows="0" ` +
    `data-lcs-face="syllabified" style="flex:1;display:flex;flex-direction:column;gap:16px;min-height:0">` +
    bank + `<div style="flex:1 1 auto;display:flex;flex-direction:column;gap:8px;min-height:0">${lines.join('')}</div></div>`;
  return { bodyHtml: root, meta: { face: 'syllabified', shape: cfg.shape, words: rows.map((w) => w.word), splits: rows.map((w) => w.split.join('-')), answers: rows.map((w) => bankItems.indexOf(w) + 1), bank: bankItems.map((w) => w.word), pool: pool.length } };
}

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
  /** The complex-structure unit list / exemplar, for the handwritten G1-333 spec's own unitAxis. */
  _complexUnits: {
    units: (loc) => unitIds((loc || 'en').slice(0, 2), 'complex'),
    exemplar: (loc) => {
      const b = bank(BANK, (loc || 'en').slice(0, 2));
      if (!b.complexExemplar) throw new Error('G1-306: the ' + loc + ' bank has no complexExemplar (Complex face refused)');
      return b.complexExemplar;
    },
    tokens: (unit, loc) => {
      const l = (loc || 'en').slice(0, 2);
      const row = rowsOf(bank(BANK, l), 'complex').find((r) => r.id === unit);
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
    const face = faceOf(d);
    if (face === 'join') return buildJoin({ d, cfg, loc, rng, difficulty });
    if (face === 'syllabified') return buildSyllabified({ d, cfg, loc, rng, difficulty });

    const unitId = unit || (d.structure === 'complex' ? cfg.complexExemplar : cfg.exemplar);
    const P = prepareCarpet({ d, cfg, loc, unitId, difficulty, rng });
    const { carpetRows, cellsByRow, pool, picks, carpet } = P;

    // the cards
    let cards;
    if (face === 'circle') {
      // the correct pill's position is balanced over the page (never a constant column)
      const seq = [];
      for (let i = 0; i < d.cards; i++) seq.push(i % d.choices);
      const positions = rng.shuffle(seq);
      cards = picks.map((w, i) => {
        const pic = pickPicture(rng, w, loc);
        const rowCells = cellsByRow[carpetRows.findIndex((r) => r.id === w.rowId)];
        return circleCard(d, shape, w, pic, loc, rng, rowCells, positions[i]);
      });
    } else if (face === 'carpet') {
      if ((d.reps || 1) !== 1) throw new Error('G1-306 carpet: reps ' + d.reps + ' is not built (a carpet prints every cell once) — refuse');
      const colours = rng.sample(Object.keys(tokens.codeColors), d.cards);
      if (colours.length < d.cards) throw new Error('G1-306 carpet: fewer codeColors than cards — refuse');
      cards = picks.map((w, i) => carpetCard(d, shape, w, pickPicture(rng, w, loc), loc, colours[i]));
    } else {
      cards = picks.map((w) => baseCard(d, shape, w, pickPicture(rng, w, loc), loc));
    }
    const grid = cardGrid({ cards, cols: d.cols, rows: d.rows });

    const faceAttrs = face === 'circle' ? ` data-lcs-choices="${d.choices}"` : face === 'carpet' ? ` data-lcs-reps="${d.reps || 1}"` : '';
    const root = `<div data-ws-content data-lcs-sr data-lcs-shape="${shape}" data-lcs-structure="${d.structure}" ` +
      `data-lcs-cards="${d.cards}" data-lcs-carpet-rows="${d.carpetRows}" data-lcs-per-row-min="${d.perRowMin}" ` +
      `data-lcs-min-count="${d.minCount}" data-lcs-max-count="${d.maxCount}" data-lcs-unit-id="${esc(unitId)}" data-lcs-face="${face}"${faceAttrs} ` +
      `style="flex:1;display:flex;flex-direction:column;gap:16px;min-height:0">${carpet.html}${grid}</div>`;
    return {
      bodyHtml: root,
      meta: {
        face, unit: unitId, shape, rows: carpetRows.map((r) => r.id), words: picks.map((w) => w.word), units: picks.map((w) => w.unit),
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
      const face = root.dataset.lcsFace || 'base';
      const shape = root.dataset.lcsShape;
      if (!['simple', 'complex'].includes(root.dataset.lcsStructure)) fails.push('structure stamp missing');
      const isImgOk = (img) => img.complete && img.naturalWidth > 0;
      const isBW = (img) => /\bbw[\/\\]/i.test(decodeURIComponent(img.getAttribute('src') || ''));

      /* ---------------- join: ordered tiles + one ruling row per card, no carpet, no lane */
      if (face === 'join') {
        const wantCards = +root.dataset.lcsCards;
        const minCount = +root.dataset.lcsMinCount, maxCount = +root.dataset.lcsMaxCount;
        if (root.querySelector('[data-lcs-carpet]')) fails.push('join: a carpet is rendered');
        if (root.querySelector('[data-lcs-syllable-lane]')) fails.push('join: a syllable lane is rendered');
        const cards = [...root.querySelectorAll('.ws-card-stage[data-lcs-word]')];
        if (cards.length !== wantCards) fails.push(`cards ${cards.length} != ${wantCards}`);
        const seenWord = new Set();
        cards.forEach((card, i) => {
          const n = i + 1;
          const word = card.dataset.lcsWord, split = (card.dataset.lcsSplit || '').split('|');
          if (!word || !card.dataset.lcsVocab || !card.dataset.lcsSplit) fails.push(`card ${n}: stamp missing`);
          if (seenWord.has(lc(word))) fails.push(`card ${n}: word "${word}" twice`);
          seenWord.add(lc(word));
          const c = +card.dataset.lcsCount;
          if (c !== split.length) fails.push(`card ${n}: count ${c} != ${split.length} tokens`);
          if (!(c >= minCount && c <= maxCount)) fails.push(`card ${n}: count ${c} outside ${minCount}-${maxCount}`);
          if (lc(split.join('')) !== lc(word)) fails.push(`card ${n}: split "${split.join('|')}" does not join to "${word}"`);
          const tiles = [...card.querySelectorAll('.ws-tile')];
          if (tiles.length !== split.length) fails.push(`card ${n}: ${tiles.length} tiles != ${split.length} syllables`);
          tiles.forEach((t, k) => { if (lc(t.textContent.trim()) !== lc(split[k] || '')) fails.push(`card ${n}: tile ${k + 1} "${t.textContent.trim()}" != split "${split[k]}" (order)`); });
          const joinRow = card.querySelector('[data-lcs-join]');
          if (!joinRow || +joinRow.dataset.lcsJoin !== split.length) fails.push(`card ${n}: join stamp != ${split.length}`);
          // the whole word is never printed: only the tiles carry text
          const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
          let node;
          while ((node = walker.nextNode())) {
            const txt = node.textContent.trim();
            if (!txt || txt === '+') continue;
            if (!node.parentElement.closest('.ws-tile')) fails.push(`card ${n}: text "${txt}" outside the tiles`);
            if (lc(txt) === lc(word)) fails.push(`card ${n}: the whole word is printed`);
          }
          const rul = card.querySelectorAll('[data-lcs-ruling-row]');
          if (rul.length !== 1) fails.push(`card ${n}: ${rul.length} ruling rows (want 1)`);
          if (rul.length === 1 && rul[0].querySelectorAll('line').length < 3) fails.push(`card ${n}: school lines missing`);
          const img = card.querySelectorAll('img');
          if (img.length !== 1 || !isImgOk(img[0])) fails.push(`card ${n}: picture missing/broken`);
          if (img.length === 1 && isBW(img[0])) fails.push(`card ${n}: BW-directory picture`);
        });
        return fails;
      }

      /* ---------------- syllabified: a numbered bank + rows; one match per row, numbers never ascending */
      if (face === 'syllabified') {
        const lines = +root.dataset.lcsLines, bankN = +root.dataset.lcsBank, dis = +root.dataset.lcsDistractors;
        const minCount = +root.dataset.lcsMinCount, maxCount = +root.dataset.lcsMaxCount, maxLetters = +root.dataset.lcsMaxLetters;
        const sep = root.dataset.lcsSep || 'hyphen';
        if (root.querySelector('[data-lcs-carpet]')) fails.push('syllabified: a carpet is rendered');
        if (root.querySelector('[data-lcs-syllable-lane]')) fails.push('syllabified: a syllable lane is rendered');
        const bank = root.querySelector('[data-lcs-numbered-bank]');
        if (!bank) return ['syllabified: no numbered bank'];
        const items = [...bank.querySelectorAll('[data-lcs-bank-index]')];
        if (items.length !== bankN) fails.push(`bank ${items.length} != ${bankN}`);
        if (bankN !== lines + dis) fails.push(`bank ${bankN} != lines ${lines} + distractors ${dis}`);
        const seenVocab = new Set();
        items.forEach((it, i) => {
          if (+it.dataset.lcsBankIndex !== i + 1) fails.push(`bank item ${i + 1} numbered ${it.dataset.lcsBankIndex}`);
          const badge = it.querySelector('[data-lcs-count-badge]');
          if (!badge || +badge.dataset.lcsCountBadge !== i + 1) fails.push(`bank item ${i + 1}: badge missing / wrong`);
          if (seenVocab.has(it.dataset.lcsVocab)) fails.push(`bank picture "${it.dataset.lcsVocab}" twice`);
          seenVocab.add(it.dataset.lcsVocab);
          const img = it.querySelector('img');
          if (!img || !isImgOk(img)) fails.push(`bank item ${i + 1}: picture missing/broken`);
          if (img && isBW(img)) fails.push(`bank item ${i + 1}: BW-directory picture`);
        });
        const rows = [...root.querySelectorAll('[data-lcs-sr-row]')];
        if (rows.length !== lines) fails.push(`rows ${rows.length} != ${lines}`);
        const seenWord = new Set(), referenced = new Set();
        const answers = [];
        rows.forEach((row, i) => {
          const n = i + 1;
          const word = row.dataset.lcsWord, split = (row.dataset.lcsSplit || '').split('|');
          if (!word || !row.dataset.lcsVocab || !row.dataset.lcsSplit || !row.dataset.lcsPic) fails.push(`row ${n}: stamp missing`);
          if (seenWord.has(lc(word))) fails.push(`row ${n}: word "${word}" twice`);
          seenWord.add(lc(word));
          const c = +row.dataset.lcsCount;
          if (c !== split.length) fails.push(`row ${n}: count ${c} != ${split.length} tokens`);
          if (!(c >= minCount && c <= maxCount)) fails.push(`row ${n}: count ${c} outside ${minCount}-${maxCount}`);
          if (maxLetters && [...word].length > maxLetters) fails.push(`row ${n}: "${word}" has ${[...word].length} letters > ${maxLetters}`);
          if (lc(split.join('')) !== lc(word)) fails.push(`row ${n}: split does not join to "${word}"`);
          // the printed text is the split, never the whole word in one text node
          const printed = row.querySelector('[data-lcs-printed]');
          if (!printed) { fails.push(`row ${n}: nothing printed`); return; }
          const want = sep === 'color' ? split.join('') : split.join('-');
          if (lc(printed.textContent.replace(/\s+/g, '')) !== lc(want)) fails.push(`row ${n}: printed "${printed.textContent.trim()}" != "${want}"`);
          const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
          let node;
          while ((node = walker.nextNode())) {
            const txt = node.textContent.trim();
            if (txt && lc(txt) === lc(word)) fails.push(`row ${n}: the whole word "${word}" is one text node (no boundary printed)`);
          }
          if (sep === 'color') {
            const spans = [...printed.querySelectorAll('span')];
            if (spans.length !== split.length) fails.push(`row ${n}: ${spans.length} coloured syllables != ${split.length}`);
          }
          // exactly one bank picture carries this row's vocab; its number is the stamped answer
          const hits = items.filter((it) => it.dataset.lcsVocab === row.dataset.lcsVocab);
          if (hits.length !== 1) fails.push(`row ${n}: "${word}" matches ${hits.length} bank pictures (want 1)`);
          if (hits.length === 1 && +hits[0].dataset.lcsBankIndex !== +row.dataset.lcsPic) fails.push(`row ${n}: data-lcs-pic ${row.dataset.lcsPic} != bank index ${hits[0].dataset.lcsBankIndex}`);
          referenced.add(row.dataset.lcsVocab);
          answers.push(+row.dataset.lcsPic);
          const box = row.querySelectorAll('[data-lcs-number-box]');
          if (box.length !== 1) fails.push(`row ${n}: ${box.length} number boxes`);
          else if (box[0].textContent.trim()) fails.push(`row ${n}: the number box is not empty ("${box[0].textContent.trim()}")`);
        });
        const unref = items.filter((it) => !referenced.has(it.dataset.lcsVocab));
        if (unref.length !== dis) fails.push(`${unref.length} unreferenced bank pictures != ${dis} distractors`);
        if (answers.length > 1 && answers.every((v, i) => i === 0 || v > answers[i - 1])) fails.push(`answers ${answers.join(',')} read in ascending order`);
        return fails;
      }

      /* ---------------- base / circle / carpet: the carpet, then the cards */
      const wantCards = +root.dataset.lcsCards;
      const wantRows = +root.dataset.lcsCarpetRows;
      const perRowMin = +root.dataset.lcsPerRowMin;
      const minCount = +root.dataset.lcsMinCount, maxCount = +root.dataset.lcsMaxCount;

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
      if (face === 'base' && lanes.length !== wantCards) fails.push(`lanes ${lanes.length} != ${wantCards}`);
      if (face !== 'base' && lanes.length !== 0) fails.push(`${face}: ${lanes.length} lanes rendered (want none)`);
      const seenWord = new Set(), seenKey = new Set(), perRow = new Map();
      const seenColour = new Set(), posCount = new Map();
      const choices = +root.dataset.lcsChoices || 0;
      cards.forEach((card, i) => {
        const word = card.dataset.lcsWord, unit = card.dataset.lcsUnit, key = card.dataset.lcsVocab;
        const n = i + 1;
        if (!word || !unit || !key) fails.push(`card ${n}: stamp missing`);
        if (card.dataset.lcsFace !== face) fails.push(`card ${n}: face stamp "${card.dataset.lcsFace}" != root "${face}"`);
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
        const ownCell = hits.length === 1 ? hits[0] : null;
        const img = card.querySelectorAll('img');
        if (img.length !== 1 || !isImgOk(img[0])) fails.push(`card ${n}: picture missing/broken`);
        if (img.length === 1 && isBW(img[0])) fails.push(`card ${n}: BW-directory picture`);

        if (face === 'circle') {
          // N pills: the own cell exactly once, the others distinct cells of the same row, none a spelled prefix of the answer
          const answer = card.dataset.lcsAnswer || '';
          if (!ownCell || lc(answer) !== lc(ownCell.dataset.lcsCell)) fails.push(`card ${n}: data-lcs-answer "${answer}" is not the card's own cell`);
          const pills = [...card.querySelectorAll('[data-lcs-choice]')];
          if (pills.length !== choices) fails.push(`card ${n}: ${pills.length} pills != ${choices}`);
          const labels = pills.map((p) => lc(p.dataset.lcsChoice));
          if (new Set(labels).size !== labels.length) fails.push(`card ${n}: pills not distinct`);
          const match = pills.filter((p) => lc(p.dataset.lcsChoice) === lc(answer));
          if (match.length !== 1) fails.push(`card ${n}: ${match.length} pills equal the answer "${answer}" (want 1)`);
          const rowSvg = ownCell ? ownCell.closest('svg[data-lcs-row]') : null;
          const rowCells = rowSvg ? [...rowSvg.querySelectorAll('g[data-lcs-cell]')].map((g) => lc(g.dataset.lcsCell)) : [];
          pills.forEach((p, k) => {
            const txt = lc(p.textContent.replace(/\s+/g, ''));
            if (txt !== lc(p.dataset.lcsChoice)) fails.push(`card ${n}: pill ${k + 1} prints "${txt}" but stamps "${p.dataset.lcsChoice}"`);
            if (rowCells.length && !rowCells.includes(lc(p.dataset.lcsChoice))) fails.push(`card ${n}: pill "${p.dataset.lcsChoice}" is not a cell of the card's row`);
            const a = lc(p.dataset.lcsChoice), b = lc(answer);
            if (a !== b && (a.startsWith(b) || b.startsWith(a))) fails.push(`card ${n}: pill "${a}" is a spelled prefix of / extends the answer "${b}"`);
            if (p.hasAttribute('data-lcs-correct')) fails.push(`card ${n}: a pill stamps the answer`);
          });
          if (match.length === 1) posCount.set(match[0].dataset.lcsPos, (posCount.get(match[0].dataset.lcsPos) || 0) + 1);
          // nothing else visible: the pills are the only text
          const visible = card.textContent.replace(/\s+/g, '');
          const pillText = pills.map((p) => p.textContent.replace(/\s+/g, '')).join('');
          if (visible !== pillText) fails.push(`card ${n}: text outside the pills`);
        } else if (face === 'carpet') {
          const ring = card.querySelectorAll('[data-lcs-colour]');
          if (ring.length !== 1) fails.push(`card ${n}: ${ring.length} colour rings`);
          const colour = card.dataset.lcsColour;
          if (!colour || (ring[0] && ring[0].dataset.lcsColour !== colour)) fails.push(`card ${n}: ring colour != stamp`);
          if (seenColour.has(colour)) fails.push(`card ${n}: colour "${colour}" twice on the page`);
          seenColour.add(colour);
          if (card.textContent.replace(/\s+/g, '')) fails.push(`card ${n}: visible text "${card.textContent.trim()}" on a colour card`);
        } else {
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
        }
      });
      if (face === 'circle' && cards.length) {
        const cap = Math.ceil(cards.length / (choices || 1));
        for (const [pos, n] of posCount) if (n > cap) fails.push(`answer position ${pos} used ${n} times (cap ${cap})`);
        if (posCount.size < Math.min(choices, cards.length)) fails.push(`answer positions used: ${posCount.size} of ${choices}`);
      }
      if (face === 'carpet') {
        const rowsUsed = new Set(cards.map((c) => c.dataset.lcsRowId));
        if (rowsUsed.size < Math.min(3, rows.length)) fails.push(`carpet targets come from ${rowsUsed.size} rows (want >= 3)`);
        // one cell per colour: no two cards may name the same unit
        const units = cards.map((c) => c.dataset.lcsUnit + (c.dataset.lcsRime ? '|' + c.dataset.lcsRime : ''));
        const dup = units.filter((u, i) => units.indexOf(u) !== i);
        if (dup.length) fails.push(`carpet: two cards colour the same cell (${[...new Set(dup)].join(', ')})`);
      }
      const carpetRowIds = new Set(cards.map((c) => c.dataset.lcsRowId));
      for (const [rid, n] of perRow) if (n < perRowMin) fails.push(`row "${rid}": ${n} cards < perRowMin ${perRowMin}`);
      if (rows.length && carpetRowIds.size > rows.length) fails.push('cards cite more rows than the carpet has');
      return fails;
    });
  },
};
