/**
 * money-more.js — the new templates of the Money maker (NEW-TEMPLATES §14, 2026-11-01). Coins are the stylised tokens of
 * primitives/coins.js (never replicas — ENGINES [money-Q1]); notes are flat stylised rectangles with their value; the
 * denominations are data/money/currencies.js (es-MX whole pesos, pt-BR centavos, € with/without 1-2 c, kr); a written
 * amount goes through lib/money-format.js only. Six modes:
 *
 *   name   T3 · K-461  Which coin is it? — draw a line from each coin to its value. L1 value + unit ("25 ¢") · L2 the
 *          value in words ("twenty-five cents") · L3 words, every coin of the set (up to 6). 1.MD readiness, 2.MD.C.8.
 *   fewest T2 · G2-471 Fewest coins — how many of each coin make the amount with as few coins as possible. Each card
 *          lists the coins to use; the fewest way is unique, is the largest-first way children use, and uses every
 *          listed coin (no answer is 0). L1 2-3 kinds · L2 the whole set, at most 4 coins in all · L3 the whole set. Each page is
 *          picked so its answers stay balanced (no "always 1"). 2.MD.C.8.
 *   pay    T1 · G2-472 Make the amount — circle coins from the tray that pay the price exactly; ANY coins that make it
 *          are right (the screen grades the sum). L1 small prices, 3 kinds, 8 coins · L2 the full range, 10 coins ·
 *          L3 draw the coins (paper). 2.MD.C.8.
 *   same   T4 · G2-473 Same amount, different coins — L1/L2 draw a line between purses that hold the same amount (the
 *          two never hold as many coins) · L3 two purses per row: = or ≠. 2.MD.C.8, BNCC EF02MA20.
 *   notes  T5 · G3-474 Count notes and coins — the total of notes and coins, written the way the country writes money
 *          (lib/money-format.js: $17.36 · 17,36 € · € 17,36 · R$ 17,36 · 85 kr). L1 one note + coins, the format shown
 *          · L2 two notes · L3 three notes. 2.MD.C.8, 3.NBT in money.
 *   shop   T6 · G1-473 Shop price tags and play money to cut out (material, no key) — tags with the theme's pictures
 *          and prices any coin set can pay; a strip of play coins and notes. L1 prices in coins only · L2 up to 5 whole
 *          units · L3 up to 20.
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { coin, coinRow, sizeFor, mmOf } = require('../../primitives/coins.js');
const { CURRENCIES, NOTES } = require('../../data/money/currencies.js');
const { formatMoney, amountNumber, fmtOf } = require('../../lib/money-format.js');
const { COIN_WORDS } = require('../../data/money/coin-words.js');

const INK = '#3A3530', TEAL = '#146B5E', CORAL = '#F2784B', CREAM = '#FBF3E4', GRID = '#C8BFAE';
const NB = ' ';
const BIG = (s, px = 30, color = INK) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;line-height:1;color:${color};white-space:nowrap">${s}</span>`;

const LEVELS = {
  name: { 1: { pairs: 4, words: false }, 2: { pairs: 4, words: true }, 3: { pairs: 6, words: true } },
  // level 2 (2026-11-01): any amount whose fewest way needs at most 4 coins — "small amounts" (60 % of the range) left a 4-coin
  // system (fi / nl / pt-BR: 5 10 20 50) with almost only 1s to write (54 % of the boxes, settings-space)
  fewest: { 1: { kinds: 3, cards: 4, full: false }, 2: { full: true, top: 1, maxCoins: 4, cards: 4 }, 3: { full: true, top: 1, cards: 4 } },
  pay: { 1: { kinds: 3, tray: 8, cards: 4, top: 0.5, draw: false }, 2: { kinds: 99, tray: 10, cards: 4, top: 1, draw: false }, 3: { kinds: 99, tray: 0, cards: 4, top: 1, draw: true } },
  same: { 1: { pairs: 3, top: 0.5 }, 2: { pairs: 4, top: 1 }, 3: { rows: 5, top: 1 } },
  notes: { 1: { notes: 1, coins: [2, 3], cards: 4, hint: true }, 2: { notes: 2, coins: [2, 4], cards: 4, hint: false }, 3: { notes: 3, coins: [3, 5], cards: 4, hint: false } },
  shop: { 1: { tags: 12, upTo: 0 }, 2: { tags: 12, upTo: 5 }, 3: { tags: 12, upTo: 20 } },
};

const loc2 = (locale) => String(locale || 'en').slice(0, 2);
const curOf = (locale) => { const c = CURRENCIES[loc2(locale)]; if (!c) throw new Error('money-more: no currency for ' + locale); return c; };
const sum = (a) => a.reduce((s, x) => s + x, 0);
/** the amount as the child reads it on a coin page: "47 ¢", "35 ct", "4 kr" (smallest unit, the G1 convention) */
const subAmount = (n, cur) => `${n}${NB}${cur.unit}`;

