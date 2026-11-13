/**
 * G2-507 — Certain, Possible, Impossible (Year pages P, 2026-11-13; de KMK "Grundbegriffe zur
 * Beschreibung von Zufallsereignissen (sicher, möglich, unmöglich)", sv Lgr22 åk 1-3 "slumpmässiga händelser i
 * konkreta situationer"; no Common Core standard in K-3).
 *
 * Four bags a page. Beside each bag stand three rows, each beginning with a piece: "I take ONE piece without looking:
 * is it certain, possible or impossible that it is this one?" The child marks one box a row.
 *   certain     every piece in the bag is of this kind
 *   impossible  no piece in the bag is of this kind
 *   possible    some are, some are not (it may happen and it may not)
 * One right answer a row by construction (the three words exclude each other in school use; verify recounts every bag
 * from what is DRAWN). Pieces differ in shape and colour, so a black-and-white print still works, and no sentence
 * names a colour: the only words on a card are the three headings.
 *
 * Levels
 *   1  bags of 4 to 6 pieces, three kinds on the page; two bags of one kind, one of two kinds, one of three
 *   2  bags of 6 to 8 pieces, four kinds; one bag of one kind, one LOPSIDED bag (all but one piece alike: the many is
 *      still only possible, the misconception this page is for), one of two kinds, one of three
 *   3  two bags of 10 pieces to judge (one lopsided), and two EMPTY bags with the boxes marked already: the child
 *      draws 6 pieces into the bag so that the marks are true (more than one bag fits; the key shows one). Every
 *      bag that fits can be made from the three pieces of its rows: a bag that needed a piece WITHOUT a row was
 *      taken out (native reader 2026-11-13)
 * Printed page only.
 */
'use strict';
const B = require('../_shared/chance-bag.js');
const T = require('../../primitives/_tokens.js').color;

// the three headings, in the words of each language's primary school (read by a native reader, 2026-11-13)
const WORDS = {
  en: ['certain', 'possible', 'impossible'], de: ['sicher', 'möglich', 'unmöglich'], es: ['seguro', 'posible', 'imposible'],
  pt: ['com certeza', 'talvez', 'impossível'], fr: ['certain', 'possible', 'impossible'], it: ['certo', 'possibile', 'impossibile'],
  nl: ['zeker', 'mogelijk', 'onmogelijk'], sv: ['säkert', 'möjligt', 'omöjligt'], da: ['sikkert', 'muligt', 'umuligt'],
  no: ['sikkert', 'mulig', 'umulig'], fi: ['varmaa', 'mahdollista', 'mahdotonta'],
};
const ORDER = ['certain', 'possible', 'impossible'];
const D = {
  1: { kinds: 3, size: [4, 6], plan: ['one', 'one', 'two', 'three'], draw: 0 },
  2: { kinds: 4, size: [6, 8], plan: ['one', 'lopsided', 'two', 'three'], draw: 0 },
  3: { kinds: 4, size: [10, 10], plan: ['lopsided', 'three'], draw: 2 },
};

/** a bag of a plan: { pieces (in the order they lie), ask: [kind, kind, kind] } */
function makeBag(plan, d, rng) {
  const kinds = rng.shuffle(B.KINDS.slice(0, d.kinds));
  const n = rng.int(d.size[0], d.size[1]);
  let counts;
  if (plan === 'one') counts = [n];
  else if (plan === 'lopsided') counts = [n - 1, 1];
  else if (plan === 'two') { const a = rng.int(2, n - 2); counts = [a, n - a]; }
  else { const a = rng.int(1, n - 2), b = rng.int(1, n - a - 1); counts = [a, b, n - a - b]; }
  const present = kinds.slice(0, counts.length), absent = kinds.slice(counts.length);
  const pieces = rng.shuffle(counts.flatMap((c, i) => Array(c).fill(present[i])));
  // three rows: every kind in the bag is asked (up to three), then kinds that are not in it
  const ask = rng.shuffle([...present, ...absent].slice(0, 3));
  return { pieces, ask };
}
/** an empty bag to fill: three rows with their marks, and one bag of six that fits */
function makeDraw(pattern, rng) {
  const [a, b, c] = rng.shuffle(B.KINDS);
  const P = {
    A: { rows: [[a, 'certain'], [b, 'impossible'], [c, 'impossible']], sample: [a, a, a, a, a, a] },
    B: { rows: [[a, 'possible'], [b, 'possible'], [c, 'impossible']], sample: [a, a, a, b, b, b] },
    D: { rows: [[a, 'possible'], [b, 'possible'], [c, 'possible']], sample: [a, a, b, b, c, c] },
  }[pattern];
  return { rows: rng.shuffle(P.rows), sample: rng.shuffle(P.sample), pattern };
}

