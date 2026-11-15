/**
 * A page of the year designs (Year pages Y, 2026-11-14; Daily Teaching System Part 12.2; Grade 3):
 *   quarter-plot  G3-493 Measure to the Quarter Inch (en) / Measure to the Half Centimeter (the ten other languages) —
 *                 pencils, each drawn directly above its own printed ruler (so printing at another size changes
 *                 nothing: the child reads the ruler on the page). The child writes each length, then shows the
 *                 lengths as Xs on a line plot whose ticks are the quarters (halves) and answers two questions.
 *                 Level 1 six pencils, lengths on the wholes and halves, no plot · level 2 eight pencils from the
 *                 0 mark, lengths to the quarter inch (half centimeter), the plot and the questions · level 3 the
 *                 pencils do not start at 0 (the child counts on from where the pencil starts), the plot and the
 *                 questions. English rulers are 4 inches in quarters, drawn at about two thirds of their size (the
 *                 instruction says so); the others are 8 centimeters in halves at their REAL size.
 *                 3.MD.B.4 (en); the half centimeter of the Swedish year 3 design.
 * The questions are those of the Grade 2 line-plot page (measure-units.js PLOT_WORDS: the most common length, how
 * many are longer than …), read by a native reader there. A length is printed as the country's Grade 3 writes it: 2½
 * in the US; 6,5 in de, nl, sv, da; 6½ in es-MX, pt-BR, it, no, fi (decimals come a year later there). Not published
 * in French: CE2 writes neither form. No theme: a copy is a new draw of the lengths. Printed page only.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { PLOT_WORDS } = require('./measure-units.js');
const { checkGrid } = require('../../lib/check-page.js');

const C = tokens.color, INK = C.ink, TEAL = C.teal, CORAL = C.coral;
const loc2 = (l) => String(l || 'en').slice(0, 2);
const LEVELS = {
  'quarter-plot': {
    1: { n: 6, halves: true, plot: false, offset: false },
    2: { n: 8, halves: false, plot: true, offset: false },
    3: { n: 8, halves: false, plot: true, offset: true },
  },
};
const NUM = (s, size = 22, color = INK) => `<span style="font:700 ${size}px/1 'Baloo 2',cursive;color:${color};white-space:nowrap">${s}</span>`;
const WORD = (s, size = 17, extra = '') => `<span style="font:700 ${size}px/1.25 'Nunito',sans-serif;color:${INK};${extra}">${s}</span>`;
const shuffle = (a, rng) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };

/** the system of a language: ticks per unit, the units of a ruler, and how a length of k ticks is written */
function systemOf(L) {
  if (L === 'en') {
    const FR = ['', '¼', '½', '¾'];
    // (a real 4-inch ruler is wider than a card: the inch rulers are drawn at about two thirds, and the page says so)
    return { unit: 'in.', unitLong: 'inches', per: 4, units: 4, lo: 4, hi: 16, px: 264, write: (k) => (Math.floor(k / 4) ? String(Math.floor(k / 4)) : '') + FR[k % 4], key: (k) => (k % 4 ? `${Math.floor(k / 4)} ${k % 4 === 2 ? '1/2' : (k % 4) + '/4'}` : String(k / 4)) };
  }
  // six and a half centimeters: 6,5 where Grade 3 writes measures with a comma (de, nl, sv, da); 6½ where decimals
  // come a year later and halves are known (es-MX, pt-BR, it, no, fi; native and teaching review, 2026-11-14).
  // French Grade 3 (CE2) has neither form: the page is not published in French (the wave config leaves it out).
  const HALF = ['es', 'pt', 'it', 'no', 'fi'].includes(L);
  const w = (k) => (k % 2 ? Math.floor(k / 2) + (HALF ? '½' : ',5') : String(k / 2));
  const key = (k) => (k % 2 ? Math.floor(k / 2) + (HALF ? ' 1/2' : ',5') : String(k / 2));
  // a ruler of 8 cm at its REAL size (96 px to the inch): pencil stubs of 3 to 8 cm
  return { unit: 'cm', unitLong: 'cm', per: 2, units: 8, lo: 6, hi: 16, px: 8 * 96 / 2.54, write: w, key };
}

