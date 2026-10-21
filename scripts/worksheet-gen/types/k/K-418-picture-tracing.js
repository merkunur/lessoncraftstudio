/**
 * K-418 — Picture Tracing (b9 flagship; docs/worksheet-gen/b9-designs/K-418-picture-tracing.md). PDF ONLY: no screen,
 * no answer key.
 *
 * The page: one composed scene (data/b9/scenes.js) in which the image library's own B&W drawings are redrawn as tracing
 * guides that lie ON their own lines (lib/pt-trace.js: thinned centre lines, nothing to erase), with the scene elements
 * the library lacks drawn as vector motifs in its style (lib/pt-motifs.js); things in front hide what is behind them
 * (lib/pt-scene.js). The band (PreK / K / G1) sets the guide (P1 thick dashes … P4 dots) and the band rules of the
 * pedagogy contract: a detail too short or too crowded to trace at that band prints solid (lib/pt-render.js classify).
 *
 * One additive knob `mode` (the face: strings + layout) and `scene` (the composition) per face; the faces are rows in
 * tools/b9var-rows/picture-tracing.js. Nothing is sampled: a face's page is fully determined by its scene.
 */
'use strict';
const { composeScene } = require('../../lib/pt-scene.js');
const { sceneFor } = require('../../data/b9/face-scenes.js');
const { EN_STRINGS } = require('../../data/b9/picture-tracing.js');

const D = {
  1: { mode: 'base' },
  2: { mode: 'base' },
  3: { mode: 'base' },
};

module.exports = {
  id: 'K-418',
  slug: 'picture-tracing',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-tracing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: {
    en: { title: EN_STRINGS.base.title, printTitle: EN_STRINGS.base.printTitle, instruction: EN_STRINGS.base.instruction },
  },

  async build({ difficulty, locale }) {
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const loc = String(locale || 'en').slice(0, 2);
    // F17 prints the locale's OWN four picture names (the bank's `words`; a locale without them REFUSES, never English)
    let words;
    if (d.mode === 'picture-and-word') {
      const blk = loc === 'en' ? require('../../data/b9/picture-tracing.js').PICTURE_TRACING.en : require('../../lib/b9-common.js').bank('picture-tracing', loc);
      words = blk.words;
      if (!words || words.length !== 4) throw new Error('K-418: no picture words for ' + loc);
    }
    const sc = sceneFor(d.mode, { words });
    if (!sc) throw new Error('K-418: no scene for mode ' + d.mode);
    const out = await composeScene(sc);
    if (out.problems.length) throw new Error('K-418: scene ' + d.mode + ': ' + out.problems.join('; '));
    const bodyHtml = `<div data-ws-content data-lcs-pt-mode="${d.mode}" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">${out.svg}</div>`;
    return { bodyHtml, meta: { mode: d.mode, pictures: out.placed.filter((p) => !p.motif).map((p) => p.src), metrics: out.metrics } };
  },

  /** the rendered page against the band rules (pedagogy contract §1 + the engine's traced-length budget) */
  async verify(page) {
    const info = await page.evaluate(() => {
      const svg = document.querySelector('svg[data-lcs-prim="pt-scene"]');
      if (!svg) return null;
      const body = document.querySelector('[data-ws-content]');
      const r = svg.getBoundingClientRect();
      const words = (body ? body.textContent : '').replace(/\s+/g, ' ').trim();
      return { m: JSON.parse(svg.getAttribute('data-lcs-pt-metrics') || '{}'), h: r.height, words, allowText: svg.hasAttribute('data-lcs-pt-words') };
    });
    if (!info) return ['no picture-tracing scene'];
    return checkMetrics(info.m, { renderedH: info.h, words: info.words, allowText: info.allowText });
  },
};

/** the band rules on a scene's measurements → failure strings (shared by verify() and the family gate) */
const BUDGET = { PreK: 4500, K: 11000, G1: 15000 };
const MINPIC = { PreK: 300, K: 130, G1: 80 };
function checkMetrics(m, o = {}) {
  const f = [];
  if (!m || !m.band) return ['the scene declares no band'];
  if (m.tracedLen > BUDGET[m.band]) f.push(`traced length ${m.tracedLen} px over the ${m.band} budget ${BUDGET[m.band]}`);
  if (m.pictures && m.minPic < (o.minPic || MINPIC[m.band])) f.push(`a traced picture is ${m.minPic} px, under the ${m.band} floor ${o.minPic || MINPIC[m.band]}`);
  if (m.extent && m.extent.y1 - m.extent.y0 < 600) f.push(`the scene fills only ${m.extent.y1 - m.extent.y0} px of the body (≥ 600)`);
  if (o.words && !o.allowText) f.push('text in the picture body: "' + o.words.slice(0, 40) + '"');
  return f;
}
module.exports.checkMetrics = checkMetrics;
module.exports.BUDGET = BUDGET;
