/**
 * K-435 — Sight Word: Read and Draw (maker template, 2026-10-31). One sight word per page:
 *   the word and one bank sentence that uses it; the sentence traced; a big frame to draw what the sentence says
 *   (drawing makes the child read for meaning, not just copy); level 3 also writes the sentence alone.
 *   level 1: traced once   level 2: traced twice   level 3: traced once + written once
 * Only DRAWABLE sentences (native + pedagogy review 2026-10-31): a picture-vocabulary noun, no question, no negation
 * (P.drawable). A word with no drawable sentence is not offered on this template (unitAxis below).
 */
'use strict';
const P = require('../_shared/sight-word-pages.js');
const { SW } = P;
const { strokeWordLane, writingRow } = require('../../primitives/trace-path.js');

const W = 660;
// a drawable sentence that can also be traced (at 28 px or more) at every level's lane — else the word is not offered
const LANES = [{ h: 96, glyphH: 58 }, { h: 88, glyphH: 52 }, { h: 86, glyphH: 50 }];
const drawableOf = (word, loc) => SW.sentencesOf(word, loc).filter((s) => P.drawable(s, loc) && LANES.every((l) => SW.tracedGlyphH(s, { w: 660, h: l.h, glyphH: l.glyphH }) >= 28));

const unitAxis = {
  applicable: true,
  units: (loc) => SW.unitIds(loc).filter((id) => drawableOf(SW.wordOf(id, loc), loc).length > 0),
  exemplar: (loc) => SW.unitIds(loc).find((id) => drawableOf(SW.wordOf(id, loc), loc).length > 0),
  tokens: SW.unitAxis.tokens,
};

module.exports = {
  id: 'K-435',
  slug: 'sight-word-draw-and-write',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis,
  difficulty: {
    1: { traced: 1, laneH: 96, glyphH: 58, minGlyph: 36, write: false },
    2: { traced: 2, laneH: 88, glyphH: 52, minGlyph: 32, write: false },
    3: { traced: 1, laneH: 86, glyphH: 50, minGlyph: 30, write: true },
  },
  i18n: { en: { title: 'Read and Draw: {UNIT}', instruction: 'Read the sentence. Trace it. Then draw what the sentence says.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || unitAxis.exemplar(loc), loc);
    const draw = (s) => P.drawable(s, loc);
    if (!drawableOf(word, loc).length) throw new Error(`K-435: no drawable sentence for "${word}" (${loc})`);
    // the largest tracing size a drawable sentence of this word fits at: the level's own first, then smaller (floor 28 px)
    let sentence = null;
    for (let min = d.minGlyph; !sentence && min >= 28; min -= 2) {
      const ok = (s) => draw(s) && SW.tracedGlyphH(s, { w: W, h: d.laneH, glyphH: d.glyphH }) >= min;
      if (SW.sentencesOf(word, loc).some(ok)) [sentence] = SW.pickSentences(word, loc, { n: 1, level: difficulty, rng: ctx.rng, accept: ok });
    }
    if (!sentence) throw new Error(`K-435: no drawable sentence of "${word}" (${loc}) can be traced at 28 px`);
    const parts = [
      `<div style="display:flex;align-items:center;gap:18px">` +
        `<div data-lcs-frame>${SW.wordBox(word, 64)}</div>` +
        `<div data-lcs-frame data-lcs-model-sentence="${P.esc(sentence)}" style="flex:1;border:2.5px solid ${P.INK};border-radius:14px;padding:12px 18px;font-family:${P.FONT_B};font-weight:700;font-size:26px;line-height:1.3;color:${P.INK}">${P.esc(sentence)}</div></div>`,
      SW.sectionLabel(SW.label('traceSentence', loc)),
    ];
    for (let i = 0; i < d.traced; i++) parts.push(`<div class="ws-trace-lane" data-lcs-trace-sentence="${P.esc(sentence)}">${strokeWordLane({ text: sentence, w: W, h: d.laneH, glyphH: d.glyphH, reps: 1, stack: true, modelless: true }).svg}</div>`);
    if (d.write) parts.push(SW.sectionLabel(SW.label('writeSentence', loc)), `<div data-lcs-own>${writingRow({ w: W, h: d.laneH, glyphH: d.glyphH, xHeight: true }).svg}</div>`);
    parts.push(SW.sectionLabel(SW.label('draw', loc)));
    // the drawing frame takes every pixel the rows leave (flex 1): a drawing wants room
    parts.push(`<div data-lcs-frame data-lcs-draw style="flex:1 1 auto;min-height:220px;border:3px dashed ${P.TEAL};border-radius:18px;background:#FFFFFF"></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${P.esc(word)}" style="flex:1;display:flex;flex-direction:column;gap:10px">${parts.join('')}</div>`,
      meta: { word, sentence },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu');
      const model = document.querySelector('[data-lcs-model-sentence]');
      if (!model || !re.test(model.dataset.lcsModelSentence)) fails.push('the sentence does not carry the word');
      if (model && /[?¿]/.test(model.dataset.lcsModelSentence)) fails.push('a question cannot be drawn');
      const lanes = [...document.querySelectorAll('[data-lcs-trace-sentence]')];
      if (!lanes.length) fails.push('no traced sentence');
      lanes.forEach((l, i) => {
        const svg = l.querySelector('[data-lcs-prim="trace-word"]');
        if (!svg || svg.dataset.lcsText !== (model && model.dataset.lcsModelSentence)) fails.push(`row ${i + 1} traces something else`);
      });
      const draw = document.querySelector('[data-lcs-draw]');
      if (!draw || draw.getBoundingClientRect().height < 220) fails.push('the drawing frame is missing or too small');
      return fails;
    });
  },
};
