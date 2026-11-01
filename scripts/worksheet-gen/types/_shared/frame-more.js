/**
 * The new Ten Frames maker templates (docs/makers/NEW-TEMPLATES.md §1, T1-T7; built 2026-10-31). One factory, seven modes:
 *
 *   'double-frame'  K-448  a full ten-frame + a second one: write the teen number (L2-3 also "__ = 10 + __")
 *   'rekenrek'      K-449  the 20-bead rack: how many beads are pushed to the left (L1 one row, L2 top row full + bottom,
 *                          L3 both rows partly pushed — counted together)
 *   'quick-look'    K-450  a die / a domino: don't count, circle how many (L1 dice 1-6, L2 dice 1-9, L3 dominoes)
 *   'frame-minus'   K-451  a ten-frame with some counters crossed out: write how many are left (L3: the whole sentence)
 *   'three-ways'    K-452  numeral · ten-frame · tally: one is given in each row, the child makes the other two
 *   'flash-cards'   K-453  cut-out cards: ten-frames 1-10 (L1), double frames 11-20 (L2), numerals 1-10 (L3, to pair)
 *   'colour-parts'  K-454  colour the frame in two colours to show the parts (6 + 4 = 10); L3 finds every way itself
 *
 * Answers placed by a balanced cycle over the page (feedback_answer_position_is_part_of_the_content); counting never
 * includes 0 (every range starts at 1).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const { answerBox } = require('../../templates/components.js');
const tenFrame = require('../../primitives/ten-frame.js');
const rekenrek = require('../../primitives/rekenrek.js');
const diceFace = require('../../primitives/dice.js');
const domino = require('../../primitives/domino.js');
const tally = require('../../primitives/tally.js');
const tokens = require('../../primitives/_tokens.js');
const { COLOR_WORDS: COLORS } = require('../../data/color-words.js');
const LABELS = require('../../data/ten-frame-labels.js');

const T = (ch, px = 30, c = '#146B5E') => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;line-height:1;color:${c}">${ch}</span>`;
const NUM = (v, px = 40) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;line-height:1;color:#3A3530" data-lcs-num="${v}">${v}</span>`;
function balanced(rng, cards, slots) {
  const out = [];
  while (out.length < cards) out.push(...rng.shuffle([...Array(slots).keys()]));
  return rng.shuffle(out.slice(0, cards));
}
function counts(rng, k, lo, hi) {
  const all = []; for (let v = lo; v <= hi; v++) all.push(v);
  const out = []; while (out.length < k) out.push(...rng.shuffle(all.slice()));
  return out.slice(0, k);
}
const chipRow = (choices, correct, size = 52) => `<div class="ws-choices">` + choices.map((v) =>
  `<span class="ws-chip" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.52)}px" data-lcs-choice="${v}"${v === correct ? ' data-lcs-correct="1"' : ''}>${v}</span>`).join('') + `</div>`;

const DIFF = {
  'double-frame': { 1: { lo: 11, hi: 15, cards: 4, sentence: false, pics: false }, 2: { lo: 11, hi: 20, cards: 4, sentence: true, pics: false }, 3: { lo: 11, hi: 20, cards: 4, sentence: true, pics: true } },
  rekenrek: { 1: { rows: 1, lo: 1, hi: 10, cards: 5, split: false }, 2: { rows: 2, lo: 11, hi: 20, cards: 4, split: false }, 3: { rows: 2, lo: 8, hi: 18, cards: 4, split: true } },
  'quick-look': { 1: { kind: 'die', min: 1, max: 6, cards: 6, choices: 3 }, 2: { kind: 'die', min: 4, max: 9, cards: 6, choices: 3 }, 3: { kind: 'domino', max: 6, cards: 6, choices: 4 } },
  'frame-minus': { 1: { lo: 2, hi: 5, cards: 4, sentence: false }, 2: { lo: 3, hi: 10, cards: 6, sentence: false }, 3: { lo: 4, hi: 10, cards: 6, sentence: true } },
  'three-ways': { 1: { lo: 1, hi: 5, rows: 4, given: ['num', 'frame', 'tally'] }, 2: { lo: 1, hi: 10, rows: 4, given: ['num', 'frame', 'tally'] }, 3: { lo: 11, hi: 20, rows: 4, given: ['num', 'frame', 'tally'] } },
  'flash-cards': { 1: { set: 'frames' }, 2: { set: 'double' }, 3: { set: 'pairs' } },
  'colour-parts': { 1: { whole: 5, cards: 4, find: false }, 2: { whole: 10, cards: 4, find: false }, 3: { whole: 10, cards: 5, find: true } },
};

/** two frames side by side for 11..20 (the first always full) */
const doubleFrame = (v, cell, iconHref) => `<span style="display:inline-flex;gap:10px">${tenFrame({ a: Math.min(10, v), cell, iconHref }).svg}${tenFrame({ a: Math.max(0, v - 10), cell, iconHref }).svg}</span>`;

