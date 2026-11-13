/**
 * G3-484 — More Likely: Which Bag? (Year pages P, 2026-11-13; de KMK "schätzen Chancen für das Eintreten von
 * Ereignissen … ein und vergleichen (ist wahrscheinlicher als)", sv Lgr22 åk 1-3 "slumpmässiga händelser"; no Common
 * Core standard in K-3).
 *
 * Four pairs of bags a page. On the left of each pair stands ONE piece: from which of the two bags is the child more
 * likely to take it, without looking? The child marks the box beside that bag.
 *
 * One right answer a pair, and one a third grader can PROVE without fractions: the two bags of a pair either hold the
 * SAME NUMBER of pieces (then the bag with more of the piece wins) or the SAME NUMBER OF THE PIECE (then the bag with
 * fewer other pieces wins: 3 of 6 beats 3 of 10). A pair in which both differ (4 of 6 against 5 of 10) needs
 * proportional reasoning and is never printed; verify refuses it on the rendered page.
 *
 * Levels
 *   1  ten pieces in every bag, two kinds; the counts of the piece differ by three or more
 *   2  six, eight or ten pieces (the same in both bags), two or three kinds; the counts differ by one or two
 *   3  a box with an equals sign stands between the bags: one pair has the SAME chance (the same count in the same
 *      number of pieces, lying differently and beside other pieces); one pair has the same count in bags of different
 *      size; the others are pairs of level 2
 * No words on a card. Printed page only.
 */
