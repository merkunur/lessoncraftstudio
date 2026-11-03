/**
 * lib/puzzles/grid-fill.js — the word-search grid (2026-11-03, ENGINES Part 3 §A). Browser-safe, seeded, deterministic.
 *   fold(s, L)                      NFD → no combining marks → ß → ss → lower: the form duplicates and rude words compare in
 *   placeWords(words, o)            words (grid forms, the letters as printed) on an n × n grid (o: { n, dirs, rng, mask })
 *                                   — longest first, ≤ 200 tries each, the best of the first 8 fits (most shared letters),
 *                                   and no direction carries more than 60 % of six or more words (a grid where every word
 *                                   reads across is a tell); null when a word does not fit
 *   fillGrid(grid, L, rng, extra)   every empty cell a letter of the language (data/puzzles/letter-freq.js weights, plus
 *                                   every letter of the placed words at a small weight: an ö only in a word is a tell)
 *   scan(grid, placed, L)           every list word found exactly once in the 8 directions, and no rude word of ANY of the
 *                                   eleven languages (data/puzzles/blocklist.js) except inside a placed word, in its own
 *                                   direction; → { dupes:[word], rude:[{cells, fillerOnly}] }
 *   wordSearch(words, o)            the whole build: up to 8 placements × 50 filler redraws; → { grid, placed } or null
 * Directions: E S SE NE W N NW SW (the rows go down).
 */
'use strict';
const { LETTER_FREQ } = require('../../data/puzzles/letter-freq.js');
const { BLOCKLIST } = require('../../data/puzzles/blocklist.js');

const DIRS = { E: [0, 1], S: [1, 0], SE: [1, 1], NE: [-1, 1], W: [0, -1], N: [-1, 0], NW: [-1, -1], SW: [1, -1] };
const ALL8 = Object.keys(DIRS);
const fold = (s, L) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').toLocaleLowerCase(L || 'en');
const RUDE = [...new Set(Object.values(BLOCKLIST).flatMap((s) => s.split(' ')).filter((w) => w.length >= 3))];
const RUDE_SET = new Set(RUDE), RUDE_PREFIX = new Set(RUDE.flatMap((w) => Array.from({ length: w.length }, (_, i) => w.slice(0, i + 1))));

/** the cells of a word of length k from (r, c) in direction d */
const cellsOf = (r, c, d, k) => Array.from({ length: k }, (_, i) => [r + DIRS[d][0] * i, c + DIRS[d][1] * i]);

function placeWords(words, { n, dirs, rng, mask }) {
  const inMask = (r, c) => r >= 0 && c >= 0 && r < n && c < n && (!mask || mask(r, c, n));
  const grid = Array.from({ length: n }, () => Array(n).fill(null));
  const order = rng.shuffle(words.map((w, i) => i)).sort((a, b) => [...words[b]].length - [...words[a]].length);
  const placed = [], used = {};
  for (const wi of order) {
    const w = [...words[wi]], k = w.length;
    const cands = [];
    for (let t = 0; t < 200 && cands.length < 8; t++) {
      const d = rng.pick(dirs), r = rng.int(0, n - 1), c = rng.int(0, n - 1);
      const cells = cellsOf(r, c, d, k);
      if (!cells.every(([y, x]) => inMask(y, x))) continue;
      let overlaps = 0, ok = true;
      for (let i = 0; i < k; i++) { const [y, x] = cells[i], g = grid[y][x]; if (g == null) continue; if (g !== w[i]) { ok = false; break; } overlaps++; }
      if (!ok || overlaps === k) continue;
      // balance: with six or more words no direction may hold more than 60 % (while another direction is possible)
      if (words.length >= 6 && dirs.length > 1 && ((used[d] || 0) + 1) > Math.ceil(words.length * 0.6)) continue;
      cands.push({ d, cells, overlaps });
    }
    if (!cands.length) return null;
    const best = cands.sort((a, b) => b.overlaps - a.overlaps)[0];
    best.cells.forEach(([y, x], i) => { grid[y][x] = w[i]; });
    used[best.d] = (used[best.d] || 0) + 1;
    placed.push({ word: words[wi], index: wi, dir: best.d, cells: best.cells });
  }
  return { grid, placed };
}

