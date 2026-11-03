/**
 * K-538 — Which One Does Not Rhyme? (Rhyming Words maker 2026-11-02, NEW-TEMPLATES §39 T2; RF.K.2.a): rows of three
 * pictures, two that rhyme and one that does not; the child says the three names and circles the one that does not
 * rhyme (K-352 judges a pair; this is the three-way step after). The rhymes are the reviewed bank's classes BY SOUND
 * (data/b3/rhyming-words.js + data/b3/locales, every picture opened); the odd one is a picture of another class — at
 * level 3 a NEAR miss where the bank has one (cat · hat · cap: the same start, a different rhyme), else another class
 * with another stressed vowel (vowelOf).
 * The odd picture stands in each place equally often over a page (no position tell).
 * Every picture is a tap target; the odd one is ringed on the key.
 * Levels: 1 six rows, far misses · 2 eight rows, far misses · 3 eight rows, near misses where the language has them.
 */
'use strict';
const { bank } = require('../../lib/b3-common.js');
const { fileUri } = require('../../image-cache/resolve.js');
const A = require('../_shared/alphabet-more.js');
const slot = require('../../lib/slot.js');
const { rhymeSlots } = require('../_shared/rhyme-slots.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const D = {
  1: { rows: 6, near: false, px: 84 },
  2: { rows: 8, near: false, px: 70 },
  3: { rows: 8, near: true, px: 70 },
};

// the stressed vowel of a class's sound (length and stød marks dropped, a nasal tilde kept): a far miss never shares
// it, so no odd picture ends nearly like the pair (sand / hand + can, cart / heart + car, guitare + tarte: review
// 2026-11-02)
const vowelOf = (sound) => (String(sound || '').replace(/[ːˀ̯]/gu, '').match(/^.̃?/u) || [''])[0];

module.exports = {
  id: 'K-538',
  slug: 'which-does-not-rhyme',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'rhyming-words',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Which One Does Not Rhyme?', instruction: 'Say the names of the three pictures. Two of them rhyme. Circle the one that does not rhyme.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    const R = bank('rhyming-words', L);
    const ok = (m) => m && m.pic && m.picOpened;
    const classes = rng.shuffle((R.classes || []).filter((c) => c.members.filter(ok).length >= 2));
    if (classes.length < d.rows) throw new Error(`K-538: ${L} has ${classes.length} rhyme classes (< ${d.rows})`);
    const used = new Set(), rows = [];
    const memberOf = new Map(); for (const c of R.classes || []) for (const m of c.members) memberOf.set(m.vocabKey, c.id);
    for (const c of classes) {
      if (rows.length === d.rows) break;
      const two = rng.sample(c.members.filter((m) => ok(m) && !used.has(m.vocabKey)), 2);
      if (two.length < 2) continue;
      // the odd one: level 3 a near miss of this class (never a member of it), else a member of another class
      let odd = null;
      if (d.near) odd = rng.shuffle((c.nearMiss || []).filter((m) => ok(m) && !used.has(m.vocabKey) && memberOf.get(m.vocabKey) !== c.id))[0] || null;
      if (!odd) {
        const others = rng.shuffle(classes.filter((x) => x.id !== c.id && vowelOf(x.sound) !== vowelOf(c.sound)).flatMap((x) => x.members.filter((m) => ok(m) && !used.has(m.vocabKey))));
        odd = others[0] || null;
      }
      if (!odd) continue;
      [...two, odd].forEach((m) => used.add(m.vocabKey));
      rows.push({ cls: c.id, two, odd });
    }
    if (rows.length < d.rows) throw new Error(`K-538: ${L} runs out of rows at ${rows.length}`);
    // a teacher's pictures (maker): the rhyming two, and (below level 3, where it is a near miss) the odd one when it is a
    // member of another class — each only for another member of its own class, never one already on the page
    const slotItems = [];
    rows.forEach((r, ri) => { r.two.forEach((m, k) => slotItems.push({ m, cls: r.cls, ri, k })); const oc = memberOf.get(r.odd.vocabKey); if (!d.near && oc && oc !== r.cls) slotItems.push({ m: r.odd, cls: oc, ri, k: 'odd' }); });
    const RS = rhymeSlots(ctx, slotItems, R, ok, rows.flatMap((r) => [...r.two, r.odd]), L);
    slotItems.forEach((x, i) => { const r = rows[x.ri]; if (x.k === 'odd') r.odd = RS.ms[i]; else r.two[x.k] = RS.ms[i]; });
    // the odd one's place: each of the three places as often as the rows allow, shuffled
    const places = rng.shuffle(Array.from({ length: rows.length }, (_, i) => i % 3));
    const mark = !!(ctx && (ctx.answerKey || ctx.screen));
    const html = rows.map((r, i) => {
      const items = r.two.map((m) => ({ m, odd: false }));
      items.splice(places[i], 0, { m: r.odd, odd: true });
      return `<div class="ws-card-stage" style="justify-content:space-evenly;align-items:center;padding:4px 10px" data-ws-content data-lcs-rhyme-row="${r.cls}" data-lcs-odd="${r.odd.word}">` +
        items.map(({ m, odd }) => `<span data-lcs-rhyme-pic="${m.word}"${mark && odd ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;padding:6px;border-radius:16px"><img class="ws-icon" src="${fileUri(m.pic.theme, m.pic.noun)}" alt="" style="width:${d.px}px;height:${d.px}px"></span>`).join('') + `</div>`;
    });
    return {
      bodyHtml: RS.stamp(cardGrid({ cards: html, cols: 2, rows: Math.ceil(html.length / 2), numbered: true }), (m) => fileUri(m.pic.theme, m.pic.noun)),
      meta: { rows: rows.map((r) => `${r.two.map((m) => m.word).join('/')} + ${r.odd.word}`) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-rhyme-row]')];
      if (rows.length < 6) fails.push(`${rows.length} rows`);
      const words = rows.flatMap((r) => [...r.querySelectorAll('[data-lcs-rhyme-pic]')].map((x) => x.dataset.lcsRhymePic));
      if (new Set(words).size !== words.length) fails.push('a picture twice on the page');
      const at = rows.map((r) => [...r.querySelectorAll('[data-lcs-rhyme-pic]')].findIndex((x) => x.dataset.lcsRhymePic === r.dataset.lcsOdd));
      if (at.some((p) => p < 0)) fails.push('a row without its odd one');
      const most = Math.max(...[0, 1, 2].map((p) => at.filter((x) => x === p).length));
      if (most > Math.ceil(rows.length / 3)) fails.push(`the odd one sits in one place on ${most} rows`);
      rows.forEach((r, i) => r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: a picture did not load`); }));
      return fails;
    });
  },
};
