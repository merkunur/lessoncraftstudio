/**
 * Two-mirror-line pictures (G2-479 Symmetry with Two Mirror Lines, Symmetry & Grid Copy maker 2026-11-02). Each entry is
 * the TOP-LEFT quarter of a picture (its bottom-right corner touches the centre of the page's grid); the picture is that
 * quarter mirrored across the vertical line and the horizontal line, so it is the same on both sides of each. Hand-drawn:
 * window, snowflake, flower, diamond, plus, ring, sun, block patterns. '.' empty · '#' filled.
 *
 * Validated at load: square, the size of its set, at least five squares, and touching BOTH the vertical line (its last
 * column) and the horizontal line (its last row), so each picture is one picture across the lines, not four apart.
 *   q4 — 8 × 8 pictures (level 1) · q5 — 10 × 10 (level 2) · q6 — 12 × 12 (level 3)
 */
'use strict';

const QUARTERS = {
  q4: [
    { key: 'diamond', rows: ['...#', '..##', '.###', '####'] },
    { key: 'plus', rows: ['..##', '..##', '####', '####'] },
    { key: 'window', rows: ['####', '#..#', '#..#', '####'] },
    { key: 'ring', rows: ['.###', '#...', '#...', '#...'] },
    { key: 'blocks', rows: ['##..', '##..', '..##', '..##'] },
    { key: 'star', rows: ['#..#', '.#.#', '..##', '####'] },
  ],
  q5: [
    { key: 'snowflake', rows: ['#....', '.#..#', '..#.#', '...##', '.####'] },
    { key: 'diamond', rows: ['....#', '...##', '..###', '.####', '#####'] },
    { key: 'window', rows: ['#####', '#...#', '#...#', '#...#', '#####'] },
    { key: 'flower', rows: ['.##..', '####.', '####.', '.##.#', '...##'] },
    { key: 'plus', rows: ['...##', '...##', '...##', '#####', '#####'] },
    { key: 'sun', rows: ['#...#', '.#..#', '..###', '..###', '#####'] },
    { key: 'bow', rows: ['#####', '.####', '..###', '...##', '....#'] },
    { key: 'ring', rows: ['..###', '.#...', '#....', '#....', '#....'] },
  ],
  q6: [
    { key: 'asterisk', rows: ['#....#', '.#...#', '..#..#', '...#.#', '....##', '######'] },
    { key: 'diamond-line', rows: ['.....#', '....#.', '...#..', '..#...', '.#....', '#.....'] },
    { key: 'flower', rows: ['..##..', '.####.', '.####.', '..##.#', '.....#', '....##'] },
    { key: 'blocks', rows: ['##....', '##....', '..##..', '..##..', '....##', '....##'] },
    { key: 'diamond', rows: ['.....#', '....##', '...###', '..####', '.#####', '######'] },
    { key: 'target', rows: ['..####', '.#....', '#.....', '#.....', '#...##', '#...##'] },
  ],
};

for (const [set, list] of Object.entries(QUARTERS)) {
  const m = +set.slice(1);
  const keys = new Set();
  for (const q of list) {
    if (keys.has(q.key)) throw new Error(`two-axis: ${set} ${q.key} twice`);
    keys.add(q.key);
    if (q.rows.length !== m || q.rows.some((r) => r.length !== m || /[^.#]/.test(r))) throw new Error(`two-axis: ${set} ${q.key} is not ${m} × ${m}`);
    const n = q.rows.join('').split('#').length - 1;
    if (n < 5) throw new Error(`two-axis: ${set} ${q.key} has ${n} squares`);
    if (!q.rows.some((r) => r[m - 1] === '#') || !q.rows[m - 1].includes('#')) throw new Error(`two-axis: ${set} ${q.key} does not reach both mirror lines`);
  }
}

/** the whole picture (2m × 2m rows) from a quarter: mirrored across the vertical and the horizontal line */
function wholeOf(q) {
  const half = q.rows.map((r) => r + r.split('').reverse().join(''));
  return half.concat(half.slice().reverse());
}

module.exports = { QUARTERS, wholeOf };
