/**
 * Factory for the graphs & data family (class 8):
 *  - 'pict-read':    pictograph → write each row's count (G1-141; scaled G2-238/G3-333)
 *  - 'pict-which':   pictograph → circle the category with most/least (G1-142)
 *  - 'bar-read':     bar graph → write each bar's value (G1-143; scaled G3-332)
 *  - 'bar-which':    bar graph → circle tallest/shortest category (G1-144)
 *  - 'bar-2step':    bar graph → two symbolic questions ([A]+[B]=, [A]−[B]=) (G2-237)
 *  - 'bar-fill':     value table → empty gridded graph (G3-334)
 *  - 'tally-fill':   tally chart → empty gridded graph (G2-239)
 *  - 'lineplot':     line plot → write counts per value (G2-240; fractions G3-335)
 *  - 'table-sort':   mixed picture strip → count each kind into a table (G1-146)
 *  - 'pict-fill':    counts table → empty pictograph grid (G1-147)
 *
 * PAGE REDESIGN (2026-10-08, operator: "Half of the page is blank in some designs. It is unacceptable."). Every face
 * left half its page empty: a small fixed-size graph centred in the body, or the graph's frame (`.ws-scene`, which
 * flex-grows) stretched to the page around a small graph. Now every page is laid out for the 675 × ~800 body: graphs
 * sized from the space available, frames that hug their graph, large answer cards — and verify() MEASURES it (content
 * covers ≥ 55 % of the body height, no empty band over 20 %, no framed box under half full, no squeezed answer box).
 * Teaching fixes on every level (the published pages are republished): a graph's pictures never look alike
 * (lib/picture-distinct.js — an apple, a fig and a pomegranate were three categories), the line plots ask EVERY plotted
 * number (one was never asked), and Sort and Count draws the table its instruction names.
 *
 * Level Set (2026-10-08, PDF + interactive): level 2 copy 1 is the published page (its numbers unchanged); every other
 * page gets a screen version + answer key (lib/graph-screen.js).
 */
'use strict';
const barGraph = require('../../primitives/bar-graph.js');
const pictograph = require('../../primitives/pictograph.js');
const linePlot = require('../../primitives/line-plot.js');
const tallyPrim = require('../../primitives/tally.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');
const { makeRng } = require('../../lib/rng.js');
const { distinctPick } = require('../../lib/picture-distinct.js');
const slot = require('../../lib/slot.js');
const B2 = require('../../lib/b2-common.js');

const FW = 640;   // the widest a graph may be: the 675-px body minus its frame
/**
 * The class survey's choices per theme (G1-481, native + pedagogy review 2026-11-02): a child can only say which one they
 * like best of things they know — nectarine, pomegranate, papaya are no vote for a six-year-old. Everyday things only;
 * a theme without a list is not offered for the survey (its pages cannot build).
 */
const SURVEY_CHOICES = {
  fruits: ['apple', 'banana', 'orange', 'strawberry', 'pear', 'watermelon', 'cherry', 'peach', 'pineapple', 'blueberry', 'raspberry', 'kiwi'],
  vegetables: ['carrot', 'corn', 'tomato', 'potato', 'broccoli', 'cucumber', 'pumpkin', 'lettuce', 'mushroom'],
  pets: ['cat', 'dog', 'fish', 'rabbit', 'hamster', 'turtle', 'parrot', 'mouse'],
  toys: ['ball', 'doll', 'kite', 'blocks', 'car', 'train', 'robot', 'bicycle', 'balloon', 'scooter', 'slide', 'swing'],
  vehicles: ['car', 'bus', 'bicycle', 'train', 'airplane', 'boat', 'truck', 'helicopter', 'scooter', 'motorcycle', 'tractor', 'rocket'],
  activities: ['soccer', 'swimming', 'dancing', 'reading', 'painting', 'biking', 'running', 'singing', 'skating', 'basketball', 'playground', 'jumping'],
  'desserts and sweets': ['cake', 'cookie', 'cupcake', 'donut', 'lollipop', 'pancake', 'muffin', 'pie', 'popsicle', 'waffle'],
  breakfast: ['cereal', 'toast', 'pancake', 'banana', 'apple', 'milk', 'juice', 'oatmeal', 'strawberry', 'orange'],
  music: ['drum', 'guitar', 'piano', 'flute', 'trumpet', 'violin', 'xylophone'],
  'zoo animals': ['lion', 'elephant', 'giraffe', 'monkey', 'zebra', 'tiger', 'bear', 'panda', 'kangaroo', 'hippopotamus'],
  'farm animals': ['cow', 'pig', 'horse', 'sheep', 'chicken', 'duck', 'goat', 'rabbit', 'dog', 'cat'],
  colors: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'black', 'white', 'brown'],
  'ocean life': ['fish', 'crab', 'dolphin', 'octopus', 'shark', 'whale', 'starfish', 'seal', 'jellyfish'],
  'insects and bugs': ['butterfly', 'ladybug', 'bee', 'ant', 'snail', 'spider', 'caterpillar', 'dragonfly'],
};
const TEAL = '#146B5E', INK = '#3A3530';

function distinctVals(rng, n, lo, hi) {
  const s = new Set(); let g = 0;
  while (s.size < n && g++ < 200) s.add(rng.int(lo, hi));
  return [...s];
}

