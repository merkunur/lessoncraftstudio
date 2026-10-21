'use strict';
/**
 * K-418 `picture-tracing` — the nineteen variation faces (b9 Picture Tracing). Contract:
 * docs/worksheet-gen/b9-designs/K-418-picture-tracing.md §3. Every face is a CODE face on ONE additive knob read by the
 * base spec types/k/K-418-picture-tracing.js: `mode` (the strings, the scene in data/b9/face-scenes.js, the band).
 * EN strings === data/b9/picture-tracing.js EN_STRINGS[<mode>] (the bank is the source; the row reads it).
 * Ids FIXED by _records/b9var-id-allocation.json (tools/alloc-b9var-ids.js, §3 file order).
 */
const BASE = 'K-418-picture-tracing.js';
const { FACES, EN_STRINGS } = require('../../data/b9/picture-tracing.js');

/** mode → the spec's file slug (descriptive, English; the deck slug comes from the taxonomy + variant_id, never this) */
const FILE_SLUG = {
  'first-tracing': 'my-first-tracing-whale', 'look-then-trace': 'look-then-trace', 'round-and-round': 'round-and-round-tracing',
  'straight-lines': 'straight-line-picture-tracing', zigzags: 'zigzag-picture-tracing', curls: 'curls-and-spirals-tracing',
  'trace-and-color': 'trace-and-color-picnic', 'where-to-start': 'where-do-i-start-tracing', 'trace-and-count': 'trace-and-count-ducks',
  'finish-the-picture': 'finish-the-picture-tracing', christmas: 'christmas-picture-tracing', 'shape-picture': 'shape-picture-tracing',
  'summer-sea': 'summer-sea-picture-tracing', 'big-middle-small': 'big-middle-small-tracing', 'dotted-street': 'dotted-picture-tracing-street',
  'picture-and-word': 'trace-the-picture-and-word', 'trace-and-draw': 'trace-then-draw-trailer', 'other-half': 'symmetry-picture-tracing',
  'hidden-animals': 'find-and-trace-hidden-animals',
};
const DIR = { K: 'k', PreK: 'k', G1: 'g1' };

// dir · id · fileSlug · baseFile · srcLevel · overrides · EN title · EN instruction · extra
const ROWS = Object.entries(FACES)
  .filter(([mode]) => mode !== 'base')
  .map(([mode, f]) => {
    const S = EN_STRINGS[mode];
    const extra = { printTitle: S.printTitle };
    if (f.band === 'G1') extra.gradeBand = 'G1';
    return [DIR[f.band], f.id, FILE_SLUG[mode], BASE, 2, { mode }, S.title, S.instruction, extra];
  });
const HANDWRITTEN = [];
module.exports = { ROWS, HANDWRITTEN, FILE_SLUG };
