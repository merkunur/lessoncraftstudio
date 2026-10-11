'use strict';
/**
 * K-405 `maze-puzzles` — the nineteen variation faces (b8 Handmade Mazes). Contract:
 * docs/worksheet-gen/b8-designs/K-405-maze-puzzles.md §3. Every face is a CODE face on two additive knobs read by the
 * base spec types/k/K-405-maze-puzzles.js: `mode` (the strings + the screen's tap key) and `scene` (data/hm/scenes.js:
 * the drawn scene, its maze generator and its gates). The base (mode 'base') stays byte-identical.
 * EN strings === data/b8/maze-puzzles.js MAZE_PUZZLES.en.strings[<mode>] (the bank is the source; the row reads it).
 * Ids FIXED by _records/b8var-id-allocation.json (tools/alloc-b8var-ids.js, file order of the FINAL).
 * A face joins ROWS when its scene exists (FACES[mode].scene !== null); the five special generators (burrow,
 * shortest-way, babies-mothers, tangled-lines, letter-hop) join as they land.
 */
const BASE = 'K-405-maze-puzzles.js';
const { FACES, EN_STRINGS } = require('../../data/b8/maze-puzzles.js');

/** mode → the spec's file slug (descriptive, English; the deck slug comes from the taxonomy + variant_id, never this) */
const FILE_SLUG = {
  'first-maze': 'my-first-maze', 'big-maze': 'big-picture-maze', river: 'river-maze', burrow: 'underground-maze',
  'shortest-way': 'town-maze-shortest-way', 'babies-mothers': 'babies-and-mothers-maze', 'tangled-lines': 'tangled-lines-puzzle',
  collect: 'collect-the-carrots-maze', avoid: 'avoid-the-walruses-maze', 'abc-capitals': 'alphabet-maze-capitals',
  'abc-lowercase': 'lowercase-letter-maze', 'letter-hop': 'abc-order-letter-hop', 'numbers-20': 'number-maze-1-to-20',
  'skip-5': 'skip-counting-maze-by-5s', 'make-10': 'addition-maze-make-10', 'subtract-20': 'subtraction-maze-within-20',
  'first-sound': 'beginning-sounds-maze', 'running-total': 'math-maze-within-100', 'maze-colouring': 'maze-colouring-page',
};
const DIR = { K: 'k', G1: 'g1', G2: 'g2' };

// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = Object.entries(FACES)
  .filter(([mode, f]) => mode !== 'base' && f.scene)
  .map(([mode, f]) => {
    const S = EN_STRINGS[mode];
    const extra = { printTitle: S.printTitle };
    if (f.band !== 'K') extra.gradeBand = f.band;
    return [DIR[f.band], f.id, FILE_SLUG[mode], BASE, 2, { mode, scene: f.scene }, S.title, S.instruction, extra];
  });
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN, FILE_SLUG };
