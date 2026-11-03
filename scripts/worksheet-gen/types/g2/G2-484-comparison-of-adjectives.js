/**
 * G2-484 — Comparison of Adjectives (Grammar maker 2026-11-02, NEW-TEMPLATES §45 T1; L.3.1.g comparative and
 * superlative; de "Steigerung", fr "comparatif et superlatif", sv "komparation"): each row an adjective and the boxes for
 * its comparative and superlative, three bars that grow under the three forms. The forms are literals per locale
 * (data/grammar/grammar-tables.js COMPARISON — es / pt / it / fr periphrastic "más grande / el más grande", de "am
 * größten"; never a computed ending), the irregulars only at level 3. Every box is an answer box holding its form.
 * A worked example (one regular adjective, all three forms) heads every page: the forms asked are the example's.
 * Levels: 1 six adjectives, the comparative only · 2 six adjectives, both forms · 3 six adjectives, both forms, up to two
 * irregular ones among them.
 */
'use strict';
const slot = require('../../lib/slot.js');
const { COMPARISON } = require('../../data/grammar/grammar-tables.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { rows: 6, both: false, irregular: 0 }, 2: { rows: 6, both: true, irregular: 0 }, 3: { rows: 6, both: true, irregular: 2 } };

module.exports = {
  id: 'G2-484',
  slug: 'comparison-of-adjectives',
  gradeBand: 'G2',
  assetClass: 'none',
  exerciseType: 'word-classes',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Big, Bigger, Biggest', instruction: 'Write the two missing forms of each adjective, as in the example.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const table = COMPARISON[L];
    if (!table) throw new Error(`G2-484: no comparison table for ${L}`);
    const regular = rng.shuffle(table.filter((r) => !r[3])), irregular = rng.shuffle(table.filter((r) => r[3]));
    // the worked example: one regular adjective with both forms printed, so the forms asked are the ones the example
    // shows (es / pt / it also teach altísimo, fr très grand: without a model those would be right too — review)
    const example = regular.shift();
    // as many irregulars as the language has, up to the level's two (it has none: più buono / ottimo are two right answers)
    const nIrr = Math.min(d.irregular, irregular.length);
    const rows = rng.shuffle([...irregular.slice(0, nIrr), ...regular.slice(0, d.rows - nIrr)]);
    if (rows.length < d.rows) throw new Error(`G2-484: ${L} has ${rows.length} adjectives (< ${d.rows})`);
    // a teacher's adjectives (maker): a regular one for a regular one, an irregular for an irregular (never the worked example)
    const tag = (r) => ({ r, word: r[0] });
    const KS = slot.byKind(ctx, rows.map(tag), (x) => (x.r[3] ? 'irr' : 'reg'), (k) => (k === 'irr' ? irregular : regular).map(tag), { words: true, prefix: 'a' });
    KS.items.forEach((x, i) => { rows[i] = x.r; });
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const longest = Math.max(...[example, ...rows].flatMap((r) => r.slice(0, 3)).map((w) => [...w].length));
    const cellW = Math.min(210, Math.max(150, longest * 14 + 28));
    const altsOf = (r, k) => ((r[4] && r[4][k]) || []).join('|');
    const box = (w, alts) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${w}"${alts ? ` data-lcs-alts="${alts}"` : ''}` : ''} style="display:inline-flex;width:${cellW}px;height:46px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span>`;
    const bar = (k) => `<span style="display:block;margin:6px auto 0;width:${18 + k * 22}px;height:10px;border-radius:5px;background:${T.teal};opacity:${0.45 + k * 0.25}"></span>`;
    // the worked example: the three forms filled in, in a solid frame (no box to write in)
    const filled = (w) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:${cellW}px;height:46px;box-sizing:border-box;border:2.5px solid ${T.teal};border-radius:10px;background:#FFFFFF;font:700 24px/1 'Baloo 2',cursive;color:${T.teal}">${w}</span>`;
    const exampleHtml = `<div data-lcs-compare-example="${example[0]}" style="display:flex;align-items:flex-start;justify-content:center;gap:14px;padding:8px 10px;border:2.5px dashed ${T.teal};border-radius:14px">` +
      [0, 1, 2].map((k) => `<div style="width:${cellW}px;text-align:center">${k ? filled(example[k]) : `<span style="display:inline-flex;align-items:center;justify-content:center;height:46px;font:700 24px/1 'Baloo 2',cursive;color:${T.teal}">${example[0]}</span>`}${bar(k)}</div>`).join('') + '</div>';
    const html = rows.map((r, ri) => `<div data-lcs-compare="${r[0]}"${KS.tap(ri)} style="display:flex;align-items:flex-start;justify-content:center;gap:14px;padding:8px 10px;border-radius:14px;background:${T.cream}">` +
      `<div style="width:${cellW}px;text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;height:46px;font:700 24px/1 'Baloo 2',cursive;color:${T.ink}">${r[0]}</span>${bar(0)}</div>` +
      `<div style="width:${cellW}px;text-align:center">${box(r[1], altsOf(r, 'comp'))}${bar(1)}</div>` +
      `<div style="width:${cellW}px;text-align:center">${d.both ? box(r[2], altsOf(r, 'sup')) : `<span style="display:inline-flex;align-items:center;justify-content:center;height:46px;font:700 24px/1 'Baloo 2',cursive;color:${T.ink}">${r[2]}</span>`}${bar(2)}</div></div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-comparison style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${exampleHtml}${html.join('')}</div>`,
      meta: { example: example.slice(0, 3).join(' · '), rows: rows.map((r) => r.slice(0, 3).join(' · ')) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-compare]')];
      if (rows.length < 6) fails.push(`${rows.length} rows`);
      const root = document.querySelector('[data-lcs-comparison]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.left < root.left - 1) fails.push(`row ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