/** fewest coins: every way to make `amount` from `vals` (counts), the minimum count, and how many ways reach it */
function fewestWays(amount, vals) {
  const best = { n: Infinity, ways: [] };
  const rec = (i, left, counts) => {
    if (left === 0) { const n = sum(counts); if (n < best.n) { best.n = n; best.ways = [counts.slice()]; } else if (n === best.n) best.ways.push(counts.slice()); return; }
    if (i === vals.length) return;
    for (let k = Math.floor(left / vals[i]); k >= 0; k--) { counts[i] = k; rec(i + 1, left - k * vals[i], counts); }
    counts[i] = 0;
  };
  rec(0, amount, vals.map(() => 0));
  return best;
}
/** largest-first: the way children make change */
function greedy(amount, vals) { let left = amount; return vals.map((v) => { const k = Math.floor(left / v); left -= k * v; return k; }).concat([left]); }

/** a flat stylised note (never a replica): value + sign, size by value rank */
function note(value, locale, { w = 96, h = 50 } = {}) {
  const f = fmtOf(locale), whole = f.cents ? value / 100 : value;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="note ${whole}" data-lcs-prim="note" data-lcs-value="${value}">` +
    `<rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" rx="6" fill="${CREAM}" stroke="${TEAL}" stroke-width="2.5"/>` +
    `<rect x="7" y="7" width="${w - 14}" height="${h - 14}" rx="4" fill="none" stroke="${TEAL}" stroke-width="1" stroke-dasharray="3 3"/>` +
    `<text x="${w / 2}" y="${h / 2}" font-family="Baloo 2" font-size="${Math.round(h * 0.46)}" font-weight="700" fill="${INK}" text-anchor="middle" dominant-baseline="central">${f.pre ? f.sym + f.gap + whole : whole + f.gap + f.sym}</text></svg>`;
}

/**
 * a coin's diameter in px, from the real diameters of the whole set (so a coin is the same size on every card). `L` given:
 * the strip also holds the set's whole-unit coins (€1 / €2, R$ 1), which count in the proportions — the €1 coin is SMALLER
 * than the 50-cent coin (23.25 mm against 24.25 mm), the €2 coin the largest
 */
function coinD(v, cur, minPx, maxPx, L) {
  const whole = L ? WHOLE_COINS[L] || [] : [];
  const cents = mmOf(cur.sub);
  return sizeFor(v, cur.sub.map((x) => x.v).concat(whole), { minPx, maxPx, mm: cents && Object.assign({}, cents, whole.length ? WHOLE_MM[L] : {}) });
}
/** one coin token at a size from the whole set; `L` = sized among the set's whole-unit coins too (a mixed strip) */
const coinSvg = (v, cur, minPx, maxPx, extra = '', L = null) => {
  const all = cur.sub.map((x) => x.v), tint = (cur.sub.find((x) => x.v === v) || {}).tint || 'silver';
  const topTwo = [...new Set(all)].sort((a, b) => b - a).slice(0, 2);
  const s = coin({ value: v, tint, d: coinD(v, cur, minPx, maxPx, L), doubleRing: topTwo.includes(v) }).svg;
  return extra ? s.replace('<svg ', '<svg ' + extra + ' ') : s;
};

/**
 * a cent coin beside notes says what it is worth: its unit under the numeral (de "20 ct" beside a "20 €" note). Whole-unit
 * sets (es-MX pesos, kr) need none — coins and notes count in the same unit. Native-checked marks.
 */
