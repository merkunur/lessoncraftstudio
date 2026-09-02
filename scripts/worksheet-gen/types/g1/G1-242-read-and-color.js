/**
 * G1-242 — Read and Color (nt20-B; `read-and-color`, G1, RF.1.4 — the
 * Lese-Mal-Blatt / lis et colorie / lee y colorea). Six cards; each has one
 * short sentence — "Color 3 cats blue." — over a strip of BW line-art
 * pictures: exactly n of the named noun plus 1-3 pictures of another noun,
 * shuffled. The child must READ the noun, the number and the colour, then
 * colour. The legend banner pairs each swatch with its colour word (the word
 * is the B&W-safe signal). BW themes only — colour art cannot be coloured.
 * Sentence frames come from the per-locale bank (data/b2/sentences.js):
 * pure substitution of a vocab plural (or a curated table) + a per-locale
 * colour literal; the code never inflects. d1 4 cards · d2 6 · d3 6 denser.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { colorLegend } = require('../../templates/components-b2.js');
const { entriesFor, fileUri } = require('../../lib/b2-common.js');
const { SENTENCES } = require('../../data/b2/sentences.js');
const { COLOR_WORDS } = require('../../data/color-words.js');
const SB = require('../../lib/sentence-bank.js');

const COLOR_KEYS = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'brown', 'pink'];
// in LINE ART the round fruits are one silhouette; a distractor must never be a lookalike of the target
const OPAQUE_ASSETS = new Set(['seal']); // animals bw seal@3x.webp has no alpha (measured 2026-09-02)
const CONFUSABLES = [['apple', 'orange', 'peach', 'apricot', 'nectarine', 'plum', 'cherry', 'cherries', 'tomato', 'mandarin', 'tangerine', 'clementine', 'lime', 'grapefruit', 'pomegranate', 'coconut', 'melon', 'onion'], ['lemon', 'mango', 'papaya', 'pear', 'fig', 'avocado'], ['blueberry', 'blueberries', 'grape', 'grapes', 'blackberry', 'blackberries', 'raspberry', 'raspberries'], ['cat', 'kitten'], ['bull', 'cow', 'calf'], ['dog', 'puppy'], ['duck', 'duckling'], ['hen', 'chicken', 'chick', 'rooster'], ['sheep', 'lamb'], ['horse', 'foal', 'pony'], ['goat', 'kid'], ['pig', 'piglet']];

module.exports = {
  id: 'G1-242',
  slug: 'read-and-color',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'read-and-color',
  themeAxis: { applicable: true, minNouns: 8, bwOnly: true },
  difficulty: {
    1: { cards: 4, cols: 2, rows: 2, nMin: 2, nMax: 3, distract: [1], others: 1, colors: 4, icon: 96, font: 18 },
    2: { cards: 6, cols: 2, rows: 3, nMin: 2, nMax: 4, distract: [1, 2], others: 1, colors: 6, icon: 66, font: 17 },
    3: { cards: 6, cols: 2, rows: 3, nMin: 3, nMax: 5, distract: [2, 3], others: 2, colors: 8, icon: 56, font: 16 },
  },
  i18n: {
    en: {
      title: 'Read and Color',
      instruction: 'Read each sentence carefully. Then color exactly the pictures it tells you to.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const bank = SENTENCES[loc];
    if (!bank) throw new Error(`G1-242: no sentence bank for locale ${loc}`);
    if (!/\bbw\b/i.test(theme)) throw new Error(`G1-242: theme ${theme} is not a BW theme (colour art cannot be coloured)`);
    const words = COLOR_WORDS[loc];
    if (!words) throw new Error(`G1-242: no colour words for ${loc}`);
    const colorKeys = rng.shuffle(COLOR_KEYS.slice(0, d.colors)).slice(0, d.cards);
    const entries = entriesFor(theme, loc).filter((e) => e.plural && !OPAQUE_ASSETS.has(String(e.vocabKey).toLowerCase()));
    if (entries.length < d.cards + 2) throw new Error(`G1-242: theme ${theme}/${loc} has ${entries.length} nouns < ${d.cards + 2}`);
    const targets = rng.sample(entries, d.cards);
    const frames = SB.pickFrames(bank, { kind: 'color', count: 1, rng });
    const framePool = bank.frames.filter((f) => f.kind === 'color');
    const confus = (a, b) => CONFUSABLES.some((g) => g.includes(a) && g.includes(b));
    const cards = targets.map((e, i) => {
      const n = rng.int(d.nMin, d.nMax);
      const colorKey = colorKeys[i % colorKeys.length];
      const frame = framePool[(i + framePool.indexOf(frames[0])) % framePool.length];
      const nounText = SB.resolveNoun(bank, frame, e, loc);
      const colorText = SB.colorInSentence(bank, words, colorKey);
      const name = rng.pick(bank.names);
      const sentence = SB.fillFrame(frame.text, { name, n, noun: nounText, color: colorText });
      // distractor nouns: other theme nouns, not confusable with the target
      const others = rng.shuffle(entries.filter((o) => o.vocabKey !== e.vocabKey && !confus(o.vocabKey, e.vocabKey))).slice(0, d.others);
      const nd = rng.pick(d.distract);
      const icons = [];
      for (let k = 0; k < n; k++) icons.push({ e, target: true });
      for (let k = 0; k < nd; k++) icons.push({ e: others[k % others.length], target: false });
      const strip = rng.shuffle(icons).map((it) =>
        `<img class="ws-icon" src="${fileUri(theme, it.e.noun)}" alt="" data-lcs-noun="${it.e.vocabKey}"${it.target ? ' data-lcs-target="1"' : ''} ` +
        `style="width:${d.icon}px;height:${d.icon}px;transform:rotate(${(rng.next() * 12 - 6).toFixed(1)}deg)">`).join('');
      return `<div class="ws-card-stage" style="flex-direction:column;align-items:stretch;justify-content:flex-start;gap:8px;padding:10px 8px 4px" data-lcs-item>` +
        `<p style="font-family:'Nunito';font-weight:800;font-size:${d.font}px;line-height:1.4;color:#3A3530;margin:0;min-height:${d.font * 2.8}px;padding-left:22px" data-lcs-sentence>${SB.fillFrame('', {}) + sentence}</p>` +
        `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;align-content:flex-start" data-lcs-strip data-lcs-n="${n}" data-lcs-noun="${e.vocabKey}" ` +
        `data-lcs-color="${colorKey}" data-lcs-noun-text="${nounText}" data-lcs-color-text="${colorText}">${strip}</div></div>`;
    });
    const legend = colorLegend({ entries: colorKeys.slice(0, d.cards).map((k) => ({ key: k, word: words[k] })) });
    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;min-height:0">${legend}${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
      meta: {},
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const items = [...document.querySelectorAll('[data-lcs-item]')];
      if (items.length < 4) fails.push(`only ${items.length} cards`);
      const colors = new Set(), nouns = new Set();
      items.forEach((it, i) => {
        const s = it.querySelector('[data-lcs-sentence]');
        const strip = it.querySelector('[data-lcs-strip]');
        if (!s || !strip) { fails.push(`card ${i + 1}: missing parts`); return; }
        const n = +strip.dataset.lcsN, key = strip.dataset.lcsNoun;
        const targets = [...strip.querySelectorAll('[data-lcs-target]')];
        if (targets.length !== n) fails.push(`card ${i + 1}: ${targets.length} targets, want ${n}`);
        targets.forEach((t) => { if (t.dataset.lcsNoun !== key) fails.push(`card ${i + 1}: target of another noun`); });
        [...strip.querySelectorAll('img:not([data-lcs-target])')].forEach((o) => { if (o.dataset.lcsNoun === key) fails.push(`card ${i + 1}: an unmarked picture of the target noun (count ambiguous)`); });
        const all = [...strip.querySelectorAll('img')];
        if (all.length <= n) fails.push(`card ${i + 1}: no distractor`);
        if (all.length > 8) fails.push(`card ${i + 1}: ${all.length} pictures`);
        const w = new Set(all.map((im) => im.style.width));
        if (w.size !== 1) fails.push(`card ${i + 1}: pictures differ in size (target leak)`);
        if (all.some((im) => im.style.opacity && im.style.opacity !== '1')) fails.push(`card ${i + 1}: opacity leak`);
        if (strip.querySelector('svg')) fails.push(`card ${i + 1}: overlay on a picture`);
        const text = s.textContent;
        if (!new RegExp(`(^|\\D)${n}(\\D|$)`).test(text)) fails.push(`card ${i + 1}: digit ${n} not in sentence`);
        if (!text.includes(strip.dataset.lcsNounText)) fails.push(`card ${i + 1}: noun literal missing from sentence`);
        if (!text.includes(strip.dataset.lcsColorText)) fails.push(`card ${i + 1}: colour literal missing from sentence`);
        if (/\{/.test(text)) fails.push(`card ${i + 1}: unfilled slot`);
        if (colors.has(strip.dataset.lcsColor)) fails.push(`card ${i + 1}: colour reused`);
        colors.add(strip.dataset.lcsColor);
        if (nouns.has(key)) fails.push(`card ${i + 1}: target noun reused`);
        nouns.add(key);
        for (const img of all) if (!img.complete || img.naturalWidth === 0) fails.push(`card ${i + 1}: broken picture`);
      });
      const legend = [...document.querySelectorAll('[data-lcs-legend]')].map((l) => l.dataset.lcsColor);
      if (legend.join('|') !== [...colors].sort().join('|') && legend.slice().sort().join('|') !== [...colors].sort().join('|')) fails.push('legend colours != page colours');
      if (new Set(legend).size !== legend.length) fails.push('duplicate legend colour');
      return fails;
    });
  },
};
