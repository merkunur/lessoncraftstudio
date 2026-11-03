/**
 * K-536 — Beginning-Sound Clip Cards (Phonics & Sounds maker 2026-11-02, NEW-TEMPLATES §38 T1; RF.K.3.a; material):
 * cards to cut out, each a picture over three letters; the child names the picture and clips a clothes-peg on the
 * letter of its first SOUND (on the screen: taps it). The pictures are the reviewed letter-picture chart
 * (data/alphabet/letter-pictures.json: every picture starts with its letter's sound, every picture opened, every word
 * read by a native + pedagogy review). The two other letters NEVER share the sound in this language (alphabet-more.js SAME_SOUND:
 * en c / k, es b / v, c / k / q, s / z, nl c / s / z, Nordic c / s / z …), so each card has one right letter; q and x are
 * never a distractor. Level 3 makes one of the two a look-alike of the right letter (b d p q, m n, i l …) and shows small
 * letters.
 * Every letter is a tap target; the right one is ringed on the key.
 * Levels: 1 six cards, capital letters · 2 eight cards, capital letters · 3 eight cards, small letters, one look-alike.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const W = 660, BUDGET = 700;
const D = {
  1: { cards: 6, cols: 2, upper: true, lookAlike: false },
  2: { cards: 8, cols: 2, upper: true, lookAlike: false },
  3: { cards: 8, cols: 2, upper: false, lookAlike: true },
};
// small letters a K child confuses by their shape
const LOOK = ['bdpq', 'mn', 'ilj', 'uv', 'nh', 'oa', 'ce', 'äa', 'öo', 'åa', 'øo', 'éè'];

module.exports = {
  id: 'K-536',
  slug: 'beginning-sound-clip-cards',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'beginning-sounds',
  themeAxis: { applicable: false },
  difficulty: D,
  fitsChrome: true,
  i18n: { en: { title: 'Beginning Sound Clip Cards', instruction: 'Cut out the cards. Say the name of each picture and clip a clothespin on the letter of its first sound.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const chart = A.unaidedChart(L);
    if (!chart) throw new Error('K-536: no letter chart for ' + L);
    const alpha = A.alphabetOf(L);
    const sameSound = (a, b) => A.sameSound(a, b, L);
    const looks = (a, b) => LOOK.some((g) => g.includes(a) && g.includes(b));
    // one picture per card, each a different letter where the chart allows
    const letters = rng.shuffle(Object.entries(chart).filter(([, list]) => list.length).map(([up, list]) => ({ l: up.toLocaleLowerCase(L), list })));
    if (letters.length < d.cards) throw new Error(`K-536: ${L} chart has ${letters.length} letters with a picture (< ${d.cards})`);
    // a teacher's pictures (maker): one role per card's letter — another picture of THAT letter's chart (the card keeps its answer)
    const listOf = new Map(letters.map((x) => [x.l, x.list.map((e) => ({ ...e, letter: x.l }))]));
    const KS = slot.byKind(ctx, letters.slice(0, d.cards).map((x) => ({ ...rng.pick(x.list), letter: x.l })), (p) => p.letter, (l) => listOf.get(l), { multi: true, prefix: 'l' });
    const picks = KS.items;
    const cards = picks.map((p) => {
      // q and x are never an option; nor is h where it is silent (es it pt fr): it stands for no sound at all
      const ok = (c) => c !== p.letter && !sameSound(c, p.letter) && !'qx'.includes(c) && alpha.includes(c) && !(c === 'h' && ['es', 'it', 'pt', 'fr'].includes(L));
      let dis = [];
      if (d.lookAlike) { const la = rng.shuffle(alpha.filter((c) => ok(c) && looks(c, p.letter))); if (la.length) dis.push(la[0]); }
      const rest = rng.shuffle(alpha.filter((c) => ok(c) && !dis.includes(c) && !dis.some((x) => sameSound(x, c)) && (d.lookAlike || !looks(c, p.letter))));
      while (dis.length < 2 && rest.length) { const c = rest.shift(); if (!dis.some((x) => sameSound(x, c))) dis.push(c); }
      if (dis.length < 2) throw new Error(`K-536: ${L} no distractors for ${p.letter}`);
      return { p, opts: rng.shuffle([p.letter, ...dis]) };
    });
    // the right letter does not sit in one place: every position holds it at least once on a page of 6+
    for (let g = 0; g < 30 && new Set(cards.map((c) => c.opts.indexOf(c.p.letter))).size < 3; g++) cards.forEach((c) => { c.opts = rng.shuffle(c.opts); });

    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const extra = (ctx && ctx.chromeExtra) || 0;
    const rows = Math.ceil(d.cards / d.cols), w = Math.floor(W / d.cols), h = Math.floor((BUDGET - extra) / rows);
    const chip = Math.min(58, Math.floor((w - 60) / 3.6)), pic = Math.max(48, Math.min(h - chip - 40, w - 80));
    const html = cards.map(({ p, opts }, ci) => {
      const tiles = opts.map((c) => `<span data-lcs-clip="${c}"${mark && c === p.letter ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:${chip}px;height:${chip}px;border-radius:50%;border:3px solid ${T.teal};background:#FFFFFF;font:700 ${Math.round(chip * 0.62)}px/1 'Baloo 2',cursive;color:${T.ink}">${A.inCase(c, d.upper, L)}</span>`).join('');
      return `<div data-lcs-clip-card="${p.letter}"${KS.tap(ci)} data-lcs-word="${p.word}" style="box-sizing:border-box;width:${w}px;height:${h}px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border-right:2px dashed ${T.grid};border-bottom:2px dashed ${T.grid}">` +
        `<img class="ws-icon" src="${fileUri(p.theme, p.noun)}" alt="" style="width:${pic}px;height:${pic}px;object-fit:contain">` +
        `<div style="display:flex;gap:${Math.round(chip * 0.45)}px">${tiles}</div></div>`;
    });
    const grid = `<div data-lcs-clip-cards style="display:grid;grid-template-columns:repeat(${d.cols},${w}px);border-top:2px dashed ${T.grid};border-left:2px dashed ${T.grid}">${html.join('')}</div>`;
    return {
      bodyHtml: `<div data-ws-content style="flex:1;display:flex;align-items:center;justify-content:center">${grid}</div>`,
      meta: { cards: cards.map(({ p, opts }) => `${p.word}: ${opts.join(' ')} → ${p.letter}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-clip-card]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      const words = cards.map((c) => c.dataset.lcsWord);
      if (new Set(words).size !== words.length) fails.push('a picture twice on the page');
      cards.forEach((c, i) => {
        const opts = [...c.querySelectorAll('[data-lcs-clip]')].map((x) => x.dataset.lcsClip);
        if (opts.length !== 3 || new Set(opts).size !== 3) fails.push(`card ${i + 1}: not three different letters`);
        if (!opts.includes(c.dataset.lcsClipCard)) fails.push(`card ${i + 1}: the right letter is missing`);
        const im = c.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`card ${i + 1}: the picture did not load`);
        const R = c.getBoundingClientRect();
        c.querySelectorAll('img,[data-lcs-clip]').forEach((x) => { const r = x.getBoundingClientRect(); if (r.left < R.left - 1 || r.right > R.right + 1 || r.top < R.top - 1 || r.bottom > R.bottom + 1) fails.push(`card ${i + 1}: something leaves the card`); });
      });
      return [...new Set(fails)];
    });
  },
};
