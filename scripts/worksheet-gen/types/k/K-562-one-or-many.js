/**
 * K-562 — One or Many? (One & Many, Articles maker 2026-11-03, NEW-TEMPLATES §42 T3; L.K.1.c, reading the plural; es
 * "singular y plural", it "singolare e plurale", sv "en eller flera"): a printed word — the word for one or the word for
 * many — and picture groups beside it; the child reads the word and circles the group it names (K-287 / K-314 write the
 * plural; this page reads it). The words are the vocabulary's (de Hund / Hunde, fr cheval / chevaux); a noun whose plural
 * equals its singular (sheep, Mädchen, souris) never comes (the page would have two right groups). Half the words name
 * one, half name many; the right group stands in each place as often as the page allows.
 * Levels: 1 the article helps (a dog / dogs, ein Hund / Hunde, un chat / des chats; fi has no article: no level 1), two
 * groups · 2 the word alone, two groups · 3 the word alone, four groups: one and many of the word, one and many of
 * another picture from a far theme (fruits; toys for a food theme: never a kind of the word) — read the word AND its ending.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const NF = require('../_shared/noun-forms.js');
const { LABELS } = require('../../data/b2/labels.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 8, groups: 2, article: true }, 2: { n: 8, groups: 2 }, 3: { n: 6, groups: 4 } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** level 1's word: the singular with its indefinite article; the plural bare (fr: des) */
function shown(e, many, L, article) {
  if (!article) return many ? e.plur : e.sing;
  if (many) return L === 'fr' ? 'des ' + e.plur : e.plur;
  const a = NF.indefinite(e, L, true);
  return a == null ? null : NF.join(a, e.sing);
}

module.exports = {
  id: 'K-562',
  slug: 'one-or-many',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'singular-plural',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'One or Many?', instruction: 'Read the word. Circle the group that shows it.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    if (d.article && L === 'fi') throw new Error('K-562: fi has no article — its level 1 would be level 2');
    // a word for one and a word for many that look different beyond the ending's first letter (es luz / luces both fine)
    const pool = NF.pool(theme, L).filter((e) => !d.article || shown(e, false, L, true));
    if (pool.length < d.n) throw new Error(`K-562: theme ${theme}/${L} has ${pool.length} nouns (< ${d.n})`);
    const nouns = rng.sample(pool, d.n);
    const far = /fruit|vegetable|bakery|dessert|food|breakfast|supermarket/i.test(theme) ? 'toys' : 'fruits';
    const contrast = d.groups > 2 ? NF.pool(far, L).map((x) => ({ ...x, _theme: far })) : [];
    if (d.groups > 2 && contrast.length < 2) throw new Error(`K-562: no far pictures for ${L}`);
    const many = rng.shuffle(nouns.map((_, i) => i < d.n / 2));
    // the right group's place: each place as often as the page allows, in a shuffled order
    const right = rng.shuffle(nouns.map((_, i) => i % d.groups));
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const lab = (LABELS[L] && LABELS[L].singularPlural) || { one: 'one', many: 'many' };
    const wide = d.groups > 2, px1 = wide ? 50 : 64, px3 = wide ? 32 : 40;
    const group = (e, k, ok, label) => `<div class="ws-subgroup" data-lcs-group-n="${k}"${mark && ok ? ' data-lcs-correct="1"' : ''} data-lcs-label="${esc(label)}" style="display:flex;align-items:center;justify-content:center;gap:2px;flex-wrap:wrap;width:${wide ? 118 : 124}px;height:${wide ? 86 : 96}px;border:2.5px solid ${T.grid};border-radius:12px;background:#FFFFFF">` +
      Array.from({ length: k }, () => `<img class="ws-icon" src="${fileUri(e._theme || theme, e.noun)}" alt="" style="width:${k > 1 ? px3 : px1}px;height:${k > 1 ? px3 : px1}px;object-fit:contain">`).join('') + '</div>';
    const cards = nouns.map((e, i) => {
      const word = shown(e, many[i], L, d.article);
      let opts = [{ e, k: 1, ok: !many[i] }, { e, k: 3, ok: many[i] }];
      if (d.groups > 2) {
        // the second picture comes from a far theme (fruits, or toys for a food theme): never a kind of the word — a
        // sailboat beside «boats» would be a second right group (native review 2026-11-03)
        const other = rng.pick(contrast);
        opts = opts.concat([{ e: other, k: 1, ok: false }, { e: other, k: 3, ok: false }]);
      }
      // the right group to its place, the others shuffled round it
      const rightOpt = opts.find((o) => o.ok), rest = rng.shuffle(opts.filter((o) => !o.ok));
      rest.splice(right[i], 0, rightOpt);
      const groups = rest.map((o, j) => group(o.e, o.k, o.ok, String.fromCharCode(65 + j) + ' · ' + (o.k > 1 ? lab.many : lab.one))).join('');
      return `<div data-lcs-one-many="${i + 1}" data-lcs-many="${many[i] ? 1 : 0}" data-lcs-word="${esc(word)}" style="display:flex;${wide ? 'flex-direction:row' : 'flex-direction:column'};align-items:center;justify-content:center;gap:10px;padding:10px 12px;border-radius:16px;background:${T.cream}">` +
        `<span style="font:700 ${wide ? 28 : 26}px/1.1 'Nunito',sans-serif;color:${T.ink};${wide ? 'width:170px;' : ''}text-align:center;overflow-wrap:anywhere">${esc(word)}</span>` +
        `<div class="ws-choices" style="display:flex;gap:10px;justify-content:center">${groups}</div></div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-one-or-many style="flex:1;display:grid;grid-template-columns:${wide ? 'minmax(0,1fr)' : 'repeat(2,minmax(0,1fr))'};grid-auto-rows:1fr;gap:12px 16px;min-height:0">${cards.join('')}</div>`,
      meta: { words: nouns.map((e, i) => `${shown(e, many[i], L, d.article)} (${many[i] ? 'many' : 'one'})`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-one-many]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      const many = cards.filter((c) => c.dataset.lcsMany === '1').length;
      if (Math.abs(many * 2 - cards.length) > 1) fails.push(`${many} of ${cards.length} words name many`);
      const root = document.querySelector('[data-lcs-one-or-many]').getBoundingClientRect();
      cards.forEach((c, i) => {
        const b = c.getBoundingClientRect();
        if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`card ${i + 1} leaves the page`);
        const g = [...c.querySelectorAll('[data-lcs-group-n]')];
        if (g.length < 2) fails.push(`card ${i + 1}: ${g.length} groups`);
        g.forEach((x) => { const q = x.getBoundingClientRect(); if (q.right > b.right + 0.5) fails.push(`card ${i + 1}: a group past its edge`); if (x.querySelectorAll('img').length !== +x.dataset.lcsGroupN) fails.push(`card ${i + 1}: a group of the wrong size`); });
        const sizes = g.map((x) => x.getBoundingClientRect().width + 'x' + x.getBoundingClientRect().height);
        if (new Set(sizes).size !== 1) fails.push(`card ${i + 1}: groups of different sizes`);
      });
      return fails;
    });
  },
};
