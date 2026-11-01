/**
 * Factory for the base-ten / place-value family (class 5):
 *  - 'read':          blocks → write the number (G1-120 t/o, G2-222 h/t/o)
 *  - 'choose':        numeral → circle the matching block set (G1-121/G2-227)
 *  - 'count-tens':    rods only → how many tens? (G1-122)
 *  - 'add'/'sub':     two block groups, no regrouping → equation (G2-203/204/205)
 *  - 'regroup':       13-19 unit cubes; circle ten to make a ten → __ ten __ ones (G2-206)
 *  - 'expanded':      blocks ↔ expanded form match (G1-133/G2-223)
 *  - 'pv-chart':      blocks → fill H/T/O chart (G2-224)
 *  - 'digit-value':   underlined digit → circle its value (G2-225)
 */
'use strict';
const { placeHeads } = require('../../lib/place-heads.js');
const { mulGlyph } = require('./notation.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const baseTenBlocks = require('../../primitives/base-ten.js');

/* Per-level ranges for the modes that ignored the level (2026-09-27, Level
   Set programme). LEVEL 2 IS THE OLD FIXED RANGE — every deck of these types
   was published at level 2 and tools/snapshot-type-pages.js proves level 2
   is byte-identical. add/sub stay NO-regrouping at every level (the skill of
   these types); the levels change the size of the numbers.
     count-tens: rods lo..hi (level 3 counts past 100, the G1 limit is 120)
     add/sub:    first number's tens 1..t1Hi, ones 1..o1Hi; add keeps tens and
                 ones sums within tSum/oSum; level 3 adds hundreds 1..hHi to
                 the first number (3-digit ± 2-digit, still no regrouping)
     regroup:    loose ones lo..hi, always one ten to bundle */
const MODE_LEVELS = {
  'count-tens': { 1: { lo: 1, hi: 5 }, 2: { lo: 2, hi: 9 }, 3: { lo: 10, hi: 12 } },
  add:          { 1: { t1Hi: 3, o1Hi: 4, tSum: 4, oSum: 5, hHi: 0 }, 2: { t1Hi: 7, o1Hi: 8, tSum: 9, oSum: 9, hHi: 0 }, 3: { t1Hi: 7, o1Hi: 8, tSum: 9, oSum: 9, hHi: 3 } },
  sub:          { 1: { t1Hi: 4, o1Hi: 5, hHi: 0 }, 2: { t1Hi: 7, o1Hi: 8, hHi: 0 }, 3: { t1Hi: 7, o1Hi: 8, hHi: 3 } },
  // the instruction says "bundle A ten" (11 locales): every level keeps ONE bundle
  regroup:      { 1: { lo: 11, hi: 13 }, 2: { lo: 13, hi: 19 }, 3: { lo: 16, hi: 19 } },
};
const { answerBox } = require('../../templates/components.js');

const NUM = (v, size) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size || 30}px;color:#3A3530" data-lcs-num="${v}">${v}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">${ch}</span>`;

