/**
 * lib/puzzles/crossword-layout.js — the crossword layout (2026-11-03, ENGINES Part 3 §B). Browser-safe, seeded.
 *   layout(words, { rng, starts = 64, clueCells = false })
 *     words: the grid forms (letters as printed). A multi-start greedy on an UNBOUNDED map (the old app's fixed 15 × 15 was
 *     why it dropped words): longest first (ties by the seed), the first across at the origin, every next word at its best
 *     legal crossing — legal = each cell empty or the same letter, the cells before and after the word empty, no new
 *     letter beside a letter of a parallel word (the old app's adjacency rules), a crossing only with a word of the other
 *     direction; best = most crossings, then the smallest box. A word with no crossing waits and is tried once more at the
 *     end. clueCells (arrow-words): the cell before each word is its clue cell — kept empty of letters, never shared.
 *     → the best start's { entries: [{ word, r, c, dir: 'A'|'D', clue?: [r, c] }], unplaced: [word], rows, cols } (the box
 *       moved to 0,0), or null. Connectivity is by construction (every word after the first crosses one).
 *   number(entries)  reading-order numbers on the start cells (an across and a down from one cell share a number)
 */
'use strict';

function tryLayout(words, rng, clueCells) {
  const cells = new Map(), owner = new Map(), clues = new Set(), entries = [];
  const key = (r, c) => r + ',' + c;
  const at = (r, c) => cells.get(key(r, c));
  const order = rng.shuffle(words.map((w, i) => i)).sort((a, b) => [...words[b]].length - [...words[a]].length);
  const legal = (w, r, c, dir) => {
    const ch = [...w], dr = dir === 'D' ? 1 : 0, dc = dir === 'A' ? 1 : 0;
    const before = [r - dr, c - dc], after = [r + dr * ch.length, c + dc * ch.length];
    if (at(...before) != null || at(...after) != null) return null;
    if (clueCells && clues.has(key(...before))) return null;            // one clue a clue cell
    let crossings = 0;
    for (let i = 0; i < ch.length; i++) {
      const y = r + dr * i, x = c + dc * i, g = at(y, x);
      if (clueCells && clues.has(key(y, x))) return null;
      if (g != null) {
        if (g !== ch[i]) return null;
        if ((owner.get(key(y, x)) || []).includes(dir)) return null;     // the same direction: words would run together
        crossings++;
      } else if (at(y - dc, x - dr) != null || at(y + dc, x + dr) != null) return null;   // a letter beside a new letter
    }
    if (clueCells) for (const e of entries) if (e.clue && e.clue[0] === before[0] && e.clue[1] === before[1]) return null;
    return { crossings };
  };
  const put = (w, r, c, dir) => {
    const ch = [...w], dr = dir === 'D' ? 1 : 0, dc = dir === 'A' ? 1 : 0;
    for (let i = 0; i < ch.length; i++) { const k = key(r + dr * i, c + dc * i); cells.set(k, ch[i]); owner.set(k, (owner.get(k) || []).concat(dir)); }
    const e = { word: w, r, c, dir };
    if (clueCells) { e.clue = [r - dr, c - dc]; clues.add(key(...e.clue)); }
    entries.push(e);
  };
  const box = () => {
    let r0 = Infinity, r1 = -Infinity, c0 = Infinity, c1 = -Infinity;
    const all = [...cells.keys()].map((k) => k.split(',').map(Number)).concat([...clues].map((k) => k.split(',').map(Number)));
    for (const [r, c] of all) { r0 = Math.min(r0, r); r1 = Math.max(r1, r); c0 = Math.min(c0, c); c1 = Math.max(c1, c); }
    return { r0, r1, c0, c1, area: (r1 - r0 + 1) * (c1 - c0 + 1) };
  };
  const best = (w) => {
    let pick = null;
    const ch = [...w];
    for (const [k, g] of cells) {
      const [y, x] = k.split(',').map(Number);
      for (let i = 0; i < ch.length; i++) {
        if (ch[i] !== g) continue;
        for (const dir of ['A', 'D']) {
          const r = dir === 'D' ? y - i : y, c = dir === 'A' ? x - i : x;
          const l = legal(w, r, c, dir);
          if (!l || !l.crossings) continue;
          put(w, r, c, dir); const b = box(); entries.pop();
          // undo the put
          for (let j = 0; j < ch.length; j++) { const kk = (dir === 'D' ? r + j : r) + ',' + (dir === 'A' ? c + j : c); const o = owner.get(kk); if (o.length === 1) { cells.delete(kk); owner.delete(kk); } else owner.set(kk, o.slice(0, -1)); }
          if (clueCells) clues.delete((dir === 'D' ? r - 1 : r) + ',' + (dir === 'A' ? c - 1 : c));
          const sc = l.crossings * 1000 - b.area;
          if (!pick || sc > pick.sc) pick = { r, c, dir, sc };
        }
      }
    }
    return pick;
  };
  const first = words[order[0]];
  put(first, 0, clueCells ? 1 : 0, 'A');
  const waiting = [];
  for (const wi of order.slice(1)) { const p = best(words[wi]); if (p) put(words[wi], p.r, p.c, p.dir); else waiting.push(wi); }
  const unplaced = [];
  for (const wi of waiting) { const p = best(words[wi]); if (p) put(words[wi], p.r, p.c, p.dir); else unplaced.push(words[wi]); }
  const b = box();
  const crossings = [...owner.values()].filter((o) => o.length > 1).length;
  return { entries: entries.map((e) => ({ ...e, r: e.r - b.r0, c: e.c - b.c0, ...(e.clue ? { clue: [e.clue[0] - b.r0, e.clue[1] - b.c0] } : {}) })), unplaced, rows: b.r1 - b.r0 + 1, cols: b.c1 - b.c0 + 1, crossings, area: b.area };
}

function layout(words, { rng, starts = 64, clueCells = false, maxRows = 99, maxCols = 99 }) {
  let best = null;
  for (let s = 0; s < starts; s++) {
    const L = tryLayout(words, rng, clueCells);
    const fits = L.rows <= maxRows && L.cols <= maxCols;
    const score = (fits ? 1e9 : 0) - L.unplaced.length * 1e6 + L.crossings * 1000 - L.area;
    if (!best || score > best.score) best = { ...L, score, fits };
    if (!L.unplaced.length && fits && s >= 16) break;
  }
  return best && best.fits ? best : null;
}

function number(entries) {
  const starts = [...new Set(entries.map((e) => e.r + ',' + e.c))].map((k) => k.split(',').map(Number)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const num = new Map(starts.map(([r, c], i) => [r + ',' + c, i + 1]));
  return entries.map((e) => ({ ...e, n: num.get(e.r + ',' + e.c) }));
}

module.exports = { layout, number };