function fillGrid(grid, L, rng, extra, mask) {
  const freq = Object.assign({}, LETTER_FREQ[L] || LETTER_FREQ.en);
  const total = Object.values(freq).reduce((a, b) => a + b, 0);
  for (const ch of extra || []) { const c = ch.toLocaleLowerCase(L); if (!freq[c]) freq[c] = total * 0.006; }
  const keys = Object.keys(freq), cum = [];
  let s = 0;
  for (const k of keys) { s += freq[k]; cum.push(s); }
  const draw = () => { const x = rng.next() * s; return keys[cum.findIndex((v) => v > x)]; };
  const n = grid.length;
  const filler = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (grid[r][c] == null && (!mask || mask(r, c, n))) filler.push([r, c]);
  return { draw, filler };
}

/** every occurrence of a folded string in the 8 directions: [cells] */
function occurrences(grid, f, L) {
  const n = grid.length, k = [...f].length, out = [], fc = [...f];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) for (const d of ALL8) {
    const cells = cellsOf(r, c, d, k);
    if (!cells.every(([y, x]) => y >= 0 && x >= 0 && y < n && x < n && grid[y][x] != null)) continue;
    if (cells.every(([y, x], i) => fold(grid[y][x], L) === fc[i])) out.push({ d, cells });
  }
  return out;
}

function scan(grid, placed, L) {
  const dupes = [], rude = [];
  const key = (y, x) => y + ',' + x;
  for (const p of placed) {
    // the same cells read the other way are one find (a palindrome, anna): count distinct cell sets
    const sets = new Set(occurrences(grid, fold(p.word, L), L).map((o) => o.cells.map(([y, x]) => key(y, x)).sort().join(' ')));
    if (sets.size !== 1) dupes.push(p.word);
  }
  const inWord = (cells) => placed.some((p) => {
    const idx = cells.map(([y, x]) => p.cells.findIndex(([a, b]) => a === y && b === x));
    // a run of ONE placed word, either way (SHEEP read backwards holds PEE: no child reads it so); two words or a filler: rude
    return idx.every((i) => i >= 0) && (idx.every((v, i) => !i || v === idx[i - 1] + 1) || idx.every((v, i) => !i || v === idx[i - 1] - 1));
  });
  const placedSet = new Set(placed.flatMap((p) => p.cells.map(([y, x]) => key(y, x))));
  // one walk from every cell in the 8 directions, stopped as soon as no rude word starts that way (a prefix set)
  const n = grid.length;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) for (const d of ALL8) {
    let s = '', y = r, x = c;
    const cells = [];
    while (y >= 0 && x >= 0 && y < n && x < n && grid[y][x] != null) {
      s += fold(grid[y][x], L); cells.push([y, x]);
      if (!RUDE_PREFIX.has(s)) break;
      if (RUDE_SET.has(s) && !inWord(cells)) rude.push({ cells: cells.slice(), fillerOnly: cells.every(([a, b]) => !placedSet.has(key(a, b))) });
      y += DIRS[d][0]; x += DIRS[d][1];
    }
  }
  return { dupes, rude };
}