function makeBaseTenType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'base-ten',
    exerciseType: 'base-ten',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || {
      1: { maxH: 0, maxT: 5, rows: 4, unit: 13 },
      2: { maxH: 0, maxT: 9, rows: 4, unit: 13 },
      3: { maxH: 3, maxT: 9, rows: 4, unit: 10 },
    },
    i18n,

    build({ difficulty, locale }, ctx) {
      const MUL = mulGlyph(locale);   // 2026-10-31: '× 10' printed '×' in de/sv/da/no/fi (schools write ·)
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const lvTable = (cfg.levels || MODE_LEVELS)[mode];
      const L = lvTable ? (lvTable[difficulty] || lvTable[2]) : null;
      const cards = [];
      const rankBag = [];
      const hubBag = [];    // expanded: is the right form the one sharing the most pieces? true on a third of the rows   // digit-value: the rank of the right value among the chips, balanced over the page
      const used = new Set();
      // more than six hundred-flats (only the makers' level 3 draws them) would run past the page: the unit shrinks so
      // the row fits 600 px; six or fewer keep the published size (the catalogue is unchanged)
      const fitUnit = (h, t, o, u) => (h <= 6 ? u : Math.min(u, Math.floor((600 - 8 - Math.ceil(o / 5) * 6) / (h * 11.2 + t * 2.2 + Math.ceil(o / 5)))));
      const draw = (h, t, o, unit) => baseTenBlocks({ h, t, o, unit: fitUnit(h, t, o, unit || d.unit) }).svg;
      // the place-value chart, NEW copies (2026-11-01; the published page, level 2 copy 1, keeps its draw): the digits of
      // each place differ from row to row where the range allows — hundreds of 1-4 on four rows let "write the row's
      // number" score 24 % (settings-space)
      const spreadPlaces = mode === 'pv-chart' && !(Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1);
      const seen = { h: new Set(), t: new Set(), o: new Set() };
      const fresh = (k, x, size) => !spreadPlaces || seen[k].size >= size || !seen[k].has(x);
      // … and no digit fills more than two boxes of the page (one digit in all three places scored 22 %)
      const digitN = new Map();
      const twice = (h, t, o) => !spreadPlaces || [h, t, o].filter((x, k) => k > 0 || d.maxH).every((x, k, arr) => (digitN.get(x) || 0) + arr.filter((y) => y === x).length <= 2);
      const pick = () => {
        let h, t, o, guard = 0;
        do {
          h = d.maxH ? rng.int(d.minH || 1, d.maxH) : 0;
          t = rng.int(1, d.maxT);
          o = rng.int(1, 9);
          guard++;
        } while ((used.has(`${h}.${t}.${o}`) || (guard < 60 && !(fresh('h', h, d.maxH - (d.minH || 1) + 1) && fresh('t', t, d.maxT) && fresh('o', o, 9) && twice(h, t, o)))) && guard < (spreadPlaces ? 80 : 40));
        if (spreadPlaces) { seen.h.add(h); seen.t.add(t); seen.o.add(o); [h, t, o].filter((x, k) => k > 0 || d.maxH).forEach((x) => digitN.set(x, (digitN.get(x) || 0) + 1)); }
        used.add(`${h}.${t}.${o}`);
        return { h, t, o, v: h * 100 + t * 10 + o };
      };

      for (let i = 0; i < d.rows; i++) {
        let stage;
        if (mode === 'read') {
          const { h, t, o, v } = pick();
          stage = `<div class="ws-card-stage" style="gap:22px;justify-content:space-between;padding:8px 14px" data-lcs-value="${v}">` +
            draw(h, t, o) + answerBox({ w: 104, h: 60, answer: v }) + `</div>`;
        } else if (mode === 'choose') {
          const { h, t, o, v } = pick();
          // distractors: swapped tens/ones, off-by-one-ten
          const opts = [{ h, t, o, ok: true }, { h, t: o > 9 ? t : o, o: t, ok: false }, { h, t: Math.max(1, t - 1), o, ok: false }]
            .filter((x, k, arr) => arr.findIndex((y) => y.h === x.h && y.t === x.t && y.o === x.o) === k);
          while (opts.length < 3) opts.push({ h, t, o: Math.min(9, o + opts.length), ok: false });
          // 3-digit sets are wide: stack the choices vertically + shrink units
          const setUnit = d.maxH ? 4.5 : 7;
          const boxes = rng.shuffle(opts).map((s) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:14px;padding:7px"${s.ok ? ' data-lcs-correct="1"' : ''} ` +
            `data-lcs-set="${s.h}.${s.t}.${s.o}">${draw(s.h, s.t, s.o, setUnit)}</span>`).join('');
          const choicesStyle = d.maxH ? 'flex-direction:column;align-items:flex-end;gap:8px' : '';
          stage = `<div class="ws-card-stage" style="gap:18px;justify-content:space-between;padding:6px 12px" data-lcs-value="${v}">` +
            NUM(v, 38) + `<span class="ws-pattern-choices" style="${choicesStyle}">${boxes}</span></div>`;
        } else if (mode === 'count-tens') {
          const t = rng.int(L.lo, L.hi);
          stage = `<div class="ws-card-stage" style="gap:22px;justify-content:space-between;padding:8px 14px" data-lcs-tens="${t}">` +
            draw(0, t, 0) +
            `<span style="display:inline-flex;align-items:center;gap:10px">` +
            answerBox({ w: 64, h: 54, answer: t }) + OP(MUL) + NUM(10) + OP('=') + answerBox({ w: 84, h: 54, answer: t * 10 }) + `</span></div>`;
        } else if (mode === 'add' || mode === 'sub') {
          // no-regrouping pairs
          // The RESULT's tens and ones are drawn first, evenly, then split into the two numbers. Drawing the first number and
          // then the second up to the limit made the biggest total the commonest (level 1: 45 on 29–46 % of the rows) and
          // the smallest difference the commonest (task 4 settings-space, 2026-11-01). Still no regrouping either way.
          let t1, o1, t2, o2;
          if (mode === 'add') {
            const T = rng.int(2, L.tSum), O = rng.int(2, L.oSum);
            t1 = rng.int(Math.max(1, T - (L.tSum - 1)), Math.min(L.t1Hi, T - 1)); t2 = T - t1;
            o1 = rng.int(Math.max(1, O - (L.oSum - 1)), Math.min(L.o1Hi, O - 1)); o2 = O - o1;
          } else {
            const tr = rng.int(0, L.t1Hi - 1), or = rng.int(0, L.o1Hi - 1);
            t2 = rng.int(1, L.t1Hi - tr); t1 = tr + t2;
            o2 = rng.int(1, L.o1Hi - or); o1 = or + o2;
          }
          // hundreds only on level 3 — drawn after the rest, so levels 1-2 keep their rng sequence
          const h1 = L.hHi ? rng.int(1, L.hHi) : 0;
          const a = h1 * 100 + t1 * 10 + o1, b = t2 * 10 + o2;
          const r = mode === 'add' ? a + b : a - b;
          stage = `<div class="ws-card-stage" style="gap:14px;justify-content:space-between;padding:6px 10px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-r="${r}">` +
            `<span data-lcs-part="a">${draw(h1, t1, o1, h1 ? 7 : 9)}</span>` + OP(mode === 'add' ? '+' : '−') +
            `<span data-lcs-part="b">${draw(0, t2, o2, 9)}</span>` + OP('=') +
            answerBox({ w: 84, h: 56, answer: r }) + `</div>`;
        } else if (mode === 'regroup') {
          const o = rng.int(L.lo, L.hi);
          const bundles = Math.floor(o / 10);
          stage = `<div class="ws-card-stage" style="gap:18px;justify-content:space-between;padding:8px 14px" data-lcs-ones="${o}">` +
            draw(0, 0, o) +
            `<span style="display:inline-flex;align-items:center;gap:8px">` +
            answerBox({ w: 54, h: 50, answer: bundles }) +
            `<span style="font-family:'Nunito';font-weight:800;font-size:15px;color:#8A8276">⬛${MUL}10</span>` +
            OP('+') + answerBox({ w: 54, h: 50, answer: o - bundles * 10 }) + `</span></div>`;
        } else if (mode === 'expanded') {
          const { h, t, o, v } = pick();
          // The wrong forms are place-value mistakes (a digit in the wrong place, two digits swapped, a digit read at face
          // value). Each used to be the right form with ONE piece changed, so the right form was always the one sharing the
          // most pieces with the other two — a child scored 76–89 % by picking the "typical" one (task 4 settings-space,
          // 2026-11-01). Now the two wrong forms are chosen so that the option sharing the most pieces is the right one on
          // only a third of the rows (a shuffled bag per page; the pair is drawn until it gives the wanted outcome).
          const correct = h ? `${h * 100} + ${t * 10} + ${o}` : `${t * 10} + ${o}`;
          const value = h * 100 + t * 10 + o;
          const forms = h
            ? [[h * 10, t * 10, o], [h * 100, o * 10, t], [h * 100, t * 100, o], [h * 100, t * 10, o * 10], [h * 10, o * 10, t],
              [h * 10, t * 10, o * 10], [h, t * 10, o], [h * 100, t, o], [h * 1000, t * 10, o]]
            : [[o * 10, t], [t * 10, o * 10], [t, o], [t * 100, o], [t, o * 10]];
          const cands = [...new Set(forms.filter((p) => p.every((x) => x > 0) && p.reduce((x, y) => x + y, 0) !== value)
            .map((p) => p.join(' + ')))].filter((w) => w !== correct);
          const pieces = (str) => str.split(' + ');
          const shared = (x, y) => pieces(x).filter((p) => pieces(y).includes(p)).length;
          // the option(s) sharing the most pieces with the other two
          const hubs = (opts) => { const sc = opts.map((x) => opts.reduce((acc, y) => acc + (x === y ? 0 : shared(x, y)), 0)); const mx = Math.max(...sc); return opts.filter((_, k) => sc[k] === mx); };
          if (!hubBag.length) hubBag.push(...rng.shuffle([true, false, false]));
          const wantRightHub = hubBag.shift();
          const pairs = [];
          for (let i = 0; i < cands.length; i++) for (let j = i + 1; j < cands.length; j++) pairs.push([cands[i], cands[j]]);
          const fits = (pr) => { const hb = hubs([correct, ...pr]); return hb.length === 1 && (hb[0] === correct) === wantRightHub; };
          const good = pairs.filter(fits);
          const wrongs = good.length ? rng.pick(good) : rng.pick(pairs.filter((pr) => !hubs([correct, ...pr]).every((x) => x === correct)).concat(pairs.length ? [] : [cands.slice(0, 2)]));
          const chips = rng.shuffle([correct, ...wrongs]).map((s) =>
            `<span class="ws-chip" style="width:auto;height:46px;font-size:20px;padding:0 14px;border-radius:23px" ` +
            `data-lcs-exp="${s}"${s === correct ? ' data-lcs-correct="1"' : ''}>${s}</span>`).join('');
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-value="${v}" data-lcs-h="${h}" data-lcs-t="${t}" data-lcs-o="${o}">` +
            draw(h, t, o, d.unit) + `<div class="ws-choices">${chips}</div></div>`;
        } else if (mode === 'pv-chart') {
          const { h, t, o, v } = pick();
          const PH = placeHeads(locale);   // 2026-11-01: the school's own letters (was H T O in every locale)
          const col = (lab, ans) =>
            `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:6px">` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:17px;color:#146B5E">${lab}</span>` +
            answerBox({ w: 64, h: 54, answer: ans }) + `</span>`;
          stage = `<div class="ws-card-stage" style="gap:24px;justify-content:space-between;padding:8px 14px" data-lcs-value="${v}">` +
            draw(h, t, o) +
            `<span style="display:inline-flex;gap:12px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px 14px">` +
            (d.maxH ? col(PH[0], h) : '') + col(PH[1], t) + col(PH[2], o) + `</span></div>`;
        } else if (mode === 'digit-value') {
          // The wrong values are the place-value mistakes: the digit itself (face value), the value one or two places
          // too far left (×10, ×100), one place too far right (÷10), another digit of the number read as the answer.
          // They used to be the digit and ×10, so the right value was ALWAYS the middle number — a child scored by
          // picking it (task 4 settings-space, 2026-11-01). Now the rank of the right value among the three (smallest /
          // middle / largest) comes from a shuffled bag per page, and the number + underlined digit are drawn until that
          // rank can be made (a ones digit has nothing smaller, so it is drawn for "smallest" or "middle" only).
          if (!rankBag.length) rankBag.push(...rng.shuffle([0, 1, 2]));
          const want = rankBag.shift();
          let v, s, idx, digit, value, below, above, ranks;
          for (let tries = 0; tries < 40; tries++) {
            ({ v } = pick());
            s = String(v);
            idx = rng.int(0, s.length - 1);
            digit = +s[idx];
            value = digit * Math.pow(10, s.length - 1 - idx);
            below = [...new Set([digit, value / 10, ...s.split('').map(Number).filter((x, k) => k !== idx)])]
              .filter((w) => Number.isInteger(w) && w > 0 && w < value);
            above = [value * 10, value * 100];
            ranks = [0, 1, 2].filter((r) => below.length >= r && above.length >= 2 - r);
            if (ranks.includes(want)) break;
          }
          const rank = ranks.includes(want) ? want : rng.pick(ranks);
          const shown = s.split('').map((ch, k) =>
            `<span style="${k === idx ? 'text-decoration:underline;text-decoration-color:#F2784B;text-decoration-thickness:4px;color:#F2784B' : ''}">${ch}</span>`).join('');
          const wrongs = [...rng.shuffle(below).slice(0, rank), ...above.slice(0, 2 - rank)];
          const chips = rng.shuffle([value, ...wrongs]).map((c) =>
            `<span class="ws-chip" style="width:auto;min-width:70px;height:48px;font-size:22px;padding:0 12px;border-radius:24px" ` +
            `data-lcs-choice="${c}"${c === value ? ' data-lcs-correct="1"' : ''}>${c}</span>`).join('');
          stage = `<div class="ws-card-stage" style="gap:26px;justify-content:space-between;padding:8px 20px" data-lcs-digitvalue="${value}">` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:46px;color:#3A3530" data-lcs-shown="${v}" data-lcs-idx="${idx}">${shown}</span>` +
            `<div class="ws-choices">${chips}</div></div>`;
        }
        cards.push(stage);
      }
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        const census = (root) => ({
          h: root.querySelectorAll('[data-lcs-block="hundred"]').length,
          t: root.querySelectorAll('[data-lcs-block="ten"]').length,
          o: root.querySelectorAll('[data-lcs-block="one"]').length,
        });
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          if (mode === 'read' || mode === 'pv-chart') {
            const want = +card.querySelector('[data-lcs-value]').dataset.lcsValue;
            const c = census(card.querySelector('[data-lcs-prim="base-ten"]'));
            if (c.h * 100 + c.t * 10 + c.o !== want) fails.push(`row ${i + 1}: blocks != ${want}`);
            if (mode === 'pv-chart') {
              const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
              const expect = c.h ? [c.h, c.t, c.o] : [c.t, c.o];
              if (boxes.join() !== expect.join()) fails.push(`row ${i + 1}: chart boxes != block census`);
            }
          } else if (mode === 'choose') {
            const want = +card.querySelector('[data-lcs-value]').dataset.lcsValue;
            const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct`); return; }
            const c = census(correct[0]);
            if (c.h * 100 + c.t * 10 + c.o !== want) fails.push(`row ${i + 1}: correct set != ${want}`);
            card.querySelectorAll('.ws-pattern-chip:not([data-lcs-correct])').forEach((chip) => {
              const w = census(chip);
              if (w.h * 100 + w.t * 10 + w.o === want) fails.push(`row ${i + 1}: distractor also equals ${want}`);
            });
          } else if (mode === 'count-tens') {
            const t = +card.querySelector('[data-lcs-tens]').dataset.lcsTens;
            const c = census(card.querySelector('[data-lcs-prim="base-ten"]'));
            if (c.t !== t || c.o !== 0 || c.h !== 0) fails.push(`row ${i + 1}: rods ${c.t} != ${t}`);
            const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
            if (boxes[0] !== t || boxes[1] !== t * 10) fails.push(`row ${i + 1}: equation boxes wrong`);
          } else if (mode === 'add' || mode === 'sub') {
            const st = card.querySelector('[data-lcs-a]');
            const a = +st.dataset.lcsA, b = +st.dataset.lcsB, r = +st.dataset.lcsR;
            const ca = census(st.querySelector('[data-lcs-part="a"]'));
            const cb = census(st.querySelector('[data-lcs-part="b"]'));
            if (ca.h * 100 + ca.t * 10 + ca.o !== a) fails.push(`row ${i + 1}: A blocks != ${a}`);
            if (cb.t * 10 + cb.o !== b) fails.push(`row ${i + 1}: B blocks != ${b}`);
            if (mode === 'add' ? a + b !== r : a - b !== r) fails.push(`row ${i + 1}: result wrong`);
            if (mode === 'add' && (ca.o + cb.o > 9 || ca.t + cb.t > 9)) fails.push(`row ${i + 1}: would regroup`);
            if (mode === 'sub' && (cb.o > ca.o || cb.t > ca.t)) fails.push(`row ${i + 1}: would borrow`);
          } else if (mode === 'regroup') {
            const o = +card.querySelector('[data-lcs-ones]').dataset.lcsOnes;
            const c = census(card.querySelector('[data-lcs-prim="base-ten"]'));
            if (c.o !== o || o < 11 || o > 19) fails.push(`row ${i + 1}: ones ${c.o} (declared ${o})`);
            const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
            if (boxes[0] !== Math.floor(o / 10) || boxes[1] !== o % 10) fails.push(`row ${i + 1}: regroup boxes wrong`);
          } else if (mode === 'expanded') {
            const st = card.querySelector('[data-lcs-value]');
            const h = +st.dataset.lcsH, t = +st.dataset.lcsT, o = +st.dataset.lcsO;
            const c = census(st.querySelector('[data-lcs-prim="base-ten"]'));
            if (c.h !== h || c.t !== t || c.o !== o) fails.push(`row ${i + 1}: blocks != declared`);
            const correct = [...card.querySelectorAll('.ws-chip')].filter((x) => x.dataset.lcsCorrect);
            if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct`); return; }
            const sum = correct[0].dataset.lcsExp.split('+').reduce((acc, x) => acc + parseInt(x.trim(), 10), 0);
            if (sum !== h * 100 + t * 10 + o) fails.push(`row ${i + 1}: expanded form sums to ${sum}`);
          } else if (mode === 'digit-value') {
            const want = +card.querySelector('[data-lcs-digitvalue]').dataset.lcsDigitvalue;
            const shown = card.querySelector('[data-lcs-shown]');
            const v = shown.dataset.lcsShown, idx = +shown.dataset.lcsIdx;
            const expect = (+v[idx]) * Math.pow(10, v.length - 1 - idx);
            if (want !== expect) fails.push(`row ${i + 1}: declared value ${want} != ${expect}`);
            const correct = [...card.querySelectorAll('.ws-chip')].filter((x) => x.dataset.lcsCorrect);
            if (correct.length !== 1 || +correct[0].dataset.lcsChoice !== want) fails.push(`row ${i + 1}: chips wrong`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeBaseTenType };
