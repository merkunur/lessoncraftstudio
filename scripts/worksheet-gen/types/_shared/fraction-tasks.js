/**
 * Factory for the fraction family (class 7):
 *  - 'shade':         fraction → child shades a blank partitioned shape (G2-228/229, G3-316)
 *  - 'which-shows':   3 shaded shapes → circle the one showing n/d (G2-230, G2-234)
 *  - 'equal-unequal': circle the shapes with EQUAL parts (G2-232, G3-343)
 *  - 'name':          shaded shape → write n and d in a fraction frame (G3-315)
 *  - 'set-circle':    n icons → circle n/d of them (G2-233, G3-320)
 *  - 'compare':       two shaded fractions → circle the bigger (G3-319)
 *  - 'line':          fraction number line 0-1, dot at n/d → circle the fraction (G3-317)
 *  - 'whole':         this bar is 1/d → circle the bar that is the whole (G3-321)
 *  - 'match-equiv':   shaded shapes ↔ fraction labels (G2-231 names them; G3-318/322 `equiv` = an EQUIVALENT form)
 *
 * Level Set 2026-10-08 (Fractions, PDF + interactive + answer key):
 *  - cfg.level[1|3] knobs move the levels (ds, num, shapes, halfOf, refPart, setNum, sameParts, equivFactor); absent at
 *    level 2, so the published configuration is unchanged.
 *  - Fixes on EVERY level (the published pages are republished): the number line printed English ("0 → 1 in 6 steps")
 *    and labelled its end with the denominator, not 1; a wrong option could EQUAL the answer (3/6 vs 4/8); on the
 *    circle-one modes (which-shows, line, whole) the wrong options were one less and one more, so the answer was always
 *    the MIDDLE one — options are now chosen so the answer is the smallest, middle or largest value equally often;
 *    the "equivalent fractions" faces printed each picture's OWN name — their labels are now an equivalent form.
 *  - A new page (not level 2 copy 1) also builds its screen version and answer key (lib/fractions-screen.js).
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const fractionShape = require('../../primitives/fraction.js');
const numberLine = require('../../primitives/number-line.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');

const FRAC = (n, d, size) =>
  `<span style="display:inline-flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-weight:700;color:#3A3530" data-lcs-frac="${n}/${d}">` +
  `<span style="font-size:${size || 26}px;line-height:1">${n}</span>` +
  `<span style="width:${(size || 26) + 6}px;height:3px;background:#3A3530;border-radius:2px;margin:2px 0"></span>` +
  `<span style="font-size:${size || 26}px;line-height:1">${d}</span></span>`;

/** Every (a/b, c/d) with the same value, both denominators in `dens`, the pairs different. */
function equivPairs(dens) {
  const out = [];
  for (const b of dens) for (let a = 1; a < b; a++) for (const d of dens) for (let c = 1; c < d; c++) {
    if (b === d) continue;
    if (a * d === c * b) out.push({ p: { n: a, d: b }, q: { n: c, d: d } });
  }
  return out;
}

/**
 * Wrong options for a target value, so that the target sits at `rank` (0 smallest, 1 middle, 2 largest) by value.
 * cands: [{n, d}] — every candidate's value must differ from the target's and from each other's (checked here).
 * Returns null when that rank cannot be built.
 */
function rankedWrongs(target, cands, rank, rng) {
  const v = (f) => f.n / f.d;
  const tv = v(target);
  const seen = new Set([tv.toFixed(6)]);
  const pool = rng.shuffle(cands.slice()).filter((c) => { const k = v(c).toFixed(6); if (seen.has(k)) return false; seen.add(k); return true; });
  // closest first: the same denominator first, then by distance in value
  const near = (a, b) => ((a.d !== target.d) - (b.d !== target.d)) || (Math.abs(v(a) - tv) - Math.abs(v(b) - tv));
  const below = pool.filter((c) => v(c) < tv).sort(near);
  const above = pool.filter((c) => v(c) > tv).sort(near);
  const need = [[0, 2], [1, 1], [2, 0]][rank];   // [how many below, how many above] for the target at `rank`
  if (below.length < need[0] || above.length < need[1]) return null;
  return [...below.slice(0, need[0]), ...above.slice(0, need[1])];
}

/**
 * Two wrong options of two KINDS — one with the target's own denominator (a miscounted numerator) and one real slip
 * with another denominator — so that "pick the option with the right number of parts" never solves the card alone and
 * the target sits at `rank` by value. Falls back to rankedWrongs over both lists when no pair builds that rank.
 */
