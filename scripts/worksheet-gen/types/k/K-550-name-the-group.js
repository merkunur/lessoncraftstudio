/**
 * K-550 — Name the Group (Vocabulary maker 2026-11-02, NEW-TEMPLATES §46 T2; L.K.5.a / L.1.5.a sort words into categories
 * — the group word, the step after sorting; de "Oberbegriffe finden", fr "les mots génériques"): rows of pictures that
 * belong together and a box; the child writes the word for the group (animals, fruit, vehicles…). The group words and
 * the words a teacher also accepts are literals per locale (data/word-meaning/word-meaning-new.js CATEGORIES); the
 * pictures are reviewed members of one group only, never a picture of two groups on one page. Levels 1-2 print the group
 * words to copy (level 2 with one word too many); level 3 prints none. Every box is an answer box holding the group word.
 * Levels: 1 four groups of three pictures, words given · 2 five groups of four, words given (+1) · 3 six groups of four.
 */
'use strict';
const { CATEGORIES } = require('../../data/word-meaning/word-meaning-new.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const D = {
  1: { groups: 4, pics: 3, bank: true, extra: 0, px: 78 },
  2: { groups: 5, pics: 4, bank: true, extra: 1, px: 66 },
  3: { groups: 6, pics: 4, bank: false, extra: 0, px: 62 },
};

module.exports = {
  id: 'K-550',
  slug: 'name-the-group',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-vocabulary',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Name the Group', instruction: 'Look at the pictures in each row. What group do they belong to? Write the word.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const ok = (m) => { const [t, n] = m.split('/'); return labelSafeNouns(t).some((x) => x.noun === n); };
    // a group's pictures in this language (pt "legumes" are not the leafy vegetables, which are "verduras")
    const membersOf = (c) => ((c.membersByLocale && c.membersByLocale[L]) || c.members).filter(ok);
    const cats = rng.shuffle(CATEGORIES.filter((c) => c.label[L] && membersOf(c).length >= d.pics));
    if (cats.length < d.groups + d.extra) throw new Error(`K-550: ${L} has ${cats.length} groups (< ${d.groups + d.extra})`);
    // a group may require one of its members on every row (animals: a farm animal — a row of wild animals alone is
    // "zoo animals" too, a second right word)
    const picksOf = (c) => {
      const must = (c.mustInclude || []).filter(ok);
      if (!must.length) return rng.sample(membersOf(c), d.pics);
      const one = rng.sample(must, 1);
      return rng.shuffle([...one, ...rng.sample(membersOf(c).filter((m) => !one.includes(m)), d.pics - 1)]);
    };
    const groups = cats.slice(0, d.groups).map((c) => ({ c, pics: picksOf(c) }));
    const extra = cats.slice(d.groups, d.groups + d.extra);
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const words = groups.map((g) => g.c.label[L]);
    const longest = Math.max(...words.concat(groups.flatMap((g) => g.c.alts[L] || [])).map((w) => [...w].length));
    const boxW = Math.min(250, Math.max(170, Math.min(longest, 14) * 15 + 30));
    const bank = d.bank ? `<div data-lcs-wordbank style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px 14px;padding:10px 14px;border:2.5px solid ${T.teal};border-radius:16px">` +
      rng.shuffle([...words, ...extra.map((c) => c.label[L])]).map((w) => `<span style="font:700 24px/1.2 'Baloo 2',cursive;color:${T.ink}">${w}</span>`).join('') + '</div>' : '';
    const rows = groups.map((g, i) => {
      const alts = (g.c.alts[L] || []).join('|');
      return `<div data-lcs-group-row="${g.c.key}" style="display:flex;align-items:center;gap:12px;padding:6px 12px;border-radius:14px;background:${T.cream}">` +
        `<div style="flex:1;display:flex;justify-content:space-evenly;align-items:center">${g.pics.map((m) => { const [t, n] = m.split('/'); return `<img class="ws-icon" src="${fileUri(t, n)}" alt="" style="width:${d.px}px;height:${d.px}px;object-fit:contain">`; }).join('')}</div>` +
        `<span style="font:700 30px/1 'Baloo 2',cursive;color:${T.teal}">→</span>` +
        `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${g.c.label[L]}"${alts ? ` data-lcs-alts="${alts}"` : ''}` : ''} style="display:inline-flex;flex:0 0 auto;width:${boxW}px;height:50px;box-sizing:border-box;border:2.5px dashed ${T.coral};border-radius:10px;background:#FFFFFF"></span></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-groups style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px;min-height:0">${bank}${rows.join('')}</div>`,
      meta: { groups: groups.map((g) => `${g.c.label[L]}: ${g.pics.map((m) => m.split('/')[1]).join(', ')}`), extra: extra.map((c) => c.label[L]) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-group-row]')];
      if (rows.length < 4) fails.push(`${rows.length} groups`);
      const keys = rows.map((r) => r.dataset.lcsGroupRow);
      if (new Set(keys).size !== keys.length) fails.push('a group twice');
      const root = document.querySelector('[data-lcs-groups]').getBoundingClientRect();
      rows.forEach((r, i) => {
        const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`row ${i + 1} leaves the page`);
        r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: a picture did not load`); });
      });
      return fails;
    });
  },
};