/** one more word into a grid in place (most shared letters of the first 8 fits) → its cells, or null */
function placeOne(grid, word, { n, dirs, rng, mask }) {
  const w = [...word], k = w.length, cands = [];
  const inMask = (r, c) => r >= 0 && c >= 0 && r < n && c < n && (!mask || mask(r, c, n));
  for (let t = 0; t < 200 && cands.length < 8; t++) {
    const d = rng.pick(dirs), cells = cellsOf(rng.int(0, n - 1), rng.int(0, n - 1), d, k);
    if (!cells.every(([y, x]) => inMask(y, x))) continue;
    let overlaps = 0, ok = true;
    for (let i = 0; i < k; i++) { const g = grid[cells[i][0]][cells[i][1]]; if (g == null) continue; if (g !== w[i]) { ok = false; break; } overlaps++; }
    if (ok && overlaps < k) cands.push({ d, cells, overlaps });
  }
  if (!cands.length) return null;
  const best = cands.sort((a, b) => b.overlaps - a.overlaps)[0];
  best.cells.forEach(([y, x], i) => { grid[y][x] = w[i]; });
  return { dir: best.d, cells: best.cells };
}

/** the free cells of a grid (in reading order) filled with these letters, then both scans → the grid, or null */
function finishFixed(grid, placed, letters, L, mask) {
  const n = grid.length, g = grid.map((r) => r.slice()), free = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (g[r][c] == null && (!mask || mask(r, c, n))) free.push([r, c]);
  if (free.length !== letters.length) return null;
  free.forEach(([y, x], i) => { g[y][x] = letters[i]; });
  const s = scan(g, placed, L);
  return !s.dupes.length && !s.rude.length ? { grid: g, placed, filler: free } : null;
}

/** the whole grid: words placed, the rest filled, both scans clean — or null */
function wordSearch(words, { n, dirs, rng, L, mask, fixedFill }) {
  const extra = [...new Set(words.flatMap((w) => [...w]))];
  for (let p = 0; p < 24; p++) {
    const pl = placeWords(words, { n, dirs, rng, mask });
    if (!pl) continue;
    const { draw, filler } = fillGrid(pl.grid, L, rng, extra, mask);
    const g = pl.grid.map((row) => row.slice());
    const caseOf = (ch) => (words[0] === words[0].toLocaleUpperCase(L) ? ch.toLocaleUpperCase(L) : ch);
    if (fixedFill) {
      // the hidden message: the free cells in reading order take the message's letters
      if (fixedFill.length !== filler.length) continue;
      filler.forEach(([y, x], i) => { g[y][x] = fixedFill[i]; });
      const s = scan(g, pl.placed, L);
      if (!s.dupes.length && !s.rude.length) return { grid: g, placed: pl.placed, filler };
      continue;
    }
    filler.forEach(([y, x]) => { g[y][x] = caseOf(draw()); });
    for (let pass = 0; pass < 50; pass++) {
      const s = scan(g, pl.placed, L);
      if (!s.dupes.length && !s.rude.length) return { grid: g, placed: pl.placed, filler };
      const placedKeys = new Set(pl.placed.flatMap((q) => q.cells.map(([y, x]) => y + ',' + x)));
      // a rude word made only of placed letters (two words crossing) cannot be redrawn: place the words again; one that
      // takes at least one filler letter is broken by redrawing its fillers
      if (s.rude.some((x) => x.cells.every(([y, xx]) => placedKeys.has(y + ',' + xx)))) break;
      // redraw the filler cells of every fault (a duplicate's extra occurrence uses at least one filler cell)
      const redo = new Set();
      s.rude.forEach((x) => x.cells.forEach(([y, xx]) => { if (!placedKeys.has(y + ',' + xx)) redo.add(y + ',' + xx); }));
      for (const w of s.dupes) for (const o of occurrences(g, fold(w, L), L)) o.cells.forEach(([y, xx]) => { if (!placedKeys.has(y + ',' + xx)) redo.add(y + ',' + xx); });
      if (!redo.size) break;
      redo.forEach((k) => { const [y, x] = k.split(',').map(Number); g[y][x] = caseOf(draw()); });
    }
  }
  return null;
}

module.exports = { fold, placeWords, placeOne, finishFixed, fillGrid, scan, occurrences, wordSearch, DIRS, RUDE };