function twoKindWrongs(target, sameDen, slips, rank, rng, numRank) {
  const v = (f) => f.n / f.d, tv = v(target);
  const ok = (c) => Math.abs(v(c) - tv) > 1e-9;
  const A = rng.shuffle(sameDen.filter(ok)), Bs = rng.shuffle(slips.filter(ok));
  const pairs = [];
  for (const a of A) for (const b of Bs) {
    if (Math.abs(v(a) - v(b)) < 1e-9) continue;
    const below = [a, b].filter((c) => v(c) < tv).length;
    if (below === 2 - rank) pairs.push([a, b]);
  }
  // no same-denominator option can build this rank (1/3 as the largest: nothing on its line lies below it) — two slips
  // instead, scored by the same rules below (the old closest-value fallback made three different top numbers with the
  // answer in the middle)
  if (!pairs.length) for (let i = 0; i < Bs.length; i++) for (let j = i + 1; j < Bs.length; j++) {
    const a = Bs[i], b = Bs[j];
    if (Math.abs(v(a) - v(b)) < 1e-9) continue;
    if ([a, b].filter((c) => v(c) < tv).length === 2 - rank) pairs.push([a, b]);
  }
  if (pairs.length) {
    // never let the answer be the option that shares the most (or the fewest) numbers with the others — a child who
    // "taps the one the others have in common" would win every card (measured 58% before, qa/guessability.js); then the
    // nearest same-denominator slip (one part more or less), then the nearest other slip
    const tells = ([a, b]) => {
      const T = [[target.n, target.d], [a.n, a.d], [b.n, b.d]];
      const sh = T.map((t, j) => t.reduce((s, tok) => s + T.filter((u, k) => k !== j && u.includes(tok)).length, 0) / t.length);
      const mx = Math.max(...sh), mn = Math.min(...sh);
      return ((sh[0] === mx && sh.filter((x) => x === mx).length === 1) || (sh[0] === mn && sh.filter((x) => x === mn).length === 1)) ? 1 : 0;
    };
    // and the answer's NUMERATOR sits at its own drawn rank among the options' numerators (or ties one): otherwise
    // "tap the middle top number" won 58% (pooled guessability 2026-10-08)
    // three DIFFERENT top numbers only came with an answer in the middle by value (an extreme answer always brought a
    // shared top number), so "if all top numbers differ, tap the middle one" solved those cards: options that share a
    // top number (a real slip — the same count in another shape, or two slips with the same count) are preferred, and
    // the rare all-different card keeps the answer's top number at a drawn rank
    const numOff = ([a, b]) => {
      if (numRank == null) return 0;
      if (a.n === target.n || b.n === target.n || a.n === b.n) return 0;
      return 1 + ([a.n, b.n].filter((x) => x < target.n).length === numRank ? 0 : 1);
    };
    // both tells weigh the same: preferring one alone forced the other (the answer was the middle top number on every
    // level-3 number-line card with three different top numbers)
    pairs.sort((p, q) => ((tells(p) + numOff(p)) - (tells(q) + numOff(q))) || (Math.abs(p[0].n - target.n) - Math.abs(q[0].n - target.n)) || (Math.abs(v(p[1]) - tv) - Math.abs(v(q[1]) - tv)));
    return pairs[0];
  }
  return rankedWrongs(target, [...sameDen, ...slips], rank, rng);
}

/**
 * The wrong options a card may offer (shared with the screen version, lib/fractions-screen.js):
 *  wsCands    which-shows: the same shape with another number of parts shaded (0..den), and the classic slip — the same
 *             number shaded in a shape cut into a different number of parts (1 of 4 is not a half); plus one part more
 *             in a shape with one part more (2 of 3 for a half: a slip that is MORE) and other counts in the other
 *             shapes, so the answer never has to be the option the others share numbers with
 *  lineCands  line: the same line's other steps (a miscounted numerator) and the tick-count slip — counting the TICKS
 *             (den + 1) instead of the spaces
 *  wholeCands whole: other bar lengths (1 cell = the part itself is a real slip)
 */
function wsCands(num, den) {
  const same = [];
  for (let k = 0; k <= den; k++) if (k !== num) same.push({ n: k, d: den });
  const slips = [den - 1, den + 1, den + 2].filter((dd) => dd >= 2 && dd > num && dd <= 8 && dd !== den).map((dd) => ({ n: num, d: dd }));
  if (num + 1 < den + 1 && den + 1 <= 8) slips.push({ n: num + 1, d: den + 1 });
  for (const dd of [den - 1, den + 1]) if (dd >= 2 && dd <= 8 && dd !== den) for (let k = 1; k < dd; k++) if (k !== num && k !== num + 1) slips.push({ n: k, d: dd });
  return { same, slips };
}
function lineCands(num, den) {
  // every option is a point of the dot's OWN line, the ends included (0/4 and 4/4 — mixing up an end is a real slip):
  // a mix of same-line options and tick-count slips (n/(d+1)) always left a shortcut through the top numbers, the
  // denominators or the numbers the options share (pooled guessability 2026-10-08)
  const cands = [];
  for (let k = 0; k <= den; k++) if (k !== num) cands.push({ n: k, d: den });
  return { cands };
}
function wholeCands(den) {
  const cands = [];
  for (let p = 1; p <= Math.min(9, den + 3); p++) if (p !== den) cands.push({ n: p, d: 1 });
  return cands;
}

/** a page's answer ranks: each rank about equally often, shuffled (never a fixed cycle) */
function pageRanks(n, rng) {
  const bag = [];
  while (bag.length < n) bag.push(...rng.shuffle([0, 1, 2]));
  return rng.shuffle(bag.slice(0, n));
}

