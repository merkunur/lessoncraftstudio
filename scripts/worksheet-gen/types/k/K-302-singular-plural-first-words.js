/** K-302 — One and Many: First Words. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// D = the published level-2 config (unchanged); levels 1 and 3 below are the Level Set's own (2026-10-01).
// Spreading the base entry (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'K-302',
  slug: 'singular-plural-first-words',
  // Level Set 2026-10-01: real easier / harder levels; level 2 = the published config
  difficulty: { 1: { ...base.difficulty[1], maxLetters: 6 }, 2: D, 3: { ...base.difficulty[2], maxLetters: 7 } },
  i18n: { en: { title: "One and Many: First Words", instruction: "One or many? Trace the word that names more than one." } },
  /**
   * THE ITEM BANK (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"): seven rows of the level, each a card of
   * its own — the page's own build with seven rows (a new copy: the reviewed exclusions apply), the rows lifted out of
   * its column, the empty writing trio under the plural carrying the plural as its answer (the child traces the word
   * for many and writes it on that line; the key writes it there). Seven: the page has three or four rows.
   */
  checkPage({ theme, difficulty, locale }, ctx) {
    const { checkGrid } = require('../../lib/check-page.js');
    const d = this.difficulty[difficulty] || this.difficulty[2];
    const loc = String(locale || 'en').slice(0, 2);
    // 2026-11-15 (the en / sv reviewers of the unit checks): a card whose only task was to TRACE the dashed plural checked
    // nothing about the plural. The plural lane loses its dashed model (plurModel:false): the child writes the word for many
    // from the word for one (sv, "val" -> ___). en (its direction: "Circle the word that names them"): the group of pictures
    // with the word for one and the word for many under it, in a drawn order — the right one carries data-lcs-correct.
    // (… and never a fruit whose picture a child names otherwise: the peach and the plum read as apples, the apricot and the
    // nectarine as oranges, the persimmon as a tomato, the lime as a pear — 2026-11-15)
    const ODD = /data-lcs-vocab="(peach|plum|persimmon|apricot|nectarine|lime)"/;
    const ROW = '<div class="ws-card" style="flex-direction:row;';
    let rows = null;
    for (const n of [9, 8, 7]) {
      let built;
      try { built = base.build.call({ ...this, difficulty: { 0: { ...d, rows: n, plurModel: false } } }, { theme, difficulty: 0, locale }, { rng: ctx.rng, variant: ctx.variant }); } catch (e) { if (n === 7) throw e; continue; }
      const body = built.bodyHtml.slice(built.bodyHtml.indexOf(ROW), -'</div>'.length);
      const all = body.split(new RegExp('(?=' + ROW.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')')).filter(Boolean);
      if (all.length !== n) throw new Error(`${this.id}: check page cut ${all.length} rows, not ${n}`);
      rows = all.filter((r) => !ODD.test(r)).slice(0, 7);
      if (rows.length >= 6) break;
    }
    if (!rows || rows.length < 6) throw new Error(`${this.id}: ${theme}/${loc} gives ${rows ? rows.length : 0} check rows (< 6)`);
    const choose = loc === 'en';
    const { articleChips } = require('../../templates/components-b2.js');
    const cards = rows.map((r) => {
      const plur = (/ data-lcs-plural="([^"]*)"/.exec(r) || [])[1], sing = (/ data-lcs-singular="([^"]*)"/.exec(r) || [])[1];
      if (!plur || !sing || !r.includes('data-lcs-empty-trio="1"')) throw new Error(`${this.id}: a row without its plural lane`);
      const card = r.replace(/^<div class="ws-card" style="flex-direction:row;flex:0 1 \d+px;min-height:0;padding:8px 10px;/, '<div style="display:flex;flex-direction:row;padding:2px 0;');
      if (!choose) return card.replace('data-lcs-empty-trio="1"', `data-lcs-empty-trio="1" data-lcs-answer="${plur}"`);
      const many = card.slice(card.indexOf('<div style="flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:4px;position:relative" data-lcs-side="many">'));
      const group = (/<div style="position:relative;display:flex;gap:8px;align-items:flex-end;padding-left:22px;margin-top:10px">[\s\S]*?<\/div>(?=<div class="ws-trace-lane">)/.exec(many) || [])[0];
      if (!group) throw new Error(`${this.id}: a row without its group of pictures`);
      const pl = ctx.rng.next() < 0.5 ? 0 : 1;
      const words = pl ? [sing, plur] : [plur, sing];
      const w = Math.max(110, 15 * Math.max(...words.map((x) => [...x].length)) + 30);
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;padding:2px 0" data-lcs-row data-lcs-singular="${sing}" data-lcs-plural="${plur}">${group}` +
        articleChips({ chips: words, correctIndex: pl, w, h: 48, fontPx: 24 }).replace('class="ws-achips"', 'class="ws-achips" style="justify-content:center;gap:24px"') + `</div>`;
    });
    return { bodyHtml: `<div data-lcs-check-page>${checkGrid(cards)}</div>`, meta: {} };   // (in a wrapper: a grid straight in the body is cut as an old card page, keyed by the numbers it shows — the count badges made every card one task)
  },
};
