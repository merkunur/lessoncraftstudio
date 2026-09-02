/**
 * G2-276 — Shopping Math (nt20-B; `money` REUSE, G2, 2.MD.C.8 — Rechnen mit
 * Geld / problèmes de monnaie / rekenen met geld). A shop shelf runs across
 * the top: theme items on a teal plank with paper price tags in the native
 * sub-unit (35 ct · 20 ¢ · 4 kr). Below, story cards: a named child buys
 * things — the items appear as INLINE PICTURES in the sentence, never as
 * words (article-proof, language-light) — and answers: total? change from
 * these coins? enough money? All prices are seed×scale so the same numbers
 * ship in every locale; every total ≤ the currency's subMax; no decimals.
 * d1: 4 items, 2 cards · d2: 5 items, 3 cards · d3: 6 items, 4 cards (+diff).
 */
'use strict';
const { answerBox } = require('../../templates/components.js');
const { shelf, dotPanel } = require('../../templates/components-b2.js');
const { coin, sizeFor } = require('../../primitives/coins.js');
const { fileUri } = require('../../image-cache/resolve.js');
const { safeNouns } = require('../../lib/b2-common.js');
const { CURRENCIES } = require('../../data/money/currencies.js');
const { SHOP_FRAMES } = require('../../data/b2/shop-frames.js');
const { FRAMES } = require('../../data/word-problems/frames.js');


/** Inline-picture typography: a picture followed by punctuation loses its right margin (no " ." gap),
 *  and a picture + the next short token never break across lines (no lone "?" / "eingetragen?"). */
