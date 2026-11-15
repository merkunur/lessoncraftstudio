/** G1-238 — Addition Word Problems. nt20-VAR variation of G1-213 (same family: word-problems). */
'use strict';
const base = require('./G1-213-word-problems.js');
module.exports = {
  ...base,
  id: 'G1-238',
  slug: 'addition-word-problems',
  // Level Set 2026-10-14: level 2 = the published config; levels 1 / 3 from G1-213 FACE_LEVELS (⚠ never regenerate this line)
  difficulty: base.levelsFor('G1-238', {"max":20,"problems":2,"iconMax":12,"opsPattern":["add"]}),
  i18n: { en: { title: "Addition Word Problems", instruction: "Read each story. Use the pictures to help you. Write the answer in the box." } },

  /** THE ITEM BANK of the unit checks (Part 7.6), 2026-11-15 (US teacher-reviewer): the lesson this page serves is
   *  "some more come" (add to), and both forms of the check drew the one put-together story of the bank ("Ben has 3,
   *  Jack has 5: how many together?"), the situation another part tests. The check's stories are the page's own (the
   *  base item bank, G1-213 _levelSet), without the stories of two children (a second name: put together). */
  checkPage({ theme, difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const W = require('../../lib/word-problems-levelset.js');
    const loc = (locale || 'en').slice(0, 2), names = W.namesFor(loc, false);
    const d = { ...(this.difficulty[difficulty] || this.difficulty[2]) }, n = 6;
    if (d.kinds) d.kinds = Array.from({ length: n }, (_, i) => d.kinds[i % d.kinds.length]);
    d.problems = n;
    const twoNames = (s) => names.filter((x) => new RegExp('(^|[^\\p{L}])' + x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^\\p{L}]|$)', 'u').test(s)).length >= 2;
    const cards = [], said = new Set();
    for (let t = 0; t < 12 && cards.length < n; t++) {
      const html = this._levelSet(d, theme, loc, { ...(ctx || {}), check: true }).bodyHtml;
      for (const m of html.matchAll(/<section class="ws-card" data-lcs-card="\d+"[^>]*>([\s\S]*?)<\/section>/g)) {
        const s = ((/data-lcs-sentence>([^<]*)</.exec(m[1]) || [])[1] || '');
        if (cards.length < n && !twoNames(s) && !said.has(s)) { said.add(s); cards.push(m[1]); }
      }
    }
    if (cards.length < n) throw new Error(`G1-238 checkPage: ${cards.length} stories`);
    return { bodyHtml: checkGrid(cards), meta: {} };
  },
};