/** a pencil len px long lying on y: body, a wooden cone and its point at the right end */
function pencil(x, y, len, h, color) {
  const tip = Math.min(16, len * 0.22), cap = 5;
  return `<g data-lcs-pencil="${len.toFixed(2)}"><rect x="${x}" y="${y}" width="${cap}" height="${h}" rx="1.5" fill="${C.coralSoft}" stroke="${INK}" stroke-width="1.6"/>` +
    `<rect x="${x + cap}" y="${y}" width="${(len - tip - cap).toFixed(2)}" height="${h}" fill="${color}" stroke="${INK}" stroke-width="1.6"/>` +
    `<path d="M${(x + len - tip).toFixed(2)} ${y} L${(x + len).toFixed(2)} ${y + h / 2} L${(x + len - tip).toFixed(2)} ${y + h} Z" fill="${C.cream}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>` +
    `<path d="M${(x + len - tip * 0.35).toFixed(2)} ${(y + h * 0.33).toFixed(2)} L${(x + len).toFixed(2)} ${y + h / 2} L${(x + len - tip * 0.35).toFixed(2)} ${(y + h * 0.67).toFixed(2)} Z" fill="${INK}"/></g>`;
}
/** a ruler of `units` units, `per` ticks to a unit, T px between ticks; `shown` = ticks per unit that are drawn */
function ruler(x, y, units, per, T, shown) {
  const n = units * per, W = n * T;
  let s = `<rect x="${x - 8}" y="${y}" width="${W + 16}" height="30" rx="4" fill="#FFFFFF" stroke="${INK}" stroke-width="1.8" data-lcs-ruler="${units}|${per}"/>`;
  for (let k = 0; k <= n; k++) {
    if (k % (per / shown) !== 0) continue;
    const whole = k % per === 0, half = per === 4 && k % 2 === 0;
    const len = whole ? 13 : half ? 9 : 6;
    s += `<line x1="${(x + k * T).toFixed(2)}" y1="${y}" x2="${(x + k * T).toFixed(2)}" y2="${y + len}" stroke="${INK}" stroke-width="${whole ? 1.8 : 1.2}" data-lcs-rtick="${k}"/>`;
    if (whole) s += `<text x="${(x + k * T).toFixed(2)}" y="${y + 26}" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="12" fill="${INK}">${k / per}</text>`;
  }
  return s;
}

