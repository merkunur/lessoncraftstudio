/**
 * K-535 — Same First Sound? (Phonics & Sounds maker 2026-11-02, NEW-TEMPLATES §38 T3; RF.K.2.d isolate the initial
 * sound, RF.K.3.a): cards of two pictures; the child says both names and circles ✓ when they start with the same
 * SOUND, ✗ when they do not (K-352's rhyme-or-not format moved to onsets). The pictures are the reviewed letter-picture
 * chart (data/alphabet/letter-pictures.json: every picture starts with its letter's sound, every picture opened, every
 * word read by a native + pedagogy review), so a pair is built on the SOUND: a "same" pair is two pictures of one
 * consonant letter (never a vowel letter — en ant / angel share a letter, not a sound); a "different" pair is two letters
 * whose sounds differ in this language — letters that can start a word with the same sound are never paired either
 * way (alphabet-more.js SAME_SOUND: en can / key, es vaca / bebé, nl cirkel / sok, de Vogel / Fuß …).
 * Every ✓ / ✗ pair is a tap target; the right chip is ringed on the key.
 * Levels: 1 six cards, three the same, sounds far apart · 2 eight cards, four the same · 3 eight cards, the different
 * pairs NEAR (b–p, d–t, g–k, m–n, f–v, s–z, where the language keeps them apart).
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const D = {
  1: { cards: 6, same: 3, near: false, px: 92, chip: 58 },
  2: { cards: 8, same: 4, near: false, px: 78, chip: 56 },
  3: { cards: 8, same: 4, near: true, px: 78, chip: 56 },
};
const NEAR = ['bp', 'dt', 'gk', 'mn', 'fv', 'sz'];

module.exports = {
  id: 'K-535',
  slug: 'same-first-sound',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'beginning-sounds',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Same First Sound?', instruction: 'Say the names of the two pictures. If they start with the same sound, circle the check mark. If not, circle the X.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const chart = A.unaidedChart(L);
    if (!chart) throw new Error('K-535: no letter chart for ' + L);
    const vowel = (ch) => A.isVowel(ch, L);
    const sameSound = (a, b) => A.sameSound(a, b, L);
    const pics = Object.entries(chart).map(([up, list]) => ({ l: up.toLocaleLowerCase(L), list })).filter((x) => x.list.length);
    const used = new Set();
    const take = (x) => { const free = x.list.filter((e) => !used.has(e.key)); if (!free.length) return null; const e = rng.pick(free); used.add(e.key); return { ...e, letter: x.l }; };
    // the "same" cards: consonant letters with two pictures, each letter once on the page
    const twoPic = rng.shuffle(pics.filter((x) => !vowel(x.l) && x.list.length >= 2));
    if (twoPic.length < d.same) throw new Error(`K-535: ${L} has ${twoPic.length} consonant letters with two pictures (< ${d.same})`);
    const cards = [], lettersUsed = new Set();
    for (const x of twoPic.slice(0, d.same)) { const a = take(x), b = take(x); cards.push({ a, b, same: true }); lettersUsed.add(x.l); }
    // the "different" cards: two letters that never share a sound here; level 3 picks near sounds where the language has them
    const nDiff = d.cards - d.same;
    const free = () => pics.filter((x) => !lettersUsed.has(x.l) && x.list.some((e) => !used.has(e.key)));
    for (let k = 0; k < nDiff; k++) {
      let pair = null;
      if (d.near) {
        const near = rng.shuffle(NEAR.map((nn) => [...nn]).filter(([p, q]) => !sameSound(p, q)
          && free().some((x) => x.l === p) && free().some((x) => x.l === q)));
        if (near.length) pair = near[0].map((l) => free().find((x) => x.l === l));
      }
      if (!pair) {
        const f = rng.shuffle(free());
        for (let i = 0; i < f.length && !pair; i++) for (let j = i + 1; j < f.length && !pair; j++) {
          const p = f[i].l, q = f[j].l;
          if (sameSound(p, q)) continue;
          // far sounds below level 3: never a near pair
          if (!d.near && NEAR.some((nn) => nn.includes(p) && nn.includes(q))) continue;
          pair = [f[i], f[j]];
        }
      }
      if (!pair) throw new Error(`K-535: ${L} runs out of letter pairs at card ${cards.length + 1}`);
      const a = take(pair[0]), b = take(pair[1]);
      lettersUsed.add(pair[0].l); lettersUsed.add(pair[1].l);
      cards.push({ a, b, same: false });
    }
    // the order: shuffled, never one answer more than three times in a row, never a strict alternation
    let order = rng.shuffle(cards);
    const bad = (o) => { const s = o.map((c) => (c.same ? 1 : 0)); let run = 1; for (let i = 1; i < s.length; i++) { run = s[i] === s[i - 1] ? run + 1 : 1; if (run > 3) return true; } return s.every((v, i) => !i || v !== s[i - 1]); };
    for (let g = 0; g < 40 && bad(order); g++) order = rng.shuffle(cards);
    order = order.map((c) => (rng.next() < 0.5 ? c : { ...c, a: c.b, b: c.a }));
    // a teacher's pictures (maker): one role per letter on the page — another picture of THAT letter (same / different stays true)
    const listOf = new Map(pics.map((x) => [x.l, x.list.map((e) => ({ ...e, letter: x.l }))]));
    const KS = slot.byKind(ctx, order.flatMap((c) => [c.a, c.b]), (p) => p.letter, (l) => listOf.get(l), { multi: true, prefix: 'l' });
    order = order.map((c, i) => ({ ...c, a: KS.items[2 * i], b: KS.items[2 * i + 1] }));

    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const chip = (kind, right, path) => `<span class="ws-chip" style="width:${d.chip}px;height:${d.chip}px;padding:0;flex:0 0 auto" data-lcs-chip="${kind}"${mark && right ? ' data-lcs-correct="1"' : ''}>` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(d.chip * 0.72)}" height="${Math.round(d.chip * 0.72)}" viewBox="0 0 52 52" aria-hidden="true"><path d="${path}" fill="none" stroke="${T.teal}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
    const img = (e, t) => `<img class="ws-icon" src="${fileUri(e.theme, e.noun)}" alt=""${t || ''} style="width:${d.px}px;height:${d.px}px;flex:0 0 auto">`;
    const html = order.map((c, ci) => `<div class="ws-card-stage" style="flex-direction:column;justify-content:center;align-items:center;padding:0;gap:0;min-width:0" data-ws-content data-lcs-first="1" data-lcs-same="${c.same ? 1 : 0}" data-lcs-letter-a="${c.a.letter}" data-lcs-letter-b="${c.b.letter}" data-lcs-word-a="${c.a.word}" data-lcs-word-b="${c.b.word}">` +
      `<div style="display:flex;align-items:center;gap:${Math.round(d.px * 0.35)}px;flex:0 0 auto">${img(c.a, KS.tap(2 * ci))}${img(c.b, KS.tap(2 * ci + 1))}</div>` +
      `<div class="ws-choices" style="gap:14px;padding-top:8px">${chip('yes', c.same, 'M14 27 l9 9 l17 -18')}${chip('no', !c.same, 'M16 16 l20 20 M36 16 l-20 20')}</div></div>`);
    return {
      bodyHtml: cardGrid({ cards: html, cols: 2, rows: Math.ceil(html.length / 2), numbered: true }),
      meta: { pairs: order.map((c) => `${c.a.word}/${c.b.word} ${c.same ? 'same' : 'different'}`), answers: order.map((c) => (c.same ? 'yes' : 'no')) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-first]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      const same = cards.filter((c) => c.dataset.lcsSame === '1').length;
      if (!same || same === cards.length) fails.push(`${same} of ${cards.length} cards the same`);
      const words = cards.flatMap((c) => [c.dataset.lcsWordA, c.dataset.lcsWordB]);
      if (new Set(words).size !== words.length) fails.push('a picture twice on the page');
      cards.forEach((c, i) => {
        const s = c.dataset.lcsSame === '1', la = c.dataset.lcsLetterA, lb = c.dataset.lcsLetterB;
        if (s !== (la === lb)) fails.push(`card ${i + 1}: letters ${la}/${lb} but marked ${s ? 'same' : 'different'}`);
        if (c.querySelectorAll('[data-lcs-chip]').length !== 2) fails.push(`card ${i + 1}: not two chips`);
        c.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`card ${i + 1}: a picture did not load`); });
      });
      return fails;
    });
  },
};
