/**
 * Factory: LITERACY sound-match — a grid of picture cards, each with a dashed
 * write-in box; the child writes the TARGET GRAPHEME the picture's word carries
 * (beginning sound, ending sound, medial vowel, or first letter). The render is
 * identical across those skills — only the per-item `answer` grapheme and the
 * instruction differ — so one factory covers beginning/ending/middle/first.
 *
 * NATIVE-PER-LANGUAGE (the literacy production model, distinct from science's
 * design-once): the word content is authored per locale from that locale's
 * gated approved-words-<locale>.json pool. The same picture (noun) carries a
 * DIFFERENT answer per locale (cat → C in en, "Katze" → K in de) and de
 * multigraph onsets are whole graphemes ("Schaf" → "Sch"), so each locale's
 * item list (with its answer graphemes) is authored independently.
 *
 * cfg: { id, slug, gradeBand, exerciseType, [mode], data, i18n, [difficulty] }
 *   data = { items: { en:[{theme,noun,answer}], de:[...], ... } }
 *     answer = the target grapheme the child writes (1-3 chars; multigraph-safe)
 *
 * Cores untouched: borrows .ws-icon; all sound-match CSS scoped inline. The
 * answer is NEVER rendered (blank box) — it lives in meta for QA only.
 * themeAxis OFF (cross-theme curated nouns); the item sample + shuffle = variety.
 */
'use strict';
const { fileUri } = require('../../image-cache/resolve.js');

const SCOPED_CSS = `
.lit-sm{flex:1 1 auto;display:flex;align-items:stretch;justify-content:center;min-height:0;padding:6px 0}
.lit-sm-grid{flex:1 1 auto;display:grid;gap:18px 26px;justify-content:center;align-content:space-evenly}
.lit-sm-card{display:flex;flex-direction:column;align-items:center;background:#FBF3E4;border:2px solid #F0E4CB;border-radius:18px;padding:14px 14px 12px}
.lit-sm-pic{display:flex;align-items:center;justify-content:center}
.lit-sm-box{margin-top:12px;background:#FFFFFF;border:2.5px dashed #F2784B;border-radius:14px;display:flex;align-items:center;justify-content:center}
`;

function makeLitSoundMatch(cfg) {
  const itemsByLocale = (cfg.data && cfg.data.items) || {};
  return {
    id: cfg.id,
    slug: cfg.slug,
    gradeBand: cfg.gradeBand || 'K',
    assetClass: 'icon-placement',
    exerciseType: cfg.exerciseType || 'beginning-sounds',
    mode: cfg.mode || 'beginning',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || { 1: { n: 6 }, 2: { n: 8 }, 3: { n: 8 } },
    i18n: cfg.i18n,

    build({ difficulty, locale }, ctx) {
      const rng = ctx.rng;
      const d = this.difficulty[difficulty] || this.difficulty[2];
      const pool = itemsByLocale[locale] || itemsByLocale.en || [];
      const n = Math.min(d.n, pool.length);
      const chosen = rng.shuffle(rng.sample(pool, n));

      // grid columns: 4 across when >=4 items (two tidy rows of 4), else one row
      const cols = n >= 4 ? 4 : n;
      const iconPx = n > 6 ? 96 : 110;
      const boxW = Math.max(58, iconPx - 18);

      const cards = chosen.map((it) =>
        `<div class="lit-sm-card" data-lit-item="${it.noun}" data-lit-answer="${String(it.answer || '')}">` +
        `<div class="lit-sm-pic ws-card-stage"><img class="ws-icon" src="${fileUri(it.theme, it.noun)}" alt="" ` +
        `style="width:${iconPx}px;height:${iconPx}px"></div>` +
        `<div class="lit-sm-box" style="width:${boxW}px;height:54px"></div>` +
        `</div>`).join('');

      return {
        bodyHtml:
          `<style>${SCOPED_CSS}</style>` +
          `<div class="lit-sm"><div class="lit-sm-grid" style="grid-template-columns:repeat(${cols},auto)">` +
          `${cards}</div></div>`,
        meta: {
          mode: this.mode,
          items: chosen.map((it) => ({ noun: it.noun, answer: it.answer })),
        },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const cards = [...document.querySelectorAll('[data-lit-item]')];
        if (cards.length < 4) fails.push('fewer than 4 picture cards');
        const boxes = document.querySelectorAll('.lit-sm-box').length;
        if (boxes !== cards.length) fails.push('write-in box count != picture count');
        cards.forEach((c, i) => {
          const a = c.getAttribute('data-lit-answer') || '';
          if (!a) fails.push(`card ${i + 1} (${c.dataset.litItem}) has no answer grapheme`);
          if (a.length > 3) fails.push(`card ${i + 1} answer "${a}" longer than 3 chars`);
        });
        return fails;
      });
    },
  };
}

module.exports = { makeLitSoundMatch };
