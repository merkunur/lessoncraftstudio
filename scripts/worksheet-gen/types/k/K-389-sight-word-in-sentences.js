/**
 * K-389 — Sight Word in Sentences. Level Set 2026-09-30: a NEW one-word page in family sight-words (the operator's
 * screenshots: "complete the sentences using the sight word"). The word sits in a box at the top; below, numbered
 * sentences with the word taken out, a school-lined gap in its place. Levels:
 *   1 four short sentences, the word printed DASHED in each gap to trace (sentence-initial gaps only when the others run out)
 *   2 five sentences, empty gaps (sentence-initial only when the others run out)
 *   3 all six sentences, empty gaps, sentence-initial gaps allowed (with the capital-letter reminder)
 * PDF only; no published page.
 */
'use strict';
const SW = require('../../lib/sight-words-levelset.js');
// the check page's box (checkPage): words that fit almost any gap never stand beside the card's word as the wrong one
const FLOATING = {
  en: ['now', 'then', 'here', 'there', 'too', 'today', 'also', 'so', 'very', 'not', 'all', 'again', 'soon', 'out', 'up', 'down', 'away', 'just', 'only', 'still', 'yes', 'no', 'please', 'well', 'back', 'off', 'on', 'in', 'over', 'around'],
  de: ['nicht', 'auch', 'noch', 'schon', 'jetzt', 'hier', 'da', 'dort', 'heute', 'sehr', 'nur', 'mal', 'gern', 'gerne', 'oft', 'so', 'dann', 'nun', 'ja', 'nein', 'bitte', 'gut', 'wieder', 'immer', 'doch', 'viel', 'mit', 'weg', 'hin', 'her'],
  sv: ['inte', 'också', 'nu', 'här', 'där', 'då', 'idag', 'mycket', 'bara', 'så', 'gärna', 'ofta', 'ja', 'nej', 'snälla', 'bra', 'igen', 'alltid', 'redan', 'med', 'ut', 'in', 'upp', 'ner', 'bort', 'hem', 'hit', 'dit', 'också', 'mer'],
};