function glueInline(html) {
  html = html.replace(/(<img\b[^>]*?style=")([^"]*)("[^>]*>)\s*(?=[.,;:?!¿¡])/g, (m, a, st, b) => a + st.replace(/margin:0 (\d+)px/, 'margin:0 0 0 $1px') + b);
  html = html.replace(/(<img\b[^>]*>)([ \u00a0]?)([^\s<]{1,14})(?=\s|$|<)/g, '<span style="white-space:nowrap">$1$2$3</span>');
  return html;
}

const NBSP = ' ';

// a shop never sells a person: the toys theme carries baby/girl/boy/doll art that renders as a child
const PERSON_KEYS = new Set(['baby', 'girl', 'boy', 'doll', 'child', 'kid', 'man', 'woman', 'mother', 'father', 'grandma', 'grandpa', 'teacher', 'nurse', 'doctor', 'police officer', 'firefighter', 'king', 'queen', 'prince', 'princess', 'pirate', 'clown', 'astronaut', 'knight', 'fairy', 'elf', 'santa']);

module.exports = {
  id: 'G2-276',
  slug: 'shopping-math',
  gradeBand: 'G2',
  assetClass: 'icon-placement',
  exerciseType: 'money',
  themeAxis: { applicable: true, minNouns: 6, excludeBw: true },
  difficulty: {
    1: { items: 4, cards: 2, kinds: ['total', 'canBuy'], baseMax: 6, icon: 90, cardH: 240, font: 18, dots: 100 },
    2: { items: 5, cards: 3, kinds: ['total', 'change', 'canBuy'], baseMax: 9, icon: 76, cardH: 160, font: 17, dots: 72 },
    3: { items: 6, cards: 4, kinds: ['total3', 'change', 'canBuy', 'diff'], baseMax: 9, icon: 56, cardH: 0, font: 15, dots: 40, coinPx: [30, 40], pad: '8px 14px', gap: 10 },
  },
  i18n: {
    en: {
      title: 'Shopping Math',
      instruction: 'Find each thing on the shelf and read its price. Then answer the questions about the money.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const cur = CURRENCIES[loc];
    const bank = SHOP_FRAMES[loc];
    if (!cur || !bank) throw new Error(`G2-276: no currency/frames for ${loc}`);
    const names = (FRAMES[loc] && FRAMES[loc].names) || bank.names;
    if (!names) throw new Error(`G2-276: no names for ${loc}`);
    const scale = cur.unit === 'kr' || cur.unit === 'kr.' ? 2 : 5;
    const shopPool = safeNouns(theme, loc).filter((n) => !PERSON_KEYS.has(String(n.vocabKey).toLowerCase()) && !PERSON_KEYS.has(String(n.noun).toLowerCase().replace(/\s*\d+$/, '')));
    if (shopPool.length < d.items) throw new Error(`G2-276: theme ${theme} has ${shopPool.length} sellable items < ${d.items}`);
    const nouns = rng.sample(shopPool, d.items);
    const bases = rng.sample([2, 3, 4, 5, 6, 7, 8, 9].filter((b) => b <= d.baseMax), d.items);
    const items = nouns.map((n, i) => ({ noun: n.noun, vocabKey: n.vocabKey, src: fileUri(theme, n.noun), price: bases[i] * scale, unit: cur.unit }));
    const coinVals = cur.sub.map((s) => s.v).sort((a, b) => b - a);
    const denoms = cur.sub;
    const icon = (idx) => `<img class="ws-icon" src="${items[idx].src}" alt="" data-lcs-ref="${idx}" style="width:30px;height:30px;vertical-align:middle;margin:0 3px">`;
    const pick2 = () => rng.sample(items.map((_, i) => i), 2);
    const cards = [];
    const kinds = d.kinds.slice();
    for (let k = 0; k < d.cards; k++) {
      const kind = kinds[k % kinds.length];
      const name = rng.pick(names);
      let sentence, answer, refs, extra = '', chips = '';
      if (kind === 'total' || kind === 'total3') {
        refs = kind === 'total3' ? rng.sample(items.map((_, i) => i), 3) : pick2();
        answer = refs.reduce((s, i) => s + items[i].price, 0);
        if (answer > cur.subMax) { k--; continue; }
        sentence = rng.pick(bank.frames[kind]);
      } else if (kind === 'change') {
        refs = [rng.int(0, items.length - 1)];
        const price = items[refs[0]].price;
        const payOpts = coinVals.filter((v) => v > price + 4);
        let paid, coins;
        if (payOpts.length) { paid = Math.min(...payOpts); coins = [paid]; }
        else {
          // greedy multi-coin pay-with above the price (≤ 5 coins)
          paid = Math.ceil((price + 5) / coinVals[0]) * coinVals[0];
          coins = []; let rest = paid;
          for (const v of coinVals) while (rest >= v && coins.length < 5) { coins.push(v); rest -= v; }
          if (rest !== 0) { k--; continue; }
        }
        answer = paid - price;
        sentence = rng.pick(bank.frames.change);
        {
          const all = denoms.map((x) => x.v), tint = Object.fromEntries(denoms.map((x) => [x.v, x.tint]));
          const top2 = [...new Set(all)].sort((a, b) => b - a).slice(0, 2);
          const px = d.coinPx || [36, 48];
          const svgs = coins.slice().sort((a, b) => b - a).map((v) => coin({ value: v, tint: tint[v], d: sizeFor(v, all, { minPx: px[0], maxPx: px[1] }), doubleRing: top2.includes(v) }).svg).join('');
          extra = `<span style="display:inline-flex;align-items:center;gap:4px;vertical-align:middle;margin:0 4px" data-lcs-coins data-lcs-cointotal="${paid}">${svgs}</span>`;
        }
      } else if (kind === 'canBuy') {
        refs = pick2();
        const sum = items[refs[0]].price + items[refs[1]].price;
        const money = sum + rng.pick([-2, -1, 1, 2]) * scale;
        if (money <= 0 || sum > cur.subMax) { k--; continue; }
        answer = sum;
        const can = money >= sum;
        sentence = rng.pick(bank.frames.canBuy).replace('{money}', `${money}${NBSP}${cur.unit}`);
        chips = `<span style="display:inline-flex;gap:8px;margin-right:10px" data-lcs-money="${money}">` +
          `<span class="ws-pill" style="font-size:17px;padding:4px 18px" data-lcs-choice="yes"${can ? ' data-lcs-correct="1"' : ''}>${bank.yes}</span>` +
          `<span class="ws-pill" style="font-size:17px;padding:4px 18px" data-lcs-choice="no"${!can ? ' data-lcs-correct="1"' : ''}>${bank.no}</span></span>`;
      } else { // diff
        refs = pick2();
        if (items[refs[0]].price < items[refs[1]].price) refs.reverse();
        answer = items[refs[0]].price - items[refs[1]].price;
        if (answer === 0) { k--; continue; }
        sentence = rng.pick(bank.frames.diff);
      }
      // a change frame authored without an end mark after the coin row gets its period ("… mit (20) Wie viel" → "… mit (20). Wie viel")
      sentence = sentence.replace(/\{coins\}\s+(?=[\p{Lu}¿¡])/u, '{coins}. ');
      let html = sentence.replace(/\{name\}/g, name);
      refs.forEach((r, i) => { html = html.replace(`{item${i + 1}}`, icon(r)); });
      // the coins render INLINE at the {coins} slot
      if (html.includes('{coins}')) { html = html.replace('{coins}', extra); extra = ''; }
      html = glueInline(html).replace(/\.\s*\.(?=\s|$)/g, '.'); // "6 kr.." → "6 kr."
      if (/\{/.test(html)) throw new Error(`G2-276: unfilled slot in "${sentence}"`);
      cards.push(`<div class="ws-card" style="padding:${d.pad || '12px 18px'};gap:${d.gap === 10 ? 5 : 8}px;min-height:${d.cardH}px" data-lcs-problem data-lcs-qtype="${kind}" data-lcs-refs="${refs.join(',')}" data-lcs-answer="${answer}">` +
        `<span class="ws-card-badge">${k + 1}</span>` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${d.font}px;line-height:1.45;color:#3A3530;margin:0;padding-left:22px" data-lcs-sentence>${html}</p>${extra}` +
        `<div style="display:flex;gap:14px;align-items:stretch">${dotPanel({ w: 420, h: d.dots })}<div style="display:flex;align-items:center;gap:8px">${chips}${answerBox({ w: 84, h: 54, answer })}<span style="font-family:'Baloo 2';font-weight:700;font-size:20px;color:#3A3530" data-lcs-unit>${cur.unit}</span></div></div></div>`);
    }
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:space-evenly;align-items:center" data-ws-content>` +
        `<div class="ws-card" style="width:660px;padding:${d.gap === 10 ? '8px 10px 4px' : '12px 10px 8px'};align-items:center">${shelf({ items, w: 640, iconPx: d.icon, tagPx: cur.unit.length > 3 ? 15 : 17 })}</div>` +
        `<div style="display:flex;flex-direction:column;gap:${d.gap || 12}px;width:660px">${cards.join('')}</div></div>`,
      meta: { prices: items.map((i) => i.price) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const UNITS = { en: '¢', de: 'ct', es: 'cts', fr: 'c', it: 'cent', pt: 'centavos', nl: 'ct', fi: 'snt', sv: 'kr', da: 'kr.', no: 'kr' };
      const lang = (document.documentElement.lang || 'en').slice(0, 2);
      const shelfItems = [...document.querySelectorAll('[data-lcs-shelfitem]')];
      if (shelfItems.length < 4) fails.push(`shelf has ${shelfItems.length} items`);
      const prices = shelfItems.map((s) => +s.dataset.lcsPrice);
      if (new Set(prices).size !== prices.length) fails.push('duplicate prices');
      shelfItems.forEach((s, i) => {
        const tag = s.querySelector('[data-lcs-prim="price-tag"]');
        if (!tag) { fails.push(`item ${i + 1}: no tag`); return; }
        if (+tag.dataset.lcsPrice !== prices[i]) fails.push(`item ${i + 1}: tag != price`);
        const t = tag.querySelector('text').textContent.replace(/ /g, ' ');
        if (t !== `${prices[i]} ${UNITS[lang]}`) fails.push(`item ${i + 1}: tag text "${t}" (want "${prices[i]} ${UNITS[lang]}")`);
        if (UNITS[lang] && tag.dataset.lcsUnit !== UNITS[lang]) fails.push(`unit ruling violated: ${tag.dataset.lcsUnit}`);
      });
      const problems = [...document.querySelectorAll('[data-lcs-problem]')];
      if (problems.length < 2) fails.push('too few problems');
      problems.forEach((p, i) => {
        const kind = p.dataset.lcsQtype, refs = p.dataset.lcsRefs.split(',').map(Number), ans = +p.dataset.lcsAnswer;
        const sentence = p.querySelector('[data-lcs-sentence]');
        const imgs = [...sentence.querySelectorAll('img[data-lcs-ref]')].map((im) => +im.dataset.lcsRef);
        if (imgs.join(',') !== refs.join(',')) fails.push(`p${i + 1}: inline pictures ${imgs} != refs ${refs}`);
        imgs.forEach((r) => { const im = sentence.querySelector(`img[data-lcs-ref="${r}"]`); const sh = shelfItems[r] && shelfItems[r].querySelector('img'); if (!sh || im.getAttribute('src') !== sh.getAttribute('src')) fails.push(`p${i + 1}: picture ${r} != shelf picture`); });
        if (new Set(refs).size !== refs.length) fails.push(`p${i + 1}: repeated item`);
        let expect;
        if (kind === 'total' || kind === 'total3') expect = refs.reduce((s, r) => s + prices[r], 0);
        else if (kind === 'change') {
          const coins = [...p.querySelectorAll('[data-lcs-prim="coin"]')].map((c) => +c.dataset.lcsValue);
          const paid = coins.reduce((s, v) => s + v, 0);
          const wrap = p.querySelector('[data-lcs-coins]');
          if (!wrap || +wrap.dataset.lcsCointotal !== paid) fails.push(`p${i + 1}: coin total stamp ${wrap && wrap.dataset.lcsCointotal} != ${paid}`);
          if (paid <= prices[refs[0]]) fails.push(`p${i + 1}: paid ${paid} not above price`);
          expect = paid - prices[refs[0]];
          for (let k = 1; k < coins.length; k++) if (coins[k] > coins[k - 1]) fails.push(`p${i + 1}: coins not largest-first`);
        } else if (kind === 'canBuy') {
          const money = +p.querySelector('[data-lcs-money]').dataset.lcsMoney;
          expect = prices[refs[0]] + prices[refs[1]];
          const correct = [...p.querySelectorAll('[data-lcs-choice][data-lcs-correct]')];
          if (correct.length !== 1) fails.push(`p${i + 1}: ${correct.length} correct chips`);
          else if ((correct[0].dataset.lcsChoice === 'yes') !== (money >= expect)) fails.push(`p${i + 1}: yes/no wrong`);
          if (!new RegExp(`(^|\\D)${money}(\\D|$)`).test(sentence.textContent)) fails.push(`p${i + 1}: money not in sentence`);
        } else { expect = Math.abs(prices[refs[0]] - prices[refs[1]]); if (!expect) fails.push(`p${i + 1}: zero difference`); }
        if (expect !== ans) fails.push(`p${i + 1}: answer ${ans} != ${expect}`);
        const box = p.querySelector('[data-lcs-answer]');
        if (!box || +box.dataset.lcsAnswer !== ans) fails.push(`p${i + 1}: box != answer`);
        const txt = sentence.textContent;
        if (kind !== 'canBuy' && new RegExp(`(^|\\D)${ans}(\\D|$)`).test(txt)) fails.push(`p${i + 1}: answer printed in sentence`);
        if (/\{/.test(txt)) fails.push(`p${i + 1}: unfilled slot`);
        if (p.querySelector('[data-lcs-workspace]') == null) fails.push(`p${i + 1}: no working space`);
      });
      return fails;
    });
  },
};