module.exports = {
  id: 'G2-507',
  slug: 'certain-possible-impossible',
  gradeBand: 'G2',
  assetClass: 'numeral-charts',
  exerciseType: 'graphing-data',
  themeAxis: { applicable: false },
  difficulty: D,
  WORDS,
  i18n: { en: { title: 'Certain, Possible, Impossible', instruction: 'You take one piece out of the bag without looking. Look at the piece at the start of each row. Is it certain, possible, or impossible that you take this piece? Mark one box in each row. Possible means it may happen, but it does not have to.' } },
  levelSetWords(m) { return (m.items || []).map(String); },

  build(args, ctx) {
    const d = this.difficulty[args.difficulty] || this.difficulty[2];
    const rng = ctx.rng, key = !!(ctx && ctx.answerKey);
    const loc = (args.locale || 'en').slice(0, 2);
    const W = WORDS[loc]; if (!W) throw new Error('G2-507: no headings for ' + loc);
    // the bags of the page: no two alike, and at least two of each answer where the plan allows it
    let bags = null;
    for (let t = 0; t < 300; t++) {
      const list = d.plan.map((p) => makeBag(p, d, rng));
      if (new Set(list.map((b) => b.pieces.slice().sort().join(''))).size < list.length) continue;
      bags = list; break;
    }
    if (!bags) throw new Error('G2-507: no page of different bags');
    const draws = d.draw ? rng.sample(['A', 'B', 'D'], d.draw).map((p) => makeDraw(p, rng)) : [];
    const cards = rng.shuffle([...bags.map((b) => ({ judge: b })), ...draws.map((x) => ({ draw: x }))]);

    const head = (s) => `<span style="font-family:'Nunito';font-weight:800;font-size:14px;line-height:1.1;color:${T.teal};text-align:center;white-space:nowrap">${s}</span>`;
    const grid = (rows) => `<div style="flex:1 1 auto;display:grid;grid-template-columns:52px repeat(3,minmax(0,1fr));row-gap:7px;column-gap:6px;align-items:center;justify-items:center"><span></span>${W.map(head).join('')}${rows}</div>`;
    const cardStyle = `flex:1 1 0;flex-direction:row;align-items:center;justify-content:flex-start;gap:22px;background:${T.cream};border:2px solid ${T.creamDeep};border-radius:14px;padding:8px 22px`;
    const html = cards.map((c) => {
      if (c.judge) {
        const b = c.judge;
        const rows = b.ask.map((k) => {
          const v = B.verdict(b.pieces, k);
          return B.piece(k, 32, `data-lcs-ask="${k}"`) + ORDER.map((o) => B.box(28, key && o === v ? 'key' : null, `data-lcs-opt="${o}"${o === v ? ' data-lcs-right="1"' : ''}`)).join('');
        }).join('');
        return `<div class="ws-card-stage" data-lcs-judge="${b.pieces.join('')}|${b.ask.join('')}" style="${cardStyle}">${B.bag({ pieces: b.pieces, px: 158 })}${grid(rows)}</div>`;
      }
      const x = c.draw;
      const rows = x.rows.map(([k, v]) => B.piece(k, 32, `data-lcs-ask="${k}"`) + ORDER.map((o) => B.box(28, o === v ? 'print' : null, `data-lcs-opt="${o}"${o === v ? ' data-lcs-given="1"' : ''}`)).join('')).join('');
      return `<div class="ws-card-stage" data-lcs-draw="${x.rows.map(([k, v]) => k + ':' + v).join(',')}|${x.sample.join('')}" style="${cardStyle}">${B.bag({ slots: 6, px: 158, sample: key ? x.sample : null })}${grid(rows)}</div>`;
    });
    const bodyHtml = `<div data-ws-content data-lcs-chance="${d.draw}" style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:stretch">${html.join('')}</div>`;
    return { bodyHtml, meta: { items: cards.map((c) => (c.judge ? c.judge.pieces.slice().sort().join('') + '/' + c.judge.ask.join('') : 'draw' + c.draw.pattern + c.draw.rows.map((r) => r[0]).join(''))) } };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-chance]'); if (!root) return ['no content'];
      const wantDraw = +root.dataset.lcsChance;
      const verdict = (pieces, k) => { const n = pieces.filter((p) => p === k).length; return n === 0 ? 'impossible' : n === pieces.length ? 'certain' : 'possible'; };
      const cards = [...document.querySelectorAll('[data-lcs-judge],[data-lcs-draw]')];
      if (cards.length !== 4) fails.push(cards.length + ' cards');
      const seen = new Set(), tally = { certain: 0, possible: 0, impossible: 0 };
      let draws = 0;
      cards.forEach((card, i) => {
        const P = 'card ' + (i + 1);
        const asks = [...card.querySelectorAll('[data-lcs-ask]')].map((e) => e.dataset.lcsAsk);
        if (asks.length !== 3 || new Set(asks).size !== 3) fails.push(P + ': three rows, three different pieces');
        const opts = [...card.querySelectorAll('[data-lcs-opt]')];
        if (opts.length !== 9) fails.push(P + ': ' + opts.length + ' boxes');
        if (card.dataset.lcsJudge != null) {
          // what is DRAWN in the bag decides, not the stamp
          const drawn = [...card.querySelectorAll('[data-lcs-in]')].map((e) => e.dataset.lcsIn);
          if (drawn.join('') !== card.dataset.lcsJudge.split('|')[0]) fails.push(P + ': the bag drawn is not the bag stamped');
          const sig = drawn.slice().sort().join(''); if (seen.has(sig)) fails.push(P + ': the same bag twice on the page'); seen.add(sig);
          asks.forEach((k, r) => {
            const v = verdict(drawn, k), row = opts.slice(r * 3, r * 3 + 3);
            const right = row.filter((e) => e.dataset.lcsRight === '1');
            if (right.length !== 1 || right[0].dataset.lcsOpt !== v) fails.push(P + ' row ' + (r + 1) + ': the key is not "' + v + '"');
            tally[v]++;
          });
          // every piece lies inside the bag and no two overlap
          const boxes = [...card.querySelectorAll('[data-lcs-in]')].map((e) => e.getBoundingClientRect());
          const bag = card.querySelector('[data-lcs-bag]').getBoundingClientRect();
          boxes.forEach((r, a) => { if (r.left < bag.left || r.right > bag.right || r.top < bag.top || r.bottom > bag.bottom) fails.push(P + ': a piece outside the bag'); boxes.forEach((q, b2) => { if (b2 > a && r.left < q.right - 1 && q.left < r.right - 1 && r.top < q.bottom - 1 && q.top < r.bottom - 1) fails.push(P + ': two pieces overlap'); }); });
        } else {
          draws++;
          const [rowsS, sampleS] = card.dataset.lcsDraw.split('|'); const sample = sampleS.split('');
          if (sample.length !== 6 || card.querySelectorAll('[data-lcs-slot]').length !== 6) fails.push(P + ': six places to draw in');
          rowsS.split(',').forEach((s, r) => {
            const [k, v] = s.split(':'), row = opts.slice(r * 3, r * 3 + 3);
            const given = row.filter((e) => e.dataset.lcsGiven === '1');
            if (given.length !== 1 || given[0].dataset.lcsOpt !== v || !given[0].querySelector('svg')) fails.push(P + ' row ' + (r + 1) + ': the printed mark is not "' + v + '"');
            if (verdict(sample, k) !== v) fails.push(P + ' row ' + (r + 1) + ': the bag of the key does not fit the mark');
          });
        }
        const cr = card.getBoundingClientRect();
        card.querySelectorAll('*').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1 || r.top < cr.top - 1)) fails.push(P + ': something runs out of it'); });
        // a heading never wraps into its neighbour
        const heads = [...card.querySelectorAll('span')].filter((e) => e.style.textAlign === 'center' && e.textContent.trim());
        heads.forEach((h, a) => heads.forEach((g, b2) => { if (b2 > a) { const r = h.getBoundingClientRect(), q = g.getBoundingClientRect(); if (r.right > q.left + 0.5 && q.right > r.left + 0.5) fails.push(P + ': two headings overlap'); } }));
      });
      if (draws !== wantDraw) fails.push(draws + ' bags to fill, the level has ' + wantDraw);
      if (!wantDraw && (tally.certain < 1 || tally.possible < 2 || tally.impossible < 2)) fails.push('the page asks ' + JSON.stringify(tally) + ': every answer must occur');
      return [...new Set(fails)];
    });
  },
};
