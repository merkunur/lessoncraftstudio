/**
 * G2-488 — Which Title Fits? (Reading maker 2026-11-02, NEW-TEMPLATES §48 T3; RL.2.2 / RI.2.2 the main topic; de "die
 * passende Überschrift", fr "trouve le titre"): passages printed without their titles, each with three titles to choose
 * from; the child circles the title that fits. The right title is the passage's own (native banks: data/reading/reading-
 * new.js passagesFor); the other two are titles of other passages of the bank — never one that shares a word of four or
 * more letters with the right title (A Card for Mom / Breakfast for Mom: two passages about the same person), never one
 * shown twice on the page. The right title stands in each place as often as the page allows. Each title is a choice;
 * the right one is ringed on the key.
 * Levels: 1 two short passages · 2 two passages · 3 two longer passages.
 */
'use strict';
const { passagesFor, titleTouches } = require('../../data/reading/reading-new.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 2, font: 19 }, 2: { n: 2, font: 18 }, 3: { n: 2, font: 16 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

module.exports = {
  id: 'G2-488',
  slug: 'which-title-fits',
  gradeBand: 'G2',
  assetClass: 'none',
  exerciseType: 'reading-comprehension',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Which Title Fits?', instruction: 'Read each story. Circle the title that fits it best.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const lv = Number(difficulty) || 2;
    const all = passagesFor(L, lv);
    // the other titles come from every passage of the language (the short bank and the Level Set)
    const titles = [...new Set([1, 2, 3].flatMap((k) => passagesFor(L, k)).map((p) => p.title))];
    if (all.length < d.n) throw new Error(`G2-488: ${L} has ${all.length} passages (< ${d.n})`);
    const words = (t) => new Set((t.toLocaleLowerCase(L).match(/\p{L}{4,}/gu) || []));
    const picks = rng.sample(all, d.n), used = new Set(picks.map((p) => p.title));
    const places = rng.shuffle([0, 1, 2]);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const blocks = picks.map((p, i) => {
      const mine = words(p.title);
      // a wrong title shares no word with the right title nor with the story (Snowman / snow, Schneetag / Schnee: a
      // title that touches the story could fit it too; reading-new.js titleTouches compares the word starts)
      const others = rng.shuffle(titles.filter((t) => !used.has(t) && ![...words(t)].some((w) => mine.has(w)) && !titleTouches(t, p.title, L) && !titleTouches(t, p.text, L))).slice(0, 2);
      if (others.length < 2) throw new Error(`G2-488: ${L} has no two other titles for "${p.title}"`);
      others.forEach((t) => used.add(t));
      const opts = others.slice();
      opts.splice(places[i % 3], 0, p.title);
      return `<div data-lcs-title-block="${p.id}" style="display:flex;flex-direction:column;gap:8px;padding:10px 14px;border-radius:16px;background:${T.cream}">` +
        `<div style="padding:10px 14px;border:2.5px solid ${T.teal};border-radius:14px;background:#FFFFFF;font:600 ${d.font}px/1.5 'Nunito',sans-serif;color:${T.ink}">${esc(p.text)}</div>` +
        `<div class="ws-choices" style="display:flex;flex-wrap:wrap;gap:8px 10px">${opts.map((t) => `<span data-lcs-pick="1"${mark && t === p.title ? ' data-lcs-correct="1"' : ''} style="padding:6px 14px;border:2.5px solid ${T.grid};border-radius:12px;background:#FFFFFF;font:700 21px/1.25 'Baloo 2',cursive;color:${T.ink}">${esc(t)}</span>`).join('')}</div></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-best-title style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:14px;min-height:0">${blocks.join('')}</div>`,
      meta: { passages: picks.map((p) => p.id + ': ' + p.title) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const bs = [...document.querySelectorAll('[data-lcs-title-block]')];
      if (bs.length < 2) fails.push(`${bs.length} stories`);
      const root = document.querySelector('[data-lcs-best-title]').getBoundingClientRect();
      bs.forEach((b, i) => { const r = b.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push(`story ${i + 1} leaves the page`); if (b.querySelectorAll('[data-lcs-pick]').length !== 3) fails.push(`story ${i + 1}: not three titles`); });
      return fails;
    });
  },
};
