/**
 * G1-509 — Describe the Character (Stories & Writing maker 2026-11-02, NEW-TEMPLATES §49 T4; W.1.2 / L.1.1.f describe
 * with adjectives; de "Steckbrief", it "descrizione guidata"): a big picture of a character from the theme (an animal, a
 * person or a toy figure: types/_shared/characters.js — never a thing) and sentence
 * starters to finish — its name, what it is like, what it likes, where it lives. The starters say "my character", never a
 * pronoun the animal's gender would decide (data/writing/stories-new.js DESCRIBE); levels 1-2 print a bank of describing
 * words (the reviewed opposites bank's adjectives, data/b3/opposites.js). The picture is a slot the teacher may swap for
 * any picture of the theme. Open writing: no answer key, no screen.
 * Levels: 1 three starters, word bank · 2 four starters, word bank · 3 four starters and three free lines.
 */
'use strict';
const { DESCRIBE } = require('../../data/writing/stories-new.js');
const { bank } = require('../../lib/b3-common.js');
const { entriesFor, fileUri } = require('../../lib/b2-common.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const { isCharacter } = require('../_shared/characters.js');
const slot = require('../../lib/slot.js');
const W = require('../_shared/writing-frames.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
// opposites that describe a character (big, happy, fast, strong, tall, clean, heavy, kind) — not full / open / wet
const CHARACTER = new Set(['big-small', 'stor-liten', 'happy-sad', 'glad-ledsen', 'fast-slow', 'snabb-långsam', 'strong-weak', 'stark-svag', 'forte-debole', 'fuerte-debil',
  'tall-short', 'alto-bajo', 'alto-basso', 'clean-dirty', 'ren-smutsig', 'pulito-sporco', 'limpio-sucio', 'heavy-light', 'tung-lätt', 'kind-mean']);
const D = { 1: { starters: 3, bank: true, free: 0 }, 2: { starters: 4, bank: true, free: 0 }, 3: { starters: 4, bank: false, free: 3 } };

module.exports = {
  id: 'G1-509',
  slug: 'describe-the-character',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'story-writing',
  themeAxis: { applicable: true, minNouns: 2, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Describe the Character', instruction: 'Look at the picture. Finish the sentences about your character. The words in the box can help you.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    if (!DESCRIBE[L]) throw new Error(`G1-509: no starters for ${L}`);
    const pool = entriesFor(theme, L).filter((e) => isCharacter(e) && !nameRefused(theme, e.noun) && !REFUSED_NOUNS.has(e.noun));
    if (!pool.length) throw new Error(`G1-509: theme ${theme}/${L} has no character (an animal, a person or a toy figure)`);
    const [pic] = slot.pictures(ctx, rng.sample(pool, 1), pool, theme, 'pic');
    const adjs = d.bank ? rng.sample([...new Set((bank('opposites', L).pairs || []).filter((p) => p.pos === 'adj' && CHARACTER.has(p.id)).flatMap((p) => [p.a, p.b]))], 8) : [];
    const starters = DESCRIBE[L].slice(0, d.starters).map((s) => W.starter(s, { font: 24, blank: 150 })).join('');
    const wordBank = d.bank ? `<div data-lcs-wordbank style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px 14px;padding:10px 14px;border:2.5px solid ${T.teal};border-radius:14px">${adjs.map((w) => `<span style="font:700 22px/1.2 'Baloo 2',cursive;color:${T.ink}">${W.esc(w)}</span>`).join('')}</div>` : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-describe style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">` +
        `<div style="display:flex;justify-content:center"><div style="padding:12px;border:2.5px solid ${T.teal};border-radius:18px;background:${T.cream}"><img class="ws-icon" src="${fileUri(theme, pic.noun)}" alt=""${slot.attr(ctx, 'pic', 0)} style="width:${d.free ? 150 : 180}px;height:${d.free ? 150 : 180}px;object-fit:contain"></div></div>` +
        wordBank + `<div style="display:flex;flex-direction:column;gap:14px">${starters}</div>` + (d.free ? `<div>${W.lines(d.free, 650, 46)}</div>` : '') + '</div>',
      meta: { character: pic.vocabKey || pic.noun, words: adjs },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-describe]').getBoundingClientRect();
      const st = [...document.querySelectorAll('[data-lcs-starter]')];
      if (st.length < 3) fails.push(`${st.length} starters`);
      [...st, ...document.querySelectorAll('[data-lcs-describe] img')].forEach((x, i) => { const b = x.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`item ${i + 1} leaves the page`); });
      const im = document.querySelector('[data-lcs-describe] img'); if (!im.complete || !im.naturalWidth) fails.push('the picture did not load');
      return fails;
    });
  },
};
