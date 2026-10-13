/**
 * G1-246 — Number Walls (nt20-B; `number-walls`, G1, 1.OA.C.6 / 1.OA.D.8 —
 * Zahlenmauern / pyramides additives / talpyramider). Brick pyramids: each
 * brick is the sum of the two beneath it. d1/d2: the base is given, the
 * child builds upward. d3: four courses with ONE base gap whose upper
 * neighbour is given — solved by subtraction, then propagated. Uniqueness
 * is proven by a propagation solver (build refuses an unsolvable wall;
 * verify re-implements the solver).
 *
 * Level Set 2026-10-13 (walk #59, PDF + interactive + key). Level 2 = the published page (LEGACY[2], the June draw,
 * byte-identical); levels 1 and 3 add knobs that are ABSENT on every June config, so no published page moves:
 *   oneGiven — one brick of the second row is printed (support)
 *   topMin   — the top brick is at least N (harder sums, crossing ten)
 *   mix      — each wall of the page is one kind: a missing bottom brick or the top given (shuffled, equally often)
 * The SCREEN version (kind `type-number`, emit/interactive-runtime.js) is the printed page itself, bigger bricks, and
 * the child TYPES each number into its empty brick — no options to choose from (operator 2026-10-13).
 * The KEY is the printed page with every answer written in its dashed brick.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const numberWall = require('../../primitives/number-wall.js');

// ⚠ LEGACY = the June d1/d2/d3. Only d2 was ever published (wave-b2), but the five faces are BUILT from these
// objects (G1-266 = d1, G1-267/268/G2-313 = d3, G1-289 = d2) — they must never change.
const LEGACY = {
  1: { walls: 4, cols: 2, rows: 2, courses: 3, baseMin: 1, baseMax: 4, topMax: 10, brick: { w: 100, h: 88 }, gap: false },
  2: { walls: 6, cols: 2, rows: 3, courses: 3, baseMin: 1, baseMax: 9, topMax: 20, brick: { w: 88, h: 68 }, gap: false },
  3: { walls: 4, cols: 2, rows: 2, courses: 4, baseMin: 1, baseMax: 5, topMax: 20, brick: { w: 78, h: 70 }, gap: true },
};
// "how to answer on a screen" ×11 (i18n/interactive-instructions.json number-walls.tap)
const TAP = require('../../i18n/interactive-instructions.json')['number-walls'].tap;
// SCREEN bricks: every empty brick must be a ≥ 44 px box on a 360-px phone (the page is drawn at ~0.47 there).
// Three-row walls stay two to a row; four-row walls go one to a row.
const SCREEN = { 3: { brick: { w: 104, h: 104 }, cols: 2, fontSize: 36 }, 4: { brick: { w: 116, h: 108 }, cols: 1, fontSize: 36 } };

module.exports = {
  id: 'G1-246',
  slug: 'number-walls',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'number-walls',
  themeAxis: { applicable: false },
  legacy: LEGACY,
  difficulty: {
    1: { ...LEGACY[1], baseMax: 5, topMax: 15, oneGiven: true },
    2: LEGACY[2],
    3: { ...LEGACY[3], gap: false, mix: ['gap', 'top'] },
  },
  i18n: {
    en: {
      title: 'Number Walls',
      instruction: 'Each brick is the sum of the two bricks under it. Fill in the missing numbers.',
    },
  },

  // what makes a copy different: its walls (copies of a level share at most a quarter of them)
  levelSetWords(m) { return (m.walls || []).map((b) => b.join('-')); },
  // the screen page prints the face's own (level-true, native) instruction, then how to answer on a screen
  copyStrings(s, o) {
    const tap = TAP[o.locale];
    if (!tap) throw new Error('number-walls: no screen sentence for ' + o.locale);
    return { ...s, screenInstruction: s.instruction + ' ' + tap };
  },
  interactive: {
    kind: 'type-number', item: '[data-lcs-prim="number-wall"] [data-lcs-blank]', answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-brick',
    metaAttrs: ['data-lcs-brick', 'data-lcs-wall'], instructionKey: 'tap', screenHeight: 2600,
    // the digit cap is the PAGE's (never the answer's length — that would tell it): at least 2, 3 on a to-100 page
    maxDigits: (d) => Math.max(2, String(d.topMax).length),
    // INDEPENDENT oracle: each brick's number recomputed from its wall's stamped base — never the page's answer map
    oracle: (items) => items.map((it) => {
      const base = String((it.meta || {})['data-lcs-wall'] || '').split(',').map(Number);
      if (base.length < 3 || base.some((v) => !Number.isInteger(v) || v < 1)) throw new Error('number-walls oracle: no base for brick ' + (it.meta || {})['data-lcs-brick']);
      const [r, c] = String(it.meta['data-lcs-brick']).split(',').map(Number);
      const rows = [base.slice()];
      while (rows[rows.length - 1].length > 1) { const p = rows[rows.length - 1]; rows.push(p.slice(0, -1).map((v, k) => v + p[k + 1])); }
      if (!rows[r] || rows[r][c] == null) throw new Error('number-walls oracle: no brick ' + r + ',' + c);
      return rows[r][c];
    }),
  },

  build({ difficulty }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const n = d.courses;
    const walls = [];
    const usedBase = new Set(), usedTop = new Set();
    // mix (level 3): every wall one kind, shuffled, each kind equally often. Absent = the June draw (no rng spent).
    const kinds = d.mix ? rng.shuffle(Array.from({ length: d.walls }, (_, i) => d.mix[i % d.mix.length])) : null;
    let guard = 0;
    while (walls.length < d.walls && guard++ < (d.mix || d.topMin || d.pairMin ? 4000 : 500)) {
      const kind = kinds ? kinds[walls.length] : null;
      const base = Array.from({ length: n }, () => rng.int(d.baseMin, d.baseMax));
      const values = numberWall.pyramidValues(base);
      const top = values[n - 1][0];
      if (top > d.topMax) continue;
      if (d.topMin && top < d.topMin) continue;
      // pairMin (G2-313 level 1, reviewer 2026-10-13): every second-row sum has two digits under a "two-digit" title
      if (d.pairMin && base.some((v, k) => k > 0 && base[k - 1] + v < d.pairMin)) continue;
      const bkey = base.join(',');
      if (usedBase.has(bkey)) continue;
      if (usedTop.has(top) && usedTop.size < d.walls - 1 && rng.next() < 0.7) continue;
      const blanks = new Set();
      const given = new Set();
      for (let r = 1; r < n; r++) for (let c = 0; c < n - r; c++) blanks.add(`${r},${c}`);
      for (let c = 0; c < n; c++) given.add(`0,${c}`);
      const topGiven = kinds ? kind === 'top' : d.topGiven;
      const gap = kinds ? kind === 'gap' : d.gap;
      if (topGiven) {
        // Every shipped face gives the BASE and builds upward by addition; G1-268
        // removes one base brick but still works from the bottom. Giving the TOP
        // inverts the operation — the child subtracts downward, which is its own
        // lesson (Zahlenmauern rückwärts). The given set is the apex plus one
        // brick per course, and `numberWall.solvable` — already implemented, and
        // already re-implemented inside verify — proves uniqueness, so an
        // unsolvable draw simply falls through to the next candidate.
        blanks.clear(); given.clear();
        for (let r = 0; r < n; r++) for (let c = 0; c < n - r; c++) blanks.add(`${r},${c}`);
        const apex = `${n - 1},0`;
        blanks.delete(apex); given.add(apex);
        for (let r = n - 2; r >= 0; r--) {
          const c = rng.int(0, n - r - 1);
          blanks.delete(`${r},${c}`); given.add(`${r},${c}`);
        }
      } else if (gap) {
        // gapInner (G1-268 level 3): the missing bottom brick is an inner one — two upper bricks rest on it
        const g = d.gapInner ? rng.int(1, n - 2) : rng.int(0, n - 1);
        blanks.add(`0,${g}`); given.delete(`0,${g}`);
        const opts = []; if (g > 0) opts.push(`1,${g - 1}`); if (g < n - 1) opts.push(`1,${g}`);
        const giveUp = rng.pick(opts);
        blanks.delete(giveUp); given.add(giveUp);
      } else if (d.oneGiven) {
        // level 1: one brick of the second row printed — fewer sums, and a check on the way up
        const c = rng.int(0, n - 2);
        blanks.delete(`1,${c}`); given.add(`1,${c}`);
      }
      if (!numberWall.solvable(n, given)) continue;
      usedBase.add(bkey); usedTop.add(top);
      walls.push({ base, blanks, topGiven: !!topGiven });
    }
    if (walls.length < d.walls) throw new Error(`G1-246: could not generate ${d.walls} distinct walls`);
    // SCREEN (ctx.interactive) and KEY (ctx.answerKey): the SAME walls (same rng draw — render-instance compares the
    // meta). The screen draws bigger bricks, each empty one stamped with its wall's base for the robot's oracle; the
    // key writes every answer into its dashed brick.
    const screen = !!(ctx && ctx.interactive);
    const key = !!(ctx && ctx.answerKey);
    const sc = screen ? SCREEN[n] : null;
    if (screen && !sc) throw new Error('G1-246: no screen layout for ' + n + ' rows');
    const draw = (w) => {
      const svg = numberWall({ base: w.base, blanks: w.blanks, brick: sc ? sc.brick : d.brick, answers: key, topGiven: !!(d.mix && w.topGiven), fontSize: sc ? sc.fontSize : null }).svg;
      return screen ? svg.replace(/data-lcs-blank="1"/g, `data-lcs-blank="1" data-lcs-wall="${w.base.join(',')}"`) : svg;
    };
    const cards = walls.map((w) => `<div class="ws-card-stage">${draw(w)}</div>`);
    const meta = { walls: walls.map((w) => w.base) };
    if (screen) {
      const cols = Math.min(sc.cols, walls.length), rows = Math.ceil(walls.length / cols);
      const grid = cardGrid({ cards, cols, rows })
        .replace(/grid-template-rows: repeat\(\d+, minmax\(0,1fr\)\);/, `grid-template-rows: repeat(${rows}, auto); align-content: start;`)
        .replace(/<section class="ws-card"/g, '<section class="ws-card" data-lcs-keep');
      let g = d.topGiven ? grid.replace('<div', '<div data-lcs-topgiven="1"') : grid;
      if (d.topMax && d.topMax > 20) g = g.replace('<div', `<div data-lcs-topmax="${d.topMax}"`);
      return { bodyHtml: '<style>.ws-cardgrid .ws-card{padding:6px}.ws-cardgrid .ws-card-stage{padding:24px 0 6px}</style>' + g, meta };
    }
    // Stamped ONLY when the face declares it, so the default DOM is unchanged
    // and b2-baseline stays at 0 drift. Wrapping in a plain div would alter the
    // grid's own layout, so the flag rides an attribute on the grid itself.
    const grid = cardGrid({ cards, cols: d.cols, rows: d.rows });
    return {
      // ⚠ `topMax` must ride the PAGE, not just the config: verify() hardcodes a
      // ceiling of 20, so a to-100 wall would fail on its own subject. Stamped
      // only when it differs from the default, so every shipped coordinate is
      // byte-identical.
      bodyHtml: (() => {
        let g = d.topGiven ? grid.replace('<div', '<div data-lcs-topgiven="1"') : grid;
        // ⚠ Only when the cap is ABOVE verify's hardcoded 20. My first version
        // stamped whenever topMax differed from 20, which caught d1's cap of 10
        // and drifted a shipped Finnish coordinate: a tighter cap needs no stamp,
        // because the default assertion already passes for it.
        if (d.topMax && d.topMax > 20) g = g.replace('<div', `<div data-lcs-topmax="${d.topMax}"`);
        // Level Set knobs the verifier must know (stamped only on the new levels)
        if (d.topMin) g = g.replace('<div', `<div data-lcs-topmin="${d.topMin}"`);
        if (d.oneGiven) g = g.replace('<div', '<div data-lcs-onegiven="1"');
        if (d.pairMin) g = g.replace('<div', `<div data-lcs-pairmin="${d.pairMin}"`);
        return g;
      })(),
      meta,
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const walls = [...document.querySelectorAll('[data-lcs-prim="number-wall"]')];
      if (walls.length < 4) fails.push(`only ${walls.length} walls`);
      const bases = new Set();
      const keyPage = !!document.querySelector('[data-lcs-keytext]');
      const minEl = document.querySelector('[data-lcs-topmin]');
      const oneGiven = !!document.querySelector('[data-lcs-onegiven]');
      walls.forEach((w, i) => {
        const n = +w.dataset.lcsRows;
        const base = w.dataset.lcsBase.split(',').map(Number);
        if (bases.has(w.dataset.lcsBase)) fails.push(`wall ${i + 1}: duplicate base`);
        bases.add(w.dataset.lcsBase);
        if (base.some((v) => v < 1)) fails.push(`wall ${i + 1}: base value < 1`);
        // recompute the pyramid
        const rows = [base.slice()];
        while (rows[rows.length - 1].length > 1) { const p = rows[rows.length - 1]; rows.push(p.slice(0, -1).map((v, k) => v + p[k + 1])); }
        const bricks = [...w.querySelectorAll('[data-lcs-brick]')];
        const given = new Set();
        let blanks = 0;
        bricks.forEach((b) => {
          const [r, c] = b.dataset.lcsBrick.split(',').map(Number);
          if (+b.dataset.lcsValue !== rows[r][c]) fails.push(`wall ${i + 1}: brick ${r},${c} value wrong`);
          const txt = b.querySelector('text');
          if (b.dataset.lcsBlank) {
            blanks++;
            // a key page writes every answer in its dashed brick; any other page writes none
            if (keyPage) { if (!txt || +txt.textContent !== rows[r][c]) fails.push(`wall ${i + 1}: key brick ${r},${c} shows the wrong number`); }
            else if (txt) fails.push(`wall ${i + 1}: blank brick prints text`);
            if (+b.dataset.lcsAnswer !== rows[r][c]) fails.push(`wall ${i + 1}: blank answer wrong`);
          } else {
            given.add(`${r},${c}`);
            if (!txt || +txt.textContent !== rows[r][c]) fails.push(`wall ${i + 1}: given brick text wrong`);
          }
        });
        const capEl = document.querySelector('[data-lcs-topmax]');
        const cap = capEl ? +capEl.dataset.lcsTopmax : 20;
        if (rows[n - 1][0] > cap) fails.push(`wall ${i + 1}: top ${rows[n - 1][0]} > ${cap}`);
        if (minEl && rows[n - 1][0] < +minEl.dataset.lcsTopmin) fails.push(`wall ${i + 1}: top ${rows[n - 1][0]} < ${minEl.dataset.lcsTopmin}`);
        if (blanks < n - 1) fails.push(`wall ${i + 1}: too few blanks`);
        const pmEl = document.querySelector('[data-lcs-pairmin]');
        if (pmEl && rows[1].some((v) => v < +pmEl.dataset.lcsPairmin)) fails.push(`wall ${i + 1}: a second-row sum below ${pmEl.dataset.lcsPairmin}`);
        // the top numeral is never printed
        // ⚠ This assertion FORBIDS EXACTLY WHAT THE topGiven FACE DOES, so it has
        // to read the page rather than assume the bottom-up shape. The stamp is
        // emitted only when the face declares it — on the grid (a whole top-down
        // page) or on the wall itself (a level-3 page that mixes kinds).
        const topDown = !!document.querySelector('.ws-cardgrid[data-lcs-topgiven]') || w.hasAttribute('data-lcs-topgiven');
        const apexGiven = !!bricks.find((b) => b.dataset.lcsBrick === `${n - 1},0` && !b.dataset.lcsBlank);
        if (topDown) { if (!apexGiven) fails.push(`wall ${i + 1}: top brick must be given`); }
        else if (apexGiven) fails.push(`wall ${i + 1}: top brick given`);
        // level 1 (oneGiven): the whole base and exactly one second-row brick printed, nothing higher
        if (oneGiven) {
          const g1 = [...given].filter((k) => k.startsWith('1,')).length;
          const gb = [...given].filter((k) => k.startsWith('0,')).length;
          if (g1 !== 1 || gb !== n || given.size !== n + 1) fails.push(`wall ${i + 1}: level 1 must print the base and exactly one second-row brick`);
        }
        // propagation solver: every brick must resolve from the givens
        const known = new Set(given); let changed = true;
        while (changed) {
          changed = false;
          for (let r = 1; r < n; r++) for (let c = 0; c < n - r; c++) {
            const up = `${r},${c}`, a = `${r - 1},${c}`, b2 = `${r - 1},${c + 1}`;
            if (!known.has(up) && known.has(a) && known.has(b2)) { known.add(up); changed = true; }
            if (known.has(up) && known.has(a) && !known.has(b2)) { known.add(b2); changed = true; }
            if (known.has(up) && known.has(b2) && !known.has(a)) { known.add(a); changed = true; }
          }
        }
        if (known.size !== bricks.length) fails.push(`wall ${i + 1}: not uniquely solvable`);
      });
      // a mixed page (level 3) must really mix: both kinds on the page
      const mixed = walls.filter((w) => w.hasAttribute('data-lcs-topgiven')).length;
      if (mixed && mixed === walls.length) fails.push('a mixed page carries only top-given walls');
      return fails;
    });
  },
};