// pt-BR "centavos" as on the coins themselves (reviewer 2026-11-01: "c" is not a Brazilian convention)
const COIN_MARK = { en: '¢', de: 'ct', fr: 'c', it: 'cent', nl: 'ct', fi: 'snt', pt: 'centavos' };
/** the whole-unit coins children handle most, beside notes (€1 / €2, R$ 1): in the set's smallest unit (cents) */
const WHOLE_COINS = { de: [100, 200], fr: [100, 200], it: [100, 200], nl: [100, 200], fi: [100, 200], pt: [100] };
/** their real diameters (mm): €1 23.25, €2 25.75, R$ 1 27 */
const EURO_WHOLE_MM = { 100: 23.25, 200: 25.75 };
const WHOLE_MM = { de: EURO_WHOLE_MM, fr: EURO_WHOLE_MM, it: EURO_WHOLE_MM, nl: EURO_WHOLE_MM, fi: EURO_WHOLE_MM, pt: { 100: 27 } };
/** `mixed`: the coin sits in a strip with the whole-unit coins, so it is sized among them */
function markedCoin(v, cur, L, minPx, maxPx, mixed = false) {
  const s = coinSvg(v, cur, minPx, maxPx, '', mixed ? L : null), mark = L === 'pt' && v === 1 ? 'centavo' : COIN_MARK[L];   // pt-BR "1 centavo", singular
  if (!mark || cur.whole) return s;
  const d = Number((/width="([\d.]+)"/.exec(s) || [])[1]);
  return withMark(s, d, mark);
}
/** a numeral + a small unit under it, inside the coin: a long mark ("centavos") gets a smaller size so it stays inside */
function withMark(s, d, mark) {
  // a long mark (pt-BR "centavos") does not fit inside a small coin: it is printed UNDER the coin, the numeral stays
  if ([...mark].length > 4) {
    const H = d + 16;
    return s.replace(/height="([\d.]+)"/, `height="${H}" overflow="visible" style="overflow:visible;margin:0 6px"`).replace(/viewBox="0 0 ([\d.]+) ([\d.]+)"/, `viewBox="0 0 $1 ${H}"`)
      .replace('</svg>', `<text x="${d / 2}" y="${d + 9}" font-family="Baloo 2" font-size="12" font-weight="700" fill="${INK}" text-anchor="middle" dominant-baseline="central">${mark}</text></svg>`);
  }
  const fsMark = Math.max(9, Math.min(Math.round(d * 0.22), Math.floor((d * 0.78) / (0.56 * [...mark].length))));
  return s.replace(/(<text[^>]*?) y="([\d.]+)"([^>]*?) font-size="(\d+)"/, (all, a, y, b, fs) => `${a} y="${(+y - d * 0.11).toFixed(1)}"${b} font-size="${Math.round(fs * 0.86)}"`)
    .replace('</svg>', `<text x="${d / 2}" y="${(d / 2 + d * 0.26).toFixed(1)}" font-family="Baloo 2" font-size="${fsMark}" font-weight="700" fill="${INK}" text-anchor="middle" dominant-baseline="central">${mark}</text></svg>`);
}

/**
 * a whole-unit coin (€1, €2, R$ 1) beside cent coins and notes: its numeral in units and the currency sign under it,
 * a size above every cent coin; data-lcs-value stays in cents (the page's sums are in one unit)
 */
function wholeCoin(v, L, d) {
  const f = fmtOf(L);
  const s = coin({ value: v / 100, tint: 'gold', d, doubleRing: true }).svg.replace(`data-lcs-value="${v / 100}"`, `data-lcs-value="${v}"`);
  return withMark(s, d, f.sym);
}
/** the coins a notes / store page draws from: the cent coins (+ the whole-unit coins of the € / R$ sets) */
const notesCoins = (vals, L) => vals.concat(WHOLE_COINS[L] || []).sort((a, b) => b - a);
const anyCoin = (v, cur, L, minPx, maxPx) => (v >= 100 && (WHOLE_COINS[L] || []).includes(v) ? wholeCoin(v, L, coinD(v, cur, minPx, maxPx, L)) : markedCoin(v, cur, L, minPx, maxPx, true));

