/**
 * K-236 — Pre-writing stroke practice (de Schwungübungen — a monster German
 * search term; fr graphisme GS; es grafomotricidad; it pregrafismo). Full-
 * width lanes: first repetition solid teal (the model), then dashed traces
 * with the coral start-dot + arrowhead on the first trace. A theme icon
 * waits at lane end — "help the pencil reach the bee" narrative for free.
 * Line quality IS the pedagogy: dash ≥2.5px, lanes ≥90px tall (arm
 * movement, not finger movement). d1: gentle strokes · d2: standard set ·
 * d3: loops + castle (the hardest pencil paths).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { strokeLane } = require('../../primitives/trace-path.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { distinctPictures } = require('../../lib/distinct-pictures.js');

const SETS = {
  1: ['line', 'zigzag', 'bumps', 'wave'],
  2: ['zigzag', 'wave', 'bumps', 'cups', 'mountains'],
  3: ['mountains', 'castle', 'wave', 'loops', 'zigzag'],
};

module.exports = {
  id: 'K-236',
  slug: 'pre-writing-strokes',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'pre-writing',
  themeAxis: { applicable: true, minNouns: 4, decorative: true },
  difficulty: {
    // Level Set 2026-09-29: d1 / d3 never shipped (published = d2). The levels FADE the trace (level audit):
    // d1 every repetition dashed, bigger lanes · d2 published · d3 model, one trace, then start dots only
    1: { reps: 3, n: 3, laneH: 120, fade: 'all' },
    2: { reps: 4, n: 4, laneH: 100 },
    3: { reps: 4, n: 5, laneH: 100, fade: 'fade' },
  },
  i18n: {
    en: {
      title: 'Pencil Path Practice',
      instruction: 'Trace each line with your pencil. Start at the orange dot and follow the arrow.',
    },
  },

  build({ theme, difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const strokes = d.strokes || SETS[difficulty]; // nt20-VAR: variation specs pin their own stroke set
    // new pages (a `fade` level) never show one picture twice under two names; the published levels keep their pool
    const nouns = d.fade ? distinctPictures(theme, labelSafeNouns(theme)) : labelSafeNouns(theme);
    if (nouns.length < this.themeAxis.minNouns) {
      throw new Error(`K-236: theme ${theme} has ${nouns.length} nouns < min`);
    }
    const picks = rng.sample(nouns, strokes.length);
    const iconPx = 56;
    const laneW = 675 - 24 - iconPx - 14 - 10; // card padding + icon + gaps

    // Level Set 2026-09-29 (new pages only — `fade` is never set on a published level): the trace FADES by level
    // ('all' = every repetition dashed with its own start dot; 'fade' = model, one dashed trace, then start dots
    // only), and each copy changes the rhythm (marks per repetition) so a new copy is a different line to draw
    const modes = d.fade === 'all' ? Array(d.reps).fill('trace')
      : d.fade === 'fade' ? ['model', 'trace', ...Array(d.reps - 2).fill('dot')]
      : d.fade === 'core' ? ['model', ...Array(d.reps - 1).fill('trace')] : null;   // core (new variations only): model + dashed traces, each with its start dot
    const cards = strokes.map((key, i) => {
      // the rhythm varies by one mark either way; castle walls stay open (≤ 4), loops keep their 3
      const cap = key === 'castle' ? 4 : 6;
      const n = modes ? Math.min(cap, Math.max(2, d.n + (((ctx.variant || 1) + i) % 3) - 1)) : d.n;
      const lane = strokeLane({ stroke: key, w: laneW, h: d.laneH, reps: d.reps, n, ...(modes ? { modes } : {}) });
      return (
        `<div class="ws-trace-lane ws-card-stage" style="flex-direction:row;gap:14px;justify-content:space-between" data-lcs-stroke-key="${key}">` +
        lane.svg +
        `<img class="ws-icon" src="${fileUri(theme, picks[i].noun)}" alt="" data-lcs-noun="${picks[i].vocabKey}" ` +
        `style="width:${iconPx}px;height:${iconPx}px;flex:0 0 auto">` +
        `</div>`
      );
    });
    return { bodyHtml: cardGrid({ cards, cols: 1, rows: strokes.length }), meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const lanes = document.querySelectorAll('[data-lcs-stroke-key]');
      if (lanes.length < 4) fails.push(`only ${lanes.length} lanes`);
      const seen = new Set();
      lanes.forEach((lane, i) => {
        const key = lane.dataset.lcsStrokeKey;
        if (seen.has(key)) fails.push(`lane ${i + 1}: duplicate stroke ${key}`);
        seen.add(key);
        const svg = lane.querySelector('[data-lcs-prim="trace-stroke"]');
        if (!svg) { fails.push(`lane ${i + 1}: no stroke svg`); return; }
        // Level Set fading lane: every repetition is what its stamp says it is
        if (svg.dataset.lcsModes) {
          const want = svg.dataset.lcsModes.split(',');
          const reps = [...svg.querySelectorAll('g[data-lcs-rep-mode]')];
          if (reps.length !== want.length || reps.some((g, k) => g.dataset.lcsRepMode !== want[k])) fails.push(`lane ${i + 1}: reps do not match ${want}`);
          if (want.length < 3) fails.push(`lane ${i + 1}: only ${want.length} reps`);
          reps.forEach((g, k) => {
            const m = g.dataset.lcsRepMode, ps = g.querySelectorAll('path'), dot = g.querySelector('circle');
            if (m === 'dot') { if (ps.length) fails.push(`lane ${i + 1} rep ${k + 1}: a dot-only rep draws the line`); if (!dot) fails.push(`lane ${i + 1} rep ${k + 1}: no start dot`); return; }
            if (ps.length !== 1) { fails.push(`lane ${i + 1} rep ${k + 1}: ${ps.length} paths`); return; }
            const dashed = !!ps[0].getAttribute('stroke-dasharray');
            if ((m === 'model') === dashed) fails.push(`lane ${i + 1} rep ${k + 1}: ${m} drawn ${dashed ? 'dashed' : 'solid'}`);
            if (m === 'trace' && parseFloat(ps[0].getAttribute('stroke-width')) < 2.5) fails.push(`lane ${i + 1}: dash below 2.5px`);
            if (m === 'trace' && !dot) fails.push(`lane ${i + 1} rep ${k + 1}: trace without start dot`);
          });
          if (!lane.querySelector('img[data-lcs-noun]')) fails.push(`lane ${i + 1}: no destination icon`);
          return;
        }
        if (+svg.dataset.lcsReps < 3) fails.push(`lane ${i + 1}: only ${svg.dataset.lcsReps} reps`);
        const paths = svg.querySelectorAll('path');
        if (paths.length !== +svg.dataset.lcsReps) fails.push(`lane ${i + 1}: ${paths.length} paths != reps`);
        // exactly one solid model (teal), the rest dashed
        const dashed = [...paths].filter((p) => p.getAttribute('stroke-dasharray'));
        if (dashed.length !== paths.length - 1) fails.push(`lane ${i + 1}: ${dashed.length} dashed of ${paths.length}`);
        // dash floor — line quality IS the pedagogy
        dashed.forEach((p) => {
          if (parseFloat(p.getAttribute('stroke-width')) < 2.5) fails.push(`lane ${i + 1}: dash below 2.5px`);
        });
        if (!svg.querySelector('circle')) fails.push(`lane ${i + 1}: no start dot`);
        if (!lane.querySelector('img[data-lcs-noun]')) fails.push(`lane ${i + 1}: no destination icon`);
      });
      return fails;
    });
  },
};