'use strict';
const B = require('../_shared/chance-bag.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { plan: ['wide', 'wide', 'wide', 'wide'], equal: false }, 2: { plan: ['close', 'close', 'close', 'close'], equal: false }, 3: { plan: ['same', 'size', 'close', 'close'], equal: true } };

/** fill a bag: `c` pieces of kind `a`, the rest from `others` (one or two kinds), in a drawn order */
function fill(a, c, total, others, rng) {
  const rest = total - c; let list = Array(c).fill(a);
  if (others.length === 1 || rest < 2) list = list.concat(Array(rest).fill(others[0]));
  else { const x = rng.int(1, rest - 1); list = list.concat(Array(x).fill(others[0]), Array(rest - x).fill(others[1])); }
  return rng.shuffle(list);
}
function pair(plan, rng) {
  const [a, b, c2] = rng.shuffle(B.KINDS);
  if (plan === 'wide') {
    for (;;) { const x = rng.int(1, 9), y = rng.int(1, 9); if (Math.abs(x - y) >= 3) return { ask: a, A: fill(a, x, 10, [b], rng), B: fill(a, y, 10, [b], rng) }; }
  }
  if (plan === 'close') {
    const total = rng.pick([6, 8, 10]);
    for (;;) { const x = rng.int(1, total - 2), y = rng.int(1, total - 2); if (x !== y && Math.abs(x - y) <= 2) return { ask: a, A: fill(a, x, total, rng.pick([[b], [b, c2]]), rng), B: fill(a, y, total, rng.pick([[b], [b, c2]]), rng) }; }
  }
  if (plan === 'size') {
    const x = rng.int(2, 4), small = rng.pick([5, 6]), big = rng.pick([8, 9, 10]);
    const P = [fill(a, x, small, [b], rng), fill(a, x, big, [b], rng)];
    return rng.int(0, 1) ? { ask: a, A: P[0], B: P[1] } : { ask: a, A: P[1], B: P[0] };
  }
  // 'same': the same count in the same number of pieces, but the bags do not look alike
  const total = rng.pick([6, 8, 10]), x = rng.int(2, total - 3);
  return { ask: a, A: fill(a, x, total, [b], rng), B: fill(a, x, total, [b, c2], rng) };
}
/** 'A' | 'B' | '=' : where the piece is more likely, by cross-multiplying (no rounding) */
function winner(p) {
  const n = (l) => l.filter((k) => k === p.ask).length;
  const l = n(p.A) * p.B.length, r = n(p.B) * p.A.length;
  return l > r ? 'A' : l < r ? 'B' : '=';
}

module.exports = {
  id: 'G3-484',
  slug: 'more-likely-which-bag',
  gradeBand: 'G3',
  assetClass: 'numeral-charts',
  exerciseType: 'graphing-data',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'More Likely: Which Bag?', instruction: 'Look at the piece on the left. You take one piece out of a bag without looking. From which bag are you more likely to take this piece? Mark the box beside that bag.' } },
  levelSetWords(m) { return (m.items || []).map(String); },
  winner,

  build(args, ctx) {
    const d = this.difficulty[args.difficulty] || this.difficulty[2];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    let pairs = null;
    for (let t = 0; t < 400; t++) {
      const list = rng.shuffle(d.plan.map((p) => pair(p, rng)));
      const wins = list.map(winner);
      const sig = list.map((p) => p.ask + [p.A.slice().sort().join(''), p.B.slice().sort().join('')].sort().join('|'));
      if (new Set(sig).size < list.length) continue;
      // the answer is not always the same side
      const a = wins.filter((w) => w === 'A').length, b = wins.filter((w) => w === 'B').length;
      if (d.equal ? (a < 1 || b < 1 || wins.filter((w) => w === '=').length !== 1) : (a !== 2 || b !== 2)) continue;
      // no bag is the mirror of its partner by accident, and the same asked piece is not on every card
      if (new Set(list.map((p) => p.ask)).size < 2) continue;
      pairs = list; break;
    }
    if (!pairs) throw new Error('G3-484: no page of four pairs');
    const cardStyle = `flex:1 1 0;flex-direction:row;align-items:center;justify-content:space-between;gap:10px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:8px 24px`;
    const cards = pairs.map((p) => {
      const w = winner(p);
      const side = (list, name) => `<span style="display:flex;align-items:center;gap:12px">${B.bag({ pieces: list, px: 158, attr: `data-lcs-side="${name}"` })}${B.box(30, key && w === name ? 'key' : null, `data-lcs-pick="${name}"`)}</span>`;
      const eq = d.equal ? `<span style="display:flex;flex-direction:column;align-items:center;gap:4px"><span style="font-family:'Baloo 2';font-weight:700;font-size:24px;line-height:1;color:${T.ink}">=</span>${B.box(30, key && w === '=' ? 'key' : null, 'data-lcs-pick="="')}</span>` : '';
      const ask = `<span style="flex:0 0 auto;width:62px;height:62px;display:flex;align-items:center;justify-content:center;background:${T.white};border:2.5px solid ${T.teal};border-radius:50%">${B.piece(p.ask, 38, 'data-lcs-asked="1"')}</span>`;
      return `<div class="ws-card-stage" data-lcs-pair="${p.ask}|${p.A.join('')}|${p.B.join('')}|${w}" style="${cardStyle}">${ask}${side(p.A, 'A')}${eq}${side(p.B, 'B')}</div>`;
    });
    const bodyHtml = `<div data-ws-content data-lcs-likely="${d.equal ? 1 : 0}" style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:stretch">${cards.join('')}</div>`;
    return { bodyHtml, meta: { items: pairs.map((p) => p.ask + '/' + p.A.slice().sort().join('') + '/' + p.B.slice().sort().join('')) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-likely]'); if (!root) return ['no content'];
      const eq = root.dataset.lcsLikely === '1';
      const cards = [...document.querySelectorAll('[data-lcs-pair]')];
      if (cards.length !== 4) fails.push(cards.length + ' pairs');
      const wins = [];
      cards.forEach((card, i) => {
        const P = 'pair ' + (i + 1);
        const [ask, , , stamped] = card.dataset.lcsPair.split('|');
        const asked = card.querySelector('[data-lcs-asked]'); if (!asked || asked.dataset.lcsPiece !== ask) fails.push(P + ': the piece asked is not drawn');
        // what is DRAWN decides
        const drawn = (name) => [...card.querySelectorAll('[data-lcs-side="' + name + '"] [data-lcs-in]')].map((e) => e.dataset.lcsIn);
        const A = drawn('A'), Bb = drawn('B');
        const ca = A.filter((k) => k === ask).length, cb = Bb.filter((k) => k === ask).length;
        if (!A.length || !Bb.length) { fails.push(P + ': an empty bag'); return; }
        if (A.length !== Bb.length && ca !== cb) fails.push(P + ': ' + ca + ' of ' + A.length + ' against ' + cb + ' of ' + Bb.length + ' needs fractions');
        if (!eq && A.length !== Bb.length) fails.push(P + ': bags of different size at this level');
        const l = ca * Bb.length, r = cb * A.length, w = l > r ? 'A' : l < r ? 'B' : '=';
        if (w !== stamped) fails.push(P + ': the key says ' + stamped + ', the bags say ' + w);
        if (w === '=' && !eq) fails.push(P + ': the same chance, and no box for it');
        if (w === '=' && A.join('') === Bb.join('')) fails.push(P + ': the two bags are the same picture');
        wins.push(w);
        const picks = [...card.querySelectorAll('[data-lcs-pick]')].map((e) => e.dataset.lcsPick);
        if (picks.join('') !== (eq ? 'A=B' : 'AB')) fails.push(P + ': boxes ' + picks.join(' '));
        for (const name of ['A', 'B']) {
          const bag = card.querySelector('[data-lcs-side="' + name + '"]').getBoundingClientRect();
          const boxes = [...card.querySelectorAll('[data-lcs-side="' + name + '"] [data-lcs-in]')].map((e) => e.getBoundingClientRect());
          boxes.forEach((q, a) => { if (q.left < bag.left || q.right > bag.right || q.top < bag.top || q.bottom > bag.bottom) fails.push(P + ': a piece outside bag ' + name); boxes.forEach((z, b2) => { if (b2 > a && q.left < z.right - 1 && z.left < q.right - 1 && q.top < z.bottom - 1 && z.top < q.bottom - 1) fails.push(P + ': two pieces overlap'); }); });
        }
        const cr = card.getBoundingClientRect();
        card.querySelectorAll('*').forEach((e) => { const q = e.getBoundingClientRect(); if (q.width && (q.right > cr.right + 1 || q.left < cr.left - 1 || q.bottom > cr.bottom + 1 || q.top < cr.top - 1)) fails.push(P + ': something runs out of it'); });
      });
      const a = wins.filter((w) => w === 'A').length, b = wins.filter((w) => w === 'B').length;
      if (a < 1 || b < 1) fails.push('the answer is always the same side');
      if (eq && wins.filter((w) => w === '=').length !== 1) fails.push('one pair with the same chance at this level');
      return [...new Set(fails)];
    });
  },
};