function makeFrameMoreType(cfg) {
  const { id, slug, mode, i18n } = cfg;
  const themed = mode === 'double-frame';
  return {
    id,
    slug,
    gradeBand: 'K',
    assetClass: 'ten-frames',
    exerciseType: mode === 'three-ways' ? 'counting-frames' : 'counting-frames',
    themeAxis: { applicable: themed, minNouns: 4 },
    difficulty: DIFF[mode],
    i18n,

    build({ theme, difficulty, locale }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const loc = (locale || 'en').slice(0, 2);
      const L = LABELS[loc] || LABELS.en;
      const cards = [];
      const truth = [];

      if (mode === 'double-frame') {
        const ns = counts(rng, d.cards, d.lo, d.hi);
        const pics = d.pics ? slot.pictures(ctx, rng.sample(labelSafeNouns(theme), d.cards), labelSafeNouns(theme), theme) : null;
        ns.forEach((v, i) => {
          const href = pics ? fileUri(theme, pics[i].noun) : undefined;
          const sentence = d.sentence
            ? `<span style="display:inline-flex;align-items:center;gap:8px">${answerBox({ w: 60, h: 52, answer: v })}${T('=')}${NUM(10, 34)}${T('+')}${answerBox({ w: 60, h: 52, answer: v - 10 })}</span>`
            : answerBox({ w: 70, h: 56, answer: v });
          cards.push(`<div class="ws-card-stage" style="gap:22px;padding:4px 8px 4px 36px;justify-content:space-between" data-lcs-count="${v}"${pics ? slot.attr(ctx, 'pic', i) : ''}>${doubleFrame(v, 34, href)}${sentence}</div>`);
          truth.push({ n: v });
        });
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.cards }), meta: { cards: truth } };
      }

      if (mode === 'rekenrek') {
        const ns = counts(rng, d.cards, d.lo, d.hi);
        ns.forEach((v) => {
          // L1 one row; L2 the top row full (ten), then the rest; L3 both rows partly pushed (e.g. 7 + 6), never a full row
          let rows;
          if (d.rows === 1) rows = [v];
          else if (!d.split) rows = [Math.min(10, v), Math.max(0, v - 10)];
          else { const top = rng.int(Math.max(1, v - 9), Math.min(9, v - 1)); rows = [top, v - top]; }
          const rack = rekenrek({ rows, size: 30 }).svg;
          const stage = `<span style="flex:1 1 auto;display:flex;justify-content:center;min-width:0">${rack}</span>${T('→')}${answerBox({ w: 68, h: 56, answer: v })}`;
          cards.push(`<div class="ws-card-stage" style="gap:16px;padding:4px 10px 4px 36px" data-lcs-count="${v}" data-lcs-rows="${rows.join(',')}">${stage}</div>`);
          truth.push({ n: v, rows });
        });
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.cards }), meta: { cards: truth } };
      }

      if (mode === 'quick-look') {
        const pos = balanced(rng, d.cards, d.choices);
        // no item twice on a page (review 2026-10-31: the same 8-pip die came twice)
        const dieValues = d.kind === 'die' ? counts(rng, d.cards, d.min, d.max) : null;
        const usedTotals = new Set();
        for (let i = 0; i < d.cards; i++) {
          let v, pic;
          if (d.kind === 'die') { v = dieValues[i]; pic = diceFace({ n: v, size: 104 }).svg; }
          else {
            let a, b, g = 0;
            do { a = rng.int(1, 6); b = rng.int(1, 6); } while (usedTotals.has(a + b) && g++ < 50);
            usedTotals.add(a + b); v = a + b; pic = domino({ a, b, size: 108 }).svg;
          }
          // distractors within ±2 (never an absurd choice), on both sides where they exist; the answer at a balanced place
          const lo = d.kind === 'die' ? 1 : 2, hi = d.kind === 'die' ? d.max : 12;
          const near = [v - 1, v + 1, v - 2, v + 2].filter((x) => x >= lo && x <= hi);
          const wrong = rng.shuffle(near.slice(0, Math.max(d.choices - 1, 0) + 1)).slice(0, d.choices - 1);
          while (wrong.length < d.choices - 1) { const x = [v + 3, v - 3, v + 4].find((y) => y >= lo && y <= hi && !wrong.includes(y)); if (x === undefined) break; wrong.push(x); }
          const choices = rng.shuffle(wrong);
          choices.splice(pos[i], 0, v);
          cards.push(`<div class="ws-card-stage" data-lcs-count="${v}">${pic}</div>${chipRow(choices, v, d.choices === 4 ? 48 : 52)}`);
          truth.push({ n: v, choices });
        }
        return { bodyHtml: cardGrid({ cards, cols: 2, rows: 3 }), meta: { cards: truth } };
      }

      if (mode === 'frame-minus') {
        // what is LEFT (the answer) is drawn first, spread over 1 … hi − 1, then what is taken away (1, 2 or 3 in equal
        // shares, review: five of six took 1), then the start = left + taken, kept in lo … hi. Drawing the start first
        // made "1 left" the answer on 56 % of the level-1 cards (task 4 settings-space, 2026-11-01).
        const lefts = counts(rng, d.cards, 1, d.hi - 1);
        const takes = balanced(rng, lefts.length, 3).map((x) => x + 1);
        // the take, raised if the start would fall below lo, lowered if it would pass hi (left ≤ hi − 1, so it stays ≥ 1)
        const ns = lefts.map((left, i) => left + Math.min(Math.max(takes[i], d.lo - left), d.hi - left));
        ns.forEach((v, i) => {
          const k = v - lefts[i];   // something is always left (never 0)
          const frame = tenFrame({ a: v, cell: d.cards <= 4 ? 58 : 40, crossed: k }).svg;   // four big cards at level 1: a big frame
          const sentence = d.sentence
            ? `${answerBox({ w: 46, h: 46, answer: v })}${T('−', 26)}${answerBox({ w: 46, h: 46, answer: k })}${T('=', 26)}${answerBox({ w: 46, h: 46, answer: v - k })}`
            : `${NUM(v, 30)}${T('−', 26)}${NUM(k, 30)}${T('=', 26)}${answerBox({ w: 52, h: 48, answer: v - k })}`;
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:12px" data-lcs-count="${v}" data-lcs-crossed="${k}">${frame}<span style="display:inline-flex;align-items:center;gap:8px">${sentence}</span></div>`);
          truth.push({ n: v, k, left: v - k });
        });
        return { bodyHtml: cardGrid({ cards, cols: 2, rows: Math.ceil(d.cards / 2) }), meta: { cards: truth } };
      }

      if (mode === 'three-ways') {
        // a header row + one row per number; what is given rotates evenly (never always the numeral)
        const ns = counts(rng, d.rows, d.lo, d.hi);
        const given = balanced(rng, d.rows, d.given.length).map((k) => d.given[k]);
        // squares a child can draw a dot in: 40 px (≈ 10 mm) for one frame; two frames get the wide middle column, 30 px
        const cell = d.hi > 10 ? 30 : 40;
        const cols = d.hi > 10 ? '0.8fr 3fr 1.4fr' : '1fr 2fr 1.6fr';
        const head = `<div class="ws-tw-row ws-tw-head" style="display:grid;grid-template-columns:${cols};gap:10px;padding:0 6px 0 36px;font-family:'Nunito';font-weight:800;font-size:17px;color:#146B5E;text-align:center"><span>${L.number}</span><span>${L.tenFrame}</span><span>${L.tally}</span></div>`;
        ns.forEach((v, i) => {
          const g = given[i];
          const num = g === 'num' ? NUM(v, 44) : answerBox({ w: 72, h: 60, answer: v });
          const showFrame = g === 'frame' || ctx.answerKey, showTally = g === 'tally';
          const frame = showFrame ? (v > 10 ? doubleFrame(v, cell) : tenFrame({ a: v, cell }).svg) : (v > 10 ? doubleFrame(0, cell) : tenFrame({ a: 0, cell }).svg);
          const tal = showTally ? tally({ n: v, strokeH: 40 }).svg : `<span class="ws-answerbox" style="width:180px;height:62px" data-lcs-answer="${v}" data-lcs-draw-tally="1">${ctx.answerKey ? `<span data-lcs-key-sample="1">${tally({ n: v, strokeH: 34 }).svg}</span>` : ''}</span>`;
          const cellBox = (x, kind) => `<span style="display:flex;align-items:center;justify-content:center;min-width:0;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:6px" data-lcs-way="${kind}"${g === kind ? ' data-lcs-given="1"' : ''}>${x}</span>`;
          cards.push(`<div class="ws-card-stage" style="display:grid;grid-template-columns:${cols};gap:10px;padding:4px 6px 4px 36px;align-items:stretch" data-lcs-count="${v}" data-lcs-given-kind="${g}">${cellBox(num, 'num')}${cellBox(ctx.answerKey && g !== 'frame' ? `<span data-lcs-key-sample="1">${frame}</span>` : frame, 'frame')}${cellBox(tal, 'tally')}</div>`);
          truth.push({ n: v, given: g });
        });
        return { bodyHtml: `<div style="display:flex;flex-direction:column;height:100%;min-height:0;gap:6px">${head}<div style="flex:1 1 auto;min-height:0;display:flex">${cardGrid({ cards, cols: 1, rows: d.rows })}</div></div>`, meta: { cards: truth } };
      }

      if (mode === 'flash-cards') {
        // the whole set on one page (a teacher wants all of 1-10 / 11-20), shuffled; dashed cut lines between cards
        const set = d.set === 'double' ? [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const order = d.set === 'pairs'
          ? rng.shuffle(rng.sample(set, 5).flatMap((v) => [{ v, k: 'frame' }, { v, k: 'num' }]))
          : rng.shuffle(set.slice()).map((v) => ({ v, k: d.set === 'double' ? 'double' : 'frame' }));
        const cardsHtml = order.map(({ v, k }) => {
          const face = k === 'num' ? NUM(v, 92) : k === 'double' ? doubleFrame(v, 28) : tenFrame({ a: v, cell: 50 }).svg;
          return `<div class="ws-flash-card ws-card-stage" data-lcs-card-value="${v}" data-lcs-card-kind="${k}" style="display:flex;align-items:center;justify-content:center;border:2.5px dashed #C8BFAE;background:#FFFFFF;box-sizing:border-box;min-height:0">${face}</div>`;
        }).join('');
        return {
          bodyHtml: `<div class="ws-flash-grid" data-ws-content style="flex:1 1 auto;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(5,1fr);height:100%;min-height:0">${cardsHtml}</div>`,
          meta: { cards: order.map((c) => c.v + ':' + c.k) },
        };
      }

      if (mode === 'colour-parts') {
        const C = COLORS[loc] || COLORS.en;
        const swatch = (key, hex) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px"><span style="width:26px;height:26px;border-radius:50%;background:${hex};border:2px solid #3A3530"></span><span style="font-family:'Nunito';font-weight:800;font-size:14px;color:#3A3530">${C[key]}</span></span>`;
        const red = tokens.codeColors.codeRed, blue = tokens.codeColors.codeBlue;
        const legend = `<div style="display:flex;justify-content:center;gap:28px;padding:0 0 8px">${swatch('red', red)}${swatch('blue', blue)}</div>`;
        // a whole of 5 uses one row of a ten-frame (the five-frame): the frame is drawn half — the top row only
        const frameFor = (w, a = 0) => (w === 5 ? fiveFrame(66, ctx.answerKey ? a : 0, [red, blue]) : tenFrame({ a: ctx.answerKey ? a : 0, b: ctx.answerKey ? 10 - a : 0, cell: d.find ? 50 : 56, ...(ctx.answerKey ? { fills: [red, blue] } : {}) }).svg);   // squares big enough to colour in
        if (d.find) {
          // L3: every way to make 10 with two colours (1+9 … 9+1, never 0): five frames, the child finds and writes the pairs
          for (let i = 0; i < d.cards; i++) {
            const ka = i + 1;   // the key's example: 1+9, 2+8, … 5+5 — one different way per frame
            cards.push(`<div class="ws-card-stage" style="gap:18px;padding:4px 10px 4px 36px;justify-content:space-between" data-lcs-whole="10" data-lcs-find="1">${frameFor(10, ka)}` +
              `<span style="display:inline-flex;align-items:center;gap:8px"><span style="width:16px;height:16px;border-radius:50%;background:${red};border:2px solid #3A3530"></span>${answerBox({ w: 50, h: 48, answer: ctx.answerKey ? ka : '' })}${T('+', 26)}<span style="width:16px;height:16px;border-radius:50%;background:${blue};border:2px solid #3A3530"></span>${answerBox({ w: 50, h: 48, answer: ctx.answerKey ? 10 - ka : '' })}${T('=', 26)}${NUM(10, 32)}</span></div>`);
          }
          return { bodyHtml: `<div style="display:flex;flex-direction:column;height:100%;min-height:0">${legend}<div style="flex:1 1 auto;min-height:0;display:flex">${cardGrid({ cards, cols: 1, rows: d.cards })}</div></div>`, meta: {} };
        }
        const ps = counts(rng, d.cards, 1, d.whole - 1);
        ps.forEach((a) => {
          const b = d.whole - a;
          const eq = `<span style="display:inline-flex;align-items:center;gap:8px"><span style="display:inline-flex;align-items:center;gap:6px"><span style="width:18px;height:18px;border-radius:50%;background:${red};border:2px solid #3A3530"></span>${NUM(a, 34)}</span>${T('+', 28)}<span style="display:inline-flex;align-items:center;gap:6px"><span style="width:18px;height:18px;border-radius:50%;background:${blue};border:2px solid #3A3530"></span>${NUM(b, 34)}</span>${T('=', 28)}${NUM(d.whole, 34)}</span>`;
          cards.push(`<div class="ws-card-stage" style="gap:18px;padding:4px 10px 4px 36px;justify-content:space-between" data-lcs-whole="${d.whole}" data-lcs-red="${a}" data-lcs-blue="${b}">${frameFor(d.whole, a)}${eq}</div>`);
          truth.push({ red: a, blue: b });
        });
        return { bodyHtml: `<div style="display:flex;flex-direction:column;height:100%;min-height:0">${legend}<div style="flex:1 1 auto;min-height:0;display:flex">${cardGrid({ cards, cols: 1, rows: d.cards })}</div></div>`, meta: { cards: truth } };
      }
      throw new Error(`${id}: unknown mode ${mode}`);
    },

    async verify(page) {
      return page.evaluate((mode) => {
        const fails = [];
        const cards = [...document.querySelectorAll('[data-lcs-card]')];
        const positions = [];
        cards.forEach((card, i) => {
          const c = `card ${i + 1}`;
          const st = card.querySelector('[data-lcs-count]');
          const v = st ? +st.dataset.lcsCount : null;
          if (mode === 'double-frame') {
            const dots = st.querySelectorAll('[data-lcs-counter]').length;
            if (dots !== v) fails.push(`${c}: ${dots} counters != ${v}`);
            const a = [...card.querySelectorAll('[data-lcs-answer]')].map((x) => x.dataset.lcsAnswer);
            if (a[0] !== String(v) || (a.length === 2 && a[1] !== String(v - 10))) fails.push(`${c}: answers ${a}`);
          } else if (mode === 'rekenrek') {
            const left = st.querySelectorAll('[data-lcs-bead="left"]').length;
            const shown = st.dataset.lcsRows.split(',').reduce((s, x) => s + +x, 0);
            if (left !== shown) fails.push(`${c}: ${left} beads left != ${shown}`);
            if (shown && shown !== v) fails.push(`${c}: rows ${shown} != ${v}`);
          } else if (mode === 'quick-look') {
            const pips = st.querySelectorAll('[data-lcs-pip], circle').length;
            const chips = [...card.querySelectorAll('[data-lcs-choice]')];
            const ok = chips.filter((x) => x.dataset.lcsCorrect);
            if (ok.length !== 1 || +ok[0].dataset.lcsChoice !== v) fails.push(`${c}: right chip`);
            if (new Set(chips.map((x) => x.dataset.lcsChoice)).size !== chips.length) fails.push(`${c}: a chip twice`);
            positions.push(chips.indexOf(ok[0]));
            if (!pips) fails.push(`${c}: no pips`);
          } else if (mode === 'frame-minus') {
            const k = +st.dataset.lcsCrossed;
            const crossed = st.querySelectorAll('[data-lcs-cross]').length / 2;
            if (crossed !== k) fails.push(`${c}: ${crossed} crossed != ${k}`);
            const ans = [...card.querySelectorAll('[data-lcs-answer]')].map((x) => +x.dataset.lcsAnswer);
            if (ans[ans.length - 1] !== v - k || v - k < 1) fails.push(`${c}: left != ${v - k}`);
          } else if (mode === 'three-ways') {
            const given = card.querySelectorAll('[data-lcs-given]');
            if (given.length !== 1) fails.push(`${c}: ${given.length} given`);
            positions.push(st.dataset.lcsGivenKind);
            const counters = st.querySelectorAll('[data-lcs-counter]').length;
            if (st.dataset.lcsGivenKind === 'frame' && counters !== v) fails.push(`${c}: frame shows ${counters} != ${v}`);
            if (st.dataset.lcsGivenKind !== 'frame' && counters) fails.push(`${c}: the frame to fill is not empty`);
          } else if (mode === 'colour-parts') {
            if (st && st.dataset.lcsRed && +st.dataset.lcsRed + +st.dataset.lcsBlue !== +st.dataset.lcsWhole) fails.push(`${c}: parts do not make the whole`);
          }
        });
        if (mode === 'flash-cards') {
          const vals = [...document.querySelectorAll('[data-lcs-card-value]')].map((x) => +x.dataset.lcsCardValue);
          const kinds = [...document.querySelectorAll('[data-lcs-card-kind]')].map((x) => x.dataset.lcsCardKind);
          const pairs = kinds.includes('num');
          if (vals.length !== 10 || new Set(vals).size !== (pairs ? 5 : 10)) fails.push(`flash cards: ${vals.length} cards, ${new Set(vals).size} different`);
          if (pairs) for (const v of new Set(vals)) { const ks = [...document.querySelectorAll(`[data-lcs-card-value="${v}"]`)].map((x) => x.dataset.lcsCardKind).sort().join(); if (ks !== 'frame,num') fails.push(`pair ${v}: ${ks}`); }
          document.querySelectorAll('[data-lcs-card-value]').forEach((x) => {
            const n = x.querySelectorAll('[data-lcs-counter]').length;
            if (n && n !== +x.dataset.lcsCardValue) fails.push(`flash card ${x.dataset.lcsCardValue}: ${n} counters`);
          });
        }
        if (positions.length >= 3 && new Set(positions).size < 2) fails.push(`the answer / the given way is always the same (${positions.join(',')})`);
        return fails;
      }, mode);
    },
  };
}

/** a five-frame (one row of five) for wholes of 5, drawn like the ten-frame's top row */
function fiveFrame(cell, a = 0, fills) {
  const t = tokens.color;
  const W = 5 * cell + 6, H = cell + 6;
  let lines = '';
  // the colouring key: the first a squares in the first colour, the rest in the second
  if (a) for (let i = 0; i < 5; i++) lines += `<rect x="${6 + i * cell}" y="6" width="${cell - 6}" height="${cell - 6}" rx="4" fill="${i < a ? fills[0] : fills[1]}" data-lcs-key-sample="1"/>`;
  for (let c = 1; c < 5; c++) lines += `<line x1="${3 + c * cell}" y1="6" x2="${3 + c * cell}" y2="${H - 6}" stroke="${t.teal}" stroke-width="1.5" opacity="0.55"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="five frame" data-lcs-prim="five-frame"><rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="10" fill="${t.white}" stroke="${t.teal}" stroke-width="3"/>${lines}</svg>`;
}

module.exports = { makeFrameMoreType };