module.exports = {
  id: 'K-389',
  slug: 'sight-word-in-sentences',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: SW.unitAxis,
  difficulty: {
    1: { n: 4, traced: true, initial: 'prefer', fontPx: 24 },
    2: { n: 5, traced: false, initial: 'prefer', fontPx: 23 },
    3: { n: 6, traced: false, initial: 'any', fontPx: 22 },
  },
  i18n: { en: { title: 'Sight Word in Sentences: {UNIT}', instruction: 'Read each sentence. Write the word “{UNIT}” on the line.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const word = SW.wordOf(unit || SW.unitAxis.exemplar(loc), loc);
    const sents = SW.pickSentences(word, loc, { n: d.n, level: difficulty, rng: ctx.rng, initial: d.initial, accept: (s) => SW.blankable(s, word) });
    const initial = sents.some((s) => SW.startsSentence(s, word));
    const rows = sents.map((s, i) => `<div style="display:flex;align-items:baseline;gap:10px"><span style="font-family:'Nunito',sans-serif;font-weight:800;font-size:${d.fontPx}px;min-width:28px">${i + 1}.</span>${SW.blankSentence(s, word, { traced: d.traced, fontPx: d.fontPx, screen: !!(ctx && ctx.screen) })}</div>`);
    const head = `<div style="display:flex;align-items:center;justify-content:space-between;gap:16px">${SW.sectionLabel(SW.label('complete', loc))}${SW.wordBox(word, 60)}</div>` +
      (initial ? `<div data-lcs-capital style="font-family:'Nunito',sans-serif;font-size:15px;font-style:italic">${SW.esc(SW.label('capital', loc))}</div>` : '');
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${SW.esc(word)}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${head}${rows.join('')}</div>`,
      meta: { word, sentences: sents },
    };
  },

  /** THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md): eight sight words of the locale's core list
   *  (the published units), each a card of its own — the word in its box beside one sight word that does not fit (the
   *  child chooses), and ONE of its reviewed sentences with the word
   *  taken out, drawn by the page's own rules (blankable, a sentence-initial gap only as the level allows it, traced at
   *  level 1). The gap carries the word (data-lcs-answer, a gap box for the key). Eight: the cutter pairs a page's cards
   *  with the key page of build() by their place when the counts agree, and a page holds four to six sentences. */
  checkPage({ difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx.rng;
    const units = SW.unitAxis.units(loc).slice(0, 24);
    // the box holds TWO sight words, the card's own and one that does not fit its sentence (2026-11-15, en / sv check
    // reviews: a box of one word was copied onto the line, nothing was read or chosen). "Does not fit": the locale's
    // own reviewed sentences never put that word right after the gap's left neighbour or right before its right one (a
    // look-alike first — här / har, then / they — so the child reads the word, then any other)
    // … and never a word that stands where the card's word stands (the two share a left or right neighbour in those
    // sentences: de / du, now / not — "Kommer de med?" is a sentence too)
    const tok = (s) => ['^', ...String(s).toLocaleLowerCase(loc).split(/[^\p{L}\p{N}']+/u).filter(Boolean), '$'];
    const pairs = new Set(), left = new Map(), right = new Map();
    const add = (m, k, v) => { if (!m.has(k)) m.set(k, new Set()); m.get(k).add(v); };
    for (const w of SW.words(loc)) for (const s of SW.sentencesOf(w, loc)) {
      const t = tok(s);
      for (let i = 1; i < t.length; i++) { pairs.add(t[i - 1] + ' ' + t[i]); add(right, t[i - 1], t[i]); add(left, t[i], t[i - 1]); }
    }
    const shares = (m, a, b) => [...(m.get(a) || [])].some((x) => x !== '^' && x !== '$' && (m.get(b) || new Set()).has(x));
    // … and never a word that fits almost any gap (now, auch, nu: "I am now sad", "Kom nu!")
    const floating = new Set(FLOATING[loc] || []);
    const fitsGap = (s, word, other) => {
      const { before, after } = SW.splitAtWord(s, word);
      const b = tok(before), a = tok(after), o = other.toLocaleLowerCase(loc), w = word.toLocaleLowerCase(loc);
      return floating.has(o) || pairs.has(b[b.length - 2] + ' ' + o) || pairs.has(o + ' ' + a[1]) || shares(left, w, o) || shares(right, w, o);
    };
    const blocks = [];
    for (const unit of rng.shuffle(units)) {
      if (blocks.length === 8) break;
      const word = SW.wordOf(unit, loc);
      const all = SW.sentencesOf(word, loc).filter((s) => SW.blankable(s, word));
      const inner = all.filter((s) => !SW.startsSentence(s, word));
      const pool = d.initial === 'any' ? all : (inner.length ? inner : all);
      if (!pool.length) continue;
      const s = rng.pick(pool);
      const low = word.toLocaleLowerCase(loc);
      const other = [...SW.foils(word, loc, { k: 12, mode: 'alike', rng }), ...SW.foils(word, loc, { k: 30, mode: 'unlike', rng })]
        .find((w) => w.toLocaleLowerCase(loc) !== low && !fitsGap(s, word, w));
      if (!other) continue;
      const box = rng.next() < 0.5 ? [word, other] : [other, word];
      const sentence = SW.blankSentence(s, word, { traced: d.traced, fontPx: d.fontPx })
        .replace('<span data-lcs-gap style="', '<span data-lcs-gap style="position:relative;')
        .replace(/(<span data-lcs-gap [^>]*>)/, '$1<span data-lcs-gapbox style="position:absolute;inset:0;z-index:1;line-height:normal"></span>');
      blocks.push(`<div style="display:flex;flex-direction:column;gap:8px">` +
        `<div style="display:flex;justify-content:center;gap:16px">${box.map((w) => SW.wordBox(w, 34)).join('')}</div>${sentence}` +
        (SW.startsSentence(s, word) ? `<div data-lcs-capital style="font-family:'Nunito',sans-serif;font-size:15px;font-style:italic">${SW.esc(SW.label('capital', loc))}</div>` : '') + `</div>`);
    }
    if (blocks.length < 8) throw new Error(`K-389 checkPage: ${loc} gives ${blocks.length} sight words with a sentence`);
    return { bodyHtml: `<div>${checkGrid(blocks)}</div>`, meta: {} };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'iu');
      const sents = [...document.querySelectorAll('[data-lcs-sentence]')];
      if (sents.length < 4) fails.push(`only ${sents.length} sentences`);
      const seen = new Set();
      sents.forEach((p, i) => {
        if (re.test(p.textContent)) fails.push(`sentence ${i + 1} still prints the word`);
        if (p.dataset.lcsAnswer.toLocaleLowerCase() !== word.toLocaleLowerCase()) fails.push(`sentence ${i + 1} answer "${p.dataset.lcsAnswer}"`);
        if (p.querySelectorAll('[data-lcs-gap]').length !== 1) fails.push(`sentence ${i + 1}: gaps ≠ 1`);
        const t = p.textContent.trim();
        if (seen.has(t)) fails.push(`sentence ${i + 1} repeats`);
        seen.add(t);
        const traced = p.querySelector('[data-lcs-gap] [data-lcs-prim="trace-word"]');
        if (traced && traced.dataset.lcsText !== p.dataset.lcsAnswer) fails.push(`sentence ${i + 1}: gap traces "${traced.dataset.lcsText}"`);
      });
      const anyInitial = sents.some((p) => p.dataset.lcsInitial === '1');
      if (anyInitial !== !!document.querySelector('[data-lcs-capital]')) fails.push('capital reminder present iff a sentence-initial blank');
      return fails;
    });
  },
};