function makeFractionType(cfg) {
  const { id, slug, mode, ds, gradeBand, i18n } = cfg;
  const screenLib = () => require('../../lib/fractions-screen.js');
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G23',
    assetClass: 'fractions',
    exerciseType: 'fractions',
    themeAxis: { applicable: mode === 'set-circle', minNouns: 2 },
    difficulty: cfg.difficulty || {
      1: { ds: ds || [2, 3, 4], cards: 4 },
      2: { ds: ds || [3, 4, 6], cards: 4 },
      3: { ds: ds || [4, 6, 8], cards: 4 },
    },
    i18n,
    fractionMode: mode,
    // Level Set 2026-10-08: the screen version + answer key of every NEW page
    interactive: require('../../lib/fractions-screen.js').interactiveFor(mode, !!cfg.equiv),
    /** Level Set copies: what a page asks (build-waves compares copies by these) */
    levelSetWords(m) { return (m.asks || []).map(String); },

    build({ theme, difficulty, locale }, ctx) {
      const published = Number(difficulty) === 2 && ((ctx && ctx.variant) || 1) === 1;
      if (!published && ctx && (ctx.interactive || ctx.answerKey)) {
        const built = this.build({ theme, difficulty, locale }, { ...ctx, interactive: false, answerKey: false });
        return screenLib().screenOrKey(built, { ...ctx, locale: (locale || 'en').slice(0, 2), theme, mode, equiv: !!cfg.equiv });
      }
      const d = this.difficulty[difficulty];
      const LV = (cfg.level && cfg.level[difficulty]) || {};   // Level Set knobs — never set at level 2
      const rng = ctx.rng;
      const cards = [];
      const asks = [];        // what each card asks (Level Set copy comparison)
      const parsed = [];      // the same, structured, for the screen version / answer key
      const used = new Set();
      // Levels for types with a FIXED denominator list (cfg.ds), which made all
      // three levels identical (2026-09-27, Level Set programme). Level 2 is
      // unchanged (published level; snapshot-proven). Level 1 = unit fractions
      // only, level 3 = non-unit fractions where the denominator allows;
      // cfg.dsLevels may also move the denominators per level. match-equiv
      // keeps every numerator (its four items need four DIFFERENT values).
      // Types without cfg.ds already had real levels and are untouched.
      const numRule = LV.num || (ds && mode !== 'match-equiv' ? ({ 1: 'unit', 3: 'nonunit' })[difficulty] || 'any' : 'any');
      const dsL = LV.ds || (cfg.dsLevels && cfg.dsLevels[difficulty]) || d.ds;
      const pickNum = (den) => numRule === 'unit' ? 1
        : (numRule === 'nonunit' && den > 2 ? rng.int(2, LV.innerNum && den > 4 ? den - 2 : den - 1) : rng.int(1, den - 1));
      // LV.innerNum (G3-317 level 3): no numerator on the last step (7/8, 5/6 have no same-line option above them, so the
      // answer was the largest option 41% of the time)
      const pickFrac = () => {
        let den, num, guard = 0;
        do { den = rng.pick(dsL); num = pickNum(den); guard++; }
        while (used.has(num + '/' + den) && guard < 30);
        used.add(num + '/' + den);
        return { num, den };
      };

      if (mode === 'match-equiv') {
        let items;
        if (cfg.equiv) {
          // EQUIVALENT forms (G3-318 / G3-322): each picture's label is another name for the same amount —
          // never the picture's own pair. Four different amounts, so each label fits exactly one picture.
          let pairs = equivPairs(dsL);
          if (LV.equivFactor) pairs = pairs.filter((x) => LV.equivFactor.includes(Math.max(x.p.d, x.q.d) / Math.min(x.p.d, x.q.d)));
          if (LV.bigDen) pairs = pairs.filter((x) => Math.max(x.p.d, x.q.d) >= LV.bigDen);
          const byVal = new Map();
          for (const x of pairs) { const k = (x.p.n / x.p.d).toFixed(6); if (!byVal.has(k)) byVal.set(k, []); byVal.get(k).push(x); }
          const vals = rng.shuffle([...byVal.keys()]);
          if (vals.length < 4) throw new Error(`${id}: only ${vals.length} equivalent amounts for denominators ${dsL.join(',')}`);
          items = vals.slice(0, 4).map((k) => {
            const x = rng.pick(byVal.get(k));
            let flip = rng.int(0, 1) === 1;
            // LV.pic: level 1 shows the SMALLER denominator (label = more, smaller parts), level 3 the BIGGER one
            // (label = the same amount in fewer parts — the harder direction)
            if (LV.pic) flip = LV.pic === 'small' ? x.q.d < x.p.d : x.q.d > x.p.d;
            const pic = flip ? x.q : x.p, lab = flip ? x.p : x.q;
            return { num: pic.n, den: pic.d, ln: lab.n, ld: lab.d };
          });
        } else if (LV.values) {
          // Level Set (G2-231): the level's own fractions, four different amounts (level 3: thirds and quarters, two
          // of each — the pictures differ only by how many parts are shaded, so every part must be counted)
          items = rng.shuffle(LV.values.slice()).slice(0, 4).map((v) => { const [n, dd] = v.split('/').map(Number); return { num: n, den: dd }; });
        } else {
          // shaded shapes ↔ fraction labels (the label names the picture)
          items = [];
          const seen = new Set();
          while (items.length < 4) {
            const den = rng.pick(dsL);
            const num = rng.int(1, den - 1);
            const key = num / den;
            if (seen.has(key)) continue;   // distinct VALUES so matching is unambiguous
            seen.add(key);
            items.push({ num, den });
          }
        }
        let order;
        do { order = rng.shuffle(items.map((_, i) => i)); }
        while (order.some((v, i) => v === i));
        const itemH = Math.floor((760 - 3 * 14) / 4);
        const lab = (f) => (cfg.equiv ? { n: f.ln, d: f.ld } : { n: f.num, d: f.den });
        const shapes = items.map(() => rng.pick(LV.shapes || ['circle', 'bar']));
        const left = items.map((f, i) =>
          `<div class="ws-match-item" style="width:240px;height:${itemH}px" data-lcs-left="${f.num}/${f.den}">` +
          fractionShape({ shape: shapes[i], d: f.den, shaded: f.num, size: Math.min(120, itemH - 26) }).svg +
          `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
        const right = order.map((idx) =>
          `<div class="ws-match-item ws-match-item--plain" style="width:130px;height:${itemH}px" data-lcs-right="${lab(items[idx]).n}/${lab(items[idx]).d}">` +
          FRAC(lab(items[idx]).n, lab(items[idx]).d, 30) +
          `<span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
        items.forEach((f, i) => {
          asks.push(`${f.num}/${f.den}${shapes[i][0]}=${lab(f).n}/${lab(f).d}`);
          parsed.push({ pic: { n: f.num, d: f.den }, shape: shapes[i], label: lab(f) });
        });
        return {
          bodyHtml: `<div class="ws-match" style="padding:6px 60px">` +
            `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
          meta: published ? {} : { asks },
          _cards: { mode, equiv: !!cfg.equiv, items: parsed, labels: order.map((idx) => lab(items[idx])) },
        };
      }

      // whole-mode stacks 3 tall option bars per card — fewer cards gives each
      // the vertical room so nothing clips the overflow:hidden card.
      const nCards = mode === 'whole' ? 3 : d.cards;
      // the circle-one modes: the answer is the smallest / middle / largest option about equally often
      // whole: 3 cards — a once-each bag made every page a permutation of the ranks, and a rotation pattern won 55%
      // (pooled guessability 2026-10-08), so its ranks are drawn one by one (never all three the same)
      let ranks = (mode === 'which-shows' || mode === 'line') ? pageRanks(nCards, rng) : null;
      const numRanks = ranks ? Array.from({ length: nCards }, () => rng.int(0, 2)) : null;
      if (mode === 'whole') { do { ranks = Array.from({ length: nCards }, () => rng.int(0, 2)); } while (ranks.every((r) => r === ranks[0])); }
      // when the drawn rank cannot be built, the OTHER end is tried before the middle (1/3 can never be the largest of
      // three on a line of thirds — falling back to the middle made it the answer's place ~50% of the time)
      const rankOrder = (r) => (r === 1 ? [1, 0, 2] : [r, 2 - r, 1]);
      // compare: a new page's kinds of pair, each about equally often (see the compare branch)
      const cmpKinds = mode === 'compare' && !published ? rng.shuffle(['sameDen', 'sameNum', 'crossNum', 'crossDen']).slice(0, nCards) : null;
      for (let i = 0; i < nCards; i++) {
        let stage;
        if (mode === 'shade') {
          const { num, den } = pickFrac();
          const shape = rng.pick(LV.shapes || ['circle', 'bar', 'square']);
          // level 3 of "one half" (LV.halfOf): the shape is cut into 4 or 6 equal parts — one half is 2 of 4 or 3 of 6
          const parts = LV.halfOf ? rng.pick(LV.halfOf) : den;
          stage = `<div class="ws-card-stage" style="gap:30px" data-lcs-num="${num}" data-lcs-den="${den}"${LV.halfOf ? ` data-lcs-parts="${parts}"` : ''}>` +
            FRAC(num, den, 30) +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#F2784B">→</span>` +
            fractionShape({ shape, d: parts, shaded: 0, size: shape === 'bar' ? 150 : 130 }).svg + `</div>`;
          asks.push(`${num}/${den}:${parts}${shape[0]}`);
          parsed.push({ n: num, d: den, parts, shape });
        } else if (mode === 'which-shows') {
          const { num, den } = pickFrac();
          // wrong pictures, two kinds: the same shape with another number of parts shaded, and the classic slip —
          // the same number of parts shaded in a shape cut into a different number of parts (1 of 4 is not a half).
          // Never the same amount; the right picture is the smallest / middle / largest amount equally often.
          const { same, slips } = wsCands(num, den);
          let wrongs = null;
          for (const r of rankOrder(ranks[i])) { wrongs = twoKindWrongs({ n: num, d: den }, same, slips, r, rng, numRanks[i]); if (wrongs) break; }
          const opts = rng.shuffle([{ n: num, d: den, ok: true }, ...wrongs.map((w) => ({ ...w, ok: false }))]);
          const chips = opts.map((o) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:14px;padding:8px"${o.ok ? ' data-lcs-correct="1"' : ''}>` +
            fractionShape({ shape: 'circle', d: o.d, shaded: o.n, size: 96 }).svg + `</span>`).join('');
          stage = `<div class="ws-card-stage" style="gap:22px;justify-content:space-between;padding:6px 12px" data-lcs-num="${num}" data-lcs-den="${den}">` +
            FRAC(num, den, 32) + `<span class="ws-pattern-choices">${chips}</span></div>`;
          asks.push(`${num}/${den}[${opts.map((o) => o.n + '/' + o.d).sort().join(',')}]`);
          parsed.push({ n: num, d: den, opts: opts.map((o) => ({ n: o.n, d: o.d })) });
        } else if (mode === 'equal-unequal') {
          const den = rng.pick(dsL);
          const equalCount = rng.int(1, 2);
          const shapes = rng.shuffle([
            ...Array.from({ length: equalCount }, () => ({ equal: true })),
            ...Array.from({ length: 3 - equalCount }, () => ({ equal: false })),
          ]);
          const drawn = shapes.map((s) => ({ shape: rng.pick(['circle', 'bar']), equal: s.equal }));
          const boxes = drawn.map((s) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:14px;padding:8px"${s.equal ? ' data-lcs-correct="1"' : ''}>` +
            fractionShape({ shape: s.shape, d: den, shaded: 0, size: 100, equal: s.equal }).svg + `</span>`).join('');
          stage = `<div class="ws-card-stage" style="gap:18px;justify-content:space-evenly" data-lcs-equalcount="${equalCount}">${boxes}</div>`;
          asks.push(`${den}:${drawn.map((s) => (s.equal ? 'e' : 'u') + s.shape[0]).join('')}`);
          parsed.push({ d: den, shapes: drawn });
        } else if (mode === 'name') {
          const { num, den } = pickFrac();
          const shape = rng.pick(['circle', 'bar', 'square']);
          stage = `<div class="ws-card-stage" style="gap:34px" data-lcs-num="${num}" data-lcs-den="${den}">` +
            fractionShape({ shape, d: den, shaded: num, size: 130 }).svg +
            `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:6px">` +
            answerBox({ w: 56, h: 48, answer: num }) +
            `<span style="width:56px;height:3.5px;background:#3A3530;border-radius:2px"></span>` +
            answerBox({ w: 56, h: 48, answer: den }) + `</span></div>`;
          asks.push(`${num}/${den}${shape[0]}`);
          parsed.push({ n: num, d: den, shape });
        } else if (mode === 'set-circle') {
          const denPool = [2, 3, 4].filter((x) => dsL.includes(x) || (x === 2 && !cfg.dsLevels && !LV.ds));
          let den, groups, total, num, tries = 0;
          do {
            den = rng.pick(denPool);
            groups = LV.groups ? rng.pick(LV.groups) : rng.int(2, 3);
            total = den * groups;
            // level 3 (LV.setNum 'nonunit'): two thirds, three quarters … of the set
            num = LV.setNum === 'nonunit' && den > 2 ? rng.int(2, den - 1) : 1;
            tries++;
            // a new page never asks the same question twice (the published page is drawn exactly as it shipped)
          } while (!published && used.has(`${num}/${den}of${total}`) && tries < 40);
          used.add(`${num}/${den}of${total}`);
          const noun = rng.pick(labelSafeNouns(theme));
          const px = Math.min(54, Math.floor(420 / total));
          const icon = () => `<img class="ws-icon" src="${fileUri(theme, noun.noun)}" alt="" style="width:${px}px;height:${px}px">`;
          // a new page wraps its pictures in EVEN rows (a 12-picture set wrapped 11 + 1)
          const perRow = total > 8 && !published ? Math.ceil(total / 2) : 0;
          const icons = perRow
            ? `<span style="display:flex;flex-direction:column;gap:8px;align-items:center">` +
              [0, 1].map((r) => `<span style="display:flex;gap:8px">${Array.from({ length: Math.min(perRow, total - r * perRow) }, icon).join('')}</span>`).join('') + `</span>`
            : Array.from({ length: total }, icon).join('');
          const wrap = perRow ? 'display:flex;justify-content:center' : 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center';
          stage = `<div class="ws-card-stage" style="gap:22px;justify-content:space-between;padding:6px 14px" data-lcs-settotal="${total}" data-lcs-setden="${den}"${num > 1 ? ` data-lcs-setnum="${num}"` : ''}>` +
            FRAC(num, den, 28) +
            `<span style="flex:1 1 auto;${wrap}">${icons}</span>` +
            answerBox({ w: 60, h: 50, answer: total / den * num }) + `</div>`;
          asks.push(`${num}/${den}of${total}`);
          parsed.push({ n: num, d: den, total, noun: noun.noun, px });
        } else if (mode === 'compare') {
          let a, b;
          // a NEW page (not the published one) of non-unit fractions mixes four kinds of pair, so neither "the bigger
          // numerator wins" nor "the smaller denominator wins" works on its own: the same denominator, the same
          // numerator, a pair whose bigger numerator is the SMALLER fraction (3/8 vs 2/3) and a pair whose bigger
          // denominator is the BIGGER fraction (5/6 vs 1/3) — the bars are drawn, so it is read from the picture
          const kind = !published && numRule !== 'unit' ? cmpKinds[i] : null;
          if (kind === 'crossNum' || kind === 'crossDen') {
            const fits = (x, y) => x.num !== y.num && x.den !== y.den && x.num / x.den !== y.num / y.den &&
              (kind === 'crossNum' ? (x.num > y.num) !== (x.num / x.den > y.num / y.den) : (x.den > y.den) === (x.num / x.den > y.num / y.den));
            let guard = 0;
            do { a = pickFrac(); b = pickFrac(); guard++; } while (!fits(a, b) && guard < 300);
            if (!fits(a, b)) throw new Error(id + ': no ' + kind + ' pair');
          } else if (LV.sameParts || kind) {
            // level 3: the same numerator or the same denominator (3.NF.A.3d) — reason about the size of the parts
            do {
              a = pickFrac();
              if (kind ? kind === 'sameDen' : rng.int(0, 1) === 0) {   // same denominator, another numerator
                const n2 = rng.int(1, a.den - 1);
                b = { num: n2, den: a.den };
              } else {                     // same numerator, another denominator
                const dens = dsL.filter((x) => x > a.num && x !== a.den);
                b = dens.length ? { num: a.num, den: rng.pick(dens) } : { num: a.num, den: a.den };
              }
            } while (a.num / a.den === b.num / b.den);
          } else {
            do { a = pickFrac(); b = pickFrac(); } while (a.num / a.den === b.num / b.den);
          }
          const bigger = a.num / a.den > b.num / b.den ? 'a' : 'b';
          const box = (f, key) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:14px;padding:10px;flex-direction:column;gap:6px;display:inline-flex;align-items:center" ` +
            `data-lcs-side="${key}" data-lcs-val="${f.num}/${f.den}"${key === bigger ? ' data-lcs-correct="1"' : ''}>` +
            fractionShape({ shape: 'bar', d: f.den, shaded: f.num, size: 140 }).svg + FRAC(f.num, f.den, 20) + `</span>`;
          stage = `<div class="ws-card-stage" style="gap:40px;justify-content:center">${box(a, 'a')}${box(b, 'b')}</div>`;
          asks.push(`${a.num}/${a.den}|${b.num}/${b.den}`);
          parsed.push({ a: { n: a.num, d: a.den }, b: { n: b.num, d: b.den } });
        } else if (mode === 'line') {
          const { num, den } = pickFrac();
          // the line runs from 0 to 1 in `den` equal steps: its ends read 0 and 1 (it printed the denominator)
          const nl = numberLine({ min: 0, max: den, tickStep: 1, labelEvery: den, width: 480, marks: [num], labelText: { 0: '0', [den]: '1' } });
          // options, two kinds: the same line's other steps (a miscounted numerator) and the tick-count slip — counting
          // the TICKS (den + 1) instead of the spaces. Never the same amount; the answer is the smallest / middle /
          // largest equally often.
          const { cands } = lineCands(num, den);
          let wrongs = null;
          for (const r of rankOrder(ranks[i])) { wrongs = rankedWrongs({ n: num, d: den }, cands, r, rng); if (wrongs) break; }
          const opts = rng.shuffle([{ n: num, d: den }, ...wrongs]);
          const chips = opts.map((o) =>
            `<span class="ws-pattern-chip" style="width:64px;height:64px"${o.n === num && o.d === den ? ' data-lcs-correct="1"' : ''} data-lcs-opt="${o.n}/${o.d}">` +
            FRAC(o.n, o.d, 17) + `</span>`).join('');
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-num="${num}" data-lcs-den="${den}">` +
            nl.svg + `<span class="ws-pattern-choices">${chips}</span></div>`;
          asks.push(`${num}/${den}[${opts.map((o) => o.n + '/' + o.d).sort().join(',')}]`);
          parsed.push({ n: num, d: den, opts: opts.map((o) => ({ n: o.n, d: o.d })) });
        } else if (mode === 'whole') {
          const den = rng.pick(dsL.filter((x) => x <= 6));
          // level 3 (LV.refPart): the small bar is NOT one part but k parts (2/4, 3/6 …) — find the whole from it
          const k = LV.refPart && den > 2 ? rng.int(2, den - 1) : 1;
          // Fixed-cell bars (HTML, not fractionShape): every cell is the same
          // 32px square, so the reference "one part" matches each answer cell AND
          // the bar height is FIXED (not scaled by the denominator) — 3 stacked
          // bars never overflow the overflow:hidden card. (fractionShape couples
          // width+height to size, which both mismatched cells and clipped.)
          const CELL = 32;
          const cellsBar = (parts, shaded) =>
            `<span style="display:inline-flex">` +
            Array.from({ length: parts }, () =>
              `<span style="width:${CELL}px;height:${CELL}px;box-sizing:border-box;border:2.5px solid #146B5E;border-radius:5px;background:${shaded ? '#DDEBE8' : '#FFFFFF'};margin:1.5px"></span>`
            ).join('') + `</span>`;
          const bar = (parts, mark) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:12px;padding:7px"${mark ? ' data-lcs-correct="1"' : ''} data-lcs-len="${parts}">` +
            cellsBar(parts, false) + `</span>`;
          // wrong bars: other lengths (1 cell = the part itself is a real slip), the whole the smallest / middle /
          // largest bar equally often
          const cands = wholeCands(den);
          let wrongs = null;
          for (const r of rankOrder(ranks[i])) { wrongs = rankedWrongs({ n: den, d: 1 }, cands, r, rng); if (wrongs) break; }
          const lens = rng.shuffle([{ p: den, ok: true }, ...wrongs.map((w) => ({ p: w.n, ok: false }))]);
          const chips = lens.map((o) => bar(o.p, o.ok)).join('');
          stage = `<div class="ws-card-stage" style="gap:20px;justify-content:space-between;padding:6px 12px" data-lcs-den="${den}"${k > 1 ? ` data-lcs-ref="${k}"` : ''}>` +
            `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:8px">` +
            cellsBar(k, true) + FRAC(k, den, 20) + `</span>` +
            `<span class="ws-pattern-choices" style="flex-direction:column;gap:10px;align-items:flex-end">${chips}</span></div>`;
          asks.push(`${k}/${den}[${lens.map((o) => o.p).sort().join(',')}]`);
          parsed.push({ k, d: den, lens: lens.map((o) => o.p) });
        }
        cards.push(stage);
      }
      const cols = (mode === 'shade' || mode === 'name') ? 2 : 1;
      return {
        bodyHtml: cardGrid({ cards, cols, rows: Math.ceil(cards.length / cols) }),
        meta: published ? {} : { asks },
        _cards: { mode, items: parsed },
      };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode, equiv) => {
        const fails = [];
        const fracOf = (svg) => ({
          d: svg.querySelectorAll('[data-lcs-part]').length,
          n: svg.querySelectorAll('[data-lcs-shaded="1"]').length,
          equal: svg.dataset.lcsEqual === '1',
        });
        const pair = (s) => s.split('/').map(Number);
        if (mode === 'match-equiv') {
          const left = [...document.querySelectorAll('[data-lcs-left]')];
          const right = [...document.querySelectorAll('[data-lcs-right]')].map((e) => e.dataset.lcsRight);
          const rv = right.map((r) => { const [n, dd] = pair(r); return n / dd; });
          left.forEach((item, i) => {
            const f = fracOf(item.querySelector('[data-lcs-prim="fraction"]'));
            const [n, dd] = pair(item.dataset.lcsLeft);
            if (f.d !== dd || f.n !== n) fails.push(`row ${i + 1}: picture != ${n}/${dd}`);
            const v = n / dd;
            const hits = rv.map((x, j) => (Math.abs(x - v) < 1e-9 ? j : -1)).filter((j) => j >= 0);
            if (hits.length !== 1) fails.push(`row ${i + 1}: ${hits.length} labels show ${n}/${dd}`);
            else {
              if (hits[0] === i) fails.push(`row ${i + 1}: straight-across`);
              // equivalent-fraction pages: the label is ANOTHER name for the amount, never the picture's own
              if (equiv && right[hits[0]] === item.dataset.lcsLeft) fails.push(`row ${i + 1}: the label repeats the picture's own fraction`);
              if (!equiv && right[hits[0]] !== item.dataset.lcsLeft) fails.push(`row ${i + 1}: the label is not the picture's fraction`);
            }
          });
          const vals = left.map((e) => { const [n, dd] = pair(e.dataset.lcsLeft); return n / dd; });
          if (new Set(vals).size !== vals.length) fails.push('two pictures share a value — ambiguous');
          return fails;
        }
        const rankMid = [];   // circle-one modes: is the answer the middle option by value?
        const rankOf = (vals, ok) => vals.filter((v) => v < ok).length;
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          if (/[A-Za-z]{2,}/.test([...card.querySelectorAll('text')].map((t) => t.textContent).join(' '))) fails.push(`card ${i + 1}: words printed inside a picture`);
          if (mode === 'shade') {
            const host = card.querySelector('[data-lcs-num]');
            const num = +host.dataset.lcsNum;
            const den = +host.dataset.lcsDen;
            const parts = +(host.dataset.lcsParts || den);
            const f = fracOf(card.querySelector('[data-lcs-prim="fraction"]'));
            if (f.d !== parts) fails.push(`card ${i + 1}: parts ${f.d} != ${parts}`);
            if (parts % den !== 0) fails.push(`card ${i + 1}: ${parts} parts cannot show ${num}/${den}`);
            if (f.n !== 0) fails.push(`card ${i + 1}: must start unshaded`);
            if (!f.equal) fails.push(`card ${i + 1}: parts must be equal`);
            if (num < 1 || num >= den) fails.push(`card ${i + 1}: bad fraction`);
          } else if (mode === 'which-shows') {
            const num = +card.querySelector('[data-lcs-num]').dataset.lcsNum;
            const den = +card.querySelector('[data-lcs-num]').dataset.lcsDen;
            const chips = [...card.querySelectorAll('.ws-pattern-chip')];
            const correct = chips.filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1) { fails.push(`card ${i + 1}: ${correct.length} correct`); return; }
            const f = fracOf(correct[0].querySelector('[data-lcs-prim="fraction"]'));
            if (f.n !== num || f.d !== den) fails.push(`card ${i + 1}: correct chip shows ${f.n}/${f.d}`);
            const vals = chips.map((chip) => { const w = fracOf(chip.querySelector('[data-lcs-prim="fraction"]')); return w.n / w.d; });
            card.querySelectorAll('.ws-pattern-chip:not([data-lcs-correct])').forEach((chip) => {
              const w = fracOf(chip.querySelector('[data-lcs-prim="fraction"]'));
              if (w.n / w.d === num / den) fails.push(`card ${i + 1}: distractor equals the target value`);
            });
            if (new Set(vals).size !== vals.length) fails.push(`card ${i + 1}: two pictures show the same amount`);
            rankMid.push(rankOf(vals, num / den) === 1);
          } else if (mode === 'equal-unequal') {
            const want = +card.querySelector('[data-lcs-equalcount]').dataset.lcsEqualcount;
            const chips = [...card.querySelectorAll('.ws-pattern-chip')];
            const marked = chips.filter((c) => c.dataset.lcsCorrect);
            if (marked.length !== want) fails.push(`card ${i + 1}: ${marked.length} marked != ${want}`);
            chips.forEach((c) => {
              const f = fracOf(c.querySelector('[data-lcs-prim="fraction"]'));
              if (!!c.dataset.lcsCorrect !== f.equal) fails.push(`card ${i + 1}: equality mark wrong`);
            });
          } else if (mode === 'name') {
            const num = +card.querySelector('[data-lcs-num]').dataset.lcsNum;
            const den = +card.querySelector('[data-lcs-num]').dataset.lcsDen;
            const f = fracOf(card.querySelector('[data-lcs-prim="fraction"]'));
            if (f.n !== num || f.d !== den) fails.push(`card ${i + 1}: shape shows ${f.n}/${f.d} != ${num}/${den}`);
            const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
            if (boxes[0] !== num || boxes[1] !== den) fails.push(`card ${i + 1}: answer frame mismatch`);
          } else if (mode === 'set-circle') {
            const host = card.querySelector('[data-lcs-settotal]');
            const total = +host.dataset.lcsSettotal;
            const den = +host.dataset.lcsSetden;
            const num = +(host.dataset.lcsSetnum || 1);
            const icons = card.querySelectorAll('.ws-icon').length;
            if (icons !== total) fails.push(`card ${i + 1}: ${icons} icons != ${total}`);
            if (total % den !== 0) fails.push(`card ${i + 1}: ${total} not divisible by ${den}`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== total / den * num) fails.push(`card ${i + 1}: answer mismatch`);
            const fr = card.querySelector('[data-lcs-frac]');
            if (fr && fr.dataset.lcsFrac !== `${num}/${den}`) fails.push(`card ${i + 1}: printed fraction != ${num}/${den}`);
          } else if (mode === 'compare') {
            const sides = [...card.querySelectorAll('[data-lcs-side]')];
            const vals = sides.map((s) => { const [n, dd] = pair(s.dataset.lcsVal); return { n, d: dd, v: n / dd, el: s }; });
            vals.forEach((x, k) => {
              const f = fracOf(x.el.querySelector('[data-lcs-prim="fraction"]'));
              if (f.n !== x.n || f.d !== x.d) fails.push(`card ${i + 1} side ${k}: picture != label`);
            });
            const bigger = vals[0].v > vals[1].v ? vals[0] : vals[1];
            if (!bigger.el.dataset.lcsCorrect) fails.push(`card ${i + 1}: bigger fraction unmarked`);
            if (vals[0].v === vals[1].v) fails.push(`card ${i + 1}: equal fractions`);
          } else if (mode === 'line') {
            const num = +card.querySelector('[data-lcs-num]').dataset.lcsNum;
            const den = +card.querySelector('[data-lcs-num]').dataset.lcsDen;
            const mark = card.querySelector('[data-lcs-mark]');
            if (+mark.dataset.lcsMark !== num) fails.push(`card ${i + 1}: dot at ${mark.dataset.lcsMark}/${den} != ${num}/${den}`);
            const labels = [...card.querySelectorAll('[data-lcs-ticklabel]')].map((t) => t.textContent.trim());
            if (labels.join(',') !== '0,1') fails.push(`card ${i + 1}: the line's ends read ${labels.join(',')}, not 0 and 1`);
            if (card.querySelectorAll('[data-lcs-tick]').length !== den + 1) fails.push(`card ${i + 1}: the line is not cut in ${den} steps`);
            const chips = [...card.querySelectorAll('.ws-pattern-chip')];
            const correct = chips.filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1 || correct[0].dataset.lcsOpt !== num + '/' + den) fails.push(`card ${i + 1}: chips wrong`);
            const vals = chips.map((c) => { const [n, dd] = pair(c.dataset.lcsOpt); return n / dd; });
            if (vals.filter((v) => Math.abs(v - num / den) < 1e-9).length !== 1) fails.push(`card ${i + 1}: another option is the same amount as ${num}/${den}`);
            rankMid.push(rankOf(vals, num / den) === 1);
          } else if (mode === 'whole') {
            const host = card.querySelector('[data-lcs-den]');
            const den = +host.dataset.lcsDen;
            const k = +(host.dataset.lcsRef || 1);
            const chips = [...card.querySelectorAll('.ws-pattern-chip')];
            const correct = chips.filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1 || +correct[0].dataset.lcsLen !== den) fails.push(`card ${i + 1}: whole != ${den} parts`);
            const fr = card.querySelector('[data-lcs-frac]');
            if (!fr || fr.dataset.lcsFrac !== `${k}/${den}`) fails.push(`card ${i + 1}: the part is not labelled ${k}/${den}`);
            const lens = chips.map((c) => +c.dataset.lcsLen);
            if (new Set(lens).size !== lens.length) fails.push(`card ${i + 1}: two bars the same length`);
            rankMid.push(rankOf(lens, den) === 1);
          }
        });
        // a page whose answers are ALL the middle option can be done without reading it
        if (rankMid.length >= 3 && rankMid.every(Boolean)) fails.push('the answer is the middle option on every card');
        return fails;
      }, m, !!cfg.equiv);
    },
  };
}

module.exports = { makeFractionType, equivPairs, rankedWrongs, twoKindWrongs, wsCands, lineCands, wholeCands };