const ICON = (href, px, extra) =>
  `<span class="ws-pattern-slot" style="width:${px + 16}px;height:${px + 16}px"${extra || ''}>` +
  `<img class="ws-icon" src="${href}" alt="" style="width:${px}px;height:${px}px"></span>`;
const SYM = (s, px) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;color:${TEAL}">${s}</span>`;
const NUMTXT = (s, px) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;color:${INK}">${s}</span>`;
/** a frame that HUGS its graph (never the flex-growing .ws-scene) */
const frame = (svg, extra) =>
  `<div class="ws-graph" data-lcs-frame style="flex:0 0 auto;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:14px;padding:14px;display:flex;justify-content:center"${extra || ''}>${svg}</div>`;
const card = (inner, attrs) =>
  `<span class="ws-gcard" style="display:inline-flex;align-items:center;justify-content:center;gap:12px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:14px;padding:10px 16px"${attrs || ''}>${inner}</span>`;
const grid = (cards, cols, gap) =>
  `<div style="display:grid;grid-template-columns:repeat(${cols},auto);gap:${gap || 16}px 22px;justify-content:center">${cards.join('')}</div>`;
const column = (inner, attrs) =>
  `<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;min-height:0"${attrs || ''}>${inner}</div>`;

/** the largest pictograph cell that fits FW with `slots` stamps (and at most `cap`) */
/** an answer card: picture = box (compact when three sit in one row) */
const ansCard = (href, ans, three, attrs) => (three
  ? card(ICON(href, 42) + SYM('=', 26) + answerBox({ w: 66, h: 54, answer: ans }), attrs).replace('padding:10px 16px', 'padding:8px 10px')
  : card(ICON(href, 52) + SYM('=', 30) + answerBox({ w: 80, h: 60, answer: ans }), attrs));
const pictCell = (slots, cap) => Math.max(30, Math.min(cap, Math.floor((FW - 40 - 6 * slots) / (slots + 1))));

function makeGraphType(cfg) {
  const { id, slug, mode, scale, which, gradeBand, i18n, fracLabels } = cfg;
  const screenLib = () => require('../../lib/graph-screen.js');
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'graphs',
    exerciseType: 'graphing-data',
    themeAxis: { applicable: true, minNouns: 4 },
    // most / tallest: level 1 shows FOUR small rows (one question over three pictures was a 1-in-3 guess on the screen)
    difficulty: cfg.difficulty || {
      1: { cats: /which$/.test(mode) ? 4 : 3, maxN: 5 },
      2: { cats: 4, maxN: 8 },
      3: { cats: 4, maxN: 10 },
    },
    i18n,
    graphMode: mode,
    // the class survey is the class's own data: no right answer, no screen, no key (material)
    interactive: mode === 'survey' ? undefined : require('../../lib/graph-screen.js').interactiveFor(mode, which, scale || 1),
    /** Level Set copies: what a page asks (build-waves compares copies by these) */
    levelSetWords(m) { return (m.asks || []).map(String); },

    build({ theme, difficulty, locale }, ctx) {
      // (the maker-only modes have no published catalogue face: their level 2, copy 1 builds its key like every page)
      const published = mode !== 'scene-fill' && mode !== 'survey' && Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
      if (mode !== 'survey' && (!published || (ctx && ctx.publishedScreen && ctx.interactive)) && ctx && (ctx.interactive || ctx.answerKey)) {
        const built = this.build({ theme, difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
        // the build faces' key draws the graph FILLED: the same page again from a fresh stream of the same seed
        const rebuildFilled = () => this.build({ theme, difficulty, locale }, { ...ctx, rng: makeRng(ctx.rng.seed), interactive: false, answerKey: false, keyFill: true });
        return screenLib().screenOrKey(built, { ...ctx, locale: (locale || 'en').slice(0, 2), theme, mode, which, scale: scale || 1, rebuildFilled });
      }
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const sc = scale || 1;
      const lv = Number(difficulty);
      // the draws below keep their published order (the published pages keep their numbers)
      // the class survey names its choices (a class votes for a WORD it can read aloud, not a picture to guess): only
      // pictures with a word in the page's language (and not a word the vocabulary has wrong there: lib/b2-common.js)
      const L2 = (locale || 'en').slice(0, 2);
      const wordOf = (n) => { const e = !B2.excluded(n.vocabKey, L2) && B2.vocab()[n.vocabKey] && B2.vocab()[n.vocabKey][L2]; return e && e[0] ? B2.displayWord(e[0], L2) : null; };
      const pool = mode === 'survey' ? labelSafeNouns(theme).filter((n) => (SURVEY_CHOICES[theme] || []).includes(n.vocabKey) && wordOf(n)) : labelSafeNouns(theme);
      if (mode === 'survey' && pool.length < d.cats + 2) throw new Error(`${id}: theme ${theme} has no class-survey choices (${pool.length} everyday pictures with a word in ${L2})`);
      let nouns = rng.sample(pool, d.cats);
      let values;
      if (mode === 'tally-fill') {
        values = []; const usedV = new Set();
        for (let i = 0; i < d.cats; i++) { let v, g = 0; do { v = rng.int(1, d.maxN); g++; } while (usedV.has(v) && g < 20); usedV.add(v); values.push(v); }
      } else values = distinctVals(rng, d.cats, 1, d.maxN).map((v) => v * sc);
      const hrefOf = (n) => fileUri(theme, n.noun);
      const dataAttr = (extra) => ` data-lcs-values="${values.join(',')}" data-lcs-theme="${theme}"${extra || ''}`;
      const C = { mode, which, scale: sc, theme, values, items: [] };

      // pictures that LOOK alike never stand for two categories (a separate stream: the page's own draws stay put)
      // tap-to-edit (lib/slot.js, makers 2026-11-02): the categories AS DRAWN (after the look-alike fix) are the slots; a
      // teacher's picture that would look like another category on the page is refused — the other pictures never move
      const swapped = !!(ctx && ctx.overrides && ctx.overrides.pic);
      const slotNouns = (k) => {
        const shown = slot.pictures(ctx, nouns.slice(0, k), pool, theme);
        if (swapped && shown.some((x, i) => x !== nouns[i]) && distinctPick(theme, shown, pool, makeRng(rng.seed + '|distinct')).some((x, i) => x.noun !== shown[i].noun)) {
          throw new Error(`${id}: the chosen picture looks like another category on the page (the swap is refused)`);
        }
        nouns = shown.concat(nouns.slice(k));
      };
      const fixNouns = (k) => { nouns = distinctPick(theme, nouns.slice(0, k), pool, makeRng(rng.seed + '|distinct')).concat(nouns.slice(k)); slotNouns(k); };
      const iconSlots = (k) => (ctx && ctx.slotsOut ? Array.from({ length: k }, (_, i) => 'pic.' + i) : null);

      let body;
      if (mode === 'pict-read' || mode === 'pict-which' || mode === 'pict-fill') {
        fixNouns(nouns.length);
        const hrefs = nouns.map(hrefOf);
        const slots = Math.max(...values.map((v) => Math.ceil(v / sc)));
        const fill = mode === 'pict-fill';
        const gSlots = fill ? Math.max(...values) : slots;
        const cell = pictCell(gSlots, nouns.length === 3 ? 88 : 76);
        const belowH = mode === 'pict-read' ? (nouns.length === 4 ? 190 : 96) : mode === 'pict-which' ? 110 : 90;
        const targetH = 800 - belowH - 150 - (sc > 1 ? 50 : 0);
        const rowGap = Math.round(Math.max(cell * 0.4, Math.min(cell * 1.1, (targetH - nouns.length * cell) / nouns.length)));
        const g = pictograph({ rows: nouns.map((n, i) => ({ iconHref: hrefs[i], n: values[i] })), scale: sc, cell, rowGap, iconSlots: iconSlots(nouns.length),
          keyScale: sc > 1 ? 1.7 : 1, ...(fill ? (ctx.keyFill ? { slots: gSlots } : { emptyGrid: true, slots: gSlots }) : {}) });
        if (mode === 'pict-read') {
          const cards = nouns.map((n, i) => ansCard(hrefs[i], values[i], nouns.length === 3, ` data-lcs-row="${i}" data-lcs-rown="${values[i]}"`));
          body = column(frame(g.svg) + grid(cards, nouns.length === 4 ? 2 : 3), dataAttr(` data-lcs-scale="${sc}"`));
        } else if (mode === 'pict-which') {
          const target = which === 'most' ? values.indexOf(Math.max(...values)) : values.indexOf(Math.min(...values));
          const chips = nouns.map((n, i) => ICON(hrefs[i], 72, (i === target ? ' data-lcs-correct="1"' : '') + ` data-lcs-cat="${i}"`));
          body = column(frame(g.svg) + `<div style="display:flex;gap:26px">${chips.join('')}</div>`, dataAttr(` data-lcs-which="${which}"`));
        } else {
          const cards = nouns.map((n, i) => card(ICON(hrefs[i], 44) + NUMTXT(values[i], 34), ` data-lcs-row="${i}" data-lcs-rown="${values[i]}"`));
          body = column(grid(cards, nouns.length, 14) + frame(g.svg), dataAttr());
        }
        C.items = nouns.map((n, i) => ({ noun: n.noun, v: values[i] }));
      } else if (mode === 'bar-read' || mode === 'bar-which' || mode === 'bar-2step') {
        let i1, i2;
        if (mode === 'bar-2step') {
          [i1, i2] = rng.sample(values.map((_, i) => i), 2);
          // a NEW page subtracts two bars at least 2 apart (a difference of 1 is always the smallest option on the screen)
          if (!published && Math.abs(values[i1] - values[i2]) < 2) {
            const pairs = []; values.forEach((a, x) => values.forEach((b, y) => { if (x < y && Math.abs(a - b) >= 2) pairs.push([x, y]); }));
            if (pairs.length) [i1, i2] = pairs[Math.floor(makeRng(rng.seed + '|pair').next() * pairs.length)];
          }
        }
        fixNouns(nouns.length);
        const hrefs = nouns.map(hrefOf);
        const three = nouns.length === 3;
        const below = mode === 'bar-read' ? (three ? 100 : 196) : mode === 'bar-which' ? 110 : 190;
        const h = Math.min(560, 800 - below - 120);
        const g = barGraph({ values, iconHrefs: hrefs, iconSlots: iconSlots(nouns.length), yMax: Math.max(...values) + (mode === 'bar-read' && sc > 1 ? sc : 1), yStep: mode === 'bar-read' ? sc : 1,
          w: FW, h, padL: 58, padB: 78, fontSize: 20, iconSize: 58, barMax: 110 });
        if (mode === 'bar-read') {
          const cards = nouns.map((n, i) => ansCard(hrefs[i], values[i], nouns.length === 3, ` data-lcs-row="${i}" data-lcs-rown="${values[i]}"`));
          body = column(frame(g.svg) + grid(cards, three ? 3 : 2), dataAttr());
        } else if (mode === 'bar-which') {
          const target = which === 'most' ? values.indexOf(Math.max(...values)) : values.indexOf(Math.min(...values));
          const chips = nouns.map((n, i) => ICON(hrefs[i], 72, (i === target ? ' data-lcs-correct="1"' : '') + ` data-lcs-cat="${i}"`));
          body = column(frame(g.svg) + `<div style="display:flex;gap:26px">${chips.join('')}</div>`, dataAttr(` data-lcs-which="${which}"`));
        } else {
          const q = (a, b, op, ans) => card(ICON(hrefs[a], 52) + SYM(op, 34) + ICON(hrefs[b], 52) + SYM('=', 34) + answerBox({ w: 80, h: 60, answer: ans }),
            ` data-lcs-q="${op}" data-lcs-qa="${a}" data-lcs-qb="${b}"`);
          const hi = values[i1] >= values[i2] ? i1 : i2;
          const lo = hi === i1 ? i2 : i1;
          body = column(frame(g.svg) + grid([q(i1, i2, '+', values[i1] + values[i2]), q(hi, lo, '−', values[hi] - values[lo])], 1, 14), dataAttr());
          C.q = [{ a: i1, b: i2, op: '+' }, { a: hi, b: lo, op: '−' }];
        }
        C.items = nouns.map((n, i) => ({ noun: n.noun, v: values[i] }));
      } else if (mode === 'bar-fill' || mode === 'tally-fill') {
        fixNouns(nouns.length);
        const hrefs = nouns.map(hrefOf);
        const tally = mode === 'tally-fill';
        const yMax = tally ? d.maxN : Math.max(...values);
        const cards = nouns.map((n, i) => card(ICON(hrefs[i], 44) + (tally ? tallyPrim({ n: values[i], strokeH: 40 }).svg : NUMTXT(values[i], 34)),
          tally ? ` data-lcs-tallycat="${i}" data-lcs-catn="${values[i]}"` : ` data-lcs-row="${i}" data-lcs-rown="${values[i]}"`));
        const tableH = tally && nouns.length === 4 ? 170 : 86;
        // the key's title carries its suffix and may take a second line (fi "— Vastausavain", 2026-11-02: 12 px into the
        // footer): the filled graph of a key is 40 px shorter; the worksheet page is unchanged
        const g = barGraph({ values: ctx.keyFill ? values : values.map(() => 0), iconHrefs: hrefs, iconSlots: iconSlots(nouns.length), yMax, w: FW, h: Math.min(580, 800 - tableH - 120) - (ctx.keyFill || ctx.answerKey ? 40 : 0),
          padL: 58, padB: 78, fontSize: 20, iconSize: 58, barMax: 110 });
        body = column(grid(cards, tally ? (nouns.length === 4 ? 2 : 3) : nouns.length, 14) + frame(g.svg), dataAttr());
        C.items = nouns.map((n, i) => ({ noun: n.noun, v: values[i] }));
        C.yMax = yMax;
      } else if (mode === 'lineplot') {
        const lo = 1, hi = fracLabels ? 4 : 6;
        const step = fracLabels ? 0.5 : 1;
        const counts = {};
        const nvals = Math.round((hi - lo) / step) + 1;
        // levels (2026-09-27): level 1 = 3 values with 1-3 marks, level 2 (published) 4 values with 1-5, level 3 = 5 with 1-7
        const LP = { 1: { vals: 3, cMax: 3 }, 2: { vals: 4, cMax: 5 }, 3: { vals: 5, cMax: 7 } }[difficulty] || { vals: 4, cMax: 5 };
        const chosen = rng.sample(Array.from({ length: nvals }, (_, k) => lo + k * step), Math.min(LP.vals, nvals));
        chosen.forEach((v) => { counts[v] = rng.int(1, LP.cMax); });
        // a NEW page has one full stack (a plot of short stacks left half its page empty); the published page is as drawn
        if (!published && Math.max(...chosen.map((v) => counts[v])) < LP.cMax) counts[chosen[rng.int(0, chosen.length - 1)]] = LP.cMax;
        const maxC = Math.max(...Object.values(counts));
        const xH = Math.min(100, Math.floor(360 / maxC));
        const g = linePlot({ counts, min: lo, max: hi, step, width: FW - 70, fracLabels, xH, xSize: Math.min(56, Math.round(xH * 0.62)), labelSize: 30, padX: 35 });
        const label = (v) => (fracLabels && v % 1 !== 0 ? Math.floor(v) + '½' : String(v));
        // EVERY plotted number is asked (the page used to ask 3 and leave a plotted one unasked)
        const asked = chosen.slice();
        const cards = asked.map((v) => card(NUMTXT(label(v), 34) + SYM('→', 30) + answerBox({ w: 76, h: 58, answer: counts[v] }),
          ` data-lcs-qv="${v}" data-lcs-qn="${counts[v]}"`));
        body = column(frame(g.svg, ' data-ws-content') + grid(cards, asked.length === 4 ? 2 : 3), ` data-lcs-plotted="${chosen.join(',')}"`);
        C.items = asked.map((v) => ({ v, n: counts[v], label: label(v) }));
        C.counts = counts;
        C.values = asked.map((v) => counts[v]);
      } else if (mode === 'scene-fill') {
        // G1-482 Count and Graph the Scene (the old chart-count app, 2026-11-02): the things of a few kinds lie mixed in a
        // field; count each kind, colour one box per thing in the graph. The graph's top is the level's, never the
        // largest count (a top that equals the largest count would give it away)
        fixNouns(nouns.length);
        const hrefs = nouns.map(hrefOf);
        const order = rng.shuffle(values.flatMap((v, i) => Array.from({ length: v }, () => i)));
        const n = order.length, FH = nouns.length > 3 ? 290 : 340, AW = FW - 28;   // a page fills its body
        const cols = Math.max(1, Math.round(Math.sqrt(n * AW / FH))), rowsN = Math.ceil(n / cols);
        const cw = AW / cols, ch = FH / rowsN, px = Math.floor(Math.min(cw, ch) * 0.74);
        const at = rng.shuffle(Array.from({ length: cols * rowsN }, (_, k) => k)).slice(0, n);
        const field = order.map((cat, k) => {
          const c = at[k] % cols, r = Math.floor(at[k] / cols);
          const x = c * cw + (cw - px) / 2 + (rng.next() * 2 - 1) * (cw - px) * 0.4, y = r * ch + (ch - px) / 2 + (rng.next() * 2 - 1) * (ch - px) * 0.4;
          return `<img class="ws-icon" src="${hrefs[cat]}" alt="" data-lcs-kind="${cat}" style="position:absolute;left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${px}px;height:${px}px">`;
        }).join('');
        // the graph: a row of empty boxes per kind (a box to colour per thing), as many boxes on every row — the level's
        // most and one more, never the largest count (a row that is full would give it away)
        const yMax = d.maxN + 1;
        const cell = pictCell(yMax, nouns.length > 3 ? 54 : 72);
        // the key colours the boxes the child colours (the reviewer: a key of small pictures did not show "colour one box")
        const g = pictograph({ rows: nouns.map((nn, i) => ({ iconHref: hrefs[i], n: values[i] })), cell, rowGap: Math.round(cell * 0.45), iconSlots: iconSlots(nouns.length),
          emptyGrid: true, slots: yMax, ...(ctx.keyFill ? { shade: true } : {}) });
        body = column(frame(`<div style="position:relative;width:${AW}px;height:${FH}px" data-lcs-field>${field}</div>`, ' data-ws-content') + frame(g.svg), dataAttr(` data-lcs-ymax="${yMax}"`));
        C.items = nouns.map((nn, i) => ({ noun: nn.noun, v: values[i] }));
        C.order = order;
        C.yMax = yMax;
      } else if (mode === 'survey') {
        // G1-481 Our Class Graph (material, 2026-11-02): the class's own data — a tally line per picture to fill as the
        // children answer, then an empty bar graph to colour from the tallies (1.MD.C.4: up to three categories at level 1)
        fixNouns(nouns.length);
        const hrefs = nouns.map(hrefOf);
        const few = nouns.length <= 3;   // three pictures: bigger rows and boxes (a page fills its body)
        const tallyRows = nouns.map((nn, i) => `<div style="display:flex;align-items:center;gap:16px;padding:${few ? 14 : 6}px 14px;${i ? 'border-top:2px solid #F0E4CB;' : ''}" data-lcs-survey-row="${i}">` +
          ICON(hrefs[i], few ? 54 : 38) + `<span style="flex:0 0 ${few ? 150 : 140}px;font-family:'Nunito';font-weight:800;font-size:${few ? 24 : 21}px;line-height:1.1;color:${INK};overflow-wrap:anywhere" data-lcs-survey-word>${wordOf(nn)}</span>` +
          `<span style="flex:1 1 auto;height:40px;border-bottom:2.5px dashed #C9BBA2"></span></div>`).join('');
        const table = `<div style="width:${FW - 40}px;box-sizing:border-box;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:14px" data-lcs-survey-table>${tallyRows}</div>`;
        const cell = pictCell(d.maxN, nouns.length > 4 ? 46 : nouns.length > 3 ? 52 : 66);
        const g = pictograph({ rows: nouns.map((nn, i) => ({ iconHref: hrefs[i], n: 0 })), cell, rowGap: Math.round(cell * 0.4), iconSlots: iconSlots(nouns.length), emptyGrid: true, slots: d.maxN });
        body = column(table + frame(g.svg), ` data-lcs-survey="${nouns.length}" data-lcs-ymax="${d.maxN}"`);
        C.items = nouns.map((nn) => ({ noun: nn.noun }));
      } else if (mode === 'table-sort') {
        // level 3 sorts three kinds; levels 1-2 two (the published page: two)
        const kinds = lv === 3 ? 3 : 2;
        const counts2 = Array.from({ length: kinds }, () => rng.int(3, d.maxN));
        const order = rng.shuffle(counts2.flatMap((c, i) => Array.from({ length: c }, () => i)));
        nouns = distinctPick(theme, nouns.slice(0, kinds), pool, makeRng(rng.seed + '|distinct'));
        slotNouns(kinds);
        const hrefs = nouns.map(hrefOf);
        const n = order.length, perRow = Math.ceil(n / (n <= 10 ? 2 : 3));   // few pictures: two big rows
        const px = Math.max(48, Math.min(110, Math.floor((FW - 20) / perRow) - 14));
        const strip = order.map((i) => `<img class="ws-icon" src="${hrefs[i]}" alt="" data-lcs-item="${i}" style="width:${px}px;height:${px}px">`).join('');
        const rows = nouns.map((nn, i) =>
          `<div style="display:flex;align-items:center;justify-content:space-around;gap:40px;padding:16px 34px;${i ? 'border-top:2px solid #F0E4CB;' : ''}" data-lcs-col="${i}" data-lcs-coln="${counts2[i]}"${slot.attr(ctx, 'pic', i)}>` +
          ICON(hrefs[i], 80) + answerBox({ w: 110, h: 84, answer: counts2[i] }) + `</div>`).join('');
        const table = `<div class="ws-gtable" data-lcs-table style="background:#FFFFFF;border:2px solid #F0E4CB;border-radius:14px;min-width:340px">${rows}</div>`;
        body = column(frame(`<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-width:${FW}px">${strip}</div>`) + table, dataAttr());
        C.items = nouns.map((nn, i) => ({ noun: nn.noun, v: counts2[i] }));
        C.values = counts2;
        C.order = order;
      }
      C.nouns = nouns.map((n) => n.noun);
      // the nouns the page SHOWS, for the look-alike check (a file name is not always its noun); line plots show none
      const shown = mode === 'lineplot' ? '' : C.nouns.join(',');
      body = body.replace(/ data-lcs-(values|plotted)=/, (m0) => ` data-lcs-nouns="${shown}"` + m0);
      const asks = (C.items || []).map((it) => (it.noun || it.label) + ':' + (it.v != null && it.n == null ? it.v : it.n));
      return { bodyHtml: body, meta: published ? { values } : { values, asks }, _cards: C };
    },

    async verify(page) {
      const m = mode, w = which;
      const LOOK = require('../../data/graph-lookalikes.js');
      return page.evaluate(({ mode, which, LOOK }) => {
        const fails = [];
        const stamps = (svg, i) => svg.querySelectorAll(`[data-lcs-stamp="${i}"]`).length;
        // ---- the page is USED (2026-10-08: half of every page was empty) ----
        const body = document.querySelector('.ws-body').getBoundingClientRect();
        const content = [...document.querySelectorAll('.ws-body svg, .ws-body img, .ws-body .ws-answerbox, .ws-body .ws-gcard, .ws-body [data-lcs-frame], .ws-body [data-lcs-table], .ws-body .ws-pattern-slot')]
          .map((e) => e.getBoundingClientRect()).filter((r) => r.width > 2 && r.height > 2);
        const iv = content.map((r) => [Math.max(r.top, body.top), Math.min(r.bottom, body.bottom)]).filter(([a, b]) => b > a).sort((a, b) => a[0] - b[0]);
        let covered = 0, cur = null, gaps = [], last = body.top;
        for (const [a, b] of iv) {
          if (!cur || a > cur[1]) { if (cur) covered += cur[1] - cur[0]; gaps.push(a - last); cur = [a, b]; } else cur[1] = Math.max(cur[1], b);
          last = Math.max(last, b);
        }
        if (cur) covered += cur[1] - cur[0];
        gaps.push(body.bottom - last);
        if (covered / body.height < 0.55) fails.push(`page under-used: content covers ${Math.round(100 * covered / body.height)}% of the page height`);
        const big = Math.max(...gaps);
        if (big / body.height > 0.2) fails.push(`empty band of ${Math.round(big)}px (${Math.round(100 * big / body.height)}% of the page)`);
        // a framed box must be filled by its graph, never a big empty frame around a small one
        document.querySelectorAll('.ws-body [data-lcs-frame], .ws-body .ws-scene').forEach((f, i) => {
          const fr = f.getBoundingClientRect();
          const inner = [...f.querySelectorAll('svg, img')].map((e) => e.getBoundingClientRect());
          if (!inner.length) return;
          const x0 = Math.min(...inner.map((r) => r.left)), x1 = Math.max(...inner.map((r) => r.right)), y0 = Math.min(...inner.map((r) => r.top)), y1 = Math.max(...inner.map((r) => r.bottom));
          const fillRatio = ((x1 - x0) * (y1 - y0)) / (fr.width * fr.height);
          if (fillRatio < 0.55) fails.push(`frame ${i + 1}: its graph fills ${Math.round(100 * fillRatio)}% of it`);
        });
        document.querySelectorAll('.ws-body .ws-answerbox').forEach((b, i) => {
          const r = b.getBoundingClientRect();
          if (r.width < 56) fails.push(`answer box ${i + 1} squeezed to ${Math.round(r.width)}px`);
        });
        // ---- a graph's pictures never look alike ----
        const wrapT = document.querySelector('[data-lcs-theme]');
        if (wrapT) {
          const theme = wrapT.dataset.lcsTheme, groups = LOOK[theme];
          if (!groups) fails.push(`theme ${theme} was never read for look-alikes`);
          else {
            const nouns = (document.querySelector('[data-lcs-nouns]').dataset.lcsNouns || '').split(',').filter(Boolean);
            for (const g of groups) { const hit = nouns.filter((n) => g.includes(n)); if (hit.length > 1) fails.push(`look-alike pictures on one graph: ${hit.join(' / ')}`); }
            nouns.filter((n) => ((LOOK._unclear || {})[theme] || []).includes(n)).forEach((n) => fails.push(`${n} does not read as a thing on a graph`));
          }
        }
        // ---- a picture graph's label column is ruled off (the label tile is not one more picture to count) ----
        document.querySelectorAll('[data-lcs-prim="pictograph"]').forEach((svg) => {
          const ax = svg.querySelector('[data-lcs-axis="category"]');
          if (!ax) { fails.push('picture graph: no axis between the labels and the pictures'); return; }
          const A = ax.getBoundingClientRect(), x = A.left + A.width / 2;
          svg.querySelectorAll('[data-lcs-rowlabel]').forEach((l) => { if (l.getBoundingClientRect().right > x - 4) fails.push('picture graph: a label picture reaches the axis'); });
          // a tile beside the rows (the "= 2" key sits BELOW them) must end before the axis
          svg.querySelectorAll('rect:not([data-lcs-stamp]):not([data-lcs-emptycell])').forEach((r) => { const b = r.getBoundingClientRect(); if (b.top < A.bottom && b.bottom > A.top && b.left < x && b.right > x - 1) fails.push('picture graph: a label tile crosses the axis'); });
          svg.querySelectorAll('[data-lcs-stamp],[data-lcs-emptycell]').forEach((s) => { if (s.getBoundingClientRect().left < x + 4) fails.push('picture graph: a picture or box stands at the axis'); });
        });
        // ---- the facts ----
        if (mode === 'pict-read') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          const sc = +wrap.dataset.lcsScale;
          const svg = wrap.querySelector('[data-lcs-prim="pictograph"]');
          values.forEach((v, i) => { if (stamps(svg, i) * sc !== v) fails.push(`row ${i}: ${stamps(svg, i)} stamps × ${sc} != ${v}`); });
          wrap.querySelectorAll('[data-lcs-row]').forEach((row) => {
            const i = +row.dataset.lcsRow;
            if (+row.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== values[i]) fails.push(`row ${i}: answer mismatch`);
          });
        } else if (mode === 'pict-which' || mode === 'bar-which') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          const target = which === 'most' ? values.indexOf(Math.max(...values)) : values.indexOf(Math.min(...values));
          const correct = [...wrap.querySelectorAll('[data-lcs-cat]')].filter((c) => c.dataset.lcsCorrect);
          if (correct.length !== 1 || +correct[0].dataset.lcsCat !== target) fails.push('target category wrong');
          if (new Set(values).size !== values.length) fails.push('tied values — ambiguous');
        } else if (mode === 'bar-read' || mode === 'bar-fill') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          const bars = [...wrap.querySelectorAll('[data-lcs-bar]')].map((b) => +b.dataset.lcsBar);
          if (mode === 'bar-read' && bars.join() !== values.join()) fails.push(`bars ${bars} != ${values}`);
          if (mode === 'bar-fill' && bars.some((b) => b !== 0)) fails.push('graph must start empty');
          wrap.querySelectorAll('[data-lcs-row]').forEach((row) => {
            const i = +row.dataset.lcsRow;
            if (+row.dataset.lcsRown !== values[i]) fails.push(`row ${i}: declared mismatch`);
            const a = row.querySelector('[data-lcs-answer]');
            if (a && +a.dataset.lcsAnswer !== values[i]) fails.push(`row ${i}: answer mismatch`);
          });
        } else if (mode === 'tally-fill') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          wrap.querySelectorAll('[data-lcs-tallycat]').forEach((row, i) => {
            const n = +row.dataset.lcsCatn;
            if (n !== values[i]) fails.push(`row ${i + 1}: declared ${n} != ${values[i]}`);
            const strokes = row.querySelectorAll('[data-lcs-stroke]').length;
            if (strokes !== n) fails.push(`row ${i + 1}: ${strokes} tally strokes != ${n}`);
          });
          const svg = wrap.querySelector('[data-lcs-prim="bar-graph"]');
          if (Math.max(...values) > +svg.dataset.lcsYmax) fails.push('a value exceeds the graph scale');
          svg.querySelectorAll('[data-lcs-bar]').forEach((b) => { if (+b.dataset.lcsBar !== 0) fails.push('graph must start empty'); });
          if (svg.querySelectorAll('[data-lcs-caticon]').length !== values.length) fails.push('category icons missing');
        } else if (mode === 'bar-2step') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          wrap.querySelectorAll('[data-lcs-q]').forEach((q) => {
            const a = values[+q.dataset.lcsQa], b = values[+q.dataset.lcsQb];
            const want = q.dataset.lcsQ === '+' ? a + b : a - b;
            if (want < 0) fails.push('negative difference');
            if (+q.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== want) fails.push(`question ${q.dataset.lcsQ}: mismatch`);
          });
        } else if (mode === 'lineplot') {
          const pl = document.querySelector('[data-lcs-plotted]');
          if (!pl) { fails.push('the plotted numbers are not stamped (cannot prove every one is asked)'); return fails; }
          const plotted = pl.dataset.lcsPlotted.split(',');
          const asked = [...document.querySelectorAll('[data-lcs-qv]')].map((q) => q.dataset.lcsQv);
          plotted.forEach((v) => { if (!asked.includes(v)) fails.push(`plotted ${v} is never asked`); });
          document.querySelectorAll('[data-lcs-qv]').forEach((q) => {
            const v = q.dataset.lcsQv, n = +q.dataset.lcsQn;
            const xs = document.querySelectorAll(`[data-lcs-x="${v}"]`).length;
            if (xs !== n) fails.push(`value ${v}: ${xs} X marks != ${n}`);
            if (+q.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== n) fails.push(`value ${v}: answer mismatch`);
          });
        } else if (mode === 'table-sort') {
          if (!document.querySelector('[data-lcs-table]')) fails.push('the instruction names a table: none is drawn');
          document.querySelectorAll('[data-lcs-col]').forEach((col) => {
            const i = col.dataset.lcsCol, n = +col.dataset.lcsColn;
            const items = document.querySelectorAll(`[data-lcs-item="${i}"]`).length;
            if (items !== n) fails.push(`category ${i}: strip has ${items} != ${n}`);
            if (+col.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== n) fails.push(`category ${i}: answer mismatch`);
          });
        } else if (mode === 'scene-fill') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          const svg = wrap.querySelector('[data-lcs-prim="pictograph"]');
          if (svg.querySelectorAll('[data-lcs-stamp]').length !== 0) fails.push('graph must start empty');
          const yMax = +wrap.dataset.lcsYmax;
          values.forEach((v, i) => {
            const k = wrap.querySelectorAll(`[data-lcs-field] [data-lcs-kind="${i}"]`).length; if (k !== v) fails.push(`kind ${i}: the field shows ${k}, not ${v}`);
            if (svg.querySelectorAll(`[data-lcs-emptycell="${i}"]`).length !== yMax) fails.push(`row ${i}: not ${yMax} boxes`);
          });
          if (new Set(values).size !== values.length) fails.push('two kinds have the same count');
          if (+wrap.dataset.lcsYmax <= Math.max(...values)) fails.push('the graph top gives the largest count away');
          // every picture in the field is whole and apart from the others (a child counts them one by one)
          const R = [...wrap.querySelectorAll('[data-lcs-field] img')].map((x) => x.getBoundingClientRect()), F = wrap.querySelector('[data-lcs-field]').getBoundingClientRect();
          R.forEach((a, i) => { if (a.left < F.left - 0.5 || a.right > F.right + 0.5 || a.top < F.top - 0.5 || a.bottom > F.bottom + 0.5) fails.push(`picture ${i + 1} leaves the field`); R.forEach((b, j) => { if (j > i && a.left < b.right - 2 && b.left < a.right - 2 && a.top < b.bottom - 2 && b.top < a.bottom - 2) fails.push(`pictures ${i + 1} and ${j + 1} overlap`); }); });
        } else if (mode === 'survey') {
          const wrap = document.querySelector('[data-lcs-survey]');
          const n = +wrap.dataset.lcsSurvey;
          if (wrap.querySelectorAll('[data-lcs-survey-row]').length !== n) fails.push('a tally line per picture');
          wrap.querySelectorAll('[data-lcs-survey-row]').forEach((r, i) => { const w = r.querySelector('[data-lcs-survey-word]'); if (!w || !w.textContent.trim()) fails.push(`survey row ${i + 1}: no word names its picture`); else if (w.scrollWidth > w.clientWidth + 1 || w.getBoundingClientRect().height > 60) fails.push(`survey row ${i + 1}: the word "${w.textContent}" does not fit`); });
          const svg = wrap.querySelector('[data-lcs-prim="pictograph"]');
          if (svg.querySelectorAll('[data-lcs-stamp]').length !== 0) fails.push('the graph must start empty');
          for (let i = 0; i < n; i++) if (svg.querySelectorAll(`[data-lcs-emptycell="${i}"]`).length !== +wrap.dataset.lcsYmax) fails.push(`row ${i + 1}: not ${wrap.dataset.lcsYmax} boxes`);
        } else if (mode === 'pict-fill') {
          const wrap = document.querySelector('[data-lcs-values]');
          const values = wrap.dataset.lcsValues.split(',').map(Number);
          const svg = wrap.querySelector('[data-lcs-prim="pictograph"]');
          if (svg.querySelectorAll('[data-lcs-stamp]').length !== 0) fails.push('pictograph must start empty');
          values.forEach((v, i) => {
            const cells = svg.querySelectorAll(`[data-lcs-emptycell="${i}"]`).length;
            if (cells < v) fails.push(`row ${i}: only ${cells} cells for ${v}`);
          });
        }
        return fails;
      }, { mode: m, which: w, LOOK });
    },
  };
}

module.exports = { makeGraphType, FW };