function makeRulerLengthsType({ id, slug, mode, gradeBand, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error(`${id}: unknown mode ${mode}`);
  return {
    id, slug, gradeBand, assetClass: 'none', exerciseType: 'measurement',
    themeAxis: { applicable: false },
    interactive: false,
    difficulty: D,
    i18n,
    levelSetWords(m) { return [(m.items || []).join(' ')]; },

    /** THE ITEM BANK (Part 7.6): the pencils of the level, each over its own ruler, a card each (build, ctx.check) */
    checkPage(args, ctx) { return this.build(args, { ...(ctx || {}), check: true }); },

    build(args, ctx) {
      const lv = Number(args.difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng, L = loc2(args.locale);
      const Wd = PLOT_WORDS[L]; if (!Wd) throw new Error(`${id}: no words for ${L}`);
      const S = systemOf(L), mark = !!(ctx && (ctx.answerKey || ctx.screen || ctx.check));
      const box = (v, w = 54, h = 38) => `<span class="ws-answerbox"${mark && v != null ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;flex:0 0 auto;vertical-align:middle;width:${w}px;height:${h}px;box-sizing:border-box;border:2.5px dashed ${CORAL};border-radius:9px;background:#FFFFFF"></span>`;
      const step = d.halves && S.per === 4 ? 2 : 1;   // the easier English page stays on the wholes and halves
      // the lengths, in ticks: with a plot, ONE most frequent length (never an end of the data), 5 or 6 different lengths
      // (the item bank of the unit checks, ctx.check: seven DIFFERENT lengths of the level, no plot — seven, so that its
      // cards are never paired with the cards of the level's answer key, which has six or eight)
      const dl = ctx && ctx.check ? { ...d, n: 7, plot: false } : d;
      let ks;
      for (let t = 0; t < 600; t++) {
        // (a pencil that does not start at 0 starts one or two whole units in: it is at most the ruler less one unit long)
        const all = []; for (let k = S.lo + (dl.plot ? 1 : 0); k <= S.hi - (d.offset ? S.per : 0); k += step) all.push(k);
        // (2026-11-15, US teacher-reviewer: form A's pencil ended on a half inch, form B's on a quarter — the skill of the
        // lesson; a check page of the quarter-inch level ends every pencil on a quarter mark, ¼ or ¾: the six of a ruler)
        // (the harder page's pencils start further in and are shorter: there four quarters, and two halves to make six)
        if (ctx && ctx.check && !d.halves && S.per === 4) { const q = all.filter((k) => k % 2 === 1); ks = rng.shuffle(q.concat(rng.sample(all.filter((k) => k % 4 === 2), Math.max(0, 6 - q.length)))); break; }
        if (!dl.plot) { ks = rng.sample(all, dl.n); if (ks.filter((k) => k % S.per !== 0).length >= 3 && ks.some((k) => k % S.per === 0)) break; ks = null; continue; }
        const freq = rng.pick([[3, 2, 1, 1, 1], [3, 2, 2, 1], [3, 1, 1, 1, 1, 1]]);
        const pool = rng.sample(all, freq.length); ks = []; freq.forEach((f, i) => { for (let j = 0; j < f; j++) ks.push(pool[i]); });
        const mn = Math.min(...ks), mx = Math.max(...ks);
        if (pool[0] === mn || pool[0] === mx || mx - mn < S.per * 1.5 || ks.filter((k) => k % S.per !== 0).length < 4) { ks = null; continue; }
        ks = shuffle(ks, rng); break;
      }
      if (!ks) throw new Error(`${id}: no ${d.n} lengths`);
      // the ruler takes the card's width and the box stands under it (a child writes a mixed number in it)
      const big = d.n === 6, T = S.px / (S.units * S.per), PH = big ? 18 : 14, X0 = 9, bodies = shuffle([C.tealSoft, C.creamDeep, C.coralSoft], rng);
      // where a pencil of the harder page starts: at the 1, the 2 (or, on the longer centimeter ruler, the 3), mixed, so
      // that "the end number less one" is no rule of the page
      const starts = ks.map((k) => { if (!d.offset) return 0; const fits = [1, 2, 3].filter((u) => k + u * S.per <= S.units * S.per && (u < 3 || S.per === 2)); return S.per * rng.pick(fits); });
      if (d.offset && new Set(starts).size === 1) { const i = ks.findIndex((k) => k + (starts[0] / S.per === 1 ? 2 : 1) * S.per <= S.units * S.per); if (i >= 0) starts[i] = S.per * (starts[0] / S.per === 1 ? 2 : 1); }
      const cards = ks.map((k, i) => {
        const s0 = starts[i], W = S.units * S.per * T + 2 * X0;
        const pic = `<svg width="${W}" height="${PH + 6 + 32}" viewBox="0 0 ${W} ${PH + 6 + 32}" style="display:block;flex:0 0 auto" data-lcs-measure="${k}|${s0}">${pencil(X0 + s0 * T, 2, k * T, PH, bodies[i % 3])}${ruler(X0, PH + 6, S.units, S.per, T, d.halves && S.per === 4 ? 2 : S.per)}</svg>`;
        return `<div class="ws-card-stage" style="flex-direction:column;justify-content:center;align-items:center;gap:${big ? 10 : 4}px;padding:0 2px" data-lcs-len="${k}|${s0}">${pic}<span style="display:inline-flex;align-items:center;gap:5px;flex:0 0 auto">${box(S.key(k), big ? 92 : 78, big ? 46 : 36)}${WORD(S.unit, 16)}</span></div>`;
      });
      // the item bank of the unit checks (Part 7.6): each pencil over its ruler is a card of its own, its box carrying the
      // length (the line plot and its questions read the whole page's data: they stay on the worksheet)
      if (ctx && ctx.check) return { bodyHtml: checkGrid(cards, { cols: 2 }), meta: {} };
      let extra = '', stamp = '';
      if (d.plot) {
        const count = (v) => ks.filter((x) => x === v).length, mode1 = ks.slice().sort((a, b) => count(b) - count(a))[0];
        let K = S.lo; for (let t = 0; t < 200; t++) { K = rng.int(Math.min(...ks), Math.max(...ks) - 1); const c = ks.filter((x) => x > K).length; if (c >= 2 && c <= 6 && K % S.per !== 0 === (t < 100)) break; }
        const longer = ks.filter((x) => x > K).length;
        const PW = 640, PX0 = 34, n = S.hi - S.lo, st = (PW - 2 * PX0) / n, LY = 88;
        let s = `<line x1="${PX0 - 14}" y1="${LY}" x2="${PW - PX0 + 14}" y2="${LY}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
        for (let j = 0; j <= n; j++) {
          const k = S.lo + j, x = PX0 + j * st, whole = k % S.per === 0, half = S.per === 4 && k % 2 === 0;
          s += `<line x1="${x}" y1="${LY - (whole ? 10 : half ? 7 : 5)}" x2="${x}" y2="${LY + (whole ? 10 : half ? 7 : 5)}" stroke="${INK}" stroke-width="${whole ? 2.6 : 1.8}" data-lcs-ptick="${k}"/>`;
          s += `<text x="${x}" y="${LY + 30}" text-anchor="middle" font-family="'Baloo 2',cursive" font-weight="700" font-size="${whole ? 20 : 17}" fill="${whole ? INK : C.inkSoft}" data-lcs-plabel="${k}">${S.write(k)}</text>`;
          if (mark) for (let q = 0; q < count(k); q++) s += `<path d="M${x - 6} ${LY - 18 - q * 20} l12 -12 m0 12 l-12 -12" stroke="${CORAL}" stroke-width="3" stroke-linecap="round" data-lcs-key-sample="1"/>`;
        }
        s += `<text x="${PW / 2}" y="${LY + 54}" text-anchor="middle" font-family="'Nunito',sans-serif" font-weight="800" font-size="15" fill="${TEAL}">${Wd.length} (${S.unit})</text>`;
        const q = (text, v, withUnit, tag) => `<div style="display:flex;align-items:center;gap:8px;flex-wrap:nowrap" data-lcs-q="${tag}"><span style="flex:1 1 auto;min-width:0">${WORD(text, 17)}</span>${box(v, 64, 38)}${withUnit ? WORD(S.unit, 16) : '<span style="width:24px"></span>'}</div>`;
        extra = `<section class="ws-card" style="flex:0 0 auto;margin-top:12px" data-lcs-plotcard><div class="ws-card-stage" style="flex-direction:column;align-items:center;gap:4px;padding:2px 16px 8px" data-lcs-plot="${S.lo}|${S.hi}"><svg width="${PW}" height="${LY + 60}" viewBox="0 0 ${PW} ${LY + 60}" style="display:block;flex:0 0 auto">${s}</svg>` +
          `<div style="align-self:stretch;display:flex;flex-direction:column;gap:6px" data-lcs-plotq="${[S.key(mode1), longer, K].join('|')}">${q(Wd.most, S.key(mode1), true, 'most')}${q(Wd.longer.replace('{K}', S.write(K)).replace('{U}', S.unitLong), longer, false, 'longer')}</div></div></section>`;
        stamp = ` data-lcs-mode1="${mode1}"`;
      }
      const grid = cardGrid({ cards, cols: 2, rows: Math.ceil(cards.length / 2) });
      return { bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-rl="${mode}|${lv}|${S.unit === 'cm' ? 'cm' : 'in'}|${S.per}" data-lcs-lang="${L}"${stamp}><div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column">${grid}</div>${extra}</div>`, meta: { items: ks.map((k, i) => k + '@' + starts[i]) } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-rl]');
        if (!root) return ['no page'];
        const [, lv, unit, perS] = root.dataset.lcsRl.split('|'), per = +perS, units = unit === 'in' ? 4 : 8;
        const rectOf = (e) => e.getBoundingClientRect();
        document.querySelectorAll('.ws-card').forEach((c, i) => { const cb = rectOf(c); c.querySelectorAll('svg, .ws-answerbox, [data-lcs-q] > span').forEach((e) => { const r = rectOf(e); if (r.width && (r.left < cb.left + 1 || r.right > cb.right - 1 || r.top < cb.top - 1 || r.bottom > cb.bottom + 1)) fails.push(`card ${i + 1}: something leaves the card`); }); });
        const cards = [...document.querySelectorAll('[data-lcs-len]')], ks = [], starts = [];
        cards.forEach((c, i) => {
          const P = 'pencil ' + (i + 1), [k, s0] = c.dataset.lcsLen.split('|').map(Number); ks.push(k);
          const ticks = [...c.querySelectorAll('[data-lcs-rtick]')], at = (n) => { const t = ticks.find((e) => +e.dataset.lcsRtick === n); return t ? rectOf(t).left + rectOf(t).width / 2 : null; };
          const pr = rectOf(c.querySelector('[data-lcs-pencil]'));
          if (at(0) == null || at(units * per) == null) { fails.push(`${P}: the ruler has no 0 or no last mark`); return; }
          const T = (at(units * per) - at(0)) / (units * per);
          // the pencil lies between the marks its length says, measured on the page
          if (Math.abs(pr.left - (at(0) + s0 * T)) > 1.6 || Math.abs(pr.right - (at(0) + (s0 + k) * T)) > 1.6) fails.push(`${P}: drawn from ${((pr.left - at(0)) / T).toFixed(2)} to ${((pr.right - at(0)) / T).toFixed(2)} marks, stamped ${s0} to ${s0 + k}`);
          if (s0 + k > units * per) fails.push(`${P}: runs past the ruler`);
          if ((lv === '3') !== (s0 > 0)) fails.push(`${P}: starts at ${s0} marks on level ${lv}`);
          if (lv === '3' && s0 % per !== 0) fails.push(`${P}: starts between two whole marks`);
          starts.push(s0);
          // the mark the pencil ends at is drawn on the ruler
          if (at(s0 + k) == null) fails.push(`${P}: ends where the ruler has no mark`);
          if (lv === '1' && unit === 'in' && k % 2) fails.push(`${P}: a quarter inch on the easier page`);
          if (T < 9) fails.push(`${P}: the marks stand ${T.toFixed(1)} px apart`);
          if (c.querySelectorAll('.ws-answerbox').length !== 1) fails.push(`${P}: one box`);
          if (pr.bottom > rectOf(c.querySelector('[data-lcs-ruler]')).top + 1) fails.push(`${P}: the pencil lies on the ruler's marks`);
        });
        if (cards.length !== (lv === '1' ? 6 : 8)) fails.push(cards.length + ' pencils');
        if (lv === '3' && new Set(starts).size < 2) fails.push('every pencil of the harder page starts at the same mark');
        // the centimeter ruler is a real one: 8 cm are 8 cm on the printed page (96 px to the inch)
        if (unit === 'cm') { const r = document.querySelector('[data-lcs-rtick="0"]'), e = document.querySelector(`[data-lcs-rtick="${units * per}"]`); const w = rectOf(e).left - rectOf(r).left; if (Math.abs(w - 8 * 96 / 2.54) > 1.5) fails.push(`the centimeter ruler is ${(w / 96 * 2.54).toFixed(2)} cm long`); }
        document.querySelectorAll('[data-lcs-len] .ws-answerbox').forEach((b, i) => { const r = rectOf(b); if (r.width < 70 || r.height < 34) fails.push(`pencil ${i + 1}: a box of ${Math.round(r.width)} by ${Math.round(r.height)} px is small for a mixed number`); });
        if (ks.filter((k) => k % per !== 0).length < 3) fails.push('fewer than three lengths between the whole marks');
        const plot = document.querySelector('[data-lcs-plot]');
        if (!!plot !== (lv !== '1')) fails.push('the plot stands on levels 2 and 3 only');
        if (plot) {
          const [lo, hi] = plot.dataset.lcsPlot.split('|').map(Number), pt = [...plot.querySelectorAll('[data-lcs-ptick]')];
          // a half is printed as the country's Grade 3 writes it (the rule is written out here a second time on purpose)
          const lang = root.dataset.lcsLang, halves = [...plot.querySelectorAll('[data-lcs-plabel]')].filter((e) => +e.dataset.lcsPlabel % per !== 0).map((e) => e.textContent);
          const want = lang === 'en' ? /^\d?[¼½¾]$/ : ['es', 'pt', 'it', 'no', 'fi'].includes(lang) ? /^\d½$/ : ['de', 'nl', 'sv', 'da'].includes(lang) ? /^\d,5$/ : null;
          if (!want) fails.push('the page is not made for ' + lang); else if (halves.some((t) => !want.test(t))) fails.push('a length between the whole marks is printed as ' + halves.find((t) => !want.test(t)) + ' in ' + lang);
          if (halves.length && plot.querySelector('[data-lcs-q="longer"]').textContent.includes('.5')) fails.push('a decimal point in the question');
          if (pt.length !== hi - lo + 1) fails.push(pt.length + ' ticks on the plot');
          if (ks.some((k) => k < lo || k > hi)) fails.push('a length off the plot');
          const xs = pt.map((e) => rectOf(e).left); for (let j = 2; j < xs.length; j++) if (Math.abs((xs[j] - xs[j - 1]) - (xs[1] - xs[0])) > 0.6) { fails.push('the ticks of the plot are not evenly spaced'); break; }
          const labels = [...plot.querySelectorAll('[data-lcs-plabel]')].map(rectOf); for (let j = 1; j < labels.length; j++) if (labels[j].left < labels[j - 1].right + 1) { fails.push('two labels of the plot touch'); break; }
          const cnt = (v) => ks.filter((x) => x === v).length, top = Math.max(...ks.map(cnt)), modes = [...new Set(ks)].filter((v) => cnt(v) === top);
          const [most, longer, K] = plot.querySelector('[data-lcs-plotq]').dataset.lcsPlotq.split('|');
          if (modes.length !== 1 || top > 4) fails.push('not one most common length (or more than four Xs on a tick)');
          if (String(modes[0]) !== root.dataset.lcsMode1) fails.push('the most common length is not the stamped one');
          if (modes[0] === Math.min(...ks) || modes[0] === Math.max(...ks)) fails.push('the most common length is an end of the data');
          if (ks.filter((x) => x > +K).length !== +longer || +longer < 2) fails.push(`longer than mark ${K} is not ${longer}`);
          if (!most) fails.push('no answer for the most common length');
          const qs = [...plot.querySelectorAll('[data-lcs-q]')];
          if (qs.length !== 2 || qs.some((e) => e.querySelectorAll('.ws-answerbox').length !== 1 || /\{[KU]\}/.test(e.textContent))) fails.push('two questions with one box each');
        }
        return fails;
      });
    },
  };
}

module.exports = { makeRulerLengthsType, LEVELS, systemOf };