function makeMoneyMoreType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand,
    assetClass: mode === 'shop' ? 'picture-cards' : 'icon-placement',
    exerciseType: 'money',
    themeAxis: { applicable: mode === 'shop', ...(mode === 'shop' ? { minNouns: 12 } : {}) },
    difficulty: LEVELS[mode],
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const d = this.difficulty[args.difficulty];
      const rng = ctx.rng, locale = args.locale, L = loc2(locale);
      const key = !!(ctx && ctx.answerKey), scr = !!(ctx && ctx.screen);
      const cur = curOf(locale);
      const vals = cur.sub.map((x) => x.v).sort((a, b) => b - a);   // largest first
      const content = (inner, extra = '') => `<div data-ws-content data-lcs-money-mode="${mode}"${extra} style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${inner}</div>`;
      const shuffle = (a) => rng.shuffle(a.slice());

      if (mode === 'name') {
        // the coin carries its unit when the labels are NAMES ("25 ¢" → quarter); beside amount labels it shows the bare
        // numeral, so the line joins "25" to "25 ¢" (the unit is read), never two identical strings
        // coins of the set, smallest first in the set; the labels in a different order (never the coins' order)
        const coins = vals.slice().reverse().slice(0, d.pairs);
        if (coins.length < 3) throw new Error(`${id}: the ${cur.code} set has ${coins.length} coins`);
        const words = COIN_WORDS[L];
        if (d.words && (!words || coins.some((v) => !words[v]))) throw new Error(`${id}: no coin words for ${L}`);
        const label = (v) => (d.words ? words[v] : subAmount(v, cur));
        const left = shuffle(coins);
        let right = shuffle(coins);
        for (let g = 0; g < 20 && right.some((v, i) => v === left[i]); g++) right = shuffle(coins);   // no straight line across
        const rowH = coins.length > 4 ? 92 : 120;
        const rows = left.map((v, i) => {
          const r = right[i];
          return `<div style="display:flex;align-items:center;justify-content:space-between;height:${rowH}px;padding:0 24px">` +
            `<span style="display:inline-flex;align-items:center;gap:12px"${scr || key ? ` data-lcs-pair="${v}"` : ''} data-lcs-coin="${v}" data-lcs-label="${v}">${d.words ? markedCoin(v, cur, L, 54, 82) : coinSvg(v, cur, 54, 82)}<span style="width:14px;height:14px;border-radius:50%;background:${INK}"></span></span>` +
            `<span style="display:inline-flex;align-items:center;gap:12px"${scr || key ? ` data-lcs-key-badge="${r}"` : ''} data-lcs-value-label="${r}" data-lcs-label="${label(r)}"><span style="width:14px;height:14px;border-radius:50%;background:${INK}"></span><span style="min-width:${d.words ? 250 : 120}px;padding:10px 16px;border:2.5px solid ${TEAL};border-radius:14px;background:#FFFFFF;text-align:center;font-family:'Baloo 2';font-weight:700;font-size:${d.words ? 26 : 34}px;color:${INK}">${label(r)}</span></span></div>`;
        });
        return { bodyHtml: content(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly">${rows.join('')}</div>`), meta: { items: left.map((v) => v + '>' + right.indexOf(v)) } };
      }

      if (mode === 'fewest') {
        // a card: the amount, the coins to use (largest first) and a box under each for how many
        // every (coins, amount) a card may ask: each listed coin used at least once (no answer is 0), the largest-first way
        // the ONLY fewest way, at most 4 of a coin. A set too small to give the page different amounts at the level's
        // size (pt-BR: all four coins make only 90) lists one coin fewer — the level never asks the impossible.
        const subsets = (arr, k) => (k === 0 ? [[]] : arr.flatMap((v, i) => subsets(arr.slice(i + 1), k - 1).map((s) => [v].concat(s))));
        const candidatesFor = (k) => {
          const out = [];
          for (const set of subsets(vals, k)) for (let amount = 1; amount <= cur.subMax; amount++) {
            const g = greedy(amount, set);
            if (g[g.length - 1] !== 0 || g.slice(0, -1).some((n) => n < 1 || n > 4)) continue;
            const w = fewestWays(amount, set);
            if (w.ways.length !== 1 || w.ways[0].some((n, i) => n !== g[i])) continue;
            out.push({ set, counts: g.slice(0, -1), amount });
          }
          return out;
        };
        // levels 2-3 (native + pedagogy review 2026-11-01): the WHOLE coin set on every card — which coins to use is the
        // decision the skill is about; a coin the fewest way does not need keeps an empty box (never a 0 to write).
        // Every box of such a card is optional on the screen, so no box tells which coins are needed.
        const fullCandidates = () => {
          const out = [], top = Math.floor(cur.subMax * d.top);
          for (let amount = 1; amount <= top; amount++) {
            const g = greedy(amount, vals);
            if (g[g.length - 1] !== 0) continue;
            const counts = g.slice(0, -1);
            if (counts.some((n) => n > 4) || counts.filter((n) => n > 0).length < 2) continue;
            if (d.maxCoins && counts.reduce((a, b) => a + b, 0) > d.maxCoins) continue;
            const w = fewestWays(amount, vals);
            if (w.ways.length !== 1 || w.ways[0].some((n, i) => n !== counts[i])) continue;
            // a coin worth more than the amount is never part of any way: it is not shown (an always-empty box is a free
            // answer, and "leave it empty" scored 43-50 % of the boxes, settings-space 2026-11-01)
            const keep = vals.map((v) => v <= amount);
            out.push({ set: vals.filter((v, j) => keep[j]), counts: counts.filter((n, j) => keep[j]), amount });
          }
          return out;
        };
        let cands;
        if (d.full) cands = fullCandidates();
        else {
          let k = Math.min(d.kinds, vals.length); cands = candidatesFor(k); while (k > 2 && new Set(cands.map((x) => x.amount)).size < d.cards) cands = candidatesFor(--k);
          // … and cards of one coin kind fewer beside them: in a 1-2-5 coin system the fewest way with three kinds has at most
          // one box that is not 1 (5 c + 10 c + 20 c: never two 10 c, never two 5 c), so "write 1 everywhere" solved 82 % of a
          // level-1 page (settings-space 2026-11-01); two kinds give counts that really vary (20 c × 3 + 5 c × 2)
          if (k > 2) cands = cands.concat(candidatesFor(k - 1));
        }
        const cards = [], items = [], amounts = new Set();
        const pool = rng.shuffle(cands);
        // the page's answers stay balanced: each card is the one of the next 60 in the shuffled pool that keeps the most
        // frequent answer rarest and the fewest boxes equal to the box before ("always 1", "leave it empty" and "the same as
        // before" scored 35-82 % of the boxes, settings-space 2026-11-01); ties go to the pool's own order, so pages still differ
        const boxAnswers = (x) => x.counts.map((n) => (n > 0 ? String(n) : ''));
        const spread = (arr) => {
          const fq = {}; let same = 0;
          arr.forEach((a, j) => { fq[a] = (fq[a] || 0) + 1; if (j > 0 && arr[j - 1] === a) same++; });
          return Math.max(...Object.values(fq)) / arr.length + 0.5 * same / Math.max(1, arr.length - 1);
        };
        const onPage = [];
        for (let c = 0; c < d.cards; c++) {
          let done = null, best = Infinity, seen = 0;
          for (const x of pool) {
            if (amounts.has(x.amount)) continue;
            const sc = spread(onPage.concat(boxAnswers(x)));
            if (sc < best - 1e-9) { best = sc; done = x; }
            if (++seen >= 60) break;
          }
          if (done) onPage.push(...boxAnswers(done));
          if (!done) throw new Error(`${id}: level ${args.difficulty} cannot draw ${d.cards} amounts for ${cur.code}`);
          amounts.add(done.amount);
          items.push(done.amount + ':' + done.set.join('/'));
          const box = (n) => { const b = answerBox({ w: 54, h: 46, answer: n > 0 ? n : '' }); return d.full ? b.replace('class="ws-answerbox"', 'class="ws-answerbox" data-lcs-optional="1"') : b; };
          const cols = done.set.map((v, i) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:8px">${coinSvg(v, cur, 44, 64)}${box(done.counts[i])}</span>`).join('');
          cards.push(`<div class="ws-card-stage" style="justify-content:space-between;align-items:center;gap:14px;padding:4px 18px 4px 44px" data-lcs-amount="${done.amount}" data-lcs-set="${done.set.join(',')}">` +
            `${BIG(subAmount(done.amount, cur), 34)}<span style="display:inline-flex;align-items:flex-end;gap:14px">${cols}</span></div>`);
        }
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items } };
      }

      if (mode === 'pay') {
        const kinds = vals.slice().reverse().slice(0, Math.min(d.kinds, vals.length));   // the smallest kinds at L1
        const top = Math.max(kinds[kinds.length - 1] * 3, Math.floor(cur.subMax * d.top / kinds[0]) * kinds[0]);
        const cards = [], items = [], prices = new Set();
        for (let c = 0; c < d.cards; c++) {
          let done = null;
          for (let t = 0; t < 800 && !done; t++) {
            // the solution: 2-5 coins, never a single coin that is the price
            const n = rng.int(2, d.draw ? 5 : 4);
            const sol = Array.from({ length: n }, () => rng.pick(kinds));
            const price = sum(sol);
            if (price > top || prices.has(price) || kinds.includes(price)) continue;
            if (d.draw) { done = { price, sol, tray: [] }; break; }
            const decoys = Array.from({ length: d.tray - n }, () => rng.pick(kinds));
            // decoys alone, and the whole tray, never make the price (a wrong pick must be able to be wrong)
            if (sum(decoys) === price || sum(decoys) + price === price) continue;
            done = { price, sol, tray: shuffle(sol.map((v) => ({ v, sol: true })).concat(decoys.map((v) => ({ v, sol: false })))) };
          }
          if (!done) throw new Error(`${id}: level ${args.difficulty} cannot draw ${d.cards} prices for ${cur.code}`);
          prices.add(done.price);
          items.push(done.price + ':' + done.sol.slice().sort((a, b) => b - a).join('+'));
          const tag = `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:120px;padding:8px 14px;border:3px solid ${CORAL};border-radius:12px;background:#FFFFFF">${BIG(subAmount(done.price, cur), 32)}</span>`;
          let right;
          if (d.draw) {
            right = `<span style="width:400px;height:96px;border:2.5px dashed ${GRID};border-radius:14px;display:inline-block"${key ? ' data-lcs-key-sample="1"' : ''}>` +
              (key ? `<span style="display:flex;align-items:center;justify-content:center;gap:6px;height:100%">${done.sol.slice().sort((a, b) => b - a).map((v) => coinSvg(v, cur, 40, 56)).join('')}</span>` : '') + `</span>`;
          } else {
            const trayHtml = done.tray.map((x) => coinSvg(x.v, cur, 40, 58, (scr ? 'data-lcs-pick="1" ' : '') + ((scr || key) && x.sol ? 'data-lcs-key-ring="1" ' : '') + `data-lcs-coin="${x.v}"`)).join('');
            right = `<span style="display:inline-flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;max-width:440px"${scr ? ` data-lcs-sum="${done.price}"` : ''}>${trayHtml}</span>`;
          }
          cards.push(`<div class="ws-card-stage" style="justify-content:space-between;align-items:center;gap:14px;padding:4px 14px 4px 44px" data-lcs-price="${done.price}">${tag}${right}</div>`);
        }
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items } };
      }

      if (mode === 'same') {
        const kinds = vals.slice().reverse();
        const top = Math.floor(cur.subMax * d.top);
        // a purse: a multiset of coins (largest first), drawn for an amount
        const purseFor = (amount, notCount) => {
          for (let t = 0; t < 300; t++) {
            const coins = []; let left = amount;
            while (left > 0) { const ok = kinds.filter((v) => v <= left); const v = rng.pick(ok); coins.push(v); left -= v; }
            if (coins.length < 2 || coins.length > 7 || coins.length === notCount) continue;
            return coins.sort((a, b) => b - a);
          }
          return null;
        };
        const purseHtml = (coins, extra = '') => `<span style="display:inline-flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;max-width:250px;min-height:84px;padding:8px 10px;border:2.5px solid ${TEAL};border-radius:18px;background:#FFFFFF"${extra}>${coins.map((v) => coinSvg(v, cur, 34, 50)).join('')}</span>`;
        if (d.rows) {
          // L3: two purses per row, = or ≠ (half the rows equal, from a shuffled bag; an unequal pair differs by one coin's worth)
          const bag = shuffle(Array.from({ length: d.rows }, (_, i) => i % 2 === 0));
          const rows = [], items = [], seen = new Set();
          for (let r = 0; r < d.rows; r++) {
            let done = null;
            for (let t = 0; t < 400 && !done; t++) {
              const a = rng.int(kinds[1] * 2, top), A = purseFor(a, -1);
              if (!A || seen.has(a)) continue;
              const b = bag[r] ? a : a + rng.pick([-1, 1]) * rng.pick(kinds.filter((v) => v < a));
              if (b < 2 || b > top) continue;
              const B = purseFor(b, A.length);
              if (!B) continue;
              done = { a, b, A, B };
            }
            if (!done) throw new Error(`${id}: cannot draw ${d.rows} purse rows for ${cur.code}`);
            seen.add(done.a);
            const eq = done.a === done.b;
            items.push(done.a + (eq ? '=' : '≠') + done.b);
            const chip = (s, right) => `<span class="ws-chip" style="width:60px;height:60px;font-size:34px" data-lcs-choice="${s}"${right ? ' data-lcs-correct="1"' : ''}>${s}</span>`;
            rows.push(`<div class="ws-card-stage" style="justify-content:space-between;align-items:center;gap:12px;padding:4px 14px 4px 44px" data-lcs-a="${done.a}" data-lcs-b="${done.b}">${purseHtml(done.A)}<span class="ws-choices" style="display:inline-flex;gap:12px">${chip('=', eq)}${chip('≠', !eq)}</span>${purseHtml(done.B)}</div>`);
          }
          return { bodyHtml: content(cardGrid({ cards: rows, cols: 1, rows: d.rows })), meta: { items } };
        }
        // L1/L2: pairs of purses with the same amount, never the same number of coins; amounts all different
        const amounts = [], pairs = [];
        for (let p = 0; p < d.pairs; p++) {
          let done = null;
          for (let t = 0; t < 400 && !done; t++) {
            const a = rng.int(Math.max(kinds[1] * 2, 4), top);
            if (amounts.some((x) => Math.abs(x - a) < 2)) continue;
            const A = purseFor(a, -1); if (!A) continue;
            const B = purseFor(a, A.length); if (!B) continue;
            done = { a, A, B };
          }
          if (!done) throw new Error(`${id}: cannot draw ${d.pairs} purse pairs for ${cur.code}`);
          amounts.push(done.a); pairs.push(done);
        }
        const leftOrder = shuffle(pairs.map((_, i) => i));
        let rightOrder = shuffle(pairs.map((_, i) => i));
        for (let g = 0; g < 20 && rightOrder.some((v, i) => v === leftOrder[i]); g++) rightOrder = shuffle(pairs.map((_, i) => i));
        // the right purses carry a letter (A, B, …): the key's badge on a left purse is the letter of its match
        const LET = 'ABCDEFGH';
        const letterOf = (pi) => LET[rightOrder.indexOf(pi)];
        const rows = leftOrder.map((li, k) => {
          const ri = rightOrder[k];
          return `<div style="display:flex;align-items:center;justify-content:space-between;padding:0 18px">` +
            `<span style="display:inline-flex;align-items:center;gap:10px"${scr || key ? ` data-lcs-key-badge="${letterOf(li)}"` : ''} data-lcs-purse="${pairs[li].a}">${purseHtml(pairs[li].A)}<span style="width:14px;height:14px;border-radius:50%;background:${INK}"></span></span>` +
            `<span style="display:inline-flex;align-items:center;gap:10px"${scr || key ? ` data-lcs-pair="${LET[k]}"` : ''} data-lcs-purse="${pairs[ri].a}"><span style="width:14px;height:14px;border-radius:50%;background:${INK}"></span>${purseHtml(pairs[ri].B)}${BIG(LET[k], 26, TEAL)}</span></div>`;
        });
        return { bodyHtml: content(`<div style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly">${rows.join('')}</div>`), meta: { items: amounts.map(String) } };
      }

      if (mode === 'notes') {
        const f = fmtOf(locale);
        const notes = (NOTES[L] || []).slice().sort((a, b) => a - b);
        if (!notes.length) throw new Error(`${id}: no notes for ${L}`);
        const cards = [], items = [], totals = new Set();
        for (let c = 0; c < d.cards; c++) {
          let done = null;
          for (let t = 0; t < 500 && !done; t++) {
            const ns = Array.from({ length: d.notes }, () => rng.pick(notes)).sort((a, b) => b - a);
            const k = rng.int(d.coins[0], d.coins[1]);
            const cs = Array.from({ length: k }, () => rng.pick(notesCoins(vals, L))).sort((a, b) => b - a);
            const total = sum(ns) + sum(cs);
            // a cent total keeps cents (a whole amount would hide the decimal); up to 99.99 (4 digits on the screen pad)
            if (totals.has(total) || (f.cents && (total % 100 === 0 || total > 9999)) || (!f.cents && total > 999)) continue;
            done = { ns, cs, total };
          }
          if (!done) throw new Error(`${id}: level ${args.difficulty} cannot draw ${d.cards} totals for ${L}`);
          totals.add(done.total);
          items.push(String(done.total));
          const money = done.ns.map((v) => note(v, locale)).join('') + done.cs.map((v) => anyCoin(v, cur, L, 44, 62)).join('');
          const typed = amountNumber(done.total, locale);
          const box = answerBox({ w: 120, h: 50, answer: typed }).replace('class="ws-answerbox"', `class="ws-answerbox"${f.cents ? ` data-lcs-typed="${typed}" data-lcs-decimal="${f.sep}"` : ''}`);
          const boxed = f.pre ? BIG(f.sym, 28) + box : box + BIG(f.sym, 28);
          // the format hint (level 1) is the PATTERN — "$__.__", "__,__ €" — never an amount a child could copy
          const pat = '__' + f.sep + '__';
          const hint = d.hint && f.cents ? `<span style="font-family:'Nunito';font-weight:800;font-size:15px;color:#8A8276;letter-spacing:1px">${f.pre ? f.sym + f.gap + pat : pat + f.gap + f.sym}</span>` : '';
          cards.push(`<div class="ws-card-stage" style="justify-content:space-between;align-items:center;gap:12px;padding:4px 14px 4px 44px" data-lcs-total="${done.total}">` +
            `<span style="display:inline-flex;flex-wrap:wrap;align-items:center;gap:8px;max-width:440px">${money}</span>` +
            `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px"><span style="display:inline-flex;align-items:center;gap:6px">${boxed}</span>${hint}</span></div>`);
        }
        return { bodyHtml: content(cardGrid({ cards, cols: 1, rows: d.cards })), meta: { items } };
      }

      if (mode === 'shop') {
        const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
        // the teacher may swap a tag's picture (lib/slot.js: the random stream and the page are untouched)
        const pool = labelSafeNouns(args.theme);
        const nouns = require('../../lib/slot.js').pictures(ctx, rng.sample(pool, d.tags), pool, args.theme);
        const step = vals[vals.length - 1];   // every price can be paid exactly with the set's own coins
        const f = fmtOf(locale);
        const priceFor = () => {
          if (!d.upTo || !f.cents) {
            const hi = d.upTo && !f.cents ? d.upTo * (cur.whole ? 10 : 10) : cur.subMax;
            return rng.int(1, Math.floor(hi / step)) * step;
          }
          return rng.int(Math.ceil(10 / step), Math.floor(d.upTo * 100 / step)) * step;
        };
        const used = new Set();
        const tags = nouns.map((n, ti) => {
          let p = priceFor(), g = 0;
          while (used.has(p) && g++ < 50) p = priceFor();
          used.add(p);
          // levels 2-3 write every price the country's way ("R$ 0,80" beside "R$ 1,15", never "80 centavos"); level 1 keeps cents
          const label = f.cents && d.upTo ? formatMoney(p, locale) : subAmount(p, cur);
          return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:2px dashed ${GRID};border-radius:10px;padding:8px" data-lcs-tag="${p}"${require('../../lib/slot.js').attr(ctx, 'pic', ti)}>` +
            `<img class="ws-icon" src="${fileUri(args.theme, n.noun)}" alt="" style="width:96px;height:96px;object-fit:contain">` +
            `<span style="padding:4px 12px;border:2.5px solid ${CORAL};border-radius:10px;background:#FFFFFF">${BIG(label, 24)}</span></div>`;
        });
        const coinsStrip = (d.upTo ? notesCoins(vals, L) : vals).slice().reverse().map((v) => (d.upTo ? anyCoin(v, cur, L, 46, 66) : coinSvg(v, cur, 46, 66))).join('');
        const notesStrip = d.upTo ? (NOTES[L] || []).slice(0, 2).map((v) => note(v, locale, { w: 110, h: 56 })).join('') : '';
        const strip = `<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;padding:10px;border:2px dashed ${GRID};border-radius:10px" data-lcs-play-money>${coinsStrip}${coinsStrip}${notesStrip}</div>`;
        // three rows of four tags that stretch to the page (a page fills its body), the play money below
        return { bodyHtml: content(`<div style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(3,1fr);gap:12px;margin-bottom:14px">${tags.join('')}</div>${strip}`), meta: { items: nouns.map((n) => n.vocabKey || n.noun) } };
      }
      throw new Error(`${id}: unknown mode ${mode}`);
    },

    async verify(page) {
      return page.evaluate((mode) => {
        const fails = [];
        const sumv = (els) => els.reduce((s, e) => s + Number(e.getAttribute('data-lcs-value')), 0);
        if (mode === 'fewest') document.querySelectorAll('[data-lcs-amount]').forEach((c, i) => {
          const coins = [...c.querySelectorAll('[data-lcs-prim="coin"]')], boxes = [...c.querySelectorAll('[data-lcs-answer]')];
          if (coins.length !== boxes.length) fails.push(`card ${i + 1}: ${coins.length} coins, ${boxes.length} boxes`);
          const total = coins.reduce((s, e, k) => s + Number(e.getAttribute('data-lcs-value')) * Number(boxes[k].getAttribute('data-lcs-answer')), 0);
          if (total !== +c.dataset.lcsAmount) fails.push(`card ${i + 1}: the counts make ${total}, not ${c.dataset.lcsAmount}`);
          // a written count is at least 1; an empty box (a coin not needed) only on a card whose every box is optional
          if (boxes.some((b) => b.getAttribute('data-lcs-answer') !== '' && !(Number(b.getAttribute('data-lcs-answer')) >= 1))) fails.push(`card ${i + 1}: a count below 1`);
          if (boxes.some((b) => b.getAttribute('data-lcs-answer') === '' && !b.hasAttribute('data-lcs-optional'))) fails.push(`card ${i + 1}: an empty answer on a required box`);
        });
        if (mode === 'pay') document.querySelectorAll('[data-lcs-price]').forEach((c, i) => {
          const tray = [...c.querySelectorAll('[data-lcs-coin]')];
          if (!tray.length) return;   // L3 draws
          const ring = tray.filter((e) => e.hasAttribute('data-lcs-key-ring'));
          if (ring.length && sumv(ring) !== +c.dataset.lcsPrice) fails.push(`card ${i + 1}: the ringed coins make ${sumv(ring)}`);
          if (sumv(tray) === +c.dataset.lcsPrice) fails.push(`card ${i + 1}: the whole tray is the price`);
        });
        if (mode === 'notes') document.querySelectorAll('[data-lcs-total]').forEach((c, i) => {
          const got = sumv([...c.querySelectorAll('[data-lcs-prim="coin"], [data-lcs-prim="note"]')]);
          if (got !== +c.dataset.lcsTotal) fails.push(`card ${i + 1}: notes and coins make ${got}, not ${c.dataset.lcsTotal}`);
        });
        if (mode === 'same') document.querySelectorAll('[data-lcs-a]').forEach((c, i) => {
          const ps = [...c.querySelectorAll('[data-lcs-prim="coin"]')];
          if (!ps.length) fails.push(`row ${i + 1}: empty purses`);
        });
        return fails;
      }, mode);
    },
  };
}

module.exports = { makeMoneyMoreType, fewestWays, greedy, note };
