/**
 * K-288 — Articles (nt20-B; `articles`, K, readiness — REBUILT per locale).
 * Six picture cards; under each a row of identical white chips carrying the
 * locale's articles in a FIXED canonical order (der · die · das). The child
 * says the noun with its article and circles the chip. No writing at K.
 *   de der/die/das (+ optional colour dots) · nl de/het · fr le/la (d3 un/une)
 *   es el/la · pt o/a · it il/la (d3 il/lo/la/l') · sv en/ett · da en/et ·
 *   no en/et · en a/an (vowel SOUND, with an exceptions table)
 *   fi (no articles) = yksikkö / monikko: one picture → the singular chip,
 *   three pictures → the plural chip — the same slot structure, a genuine
 *   Finnish K noun-form staple.
 * The chip key comes from the vocab gender; `keyFor → null` refuses a noun.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { articleChips } = require('../../templates/components-b2.js');
const { entriesFor, displayWord, distinctByWord, fileUri, countable } = require('../../lib/b2-common.js');
const { ARTICLES } = require('../../data/b2/articles.js');
const { LABELS } = require('../../data/b2/labels.js');

module.exports = {
  id: 'K-288',
  slug: 'circle-the-article',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'articles',
  themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
  difficulty: {
    1: { cards: 4, cols: 2, rows: 2, pic: 150, chipW: 96, chipH: 56, chipFont: 28 },
    2: { cards: 6, cols: 2, rows: 3, pic: 118, chipW: 84, chipH: 48, chipFont: 24 },
    3: { cards: 8, cols: 2, rows: 4, pic: 88, chipW: 76, chipH: 44, chipFont: 22, level3: true },
  },
  i18n: {
    en: {
      title: 'A or An?',
      instruction: 'Say the picture word out loud. Circle the word that goes in front of it.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const A = ARTICLES[loc];
    if (!A) throw new Error(`K-288: no article contract for locale ${loc}`);
    if (A.refuse) throw new Error(`K-288: locale ${loc} refuses this type`);
    const level = d.level3 ? 3 : difficulty;
    const chips = (d.level3 && A.chipsD3) ? A.chipsD3 : A.chips;
    const refuse = new Set((A.refuseKeys || []).map((k) => String(k).toLowerCase()));
    let pool = distinctByWord(entriesFor(theme, loc).filter(countable).filter((e) => !refuse.has(String(e.vocabKey).toLowerCase())), (e) => e.singular.toLocaleLowerCase(loc));
    // fi form mode: each card shows 1 or 3 pictures; chips = [singular, plural]
    const isForm = A.mode === 'form';
    let cardsData = null, guard = 0, relaxed = false;
    while (!cardsData && guard++ < 400) {
      if (guard === 201) relaxed = true; // a theme short of one gender (sv animals: few ett-nouns) still ships with ≥ 1 of it
      const sample = rng.sample(pool, Math.min(pool.length, d.cards * 3));
      const cand = [];
      for (const e of sample) {
        const count = isForm ? rng.pick([1, 3]) : 1;
        const key = A.keyFor({ ...e, key: e.vocabKey }, { level, count });
        if (key == null) continue;
        cand.push({ e, key, count });
        if (cand.length === d.cards) break;
      }
      if (cand.length < d.cards) continue;
      // mix floor: every chip that appears as a key ≥ 2 (d2/d3), ≥ 1 (d1); and ≥ 2 distinct keys
      const hist = {};
      cand.forEach((c) => { hist[c.key] = (hist[c.key] || 0) + 1; });
      const keys = Object.keys(hist);
      const floor = (difficulty === 1 || relaxed) ? 1 : 2;
      const nChips = isForm ? 2 : chips.length;
      const okMix = keys.length >= Math.min(2, nChips) && keys.every((k) => hist[k] >= floor) &&
        (nChips <= 2 || keys.length >= 2);
      if (!okMix) continue;
      cardsData = rng.shuffle(cand);
    }
    if (!cardsData) throw new Error(`K-288: theme ${theme}/${loc} cannot satisfy the gender mix at d${difficulty}`);
    const cards = cardsData.map(({ e, key, count }) => {
      const chipLabels = isForm ? A.chipsFor({ ...e, singular: displayWord(e.singular, loc), plural: displayWord(e.plural, loc) }) : chips;
      const pics = Array.from({ length: count }, (_, k) => {
        const rot = (rng.next() * 8 - 4).toFixed(1);
        const sz = count > 1 ? Math.round(d.pic * 0.62) : d.pic;
        return `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt="" data-lcs-pic="${e.vocabKey}" style="width:${sz}px;height:${sz}px;transform:rotate(${rot}deg)">`;
      }).join('');
      return `<div class="ws-card-stage" style="flex-direction:column;gap:6px" data-lcs-item data-lcs-vocab="${e.vocabKey}" data-lcs-key="${key}" data-lcs-count="${count}">` +
        `<div style="display:flex;gap:6px;align-items:center;justify-content:center;flex:1">${pics}</div>` +
        articleChips({ chips: chipLabels, correctIndex: key, w: isForm ? 120 : (chips.length === 4 ? 66 : d.chipW), h: d.chipH, fontPx: isForm ? 18 : (chips.length === 4 ? 20 : d.chipFont), dots: A.chipDots }) +
        `</div>`;
    });
    // sortWords: a SECOND layout. Instead of one noun against all the articles,
    // the child gets all the nouns against the same categories at once — and it
    // is READ, not named, because there is no picture to lean on. That is a
    // different act from every sibling, and it is why this face takes a G1 id:
    // reading printed words and copying them is not a Vorschule job.
    // ⚠ Finnish has no articles (mode 'form'), so its columns are the shipped
    // yksikko/monikko labels and its chips are word FORMS — the same sorting act
    // on the grammatical contrast that locale actually has.
    if (d.sortWords) {
      const binLabels = isForm
        ? [(LABELS[loc] && LABELS[loc].singularPlural || {}).one || 'one',
           (LABELS[loc] && LABELS[loc].singularPlural || {}).many || 'many']
        : chips;
      const wordChips = cardsData.map(({ e, key, count }) => {
        const w = isForm
          ? displayWord(count > 1 ? e.plural : e.singular, loc)
          : displayWord(e.singular, loc);
        const k = isForm ? (count > 1 ? 1 : 0) : key;
        return `<span class="ws-tile ws-tile--word" style="height:44px;font-size:20px" data-lcs-sortword="${w}" data-lcs-key="${k}">${w}</span>`;
      }).join('');
      const binW = Math.floor(640 / binLabels.length) - 12;
      // Rule as many lines as the HARDEST bin actually needs, never a fixed five.
      // The chip count is a config knob (`cards`) and the mix guard only floors
      // each key at 2, so an 8-chip two-bin page can legitimately deal 6 words to
      // one bin and leave the child two words with nowhere to write them. Count
      // the deal, then fit the spacing to the bin so more lines cannot overflow.
      const perBin = binLabels.map((_, i) => cardsData.filter(({ e, key, count }) =>
        (isForm ? (count > 1 ? 1 : 0) : key) === i).length);
      const lineCount = Math.max(5, ...perBin);
      const gapY = Math.min(58, Math.floor(330 / (lineCount + 0.5)));
      const bins = binLabels.map((label, idx) => {
        const lines = [];
        for (let i = 1; i <= lineCount; i++) lines.push(`<line x1="8" y1="${i * gapY}" x2="${binW - 14}" y2="${i * gapY}" stroke="#C8BFAE" stroke-width="1.5" stroke-dasharray="3 5"/>`);
        return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px" data-lcs-sortbin="${idx}">` +
          `<span class="ws-pill" style="font-size:20px;padding:2px 18px" data-lcs-sorthead="${idx}">${label}</span>` +
          `<div class="ws-bin" style="width:${binW}px;height:350px;max-width:${binW}px;padding:0"><svg width="${binW - 6}" height="345" viewBox="0 0 ${binW - 6} 345" aria-hidden="true">${lines.join('')}</svg></div></div>`;
      }).join('');
      return {
        bodyHtml: `<div data-lcs-mode="${A.mode}" data-lcs-layout="sort" style="flex:1;display:flex;flex-direction:column;gap:18px;align-items:center;justify-content:flex-start;padding-top:6px" data-ws-content>` +
          `<div class="ws-card" style="width:660px;padding:10px 12px;flex-direction:row;flex-wrap:wrap;justify-content:center;gap:10px">${wordChips}</div>` +
          `<div style="display:flex;gap:12px;justify-content:center">${bins}</div></div>`,
        meta: { keys: cardsData.map((c) => c.key) },
      };
    }
    return {
      bodyHtml: `<div data-lcs-mode="${A.mode}" style="flex:1;display:flex;flex-direction:column">${cardGrid({ cards, cols: d.cols, rows: d.rows })}</div>`,
      meta: { keys: cardsData.map((c) => c.key) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      // ⚠ The whole body below asserts the per-card chip-row layout: it hard-requires
      // [data-lcs-item] cards, each with its own [data-lcs-chip] row and exactly one
      // marked correct. The sort layout has NONE of that — no cards, no per-word
      // chips, one shared set of column headings — so every assertion would fire on
      // a correct page. It gets its own contract instead, and returns early.
      const sortRoot = document.querySelector('[data-lcs-layout="sort"]');
      if (sortRoot) {
        const words = [...document.querySelectorAll('[data-lcs-sortword]')];
        const bins = [...document.querySelectorAll('[data-lcs-sortbin]')];
        const heads = [...document.querySelectorAll('[data-lcs-sorthead]')].map((h) => h.textContent.trim());
        if (words.length < 6) fails.push(`only ${words.length} word chips`);
        if (bins.length < 2) fails.push(`only ${bins.length} bins`);
        if (heads.length !== bins.length) fails.push(`${heads.length} headings for ${bins.length} bins`);
        if (new Set(heads).size !== heads.length || heads.some((h) => !h)) fails.push('bin headings missing or duplicated');
        const keys = words.map((w) => +w.dataset.lcsKey);
        if (keys.some((k) => !Number.isInteger(k) || k < 0 || k >= bins.length)) fails.push('a word points at no bin');
        if (new Set(keys).size < 2) fails.push('every word belongs to the same bin');
        const texts = words.map((w) => w.textContent.trim());
        if (texts.some((t) => !t)) fails.push('empty word chip');
        if (new Set(texts).size !== texts.length) fails.push('duplicate word chip');
        // the answer must not be printed: no chip may carry its own heading
        if (texts.some((t) => heads.includes(t))) fails.push('a word chip repeats a bin heading');
        // Every word the page deals must have a line to be written on. The bin
        // ruling was a hardcoded five while `cards` is a config knob, so an
        // 8-chip page could deal 6 words to one bin and strand two of them.
        bins.forEach((bin, i) => {
          const need = keys.filter((k) => k === i).length;
          const ruled = bin.querySelectorAll('line').length;
          if (ruled < need) fails.push(`bin ${i}: ${need} words but only ${ruled} ruled lines`);
        });
        return fails;
      }
      const items = [...document.querySelectorAll('[data-lcs-item]')];
      if (items.length < 4) fails.push(`only ${items.length} cards`);
      const mode = document.querySelector('[data-lcs-mode]').dataset.lcsMode;
      let firstOrder = null;
      const hist = {};
      const seen = new Set();
      items.forEach((it, i) => {
        if (seen.has(it.dataset.lcsVocab)) fails.push(`card ${i + 1}: duplicate noun`);
        seen.add(it.dataset.lcsVocab);
        const chips = [...it.querySelectorAll('[data-lcs-chip]')];
        const correct = chips.filter((c) => c.dataset.lcsCorrect);
        if (correct.length !== 1) fails.push(`card ${i + 1}: ${correct.length} correct chips`);
        if (correct[0] && correct[0].dataset.lcsChip !== it.dataset.lcsKey) fails.push(`card ${i + 1}: correct chip != key`);
        const labels = chips.map((c) => c.dataset.lcsLabel);
        if (new Set(labels).size !== labels.length) fails.push(`card ${i + 1}: duplicate chip labels`);
        if (mode === 'article') {
          const order = labels.join('|');
          if (firstOrder == null) firstOrder = order;
          else if (order !== firstOrder) fails.push(`card ${i + 1}: chip order differs (position leak)`);
          // chips must be visually identical apart from the data-driven dot
          const styles = new Set(chips.map((c) => c.getAttribute('style')));
          if (styles.size !== 1) fails.push(`card ${i + 1}: chips styled differently`);
        } else {
          const n = +it.dataset.lcsCount;
          if (it.querySelectorAll('img').length !== n) fails.push(`card ${i + 1}: picture count != ${n}`);
          if ((n === 1 ? '0' : '1') !== it.dataset.lcsKey) fails.push(`card ${i + 1}: form key does not follow the picture count`);
        }
        hist[it.dataset.lcsKey] = (hist[it.dataset.lcsKey] || 0) + 1;
        // the article/form never appears as text outside the chips
        const outside = [...it.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('');
        if (outside) fails.push(`card ${i + 1}: stray text "${outside}"`);
        for (const img of it.querySelectorAll('img')) if (!img.complete || img.naturalWidth === 0) fails.push(`card ${i + 1}: broken picture`);
      });
      const keys = Object.keys(hist);
      if (keys.length < 2) fails.push('only one chip is ever correct (no discrimination)');
      if (items.length >= 6 && keys.some((k) => hist[k] < 1)) fails.push('a chip key never appears');
      return fails;
    });
  },
};
