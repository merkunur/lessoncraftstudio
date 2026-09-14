/**
 * K-333 — Feels Good or Feels Bad? Sort the Faces. nt20-C variation F3 of
 * K-319 `feelings` (design docs/worksheet-gen/b3-designs/K-319-emotions.md
 * §3 F3; HANDWRITTEN — a makeScienceCategorySort instance cannot be a
 * gen-b3var-specs row; listed under HANDWRITTEN in tools/b3var-rows/feelings.js).
 *
 * The child judges VALENCE (comfortable / uncomfortable — present in all 11
 * frameworks): a shuffled one-row strip of six yellow faces over two
 * word-labelled bins, a line from each face to its bin. The word is
 * irrelevant here, so faces refused for WORDS enter where their valence is
 * unmistakable (every one opened, base record): good = happy merry content
 * excited · bad = sad angry scared capricious disgusted; tired / surprised
 * (neutral), bored / confused / shy (ambiguous) and sceptical (no vocabKey)
 * stay out. Items are LOCALE-NEUTRAL (design §5: `face` and `valence` are
 * copied from en by apply-), so they are a literal here — the gate asserts
 * the literal ≡ the bank's valence set (poison P5) — and the bin labels come
 * from the locale's bank block at build (`bins.good/bad.label`, passed as
 * ctx.binLabels, which the factory's labelFor prefers); an unauthored locale
 * REFUSES (b3-common.bank throws) instead of falling back to the en label.
 *
 * perBin 3 (not the pedagogy's 4) on the factory's own CSS: itemPx =
 * min(78, floor(648/n) - 12) → 6 items = 78 px faces in ~100 px boxes, one
 * row; 8 items → 69 px faces but 8 × 89 + 7 × 12 = 796 > 675 wraps the strip.
 * The gate asserts the one-row strip (every .sci-item shares one top) and
 * the 78 px face floor; the factory's own verify() (every item's bin is a
 * labelled bin; every bin gets an item) is extended with the valence check
 * from the picture stem (verify runs in page.evaluate — the lists are inline).
 */
'use strict';
const { makeScienceCategorySort } = require('../_shared/science-category-sort.js');
const { bank: loadBank } = require('../../lib/b3-common.js');

/** Locale-neutral valence items (= data/b3/feelings.js en `valence`; the gate cross-checks). */
const ITEMS = [
  { theme: 'emotions', noun: 'happy', bin: 'good' },
  { theme: 'emotions', noun: 'merry', bin: 'good' },
  { theme: 'emotions', noun: 'content', bin: 'good' },
  { theme: 'emotions', noun: 'excited', bin: 'good' },
  { theme: 'emotions', noun: 'sad', bin: 'bad' },
  { theme: 'emotions', noun: 'angry', bin: 'bad' },
  { theme: 'emotions', noun: 'scared', bin: 'bad' },
  { theme: 'emotions', noun: 'capricious', bin: 'bad' },
  { theme: 'emotions', noun: 'disgusted', bin: 'bad' },
];

const spec = makeScienceCategorySort({
  id: 'K-333', slug: 'feelings-feels-good-or-feels-bad', gradeBand: 'K', exerciseType: 'feelings',
  data: {
    bins: [{ key: 'good', label: { en: 'Feels good' } }, { key: 'bad', label: { en: 'Feels bad' } }],
    items: ITEMS,
  },
  difficulty: { 1: { perBin: 2 }, 2: { perBin: 3 }, 3: { perBin: 3 } },
  i18n: { en: { title: 'Feels Good or Feels Bad? Sort the Faces', instruction: 'Draw a line from each face to the box that says whether the feeling feels good or bad.' } },
});

const factoryBuild = spec.build;
const factoryVerify = spec.verify;

module.exports = {
  ...spec,
  items: ITEMS,

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    const b = loadBank('feelings', loc);   // REFUSES an unauthored locale (never the en label)
    if (!b.bins || !b.bins.good || !b.bins.bad || !b.bins.good.label || !b.bins.bad.label) throw new Error(`K-333: ${loc} bank has no bin labels`);
    const d = this.difficulty[difficulty] || this.difficulty[2];
    if (d.perBin > 3) throw new Error(`K-333: perBin ${d.perBin} > 3 wraps the one-row strip (8 × 89 + 7 × 12 = 796 > 675)`);
    const binLabels = { good: b.bins.good.label, bad: b.bins.bad.label };
    return factoryBuild.call(this, { theme, difficulty, locale: loc, unit }, { ...ctx, binLabels });
  },

  async verify(page) {
    const base = await factoryVerify(page);
    const own = await page.evaluate(() => {
      const fails = [];
      const GOOD = ['happy', 'merry', 'content', 'excited'];
      const BAD = ['sad', 'angry', 'scared', 'capricious', 'disgusted'];
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)\b/i;
      const items = [...document.querySelectorAll('[data-sci-item]')];
      if (items.length < 4 || items.length > 6) fails.push(`${items.length} faces on the strip outside 4..6`);
      const tops = new Set(items.map((i) => Math.round(i.getBoundingClientRect().top)));
      if (tops.size > 1) fails.push(`the strip wraps: ${tops.size} rows of faces`);
      const seen = new Set();
      items.forEach((it, k) => {
        const im = it.querySelector('img');
        if (!im || !im.complete || im.naturalWidth === 0) { fails.push(`face ${k + 1}: picture broken`); return; }
        if (im.getAttribute('alt')) fails.push(`face ${k + 1}: alt text names the feeling`);
        const parts = decodeURIComponent(im.src).split('/');
        const dir = parts.slice(-2, -1)[0] || '';
        const noun = parts.pop().replace(/@3x\.webp$/, '');
        if (dir !== 'emotions') fails.push(`face ${k + 1}: from "${dir}", not the emotions dir`);
        if (BW.test(dir)) fails.push(`face ${k + 1}: B&W directory "${dir}"`);
        if (seen.has(noun)) fails.push(`face ${k + 1}: "${noun}" appears twice`); seen.add(noun);
        const bin = it.dataset.sciItem;
        const want = GOOD.includes(noun) ? 'good' : BAD.includes(noun) ? 'bad' : null;
        if (!want) fails.push(`face ${k + 1}: "${noun}" has no unmistakable valence`);
        else if (bin !== want) fails.push(`face ${k + 1}: "${noun}" is filed under "${bin}", its valence is "${want}"`);
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < 78 - 0.6) fails.push(`face ${k + 1}: icon ${Math.round(Math.min(r.width, r.height))} px < 78`);
        if (it.textContent.trim()) fails.push(`face ${k + 1}: prints text`);
      });
      const bins = [...document.querySelectorAll('[data-sci-bin]')].map((b) => b.dataset.sciBin);
      if (bins.join() !== 'good,bad') fails.push(`bins ${bins.join()} ≠ good,bad`);
      const labels = [...document.querySelectorAll('.sci-bin-label')].map((l) => l.textContent.trim());
      if (labels.some((l) => !l)) fails.push('an empty bin label');
      if (new Set(labels).size !== labels.length) fails.push('two bins print the same label');
      // no valence word printed twice; the bin labels are the only text
      return fails;
    });
    return base.concat(own);
  },
};
